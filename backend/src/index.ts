import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- Authentication ---
// Phone + Partner Code
app.post('/api/auth/login', async (req, res) => {
  const { phone, partnerCode } = req.body;
  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    let user = await prisma.user.findUnique({ where: { phone } });
    
    if (!user) {
      // First time login, create user
      user = await prisma.user.create({
        data: {
          phone,
          partnerCode: partnerCode || null,
          role: 'client' // default role
        }
      });
    } else {
      // If user exists, optionally update partner code if provided during login
      if (partnerCode && user.partnerCode !== partnerCode) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { partnerCode }
        });
      }
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- User Profile ---
app.get('/api/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/user/:userId/top-up', async (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { balance: { increment: amount } }
    });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to top up' });
  }
});

app.post('/api/user/:userId/mariupol-point', async (req, res) => {
  const { userId } = req.params;
  const { point } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { mariupolPoint: point }
    });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update point' });
  }
});

// --- Cart ---
app.get('/api/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await prisma.cartItem.findMany({ where: { userId } });
    res.json({ cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

app.post('/api/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  const { itemName, price } = req.body;
  try {
    const item = await prisma.cartItem.create({
      data: { itemName, price, userId }
    });
    res.json({ item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

app.post('/api/checkout/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const cartItems = await prisma.cartItem.findMany({ where: { userId } });
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const newOrders = cartItems.map(item => ({
      itemName: item.itemName,
      price: item.price,
      status: 'wb_transit',
      userId: userId
    }));

    await prisma.order.createMany({ data: newOrders });
    await prisma.cartItem.deleteMany({ where: { userId } });

    const orders = await prisma.order.findMany({ where: { userId } });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Checkout failed' });
  }
});

// --- Orders (Client) ---
app.get('/api/orders/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await prisma.order.findMany({ where: { userId } });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post('/api/orders/receive-request', async (req, res) => {
  const { orderIds, comment } = req.body;
  try {
    await prisma.order.updateMany({
      where: { id: { in: orderIds } },
      data: { clientComment: comment }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit receive request' });
  }
});

// --- Admin Actions ---
app.get('/api/admin/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { user: true }
    });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin orders' });
  }
});

app.post('/api/admin/rostov/scan', async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'transit_mariupol' }
    });
    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

app.post('/api/admin/mariupol/scan-arrival', async (req, res) => {
  const { orderId, cellNumber } = req.body;
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'arrived_mariupol', cellNumber }
    });
    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

app.post('/api/admin/mariupol/issue', async (req, res) => {
  const { orderIds } = req.body;
  try {
    await prisma.order.updateMany({
      where: { id: { in: orderIds } },
      data: { status: 'issued' }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to issue orders' });
  }
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
});
