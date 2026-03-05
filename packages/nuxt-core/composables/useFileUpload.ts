/**
 * 檔案上傳 Composable
 * 支援單檔、多檔上傳，以及各種檔案類型驗證
 */

/**
 * 檔案上傳選項
 */
export interface FileUploadOptions {
  /** API URL */
  endpoint?: string
  /** HTTP 方法 */
  method?: 'POST' | 'PUT' | 'PATCH'
  /** 檔案欄位名稱（FormData key） */
  fieldName?: string
  /** 額外的表單資料 */
  data?: Record<string, any>
  /** 是否顯示全域 Loading */
  isGlobalLoading?: boolean
  /** 自訂 Loading Ref */
  loadingRef?: Ref<boolean>
  /** 上傳進度回呼 */
  onProgress?: (progress: number) => void
  /** 上傳成功後的回呼 */
  onSuccess?: (response: any) => void
  /** 上傳失敗後的回呼 */
  onError?: (error: Error) => void
  /** 是否自動顯示成功訊息 */
  shouldAutoSuccess?: boolean
  /** 是否自動顯示錯誤訊息 */
  shouldAutoError?: boolean
  /** 檔案大小限制（bytes） */
  maxSize?: number
  /** 允許的檔案類型（MIME types 或副檔名） */
  accept?: string[]
  /** 是否支援多檔上傳 */
  multiple?: boolean
  /** [NEW] 是否允許多檔上傳驗證 */
  allowMultiple?: boolean
}

/**
 * 檔案驗證選項
 */
export interface FileValidationOptions {
  /** 檔案大小限制（bytes） */
  maxSize?: number
  /** 允許的檔案類型（MIME types 或副檔名） */
  accept?: string[]
  /** 最小檔案數量 */
  minFiles?: number
  /** 最大檔案數量 */
  maxFiles?: number
}

/**
 * 上傳結果
 */
export interface UploadResult {
  /** 是否成功 */
  success: boolean
  /** 回應資料 */
  data?: any
  /** 錯誤訊息 */
  error?: string
}

/**
 * 常見檔案類型的 MIME Type 分類
 */
const FILE_TYPE_GROUPS: Record<string, string[]> = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml'],
  document: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  spreadsheet: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv'
  ],
  video: ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  archive: ['application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed']
}

/**
 * 格式化檔案大小
 * @param bytes - 位元組數
 * @returns 格式化後的字串
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`
}

/**
 * 驗證檔案
 * @param file - 檔案物件
 * @param options - 驗證選項
 * @returns 驗證結果
 */
function validateFile(
  file: File,
  options: FileValidationOptions = {}
): { valid: boolean; error?: string } {
  const { maxSize, accept } = options

  // 檢查檔案大小
  if (maxSize && file.size > maxSize) {
    return {
      valid: false,
      error: `檔案大小超過限制（${formatFileSize(file.size)} > ${formatFileSize(maxSize)}）`
    }
  }

  // 檢查檔案類型
  if (accept && accept.length > 0) {
    const fileType = file.type
    const fileName = file.name
    const fileExt = `.${fileName.split('.').pop()?.toLowerCase()}`

    const isAccepted = accept.some((acceptType) => {
      // 檢查 MIME type
      if (acceptType.includes('/')) {
        // 支援萬用字元，例如 image/*
        if (acceptType.endsWith('/*')) {
          const category = acceptType.split('/')[0]
          return fileType.startsWith(`${category}/`)
        }
        return fileType === acceptType
      }
      // 檢查副檔名
      return fileExt === acceptType.toLowerCase()
    })

    if (!isAccepted) {
      return {
        valid: false,
        error: `不支援的檔案類型（${fileType || fileExt}）`
      }
    }
  }

  return { valid: true }
}

/**
 * 驗證多個檔案
 * @param files - 檔案陣列
 * @param options - 驗證選項
 * @returns 驗證結果
 */
