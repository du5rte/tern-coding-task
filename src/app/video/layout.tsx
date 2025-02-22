import { TheaterProvider } from "@/context/TheaterContext";

export default function VideoRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TheaterProvider>{children}</TheaterProvider>;
}
