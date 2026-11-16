import { motion } from 'framer-motion';

export default function VideoShowcase() {
  return (
    <section className="relative py-24 overflow-hidden bg-bg-secondary">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-xs text-accent-red tracking-widest uppercase mb-4">— Authenticity</p>
            <h2 className="font-display font-black text-6xl md:text-7xl tracking-tighter text-text-primary leading-none mb-6">
              EVERY<br />PAIR.<br />
              <span className="text-stroke">VERIFIED.</span>
            </h2>
            <p className="text-text-muted leading-relaxed max-w-sm mb-8">
              Our team of expert authenticators inspects every sneaker across 60+ checkpoints before it reaches your door. No fakes. No compromises.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Checkpoints', value: '60+' },
                { label: 'Days Return', value: '30' },
                { label: 'Satisfaction', value: '99%' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display font-black text-4xl text-accent-red">{s.value}</p>
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=900&q=80"
              alt="Sneaker authentication"
              className="w-full h-full object-cover"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-6 left-6 bg-bg-primary/90 backdrop-blur-sm px-4 py-3 border border-white/10">
              <p className="font-mono text-xs text-accent-lime uppercase tracking-widest">✓ Authenticated</p>
              <p className="font-display font-bold text-lg text-text-primary">Air Jordan 1 Chicago</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
