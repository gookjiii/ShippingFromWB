import { useStore } from '../store';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function Cart() {
  const { user, cart, mariupolPoint, checkoutWbOrders } = useStore();

  if (!user) return <Navigate to="/" />;

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Корзина</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '14px' }}>
        Цена указана без учета WB кошелька и будет перерасчитана после оплаты товара на WB.
      </p>

      <div className="card hover-scale">
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Адрес заказа товаров (ВБ Ростов)</h3>
        <p style={{ color: 'var(--text-muted)' }}>г. Ростов-на-Дону, ул. Примерная 10</p>
      </div>

      <div className="card hover-scale" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Адрес выдачи товаров (Мариуполь)</h3>
          <p style={{ color: 'var(--text-muted)' }}>{mariupolPoint || 'Не выбран'}</p>
        </div>
      </div>

      <div className="card hover-scale" style={{ textAlign: 'center', padding: '40px 20px' }}>
        {cart.length === 0 ? (
          <>
            <ShoppingCart size={48} color="var(--primary)" style={{ opacity: 0.2, margin: '0 auto 15px' }} />
            <h3 style={{ marginBottom: '15px' }}>Корзина пуста, добавьте товары в магазине.</h3>
            {/* Using mock function to simulate adding items */}
            <button className="btn-primary" onClick={() => useStore.getState().addToCart({ id: Math.random().toString(), itemName: 'Новый Товар с ВБ', price: 1500 })}>
              Перейти в магазин (Mock Add Item)
            </button>
          </>
        ) : (
          <div>
            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item.itemName}</span>
                  <strong>{item.price} ₽</strong>
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={() => {
              checkoutWbOrders();
              alert('Заказ оформлен! Перейдите в Заказы.');
            }} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              Оплатить на WB <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
