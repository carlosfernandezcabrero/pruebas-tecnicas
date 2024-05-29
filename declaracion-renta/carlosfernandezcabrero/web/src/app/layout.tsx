import BootstrapClient from '@/components/bootstrap-client'
import Header from '@/components/header'
import 'bootstrap/dist/css/bootstrap.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Declaración de la Renta',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="container pb-5 mt-4 fs-6">{children}</main>
        <BootstrapClient />
      </body>
    </html>
  )
}