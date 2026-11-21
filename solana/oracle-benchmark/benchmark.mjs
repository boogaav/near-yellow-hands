import { readFile, writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import {auth,decode,summarize,FEED} from './core.mjs';
const path=process.env.CHAINLINK_CREDENTIALS_FILE;
if(!path)throw Error('Set CHAINLINK_CREDENTIALS_FILE to protected local JSON; never put credentials in arguments.');
const c=JSON.parse(await readFile(path,'utf8'));
if(!c.key||!c.secret||c.environment!=='mainnet')throw Error('Expected existing mainnet credentials. No subscription purchases are performed.');
const count=Number(process.env.SAMPLES??5);
if(!Number.isInteger(count)||count<1||count>1000)throw Error('SAMPLES must be 1–1000');
const host='https://api.dataengine.chain.link';
async function get(p){const start=performance.now();try{const res=await fetch(host+p,{headers:auth(p,c.key,c.secret,Date.now()),redirect:'error',signal:AbortSignal.timeout(15000)});let body;try{body=await res.json();}catch{}return{status:res.status,fetchMs:performance.now()-start,body};}catch{return{status:null,fetchMs:performance.now()-start,error:'NETWORK_OR_TIMEOUT'};}}
const discovery=await get('/api/v1/discovery?status=live');
const metadata=discovery.body?.feeds?.filter(x=>x.baseAsset==='BTC'&&x.quoteAsset==='USD').map(x=>({feedId:x.feedId,name:x.name,status:x.status,schemaVersion:x.schemaVersion,isSubscribed:x.isSubscribed}));
const rows=[];
for(let i=0;i<count;i++){
  const r=await get(`/api/v1/reports/latest?feedID=${FEED}`);const row={attempt:i+1,receivedAt:new Date().toISOString(),status:r.status,fetchMs:r.fetchMs,error:r.error};
  if(r.status===200){try{const report=decode(r.body?.report?.fullReport??r.body?.fullReport);Object.assign(row,{reportDecoded:true,report,observationAgeAtReceiveMs:Date.now()-report.observed*1000});if(process.env.LOCAL_REPORT_FILE)await writeFile(process.env.LOCAL_REPORT_FILE,JSON.stringify(r.body),{mode:0o600});}catch{row.error='REPORT_DECODE_FAILED';}}
  rows.push(row);if(r.status===401||r.status===403||r.status===429)break;
  if(i+1<count)await new Promise(r=>setTimeout(r,1000));
}
const result={runAt:new Date().toISOString(),mode:'read-only-mainnet-REST',feed:FEED,discovery:{status:discovery.status,btcUsd:metadata},rows,summary:summarize(rows),limitations:['REST acquisition timing is not stream latency or execution latency.','Decoding does not authenticate DON signatures.','Local clock uncertainty not calibrated; observation timestamps have second precision.','No transaction submitted, no funds spent, no CPI or confirmation measurement.']};
await writeFile(process.env.EVIDENCE_FILE??'evidence/acquisition.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
