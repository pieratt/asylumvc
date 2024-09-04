import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Asylum Ventures',
  description: 'Asylum Ventures is a new venture firm dedicated to the creative act of building companies.',
  openGraph: {
    title: 'Asylum Ventures',
    description: 'Asylum Ventures is a new venture firm dedicated to the creative act of building companies.',
    url: 'https://www.asylum.vc', // Replace with your actual URL
    siteName: 'Asylum Ventures',
    images: [
      {
        url: 'https://www.asylumventures.com/asylum_vc_social.png', // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: 'Asylum Ventures',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asylum Ventures',
    description: 'Asylum Ventures is a new venture firm dedicated to the creative act of building companies.',
    images: ['https://www.asylumventures.com/asylum_vc_social.png'], // Replace with your actual image URL
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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