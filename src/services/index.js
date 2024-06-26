export const getProductsService = async () => {
  const data = await fetch('/mockups/Inventory.json')
  const products = await data.json()

  return products
}

export const getSuppliersService = async () => {
  const data = await fetch('/mockups/Suppliers.json')
  const suppliers = await data.json()

  return suppliers
}

export const getClientsService = async () => {
  const data = await fetch('/mockups/Clients.json')
  const clients = await data.json()

  return clients
}

export const getSalesService = async () => {
  const data = await fetch('/mockups/Sales.json')
  const sales = await data.json()

  return sales
}

export const getReceiptsService = async () => {
  const data = await fetch('/mockups/Receipt.json')
  const receipts = await data.json()

  return receipts
}

export const getOrdersService = async () => {
  const data = await fetch('/mockups/Orders.json')
  const orders = await data.json()

  return orders
}
