import type { Metadata } from "next";
import { Nunito_Sans } from '@next/font/google';
import "./globals.css";

// استيراد خط "Nunito Sans"
const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Movie",
  description: "Your go-to app for movies and shows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
