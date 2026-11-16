import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product }) {
  const { dispatch: cartDispatch } = useCart();
  const { isWishlisted, dispatch: wishDispatch } = useWishlist();
  const [hoveredImg, setHoveredImg] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const size = product.sizes?.[product.sizes.length > 2 ? 2 : 0];
    cartDispatch({ type: 'ADD_ITEM', payload: { ...product, size } });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-bg-secondary overflow-hidden"
    >
      {product.isSoldOut && (
        <div className="absolute inset-0 z-10 bg-bg-primary/60 flex items-center justify-center">
          <span className="font-display font-black text-2xl text-text-muted tracking-widest">SOLD OUT</span>
        </div>
      )}

      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div
          className="relative aspect-square overflow-hidden bg-bg-primary cursor-pointer"
          onMouseEnter={() => setHoveredImg(true)}
          onMouseLeave={() => setHoveredImg(false)}
        >
          <img
            src={hoveredImg && product.images[1] ? product.images[1] : product.images[0]}
            alt={`${product.brand} ${product.model}`}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-accent-lime text-bg-primary font-mono text-[9px] font-bold uppercase px-2 py-0.5 tracking-widest">
                NEW
              </span>
            )}
            {discount && (
              <span className="bg-accent-red text-white font-mono text-[9px] font-bold uppercase px-2 py-0.5">
                -{discount}%
              </span>
            )}
          </div>

          {/* Quick add */}
          <motion.button
            onClick={handleAddToCart}
            className={`absolute bottom-3 left-3 right-3 py-2.5 font-mono text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${
              addedFeedback
                ? 'bg-accent-lime text-bg-primary'
                : 'bg-bg-primary/90 text-text-primary hover:bg-accent-red hover:text-white'
            }`}
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            <ShoppingBag size={12} />
            {addedFeedback ? 'ADDED ✓' : 'QUICK ADD'}
          </motion.button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">{product.brand}</p>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-display font-bold text-lg text-text-primary leading-tight hover:text-accent-red transition-colors truncate">
              {product.model}
            </h3>
          </Link>
          <p className="text-text-muted text-xs">{product.colorway}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-mono font-bold text-text-primary text-sm">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="font-mono text-xs text-text-muted line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Wishlist */}
        <button
          onClick={() => wishDispatch({ type: 'TOGGLE_ITEM', payload: product })}
          className={`self-start mt-1 transition-colors ${
            isWishlisted(product.id) ? 'text-accent-red' : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <Heart size={16} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
        </button>
      </div>
    </motion.article>
  );
}
