(()=>{var Gt=Object.defineProperty;var ue=(n,t)=>()=>(n&&(t=n(n=0)),t);var zt=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports),Ne=(n,t)=>{for(var r in t)Gt(n,r,{get:t[r],enumerable:!0})};var Ut,Vt,wt,xr,Ar,Pe,Me,Jt,_t,Xt,qe,Et,Br,De,We=ue(()=>{Ut=n=>{let t=new Map;t.set("web",{name:"web"});let r=n.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:t},a=(s,b)=>{r.platforms.set(s,b)},i=s=>{r.platforms.has(s)&&(r.currentPlatform=r.platforms.get(s))};return r.addPlatform=a,r.setPlatform=i,r},Vt=n=>n.CapacitorPlatforms=Ut(n),wt=Vt(typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{}),xr=wt.addPlatform,Ar=wt.setPlatform;(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(Pe||(Pe={}));Me=class extends Error{constructor(t,r){super(t),this.message=t,this.code=r}},Jt=n=>{var t,r;return n!=null&&n.androidBridge?"android":!((r=(t=n==null?void 0:n.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||r===void 0)&&r.bridge?"ios":"web"},_t=n=>{var t,r,a,i,s;let b=n.CapacitorCustomPlatform||null,v=n.Capacitor||{},L=v.Plugins=v.Plugins||{},T=n.CapacitorPlatforms,Y=()=>b!==null?b.name:Jt(n),A=((t=T==null?void 0:T.currentPlatform)===null||t===void 0?void 0:t.getPlatform)||Y,B=()=>A()!=="web",ee=((r=T==null?void 0:T.currentPlatform)===null||r===void 0?void 0:r.isNativePlatform)||B,Z=M=>{let C=pe.get(M);return!!(C!=null&&C.platforms.has(A())||ke(M))},ce=((a=T==null?void 0:T.currentPlatform)===null||a===void 0?void 0:a.isPluginAvailable)||Z,te=M=>{var C;return(C=v.PluginHeaders)===null||C===void 0?void 0:C.find(O=>O.name===M)},ke=((i=T==null?void 0:T.currentPlatform)===null||i===void 0?void 0:i.getPluginHeader)||te,Se=M=>n.console.error(M),he=(M,C,O)=>Promise.reject(`${O} does not have an implementation of "${C}".`),pe=new Map,ve=(M,C={})=>{let O=pe.get(M);if(O)return console.warn(`Capacitor plugin "${M}" already registered. Cannot register plugins twice.`),O.proxy;let j=A(),z=ke(M),N,W=async()=>(!N&&j in C?N=typeof C[j]=="function"?N=await C[j]():N=C[j]:b!==null&&!N&&"web"in C&&(N=typeof C.web=="function"?N=await C.web():N=C.web),N),J=(U,P)=>{var Q,ae;if(z){let le=z==null?void 0:z.methods.find(re=>P===re.name);if(le)return le.rtype==="promise"?re=>v.nativePromise(M,P.toString(),re):(re,ge)=>v.nativeCallback(M,P.toString(),re,ge);if(U)return(Q=U[P])===null||Q===void 0?void 0:Q.bind(U)}else{if(U)return(ae=U[P])===null||ae===void 0?void 0:ae.bind(U);throw new Me(`"${M}" plugin is not implemented on ${j}`,Pe.Unimplemented)}},de=U=>{let P,Q=(...ae)=>{let le=W().then(re=>{let ge=J(re,U);if(ge){let Le=ge(...ae);return P=Le==null?void 0:Le.remove,Le}else throw new Me(`"${M}.${U}()" is not implemented on ${j}`,Pe.Unimplemented)});return U==="addListener"&&(le.remove=async()=>P()),le};return Q.toString=()=>`${U.toString()}() { [capacitor code] }`,Object.defineProperty(Q,"name",{value:U,writable:!1,configurable:!1}),Q},Be=de("addListener"),S=de("removeListener"),Ce=(U,P)=>{let Q=Be({eventName:U},P),ae=async()=>{let re=await Q;S({eventName:U,callbackId:re},P)},le=new Promise(re=>Q.then(()=>re({remove:ae})));return le.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await ae()},le},se=new Proxy({},{get(U,P){switch(P){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return z?Ce:Be;case"removeListener":return S;default:return de(P)}}});return L[M]=se,pe.set(M,{name:M,proxy:se,platforms:new Set([...Object.keys(C),...z?[j]:[]])}),se},Ae=((s=T==null?void 0:T.currentPlatform)===null||s===void 0?void 0:s.registerPlugin)||ve;return v.convertFileSrc||(v.convertFileSrc=M=>M),v.getPlatform=A,v.handleError=Se,v.isNativePlatform=ee,v.isPluginAvailable=ce,v.pluginMethodNoop=he,v.registerPlugin=Ae,v.Exception=Me,v.DEBUG=!!v.DEBUG,v.isLoggingEnabled=!!v.isLoggingEnabled,v.platform=v.getPlatform(),v.isNative=v.isNativePlatform(),v},Xt=n=>n.Capacitor=_t(n),qe=Xt(typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{}),Et=qe.registerPlugin,Br=qe.Plugins,De=class{constructor(t){this.listeners={},this.windowListeners={},t&&(console.warn(`Capacitor WebPlugin "${t.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=t)}addListener(t,r){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(r);let i=this.windowListeners[t];i&&!i.registered&&this.addWindowListener(i);let s=async()=>this.removeListener(t,r),b=Promise.resolve({remove:s});return Object.defineProperty(b,"remove",{value:async()=>{console.warn("Using addListener() without 'await' is deprecated."),await s()}}),b}async removeAllListeners(){this.listeners={};for(let t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,r){let a=this.listeners[t];a&&a.forEach(i=>i(r))}hasListeners(t){return!!this.listeners[t].length}registerWindowListener(t,r){this.windowListeners[r]={registered:!1,windowEventName:t,pluginEventName:r,handler:a=>{this.notifyListeners(r,a)}}}unimplemented(t="not implemented"){return new qe.Exception(t,Pe.Unimplemented)}unavailable(t="not available"){return new qe.Exception(t,Pe.Unavailable)}async removeListener(t,r){let a=this.listeners[t];if(!a)return;let i=a.indexOf(r);this.listeners[t].splice(i,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}}});var kt,Ge,ze,Ue=ue(()=>{kt=async n=>new Promise((t,r)=>{let a=new FileReader;a.onload=()=>{let i=a.result,s=i.substr(i.indexOf(",")+1);t(s)},a.onerror=i=>r(i),a.readAsDataURL(n)}),Ge=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),ze=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)});var St,Oe,Ct,Lt,Ve,Tt=ue(()=>{Ue();St=(n,t,r={})=>{let a=Ge(n),i=Ge(t),s=`; expires=${(r.expires||"").replace("expires=","")}`,b=(r.path||"/").replace("path=","");document.cookie=`${a}=${i||""}${s}; path=${b}`},Oe=()=>{let n=[],t={};if(!document.cookie)return n;let r=document.cookie.split(";")||[];for(let i of r){let[s,b]=i.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=ze(s).trim(),b=ze(b).trim(),t[s]=b}let a=Object.entries(t);for(let[i,s]of a)n.push({key:i,value:s});return n},Ct=n=>{let t=Oe();for(let r of t)if(r.key===n)return r;return{key:n,value:""}},Lt=n=>{document.cookie=`${n}=; Max-Age=0`},Ve=()=>{let n=document.cookie.split(";")||[];for(let t of n)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}});var Qt,Yt,Je,Ee,Pt,It,xt,At,Bt,Mt=ue(()=>{Ue();Qt=(n={})=>{let t=Object.keys(n);return Object.keys(n).map(i=>i.toLocaleLowerCase()).reduce((i,s,b)=>(i[s]=n[t[b]],i),{})},Yt=(n,t=!0)=>n?Object.entries(n).reduce((a,i)=>{let[s,b]=i,v,L;return Array.isArray(b)?(L="",b.forEach(T=>{v=t?encodeURIComponent(T):T,L+=`${s}=${v}&`}),L.slice(0,-1)):(v=t?encodeURIComponent(b):b,L=`${s}=${v}`),`${a}&${L}`},"").substr(1):null,Je=(n,t={})=>{let r=Object.assign({method:n.method||"GET",headers:n.headers},t),i=Qt(n.headers)["content-type"]||"";if(typeof n.data=="string")r.body=n.data;else if(i.includes("application/x-www-form-urlencoded")){let s=new URLSearchParams;for(let[b,v]of Object.entries(n.data||{}))s.set(b,v);r.body=s.toString()}else if(i.includes("multipart/form-data")){let s=new FormData;if(n.data instanceof FormData)n.data.forEach((v,L)=>{s.append(L,v)});else for(let v of Object.keys(n.data))s.append(v,n.data[v]);r.body=s;let b=new Headers(r.headers);b.delete("content-type"),r.headers=b}else(i.includes("application/json")||typeof n.data=="object")&&(r.body=JSON.stringify(n.data));return r},Ee=async n=>{let t=Je(n,n.webFetchExtra),r=Yt(n.params,n.shouldEncodeUrlParams),a=r?`${n.url}?${r}`:n.url,i=await fetch(a,t),s=i.headers.get("content-type")||"",{responseType:b="text"}=i.ok?n:{};s.includes("application/json")&&(b="json");let v;switch(b){case"arraybuffer":case"blob":let T=await i.blob();v=await kt(T);break;case"json":v=await i.json();break;case"document":case"text":default:v=await i.text()}let L={};return i.headers.forEach((T,Y)=>{L[Y]=T}),{data:v,headers:L,status:i.status,url:i.url}},Pt=async n=>Ee(Object.assign(Object.assign({},n),{method:"GET"})),It=async n=>Ee(Object.assign(Object.assign({},n),{method:"POST"})),xt=async n=>Ee(Object.assign(Object.assign({},n),{method:"PUT"})),At=async n=>Ee(Object.assign(Object.assign({},n),{method:"PATCH"})),Bt=async n=>Ee(Object.assign(Object.assign({},n),{method:"DELETE"}))});var Xe={};Ne(Xe,{HttpWeb:()=>_e});var _e,Ze=ue(()=>{We();Tt();Mt();_e=class extends De{constructor(){super(),this.request=async t=>Ee(t),this.get=async t=>Pt(t),this.post=async t=>It(t),this.put=async t=>xt(t),this.patch=async t=>At(t),this.del=async t=>Bt(t),this.getCookiesMap=async t=>{let r=Oe(),a={};for(let i of r)a[i.key]=i.value;return a},this.getCookies=async t=>{let{url:r}=t;return{cookies:Oe()}},this.setCookie=async t=>{let{key:r,value:a,expires:i="",path:s=""}=t;St(r,a,{expires:i,path:s})},this.getCookie=async t=>Ct(t.key),this.deleteCookie=async t=>Lt(t.key),this.clearCookies=async t=>Ve(),this.clearAllCookies=async()=>Ve(),this.uploadFile=async t=>{let r=new FormData;r.append(t.name,t.blob||"undefined");let a=Object.assign(Object.assign({},t),{body:r,method:"POST"});return this.post(a)},this.downloadFile=async t=>{let r=Je(t,t.webFetchExtra),a=await fetch(t.url,r),i;if(!(t!=null&&t.progress))i=await a.blob();else if(!(a!=null&&a.body))i=new Blob;else{let s=a.body.getReader(),b=0,v=[],L=a.headers.get("content-type"),T=parseInt(a.headers.get("content-length")||"0",10);for(;;){let{done:B,value:ee}=await s.read();if(B)break;v.push(ee),b+=(ee==null?void 0:ee.length)||0;let Z={type:"DOWNLOAD",url:t.url,bytes:b,contentLength:T};this.notifyListeners("progress",Z)}let Y=new Uint8Array(b),A=0;for(let B of v)typeof B!="undefined"&&(Y.set(B,A),A+=B.length);i=new Blob([Y.buffer],{type:L||void 0})}return{blob:i}}}}});var Ft=zt((Hr,tr)=>{tr.exports={API_KEY:"a5d75d50-65e6-41a4-aa2f-9b2c93afaaa7"}});var Ie,Fe,rr,nr,ar,Qe,$e,xe,Rt,qt,Ye,jr,ir,or,sr,lr,et,Nr,tt=ue(()=>{(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(Ie||(Ie={}));Fe=class extends Error{constructor(t,r,a){super(t),this.message=t,this.code=r,this.data=a}},rr=n=>{var t,r;return n!=null&&n.androidBridge?"android":!((r=(t=n==null?void 0:n.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||r===void 0)&&r.bridge?"ios":"web"},nr=n=>{let t=n.CapacitorCustomPlatform||null,r=n.Capacitor||{},a=r.Plugins=r.Plugins||{},i=()=>t!==null?t.name:rr(n),s=()=>i()!=="web",b=A=>{let B=T.get(A);return!!(B!=null&&B.platforms.has(i())||v(A))},v=A=>{var B;return(B=r.PluginHeaders)===null||B===void 0?void 0:B.find(ee=>ee.name===A)},L=A=>n.console.error(A),T=new Map,Y=(A,B={})=>{let ee=T.get(A);if(ee)return console.warn(`Capacitor plugin "${A}" already registered. Cannot register plugins twice.`),ee.proxy;let Z=i(),ce=v(A),te,ke=async()=>(!te&&Z in B?te=typeof B[Z]=="function"?te=await B[Z]():te=B[Z]:t!==null&&!te&&"web"in B&&(te=typeof B.web=="function"?te=await B.web():te=B.web),te),Se=(C,O)=>{var j,z;if(ce){let N=ce==null?void 0:ce.methods.find(W=>O===W.name);if(N)return N.rtype==="promise"?W=>r.nativePromise(A,O.toString(),W):(W,J)=>r.nativeCallback(A,O.toString(),W,J);if(C)return(j=C[O])===null||j===void 0?void 0:j.bind(C)}else{if(C)return(z=C[O])===null||z===void 0?void 0:z.bind(C);throw new Fe(`"${A}" plugin is not implemented on ${Z}`,Ie.Unimplemented)}},he=C=>{let O,j=(...z)=>{let N=ke().then(W=>{let J=Se(W,C);if(J){let de=J(...z);return O=de==null?void 0:de.remove,de}else throw new Fe(`"${A}.${C}()" is not implemented on ${Z}`,Ie.Unimplemented)});return C==="addListener"&&(N.remove=async()=>O()),N};return j.toString=()=>`${C.toString()}() { [capacitor code] }`,Object.defineProperty(j,"name",{value:C,writable:!1,configurable:!1}),j},pe=he("addListener"),ve=he("removeListener"),Ae=(C,O)=>{let j=pe({eventName:C},O),z=async()=>{let W=await j;ve({eventName:C,callbackId:W},O)},N=new Promise(W=>j.then(()=>W({remove:z})));return N.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await z()},N},M=new Proxy({},{get(C,O){switch(O){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return ce?Ae:pe;case"removeListener":return ve;default:return he(O)}}});return a[A]=M,T.set(A,{name:A,proxy:M,platforms:new Set([...Object.keys(B),...ce?[Z]:[]])}),M};return r.convertFileSrc||(r.convertFileSrc=A=>A),r.getPlatform=i,r.handleError=L,r.isNativePlatform=s,r.isPluginAvailable=b,r.registerPlugin=Y,r.Exception=Fe,r.DEBUG=!!r.DEBUG,r.isLoggingEnabled=!!r.isLoggingEnabled,r},ar=n=>n.Capacitor=nr(n),Qe=ar(typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{}),$e=Qe.registerPlugin,xe=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,r){let a=!1;this.listeners[t]||(this.listeners[t]=[],a=!0),this.listeners[t].push(r);let s=this.windowListeners[t];s&&!s.registered&&this.addWindowListener(s),a&&this.sendRetainedArgumentsForEvent(t);let b=async()=>this.removeListener(t,r);return Promise.resolve({remove:b})}async removeAllListeners(){this.listeners={};for(let t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,r,a){let i=this.listeners[t];if(!i){if(a){let s=this.retainedEventArguments[t];s||(s=[]),s.push(r),this.retainedEventArguments[t]=s}return}i.forEach(s=>s(r))}hasListeners(t){return!!this.listeners[t].length}registerWindowListener(t,r){this.windowListeners[r]={registered:!1,windowEventName:t,pluginEventName:r,handler:a=>{this.notifyListeners(r,a)}}}unimplemented(t="not implemented"){return new Qe.Exception(t,Ie.Unimplemented)}unavailable(t="not available"){return new Qe.Exception(t,Ie.Unavailable)}async removeListener(t,r){let a=this.listeners[t];if(!a)return;let i=a.indexOf(r);this.listeners[t].splice(i,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){let r=this.retainedEventArguments[t];r&&(delete this.retainedEventArguments[t],r.forEach(a=>{this.notifyListeners(t,a)}))}},Rt=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),qt=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),Ye=class extends xe{async getCookies(){let t=document.cookie,r={};return t.split(";").forEach(a=>{if(a.length<=0)return;let[i,s]=a.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");i=qt(i).trim(),s=qt(s).trim(),r[i]=s}),r}async setCookie(t){try{let r=Rt(t.key),a=Rt(t.value),i=`; expires=${(t.expires||"").replace("expires=","")}`,s=(t.path||"/").replace("path=",""),b=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${r}=${a||""}${i}; path=${s}; ${b};`}catch(r){return Promise.reject(r)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(r){return Promise.reject(r)}}async clearCookies(){try{let t=document.cookie.split(";")||[];for(let r of t)document.cookie=r.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}},jr=$e("CapacitorCookies",{web:()=>new Ye}),ir=async n=>new Promise((t,r)=>{let a=new FileReader;a.onload=()=>{let i=a.result;t(i.indexOf(",")>=0?i.split(",")[1]:i)},a.onerror=i=>r(i),a.readAsDataURL(n)}),or=(n={})=>{let t=Object.keys(n);return Object.keys(n).map(i=>i.toLocaleLowerCase()).reduce((i,s,b)=>(i[s]=n[t[b]],i),{})},sr=(n,t=!0)=>n?Object.entries(n).reduce((a,i)=>{let[s,b]=i,v,L;return Array.isArray(b)?(L="",b.forEach(T=>{v=t?encodeURIComponent(T):T,L+=`${s}=${v}&`}),L.slice(0,-1)):(v=t?encodeURIComponent(b):b,L=`${s}=${v}`),`${a}&${L}`},"").substr(1):null,lr=(n,t={})=>{let r=Object.assign({method:n.method||"GET",headers:n.headers},t),i=or(n.headers)["content-type"]||"";if(typeof n.data=="string")r.body=n.data;else if(i.includes("application/x-www-form-urlencoded")){let s=new URLSearchParams;for(let[b,v]of Object.entries(n.data||{}))s.set(b,v);r.body=s.toString()}else if(i.includes("multipart/form-data")||n.data instanceof FormData){let s=new FormData;if(n.data instanceof FormData)n.data.forEach((v,L)=>{s.append(L,v)});else for(let v of Object.keys(n.data))s.append(v,n.data[v]);r.body=s;let b=new Headers(r.headers);b.delete("content-type"),r.headers=b}else(i.includes("application/json")||typeof n.data=="object")&&(r.body=JSON.stringify(n.data));return r},et=class extends xe{async request(t){let r=lr(t,t.webFetchExtra),a=sr(t.params,t.shouldEncodeUrlParams),i=a?`${t.url}?${a}`:t.url,s=await fetch(i,r),b=s.headers.get("content-type")||"",{responseType:v="text"}=s.ok?t:{};b.includes("application/json")&&(v="json");let L,T;switch(v){case"arraybuffer":case"blob":T=await s.blob(),L=await ir(T);break;case"json":L=await s.json();break;case"document":case"text":default:L=await s.text()}let Y={};return s.headers.forEach((A,B)=>{Y[B]=A}),{data:L,headers:Y,status:s.status,url:s.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}},Nr=$e("CapacitorHttp",{web:()=>new et})});var Ke,He,Dt=ue(()=>{Ke=class{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(r){return Promise.reject(r)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(r){return Promise.reject(r)}}async getFromLocalDiskToStore(t){let r=t!=null?t:!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:r}),Promise.resolve()}catch(a){return Promise.reject(a)}}async echo(t){try{let r=await this.sqlite.echo({value:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async isSecretStored(){try{let t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(r){return Promise.reject(r)}}async changeEncryptionSecret(t,r){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:r}),Promise.resolve()}catch(a){return Promise.reject(a)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{let r=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async addUpgradeStatement(t,r){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:r}),Promise.resolve()}catch(a){return Promise.reject(a)}}async createConnection(t,r,a,i,s){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:r,mode:a,version:i,readonly:s});let b=new He(t,s,this.sqlite),v=s?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(v,b),Promise.resolve(b)}catch(b){return Promise.reject(b)}}async closeConnection(t,r){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:r});let a=r?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isConnection(t,r){let a={};t.endsWith(".db")&&(t=t.slice(0,-3));let i=r?`RO_${t}`:`RW_${t}`;return a.result=this._connectionDict.has(i),Promise.resolve(a)}async retrieveConnection(t,r){t.endsWith(".db")&&(t=t.slice(0,-3));let a=r?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(a)){let i=this._connectionDict.get(a);return typeof i!="undefined"?Promise.resolve(i):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,r){try{let a=await this.sqlite.getNCDatabasePath({path:t,database:r});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async createNCConnection(t,r){try{await this.sqlite.createNCConnection({databasePath:t,version:r});let a=new He(t,!0,this.sqlite),i=`RO_${t})`;return this._connectionDict.set(i,a),Promise.resolve(a)}catch(a){return Promise.reject(a)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});let r=`RO_${t})`;return this._connectionDict.delete(r),Promise.resolve()}catch(r){return Promise.reject(r)}}async isNCConnection(t){let r={},a=`RO_${t})`;return r.result=this._connectionDict.has(a),Promise.resolve(r)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){let r=`RO_${t})`,a=this._connectionDict.get(r);return typeof a!="undefined"?Promise.resolve(a):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{let r=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){let t=new Map;try{for(let r of this._connectionDict.keys()){let a=r.substring(3),i=r.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:a,readonly:i}),t.set(r,null)}for(let r of t.keys())this._connectionDict.delete(r);return Promise.resolve()}catch(r){return Promise.reject(r)}}async checkConnectionsConsistency(){try{let t=[...this._connectionDict.keys()],r=[],a=[];for(let s of t)r.push(s.substring(0,2)),a.push(s.substring(3));let i=await this.sqlite.checkConnectionsConsistency({dbNames:a,openModes:r});return i.result||(this._connectionDict=new Map),Promise.resolve(i)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{let r=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async isJsonValid(t){try{let r=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async copyFromAssets(t){let r=t!=null?t:!0;try{return await this.sqlite.copyFromAssets({overwrite:r}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromHTTPRequest(t,r){let a=r!=null?r:!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:a}),Promise.resolve()}catch(i){return Promise.reject(i)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{let r=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async isInConfigEncryption(){try{let t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{let t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{let r=await this.sqlite.isDatabase({database:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async getDatabaseList(){try{let r=(await this.sqlite.getDatabaseList()).values;r.sort();let a={values:r};return Promise.resolve(a)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){let r=t||"default";try{let a=await this.sqlite.getMigratableDbList({folderPath:r});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addSQLiteSuffix(t,r){let a=t||"default",i=r||[];try{let s=await this.sqlite.addSQLiteSuffix({folderPath:a,dbNameList:i});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteOldDatabases(t,r){let a=t||"default",i=r||[];try{let s=await this.sqlite.deleteOldDatabases({folderPath:a,dbNameList:i});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async moveDatabasesAndAddSuffix(t,r){let a=t||"default",i=r||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:a,dbNameList:i})}},He=class{constructor(t,r,a){this.dbName=t,this.readonly=r,this.sqlite=a}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{let t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{let t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{let t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{let t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(r){return Promise.reject(r)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(r){return Promise.reject(r)}}async getUrl(){try{let t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{let t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{let t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,r=!0,a=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{let i=await this.sqlite.execute({database:this.dbName,statements:t,transaction:r,readonly:!1,isSQL92:a});return Promise.resolve(i)}}catch(i){return Promise.reject(i)}}async query(t,r,a=!0){let i;try{return r&&r.length>0?i=await this.sqlite.query({database:this.dbName,statement:t,values:r,readonly:this.readonly,isSQL92:!0}):i=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:a}),i=await this.reorderRows(i),Promise.resolve(i)}catch(s){return Promise.reject(s)}}async run(t,r,a=!0,i="no",s=!0){let b;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(r&&r.length>0?b=await this.sqlite.run({database:this.dbName,statement:t,values:r,transaction:a,readonly:!1,returnMode:i,isSQL92:!0}):b=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:a,readonly:!1,returnMode:i,isSQL92:s}),b.changes=await this.reorderRows(b.changes),Promise.resolve(b))}catch(v){return Promise.reject(v)}}async executeSet(t,r=!0,a="no",i=!0){let s;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(s=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:r,readonly:!1,returnMode:a,isSQL92:i}),s.changes=await this.reorderRows(s.changes),Promise.resolve(s))}catch(b){return Promise.reject(b)}}async isExists(){try{let t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{let r=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async isDBOpen(){try{let t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{let t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(r){return Promise.reject(r)}}async getSyncDate(){try{let t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly}),r="";return t.syncDate>0&&(r=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(r)}catch(t){return Promise.reject(t)}}async exportToJson(t,r=!1){try{let a=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:r});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,r=!0){let a=0,i=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),i=await this.sqlite.isTransactionActive({database:this.dbName}),!i)return Promise.reject("After Begin Transaction, no transaction active");try{for(let v of t){if(typeof v!="object"||!("statement"in v))throw new Error("Error a task.statement must be provided");if("values"in v&&v.values&&v.values.length>0){let L=v.statement.toUpperCase().includes("RETURNING")?"all":"no",T=await this.sqlite.run({database:this.dbName,statement:v.statement,values:v.values,transaction:!1,readonly:!1,returnMode:L,isSQL92:r});if(T.changes.changes<0)throw new Error("Error in transaction method run ");a+=T.changes.changes}else{let L=await this.sqlite.execute({database:this.dbName,statements:v.statement,transaction:!1,readonly:!1});if(L.changes.changes<0)throw new Error("Error in transaction method execute ");a+=L.changes.changes}}let s=await this.sqlite.commitTransaction({database:this.dbName});a+=s.changes.changes;let b={changes:{changes:a}};return Promise.resolve(b)}catch(s){let b=s.message?s.message:s;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(b)}}async reorderRows(t){let r=t;if(t!=null&&t.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){let a=t.values[0].ios_columns,i=[];for(let s=1;s<t.values.length;s++){let b=t.values[s],v={};for(let L of a)v[L]=b[L];i.push(v)}r.values=i}return Promise.resolve(r)}}});var Ot={};Ne(Ot,{CapacitorSQLiteWeb:()=>rt});var rt,$t=ue(()=>{tt();rt=class extends xe{constructor(){super(...arguments),this.jeepSqliteElement=null,this.isWebStoreOpen=!1}async initWebStore(){await customElements.whenDefined("jeep-sqlite"),this.jeepSqliteElement=document.querySelector("jeep-sqlite"),this.ensureJeepSqliteIsAvailable(),this.jeepSqliteElement.addEventListener("jeepSqliteImportProgress",t=>{this.notifyListeners("sqliteImportProgressEvent",t.detail)}),this.jeepSqliteElement.addEventListener("jeepSqliteExportProgress",t=>{this.notifyListeners("sqliteExportProgressEvent",t.detail)}),this.jeepSqliteElement.addEventListener("jeepSqliteHTTPRequestEnded",t=>{this.notifyListeners("sqliteHTTPRequestEndedEvent",t.detail)}),this.jeepSqliteElement.addEventListener("jeepSqlitePickDatabaseEnded",t=>{this.notifyListeners("sqlitePickDatabaseEndedEvent",t.detail)}),this.jeepSqliteElement.addEventListener("jeepSqliteSaveDatabaseToDisk",t=>{this.notifyListeners("sqliteSaveDatabaseToDiskEvent",t.detail)}),this.isWebStoreOpen||(this.isWebStoreOpen=await this.jeepSqliteElement.isStoreOpen())}async saveToStore(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.saveToStore(t);return}catch(r){throw new Error(`${r}`)}}async getFromLocalDiskToStore(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.getFromLocalDiskToStore(t);return}catch(r){throw new Error(`${r}`)}}async saveToLocalDisk(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.saveToLocalDisk(t);return}catch(r){throw new Error(`${r}`)}}async echo(t){return this.ensureJeepSqliteIsAvailable(),await this.jeepSqliteElement.echo(t)}async createConnection(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.createConnection(t);return}catch(r){throw new Error(`${r}`)}}async open(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.open(t);return}catch(r){throw new Error(`${r}`)}}async closeConnection(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.closeConnection(t);return}catch(r){throw new Error(`${r}`)}}async getVersion(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.getVersion(t)}catch(r){throw new Error(`${r}`)}}async checkConnectionsConsistency(t){this.ensureJeepSqliteIsAvailable();try{return await this.jeepSqliteElement.checkConnectionsConsistency(t)}catch(r){throw new Error(`${r}`)}}async close(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.close(t);return}catch(r){throw new Error(`${r}`)}}async beginTransaction(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.beginTransaction(t)}catch(r){throw new Error(`${r}`)}}async commitTransaction(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.commitTransaction(t)}catch(r){throw new Error(`${r}`)}}async rollbackTransaction(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.rollbackTransaction(t)}catch(r){throw new Error(`${r}`)}}async isTransactionActive(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isTransactionActive(t)}catch(r){throw new Error(`${r}`)}}async getTableList(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.getTableList(t)}catch(r){throw new Error(`${r}`)}}async execute(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.execute(t)}catch(r){throw new Error(`${r}`)}}async executeSet(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.executeSet(t)}catch(r){throw new Error(`${r}`)}}async run(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.run(t)}catch(r){throw new Error(`${r}`)}}async query(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.query(t)}catch(r){throw new Error(`${r}`)}}async isDBExists(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isDBExists(t)}catch(r){throw new Error(`${r}`)}}async isDBOpen(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isDBOpen(t)}catch(r){throw new Error(`${r}`)}}async isDatabase(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isDatabase(t)}catch(r){throw new Error(`${r}`)}}async isTableExists(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isTableExists(t)}catch(r){throw new Error(`${r}`)}}async deleteDatabase(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.deleteDatabase(t);return}catch(r){throw new Error(`${r}`)}}async isJsonValid(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isJsonValid(t)}catch(r){throw new Error(`${r}`)}}async importFromJson(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.importFromJson(t)}catch(r){throw new Error(`${r}`)}}async exportToJson(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.exportToJson(t)}catch(r){throw new Error(`${r}`)}}async createSyncTable(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.createSyncTable(t)}catch(r){throw new Error(`${r}`)}}async setSyncDate(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.setSyncDate(t);return}catch(r){throw new Error(`${r}`)}}async getSyncDate(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.getSyncDate(t)}catch(r){throw new Error(`${r}`)}}async deleteExportedRows(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.deleteExportedRows(t);return}catch(r){throw new Error(`${r}`)}}async addUpgradeStatement(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.addUpgradeStatement(t);return}catch(r){throw new Error(`${r}`)}}async copyFromAssets(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.copyFromAssets(t);return}catch(r){throw new Error(`${r}`)}}async getFromHTTPRequest(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.getFromHTTPRequest(t);return}catch(r){throw new Error(`${r}`)}}async getDatabaseList(){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.getDatabaseList()}catch(t){throw new Error(`${t}`)}}ensureJeepSqliteIsAvailable(){if(this.jeepSqliteElement===null)throw new Error("The jeep-sqlite element is not present in the DOM! Please check the @capacitor-community/sqlite documentation for instructions regarding the web platform.")}ensureWebstoreIsOpen(){if(!this.isWebStoreOpen)throw new Error('WebStore is not open yet. You have to call "initWebStore()" first.')}async getUrl(){throw this.unimplemented("Not implemented on web.")}async getMigratableDbList(t){throw console.log("getMigratableDbList",t),this.unimplemented("Not implemented on web.")}async addSQLiteSuffix(t){throw console.log("addSQLiteSuffix",t),this.unimplemented("Not implemented on web.")}async deleteOldDatabases(t){throw console.log("deleteOldDatabases",t),this.unimplemented("Not implemented on web.")}async moveDatabasesAndAddSuffix(t){throw console.log("moveDatabasesAndAddSuffix",t),this.unimplemented("Not implemented on web.")}async isSecretStored(){throw this.unimplemented("Not implemented on web.")}async setEncryptionSecret(t){throw console.log("setEncryptionSecret",t),this.unimplemented("Not implemented on web.")}async changeEncryptionSecret(t){throw console.log("changeEncryptionSecret",t),this.unimplemented("Not implemented on web.")}async clearEncryptionSecret(){throw console.log("clearEncryptionSecret"),this.unimplemented("Not implemented on web.")}async checkEncryptionSecret(t){throw console.log("checkEncryptionPassPhrase",t),this.unimplemented("Not implemented on web.")}async getNCDatabasePath(t){throw console.log("getNCDatabasePath",t),this.unimplemented("Not implemented on web.")}async createNCConnection(t){throw console.log("createNCConnection",t),this.unimplemented("Not implemented on web.")}async closeNCConnection(t){throw console.log("closeNCConnection",t),this.unimplemented("Not implemented on web.")}async isNCDatabase(t){throw console.log("isNCDatabase",t),this.unimplemented("Not implemented on web.")}async isDatabaseEncrypted(t){throw console.log("isDatabaseEncrypted",t),this.unimplemented("Not implemented on web.")}async isInConfigEncryption(){throw this.unimplemented("Not implemented on web.")}async isInConfigBiometricAuth(){throw this.unimplemented("Not implemented on web.")}async loadExtension(t){throw console.log("loadExtension",t),this.unimplemented("Not implemented on web.")}async enableLoadExtension(t){throw console.log("enableLoadExtension",t),this.unimplemented("Not implemented on web.")}}});var Kt,Ht=ue(()=>{tt();Dt();Kt=$e("CapacitorSQLite",{web:()=>Promise.resolve().then(()=>($t(),Ot)).then(n=>new n.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite})});var jt={};Ne(jt,{getCardById:()=>fr,getCardIds:()=>pr,getCardsByIds:()=>br,getDaten:()=>ur,getEnergieById:()=>Pr,getEnergieCardIds:()=>Tr,getEnergies:()=>Cr,getEngName:()=>hr,getName:()=>mr,getTrainerById:()=>kr,getTrainerCardIds:()=>Sr,getTrainers:()=>wr,initDatabase:()=>dr,insertCard:()=>yr,insertEnergie:()=>Lr,insertTrainer:()=>Er,updateCardIds:()=>gr,updatePrice:()=>vr});async function dr(){return D=await cr.createConnection("pokepicker",!1,"no-encryption",1),await D.open(),await D.execute(`
    CREATE TABLE IF NOT EXISTS pokemon (
      id INTEGER PRIMARY KEY,
      dex TEXT,
      name TEXT,
      engName TEXT,
      cardIds TEXT
    );
  `),await D.execute(`
    CREATE TABLE IF NOT EXISTS trainer (
      id INTEGER PRIMARY KEY,
      cardId TEXT,
      rarity TEXT,
      setName TEXT,
      basic INTEGER DEFAULT 0,
      reverse INTEGER DEFAULT 0,
      holo INTEGER DEFAULT 0,
      firstEdition INTEGER DEFAULT 0,
      addedAt TEXT,
      imageLow TEXT,
      imageHigh TEXT,
      cardName TEXT,
      subTypes TEXT,
      avg30 REAL
    );
  `),await D.execute(`
    CREATE TABLE IF NOT EXISTS energy (
      id INTEGER PRIMARY KEY,
      cardId TEXT,
      rarity TEXT,
      setName TEXT,
      basic INTEGER DEFAULT 0,
      reverse INTEGER DEFAULT 0,
      holo INTEGER DEFAULT 0,
      firstEdition INTEGER DEFAULT 0,
      addedAt TEXT,
      imageLow TEXT,
      imageHigh TEXT,
      cardName TEXT,
      subTypes TEXT,
      avg30 REAL
    );
  `),await D.execute(`
    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY,
      cardId TEXT,
      rarity TEXT,
      setName TEXT,
      basic INTEGER DEFAULT 0,
      reverse INTEGER DEFAULT 0,
      holo INTEGER DEFAULT 0,
      firstEdition INTEGER DEFAULT 0,
      addedAt TEXT,
      imageLow TEXT,
      imageHigh TEXT,
      cardName TEXT,
      subTypes TEXT,
      avg30 REAL
    );
  `),(await D.query("SELECT COUNT(*) as count FROM pokemon")).values[0].count===0&&await D.execute(`
      INSERT INTO pokemon (id, dex, name, engName)
      VALUES
        (1, "0001", "Bisasam", "Bulbasaur"),
        (2, "0002", "Bisaknosp", "Ivysaur"),
        (3, "0003", "Bisaflor", "Venusaur"),
        (4, "0004", "Glumanda", "Charmander"),
        (5, "0005", "Glutexo", "Charmeleon"),
        (6, "0006", "Glurak", "Charizard"),
        (7, "0007", "Schiggy", "Squirtle"),
        (8, "0008", "Schillok", "Wartortle"),
        (9, "0009", "Turtok", "Blastoise"),
        (10, "0010", "Raupy", "Caterpie"),
        (11, "0011", "Safcon", "Metapod"),
        (12, "0012", "Smettbo", "Butterfree"),
        (13, "0013", "Hornliu", "Weedle"),
        (14, "0014", "Kokuna", "Kakuna"),
        (15, "0015", "Bibor", "Beedrill"),
        (16, "0016", "Taubsi", "Pidgey"),
        (17, "0017", "Tauboga", "Pidgeotto"),
        (18, "0018", "Tauboss", "Pidgeot"),
        (19, "0019", "Rattfratz", "Rattata"),
        (20, "0020", "Rattikarl", "Raticate"),
        (21, "0021", "Habitak", "Spearow"),
        (22, "0022", "Ibitak", "Fearow"),
        (23, "0023", "Rettan", "Ekans"),
        (24, "0024", "Arbok", "Arbok"),
        (25, "0025", "Pikachu", "Pikachu"),
        (26, "0026", "Raichu", "Raichu"),
        (27, "0027", "Sandan", "Sandshrew"),
        (28, "0028", "Sandamer", "Sandslash"),
        (29, "0029", "Nidoran\u2640", "Nidoran \u2640"),
        (30, "0030", "Nidorina", "Nidorina"),
        (31, "0031", "Nidoqueen", "Nidoqueen"),
        (32, "0032", "Nidoran\u2642", "Nidoran \u2642"),
        (33, "0033", "Nidorino", "Nidorino"),
        (34, "0034", "Nidoking", "Nidoking"),
        (35, "0035", "Piepi", "Clefairy"),
        (36, "0036", "Pixi", "Clefable"),
        (37, "0037", "Vulpix", "Vulpix"),
        (38, "0038", "Vulnona", "Ninetales"),
        (39, "0039", "Pummeluff", "Jigglypuff"),
        (40, "0040", "Knuddeluff", "Wigglytuff"),
        (41, "0041", "Zubat", "Zubat"),
        (42, "0042", "Golbat", "Golbat"),
        (43, "0043", "Myrapla", "Oddish"),
        (44, "0044", "Duflor", "Gloom"),
        (45, "0045", "Giflor", "Vileplume"),
        (46, "0046", "Paras", "Paras"),
        (47, "0047", "Parasek", "Parasect"),
        (48, "0048", "Bluzuk", "Venonat"),
        (49, "0049", "Omot", "Venomoth"),
        (50, "0050", "Digda", "Diglett"),
        (51, "0051", "Digdri", "Dugtrio"),
        (52, "0052", "Mauzi", "Meowth"),
        (53, "0053", "Snobilikat", "Persian"),
        (54, "0054", "Enton", "Psyduck"),
        (55, "0055", "Entoron", "Golduck"),
        (56, "0056", "Menki", "Mankey"),
        (57, "0057", "Rasaff", "Primeape"),
        (58, "0058", "Fukano", "Growlithe"),
        (59, "0059", "Arkani", "Arcanine"),
        (60, "0060", "Quapsel", "Poliwag"),
        (61, "0061", "Quaputzi", "Poliwhirl"),
        (62, "0062", "Quappo", "Poliwrath"),
        (63, "0063", "Abra", "Abra"),
        (64, "0064", "Kadabra", "Kadabra"),
        (65, "0065", "Simsala", "Alakazam"),
        (66, "0066", "Machollo", "Machop"),
        (67, "0067", "Maschock", "Machoke"),
        (68, "0068", "Machomei", "Machamp"),
        (69, "0069", "Knofensa", "Bellsprout"),
        (70, "0070", "Ultrigaria", "Weepinbell"),
        (71, "0071", "Sarzenia", "Victreebel"),
        (72, "0072", "Tentacha", "Tentacool"),
        (73, "0073", "Tentoxa", "Tentacruel"),
        (74, "0074", "Kleinstein", "Geodude"),
        (75, "0075", "Georok", "Graveler"),
        (76, "0076", "Geowaz", "Golem"),
        (77, "0077", "Ponita", "Ponyta"),
        (78, "0078", "Gallopa", "Rapidash"),
        (79, "0079", "Flegmon", "Slowpoke"),
        (80, "0080", "Lahmus", "Slowbro"),
        (81, "0081", "Magnetilo", "Magnemite"),
        (82, "0082", "Magneton", "Magneton"),
        (83, "0083", "Porenta", "Farfetch'd"),
        (84, "0084", "Dodu", "Doduo"),
        (85, "0085", "Dodri", "Dodrio"),
        (86, "0086", "Jurob", "Seel"),
        (87, "0087", "Jugong", "Dewgong"),
        (88, "0088", "Sleima", "Grimer"),
        (89, "0089", "Sleimok", "Muk"),
        (90, "0090", "Muschas", "Shellder"),
        (91, "0091", "Austos", "Cloyster"),
        (92, "0092", "Nebulak", "Gastly"),
        (93, "0093", "Alpollo", "Haunter"),
        (94, "0094", "Gengar", "Gengar"),
        (95, "0095", "Onix", "Onix"),
        (96, "0096", "Traumato", "Drowzee"),
        (97, "0097", "Hypno", "Hypno"),
        (98, "0098", "Krabby", "Krabby"),
        (99, "0099", "Kingler", "Kingler"),
        (100, "0100", "Voltobal", "Voltorb"),
        (101, "0101", "Lektrobal", "Electrode"),
        (102, "0102", "Owei", "Exeggcute"),
        (103, "0103", "Kokowei", "Exeggutor"),
        (104, "0104", "Tragosso", "Cubone"),
        (105, "0105", "Knogga", "Marowak"),
        (106, "0106", "Kicklee", "Hitmonlee"),
        (107, "0107", "Nockchan", "Hitmonchan"),
        (108, "0108", "Schlurp", "Lickitung"),
        (109, "0109", "Smogon", "Koffing"),
        (110, "0110", "Smogmog", "Weezing"),
        (111, "0111", "Rihorn", "Rhyhorn"),
        (112, "0112", "Rizeros", "Rhydon"),
        (113, "0113", "Chaneira", "Chansey"),
        (114, "0114", "Tangela", "Tangela"),
        (115, "0115", "Kangama", "Kangaskhan"),
        (116, "0116", "Seeper", "Horsea"),
        (117, "0117", "Seemon", "Seadra"),
        (118, "0118", "Goldini", "Goldeen"),
        (119, "0119", "Golking", "Seaking"),
        (120, "0120", "Sterndu", "Staryu"),
        (121, "0121", "Starmie", "Starmie"),
        (122, "0122", "Pantimos", "Mr. Mime"),
        (123, "0123", "Sichlor", "Scyther"),
        (124, "0124", "Rossana", "Jynx"),
        (125, "0125", "Elektek", "Electabuzz"),
        (126, "0126", "Magmar", "Magmar"),
        (127, "0127", "Pinsir", "Pinsir"),
        (128, "0128", "Tauros", "Tauros"),
        (129, "0129", "Karpador", "Magikarp"),
        (130, "0130", "Garados", "Gyarados"),
        (131, "0131", "Lapras", "Lapras"),
        (132, "0132", "Ditto", "Ditto"),
        (133, "0133", "Evoli", "Eevee"),
        (134, "0134", "Aquana", "Vaporeon"),
        (135, "0135", "Blitza", "Jolteon"),
        (136, "0136", "Flamara", "Flareon"),
        (137, "0137", "Porygon", "Porygon"),
        (138, "0138", "Amonitas", "Omanyte"),
        (139, "0139", "Amoroso", "Omastar"),
        (140, "0140", "Kabuto", "Kabuto"),
        (141, "0141", "Kabutops", "Kabutops"),
        (142, "0142", "Aerodactyl", "Aerodactyl"),
        (143, "0143", "Relaxo", "Snorlax"),
        (144, "0144", "Arktos", "Articuno"),
        (145, "0145", "Zapdos", "Zapdos"),
        (146, "0146", "Lavados", "Moltres"),
        (147, "0147", "Dratini", "Dratini"),
        (148, "0148", "Dragonir", "Dragonair"),
        (149, "0149", "Dragoran", "Dragonite"),
        (150, "0150", "Mewtu", "Mewtwo"),
        (151, "0151", "Mew", "Mew"),
        (152, "0152", "Endivie", "Chikorita"),
        (153, "0153", "Lorblatt", "Bayleef"),
        (154, "0154", "Meganie", "Meganium"),
        (155, "0155", "Feurigel", "Cyndaquil"),
        (156, "0156", "Igelavar", "Quilava"),
        (157, "0157", "Tornupto", "Typhlosion"),
        (158, "0158", "Karnimani", "Totodile"),
        (159, "0159", "Tyracroc", "Croconaw"),
        (160, "0160", "Impergator", "Feraligatr"),
        (161, "0161", "Wiesor", "Sentret"),
        (162, "0162", "Wiesenior", "Furret"),
        (163, "0163", "Hoothoot", "Hoothoot"),
        (164, "0164", "Noctuh", "Noctowl"),
        (165, "0165", "Ledyba", "Ledyba"),
        (166, "0166", "Ledian", "Ledian"),
        (167, "0167", "Webarak", "Spinarak"),
        (168, "0168", "Ariados", "Ariados"),
        (169, "0169", "Iksbat", "Crobat"),
        (170, "0170", "Lampi", "Chinchou"),
        (171, "0171", "Lanturn", "Lanturn"),
        (172, "0172", "Pichu", "Pichu"),
        (173, "0173", "Pii", "Cleffa"),
        (174, "0174", "Fluffeluff", "Igglybuff"),
        (175, "0175", "Togepi", "Togepi"),
        (176, "0176", "Togetic", "Togetic"),
        (177, "0177", "Natu", "Natu"),
        (178, "0178", "Xatu", "Xatu"),
        (179, "0179", "Voltilamm", "Mareep"),
        (180, "0180", "Waaty", "Flaaffy"),
        (181, "0181", "Ampharos", "Ampharos"),
        (182, "0182", "Blubella", "Bellossom"),
        (183, "0183", "Marill", "Marill"),
        (184, "0184", "Azumarill", "Azumarill"),
        (185, "0185", "Mogelbaum", "Sudowoodo"),
        (186, "0186", "Quaxo", "Politoed"),
        (187, "0187", "Hoppspross", "Hoppip"),
        (188, "0188", "Hubelupf", "Skiploom"),
        (189, "0189", "Papungha", "Jumpluff"),
        (190, "0190", "Griffel", "Aipom"),
        (191, "0191", "Sonnkern", "Sunkern"),
        (192, "0192", "Sonnflora", "Sunflora"),
        (193, "0193", "Yanma", "Yanma"),
        (194, "0194", "Felino", "Wooper"),
        (195, "0195", "Morlord", "Quagsire"),
        (196, "0196", "Psiana", "Espeon"),
        (197, "0197", "Nachtara", "Umbreon"),
        (198, "0198", "Kramurx", "Murkrow"),
        (199, "0199", "Laschoking", "Slowking"),
        (200, "0200", "Traunfugil", "Misdreavus"),
        (201, "0201", "Icognito", "Unown"),
        (202, "0202", "Woingenau", "Wobbuffet"),
        (203, "0203", "Girafarig", "Girafarig"),
        (204, "0204", "Tannza", "Pineco"),
        (205, "0205", "Forstellka", "Forretress"),
        (206, "0206", "Dummisel", "Dunsparce"),
        (207, "0207", "Skorgla", "Gligar"),
        (208, "0208", "Stahlos", "Steelix"),
        (209, "0209", "Snubbull", "Snubbull"),
        (210, "0210", "Granbull", "Granbull"),
        (211, "0211", "Baldorfish", "Qwilfish"),
        (212, "0212", "Scherox", "Scizor"),
        (213, "0213", "Pottrott", "Shuckle"),
        (214, "0214", "Skaraborn", "Heracross"),
        (215, "0215", "Sniebel", "Sneasel"),
        (216, "0216", "Teddiursa", "Teddiursa"),
        (217, "0217", "Ursaring", "Ursaring"),
        (218, "0218", "Schneckmag", "Slugma"),
        (219, "0219", "Magcargo", "Magcargo"),
        (220, "0220", "Quiekel", "Swinub"),
        (221, "0221", "Keifel", "Piloswine"),
        (222, "0222", "Corasonn", "Corsola"),
        (223, "0223", "Remoraid", "Remoraid"),
        (224, "0224", "Octillery", "Octillery"),
        (225, "0225", "Botogel", "Delibird"),
        (226, "0226", "Mantax", "Mantine"),
        (227, "0227", "Panzaeron", "Skarmory"),
        (228, "0228", "Hunduster", "Houndour"),
        (229, "0229", "Hundemon", "Houndoom"),
        (230, "0230", "Seedraking", "Kingdra"),
        (231, "0231", "Phanpy", "Phanpy"),
        (232, "0232", "Donphan", "Donphan"),
        (233, "0233", "Porygon2", "Porygon2"),
        (234, "0234", "Damhirplex", "Stantler"),
        (235, "0235", "Farbeagle", "Smeargle"),
        (236, "0236", "Rabauz", "Tyrogue"),
        (237, "0237", "Kapoera", "Hitmontop"),
        (238, "0238", "Kussilla", "Smoochum"),
        (239, "0239", "Elekid", "Elekid"),
        (240, "0240", "Magby", "Magby"),
        (241, "0241", "Miltank", "Miltank"),
        (242, "0242", "Heiteira", "Blissey"),
        (243, "0243", "Raikou", "Raikou"),
        (244, "0244", "Entei", "Entei"),
        (245, "0245", "Suicune", "Suicune"),
        (246, "0246", "Larvitar", "Larvitar"),
        (247, "0247", "Pupitar", "Pupitar"),
        (248, "0248", "Despotar", "Tyranitar"),
        (249, "0249", "Lugia", "Lugia"),
        (250, "0250", "Ho-Oh", "Ho-Oh"),
        (251, "0251", "Celebi", "Celebi"),
        (252, "0252", "Geckarbor", "Treecko"),
        (253, "0253", "Reptain", "Grovyle"),
        (254, "0254", "Gewaldro", "Sceptile"),
        (255, "0255", "Flemmli", "Torchic"),
        (256, "0256", "Jungglut", "Combusken"),
        (257, "0257", "Lohgock", "Blaziken"),
        (258, "0258", "Hydropi", "Mudkip"),
        (259, "0259", "Moorabbel", "Marshtomp"),
        (260, "0260", "Sumpex", "Swampert"),
        (261, "0261", "Fiffyen", "Poochyena"),
        (262, "0262", "Magnayen", "Mightyena"),
        (263, "0263", "Zigzachs", "Zigzagoon"),
        (264, "0264", "Geradaks", "Linoone"),
        (265, "0265", "Waumpel", "Wurmple"),
        (266, "0266", "Schaloko", "Silcoon"),
        (267, "0267", "Papinella", "Beautifly"),
        (268, "0268", "Panekon", "Cascoon"),
        (269, "0269", "Pudox", "Dustox"),
        (270, "0270", "Loturzel", "Lotad"),
        (271, "0271", "Lombrero", "Lombre"),
        (272, "0272", "Kappalores", "Ludicolo"),
        (273, "0273", "Samurzel", "Seedot"),
        (274, "0274", "Blanas", "Nuzleaf"),
        (275, "0275", "Tengulist", "Shiftry"),
        (276, "0276", "Schwalbini", "Taillow"),
        (277, "0277", "Schwalboss", "Swellow"),
        (278, "0278", "Wingull", "Wingull"),
        (279, "0279", "Pelipper", "Pelipper"),
        (280, "0280", "Trasla", "Ralts"),
        (281, "0281", "Kirlia", "Kirlia"),
        (282, "0282", "Guardevoir", "Gardevoir"),
        (283, "0283", "Gehweiher", "Surskit"),
        (284, "0284", "Maskeregen", "Masquerain"),
        (285, "0285", "Knilz", "Shroomish"),
        (286, "0286", "Kapilz", "Breloom"),
        (287, "0287", "Bummelz", "Slakoth"),
        (288, "0288", "Muntier", "Vigoroth"),
        (289, "0289", "Letarking", "Slaking"),
        (290, "0290", "Nincada", "Nincada"),
        (291, "0291", "Ninjask", "Ninjask"),
        (292, "0292", "Ninjatom", "Shedinja"),
        (293, "0293", "Flurmel", "Whismur"),
        (294, "0294", "Krakeelo", "Loudred"),
        (295, "0295", "Krawumms", "Exploud"),
        (296, "0296", "Makuhita", "Makuhita"),
        (297, "0297", "Hariyama", "Hariyama"),
        (298, "0298", "Azurill", "Azurill"),
        (299, "0299", "Nasgnet", "Nosepass"),
        (300, "0300", "Eneco", "Skitty"),
        (301, "0301", "Enekoro", "Delcatty"),
        (302, "0302", "Zobiris", "Sableye"),
        (303, "0303", "Flunkifer", "Mawile"),
        (304, "0304", "Stollunior", "Aron"),
        (305, "0305", "Stollrak", "Lairon"),
        (306, "0306", "Stolloss", "Aggron"),
        (307, "0307", "Meditie", "Meditite"),
        (308, "0308", "Meditalis", "Medicham"),
        (309, "0309", "Frizelbliz", "Electrike"),
        (310, "0310", "Voltenso", "Manectric"),
        (311, "0311", "Plusle", "Plusle"),
        (312, "0312", "Minun", "Minun"),
        (313, "0313", "Volbeat", "Volbeat"),
        (314, "0314", "Illumise", "Illumise"),
        (315, "0315", "Roselia", "Roselia"),
        (316, "0316", "Schluppuck", "Gulpin"),
        (317, "0317", "Schlukwech", "Swalot"),
        (318, "0318", "Kanivanha", "Carvanha"),
        (319, "0319", "Tohaido", "Sharpedo"),
        (320, "0320", "Wailmer", "Wailmer"),
        (321, "0321", "Wailord", "Wailord"),
        (322, "0322", "Camaub", "Numel"),
        (323, "0323", "Camerupt", "Camerupt"),
        (324, "0324", "Qurtel", "Torkoal"),
        (325, "0325", "Spoink", "Spoink"),
        (326, "0326", "Groink", "Grumpig"),
        (327, "0327", "Pandir", "Spinda"),
        (328, "0328", "Knacklion", "Trapinch"),
        (329, "0329", "Vibrava", "Vibrava"),
        (330, "0330", "Libelldra", "Flygon"),
        (331, "0331", "Tuska", "Cacnea"),
        (332, "0332", "Noktuska", "Cacturne"),
        (333, "0333", "Wablu", "Swablu"),
        (334, "0334", "Altaria", "Altaria"),
        (335, "0335", "Sengo", "Zangoose"),
        (336, "0336", "Vipitis", "Seviper"),
        (337, "0337", "Lunastein", "Lunatone"),
        (338, "0338", "Sonnfel", "Solrock"),
        (339, "0339", "Schmerbe", "Barboach"),
        (340, "0340", "Welsar", "Whiscash"),
        (341, "0341", "Krebscorps", "Corphish"),
        (342, "0342", "Krebutack", "Crawdaunt"),
        (343, "0343", "Puppance", "Baltoy"),
        (344, "0344", "Lepumentas", "Claydol"),
        (345, "0345", "Liliep", "Lileep"),
        (346, "0346", "Wielie", "Cradily"),
        (347, "0347", "Anorith", "Anorith"),
        (348, "0348", "Armaldo", "Armaldo"),
        (349, "0349", "Barschwa", "Feebas"),
        (350, "0350", "Milotic", "Milotic"),
        (351, "0351", "Formeo", "Castform"),
        (352, "0352", "Kecleon", "Kecleon"),
        (353, "0353", "Shuppet", "Shuppet"),
        (354, "0354", "Banette", "Banette"),
        (355, "0355", "Zwirrlicht", "Duskull"),
        (356, "0356", "Zwirrklop", "Dusclops"),
        (357, "0357", "Tropius", "Tropius"),
        (358, "0358", "Palimpalim", "Chimecho"),
        (359, "0359", "Absol", "Absol"),
        (360, "0360", "Isso", "Wynaut"),
        (361, "0361", "Schneppke", "Snorunt"),
        (362, "0362", "Firnontor", "Glalie"),
        (363, "0363", "Seemops", "Spheal"),
        (364, "0364", "Seejong", "Sealeo"),
        (365, "0365", "Walraisa", "Walrein"),
        (366, "0366", "Perlu", "Clamperl"),
        (367, "0367", "Aalabyss", "Huntail"),
        (368, "0368", "Saganabyss", "Gorebyss"),
        (369, "0369", "Relicanth", "Relicanth"),
        (370, "0370", "Liebiskus", "Luvdisc"),
        (371, "0371", "Kindwurm", "Bagon"),
        (372, "0372", "Draschel", "Shelgon"),
        (373, "0373", "Brutalanda", "Salamence"),
        (374, "0374", "Tanhel", "Beldum"),
        (375, "0375", "Metang", "Metang"),
        (376, "0376", "Metagross", "Metagross"),
        (377, "0377", "Regirock", "Regirock"),
        (378, "0378", "Regice", "Regice"),
        (379, "0379", "Registeel", "Registeel"),
        (380, "0380", "Latias", "Latias"),
        (381, "0381", "Latios", "Latios"),
        (382, "0382", "Kyogre", "Kyogre"),
        (383, "0383", "Groudon", "Groudon"),
        (384, "0384", "Rayquaza", "Rayquaza"),
        (385, "0385", "Jirachi", "Jirachi"),
        (386, "0386", "Deoxys", "Deoxys"),
        (387, "0387", "Chelast", "Turtwig"),
        (388, "0388", "Chelcarain", "Grotle"),
        (389, "0389", "Chelterrar", "Torterra"),
        (390, "0390", "Panflam", "Chimchar"),
        (391, "0391", "Panpyro", "Monferno"),
        (392, "0392", "Panferno", "Infernape"),
        (393, "0393", "Plinfa", "Piplup"),
        (394, "0394", "Pliprin", "Prinplup"),
        (395, "0395", "Impoleon", "Empoleon"),
        (396, "0396", "Staralili", "Starly"),
        (397, "0397", "Staravia", "Staravia"),
        (398, "0398", "Staraptor", "Staraptor"),
        (399, "0399", "Bidiza", "Bidoof"),
        (400, "0400", "Bidifas", "Bibarel"),
        (401, "0401", "Zirpurze", "Kricketot"),
        (402, "0402", "Zirpeise", "Kricketune"),
        (403, "0403", "Sheinux", "Shinx"),
        (404, "0404", "Luxio", "Luxio"),
        (405, "0405", "Luxtra", "Luxray"),
        (406, "0406", "Knospi", "Budew"),
        (407, "0407", "Roserade", "Roserade"),
        (408, "0408", "Koknodon", "Cranidos"),
        (409, "0409", "Rameidon", "Rampardos"),
        (410, "0410", "Schilterus", "Shieldon"),
        (411, "0411", "Bollterus", "Bastiodon"),
        (412, "0412", "Burmy", "Burmy"),
        (413, "0413", "Burmadame", "Wormadam"),
        (414, "0414", "Moterpel", "Mothim"),
        (415, "0415", "Wadribie", "Combee"),
        (416, "0416", "Honweisel", "Vespiquen"),
        (417, "0417", "Pachirisu", "Pachirisu"),
        (418, "0418", "Bamelin", "Buizel"),
        (419, "0419", "Bojelin", "Floatzel"),
        (420, "0420", "Kikugi", "Cherubi"),
        (421, "0421", "Kinoso", "Cherrim"),
        (422, "0422", "Schalellos", "Shellos"),
        (423, "0423", "Gastrodon", "Gastrodon"),
        (424, "0424", "Ambidiffel", "Ambipom"),
        (425, "0425", "Driftlon", "Drifloon"),
        (426, "0426", "Drifzepeli", "Drifblim"),
        (427, "0427", "Haspiror", "Buneary"),
        (428, "0428", "Schlapor", "Lopunny"),
        (429, "0429", "Traunmagil", "Mismagius"),
        (430, "0430", "Kramshef", "Honchkrow"),
        (431, "0431", "Charmian", "Glameow"),
        (432, "0432", "Shnurgarst", "Purugly"),
        (433, "0433", "Klingplim", "Chingling"),
        (434, "0434", "Skunkapuh", "Stunky"),
        (435, "0435", "Skuntank", "Skuntank"),
        (436, "0436", "Bronzel", "Bronzor"),
        (437, "0437", "Bronzong", "Bronzong"),
        (438, "0438", "Mobai", "Bonsly"),
        (439, "0439", "Pantimimi", "Mime Jr."),
        (440, "0440", "Wonneira", "Happiny"),
        (441, "0441", "Plaudagei", "Chatot"),
        (442, "0442", "Kryppuk", "Spiritomb"),
        (443, "0443", "Kaumalat", "Gible"),
        (444, "0444", "Knarksel", "Gabite"),
        (445, "0445", "Knakrack", "Garchomp"),
        (446, "0446", "Mampfaxo", "Munchlax"),
        (447, "0447", "Riolu", "Riolu"),
        (448, "0448", "Lucario", "Lucario"),
        (449, "0449", "Hippopotas", "Hippopotas"),
        (450, "0450", "Hippoterus", "Hippowdon"),
        (451, "0451", "Pionskora", "Skorupi"),
        (452, "0452", "Piondragi", "Drapion"),
        (453, "0453", "Glibunkel", "Croagunk"),
        (454, "0454", "Toxiquak", "Toxicroak"),
        (455, "0455", "Venuflibis", "Carnivine"),
        (456, "0456", "Finneon", "Finneon"),
        (457, "0457", "Lumineon", "Lumineon"),
        (458, "0458", "Mantirps", "Mantyke"),
        (459, "0459", "Shnebedeck", "Snover"),
        (460, "0460", "Rexblisar", "Abomasnow"),
        (461, "0461", "Snibunna", "Weavile"),
        (462, "0462", "Magnezone", "Magnezone"),
        (463, "0463", "Schlurplek", "Lickilicky"),
        (464, "0464", "Rihornior", "Rhyperior"),
        (465, "0465", "Tangoloss", "Tangrowth"),
        (466, "0466", "Elevoltek", "Electivire"),
        (467, "0467", "Magbrant", "Magmortar"),
        (468, "0468", "Togekiss", "Togekiss"),
        (469, "0469", "Yanmega", "Yanmega"),
        (470, "0470", "Folipurba", "Leafeon"),
        (471, "0471", "Glaziola", "Glaceon"),
        (472, "0472", "Skorgro", "Gliscor"),
        (473, "0473", "Mamutel", "Mamoswine"),
        (474, "0474", "Porygon-Z", "Porygon-Z"),
        (475, "0475", "Galagladi", "Gallade"),
        (476, "0476", "Voluminas", "Probopass"),
        (477, "0477", "Zwirrfinst", "Dusknoir"),
        (478, "0478", "Frosdedje", "Froslass"),
        (479, "0479", "Rotom", "Rotom"),
        (480, "0480", "Selfe", "Uxie"),
        (481, "0481", "Vesprit", "Mesprit"),
        (482, "0482", "Tobutz", "Azelf"),
        (483, "0483", "Dialga", "Dialga"),
        (484, "0484", "Palkia", "Palkia"),
        (485, "0485", "Heatran", "Heatran"),
        (486, "0486", "Regigigas", "Regigigas"),
        (487, "0487", "Giratina", "Giratina"),
        (488, "0488", "Cresselia", "Cresselia"),
        (489, "0489", "Phione", "Phione"),
        (490, "0490", "Manaphy", "Manaphy"),
        (491, "0491", "Darkrai", "Darkrai"),
        (492, "0492", "Shaymin", "Shaymin"),
        (493, "0493", "Arceus", "Arceus"),
        (494, "0494", "Victini", "Victini"),
        (495, "0495", "Serpifeu", "Snivy"),
        (496, "0496", "Efoserp", "Servine"),
        (497, "0497", "Serpiroyal", "Serperior"),
        (498, "0498", "Floink", "Tepig"),
        (499, "0499", "Ferkokel", "Pignite"),
        (500, "0500", "Flambirex", "Emboar"),
        (501, "0501", "Ottaro", "Oshawott"),
        (502, "0502", "Zwottronin", "Dewott"),
        (503, "0503", "Admurai", "Samurott"),
        (504, "0504", "Nagelotz", "Patrat"),
        (505, "0505", "Kukmarda", "Watchog"),
        (506, "0506", "Yorkleff", "Lillipup"),
        (507, "0507", "Terribark", "Herdier"),
        (508, "0508", "Bissbark", "Stoutland"),
        (509, "0509", "Felilou", "Purrloin"),
        (510, "0510", "Kleoparda", "Liepard"),
        (511, "0511", "Vegimak", "Pansage"),
        (512, "0512", "Vegichita", "Simisage"),
        (513, "0513", "Grillmak", "Pansear"),
        (514, "0514", "Grillchita", "Simisear"),
        (515, "0515", "Sodamak", "Panpour"),
        (516, "0516", "Sodachita", "Simipour"),
        (517, "0517", "Somniam", "Munna"),
        (518, "0518", "Somnivora", "Musharna"),
        (519, "0519", "Dusselgurr", "Pidove"),
        (520, "0520", "Navitaub", "Tranquill"),
        (521, "0521", "Fasasnob", "Unfezant"),
        (522, "0522", "Elezeba", "Blitzle"),
        (523, "0523", "Zebritz", "Zebstrika"),
        (524, "0524", "Kiesling", "Roggenrola"),
        (525, "0525", "Sedimantur", "Boldore"),
        (526, "0526", "Brockoloss", "Gigalith"),
        (527, "0527", "Fleknoil", "Woobat"),
        (528, "0528", "Fletiamo", "Swoobat"),
        (529, "0529", "Rotomurf", "Drilbur"),
        (530, "0530", "Stalobor", "Excadrill"),
        (531, "0531", "Ohrdoch", "Audino"),
        (532, "0532", "Praktibalk", "Timburr"),
        (533, "0533", "Strepoli", "Gurdurr"),
        (534, "0534", "Meistagrif", "Conkeldurr"),
        (535, "0535", "Schallquap", "Tympole"),
        (536, "0536", "Mebrana", "Palpitoad"),
        (537, "0537", "Branawarz", "Seismitoad"),
        (538, "0538", "Jiutesto", "Throh"),
        (539, "0539", "Karadonis", "Sawk"),
        (540, "0540", "Strawickl", "Sewaddle"),
        (541, "0541", "Folikon", "Swadloon"),
        (542, "0542", "Matrifol", "Leavanny"),
        (543, "0543", "Toxiped", "Venipede"),
        (544, "0544", "Rollum", "Whirlipede"),
        (545, "0545", "Cerapendra", "Scolipede"),
        (546, "0546", "Waumboll", "Cottonee"),
        (547, "0547", "Elfun", "Whimsicott"),
        (548, "0548", "Lilminip", "Petilil"),
        (549, "0549", "Dressella", "Lilligant"),
        (550, "0550", "Barschuft", "Basculin"),
        (551, "0551", "Ganovil", "Sandile"),
        (552, "0552", "Rokkaiman", "Krokorok"),
        (553, "0553", "Rabigator", "Krookodile"),
        (554, "0554", "Flampion", "Darumaka"),
        (555, "0555", "Flampivian", "Darmanitan"),
        (556, "0556", "Maracamba", "Maractus"),
        (557, "0557", "Lithomith", "Dwebble"),
        (558, "0558", "Castellith", "Crustle"),
        (559, "0559", "Zurrokex", "Scraggy"),
        (560, "0560", "Irokex", "Scrafty"),
        (561, "0561", "Symvolara", "Sigilyph"),
        (562, "0562", "Makabaja", "Yamask"),
        (563, "0563", "Echnatoll", "Cofagrigus"),
        (564, "0564", "Galapaflos", "Tirtouga"),
        (565, "0565", "Karippas", "Carracosta"),
        (566, "0566", "Flapteryx", "Archen"),
        (567, "0567", "Aeropteryx", "Archeops"),
        (568, "0568", "Unrat\xFCtox", "Trubbish"),
        (569, "0569", "Deponitox", "Garbodor"),
        (570, "0570", "Zorua", "Zorua"),
        (571, "0571", "Zoroark", "Zoroark"),
        (572, "0572", "Picochilla", "Minccino"),
        (573, "0573", "Chillabell", "Cinccino"),
        (574, "0574", "Mollimorba", "Gothita"),
        (575, "0575", "Hypnomorba", "Gothorita"),
        (576, "0576", "Morbitesse", "Gothitelle"),
        (577, "0577", "Monozyto", "Solosis"),
        (578, "0578", "Mitodos", "Duosion"),
        (579, "0579", "Zytomega", "Reuniclus"),
        (580, "0580", "Piccolente", "Ducklett"),
        (581, "0581", "Swaroness", "Swanna"),
        (582, "0582", "Gelatini", "Vanillite"),
        (583, "0583", "Gelatroppo", "Vanillish"),
        (584, "0584", "Gelatwino", "Vanilluxe"),
        (585, "0585", "Sesokitz", "Deerling"),
        (586, "0586", "Kronjuwild", "Sawsbuck"),
        (587, "0587", "Emolga", "Emolga"),
        (588, "0588", "Laukaps", "Karrablast"),
        (589, "0589", "Cavalanzas", "Escavalier"),
        (590, "0590", "Tarnpignon", "Foongus"),
        (591, "0591", "Hutsassa", "Amoonguss"),
        (592, "0592", "Quabbel", "Frillish"),
        (593, "0593", "Apoquallyp", "Jellicent"),
        (594, "0594", "Mamolida", "Alomomola"),
        (595, "0595", "Wattzapf", "Joltik"),
        (596, "0596", "Voltula", "Galvantula"),
        (597, "0597", "Kastadur", "Ferroseed"),
        (598, "0598", "Tentantel", "Ferrothorn"),
        (599, "0599", "Klikk", "Klink"),
        (600, "0600", "Kliklak", "Klang"),
        (601, "0601", "Klikdiklak", "Klinklang"),
        (602, "0602", "Zapplardin", "Tynamo"),
        (603, "0603", "Zapplalek", "Eelektrik"),
        (604, "0604", "Zapplarang", "Eelektross"),
        (605, "0605", "Pygraulon", "Elgyem"),
        (606, "0606", "Megalon", "Beheeyem"),
        (607, "0607", "Lichtel", "Litwick"),
        (608, "0608", "Laternecto", "Lampent"),
        (609, "0609", "Skelabra", "Chandelure"),
        (610, "0610", "Milza", "Axew"),
        (611, "0611", "Sharfax", "Fraxure"),
        (612, "0612", "Maxax", "Haxorus"),
        (613, "0613", "Petznief", "Cubchoo"),
        (614, "0614", "Siberio", "Beartic"),
        (615, "0615", "Frigometri", "Cryogonal"),
        (616, "0616", "Schnuthelm", "Shelmet"),
        (617, "0617", "Hydragil", "Accelgor"),
        (618, "0618", "Flunschlik", "Stunfisk"),
        (619, "0619", "Lin-Fu", "Mienfoo"),
        (620, "0620", "Wie-Shu", "Mienshao"),
        (621, "0621", "Shardrago", "Druddigon"),
        (622, "0622", "Golbit", "Golett"),
        (623, "0623", "Golgantes", "Golurk"),
        (624, "0624", "Gladiantri", "Pawniard"),
        (625, "0625", "Caesurio", "Bisharp"),
        (626, "0626", "Bisofank", "Bouffalant"),
        (627, "0627", "Geronimatz", "Rufflet"),
        (628, "0628", "Washakwil", "Braviary"),
        (629, "0629", "Skallyk", "Vullaby"),
        (630, "0630", "Grypheldis", "Mandibuzz"),
        (631, "0631", "Furnifra\xDF", "Heatmor"),
        (632, "0632", "Fermicula", "Durant"),
        (633, "0633", "Kapuno", "Deino"),
        (634, "0634", "Duodino", "Zweilous"),
        (635, "0635", "Trikephalo", "Hydreigon"),
        (636, "0636", "Ignivor", "Larvesta"),
        (637, "0637", "Ramoth", "Volcarona"),
        (638, "0638", "Kobalium", "Cobalion"),
        (639, "0639", "Terrakium", "Terrakion"),
        (640, "0640", "Viridium", "Virizion"),
        (641, "0641", "Boreos", "Tornadus"),
        (642, "0642", "Voltolos", "Thundurus"),
        (643, "0643", "Reshiram", "Reshiram"),
        (644, "0644", "Zekrom", "Zekrom"),
        (645, "0645", "Demeteros", "Landorus"),
        (646, "0646", "Kyurem", "Kyurem"),
        (647, "0647", "Keldeo", "Keldeo"),
        (648, "0648", "Meloetta", "Meloetta"),
        (649, "0649", "Genesect", "Genesect"),
        (650, "0650", "Igamaro", "Chespin"),
        (651, "0651", "Igastarnish", "Quilladin"),
        (652, "0652", "Brigaron", "Chesnaught"),
        (653, "0653", "Fynx", "Fennekin"),
        (654, "0654", "Rutena", "Braixen"),
        (655, "0655", "Fennexis", "Delphox"),
        (656, "0656", "Froxy", "Froakie"),
        (657, "0657", "Amphizel", "Frogadier"),
        (658, "0658", "Quajutsu", "Greninja"),
        (659, "0659", "Scoppel", "Bunnelby"),
        (660, "0660", "Grebbit", "Diggersby"),
        (661, "0661", "Dartiri", "Fletchling"),
        (662, "0662", "Dartignis", "Fletchinder"),
        (663, "0663", "Fiaro", "Talonflame"),
        (664, "0664", "Purmel", "Scatterbug"),
        (665, "0665", "Puponcho", "Spewpa"),
        (666, "0666", "Vivillon", "Vivillon"),
        (667, "0667", "Leufeo", "Litleo"),
        (668, "0668", "Pyroleo", "Pyroar"),
        (669, "0669", "Flab\xE9b\xE9", "Flab\xE9b\xE9"),
        (670, "0670", "Floette", "Floette"),
        (671, "0671", "Florges", "Florges"),
        (672, "0672", "M\xE4hikel", "Skiddo"),
        (673, "0673", "Chevrumm", "Gogoat"),
        (674, "0674", "Pam-Pam", "Pancham"),
        (675, "0675", "Pandagro", "Pangoro"),
        (676, "0676", "Coiffwaff", "Furfrou"),
        (677, "0677", "Psiau", "Espurr"),
        (678, "0678", "Psiaugon", "Meowstic"),
        (679, "0679", "Gramokles", "Honedge"),
        (680, "0680", "Duokles", "Doublade"),
        (681, "0681", "Durengard", "Aegislash"),
        (682, "0682", "Parfi", "Spritzee"),
        (683, "0683", "Parfinesse", "Aromatisse"),
        (684, "0684", "Flauschling", "Swirlix"),
        (685, "0685", "Sabbaione", "Slurpuff"),
        (686, "0686", "Iscalar", "Inkay"),
        (687, "0687", "Calamanero", "Malamar"),
        (688, "0688", "Bithora", "Binacle"),
        (689, "0689", "Thanathora", "Barbaracle"),
        (690, "0690", "Algitt", "Skrelp"),
        (691, "0691", "Tandrak", "Dragalge"),
        (692, "0692", "Scampisto", "Clauncher"),
        (693, "0693", "Wummer", "Clawitzer"),
        (694, "0694", "Eguana", "Helioptile"),
        (695, "0695", "Elezard", "Heliolisk"),
        (696, "0696", "Balgoras", "Tyrunt"),
        (697, "0697", "Monargoras", "Tyrantrum"),
        (698, "0698", "Amarino", "Amaura"),
        (699, "0699", "Amagarga", "Aurorus"),
        (700, "0700", "Feelinara", "Sylveon"),
        (701, "0701", "Resladero", "Hawlucha"),
        (702, "0702", "Dedenne", "Dedenne"),
        (703, "0703", "Rocara", "Carbink"),
        (704, "0704", "Viscora", "Goomy"),
        (705, "0705", "Viscargot", "Sliggoo"),
        (706, "0706", "Viscogon", "Goodra"),
        (707, "0707", "Clavion", "Klefki"),
        (708, "0708", "Paragoni", "Phantump"),
        (709, "0709", "Trombork", "Trevenant"),
        (710, "0710", "Irrbis", "Pumpkaboo"),
        (711, "0711", "Pumpdjinn", "Gourgeist"),
        (712, "0712", "Arktip", "Bergmite"),
        (713, "0713", "Arktilas", "Avalugg"),
        (714, "0714", "eF-eM", "Noibat"),
        (715, "0715", "UHaFnir", "Noivern"),
        (716, "0716", "Xerneas", "Xerneas"),
        (717, "0717", "Yveltal", "Yveltal"),
        (718, "0718", "Zygarde", "Zygarde"),
        (719, "0719", "Diancie", "Diancie"),
        (720, "0720", "Hoopa", "Hoopa"),
        (721, "0721", "Volcanion", "Volcanion"),
        (722, "0722", "Bauz", "Rowlet"),
        (723, "0723", "Arboretoss", "Dartrix"),
        (724, "0724", "Silvarro", "Decidueye"),
        (725, "0725", "Flamiau", "Litten"),
        (726, "0726", "Miezunder", "Torracat"),
        (727, "0727", "Fuegro", "Incineroar"),
        (728, "0728", "Robball", "Popplio"),
        (729, "0729", "Marikeck", "Brionne"),
        (730, "0730", "Primarene", "Primarina"),
        (731, "0731", "Peppeck", "Pikipek"),
        (732, "0732", "Trompeck", "Trumbeak"),
        (733, "0733", "Tukanon", "Toucannon"),
        (734, "0734", "Mangunior", "Yungoos"),
        (735, "0735", "Manguspektor", "Gumshoos"),
        (736, "0736", "Mabula", "Grubbin"),
        (737, "0737", "Akkup", "Charjabug"),
        (738, "0738", "Donarion", "Vikavolt"),
        (739, "0739", "Krabbox", "Crabrawler"),
        (740, "0740", "Krawell", "Crabominable"),
        (741, "0741", "Choreogel", "Oricorio"),
        (742, "0742", "Wommel", "Cutiefly"),
        (743, "0743", "Bandelby", "Ribombee"),
        (744, "0744", "Wuffels", "Rockruff"),
        (745, "0745", "Wolwerock", "Lycanroc"),
        (746, "0746", "Lusardin", "Wishiwashi"),
        (747, "0747", "Garstella", "Mareanie"),
        (748, "0748", "Aggrostella", "Toxapex"),
        (749, "0749", "Pampuli", "Mudbray"),
        (750, "0750", "Pampross", "Mudsdale"),
        (751, "0751", "Araqua", "Dewpider"),
        (752, "0752", "Aranestro", "Araquanid"),
        (753, "0753", "Imantis", "Fomantis"),
        (754, "0754", "Mantidea", "Lurantis"),
        (755, "0755", "Bubungus", "Morelull"),
        (756, "0756", "Lamellux", "Shiinotic"),
        (757, "0757", "Molunk", "Salandit"),
        (758, "0758", "Amfira", "Salazzle"),
        (759, "0759", "Velursi", "Stufful"),
        (760, "0760", "Kosturso", "Bewear"),
        (761, "0761", "Frubberl", "Bounsweet"),
        (762, "0762", "Frubaila", "Steenee"),
        (763, "0763", "Fruyal", "Tsareena"),
        (764, "0764", "Curelei", "Comfey"),
        (765, "0765", "Kommandutan", "Oranguru"),
        (766, "0766", "Quartermak", "Passimian"),
        (767, "0767", "Rei\xDFlaus", "Wimpod"),
        (768, "0768", "Tectass", "Golisopod"),
        (769, "0769", "Sankabuh", "Sandygast"),
        (770, "0770", "Colossand", "Palossand"),
        (771, "0771", "Gufa", "Pyukumuku"),
        (772, "0772", "Typ:Null", "Type: Null"),
        (773, "0773", "Amigento", "Silvally"),
        (774, "0774", "Meteno", "Minior"),
        (775, "0775", "Koalelu", "Komala"),
        (776, "0776", "Tortunator", "Turtonator"),
        (777, "0777", "Togedemaru", "Togedemaru"),
        (778, "0778", "Mimigma", "Mimikyu"),
        (779, "0779", "Knirfish", "Bruxish"),
        (780, "0780", "Sen-Long", "Drampa"),
        (781, "0781", "Moruda", "Dhelmise"),
        (782, "0782", "Miniras", "Jangmo-o"),
        (783, "0783", "Mediras", "Hakamo-o"),
        (784, "0784", "Grandiras", "Kommo-o"),
        (785, "0785", "Kapu-Riki", "Tapu Koko"),
        (786, "0786", "Kapu-Fala", "Tapu Lele"),
        (787, "0787", "Kapu-Toro", "Tapu Bulu"),
        (788, "0788", "Kapu-Kime", "Tapu Fini"),
        (789, "0789", "Cosmog", "Cosmog"),
        (790, "0790", "Cosmovum", "Cosmoem"),
        (791, "0791", "Solgaleo", "Solgaleo"),
        (792, "0792", "Lunala", "Lunala"),
        (793, "0793", "Anego", "Nihilego"),
        (794, "0794", "Masskito", "Buzzwole"),
        (795, "0795", "Schabelle", "Pheromosa"),
        (796, "0796", "Voltriant", "Xurkitree"),
        (797, "0797", "Kaguron", "Celesteela"),
        (798, "0798", "Katagami", "Kartana"),
        (799, "0799", "Schlingking", "Guzzlord"),
        (800, "0800", "Necrozma", "Necrozma"),
        (801, "0801", "Magearna", "Magearna"),
        (802, "0802", "Marshadow", "Marshadow"),
        (803, "0803", "Venicro", "Poipole"),
        (804, "0804", "Agoyon", "Naganadel"),
        (805, "0805", "Muramura", "Stakataka"),
        (806, "0806", "Kopplosio", "Blacephalon"),
        (807, "0807", "Zeraora", "Zeraora"),
        (808, "0808", "Meltan", "Meltan"),
        (809, "0809", "Melmetal", "Melmetal"),
        (810, "0810", "Chimpep", "Grookey"),
        (811, "0811", "Chimstix", "Thwackey"),
        (812, "0812", "Gortrom", "Rillaboom"),
        (813, "0813", "Hopplo", "Scorbunny"),
        (814, "0814", "Kickerlo", "Raboot"),
        (815, "0815", "Liberlo", "Cinderace"),
        (816, "0816", "Memmeon", "Sobble"),
        (817, "0817", "Phlegleon", "Drizzile"),
        (818, "0818", "Intelleon", "Inteleon"),
        (819, "0819", "Raffel", "Skwovet"),
        (820, "0820", "Schlaraffel", "Greedent"),
        (821, "0821", "Meikro", "Rookidee"),
        (822, "0822", "Kranoviz", "Corvisquire"),
        (823, "0823", "Krarmor", "Corviknight"),
        (824, "0824", "Sensect", "Blipbug"),
        (825, "0825", "Keradar", "Dottler"),
        (826, "0826", "Maritellit", "Orbeetle"),
        (827, "0827", "Kleptifux", "Nickit"),
        (828, "0828", "Gaunux", "Thievul"),
        (829, "0829", "Cottini", "Gossifleur"),
        (830, "0830", "Cottomi", "Eldegoss"),
        (831, "0831", "Wolly", "Wooloo"),
        (832, "0832", "Zwollock", "Dubwool"),
        (833, "0833", "Kamehaps", "Chewtle"),
        (834, "0834", "Kamalm", "Drednaw"),
        (835, "0835", "Voldi", "Yamper"),
        (836, "0836", "Bellektro", "Boltund"),
        (837, "0837", "Klonkett", "Rolycoly"),
        (838, "0838", "Wagong", "Carkol"),
        (839, "0839", "Montecarbo", "Coalossal"),
        (840, "0840", "Knapfel", "Applin"),
        (841, "0841", "Drapfel", "Flapple"),
        (842, "0842", "Schlapfel", "Appletun"),
        (843, "0843", "Salanga", "Silicobra"),
        (844, "0844", "Sanaconda", "Sandaconda"),
        (845, "0845", "Urgl", "Cramorant"),
        (846, "0846", "Pikuda", "Arrokuda"),
        (847, "0847", "Barrakiefa", "Barraskewda"),
        (848, "0848", "Toxel", "Toxel"),
        (849, "0849", "Riffex", "Toxtricity"),
        (850, "0850", "Thermopod", "Sizzlipede"),
        (851, "0851", "Infernopod", "Centiskorch"),
        (852, "0852", "Klopptopus", "Clobbopus"),
        (853, "0853", "Kaocto", "Grapploct"),
        (854, "0854", "Fatalitee", "Sinistea"),
        (855, "0855", "Mortipot", "Polteageist"),
        (856, "0856", "Brimova", "Hatenna"),
        (857, "0857", "Brimano", "Hattrem"),
        (858, "0858", "Silembrim", "Hatterene"),
        (859, "0859", "B\xE4hmon", "Impidimp"),
        (860, "0860", "Pelzebub", "Morgrem"),
        (861, "0861", "Olangaar", "Grimmsnarl"),
        (862, "0862", "Barrikadax", "Obstagoon"),
        (863, "0863", "Mauzinger", "Perrserker"),
        (864, "0864", "Gorgasonn", "Cursola"),
        (865, "0865", "Lauchzelot", "Sirfetch'd"),
        (866, "0866", "Pantifrost", "Mr. Rime"),
        (867, "0867", "Oghnatoll", "Runerigus"),
        (868, "0868", "Hokumil", "Milcery"),
        (869, "0869", "Pokusan", "Alcremie"),
        (870, "0870", "Legios", "Falinks"),
        (871, "0871", "Britzigel", "Pincurchin"),
        (872, "0872", "Snomnom", "Snom"),
        (873, "0873", "Mottineva", "Frosmoth"),
        (874, "0874", "Humanolith", "Stonjourner"),
        (875, "0875", "Kubuin", "Eiscue"),
        (876, "0876", "Servol", "Indeedee"),
        (877, "0877", "Morpeko", "Morpeko"),
        (878, "0878", "Kupfanti", "Cufant"),
        (879, "0879", "Patinaraja", "Copperajah"),
        (880, "0880", "Lectragon", "Dracozolt"),
        (881, "0881", "Lecryodon", "Arctozolt"),
        (882, "0882", "Pescragon", "Dracovish"),
        (883, "0883", "Pescryodon", "Arctovish"),
        (884, "0884", "Duraludon", "Duraludon"),
        (885, "0885", "Grolldra", "Dreepy"),
        (886, "0886", "Phandra", "Drakloak"),
        (887, "0887", "Katapuldra", "Dragapult"),
        (888, "0888", "Zacian", "Zacian"),
        (889, "0889", "Zamazenta", "Zamazenta"),
        (890, "0890", "Endynalos", "Eternatus"),
        (891, "0891", "Dakuma", "Kubfu"),
        (892, "0892", "Wulaosu", "Urshifu"),
        (893, "0893", "Zarude", "Zarude"),
        (894, "0894", "Regieleki", "Regieleki"),
        (895, "0895", "Regidrago", "Regidrago"),
        (896, "0896", "Polaross", "Glastrier"),
        (897, "0897", "Phantoross", "Spectrier"),
        (898, "0898", "Coronospa", "Calyrex"),
        (899, "0899", "Damythir", "Wyrdeer"),
        (900, "0900", "Axantor", "Kleavor"),
        (901, "0901", "Ursaluna", "Ursaluna"),
        (902, "0902", "Salmagnis", "Basculegion"),
        (903, "0903", "Snieboss", "Sneasler"),
        (904, "0904", "Myriador", "Overqwil"),
        (905, "0905", "Cupidos", "Enamorus"),
        (906, "0906", "Felori", "Sprigatito"),
        (907, "0907", "Feliospa", "Floragato"),
        (908, "0908", "Maskagato", "Meowscarada"),
        (909, "0909", "Krokel", "Fuecoco"),
        (910, "0910", "Lokroko", "Crocalor"),
        (911, "0911", "Skelokrok", "Skeledirge"),
        (912, "0912", "Kwaks", "Quaxly"),
        (913, "0913", "Fuentente", "Quaxwell"),
        (914, "0914", "Bailonda", "Quaquaval"),
        (915, "0915", "Ferkuli", "Lechonk"),
        (916, "0916", "Fragrunz", "Oinkologne"),
        (917, "0917", "Tarundel", "Tarountula"),
        (918, "0918", "Spinsidias", "Spidops"),
        (919, "0919", "Micrick", "Nymble"),
        (920, "0920", "Lextremo", "Lokix"),
        (921, "0921", "Pamo", "Pawmi"),
        (922, "0922", "Pamamo", "Pawmo"),
        (923, "0923", "Pamomamo", "Pawmot"),
        (924, "0924", "Zwieps", "Tandemaus"),
        (925, "0925", "Famieps", "Maushold"),
        (926, "0926", "Hefel", "Fidough"),
        (927, "0927", "Backel", "Dachsbun"),
        (928, "0928", "Olini", "Smoliv"),
        (929, "0929", "Olivinio", "Dolliv"),
        (930, "0930", "Olithena", "Arboliva"),
        (931, "0931", "Krawalloro", "Squawkabilly"),
        (932, "0932", "Geosali", "Nacli"),
        (933, "0933", "Sedisal", "Naclstack"),
        (934, "0934", "Saltigant", "Garganacl"),
        (935, "0935", "Knarbon", "Charcadet"),
        (936, "0936", "Crimanzo", "Armarouge"),
        (937, "0937", "Azugladis", "Ceruledge"),
        (938, "0938", "Blipp", "Tadbulb"),
        (939, "0939", "Wampitz", "Bellibolt"),
        (940, "0940", "Voltrel", "Wattrel"),
        (941, "0941", "Voltrean", "Kilowattrel"),
        (942, "0942", "Mobtiff", "Maschiff"),
        (943, "0943", "Mastifioso", "Mabosstiff"),
        (944, "0944", "Sproxi", "Shroodle"),
        (945, "0945", "Affiti", "Grafaiai"),
        (946, "0946", "Weherba", "Bramblin"),
        (947, "0947", "Horrerba", "Brambleghast"),
        (948, "0948", "Tentagra", "Toedscool"),
        (949, "0949", "Tenterra", "Toedscruel"),
        (950, "0950", "Klibbe", "Klawf"),
        (951, "0951", "Chilingel", "Capsakid"),
        (952, "0952", "Halupenjo", "Scovillain"),
        (953, "0953", "Relluk", "Rellor"),
        (954, "0954", "Skarabaks", "Rabsca"),
        (955, "0955", "Flattutu", "Flittle"),
        (956, "0956", "Psiopatra", "Espathra"),
        (957, "0957", "Forgita", "Tinkatink"),
        (958, "0958", "Tafforgita", "Tinkatuff"),
        (959, "0959", "Granforgita", "Tinkaton"),
        (960, "0960", "Schligda", "Wiglett"),
        (961, "0961", "Schligdri", "Wugtrio"),
        (962, "0962", "Adebom", "Bombirdier"),
        (963, "0963", "Normifin", "Finizen"),
        (964, "0964", "Delfinator", "Palafin"),
        (965, "0965", "Knattox", "Varoom"),
        (966, "0966", "Knattatox", "Revavroom"),
        (967, "0967", "Mopex", "Cyclizar"),
        (968, "0968", "Schlurm", "Orthworm"),
        (969, "0969", "Lumispross", "Glimmet"),
        (970, "0970", "Lumiflora", "Glimmora"),
        (971, "0971", "Gruff", "Greavard"),
        (972, "0972", "Friedwuff", "Houndstone"),
        (973, "0973", "Flaminkno", "Flamigo"),
        (974, "0974", "Flaniwal", "Cetoddle"),
        (975, "0975", "Kolowal", "Cetitan"),
        (976, "0976", "Agiluza", "Veluza"),
        (977, "0977", "Heerashai", "Dondozo"),
        (978, "0978", "Nigiragi", "Tatsugiri"),
        (979, "0979", "Epitaff", "Annihilape"),
        (980, "0980", "Suelord", "Clodsire"),
        (981, "0981", "Farigiraf", "Farigiraf"),
        (982, "0982", "Dummimisel", "Dudunsparce"),
        (983, "0983", "Gladimperio", "Kingambit"),
        (984, "0984", "Riesenzahn", "Great Tusk"),
        (985, "0985", "Br\xFCllschweif", "Scream Tail"),
        (986, "0986", "Wutpilz", "Brute Bonnet"),
        (987, "0987", "Flatterhaar", "Flutter Mane"),
        (988, "0988", "Kriechfl\xFCgel", "Slither Wing"),
        (989, "0989", "Sandfell", "Sandy Shocks"),
        (990, "0990", "Eisenrad", "Iron Treads"),
        (991, "0991", "Eisenb\xFCndel", "Iron Bundle"),
        (992, "0992", "Eisenhand", "Iron Hands"),
        (993, "0993", "Eisenhals", "Iron Jugulis"),
        (994, "0994", "Eisenfalter", "Iron Moth"),
        (995, "0995", "Eisendorn", "Iron Thorns"),
        (996, "0996", "Frospino", "Frigibax"),
        (997, "0997", "Cryospino", "Arctibax"),
        (998, "0998", "Espinodon", "Baxcalibur"),
        (999, "0999", "Gierspenst", "Gimmighoul"),
        (1000, "1000", "Monetigo", "Gholdengo"),
        (1001, "1001", "Chongjian", "Wo-Chien"),
        (1002, "1002", "Baojian", "Chien-Pao"),
        (1003, "1003", "Dinglu", "Ting-Lu"),
        (1004, "1004", "Yuyu", "Chi-Yu"),
        (1005, "1005", "Donnersichel", "Roaring Moon"),
        (1006, "1006", "Eisenkrieger", "Iron Valiant"),
        (1007, "1007", "Koraidon", "Koraidon"),
        (1008, "1008", "Miraidon", "Miraidon"),
        (1009, "1009", "Windewoge", "Walking Wake"),
        (1010, "1010", "Eisenblatt", "Iron Leaves"),
        (1011, "1011", "Sirapfel", "Dipplin"),
        (1012, "1012", "Mortcha", "Poltchageist"),
        (1013, "1013", "Fatalitcha", "Sinistcha"),
        (1014, "1014", "Boninu", "Okidogi"),
        (1015, "1015", "Benesaru", "Munkidori"),
        (1016, "1016", "Beatori", "Fezandipiti"),
        (1017, "1017", "Ogerpon", "Ogerpon"),
        (1018, "1018", "Briduradon", "Archaludon"),
        (1019, "1019", "Hydrapfel", "Hydrapple"),
        (1020, "1020", "Keilflamme", "Gouging Fire"),
        (1021, "1021", "Furienblitz", "Raging Bolt"),
        (1022, "1022", "Eisenfels", "Iron Boulder"),
        (1023, "1023", "Eisenhaupt", "Iron Crown"),
        (1024, "1024", "Terapagos", "Terapagos"),
        (1025, "1025", "Infamomo", "Pecharunt");
      `),D}async function ur(){return await D.query("SELECT * FROM pokemon")}async function mr(n){return(await D.query("SELECT name FROM pokemon WHERE dex = ?",[n])).values[0].name}async function hr(n){return(await D.query("SELECT engName FROM pokemon WHERE dex = ?",[n])).values[0].engName}async function pr(n){return(await D.query("SELECT cardIds FROM pokemon WHERE dex = ?",[n])).values[0].cardIds}async function gr(n,t){await D.run("UPDATE pokemon SET cardIds = ? WHERE dex = ?",[t,n])}async function yr(n){var t,r,a,i,s;try{let b=typeof n.imageSmall=="string"?n.imageSmall:null,v=typeof n.imageLarge=="string"?n.imageLarge:null;return((s=(await D.run(`INSERT INTO cards (cardId, cardName, rarity, setName, imageLow, imageHigh, subTypes, addedAt, avg30)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[n.id,n.name,n.rarity||"",((t=n.set)==null?void 0:t.name)||"",b,v,Array.isArray(n.subtypes)?n.subtypes.join(", "):"",new Date().toISOString(),(i=(a=(r=n.cardmarket)==null?void 0:r.prices)==null?void 0:a.avg30)!=null?i:null])).changes)==null?void 0:s.lastId)||null}catch(b){return console.error("Fehler in insertCard():",b.message||b,(n==null?void 0:n.id)||"unbekannte Karte"),null}}async function fr(n){var r;return((r=(await D.query("SELECT * FROM cards WHERE id = ?",[n])).values)==null?void 0:r[0])||null}async function br(n){let t=n.map(()=>"?").join(",");return(await D.query(`SELECT * FROM cards WHERE id IN (${t})`,n)).values}async function vr(n,t){try{await D.run("UPDATE cards SET avg30 = ? WHERE cardId = ?",[t,n])}catch(r){console.error(`Fehler beim Speichern von avg30 f\xFCr ${n}:`,r.message)}}async function wr(){return(await D.query("SELECT * FROM trainer")).values}async function Er(n){var t,r,a,i,s;try{let b=typeof n.imageSmall=="string"?n.imageSmall:null,v=typeof n.imageLarge=="string"?n.imageLarge:null;return((s=(await D.run(`INSERT INTO trainer (cardId, cardName, rarity, setName, imageLow, imageHigh, subTypes, addedAt, avg30)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[n.id,n.name,n.rarity||"",((t=n.set)==null?void 0:t.name)||"",b,v,Array.isArray(n.subtypes)?n.subtypes.join(", "):"",new Date().toISOString(),(i=(a=(r=n.cardmarket)==null?void 0:r.prices)==null?void 0:a.avg30)!=null?i:null])).changes)==null?void 0:s.lastId)||null}catch(b){return console.error("Fehler in insertTrainer():",b.message||b,(n==null?void 0:n.id)||"unbekannte Karte"),null}}async function kr(n){var r;return((r=(await D.query("SELECT * FROM trainer WHERE id = ?",[n])).values)==null?void 0:r[0])||null}async function Sr(){return(await D.query("SELECT id FROM trainer")).values.map(t=>t.id)}async function Cr(){return(await D.query("SELECT * FROM energy")).values}async function Lr(n){var t,r,a,i,s;try{let b=typeof n.imageSmall=="string"?n.imageSmall:null,v=typeof n.imageLarge=="string"?n.imageLarge:null;return((s=(await D.run(`INSERT INTO energy (cardId, cardName, rarity, setName, imageLow, imageHigh, subTypes, addedAt, avg30)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[n.id,n.name,n.rarity||"",((t=n.set)==null?void 0:t.name)||"",b,v,Array.isArray(n.subtypes)?n.subtypes.join(", "):"",new Date().toISOString(),(i=(a=(r=n.cardmarket)==null?void 0:r.prices)==null?void 0:a.avg30)!=null?i:null])).changes)==null?void 0:s.lastId)||null}catch(b){return console.error("Fehler in insertEnergie():",b.message||b,(n==null?void 0:n.id)||"unbekannte Karte"),null}}async function Tr(){return(await D.query("SELECT id FROM energy")).values.map(t=>t.id)}async function Pr(n){var r;return((r=(await D.query("SELECT * FROM energy WHERE id = ?",[n])).values)==null?void 0:r[0])||null}var cr,D,Nt=ue(()=>{Ht();cr=new Ke(Kt)});We();var me=Et("Http",{web:()=>Promise.resolve().then(()=>(Ze(),Xe)).then(n=>new n.HttpWeb),electron:()=>Promise.resolve().then(()=>(Ze(),Xe)).then(n=>new n.HttpWeb)});var be=Ft(),H;document.addEventListener("DOMContentLoaded",()=>{(async()=>{let n=document.getElementById("cardLoader");n.innerHTML=`
      <p id="loaderText">Lade Karten\u2026</p>
      <div id="progressBarContainer">
        <div id="progressBar"></div>
      </div>
      <div id="progressText">0%</div>
    `,n.classList.remove("hidden"),n.classList.add("shown");let{initDatabase:t,getDaten:r,getName:a,getEngName:i,getCardIds:s,updateCardIds:b,insertCard:v,getCardById:L,getCardsByIds:T,updatePrice:Y,getTrainers:A,insertTrainer:B,getTrainerCardIds:ee,getTrainerById:Z,getEnergies:ce,insertEnergie:te,getEnergieCardIds:ke,getEnergieById:Se}=await Promise.resolve().then(()=>(Nt(),jt));H=await t();let he=await r(),pe=document.querySelector("#kartentabelle tbody");window.cachedCards={},window.cachedPokemonCardsByName={},window.cachedTrainerCardsByType={},window.cachedEnergyCardsByType={};let ve=0,Ae=he.values.length;for(let o of he.values){let c=document.createElement("tr"),u=parseInt(o.dex),g=`
        <td class="dexnr">${o.dex}</td>
        <td class="pokemon">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${u}.png" alt="${o.name}"><br>
          <a href="https://www.pokewiki.de/${o.name}" target="_blank">${o.name}</a>
        </td>
        <td id="td_${o.dex}">
          <div id="kartenContainer_${o.dex}" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button id="neueKarteBtn_${o.dex}" onclick="openOverlay('${o.dex}')">+ Neue Karte</button>
        </td>
      `;c.innerHTML=g,pe.appendChild(c),await O(o.dex),ve++;let l=Math.min(99,Math.round(ve/Ae*100)),p=document.getElementById("progressBar"),m=document.getElementById("progressText");p&&(p.style.width=l+"%"),m&&(m.textContent=l+"%")}progressBar.style.width="100%",progressText.textContent="100%",setTimeout(()=>{let o=n.offsetHeight+"px";n.style.height=o,n.offsetHeight,n.style.transition="height 0.5s ease, opacity 0.5s ease",n.style.height="0px",n.style.opacity="0",n.style.overflow="hidden"},100),M(),C(),J(),document.querySelectorAll("#tableToggle button").forEach(o=>o.classList.remove("active")),document.getElementById("showTablePokemon").classList.add("active");function M(){let o=document.querySelectorAll("#kartentabelle tbody tr"),c=0;o.forEach(u=>{u.style.display!=="none"&&c++}),document.getElementById("eintragsAnzahl").textContent=`(${c})`}function C(){let o=0;document.querySelectorAll("#kartentabelle tbody tr").forEach(m=>{if(m.style.display==="none")return;let f=m.querySelectorAll("div[id^='kartenContainer_'] img");o+=f.length});let c=document.getElementById("kartenAnzahl");c&&(c.textContent=`(${o})`);let u=0;document.querySelectorAll("#trainertabelle tbody tr").forEach(m=>{if(m.style.display==="none")return;let f=m.querySelectorAll("div[id$='Container'] img");u+=f.length});let g=document.getElementById("kartenAnzahlTrainer");g&&(g.textContent=`(${u})`);let l=0;document.querySelectorAll("#energietabelle tbody tr").forEach(m=>{if(m.style.display==="none")return;let f=m.querySelectorAll("div[id$='Container'] img");l+=f.length});let p=document.getElementById("kartenAnzahlEnergie");p&&(p.textContent=`(${l})`)}async function O(o){let c=document.getElementById(`kartenContainer_${o}`),u=await s(o);if(!u)return;let g=u.split(";").filter(m=>m.trim()),l=await T(g.map(m=>parseInt(m)));l.sort((m,f)=>(f.avg30||0)-(m.avg30||0));let p=document.createDocumentFragment();for(let m of l){window.cachedCards[m.cardId]=m;let f=document.createElement("img");f.alt=m.cardId,f.style.width="50px",f.style.height="69px",f.style.objectFit="cover",f.src="cardBackside.png";let y=new Image;y.onload=()=>f.src=m.imageLow,y.onerror=()=>console.warn("Fehler beim Laden von:",m.imageLow),y.src=m.imageLow,f.addEventListener("click",()=>j(o,g.indexOf(String(m.id)))),p.appendChild(f)}c.appendChild(p)}async function j(o,c){let u=document.querySelector("#overlay");u.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',u.classList.remove("hidden"),u.classList.add("shown");let g=await s(o);if(!g)return;let l=g.split(";").filter(f=>f.trim()!=="");if(l.length===0){P();return}let p=c;async function m(){let f=l[p];try{let y=await L(f),h="Unbekannt";if(y.addedAt){let k=new Date(y.addedAt),K={day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"};h=k.toLocaleString("de-DE",K)}let d=y.avg30,w="\u2013";if(d!=null){let k=d.toFixed(2),K="#DEDEDE",I="\u{1FA99}";d>20?(K="#FF4444",I="\u{1F525}"):d>5&&(K="#FFAA00",I="\u{1F4B0}"),w=`<span style="color:${K};">${I} ${k}\u20AC</span>`}else w='<span style="color:#888;">\u{1F578} Kein Preis gespeichert</span>';u.innerHTML=`
            <div id="overlayContent">
            <button class="closeGallery" id="closeGallery">X</button>
              <h2>Pok\xE9mon</h2>
              <div style="display:flex; align-items:center; justify-content:center;">
                <div style="display:flex; flex-direction:column; align-items:center;">
                  <img id="cardImage" src="cardBackside.png" alt="${f}" style="max-width:300px; max-height:400px; margin:0 20px;">
                  <p style="margin-top:10px;">
                    ID: ${y.cardId} | Variante:
                    <select id="variantSelect">
                      <option value="none" ${y.basic!=1&&y.reverse!=1&&y.holo!=1?"selected":""}>Keine Angabe</option>
                      <option value="basic" ${y.basic==1?"selected":""}>Basic</option>
                      <option value="reverse" ${y.reverse==1?"selected":""}>Reverse</option>
                      <option value="holo" ${y.holo==1?"selected":""}>Holo</option>
                      <option value="firstEdition" ${y.firstEdition==1?"selected":""}>First Edition</option>
                    </select>
                    <br>
                    30d-Wert: <strong>${w}</strong><br>
                    Hinzugef\xFCgt am: <strong>${h}
                  </p>
                </div>
              </div>
              <br>
              <button id="deleteCard">\u274C Karte l\xF6schen</button>
            </div>
          `,document.getElementById("variantSelect").addEventListener("change",async function(){var _;let k=this.value,K=0,I=0,F=0,$=0;k==="basic"?K=1:k==="reverse"?I=1:k==="holo"?F=1:k==="firstEdition"&&($=1);try{await H.run("UPDATE cards SET basic = ?, reverse = ?, holo = ?, firstEdition = ? WHERE id = ?",[K,I,F,$,f]);let V=(_=window.cachedCards)==null?void 0:_[y.cardId];V&&(V.basic=K,V.reverse=I,V.holo=F,V.firstEdition=$),console.log("Variante aktualisiert und Cache angepasst:",k)}catch(V){console.error("Fehler beim Aktualisieren der Variante:",V),console.error("Fehlerdetails:",JSON.stringify(V)),alert("Fehler beim Speichern der Variante.")}});let E=new Image;E.onload=()=>{document.getElementById("cardImage").src=y.imageHigh},E.onerror=()=>console.warn("Fehler beim Laden des Galerie-Bildes:",y.imageHigh),E.src=y.imageHigh,document.getElementById("deleteCard").addEventListener("click",async()=>{if(confirm("Willst du diese Karte wirklich l\xF6schen?")){let k=l[p];await H.run("DELETE FROM cards WHERE id = ?",[k]),l.splice(p,1),await b(o,l.join(";")+";"),P();let K=document.getElementById(`kartenContainer_${o}`);K.innerHTML="",O(o),C(),J(),Ce()}}),document.getElementById("closeGallery").addEventListener("click",()=>{let k=document.getElementById("overlay");k.classList.add("fade-out"),setTimeout(()=>{k.classList.remove("shown","fade-out"),k.classList.add("hidden"),k.innerHTML=""},300)})}catch(y){console.error("Fehler beim Anzeigen der Karte:",y),P()}}m()}window.filterPokemonCardsByNumber=function(){let o=document.getElementById("nummerSuche").value.trim();document.querySelectorAll(".kartenItem").forEach(c=>{let u=c.dataset.number;c.style.display=u&&u.startsWith(o)?"block":"none"})},window.openOverlay=async function(o){if(!navigator.onLine)return alert("F\xFCr diese Funktion wird eine Internetverbindung ben\xF6tigt!"),null;let c=document.querySelector("#overlay");c.innerHTML=`
        <div id="overlayContent">
          <h2>Bitte warten...</h2>
          <p>Karten werden geladen</p>
          <div class="loader"></div>
        </div>
      `,c.classList.remove("hidden"),c.classList.add("shown");try{let u=await a(o),g=await i(o),l=window.cachedPokemonCardsByName[g];if(l||(l=await N(g),l&&(window.cachedPokemonCardsByName[g]=l)),!l||l.length===0){c.innerHTML=`
            <div id='overlayContent'>
              <h2>Keine Karten gefunden.</h2> 
              <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
            </div>
          `,document.getElementById("BackBtn").addEventListener("click",m=>{m.preventDefault(),P()});return}let p=`
          <div id="overlayContent">
            <button class="closeGallery" id="BackBtn">X</button>
            <h2>
              Kartenauswahl f\xFCr<br>
              <strong>${u}</strong>:
            </h2>
            <p>
              Welche Karte m\xF6chtest du hinzuf\xFCgen?<br>
              <input type="text" id="nummerSuche" placeholder="Kartennummer eingeben\u2026" onkeyup="filterPokemonCardsByNumber()">
            </p>
            <div class="kartenGrid">
        `;for(let m of l){let f=m.avg30,y="\u2013";if(f!=null){let d=f.toFixed(2),w="#DEDEDE",E="\u{1FA99}";f>20?(w="#FF4444",E="\u{1F525}"):f>5&&(w="#FFAA00",E="\u{1F4B0}"),y=`<span style="color:${w}; font-size:14px;">${E} ${d}\u20AC</span>`}let h=m.id.split("-")[1];p+=`
            <div class="kartenItem" data-id="${m.id}" data-number="${h}" onclick="karteAusw\xE4hlen('${m.id}', '${o}', '${u}')">
              <div>ID: ${m.id}</div>
              <img src="${m.images.small}" alt="${u}">
              <div>${y}</div>
            </div>
          `}p+=`
            </div>
          </div>
        `,c.innerHTML=p,document.getElementById("BackBtn").addEventListener("click",m=>{m.preventDefault(),P()})}catch(u){console.error(u),c.innerHTML=`
        <div id='overlayContent'>
          <h2>Fehler beim Laden.</h2>
          <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
        </div>`,document.getElementById("BackBtn").addEventListener("click",g=>{g.preventDefault(),P()})}};function z(o){return o.replace(/-(0*)(\d+)/,(c,u,g)=>"-"+parseInt(g,10))}async function N(o){var c,u;try{let g=`https://api.pokemontcg.io/v2/cards?q=name:"${o}"&orderBy=-set.releaseDate`,l=await me.get({url:g,headers:{Accept:"application/json","X-Api-Key":be.API_KEY,Connection:"close"}});if(l.status!==200)return console.error("Fehler beim Abrufen der Karten:",l.status,l),null;let p=l.data.data;for(let m of p){let f=(c=m.cardmarket)==null?void 0:c.prices;m.avg30=(u=f==null?void 0:f.avg30)!=null?u:null}return p}catch(g){return console.error("Fehler beim Abrufen \xFCber HTTP:",g.message),null}}async function W(o){var c,u,g,l,p;try{let m=`https://api.pokemontcg.io/v2/cards?q=id:${o}`,f=await me.get({url:m,headers:{Accept:"application/json","X-Api-Key":be.API_KEY,Connection:"close"}});if(f.status!==200||!((u=(c=f.data)==null?void 0:c.data)!=null&&u.length))return console.error("Fehler beim Abrufen der Karte:",f.status,f),null;let y=(l=(g=f.data.data[0])==null?void 0:g.cardmarket)==null?void 0:l.prices;return(p=y==null?void 0:y.avg30)!=null?p:null}catch(m){return console.error("Fehler beim Preisabruf:",m.message),null}}window.karteAusw\u00E4hlen=async function(o,c,u){var y,h;let g=document.querySelector("#overlay");g.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',g.classList.remove("hidden"),g.classList.add("shown");let l=await me.get({url:`https://api.pokemontcg.io/v2/cards/${o}`,headers:{Accept:"application/json","X-Api-Key":be.API_KEY,Connection:"close"}});if(l.status!==200){console.error("Fehler beim Abrufen der Karte:",l.status,l);return}let p=l.data.data;p.imageSmall=((y=p.images)==null?void 0:y.small)||null,p.imageLarge=((h=p.images)==null?void 0:h.large)||null;let m=await v(p);if(!m){console.error("Keine ID von insertCard erhalten \u2013 Abbruch.");return}p.id=m,window.cachedCards[p.cardId]=p,g.innerHTML=`
        <div id="overlayContent">
          <h2>Karte hinzugef\xFCgt!</h2>
          <p>Du hast <strong>${u}</strong> (${o}) ausgew\xE4hlt.</p>
          <br>
          <p>Welche Variante m\xF6chtest du speichern?</p>
          <button class="overlayMenuBtn" id="btnBasic">Basic</button>
          <button class="overlayMenuBtn" id="btnFirstEdition">First Edition</button>
          <br>
          <button class="overlayMenuBtn" id="btnReverse">Reverse</button>
          <button class="overlayMenuBtn" id="btnHolo">Holo</button>
          <br><br>
          <button class="overlayMenuBtn" id="closeOverlayConfirm">\xDCberspringen</button>
        </div>
      `;async function f(d){g.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',g.classList.remove("hidden"),g.classList.add("shown"),d!=="none"&&await H.run(`UPDATE cards SET ${d} = 1 WHERE id = ?`,[m]);let w=await s(c);w||(w=""),w+=m+";",await b(c,w);let E=document.getElementById(`kartenContainer_${c}`);E.innerHTML="",await O(c),P(),M(),C(),J(),Ce()}document.getElementById("btnBasic").addEventListener("click",()=>f("basic")),document.getElementById("btnFirstEdition").addEventListener("click",()=>f("firstEdition")),document.getElementById("btnReverse").addEventListener("click",()=>f("reverse")),document.getElementById("btnHolo").addEventListener("click",()=>f("holo")),document.getElementById("closeOverlayConfirm").addEventListener("click",()=>f("none"))};async function J(){try{let o=await H.query("SELECT avg30 FROM cards WHERE avg30 IS NOT NULL"),c=await H.query("SELECT avg30 FROM trainer WHERE avg30 IS NOT NULL"),u=await H.query("SELECT avg30 FROM energy WHERE avg30 IS NOT NULL"),g=0;for(let d of o.values)g+=d.avg30;for(let d of c.values)g+=d.avg30;for(let d of u.values)g+=d.avg30;let l="\u{1FA99}";g>1e3?l="\u{1F525}":g>500&&(l="\u{1F4B0}"),document.getElementById("gesamtwert").textContent=`\u03A3: ${g.toFixed(2)}\u20AC ${l} | `;let p=await H.query("SELECT COUNT(*) as count FROM cards"),m=await H.query("SELECT COUNT(*) as count FROM trainer"),f=await H.query("SELECT COUNT(*) as count FROM energy"),y=p.values[0].count+m.values[0].count+f.values[0].count,h=document.getElementById("gesamtanzahl");h&&(h.textContent=`${y} Karten`)}catch(o){console.error("Fehler beim Berechnen des Gesamtwerts:",o)}}async function de(){if(!navigator.onLine)return alert("F\xFCr diese Funktion wird eine Internetverbindung ben\xF6tigt!"),null;let o=await H.query("SELECT cardId FROM cards"),c=await H.query("SELECT cardId FROM trainer"),u=await H.query("SELECT cardId FROM energy"),g=0,l=0,p=o.values.length+c.values.length+u.values.length;alert(`Aktualisierung von ${p} Preisen gestartet.`);for(let f of o.values){let y=f.cardId,h=await W(y);if(h==null){let E=z(y);h=await W(E)}h!=null&&(await Y(y,h),g++),l++;let d=Math.round(l/p*100),w=document.getElementById("preiseAktualisierenProgress");w&&(w.textContent=d+"%")}for(let f of c.values){let y=f.cardId,h=await W(y);if(h==null){let E=z(y);h=await W(E)}h!=null&&(await H.run("UPDATE trainer SET avg30 = ? WHERE cardId = ?",[h,y]),g++),l++;let d=Math.round(l/p*100),w=document.getElementById("preiseAktualisierenProgress");w&&(w.textContent=d+"%")}for(let f of u.values){let y=f.cardId,h=await W(y);if(h==null){let E=z(y);h=await W(E)}h!=null&&(await H.run("UPDATE energy SET avg30 = ? WHERE cardId = ?",[h,y]),g++),l++;let d=Math.round(l/p*100),w=document.getElementById("preiseAktualisierenProgress");w&&(w.textContent=d+"%")}let m=document.getElementById("preiseAktualisierenProgress");m&&(m.textContent=""),alert(`${g} Preise wurden aktualisiert!`),J()}window.aktualisiereAllePreise=de;function Be(){let o=document.getElementById("search").value.trim().toUpperCase();["kartentabelle","trainertabelle","energietabelle"].forEach(u=>{document.querySelectorAll(`#${u} tbody tr`).forEach(l=>{let p=l.querySelector("td.pokemon a"),m=l.querySelectorAll("div[id*='Container'] img");if(o===""){l.style.display="",m.forEach(y=>y.style.display="inline-block");return}let f=!1;if(u==="kartentabelle"&&p)if(p.textContent.toUpperCase().includes(o))f=!0,m.forEach(h=>h.style.display="inline-block");else{let h=!1;m.forEach(d=>{let E=d.alt.toUpperCase().split("-")[1]||"",k=E.includes(o)||E.startsWith(o);d.style.display=k?"inline-block":"none",k&&(h=!0)}),f=h}if(u!=="kartentabelle"){let y=!1;m.forEach(h=>{let w=h.alt.toUpperCase().split("-")[1]||"",E=w.includes(o)||w.startsWith(o);h.style.display=E?"inline-block":"none",E&&(y=!0)}),f=y}l.style.display=f?"":"none"})}),M(),C(),J()}window.searchTable=Be,document.getElementById("search").addEventListener("input",function(){let o=document.getElementById("clearSearch");o.style.display=this.value.trim()?"inline":"none"}),document.getElementById("clearSearch").addEventListener("click",function(){let o=document.getElementById("search");o.value="",this.style.display="none",Be()});let S={reverse:"neutral",holo:"neutral",v:"neutral",vmax:"neutral",ex:"neutral",shiny:"neutral",firstEdition:"neutral"};function Ce(){["kartentabelle","trainertabelle","energietabelle"].forEach(c=>{document.querySelectorAll(`#${c} tbody tr`).forEach(g=>{var f,y,h,d,w,E,k,K,I,F,$,_,V,ye,G,nt,at,it,ot,st,lt,ct;let l=g.querySelector("div[id*='Container']");if(!l)return;let p=l.querySelectorAll("img");if(c==="kartentabelle"){let ie=!1;if(p.length>0){for(let R of p){let fe=R.alt,x=(f=window.cachedCards)==null?void 0:f[fe];if(!x)continue;if(S.reverse==="negative"&&x.reverse==1){ie=!0;break}if(S.holo==="negative"&&x.holo==1){ie=!0;break}if(S.firstEdition==="negative"&&x.firstEdition==1){ie=!0;break}let ne=((y=x.subTypes)==null?void 0:y.toLowerCase().includes("radiant"))||((h=x.rarity)==null?void 0:h.toLowerCase().includes("shiny"));if(S.shiny==="negative"&&ne){ie=!0;break}let Te=((d=x.subTypes)==null?void 0:d.toLowerCase().includes("v"))||((w=x.cardName)==null?void 0:w.toLowerCase().includes(" v"));if(S.v==="negative"&&Te){ie=!0;break}let we=((E=x.subTypes)==null?void 0:E.toLowerCase().includes("vmax"))||((k=x.cardName)==null?void 0:k.toLowerCase().includes(" vmax")),X=((K=x.subTypes)==null?void 0:K.toLowerCase().includes("vstar"))||((I=x.cardName)==null?void 0:I.toLowerCase().includes(" vstar"));if(S.vmax==="negative"&&(we||X)){ie=!0;break}let oe=((F=x.subTypes)==null?void 0:F.toLowerCase().includes("ex"))||(($=x.cardName)==null?void 0:$.toLowerCase().includes(" ex"));if(S.ex==="negative"&&oe){ie=!0;break}}for(let R of p){let fe=R.alt,x=(_=window.cachedCards)==null?void 0:_[fe];if(!x){R.style.display="none";continue}let ne={reverse:S.reverse==="positive",holo:S.holo==="positive",firstEdition:S.firstEdition==="positive",shiny:S.shiny==="positive",v:S.v==="positive",vmax:S.vmax==="positive",ex:S.ex==="positive"},Te=Object.values(ne).some(X=>X),we=!0;if(Te){let X=[];if(ne.reverse&&X.push(x.reverse==1),ne.holo&&X.push(x.holo==1),ne.firstEdition&&X.push(x.firstEdition==1),ne.shiny){let oe=((V=x.subTypes)==null?void 0:V.toLowerCase().includes("radiant"))||((ye=x.rarity)==null?void 0:ye.toLowerCase().includes("shiny"));X.push(oe)}if(ne.v){let oe=((G=x.subTypes)==null?void 0:G.toLowerCase().includes("v"))||((nt=x.cardName)==null?void 0:nt.toLowerCase().includes(" v"));X.push(oe)}if(ne.vmax){let oe=((at=x.subTypes)==null?void 0:at.toLowerCase().includes("vmax"))||((it=x.cardName)==null?void 0:it.toLowerCase().includes(" vmax")),Re=((ot=x.subTypes)==null?void 0:ot.toLowerCase().includes("vstar"))||((st=x.cardName)==null?void 0:st.toLowerCase().includes(" vstar"));X.push(oe||Re)}if(ne.ex){let oe=((lt=x.subTypes)==null?void 0:lt.toLowerCase().includes("ex"))||((ct=x.cardName)==null?void 0:ct.toLowerCase().includes(" ex"));X.push(oe)}we=X.some(Boolean)}R.style.display=we?"inline-block":"none"}let q=Object.values(S).every(R=>R==="neutral"||R==="negative");if(ie)g.style.display="none";else if(p.length===0)g.style.display=q?"":"none";else{let R=[...p].filter(fe=>fe.style.display!=="none");g.style.display=R.length>0?"":"none"}return}let je=Object.values(S).every(q=>q==="neutral"||q==="negative");g.style.display=je?"":"none";return}let m=0;p.forEach(ie=>{var Te,we,X,oe,Re,dt,ut,mt,ht,pt,gt,yt,ft,bt,vt;let je=ie.alt,q=(Te=window.cachedCards)==null?void 0:Te[je];if(!q){ie.style.display="none";return}let R=!0;S.reverse==="negative"&&q.reverse==1&&(R=!1),S.holo==="negative"&&q.holo==1&&(R=!1),S.firstEdition==="negative"&&q.firstEdition==1&&(R=!1),S.v==="negative"&&((we=q.subTypes)!=null&&we.toLowerCase().includes("v")||(X=q.cardName)!=null&&X.toLowerCase().includes(" v"))&&(R=!1);let fe=((oe=q.subTypes)==null?void 0:oe.toLowerCase().includes("vmax"))||((Re=q.cardName)==null?void 0:Re.toLowerCase().includes(" vmax")),x=((dt=q.subTypes)==null?void 0:dt.toLowerCase().includes("vstar"))||((ut=q.cardName)==null?void 0:ut.toLowerCase().includes(" vstar"));S.vmax==="negative"&&(fe||x)&&(R=!1),S.ex==="negative"&&((mt=q.subTypes)!=null&&mt.toLowerCase().includes("ex")||(ht=q.cardName)!=null&&ht.toLowerCase().includes(" ex"))&&(R=!1);let ne=((pt=q.subTypes)==null?void 0:pt.toLowerCase().includes("radiant"))||((gt=q.rarity)==null?void 0:gt.toLowerCase().includes("shiny"));S.shiny==="negative"&&ne&&(R=!1),S.reverse==="positive"&&q.reverse!=1&&(R=!1),S.holo==="positive"&&q.holo!=1&&(R=!1),S.firstEdition==="positive"&&q.firstEdition!=1&&(R=!1),S.v==="positive"&&!((yt=q.subTypes)!=null&&yt.toLowerCase().includes("v")||(ft=q.cardName)!=null&&ft.toLowerCase().includes(" v"))&&(R=!1),S.vmax==="positive"&&!(fe||x)&&(R=!1),S.ex==="positive"&&!((bt=q.subTypes)!=null&&bt.toLowerCase().includes("ex")||(vt=q.cardName)!=null&&vt.toLowerCase().includes(" ex"))&&(R=!1),S.shiny==="positive"&&!ne&&(R=!1),ie.style.display=R?"inline-block":"none",R&&m++}),g.style.display=m>0?"":"none"})}),M(),C(),J()}function se(o){S[o]==="neutral"?S[o]="positive":S[o]==="positive"?S[o]="negative":S[o]="neutral",Ce(),U()}function U(){let o=["reverse","holo","firstEdition","v","vmax","ex","shiny"];for(let c of o){let u=document.getElementById(`filter-${c}`);u&&(u.classList.remove("active-positive","active-negative"),S[c]==="positive"?u.classList.add("active-positive"):S[c]==="negative"&&u.classList.add("active-negative"))}}document.getElementById("filter-alle").addEventListener("click",o=>{o.preventDefault(),S.reverse="neutral",S.holo="neutral",S.firstEdition="neutral",S.v="neutral",S.vmax="neutral",S.ex="neutral",S.shiny="neutral",Ce(),U()}),document.getElementById("filter-reverse").addEventListener("click",o=>{o.preventDefault(),se("reverse")}),document.getElementById("filter-holo").addEventListener("click",o=>{o.preventDefault(),se("holo")}),document.getElementById("filter-firstEdition").addEventListener("click",o=>{o.preventDefault(),se("firstEdition")}),document.getElementById("filter-v").addEventListener("click",o=>{o.preventDefault(),se("v")}),document.getElementById("filter-vmax").addEventListener("click",o=>{o.preventDefault(),se("vmax")}),document.getElementById("filter-ex").addEventListener("click",o=>{o.preventDefault(),se("ex")}),document.getElementById("filter-shiny").addEventListener("click",o=>{o.preventDefault(),se("shiny")});function P(){let o=document.getElementById("overlay");o.classList.add("fade-out"),setTimeout(()=>{o.classList.remove("shown","fade-out"),o.classList.add("hidden"),o.innerHTML=""},300)}function Q(o){["kartentabelle","trainertabelle","energietabelle"].forEach(u=>{let g=document.getElementById(u);g&&(u===o?g.classList.remove("hidden"):g.classList.add("hidden"))})}window.zeigePokemonTabelle=function(){document.querySelectorAll("#tableToggle button").forEach(o=>o.classList.remove("active")),document.getElementById("showTablePokemon").classList.add("active"),Q("kartentabelle")},window.zeigeTrainerTabelle=async function(){document.querySelectorAll("#tableToggle button").forEach(p=>p.classList.remove("active")),document.getElementById("showTableTrainer").classList.add("active"),Q("trainertabelle");let o=document.querySelector("#trainertabelle tbody");o.innerHTML="";let c=document.createElement("tr");c.innerHTML=`
        <td>Unter-<br>st\xFCtzer</td>
        <td>
          <div id="supporterContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Supporter')">+ Unterst\xFCtzer</button>
        </td>
      `,o.appendChild(c);let u=document.createElement("tr");u.innerHTML=`
        <td>Item</td>
        <td>
          <div id="itemContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Item')">+ Item</button>
        </td>
      `,o.appendChild(u);let g=document.createElement("tr");g.innerHTML=`
        <td>Stadion</td>
        <td>
          <div id="stadiumContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Stadium')">+ Stadion</button>
        </td>
      `,o.appendChild(g);let l=document.createElement("tr");l.innerHTML=`
        <td>Ausr\xFCs-<br>tung</td>
        <td>
          <div id="toolContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Tool')">+ Ausr\xFCstung</button>
        </td>
      `,o.appendChild(l),await ae(),C()};async function ae(){let o=document.getElementById("supporterContainer"),c=document.getElementById("itemContainer"),u=document.getElementById("stadiumContainer"),g=document.getElementById("toolContainer"),l=await A();if(!l||!Array.isArray(l)){console.error("getTrainers() lieferte keine g\xFCltige Liste:",l);return}l.sort((h,d)=>(d.avg30||0)-(h.avg30||0));let p=document.createDocumentFragment(),m=document.createDocumentFragment(),f=document.createDocumentFragment(),y=document.createDocumentFragment();for(let h of l){window.cachedCards[h.cardId]=h;let d=document.createElement("img");d.alt=h.cardId,d.style.width="50px",d.style.height="69px",d.style.objectFit="cover",d.src="cardBackside.png";let w=new Image;w.onload=()=>d.src=h.imageLow,w.onerror=()=>console.warn("Fehler beim Laden von:",h.imageLow),w.src=h.imageLow;let E="";if(Array.isArray(h.subTypes))h.subTypes.some(k=>k.toLowerCase().includes("supporter"))?E="supporter":h.subTypes.some(k=>k.toLowerCase().includes("item"))?E="item":h.subTypes.some(k=>k.toLowerCase().includes("stadium"))?E="stadium":h.subTypes.some(k=>k.toLowerCase().includes("tool"))&&(E="tool");else if(typeof h.subTypes=="string"){let k=h.subTypes.toLowerCase();k.includes("supporter")?E="supporter":k.includes("item")?E="item":k.includes("stadium")?E="stadium":k.includes("tool")&&(E="tool")}d.addEventListener("click",()=>re(h.id,E)),E=="supporter"&&p.appendChild(d),E=="item"&&m.appendChild(d),E=="stadium"&&f.appendChild(d),E=="tool"&&y.appendChild(d)}o.appendChild(p),c.appendChild(m),u.appendChild(f),g.appendChild(y)}window.openTrainerOverlay=async function(o){if(!navigator.onLine)return alert("F\xFCr diese Funktion wird eine Internetverbindung ben\xF6tigt!"),null;let c=document.querySelector("#overlay");c.innerHTML=`
        <div id="overlayContent">
          <h2>Bitte warten...</h2>
          <p>Karten werden geladen</p>
          <div class="loader"></div>
        </div>
      `,c.classList.remove("hidden"),c.classList.add("shown");try{let u=window.cachedTrainerCardsByType[o];if(u||(u=await le(o),u&&(window.cachedTrainerCardsByType[o]=u)),!u||u.length===0){c.innerHTML=`
            <div id='overlayContent'>
              <h2>Keine Karten gefunden.</h2> 
              <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
            </div>
          `,document.getElementById("BackBtn").addEventListener("click",()=>{e.preventDefault(),P()});return}let g=`
          <div id="overlayContent">
            <button class="closeGallery" id="BackBtn">X</button>
            <h2>Kartenauswahl f\xFCr<br><strong>${o}</strong>:</h2>
            <p>
              Welche Karte m\xF6chtest du hinzuf\xFCgen?<br>
              <input type="text" id="nummerSuche" placeholder="Kartennummer eingeben\u2026" onkeyup="filterTrainerCardsByNumber()">
            </p>
            <div class="kartenGrid">
        `;for(let l of u){let p=l.avg30,m="\u2013";if(p!=null){let y=p.toFixed(2),h="#DEDEDE",d="\u{1FA99}";p>20?(h="#FF4444",d="\u{1F525}"):p>5&&(h="#FFAA00",d="\u{1F4B0}"),m=`<span style="color:${h}; font-size:14px;">${d} ${y}\u20AC</span>`}let f=l.id.split("-")[1];g+=`
            <div class="kartenItem" data-id="${l.id}" data-number="${f}" onclick="trainerKarteAusw\xE4hlen('${l.id}')">
              <div>ID: ${l.id}</div>
              <img src="${l.images.small}" alt="${l.name}">
              <div>${m}</div>
            </div>
          `}g+=`
            </div>
          </div>
        `,c.innerHTML=g,document.getElementById("BackBtn").addEventListener("click",()=>{P()})}catch(u){console.error(u),c.innerHTML=`
          <div id='overlayContent'>
            <h2>Fehler beim Laden.</h2>
            <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
          </div>`,document.getElementById("BackBtn").addEventListener("click",()=>{P()})}};async function le(o){var p,m,f,y;let c=[],u=1,g=250,l=!0;for(;l;){let h=`https://api.pokemontcg.io/v2/cards?q=supertype:Trainer subtypes:${o}&orderBy=name&page=${u}&pageSize=${g}`,d=await me.get({url:h,headers:{Accept:"application/json","X-Api-Key":be.API_KEY,Connection:"close"}});if(d.status!==200||!((m=(p=d.data)==null?void 0:p.data)!=null&&m.length)){l=!1;break}let w=d.data.data;for(let E of w){let k=(f=E.cardmarket)==null?void 0:f.prices;E.avg30=(y=k==null?void 0:k.avg30)!=null?y:null}c=c.concat(w),w.length<g?l=!1:u++}return c}window.trainerKarteAusw\u00E4hlen=async function(o){var u,g;let c=document.querySelector("#overlay");c.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',c.classList.remove("hidden"),c.classList.add("shown");try{let l=await me.get({url:`https://api.pokemontcg.io/v2/cards/${o}`,headers:{Accept:"application/json","X-Api-Key":be.API_KEY,Connection:"close"}});if(l.status!==200){console.error("Fehler beim Abrufen der Karte:",l.status,l);return}let p=l.data.data;p.imageSmall=((u=p.images)==null?void 0:u.small)||null,p.imageLarge=((g=p.images)==null?void 0:g.large)||null;let m=await B(p);if(!m){console.error("Keine ID von insertCard erhalten \u2013 Abbruch.");return}p.id=m,window.cachedCards[p.cardId]=p,c.innerHTML=`
          <div id="overlayContent">
            <h2>Karte hinzugef\xFCgt!</h2>
            <p>Du hast <strong>${o}</strong> ausgew\xE4hlt.</p>
            <br>
            <p>Welche Variante m\xF6chtest du speichern?</p>
            <button class="overlayMenuBtn" id="btnBasic">Basic</button>
            <button class="overlayMenuBtn" id="btnFirstEdition">First Edition</button>
            <br>
            <button class="overlayMenuBtn" id="btnReverse">Reverse</button>
            <button class="overlayMenuBtn" id="btnHolo">Holo</button>
            <br><br>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">\xDCberspringen</button>
          </div>
        `;async function f(y,h){c.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',c.classList.remove("hidden"),c.classList.add("shown");try{y!=="none"&&await H.run(`UPDATE trainer SET ${y} = 1 WHERE id = ?`,[h]);let d=document.getElementById("supporterContainer");d.innerHTML="";let w=document.getElementById("itemContainer");w.innerHTML="";let E=document.getElementById("stadiumContainer");E.innerHTML="";let k=document.getElementById("toolContainer");k.innerHTML="",await ae()}catch(d){console.error("Fehler in finalizeTrainerSelection:",d.message,d)}P(),await J()}document.getElementById("btnBasic").addEventListener("click",()=>f("basic",m)),document.getElementById("btnFirstEdition").addEventListener("click",()=>f("firstEdition",m)),document.getElementById("btnReverse").addEventListener("click",()=>f("reverse",m)),document.getElementById("btnHolo").addEventListener("click",()=>f("holo",m)),document.getElementById("closeOverlayConfirm").addEventListener("click",()=>f("none",m))}catch(l){console.error("Fehler bei trainerKarteAusw\xE4hlen:",l),c.innerHTML=`
          <div id="overlayContent">
            <h2>Fehler beim Hinzuf\xFCgen.</h2>
            <p>${l.message}</p>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">Schlie\xDFen</button>
          </div>
        `,document.getElementById("closeOverlayConfirm").addEventListener("click",()=>{P()})}};async function re(o,c){var y;let u=document.querySelector("#overlay");u.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',u.classList.remove("hidden"),u.classList.add("shown");let g=await ee();if(!g||!g.length)return;let l=[],p={};for(let h of g){let d=await Z(h);if(!d)continue;let w=((y=d.subTypes)==null?void 0:y.toLowerCase())||"";(c==="supporter"&&w.includes("supporter")||c==="item"&&w.includes("item")||c==="stadium"&&w.includes("stadium")||c==="tool"&&w.includes("tool"))&&(l.push(h),p[h]=d)}if(!l.length){P();return}let m=l.findIndex(h=>h===o);m===-1&&(m=0);async function f(){let h=l[m],d=p[h]||await Z(h);if(!d)return;let w="Unbekannt";d.addedAt&&(w=new Date(d.addedAt).toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}));let E=d.avg30,k="\u2013";if(E!=null){let I=E.toFixed(2),F="#DEDEDE",$="\u{1FA99}";E>20?(F="#FF4444",$="\u{1F525}"):E>5&&(F="#FFAA00",$="\u{1F4B0}"),k=`<span style="color:${F};">${$} ${I}\u20AC</span>`}else k='<span style="color:#888;">\u{1F578} Kein Preis gespeichert</span>';u.innerHTML=`
          <div id="overlayContent">
            <button class="closeGallery" id="closeGallery">X</button>
            <h2>Trainer</h2>
            <div style="display:flex; align-items:center; justify-content:center;">
              <div style="display:flex; flex-direction:column; align-items:center;">
                <img id="cardImage" src="cardBackside.png" alt="${h}" style="max-width:300px; max-height:400px; margin:0 20px;">
                <p style="margin-top:10px;">
                  ID: ${d.cardId} | Variante:
                  <select id="variantSelect">
                    <option value="none" ${d.basic!=1&&d.reverse!=1&&d.holo!=1?"selected":""}>Keine Angabe</option>
                    <option value="basic" ${d.basic==1?"selected":""}>Basic</option>
                    <option value="reverse" ${d.reverse==1?"selected":""}>Reverse</option>
                    <option value="holo" ${d.holo==1?"selected":""}>Holo</option>
                    <option value="firstEdition" ${d.firstEdition==1?"selected":""}>First Edition</option>
                  </select>
                  <br>
                  30d-Wert: <strong>${k}</strong><br>
                  Hinzugef\xFCgt am: <strong>${w}</strong>
                </p>
              </div>
            </div>
            <br>
            <button id="deleteTrainer">\u274C Karte l\xF6schen</button>
          </div>
        `,document.getElementById("variantSelect").addEventListener("change",async function(){var ye;let I=this.value,F=0,$=0,_=0,V=0;I==="basic"?F=1:I==="reverse"?$=1:I==="holo"?_=1:I==="firstEdition"&&(V=1);try{await H.run("UPDATE cards SET basic = ?, reverse = ?, holo = ?, firstEdition = ? WHERE id = ?",[F,$,_,V,h]);let G=(ye=window.cachedCards)==null?void 0:ye[d.cardId];G&&(G.basic=F,G.reverse=$,G.holo=_,G.firstEdition=V),console.log("Variante aktualisiert und Cache angepasst:",I)}catch(G){console.error("Fehler beim Aktualisieren der Variante:",G),console.error("Fehlerdetails:",JSON.stringify(G)),alert("Fehler beim Speichern der Variante.")}});let K=new Image;K.onload=()=>{document.getElementById("cardImage").src=d.imageHigh},K.onerror=()=>console.warn("Fehler beim Laden des Galerie-Bildes:",d.imageHigh),K.src=d.imageHigh,document.getElementById("deleteTrainer").addEventListener("click",async()=>{if(confirm("Willst du diese Karte wirklich l\xF6schen?")){await H.run("DELETE FROM trainer WHERE id = ?",[h]),P();let I=document.getElementById("supporterContainer"),F=document.getElementById("itemContainer"),$=document.getElementById("stadiumContainer"),_=document.getElementById("toolContainer");I&&(I.innerHTML=""),F&&(F.innerHTML=""),$&&($.innerHTML=""),_&&(_.innerHTML=""),await ae(),await J()}}),document.getElementById("closeGallery").addEventListener("click",()=>{P()})}f()}window.filterTrainerCardsByNumber=function(){let o=document.getElementById("nummerSuche").value.trim();document.querySelectorAll(".kartenItem").forEach(c=>{let u=c.dataset.number;c.style.display=u&&u.startsWith(o)?"block":"none"})},window.zeigeEnergieTabelle=async function(){document.querySelectorAll("#tableToggle button").forEach(g=>g.classList.remove("active")),document.getElementById("showTableEnergie").classList.add("active"),Q("energietabelle");let o=document.querySelector("#energietabelle tbody");o.innerHTML="";let c=document.createElement("tr");c.innerHTML=`
        <td>Basis-Energie</td>
        <td>
          <div id="basisEnergieContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openEnergieOverlay('Basic')">+ Basis</button>
        </td>
      `,o.appendChild(c);let u=document.createElement("tr");u.innerHTML=`
        <td>Spezial-Energie</td>
        <td>
          <div id="spezialEnergieContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openEnergieOverlay('Special')">+ Spezial</button>
        </td>
      `,o.appendChild(u),await ge(),C()};async function ge(){var p,m,f;let o=document.getElementById("basisEnergieContainer"),c=document.getElementById("spezialEnergieContainer"),u=await ce();if(!u||!Array.isArray(u)){console.error("getEnergies() lieferte keine g\xFCltige Liste:",u);return}u.sort((y,h)=>(h.avg30||0)-(y.avg30||0));let g=document.createDocumentFragment(),l=document.createDocumentFragment();for(let y of u){window.cachedCards[y.cardId]=y;let h=document.createElement("img");h.alt=y.cardId,h.style.width="50px",h.style.height="69px",h.style.objectFit="cover";let d=((p=y.subTypes)==null?void 0:p.toLowerCase())||"";h.addEventListener("click",()=>Wt(y.id,d.includes("basic")?"basic":"special")),h.src="cardBackside.png";let w=new Image;w.onload=()=>h.src=y.imageLow,w.onerror=()=>console.warn("Fehler beim Laden von:",y.imageLow),w.src=y.imageLow,(m=y.subTypes)!=null&&m.toLowerCase().includes("basic")?g.appendChild(h):(f=y.subTypes)!=null&&f.toLowerCase().includes("special")&&l.appendChild(h)}o.appendChild(g),c.appendChild(l)}window.openEnergieOverlay=async function(o){if(!navigator.onLine)return alert("F\xFCr diese Funktion wird eine Internetverbindung ben\xF6tigt!"),null;let c=document.querySelector("#overlay");c.innerHTML=`
        <div id="overlayContent">
          <h2>Bitte warten...</h2>
          <p>Karten werden geladen</p>
          <div class="loader"></div>
        </div>
      `,c.classList.remove("hidden"),c.classList.add("shown");try{let u=window.cachedEnergyCardsByType[o];if(u||(u=await Le(o),u&&(window.cachedEnergyCardsByType[o]=u)),!u||u.length===0){c.innerHTML=`
            <div id='overlayContent'>
              <h2>Keine Karten gefunden.</h2> 
              <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
            </div>
          `,document.getElementById("BackBtn").addEventListener("click",()=>{P()});return}let g=`
          <div id="overlayContent">
            <button class="closeGallery" id="BackBtn">X</button>
            <h2>Kartenauswahl f\xFCr<br><strong>${o}</strong>:</h2>
            <p>
              Welche Karte m\xF6chtest du hinzuf\xFCgen?<br>
              <input type="text" id="nummerSuche" placeholder="Kartennummer eingeben\u2026" onkeyup="filterEnergieCardsByNumber()">
            </p>
            <div class="kartenGrid">
        `;for(let l of u){let p=l.avg30,m="\u2013";if(p!=null){let y=p.toFixed(2),h="#DEDEDE",d="\u{1FA99}";p>20?(h="#FF4444",d="\u{1F525}"):p>5&&(h="#FFAA00",d="\u{1F4B0}"),m=`<span style="color:${h}; font-size:14px;">${d} ${y}\u20AC</span>`}let f=l.id.split("-")[1];g+=`
            <div class="kartenItem" data-id="${l.id}" data-number="${f}" onclick="energieKarteAusw\xE4hlen('${l.id}')">
              <div>ID: ${l.id}</div>
              <img src="${l.images.small}" alt="${l.name}">
              <div>${m}</div>
            </div>
          `}g+=`
            </div>
          </div>
        `,c.innerHTML=g,document.getElementById("BackBtn").addEventListener("click",()=>{P()})}catch(u){console.error(u),c.innerHTML=`
          <div id='overlayContent'>
            <h2>Fehler beim Laden.</h2>
            <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
          </div>`,document.getElementById("BackBtn").addEventListener("click",()=>{P()})}};async function Le(o){var p,m,f,y;let c=[],u=1,g=250,l=!0;for(;l;){let h=`https://api.pokemontcg.io/v2/cards?q=supertype:Energy subtypes:${o}&orderBy=name&page=${u}&pageSize=${g}`,d=await me.get({url:h,headers:{Accept:"application/json","X-Api-Key":be.API_KEY,Connection:"close"}});if(d.status!==200||!((m=(p=d.data)==null?void 0:p.data)!=null&&m.length)){l=!1;break}let w=d.data.data;for(let E of w){let k=(f=E.cardmarket)==null?void 0:f.prices;E.avg30=(y=k==null?void 0:k.avg30)!=null?y:null}c=c.concat(w),w.length<g?l=!1:u++}return c}window.energieKarteAusw\u00E4hlen=async function(o){var u,g;let c=document.querySelector("#overlay");c.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',c.classList.remove("hidden"),c.classList.add("shown");try{let l=await me.get({url:`https://api.pokemontcg.io/v2/cards/${o}`,headers:{Accept:"application/json","X-Api-Key":be.API_KEY,Connection:"close"}});if(l.status!==200){console.error("Fehler beim Abrufen der Karte:",l.status,l);return}let p=l.data.data;p.imageSmall=((u=p.images)==null?void 0:u.small)||null,p.imageLarge=((g=p.images)==null?void 0:g.large)||null;let m=await te(p);if(!m){console.error("Keine ID von insertCard erhalten \u2013 Abbruch.");return}p.id=m,window.cachedCards[p.cardId]=p,c.innerHTML=`
          <div id="overlayContent">
            <h2>Karte hinzugef\xFCgt!</h2>
            <p>Du hast <strong>${o}</strong> ausgew\xE4hlt.</p>
            <br>
            <p>Welche Variante m\xF6chtest du speichern?</p>
            <button class="overlayMenuBtn" id="btnBasic">Basic</button>
            <button class="overlayMenuBtn" id="btnFirstEdition">First Edition</button>
            <br>
            <button class="overlayMenuBtn" id="btnReverse">Reverse</button>
            <button class="overlayMenuBtn" id="btnHolo">Holo</button>
            <br><br>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">\xDCberspringen</button>
          </div>
        `;async function f(y,h){c.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',c.classList.remove("hidden"),c.classList.add("shown");try{y!=="none"&&await H.run(`UPDATE energy SET ${y} = 1 WHERE id = ?`,[h]);let d=document.getElementById("basisEnergieContainer");d.innerHTML="";let w=document.getElementById("spezialEnergieContainer");w.innerHTML="",await ge()}catch(d){console.error("Fehler in finalizeEnergieSelection:",d.message,d)}P(),await J()}document.getElementById("btnBasic").addEventListener("click",()=>f("basic",m)),document.getElementById("btnFirstEdition").addEventListener("click",()=>f("firstEdition",m)),document.getElementById("btnReverse").addEventListener("click",()=>f("reverse",m)),document.getElementById("btnHolo").addEventListener("click",()=>f("holo",m)),document.getElementById("closeOverlayConfirm").addEventListener("click",()=>f("none",m))}catch(l){console.error("Fehler bei energieKarteAusw\xE4hlen:",l),c.innerHTML=`
          <div id="overlayContent">
            <h2>Fehler beim Hinzuf\xFCgen.</h2>
            <p>${l.message}</p>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">Schlie\xDFen</button>
          </div>
        `,document.getElementById("closeOverlayConfirm").addEventListener("click",()=>{P()})}};async function Wt(o,c){var y;let u=document.querySelector("#overlay");u.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',u.classList.remove("hidden"),u.classList.add("shown");let g=await ke();if(!g||!g.length)return;let l=[],p={};for(let h of g){let d=await Se(h);if(!d)continue;let w=((y=d.subTypes)==null?void 0:y.toLowerCase())||"";(c==="basic"&&w.includes("basic")||c==="special"&&w.includes("special"))&&(l.push(h),p[h]=d)}if(!l.length){P();return}let m=l.findIndex(h=>h===o);m===-1&&(m=0);async function f(){let h=l[m],d=p[h]||await Se(h);if(!d)return;let w="Unbekannt";d.addedAt&&(w=new Date(d.addedAt).toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}));let E=d.avg30,k="\u2013";if(E!=null){let I=E.toFixed(2),F="#DEDEDE",$="\u{1FA99}";E>20?(F="#FF4444",$="\u{1F525}"):E>5&&(F="#FFAA00",$="\u{1F4B0}"),k=`<span style="color:${F};">${$} ${I}\u20AC</span>`}else k='<span style="color:#888;">\u{1F578} Kein Preis gespeichert</span>';u.innerHTML=`
          <div id="overlayContent">
            <button class="closeGallery" id="closeGallery">X</button>
            <h2>Energie</h2>
            <div style="display:flex; align-items:center; justify-content:center;">
              <div style="display:flex; flex-direction:column; align-items:center;">
                <img id="cardImage" src="cardBackside.png" alt="${h}" style="max-width:300px; max-height:400px; margin:0 20px;">
                <p style="margin-top:10px;">
                  ID: ${d.cardId} | Variante:
                  <select id="variantSelect">
                    <option value="none" ${d.basic!=1&&d.reverse!=1&&d.holo!=1?"selected":""}>Keine Angabe</option>
                    <option value="basic" ${d.basic==1?"selected":""}>Basic</option>
                    <option value="reverse" ${d.reverse==1?"selected":""}>Reverse</option>
                    <option value="holo" ${d.holo==1?"selected":""}>Holo</option>
                    <option value="firstEdition" ${d.firstEdition==1?"selected":""}>First Edition</option>
                  </select>
                  <br>
                  30d-Wert: <strong>${k}</strong><br>
                  Hinzugef\xFCgt am: <strong>${w}</strong>
                </p>
              </div>
            </div>
            <br>
            <button id="deleteEnergie">\u274C Karte l\xF6schen</button>
          </div>
        `,document.getElementById("variantSelect").addEventListener("change",async function(){var ye;let I=this.value,F=0,$=0,_=0,V=0;I==="basic"?F=1:I==="reverse"?$=1:I==="holo"?_=1:I==="firstEdition"&&(V=1);try{await H.run("UPDATE cards SET basic = ?, reverse = ?, holo = ?, firstEdition = ? WHERE id = ?",[F,$,_,V,h]);let G=(ye=window.cachedCards)==null?void 0:ye[d.cardId];G&&(G.basic=F,G.reverse=$,G.holo=_,G.firstEdition=V),console.log("Variante aktualisiert und Cache angepasst:",I)}catch(G){console.error("Fehler beim Aktualisieren der Variante:",G),console.error("Fehlerdetails:",JSON.stringify(G)),alert("Fehler beim Speichern der Variante.")}});let K=new Image;K.onload=()=>{document.getElementById("cardImage").src=d.imageHigh},K.onerror=()=>console.warn("Fehler beim Laden des Galerie-Bildes:",d.imageHigh),K.src=d.imageHigh,document.getElementById("deleteEnergie").addEventListener("click",async()=>{if(confirm("Willst du diese Karte wirklich l\xF6schen?"))try{await H.run("DELETE FROM energy WHERE id = ?",[h]),P();let I=document.getElementById("basisEnergieContainer"),F=document.getElementById("spezialEnergieContainer");I&&(I.innerHTML=""),F&&(F.innerHTML=""),await ge(),await J()}catch(I){console.error("Fehler beim L\xF6schen der Energie-Karte:",I),alert("Beim L\xF6schen ist ein Fehler aufgetreten.")}}),document.getElementById("closeGallery").addEventListener("click",()=>{P()})}f()}window.filterEnergieCardsByNumber=function(){let o=document.getElementById("nummerSuche").value.trim();document.querySelectorAll(".kartenItem").forEach(c=>{let u=c.dataset.number;c.style.display=u&&u.startsWith(o)?"block":"none"})}})()});})();
/*! Bundled license information:

@capacitor/core/dist/index.js:
  (*! Capacitor: https://capacitorjs.com/ - MIT License *)

@capacitor/core/dist/index.js:
  (*! Capacitor: https://capacitorjs.com/ - MIT License *)
*/
