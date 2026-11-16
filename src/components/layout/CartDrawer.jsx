import { motion } from 'framer-motion';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ open, onClose }) {
  const { items, total, count, dispatch } = useCart();

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: open ? 0 : '100%' }}
      transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 right-0 h-full w-full max-w-md bg-bg-secondary z-[100] flex flex-col border-l border-white/10"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/5">
        <div>
          <h2 className="font-display font-bold text-xl text-text-primary">YOUR BAG</h2>
          <p className="text-text-muted text-xs font-mono mt-0.5">{count} ITEM{count !== 1 ? 'S' : ''}</p>
        </div>
        <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-text-muted font-display text-2xl font-bold mb-2">YOUR BAG IS EMPTY</p>
            <p className="text-text-muted text-sm mb-6">Add some fire kicks to get started.</p>
            <Link
              to="/shop"
              onClick={onClose}
              className="bg-accent-red text-white font-mono text-xs tracking-widest uppercase px-6 py-3 hover:bg-red-500 transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
        ) : (
          items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-bg-primary p-4">
              <img
                src={item.images?.[0]}
                alt={item.model}
                className="w-20 h-20 object-cover object-center"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-muted font-mono uppercase">{item.brand}</p>
                <p className="text-text-primary font-display font-bold text-sm truncate">{item.model}</p>
                <p className="text-text-muted text-xs">{item.size}</p>
                <p className="text-accent-red font-mono text-sm mt-1">₹{item.price.toLocaleString()}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, size: item.size, qty: item.qty - 1 } })}
                    className="text-text-muted hover:text-text-primary w-6 h-6 flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="font-mono text-xs text-text-primary">{item.qty}</span>
                  <button
                    onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, size: item.size, qty: item.qty + 1 } })}
                    className="text-text-muted hover:text-text-primary w-6 h-6 flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id, size: item.size } })}
                    className="ml-auto text-text-muted hover:text-accent-red transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="p-6 border-t border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs text-text-muted uppercase tracking-widest">Subtotal</span>
            <span className="font-display font-bold text-xl text-text-primary">
              ₹{total.toLocaleString()}
            </span>
          </div>
          <Link
            to="/cart"
            onClick={onClose}
            className="block w-full bg-accent-red text-white text-center font-mono text-xs tracking-widest uppercase py-4 hover:bg-red-500 transition-colors"
          >
            PROCEED TO CHECKOUT
          </Link>
        </div>
      )}
    </motion.div>
  );
}
