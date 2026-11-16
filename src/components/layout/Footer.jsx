import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'All Sneakers', to: '/shop' },
    { label: 'New Releases', to: '/releases' },
    { label: 'Trending', to: '/shop?filter=trending' },
    { label: 'On Sale', to: '/shop?filter=sale' },
  ],
  Info: [
    { label: 'Editorial', to: '/editorial' },
    { label: 'Sizing Guide', to: '/sizing' },
    { label: 'Authenticity', to: '/authenticity' },
    { label: 'Shipping & Returns', to: '/shipping' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Careers', to: '/careers' },
    { label: 'Press', to: '/press' },
    { label: 'Contact', to: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-white/5 mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 pt-16 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="font-display font-black text-3xl tracking-tighter text-text-primary mb-4 block">
              SOLE<span className="text-accent-red">//</span>SHIFT
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              The definitive destination for premium sneakers. Authenticated. Curated. Delivered.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-text-muted hover:text-accent-red transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-text-muted hover:text-accent-red transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-text-muted hover:text-accent-red transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-mono text-xs tracking-widest uppercase text-text-muted mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-text-muted hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs font-mono">
            © 2026 SOLE//SHIFT. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-text-muted hover:text-text-primary text-xs font-mono transition-colors">
              PRIVACY
            </Link>
            <Link to="/terms" className="text-text-muted hover:text-text-primary text-xs font-mono transition-colors">
              TERMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
