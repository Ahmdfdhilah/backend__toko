"use client"
import './globals.css';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Navbar/>
        {children}</body>
        <Footer/>
    </html>
  )
}
