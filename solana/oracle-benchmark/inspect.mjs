import {Connection,PublicKey} from '@solana/web3.js';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const m=JSON.parse(await readFile('manifest.json','utf8'));
const rows=[];
for(const [cluster,url,ac] of [['mainnet-beta','https://api.mainnet-beta.solana.com',m.mainnetAccessController],['devnet','https://api.devnet.solana.com',m.devnetAccessController]]){
 const p=new PublicKey(m.verifierProgram);const v=PublicKey.findProgramAddressSync([Buffer.from('verifier')],p)[0];
 const c=new Connection(url,{commitment:'finalized',fetch:(u,o)=>fetch(u,{...o,signal:AbortSignal.timeout(15000)}),disableRetryOnRateLimit:true});
 try{const r=await c.getMultipleAccountsInfoAndContext([p,v,new PublicKey(ac)]);rows.push({cluster,slot:r.context.slot,accounts:r.value.map((a,i)=>({address:[p.toBase58(),v.toBase58(),ac][i],exists:!!a,owner:a?.owner.toBase58(),executable:a?.executable,bytes:a?.data.length,dataSha256:a?createHash('sha256').update(a.data).digest('hex'):null})),verifierStateOwnerMatches:r.value[1]?.owner.equals(p)??false});}catch{rows.push({cluster,error:'RPC_READ_FAILED'});}
}
const out={checkedAt:new Date().toISOString(),mode:'read-only-account-inventory',rows,authenticVerification:false};await writeFile('evidence/accounts.json',JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(out,null,2));
