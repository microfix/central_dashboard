import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-heading',
});

export const metadata = {
  title: 'Microfix Dashboard',
  description: 'Central portal for internal tools',
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body className={montserrat.variable}>
        {children}
      </body>
    </html>
  );
}
