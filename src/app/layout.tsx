import App from '../c/app'
import { NextAuthProvider } from '../c/provider'
import { getSiteOptions } from '../db/site_options'
import './globals.css'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Минив3б',
  description: 'Простое создание веб-страниц без использования шаблонов',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const siteOptions = await getSiteOptions()

  return (
    <NextAuthProvider>
      <App siteOptions={siteOptions}>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {children}
      </App>
    </NextAuthProvider>
  )
}