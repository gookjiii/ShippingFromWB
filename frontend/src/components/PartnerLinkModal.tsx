import { Copy } from 'lucide-react';

export default function PartnerLinkModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()} style={{ textAlign: 'center' }}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        {/* Mock QR Code Image */}
        <div style={{ marginBottom: '20px', padding: '20px', background: 'white', display: 'inline-block', borderRadius: '12px' }}>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://trackstock.ru/partner/12345" alt="QR Code" />
        </div>
        
        <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Ссылка партнера выдачи</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
          Покажите QR-код другу или поделитесь ссылкой напрямую.
        </p>

        <button className="btn-outline" style={{ width: '100%', color: 'var(--primary)', borderColor: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} onClick={() => {
          navigator.clipboard.writeText("https://trackstock.ru/partner/12345");
          alert('Ссылка скопирована!');
        }}>
          <Copy size={16} /> Скопировать ссылку
        </button>
      </div>
    </div>
  );
}
