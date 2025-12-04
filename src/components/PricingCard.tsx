import { motion } from "framer-motion";
import { Button } from "./Button";

interface PricingCardProps {
  name: string;
  subtitle?: string;
  price: string;
  description: string;
  ctaText: string;
  featured?: boolean; // featured = "Most popular"
}

export function PricingCard({
  name,
  subtitle,
  price,
  description,
  ctaText,
  featured = false,
}: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`
        group cursor-pointer rounded-2xl p-8 shadow-soft border
        transition-all bg-white
        ${featured ? "border-violet-400 bg-gradient-soft" : "border-gray-200"}
      `}
    >
      {/* Title */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">{name}</h3>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>

      {/* Price */}
      <div className="mb-6">
        <p className="text-4xl font-semibold text-gray-900">{price}</p>
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed mb-8 min-h-[120px]">
        {description}
      </p>

      {/* CTA Button */}
      <Button
        variant={featured ? "primary" : "secondary"}
        full
      >
        {ctaText}
      </Button>
    </motion.div>
  );
}
