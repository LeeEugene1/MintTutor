import { MetaMaskContextProvider } from '@/hooks/UseMetaMask'
import './globals.css'
import { GlobalContextProvider } from '@/hooks/store'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Create Tutor',
  description: 'Create your vitrual tutor tailored just for you.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className=''>
      <body>
        <MetaMaskContextProvider>
        <Header/>
        {children}
        <Footer/>
        </MetaMaskContextProvider>
      </body>
    </html>
  )
}
