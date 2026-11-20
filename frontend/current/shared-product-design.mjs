// Visual source: TON Mobile Vision 04, ton/web/mobile-vision.css.
// Web adapters keep their own account state and transaction handlers.
import {creatureAvatar} from './shared/creatures/creature-avatar.mjs';
import {PROFILE_CSS} from './shared/profile.mjs';
export const SHARED_PRODUCT_CSS = `
html[data-brand-theme=yellow] #purple-hands-play {
 --p-bg:#181b20;--p-surface:#22262d;--p-raised:#292e36;
 --p-line:#343a43;--p-ink:#f4f5f6;--p-dim:#aeb4be;
 --p-purple:#f3c500;--p-lime:#44d7aa;--p-pink:#ff8f9c;--p-red:#ff8f9c;
 font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
 background:var(--p-bg);color:var(--p-ink);
}
html[data-brand-theme=yellow] #purple-hands-play :is(.p-header,.p-footer,.p-arena,.p-manifesto){background:var(--p-bg)}
html[data-brand-theme=yellow] #purple-hands-play :is(.p-terminal,.p-control-panel,.p-dialog,.yh-lp-panel){background:var(--p-surface);border-color:var(--p-line);box-shadow:none;border-radius:22px}
html[data-brand-theme=yellow] #purple-hands-play :is(button,a,input,select,summary):focus-visible{outline:2px solid var(--p-purple);outline-offset:3px}
html[data-brand-theme=yellow] #purple-hands-play button{touch-action:manipulation}
html[data-brand-theme=yellow] #purple-hands-play :is(.p-primary,.yh-login-primary){background:var(--p-purple);color:#181b20;border-radius:16px}
html[data-brand-theme=yellow] #purple-hands-play :is(.p-detail-row,.yh-funding,.yh-quick){font-variant-numeric:tabular-nums}
html[data-brand-theme=yellow] #purple-hands-play .p-wallet{background:var(--p-surface);border:1px solid #746225;border-radius:16px;min-height:44px;padding:7px 12px}
html[data-brand-theme=yellow] #purple-hands-play #p-balance{font-size:clamp(20px,2.5vw,32px);font-weight:650;letter-spacing:-.04em}
html[data-brand-theme=yellow] #purple-hands-play .p-wallet-label{font-size:10px;letter-spacing:.9px}
html[data-brand-theme=yellow] #purple-hands-play .ph-trade-hand{background:var(--p-surface);border:1px solid var(--p-line);border-radius:22px}
html[data-brand-theme=yellow] #purple-hands-play .ph-trade-hand[data-enter=up] .p-hand-label{color:var(--p-lime)}
html[data-brand-theme=yellow] #purple-hands-play .ph-trade-hand[data-enter=down] .p-hand-label{color:var(--p-pink)}
html[data-brand-theme=yellow] #purple-hands-play .p-cashout{background:var(--p-lime);color:#11251e;border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
html[data-brand-theme=yellow] #purple-hands-play .p-cashout-label{width:100%;text-align:center}
html[data-brand-theme=yellow] #purple-hands-play .p-dialog :is(input,select){box-sizing:border-box;max-width:100%;min-height:44px;border-radius:12px;background:var(--p-bg);color:var(--p-ink);border:1px solid var(--p-line);padding:12px}
html[data-brand-theme=yellow] #purple-hands-play .p-dialog :is(p,small){line-height:1.5}
html[data-brand-theme=yellow] #purple-hands-play .p-dialog :is(.p-primary,.ph-account-actions button){min-height:48px}
html[data-brand-theme=yellow] #purple-hands-play #p-result{text-align:center}
html[data-brand-theme=yellow] #purple-hands-play .p-overlay{z-index:100}
html[data-brand-theme=yellow] #purple-hands-play .yh-product-nav{display:flex;align-items:center;justify-content:center;gap:8px;width:100%}
html[data-brand-theme=yellow] #purple-hands-play .yh-product-nav button{flex:1;max-width:160px;min-height:48px;display:flex;align-items:center;justify-content:center;gap:8px;border:0;border-radius:14px;background:transparent;color:var(--p-dim);font-family:inherit;font-size:12px;font-weight:600;line-height:1.3;cursor:pointer}
html[data-brand-theme=yellow] #purple-hands-play .yh-product-nav svg{width:22px;height:22px;flex:none}
html[data-brand-theme=yellow] #purple-hands-play .yh-product-nav button[aria-current=page]{color:var(--p-purple);background:var(--p-raised)}
html[data-brand-theme=yellow] #purple-hands-play .yh-mode-label{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);margin:0}
html[data-brand-theme=yellow] #purple-hands-play .yh-hands-toolbar{grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0}
html[data-brand-theme=yellow] #purple-hands-play .yh-mode-switch{display:inline-flex;flex:none;gap:2px;padding:2px;border:1px solid var(--p-line);border-radius:10px;background:var(--p-bg);width:max-content}
html[data-brand-theme=yellow] #purple-hands-play .yh-mode-switch button{width:52px;min-width:0;min-height:26px;padding:0 5px;border:0;border-radius:7px;background:transparent;color:var(--p-dim);font-family:inherit;font-size:12px;line-height:26px;font-weight:600;cursor:pointer}
html[data-brand-theme=yellow] #purple-hands-play .yh-hands-toolbar #yh-paper-settings{font-size:11px;min-height:32px;padding:0;text-align:right}
html[data-brand-theme=yellow] #purple-hands-play .yh-hands-toolbar:has(.yh-radio-settings){display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px;border:1px solid var(--p-line);border-radius:14px;background:var(--p-bg)}
html[data-brand-theme=yellow] #purple-hands-play .yh-hands-toolbar .yh-mode-switch{grid-column:1/-1}
html[data-brand-theme=yellow] #purple-hands-play .yh-hands-toolbar .yh-radio-settings{grid-column:1/-1;margin:0;max-width:none}
html[data-brand-theme=yellow] #purple-hands-play .yh-hands-toolbar:has(.yh-radio-settings) #yh-paper-settings{display:none}
html[data-brand-theme=yellow] #purple-hands-play .yh-mode-switch button[aria-pressed=true]{background:var(--p-purple);color:#181b20}
html[data-brand-theme=yellow] #purple-hands-play .yh-mode-switch button:disabled{cursor:not-allowed;opacity:.55}
html[data-brand-theme=yellow] #purple-hands-play[data-visitor=true][data-workspace-mode=trader] .yh-workspace-bar{display:none}
html[data-brand-theme=yellow] #purple-hands-play .p-footer:has(.yh-product-nav){display:flex;flex-direction:column;gap:4px;padding:8px 12px max(8px,env(safe-area-inset-bottom));height:auto;flex:none}
html[data-brand-theme=yellow] #purple-hands-play .p-footer:has(.yh-product-nav)>#p-connection{display:none}
html[data-brand-theme=yellow] #purple-hands-play .yh-footer-nav{gap:0}
html[data-brand-theme=yellow] #purple-hands-play .yh-footer-nav :is(a,button){font-size:11px;padding:6px 8px;min-height:32px}
@media(max-width:899px){
 html[data-brand-theme=yellow] #purple-hands-play .p-header{padding:12px 16px;min-height:64px;gap:12px}
 html[data-brand-theme=yellow] #purple-hands-play .p-manifesto{display:none!important}
 html[data-brand-theme=yellow] #purple-hands-play .p-brandtext{font-size:18px}
 html[data-brand-theme=yellow] #purple-hands-play .p-brandmark{width:38px;height:38px}
 html[data-brand-theme=yellow] #purple-hands-play .p-arena{padding:12px 16px;min-width:0}
 html[data-brand-theme=yellow] #purple-hands-play :is(.p-terminal,.p-control-panel){padding:12px;border-radius:20px;min-width:0}
 html[data-brand-theme=yellow] #purple-hands-play .p-dialog{width:calc(100% - 24px);max-height:calc(100dvh - 24px);padding:24px 20px;overflow:auto;overscroll-behavior:contain}
 html[data-brand-theme=yellow] #purple-hands-play .p-dialog h2{font-size:26px;letter-spacing:-.04em}
 html[data-brand-theme=yellow] #purple-hands-play .yh-footer-nav{flex-wrap:wrap;justify-content:center}
 html[data-brand-theme=yellow] #purple-hands-play .yh-product-nav button{flex-direction:column;gap:4px;font-size:11px}
 html[data-brand-theme=yellow] #purple-hands-play[data-trade-focus=true] .yh-footer-nav{display:none}
}
@media(max-width:899px){
 html[data-brand-theme=yellow] #purple-hands-play:has(.yh-product-nav){padding-bottom:calc(108px + env(safe-area-inset-bottom));box-sizing:border-box}
 html[data-brand-theme=yellow] #purple-hands-play .p-footer:has(.yh-product-nav){position:fixed;bottom:0;left:0;right:0;z-index:20;border-top:1px solid var(--p-line)}
 html[data-brand-theme=yellow] #purple-hands-play .yh-beta-disclosure span{display:none}
 html[data-brand-theme=yellow] #purple-hands-play .yh-beta-disclosure{width:44px;height:44px;min-width:44px;padding:0}
 html[data-brand-theme=yellow] #purple-hands-play .p-header-actions{margin-left:auto}
 html[data-brand-theme=yellow] #purple-hands-play .p-header{display:flex!important;flex-wrap:nowrap!important}
 html[data-brand-theme=yellow] #purple-hands-play .p-wallet{white-space:nowrap}
 html[data-brand-theme=yellow] #purple-hands-play[data-trade-focus=true]:has(.yh-product-nav){padding-bottom:calc(80px + env(safe-area-inset-bottom))}
}
@media(max-width:380px){
 html[data-brand-theme=yellow] #purple-hands-play .p-header{padding:10px 12px;gap:8px}
 html[data-brand-theme=yellow] #purple-hands-play .p-brandtext{font-size:16px}
 html[data-brand-theme=yellow] #purple-hands-play .p-header-actions{gap:6px}
}
@media(prefers-reduced-motion:reduce){html[data-brand-theme=yellow] #purple-hands-play .yh-product-nav button{transition:none}}
` + PROFILE_CSS;

