/**
 * useEncryption - 加密模組
 * 提供 Base64 編碼/解碼、AES 加密/解密和 MD5/SHA256 雜湊功能
 */

export interface UseEncryptionReturn {
  /** Base64 編碼 */
  base64Encode: (text: string) => string
  /** Base64 解碼 */
  base64Decode: (encoded: string) => string
  /** AES 加密 */
  aesEncrypt: (text: string, key: string) => string
  /** AES 解密 */
  aesDecrypt: (encrypted: string, key: string) => string
  /** MD5 雜湊 */
  md5Hash: (text: string) => Promise<string>
  /** SHA256 雜湊 */
  sha256Hash: (text: string) => Promise<string>
}

/**
 * 加密工具 Composable
 * @returns 加密相關方法
 */
export function useEncryption(): UseEncryptionReturn {
  /**
   * Base64 編碼
   * @param text - 要編碼的文字
   * @returns Base64 編碼後的字串
   */
  const base64Encode = (text: string): string => {
    try {
      // 使用 btoa 進行 Base64 編碼
      // 先將 UTF-8 字串轉換為 URI 編碼，再進行 Base64 編碼
      return btoa(
        encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode(Number.parseInt(p1, 16))
        )
      )
    } catch (error) {
      console.error('Base64 編碼失敗:', error)
      return ''
    }
  }

  /**
   * Base64 解碼
   * @param encoded - Base64 編碼的字串
   * @returns 解碼後的文字
   */
  const base64Decode = (encoded: string): string => {
    try {
      // 使用 atob 進行 Base64 解碼
      // 解碼後再將 URI 編碼轉回 UTF-8 字串
      return decodeURIComponent(
        atob(encoded)
          .split('')
          .map((c) => {
            const hex = c.charCodeAt(0).toString(16).padStart(2, '0')
            return `%${hex}`
          })
          .join('')
      )
    } catch (error) {
      console.error('Base64 解碼失敗:', error)
      return ''
    }
  }

  /**
   * 簡易 AES 加密（使用 XOR 運算模擬）
   * 注意：這是簡化版本，實際專案應使用 crypto-js 等專業加密庫
   * @param text - 要加密的文字
   * @param key - 加密金鑰
   * @returns 加密後的字串
   */
  const aesEncrypt = (text: string, key: string): string => {
    try {
      let encrypted = ''
      for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        encrypted += String.fromCharCode(charCode)
      }
      return base64Encode(encrypted)
    } catch (error) {
      console.error('AES 加密失敗:', error)
      return ''
    }
  }

  /**
   * 簡易 AES 解密（使用 XOR 運算模擬）
   * 注意：這是簡化版本，實際專案應使用 crypto-js 等專業加密庫
   * @param encrypted - 加密後的字串
   * @param key - 解密金鑰
   * @returns 解密後的文字
   */
  const aesDecrypt = (encrypted: string, key: string): string => {
    try {
      const decoded = base64Decode(encrypted)
      let decrypted = ''
      for (let i = 0; i < decoded.length; i++) {
        const charCode = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        decrypted += String.fromCharCode(charCode)
      }
      return decrypted
    } catch (error) {
      console.error('AES 解密失敗:', error)
      return ''
    }
  }

  /**
   * MD5 雜湊（使用 Web Crypto API 的 SHA-1 模擬）
   * 注意：瀏覽器原生不支援 MD5，這裡使用 SHA-1 作為示範
   * 實際專案應使用 crypto-js 等專業加密庫
   * @param text - 要雜湊的文字
   * @returns Promise，解析為雜湊值
   */
  const md5Hash = async (text: string): Promise<string> => {
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(text)
      const hashBuffer = await crypto.subtle.digest('SHA-1', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
    } catch (error) {
      console.error('MD5 雜湊失敗:', error)
      return ''
    }
  }

  /**
   * SHA256 雜湊
   * @param text - 要雜湊的文字
   * @returns Promise，解析為雜湊值
   */
  const sha256Hash = async (text: string): Promise<string> => {
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(text)
      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
    } catch (error) {
      console.error('SHA256 雜湊失敗:', error)
      return ''
    }
  }

  return {
    base64Encode,
    base64Decode,
    aesEncrypt,
    aesDecrypt,
    md5Hash,
    sha256Hash
  }
}
