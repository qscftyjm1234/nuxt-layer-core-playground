/**
 * 檔案下載 Composable
 * 支援 PDF、Excel、圖片等各種檔案類型的下載
 */

/**
 * 檔案下載選項
 */
export interface FileDownloadOptions {
  /** 檔案名稱（包含副檔名） */
  filename?: string
  /** 是否顯示全域 Loading */
  globalLoading?: boolean
  /** 自訂 Loading Ref */
  loadingRef?: Ref<boolean>
  /** 下載成功後的回呼 */
  onSuccess?: (filename: string) => void
  /** 下載失敗後的回呼 */
  onError?: (error: Error) => void
  /** 是否自動顯示成功訊息 */
  autoSuccess?: boolean
  /** 是否自動顯示錯誤訊息 */
  autoError?: boolean
}

/**
 * 常見檔案類型的 MIME Type 對應表
 */
const MIME_TYPES: Record<string, string> = {
  // 文件類型
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

  // 試算表類型
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  csv: 'text/csv',

  // 圖片類型
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  bmp: 'image/bmp',
  webp: 'image/webp',
  svg: 'image/svg+xml',

  // 壓縮檔類型
  zip: 'application/zip',
  rar: 'application/x-rar-compressed',
  '7z': 'application/x-7z-compressed',

  // 其他常見類型
  txt: 'text/plain',
  json: 'application/json',
  xml: 'application/xml',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg'
}

/**
 * 根據檔案名稱取得 MIME Type
 * @param filename - 檔案名稱
 * @returns MIME Type
 */
function getMimeType(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase()
  return extension
    ? MIME_TYPES[extension] || 'application/octet-stream'
    : 'application/octet-stream'
}

/**
 * 從 Content-Disposition Header 中提取檔案名稱
 * @param contentDisposition - Content-Disposition Header 值
 * @returns 檔案名稱
 */
function extractFilenameFromHeader(contentDisposition: string | null): string | null {
  if (!contentDisposition) return null

  // 處理 filename*=UTF-8''encoded-filename 格式
  const filenameStarMatch = contentDisposition.match(/filename\*=UTF-8''(.+?)(?:;|$)/i)
  if (filenameStarMatch) {
    return decodeURIComponent(filenameStarMatch[1])
  }

  // 處理 filename="filename" 格式
  const filenameMatch = contentDisposition.match(/filename="?(.+?)"?(?:;|$)/i)
  if (filenameMatch) {
    return filenameMatch[1]
  }

  return null
}

/**
 * 使用 Blob 下載檔案
 * @param blob - Blob 物件
 * @param filename - 檔案名稱
 */
