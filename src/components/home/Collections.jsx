import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { collections } from '../../data/products';

export default function Collections() {
  return (
    <section className="py-24 px-6 max-w-[1440px] mx-auto">
      <div className="mb-12">
        <p className="font-mono text-xs text-accent-red tracking-widest uppercase mb-2">— Collections</p>
        <h2 className="font-display font-black text-6xl md:text-7xl tracking-tighter text-text-primary">
          SHOP BY<br />COLLECTION
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {collections.map((col, i) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
          >
            <img
              src={col.image}
              alt={col.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/30 to-transparent" />

            {/* Accent line */}
            <motion.div
              className="absolute left-0 bottom-0 h-1 bg-current transition-all duration-500 group-hover:w-full w-0"
              style={{ color: col.accent }}
            />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3
                className="font-display font-black text-3xl tracking-tighter leading-tight mb-1"
                style={{ color: col.accent }}
              >
                {col.name}
              </h3>
              <p className="text-text-muted text-sm mb-4">{col.description}</p>
              <Link
                to={`/shop?collection=${col.id}`}
                className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-text-primary hover:gap-3 transition-all"
              >
                EXPLORE <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
