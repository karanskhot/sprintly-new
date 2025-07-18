import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from '@clerk/nextjs';

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: {
    template: '%s - Remindly.ai',
    absolute: 'Remindly.ai'
  },
  description: 'AI powered reminders for your daily tasks and events.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${raleway.variable} `}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
