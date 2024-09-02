import './globals.css'
import { Inter, Montserrat, Inconsolata, Playfair_Display, VT323, Xanh_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const inconsolata = Inconsolata({ subsets: ['latin'], variable: '--font-inconsolata' })
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const vt323 = VT323({ weight: '400', subsets: ['latin'], variable: '--font-vt323' })
const xanh = Xanh_Mono({ weight: ['400'], subsets: ['latin'], variable: '--font-xanh' })

export const metadata = {
  description: 'Weird Inside',
  title: 'Asylum Ventures',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${inconsolata.variable} ${playfairDisplay.variable} ${vt323.variable} ${xanh.variable}`}>
      <body>
        <div className="site-wrapper">
          <div className="content">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}