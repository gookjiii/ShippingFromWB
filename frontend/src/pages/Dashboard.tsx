import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Search } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import WbAddressModal from '../components/WbAddressModal';

declare global {
  interface Window {
    ymaps: any;
  }
}

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

  useEffect(() => {
    // Initialize Yandex Map
    if (window.ymaps) {
      window.ymaps.ready(() => {
        const mapContainer = document.getElementById('yandex-map');
        if (mapContainer && mapContainer.innerHTML === '') {
          const map = new window.ymaps.Map('yandex-map', {
            center: [47.097133, 37.543367], // Mariupol coordinates
            zoom: 12,
            controls: ['zoomControl', 'fullscreenControl']
          });

          // Add a custom placemark
          const placemark = new window.ymaps.Placemark([47.097133, 37.543367], {
            hintContent: 'ул. Новороссийская 2',
            balloonContent: 'Пункт выдачи TrackStock'
          }, {
            preset: 'islands#violetIcon'
          });

          map.geoObjects.add(placemark);
        }
      });
    }
  }, []);

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
        position: 'relative'
      }}>
        <div id="yandex-map" style={{ width: '100%', height: '100%' }}></div>
      </div>

      {showModal && <WbAddressModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
