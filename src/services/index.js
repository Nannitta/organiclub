export const getProductsService = async () => {
  const data = await fetch('./src/mockups/Inventory.json')
  const products = await data.json()

  return products
}

export const getSuppliersService = async () => {
  const data = await fetch('./src/mockups/Suppliers.json')
  const suppliers = await data.json()

  return suppliers
}
