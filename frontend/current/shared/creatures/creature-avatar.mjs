// Local, stable portraits from the existing public trader ID. No avatar service or identity upload.
import {creatureCatalog} from './creature-catalog.mjs';
export {creatureCatalog} from './creature-catalog.mjs';
const eras=['past','present','future'];
const species=eras.map(era=>creatureCatalog.filter(c=>c.era===era).map(c=>c.species));
const legacy=new Set(['mammoth','dodo','sabre-cat','triceratops','fox','axolotl','owl','capybara','moon-rabbit','antenna-cat','winged-otter','coral-fox']);
export function creatureTraits(id){
 const key=String(id??'');let hash=2166136261;
 for(const c of key)hash=Math.imul(hash^c.charCodeAt(0),16777619)>>>0;
 const era=hash%3,kind=(hash>>>8)%species[era].length;
 const signature=/^[a-f0-9]{10}$/i.test(key)?key.toLowerCase():Array.from({length:10},(_,i)=>((hash>>>(i%8*4))&15).toString(16)).join('');
 return{era:['past','present','future'][era],kind,species:species[era][kind],signature,variant:hash};
}
export function creatureAvatar(id){
 const t=creatureTraits(id),k=t.species,v=t.variant;
 if(!legacy.has(k))return expandedPortrait(t);
 const yellow=['#ffd323','#ffca08','#f5bf12','#ffdb43'][(v>>>16)%4],light='#fff1a3',gold='#d99a08',ink='#30230b';
 let ears='',extras='',face='';
 if(['fox','coral-fox','sabre-cat','antenna-cat'].includes(k))ears='<path d="M15 31 12 10 30 21M49 31 52 10 34 21"/><path d="m17 23-1-7 8 5m23 2 1-7-8 5" fill="'+light+'" stroke="none"/>';
 if(k==='moon-rabbit')ears='<ellipse cx="23" cy="15" rx="6" ry="13" transform="rotate(-12 23 15)"/><ellipse cx="42" cy="15" rx="6" ry="13" transform="rotate(12 42 15)"/><path d="M23 8v13m19-13v13" stroke="'+light+'" stroke-width="3"/>';
 if(k==='mammoth'||k==='capybara'||k==='winged-otter')ears='<ellipse cx="14" cy="29" rx="9" ry="11"/><ellipse cx="50" cy="29" rx="9" ry="11"/>';
 if(k==='owl'||k==='dodo')ears='<path d="M18 24 16 12l12 7m8 0 12-7-2 12"/>';
 if(k==='axolotl')ears='<path d="M16 27 7 18m8 15L4 31m11 8L6 45m42-18 9-9m-8 15 11-2m-11 8 9 6" stroke="'+yellow+'" stroke-width="5"/>';
 if(k==='triceratops')ears='<path d="M11 35 8 24l8-2-1-9 10 4 7-9 7 9 10-4-1 9 8 2-3 11Z" fill="'+gold+'"/>';
 if(k==='antenna-cat'||k==='coral-fox')extras='<path d="M25 19 21 8m18 11L43 8" fill="none"/><circle cx="21" cy="7" r="3" fill="'+light+'"/><circle cx="43" cy="7" r="3" fill="'+light+'"/>';
 if(k==='winged-otter')extras='<path d="M19 46 5 37l2 14 12 2m26-7 14-9-2 14-12 2" fill="'+light+'"/>';
 if(k==='coral-fox')extras+='<path d="m12 16-5-5m6 5-1-8m39 8 5-5m-5 5 1-8" fill="none"/>';
 const eyes=2+(v>>>23)%3*.2;
 face='<circle cx="24" cy="32" r="'+eyes+'" fill="'+ink+'" stroke="none"/><circle cx="40" cy="32" r="'+eyes+'" fill="'+ink+'" stroke="none"/><circle cx="24.6" cy="31.3" r=".7" fill="'+light+'" stroke="none"/><circle cx="40.6" cy="31.3" r=".7" fill="'+light+'" stroke="none"/>';
 if(k==='owl')face='<ellipse cx="23" cy="32" rx="9" ry="10" fill="'+light+'" stroke="none"/><ellipse cx="41" cy="32" rx="9" ry="10" fill="'+light+'" stroke="none"/>'+face;
 if(k==='mammoth')face+='<path d="M28 37v10q1 9 8 4" fill="none" stroke="'+gold+'" stroke-width="7"/><path d="M23 39q-3 10 4 9m14-9q3 10-4 9" fill="none" stroke="'+light+'" stroke-width="3"/>';
 else if(k==='dodo')face+='<path d="M28 36q16-5 20 5-12 8-20 1Z" fill="'+gold+'"/>';
 else if(k==='owl')face+='<path d="m28 37 4 7 4-7" fill="'+gold+'" stroke="none"/>';
 else face+='<path d="M29 38q3-3 6 0l-3 3Z" fill="'+ink+'" stroke="none"/><path d="M27 44q5 4 10 0" fill="none" stroke-width="1.6"/>';
 if(k==='sabre-cat')face+='<path d="m25 43 2 8 2-7m6 0 2 7 2-8" fill="'+light+'" stroke="none"/>';
 if(k==='triceratops')face+='<path d="m19 27 2-11 4 10m14 0 4-10 2 11m-16 9 3-7 3 7" fill="'+light+'"/>';
 // Keep identity variation in the body's lower silhouette, leaving faces clean.
 const hem=[...t.signature].map((n,i)=>(17+i*3.35).toFixed(2)+' '+(59+parseInt(n,16)*.1).toFixed(2)).join('L');
 const body='<path d="M17 48q-4 7-2 12L'+hem+'L49 60q2-5-2-12Z"/>';
 return '<svg class="yellow-creature" viewBox="0 0 64 64" fill="'+yellow+'" stroke="'+ink+'" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+extras+ears+body+'<path d="M13 33q0-15 19-15t19 15v8q0 14-19 14T13 41Z"/>'+face+'</svg>';
}

