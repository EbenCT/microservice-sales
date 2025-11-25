
// Array en memoria para almacenar ventas
let sales = [
  {
    id: 1,
    customerId: 101,
    productId: 501,
    quantity: 2,
    unitPrice: 10.5,
    totalAmount: 21.0,
    saleDate: new Date(),
    status: 'completed'
  }
];
let nextId = 2;

const createSale = (req, res) => {
  const { customerId, productId, quantity, unitPrice } = req.body;
  if (!customerId || !productId || !quantity || !unitPrice) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  if (quantity < 1) {
    return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
  }
  if (unitPrice < 0) {
    return res.status(400).json({ error: 'El precio unitario no puede ser negativo' });
  }
  const totalAmount = parseFloat(quantity) * parseFloat(unitPrice);
  const sale = {
    id: nextId++,
    customerId,
    productId,
    quantity,
    unitPrice,
    totalAmount,
    saleDate: new Date(),
    status: 'pending'
  };
  sales.push(sale);
  res.status(201).json({ message: 'Venta creada exitosamente', sale });
};

const getAllSales = (req, res) => {
  res.json(sales.slice().reverse());
};

const getSaleById = (req, res) => {
  const { id } = req.params;
  const sale = sales.find(s => s.id === parseInt(id));
  if (!sale) {
    return res.status(404).json({ error: 'Venta no encontrada' });
  }
  res.json(sale);
};

const updateSale = (req, res) => {
  const { id } = req.params;
  const { quantity, unitPrice, status } = req.body;
  const sale = sales.find(s => s.id === parseInt(id));
  if (!sale) {
    return res.status(404).json({ error: 'Venta no encontrada' });
  }
  if (quantity !== undefined) {
    if (quantity < 1) {
      return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
    }
    sale.quantity = quantity;
  }
  if (unitPrice !== undefined) {
    if (unitPrice < 0) {
      return res.status(400).json({ error: 'El precio unitario no puede ser negativo' });
    }
    sale.unitPrice = unitPrice;
  }
  if (status !== undefined) {
    if (!['pending', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }
    sale.status = status;
  }
  // Recalcular total si cambiaron quantity o unitPrice
  if (quantity !== undefined || unitPrice !== undefined) {
    sale.totalAmount = parseFloat(sale.quantity) * parseFloat(sale.unitPrice);
  }
  res.json({ message: 'Venta actualizada exitosamente', sale });
};

const deleteSale = (req, res) => {
  const { id } = req.params;
  const index = sales.findIndex(s => s.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Venta no encontrada' });
  }
  sales.splice(index, 1);
  res.json({ message: 'Venta eliminada exitosamente' });
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale
};
