(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,72906,e=>{"use strict";var t=e.i(43476),n=e.i(71645),r=e.i(18566),a=e.i(37645),i=e.i(90165),l=e.i(82608),o=e.i(86347),s=e.i(11688),d=e.i(36888);function c(e){return(0,t.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:(0,t.jsx)("path",{d:"M18 6L6 18M6 6l12 12",strokeLinecap:"round"})})}function u(e){let{title:r,titleId:a="admin-modal-title",wide:i,onClose:l,footer:o,children:d}=e;return n.default.useEffect(()=>{let e=e=>{"Escape"===e.key&&l()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[l]),(0,t.jsx)("div",{className:s.default.adminModalBackdrop,role:"presentation",onClick:l,children:(0,t.jsxs)("div",{className:`${s.default.adminModal} ${i?s.default.adminModalWide:""}`,role:"dialog","aria-modal":"true","aria-labelledby":a,onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:s.default.adminModalHead,children:[(0,t.jsx)("h2",{id:a,className:s.default.adminModalTitle,children:r}),(0,t.jsx)("button",{type:"button",className:s.default.adminIconBtn,onClick:l,"aria-label":"Close",children:(0,t.jsx)(c,{})})]}),d,o?(0,t.jsx)("div",{className:s.default.adminModalFooter,children:o}):null]})})}var m=e.i(21435);e.i(47167);var p=e.i(1447),h=e.i(53488),f=e.i(76776),f=f,g=e.i(55323),v=e.i(78564),b=e.i(64719),x=e.i(69072);function y(e){return(0,x.default)("MuiCardHeader",e)}let j=(0,b.default)("MuiCardHeader",["root","avatar","action","content","title","subheader"]);var w=e.i(75822);let N=(0,g.styled)("div",{name:"MuiCardHeader",slot:"Root",overridesResolver:(e,t)=>[{[`& .${j.title}`]:t.title},{[`& .${j.subheader}`]:t.subheader},t.root]})({display:"flex",alignItems:"center",padding:16}),E=(0,g.styled)("div",{name:"MuiCardHeader",slot:"Avatar"})({display:"flex",flex:"0 0 auto",marginRight:16}),k=(0,g.styled)("div",{name:"MuiCardHeader",slot:"Action"})({flex:"0 0 auto",alignSelf:"flex-start",marginTop:-4,marginRight:-8,marginBottom:-4}),C=(0,g.styled)("div",{name:"MuiCardHeader",slot:"Content"})({flex:"1 1 auto",[`.${f.default.root}:where(& .${j.title})`]:{display:"block"},[`.${f.default.root}:where(& .${j.subheader})`]:{display:"block"}}),T=n.forwardRef(function(e,n){let r=(0,v.useDefaultProps)({props:e,name:"MuiCardHeader"}),{action:a,avatar:i,component:l="div",disableTypography:o=!1,subheader:s,title:d,slots:c={},slotProps:u={},...m}=r,f={...r,component:l,disableTypography:o},g=(e=>{let{classes:t}=e;return(0,p.default)({root:["root"],avatar:["avatar"],action:["action"],content:["content"],title:["title"],subheader:["subheader"]},y,t)})(f),b={slots:c,slotProps:u},x=d,[j,T]=(0,w.default)("title",{className:g.title,elementType:h.default,externalForwardedProps:b,ownerState:f,additionalProps:{variant:i?"body2":"h5",component:"span"}});null==x||x.type===h.default||o||(x=(0,t.jsx)(j,{...T,children:x}));let A=s,[S,I]=(0,w.default)("subheader",{className:g.subheader,elementType:h.default,externalForwardedProps:b,ownerState:f,additionalProps:{variant:i?"body2":"body1",color:"textSecondary",component:"span"}});null==A||A.type===h.default||o||(A=(0,t.jsx)(S,{...I,children:A}));let[L,_]=(0,w.default)("root",{ref:n,className:g.root,elementType:N,externalForwardedProps:{...b,...m,component:l},ownerState:f}),[D,R]=(0,w.default)("avatar",{className:g.avatar,elementType:E,externalForwardedProps:b,ownerState:f}),[P,M]=(0,w.default)("content",{className:g.content,elementType:C,externalForwardedProps:b,ownerState:f}),[O,$]=(0,w.default)("action",{className:g.action,elementType:k,externalForwardedProps:b,ownerState:f});return(0,t.jsxs)(L,{..._,children:[i&&(0,t.jsx)(D,{...R,children:i}),(0,t.jsxs)(P,{...M,children:[x,A]}),a&&(0,t.jsx)(O,{...$,children:a})]})});var A=e.i(58598),S=e.i(17050),I=e.i(7670),L=e.i(56192),_=e.i(51221),D=e.i(42830),R=e.i(1839),P=e.i(68874),M=e.i(55702);function O(e){return(0,x.default)("MuiIconButton",e)}let $=(0,b.default)("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","colorError","colorInfo","colorSuccess","colorWarning","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge","loading","loadingIndicator","loadingWrapper"]);var F=e.i(41322);let z=(0,g.styled)(R.default,{name:"MuiIconButton",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,n.loading&&t.loading,"default"!==n.color&&t[`color${(0,M.default)(n.color)}`],n.edge&&t[`edge${(0,M.default)(n.edge)}`],t[`size${(0,M.default)(n.size)}`]]}})((0,_.default)(({theme:e})=>({textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:8,borderRadius:"50%",color:(e.vars||e).palette.action.active,...(0,F.getTransitionStyles)(e,"background-color",{duration:e.transitions.duration.shortest}),variants:[{props:e=>!e.disableRipple,style:{"--IconButton-hoverBg":e.alpha((e.vars||e).palette.action.active,(e.vars||e).palette.action.hoverOpacity),"&:hover":{backgroundColor:"var(--IconButton-hoverBg)","@media (hover: none)":{backgroundColor:"transparent"}}}},{props:{edge:"start"},style:{marginLeft:-12}},{props:{edge:"start",size:"small"},style:{marginLeft:-3}},{props:{edge:"end"},style:{marginRight:-12}},{props:{edge:"end",size:"small"},style:{marginRight:-3}}]})),(0,_.default)(({theme:e})=>({variants:[{props:{color:"inherit"},style:{color:"inherit"}},...Object.entries(e.palette).filter((0,D.default)()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main,"--IconButton-hoverBg":e.alpha((e.vars||e).palette[t].main,(e.vars||e).palette.action.hoverOpacity)}})),{props:{size:"small"},style:{padding:5,fontSize:e.typography.pxToRem(18)}},{props:{size:"large"},style:{padding:12,fontSize:e.typography.pxToRem(28)}}],[`&.${$.disabled}`]:{backgroundColor:"transparent",color:(e.vars||e).palette.action.disabled},[`&.${$.loading}`]:{color:"transparent"}}))),B=(0,g.styled)("span",{name:"MuiIconButton",slot:"LoadingIndicator"})(({theme:e})=>({display:"none",position:"absolute",visibility:"visible",top:"50%",left:"50%",transform:"translate(-50%, -50%)",color:(e.vars||e).palette.action.disabled,variants:[{props:{loading:!0},style:{display:"flex"}}]})),U=n.forwardRef(function(e,n){let r=(0,v.useDefaultProps)({props:e,name:"MuiIconButton"}),{edge:a=!1,children:i,className:l,color:o="default",disabled:s=!1,disableFocusRipple:d=!1,size:c="medium",id:u,loading:m=null,loadingIndicator:h,...f}=r,g=(0,L.unstable_useId)(u),b=h??(0,t.jsx)(P.default,{"aria-labelledby":g,color:"inherit",size:16}),x={...r,edge:a,color:o,disabled:s,disableFocusRipple:d,loading:m,loadingIndicator:b,size:c},y=(e=>{let{classes:t,disabled:n,color:r,edge:a,size:i,loading:l}=e,o={root:["root",l&&"loading",n&&"disabled","default"!==r&&`color${(0,M.default)(r)}`,a&&`edge${(0,M.default)(a)}`,`size${(0,M.default)(i)}`],loadingIndicator:["loadingIndicator"],loadingWrapper:["loadingWrapper"]};return(0,p.default)(o,O,t)})(x);return(0,t.jsxs)(z,{id:m?g:u,className:(0,I.default)(y.root,l),centerRipple:!0,internalNativeButton:!0,focusRipple:!d,disabled:s||m,ref:n,...f,ownerState:x,children:["boolean"==typeof m&&(0,t.jsx)("span",{className:y.loadingWrapper,style:{display:"contents"},children:(0,t.jsx)(B,{className:y.loadingIndicator,ownerState:x,children:m&&b})}),i]})});var H=e.i(9303),W=e.i(553);let V=Object.is;function G(e){let t=e.activeElement;for(;t?.shadowRoot?.activeElement!=null;)t=t.shadowRoot.activeElement;return t}function Y(e){return e&&e.ownerDocument||document}function K(e,t){"function"==typeof e?e(t):e&&(e.current=t)}var q=e.i(95154),J=e.i(42032),X=e.i(24603);let Q=n.createContext(void 0),Z=["ArrowRight","ArrowLeft","ArrowUp","ArrowDown","Home","End"];function ee(e,t,n,r){var a,i,l;let o;return null!=e?(a=e,i=t,l=n,-1===(o=ei(i,a))?er(i,l):l(i[o])?i[o].id:en(i,o,"next",!1,l)?.id??null):function(e,t,n){let r=n?.(e);if(null!=r){let n=ea(e,r);if(n&&t(n))return n.id}return er(e,t)}(t,n,r)}function et(e,t,n){if(t){let n=el(e,t);if(-1!==n)return n}return ei(e,n)}function en(e,t,n,r,a){let i=e.length-1;if(-1===i)return null;let l=!1,o=ed(t,i,n,r),s=o;for(;-1!==o;){if(o===s){if(l)return null;l=!0}let t=e[o];if(t&&a(t))return t;o=ed(o,i,n,r)}return null}function er(e,t){return e.find(e=>t(e))?.id??null}function ea(e,t){return null==t?null:e.find(e=>e.id===t)??null}function ei(e,t){return null==t?-1:e.findIndex(e=>e.id===t)}function el(e,t){return t?e.findIndex(e=>e.element===t||e.element?.contains(t)):-1}function eo(e){let t=Array.from(e.values());return t.every(e=>null==e.element)?t:[...t.filter(eu).sort((e,t)=>(function(e,t){if(e===t)return 0;let n=e.compareDocumentPosition(t);return n&Node.DOCUMENT_POSITION_FOLLOWING||n&Node.DOCUMENT_POSITION_CONTAINED_BY?-1:n&Node.DOCUMENT_POSITION_PRECEDING||n&Node.DOCUMENT_POSITION_CONTAINS?1:0})(e.element,t.element)),...t.filter(e=>!eu(e))]}function es(e){return eo(e).filter(eu)}function ed(e,t,n,r=!0){return"next"===n?e===t?r?0:-1:e+1:0===e?r?t:-1:e-1}function ec(e){return!!e.element&&(!!e.focusableWhenDisabled||!e.disabled&&!e.element.hasAttribute("disabled")&&"true"!==e.element.getAttribute("aria-disabled")&&e.element.hasAttribute("tabindex"))}function eu(e){return null!=e.element&&e.element.isConnected}let em=function(e,t){if(!e||!t)return!1;if(e.contains(t))return!0;let n=t.getRootNode?.();if(n&&n instanceof ShadowRoot){let n=t;for(;n;){if(e===n)return!0;n=n.parentNode??n.host??null}}return!1};function ep(e=window){let t=e.document.documentElement.clientWidth;return e.innerWidth-t}function eh(e,t){if(null==t)return void e.focus();try{e.focus({focusVisible:"keyboard"===t})}catch(t){e.focus()}}var ef=e.i(80012),eg=e.i(73129);let ev=q.default;function eb(e){return Y(e).defaultView||window}let ex=n.createContext({});function ey(e){return(0,x.default)("MuiList",e)}(0,b.default)("MuiList",["root","padding","dense","subheader"]);let ej=(0,g.styled)("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,!n.disablePadding&&t.padding,n.dense&&t.dense,n.subheader&&t.subheader]}})({listStyle:"none",margin:0,padding:0,position:"relative",variants:[{props:({ownerState:e})=>!e.disablePadding,style:{paddingTop:8,paddingBottom:8}},{props:({ownerState:e})=>e.subheader,style:{paddingTop:0,isolation:"isolate"}}]}),ew=n.forwardRef(function(e,r){let a=(0,v.useDefaultProps)({props:e,name:"MuiList"}),{children:i,className:l,component:o="ul",dense:s=!1,disablePadding:d=!1,subheader:c,...u}=a,m=n.useMemo(()=>({dense:s}),[s]),h={...a,component:o,dense:s,disablePadding:d},f=(e=>{let{classes:t,disablePadding:n,dense:r,subheader:a}=e;return(0,p.default)({root:["root",!n&&"padding",r&&"dense",a&&"subheader"]},ey,t)})(h);return(0,t.jsx)(ex.Provider,{value:m,children:(0,t.jsxs)(ej,{as:o,className:(0,I.default)(f.root,l),ref:r,ownerState:h,...u,children:[c,i]})})}),eN=n.createContext(null);function eE(){return n.useContext(eN)}eN.Provider;let ek=n.createContext(void 0);function eC(e,t){if(void 0===t)return!0;let n=function(e){let t=e?.element??e;if(!t)return"";if(e?.textValue!==void 0)return e.textValue;let n=t.innerText;return void 0===n&&(n=t.textContent),n??""}(e);return 0!==(n=n.trim().toLowerCase()).length&&(t.repeating?n[0]===t.keys[0]:n.startsWith(t.keys.join("")))}let eT=n.forwardRef(function(e,r){let{actions:a,autoFocus:i=!1,autoFocusItem:l=!1,children:o,className:s,disabledItemsFocusable:d=!1,disableListWrap:c=!1,onKeyDown:u,variant:m="selectedMenu",...p}=e,h=n.useRef(null),f=n.useRef(!1),[g,v]=n.useState(!1),b=eE(),x=n.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null}),y=function(e){let{activeItemId:t,getDefaultActiveItemId:r,orientation:a,isRtl:i=!1,isItemFocusable:l=ec,wrap:o=!0}=e,[s,d]=n.useState(t),[c,u]=n.useState(t),m=s;t!==c&&(u(t),void 0!==t&&t!==s&&(m=t,d(t)));let p=n.useRef(null),h=n.useRef(new Map),[f,g]=n.useState(0),v=ee(m,n.useMemo(()=>eo(h.current),[f]),l,r),b=n.useRef(v);b.current=v;let x=n.useCallback(()=>{let e=eo(h.current),t=ee(b.current,e,l,r);return ea(e,t)},[r,l]),y=n.useCallback(()=>h.current,[]),j=(0,J.default)(e=>{!function(e,t){if(e===t)return!0;if(!(e instanceof Object)||!(t instanceof Object))return!1;let n=0,r=0;for(let r in e)if(n+=1,!V(e[r],t[r])||!(r in t))return!1;for(let e in t)r+=1;return n===r}(h.current.get(e.id)??null,e)&&(h.current.set(e.id,e),g(e=>e+1))}),w=(0,J.default)(e=>{h.current.delete(e)&&g(e=>e+1)}),N=(0,J.default)(e=>{d(e)}),E=n.useCallback(e=>b.current===e,[]),k=n.useCallback((e,t,n,r)=>{let a=en(es(h.current),e,t,n,r??l);return a?(a.element?.focus(),d(a.id),a):null},[l]),C=n.useCallback(e=>({onFocus:e=>{let t=es(h.current),n=el(t,e.target);-1!==n&&d(t[n].id)},onKeyDown:e=>{if(e.altKey||e.shiftKey||e.ctrlKey||e.metaKey||!Z.includes(e.key))return;let t="horizontal"===a?"ArrowLeft":"ArrowUp",n="horizontal"===a?"ArrowRight":"ArrowDown";"horizontal"===a&&i&&(t="ArrowRight",n="ArrowLeft");let r=es(h.current),l=G(Y(p.current)),s=l===p.current,d=et(r,l,b.current),c="next";switch(e.key){case t:c="previous",e.preventDefault(),s&&(d=r.length);break;case n:e.preventDefault(),s&&(d=-1);break;case"Home":e.preventDefault(),d=-1;break;case"End":e.preventDefault(),c="previous",d=r.length;break;default:return}k(d,c,o)},ref:function(...e){return t=>{e.forEach(e=>{K(e??null,t)})}}(e,e=>{p.current=e})}),[k,i,a,o]),T=n.useCallback(e=>{let t=es(h.current),n=G(Y(p.current)),r=n===p.current?-1:et(t,n,b.current);return k(r,"next",!0,e)?.id??null},[k]);return n.useMemo(()=>({activeItemId:v,focusNext:T,getActiveItem:x,getContainerProps:C,getItemMap:y,isItemActive:E,registerItem:j,setActiveItemId:N,unregisterItem:w}),[v,T,x,C,y,E,j,N,w])}({activeItemId:void 0,getDefaultActiveItemId:n.useCallback(e=>"selectedMenu"===m?e.find(e=>e.selected&&ec(e))?.id??e.find(e=>ec(e))?.id??null:e.find(e=>ec(e))?.id??null,[m]),orientation:"vertical",wrap:!c}),{activeItemId:j,focusNext:w,getActiveItem:N,getContainerProps:E,getItemMap:k}=y,C=(0,ef.default)((e=!1)=>{if(!h.current||!e&&f.current)return null;if(l){let e=N();if(e?.element){let t=Array.from(k().values()).some(e=>e.selected);return v("menu"===m&&t&&!e.selected&&null==b),eh(e.element,b),f.current=!0,e.element}return i?(v(!1),h.current.focus(),h.current):null}return i?(v(!1),h.current.focus(),f.current=!0,h.current):(v(!1),null)});ev(()=>{if(!i&&!l){f.current=!1,v(!1);return}C()},[j,l,i,C]),n.useImperativeHandle(a,()=>({adjustStyleForScrollbar:(e,{direction:t})=>{let n=!h.current.style.width;if(e.clientHeight<h.current.clientHeight&&n){let n=`${ep(eb(e))}px`;h.current.style["rtl"===t?"paddingLeft":"paddingRight"]=n,h.current.style.width=`calc(100% + ${n})`}return h.current},focusInitialTarget:()=>{if(!h.current)return null;let e=G(Y(h.current));return e&&em(h.current,e)?e:C(!0)}}),[C]);let T=E(),A=(0,eg.default)(h,T.ref,r),S=n.useMemo(()=>({itemsFocusableWhenDisabled:d,suppressInitialFocusVisible:g,variant:m}),[d,g,m]),I=(0,ef.default)(e=>{if(g&&v(!1),(e.ctrlKey||e.metaKey||e.altKey)&&u)return void u(e);if(T.onKeyDown(e),1===e.key.length){let t=x.current,n=e.key.toLowerCase(),r=performance.now();t.keys.length>0&&(r-t.lastTime>500?(t.keys=[],t.repeating=!0,t.previousKeyMatched=!0):t.repeating&&n!==t.keys[0]&&(t.repeating=!1)),t.lastTime=r,t.keys.push(n);let a=G(Y(h.current)),i=a&&!t.repeating&&eC(a,t);t.previousKeyMatched&&(i||null!=w(e=>!!eC(e,t)&&ec(e)))?e.preventDefault():t.previousKeyMatched=!1}u&&u(e)});return(0,t.jsx)(ew,{role:"menu",ref:A,className:s,onKeyDown:I,onFocus:T.onFocus,tabIndex:-1,...p,children:(0,t.jsx)(ek.Provider,{value:S,children:(0,t.jsx)(Q.Provider,{value:y,children:o})})})});var eA=e.i(15205);let eS=function(e,t=166){let n;function r(...a){let i=()=>{e.apply(this,a)};clearTimeout(n),n=setTimeout(i,t)}return r.clear=()=>{clearTimeout(n)},r};function eI(e){return parseInt(n.version,10)>=19?e?.props?.ref||null:e?.ref||null}var eL=e.i(18717);let e_=n.default.createContext(null),eD=function(e){var r;let a,{in:i=!1,appear:l=!1,enter:o=!0,exit:s=!0,mountOnEnter:d=!1,unmountOnExit:c=!1,timeout:u,addEndListener:m,reduceMotion:p=!1,getAutoTimeout:h,nodeRef:f,onEnter:g,onEntering:v,onEntered:b,onExit:x,onExiting:y,onExited:j,children:w,...N}=e,E=n.useContext(e_),k=E&&!E.isMounting?o:l,[C,T]=n.useState(()=>i?k?"exited":"entered":d||c?"unmounted":"exited"),A=n.useRef(C);A.current=C,i&&"unmounted"===C&&(A.current="exited",T("exited"));let S=n.useRef(i&&k),I=n.useRef(!1),L=n.useRef(null),_=n.useRef(C),D=n.useRef(!1),R=n.useRef(p),P=(r={timeout:u,addEndListener:m,reduceMotion:p,getAutoTimeout:h,onEnter:g,onEntering:v,onEntered:b,onExit:x,onExiting:y,onExited:j,enter:o,exit:s,mountOnEnter:d,unmountOnExit:c,nodeRef:f,parentGroup:E},(a=(0,eL.default)(()=>{var e;let t;return t={current:e=r,next:e,effect:()=>{t.current=t.next}}}).current).next=r,(0,q.default)(a.effect),a),M=n.useCallback(()=>{null!==L.current&&(L.current.cancel(),L.current=null)},[]),O=n.useCallback(e=>{let t=!0,n=()=>{t&&(t=!1,L.current=null,e())};return n.cancel=()=>{t=!1},L.current=n,n},[]),$=n.useCallback((e,t)=>{let n,r=()=>{void 0!==n&&(clearTimeout(n),n=void 0)},a=O(()=>{r(),A.current=e,T(e)}),i=a.cancel;a.cancel=()=>{r(),i()};let l=P.current.nodeRef.current,o=P.current.addEndListener,s=void 0!==P.current.getAutoTimeout,d=P.current.getAutoTimeout?.(),c=function(e){if(null!=e.autoTimeout)return e.autoTimeout;let t=function(e){if(null==e)return{appear:void 0,enter:void 0,exit:void 0};if("number"==typeof e)return{appear:e,enter:e,exit:e};let t=e.enter,n=e.exit;return{appear:void 0!==e.appear?e.appear:t,enter:t,exit:n}}(e.timeout);return"entering"===e.currentStatus?e.isAppearing?t.appear??t.enter??null:t.enter??null:t.exit??null}({currentStatus:t,isAppearing:D.current,timeout:P.current.timeout,autoTimeout:d}),u=R.current,m=c??(u&&s?0:null),p=e=>{n=setTimeout(a,e)};if(!l)return void p(0);if(o){null!=m&&p(u?0:m),o.length>=2?o(l,a):o(a);return}p(u?0:c??0)},[O,P]),z=n.useCallback(e=>{let t=P.current,n=t.parentGroup?t.parentGroup.isMounting:e;if(D.current=n,!e&&!t.enter){A.current="entered",T("entered");return}R.current=t.reduceMotion,t.onEnter?.(n),A.current="entering",T("entering")},[P]),B=n.useCallback(()=>{let e=P.current;if(!e.exit){A.current="exited",T("exited");return}R.current=e.reduceMotion,e.onExit?.(),A.current="exiting",T("exiting")},[P]),U=n.useCallback((e,t)=>{if(M(),"entering"===t){let t=P.current;if(t.mountOnEnter||t.unmountOnExit){let e=t.nodeRef.current;e&&(0,F.reflow)(e)}z(e)}else B()},[M,z,B,P]);return((0,q.default)(()=>(I.current=!0,S.current&&(S.current=!1,U(!0,"entering")),()=>{I.current=!1,M()}),[M,U]),(0,q.default)(()=>{if(!I.current)return;let e=A.current;i?"entering"!==e&&"entered"!==e&&U(!1,"entering"):"entering"===e||"entered"===e?U(!1,"exiting"):"exited"===e&&c&&(A.current="unmounted",T("unmounted"))},[i,C,c,U]),(0,q.default)(()=>{if("unmounted"===C||"unmounted"===_.current){_.current=C;return}if(_.current===C)return;_.current=C;let e=P.current;"entering"===C?(e.onEntering?.(D.current),$("entered","entering")):"exiting"===C?(e.onExiting?.(),$("exited","exiting")):"entered"===C?e.onEntered?.(D.current):"exited"===C&&e.onExited?.()},[P,$,C]),"unmounted"===C)?null:(0,t.jsx)(e_.Provider,{value:null,children:w(C,N)})};var eR=e.i(6692),eP=e.i(89088);function eM(e){return`scale(${e}, ${e**2})`}let eO={entering:{opacity:1,transform:eM(1)},entered:{opacity:1,transform:"none"},exiting:{opacity:0,transform:eM(.75)},exited:{opacity:0,transform:eM(.75)}},e$={opacity:0,transform:eM(.75),visibility:"hidden"},eF=n.forwardRef(function(e,r){let{addEndListener:a,appear:i=!0,children:l,disablePrefersReducedMotion:o=!1,easing:s,in:d,onEnter:c,onEntered:u,onEntering:m,onExit:p,onExited:h,onExiting:f,style:g,timeout:v="auto",...b}=e,x=n.useRef(null),y=(0,eP.useTheme)(),j=(0,eR.default)(y.motion.reducedMotion,o),w=n.useRef(null),N=(0,eg.default)(w,eI(l),r),E=(0,F.normalizedTransitionCallback)(w,m),k=(0,F.normalizedTransitionCallback)(w,(e,t)=>{let n;j.shouldReduceMotion||(0,F.reflow)(e);let{duration:r,delay:a,easing:i}=(0,F.getTransitionProps)({style:g,timeout:v,easing:s},{mode:"enter"});"auto"!==v||j.shouldReduceMotion?(n=r,x.current=null):x.current=n=y.transitions.getAutoHeightDuration(e.clientHeight);let l=j.getTransitionTiming({duration:n,delay:a});e.style.transition=[y.transitions.create("opacity",{duration:l.duration,delay:l.delay}),y.transitions.create("transform",{duration:"string"==typeof l.duration?l.duration:.666*l.duration,delay:l.delay,easing:i})].join(","),c&&c(e,t)}),C=(0,F.normalizedTransitionCallback)(w,u),T=(0,F.normalizedTransitionCallback)(w,f),A=(0,F.normalizedTransitionCallback)(w,e=>{let t,{duration:n,delay:r,easing:a}=(0,F.getTransitionProps)({style:g,timeout:v,easing:s},{mode:"exit"});"auto"!==v||j.shouldReduceMotion?(t=n,x.current=null):x.current=t=y.transitions.getAutoHeightDuration(e.clientHeight);let i=j.getTransitionTiming({duration:t,delay:r});e.style.transition=[y.transitions.create("opacity",{duration:i.duration,delay:i.delay}),y.transitions.create("transform",{duration:"string"==typeof i.duration?i.duration:.666*i.duration,delay:i.delay||("string"==typeof i.duration?i.duration:.333*i.duration),easing:a})].join(","),e.style.opacity=0,e.style.transform=eM(.75),p&&p(e)}),S=(0,F.normalizedTransitionCallback)(w,e=>{e.style.transition="",h&&h(e)}),I=a?e=>{a(w.current,e)}:void 0;return(0,t.jsx)(eD,{appear:i,in:d,nodeRef:w,onEnter:k,onEntered:C,onEntering:E,onExit:A,onExited:S,onExiting:T,addEndListener:I,getAutoTimeout:"auto"===v?()=>x.current:void 0,reduceMotion:j.shouldReduceMotion,timeout:"auto"===v?null:v,...b,children:(e,{ownerState:t,...r})=>{let a=(0,F.getTransitionChildStyle)(e,d,eO,e$,g,l.props.style);return n.cloneElement(l,{style:a,ref:N,...r})}})});eF&&(eF.muiSupportAuto=!0);let ez="data-mui-focusable";function eB(e){return e?e.hasAttribute(ez)?e:e.querySelector(`[${ez}]`):null}function eU(e){let t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?"true"===e.contentEditable||("AUDIO"===e.nodeName||"VIDEO"===e.nodeName||"DETAILS"===e.nodeName)&&null===e.getAttribute("tabindex")?0:e.tabIndex:t}function eH(e){let t=[],n=[];return Array.from(e.querySelectorAll('input,select,textarea,a[href],button,[tabindex],audio[controls],video[controls],[contenteditable]:not([contenteditable="false"])')).forEach((e,r)=>{let a=eU(e);-1===a||e.disabled||"INPUT"===e.tagName&&"hidden"===e.type||function(e){if("INPUT"!==e.tagName||"radio"!==e.type||!e.name)return!1;let t=t=>e.ownerDocument.querySelector(`input[type="radio"]${t}`),n=t(`[name="${e.name}"]:checked`);return n||(n=t(`[name="${e.name}"]`)),n!==e}(e)||(0===a?t.push(e):n.push({documentOrder:r,tabIndex:a,node:e}))}),n.sort((e,t)=>e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex).map(e=>e.node).concat(t)}function eW(){return!0}let eV=function(e){let{children:r,disableAutoFocus:a=!1,disableEnforceFocus:i=!1,disableRestoreFocus:l=!1,getTabbable:o=eH,isEnabled:s=eW,open:d}=e,c=n.useRef(!1),u=n.useRef(null),m=n.useRef(null),p=n.useRef(null),h=n.useRef(null),f=n.useRef(!1),g=n.useRef(null),v=(0,X.default)(eI(r),g),b=n.useRef(null);n.useEffect(()=>{d&&g.current&&(f.current=!a)},[a,d]),n.useEffect(()=>{if(c.current=!1,!d||!g.current)return;let e=G(Y(g.current)),t=eB(g.current)??g.current;return!em(g.current,e)&&(t.hasAttribute("tabIndex")||t.setAttribute("tabIndex","-1"),f.current&&t.focus()),()=>{!l&&p.current&&(c.current=!0,p.current.focus(),p.current=null)}},[d]),n.useEffect(()=>{if(!d||!g.current)return;let e=Y(g.current),t=t=>{if(b.current=t,i||!s()||"Tab"!==t.key)return;let n=g.current,r=G(e);if(null===n)return;let a=eB(n);if(r===n||r===a){let e=o(n);if(0===e.length)return;t.preventDefault(),t.shiftKey?e[e.length-1].focus():e[0].focus();return}if(em(n,r)){let e=o(n),a=e.indexOf(r);if(-1===a||!e.some(e=>eU(e)>0))return;t.preventDefault();let i=0;i=t.shiftKey?a<=0?e.length-1:a-1:a===e.length-1?0:a+1,e[i].focus()}},n=()=>{let t=g.current;if(null===t)return;let n=G(e);if(!e.hasFocus()||!s()||c.current){c.current=!1;return}if(em(t,n)||i&&n!==u.current&&n!==m.current)return;if(n!==h.current)h.current=null;else if(null!==h.current)return;if(!f.current)return;let r=[];if((n===u.current||n===m.current)&&(r=o(g.current)),r.length>0){let e=!!(b.current?.shiftKey&&b.current?.key==="Tab"),t=r[0],n=r[r.length-1];"string"!=typeof t&&"string"!=typeof n&&(e?n.focus():t.focus())}else t.focus()};e.addEventListener("focusin",n),e.addEventListener("keydown",t,!0);let r=setInterval(()=>{let t=G(e);t&&"BODY"===t.tagName&&n()},50);return()=>{clearInterval(r),e.removeEventListener("focusin",n),e.removeEventListener("keydown",t,!0)}},[a,i,l,s,d,o]);let x=e=>{null===p.current&&(p.current=e.relatedTarget),f.current=!0};return(0,t.jsxs)(n.Fragment,{children:[(0,t.jsx)("div",{tabIndex:d?0:-1,onFocus:x,ref:u,"data-testid":"sentinelStart"}),n.cloneElement(r,{ref:v,onFocus:e=>{null===p.current&&(p.current=e.relatedTarget),f.current=!0,h.current=e.target;let t=r.props.onFocus;t&&t(e)}}),(0,t.jsx)("div",{tabIndex:d?0:-1,onFocus:x,ref:m,"data-testid":"sentinelEnd"})]})};var eG=e.i(74080);let eY=n.forwardRef(function(e,t){let{children:r,container:a,disablePortal:i=!1}=e,[l,o]=n.useState(null),s=(0,X.default)(n.isValidElement(r)?eI(r):null,t);return((0,q.default)(()=>{i||o(("function"==typeof a?a():a)||document.body)},[a,i]),(0,q.default)(()=>{if(l&&!i)return K(t,l),()=>{K(t,null)}},[t,l,i]),i)?n.isValidElement(r)?n.cloneElement(r,{ref:s}):r:l?eG.createPortal(r,l):l}),eK={entering:{opacity:1},entered:{opacity:1},exiting:{opacity:0},exited:{opacity:0}},eq={opacity:0,visibility:"hidden"},eJ=n.forwardRef(function(e,r){let a=(0,eP.useTheme)(),i={enter:a.transitions.duration.enteringScreen,exit:a.transitions.duration.leavingScreen},{addEndListener:l,appear:o=!0,children:s,disablePrefersReducedMotion:d=!1,easing:c,in:u,onEnter:m,onEntered:p,onEntering:h,onExit:f,onExited:g,onExiting:v,style:b,timeout:x=i,...y}=e,j=(0,eR.default)(a.motion.reducedMotion,d),w=n.useRef(null),N=(0,eg.default)(w,eI(s),r),E=(0,F.normalizedTransitionCallback)(w,h),k=(0,F.normalizedTransitionCallback)(w,(e,t)=>{j.shouldReduceMotion||(0,F.reflow)(e);let n=(0,F.getTransitionProps)({style:b,timeout:x,easing:c},{mode:"enter"}),r=j.getTransitionTiming({duration:n.duration,delay:n.delay});e.style.transition=a.transitions.create("opacity",{duration:r.duration,easing:n.easing,delay:r.delay}),m&&m(e,t)}),C=(0,F.normalizedTransitionCallback)(w,p),T=(0,F.normalizedTransitionCallback)(w,v),A=(0,F.normalizedTransitionCallback)(w,e=>{let t=(0,F.getTransitionProps)({style:b,timeout:x,easing:c},{mode:"exit"}),n=j.getTransitionTiming({duration:t.duration,delay:t.delay});e.style.transition=a.transitions.create("opacity",{duration:n.duration,easing:t.easing,delay:n.delay}),f&&f(e)}),S=(0,F.normalizedTransitionCallback)(w,e=>{e.style.transition="",g&&g(e)}),I=l?e=>{l(w.current,e)}:void 0;return(0,t.jsx)(eD,{appear:o,in:u,nodeRef:w,onEnter:k,onEntered:C,onEntering:E,onExit:A,onExited:S,onExiting:T,addEndListener:I,reduceMotion:j.shouldReduceMotion,timeout:x,...y,children:(e,{ownerState:t,...r})=>{let a=(0,F.getTransitionChildStyle)(e,u,eK,eq,b,s.props.style);return n.cloneElement(s,{style:a,ref:N,...r})}})});function eX(e){return(0,x.default)("MuiBackdrop",e)}(0,b.default)("MuiBackdrop",["root","invisible"]);let eQ=(0,g.styled)("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,n.invisible&&t.invisible]}})({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent",variants:[{props:{invisible:!0},style:{backgroundColor:"transparent"}}]}),eZ=n.forwardRef(function(e,n){let r=(0,v.useDefaultProps)({props:e,name:"MuiBackdrop"}),{children:a,className:i,component:l="div",invisible:o=!1,open:s,slotProps:d={},slots:c={},transitionDuration:u,...m}=r,h={...r,component:l,invisible:o},f=(e=>{let{classes:t,invisible:n}=e;return(0,p.default)({root:["root",n&&"invisible"]},eX,t)})(h),g={component:l,slots:c,slotProps:d},[b,x]=(0,w.default)("root",{elementType:eQ,externalForwardedProps:g,className:(0,I.default)(f.root,i),ownerState:h}),[y,j]=(0,w.default)("transition",{elementType:eJ,externalForwardedProps:g,ownerState:h});return(0,t.jsx)(y,{in:s,timeout:u,...m,...j,children:(0,t.jsx)(b,{...x,ref:n,children:a})})});function e0(...e){return e.reduce((e,t)=>null==t?e:function(...n){e.apply(this,n),t.apply(this,n)},()=>{})}var e1=e.i(50193);function e2(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function e5(e){return parseFloat(eb(e).getComputedStyle(e).paddingRight)||0}function e6(e,t,n,r,a){let i=[t,n,...r];[].forEach.call(e.children,e=>{let t,n,r=!i.includes(e),l=(t=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].includes(e.tagName),n="INPUT"===e.tagName&&"hidden"===e.getAttribute("type"),!t&&!n);r&&l&&e2(e,a)})}function e4(e,t){let n=-1;return e.some((e,r)=>!!t(e)&&(n=r,!0)),n}let e8=()=>{},e3=new class{constructor(){this.modals=[],this.containers=[]}add(e,t){let n,r=this.modals.indexOf(e);if(-1!==r)return r;r=this.modals.length,this.modals.push(e),e.modalRef&&e2(e.modalRef,!1);let a=(n=[],[].forEach.call(t.children,e=>{"true"===e.getAttribute("aria-hidden")&&n.push(e)}),n);e6(t,e.mount,e.modalRef,a,!0);let i=e4(this.containers,e=>e.container===t);return -1!==i?this.containers[i].modals.push(e):this.containers.push({modals:[e],container:t,restore:null,hiddenSiblings:a}),r}mount(e,t){let n=e4(this.containers,t=>t.modals.includes(e)),r=this.containers[n];r.restore||(r.restore=function(e,t){let n=[],r=e.container;if(!t.disableScrollLock){let e,t;if((t=Y(r)).body===r?eb(r).innerWidth>t.documentElement.clientWidth:r.scrollHeight>r.clientHeight){let e=ep(eb(r));n.push({value:r.style.paddingRight,property:"padding-right",el:r}),r.style.paddingRight=`${e5(r)+e}px`;let t=Y(r).querySelectorAll(".mui-fixed");[].forEach.call(t,t=>{n.push({value:t.style.paddingRight,property:"padding-right",el:t}),t.style.paddingRight=`${e5(t)+e}px`})}if(r.parentNode instanceof DocumentFragment)e=Y(r).body;else{let t=r.parentElement,n=eb(r);e=t?.nodeName==="HTML"&&"scroll"===n.getComputedStyle(t).overflowY?t:r}n.push({value:e.style.overflow,property:"overflow",el:e},{value:e.style.overflowX,property:"overflow-x",el:e},{value:e.style.overflowY,property:"overflow-y",el:e}),e.style.overflow="hidden"}return()=>{n.forEach(({value:e,el:t,property:n})=>{e?t.style.setProperty(n,e):t.style.removeProperty(n)})}}(r,t))}remove(e,t=!0){let n=this.modals.indexOf(e);if(-1===n)return n;let r=e4(this.containers,t=>t.modals.includes(e)),a=this.containers[r];if(a.modals.splice(a.modals.indexOf(e),1),this.modals.splice(n,1),0===a.modals.length)a.restore&&a.restore(),e.modalRef&&e2(e.modalRef,t),e6(a.container,e.mount,e.modalRef,a.hiddenSiblings,!1),this.containers.splice(r,1);else{let e=a.modals[a.modals.length-1];e.modalRef&&e2(e.modalRef,!1)}return n}isTopModal(e){return this.modals.length>0&&this.modals[this.modals.length-1]===e}},e7=function(e){let{container:t,disableScrollLock:r=!1,closeAfterTransition:a=!1,onTransitionEnter:i,onTransitionExited:l,children:o,onClose:s,open:d,rootRef:c}=e,u=n.useRef({}),m=n.useRef(null),p=n.useRef(null),h=(0,X.default)(p,c),[f,g]=n.useState(!d),v=!!o&&o.props.hasOwnProperty("in"),b=!0;("false"===e["aria-hidden"]||!1===e["aria-hidden"])&&(b=!1);let x=()=>(u.current.modalRef=p.current,u.current.mount=m.current,u.current),y=()=>{e3.mount(x(),{disableScrollLock:r}),p.current&&(p.current.scrollTop=0)},j=(0,J.default)(()=>{let e=("function"==typeof t?t():t)||Y(m.current).body;e3.add(x(),e),p.current&&y()}),w=()=>e3.isTopModal(x()),N=(0,J.default)(e=>{m.current=e,e&&(d&&w()?y():p.current&&e2(p.current,b))}),E=n.useCallback(()=>{e3.remove(x(),b)},[b]);return n.useEffect(()=>()=>{E()},[E]),n.useEffect(()=>{d?j():v&&a||E()},[d,E,v,a,j]),{getRootProps:(t={})=>{let n=(0,e1.default)(e);delete n.onTransitionEnter,delete n.onTransitionExited;let r={...n,...t};return{role:"presentation",...r,onKeyDown:e=>{r.onKeyDown?.(e),"Escape"===e.key&&229!==e.which&&w()&&(e.stopPropagation(),s&&s(e,"escapeKeyDown"))},ref:h}},getBackdropProps:(e={})=>({"aria-hidden":!0,...e,onClick:t=>{e.onClick?.(t),t.target===t.currentTarget&&s&&s(t,"backdropClick")},open:d}),getTransitionProps:()=>({onEnter:e0(()=>{g(!1),i&&i()},o?.props.onEnter??e8),onExited:e0(()=>{g(!0),l&&l(),a&&E()},o?.props.onExited??e8)}),rootRef:h,portalRef:N,isTopModal:w,exited:f,hasTransition:v}};function e9(e){return(0,x.default)("MuiModal",e)}(0,b.default)("MuiModal",["root","hidden","backdrop"]);let te=(0,g.styled)("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,!n.open&&n.exited&&t.hidden]}})((0,_.default)(({theme:e})=>({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0,variants:[{props:({ownerState:e})=>!e.open&&e.exited,style:{visibility:"hidden"}}]}))),tt=(0,g.styled)(eZ,{name:"MuiModal",slot:"Backdrop"})({zIndex:-1}),tn=n.forwardRef(function(e,r){let a=(0,v.useDefaultProps)({name:"MuiModal",props:e}),{classes:i,className:l,closeAfterTransition:o=!1,children:s,container:d,component:c,disableAutoFocus:u=!1,disableEnforceFocus:m=!1,disablePortal:h=!1,disableRestoreFocus:f=!1,disableScrollLock:g=!1,hideBackdrop:b=!1,keepMounted:x=!1,onClose:y,onTransitionEnter:j,onTransitionExited:N,open:E,slotProps:k={},slots:C={},theme:T,...A}=a,S={...a,closeAfterTransition:o,disableAutoFocus:u,disableEnforceFocus:m,disablePortal:h,disableRestoreFocus:f,disableScrollLock:g,hideBackdrop:b,keepMounted:x},{getRootProps:L,getBackdropProps:_,getTransitionProps:D,portalRef:R,isTopModal:P,exited:M,hasTransition:O}=e7({...S,rootRef:r}),$={...S,exited:M},F=(e=>{let{open:t,exited:n,classes:r}=e;return(0,p.default)({root:["root",!t&&n&&"hidden"],backdrop:["backdrop"]},e9,r)})($),z={};if(void 0===s.props.tabIndex&&(z.tabIndex="-1"),O){let{onEnter:e,onExited:t}=D();z.onEnter=e,z.onExited=t}let B={slots:C,slotProps:k},[U,H]=(0,w.default)("root",{ref:r,elementType:te,externalForwardedProps:{...B,...A,component:c},getSlotProps:L,ownerState:$,className:(0,I.default)(l,F?.root,!$.open&&$.exited&&F?.hidden)}),[W,V]=(0,w.default)("backdrop",{elementType:tt,externalForwardedProps:B,shouldForwardComponentProp:!0,getSlotProps:e=>_({...e,onClick:t=>{e?.onClick&&e.onClick(t)}}),className:F?.backdrop,ownerState:$});return x||E||O&&!M?(0,t.jsx)(eY,{ref:R,container:d,disablePortal:h,children:(0,t.jsxs)(U,{...H,children:[b?null:(0,t.jsx)(W,{...V}),(0,t.jsx)(eV,{disableEnforceFocus:m,disableAutoFocus:u,disableRestoreFocus:f,isEnabled:P,open:E,children:n.cloneElement(s,z)})]})}):null});var tr=e.i(66052);function ta(e){return(0,x.default)("MuiPopover",e)}(0,b.default)("MuiPopover",["root","paper"]);var ti=e.i(92886);function tl(e,t){let n=0;return"number"==typeof t?n=t:"center"===t?n=e.height/2:"bottom"===t&&(n=e.height),n}function to(e,t){let n=0;return"number"==typeof t?n=t:"center"===t?n=e.width/2:"right"===t&&(n=e.width),n}function ts(e){return[e.horizontal,e.vertical].map(e=>"number"==typeof e?`${e}px`:e).join(" ")}function td(e){return"function"==typeof e?e():e}let tc=(0,g.styled)(tn,{name:"MuiPopover",slot:"Root"})({}),tu=(0,g.styled)(tr.default,{name:"MuiPopover",slot:"Paper"})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),tm=n.forwardRef(function(e,r){let a=(0,v.useDefaultProps)({props:e,name:"MuiPopover"}),{action:i,anchorEl:l,anchorOrigin:o={vertical:"top",horizontal:"left"},anchorPosition:s,anchorReference:d="anchorEl",children:c,className:u,container:m,disableAutoFocus:h=!1,elevation:f=8,marginThreshold:g=16,open:b,slots:x={},slotProps:y={},transformOrigin:j={vertical:"top",horizontal:"left"},transitionDuration:N="auto",disableScrollLock:E=!1,...k}=a,C=n.useRef(),T={...a,anchorOrigin:o,anchorReference:d,elevation:f,marginThreshold:g,transformOrigin:j,transitionDuration:N},A=(e=>{let{classes:t}=e;return(0,p.default)({root:["root"],paper:["paper"]},ta,t)})(T),S=n.useCallback(()=>{if("anchorPosition"===d)return s;let e=td(l),t=(e&&1===e.nodeType?e:Y(C.current).body).getBoundingClientRect();return{top:t.top+tl(t,o.vertical),left:t.left+to(t,o.horizontal)}},[l,o.horizontal,o.vertical,s,d]),L=n.useCallback(e=>({vertical:tl(e,j.vertical),horizontal:to(e,j.horizontal)}),[j.horizontal,j.vertical]),_=n.useCallback(e=>{let t={width:e.offsetWidth,height:e.offsetHeight},n=L(t);if("none"===d)return{top:null,left:null,transformOrigin:ts(n)};let r=S(),a=r.top-n.vertical,i=r.left-n.horizontal,o=a+t.height,s=i+t.width,c=eb(td(l)),u=c.innerHeight-g,m=c.innerWidth-g;if(null!=g&&a<g){let e=a-g;a-=e,n.vertical+=e}else if(null!=g&&o>u){let e=o-u;a-=e,n.vertical+=e}if(null!=g&&i<g){let e=i-g;i-=e,n.horizontal+=e}else if(s>m){let e=s-m;i-=e,n.horizontal+=e}return{top:`${Math.round(a)}px`,left:`${Math.round(i)}px`,transformOrigin:ts(n)}},[l,d,S,L,g]),[D,R]=n.useState(b),P=n.useCallback(()=>{let e=C.current;if(!e)return;let t=_(e);null!=t.top&&e.style.setProperty("top",t.top),null!=t.left&&(e.style.left=t.left),e.style.transformOrigin=t.transformOrigin,R(!0)},[_]);n.useEffect(()=>(E&&window.addEventListener("scroll",P),()=>window.removeEventListener("scroll",P)),[l,E,P]),n.useEffect(()=>{b&&P()}),n.useImperativeHandle(i,()=>b?{updatePosition:()=>{P()}}:null,[b,P]),n.useEffect(()=>{if(!b)return;let e=eS(()=>{P()}),t=eb(td(l));return t.addEventListener("resize",e),()=>{e.clear(),t.removeEventListener("resize",e)}},[l,b,P]);let M=N,O={slots:x,slotProps:y},[$,F]=(0,w.default)("transition",{elementType:eF,externalForwardedProps:O,ownerState:T,getSlotProps:e=>({...e,onEntering:(t,n)=>{e.onEntering?.(t,n),P()},onExited:t=>{e.onExited?.(t),R(!1)}}),additionalProps:{appear:!0,in:b}});"auto"!==N||$.muiSupportAuto||(M=void 0);let z=m||(l?Y(td(l)).body:void 0),[B,{slots:U,slotProps:H,...W}]=(0,w.default)("root",{ref:r,elementType:tc,externalForwardedProps:{...O,...k},shouldForwardComponentProp:!0,additionalProps:{slots:{backdrop:x.backdrop},slotProps:{backdrop:function(e,t){if(!e)return t;function n(e,t){let n={};return Object.keys(t).forEach(r=>{(0,ti.default)(r,t[r])&&"function"==typeof e[r]&&(n[r]=(...n)=>{e[r](...n),t[r](...n)})}),n}if("function"==typeof e||"function"==typeof t)return r=>{let a="function"==typeof t?t(r):t,i="function"==typeof e?e({...r,...a}):e,l=(0,I.default)(r?.className,a?.className,i?.className),o=n(i,a);return{...a,...i,...o,...!!l&&{className:l},...a?.style&&i?.style&&{style:{...a.style,...i.style}},...a?.sx&&i?.sx&&{sx:[...Array.isArray(a.sx)?a.sx:[a.sx],...Array.isArray(i.sx)?i.sx:[i.sx]]}}};let r=n(e,t),a=(0,I.default)(t?.className,e?.className);return{...t,...e,...r,...!!a&&{className:a},...t?.style&&e?.style&&{style:{...t.style,...e.style}},...t?.sx&&e?.sx&&{sx:[...Array.isArray(t.sx)?t.sx:[t.sx],...Array.isArray(e.sx)?e.sx:[e.sx]]}}}("function"==typeof y.backdrop?y.backdrop(T):y.backdrop,{invisible:!0})},container:z,open:b},ownerState:T,className:(0,I.default)(A.root,u)}),[V,G]=(0,w.default)("paper",{ref:C,className:A.paper,elementType:tu,externalForwardedProps:O,shouldForwardComponentProp:!0,additionalProps:{elevation:f,style:D?void 0:{opacity:0}},ownerState:T});return(0,t.jsx)(B,{...W,...!(0,eA.default)(B)&&{slots:U,slotProps:H,disableAutoFocus:h,disableScrollLock:E},children:(0,t.jsx)($,{...F,timeout:M,children:(0,t.jsx)(V,{...G,children:c})})})});var tp=e.i(34997);function th(e){return(0,x.default)("MuiMenu",e)}(0,b.default)("MuiMenu",["root","paper","list"]);let tf={vertical:"top",horizontal:"right"},tg={vertical:"top",horizontal:"left"},tv=(0,g.styled)(tm,{shouldForwardProp:e=>(0,tp.default)(e)||"classes"===e,name:"MuiMenu",slot:"Root"})({}),tb=(0,g.styled)(tu,{name:"MuiMenu",slot:"Paper"})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),tx=(0,g.styled)(eT,{name:"MuiMenu",slot:"List"})({outline:0}),ty=n.forwardRef(function(e,r){let a=(0,v.useDefaultProps)({props:e,name:"MuiMenu"}),{autoFocus:i=!0,children:l,className:o,disableAutoFocusItem:s=!1,onClose:d,open:c,PopoverClasses:u,transitionDuration:m="auto",variant:h="selectedMenu",slots:f={},slotProps:g={},...b}=a,x=(0,H.useRtl)(),y={...a,autoFocus:i,disableAutoFocusItem:s,transitionDuration:m,variant:h},j=(e=>{let{classes:t}=e;return(0,p.default)({root:["root"],paper:["paper"],list:["list"]},th,t)})(y),N=i&&c,E=N&&!s,k=n.useRef(null),C={slots:f,slotProps:g},T=(0,W.default)({elementType:f.root,externalSlotProps:g.root,ownerState:y,className:[j.root,o]}),[A,S]=(0,w.default)("paper",{className:j.paper,elementType:tb,externalForwardedProps:C,shouldForwardComponentProp:!0,ownerState:y}),[I,L]=(0,w.default)("list",{className:j.list,elementType:tx,shouldForwardComponentProp:!0,externalForwardedProps:C,getSlotProps:e=>({...e,onKeyDown:t=>{"Tab"===t.key&&(t.preventDefault(),d&&d(t,"tabKeyDown")),e.onKeyDown?.(t)}}),ownerState:y}),_="function"==typeof g.transition?g.transition(y):g.transition;return(0,t.jsx)(tv,{disableAutoFocus:i,onClose:d,anchorOrigin:{vertical:"bottom",horizontal:x?"right":"left"},transformOrigin:x?tf:tg,slots:{root:f.root,paper:A,backdrop:f.backdrop,transition:f.transition},slotProps:{root:T,paper:S,backdrop:"function"==typeof g.backdrop?g.backdrop(y):g.backdrop,transition:{..._,onEntering:(...e)=>{((e,t)=>{k.current&&(k.current.adjustStyleForScrollbar(e,{direction:x?"rtl":"ltr"}),N&&k.current.focusInitialTarget?.())})(...e),_?.onEntering?.(...e)}}},open:c,ref:r,transitionDuration:m,ownerState:y,...b,classes:u,children:(0,t.jsx)(I,{actions:k,autoFocus:N,autoFocusItem:E,variant:h,...L,children:l})})});var tj=e.i(59596);let tw=(0,b.default)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","vertical","withChildren","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);function tN(e){return(0,x.default)("MuiListItemIcon",e)}let tE=(0,b.default)("MuiListItemIcon",["root","alignItemsFlexStart"]);function tk(e){return(0,x.default)("MuiListItemText",e)}let tC=(0,b.default)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);function tT(e){return(0,x.default)("MuiMenuItem",e)}let tA=(0,b.default)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),tS=(0,g.styled)(R.default,{shouldForwardProp:e=>(0,tp.default)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,n.dense&&t.dense,n.divider&&t.divider,!n.disableGutters&&t.gutters]}})((0,_.default)(({theme:e})=>({...e.typography.body1,display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap","&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${tA.selected}`]:{backgroundColor:e.alpha((e.vars||e).palette.primary.main,(e.vars||e).palette.action.selectedOpacity),[`&.${tA.focusVisible}`]:{backgroundColor:e.alpha((e.vars||e).palette.primary.main,`${(e.vars||e).palette.action.selectedOpacity} + ${(e.vars||e).palette.action.focusOpacity}`)}},[`&.${tA.selected}:hover`]:{backgroundColor:e.alpha((e.vars||e).palette.primary.main,`${(e.vars||e).palette.action.selectedOpacity} + ${(e.vars||e).palette.action.hoverOpacity}`),"@media (hover: none)":{backgroundColor:e.alpha((e.vars||e).palette.primary.main,(e.vars||e).palette.action.selectedOpacity)}},[`&.${tA.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${tA.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${tw.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${tw.inset}`]:{marginLeft:52},[`& .${tC.root}`]:{marginTop:0,marginBottom:0},[`& .${tC.inset}`]:{paddingLeft:36},[`& .${tE.root}`]:{minWidth:36},variants:[{props:({ownerState:e})=>!e.disableGutters,style:{paddingLeft:16,paddingRight:16}},{props:({ownerState:e})=>e.divider,style:{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"}},{props:({ownerState:e})=>!e.dense,style:{[e.breakpoints.up("sm")]:{minHeight:"auto"}}},{props:({ownerState:e})=>e.dense,style:{minHeight:32,paddingTop:4,paddingBottom:4,...e.typography.body2,[`& .${tE.root} svg`]:{fontSize:"1.25rem"}}}]}))),tI=n.forwardRef(function(e,r){let a,i=(0,v.useDefaultProps)({props:e,name:"MuiMenuItem"}),{autoFocus:l=!1,component:o="li",dense:s=!1,divider:d=!1,disableGutters:c=!1,focusVisibleClassName:u,role:m="menuitem",tabIndex:h,className:f,...g}=i,b=eE(),x=n.useContext(ex),y=n.useMemo(()=>({dense:s||x.dense||!1,disableGutters:c}),[x.dense,s,c]),j=function(){let e=n.useContext(ek);if(void 0===e)throw Error("MUI: MenuListContext is missing. MenuItems must be placed within Menu or MenuList.");return e}(),w=(0,tj.default)(),N=j.suppressInitialFocusVisible,E=j.itemsFocusableWhenDisabled,k=n.useRef(null);ev(()=>{l&&k.current&&eh(k.current,b)},[l]);let C={...i,dense:y.dense,divider:d,disableGutters:c},T=(e=>{let{disabled:t,dense:n,divider:r,disableGutters:a,selected:i,classes:l}=e,o=(0,p.default)({root:["root",n&&"dense",t&&"disabled",!a&&"gutters",r&&"divider",i&&"selected"]},tT,l);return{...l,...o}})(i),{root:A,...S}=T,L=function(e){let{activeItemId:t,registerItem:r,unregisterItem:a}=function(){let e=n.useContext(Q);if(void 0===e)throw Error("MUI: RovingTabIndexContext is missing. Roving tab index items must be placed within a roving tab index provider.");return e}(),i=n.useRef(null),l=n.useMemo(()=>({disabled:e.disabled??!1,element:null,focusableWhenDisabled:e.focusableWhenDisabled??!1,id:e.id,selected:e.selected??!1,textValue:e.textValue}),[e.disabled,e.focusableWhenDisabled,e.id,e.selected,e.textValue]),o=n.useRef(l);o.current=l;let s=n.useCallback(t=>{(i.current=t,null==t)?queueMicrotask(()=>{null==i.current&&a(e.id)}):r({...o.current,element:t})},[e.id,r,a]),d=(0,X.default)(e.ref,s);return(0,q.default)(()=>{i.current&&r({...l,element:i.current})},[l,r]),(0,q.default)(()=>{let t=e.id;return()=>{a(t)}},[e.id,a]),{ref:d,tabIndex:t===e.id?0:-1}}({id:w,ref:r,disabled:i.disabled,focusableWhenDisabled:E,selected:i.selected}),_=(0,eg.default)(k,L.ref);return void 0!==h?a=h:"selectedMenu"===j.variant?a=L.tabIndex:(!i.disabled||E)&&(a=-1),(0,t.jsx)(ex.Provider,{value:y,children:(0,t.jsx)(tS,{ref:_,role:m,tabIndex:a,component:o,internalNativeButton:!1,focusableWhenDisabled:E,suppressFocusVisible:N,focusVisibleClassName:(0,I.default)(T.focusVisible,u),className:(0,I.default)(T.root,f),...g,ownerState:C,classes:S})})}),tL=(0,g.styled)("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,"flex-start"===n.alignItems&&t.alignItemsFlexStart]}})((0,_.default)(({theme:e})=>({minWidth:e.spacing(4.5),color:(e.vars||e).palette.action.active,flexShrink:0,display:"inline-flex",variants:[{props:{alignItems:"flex-start"},style:{marginTop:8}}]}))),t_=n.forwardRef(function(e,r){let a=(0,v.useDefaultProps)({props:e,name:"MuiListItemIcon"}),{className:i,...l}=a,o=n.useContext(ex),s={...a,alignItems:o.alignItems},d=(e=>{let{alignItems:t,classes:n}=e;return(0,p.default)({root:["root","flex-start"===t&&"alignItemsFlexStart"]},tN,n)})(s);return(0,t.jsx)(tL,{className:(0,I.default)(d.root,i),ownerState:s,ref:r,...l})});var f=f;let tD=(0,g.styled)("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[{[`& .${tC.primary}`]:t.primary},{[`& .${tC.secondary}`]:t.secondary},t.root,n.inset&&t.inset,n.primary&&n.secondary&&t.multiline,n.dense&&t.dense]}})({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4,[`.${f.default.root}:where(& .${tC.primary})`]:{display:"block"},[`.${f.default.root}:where(& .${tC.secondary})`]:{display:"block"},variants:[{props:({ownerState:e})=>e.primary&&e.secondary,style:{marginTop:6,marginBottom:6}},{props:({ownerState:e})=>e.inset,style:{paddingLeft:56}}]}),tR=n.forwardRef(function(e,r){let a=(0,v.useDefaultProps)({props:e,name:"MuiListItemText"}),{children:i,className:l,disableTypography:o=!1,inset:s=!1,primary:d,secondary:c,slots:u={},slotProps:m={},...f}=a,{dense:g}=n.useContext(ex),b=null!=d?d:i,x=c,y={...a,disableTypography:o,inset:s,primary:!!b,secondary:!!x,dense:g},j=(e=>{let{classes:t,inset:n,primary:r,secondary:a,dense:i}=e;return(0,p.default)({root:["root",n&&"inset",i&&"dense",r&&a&&"multiline"],primary:["primary"],secondary:["secondary"]},tk,t)})(y),N={slots:u,slotProps:m},[E,k]=(0,w.default)("root",{className:(0,I.default)(j.root,l),elementType:tD,externalForwardedProps:{...N,...f},ownerState:y,ref:r}),[C,T]=(0,w.default)("primary",{className:j.primary,elementType:h.default,externalForwardedProps:N,ownerState:y}),[A,S]=(0,w.default)("secondary",{className:j.secondary,elementType:h.default,externalForwardedProps:N,ownerState:y});return null==b||b.type===h.default||o||(b=(0,t.jsx)(C,{variant:g?"body2":"body1",component:T?.variant?void 0:"span",...T,children:b})),null==x||x.type===h.default||o||(x=(0,t.jsx)(A,{variant:"body2",color:"textSecondary",...S,children:x})),(0,t.jsxs)(E,{...k,children:[b,x]})});var tP=e.i(5573),tM=e.i(36729);let tO={height:"100%",display:"flex",flexDirection:"column",boxShadow:"0 12px 48px rgba(15, 23, 42, 0.1)",border:"1px solid rgba(15, 23, 42, 0.06)",transition:"transform 0.3s ease, box-shadow 0.3s ease","&:hover":{transform:"translateY(-4px)",boxShadow:"0 24px 64px rgba(37, 99, 235, 0.15)"}};function t$(){return(0,t.jsxs)("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":!0,children:[(0,t.jsx)("circle",{cx:"12",cy:"5",r:"2"}),(0,t.jsx)("circle",{cx:"12",cy:"12",r:"2"}),(0,t.jsx)("circle",{cx:"12",cy:"19",r:"2"})]})}function tF(){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,children:[(0,t.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,t.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}function tz(){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,children:[(0,t.jsx)("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M10 11v6M14 11v6",strokeLinecap:"round"})]})}function tB(e){let{name:r,categoryName:a,description:i,photoSrc:l,approved:o,disabled:d,onEdit:c,onDelete:u,onApprovedChange:p}=e,[f,g]=n.default.useState(null),v=!!f,b=r.slice(0,2).toUpperCase(),x=()=>g(null);return(0,t.jsxs)(m.default,{sx:tO,children:[(0,t.jsx)(T,{title:r,subheader:a,titleTypographyProps:{fontWeight:800,fontSize:"1rem",lineHeight:1.3,sx:{display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}},subheaderTypographyProps:{fontSize:"0.8rem"},action:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(U,{"aria-label":`Actions for ${r}`,"aria-haspopup":"true","aria-expanded":v?"true":void 0,onClick:e=>g(e.currentTarget),size:"small",children:(0,t.jsx)(t$,{})}),(0,t.jsxs)(ty,{anchorEl:f,open:v,onClose:x,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:[(0,t.jsxs)(tI,{onClick:()=>{x(),c()},children:[(0,t.jsx)(t_,{children:(0,t.jsx)(tF,{})}),(0,t.jsx)(tR,{children:"Edit nominee"})]}),(0,t.jsxs)(tI,{onClick:()=>{x(),u()},disabled:d,sx:{color:"error.main"},children:[(0,t.jsx)(t_,{sx:{color:"error.main"},children:(0,t.jsx)(tz,{})}),(0,t.jsx)(tR,{children:"Delete nominee"})]})]})]}),sx:{alignItems:"flex-start","& .MuiCardHeader-action":{m:0}}}),l?(0,t.jsx)(A.default,{component:"img",height:"160",image:l,alt:"",sx:{objectFit:"cover"}}):(0,t.jsx)(tM.default,{sx:{height:160,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,fontWeight:800,color:"rgba(37, 99, 235, 0.35)",background:"radial-gradient(circle at 30% 30%, rgba(37, 99, 235, 0.12), transparent 50%), radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.1), transparent 45%), #fff"},"aria-hidden":!0,children:b}),(0,t.jsxs)(S.default,{sx:{flex:1,pt:1.5,pb:2},children:[(0,t.jsx)(h.default,{variant:"body2",sx:{color:"text.secondary",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden",minHeight:"3.6em"},children:i?.trim()||"No description"}),(0,t.jsxs)(tM.default,{sx:{display:"flex",alignItems:"center",gap:1.25,mt:1.5,flexWrap:"wrap"},children:[(0,t.jsx)(tP.default,{label:o?"Approved":"Pending",size:"small",color:o?"success":"warning",variant:"outlined"}),(0,t.jsxs)("label",{className:s.default.adminApproveSwitch,title:o?"Unapprove nominee":"Approve nominee",style:{margin:0},children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:o,disabled:d,onChange:e=>p(e.target.checked),"aria-label":o?`Unapprove ${r}`:`Approve ${r}`}),(0,t.jsx)("span",{className:s.default.adminApproveTrack,"aria-hidden":!0})]})]})]})]})}function tU(e){return!0===e.show_nominee||1===e.show_nominee}function tH(e){return!0===e.declare_result||1===e.declare_result}function tW(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,t.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}function tV(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M10 11v6M14 11v6",strokeLinecap:"round"})]})}let tG=()=>({name:"",photo:"",description:"",category_id:0});function tY(e){let r,a,{mode:l,eventId:c,eventTitle:m,apiBase:p,apiOrigin:h,token:f,onBack:g,onGoList:v,onGoCategories:b,onEventDeclareResultChange:x}=e,[y,j]=n.default.useState([]),[w,N]=n.default.useState([]),[E,k]=n.default.useState(!1),[C,T]=n.default.useState(null),[A,S]=n.default.useState(null),[I,L]=n.default.useState(""),[_,D]=n.default.useState(null),[R,P]=n.default.useState(tG),[M,O]=n.default.useState("all"),[$,F]=n.default.useState(""),[z,B]=n.default.useState(null),[U,H]=n.default.useState(!1),[W,V]=n.default.useState(null),[G,Y]=n.default.useState(null),K=n.default.useMemo(()=>{let e=new Map;for(let t of y)e.set(t.category_id,t);return e},[y]),q=n.default.useCallback(async()=>{k(!0),T(null);try{let e=(0,i.adminAuthHeader)(f),[t,n]=await Promise.all([fetch(`${p}/categories?eventId=${c}`),fetch(`${p}/nominees?eventId=${c}`,{headers:{...e}})]),r=await t.json().catch(()=>null),a=await n.json().catch(()=>null);if(!t.ok)throw Error(r?.error||"CATEGORIES_FAILED");if(!n.ok)throw Error(a?.error||"NOMINEES_FAILED");let l=Array.isArray(r?.categories)?r.categories:[],o=l.some(e=>e?.event_id!=null&&Number.isFinite(Number(e.event_id)))?l.filter(e=>Number(e?.event_id)===c):l;j(o),N(Array.isArray(a?.nominees)?a.nominees:[])}catch(e){T(e instanceof Error?e.message:"ADMIN_LOAD_FAILED")}finally{k(!1)}},[c,p,f]);n.default.useEffect(()=>{q()},[q]);let J=n.default.useMemo(()=>{let e=$.trim().toLowerCase();return w.filter(t=>{if("all"!==M&&Number(t.category_id)!==M)return!1;if(!e)return!0;let n=(K.get(Number(t.category_id))?.name||"").toLowerCase(),r=(t.name||"").toLowerCase(),a=(t.description||"").toLowerCase();return r.includes(e)||a.includes(e)||n.includes(e)}).slice().sort((e,t)=>Number(e.category_id)-Number(t.category_id)||Number(e.nominee_id)-Number(t.nominee_id))},[w,M,$,K]),X=n.default.useCallback(()=>{B(e=>(e&&URL.revokeObjectURL(e),null))},[]);function Q(){S(null),L("")}function Z(){X(),D(null),P(tG())}async function ee(){let e=I.trim();if(e){k(!0),T(null);try{if(A?.mode==="add"){let t=await fetch(`${p}/admin/categories`,{method:"POST",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(f)},body:JSON.stringify({name:e,eventId:c})}),n=await t.json().catch(()=>null);if(!t.ok)throw Error(n?.error||"CREATE_CATEGORY_FAILED")}else if(A?.mode==="edit"){let t=await fetch(`${p}/admin/categories/${A.categoryId}?eventId=${c}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(f)},body:JSON.stringify({name:e})}),n=await t.json().catch(()=>null);if(!t.ok)throw Error(n?.error||"UPDATE_CATEGORY_FAILED")}Q(),await q()}catch(e){T(e instanceof Error?e.message:"SAVE_CATEGORY_FAILED")}finally{k(!1)}}}async function et(e,t){let n=t.trim()||"this category";if(window.confirm(`Delete "${n}" and all its nominees? This cannot be undone.`)){k(!0),T(null);try{let t=await fetch(`${p}/admin/categories/${e}?eventId=${c}`,{method:"DELETE",headers:{...(0,i.adminAuthHeader)(f)}}),n=await t.json().catch(()=>null);if(!t.ok)throw Error(n?.error||"DELETE_CATEGORY_FAILED");A?.mode==="edit"&&A.categoryId===e&&Q(),await q()}catch(e){T(e instanceof Error?e.message:"DELETE_CATEGORY_FAILED")}finally{k(!1)}}}async function en(){let e=R.name.trim();if(e&&R.category_id){k(!0),T(null);try{if(_?.mode==="add"){let t=await fetch(`${p}/admin/nominees?eventId=${c}`,{method:"POST",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(f)},body:JSON.stringify({name:e,photo:R.photo.trim(),description:R.description.trim()||void 0,category_id:R.category_id})}),n=await t.json().catch(()=>null);if(!t.ok)throw Error(n?.error||"SAVE_NOMINEE_FAILED")}else if(_?.mode==="edit"){let t=await fetch(`${p}/admin/nominees/${_.nomineeId}?eventId=${c}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(f)},body:JSON.stringify({name:e,photo:R.photo.trim(),description:R.description.trim()||null,category_id:R.category_id})}),n=await t.json().catch(()=>null);if(!t.ok)throw Error(n?.error||"SAVE_NOMINEE_FAILED")}Z(),await q()}catch(e){T(e instanceof Error?e.message:"SAVE_NOMINEE_FAILED")}finally{k(!1)}}}async function er(e,t){let n=t.trim()||"this nominee";if(window.confirm(`Delete "${n}"? Votes for this nominee will be removed.`)){k(!0),T(null);try{let t=await fetch(`${p}/admin/nominees/${e}?eventId=${c}`,{method:"DELETE",headers:{...(0,i.adminAuthHeader)(f)}}),n=await t.json().catch(()=>null);if(!t.ok)throw Error(n?.error||"DELETE_NOMINEE_FAILED");_?.mode==="edit"&&_.nomineeId===e&&Z(),await q()}catch(e){T(e instanceof Error?e.message:"DELETE_NOMINEE_FAILED")}finally{k(!1)}}}async function ea(e,t){V(e.category_id),T(null);try{let n=await fetch(`${p}/admin/categories/${e.category_id}?eventId=${c}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(f)},body:JSON.stringify({show_nominee:+!!t})}),r=await n.json().catch(()=>null);if(!n.ok)throw Error(r?.error||"UPDATE_CATEGORY_FAILED");j(n=>n.map(n=>n.category_id===e.category_id?{...n,show_nominee:+!!t}:n))}catch(e){T(e instanceof Error?e.message:"UPDATE_CATEGORY_FAILED")}finally{V(null)}}async function ei(e,t){Y(e.category_id),T(null);try{let n=await fetch(`${p}/admin/categories/${e.category_id}?eventId=${c}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(f)},body:JSON.stringify({declare_result:+!!t})}),r=await n.json().catch(()=>null);if(!n.ok)throw Error(r?.error||"UPDATE_CATEGORY_FAILED");let a=r?.category;j(n=>n.map(n=>n.category_id===e.category_id?a?{...n,...a}:{...n,declare_result:+!!t,winner_nominee_id:t?n.winner_nominee_id:null}:n)),t||x?.(!1)}catch(e){T(e instanceof Error?e.message:"UPDATE_CATEGORY_FAILED")}finally{Y(null)}}async function el(e,t){k(!0),T(null);try{let n=await fetch(`${p}/admin/nominees/${e.nominee_id}?eventId=${c}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(f)},body:JSON.stringify({is_approved:+!!t})}),r=await n.json().catch(()=>null);if(!n.ok)throw Error(r?.error||"APPROVAL_UPDATE_FAILED");await q()}catch(e){T(e instanceof Error?e.message:"APPROVAL_UPDATE_FAILED")}finally{k(!1)}}async function eo(e){H(!0),T(null);try{let t=new FormData;t.append("photo",e);let n=await fetch(`${p}/uploads/nominee-photo`,{method:"POST",body:t}),r=await n.json().catch(()=>null);if(!n.ok)throw Error(r?.error||"PHOTO_UPLOAD_FAILED");let a=String(r?.filename||"");if(!a)throw Error("PHOTO_UPLOAD_FAILED");X(),P(e=>({...e,photo:a}))}catch(e){T(e instanceof Error?e.message:"PHOTO_UPLOAD_FAILED")}finally{H(!1)}}n.default.useEffect(()=>()=>X(),[X]);let es=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Category *"}),(0,t.jsx)("select",{className:"input",value:R.category_id||"",onChange:e=>P(t=>({...t,category_id:Number(e.target.value)})),disabled:E||0===y.length,required:!0,children:0===y.length?(0,t.jsx)("option",{value:"",children:"No categories — add one first"}):y.map(e=>(0,t.jsx)("option",{value:e.category_id,children:e.name},e.category_id))})]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Name *"}),(0,t.jsx)("input",{className:"input",value:R.name,onChange:e=>P(t=>({...t,name:e.target.value})),placeholder:"Nominee name",disabled:E})]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Photo"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",onChange:e=>{let t=e.currentTarget.files?.[0];t&&(B(e=>(e&&URL.revokeObjectURL(e),URL.createObjectURL(t))),eo(t))},disabled:E||U}),U?(0,t.jsx)("p",{className:"hint",style:{marginTop:8},children:"Uploading…"}):null,(r=R.photo.trim()?(0,o.resolveNomineePhotoUrl)(h,R.photo):"",(a=z||r)?(0,t.jsx)("div",{style:{marginTop:10},children:(0,t.jsx)("img",{className:s.default.previewPhoto,src:a,alt:""})}):null)]}),(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("div",{className:"label",children:"Description (optional)"}),(0,t.jsx)("textarea",{className:"input",value:R.description,onChange:e=>P(t=>({...t,description:e.target.value})),placeholder:"Short description",style:{minHeight:88,resize:"vertical"},disabled:E})]})]});return(0,t.jsxs)("div",{className:"panel",style:{marginBottom:"2rem"},children:[(0,t.jsx)("div",{className:"back-row",style:{marginBottom:"1rem"},children:(0,t.jsx)(d.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:v??g},{label:m,onClick:g},{label:"categories"===l?"Categories":"Nominees"}]})}),(0,t.jsxs)("div",{className:s.default.adminCatToolbar,style:{marginBottom:14},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"panel-title",style:{marginBottom:4},children:"categories"===l?"Categories":"Nominees"}),(0,t.jsx)("p",{style:{fontSize:13,color:"var(--text-muted)",margin:0},children:m})]}),(0,t.jsx)("span",{style:{fontSize:13,color:"var(--text-faint)"},children:E?"Loading…":"categories"===l?`${y.length} categories`:`${J.length}${"all"!==M||$.trim()?` of ${w.length}`:""} nominees`})]}),C?(0,t.jsx)("div",{className:"error-box",style:{marginBottom:12},children:C}):null,"categories"===l?(0,t.jsxs)("div",{className:s.default.adminCategoriesBlock,style:{marginTop:0},children:[(0,t.jsxs)("div",{className:s.default.adminCatToolbar,children:[(0,t.jsx)("span",{className:"section-title",style:{marginBottom:0,fontSize:13,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--text-muted)"},children:"All categories"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:function(){L(""),S({mode:"add"})},disabled:E,children:"Add category"})]}),0!==y.length||E?null:(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"1rem 0"},children:"No categories yet — use Add category."}),(0,t.jsx)("div",{className:s.default.adminCategoryList,children:y.map(e=>(0,t.jsx)("div",{className:s.default.adminCategoryRow,children:(0,t.jsxs)("div",{className:s.default.adminCategoryRowMain,children:[(0,t.jsxs)("div",{className:s.default.adminRowIconGroup,children:[(0,t.jsx)("button",{type:"button",className:s.default.adminIconBtnNeutral,onClick:()=>{L(e.name||""),S({mode:"edit",categoryId:e.category_id})},"aria-label":"Edit category",title:"Edit category",children:(0,t.jsx)(tW,{})}),(0,t.jsx)("button",{type:"button",className:s.default.adminIconBtnDanger,onClick:()=>void et(e.category_id,e.name),disabled:E,"aria-label":`Delete ${e.name}`,title:"Delete category",children:(0,t.jsx)(tV,{})})]}),(0,t.jsxs)("div",{className:s.default.adminCategoryTitleWrap,children:[(0,t.jsx)("span",{style:{fontSize:15,fontWeight:600,whiteSpace:"normal"},children:e.name}),e.winner_nominee_id?(0,t.jsx)("span",{className:"event-badge badge-public",style:{marginLeft:8},children:"Winner set"}):null]}),(0,t.jsxs)("label",{className:s.default.adminApproveSwitch,title:tU(e)?"Nominees visible on screen":"Nominees hidden on screen",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:tU(e),disabled:W===e.category_id||E,onChange:t=>void ea(e,t.target.checked),"aria-label":tU(e)?"Hide nominees on screen":"Show nominees on screen"}),(0,t.jsx)("span",{className:s.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:"Show nominee"})]}),(0,t.jsxs)("label",{className:s.default.adminApproveSwitch,title:tH(e)?"Result declared":"Result not declared",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:tH(e),disabled:G===e.category_id||E,onChange:t=>void ei(e,t.target.checked),"aria-label":tH(e)?"Undeclare category result":"Declare category result"}),(0,t.jsx)("span",{className:s.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:"Declare result"})]})]})},e.category_id))})]}):(0,t.jsx)("div",{className:s.default.adminCategoriesBlock,style:{marginTop:0},children:0!==y.length||E?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:s.default.adminNomineeToolbar,children:[(0,t.jsx)("input",{className:`input ${s.default.adminNomineeToolbarSearch}`,type:"search",placeholder:"Search nominees…",value:$,onChange:e=>F(e.target.value),"aria-label":"Search nominees"}),(0,t.jsxs)("select",{className:`input ${s.default.adminNomineeToolbarSelect}`,value:"all"===M?"all":String(M),onChange:e=>{let t=e.target.value;O("all"===t?"all":Number(t))},"aria-label":"Filter by category",children:[(0,t.jsx)("option",{value:"all",children:"All categories"}),y.map(e=>(0,t.jsx)("option",{value:e.category_id,children:e.name},e.category_id))]}),(0,t.jsx)("button",{type:"button",className:`btn ${s.default.adminNomineeToolbarAdd}`,onClick:function(){X();let e=y[0]?.category_id??0;P({...tG(),category_id:e}),D({mode:"add"})},disabled:E,children:"Add nominee"})]}),0!==J.length||E?(0,t.jsx)(tM.default,{sx:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:2},children:J.map(e=>{let n=(0,o.resolveNomineePhotoUrl)(h,e.photo),r=K.get(Number(e.category_id))?.name||"Category",a=!0===e.is_approved||1===e.is_approved;return(0,t.jsx)(tB,{name:e.name,categoryName:r,description:e.description,photoSrc:n,approved:a,disabled:E,onEdit:()=>{X(),P({name:e.name||"",photo:e.photo||"",description:e.description||"",category_id:Number(e.category_id)}),D({mode:"edit",nomineeId:e.nominee_id})},onDelete:()=>void er(e.nominee_id,e.name),onApprovedChange:t=>void el(e,t)},e.nominee_id)})}):(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"1rem 0"},children:0===w.length?"No nominees yet — use Add nominee.":"No nominees match your search or filter."})]}):(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"0.5rem 0 1rem"},children:"Add categories first, then add nominees."}),b?(0,t.jsx)("button",{type:"button",className:"btn",onClick:b,children:"Go to categories"}):null]})}),A?(0,t.jsx)(u,{title:"add"===A.mode?"Add category":"Edit category",onClose:Q,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:Q,disabled:E,children:"Cancel"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:()=>void ee(),disabled:E||!I.trim(),children:"add"===A.mode?"Add category":"Save changes"})]}),children:(0,t.jsxs)("div",{className:"field",style:{marginBottom:0},children:[(0,t.jsx)("div",{className:"label",children:"Category name *"}),(0,t.jsx)("input",{className:"input",value:I,onChange:e=>L(e.target.value),placeholder:"Category name",disabled:E,onKeyDown:e=>{"Enter"===e.key&&ee()}})]})}):null,_?(0,t.jsx)(u,{wide:!0,title:"add"===_.mode?"Add nominee":"Edit nominee",onClose:Z,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:Z,disabled:E,children:"Cancel"}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:()=>void en(),disabled:E||!R.name.trim()||!R.category_id,children:"add"===_.mode?"Add nominee":"Save changes"})]}),children:es}):null]})}function tK(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,t.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}function tq(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M10 11v6M14 11v6",strokeLinecap:"round"})]})}function tJ(e){let{eventId:r,eventTitle:a,apiBase:l,token:o,onBack:c,onGoList:m}=e,[p,h]=n.default.useState([]),[f,g]=n.default.useState(!1),[v,b]=n.default.useState(!1),[x,y]=n.default.useState(null),[j,w]=n.default.useState(null),[N,E]=n.default.useState(""),[k,C]=n.default.useState(null),[T,A]=n.default.useState(""),[S,I]=n.default.useState(""),L=n.default.useRef(null),_=n.default.useCallback(async()=>{g(!0),y(null);try{let e=await fetch(`${l}/admin/events/${r}/allowed-mobiles`,{headers:{...(0,i.adminAuthHeader)(o)}}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"LOAD_FAILED");h(Array.isArray(t?.allowed_mobiles)?t.allowed_mobiles:[])}catch(e){y(e instanceof Error?e.message:"LOAD_FAILED")}finally{g(!1)}},[l,r,o]);n.default.useEffect(()=>{_()},[_]);let D=n.default.useMemo(()=>{let e=N.trim().toLowerCase();return e?p.filter(t=>{let n=(t.mobile||"").toLowerCase(),r=(t.note||"").toLowerCase();return n.includes(e)||r.includes(e)}):p},[p,N]);function R(){C(null),A(""),I("")}async function P(){let e=T.trim();if(e){g(!0),y(null),w(null);try{if(k?.mode==="add"){let t=await fetch(`${l}/admin/events/${r}/allowed-mobiles`,{method:"POST",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(o)},body:JSON.stringify({mobile:e,note:S.trim()||null})}),n=await t.json().catch(()=>null);if(!t.ok)throw Error(n?.message||n?.error||"CREATE_FAILED")}else if(k?.mode==="edit"){let t=await fetch(`${l}/admin/events/${r}/allowed-mobiles/${k.id}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(o)},body:JSON.stringify({mobile:e,note:S.trim()||null})}),n=await t.json().catch(()=>null);if(!t.ok)throw Error(n?.message||n?.error||"UPDATE_FAILED")}R(),await _()}catch(e){y(e instanceof Error?e.message:"SAVE_FAILED")}finally{g(!1)}}}async function M(e){let t=e.mobile||"this number";if(window.confirm(`Remove ${t} from the allowlist?`)){g(!0),y(null),w(null);try{let t=await fetch(`${l}/admin/events/${r}/allowed-mobiles/${e.id}`,{method:"DELETE",headers:{...(0,i.adminAuthHeader)(o)}}),n=await t.json().catch(()=>null);if(!t.ok)throw Error(n?.message||n?.error||"DELETE_FAILED");k?.mode==="edit"&&k.id===e.id&&R(),await _()}catch(e){y(e instanceof Error?e.message:"DELETE_FAILED")}finally{g(!1)}}}async function O(e){b(!0),y(null),w(null);try{let t=new FormData;t.append("file",e);let n=await fetch(`${l}/admin/events/${r}/allowed-mobiles/upload`,{method:"POST",headers:{...(0,i.adminAuthHeader)(o)},body:t}),a=await n.json().catch(()=>null);if(!n.ok)throw Error(a?.message||a?.error||"UPLOAD_FAILED");let s=Number(a?.inserted??0),d=Number(a?.skipped??0),c=Number(a?.invalid??0);w(`Import done: ${s} added, ${d} skipped, ${c} invalid.`),await _()}catch(e){y(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{b(!1),L.current&&(L.current.value="")}}return(0,t.jsxs)("div",{className:"panel",style:{marginBottom:"2rem"},children:[(0,t.jsx)("div",{className:"back-row",style:{marginBottom:"1rem"},children:(0,t.jsx)(d.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:m??c},{label:a,onClick:c},{label:"Allowed mobiles"}]})}),(0,t.jsxs)("div",{className:s.default.adminCatToolbar,style:{marginBottom:14},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"panel-title",style:{marginBottom:4},children:"Allowed mobiles"}),(0,t.jsxs)("p",{style:{fontSize:13,color:"var(--text-muted)",margin:0},children:[a," — invite-only registration"]})]}),(0,t.jsx)("span",{style:{fontSize:13,color:"var(--text-faint)"},children:f?"Loading…":`${D.length}${N.trim()?` of ${p.length}`:""} numbers`})]}),(0,t.jsx)("p",{className:"hint",style:{marginBottom:12},children:"Only these mobile numbers can register for this private event. Upload Excel or CSV (mobile in column A, optional note in column B) or add numbers manually."}),x?(0,t.jsx)("div",{className:"error-box",style:{marginBottom:12},children:x}):null,j?(0,t.jsx)("p",{className:"hint",style:{marginBottom:12,color:"var(--success)",border:"1px solid rgba(5,150,105,0.25)",borderRadius:8,padding:"10px 12px",background:"rgba(5,150,105,0.08)"},children:j}):null,(0,t.jsxs)("div",{className:s.default.adminNomineeToolbar,style:{marginBottom:14},children:[(0,t.jsx)("input",{className:`input ${s.default.adminNomineeToolbarSearch}`,type:"search",placeholder:"Search mobile or note…",value:N,onChange:e=>E(e.target.value),"aria-label":"Search allowed mobiles"}),(0,t.jsx)("input",{ref:L,type:"file",accept:".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv",style:{display:"none"},onChange:e=>{let t=e.target.files?.[0];t&&O(t)}}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",disabled:f||v,onClick:()=>L.current?.click(),children:v?"Importing…":"Import Excel/CSV"}),(0,t.jsx)("button",{type:"button",className:`btn ${s.default.adminNomineeToolbarAdd}`,onClick:function(){A(""),I(""),C({mode:"add"})},disabled:f||v,children:"Add mobile"})]}),0!==D.length||f?(0,t.jsx)("div",{className:s.default.adminCategoryList,children:D.map(e=>(0,t.jsx)("div",{className:s.default.adminCategoryRow,children:(0,t.jsxs)("div",{className:s.default.adminCategoryRowMain,children:[(0,t.jsxs)("div",{className:s.default.adminRowIconGroup,children:[(0,t.jsx)("button",{type:"button",className:s.default.adminIconBtnNeutral,onClick:()=>{A(e.mobile||""),I(e.note||""),C({mode:"edit",id:e.id})},"aria-label":"Edit mobile",title:"Edit",children:(0,t.jsx)(tK,{})}),(0,t.jsx)("button",{type:"button",className:s.default.adminIconBtnDanger,onClick:()=>void M(e),disabled:f,"aria-label":`Remove ${e.mobile}`,title:"Remove",children:(0,t.jsx)(tq,{})})]}),(0,t.jsxs)("div",{className:s.default.adminCategoryTitleWrap,children:[(0,t.jsx)("span",{style:{fontSize:15,fontWeight:600},children:e.mobile}),e.note?(0,t.jsx)("span",{style:{fontSize:13,color:"var(--text-muted)",marginLeft:10},children:e.note}):null]}),e.created_at?(0,t.jsx)("span",{style:{fontSize:12,color:"var(--text-faint)",whiteSpace:"nowrap"},children:function(e){if(!e)return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleString()}(e.created_at)}):null]})},e.id))}):(0,t.jsx)("p",{className:"hint",style:{textAlign:"left",padding:"1rem 0"},children:0===p.length?"No allowed mobiles yet — import a spreadsheet or add manually.":"No numbers match your search."}),k?(0,t.jsxs)(u,{title:"add"===k.mode?"Add allowed mobile":"Edit allowed mobile",onClose:R,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",disabled:f,onClick:R,children:"Cancel"}),(0,t.jsx)("button",{type:"button",className:"btn",disabled:f||!T.trim(),onClick:()=>void P(),children:f?"Saving…":"Save"})]}),children:[(0,t.jsxs)("div",{className:"field",style:{marginBottom:12},children:[(0,t.jsx)("label",{className:"label",htmlFor:"allowed-mobile-input",children:"Mobile"}),(0,t.jsx)("input",{id:"allowed-mobile-input",className:"input",type:"tel",inputMode:"numeric",autoComplete:"tel",placeholder:"10-digit mobile",value:T,onChange:e=>A(e.target.value),disabled:f})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{className:"label",htmlFor:"allowed-mobile-note",children:"Note (optional)"}),(0,t.jsx)("input",{id:"allowed-mobile-note",className:"input",type:"text",placeholder:"Name or reference",value:S,onChange:e=>I(e.target.value),disabled:f})]})]}):null]})}function tX(e){if(null==e||""===e)return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=e=>String(e).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}function tQ(e){if(null==e||""===String(e).trim())return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"})}let tZ=`
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
`;function t0(){return(0,t.jsx)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"})})}function t1(){let e=(0,r.useRouter)(),c=(0,r.useSearchParams)(),m=(0,l.getPublicApiBase)(),p=(0,l.getUploadsOrigin)(),h=c.get("next")||"",f=c.get("eventId")||"",[g,v]=n.default.useState("boot"),[b,x]=n.default.useState(!1),[y,j]=n.default.useState(null),[w,N]=n.default.useState(null),[E,k]=n.default.useState(""),[C,T]=n.default.useState(""),[A,S]=n.default.useState(""),[I,L]=n.default.useState(""),[_,D]=n.default.useState(""),[R,P]=n.default.useState(""),[M,O]=n.default.useState(""),[$,F]=n.default.useState(""),[z,B]=n.default.useState(""),[U,H]=n.default.useState(""),[W,V]=n.default.useState(null),[G,Y]=n.default.useState(!1),[K,q]=n.default.useState([]),[J,X]=n.default.useState(""),[Q,Z]=n.default.useState(""),[ee,et]=n.default.useState(""),[en,er]=n.default.useState(null),[ea,ei]=n.default.useState(!1),[el,eo]=n.default.useState(""),[es,ed]=n.default.useState(""),[ec,eu]=n.default.useState(!1),[em,ep]=n.default.useState(null),[eh,ef]=n.default.useState("list"),[eg,ev]=n.default.useState(null),[eb,ex]=n.default.useState(!1),[ey,ej]=n.default.useState(null),[ew,eN]=n.default.useState(!1),[eE,ek]=n.default.useState(!1),eC=n.default.useCallback((e,t)=>{q(n=>n.map(n=>n.event_id===e?{...n,...t}:n))},[]),eT=n.default.useCallback(async()=>{let e=(0,i.readAdminToken)();if(!e)return;let t=await fetch(`${m}/admin/events`,{headers:{...(0,i.adminAuthHeader)(e)}}),n=await t.json().catch(()=>null);if(!t.ok){401===t.status&&(0,i.clearAdminSession)();return}q(Array.isArray(n?.events)?n.events:[])},[m]);n.default.useEffect(()=>{let e=!1,t=(0,i.readAdminToken)();return t?((async()=>{try{let n=await fetch(`${m}/admin/me`,{headers:{...(0,i.adminAuthHeader)(t)}});if(e)return;if(n.ok){v("dashboard"),await eT();return}if(401===n.status){(0,i.clearAdminSession)(),v("auth");return}(0,i.isAdminSessionValid)()?(v("dashboard"),await eT()):v("auth")}catch{if(e)return;(0,i.isAdminSessionValid)()?(v("dashboard"),await eT()):v("auth")}})(),()=>{e=!0}):void v("auth")},[m,eT]);let eA=n.default.useCallback((t,n)=>{ef(t),ev(n??null),ex(!1),j(null);let r=new URLSearchParams;"create"===t?r.set("screen","create"):"edit"===t&&n?(r.set("screen","edit"),r.set("eventId",String(n))):("categories"===t||"nominees"===t||"allowed-mobiles"===t)&&n?(r.set("eventId",String(n)),r.set("panel",t)):"detail"===t&&n&&r.set("eventId",String(n));let a=r.toString();e.replace(`/admin${a?`?${a}`:""}`,{scroll:!1})},[e]);n.default.useEffect(()=>{let e,t,n,r,a;if("dashboard"!==g)return;let i=(e=c.get("screen"),t=c.get("panel"),a=Number.isFinite(r=(n=c.get("eventId"))?Number(n):0)&&r>0?Math.floor(r):null,"create"===e?{screen:"create",eventId:null}:"edit"===e&&a?{screen:"edit",eventId:a}:a&&"categories"===t?{screen:"categories",eventId:a}:a&&"nominees"===t?{screen:"nominees",eventId:a}:a&&"allowed-mobiles"===t?{screen:"allowed-mobiles",eventId:a}:a?{screen:"detail",eventId:a}:{screen:"list",eventId:null}),l=c.get("screen");ef("create"===l?"list":"edit"===l&&i.eventId?"detail":i.screen),ev(i.eventId),"create"===l?ej("create"):"edit"===l&&i.eventId&&ej("edit")},[g,c]),n.default.useEffect(()=>{if("dashboard"!==g||"edit"!==ey||null==eg)return;let e=K.find(e=>e.event_id===eg);if(!e||em===e.event_id)return;ep(e.event_id),X((e.title||"").trim()),Z((e.description||"").trim());let t=(e.image||"").trim();et(t),er(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),t?(0,o.resolveEventBannerUrl)(p,t):null)),ei(!0===e.is_private||1===e.is_private),eo(tX(e.start_time)),ed(tX(e.end_time))},[g,ey,eg,K,em,p]);let eS=n.default.useCallback(()=>{er(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null))},[]);function eI(){"/actions"===h&&f?e.push(`/actions?eventId=${encodeURIComponent(f)}`):h.startsWith("/")&&e.push(h)}function eL(e){let t=e.trim().toLowerCase();return t?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)?null:"Enter a valid email address.":"Email is required."}function e_(e){return e?e.length<8?"Password must be at least 8 characters.":e.length>72?"Password must be at most 72 characters.":null:"Password is required."}function eD(){let e=R.trim();if(!e)return"Your name is required.";if(e.length>75)return"Name must be at most 75 characters.";let t=M.trim();if(!t)return"Organisation name is required.";if(t.length>100)return"Organisation name must be at most 100 characters.";let n=$.trim().replace(/\s/g,"");if(!/^\d{10,12}$/.test(n))return"Mobile must be 10–12 digits (numbers only).";let r=z.trim();return r?r.length>300?"Address must be at most 300 characters.":null:"Full address is required."}function eR(){let e=$.trim().replace(/\s/g,""),t={email:E.trim().toLowerCase(),password:C,name:R.trim(),organisation_name:M.trim(),mobile:e,full_address:z.trim()},n=U.trim();return n&&(t.logo=n),t}async function eP(e){Y(!0),j(null);try{let t=new FormData;t.append("photo",e);let n=await fetch(`${p}/api/uploads/admin-logo`,{method:"POST",body:t}),r=await n.json().catch(()=>null);if(!n.ok)throw Error(r?.error||"UPLOAD_FAILED");let a=String(r?.filename||"").trim();if(!a)throw Error("UPLOAD_FAILED");H(a),V(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),`${p}/uploads/admin/${encodeURIComponent(a)}`))}catch(e){j(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{Y(!1)}}async function eM(e){e.preventDefault(),x(!0),j(null);let t=eL(E);if(t){j(t),x(!1);return}let n=e_(C);if(n){j(n),x(!1);return}if(C!==A){j("Passwords do not match."),x(!1);return}let r=eD();if(r){j(r),x(!1);return}if(G){j("Please wait for the logo upload to finish."),x(!1);return}try{let e=await fetch(`${m}/admin/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(eR())}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"REGISTER_FAILED");L(""),v("register-verify")}catch(e){j(e instanceof Error?e.message:"REGISTER_FAILED")}finally{x(!1)}}async function eO(e){e.preventDefault(),x(!0),j(null);let t=eL(E);if(t){j(t),x(!1);return}let n=I.trim();if(!/^\d{6}$/.test(n)){j("Enter the 6-digit OTP from your email."),x(!1);return}try{let e=await fetch(`${m}/admin/auth/verify-registration`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:E.trim().toLowerCase(),otp:n})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"VERIFY_FAILED");(0,i.writeAdminSession)(t.token,t.admin),T(""),S(""),L(""),v("dashboard"),await eT(),eI()}catch(e){j(e instanceof Error?e.message:"VERIFY_FAILED")}finally{x(!1)}}async function e$(){x(!0),j(null),N(null);let e=eL(E),t=e_(C),n=eD();if(e||t||n){j(e||t||n||"Complete the registration form first."),x(!1);return}try{let e=await fetch(`${m}/admin/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(eR())}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"RESEND_FAILED");N("A new OTP has been sent to your email.")}catch(e){j(e instanceof Error?e.message:"RESEND_FAILED")}finally{x(!1)}}async function eF(e){e.preventDefault(),x(!0),j(null);let t=eL(E);if(t){j(t),x(!1);return}let n=e_(C);if(n){j(n),x(!1);return}try{let e=await fetch(`${m}/admin/auth/sign-in`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:E.trim().toLowerCase(),password:C})}),t=await e.json().catch(()=>null);if(!e.ok)throw t?.error==="EMAIL_NOT_VERIFIED"&&v("register-verify"),Error(t?.message||t?.error||"SIGN_IN_FAILED");(0,i.writeAdminSession)(t.token,t.admin),T(""),v("dashboard"),await eT(),eI()}catch(e){j(e instanceof Error?e.message:"SIGN_IN_FAILED")}finally{x(!1)}}async function ez(e){e.preventDefault(),x(!0),j(null);try{let e=await fetch(`${m}/admin/auth/forgot-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:E.trim()})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"FORGOT_FAILED");v("reset")}catch(e){j(e instanceof Error?e.message:"FORGOT_FAILED")}finally{x(!1)}}async function eB(e){e.preventDefault(),x(!0),j(null);try{let e=await fetch(`${m}/admin/auth/reset-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:E.trim(),otp:I.trim(),newPassword:_})}),t=await e.json().catch(()=>null);if(!e.ok)throw Error(t?.message||t?.error||"RESET_FAILED");(0,i.writeAdminSession)(t.token,t.admin),L(""),D(""),v("dashboard"),await eT(),eI()}catch(e){j(e instanceof Error?e.message:"RESET_FAILED")}finally{x(!1)}}function eU(){ep(null),X(""),Z(""),et(""),eS(),ei(!1),eo(""),ed("")}function eH(){ej(null),eU(),j(null)}async function eW(e){let t=(0,i.readAdminToken)();if(t){eu(!0),j(null);try{let n=new FormData;n.append("photo",e);let r=await fetch(`${p}/api/uploads/event-photo`,{method:"POST",body:n,headers:{...(0,i.adminAuthHeader)(t)}}),a=await r.json().catch(()=>null);if(!r.ok)throw Error(a?.error||"UPLOAD_FAILED");let l=String(a?.filename||"").trim();if(!l)throw Error("UPLOAD_FAILED");er(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),`${p}/uploads/event/${encodeURIComponent(l)}`)),et(l)}catch(e){j(e instanceof Error?e.message:"UPLOAD_FAILED")}finally{eu(!1)}}}async function eV(e){e.preventDefault();let t=(0,i.readAdminToken)();if(t){if(el&&!es||!el&&es)return void j("Set both voting start and end, or leave both empty.");x(!0),j(null);try{let e=null!=em,n=el&&es?{start_time:new Date(el).toISOString(),end_time:new Date(es).toISOString()}:e?{start_time:"",end_time:""}:{},r=e?{title:J.trim(),description:Q.trim()||null,image:ee.trim()||null,is_private:+!!ea,...n}:{title:J.trim(),description:Q.trim()||void 0,image:ee.trim()||void 0,is_private:+!!ea,...n},a=await fetch(e?`${m}/admin/events/${em}`:`${m}/admin/events`,{method:e?"PATCH":"POST",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(t)},body:JSON.stringify(r)}),l=await a.json().catch(()=>null);if(!a.ok)throw Error(l?.message||l?.error||(e?"UPDATE_EVENT_FAILED":"CREATE_EVENT_FAILED"));let o=e?em:Number(l?.event?.event_id??0)||null;ej(null),eU(),await eT(),o?eA("detail",o):eA("list")}catch(e){j(e instanceof Error?e.message:"SAVE_EVENT_FAILED")}finally{x(!1)}}}function eG(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M10 11v6M14 11v6",strokeLinecap:"round"})]})}async function eY(e){let t=(0,i.readAdminToken)();if(!t)return;let n=(e.title||"").trim()||"Untitled";if(window.confirm(`Delete "${n}" and all its categories, nominees, and votes? This cannot be undone.`)){x(!0),j(null);try{let r=await fetch(`${m}/admin/events/${e.event_id}`,{method:"DELETE",headers:{...(0,i.adminAuthHeader)(t)}}),a=await r.json().catch(()=>null);if(!r.ok)throw Error(a?.message||a?.error||"DELETE_EVENT_FAILED");eg===e.event_id&&(ev(null),eA("list")),em===e.event_id&&eU(),await eT(),N(`Deleted "${n}".`)}catch(e){j(e instanceof Error?e.message:"DELETE_EVENT_FAILED")}finally{x(!1)}}}async function eK(e,t){let n=(0,i.readAdminToken)();if(n){eN(!0),j(null);try{let r=await fetch(`${m}/admin/events/${e.event_id}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(n)},body:JSON.stringify({is_live:+!!t})}),a=await r.json().catch(()=>null);if(!r.ok)throw Error(a?.error||"UPDATE_EVENT_FAILED");eC(e.event_id,{is_live:+!!t})}catch(e){j(e instanceof Error?e.message:"UPDATE_EVENT_FAILED")}finally{eN(!1)}}}async function eq(e,t){let n=(0,i.readAdminToken)();if(n){ek(!0),j(null);try{let r=await fetch(`${m}/admin/events/${e.event_id}`,{method:"PATCH",headers:{"Content-Type":"application/json",...(0,i.adminAuthHeader)(n)},body:JSON.stringify({declare_result:+!!t})}),a=await r.json().catch(()=>null);if(!r.ok)throw Error(a?.error||"UPDATE_EVENT_FAILED");eC(e.event_id,{declare_result:+!!t})}catch(e){j(e instanceof Error?e.message:"UPDATE_EVENT_FAILED")}finally{ek(!1)}}}if(n.default.useEffect(()=>()=>{er(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null))},[]),"dashboard"===g){let e,n,r,l,c,h,f,g,x,w,N,E=(0,i.readAdminToken)(),k=null!=eg?K.find(e=>e.event_id===eg)??null:null,C=(0,t.jsxs)("form",{id:"admin-event-form",onSubmit:eV,children:[(0,t.jsxs)("div",{className:"row-mix",children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Event title *"}),(0,t.jsx)("input",{className:"input",required:!0,value:J,onChange:e=>X(e.target.value),maxLength:200,placeholder:"Enter event name"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Visibility"}),(0,t.jsxs)("label",{className:"toggle-field",children:[(0,t.jsx)("input",{type:"checkbox",className:"switch",role:"switch",checked:ea,onChange:e=>ei(e.target.checked),"aria-checked":ea}),(0,t.jsx)("span",{className:"toggle-label",children:"Private (invite-only)"})]})]})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Description"}),(0,t.jsx)("textarea",{className:"input",value:Q,onChange:e=>Z(e.target.value),maxLength:500,rows:2,placeholder:"Optional short description"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Banner image"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",disabled:ec||b,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(er(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),URL.createObjectURL(t))),et(""),eW(t)),e.currentTarget.value=""}}),en?(0,t.jsxs)("div",{className:"banner-preview",children:[(0,t.jsx)("img",{src:en,alt:""}),(0,t.jsx)("span",{className:`banner-badge ${ec?"badge-busy":ee?"badge-ok":"badge-preview"}`,children:ec?"Uploading…":ee?"Banner ready":"Preview"})]}):null]}),(0,t.jsxs)("fieldset",{className:"fieldset",children:[(0,t.jsx)("legend",{className:"fieldset-legend",children:"Voting window"}),(0,t.jsx)("p",{className:"fieldset-hint",children:"Set both to restrict when votes count, or leave empty for open voting."}),(0,t.jsxs)("div",{className:"grid2",children:[(0,t.jsxs)("div",{className:"field",style:{margin:0},children:[(0,t.jsx)("div",{className:"label",children:"Start"}),(0,t.jsx)("input",{className:"input",type:"datetime-local",value:el,onChange:e=>eo(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",style:{margin:0},children:[(0,t.jsx)("div",{className:"label",children:"End"}),(0,t.jsx)("input",{className:"input",type:"datetime-local",value:es,onChange:e=>ed(e.target.value)})]})]})]})]}),T=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)(d.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events"}]})}),(0,t.jsxs)("div",{className:"section-head",children:[(0,t.jsx)("span",{className:"section-title",children:"Your events"}),(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:12},children:[(0,t.jsxs)("span",{style:{fontSize:13,color:"var(--text-faint)"},children:[K.length," total"]}),(0,t.jsx)("button",{type:"button",className:"btn",onClick:function(){eU(),j(null),ej("create")},children:"Add event"})]})]}),0===K.length?(0,t.jsx)("p",{className:"hint",children:"No events yet — use Add event to create your first one."}):(0,t.jsx)("div",{className:"event-list",children:K.map(e=>{let n=(e.title||"").trim()||"Untitled",r=(e.description||"").trim(),a=(0,o.resolveEventBannerUrl)(p,e.image);return(0,t.jsxs)("div",{className:"event-card-wrap",children:[(0,t.jsx)("button",{type:"button",className:"event-icon-btn",disabled:b,"aria-label":`Delete ${n}`,title:"Delete event",onClick:()=>void eY(e),children:(0,t.jsx)(eG,{})}),(0,t.jsx)("button",{type:"button",className:"event-card event-card-clickable",style:{flex:1,minWidth:0},onClick:()=>eA("detail",e.event_id),children:(0,t.jsxs)("div",{className:"event-card-row",children:[a?(0,t.jsx)("img",{src:a,alt:"",className:"event-card-thumb"}):(0,t.jsx)("div",{className:"event-card-thumb-ph","aria-hidden":!0,children:n.slice(0,2).toUpperCase()}),(0,t.jsxs)("div",{className:"event-card-main",children:[(0,t.jsxs)("div",{className:"event-header",style:{marginBottom:4*!!r},children:[(0,t.jsx)("span",{className:"event-title",children:n}),(0,t.jsx)("span",{className:`event-badge ${!0===e.is_private||1===e.is_private?"badge-private":"badge-public"}`,children:!0===e.is_private||1===e.is_private?"Private":"Public"})]}),r?(0,t.jsx)("p",{className:"event-desc",style:{marginBottom:0},children:r}):null]}),(0,t.jsx)("span",{className:"event-card-chevron","aria-hidden":!0,children:"›"})]})})]},e.event_id)})})]}),A=k?(n=(k.title||"").trim()||"Untitled",r=(k.description||"").trim(),l=(0,o.resolveEventBannerUrl)(p,k.image),c=!0===k.is_private||1===k.is_private,h=!0===k.is_live||1===k.is_live,f=!0===k.declare_result||1===k.declare_result,g=function(e){let t=e.start_time,n=e.end_time;if(null==t||null==n||!String(t).trim()||!String(n).trim())return"always";let r=new Date(String(t)).getTime(),a=new Date(String(n)).getTime();if(Number.isNaN(r)||Number.isNaN(a))return"always";let i=Date.now();return i<r?"upcoming":i>a?"ended":"open"}(k),x=tQ(k.start_time),w=tQ(k.end_time),N=!!(x&&w),(0,t.jsxs)("article",{className:"event-detail-panel",children:[l?(0,t.jsx)("img",{src:l,alt:"",className:"event-detail-banner"}):(0,t.jsx)("div",{className:"event-detail-banner-ph","aria-hidden":!0,children:n.slice(0,2).toUpperCase()}),(0,t.jsxs)("div",{className:"event-detail-body",children:[(0,t.jsxs)("div",{className:"event-detail-badges",children:[(0,t.jsx)("span",{className:`event-badge ${c?"badge-private":"badge-public"}`,children:c?"Private":"Public"}),(0,t.jsx)("span",{className:`event-badge ${h?"badge-public":"badge-vote-ended"}`,children:h?"Live":"Not live"}),(0,t.jsx)("span",{className:`event-badge ${"open"===g?"badge-vote-open":"upcoming"===g?"badge-vote-upcoming":"ended"===g?"badge-vote-ended":"badge-vote-always"}`,children:"open"===g?"Voting open":"upcoming"===g?"Voting soon":"ended"===g?"Voting ended":"Open voting"})]}),(0,t.jsx)("h1",{className:"event-detail-title",children:n}),r?(0,t.jsx)("p",{className:"event-desc",children:r}):null,N?(0,t.jsxs)("dl",{className:"event-detail-meta",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("dt",{children:"Voting starts"}),(0,t.jsx)("dd",{children:x})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("dt",{children:"Voting ends"}),(0,t.jsx)("dd",{children:w})]})]}):(0,t.jsx)("p",{className:"event-detail-note",children:"Voting window not set — votes count anytime."}),c?(0,t.jsx)("p",{className:"event-detail-note",children:"Invite-only event. Share the register link below with attendees."}):null,(0,t.jsxs)("div",{className:"event-detail-controls",children:[(0,t.jsx)("div",{className:"event-detail-controls-title",children:"Event controls"}),(0,t.jsxs)("div",{className:"event-detail-controls-row",children:[(0,t.jsxs)("label",{className:s.default.adminApproveSwitch,title:h?"Event is live":"Make event live",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:h,disabled:ew||b,onChange:e=>void eK(k,e.target.checked),"aria-label":h?"Take event offline":"Go live"}),(0,t.jsx)("span",{className:s.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:"Go live"})]}),(0,t.jsxs)("label",{className:s.default.adminApproveSwitch,title:f?"All category results declared":"Declare all category results",children:[(0,t.jsx)("input",{type:"checkbox",role:"switch",checked:f,disabled:eE||b,onChange:e=>void eq(k,e.target.checked),"aria-label":f?"Undeclare all results":"Declare all results"}),(0,t.jsx)("span",{className:s.default.adminApproveTrack,"aria-hidden":!0}),(0,t.jsx)("span",{children:"Declare all results"})]})]}),(0,t.jsx)("p",{className:"event-detail-note",style:{marginBottom:0},children:"Go live opens voting on the public event page. Per-category Show nominee and Declare result are in Categories."})]}),(0,t.jsxs)("div",{className:"event-detail-actions",children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eA("categories",k.event_id),children:"Categories"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eA("nominees",k.event_id),children:"Nominees"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,a.withBasePath)(`/actions?eventId=${k.event_id}`),target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"LED controls"}),c?(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>eA("allowed-mobiles",k.event_id),children:"Allowed mobiles"}):null,(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,a.withBasePath)(`/screen?eventId=${k.event_id}`),target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"Open LED screen"}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:()=>{var e;navigator.clipboard.writeText((e=k.event_id,(0,a.fullAppUrl)(`/register?eventId=${e}`))),ex(!0),window.setTimeout(()=>ex(!1),2e3)},children:eb?"Link copied":"Copy register link"}),(0,t.jsx)("a",{className:"btn btn-ghost",href:(0,a.withBasePath)(`/events/${k.event_id}`),target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"Public event page"})]})]})]})):(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)(d.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:()=>eA("list")},{label:"Event not found"}]})}),(0,t.jsx)("p",{className:"hint",style:{padding:"1rem 0"},children:"Event not found."})]});if("detail"===eh){let n=k?(k.title||"").trim()||"Untitled":"Event";e=(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"back-row",children:[(0,t.jsx)(d.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:()=>eA("list")},{label:n}]}),k?(0,t.jsxs)("div",{className:"back-row-actions",children:[(0,t.jsx)("button",{type:"button",className:"event-icon-btn event-icon-btn--neutral",disabled:b,"aria-label":`Edit ${n}`,title:"Edit event",onClick:()=>{let e;return ep(k.event_id),X((k.title||"").trim()),Z((k.description||"").trim()),void(et(e=(k.image||"").trim()),er(t=>(t?.startsWith("blob:")&&URL.revokeObjectURL(t),e?(0,o.resolveEventBannerUrl)(p,e):null)),ei(!0===k.is_private||1===k.is_private),eo(tX(k.start_time)),ed(tX(k.end_time)),j(null),ej("edit"),eg!==k.event_id&&eA("detail",k.event_id))},children:(0,t.jsx)(function(e){return(0,t.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":!0,...e,children:[(0,t.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,t.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})},{})}),(0,t.jsx)("button",{type:"button",className:"event-icon-btn",disabled:b,"aria-label":`Delete ${n}`,title:"Delete event",onClick:()=>void eY(k),children:(0,t.jsx)(eG,{})})]}):null]}),A]})}else if(("categories"===eh||"nominees"===eh)&&null!=eg){let n=K.find(e=>e.event_id===eg),r=(0,i.readAdminToken)();e=n&&r?(0,t.jsx)(tY,{mode:eh,eventId:eg,eventTitle:(n.title||"").trim()||"Untitled",apiBase:m,apiOrigin:p,token:r,onBack:()=>eA("detail",eg),onGoList:()=>eA("list"),onGoCategories:()=>eA("categories",eg),onEventDeclareResultChange:e=>eC(eg,{declare_result:+!!e})}):(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)(d.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:()=>eA("list")},{label:"Event not found"}]})}),(0,t.jsx)("p",{className:"hint",style:{padding:"1rem 0"},children:"Event not found."})]})}else if("allowed-mobiles"===eh&&null!=eg){let n=K.find(e=>e.event_id===eg),r=(0,i.readAdminToken)(),a=n?.is_private===!0||n?.is_private===1;e=n&&r&&a?(0,t.jsx)(tJ,{eventId:eg,eventTitle:(n.title||"").trim()||"Untitled",apiBase:m,token:r,onBack:()=>eA("detail",eg),onGoList:()=>eA("list")}):(0,t.jsxs)("div",{className:"panel",children:[(0,t.jsx)("div",{className:"back-row",children:(0,t.jsx)(d.Breadcrumb,{items:[{label:"Home",href:"/"},{label:"Your events",onClick:()=>eA("list")},{label:"Event not found"}]})}),(0,t.jsx)("p",{className:"hint",style:{padding:"1rem 0"},children:n?"Allowed mobiles apply only to private events.":"Event not found."})]})}else e=T;return(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:tZ}),(0,t.jsxs)("div",{className:"dashboard",children:[(0,t.jsxs)("div",{className:"topbar",children:[(0,t.jsxs)("div",{className:"topbar-brand",children:[(0,t.jsx)("div",{className:"topbar-icon",children:(0,t.jsx)(t0,{})}),(0,t.jsx)("span",{className:"topbar-title",children:"Event Admin"})]}),(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",onClick:function(){(0,i.clearAdminSession)(),v("auth"),q([])},children:"Log out"})]}),y&&(0,t.jsx)("div",{className:"error-box",children:y}),e,ey?(0,t.jsx)(u,{wide:!0,title:"create"===ey?"New event":"Edit event",onClose:eH,footer:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{type:"button",className:"btn btn-ghost",disabled:b||ec,onClick:eH,children:"Cancel"}),(0,t.jsx)("button",{type:"submit",form:"admin-event-form",className:"btn",disabled:b||ec,children:b?"Saving…":"edit"===ey?"Save changes":"Create event"})]}),children:C}):null,!E&&(0,t.jsx)("p",{className:"error-box",style:{marginTop:16},children:"Session missing — please log in again."})]})]})}return"forgot"===g?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:tZ}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(t0,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Forgot password"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Enter your email and we'll send a 6-digit OTP."}),y&&(0,t.jsx)("div",{className:"error-box",children:y}),(0,t.jsxs)("form",{onSubmit:ez,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:E,onChange:e=>k(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:b,children:b?"Sending…":"Send OTP"})]}),(0,t.jsx)("div",{className:"auth-footer",children:(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>v("auth"),children:"← Back to sign in"})})]})})]}):"register"===g?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:tZ}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card auth-card-wide",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(t0,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Create account"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Fill in your details. We will email a one-time code to verify your account."}),y&&(0,t.jsx)("div",{className:"error-box",children:y}),(0,t.jsxs)("form",{onSubmit:eM,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Your name *"}),(0,t.jsx)("input",{className:"input",required:!0,value:R,onChange:e=>P(e.target.value),placeholder:"Full name",maxLength:75,autoComplete:"name"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Organisation name *"}),(0,t.jsx)("input",{className:"input",required:!0,value:M,onChange:e=>O(e.target.value),placeholder:"Company or organisation",maxLength:100,autoComplete:"organization"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Mobile *"}),(0,t.jsx)("input",{className:"input",type:"tel",required:!0,value:$,onChange:e=>F(e.target.value.replace(/[^\d\s]/g,"").slice(0,12)),placeholder:"10–12 digit mobile number",inputMode:"numeric",autoComplete:"tel"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Full address *"}),(0,t.jsx)("textarea",{className:"input",required:!0,value:z,onChange:e=>B(e.target.value),placeholder:"Street, city, state, PIN",maxLength:300,rows:2,autoComplete:"street-address"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Organisation logo (optional)"}),(0,t.jsx)("input",{className:"input",type:"file",accept:"image/*",disabled:b||G,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(V(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),URL.createObjectURL(t))),H(""),eP(t)),e.currentTarget.value=""}}),W?(0,t.jsxs)("div",{className:"banner-preview",style:{marginTop:10},children:[(0,t.jsx)("img",{src:W,alt:"",style:{height:80,objectFit:"contain",background:"#f8fafc"}}),(0,t.jsx)("span",{className:`banner-badge ${G?"badge-busy":U?"badge-ok":"badge-preview"}`,children:G?"Uploading…":U?"Logo ready":"Preview"})]}):null]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email *"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,autoComplete:"email",value:E,onChange:e=>k(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Password *"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"new-password",value:C,onChange:e=>T(e.target.value),placeholder:"At least 8 characters",minLength:8,maxLength:72})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Confirm password *"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"new-password",value:A,onChange:e=>S(e.target.value),placeholder:"Re-enter password",minLength:8,maxLength:72})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:b||G,children:b?"Sending OTP…":"Send OTP"})]}),(0,t.jsx)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{j(null),v("auth")},children:"Already have an account? Sign in"})})]})})]}):"register-verify"===g?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:tZ}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(t0,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Verify your email"}),(0,t.jsxs)("div",{className:"auth-subtitle",children:["Enter the 6-digit OTP sent to ",(0,t.jsx)("strong",{children:E.trim()||"your email"}),"."]}),y&&(0,t.jsx)("div",{className:"error-box",children:y}),w&&(0,t.jsx)("div",{className:"info-box",children:w}),(0,t.jsxs)("form",{onSubmit:eO,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:E,onChange:e=>k(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"OTP"}),(0,t.jsx)("input",{className:"input",required:!0,value:I,onChange:e=>L(e.target.value.replace(/\D/g,"").slice(0,6)),placeholder:"6-digit code",inputMode:"numeric",maxLength:6,pattern:"\\d{6}"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:b,children:b?"Verifying…":"Verify & continue"})]}),(0,t.jsxs)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:[(0,t.jsx)("button",{type:"button",className:"link-btn",disabled:b,onClick:()=>void e$(),children:"Resend OTP"}),(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{j(null),v("register")},children:"← Back to register"})]})]})})]}):"reset"===g?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:tZ}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(t0,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Reset password"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Enter the OTP from your email and choose a new password."}),y&&(0,t.jsx)("div",{className:"error-box",children:y}),(0,t.jsxs)("form",{onSubmit:eB,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,value:E,onChange:e=>k(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"OTP"}),(0,t.jsx)("input",{className:"input",required:!0,value:I,onChange:e=>L(e.target.value),placeholder:"6-digit code",inputMode:"numeric",maxLength:6})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"New password"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,value:_,onChange:e=>D(e.target.value),placeholder:"At least 8 characters"})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:b,children:b?"Saving…":"Reset & sign in"})]})]})})]}):"boot"===g?(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:tZ}),(0,t.jsx)("div",{style:{minHeight:"100dvh",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text-muted)",fontSize:14},children:"Checking session…"})]}):(0,t.jsxs)("div",{className:"page",children:[(0,t.jsx)("style",{children:tZ}),(0,t.jsx)("div",{className:"auth-wrap",children:(0,t.jsxs)("div",{className:"auth-card",children:[(0,t.jsxs)("div",{className:"auth-logo",children:[(0,t.jsx)("div",{className:"auth-logo-icon",children:(0,t.jsx)(t0,{})}),(0,t.jsx)("span",{className:"auth-logo-text",children:"Event Admin"})]}),(0,t.jsx)("div",{className:"auth-title",children:"Welcome back"}),(0,t.jsx)("div",{className:"auth-subtitle",children:"Sign in to manage your events."}),y&&(0,t.jsx)("div",{className:"error-box",children:y}),(0,t.jsxs)("form",{onSubmit:eF,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Email"}),(0,t.jsx)("input",{className:"input",type:"email",required:!0,autoComplete:"email",value:E,onChange:e=>k(e.target.value),placeholder:"you@example.com"})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("div",{className:"label",children:"Password"}),(0,t.jsx)("input",{className:"input",type:"password",required:!0,autoComplete:"current-password",value:C,onChange:e=>T(e.target.value),placeholder:"Min 8 characters",minLength:8,maxLength:72})]}),(0,t.jsx)("button",{type:"submit",className:"btn btn-full",disabled:b,children:b?"Please wait…":"Sign in"})]}),(0,t.jsxs)("div",{className:"auth-footer",style:{flexDirection:"column",gap:10},children:[(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:()=>{j(null),v("forgot")},children:"Forgot password?"}),(0,t.jsxs)("span",{style:{color:"var(--text-muted)"},children:["Don't have an account?"," ",(0,t.jsx)("button",{type:"button",className:"link-btn",onClick:function(){j(null),S(""),L(""),P(""),O(""),F(""),B(""),H(""),V(e=>(e?.startsWith("blob:")&&URL.revokeObjectURL(e),null)),v("register")},children:"Register"})]})]})]})})]})}e.s(["default",0,function(){return(0,t.jsx)(n.Suspense,{fallback:(0,t.jsx)("div",{style:{minHeight:"100vh",background:"#e8f0fe",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b",fontFamily:"sans-serif",fontSize:14},children:"Loading…"}),children:(0,t.jsx)(t1,{})})}],72906)}]);