import { useState } from 'react';
import { useStore } from '../store';
import { ShoppingCart, Package, User, Bell, Link2, QrCode, Copy, Share2, ChevronDown, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import PartnerLinkModal from './PartnerLinkModal';

export default function Header({ onLoginClick }: { onLoginClick: () => void }) {
  const { user, mariupolPoint, setMariupolPoint, cart } = useStore();
  const location = useLocation();
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showPointDropdown, setShowPointDropdown] = useState(false);

  const getIconColor = (path: string) => location.pathname === path ? 'var(--primary)' : '#6b7280';

  const mockLocations = [
    "ул. Новороссийская 2",
    "пр. Металлургов 45",
    "ул. Киевская 10",
    "б-р Шевченко 21",
    "ул. Артема 5"
  ];

  return (
    <>
      <header style={{ 
        background: 'white', 
        padding: '12px 30px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/" style={{ textDecoration: 'none', marginRight: '10px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800 }}>
              <span style={{ color: '#111827' }}>Track</span>
              <span style={{ color: 'var(--primary)' }}>Stock</span>
            </h1>
          </Link>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              padding: '8px 16px', borderRadius: '12px', 
              border: '1px solid var(--border)', cursor: 'pointer',
              background: '#f9fafb'
            }}>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>Darom.Pro</span>
              <ChevronDown size={16} color="#9ca3af" />
            </div>

            <div style={{ position: 'relative' }}>
              <div 
                onClick={() => setShowPointDropdown(!showPointDropdown)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '15px', 
                  padding: '8px 16px', borderRadius: '12px', 
                  border: '1px solid var(--border)', cursor: 'pointer',
                  background: showPointDropdown ? '#f3e8ff' : '#f9fafb',
                  borderColor: showPointDropdown ? 'var(--primary)' : 'var(--border)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: showPointDropdown ? 'var(--primary)' : '#111827' }}>
                    {mariupolPoint || 'Выберите пункт'}
                  </span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Мариуполь</span>
                </div>
                <ChevronDown size={16} color={showPointDropdown ? 'var(--primary)' : '#9ca3af'} />
              </div>

              {showPointDropdown && (
                <div style={{
                  position: 'absolute', top: '110%', left: 0, width: '250px',
                  background: 'white', border: '1px solid var(--border)',
                  borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  zIndex: 100, padding: '10px'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '10px', padding: '0 10px' }}>
                    ВЫБОР ПУНКТА ВЫДАЧИ
                  </div>
                  {mockLocations.map(loc => (
                    <div 
                      key={loc}
                      onClick={() => { setMariupolPoint(loc); setShowPointDropdown(false); }}
                      style={{ 
                        padding: '10px', borderRadius: '8px', cursor: 'pointer',
                        background: mariupolPoint === loc ? '#f3e8ff' : 'transparent',
                        color: mariupolPoint === loc ? 'var(--primary)' : '#374151',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '14px', fontWeight: 500 }}>{loc}</span>
                        <span style={{ fontSize: '12px', opacity: 0.7 }}>Мариуполь</span>
                      </div>
                      {mariupolPoint === loc && <span>✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '15px', 
              padding: '8px 16px', borderRadius: '12px', 
              border: '1px solid var(--border)',
              background: '#f9fafb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111827', fontWeight: 500 }}>
                <div style={{ background: '#f3e8ff', padding: '6px', borderRadius: '50%' }}>
                  <Link2 size={16} color="var(--primary)" />
                </div>
                <span style={{ fontSize: '14px' }}>Ссылка партнера</span>
              </div>
              <div style={{ width: '1px', height: '24px', background: 'var(--border)' }}></div>
              <div style={{ display: 'flex', gap: '10px', color: 'var(--primary)' }}>
                <QrCode size={18} cursor="pointer" onClick={() => setShowPartnerModal(true)} />
                <Copy size={18} cursor="pointer" onClick={() => alert('Скопировано')} />
                <Share2 size={18} cursor="pointer" onClick={() => alert('Поделиться')} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', position: 'relative', border: 'none', background: 'none', cursor: 'pointer' }}>
            <Bell size={24} color="#6b7280" />
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>Уведомления</span>
            <span style={{ position: 'absolute', top: -5, right: 10, background: 'var(--primary)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              2
            </span>
          </button>
          
          <Link to="/cart" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textDecoration: 'none', position: 'relative' }}>
            <ShoppingCart size={24} color={getIconColor('/cart')} />
            <span style={{ fontSize: '12px', color: getIconColor('/cart'), fontWeight: 500 }}>Корзина</span>
            {cart.length > 0 && (
              <span style={{ position: 'absolute', top: -5, right: 5, background: 'var(--primary)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {cart.length}
              </span>
            )}
          </Link>

          <Link to="/orders" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
            <Package size={24} color={getIconColor('/orders')} />
            <span style={{ fontSize: '12px', color: getIconColor('/orders'), fontWeight: 500 }}>Заказы</span>
          </Link>
          
          <Link 
            to={user ? "/profile" : "#"}
            onClick={(e) => { if(!user) { e.preventDefault(); onLoginClick(); } }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
          >
            <User size={24} color={getIconColor('/profile')} />
            <span style={{ fontSize: '12px', color: getIconColor('/profile'), fontWeight: 500 }}>{user ? 'Профиль' : 'Войти'}</span>
          </Link>
        </div>
      </header>

      {showPartnerModal && <PartnerLinkModal onClose={() => setShowPartnerModal(false)} />}
    </>
  );
}
