import React from 'react';
import { motion } from 'framer-motion';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const GlassPanel: React.FC<GlassPanelProps> = ({ children, className = '', title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`glass-card p-8 border-white/5 relative overflow-hidden ${className}`}
    >
      {/* Subtle Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-[60px]" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/5 rounded-full blur-[60px]" />
      
      {title && (
        <div className="relative z-10 mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassPanel;
