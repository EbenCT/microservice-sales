const Sale = require('../models/Sale');

const createSale = async (req, res) => {
  try {
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
    
    const sale = await Sale.create({
      customerId,
      productId,
      quantity,
      unitPrice,
      totalAmount
    });

    res.status(201).json({
      message: 'Venta creada exitosamente',
      sale
    });
  } catch (error) {
    console.error('Error al crear venta:', error);
    res.status(500).json({ error: 'Error al crear venta', details: error.message });
  }
};

const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findByPk(id);

    if (!sale) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener venta' });
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, unitPrice, status } = req.body;

    const sale = await Sale.findByPk(id);
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

    await sale.save();

    res.json({
      message: 'Venta actualizada exitosamente',
      sale
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar venta' });
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findByPk(id);

    if (!sale) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    await sale.destroy();
    res.json({ message: 'Venta eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar venta' });
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale
};
