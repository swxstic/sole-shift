import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const headline = ['WEAR', 'WHAT', 'MATTERS'];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-primary">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1800&q=80)',
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/20 via-transparent to-bg-primary" />

      {/* Red accent bar */}
      <motion.div
        className="absolute left-0 top-1/4 w-1 h-32 bg-accent-red"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 text-center">
        {/* Category label */}
        <motion.p
          className="font-mono text-xs tracking-[0.4em] text-accent-red uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Premium Sneaker Marketplace
        </motion.p>

        {/* Headline */}
        <div className="overflow-hidden">
          {headline.map((word, i) => (
            <motion.div
              key={word}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className={`block font-display font-black leading-none tracking-tighter ${
                  i === 1 ? 'text-stroke text-[16vw]' : 'text-text-primary text-[16vw]'
                }`}
              >
                {word}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Sub headline */}
        <motion.p
          className="text-text-muted text-lg md:text-xl mt-6 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Every pair authenticated. Every story told. The sneakers you deserve.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <Link
            to="/shop"
            className="group flex items-center gap-2 bg-accent-red text-white font-mono text-xs tracking-widest uppercase px-8 py-4 hover:bg-red-500 transition-colors"
          >
            SHOP NOW
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/releases"
            className="font-mono text-xs tracking-widest uppercase text-text-muted border border-white/20 px-8 py-4 hover:border-white/60 hover:text-text-primary transition-colors"
          >
            UPCOMING DROPS
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex items-center justify-center gap-12 mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          {[
            { label: 'Brands', value: '50+' },
            { label: 'Models', value: '1,200+' },
            { label: 'Verified', value: '100%' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display font-black text-3xl text-text-primary">{stat.value}</p>
              <p className="font-mono text-xs text-text-muted uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={14} />
      </motion.div>
    </section>
  );
}
