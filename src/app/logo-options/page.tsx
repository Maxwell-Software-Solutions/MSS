import Image from 'next/image';

const options = [
  { id: 'A', file: '/logo-options/option-a.svg', label: 'Signal Bars', desc: 'Three ascending bars — growth, momentum, signal strength' },
  { id: 'B', file: '/logo-options/option-b.svg', label: 'Cornerstone', desc: 'Bold L-bracket — engineering precision, structural' },
  { id: 'C', file: '/logo-options/option-c.svg', label: 'Gradient Diamond', desc: 'Evolution of the current mark — gradient upgrade, center anchor' },
  { id: 'D', file: '/logo-options/option-d.svg', label: 'Double Slash (current)', desc: '// code comment — forward motion, engineering heritage' },
  { id: 'E', file: '/logo-options/option-e.svg', label: 'Geometric M', desc: 'Geometric M letterform — "Maxwell" as primary wordmark' },
  { id: 'F', file: '/logo-options/option-f.svg', label: 'Maxwell Peak', desc: 'Solid faceted M — 4 gradient triangles, architectural, premium' },
  { id: 'G', file: '/logo-options/option-g.svg', label: 'Maxwell Prism', desc: 'Prism refracting light into a spectrum — physics of light, unique silhouette' },
  { id: 'H', file: '/logo-options/option-h.svg', label: 'Pure Wordmark', desc: 'Stripe-style typography-only with a single gradient accent bar' },
  { id: 'I', file: '/logo-options/option-i.svg', label: 'Maxwell Wave', desc: 'Single continuous stroke tracing an M as a waveform — signal, electromagnetism' },
  { id: 'J', file: '/logo-options/option-j.svg', label: 'Monolith', desc: 'Rounded-square plate with a bold white M — iconic app-mark silhouette' },
];

export default function LogoOptionsPage() {
  return (
    <div style={{ background: '#06080f', minHeight: '100vh', padding: '48px 40px', fontFamily: 'Inter, sans-serif' }}>
      <p style={{ color: '#64748b', fontSize: 12, letterSpacing: 3, marginBottom: 40, textTransform: 'uppercase' }}>
        Logo Options — Maxwell Software Solutions
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {options.map((opt) => (
          <div key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: 48, padding: '36px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {/* Option label */}
            <div style={{ width: 28, color: '#4f46e5', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{opt.id}</div>

            {/* Logo on dark nav background */}
            <div style={{ background: '#06080f', borderRadius: 12, padding: '20px 32px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', minWidth: 320, flexShrink: 0 }}>
              <Image src={opt.file} alt={`Option ${opt.id}`} width={280} height={64} style={{ height: 48, width: 'auto' }} unoptimized />
            </div>

            {/* Label + description */}
            <div>
              <div style={{ color: '#f1f5f9', fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{opt.label}</div>
              <div style={{ color: '#64748b', fontSize: 14 }}>{opt.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <p style={{ color: '#334155', fontSize: 12, marginTop: 48 }}>
        /logo-options — internal preview only
      </p>
    </div>
  );
}
