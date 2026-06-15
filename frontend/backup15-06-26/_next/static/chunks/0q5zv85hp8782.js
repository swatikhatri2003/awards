(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,72906,e=>{"use strict";var t=e.i(43476),a=e.i(71645),n=e.i(18566),i=e.i(37645),r=e.i(90165),s=e.i(82608),l=e.i(86347),o=e.i(11688);function d(e){return(0,t.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:(0,t.jsx)("path",{d:"M18 6L6 18M6 6l12 12",strokeLinecap:"round"})})}function c(e){let{title:n,titleId:i="admin-modal-title",wide:r,onClose:s,footer:l,children:c}=e;return a.default.useEffect(()=>{let e=e=>{"Escape"===e.key&&s()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[s]),(0,t.jsx)("div",{className:o.default.adminModalBackdrop,role:"presentation",onClick:s,children:(0,t.jsxs)("div",{className:`${o.default.adminModal} ${r?o.default.adminModalWide:""}`,role:"dialog","aria-modal":"true","aria-labelledby":i,onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:o.default.adminModalHead,children:[(0,t.jsx)("h2",{id:i,className:o.default.adminModalTitle,children:n}),(0,t.jsx)("button",{type:"button",className:o.default.adminIconBtn,onClick:s,"aria-label":"Close",children:(0,t.jsx)(d,{})})]}),c,l?(0,t.jsx)("div",{className:o.default.adminModalFooter,children:l}):null]})})}function m(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,t.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}function u(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M10 11v6M14 11v6",strokeLinecap:"round"})]})}let h=()=>({name:"",photo:"",description:"",category_id:0});function p(e){let n,i,{mode:s,eventId:d,eventTitle:p,apiBase:g,apiOrigin:f,token:v,onBack:b,onGoCategories:x}=e,[j,y]=a.default.useState([]),[N,w]=a.default.useState([]),[E,k]=a.default.useState(!1),[S,C]=a.default.useState(null),[_,A]=a.default.useState(null),[L,T]=a.default.useState(""),[D,I]=a.default.useState(null),[O,P]=a.default.useState(h),[$,F]=a.default.useState("all"),[R,U]=a.default.useState(""),[B,M]=a.default.useState(null),[z,V]=a.default.useState(!1),H=a.default.useMemo(()=>{let e=new Map;for(let t of j)e.set(t.category_id,t);return e},[j]),q=a.default.useCallback(async()=>{k(!0),C(null);try{let e=(0,r.adminAuthHeader)(v),[t,a]=await Promise.all([fetch(`${g}/categories?eventId=${d}`),fetch(`${g}/nominees?eventId=${d}`,{headers:{...e}})]),n=await t.json().catch(()=>null),i=await a.json().catch(()=>null);if(!t.ok)throw Error(n?.error||"CATEGORIES_FAILED");if(!a.ok)throw Error(i?.error||"NOMINEES_FAILED");let s=Array.isArray(n?.categories)?n.categories:[],l=s.some(e=>e?.event_id!=null&&Number.isFinite(Number(e.event_id)))?s.filter(e=>Number(e?.event_id)===d):s;y(l),w(Array.isArray(i?.nominees)?i.nominees:[])}catch(e){C(e instanceof Error?e.message:"ADMIN_LOAD_FAILED")}finally{k(!1)}},[d,g,v]);a.default.useEffect(()=>{q()},[q]);let W=a.default.useMemo(()=>{let e=R.trim().toLowerCase();return N.filter(t=>{if("all"!==$&&Number(t.category_id)!==$)return!1;if(!e)return!0;let a=(H.get(Number(t.category_id))?.name||"").toLowerCase(),n=(t.name||"").toLowerCase(),i=(t.description||"").toLowerCase();return n.includes(e)||i.includes(e)||a.includes(e)}).slice().sort((e,t)=>Number(e.category_id)-Number(t.category_id)||Number(e.nominee_id)-Number(t.nominee_id))},[N,$,R,H]),G=a.default.useCallback(()=>{M(e=>(e&&URL.revokeObjectURL(e),null))},[]);function J(){A(null),T("")}function Y(){G(),I(null),P(h())}async function K(){let e=L.trim();if(e){k(!0),C(null);try{if(_?.mode==="add"){let t=await fetch(`${g}/admin/categories`,{method:"POST",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(v)},body:JSON.stringify({name:e,eventId:d})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"CREATE_CATEGORY_FAILED")}else if(_?.mode==="edit"){let t=await fetch(`${g}/admin/categories/${_.categoryId}?eventId=${d}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(v)},body:JSON.stringify({name:e})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"UPDATE_CATEGORY_FAILED")}J(),await q()}catch(e){C(e instanceof Error?e.message:"SAVE_CATEGORY_FAILED")}finally{k(!1)}}}async function X(e,t){let a=t.trim()||"this category";if(window.confirm(`Delete "${a}" and all its nominees? This cannot be undone.`)){k(!0),C(null);try{let t=await fetch(`${g}/admin/categories/${e}?eventId=${d}`,{method:"DELETE",headers:{...(0,r.adminAuthHeader)(v)}}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"DELETE_CATEGORY_FAILED");_?.mode==="edit"&&_.categoryId===e&&J(),await q()}catch(e){C(e instanceof Error?e.message:"DELETE_CATEGORY_FAILED")}finally{k(!1)}}}async function Q(){let e=O.name.trim();if(e&&O.category_id){k(!0),C(null);try{if(D?.mode==="add"){let t=await fetch(`${g}/admin/nominees?eventId=${d}`,{method:"POST",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(v)},body:JSON.stringify({name:e,photo:O.photo.trim(),description:O.description.trim()||void 0,category_id:O.category_id})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"SAVE_NOMINEE_FAILED")}else if(D?.mode==="edit"){let t=await fetch(`${g}/admin/nominees/${D.nomineeId}?eventId=${d}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(v)},body:JSON.stringify({name:e,photo:O.photo.trim(),description:O.description.trim()||null,category_id:O.category_id})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"SAVE_NOMINEE_FAILED")}Y(),await q()}catch(e){C(e instanceof Error?e.message:"SAVE_NOMINEE_FAILED")}finally{k(!1)}}}async function Z(e,t){let a=t.trim()||"this nominee";if(window.confirm(`Delete "${a}"? Votes for this nominee will be removed.`)){k(!0),C(null);try{let t=await fetch(`${g}/admin/nominees/${e}?eventId=${d}`,{method:"DELETE",headers:{...(0,r.adminAuthHeader)(v)}}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"DELETE_NOMINEE_FAILED");D?.mode==="edit"&&D.nomineeId===e&&Y(),await q()}catch(e){C(e instanceof Error?e.message:"DELETE_NOMINEE_FAILED")}finally{k(!1)}}}async function ee(e,t){k(!0),C(null);try{let a=await fetch(`${g}/admin/nominees/${e.nominee_id}?eventId=${d}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(v)},body:JSON.stringify({is_approved:+!!t})}),n=await a.json().catch(()=>null);if(!a.ok)throw Error(n?.error||"APPROVAL_UPDATE_FAILED");await q()}catch(e){C(e instanceof Error?e.message:"APPROVAL_UPDATE_FAILED")}finally{k(!1)}}async function et(e){V(!0),C(null);try{let t=new FormData;t.append("photo",e);let a=await fetch(`${g}/uploads/nominee-photo`,{method:"POST",body:t}),n=await a.json().catch(()=>null);if(!a.ok)throw Error(n?.error||"PHOTO_UPLOAD_FAILED");let i=String(n?.filename||"");if(!i)throw Error("PHOTO_UPLOAD_FAILED");G(),P(e=>({...e,photo:i}))}catch(e){C(e instanceof Error?e.message:"PHOTO_UPLOAD_FAILED")}finally{V(!1)}}a.default.useEffect(()=>()=>G(),[G]);let ea=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Category *"}),(0,t.jsx)("select",{className:"input",value:O.category_id||"",onChange:e=>P(t=>({...t,category_id:Number(e.target.value)})),disabled:E||0===j.length,required:!0,children:0===j.length?(0,t.jsx)("option",{value:"",children:"No categories — add one first"}):j.map(e=>(0,t.jsx)("option",{value:e.category_id,children:e.name},e.category_id))})]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Name *"}),(0,t.jsx)("input",{className:"input",value:O.name,onChange:e=>P(t=>({...t,name:e.target.value})),placeholder:"Nominee name",disabled:E})]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Photo"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",onChange:e=>{let t=e.currentTarget.files?.[0];t&&(M(e=>(e&&URL.revokeObjectURL(e),URL.createObjectURL(t))),et(t))},disabled:E||z}),z?(0,t.jsx)("p",{className:"hint",style:{marginTop:8},children:"Uploading…"}):null,(n=O.photo.trim()?(0,l.resolveNomineePhotoUrl)(f,O.photo):"",(i=B||n)?(0,t.jsx)("div",{style:{marginTop:10},children:(0,t.jsx)("img",{className:o.default.previewPhoto,src:i,alt:""})}):null)]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Description (optional)"}),(0,t.jsx)("textarea",{className:"input",value:O.description,onChange:e=>P(t=>({...t,description:e.target.value})),placeholder:"Short description",style:{minHeight:88,resize:"vertical"},disabled:E})]})]});return(0,t.jsxs)("div",{className:"panel",style:{marginBottom:"2rem"},children:[(0,t.jsx)("div",{className:"back-row",style:{marginBottom:"1rem"},children:(0,t.jsx)("button",{type:"button",className:"back-link",onClick:b,children:"← Event details"})}),(0,t.jsxs)("div",{className:o.default.adminCatToolbar,style:{marginBottom:14},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"panel-title",style:{marginBottom:4},children:"categories"===s?"Categories":"Nominees"}),(0,t.jsx)("p",{style:{fontSize:13,color:"var(--text-muted)",margin:0},children:p})]}),(0,t.jsx)("span",{style:{fontSize:13,color:"var(--text-faint)"},children:E?"Loading…":"categories"===s?`${j.length} categories`:`${W.length}${"all"!==$||R.trim()?` of ${N.length}`:""} nominees`})]}),S?(0,t.jsx)("div",{className:"error-box",style:{marginBottom:12},children:S}):null,"categories"===s?(0,t.jsxs)("div",{className:o.default.adminCategoriesBlock,style:{marginTop:0},children:[(0,t.jsxs)("div",{className:o.default.adminCatToolbar,children:[(0,t.jsx)("span",{className:"section-title",style:{marginBottom:0,fontSize:13,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--text-muted)"},children:"All categories"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:function(){T(""),A({mode:"add"})},disabled:E,children:"Add category"})]}),0!==j.length||E?null:(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"1rem 0"},children:"No categories yet — use Add category."}),(0,t.jsx)("div",{className:o.default.adminCategoryList,children:j.map(e=>(0,t.jsx)("div",{className:o.default.adminCategoryRow,children:(0,t.jsxs)("div",{className:o.default.adminCategoryRowMain,children:[(0,t.jsxs)("div",{className:o.default.adminRowIconGroup,children:[(0,t.jsx)("button",{type:"button",className:`${o.default.adminIconBtn} ${o.default.adminIconBtnDanger}`,onClick:()=>void X(e.category_id,e.name),disabled:E,"aria-label":`Delete ${e.name}`,title:"Delete category",children:(0,t.jsx)(u,{})}),(0,t.jsx)("button",{type:"button",className:o.default.adminIconBtn,onClick:()=>{T(e.name||""),A({mode:"edit",categoryId:e.category_id})},"aria-label":"Edit category",title:"Edit category",children:(0,t.jsx)(m,{})})]}),(0,t.jsxs)("div",{className:o.default.adminCategoryTitleWrap,children:[(0,t.jsx)("span",{style:{fontSize:15,fontWeight:600,whiteSpace:"normal"},children:e.name}),e.winner_nominee_id?(0,t.jsx)("span",{className:"event-badge badge-public",style:{marginLeft:8},children:"Winner set"}):null]})]})},e.category_id))})]}):(0,t.jsx)("div",{className:o.default.adminCategoriesBlock,style:{marginTop:0},children:0!==j.length||E?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:o.default.adminNomineeToolbar,children:[(0,t.jsx)("input",{className:`input ${o.default.adminNomineeToolbarSearch}`,type:"search",placeholder:"Search nominees…",value:R,onChange:e=>U(e.target.value),"aria-label":"Search nominees"}),(0,t.jsxs)("select",{className:`input ${o.default.adminNomineeToolbarSelect}`,value:"all"===$?"all":String($),onChange:e=>{let t=e.target.value;F("all"===t?"all":Number(t))},"aria-label":"Filter by category",children:[(0,t.jsx)("option",{value:"all",children:"All categories"}),j.map(e=>(0,t.jsx)("option",{value:e.category_id,children:e.name},e.category_id))]}),(0,t.jsx)("button",{type:"button",className:`btn ${o.default.adminNomineeToolbarAdd}`,onClick:function(){G();let e=j[0]?.category_id??0;P({...h(),category_id:e}),I({mode:"add"})},disabled:E,children:"Add nominee"})]}),0!==W.length||E?(0,t.jsx)("div",{className:o.default.adminNomineeListFlat,children:W.map(e=>{let a=(0,l.resolveNomineePhotoUrl)(f,e.photo),n=H.get(Number(e.category_id))?.name||"Category",i=!0===e.is_approved||1===e.is_approved;return(0,t.jsx)("div",{className:o.default.adminNomineeCard,children:(0,t.jsxs)("div",{className:o.default.adminNomineeCardRead,children:[(0,t.jsxs)("label",{className:o.default.adminApproveSwitch,title:i?"Approved":"Unapproved",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:i,disabled:E,onChange:t=>void ee(e,t.target.checked),"aria-label":i?`Unapprove ${e.name}`:`Approve ${e.name}`}),(0,t.jsx)("span",{className:o.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:i?"Approved":"Pending"})]}),(0,t.jsxs)("div",{className:o.default.adminRowIconGroup,children:[(0,t.jsx)("button",{type:"button",className:`${o.default.adminIconBtn} ${o.default.adminIconBtnDanger}`,onClick:()=>void Z(e.nominee_id,e.name),disabled:E,"aria-label":`Delete ${e.name}`,title:"Delete nominee",children:(0,t.jsx)(u,{})}),(0,t.jsx)("button",{type:"button",className:o.default.adminIconBtn,onClick:()=>{G(),P({name:e.name||"",photo:e.photo||"",description:e.description||"",category_id:Number(e.category_id)}),I({mode:"edit",nomineeId:e.nominee_id})},"aria-label":`Edit ${e.name}`,title:"Edit nominee",children:(0,t.jsx)(m,{})})]}),(0,t.jsxs)("div",{className:o.default.adminNomineeCardLeft,children:[a?(0,t.jsx)("img",{className:o.default.adminNomineeCardPhoto,src:a,alt:""}):(0,t.jsx)("div",{className:o.default.adminNomineeCardPhotoPlaceholder,"aria-hidden":!0}),(0,t.jsxs)("div",{className:o.default.adminNomineeCardText,children:[(0,t.jsxs)("div",{style:{fontSize:15,fontWeight:600,whiteSpace:"normal"},children:[e.name,(0,t.jsx)("span",{className:i?o.default.adminBadgeApproved:o.default.adminBadgePending,children:i?"Approved":"Pending"})]}),(0,t.jsx)("p",{className:o.default.adminNomineeMeta,children:n}),e.description?(0,t.jsx)("p",{className:o.default.adminNomineeDesc,children:e.description}):(0,t.jsx)("p",{className:"hint",style:{margin:"6px 0 0"},children:"No description"})]})]})]})},e.nominee_id)})}):(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"1rem 0"},children:0===N.length?"No nominees yet — use Add nominee.":"No nominees match your search or filter."})]}):(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"0.5rem 0 1rem"},children:"Add categories first, then add nominees."}),x?(0,t.jsx)("button",{type:"button",className:"btn",onClick:x,children:"Go to categories"}):null]})}),_?(0,t.jsx)(c,{title:"add"===_.mode?"Add category":"Edit category",onClose:J,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:J,disabled:E,children:"Cancel"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:()=>void K(),disabled:E||!L.trim(),children:"add"===_.mode?"Add category":"Save changes"})]}),children:(0,t.jsxs)("div",{className:"field",style:{marginBottom:0},children:[(0,t.jsx)("div",{className:"label",children:"Category name *"}),(0,t.jsx)("input",{className:"input",value:L,onChange:e=>T(e.target.value),placeholder:"Category name",disabled:E,onKeyDown:e=>{"Enter"===e.key&&K()}})]})}):null,D?(0,t.jsx)(c,{wide:!0,title:"add"===D.mode?"Add nominee":"Edit nominee",onClose:Y,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:Y,disabled:E,children:"Cancel"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:()=>void Q(),disabled:E||!O.name.trim()||!O.category_id,children:"add"===D.mode?"Add nominee":"Save changes"})]}),children:ea}):null]})}function g(e){if(null==e||""===e)return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let a=e=>String(e).padStart(2,"0");return`${t.getFullYear()}-${a(t.getMonth()+1)}-${a(t.getDate())}T${a(t.getHours())}:${a(t.getMinutes())}`}function f(e){if(null==e||""===String(e).trim())return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"})}let v=`
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

  .event-card-wrap {
    display: flex;
    align-items: stretch;
    gap: 8px;
  }
  .event-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    flex-shrink: 0;
    align-self: center;
    padding: 0;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    background: var(--surface2);
    color: var(--text-muted);
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .event-icon-btn:hover:not(:disabled) { border-color: var(--border-hover); background: var(--surface3); }
  .event-icon-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .event-icon-btn--danger {
    color: var(--danger);
    background: var(--danger-dim);
    border-color: rgba(220, 38, 38, 0.25);
  }
  .event-icon-btn--danger:hover:not(:disabled) {
    background: var(--danger);
    border-color: var(--danger);
    color: #fff;
  }

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
`;function b(){return(0,t.jsx)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"})})}function x(){let e=(0,n.useRouter)(),o=(0,n.useSearchParams)(),d=(0,s.getPublicApiBase)(),m=(0,s.getUploadsOrigin)(),u=o.get("next")||"",h=o.get("eventId")||"",[x,j]=a.default.useState("boot"),[y,N]=a.default.useState(!1),[w,E]=a.default.useState(null),[k,S]=a.default.useState(null),[C,_]=a.default.useState(""),[A,L]=a.default.useState(""),[T,D]=a.default.useState(""),[I,O]=a.default.useState(""),[P,$]=a.default.useState(""),[F,R]=a.default.useState(""),[U,B]=a.default.useState(""),[M,z]=a.default.useState(""),[V,H]=a.default.useState(""),[q,W]=a.default.useState(""),[G,J]=a.default.useState(null),[Y,K]=a.default.useState(!1),[X,Q]=a.default.useState([]),[Z,ee]=a.default.useState(""),[et,ea]=a.default.useState(""),[en,ei]=a.default.useState(""),[er,es]=a.default.useState(null),[el,eo]=a.default.useState(!1),[ed,ec]=a.default.useState(""),[em,eu]=a.default.useState(""),[eh,ep]=a.default.useState(!1),[eg,ef]=a.default.useState(null),[ev,eb]=a.default.useState("list"),[ex,ej]=a.default.useState(null),[ey,eN]=a.default.useState(!1),[ew,eE]=a.default.useState(null),ek=a.default.useCallback(async()=>{let e=(0,r.readAdminToken)();if(!e)return;let t=await fetch(`${d}/admin/events`,{headers:{...(0,r.adminAuthHeader)(e)}}),a=await t.json().catch(()=>null);if(!t.ok){401===t.status&&(0,r.clearAdminSession)();return}Q(Array.isArray(a?.events)?a.events:[])},[d]);a.default.useEffect(()=>{let e=!1,t=(0,r.readAdminToken)();return t?((async()=>{try{let a=await fetch(`${d}/admin/me`,{headers:{...(0,r.adminAuthHeader)(t)}});if(e)return;if(a.ok){j("dashboard"),await ek();return}if(401===a.status){(0,r.clearAdminSession)(),j("auth");return}(0,r.isAdminSessionValid)()?(j("dashboard"),await ek()):j("auth")}catch{if(e)return;(0,r.isAdminSessionValid)()?(j("dashboard"),await ek()):j("auth")}})(),()=>{e=!0}):void j("auth")},[d,ek]);let eS=a.default.useCallback((t,a)=>{eb(t),ej(a??null),eN(!1),E(null);let n=new URLSearchParams;"create"===t?n.set("screen","create"):"edit"===t&&a?(n.set("screen","edit"),n.set("eventId",String(a))):("categories"===t||"nominees"===t)&&a?(n.set("eventId",String(a)),n.set("panel",t)):"detail"===t&&a&&n.set("eventId",String(a));let r=n.toString();e.replace((0,i.withBasePath)(`/admin${r?`?${r}`:""}`),{scroll:!1})},[e]);a.default.useEffect(()=>{let e,t,a,n,i;if("dashboard"!==x)return;let r=(e=o.get("screen"),t=o.get("panel"),i=Number.isFinite(n=(a=o.get("eventId"))?Number(a):0)&&n>0?Math.floor(n):null,"create"===e?{screen:"create",eventId:null}:"edit"===e&&i?{screen:"edit",eventId:i}:i&&"categories"===t?{screen:"categories",eventId:i}:i&&"nominees"===t?{screen:"nominees",eventId:i}:i?{screen:"detail",eventId:i}:{screen:"list",eventId:null}),s=o.get("screen");eb("create"===s?"list":"edit"===s&&r.eventId?"detail":r.screen),ej(r.eventId),"create"===s?eE("create"):"edit"===s&&r.eventId&&eE("edit")},[x,o]),a.default.useEffect(()=>{if("dashboard"!==x||"edit"!==ew||null==ex)return;let e=X.find(e=>e.event_id===ex);if(!e||eg===e.event_id)return;ef(e.event_id),ee((e.title||"").trim()),ea((e.description||"").trim());let t=(e.image||"").trim();ei(t),es(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),t?(0,l.resolveEventBannerUrl)(m,t):null)),eo(!0===e.is_private||1===e.is_private),ec(g(e.start_time)),eu(g(e.end_time))},[x,ew,ex,X,eg,m]);let eC=a.default.useCallback(()=>{es(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null))},[]);function e_(){"/actions"===u&&h?e.push((0,i.withBasePath)(`/actions?eventId=${encodeURIComponent(h)}`)):u.startsWith("/")&&e.push((0,i.withBasePath)(u))}function eA(e){let t=e.trim().toLowerCase();return t?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)?null:"Enter a valid email address.":"Email is required."}function eL(e){return e?e.length<8?"Password must be at least 8 characters.":e.length>72?"Password must be at most 72 characters.":null:"Password is required."}function eT(){let e=F.trim();if(!e)return"Your name is required.";if(e.length>75)return"Name must be at most 75 characters.";let t=U.trim();if(!t)return"Organisation name is required.";if(t.length>100)return"Organisation name must be at most 100 characters.";let a=M.trim().replace(/\s/g,"");if(!/^\d{10,12}$/.test(a))return"Mobile must be 10–12 digits (numbers only).";let n=V.trim();return n?n.length>300?"Address must be at most 300 characters.":null:"Full address is required."}function eD(){let e=M.trim().replace(/\s/g,""),t={email:C.trim().toLowerCase(),password:A,name:F.trim(),organisation_name:U.trim(),mobile:e,full_address:V.trim()},a=q.trim();return a&&(t.logo=a),t}async function eI(e){K(!0),E(null);try{let t=new FormData;t.append("photo",e);let a=await fetch(`${m}/api/uploads/admin-logo`,{method:"POST",body:t}),n=await a.json().catch(()=>null);if(!a.ok)throw Error(n?.error||"UPLOAD_FAILED");let i=String(n?.filename||"").trim();if(!i)throw Error("UPLOAD_FAILED");W(i),J(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),`${m}/uploads/admin/${encodeURIComponent(i)}`))}catch(e){E(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{K(!1)}}async function eO(e){e.preventDefault(),N(!0),E(null);let t=eA(C);if(t){E(t),N(!1);return}let a=eL(A);if(a){E(a),N(!1);return}if(A!==T){E("Passwords do not match."),N(!1);return}let n=eT();if(n){E(n),N(!1);return}if(Y){E("Please wait for the logo upload to finish."),N(!1);return}try{let e=await fetch(`${d}/admin/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(eD())}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"REGISTER_FAILED");O(""),j("register-verify")}catch(e){E(e instanceof Error?e.message:"REGISTER_FAILED")}finally{N(!1)}}async function eP(e){e.preventDefault(),N(!0),E(null);let t=eA(C);if(t){E(t),N(!1);return}let a=I.trim();if(!/^\d{6}$/.test(a)){E("Enter the 6-digit OTP from your email."),N(!1);return}try{let e=await fetch(`${d}/admin/auth/verify-registration`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:C.trim().toLowerCase(),otp:a})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"VERIFY_FAILED");(0,r.writeAdminSession)(t.token,t.admin),L(""),D(""),O(""),j("dashboard"),await ek(),e_()}catch(e){E(e instanceof Error?e.message:"VERIFY_FAILED")}finally{N(!1)}}async function e$(){N(!0),E(null),S(null);let e=eA(C),t=eL(A),a=eT();if(e||t||a){E(e||t||a||"Complete the registration form first."),N(!1);return}try{let e=await fetch(`${d}/admin/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(eD())}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"RESEND_FAILED");S("A new OTP has been sent to your email.")}catch(e){E(e instanceof Error?e.message:"RESEND_FAILED")}finally{N(!1)}}async function eF(e){e.preventDefault(),N(!0),E(null);let t=eA(C);if(t){E(t),N(!1);return}let a=eL(A);if(a){E(a),N(!1);return}try{let e=await fetch(`${d}/admin/auth/sign-in`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:C.trim().toLowerCase(),password:A})}),t=await e.json().catch(()=>null);if(!e.ok)throw t?.error==="EMAIL_NOT_VERIFIED"&&j("register-verify"),Error(t?.message||t?.error||"SIGN_IN_FAILED");(0,r.writeAdminSession)(t.token,t.admin),L(""),j("dashboard"),await ek(),e_()}catch(e){E(e instanceof Error?e.message:"SIGN_IN_FAILED")}finally{N(!1)}}async function eR(e){e.preventDefault(),N(!0),E(null);try{let e=await fetch(`${d}/admin/auth/forgot-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:C.trim()})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"FORGOT_FAILED");j("reset")}catch(e){E(e instanceof Error?e.message:"FORGOT_FAILED")}finally{N(!1)}}async function eU(e){e.preventDefault(),N(!0),E(null);try{let e=await fetch(`${d}/admin/auth/reset-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:C.trim(),otp:I.trim(),newPassword:P})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"RESET_FAILED");(0,r.writeAdminSession)(t.token,t.admin),O(""),$(""),j("dashboard"),await ek(),e_()}catch(e){E(e instanceof Error?e.message:"RESET_FAILED")}finally{N(!1)}}function eB(){ef(null),ee(""),ea(""),ei(""),eC(),eo(!1),ec(""),eu("")}function eM(){eE(null),eB(),E(null)}async function ez(e){let t=(0,r.readAdminToken)();if(t){ep(!0),E(null);try{let a=new FormData;a.append("photo",e);let n=await fetch(`${m}/api/uploads/event-photo`,{method:"POST",body:a,headers:{...(0,r.adminAuthHeader)(t)}}),i=await n.json().catch(()=>null);if(!n.ok)throw Error(i?.error||"UPLOAD_FAILED");let s=String(i?.filename||"").trim();if(!s)throw Error("UPLOAD_FAILED");es(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),`${m}/uploads/event/${encodeURIComponent(s)}`)),ei(s)}catch(e){E(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{ep(!1)}}}async function eV(e){e.preventDefault();let t=(0,r.readAdminToken)();if(t){if(ed&&!em||!ed&&em)return void E("Set both voting start and end, or leave both empty.");N(!0),E(null);try{let e=null!=eg,a=ed&&em?{start_time:new Date(ed).toISOString(),end_time:new Date(em).toISOString()}:e?{start_time:"",end_time:""}:{},n=e?{title:Z.trim(),description:et.trim()||null,image:en.trim()||null,is_private:+!!el,...a}:{title:Z.trim(),description:et.trim()||void 0,image:en.trim()||void 0,is_private:+!!el,...a},i=await fetch(e?`${d}/admin/events/${eg}`:`${d}/admin/events`,{method:e?"PATCH":"POST",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(t)},body:JSON.stringify(n)}),s=await i.json().catch(()=>null);if(!i.ok)throw Error(s?.message||s?.error||(e?"UPDATE_EVENT_FAILED":"CREATE_EVENT_FAILED"));let l=e?eg:Number(s?.event?.event_id??0)||null;eE(null),eB(),await ek(),l?eS("detail",l):eS("list")}catch(e){E(e instanceof Error?e.message:"SAVE_EVENT_FAILED")}finally{N(!1)}}}function eH(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M10 11v6M14 11v6",strokeLinecap:"round"})]})}async function eq(e){let t=(0,r.readAdminToken)();if(!t)return;let a=(e.title||"").trim()||"Untitled";if(window.confirm(`Delete "${a}" and all its categories, nominees, and votes? This cannot be undone.`)){N(!0),E(null);try{let n=await fetch(`${d}/admin/events/${e.event_id}`,{method:"DELETE",headers:{...(0,r.adminAuthHeader)(t)}}),i=await n.json().catch(()=>null);if(!n.ok)throw Error(i?.message||i?.error||"DELETE_EVENT_FAILED");ex===e.event_id&&(ej(null),eS("list")),eg===e.event_id&&eB(),await ek(),S(`Deleted "${a}".`)}catch(e){E(e instanceof Error?e.message:"DELETE_EVENT_FAILED")}finally{N(!1)}}}if(a.default.useEffect(()=>()=>{es(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null))},[]),"dashboard"===x){let e,a,n,s,o,u,h,x,N,k=(0,r.readAdminToken)(),S=null!=ex?X.find(e=>e.event_id===ex)??null:null,C=(0,t.jsxs)("form",{id:"admin-event-form",onSubmit:eV,children:[(0,t.jsxs)("div",{className:"row-mix",children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Event title *"}),(0,t.jsx)("input",{className:"input",required:!0,value:Z,onChange:e=>ee(e.target.value),maxLength:200,placeholder:"Enter event name"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Visibility"}),(0,t.jsxs)("label",{className:"toggle-field",children:[(0,t.jsx)("input",{type:"checkbox",className:"switch",role:"switch",checked:el,onChange:e=>eo(e.target.checked),"aria-checked":el}),(0,t.jsx)("span",{className:"toggle-label",children:"Private (invite-only)"})]})]})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Description"}),(0,t.jsx)("textarea",{className:"input",value:et,onChange:e=>ea(e.target.value),maxLength:500,rows:2,placeholder:"Optional short description"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Banner image"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",disabled:eh||y,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(es(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),URL.createObjectURL(t))),ei(""),ez(t)),e.currentTarget.value=""}}),er?(0,t.jsxs)("div",{className:"banner-preview",children:[(0,t.jsx)("img",{src:er,alt:""}),(0,t.jsx)("span",{className:`banner-badge ${eh?"badge-busy":en?"badge-ok":"badge-preview"}`,children:eh?"Uploading…":en?"Banner ready":"Preview"})]}):null]}),(0,t.jsxs)("fieldset",{className:"fieldset",children:[(0,t.jsx)("legend",{className:"fieldset-legend",children:"Voting window"}),(0,t.jsx)("p",{className:"fieldset-hint",children:"Set both to restrict when votes count, or leave empty for open voting."}),(0,t.jsxs)("div",{className:"grid2",children:[(0,t.jsxs)("div",{className:"field",style:{margin:0},children:[(0,t.jsx)("div",{className:"label",children:"Start"}),(0,t.jsx)("input",{className:"input",type:"datetime-local",value:ed,onChange:e=>ec(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",style:{margin:0},children:[(0,t.jsx)("div",{className:"label",children:"End"}),(0,t.jsx)("input",{className:"input",type:"datetime-local",value:em,onChange:e=>eu(e.target.value)})]})]})]})]}),_=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"section-head",children:[(0,t.jsx)("span",{className:"section-title",children:"Your events"}),(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:12},children:[(0,t.jsxs)("span",{style:{fontSize:13,color:"var(--text-faint)"},children:[X.length," total"]}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:function(){eB(),E(null),eE("create")},children:"Add event"})]})]}),0===X.length?(0,t.jsx)("p",{className:"hint",children:"No events yet — use Add event to create your first one."}):(0,t.jsx)("div",{className:"event-list",children:X.map(e=>{let a=(e.title||"").trim()||"Untitled",n=(e.description||"").trim(),i=(0,l.resolveEventBannerUrl)(m,e.image);return(0,t.jsxs)("div",{className:"event-card-wrap",children:[(0,t.jsx)("button",{type:"button",className:"event-icon-btn event-icon-btn--danger",disabled:y,"aria-label":`Delete ${a}`,title:"Delete event",onClick:()=>void eq(e),children:(0,t.jsx)(eH,{})}),(0,t.jsx)("button",{type:"button",className:"event-card event-card-clickable",style:{flex:1,minWidth:0},onClick:()=>eS("detail",e.event_id),children:(0,t.jsxs)("div",{className:"event-card-row",children:[i?(0,t.jsx)("img",{src:i,alt:"",className:"event-card-thumb"}):(0,t.jsx)("div",{className:"event-card-thumb-ph","aria-hidden":!0,children:a.slice(0,2).toUpperCase()}),(0,t.jsxs)("div",{className:"event-card-main",children:[(0,t.jsxs)("div",{className:"event-header",style:{marginBottom:4*!!n},children:[(0,t.jsx)("span",{className:"event-title",children:a}),(0,t.jsx)("span",{className:`event-badge ${!0===e.is_private||1===e.is_private?"badge-private":"badge-public"}`,children:!0===e.is_private||1===e.is_private?"Private":"Public"})]}),n?(0,t.jsx)("p",{className:"event-desc",style:{marginBottom:0},children:n}):null]}),(0,t.jsx)("span",{className:"event-card-chevron","aria-hidden":!0,children:"›"})]})})]},e.event_id)})})]}),A=S?(a=(S.title||"").trim()||"Untitled",n=(S.description||"").trim(),s=(0,l.resolveEventBannerUrl)(m,S.image),o=!0===S.is_private||1===S.is_private,u=function(e){let t=e.start_time,a=e.end_time;if(null==t||null==a||!String(t).trim()||!String(a).trim())return"always";let n=new Date(String(t)).getTime(),i=new Date(String(a)).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"always";let r=Date.now();return r<n?"upcoming":r>i?"ended":"open"}(S),h=f(S.start_time),x=f(S.end_time),N=!!(h&&x),(0,t.jsxs)("article",{className:"event-detail-panel",children:[s?(0,t.jsx)("img",{src:s,alt:"",className:"event-detail-banner"}):(0,t.jsx)("div",{className:"event-detail-banner-ph","aria-hidden":!0,children:a.slice(0,2).toUpperCase()}),(0,t.jsxs)("div",{className:"event-detail-body",children:[(0,t.jsxs)("div",{className:"event-detail-badges",children:[(0,t.jsx)("span",{className:`event-badge ${o?"badge-private":"badge-public"}`,children:o?"Private":"Public"}),(0,t.jsx)("span",{className:`event-badge ${"open"===u?"badge-vote-open":"upcoming"===u?"badge-vote-upcoming":"ended"===u?"badge-vote-ended":"badge-vote-always"}`,children:"open"===u?"Voting open":"upcoming"===u?"Voting soon":"ended"===u?"Voting ended":"Open voting"})]}),(0,t.jsx)("h1",{className:"event-detail-title",children:a}),n?(0,t.jsx)("p",{className:"event-desc",children:n}):null,N?(0,t.jsxs)("dl",{className:"event-detail-meta",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("dt",{children:"Voting starts"}),(0,t.jsx)("dd",{children:h})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("dt",{children:"Voting ends"}),(0,t.jsx)("dd",{children:x})]})]}):(0,t.jsx)("p",{className:"event-detail-note",children:"Voting window not set — votes count anytime."}),o?(0,t.jsx)("p",{className:"event-detail-note",children:"Invite-only event. Share the register link below with attendees."}):null,(0,t.jsxs)("div",{className:"event-detail-actions",children:[(0,t.jsx)("button",{type:"button",className:"btn btn-danger",disabled:y,onClick:()=>void eq(S),children:"Delete event"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>{let e;return ef(S.event_id),ee((S.title||"").trim()),ea((S.description||"").trim()),void(ei(e=(S.image||"").trim()),es(t=>(t?.startsWith("blob:")&&URL.revokeObjectURL(t),e?(0,l.resolveEventBannerUrl)(m,e):null)),eo(!0===S.is_private||1===S.is_private),ec(g(S.start_time)),eu(g(S.end_time)),E(null),eE("edit"),ex!==S.event_id&&eS("detail",S.event_id))},children:"Edit event"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eS("categories",S.event_id),children:"Categories"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eS("nominees",S.event_id),children:"Nominees"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,i.withBasePath)(`/awards_f/actions?eventId=${S.event_id}`),style:{textDecoration:"none"},children:"LED controls"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,i.withBasePath)(`/awards_f/screen?eventId=${S.event_id}`),target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"Open LED screen"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>{var e;navigator.clipboard.writeText((e=S.event_id,`${window.location.origin}${(0,i.withBasePath)(`/register?eventId=${e}`)}`)),eN(!0),window.setTimeout(()=>eN(!1),2e3)},children:ey?"Link copied":"Copy register link"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,i.withBasePath)(`/events/${S.event_id}`),target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"Public event page"})]})]})]})):(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("p",{className:"hint",style:{padding:"1rem 0"},children:"Event not found."}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eS("list"),children:"Back to your events"})]});if("detail"===ev)e=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)("button",{type:"button",className:"back-link",onClick:()=>eS("list"),children:"← Your events"})}),A]});else if(("categories"===ev||"nominees"===ev)&&null!=ex){let a=X.find(e=>e.event_id===ex),n=(0,r.readAdminToken)();e=a&&n?(0,t.jsx)(p,{mode:ev,eventId:ex,eventTitle:(a.title||"").trim()||"Untitled",apiBase:d,apiOrigin:m,token:n,onBack:()=>eS("detail",ex),onGoCategories:()=>eS("categories",ex)}):(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("p",{className:"hint",style:{padding:"1rem 0"},children:"Event not found."}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eS("list"),children:"Back to your events"})]})}else e=_;return(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:v}),(0,t.jsxs)("div",{className:"dashboard",children:[(0,t.jsxs)("div",{className:"topbar",children:[(0,t.jsxs)("div",{className:"topbar-brand",children:[(0,t.jsx)("div",{className:"topbar-icon",children:(0,t.jsx)(b,{})}),(0,t.jsx)("span",{className:"topbar-title",children:"Event Admin"})]}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:function(){(0,r.clearAdminSession)(),j("auth"),Q([])},children:"Log out"})]}),w&&(0,t.jsx)("div",{className:"error-box",children:w}),e,ew?(0,t.jsx)(c,{wide:!0,title:"create"===ew?"New event":"Edit event",onClose:eM,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",disabled:y||eh,onClick:eM,children:"Cancel"}),(0,t.jsx)("button",{type:"submit",form:"admin-event-form",className:"btn",disabled:y||eh,children:y?"Saving…":"edit"===ew?"Save changes":"Create event"})]}),children:C}):null,!k&&(0,t.jsx)("p",{className:"error-box",style:{marginTop:16},children:"Session missing — please log in again."})]})]})}return"forgot"===x?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:v}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(b,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Forgot password"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Enter your email and we'll send a 6-digit OTP."}),w&&(0,t.jsx)("div",{className:"error-box",children:w}),(0,t.jsxs)("form",{onSubmit:eR,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:C,onChange:e=>_(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:y,children:y?"Sending…":"Send OTP"})]}),(0,t.jsx)("div",{className:"auth-footer",children:(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>j("auth"),children:"← Back to sign in"})})]})})]}):"register"===x?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:v}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card auth-card-wide",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(b,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Create account"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Fill in your details. We will email a one-time code to verify your account."}),w&&(0,t.jsx)("div",{className:"error-box",children:w}),(0,t.jsxs)("form",{onSubmit:eO,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Your name *"}),(0,t.jsx)("input",{className:"input",required:!0,value:F,onChange:e=>R(e.target.value),placeholder:"Full name",maxLength:75,autoComplete:"name"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Organisation name *"}),(0,t.jsx)("input",{className:"input",required:!0,value:U,onChange:e=>B(e.target.value),placeholder:"Company or organisation",maxLength:100,autoComplete:"organization"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Mobile *"}),(0,t.jsx)("input",{className:"input",type:"tel",required:!0,value:M,onChange:e=>z(e.target.value.replace(/[^\d\s]/g,"").slice(0,12)),placeholder:"10–12 digit mobile number",inputMode:"numeric",autoComplete:"tel"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Full address *"}),(0,t.jsx)("textarea",{className:"input",required:!0,value:V,onChange:e=>H(e.target.value),placeholder:"Street, city, state, PIN",maxLength:300,rows:2,autoComplete:"street-address"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Organisation logo (optional)"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",disabled:y||Y,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(J(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),URL.createObjectURL(t))),W(""),eI(t)),e.currentTarget.value=""}}),G?(0,t.jsxs)("div",{className:"banner-preview",style:{marginTop:10},children:[(0,t.jsx)("img",{src:G,alt:"",style:{height:80,objectFit:"contain",background:"#f8fafc"}}),(0,t.jsx)("span",{className:`banner-badge ${Y?"badge-busy":q?"badge-ok":"badge-preview"}`,children:Y?"Uploading…":q?"Logo ready":"Preview"})]}):null]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email *"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,autoComplete:"email",value:C,onChange:e=>_(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Password *"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"new-password",value:A,onChange:e=>L(e.target.value),placeholder:"At least 8 characters",minLength:8,maxLength:72})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Confirm password *"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"new-password",value:T,onChange:e=>D(e.target.value),placeholder:"Re-enter password",minLength:8,maxLength:72})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:y||Y,children:y?"Sending OTP…":"Send OTP"})]}),(0,t.jsx)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{E(null),j("auth")},children:"Already have an account? Sign in"})})]})})]}):"register-verify"===x?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:v}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(b,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Verify your email"}),(0,t.jsxs)("div",{className:"auth-subtitle",children:["Enter the 6-digit OTP sent to ",(0,t.jsx)("strong",{children:C.trim()||"your email"}),"."]}),w&&(0,t.jsx)("div",{className:"error-box",children:w}),k&&(0,t.jsx)("div",{className:"info-box",children:k}),(0,t.jsxs)("form",{onSubmit:eP,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:C,onChange:e=>_(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"OTP"}),(0,t.jsx)("input",{className:"input",required:!0,value:I,onChange:e=>O(e.target.value.replace(/\D/g,"").slice(0,6)),placeholder:"6-digit code",inputMode:"numeric",maxLength:6,pattern:"\\d{6}"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:y,children:y?"Verifying…":"Verify & continue"})]}),(0,t.jsxs)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:[(0,t.jsx)("button",{type:"button",className:"link-btn",disabled:y,onClick:()=>void e$(),children:"Resend OTP"}),(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{E(null),j("register")},children:"← Back to register"})]})]})})]}):"reset"===x?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:v}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(b,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Reset password"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Enter the OTP from your email and choose a new password."}),w&&(0,t.jsx)("div",{className:"error-box",children:w}),(0,t.jsxs)("form",{onSubmit:eU,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:C,onChange:e=>_(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"OTP"}),(0,t.jsx)("input",{className:"input",required:!0,value:I,onChange:e=>O(e.target.value),placeholder:"6-digit code",inputMode:"numeric",maxLength:6})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"New password"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,value:P,onChange:e=>$(e.target.value),placeholder:"At least 8 characters"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:y,children:y?"Saving…":"Reset & sign in"})]})]})})]}):"boot"===x?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:v}),(0,t.jsx)("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text-muted)",fontFamily:"var(--font)",fontSize:14},children:"Checking session…"})]}):(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:v}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(b,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Welcome back"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Sign in to manage your events."}),w&&(0,t.jsx)("div",{className:"error-box",children:w}),(0,t.jsxs)("form",{onSubmit:eF,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,autoComplete:"email",value:C,onChange:e=>_(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Password"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"current-password",value:A,onChange:e=>L(e.target.value),placeholder:"Min 8 characters",minLength:8,maxLength:72})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:y,children:y?"Please wait…":"Sign in"})]}),(0,t.jsxs)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:[(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{E(null),j("forgot")},children:"Forgot password?"}),(0,t.jsxs)("span",{style:{color:"var(--text-muted)"},children:["Don't have an account?"," ",(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:function(){E(null),D(""),O(""),R(""),B(""),z(""),H(""),W(""),J(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null)),j("register")},children:"Register"})]})]})]})})]})}e.s(["default",0,function(){return(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{style:{minHeight:"100vh",background:"#e8f0fe",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b",fontFamily:"sans-serif",fontSize:14},children:"Loading…"}),children:(0,t.jsx)(x,{})})}],72906)}]);