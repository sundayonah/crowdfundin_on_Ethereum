import "./global.css"

//INTERNAL IMPORT
import { NavBar, Footer } from "./Components"


export const metadata = {
  title: 'Crowd-Funding',
  description: 'crowd funding',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Footer />
        </body>
    </html>
  )
}
