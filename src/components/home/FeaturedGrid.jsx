import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../../data/products';
import { useWishlist } from '../../context/WishlistContext';

const featured = products.filter((p) => p.isTrending).slice(0, 4);

export default function FeaturedGrid() {
  const { isWishlisted, dispatch } = useWishlist();

  return (
    <section className="py-24 px-6 max-w-[1440px] mx-auto">
      {/* Section header */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="font-mono text-xs text-accent-red tracking-widest uppercase mb-2">— Curated</p>
          <h2 className="font-display font-black text-6xl md:text-7xl tracking-tighter text-text-primary">
            TRENDING<br />NOW
          </h2>
        </div>
        <Link
          to="/shop"
          className="hidden md:flex items-center gap-2 font-mono text-xs text-text-muted hover:text-text-primary tracking-widest uppercase transition-colors border-b border-white/10 pb-1"
        >
          VIEW ALL
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featured.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-bg-secondary overflow-hidden"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-bg-secondary">
              <img
                src={product.images[0]}
                alt={`${product.brand} ${product.model}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Tags */}
              <div className="absolute top-3 left-3 flex gap-2">
                {product.isNew && (
                  <span className="bg-accent-lime text-bg-primary font-mono text-[9px] font-bold uppercase px-2 py-0.5 tracking-widest">
                    NEW
                  </span>
                )}
                {product.isTrending && (
                  <span className="bg-accent-red text-white font-mono text-[9px] font-bold uppercase px-2 py-0.5 tracking-widest">
                    HOT
                  </span>
                )}
              </div>
              {/* Wishlist */}
              <button
                onClick={() => dispatch({ type: 'TOGGLE_ITEM', payload: product })}
                className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-colors ${
                  isWishlisted(product.id) ? 'text-accent-red' : 'text-white/40 hover:text-white'
                }`}
              >
                <Heart size={16} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">{product.brand}</p>
              <Link to={`/product/${product.id}`}>
                <h3 className="font-display font-bold text-lg text-text-primary leading-tight hover:text-accent-red transition-colors">
                  {product.model}
                </h3>
              </Link>
              <p className="text-text-muted text-xs mt-0.5">{product.colorway}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="font-mono font-bold text-text-primary">₹{product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <span className="font-mono text-xs text-text-muted line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
