import PageHeader from '@/components/PageHeader';
import CartClient from '@/components/CartClient';

export const metadata = {
  title: 'Book Order / ऑर्डर बुक करें',
  description: 'Book your furniture order online. We call you within a day to confirm.',
  robots: { index: false }
};

export default function CartPage() {
  return (
    <>
      <PageHeader titleKey="cartTitle" subKey="bookingSub" />
      <CartClient />
    </>
  );
}
