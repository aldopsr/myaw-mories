import { motion } from "motion/react";

interface PolaroidCardProps {
  image: string;
  title: string;
  price?: string;
  rotation?: number;
  className?: string;
  onClick?: () => void;
}

export default function PolaroidCard({ image, title, price, rotation = 0, className = "", onClick }: PolaroidCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: rotation + 2 }}
      className={`polaroid cursor-pointer ${className}`}
      style={{ rotate: `${rotation}deg` }}
      onClick={onClick}
    >
      <div className="aspect-square bg-surface-container overflow-hidden mb-4 rounded-sm">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="text-center">
        <h3 className="font-display font-bold text-on-surface text-lg leading-tight mb-1">{title}</h3>
        {price && <p className="text-on-surface-variant font-sans text-sm">{price}</p>}
      </div>
    </motion.div>
  );
}
