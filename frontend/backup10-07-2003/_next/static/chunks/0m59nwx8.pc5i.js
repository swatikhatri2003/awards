(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,72906,e=>{"use strict";var t=e.i(43476),a=e.i(71645),n=e.i(18566),i=e.i(37645),r=e.i(90165),s=e.i(82608),l=e.i(86347),o=e.i(11688);function d(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,t.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}function c(e){return(0,t.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5","aria-hidden":!0,...e,children:(0,t.jsx)("path",{d:"M20 6L9 17l-5-5",strokeLinecap:"round",strokeLinejoin:"round"})})}function u(e){return(0,t.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:(0,t.jsx)("path",{d:"M18 6L6 18M6 6l12 12",strokeLinecap:"round"})})}function m(e){let n,i,{mode:s,eventId:m,eventTitle:h,apiBase:p,apiOrigin:g,token:f,onBack:x,onGoCategories:b}=e,[v,j]=a.default.useState([]),[y,N]=a.default.useState([]),[w,k]=a.default.useState(!1),[E,C]=a.default.useState(null),[S,_]=a.default.useState(""),[A,L]=a.default.useState(""),[I,O]=a.default.useState({name:"",photo:"",description:""}),[T,D]=a.default.useState(null),[P,R]=a.default.useState("categories"===s),[U,F]=a.default.useState(null),[$,B]=a.default.useState(null);a.default.useEffect(()=>{"nominees"===s&&0!==v.length&&B(e=>null!=e&&v.some(t=>t.category_id===e)?e:v[0]?.category_id??null)},[s,v]);let[z,M]=a.default.useState(null),[V,q]=a.default.useState(null),[H,W]=a.default.useState(!1),[G,Y]=a.default.useState(null),J=a.default.useCallback(async()=>{k(!0),C(null);try{let[e,t]=await Promise.all([fetch(`${p}/categories?eventId=${m}`),fetch(`${p}/nominees?eventId=${m}`)]),a=await e.json().catch(()=>null),n=await t.json().catch(()=>null);if(!e.ok)throw Error(a?.error||"CATEGORIES_FAILED");if(!t.ok)throw Error(n?.error||"NOMINEES_FAILED");let i=Array.isArray(a?.categories)?a.categories:[],r=i.some(e=>e?.event_id!=null&&Number.isFinite(Number(e.event_id)))?i.filter(e=>Number(e?.event_id)===m):i;j(r),N(Array.isArray(n?.nominees)?n.nominees:[])}catch(e){C(e instanceof Error?e.message:"ADMIN_LOAD_FAILED")}finally{k(!1)}},[m,p]);a.default.useEffect(()=>{J()},[J]);let K=a.default.useMemo(()=>T?v.find(e=>e.category_id===T):void 0,[T,v]),X=a.default.useCallback(e=>y.filter(t=>Number(t?.category_id)===e).slice().sort((e,t)=>Number(e.nominee_id)-Number(t.nominee_id)),[y]);a.default.useEffect(()=>{K&&_(K.name||"")},[K]);let Q=a.default.useCallback(()=>{Y(e=>(e&&URL.revokeObjectURL(e),null))},[]);async function Z(){let e=A.trim();if(e){k(!0),C(null);try{let t=await fetch(`${p}/admin/categories`,{method:"POST",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(f)},body:JSON.stringify({name:e,eventId:m})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"CREATE_CATEGORY_FAILED");L(""),R(!1),await J()}catch(e){C(e instanceof Error?e.message:"CREATE_CATEGORY_FAILED")}finally{k(!1)}}}async function ee(){if(!T)return;let e=S.trim();if(!e)return;let t=K?.winner_nominee_id,a=null!=t&&Number.isFinite(Number(t))&&Number(t)>0?Number(t):null;k(!0),C(null);try{let t=await fetch(`${p}/admin/categories/${T}?eventId=${m}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(f)},body:JSON.stringify({name:e,winner_nominee_id:a})}),n=await t.json().catch(()=>null);if(!t.ok)throw Error(n?.error||"UPDATE_CATEGORY_FAILED");D(null),await J()}catch(e){C(e instanceof Error?e.message:"UPDATE_CATEGORY_FAILED")}finally{k(!1)}}function et(){Q(),F(null),O({name:"",photo:"",description:""})}async function ea(){if(!U)return;let e=I.name.trim();if(e){k(!0),C(null);try{let t=await fetch(`${p}/admin/nominees?eventId=${m}`,{method:"POST",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(f)},body:JSON.stringify({name:e,photo:I.photo.trim(),description:I.description.trim()||void 0,category_id:U})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"SAVE_NOMINEE_FAILED");et(),await J()}catch(e){C(e instanceof Error?e.message:"SAVE_NOMINEE_FAILED")}finally{k(!1)}}}async function en(){if(!z)return;let e=z.name.trim();if(!e)return;let t=y.find(e=>e.nominee_id===z.nominee_id),a=t?Number(t.category_id):null;if(null==a||!Number.isFinite(a))return void C("SAVE_NOMINEE_FAILED");k(!0),C(null);try{let t=await fetch(`${p}/admin/nominees/${z.nominee_id}?eventId=${m}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(f)},body:JSON.stringify({name:e,photo:z.photo.trim(),description:z.description.trim()||null,category_id:a})}),n=await t.json().catch(()=>null);if(!t.ok)throw Error(n?.error||"SAVE_NOMINEE_FAILED");V&&URL.revokeObjectURL(V),q(null),M(null),await J()}catch(e){C(e instanceof Error?e.message:"SAVE_NOMINEE_FAILED")}finally{k(!1)}}async function ei(e,t="modal"){W(!0),C(null);try{let a=new FormData;a.append("photo",e);let n=await fetch(`${p}/uploads/nominee-photo`,{method:"POST",body:a}),i=await n.json().catch(()=>null);if(!n.ok)throw Error(i?.error||"PHOTO_UPLOAD_FAILED");let r=String(i?.filename||"");if(!r)throw Error("PHOTO_UPLOAD_FAILED");"modal"===t?(Q(),O(e=>({...e,photo:r}))):M(e=>e?{...e,photo:r}:null)}catch(e){C(e instanceof Error?e.message:"PHOTO_UPLOAD_FAILED")}finally{W(!1)}}return a.default.useEffect(()=>()=>{Y(e=>(e&&URL.revokeObjectURL(e),null))},[]),(0,t.jsxs)("div",{className:"panel",style:{marginBottom:"2rem"},children:[(0,t.jsx)("div",{className:"back-row",style:{marginBottom:"1rem"},children:(0,t.jsx)("button",{type:"button",className:"back-link",onClick:x,children:"← Event details"})}),(0,t.jsxs)("div",{className:o.default.adminCatToolbar,style:{marginBottom:14},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"panel-title",style:{marginBottom:4},children:"categories"===s?"Categories":"Nominees"}),(0,t.jsx)("p",{style:{fontSize:13,color:"var(--text-muted)",margin:0},children:h})]}),(0,t.jsx)("span",{style:{fontSize:13,color:"var(--text-faint)"},children:w?"Loading…":"categories"===s?`${v.length} categories`:`${y.length} nominees`})]}),E?(0,t.jsx)("div",{className:"error-box",style:{marginBottom:12},children:E}):null,"categories"===s?(0,t.jsxs)("div",{className:o.default.adminCategoriesBlock,style:{marginTop:0},children:[(0,t.jsxs)("div",{className:o.default.adminCatToolbar,children:[(0,t.jsx)("span",{className:"section-title",style:{marginBottom:0,fontSize:13,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--text-muted)"},children:"All categories"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:()=>R(e=>!e),"aria-expanded":P,children:P?"Close":"Add category"})]}),P?(0,t.jsxs)("div",{className:o.default.adminAddCategoryBar,children:[(0,t.jsx)("input",{className:`input ${o.default.inputGrow}`,value:A,placeholder:"New category name",onChange:e=>L(e.target.value),disabled:w,"aria-label":"New category name",onKeyDown:e=>{"Enter"===e.key&&Z()}}),(0,t.jsx)("button",{type:"button",className:`${o.default.adminIconBtn} ${o.default.adminIconBtnPrimary}`,onClick:Z,disabled:w||!A.trim(),"aria-label":"Create category",title:"Save category",children:(0,t.jsx)(c,{})})]}):null,0!==v.length||w?null:(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"1rem 0"},children:"No categories yet — use Add category above."}),(0,t.jsx)("div",{className:o.default.adminCategoryList,children:v.map(e=>{let a=T===e.category_id;return(0,t.jsx)("div",{className:o.default.adminCategoryRow,children:a?(0,t.jsxs)("div",{className:o.default.adminCategoryEditBar,children:[(0,t.jsx)("input",{className:"input",value:S,onChange:e=>_(e.target.value),placeholder:"Category name",disabled:w}),(0,t.jsx)("button",{type:"button",className:`${o.default.adminIconBtn} ${o.default.adminIconBtnPrimary}`,onClick:ee,disabled:w,"aria-label":"Save category",children:(0,t.jsx)(c,{})}),(0,t.jsx)("button",{type:"button",className:o.default.adminIconBtn,onClick:()=>D(null),disabled:w,"aria-label":"Cancel",children:(0,t.jsx)(u,{})})]}):(0,t.jsxs)("div",{className:o.default.adminCategoryRowMain,children:[(0,t.jsxs)("div",{className:o.default.adminCategoryTitleWrap,children:[(0,t.jsx)("span",{style:{fontSize:15,fontWeight:600,whiteSpace:"normal"},children:e.name}),e.winner_nominee_id?(0,t.jsx)("span",{className:"event-badge badge-public",style:{marginLeft:8},children:"Winner set"}):null]}),(0,t.jsx)("button",{type:"button",className:o.default.adminIconBtn,onClick:()=>D(e.category_id),"aria-label":"Edit category",title:"Edit category",children:(0,t.jsx)(d,{})})]})},e.category_id)})})]}):(0,t.jsx)("div",{className:o.default.adminCategoriesBlock,style:{marginTop:0},children:0!==v.length||w?(0,t.jsx)("div",{className:o.default.adminCategoryList,children:v.map(e=>{let a=X(e.category_id),n=$===e.category_id;return(0,t.jsxs)("div",{className:o.default.adminCategoryRow,children:[(0,t.jsxs)("div",{className:o.default.adminCategoryRowMain,style:{cursor:"pointer"},onClick:()=>{B(t=>t===e.category_id?null:e.category_id),M(null)},onKeyDown:t=>{("Enter"===t.key||" "===t.key)&&(t.preventDefault(),B(t=>t===e.category_id?null:e.category_id))},role:"button",tabIndex:0,"aria-expanded":n,children:[(0,t.jsxs)("div",{className:o.default.adminCategoryTitleWrap,children:[(0,t.jsx)("span",{style:{fontSize:15,fontWeight:600,whiteSpace:"normal"},children:e.name}),(0,t.jsxs)("span",{style:{marginLeft:8,fontSize:12,color:"var(--text-faint)"},children:[a.length," nominee",1===a.length?"":"s"]})]}),(0,t.jsx)("button",{type:"button",className:"btn",style:{flexShrink:0},onClick:t=>{t.stopPropagation(),Q(),O({name:"",photo:"",description:""}),F(e.category_id),B(e.category_id)},children:"Add nominee"})]}),n||a.length>0?(0,t.jsx)("div",{className:o.default.adminNomineeDropdown,role:"region","aria-label":`Nominees in ${e.name}`,children:a.map(e=>{let a,n,i=(0,l.resolveNomineePhotoUrl)(g,e.photo),r=z?.nominee_id===e.nominee_id;return(0,t.jsx)("div",{className:o.default.adminNomineeCard,children:r&&z?(0,t.jsxs)("div",{className:o.default.adminNomineeCardEdit,children:[(0,t.jsx)("input",{className:"input",value:z.name,onChange:e=>M(t=>t?{...t,name:e.target.value}:null),placeholder:"Name",disabled:w}),(0,t.jsx)("textarea",{className:"input",value:z.description,onChange:e=>M(t=>t?{...t,description:e.target.value}:null),placeholder:"Description",style:{minHeight:72,resize:"vertical"},disabled:w}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",onChange:e=>{let t=e.currentTarget.files?.[0];t&&(q(e=>(e&&URL.revokeObjectURL(e),URL.createObjectURL(t))),ei(t,"inline"))},disabled:w||H}),(a=z.photo.trim()?(0,l.resolveNomineePhotoUrl)(g,z.photo):"",(n=V||a)?(0,t.jsx)("img",{className:o.default.adminNomineeCardPhoto,src:n,alt:""}):null),(0,t.jsxs)("div",{className:o.default.adminNomineeCardActions,children:[(0,t.jsx)("button",{type:"button",className:`${o.default.adminIconBtn} ${o.default.adminIconBtnPrimary}`,onClick:en,disabled:w,"aria-label":"Save nominee",children:(0,t.jsx)(c,{})}),(0,t.jsx)("button",{type:"button",className:o.default.adminIconBtn,onClick:()=>{M(null),V&&(URL.revokeObjectURL(V),q(null))},disabled:w,"aria-label":"Cancel",children:(0,t.jsx)(u,{})})]})]}):(0,t.jsxs)("div",{className:o.default.adminNomineeCardRead,children:[(0,t.jsxs)("div",{className:o.default.adminNomineeCardLeft,children:[i?(0,t.jsx)("img",{className:o.default.adminNomineeCardPhoto,src:i,alt:""}):(0,t.jsx)("div",{className:o.default.adminNomineeCardPhotoPlaceholder,"aria-hidden":!0}),(0,t.jsxs)("div",{className:o.default.adminNomineeCardText,children:[(0,t.jsx)("div",{style:{fontSize:15,fontWeight:600,whiteSpace:"normal"},children:e.name}),e.description?(0,t.jsx)("p",{className:o.default.adminNomineeDesc,children:e.description}):(0,t.jsx)("p",{className:"hint",style:{margin:"6px 0 0"},children:"No description"})]})]}),(0,t.jsx)("button",{type:"button",className:o.default.adminIconBtn,onClick:()=>{M({nominee_id:e.nominee_id,name:e.name||"",photo:e.photo||"",description:e.description||""}),q(e=>(e&&URL.revokeObjectURL(e),null))},"aria-label":`Edit ${e.name}`,title:"Edit nominee",children:(0,t.jsx)(d,{})})]})},e.nominee_id)})}):(0,t.jsx)("p",{className:"hint",style:{padding:"0 14px 12px",margin:0,fontSize:12,textAlign:"left"},children:"No nominees in this category yet — use Add nominee."})]},e.category_id)})}):(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"0.5rem 0 1rem"},children:"Add categories first, then add nominees under each category."}),b?(0,t.jsx)("button",{type:"button",className:"btn",onClick:b,children:"Go to categories"}):null]})}),null!==U?(0,t.jsx)("div",{className:o.default.adminModalBackdrop,role:"presentation",onClick:et,onKeyDown:e=>"Escape"===e.key&&et(),children:(0,t.jsxs)("div",{className:o.default.adminModal,role:"dialog","aria-modal":"true","aria-labelledby":"admin-add-nominee-title",onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:o.default.adminModalHead,children:[(0,t.jsx)("h2",{id:"admin-add-nominee-title",className:o.default.adminModalTitle,children:"Add nominee"}),(0,t.jsx)("button",{type:"button",className:o.default.adminIconBtn,onClick:et,"aria-label":"Close",children:(0,t.jsx)(u,{})})]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Name"}),(0,t.jsx)("input",{className:"input",value:I.name,onChange:e=>O(t=>({...t,name:e.target.value})),placeholder:"Nominee name",disabled:w})]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Photo"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",onChange:e=>{let t=e.currentTarget.files?.[0];t&&(Y(e=>(e&&URL.revokeObjectURL(e),URL.createObjectURL(t))),ei(t,"modal"))},disabled:w||H}),H?(0,t.jsx)("p",{className:"hint",style:{marginTop:8},children:"Uploading…"}):null,(n=I.photo.trim()?(0,l.resolveNomineePhotoUrl)(g,I.photo):"",(i=G||n)?(0,t.jsx)("div",{style:{marginTop:10},children:(0,t.jsx)("img",{className:o.default.previewPhoto,src:i,alt:""})}):null)]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Description (optional)"}),(0,t.jsx)("textarea",{className:"input",value:I.description,onChange:e=>O(t=>({...t,description:e.target.value})),placeholder:"Short description",style:{minHeight:88,resize:"vertical"},disabled:w})]}),(0,t.jsxs)("div",{className:o.default.adminModalFooter,children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:et,disabled:w,children:"Cancel"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:ea,disabled:w,children:"Add nominee"})]})]})}):null]})}function h(e){if(null==e||""===e)return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let a=e=>String(e).padStart(2,"0");return`${t.getFullYear()}-${a(t.getMonth()+1)}-${a(t.getDate())}T${a(t.getHours())}:${a(t.getMinutes())}`}function p(e){if(null==e||""===String(e).trim())return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"})}let g=`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #e8f0fe;
    --surface: #ffffff;
    --surface2: #f8fafc;
    --surface3: #f1f5f9;
    --border: rgba(15, 23, 42, 0.1);
    --border-hover: rgba(15, 23, 42, 0.18);
    --accent: #2563eb;
    --accent-glow: rgba(37, 99, 235, 0.15);
    --accent-dim: rgba(37, 99, 235, 0.12);
    --text: #0f172a;
    --text-muted: #64748b;
    --text-faint: #94a3b8;
    --success: #059669;
    --success-dim: rgba(5, 150, 105, 0.12);
    --danger: #dc2626;
    --danger-dim: rgba(220, 38, 38, 0.1);
    --warning: #d97706;
    --font: 'DM Sans', sans-serif;
    --mono: 'DM Mono', monospace;
    --radius: 10px;
    --radius-lg: 16px;
    --radius-xl: 20px;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font); }

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg);
    color-scheme: light;
  }

  /* ── Auth layout ── */
  .auth-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
  }

  .auth-card {
    width: 100%;
    max-width: 420px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 2.5rem;
    position: relative;
    overflow: hidden;
  }
  .auth-card-wide { max-width: 520px; }
  .auth-card::before {
    content: '';
    position: absolute;
    top: -60px; left: -60px;
    width: 200px; height: 200px;
    background: var(--accent-glow);
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
  }

  .auth-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 2rem;
  }
  .auth-logo-icon {
    width: 36px; height: 36px;
    background: var(--accent);
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
  }
  .auth-logo-icon svg { width: 18px; height: 18px; fill: #fff; }
  .auth-logo-text { font-size: 15px; font-weight: 600; color: var(--text); }

  .auth-title { font-size: 22px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
  .auth-subtitle { font-size: 14px; color: var(--text-muted); margin-bottom: 1.75rem; line-height: 1.5; }

  /* ── Fields ── */
  .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
  .label { font-size: 13px; font-weight: 500; color: var(--text-muted); letter-spacing: 0.02em; }

  .input {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
    font-family: var(--font);
    font-size: 14px;
    padding: 10px 14px;
    transition: border-color 0.15s, background 0.15s;
    outline: none;
    width: 100%;
  }
  .input:hover { border-color: var(--border-hover); }
  .input:focus { border-color: var(--accent); background: #ffffff; box-shadow: 0 0 0 3px var(--accent-dim); }
  .input::placeholder { color: var(--text-faint); }
  textarea.input { resize: vertical; min-height: 72px; }
  input[type="file"].input { padding: 8px 14px; cursor: pointer; }
  input[type="datetime-local"].input { color-scheme: light; }

  /* ── Buttons ── */
  .btn {
    background: var(--accent);
    border: none;
    border-radius: var(--radius);
    color: #fff;
    cursor: pointer;
    font-family: var(--font);
    font-size: 14px;
    font-weight: 500;
    padding: 10px 18px;
    transition: opacity 0.15s, transform 0.1s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }
  .btn:hover { opacity: 0.88; }
  .btn:active { transform: scale(0.97); }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

  .btn-full { width: 100%; justify-content: center; padding: 12px 18px; font-size: 15px; }

  .btn-ghost {
    background: transparent;
    border: 1px solid var(--border-hover);
    color: var(--text-muted);
  }
  .btn-ghost:hover { border-color: var(--border-hover); background: var(--surface2); color: var(--text); }

  .btn-danger { background: var(--danger-dim); border: 1px solid rgba(240,82,82,0.25); color: var(--danger); }
  .btn-danger:hover { background: var(--danger); color: #fff; }

  .link-btn {
    background: none;
    border: none;
    color: var(--accent);
    cursor: pointer;
    font-family: var(--font);
    font-size: 13px;
    padding: 0;
    text-decoration: none;
  }
  .link-btn:hover { text-decoration: underline; }

  /* ── Error / Alert ── */
  .error-box {
    background: var(--danger-dim);
    border: 1px solid rgba(240,82,82,0.25);
    border-radius: var(--radius);
    color: var(--danger);
    font-size: 13px;
    padding: 10px 14px;
    margin-bottom: 1rem;
  }
  .info-box {
    background: var(--success-dim);
    border: 1px solid rgba(5, 150, 105, 0.25);
    border-radius: var(--radius);
    color: var(--success);
    font-size: 13px;
    padding: 10px 14px;
    margin-bottom: 1rem;
  }

  /* ── Dashboard ── */
  .dashboard {
    max-width: 860px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
    width: 100%;
  }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--border);
  }
  .topbar-brand {
    display: flex; align-items: center; gap: 10px;
  }
  .topbar-icon {
    width: 32px; height: 32px;
    background: var(--accent);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }
  .topbar-icon svg { width: 16px; height: 16px; fill: #fff; }
  .topbar-title { font-size: 16px; font-weight: 600; }

  /* ── Section head ── */
  .section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }
  .section-title {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
  }

  /* ── Panel ── */
  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .panel-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .panel-title-pill {
    font-size: 11px;
    font-weight: 500;
    background: var(--accent-dim);
    color: var(--accent);
    padding: 2px 8px;
    border-radius: 20px;
    letter-spacing: 0.03em;
  }

  .grid2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  @media (max-width: 540px) { .grid2 { grid-template-columns: 1fr; } }

  .row-mix {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    align-items: start;
  }

  .actions-row {
    display: flex;
    gap: 8px;
    margin-top: 1.25rem;
    flex-wrap: wrap;
  }

  /* ── Toggle ── */
  .toggle-field {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: border-color 0.15s;
  }
  .toggle-field:hover { border-color: var(--border-hover); }
  .toggle-label { font-size: 13px; color: var(--text-muted); flex: 1; line-height: 1.4; }

  .switch {
    appearance: none;
    width: 36px; height: 20px;
    background: #e2e8f0;
    border: 1px solid var(--border-hover);
    border-radius: 20px;
    cursor: pointer;
    position: relative;
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .switch::after {
    content: '';
    position: absolute;
    top: 2px; left: 2px;
    width: 14px; height: 14px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 50%;
    transition: transform 0.2s, background 0.2s;
  }
  .switch:checked { background: var(--accent); border-color: var(--accent); }
  .switch:checked::after { transform: translateX(16px); background: #fff; border-color: transparent; }

  /* ── Fieldset ── */
  .fieldset {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1rem;
    margin-bottom: 1rem;
  }
  .fieldset-legend {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-muted);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 0 6px;
  }
  .fieldset-hint { font-size: 12px; color: var(--text-faint); margin-bottom: 12px; }

  /* ── Banner preview ── */
  .banner-preview {
    margin-top: 10px;
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--border);
    position: relative;
  }
  .banner-preview img { width: 100%; height: 140px; object-fit: cover; display: block; }
  .banner-badge {
    position: absolute;
    bottom: 8px; right: 8px;
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
    backdrop-filter: blur(8px);
  }
  .badge-ok { background: var(--success-dim); color: var(--success); border: 1px solid rgba(34,211,160,0.25); }
  .badge-busy { background: rgba(245,166,35,0.15); color: var(--warning); border: 1px solid rgba(245,166,35,0.25); }
  .badge-preview { background: rgba(15, 23, 42, 0.06); color: var(--text-muted); border: 1px solid var(--border); }

  /* ── Event list ── */
  .event-list { display: flex; flex-direction: column; gap: 10px; }

  .event-card {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 1.25rem 1.5rem;
    transition: border-color 0.15s;
    min-width: 0;
    overflow: hidden;
  }
  .event-card:hover { border-color: var(--border-hover); }

  .event-card-clickable {
    cursor: pointer;
    text-align: left;
    width: 100%;
    font: inherit;
    color: inherit;
    display: block;
  }
  .event-card-clickable:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .event-card-row {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
  }
  .event-card-thumb {
    width: 56px;
    height: 56px;
    border-radius: var(--radius);
    object-fit: cover;
    flex-shrink: 0;
    background: var(--surface3);
    border: 1px solid var(--border);
  }
  .event-card-thumb-ph {
    width: 56px;
    height: 56px;
    border-radius: var(--radius);
    flex-shrink: 0;
    background: var(--accent-dim);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    color: var(--accent);
  }
  .event-card-main { flex: 1; min-width: 0; }
  .event-card-chevron {
    flex-shrink: 0;
    color: var(--text-faint);
    font-size: 18px;
    line-height: 1;
  }

  .back-row { margin-bottom: 1.25rem; }
  .back-link {
    background: none;
    border: none;
    color: var(--accent);
    cursor: pointer;
    font-family: var(--font);
    font-size: 14px;
    padding: 0;
  }
  .back-link:hover { text-decoration: underline; }

  .event-detail-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin-bottom: 2rem;
  }
  .event-detail-banner {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
    background: var(--surface3);
  }
  .event-detail-banner-ph {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: 600;
    color: var(--accent);
    background: var(--accent-dim);
  }
  .event-detail-body { padding: 1.5rem; }
  .event-detail-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }
  .event-detail-title {
    font-size: 22px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 10px;
    overflow-wrap: anywhere;
  }
  .event-detail-meta {
    display: grid;
    gap: 12px;
    margin: 1.25rem 0;
    font-size: 13px;
  }
  .event-detail-meta dt {
    color: var(--text-faint);
    font-weight: 500;
    margin-bottom: 2px;
  }
  .event-detail-meta dd { color: var(--text); margin: 0; }
  .event-detail-note {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.55;
    margin-bottom: 1.25rem;
  }
  .event-detail-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding-top: 1.25rem;
    border-top: 1px solid var(--border);
  }
  .badge-vote-open { background: var(--success-dim); color: var(--success); border: 1px solid rgba(34,211,160,0.2); }
  .badge-vote-upcoming { background: rgba(217, 119, 6, 0.12); color: var(--warning); border: 1px solid rgba(217, 119, 6, 0.2); }
  .badge-vote-ended { background: var(--surface3); color: var(--text-muted); border: 1px solid var(--border); }
  .badge-vote-always { background: var(--accent-dim); color: var(--accent); border: 1px solid rgba(37, 99, 235, 0.2); }

  .event-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 6px; min-width: 0; }
  .event-title { font-size: 15px; font-weight: 600; color: var(--text); min-width: 0; overflow-wrap: anywhere; }
  .event-badge {
    font-size: 11px;
    font-weight: 500;
    padding: 2px 9px;
    border-radius: 20px;
    flex-shrink: 0;
  }
  .badge-private { background: rgba(240,82,82,0.12); color: var(--danger); border: 1px solid rgba(240,82,82,0.2); }
  .badge-public { background: var(--success-dim); color: var(--success); border: 1px solid rgba(34,211,160,0.2); }

  .event-desc {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.55;
    margin-bottom: 1rem;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    word-break: break-word;
    max-width: 100%;
    min-width: 0;
  }

  .event-actions { display: flex; gap: 8px; flex-wrap: wrap; }

  .hint { font-size: 14px; color: var(--text-faint); text-align: center; padding: 2.5rem 1rem; }

  /* ── Divider ── */
  .divider { height: 1px; background: var(--border); margin: 1.75rem 0; }

  /* ── Forgot/Reset row ── */
  .auth-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.25rem;
    gap: 8px;
    font-size: 13px;
    color: var(--text-muted);
  }
`;function f(){return(0,t.jsx)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"})})}function x(){let e=(0,n.useRouter)(),o=(0,n.useSearchParams)(),d=(0,s.getPublicApiBase)(),c=(0,s.getUploadsOrigin)(),u=o.get("next")||"",x=o.get("eventId")||"",[b,v]=a.default.useState("boot"),[j,y]=a.default.useState(!1),[N,w]=a.default.useState(null),[k,E]=a.default.useState(null),[C,S]=a.default.useState(""),[_,A]=a.default.useState(""),[L,I]=a.default.useState(""),[O,T]=a.default.useState(""),[D,P]=a.default.useState(""),[R,U]=a.default.useState(""),[F,$]=a.default.useState(""),[B,z]=a.default.useState(""),[M,V]=a.default.useState(""),[q,H]=a.default.useState(""),[W,G]=a.default.useState(null),[Y,J]=a.default.useState(!1),[K,X]=a.default.useState([]),[Q,Z]=a.default.useState(""),[ee,et]=a.default.useState(""),[ea,en]=a.default.useState(""),[ei,er]=a.default.useState(null),[es,el]=a.default.useState(!1),[eo,ed]=a.default.useState(""),[ec,eu]=a.default.useState(""),[em,eh]=a.default.useState(!1),[ep,eg]=a.default.useState(null),[ef,ex]=a.default.useState("list"),[eb,ev]=a.default.useState(null),[ej,ey]=a.default.useState(!1),eN=a.default.useCallback(async()=>{let e=(0,r.readAdminToken)();if(!e)return;let t=await fetch(`${d}/admin/events`,{headers:{...(0,r.adminAuthHeader)(e)}}),a=await t.json().catch(()=>null);if(!t.ok){401===t.status&&(0,r.clearAdminSession)();return}X(Array.isArray(a?.events)?a.events:[])},[d]);a.default.useEffect(()=>{let e=!1,t=(0,r.readAdminToken)();return t?((async()=>{try{let a=await fetch(`${d}/admin/me`,{headers:{...(0,r.adminAuthHeader)(t)}});if(e)return;if(a.ok){v("dashboard"),await eN();return}if(401===a.status){(0,r.clearAdminSession)(),v("auth");return}(0,r.isAdminSessionValid)()?(v("dashboard"),await eN()):v("auth")}catch{if(e)return;(0,r.isAdminSessionValid)()?(v("dashboard"),await eN()):v("auth")}})(),()=>{e=!0}):void v("auth")},[d,eN]);let ew=a.default.useCallback((t,a)=>{ex(t),ev(a??null),ey(!1),w(null);let n=new URLSearchParams;"create"===t?n.set("screen","create"):"edit"===t&&a?(n.set("screen","edit"),n.set("eventId",String(a))):("categories"===t||"nominees"===t)&&a?(n.set("eventId",String(a)),n.set("panel",t)):"detail"===t&&a&&n.set("eventId",String(a));let r=n.toString();e.replace((0,i.withBasePath)(`/admin${r?`?${r}`:""}`),{scroll:!1})},[e]);a.default.useEffect(()=>{let e,t,a,n,i;if("dashboard"!==b)return;let r=(e=o.get("screen"),t=o.get("panel"),i=Number.isFinite(n=(a=o.get("eventId"))?Number(a):0)&&n>0?Math.floor(n):null,"create"===e?{screen:"create",eventId:null}:"edit"===e&&i?{screen:"edit",eventId:i}:i&&"categories"===t?{screen:"categories",eventId:i}:i&&"nominees"===t?{screen:"nominees",eventId:i}:i?{screen:"detail",eventId:i}:{screen:"list",eventId:null});ex(r.screen),ev(r.eventId)},[b,o]),a.default.useEffect(()=>{if("dashboard"!==b||"edit"!==ef||null==eb)return;let e=K.find(e=>e.event_id===eb);if(!e||ep===e.event_id)return;eg(e.event_id),Z((e.title||"").trim()),et((e.description||"").trim());let t=(e.image||"").trim();en(t),er(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),t?(0,l.resolveEventBannerUrl)(c,t):null)),el(!0===e.is_private||1===e.is_private),ed(h(e.start_time)),eu(h(e.end_time))},[b,ef,eb,K,ep,c]);let ek=a.default.useCallback(()=>{er(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null))},[]);function eE(){"/actions"===u&&x?e.push((0,i.withBasePath)(`/actions?eventId=${encodeURIComponent(x)}`)):u.startsWith("/")&&e.push((0,i.withBasePath)(u))}function eC(e){let t=e.trim().toLowerCase();return t?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)?null:"Enter a valid email address.":"Email is required."}function eS(e){return e?e.length<8?"Password must be at least 8 characters.":e.length>72?"Password must be at most 72 characters.":null:"Password is required."}function e_(){let e=R.trim();if(!e)return"Your name is required.";if(e.length>75)return"Name must be at most 75 characters.";let t=F.trim();if(!t)return"Organisation name is required.";if(t.length>100)return"Organisation name must be at most 100 characters.";let a=B.trim().replace(/\s/g,"");if(!/^\d{10,12}$/.test(a))return"Mobile must be 10–12 digits (numbers only).";let n=M.trim();return n?n.length>300?"Address must be at most 300 characters.":null:"Full address is required."}function eA(){let e=B.trim().replace(/\s/g,""),t={email:C.trim().toLowerCase(),password:_,name:R.trim(),organisation_name:F.trim(),mobile:e,full_address:M.trim()},a=q.trim();return a&&(t.logo=a),t}async function eL(e){J(!0),w(null);try{let t=new FormData;t.append("photo",e);let a=await fetch(`${c}/api/uploads/admin-logo`,{method:"POST",body:t}),n=await a.json().catch(()=>null);if(!a.ok)throw Error(n?.error||"UPLOAD_FAILED");let i=String(n?.filename||"").trim();if(!i)throw Error("UPLOAD_FAILED");H(i),G(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),`${c}/uploads/admin/${encodeURIComponent(i)}`))}catch(e){w(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{J(!1)}}async function eI(e){e.preventDefault(),y(!0),w(null);let t=eC(C);if(t){w(t),y(!1);return}let a=eS(_);if(a){w(a),y(!1);return}if(_!==L){w("Passwords do not match."),y(!1);return}let n=e_();if(n){w(n),y(!1);return}if(Y){w("Please wait for the logo upload to finish."),y(!1);return}try{let e=await fetch(`${d}/admin/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(eA())}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"REGISTER_FAILED");T(""),v("register-verify")}catch(e){w(e instanceof Error?e.message:"REGISTER_FAILED")}finally{y(!1)}}async function eO(e){e.preventDefault(),y(!0),w(null);let t=eC(C);if(t){w(t),y(!1);return}let a=O.trim();if(!/^\d{6}$/.test(a)){w("Enter the 6-digit OTP from your email."),y(!1);return}try{let e=await fetch(`${d}/admin/auth/verify-registration`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:C.trim().toLowerCase(),otp:a})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"VERIFY_FAILED");(0,r.writeAdminSession)(t.token,t.admin),A(""),I(""),T(""),v("dashboard"),await eN(),eE()}catch(e){w(e instanceof Error?e.message:"VERIFY_FAILED")}finally{y(!1)}}async function eT(){y(!0),w(null),E(null);let e=eC(C),t=eS(_),a=e_();if(e||t||a){w(e||t||a||"Complete the registration form first."),y(!1);return}try{let e=await fetch(`${d}/admin/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(eA())}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"RESEND_FAILED");E("A new OTP has been sent to your email.")}catch(e){w(e instanceof Error?e.message:"RESEND_FAILED")}finally{y(!1)}}async function eD(e){e.preventDefault(),y(!0),w(null);let t=eC(C);if(t){w(t),y(!1);return}let a=eS(_);if(a){w(a),y(!1);return}try{let e=await fetch(`${d}/admin/auth/sign-in`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:C.trim().toLowerCase(),password:_})}),t=await e.json().catch(()=>null);if(!e.ok)throw t?.error==="EMAIL_NOT_VERIFIED"&&v("register-verify"),Error(t?.message||t?.error||"SIGN_IN_FAILED");(0,r.writeAdminSession)(t.token,t.admin),A(""),v("dashboard"),await eN(),eE()}catch(e){w(e instanceof Error?e.message:"SIGN_IN_FAILED")}finally{y(!1)}}async function eP(e){e.preventDefault(),y(!0),w(null);try{let e=await fetch(`${d}/admin/auth/forgot-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:C.trim()})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"FORGOT_FAILED");v("reset")}catch(e){w(e instanceof Error?e.message:"FORGOT_FAILED")}finally{y(!1)}}async function eR(e){e.preventDefault(),y(!0),w(null);try{let e=await fetch(`${d}/admin/auth/reset-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:C.trim(),otp:O.trim(),newPassword:D})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"RESET_FAILED");(0,r.writeAdminSession)(t.token,t.admin),T(""),P(""),v("dashboard"),await eN(),eE()}catch(e){w(e instanceof Error?e.message:"RESET_FAILED")}finally{y(!1)}}function eU(){eg(null),Z(""),et(""),en(""),ek(),el(!1),ed(""),eu("")}function eF(){eU(),w(null),null!=ep?ew("detail",ep):ew("list")}async function e$(e){let t=(0,r.readAdminToken)();if(t){eh(!0),w(null);try{let a=new FormData;a.append("photo",e);let n=await fetch(`${c}/api/uploads/event-photo`,{method:"POST",body:a,headers:{...(0,r.adminAuthHeader)(t)}}),i=await n.json().catch(()=>null);if(!n.ok)throw Error(i?.error||"UPLOAD_FAILED");let s=String(i?.filename||"").trim();if(!s)throw Error("UPLOAD_FAILED");er(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),`${c}/uploads/event/${encodeURIComponent(s)}`)),en(s)}catch(e){w(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{eh(!1)}}}async function eB(e){e.preventDefault();let t=(0,r.readAdminToken)();if(t){if(eo&&!ec||!eo&&ec)return void w("Set both voting start and end, or leave both empty.");y(!0),w(null);try{let e=null!=ep,a=eo&&ec?{start_time:new Date(eo).toISOString(),end_time:new Date(ec).toISOString()}:e?{start_time:"",end_time:""}:{},n=e?{title:Q.trim(),description:ee.trim()||null,image:ea.trim()||null,is_private:+!!es,...a}:{title:Q.trim(),description:ee.trim()||void 0,image:ea.trim()||void 0,is_private:+!!es,...a},i=await fetch(e?`${d}/admin/events/${ep}`:`${d}/admin/events`,{method:e?"PATCH":"POST",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(t)},body:JSON.stringify(n)}),s=await i.json().catch(()=>null);if(!i.ok)throw Error(s?.message||s?.error||(e?"UPDATE_EVENT_FAILED":"CREATE_EVENT_FAILED"));let l=e?ep:Number(s?.event?.event_id??0)||null;eU(),await eN(),l?ew("detail",l):ew("list")}catch(e){w(e instanceof Error?e.message:"SAVE_EVENT_FAILED")}finally{y(!1)}}}if(a.default.useEffect(()=>()=>{er(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null))},[]),"dashboard"===b){let e,a,n,s,o,u,x,b,y,k=(0,r.readAdminToken)(),E=null!=eb?K.find(e=>e.event_id===eb)??null:null,C=(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsxs)("div",{className:"panel-title",children:[null!=ep?"Edit event":"New event",null!=ep&&(0,t.jsx)("span",{className:"panel-title-pill",children:"Editing"})]}),(0,t.jsxs)("form",{onSubmit:eB,children:[(0,t.jsxs)("div",{className:"row-mix",children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Event title *"}),(0,t.jsx)("input",{className:"input",required:!0,value:Q,onChange:e=>Z(e.target.value),maxLength:200,placeholder:"Enter event name"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Visibility"}),(0,t.jsxs)("label",{className:"toggle-field",children:[(0,t.jsx)("input",{type:"checkbox",className:"switch",role:"switch",checked:es,onChange:e=>el(e.target.checked),"aria-checked":es}),(0,t.jsx)("span",{className:"toggle-label",children:"Private (invite-only)"})]})]})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Description"}),(0,t.jsx)("textarea",{className:"input",value:ee,onChange:e=>et(e.target.value),maxLength:500,rows:2,placeholder:"Optional short description"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Banner image"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",disabled:em||j,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(er(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),URL.createObjectURL(t))),en(""),e$(t)),e.currentTarget.value=""}}),ei?(0,t.jsxs)("div",{className:"banner-preview",children:[(0,t.jsx)("img",{src:ei,alt:""}),(0,t.jsx)("span",{className:`banner-badge ${em?"badge-busy":ea?"badge-ok":"badge-preview"}`,children:em?"Uploading…":ea?"Banner ready":"Preview"})]}):null]}),(0,t.jsxs)("fieldset",{className:"fieldset",children:[(0,t.jsx)("legend",{className:"fieldset-legend",children:"Voting window"}),(0,t.jsx)("p",{className:"fieldset-hint",children:"Set both to restrict when votes count, or leave empty for open voting."}),(0,t.jsxs)("div",{className:"grid2",children:[(0,t.jsxs)("div",{className:"field",style:{margin:0},children:[(0,t.jsx)("div",{className:"label",children:"Start"}),(0,t.jsx)("input",{className:"input",type:"datetime-local",value:eo,onChange:e=>ed(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",style:{margin:0},children:[(0,t.jsx)("div",{className:"label",children:"End"}),(0,t.jsx)("input",{className:"input",type:"datetime-local",value:ec,onChange:e=>eu(e.target.value)})]})]})]}),(0,t.jsxs)("div",{className:"actions-row",children:[(0,t.jsx)("button",{type:"submit",className:"btn",disabled:j||em,children:j?"Saving…":null!=ep?"Save changes":"Create event"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",disabled:j||em,onClick:eF,children:"Cancel"})]})]})]}),S=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"section-head",children:[(0,t.jsx)("span",{className:"section-title",children:"Your events"}),(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:12},children:[(0,t.jsxs)("span",{style:{fontSize:13,color:"var(--text-faint)"},children:[K.length," total"]}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:function(){eU(),w(null),ew("create")},children:"Add event"})]})]}),0===K.length?(0,t.jsx)("p",{className:"hint",children:"No events yet — use Add event to create your first one."}):(0,t.jsx)("div",{className:"event-list",children:K.map(e=>{let a=(e.title||"").trim()||"Untitled",n=(e.description||"").trim(),i=(0,l.resolveEventBannerUrl)(c,e.image);return(0,t.jsx)("button",{type:"button",className:"event-card event-card-clickable",onClick:()=>ew("detail",e.event_id),children:(0,t.jsxs)("div",{className:"event-card-row",children:[i?(0,t.jsx)("img",{src:i,alt:"",className:"event-card-thumb"}):(0,t.jsx)("div",{className:"event-card-thumb-ph","aria-hidden":!0,children:a.slice(0,2).toUpperCase()}),(0,t.jsxs)("div",{className:"event-card-main",children:[(0,t.jsxs)("div",{className:"event-header",style:{marginBottom:4*!!n},children:[(0,t.jsx)("span",{className:"event-title",children:a}),(0,t.jsx)("span",{className:`event-badge ${!0===e.is_private||1===e.is_private?"badge-private":"badge-public"}`,children:!0===e.is_private||1===e.is_private?"Private":"Public"})]}),n?(0,t.jsx)("p",{className:"event-desc",style:{marginBottom:0},children:n}):null]}),(0,t.jsx)("span",{className:"event-card-chevron","aria-hidden":!0,children:"›"})]})},e.event_id)})})]}),_=E?(a=(E.title||"").trim()||"Untitled",n=(E.description||"").trim(),s=(0,l.resolveEventBannerUrl)(c,E.image),o=!0===E.is_private||1===E.is_private,u=function(e){let t=e.start_time,a=e.end_time;if(null==t||null==a||!String(t).trim()||!String(a).trim())return"always";let n=new Date(String(t)).getTime(),i=new Date(String(a)).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"always";let r=Date.now();return r<n?"upcoming":r>i?"ended":"open"}(E),x=p(E.start_time),b=p(E.end_time),y=!!(x&&b),(0,t.jsxs)("article",{className:"event-detail-panel",children:[s?(0,t.jsx)("img",{src:s,alt:"",className:"event-detail-banner"}):(0,t.jsx)("div",{className:"event-detail-banner-ph","aria-hidden":!0,children:a.slice(0,2).toUpperCase()}),(0,t.jsxs)("div",{className:"event-detail-body",children:[(0,t.jsxs)("div",{className:"event-detail-badges",children:[(0,t.jsx)("span",{className:`event-badge ${o?"badge-private":"badge-public"}`,children:o?"Private":"Public"}),(0,t.jsx)("span",{className:`event-badge ${"open"===u?"badge-vote-open":"upcoming"===u?"badge-vote-upcoming":"ended"===u?"badge-vote-ended":"badge-vote-always"}`,children:"open"===u?"Voting open":"upcoming"===u?"Voting soon":"ended"===u?"Voting ended":"Open voting"})]}),(0,t.jsx)("h1",{className:"event-detail-title",children:a}),n?(0,t.jsx)("p",{className:"event-desc",children:n}):null,y?(0,t.jsxs)("dl",{className:"event-detail-meta",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("dt",{children:"Voting starts"}),(0,t.jsx)("dd",{children:x})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("dt",{children:"Voting ends"}),(0,t.jsx)("dd",{children:b})]})]}):(0,t.jsx)("p",{className:"event-detail-note",children:"Voting window not set — votes count anytime."}),o?(0,t.jsx)("p",{className:"event-detail-note",children:"Invite-only event. Share the register link below with attendees."}):null,(0,t.jsxs)("div",{className:"event-detail-actions",children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>{let e;return eg(E.event_id),Z((E.title||"").trim()),et((E.description||"").trim()),void(en(e=(E.image||"").trim()),er(t=>(t?.startsWith("blob:")&&URL.revokeObjectURL(t),e?(0,l.resolveEventBannerUrl)(c,e):null)),el(!0===E.is_private||1===E.is_private),ed(h(E.start_time)),eu(h(E.end_time)),w(null),ew("edit",E.event_id))},children:"Edit event"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>ew("categories",E.event_id),children:"Categories"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>ew("nominees",E.event_id),children:"Nominees"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,i.withBasePath)(`/awards_f/actions?eventId=${E.event_id}`),style:{textDecoration:"none"},children:"LED controls"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,i.withBasePath)(`/awards_f/screen?eventId=${E.event_id}`),target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"Open LED screen"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>{var e;navigator.clipboard.writeText((e=E.event_id,`${window.location.origin}${(0,i.withBasePath)(`/register?eventId=${e}`)}`)),ey(!0),window.setTimeout(()=>ey(!1),2e3)},children:ej?"Link copied":"Copy register link"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,i.withBasePath)(`/events/${E.event_id}`),target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"Public event page"})]})]})]})):(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("p",{className:"hint",style:{padding:"1rem 0"},children:"Event not found."}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>ew("list"),children:"Back to your events"})]});if("create"===ef)e=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)("button",{type:"button",className:"back-link",onClick:()=>ew("list"),children:"← Your events"})}),C]});else if("edit"===ef)e=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)("button",{type:"button",className:"back-link",onClick:()=>eF(),children:"← Event details"})}),E?C:(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("p",{className:"hint",style:{padding:"1rem 0"},children:"Event not found."}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>ew("list"),children:"Back to your events"})]})]});else if("detail"===ef)e=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)("button",{type:"button",className:"back-link",onClick:()=>ew("list"),children:"← Your events"})}),_]});else if(("categories"===ef||"nominees"===ef)&&null!=eb){let a=K.find(e=>e.event_id===eb),n=(0,r.readAdminToken)();e=a&&n?(0,t.jsx)(m,{mode:ef,eventId:eb,eventTitle:(a.title||"").trim()||"Untitled",apiBase:d,apiOrigin:c,token:n,onBack:()=>ew("detail",eb),onGoCategories:()=>ew("categories",eb)}):(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("p",{className:"hint",style:{padding:"1rem 0"},children:"Event not found."}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>ew("list"),children:"Back to your events"})]})}else e=S;return(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:g}),(0,t.jsxs)("div",{className:"dashboard",children:[(0,t.jsxs)("div",{className:"topbar",children:[(0,t.jsxs)("div",{className:"topbar-brand",children:[(0,t.jsx)("div",{className:"topbar-icon",children:(0,t.jsx)(f,{})}),(0,t.jsx)("span",{className:"topbar-title",children:"Event Admin"})]}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:function(){(0,r.clearAdminSession)(),v("auth"),X([])},children:"Log out"})]}),N&&(0,t.jsx)("div",{className:"error-box",children:N}),e,!k&&(0,t.jsx)("p",{className:"error-box",style:{marginTop:16},children:"Session missing — please log in again."})]})]})}return"forgot"===b?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:g}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(f,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Forgot password"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Enter your email and we'll send a 6-digit OTP."}),N&&(0,t.jsx)("div",{className:"error-box",children:N}),(0,t.jsxs)("form",{onSubmit:eP,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:C,onChange:e=>S(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:j,children:j?"Sending…":"Send OTP"})]}),(0,t.jsx)("div",{className:"auth-footer",children:(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>v("auth"),children:"← Back to sign in"})})]})})]}):"register"===b?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:g}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card auth-card-wide",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(f,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Create account"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Fill in your details. We will email a one-time code to verify your account."}),N&&(0,t.jsx)("div",{className:"error-box",children:N}),(0,t.jsxs)("form",{onSubmit:eI,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Your name *"}),(0,t.jsx)("input",{className:"input",required:!0,value:R,onChange:e=>U(e.target.value),placeholder:"Full name",maxLength:75,autoComplete:"name"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Organisation name *"}),(0,t.jsx)("input",{className:"input",required:!0,value:F,onChange:e=>$(e.target.value),placeholder:"Company or organisation",maxLength:100,autoComplete:"organization"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Mobile *"}),(0,t.jsx)("input",{className:"input",type:"tel",required:!0,value:B,onChange:e=>z(e.target.value.replace(/[^\d\s]/g,"").slice(0,12)),placeholder:"10–12 digit mobile number",inputMode:"numeric",autoComplete:"tel"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Full address *"}),(0,t.jsx)("textarea",{className:"input",required:!0,value:M,onChange:e=>V(e.target.value),placeholder:"Street, city, state, PIN",maxLength:300,rows:2,autoComplete:"street-address"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Organisation logo (optional)"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",disabled:j||Y,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(G(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),URL.createObjectURL(t))),H(""),eL(t)),e.currentTarget.value=""}}),W?(0,t.jsxs)("div",{className:"banner-preview",style:{marginTop:10},children:[(0,t.jsx)("img",{src:W,alt:"",style:{height:80,objectFit:"contain",background:"#f8fafc"}}),(0,t.jsx)("span",{className:`banner-badge ${Y?"badge-busy":q?"badge-ok":"badge-preview"}`,children:Y?"Uploading…":q?"Logo ready":"Preview"})]}):null]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email *"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,autoComplete:"email",value:C,onChange:e=>S(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Password *"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"new-password",value:_,onChange:e=>A(e.target.value),placeholder:"At least 8 characters",minLength:8,maxLength:72})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Confirm password *"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"new-password",value:L,onChange:e=>I(e.target.value),placeholder:"Re-enter password",minLength:8,maxLength:72})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:j||Y,children:j?"Sending OTP…":"Send OTP"})]}),(0,t.jsx)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{w(null),v("auth")},children:"Already have an account? Sign in"})})]})})]}):"register-verify"===b?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:g}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(f,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Verify your email"}),(0,t.jsxs)("div",{className:"auth-subtitle",children:["Enter the 6-digit OTP sent to ",(0,t.jsx)("strong",{children:C.trim()||"your email"}),"."]}),N&&(0,t.jsx)("div",{className:"error-box",children:N}),k&&(0,t.jsx)("div",{className:"info-box",children:k}),(0,t.jsxs)("form",{onSubmit:eO,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:C,onChange:e=>S(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"OTP"}),(0,t.jsx)("input",{className:"input",required:!0,value:O,onChange:e=>T(e.target.value.replace(/\D/g,"").slice(0,6)),placeholder:"6-digit code",inputMode:"numeric",maxLength:6,pattern:"\\d{6}"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:j,children:j?"Verifying…":"Verify & continue"})]}),(0,t.jsxs)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:[(0,t.jsx)("button",{type:"button",className:"link-btn",disabled:j,onClick:()=>void eT(),children:"Resend OTP"}),(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{w(null),v("register")},children:"← Back to register"})]})]})})]}):"reset"===b?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:g}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(f,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Reset password"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Enter the OTP from your email and choose a new password."}),N&&(0,t.jsx)("div",{className:"error-box",children:N}),(0,t.jsxs)("form",{onSubmit:eR,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:C,onChange:e=>S(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"OTP"}),(0,t.jsx)("input",{className:"input",required:!0,value:O,onChange:e=>T(e.target.value),placeholder:"6-digit code",inputMode:"numeric",maxLength:6})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"New password"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,value:D,onChange:e=>P(e.target.value),placeholder:"At least 8 characters"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:j,children:j?"Saving…":"Reset & sign in"})]})]})})]}):"boot"===b?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:g}),(0,t.jsx)("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text-muted)",fontFamily:"var(--font)",fontSize:14},children:"Checking session…"})]}):(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:g}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(f,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Welcome back"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Sign in to manage your events."}),N&&(0,t.jsx)("div",{className:"error-box",children:N}),(0,t.jsxs)("form",{onSubmit:eD,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,autoComplete:"email",value:C,onChange:e=>S(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Password"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"current-password",value:_,onChange:e=>A(e.target.value),placeholder:"Min 8 characters",minLength:8,maxLength:72})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:j,children:j?"Please wait…":"Sign in"})]}),(0,t.jsxs)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:[(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{w(null),v("forgot")},children:"Forgot password?"}),(0,t.jsxs)("span",{style:{color:"var(--text-muted)"},children:["Don't have an account?"," ",(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:function(){w(null),I(""),T(""),U(""),$(""),z(""),V(""),H(""),G(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null)),v("register")},children:"Register"})]})]})]})})]})}e.s(["default",0,function(){return(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{style:{minHeight:"100vh",background:"#e8f0fe",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b",fontFamily:"sans-serif",fontSize:14},children:"Loading…"}),children:(0,t.jsx)(x,{})})}],72906)}]);