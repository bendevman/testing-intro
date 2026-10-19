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
  console.log(cartItem)
  if (!cartItem) {
    return cart;
  }
  if (quantity > cartItem.stock) {
    throw new RangeError('Количество не может быть больше чем есть на складе');
  }
  return cart.map(item => item.id === id ? { ...item, quantity: quantity } : item);
}
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
