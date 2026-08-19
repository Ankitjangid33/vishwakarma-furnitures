'use client';

import Icon from '../Icons';

/** Jab MongoDB abhi juda na ho — saaf saaf batata hai kya karna hai */
export default function DbNotice({ error }) {
  if (!error) return null;

  if (error === 'DB_NOT_CONNECTED') {
    return (
      <div className="card border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-3">
          <Icon name="shield" className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
          <div>
            <h3 className="font-semibold text-amber-900">MongoDB abhi juda nahi hai</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-amber-800">
              Admin panel ka data database me save hota hai. Chalu karne ke liye:
            </p>
            <ol className="mt-3 space-y-1.5 text-sm text-amber-900">
              <li>
                1. <b>mongodb.com/atlas</b> par free account banayein aur ek cluster banayein
              </li>
              <li>
                2. Connect → Drivers se connection string copy karein
              </li>
              <li>
                3. Project ki <code className="rounded bg-white px-1.5 py-0.5">.env.local</code> file me{' '}
                <code className="rounded bg-white px-1.5 py-0.5">MONGODB_URI</code> me paste karein
              </li>
              <li>
                4. Terminal me <code className="rounded bg-white px-1.5 py-0.5">npm run seed</code> chalayein
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-red-200 bg-red-50 p-5 text-sm text-red-800">
      कुछ गड़बड़ हो गई: {error}
    </div>
  );
}
