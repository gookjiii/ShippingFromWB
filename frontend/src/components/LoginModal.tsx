import { useState } from 'react';
import { useStore } from '../store';
import type { Role } from '../store';

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [phone, setPhone] = useState('');
  const login = useStore(state => state.login);

  const handleQuickLogin = (role: Role, phoneNum: string) => {
    login(phoneNum, '', role);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length > 5) {
      login(phone, '', 'client');
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 style={{ marginBottom: '10px', fontSize: '24px', textAlign: 'center' }}>Демо Вход</h2>
        <p style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--text-muted)' }}>
          Выберите роль для входа в один клик
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' }}>
          <button 
            type="button"
            className="btn-primary" 
            onClick={() => handleQuickLogin('client', '7777777777')}
            style={{ padding: '15px', fontSize: '16px', display: 'flex', justifyContent: 'center', gap: '8px' }}
          >
            👤 Войти как Клиент
          </button>
          
          <button 
            type="button"
            className="btn-primary" 
            onClick={() => handleQuickLogin('admin_rostov', '8888888888')}
            style={{ padding: '15px', fontSize: '16px', backgroundColor: '#8b5cf6', display: 'flex', justifyContent: 'center', gap: '8px' }}
          >
            📦 Админ (Ростов ВБ)
          </button>
          
          <button 
            type="button"
            className="btn-primary" 
            onClick={() => handleQuickLogin('admin_mariupol', '9999999999')}
            style={{ padding: '15px', fontSize: '16px', backgroundColor: '#10b981', display: 'flex', justifyContent: 'center', gap: '8px' }}
          >
            🏢 Админ (Мариуполь ПВЗ)
          </button>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '10px', textAlign: 'center' }}>
            Или введите любой номер телефона для нового клиента:
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="tel" 
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="79000000000"
              style={{ 
                flex: 1, 
                padding: '10px', 
                border: '1px solid var(--border)', 
                borderRadius: '8px',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn-outline" disabled={phone.length <= 5}>Войти</button>
          </form>
        </div>
      </div>
    </div>
  );
}
