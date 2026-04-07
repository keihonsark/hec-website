interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  href = "#",
}: ServiceCardProps) {
  return (
    <a
      href={href}
      className="card-lift block bg-white border border-gray-100 rounded-2xl p-8 group"
    >
      <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center text-orange mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-navy mb-2 font-heading">
        {title}
      </h3>
      <p className="text-gray-text text-[15px] leading-relaxed mb-4">
        {description}
      </p>
      <span className="text-orange font-semibold text-sm group-hover:translate-x-1 inline-block transition-transform">
        Learn More →
      </span>
    </a>
  );
}
