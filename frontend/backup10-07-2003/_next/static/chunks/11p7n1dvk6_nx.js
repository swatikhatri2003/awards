(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,72906,e=>{"use strict";var t=e.i(43476),a=e.i(71645),n=e.i(18566),r=e.i(37645),i=e.i(90165),l=e.i(82608),o=e.i(86347),s=e.i(30434),d=e.i(11688),c=e.i(36888),u=e.i(5099);function m(e){return(0,t.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:(0,t.jsx)("path",{d:"M18 6L6 18M6 6l12 12",strokeLinecap:"round"})})}function p(e){let{title:n,titleId:r="admin-modal-title",wide:i,onClose:l,footer:o,children:s}=e;return a.default.useEffect(()=>{let e=e=>{"Escape"===e.key&&l()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[l]),(0,t.jsx)("div",{className:d.default.adminModalBackdrop,role:"presentation",onClick:l,children:(0,t.jsxs)("div",{className:`${d.default.adminModal} ${i?d.default.adminModalWide:""}`,role:"dialog","aria-modal":"true","aria-labelledby":r,onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:d.default.adminModalHead,children:[(0,t.jsx)("h2",{id:r,className:d.default.adminModalTitle,children:n}),(0,t.jsx)("button",{type:"button",className:d.default.adminIconBtn,onClick:l,"aria-label":"Close",children:(0,t.jsx)(m,{})})]}),s,o?(0,t.jsx)("div",{className:d.default.adminModalFooter,children:o}):null]})})}var h=e.i(21435);e.i(47167);var f=e.i(1447),g=e.i(53488),v=e.i(76776),v=v,b=e.i(55323),x=e.i(78564),y=e.i(64719),j=e.i(69072);function w(e){return(0,j.default)("MuiCardHeader",e)}let N=(0,y.default)("MuiCardHeader",["root","avatar","action","content","title","subheader"]);var k=e.i(75822);let E=(0,b.styled)("div",{name:"MuiCardHeader",slot:"Root",overridesResolver:(e,t)=>[{[`& .${N.title}`]:t.title},{[`& .${N.subheader}`]:t.subheader},t.root]})({display:"flex",alignItems:"center",padding:16}),C=(0,b.styled)("div",{name:"MuiCardHeader",slot:"Avatar"})({display:"flex",flex:"0 0 auto",marginRight:16}),A=(0,b.styled)("div",{name:"MuiCardHeader",slot:"Action"})({flex:"0 0 auto",alignSelf:"flex-start",marginTop:-4,marginRight:-8,marginBottom:-4}),T=(0,b.styled)("div",{name:"MuiCardHeader",slot:"Content"})({flex:"1 1 auto",[`.${v.default.root}:where(& .${N.title})`]:{display:"block"},[`.${v.default.root}:where(& .${N.subheader})`]:{display:"block"}}),S=a.forwardRef(function(e,a){let n=(0,x.useDefaultProps)({props:e,name:"MuiCardHeader"}),{action:r,avatar:i,component:l="div",disableTypography:o=!1,subheader:s,title:d,slots:c={},slotProps:u={},...m}=n,p={...n,component:l,disableTypography:o},h=(e=>{let{classes:t}=e;return(0,f.default)({root:["root"],avatar:["avatar"],action:["action"],content:["content"],title:["title"],subheader:["subheader"]},w,t)})(p),v={slots:c,slotProps:u},b=d,[y,j]=(0,k.default)("title",{className:h.title,elementType:g.default,externalForwardedProps:v,ownerState:p,additionalProps:{variant:i?"body2":"h5",component:"span"}});null==b||b.type===g.default||o||(b=(0,t.jsx)(y,{...j,children:b}));let N=s,[S,L]=(0,k.default)("subheader",{className:h.subheader,elementType:g.default,externalForwardedProps:v,ownerState:p,additionalProps:{variant:i?"body2":"body1",color:"textSecondary",component:"span"}});null==N||N.type===g.default||o||(N=(0,t.jsx)(S,{...L,children:N}));let[_,I]=(0,k.default)("root",{ref:a,className:h.root,elementType:E,externalForwardedProps:{...v,...m,component:l},ownerState:p}),[D,R]=(0,k.default)("avatar",{className:h.avatar,elementType:C,externalForwardedProps:v,ownerState:p}),[P,M]=(0,k.default)("content",{className:h.content,elementType:T,externalForwardedProps:v,ownerState:p}),[O,$]=(0,k.default)("action",{className:h.action,elementType:A,externalForwardedProps:v,ownerState:p});return(0,t.jsxs)(_,{...I,children:[i&&(0,t.jsx)(D,{...R,children:i}),(0,t.jsxs)(P,{...M,children:[b,N]}),r&&(0,t.jsx)(O,{...$,children:r})]})});var L=e.i(58598),_=e.i(17050),I=e.i(84244),D=e.i(9303),R=e.i(553);let P=Object.is;function M(e){let t=e.activeElement;for(;t?.shadowRoot?.activeElement!=null;)t=t.shadowRoot.activeElement;return t}var O=e.i(2092);function $(e,t){"function"==typeof e?e(t):e&&(e.current=t)}var F=e.i(95154),U=e.i(42032),B=e.i(24603);let z=a.createContext(void 0),H=["ArrowRight","ArrowLeft","ArrowUp","ArrowDown","Home","End"];function W(e,t,a,n){var r,i,l;let o;return null!=e?(r=e,i=t,l=a,-1===(o=K(i,r))?Y(i,l):l(i[o])?i[o].id:q(i,o,"next",!1,l)?.id??null):function(e,t,a){let n=a?.(e);if(null!=n){let a=G(e,n);if(a&&t(a))return a.id}return Y(e,t)}(t,a,n)}function V(e,t,a){if(t){let a=J(e,t);if(-1!==a)return a}return K(e,a)}function q(e,t,a,n,r){let i=e.length-1;if(-1===i)return null;let l=!1,o=Z(t,i,a,n),s=o;for(;-1!==o;){if(o===s){if(l)return null;l=!0}let t=e[o];if(t&&r(t))return t;o=Z(o,i,a,n)}return null}function Y(e,t){return e.find(e=>t(e))?.id??null}function G(e,t){return null==t?null:e.find(e=>e.id===t)??null}function K(e,t){return null==t?-1:e.findIndex(e=>e.id===t)}function J(e,t){return t?e.findIndex(e=>e.element===t||e.element?.contains(t)):-1}function X(e){let t=Array.from(e.values());return t.every(e=>null==e.element)?t:[...t.filter(et).sort((e,t)=>(function(e,t){if(e===t)return 0;let a=e.compareDocumentPosition(t);return a&Node.DOCUMENT_POSITION_FOLLOWING||a&Node.DOCUMENT_POSITION_CONTAINED_BY?-1:a&Node.DOCUMENT_POSITION_PRECEDING||a&Node.DOCUMENT_POSITION_CONTAINS?1:0})(e.element,t.element)),...t.filter(e=>!et(e))]}function Q(e){return X(e).filter(et)}function Z(e,t,a,n=!0){return"next"===a?e===t?n?0:-1:e+1:0===e?n?t:-1:e-1}function ee(e){return!!e.element&&(!!e.focusableWhenDisabled||!e.disabled&&!e.element.hasAttribute("disabled")&&"true"!==e.element.getAttribute("aria-disabled")&&e.element.hasAttribute("tabindex"))}function et(e){return null!=e.element&&e.element.isConnected}let ea=e.i(11840).default,en=O.default;function er(e=window){let t=e.document.documentElement.clientWidth;return e.innerWidth-t}function ei(e,t){if(null==t)return void e.focus();try{e.focus({focusVisible:"keyboard"===t})}catch(t){e.focus()}}var el=e.i(80012),eo=e.i(73129);let es=F.default;function ed(e){return(0,O.default)(e).defaultView||window}var ec=e.i(7670);let eu=a.createContext({});function em(e){return(0,j.default)("MuiList",e)}(0,y.default)("MuiList",["root","padding","dense","subheader"]);let ep=(0,b.styled)("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.root,!a.disablePadding&&t.padding,a.dense&&t.dense,a.subheader&&t.subheader]}})({listStyle:"none",margin:0,padding:0,position:"relative",variants:[{props:({ownerState:e})=>!e.disablePadding,style:{paddingTop:8,paddingBottom:8}},{props:({ownerState:e})=>e.subheader,style:{paddingTop:0,isolation:"isolate"}}]}),eh=a.forwardRef(function(e,n){let r=(0,x.useDefaultProps)({props:e,name:"MuiList"}),{children:i,className:l,component:o="ul",dense:s=!1,disablePadding:d=!1,subheader:c,...u}=r,m=a.useMemo(()=>({dense:s}),[s]),p={...r,component:o,dense:s,disablePadding:d},h=(e=>{let{classes:t,disablePadding:a,dense:n,subheader:r}=e;return(0,f.default)({root:["root",!a&&"padding",n&&"dense",r&&"subheader"]},em,t)})(p);return(0,t.jsx)(eu.Provider,{value:m,children:(0,t.jsxs)(ep,{as:o,className:(0,ec.default)(h.root,l),ref:n,ownerState:p,...u,children:[c,i]})})}),ef=a.createContext(null);function eg(){return a.useContext(ef)}ef.Provider;let ev=a.createContext(void 0);function eb(e,t){if(void 0===t)return!0;let a=function(e){let t=e?.element??e;if(!t)return"";if(e?.textValue!==void 0)return e.textValue;let a=t.innerText;return void 0===a&&(a=t.textContent),a??""}(e);return 0!==(a=a.trim().toLowerCase()).length&&(t.repeating?a[0]===t.keys[0]:a.startsWith(t.keys.join("")))}let ex=a.forwardRef(function(e,n){let{actions:r,autoFocus:i=!1,autoFocusItem:l=!1,children:o,className:s,disabledItemsFocusable:d=!1,disableListWrap:c=!1,onKeyDown:u,variant:m="selectedMenu",...p}=e,h=a.useRef(null),f=a.useRef(!1),[g,v]=a.useState(!1),b=eg(),x=a.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null}),y=function(e){let{activeItemId:t,getDefaultActiveItemId:n,orientation:r,isRtl:i=!1,isItemFocusable:l=ee,wrap:o=!0}=e,[s,d]=a.useState(t),[c,u]=a.useState(t),m=s;t!==c&&(u(t),void 0!==t&&t!==s&&(m=t,d(t)));let p=a.useRef(null),h=a.useRef(new Map),[f,g]=a.useState(0),v=W(m,a.useMemo(()=>X(h.current),[f]),l,n),b=a.useRef(v);b.current=v;let x=a.useCallback(()=>{let e=X(h.current),t=W(b.current,e,l,n);return G(e,t)},[n,l]),y=a.useCallback(()=>h.current,[]),j=(0,U.default)(e=>{!function(e,t){if(e===t)return!0;if(!(e instanceof Object)||!(t instanceof Object))return!1;let a=0,n=0;for(let n in e)if(a+=1,!P(e[n],t[n])||!(n in t))return!1;for(let e in t)n+=1;return a===n}(h.current.get(e.id)??null,e)&&(h.current.set(e.id,e),g(e=>e+1))}),w=(0,U.default)(e=>{h.current.delete(e)&&g(e=>e+1)}),N=(0,U.default)(e=>{d(e)}),k=a.useCallback(e=>b.current===e,[]),E=a.useCallback((e,t,a,n)=>{let r=q(Q(h.current),e,t,a,n??l);return r?(r.element?.focus(),d(r.id),r):null},[l]),C=a.useCallback(e=>({onFocus:e=>{let t=Q(h.current),a=J(t,e.target);-1!==a&&d(t[a].id)},onKeyDown:e=>{if(e.altKey||e.shiftKey||e.ctrlKey||e.metaKey||!H.includes(e.key))return;let t="horizontal"===r?"ArrowLeft":"ArrowUp",a="horizontal"===r?"ArrowRight":"ArrowDown";"horizontal"===r&&i&&(t="ArrowRight",a="ArrowLeft");let n=Q(h.current),l=M((0,O.default)(p.current)),s=l===p.current,d=V(n,l,b.current),c="next";switch(e.key){case t:c="previous",e.preventDefault(),s&&(d=n.length);break;case a:e.preventDefault(),s&&(d=-1);break;case"Home":e.preventDefault(),d=-1;break;case"End":e.preventDefault(),c="previous",d=n.length;break;default:return}E(d,c,o)},ref:function(...e){return t=>{e.forEach(e=>{$(e??null,t)})}}(e,e=>{p.current=e})}),[E,i,r,o]),A=a.useCallback(e=>{let t=Q(h.current),a=M((0,O.default)(p.current)),n=a===p.current?-1:V(t,a,b.current);return E(n,"next",!0,e)?.id??null},[E]);return a.useMemo(()=>({activeItemId:v,focusNext:A,getActiveItem:x,getContainerProps:C,getItemMap:y,isItemActive:k,registerItem:j,setActiveItemId:N,unregisterItem:w}),[v,A,x,C,y,k,j,N,w])}({activeItemId:void 0,getDefaultActiveItemId:a.useCallback(e=>"selectedMenu"===m?e.find(e=>e.selected&&ee(e))?.id??e.find(e=>ee(e))?.id??null:e.find(e=>ee(e))?.id??null,[m]),orientation:"vertical",wrap:!c}),{activeItemId:j,focusNext:w,getActiveItem:N,getContainerProps:k,getItemMap:E}=y,C=(0,el.default)((e=!1)=>{if(!h.current||!e&&f.current)return null;if(l){let e=N();if(e?.element){let t=Array.from(E().values()).some(e=>e.selected);return v("menu"===m&&t&&!e.selected&&null==b),ei(e.element,b),f.current=!0,e.element}return i?(v(!1),h.current.focus(),h.current):null}return i?(v(!1),h.current.focus(),f.current=!0,h.current):(v(!1),null)});es(()=>{if(!i&&!l){f.current=!1,v(!1);return}C()},[j,l,i,C]),a.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(e,{direction:t})=>{let a=!h.current.style.width;if(e.clientHeight<h.current.clientHeight&&a){let a=`${er(ed(e))}px`;h.current.style["rtl"===t?"paddingLeft":"paddingRight"]=a,h.current.style.width=`calc(100% + ${a})`}return h.current},focusInitialTarget:()=>{if(!h.current)return null;let e=M(en(h.current));return e&&ea(h.current,e)?e:C(!0)}}),[C]);let A=k(),T=(0,eo.default)(h,A.ref,n),S=a.useMemo(()=>({itemsFocusableWhenDisabled:d,suppressInitialFocusVisible:g,variant:m}),[d,g,m]),L=(0,el.default)(e=>{if(g&&v(!1),(e.ctrlKey||e.metaKey||e.altKey)&&u)return void u(e);if(A.onKeyDown(e),1===e.key.length){let t=x.current,a=e.key.toLowerCase(),n=performance.now();t.keys.length>0&&(n-t.lastTime>500?(t.keys=[],t.repeating=!0,t.previousKeyMatched=!0):t.repeating&&a!==t.keys[0]&&(t.repeating=!1)),t.lastTime=n,t.keys.push(a);let r=M(en(h.current)),i=r&&!t.repeating&&eb(r,t);t.previousKeyMatched&&(i||null!=w(e=>!!eb(e,t)&&ee(e)))?e.preventDefault():t.previousKeyMatched=!1}u&&u(e)});return(0,t.jsx)(eh,{role:"menu",ref:T,className:s,onKeyDown:L,onFocus:A.onFocus,tabIndex:-1,...p,children:(0,t.jsx)(ev.Provider,{value:S,children:(0,t.jsx)(z.Provider,{value:y,children:o})})})});var ey=e.i(15205);let ej=function(e,t=166){let a;function n(...r){let i=()=>{e.apply(this,r)};clearTimeout(a),a=setTimeout(i,t)}return n.clear=()=>{clearTimeout(a)},n};var ew=e.i(94141),eN=e.i(28724);let ek="data-mui-focusable";function eE(e){return e?e.hasAttribute(ek)?e:e.querySelector(`[${ek}]`):null}function eC(e){let t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?"true"===e.contentEditable||("AUDIO"===e.nodeName||"VIDEO"===e.nodeName||"DETAILS"===e.nodeName)&&null===e.getAttribute("tabindex")?0:e.tabIndex:t}function eA(e){let t=[],a=[];return Array.from(e.querySelectorAll('input,select,textarea,a[href],button,[tabindex],audio[controls],video[controls],[contenteditable]:not([contenteditable="false"])')).forEach((e,n)=>{let r=eC(e);-1===r||e.disabled||"INPUT"===e.tagName&&"hidden"===e.type||function(e){if("INPUT"!==e.tagName||"radio"!==e.type||!e.name)return!1;let t=t=>e.ownerDocument.querySelector(`input[type="radio"]${t}`),a=t(`[name="${e.name}"]:checked`);return a||(a=t(`[name="${e.name}"]`)),a!==e}(e)||(0===r?t.push(e):a.push({documentOrder:n,tabIndex:r,node:e}))}),a.sort((e,t)=>e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex).map(e=>e.node).concat(t)}function eT(){return!0}let eS=function(e){let{children:n,disableAutoFocus:r=!1,disableEnforceFocus:i=!1,disableRestoreFocus:l=!1,getTabbable:o=eA,isEnabled:s=eT,open:d}=e,c=a.useRef(!1),u=a.useRef(null),m=a.useRef(null),p=a.useRef(null),h=a.useRef(null),f=a.useRef(!1),g=a.useRef(null),v=(0,B.default)((0,eN.default)(n),g),b=a.useRef(null);a.useEffect(()=>{d&&g.current&&(f.current=!r)},[r,d]),a.useEffect(()=>{if(c.current=!1,!d||!g.current)return;let e=M((0,O.default)(g.current)),t=eE(g.current)??g.current;return!ea(g.current,e)&&(t.hasAttribute("tabIndex")||t.setAttribute("tabIndex","-1"),f.current&&t.focus()),()=>{!l&&p.current&&(c.current=!0,p.current.focus(),p.current=null)}},[d]),a.useEffect(()=>{if(!d||!g.current)return;let e=(0,O.default)(g.current),t=t=>{if(b.current=t,i||!s()||"Tab"!==t.key)return;let a=g.current,n=M(e);if(null===a)return;let r=eE(a);if(n===a||n===r){let e=o(a);if(0===e.length)return;t.preventDefault(),t.shiftKey?e[e.length-1].focus():e[0].focus();return}if(ea(a,n)){let e=o(a),r=e.indexOf(n);if(-1===r||!e.some(e=>eC(e)>0))return;t.preventDefault();let i=0;i=t.shiftKey?r<=0?e.length-1:r-1:r===e.length-1?0:r+1,e[i].focus()}},a=()=>{let t=g.current;if(null===t)return;let a=M(e);if(!e.hasFocus()||!s()||c.current){c.current=!1;return}if(ea(t,a)||i&&a!==u.current&&a!==m.current)return;if(a!==h.current)h.current=null;else if(null!==h.current)return;if(!f.current)return;let n=[];if((a===u.current||a===m.current)&&(n=o(g.current)),n.length>0){let e=!!(b.current?.shiftKey&&b.current?.key==="Tab"),t=n[0],a=n[n.length-1];"string"!=typeof t&&"string"!=typeof a&&(e?a.focus():t.focus())}else t.focus()};e.addEventListener("focusin",a),e.addEventListener("keydown",t,!0);let n=setInterval(()=>{let t=M(e);t&&"BODY"===t.tagName&&a()},50);return()=>{clearInterval(n),e.removeEventListener("focusin",a),e.removeEventListener("keydown",t,!0)}},[r,i,l,s,d,o]);let x=e=>{null===p.current&&(p.current=e.relatedTarget),f.current=!0};return(0,t.jsxs)(a.Fragment,{children:[(0,t.jsx)("div",{tabIndex:d?0:-1,onFocus:x,ref:u,"data-testid":"sentinelStart"}),a.cloneElement(n,{ref:v,onFocus:e=>{null===p.current&&(p.current=e.relatedTarget),f.current=!0,h.current=e.target;let t=n.props.onFocus;t&&t(e)}}),(0,t.jsx)("div",{tabIndex:d?0:-1,onFocus:x,ref:m,"data-testid":"sentinelEnd"})]})};var eL=e.i(74080);let e_=a.forwardRef(function(e,t){let{children:n,container:r,disablePortal:i=!1}=e,[l,o]=a.useState(null),s=(0,B.default)(a.isValidElement(n)?(0,eN.default)(n):null,t);return((0,F.default)(()=>{i||o(("function"==typeof r?r():r)||document.body)},[r,i]),(0,F.default)(()=>{if(l&&!i)return $(t,l),()=>{$(t,null)}},[t,l,i]),i)?a.isValidElement(n)?a.cloneElement(n,{ref:s}):n:l?eL.createPortal(n,l):l});var eI=e.i(51221),eD=e.i(88793),eR=e.i(6692),eP=e.i(89088),eM=e.i(41322);let eO={entering:{opacity:1},entered:{opacity:1},exiting:{opacity:0},exited:{opacity:0}},e$={opacity:0,visibility:"hidden"},eF=a.forwardRef(function(e,n){let r=(0,eP.useTheme)(),i={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:l,appear:o=!0,children:s,disablePrefersReducedMotion:d=!1,easing:c,in:u,onEnter:m,onEntered:p,onEntering:h,onExit:f,onExited:g,onExiting:v,style:b,timeout:x=i,...y}=e,j=(0,eR.default)(r.motion.reducedMotion,d),w=a.useRef(null),N=(0,eo.default)(w,(0,eN.default)(s),n),k=(0,eM.normalizedTransitionCallback)(w,h),E=(0,eM.normalizedTransitionCallback)(w,(e,t)=>{j.shouldReduceMotion||(0,eM.reflow)(e);let a=(0,eM.getTransitionProps)({style:b,timeout:x,easing:c},{mode:"enter"}),n=j.getTransitionTiming({duration:a.duration,delay:a.delay});e.style.transition=r.transitions.create("opacity",{duration:n.duration,easing:a.easing,delay:n.delay}),m&&m(e,t)}),C=(0,eM.normalizedTransitionCallback)(w,p),A=(0,eM.normalizedTransitionCallback)(w,v),T=(0,eM.normalizedTransitionCallback)(w,e=>{let t=(0,eM.getTransitionProps)({style:b,timeout:x,easing:c},{mode:"exit"}),a=j.getTransitionTiming({duration:t.duration,delay:t.delay});e.style.transition=r.transitions.create("opacity",{duration:a.duration,easing:t.easing,delay:a.delay}),f&&f(e)}),S=(0,eM.normalizedTransitionCallback)(w,e=>{e.style.transition="",g&&g(e)}),L=l?e=>{l(w.current,e)}:void 0;return(0,t.jsx)(eD.default,{appear:o,in:u,nodeRef:w,onEnter:E,onEntered:C,onEntering:k,onExit:T,onExited:S,onExiting:A,addEndListener:L,reduceMotion:j.shouldReduceMotion,timeout:x,...y,children:(e,{ownerState:t,...n})=>{let r=(0,eM.getTransitionChildStyle)(e,u,eO,e$,b,s.props.style);return a.cloneElement(s,{style:r,ref:N,...n})}})});function eU(e){return(0,j.default)("MuiBackdrop",e)}(0,y.default)("MuiBackdrop",["root","invisible"]);let eB=(0,b.styled)("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.root,a.invisible&&t.invisible]}})({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent",variants:[{props:{invisible:!0},style:{backgroundColor:"transparent"}}]}),ez=a.forwardRef(function(e,a){let n=(0,x.useDefaultProps)({props:e,name:"MuiBackdrop"}),{children:r,className:i,component:l="div",invisible:o=!1,open:s,slotProps:d={},slots:c={},transitionDuration:u,...m}=n,p={...n,component:l,invisible:o},h=(e=>{let{classes:t,invisible:a}=e;return(0,f.default)({root:["root",a&&"invisible"]},eU,t)})(p),g={component:l,slots:c,slotProps:d},[v,b]=(0,k.default)("root",{elementType:eB,externalForwardedProps:g,className:(0,ec.default)(h.root,i),ownerState:p}),[y,j]=(0,k.default)("transition",{elementType:eF,externalForwardedProps:g,ownerState:p});return(0,t.jsx)(y,{in:s,timeout:u,...m,...j,children:(0,t.jsx)(v,{...b,ref:a,children:r})})});function eH(...e){return e.reduce((e,t)=>null==t?e:function(...a){e.apply(this,a),t.apply(this,a)},()=>{})}var eW=e.i(50193);function eV(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function eq(e){return parseFloat(ed(e).getComputedStyle(e).paddingRight)||0}function eY(e,t,a,n,r){let i=[t,a,...n];[].forEach.call(e.children,e=>{let t,a,n=!i.includes(e),l=(t=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].includes(e.tagName),a="INPUT"===e.tagName&&"hidden"===e.getAttribute("type"),!t&&!a);n&&l&&eV(e,r)})}function eG(e,t){let a=-1;return e.some((e,n)=>!!t(e)&&(a=n,!0)),a}let eK=()=>{},eJ=new class{constructor(){this.modals=[],this.containers=[]}add(e,t){let a,n=this.modals.indexOf(e);if(-1!==n)return n;n=this.modals.length,this.modals.push(e),e.modalRef&&eV(e.modalRef,!1);let r=(a=[],[].forEach.call(t.children,e=>{"true"===e.getAttribute("aria-hidden")&&a.push(e)}),a);eY(t,e.mount,e.modalRef,r,!0);let i=eG(this.containers,e=>e.container===t);return -1!==i?this.containers[i].modals.push(e):this.containers.push({modals:[e],container:t,restore:null,hiddenSiblings:r}),n}mount(e,t){let a=eG(this.containers,t=>t.modals.includes(e)),n=this.containers[a];n.restore||(n.restore=function(e,t){let a=[],n=e.container;if(!t.disableScrollLock){let e,t;if((t=(0,O.default)(n)).body===n?ed(n).innerWidth>t.documentElement.clientWidth:n.scrollHeight>n.clientHeight){let e=er(ed(n));a.push({value:n.style.paddingRight,property:"padding-right",el:n}),n.style.paddingRight=`${eq(n)+e}px`;let t=(0,O.default)(n).querySelectorAll(".mui-fixed");[].forEach.call(t,t=>{a.push({value:t.style.paddingRight,property:"padding-right",el:t}),t.style.paddingRight=`${eq(t)+e}px`})}if(n.parentNode instanceof DocumentFragment)e=(0,O.default)(n).body;else{let t=n.parentElement,a=ed(n);e=t?.nodeName==="HTML"&&"scroll"===a.getComputedStyle(t).overflowY?t:n}a.push({value:e.style.overflow,property:"overflow",el:e},{value:e.style.overflowX,property:"overflow-x",el:e},{value:e.style.overflowY,property:"overflow-y",el:e}),e.style.overflow="hidden"}return()=>{a.forEach(({value:e,el:t,property:a})=>{e?t.style.setProperty(a,e):t.style.removeProperty(a)})}}(n,t))}remove(e,t=!0){let a=this.modals.indexOf(e);if(-1===a)return a;let n=eG(this.containers,t=>t.modals.includes(e)),r=this.containers[n];if(r.modals.splice(r.modals.indexOf(e),1),this.modals.splice(a,1),0===r.modals.length)r.restore&&r.restore(),e.modalRef&&eV(e.modalRef,t),eY(r.container,e.mount,e.modalRef,r.hiddenSiblings,!1),this.containers.splice(n,1);else{let e=r.modals[r.modals.length-1];e.modalRef&&eV(e.modalRef,!1)}return a}isTopModal(e){return this.modals.length>0&&this.modals[this.modals.length-1]===e}},eX=function(e){let{container:t,disableScrollLock:n=!1,closeAfterTransition:r=!1,onTransitionEnter:i,onTransitionExited:l,children:o,onClose:s,open:d,rootRef:c}=e,u=a.useRef({}),m=a.useRef(null),p=a.useRef(null),h=(0,B.default)(p,c),[f,g]=a.useState(!d),v=!!o&&o.props.hasOwnProperty("in"),b=!0;("false"===e["aria-hidden"]||!1===e["aria-hidden"])&&(b=!1);let x=()=>(u.current.modalRef=p.current,u.current.mount=m.current,u.current),y=()=>{eJ.mount(x(),{disableScrollLock:n}),p.current&&(p.current.scrollTop=0)},j=(0,U.default)(()=>{let e=("function"==typeof t?t():t)||(0,O.default)(m.current).body;eJ.add(x(),e),p.current&&y()}),w=()=>eJ.isTopModal(x()),N=(0,U.default)(e=>{m.current=e,e&&(d&&w()?y():p.current&&eV(p.current,b))}),k=a.useCallback(()=>{eJ.remove(x(),b)},[b]);return a.useEffect(()=>()=>{k()},[k]),a.useEffect(()=>{d?j():v&&r||k()},[d,k,v,r,j]),{getRootProps:(t={})=>{let a=(0,eW.default)(e);delete a.onTransitionEnter,delete a.onTransitionExited;let n={...a,...t};return{role:"presentation",...n,onKeyDown:e=>{n.onKeyDown?.(e),"Escape"===e.key&&229!==e.which&&w()&&(e.stopPropagation(),s&&s(e,"escapeKeyDown"))},ref:h}},getBackdropProps:(e={})=>({"aria-hidden":!0,...e,onClick:t=>{e.onClick?.(t),t.target===t.currentTarget&&s&&s(t,"backdropClick")},open:d}),getTransitionProps:()=>({onEnter:eH(()=>{g(!1),i&&i()},o?.props.onEnter??eK),onExited:eH(()=>{g(!0),l&&l(),r&&k()},o?.props.onExited??eK)}),rootRef:h,portalRef:N,isTopModal:w,exited:f,hasTransition:v}};function eQ(e){return(0,j.default)("MuiModal",e)}(0,y.default)("MuiModal",["root","hidden","backdrop"]);let eZ=(0,b.styled)("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.root,!a.open&&a.exited&&t.hidden]}})((0,eI.default)(({theme:e})=>({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0,variants:[{props:({ownerState:e})=>!e.open&&e.exited,style:{visibility:"hidden"}}]}))),e0=(0,b.styled)(ez,{name:"MuiModal",slot:"Backdrop"})({zIndex:-1}),e1=a.forwardRef(function(e,n){let r=(0,x.useDefaultProps)({name:"MuiModal",props:e}),{classes:i,className:l,closeAfterTransition:o=!1,children:s,container:d,component:c,disableAutoFocus:u=!1,disableEnforceFocus:m=!1,disablePortal:p=!1,disableRestoreFocus:h=!1,disableScrollLock:g=!1,hideBackdrop:v=!1,keepMounted:b=!1,onClose:y,onTransitionEnter:j,onTransitionExited:w,open:N,slotProps:E={},slots:C={},theme:A,...T}=r,S={...r,closeAfterTransition:o,disableAutoFocus:u,disableEnforceFocus:m,disablePortal:p,disableRestoreFocus:h,disableScrollLock:g,hideBackdrop:v,keepMounted:b},{getRootProps:L,getBackdropProps:_,getTransitionProps:I,portalRef:D,isTopModal:R,exited:P,hasTransition:M}=eX({...S,rootRef:n}),O={...S,exited:P},$=(e=>{let{open:t,exited:a,classes:n}=e;return(0,f.default)({root:["root",!t&&a&&"hidden"],backdrop:["backdrop"]},eQ,n)})(O),F={};if(void 0===s.props.tabIndex&&(F.tabIndex="-1"),M){let{onEnter:e,onExited:t}=I();F.onEnter=e,F.onExited=t}let U={slots:C,slotProps:E},[B,z]=(0,k.default)("root",{ref:n,elementType:eZ,externalForwardedProps:{...U,...T,component:c},getSlotProps:L,ownerState:O,className:(0,ec.default)(l,$?.root,!O.open&&O.exited&&$?.hidden)}),[H,W]=(0,k.default)("backdrop",{elementType:e0,externalForwardedProps:U,shouldForwardComponentProp:!0,getSlotProps:e=>_({...e,onClick:t=>{e?.onClick&&e.onClick(t)}}),className:$?.backdrop,ownerState:O});return b||N||M&&!P?(0,t.jsx)(e_,{ref:D,container:d,disablePortal:p,children:(0,t.jsxs)(B,{...z,children:[v?null:(0,t.jsx)(H,{...W}),(0,t.jsx)(eS,{disableEnforceFocus:m,disableAutoFocus:u,disableRestoreFocus:h,isEnabled:R,open:N,children:a.cloneElement(s,F)})]})}):null});var e2=e.i(66052);function e5(e){return(0,j.default)("MuiPopover",e)}(0,y.default)("MuiPopover",["root","paper"]);var e4=e.i(92886);function e6(e,t){let a=0;return"number"==typeof t?a=t:"center"===t?a=e.height/2:"bottom"===t&&(a=e.height),a}function e8(e,t){let a=0;return"number"==typeof t?a=t:"center"===t?a=e.width/2:"right"===t&&(a=e.width),a}function e3(e){return[e.horizontal,e.vertical].map(e=>"number"==typeof e?`${e}px`:e).join(" ")}function e9(e){return"function"==typeof e?e():e}let e7=(0,b.styled)(e1,{name:"MuiPopover",slot:"Root"})({}),te=(0,b.styled)(e2.default,{name:"MuiPopover",slot:"Paper"})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),tt=a.forwardRef(function(e,n){let r=(0,x.useDefaultProps)({props:e,name:"MuiPopover"}),{action:i,anchorEl:l,anchorOrigin:o={vertical:"top",horizontal:"left"},anchorPosition:s,anchorReference:d="anchorEl",children:c,className:u,container:m,disableAutoFocus:p=!1,elevation:h=8,marginThreshold:g=16,open:v,slots:b={},slotProps:y={},transformOrigin:j={vertical:"top",horizontal:"left"},transitionDuration:w="auto",disableScrollLock:N=!1,...E}=r,C=a.useRef(),A={...r,anchorOrigin:o,anchorReference:d,elevation:h,marginThreshold:g,transformOrigin:j,transitionDuration:w},T=(e=>{let{classes:t}=e;return(0,f.default)({root:["root"],paper:["paper"]},e5,t)})(A),S=a.useCallback(()=>{if("anchorPosition"===d)return s;let e=e9(l),t=(e&&1===e.nodeType?e:en(C.current).body).getBoundingClientRect();return{top:t.top+e6(t,o.vertical),left:t.left+e8(t,o.horizontal)}},[l,o.horizontal,o.vertical,s,d]),L=a.useCallback(e=>({vertical:e6(e,j.vertical),horizontal:e8(e,j.horizontal)}),[j.horizontal,j.vertical]),_=a.useCallback(e=>{let t={width:e.offsetWidth,height:e.offsetHeight},a=L(t);if("none"===d)return{top:null,left:null,transformOrigin:e3(a)};let n=S(),r=n.top-a.vertical,i=n.left-a.horizontal,o=r+t.height,s=i+t.width,c=ed(e9(l)),u=c.innerHeight-g,m=c.innerWidth-g;if(null!=g&&r<g){let e=r-g;r-=e,a.vertical+=e}else if(null!=g&&o>u){let e=o-u;r-=e,a.vertical+=e}if(null!=g&&i<g){let e=i-g;i-=e,a.horizontal+=e}else if(s>m){let e=s-m;i-=e,a.horizontal+=e}return{top:`${Math.round(r)}px`,left:`${Math.round(i)}px`,transformOrigin:e3(a)}},[l,d,S,L,g]),[I,D]=a.useState(v),R=a.useCallback(()=>{let e=C.current;if(!e)return;let t=_(e);null!=t.top&&e.style.setProperty("top",t.top),null!=t.left&&(e.style.left=t.left),e.style.transformOrigin=t.transformOrigin,D(!0)},[_]);a.useEffect(()=>(N&&window.addEventListener("scroll",R),()=>window.removeEventListener("scroll",R)),[l,N,R]),a.useEffect(()=>{v&&R()}),a.useImperativeHandle(i,()=>v?{updatePosition:()=>{R()}}:null,[v,R]),a.useEffect(()=>{if(!v)return;let e=ej(()=>{R()}),t=ed(e9(l));return t.addEventListener("resize",e),()=>{e.clear(),t.removeEventListener("resize",e)}},[l,v,R]);let P=w,M={slots:b,slotProps:y},[O,$]=(0,k.default)("transition",{elementType:ew.default,externalForwardedProps:M,ownerState:A,getSlotProps:e=>({...e,onEntering:(t,a)=>{e.onEntering?.(t,a),R()},onExited:t=>{e.onExited?.(t),D(!1)}}),additionalProps:{appear:!0,in:v}});"auto"!==w||O.muiSupportAuto||(P=void 0);let F=m||(l?en(e9(l)).body:void 0),[U,{slots:B,slotProps:z,...H}]=(0,k.default)("root",{ref:n,elementType:e7,externalForwardedProps:{...M,...E},shouldForwardComponentProp:!0,additionalProps:{slots:{backdrop:b.backdrop},slotProps:{backdrop:function(e,t){if(!e)return t;function a(e,t){let a={};return Object.keys(t).forEach(n=>{(0,e4.default)(n,t[n])&&"function"==typeof e[n]&&(a[n]=(...a)=>{e[n](...a),t[n](...a)})}),a}if("function"==typeof e||"function"==typeof t)return n=>{let r="function"==typeof t?t(n):t,i="function"==typeof e?e({...n,...r}):e,l=(0,ec.default)(n?.className,r?.className,i?.className),o=a(i,r);return{...r,...i,...o,...!!l&&{className:l},...r?.style&&i?.style&&{style:{...r.style,...i.style}},...r?.sx&&i?.sx&&{sx:[...Array.isArray(r.sx)?r.sx:[r.sx],...Array.isArray(i.sx)?i.sx:[i.sx]]}}};let n=a(e,t),r=(0,ec.default)(t?.className,e?.className);return{...t,...e,...n,...!!r&&{className:r},...t?.style&&e?.style&&{style:{...t.style,...e.style}},...t?.sx&&e?.sx&&{sx:[...Array.isArray(t.sx)?t.sx:[t.sx],...Array.isArray(e.sx)?e.sx:[e.sx]]}}}("function"==typeof y.backdrop?y.backdrop(A):y.backdrop,{invisible:!0})},container:F,open:v},ownerState:A,className:(0,ec.default)(T.root,u)}),[W,V]=(0,k.default)("paper",{ref:C,className:T.paper,elementType:te,externalForwardedProps:M,shouldForwardComponentProp:!0,additionalProps:{elevation:h,style:I?void 0:{opacity:0}},ownerState:A});return(0,t.jsx)(U,{...H,...!(0,ey.default)(U)&&{slots:B,slotProps:z,disableAutoFocus:p,disableScrollLock:N},children:(0,t.jsx)(O,{...$,timeout:P,children:(0,t.jsx)(W,{...V,children:c})})})});var ta=e.i(34997);function tn(e){return(0,j.default)("MuiMenu",e)}(0,y.default)("MuiMenu",["root","paper","list"]);let tr={vertical:"top",horizontal:"right"},ti={vertical:"top",horizontal:"left"},tl=(0,b.styled)(tt,{shouldForwardProp:e=>(0,ta.default)(e)||"classes"===e,name:"MuiMenu",slot:"Root"})({}),to=(0,b.styled)(te,{name:"MuiMenu",slot:"Paper"})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),ts=(0,b.styled)(ex,{name:"MuiMenu",slot:"List"})({outline:0}),td=a.forwardRef(function(e,n){let r=(0,x.useDefaultProps)({props:e,name:"MuiMenu"}),{autoFocus:i=!0,children:l,className:o,disableAutoFocusItem:s=!1,onClose:d,open:c,PopoverClasses:u,transitionDuration:m="auto",variant:p="selectedMenu",slots:h={},slotProps:g={},...v}=r,b=(0,D.useRtl)(),y={...r,autoFocus:i,disableAutoFocusItem:s,transitionDuration:m,variant:p},j=(e=>{let{classes:t}=e;return(0,f.default)({root:["root"],paper:["paper"],list:["list"]},tn,t)})(y),w=i&&c,N=w&&!s,E=a.useRef(null),C={slots:h,slotProps:g},A=(0,R.default)({elementType:h.root,externalSlotProps:g.root,ownerState:y,className:[j.root,o]}),[T,S]=(0,k.default)("paper",{className:j.paper,elementType:to,externalForwardedProps:C,shouldForwardComponentProp:!0,ownerState:y}),[L,_]=(0,k.default)("list",{className:j.list,elementType:ts,shouldForwardComponentProp:!0,externalForwardedProps:C,getSlotProps:e=>({...e,onKeyDown:t=>{"Tab"===t.key&&(t.preventDefault(),d&&d(t,"tabKeyDown")),e.onKeyDown?.(t)}}),ownerState:y}),I="function"==typeof g.transition?g.transition(y):g.transition;return(0,t.jsx)(tl,{disableAutoFocus:i,onClose:d,anchorOrigin:{vertical:"bottom",horizontal:b?"right":"left"},transformOrigin:b?tr:ti,slots:{root:h.root,paper:T,backdrop:h.backdrop,transition:h.transition},slotProps:{root:A,paper:S,backdrop:"function"==typeof g.backdrop?g.backdrop(y):g.backdrop,transition:{...I,onEntering:(...e)=>{((e,t)=>{E.current&&(E.current.adjustStyleForScrollbar(e,{direction:b?"rtl":"ltr"}),w&&E.current.focusInitialTarget?.())})(...e),I?.onEntering?.(...e)}}},open:c,ref:n,transitionDuration:m,ownerState:y,...v,classes:u,children:(0,t.jsx)(L,{actions:E,autoFocus:w,autoFocusItem:N,variant:p,..._,children:l})})});var tc=e.i(1839),tu=e.i(59596);let tm=(0,y.default)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","vertical","withChildren","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);function tp(e){return(0,j.default)("MuiListItemIcon",e)}let th=(0,y.default)("MuiListItemIcon",["root","alignItemsFlexStart"]);function tf(e){return(0,j.default)("MuiListItemText",e)}let tg=(0,y.default)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);function tv(e){return(0,j.default)("MuiMenuItem",e)}let tb=(0,y.default)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),tx=(0,b.styled)(tc.default,{shouldForwardProp:e=>(0,ta.default)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.root,a.dense&&t.dense,a.divider&&t.divider,!a.disableGutters&&t.gutters]}})((0,eI.default)(({theme:e})=>({...e.typography.body1,display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap","&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${tb.selected}`]:{backgroundColor:e.alpha((e.vars||e).palette.primary.main,(e.vars||e).palette.action.selectedOpacity),[`&.${tb.focusVisible}`]:{backgroundColor:e.alpha((e.vars||e).palette.primary.main,`${(e.vars||e).palette.action.selectedOpacity} + ${(e.vars||e).palette.action.focusOpacity}`)}},[`&.${tb.selected}:hover`]:{backgroundColor:e.alpha((e.vars||e).palette.primary.main,`${(e.vars||e).palette.action.selectedOpacity} + ${(e.vars||e).palette.action.hoverOpacity}`),"@media (hover: none)":{backgroundColor:e.alpha((e.vars||e).palette.primary.main,(e.vars||e).palette.action.selectedOpacity)}},[`&.${tb.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${tb.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${tm.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${tm.inset}`]:{marginLeft:52},[`& .${tg.root}`]:{marginTop:0,marginBottom:0},[`& .${tg.inset}`]:{paddingLeft:36},[`& .${th.root}`]:{minWidth:36},variants:[{props:({ownerState:e})=>!e.disableGutters,style:{paddingLeft:16,paddingRight:16}},{props:({ownerState:e})=>e.divider,style:{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"}},{props:({ownerState:e})=>!e.dense,style:{[e.breakpoints.up("sm")]:{minHeight:"auto"}}},{props:({ownerState:e})=>e.dense,style:{minHeight:32,paddingTop:4,paddingBottom:4,...e.typography.body2,[`& .${th.root} svg`]:{fontSize:"1.25rem"}}}]}))),ty=a.forwardRef(function(e,n){let r,i=(0,x.useDefaultProps)({props:e,name:"MuiMenuItem"}),{autoFocus:l=!1,component:o="li",dense:s=!1,divider:d=!1,disableGutters:c=!1,focusVisibleClassName:u,role:m="menuitem",tabIndex:p,className:h,...g}=i,v=eg(),b=a.useContext(eu),y=a.useMemo(()=>({dense:s||b.dense||!1,disableGutters:c}),[b.dense,s,c]),j=function(){let e=a.useContext(ev);if(void 0===e)throw Error("MUI: MenuListContext is missing. MenuItems must be placed within Menu or MenuList.");return e}(),w=(0,tu.default)(),N=j.suppressInitialFocusVisible,k=j.itemsFocusableWhenDisabled,E=a.useRef(null);es(()=>{l&&E.current&&ei(E.current,v)},[l]);let C={...i,dense:y.dense,divider:d,disableGutters:c},A=(e=>{let{disabled:t,dense:a,divider:n,disableGutters:r,selected:i,classes:l}=e,o=(0,f.default)({root:["root",a&&"dense",t&&"disabled",!r&&"gutters",n&&"divider",i&&"selected"]},tv,l);return{...l,...o}})(i),{root:T,...S}=A,L=function(e){let{activeItemId:t,registerItem:n,unregisterItem:r}=function(){let e=a.useContext(z);if(void 0===e)throw Error("MUI: RovingTabIndexContext is missing. Roving tab index items must be placed within a roving tab index provider.");return e}(),i=a.useRef(null),l=a.useMemo(()=>({disabled:e.disabled??!1,element:null,focusableWhenDisabled:e.focusableWhenDisabled??!1,id:e.id,selected:e.selected??!1,textValue:e.textValue}),[e.disabled,e.focusableWhenDisabled,e.id,e.selected,e.textValue]),o=a.useRef(l);o.current=l;let s=a.useCallback(t=>{(i.current=t,null==t)?queueMicrotask(()=>{null==i.current&&r(e.id)}):n({...o.current,element:t})},[e.id,n,r]),d=(0,B.default)(e.ref,s);return(0,F.default)(()=>{i.current&&n({...l,element:i.current})},[l,n]),(0,F.default)(()=>{let t=e.id;return()=>{r(t)}},[e.id,r]),{ref:d,tabIndex:t===e.id?0:-1}}({id:w,ref:n,disabled:i.disabled,focusableWhenDisabled:k,selected:i.selected}),_=(0,eo.default)(E,L.ref);return void 0!==p?r=p:"selectedMenu"===j.variant?r=L.tabIndex:(!i.disabled||k)&&(r=-1),(0,t.jsx)(eu.Provider,{value:y,children:(0,t.jsx)(tx,{ref:_,role:m,tabIndex:r,component:o,internalNativeButton:!1,focusableWhenDisabled:k,suppressFocusVisible:N,focusVisibleClassName:(0,ec.default)(A.focusVisible,u),className:(0,ec.default)(A.root,h),...g,ownerState:C,classes:S})})}),tj=(0,b.styled)("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.root,"flex-start"===a.alignItems&&t.alignItemsFlexStart]}})((0,eI.default)(({theme:e})=>({minWidth:e.spacing(4.5),color:(e.vars||e).palette.action.active,flexShrink:0,display:"inline-flex",variants:[{props:{alignItems:"flex-start"},style:{marginTop:8}}]}))),tw=a.forwardRef(function(e,n){let r=(0,x.useDefaultProps)({props:e,name:"MuiListItemIcon"}),{className:i,...l}=r,o=a.useContext(eu),s={...r,alignItems:o.alignItems},d=(e=>{let{alignItems:t,classes:a}=e;return(0,f.default)({root:["root","flex-start"===t&&"alignItemsFlexStart"]},tp,a)})(s);return(0,t.jsx)(tj,{className:(0,ec.default)(d.root,i),ownerState:s,ref:n,...l})});var v=v;let tN=(0,b.styled)("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[{[`& .${tg.primary}`]:t.primary},{[`& .${tg.secondary}`]:t.secondary},t.root,a.inset&&t.inset,a.primary&&a.secondary&&t.multiline,a.dense&&t.dense]}})({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4,[`.${v.default.root}:where(& .${tg.primary})`]:{display:"block"},[`.${v.default.root}:where(& .${tg.secondary})`]:{display:"block"},variants:[{props:({ownerState:e})=>e.primary&&e.secondary,style:{marginTop:6,marginBottom:6}},{props:({ownerState:e})=>e.inset,style:{paddingLeft:56}}]}),tk=a.forwardRef(function(e,n){let r=(0,x.useDefaultProps)({props:e,name:"MuiListItemText"}),{children:i,className:l,disableTypography:o=!1,inset:s=!1,primary:d,secondary:c,slots:u={},slotProps:m={},...p}=r,{dense:h}=a.useContext(eu),v=null!=d?d:i,b=c,y={...r,disableTypography:o,inset:s,primary:!!v,secondary:!!b,dense:h},j=(e=>{let{classes:t,inset:a,primary:n,secondary:r,dense:i}=e;return(0,f.default)({root:["root",a&&"inset",i&&"dense",n&&r&&"multiline"],primary:["primary"],secondary:["secondary"]},tf,t)})(y),w={slots:u,slotProps:m},[N,E]=(0,k.default)("root",{className:(0,ec.default)(j.root,l),elementType:tN,externalForwardedProps:{...w,...p},ownerState:y,ref:n}),[C,A]=(0,k.default)("primary",{className:j.primary,elementType:g.default,externalForwardedProps:w,ownerState:y}),[T,S]=(0,k.default)("secondary",{className:j.secondary,elementType:g.default,externalForwardedProps:w,ownerState:y});return null==v||v.type===g.default||o||(v=(0,t.jsx)(C,{variant:h?"body2":"body1",component:A?.variant?void 0:"span",...A,children:v})),null==b||b.type===g.default||o||(b=(0,t.jsx)(T,{variant:"body2",color:"textSecondary",...S,children:b})),(0,t.jsxs)(N,{...E,children:[v,b]})});var tE=e.i(5573),tC=e.i(36729);let tA={height:"100%",display:"flex",flexDirection:"column",boxShadow:"0 12px 48px rgba(15, 23, 42, 0.1)",border:"1px solid rgba(15, 23, 42, 0.06)",transition:"transform 0.3s ease, box-shadow 0.3s ease","&:hover":{transform:"translateY(-4px)",boxShadow:"0 24px 64px rgba(37, 99, 235, 0.15)"}};function tT(){return(0,t.jsxs)("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":!0,children:[(0,t.jsx)("circle",{cx:"12",cy:"5",r:"2"}),(0,t.jsx)("circle",{cx:"12",cy:"12",r:"2"}),(0,t.jsx)("circle",{cx:"12",cy:"19",r:"2"})]})}function tS(){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,children:[(0,t.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,t.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}function tL(){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,children:[(0,t.jsx)("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M10 11v6M14 11v6",strokeLinecap:"round"})]})}function t_(e){let{name:n,categoryName:r,description:i,photoSrc:l,approved:o,disabled:s,onEdit:c,onDelete:u,onApprovedChange:m}=e,[p,f]=a.default.useState(null),v=!!p,b=n.slice(0,2).toUpperCase(),x=()=>f(null);return(0,t.jsxs)(h.default,{sx:tA,children:[(0,t.jsx)(S,{title:n,subheader:r,slotProps:{title:{sx:{fontWeight:800,fontSize:"1rem",lineHeight:1.3,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}},subheader:{sx:{fontSize:"0.8rem"}}},action:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(I.default,{"aria-label":`Actions for ${n}`,"aria-haspopup":"true","aria-expanded":v?"true":void 0,onClick:e=>f(e.currentTarget),size:"small",children:(0,t.jsx)(tT,{})}),(0,t.jsxs)(td,{anchorEl:p,open:v,onClose:x,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:[(0,t.jsxs)(ty,{onClick:()=>{x(),c()},children:[(0,t.jsx)(tw,{children:(0,t.jsx)(tS,{})}),(0,t.jsx)(tk,{children:"Edit nominee"})]}),(0,t.jsxs)(ty,{onClick:()=>{x(),u()},disabled:s,sx:{color:"error.main"},children:[(0,t.jsx)(tw,{sx:{color:"error.main"},children:(0,t.jsx)(tL,{})}),(0,t.jsx)(tk,{children:"Delete nominee"})]})]})]}),sx:{alignItems:"flex-start","& .MuiCardHeader-action":{m:0}}}),l?(0,t.jsx)(L.default,{component:"img",height:"160",image:l,alt:"",sx:{objectFit:"cover"}}):(0,t.jsx)(tC.default,{sx:{height:160,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,fontWeight:800,color:"rgba(37, 99, 235, 0.35)",background:"radial-gradient(circle at 30% 30%, rgba(37, 99, 235, 0.12), transparent 50%), radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.1), transparent 45%), #fff"},"aria-hidden":!0,children:b}),(0,t.jsxs)(_.default,{sx:{flex:1,pt:1.5,pb:2},children:[(0,t.jsx)(g.default,{variant:"body2",sx:{color:"text.secondary",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden",minHeight:"3.6em"},children:i?.trim()||"No description"}),(0,t.jsxs)(tC.default,{sx:{display:"flex",alignItems:"center",gap:1.25,mt:1.5,flexWrap:"wrap"},children:[(0,t.jsx)(tE.default,{label:o?"Approved":"Pending",size:"small",color:o?"success":"warning",variant:"outlined"}),(0,t.jsxs)("label",{className:d.default.adminApproveSwitch,title:o?"Unapprove nominee":"Approve nominee",style:{margin:0},children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:o,disabled:s,onChange:e=>m(e.target.checked),"aria-label":o?`Unapprove ${n}`:`Approve ${n}`}),(0,t.jsx)("span",{className:d.default.adminApproveTrack,"aria-hidden":!0})]})]})]})]})}function tI(e){return!0===e.show_nominee||1===e.show_nominee}function tD(e){return!0===e.declare_result||1===e.declare_result}function tR(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,t.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}function tP(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M10 11v6M14 11v6",strokeLinecap:"round"})]})}let tM=()=>({name:"",photo:"",description:"",category_id:0});function tO(e){let n,r,{mode:l,eventId:m,eventTitle:h,apiBase:f,apiOrigin:g,token:v,onBack:b,onGoList:x,onGoCategories:y,onEventDeclareResultChange:j}=e,{toastError:w}=(0,u.useToast)(),[N,k]=a.default.useState([]),[E,C]=a.default.useState([]),[A,T]=a.default.useState(!1),[S,L]=a.default.useState(null),[_,I]=a.default.useState(""),[D,R]=a.default.useState(null),[P,M]=a.default.useState(tM),[O,$]=a.default.useState("all"),[F,U]=a.default.useState(""),[B,z]=a.default.useState(null),[H,W]=a.default.useState(!1),[V,q]=a.default.useState(null),[Y,G]=a.default.useState(null),K=a.default.useMemo(()=>{let e=new Map;for(let t of N)e.set(t.category_id,t);return e},[N]),J=a.default.useCallback(async()=>{T(!0);try{let e=(0,i.adminAuthHeader)(v),[t,a]=await Promise.all([fetch(`${f}/categories?eventId=${m}`),fetch(`${f}/nominees?eventId=${m}`,{headers:{...e}})]),n=await t.json().catch(()=>null),r=await a.json().catch(()=>null);if(!t.ok)throw Error(n?.error||"CATEGORIES_FAILED");if(!a.ok)throw Error(r?.error||"NOMINEES_FAILED");let l=Array.isArray(n?.categories)?n.categories:[],o=l.some(e=>e?.event_id!=null&&Number.isFinite(Number(e.event_id)))?l.filter(e=>Number(e?.event_id)===m):l;k(o),C(Array.isArray(r?.nominees)?r.nominees:[])}catch(e){w(e instanceof Error?e.message:"ADMIN_LOAD_FAILED")}finally{T(!1)}},[m,f,v]);a.default.useEffect(()=>{J()},[J]);let X=a.default.useMemo(()=>{let e=F.trim().toLowerCase();return E.filter(t=>{if("all"!==O&&Number(t.category_id)!==O)return!1;if(!e)return!0;let a=(K.get(Number(t.category_id))?.name||"").toLowerCase(),n=(t.name||"").toLowerCase(),r=(t.description||"").toLowerCase();return n.includes(e)||r.includes(e)||a.includes(e)}).slice().sort((e,t)=>Number(e.category_id)-Number(t.category_id)||Number(e.nominee_id)-Number(t.nominee_id))},[E,O,F,K]),Q=a.default.useCallback(()=>{z(e=>(e&&URL.revokeObjectURL(e),null))},[]);function Z(){L(null),I("")}function ee(){Q(),R(null),M(tM())}async function et(){let e=_.trim();if(e){T(!0);try{if(S?.mode==="add"){let t=await fetch(`${f}/admin/categories`,{method:"POST",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(v)},body:JSON.stringify({name:e,eventId:m})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"CREATE_CATEGORY_FAILED")}else if(S?.mode==="edit"){let t=await fetch(`${f}/admin/categories/${S.categoryId}?eventId=${m}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(v)},body:JSON.stringify({name:e})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"UPDATE_CATEGORY_FAILED")}Z(),await J()}catch(e){w(e instanceof Error?e.message:"SAVE_CATEGORY_FAILED")}finally{T(!1)}}}async function ea(e,t){let a=t.trim()||"this category";if(window.confirm(`Delete "${a}" and all its nominees? This cannot be undone.`)){T(!0);try{let t=await fetch(`${f}/admin/categories/${e}?eventId=${m}`,{method:"DELETE",headers:{...(0,i.adminAuthHeader)(v)}}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"DELETE_CATEGORY_FAILED");S?.mode==="edit"&&S.categoryId===e&&Z(),await J()}catch(e){w(e instanceof Error?e.message:"DELETE_CATEGORY_FAILED")}finally{T(!1)}}}async function en(){let e=P.name.trim();if(e&&P.category_id){T(!0);try{if(D?.mode==="add"){let t=await fetch(`${f}/admin/nominees?eventId=${m}`,{method:"POST",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(v)},body:JSON.stringify({name:e,photo:P.photo.trim(),description:P.description.trim()||void 0,category_id:P.category_id})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"SAVE_NOMINEE_FAILED")}else if(D?.mode==="edit"){let t=await fetch(`${f}/admin/nominees/${D.nomineeId}?eventId=${m}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(v)},body:JSON.stringify({name:e,photo:P.photo.trim(),description:P.description.trim()||null,category_id:P.category_id})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"SAVE_NOMINEE_FAILED")}ee(),await J()}catch(e){w(e instanceof Error?e.message:"SAVE_NOMINEE_FAILED")}finally{T(!1)}}}async function er(e,t){let a=t.trim()||"this nominee";if(window.confirm(`Delete "${a}"? Votes for this nominee will be removed.`)){T(!0);try{let t=await fetch(`${f}/admin/nominees/${e}?eventId=${m}`,{method:"DELETE",headers:{...(0,i.adminAuthHeader)(v)}}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"DELETE_NOMINEE_FAILED");D?.mode==="edit"&&D.nomineeId===e&&ee(),await J()}catch(e){w(e instanceof Error?e.message:"DELETE_NOMINEE_FAILED")}finally{T(!1)}}}async function ei(e,t){q(e.category_id);try{let a=await fetch(`${f}/admin/categories/${e.category_id}?eventId=${m}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(v)},body:JSON.stringify({show_nominee:+!!t})}),n=await a.json().catch(()=>null);if(!a.ok)throw Error(n?.error||"UPDATE_CATEGORY_FAILED");k(a=>a.map(a=>a.category_id===e.category_id?{...a,show_nominee:+!!t}:a))}catch(e){w(e instanceof Error?e.message:"UPDATE_CATEGORY_FAILED")}finally{q(null)}}async function el(e,t){G(e.category_id);try{let a=await fetch(`${f}/admin/categories/${e.category_id}?eventId=${m}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(v)},body:JSON.stringify({declare_result:+!!t})}),n=await a.json().catch(()=>null);if(!a.ok)throw Error(n?.error||"UPDATE_CATEGORY_FAILED");let r=n?.category;k(a=>a.map(a=>a.category_id===e.category_id?r?{...a,...r}:{...a,declare_result:+!!t,winner_nominee_id:t?a.winner_nominee_id:null}:a)),t||j?.(!1)}catch(e){w(e instanceof Error?e.message:"UPDATE_CATEGORY_FAILED")}finally{G(null)}}async function eo(e,t){T(!0);try{let a=await fetch(`${f}/admin/nominees/${e.nominee_id}?eventId=${m}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(v)},body:JSON.stringify({is_approved:+!!t})}),n=await a.json().catch(()=>null);if(!a.ok)throw Error(n?.error||"APPROVAL_UPDATE_FAILED");await J()}catch(e){w(e instanceof Error?e.message:"APPROVAL_UPDATE_FAILED")}finally{T(!1)}}async function es(e){W(!0);try{let t=await (0,s.uploadAwardsPhoto)(e,f,v);Q(),M(e=>({...e,photo:t}))}catch(e){w(e instanceof Error?e.message:"PHOTO_UPLOAD_FAILED")}finally{W(!1)}}a.default.useEffect(()=>()=>Q(),[Q]);let ed=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Category *"}),(0,t.jsx)("select",{className:"input",value:P.category_id||"",onChange:e=>M(t=>({...t,category_id:Number(e.target.value)})),disabled:A||0===N.length,required:!0,children:0===N.length?(0,t.jsx)("option",{value:"",children:"No categories — add one first"}):N.map(e=>(0,t.jsx)("option",{value:e.category_id,children:e.name},e.category_id))})]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Name *"}),(0,t.jsx)("input",{className:"input",value:P.name,onChange:e=>M(t=>({...t,name:e.target.value})),placeholder:"Nominee name",disabled:A})]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Photo"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",onChange:e=>{let t=e.currentTarget.files?.[0];t&&(z(e=>(e&&URL.revokeObjectURL(e),URL.createObjectURL(t))),es(t))},disabled:A||H}),H?(0,t.jsx)("p",{className:"hint",style:{marginTop:8},children:"Uploading…"}):null,(n=P.photo.trim()?(0,o.resolveNomineePhotoUrl)(g,P.photo):"",(r=B||n)?(0,t.jsx)("div",{style:{marginTop:10},children:(0,t.jsx)("img",{className:d.default.previewPhoto,src:r,alt:""})}):null)]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Description (optional)"}),(0,t.jsx)("textarea",{className:"input",value:P.description,onChange:e=>M(t=>({...t,description:e.target.value})),placeholder:"Short description",style:{minHeight:88,resize:"vertical"},disabled:A})]})]});return(0,t.jsxs)("div",{className:"panel",style:{marginBottom:"2rem"},children:[(0,t.jsx)("div",{className:"back-row",style:{marginBottom:"1rem"},children:(0,t.jsx)(c.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:x??b},{label:h,onClick:b},{label:"categories"===l?"Categories":"Nominees"}]})}),(0,t.jsxs)("div",{className:d.default.adminCatToolbar,style:{marginBottom:14},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"panel-title",style:{marginBottom:4},children:"categories"===l?"Categories":"Nominees"}),(0,t.jsx)("p",{style:{fontSize:13,color:"var(--text-muted)",margin:0},children:h})]}),(0,t.jsx)("span",{style:{fontSize:13,color:"var(--text-faint)"},children:A?"Loading…":"categories"===l?`${N.length} categories`:`${X.length}${"all"!==O||F.trim()?` of ${E.length}`:""} nominees`})]}),"categories"===l?(0,t.jsxs)("div",{className:d.default.adminCategoriesBlock,style:{marginTop:0},children:[(0,t.jsxs)("div",{className:d.default.adminCatToolbar,children:[(0,t.jsx)("span",{className:"section-title",style:{marginBottom:0,fontSize:13,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--text-muted)"},children:"All categories"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:function(){I(""),L({mode:"add"})},disabled:A,children:"Add category"})]}),0!==N.length||A?null:(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"1rem 0"},children:"No categories yet — use Add category."}),(0,t.jsx)("div",{className:d.default.adminCategoryList,children:N.map(e=>(0,t.jsx)("div",{className:d.default.adminCategoryRow,children:(0,t.jsxs)("div",{className:d.default.adminCategoryRowMain,children:[(0,t.jsxs)("div",{className:d.default.adminRowIconGroup,children:[(0,t.jsx)("button",{type:"button",className:d.default.adminIconBtnNeutral,onClick:()=>{I(e.name||""),L({mode:"edit",categoryId:e.category_id})},"aria-label":"Edit category",title:"Edit category",children:(0,t.jsx)(tR,{})}),(0,t.jsx)("button",{type:"button",className:d.default.adminIconBtnDanger,onClick:()=>void ea(e.category_id,e.name),disabled:A,"aria-label":`Delete ${e.name}`,title:"Delete category",children:(0,t.jsx)(tP,{})})]}),(0,t.jsxs)("div",{className:d.default.adminCategoryTitleWrap,children:[(0,t.jsx)("span",{style:{fontSize:15,fontWeight:600,whiteSpace:"normal"},children:e.name}),e.winner_nominee_id?(0,t.jsx)("span",{className:"event-badge badge-public",style:{marginLeft:8},children:"Winner set"}):null]}),(0,t.jsxs)("label",{className:d.default.adminApproveSwitch,title:tI(e)?"Nominees visible on screen":"Nominees hidden on screen",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:tI(e),disabled:V===e.category_id||A,onChange:t=>void ei(e,t.target.checked),"aria-label":tI(e)?"Hide nominees on screen":"Show nominees on screen"}),(0,t.jsx)("span",{className:d.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:"Show nominee"})]}),(0,t.jsxs)("label",{className:d.default.adminApproveSwitch,title:tD(e)?"Result declared":"Result not declared",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:tD(e),disabled:Y===e.category_id||A,onChange:t=>void el(e,t.target.checked),"aria-label":tD(e)?"Undeclare category result":"Declare category result"}),(0,t.jsx)("span",{className:d.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:"Declare result"})]})]})},e.category_id))})]}):(0,t.jsx)("div",{className:d.default.adminCategoriesBlock,style:{marginTop:0},children:0!==N.length||A?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:d.default.adminNomineeToolbar,children:[(0,t.jsx)("input",{className:`input ${d.default.adminNomineeToolbarSearch}`,type:"search",placeholder:"Search nominees…",value:F,onChange:e=>U(e.target.value),"aria-label":"Search nominees"}),(0,t.jsxs)("select",{className:`input ${d.default.adminNomineeToolbarSelect}`,value:"all"===O?"all":String(O),onChange:e=>{let t=e.target.value;$("all"===t?"all":Number(t))},"aria-label":"Filter by category",children:[(0,t.jsx)("option",{value:"all",children:"All categories"}),N.map(e=>(0,t.jsx)("option",{value:e.category_id,children:e.name},e.category_id))]}),(0,t.jsx)("button",{type:"button",className:`btn ${d.default.adminNomineeToolbarAdd}`,onClick:function(){Q();let e="all"!==O&&N.some(e=>e.category_id===O)?O:N[0]?.category_id??0;M({...tM(),category_id:e}),R({mode:"add"})},disabled:A,children:"Add nominee"})]}),0!==X.length||A?(0,t.jsx)(tC.default,{sx:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:2},children:X.map(e=>{let a=(0,o.resolveNomineePhotoUrl)(g,e.photo),n=K.get(Number(e.category_id))?.name||"Category",r=!0===e.is_approved||1===e.is_approved;return(0,t.jsx)(t_,{name:e.name,categoryName:n,description:e.description,photoSrc:a,approved:r,disabled:A,onEdit:()=>{Q(),M({name:e.name||"",photo:e.photo||"",description:e.description||"",category_id:Number(e.category_id)}),R({mode:"edit",nomineeId:e.nominee_id})},onDelete:()=>void er(e.nominee_id,e.name),onApprovedChange:t=>void eo(e,t)},e.nominee_id)})}):(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"1rem 0"},children:0===E.length?"No nominees yet — use Add nominee.":"No nominees match your search or filter."})]}):(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"0.5rem 0 1rem"},children:"Add categories first, then add nominees."}),y?(0,t.jsx)("button",{type:"button",className:"btn",onClick:y,children:"Go to categories"}):null]})}),S?(0,t.jsx)(p,{title:"add"===S.mode?"Add category":"Edit category",onClose:Z,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:Z,disabled:A,children:"Cancel"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:()=>void et(),disabled:A||!_.trim(),children:"add"===S.mode?"Add category":"Save changes"})]}),children:(0,t.jsxs)("div",{className:"field",style:{marginBottom:0},children:[(0,t.jsx)("div",{className:"label",children:"Category name *"}),(0,t.jsx)("input",{className:"input",value:_,onChange:e=>I(e.target.value),placeholder:"Category name",disabled:A,onKeyDown:e=>{"Enter"===e.key&&et()}})]})}):null,D?(0,t.jsx)(p,{wide:!0,title:"add"===D.mode?"Add nominee":"Edit nominee",onClose:ee,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:ee,disabled:A,children:"Cancel"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:()=>void en(),disabled:A||!P.name.trim()||!P.category_id,children:"add"===D.mode?"Add nominee":"Save changes"})]}),children:ed}):null]})}function t$(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,t.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}function tF(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M10 11v6M14 11v6",strokeLinecap:"round"})]})}function tU(e){let{eventId:n,eventTitle:r,apiBase:l,token:o,onBack:s,onGoList:m}=e,{toastError:h,toastSuccess:f}=(0,u.useToast)(),[g,v]=a.default.useState([]),[b,x]=a.default.useState(!1),[y,j]=a.default.useState(!1),[w,N]=a.default.useState(""),[k,E]=a.default.useState(null),[C,A]=a.default.useState(""),[T,S]=a.default.useState(""),L=a.default.useRef(null),_=a.default.useCallback(async()=>{x(!0);try{let e=await fetch(`${l}/admin/events/${n}/allowed-mobiles`,{headers:{...(0,i.adminAuthHeader)(o)}}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"LOAD_FAILED");v(Array.isArray(t?.allowed_mobiles)?t.allowed_mobiles:[])}catch(e){h(e instanceof Error?e.message:"LOAD_FAILED")}finally{x(!1)}},[l,n,o]);a.default.useEffect(()=>{_()},[_]);let I=a.default.useMemo(()=>{let e=w.trim().toLowerCase();return e?g.filter(t=>{let a=(t.mobile||"").toLowerCase(),n=(t.note||"").toLowerCase();return a.includes(e)||n.includes(e)}):g},[g,w]);function D(){E(null),A(""),S("")}async function R(){let e=C.trim();if(e){x(!0);try{if(k?.mode==="add"){let t=await fetch(`${l}/admin/events/${n}/allowed-mobiles`,{method:"POST",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(o)},body:JSON.stringify({mobile:e,note:T.trim()||null})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.message||a?.error||"CREATE_FAILED")}else if(k?.mode==="edit"){let t=await fetch(`${l}/admin/events/${n}/allowed-mobiles/${k.id}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(o)},body:JSON.stringify({mobile:e,note:T.trim()||null})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.message||a?.error||"UPDATE_FAILED")}D(),await _()}catch(e){h(e instanceof Error?e.message:"SAVE_FAILED")}finally{x(!1)}}}async function P(e){let t=e.mobile||"this number";if(window.confirm(`Remove ${t} from the allowlist?`)){x(!0);try{let t=await fetch(`${l}/admin/events/${n}/allowed-mobiles/${e.id}`,{method:"DELETE",headers:{...(0,i.adminAuthHeader)(o)}}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.message||a?.error||"DELETE_FAILED");k?.mode==="edit"&&k.id===e.id&&D(),await _()}catch(e){h(e instanceof Error?e.message:"DELETE_FAILED")}finally{x(!1)}}}async function M(e){j(!0);try{let t=new FormData;t.append("file",e);let a=await fetch(`${l}/admin/events/${n}/allowed-mobiles/upload`,{method:"POST",headers:{...(0,i.adminAuthHeader)(o)},body:t}),r=await a.json().catch(()=>null);if(!a.ok)throw Error(r?.message||r?.error||"UPLOAD_FAILED");let s=Number(r?.inserted??0),d=Number(r?.skipped??0),c=Number(r?.invalid??0);f(`Import done: ${s} added, ${d} skipped, ${c} invalid.`),await _()}catch(e){h(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{j(!1),L.current&&(L.current.value="")}}return(0,t.jsxs)("div",{className:"panel",style:{marginBottom:"2rem"},children:[(0,t.jsx)("div",{className:"back-row",style:{marginBottom:"1rem"},children:(0,t.jsx)(c.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:m??s},{label:r,onClick:s},{label:"Allowed mobiles"}]})}),(0,t.jsxs)("div",{className:d.default.adminCatToolbar,style:{marginBottom:14},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"panel-title",style:{marginBottom:4},children:"Allowed mobiles"}),(0,t.jsxs)("p",{style:{fontSize:13,color:"var(--text-muted)",margin:0},children:[r," — invite-only registration"]})]}),(0,t.jsx)("span",{style:{fontSize:13,color:"var(--text-faint)"},children:b?"Loading…":`${I.length}${w.trim()?` of ${g.length}`:""} numbers`})]}),(0,t.jsx)("p",{className:"hint",style:{marginBottom:12},children:"Only these mobile numbers can register for this private event. Upload Excel or CSV (mobile in column A, optional note in column B) or add numbers manually."}),(0,t.jsxs)("div",{className:d.default.adminNomineeToolbar,style:{marginBottom:14},children:[(0,t.jsx)("input",{className:`input ${d.default.adminNomineeToolbarSearch}`,type:"search",placeholder:"Search mobile or note…",value:w,onChange:e=>N(e.target.value),"aria-label":"Search allowed mobiles"}),(0,t.jsx)("input",{ref:L,type:"file",accept:".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv",style:{display:"none"},onChange:e=>{let t=e.target.files?.[0];t&&M(t)}}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",disabled:b||y,onClick:()=>L.current?.click(),children:y?"Importing…":"Import Excel/CSV"}),(0,t.jsx)("button",{type:"button",className:`btn ${d.default.adminNomineeToolbarAdd}`,onClick:function(){A(""),S(""),E({mode:"add"})},disabled:b||y,children:"Add mobile"})]}),0!==I.length||b?(0,t.jsx)("div",{className:d.default.adminCategoryList,children:I.map(e=>(0,t.jsx)("div",{className:d.default.adminCategoryRow,children:(0,t.jsxs)("div",{className:d.default.adminCategoryRowMain,children:[(0,t.jsxs)("div",{className:d.default.adminRowIconGroup,children:[(0,t.jsx)("button",{type:"button",className:d.default.adminIconBtnNeutral,onClick:()=>{A(e.mobile||""),S(e.note||""),E({mode:"edit",id:e.id})},"aria-label":"Edit mobile",title:"Edit",children:(0,t.jsx)(t$,{})}),(0,t.jsx)("button",{type:"button",className:d.default.adminIconBtnDanger,onClick:()=>void P(e),disabled:b,"aria-label":`Remove ${e.mobile}`,title:"Remove",children:(0,t.jsx)(tF,{})})]}),(0,t.jsxs)("div",{className:d.default.adminCategoryTitleWrap,children:[(0,t.jsx)("span",{style:{fontSize:15,fontWeight:600},children:e.mobile}),e.note?(0,t.jsx)("span",{style:{fontSize:13,color:"var(--text-muted)",marginLeft:10},children:e.note}):null]}),e.created_at?(0,t.jsx)("span",{style:{fontSize:12,color:"var(--text-faint)",whiteSpace:"nowrap"},children:function(e){if(!e)return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleString()}(e.created_at)}):null]})},e.id))}):(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"1rem 0"},children:0===g.length?"No allowed mobiles yet — import a spreadsheet or add manually.":"No numbers match your search."}),k?(0,t.jsxs)(p,{title:"add"===k.mode?"Add allowed mobile":"Edit allowed mobile",onClose:D,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",disabled:b,onClick:D,children:"Cancel"}),(0,t.jsx)("button",{type:"button",className:"btn",disabled:b||!C.trim(),onClick:()=>void R(),children:b?"Saving…":"Save"})]}),children:[(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("label",{className:"label",htmlFor:"allowed-mobile-input",children:"Mobile"}),(0,t.jsx)("input",{id:"allowed-mobile-input",className:"input",type:"tel",inputMode:"numeric",autoComplete:"tel",placeholder:"10-digit mobile",value:C,onChange:e=>A(e.target.value),disabled:b})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{className:"label",htmlFor:"allowed-mobile-note",children:"Note (optional)"}),(0,t.jsx)("input",{id:"allowed-mobile-note",className:"input",type:"text",placeholder:"Name or reference",value:T,onChange:e=>S(e.target.value),disabled:b})]})]}):null]})}function tB(e){if(null==e||""===e)return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let a=e=>String(e).padStart(2,"0");return`${t.getFullYear()}-${a(t.getMonth()+1)}-${a(t.getDate())}T${a(t.getHours())}:${a(t.getMinutes())}`}function tz(e){if(null==e||""===String(e).trim())return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"})}let tH=`
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
  .topbar-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  .topbar-profile {
    appearance: none;
    border: 1px solid var(--border);
    background: #fff;
    border-radius: 999px;
    padding: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--text);
  }
  .topbar-profile:hover { background: #f8fafc; }
  .topbar-profile-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563eb, #0ea5e9);
    color: #fff;
    font-size: 11px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
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
    flex-shrink: 0;
    align-self: center;
    padding: 6px;
    border: none;
    border-radius: var(--radius);
    background: transparent;
    color: var(--danger);
    cursor: pointer;
    transition: opacity 0.15s;
  }
  .event-icon-btn:hover:not(:disabled) { opacity: 0.7; }
  .event-icon-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .event-icon-btn--neutral { color: var(--text-muted); }

  .back-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 1.25rem;
  }
  .back-row-actions {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
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
`;function tW(){return(0,t.jsx)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"})})}function tV(){let e=(0,n.useRouter)(),m=(0,n.useSearchParams)(),h=(0,l.getPublicApiBase)(),f=(0,l.getUploadsOrigin)(),g=m.get("next")||"",v=m.get("eventId")||"",[b,x]=a.default.useState("boot"),[y,j]=a.default.useState(!1),{toastError:w,toastSuccess:N}=(0,u.useToast)();a.default.useEffect(()=>{"dashboard"!==b||(0,i.readAdminToken)()||w("Session missing — please log in again.")},[b,w]);let[k,E]=a.default.useState(""),[C,A]=a.default.useState(""),[T,S]=a.default.useState(""),[L,_]=a.default.useState(""),[I,D]=a.default.useState(""),[R,P]=a.default.useState(""),[M,O]=a.default.useState(""),[$,F]=a.default.useState(""),[U,B]=a.default.useState(""),[z,H]=a.default.useState(""),[W,V]=a.default.useState(null),[q,Y]=a.default.useState(!1),[G,K]=a.default.useState([]),[J,X]=a.default.useState(""),[Q,Z]=a.default.useState(""),[ee,et]=a.default.useState(""),[ea,en]=a.default.useState(null),[er,ei]=a.default.useState(!1),[el,eo]=a.default.useState(!1),[es,ed]=a.default.useState(""),[ec,eu]=a.default.useState(""),[em,ep]=a.default.useState(!1),[eh,ef]=a.default.useState(null),[eg,ev]=a.default.useState("list"),[eb,ex]=a.default.useState(null),[ey,ej]=a.default.useState(!1),[ew,eN]=a.default.useState(null),[ek,eE]=a.default.useState(!1),[eC,eA]=a.default.useState(!1),[eT,eS]=a.default.useState(null),[eL,e_]=a.default.useState(""),[eI,eD]=a.default.useState(""),[eR,eP]=a.default.useState(""),[eM,eO]=a.default.useState(""),[e$,eF]=a.default.useState(""),[eU,eB]=a.default.useState(null),[ez,eH]=a.default.useState(!1),eW=a.default.useCallback((e,t)=>{K(a=>a.map(a=>a.event_id===e?{...a,...t}:a))},[]),eV=a.default.useCallback(async()=>{let e=(0,i.readAdminToken)();if(e)try{let t=await fetch(`${h}/admin/events`,{headers:{...(0,i.adminAuthHeader)(e)}}),a=await t.json().catch(()=>null);if(!t.ok){401===t.status&&(0,i.clearAdminSession)();return}K(Array.isArray(a?.events)?a.events:[])}catch{w("Could not reach the API. Ensure the backend is running on port 4000.")}},[h]),eq=a.default.useCallback(e=>{eS(e),e_(e.name||""),eD(e.organisation_name||""),eP(e.mobile||""),eO(e.full_address||"");let t=(e.logo||"").trim();eF(t),eB(t?(0,o.resolveAdminLogoUrl)(f,t):null)},[f]),eY=a.default.useCallback(async()=>{let e=(0,i.readAdminToken)();if(!e)return null;try{let t=await fetch(`${h}/admin/me`,{headers:{...(0,i.adminAuthHeader)(e)}}),a=await t.json().catch(()=>null);if(!t.ok)return 401===t.status&&(0,i.clearAdminSession)(),null;let n=a?.admin;return n?.adminId&&eq(n),n??null}catch{return w("Could not reach the API. Ensure the backend is running on port 4000."),null}},[h,eq]);a.default.useEffect(()=>{let e=!1;return(0,i.readAdminToken)()?((async()=>{try{if(await eY(),e)return;(0,i.isAdminSessionValid)()?(x("dashboard"),await eV()):x("auth")}catch{if(e)return;(0,i.isAdminSessionValid)()?(x("dashboard"),await eV()):x("auth")}})(),()=>{e=!0}):void x("auth")},[eV,eY]);let eG=a.default.useCallback((t,a)=>{ev(t),ex(a??null),ej(!1);let n=new URLSearchParams;"create"===t?n.set("screen","create"):"profile"===t?n.set("screen","profile"):"edit"===t&&a?(n.set("screen","edit"),n.set("eventId",String(a))):("categories"===t||"nominees"===t||"allowed-mobiles"===t)&&a?(n.set("eventId",String(a)),n.set("panel",t)):"detail"===t&&a&&n.set("eventId",String(a));let r=n.toString();e.replace(`/admin${r?`?${r}`:""}`,{scroll:!1})},[e]);a.default.useEffect(()=>{let e,t,a,n,r;if("dashboard"!==b)return;let i=(e=m.get("screen"),t=m.get("panel"),r=Number.isFinite(n=(a=m.get("eventId"))?Number(a):0)&&n>0?Math.floor(n):null,"create"===e?{screen:"create",eventId:null}:"profile"===e?{screen:"profile",eventId:null}:"edit"===e&&r?{screen:"edit",eventId:r}:r&&"categories"===t?{screen:"categories",eventId:r}:r&&"nominees"===t?{screen:"nominees",eventId:r}:r&&"allowed-mobiles"===t?{screen:"allowed-mobiles",eventId:r}:r?{screen:"detail",eventId:r}:{screen:"list",eventId:null}),l=m.get("screen");ev("create"===l?"list":"edit"===l&&i.eventId?"detail":i.screen),ex(i.eventId),"create"===l?eN("create"):"edit"===l&&i.eventId&&eN("edit")},[b,m]),a.default.useEffect(()=>{"dashboard"!==b||eT||eY()},[b,eT,eY]),a.default.useEffect(()=>{if("dashboard"!==b||"edit"!==ew||null==eb)return;let e=G.find(e=>e.event_id===eb);if(!e||eh===e.event_id)return;ef(e.event_id),X((e.title||"").trim()),Z((e.description||"").trim());let t=(e.image||"").trim();et(t),en(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),t?(0,o.resolveEventBannerUrl)(f,t):null)),ei(!0===e.is_private||1===e.is_private),eo(!0===e.live_voting||1===e.live_voting),ed(tB(e.start_time)),eu(tB(e.end_time))},[b,ew,eb,G,eh,f]);let eK=a.default.useCallback(()=>{en(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null))},[]);function eJ(){"/actions"===g&&v?e.push(`/actions?eventId=${encodeURIComponent(v)}`):g.startsWith("/")&&e.push(g)}function eX(e){let t=e.trim().toLowerCase();return t?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)?null:"Enter a valid email address.":"Email is required."}function eQ(e){return e?e.length<8?"Password must be at least 8 characters.":e.length>72?"Password must be at most 72 characters.":null:"Password is required."}function eZ(){let e=R.trim();if(!e)return"Your name is required.";if(e.length>75)return"Name must be at most 75 characters.";let t=M.trim();if(!t)return"Organisation name is required.";if(t.length>100)return"Organisation name must be at most 100 characters.";let a=$.trim().replace(/\s/g,"");if(!/^\d{10,12}$/.test(a))return"Mobile must be 10–12 digits (numbers only).";let n=U.trim();return n?n.length>300?"Address must be at most 300 characters.":null:"Full address is required."}function e0(){let e=$.trim().replace(/\s/g,""),t={email:k.trim().toLowerCase(),password:C,name:R.trim(),organisation_name:M.trim(),mobile:e,full_address:U.trim()},a=z.trim();return a&&(t.logo=a),t}async function e1(e){Y(!0);try{let t=await (0,s.uploadAwardsPhoto)(e,h);H(t),V(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),(0,o.resolveAdminLogoUrl)(f,t)))}catch(e){w(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{Y(!1)}}async function e2(e){eH(!0);try{let t=(0,i.readAdminToken)();if(!t)return;let a=await (0,s.uploadAwardsPhoto)(e,h,t);eF(a),eB(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),(0,o.resolveAdminLogoUrl)(f,a)))}catch(e){w(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{eH(!1)}}async function e5(e){e.preventDefault();let t=(0,i.readAdminToken)();if(!t)return;let a=eL.trim(),n=eI.trim(),r=eR.trim().replace(/\s/g,""),l=eM.trim();if(!a||!n||!r||!l)return void w("Please fill in all required profile fields.");j(!0);try{let e={name:a,organisation_name:n,mobile:r,full_address:l};e$.trim()&&(e.logo=e$.trim());let o=await fetch(`${h}/admin/me`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(t)},body:JSON.stringify(e)}),s=await o.json().catch(()=>null);if(!o.ok)throw Error(s?.message||s?.error||"PROFILE_SAVE_FAILED");s.admin&&eq(s.admin),N("Profile saved.")}catch(e){w(e instanceof Error?e.message:"PROFILE_SAVE_FAILED")}finally{j(!1)}}async function e4(e){e.preventDefault(),j(!0);let t=eX(k);if(t){w(t),j(!1);return}let a=eQ(C);if(a){w(a),j(!1);return}if(C!==T){w("Passwords do not match."),j(!1);return}let n=eZ();if(n){w(n),j(!1);return}if(q){w("Please wait for the logo upload to finish."),j(!1);return}try{let e=await fetch(`${h}/admin/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e0())}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"REGISTER_FAILED");_(""),x("register-verify")}catch(e){w(e instanceof Error?e.message:"REGISTER_FAILED")}finally{j(!1)}}async function e6(e){e.preventDefault(),j(!0);let t=eX(k);if(t){w(t),j(!1);return}let a=L.trim();if(!/^\d{6}$/.test(a)){w("Enter the 6-digit OTP from your email."),j(!1);return}try{let e=await fetch(`${h}/admin/auth/verify-registration`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:k.trim().toLowerCase(),otp:a})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"VERIFY_FAILED");(0,i.writeAdminSession)(t.token,t.admin),t.admin&&eq(t.admin),A(""),S(""),_(""),x("dashboard"),await eV(),eJ()}catch(e){w(e instanceof Error?e.message:"VERIFY_FAILED")}finally{j(!1)}}async function e8(){j(!0);let e=eX(k),t=eQ(C),a=eZ();if(e||t||a){w(e||t||a||"Complete the registration form first."),j(!1);return}try{let e=await fetch(`${h}/admin/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e0())}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"RESEND_FAILED");N("A new OTP has been sent to your email.")}catch(e){w(e instanceof Error?e.message:"RESEND_FAILED")}finally{j(!1)}}async function e3(e){e.preventDefault(),j(!0);let t=eX(k);if(t){w(t),j(!1);return}let a=eQ(C);if(a){w(a),j(!1);return}try{let e=await fetch(`${h}/admin/auth/sign-in`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:k.trim().toLowerCase(),password:C})}),t=await e.json().catch(()=>null);if(!e.ok)throw t?.error==="EMAIL_NOT_VERIFIED"&&x("register-verify"),Error(t?.message||t?.error||"SIGN_IN_FAILED");(0,i.writeAdminSession)(t.token,t.admin),t.admin&&eq(t.admin),A(""),x("dashboard"),await eV(),eJ()}catch(e){w(e instanceof Error?e.message:"SIGN_IN_FAILED")}finally{j(!1)}}async function e9(e){e.preventDefault(),j(!0);try{let e=await fetch(`${h}/admin/auth/forgot-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:k.trim()})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"FORGOT_FAILED");x("reset")}catch(e){w(e instanceof Error?e.message:"FORGOT_FAILED")}finally{j(!1)}}async function e7(e){e.preventDefault(),j(!0);try{let e=await fetch(`${h}/admin/auth/reset-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:k.trim(),otp:L.trim(),newPassword:I})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"RESET_FAILED");(0,i.writeAdminSession)(t.token,t.admin),t.admin&&eq(t.admin),_(""),D(""),x("dashboard"),await eV(),eJ()}catch(e){w(e instanceof Error?e.message:"RESET_FAILED")}finally{j(!1)}}function te(){ef(null),X(""),Z(""),et(""),eK(),ei(!1),eo(!1),ed(""),eu("")}function tt(){eN(null),te()}async function ta(e){let t=(0,i.readAdminToken)();if(t){ep(!0);try{let a=await (0,s.uploadAwardsPhoto)(e,h,t);en(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),(0,o.resolveEventBannerUrl)(f,a))),et(a)}catch(e){w(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{ep(!1)}}}async function tn(e){e.preventDefault();let t=(0,i.readAdminToken)();if(t){if(!el){let e=function(e,t){if(e&&!t||!e&&t)return"Set both voting start and end, or leave both empty.";if(!e||!t)return null;let a=new Date(e).getTime(),n=new Date(t).getTime();return Number.isNaN(a)||Number.isNaN(n)?"Invalid voting window datetime.":n<=a?"End time must be after start time.":null}(es,ec);if(e)return void w(e)}j(!0);try{let e=null!=eh,a=el?e?{start_time:"",end_time:""}:{}:es&&ec?{start_time:new Date(es).toISOString(),end_time:new Date(ec).toISOString()}:e?{start_time:"",end_time:""}:{},n=e?{title:J.trim(),description:Q.trim()||null,image:ee.trim()||null,is_private:+!!er,live_voting:+!!el,...a}:{title:J.trim(),description:Q.trim()||void 0,image:ee.trim()||void 0,is_private:+!!er,live_voting:+!!el,...a},r=await fetch(e?`${h}/admin/events/${eh}`:`${h}/admin/events`,{method:e?"PATCH":"POST",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(t)},body:JSON.stringify(n)}),l=await r.json().catch(()=>null);if(!r.ok)throw Error(l?.message||l?.error||(e?"UPDATE_EVENT_FAILED":"CREATE_EVENT_FAILED"));let o=e?eh:Number(l?.event?.event_id??0)||null;eN(null),te(),await eV(),o?eG("detail",o):eG("list")}catch(e){w(e instanceof Error?e.message:"SAVE_EVENT_FAILED")}finally{j(!1)}}}function tr(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M10 11v6M14 11v6",strokeLinecap:"round"})]})}async function ti(e){let t=(0,i.readAdminToken)();if(!t)return;let a=(e.title||"").trim()||"Untitled";if(window.confirm(`Delete "${a}" and all its categories, nominees, and votes? This cannot be undone.`)){j(!0);try{let n=await fetch(`${h}/admin/events/${e.event_id}`,{method:"DELETE",headers:{...(0,i.adminAuthHeader)(t)}}),r=await n.json().catch(()=>null);if(!n.ok)throw Error(r?.message||r?.error||"DELETE_EVENT_FAILED");eb===e.event_id&&(ex(null),eG("list")),eh===e.event_id&&te(),await eV(),N(`Deleted "${a}".`)}catch(e){w(e instanceof Error?e.message:"DELETE_EVENT_FAILED")}finally{j(!1)}}}async function tl(e,t){let a=(0,i.readAdminToken)();if(a){eE(!0);try{let n=await fetch(`${h}/admin/events/${e.event_id}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(a)},body:JSON.stringify({is_live:+!!t})}),r=await n.json().catch(()=>null);if(!n.ok)throw Error(r?.error||"UPDATE_EVENT_FAILED");eW(e.event_id,{is_live:+!!t})}catch(e){w(e instanceof Error?e.message:"UPDATE_EVENT_FAILED")}finally{eE(!1)}}}async function to(e,t){let a=(0,i.readAdminToken)();if(a){eA(!0);try{let n=await fetch(`${h}/admin/events/${e.event_id}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(a)},body:JSON.stringify({declare_result:+!!t})}),r=await n.json().catch(()=>null);if(!n.ok)throw Error(r?.error||"UPDATE_EVENT_FAILED");eW(e.event_id,{declare_result:+!!t})}catch(e){w(e instanceof Error?e.message:"UPDATE_EVENT_FAILED")}finally{eA(!1)}}}if(a.default.useEffect(()=>()=>{en(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null))},[]),"dashboard"===b){let e,a,n,l,s,u,m,g,v,b,j,w;(0,i.readAdminToken)();let N=null!=eb?G.find(e=>e.event_id===eb)??null:null,k=(0,t.jsxs)("form",{id:"admin-event-form",onSubmit:tn,children:[(0,t.jsxs)("div",{className:"row-mix",children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Event title *"}),(0,t.jsx)("input",{className:"input",required:!0,value:J,onChange:e=>X(e.target.value),maxLength:200,placeholder:"Enter event name"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Visibility"}),(0,t.jsxs)("label",{className:"toggle-field",children:[(0,t.jsx)("input",{type:"checkbox",className:"switch",role:"switch",checked:er,onChange:e=>ei(e.target.checked),"aria-checked":er}),(0,t.jsx)("span",{className:"toggle-label",children:"Private (invite-only)"})]})]})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Description"}),(0,t.jsx)("textarea",{className:"input",value:Q,onChange:e=>Z(e.target.value),maxLength:500,rows:2,placeholder:"Optional short description"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Banner image"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",disabled:em||y,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(en(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),URL.createObjectURL(t))),et(""),ta(t)),e.currentTarget.value=""}}),ea?(0,t.jsxs)("div",{className:"banner-preview",children:[(0,t.jsx)("img",{src:ea,alt:""}),(0,t.jsx)("span",{className:`banner-badge ${em?"badge-busy":ee?"badge-ok":"badge-preview"}`,children:em?"Uploading…":ee?"Banner ready":"Preview"})]}):null]}),el?null:(0,t.jsxs)("fieldset",{className:"fieldset",children:[(0,t.jsx)("legend",{className:"fieldset-legend",children:"Voting window (pre-voting)"}),(0,t.jsx)("p",{className:"fieldset-hint",children:"Set both start and end times. When the window opens, the event goes live automatically."}),(0,t.jsxs)("div",{className:"grid2",children:[(0,t.jsxs)("div",{className:"field",style:{margin:0},children:[(0,t.jsx)("div",{className:"label",children:"Start"}),(0,t.jsx)("input",{className:"input",type:"datetime-local",value:es,onChange:e=>ed(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",style:{margin:0},children:[(0,t.jsx)("div",{className:"label",children:"End"}),(0,t.jsx)("input",{className:"input",type:"datetime-local",value:ec,min:es||void 0,onChange:e=>eu(e.target.value)})]})]})]}),(0,t.jsxs)("fieldset",{className:"fieldset",children:[(0,t.jsx)("legend",{className:"fieldset-legend",children:"Voting mode"}),(0,t.jsx)("p",{className:"fieldset-hint",children:"Pre-voting: voters browse categories during the scheduled window. Live voting: you control each category and timer from LED controls — no scheduled window."}),(0,t.jsxs)("label",{className:"toggle-field",children:[(0,t.jsx)("input",{type:"checkbox",className:"switch",role:"switch",checked:el,onChange:e=>{let t=e.target.checked;eo(t),t&&(ed(""),eu(""))},"aria-checked":el}),(0,t.jsx)("span",{className:"toggle-label",children:"Live voting"})]})]})]}),E=(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)(c.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:()=>eG("list")},{label:"My profile"}]})}),(0,t.jsx)("div",{className:"section-head",style:{marginTop:8},children:(0,t.jsx)("span",{className:"section-title",children:"My profile"})}),eT?(0,t.jsxs)("div",{className:"profileSummary",style:{marginBottom:20},children:[(0,t.jsx)("div",{className:"profileSummaryLabel",children:"Signed in as"}),(0,t.jsx)("div",{className:"profileSummaryValue",children:eT.name||eT.email}),(0,t.jsx)("div",{className:"profileSummaryMeta",children:eT.email})]}):null,(0,t.jsxs)("form",{onSubmit:e=>void e5(e),children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Your name *"}),(0,t.jsx)("input",{className:"input",required:!0,value:eL,onChange:e=>e_(e.target.value),maxLength:75})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Organisation name *"}),(0,t.jsx)("input",{className:"input",required:!0,value:eI,onChange:e=>eD(e.target.value),maxLength:100})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Mobile *"}),(0,t.jsx)("input",{className:"input",type:"tel",required:!0,value:eR,onChange:e=>eP(e.target.value.replace(/[^\d\s]/g,"").slice(0,12)),inputMode:"numeric"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Full address *"}),(0,t.jsx)("textarea",{className:"input",required:!0,value:eM,onChange:e=>eO(e.target.value),maxLength:300,rows:2})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Organisation logo (optional)"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",disabled:y||ez,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(eB(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),URL.createObjectURL(t))),eF(""),e2(t)),e.currentTarget.value=""}}),eU?(0,t.jsxs)("div",{className:"banner-preview",style:{marginTop:10},children:[(0,t.jsx)("img",{src:eU,alt:"",style:{height:80,objectFit:"contain",background:"#f8fafc"}}),(0,t.jsx)("span",{className:`banner-badge ${ez?"badge-busy":e$?"badge-ok":"badge-preview"}`,children:ez?"Uploading…":e$?"Logo ready":"Preview"})]}):null]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",value:eT?.email||"",disabled:!0,readOnly:!0,"aria-readonly":!0})]}),(0,t.jsx)("button",{type:"submit",className:"btn",disabled:y||ez,children:y?"Saving…":"Save changes"})]})]}),C=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)(c.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events"}]})}),(0,t.jsxs)("div",{className:"section-head",children:[(0,t.jsx)("span",{className:"section-title",children:"Your events"}),(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:12},children:[(0,t.jsxs)("span",{style:{fontSize:13,color:"var(--text-faint)"},children:[G.length," total"]}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eG("profile"),children:"My profile"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:function(){te(),eN("create")},children:"Add event"})]})]}),0===G.length?(0,t.jsx)("p",{className:"hint",children:"No events yet — use Add event to create your first one."}):(0,t.jsx)("div",{className:"event-list",children:G.map(e=>{let a=(e.title||"").trim()||"Untitled",n=(e.description||"").trim(),r=(0,o.resolveEventBannerUrl)(f,e.image);return(0,t.jsxs)("div",{className:"event-card-wrap",children:[(0,t.jsx)("button",{type:"button",className:"event-icon-btn",disabled:y,"aria-label":`Delete ${a}`,title:"Delete event",onClick:()=>void ti(e),children:(0,t.jsx)(tr,{})}),(0,t.jsx)("button",{type:"button",className:"event-card event-card-clickable",style:{flex:1,minWidth:0},onClick:()=>eG("detail",e.event_id),children:(0,t.jsxs)("div",{className:"event-card-row",children:[r?(0,t.jsx)("img",{src:r,alt:"",className:"event-card-thumb"}):(0,t.jsx)("div",{className:"event-card-thumb-ph","aria-hidden":!0,children:a.slice(0,2).toUpperCase()}),(0,t.jsxs)("div",{className:"event-card-main",children:[(0,t.jsxs)("div",{className:"event-header",style:{marginBottom:4*!!n},children:[(0,t.jsx)("span",{className:"event-title",children:a}),(0,t.jsx)("span",{className:`event-badge ${!0===e.is_private||1===e.is_private?"badge-private":"badge-public"}`,children:!0===e.is_private||1===e.is_private?"Private":"Public"})]}),n?(0,t.jsx)("p",{className:"event-desc",style:{marginBottom:0},children:n}):null]}),(0,t.jsx)("span",{className:"event-card-chevron","aria-hidden":!0,children:"›"})]})})]},e.event_id)})})]}),A=N?(a=(N.title||"").trim()||"Untitled",n=(N.description||"").trim(),l=(0,o.resolveEventBannerUrl)(f,N.image),s=!0===N.is_private||1===N.is_private,u=!0===N.is_live||1===N.is_live,m=!0===N.live_voting||1===N.live_voting,g=!0===N.declare_result||1===N.declare_result,v=function(e){let t=e.start_time,a=e.end_time;if(null==t||null==a||!String(t).trim()||!String(a).trim())return"always";let n=new Date(String(t)).getTime(),r=new Date(String(a)).getTime();if(Number.isNaN(n)||Number.isNaN(r))return"always";let i=Date.now();return i<n?"upcoming":i>r?"ended":"open"}(N),b=tz(N.start_time),j=tz(N.end_time),w=!!(b&&j),(0,t.jsxs)("article",{className:"event-detail-panel",children:[l?(0,t.jsx)("img",{src:l,alt:"",className:"event-detail-banner"}):(0,t.jsx)("div",{className:"event-detail-banner-ph","aria-hidden":!0,children:a.slice(0,2).toUpperCase()}),(0,t.jsxs)("div",{className:"event-detail-body",children:[(0,t.jsxs)("div",{className:"event-detail-badges",children:[(0,t.jsx)("span",{className:`event-badge ${s?"badge-private":"badge-public"}`,children:s?"Private":"Public"}),(0,t.jsx)("span",{className:`event-badge ${u?"badge-public":"badge-vote-ended"}`,children:u?"Live":"Not live"}),(0,t.jsx)("span",{className:`event-badge ${m?"badge-vote-open":"badge-vote-always"}`,children:m?"Live voting":"Pre-voting"}),m?null:(0,t.jsx)("span",{className:`event-badge ${"open"===v?"badge-vote-open":"upcoming"===v?"badge-vote-upcoming":"ended"===v?"badge-vote-ended":"badge-vote-always"}`,children:"open"===v?"Voting open":"upcoming"===v?"Voting soon":"ended"===v?"Voting ended":"Open voting"})]}),(0,t.jsx)("h1",{className:"event-detail-title",children:a}),n?(0,t.jsx)("p",{className:"event-desc",children:n}):null,m?(0,t.jsx)("p",{className:"event-detail-note",children:"Admin-controlled live voting — use LED controls to pick a category and start the timer. No scheduled voting window."}):w?(0,t.jsxs)("dl",{className:"event-detail-meta",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("dt",{children:"Voting starts"}),(0,t.jsx)("dd",{children:b})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("dt",{children:"Voting ends"}),(0,t.jsx)("dd",{children:j})]})]}):(0,t.jsx)("p",{className:"event-detail-note",children:"Set a voting window when editing this event for scheduled pre-voting."}),s?(0,t.jsx)("p",{className:"event-detail-note",children:"Invite-only event. Share the register link below with attendees."}):null,(0,t.jsxs)("div",{className:"event-detail-controls",children:[(0,t.jsx)("div",{className:"event-detail-controls-title",children:"Event controls"}),(0,t.jsxs)("div",{className:"event-detail-controls-row",children:[(0,t.jsxs)("label",{className:d.default.adminApproveSwitch,title:u?"Event is live":"Make event live",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:u,disabled:ek||y,onChange:e=>void tl(N,e.target.checked),"aria-label":u?"Take event offline":"Go live"}),(0,t.jsx)("span",{className:d.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:"Go live"})]}),(0,t.jsxs)("label",{className:d.default.adminApproveSwitch,title:g?"All category results declared":"Declare all category results",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:g,disabled:eC||y,onChange:e=>void to(N,e.target.checked),"aria-label":g?"Undeclare all results":"Declare all results"}),(0,t.jsx)("span",{className:d.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:"Declare all results"})]})]}),(0,t.jsx)("p",{className:"event-detail-note",style:{marginBottom:0},children:"Go live opens voting on the public event page. Per-category Show nominee and Declare result are in Categories."})]}),(0,t.jsxs)("div",{className:"event-detail-actions",children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eG("categories",N.event_id),children:"Categories"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eG("nominees",N.event_id),children:"Nominees"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,r.withBasePath)(`/actions?eventId=${N.event_id}`),target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"LED controls"}),s?(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eG("allowed-mobiles",N.event_id),children:"Allowed mobiles"}):null,(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,r.withBasePath)(`/screen?eventId=${N.event_id}`),target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"Open LED screen"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>{var e;navigator.clipboard.writeText((e=N.event_id,(0,r.fullAppUrl)(`/register?eventId=${e}`))),ej(!0),window.setTimeout(()=>ej(!1),2e3)},children:ey?"Link copied":"Copy register link"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,r.withBasePath)(`/events/${N.event_id}`),target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"Public event page"})]})]})]})):(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)(c.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:()=>eG("list")},{label:"Event not found"}]})}),(0,t.jsx)("p",{className:"hint",style:{padding:"1rem 0"},children:"Event not found."})]});if("detail"===eg){let a=N?(N.title||"").trim()||"Untitled":"Event";e=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"back-row",children:[(0,t.jsx)(c.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:()=>eG("list")},{label:a}]}),N?(0,t.jsxs)("div",{className:"back-row-actions",children:[(0,t.jsx)("button",{type:"button",className:"event-icon-btn event-icon-btn--neutral",disabled:y,"aria-label":`Edit ${a}`,title:"Edit event",onClick:()=>{let e;return ef(N.event_id),X((N.title||"").trim()),Z((N.description||"").trim()),void(et(e=(N.image||"").trim()),en(t=>(t?.startsWith("blob:")&&URL.revokeObjectURL(t),e?(0,o.resolveEventBannerUrl)(f,e):null)),ei(!0===N.is_private||1===N.is_private),eo(!0===N.live_voting||1===N.live_voting),ed(tB(N.start_time)),eu(tB(N.end_time)),eN("edit"),eb!==N.event_id&&eG("detail",N.event_id))},children:(0,t.jsx)(function(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,t.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})},{})}),(0,t.jsx)("button",{type:"button",className:"event-icon-btn",disabled:y,"aria-label":`Delete ${a}`,title:"Delete event",onClick:()=>void ti(N),children:(0,t.jsx)(tr,{})})]}):null]}),A]})}else if(("categories"===eg||"nominees"===eg)&&null!=eb){let a=G.find(e=>e.event_id===eb),n=(0,i.readAdminToken)();e=a&&n?(0,t.jsx)(tO,{mode:eg,eventId:eb,eventTitle:(a.title||"").trim()||"Untitled",apiBase:h,apiOrigin:f,token:n,onBack:()=>eG("detail",eb),onGoList:()=>eG("list"),onGoCategories:()=>eG("categories",eb),onEventDeclareResultChange:e=>eW(eb,{declare_result:+!!e})}):(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)(c.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:()=>eG("list")},{label:"Event not found"}]})}),(0,t.jsx)("p",{className:"hint",style:{padding:"1rem 0"},children:"Event not found."})]})}else if("profile"===eg)e=E;else if("allowed-mobiles"===eg&&null!=eb){let a=G.find(e=>e.event_id===eb),n=(0,i.readAdminToken)(),r=a?.is_private===!0||a?.is_private===1;e=a&&n&&r?(0,t.jsx)(tU,{eventId:eb,eventTitle:(a.title||"").trim()||"Untitled",apiBase:h,token:n,onBack:()=>eG("detail",eb),onGoList:()=>eG("list")}):(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)(c.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:()=>eG("list")},{label:"Event not found"}]})}),(0,t.jsx)("p",{className:"hint",style:{padding:"1rem 0"},children:a?"Allowed mobiles apply only to private events.":"Event not found."})]})}else e=C;return(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:tH}),(0,t.jsxs)("div",{className:"dashboard",children:[(0,t.jsxs)("div",{className:"topbar",children:[(0,t.jsxs)("div",{className:"topbar-brand",children:[(0,t.jsx)("div",{className:"topbar-icon",children:(0,t.jsx)(tW,{})}),(0,t.jsx)("span",{className:"topbar-title",children:"Event Admin"})]}),(0,t.jsxs)("div",{className:"topbar-actions",children:[eT?(0,t.jsx)("button",{type:"button",className:"topbar-profile",onClick:()=>eG("profile"),title:`Signed in as ${eT.name||eT.email}`,"aria-label":`My profile (${eT.name||eT.email})`,children:(0,t.jsx)("span",{className:"topbar-profile-avatar","aria-hidden":!0,children:(eT.name||eT.email).slice(0,2).toUpperCase()})}):null,(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:function(){(0,i.clearAdminSession)(),eS(null),x("auth"),K([])},children:"Log out"})]})]}),e,ew?(0,t.jsx)(p,{wide:!0,title:"create"===ew?"New event":"Edit event",onClose:tt,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",disabled:y||em,onClick:tt,children:"Cancel"}),(0,t.jsx)("button",{type:"submit",form:"admin-event-form",className:"btn",disabled:y||em,children:y?"Saving…":"edit"===ew?"Save changes":"Create event"})]}),children:k}):null]})]})}return"forgot"===b?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:tH}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(tW,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Forgot password"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Enter your email and we'll send a 6-digit OTP."}),(0,t.jsxs)("form",{onSubmit:e9,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:k,onChange:e=>E(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:y,children:y?"Sending…":"Send OTP"})]}),(0,t.jsx)("div",{className:"auth-footer",children:(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>x("auth"),children:"← Back to sign in"})})]})})]}):"register"===b?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:tH}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card auth-card-wide",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(tW,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Create account"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Fill in your details. We will email a one-time code to verify your account."}),(0,t.jsxs)("form",{onSubmit:e4,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Your name *"}),(0,t.jsx)("input",{className:"input",required:!0,value:R,onChange:e=>P(e.target.value),placeholder:"Full name",maxLength:75,autoComplete:"name"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Organisation name *"}),(0,t.jsx)("input",{className:"input",required:!0,value:M,onChange:e=>O(e.target.value),placeholder:"Company or organisation",maxLength:100,autoComplete:"organization"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Mobile *"}),(0,t.jsx)("input",{className:"input",type:"tel",required:!0,value:$,onChange:e=>F(e.target.value.replace(/[^\d\s]/g,"").slice(0,12)),placeholder:"10–12 digit mobile number",inputMode:"numeric",autoComplete:"tel"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Full address *"}),(0,t.jsx)("textarea",{className:"input",required:!0,value:U,onChange:e=>B(e.target.value),placeholder:"Street, city, state, PIN",maxLength:300,rows:2,autoComplete:"street-address"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Organisation logo (optional)"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",disabled:y||q,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(V(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),URL.createObjectURL(t))),H(""),e1(t)),e.currentTarget.value=""}}),W?(0,t.jsxs)("div",{className:"banner-preview",style:{marginTop:10},children:[(0,t.jsx)("img",{src:W,alt:"",style:{height:80,objectFit:"contain",background:"#f8fafc"}}),(0,t.jsx)("span",{className:`banner-badge ${q?"badge-busy":z?"badge-ok":"badge-preview"}`,children:q?"Uploading…":z?"Logo ready":"Preview"})]}):null]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email *"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,autoComplete:"email",value:k,onChange:e=>E(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Password *"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"new-password",value:C,onChange:e=>A(e.target.value),placeholder:"At least 8 characters",minLength:8,maxLength:72})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Confirm password *"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"new-password",value:T,onChange:e=>S(e.target.value),placeholder:"Re-enter password",minLength:8,maxLength:72})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:y||q,children:y?"Sending OTP…":"Send OTP"})]}),(0,t.jsx)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{x("auth")},children:"Already have an account? Sign in"})})]})})]}):"register-verify"===b?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:tH}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(tW,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Verify your email"}),(0,t.jsxs)("div",{className:"auth-subtitle",children:["Enter the 6-digit OTP sent to ",(0,t.jsx)("strong",{children:k.trim()||"your email"}),"."]}),(0,t.jsxs)("form",{onSubmit:e6,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:k,onChange:e=>E(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"OTP"}),(0,t.jsx)("input",{className:"input",required:!0,value:L,onChange:e=>_(e.target.value.replace(/\D/g,"").slice(0,6)),placeholder:"6-digit code",inputMode:"numeric",maxLength:6,pattern:"\\d{6}"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:y,children:y?"Verifying…":"Verify & continue"})]}),(0,t.jsxs)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:[(0,t.jsx)("button",{type:"button",className:"link-btn",disabled:y,onClick:()=>void e8(),children:"Resend OTP"}),(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{x("register")},children:"← Back to register"})]})]})})]}):"reset"===b?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:tH}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(tW,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Reset password"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Enter the OTP from your email and choose a new password."}),(0,t.jsxs)("form",{onSubmit:e7,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:k,onChange:e=>E(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"OTP"}),(0,t.jsx)("input",{className:"input",required:!0,value:L,onChange:e=>_(e.target.value),placeholder:"6-digit code",inputMode:"numeric",maxLength:6})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"New password"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,value:I,onChange:e=>D(e.target.value),placeholder:"At least 8 characters"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:y,children:y?"Saving…":"Reset & sign in"})]})]})})]}):"boot"===b?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:tH}),(0,t.jsx)("div",{style:{minHeight:"100dvh",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text-muted)",fontSize:14},children:"Checking session…"})]}):(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:tH}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(tW,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Welcome back"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Sign in to manage your events."}),(0,t.jsxs)("form",{onSubmit:e3,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,autoComplete:"email",value:k,onChange:e=>E(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Password"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"current-password",value:C,onChange:e=>A(e.target.value),placeholder:"Min 8 characters",minLength:8,maxLength:72})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:y,children:y?"Please wait…":"Sign in"})]}),(0,t.jsxs)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:[(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{x("forgot")},children:"Forgot password?"}),(0,t.jsxs)("span",{style:{color:"var(--text-muted)"},children:["Don't have an account?"," ",(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:function(){S(""),_(""),P(""),O(""),F(""),B(""),H(""),V(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null)),x("register")},children:"Register"})]})]})]})})]})}e.s(["default",0,function(){return(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{style:{minHeight:"100vh",background:"#e8f0fe",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b",fontFamily:"sans-serif",fontSize:14},children:"Loading…"}),children:(0,t.jsx)(tV,{})})}],72906)}]);