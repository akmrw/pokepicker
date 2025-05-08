(()=>{var vt=Object.defineProperty;var ee=(n,t)=>()=>(n&&(t=n(n=0)),t);var wt=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports),Pe=(n,t)=>{for(var r in t)vt(n,r,{get:t[r],enumerable:!0})};var Et,kt,Je,ar,ir,me,fe,St,Ct,Tt,we,_e,or,Ee,xe=ee(()=>{Et=n=>{let t=new Map;t.set("web",{name:"web"});let r=n.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:t},a=(s,y)=>{r.platforms.set(s,y)},i=s=>{r.platforms.has(s)&&(r.currentPlatform=r.platforms.get(s))};return r.addPlatform=a,r.setPlatform=i,r},kt=n=>n.CapacitorPlatforms=Et(n),Je=kt(typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{}),ar=Je.addPlatform,ir=Je.setPlatform;(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(me||(me={}));fe=class extends Error{constructor(t,r){super(t),this.message=t,this.code=r}},St=n=>{var t,r;return n!=null&&n.androidBridge?"android":!((r=(t=n==null?void 0:n.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||r===void 0)&&r.bridge?"ios":"web"},Ct=n=>{var t,r,a,i,s;let y=n.CapacitorCustomPlatform||null,f=n.Capacitor||{},C=f.Plugins=f.Plugins||{},T=n.CapacitorPlatforms,U=()=>y!==null?y.name:St(n),P=((t=T==null?void 0:T.currentPlatform)===null||t===void 0?void 0:t.getPlatform)||U,x=()=>P()!=="web",V=((r=T==null?void 0:T.currentPlatform)===null||r===void 0?void 0:r.isNativePlatform)||x,G=B=>{let E=ne.get(B);return!!(E!=null&&E.platforms.has(P())||ce(B))},Y=((a=T==null?void 0:T.currentPlatform)===null||a===void 0?void 0:a.isPluginAvailable)||G,J=B=>{var E;return(E=f.PluginHeaders)===null||E===void 0?void 0:E.find(A=>A.name===B)},ce=((i=T==null?void 0:T.currentPlatform)===null||i===void 0?void 0:i.getPluginHeader)||J,de=B=>n.console.error(B),re=(B,E,A)=>Promise.reject(`${A} does not have an implementation of "${E}".`),ne=new Map,se=(B,E={})=>{let A=ne.get(B);if(A)return console.warn(`Capacitor plugin "${B}" already registered. Cannot register plugins twice.`),A.proxy;let R=P(),$=ce(B),K,j=async()=>(!K&&R in E?K=typeof E[R]=="function"?K=await E[R]():K=E[R]:y!==null&&!K&&"web"in E&&(K=typeof E.web=="function"?K=await E.web():K=E.web),K),ae=(H,O)=>{var X,L;if($){let Q=$==null?void 0:$.methods.find(z=>O===z.name);if(Q)return Q.rtype==="promise"?z=>f.nativePromise(B,O.toString(),z):(z,ue)=>f.nativeCallback(B,O.toString(),z,ue);if(H)return(X=H[O])===null||X===void 0?void 0:X.bind(H)}else{if(H)return(L=H[O])===null||L===void 0?void 0:L.bind(H);throw new fe(`"${B}" plugin is not implemented on ${R}`,me.Unimplemented)}},F=H=>{let O,X=(...L)=>{let Q=j().then(z=>{let ue=ae(z,H);if(ue){let ie=ue(...L);return O=ie==null?void 0:ie.remove,ie}else throw new fe(`"${B}.${H}()" is not implemented on ${R}`,me.Unimplemented)});return H==="addListener"&&(Q.remove=async()=>O()),Q};return X.toString=()=>`${H.toString()}() { [capacitor code] }`,Object.defineProperty(X,"name",{value:H,writable:!1,configurable:!1}),X},_=F("addListener"),ve=F("removeListener"),Le=(H,O)=>{let X=_({eventName:H},O),L=async()=>{let z=await X;ve({eventName:H,callbackId:z},O)},Q=new Promise(z=>X.then(()=>z({remove:L})));return Q.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await L()},Q},I=new Proxy({},{get(H,O){switch(O){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return $?Le:_;case"removeListener":return ve;default:return F(O)}}});return C[B]=I,ne.set(B,{name:B,proxy:I,platforms:new Set([...Object.keys(E),...$?[R]:[]])}),I},pe=((s=T==null?void 0:T.currentPlatform)===null||s===void 0?void 0:s.registerPlugin)||se;return f.convertFileSrc||(f.convertFileSrc=B=>B),f.getPlatform=P,f.handleError=de,f.isNativePlatform=V,f.isPluginAvailable=Y,f.pluginMethodNoop=re,f.registerPlugin=pe,f.Exception=fe,f.DEBUG=!!f.DEBUG,f.isLoggingEnabled=!!f.isLoggingEnabled,f.platform=f.getPlatform(),f.isNative=f.isNativePlatform(),f},Tt=n=>n.Capacitor=Ct(n),we=Tt(typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{}),_e=we.registerPlugin,or=we.Plugins,Ee=class{constructor(t){this.listeners={},this.windowListeners={},t&&(console.warn(`Capacitor WebPlugin "${t.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=t)}addListener(t,r){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(r);let i=this.windowListeners[t];i&&!i.registered&&this.addWindowListener(i);let s=async()=>this.removeListener(t,r),y=Promise.resolve({remove:s});return Object.defineProperty(y,"remove",{value:async()=>{console.warn("Using addListener() without 'await' is deprecated."),await s()}}),y}async removeAllListeners(){this.listeners={};for(let t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,r){let a=this.listeners[t];a&&a.forEach(i=>i(r))}hasListeners(t){return!!this.listeners[t].length}registerWindowListener(t,r){this.windowListeners[r]={registered:!1,windowEventName:t,pluginEventName:r,handler:a=>{this.notifyListeners(r,a)}}}unimplemented(t="not implemented"){return new we.Exception(t,me.Unimplemented)}unavailable(t="not available"){return new we.Exception(t,me.Unavailable)}async removeListener(t,r){let a=this.listeners[t];if(!a)return;let i=a.indexOf(r);this.listeners[t].splice(i,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}}});var Xe,Ie,Be,Ae=ee(()=>{Xe=async n=>new Promise((t,r)=>{let a=new FileReader;a.onload=()=>{let i=a.result,s=i.substr(i.indexOf(",")+1);t(s)},a.onerror=i=>r(i),a.readAsDataURL(n)}),Ie=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Be=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)});var Ze,ke,Qe,Ye,Me,et=ee(()=>{Ae();Ze=(n,t,r={})=>{let a=Ie(n),i=Ie(t),s=`; expires=${(r.expires||"").replace("expires=","")}`,y=(r.path||"/").replace("path=","");document.cookie=`${a}=${i||""}${s}; path=${y}`},ke=()=>{let n=[],t={};if(!document.cookie)return n;let r=document.cookie.split(";")||[];for(let i of r){let[s,y]=i.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=Be(s).trim(),y=Be(y).trim(),t[s]=y}let a=Object.entries(t);for(let[i,s]of a)n.push({key:i,value:s});return n},Qe=n=>{let t=ke();for(let r of t)if(r.key===n)return r;return{key:n,value:""}},Ye=n=>{document.cookie=`${n}=; Max-Age=0`},Me=()=>{let n=document.cookie.split(";")||[];for(let t of n)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}});var Pt,xt,Re,le,tt,rt,nt,at,it,ot=ee(()=>{Ae();Pt=(n={})=>{let t=Object.keys(n);return Object.keys(n).map(i=>i.toLocaleLowerCase()).reduce((i,s,y)=>(i[s]=n[t[y]],i),{})},xt=(n,t=!0)=>n?Object.entries(n).reduce((a,i)=>{let[s,y]=i,f,C;return Array.isArray(y)?(C="",y.forEach(T=>{f=t?encodeURIComponent(T):T,C+=`${s}=${f}&`}),C.slice(0,-1)):(f=t?encodeURIComponent(y):y,C=`${s}=${f}`),`${a}&${C}`},"").substr(1):null,Re=(n,t={})=>{let r=Object.assign({method:n.method||"GET",headers:n.headers},t),i=Pt(n.headers)["content-type"]||"";if(typeof n.data=="string")r.body=n.data;else if(i.includes("application/x-www-form-urlencoded")){let s=new URLSearchParams;for(let[y,f]of Object.entries(n.data||{}))s.set(y,f);r.body=s.toString()}else if(i.includes("multipart/form-data")){let s=new FormData;if(n.data instanceof FormData)n.data.forEach((f,C)=>{s.append(C,f)});else for(let f of Object.keys(n.data))s.append(f,n.data[f]);r.body=s;let y=new Headers(r.headers);y.delete("content-type"),r.headers=y}else(i.includes("application/json")||typeof n.data=="object")&&(r.body=JSON.stringify(n.data));return r},le=async n=>{let t=Re(n,n.webFetchExtra),r=xt(n.params,n.shouldEncodeUrlParams),a=r?`${n.url}?${r}`:n.url,i=await fetch(a,t),s=i.headers.get("content-type")||"",{responseType:y="text"}=i.ok?n:{};s.includes("application/json")&&(y="json");let f;switch(y){case"arraybuffer":case"blob":let T=await i.blob();f=await Xe(T);break;case"json":f=await i.json();break;case"document":case"text":default:f=await i.text()}let C={};return i.headers.forEach((T,U)=>{C[U]=T}),{data:f,headers:C,status:i.status,url:i.url}},tt=async n=>le(Object.assign(Object.assign({},n),{method:"GET"})),rt=async n=>le(Object.assign(Object.assign({},n),{method:"POST"})),nt=async n=>le(Object.assign(Object.assign({},n),{method:"PUT"})),at=async n=>le(Object.assign(Object.assign({},n),{method:"PATCH"})),it=async n=>le(Object.assign(Object.assign({},n),{method:"DELETE"}))});var De={};Pe(De,{HttpWeb:()=>qe});var qe,Fe=ee(()=>{xe();et();ot();qe=class extends Ee{constructor(){super(),this.request=async t=>le(t),this.get=async t=>tt(t),this.post=async t=>rt(t),this.put=async t=>nt(t),this.patch=async t=>at(t),this.del=async t=>it(t),this.getCookiesMap=async t=>{let r=ke(),a={};for(let i of r)a[i.key]=i.value;return a},this.getCookies=async t=>{let{url:r}=t;return{cookies:ke()}},this.setCookie=async t=>{let{key:r,value:a,expires:i="",path:s=""}=t;Ze(r,a,{expires:i,path:s})},this.getCookie=async t=>Qe(t.key),this.deleteCookie=async t=>Ye(t.key),this.clearCookies=async t=>Me(),this.clearAllCookies=async()=>Me(),this.uploadFile=async t=>{let r=new FormData;r.append(t.name,t.blob||"undefined");let a=Object.assign(Object.assign({},t),{body:r,method:"POST"});return this.post(a)},this.downloadFile=async t=>{let r=Re(t,t.webFetchExtra),a=await fetch(t.url,r),i;if(!(t!=null&&t.progress))i=await a.blob();else if(!(a!=null&&a.body))i=new Blob;else{let s=a.body.getReader(),y=0,f=[],C=a.headers.get("content-type"),T=parseInt(a.headers.get("content-length")||"0",10);for(;;){let{done:x,value:V}=await s.read();if(x)break;f.push(V),y+=(V==null?void 0:V.length)||0;let G={type:"DOWNLOAD",url:t.url,bytes:y,contentLength:T};this.notifyListeners("progress",G)}let U=new Uint8Array(y),P=0;for(let x of f)typeof x!="undefined"&&(U.set(x,P),P+=x.length);i=new Blob([U.buffer],{type:C||void 0})}return{blob:i}}}}});var st=wt((pr,Bt)=>{Bt.exports={API_KEY:"a5d75d50-65e6-41a4-aa2f-9b2c93afaaa7"}});var he,be,At,Mt,Rt,Oe,Se,ge,lt,ct,Ke,yr,qt,Dt,Ft,Ot,je,fr,$e=ee(()=>{(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(he||(he={}));be=class extends Error{constructor(t,r,a){super(t),this.message=t,this.code=r,this.data=a}},At=n=>{var t,r;return n!=null&&n.androidBridge?"android":!((r=(t=n==null?void 0:n.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||r===void 0)&&r.bridge?"ios":"web"},Mt=n=>{let t=n.CapacitorCustomPlatform||null,r=n.Capacitor||{},a=r.Plugins=r.Plugins||{},i=()=>t!==null?t.name:At(n),s=()=>i()!=="web",y=P=>{let x=T.get(P);return!!(x!=null&&x.platforms.has(i())||f(P))},f=P=>{var x;return(x=r.PluginHeaders)===null||x===void 0?void 0:x.find(V=>V.name===P)},C=P=>n.console.error(P),T=new Map,U=(P,x={})=>{let V=T.get(P);if(V)return console.warn(`Capacitor plugin "${P}" already registered. Cannot register plugins twice.`),V.proxy;let G=i(),Y=f(P),J,ce=async()=>(!J&&G in x?J=typeof x[G]=="function"?J=await x[G]():J=x[G]:t!==null&&!J&&"web"in x&&(J=typeof x.web=="function"?J=await x.web():J=x.web),J),de=(E,A)=>{var R,$;if(Y){let K=Y==null?void 0:Y.methods.find(j=>A===j.name);if(K)return K.rtype==="promise"?j=>r.nativePromise(P,A.toString(),j):(j,ae)=>r.nativeCallback(P,A.toString(),j,ae);if(E)return(R=E[A])===null||R===void 0?void 0:R.bind(E)}else{if(E)return($=E[A])===null||$===void 0?void 0:$.bind(E);throw new be(`"${P}" plugin is not implemented on ${G}`,he.Unimplemented)}},re=E=>{let A,R=(...$)=>{let K=ce().then(j=>{let ae=de(j,E);if(ae){let F=ae(...$);return A=F==null?void 0:F.remove,F}else throw new be(`"${P}.${E}()" is not implemented on ${G}`,he.Unimplemented)});return E==="addListener"&&(K.remove=async()=>A()),K};return R.toString=()=>`${E.toString()}() { [capacitor code] }`,Object.defineProperty(R,"name",{value:E,writable:!1,configurable:!1}),R},ne=re("addListener"),se=re("removeListener"),pe=(E,A)=>{let R=ne({eventName:E},A),$=async()=>{let j=await R;se({eventName:E,callbackId:j},A)},K=new Promise(j=>R.then(()=>j({remove:$})));return K.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await $()},K},B=new Proxy({},{get(E,A){switch(A){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return Y?pe:ne;case"removeListener":return se;default:return re(A)}}});return a[P]=B,T.set(P,{name:P,proxy:B,platforms:new Set([...Object.keys(x),...Y?[G]:[]])}),B};return r.convertFileSrc||(r.convertFileSrc=P=>P),r.getPlatform=i,r.handleError=C,r.isNativePlatform=s,r.isPluginAvailable=y,r.registerPlugin=U,r.Exception=be,r.DEBUG=!!r.DEBUG,r.isLoggingEnabled=!!r.isLoggingEnabled,r},Rt=n=>n.Capacitor=Mt(n),Oe=Rt(typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{}),Se=Oe.registerPlugin,ge=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,r){let a=!1;this.listeners[t]||(this.listeners[t]=[],a=!0),this.listeners[t].push(r);let s=this.windowListeners[t];s&&!s.registered&&this.addWindowListener(s),a&&this.sendRetainedArgumentsForEvent(t);let y=async()=>this.removeListener(t,r);return Promise.resolve({remove:y})}async removeAllListeners(){this.listeners={};for(let t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,r,a){let i=this.listeners[t];if(!i){if(a){let s=this.retainedEventArguments[t];s||(s=[]),s.push(r),this.retainedEventArguments[t]=s}return}i.forEach(s=>s(r))}hasListeners(t){return!!this.listeners[t].length}registerWindowListener(t,r){this.windowListeners[r]={registered:!1,windowEventName:t,pluginEventName:r,handler:a=>{this.notifyListeners(r,a)}}}unimplemented(t="not implemented"){return new Oe.Exception(t,he.Unimplemented)}unavailable(t="not available"){return new Oe.Exception(t,he.Unavailable)}async removeListener(t,r){let a=this.listeners[t];if(!a)return;let i=a.indexOf(r);this.listeners[t].splice(i,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){let r=this.retainedEventArguments[t];r&&(delete this.retainedEventArguments[t],r.forEach(a=>{this.notifyListeners(t,a)}))}},lt=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),ct=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),Ke=class extends ge{async getCookies(){let t=document.cookie,r={};return t.split(";").forEach(a=>{if(a.length<=0)return;let[i,s]=a.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");i=ct(i).trim(),s=ct(s).trim(),r[i]=s}),r}async setCookie(t){try{let r=lt(t.key),a=lt(t.value),i=`; expires=${(t.expires||"").replace("expires=","")}`,s=(t.path||"/").replace("path=",""),y=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${r}=${a||""}${i}; path=${s}; ${y};`}catch(r){return Promise.reject(r)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(r){return Promise.reject(r)}}async clearCookies(){try{let t=document.cookie.split(";")||[];for(let r of t)document.cookie=r.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}},yr=Se("CapacitorCookies",{web:()=>new Ke}),qt=async n=>new Promise((t,r)=>{let a=new FileReader;a.onload=()=>{let i=a.result;t(i.indexOf(",")>=0?i.split(",")[1]:i)},a.onerror=i=>r(i),a.readAsDataURL(n)}),Dt=(n={})=>{let t=Object.keys(n);return Object.keys(n).map(i=>i.toLocaleLowerCase()).reduce((i,s,y)=>(i[s]=n[t[y]],i),{})},Ft=(n,t=!0)=>n?Object.entries(n).reduce((a,i)=>{let[s,y]=i,f,C;return Array.isArray(y)?(C="",y.forEach(T=>{f=t?encodeURIComponent(T):T,C+=`${s}=${f}&`}),C.slice(0,-1)):(f=t?encodeURIComponent(y):y,C=`${s}=${f}`),`${a}&${C}`},"").substr(1):null,Ot=(n,t={})=>{let r=Object.assign({method:n.method||"GET",headers:n.headers},t),i=Dt(n.headers)["content-type"]||"";if(typeof n.data=="string")r.body=n.data;else if(i.includes("application/x-www-form-urlencoded")){let s=new URLSearchParams;for(let[y,f]of Object.entries(n.data||{}))s.set(y,f);r.body=s.toString()}else if(i.includes("multipart/form-data")||n.data instanceof FormData){let s=new FormData;if(n.data instanceof FormData)n.data.forEach((f,C)=>{s.append(C,f)});else for(let f of Object.keys(n.data))s.append(f,n.data[f]);r.body=s;let y=new Headers(r.headers);y.delete("content-type"),r.headers=y}else(i.includes("application/json")||typeof n.data=="object")&&(r.body=JSON.stringify(n.data));return r},je=class extends ge{async request(t){let r=Ot(t,t.webFetchExtra),a=Ft(t.params,t.shouldEncodeUrlParams),i=a?`${t.url}?${a}`:t.url,s=await fetch(i,r),y=s.headers.get("content-type")||"",{responseType:f="text"}=s.ok?t:{};y.includes("application/json")&&(f="json");let C,T;switch(f){case"arraybuffer":case"blob":T=await s.blob(),C=await qt(T);break;case"json":C=await s.json();break;case"document":case"text":default:C=await s.text()}let U={};return s.headers.forEach((P,x)=>{U[x]=P}),{data:C,headers:U,status:s.status,url:s.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}},fr=Se("CapacitorHttp",{web:()=>new je})});var Ce,Te,dt=ee(()=>{Ce=class{constructor(t){this.sqlite=t,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToStore(t){try{return await this.sqlite.saveToStore({database:t}),Promise.resolve()}catch(r){return Promise.reject(r)}}async saveToLocalDisk(t){try{return await this.sqlite.saveToLocalDisk({database:t}),Promise.resolve()}catch(r){return Promise.reject(r)}}async getFromLocalDiskToStore(t){let r=t!=null?t:!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:r}),Promise.resolve()}catch(a){return Promise.reject(a)}}async echo(t){try{let r=await this.sqlite.echo({value:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async isSecretStored(){try{let t=await this.sqlite.isSecretStored();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async setEncryptionSecret(t){try{return await this.sqlite.setEncryptionSecret({passphrase:t}),Promise.resolve()}catch(r){return Promise.reject(r)}}async changeEncryptionSecret(t,r){try{return await this.sqlite.changeEncryptionSecret({passphrase:t,oldpassphrase:r}),Promise.resolve()}catch(a){return Promise.reject(a)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(t){return Promise.reject(t)}}async checkEncryptionSecret(t){try{let r=await this.sqlite.checkEncryptionSecret({passphrase:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async addUpgradeStatement(t,r){try{return t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:t,upgrade:r}),Promise.resolve()}catch(a){return Promise.reject(a)}}async createConnection(t,r,a,i,s){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.createConnection({database:t,encrypted:r,mode:a,version:i,readonly:s});let y=new Te(t,s,this.sqlite),f=s?`RO_${t}`:`RW_${t}`;return this._connectionDict.set(f,y),Promise.resolve(y)}catch(y){return Promise.reject(y)}}async closeConnection(t,r){try{t.endsWith(".db")&&(t=t.slice(0,-3)),await this.sqlite.closeConnection({database:t,readonly:r});let a=r?`RO_${t}`:`RW_${t}`;return this._connectionDict.delete(a),Promise.resolve()}catch(a){return Promise.reject(a)}}async isConnection(t,r){let a={};t.endsWith(".db")&&(t=t.slice(0,-3));let i=r?`RO_${t}`:`RW_${t}`;return a.result=this._connectionDict.has(i),Promise.resolve(a)}async retrieveConnection(t,r){t.endsWith(".db")&&(t=t.slice(0,-3));let a=r?`RO_${t}`:`RW_${t}`;if(this._connectionDict.has(a)){let i=this._connectionDict.get(a);return typeof i!="undefined"?Promise.resolve(i):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async getNCDatabasePath(t,r){try{let a=await this.sqlite.getNCDatabasePath({path:t,database:r});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async createNCConnection(t,r){try{await this.sqlite.createNCConnection({databasePath:t,version:r});let a=new Te(t,!0,this.sqlite),i=`RO_${t})`;return this._connectionDict.set(i,a),Promise.resolve(a)}catch(a){return Promise.reject(a)}}async closeNCConnection(t){try{await this.sqlite.closeNCConnection({databasePath:t});let r=`RO_${t})`;return this._connectionDict.delete(r),Promise.resolve()}catch(r){return Promise.reject(r)}}async isNCConnection(t){let r={},a=`RO_${t})`;return r.result=this._connectionDict.has(a),Promise.resolve(r)}async retrieveNCConnection(t){if(this._connectionDict.has(t)){let r=`RO_${t})`,a=this._connectionDict.get(r);return typeof a!="undefined"?Promise.resolve(a):Promise.reject(`Connection ${t} is undefined`)}else return Promise.reject(`Connection ${t} does not exist`)}async isNCDatabase(t){try{let r=await this.sqlite.isNCDatabase({databasePath:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){let t=new Map;try{for(let r of this._connectionDict.keys()){let a=r.substring(3),i=r.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:a,readonly:i}),t.set(r,null)}for(let r of t.keys())this._connectionDict.delete(r);return Promise.resolve()}catch(r){return Promise.reject(r)}}async checkConnectionsConsistency(){try{let t=[...this._connectionDict.keys()],r=[],a=[];for(let s of t)r.push(s.substring(0,2)),a.push(s.substring(3));let i=await this.sqlite.checkConnectionsConsistency({dbNames:a,openModes:r});return i.result||(this._connectionDict=new Map),Promise.resolve(i)}catch(t){return this._connectionDict=new Map,Promise.reject(t)}}async importFromJson(t){try{let r=await this.sqlite.importFromJson({jsonstring:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async isJsonValid(t){try{let r=await this.sqlite.isJsonValid({jsonstring:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async copyFromAssets(t){let r=t!=null?t:!0;try{return await this.sqlite.copyFromAssets({overwrite:r}),Promise.resolve()}catch(a){return Promise.reject(a)}}async getFromHTTPRequest(t,r){let a=r!=null?r:!0;try{return await this.sqlite.getFromHTTPRequest({url:t,overwrite:a}),Promise.resolve()}catch(i){return Promise.reject(i)}}async isDatabaseEncrypted(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{let r=await this.sqlite.isDatabaseEncrypted({database:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async isInConfigEncryption(){try{let t=await this.sqlite.isInConfigEncryption();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigBiometricAuth(){try{let t=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDatabase(t){t.endsWith(".db")&&(t=t.slice(0,-3));try{let r=await this.sqlite.isDatabase({database:t});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async getDatabaseList(){try{let r=(await this.sqlite.getDatabaseList()).values;r.sort();let a={values:r};return Promise.resolve(a)}catch(t){return Promise.reject(t)}}async getMigratableDbList(t){let r=t||"default";try{let a=await this.sqlite.getMigratableDbList({folderPath:r});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async addSQLiteSuffix(t,r){let a=t||"default",i=r||[];try{let s=await this.sqlite.addSQLiteSuffix({folderPath:a,dbNameList:i});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async deleteOldDatabases(t,r){let a=t||"default",i=r||[];try{let s=await this.sqlite.deleteOldDatabases({folderPath:a,dbNameList:i});return Promise.resolve(s)}catch(s){return Promise.reject(s)}}async moveDatabasesAndAddSuffix(t,r){let a=t||"default",i=r||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:a,dbNameList:i})}},Te=class{constructor(t,r,a){this.dbName=t,this.readonly=r,this.sqlite=a}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async beginTransaction(){try{let t=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async commitTransaction(){try{let t=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async rollbackTransaction(){try{let t=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTransactionActive(){try{let t=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async loadExtension(t){try{return await this.sqlite.loadExtension({database:this.dbName,path:t,readonly:this.readonly}),Promise.resolve()}catch(r){return Promise.reject(r)}}async enableLoadExtension(t){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:t,readonly:this.readonly}),Promise.resolve()}catch(r){return Promise.reject(r)}}async getUrl(){try{let t=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getVersion(){try{let t=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getTableList(){try{let t=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async execute(t,r=!0,a=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{let i=await this.sqlite.execute({database:this.dbName,statements:t,transaction:r,readonly:!1,isSQL92:a});return Promise.resolve(i)}}catch(i){return Promise.reject(i)}}async query(t,r,a=!0){let i;try{return r&&r.length>0?i=await this.sqlite.query({database:this.dbName,statement:t,values:r,readonly:this.readonly,isSQL92:!0}):i=await this.sqlite.query({database:this.dbName,statement:t,values:[],readonly:this.readonly,isSQL92:a}),i=await this.reorderRows(i),Promise.resolve(i)}catch(s){return Promise.reject(s)}}async run(t,r,a=!0,i="no",s=!0){let y;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(r&&r.length>0?y=await this.sqlite.run({database:this.dbName,statement:t,values:r,transaction:a,readonly:!1,returnMode:i,isSQL92:!0}):y=await this.sqlite.run({database:this.dbName,statement:t,values:[],transaction:a,readonly:!1,returnMode:i,isSQL92:s}),y.changes=await this.reorderRows(y.changes),Promise.resolve(y))}catch(f){return Promise.reject(f)}}async executeSet(t,r=!0,a="no",i=!0){let s;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(s=await this.sqlite.executeSet({database:this.dbName,set:t,transaction:r,readonly:!1,returnMode:a,isSQL92:i}),s.changes=await this.reorderRows(s.changes),Promise.resolve(s))}catch(y){return Promise.reject(y)}}async isExists(){try{let t=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isTable(t){try{let r=await this.sqlite.isTableExists({database:this.dbName,table:t,readonly:this.readonly});return Promise.resolve(r)}catch(r){return Promise.reject(r)}}async isDBOpen(){try{let t=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{let t=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(t)}}catch(t){return Promise.reject(t)}}async setSyncDate(t){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:t,readonly:!1}),Promise.resolve())}catch(r){return Promise.reject(r)}}async getSyncDate(){try{let t=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly}),r="";return t.syncDate>0&&(r=new Date(t.syncDate*1e3).toISOString()),Promise.resolve(r)}catch(t){return Promise.reject(t)}}async exportToJson(t,r=!1){try{let a=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:t,readonly:this.readonly,encrypted:r});return Promise.resolve(a)}catch(a){return Promise.reject(a)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async executeTransaction(t,r=!0){let a=0,i=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),i=await this.sqlite.isTransactionActive({database:this.dbName}),!i)return Promise.reject("After Begin Transaction, no transaction active");try{for(let f of t){if(typeof f!="object"||!("statement"in f))throw new Error("Error a task.statement must be provided");if("values"in f&&f.values&&f.values.length>0){let C=f.statement.toUpperCase().includes("RETURNING")?"all":"no",T=await this.sqlite.run({database:this.dbName,statement:f.statement,values:f.values,transaction:!1,readonly:!1,returnMode:C,isSQL92:r});if(T.changes.changes<0)throw new Error("Error in transaction method run ");a+=T.changes.changes}else{let C=await this.sqlite.execute({database:this.dbName,statements:f.statement,transaction:!1,readonly:!1});if(C.changes.changes<0)throw new Error("Error in transaction method execute ");a+=C.changes.changes}}let s=await this.sqlite.commitTransaction({database:this.dbName});a+=s.changes.changes;let y={changes:{changes:a}};return Promise.resolve(y)}catch(s){let y=s.message?s.message:s;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(y)}}async reorderRows(t){let r=t;if(t!=null&&t.values&&typeof t.values[0]=="object"&&Object.keys(t.values[0]).includes("ios_columns")){let a=t.values[0].ios_columns,i=[];for(let s=1;s<t.values.length;s++){let y=t.values[s],f={};for(let C of a)f[C]=y[C];i.push(f)}r.values=i}return Promise.resolve(r)}}});var ut={};Pe(ut,{CapacitorSQLiteWeb:()=>He});var He,mt=ee(()=>{$e();He=class extends ge{constructor(){super(...arguments),this.jeepSqliteElement=null,this.isWebStoreOpen=!1}async initWebStore(){await customElements.whenDefined("jeep-sqlite"),this.jeepSqliteElement=document.querySelector("jeep-sqlite"),this.ensureJeepSqliteIsAvailable(),this.jeepSqliteElement.addEventListener("jeepSqliteImportProgress",t=>{this.notifyListeners("sqliteImportProgressEvent",t.detail)}),this.jeepSqliteElement.addEventListener("jeepSqliteExportProgress",t=>{this.notifyListeners("sqliteExportProgressEvent",t.detail)}),this.jeepSqliteElement.addEventListener("jeepSqliteHTTPRequestEnded",t=>{this.notifyListeners("sqliteHTTPRequestEndedEvent",t.detail)}),this.jeepSqliteElement.addEventListener("jeepSqlitePickDatabaseEnded",t=>{this.notifyListeners("sqlitePickDatabaseEndedEvent",t.detail)}),this.jeepSqliteElement.addEventListener("jeepSqliteSaveDatabaseToDisk",t=>{this.notifyListeners("sqliteSaveDatabaseToDiskEvent",t.detail)}),this.isWebStoreOpen||(this.isWebStoreOpen=await this.jeepSqliteElement.isStoreOpen())}async saveToStore(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.saveToStore(t);return}catch(r){throw new Error(`${r}`)}}async getFromLocalDiskToStore(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.getFromLocalDiskToStore(t);return}catch(r){throw new Error(`${r}`)}}async saveToLocalDisk(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.saveToLocalDisk(t);return}catch(r){throw new Error(`${r}`)}}async echo(t){return this.ensureJeepSqliteIsAvailable(),await this.jeepSqliteElement.echo(t)}async createConnection(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.createConnection(t);return}catch(r){throw new Error(`${r}`)}}async open(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.open(t);return}catch(r){throw new Error(`${r}`)}}async closeConnection(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.closeConnection(t);return}catch(r){throw new Error(`${r}`)}}async getVersion(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.getVersion(t)}catch(r){throw new Error(`${r}`)}}async checkConnectionsConsistency(t){this.ensureJeepSqliteIsAvailable();try{return await this.jeepSqliteElement.checkConnectionsConsistency(t)}catch(r){throw new Error(`${r}`)}}async close(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.close(t);return}catch(r){throw new Error(`${r}`)}}async beginTransaction(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.beginTransaction(t)}catch(r){throw new Error(`${r}`)}}async commitTransaction(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.commitTransaction(t)}catch(r){throw new Error(`${r}`)}}async rollbackTransaction(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.rollbackTransaction(t)}catch(r){throw new Error(`${r}`)}}async isTransactionActive(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isTransactionActive(t)}catch(r){throw new Error(`${r}`)}}async getTableList(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.getTableList(t)}catch(r){throw new Error(`${r}`)}}async execute(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.execute(t)}catch(r){throw new Error(`${r}`)}}async executeSet(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.executeSet(t)}catch(r){throw new Error(`${r}`)}}async run(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.run(t)}catch(r){throw new Error(`${r}`)}}async query(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.query(t)}catch(r){throw new Error(`${r}`)}}async isDBExists(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isDBExists(t)}catch(r){throw new Error(`${r}`)}}async isDBOpen(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isDBOpen(t)}catch(r){throw new Error(`${r}`)}}async isDatabase(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isDatabase(t)}catch(r){throw new Error(`${r}`)}}async isTableExists(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isTableExists(t)}catch(r){throw new Error(`${r}`)}}async deleteDatabase(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.deleteDatabase(t);return}catch(r){throw new Error(`${r}`)}}async isJsonValid(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isJsonValid(t)}catch(r){throw new Error(`${r}`)}}async importFromJson(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.importFromJson(t)}catch(r){throw new Error(`${r}`)}}async exportToJson(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.exportToJson(t)}catch(r){throw new Error(`${r}`)}}async createSyncTable(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.createSyncTable(t)}catch(r){throw new Error(`${r}`)}}async setSyncDate(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.setSyncDate(t);return}catch(r){throw new Error(`${r}`)}}async getSyncDate(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.getSyncDate(t)}catch(r){throw new Error(`${r}`)}}async deleteExportedRows(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.deleteExportedRows(t);return}catch(r){throw new Error(`${r}`)}}async addUpgradeStatement(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.addUpgradeStatement(t);return}catch(r){throw new Error(`${r}`)}}async copyFromAssets(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.copyFromAssets(t);return}catch(r){throw new Error(`${r}`)}}async getFromHTTPRequest(t){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.getFromHTTPRequest(t);return}catch(r){throw new Error(`${r}`)}}async getDatabaseList(){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.getDatabaseList()}catch(t){throw new Error(`${t}`)}}ensureJeepSqliteIsAvailable(){if(this.jeepSqliteElement===null)throw new Error("The jeep-sqlite element is not present in the DOM! Please check the @capacitor-community/sqlite documentation for instructions regarding the web platform.")}ensureWebstoreIsOpen(){if(!this.isWebStoreOpen)throw new Error('WebStore is not open yet. You have to call "initWebStore()" first.')}async getUrl(){throw this.unimplemented("Not implemented on web.")}async getMigratableDbList(t){throw console.log("getMigratableDbList",t),this.unimplemented("Not implemented on web.")}async addSQLiteSuffix(t){throw console.log("addSQLiteSuffix",t),this.unimplemented("Not implemented on web.")}async deleteOldDatabases(t){throw console.log("deleteOldDatabases",t),this.unimplemented("Not implemented on web.")}async moveDatabasesAndAddSuffix(t){throw console.log("moveDatabasesAndAddSuffix",t),this.unimplemented("Not implemented on web.")}async isSecretStored(){throw this.unimplemented("Not implemented on web.")}async setEncryptionSecret(t){throw console.log("setEncryptionSecret",t),this.unimplemented("Not implemented on web.")}async changeEncryptionSecret(t){throw console.log("changeEncryptionSecret",t),this.unimplemented("Not implemented on web.")}async clearEncryptionSecret(){throw console.log("clearEncryptionSecret"),this.unimplemented("Not implemented on web.")}async checkEncryptionSecret(t){throw console.log("checkEncryptionPassPhrase",t),this.unimplemented("Not implemented on web.")}async getNCDatabasePath(t){throw console.log("getNCDatabasePath",t),this.unimplemented("Not implemented on web.")}async createNCConnection(t){throw console.log("createNCConnection",t),this.unimplemented("Not implemented on web.")}async closeNCConnection(t){throw console.log("closeNCConnection",t),this.unimplemented("Not implemented on web.")}async isNCDatabase(t){throw console.log("isNCDatabase",t),this.unimplemented("Not implemented on web.")}async isDatabaseEncrypted(t){throw console.log("isDatabaseEncrypted",t),this.unimplemented("Not implemented on web.")}async isInConfigEncryption(){throw this.unimplemented("Not implemented on web.")}async isInConfigBiometricAuth(){throw this.unimplemented("Not implemented on web.")}async loadExtension(t){throw console.log("loadExtension",t),this.unimplemented("Not implemented on web.")}async enableLoadExtension(t){throw console.log("enableLoadExtension",t),this.unimplemented("Not implemented on web.")}}});var ht,gt=ee(()=>{$e();dt();ht=Se("CapacitorSQLite",{web:()=>Promise.resolve().then(()=>(mt(),ut)).then(n=>new n.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite})});var pt={};Pe(pt,{getCardById:()=>Ut,getCardIds:()=>Wt,getCardsByIds:()=>Vt,getDaten:()=>$t,getEnergieById:()=>rr,getEnergieCardIds:()=>tr,getEnergies:()=>Yt,getEngName:()=>Nt,getName:()=>Ht,getTrainerById:()=>Zt,getTrainerCardIds:()=>Qt,getTrainers:()=>_t,initDatabase:()=>jt,insertCard:()=>zt,insertEnergie:()=>er,insertTrainer:()=>Xt,updateCardIds:()=>Gt,updatePrice:()=>Jt});async function jt(){return M=await Kt.createConnection("pokepicker",!1,"no-encryption",1),await M.open(),await M.execute(`
    CREATE TABLE IF NOT EXISTS pokemon (
      id INTEGER PRIMARY KEY,
      dex TEXT,
      name TEXT,
      engName TEXT,
      cardIds TEXT
    );
  `),await M.execute(`
    CREATE TABLE IF NOT EXISTS trainer (
      id INTEGER PRIMARY KEY,
      cardId TEXT,
      rarity TEXT,
      setName TEXT,
      basic INTEGER DEFAULT 0,
      reverse INTEGER DEFAULT 0,
      holo INTEGER DEFAULT 0,
      addedAt TEXT,
      imageLow TEXT,
      imageHigh TEXT,
      cardName TEXT,
      subTypes TEXT,
      avg30 REAL
    );
  `),await M.execute(`
    CREATE TABLE IF NOT EXISTS energy (
      id INTEGER PRIMARY KEY,
      cardId TEXT,
      rarity TEXT,
      setName TEXT,
      basic INTEGER DEFAULT 0,
      reverse INTEGER DEFAULT 0,
      holo INTEGER DEFAULT 0,
      addedAt TEXT,
      imageLow TEXT,
      imageHigh TEXT,
      cardName TEXT,
      subTypes TEXT,
      avg30 REAL
    );
  `),await M.execute(`
    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY,
      cardId TEXT,
      rarity TEXT,
      setName TEXT,
      basic INTEGER DEFAULT 0,
      reverse INTEGER DEFAULT 0,
      holo INTEGER DEFAULT 0,
      addedAt TEXT,
      imageLow TEXT,
      imageHigh TEXT,
      cardName TEXT,
      subTypes TEXT,
      avg30 REAL
    );
  `),(await M.query("SELECT COUNT(*) as count FROM pokemon")).values[0].count===0&&await M.execute(`
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
        (83, "0083", "Porenta", "Farfetch\u2019d"),
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
      `),M}async function $t(){return await M.query("SELECT * FROM pokemon")}async function Ht(n){return(await M.query("SELECT name FROM pokemon WHERE dex = ?",[n])).values[0].name}async function Nt(n){return(await M.query("SELECT engName FROM pokemon WHERE dex = ?",[n])).values[0].engName}async function Wt(n){return(await M.query("SELECT cardIds FROM pokemon WHERE dex = ?",[n])).values[0].cardIds}async function Gt(n,t){await M.run("UPDATE pokemon SET cardIds = ? WHERE dex = ?",[t,n])}async function zt(n){var t,r,a,i,s;try{let y=typeof n.imageSmall=="string"?n.imageSmall:null,f=typeof n.imageLarge=="string"?n.imageLarge:null;return((s=(await M.run(`INSERT INTO cards (cardId, cardName, rarity, setName, imageLow, imageHigh, subTypes, addedAt, avg30)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[n.id,n.name,n.rarity||"",((t=n.set)==null?void 0:t.name)||"",y,f,Array.isArray(n.subtypes)?n.subtypes.join(", "):"",new Date().toISOString(),(i=(a=(r=n.cardmarket)==null?void 0:r.prices)==null?void 0:a.avg30)!=null?i:null])).changes)==null?void 0:s.lastId)||null}catch(y){return console.error("Fehler in insertCard():",y.message||y,(n==null?void 0:n.id)||"unbekannte Karte"),null}}async function Ut(n){var r;return((r=(await M.query("SELECT * FROM cards WHERE id = ?",[n])).values)==null?void 0:r[0])||null}async function Vt(n){let t=n.map(()=>"?").join(",");return(await M.query(`SELECT * FROM cards WHERE id IN (${t})`,n)).values}async function Jt(n,t){try{await M.run("UPDATE cards SET avg30 = ? WHERE cardId = ?",[t,n])}catch(r){console.error(`Fehler beim Speichern von avg30 f\xFCr ${n}:`,r.message)}}async function _t(){return(await M.query("SELECT * FROM trainer")).values}async function Xt(n){var t,r,a,i,s;try{let y=typeof n.imageSmall=="string"?n.imageSmall:null,f=typeof n.imageLarge=="string"?n.imageLarge:null;return((s=(await M.run(`INSERT INTO trainer (cardId, cardName, rarity, setName, imageLow, imageHigh, subTypes, addedAt, avg30)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[n.id,n.name,n.rarity||"",((t=n.set)==null?void 0:t.name)||"",y,f,Array.isArray(n.subtypes)?n.subtypes.join(", "):"",new Date().toISOString(),(i=(a=(r=n.cardmarket)==null?void 0:r.prices)==null?void 0:a.avg30)!=null?i:null])).changes)==null?void 0:s.lastId)||null}catch(y){return console.error("Fehler in insertTrainer():",y.message||y,(n==null?void 0:n.id)||"unbekannte Karte"),null}}async function Zt(n){var r;return((r=(await M.query("SELECT * FROM trainer WHERE id = ?",[n])).values)==null?void 0:r[0])||null}async function Qt(){return(await M.query("SELECT id FROM trainer")).values.map(t=>t.id)}async function Yt(){return(await M.query("SELECT * FROM energy")).values}async function er(n){var t,r,a,i,s;try{let y=typeof n.imageSmall=="string"?n.imageSmall:null,f=typeof n.imageLarge=="string"?n.imageLarge:null;return((s=(await M.run(`INSERT INTO energy (cardId, cardName, rarity, setName, imageLow, imageHigh, subTypes, addedAt, avg30)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[n.id,n.name,n.rarity||"",((t=n.set)==null?void 0:t.name)||"",y,f,Array.isArray(n.subtypes)?n.subtypes.join(", "):"",new Date().toISOString(),(i=(a=(r=n.cardmarket)==null?void 0:r.prices)==null?void 0:a.avg30)!=null?i:null])).changes)==null?void 0:s.lastId)||null}catch(y){return console.error("Fehler in insertEnergie():",y.message||y,(n==null?void 0:n.id)||"unbekannte Karte"),null}}async function tr(){return(await M.query("SELECT id FROM energy")).values.map(t=>t.id)}async function rr(n){var r;return((r=(await M.query("SELECT * FROM energy WHERE id = ?",[n])).values)==null?void 0:r[0])||null}var Kt,M,yt=ee(()=>{gt();Kt=new Ce(ht)});xe();var te=_e("Http",{web:()=>Promise.resolve().then(()=>(Fe(),De)).then(n=>new n.HttpWeb),electron:()=>Promise.resolve().then(()=>(Fe(),De)).then(n=>new n.HttpWeb)});var oe=st(),W;document.addEventListener("DOMContentLoaded",()=>{(async()=>{let n=document.getElementById("cardLoader");n.innerHTML=`
      <p id="loaderText">Lade Karten\u2026</p>
      <div id="progressBarContainer">
        <div id="progressBar"></div>
      </div>
      <div id="progressText">0%</div>
    `,n.classList.remove("hidden"),n.classList.add("shown");let{initDatabase:t,getDaten:r,getName:a,getEngName:i,getCardIds:s,updateCardIds:y,insertCard:f,getCardById:C,getCardsByIds:T,updatePrice:U,getTrainers:P,insertTrainer:x,getTrainerCardIds:V,getTrainerById:G,getEnergies:Y,insertEnergie:J,getEnergieCardIds:ce,getEnergieById:de}=await Promise.resolve().then(()=>(yt(),pt));W=await t();let re=await r(),ne=document.querySelector("#kartentabelle tbody");window.cachedCards={},window.cachedPokemonCardsByName={},window.cachedTrainerCardsByType={},window.cachedEnergyCardsByType={};let se=0,pe=re.values.length;for(let l of re.values){let c=document.createElement("tr"),u=parseInt(l.dex),h=`
        <td class="dexnr">${l.dex}</td>
        <td class="pokemon">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${u}.png" alt="${l.name}"><br>
          <a href="https://www.pokewiki.de/${l.name}" target="_blank">${l.name}</a>
        </td>
        <td id="td_${l.dex}">
          <div id="kartenContainer_${l.dex}" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button id="neueKarteBtn_${l.dex}" onclick="openOverlay('${l.dex}')">+ Neue Karte</button>
        </td>
      `;c.innerHTML=h,ne.appendChild(c),await $(l.dex),se++;let o=Math.min(99,Math.round(se/pe*100)),g=document.getElementById("progressBar"),d=document.getElementById("progressText");g&&(g.style.width=o+"%"),d&&(d.textContent=o+"%")}progressBar.style.width="100%",progressText.textContent="100%";let B=n.offsetHeight,E=document.createElement("div");E.style.height=B+"px",E.style.backgroundColor="#333",E.style.borderRadius="8px",E.style.display="flex",E.style.alignItems="center",E.style.justifyContent="center",E.style.color="#DEDEDE",E.style.fontFamily='"Saira", sans-serif',E.style.marginBottom="20px",E.style.marginTop="20px",E.style.gap="10px",E.innerHTML=`
      <p id="loaderText">Lade Karten\u2026</p>
      <div id="progressBarContainer" style="width: 100%; max-width: 400px; height: 20px; background-color: #555; border-radius: 10px; margin: 10px auto;">
        <div id="progressBar" style="height: 100%; width: 100%; background-color: #00AEFF;"></div>
      </div>
      <div id="progressText" style="min-width: 40px; margin-right: 15px;">100%</div>
    `,n.replaceWith(E),setTimeout(()=>{E.style.transition="height 0.5s ease, opacity 0.5s ease",E.style.height="0px",E.style.opacity="0",E.style.overflow="hidden"},100),setTimeout(()=>{E.remove()},700),A(),R(),_(),document.querySelectorAll("#tableToggle button").forEach(l=>l.classList.remove("active")),document.getElementById("showTablePokemon").classList.add("active");function A(){let l=document.querySelectorAll("#kartentabelle tbody tr"),c=0;l.forEach(u=>{u.style.display!=="none"&&c++}),document.getElementById("eintragsAnzahl").textContent=`(${c})`}function R(){let l=document.querySelectorAll("#kartentabelle tbody tr"),c=0;l.forEach(u=>{if(u.style.display==="none")return;let h=u.querySelectorAll("div[id^='kartenContainer_'] img");c+=h.length}),document.getElementById("kartenAnzahl").textContent=`(${c})`}async function $(l){let c=document.getElementById(`kartenContainer_${l}`),u=await s(l);if(!u)return;let h=u.split(";").filter(d=>d.trim()),o=await T(h.map(d=>parseInt(d)));o.sort((d,b)=>(b.avg30||0)-(d.avg30||0));let g=document.createDocumentFragment();for(let d of o){window.cachedCards[d.cardId]=d;let b=document.createElement("img");b.alt=d.cardId,b.style.width="50px",b.style.height="69px",b.style.objectFit="cover",b.src=d.imageLow,b.addEventListener("click",()=>K(l,h.indexOf(String(d.id)))),g.appendChild(b)}c.appendChild(g)}async function K(l,c){let u=document.querySelector("#overlay");u.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',u.classList.remove("hidden"),u.classList.add("shown");let h=await s(l);if(!h)return;let o=h.split(";").filter(b=>b.trim()!=="");if(o.length===0){L();return}let g=c;async function d(){let b=o[g];try{let v=await C(b),p="Unbekannt";if(v.addedAt){let S=new Date(v.addedAt),q={day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"};p=S.toLocaleString("de-DE",q)}let m="Keine Angabe";v.basic==1&&(m="Basic"),v.reverse==1&&(m="Reverse"),v.holo==1&&(m="Holo");let w=await F(v.cardId);if(w==null){let S=j(v.cardId);w=await F(S)}let k="\u2013";if(w!=null){let S=w.toFixed(2),q="#DEDEDE",D="\u{1FA99}";w>20?(q="#FF4444",D="\u{1F525}"):w>5&&(q="#FFAA00",D="\u{1F4B0}"),k=`<span style="color:${q};">${D} ${S}\u20AC</span>`}u.innerHTML=`
            <div id="overlayContent">
            <button class="closeGallery" id="closeGallery">X</button>
              <h2>Karte ansehen</h2>
              <div style="display:flex; align-items:center; justify-content:center;">
                <div style="display:flex; flex-direction:column; align-items:center;">
                  <img src="${v.imageHigh}" alt="${b}" style="max-width:300px; max-height:400px; margin:0 20px;">
                  <p style="margin-top:10px;">
                    ID: ${v.cardId} | Variante: <strong>${m}</strong><br>
                    30d-Wert: <strong>${k}</strong><br>
                    Hinzugef\xFCgt am: <strong>${p}
                  </p>
                </div>
              </div>
              <button id="prevCard" style="font-size:24px;">\u2B05\uFE0F</button>
              <button id="nextCard" style="font-size:24px;">\u27A1\uFE0F</button>
              <br><br>
              <button id="deleteCard">\u274C Karte l\xF6schen</button>
            </div>
          `,document.getElementById("prevCard").addEventListener("click",()=>{g=(g-1+o.length)%o.length,d()}),document.getElementById("nextCard").addEventListener("click",()=>{g=(g+1)%o.length,d()}),document.getElementById("deleteCard").addEventListener("click",async()=>{if(confirm("Willst du diese Karte wirklich l\xF6schen?")){let S=o[g];await W.run("DELETE FROM cards WHERE id = ?",[S]),o.splice(g,1),await y(l,o.join(";")+";"),L();let q=document.getElementById(`kartenContainer_${l}`);q.innerHTML="",$(l),R(),_()}}),document.getElementById("closeGallery").addEventListener("click",()=>{let S=document.getElementById("overlay");S.classList.add("fade-out"),setTimeout(()=>{S.classList.remove("shown","fade-out"),S.classList.add("hidden"),S.innerHTML=""},300)})}catch(v){console.error("Fehler beim Anzeigen der Karte:",v),L()}}d()}window.openOverlay=async function(l){let c=document.querySelector("#overlay");c.innerHTML=`
        <div id="overlayContent">
          <h2>Bitte warten...</h2>
          <p>Karten werden geladen</p>
          <div class="loader"></div>
        </div>
      `,c.classList.remove("hidden"),c.classList.add("shown");try{let u=await a(l),h=await i(l);h=="Nidoran\u2642"&&(h="Nidoran \u2642"),h=="Nidoran\u2640"&&(h="Nidoran \u2640"),h=="Sirfetch\u2019d"&&(h="Sirfetch'd");let o=window.cachedPokemonCardsByName[h];if(o||(o=await ae(h),o&&(window.cachedPokemonCardsByName[h]=o)),!o||o.length===0){c.innerHTML=`
            <div id='overlayContent'>
              <h2>Keine Karten gefunden.</h2> 
              <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
            </div>
          `,document.getElementById("BackBtn").addEventListener("click",d=>{d.preventDefault(),L()});return}let g=`
          <div id="overlayContent">
            <button class="closeGallery" id="BackBtn">X</button>
            <h2>
              Kartenauswahl f\xFCr<br>
              <strong>${u}</strong>:
            </h2>
            <p>Welche Karte m\xF6chtest du hinzuf\xFCgen?</p>
            <div class="kartenGrid">
        `;for(let d of o){let b=d.avg30,v="\u2013";if(b!=null){let p=b.toFixed(2),m="#DEDEDE",w="\u{1FA99}";b>20?(m="#FF4444",w="\u{1F525}"):b>5&&(m="#FFAA00",w="\u{1F4B0}"),v=`<span style="color:${m}; font-size:14px;">${w} ${p}\u20AC</span>`}g+=`
            <div class="kartenItem" onclick="karteAusw\xE4hlen('${d.id}', '${l}', '${u}')">
              <div>ID: ${d.id}</div>
              <img src="${d.images.small}" alt="${u}">
              <div>${v}</div>
            </div>
          `}g+=`
            </div>
          </div>
        `,c.innerHTML=g,document.getElementById("BackBtn").addEventListener("click",d=>{d.preventDefault(),L()})}catch(u){console.error(u),c.innerHTML=`
        <div id='overlayContent'>
          <h2>Fehler beim Laden.</h2>
          <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
        </div>`,document.getElementById("BackBtn").addEventListener("click",h=>{h.preventDefault(),L()})}};function j(l){return l.replace(/-(0*)(\d+)/,(c,u,h)=>"-"+parseInt(h,10))}async function ae(l){var c,u;try{let h=`https://api.pokemontcg.io/v2/cards?q=name:"${l}"&orderBy=-set.releaseDate`,o=await te.get({url:h,headers:{Accept:"application/json","X-Api-Key":oe.API_KEY,Connection:"close"}});if(o.status!==200)return console.error("Fehler beim Abrufen der Karten:",o.status,o),null;let g=o.data.data;for(let d of g){let b=(c=d.cardmarket)==null?void 0:c.prices;d.avg30=(u=b==null?void 0:b.avg30)!=null?u:null}return g}catch(h){return console.error("Fehler beim Abrufen \xFCber HTTP:",h.message),null}}async function F(l){var c,u,h,o,g;try{let d=`https://api.pokemontcg.io/v2/cards?q=id:${l}`,b=await te.get({url:d,headers:{Accept:"application/json","X-Api-Key":oe.API_KEY,Connection:"close"}});if(b.status!==200||!((u=(c=b.data)==null?void 0:c.data)!=null&&u.length))return console.error("Fehler beim Abrufen der Karte:",b.status,b),null;let v=(o=(h=b.data.data[0])==null?void 0:h.cardmarket)==null?void 0:o.prices;return(g=v==null?void 0:v.avg30)!=null?g:null}catch(d){return console.error("Fehler beim Preisabruf:",d.message),null}}window.karteAusw\u00E4hlen=async function(l,c,u){var v,p;let h=document.querySelector("#overlay");h.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',h.classList.remove("hidden"),h.classList.add("shown");let o=await te.get({url:`https://api.pokemontcg.io/v2/cards/${l}`,headers:{Accept:"application/json","X-Api-Key":oe.API_KEY,Connection:"close"}});if(o.status!==200){console.error("Fehler beim Abrufen der Karte:",o.status,o);return}let g=o.data.data;g.imageSmall=((v=g.images)==null?void 0:v.small)||null,g.imageLarge=((p=g.images)==null?void 0:p.large)||null;let d=await f(g);if(!d){console.error("Keine ID von insertCard erhalten \u2013 Abbruch.");return}g.id=d,window.cachedCards[g.cardId]=g,h.innerHTML=`
        <div id="overlayContent">
          <h2>Karte hinzugef\xFCgt!</h2>
          <p>Du hast <strong>${u}</strong> (${l}) ausgew\xE4hlt.</p>
          <br>
          <p>Welche Variante m\xF6chtest du speichern?</p>
          <button class="overlayMenuBtn" id="btnBasic">Basic</button>
          <button class="overlayMenuBtn" id="btnReverse">Reverse</button>
          <button class="overlayMenuBtn" id="btnHolo">Holo</button>
          <br><br>
          <button class="overlayMenuBtn" id="closeOverlayConfirm">\xDCberspringen</button>
        </div>
      `;async function b(m){h.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',h.classList.remove("hidden"),h.classList.add("shown"),m!=="none"&&await W.run(`UPDATE cards SET ${m} = 1 WHERE id = ?`,[d]);let w=await s(c);w||(w=""),w+=d+";",await y(c,w);let k=document.getElementById(`kartenContainer_${c}`);k.innerHTML="",await $(c),L(),A(),R(),_()}document.getElementById("btnBasic").addEventListener("click",()=>b("basic")),document.getElementById("btnReverse").addEventListener("click",()=>b("reverse")),document.getElementById("btnHolo").addEventListener("click",()=>b("holo")),document.getElementById("closeOverlayConfirm").addEventListener("click",()=>b("none"))};async function _(){try{let l=await W.query("SELECT avg30 FROM cards WHERE avg30 IS NOT NULL"),c=await W.query("SELECT avg30 FROM trainer WHERE avg30 IS NOT NULL"),u=await W.query("SELECT avg30 FROM energy WHERE avg30 IS NOT NULL"),h=0;for(let d of l.values)h+=d.avg30;for(let d of c.values)h+=d.avg30;for(let d of u.values)h+=d.avg30;let o="\u{1FA99}";h>1e3?o="\u{1F525}":h>500&&(o="\u{1F4B0}");let g=`Gesamtwert: ${o} ${h.toFixed(2)}\u20AC`;document.getElementById("gesamtwert").textContent=g}catch(l){console.error("Fehler beim Berechnen des Gesamtwerts:",l)}}async function ve(){let l=await W.query("SELECT cardId FROM cards"),c=await W.query("SELECT cardId FROM trainer"),u=await W.query("SELECT cardId FROM energy"),h=0,o=0,g=l.values.length+c.values.length+u.values.length;alert(`Aktualisierung von ${g} Preisen gestartet.`);for(let b of l.values){let v=b.cardId,p=await F(v);if(p==null){let k=j(v);p=await F(k)}p!=null&&(await U(v,p),h++),o++;let m=Math.round(o/g*100),w=document.getElementById("preiseAktualisierenProgress");w&&(w.textContent=m+"%")}for(let b of c.values){let v=b.cardId,p=await F(v);if(p==null){let k=j(v);p=await F(k)}p!=null&&(await W.run("UPDATE trainer SET avg30 = ? WHERE cardId = ?",[p,v]),h++),o++;let m=Math.round(o/g*100),w=document.getElementById("preiseAktualisierenProgress");w&&(w.textContent=m+"%")}for(let b of u.values){let v=b.cardId,p=await F(v);if(p==null){let k=j(v);p=await F(k)}p!=null&&(await W.run("UPDATE energy SET avg30 = ? WHERE cardId = ?",[p,v]),h++),o++;let m=Math.round(o/g*100),w=document.getElementById("preiseAktualisierenProgress");w&&(w.textContent=m+"%")}let d=document.getElementById("preiseAktualisierenProgress");d&&(d.textContent=""),alert(`${h} Preise wurden aktualisiert!`),_()}window.aktualisiereAllePreise=ve;function Le(){let c=document.getElementById("search").value.toUpperCase(),h=document.getElementById("kartentabelle").getElementsByTagName("tr");for(let o=1;o<h.length;o++){h[o].style.display="none";let g=h[o].getElementsByTagName("td");for(let d=0;d<g.length;d++){let b=g[d];if(b&&b.innerHTML.toUpperCase().indexOf(c)>-1){h[o].style.display="";break}}}A(),R(),_()}window.searchTable=Le;let I={reverse:"neutral",holo:"neutral",v:"neutral",vmax:"neutral",ex:"neutral",shiny:"neutral"};function H(){document.querySelectorAll("#kartentabelle tbody tr").forEach(c=>{let h=c.querySelector("div[id^='kartenContainer_']").querySelectorAll("img"),o=!1,g=!1,d=!1,b=!1,v=!1,p=!1;h.forEach(w=>{var q,D,N,Z,ye,Ne,We,Ge,ze,Ue,Ve;let k=w.alt,S=(q=window.cachedCards)==null?void 0:q[k];S&&(S.reverse==1&&(o=!0),S.holo==1&&(g=!0),((D=S.subTypes)!=null&&D.toLowerCase().includes("v")||(N=S.cardName)!=null&&N.toLowerCase().includes(" v"))&&(d=!0),((Z=S.subTypes)!=null&&Z.toLowerCase().includes("vmax")||(ye=S.cardName)!=null&&ye.toLowerCase().includes(" vmax")||(Ne=S.subTypes)!=null&&Ne.toLowerCase().includes("vstar")||(We=S.cardName)!=null&&We.toLowerCase().includes(" vstar"))&&(b=!0),((Ge=S.subTypes)!=null&&Ge.toLowerCase().includes("ex")||(ze=S.cardName)!=null&&ze.toLowerCase().includes(" ex"))&&(v=!0),((Ue=S.subTypes)!=null&&Ue.toLowerCase().includes("radiant")||(Ve=S.rarity)!=null&&Ve.toLowerCase().includes("shiny"))&&(p=!0))});let m=!0;I.reverse==="positive"&&!o&&(m=!1),I.reverse==="negative"&&o&&(m=!1),I.holo==="positive"&&!g&&(m=!1),I.holo==="negative"&&g&&(m=!1),I.v==="positive"&&!d&&(m=!1),I.v==="negative"&&d&&(m=!1),I.vmax==="positive"&&!b&&(m=!1),I.vmax==="negative"&&b&&(m=!1),I.ex==="positive"&&!v&&(m=!1),I.ex==="negative"&&v&&(m=!1),I.shiny==="positive"&&!p&&(m=!1),I.shiny==="negative"&&p&&(m=!1),c.style.display=m?"":"none"}),A(),R(),_()}function O(l){I[l]==="neutral"?I[l]="positive":I[l]==="positive"?I[l]="negative":I[l]="neutral",H(),X()}function X(){let l=["reverse","holo","v","vmax","ex","shiny"];for(let c of l){let u=document.getElementById(`filter-${c}`);u&&(u.classList.remove("active-positive","active-negative"),I[c]==="positive"?u.classList.add("active-positive"):I[c]==="negative"&&u.classList.add("active-negative"))}}document.getElementById("filter-alle").addEventListener("click",l=>{l.preventDefault(),I.reverse="neutral",I.holo="neutral",I.v="neutral",I.vmax="neutral",I.ex="neutral",I.shiny="neutral",H(),X()}),document.getElementById("filter-reverse").addEventListener("click",l=>{l.preventDefault(),O("reverse")}),document.getElementById("filter-holo").addEventListener("click",l=>{l.preventDefault(),O("holo")}),document.getElementById("filter-v").addEventListener("click",l=>{l.preventDefault(),O("v")}),document.getElementById("filter-vmax").addEventListener("click",l=>{l.preventDefault(),O("vmax")}),document.getElementById("filter-ex").addEventListener("click",l=>{l.preventDefault(),O("ex")}),document.getElementById("filter-shiny").addEventListener("click",l=>{l.preventDefault(),O("shiny")});function L(){let l=document.getElementById("overlay");l.classList.add("fade-out"),setTimeout(()=>{l.classList.remove("shown","fade-out"),l.classList.add("hidden"),l.innerHTML=""},300)}window.zeigePokemonTabelle=function(){document.querySelectorAll("#tableToggle button").forEach(l=>l.classList.remove("active")),document.getElementById("showTablePokemon").classList.add("active"),document.getElementById("pokemonFilterContainer").style.display="block",document.getElementById("kartentabelle").classList.remove("hidden"),document.getElementById("trainertabelle").classList.add("hidden"),document.getElementById("energietabelle").classList.add("hidden")},window.zeigeTrainerTabelle=async function(){document.querySelectorAll("#tableToggle button").forEach(g=>g.classList.remove("active")),document.getElementById("showTableTrainer").classList.add("active"),document.getElementById("pokemonFilterContainer").style.display="none",document.getElementById("kartentabelle").classList.add("hidden"),document.getElementById("trainertabelle").classList.remove("hidden"),document.getElementById("energietabelle").classList.add("hidden");let l=document.querySelector("#trainertabelle tbody");l.innerHTML="";let c=document.createElement("tr");c.innerHTML=`
        <td>Unter-<br>st\xFCtzer</td>
        <td>
          <div id="supporterContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Supporter')">+ Unterst\xFCtzer</button>
        </td>
      `,l.appendChild(c);let u=document.createElement("tr");u.innerHTML=`
        <td>Item</td>
        <td>
          <div id="itemContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Item')">+ Item</button>
        </td>
      `,l.appendChild(u);let h=document.createElement("tr");h.innerHTML=`
        <td>Stadion</td>
        <td>
          <div id="stadiumContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Stadium')">+ Stadion</button>
        </td>
      `,l.appendChild(h);let o=document.createElement("tr");o.innerHTML=`
        <td>Ausr\xFCs-<br>tung</td>
        <td>
          <div id="toolContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Tool')">+ Ausr\xFCstung</button>
        </td>
      `,l.appendChild(o),await Q()};async function Q(){let l=document.getElementById("supporterContainer"),c=document.getElementById("itemContainer"),u=document.getElementById("stadiumContainer"),h=document.getElementById("toolContainer"),o=await P();if(!o||!Array.isArray(o)){console.error("getTrainers() lieferte keine g\xFCltige Liste:",o);return}o.sort((p,m)=>(m.avg30||0)-(p.avg30||0));let g=document.createDocumentFragment(),d=document.createDocumentFragment(),b=document.createDocumentFragment(),v=document.createDocumentFragment();for(let p of o){window.cachedCards[p.cardId]=p;let m=document.createElement("img");m.src=p.imageLow,m.alt=p.cardId,m.style.width="50px",m.style.height="69px",m.style.objectFit="cover";let w="";if(Array.isArray(p.subTypes))p.subTypes.some(k=>k.toLowerCase().includes("supporter"))?w="supporter":p.subTypes.some(k=>k.toLowerCase().includes("item"))?w="item":p.subTypes.some(k=>k.toLowerCase().includes("stadium"))?w="stadium":p.subTypes.some(k=>k.toLowerCase().includes("tool"))&&(w="tool");else if(typeof p.subTypes=="string"){let k=p.subTypes.toLowerCase();k.includes("supporter")?w="supporter":k.includes("item")?w="item":k.includes("stadium")?w="stadium":k.includes("tool")&&(w="tool")}m.addEventListener("click",()=>ue(p.id,w)),w=="supporter"&&g.appendChild(m),w=="item"&&d.appendChild(m),w=="stadium"&&b.appendChild(m),w=="tool"&&v.appendChild(m)}l.appendChild(g),c.appendChild(d),u.appendChild(b),h.appendChild(v)}window.openTrainerOverlay=async function(l){let c=document.querySelector("#overlay");c.innerHTML=`
        <div id="overlayContent">
          <h2>Bitte warten...</h2>
          <p>Karten werden geladen</p>
          <div class="loader"></div>
        </div>
      `,c.classList.remove("hidden"),c.classList.add("shown");try{let u=window.cachedTrainerCardsByType[l];if(u||(u=await z(l),u&&(window.cachedTrainerCardsByType[l]=u)),!u||u.length===0){c.innerHTML=`
            <div id='overlayContent'>
              <h2>Keine Karten gefunden.</h2> 
              <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
            </div>
          `,document.getElementById("BackBtn").addEventListener("click",()=>{e.preventDefault(),L()});return}let h=`
          <div id="overlayContent">
            <button class="closeGallery" id="BackBtn">X</button>
            <h2>Kartenauswahl f\xFCr<br><strong>${l}</strong>:</h2>
            <p>
              Welche Karte m\xF6chtest du hinzuf\xFCgen?<br>
              <input type="text" id="nummerSuche" placeholder="Kartennummer eingeben\u2026" onkeyup="filterTrainerCardsByNumber()">
            </p>
            <div class="kartenGrid">
        `;for(let o of u){let g=o.avg30,d="\u2013";if(g!=null){let v=g.toFixed(2),p="#DEDEDE",m="\u{1FA99}";g>20?(p="#FF4444",m="\u{1F525}"):g>5&&(p="#FFAA00",m="\u{1F4B0}"),d=`<span style="color:${p}; font-size:14px;">${m} ${v}\u20AC</span>`}let b=o.id.split("-")[1];h+=`
            <div class="kartenItem" data-id="${o.id}" data-number="${b}" onclick="trainerKarteAusw\xE4hlen('${o.id}')">
              <div>ID: ${o.id}</div>
              <img src="${o.images.small}" alt="${o.name}">
              <div>${d}</div>
            </div>
          `}h+=`
            </div>
          </div>
        `,c.innerHTML=h,document.getElementById("BackBtn").addEventListener("click",()=>{L()})}catch(u){console.error(u),c.innerHTML=`
          <div id='overlayContent'>
            <h2>Fehler beim Laden.</h2>
            <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
          </div>`,document.getElementById("BackBtn").addEventListener("click",()=>{L()})}};async function z(l){var g,d,b,v;let c=[],u=1,h=250,o=!0;for(;o;){let p=`https://api.pokemontcg.io/v2/cards?q=supertype:Trainer subtypes:${l}&orderBy=name&page=${u}&pageSize=${h}`,m=await te.get({url:p,headers:{Accept:"application/json","X-Api-Key":oe.API_KEY,Connection:"close"}});if(m.status!==200||!((d=(g=m.data)==null?void 0:g.data)!=null&&d.length)){o=!1;break}let w=m.data.data;for(let k of w){let S=(b=k.cardmarket)==null?void 0:b.prices;k.avg30=(v=S==null?void 0:S.avg30)!=null?v:null}c=c.concat(w),w.length<h?o=!1:u++}return c}window.trainerKarteAusw\u00E4hlen=async function(l){var u,h;let c=document.querySelector("#overlay");c.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',c.classList.remove("hidden"),c.classList.add("shown");try{let o=await te.get({url:`https://api.pokemontcg.io/v2/cards/${l}`,headers:{Accept:"application/json","X-Api-Key":oe.API_KEY,Connection:"close"}});if(o.status!==200){console.error("Fehler beim Abrufen der Karte:",o.status,o);return}let g=o.data.data;g.imageSmall=((u=g.images)==null?void 0:u.small)||null,g.imageLarge=((h=g.images)==null?void 0:h.large)||null;let d=await x(g);if(!d){console.error("Keine ID von insertCard erhalten \u2013 Abbruch.");return}g.id=d,window.cachedCards[g.cardId]=g,c.innerHTML=`
          <div id="overlayContent">
            <h2>Karte hinzugef\xFCgt!</h2>
            <p>Du hast <strong>${l}</strong> ausgew\xE4hlt.</p>
            <br>
            <p>Welche Variante m\xF6chtest du speichern?</p>
            <button class="overlayMenuBtn" id="btnBasic">Basic</button>
            <button class="overlayMenuBtn" id="btnReverse">Reverse</button>
            <button class="overlayMenuBtn" id="btnHolo">Holo</button>
            <br><br>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">\xDCberspringen</button>
          </div>
        `;async function b(v,p){c.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',c.classList.remove("hidden"),c.classList.add("shown");try{v!=="none"&&await W.run(`UPDATE trainer SET ${v} = 1 WHERE id = ?`,[p]);let m=document.getElementById("supporterContainer");m.innerHTML="";let w=document.getElementById("itemContainer");w.innerHTML="";let k=document.getElementById("stadiumContainer");k.innerHTML="";let S=document.getElementById("toolContainer");S.innerHTML="",await Q()}catch(m){console.error("Fehler in finalizeTrainerSelection:",m.message,m)}L(),await _()}document.getElementById("btnBasic").addEventListener("click",()=>b("basic",d)),document.getElementById("btnReverse").addEventListener("click",()=>b("reverse",d)),document.getElementById("btnHolo").addEventListener("click",()=>b("holo",d)),document.getElementById("closeOverlayConfirm").addEventListener("click",()=>b("none",d))}catch(o){console.error("Fehler bei trainerKarteAusw\xE4hlen:",o),c.innerHTML=`
          <div id="overlayContent">
            <h2>Fehler beim Hinzuf\xFCgen.</h2>
            <p>${o.message}</p>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">Schlie\xDFen</button>
          </div>
        `,document.getElementById("closeOverlayConfirm").addEventListener("click",()=>{L()})}};async function ue(l,c){var v;let u=document.querySelector("#overlay");u.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',u.classList.remove("hidden"),u.classList.add("shown");let h=await V();if(!h||!h.length)return;let o=[],g={};for(let p of h){let m=await G(p);if(!m)continue;let w=((v=m.subTypes)==null?void 0:v.toLowerCase())||"";(c==="supporter"&&w.includes("supporter")||c==="item"&&w.includes("item")||c==="stadium"&&w.includes("stadium")||c==="tool"&&w.includes("tool"))&&(o.push(p),g[p]=m)}if(!o.length){L();return}let d=o.findIndex(p=>p===l);d===-1&&(d=0);async function b(){let p=o[d],m=g[p]||await G(p);if(!m)return;let w="Unbekannt";m.addedAt&&(w=new Date(m.addedAt).toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}));let k="Keine Angabe";m.basic==1&&(k="Basic"),m.reverse==1&&(k="Reverse"),m.holo==1&&(k="Holo");let S="\u2013",q=await F(m.cardId);if(q==null){let D=j(m.cardId);q=await F(D)}if(q!=null){let D=q.toFixed(2),N="#DEDEDE",Z="\u{1FA99}";q>20?(N="#FF4444",Z="\u{1F525}"):q>5&&(N="#FFAA00",Z="\u{1F4B0}"),S=`<span style="color:${N};">${Z} ${D}\u20AC</span>`}u.innerHTML=`
          <div id="overlayContent">
            <button class="closeGallery" id="closeGallery">X</button>
            <h2>Trainer-Karte ansehen</h2>
            <div style="display:flex; align-items:center; justify-content:center;">
              <div style="display:flex; flex-direction:column; align-items:center;">
                <img src="${m.imageHigh}" alt="${p}" style="max-width:300px; max-height:400px; margin:0 20px;">
                <p style="margin-top:10px;">
                  ID: ${m.cardId} | Variante: <strong>${k}</strong><br>
                  30d-Wert: <strong>${S}</strong><br>
                  Hinzugef\xFCgt am: <strong>${w}</strong>
                </p>
              </div>
            </div>
            <button id="prevTrainer">\u2B05\uFE0F</button>
            <button id="nextTrainer">\u27A1\uFE0F</button>
            <br><br>
            <button id="deleteTrainer">\u274C Karte l\xF6schen</button>
          </div>
        `,document.getElementById("prevTrainer").addEventListener("click",()=>{d=(d-1+o.length)%o.length,b()}),document.getElementById("nextTrainer").addEventListener("click",()=>{d=(d+1)%o.length,b()}),document.getElementById("deleteTrainer").addEventListener("click",async()=>{if(confirm("Willst du diese Karte wirklich l\xF6schen?")){await W.run("DELETE FROM trainer WHERE id = ?",[p]),L();let D=document.getElementById("supporterContainer"),N=document.getElementById("itemContainer"),Z=document.getElementById("stadiumContainer"),ye=document.getElementById("toolContainer");D&&(D.innerHTML=""),N&&(N.innerHTML=""),Z&&(Z.innerHTML=""),ye&&(ye.innerHTML=""),await Q(),await _()}}),document.getElementById("closeGallery").addEventListener("click",()=>{L()})}b()}window.filterTrainerCardsByNumber=function(){let l=document.getElementById("nummerSuche").value.trim();document.querySelectorAll(".kartenItem").forEach(c=>{let u=c.dataset.number;c.style.display=u&&u.startsWith(l)?"block":"none"})},window.zeigeEnergieTabelle=async function(){document.querySelectorAll("#tableToggle button").forEach(h=>h.classList.remove("active")),document.getElementById("showTableEnergie").classList.add("active"),document.getElementById("pokemonFilterContainer").style.display="none",document.getElementById("kartentabelle").classList.add("hidden"),document.getElementById("trainertabelle").classList.add("hidden"),document.getElementById("energietabelle").classList.remove("hidden");let l=document.querySelector("#energietabelle tbody");l.innerHTML="";let c=document.createElement("tr");c.innerHTML=`
        <td>Basis-Energie</td>
        <td>
          <div id="basisEnergieContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openEnergieOverlay('Basic')">+ Basis</button>
        </td>
      `,l.appendChild(c);let u=document.createElement("tr");u.innerHTML=`
        <td>Spezial-Energie</td>
        <td>
          <div id="spezialEnergieContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openEnergieOverlay('Special')">+ Spezial</button>
        </td>
      `,l.appendChild(u),await ie()};async function ie(){var g,d,b;let l=document.getElementById("basisEnergieContainer"),c=document.getElementById("spezialEnergieContainer"),u=await Y();if(!u||!Array.isArray(u)){console.error("getEnergies() lieferte keine g\xFCltige Liste:",u);return}u.sort((v,p)=>(p.avg30||0)-(v.avg30||0));let h=document.createDocumentFragment(),o=document.createDocumentFragment();for(let v of u){window.cachedCards[v.cardId]=v;let p=document.createElement("img");p.src=v.imageLow,p.alt=v.cardId,p.style.width="50px",p.style.height="69px",p.style.objectFit="cover";let m=((g=v.subTypes)==null?void 0:g.toLowerCase())||"";p.addEventListener("click",()=>bt(v.id,m.includes("basic")?"basic":"special")),(d=v.subTypes)!=null&&d.toLowerCase().includes("basic")?h.appendChild(p):(b=v.subTypes)!=null&&b.toLowerCase().includes("special")&&o.appendChild(p)}l.appendChild(h),c.appendChild(o)}window.openEnergieOverlay=async function(l){let c=document.querySelector("#overlay");c.innerHTML=`
        <div id="overlayContent">
          <h2>Bitte warten...</h2>
          <p>Karten werden geladen</p>
          <div class="loader"></div>
        </div>
      `,c.classList.remove("hidden"),c.classList.add("shown");try{let u=window.cachedEnergyCardsByType[l];if(u||(u=await ft(l),u&&(window.cachedEnergyCardsByType[l]=u)),!u||u.length===0){c.innerHTML=`
            <div id='overlayContent'>
              <h2>Keine Karten gefunden.</h2> 
              <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
            </div>
          `,document.getElementById("BackBtn").addEventListener("click",()=>{L()});return}let h=`
          <div id="overlayContent">
            <button class="closeGallery" id="BackBtn">X</button>
            <h2>Kartenauswahl f\xFCr<br><strong>${l}</strong>:</h2>
            <p>
              Welche Karte m\xF6chtest du hinzuf\xFCgen?<br>
              <input type="text" id="nummerSuche" placeholder="Kartennummer eingeben\u2026" onkeyup="filterEnergieCardsByNumber()">
            </p>
            <div class="kartenGrid">
        `;for(let o of u){let g=o.avg30,d="\u2013";if(g!=null){let v=g.toFixed(2),p="#DEDEDE",m="\u{1FA99}";g>20?(p="#FF4444",m="\u{1F525}"):g>5&&(p="#FFAA00",m="\u{1F4B0}"),d=`<span style="color:${p}; font-size:14px;">${m} ${v}\u20AC</span>`}let b=o.id.split("-")[1];h+=`
            <div class="kartenItem" data-id="${o.id}" data-number="${b}" onclick="energieKarteAusw\xE4hlen('${o.id}')">
              <div>ID: ${o.id}</div>
              <img src="${o.images.small}" alt="${o.name}">
              <div>${d}</div>
            </div>
          `}h+=`
            </div>
          </div>
        `,c.innerHTML=h,document.getElementById("BackBtn").addEventListener("click",()=>{L()})}catch(u){console.error(u),c.innerHTML=`
          <div id='overlayContent'>
            <h2>Fehler beim Laden.</h2>
            <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
          </div>`,document.getElementById("BackBtn").addEventListener("click",()=>{L()})}};async function ft(l){var g,d,b,v;let c=[],u=1,h=250,o=!0;for(;o;){let p=`https://api.pokemontcg.io/v2/cards?q=supertype:Energy subtypes:${l}&orderBy=name&page=${u}&pageSize=${h}`,m=await te.get({url:p,headers:{Accept:"application/json","X-Api-Key":oe.API_KEY,Connection:"close"}});if(m.status!==200||!((d=(g=m.data)==null?void 0:g.data)!=null&&d.length)){o=!1;break}let w=m.data.data;for(let k of w){let S=(b=k.cardmarket)==null?void 0:b.prices;k.avg30=(v=S==null?void 0:S.avg30)!=null?v:null}c=c.concat(w),w.length<h?o=!1:u++}return c}window.energieKarteAusw\u00E4hlen=async function(l){var u,h;let c=document.querySelector("#overlay");c.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',c.classList.remove("hidden"),c.classList.add("shown");try{let o=await te.get({url:`https://api.pokemontcg.io/v2/cards/${l}`,headers:{Accept:"application/json","X-Api-Key":oe.API_KEY,Connection:"close"}});if(o.status!==200){console.error("Fehler beim Abrufen der Karte:",o.status,o);return}let g=o.data.data;g.imageSmall=((u=g.images)==null?void 0:u.small)||null,g.imageLarge=((h=g.images)==null?void 0:h.large)||null;let d=await J(g);if(!d){console.error("Keine ID von insertCard erhalten \u2013 Abbruch.");return}g.id=d,window.cachedCards[g.cardId]=g,c.innerHTML=`
          <div id="overlayContent">
            <h2>Karte hinzugef\xFCgt!</h2>
            <p>Du hast <strong>${l}</strong> ausgew\xE4hlt.</p>
            <br>
            <p>Welche Variante m\xF6chtest du speichern?</p>
            <button class="overlayMenuBtn" id="btnBasic">Basic</button>
            <button class="overlayMenuBtn" id="btnReverse">Reverse</button>
            <button class="overlayMenuBtn" id="btnHolo">Holo</button>
            <br><br>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">\xDCberspringen</button>
          </div>
        `;async function b(v,p){c.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',c.classList.remove("hidden"),c.classList.add("shown");try{v!=="none"&&await W.run(`UPDATE energy SET ${v} = 1 WHERE id = ?`,[p]);let m=document.getElementById("basisEnergieContainer");m.innerHTML="";let w=document.getElementById("spezialEnergieContainer");w.innerHTML="",await ie()}catch(m){console.error("Fehler in finalizeEnergieSelection:",m.message,m)}L(),await _()}document.getElementById("btnBasic").addEventListener("click",()=>b("basic",d)),document.getElementById("btnReverse").addEventListener("click",()=>b("reverse",d)),document.getElementById("btnHolo").addEventListener("click",()=>b("holo",d)),document.getElementById("closeOverlayConfirm").addEventListener("click",()=>b("none",d))}catch(o){console.error("Fehler bei energieKarteAusw\xE4hlen:",o),c.innerHTML=`
          <div id="overlayContent">
            <h2>Fehler beim Hinzuf\xFCgen.</h2>
            <p>${o.message}</p>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">Schlie\xDFen</button>
          </div>
        `,document.getElementById("closeOverlayConfirm").addEventListener("click",()=>{L()})}};async function bt(l,c){var v;let u=document.querySelector("#overlay");u.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',u.classList.remove("hidden"),u.classList.add("shown");let h=await ce();if(!h||!h.length)return;let o=[],g={};for(let p of h){let m=await de(p);if(!m)continue;let w=((v=m.subTypes)==null?void 0:v.toLowerCase())||"";(c==="basic"&&w.includes("basic")||c==="special"&&w.includes("special"))&&(o.push(p),g[p]=m)}if(!o.length){L();return}let d=o.findIndex(p=>p===l);d===-1&&(d=0);async function b(){let p=o[d],m=g[p]||await de(p);if(!m)return;let w="Unbekannt";m.addedAt&&(w=new Date(m.addedAt).toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}));let k="Keine Angabe";m.basic==1&&(k="Basic"),m.reverse==1&&(k="Reverse"),m.holo==1&&(k="Holo");let S="\u2013",q=await F(m.cardId);if(q==null){let D=j(m.cardId);q=await F(D)}if(q!=null){let D=q.toFixed(2),N="#DEDEDE",Z="\u{1FA99}";q>20?(N="#FF4444",Z="\u{1F525}"):q>5&&(N="#FFAA00",Z="\u{1F4B0}"),S=`<span style="color:${N};">${Z} ${D}\u20AC</span>`}u.innerHTML=`
          <div id="overlayContent">
            <button class="closeGallery" id="closeGallery">X</button>
            <h2>Energie-Karte ansehen</h2>
            <div style="display:flex; align-items:center; justify-content:center;">
              <div style="display:flex; flex-direction:column; align-items:center;">
                <img src="${m.imageHigh}" alt="${p}" style="max-width:300px; max-height:400px; margin:0 20px;">
                <p style="margin-top:10px;">
                  ID: ${m.cardId} | Variante: <strong>${k}</strong><br>
                  30d-Wert: <strong>${S}</strong><br>
                  Hinzugef\xFCgt am: <strong>${w}</strong>
                </p>
              </div>
            </div>
            <button id="prevEnergie">\u2B05\uFE0F</button>
            <button id="nextEnergie">\u27A1\uFE0F</button>
            <br><br>
            <button id="deleteEnergie">\u274C Karte l\xF6schen</button>
          </div>
        `,document.getElementById("prevEnergie").addEventListener("click",()=>{d=(d-1+o.length)%o.length,b()}),document.getElementById("nextEnergie").addEventListener("click",()=>{d=(d+1)%o.length,b()}),document.getElementById("deleteEnergie").addEventListener("click",async()=>{if(confirm("Willst du diese Karte wirklich l\xF6schen?"))try{await W.run("DELETE FROM energy WHERE id = ?",[p]),L();let D=document.getElementById("basisEnergieContainer"),N=document.getElementById("spezialEnergieContainer");D&&(D.innerHTML=""),N&&(N.innerHTML=""),await ie(),await _()}catch(D){console.error("Fehler beim L\xF6schen der Energie-Karte:",D),alert("Beim L\xF6schen ist ein Fehler aufgetreten.")}}),document.getElementById("closeGallery").addEventListener("click",()=>{L()})}b()}window.filterEnergieCardsByNumber=function(){let l=document.getElementById("nummerSuche").value.trim();document.querySelectorAll(".kartenItem").forEach(c=>{let u=c.dataset.number;c.style.display=u&&u.startsWith(l)?"block":"none"})}})()});})();
/*! Bundled license information:

@capacitor/core/dist/index.js:
  (*! Capacitor: https://capacitorjs.com/ - MIT License *)

@capacitor/core/dist/index.js:
  (*! Capacitor: https://capacitorjs.com/ - MIT License *)
*/
