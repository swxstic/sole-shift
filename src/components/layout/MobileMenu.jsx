import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Releases', to: '/releases' },
  { label: 'Editorial', to: '/editorial' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Cart', to: '/cart' },
];

export default function MobileMenu({ onClose }) {
  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 bg-bg-primary flex flex-col p-8"
    >
      <button onClick={onClose} className="self-end text-text-muted hover:text-text-primary mb-12">
        <X size={24} />
      </button>

      <nav className="flex flex-col gap-6">
        {navLinks.map((link, i) => (
          <motion.div
            key={link.to}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 + 0.1 }}
          >
            <NavLink
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `font-display font-black text-5xl tracking-tighter transition-colors ${
                  isActive ? 'text-accent-red' : 'text-text-primary hover:text-accent-red'
                }`
              }
            >
              {link.label.toUpperCase()}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className="mt-auto">
        <p className="text-text-muted font-mono text-xs">
          SOLE<span className="text-accent-red">//</span>SHIFT © 2026
        </p>
      </div>
    </motion.div>
  );
}
