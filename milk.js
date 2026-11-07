// Café Lab: step-by-step milk steaming guide with animations. English and Dutch built in; Portuguese comes from the page's PT dictionary when there is one.
(function(){
const B=(en,nl)=>({en,nl});
const css=`
.mg{display:flex;flex-direction:column;gap:12px}
.mgArt{width:100%;aspect-ratio:5/3;max-height:240px}
.mgArt svg{width:100%;height:100%;overflow:visible}
.mgArt text{font:600 9px var(--body,system-ui);fill:var(--muted)}
.mgDots{display:flex;gap:6px;justify-content:center;flex-wrap:wrap}.mgDots button{width:30px;height:30px;border-radius:99px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font:600 12px var(--body,system-ui);cursor:pointer;padding:0;min-height:0}
.mgDots button[aria-current="true"]{background:var(--crema);border-color:var(--crema);color:var(--on-crema)}
.mgNav{display:flex;gap:8px}.mgNav button{flex:1}
.mgStep h3{margin:0 0 4px}.mgStep ul{margin:6px 0 0;padding-left:20px;display:flex;flex-direction:column;gap:6px}
.mgTip{padding:10px 12px;border-radius:12px;background:var(--crema-soft);font-size:14px}
.mgTable{width:100%;border-collapse:collapse;font-size:14px}.mgTable td,.mgTable th{text-align:left;vertical-align:top;padding:8px 6px;border-bottom:1px solid var(--line)}.mgTable th{color:var(--muted);font-weight:600}
.mgSrc{font-size:12px;color:var(--muted);display:flex;flex-wrap:wrap;gap:4px 14px;align-items:baseline}.mgSrc a{color:var(--crema)}
@media (prefers-reduced-motion:no-preference){
 .mgA .fillIn{transform-box:fill-box;transform-origin:50% 100%;animation:mgFill 3s ease-out infinite}
 .mgA .grow{transform-box:fill-box;transform-origin:50% 100%;animation:mgGrow 4s ease-in-out infinite}
 .mgA .puff{transform-box:fill-box;transform-origin:center;animation:mgPuff 1.6s ease-out infinite}.mgA .puff.p2{animation-delay:.5s}.mgA .puff.p3{animation-delay:1s}
 .mgA .dip{animation:mgDip 3s ease-in-out infinite}
 .mgA .bub{animation:mgBub 1.4s ease-in infinite}.mgA .bub.b2{animation-delay:.45s}.mgA .bub.b3{animation-delay:.9s}
 .mgA .wave{transform-box:fill-box;transform-origin:0 50%;animation:mgWave 1s ease-out infinite}.mgA .wave.w2{animation-delay:.33s}.mgA .wave.w3{animation-delay:.66s}
 .mgA .lower{animation:mgLower 4s ease-in-out infinite}
 .mgA .spin{transform-box:fill-box;transform-origin:center;animation:mgSpin 2.2s linear infinite}.mgA .spin.slow{animation-duration:4s}
 .mgA .therm{transform-box:fill-box;transform-origin:50% 100%;animation:mgTherm 5s ease-in-out infinite}
 .mgA .stop{animation:mgStop 5s step-end infinite}
 .mgA .wipe{animation:mgWipe 2.4s ease-in-out infinite}
 .mgA .tap{animation:mgTap 3s ease-in-out infinite}.mgA .swirl{transform-box:fill-box;transform-origin:50% 90%;animation:mgSwirl 3s ease-in-out infinite}
 .mgA .shine{animation:mgShine 3s ease-in-out infinite}
 .mgA .pourJug{transform-box:view-box;transform-origin:120px 40px;animation:mgPour 5s ease-in-out infinite}
 .mgA .stream{transform-box:fill-box;transform-origin:50% 0;animation:mgStream 5s ease-in-out infinite}
 .mgA .cupFill{transform-box:fill-box;transform-origin:50% 100%;animation:mgCup 5s ease-in-out infinite}
 .mgA .heart{transform-box:fill-box;transform-origin:center;animation:mgHeart 5s ease-in-out infinite}
 .mgA .bar{transform-box:fill-box;transform-origin:0 50%;animation:mgBar 2.5s cubic-bezier(.2,.8,.2,1) both}.mgA .bar.d2{animation-delay:.25s}.mgA .bar.d3{animation-delay:.5s}
}
@keyframes mgFill{0%{transform:scaleY(0)}60%,100%{transform:scaleY(1)}}
@keyframes mgGrow{0%,10%{transform:scaleY(1)}70%,100%{transform:scaleY(1.28)}}
@keyframes mgPuff{0%{opacity:.9;transform:scale(.3)}100%{opacity:0;transform:scale(1.6) translateY(6px)}}
@keyframes mgDip{0%,15%{transform:translateY(-14px)}45%,100%{transform:none}}
@keyframes mgBub{0%{opacity:0;transform:translateY(6px)}30%{opacity:1}100%{opacity:0;transform:translateY(-14px)}}
@keyframes mgWave{0%{opacity:.9;transform:scale(.6)}100%{opacity:0;transform:scale(1.4)}}
@keyframes mgLower{0%,10%{transform:none}70%,100%{transform:translateY(6px)}}
@keyframes mgSpin{to{transform:rotate(360deg)}}
@keyframes mgTherm{0%{transform:scaleY(.08)}75%,100%{transform:scaleY(1)}}
@keyframes mgStop{0%{opacity:0}75%{opacity:1}100%{opacity:1}}
@keyframes mgWipe{0%,100%{transform:translateY(0)}50%{transform:translateY(30px)}}
@keyframes mgTap{0%,8%,16%,100%{transform:none}4%,12%{transform:translateY(-6px)}40%{transform:none}}
@keyframes mgSwirl{0%,30%{transform:none}45%{transform:rotate(-6deg)}60%{transform:rotate(6deg)}75%{transform:rotate(-4deg)}90%,100%{transform:none}}
@keyframes mgShine{0%,40%{opacity:0}60%{opacity:.9}100%{opacity:0}}
@keyframes mgPour{0%,10%{transform:none}30%,80%{transform:rotate(-38deg)}95%,100%{transform:none}}
@keyframes mgStream{0%,25%{transform:scaleY(0)}32%,78%{transform:scaleY(1)}86%,100%{transform:scaleY(0)}}
@keyframes mgCup{0%,28%{transform:scaleY(.2)}80%,100%{transform:scaleY(1)}}
@keyframes mgHeart{0%,60%{opacity:0;transform:scale(.4)}78%,100%{opacity:1;transform:none}}
@keyframes mgBar{from{transform:scaleX(0)}to{transform:none}}

.mgArt{aspect-ratio:9/5;max-height:300px}
.mgArt text{font:600 10.5px var(--body,system-ui);fill:var(--ink)}
.mgArt text.cap{font:700 11px var(--body,system-ui);fill:var(--muted)}
.mgArt text.tick{font:600 9.5px var(--mono,ui-monospace,monospace);fill:var(--muted)}
.mgArt text.cname{font:700 11px var(--body,system-ui)}
.mgArt text.ph{font:700 8px var(--body,system-ui);fill:var(--ink)}.mgArt text.ph.on{fill:var(--on-crema,#fff)}
.mgArt text.stopT{font:800 11px var(--body,system-ui);fill:#fff;letter-spacing:.08em}
@media (prefers-reduced-motion:no-preference){
 .mgA .pourC{animation:mgCarton 3s ease-out infinite}.mgA .streamA{transform-box:fill-box;transform-origin:50% 0;animation:mgStreamA 3s ease-out infinite}
 .mgA .knobT{transform-box:fill-box;transform-origin:50% 100%;animation:mgKnob 2.4s ease-in-out infinite}
 .mgA .drip{animation:mgDrip 2.4s ease-in infinite}.mgA .drip.d2{animation-delay:.2s}
 .mgA .puff{animation-duration:2.4s}.mgA .puff.late{animation-delay:1.3s}
 .mgA .pulse{transform-box:fill-box;transform-origin:center;animation:mgPulse 1.6s ease-in-out infinite}
 .mgA .shrink{transform-box:fill-box;transform-origin:center;animation:mgShrink 3s ease-in infinite}
 .mgA .needle{animation:mgNeedle 6s cubic-bezier(.4,0,.2,1) infinite}.mgA .stopPill{animation:mgStopPill 6s step-end infinite}
 .mgA .impact{animation:mgImpact 4s ease-out infinite}.mgA .swirlArrow{animation:mgSwArrow 4s ease-in-out infinite}
 .mgA .tap{animation:mgTap2 4s ease-in-out infinite}.mgA .swirl{animation:mgSwirl2 4s ease-in-out infinite}.mgA .shine{animation:mgShine2 4s ease-in-out infinite}
 .mgA .jugMove{transform-box:view-box;transform-origin:150px 8px;animation:mgJug 8s ease-in-out infinite}
 .mgA .streamHi{animation:mgHi 8s step-end infinite}.mgA .streamLo{animation:mgLo 8s step-end infinite}
 .mgA .cupFill{animation:mgCup2 8s ease-in-out infinite}
 .mgA .whiteDot{transform-box:fill-box;transform-origin:center;animation:mgDot 8s ease-out infinite}.mgA .heart{animation:mgHeart2 8s ease-out infinite}
 .mgA .phaseA{animation:mgHi 8s step-end infinite}.mgA .phaseB{animation:mgLo 8s step-end infinite}
 .mgA .foamUp{transform-box:fill-box;transform-origin:50% 100%;animation:mgFoamUp 1.6s cubic-bezier(.2,.8,.2,1) both}
}
@media (prefers-reduced-motion:reduce){.mgA .streamLo,.mgA .whiteDot{display:none}}
@keyframes mgCarton{0%{opacity:1}55%{opacity:1}75%,100%{opacity:0}}
@keyframes mgStreamA{0%,50%{transform:scaleY(1);opacity:1}62%,100%{transform:scaleY(0);opacity:0}}
@keyframes mgKnob{0%{transform:none}25%,70%{transform:rotate(90deg)}90%,100%{transform:none}}
@keyframes mgDrip{0%{opacity:0;transform:none}5%{opacity:1}30%{opacity:1;transform:translateY(40px)}31%,100%{opacity:0;transform:translateY(40px)}}
@keyframes mgPulse{0%,100%{transform:none}50%{transform:scale(1.35)}}
@keyframes mgShrink{0%{transform:none;opacity:1}100%{transform:scale(.35);opacity:.3}}
@keyframes mgNeedle{0%{transform:rotate(9deg)}70%,100%{transform:rotate(135deg)}}
@keyframes mgStopPill{0%{opacity:0}70%{opacity:1}}
@keyframes mgImpact{0%,2%{opacity:0}4%{opacity:1}12%{opacity:0}14%{opacity:1}22%,100%{opacity:0}}
@keyframes mgSwArrow{0%,30%{opacity:0}40%,85%{opacity:1}95%,100%{opacity:0}}
@keyframes mgTap2{0%,100%{transform:none}4%,14%{transform:translateY(-7px)}9%,19%{transform:none}}
@keyframes mgSwirl2{0%,30%{transform:none}42%{transform:translateX(-5px)}54%{transform:translateX(5px)}66%{transform:translateX(-4px)}78%{transform:translateX(3px)}90%,100%{transform:none}}
@keyframes mgShine2{0%,60%{opacity:0}80%{opacity:.95}100%{opacity:.4}}
@keyframes mgJug{0%{transform:none}10%,42%{transform:rotate(-16deg)}52%,86%{transform:translate(-10px,46px) rotate(-26deg)}96%,100%{transform:none}}
@keyframes mgHi{0%{opacity:0}10%{opacity:1}46%,100%{opacity:0}}
@keyframes mgLo{0%,50%{opacity:0}52%{opacity:1}88%,100%{opacity:0}}
@keyframes mgCup2{0%,8%{opacity:0}46%{opacity:.8}86%,100%{opacity:1}}
@keyframes mgDot{0%,52%{opacity:0;transform:scale(.2)}68%,100%{opacity:1;transform:none}}
@keyframes mgHeart2{0%,76%{opacity:0}86%,100%{opacity:1}}
@keyframes mgFoamUp{from{transform:scaleY(0)}to{transform:none}}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

// ---------- illustrations: one style for every step (viewBox 320 × 200) ----------
// Labels sit in boxes ("lbl") with a pointer line; drawings that labels must not cover carry the class "ob".
const MILK="#f3e8d8",MILK2="#e6d4bb",FOAM="#fffbf4",ESP="#3b2416",CREMA="#b9783e";
let uid=0;
const CW=6.0,LH=13; // estimated width of one character and line height of label text (10.5px, semibold)
function lbl(x,y,lines,to,o={}){lines=lines.flatMap(l=>String(l).split("|")); // box at x,y (o.right: x is the right edge); pointer to "to" [x,y]
 const w=Math.ceil(Math.max(...lines.map(l=>l.length))*CW)+16,h=lines.length*LH+9,X=o.right?x-w:x;
 const tone=o.tone||"",fill=tone==="good"?"#e3f1e1":tone==="bad"?"#fbe4dd":"var(--surface)",stroke=tone==="good"?"#3d7a4c":tone==="bad"?"#c4472b":"var(--line)";
 let lead="";if(to){const cx=Math.max(X,Math.min(X+w,to[0])),cy=Math.max(y,Math.min(y+h,to[1]));lead=`<path d="M${cx} ${cy}L${to[0]} ${to[1]}" stroke="var(--ink)" stroke-width="1" stroke-dasharray="2 2" opacity=".55"/><circle cx="${to[0]}" cy="${to[1]}" r="2.6" fill="var(--crema)" stroke="var(--surface)" stroke-width="1"/>`}
 return `<g class="lblWrap${o.cls?" "+o.cls:""}" data-to="${to?to.join(","):""}">${lead}<g class="lbl" data-right="${o.right?x:""}"><rect x="${X}" y="${y}" width="${w}" height="${h}" rx="7" fill="${fill}" stroke="${stroke}"/>${lines.map((l,i)=>`<text x="${X+8}" y="${y+15+i*LH}"${i===0&&o.bold!==false?' font-weight="700"':""}${tone?` style="fill:${tone==="good"?"#1f5130":"#8a2410"}"`:""}>${l}</text>`).join("")}</g></g>`}
const panel=()=>`<rect x="1" y="1" width="358" height="198" rx="16" fill="var(--sunk,#efe5da)"/><path d="M14 184H346" stroke="var(--line)" stroke-width="2" stroke-linecap="round"/>`;
// stainless jug: rim from (x,y), width w, body height h; milk level as y inside; extras drawn inside the clip
function jug(x,y,w,h,level,inside="",o={}){if(o.flip){const cx=x+w/2;return `<g transform="translate(${2*cx} 0) scale(-1 1)">${jug(x,y,w,h,level,inside,{...o,flip:0})}</g>`}const id="j"+(++uid),b=y+h,inset=w*0.08;
 const body=`M${x} ${y}H${x+w}L${x+w-inset} ${b-8}Q${x+w-inset} ${b} ${x+w-inset-8} ${b}H${x+inset+8}Q${x+inset} ${b} ${x+inset} ${b-8}Z`;
 return `<defs><linearGradient id="${id}s" x1="0" x2="1"><stop offset="0" stop-color="#9aa0a8"/><stop offset=".35" stop-color="#eef0f3"/><stop offset=".6" stop-color="#c3c8ce"/><stop offset="1" stop-color="#8d939b"/></linearGradient><clipPath id="${id}c"><path d="${body}"/></clipPath>
 <linearGradient id="${id}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${FOAM}"/><stop offset=".12" stop-color="${MILK}"/><stop offset="1" stop-color="${MILK2}"/></linearGradient></defs>
 <g class="ob"><path d="M${x+w-2} ${y+h*0.16}C${x+w+w*0.32} ${y+h*0.12} ${x+w+w*0.32} ${y+h*0.62} ${x+w-inset+2} ${y+h*0.66}" fill="none" stroke="#8d939b" stroke-width="${Math.max(5,w*0.07)}" stroke-linecap="round"/>
 <path d="${body}" fill="url(#${id}s)"/><g clip-path="url(#${id}c)"><path d="${body}" fill="#7d838b" opacity=".18"/>${level!=null?`<g class="${o.milkCls||""}"><rect x="${x-4}" y="${level}" width="${w+8}" height="${b-level+4}" fill="url(#${id}m)"/></g>`:""}${inside}</g>
 <path d="M${x} ${y}L${x-w*0.14} ${y-w*0.07}L${x+w*0.06} ${y-1}" fill="url(#${id}s)" stroke="#7d838b" stroke-width="1.2" stroke-linejoin="round"/>
 <path d="${body}" fill="none" stroke="#5f656d" stroke-width="1.6"/><path d="M${x+w*0.18} ${y+6}L${x+w*0.24} ${b-12}" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55"/><path d="M${x} ${y}H${x+w}" stroke="#5f656d" stroke-width="2.4" stroke-linecap="round"/></g>`}
// espresso machine corner (top right) and steam wand ending at the tip
function machine(knob=""){return `<g class="ob"><rect x="272" y="-6" width="96" height="42" rx="8" fill="#3a3f45"/><rect x="272" y="30" width="96" height="6" fill="#2a2e33"/><circle cx="336" cy="15" r="9" fill="#d8dbe0" stroke="#2a2e33" stroke-width="1.5"/><g class="${knob}"><path d="M336 15V7" stroke="#c4472b" stroke-width="2.6" stroke-linecap="round"/></g></g>`}
function wand(tx,ty,from=[302,36]){const id="w"+(++uid);return `<defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#8d939b"/><stop offset=".5" stop-color="#f1f3f5"/><stop offset="1" stop-color="#8d939b"/></linearGradient></defs><g class="ob"><path d="M${from[0]} ${from[1]}L${tx} ${ty}" stroke="#5f656d" stroke-width="8.5" stroke-linecap="round"/><path d="M${from[0]} ${from[1]}L${tx} ${ty}" stroke="url(#${id})" stroke-width="6" stroke-linecap="round"/><circle cx="${from[0]}" cy="${from[1]}" r="6" fill="#d8dbe0" stroke="#5f656d" stroke-width="1.5"/><circle cx="${tx}" cy="${ty}" r="3.6" fill="#2a2e33"/></g>`}
function phases(cur,L){const P=[L("stretch"),L("texture"),L("stop")];return `<g class="ob">${P.map((p,i)=>`<rect x="${14+i*112}" y="187" width="108" height="11" rx="5.5" fill="${i===cur?"var(--crema)":"var(--line)"}"/><text x="${68+i*112}" y="195.5" text-anchor="middle" class="ph${i===cur?" on":""}">${i+1}. ${p}</text>`).join("")}</g>`}
const svg=(inner,h=200)=>{const id="pc"+(++uid);return `<svg viewBox="0 0 360 ${h}" role="img"><defs><clipPath id="${id}"><rect x="1" y="1" width="358" height="${h-2}" rx="16"/></clipPath></defs><g clip-path="url(#${id})">${inner}</g></svg>`};
const DRAW=[
 // 1. cold milk to the bottom of the spout
 L=>svg(`${panel()}${jug(132,74,96,104,98,"",{milkCls:"fillIn"})}
  <g class="pourC ob"><g transform="translate(162 6) rotate(28)"><rect x="0" y="0" width="34" height="46" rx="3" fill="#fff" stroke="var(--ink)" stroke-width="1.5"/><path d="M0 0L17 -12L34 0" fill="#e9eef5" stroke="var(--ink)" stroke-width="1.5"/><rect x="5" y="14" width="24" height="16" rx="2" fill="#5b9bd5"/></g></g>
  <rect class="streamA" x="179" y="54" width="4" height="44" rx="2" fill="${MILK}"/>
  <path d="M116 98H244" stroke="var(--crema)" stroke-width="1.6" stroke-dasharray="5 4"/>
  ${lbl(10,80,[L("fillA"),L("fillB")],[116,98])}
  <g class="ob"><rect x="300" y="60" width="12" height="54" rx="6" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.5"/><rect x="303" y="86" width="6" height="22" rx="3" fill="#5b9bd5"/><circle cx="306" cy="116" r="9" fill="#5b9bd5" stroke="var(--ink)" stroke-width="1.5"/></g>
  ${lbl(346,134,[L("coldA"),L("coldB")],[306,124],{right:true})}`),
 // 2. purge the wand into the drip tray
 L=>svg(`${panel()}${machine("knobT")}${wand(196,112)}
  <g class="ob"><rect x="124" y="166" width="150" height="12" rx="3" fill="#5f656d"/>${Array.from({length:13},(_,i)=>`<rect x="${130+i*11}" y="168" width="6" height="8" rx="1.5" fill="#2a2e33"/>`).join("")}</g>
  <g><circle class="drip" cx="196" cy="122" r="2.6" fill="#7fb3e0"/><circle class="drip d2" cx="194" cy="122" r="2.2" fill="#7fb3e0"/>
  <circle class="puff" cx="196" cy="136" r="12" fill="#fff" opacity=".9"/><circle class="puff p2" cx="186" cy="146" r="10" fill="#fff" opacity=".9"/><circle class="puff p3" cx="206" cy="148" r="9" fill="#fff" opacity=".9"/></g>
  ${lbl(10,58,[L("purgeA"),L("purgeB")],[188,124])}
  ${lbl(10,130,[L("trayA")],[130,170])}
  ${lbl(262,6,[L("knobA")],[328,15],{right:true})}`),
 // 3. tip position: side view with depth gauge, and seen from above
 L=>svg(`${panel()}
  <g transform="rotate(-5 90 178)">${jug(42,86,92,90,108,"",{flip:1})}</g>
  <g class="dip">${wand(115,114,[180,4])}</g>
  <g class="ob"><path d="M74 108H88M74 116H88" stroke="var(--ink)" stroke-width="1.2"/><path d="M81 108V116" stroke="var(--crema)" stroke-width="2"/></g>
  ${lbl(10,12,[L("depthA"),L("depthB")],[81,108])}
  <g class="ob"><circle cx="282" cy="108" r="44" fill="url(#topM)" stroke="#5f656d" stroke-width="3"/><rect x="276" y="152" width="12" height="22" rx="5" fill="#8d939b"/><circle cx="282" cy="108" r="44" fill="none" stroke="#c3c8ce" stroke-width="6" opacity=".6"/><path d="M282 70V146M244 108H320" stroke="var(--line)" stroke-width="1" stroke-dasharray="3 3"/><path d="M272 66L282 52L292 66" fill="#8d939b" stroke="#5f656d" stroke-width="2" stroke-linejoin="round"/><path d="M282 56V84" stroke="#4a5058" stroke-width="5" stroke-linecap="round"/><circle class="pulse" cx="282" cy="84" r="6" fill="var(--crema)" stroke="#fff" stroke-width="2"/></g>
  <defs><radialGradient id="topM"><stop offset="0" stop-color="${FOAM}"/><stop offset="1" stop-color="${MILK2}"/></radialGradient></defs>
  
  ${lbl(346,2,[L("threeA"),L("threeB")],[292,58],{right:true})}`),
 // 4. stretch: tip at the surface, milk grows, lower the jug, tss sound
 L=>svg(`${panel()}
  <g class="lower">${jug(100,70,84,108,104,`<circle class="bub" cx="126" cy="108" r="2.8" fill="#fff" stroke="var(--line)"/><circle class="bub b2" cx="120" cy="111" r="2.2" fill="#fff" stroke="var(--line)"/><circle class="bub b3" cx="132" cy="112" r="2" fill="#fff" stroke="var(--line)"/>`,{milkCls:"grow",flip:1})}</g>
  ${wand(160,104,[250,4])}
  <g fill="none" stroke="var(--crema)" stroke-width="2.2" stroke-linecap="round"><path class="wave" d="M146 98q-6 -7 0 -14"/><path class="wave w2" d="M139 100q-10 -11 0 -22"/><path class="wave w3" d="M132 102q-14 -15 0 -30"/></g>
  ${lbl(10,18,[L("tssA"),L("tssB")],[128,84])}
  ${lbl(346,72,[L("lowerA"),L("lowerB")],[200,124],{right:true})}
  ${lbl(346,128,[L("airA"),L("airB")],null,{right:true,tone:"good"})}
  ${lbl(10,150,[L("growA"),L("growB")],[106,140])}
  ${phases(0,L)}`),
 // 5. whirlpool seen from above, tip deeper
 L=>svg(`${panel()}<g transform="translate(12 7)">
  <g class="ob"><circle cx="108" cy="104" r="62" fill="url(#vM)" stroke="#5f656d" stroke-width="3"/><circle cx="108" cy="104" r="62" fill="none" stroke="#c3c8ce" stroke-width="7" opacity=".6"/></g>
  <defs><radialGradient id="vM"><stop offset="0" stop-color="${MILK2}"/><stop offset="1" stop-color="${FOAM}"/></radialGradient></defs>
  <g class="spin"><path d="M108 58a46 46 0 0 1 46 46" fill="none" stroke="var(--crema)" stroke-width="3.2" stroke-linecap="round"/><path d="M150 98l4 10 6-9z" fill="var(--crema)"/><path d="M108 150a46 46 0 0 1 -46 -46" fill="none" stroke="var(--crema)" stroke-width="3.2" stroke-linecap="round"/><path d="M66 110l-4 -10 -6 9z" fill="var(--crema)"/></g>
  <g class="spin slow">${[0,1,2,3,4,5,6,7,8,9].map(i=>{const a=i*0.9,r=50-i*3.6;return `<circle class="shrink" style="animation-delay:${-i*0.3}s" cx="${108+Math.cos(a)*r}" cy="${104+Math.sin(a)*r}" r="${4.2-i*0.3}" fill="#fff" stroke="var(--line)" stroke-width=".8"/>`}).join("")}</g>
  <path d="M168 94L184 104L168 114" fill="#8d939b" stroke="#5f656d" stroke-width="2" stroke-linejoin="round"/><path d="M190 104H140" stroke="#4a5058" stroke-width="5" stroke-linecap="round"/><circle cx="140" cy="104" r="5" fill="#2a2e33"/></g>
  ${jug(250,96,64,70,108,"",{flip:1})}${wand(303,124,[342,60])}
  <g class="ob"><path d="M332 108H344M332 124H344" stroke="var(--ink)" stroke-width="1.2"/><path d="M340 108V124" stroke="var(--crema)" stroke-width="2"/></g>
  ${lbl(346,4,[L("deepA"),L("deepB")],[340,116],{right:true})}
  ${lbl(10,4,[L("vortA"),L("vortB")],[104,72])}
  ${phases(1,L)}`),
 // 6. temperature dial: air until ~37 °C, stop at 55–65 °C, damage above 70 °C
 L=>{const cx=104,cy=128,r=78,ang=t=>Math.PI*(1-t/80),pt=(t,R)=>[cx+Math.cos(ang(t))*R,cy-Math.sin(ang(t))*R];
  const arc=(a,b,col)=>{const[p,q]=[pt(a,r-9),pt(b,r-9)];return `<path d="M${p[0]} ${p[1]}A${r-9} ${r-9} 0 0 1 ${q[0]} ${q[1]}" stroke="${col}" stroke-width="13" fill="none"/>`};
  return svg(`${panel()}<g class="ob"><path d="M${cx-r} ${cy}A${r} ${r} 0 0 1 ${cx+r} ${cy}Z" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/>
  ${arc(0,37,"#9cc5ea")}${arc(37,55,"#e9dccb")}${arc(55,65,"#5fae6e")}${arc(65,70,"#e8a35a")}${arc(70,80,"#d9573a")}
  ${[0,20,40,60,80].map(t=>{const[a,b]=[pt(t,r-18),pt(t,r-24)],q=pt(t,r-34);return `<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" stroke="var(--ink)" stroke-width="1.4"/>`+(t===0||t===80?`<text x="${t?cx+r-8:cx-r+8}" y="${cy+14}" text-anchor="middle" class="tick">${t}</text>`:`<text x="${pt(t,r+12)[0]}" y="${pt(t,r+12)[1]+3}" text-anchor="middle" class="tick">${t}</text>`)}).join("")}
  <text x="${cx}" y="${cy-14}" text-anchor="middle" class="tick">°C</text></g>
  <g class="needle" style="transform-origin:${cx}px ${cy}px"><path d="M${cx} ${cy}L${cx-r+20} ${cy}" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/></g><circle cx="${cx}" cy="${cy}" r="7" fill="var(--ink)"/>
  <g class="stopPill"><rect x="${cx-30}" y="${cy+12}" width="60" height="22" rx="11" fill="#3d7a4c"/><text x="${cx}" y="${cy+27}" text-anchor="middle" class="stopT">STOP</text></g>
  ${lbl(346,10,[L("airZoneA"),L("airZoneB")],null,{right:true})}
  ${lbl(346,54,[L("sweetA"),L("sweetB")],null,{right:true,tone:"good"})}
  ${lbl(346,98,[L("hotA"),L("hotB")],null,{right:true,tone:"bad"})}
  ${lbl(346,142,[L("handA"),L("handB")],null,{right:true})}
  ${phases(2,L)}`)},
 // 7. wipe with a damp cloth, then purge
 L=>svg(`${panel()}${machine()}${wand(206,124)}
  <g class="wipe"><g transform="translate(262 56) rotate(40)"><rect x="-18" y="-12" width="36" height="24" rx="6" fill="#8fb8d9" stroke="#3f6f99" stroke-width="1.5"/><path d="M-12 -5h24M-12 1h24M-12 7h24" stroke="#fff" stroke-width="1.3" opacity=".75"/></g></g>
  <circle class="puff late" cx="206" cy="142" r="11" fill="#fff" opacity=".9"/><circle class="puff p2 late" cx="196" cy="150" r="9" fill="#fff" opacity=".9"/>
  ${lbl(10,40,[L("clothA"),L("clothB")],[252,66])}
  ${lbl(10,104,[L("thenA"),L("thenB")],[198,140])}
  ${lbl(10,158,[L("whyA")],null,{tone:"bad",bold:false})}`),
 // 8. tap, swirl, glossy
 L=>svg(`${panel()}
  <g class="tap"><g class="swirl">${jug(96,60,98,118,82,`<rect x="86" y="78" width="120" height="8" fill="${FOAM}"/><path class="shine" d="M110 88q34 -7 68 0" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round"/>`)}</g></g>
  <g class="impact" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round"><path d="M90 182l-8 -4M206 182l8 -4M86 176l-9 -1M210 176l9 -1"/></g>
  <g class="swirlArrow"><path d="M86 150a62 20 0 0 0 124 0" fill="none" stroke="var(--crema)" stroke-width="2.6" stroke-linecap="round"/><path d="M204 154l8 -6 -1 10z" fill="var(--crema)"/></g>
  ${lbl(10,10,[L("tapA"),L("tapB")],[98,64])}
  ${lbl(346,40,[L("goodA"),L("goodB")],null,{right:true,tone:"good"})}
  ${lbl(346,96,[L("badA"),L("badB")],null,{right:true,tone:"bad"})}
  ${lbl(346,148,[L("soonA"),L("soonB")],null,{right:true})}`),
 // 9. pour: high and thin, then low and faster, heart
 L=>svg(`${panel()}<defs><clipPath id="cupC"><path d="M72 112h120l-8 52a16 16 0 0 1-16 14H96a16 16 0 0 1-16-14z"/></clipPath></defs>
  <g class="ob"><path d="M192 124c22 0 22 30 -4 30" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M72 112h120l-8 52a16 16 0 0 1-16 14H96a16 16 0 0 1-16-14z" fill="#4a2c1b" stroke="var(--ink)" stroke-width="2"/>
  <g clip-path="url(#cupC)"><rect class="cupFill" x="70" y="112" width="124" height="70" fill="#b07a48"/></g>
  <ellipse cx="132" cy="112" rx="60" ry="10" fill="${CREMA}" stroke="var(--ink)" stroke-width="2"/><ellipse class="whiteDot" cx="132" cy="112" rx="26" ry="5" fill="${FOAM}"/>
  <path class="heart" d="M132 119C123 114 110 111 114 106C117 103 125 104 132 109C139 104 147 103 150 106C154 111 141 114 132 119Z" fill="${FOAM}"/><path class="heart" d="M132 109L132 119" stroke="${CREMA}" stroke-width="1.2"/></g>
  <g class="jugMove">${jug(150,8,70,64,26,"",{})}</g>
  <rect class="streamHi" x="139" y="6" width="3" height="104" rx="1.5" fill="${MILK}"/><rect class="streamLo" x="138" y="78" width="6" height="32" rx="3" fill="${MILK}"/>
  ${lbl(10,12,[L("hiA"),L("hiB")],[146,96],{cls:"phaseA"})}
  ${lbl(10,58,[L("loA"),L("loB")],[134,108],{cls:"phaseB"})}
  ${lbl(346,140,[L("heartA"),L("heartB")],[150,113],{right:true})}`)
];
DRAW.foam=(L,rows,Lo)=>svg(`${panel()}${rows.map((f,i)=>{const x=24+i*100,fh=[8,16,30][i];return `<g class="ob"><path d="M${x} 50h76l-6 92a12 12 0 0 1-12 10H${x+18}a12 12 0 0 1-12-10z" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/></g>
 <defs><clipPath id="fc${i}"><path d="M${x} 50h76l-6 92a12 12 0 0 1-12 10H${x+18}a12 12 0 0 1-12-10z"/></clipPath></defs>
 <g clip-path="url(#fc${i})"><rect x="${x-2}" y="120" width="80" height="34" fill="${ESP}"/><rect x="${x-2}" y="${52+fh}" width="80" height="${68-fh}" fill="#c99a6b"/><rect class="foamUp" style="animation-delay:${i*0.25}s" x="${x-2}" y="52" width="80" height="${fh}" fill="${FOAM}"/></g>
 <path d="M${x+80} 52v${fh}" stroke="var(--crema)" stroke-width="2"/><text x="${x+38}" y="168" text-anchor="middle" class="cname">${Lo(f[0])}</text><text x="${x+38}" y="182" text-anchor="middle" class="tick">+${f[1]}</text>`}).join("")}
 <text x="160" y="30" text-anchor="middle" class="cap">${L("foamCap")}</text>`);
const LBL={stretch:B("Stretch","Rekken"),texture:B("Texture","Textuur"),stop:B("Stop","Stop"),
 fillA:B("Fill line","Vullijn"),fillB:B("bottom of|the spout","onderkant|van de tuit"),coldA:B("3–5 °C","3–5 °C"),coldB:B("fridge-cold","koelkastkoud"),
 purgeA:B("Water out first","Eerst water eruit"),purgeB:B("open fully, 1–2 s","helemaal open, 1–2 s"),trayA:B("Aim into the drip tray","Richt in de lekbak"),knobA:B("Full open","Helemaal open"),
 depthA:B("Tip 0.5–1 cm","Tip 0,5–1 cm"),depthB:B("under the surface","onder het oppervlak"),above:B("Seen from above","Van boven gezien"),threeA:B("Seen from above","Van boven gezien"),threeB:B("wand in the spout","pijp in de tuit"),
 tssA:B("“tss-tss”","“tss-tss”"),tssB:B("like tearing paper","als scheurend papier"),lowerA:B("Lower the jug","Laat de kan zakken"),lowerB:B("as the milk grows","als de melk groeit"),growA:B("Milk grows","Melk groeit"),growB:B("+10–60 %","+10–60 %"),airA:B("Air only until","Alleen lucht tot"),airB:B("about 37 °C","ongeveer 37 °C"),
 deepA:B("Tip 1–2 cm deeper","Tip 1–2 cm dieper"),deepB:B("air sound stops","luchtgeluid stopt"),vortA:B("Whirlpool","Draaikolk"),vortB:B("big bubbles shrink","grote bellen krimpen"),
 airZoneA:B("0–37 °C","0–37 °C"),airZoneB:B("add air only here","alleen hier lucht"),sweetA:B("55–65 °C: stop","55–65 °C: stop"),sweetB:B("sweetest ~60 °C","zoetst ~60 °C"),hotA:B("70 °C and up","70 °C en hoger"),hotB:B("foam collapses","schuim zakt in"),handA:B("Hand test","Handtest"),handB:B("too hot after 2–3 s","te heet na 2–3 s"),
 clothA:B("Damp cloth","Vochtige doek"),clothB:B("only for the wand","alleen voor de pijp"),thenA:B("Then purge","Dan doorblazen"),thenB:B("1–2 seconds","1–2 seconden"),whyA:B("Dried milk blocks the holes","Opgedroogde melk verstopt gaatjes"),
 tapA:B("Tap 1–2 times","Tik 1–2 keer"),tapB:B("then swirl","dan walsen"),goodA:B("✓ Glossy","✓ Glanzend"),goodB:B("like wet paint","als natte verf"),badA:B("✕ Dull, stiff","✕ Dof, stijf"),badB:B("big bubbles","grote bellen"),soonA:B("Pour within","Schenk binnen"),soonB:B("30 seconds","30 seconden"),
 hiA:B("1. High and thin","1. Hoog en dun"),hiB:B("mix under the crema","meng onder de crema"),loA:B("2. Low and faster","2. Laag en sneller"),loB:B("foam stays on top","schuim blijft boven"),heartA:B("Heart","Hartje"),heartB:B("pull through","doortrekken"),
 foamCap:B("How much foam each drink gets","Hoeveel schuim elk drankje krijgt")};

const STEPS=[
 [B("Start with cold milk","Begin met koude melk"),[B("Use milk straight from the fridge (3–5 °C) and a cold, clean jug. Cold milk gives you more time to add air and spin it before it gets too hot.","Gebruik melk direct uit de koelkast (3–5 °C) en een koude, schone kan. Koude melk geeft je meer tijd om lucht toe te voegen en te laten draaien voordat hij te heet wordt."),B("Fill to just below the bottom of the spout, about a third of the jug. The milk grows while steaming, so it needs room.","Vul tot net onder de onderkant van de tuit, ongeveer een derde van de kan. De melk groeit tijdens het opschuimen, dus hij heeft ruimte nodig."),B("Pour only what the drink needs. Milk that is steamed twice never foams well again.","Schenk alleen wat het drankje nodig heeft. Melk die twee keer is opgeschuimd, schuimt nooit meer goed.")],B("Use a 350 ml jug for one drink and a 600 ml jug for two.","Gebruik een kan van 350 ml voor één drankje en 600 ml voor twee.")],
 [B("Purge the wand","Blaas de stoompijp door"),[B("Point the wand into the drip tray or a cloth and open it fully for 1–2 seconds. This blows out water that has condensed in the wand.","Richt de stoompijp naar de lekbak of een doek en draai hem 1–2 seconden helemaal open. Zo blaas je het condenswater uit de pijp."),B("Water left in the wand makes the milk thinner and cooler.","Water dat in de pijp achterblijft, maakt de melk dunner en kouder.")],B("Hold the cloth over the tip: the steam is hot.","Houd de doek over de tip: de stoom is heet.")],
 [B("Put the tip in the right place","Zet de tip op de goede plek"),[B("Rest the steam wand in the spout of the jug. The spout is your guide: it holds the wand at the same angle every time and keeps the tip a little off-centre.","Leg de stoompijp in de tuit van de kan. De tuit is je gids: hij houdt de stoompijp elke keer in dezelfde hoek en de tip iets uit het midden."),B("Lower the jug until the tip is just under the surface, about 0.5–1 cm deep, with the wand still touching the spout. Off-centre is what makes the milk spin later.","Laat de kan zakken tot de tip net onder het oppervlak zit, ongeveer 0,5–1 cm diep, terwijl de stoompijp de tuit blijft raken. Uit het midden zorgt ervoor dat de melk straks gaat draaien."),B("Only open the steam once the tip is in the milk, or it sprays.","Draai de stoom pas open als de tip in de melk zit, anders spat het.")],B("Open the steam fully: half power gives big, loose bubbles.","Draai de stoom helemaal open: half vermogen geeft grote, losse bellen.")],
 [B("Stretch: add the air","Rekken: lucht toevoegen"),[B("Keep the tip at the surface so it draws in air. You should hear a soft, steady \"tss-tss\", like tearing paper.","Houd de tip aan het oppervlak zodat hij lucht aanzuigt. Je hoort een zacht, regelmatig \"tss-tss\", als scheurend papier."),B("As the milk grows, lower the jug slowly, with the wand still resting in the spout, so the tip stays just at the surface.","Als de melk groeit, laat je de kan langzaam zakken, met de stoompijp nog in de tuit, zodat de tip net aan het oppervlak blijft."),B("Add air only while the milk is still cool, up to about body temperature (around 37 °C, when the jug just feels warm). After that, bubbles stay big.","Voeg alleen lucht toe zolang de melk nog koel is, tot ongeveer lichaamstemperatuur (rond 37 °C, als de kan net warm aanvoelt). Daarna blijven de bellen groot."),B("How long: about 2–3 seconds for a flat white, 3–5 for a latte, 5–8 for a cappuccino.","Hoe lang: ongeveer 2–3 seconden voor een flat white, 3–5 voor een latte, 5–8 voor een cappuccino.")],B("Loud screeching: tip too deep. Big spitting bubbles: tip too high.","Hard gepiep: tip te diep. Grote spattende bellen: tip te hoog.")],
 [B("Texture: make the whirlpool","Textureren: maak de draaikolk"),[B("Raise the jug a little so the tip sinks about 1–2 cm, keeping the wand in the spout. The air sound stops and the milk starts to spin.","Til de kan iets op zodat de tip ongeveer 1–2 cm zakt, met de stoompijp in de tuit. Het luchtgeluid stopt en de melk gaat draaien."),B("The whirlpool pulls big bubbles under and breaks them into tiny ones: that is microfoam.","De draaikolk trekt grote bellen naar beneden en breekt ze in kleine: dat is microschuim."),B("Keep the spin going until the milk is hot. If it stops spinning, tilt the jug a little more while the wand stays in the spout.","Houd het draaien vol tot de melk heet is. Stopt het draaien, kantel de kan dan iets meer terwijl de stoompijp in de tuit blijft.")],B("No sound and no spin? The tip is too deep, or the wand has slipped out of the spout to the middle.","Geen geluid en geen draaiing? De tip zit te diep, of de stoompijp is uit de tuit naar het midden geschoven.")],
 [B("Stop at the right temperature","Stop op de goede temperatuur"),[B("Stop at 55–65 °C. Milk tastes sweetest around 60 °C.","Stop bij 55–65 °C. Melk smaakt het zoetst rond 60 °C."),B("No thermometer? Keep a hand flat on the jug: when it is too hot to hold for more than 2–3 seconds, stop.","Geen thermometer? Leg een hand plat tegen de kan: als hij te heet is om langer dan 2–3 seconden vast te houden, stop dan."),B("Above about 70 °C the milk proteins break down: the foam collapses and the milk tastes cooked.","Boven ongeveer 70 °C gaan de melkeiwitten kapot: het schuim zakt in en de melk smaakt gekookt."),B("Close the steam before you take the tip out, or the milk sprays.","Draai de stoom dicht voordat je de tip eruit haalt, anders spat de melk.")],B("Plant milks: stop a bit cooler, around 55–60 °C.","Plantaardige melk: stop iets koeler, rond 55–60 °C.")],
 [B("Wipe and purge straight away","Meteen afvegen en doorblazen"),[B("Wipe the wand with a damp cloth kept only for the wand, then purge 1–2 seconds.","Veeg de stoompijp af met een vochtige doek die alleen voor de pijp is, en blaas hem dan 1–2 seconden door."),B("Milk dries in seconds and blocks the holes; it also spoils and taints the next jug.","Melk droogt binnen seconden op en verstopt de gaatjes; hij bederft ook en geeft een bijsmaak aan de volgende kan.")],B("Do it every time, even in a rush.","Doe het elke keer, ook als het druk is.")],
 [B("Tap and swirl","Tikken en walsen"),[B("Tap the jug firmly on the counter once or twice to pop any big bubbles left on top.","Tik de kan één of twee keer stevig op het aanrecht om grote bellen bovenop te laten knappen."),B("Swirl the milk in the jug until it looks glossy, like wet paint. Swirling keeps foam and milk mixed.","Wals de melk rond in de kan tot hij glanst als natte verf. Walsen houdt schuim en melk gemengd."),B("Pour within about 30 seconds; foam that waits separates from the milk.","Schenk binnen ongeveer 30 seconden; schuim dat wacht, scheidt van de melk.")],B("Dull and stiff on top? Too much air. Thin and watery? Not enough.","Dof en stijf bovenop? Te veel lucht. Dun en waterig? Te weinig.")],
 [B("Pour","Schenken"),[B("Start a little higher with a thin stream so the milk goes under the crema and mixes.","Begin iets hoger met een dunne straal zodat de melk onder de crema gaat en mengt."),B("When the cup is about half full, bring the jug close to the surface and pour a bit faster: the white foam now stays on top.","Als het kopje ongeveer half vol is, breng je de kan dicht bij het oppervlak en schenk je iets sneller: het witte schuim blijft nu bovenop."),B("For a heart: let a white circle form, then lift slightly and pull through the middle.","Voor een hartje: laat een witte cirkel ontstaan, til dan iets op en trek door het midden.")],B("Practise pouring with water and a drop of dish soap to save milk.","Oefen schenken met water en een druppel afwasmiddel om melk te besparen.")]
];
const CHECK=[B("Fills cold milk to the bottom of the spout, right amount for the drink","Vult koude melk tot onderkant tuit, juiste hoeveelheid voor het drankje"),
 B("Purges the wand before and after, every time","Blaast de stoompijp voor en na door, elke keer"),
 B("Rests the wand in the spout; tip just under the surface","Legt de stoompijp in de tuit; tip net onder het oppervlak"),
 B("Steady soft “tss” only at the start, no screeching","Rustig zacht “tss” alleen aan het begin, geen gepiep"),
 B("Milk spins in a whirlpool; no big bubbles","Melk draait in een draaikolk; geen grote bellen"),
 B("Stops at 55–65 °C (check with a thermometer)","Stopt bij 55–65 °C (controleer met een thermometer)"),
 B("Right foam for the drink: flat white, latte, cappuccino","Juist schuim voor het drankje: flat white, latte, cappuccino"),
 B("Tap and swirl: glossy like wet paint","Tikken en walsen: glanzend als natte verf"),
 B("Pours within 30 seconds, foam on top, clean cup","Schenkt binnen 30 seconden, schuim bovenop, schone kop"),
 B("Plant milk: less air, stops cooler, no splitting","Plantaardige melk: minder lucht, koeler stoppen, geen schifting")];
const FOAMTAB=[[B("Flat white","Flat white"),"10–15 %",B("thin, silky layer; 2–3 s of air","dun, zijdezacht laagje; 2–3 s lucht"),15],[B("Latte","Latte"),"20–30 %",B("about 1 cm of foam; 3–5 s of air","ongeveer 1 cm schuim; 3–5 s lucht"),30],[B("Cappuccino","Cappuccino"),"40–60 %",B("1.5–2 cm of thick foam; 5–8 s of air","1,5–2 cm dik schuim; 5–8 s lucht"),55]];
const WHY=[B("Proteins trap the air. They wrap around each bubble and link up, which is what makes foam last. More protein means firmer foam.","Eiwitten vangen de lucht. Ze leggen zich rond elke bel en haken aan elkaar, en daardoor blijft schuim staan. Meer eiwit betekent steviger schuim."),
 B("Fat gives the creamy taste but weakens foam: it competes with the proteins at the bubble. Whole milk makes the silkiest, sweetest drinks; skimmed milk makes stiffer, drier foam.","Vet geeft de romige smaak maar verzwakt schuim: het concurreert met de eiwitten bij de bel. Volle melk geeft de zachtste, zoetste drankjes; magere melk geeft stijver, droger schuim."),
 B("Heat helps up to a point: warm milk feels sweeter. Too hot (above about 70 °C) damages the proteins and the foam collapses.","Warmte helpt tot op zekere hoogte: warme melk voelt zoeter. Te heet (boven ongeveer 70 °C) beschadigt de eiwitten en het schuim zakt in."),
 B("Air goes in early, spin comes later. Bubbles made while the milk is cold become small and stable; air added late stays as big bubbles.","Lucht gaat er vroeg in, draaien komt later. Bellen die ontstaan terwijl de melk koud is, worden klein en stabiel; lucht die laat wordt toegevoegd, blijft als grote bellen.")];
const PLANT=[B("Use \"barista\" versions: they have extra fat, protein and stabilisers so they foam well and don't split in coffee.","Gebruik \"barista\"-versies: die hebben extra vet, eiwit en stabilisatoren, zodat ze goed schuimen en niet schiften in koffie."),
 B("Shake the carton and keep it cold.","Schud het pak en houd het koud."),
 B("Add less air than with cow's milk: plant proteins hold less. A short stretch, then a long spin.","Voeg minder lucht toe dan bij koemelk: plantaardige eiwitten houden minder vast. Kort rekken, dan lang laten draaien."),
 B("Stop cooler, around 55–60 °C. Heat and the acidity of coffee make plant milk split.","Stop koeler, rond 55–60 °C. Hitte en de zuren in koffie laten plantaardige melk schiften."),
 B("Oat is the most forgiving. Soy foams firmly but can split in very fresh or acidic coffee. Almond and coconut make thin foam.","Haver is het makkelijkst. Soja schuimt stevig maar kan schiften in heel verse of zure koffie. Amandel en kokos geven dun schuim."),
 B("Pour straight away: plant foam breaks down faster.","Schenk meteen: plantaardig schuim zakt sneller in.")];
const FIX=[[B("Big bubbles on top","Grote bellen bovenop"),B("Too much air, or air added too late. Shorter stretch, start the whirlpool earlier, tap and swirl.","Te veel lucht, of te laat lucht toegevoegd. Korter rekken, eerder de draaikolk starten, tikken en walsen.")],
 [B("No foam, watery milk","Geen schuim, waterige melk"),B("Tip went in too deep at the start: you never heard \"tss\". Start right at the surface.","Tip ging aan het begin te diep: je hoorde nooit \"tss\". Begin precies aan het oppervlak.")],
 [B("Loud screeching","Hard gepiep"),B("Tip too deep or touching the jug wall. Raise it a little and keep it off the wall.","Tip te diep of tegen de wand. Iets omhoog en weg van de wand.")],
 [B("Milk sprays everywhere","Melk spat overal"),B("Tip too high, or steam opened before the tip was in. Lower the tip slightly.","Tip te hoog, of stoom open voordat de tip erin zat. Tip iets lager.")],
 [B("Milk doesn't spin","Melk draait niet"),B("The wand slipped to the centre. Put it back in the spout and tilt the jug a little.","De stoompijp is naar het midden geschoven. Leg hem terug in de tuit en kantel de kan iets.")],
 [B("Foam and milk separate","Schuim en melk scheiden"),B("The jug waited too long. Swirl until glossy and pour within 30 seconds.","De kan stond te lang. Walsen tot hij glanst en binnen 30 seconden schenken.")],
 [B("Tastes cooked or flat","Smaakt gekookt of vlak"),B("Overheated. Stop at 55–65 °C; use the hand test.","Te heet geworden. Stop bij 55–65 °C; gebruik de handtest.")],
 [B("Plant milk splits in the cup","Plantaardige melk schift in de kop"),B("Too hot or a very acidic coffee. Stop cooler, use a barista version, pour gently.","Te heet of heel zure koffie. Koeler stoppen, barista-versie gebruiken, rustig schenken.")]];
const SRC=[["Barista Hustle: milk science","https://baristahustle.com/lesson/ms-3-03-anti-foams"],["Difford's Guide: the science of milk","https://www.diffordsguide.com/g/1113/coffee/science-of-milk"],["La Marzocco Home: how to steam milk like a pro barista","https://au.lamarzoccohome.com/blog/how-to-steam-milk-like-a-pro-barista/"],["Clive Coffee: glossy microfoam","https://clivecoffee.com/blogs/learn/how-to-steam-glossy-microfoam-instead-of-foamy-milk"],["Clive Coffee: steaming oat milk","https://clivecoffee.com/blogs/learn/how-to-steam-and-foam-oat-milk-on-a-home-espresso-machine-clive"]];
let step=0,tab="steps";
function fitLabels(root){root.querySelectorAll(".mgArt g.lbl").forEach(g=>{const r=g.querySelector("rect"),ts=[...g.querySelectorAll("text")];if(!r||!ts.length)return;
 let w=0;ts.forEach(t=>{try{w=Math.max(w,t.getComputedTextLength())}catch(e){}});if(!w)return;w=Math.ceil(w)+16;
 const right=g.dataset.right;let x=right!==""&&right!=null?+right-w:+r.getAttribute("x");r.setAttribute("x",x);r.setAttribute("width",w);ts.forEach(t=>t.setAttribute("x",x+8));
 const wrap=g.parentNode,to=(wrap.dataset.to||"").split(",").map(Number),lead=wrap.querySelector("path");
 if(lead&&to.length===2){const y=+r.getAttribute("y"),h=+r.getAttribute("height"),cx=Math.max(x,Math.min(x+w,to[0])),cy=Math.max(y,Math.min(y+h,to[1]));lead.setAttribute("d",`M${cx} ${cy}L${to[0]} ${to[1]}`)}})}
window.mgFitLabels=fitLabels;
window.openMilkGuide=function(open,lang){
 const PTD=lang==="pt"&&typeof PT!=="undefined"?PT:null,pt=en=>{if(!PTD)return en;if(PTD[en])return PTD[en];return String(en).includes("|")?String(en).split("|").map(p=>PTD[p]||p).join("|"):en};
const L=x=>x&&typeof x==="object"?(lang==="pt"?pt(x.en):x[lang]||x.en):x,T=(en,nl)=>lang==="nl"?nl:lang==="pt"?pt(en):en;
 const LL=k=>LBL[k]?L(LBL[k]):k;const art=i=>`<div class="mgArt mgA">${DRAW[i](LL)}</div>`;
 const tabs=[["steps",T("Step by step","Stap voor stap")],["foam",T("How much foam","Hoeveel schuim")],["why",T("Why it works","Waarom het werkt")],["plant",T("Plant milks","Plantaardige melk")],["fix",T("Problems","Problemen")],["check",T("Sign-off check","Aftekencheck")]];
 const body=()=>{let h="";
  if(tab==="steps"){const [t,pts,tip]=STEPS[step];
   try{document.dispatchEvent(new CustomEvent("mgstep",{detail:{step,total:STEPS.length}}))}catch(e){}
   h=`${art(step)}<div class="mgDots">${STEPS.map((_,i)=>`<button type="button" data-st="${i}" aria-current="${i===step}" aria-label="${T("Step","Stap")} ${i+1}">${i+1}</button>`).join("")}</div>
   <div class="mgStep"><h3>${step+1}. ${L(t)}</h3><ul>${pts.map(p=>`<li>${L(p)}</li>`).join("")}</ul></div><div class="mgTip"><b>${T("Tip","Tip")}:</b> ${L(tip)}</div>
   <div class="mgNav"><button type="button" class="ghost" data-mv="-1"${step?"":" disabled"}>← ${T("Back","Terug")}</button><button type="button" class="${step<STEPS.length-1?"":"ghost"}" data-mv="1"${step<STEPS.length-1?"":" disabled"}>${T("Next","Volgende")} →</button></div>`}
  if(tab==="foam")h=`<div class="mgArt mgA">${DRAW.foam(LL,FOAMTAB,L)}</div>
   <p class="hint" style="margin:0">${T("How much the milk grows while steaming, per drink.","Hoeveel de melk groeit tijdens het opschuimen, per drankje.")}</p><table class="mgTable"><tr><th>${T("Drink","Drankje")}</th><th>${T("Growth","Groei")}</th><th>${T("What you aim for","Waar je naar streeft")}</th></tr>${FOAMTAB.map(f=>`<tr><td><b>${L(f[0])}</b></td><td>+${f[1]}</td><td>${L(f[2])}</td></tr>`).join("")}</table>`;
  if(tab==="why")h=`<ul>${WHY.map(p=>`<li>${L(p)}</li>`).join("")}</ul>`;
  if(tab==="plant")h=`<ul>${PLANT.map(p=>`<li>${L(p)}</li>`).join("")}</ul>`;
  if(tab==="check")h=`<p class="hint" style="margin:0">${T("What a trainer should see before signing off milk steaming. Check yourself first, then show your trainer three drinks in a row.","Wat een trainer moet zien voordat melk opschuimen wordt afgetekend. Controleer jezelf eerst en laat dan drie drankjes achter elkaar zien.")}</p><div style="display:flex;flex-direction:column;gap:2px">${CHECK.map((c,i)=>`<label style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-bottom:1px solid var(--line);cursor:pointer"><input type="checkbox" style="width:22px;height:22px;min-height:0;flex:none;margin-top:1px">${L(c)}</label>`).join("")}</div>`;
  if(tab==="fix")h=`<table class="mgTable"><tr><th>${T("Problem","Probleem")}</th><th>${T("Cause and fix","Oorzaak en oplossing")}</th></tr>${FIX.map(f=>`<tr><td><b>${L(f[0])}</b></td><td>${L(f[1])}</td></tr>`).join("")}</table>`;
  return `<div class="kchips">${tabs.map(([k,l])=>`<button type="button" class="kchip" data-mtab="${k}" aria-pressed="${tab===k}">${l}</button>`).join("")}</div><div class="mg">${h}</div>
  <p class="mgSrc"><span>${T("Sources","Bronnen")}:</span>${SRC.map(s=>`<a href="${s[1]}" target="_blank" rel="noopener">${s[0]}</a>`).join("")}</p>`};
 const host=open(`<h2 id="sheetTitle">${T("Steaming milk","Melk opschuimen")}</h2><p class="hint">${T("Silky microfoam, step by step.","Zijdezacht microschuim, stap voor stap.")}</p><div id="mgHost"></div>`);
 const paint=()=>{host.innerHTML=body();fitLabels(host)};
 host.onclick=e=>{const b=e.target.closest("[data-st],[data-mv],[data-mtab]");if(!b)return;e.stopPropagation();const d=b.dataset;
  if(d.st!=null)step=+d.st;if(d.mv!=null)step=Math.max(0,Math.min(STEPS.length-1,step+ +d.mv));if(d.mtab){tab=d.mtab;if(tab==="steps")step=step||0}paint()};
 paint()};
})();
