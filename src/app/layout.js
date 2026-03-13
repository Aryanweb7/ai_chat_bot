import './globals.css';

export const metadata = {
  title: 'AI Chat App',
  description: 'Built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}
