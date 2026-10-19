function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество не может быть нулевым');
  }
  if (quantity > product.stock) {
    throw new RangeError('Количество не может быть больше чем есть на складе');
  }
  return [...cart, { ...product, quantity: quantity }];
}
function changeQuantity(cart, id, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество не может быть нулевым');
  }
  const cartItem = cart.find(item => item.id === id);
  if (!cartItem) {
    return cart;
  }
  if (quantity > cartItem.stock) {
    throw new RangeError('Количество не может быть больше чем есть на складе');
  }
  return cart.map(item => item.id === id ? { ...item, quantity: quantity } : item);
}
function removeFromCart(cart, id) {
  return cart.filter(item => item.id !== id);
}
function calculateCartSubtotal(cart) {
  return cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
}
function calculateOrderTotal(cart, promo) {
  const subtotal = calculateCartSubtotal(cart);
  const discount = promo === 'SAVE10' && subtotal >= 20000 ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal < 50000 ? 30000 : 0;
  const total = subtotal - discount + delivery;
  return {subtotal, discount, delivery, total};
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
