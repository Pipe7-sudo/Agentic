'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <>
      {!sent ? (
        <>
          <div className="mb-7">
            <h1 className="font-['Outfit'] text-[26px] font-bold text-slate-900 dark:text-white tracking-tight mb-1">Reset your password</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Enter your email and we&apos;ll send you a reset link.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-1.5">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
              />
            </div>
            <button type="submit" disabled={loading || !email}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white gradient-bg shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_28px_rgba(99,102,241,0.45)] hover:-translate-y-px transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Sending…
                </span>
              ) : 'Send Reset Link'}
            </button>
          </form>
          <p className="mt-6 text-center text-[13px] text-slate-500 dark:text-slate-500">
            <Link href="/sign-in" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline no-underline">← Back to Sign In</Link>
          </p>
        </>
      ) : (
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center text-3xl mx-auto mb-5">✉️</div>
          <h2 className="font-['Outfit'] text-[22px] font-bold text-slate-900 dark:text-white mb-2">Check your inbox</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-[300px] mx-auto leading-[1.6]">
            We sent a password reset link to <strong className="text-slate-700 dark:text-slate-300">{email}</strong>. It expires in 15 minutes.
          </p>
          <Link href="/sign-in" className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline no-underline">
            ← Back to Sign In
          </Link>
        </div>
      )}
    </>
  );
}
