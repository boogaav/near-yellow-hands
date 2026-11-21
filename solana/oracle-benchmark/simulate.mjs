// Direct verifier simulation ONLY. No sendTransaction method, key or fee payment.
// This is not an application CPI benchmark or a landed transaction.
import {Connection,PublicKey,TransactionInstruction,TransactionMessage,VersionedTransaction} from '@solana/web3.js';
import snappy from 'snappyjs';
import {readFile,writeFile} from 'node:fs/promises';
import {performance} from 'node:perf_hooks';
import {decode} from './core.mjs';
const m=JSON.parse(await readFile('manifest.json','utf8'));
if(!process.env.LOCAL_REPORT_FILE||!process.env.SIMULATION_PAYER_PUBLIC_KEY)throw Error('Need LOCAL_REPORT_FILE and an existing public fee-payer address (no private key).');
const body=JSON.parse(await readFile(process.env.LOCAL_REPORT_FILE,'utf8'));
const hex=body.report?.fullReport??body.fullReport;decode(hex);
const raw=Buffer.from(hex.slice(2),'hex'),compressed=Buffer.from(snappy.compress(raw));
const program=new PublicKey(m.verifierProgram),payer=new PublicKey(process.env.SIMULATION_PAYER_PUBLIC_KEY);
const verifier=PublicKey.findProgramAddressSync([Buffer.from('verifier')],program)[0],config=PublicKey.findProgramAddressSync([raw.subarray(0,32)],program)[0];
const c=new Connection('https://api.mainnet-beta.solana.com',{commitment:'confirmed',fetch:(u,o)=>fetch(u,{...o,signal:AbortSignal.timeout(15000)}),disableRetryOnRateLimit:true});
const data=Buffer.alloc(12+compressed.length);Buffer.from([133,161,141,48,120,198,88,150]).copy(data);data.writeUInt32LE(compressed.length,8);compressed.copy(data,12);
const ix=new TransactionInstruction({programId:program,keys:[verifier,new PublicKey(m.mainnetAccessController),payer,config].map((pubkey,i)=>({pubkey,isSigner:i===2,isWritable:false})),data});
const {blockhash}=await c.getLatestBlockhash();const tx=new VersionedTransaction(new TransactionMessage({payerKey:payer,recentBlockhash:blockhash,instructions:[ix]}).compileToV0Message());
const bytes=tx.serialize().length;if(bytes>1232)throw Error('TRANSACTION_TOO_LARGE');
const start=performance.now();const r=await c.simulateTransaction(tx,{sigVerify:false,replaceRecentBlockhash:true,commitment:'confirmed'});const elapsed=performance.now()-start;
const returned=r.value.returnData;
const out={mode:'RPC simulation of direct verifier, NOT application CPI',signatureCheck:false,simulationRpcMs:elapsed,serializedBytes:bytes,slot:r.context.slot,error:r.value.err,unitsConsumed:r.value.unitsConsumed,returnProducerMatches:returned?.programId===m.verifierProgram,returnedBytes:returned?Buffer.from(returned.data[0],'base64').length:null,authenticApplicationCpi:false,transactionConfirmationMs:null,submitted:false};
await writeFile('evidence/simulation.json',JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(out,null,2));
