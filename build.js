/* =====================================================================
   aschcapital.com - Build
   ---------------------------------------------------------------------
   One screen to the right of Attention: a guided, branching interview
   that takes a beginner from zero to a language model they train
   themselves, ending on a personalized set of real frw commands.

   Self-contained. Everything it draws lives under a single .frwb root
   and every class is fb- prefixed, so it shares the page without
   touching any other screen. Contact points with the rest of the site
   are the same two the other late screens use: LABS.register for the
   route, SCREENS for the chip. It never reads DATA.
   ===================================================================== */
(function () {
if (!window.LABS || typeof LABS.register !== "function") return;
const app = document.getElementById("app");

/* ============================================================
   Build Your Own LLM — adaptive interview engine
   Data-driven node graph + profile reducer + renderer.
   All build commands are the real frw commands (see frw/README.md).
   ============================================================ */


/* ---------- visuals: each returns an SVG string, themed via CSS classes ---------- */
const VIS = {
  hero(){return `<svg class="fb-viz" viewBox="0 0 320 200" aria-hidden="true">
    ${Array.from({length:9*5}).map((_,i)=>{const c=i%9,r=(i/9)|0;
      const on=[10,11,12,13,19,22,28,31,37,38,39,40].includes(i);
      return `<rect x="${18+c*32}" y="${18+r*32}" width="24" height="24" rx="4"
        class="${on?'v-slate':'v-surf2'}" opacity="${on?1:.5+((i*37)%50)/120}"/>`;}).join("")}
    <path d="M300 24v152" class="fill-none s-rule" stroke-dasharray="2 5"/>
    <text x="160" y="192" text-anchor="middle" font-size="10" letter-spacing="1.5" class="v-muted">RANDOM WEIGHTS &#8594; STRUCTURE</text>
  </svg>`;},

  goal(){return `<svg class="fb-viz" viewBox="0 0 320 210" aria-hidden="true">
    <rect x="20" y="24" width="120" height="52" rx="8" class="v-surf2"/>
    <text x="34" y="46" font-size="10" class="v-muted">YOUR TEXT</text>
    <text x="34" y="64" font-size="12" class="v-ink">notes, code, a voice</text>
    <path d="M148 50h44" class="fill-none s-slate" stroke-width="2" marker-end="url(#a)"/>
    <rect x="196" y="20" width="104" height="60" rx="10" class="fill-none s-slate" stroke-width="2"/>
    <text x="248" y="46" text-anchor="middle" font-size="10" class="v-slate">MODEL</text>
    <text x="248" y="64" text-anchor="middle" font-size="11" class="v-ink">your weights</text>
    <path d="M248 84v26" class="fill-none s-slate" stroke-width="2" marker-end="url(#a)"/>
    <rect x="20" y="118" width="280" height="72" rx="10" class="v-surf2"/>
    <text x="34" y="140" font-size="10" class="v-muted">IT WRITES BACK</text>
    <text x="34" y="162" font-size="12" class="v-ink">text in the shape of what</text>
    <text x="34" y="180" font-size="12" class="v-ink">you trained it on</text>
    <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0 0l6 4-6 4z" class="v-slate"/></marker></defs>
  </svg>`;},

  nexttoken(){const b=[["mat",.41],["floor",.18],["couch",.11],["roof",.06]];
    return `<svg class="fb-viz" viewBox="0 0 320 220" aria-hidden="true">
    <text x="20" y="34" font-size="13" class="v-ink">the cat sat on the </text>
    <rect x="212" y="20" width="20" height="20" rx="3" class="fill-none s-slate" stroke-dasharray="3 3"/>
    <text x="20" y="60" font-size="9" letter-spacing="1.4" class="v-muted">NEXT TOKEN &#8212; PROBABILITIES</text>
    ${b.map((d,i)=>{const y=76+i*34, w=d[1]*220;
      return `<text x="20" y="${y+13}" font-size="12" class="${i===0?'v-ink':'v-ink2'}">${d[0]}</text>
      <rect x="78" y="${y}" width="200" height="18" rx="4" class="v-surf2"/>
      <rect x="78" y="${y}" width="${w}" height="18" rx="4" class="${i===0?'v-slate':'v-muted'}" opacity="${i===0?1:.55}"/>
      <text x="${82+w+6}" y="${y+13}" font-size="10" class="v-muted">${d[1].toFixed(2)}</text>`;}).join("")}
    <text x="20" y="214" font-size="10" class="v-slate">pick one &#8594; append &#8594; repeat</text>
  </svg>`;},

  tokens(){const t=[["un","#2118"],["happ","#0."],["i","#0i"],["ness","#4kd"]];
    let x=22; const chips=t.map((d,i)=>{const w=18+d[0].length*10; const el=`
      <rect x="${x}" y="60" width="${w}" height="30" rx="6" class="fill-none s-slate" stroke-width="1.5"/>
      <text x="${x+w/2}" y="80" text-anchor="middle" font-size="13" class="v-ink">${d[0]}</text>
      <text x="${x+w/2}" y="106" text-anchor="middle" font-size="9" class="v-muted">${1420+i*97}</text>`;
      x+=w+8; return el;}).join("");
    return `<svg class="fb-viz" viewBox="0 0 320 200" aria-hidden="true">
    <text x="20" y="34" font-size="9" letter-spacing="1.4" class="v-muted">ONE WORD</text>
    <text x="20" y="34" font-size="15" class="v-ink" dx="80">unhappiness</text>
    ${chips}
    <text x="20" y="130" font-size="9" letter-spacing="1.4" class="v-muted">&#8594; TOKEN IDS THE MODEL ACTUALLY SEES</text>
    <text x="20" y="164" font-size="11" class="v-ink2">rare words split into common pieces.</text>
    <text x="20" y="182" font-size="11" class="v-ink2">the model only ever sees the numbers.</text>
  </svg>`;},

  embeddings(){const v=[.62,-.21,.44,-.88,.13,.57];
    return `<svg class="fb-viz" viewBox="0 0 320 210" aria-hidden="true">
    <rect x="20" y="26" width="60" height="30" rx="6" class="fill-none s-slate" stroke-width="1.5"/>
    <text x="50" y="46" text-anchor="middle" font-size="13" class="v-ink">mat</text>
    <text x="88" y="46" font-size="14" class="v-muted">&#8594;</text>
    ${v.map((n,i)=>{const y=26+i*29, w=Math.abs(n)*70;
      return `<text x="112" y="${y+13}" font-size="10" class="v-muted">d${i}</text>
      <line x1="176" y1="${y+8}" x2="176" y2="${y+8}" class="s-rule"/>
      <rect x="176" y="${y}" width="70" height="16" rx="3" class="v-surf2"/>
      <rect x="${n<0?176-w:176}" y="${y}" width="${w}" height="16" rx="3" class="${n<0?'v-oxide':'v-slate'}"/>
      <text x="256" y="${y+12}" font-size="10" class="v-ink2">${n.toFixed(2)}</text>`;}).join("")}
    <text x="20" y="200" font-size="10.5" class="v-slate">every token becomes a list of numbers it can do math on</text>
  </svg>`;},

  attention(){const toks=["the","cat","sat","on","it"];
    const foc=4, links=[[1,.9],[2,.5],[0,.2],[3,.15]];
    const X=i=>34+i*58;
    return `<svg class="fb-viz" viewBox="0 0 320 210" aria-hidden="true">
    ${links.map(l=>`<path d="M${X(foc)} 150 C ${X(foc)} 96, ${X(l[0])} 96, ${X(l[0])} 60"
        class="fill-none s-slate" stroke-width="${1+l[1]*5}" opacity="${.25+l[1]*.6}"/>`).join("")}
    ${toks.map((t,i)=>`<rect x="${X(i)-24}" y="${i===foc?150:34}" width="48" height="26" rx="6"
        class="${i===foc?'v-slate':'v-surf2'}"/>
      <text x="${X(i)}" y="${(i===foc?150:34)+17}" text-anchor="middle" font-size="12"
        class="${i===foc?'v-paper':'v-ink'}">${t}</text>`).join("")}
    <text x="160" y="196" text-anchor="middle" font-size="10.5" class="v-ink2">"it" looks hardest at "cat" &#8212; that link is learned</text>
  </svg>`;},

  training(){
    // loss descends: high at top-left, flattening low at bottom-right
    const ys=[44,86,116,136,150,158,162,164,165,166];
    const X=i=>36+i*28;
    const d="M"+ys.map((y,i)=>`${X(i)} ${y}`).join(" L ");
    return `<svg class="fb-viz" viewBox="0 0 320 210" aria-hidden="true">
    <line x1="36" y1="26" x2="36" y2="182" class="s-rule"/>
    <line x1="36" y1="182" x2="300" y2="182" class="s-rule"/>
    <text x="16" y="34" font-size="9" class="v-muted">loss</text>
    <text x="270" y="198" font-size="9" class="v-muted">steps</text>
    <path d="${d}" class="fill-none s-slate" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="${X(0)+8}" y="48" font-size="10" class="v-muted">3.0</text>
    <circle cx="${X(9)}" cy="166" r="4" class="v-slate"/>
    <text x="${X(9)-8}" y="160" text-anchor="end" font-size="10" class="v-slate">0.76</text>
    <text x="150" y="78" font-size="10.5" class="v-ink2">each step nudges the</text>
    <text x="150" y="94" font-size="10.5" class="v-ink2">weights to be less wrong</text>
  </svg>`;},

  hardware(){const rows=[["laptop cpu","~1&#8211;3M","numpy"],["apple silicon","~10&#8211;20M","torch / mps"],["nvidia gpu","~50M+","torch / cuda"]];
    return `<svg class="fb-viz" viewBox="0 0 320 200" aria-hidden="true">
    <text x="20" y="26" font-size="9" letter-spacing="1.4" class="v-muted">MACHINE</text>
    <text x="150" y="26" font-size="9" letter-spacing="1.4" class="v-muted">SENSIBLE SIZE</text>
    <text x="252" y="26" font-size="9" letter-spacing="1.4" class="v-muted">PATH</text>
    ${rows.map((r,i)=>{const y=42+i*46;
      return `<rect x="20" y="${y}" width="280" height="36" rx="8" class="v-surf2"/>
      <text x="34" y="${y+23}" font-size="12" class="v-ink">${r[0]}</text>
      <text x="150" y="${y+23}" font-size="12" class="v-slate">${r[1]}</text>
      <text x="252" y="${y+23}" font-size="11" class="v-ink2">${r[2]}</text>`;}).join("")}
    <text x="20" y="194" font-size="10" class="v-oxide">your hardware sets the size &#8212; not the other way around</text>
  </svg>`;},

  scale(){return `<svg class="fb-viz" viewBox="0 0 320 210" aria-hidden="true">
    <rect x="18" y="24" width="134" height="160" rx="12" class="fill-none s-green" stroke-width="1.5"/>
    <text x="85" y="48" text-anchor="middle" font-size="10" letter-spacing="1" class="v-green">NARROW CORPUS</text>
    <text x="32" y="86" font-size="10.5" class="v-ink">MODEL 401-61</text>
    <text x="32" y="104" font-size="10.5" class="v-ink2">SECTION DISASSEMBLY</text>
    <text x="32" y="122" font-size="10.5" class="v-ink2">drift on warm-up</text>
    <text x="85" y="168" text-anchor="middle" font-size="11" class="v-green">&#10003; fluent</text>
    <rect x="168" y="24" width="134" height="160" rx="12" class="fill-none s-oxide" stroke-width="1.5"/>
    <text x="235" y="48" text-anchor="middle" font-size="10" letter-spacing="1" class="v-oxide">THE WHOLE WEB</text>
    <text x="182" y="86" font-size="10.5" class="v-ink2">the of and to a in</text>
    <text x="182" y="104" font-size="10.5" class="v-ink2">that is was for &#183;&#183;&#183;</text>
    <text x="182" y="122" font-size="10.5" class="v-ink2">the the a of the</text>
    <text x="235" y="168" text-anchor="middle" font-size="11" class="v-oxide">&#10007; mush</text>
  </svg>`;},

  fasttrack(){return `<svg class="fb-viz" viewBox="0 0 320 180" aria-hidden="true">
    <path d="M40 90h230" class="fill-none s-rule" stroke-width="2" stroke-dasharray="4 6"/>
    ${[0,1,2,3,4].map(i=>`<circle cx="${52+i*54}" cy="90" r="7" class="${i===4?'v-slate':'v-surf2'}"/>`).join("")}
    <circle cx="${52+4*54}" cy="90" r="13" class="fill-none s-slate" stroke-width="2"/>
    <text x="160" y="48" text-anchor="middle" font-size="12" class="v-ink">skipping the fundamentals</text>
    <text x="160" y="140" text-anchor="middle" font-size="10.5" class="v-muted">straight to hardware + a build plan</text>
  </svg>`;},

  dd_temp(){const lo=[.72,.14,.08,.04,.02], hi=[.30,.24,.20,.15,.11];
    const bars=(arr,x0,cls)=>arr.map((v,i)=>`<rect x="${x0+i*22}" y="${150-v*150}" width="16" height="${v*150}" rx="2" class="${cls}"/>`).join("");
    return `<svg class="fb-viz" viewBox="0 0 320 200" aria-hidden="true">
    <text x="20" y="22" font-size="10" letter-spacing="1" class="v-slate">T = 0.2 &#183; SHARP</text>
    ${bars(lo,20,'v-slate')}
    <text x="180" y="22" font-size="10" letter-spacing="1" class="v-oxide">T = 1.2 &#183; FLAT</text>
    ${bars(hi,185,'v-oxide')}
    <line x1="16" y1="150" x2="304" y2="150" class="s-rule"/>
    <text x="160" y="184" text-anchor="middle" font-size="10" class="v-ink2">low temp = sharp and safe, high temp = varied</text>
  </svg>`;},

  dd_vocab(){return `<svg class="fb-viz" viewBox="0 0 320 200" aria-hidden="true">
    <text x="20" y="22" font-size="9" letter-spacing="1.3" class="v-muted">SMALL VOCAB &#8594; MANY TOKENS</text>
    ${["in","ter","na","tion","al"].map((t,i)=>`<rect x="${20+i*54}" y="32" width="48" height="26" rx="6" class="fill-none s-slate" stroke-width="1.3"/><text x="${44+i*54}" y="49" text-anchor="middle" font-size="11" class="v-ink">${t}</text>`).join("")}
    <text x="20" y="92" font-size="9" letter-spacing="1.3" class="v-muted">BIG VOCAB &#8594; FEW TOKENS</text>
    <rect x="20" y="102" width="140" height="26" rx="6" class="fill-none s-slate" stroke-width="1.3"/><text x="90" y="119" text-anchor="middle" font-size="11" class="v-ink">international</text>
    <text x="20" y="164" font-size="10" class="v-oxide">&#8230; but the embedding table grows with it</text>
    <text x="20" y="182" font-size="10" class="v-ink2">4096 is the frw default sweet spot</text>
  </svg>`;},

  dd_heads(){const toks=["the","cat","sat","it"];
    const grid=(x0,pairs,label)=>`${toks.map((t,i)=>`<circle cx="${x0+i*20}" cy="56" r="3" class="v-ink"/>`).join("")}${pairs.map(p=>`<path d="M${x0+p[0]*20} 56 Q ${x0+((p[0]+p[1])/2)*20} 26, ${x0+p[1]*20} 56" class="fill-none s-slate" stroke-width="1.4" opacity=".85"/>`).join("")}<text x="${x0+30}" y="80" text-anchor="middle" font-size="9" class="v-muted">${label}</text>`;
    return `<svg class="fb-viz" viewBox="0 0 320 200" aria-hidden="true">
    <text x="20" y="22" font-size="10" letter-spacing="1" class="v-slate">ONE LAYER, SEVERAL HEADS</text>
    ${grid(18,[[3,1]],"subject")}
    ${grid(126,[[2,0],[2,1]],"syntax")}
    ${grid(234,[[3,2]],"recency")}
    <text x="20" y="148" font-size="10" class="v-ink2">each head learns a different relationship,</text>
    <text x="20" y="166" font-size="10" class="v-ink2">stacked layers compose them into meaning</text>
  </svg>`;},

  dd_optim(){const cur=(ys,cls,w)=>{const d="M"+ys.map((y,i)=>`${36+i*26} ${y}`).join(" L ");
      return `<path d="${d}" class="fill-none ${cls}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;};
    const adam=[46,84,112,130,142,150,155,158,160,161];
    const muon=[46,82,108,126,140,150,158,164,168,170];
    return `<svg class="fb-viz" viewBox="0 0 320 210" aria-hidden="true">
    <line x1="36" y1="26" x2="36" y2="182" class="s-rule"/><line x1="36" y1="182" x2="300" y2="182" class="s-rule"/>
    <text x="16" y="34" font-size="9" class="v-muted">loss</text>
    <text x="270" y="198" font-size="9" class="v-muted">steps</text>
    ${cur(adam,'s-muted',2)}
    ${cur(muon,'s-slate',2.5)}
    <circle cx="150" cy="60" r="4" class="v-muted"/><text x="160" y="64" font-size="10" class="v-muted">AdamW</text>
    <circle cx="222" cy="60" r="4" class="v-slate"/><text x="232" y="64" font-size="10" class="v-slate">Muon</text>
    <text x="120" y="96" font-size="10" class="v-ink2">Muon: lower loss, same compute</text>
  </svg>`;},

  dd_precision(){return `<svg class="fb-viz" viewBox="0 0 320 190" aria-hidden="true">
    <text x="20" y="22" font-size="9" letter-spacing="1.3" class="v-muted">SAME MODEL, TWO PRECISIONS</text>
    <rect x="20" y="38" width="272" height="34" rx="6" class="v-surf2"/>
    <text x="30" y="59" font-size="11" class="v-ink">float32</text><text x="196" y="59" font-size="11" class="v-muted">4 bytes / weight</text>
    <rect x="20" y="86" width="136" height="34" rx="6" class="v-slate"/>
    <text x="30" y="107" font-size="11" class="v-paper">bf16</text><text x="196" y="107" font-size="11" class="v-slate">2 bytes / weight</text>
    <text x="20" y="150" font-size="10" class="v-ink2">half the memory, twice the model per GPU,</text>
    <text x="20" y="168" font-size="10" class="v-ink2">and it trains just as well</text>
  </svg>`;},

  lu_lora(){return `<svg class="fb-viz" viewBox="0 0 320 190" aria-hidden="true">
    <rect x="26" y="40" width="118" height="108" rx="10" class="v-surf2"/>
    <text x="85" y="90" text-anchor="middle" font-size="11" class="v-muted">base weights</text>
    <text x="85" y="108" text-anchor="middle" font-size="10" class="v-muted">frozen</text>
    <text x="160" y="100" font-size="20" class="v-slate">+</text>
    <rect x="188" y="58" width="32" height="72" rx="6" class="fill-none s-slate" stroke-width="1.6"/><text x="204" y="146" text-anchor="middle" font-size="10" class="v-slate">A</text>
    <rect x="238" y="82" width="60" height="26" rx="6" class="fill-none s-slate" stroke-width="1.6"/><text x="268" y="146" text-anchor="middle" font-size="10" class="v-slate">B</text>
    <text x="20" y="176" font-size="10" class="v-ink2">train two small matrices, not the whole model</text>
  </svg>`;},

  lu_quant(){const b=(x,n,lab)=>`${Array.from({length:n}).map((_,i)=>`<rect x="${x}" y="${42+i*(96/n)}" width="72" height="${96/n-3}" rx="2" class="v-slate" opacity="${.45+i/(n*1.5)}"/>`).join("")}<text x="${x+36}" y="154" text-anchor="middle" font-size="10" class="v-muted">${lab}</text>`;
    return `<svg class="fb-viz" viewBox="0 0 320 190" aria-hidden="true">
    <text x="20" y="22" font-size="9" letter-spacing="1.3" class="v-muted">16-BIT &#8594; 4-BIT WEIGHTS</text>
    ${b(38,16,"fp16 &#183; full")}
    <text x="150" y="98" font-size="18" class="v-muted">&#8594;</text>
    ${b(200,4,"int4 &#183; ~4&#215; smaller")}
    <text x="20" y="178" font-size="10" class="v-ink2">round weights into buckets, fit in less RAM</text>
  </svg>`;},

  lu_rl(){return `<svg class="fb-viz" viewBox="0 0 320 190" aria-hidden="true">
    <text x="20" y="22" font-size="9" letter-spacing="1.3" class="v-muted">SAME PROMPT, TWO ANSWERS</text>
    <rect x="20" y="34" width="184" height="40" rx="8" class="fill-none s-green" stroke-width="1.4"/><text x="32" y="58" font-size="11" class="v-ink">clear, correct answer</text><text x="214" y="60" font-size="15" class="v-green">&#9650;</text>
    <rect x="20" y="86" width="184" height="40" rx="8" class="fill-none s-oxide" stroke-width="1.4"/><text x="32" y="110" font-size="11" class="v-ink2">rambling, wrong answer</text><text x="214" y="112" font-size="15" class="v-oxide">&#9660;</text>
    <text x="20" y="162" font-size="10" class="v-ink2">learn from preferred-vs-worse answer pairs</text>
  </svg>`;},

  lu_serve(){return `<svg class="fb-viz" viewBox="0 0 320 190" aria-hidden="true">
    <rect x="18" y="70" width="70" height="40" rx="8" class="v-surf2"/><text x="53" y="94" text-anchor="middle" font-size="10" class="v-muted">request</text>
    <path d="M90 90h32" class="fill-none s-slate" stroke-width="2" marker-end="url(#a2)"/>
    <rect x="126" y="60" width="82" height="60" rx="10" class="fill-none s-slate" stroke-width="1.6"/><text x="167" y="86" text-anchor="middle" font-size="10" class="v-slate">KV cache</text><text x="167" y="102" text-anchor="middle" font-size="9" class="v-muted">reuse past</text>
    <path d="M210 90h20" class="fill-none s-slate" stroke-width="2" marker-end="url(#a2)"/>
    <text x="238" y="86" font-size="11" class="v-ink">tokens</text>
    <text x="238" y="104" font-size="11" class="v-slate">stream &#8594;</text>
    <text x="20" y="168" font-size="10" class="v-ink2">cache attention state so each token is cheap</text>
    <defs><marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0l6 4-6 4z" class="v-slate"/></marker></defs>
  </svg>`;}
};

/* ---------- node graph ---------- */
const NODES = {
  intro:{type:"intro"},

  goal:{type:"choice", step:1, viz:"goal",
    kicker:"First, the point of all this",
    q:"When you're done, what do you want to have?",
    options:[
      {t:"A small model that writes like my own material", s:"your notes or code in, a model in your voice out", set:{goal:"notes"}, next:"experience"},
      {t:"To actually understand how ChatGPT works", s:"the mechanism, built by hand, end to end", set:{goal:"understand"}, next:"experience"},
      {t:"To run something real today", s:"a trained model on my machine in minutes", set:{goal:"today"}, next:"experience"}
    ]},

  experience:{type:"choice", step:2, viz:"fasttrack",
    kicker:"Calibrating the path",
    q:"How much of this is already familiar to you?",
    options:[
      {t:"Total beginner", s:"I've never trained a model", set:{depth:"new"}, next:"nexttoken"},
      {t:"I know some ML terms", s:"tokens, weights, loss ring a bell", set:{depth:"some"}, next:"nexttoken"},
      {t:"I've trained models before", s:"skip the fundamentals", set:{depth:"pro", knowsAll:true}, next:"fasttrack"}
    ]},

  fasttrack:{type:"lesson", step:7, viz:"fasttrack",
    kicker:"Fast track",
    q:"Skipping the fundamentals.",
    body:`<p>You've done this before, so I'll skip the concept screens. The <b>frw</b> stack is a from-scratch GPT: byte-level BPE tokenizer, a hand-written NumPy autograd engine, RoPE attention, AdamW/Muon, and a PyTorch mirror for the fast path.</p>
      <p>One thing worth knowing up front: on a narrow corpus a tiny model gets genuinely fluent, and the same model on the open web produces mush. That shapes every sizing decision ahead.</p>`,
    next:"hardware"},

  nexttoken:{type:"concept", step:3, viz:"nexttoken", key:"nexttoken", deeper:"dd_temp",
    kicker:"The one idea underneath it all",
    q:"What is a language model actually doing?",
    options:[
      {t:"Predicting the next token, over and over", s:"", correct:true},
      {t:"Looking up the answer in a stored database", teach:true},
      {t:"Not sure &#8212; show me", teach:true}
    ],
    teach:{tt:"Next-token prediction",
      body:`<p>That's the whole engine. Given some text, the model outputs a <b>probability for every possible next token</b>, you pick one, append it, and feed it back in. Do that in a loop and you get sentences.</p>
      <p>There's no database and no lookup. "Knowledge" is just which continuations it learned to rate as likely. Everything else, chat, code, reasoning, is this same step repeated.</p>`}},

  tokens:{type:"concept", step:4, viz:"tokens", key:"tokens", deeper:"dd_vocab",
    kicker:"How text becomes math",
    q:"The model reads letters and words directly. True?",
    options:[
      {t:"False &#8212; text is split into tokens, then numbers", s:"", correct:true},
      {t:"True, it reads the characters as I typed them", teach:true},
      {t:"Not sure &#8212; show me", teach:true}
    ],
    teach:{tt:"Tokens, not letters",
      body:`<p>Text is chopped into <b>tokens</b>, common chunks of characters, and each token is just an integer id. A word like <b>unhappiness</b> becomes a few common pieces. The model never sees letters or words, only these numbers.</p>
      <p>In frw this is <code>frw/tokenizer.py</code>, a byte-level BPE. Fewer tokens for the same text means cheaper training, which is why the tokenizer matters more than beginners expect.</p>`}},

  embeddings:{type:"concept", step:5, viz:"embeddings", key:"embeddings",
    kicker:"Turning ids into meaning",
    q:"A token id like 1420 goes straight into the math. How does the model find meaning in a bare number?",
    options:[
      {t:"Each id maps to a learned vector of numbers", s:"an embedding", correct:true},
      {t:"It doesn't &#8212; the id itself carries the meaning", teach:true},
      {t:"Not sure &#8212; show me", teach:true}
    ],
    teach:{tt:"Embeddings",
      body:`<p>Every token id looks up a <b>vector</b>, a list of numbers the model can do arithmetic on. During training these vectors arrange themselves so related tokens land near each other.</p>
      <p>The id is arbitrary; the <b>vector is where meaning lives</b>. This is the model's first layer, and from here on everything is linear algebra on these vectors.</p>`}},

  attention:{type:"concept", step:6, viz:"attention", key:"attention", deeper:"dd_heads",
    kicker:"The part that made it all work",
    q:"To predict the next token, each token needs context from the others. What lets it pull that in?",
    options:[
      {t:"Attention &#8212; each token weighs every earlier one", s:"", correct:true},
      {t:"It only ever looks at the single previous token", teach:true},
      {t:"Not sure &#8212; show me", teach:true}
    ],
    teach:{tt:"Attention",
      body:`<p><b>Attention</b> lets every token look back at every earlier token and decide how much each one matters right now. To resolve "it", the model leans hard on "cat" and mostly ignores "the".</p>
      <p>Those weights are learned, not hand-coded. Stacking several attention layers (the "T" in GPT) is what turned language models from curiosities into something useful. In frw it's <code>attention()</code> in <code>frw/model.py</code>.</p>`}},

  training:{type:"concept", step:7, viz:"training", key:"training", deeper:"dd_optim",
    kicker:"Where the intelligence comes from",
    q:"A fresh model starts with random weights and predicts nonsense. How does it get good?",
    options:[
      {t:"Guess, measure how wrong, nudge the weights, repeat", s:"gradient descent", correct:true},
      {t:"A person writes the correct rules into it", teach:true},
      {t:"Not sure &#8212; show me", teach:true}
    ],
    teach:{tt:"Training",
      body:`<p>Show the model real text, let it predict the next token, and measure how wrong it was, that number is the <b>loss</b>. Then adjust every weight a little in the direction that would have lowered it, and repeat millions of times.</p>
      <p>Nobody writes rules. The loss curve sliding down <b>is</b> the learning. In frw this loop is <code>frw/train.py</code>; the smoke run drives loss from ~3.0 to ~0.76.</p>`}},

  hardware:{type:"choice", step:8, viz:"hardware",
    kicker:"Now, your setup",
    q:"What machine will you train on?",
    options:[
      {t:"A laptop with no dedicated GPU", s:"we stay small and it still works", set:{hw:"cpu"}, next:"scale"},
      {t:"A Mac with Apple Silicon (M1&#8211;M4)", s:"numpy to learn, then the MPS fast path", set:{hw:"mac"}, next:"scale"},
      {t:"A PC with an NVIDIA GPU", s:"the torch CUDA path, bigger models", set:{hw:"nvidia"}, next:"scale"},
      {t:"I'll rent cloud GPUs", s:"price it first, then scale up", set:{hw:"cloud"}, next:"scale"}
    ]},

  scale:{type:"concept", step:9, viz:"scale", key:"scale", deeper:"dd_precision",
    kicker:"The lesson that saves you months",
    q:"To get coherent output from a small model, what matters most?",
    options:[
      {t:"A narrow corpus &#8212; keep the subject tight", s:"", correct:true},
      {t:"Just make the model as large as possible", teach:true},
      {t:"Not sure &#8212; show me", teach:true}
    ],
    teach:{tt:"Narrow beats big",
      body:`<p>A 919k-parameter model, tiny, gets genuinely fluent on a narrow, consistent corpus. Point that same model at the open web and it produces high-frequency mush: "the of and to a".</p>
      <p>So the winning move for a first real model isn't more parameters, it's a <b>focused corpus</b>. Widen it only once the narrow version works. That's the whole thesis of the curriculum, and it's why your build plan starts narrow.</p>`},
    next:"plan"},

  plan:{type:"plan", step:10},

  /* ---- optional deep dives (off the 10-step spine) ---- */
  dd_temp:{type:"deep", parent:"nexttoken", viz:"dd_temp", eyebrow:"Deep dive &#183; sampling",
    q:"If the model outputs fixed probabilities, why isn't its answer always identical?",
    body:`<p>Because you <b>sample</b> from the distribution instead of always taking the top token. A <b>temperature</b> knob reshapes those probabilities first: low temperature sharpens toward the single most likely token (repeatable, safe), high temperature flattens them (varied, riskier).</p>
      <p>In frw this is the <code>--temperature</code> flag on <code>frw.sample</code>. Same weights, different feel, no retraining.</p>`},

  dd_vocab:{type:"deep", parent:"tokens", viz:"dd_vocab", eyebrow:"Deep dive &#183; vocab size",
    q:"A bigger token vocabulary means fewer tokens per sentence. So why not make it huge?",
    body:`<p>Fewer tokens per sentence means cheaper training and more room in the context window, real wins. But every token needs its own row in the <b>embedding table</b>, so a huge vocab bloats the model and leaves rare tokens undertrained.</p>
      <p>It's a tradeoff, not a free lunch. frw defaults to <code>--vocab-size 4096</code> for small corpora; read <code>data/mine/meta.json</code> to see the bytes-per-token you actually bought.</p>`},

  dd_heads:{type:"deep", parent:"attention", viz:"dd_heads", eyebrow:"Deep dive &#183; multi-head",
    q:"One attention pattern can only track one kind of relationship. How does a model follow several at once?",
    body:`<p>It runs several attention <b>heads</b> in parallel inside the same layer, each free to learn a different relationship, one tracks the subject, another local syntax, another recent tokens. Then it <b>stacks layers</b>, so later layers compose the patterns found by earlier ones.</p>
      <p>That composition is where depth earns its keep. At generation time the <b>KV cache</b> stores each layer's keys and values so every new token stays cheap.</p>`},

  dd_optim:{type:"deep", parent:"training", viz:"dd_optim", eyebrow:"Deep dive &#183; optimizer",
    q:"frw ships two optimizers, AdamW and Muon. Why bother with both?",
    body:`<p><b>AdamW</b> is the robust default that works everywhere. <b>Muon</b> orthogonalizes the gradient for the large matrix weights and often reaches a lower loss for the same compute, which is why it's worth switching to once your run is stable.</p>
      <p>Flip between them with <code>--optimizer muon</code>. One quirk baked into frw: Muon's Newton-Schulz step lands singular values in a ~0.68&#8211;1.13 band, not exactly 1. That's intended, not a bug.</p>`},

  dd_precision:{type:"deep", parent:"scale", viz:"dd_precision", eyebrow:"Deep dive &#183; precision",
    q:"Full 32-bit precision is the most accurate. So why do real training runs use 16-bit?",
    body:`<p>A 32-bit weight takes 4 bytes; a <b>bf16</b> weight takes 2. Halving that lets you fit twice the model, or twice the batch, on the same GPU, and it trains just as well because the format keeps a wide exponent range.</p>
      <p>frw's PyTorch path autocasts to bf16/fp16 on MPS and CUDA (<code>autocast_dtype</code> in <code>torch_model.py</code>). One rule that never bends: gradient <i>checks</i> still run in float64, or the numbers are pure noise.</p>`},

  /* ---- Module 2: going further (reached from the build plan) ---- */
  levelup:{type:"choice", bonus:true, viz:"fasttrack",
    kicker:"Module 2 &#183; going further",
    q:"Your first model runs. Where do you want to go next?",
    options:[
      {t:"Fine-tune without retraining the whole model", s:"LoRA / QLoRA", next:"lu_lora"},
      {t:"Shrink it to run on smaller hardware", s:"quantization", next:"lu_quant"},
      {t:"Make it follow instructions better", s:"preference / RL", next:"lu_rl"},
      {t:"Serve it fast to other people", s:"inference", next:"lu_serve"}
    ]},

  lu_lora:{type:"track", viz:"lu_lora", eyebrow:"Going further &#183; LoRA",
    q:"Fine-tune for cents, not dollars",
    body:`<p>Instead of updating every weight, you <b>freeze the base model</b> and train two small low-rank matrices that nudge it. QLoRA goes further and quantizes the frozen base to 4-bit so the whole thing fits on one consumer GPU.</p>
      <p>frw deliberately doesn't reimplement this, the honest move is to point you at the best tool: <b>Unsloth</b>. Bring the checkpoint you trained in Module 1 and adapt it there.</p>`},

  lu_quant:{type:"track", viz:"lu_quant", eyebrow:"Going further &#183; quantization",
    q:"Make it small enough to run anywhere",
    body:`<p><b>Quantization</b> rounds each weight from 16 bits down to 8 or 4, cutting the model's size several-fold with surprisingly little quality loss. That's what lets a model that trained on a GPU run on a laptop or a phone.</p>
      <p>Again, frw points rather than reimplements: <b>llama.cpp</b> (GGUF) is the standard path. Export your checkpoint, quantize, and run it locally with no Python at all.</p>`},

  lu_rl:{type:"track", viz:"lu_rl", eyebrow:"Going further &#183; preference",
    q:"Teach it what a good answer looks like",
    body:`<p>Instruction-tuning (Module 1, step 8) teaches format. To teach <b>judgment</b>, you show the model pairs, a preferred answer and a worse one, and train it to favor the preferred. That's the core of DPO and RLHF.</p>
      <p>frw stops at supervised fine-tuning on purpose; for the RL stage the reference to read and run is <b>nanochat</b>. The chat tokens you reserved before pretraining are what make this stage possible.</p>`},

  lu_serve:{type:"track", viz:"lu_serve", eyebrow:"Going further &#183; serving",
    q:"Hand it to other people, fast",
    body:`<p>Generation is one token at a time, so the trick to serving is the <b>KV cache</b>: store each layer's attention state and reuse it, so every new token is cheap instead of re-reading the whole prompt. Batch many requests and you get throughput.</p>
      <p>frw's <code>frw/sample.py</code> is the readable teaching version of exactly this. For production throughput, the tool to reach for is <b>vLLM</b>.</p>`}
};

const SPINE = ["goal","experience","nexttoken","tokens","embeddings","attention","training","hardware","scale","plan"];
function spineAfter(id){const i=SPINE.indexOf(id); return i>=0&&i<SPINE.length-1?SPINE[i+1]:"plan";}

/* ---------- state + storage ---------- */
const KEY="frw_build_v1";
let state = load() || fresh();
function fresh(){return {node:"intro", profile:{goal:null,depth:null,hw:null,knows:{}}, history:[], mode:"q"};}
function load(){try{const r=localStorage.getItem(KEY); const s=r?JSON.parse(r):null; if(s&&!s.mode) s.mode="q"; return s;}catch(e){return null;}}
function save(){try{localStorage.setItem(KEY, JSON.stringify(state));}catch(e){}}

/* ---------- reducer ---------- */
function applySet(set){
  if(!set) return;
  if(set.goal) state.profile.goal=set.goal;
  if(set.depth) state.profile.depth=set.depth;
  if(set.hw) state.profile.hw=set.hw;
  if(set.knowsAll){["nexttoken","tokens","embeddings","attention","training","scale"].forEach(k=>state.profile.knows[k]=true);}
}
function go(id){ state.history.push(state.node); state.node=id; state.mode="q"; save(); render(); scrollTop(); }
function back(){ if(state.history.length){ state.node=state.history.pop(); state.mode="q"; save(); render(); scrollTop(); } }
function restart(){ state=fresh(); save(); render(); scrollTop(); }
function scrollTop(){ window.scrollTo({top:0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}); }

/* ---------- plan builder (real frw commands) ---------- */
function fmtCmd(s){
  return s.split("\n").map(line=>{
    if(line.trim().startsWith("#")) return `<span class="fb-ccmt">${esc(line)}</span>`;
    return esc(line).replace(/(\s--[a-z_]+)/g,'<span class="fb-cflag">$1</span>');
  }).join("\n");
}
function buildPlan(p){
  const hw=p.hw||"mac", goal=p.goal||"understand";
  const HW={
    cpu:{name:"laptop CPU", size:"~1&#8211;3M params", path:"NumPy", install:"pip install numpy",
      train:`python -m frw.train --data_dir data/mine --out_dir runs/mine \\\n  --steps 2000 --n_layer 4 --n_embd 128 --block_size 128 --optimizer muon`,
      note:"Pure NumPy, no GPU needed. Keep it small and the corpus narrow and it trains fine on a CPU."},
    mac:{name:"Apple Silicon", size:"~10&#8211;20M params", path:"NumPy to learn, PyTorch/MPS to train", install:"pip install numpy torch regex",
      train:`python -m frw.train --data_dir data/mine --out_dir runs/mine \\\n  --steps 4000 --n_layer 8 --n_embd 384 --block_size 256 --optimizer muon`,
      note:"Learn on the NumPy path, then switch to <code>frw/torch_model.py</code> for real training, <code>best_device()</code> picks <code>mps</code> automatically."},
    nvidia:{name:"NVIDIA GPU", size:"~50M+ params", path:"PyTorch/CUDA", install:"pip install numpy torch regex",
      train:`python -m frw.train --data_dir data/mine --out_dir runs/mine \\\n  --steps 6000 --n_layer 12 --n_embd 512 --block_size 256 --optimizer muon`,
      note:"Use the PyTorch mirror on CUDA. You can push layers/width well past this once the narrow version works."},
    cloud:{name:"rented cloud GPUs", size:"as big as your budget", path:"PyTorch/CUDA", install:"pip install numpy torch regex",
      train:`python -m frw.train --data_dir data/mine --out_dir runs/mine \\\n  --steps 6000 --n_layer 12 --n_embd 512 --block_size 256 --optimizer muon`,
      note:"Price the run before you rent, <code>make budget</code> shows what a dollar buys on 8&#215;H100."}
  }[hw];

  const steps=[];
  steps.push({t:"Install", d:`The NumPy path is the whole requirement to learn; torch is only for the fast path.`,
    cmd:`# ${HW.name}: ${HW.path}\n${HW.install}`});

  steps.push({t:"Prove the stack works", d:`Trains a 919k-param model on a synthetic corpus in about 3 minutes and prints a real completion. This is your first trained model.`,
    cmd:`make smoke`});

  if(hw==="cloud"){
    steps.push({t:"Price the compute", d:`Before renting anything, see what a given dollar amount buys on 8&#215;H100.`, cmd:`make budget`});
  }
  if(hw==="mac"||hw==="nvidia"||hw==="cloud"){
    steps.push({t:"Verify the fast path", d:`The PyTorch mirror wasn't tested in the environment frw shipped from. Run the parity check on your machine, a clean pass means the torch path matches the NumPy reference.`,
      cmd:`python -m tests.run test_parity`});
  }

  const corpus = goal==="notes" ? "~/my-archive" : "~/my-notes";
  steps.push({t:"Bring your own corpus", d:`Point it at a folder of your own text. This builds the tokenizer and shards, and reserves the chat special tokens up front (required before any pretraining).`,
    cmd:`python scripts/prepare_corpus.py --input ${corpus} --out data/mine --vocab-size 4096\ncat data/mine/meta.json   # bytes/token your tokenizer bought you`});

  steps.push({t:"Fit a scaling curve first", d:`Sweep sizes on your data before committing. On a narrow corpus the curve goes flat, that shape tells you you're data-bound, not compute-bound.`,
    cmd:`python -m frw.scaling --data data/mine`});

  steps.push({t:`Pretrain your model`, d:`Sized for your ${HW.name} (${HW.size}). ${HW.note}`,
    cmd:HW.train});

  steps.push({t:"Evaluate on your own questions", d:`Score it against cases only your corpus can answer.`,
    cmd:`python -m frw.evaluate --run runs/mine --data data/mine --cases my_eval.json`});

  if(goal!=="understand"){
    steps.push({t:"Turn it into a chat model", d:`Instruction-tune on Q&A built from your source material. The chat tokens you reserved in step ${hw==="cloud"?"5":"4"} make this possible.`,
      cmd:`python -m frw.sft --run runs/mine --examples data/mine-sft.jsonl --out runs/mine-sft`});
  }

  steps.push({t:"Talk to what you built", d:`Sample from the finished checkpoint.`,
    cmd:`python -m frw.sample --run runs/mine${goal!=="understand"?"-sft":""} --prompt "Q: " --tokens 120`});

  return {HW, goal, steps};
}

/* ---------- rendering ---------- */
let stageEl, backEl;
function esc(s){return s.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));}

function progressPct(){
  const n=NODES[state.node]; const i = n&&n.step ? n.step : (state.node==="intro"?0:1);
  return Math.round((i/ SPINE.length)*100);
}
function phaseFor(id){
  if(id==="goal"||id==="experience") return "Setup";
  if(id==="hardware") return "Your machine";
  if(id==="fasttrack") return "Fast track";
  if(id==="plan") return "Your build plan";
  return "Fundamentals";
}
function progressBlock(){
  const n=NODES[state.node];
  if(n && (n.type==="deep" || n.type==="track" || n.bonus)){
    const left = n.type==="deep" ? "Optional deep dive"
      : (state.node==="levelup" ? "Module 2 &#183; going further" : "Going further");
    return `<div class="fb-progress">
      <span>${left}</span>
      <span class="fb-bar fb-bonus"><i style="width:100%"></i></span>
      <span>Bonus</span>
    </div>`;
  }
  const step=n&&n.step?n.step:1;
  return `<div class="fb-progress">
    <span>Step ${step} / ${SPINE.length}</span>
    <span class="fb-bar"><i style="width:${progressPct()}%"></i></span>
    <span>${phaseFor(state.node)}</span>
  </div>`;
}

function render(){
  const n=NODES[state.node];
  backEl.hidden = state.node==="intro" || state.history.length===0;
  if(!n){ state=fresh(); return render(); }

  if(n.type==="intro"){ renderIntro(); return; }
  if(n.type==="choice"){ renderChoice(n); return; }
  if(n.type==="concept"){ renderConcept(n); return; }
  if(n.type==="lesson"){ renderLesson(n); return; }
  if(n.type==="deep"){ renderDeep(n); return; }
  if(n.type==="track"){ renderTrack(n); return; }
  if(n.type==="plan"){ renderPlan(); return; }
}

function renderIntro(){
  const resumable = state.history.length>0 || (state.profile && (state.profile.goal||state.profile.hw));
  stageEl.innerHTML=`<div class="fb-screen fb-hero">
    <p class="fb-eyebrow">From Random Weights &#183; Adaptive Interview</p>
    <h1>Build your<br>own LLM</h1>
    <p class="fb-deck">A guided path from <b>zero</b> to a language model you trained yourself, hardware and software both. One question at a time. It teaches what you don't know, skips what you do, and ends with the <b>exact commands</b> for your machine.</p>
    <div class="fb-statrow">
      <div class="fb-stat"><div class="fb-n">~3 min</div><div class="fb-l">to your first trained model</div></div>
      <div class="fb-stat"><div class="fb-n">919k</div><div class="fb-l">params, and it's fluent</div></div>
      <div class="fb-stat"><div class="fb-n">10</div><div class="fb-l">questions, then a build plan</div></div>
    </div>
    <div class="fb-status"><span class="fb-dot"></span> Runnable stack ready &#183; NumPy core, PyTorch fast path &#183; 51 tests passing</div>
    <div class="fb-row">
      <button class="fb-btn" id="start">${resumable?"Restart":"Begin"} &#8594;</button>
      ${resumable?`<button class="fb-btn fb-sec" id="resume">Resume where I left off</button>`:""}
    </div>
  </div>`;
  document.getElementById("start").onclick=()=>{ state=fresh(); go("goal"); };
  const r=document.getElementById("resume");
  if(r) r.onclick=()=>{ const last = state.history.length? state.node : "goal"; go(last==="intro"?"goal":last); };
}

function ivShell(n, right){
  const kick = n.kicker || n.eyebrow || "";
  return `<div class="fb-screen">
    ${progressBlock()}
    <div class="fb-iv">
      <div class="fb-qcol">
        ${kick?`<p class="fb-kicker">${kick}</p>`:""}
        <h2>${n.q}</h2>
        <div id="qbody"></div>
      </div>
      <aside class="fb-vizwrap">
        ${VIS[n.viz]?VIS[n.viz]():""}
        <p class="fb-vizcap">${right||""}</p>
      </aside>
    </div>
  </div>`;
}

function renderChoice(n){
  stageEl.innerHTML=ivShell(n, n.viz==="hardware"?"Sizing follows the machine":"Your answer shapes the plan");
  const body=document.getElementById("qbody");
  body.innerHTML=`<div class="fb-opts">${n.options.map((o,i)=>optHTML(o,i)).join("")}</div>`;
  wireOpts(body, n);
}

function conceptNext(n){ return n.next || nextInSpine(n); }

function actionRow(n){
  const deeper = n.deeper ? `<button class="fb-cont fb-ghost" id="deeper">Go deeper &#8595; <span style="opacity:.7">optional</span></button>` : "";
  return `<div class="fb-row" style="margin-top:18px">
    <button class="fb-cont" id="cont">Continue &#8594;</button>
    ${deeper}
  </div>`;
}
function wireActions(n){
  document.getElementById("cont").onclick=()=>go(conceptNext(n));
  const d=document.getElementById("deeper");
  if(d) d.onclick=()=>go(n.deeper);
}

function renderConcept(n){
  stageEl.innerHTML=ivShell(n, capFor(n.key));
  const body=document.getElementById("qbody");
  if(state.mode==="teach"){
    body.innerHTML=`<div class="fb-teach"><p class="fb-tt">${n.teach.tt}</p>${n.teach.body}</div>${actionRow(n)}`;
    wireActions(n);
  } else if(state.mode==="correct"){
    body.innerHTML=`<div class="fb-teach" style="border-left-color:var(--green)">
        <p class="fb-tt" style="color:var(--green)">&#10003; That's it</p>
        <p>${n.teach.body.replace(/^<p>/,"").split("</p>")[0]}.</p>
      </div>${actionRow(n)}`;
    wireActions(n);
  } else {
    body.innerHTML=`<div class="fb-opts">${n.options.map((o,i)=>optHTML(o,i)).join("")}</div>`;
    wireOpts(body, n);
  }
}

function renderDeep(n){
  stageEl.innerHTML=ivShell(n, "");
  const body=document.getElementById("qbody");
  body.innerHTML=`<div class="fb-teach">${n.body}</div>
    <div class="fb-row" style="margin-top:18px">
      <button class="fb-cont" id="cont">Back to the build &#8594;</button>
    </div>`;
  document.getElementById("cont").onclick=()=>go(spineAfter(n.parent));
}

function renderTrack(n){
  stageEl.innerHTML=ivShell(n, "");
  const body=document.getElementById("qbody");
  body.innerHTML=`<div class="fb-teach">${n.body}</div>
    <div class="fb-row" style="margin-top:18px">
      <button class="fb-cont" id="more">&#8592; More tracks</button>
      <button class="fb-cont fb-ghost" id="toplan">Back to my plan</button>
    </div>`;
  document.getElementById("more").onclick=()=>go("levelup");
  document.getElementById("toplan").onclick=()=>go("plan");
}

function optHTML(o,i){
  const letter=String.fromCharCode(65+i);
  return `<button class="fb-opt" data-i="${i}">
    <span class="fb-tick">${letter}</span>
    <span class="fb-otxt"><b>${o.t}</b>${o.s?`<small>${o.s}</small>`:""}</span>
  </button>`;
}

function wireOpts(body, n){
  body.querySelectorAll(".fb-opt").forEach(btn=>{
    btn.onclick=()=>{
      const o=n.options[+btn.dataset.i];
      applySet(o.set);
      if(o.correct){
        if(n.key) state.profile.knows[n.key]=true;
        btn.classList.add("fb-correct");
        btn.querySelector(".fb-tick").textContent="✓";
        state.mode="correct"; save();
        setTimeout(()=>renderConcept(n), 300);
      } else if(o.teach){
        if(n.key) state.profile.knows[n.key]="taught";
        state.mode="teach"; save();
        renderConcept(n);
      } else if(o.next){
        go(o.next);
      }
    };
  });
}

function nextInSpine(n){
  const i=SPINE.indexOf(state.node);
  return i>=0 && i<SPINE.length-1 ? SPINE[i+1] : "plan";
}

function renderLesson(n){
  stageEl.innerHTML=ivShell(n, "You've done this before");
  const body=document.getElementById("qbody");
  body.innerHTML=`<div class="fb-teach"><p class="fb-tt">${n.kicker}</p>${n.body}</div>
    <div class="fb-row" style="margin-top:18px"><button class="fb-cont" id="cont">Continue &#8594;</button></div>`;
  document.getElementById("cont").onclick=()=>go(n.next);
}

function capFor(k){return {
  nexttoken:"Predict &#183; append &#183; repeat",
  tokens:"Text &#8594; tokens &#8594; ids",
  embeddings:"Every id becomes a vector",
  attention:"Tokens weigh each other",
  training:"Loss slides down as it learns",
  scale:"Narrow corpus, small model, fluent"
}[k]||"";}

function renderPlan(){
  const {HW, goal, steps}=buildPlan(state.profile);
  const goalLabel={notes:"Write like my own material", understand:"Understand the mechanism", today:"Run something today"}[goal||"understand"];
  stageEl.innerHTML=`<div class="fb-screen">
    ${progressBlock("Your build plan")}
    <div class="fb-planhead">
      <p class="fb-eyebrow" style="width:100%;margin-bottom:0">Personalized &#183; ordered frw commands</p>
      <h2>Your build plan</h2>
    </div>
    <p class="fb-plansub">Run these in order from inside the <span class="fb-mono">frw/</span> directory. Every command is real, this is the same stack the smoke test drives.</p>
    <div class="fb-chips">
      <span class="fb-chip">Machine &#183; <b>${HW.name}</b></span>
      <span class="fb-chip">Target &#183; <b>${HW.size}</b></span>
      <span class="fb-chip">Path &#183; <b>${HW.path}</b></span>
      <span class="fb-chip">Goal &#183; <b>${goalLabel}</b></span>
    </div>
    <div class="fb-steps">
      ${steps.map((s,i)=>`<div class="fb-step">
        <div class="fb-steph">
          <div class="fb-stepn">${i+1}</div>
          <div>
            <div class="fb-stept">${s.t}</div>
            <p class="fb-stepd">${s.d}</p>
          </div>
        </div>
        <pre class="fb-cmd">${fmtCmd(s.cmd)}</pre>
      </div>`).join("")}
    </div>
    <div class="fb-watch">
      <p class="fb-wt">Gotchas the frw authors already hit</p>
      <ul>
        <li>Reserve chat special tokens <b>before</b> pretraining. <code>prepare_corpus.py</code> does this for you; <code>frw/sft.py</code> refuses to run if you skipped it.</li>
        <li>Gradient checks must run in <b>float64</b>, in float32 the numerical gradient is ~1e-3 noise that looks exactly like a bug.</li>
        <li>Don't end an eval prompt mid-token (see the <code>DEMO_CASES</code> note in <code>frw/evaluate.py</code>).</li>
        <li>On a narrow corpus the scaling sweep goes <b>flat</b>, that's data-bound, not broken. Recognizing that shape beats the fitted number.</li>
      </ul>
    </div>
    <div class="fb-nextmod">
      <div>
        <p class="fb-nmeyebrow">Module 2 &#183; going further</p>
        <p class="fb-nmtitle">Once your first model runs, there's a next move.</p>
        <p class="fb-nmsub">Cheaper fine-tuning, quantizing it to run anywhere, teaching it judgment, serving it fast. Pick a track when you're ready.</p>
      </div>
      <button class="fb-btn" id="further">Explore Module 2 &#8594;</button>
    </div>
    <div class="fb-planfoot">
      <button class="fb-btn fb-sec" id="reprint">Print / save this plan</button>
      <button class="fb-btn fb-sec" id="redo">Change an answer</button>
      <button class="fb-btn fb-sec" id="over">Start over</button>
    </div>
  </div>`;
  document.getElementById("further").onclick=()=>go("levelup");
  document.getElementById("reprint").onclick=()=>window.print();
  document.getElementById("redo").onclick=()=>back();
  document.getElementById("over").onclick=()=>restart();
}


/* ---------- mount into the site ---------- */
function open(){
  app.innerHTML = '<div class="frwb"><button class="fb-back" id="fb-back" hidden>\u2190 Back</button><div id="fb-stage"></div></div>';
  stageEl = document.getElementById("fb-stage");
  backEl  = document.getElementById("fb-back");
  backEl.onclick = back;
  render();
}

LABS.register({
  id: "build",
  chip: "build",
  title: "Build your own LLM",
  skin: false,
  theme: "#F2F1EC",
  render: open
});

/* Appended last, so the chip sits to the right of every existing one. */
if (typeof SCREENS !== "undefined" && !SCREENS.some(function (s) { return s.id === "build"; })) {
  SCREENS.push({ id: "build", label: "Build" });
  if (typeof buildStrip === "function") {
    const strip = document.getElementById("strip");
    if (strip && strip.children.length) {
      buildStrip();
      const cur = location.hash.slice(2) || "index";
      const chip = LABS.chipFor(cur);
      [].forEach.call(strip.children, function (c) { c.classList.toggle("on", c.dataset.id === chip); });
    }
  }
}

/* Someone can land straight on #/build. */
const landing = location.hash.slice(2);
if (landing === "build" && typeof route === "function") route("build");

})();
