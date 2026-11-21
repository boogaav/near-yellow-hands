import { createHash, createHmac } from 'node:crypto';
export const FEED = '0x00039d9e45394f473ab1f050a1b963e6b05351e52d71e507509ada0c95ed75b8';
export function auth(path, key, secret, timestamp) {
  return {Authorization:key,'X-Authorization-Timestamp':String(timestamp),'X-Authorization-Signature-SHA256':createHmac('sha256',secret).update(`GET ${path} ${createHash('sha256').update('').digest('hex')} ${key} ${timestamp}`).digest('hex')};
}
export function summarize(rows) {
  const good = rows.filter(r=>r.status===200 && r.reportDecoded);
  const q = (values,p)=>values.length ? [...values].sort((a,b)=>a-b)[Math.ceil(p*values.length)-1] : null;
  const latency=good.map(r=>r.fetchMs);
  return {attempts:rows.length,successfulReports:good.length,failures:rows.length-good.length,fetchMs:{p50:q(latency,.5),p95:q(latency,.95),p99:q(latency,.99)},authenticCpiVerification:'not-run',simulationMs:null,transactionConfirmationMs:null};
}
export function decode(fullReport, feed=FEED) {
  if(!/^0x(?:[a-fA-F0-9]{2})+$/.test(fullReport??'')) throw Error('INVALID_HEX');
  const b=Buffer.from(fullReport.slice(2),'hex');
  const word=(buf,i)=>{if(i<0||i+32>buf.length)throw Error('TRUNCATED');return BigInt('0x'+buf.subarray(i,i+32).toString('hex'));};
  // ABI envelope: bytes32[3] context, bytes report, bytes32[] rs, bytes32[] ss, bytes32 rawVs.
  const off=word(b,96); if(off>BigInt(b.length)||off<224n||off%32n)throw Error('INVALID_OFFSET');
  const n=word(b,Number(off)); if(n!==288n||off+32n+n>BigInt(b.length))throw Error('INVALID_V3_LENGTH');
  const r=b.subarray(Number(off)+32,Number(off)+320);
  if('0x'+r.subarray(0,32).toString('hex')!==feed||!feed.startsWith('0x0003'))throw Error('WRONG_FEED_OR_SCHEMA');
  const uint32=i=>{const v=word(r,i*32);if(v>0xffffffffn)throw Error('TIMESTAMP_RANGE');return Number(v);};
  const price=i=>{const v=word(r,i*32);if(v===0n||v>=1n<<191n)throw Error('INVALID_PRICE');return v.toString();};
  const result={feed,validFrom:uint32(1),observed:uint32(2),expires:uint32(5),benchmark:price(6),bid:price(7),ask:price(8)};
  if(result.validFrom>result.observed||result.expires<result.observed||BigInt(result.bid)>BigInt(result.ask))throw Error('INVALID_FIELDS');
  return {...result,reportDigest:createHash('sha256').update(b).digest('hex'),bytes:b.length,authenticated:false};
}
