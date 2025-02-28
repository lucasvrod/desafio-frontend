import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Desafio Frontend',
  description: 'Aplicação para gerenciamento de produtos utilizando a Fake Store API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}