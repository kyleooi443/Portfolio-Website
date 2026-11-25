import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const directory = join(process.cwd(), 'public', 'images');
mkdirSync(directory, { recursive: true });
const write = (name, svg) => writeFileSync(join(directory, name), svg.trim());

write('portrait-placeholder.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Portrait placeholder">
  <rect width="200" height="200" fill="#e6dfeb"/><circle cx="100" cy="100" r="83" fill="#f1edf3"/>
  <path d="M35 176c9-39 34-57 65-57s56 18 65 57" fill="#a79bae"/><circle cx="100" cy="78" r="34" fill="#bdafc7"/>
</svg>`);

const outside = (name, bg, drawing, label) => write(`outside-${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 390"><rect width="460" height="390" fill="${bg}"/>${drawing}<rect x="15" y="347" width="255" height="27" rx="3" fill="#f8f7f4" opacity=".94"/><text x="24" y="365" fill="#17202b" font-family="monospace" font-size="10">${label} PHOTO TO ADD</text></svg>`);
outside('batangas', '#d9e5dc', `<circle cx="329" cy="103" r="56" fill="#e9d69d"/><path d="M0 233c81-74 141-80 224-42 90-87 158-79 236-12v211H0Z" fill="#8ba996"/><path d="M0 277c117-48 212-46 307-16 69 22 103 12 153-7v136H0Z" fill="#5e8176"/><path d="M0 313c132-12 216 15 307 10 71-4 102-22 153-36v103H0Z" fill="#83aaa4"/>`, 'PERSONAL LANDSCAPE');
outside('notes', '#e8e0d3', `<rect x="75" y="64" width="292" height="265" rx="5" fill="#fbf9f2" transform="rotate(-5 221 196)"/><path d="M116 126h176M116 150h218M116 174h195M116 198h174M116 222h200" stroke="#b1a99b" stroke-width="3" transform="rotate(-5 221 196)"/><circle cx="320" cy="271" r="34" fill="#8ba48c"/>`, 'STUDENT LIFE');
outside('making', '#e7e2dc', `<rect x="70" y="90" width="190" height="188" rx="4" fill="#f7f4ef" transform="rotate(-10 165 184)"/><circle cx="174" cy="170" r="55" fill="#acc4b3"/><path d="M136 190c36-62 52-76 92-38" stroke="#3e6c62" stroke-width="9" fill="none"/><rect x="265" y="112" width="95" height="172" rx="7" fill="#889e92" transform="rotate(12 312 198)"/><circle cx="319" cy="195" r="27" fill="#e8d6ad"/>`, 'CREATIVE MOMENT');

console.log('Generated labeled local illustration placeholders.');
