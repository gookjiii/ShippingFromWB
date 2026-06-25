import { useState } from 'react';
import { useStore } from '../store';
import { Navigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

export default function Profile() {
  const { user, balance, topUpBalance, logout, wbLinked, linkWb } = useStore();
  const [topUpAmount, setTopUpAmount] = useState('');

  if (!user) return <Navigate to="/" />;

  const handleTopUp = (amount: number) => {
    topUpBalance(amount);
  };

  const handleCustomTopUp = () => {
    const val = parseInt(topUpAmount, 10);
    if (!isNaN(val) && val > 0) {
      handleTopUp(val);
      setTopUpAmount('');
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Профиль</h2>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div className="card hover-scale" style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{ width: '50px', height: '50px', background: '#f3e8ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <User size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px' }}>Клиент {user.phone}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Роль: {user.role}</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
            <h1 style={{ fontSize: '36px', marginBottom: '5px' }}>{balance} ₽</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Баланс</p>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input 
                type="number" 
                placeholder="Введите сумму" 
                value={topUpAmount}
                onChange={e => setTopUpAmount(e.target.value)}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}
              />
              <span style={{ padding: '10px', color: 'var(--text-muted)' }}>₽</span>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              {[300, 500, 700, 1000].map(amt => (
                <button 
                  key={amt}
                  className="btn-outline hover-scale" 
                  style={{ flex: 1, padding: '10px 0', fontSize: '14px', color: 'var(--primary)', borderColor: 'var(--primary-light)', background: 'var(--primary-light)' }}
                  onClick={() => handleTopUp(amt)}
                >
                  {amt} ₽
                </button>
              ))}
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', opacity: topUpAmount ? 1 : 0.5 }} 
              onClick={handleCustomTopUp}
            >
              Пополнить
            </button>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card hover-scale">
            <h3 style={{ marginBottom: '15px' }}>Статус Wildberries</h3>
            {!wbLinked ? (
              <div style={{ padding: '20px', background: '#f3e8ff', borderRadius: '12px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', marginBottom: '15px' }}>Свяжите аккаунт, чтобы заказы появлялись автоматически.</p>
                <button className="btn-primary" onClick={linkWb}>Привязать Wildberries</button>
              </div>
            ) : (
              <div style={{ padding: '20px', background: '#ecfdf5', color: '#059669', borderRadius: '12px', textAlign: 'center' }}>
                ✓ Аккаунт Wildberries привязан
              </div>
            )}
          </div>

          <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#dc2626', borderColor: '#fecaca' }} onClick={logout}>
            <LogOut size={18} /> Выйти
          </button>
        </div>
      </div>
    </div>
  );
}
