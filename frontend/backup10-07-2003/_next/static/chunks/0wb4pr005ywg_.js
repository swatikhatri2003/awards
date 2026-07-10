(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,72906,e=>{"use strict";var t=e.i(43476),a=e.i(71645),n=e.i(18566),r=e.i(37645),i=e.i(90165),l=e.i(82608),o=e.i(86347),s=e.i(30434),d=e.i(11688),c=e.i(36888);function u(e){return(0,t.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:(0,t.jsx)("path",{d:"M18 6L6 18M6 6l12 12",strokeLinecap:"round"})})}function m(e){let{title:n,titleId:r="admin-modal-title",wide:i,onClose:l,footer:o,children:s}=e;return a.default.useEffect(()=>{let e=e=>{"Escape"===e.key&&l()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[l]),(0,t.jsx)("div",{className:d.default.adminModalBackdrop,role:"presentation",onClick:l,children:(0,t.jsxs)("div",{className:`${d.default.adminModal} ${i?d.default.adminModalWide:""}`,role:"dialog","aria-modal":"true","aria-labelledby":r,onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:d.default.adminModalHead,children:[(0,t.jsx)("h2",{id:r,className:d.default.adminModalTitle,children:n}),(0,t.jsx)("button",{type:"button",className:d.default.adminIconBtn,onClick:l,"aria-label":"Close",children:(0,t.jsx)(u,{})})]}),s,o?(0,t.jsx)("div",{className:d.default.adminModalFooter,children:o}):null]})})}var p=e.i(21435);e.i(47167);var h=e.i(1447),f=e.i(53488),g=e.i(76776),g=g,v=e.i(55323),b=e.i(78564),x=e.i(64719),y=e.i(69072);function j(e){return(0,y.default)("MuiCardHeader",e)}let w=(0,x.default)("MuiCardHeader",["root","avatar","action","content","title","subheader"]);var N=e.i(75822);let k=(0,v.styled)("div",{name:"MuiCardHeader",slot:"Root",overridesResolver:(e,t)=>[{[`& .${w.title}`]:t.title},{[`& .${w.subheader}`]:t.subheader},t.root]})({display:"flex",alignItems:"center",padding:16}),E=(0,v.styled)("div",{name:"MuiCardHeader",slot:"Avatar"})({display:"flex",flex:"0 0 auto",marginRight:16}),C=(0,v.styled)("div",{name:"MuiCardHeader",slot:"Action"})({flex:"0 0 auto",alignSelf:"flex-start",marginTop:-4,marginRight:-8,marginBottom:-4}),A=(0,v.styled)("div",{name:"MuiCardHeader",slot:"Content"})({flex:"1 1 auto",[`.${g.default.root}:where(& .${w.title})`]:{display:"block"},[`.${g.default.root}:where(& .${w.subheader})`]:{display:"block"}}),T=a.forwardRef(function(e,a){let n=(0,b.useDefaultProps)({props:e,name:"MuiCardHeader"}),{action:r,avatar:i,component:l="div",disableTypography:o=!1,subheader:s,title:d,slots:c={},slotProps:u={},...m}=n,p={...n,component:l,disableTypography:o},g=(e=>{let{classes:t}=e;return(0,h.default)({root:["root"],avatar:["avatar"],action:["action"],content:["content"],title:["title"],subheader:["subheader"]},j,t)})(p),v={slots:c,slotProps:u},x=d,[y,w]=(0,N.default)("title",{className:g.title,elementType:f.default,externalForwardedProps:v,ownerState:p,additionalProps:{variant:i?"body2":"h5",component:"span"}});null==x||x.type===f.default||o||(x=(0,t.jsx)(y,{...w,children:x}));let T=s,[S,I]=(0,N.default)("subheader",{className:g.subheader,elementType:f.default,externalForwardedProps:v,ownerState:p,additionalProps:{variant:i?"body2":"body1",color:"textSecondary",component:"span"}});null==T||T.type===f.default||o||(T=(0,t.jsx)(S,{...I,children:T}));let[L,_]=(0,N.default)("root",{ref:a,className:g.root,elementType:k,externalForwardedProps:{...v,...m,component:l},ownerState:p}),[R,D]=(0,N.default)("avatar",{className:g.avatar,elementType:E,externalForwardedProps:v,ownerState:p}),[P,M]=(0,N.default)("content",{className:g.content,elementType:A,externalForwardedProps:v,ownerState:p}),[O,$]=(0,N.default)("action",{className:g.action,elementType:C,externalForwardedProps:v,ownerState:p});return(0,t.jsxs)(L,{..._,children:[i&&(0,t.jsx)(R,{...D,children:i}),(0,t.jsxs)(P,{...M,children:[x,T]}),r&&(0,t.jsx)(O,{...$,children:r})]})});var S=e.i(58598),I=e.i(17050),L=e.i(7670),_=e.i(56192),R=e.i(51221),D=e.i(42830),P=e.i(1839),M=e.i(68874),O=e.i(55702);function $(e){return(0,y.default)("MuiIconButton",e)}let F=(0,x.default)("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","colorError","colorInfo","colorSuccess","colorWarning","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge","loading","loadingIndicator","loadingWrapper"]);var z=e.i(41322);let B=(0,v.styled)(P.default,{name:"MuiIconButton",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.root,a.loading&&t.loading,"default"!==a.color&&t[`color${(0,O.default)(a.color)}`],a.edge&&t[`edge${(0,O.default)(a.edge)}`],t[`size${(0,O.default)(a.size)}`]]}})((0,R.default)(({theme:e})=>({textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:8,borderRadius:"50%",color:(e.vars||e).palette.action.active,...(0,z.getTransitionStyles)(e,"background-color",{duration:e.transitions.duration.shortest}),variants:[{props:e=>!e.disableRipple,style:{"--IconButton-hoverBg":e.alpha((e.vars||e).palette.action.active,(e.vars||e).palette.action.hoverOpacity),"&:hover":{backgroundColor:"var(--IconButton-hoverBg)","@media (hover: none)":{backgroundColor:"transparent"}}}},{props:{edge:"start"},style:{marginLeft:-12}},{props:{edge:"start",size:"small"},style:{marginLeft:-3}},{props:{edge:"end"},style:{marginRight:-12}},{props:{edge:"end",size:"small"},style:{marginRight:-3}}]})),(0,R.default)(({theme:e})=>({variants:[{props:{color:"inherit"},style:{color:"inherit"}},...Object.entries(e.palette).filter((0,D.default)()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main,"--IconButton-hoverBg":e.alpha((e.vars||e).palette[t].main,(e.vars||e).palette.action.hoverOpacity)}})),{props:{size:"small"},style:{padding:5,fontSize:e.typography.pxToRem(18)}},{props:{size:"large"},style:{padding:12,fontSize:e.typography.pxToRem(28)}}],[`&.${F.disabled}`]:{backgroundColor:"transparent",color:(e.vars||e).palette.action.disabled},[`&.${F.loading}`]:{color:"transparent"}}))),U=(0,v.styled)("span",{name:"MuiIconButton",slot:"LoadingIndicator"})(({theme:e})=>({display:"none",position:"absolute",visibility:"visible",top:"50%",left:"50%",transform:"translate(-50%, -50%)",color:(e.vars||e).palette.action.disabled,variants:[{props:{loading:!0},style:{display:"flex"}}]})),H=a.forwardRef(function(e,a){let n=(0,b.useDefaultProps)({props:e,name:"MuiIconButton"}),{edge:r=!1,children:i,className:l,color:o="default",disabled:s=!1,disableFocusRipple:d=!1,size:c="medium",id:u,loading:m=null,loadingIndicator:p,...f}=n,g=(0,_.unstable_useId)(u),v=p??(0,t.jsx)(M.default,{"aria-labelledby":g,color:"inherit",size:16}),x={...n,edge:r,color:o,disabled:s,disableFocusRipple:d,loading:m,loadingIndicator:v,size:c},y=(e=>{let{classes:t,disabled:a,color:n,edge:r,size:i,loading:l}=e,o={root:["root",l&&"loading",a&&"disabled","default"!==n&&`color${(0,O.default)(n)}`,r&&`edge${(0,O.default)(r)}`,`size${(0,O.default)(i)}`],loadingIndicator:["loadingIndicator"],loadingWrapper:["loadingWrapper"]};return(0,h.default)(o,$,t)})(x);return(0,t.jsxs)(B,{id:m?g:u,className:(0,L.default)(y.root,l),centerRipple:!0,internalNativeButton:!0,focusRipple:!d,disabled:s||m,ref:a,...f,ownerState:x,children:["boolean"==typeof m&&(0,t.jsx)("span",{className:y.loadingWrapper,style:{display:"contents"},children:(0,t.jsx)(U,{className:y.loadingIndicator,ownerState:x,children:m&&v})}),i]})});var W=e.i(9303),V=e.i(553);let q=Object.is;function G(e){let t=e.activeElement;for(;t?.shadowRoot?.activeElement!=null;)t=t.shadowRoot.activeElement;return t}function Y(e){return e&&e.ownerDocument||document}function K(e,t){"function"==typeof e?e(t):e&&(e.current=t)}var J=e.i(95154),X=e.i(42032),Q=e.i(24603);let Z=a.createContext(void 0),ee=["ArrowRight","ArrowLeft","ArrowUp","ArrowDown","Home","End"];function et(e,t,a,n){var r,i,l;let o;return null!=e?(r=e,i=t,l=a,-1===(o=el(i,r))?er(i,l):l(i[o])?i[o].id:en(i,o,"next",!1,l)?.id??null):function(e,t,a){let n=a?.(e);if(null!=n){let a=ei(e,n);if(a&&t(a))return a.id}return er(e,t)}(t,a,n)}function ea(e,t,a){if(t){let a=eo(e,t);if(-1!==a)return a}return el(e,a)}function en(e,t,a,n,r){let i=e.length-1;if(-1===i)return null;let l=!1,o=ec(t,i,a,n),s=o;for(;-1!==o;){if(o===s){if(l)return null;l=!0}let t=e[o];if(t&&r(t))return t;o=ec(o,i,a,n)}return null}function er(e,t){return e.find(e=>t(e))?.id??null}function ei(e,t){return null==t?null:e.find(e=>e.id===t)??null}function el(e,t){return null==t?-1:e.findIndex(e=>e.id===t)}function eo(e,t){return t?e.findIndex(e=>e.element===t||e.element?.contains(t)):-1}function es(e){let t=Array.from(e.values());return t.every(e=>null==e.element)?t:[...t.filter(em).sort((e,t)=>(function(e,t){if(e===t)return 0;let a=e.compareDocumentPosition(t);return a&Node.DOCUMENT_POSITION_FOLLOWING||a&Node.DOCUMENT_POSITION_CONTAINED_BY?-1:a&Node.DOCUMENT_POSITION_PRECEDING||a&Node.DOCUMENT_POSITION_CONTAINS?1:0})(e.element,t.element)),...t.filter(e=>!em(e))]}function ed(e){return es(e).filter(em)}function ec(e,t,a,n=!0){return"next"===a?e===t?n?0:-1:e+1:0===e?n?t:-1:e-1}function eu(e){return!!e.element&&(!!e.focusableWhenDisabled||!e.disabled&&!e.element.hasAttribute("disabled")&&"true"!==e.element.getAttribute("aria-disabled")&&e.element.hasAttribute("tabindex"))}function em(e){return null!=e.element&&e.element.isConnected}let ep=function(e,t){if(!e||!t)return!1;if(e.contains(t))return!0;let a=t.getRootNode?.();if(a&&a instanceof ShadowRoot){let a=t;for(;a;){if(e===a)return!0;a=a.parentNode??a.host??null}}return!1};function eh(e=window){let t=e.document.documentElement.clientWidth;return e.innerWidth-t}function ef(e,t){if(null==t)return void e.focus();try{e.focus({focusVisible:"keyboard"===t})}catch(t){e.focus()}}var eg=e.i(80012),ev=e.i(73129);let eb=J.default;function ex(e){return Y(e).defaultView||window}let ey=a.createContext({});function ej(e){return(0,y.default)("MuiList",e)}(0,x.default)("MuiList",["root","padding","dense","subheader"]);let ew=(0,v.styled)("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.root,!a.disablePadding&&t.padding,a.dense&&t.dense,a.subheader&&t.subheader]}})({listStyle:"none",margin:0,padding:0,position:"relative",variants:[{props:({ownerState:e})=>!e.disablePadding,style:{paddingTop:8,paddingBottom:8}},{props:({ownerState:e})=>e.subheader,style:{paddingTop:0,isolation:"isolate"}}]}),eN=a.forwardRef(function(e,n){let r=(0,b.useDefaultProps)({props:e,name:"MuiList"}),{children:i,className:l,component:o="ul",dense:s=!1,disablePadding:d=!1,subheader:c,...u}=r,m=a.useMemo(()=>({dense:s}),[s]),p={...r,component:o,dense:s,disablePadding:d},f=(e=>{let{classes:t,disablePadding:a,dense:n,subheader:r}=e;return(0,h.default)({root:["root",!a&&"padding",n&&"dense",r&&"subheader"]},ej,t)})(p);return(0,t.jsx)(ey.Provider,{value:m,children:(0,t.jsxs)(ew,{as:o,className:(0,L.default)(f.root,l),ref:n,ownerState:p,...u,children:[c,i]})})}),ek=a.createContext(null);function eE(){return a.useContext(ek)}ek.Provider;let eC=a.createContext(void 0);function eA(e,t){if(void 0===t)return!0;let a=function(e){let t=e?.element??e;if(!t)return"";if(e?.textValue!==void 0)return e.textValue;let a=t.innerText;return void 0===a&&(a=t.textContent),a??""}(e);return 0!==(a=a.trim().toLowerCase()).length&&(t.repeating?a[0]===t.keys[0]:a.startsWith(t.keys.join("")))}let eT=a.forwardRef(function(e,n){let{actions:r,autoFocus:i=!1,autoFocusItem:l=!1,children:o,className:s,disabledItemsFocusable:d=!1,disableListWrap:c=!1,onKeyDown:u,variant:m="selectedMenu",...p}=e,h=a.useRef(null),f=a.useRef(!1),[g,v]=a.useState(!1),b=eE(),x=a.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null}),y=function(e){let{activeItemId:t,getDefaultActiveItemId:n,orientation:r,isRtl:i=!1,isItemFocusable:l=eu,wrap:o=!0}=e,[s,d]=a.useState(t),[c,u]=a.useState(t),m=s;t!==c&&(u(t),void 0!==t&&t!==s&&(m=t,d(t)));let p=a.useRef(null),h=a.useRef(new Map),[f,g]=a.useState(0),v=et(m,a.useMemo(()=>es(h.current),[f]),l,n),b=a.useRef(v);b.current=v;let x=a.useCallback(()=>{let e=es(h.current),t=et(b.current,e,l,n);return ei(e,t)},[n,l]),y=a.useCallback(()=>h.current,[]),j=(0,X.default)(e=>{!function(e,t){if(e===t)return!0;if(!(e instanceof Object)||!(t instanceof Object))return!1;let a=0,n=0;for(let n in e)if(a+=1,!q(e[n],t[n])||!(n in t))return!1;for(let e in t)n+=1;return a===n}(h.current.get(e.id)??null,e)&&(h.current.set(e.id,e),g(e=>e+1))}),w=(0,X.default)(e=>{h.current.delete(e)&&g(e=>e+1)}),N=(0,X.default)(e=>{d(e)}),k=a.useCallback(e=>b.current===e,[]),E=a.useCallback((e,t,a,n)=>{let r=en(ed(h.current),e,t,a,n??l);return r?(r.element?.focus(),d(r.id),r):null},[l]),C=a.useCallback(e=>({onFocus:e=>{let t=ed(h.current),a=eo(t,e.target);-1!==a&&d(t[a].id)},onKeyDown:e=>{if(e.altKey||e.shiftKey||e.ctrlKey||e.metaKey||!ee.includes(e.key))return;let t="horizontal"===r?"ArrowLeft":"ArrowUp",a="horizontal"===r?"ArrowRight":"ArrowDown";"horizontal"===r&&i&&(t="ArrowRight",a="ArrowLeft");let n=ed(h.current),l=G(Y(p.current)),s=l===p.current,d=ea(n,l,b.current),c="next";switch(e.key){case t:c="previous",e.preventDefault(),s&&(d=n.length);break;case a:e.preventDefault(),s&&(d=-1);break;case"Home":e.preventDefault(),d=-1;break;case"End":e.preventDefault(),c="previous",d=n.length;break;default:return}E(d,c,o)},ref:function(...e){return t=>{e.forEach(e=>{K(e??null,t)})}}(e,e=>{p.current=e})}),[E,i,r,o]),A=a.useCallback(e=>{let t=ed(h.current),a=G(Y(p.current)),n=a===p.current?-1:ea(t,a,b.current);return E(n,"next",!0,e)?.id??null},[E]);return a.useMemo(()=>({activeItemId:v,focusNext:A,getActiveItem:x,getContainerProps:C,getItemMap:y,isItemActive:k,registerItem:j,setActiveItemId:N,unregisterItem:w}),[v,A,x,C,y,k,j,N,w])}({activeItemId:void 0,getDefaultActiveItemId:a.useCallback(e=>"selectedMenu"===m?e.find(e=>e.selected&&eu(e))?.id??e.find(e=>eu(e))?.id??null:e.find(e=>eu(e))?.id??null,[m]),orientation:"vertical",wrap:!c}),{activeItemId:j,focusNext:w,getActiveItem:N,getContainerProps:k,getItemMap:E}=y,C=(0,eg.default)((e=!1)=>{if(!h.current||!e&&f.current)return null;if(l){let e=N();if(e?.element){let t=Array.from(E().values()).some(e=>e.selected);return v("menu"===m&&t&&!e.selected&&null==b),ef(e.element,b),f.current=!0,e.element}return i?(v(!1),h.current.focus(),h.current):null}return i?(v(!1),h.current.focus(),f.current=!0,h.current):(v(!1),null)});eb(()=>{if(!i&&!l){f.current=!1,v(!1);return}C()},[j,l,i,C]),a.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(e,{direction:t})=>{let a=!h.current.style.width;if(e.clientHeight<h.current.clientHeight&&a){let a=`${eh(ex(e))}px`;h.current.style["rtl"===t?"paddingLeft":"paddingRight"]=a,h.current.style.width=`calc(100% + ${a})`}return h.current},focusInitialTarget:()=>{if(!h.current)return null;let e=G(Y(h.current));return e&&ep(h.current,e)?e:C(!0)}}),[C]);let A=k(),T=(0,ev.default)(h,A.ref,n),S=a.useMemo(()=>({itemsFocusableWhenDisabled:d,suppressInitialFocusVisible:g,variant:m}),[d,g,m]),I=(0,eg.default)(e=>{if(g&&v(!1),(e.ctrlKey||e.metaKey||e.altKey)&&u)return void u(e);if(A.onKeyDown(e),1===e.key.length){let t=x.current,a=e.key.toLowerCase(),n=performance.now();t.keys.length>0&&(n-t.lastTime>500?(t.keys=[],t.repeating=!0,t.previousKeyMatched=!0):t.repeating&&a!==t.keys[0]&&(t.repeating=!1)),t.lastTime=n,t.keys.push(a);let r=G(Y(h.current)),i=r&&!t.repeating&&eA(r,t);t.previousKeyMatched&&(i||null!=w(e=>!!eA(e,t)&&eu(e)))?e.preventDefault():t.previousKeyMatched=!1}u&&u(e)});return(0,t.jsx)(eN,{role:"menu",ref:T,className:s,onKeyDown:I,onFocus:A.onFocus,tabIndex:-1,...p,children:(0,t.jsx)(eC.Provider,{value:S,children:(0,t.jsx)(Z.Provider,{value:y,children:o})})})});var eS=e.i(15205);let eI=function(e,t=166){let a;function n(...r){let i=()=>{e.apply(this,r)};clearTimeout(a),a=setTimeout(i,t)}return n.clear=()=>{clearTimeout(a)},n};function eL(e){return parseInt(a.version,10)>=19?e?.props?.ref||null:e?.ref||null}var e_=e.i(18717);let eR=a.default.createContext(null),eD=function(e){var n;let r,{in:i=!1,appear:l=!1,enter:o=!0,exit:s=!0,mountOnEnter:d=!1,unmountOnExit:c=!1,timeout:u,addEndListener:m,reduceMotion:p=!1,getAutoTimeout:h,nodeRef:f,onEnter:g,onEntering:v,onEntered:b,onExit:x,onExiting:y,onExited:j,children:w,...N}=e,k=a.useContext(eR),E=k&&!k.isMounting?o:l,[C,A]=a.useState(()=>i?E?"exited":"entered":d||c?"unmounted":"exited"),T=a.useRef(C);T.current=C,i&&"unmounted"===C&&(T.current="exited",A("exited"));let S=a.useRef(i&&E),I=a.useRef(!1),L=a.useRef(null),_=a.useRef(C),R=a.useRef(!1),D=a.useRef(p),P=(n={timeout:u,addEndListener:m,reduceMotion:p,getAutoTimeout:h,onEnter:g,onEntering:v,onEntered:b,onExit:x,onExiting:y,onExited:j,enter:o,exit:s,mountOnEnter:d,unmountOnExit:c,nodeRef:f,parentGroup:k},(r=(0,e_.default)(()=>{var e;let t;return t={current:e=n,next:e,effect:()=>{t.current=t.next}}}).current).next=n,(0,J.default)(r.effect),r),M=a.useCallback(()=>{null!==L.current&&(L.current.cancel(),L.current=null)},[]),O=a.useCallback(e=>{let t=!0,a=()=>{t&&(t=!1,L.current=null,e())};return a.cancel=()=>{t=!1},L.current=a,a},[]),$=a.useCallback((e,t)=>{let a,n=()=>{void 0!==a&&(clearTimeout(a),a=void 0)},r=O(()=>{n(),T.current=e,A(e)}),i=r.cancel;r.cancel=()=>{n(),i()};let l=P.current.nodeRef.current,o=P.current.addEndListener,s=void 0!==P.current.getAutoTimeout,d=P.current.getAutoTimeout?.(),c=function(e){if(null!=e.autoTimeout)return e.autoTimeout;let t=function(e){if(null==e)return{appear:void 0,enter:void 0,exit:void 0};if("number"==typeof e)return{appear:e,enter:e,exit:e};let t=e.enter,a=e.exit;return{appear:void 0!==e.appear?e.appear:t,enter:t,exit:a}}(e.timeout);return"entering"===e.currentStatus?e.isAppearing?t.appear??t.enter??null:t.enter??null:t.exit??null}({currentStatus:t,isAppearing:R.current,timeout:P.current.timeout,autoTimeout:d}),u=D.current,m=c??(u&&s?0:null),p=e=>{a=setTimeout(r,e)};if(!l)return void p(0);if(o){null!=m&&p(u?0:m),o.length>=2?o(l,r):o(r);return}p(u?0:c??0)},[O,P]),F=a.useCallback(e=>{let t=P.current,a=t.parentGroup?t.parentGroup.isMounting:e;if(R.current=a,!e&&!t.enter){T.current="entered",A("entered");return}D.current=t.reduceMotion,t.onEnter?.(a),T.current="entering",A("entering")},[P]),B=a.useCallback(()=>{let e=P.current;if(!e.exit){T.current="exited",A("exited");return}D.current=e.reduceMotion,e.onExit?.(),T.current="exiting",A("exiting")},[P]),U=a.useCallback((e,t)=>{if(M(),"entering"===t){let t=P.current;if(t.mountOnEnter||t.unmountOnExit){let e=t.nodeRef.current;e&&(0,z.reflow)(e)}F(e)}else B()},[M,F,B,P]);return((0,J.default)(()=>(I.current=!0,S.current&&(S.current=!1,U(!0,"entering")),()=>{I.current=!1,M()}),[M,U]),(0,J.default)(()=>{if(!I.current)return;let e=T.current;i?"entering"!==e&&"entered"!==e&&U(!1,"entering"):"entering"===e||"entered"===e?U(!1,"exiting"):"exited"===e&&c&&(T.current="unmounted",A("unmounted"))},[i,C,c,U]),(0,J.default)(()=>{if("unmounted"===C||"unmounted"===_.current){_.current=C;return}if(_.current===C)return;_.current=C;let e=P.current;"entering"===C?(e.onEntering?.(R.current),$("entered","entering")):"exiting"===C?(e.onExiting?.(),$("exited","exiting")):"entered"===C?e.onEntered?.(R.current):"exited"===C&&e.onExited?.()},[P,$,C]),"unmounted"===C)?null:(0,t.jsx)(eR.Provider,{value:null,children:w(C,N)})};var eP=e.i(6692),eM=e.i(89088);function eO(e){return`scale(${e}, ${e**2})`}let e$={entering:{opacity:1,transform:eO(1)},entered:{opacity:1,transform:"none"},exiting:{opacity:0,transform:eO(.75)},exited:{opacity:0,transform:eO(.75)}},eF={opacity:0,transform:eO(.75),visibility:"hidden"},ez=a.forwardRef(function(e,n){let{addEndListener:r,appear:i=!0,children:l,disablePrefersReducedMotion:o=!1,easing:s,in:d,onEnter:c,onEntered:u,onEntering:m,onExit:p,onExited:h,onExiting:f,style:g,timeout:v="auto",...b}=e,x=a.useRef(null),y=(0,eM.useTheme)(),j=(0,eP.default)(y.motion.reducedMotion,o),w=a.useRef(null),N=(0,ev.default)(w,eL(l),n),k=(0,z.normalizedTransitionCallback)(w,m),E=(0,z.normalizedTransitionCallback)(w,(e,t)=>{let a;j.shouldReduceMotion||(0,z.reflow)(e);let{duration:n,delay:r,easing:i}=(0,z.getTransitionProps)({style:g,timeout:v,easing:s},{mode:"enter"});"auto"!==v||j.shouldReduceMotion?(a=n,x.current=null):x.current=a=y.transitions.getAutoHeightDuration(e.clientHeight);let l=j.getTransitionTiming({duration:a,delay:r});e.style.transition=[y.transitions.create("opacity",{duration:l.duration,delay:l.delay}),y.transitions.create("transform",{duration:"string"==typeof l.duration?l.duration:.666*l.duration,delay:l.delay,easing:i})].join(","),c&&c(e,t)}),C=(0,z.normalizedTransitionCallback)(w,u),A=(0,z.normalizedTransitionCallback)(w,f),T=(0,z.normalizedTransitionCallback)(w,e=>{let t,{duration:a,delay:n,easing:r}=(0,z.getTransitionProps)({style:g,timeout:v,easing:s},{mode:"exit"});"auto"!==v||j.shouldReduceMotion?(t=a,x.current=null):x.current=t=y.transitions.getAutoHeightDuration(e.clientHeight);let i=j.getTransitionTiming({duration:t,delay:n});e.style.transition=[y.transitions.create("opacity",{duration:i.duration,delay:i.delay}),y.transitions.create("transform",{duration:"string"==typeof i.duration?i.duration:.666*i.duration,delay:i.delay||("string"==typeof i.duration?i.duration:.333*i.duration),easing:r})].join(","),e.style.opacity=0,e.style.transform=eO(.75),p&&p(e)}),S=(0,z.normalizedTransitionCallback)(w,e=>{e.style.transition="",h&&h(e)}),I=r?e=>{r(w.current,e)}:void 0;return(0,t.jsx)(eD,{appear:i,in:d,nodeRef:w,onEnter:E,onEntered:C,onEntering:k,onExit:T,onExited:S,onExiting:A,addEndListener:I,getAutoTimeout:"auto"===v?()=>x.current:void 0,reduceMotion:j.shouldReduceMotion,timeout:"auto"===v?null:v,...b,children:(e,{ownerState:t,...n})=>{let r=(0,z.getTransitionChildStyle)(e,d,e$,eF,g,l.props.style);return a.cloneElement(l,{style:r,ref:N,...n})}})});ez&&(ez.muiSupportAuto=!0);let eB="data-mui-focusable";function eU(e){return e?e.hasAttribute(eB)?e:e.querySelector(`[${eB}]`):null}function eH(e){let t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?"true"===e.contentEditable||("AUDIO"===e.nodeName||"VIDEO"===e.nodeName||"DETAILS"===e.nodeName)&&null===e.getAttribute("tabindex")?0:e.tabIndex:t}function eW(e){let t=[],a=[];return Array.from(e.querySelectorAll('input,select,textarea,a[href],button,[tabindex],audio[controls],video[controls],[contenteditable]:not([contenteditable="false"])')).forEach((e,n)=>{let r=eH(e);-1===r||e.disabled||"INPUT"===e.tagName&&"hidden"===e.type||function(e){if("INPUT"!==e.tagName||"radio"!==e.type||!e.name)return!1;let t=t=>e.ownerDocument.querySelector(`input[type="radio"]${t}`),a=t(`[name="${e.name}"]:checked`);return a||(a=t(`[name="${e.name}"]`)),a!==e}(e)||(0===r?t.push(e):a.push({documentOrder:n,tabIndex:r,node:e}))}),a.sort((e,t)=>e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex).map(e=>e.node).concat(t)}function eV(){return!0}let eq=function(e){let{children:n,disableAutoFocus:r=!1,disableEnforceFocus:i=!1,disableRestoreFocus:l=!1,getTabbable:o=eW,isEnabled:s=eV,open:d}=e,c=a.useRef(!1),u=a.useRef(null),m=a.useRef(null),p=a.useRef(null),h=a.useRef(null),f=a.useRef(!1),g=a.useRef(null),v=(0,Q.default)(eL(n),g),b=a.useRef(null);a.useEffect(()=>{d&&g.current&&(f.current=!r)},[r,d]),a.useEffect(()=>{if(c.current=!1,!d||!g.current)return;let e=G(Y(g.current)),t=eU(g.current)??g.current;return!ep(g.current,e)&&(t.hasAttribute("tabIndex")||t.setAttribute("tabIndex","-1"),f.current&&t.focus()),()=>{!l&&p.current&&(c.current=!0,p.current.focus(),p.current=null)}},[d]),a.useEffect(()=>{if(!d||!g.current)return;let e=Y(g.current),t=t=>{if(b.current=t,i||!s()||"Tab"!==t.key)return;let a=g.current,n=G(e);if(null===a)return;let r=eU(a);if(n===a||n===r){let e=o(a);if(0===e.length)return;t.preventDefault(),t.shiftKey?e[e.length-1].focus():e[0].focus();return}if(ep(a,n)){let e=o(a),r=e.indexOf(n);if(-1===r||!e.some(e=>eH(e)>0))return;t.preventDefault();let i=0;i=t.shiftKey?r<=0?e.length-1:r-1:r===e.length-1?0:r+1,e[i].focus()}},a=()=>{let t=g.current;if(null===t)return;let a=G(e);if(!e.hasFocus()||!s()||c.current){c.current=!1;return}if(ep(t,a)||i&&a!==u.current&&a!==m.current)return;if(a!==h.current)h.current=null;else if(null!==h.current)return;if(!f.current)return;let n=[];if((a===u.current||a===m.current)&&(n=o(g.current)),n.length>0){let e=!!(b.current?.shiftKey&&b.current?.key==="Tab"),t=n[0],a=n[n.length-1];"string"!=typeof t&&"string"!=typeof a&&(e?a.focus():t.focus())}else t.focus()};e.addEventListener("focusin",a),e.addEventListener("keydown",t,!0);let n=setInterval(()=>{let t=G(e);t&&"BODY"===t.tagName&&a()},50);return()=>{clearInterval(n),e.removeEventListener("focusin",a),e.removeEventListener("keydown",t,!0)}},[r,i,l,s,d,o]);let x=e=>{null===p.current&&(p.current=e.relatedTarget),f.current=!0};return(0,t.jsxs)(a.Fragment,{children:[(0,t.jsx)("div",{tabIndex:d?0:-1,onFocus:x,ref:u,"data-testid":"sentinelStart"}),a.cloneElement(n,{ref:v,onFocus:e=>{null===p.current&&(p.current=e.relatedTarget),f.current=!0,h.current=e.target;let t=n.props.onFocus;t&&t(e)}}),(0,t.jsx)("div",{tabIndex:d?0:-1,onFocus:x,ref:m,"data-testid":"sentinelEnd"})]})};var eG=e.i(74080);let eY=a.forwardRef(function(e,t){let{children:n,container:r,disablePortal:i=!1}=e,[l,o]=a.useState(null),s=(0,Q.default)(a.isValidElement(n)?eL(n):null,t);return((0,J.default)(()=>{i||o(("function"==typeof r?r():r)||document.body)},[r,i]),(0,J.default)(()=>{if(l&&!i)return K(t,l),()=>{K(t,null)}},[t,l,i]),i)?a.isValidElement(n)?a.cloneElement(n,{ref:s}):n:l?eG.createPortal(n,l):l}),eK={entering:{opacity:1},entered:{opacity:1},exiting:{opacity:0},exited:{opacity:0}},eJ={opacity:0,visibility:"hidden"},eX=a.forwardRef(function(e,n){let r=(0,eM.useTheme)(),i={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},{addEndListener:l,appear:o=!0,children:s,disablePrefersReducedMotion:d=!1,easing:c,in:u,onEnter:m,onEntered:p,onEntering:h,onExit:f,onExited:g,onExiting:v,style:b,timeout:x=i,...y}=e,j=(0,eP.default)(r.motion.reducedMotion,d),w=a.useRef(null),N=(0,ev.default)(w,eL(s),n),k=(0,z.normalizedTransitionCallback)(w,h),E=(0,z.normalizedTransitionCallback)(w,(e,t)=>{j.shouldReduceMotion||(0,z.reflow)(e);let a=(0,z.getTransitionProps)({style:b,timeout:x,easing:c},{mode:"enter"}),n=j.getTransitionTiming({duration:a.duration,delay:a.delay});e.style.transition=r.transitions.create("opacity",{duration:n.duration,easing:a.easing,delay:n.delay}),m&&m(e,t)}),C=(0,z.normalizedTransitionCallback)(w,p),A=(0,z.normalizedTransitionCallback)(w,v),T=(0,z.normalizedTransitionCallback)(w,e=>{let t=(0,z.getTransitionProps)({style:b,timeout:x,easing:c},{mode:"exit"}),a=j.getTransitionTiming({duration:t.duration,delay:t.delay});e.style.transition=r.transitions.create("opacity",{duration:a.duration,easing:t.easing,delay:a.delay}),f&&f(e)}),S=(0,z.normalizedTransitionCallback)(w,e=>{e.style.transition="",g&&g(e)}),I=l?e=>{l(w.current,e)}:void 0;return(0,t.jsx)(eD,{appear:o,in:u,nodeRef:w,onEnter:E,onEntered:C,onEntering:k,onExit:T,onExited:S,onExiting:A,addEndListener:I,reduceMotion:j.shouldReduceMotion,timeout:x,...y,children:(e,{ownerState:t,...n})=>{let r=(0,z.getTransitionChildStyle)(e,u,eK,eJ,b,s.props.style);return a.cloneElement(s,{style:r,ref:N,...n})}})});function eQ(e){return(0,y.default)("MuiBackdrop",e)}(0,x.default)("MuiBackdrop",["root","invisible"]);let eZ=(0,v.styled)("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.root,a.invisible&&t.invisible]}})({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent",variants:[{props:{invisible:!0},style:{backgroundColor:"transparent"}}]}),e0=a.forwardRef(function(e,a){let n=(0,b.useDefaultProps)({props:e,name:"MuiBackdrop"}),{children:r,className:i,component:l="div",invisible:o=!1,open:s,slotProps:d={},slots:c={},transitionDuration:u,...m}=n,p={...n,component:l,invisible:o},f=(e=>{let{classes:t,invisible:a}=e;return(0,h.default)({root:["root",a&&"invisible"]},eQ,t)})(p),g={component:l,slots:c,slotProps:d},[v,x]=(0,N.default)("root",{elementType:eZ,externalForwardedProps:g,className:(0,L.default)(f.root,i),ownerState:p}),[y,j]=(0,N.default)("transition",{elementType:eX,externalForwardedProps:g,ownerState:p});return(0,t.jsx)(y,{in:s,timeout:u,...m,...j,children:(0,t.jsx)(v,{...x,ref:a,children:r})})});function e1(...e){return e.reduce((e,t)=>null==t?e:function(...a){e.apply(this,a),t.apply(this,a)},()=>{})}var e2=e.i(50193);function e5(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function e6(e){return parseFloat(ex(e).getComputedStyle(e).paddingRight)||0}function e4(e,t,a,n,r){let i=[t,a,...n];[].forEach.call(e.children,e=>{let t,a,n=!i.includes(e),l=(t=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].includes(e.tagName),a="INPUT"===e.tagName&&"hidden"===e.getAttribute("type"),!t&&!a);n&&l&&e5(e,r)})}function e8(e,t){let a=-1;return e.some((e,n)=>!!t(e)&&(a=n,!0)),a}let e3=()=>{},e7=new class{constructor(){this.modals=[],this.containers=[]}add(e,t){let a,n=this.modals.indexOf(e);if(-1!==n)return n;n=this.modals.length,this.modals.push(e),e.modalRef&&e5(e.modalRef,!1);let r=(a=[],[].forEach.call(t.children,e=>{"true"===e.getAttribute("aria-hidden")&&a.push(e)}),a);e4(t,e.mount,e.modalRef,r,!0);let i=e8(this.containers,e=>e.container===t);return -1!==i?this.containers[i].modals.push(e):this.containers.push({modals:[e],container:t,restore:null,hiddenSiblings:r}),n}mount(e,t){let a=e8(this.containers,t=>t.modals.includes(e)),n=this.containers[a];n.restore||(n.restore=function(e,t){let a=[],n=e.container;if(!t.disableScrollLock){let e,t;if((t=Y(n)).body===n?ex(n).innerWidth>t.documentElement.clientWidth:n.scrollHeight>n.clientHeight){let e=eh(ex(n));a.push({value:n.style.paddingRight,property:"padding-right",el:n}),n.style.paddingRight=`${e6(n)+e}px`;let t=Y(n).querySelectorAll(".mui-fixed");[].forEach.call(t,t=>{a.push({value:t.style.paddingRight,property:"padding-right",el:t}),t.style.paddingRight=`${e6(t)+e}px`})}if(n.parentNode instanceof DocumentFragment)e=Y(n).body;else{let t=n.parentElement,a=ex(n);e=t?.nodeName==="HTML"&&"scroll"===a.getComputedStyle(t).overflowY?t:n}a.push({value:e.style.overflow,property:"overflow",el:e},{value:e.style.overflowX,property:"overflow-x",el:e},{value:e.style.overflowY,property:"overflow-y",el:e}),e.style.overflow="hidden"}return()=>{a.forEach(({value:e,el:t,property:a})=>{e?t.style.setProperty(a,e):t.style.removeProperty(a)})}}(n,t))}remove(e,t=!0){let a=this.modals.indexOf(e);if(-1===a)return a;let n=e8(this.containers,t=>t.modals.includes(e)),r=this.containers[n];if(r.modals.splice(r.modals.indexOf(e),1),this.modals.splice(a,1),0===r.modals.length)r.restore&&r.restore(),e.modalRef&&e5(e.modalRef,t),e4(r.container,e.mount,e.modalRef,r.hiddenSiblings,!1),this.containers.splice(n,1);else{let e=r.modals[r.modals.length-1];e.modalRef&&e5(e.modalRef,!1)}return a}isTopModal(e){return this.modals.length>0&&this.modals[this.modals.length-1]===e}},e9=function(e){let{container:t,disableScrollLock:n=!1,closeAfterTransition:r=!1,onTransitionEnter:i,onTransitionExited:l,children:o,onClose:s,open:d,rootRef:c}=e,u=a.useRef({}),m=a.useRef(null),p=a.useRef(null),h=(0,Q.default)(p,c),[f,g]=a.useState(!d),v=!!o&&o.props.hasOwnProperty("in"),b=!0;("false"===e["aria-hidden"]||!1===e["aria-hidden"])&&(b=!1);let x=()=>(u.current.modalRef=p.current,u.current.mount=m.current,u.current),y=()=>{e7.mount(x(),{disableScrollLock:n}),p.current&&(p.current.scrollTop=0)},j=(0,X.default)(()=>{let e=("function"==typeof t?t():t)||Y(m.current).body;e7.add(x(),e),p.current&&y()}),w=()=>e7.isTopModal(x()),N=(0,X.default)(e=>{m.current=e,e&&(d&&w()?y():p.current&&e5(p.current,b))}),k=a.useCallback(()=>{e7.remove(x(),b)},[b]);return a.useEffect(()=>()=>{k()},[k]),a.useEffect(()=>{d?j():v&&r||k()},[d,k,v,r,j]),{getRootProps:(t={})=>{let a=(0,e2.default)(e);delete a.onTransitionEnter,delete a.onTransitionExited;let n={...a,...t};return{role:"presentation",...n,onKeyDown:e=>{n.onKeyDown?.(e),"Escape"===e.key&&229!==e.which&&w()&&(e.stopPropagation(),s&&s(e,"escapeKeyDown"))},ref:h}},getBackdropProps:(e={})=>({"aria-hidden":!0,...e,onClick:t=>{e.onClick?.(t),t.target===t.currentTarget&&s&&s(t,"backdropClick")},open:d}),getTransitionProps:()=>({onEnter:e1(()=>{g(!1),i&&i()},o?.props.onEnter??e3),onExited:e1(()=>{g(!0),l&&l(),r&&k()},o?.props.onExited??e3)}),rootRef:h,portalRef:N,isTopModal:w,exited:f,hasTransition:v}};function te(e){return(0,y.default)("MuiModal",e)}(0,x.default)("MuiModal",["root","hidden","backdrop"]);let tt=(0,v.styled)("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.root,!a.open&&a.exited&&t.hidden]}})((0,R.default)(({theme:e})=>({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0,variants:[{props:({ownerState:e})=>!e.open&&e.exited,style:{visibility:"hidden"}}]}))),ta=(0,v.styled)(e0,{name:"MuiModal",slot:"Backdrop"})({zIndex:-1}),tn=a.forwardRef(function(e,n){let r=(0,b.useDefaultProps)({name:"MuiModal",props:e}),{classes:i,className:l,closeAfterTransition:o=!1,children:s,container:d,component:c,disableAutoFocus:u=!1,disableEnforceFocus:m=!1,disablePortal:p=!1,disableRestoreFocus:f=!1,disableScrollLock:g=!1,hideBackdrop:v=!1,keepMounted:x=!1,onClose:y,onTransitionEnter:j,onTransitionExited:w,open:k,slotProps:E={},slots:C={},theme:A,...T}=r,S={...r,closeAfterTransition:o,disableAutoFocus:u,disableEnforceFocus:m,disablePortal:p,disableRestoreFocus:f,disableScrollLock:g,hideBackdrop:v,keepMounted:x},{getRootProps:I,getBackdropProps:_,getTransitionProps:R,portalRef:D,isTopModal:P,exited:M,hasTransition:O}=e9({...S,rootRef:n}),$={...S,exited:M},F=(e=>{let{open:t,exited:a,classes:n}=e;return(0,h.default)({root:["root",!t&&a&&"hidden"],backdrop:["backdrop"]},te,n)})($),z={};if(void 0===s.props.tabIndex&&(z.tabIndex="-1"),O){let{onEnter:e,onExited:t}=R();z.onEnter=e,z.onExited=t}let B={slots:C,slotProps:E},[U,H]=(0,N.default)("root",{ref:n,elementType:tt,externalForwardedProps:{...B,...T,component:c},getSlotProps:I,ownerState:$,className:(0,L.default)(l,F?.root,!$.open&&$.exited&&F?.hidden)}),[W,V]=(0,N.default)("backdrop",{elementType:ta,externalForwardedProps:B,shouldForwardComponentProp:!0,getSlotProps:e=>_({...e,onClick:t=>{e?.onClick&&e.onClick(t)}}),className:F?.backdrop,ownerState:$});return x||k||O&&!M?(0,t.jsx)(eY,{ref:D,container:d,disablePortal:p,children:(0,t.jsxs)(U,{...H,children:[v?null:(0,t.jsx)(W,{...V}),(0,t.jsx)(eq,{disableEnforceFocus:m,disableAutoFocus:u,disableRestoreFocus:f,isEnabled:P,open:k,children:a.cloneElement(s,z)})]})}):null});var tr=e.i(66052);function ti(e){return(0,y.default)("MuiPopover",e)}(0,x.default)("MuiPopover",["root","paper"]);var tl=e.i(92886);function to(e,t){let a=0;return"number"==typeof t?a=t:"center"===t?a=e.height/2:"bottom"===t&&(a=e.height),a}function ts(e,t){let a=0;return"number"==typeof t?a=t:"center"===t?a=e.width/2:"right"===t&&(a=e.width),a}function td(e){return[e.horizontal,e.vertical].map(e=>"number"==typeof e?`${e}px`:e).join(" ")}function tc(e){return"function"==typeof e?e():e}let tu=(0,v.styled)(tn,{name:"MuiPopover",slot:"Root"})({}),tm=(0,v.styled)(tr.default,{name:"MuiPopover",slot:"Paper"})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),tp=a.forwardRef(function(e,n){let r=(0,b.useDefaultProps)({props:e,name:"MuiPopover"}),{action:i,anchorEl:l,anchorOrigin:o={vertical:"top",horizontal:"left"},anchorPosition:s,anchorReference:d="anchorEl",children:c,className:u,container:m,disableAutoFocus:p=!1,elevation:f=8,marginThreshold:g=16,open:v,slots:x={},slotProps:y={},transformOrigin:j={vertical:"top",horizontal:"left"},transitionDuration:w="auto",disableScrollLock:k=!1,...E}=r,C=a.useRef(),A={...r,anchorOrigin:o,anchorReference:d,elevation:f,marginThreshold:g,transformOrigin:j,transitionDuration:w},T=(e=>{let{classes:t}=e;return(0,h.default)({root:["root"],paper:["paper"]},ti,t)})(A),S=a.useCallback(()=>{if("anchorPosition"===d)return s;let e=tc(l),t=(e&&1===e.nodeType?e:Y(C.current).body).getBoundingClientRect();return{top:t.top+to(t,o.vertical),left:t.left+ts(t,o.horizontal)}},[l,o.horizontal,o.vertical,s,d]),I=a.useCallback(e=>({vertical:to(e,j.vertical),horizontal:ts(e,j.horizontal)}),[j.horizontal,j.vertical]),_=a.useCallback(e=>{let t={width:e.offsetWidth,height:e.offsetHeight},a=I(t);if("none"===d)return{top:null,left:null,transformOrigin:td(a)};let n=S(),r=n.top-a.vertical,i=n.left-a.horizontal,o=r+t.height,s=i+t.width,c=ex(tc(l)),u=c.innerHeight-g,m=c.innerWidth-g;if(null!=g&&r<g){let e=r-g;r-=e,a.vertical+=e}else if(null!=g&&o>u){let e=o-u;r-=e,a.vertical+=e}if(null!=g&&i<g){let e=i-g;i-=e,a.horizontal+=e}else if(s>m){let e=s-m;i-=e,a.horizontal+=e}return{top:`${Math.round(r)}px`,left:`${Math.round(i)}px`,transformOrigin:td(a)}},[l,d,S,I,g]),[R,D]=a.useState(v),P=a.useCallback(()=>{let e=C.current;if(!e)return;let t=_(e);null!=t.top&&e.style.setProperty("top",t.top),null!=t.left&&(e.style.left=t.left),e.style.transformOrigin=t.transformOrigin,D(!0)},[_]);a.useEffect(()=>(k&&window.addEventListener("scroll",P),()=>window.removeEventListener("scroll",P)),[l,k,P]),a.useEffect(()=>{v&&P()}),a.useImperativeHandle(i,()=>v?{updatePosition:()=>{P()}}:null,[v,P]),a.useEffect(()=>{if(!v)return;let e=eI(()=>{P()}),t=ex(tc(l));return t.addEventListener("resize",e),()=>{e.clear(),t.removeEventListener("resize",e)}},[l,v,P]);let M=w,O={slots:x,slotProps:y},[$,F]=(0,N.default)("transition",{elementType:ez,externalForwardedProps:O,ownerState:A,getSlotProps:e=>({...e,onEntering:(t,a)=>{e.onEntering?.(t,a),P()},onExited:t=>{e.onExited?.(t),D(!1)}}),additionalProps:{appear:!0,in:v}});"auto"!==w||$.muiSupportAuto||(M=void 0);let z=m||(l?Y(tc(l)).body:void 0),[B,{slots:U,slotProps:H,...W}]=(0,N.default)("root",{ref:n,elementType:tu,externalForwardedProps:{...O,...E},shouldForwardComponentProp:!0,additionalProps:{slots:{backdrop:x.backdrop},slotProps:{backdrop:function(e,t){if(!e)return t;function a(e,t){let a={};return Object.keys(t).forEach(n=>{(0,tl.default)(n,t[n])&&"function"==typeof e[n]&&(a[n]=(...a)=>{e[n](...a),t[n](...a)})}),a}if("function"==typeof e||"function"==typeof t)return n=>{let r="function"==typeof t?t(n):t,i="function"==typeof e?e({...n,...r}):e,l=(0,L.default)(n?.className,r?.className,i?.className),o=a(i,r);return{...r,...i,...o,...!!l&&{className:l},...r?.style&&i?.style&&{style:{...r.style,...i.style}},...r?.sx&&i?.sx&&{sx:[...Array.isArray(r.sx)?r.sx:[r.sx],...Array.isArray(i.sx)?i.sx:[i.sx]]}}};let n=a(e,t),r=(0,L.default)(t?.className,e?.className);return{...t,...e,...n,...!!r&&{className:r},...t?.style&&e?.style&&{style:{...t.style,...e.style}},...t?.sx&&e?.sx&&{sx:[...Array.isArray(t.sx)?t.sx:[t.sx],...Array.isArray(e.sx)?e.sx:[e.sx]]}}}("function"==typeof y.backdrop?y.backdrop(A):y.backdrop,{invisible:!0})},container:z,open:v},ownerState:A,className:(0,L.default)(T.root,u)}),[V,q]=(0,N.default)("paper",{ref:C,className:T.paper,elementType:tm,externalForwardedProps:O,shouldForwardComponentProp:!0,additionalProps:{elevation:f,style:R?void 0:{opacity:0}},ownerState:A});return(0,t.jsx)(B,{...W,...!(0,eS.default)(B)&&{slots:U,slotProps:H,disableAutoFocus:p,disableScrollLock:k},children:(0,t.jsx)($,{...F,timeout:M,children:(0,t.jsx)(V,{...q,children:c})})})});var th=e.i(34997);function tf(e){return(0,y.default)("MuiMenu",e)}(0,x.default)("MuiMenu",["root","paper","list"]);let tg={vertical:"top",horizontal:"right"},tv={vertical:"top",horizontal:"left"},tb=(0,v.styled)(tp,{shouldForwardProp:e=>(0,th.default)(e)||"classes"===e,name:"MuiMenu",slot:"Root"})({}),tx=(0,v.styled)(tm,{name:"MuiMenu",slot:"Paper"})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),ty=(0,v.styled)(eT,{name:"MuiMenu",slot:"List"})({outline:0}),tj=a.forwardRef(function(e,n){let r=(0,b.useDefaultProps)({props:e,name:"MuiMenu"}),{autoFocus:i=!0,children:l,className:o,disableAutoFocusItem:s=!1,onClose:d,open:c,PopoverClasses:u,transitionDuration:m="auto",variant:p="selectedMenu",slots:f={},slotProps:g={},...v}=r,x=(0,W.useRtl)(),y={...r,autoFocus:i,disableAutoFocusItem:s,transitionDuration:m,variant:p},j=(e=>{let{classes:t}=e;return(0,h.default)({root:["root"],paper:["paper"],list:["list"]},tf,t)})(y),w=i&&c,k=w&&!s,E=a.useRef(null),C={slots:f,slotProps:g},A=(0,V.default)({elementType:f.root,externalSlotProps:g.root,ownerState:y,className:[j.root,o]}),[T,S]=(0,N.default)("paper",{className:j.paper,elementType:tx,externalForwardedProps:C,shouldForwardComponentProp:!0,ownerState:y}),[I,L]=(0,N.default)("list",{className:j.list,elementType:ty,shouldForwardComponentProp:!0,externalForwardedProps:C,getSlotProps:e=>({...e,onKeyDown:t=>{"Tab"===t.key&&(t.preventDefault(),d&&d(t,"tabKeyDown")),e.onKeyDown?.(t)}}),ownerState:y}),_="function"==typeof g.transition?g.transition(y):g.transition;return(0,t.jsx)(tb,{disableAutoFocus:i,onClose:d,anchorOrigin:{vertical:"bottom",horizontal:x?"right":"left"},transformOrigin:x?tg:tv,slots:{root:f.root,paper:T,backdrop:f.backdrop,transition:f.transition},slotProps:{root:A,paper:S,backdrop:"function"==typeof g.backdrop?g.backdrop(y):g.backdrop,transition:{..._,onEntering:(...e)=>{((e,t)=>{E.current&&(E.current.adjustStyleForScrollbar(e,{direction:x?"rtl":"ltr"}),w&&E.current.focusInitialTarget?.())})(...e),_?.onEntering?.(...e)}}},open:c,ref:n,transitionDuration:m,ownerState:y,...v,classes:u,children:(0,t.jsx)(I,{actions:E,autoFocus:w,autoFocusItem:k,variant:p,...L,children:l})})});var tw=e.i(59596);let tN=(0,x.default)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","vertical","withChildren","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);function tk(e){return(0,y.default)("MuiListItemIcon",e)}let tE=(0,x.default)("MuiListItemIcon",["root","alignItemsFlexStart"]);function tC(e){return(0,y.default)("MuiListItemText",e)}let tA=(0,x.default)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);function tT(e){return(0,y.default)("MuiMenuItem",e)}let tS=(0,x.default)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),tI=(0,v.styled)(P.default,{shouldForwardProp:e=>(0,th.default)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.root,a.dense&&t.dense,a.divider&&t.divider,!a.disableGutters&&t.gutters]}})((0,R.default)(({theme:e})=>({...e.typography.body1,display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap","&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${tS.selected}`]:{backgroundColor:e.alpha((e.vars||e).palette.primary.main,(e.vars||e).palette.action.selectedOpacity),[`&.${tS.focusVisible}`]:{backgroundColor:e.alpha((e.vars||e).palette.primary.main,`${(e.vars||e).palette.action.selectedOpacity} + ${(e.vars||e).palette.action.focusOpacity}`)}},[`&.${tS.selected}:hover`]:{backgroundColor:e.alpha((e.vars||e).palette.primary.main,`${(e.vars||e).palette.action.selectedOpacity} + ${(e.vars||e).palette.action.hoverOpacity}`),"@media (hover: none)":{backgroundColor:e.alpha((e.vars||e).palette.primary.main,(e.vars||e).palette.action.selectedOpacity)}},[`&.${tS.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${tS.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${tN.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${tN.inset}`]:{marginLeft:52},[`& .${tA.root}`]:{marginTop:0,marginBottom:0},[`& .${tA.inset}`]:{paddingLeft:36},[`& .${tE.root}`]:{minWidth:36},variants:[{props:({ownerState:e})=>!e.disableGutters,style:{paddingLeft:16,paddingRight:16}},{props:({ownerState:e})=>e.divider,style:{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"}},{props:({ownerState:e})=>!e.dense,style:{[e.breakpoints.up("sm")]:{minHeight:"auto"}}},{props:({ownerState:e})=>e.dense,style:{minHeight:32,paddingTop:4,paddingBottom:4,...e.typography.body2,[`& .${tE.root} svg`]:{fontSize:"1.25rem"}}}]}))),tL=a.forwardRef(function(e,n){let r,i=(0,b.useDefaultProps)({props:e,name:"MuiMenuItem"}),{autoFocus:l=!1,component:o="li",dense:s=!1,divider:d=!1,disableGutters:c=!1,focusVisibleClassName:u,role:m="menuitem",tabIndex:p,className:f,...g}=i,v=eE(),x=a.useContext(ey),y=a.useMemo(()=>({dense:s||x.dense||!1,disableGutters:c}),[x.dense,s,c]),j=function(){let e=a.useContext(eC);if(void 0===e)throw Error("MUI: MenuListContext is missing. MenuItems must be placed within Menu or MenuList.");return e}(),w=(0,tw.default)(),N=j.suppressInitialFocusVisible,k=j.itemsFocusableWhenDisabled,E=a.useRef(null);eb(()=>{l&&E.current&&ef(E.current,v)},[l]);let C={...i,dense:y.dense,divider:d,disableGutters:c},A=(e=>{let{disabled:t,dense:a,divider:n,disableGutters:r,selected:i,classes:l}=e,o=(0,h.default)({root:["root",a&&"dense",t&&"disabled",!r&&"gutters",n&&"divider",i&&"selected"]},tT,l);return{...l,...o}})(i),{root:T,...S}=A,I=function(e){let{activeItemId:t,registerItem:n,unregisterItem:r}=function(){let e=a.useContext(Z);if(void 0===e)throw Error("MUI: RovingTabIndexContext is missing. Roving tab index items must be placed within a roving tab index provider.");return e}(),i=a.useRef(null),l=a.useMemo(()=>({disabled:e.disabled??!1,element:null,focusableWhenDisabled:e.focusableWhenDisabled??!1,id:e.id,selected:e.selected??!1,textValue:e.textValue}),[e.disabled,e.focusableWhenDisabled,e.id,e.selected,e.textValue]),o=a.useRef(l);o.current=l;let s=a.useCallback(t=>{(i.current=t,null==t)?queueMicrotask(()=>{null==i.current&&r(e.id)}):n({...o.current,element:t})},[e.id,n,r]),d=(0,Q.default)(e.ref,s);return(0,J.default)(()=>{i.current&&n({...l,element:i.current})},[l,n]),(0,J.default)(()=>{let t=e.id;return()=>{r(t)}},[e.id,r]),{ref:d,tabIndex:t===e.id?0:-1}}({id:w,ref:n,disabled:i.disabled,focusableWhenDisabled:k,selected:i.selected}),_=(0,ev.default)(E,I.ref);return void 0!==p?r=p:"selectedMenu"===j.variant?r=I.tabIndex:(!i.disabled||k)&&(r=-1),(0,t.jsx)(ey.Provider,{value:y,children:(0,t.jsx)(tI,{ref:_,role:m,tabIndex:r,component:o,internalNativeButton:!1,focusableWhenDisabled:k,suppressFocusVisible:N,focusVisibleClassName:(0,L.default)(A.focusVisible,u),className:(0,L.default)(A.root,f),...g,ownerState:C,classes:S})})}),t_=(0,v.styled)("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[t.root,"flex-start"===a.alignItems&&t.alignItemsFlexStart]}})((0,R.default)(({theme:e})=>({minWidth:e.spacing(4.5),color:(e.vars||e).palette.action.active,flexShrink:0,display:"inline-flex",variants:[{props:{alignItems:"flex-start"},style:{marginTop:8}}]}))),tR=a.forwardRef(function(e,n){let r=(0,b.useDefaultProps)({props:e,name:"MuiListItemIcon"}),{className:i,...l}=r,o=a.useContext(ey),s={...r,alignItems:o.alignItems},d=(e=>{let{alignItems:t,classes:a}=e;return(0,h.default)({root:["root","flex-start"===t&&"alignItemsFlexStart"]},tk,a)})(s);return(0,t.jsx)(t_,{className:(0,L.default)(d.root,i),ownerState:s,ref:n,...l})});var g=g;let tD=(0,v.styled)("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:a}=e;return[{[`& .${tA.primary}`]:t.primary},{[`& .${tA.secondary}`]:t.secondary},t.root,a.inset&&t.inset,a.primary&&a.secondary&&t.multiline,a.dense&&t.dense]}})({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4,[`.${g.default.root}:where(& .${tA.primary})`]:{display:"block"},[`.${g.default.root}:where(& .${tA.secondary})`]:{display:"block"},variants:[{props:({ownerState:e})=>e.primary&&e.secondary,style:{marginTop:6,marginBottom:6}},{props:({ownerState:e})=>e.inset,style:{paddingLeft:56}}]}),tP=a.forwardRef(function(e,n){let r=(0,b.useDefaultProps)({props:e,name:"MuiListItemText"}),{children:i,className:l,disableTypography:o=!1,inset:s=!1,primary:d,secondary:c,slots:u={},slotProps:m={},...p}=r,{dense:g}=a.useContext(ey),v=null!=d?d:i,x=c,y={...r,disableTypography:o,inset:s,primary:!!v,secondary:!!x,dense:g},j=(e=>{let{classes:t,inset:a,primary:n,secondary:r,dense:i}=e;return(0,h.default)({root:["root",a&&"inset",i&&"dense",n&&r&&"multiline"],primary:["primary"],secondary:["secondary"]},tC,t)})(y),w={slots:u,slotProps:m},[k,E]=(0,N.default)("root",{className:(0,L.default)(j.root,l),elementType:tD,externalForwardedProps:{...w,...p},ownerState:y,ref:n}),[C,A]=(0,N.default)("primary",{className:j.primary,elementType:f.default,externalForwardedProps:w,ownerState:y}),[T,S]=(0,N.default)("secondary",{className:j.secondary,elementType:f.default,externalForwardedProps:w,ownerState:y});return null==v||v.type===f.default||o||(v=(0,t.jsx)(C,{variant:g?"body2":"body1",component:A?.variant?void 0:"span",...A,children:v})),null==x||x.type===f.default||o||(x=(0,t.jsx)(T,{variant:"body2",color:"textSecondary",...S,children:x})),(0,t.jsxs)(k,{...E,children:[v,x]})});var tM=e.i(5573),tO=e.i(36729);let t$={height:"100%",display:"flex",flexDirection:"column",boxShadow:"0 12px 48px rgba(15, 23, 42, 0.1)",border:"1px solid rgba(15, 23, 42, 0.06)",transition:"transform 0.3s ease, box-shadow 0.3s ease","&:hover":{transform:"translateY(-4px)",boxShadow:"0 24px 64px rgba(37, 99, 235, 0.15)"}};function tF(){return(0,t.jsxs)("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":!0,children:[(0,t.jsx)("circle",{cx:"12",cy:"5",r:"2"}),(0,t.jsx)("circle",{cx:"12",cy:"12",r:"2"}),(0,t.jsx)("circle",{cx:"12",cy:"19",r:"2"})]})}function tz(){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,children:[(0,t.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,t.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}function tB(){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,children:[(0,t.jsx)("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M10 11v6M14 11v6",strokeLinecap:"round"})]})}function tU(e){let{name:n,categoryName:r,description:i,photoSrc:l,approved:o,disabled:s,onEdit:c,onDelete:u,onApprovedChange:m}=e,[h,g]=a.default.useState(null),v=!!h,b=n.slice(0,2).toUpperCase(),x=()=>g(null);return(0,t.jsxs)(p.default,{sx:t$,children:[(0,t.jsx)(T,{title:n,subheader:r,slotProps:{title:{sx:{fontWeight:800,fontSize:"1rem",lineHeight:1.3,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}},subheader:{sx:{fontSize:"0.8rem"}}},action:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(H,{"aria-label":`Actions for ${n}`,"aria-haspopup":"true","aria-expanded":v?"true":void 0,onClick:e=>g(e.currentTarget),size:"small",children:(0,t.jsx)(tF,{})}),(0,t.jsxs)(tj,{anchorEl:h,open:v,onClose:x,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:[(0,t.jsxs)(tL,{onClick:()=>{x(),c()},children:[(0,t.jsx)(tR,{children:(0,t.jsx)(tz,{})}),(0,t.jsx)(tP,{children:"Edit nominee"})]}),(0,t.jsxs)(tL,{onClick:()=>{x(),u()},disabled:s,sx:{color:"error.main"},children:[(0,t.jsx)(tR,{sx:{color:"error.main"},children:(0,t.jsx)(tB,{})}),(0,t.jsx)(tP,{children:"Delete nominee"})]})]})]}),sx:{alignItems:"flex-start","& .MuiCardHeader-action":{m:0}}}),l?(0,t.jsx)(S.default,{component:"img",height:"160",image:l,alt:"",sx:{objectFit:"cover"}}):(0,t.jsx)(tO.default,{sx:{height:160,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,fontWeight:800,color:"rgba(37, 99, 235, 0.35)",background:"radial-gradient(circle at 30% 30%, rgba(37, 99, 235, 0.12), transparent 50%), radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.1), transparent 45%), #fff"},"aria-hidden":!0,children:b}),(0,t.jsxs)(I.default,{sx:{flex:1,pt:1.5,pb:2},children:[(0,t.jsx)(f.default,{variant:"body2",sx:{color:"text.secondary",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden",minHeight:"3.6em"},children:i?.trim()||"No description"}),(0,t.jsxs)(tO.default,{sx:{display:"flex",alignItems:"center",gap:1.25,mt:1.5,flexWrap:"wrap"},children:[(0,t.jsx)(tM.default,{label:o?"Approved":"Pending",size:"small",color:o?"success":"warning",variant:"outlined"}),(0,t.jsxs)("label",{className:d.default.adminApproveSwitch,title:o?"Unapprove nominee":"Approve nominee",style:{margin:0},children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:o,disabled:s,onChange:e=>m(e.target.checked),"aria-label":o?`Unapprove ${n}`:`Approve ${n}`}),(0,t.jsx)("span",{className:d.default.adminApproveTrack,"aria-hidden":!0})]})]})]})]})}function tH(e){return!0===e.show_nominee||1===e.show_nominee}function tW(e){return!0===e.declare_result||1===e.declare_result}function tV(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,t.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}function tq(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M10 11v6M14 11v6",strokeLinecap:"round"})]})}let tG=()=>({name:"",photo:"",description:"",category_id:0});function tY(e){let n,r,{mode:l,eventId:u,eventTitle:p,apiBase:h,apiOrigin:f,token:g,onBack:v,onGoList:b,onGoCategories:x,onEventDeclareResultChange:y}=e,[j,w]=a.default.useState([]),[N,k]=a.default.useState([]),[E,C]=a.default.useState(!1),[A,T]=a.default.useState(null),[S,I]=a.default.useState(null),[L,_]=a.default.useState(""),[R,D]=a.default.useState(null),[P,M]=a.default.useState(tG),[O,$]=a.default.useState("all"),[F,z]=a.default.useState(""),[B,U]=a.default.useState(null),[H,W]=a.default.useState(!1),[V,q]=a.default.useState(null),[G,Y]=a.default.useState(null),K=a.default.useMemo(()=>{let e=new Map;for(let t of j)e.set(t.category_id,t);return e},[j]),J=a.default.useCallback(async()=>{C(!0),T(null);try{let e=(0,i.adminAuthHeader)(g),[t,a]=await Promise.all([fetch(`${h}/categories?eventId=${u}`),fetch(`${h}/nominees?eventId=${u}`,{headers:{...e}})]),n=await t.json().catch(()=>null),r=await a.json().catch(()=>null);if(!t.ok)throw Error(n?.error||"CATEGORIES_FAILED");if(!a.ok)throw Error(r?.error||"NOMINEES_FAILED");let l=Array.isArray(n?.categories)?n.categories:[],o=l.some(e=>e?.event_id!=null&&Number.isFinite(Number(e.event_id)))?l.filter(e=>Number(e?.event_id)===u):l;w(o),k(Array.isArray(r?.nominees)?r.nominees:[])}catch(e){T(e instanceof Error?e.message:"ADMIN_LOAD_FAILED")}finally{C(!1)}},[u,h,g]);a.default.useEffect(()=>{J()},[J]);let X=a.default.useMemo(()=>{let e=F.trim().toLowerCase();return N.filter(t=>{if("all"!==O&&Number(t.category_id)!==O)return!1;if(!e)return!0;let a=(K.get(Number(t.category_id))?.name||"").toLowerCase(),n=(t.name||"").toLowerCase(),r=(t.description||"").toLowerCase();return n.includes(e)||r.includes(e)||a.includes(e)}).slice().sort((e,t)=>Number(e.category_id)-Number(t.category_id)||Number(e.nominee_id)-Number(t.nominee_id))},[N,O,F,K]),Q=a.default.useCallback(()=>{U(e=>(e&&URL.revokeObjectURL(e),null))},[]);function Z(){I(null),_("")}function ee(){Q(),D(null),M(tG())}async function et(){let e=L.trim();if(e){C(!0),T(null);try{if(S?.mode==="add"){let t=await fetch(`${h}/admin/categories`,{method:"POST",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(g)},body:JSON.stringify({name:e,eventId:u})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"CREATE_CATEGORY_FAILED")}else if(S?.mode==="edit"){let t=await fetch(`${h}/admin/categories/${S.categoryId}?eventId=${u}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(g)},body:JSON.stringify({name:e})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"UPDATE_CATEGORY_FAILED")}Z(),await J()}catch(e){T(e instanceof Error?e.message:"SAVE_CATEGORY_FAILED")}finally{C(!1)}}}async function ea(e,t){let a=t.trim()||"this category";if(window.confirm(`Delete "${a}" and all its nominees? This cannot be undone.`)){C(!0),T(null);try{let t=await fetch(`${h}/admin/categories/${e}?eventId=${u}`,{method:"DELETE",headers:{...(0,i.adminAuthHeader)(g)}}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"DELETE_CATEGORY_FAILED");S?.mode==="edit"&&S.categoryId===e&&Z(),await J()}catch(e){T(e instanceof Error?e.message:"DELETE_CATEGORY_FAILED")}finally{C(!1)}}}async function en(){let e=P.name.trim();if(e&&P.category_id){C(!0),T(null);try{if(R?.mode==="add"){let t=await fetch(`${h}/admin/nominees?eventId=${u}`,{method:"POST",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(g)},body:JSON.stringify({name:e,photo:P.photo.trim(),description:P.description.trim()||void 0,category_id:P.category_id})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"SAVE_NOMINEE_FAILED")}else if(R?.mode==="edit"){let t=await fetch(`${h}/admin/nominees/${R.nomineeId}?eventId=${u}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(g)},body:JSON.stringify({name:e,photo:P.photo.trim(),description:P.description.trim()||null,category_id:P.category_id})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"SAVE_NOMINEE_FAILED")}ee(),await J()}catch(e){T(e instanceof Error?e.message:"SAVE_NOMINEE_FAILED")}finally{C(!1)}}}async function er(e,t){let a=t.trim()||"this nominee";if(window.confirm(`Delete "${a}"? Votes for this nominee will be removed.`)){C(!0),T(null);try{let t=await fetch(`${h}/admin/nominees/${e}?eventId=${u}`,{method:"DELETE",headers:{...(0,i.adminAuthHeader)(g)}}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.error||"DELETE_NOMINEE_FAILED");R?.mode==="edit"&&R.nomineeId===e&&ee(),await J()}catch(e){T(e instanceof Error?e.message:"DELETE_NOMINEE_FAILED")}finally{C(!1)}}}async function ei(e,t){q(e.category_id),T(null);try{let a=await fetch(`${h}/admin/categories/${e.category_id}?eventId=${u}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(g)},body:JSON.stringify({show_nominee:+!!t})}),n=await a.json().catch(()=>null);if(!a.ok)throw Error(n?.error||"UPDATE_CATEGORY_FAILED");w(a=>a.map(a=>a.category_id===e.category_id?{...a,show_nominee:+!!t}:a))}catch(e){T(e instanceof Error?e.message:"UPDATE_CATEGORY_FAILED")}finally{q(null)}}async function el(e,t){Y(e.category_id),T(null);try{let a=await fetch(`${h}/admin/categories/${e.category_id}?eventId=${u}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(g)},body:JSON.stringify({declare_result:+!!t})}),n=await a.json().catch(()=>null);if(!a.ok)throw Error(n?.error||"UPDATE_CATEGORY_FAILED");let r=n?.category;w(a=>a.map(a=>a.category_id===e.category_id?r?{...a,...r}:{...a,declare_result:+!!t,winner_nominee_id:t?a.winner_nominee_id:null}:a)),t||y?.(!1)}catch(e){T(e instanceof Error?e.message:"UPDATE_CATEGORY_FAILED")}finally{Y(null)}}async function eo(e,t){C(!0),T(null);try{let a=await fetch(`${h}/admin/nominees/${e.nominee_id}?eventId=${u}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(g)},body:JSON.stringify({is_approved:+!!t})}),n=await a.json().catch(()=>null);if(!a.ok)throw Error(n?.error||"APPROVAL_UPDATE_FAILED");await J()}catch(e){T(e instanceof Error?e.message:"APPROVAL_UPDATE_FAILED")}finally{C(!1)}}async function es(e){W(!0),T(null);try{let t=await (0,s.uploadAwardsPhoto)(e,h,g);Q(),M(e=>({...e,photo:t}))}catch(e){T(e instanceof Error?e.message:"PHOTO_UPLOAD_FAILED")}finally{W(!1)}}a.default.useEffect(()=>()=>Q(),[Q]);let ed=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Category *"}),(0,t.jsx)("select",{className:"input",value:P.category_id||"",onChange:e=>M(t=>({...t,category_id:Number(e.target.value)})),disabled:E||0===j.length,required:!0,children:0===j.length?(0,t.jsx)("option",{value:"",children:"No categories — add one first"}):j.map(e=>(0,t.jsx)("option",{value:e.category_id,children:e.name},e.category_id))})]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Name *"}),(0,t.jsx)("input",{className:"input",value:P.name,onChange:e=>M(t=>({...t,name:e.target.value})),placeholder:"Nominee name",disabled:E})]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Photo"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",onChange:e=>{let t=e.currentTarget.files?.[0];t&&(U(e=>(e&&URL.revokeObjectURL(e),URL.createObjectURL(t))),es(t))},disabled:E||H}),H?(0,t.jsx)("p",{className:"hint",style:{marginTop:8},children:"Uploading…"}):null,(n=P.photo.trim()?(0,o.resolveNomineePhotoUrl)(f,P.photo):"",(r=B||n)?(0,t.jsx)("div",{style:{marginTop:10},children:(0,t.jsx)("img",{className:d.default.previewPhoto,src:r,alt:""})}):null)]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Description (optional)"}),(0,t.jsx)("textarea",{className:"input",value:P.description,onChange:e=>M(t=>({...t,description:e.target.value})),placeholder:"Short description",style:{minHeight:88,resize:"vertical"},disabled:E})]})]});return(0,t.jsxs)("div",{className:"panel",style:{marginBottom:"2rem"},children:[(0,t.jsx)("div",{className:"back-row",style:{marginBottom:"1rem"},children:(0,t.jsx)(c.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:b??v},{label:p,onClick:v},{label:"categories"===l?"Categories":"Nominees"}]})}),(0,t.jsxs)("div",{className:d.default.adminCatToolbar,style:{marginBottom:14},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"panel-title",style:{marginBottom:4},children:"categories"===l?"Categories":"Nominees"}),(0,t.jsx)("p",{style:{fontSize:13,color:"var(--text-muted)",margin:0},children:p})]}),(0,t.jsx)("span",{style:{fontSize:13,color:"var(--text-faint)"},children:E?"Loading…":"categories"===l?`${j.length} categories`:`${X.length}${"all"!==O||F.trim()?` of ${N.length}`:""} nominees`})]}),A?(0,t.jsx)("div",{className:"error-box",style:{marginBottom:12},children:A}):null,"categories"===l?(0,t.jsxs)("div",{className:d.default.adminCategoriesBlock,style:{marginTop:0},children:[(0,t.jsxs)("div",{className:d.default.adminCatToolbar,children:[(0,t.jsx)("span",{className:"section-title",style:{marginBottom:0,fontSize:13,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--text-muted)"},children:"All categories"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:function(){_(""),I({mode:"add"})},disabled:E,children:"Add category"})]}),0!==j.length||E?null:(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"1rem 0"},children:"No categories yet — use Add category."}),(0,t.jsx)("div",{className:d.default.adminCategoryList,children:j.map(e=>(0,t.jsx)("div",{className:d.default.adminCategoryRow,children:(0,t.jsxs)("div",{className:d.default.adminCategoryRowMain,children:[(0,t.jsxs)("div",{className:d.default.adminRowIconGroup,children:[(0,t.jsx)("button",{type:"button",className:d.default.adminIconBtnNeutral,onClick:()=>{_(e.name||""),I({mode:"edit",categoryId:e.category_id})},"aria-label":"Edit category",title:"Edit category",children:(0,t.jsx)(tV,{})}),(0,t.jsx)("button",{type:"button",className:d.default.adminIconBtnDanger,onClick:()=>void ea(e.category_id,e.name),disabled:E,"aria-label":`Delete ${e.name}`,title:"Delete category",children:(0,t.jsx)(tq,{})})]}),(0,t.jsxs)("div",{className:d.default.adminCategoryTitleWrap,children:[(0,t.jsx)("span",{style:{fontSize:15,fontWeight:600,whiteSpace:"normal"},children:e.name}),e.winner_nominee_id?(0,t.jsx)("span",{className:"event-badge badge-public",style:{marginLeft:8},children:"Winner set"}):null]}),(0,t.jsxs)("label",{className:d.default.adminApproveSwitch,title:tH(e)?"Nominees visible on screen":"Nominees hidden on screen",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:tH(e),disabled:V===e.category_id||E,onChange:t=>void ei(e,t.target.checked),"aria-label":tH(e)?"Hide nominees on screen":"Show nominees on screen"}),(0,t.jsx)("span",{className:d.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:"Show nominee"})]}),(0,t.jsxs)("label",{className:d.default.adminApproveSwitch,title:tW(e)?"Result declared":"Result not declared",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:tW(e),disabled:G===e.category_id||E,onChange:t=>void el(e,t.target.checked),"aria-label":tW(e)?"Undeclare category result":"Declare category result"}),(0,t.jsx)("span",{className:d.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:"Declare result"})]})]})},e.category_id))})]}):(0,t.jsx)("div",{className:d.default.adminCategoriesBlock,style:{marginTop:0},children:0!==j.length||E?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:d.default.adminNomineeToolbar,children:[(0,t.jsx)("input",{className:`input ${d.default.adminNomineeToolbarSearch}`,type:"search",placeholder:"Search nominees…",value:F,onChange:e=>z(e.target.value),"aria-label":"Search nominees"}),(0,t.jsxs)("select",{className:`input ${d.default.adminNomineeToolbarSelect}`,value:"all"===O?"all":String(O),onChange:e=>{let t=e.target.value;$("all"===t?"all":Number(t))},"aria-label":"Filter by category",children:[(0,t.jsx)("option",{value:"all",children:"All categories"}),j.map(e=>(0,t.jsx)("option",{value:e.category_id,children:e.name},e.category_id))]}),(0,t.jsx)("button",{type:"button",className:`btn ${d.default.adminNomineeToolbarAdd}`,onClick:function(){Q();let e="all"!==O&&j.some(e=>e.category_id===O)?O:j[0]?.category_id??0;M({...tG(),category_id:e}),D({mode:"add"})},disabled:E,children:"Add nominee"})]}),0!==X.length||E?(0,t.jsx)(tO.default,{sx:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:2},children:X.map(e=>{let a=(0,o.resolveNomineePhotoUrl)(f,e.photo),n=K.get(Number(e.category_id))?.name||"Category",r=!0===e.is_approved||1===e.is_approved;return(0,t.jsx)(tU,{name:e.name,categoryName:n,description:e.description,photoSrc:a,approved:r,disabled:E,onEdit:()=>{Q(),M({name:e.name||"",photo:e.photo||"",description:e.description||"",category_id:Number(e.category_id)}),D({mode:"edit",nomineeId:e.nominee_id})},onDelete:()=>void er(e.nominee_id,e.name),onApprovedChange:t=>void eo(e,t)},e.nominee_id)})}):(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"1rem 0"},children:0===N.length?"No nominees yet — use Add nominee.":"No nominees match your search or filter."})]}):(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"0.5rem 0 1rem"},children:"Add categories first, then add nominees."}),x?(0,t.jsx)("button",{type:"button",className:"btn",onClick:x,children:"Go to categories"}):null]})}),S?(0,t.jsx)(m,{title:"add"===S.mode?"Add category":"Edit category",onClose:Z,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:Z,disabled:E,children:"Cancel"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:()=>void et(),disabled:E||!L.trim(),children:"add"===S.mode?"Add category":"Save changes"})]}),children:(0,t.jsxs)("div",{className:"field",style:{marginBottom:0},children:[(0,t.jsx)("div",{className:"label",children:"Category name *"}),(0,t.jsx)("input",{className:"input",value:L,onChange:e=>_(e.target.value),placeholder:"Category name",disabled:E,onKeyDown:e=>{"Enter"===e.key&&et()}})]})}):null,R?(0,t.jsx)(m,{wide:!0,title:"add"===R.mode?"Add nominee":"Edit nominee",onClose:ee,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:ee,disabled:E,children:"Cancel"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:()=>void en(),disabled:E||!P.name.trim()||!P.category_id,children:"add"===R.mode?"Add nominee":"Save changes"})]}),children:ed}):null]})}function tK(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,t.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}function tJ(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M10 11v6M14 11v6",strokeLinecap:"round"})]})}function tX(e){let{eventId:n,eventTitle:r,apiBase:l,token:o,onBack:s,onGoList:u}=e,[p,h]=a.default.useState([]),[f,g]=a.default.useState(!1),[v,b]=a.default.useState(!1),[x,y]=a.default.useState(null),[j,w]=a.default.useState(null),[N,k]=a.default.useState(""),[E,C]=a.default.useState(null),[A,T]=a.default.useState(""),[S,I]=a.default.useState(""),L=a.default.useRef(null),_=a.default.useCallback(async()=>{g(!0),y(null);try{let e=await fetch(`${l}/admin/events/${n}/allowed-mobiles`,{headers:{...(0,i.adminAuthHeader)(o)}}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"LOAD_FAILED");h(Array.isArray(t?.allowed_mobiles)?t.allowed_mobiles:[])}catch(e){y(e instanceof Error?e.message:"LOAD_FAILED")}finally{g(!1)}},[l,n,o]);a.default.useEffect(()=>{_()},[_]);let R=a.default.useMemo(()=>{let e=N.trim().toLowerCase();return e?p.filter(t=>{let a=(t.mobile||"").toLowerCase(),n=(t.note||"").toLowerCase();return a.includes(e)||n.includes(e)}):p},[p,N]);function D(){C(null),T(""),I("")}async function P(){let e=A.trim();if(e){g(!0),y(null),w(null);try{if(E?.mode==="add"){let t=await fetch(`${l}/admin/events/${n}/allowed-mobiles`,{method:"POST",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(o)},body:JSON.stringify({mobile:e,note:S.trim()||null})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.message||a?.error||"CREATE_FAILED")}else if(E?.mode==="edit"){let t=await fetch(`${l}/admin/events/${n}/allowed-mobiles/${E.id}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(o)},body:JSON.stringify({mobile:e,note:S.trim()||null})}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.message||a?.error||"UPDATE_FAILED")}D(),await _()}catch(e){y(e instanceof Error?e.message:"SAVE_FAILED")}finally{g(!1)}}}async function M(e){let t=e.mobile||"this number";if(window.confirm(`Remove ${t} from the allowlist?`)){g(!0),y(null),w(null);try{let t=await fetch(`${l}/admin/events/${n}/allowed-mobiles/${e.id}`,{method:"DELETE",headers:{...(0,i.adminAuthHeader)(o)}}),a=await t.json().catch(()=>null);if(!t.ok)throw Error(a?.message||a?.error||"DELETE_FAILED");E?.mode==="edit"&&E.id===e.id&&D(),await _()}catch(e){y(e instanceof Error?e.message:"DELETE_FAILED")}finally{g(!1)}}}async function O(e){b(!0),y(null),w(null);try{let t=new FormData;t.append("file",e);let a=await fetch(`${l}/admin/events/${n}/allowed-mobiles/upload`,{method:"POST",headers:{...(0,i.adminAuthHeader)(o)},body:t}),r=await a.json().catch(()=>null);if(!a.ok)throw Error(r?.message||r?.error||"UPLOAD_FAILED");let s=Number(r?.inserted??0),d=Number(r?.skipped??0),c=Number(r?.invalid??0);w(`Import done: ${s} added, ${d} skipped, ${c} invalid.`),await _()}catch(e){y(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{b(!1),L.current&&(L.current.value="")}}return(0,t.jsxs)("div",{className:"panel",style:{marginBottom:"2rem"},children:[(0,t.jsx)("div",{className:"back-row",style:{marginBottom:"1rem"},children:(0,t.jsx)(c.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:u??s},{label:r,onClick:s},{label:"Allowed mobiles"}]})}),(0,t.jsxs)("div",{className:d.default.adminCatToolbar,style:{marginBottom:14},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"panel-title",style:{marginBottom:4},children:"Allowed mobiles"}),(0,t.jsxs)("p",{style:{fontSize:13,color:"var(--text-muted)",margin:0},children:[r," — invite-only registration"]})]}),(0,t.jsx)("span",{style:{fontSize:13,color:"var(--text-faint)"},children:f?"Loading…":`${R.length}${N.trim()?` of ${p.length}`:""} numbers`})]}),(0,t.jsx)("p",{className:"hint",style:{marginBottom:12},children:"Only these mobile numbers can register for this private event. Upload Excel or CSV (mobile in column A, optional note in column B) or add numbers manually."}),x?(0,t.jsx)("div",{className:"error-box",style:{marginBottom:12},children:x}):null,j?(0,t.jsx)("p",{className:"hint",style:{marginBottom:12,color:"var(--success)",border:"1px solid rgba(5,150,105,0.25)",borderRadius:8,padding:"10px 12px",background:"rgba(5,150,105,0.08)"},children:j}):null,(0,t.jsxs)("div",{className:d.default.adminNomineeToolbar,style:{marginBottom:14},children:[(0,t.jsx)("input",{className:`input ${d.default.adminNomineeToolbarSearch}`,type:"search",placeholder:"Search mobile or note…",value:N,onChange:e=>k(e.target.value),"aria-label":"Search allowed mobiles"}),(0,t.jsx)("input",{ref:L,type:"file",accept:".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv",style:{display:"none"},onChange:e=>{let t=e.target.files?.[0];t&&O(t)}}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",disabled:f||v,onClick:()=>L.current?.click(),children:v?"Importing…":"Import Excel/CSV"}),(0,t.jsx)("button",{type:"button",className:`btn ${d.default.adminNomineeToolbarAdd}`,onClick:function(){T(""),I(""),C({mode:"add"})},disabled:f||v,children:"Add mobile"})]}),0!==R.length||f?(0,t.jsx)("div",{className:d.default.adminCategoryList,children:R.map(e=>(0,t.jsx)("div",{className:d.default.adminCategoryRow,children:(0,t.jsxs)("div",{className:d.default.adminCategoryRowMain,children:[(0,t.jsxs)("div",{className:d.default.adminRowIconGroup,children:[(0,t.jsx)("button",{type:"button",className:d.default.adminIconBtnNeutral,onClick:()=>{T(e.mobile||""),I(e.note||""),C({mode:"edit",id:e.id})},"aria-label":"Edit mobile",title:"Edit",children:(0,t.jsx)(tK,{})}),(0,t.jsx)("button",{type:"button",className:d.default.adminIconBtnDanger,onClick:()=>void M(e),disabled:f,"aria-label":`Remove ${e.mobile}`,title:"Remove",children:(0,t.jsx)(tJ,{})})]}),(0,t.jsxs)("div",{className:d.default.adminCategoryTitleWrap,children:[(0,t.jsx)("span",{style:{fontSize:15,fontWeight:600},children:e.mobile}),e.note?(0,t.jsx)("span",{style:{fontSize:13,color:"var(--text-muted)",marginLeft:10},children:e.note}):null]}),e.created_at?(0,t.jsx)("span",{style:{fontSize:12,color:"var(--text-faint)",whiteSpace:"nowrap"},children:function(e){if(!e)return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleString()}(e.created_at)}):null]})},e.id))}):(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"1rem 0"},children:0===p.length?"No allowed mobiles yet — import a spreadsheet or add manually.":"No numbers match your search."}),E?(0,t.jsxs)(m,{title:"add"===E.mode?"Add allowed mobile":"Edit allowed mobile",onClose:D,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",disabled:f,onClick:D,children:"Cancel"}),(0,t.jsx)("button",{type:"button",className:"btn",disabled:f||!A.trim(),onClick:()=>void P(),children:f?"Saving…":"Save"})]}),children:[(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("label",{className:"label",htmlFor:"allowed-mobile-input",children:"Mobile"}),(0,t.jsx)("input",{id:"allowed-mobile-input",className:"input",type:"tel",inputMode:"numeric",autoComplete:"tel",placeholder:"10-digit mobile",value:A,onChange:e=>T(e.target.value),disabled:f})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{className:"label",htmlFor:"allowed-mobile-note",children:"Note (optional)"}),(0,t.jsx)("input",{id:"allowed-mobile-note",className:"input",type:"text",placeholder:"Name or reference",value:S,onChange:e=>I(e.target.value),disabled:f})]})]}):null]})}function tQ(e){if(null==e||""===e)return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let a=e=>String(e).padStart(2,"0");return`${t.getFullYear()}-${a(t.getMonth()+1)}-${a(t.getDate())}T${a(t.getHours())}:${a(t.getMinutes())}`}function tZ(e){if(null==e||""===String(e).trim())return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"})}let t0=`
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
    padding: 6px 14px 6px 6px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    color: var(--text);
    font-size: 14px;
    font-weight: 600;
    max-width: min(260px, 50vw);
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
  .topbar-profile-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
`;function t1(){return(0,t.jsx)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"})})}function t2(){let e=(0,n.useRouter)(),u=(0,n.useSearchParams)(),p=(0,l.getPublicApiBase)(),h=(0,l.getUploadsOrigin)(),f=u.get("next")||"",g=u.get("eventId")||"",[v,b]=a.default.useState("boot"),[x,y]=a.default.useState(!1),[j,w]=a.default.useState(null),[N,k]=a.default.useState(null),[E,C]=a.default.useState(""),[A,T]=a.default.useState(""),[S,I]=a.default.useState(""),[L,_]=a.default.useState(""),[R,D]=a.default.useState(""),[P,M]=a.default.useState(""),[O,$]=a.default.useState(""),[F,z]=a.default.useState(""),[B,U]=a.default.useState(""),[H,W]=a.default.useState(""),[V,q]=a.default.useState(null),[G,Y]=a.default.useState(!1),[K,J]=a.default.useState([]),[X,Q]=a.default.useState(""),[Z,ee]=a.default.useState(""),[et,ea]=a.default.useState(""),[en,er]=a.default.useState(null),[ei,el]=a.default.useState(!1),[eo,es]=a.default.useState(""),[ed,ec]=a.default.useState(""),[eu,em]=a.default.useState(!1),[ep,eh]=a.default.useState(null),[ef,eg]=a.default.useState("list"),[ev,eb]=a.default.useState(null),[ex,ey]=a.default.useState(!1),[ej,ew]=a.default.useState(null),[eN,ek]=a.default.useState(!1),[eE,eC]=a.default.useState(!1),[eA,eT]=a.default.useState(null),[eS,eI]=a.default.useState(""),[eL,e_]=a.default.useState(""),[eR,eD]=a.default.useState(""),[eP,eM]=a.default.useState(""),[eO,e$]=a.default.useState(""),[eF,ez]=a.default.useState(null),[eB,eU]=a.default.useState(!1),[eH,eW]=a.default.useState(null),eV=a.default.useCallback((e,t)=>{J(a=>a.map(a=>a.event_id===e?{...a,...t}:a))},[]),eq=a.default.useCallback(async()=>{let e=(0,i.readAdminToken)();if(e)try{let t=await fetch(`${p}/admin/events`,{headers:{...(0,i.adminAuthHeader)(e)}}),a=await t.json().catch(()=>null);if(!t.ok){401===t.status&&(0,i.clearAdminSession)();return}J(Array.isArray(a?.events)?a.events:[])}catch{w("Could not reach the API. Ensure the backend is running on port 4000.")}},[p]),eG=a.default.useCallback(e=>{eT(e),eI(e.name||""),e_(e.organisation_name||""),eD(e.mobile||""),eM(e.full_address||"");let t=(e.logo||"").trim();e$(t),ez(t?(0,o.resolveAdminLogoUrl)(h,t):null)},[h]),eY=a.default.useCallback(async()=>{let e=(0,i.readAdminToken)();if(!e)return null;try{let t=await fetch(`${p}/admin/me`,{headers:{...(0,i.adminAuthHeader)(e)}}),a=await t.json().catch(()=>null);if(!t.ok)return 401===t.status&&(0,i.clearAdminSession)(),null;let n=a?.admin;return n?.adminId&&eG(n),n??null}catch{return w("Could not reach the API. Ensure the backend is running on port 4000."),null}},[p,eG]);a.default.useEffect(()=>{let e=!1;return(0,i.readAdminToken)()?((async()=>{try{if(await eY(),e)return;(0,i.isAdminSessionValid)()?(b("dashboard"),await eq()):b("auth")}catch{if(e)return;(0,i.isAdminSessionValid)()?(b("dashboard"),await eq()):b("auth")}})(),()=>{e=!0}):void b("auth")},[eq,eY]);let eK=a.default.useCallback((t,a)=>{eg(t),eb(a??null),ey(!1),w(null);let n=new URLSearchParams;"create"===t?n.set("screen","create"):"profile"===t?n.set("screen","profile"):"edit"===t&&a?(n.set("screen","edit"),n.set("eventId",String(a))):("categories"===t||"nominees"===t||"allowed-mobiles"===t)&&a?(n.set("eventId",String(a)),n.set("panel",t)):"detail"===t&&a&&n.set("eventId",String(a));let r=n.toString();e.replace(`/admin${r?`?${r}`:""}`,{scroll:!1})},[e]);a.default.useEffect(()=>{let e,t,a,n,r;if("dashboard"!==v)return;let i=(e=u.get("screen"),t=u.get("panel"),r=Number.isFinite(n=(a=u.get("eventId"))?Number(a):0)&&n>0?Math.floor(n):null,"create"===e?{screen:"create",eventId:null}:"profile"===e?{screen:"profile",eventId:null}:"edit"===e&&r?{screen:"edit",eventId:r}:r&&"categories"===t?{screen:"categories",eventId:r}:r&&"nominees"===t?{screen:"nominees",eventId:r}:r&&"allowed-mobiles"===t?{screen:"allowed-mobiles",eventId:r}:r?{screen:"detail",eventId:r}:{screen:"list",eventId:null}),l=u.get("screen");eg("create"===l?"list":"edit"===l&&i.eventId?"detail":i.screen),eb(i.eventId),"create"===l?ew("create"):"edit"===l&&i.eventId&&ew("edit")},[v,u]),a.default.useEffect(()=>{"dashboard"!==v||eA||eY()},[v,eA,eY]),a.default.useEffect(()=>{if("dashboard"!==v||"edit"!==ej||null==ev)return;let e=K.find(e=>e.event_id===ev);if(!e||ep===e.event_id)return;eh(e.event_id),Q((e.title||"").trim()),ee((e.description||"").trim());let t=(e.image||"").trim();ea(t),er(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),t?(0,o.resolveEventBannerUrl)(h,t):null)),el(!0===e.is_private||1===e.is_private),es(tQ(e.start_time)),ec(tQ(e.end_time))},[v,ej,ev,K,ep,h]);let eJ=a.default.useCallback(()=>{er(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null))},[]);function eX(){"/actions"===f&&g?e.push(`/actions?eventId=${encodeURIComponent(g)}`):f.startsWith("/")&&e.push(f)}function eQ(e){let t=e.trim().toLowerCase();return t?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)?null:"Enter a valid email address.":"Email is required."}function eZ(e){return e?e.length<8?"Password must be at least 8 characters.":e.length>72?"Password must be at most 72 characters.":null:"Password is required."}function e0(){let e=P.trim();if(!e)return"Your name is required.";if(e.length>75)return"Name must be at most 75 characters.";let t=O.trim();if(!t)return"Organisation name is required.";if(t.length>100)return"Organisation name must be at most 100 characters.";let a=F.trim().replace(/\s/g,"");if(!/^\d{10,12}$/.test(a))return"Mobile must be 10–12 digits (numbers only).";let n=B.trim();return n?n.length>300?"Address must be at most 300 characters.":null:"Full address is required."}function e1(){let e=F.trim().replace(/\s/g,""),t={email:E.trim().toLowerCase(),password:A,name:P.trim(),organisation_name:O.trim(),mobile:e,full_address:B.trim()},a=H.trim();return a&&(t.logo=a),t}async function e2(e){Y(!0),w(null);try{let t=await (0,s.uploadAwardsPhoto)(e,p);W(t),q(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),(0,o.resolveAdminLogoUrl)(h,t)))}catch(e){w(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{Y(!1)}}async function e5(e){eU(!0),w(null);try{let t=(0,i.readAdminToken)();if(!t)return;let a=await (0,s.uploadAwardsPhoto)(e,p,t);e$(a),ez(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),(0,o.resolveAdminLogoUrl)(h,a)))}catch(e){w(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{eU(!1)}}async function e6(e){e.preventDefault();let t=(0,i.readAdminToken)();if(!t)return;let a=eS.trim(),n=eL.trim(),r=eR.trim().replace(/\s/g,""),l=eP.trim();if(!a||!n||!r||!l)return void w("Please fill in all required profile fields.");y(!0),w(null),eW(null);try{let e={name:a,organisation_name:n,mobile:r,full_address:l};eO.trim()&&(e.logo=eO.trim());let o=await fetch(`${p}/admin/me`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(t)},body:JSON.stringify(e)}),s=await o.json().catch(()=>null);if(!o.ok)throw Error(s?.message||s?.error||"PROFILE_SAVE_FAILED");s.admin&&eG(s.admin),eW("Profile saved.")}catch(e){w(e instanceof Error?e.message:"PROFILE_SAVE_FAILED")}finally{y(!1)}}async function e4(e){e.preventDefault(),y(!0),w(null);let t=eQ(E);if(t){w(t),y(!1);return}let a=eZ(A);if(a){w(a),y(!1);return}if(A!==S){w("Passwords do not match."),y(!1);return}let n=e0();if(n){w(n),y(!1);return}if(G){w("Please wait for the logo upload to finish."),y(!1);return}try{let e=await fetch(`${p}/admin/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e1())}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"REGISTER_FAILED");_(""),b("register-verify")}catch(e){w(e instanceof Error?e.message:"REGISTER_FAILED")}finally{y(!1)}}async function e8(e){e.preventDefault(),y(!0),w(null);let t=eQ(E);if(t){w(t),y(!1);return}let a=L.trim();if(!/^\d{6}$/.test(a)){w("Enter the 6-digit OTP from your email."),y(!1);return}try{let e=await fetch(`${p}/admin/auth/verify-registration`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:E.trim().toLowerCase(),otp:a})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"VERIFY_FAILED");(0,i.writeAdminSession)(t.token,t.admin),t.admin&&eG(t.admin),T(""),I(""),_(""),b("dashboard"),await eq(),eX()}catch(e){w(e instanceof Error?e.message:"VERIFY_FAILED")}finally{y(!1)}}async function e3(){y(!0),w(null),k(null);let e=eQ(E),t=eZ(A),a=e0();if(e||t||a){w(e||t||a||"Complete the registration form first."),y(!1);return}try{let e=await fetch(`${p}/admin/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e1())}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"RESEND_FAILED");k("A new OTP has been sent to your email.")}catch(e){w(e instanceof Error?e.message:"RESEND_FAILED")}finally{y(!1)}}async function e7(e){e.preventDefault(),y(!0),w(null);let t=eQ(E);if(t){w(t),y(!1);return}let a=eZ(A);if(a){w(a),y(!1);return}try{let e=await fetch(`${p}/admin/auth/sign-in`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:E.trim().toLowerCase(),password:A})}),t=await e.json().catch(()=>null);if(!e.ok)throw t?.error==="EMAIL_NOT_VERIFIED"&&b("register-verify"),Error(t?.message||t?.error||"SIGN_IN_FAILED");(0,i.writeAdminSession)(t.token,t.admin),t.admin&&eG(t.admin),T(""),b("dashboard"),await eq(),eX()}catch(e){w(e instanceof Error?e.message:"SIGN_IN_FAILED")}finally{y(!1)}}async function e9(e){e.preventDefault(),y(!0),w(null);try{let e=await fetch(`${p}/admin/auth/forgot-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:E.trim()})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"FORGOT_FAILED");b("reset")}catch(e){w(e instanceof Error?e.message:"FORGOT_FAILED")}finally{y(!1)}}async function te(e){e.preventDefault(),y(!0),w(null);try{let e=await fetch(`${p}/admin/auth/reset-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:E.trim(),otp:L.trim(),newPassword:R})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"RESET_FAILED");(0,i.writeAdminSession)(t.token,t.admin),t.admin&&eG(t.admin),_(""),D(""),b("dashboard"),await eq(),eX()}catch(e){w(e instanceof Error?e.message:"RESET_FAILED")}finally{y(!1)}}function tt(){eh(null),Q(""),ee(""),ea(""),eJ(),el(!1),es(""),ec("")}function ta(){ew(null),tt(),w(null)}async function tn(e){let t=(0,i.readAdminToken)();if(t){em(!0),w(null);try{let a=await (0,s.uploadAwardsPhoto)(e,p,t);er(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),(0,o.resolveEventBannerUrl)(h,a))),ea(a)}catch(e){w(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{em(!1)}}}async function tr(e){e.preventDefault();let t=(0,i.readAdminToken)();if(!t)return;let a=function(e,t){if(e&&!t||!e&&t)return"Set both voting start and end, or leave both empty.";if(!e||!t)return null;let a=new Date(e).getTime(),n=new Date(t).getTime();return Number.isNaN(a)||Number.isNaN(n)?"Invalid voting window datetime.":n<=a?"End time must be after start time.":null}(eo,ed);if(a)return void w(a);y(!0),w(null);try{let e=null!=ep,a=eo&&ed?{start_time:new Date(eo).toISOString(),end_time:new Date(ed).toISOString()}:e?{start_time:"",end_time:""}:{},n=e?{title:X.trim(),description:Z.trim()||null,image:et.trim()||null,is_private:+!!ei,...a}:{title:X.trim(),description:Z.trim()||void 0,image:et.trim()||void 0,is_private:+!!ei,...a},r=await fetch(e?`${p}/admin/events/${ep}`:`${p}/admin/events`,{method:e?"PATCH":"POST",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(t)},body:JSON.stringify(n)}),l=await r.json().catch(()=>null);if(!r.ok)throw Error(l?.message||l?.error||(e?"UPDATE_EVENT_FAILED":"CREATE_EVENT_FAILED"));let o=e?ep:Number(l?.event?.event_id??0)||null;ew(null),tt(),await eq(),o?eK("detail",o):eK("list")}catch(e){w(e instanceof Error?e.message:"SAVE_EVENT_FAILED")}finally{y(!1)}}function ti(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M10 11v6M14 11v6",strokeLinecap:"round"})]})}async function tl(e){let t=(0,i.readAdminToken)();if(!t)return;let a=(e.title||"").trim()||"Untitled";if(window.confirm(`Delete "${a}" and all its categories, nominees, and votes? This cannot be undone.`)){y(!0),w(null);try{let n=await fetch(`${p}/admin/events/${e.event_id}`,{method:"DELETE",headers:{...(0,i.adminAuthHeader)(t)}}),r=await n.json().catch(()=>null);if(!n.ok)throw Error(r?.message||r?.error||"DELETE_EVENT_FAILED");ev===e.event_id&&(eb(null),eK("list")),ep===e.event_id&&tt(),await eq(),k(`Deleted "${a}".`)}catch(e){w(e instanceof Error?e.message:"DELETE_EVENT_FAILED")}finally{y(!1)}}}async function to(e,t){let a=(0,i.readAdminToken)();if(a){ek(!0),w(null);try{let n=await fetch(`${p}/admin/events/${e.event_id}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(a)},body:JSON.stringify({is_live:+!!t})}),r=await n.json().catch(()=>null);if(!n.ok)throw Error(r?.error||"UPDATE_EVENT_FAILED");eV(e.event_id,{is_live:+!!t})}catch(e){w(e instanceof Error?e.message:"UPDATE_EVENT_FAILED")}finally{ek(!1)}}}async function ts(e,t){let a=(0,i.readAdminToken)();if(a){eC(!0),w(null);try{let n=await fetch(`${p}/admin/events/${e.event_id}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(a)},body:JSON.stringify({declare_result:+!!t})}),r=await n.json().catch(()=>null);if(!n.ok)throw Error(r?.error||"UPDATE_EVENT_FAILED");eV(e.event_id,{declare_result:+!!t})}catch(e){w(e instanceof Error?e.message:"UPDATE_EVENT_FAILED")}finally{eC(!1)}}}if(a.default.useEffect(()=>()=>{er(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null))},[]),"dashboard"===v){let e,a,n,l,s,u,f,g,v,y,N,k=(0,i.readAdminToken)(),E=null!=ev?K.find(e=>e.event_id===ev)??null:null,C=(0,t.jsxs)("form",{id:"admin-event-form",onSubmit:tr,children:[(0,t.jsxs)("div",{className:"row-mix",children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Event title *"}),(0,t.jsx)("input",{className:"input",required:!0,value:X,onChange:e=>Q(e.target.value),maxLength:200,placeholder:"Enter event name"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Visibility"}),(0,t.jsxs)("label",{className:"toggle-field",children:[(0,t.jsx)("input",{type:"checkbox",className:"switch",role:"switch",checked:ei,onChange:e=>el(e.target.checked),"aria-checked":ei}),(0,t.jsx)("span",{className:"toggle-label",children:"Private (invite-only)"})]})]})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Description"}),(0,t.jsx)("textarea",{className:"input",value:Z,onChange:e=>ee(e.target.value),maxLength:500,rows:2,placeholder:"Optional short description"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Banner image"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",disabled:eu||x,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(er(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),URL.createObjectURL(t))),ea(""),tn(t)),e.currentTarget.value=""}}),en?(0,t.jsxs)("div",{className:"banner-preview",children:[(0,t.jsx)("img",{src:en,alt:""}),(0,t.jsx)("span",{className:`banner-badge ${eu?"badge-busy":et?"badge-ok":"badge-preview"}`,children:eu?"Uploading…":et?"Banner ready":"Preview"})]}):null]}),(0,t.jsxs)("fieldset",{className:"fieldset",children:[(0,t.jsx)("legend",{className:"fieldset-legend",children:"Voting window"}),(0,t.jsx)("p",{className:"fieldset-hint",children:"Set both to restrict when votes count, or leave empty for open voting. End must be after start."}),(0,t.jsxs)("div",{className:"grid2",children:[(0,t.jsxs)("div",{className:"field",style:{margin:0},children:[(0,t.jsx)("div",{className:"label",children:"Start"}),(0,t.jsx)("input",{className:"input",type:"datetime-local",value:eo,onChange:e=>es(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",style:{margin:0},children:[(0,t.jsx)("div",{className:"label",children:"End"}),(0,t.jsx)("input",{className:"input",type:"datetime-local",value:ed,min:eo||void 0,onChange:e=>ec(e.target.value)})]})]})]})]}),A=(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)(c.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:()=>eK("list")},{label:"My profile"}]})}),(0,t.jsx)("div",{className:"section-head",style:{marginTop:8},children:(0,t.jsx)("span",{className:"section-title",children:"My profile"})}),eH?(0,t.jsx)("p",{className:"hint",style:{marginBottom:12},children:eH}):null,eA?(0,t.jsxs)("div",{className:"profileSummary",style:{marginBottom:20},children:[(0,t.jsx)("div",{className:"profileSummaryLabel",children:"Signed in as"}),(0,t.jsx)("div",{className:"profileSummaryValue",children:eA.name||eA.email}),(0,t.jsx)("div",{className:"profileSummaryMeta",children:eA.email})]}):null,(0,t.jsxs)("form",{onSubmit:e=>void e6(e),children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Your name *"}),(0,t.jsx)("input",{className:"input",required:!0,value:eS,onChange:e=>eI(e.target.value),maxLength:75})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Organisation name *"}),(0,t.jsx)("input",{className:"input",required:!0,value:eL,onChange:e=>e_(e.target.value),maxLength:100})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Mobile *"}),(0,t.jsx)("input",{className:"input",type:"tel",required:!0,value:eR,onChange:e=>eD(e.target.value.replace(/[^\d\s]/g,"").slice(0,12)),inputMode:"numeric"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Full address *"}),(0,t.jsx)("textarea",{className:"input",required:!0,value:eP,onChange:e=>eM(e.target.value),maxLength:300,rows:2})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Organisation logo (optional)"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",disabled:x||eB,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(ez(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),URL.createObjectURL(t))),e$(""),e5(t)),e.currentTarget.value=""}}),eF?(0,t.jsxs)("div",{className:"banner-preview",style:{marginTop:10},children:[(0,t.jsx)("img",{src:eF,alt:"",style:{height:80,objectFit:"contain",background:"#f8fafc"}}),(0,t.jsx)("span",{className:`banner-badge ${eB?"badge-busy":eO?"badge-ok":"badge-preview"}`,children:eB?"Uploading…":eO?"Logo ready":"Preview"})]}):null]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",value:eA?.email||"",disabled:!0,readOnly:!0,"aria-readonly":!0})]}),(0,t.jsx)("button",{type:"submit",className:"btn",disabled:x||eB,children:x?"Saving…":"Save changes"})]})]}),T=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)(c.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events"}]})}),(0,t.jsxs)("div",{className:"section-head",children:[(0,t.jsx)("span",{className:"section-title",children:"Your events"}),(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:12},children:[(0,t.jsxs)("span",{style:{fontSize:13,color:"var(--text-faint)"},children:[K.length," total"]}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eK("profile"),children:"My profile"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:function(){tt(),w(null),ew("create")},children:"Add event"})]})]}),0===K.length?(0,t.jsx)("p",{className:"hint",children:"No events yet — use Add event to create your first one."}):(0,t.jsx)("div",{className:"event-list",children:K.map(e=>{let a=(e.title||"").trim()||"Untitled",n=(e.description||"").trim(),r=(0,o.resolveEventBannerUrl)(h,e.image);return(0,t.jsxs)("div",{className:"event-card-wrap",children:[(0,t.jsx)("button",{type:"button",className:"event-icon-btn",disabled:x,"aria-label":`Delete ${a}`,title:"Delete event",onClick:()=>void tl(e),children:(0,t.jsx)(ti,{})}),(0,t.jsx)("button",{type:"button",className:"event-card event-card-clickable",style:{flex:1,minWidth:0},onClick:()=>eK("detail",e.event_id),children:(0,t.jsxs)("div",{className:"event-card-row",children:[r?(0,t.jsx)("img",{src:r,alt:"",className:"event-card-thumb"}):(0,t.jsx)("div",{className:"event-card-thumb-ph","aria-hidden":!0,children:a.slice(0,2).toUpperCase()}),(0,t.jsxs)("div",{className:"event-card-main",children:[(0,t.jsxs)("div",{className:"event-header",style:{marginBottom:4*!!n},children:[(0,t.jsx)("span",{className:"event-title",children:a}),(0,t.jsx)("span",{className:`event-badge ${!0===e.is_private||1===e.is_private?"badge-private":"badge-public"}`,children:!0===e.is_private||1===e.is_private?"Private":"Public"})]}),n?(0,t.jsx)("p",{className:"event-desc",style:{marginBottom:0},children:n}):null]}),(0,t.jsx)("span",{className:"event-card-chevron","aria-hidden":!0,children:"›"})]})})]},e.event_id)})})]}),S=E?(a=(E.title||"").trim()||"Untitled",n=(E.description||"").trim(),l=(0,o.resolveEventBannerUrl)(h,E.image),s=!0===E.is_private||1===E.is_private,u=!0===E.is_live||1===E.is_live,f=!0===E.declare_result||1===E.declare_result,g=function(e){let t=e.start_time,a=e.end_time;if(null==t||null==a||!String(t).trim()||!String(a).trim())return"always";let n=new Date(String(t)).getTime(),r=new Date(String(a)).getTime();if(Number.isNaN(n)||Number.isNaN(r))return"always";let i=Date.now();return i<n?"upcoming":i>r?"ended":"open"}(E),v=tZ(E.start_time),y=tZ(E.end_time),N=!!(v&&y),(0,t.jsxs)("article",{className:"event-detail-panel",children:[l?(0,t.jsx)("img",{src:l,alt:"",className:"event-detail-banner"}):(0,t.jsx)("div",{className:"event-detail-banner-ph","aria-hidden":!0,children:a.slice(0,2).toUpperCase()}),(0,t.jsxs)("div",{className:"event-detail-body",children:[(0,t.jsxs)("div",{className:"event-detail-badges",children:[(0,t.jsx)("span",{className:`event-badge ${s?"badge-private":"badge-public"}`,children:s?"Private":"Public"}),(0,t.jsx)("span",{className:`event-badge ${u?"badge-public":"badge-vote-ended"}`,children:u?"Live":"Not live"}),(0,t.jsx)("span",{className:`event-badge ${"open"===g?"badge-vote-open":"upcoming"===g?"badge-vote-upcoming":"ended"===g?"badge-vote-ended":"badge-vote-always"}`,children:"open"===g?"Voting open":"upcoming"===g?"Voting soon":"ended"===g?"Voting ended":"Open voting"})]}),(0,t.jsx)("h1",{className:"event-detail-title",children:a}),n?(0,t.jsx)("p",{className:"event-desc",children:n}):null,N?(0,t.jsxs)("dl",{className:"event-detail-meta",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("dt",{children:"Voting starts"}),(0,t.jsx)("dd",{children:v})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("dt",{children:"Voting ends"}),(0,t.jsx)("dd",{children:y})]})]}):(0,t.jsx)("p",{className:"event-detail-note",children:"Voting window not set — votes count anytime."}),s?(0,t.jsx)("p",{className:"event-detail-note",children:"Invite-only event. Share the register link below with attendees."}):null,(0,t.jsxs)("div",{className:"event-detail-controls",children:[(0,t.jsx)("div",{className:"event-detail-controls-title",children:"Event controls"}),(0,t.jsxs)("div",{className:"event-detail-controls-row",children:[(0,t.jsxs)("label",{className:d.default.adminApproveSwitch,title:u?"Event is live":"Make event live",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:u,disabled:eN||x,onChange:e=>void to(E,e.target.checked),"aria-label":u?"Take event offline":"Go live"}),(0,t.jsx)("span",{className:d.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:"Go live"})]}),(0,t.jsxs)("label",{className:d.default.adminApproveSwitch,title:f?"All category results declared":"Declare all category results",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:f,disabled:eE||x,onChange:e=>void ts(E,e.target.checked),"aria-label":f?"Undeclare all results":"Declare all results"}),(0,t.jsx)("span",{className:d.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:"Declare all results"})]})]}),(0,t.jsx)("p",{className:"event-detail-note",style:{marginBottom:0},children:"Go live opens voting on the public event page. Per-category Show nominee and Declare result are in Categories."})]}),(0,t.jsxs)("div",{className:"event-detail-actions",children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eK("categories",E.event_id),children:"Categories"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eK("nominees",E.event_id),children:"Nominees"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,r.withBasePath)(`/actions?eventId=${E.event_id}`),target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"LED controls"}),s?(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eK("allowed-mobiles",E.event_id),children:"Allowed mobiles"}):null,(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,r.withBasePath)(`/screen?eventId=${E.event_id}`),target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"Open LED screen"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>{var e;navigator.clipboard.writeText((e=E.event_id,(0,r.fullAppUrl)(`/register?eventId=${e}`))),ey(!0),window.setTimeout(()=>ey(!1),2e3)},children:ex?"Link copied":"Copy register link"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,r.withBasePath)(`/events/${E.event_id}`),target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"Public event page"})]})]})]})):(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)(c.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:()=>eK("list")},{label:"Event not found"}]})}),(0,t.jsx)("p",{className:"hint",style:{padding:"1rem 0"},children:"Event not found."})]});if("detail"===ef){let a=E?(E.title||"").trim()||"Untitled":"Event";e=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"back-row",children:[(0,t.jsx)(c.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:()=>eK("list")},{label:a}]}),E?(0,t.jsxs)("div",{className:"back-row-actions",children:[(0,t.jsx)("button",{type:"button",className:"event-icon-btn event-icon-btn--neutral",disabled:x,"aria-label":`Edit ${a}`,title:"Edit event",onClick:()=>{let e;return eh(E.event_id),Q((E.title||"").trim()),ee((E.description||"").trim()),void(ea(e=(E.image||"").trim()),er(t=>(t?.startsWith("blob:")&&URL.revokeObjectURL(t),e?(0,o.resolveEventBannerUrl)(h,e):null)),el(!0===E.is_private||1===E.is_private),es(tQ(E.start_time)),ec(tQ(E.end_time)),w(null),ew("edit"),ev!==E.event_id&&eK("detail",E.event_id))},children:(0,t.jsx)(function(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,t.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})},{})}),(0,t.jsx)("button",{type:"button",className:"event-icon-btn",disabled:x,"aria-label":`Delete ${a}`,title:"Delete event",onClick:()=>void tl(E),children:(0,t.jsx)(ti,{})})]}):null]}),S]})}else if(("categories"===ef||"nominees"===ef)&&null!=ev){let a=K.find(e=>e.event_id===ev),n=(0,i.readAdminToken)();e=a&&n?(0,t.jsx)(tY,{mode:ef,eventId:ev,eventTitle:(a.title||"").trim()||"Untitled",apiBase:p,apiOrigin:h,token:n,onBack:()=>eK("detail",ev),onGoList:()=>eK("list"),onGoCategories:()=>eK("categories",ev),onEventDeclareResultChange:e=>eV(ev,{declare_result:+!!e})}):(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)(c.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:()=>eK("list")},{label:"Event not found"}]})}),(0,t.jsx)("p",{className:"hint",style:{padding:"1rem 0"},children:"Event not found."})]})}else if("profile"===ef)e=A;else if("allowed-mobiles"===ef&&null!=ev){let a=K.find(e=>e.event_id===ev),n=(0,i.readAdminToken)(),r=a?.is_private===!0||a?.is_private===1;e=a&&n&&r?(0,t.jsx)(tX,{eventId:ev,eventTitle:(a.title||"").trim()||"Untitled",apiBase:p,token:n,onBack:()=>eK("detail",ev),onGoList:()=>eK("list")}):(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)(c.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:()=>eK("list")},{label:"Event not found"}]})}),(0,t.jsx)("p",{className:"hint",style:{padding:"1rem 0"},children:a?"Allowed mobiles apply only to private events.":"Event not found."})]})}else e=T;return(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:t0}),(0,t.jsxs)("div",{className:"dashboard",children:[(0,t.jsxs)("div",{className:"topbar",children:[(0,t.jsxs)("div",{className:"topbar-brand",children:[(0,t.jsx)("div",{className:"topbar-icon",children:(0,t.jsx)(t1,{})}),(0,t.jsx)("span",{className:"topbar-title",children:"Event Admin"})]}),(0,t.jsxs)("div",{className:"topbar-actions",children:[eA?(0,t.jsxs)("button",{type:"button",className:"topbar-profile",onClick:()=>eK("profile"),title:`Signed in as ${eA.name||eA.email}`,children:[(0,t.jsx)("span",{className:"topbar-profile-avatar","aria-hidden":!0,children:(eA.name||eA.email).slice(0,2).toUpperCase()}),(0,t.jsx)("span",{className:"topbar-profile-name",children:eA.name||eA.email})]}):null,(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:function(){(0,i.clearAdminSession)(),eT(null),b("auth"),J([])},children:"Log out"})]})]}),j&&(0,t.jsx)("div",{className:"error-box",children:j}),e,ej?(0,t.jsx)(m,{wide:!0,title:"create"===ej?"New event":"Edit event",onClose:ta,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",disabled:x||eu,onClick:ta,children:"Cancel"}),(0,t.jsx)("button",{type:"submit",form:"admin-event-form",className:"btn",disabled:x||eu,children:x?"Saving…":"edit"===ej?"Save changes":"Create event"})]}),children:C}):null,!k&&(0,t.jsx)("p",{className:"error-box",style:{marginTop:16},children:"Session missing — please log in again."})]})]})}return"forgot"===v?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:t0}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(t1,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Forgot password"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Enter your email and we'll send a 6-digit OTP."}),j&&(0,t.jsx)("div",{className:"error-box",children:j}),(0,t.jsxs)("form",{onSubmit:e9,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:E,onChange:e=>C(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:x,children:x?"Sending…":"Send OTP"})]}),(0,t.jsx)("div",{className:"auth-footer",children:(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>b("auth"),children:"← Back to sign in"})})]})})]}):"register"===v?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:t0}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card auth-card-wide",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(t1,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Create account"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Fill in your details. We will email a one-time code to verify your account."}),j&&(0,t.jsx)("div",{className:"error-box",children:j}),(0,t.jsxs)("form",{onSubmit:e4,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Your name *"}),(0,t.jsx)("input",{className:"input",required:!0,value:P,onChange:e=>M(e.target.value),placeholder:"Full name",maxLength:75,autoComplete:"name"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Organisation name *"}),(0,t.jsx)("input",{className:"input",required:!0,value:O,onChange:e=>$(e.target.value),placeholder:"Company or organisation",maxLength:100,autoComplete:"organization"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Mobile *"}),(0,t.jsx)("input",{className:"input",type:"tel",required:!0,value:F,onChange:e=>z(e.target.value.replace(/[^\d\s]/g,"").slice(0,12)),placeholder:"10–12 digit mobile number",inputMode:"numeric",autoComplete:"tel"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Full address *"}),(0,t.jsx)("textarea",{className:"input",required:!0,value:B,onChange:e=>U(e.target.value),placeholder:"Street, city, state, PIN",maxLength:300,rows:2,autoComplete:"street-address"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Organisation logo (optional)"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",disabled:x||G,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(q(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),URL.createObjectURL(t))),W(""),e2(t)),e.currentTarget.value=""}}),V?(0,t.jsxs)("div",{className:"banner-preview",style:{marginTop:10},children:[(0,t.jsx)("img",{src:V,alt:"",style:{height:80,objectFit:"contain",background:"#f8fafc"}}),(0,t.jsx)("span",{className:`banner-badge ${G?"badge-busy":H?"badge-ok":"badge-preview"}`,children:G?"Uploading…":H?"Logo ready":"Preview"})]}):null]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email *"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,autoComplete:"email",value:E,onChange:e=>C(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Password *"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"new-password",value:A,onChange:e=>T(e.target.value),placeholder:"At least 8 characters",minLength:8,maxLength:72})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Confirm password *"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"new-password",value:S,onChange:e=>I(e.target.value),placeholder:"Re-enter password",minLength:8,maxLength:72})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:x||G,children:x?"Sending OTP…":"Send OTP"})]}),(0,t.jsx)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{w(null),b("auth")},children:"Already have an account? Sign in"})})]})})]}):"register-verify"===v?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:t0}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(t1,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Verify your email"}),(0,t.jsxs)("div",{className:"auth-subtitle",children:["Enter the 6-digit OTP sent to ",(0,t.jsx)("strong",{children:E.trim()||"your email"}),"."]}),j&&(0,t.jsx)("div",{className:"error-box",children:j}),N&&(0,t.jsx)("div",{className:"info-box",children:N}),(0,t.jsxs)("form",{onSubmit:e8,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:E,onChange:e=>C(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"OTP"}),(0,t.jsx)("input",{className:"input",required:!0,value:L,onChange:e=>_(e.target.value.replace(/\D/g,"").slice(0,6)),placeholder:"6-digit code",inputMode:"numeric",maxLength:6,pattern:"\\d{6}"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:x,children:x?"Verifying…":"Verify & continue"})]}),(0,t.jsxs)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:[(0,t.jsx)("button",{type:"button",className:"link-btn",disabled:x,onClick:()=>void e3(),children:"Resend OTP"}),(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{w(null),b("register")},children:"← Back to register"})]})]})})]}):"reset"===v?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:t0}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(t1,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Reset password"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Enter the OTP from your email and choose a new password."}),j&&(0,t.jsx)("div",{className:"error-box",children:j}),(0,t.jsxs)("form",{onSubmit:te,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:E,onChange:e=>C(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"OTP"}),(0,t.jsx)("input",{className:"input",required:!0,value:L,onChange:e=>_(e.target.value),placeholder:"6-digit code",inputMode:"numeric",maxLength:6})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"New password"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,value:R,onChange:e=>D(e.target.value),placeholder:"At least 8 characters"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:x,children:x?"Saving…":"Reset & sign in"})]})]})})]}):"boot"===v?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:t0}),(0,t.jsx)("div",{style:{minHeight:"100dvh",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text-muted)",fontSize:14},children:"Checking session…"})]}):(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:t0}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(t1,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Welcome back"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Sign in to manage your events."}),j&&(0,t.jsx)("div",{className:"error-box",children:j}),(0,t.jsxs)("form",{onSubmit:e7,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,autoComplete:"email",value:E,onChange:e=>C(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Password"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"current-password",value:A,onChange:e=>T(e.target.value),placeholder:"Min 8 characters",minLength:8,maxLength:72})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:x,children:x?"Please wait…":"Sign in"})]}),(0,t.jsxs)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:[(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{w(null),b("forgot")},children:"Forgot password?"}),(0,t.jsxs)("span",{style:{color:"var(--text-muted)"},children:["Don't have an account?"," ",(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:function(){w(null),I(""),_(""),M(""),$(""),z(""),U(""),W(""),q(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null)),b("register")},children:"Register"})]})]})]})})]})}e.s(["default",0,function(){return(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{style:{minHeight:"100vh",background:"#e8f0fe",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b",fontFamily:"sans-serif",fontSize:14},children:"Loading…"}),children:(0,t.jsx)(t2,{})})}],72906)}]);