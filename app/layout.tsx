import type { Metadata } from "next";
import ThemeToggle from "./components/themetoggle";
import Link from "next/link";
import "./globals.css";



export const metadata: Metadata = {
  title: "clark liang",
  description: "about me",
};
export default function RootLayout({ 
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const saved = localStorage.getItem("theme");
                const isDark = saved === "dark" || (saved !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
                if (isDark) {
                  document.documentElement.classList.add("dark");
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <div className="container">
          <nav className="nav">
            <div className="nav-links">
              <Link href="/">home</Link> 
              <Link href="/blog">blog</Link>
              <Link href="/gallery">gallery</Link>
            </div>
            <ThemeToggle />
          </nav> 

          {children}

          <footer className="footer">
            © {new Date().getFullYear()} clark liang
          </footer>
          </div> 
      </body>
    </html>
  );
}

