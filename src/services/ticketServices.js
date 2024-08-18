export const validateAndCalculate = async (cart) => {
  const productsWithoutStock = [];
  let totalAmount = 0;

  for (const item of cart.products) {
    const product = item.product;

    if (product.stock >= item.quantity) {
      totalAmount += item.quantity * product.price;
    } else {
      productsWithoutStock.push({
        productId: product._id,
        name: product.name,
        requested: item.quantity,
        available: product.stock
      });
    }
  }

  return { totalAmount, productsWithoutStock };
};
