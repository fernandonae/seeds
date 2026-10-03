import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'semillas_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  // Guarda en localStorage cada vez que cambian los items
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Oculta el toast después de un tiempo
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        if (existing.cantidad >= product.stock) {
          setToast({ type: 'error', message: 'No hay más stock disponible' });
          return prev;
        }
        setToast({ type: 'success', message: `${product.nombre} agregado ✓` });
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      if (product.stock < 1) {
        setToast({ type: 'error', message: 'Producto sin stock' });
        return prev;
      }

      setToast({ type: 'success', message: `${product.nombre} agregado ✓` });
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, cantidad) => {
    if (cantidad < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item._id === productId
          ? { ...item, cantidad: Math.min(cantidad, item.stock) }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        toast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}