function validateFiles(
  files: File[],
  options: FileValidationOptions = {}
): { valid: boolean; error?: string } {
  const { minFiles, maxFiles } = options

  // 檢查檔案數量
  if (minFiles && files.length < minFiles) {
    return {
      valid: false,
      error: `至少需要 ${minFiles} 個檔案`
    }
  }

  if (maxFiles && files.length > maxFiles) {
    return {
      valid: false,
      error: `最多只能上傳 ${maxFiles} 個檔案`
    }
  }

  // 逐一驗證每個檔案
  for (const file of files) {
    const result = validateFile(file, options)
    if (!result.valid) {
      return result
    }
  }

  return { valid: true }
}

/**
 * 檔案上傳 Composable
 * @returns 檔案上傳相關方法
 */
export function useFileUpload() {
  const notify = useNotify()
  const loading = useLoading()
  const config = useRuntimeConfig()

  /**
   * 上傳單個檔案
   * @param file - 檔案物件
   * @param options - 上傳選項
   * @returns 上傳結果
   */
  const uploadFile = async (file: File, options: FileUploadOptions = {}): Promise<UploadResult> => {
    const {
      endpoint = '/api/upload',
      method = 'POST',
      fieldName = 'file',
      data = {},
      isGlobalLoading = false,
      loadingRef,
      // onProgress,
      onSuccess,
      onError,
      shouldAutoSuccess = true,
      shouldAutoError = true,
      maxSize,
      accept
    } = options

    try {
      // 開始 Loading
      if (isGlobalLoading) loading.start()
      if (loadingRef) loadingRef.value = true

      // 驗證檔案
      const validation = validateFile(file, { maxSize, accept })
      if (!validation.valid) {
        throw new Error(validation.error)
      }

      // 建立 FormData
      const formData = new FormData()
      formData.append(fieldName, file)

      // 附加額外資料
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })

      // 發送請求
      const response = await $fetch(endpoint, {
        baseURL: config.public.api.baseUrl as string,
        method,
        body: formData
      })

      // 成功回呼
      if (shouldAutoSuccess) {
        notify.success(`檔案 ${file.name} 上傳成功`)
      }
      onSuccess?.(response)

      return {
        success: true,
        data: response
      }
    } catch (error) {
      // 錯誤處理
      const err = error as Error
      if (shouldAutoError) {
        notify.error(`檔案上傳失敗: ${err.message}`)
      }
      onError?.(err)

      return {
        success: false,
        error: err.message
      }
    } finally {
      // 結束 Loading
      if (isGlobalLoading) loading.finish()
      if (loadingRef) loadingRef.value = false
    }
  }

  /**
   * 上傳多個檔案
   * @param files - 檔案陣列
   * @param options - 上傳選項
   * @returns 上傳結果陣列
   */
  const uploadFiles = async (
    files: File[],
    options: FileUploadOptions = {}
  ): Promise<UploadResult[]> => {
    const {
      endpoint = '/api/upload/multiple',
      method = 'POST',
      fieldName = 'files',
      data = {},
      isGlobalLoading = false,
      loadingRef,
      onSuccess,
      onError,
      shouldAutoSuccess = true,
      shouldAutoError = true,
      maxSize,
      accept,
      allowMultiple = true
    } = options

    try {
      // 開始 Loading
      if (isGlobalLoading) loading.start()
      if (loadingRef) loadingRef.value = true

      // 驗證檔案
      const validation = validateFiles(files, {
        maxSize,
        accept,
        maxFiles: allowMultiple ? undefined : 1
      })
      if (!validation.valid) {
        throw new Error(validation.error)
      }

      // 建立 FormData
      const formData = new FormData()
      files.forEach((file) => {
        formData.append(fieldName, file)
      })

      // 附加額外資料
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })

      // 發送請求
      const response = await $fetch(endpoint, {
        baseURL: config.public.api.baseUrl as string,
        method,
        body: formData
      })

      // 成功回呼
      if (shouldAutoSuccess) {
        notify.success(`成功上傳 ${files.length} 個檔案`)
      }
      onSuccess?.(response)

      return [
        {
          success: true,
          data: response
        }
      ]
    } catch (error) {
      // 錯誤處理
      const err = error as Error
      if (shouldAutoError) {
        notify.error(`檔案上傳失敗: ${err.message}`)
      }
      onError?.(err)

      return [
        {
          success: false,
          error: err.message
        }
      ]
    } finally {
      // 結束 Loading
      if (isGlobalLoading) loading.finish()
      if (loadingRef) loadingRef.value = false
    }
  }

  /**
   * 從 input[type="file"] 元素上傳
   * @param inputElement - input 元素或 event
   * @param options - 上傳選項
   * @returns 上傳結果
   */
  const uploadFromInput = async (
    inputElement: HTMLInputElement | Event,
    options: FileUploadOptions = {}
  ): Promise<UploadResult | UploadResult[]> => {
    // 取得 input 元素
    let input: HTMLInputElement
    if (inputElement instanceof Event) {
      input = inputElement.target as HTMLInputElement
    } else {
      input = inputElement
    }

    const files = Array.from(input.files || [])

    if (files.length === 0) {
      throw new Error('未選擇任何檔案')
    }

    // 單檔或多檔上傳
    if (files.length === 1) {
      return await uploadFile(files[0], options)
    } else {
      return await uploadFiles(files, options)
    }
  }

  /**
   * 從 Base64 字串上傳
   * @param base64 - Base64 字串
   * @param filename - 檔案名稱
   * @param options - 上傳選項
   * @returns 上傳結果
   */
  const uploadFromBase64 = async (
    base64: string,
    filename: string,
    options: FileUploadOptions = {}
  ): Promise<UploadResult> => {
    // 移除 data URI 前綴（如果有的話）
    const base64Data = base64.includes(',') ? base64.split(',')[1] : base64

    // 解碼 Base64
    const binaryString = window.atob(base64Data)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    // 建立 Blob
    const blob = new Blob([bytes])
    const file = new File([blob], filename)

    return await uploadFile(file, options)
  }

  /**
   * 從 Blob 上傳
   * @param blob - Blob 物件
   * @param filename - 檔案名稱
   * @param options - 上傳選項
   * @returns 上傳結果
   */
  const uploadFromBlob = async (
    blob: Blob,
    filename: string,
    options: FileUploadOptions = {}
  ): Promise<UploadResult> => {
    const file = new File([blob], filename, { type: blob.type })
    return await uploadFile(file, options)
  }

  /**
   * 驗證檔案（公開方法）
   * @param file - 檔案
   * @param options - 選項
   * @returns 驗證結果
  const validate = (file: File, options: FileValidationOptions = {}) => validateFile(file, options)

  /**
   * 驗證多個檔案（公開方法）
   * @param files - 檔案列表
   * @param options - 選項
   * @returns 驗證結果
  const validateMultiple = (files: File[], options: FileValidationOptions = {}) =>
    validateFiles(files, options)

  /**
   * 從事件中提取檔案（支援 Input change 與 Drag drop）
   * @param event - Input Event 或 Drag Event
   * @returns 檔案陣列
   */
  const getSelectedFiles = (event: Event | DragEvent): File[] => {
    let files: FileList | null = null

    if (event.type === 'drop') {
      // Drag Event
      files = (event as DragEvent).dataTransfer?.files || null
    } else {
      // Input Event
      const target = event.target as HTMLInputElement
      files = target.files
    }

    return files ? Array.from(files) : []
  }

  return {
    uploadFile,
    uploadFiles,
    uploadFromInput,
    uploadFromBase64,
    uploadFromBlob,
    validate: validateFile,
    validateMultiple: (files: File[], options: FileValidationOptions) =>
      validateFiles(files, options),
    // 工具方法
    getSelectedFiles,
    formatFileSize,
    FILE_TYPE_GROUPS
  }
}
