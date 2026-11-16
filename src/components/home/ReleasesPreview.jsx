import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { releases } from '../../data/products';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function ReleasesPreview() {
  return (
    <section className="py-24 px-6 max-w-[1440px] mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="font-mono text-xs text-accent-red tracking-widest uppercase mb-2">— Coming Soon</p>
          <h2 className="font-display font-black text-6xl md:text-7xl tracking-tighter text-text-primary">
            UPCOMING<br />DROPS
          </h2>
        </div>
        <Link
          to="/releases"
          className="hidden md:flex items-center gap-2 font-mono text-xs text-text-muted hover:text-text-primary tracking-widest uppercase transition-colors border-b border-white/10 pb-1"
        >
          VIEW ALL DROPS
        </Link>
      </div>

      <div className="space-y-px">
        {releases.map((release, i) => (
          <motion.div
            key={release.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group flex items-center gap-6 bg-bg-secondary hover:bg-bg-secondary/80 p-4 md:p-6 transition-colors border border-white/0 hover:border-white/5"
          >
            {/* Number */}
            <span className="font-mono text-xs text-text-muted w-6 shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Image */}
            <div className="w-16 h-16 shrink-0 overflow-hidden bg-bg-primary">
              <img
                src={release.image}
                alt={release.model}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[10px] text-accent-red uppercase tracking-widest">{release.brand}</p>
              <h3 className="font-display font-bold text-xl text-text-primary truncate">{release.model}</h3>
              <p className="text-text-muted text-xs truncate mt-0.5">{release.description}</p>
            </div>

            {/* Meta */}
            <div className="text-right shrink-0">
              <div className="flex items-center gap-1 text-text-muted text-xs font-mono justify-end mb-1">
                <Clock size={10} />
                {formatDate(release.releaseDate)}
              </div>
              <p className="font-display font-bold text-xl text-text-primary">₹{release.price.toLocaleString()}</p>
              {release.raffle && (
                <span className="font-mono text-[9px] text-accent-lime uppercase tracking-widest">RAFFLE</span>
              )}
            </div>

            <ArrowRight
              size={16}
              className="text-text-muted group-hover:text-accent-red group-hover:translate-x-1 transition-all shrink-0"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
