'use client';

interface GlassSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassSection({ children, className = '' }: GlassSectionProps) {
  return (
    <section className={`bg-background px-4 md:px-20 py-12 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}