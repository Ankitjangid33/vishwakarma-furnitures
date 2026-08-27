import { currentUser, hasAnyAdmin } from '@/lib/auth';
import AdminLangProvider from '@/components/admin/AdminLangProvider';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminSetup from '@/components/admin/AdminSetup';
import AdminShell from '@/components/admin/AdminShell';
import DbNotice from '@/components/admin/DbNotice';

export const metadata = {
  title: 'Admin Panel',
  robots: { index: false, follow: false }
};

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  // database hi na jude to login/setup dono bekaar — pehle wahi bata dein
  let anyAdmin;
  try {
    anyAdmin = await hasAnyAdmin();
  } catch {
    return (
      <AdminLangProvider>
        <div className="grid min-h-screen place-items-center bg-wood-50 px-4">
          <div className="w-full max-w-lg">
            <DbNotice error="DB_NOT_CONNECTED" />
          </div>
        </div>
      </AdminLangProvider>
    );
  }

  // pehli baar — koi admin bana hi nahi hai
  if (!anyAdmin) {
    return (
      <AdminLangProvider>
        <AdminSetup />
      </AdminLangProvider>
    );
  }

  const user = await currentUser();

  // login nahi hai to andar ka kuch bhi nahi dikhta
  if (!user) {
    return (
      <AdminLangProvider>
        <AdminLogin />
      </AdminLangProvider>
    );
  }

  return (
    <AdminLangProvider>
      <AdminShell user={user.toSafeJSON()}>{children}</AdminShell>
    </AdminLangProvider>
  );
}
