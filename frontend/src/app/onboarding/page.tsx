'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Zap, Bot, Users, Shield, MessageSquare, BookOpen, BarChart2,
  Check, ChevronRight, ArrowRight, SlidersHorizontal,
} from 'lucide-react';

const STEPS = ['Welcome', 'Pick Agent', 'Configure', 'Done'];

const AGENTS = [
  { id: 'invoice-guard', name: 'Invoice Guard',    initials: 'IG', bg: 'bg-indigo-100 dark:bg-indigo-500/15',  text: 'text-indigo-600 dark:text-indigo-400',  Icon: Shield,       desc: 'Auto-approve invoices within limits, escalate exceptions to your team.' },
  { id: 'support-agent', name: 'Support Agent',    initials: 'SA', bg: 'bg-emerald-100 dark:bg-emerald-500/15',text: 'text-emerald-600 dark:text-emerald-400', Icon: MessageSquare, desc: 'Handle customer tickets 24/7 via WhatsApp and email with smart escalation.' },
  { id: 'hr-scout',      name: 'HR Scout',         initials: 'HS', bg: 'bg-violet-100 dark:bg-violet-500/15',  text: 'text-violet-600 dark:text-violet-400',  Icon: Users,        desc: 'Screen CVs, score candidates, and schedule shortlisted interviews automatically.' },
  { id: 'compliance',    name: 'Compliance Scout', initials: 'CS', bg: 'bg-cyan-100 dark:bg-cyan-500/15',      text: 'text-cyan-600 dark:text-cyan-500',       Icon: BookOpen,     desc: 'Monitor regulatory feeds and generate compliance reports on demand.' },
  { id: 'finance-ops',   name: 'Finance Ops',      initials: 'FO', bg: 'bg-amber-100 dark:bg-amber-500/15',   text: 'text-amber-600 dark:text-amber-500',     Icon: BarChart2,    desc: 'Process expense reports, categorize spend, and flag policy breaches.' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step,      setStep]      = useState(0);
  const [selected,  setSelected]  = useState<string | null>(null);
  const [config,    setConfig]    = useState({ email: '', threshold: '₦500,000', channel: 'Email' });
  const [deploying, setDeploying] = useState(false);
  const [name,      setName]      = useState('there');

  useEffect(() => {
    // Redirect if not in onboarding flow
    const session = localStorage.getItem('wf_session');
    if (!session) { router.replace('/sign-in'); return; }
    const s = JSON.parse(session);
    if (s.name) setName(s.name.split(' ')[0]);
  }, [router]);

  const agent = AGENTS.find(a => a.id === selected);

  const handleDeploy = async () => {
    setDeploying(true);
    await new Promise(r => setTimeout(r, 1800));
    localStorage.removeItem('wf_onboarding');
    setStep(3);
    setDeploying(false);
  };

  const goToDashboard = () => router.push('/dashboard');

  return (
    <div className="min-h-[100dvh] bg-slate-50 dark:bg-[#04040c] flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#080812]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[8px] gradient-bg flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.4)]">
            <Zap size={14} className="text-white" fill="white" />
          </div>
          <span className="font-['Outfit'] text-[15px] font-bold text-slate-900 dark:text-white">
            WorkForce <span className="text-indigo-600 dark:text-indigo-400">AI</span>
          </span>
        </div>

        {/* Step indicators */}
        <div className="hidden sm:flex items-center gap-1">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium transition-all ${
                i === step ? 'bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-400' :
                i < step  ? 'text-emerald-600 dark:text-emerald-400' :
                'text-slate-400 dark:text-slate-600'
              }`}>
                {i < step ? <Check size={11} /> : <span className="w-4 text-center">{i + 1}</span>}
                {s}
              </div>
              {i < STEPS.length - 1 && <ChevronRight size={13} className="text-slate-300 dark:text-slate-700" />}
            </div>
          ))}
        </div>

        <button onClick={goToDashboard} className="text-[13px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          Skip setup
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">

        {/* ── Step 0: Welcome ── */}
        {step === 0 && (
          <div className="max-w-[520px] w-full text-center">
            <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_8px_32px_rgba(99,102,241,0.35)]">
              <Bot size={28} className="text-white" />
            </div>
            <h1 className="font-['Outfit'] text-[32px] md:text-[36px] font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Welcome, {name}!
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-[16px] leading-[1.7] mb-8 max-w-[400px] mx-auto">
              Let&apos;s get your first AI agent up and running. It takes under 2 minutes to deploy.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Setup time',  value: '2 min'  },
                { label: 'No code',     value: '100%'   },
                { label: 'Start free',  value: '14 days' },
              ].map(s => (
                <div key={s.label} className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-4 shadow-sm dark:shadow-none">
                  <div className="font-['Outfit'] text-[22px] font-bold text-indigo-600 dark:text-indigo-400">{s.value}</div>
                  <div className="text-[12px] text-slate-500 dark:text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(1)}
              className="flex items-center gap-2 mx-auto px-8 py-3.5 rounded-xl text-[15px] font-semibold text-white gradient-bg shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 transition-all">
              Get Started <ArrowRight size={17} />
            </button>
          </div>
        )}

        {/* ── Step 1: Pick Agent ── */}
        {step === 1 && (
          <div className="max-w-[680px] w-full">
            <div className="text-center mb-6">
              <h2 className="font-['Outfit'] text-[24px] md:text-[28px] font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                Choose your first agent
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Select the agent that solves your most immediate problem.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {AGENTS.map(a => (
                <button key={a.id} onClick={() => setSelected(a.id)}
                  className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all ${
                    selected === a.id
                      ? 'border-indigo-400 dark:border-indigo-500/50 bg-indigo-50 dark:bg-indigo-500/[0.08] ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#080812] hover:border-slate-300 dark:hover:border-white/10'
                  }`}>
                  <div className={`w-10 h-10 rounded-xl ${a.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <span className={`text-[11px] font-bold ${a.text}`}>{a.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-semibold text-slate-900 dark:text-white">{a.name}</span>
                      {selected === a.id && <Check size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0" />}
                    </div>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-[1.5] mt-0.5">{a.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <button onClick={() => setStep(0)} className="text-[13px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">← Back</button>
              <button onClick={() => selected && setStep(2)} disabled={!selected}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white gradient-bg shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:-translate-y-px transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none">
                Configure {agent?.name} <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Configure ── */}
        {step === 2 && agent && (
          <div className="max-w-[500px] w-full">
            <div className="text-center mb-6">
              <div className={`w-12 h-12 ${agent.bg} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                <span className={`text-[13px] font-bold ${agent.text}`}>{agent.initials}</span>
              </div>
              <h2 className="font-['Outfit'] text-[24px] font-bold text-slate-900 dark:text-white tracking-tight mb-1">Configure {agent.name}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Set up the basics — you can change these anytime in Settings.</p>
            </div>

            <div className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 shadow-sm dark:shadow-none flex flex-col gap-4 mb-6">
              <div>
                <label className="block text-[12px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1.5">Escalation Email</label>
                <input
                  value={config.email}
                  onChange={e => setConfig(c => ({ ...c, email: e.target.value }))}
                  placeholder="ops@yourcompany.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
                />
                <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-1">Exceptions and escalations will be sent here.</p>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1.5">Auto-Approve Threshold</label>
                <input
                  value={config.threshold}
                  onChange={e => setConfig(c => ({ ...c, threshold: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.03] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
                />
                <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-1">Anything above this value will require human approval.</p>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2">Notification Channel</label>
                <div className="flex gap-2">
                  {['Email', 'WhatsApp', 'Slack'].map(ch => (
                    <button key={ch} type="button" onClick={() => setConfig(c => ({ ...c, channel: ch }))}
                      className={`flex-1 py-2 rounded-xl text-[12px] font-medium transition-all border ${
                        config.channel === ch
                          ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-300 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400'
                          : 'bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/[0.07] text-slate-600 dark:text-slate-400'
                      }`}>
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button onClick={() => setStep(1)} className="text-[13px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">← Back</button>
              <button onClick={handleDeploy} disabled={deploying}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white gradient-bg shadow-[0_4px_16px_rgba(99,102,241,0.3)] hover:-translate-y-px transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none">
                {deploying ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    Deploying…
                  </>
                ) : (
                  <><SlidersHorizontal size={15} /> Deploy Agent</>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Done ── */}
        {step === 3 && agent && (
          <div className="max-w-[480px] w-full text-center">
            {/* Animated success ring */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
              <div className="relative w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(16,185,129,0.4)]">
                <Check size={32} className="text-white" strokeWidth={3} />
              </div>
            </div>
            <h2 className="font-['Outfit'] text-[28px] md:text-[32px] font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              {agent.name} is live!
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-[1.7] mb-8 max-w-[360px] mx-auto">
              Your agent is deployed and ready to work. Head to the dashboard to see it in action.
            </p>
            <div className="bg-white dark:bg-[#080812] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-5 shadow-sm dark:shadow-none mb-8 text-left">
              <div className="text-[12px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-3">Summary</div>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Agent', value: agent.name },
                  { label: 'Escalation Email', value: config.email || 'Not set' },
                  { label: 'Threshold', value: config.threshold },
                  { label: 'Notifications', value: config.channel },
                ].map(r => (
                  <div key={r.label} className="flex items-center justify-between">
                    <span className="text-[13px] text-slate-500 dark:text-slate-500">{r.label}</span>
                    <span className="text-[13px] font-semibold text-slate-800 dark:text-slate-200">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={goToDashboard}
              className="flex items-center gap-2 mx-auto px-8 py-3.5 rounded-xl text-[15px] font-semibold text-white gradient-bg shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 transition-all">
              Go to Dashboard <ArrowRight size={17} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
