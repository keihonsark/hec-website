"use client";

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: "orange" | "outline" | "navy";
  href?: string;
  className?: string;
  onClick?: () => void;
}

export default function CTAButton({
  children,
  variant = "orange",
  href,
  className = "",
  onClick,
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-semibold text-base tracking-wide transition-all duration-200 cta-press cursor-pointer";

  const variants = {
    orange: "bg-orange text-white hover:bg-orange-dark shadow-lg shadow-orange/20",
    outline:
      "border-2 border-white text-white hover:bg-white/10",
    navy: "bg-navy-dark text-white hover:bg-navy shadow-lg",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
