import './globals.css';

export const metadata = {
  title: 'Vishwakarma Furniture',
  description: 'Handcrafted wooden furniture'
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}
