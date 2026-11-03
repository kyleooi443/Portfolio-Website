import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const directory = join(process.cwd(), 'public', 'images');
mkdirSync(directory, { recursive: true });
const write = (name, svg) => writeFileSync(join(directory, name), svg.trim());

write('portrait-placeholder.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Portrait placeholder">
  <rect width="200" height="200" fill="#e6dfeb"/><circle cx="100" cy="100" r="83" fill="#f1edf3"/>
  <path d="M35 176c9-39 34-57 65-57s56 18 65 57" fill="#a79bae"/><circle cx="100" cy="78" r="34" fill="#bdafc7"/>
</svg>`);

const cover = (name, background, decoration, title, subtitle) => write(`${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 486" role="img" aria-label="Concept artwork for ${title}"><desc>${subtitle}</desc>
  <rect width="720" height="486" fill="${background}"/>
  <g opacity=".52" fill="none" stroke="#ffffff" stroke-width="1"><path d="M0 82h720M0 164h720M0 246h720M0 328h720M0 410h720M90 0v486M180 0v486M270 0v486M360 0v486M450 0v486M540 0v486M630 0v486"/></g>
  ${decoration}
  <rect x="28" y="27" width="143" height="25" rx="3" fill="#ffffff" opacity=".84"/><text x="39" y="44" fill="#344942" font-family="monospace" font-size="11">CONCEPT STUDY</text>
  <path d="M35 415h190" stroke="#6b897a" stroke-width="2" opacity=".5"/>
</svg>`);

cover('nextwise', '#dce8de', `<rect x="179" y="93" width="372" height="255" rx="14" fill="#ffffff" stroke="#b5c7b9"/><rect x="203" y="119" width="111" height="10" rx="5" fill="#9fb5a4"/><rect x="203" y="150" width="324" height="55" rx="7" fill="#edf3ec"/><circle cx="225" cy="178" r="10" fill="#3e6c62"/><path d="m220 178 4 4 7-9" stroke="white" stroke-width="2" fill="none"/><rect x="251" y="170" width="137" height="8" rx="4" fill="#5e796b"/><rect x="251" y="185" width="211" height="5" rx="3" fill="#b8cbbd"/><rect x="203" y="220" width="324" height="44" rx="7" fill="#f7f9f6" stroke="#e0e8df"/><circle cx="225" cy="242" r="9" fill="none" stroke="#a1b5a5"/><rect x="251" y="237" width="171" height="7" rx="3" fill="#b2c4b5"/><rect x="203" y="279" width="324" height="44" rx="7" fill="#f7f9f6" stroke="#e0e8df"/><circle cx="225" cy="301" r="9" fill="none" stroke="#a1b5a5"/><rect x="251" y="296" width="133" height="7" rx="3" fill="#b2c4b5"/>`, 'NEXTWISE', 'Finding the next meaningful action');

cover('reclaim', '#eee4d8', `<rect x="147" y="94" width="426" height="257" rx="13" fill="#fffaf4" stroke="#d8c8b7"/><rect x="172" y="122" width="112" height="134" rx="7" fill="#d5dfcf"/><path d="M192 202c18-39 24-75 41-75s20 37 39 75v27h-80Z" fill="#89a292"/><rect x="302" y="122" width="112" height="134" rx="7" fill="#e9d3ba"/><circle cx="358" cy="180" r="36" fill="#b98d6d"/><rect x="432" y="122" width="112" height="134" rx="7" fill="#d8e2dd"/><path d="M451 219h77l-15-73h-46Z" fill="#6f9188"/><rect x="173" y="278" width="213" height="8" rx="4" fill="#b0a393"/><rect x="173" y="297" width="164" height="6" rx="3" fill="#d2c5b7"/><rect x="432" y="278" width="112" height="30" rx="5" fill="#3e6c62"/>`, 'RECLAIM', 'Another life for things we no longer use');

cover('liwanag', '#f0ead5', `<circle cx="359" cy="206" r="107" fill="#e8ce83"/><circle cx="359" cy="206" r="72" fill="#f7e9b6"/><g stroke="#9b844e" stroke-width="3" opacity=".76"><path d="M359 70v24M359 318v24M223 206h24M471 206h24M264 111l18 18M436 283l18 18M454 111l-18 18M282 283l-18 18"/></g><path d="M88 307c103-11 149-54 222-45 74 10 95 45 163 29 68-17 87-69 167-63" stroke="#3e6c62" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M88 324c103-11 149-54 222-45 74 10 95 45 163 29 68-17 87-69 167-63" stroke="#9db9a2" stroke-width="3" fill="none"/>`, 'Project LIWANAG', 'Making energy decisions more legible');

cover('agos', '#dbe8e8', `<path d="M86 132c98 0 109 151 215 151s111-151 219-151 102 85 155 85" fill="none" stroke="#3e6c62" stroke-width="24" stroke-linecap="round" opacity=".85"/><path d="M86 167c98 0 109 151 215 151s111-151 219-151 102 85 155 85" fill="none" stroke="#84aaa7" stroke-width="12" stroke-linecap="round"/><circle cx="301" cy="283" r="13" fill="#ffffff" stroke="#3e6c62" stroke-width="5"/><circle cx="520" cy="132" r="13" fill="#ffffff" stroke="#3e6c62" stroke-width="5"/><path d="M106 91v251M106 342h510" stroke="#789691" stroke-width="2" opacity=".7"/>`, 'AGOS', 'Forecasts, dispatch, and resilience');

cover('castai', '#e7e3ea', `<circle cx="349" cy="206" r="119" fill="#d4ccd9"/><rect x="313" y="105" width="73" height="150" rx="36" fill="#526d62"/><rect x="327" y="119" width="45" height="118" rx="22" fill="#719283"/><path d="M285 208c0 47 27 74 64 74s64-27 64-74M349 282v42M316 324h66" fill="none" stroke="#344c44" stroke-width="9" stroke-linecap="round"/><g fill="#3e6c62"><rect x="140" y="177" width="9" height="58" rx="4"/><rect x="159" y="193" width="9" height="26" rx="4"/><rect x="178" y="163" width="9" height="86" rx="4"/><rect x="511" y="183" width="9" height="46" rx="4"/><rect x="530" y="165" width="9" height="82" rx="4"/><rect x="549" y="193" width="9" height="26" rx="4"/></g>`, 'CastAI', 'An experiment in live storytelling');

const outside = (name, bg, drawing, label) => write(`outside-${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 390"><rect width="460" height="390" fill="${bg}"/>${drawing}<rect x="15" y="347" width="255" height="27" rx="3" fill="#f8f7f4" opacity=".94"/><text x="24" y="365" fill="#17202b" font-family="monospace" font-size="10">${label} PHOTO TO ADD</text></svg>`);
outside('batangas', '#d9e5dc', `<circle cx="329" cy="103" r="56" fill="#e9d69d"/><path d="M0 233c81-74 141-80 224-42 90-87 158-79 236-12v211H0Z" fill="#8ba996"/><path d="M0 277c117-48 212-46 307-16 69 22 103 12 153-7v136H0Z" fill="#5e8176"/><path d="M0 313c132-12 216 15 307 10 71-4 102-22 153-36v103H0Z" fill="#83aaa4"/>`, 'PERSONAL LANDSCAPE');
outside('notes', '#e8e0d3', `<rect x="75" y="64" width="292" height="265" rx="5" fill="#fbf9f2" transform="rotate(-5 221 196)"/><path d="M116 126h176M116 150h218M116 174h195M116 198h174M116 222h200" stroke="#b1a99b" stroke-width="3" transform="rotate(-5 221 196)"/><circle cx="320" cy="271" r="34" fill="#8ba48c"/>`, 'STUDENT LIFE');
outside('making', '#e7e2dc', `<rect x="70" y="90" width="190" height="188" rx="4" fill="#f7f4ef" transform="rotate(-10 165 184)"/><circle cx="174" cy="170" r="55" fill="#acc4b3"/><path d="M136 190c36-62 52-76 92-38" stroke="#3e6c62" stroke-width="9" fill="none"/><rect x="265" y="112" width="95" height="172" rx="7" fill="#889e92" transform="rotate(12 312 198)"/><circle cx="319" cy="195" r="27" fill="#e8d6ad"/>`, 'CREATIVE MOMENT');

console.log('Generated labeled local illustration placeholders.');
