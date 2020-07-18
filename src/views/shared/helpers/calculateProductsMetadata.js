/* eslint-disable no-return-assign */
import config from '../../../config';

export const calculatePrice = products => (
  products
    .map(product => (parseFloat(product.price) * parseInt(product.quantity) || 0))
    .reduce((accumulator, current) => accumulator + current, 0)
);

export const calculateNumItems = products => (
  products.reduce((accumulator, current) => accumulator + parseInt(current.quantity), 0)
);

const calculateProductsMetadata = products => {
  const subtotal = calculatePrice(products);
  const taxes = subtotal * config.TAX_RATIO;
  const total = subtotal + taxes;  // TODO account for delivery fee
  const numItems = calculateNumItems(products);

  return { subtotal, taxes, total, numItems };
};

export default calculateProductsMetadata;
