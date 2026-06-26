import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Search } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import WbAddressModal from '../components/WbAddressModal';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

export default function Dashboard() {
  const { user, mariupolPoint } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [prevPoint, setPrevPoint] = useState<string | null>(null);

  useEffect(() => {
    if (mariupolPoint && mariupolPoint !== prevPoint) {
      setShowModal(true);
      setPrevPoint(mariupolPoint);
    }
  }, [mariupolPoint, prevPoint]);

  if (!user) return (
    <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-muted)' }}>
      <h2>Войдите, чтобы начать пользоваться сервисом</h2>
    </div>
  );

  if (user.role === 'admin_rostov') return <Navigate to="/admin-rostov" />;
  if (user.role === 'admin_mariupol') return <Navigate to="/admin-mariupol" />;

  return (
    <div style={{ padding: '0 10px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 700 }}>Пункты выдачи</h2>
      
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <Search size={20} color="#9ca3af" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
        <input 
          type="text" 
          placeholder="Введите адрес" 
          style={{ 
            width: '100%', 
            padding: '16px 16px 16px 45px', 
            borderRadius: '16px', 
            border: '1px solid var(--border)', 
            fontSize: '16px',
            outline: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}
        />
      </div>

      <div style={{ 
        height: '60vh', 
        minHeight: '400px',
        borderRadius: '24px', 
        overflow: 'hidden',
        border: '1px solid var(--border)',
        position: 'relative',
        background: '#e5e7eb' // Light gray placeholder background
      }}>
        <YMaps query={{ apikey: '4d00ddcb-be0e-420c-ba9c-5a1a8d59a02c', lang: 'ru_RU', load: 'package.full' }}>
          <Map 
            defaultState={{ 
              center: [47.097133, 37.543367], 
              zoom: 12,
              controls: ['zoomControl', 'fullscreenControl']
            }} 
            width="100%" 
            height="100%"
          >
            <Placemark 
              geometry={[47.097133, 37.543367]} 
              properties={{
                hintContent: 'ул. Новороссийская 2',
                balloonContent: 'Пункт выдачи TrackStock'
              }}
              options={{
                preset: 'islands#violetIcon'
              }}
            />
          </Map>
        </YMaps>
      </div>

      {showModal && <WbAddressModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
