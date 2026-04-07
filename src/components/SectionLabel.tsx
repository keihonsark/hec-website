interface SectionLabelProps {
  children: React.ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="inline-block text-orange text-sm font-bold uppercase tracking-[0.15em] mb-4">
      {children}
    </span>
  );
}
