import { Geist, Geist_Mono } from 'next/font/google';
import styles from './pid.module.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'PID Compare',
  description: 'P&ID Version Comparison Dashboard',
};

export default function PidLayout({ children }) {
  return (
    <section className={`${styles.pidScope} ${geistSans.variable} ${geistMono.variable}`}>
      {children}
    </section>
  );
}