function downloadBlob(blob: Blob, filename: string): void {
  // 建立臨時 URL
  const url = window.URL.createObjectURL(blob)

  // 建立隱藏的 <a> 元素
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'

  // 觸發下載
  document.body.appendChild(link)
  link.click()

  // 清理
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * 檔案下載 Composable
 * @returns 檔案下載相關方法
 */
export function useFileDownload() {
  const notify = useNotify()
  const loading = useLoading()

  /**
   * 從 URL 下載檔案
   * @param url - 檔案 URL
   * @param options - 下載選項
   */
  const downloadFromUrl = async (url: string, options: FileDownloadOptions = {}): Promise<void> => {
    const {
      filename,
      globalLoading = false,
      loadingRef,
      onSuccess,
      onError,
      autoSuccess = true,
      autoError = true
    } = options

    try {
      // 開始 Loading
      if (globalLoading) loading.start()
      if (loadingRef) loadingRef.value = true

      // 發送請求
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // 取得 Blob
      const blob = await response.blob()

      // 決定檔案名稱
      let finalFilename = filename
      if (!finalFilename) {
        // 嘗試從 Header 取得檔案名稱
        const contentDisposition = response.headers.get('Content-Disposition')
        finalFilename = extractFilenameFromHeader(contentDisposition) || 'download'
      }

      // 下載檔案
      downloadBlob(blob, finalFilename)

      // 成功回呼
      if (autoSuccess) {
        notify.success(`檔案 ${finalFilename} 下載成功`)
      }
      onSuccess?.(finalFilename)
    } catch (error) {
      // 錯誤處理
      const err = error as Error
      if (autoError) {
        notify.error(`檔案下載失敗: ${err.message}`)
      }
      onError?.(err)
      throw error
    } finally {
      // 結束 Loading
      if (globalLoading) loading.finish()
      if (loadingRef) loadingRef.value = false
    }
  }

  /**
   * 從 API 下載檔案（使用 $fetch）
   * @param apiUrl - API 路徑
   * @param options - 下載選項
   */
  const downloadFromApi = async (
    apiUrl: string,
    options: FileDownloadOptions & { method?: 'GET' | 'POST'; body?: any } = {}
  ): Promise<void> => {
    const {
      filename,
      globalLoading = false,
      loadingRef,
      onSuccess,
      onError,
      autoSuccess = true,
      autoError = true,
      method = 'GET',
      body
    } = options

    const config = useRuntimeConfig()

    try {
      // 開始 Loading
      if (globalLoading) loading.start()
      if (loadingRef) loadingRef.value = true

      // 發送 API 請求
      const blob = await $fetch<Blob>(apiUrl, {
        baseURL: config.public.api.baseUrl as string,
        method,
        body,
        responseType: 'blob'
      })

      // 決定檔案名稱
      const finalFilename = filename || 'download'

      // 下載檔案
      downloadBlob(blob, finalFilename)

      // 成功回呼
      if (autoSuccess) {
        notify.success(`檔案 ${finalFilename} 下載成功`)
      }
      onSuccess?.(finalFilename)
    } catch (error) {
      // 錯誤處理
      const err = error as Error
      if (autoError) {
        notify.error(`檔案下載失敗: ${err.message}`)
      }
      onError?.(err)
      throw error
    } finally {
      // 結束 Loading
      if (globalLoading) loading.finish()
      if (loadingRef) loadingRef.value = false
    }
  }

  /**
   * 從 Base64 字串下載檔案
   * @param base64 - Base64 字串（可包含或不包含 data URI 前綴）
   * @param filename - 檔案名稱
   * @param options - 下載選項
   */
  const downloadFromBase64 = (
    base64: string,
    filename: string,
    options: Omit<FileDownloadOptions, 'filename'> = {}
  ): void => {
    const { onSuccess, onError, autoSuccess = true, autoError = true } = options

    try {
      // 移除 data URI 前綴（如果有的話）
      const base64Data = base64.includes(',') ? base64.split(',')[1] : base64

      // 解碼 Base64
      const binaryString = window.atob(base64Data)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      // 建立 Blob
      const mimeType = getMimeType(filename)
      const blob = new Blob([bytes], { type: mimeType })

      // 下載檔案
      downloadBlob(blob, filename)

      // 成功回呼
      if (autoSuccess) {
        notify.success(`檔案 ${filename} 下載成功`)
      }
      onSuccess?.(filename)
    } catch (error) {
      // 錯誤處理
      const err = error as Error
      if (autoError) {
        notify.error(`檔案下載失敗: ${err.message}`)
      }
      onError?.(err)
      throw error
    }
  }

  /**
   * 從 Blob 下載檔案
   * @param blob - Blob 物件
   * @param filename - 檔案名稱
   * @param options - 下載選項
   */
  const downloadFromBlob = (
    blob: Blob,
    filename: string,
    options: Omit<FileDownloadOptions, 'filename'> = {}
  ): void => {
    const { onSuccess, onError, autoSuccess = true, autoError = true } = options

    try {
      // 下載檔案
      downloadBlob(blob, filename)

      // 成功回呼
      if (autoSuccess) {
        notify.success(`檔案 ${filename} 下載成功`)
      }
      onSuccess?.(filename)
    } catch (error) {
      // 錯誤處理
      const err = error as Error
      if (autoError) {
        notify.error(`檔案下載失敗: ${err.message}`)
      }
      onError?.(err)
      throw error
    }
  }

  /**
   * 從文字內容建立並下載檔案
   * @param content - 文字內容
   * @param filename - 檔案名稱
   * @param options - 下載選項
   */
  const downloadFromText = (
    content: string,
    filename: string,
    options: Omit<FileDownloadOptions, 'filename'> = {}
  ): void => {
    const mimeType = getMimeType(filename)
    const blob = new Blob([content], { type: mimeType })
    downloadFromBlob(blob, filename, options)
  }

  /**
   * 從 JSON 物件建立並下載檔案
   * @param data - JSON 物件
   * @param filename - 檔案名稱（預設為 data.json）
   * @param options - 下載選項
   */
  const downloadFromJson = (
    data: any,
    filename: string = 'data.json',
    options: Omit<FileDownloadOptions, 'filename'> = {}
  ): void => {
    const content = JSON.stringify(data, null, 2)
    downloadFromText(content, filename, options)
  }

  return {
    downloadFromUrl,
    downloadFromApi,
    downloadFromBase64,
    downloadFromBlob,
    downloadFromText,
    downloadFromJson
  }
}
