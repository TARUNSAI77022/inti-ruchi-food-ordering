import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const UIs = [
  {
    route: '/ui1',
    label: '01',
    title: 'Split Screen Layout',
    desc: 'Fixed sidebar with multi-dimension filters. Deeply immersive grid with staggered animations.',
    tags: ['Sidebar', 'Split', 'Filter Heavy'],
    accent: 'from-violet-500/20 to-purple-500/5',
    border: 'hover:border-violet-500/30',
  },
  {
    route: '/ui2',
    label: '02',
    title: 'Quick Select UI',
    desc: 'Massive grid focused on speed. Reveal-on-hover actions for rapid ordering experience.',
    tags: ['Quick Add', 'Grid', 'High Effort'],
    accent: 'from-blue-500/20 to-cyan-500/5',
    border: 'hover:border-blue-500/30',
  },
  {
    route: '/ui3',
    label: '03',
    title: 'The Collection',
    desc: 'Curation-style horizontal scrolls grouped by meal phase. Best for visual storytelling.',
    tags: ['Netflix Style', 'Horizontal', 'Immersive'],
    accent: 'from-emerald-500/20 to-green-500/5',
    border: 'hover:border-emerald-500/30',
  },
];

const UINav: React.FC = () => (
  <div className="min-h-screen bg-[#050505] text-white selection:bg-white/30">
    {/* Header */}
    <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm">
        <ArrowLeft size={16} /> Home
      </Link>
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Design Lab</span>
      <div className="w-16" />
    </div>

    <div className="max-w-4xl mx-auto px-6 py-20 space-y-16">
      {/* Hero */}
      <div className="space-y-4">
        <div className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 border border-white/10 rounded-full px-4 py-1.5">
          Prototyping Selection
        </div>
        <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-none">
          Layout<br />
          <span className="text-white/20 italic">Evaluations</span>
        </h1>
        <p className="text-white/40 max-w-md leading-relaxed">
          Compare three distinct production-ready menu architectures. All designs are fully integrated with live backend data.
        </p>
      </div>

      {/* UI cards */}
      <div className="grid gap-4">
        {UIs.map((ui, i) => (
          <motion.div
            key={ui.route}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={ui.route}
              className={`group block p-6 rounded-3xl border border-white/5 bg-gradient-to-br ${ui.accent} ${ui.border} transition-all duration-300 hover:bg-white/[0.02]`}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-extralight tracking-tighter text-white/10 tabular-nums">{ui.label}</span>
                    <div>
                      <h2 className="text-xl font-semibold tracking-tight text-white">{ui.title}</h2>
                      <p className="text-white/40 text-sm mt-1 leading-relaxed">{ui.desc}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-16">
                    {ui.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10 text-white/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-300 mt-1">
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <div className="flex flex-col items-center gap-4 py-10 opacity-30 group hover:opacity-100 transition-opacity">
        <div className="h-px w-20 bg-white/20" />
        <p className="text-[9px] font-bold tracking-[0.5em] uppercase text-center">Live Sync Enabled · /api/foods connected</p>
      </div>
    </div>
  </div>
);

export default UINav;
