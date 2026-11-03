import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px', background: '#FAF9F7', color: '#1D1D1F', fontFamily: 'sans-serif' }}><div style={{ display: 'flex', fontSize: 28, fontWeight: 600, color: '#476B5A' }}>kyle.</div><div style={{ display: 'flex', flexDirection: 'column' }}><div style={{ display: 'flex', fontSize: 78, fontWeight: 600, lineHeight: 1.06, letterSpacing: '-3px' }}>Kyle Andrew<br />Masilang</div><div style={{ display: 'flex', marginTop: 28, fontSize: 27, color: '#6E6E73' }}>I design things, write code, and build stuff for fun.</div></div><div style={{ display: 'flex', width: '100%', borderTop: '2px solid #E8E8E6', paddingTop: 20, fontSize: 20 }}>A little corner of the internet · Batangas, Philippines</div></div>, size);
}
