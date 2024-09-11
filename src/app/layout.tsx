"use client";
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/modal.style.css';
import '../../styles/depositStyles.css';
import '../../styles/appStyle.css';
import '../../styles/MarketLimitModal.css';

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
         <footer className='text-center mt-4'>          
            © 2023 Trading Book Web Application
        </footer> 
      </body>
    </html>
  )
}
