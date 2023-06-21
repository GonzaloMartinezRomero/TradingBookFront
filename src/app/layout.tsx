"use client";
import 'bootstrap/dist/css/bootstrap.css';
import { FooterCustom } from './components/footerCustom';
import { NavigationPanel } from './components/navigationPanel';
import '../../styles/assetModal.css';
import '../../styles/appStyle.css';

export const metadata = {
  title: 'Trading Book'  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">      
      <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Trirong"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"/>
      </head>    
      <body className='app-style'>        
        <NavigationPanel></NavigationPanel>
        <main className='m-1 mt-3'>
          {children}
        </main>
        <footer>
          <FooterCustom></FooterCustom>
        </footer>
      </body>
    </html>
  )
}
