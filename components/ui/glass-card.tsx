'use client';

import { motion } from 'framer-motion';

interface GlassCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function GlassCard({ title, description, icon }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="backdrop-blur-md bg-muted/40 border border-border p-6 rounded-xl shadow-md"
    >
      <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
        {icon} {title}
      </h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}