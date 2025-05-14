(()=>{var Qt=Object.defineProperty;var de=(n,t)=>()=>(n&&(t=n(n=0)),t);var Yt=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports),Ne=(n,t)=>{for(var r in t)Qt(n,r,{get:t[r],enumerable:!0})};var er,tr,Pt,Or,$r,Pe,Ae,rr,nr,ar,qe,It,Kr,De,We=de(()=>{er=n=>{let t=new Map;t.set("web",{name:"web"});let r=n.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:t},a=(s,f)=>{r.platforms.set(s,f)},i=s=>{r.platforms.has(s)&&(r.currentPlatform=r.platforms.get(s))};return r.addPlatform=a,r.setPlatform=i,r},tr=n=>n.CapacitorPlatforms=er(n),Pt=tr(typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{}),Or=Pt.addPlatform,$r=Pt.setPlatform;(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(Pe||(Pe={}));Ae=class extends Error{constructor(t,r){super(t),this.message=t,this.code=r}},rr=n=>{var t,r;return n!=null&&n.androidBridge?"android":!((r=(t=n==null?void 0:n.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||r===void 0)&&r.bridge?"ios":"web"},nr=n=>{var t,r,a,i,s;let f=n.CapacitorCustomPlatform||null,v=n.Capacitor||{},L=v.Plugins=v.Plugins||{},T=n.CapacitorPlatforms,re=()=>f!==null?f.name:rr(n),B=((t=T==null?void 0:T.currentPlatform)===null||t===void 0?void 0:t.getPlatform)||re,A=()=>B()!=="web",ne=((r=T==null?void 0:T.currentPlatform)===null||r===void 0?void 0:r.isNativePlatform)||A,Y=M=>{let C=he.get(M);return!!(C!=null&&C.platforms.has(B())||ke(M))},ce=((a=T==null?void 0:T.currentPlatform)===null||a===void 0?void 0:a.isPluginAvailable)||Y,ae=M=>{var C;return(C=v.PluginHeaders)===null||C===void 0?void 0:C.find(O=>O.name===M)},ke=((i=T==null?void 0:T.currentPlatform)===null||i===void 0?void 0:i.getPluginHeader)||ae,Se=M=>n.console.error(M),me=(M,C,O)=>Promise.reject(`${O} does not have an implementation of "${C}".`),he=new Map,be=(M,C={})=>{let O=he.get(M);if(O)return console.warn(`Capacitor plugin "${M}" already registered. Cannot register plugins twice.`),O.proxy;let W=B(),U=ke(M),G,X=async()=>(!G&&W in C?G=typeof C[W]=="function"?G=await C[W]():G=C[W]:f!==null&&!G&&"web"in C&&(G=typeof C.web=="function"?G=await C.web():G=C.web),G),ue=(j,K)=>{var oe,x;if(U){let le=U==null?void 0:U.methods.find(Q=>K===Q.name);if(le)return le.rtype==="promise"?Q=>v.nativePromise(M,K.toString(),Q):(Q,Ce)=>v.nativeCallback(M,K.toString(),Q,Ce);if(j)return(oe=j[K])===null||oe===void 0?void 0:oe.bind(j)}else{if(j)return(x=j[K])===null||x===void 0?void 0:x.bind(j);throw new Ae(`"${M}" plugin is not implemented on ${W}`,Pe.Unimplemented)}},Z=j=>{let K,oe=(...x)=>{let le=X().then(Q=>{let Ce=ue(Q,j);if(Ce){let pe=Ce(...x);return K=pe==null?void 0:pe.remove,pe}else throw new Ae(`"${M}.${j}()" is not implemented on ${W}`,Pe.Unimplemented)});return j==="addListener"&&(le.remove=async()=>K()),le};return oe.toString=()=>`${j.toString()}() { [capacitor code] }`,Object.defineProperty(oe,"name",{value:j,writable:!1,configurable:!1}),oe},ie=Z("addListener"),Fe=Z("removeListener"),Re=(j,K)=>{let oe=ie({eventName:j},K),x=async()=>{let Q=await oe;Fe({eventName:j,callbackId:Q},K)},le=new Promise(Q=>oe.then(()=>Q({remove:x})));return le.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await x()},le},k=new Proxy({},{get(j,K){switch(K){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return U?Re:ie;case"removeListener":return Fe;default:return Z(K)}}});return L[M]=k,he.set(M,{name:M,proxy:k,platforms:new Set([...Object.keys(C),...U?[W]:[]])}),k},Be=((s=T==null?void 0:T.currentPlatform)===null||s===void 0?void 0:s.registerPlugin)||be;return v.convertFileSrc||(v.convertFileSrc=M=>M),v.getPlatform=B,v.handleError=Se,v.isNativePlatform=ne,v.isPluginAvailable=ce,v.pluginMethodNoop=me,v.registerPlugin=Be,v.Exception=Ae,v.DEBUG=!!v.DEBUG,v.isLoggingEnabled=!!v.isLoggingEnabled,v.platform=v.getPlatform(),v.isNative=v.isNativePlatform(),v},ar=n=>n.Capacitor=nr(n),qe=ar(typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{}),It=qe.registerPlugin,Kr=qe.Plugins,De=class{constructor(t){this.listeners={},this.windowListeners={},t&&(console.warn(`Capacitor WebPlugin "${t.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=t)}addListener(t,r){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(r);let i=this.windowListeners[t];i&&!i.registered&&this.addWindowListener(i);let s=async()=>this.removeListener(t,r),f=Promise.resolve({remove:s});return Object.defineProperty(f,"remove",{value:async()=>{console.warn("Using addListener() without 'await' is deprecated."),await s()}}),f}async removeAllListeners(){this.listeners={};for(let t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,r){let a=this.listeners[t];a&&a.forEach(i=>i(r))}hasListeners(t){return!!this.listeners[t].length}registerWindowListener(t,r){this.windowListeners[r]={registered:!1,windowEventName:t,pluginEventName:r,handler:a=>{this.notifyListeners(r,a)}}}unimplemented(t="not implemented"){return new qe.Exception(t,Pe.Unimplemented)}unavailable(t="not available"){return new qe.Exception(t,Pe.Unavailable)}async removeListener(t,r){let a=this.listeners[t];if(!a)return;let i=a.indexOf(r);this.listeners[t].splice(i,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}}});var xt,Ge,ze,Ue=de(()=>{xt=async n=>new Promise((t,r)=>{let a=new FileReader;a.onload=()=>{let i=a.result,s=i.substr(i.indexOf(",")+1);t(s)},a.onerror=i=>r(i),a.readAsDataURL(n)}),Ge=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),ze=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)});var Bt,Oe,At,Mt,Ve,Ft=de(()=>{Ue();Bt=(n,t,r={})=>{let a=Ge(n),i=Ge(t),s=`; expires=${(r.expires||"").replace("expires=","")}`,f=(r.path||"/").replace("path=","");document.cookie=`${a}=${i||""}${s}; path=${f}`},Oe=()=>{let n=[],t={};if(!document.cookie)return n;let r=document.cookie.split(";")||[];for(let i of r){let[s,f]=i.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=ze(s).trim(),f=ze(f).trim(),t[s]=f}let a=Object.entries(t);for(let[i,s]of a)n.push({key:i,value:s});return n},At=n=>{let t=Oe();for(let r of t)if(r.key===n)return r;return{key:n,value:""}},Mt=n=>{document.cookie=`${n}=; Max-Age=0`},Ve=()=>{let n=document.cookie.split(";")||[];for(let t of n)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}});var or,sr,Je,we,Rt,qt,Dt,Ot,$t,Kt=de(()=>{Ue();or=(n={})=>{let t=Object.keys(n);return Object.keys(n).map(i=>i.toLocaleLowerCase()).reduce((i,s,f)=>(i[s]=n[t[f]],i),{})},sr=(n,t=!0)=>n?Object.entries(n).reduce((a,i)=>{let[s,f]=i,v,L;return Array.isArray(f)?(L="",f.forEach(T=>{v=t?encodeURIComponent(T):T,L+=`${s}=${v}&`}),L.slice(0,-1)):(v=t?encodeURIComponent(f):f,L=`${s}=${v}`),`${a}&${L}`},"").substr(1):null,Je=(n,t={})=>{let r=Object.assign({method:n.method||"GET",headers:n.headers},t),i=or(n.headers)["content-type"]||"";if(typeof n.data=="string")r.body=n.data;else if(i.includes("application/x-www-form-urlencoded")){let s=new URLSearchParams;for(let[f,v]of Object.entries(n.data||{}))s.set(f,v);r.body=s.toString()}else if(i.includes("multipart/form-data")){let s=new FormData;if(n.data instanceof FormData)n.data.forEach((v,L)=>{s.append(L,v)});else for(let v of Object.keys(n.data))s.append(v,n.data[v]);r.body=s;let f=new Headers(r.headers);f.delete("content-type"),r.headers=f}else(i.includes("application/json")||typeof n.data=="object")&&(r.body=JSON.stringify(n.data));return r},we=async n=>{let t=Je(n,n.webFetchExtra),r=sr(n.params,n.shouldEncodeUrlParams),a=r?`${n.url}?${r}`:n.url,i=await fetch(a,t),s=i.headers.get("content-type")||"",{responseType:f="text"}=i.ok?n:{};s.includes("application/json")&&(f="json");let v;switch(f){case"arraybuffer":case"blob":let T=await i.blob();v=await xt(T);break;case"json":v=await i.json();break;case"document":case"text":default:v=await i.text()}let L={};return i.headers.forEach((T,re)=>{L[re]=T}),{data:v,headers:L,status:i.status,url:i.url}},Rt=async n=>we(Object.assign(Object.assign({},n),{method:"GET"})),qt=async n=>we(Object.assign(Object.assign({},n),{method:"POST"})),Dt=async n=>we(Object.assign(Object.assign({},n),{method:"PUT"})),Ot=async n=>we(Object.assign(Object.assign({},n),{method:"PATCH"})),$t=async n=>we(Object.assign(Object.assign({},n),{method:"DELETE"}))});var Xe={};Ne(Xe,{HttpWeb:()=>_e});var _e,Ze=de(()=>{We();Ft();Kt();_e=class extends De{constructor(){super(),this.request=async t=>we(t),this.get=async t=>Rt(t),this.post=async t=>qt(t),this.put=async t=>Dt(t),this.patch=async t=>Ot(t),this.del=async t=>$t(t),this.getCookiesMap=async t=>{let r=Oe(),a={};for(let i of r)a[i.key]=i.value;return a},this.getCookies=async t=>{let{url:r}=t;return{cookies:Oe()}},this.setCookie=async t=>{let{key:r,value:a,expires:i="",path:s=""}=t;Bt(r,a,{expires:i,path:s})},this.getCookie=async t=>At(t.key),this.deleteCookie=async t=>Mt(t.key),this.clearCookies=async t=>Ve(),this.clearAllCookies=async()=>Ve(),this.uploadFile=async t=>{let r=new FormData;r.append(t.name,t.blob||"undefined");let a=Object.assign(Object.assign({},t),{body:r,method:"POST"});return this.post(a)},this.downloadFile=async t=>{let r=Je(t,t.webFetchExtra),a=await fetch(t.url,r),i;if(!(t!=null&&t.progress))i=await a.blob();else if(!(a!=null&&a.body))i=new Blob;else{let s=a.body.getReader(),f=0,v=[],L=a.headers.get("content-type"),T=parseInt(a.headers.get("content-length")||"0",10);for(;;){let{done:A,value:ne}=await s.read();if(A)break;v.push(ne),f+=(ne==null?void 0:ne.length)||0;let Y={type:"DOWNLOAD",url:t.url,bytes:f,contentLength:T};this.notifyListeners("progress",Y)}let re=new Uint8Array(f),B=0;for(let A of v)typeof A!="undefined"&&(re.set(A,B),B+=A.length);i=new Blob([re.buffer],{type:L||void 0})}return{blob:i}}}}});var Ht=Yt((Jr,cr)=>{cr.exports={API_KEY:"a5d75d50-65e6-41a4-aa2f-9b2c93afaaa7"}});var Ie,Me,dr,ur,mr,Qe,$e,xe,jt,Nt,Ye,_r,hr,pr,gr,yr,et,Xr,tt=de(()=>{(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(Ie||(Ie={}));Me=class extends Error{constructor(t,r,a){super(t),this.message=t,this.code=r,this.data=a}},dr=n=>{var t,r;return n!=null&&n.androidBridge?"android":!((r=(t=n==null?void 0:n.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||r===void 0)&&r.bridge?"ios":"web"},ur=n=>{let t=n.CapacitorCustomPlatform||null,r=n.Capacitor||{},a=r.Plugins=r.Plugins||{},i=()=>t!==null?t.name:dr(n),s=()=>i()!=="web",f=B=>{let A=T.get(B);return!!(A!=null&&A.platforms.has(i())||v(B))},v=B=>{var A;return(A=r.PluginHeaders)===null||A===void 0?void 0:A.find(ne=>ne.name===B)},L=B=>n.console.error(B),T=new Map,re=(B,A={})=>{let ne=T.get(B);if(ne)return console.warn(`Capacitor plugin "${B}" already registered. Cannot register plugins twice.`),ne.proxy;let Y=i(),ce=v(B),ae,ke=async()=>(!ae&&Y in A?ae=typeof A[Y]=="function"?ae=await A[Y]():ae=A[Y]:t!==null&&!ae&&"web"in A&&(ae=typeof A.web=="function"?ae=await A.web():ae=A.web),ae),Se=(C,O)=>{var W,U;if(ce){let G=ce==null?void 0:ce.methods.find(X=>O===X.name);if(G)return G.rtype==="promise"?X=>r.nativePromise(B,O.toString(),X):(X,ue)=>r.nativeCallback(B,O.toString(),X,ue);if(C)return(W=C[O])===null||W===void 0?void 0:W.bind(C)}else{if(C)return(U=C[O])===null||U===void 0?void 0:U.bind(C);throw new Me(`"${B}" plugin is not implemented on ${Y}`,Ie.Unimplemented)}},me=C=>{let O,W=(...U)=>{let G=ke().then(X=>{let ue=Se(X,C);if(ue){let Z=ue(...U);return O=Z==null?void 0:Z.remove,Z}else throw new Me(`"${B}.${C}()" is not implemented on ${Y}`,Ie.Unimplemented)});return C==="addListener"&&(G.remove=async()=>O()),G};return W.toString=()=>`${C.toString()}() { [capacitor code] }`,Object.defineProperty(W,"name",{value:C,writable:!1,configurable:!1}),W},he=me("addListener"),be=me("removeListener"),Be=(C,O)=>{let W=he({eventName:C},O),U=async()=>{let X=await W;be({eventName:C,callbackId:X},O)},G=new Promise(X=>W.then(()=>X({remove:U})));return G.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await U()},G},M=new Proxy({},{get(C,O){switch(O){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return ce?Be:he;case"removeListener":return be;default:return me(O)}}});return a[B]=M,T.set(B,{name:B,proxy:M,platforms:new Set([...Object.keys(A),...ce?[Y]:[]])}),M};return r.convertFileSrc||(r.convertFileSrc=B=>B),r.getPlatform=i,r.handleError=L,r.isNativePlatform=s,r.isPluginAvailable=f,r.registerPlugin=re,r.Exception=Me,r.DEBUG=!!r.DEBUG,r.isLoggingEnabled=!!r.isLoggingEnabled,r},mr=n=>n.Capacitor=ur(n),Qe=mr(typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{}),$e=Qe.registerPlugin,xe=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,r){let a=!1;this.listeners[t]||(this.listeners[t]=[],a=!0),this.listeners[t].push(r);let s=this.windowListeners[t];s&&!s.registered&&this.addWindowListener(s),a&&this.sendRetainedArgumentsForEvent(t);let f=async()=>this.removeListener(t,r);return Promise.resolve({remove:f})}async removeAllListeners(){this.listeners={};for(let t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,r,a){let i=this.listeners[t];if(!i){if(a){let s=this.retainedEventArguments[t];s||(s=[]),s.push(r),this.retainedEventArguments[t]=s}return}i.forEach(s=>s(r))}hasListeners(t){return!!this.listeners[t].length}registerWindowListener(t,r){this.windowListeners[r]={registered:!1,windowEventName:t,pluginEventName:r,handler:a=>{this.notifyListeners(r,a)}}}unimplemented(t="not implemented"){return new Qe.Exception(t,Ie.Unimplemented)}unavailable(t="not available"){return new Qe.Exception(t,Ie.Unavailable)}async removeListener(t,r){let a=this.listeners[t];if(!a)return;let i=a.indexOf(r);this.listeners[t].splice(i,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){let r=this.retainedEventArguments[t];r&&(delete this.retainedEventArguments[t],r.forEach(a=>{this.notifyListeners(t,a)}))}},jt=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Nt=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),Ye=class extends xe{async getCookies(){let t=document.cookie,r={};return t.split(";").forEach(a=>{if(a.length<=0)return;let[i,s]=a.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");i=Nt(i).trim(),s=Nt(s).trim(),r[i]=s}),r}async setCookie(t){try{let r=jt(t.key),a=jt(t.value),i=`; expires=${(t.expires||"").replace("expires=","")}`,s=(t.path||"/").replace("path=",""),f=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${r}=${a||""}${i}; path=${s}; ${f};`}catch(r){return Promise.reject(r)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(r){return Promise.reject(r)}}async clearCookies(){try{let t=document.cookie.split(";")||[];for(let r of t)document.cookie=r.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}},_r=$e("CapacitorCookies",{web:()=>new Ye}),hr=async n=>new Promise((t,r)=>{let a=new FileReader;a.onload=()=>{let i=a.result;t(i.indexOf(",")>=0?i.split(",")[1]:i)},a.onerror=i=>r(i),a.readAsDataURL(n)}),pr=(n={})=>{let t=Object.keys(n);return Object.keys(n).map(i=>i.toLocaleLowerCase()).reduce((i,s,f)=>(i[s]=n[t[f]],i),{})},gr=(n,t=!0)=>n?Object.entries(n).reduce((a,i)=>{let[s,f]=i,v,L;return Array.isArray(f)?(L="",f.forEach(T=>{v=t?encodeURIComponent(T):T,L+=`${s}=${v}&`}),L.slice(0,-1)):(v=t?encodeURIComponent(f):f,L=`${s}=${v}`),`${a}&${L}`},"").substr(1):null,yr=(n,t={})=>{let r=Object.assign({method:n.method||"GET",headers:n.headers},t),i=pr(n.headers)["content-type"]||"";if(typeof n.data=="string")r.body=n.data;else if(i.includes("application/x-www-form-urlencoded")){let s=new URLSearchParams;for(let[f,v]of Object.entries(n.data||{}))s.set(f,v);r.body=s.toString()}else if(i.includes("multipart/form-data")||n.data instanceof FormData){let s=new FormData;if(n.data instanceof FormData)n.data.forEach((v,L)=>{s.append(L,v)});else for(let v of Object.keys(n.data))s.append(v,n.data[v]);r.body=s;let f=new Headers(r.headers);f.delete("content-type"),r.headers=f}else(i.includes("application/json")||typeof n.data=="object")&&(r.body=JSON.stringify(n.data));return r},et=class extends xe{async request(t){let r=yr(t,t.webFetchExtra),a=gr(t.params,t.shouldEncodeUrlParams),i=a?`${t.url}?${a}`:t.url,s=await fetch(i,r),f=s.headers.get("content-type")||"",{responseType:v="text"}=s.ok?t:{};f.includes("application/json")&&(v="json");let L,T;switch(v){case"arraybuffer":case"blob":T=await s.blob(),L=await hr(T);break;case"json":L=await s.json();break;case"document":case"text":default:L=await s.text()}let re={};return s.headers.forEach((B,A)=>{re[A]=B}),{data:L,headers:re,status:s.status,url:s.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}},Xr=$e("CapacitorHttp",{web:()=>new et})});var Ke,He,Wt=de(()=>{Ke=class{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(r){return Promise.reject(r)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(r){return Promise.reject(r)}}async getFromLocalDiskToStore(t){let r=t!=null?t:!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:r}),Promise.resolve()}catch(a){return Promise.reject(a)}}async echo(t){try{let r=await this.sqlite.echo({value:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async isSecretStored(){try{let t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(r){return Promise.reject(r)}}async changeEncryptionSecret(t,r){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:r}),Promise.resolve()}catch(a){return Promise.reject(a)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{let r=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async addUpgradeStatement(t,r){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:r}),Promise.resolve()}catch(a){return Promise.reject(a)}}async createConnection(t,r,a,i,s){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:r,mode:a,version:i,readonly:s});let f=new He(t,s,this.sqlite),v=s?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(v,f),Promise.resolve(f)}catch(f){return Promise.reject(f)}}async closeConnection(t,r){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:r});let a=r?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isConnection(t,r){let a={};t.endsWith(".db")&&(t=t.slice(0,-3));let i=r?`RO_${t}`:`RW_${t}`;return a.result=this._connectionDict.has(i),Promise.resolve(a)}async retrieveConnection(t,r){t.endsWith(".db")&&(t=t.slice(0,-3));let a=r?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(a)){let i=this._connectionDict.get(a);return typeof i!="undefined"?Promise.resolve(i):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,r){try{let a=await this.sqlite.getNCDatabasePath({path:t,database:r});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async createNCConnection(t,r){try{await this.sqlite.createNCConnection({databasePath:t,version:r});let a=new He(t,!0,this.sqlite),i=`RO_${t})`;return this._connectionDict.set(i,a),Promise.resolve(a)}catch(a){return Promise.reject(a)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});let r=`RO_${t})`;return this._connectionDict.delete(r),Promise.resolve()}catch(r){return Promise.reject(r)}}async isNCConnection(t){let r={},a=`RO_${t})`;return r.result=this._connectionDict.has(a),Promise.resolve(r)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){let r=`RO_${t})`,a=this._connectionDict.get(r);return typeof a!="undefined"?Promise.resolve(a):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{let r=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){let t=new Map;try{for(let r of this._connectionDict.keys()){let a=r.substring(3),i=r.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:a,readonly:i}),t.set(r,null)}for(let r of t.keys())this._connectionDict.delete(r);return Promise.resolve()}catch(r){return Promise.reject(r)}}async checkConnectionsConsistency(){try{let t=[...this._connectionDict.keys()],r=[],a=[];for(let s of t)r.push(s.substring(0,2)),a.push(s.substring(3));let i=await this.sqlite.checkConnectionsConsistency({dbNames:a,openModes:r});return i.result||(this._connectionDict=new Map),Promise.resolve(i)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{let r=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async isJsonValid(t){try{let r=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async copyFromAssets(t){let r=t!=null?t:!0;try{return await this.sqlite.copyFromAssets({overwrite:r}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromHTTPRequest(t,r){let a=r!=null?r:!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:a}),Promise.resolve()}catch(i){return Promise.reject(i)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{let r=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async isInConfigEncryption(){try{let t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{let t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{let r=await this.sqlite.isDatabase({database:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async getDatabaseList(){try{let r=(await this.sqlite.getDatabaseList()).values;r.sort();let a={values:r};return Promise.resolve(a)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){let r=t||"default";try{let a=await this.sqlite.getMigratableDbList({folderPath:r});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addSQLiteSuffix(t,r){let a=t||"default",i=r||[];try{let s=await this.sqlite.addSQLiteSuffix({folderPath:a,dbNameList:i});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteOldDatabases(t,r){let a=t||"default",i=r||[];try{let s=await this.sqlite.deleteOldDatabases({folderPath:a,dbNameList:i});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async moveDatabasesAndAddSuffix(t,r){let a=t||"default",i=r||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:a,dbNameList:i})}},He=class{constructor(t,r,a){this.dbName=t,this.readonly=r,this.sqlite=a}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{let t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{let t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{let t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{let t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(r){return Promise.reject(r)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(r){return Promise.reject(r)}}async getUrl(){try{let t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{let t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{let t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,r=!0,a=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{let i=await this.sqlite.execute({database:this.dbName,statements:t,transaction:r,readonly:!1,isSQL92:a});return Promise.resolve(i)}}catch(i){return Promise.reject(i)}}async query(t,r,a=!0){let i;try{return r&&r.length>0?i=await this.sqlite.query({database:this.dbName,statement:t,values:r,readonly:this.readonly,isSQL92:!0}):i=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:a}),i=await this.reorderRows(i),Promise.resolve(i)}catch(s){return Promise.reject(s)}}async run(t,r,a=!0,i="no",s=!0){let f;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(r&&r.length>0?f=await this.sqlite.run({database:this.dbName,statement:t,values:r,transaction:a,readonly:!1,returnMode:i,isSQL92:!0}):f=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:a,readonly:!1,returnMode:i,isSQL92:s}),f.changes=await this.reorderRows(f.changes),Promise.resolve(f))}catch(v){return Promise.reject(v)}}async executeSet(t,r=!0,a="no",i=!0){let s;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(s=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:r,readonly:!1,returnMode:a,isSQL92:i}),s.changes=await this.reorderRows(s.changes),Promise.resolve(s))}catch(f){return Promise.reject(f)}}async isExists(){try{let t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{let r=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async isDBOpen(){try{let t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{let t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(r){return Promise.reject(r)}}async getSyncDate(){try{let t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly}),r="";return t.syncDate>0&&(r=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(r)}catch(t){return Promise.reject(t)}}async exportToJson(t,r=!1){try{let a=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:r});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,r=!0){let a=0,i=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),i=await this.sqlite.isTransactionActive({database:this.dbName}),!i)return Promise.reject("After Begin Transaction, no transaction active");try{for(let v of t){if(typeof v!="object"||!("statement"in v))throw new Error("Error a task.statement must be provided");if("values"in v&&v.values&&v.values.length>0){let L=v.statement.toUpperCase().includes("RETURNING")?"all":"no",T=await this.sqlite.run({database:this.dbName,statement:v.statement,values:v.values,transaction:!1,readonly:!1,returnMode:L,isSQL92:r});if(T.changes.changes<0)throw new Error("Error in transaction method run ");a+=T.changes.changes}else{let L=await this.sqlite.execute({database:this.dbName,statements:v.statement,transaction:!1,readonly:!1});if(L.changes.changes<0)throw new Error("Error in transaction method execute ");a+=L.changes.changes}}let s=await this.sqlite.commitTransaction({database:this.dbName});a+=s.changes.changes;let f={changes:{changes:a}};return Promise.resolve(f)}catch(s){let f=s.message?s.message:s;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(f)}}async reorderRows(t){let r=t;if(t!=null&&t.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){let a=t.values[0].ios_columns,i=[];for(let s=1;s<t.values.length;s++){let f=t.values[s],v={};for(let L of a)v[L]=f[L];i.push(v)}r.values=i}return Promise.resolve(r)}}});var Gt={};Ne(Gt,{CapacitorSQLiteWeb:()=>rt});var rt,zt=de(()=>{tt();rt=class extends xe{constructor(){super(...arguments),this.jeepSqliteElement=null,this.isWebStoreOpen=!1}async initWebStore(){await customElements.whenDefined("jeep-sqlite"),this.jeepSqliteElement=document.querySelector("jeep-sqlite"),this.ensureJeepSqliteIsAvailable(),this.jeepSqliteElement.addEventListener("jeepSqliteImportProgress",t=>{this.notifyListeners("sqliteImportProgressEvent",t.detail)}),this.jeepSqliteElement.addEventListener("jeepSqliteExportProgress",t=>{this.notifyListeners("sqliteExportProgressEvent",t.detail)}),this.jeepSqliteElement.addEventListener("jeepSqliteHTTPRequestEnded",t=>{this.notifyListeners("sqliteHTTPRequestEndedEvent",t.detail)}),this.jeepSqliteElement.addEventListener("jeepSqlitePickDatabaseEnded",t=>{this.notifyListeners("sqlitePickDatabaseEndedEvent",t.detail)}),this.jeepSqliteElement.addEventListener("jeepSqliteSaveDatabaseToDisk",t=>{this.notifyListeners("sqliteSaveDatabaseToDiskEvent",t.detail)}),this.isWebStoreOpen||(this.isWebStoreOpen=await this.jeepSqliteElement.isStoreOpen())}async saveToStore(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.saveToStore(t);return}catch(r){throw new Error(`${r}`)}}async getFromLocalDiskToStore(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.getFromLocalDiskToStore(t);return}catch(r){throw new Error(`${r}`)}}async saveToLocalDisk(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.saveToLocalDisk(t);return}catch(r){throw new Error(`${r}`)}}async echo(t){return this.ensureJeepSqliteIsAvailable(),await this.jeepSqliteElement.echo(t)}async createConnection(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.createConnection(t);return}catch(r){throw new Error(`${r}`)}}async open(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.open(t);return}catch(r){throw new Error(`${r}`)}}async closeConnection(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.closeConnection(t);return}catch(r){throw new Error(`${r}`)}}async getVersion(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.getVersion(t)}catch(r){throw new Error(`${r}`)}}async checkConnectionsConsistency(t){this.ensureJeepSqliteIsAvailable();try{return await this.jeepSqliteElement.checkConnectionsConsistency(t)}catch(r){throw new Error(`${r}`)}}async close(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.close(t);return}catch(r){throw new Error(`${r}`)}}async beginTransaction(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.beginTransaction(t)}catch(r){throw new Error(`${r}`)}}async commitTransaction(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.commitTransaction(t)}catch(r){throw new Error(`${r}`)}}async rollbackTransaction(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.rollbackTransaction(t)}catch(r){throw new Error(`${r}`)}}async isTransactionActive(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isTransactionActive(t)}catch(r){throw new Error(`${r}`)}}async getTableList(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.getTableList(t)}catch(r){throw new Error(`${r}`)}}async execute(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.execute(t)}catch(r){throw new Error(`${r}`)}}async executeSet(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.executeSet(t)}catch(r){throw new Error(`${r}`)}}async run(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.run(t)}catch(r){throw new Error(`${r}`)}}async query(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.query(t)}catch(r){throw new Error(`${r}`)}}async isDBExists(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isDBExists(t)}catch(r){throw new Error(`${r}`)}}async isDBOpen(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isDBOpen(t)}catch(r){throw new Error(`${r}`)}}async isDatabase(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isDatabase(t)}catch(r){throw new Error(`${r}`)}}async isTableExists(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isTableExists(t)}catch(r){throw new Error(`${r}`)}}async deleteDatabase(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.deleteDatabase(t);return}catch(r){throw new Error(`${r}`)}}async isJsonValid(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isJsonValid(t)}catch(r){throw new Error(`${r}`)}}async importFromJson(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.importFromJson(t)}catch(r){throw new Error(`${r}`)}}async exportToJson(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.exportToJson(t)}catch(r){throw new Error(`${r}`)}}async createSyncTable(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.createSyncTable(t)}catch(r){throw new Error(`${r}`)}}async setSyncDate(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.setSyncDate(t);return}catch(r){throw new Error(`${r}`)}}async getSyncDate(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.getSyncDate(t)}catch(r){throw new Error(`${r}`)}}async deleteExportedRows(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.deleteExportedRows(t);return}catch(r){throw new Error(`${r}`)}}async addUpgradeStatement(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.addUpgradeStatement(t);return}catch(r){throw new Error(`${r}`)}}async copyFromAssets(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.copyFromAssets(t);return}catch(r){throw new Error(`${r}`)}}async getFromHTTPRequest(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.getFromHTTPRequest(t);return}catch(r){throw new Error(`${r}`)}}async getDatabaseList(){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.getDatabaseList()}catch(t){throw new Error(`${t}`)}}ensureJeepSqliteIsAvailable(){if(this.jeepSqliteElement===null)throw new Error("The jeep-sqlite element is not present in the DOM! Please check the @capacitor-community/sqlite documentation for instructions regarding the web platform.")}ensureWebstoreIsOpen(){if(!this.isWebStoreOpen)throw new Error('WebStore is not open yet. You have to call "initWebStore()" first.')}async getUrl(){throw this.unimplemented("Not implemented on web.")}async getMigratableDbList(t){throw console.log("getMigratableDbList",t),this.unimplemented("Not implemented on web.")}async addSQLiteSuffix(t){throw console.log("addSQLiteSuffix",t),this.unimplemented("Not implemented on web.")}async deleteOldDatabases(t){throw console.log("deleteOldDatabases",t),this.unimplemented("Not implemented on web.")}async moveDatabasesAndAddSuffix(t){throw console.log("moveDatabasesAndAddSuffix",t),this.unimplemented("Not implemented on web.")}async isSecretStored(){throw this.unimplemented("Not implemented on web.")}async setEncryptionSecret(t){throw console.log("setEncryptionSecret",t),this.unimplemented("Not implemented on web.")}async changeEncryptionSecret(t){throw console.log("changeEncryptionSecret",t),this.unimplemented("Not implemented on web.")}async clearEncryptionSecret(){throw console.log("clearEncryptionSecret"),this.unimplemented("Not implemented on web.")}async checkEncryptionSecret(t){throw console.log("checkEncryptionPassPhrase",t),this.unimplemented("Not implemented on web.")}async getNCDatabasePath(t){throw console.log("getNCDatabasePath",t),this.unimplemented("Not implemented on web.")}async createNCConnection(t){throw console.log("createNCConnection",t),this.unimplemented("Not implemented on web.")}async closeNCConnection(t){throw console.log("closeNCConnection",t),this.unimplemented("Not implemented on web.")}async isNCDatabase(t){throw console.log("isNCDatabase",t),this.unimplemented("Not implemented on web.")}async isDatabaseEncrypted(t){throw console.log("isDatabaseEncrypted",t),this.unimplemented("Not implemented on web.")}async isInConfigEncryption(){throw this.unimplemented("Not implemented on web.")}async isInConfigBiometricAuth(){throw this.unimplemented("Not implemented on web.")}async loadExtension(t){throw console.log("loadExtension",t),this.unimplemented("Not implemented on web.")}async enableLoadExtension(t){throw console.log("enableLoadExtension",t),this.unimplemented("Not implemented on web.")}}});var Ut,Vt=de(()=>{tt();Wt();Ut=$e("CapacitorSQLite",{web:()=>Promise.resolve().then(()=>(zt(),Gt)).then(n=>new n.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite})});var Jt={};Ne(Jt,{getCardById:()=>Lr,getCardIds:()=>kr,getCardsByIds:()=>Tr,getDaten:()=>vr,getEnergieById:()=>qr,getEnergieCardIds:()=>Rr,getEnergies:()=>Mr,getEngName:()=>Er,getName:()=>wr,getTrainerById:()=>Br,getTrainerCardIds:()=>Ar,getTrainers:()=>Ir,initDatabase:()=>br,insertCard:()=>Cr,insertEnergie:()=>Fr,insertTrainer:()=>xr,updateCardIds:()=>Sr,updatePrice:()=>Pr});async function br(){return D=await fr.createConnection("pokepicker",!1,"no-encryption",1),await D.open(),await D.execute(`
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
      `),D}async function vr(){return await D.query("SELECT * FROM pokemon")}async function wr(n){return(await D.query("SELECT name FROM pokemon WHERE dex = ?",[n])).values[0].name}async function Er(n){return(await D.query("SELECT engName FROM pokemon WHERE dex = ?",[n])).values[0].engName}async function kr(n){return(await D.query("SELECT cardIds FROM pokemon WHERE dex = ?",[n])).values[0].cardIds}async function Sr(n,t){await D.run("UPDATE pokemon SET cardIds = ? WHERE dex = ?",[t,n])}async function Cr(n){var t,r,a,i,s;try{let f=typeof n.imageSmall=="string"?n.imageSmall:null,v=typeof n.imageLarge=="string"?n.imageLarge:null;return((s=(await D.run(`INSERT INTO cards (cardId, cardName, rarity, setName, imageLow, imageHigh, subTypes, addedAt, avg30)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[n.id,n.name,n.rarity||"",((t=n.set)==null?void 0:t.name)||"",f,v,Array.isArray(n.subtypes)?n.subtypes.join(", "):"",new Date().toISOString(),(i=(a=(r=n.cardmarket)==null?void 0:r.prices)==null?void 0:a.avg30)!=null?i:null])).changes)==null?void 0:s.lastId)||null}catch(f){return console.error("Fehler in insertCard():",f.message||f,(n==null?void 0:n.id)||"unbekannte Karte"),null}}async function Lr(n){var r;return((r=(await D.query("SELECT * FROM cards WHERE id = ?",[n])).values)==null?void 0:r[0])||null}async function Tr(n){let t=n.map(()=>"?").join(",");return(await D.query(`SELECT * FROM cards WHERE id IN (${t})`,n)).values}async function Pr(n,t){try{await D.run("UPDATE cards SET avg30 = ? WHERE cardId = ?",[t,n])}catch(r){console.error(`Fehler beim Speichern von avg30 f\xFCr ${n}:`,r.message)}}async function Ir(){return(await D.query("SELECT * FROM trainer")).values}async function xr(n){var t,r,a,i,s;try{let f=typeof n.imageSmall=="string"?n.imageSmall:null,v=typeof n.imageLarge=="string"?n.imageLarge:null;return((s=(await D.run(`INSERT INTO trainer (cardId, cardName, rarity, setName, imageLow, imageHigh, subTypes, addedAt, avg30)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[n.id,n.name,n.rarity||"",((t=n.set)==null?void 0:t.name)||"",f,v,Array.isArray(n.subtypes)?n.subtypes.join(", "):"",new Date().toISOString(),(i=(a=(r=n.cardmarket)==null?void 0:r.prices)==null?void 0:a.avg30)!=null?i:null])).changes)==null?void 0:s.lastId)||null}catch(f){return console.error("Fehler in insertTrainer():",f.message||f,(n==null?void 0:n.id)||"unbekannte Karte"),null}}async function Br(n){var r;return((r=(await D.query("SELECT * FROM trainer WHERE id = ?",[n])).values)==null?void 0:r[0])||null}async function Ar(){return(await D.query("SELECT id FROM trainer")).values.map(t=>t.id)}async function Mr(){return(await D.query("SELECT * FROM energy")).values}async function Fr(n){var t,r,a,i,s;try{let f=typeof n.imageSmall=="string"?n.imageSmall:null,v=typeof n.imageLarge=="string"?n.imageLarge:null;return((s=(await D.run(`INSERT INTO energy (cardId, cardName, rarity, setName, imageLow, imageHigh, subTypes, addedAt, avg30)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[n.id,n.name,n.rarity||"",((t=n.set)==null?void 0:t.name)||"",f,v,Array.isArray(n.subtypes)?n.subtypes.join(", "):"",new Date().toISOString(),(i=(a=(r=n.cardmarket)==null?void 0:r.prices)==null?void 0:a.avg30)!=null?i:null])).changes)==null?void 0:s.lastId)||null}catch(f){return console.error("Fehler in insertEnergie():",f.message||f,(n==null?void 0:n.id)||"unbekannte Karte"),null}}async function Rr(){return(await D.query("SELECT id FROM energy")).values.map(t=>t.id)}async function qr(n){var r;return((r=(await D.query("SELECT * FROM energy WHERE id = ?",[n])).values)==null?void 0:r[0])||null}var fr,D,_t=de(()=>{Vt();fr=new Ke(Ut)});We();var fe=It("Http",{web:()=>Promise.resolve().then(()=>(Ze(),Xe)).then(n=>new n.HttpWeb),electron:()=>Promise.resolve().then(()=>(Ze(),Xe)).then(n=>new n.HttpWeb)});var Ee=Ht(),N;document.addEventListener("DOMContentLoaded",()=>{(async()=>{let n=document.getElementById("cardLoader");n.innerHTML=`
      <p id="loaderText">Lade Karten\u2026</p>
      <div id="progressBarContainer">
        <div id="progressBar"></div>
      </div>
      <div id="progressText">0%</div>
    `,n.classList.remove("hidden"),n.classList.add("shown");let{initDatabase:t,getDaten:r,getName:a,getEngName:i,getCardIds:s,updateCardIds:f,insertCard:v,getCardById:L,getCardsByIds:T,updatePrice:re,getTrainers:B,insertTrainer:A,getTrainerCardIds:ne,getTrainerById:Y,getEnergies:ce,insertEnergie:ae,getEnergieCardIds:ke,getEnergieById:Se}=await Promise.resolve().then(()=>(_t(),Jt));N=await t();let me=await r(),he=document.querySelector("#kartentabelle tbody");window.cachedCards={},window.cachedPokemonCardsByName={},window.cachedTrainerCardsByType={},window.cachedEnergyCardsByType={};let be=0,Be=me.values.length;for(let o of me.values){let d=document.createElement("tr"),u=parseInt(o.dex),y=`
        <td class="dexnr">${o.dex}</td>
        <td class="pokemon">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${u}.png" alt="${o.name}"><br>
          <a href="https://www.pokewiki.de/${o.name}" target="_blank">${o.name}</a>
        </td>
        <td id="td_${o.dex}">
          <div id="kartenContainer_${o.dex}" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button id="neueKarteBtn_${o.dex}" onclick="openOverlay('${o.dex}')">+ Neue Karte</button>
        </td>
      `;d.innerHTML=y,he.appendChild(d),await O(o.dex),be++;let l=Math.min(99,Math.round(be/Be*100)),p=document.getElementById("progressBar"),h=document.getElementById("progressText");p&&(p.style.width=l+"%"),h&&(h.textContent=l+"%")}progressBar.style.width="100%",progressText.textContent="100%",setTimeout(()=>{let o=n.offsetHeight+"px";n.style.height=o,n.offsetHeight,n.style.transition="height 0.5s ease, opacity 0.5s ease",n.style.height="0px",n.style.opacity="0",n.style.overflow="hidden"},100),M(),C(),ie(),document.querySelectorAll("#tableToggle button").forEach(o=>o.classList.remove("active")),document.getElementById("showTablePokemon").classList.add("active");function M(){let o=document.querySelectorAll("#kartentabelle tbody tr"),d=0;o.forEach(u=>{u.style.display!=="none"&&d++}),document.getElementById("eintragsAnzahl").textContent=`(${d})`}function C(){let o=0;document.querySelectorAll("#kartentabelle tbody tr").forEach(h=>{if(h.style.display==="none")return;h.querySelectorAll("div[id*='Container'] img").forEach(g=>{window.getComputedStyle(g).display!=="none"&&o++})});let d=document.getElementById("kartenAnzahl");d&&(d.textContent=`(${o})`);let u=0;document.querySelectorAll("#trainertabelle tbody tr").forEach(h=>{if(h.style.display==="none")return;h.querySelectorAll("div[id*='Container'] img").forEach(g=>{window.getComputedStyle(g).display!=="none"&&u++})});let y=document.getElementById("kartenAnzahlTrainer");y&&(y.textContent=`(${u})`);let l=0;document.querySelectorAll("#energietabelle tbody tr").forEach(h=>{if(h.style.display==="none")return;h.querySelectorAll("div[id*='Container'] img").forEach(g=>{window.getComputedStyle(g).display!=="none"&&l++})});let p=document.getElementById("kartenAnzahlEnergie");p&&(p.textContent=`(${l})`)}async function O(o){let d=document.getElementById(`kartenContainer_${o}`),u=await s(o);if(!u)return;let y=u.split(";").filter(h=>h.trim()),l=await T(y.map(h=>parseInt(h)));l.sort((h,b)=>(b.avg30||0)-(h.avg30||0));let p=document.createDocumentFragment();for(let h of l){window.cachedCards[h.cardId]=h;let b=document.createElement("img");b.alt=h.cardId,b.style.width="50px",b.style.height="69px",b.style.objectFit="cover",b.src="cardBackside.png";let g=new Image;g.onload=()=>b.src=h.imageLow,g.onerror=()=>console.warn("Fehler beim Laden von:",h.imageLow),g.src=h.imageLow,b.addEventListener("click",()=>W(o,y.indexOf(String(h.id)))),p.appendChild(b)}d.appendChild(p)}async function W(o,d){let u=document.querySelector("#overlay");u.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',u.classList.remove("hidden"),u.classList.add("shown");let y=await s(o);if(!y)return;let l=y.split(";").filter(b=>b.trim()!=="");if(l.length===0){x();return}let p=d;async function h(){let b=l[p];try{let g=await L(b),m="Unbekannt";if(g.addedAt){let S=new Date(g.addedAt),H={day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"};m=S.toLocaleString("de-DE",H)}let c=g.avg30,w="\u2013";if(c!=null){let S=c.toFixed(2),H="#DEDEDE",P="\u{1FA99}";c>20?(H="#FF4444",P="\u{1F525}"):c>5&&(H="#FFAA00",P="\u{1F4B0}"),w=`<span style="color:${H};">${P} ${S}\u20AC</span>`}else w='<span style="color:#888;">\u{1F578} Kein Preis gespeichert</span>';u.innerHTML=`
            <div id="overlayContent">
            <button class="closeGallery" id="closeGallery">X</button>
              <h2>Pok\xE9mon</h2>
              <div style="display:flex; align-items:center; justify-content:center;">
                <div style="display:flex; flex-direction:column; align-items:center;">
                  <img id="cardImage" src="cardBackside.png" alt="${b}" style="max-width:300px; max-height:400px; margin:0 20px;">
                  <p style="margin-top:10px;">
                    ID: ${g.cardId} | Variante:
                    <select id="variantSelect">
                      <option value="none" ${g.basic!=1&&g.reverse!=1&&g.holo!=1?"selected":""}>Keine Angabe</option>
                      <option value="basic" ${g.basic==1?"selected":""}>Basic</option>
                      <option value="reverse" ${g.reverse==1?"selected":""}>Reverse</option>
                      <option value="holo" ${g.holo==1?"selected":""}>Holo</option>
                      <option value="firstEdition" ${g.firstEdition==1?"selected":""}>First Edition</option>
                    </select>
                    <br>
                    30d-Wert: <strong>${w}</strong><br>
                    Hinzugef\xFCgt am: <strong>${m}
                  </p>
                </div>
              </div>
              <br>
              <button id="deleteCard">\u274C Karte l\xF6schen</button>
            </div>
          `,document.getElementById("variantSelect").addEventListener("change",async function(){var J;let S=this.value,H=0,P=0,R=0,$=0;S==="basic"?H=1:S==="reverse"?P=1:S==="holo"?R=1:S==="firstEdition"&&($=1);try{await N.run("UPDATE cards SET basic = ?, reverse = ?, holo = ?, firstEdition = ? WHERE id = ?",[H,P,R,$,b]);let V=(J=window.cachedCards)==null?void 0:J[g.cardId];V&&(V.basic=H,V.reverse=P,V.holo=R,V.firstEdition=$),console.log("Variante aktualisiert und Cache angepasst:",S)}catch(V){console.error("Fehler beim Aktualisieren der Variante:",V),console.error("Fehlerdetails:",JSON.stringify(V)),alert("Fehler beim Speichern der Variante.")}});let E=new Image;E.onload=()=>{document.getElementById("cardImage").src=g.imageHigh},E.onerror=()=>console.warn("Fehler beim Laden des Galerie-Bildes:",g.imageHigh),E.src=g.imageHigh,document.getElementById("deleteCard").addEventListener("click",async()=>{if(confirm("Willst du diese Karte wirklich l\xF6schen?")){let S=l[p];await N.run("DELETE FROM cards WHERE id = ?",[S]),l.splice(p,1),await f(o,l.join(";")+";"),x();let H=document.getElementById(`kartenContainer_${o}`);H.innerHTML="",O(o),C(),ie(),j()}}),document.getElementById("closeGallery").addEventListener("click",()=>{let S=document.getElementById("overlay");S.classList.add("fade-out"),setTimeout(()=>{S.classList.remove("shown","fade-out"),S.classList.add("hidden"),S.innerHTML=""},300)})}catch(g){console.error("Fehler beim Anzeigen der Karte:",g),x()}}h()}window.filterPokemonCardsByNumber=function(){let o=document.getElementById("nummerSuche").value.trim();document.querySelectorAll(".kartenItem").forEach(d=>{let u=d.dataset.number;d.style.display=u&&u.startsWith(o)?"block":"none"})},window.openOverlay=async function(o){if(!navigator.onLine)return alert("F\xFCr diese Funktion wird eine Internetverbindung ben\xF6tigt!"),null;let d=document.querySelector("#overlay");d.innerHTML=`
        <div id="overlayContent">
          <h2>Bitte warten...</h2>
          <p>Karten werden geladen</p>
          <div class="loader"></div>
        </div>
      `,d.classList.remove("hidden"),d.classList.add("shown");try{let u=await a(o),y=await i(o),l=window.cachedPokemonCardsByName[y];if(l||(l=await G(y),l&&(window.cachedPokemonCardsByName[y]=l)),!l||l.length===0){d.innerHTML=`
            <div id='overlayContent'>
              <h2>Keine Karten gefunden.</h2> 
              <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
            </div>
          `,document.getElementById("BackBtn").addEventListener("click",h=>{h.preventDefault(),x()});return}let p=`
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
        `;for(let h of l){let b=h.avg30,g="\u2013";if(b!=null){let c=b.toFixed(2),w="#DEDEDE",E="\u{1FA99}";b>20?(w="#FF4444",E="\u{1F525}"):b>5&&(w="#FFAA00",E="\u{1F4B0}"),g=`<span style="color:${w}; font-size:14px;">${E} ${c}\u20AC</span>`}let m=h.id.split("-")[1];p+=`
            <div class="kartenItem" data-id="${h.id}" data-number="${m}" onclick="karteAusw\xE4hlen('${h.id}', '${o}', '${u}')">
              <div>ID: ${h.id}</div>
              <img src="${h.images.small}" alt="${u}">
              <div>${g}</div>
            </div>
          `}p+=`
            </div>
          </div>
        `,d.innerHTML=p,document.getElementById("BackBtn").addEventListener("click",h=>{h.preventDefault(),x()})}catch(u){console.error(u),d.innerHTML=`
        <div id='overlayContent'>
          <h2>Fehler beim Laden.</h2>
          <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
        </div>`,document.getElementById("BackBtn").addEventListener("click",y=>{y.preventDefault(),x()})}};function U(o){return o.replace(/-(0*)(\d+)/,(d,u,y)=>"-"+parseInt(y,10))}async function G(o){var d,u;try{let y=`https://api.pokemontcg.io/v2/cards?q=name:"${o}"&orderBy=-set.releaseDate`,l=await fe.get({url:y,headers:{Accept:"application/json","X-Api-Key":Ee.API_KEY,Connection:"close"}});if(l.status!==200)return console.error("Fehler beim Abrufen der Karten:",l.status,l),null;let p=l.data.data;for(let h of p){let b=(d=h.cardmarket)==null?void 0:d.prices;h.avg30=(u=b==null?void 0:b.avg30)!=null?u:null}return p}catch(y){return console.error("Fehler beim Abrufen \xFCber HTTP:",y.message),null}}async function X(o){let d=await ue(`supertype:Trainer subtypes:${o}`),y=(await ue("supertype:Trainer")).filter(p=>!p.subtypes||p.subtypes.length===0),l=[...d,...y];return l.sort((p,h)=>{var m,c;let b=((m=p.name)==null?void 0:m.toLowerCase())||"",g=((c=h.name)==null?void 0:c.toLowerCase())||"";return b.localeCompare(g)}),l}async function ue(o){var p,h,b,g;let d=[],u=1,y=250,l=!0;for(;l;){let m=`https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(o)}&page=${u}&pageSize=${y}`,c=await fe.get({url:m,headers:{Accept:"application/json","X-Api-Key":Ee.API_KEY,Connection:"close"}});if(c.status!==200||!((h=(p=c.data)==null?void 0:p.data)!=null&&h.length))break;let w=c.data.data;for(let E of w){let S=(b=E.cardmarket)==null?void 0:b.prices;E.avg30=(g=S==null?void 0:S.avg30)!=null?g:null}d.push(...w),w.length<y?l=!1:u++}return d}async function Z(o){var d,u,y,l,p;try{let h=`https://api.pokemontcg.io/v2/cards?q=id:${o}`,b=await fe.get({url:h,headers:{Accept:"application/json","X-Api-Key":Ee.API_KEY,Connection:"close"}});if(b.status!==200||!((u=(d=b.data)==null?void 0:d.data)!=null&&u.length))return console.error("Fehler beim Abrufen der Karte:",b.status,b),null;let g=(l=(y=b.data.data[0])==null?void 0:y.cardmarket)==null?void 0:l.prices;return(p=g==null?void 0:g.avg30)!=null?p:null}catch(h){return console.error("Fehler beim Preisabruf:",h.message),null}}window.karteAusw\u00E4hlen=async function(o,d,u){var g,m;let y=document.querySelector("#overlay");y.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',y.classList.remove("hidden"),y.classList.add("shown");let l=await fe.get({url:`https://api.pokemontcg.io/v2/cards/${o}`,headers:{Accept:"application/json","X-Api-Key":Ee.API_KEY,Connection:"close"}});if(l.status!==200){console.error("Fehler beim Abrufen der Karte:",l.status,l);return}let p=l.data.data;p.imageSmall=((g=p.images)==null?void 0:g.small)||null,p.imageLarge=((m=p.images)==null?void 0:m.large)||null;let h=await v(p);if(!h){console.error("Keine ID von insertCard erhalten \u2013 Abbruch.");return}p.id=h,window.cachedCards[p.cardId]=p,y.innerHTML=`
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
      `;async function b(c){y.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',y.classList.remove("hidden"),y.classList.add("shown"),c!=="none"&&await N.run(`UPDATE cards SET ${c} = 1 WHERE id = ?`,[h]);let w=await s(d);w||(w=""),w+=h+";",await f(d,w);let E=document.getElementById(`kartenContainer_${d}`);E.innerHTML="",await O(d),x(),M(),C(),ie(),j()}document.getElementById("btnBasic").addEventListener("click",()=>b("basic")),document.getElementById("btnFirstEdition").addEventListener("click",()=>b("firstEdition")),document.getElementById("btnReverse").addEventListener("click",()=>b("reverse")),document.getElementById("btnHolo").addEventListener("click",()=>b("holo")),document.getElementById("closeOverlayConfirm").addEventListener("click",()=>b("none"))};async function ie(){try{let o=await N.query("SELECT avg30 FROM cards WHERE avg30 IS NOT NULL"),d=await N.query("SELECT avg30 FROM trainer WHERE avg30 IS NOT NULL"),u=await N.query("SELECT avg30 FROM energy WHERE avg30 IS NOT NULL"),y=0;for(let c of o.values)y+=c.avg30;for(let c of d.values)y+=c.avg30;for(let c of u.values)y+=c.avg30;let l="\u{1FA99}";y>1e3?l="\u{1F525}":y>500&&(l="\u{1F4B0}"),document.getElementById("gesamtwert").textContent=`\u03A3: ${y.toFixed(2)}\u20AC ${l} | `;let p=await N.query("SELECT COUNT(*) as count FROM cards"),h=await N.query("SELECT COUNT(*) as count FROM trainer"),b=await N.query("SELECT COUNT(*) as count FROM energy"),g=p.values[0].count+h.values[0].count+b.values[0].count,m=document.getElementById("gesamtanzahl");m&&(m.textContent=`${g} Karten`)}catch(o){console.error("Fehler beim Berechnen des Gesamtwerts:",o)}}async function Fe(){if(!navigator.onLine)return alert("F\xFCr diese Funktion wird eine Internetverbindung ben\xF6tigt!"),null;let o=await N.query("SELECT cardId FROM cards"),d=await N.query("SELECT cardId FROM trainer"),u=await N.query("SELECT cardId FROM energy"),y=0,l=0,p=o.values.length+d.values.length+u.values.length;alert(`Aktualisierung von ${p} Preisen gestartet.`);for(let b of o.values){let g=b.cardId,m=await Z(g);if(m==null){let E=U(g);m=await Z(E)}m!=null&&(await re(g,m),y++),l++;let c=Math.round(l/p*100),w=document.getElementById("preiseAktualisierenProgress");w&&(w.textContent=c+"%")}for(let b of d.values){let g=b.cardId,m=await Z(g);if(m==null){let E=U(g);m=await Z(E)}m!=null&&(await N.run("UPDATE trainer SET avg30 = ? WHERE cardId = ?",[m,g]),y++),l++;let c=Math.round(l/p*100),w=document.getElementById("preiseAktualisierenProgress");w&&(w.textContent=c+"%")}for(let b of u.values){let g=b.cardId,m=await Z(g);if(m==null){let E=U(g);m=await Z(E)}m!=null&&(await N.run("UPDATE energy SET avg30 = ? WHERE cardId = ?",[m,g]),y++),l++;let c=Math.round(l/p*100),w=document.getElementById("preiseAktualisierenProgress");w&&(w.textContent=c+"%")}let h=document.getElementById("preiseAktualisierenProgress");h&&(h.textContent=""),alert(`${y} Preise wurden aktualisiert!`),ie()}window.aktualisiereAllePreise=Fe;function Re(){let o=document.getElementById("search").value.trim().toUpperCase();["kartentabelle","trainertabelle","energietabelle"].forEach(u=>{document.querySelectorAll(`#${u} tbody tr`).forEach(l=>{let p=l.querySelector("td.pokemon a"),h=l.querySelectorAll("div[id*='Container'] img");if(o===""){l.style.display="",h.forEach(g=>g.style.display="inline-block");return}let b=!1;if(u==="kartentabelle"&&p)if(p.textContent.toUpperCase().includes(o))b=!0,h.forEach(m=>m.style.display="inline-block");else{let m=!1;h.forEach(c=>{let E=c.alt.toUpperCase().split("-")[1]||"",S=E.includes(o)||E.startsWith(o);c.style.display=S?"inline-block":"none",S&&(m=!0)}),b=m}if(u!=="kartentabelle"){let g=!1;h.forEach(m=>{let w=m.alt.toUpperCase().split("-")[1]||"",E=w.includes(o)||w.startsWith(o);m.style.display=E?"inline-block":"none",E&&(g=!0)}),b=g}l.style.display=b?"":"none"})}),M(),C(),ie()}window.searchTable=Re,document.getElementById("search").addEventListener("input",function(){let o=document.getElementById("clearSearch");o.style.display=this.value.trim()?"inline":"none"}),document.getElementById("clearSearch").addEventListener("click",function(){let o=document.getElementById("search");o.value="",this.style.display="none",Re()});let k={reverse:"neutral",holo:"neutral",v:"neutral",vmax:"neutral",ex:"neutral",shiny:"neutral",firstEdition:"neutral",illustration:"neutral"};function j(){["kartentabelle","trainertabelle","energietabelle"].forEach(d=>{document.querySelectorAll(`#${d} tbody tr`).forEach(y=>{var b,g,m,c,w,E,S,H,P,R,$,J,V,ge,z,nt,at,it,ot,st,lt,ct,dt,ut,mt,ht;let l=y.querySelector("div[id*='Container']");if(!l)return;let p=l.querySelectorAll("img");if(d==="kartentabelle"){let se=!1;if(p.length>0){for(let F of p){let ye=F.alt,I=(b=window.cachedCards)==null?void 0:b[ye];if(!I)continue;if(k.reverse==="negative"&&I.reverse==1){se=!0;break}if(k.holo==="negative"&&I.holo==1){se=!0;break}if(k.firstEdition==="negative"&&I.firstEdition==1){se=!0;break}let ee=((g=I.subTypes)==null?void 0:g.toLowerCase().includes("radiant"))||((m=I.rarity)==null?void 0:m.toLowerCase().includes("shiny"));if(k.shiny==="negative"&&ee){se=!0;break}let Le=((c=I.rarity)==null?void 0:c.toLowerCase().includes("illustration"))||((w=I.rarity)==null?void 0:w.toLowerCase().includes("trainer gallery"));if(k.illustration==="negative"&&Le){se=!0;break}let ve=((E=I.subTypes)==null?void 0:E.toLowerCase().includes("v"))||((S=I.cardName)==null?void 0:S.toLowerCase().includes(" v"));if(k.v==="negative"&&ve){se=!0;break}let _=((H=I.subTypes)==null?void 0:H.toLowerCase().includes("vmax"))||((P=I.cardName)==null?void 0:P.toLowerCase().includes(" vmax")),te=((R=I.subTypes)==null?void 0:R.toLowerCase().includes("vstar"))||(($=I.cardName)==null?void 0:$.toLowerCase().includes(" vstar"));if(k.vmax==="negative"&&(_||te)){se=!0;break}let Te=((J=I.subTypes)==null?void 0:J.toLowerCase().includes("ex"))||((V=I.cardName)==null?void 0:V.toLowerCase().includes(" ex"));if(k.ex==="negative"&&Te){se=!0;break}}for(let F of p){let ye=F.alt,I=(ge=window.cachedCards)==null?void 0:ge[ye];if(!I){F.style.display="none";continue}let ee={reverse:k.reverse==="positive",holo:k.holo==="positive",firstEdition:k.firstEdition==="positive",shiny:k.shiny==="positive",v:k.v==="positive",vmax:k.vmax==="positive",ex:k.ex==="positive",illustration:k.illustration==="positive"},Le=Object.values(ee).some(_=>_),ve=!0;if(Le){let _=[];if(ee.reverse&&_.push(I.reverse==1),ee.holo&&_.push(I.holo==1),ee.firstEdition&&_.push(I.firstEdition==1),ee.shiny){let te=((z=I.subTypes)==null?void 0:z.toLowerCase().includes("radiant"))||((nt=I.rarity)==null?void 0:nt.toLowerCase().includes("shiny"));_.push(te)}if(ee.illustration){let te=((at=I.rarity)==null?void 0:at.toLowerCase().includes("illustration"))||((it=I.rarity)==null?void 0:it.toLowerCase().includes("trainer gallery"));_.push(te)}if(ee.v){let te=((ot=I.subTypes)==null?void 0:ot.toLowerCase().includes("v"))||((st=I.cardName)==null?void 0:st.toLowerCase().includes(" v"));_.push(te)}if(ee.vmax){let te=((lt=I.subTypes)==null?void 0:lt.toLowerCase().includes("vmax"))||((ct=I.cardName)==null?void 0:ct.toLowerCase().includes(" vmax")),Te=((dt=I.subTypes)==null?void 0:dt.toLowerCase().includes("vstar"))||((ut=I.cardName)==null?void 0:ut.toLowerCase().includes(" vstar"));_.push(te||Te)}if(ee.ex){let te=((mt=I.subTypes)==null?void 0:mt.toLowerCase().includes("ex"))||((ht=I.cardName)==null?void 0:ht.toLowerCase().includes(" ex"));_.push(te)}ve=_.some(Boolean)}F.style.display=ve?"inline-block":"none"}let q=Object.values(k).every(F=>F==="neutral"||F==="negative");if(se)y.style.display="none";else if(p.length===0)y.style.display=q?"":"none";else{let F=[...p].filter(ye=>ye.style.display!=="none");y.style.display=F.length>0?"":"none"}return}let je=Object.values(k).every(q=>q==="neutral"||q==="negative");y.style.display=je?"":"none";return}let h=0;p.forEach(se=>{var ve,_,te,Te,pt,gt,yt,ft,bt,vt,wt,Et,kt,St,Ct,Lt,Tt;let je=se.alt,q=(ve=window.cachedCards)==null?void 0:ve[je];if(!q){se.style.display="none";return}let F=!0;k.reverse==="negative"&&q.reverse==1&&(F=!1),k.holo==="negative"&&q.holo==1&&(F=!1),k.firstEdition==="negative"&&q.firstEdition==1&&(F=!1),k.v==="negative"&&((_=q.subTypes)!=null&&_.toLowerCase().includes("v")||(te=q.cardName)!=null&&te.toLowerCase().includes(" v"))&&(F=!1);let ye=((Te=q.subTypes)==null?void 0:Te.toLowerCase().includes("vmax"))||((pt=q.cardName)==null?void 0:pt.toLowerCase().includes(" vmax")),I=((gt=q.subTypes)==null?void 0:gt.toLowerCase().includes("vstar"))||((yt=q.cardName)==null?void 0:yt.toLowerCase().includes(" vstar"));k.vmax==="negative"&&(ye||I)&&(F=!1),k.ex==="negative"&&((ft=q.subTypes)!=null&&ft.toLowerCase().includes("ex")||(bt=q.cardName)!=null&&bt.toLowerCase().includes(" ex"))&&(F=!1);let ee=((vt=q.subTypes)==null?void 0:vt.toLowerCase().includes("radiant"))||((wt=q.rarity)==null?void 0:wt.toLowerCase().includes("shiny"));k.shiny==="negative"&&ee&&(F=!1);let Le=((Et=q.rarity)==null?void 0:Et.toLowerCase().includes("illustration"))||((kt=q.rarity)==null?void 0:kt.toLowerCase().includes("trainer gallery"));k.illustration==="negative"&&Le&&(F=!1),k.reverse==="positive"&&q.reverse!=1&&(F=!1),k.holo==="positive"&&q.holo!=1&&(F=!1),k.firstEdition==="positive"&&q.firstEdition!=1&&(F=!1),k.v==="positive"&&!((St=q.subTypes)!=null&&St.toLowerCase().includes("v")||(Ct=q.cardName)!=null&&Ct.toLowerCase().includes(" v"))&&(F=!1),k.vmax==="positive"&&!(ye||I)&&(F=!1),k.ex==="positive"&&!((Lt=q.subTypes)!=null&&Lt.toLowerCase().includes("ex")||(Tt=q.cardName)!=null&&Tt.toLowerCase().includes(" ex"))&&(F=!1),k.shiny==="positive"&&!ee&&(F=!1),k.illustration==="positive"&&!Le&&(F=!1),se.style.display=F?"inline-block":"none",F&&h++}),y.style.display=h>0?"":"none"})}),M(),C(),ie()}function K(o){k[o]==="neutral"?k[o]="positive":k[o]==="positive"?k[o]="negative":k[o]="neutral",j(),oe()}function oe(){let o=["reverse","holo","firstEdition","v","vmax","ex","shiny","illustration"];for(let d of o){let u=document.getElementById(`filter-${d}`);u&&(u.classList.remove("active-positive","active-negative"),k[d]==="positive"?u.classList.add("active-positive"):k[d]==="negative"&&u.classList.add("active-negative"))}}document.getElementById("filter-alle").addEventListener("click",o=>{o.preventDefault(),k.reverse="neutral",k.holo="neutral",k.firstEdition="neutral",k.v="neutral",k.vmax="neutral",k.ex="neutral",k.shiny="neutral",k.illustration="neutral",j(),oe()}),document.getElementById("filter-reverse").addEventListener("click",o=>{o.preventDefault(),K("reverse")}),document.getElementById("filter-holo").addEventListener("click",o=>{o.preventDefault(),K("holo")}),document.getElementById("filter-firstEdition").addEventListener("click",o=>{o.preventDefault(),K("firstEdition")}),document.getElementById("filter-v").addEventListener("click",o=>{o.preventDefault(),K("v")}),document.getElementById("filter-vmax").addEventListener("click",o=>{o.preventDefault(),K("vmax")}),document.getElementById("filter-ex").addEventListener("click",o=>{o.preventDefault(),K("ex")}),document.getElementById("filter-shiny").addEventListener("click",o=>{o.preventDefault(),K("shiny")}),document.getElementById("filter-illustration").addEventListener("click",o=>{o.preventDefault(),K("illustration")});function x(){let o=document.getElementById("overlay");o.classList.add("fade-out"),setTimeout(()=>{o.classList.remove("shown","fade-out"),o.classList.add("hidden"),o.innerHTML=""},300)}function le(o){["kartentabelle","trainertabelle","energietabelle"].forEach(u=>{let y=document.getElementById(u);y&&(u===o?y.classList.remove("hidden"):y.classList.add("hidden"))})}window.zeigePokemonTabelle=function(){document.querySelectorAll("#tableToggle button").forEach(o=>o.classList.remove("active")),document.getElementById("showTablePokemon").classList.add("active"),le("kartentabelle")},window.zeigeTrainerTabelle=async function(){document.querySelectorAll("#tableToggle button").forEach(p=>p.classList.remove("active")),document.getElementById("showTableTrainer").classList.add("active"),le("trainertabelle");let o=document.querySelector("#trainertabelle tbody");o.innerHTML="";let d=document.createElement("tr");d.innerHTML=`
        <td>Unter-<br>st\xFCtzer</td>
        <td>
          <div id="supporterContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Supporter')">+ Unterst\xFCtzer</button>
        </td>
      `,o.appendChild(d);let u=document.createElement("tr");u.innerHTML=`
        <td>Item</td>
        <td>
          <div id="itemContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Item')">+ Item</button>
        </td>
      `,o.appendChild(u);let y=document.createElement("tr");y.innerHTML=`
        <td>Stadion</td>
        <td>
          <div id="stadiumContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Stadium')">+ Stadion</button>
        </td>
      `,o.appendChild(y);let l=document.createElement("tr");l.innerHTML=`
        <td>Ausr\xFCs-<br>tung</td>
        <td>
          <div id="toolContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Tool')">+ Ausr\xFCstung</button>
        </td>
      `,o.appendChild(l),await Q(),C()};async function Q(){let o=document.getElementById("supporterContainer"),d=document.getElementById("itemContainer"),u=document.getElementById("stadiumContainer"),y=document.getElementById("toolContainer"),l=await B();if(!l||!Array.isArray(l)){console.error("getTrainers() lieferte keine g\xFCltige Liste:",l);return}l.sort((m,c)=>(c.avg30||0)-(m.avg30||0));let p=document.createDocumentFragment(),h=document.createDocumentFragment(),b=document.createDocumentFragment(),g=document.createDocumentFragment();for(let m of l){window.cachedCards[m.cardId]=m;let c=document.createElement("img");c.alt=m.cardId,c.style.width="50px",c.style.height="69px",c.style.objectFit="cover",c.src="cardBackside.png";let w=new Image;w.onload=()=>c.src=m.imageLow,w.onerror=()=>console.warn("Fehler beim Laden von:",m.imageLow),w.src=m.imageLow;let E="";if(Array.isArray(m.subTypes))m.subTypes.some(S=>S.toLowerCase().includes("supporter"))?E="supporter":m.subTypes.some(S=>S.toLowerCase().includes("item"))?E="item":m.subTypes.some(S=>S.toLowerCase().includes("stadium"))?E="stadium":m.subTypes.some(S=>S.toLowerCase().includes("tool"))&&(E="tool");else if(typeof m.subTypes=="string"){let S=m.subTypes.toLowerCase();S.includes("supporter")?E="supporter":S.includes("item")?E="item":S.includes("stadium")?E="stadium":S.includes("tool")&&(E="tool")}E||(E="supporter"),c.addEventListener("click",()=>Ce(m.id,E)),E=="supporter"&&p.appendChild(c),E=="item"&&h.appendChild(c),E=="stadium"&&b.appendChild(c),E=="tool"&&g.appendChild(c)}o.appendChild(p),d.appendChild(h),u.appendChild(b),y.appendChild(g)}window.openTrainerOverlay=async function(o){if(!navigator.onLine)return alert("F\xFCr diese Funktion wird eine Internetverbindung ben\xF6tigt!"),null;let d=document.querySelector("#overlay");d.innerHTML=`
        <div id="overlayContent">
          <h2>Bitte warten...</h2>
          <p>Karten werden geladen</p>
          <div class="loader"></div>
        </div>
      `,d.classList.remove("hidden"),d.classList.add("shown");try{let u=window.cachedTrainerCardsByType[o];if(u||(u=await X(o),u&&(window.cachedTrainerCardsByType[o]=u)),!u||u.length===0){d.innerHTML=`
            <div id='overlayContent'>
              <h2>Keine Karten gefunden.</h2> 
              <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
            </div>
          `,document.getElementById("BackBtn").addEventListener("click",()=>{e.preventDefault(),x()});return}let y=`
          <div id="overlayContent">
            <button class="closeGallery" id="BackBtn">X</button>
            <h2>Kartenauswahl f\xFCr<br><strong>${o}</strong>:</h2>
            <p>
              Welche Karte m\xF6chtest du hinzuf\xFCgen?<br>
              <input type="text" id="nummerSuche" placeholder="Kartennummer eingeben\u2026" onkeyup="filterTrainerCardsByNumber()">
            </p>
            <div class="kartenGrid">
        `;for(let l of u){let p=l.avg30,h="\u2013";if(p!=null){let g=p.toFixed(2),m="#DEDEDE",c="\u{1FA99}";p>20?(m="#FF4444",c="\u{1F525}"):p>5&&(m="#FFAA00",c="\u{1F4B0}"),h=`<span style="color:${m}; font-size:14px;">${c} ${g}\u20AC</span>`}let b=l.id.split("-")[1];y+=`
            <div class="kartenItem" data-id="${l.id}" data-number="${b}" onclick="trainerKarteAusw\xE4hlen('${l.id}')">
              <div>ID: ${l.id}</div>
              <img src="${l.images.small}" alt="${l.name}">
              <div>${h}</div>
            </div>
          `}y+=`
            </div>
          </div>
        `,d.innerHTML=y,document.getElementById("BackBtn").addEventListener("click",()=>{x()})}catch(u){console.error(u),d.innerHTML=`
          <div id='overlayContent'>
            <h2>Fehler beim Laden.</h2>
            <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
          </div>`,document.getElementById("BackBtn").addEventListener("click",()=>{x()})}},window.trainerKarteAusw\u00E4hlen=async function(o){var u,y;let d=document.querySelector("#overlay");d.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',d.classList.remove("hidden"),d.classList.add("shown");try{let l=await fe.get({url:`https://api.pokemontcg.io/v2/cards/${o}`,headers:{Accept:"application/json","X-Api-Key":Ee.API_KEY,Connection:"close"}});if(l.status!==200){console.error("Fehler beim Abrufen der Karte:",l.status,l);return}let p=l.data.data;p.imageSmall=((u=p.images)==null?void 0:u.small)||null,p.imageLarge=((y=p.images)==null?void 0:y.large)||null,(!p.subtypes||p.subtypes.length===0)&&(p.subtypes="Supporter");let h=await A(p);if(!h){console.error("Keine ID von insertCard erhalten \u2013 Abbruch.");return}p.id=h,window.cachedCards[p.cardId]=p,d.innerHTML=`
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
        `;async function b(g,m){d.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',d.classList.remove("hidden"),d.classList.add("shown");try{g!=="none"&&await N.run(`UPDATE trainer SET ${g} = 1 WHERE id = ?`,[m]);let c=document.getElementById("supporterContainer");c.innerHTML="";let w=document.getElementById("itemContainer");w.innerHTML="";let E=document.getElementById("stadiumContainer");E.innerHTML="";let S=document.getElementById("toolContainer");S.innerHTML="",await Q()}catch(c){console.error("Fehler in finalizeTrainerSelection:",c.message,c)}x(),await ie()}document.getElementById("btnBasic").addEventListener("click",()=>b("basic",h)),document.getElementById("btnFirstEdition").addEventListener("click",()=>b("firstEdition",h)),document.getElementById("btnReverse").addEventListener("click",()=>b("reverse",h)),document.getElementById("btnHolo").addEventListener("click",()=>b("holo",h)),document.getElementById("closeOverlayConfirm").addEventListener("click",()=>b("none",h))}catch(l){console.error("Fehler bei trainerKarteAusw\xE4hlen:",l),d.innerHTML=`
          <div id="overlayContent">
            <h2>Fehler beim Hinzuf\xFCgen.</h2>
            <p>${l.message}</p>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">Schlie\xDFen</button>
          </div>
        `,document.getElementById("closeOverlayConfirm").addEventListener("click",()=>{x()})}};async function Ce(o,d){var g;let u=document.querySelector("#overlay");u.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',u.classList.remove("hidden"),u.classList.add("shown");let y=await ne();if(!y||!y.length)return;let l=[],p={};for(let m of y){let c=await Y(m);if(!c)continue;let w=((g=c.subTypes)==null?void 0:g.toLowerCase())||"";(d==="supporter"&&w.includes("supporter")||d==="item"&&w.includes("item")||d==="stadium"&&w.includes("stadium")||d==="tool"&&w.includes("tool"))&&(l.push(m),p[m]=c)}if(!l.length){x();return}let h=l.findIndex(m=>m===o);h===-1&&(h=0);async function b(){let m=l[h],c=p[m]||await Y(m);if(!c)return;let w="Unbekannt";c.addedAt&&(w=new Date(c.addedAt).toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}));let E=c.avg30,S="\u2013";if(E!=null){let P=E.toFixed(2),R="#DEDEDE",$="\u{1FA99}";E>20?(R="#FF4444",$="\u{1F525}"):E>5&&(R="#FFAA00",$="\u{1F4B0}"),S=`<span style="color:${R};">${$} ${P}\u20AC</span>`}else S='<span style="color:#888;">\u{1F578} Kein Preis gespeichert</span>';u.innerHTML=`
          <div id="overlayContent">
            <button class="closeGallery" id="closeGallery">X</button>
            <h2>Trainer</h2>
            <div style="display:flex; align-items:center; justify-content:center;">
              <div style="display:flex; flex-direction:column; align-items:center;">
                <img id="cardImage" src="cardBackside.png" alt="${m}" style="max-width:300px; max-height:400px; margin:0 20px;">
                <p style="margin-top:10px;">
                  ID: ${c.cardId} | Variante:
                  <select id="variantSelect">
                    <option value="none" ${c.basic!=1&&c.reverse!=1&&c.holo!=1?"selected":""}>Keine Angabe</option>
                    <option value="basic" ${c.basic==1?"selected":""}>Basic</option>
                    <option value="reverse" ${c.reverse==1?"selected":""}>Reverse</option>
                    <option value="holo" ${c.holo==1?"selected":""}>Holo</option>
                    <option value="firstEdition" ${c.firstEdition==1?"selected":""}>First Edition</option>
                  </select>
                  <br>
                  30d-Wert: <strong>${S}</strong><br>
                  Hinzugef\xFCgt am: <strong>${w}</strong>
                </p>
              </div>
            </div>
            <br>
            <button id="deleteTrainer">\u274C Karte l\xF6schen</button>
          </div>
        `,document.getElementById("variantSelect").addEventListener("change",async function(){var ge;let P=this.value,R=0,$=0,J=0,V=0;P==="basic"?R=1:P==="reverse"?$=1:P==="holo"?J=1:P==="firstEdition"&&(V=1);try{await N.run("UPDATE trainer SET basic = ?, reverse = ?, holo = ?, firstEdition = ? WHERE id = ?",[R,$,J,V,m]);let z=(ge=window.cachedCards)==null?void 0:ge[c.cardId];z&&(z.basic=R,z.reverse=$,z.holo=J,z.firstEdition=V),console.log("Variante aktualisiert und Cache angepasst:",P)}catch(z){console.error("Fehler beim Aktualisieren der Variante:",z),console.error("Fehlerdetails:",JSON.stringify(z)),alert("Fehler beim Speichern der Variante.")}});let H=new Image;H.onload=()=>{document.getElementById("cardImage").src=c.imageHigh},H.onerror=()=>console.warn("Fehler beim Laden des Galerie-Bildes:",c.imageHigh),H.src=c.imageHigh,document.getElementById("deleteTrainer").addEventListener("click",async()=>{if(confirm("Willst du diese Karte wirklich l\xF6schen?")){await N.run("DELETE FROM trainer WHERE id = ?",[m]),x();let P=document.getElementById("supporterContainer"),R=document.getElementById("itemContainer"),$=document.getElementById("stadiumContainer"),J=document.getElementById("toolContainer");P&&(P.innerHTML=""),R&&(R.innerHTML=""),$&&($.innerHTML=""),J&&(J.innerHTML=""),await Q(),await ie()}}),document.getElementById("closeGallery").addEventListener("click",()=>{x()})}b()}window.filterTrainerCardsByNumber=function(){let o=document.getElementById("nummerSuche").value.trim();document.querySelectorAll(".kartenItem").forEach(d=>{let u=d.dataset.number;d.style.display=u&&u.startsWith(o)?"block":"none"})},window.zeigeEnergieTabelle=async function(){document.querySelectorAll("#tableToggle button").forEach(y=>y.classList.remove("active")),document.getElementById("showTableEnergie").classList.add("active"),le("energietabelle");let o=document.querySelector("#energietabelle tbody");o.innerHTML="";let d=document.createElement("tr");d.innerHTML=`
        <td>Basis-Energie</td>
        <td>
          <div id="basisEnergieContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openEnergieOverlay('Basic')">+ Basis</button>
        </td>
      `,o.appendChild(d);let u=document.createElement("tr");u.innerHTML=`
        <td>Spezial-Energie</td>
        <td>
          <div id="spezialEnergieContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openEnergieOverlay('Special')">+ Spezial</button>
        </td>
      `,o.appendChild(u),await pe(),C()};async function pe(){var p,h,b;let o=document.getElementById("basisEnergieContainer"),d=document.getElementById("spezialEnergieContainer"),u=await ce();if(!u||!Array.isArray(u)){console.error("getEnergies() lieferte keine g\xFCltige Liste:",u);return}u.sort((g,m)=>(m.avg30||0)-(g.avg30||0));let y=document.createDocumentFragment(),l=document.createDocumentFragment();for(let g of u){window.cachedCards[g.cardId]=g;let m=document.createElement("img");m.alt=g.cardId,m.style.width="50px",m.style.height="69px",m.style.objectFit="cover";let c=((p=g.subTypes)==null?void 0:p.toLowerCase())||"";m.addEventListener("click",()=>Zt(g.id,c.includes("basic")?"basic":"special")),m.src="cardBackside.png";let w=new Image;w.onload=()=>m.src=g.imageLow,w.onerror=()=>console.warn("Fehler beim Laden von:",g.imageLow),w.src=g.imageLow,(h=g.subTypes)!=null&&h.toLowerCase().includes("basic")?y.appendChild(m):(b=g.subTypes)!=null&&b.toLowerCase().includes("special")&&l.appendChild(m)}o.appendChild(y),d.appendChild(l)}window.openEnergieOverlay=async function(o){if(!navigator.onLine)return alert("F\xFCr diese Funktion wird eine Internetverbindung ben\xF6tigt!"),null;let d=document.querySelector("#overlay");d.innerHTML=`
        <div id="overlayContent">
          <h2>Bitte warten...</h2>
          <p>Karten werden geladen</p>
          <div class="loader"></div>
        </div>
      `,d.classList.remove("hidden"),d.classList.add("shown");try{let u=window.cachedEnergyCardsByType[o];if(u||(u=await Xt(o),u&&(window.cachedEnergyCardsByType[o]=u)),!u||u.length===0){d.innerHTML=`
            <div id='overlayContent'>
              <h2>Keine Karten gefunden.</h2> 
              <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
            </div>
          `,document.getElementById("BackBtn").addEventListener("click",()=>{x()});return}let y=`
          <div id="overlayContent">
            <button class="closeGallery" id="BackBtn">X</button>
            <h2>Kartenauswahl f\xFCr<br><strong>${o}</strong>:</h2>
            <p>
              Welche Karte m\xF6chtest du hinzuf\xFCgen?<br>
              <input type="text" id="nummerSuche" placeholder="Kartennummer eingeben\u2026" onkeyup="filterEnergieCardsByNumber()">
            </p>
            <div class="kartenGrid">
        `;for(let l of u){let p=l.avg30,h="\u2013";if(p!=null){let g=p.toFixed(2),m="#DEDEDE",c="\u{1FA99}";p>20?(m="#FF4444",c="\u{1F525}"):p>5&&(m="#FFAA00",c="\u{1F4B0}"),h=`<span style="color:${m}; font-size:14px;">${c} ${g}\u20AC</span>`}let b=l.id.split("-")[1];y+=`
            <div class="kartenItem" data-id="${l.id}" data-number="${b}" onclick="energieKarteAusw\xE4hlen('${l.id}')">
              <div>ID: ${l.id}</div>
              <img src="${l.images.small}" alt="${l.name}">
              <div>${h}</div>
            </div>
          `}y+=`
            </div>
          </div>
        `,d.innerHTML=y,document.getElementById("BackBtn").addEventListener("click",()=>{x()})}catch(u){console.error(u),d.innerHTML=`
          <div id='overlayContent'>
            <h2>Fehler beim Laden.</h2>
            <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
          </div>`,document.getElementById("BackBtn").addEventListener("click",()=>{x()})}};async function Xt(o){var p,h,b,g;let d=[],u=1,y=250,l=!0;for(;l;){let m=`https://api.pokemontcg.io/v2/cards?q=supertype:Energy subtypes:${o}&orderBy=name&page=${u}&pageSize=${y}`,c=await fe.get({url:m,headers:{Accept:"application/json","X-Api-Key":Ee.API_KEY,Connection:"close"}});if(c.status!==200||!((h=(p=c.data)==null?void 0:p.data)!=null&&h.length)){l=!1;break}let w=c.data.data;for(let E of w){let S=(b=E.cardmarket)==null?void 0:b.prices;E.avg30=(g=S==null?void 0:S.avg30)!=null?g:null}d=d.concat(w),w.length<y?l=!1:u++}return d}window.energieKarteAusw\u00E4hlen=async function(o){var u,y;let d=document.querySelector("#overlay");d.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',d.classList.remove("hidden"),d.classList.add("shown");try{let l=await fe.get({url:`https://api.pokemontcg.io/v2/cards/${o}`,headers:{Accept:"application/json","X-Api-Key":Ee.API_KEY,Connection:"close"}});if(l.status!==200){console.error("Fehler beim Abrufen der Karte:",l.status,l);return}let p=l.data.data;p.imageSmall=((u=p.images)==null?void 0:u.small)||null,p.imageLarge=((y=p.images)==null?void 0:y.large)||null;let h=await ae(p);if(!h){console.error("Keine ID von insertCard erhalten \u2013 Abbruch.");return}p.id=h,window.cachedCards[p.cardId]=p,d.innerHTML=`
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
        `;async function b(g,m){d.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',d.classList.remove("hidden"),d.classList.add("shown");try{g!=="none"&&await N.run(`UPDATE energy SET ${g} = 1 WHERE id = ?`,[m]);let c=document.getElementById("basisEnergieContainer");c.innerHTML="";let w=document.getElementById("spezialEnergieContainer");w.innerHTML="",await pe()}catch(c){console.error("Fehler in finalizeEnergieSelection:",c.message,c)}x(),await ie()}document.getElementById("btnBasic").addEventListener("click",()=>b("basic",h)),document.getElementById("btnFirstEdition").addEventListener("click",()=>b("firstEdition",h)),document.getElementById("btnReverse").addEventListener("click",()=>b("reverse",h)),document.getElementById("btnHolo").addEventListener("click",()=>b("holo",h)),document.getElementById("closeOverlayConfirm").addEventListener("click",()=>b("none",h))}catch(l){console.error("Fehler bei energieKarteAusw\xE4hlen:",l),d.innerHTML=`
          <div id="overlayContent">
            <h2>Fehler beim Hinzuf\xFCgen.</h2>
            <p>${l.message}</p>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">Schlie\xDFen</button>
          </div>
        `,document.getElementById("closeOverlayConfirm").addEventListener("click",()=>{x()})}};async function Zt(o,d){var g;let u=document.querySelector("#overlay");u.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',u.classList.remove("hidden"),u.classList.add("shown");let y=await ke();if(!y||!y.length)return;let l=[],p={};for(let m of y){let c=await Se(m);if(!c)continue;let w=((g=c.subTypes)==null?void 0:g.toLowerCase())||"";(d==="basic"&&w.includes("basic")||d==="special"&&w.includes("special"))&&(l.push(m),p[m]=c)}if(!l.length){x();return}let h=l.findIndex(m=>m===o);h===-1&&(h=0);async function b(){let m=l[h],c=p[m]||await Se(m);if(!c)return;let w="Unbekannt";c.addedAt&&(w=new Date(c.addedAt).toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}));let E=c.avg30,S="\u2013";if(E!=null){let P=E.toFixed(2),R="#DEDEDE",$="\u{1FA99}";E>20?(R="#FF4444",$="\u{1F525}"):E>5&&(R="#FFAA00",$="\u{1F4B0}"),S=`<span style="color:${R};">${$} ${P}\u20AC</span>`}else S='<span style="color:#888;">\u{1F578} Kein Preis gespeichert</span>';u.innerHTML=`
          <div id="overlayContent">
            <button class="closeGallery" id="closeGallery">X</button>
            <h2>Energie</h2>
            <div style="display:flex; align-items:center; justify-content:center;">
              <div style="display:flex; flex-direction:column; align-items:center;">
                <img id="cardImage" src="cardBackside.png" alt="${m}" style="max-width:300px; max-height:400px; margin:0 20px;">
                <p style="margin-top:10px;">
                  ID: ${c.cardId} | Variante:
                  <select id="variantSelect">
                    <option value="none" ${c.basic!=1&&c.reverse!=1&&c.holo!=1?"selected":""}>Keine Angabe</option>
                    <option value="basic" ${c.basic==1?"selected":""}>Basic</option>
                    <option value="reverse" ${c.reverse==1?"selected":""}>Reverse</option>
                    <option value="holo" ${c.holo==1?"selected":""}>Holo</option>
                    <option value="firstEdition" ${c.firstEdition==1?"selected":""}>First Edition</option>
                  </select>
                  <br>
                  30d-Wert: <strong>${S}</strong><br>
                  Hinzugef\xFCgt am: <strong>${w}</strong>
                </p>
              </div>
            </div>
            <br>
            <button id="deleteEnergie">\u274C Karte l\xF6schen</button>
          </div>
        `,document.getElementById("variantSelect").addEventListener("change",async function(){var ge;let P=this.value,R=0,$=0,J=0,V=0;P==="basic"?R=1:P==="reverse"?$=1:P==="holo"?J=1:P==="firstEdition"&&(V=1);try{await N.run("UPDATE energy SET basic = ?, reverse = ?, holo = ?, firstEdition = ? WHERE id = ?",[R,$,J,V,m]);let z=(ge=window.cachedCards)==null?void 0:ge[c.cardId];z&&(z.basic=R,z.reverse=$,z.holo=J,z.firstEdition=V),console.log("Variante aktualisiert und Cache angepasst:",P)}catch(z){console.error("Fehler beim Aktualisieren der Variante:",z),console.error("Fehlerdetails:",JSON.stringify(z)),alert("Fehler beim Speichern der Variante.")}});let H=new Image;H.onload=()=>{document.getElementById("cardImage").src=c.imageHigh},H.onerror=()=>console.warn("Fehler beim Laden des Galerie-Bildes:",c.imageHigh),H.src=c.imageHigh,document.getElementById("deleteEnergie").addEventListener("click",async()=>{if(confirm("Willst du diese Karte wirklich l\xF6schen?"))try{await N.run("DELETE FROM energy WHERE id = ?",[m]),x();let P=document.getElementById("basisEnergieContainer"),R=document.getElementById("spezialEnergieContainer");P&&(P.innerHTML=""),R&&(R.innerHTML=""),await pe(),await ie()}catch(P){console.error("Fehler beim L\xF6schen der Energie-Karte:",P),alert("Beim L\xF6schen ist ein Fehler aufgetreten.")}}),document.getElementById("closeGallery").addEventListener("click",()=>{x()})}b()}window.filterEnergieCardsByNumber=function(){let o=document.getElementById("nummerSuche").value.trim();document.querySelectorAll(".kartenItem").forEach(d=>{let u=d.dataset.number;d.style.display=u&&u.startsWith(o)?"block":"none"})}})()});})();
/*! Bundled license information:

@capacitor/core/dist/index.js:
  (*! Capacitor: https://capacitorjs.com/ - MIT License *)

@capacitor/core/dist/index.js:
  (*! Capacitor: https://capacitorjs.com/ - MIT License *)
*/
