import {creatureAvatar,creatureTraits} from './creatures/creature-avatar.mjs';
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Local presentation identity only. This is never a social login or wallet proof.
export function profileIdentity(network,owner){return owner?network+':'+(network==='HyperEVM'?owner.toLowerCase():owner):'yellowhands:practice-guest';}
export function profileCard({network,owner,balance=null,historyAction='history',walletAction='wallet'}){
 const id=profileIdentity(network,owner),traits=creatureTraits(id),name=traits.species.replaceAll('-',' ');
 return '<section class="yh-profile"><div class="yh-profile-avatar" role="img" aria-label="'+escape(name)+' avatar">'+creatureAvatar(id)+'</div><h3>'+escape(owner?(owner.length>24?owner.slice(0,10)+'…'+owner.slice(-6):owner):'Paper explorer')+'</h3><p>'+escape(owner?network+' · Money':'Paper Hands · Practice')+'</p><div class="yh-profile-balance"><span>'+escape(owner?'Trading balance':'Practice mode')+'</span><strong>'+escape(owner?(balance??'Updating…'):'No real money')+'</strong></div><button class="p-primary" data-action="'+escape(walletAction)+'">'+(owner?'Balances & wallet':'Sign in for real trades')+'</button>'+(owner?'<button class="p-share" data-action="'+escape(historyAction)+'">Your trade history</button>':'')+'</section>';
}
export const PROFILE_CSS=`
#purple-hands-play .yh-profile{text-align:center;display:flex;flex-direction:column;align-items:center;gap:12px;min-width:0}
#purple-hands-play .yh-profile-avatar{width:104px;height:104px;background:var(--p-bg);border:1px solid var(--p-line);border-radius:28px;padding:12px;box-sizing:border-box}
#purple-hands-play .yh-profile-avatar svg{width:100%;height:100%}
#purple-hands-play .yh-profile h3{font-size:22px;overflow-wrap:anywhere;margin:0}
#purple-hands-play .yh-profile p{margin:0;color:var(--p-dim)}
#purple-hands-play .yh-profile-balance{width:100%;padding:20px;box-sizing:border-box;background:var(--p-bg);border-radius:18px;margin:8px 0}
#purple-hands-play .yh-profile-balance span{display:block;font-size:13px;color:var(--p-dim);margin-bottom:8px}
#purple-hands-play .yh-profile-balance strong{font-size:28px}
#purple-hands-play .yh-profile button{width:100%;min-height:44px}
`;
