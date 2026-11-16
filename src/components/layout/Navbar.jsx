import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import MobileMenu from './MobileMenu';

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Releases', to: '/releases' },
  { label: 'Editorial', to: '/editorial' },
];

export default function Navbar() {
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-bg-primary/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-display font-900 text-2xl tracking-tighter text-text-primary">
            SOLE<span className="text-accent-red">//</span>SHIFT
          </Link>

          {/* Center nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `font-mono text-xs tracking-widest uppercase transition-colors ${
                      isActive ? 'text-accent-red' : 'text-text-muted hover:text-text-primary'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            <button className="text-text-muted hover:text-text-primary transition-colors hidden md:flex">
              <Search size={18} />
            </button>

            <Link to="/wishlist" className="relative text-text-muted hover:text-text-primary transition-colors">
              <Heart size={18} />
              {wishCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent-lime text-bg-primary text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative text-text-muted hover:text-text-primary transition-colors">
              <ShoppingBag size={18} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent-red text-white text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            <button
              className="md:hidden text-text-primary"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
