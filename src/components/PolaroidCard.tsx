import { motion } from "motion/react";
import { useState } from "react";

interface PolaroidCardProps {
  image?: string;
  title?: string;
  price?: string;
  rotation?: number;
  className?: string;
  onClick?: () => void;
}

function getPlaceholderEmoji(title?: string): string {
  const t = (title ?? "").toLowerCase();
  if (t.includes("scrapbook") || t.includes("memory") || t.includes("person")) return "📖";
  if (t.includes("keychain") || t.includes("charm") || t.includes("paw")) return "🔑";
  if (t.includes("pin") || t.includes("button")) return "💮";
  if (t.includes("sticker")) return "🦄";
  if (t.includes("gift") || t.includes("box")) return "🎁";
  return "🐱";
}

const FLOATERS = ["✨", "🌸", "💕", "⭐", "🎀", "🌷"];

function ImagePlaceholder({ title }: { title?: string }) {
  const emoji = getPlaceholderEmoji(title);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-primary-container/30">
      <div className="absolute inset-2 border-2 border-dashed border-primary/20 rounded-sm pointer-events-none" />
      {FLOATERS.map((e, i) => (
        <motion.span
          key={i}
          className="absolute text-xs select-none pointer-events-none"
          style={{ left: `${10 + (i * 15) % 78}%`, top: `${8 + (i * 17) % 72}%` }}
          animate={{ y: [0, -8, 0], opacity: [0.2, 0.45, 0.2] }}
          transition={{ repeat: Infinity, duration: 2.5 + i * 0.4, delay: i * 0.3, ease: "easeInOut" }}
        >
          {e}
        </motion.span>
      ))}
      <motion.span
        className="text-5xl mb-2 block"
        animate={{ y: [0, -10, 0], scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        {emoji}
      </motion.span>
      <motion.p
        className="text-[9px] font-extrabold tracking-widest uppercase text-primary/70"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        Coming Soon
      </motion.p>
      <p className="text-[9px] italic text-primary/40 mt-0.5 font-serif">
        foto nyusul ya bestie 🐾
      </p>
    </div>
  );
}

export default function PolaroidCard({
  image,
  title,
  price,
  rotation = 0,
  className = "",
  onClick,
}: PolaroidCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: rotation + 2 }}
      className={`polaroid cursor-pointer ${className}`}
      style={{ rotate: `${rotation}deg` }}
      onClick={onClick}
    >
      <div className="aspect-square bg-surface-container overflow-hidden mb-4 rounded-sm">
        {/* Gambar selalu dicoba render dulu, placeholder hanya muncul kalau error */}
        {image && !imgError ? (
          <img
            src={image}
            alt={title ?? "product"}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <ImagePlaceholder title={title} />
        )}
      </div>
      <div className="text-center">
        {title && (
          <h3 className="font-display font-bold text-on-surface text-lg leading-tight mb-1">{title}</h3>
        )}
        {price && <p className="text-on-surface-variant font-sans text-sm">{price}</p>}
      </div>
    </motion.div>
  );
}