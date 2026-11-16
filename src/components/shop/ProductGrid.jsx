import { AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="font-display font-black text-5xl text-text-muted tracking-tighter mb-3">NO RESULTS</p>
        <p className="text-text-muted text-sm">Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </AnimatePresence>
    </div>
  );
}
