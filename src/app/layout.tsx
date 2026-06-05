import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legendaryz | LGZ",
  description: "Site oficial da Legendaryz, organização de e-sports, comunidade gamer e plataforma digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
