import { create } from 'zustand';

export type Role = 'client' | 'admin_rostov' | 'admin_mariupol';

export type OrderStatus = 
  | 'wb_transit' 
  | 'arrived_rostov' 
  | 'transit_mariupol' 
  | 'arrived_mariupol' 
  | 'issued';

export interface Order {
  id: string;
  itemName: string;
  price: number;
  status: OrderStatus;
  mariupolAddress?: string;
  cellNumber?: string;
  clientComment?: string;
  userId: string;
}

export interface CartItem {
  id: string;
  itemName: string;
  price: number;
}

interface AppState {
  user: { id: string; phone: string; role: Role; partnerCode?: string } | null;
  wbLinked: boolean;
  balance: number;
  orders: Order[];
  cart: CartItem[];
  mariupolPoint: string | null;
  
  login: (phone: string, partnerCode: string, role: Role) => Promise<void>;
  logout: () => void;
  linkWb: () => void;
  topUpBalance: (amount: number) => Promise<void>;
  setMariupolPoint: (point: string) => Promise<void>;
  
  fetchCart: () => Promise<void>;
  addToCart: (item: { itemName: string; price: number }) => Promise<void>;
  checkoutWbOrders: () => Promise<void>; 
  
  fetchOrders: () => Promise<void>;
  requestReceiveOrder: (orderIds: string[], comment: string) => Promise<void>;
  
  adminFetchOrders: () => Promise<void>;
  adminRostovScan: (orderId: string) => Promise<void>;
  adminMariupolScanArrival: (orderId: string, cellNumber: string) => Promise<void>;
  adminMariupolIssue: (orderIds: string[]) => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const useStore = create<AppState>((set, get) => ({
  user: null,
  wbLinked: false,
  balance: 0,
  orders: [],
  cart: [],
  mariupolPoint: 'ул. Новороссийская 2',
  
  login: async (phone, partnerCode, role) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, partnerCode, role })
      });
      const data = await res.json();
      if (data.user) {
        set({ 
          user: data.user, 
          balance: data.user.balance, 
          mariupolPoint: data.user.mariupolPoint,
          wbLinked: !!data.user.partnerCode || data.user.wbLinked
        });
        get().fetchOrders();
        get().fetchCart();
      }
    } catch (e) { console.error(e); }
  },

  logout: () => set({ user: null, wbLinked: false, orders: [], cart: [], mariupolPoint: null }),
  linkWb: () => set({ wbLinked: true }),
  
  topUpBalance: async (amount) => {
    const { user } = get();
    if (!user) return;
    try {
      const res = await fetch(`${API_URL}/user/${user.id}/top-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      const data = await res.json();
      if (data.user) set({ balance: data.user.balance });
    } catch (e) { console.error(e); }
  },

  setMariupolPoint: async (point) => {
    const { user } = get();
    if (!user) return;
    try {
      await fetch(`${API_URL}/user/${user.id}/mariupol-point`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ point })
      });
      set({ mariupolPoint: point });
    } catch (e) { console.error(e); }
  },
  
  fetchCart: async () => {
    const { user } = get();
    if (!user) return;
    try {
      const res = await fetch(`${API_URL}/cart/${user.id}`);
      const data = await res.json();
      if (data.cart) set({ cart: data.cart });
    } catch (e) { console.error(e); }
  },

  addToCart: async (item) => {
    const { user } = get();
    if (!user) return;
    try {
      await fetch(`${API_URL}/cart/${user.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      get().fetchCart();
    } catch (e) { console.error(e); }
  },

  checkoutWbOrders: async () => {
    const { user } = get();
    if (!user) return;
    try {
      await fetch(`${API_URL}/checkout/${user.id}`, { method: 'POST' });
      get().fetchCart();
      get().fetchOrders();
    } catch (e) { console.error(e); }
  },

  fetchOrders: async () => {
    const { user } = get();
    if (!user) return;
    try {
      const res = await fetch(`${API_URL}/orders/${user.id}`);
      const data = await res.json();
      if (data.orders) set({ orders: data.orders });
    } catch (e) { console.error(e); }
  },

  requestReceiveOrder: async (orderIds, comment) => {
    try {
      await fetch(`${API_URL}/orders/receive-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderIds, comment })
      });
      get().fetchOrders();
    } catch (e) { console.error(e); }
  },
  
  adminFetchOrders: async () => {
    try {
      const res = await fetch(`${API_URL}/admin/orders`);
      const data = await res.json();
      if (data.orders) set({ orders: data.orders });
    } catch (e) { console.error(e); }
  },

  adminRostovScan: async (orderId) => {
    try {
      await fetch(`${API_URL}/admin/rostov/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      });
      get().adminFetchOrders();
    } catch (e) { console.error(e); }
  },

  adminMariupolScanArrival: async (orderId, cellNumber) => {
    try {
      await fetch(`${API_URL}/admin/mariupol/scan-arrival`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, cellNumber })
      });
      get().adminFetchOrders();
    } catch (e) { console.error(e); }
  },

  adminMariupolIssue: async (orderIds) => {
    try {
      await fetch(`${API_URL}/admin/mariupol/issue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderIds })
      });
      get().adminFetchOrders();
    } catch (e) { console.error(e); }
  },
}));

