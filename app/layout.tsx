import type { Metadata } from "next";
import "./globals.css";
import { CafeHeader, CafeFooter } from "./cafe-shell";
export const metadata: Metadata = {
  title: "Café 21 Express | A taste of downtown",
  description: "Your downtown Denver go-to since 1997. Breakfast, lunch and catering at 999 18th Street inside Denver Place. Explore the menu and find your next favorite.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CafeHeader/>{children}<CafeFooter/></body></html>;
}
