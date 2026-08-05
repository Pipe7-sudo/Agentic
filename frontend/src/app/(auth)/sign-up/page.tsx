'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColors = ['', 'bg-rose-500', 'bg-amber-400', 'bg-blue-500', 'bg-emerald-500'];

function getStrength(pw: string): number {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', company: '', password: '' });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const strength = getStrength(form.password);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.company || !form.password) {
      setError('Please fill in all fields.'); return;
    }
    if (!agreed) { setError('Please accept the Terms of Service.'); return; }
    if (strength < 2) { setError('Please choose a stronger password.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    localStorage.setItem('wf_session', JSON.stringify({ email: form.email, name: form.name }));
    router.push('/dashboard');
  };

  return (
    <>
      <div className="mb-7">
        <h1 className="font-['Outfit'] text-[26px] font-bold text-slate-900 dark:text-white tracking-tight mb-1">Create your account</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Deploy your AI workforce in 24 hours.</p>
      </div>

      {/* Google SSO */}
      <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] hover:bg-slate-50 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-200 text-sm font-medium transition-all mb-5 shadow-sm dark:shadow-none">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
          <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-slate-200 dark:bg-white/[0.07]" />
        <span className="text-[12px] text-slate-400 dark:text-slate-600">or sign up with email</span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-white/[0.07]" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm px-4 py-3 rounded-xl">{error}</div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
            <input type="text" value={form.name} onChange={set('name')} placeholder="Ada Okafor"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company</label>
            <input type="text" value={form.company} onChange={set('company')} placeholder="Acme Ltd."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all" />
          </div>
        </div>
        <div>
          <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Work Email</label>
          <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all" />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
          <input type="password" value={form.password} onChange={set('password')} placeholder="Min. 8 characters"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all" />
          {form.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-1 flex-1">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all ${strength >= i ? strengthColors[strength] : 'bg-slate-200 dark:bg-white/10'}`} />
                ))}
              </div>
              <span className={`text-[11px] font-medium ${strength >= 3 ? 'text-emerald-600 dark:text-emerald-400' : strength >= 2 ? 'text-blue-500' : 'text-amber-500'}`}>
                {strengthLabels[strength]}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-start gap-2">
          <input id="terms" type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded border-slate-300 dark:border-white/20 accent-indigo-600 shrink-0" />
          <label htmlFor="terms" className="text-[13px] text-slate-600 dark:text-slate-400 leading-[1.5] cursor-pointer">
            I agree to the{' '}
            <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</a>
          </label>
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white gradient-bg shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_28px_rgba(99,102,241,0.45)] hover:-translate-y-px transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-1">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Creating account…
            </span>
          ) : 'Create Account →'}
        </button>
      </form>

      <p className="mt-6 text-center text-[13px] text-slate-500 dark:text-slate-500">
        Already have an account?{' '}
        <Link href="/sign-in" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline no-underline">Sign in</Link>
      </p>
    </>
  );
}
