import type { Media as MediaType } from '@/payload-types'
import { uploadToBlob } from '@/utilities/blobStorage'

export const useVercelBlobStorage = () => {
  const handleUpload = async (file: File): Promise<Partial<MediaType>> => {
    try {
      const url = await uploadToBlob(file)

      return {
        filename: file.name,
        mimeType: file.type,
        url,
        width: undefined,
        height: undefined,
      }
    } catch (error) {
      console.error('Error uploading to Vercel Blob:', error)
      throw error
    }
  }

  return {
    handleUpload,
  }
}
