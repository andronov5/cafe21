import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Café 21 Express | Big Flavor. Small Break. | Denver",
  description: "Your downtown Denver go-to since 1997. Breakfast, lunch and catering at 999 18th Street inside Denver Place. Explore the menu and find your next favorite.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
