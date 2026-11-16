import { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext(null);

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        return { ...state, items: state.items.filter((i) => i.id !== action.payload.id) };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.payload.id) };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(
    wishlistReducer,
    { items: [] },
    () => {
      try {
        return { items: JSON.parse(localStorage.getItem('ss_wishlist') || '[]') };
      } catch {
        return { items: [] };
      }
    }
  );

  useEffect(() => {
    localStorage.setItem('ss_wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const isWishlisted = (id) => state.items.some((i) => i.id === id);
  const count = state.items.length;

  return (
    <WishlistContext.Provider value={{ items: state.items, count, isWishlisted, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
