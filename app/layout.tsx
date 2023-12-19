import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ModalProvider from '@/components/provider/modal-provider'
import ToastProvider from '@/components/provider/toast-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'lms app',
  description: 'lms app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ModalProvider />
        <ToastProvider />
        {children}
      </body>
    </html>
  )
}
