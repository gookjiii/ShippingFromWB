import { useState } from 'react';
import { useStore } from '../store';
import { Package } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';

export default function Orders() {
  const { user, orders, requestReceiveOrder } = useStore();
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  if (!user) return <Navigate to="/" />;

  const handleReceiveOrder = (orderId: string) => {
    requestReceiveOrder([orderId], commentInputs[orderId] || '');
    setCommentInputs({ ...commentInputs, [orderId]: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px' }}>Заказы</h2>
        <div style={{ background: '#f3f4f6', padding: '8px 16px', borderRadius: '12px', fontSize: '18px', fontWeight: 500 }}>
          Код получения: <span style={{ fontSize: '22px' }}>782 546</span>
        </div>
      </div>

      <div className="card" style={{ minHeight: '300px' }}>
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <Package size={48} color="var(--primary)" style={{ margin: '0 auto 15px', opacity: 0.2 }} />
            <h3 style={{ marginBottom: '20px', color: 'black' }}>Заказов пока нет, добавьте товары на WB.</h3>
            <button className="btn-primary" onClick={() => window.alert('Mock: Открытие WB...')}>
              Открыть WB
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {orders.map(order => (
              <div key={order.id} className="hover-scale" style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <div>
                  <h3 style={{ fontSize: '16px', marginBottom: '5px' }}>{order.itemName}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Цена: {order.price} ₽</p>
                  <p style={{ marginTop: '5px', fontSize: '14px', fontWeight: 500, color: 'var(--primary)' }}>
                    Статус: {
                      order.status === 'wb_transit' ? 'В пути на ПВЗ Ростов' :
                      order.status === 'arrived_rostov' ? 'Готов к получению в Ростове' :
                      order.status === 'transit_mariupol' ? 'Собран, везем в Мариуполь' :
                      order.status === 'arrived_mariupol' ? `Ожидает в Мариуполе (Ячейка: ${order.cellNumber})` :
                      order.status === 'issued' ? 'Выдан' : ''
                    }
                  </p>
                  {order.clientComment && (
                    <p style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>Комментарий: {order.clientComment}</p>
                  )}
                </div>

                <div>
                  {order.status === 'arrived_rostov' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input 
                        type="text" 
                        placeholder="Отменить часть заказа..." 
                        value={commentInputs[order.id] || ''}
                        onChange={e => setCommentInputs({...commentInputs, [order.id]: e.target.value})}
                        style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '12px' }}
                      />
                      <button className="btn-primary" onClick={() => handleReceiveOrder(order.id)}>
                        Получить заказ
                      </button>
                    </div>
                  )}
                  {order.status === 'arrived_mariupol' && (
                    <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => alert('В ПВЗ Мариуполя нужно отсканировать QR клиента.')}>
                      Ожидайте выдачи
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
