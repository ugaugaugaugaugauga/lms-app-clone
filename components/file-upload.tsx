'use client'

import { toast } from 'sonner'
import { UploadDropzone } from '@uploadthing/react'
import { OurFileRouter, ourFileRouter } from '@/app/api/uploadthing/core'

interface FileUploadProps {
  onChange: (url?: string) => void
  endpoint: keyof typeof ourFileRouter
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone<OurFileRouter, any>
      endpoint={endpoint}
      onClientUploadComplete={(res: any) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error.message}`)
      }}
    />
  )
}
