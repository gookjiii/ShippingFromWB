import { MapPin, ShoppingCart, Package, Smartphone, Monitor, ChevronRight, Check } from 'lucide-react';
import { useStore } from '../store';
import { createPortal } from 'react-dom';

export default function WbAddressModal({ onClose }: { onClose: () => void }) {
  const { mariupolPoint } = useStore();

  return createPortal(
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 100, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
      <div 
        className="modal-content animate-fade-scale" 
        onClick={e => e.stopPropagation()} 
        style={{ padding: '30px', maxWidth: '620px', width: '100%', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.8)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700 }}>В приложении <span style={{ color: 'var(--primary)' }}>WB</span> добавлен адрес</h2>
          <div style={{ background: '#f3e8ff', color: 'var(--primary)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={20} strokeWidth={3} />
          </div>
        </div>

        <div style={{ background: 'var(--primary)', color: 'white', padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '50%' }}>
              <MapPin size={24} color="white" />
            </div>
            <div>
              <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '2px' }}>Адрес заказа</div>
              <div style={{ fontWeight: 600, fontSize: '16px' }}>село Алексеевка, Улица Гагарина 44</div>
            </div>
          </div>
          <button style={{ background: 'white', color: 'var(--primary)', border: 'none', padding: '10px 16px', borderRadius: '24px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Выбрать адрес <ChevronRight size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '30px' }}>
          <div className="hover-scale" style={{ flex: 1, background: '#f9fafb', padding: '24px 15px', borderRadius: '20px', textAlign: 'center', position: 'relative', border: '1px solid var(--border)' }}>
            <div style={{ position: 'absolute', top: 10, left: 10, background: 'var(--primary)', color: 'white', width: '20px', height: '20px', borderRadius: '50%', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
            <div style={{ background: '#f3e8ff', color: 'var(--primary)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
              <ShoppingCart size={20} />
            </div>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '5px' }}>Вы заказываете</div>
            <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.4 }}>село Алексеевка, Улица Гагарина 44</div>
          </div>

          <div className="hover-scale" style={{ flex: 1, background: '#f9fafb', padding: '24px 15px', borderRadius: '20px', textAlign: 'center', position: 'relative', border: '1px solid var(--border)' }}>
            <div style={{ position: 'absolute', top: 10, left: 10, background: 'var(--primary)', color: 'white', width: '20px', height: '20px', borderRadius: '50%', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
            <div style={{ background: '#f3e8ff', color: 'var(--primary)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
              <Package size={20} />
            </div>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '5px' }}>Мы доставляем</div>
            <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.4 }}>ваш заказ</div>
          </div>

          <div className="hover-scale" style={{ flex: 1, background: '#f9fafb', padding: '24px 15px', borderRadius: '20px', textAlign: 'center', position: 'relative', border: '1px solid var(--border)' }}>
            <div style={{ position: 'absolute', top: 10, left: 10, background: 'var(--primary)', color: 'white', width: '20px', height: '20px', borderRadius: '50%', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
            <div style={{ background: '#f3e8ff', color: 'var(--primary)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
              <MapPin size={20} />
            </div>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '5px' }}>Вы получаете</div>
            <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.4 }}>Мариуполь, {mariupolPoint || 'выбранный ПВЗ'}</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', padding: '0 15px', background: 'white', position: 'relative', zIndex: 1 }}>Инструкция</span>
          <div style={{ height: '1px', background: 'var(--border)', marginTop: '-8px', marginBottom: '15px' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
          <button className="hover-scale" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', border: '1px solid var(--border)', borderRadius: '16px', background: 'white', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#f3e8ff', color: 'var(--primary)', padding: '6px', borderRadius: '8px' }}><Smartphone size={18} /></div>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>Как выбрать пункт на телефоне</span>
            </div>
            <ChevronRight size={18} color="#9ca3af" />
          </button>

          <button className="hover-scale" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', border: '1px solid var(--border)', borderRadius: '16px', background: 'white', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#f3e8ff', color: 'var(--primary)', padding: '6px', borderRadius: '8px' }}><Monitor size={18} /></div>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>Как выбрать пункт на компьютере</span>
            </div>
            <ChevronRight size={18} color="#9ca3af" />
          </button>
        </div>

        <button 
          className="btn-primary" 
          onClick={onClose} 
          style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '12px' }}
        >
          Понятно
        </button>
      </div>
    </div>,
    document.body
  );
}
