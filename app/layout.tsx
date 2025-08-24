import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico, Playfair_Display, EB_Garamond, Dancing_Script } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/section/Navbar";
import Footer from "@/components/section/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { ReduxProvider } from "@/store/Provider";
import { Toaster } from "react-hot-toast";


const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// A classic, elegant serif font for main headings and titles.
// Playfair Display is a great choice, but we can make it more versatile.
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

// A highly readable, traditional serif font for body text.
// This is a much better choice for product descriptions and general content.
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eb-garamond",
});

// A beautiful script font for subtle, decorative touches.
// This adds a whimsical, handmade feel without sacrificing readability.
const dancing_script = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  weight: "400", // Specifying a single weight for this decorative font
  variable: "--font-dancing-script",
});

export const metadata: Metadata = {
  title: "Hunar Gaatha - Crafting Culture, One Tale at a Time",
  description:
    "Discover authentic Indian crafts and the stories behind them. Connect with artisans and their timeless traditions.",
  //    icons: {
  //     icon: "/favicon.ico"
  //   // apple: "/apple-touch-icon.png",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
    <link rel="icon" type="image/svg+xml" href="/origami.gif" />
      <body 
        className={`${playfair.variable} ${eb_garamond.variable} ${dancing_script.variable} antialiased bg-amber-50`}
      >
        
       <ReduxProvider>
         <Navbar/>
         <Toaster position="top-right" reverseOrder={false} />
          <AuthProvider>
          {children}
          </AuthProvider>
          <Footer />
       </ReduxProvider>
      </body>
    </html>
  );
}