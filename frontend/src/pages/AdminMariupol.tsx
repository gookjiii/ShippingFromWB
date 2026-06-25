import { useState } from 'react';
import { useStore } from '../store';
import { Box, Scan } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function AdminMariupol() {
  const { user, orders, adminMariupolScanArrival, adminMariupolIssue } = useStore();
  const [cellInput, setCellInput] = useState<{ [key: string]: string }>({});

  if (!user || user.role !== 'admin_mariupol') {
    return <Navigate to="/" />;
  }

  const incomingOrders = orders.filter(o => o.status === 'transit_mariupol');
  const readyOrders = orders.filter(o => o.status === 'arrived_mariupol');

  const handleAssignCell = (orderId: string) => {
    const cell = cellInput[orderId];
    if (cell && cell.trim() !== '') {
      adminMariupolScanArrival(orderId, cell);
    } else {
      alert('Введите номер ячейки!');
    }
  };

  const handleIssueToClient = () => {
    // In a real app, this would be triggered by scanning the client's QR code 
    // which contains their user ID, and we'd fetch all their ready orders.
    // Here we'll just mock it by issuing ALL ready orders for the demo.
    if (readyOrders.length > 0) {
      adminMariupolIssue(readyOrders.map(o => o.id));
      alert('Заказы успешно выданы клиенту!');
    }
  };

  return (
    <div>
      <div className="card hover-scale" style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Box color="white" /> ПВЗ Мариуполь
        </h2>
        <p style={{ opacity: 0.8, marginTop: '10px' }}>Ожидают приемки (раскладки по ячейкам)</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Приемка товаров (Receiving goods) */}
        <div className="card">
          <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
            Входящие товары из Ростова
          </h3>
          {incomingOrders.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>Нет товаров в пути.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {incomingOrders.map(order => (
                <div key={order.id} className="hover-scale" style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <h4 style={{ fontSize: '15px', marginBottom: '0' }}>{order.itemName}</h4>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                      type="text" 
                      placeholder="Номер ячейки"
                      value={cellInput[order.id] || ''}
                      onChange={e => setCellInput({ ...cellInput, [order.id]: e.target.value })}
                      style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}
                    />
                    <button 
                      className="btn-outline hover-scale" 
                      onClick={() => handleAssignCell(order.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', borderColor: 'var(--primary)' }}
                    >
                      <Scan size={18} /> Принять
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Выдача клиенту (Issuing to client) */}
        <div className="card hover-scale" style={{ border: '2px solid var(--primary)' }}>
          <h3 style={{ marginBottom: '20px', color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
            Выдача заказа клиенту
          </h3>
          
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button className="btn-primary" style={{ width: '100%', padding: '15px', fontSize: '16px', display: 'flex', justifyContent: 'center', gap: '10px' }} onClick={handleIssueToClient}>
              <Scan /> Сканировать QR клиента
            </button>
          </div>

          {readyOrders.length > 0 && (
            <div>
              <h4 style={{ marginBottom: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>Готовые к выдаче:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {readyOrders.map(order => (
                  <div key={order.id} style={{ background: '#f3f4f6', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{order.itemName}</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Ячейка: {order.cellNumber}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
