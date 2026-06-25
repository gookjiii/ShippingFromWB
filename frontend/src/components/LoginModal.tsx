import { useState } from 'react';
import { useStore } from '../store';
import type { Role } from '../store';

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [phone, setPhone] = useState('');
  const [partnerCode, setPartnerCode] = useState('');
  const [role, setRole] = useState<Role>('client');
  const login = useStore(state => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length > 5) {
      login(phone, partnerCode, role);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Вход</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
              Номер телефона
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ 
                padding: '10px', 
                border: '1px solid var(--border)', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
              }}>🇷🇺 +7</div>
              <input 
                type="tel" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="900 000 00 00"
                style={{ 
                  flex: 1, 
                  padding: '10px', 
                  border: '1px solid var(--border)', 
                  borderRadius: '8px',
                  outline: 'none'
                }}
                autoFocus
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
              Код партнера (для привязки WB)
            </label>
            <input 
              type="text" 
              value={partnerCode}
              onChange={e => setPartnerCode(e.target.value)}
              placeholder="Например: WB-12345"
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '1px solid var(--border)', 
                borderRadius: '8px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
              Роль (для демо)
            </label>
            <select 
              value={role} 
              onChange={e => setRole(e.target.value as Role)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}
            >
              <option value="client">Клиент</option>
              <option value="admin_rostov">Админ (Ростов ВБ)</option>
              <option value="admin_mariupol">Админ (Мариуполь ПВЗ)</option>
            </select>
          </div>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '20px', textAlign: 'left' }}>
          <input type="checkbox" id="rules" defaultChecked style={{ marginTop: '4px' }} />
          <label htmlFor="rules" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Я согласен с <a href="#" style={{ color: 'var(--primary)' }}>правилами пользования</a>, <a href="#" style={{ color: 'var(--primary)' }}>политикой конфиденциальности</a> и правилами возврата.
          </label>
        </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>Продолжить</button>
            <button type="button" className="btn-outline" style={{ flex: 1 }} onClick={onClose}>Назад</button>
          </div>
        </form>
      </div>
    </div>
  );
}
