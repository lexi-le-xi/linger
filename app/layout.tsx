import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Next Question — Voice Archive",
  description: "A six-page interactive pitch for a voice companion that turns everyday memories into living family history.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
