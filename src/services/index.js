export const getProductsService = async () => {
  const data = await fetch('./src/mockups/Inventory.json');
  const products = await data.json();

  return products;
}