function expandedPortrait(t){
 const a=creatureCatalog.find(c=>c.species===t.species),v=t.variant;
 const yellow=['#ffd323','#ffca08','#f5bf12','#ffdb43'][(v>>>16)%4],light='#fff1a3',gold='#d99a08',ink='#30230b';
 const p=(d,fill=yellow,extra='')=>`<path d="${d}" fill="${fill}" ${extra}/>`;
 const el=(x,y,rx,ry,fill=yellow,extra='')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`;
 const line=(d,stroke=ink)=>p(d,'none',`stroke="${stroke}"`);
 const ears={
 none:'',small:el(16,24,5,5)+el(48,24,5,5),round:el(15,24,8,9)+el(49,24,8,9),
 pointed:p('M15 30 11 10 29 21M49 30 53 10 35 21')+p('m17 22-2-7 8 6m24 1 2-7-8 6',light,'stroke="none"'),
 tuft:p('M15 29 13 10 28 22M49 29 51 10 36 22')+line('m13 12-4-5m42 5 4-5'),
 leaf:p('M19 27Q2 23 10 12q13 0 15 13m20 2Q62 23 54 12q-13 0-15 13'),
 long:el(22,15,6,13)+el(42,15,6,13)+p('M22 8v12m20-12v12','none',`stroke="${light}" stroke-width="3"`),
 giant:p('M19 29Q-1 13 10 3q17 7 19 20m16 6Q65 13 54 3q-17 7-19 20')+p('M19 22 11 9l13 12m21 1 8-13-13 12',light,'stroke="none"'),
 fluffy:p('M21 25 16 12l-4 4-5-1 1 6-5 4 4 5-1 6 8 2 9-6m20-7 5-13 4 4 5-1-1 6 5 4-4 5 1 6-8 2-9-6'),
 floppy:p('M22 23Q5 10 7 32q1 12 11 7m24-16Q59 10 57 32q-1 12-11 7'),
 fin:p('m18 25-13-9 1 20 12 4m28-15 13-9-1 20-12 4',gold),
 gills:p('M16 27 7 18m8 15L4 31m11 8L6 45m42-18 9-9m-8 15 11-2m-11 8 9 6','none',`stroke="${yellow}" stroke-width="5"`),
 frill:p('M11 35 8 24l8-2-1-9 10 4 7-9 7 9 10-4-1 9 8 2-3 11Z',gold),
 antennae:line('M23 24 18 10m23 14 5-14',gold)+el(18,9,3,3,light)+el(46,9,3,3,light),
 'eye-stalks':p('M18 32Q5 13 18 12q11 0 9 15m19 5Q59 13 46 12q-11 0-9 15'),
 spiral:p('M19 29Q0 27 7 13q5-9 13 0-11-5-8 5 2 4 8 3m25 8q19-2 12-16-5-9-13 0 11-5 8 5-2 4-8 3',gold),
 };
 const crowns={
 none:'',tuft:p('m23 21 2-10 7 6 6-8 4 13'),mane:p('M25 22 23 7l7 4 6-7 6 15',gold),
 antlers:line('M23 24 19 9 12 4m8 10-10-2m31 12 4-15 7-5m-8 10 10-2',gold),
 horns:p('m18 24 1-19 9 17m8 0 9-17 1 19',light),
 spikes:p('m16 24 1-15 9 10 6-15 6 15 9-10 1 15',gold),
 plates:p('m17 23 2-11 9 3 4-10 7 8 8-2 1 14',gold),
 armour:p('M12 32 17 19l9-6h12l9 6 5 13',gold)+line('M22 17 20 28m12-14v12m10-9 2 11'),
 brow:p('M17 26 21 20 29 22m6 0 8-2 4 6',gold),
 dome:el(32,22,15,15),swept:p('M22 24Q22 2 47 5L37 23',gold),
 sail:p('M26 24 30 3 38 11 43 24',gold)+line('M30 8 31 22m6-9 1 10'),
 fin:p('M26 23Q27 5 40 5L37 25',gold),
 shell:el(32,22,20,18,gold)+p('M34 34q-17-2-14-15 4-12 17-6 10 6 1 13-7 4-8-3','none',`stroke="${light}" stroke-width="3"`),
 crest:p('M23 23Q11 11 19 5l9 13Q23 4 31 2l4 15Q37 4 44 7l-4 17',light),
 unicorn:p('m28 23 4-21 5 21',light),antennae:line('M25 20 21 8m18 12 4-12')+el(21,7,3,3,light)+el(43,7,3,3,light),
 coral:line('m20 22-5-10-6-4m6 4 2-7m27 17 5-10 6-4m-6 4-2-7',gold),
 sun:p('M17 27 8 20l10-2-3-11 11 5 6-10 6 10 11-5-3 11 10 2-9 7',gold),
 crystal:p('m21 24-5-12 10 3 6-13 7 13 9-3-5 12',light),
 cloud:p('M17 24q-9-7 0-12 5-3 9 1Q28 1 37 7q4 2 4 7 13-5 11 7l-8 5',light),
 orbit:el(32,13,24,5,'none',`transform="rotate(-13 32 13)" stroke="${gold}"`),
 fern:line('M32 23V3m0 7-9-4m9 10-11-4m11-2 9-4m-9 10 11-4',gold),
 'crystal-shell':p('M12 27 15 13 26 3h13l11 10 2 14',gold)+line('M15 13h35M26 3l-3 23M39 3l3 23'),
 star:p('m32 3 4 7 8 1-6 6 1 8-7-4-7 4 1-8-6-6 8-1Z',light),
 flower:el(24,14,6,8,light)+el(40,14,6,8,light)+el(32,8,7,7,light)+el(32,17,6,6,gold),
 lantern:line('M32 22Q25 3 42 5v7')+el(42,14,5,6,light),
 halo:el(32,8,17,4,'none',`stroke="${light}" stroke-width="3"`),
 'spiral-horns':p('M21 23Q11 13 18 3l5 2q-7 10 3 16m17 2Q53 13 46 3l-5 2q7 10-3 16',light)+line('m18 7 5 2m-5 3 6 2m22-7-5 2m5 3-6 2'),
 crown:p('m19 24-3-15 10 7 6-12 6 12 10-7-3 15Z',light),
 };
 const accents={
 none:'',claws:p('m13 49-5 7 8-2m35-5 5 7-8-2',light),
 stripes:line('m18 48 5 6m-1-8 6 8m13-8-6 8m11-6-5 6'),
 flippers:p('M18 44Q0 44 7 57l14-5m25-8q18 0 11 13l-14-5',gold),
 feathers:p('m17 44-9 1 8 5-4 6 10-1m25-11 9 1-8 5 4 6-10-1',light),
 spines:p('m15 40-10 3 10 5-7 5 13 1m28-14 10 3-10 5 7 5-13 1',gold),
 wings:p('M19 45Q-1 25 4 47l8-1-4 10 14-4m23-7Q65 25 60 47l-8-1 4 10-14-4',light),
 'long-neck':p('M24 43 20 61h24l-4-18',gold),
 fins:p('m18 40-14 9 15 3m27-12 14 9-15 3',light),
 legs:line('m17 37-11 3m11 3L5 47m14 1L8 56m39-19 11 3m-11 3 12 4m-14 1 11 8'),
 mask:el(23,32,8,7,gold,'stroke="none"')+el(41,32,8,7,gold,'stroke="none"'),
 tentacles:p('M18 44Q3 57 13 60q5 0 6-7m5-6q-4 14 3 14m19-17q15 13 5 16-5 0-6-7m-5-6q4 14-3 14','none',`stroke="${gold}" stroke-width="4"`),
 curl:p('M47 49q17-8 12 6-7 10-13 0 2-5 6-2','none',`stroke="${gold}" stroke-width="4"`),
 toes:p('m17 48-9 6 6 1-4 5 10-5m27-7 9 6-6 1 4 5-10-5',light),
 ribbons:line('M17 43Q0 41 6 57m41-14q17-2 11 14'),
 'moth-wings':p('M21 35Q-3 13 4 39q-6 19 16 12m23-16q24-22 17 4 6 19-16 12',light),
 shell:el(32,47,25,14,gold)+line('M16 45 25 39l14 0 10 6-7 12H23Z'),
 };
 const heads={
 round:'M13 33q0-15 19-15t19 15v8q0 14-19 14T13 41Z',
 wide:'M9 34Q9 19 32 20q23-1 23 14v9q-1 13-23 13T9 43Z',
 tall:'M17 31q0-18 15-18t15 18v11q0 15-15 15T17 42Z',
 slender:'M17 29q0-13 15-13t15 13l-2 16q-3 11-13 11T19 45Z',
 bird:'M15 33q0-19 17-19t17 19v10q0 13-17 13T15 43Z',
 reptile:'M12 33q0-13 20-13t20 13l-3 13q-4 11-17 10T15 46Z',
 fish:'M11 34Q13 17 32 20q19-3 21 14l-5 14q-6 10-16 8-10 2-16-8Z',
 };
 const eyeY=a.ears==='eye-stalks'?19:32,eyeX=a.ears==='eye-stalks'?18:24;
 const eyeR=2+(v>>>23)%3*.2;
 const eyes=el(eyeX,eyeY,eyeR,eyeR,ink,'stroke="none"')+el(64-eyeX,eyeY,eyeR,eyeR,ink,'stroke="none"')+el(eyeX+.6,eyeY-.7,.7,.7,light,'stroke="none"')+el(64-eyeX+.6,eyeY-.7,.7,.7,light,'stroke="none"');
 const smile=line('M26 43q6 6 12 0');
 const muzzles={
 small:p('m29 38 3 3 3-3Z',ink,'stroke="none"')+smile,smile,
 muzzle:el(32,41,10,7,light,'stroke="none"')+p('m29 38q3-3 6 0l-3 3Z',ink,'stroke="none"')+smile,
 snout:p('M24 37q8-5 16 0l-8 11Z',light,'stroke="none"')+p('m29 38 3 3 3-3Z',ink,'stroke="none"')+line('M32 41v5'),
 'oval-nose':el(32,38,5,6,ink,'stroke="none"')+line('M26 46q6 4 12 0'),
 horse:el(32,43,10,9,gold)+line('m27 42 1 2m8-2 1 2M27 49h10'),
 beak:p('m28 37 4 9 4-9Z',gold),hook:p('M28 36q17-4 14 10l-7-3-7 1Z',gold),
 'long-beak':p('m27 36 27 7-27 2Z',gold),
 duckbill:p('M24 37q8-2 16 0l7 6q-15 8-30 0Z',gold),
 'giant-beak':p('M27 35q21-14 29 4-9 11-29 4Z',gold)+line('M28 40h24'),
 trunk:p('M28 37v10q1 9 8 4','none',`stroke="${gold}" stroke-width="7"`)+p('M23 39q-3 10 4 9m14-9q3 10-4 9','none',`stroke="${light}" stroke-width="3"`),
 tusks:el(32,39,12,6,light,'stroke="none"')+p('m24 42 3 13 3-13m4 0 3 13 3-13',light)+el(32,37,4,3,ink,'stroke="none"'),
 fangs:p('m29 38 3 3 3-3Z',ink,'stroke="none"')+smile+p('m24 43 3 10 3-9m4 0 3 9 3-10',light),
 'nose-horn':p('m28 38 4-14 4 14',light)+smile,
 teeth:p('M21 40q11 12 22 0l-2 9H23Z',gold)+p('m24 42 3 5 3-3 3 4 3-4 3 2 2-4',light,'stroke="none"'),
 'long-snout':p('M24 37q8-2 16 0l12 7-20 6-20-6Z',gold)+line('M22 44h20'),
 jaw:p('m21 36 11 5 11-5-3 13H24Z',gold)+p('m23 38 4 9 5-6 5 6 4-9',light),
 tentacles:line('M27 38q-12 11-2 14m6-14q-2 17 4 16m2-16q13 10 3 15'),
 pincers:p('M27 37q-16 6-4 15l3-5-5-3 9-4m7-3q16 6 4 15l-3-5 5-3-9-4',gold),
 tube:p('M27 36h10l5 12H22Z',gold)+el(32,47,10,3,light),
 };
 // All public-ID digits still influence the silhouette, without adding facial spots.
 const hem=[...t.signature].map((n,i)=>(17+i*3.35).toFixed(2)+' '+(59+parseInt(n,16)*.1).toFixed(2)).join('L');
 const body=p('M17 48q-4 7-2 12L'+hem+'L49 60q2-5-2-12Z');
 const foregroundAccent=a.accent==='mask'?accents.mask:'';
 const backgroundAccent=a.accent==='mask'?'':accents[a.accent];
 return `<svg class="yellow-creature" viewBox="0 0 64 64" fill="${yellow}" stroke="${ink}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${backgroundAccent}${ears[a.ears]}${crowns[a.crown]}${body}${p(heads[a.head])}${foregroundAccent}${eyes}${muzzles[a.muzzle]}</svg>`;
}
