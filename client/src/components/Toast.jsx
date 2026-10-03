import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg shadow-lg text-sm text-white transition-all
        ${isError ? 'bg-red-500' : 'bg-[#4A5D3A]'}`}
    >
      {toast.message}
    </div>
  );
}