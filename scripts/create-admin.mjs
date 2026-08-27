/**
 * Terminal se admin user banane / password reset karne ke liye:
 *
 *    npm run create-admin -- <username> <password> [naam] [--role owner|staff]
 *
 * Username pehle se ho to uska password (aur role) update ho jaata hai —
 * yaani password bhool jaane par bhi wapas andar aa sakte hain.
 */

import mongoose from 'mongoose';
import AdminUser from '../models/AdminUser.js';
import { hashPassword, passwordProblem } from '../lib/password.js';

const args = process.argv.slice(2);

function flag(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
}

const positional = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--role');
const [username, password, name = ''] = positional;
const role = flag('role', null); // na diya ho to: naya user = owner, purane ka role waisa hi

function die(msg) {
  console.error(`\n❌  ${msg}\n`);
  process.exit(1);
}

if (!username || !password) {
  die('Istemaal:  npm run create-admin -- <username> <password> [naam] [--role owner|staff]');
}

const uname = String(username).trim().toLowerCase();

if (!/^[a-z0-9._-]{3,32}$/.test(uname)) {
  die('Username 3–32 akshar ka ho — sirf a-z, 0-9, aur . _ -');
}

if (role && !['owner', 'staff'].includes(role)) die('--role sirf owner ya staff ho sakta hai');

const pwProblem = passwordProblem(password);
if (pwProblem === 'PASSWORD_TOO_SHORT') die('Password kam se kam 8 akshar ka rakhein');
if (pwProblem === 'PASSWORD_TOO_SIMPLE') die('Password me akshar aur ank dono hone chahiye');
if (pwProblem) die(`Password theek nahi: ${pwProblem}`);

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) die('MONGODB_URI nahi mila. .env.local file me apna MongoDB Atlas link daalein.');

  console.log('\n⏳  MongoDB se jud rahe hain...');
  await mongoose.connect(uri);
  console.log('✅  Connected\n');

  const passwordHash = await hashPassword(password);
  const existing = await AdminUser.findOne({ username: uname });

  if (existing) {
    existing.passwordHash = passwordHash;
    existing.passwordChangedAt = new Date();
    if (role) existing.role = role; // --role na diya to purana role nahi chhedte
    existing.active = true;
    if (name) existing.name = name;
    await existing.save();

    console.log(`🔄  "${uname}" ka password update ho gaya (role: ${existing.role})`);
    console.log('    Purane login sessions band ho gaye.\n');
  } else {
    const newRole = role || 'owner';
    await AdminUser.create({ username: uname, name, passwordHash, role: newRole, active: true });
    console.log(`🎉  Naya admin bana: "${uname}" (role: ${newRole})\n`);
  }

  console.log('👉  Ab http://localhost:3000/admin par is username-password se login karein.\n');

  await mongoose.disconnect();
  process.exit(0);
}

main().catch(async (err) => {
  console.error('\n❌  Fail hua:', err.message, '\n');
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
