(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,82608,e=>{"use strict";function t(e){let t=e.replace(/\/+$/,"");return/\/api$/i.test(t)?t:`${t}/api`}function a(){let e="http://localhost:4000".trim(),a=e?t(e):null;if(!a)return t("http://3.0.81.7");{let e=window.location.hostname;if((/:\/\/localhost\b/i.test(a)||/:\/\/127\.0\.0\.1\b/.test(a))&&"localhost"!==e&&"127.0.0.1"!==e)return`${window.location.origin}/api`}return a}e.s(["getPublicApiBase",0,a,"getUploadsOrigin",0,function(){return a().replace(/\/api$/i,"")}])},18566,(e,t,a)=>{t.exports=e.r(76562)},37645,e=>{"use strict";var t=e.i(47167);e.s(["withBasePath",0,function(e){let a=(t.default.env.NEXT_PUBLIC_BASE_PATH||"").replace(/\/+$/,"");if(!a)return e.startsWith("/")?e:`/${e}`;let r=e.startsWith("/")?e:`/${e}`;return`${a}${r}`}])},90165,e=>{"use strict";let t="awards_event_admin_token_v1",a="awards_event_admin_meta_v1";e.s(["adminAuthHeader",0,function(e){return e?{Authorization:`Bearer ${e}`}:{}},"clearAdminSession",0,function(){window.sessionStorage.removeItem(t),window.sessionStorage.removeItem(a)},"readAdminToken",0,function(){try{return window.sessionStorage.getItem(t)}catch{return null}},"writeAdminSession",0,function(e,r){window.sessionStorage.setItem(t,e),window.sessionStorage.setItem(a,JSON.stringify(r))}])},72906,e=>{"use strict";var t=e.i(43476),a=e.i(71645),r=e.i(18566),i=e.i(37645),s=e.i(90165),n=e.i(82608);function l(e){if(null==e||""===e)return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let a=e=>String(e).padStart(2,"0");return`${t.getFullYear()}-${a(t.getMonth()+1)}-${a(t.getDate())}T${a(t.getHours())}:${a(t.getMinutes())}`}let o=`
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
`;function d(){return(0,t.jsx)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"})})}function c(){let e=(0,r.useRouter)(),c=(0,r.useSearchParams)(),u=(0,n.getPublicApiBase)(),h=(0,n.getUploadsOrigin)(),m=c.get("next")||"",p=c.get("eventId")||"",[g,x]=a.default.useState("auth"),[f,b]=a.default.useState(!1),[v,j]=a.default.useState(null),[w,y]=a.default.useState(null),[N,k]=a.default.useState(""),[E,S]=a.default.useState(""),[A,C]=a.default.useState(""),[T,_]=a.default.useState(""),[L,D]=a.default.useState(""),[O,P]=a.default.useState([]),[I,$]=a.default.useState(""),[R,F]=a.default.useState(""),[z,U]=a.default.useState(""),[B,q]=a.default.useState(null),[M,V]=a.default.useState(!1),[W,H]=a.default.useState(""),[J,G]=a.default.useState(""),[Y,K]=a.default.useState(!1),[X,Q]=a.default.useState(null),Z=a.default.useCallback(async()=>{let e=(0,s.readAdminToken)();if(!e)return;let t=await fetch(`${u}/admin/events`,{headers:{...(0,s.adminAuthHeader)(e)}}),a=await t.json().catch(()=>null);if(!t.ok){401===t.status&&(0,s.clearAdminSession)();return}P(Array.isArray(a?.events)?a.events:[])},[u]);a.default.useEffect(()=>{let e=(0,s.readAdminToken)();e&&(async()=>{(await fetch(`${u}/admin/me`,{headers:{...(0,s.adminAuthHeader)(e)}})).ok&&(x("dashboard"),await Z())})()},[u,Z]);let ee=a.default.useCallback(()=>{q(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null))},[]);function et(){"/actions"===m&&p?e.push((0,i.withBasePath)(`/actions?eventId=${encodeURIComponent(p)}`)):m.startsWith("/")&&e.push((0,i.withBasePath)(m))}function ea(e){let t=e.trim().toLowerCase();return t?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)?null:"Enter a valid email address.":"Email is required."}function er(e){return e?e.length<8?"Password must be at least 8 characters.":e.length>72?"Password must be at most 72 characters.":null:"Password is required."}async function ei(e){e.preventDefault(),b(!0),j(null);let t=ea(N);if(t){j(t),b(!1);return}let a=er(E);if(a){j(a),b(!1);return}if(E!==A){j("Passwords do not match."),b(!1);return}try{let e=await fetch(`${u}/admin/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:N.trim().toLowerCase(),password:E})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"REGISTER_FAILED");_(""),x("register-verify")}catch(e){j(e instanceof Error?e.message:"REGISTER_FAILED")}finally{b(!1)}}async function es(e){e.preventDefault(),b(!0),j(null);let t=ea(N);if(t){j(t),b(!1);return}let a=T.trim();if(!/^\d{6}$/.test(a)){j("Enter the 6-digit OTP from your email."),b(!1);return}try{let e=await fetch(`${u}/admin/auth/verify-registration`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:N.trim().toLowerCase(),otp:a})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"VERIFY_FAILED");(0,s.writeAdminSession)(t.token,t.admin),S(""),C(""),_(""),x("dashboard"),await Z(),et()}catch(e){j(e instanceof Error?e.message:"VERIFY_FAILED")}finally{b(!1)}}async function en(){b(!0),j(null),y(null);let e=ea(N),t=er(E);if(e||t){j(e||t||"Enter email and password on the register screen first."),b(!1);return}try{let e=await fetch(`${u}/admin/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:N.trim().toLowerCase(),password:E})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"RESEND_FAILED");y("A new OTP has been sent to your email.")}catch(e){j(e instanceof Error?e.message:"RESEND_FAILED")}finally{b(!1)}}async function el(e){e.preventDefault(),b(!0),j(null);let t=ea(N);if(t){j(t),b(!1);return}let a=er(E);if(a){j(a),b(!1);return}try{let e=await fetch(`${u}/admin/auth/sign-in`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:N.trim().toLowerCase(),password:E})}),t=await e.json().catch(()=>null);if(!e.ok)throw t?.error==="EMAIL_NOT_VERIFIED"&&x("register-verify"),Error(t?.message||t?.error||"SIGN_IN_FAILED");(0,s.writeAdminSession)(t.token,t.admin),S(""),x("dashboard"),await Z(),et()}catch(e){j(e instanceof Error?e.message:"SIGN_IN_FAILED")}finally{b(!1)}}async function eo(e){e.preventDefault(),b(!0),j(null);try{let e=await fetch(`${u}/admin/auth/forgot-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:N.trim()})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"FORGOT_FAILED");x("reset")}catch(e){j(e instanceof Error?e.message:"FORGOT_FAILED")}finally{b(!1)}}async function ed(e){e.preventDefault(),b(!0),j(null);try{let e=await fetch(`${u}/admin/auth/reset-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:N.trim(),otp:T.trim(),newPassword:L})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"RESET_FAILED");(0,s.writeAdminSession)(t.token,t.admin),_(""),D(""),x("dashboard"),await Z(),et()}catch(e){j(e instanceof Error?e.message:"RESET_FAILED")}finally{b(!1)}}function ec(){Q(null),$(""),F(""),U(""),ee(),V(!1),H(""),G(""),j(null)}async function eu(e){let t=(0,s.readAdminToken)();if(t){K(!0),j(null);try{let a=new FormData;a.append("photo",e);let r=await fetch(`${h}/api/uploads/event-photo`,{method:"POST",body:a,headers:{...(0,s.adminAuthHeader)(t)}}),i=await r.json().catch(()=>null);if(!r.ok)throw Error(i?.error||"UPLOAD_FAILED");let n=String(i?.filename||"").trim();if(!n)throw Error("UPLOAD_FAILED");q(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),`${h}/uploads/event/${encodeURIComponent(n)}`)),U(n)}catch(e){j(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{K(!1)}}}async function eh(e){e.preventDefault();let t=(0,s.readAdminToken)();if(t){if(W&&!J||!W&&J)return void j("Set both voting start and end, or leave both empty.");b(!0),j(null);try{let e=null!=X,a=W&&J?{start_time:new Date(W).toISOString(),end_time:new Date(J).toISOString()}:e?{start_time:"",end_time:""}:{},r=e?{title:I.trim(),description:R.trim()||null,image:z.trim()||null,is_private:+!!M,...a}:{title:I.trim(),description:R.trim()||void 0,image:z.trim()||void 0,is_private:+!!M,...a},i=await fetch(e?`${u}/admin/events/${X}`:`${u}/admin/events`,{method:e?"PATCH":"POST",headers:{"Content-Type":"application/json",...(0,s.adminAuthHeader)(t)},body:JSON.stringify(r)}),n=await i.json().catch(()=>null);if(!i.ok)throw Error(n?.message||n?.error||(e?"UPDATE_EVENT_FAILED":"CREATE_EVENT_FAILED"));e?ec():($(""),F(""),ee(),U(""),V(!1),H(""),G("")),await Z()}catch(e){j(e instanceof Error?e.message:"SAVE_EVENT_FAILED")}finally{b(!1)}}}if(a.default.useEffect(()=>()=>{q(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null))},[]),"dashboard"===g){let e=(0,s.readAdminToken)();return(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:o}),(0,t.jsxs)("div",{className:"dashboard",children:[(0,t.jsxs)("div",{className:"topbar",children:[(0,t.jsxs)("div",{className:"topbar-brand",children:[(0,t.jsx)("div",{className:"topbar-icon",children:(0,t.jsx)(d,{})}),(0,t.jsx)("span",{className:"topbar-title",children:"Event Admin"})]}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:function(){(0,s.clearAdminSession)(),x("auth"),P([])},children:"Log out"})]}),v&&(0,t.jsx)("div",{className:"error-box",children:v}),(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsxs)("div",{className:"panel-title",children:[null!=X?"Edit event":"New event",null!=X&&(0,t.jsx)("span",{className:"panel-title-pill",children:"Editing"})]}),(0,t.jsxs)("form",{onSubmit:eh,children:[(0,t.jsxs)("div",{className:"row-mix",children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Event title *"}),(0,t.jsx)("input",{className:"input",required:!0,value:I,onChange:e=>$(e.target.value),maxLength:200,placeholder:"Enter event name"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Visibility"}),(0,t.jsxs)("label",{className:"toggle-field",children:[(0,t.jsx)("input",{type:"checkbox",className:"switch",role:"switch",checked:M,onChange:e=>V(e.target.checked),"aria-checked":M}),(0,t.jsx)("span",{className:"toggle-label",children:"Private (invite-only)"})]})]})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Description"}),(0,t.jsx)("textarea",{className:"input",value:R,onChange:e=>F(e.target.value),maxLength:500,rows:2,placeholder:"Optional short description"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Banner image"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",disabled:Y||f,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(q(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),URL.createObjectURL(t))),U(""),eu(t)),e.currentTarget.value=""}}),B?(0,t.jsxs)("div",{className:"banner-preview",children:[(0,t.jsx)("img",{src:B,alt:""}),(0,t.jsx)("span",{className:`banner-badge ${Y?"badge-busy":z?"badge-ok":"badge-preview"}`,children:Y?"Uploading…":z?"Banner ready":"Preview"})]}):null]}),(0,t.jsxs)("fieldset",{className:"fieldset",children:[(0,t.jsx)("legend",{className:"fieldset-legend",children:"Voting window"}),(0,t.jsx)("p",{className:"fieldset-hint",children:"Set both to restrict when votes count, or leave empty for open voting."}),(0,t.jsxs)("div",{className:"grid2",children:[(0,t.jsxs)("div",{className:"field",style:{margin:0},children:[(0,t.jsx)("div",{className:"label",children:"Start"}),(0,t.jsx)("input",{className:"input",type:"datetime-local",value:W,onChange:e=>H(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",style:{margin:0},children:[(0,t.jsx)("div",{className:"label",children:"End"}),(0,t.jsx)("input",{className:"input",type:"datetime-local",value:J,onChange:e=>G(e.target.value)})]})]})]}),(0,t.jsxs)("div",{className:"actions-row",children:[(0,t.jsx)("button",{type:"submit",className:"btn",disabled:f||Y,children:f?"Saving…":null!=X?"Save changes":"Create event"}),null!=X&&(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",disabled:f||Y,onClick:ec,children:"Cancel"})]})]})]}),(0,t.jsxs)("div",{className:"section-head",children:[(0,t.jsx)("span",{className:"section-title",children:"Your events"}),(0,t.jsxs)("span",{style:{fontSize:13,color:"var(--text-faint)"},children:[O.length," total"]})]}),0===O.length?(0,t.jsx)("p",{className:"hint",children:"No events yet — create one above."}):(0,t.jsx)("div",{className:"event-list",children:O.map(e=>(0,t.jsxs)("div",{className:"event-card",children:[(0,t.jsxs)("div",{className:"event-header",children:[(0,t.jsx)("span",{className:"event-title",children:e.title||"Untitled"}),(0,t.jsx)("span",{className:`event-badge ${!0===e.is_private||1===e.is_private?"badge-private":"badge-public"}`,children:!0===e.is_private||1===e.is_private?"Private":"Public"})]}),e.description&&(0,t.jsx)("p",{className:"event-desc",children:e.description}),(0,t.jsxs)("div",{className:"event-actions",children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>{let t;return Q(e.event_id),$((e.title||"").trim()),F((e.description||"").trim()),void(U(t=(e.image||"").trim()),q(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),t?`${h}/uploads/event/${encodeURIComponent(t)}`:null)),V(!0===e.is_private||1===e.is_private),H(l(e.start_time)),G(l(e.end_time)),j(null),window.scrollTo({top:0,behavior:"smooth"}))},children:"Edit"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,i.withBasePath)(`/actions?eventId=${e.event_id}`),style:{textDecoration:"none"},children:"Open LED actions"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,i.withBasePath)(`/screen?eventId=${e.event_id}`),target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"Open LED"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>{var t;navigator.clipboard.writeText((t=e.event_id,`${window.location.origin}${(0,i.withBasePath)(`/register?eventId=${t}`)}`))},children:"Copy register link"})]})]},e.event_id))}),!e&&(0,t.jsx)("p",{className:"error-box",style:{marginTop:16},children:"Session missing — please log in again."})]})]})}return"forgot"===g?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:o}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(d,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Forgot password"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Enter your email and we'll send a 6-digit OTP."}),v&&(0,t.jsx)("div",{className:"error-box",children:v}),(0,t.jsxs)("form",{onSubmit:eo,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:N,onChange:e=>k(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:f,children:f?"Sending…":"Send OTP"})]}),(0,t.jsx)("div",{className:"auth-footer",children:(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>x("auth"),children:"← Back to sign in"})})]})})]}):"register"===g?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:o}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(d,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Create account"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Register with your email. We will send a one-time code to verify it."}),v&&(0,t.jsx)("div",{className:"error-box",children:v}),(0,t.jsxs)("form",{onSubmit:ei,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,autoComplete:"email",value:N,onChange:e=>k(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Password"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"new-password",value:E,onChange:e=>S(e.target.value),placeholder:"At least 8 characters",minLength:8,maxLength:72})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Confirm password"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"new-password",value:A,onChange:e=>C(e.target.value),placeholder:"Re-enter password",minLength:8,maxLength:72})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:f,children:f?"Sending OTP…":"Send OTP"})]}),(0,t.jsx)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{j(null),x("auth")},children:"Already have an account? Sign in"})})]})})]}):"register-verify"===g?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:o}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(d,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Verify your email"}),(0,t.jsxs)("div",{className:"auth-subtitle",children:["Enter the 6-digit OTP sent to ",(0,t.jsx)("strong",{children:N.trim()||"your email"}),"."]}),v&&(0,t.jsx)("div",{className:"error-box",children:v}),w&&(0,t.jsx)("div",{className:"info-box",children:w}),(0,t.jsxs)("form",{onSubmit:es,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:N,onChange:e=>k(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"OTP"}),(0,t.jsx)("input",{className:"input",required:!0,value:T,onChange:e=>_(e.target.value.replace(/\D/g,"").slice(0,6)),placeholder:"6-digit code",inputMode:"numeric",maxLength:6,pattern:"\\d{6}"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:f,children:f?"Verifying…":"Verify & continue"})]}),(0,t.jsxs)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:[(0,t.jsx)("button",{type:"button",className:"link-btn",disabled:f,onClick:()=>void en(),children:"Resend OTP"}),(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{j(null),x("register")},children:"← Back to register"})]})]})})]}):"reset"===g?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:o}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(d,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Reset password"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Enter the OTP from your email and choose a new password."}),v&&(0,t.jsx)("div",{className:"error-box",children:v}),(0,t.jsxs)("form",{onSubmit:ed,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:N,onChange:e=>k(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"OTP"}),(0,t.jsx)("input",{className:"input",required:!0,value:T,onChange:e=>_(e.target.value),placeholder:"6-digit code",inputMode:"numeric",maxLength:6})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"New password"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,value:L,onChange:e=>D(e.target.value),placeholder:"At least 8 characters"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:f,children:f?"Saving…":"Reset & sign in"})]})]})})]}):(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:o}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(d,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Welcome back"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Sign in to manage your events."}),v&&(0,t.jsx)("div",{className:"error-box",children:v}),(0,t.jsxs)("form",{onSubmit:el,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,autoComplete:"email",value:N,onChange:e=>k(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Password"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"current-password",value:E,onChange:e=>S(e.target.value),placeholder:"Min 8 characters",minLength:8,maxLength:72})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:f,children:f?"Please wait…":"Sign in"})]}),(0,t.jsxs)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:[(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{j(null),x("forgot")},children:"Forgot password?"}),(0,t.jsxs)("span",{style:{color:"var(--text-muted)"},children:["Don't have an account?"," ",(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:function(){j(null),C(""),_(""),x("register")},children:"Register"})]})]})]})})]})}e.s(["default",0,function(){return(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{style:{minHeight:"100vh",background:"#e8f0fe",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b",fontFamily:"sans-serif",fontSize:14},children:"Loading…"}),children:(0,t.jsx)(c,{})})}])}]);