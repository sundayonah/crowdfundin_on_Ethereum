import "./global.css"

//INTERNAL IMPORT
import { NavBar, Footer } from "./Components"
import {CrowdFundingProvider} from './Context/CroudFunding';


export const metadata = {
  title: 'Crowd-Funding',
  description: 'crowd funding',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CrowdFundingProvider>
        <NavBar />
        {children}
        <Footer />
        </CrowdFundingProvider>
        </body>
    </html>
  )
}
