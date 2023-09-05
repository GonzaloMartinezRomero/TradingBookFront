"use client";
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/cryptoStyles.css';
import '../../styles/stockStyles.css';
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
        {children}
        <footer>
          <div className="text-center p-3">
          © 2023 Trading Book Web Application
        </div>   
        </footer>
      </body>
    </html>
  )
}
