import { ReactNode } from 'react'
import { Footer } from '@modules/footer'
import { Header } from '@modules/header'

import '@styles/global.scss'

import localFont from 'next/font/local'
import { Provider } from '@service/provider'

const inder = localFont({
  src: [{
    path: './fonts/Inder-Regular.woff2',
    weight: '400',
    style: 'normal'
  }],
  variable: '--font-inder'
})

const indie = localFont({
  src: [{
    path: './fonts/IndieFlower-Regular.woff2',
    weight: '400',
    style: 'normal'
  }],
  variable: '--font-indie'
})

const medieval = localFont({
  src: [{
    path: './fonts/MedievalSharp-Regular.woff2',
    weight: '400',
    style: 'normal'
  }],
  variable: '--font-med'
})

const raleway = localFont({
  src: [{
    path: './fonts/RalewayDots-Regular.woff2',
    weight: '400',
    style: 'normal'
  }],
  variable: '--font-raleway'
})

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${inder.variable} ${indie.variable} ${medieval.variable} ${raleway.variable}`}>
        <Provider>
          <div id="root" style={{backgroundColor: '#E1CFA8'}}>
            <Header />
            {children}
            <Footer />
          </div>

          <div id="modal-root" />
        </Provider>
      </body>
    </html>
  )
}
