(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,72906,e=>{"use strict";var t=e.i(43476),a=e.i(71645),n=e.i(18566),i=e.i(37645),r=e.i(90165),l=e.i(82608),s=e.i(86347),o=e.i(11688);function d(e){return(0,t.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:(0,t.jsx)("path",{d:"M18 6L6 18M6 6l12 12",strokeLinecap:"round"})})}function c(e){let{title:n,titleId:i="admin-modal-title",wide:r,onClose:l,footer:s,children:c}=e;return a.default.useEffect(()=>{let e=e=>{"Escape"===e.key&&l()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[l]),(0,t.jsx)("div",{className:o.default.adminModalBackdrop,role:"presentation",onClick:l,children:(0,t.jsxs)("div",{className:`${o.default.adminModal} ${r?o.default.adminModalWide:""}`,role:"dialog","aria-modal":"true","aria-labelledby":i,onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:o.default.adminModalHead,children:[(0,t.jsx)("h2",{id:i,className:o.default.adminModalTitle,children:n}),(0,t.jsx)("button",{type:"button",className:o.default.adminIconBtn,onClick:l,"aria-label":"Close",children:(0,t.jsx)(d,{})})]}),c,s?(0,t.jsx)("div",{className:o.default.adminModalFooter,children:s}):null]})})}function m(e){return!0===e.show_nominee||1===e.show_nominee}function u(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,t.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}function h(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M10 11v6M14 11v6",strokeLinecap:"round"})]})}let p=()=>({name:"",photo:"",description:"",category_id:0});function g(e){let n,i,{mode:l,eventId:d,eventTitle:g,eventDeclareResult:v=!1,apiBase:f,apiOrigin:x,token:b,onBack:j,onGoCategories:y}=e,[N,w]=a.default.useState([]),[E,k]=a.default.useState([]),[_,A]=a.default.useState(!1),[C,S]=a.default.useState(null),[T,L]=a.default.useState(null),[D,I]=a.default.useState(""),[O,P]=a.default.useState(null),[$,F]=a.default.useState(p),[R,U]=a.default.useState("all"),[B,z]=a.default.useState(""),[M,H]=a.default.useState(null),[V,G]=a.default.useState(!1),[q,W]=a.default.useState(null),[J,Y]=a.default.useState(null),K=a.default.useMemo(()=>{let e=new Map;for(let t of N)e.set(t.category_id,t);return e},[N]),X=a.default.useCallback(async()=>{A(!0),S(null);try{let e=(0,r.adminAuthHeader)(b),[t,a]=await Promise.all([fetch(`${f}/categories?eventId=${d}`),fetch(`${f}/nominees?eventId=${d}`,{headers:{...e}})]),n=await t.json().catch(()=>null),i=await a.json().catch(()=>null);if(!t.ok)throw Error(n?.error||"CATEGORIES_FAILED");if(!a.ok)throw Error(i?.error||"NOMINEES_FAILED");let l=Array.isArray(n?.categories)?n.categories:[],s=l.some(e=>e?.event_id!=null&&Number.isFinite(Number(e.event_id)))?l.filter(e=>Number(e?.event_id)===d):l;w(s),k(Array.isArray(i?.nominees)?i.nominees:[])}catch(e){S(e instanceof Error?e.message:"ADMIN_LOAD_FAILED")}finally{A(!1)}},[d,f,b]);a.default.useEffect(()=>{X()},[X]);let Q=a.default.useMemo(()=>{let e=B.trim().toLowerCase();return E.filter(t=>{if("all"!==R&&Number(t.category_id)!==R)return!1;if(!e)return!0;let a=(K.get(Number(t.category_id))?.name||"").toLowerCase(),n=(t.name||"").toLowerCase(),i=(t.description||"").toLowerCase();return n.includes(e)||i.includes(e)||a.includes(e)}).slice().sort((e,t)=>Number(e.category_id)-Number(t.category_id)||Number(e.nominee_id)-Number(t.nominee_id))},[E,R,B,K]),Z=a.default.useCallback(()=>{H(e=>(e&&URL.revokeObjectURL(e),null))},[]);function ee(){L(null),I("")}function et(){Z(),P(null),F(p())}async function ea(){let e=D.trim();if(e){A(!0),S(null);try{if(T?.mode==="add"){let t=await fetch(`${f}/admin/categories`,{method:"POST",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(b)},body:JSON.stringify({name:e,eventId:d})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"CREATE_CATEGORY_FAILED")}else if(T?.mode==="edit"){let t=await fetch(`${f}/admin/categories/${T.categoryId}?eventId=${d}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(b)},body:JSON.stringify({name:e})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"UPDATE_CATEGORY_FAILED")}ee(),await X()}catch(e){S(e instanceof Error?e.message:"SAVE_CATEGORY_FAILED")}finally{A(!1)}}}async function en(e,t){let a=t.trim()||"this category";if(window.confirm(`Delete "${a}" and all its nominees? This cannot be undone.`)){A(!0),S(null);try{let t=await fetch(`${f}/admin/categories/${e}?eventId=${d}`,{method:"DELETE",headers:{...(0,r.adminAuthHeader)(b)}}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"DELETE_CATEGORY_FAILED");T?.mode==="edit"&&T.categoryId===e&&ee(),await X()}catch(e){S(e instanceof Error?e.message:"DELETE_CATEGORY_FAILED")}finally{A(!1)}}}async function ei(){let e=$.name.trim();if(e&&$.category_id){A(!0),S(null);try{if(O?.mode==="add"){let t=await fetch(`${f}/admin/nominees?eventId=${d}`,{method:"POST",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(b)},body:JSON.stringify({name:e,photo:$.photo.trim(),description:$.description.trim()||void 0,category_id:$.category_id})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"SAVE_NOMINEE_FAILED")}else if(O?.mode==="edit"){let t=await fetch(`${f}/admin/nominees/${O.nomineeId}?eventId=${d}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(b)},body:JSON.stringify({name:e,photo:$.photo.trim(),description:$.description.trim()||null,category_id:$.category_id})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"SAVE_NOMINEE_FAILED")}et(),await X()}catch(e){S(e instanceof Error?e.message:"SAVE_NOMINEE_FAILED")}finally{A(!1)}}}async function er(e,t){let a=t.trim()||"this nominee";if(window.confirm(`Delete "${a}"? Votes for this nominee will be removed.`)){A(!0),S(null);try{let t=await fetch(`${f}/admin/nominees/${e}?eventId=${d}`,{method:"DELETE",headers:{...(0,r.adminAuthHeader)(b)}}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"DELETE_NOMINEE_FAILED");O?.mode==="edit"&&O.nomineeId===e&&et(),await X()}catch(e){S(e instanceof Error?e.message:"DELETE_NOMINEE_FAILED")}finally{A(!1)}}}async function el(e,t){W(e.category_id),S(null);try{let a=await fetch(`${f}/admin/categories/${e.category_id}?eventId=${d}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(b)},body:JSON.stringify({show_nominee:+!!t})}),n=await a.json().catch(()=>null);if(!a.ok)throw Error(n?.error||"UPDATE_CATEGORY_FAILED");w(a=>a.map(a=>a.category_id===e.category_id?{...a,show_nominee:+!!t}:a))}catch(e){S(e instanceof Error?e.message:"UPDATE_CATEGORY_FAILED")}finally{W(null)}}async function es(e,t){Y(e.category_id),S(null);try{let a=await fetch(`${f}/admin/categories/${e.category_id}?eventId=${d}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(b)},body:JSON.stringify({declare_result:+!!t})}),n=await a.json().catch(()=>null);if(!a.ok)throw Error(n?.error||"UPDATE_CATEGORY_FAILED");w(a=>a.map(a=>a.category_id===e.category_id?{...a,declare_result:+!!t}:a))}catch(e){S(e instanceof Error?e.message:"UPDATE_CATEGORY_FAILED")}finally{Y(null)}}async function eo(e,t){A(!0),S(null);try{let a=await fetch(`${f}/admin/nominees/${e.nominee_id}?eventId=${d}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(b)},body:JSON.stringify({is_approved:+!!t})}),n=await a.json().catch(()=>null);if(!a.ok)throw Error(n?.error||"APPROVAL_UPDATE_FAILED");await X()}catch(e){S(e instanceof Error?e.message:"APPROVAL_UPDATE_FAILED")}finally{A(!1)}}async function ed(e){G(!0),S(null);try{let t=new FormData;t.append("photo",e);let a=await fetch(`${f}/uploads/nominee-photo`,{method:"POST",body:t}),n=await a.json().catch(()=>null);if(!a.ok)throw Error(n?.error||"PHOTO_UPLOAD_FAILED");let i=String(n?.filename||"");if(!i)throw Error("PHOTO_UPLOAD_FAILED");Z(),F(e=>({...e,photo:i}))}catch(e){S(e instanceof Error?e.message:"PHOTO_UPLOAD_FAILED")}finally{G(!1)}}a.default.useEffect(()=>()=>Z(),[Z]);let ec=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Category *"}),(0,t.jsx)("select",{className:"input",value:$.category_id||"",onChange:e=>F(t=>({...t,category_id:Number(e.target.value)})),disabled:_||0===N.length,required:!0,children:0===N.length?(0,t.jsx)("option",{value:"",children:"No categories — add one first"}):N.map(e=>(0,t.jsx)("option",{value:e.category_id,children:e.name},e.category_id))})]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Name *"}),(0,t.jsx)("input",{className:"input",value:$.name,onChange:e=>F(t=>({...t,name:e.target.value})),placeholder:"Nominee name",disabled:_})]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Photo"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",onChange:e=>{let t=e.currentTarget.files?.[0];t&&(H(e=>(e&&URL.revokeObjectURL(e),URL.createObjectURL(t))),ed(t))},disabled:_||V}),V?(0,t.jsx)("p",{className:"hint",style:{marginTop:8},children:"Uploading…"}):null,(n=$.photo.trim()?(0,s.resolveNomineePhotoUrl)(x,$.photo):"",(i=M||n)?(0,t.jsx)("div",{style:{marginTop:10},children:(0,t.jsx)("img",{className:o.default.previewPhoto,src:i,alt:""})}):null)]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Description (optional)"}),(0,t.jsx)("textarea",{className:"input",value:$.description,onChange:e=>F(t=>({...t,description:e.target.value})),placeholder:"Short description",style:{minHeight:88,resize:"vertical"},disabled:_})]})]});return(0,t.jsxs)("div",{className:"panel",style:{marginBottom:"2rem"},children:[(0,t.jsx)("div",{className:"back-row",style:{marginBottom:"1rem"},children:(0,t.jsx)("button",{type:"button",className:"back-link",onClick:j,children:"← Event details"})}),(0,t.jsxs)("div",{className:o.default.adminCatToolbar,style:{marginBottom:14},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"panel-title",style:{marginBottom:4},children:"categories"===l?"Categories":"Nominees"}),(0,t.jsx)("p",{style:{fontSize:13,color:"var(--text-muted)",margin:0},children:g})]}),(0,t.jsx)("span",{style:{fontSize:13,color:"var(--text-faint)"},children:_?"Loading…":"categories"===l?`${N.length} categories`:`${Q.length}${"all"!==R||B.trim()?` of ${E.length}`:""} nominees`})]}),C?(0,t.jsx)("div",{className:"error-box",style:{marginBottom:12},children:C}):null,"categories"===l?(0,t.jsxs)("div",{className:o.default.adminCategoriesBlock,style:{marginTop:0},children:[(0,t.jsxs)("div",{className:o.default.adminCatToolbar,children:[(0,t.jsx)("span",{className:"section-title",style:{marginBottom:0,fontSize:13,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--text-muted)"},children:"All categories"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:function(){I(""),L({mode:"add"})},disabled:_,children:"Add category"})]}),0!==N.length||_?null:(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"1rem 0"},children:"No categories yet — use Add category."}),(0,t.jsx)("div",{className:o.default.adminCategoryList,children:N.map(e=>(0,t.jsxs)("div",{className:o.default.adminCategoryRow,children:[(0,t.jsxs)("div",{className:o.default.adminCategoryRowMain,children:[(0,t.jsxs)("div",{className:o.default.adminRowIconGroup,children:[(0,t.jsx)("button",{type:"button",className:`${o.default.adminIconBtn} ${o.default.adminIconBtnDanger}`,onClick:()=>void en(e.category_id,e.name),disabled:_,"aria-label":`Delete ${e.name}`,title:"Delete category",children:(0,t.jsx)(h,{})}),(0,t.jsx)("button",{type:"button",className:o.default.adminIconBtn,onClick:()=>{I(e.name||""),L({mode:"edit",categoryId:e.category_id})},"aria-label":"Edit category",title:"Edit category",children:(0,t.jsx)(u,{})})]}),(0,t.jsxs)("div",{className:o.default.adminCategoryTitleWrap,children:[(0,t.jsx)("span",{style:{fontSize:15,fontWeight:600,whiteSpace:"normal"},children:e.name}),e.winner_nominee_id?(0,t.jsx)("span",{className:"event-badge badge-public",style:{marginLeft:8},children:"Winner set"}):null]})]}),(0,t.jsxs)("div",{className:o.default.adminCategoryRowSwitches,children:[(0,t.jsxs)("label",{className:o.default.adminApproveSwitch,title:m(e)?"Nominees visible on screen":"Nominees hidden on screen",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:m(e),disabled:q===e.category_id||_,onChange:t=>void el(e,t.target.checked),"aria-label":m(e)?"Hide nominees on screen":"Show nominees on screen"}),(0,t.jsx)("span",{className:o.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:"Show nominee"})]}),(0,t.jsxs)("label",{className:o.default.adminApproveSwitch,title:v||!0===e.declare_result||1===e.declare_result?"Result declared":"Result not declared",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:!0===e.declare_result||1===e.declare_result,disabled:J===e.category_id||_||v,onChange:t=>void es(e,t.target.checked),"aria-label":!0===e.declare_result||1===e.declare_result?"Undeclare category result":"Declare category result"}),(0,t.jsx)("span",{className:o.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:"Declare result"})]})]})]},e.category_id))})]}):(0,t.jsx)("div",{className:o.default.adminCategoriesBlock,style:{marginTop:0},children:0!==N.length||_?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:o.default.adminNomineeToolbar,children:[(0,t.jsx)("input",{className:`input ${o.default.adminNomineeToolbarSearch}`,type:"search",placeholder:"Search nominees…",value:B,onChange:e=>z(e.target.value),"aria-label":"Search nominees"}),(0,t.jsxs)("select",{className:`input ${o.default.adminNomineeToolbarSelect}`,value:"all"===R?"all":String(R),onChange:e=>{let t=e.target.value;U("all"===t?"all":Number(t))},"aria-label":"Filter by category",children:[(0,t.jsx)("option",{value:"all",children:"All categories"}),N.map(e=>(0,t.jsx)("option",{value:e.category_id,children:e.name},e.category_id))]}),(0,t.jsx)("button",{type:"button",className:`btn ${o.default.adminNomineeToolbarAdd}`,onClick:function(){Z();let e=N[0]?.category_id??0;F({...p(),category_id:e}),P({mode:"add"})},disabled:_,children:"Add nominee"})]}),0!==Q.length||_?(0,t.jsx)("div",{className:o.default.adminNomineeListFlat,children:Q.map(e=>{let a=(0,s.resolveNomineePhotoUrl)(x,e.photo),n=K.get(Number(e.category_id))?.name||"Category",i=!0===e.is_approved||1===e.is_approved;return(0,t.jsx)("div",{className:o.default.adminNomineeCard,children:(0,t.jsxs)("div",{className:o.default.adminNomineeCardRead,children:[(0,t.jsxs)("label",{className:o.default.adminApproveSwitch,title:i?"Approved":"Unapproved",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:i,disabled:_,onChange:t=>void eo(e,t.target.checked),"aria-label":i?`Unapprove ${e.name}`:`Approve ${e.name}`}),(0,t.jsx)("span",{className:o.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:i?"Approved":"Pending"})]}),(0,t.jsxs)("div",{className:o.default.adminRowIconGroup,children:[(0,t.jsx)("button",{type:"button",className:`${o.default.adminIconBtn} ${o.default.adminIconBtnDanger}`,onClick:()=>void er(e.nominee_id,e.name),disabled:_,"aria-label":`Delete ${e.name}`,title:"Delete nominee",children:(0,t.jsx)(h,{})}),(0,t.jsx)("button",{type:"button",className:o.default.adminIconBtn,onClick:()=>{Z(),F({name:e.name||"",photo:e.photo||"",description:e.description||"",category_id:Number(e.category_id)}),P({mode:"edit",nomineeId:e.nominee_id})},"aria-label":`Edit ${e.name}`,title:"Edit nominee",children:(0,t.jsx)(u,{})})]}),(0,t.jsxs)("div",{className:o.default.adminNomineeCardLeft,children:[a?(0,t.jsx)("img",{className:o.default.adminNomineeCardPhoto,src:a,alt:""}):(0,t.jsx)("div",{className:o.default.adminNomineeCardPhotoPlaceholder,"aria-hidden":!0}),(0,t.jsxs)("div",{className:o.default.adminNomineeCardText,children:[(0,t.jsxs)("div",{style:{fontSize:15,fontWeight:600,whiteSpace:"normal"},children:[e.name,(0,t.jsx)("span",{className:i?o.default.adminBadgeApproved:o.default.adminBadgePending,children:i?"Approved":"Pending"})]}),(0,t.jsx)("p",{className:o.default.adminNomineeMeta,children:n}),e.description?(0,t.jsx)("p",{className:o.default.adminNomineeDesc,children:e.description}):(0,t.jsx)("p",{className:"hint",style:{margin:"6px 0 0"},children:"No description"})]})]})]})},e.nominee_id)})}):(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"1rem 0"},children:0===E.length?"No nominees yet — use Add nominee.":"No nominees match your search or filter."})]}):(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"0.5rem 0 1rem"},children:"Add categories first, then add nominees."}),y?(0,t.jsx)("button",{type:"button",className:"btn",onClick:y,children:"Go to categories"}):null]})}),T?(0,t.jsx)(c,{title:"add"===T.mode?"Add category":"Edit category",onClose:ee,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:ee,disabled:_,children:"Cancel"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:()=>void ea(),disabled:_||!D.trim(),children:"add"===T.mode?"Add category":"Save changes"})]}),children:(0,t.jsxs)("div",{className:"field",style:{marginBottom:0},children:[(0,t.jsx)("div",{className:"label",children:"Category name *"}),(0,t.jsx)("input",{className:"input",value:D,onChange:e=>I(e.target.value),placeholder:"Category name",disabled:_,onKeyDown:e=>{"Enter"===e.key&&ea()}})]})}):null,O?(0,t.jsx)(c,{wide:!0,title:"add"===O.mode?"Add nominee":"Edit nominee",onClose:et,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:et,disabled:_,children:"Cancel"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:()=>void ei(),disabled:_||!$.name.trim()||!$.category_id,children:"add"===O.mode?"Add nominee":"Save changes"})]}),children:ec}):null]})}function v(e){if(null==e||""===e)return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let a=e=>String(e).padStart(2,"0");return`${t.getFullYear()}-${a(t.getMonth()+1)}-${a(t.getDate())}T${a(t.getHours())}:${a(t.getMinutes())}`}function f(e){if(null==e||""===String(e).trim())return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"})}let x=`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --surface: var(--card);
    --surface2: var(--card2);
    --surface3: #f1f5f9;
    --border-hover: rgba(15, 23, 42, 0.18);
    --accent-glow: rgba(37, 99, 235, 0.15);
    --accent-dim: rgba(37, 99, 235, 0.12);
    --text-muted: var(--muted);
    --text-faint: var(--muted2);
    --success: #059669;
    --success-dim: rgba(5, 150, 105, 0.12);
    --danger-dim: rgba(220, 38, 38, 0.1);
    --warning: #d97706;
    --radius: 10px;
    --radius-lg: 16px;
    --radius-xl: 20px;
  }

  .page {
    min-height: 100vh;
    min-height: 100dvh;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: var(--text);
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
    font-family: inherit;
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
    font-family: inherit;
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
    font-family: inherit;
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
    font-family: inherit;
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
  .event-detail-controls {
    margin: 0 0 1.25rem;
    padding: 1rem 1.1rem;
    background: var(--surface2);
    border-radius: var(--radius);
    border: 1px solid var(--border);
  }
  .event-detail-controls-title {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    margin-bottom: 12px;
  }
  .event-detail-controls-row {
    display: flex;
    flex-wrap: wrap;
    gap: 14px 22px;
    margin-bottom: 8px;
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

  @media (max-width: 720px) {
    .dashboard {
      padding: 1.25rem clamp(12px, 4vw, 16px) 3rem;
    }

    .topbar {
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 1.75rem;
    }

    .topbar .btn-ghost {
      width: 100%;
      justify-content: center;
    }

    .section-head {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    .section-head .btn {
      width: 100%;
      justify-content: center;
    }

    .row-mix {
      grid-template-columns: 1fr;
    }

    .event-card-wrap {
      flex-direction: column;
    }

    .event-icon-btn {
      width: 100%;
      height: 44px;
      align-self: stretch;
    }

    .event-detail-banner,
    .event-detail-banner-ph {
      height: clamp(120px, 32vw, 180px);
    }

    .event-detail-body {
      padding: 1rem;
    }

    .event-detail-actions {
      flex-direction: column;
    }

    .event-detail-actions .btn,
    .event-detail-actions .btn-ghost {
      width: 100%;
      justify-content: center;
    }

    .actions-row {
      flex-direction: column;
    }

    .actions-row .btn,
    .actions-row .btn-ghost,
    .actions-row .btn-danger {
      width: 100%;
      justify-content: center;
    }

    .event-actions {
      flex-direction: column;
    }

    .event-actions .btn,
    .event-actions .btn-ghost {
      width: 100%;
      justify-content: center;
    }

    .auth-wrap {
      padding: 1.5rem clamp(12px, 4vw, 16px);
    }

    .auth-card {
      padding: 1.75rem clamp(16px, 4vw, 24px);
    }

    .panel {
      padding: 1rem;
    }
  }

  @media (max-width: 420px) {
    .event-card-row {
      flex-wrap: wrap;
    }

    .event-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;function b(){return(0,t.jsx)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"})})}function j(){let e=(0,n.useRouter)(),d=(0,n.useSearchParams)(),m=(0,l.getPublicApiBase)(),u=(0,l.getUploadsOrigin)(),h=d.get("next")||"",p=d.get("eventId")||"",[j,y]=a.default.useState("boot"),[N,w]=a.default.useState(!1),[E,k]=a.default.useState(null),[_,A]=a.default.useState(null),[C,S]=a.default.useState(""),[T,L]=a.default.useState(""),[D,I]=a.default.useState(""),[O,P]=a.default.useState(""),[$,F]=a.default.useState(""),[R,U]=a.default.useState(""),[B,z]=a.default.useState(""),[M,H]=a.default.useState(""),[V,G]=a.default.useState(""),[q,W]=a.default.useState(""),[J,Y]=a.default.useState(null),[K,X]=a.default.useState(!1),[Q,Z]=a.default.useState([]),[ee,et]=a.default.useState(""),[ea,en]=a.default.useState(""),[ei,er]=a.default.useState(""),[el,es]=a.default.useState(null),[eo,ed]=a.default.useState(!1),[ec,em]=a.default.useState(""),[eu,eh]=a.default.useState(""),[ep,eg]=a.default.useState(!1),[ev,ef]=a.default.useState(null),[ex,eb]=a.default.useState("list"),[ej,ey]=a.default.useState(null),[eN,ew]=a.default.useState(!1),[eE,ek]=a.default.useState(null),[e_,eA]=a.default.useState(!1),[eC,eS]=a.default.useState(!1),eT=a.default.useCallback((e,t)=>{Z(a=>a.map(a=>a.event_id===e?{...a,...t}:a))},[]),eL=a.default.useCallback(async()=>{let e=(0,r.readAdminToken)();if(!e)return;let t=await fetch(`${m}/admin/events`,{headers:{...(0,r.adminAuthHeader)(e)}}),a=await t.json().catch(()=>null);if(!t.ok){401===t.status&&(0,r.clearAdminSession)();return}Z(Array.isArray(a?.events)?a.events:[])},[m]);a.default.useEffect(()=>{let e=!1,t=(0,r.readAdminToken)();return t?((async()=>{try{let a=await fetch(`${m}/admin/me`,{headers:{...(0,r.adminAuthHeader)(t)}});if(e)return;if(a.ok){y("dashboard"),await eL();return}if(401===a.status){(0,r.clearAdminSession)(),y("auth");return}(0,r.isAdminSessionValid)()?(y("dashboard"),await eL()):y("auth")}catch{if(e)return;(0,r.isAdminSessionValid)()?(y("dashboard"),await eL()):y("auth")}})(),()=>{e=!0}):void y("auth")},[m,eL]);let eD=a.default.useCallback((t,a)=>{eb(t),ey(a??null),ew(!1),k(null);let n=new URLSearchParams;"create"===t?n.set("screen","create"):"edit"===t&&a?(n.set("screen","edit"),n.set("eventId",String(a))):("categories"===t||"nominees"===t)&&a?(n.set("eventId",String(a)),n.set("panel",t)):"detail"===t&&a&&n.set("eventId",String(a));let i=n.toString();e.replace(`/admin${i?`?${i}`:""}`,{scroll:!1})},[e]);a.default.useEffect(()=>{let e,t,a,n,i;if("dashboard"!==j)return;let r=(e=d.get("screen"),t=d.get("panel"),i=Number.isFinite(n=(a=d.get("eventId"))?Number(a):0)&&n>0?Math.floor(n):null,"create"===e?{screen:"create",eventId:null}:"edit"===e&&i?{screen:"edit",eventId:i}:i&&"categories"===t?{screen:"categories",eventId:i}:i&&"nominees"===t?{screen:"nominees",eventId:i}:i?{screen:"detail",eventId:i}:{screen:"list",eventId:null}),l=d.get("screen");eb("create"===l?"list":"edit"===l&&r.eventId?"detail":r.screen),ey(r.eventId),"create"===l?ek("create"):"edit"===l&&r.eventId&&ek("edit")},[j,d]),a.default.useEffect(()=>{if("dashboard"!==j||"edit"!==eE||null==ej)return;let e=Q.find(e=>e.event_id===ej);if(!e||ev===e.event_id)return;ef(e.event_id),et((e.title||"").trim()),en((e.description||"").trim());let t=(e.image||"").trim();er(t),es(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),t?(0,s.resolveEventBannerUrl)(u,t):null)),ed(!0===e.is_private||1===e.is_private),em(v(e.start_time)),eh(v(e.end_time))},[j,eE,ej,Q,ev,u]);let eI=a.default.useCallback(()=>{es(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null))},[]);function eO(){"/actions"===h&&p?e.push(`/actions?eventId=${encodeURIComponent(p)}`):h.startsWith("/")&&e.push(h)}function eP(e){let t=e.trim().toLowerCase();return t?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)?null:"Enter a valid email address.":"Email is required."}function e$(e){return e?e.length<8?"Password must be at least 8 characters.":e.length>72?"Password must be at most 72 characters.":null:"Password is required."}function eF(){let e=R.trim();if(!e)return"Your name is required.";if(e.length>75)return"Name must be at most 75 characters.";let t=B.trim();if(!t)return"Organisation name is required.";if(t.length>100)return"Organisation name must be at most 100 characters.";let a=M.trim().replace(/\s/g,"");if(!/^\d{10,12}$/.test(a))return"Mobile must be 10–12 digits (numbers only).";let n=V.trim();return n?n.length>300?"Address must be at most 300 characters.":null:"Full address is required."}function eR(){let e=M.trim().replace(/\s/g,""),t={email:C.trim().toLowerCase(),password:T,name:R.trim(),organisation_name:B.trim(),mobile:e,full_address:V.trim()},a=q.trim();return a&&(t.logo=a),t}async function eU(e){X(!0),k(null);try{let t=new FormData;t.append("photo",e);let a=await fetch(`${u}/api/uploads/admin-logo`,{method:"POST",body:t}),n=await a.json().catch(()=>null);if(!a.ok)throw Error(n?.error||"UPLOAD_FAILED");let i=String(n?.filename||"").trim();if(!i)throw Error("UPLOAD_FAILED");W(i),Y(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),`${u}/uploads/admin/${encodeURIComponent(i)}`))}catch(e){k(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{X(!1)}}async function eB(e){e.preventDefault(),w(!0),k(null);let t=eP(C);if(t){k(t),w(!1);return}let a=e$(T);if(a){k(a),w(!1);return}if(T!==D){k("Passwords do not match."),w(!1);return}let n=eF();if(n){k(n),w(!1);return}if(K){k("Please wait for the logo upload to finish."),w(!1);return}try{let e=await fetch(`${m}/admin/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(eR())}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"REGISTER_FAILED");P(""),y("register-verify")}catch(e){k(e instanceof Error?e.message:"REGISTER_FAILED")}finally{w(!1)}}async function ez(e){e.preventDefault(),w(!0),k(null);let t=eP(C);if(t){k(t),w(!1);return}let a=O.trim();if(!/^\d{6}$/.test(a)){k("Enter the 6-digit OTP from your email."),w(!1);return}try{let e=await fetch(`${m}/admin/auth/verify-registration`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:C.trim().toLowerCase(),otp:a})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"VERIFY_FAILED");(0,r.writeAdminSession)(t.token,t.admin),L(""),I(""),P(""),y("dashboard"),await eL(),eO()}catch(e){k(e instanceof Error?e.message:"VERIFY_FAILED")}finally{w(!1)}}async function eM(){w(!0),k(null),A(null);let e=eP(C),t=e$(T),a=eF();if(e||t||a){k(e||t||a||"Complete the registration form first."),w(!1);return}try{let e=await fetch(`${m}/admin/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(eR())}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"RESEND_FAILED");A("A new OTP has been sent to your email.")}catch(e){k(e instanceof Error?e.message:"RESEND_FAILED")}finally{w(!1)}}async function eH(e){e.preventDefault(),w(!0),k(null);let t=eP(C);if(t){k(t),w(!1);return}let a=e$(T);if(a){k(a),w(!1);return}try{let e=await fetch(`${m}/admin/auth/sign-in`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:C.trim().toLowerCase(),password:T})}),t=await e.json().catch(()=>null);if(!e.ok)throw t?.error==="EMAIL_NOT_VERIFIED"&&y("register-verify"),Error(t?.message||t?.error||"SIGN_IN_FAILED");(0,r.writeAdminSession)(t.token,t.admin),L(""),y("dashboard"),await eL(),eO()}catch(e){k(e instanceof Error?e.message:"SIGN_IN_FAILED")}finally{w(!1)}}async function eV(e){e.preventDefault(),w(!0),k(null);try{let e=await fetch(`${m}/admin/auth/forgot-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:C.trim()})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"FORGOT_FAILED");y("reset")}catch(e){k(e instanceof Error?e.message:"FORGOT_FAILED")}finally{w(!1)}}async function eG(e){e.preventDefault(),w(!0),k(null);try{let e=await fetch(`${m}/admin/auth/reset-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:C.trim(),otp:O.trim(),newPassword:$})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"RESET_FAILED");(0,r.writeAdminSession)(t.token,t.admin),P(""),F(""),y("dashboard"),await eL(),eO()}catch(e){k(e instanceof Error?e.message:"RESET_FAILED")}finally{w(!1)}}function eq(){ef(null),et(""),en(""),er(""),eI(),ed(!1),em(""),eh("")}function eW(){ek(null),eq(),k(null)}async function eJ(e){let t=(0,r.readAdminToken)();if(t){eg(!0),k(null);try{let a=new FormData;a.append("photo",e);let n=await fetch(`${u}/api/uploads/event-photo`,{method:"POST",body:a,headers:{...(0,r.adminAuthHeader)(t)}}),i=await n.json().catch(()=>null);if(!n.ok)throw Error(i?.error||"UPLOAD_FAILED");let l=String(i?.filename||"").trim();if(!l)throw Error("UPLOAD_FAILED");es(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),`${u}/uploads/event/${encodeURIComponent(l)}`)),er(l)}catch(e){k(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{eg(!1)}}}async function eY(e){e.preventDefault();let t=(0,r.readAdminToken)();if(t){if(ec&&!eu||!ec&&eu)return void k("Set both voting start and end, or leave both empty.");w(!0),k(null);try{let e=null!=ev,a=ec&&eu?{start_time:new Date(ec).toISOString(),end_time:new Date(eu).toISOString()}:e?{start_time:"",end_time:""}:{},n=e?{title:ee.trim(),description:ea.trim()||null,image:ei.trim()||null,is_private:+!!eo,...a}:{title:ee.trim(),description:ea.trim()||void 0,image:ei.trim()||void 0,is_private:+!!eo,...a},i=await fetch(e?`${m}/admin/events/${ev}`:`${m}/admin/events`,{method:e?"PATCH":"POST",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(t)},body:JSON.stringify(n)}),l=await i.json().catch(()=>null);if(!i.ok)throw Error(l?.message||l?.error||(e?"UPDATE_EVENT_FAILED":"CREATE_EVENT_FAILED"));let s=e?ev:Number(l?.event?.event_id??0)||null;ek(null),eq(),await eL(),s?eD("detail",s):eD("list")}catch(e){k(e instanceof Error?e.message:"SAVE_EVENT_FAILED")}finally{w(!1)}}}function eK(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M10 11v6M14 11v6",strokeLinecap:"round"})]})}async function eX(e){let t=(0,r.readAdminToken)();if(!t)return;let a=(e.title||"").trim()||"Untitled";if(window.confirm(`Delete "${a}" and all its categories, nominees, and votes? This cannot be undone.`)){w(!0),k(null);try{let n=await fetch(`${m}/admin/events/${e.event_id}`,{method:"DELETE",headers:{...(0,r.adminAuthHeader)(t)}}),i=await n.json().catch(()=>null);if(!n.ok)throw Error(i?.message||i?.error||"DELETE_EVENT_FAILED");ej===e.event_id&&(ey(null),eD("list")),ev===e.event_id&&eq(),await eL(),A(`Deleted "${a}".`)}catch(e){k(e instanceof Error?e.message:"DELETE_EVENT_FAILED")}finally{w(!1)}}}async function eQ(e,t){let a=(0,r.readAdminToken)();if(a){eA(!0),k(null);try{let n=await fetch(`${m}/admin/events/${e.event_id}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(a)},body:JSON.stringify({is_live:+!!t})}),i=await n.json().catch(()=>null);if(!n.ok)throw Error(i?.error||"UPDATE_EVENT_FAILED");eT(e.event_id,{is_live:+!!t})}catch(e){k(e instanceof Error?e.message:"UPDATE_EVENT_FAILED")}finally{eA(!1)}}}async function eZ(e,t){let a=(0,r.readAdminToken)();if(a){eS(!0),k(null);try{let n=await fetch(`${m}/admin/events/${e.event_id}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,r.adminAuthHeader)(a)},body:JSON.stringify({declare_result:+!!t})}),i=await n.json().catch(()=>null);if(!n.ok)throw Error(i?.error||"UPDATE_EVENT_FAILED");eT(e.event_id,{declare_result:+!!t})}catch(e){k(e instanceof Error?e.message:"UPDATE_EVENT_FAILED")}finally{eS(!1)}}}if(a.default.useEffect(()=>()=>{es(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null))},[]),"dashboard"===j){let e,a,n,l,d,h,p,j,w,_,A,C=(0,r.readAdminToken)(),S=null!=ej?Q.find(e=>e.event_id===ej)??null:null,T=(0,t.jsxs)("form",{id:"admin-event-form",onSubmit:eY,children:[(0,t.jsxs)("div",{className:"row-mix",children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Event title *"}),(0,t.jsx)("input",{className:"input",required:!0,value:ee,onChange:e=>et(e.target.value),maxLength:200,placeholder:"Enter event name"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Visibility"}),(0,t.jsxs)("label",{className:"toggle-field",children:[(0,t.jsx)("input",{type:"checkbox",className:"switch",role:"switch",checked:eo,onChange:e=>ed(e.target.checked),"aria-checked":eo}),(0,t.jsx)("span",{className:"toggle-label",children:"Private (invite-only)"})]})]})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Description"}),(0,t.jsx)("textarea",{className:"input",value:ea,onChange:e=>en(e.target.value),maxLength:500,rows:2,placeholder:"Optional short description"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Banner image"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",disabled:ep||N,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(es(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),URL.createObjectURL(t))),er(""),eJ(t)),e.currentTarget.value=""}}),el?(0,t.jsxs)("div",{className:"banner-preview",children:[(0,t.jsx)("img",{src:el,alt:""}),(0,t.jsx)("span",{className:`banner-badge ${ep?"badge-busy":ei?"badge-ok":"badge-preview"}`,children:ep?"Uploading…":ei?"Banner ready":"Preview"})]}):null]}),(0,t.jsxs)("fieldset",{className:"fieldset",children:[(0,t.jsx)("legend",{className:"fieldset-legend",children:"Voting window"}),(0,t.jsx)("p",{className:"fieldset-hint",children:"Set both to restrict when votes count, or leave empty for open voting."}),(0,t.jsxs)("div",{className:"grid2",children:[(0,t.jsxs)("div",{className:"field",style:{margin:0},children:[(0,t.jsx)("div",{className:"label",children:"Start"}),(0,t.jsx)("input",{className:"input",type:"datetime-local",value:ec,onChange:e=>em(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",style:{margin:0},children:[(0,t.jsx)("div",{className:"label",children:"End"}),(0,t.jsx)("input",{className:"input",type:"datetime-local",value:eu,onChange:e=>eh(e.target.value)})]})]})]})]}),L=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"section-head",children:[(0,t.jsx)("span",{className:"section-title",children:"Your events"}),(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:12},children:[(0,t.jsxs)("span",{style:{fontSize:13,color:"var(--text-faint)"},children:[Q.length," total"]}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:function(){eq(),k(null),ek("create")},children:"Add event"})]})]}),0===Q.length?(0,t.jsx)("p",{className:"hint",children:"No events yet — use Add event to create your first one."}):(0,t.jsx)("div",{className:"event-list",children:Q.map(e=>{let a=(e.title||"").trim()||"Untitled",n=(e.description||"").trim(),i=(0,s.resolveEventBannerUrl)(u,e.image);return(0,t.jsxs)("div",{className:"event-card-wrap",children:[(0,t.jsx)("button",{type:"button",className:"event-icon-btn event-icon-btn--danger",disabled:N,"aria-label":`Delete ${a}`,title:"Delete event",onClick:()=>void eX(e),children:(0,t.jsx)(eK,{})}),(0,t.jsx)("button",{type:"button",className:"event-card event-card-clickable",style:{flex:1,minWidth:0},onClick:()=>eD("detail",e.event_id),children:(0,t.jsxs)("div",{className:"event-card-row",children:[i?(0,t.jsx)("img",{src:i,alt:"",className:"event-card-thumb"}):(0,t.jsx)("div",{className:"event-card-thumb-ph","aria-hidden":!0,children:a.slice(0,2).toUpperCase()}),(0,t.jsxs)("div",{className:"event-card-main",children:[(0,t.jsxs)("div",{className:"event-header",style:{marginBottom:4*!!n},children:[(0,t.jsx)("span",{className:"event-title",children:a}),(0,t.jsx)("span",{className:`event-badge ${!0===e.is_private||1===e.is_private?"badge-private":"badge-public"}`,children:!0===e.is_private||1===e.is_private?"Private":"Public"})]}),n?(0,t.jsx)("p",{className:"event-desc",style:{marginBottom:0},children:n}):null]}),(0,t.jsx)("span",{className:"event-card-chevron","aria-hidden":!0,children:"›"})]})})]},e.event_id)})})]}),D=S?(a=(S.title||"").trim()||"Untitled",n=(S.description||"").trim(),l=(0,s.resolveEventBannerUrl)(u,S.image),d=!0===S.is_private||1===S.is_private,h=!0===S.is_live||1===S.is_live,p=!0===S.declare_result||1===S.declare_result,j=function(e){let t=e.start_time,a=e.end_time;if(null==t||null==a||!String(t).trim()||!String(a).trim())return"always";let n=new Date(String(t)).getTime(),i=new Date(String(a)).getTime();if(Number.isNaN(n)||Number.isNaN(i))return"always";let r=Date.now();return r<n?"upcoming":r>i?"ended":"open"}(S),w=f(S.start_time),_=f(S.end_time),A=!!(w&&_),(0,t.jsxs)("article",{className:"event-detail-panel",children:[l?(0,t.jsx)("img",{src:l,alt:"",className:"event-detail-banner"}):(0,t.jsx)("div",{className:"event-detail-banner-ph","aria-hidden":!0,children:a.slice(0,2).toUpperCase()}),(0,t.jsxs)("div",{className:"event-detail-body",children:[(0,t.jsxs)("div",{className:"event-detail-badges",children:[(0,t.jsx)("span",{className:`event-badge ${d?"badge-private":"badge-public"}`,children:d?"Private":"Public"}),(0,t.jsx)("span",{className:`event-badge ${h?"badge-public":"badge-vote-ended"}`,children:h?"Live":"Not live"}),(0,t.jsx)("span",{className:`event-badge ${"open"===j?"badge-vote-open":"upcoming"===j?"badge-vote-upcoming":"ended"===j?"badge-vote-ended":"badge-vote-always"}`,children:"open"===j?"Voting open":"upcoming"===j?"Voting soon":"ended"===j?"Voting ended":"Open voting"})]}),(0,t.jsx)("h1",{className:"event-detail-title",children:a}),n?(0,t.jsx)("p",{className:"event-desc",children:n}):null,A?(0,t.jsxs)("dl",{className:"event-detail-meta",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("dt",{children:"Voting starts"}),(0,t.jsx)("dd",{children:w})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("dt",{children:"Voting ends"}),(0,t.jsx)("dd",{children:_})]})]}):(0,t.jsx)("p",{className:"event-detail-note",children:"Voting window not set — votes count anytime."}),d?(0,t.jsx)("p",{className:"event-detail-note",children:"Invite-only event. Share the register link below with attendees."}):null,(0,t.jsxs)("div",{className:"event-detail-controls",children:[(0,t.jsx)("div",{className:"event-detail-controls-title",children:"Event controls"}),(0,t.jsxs)("div",{className:"event-detail-controls-row",children:[(0,t.jsxs)("label",{className:o.default.adminApproveSwitch,title:h?"Event is live":"Make event live",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:h,disabled:e_||N,onChange:e=>void eQ(S,e.target.checked),"aria-label":h?"Take event offline":"Go live"}),(0,t.jsx)("span",{className:o.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:"Go live"})]}),(0,t.jsxs)("label",{className:o.default.adminApproveSwitch,title:p?"All category results declared":"Declare all category results",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:p,disabled:eC||N,onChange:e=>void eZ(S,e.target.checked),"aria-label":p?"Undeclare all results":"Declare all results"}),(0,t.jsx)("span",{className:o.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:"Declare all results"})]})]}),(0,t.jsx)("p",{className:"event-detail-note",style:{marginBottom:0},children:"Go live opens voting on the public event page. Per-category Show nominee and Declare result are in Categories."})]}),(0,t.jsxs)("div",{className:"event-detail-actions",children:[(0,t.jsx)("button",{type:"button",className:"btn btn-danger",disabled:N,onClick:()=>void eX(S),children:"Delete event"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>{let e;return ef(S.event_id),et((S.title||"").trim()),en((S.description||"").trim()),void(er(e=(S.image||"").trim()),es(t=>(t?.startsWith("blob:")&&URL.revokeObjectURL(t),e?(0,s.resolveEventBannerUrl)(u,e):null)),ed(!0===S.is_private||1===S.is_private),em(v(S.start_time)),eh(v(S.end_time)),k(null),ek("edit"),ej!==S.event_id&&eD("detail",S.event_id))},children:"Edit event"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eD("categories",S.event_id),children:"Categories"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eD("nominees",S.event_id),children:"Nominees"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,i.withBasePath)(`/actions?eventId=${S.event_id}`),style:{textDecoration:"none"},children:"LED controls"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,i.withBasePath)(`/screen?eventId=${S.event_id}`),target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"Open LED screen"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>{var e;navigator.clipboard.writeText((e=S.event_id,(0,i.fullAppUrl)(`/register?eventId=${e}`))),ew(!0),window.setTimeout(()=>ew(!1),2e3)},children:eN?"Link copied":"Copy register link"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,i.withBasePath)(`/events/${S.event_id}`),target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"Public event page"})]})]})]})):(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("p",{className:"hint",style:{padding:"1rem 0"},children:"Event not found."}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eD("list"),children:"Back to your events"})]});if("detail"===ex)e=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)("button",{type:"button",className:"back-link",onClick:()=>eD("list"),children:"← Your events"})}),D]});else if(("categories"===ex||"nominees"===ex)&&null!=ej){let a=Q.find(e=>e.event_id===ej),n=(0,r.readAdminToken)();e=a&&n?(0,t.jsx)(g,{mode:ex,eventId:ej,eventTitle:(a.title||"").trim()||"Untitled",eventDeclareResult:!0===a.declare_result||1===a.declare_result,apiBase:m,apiOrigin:u,token:n,onBack:()=>eD("detail",ej),onGoCategories:()=>eD("categories",ej)}):(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("p",{className:"hint",style:{padding:"1rem 0"},children:"Event not found."}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eD("list"),children:"Back to your events"})]})}else e=L;return(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:x}),(0,t.jsxs)("div",{className:"dashboard",children:[(0,t.jsxs)("div",{className:"topbar",children:[(0,t.jsxs)("div",{className:"topbar-brand",children:[(0,t.jsx)("div",{className:"topbar-icon",children:(0,t.jsx)(b,{})}),(0,t.jsx)("span",{className:"topbar-title",children:"Event Admin"})]}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:function(){(0,r.clearAdminSession)(),y("auth"),Z([])},children:"Log out"})]}),E&&(0,t.jsx)("div",{className:"error-box",children:E}),e,eE?(0,t.jsx)(c,{wide:!0,title:"create"===eE?"New event":"Edit event",onClose:eW,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",disabled:N||ep,onClick:eW,children:"Cancel"}),(0,t.jsx)("button",{type:"submit",form:"admin-event-form",className:"btn",disabled:N||ep,children:N?"Saving…":"edit"===eE?"Save changes":"Create event"})]}),children:T}):null,!C&&(0,t.jsx)("p",{className:"error-box",style:{marginTop:16},children:"Session missing — please log in again."})]})]})}return"forgot"===j?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:x}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(b,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Forgot password"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Enter your email and we'll send a 6-digit OTP."}),E&&(0,t.jsx)("div",{className:"error-box",children:E}),(0,t.jsxs)("form",{onSubmit:eV,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:C,onChange:e=>S(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:N,children:N?"Sending…":"Send OTP"})]}),(0,t.jsx)("div",{className:"auth-footer",children:(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>y("auth"),children:"← Back to sign in"})})]})})]}):"register"===j?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:x}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card auth-card-wide",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(b,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Create account"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Fill in your details. We will email a one-time code to verify your account."}),E&&(0,t.jsx)("div",{className:"error-box",children:E}),(0,t.jsxs)("form",{onSubmit:eB,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Your name *"}),(0,t.jsx)("input",{className:"input",required:!0,value:R,onChange:e=>U(e.target.value),placeholder:"Full name",maxLength:75,autoComplete:"name"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Organisation name *"}),(0,t.jsx)("input",{className:"input",required:!0,value:B,onChange:e=>z(e.target.value),placeholder:"Company or organisation",maxLength:100,autoComplete:"organization"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Mobile *"}),(0,t.jsx)("input",{className:"input",type:"tel",required:!0,value:M,onChange:e=>H(e.target.value.replace(/[^\d\s]/g,"").slice(0,12)),placeholder:"10–12 digit mobile number",inputMode:"numeric",autoComplete:"tel"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Full address *"}),(0,t.jsx)("textarea",{className:"input",required:!0,value:V,onChange:e=>G(e.target.value),placeholder:"Street, city, state, PIN",maxLength:300,rows:2,autoComplete:"street-address"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Organisation logo (optional)"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",disabled:N||K,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(Y(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),URL.createObjectURL(t))),W(""),eU(t)),e.currentTarget.value=""}}),J?(0,t.jsxs)("div",{className:"banner-preview",style:{marginTop:10},children:[(0,t.jsx)("img",{src:J,alt:"",style:{height:80,objectFit:"contain",background:"#f8fafc"}}),(0,t.jsx)("span",{className:`banner-badge ${K?"badge-busy":q?"badge-ok":"badge-preview"}`,children:K?"Uploading…":q?"Logo ready":"Preview"})]}):null]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email *"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,autoComplete:"email",value:C,onChange:e=>S(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Password *"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"new-password",value:T,onChange:e=>L(e.target.value),placeholder:"At least 8 characters",minLength:8,maxLength:72})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Confirm password *"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"new-password",value:D,onChange:e=>I(e.target.value),placeholder:"Re-enter password",minLength:8,maxLength:72})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:N||K,children:N?"Sending OTP…":"Send OTP"})]}),(0,t.jsx)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{k(null),y("auth")},children:"Already have an account? Sign in"})})]})})]}):"register-verify"===j?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:x}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(b,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Verify your email"}),(0,t.jsxs)("div",{className:"auth-subtitle",children:["Enter the 6-digit OTP sent to ",(0,t.jsx)("strong",{children:C.trim()||"your email"}),"."]}),E&&(0,t.jsx)("div",{className:"error-box",children:E}),_&&(0,t.jsx)("div",{className:"info-box",children:_}),(0,t.jsxs)("form",{onSubmit:ez,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:C,onChange:e=>S(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"OTP"}),(0,t.jsx)("input",{className:"input",required:!0,value:O,onChange:e=>P(e.target.value.replace(/\D/g,"").slice(0,6)),placeholder:"6-digit code",inputMode:"numeric",maxLength:6,pattern:"\\d{6}"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:N,children:N?"Verifying…":"Verify & continue"})]}),(0,t.jsxs)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:[(0,t.jsx)("button",{type:"button",className:"link-btn",disabled:N,onClick:()=>void eM(),children:"Resend OTP"}),(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{k(null),y("register")},children:"← Back to register"})]})]})})]}):"reset"===j?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:x}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(b,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Reset password"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Enter the OTP from your email and choose a new password."}),E&&(0,t.jsx)("div",{className:"error-box",children:E}),(0,t.jsxs)("form",{onSubmit:eG,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:C,onChange:e=>S(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"OTP"}),(0,t.jsx)("input",{className:"input",required:!0,value:O,onChange:e=>P(e.target.value),placeholder:"6-digit code",inputMode:"numeric",maxLength:6})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"New password"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,value:$,onChange:e=>F(e.target.value),placeholder:"At least 8 characters"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:N,children:N?"Saving…":"Reset & sign in"})]})]})})]}):"boot"===j?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:x}),(0,t.jsx)("div",{style:{minHeight:"100dvh",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text-muted)",fontSize:14},children:"Checking session…"})]}):(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:x}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(b,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Welcome back"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Sign in to manage your events."}),E&&(0,t.jsx)("div",{className:"error-box",children:E}),(0,t.jsxs)("form",{onSubmit:eH,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,autoComplete:"email",value:C,onChange:e=>S(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Password"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"current-password",value:T,onChange:e=>L(e.target.value),placeholder:"Min 8 characters",minLength:8,maxLength:72})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:N,children:N?"Please wait…":"Sign in"})]}),(0,t.jsxs)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:[(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{k(null),y("forgot")},children:"Forgot password?"}),(0,t.jsxs)("span",{style:{color:"var(--text-muted)"},children:["Don't have an account?"," ",(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:function(){k(null),I(""),P(""),U(""),z(""),H(""),G(""),W(""),Y(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null)),y("register")},children:"Register"})]})]})]})})]})}e.s(["default",0,function(){return(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{style:{minHeight:"100vh",background:"#e8f0fe",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b",fontFamily:"sans-serif",fontSize:14},children:"Loading…"}),children:(0,t.jsx)(j,{})})}],72906)}]);