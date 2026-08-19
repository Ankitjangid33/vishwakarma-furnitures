import { isAdmin } from '@/lib/auth';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminShell from '@/components/admin/AdminShell';

export const metadata = {
  title: 'Admin Panel',
  robots: { index: false, follow: false }
};

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  const authed = await isAdmin();

  // Login nahi hai to andar ka kuch bhi nahi dikhta
  if (!authed) return <AdminLogin />;

  return <AdminShell>{children}</AdminShell>;
}