const icons = {
 history: '<path d="M2 21V12h6V8h8v7h6v6H2Zm6-9v9m8-6v6M11 4l1-1v3" stroke-linejoin="round"/>',
 trading: '<path d="M3 17l6-6 4 3 8-10M15 4h6v6"/>',
 profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>'
};

export function mountProductNavigation(root, {onTrading, onProfile, onHistory, onPaper, onMoney, mode}) {
 if(root.dataset.brandTheme !== 'yellow') return;
 const footer = root.querySelector('.p-footer');
 if(!footer || footer.querySelector('.yh-product-nav')) return;
 const doc = root.ownerDocument;
 const label = doc.createElement('p');
 label.className = 'yh-mode-label';
 label.textContent = mode;
 const switcher = doc.createElement('div');
 switcher.className = 'yh-mode-switch';
 switcher.setAttribute('role','group');
 switcher.setAttribute('aria-label','Trading mode');
 for(const [title, callback] of [['Paper',onPaper],['Money',onMoney]]) {
  const button=doc.createElement('button');button.type='button';button.textContent=title;
  button.addEventListener('click',()=>{if(button.getAttribute('aria-pressed')!=='true')callback?.();});
  switcher.append(button);
 }
 const nav = doc.createElement('nav');
 nav.className = 'yh-product-nav';
 nav.setAttribute('aria-label', 'Main navigation');
 for(const [key, title, callback] of [['history','Leaderboard',()=>window.open('/community','_blank','noopener,noreferrer')],['trading','Trading',onTrading],['profile','Profile',onProfile]]) {
  const button = doc.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', title);
  if(key === 'trading') button.setAttribute('aria-current', 'page');
  button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">'+icons[key]+'</svg><span>'+title+'</span>';
  button.addEventListener('click', callback);
  nav.append(button);
 }
 footer.querySelector('.yh-footer-nav button[data-action="history"]')?.remove();
 const toolbar=doc.createElement('div');toolbar.className='yh-hands-toolbar';
 toolbar.append(switcher,label);
 const settings=root.querySelector('#yh-paper-settings');if(settings)toolbar.append(settings);
 const tradeSettings=root.querySelector('.yh-radio-settings');if(tradeSettings)toolbar.append(tradeSettings);
 root.querySelector('.p-hands')?.prepend(toolbar);
 footer.prepend(nav);
 const control={setMode(value,{blocked=false}={}) {
  const money=value.startsWith('Money');
  label.textContent=blocked?'Finish your position or request to switch modes':value;
  [...switcher.children].forEach((button,index)=>{
   const selected=(index===1)===money;
   button.setAttribute('aria-pressed',String(selected));
   button.disabled=blocked&&!selected;
   button.title=blocked&&!selected?'Finish your position or request first':'';
  });
 },setProfile(identity){
  const button=nav.lastElementChild;
  if(button.dataset.avatar===identity)return;
  button.dataset.avatar=identity;
  button.querySelector('svg').outerHTML=creatureAvatar(identity);
 }};
 control.setMode(mode);
 return control;
}
