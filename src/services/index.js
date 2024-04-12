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

export const getClientsService = async () => {
  const data = await fetch('./src/mockups/Clients.json')
  const clients = await data.json()

  return clients
}
