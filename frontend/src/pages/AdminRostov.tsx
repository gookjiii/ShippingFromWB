
import { useStore } from '../store';
import { QrCode, ScanLine } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function AdminRostov() {
  const { user, orders, adminRostovScan } = useStore();

  if (!user || user.role !== 'admin_rostov') {
    return <Navigate to="/" />;
  }

  // Filter orders that clients requested to receive (or just arrived in Rostov)
  // In a real app, this would specifically listen to "requestReceiveOrder" events.
  const requestedOrders = orders.filter(o => o.status === 'arrived_rostov' && o.clientComment !== undefined);

  return (
    <div>
      <div className="card hover-scale" style={{ background: '#111827', color: 'white', border: '1px solid #374151' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ScanLine color="#b266ff" /> Панель Администратора ВБ (Ростов-на-Дону)
        </h2>
        <p style={{ color: '#9ca3af', marginTop: '10px' }}>Ожидают сканирования и отправки в Мариуполь</p>
      </div>

      <div className="card">
        {requestedOrders.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>Нет новых запросов на получение заказов.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {requestedOrders.map(order => (
              <div key={order.id} className="hover-scale" style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <div>
                  <h3 style={{ fontSize: '16px', marginBottom: '5px' }}>{order.itemName}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>ID заказа: {order.id}</p>
                  {order.clientComment && (
                    <div style={{ marginTop: '10px', background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '8px', fontSize: '14px' }}>
                      <strong>Комментарий клиента:</strong> {order.clientComment}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '12px', color: '#059669', background: '#d1fae5', padding: '4px 8px', borderRadius: '12px' }}>Уведомление получено</span>
                  <button 
                    className="btn-primary hover-scale" 
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    onClick={() => adminRostovScan(order.id)}
                  >
                    <QrCode size={18} /> Сканировать (В программе ВБ)
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
