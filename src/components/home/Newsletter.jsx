import { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-24 bg-bg-secondary border-y border-white/5">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Mail size={24} className="text-accent-red mx-auto mb-6" />
            <h2 className="font-display font-black text-6xl md:text-7xl tracking-tighter text-text-primary mb-4">
              DON'T MISS<br />A DROP
            </h2>
            <p className="text-text-muted mb-10 text-lg">
              Get notified about exclusive releases, raffle entries, and curated picks — before anyone else.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-accent-lime/10 border border-accent-lime/20 px-8 py-6"
              >
                <p className="font-display font-bold text-2xl text-accent-lime">YOU'RE IN.</p>
                <p className="text-text-muted text-sm mt-1">Watch your inbox for the best drops.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-bg-primary border border-white/10 text-text-primary placeholder:text-text-muted font-mono text-sm px-5 py-4 outline-none focus:border-accent-red transition-colors"
                />
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 bg-accent-red text-white font-mono text-xs tracking-widest uppercase px-8 py-4 hover:bg-red-500 transition-colors whitespace-nowrap"
                >
                  NOTIFY ME
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

            <p className="text-text-muted text-xs mt-4">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
