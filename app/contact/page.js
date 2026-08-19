import PageHeader from '@/components/PageHeader';
import ContactClient from '@/components/ContactClient';

export const metadata = {
  title: 'Contact / संपर्क करें',
  description: 'Call, WhatsApp or message us for custom wooden furniture. Free measurement at home.'
};

export default function ContactPage() {
  return (
    <>
      <PageHeader titleKey="contactTitle" subKey="contactSub" />
      <ContactClient />
    </>
  );
}
