(()=>{var ft=Object.defineProperty;var Y=(r,e)=>()=>(r&&(e=r(r=0)),e);var bt=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),Ce=(r,e)=>{for(var t in e)ft(r,t,{get:e[t],enumerable:!0})};var vt,wt,Ve,rr,nr,ue,ye,Et,kt,St,ve,Je,ar,we,Pe=Y(()=>{vt=r=>{let e=new Map;e.set("web",{name:"web"});let t=r.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:e},n=(l,p)=>{t.platforms.set(l,p)},i=l=>{t.platforms.has(l)&&(t.currentPlatform=t.platforms.get(l))};return t.addPlatform=n,t.setPlatform=i,t},wt=r=>r.CapacitorPlatforms=vt(r),Ve=wt(typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{}),rr=Ve.addPlatform,nr=Ve.setPlatform;(function(r){r.Unimplemented="UNIMPLEMENTED",r.Unavailable="UNAVAILABLE"})(ue||(ue={}));ye=class extends Error{constructor(e,t){super(e),this.message=e,this.code=t}},Et=r=>{var e,t;return r!=null&&r.androidBridge?"android":!((t=(e=r==null?void 0:r.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},kt=r=>{var e,t,n,i,l;let p=r.CapacitorCustomPlatform||null,y=r.Capacitor||{},k=y.Plugins=y.Plugins||{},L=r.CapacitorPlatforms,W=()=>p!==null?p.name:Et(r),T=((e=L==null?void 0:L.currentPlatform)===null||e===void 0?void 0:e.getPlatform)||W,C=()=>T()!=="web",G=((t=L==null?void 0:L.currentPlatform)===null||t===void 0?void 0:t.isNativePlatform)||C,N=x=>{let w=re.get(x);return!!(w!=null&&w.platforms.has(T())||le(x))},Q=((n=L==null?void 0:L.currentPlatform)===null||n===void 0?void 0:n.isPluginAvailable)||N,z=x=>{var w;return(w=y.PluginHeaders)===null||w===void 0?void 0:w.find(I=>I.name===x)},le=((i=L==null?void 0:L.currentPlatform)===null||i===void 0?void 0:i.getPluginHeader)||z,ce=x=>r.console.error(x),te=(x,w,I)=>Promise.reject(`${I} does not have an implementation of "${w}".`),re=new Map,oe=(x,w={})=>{let I=re.get(x);if(I)return console.warn(`Capacitor plugin "${x}" already registered. Cannot register plugins twice.`),I.proxy;let A=T(),K=le(x),D,H=async()=>(!D&&A in w?D=typeof w[A]=="function"?D=await w[A]():D=w[A]:p!==null&&!D&&"web"in w&&(D=typeof w.web=="function"?D=await w.web():D=w.web),D),ne=(O,F)=>{var V,X;if(K){let Z=K==null?void 0:K.methods.find(J=>F===J.name);if(Z)return Z.rtype==="promise"?J=>y.nativePromise(x,F.toString(),J):(J,ae)=>y.nativeCallback(x,F.toString(),J,ae);if(O)return(V=O[F])===null||V===void 0?void 0:V.bind(O)}else{if(O)return(X=O[F])===null||X===void 0?void 0:X.bind(O);throw new ye(`"${x}" plugin is not implemented on ${A}`,ue.Unimplemented)}},q=O=>{let F,V=(...X)=>{let Z=H().then(J=>{let ae=ne(J,O);if(ae){let de=ae(...X);return F=de==null?void 0:de.remove,de}else throw new ye(`"${x}.${O}()" is not implemented on ${A}`,ue.Unimplemented)});return O==="addListener"&&(Z.remove=async()=>F()),Z};return V.toString=()=>`${O.toString()}() { [capacitor code] }`,Object.defineProperty(V,"name",{value:O,writable:!1,configurable:!1}),V},U=q("addListener"),be=q("removeListener"),Te=(O,F)=>{let V=U({eventName:O},F),X=async()=>{let J=await V;be({eventName:O,callbackId:J},F)},Z=new Promise(J=>V.then(()=>J({remove:X})));return Z.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await X()},Z},P=new Proxy({},{get(O,F){switch(F){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return K?Te:U;case"removeListener":return be;default:return q(F)}}});return k[x]=P,re.set(x,{name:x,proxy:P,platforms:new Set([...Object.keys(w),...K?[A]:[]])}),P},ge=((l=L==null?void 0:L.currentPlatform)===null||l===void 0?void 0:l.registerPlugin)||oe;return y.convertFileSrc||(y.convertFileSrc=x=>x),y.getPlatform=T,y.handleError=ce,y.isNativePlatform=G,y.isPluginAvailable=Q,y.pluginMethodNoop=te,y.registerPlugin=ge,y.Exception=ye,y.DEBUG=!!y.DEBUG,y.isLoggingEnabled=!!y.isLoggingEnabled,y.platform=y.getPlatform(),y.isNative=y.isNativePlatform(),y},St=r=>r.Capacitor=kt(r),ve=St(typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{}),Je=ve.registerPlugin,ar=ve.Plugins,we=class{constructor(e){this.listeners={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t);let i=this.windowListeners[e];i&&!i.registered&&this.addWindowListener(i);let l=async()=>this.removeListener(e,t),p=Promise.resolve({remove:l});return Object.defineProperty(p,"remove",{value:async()=>{console.warn("Using addListener() without 'await' is deprecated."),await l()}}),p}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t){let n=this.listeners[e];n&&n.forEach(i=>i(t))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:n=>{this.notifyListeners(t,n)}}}unimplemented(e="not implemented"){return new ve.Exception(e,ue.Unimplemented)}unavailable(e="not available"){return new ve.Exception(e,ue.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let i=n.indexOf(t);this.listeners[e].splice(i,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}}});var _e,xe,Ie,Be=Y(()=>{_e=async r=>new Promise((e,t)=>{let n=new FileReader;n.onload=()=>{let i=n.result,l=i.substr(i.indexOf(",")+1);e(l)},n.onerror=i=>t(i),n.readAsDataURL(r)}),xe=r=>encodeURIComponent(r).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ie=r=>r.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)});var Xe,Ee,Ze,Qe,Ae,Ye=Y(()=>{Be();Xe=(r,e,t={})=>{let n=xe(r),i=xe(e),l=`; expires=${(t.expires||"").replace("expires=","")}`,p=(t.path||"/").replace("path=","");document.cookie=`${n}=${i||""}${l}; path=${p}`},Ee=()=>{let r=[],e={};if(!document.cookie)return r;let t=document.cookie.split(";")||[];for(let i of t){let[l,p]=i.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");l=Ie(l).trim(),p=Ie(p).trim(),e[l]=p}let n=Object.entries(e);for(let[i,l]of n)r.push({key:i,value:l});return r},Ze=r=>{let e=Ee();for(let t of e)if(t.key===r)return t;return{key:r,value:""}},Qe=r=>{document.cookie=`${r}=; Max-Age=0`},Ae=()=>{let r=document.cookie.split(";")||[];for(let e of r)document.cookie=e.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}});var Tt,Ct,Me,se,et,tt,rt,nt,at,it=Y(()=>{Be();Tt=(r={})=>{let e=Object.keys(r);return Object.keys(r).map(i=>i.toLocaleLowerCase()).reduce((i,l,p)=>(i[l]=r[e[p]],i),{})},Ct=(r,e=!0)=>r?Object.entries(r).reduce((n,i)=>{let[l,p]=i,y,k;return Array.isArray(p)?(k="",p.forEach(L=>{y=e?encodeURIComponent(L):L,k+=`${l}=${y}&`}),k.slice(0,-1)):(y=e?encodeURIComponent(p):p,k=`${l}=${y}`),`${n}&${k}`},"").substr(1):null,Me=(r,e={})=>{let t=Object.assign({method:r.method||"GET",headers:r.headers},e),i=Tt(r.headers)["content-type"]||"";if(typeof r.data=="string")t.body=r.data;else if(i.includes("application/x-www-form-urlencoded")){let l=new URLSearchParams;for(let[p,y]of Object.entries(r.data||{}))l.set(p,y);t.body=l.toString()}else if(i.includes("multipart/form-data")){let l=new FormData;if(r.data instanceof FormData)r.data.forEach((y,k)=>{l.append(k,y)});else for(let y of Object.keys(r.data))l.append(y,r.data[y]);t.body=l;let p=new Headers(t.headers);p.delete("content-type"),t.headers=p}else(i.includes("application/json")||typeof r.data=="object")&&(t.body=JSON.stringify(r.data));return t},se=async r=>{let e=Me(r,r.webFetchExtra),t=Ct(r.params,r.shouldEncodeUrlParams),n=t?`${r.url}?${t}`:r.url,i=await fetch(n,e),l=i.headers.get("content-type")||"",{responseType:p="text"}=i.ok?r:{};l.includes("application/json")&&(p="json");let y;switch(p){case"arraybuffer":case"blob":let L=await i.blob();y=await _e(L);break;case"json":y=await i.json();break;case"document":case"text":default:y=await i.text()}let k={};return i.headers.forEach((L,W)=>{k[W]=L}),{data:y,headers:k,status:i.status,url:i.url}},et=async r=>se(Object.assign(Object.assign({},r),{method:"GET"})),tt=async r=>se(Object.assign(Object.assign({},r),{method:"POST"})),rt=async r=>se(Object.assign(Object.assign({},r),{method:"PUT"})),nt=async r=>se(Object.assign(Object.assign({},r),{method:"PATCH"})),at=async r=>se(Object.assign(Object.assign({},r),{method:"DELETE"}))});var qe={};Ce(qe,{HttpWeb:()=>Re});var Re,Fe=Y(()=>{Pe();Ye();it();Re=class extends we{constructor(){super(),this.request=async e=>se(e),this.get=async e=>et(e),this.post=async e=>tt(e),this.put=async e=>rt(e),this.patch=async e=>nt(e),this.del=async e=>at(e),this.getCookiesMap=async e=>{let t=Ee(),n={};for(let i of t)n[i.key]=i.value;return n},this.getCookies=async e=>{let{url:t}=e;return{cookies:Ee()}},this.setCookie=async e=>{let{key:t,value:n,expires:i="",path:l=""}=e;Xe(t,n,{expires:i,path:l})},this.getCookie=async e=>Ze(e.key),this.deleteCookie=async e=>Qe(e.key),this.clearCookies=async e=>Ae(),this.clearAllCookies=async()=>Ae(),this.uploadFile=async e=>{let t=new FormData;t.append(e.name,e.blob||"undefined");let n=Object.assign(Object.assign({},e),{body:t,method:"POST"});return this.post(n)},this.downloadFile=async e=>{let t=Me(e,e.webFetchExtra),n=await fetch(e.url,t),i;if(!(e!=null&&e.progress))i=await n.blob();else if(!(n!=null&&n.body))i=new Blob;else{let l=n.body.getReader(),p=0,y=[],k=n.headers.get("content-type"),L=parseInt(n.headers.get("content-length")||"0",10);for(;;){let{done:C,value:G}=await l.read();if(C)break;y.push(G),p+=(G==null?void 0:G.length)||0;let N={type:"DOWNLOAD",url:e.url,bytes:p,contentLength:L};this.notifyListeners("progress",N)}let W=new Uint8Array(p),T=0;for(let C of y)typeof C!="undefined"&&(W.set(C,T),T+=C.length);i=new Blob([W.buffer],{type:k||void 0})}return{blob:i}}}}});var ot=bt((hr,xt)=>{xt.exports={API_KEY:"a5d75d50-65e6-41a4-aa2f-9b2c93afaaa7"}});var me,fe,It,Bt,At,De,ke,he,st,lt,He,gr,Mt,Rt,qt,Ft,Ke,pr,Oe=Y(()=>{(function(r){r.Unimplemented="UNIMPLEMENTED",r.Unavailable="UNAVAILABLE"})(me||(me={}));fe=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},It=r=>{var e,t;return r!=null&&r.androidBridge?"android":!((t=(e=r==null?void 0:r.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},Bt=r=>{let e=r.CapacitorCustomPlatform||null,t=r.Capacitor||{},n=t.Plugins=t.Plugins||{},i=()=>e!==null?e.name:It(r),l=()=>i()!=="web",p=T=>{let C=L.get(T);return!!(C!=null&&C.platforms.has(i())||y(T))},y=T=>{var C;return(C=t.PluginHeaders)===null||C===void 0?void 0:C.find(G=>G.name===T)},k=T=>r.console.error(T),L=new Map,W=(T,C={})=>{let G=L.get(T);if(G)return console.warn(`Capacitor plugin "${T}" already registered. Cannot register plugins twice.`),G.proxy;let N=i(),Q=y(T),z,le=async()=>(!z&&N in C?z=typeof C[N]=="function"?z=await C[N]():z=C[N]:e!==null&&!z&&"web"in C&&(z=typeof C.web=="function"?z=await C.web():z=C.web),z),ce=(w,I)=>{var A,K;if(Q){let D=Q==null?void 0:Q.methods.find(H=>I===H.name);if(D)return D.rtype==="promise"?H=>t.nativePromise(T,I.toString(),H):(H,ne)=>t.nativeCallback(T,I.toString(),H,ne);if(w)return(A=w[I])===null||A===void 0?void 0:A.bind(w)}else{if(w)return(K=w[I])===null||K===void 0?void 0:K.bind(w);throw new fe(`"${T}" plugin is not implemented on ${N}`,me.Unimplemented)}},te=w=>{let I,A=(...K)=>{let D=le().then(H=>{let ne=ce(H,w);if(ne){let q=ne(...K);return I=q==null?void 0:q.remove,q}else throw new fe(`"${T}.${w}()" is not implemented on ${N}`,me.Unimplemented)});return w==="addListener"&&(D.remove=async()=>I()),D};return A.toString=()=>`${w.toString()}() { [capacitor code] }`,Object.defineProperty(A,"name",{value:w,writable:!1,configurable:!1}),A},re=te("addListener"),oe=te("removeListener"),ge=(w,I)=>{let A=re({eventName:w},I),K=async()=>{let H=await A;oe({eventName:w,callbackId:H},I)},D=new Promise(H=>A.then(()=>H({remove:K})));return D.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await K()},D},x=new Proxy({},{get(w,I){switch(I){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return Q?ge:re;case"removeListener":return oe;default:return te(I)}}});return n[T]=x,L.set(T,{name:T,proxy:x,platforms:new Set([...Object.keys(C),...Q?[N]:[]])}),x};return t.convertFileSrc||(t.convertFileSrc=T=>T),t.getPlatform=i,t.handleError=k,t.isNativePlatform=l,t.isPluginAvailable=p,t.registerPlugin=W,t.Exception=fe,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},At=r=>r.Capacitor=Bt(r),De=At(typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{}),ke=De.registerPlugin,he=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let l=this.windowListeners[e];l&&!l.registered&&this.addWindowListener(l),n&&this.sendRetainedArgumentsForEvent(e);let p=async()=>this.removeListener(e,t);return Promise.resolve({remove:p})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let i=this.listeners[e];if(!i){if(n){let l=this.retainedEventArguments[e];l||(l=[]),l.push(t),this.retainedEventArguments[e]=l}return}i.forEach(l=>l(t))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:n=>{this.notifyListeners(t,n)}}}unimplemented(e="not implemented"){return new De.Exception(e,me.Unimplemented)}unavailable(e="not available"){return new De.Exception(e,me.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let i=n.indexOf(t);this.listeners[e].splice(i,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(n=>{this.notifyListeners(e,n)}))}},st=r=>encodeURIComponent(r).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),lt=r=>r.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),He=class extends he{async getCookies(){let e=document.cookie,t={};return e.split(";").forEach(n=>{if(n.length<=0)return;let[i,l]=n.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");i=lt(i).trim(),l=lt(l).trim(),t[i]=l}),t}async setCookie(e){try{let t=st(e.key),n=st(e.value),i=`; expires=${(e.expires||"").replace("expires=","")}`,l=(e.path||"/").replace("path=",""),p=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${n||""}${i}; path=${l}; ${p};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{let e=document.cookie.split(";")||[];for(let t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}},gr=ke("CapacitorCookies",{web:()=>new He}),Mt=async r=>new Promise((e,t)=>{let n=new FileReader;n.onload=()=>{let i=n.result;e(i.indexOf(",")>=0?i.split(",")[1]:i)},n.onerror=i=>t(i),n.readAsDataURL(r)}),Rt=(r={})=>{let e=Object.keys(r);return Object.keys(r).map(i=>i.toLocaleLowerCase()).reduce((i,l,p)=>(i[l]=r[e[p]],i),{})},qt=(r,e=!0)=>r?Object.entries(r).reduce((n,i)=>{let[l,p]=i,y,k;return Array.isArray(p)?(k="",p.forEach(L=>{y=e?encodeURIComponent(L):L,k+=`${l}=${y}&`}),k.slice(0,-1)):(y=e?encodeURIComponent(p):p,k=`${l}=${y}`),`${n}&${k}`},"").substr(1):null,Ft=(r,e={})=>{let t=Object.assign({method:r.method||"GET",headers:r.headers},e),i=Rt(r.headers)["content-type"]||"";if(typeof r.data=="string")t.body=r.data;else if(i.includes("application/x-www-form-urlencoded")){let l=new URLSearchParams;for(let[p,y]of Object.entries(r.data||{}))l.set(p,y);t.body=l.toString()}else if(i.includes("multipart/form-data")||r.data instanceof FormData){let l=new FormData;if(r.data instanceof FormData)r.data.forEach((y,k)=>{l.append(k,y)});else for(let y of Object.keys(r.data))l.append(y,r.data[y]);t.body=l;let p=new Headers(t.headers);p.delete("content-type"),t.headers=p}else(i.includes("application/json")||typeof r.data=="object")&&(t.body=JSON.stringify(r.data));return t},Ke=class extends he{async request(e){let t=Ft(e,e.webFetchExtra),n=qt(e.params,e.shouldEncodeUrlParams),i=n?`${e.url}?${n}`:e.url,l=await fetch(i,t),p=l.headers.get("content-type")||"",{responseType:y="text"}=l.ok?e:{};p.includes("application/json")&&(y="json");let k,L;switch(y){case"arraybuffer":case"blob":L=await l.blob(),k=await Mt(L);break;case"json":k=await l.json();break;case"document":case"text":default:k=await l.text()}let W={};return l.headers.forEach((T,C)=>{W[C]=T}),{data:k,headers:W,status:l.status,url:l.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}},pr=ke("CapacitorHttp",{web:()=>new Ke})});var Se,Le,ct=Y(()=>{Se=class{constructor(e){this.sqlite=e,this._connectionDict=new Map}async initWebStore(){try{return await this.sqlite.initWebStore(),Promise.resolve()}catch(e){return Promise.reject(e)}}async saveToStore(e){try{return await this.sqlite.saveToStore({database:e}),Promise.resolve()}catch(t){return Promise.reject(t)}}async saveToLocalDisk(e){try{return await this.sqlite.saveToLocalDisk({database:e}),Promise.resolve()}catch(t){return Promise.reject(t)}}async getFromLocalDiskToStore(e){let t=e!=null?e:!0;try{return await this.sqlite.getFromLocalDiskToStore({overwrite:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async echo(e){try{let t=await this.sqlite.echo({value:e});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isSecretStored(){try{let e=await this.sqlite.isSecretStored();return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async setEncryptionSecret(e){try{return await this.sqlite.setEncryptionSecret({passphrase:e}),Promise.resolve()}catch(t){return Promise.reject(t)}}async changeEncryptionSecret(e,t){try{return await this.sqlite.changeEncryptionSecret({passphrase:e,oldpassphrase:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async clearEncryptionSecret(){try{return await this.sqlite.clearEncryptionSecret(),Promise.resolve()}catch(e){return Promise.reject(e)}}async checkEncryptionSecret(e){try{let t=await this.sqlite.checkEncryptionSecret({passphrase:e});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async addUpgradeStatement(e,t){try{return e.endsWith(".db")&&(e=e.slice(0,-3)),await this.sqlite.addUpgradeStatement({database:e,upgrade:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async createConnection(e,t,n,i,l){try{e.endsWith(".db")&&(e=e.slice(0,-3)),await this.sqlite.createConnection({database:e,encrypted:t,mode:n,version:i,readonly:l});let p=new Le(e,l,this.sqlite),y=l?`RO_${e}`:`RW_${e}`;return this._connectionDict.set(y,p),Promise.resolve(p)}catch(p){return Promise.reject(p)}}async closeConnection(e,t){try{e.endsWith(".db")&&(e=e.slice(0,-3)),await this.sqlite.closeConnection({database:e,readonly:t});let n=t?`RO_${e}`:`RW_${e}`;return this._connectionDict.delete(n),Promise.resolve()}catch(n){return Promise.reject(n)}}async isConnection(e,t){let n={};e.endsWith(".db")&&(e=e.slice(0,-3));let i=t?`RO_${e}`:`RW_${e}`;return n.result=this._connectionDict.has(i),Promise.resolve(n)}async retrieveConnection(e,t){e.endsWith(".db")&&(e=e.slice(0,-3));let n=t?`RO_${e}`:`RW_${e}`;if(this._connectionDict.has(n)){let i=this._connectionDict.get(n);return typeof i!="undefined"?Promise.resolve(i):Promise.reject(`Connection ${e} is undefined`)}else return Promise.reject(`Connection ${e} does not exist`)}async getNCDatabasePath(e,t){try{let n=await this.sqlite.getNCDatabasePath({path:e,database:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async createNCConnection(e,t){try{await this.sqlite.createNCConnection({databasePath:e,version:t});let n=new Le(e,!0,this.sqlite),i=`RO_${e})`;return this._connectionDict.set(i,n),Promise.resolve(n)}catch(n){return Promise.reject(n)}}async closeNCConnection(e){try{await this.sqlite.closeNCConnection({databasePath:e});let t=`RO_${e})`;return this._connectionDict.delete(t),Promise.resolve()}catch(t){return Promise.reject(t)}}async isNCConnection(e){let t={},n=`RO_${e})`;return t.result=this._connectionDict.has(n),Promise.resolve(t)}async retrieveNCConnection(e){if(this._connectionDict.has(e)){let t=`RO_${e})`,n=this._connectionDict.get(t);return typeof n!="undefined"?Promise.resolve(n):Promise.reject(`Connection ${e} is undefined`)}else return Promise.reject(`Connection ${e} does not exist`)}async isNCDatabase(e){try{let t=await this.sqlite.isNCDatabase({databasePath:e});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async retrieveAllConnections(){return this._connectionDict}async closeAllConnections(){let e=new Map;try{for(let t of this._connectionDict.keys()){let n=t.substring(3),i=t.substring(0,3)==="RO_";await this.sqlite.closeConnection({database:n,readonly:i}),e.set(t,null)}for(let t of e.keys())this._connectionDict.delete(t);return Promise.resolve()}catch(t){return Promise.reject(t)}}async checkConnectionsConsistency(){try{let e=[...this._connectionDict.keys()],t=[],n=[];for(let l of e)t.push(l.substring(0,2)),n.push(l.substring(3));let i=await this.sqlite.checkConnectionsConsistency({dbNames:n,openModes:t});return i.result||(this._connectionDict=new Map),Promise.resolve(i)}catch(e){return this._connectionDict=new Map,Promise.reject(e)}}async importFromJson(e){try{let t=await this.sqlite.importFromJson({jsonstring:e});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isJsonValid(e){try{let t=await this.sqlite.isJsonValid({jsonstring:e});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async copyFromAssets(e){let t=e!=null?e:!0;try{return await this.sqlite.copyFromAssets({overwrite:t}),Promise.resolve()}catch(n){return Promise.reject(n)}}async getFromHTTPRequest(e,t){let n=t!=null?t:!0;try{return await this.sqlite.getFromHTTPRequest({url:e,overwrite:n}),Promise.resolve()}catch(i){return Promise.reject(i)}}async isDatabaseEncrypted(e){e.endsWith(".db")&&(e=e.slice(0,-3));try{let t=await this.sqlite.isDatabaseEncrypted({database:e});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isInConfigEncryption(){try{let e=await this.sqlite.isInConfigEncryption();return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async isInConfigBiometricAuth(){try{let e=await this.sqlite.isInConfigBiometricAuth();return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async isDatabase(e){e.endsWith(".db")&&(e=e.slice(0,-3));try{let t=await this.sqlite.isDatabase({database:e});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async getDatabaseList(){try{let t=(await this.sqlite.getDatabaseList()).values;t.sort();let n={values:t};return Promise.resolve(n)}catch(e){return Promise.reject(e)}}async getMigratableDbList(e){let t=e||"default";try{let n=await this.sqlite.getMigratableDbList({folderPath:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async addSQLiteSuffix(e,t){let n=e||"default",i=t||[];try{let l=await this.sqlite.addSQLiteSuffix({folderPath:n,dbNameList:i});return Promise.resolve(l)}catch(l){return Promise.reject(l)}}async deleteOldDatabases(e,t){let n=e||"default",i=t||[];try{let l=await this.sqlite.deleteOldDatabases({folderPath:n,dbNameList:i});return Promise.resolve(l)}catch(l){return Promise.reject(l)}}async moveDatabasesAndAddSuffix(e,t){let n=e||"default",i=t||[];return this.sqlite.moveDatabasesAndAddSuffix({folderPath:n,dbNameList:i})}},Le=class{constructor(e,t,n){this.dbName=e,this.readonly=t,this.sqlite=n}getConnectionDBName(){return this.dbName}getConnectionReadOnly(){return this.readonly}async open(){try{return await this.sqlite.open({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(e){return Promise.reject(e)}}async close(){try{return await this.sqlite.close({database:this.dbName,readonly:this.readonly}),Promise.resolve()}catch(e){return Promise.reject(e)}}async beginTransaction(){try{let e=await this.sqlite.beginTransaction({database:this.dbName});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async commitTransaction(){try{let e=await this.sqlite.commitTransaction({database:this.dbName});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async rollbackTransaction(){try{let e=await this.sqlite.rollbackTransaction({database:this.dbName});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async isTransactionActive(){try{let e=await this.sqlite.isTransactionActive({database:this.dbName});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async loadExtension(e){try{return await this.sqlite.loadExtension({database:this.dbName,path:e,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async enableLoadExtension(e){try{return await this.sqlite.enableLoadExtension({database:this.dbName,toggle:e,readonly:this.readonly}),Promise.resolve()}catch(t){return Promise.reject(t)}}async getUrl(){try{let e=await this.sqlite.getUrl({database:this.dbName,readonly:this.readonly});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async getVersion(){try{let e=await this.sqlite.getVersion({database:this.dbName,readonly:this.readonly});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async getTableList(){try{let e=await this.sqlite.getTableList({database:this.dbName,readonly:this.readonly});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async execute(e,t=!0,n=!0){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{let i=await this.sqlite.execute({database:this.dbName,statements:e,transaction:t,readonly:!1,isSQL92:n});return Promise.resolve(i)}}catch(i){return Promise.reject(i)}}async query(e,t,n=!0){let i;try{return t&&t.length>0?i=await this.sqlite.query({database:this.dbName,statement:e,values:t,readonly:this.readonly,isSQL92:!0}):i=await this.sqlite.query({database:this.dbName,statement:e,values:[],readonly:this.readonly,isSQL92:n}),i=await this.reorderRows(i),Promise.resolve(i)}catch(l){return Promise.reject(l)}}async run(e,t,n=!0,i="no",l=!0){let p;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(t&&t.length>0?p=await this.sqlite.run({database:this.dbName,statement:e,values:t,transaction:n,readonly:!1,returnMode:i,isSQL92:!0}):p=await this.sqlite.run({database:this.dbName,statement:e,values:[],transaction:n,readonly:!1,returnMode:i,isSQL92:l}),p.changes=await this.reorderRows(p.changes),Promise.resolve(p))}catch(y){return Promise.reject(y)}}async executeSet(e,t=!0,n="no",i=!0){let l;try{return this.readonly?Promise.reject("not allowed in read-only mode"):(l=await this.sqlite.executeSet({database:this.dbName,set:e,transaction:t,readonly:!1,returnMode:n,isSQL92:i}),l.changes=await this.reorderRows(l.changes),Promise.resolve(l))}catch(p){return Promise.reject(p)}}async isExists(){try{let e=await this.sqlite.isDBExists({database:this.dbName,readonly:this.readonly});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async isTable(e){try{let t=await this.sqlite.isTableExists({database:this.dbName,table:e,readonly:this.readonly});return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async isDBOpen(){try{let e=await this.sqlite.isDBOpen({database:this.dbName,readonly:this.readonly});return Promise.resolve(e)}catch(e){return Promise.reject(e)}}async delete(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteDatabase({database:this.dbName,readonly:!1}),Promise.resolve())}catch(e){return Promise.reject(e)}}async createSyncTable(){try{if(this.readonly)return Promise.reject("not allowed in read-only mode");{let e=await this.sqlite.createSyncTable({database:this.dbName,readonly:!1});return Promise.resolve(e)}}catch(e){return Promise.reject(e)}}async setSyncDate(e){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.setSyncDate({database:this.dbName,syncdate:e,readonly:!1}),Promise.resolve())}catch(t){return Promise.reject(t)}}async getSyncDate(){try{let e=await this.sqlite.getSyncDate({database:this.dbName,readonly:this.readonly}),t="";return e.syncDate>0&&(t=new Date(e.syncDate*1e3).toISOString()),Promise.resolve(t)}catch(e){return Promise.reject(e)}}async exportToJson(e,t=!1){try{let n=await this.sqlite.exportToJson({database:this.dbName,jsonexportmode:e,readonly:this.readonly,encrypted:t});return Promise.resolve(n)}catch(n){return Promise.reject(n)}}async deleteExportedRows(){try{return this.readonly?Promise.reject("not allowed in read-only mode"):(await this.sqlite.deleteExportedRows({database:this.dbName,readonly:!1}),Promise.resolve())}catch(e){return Promise.reject(e)}}async executeTransaction(e,t=!0){let n=0,i=!1;if(this.readonly)return Promise.reject("not allowed in read-only mode");if(await this.sqlite.beginTransaction({database:this.dbName}),i=await this.sqlite.isTransactionActive({database:this.dbName}),!i)return Promise.reject("After Begin Transaction, no transaction active");try{for(let y of e){if(typeof y!="object"||!("statement"in y))throw new Error("Error a task.statement must be provided");if("values"in y&&y.values&&y.values.length>0){let k=y.statement.toUpperCase().includes("RETURNING")?"all":"no",L=await this.sqlite.run({database:this.dbName,statement:y.statement,values:y.values,transaction:!1,readonly:!1,returnMode:k,isSQL92:t});if(L.changes.changes<0)throw new Error("Error in transaction method run ");n+=L.changes.changes}else{let k=await this.sqlite.execute({database:this.dbName,statements:y.statement,transaction:!1,readonly:!1});if(k.changes.changes<0)throw new Error("Error in transaction method execute ");n+=k.changes.changes}}let l=await this.sqlite.commitTransaction({database:this.dbName});n+=l.changes.changes;let p={changes:{changes:n}};return Promise.resolve(p)}catch(l){let p=l.message?l.message:l;return await this.sqlite.rollbackTransaction({database:this.dbName}),Promise.reject(p)}}async reorderRows(e){let t=e;if(e!=null&&e.values&&typeof e.values[0]=="object"&&Object.keys(e.values[0]).includes("ios_columns")){let n=e.values[0].ios_columns,i=[];for(let l=1;l<e.values.length;l++){let p=e.values[l],y={};for(let k of n)y[k]=p[k];i.push(y)}t.values=i}return Promise.resolve(t)}}});var dt={};Ce(dt,{CapacitorSQLiteWeb:()=>je});var je,ut=Y(()=>{Oe();je=class extends he{constructor(){super(...arguments),this.jeepSqliteElement=null,this.isWebStoreOpen=!1}async initWebStore(){await customElements.whenDefined("jeep-sqlite"),this.jeepSqliteElement=document.querySelector("jeep-sqlite"),this.ensureJeepSqliteIsAvailable(),this.jeepSqliteElement.addEventListener("jeepSqliteImportProgress",e=>{this.notifyListeners("sqliteImportProgressEvent",e.detail)}),this.jeepSqliteElement.addEventListener("jeepSqliteExportProgress",e=>{this.notifyListeners("sqliteExportProgressEvent",e.detail)}),this.jeepSqliteElement.addEventListener("jeepSqliteHTTPRequestEnded",e=>{this.notifyListeners("sqliteHTTPRequestEndedEvent",e.detail)}),this.jeepSqliteElement.addEventListener("jeepSqlitePickDatabaseEnded",e=>{this.notifyListeners("sqlitePickDatabaseEndedEvent",e.detail)}),this.jeepSqliteElement.addEventListener("jeepSqliteSaveDatabaseToDisk",e=>{this.notifyListeners("sqliteSaveDatabaseToDiskEvent",e.detail)}),this.isWebStoreOpen||(this.isWebStoreOpen=await this.jeepSqliteElement.isStoreOpen())}async saveToStore(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.saveToStore(e);return}catch(t){throw new Error(`${t}`)}}async getFromLocalDiskToStore(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.getFromLocalDiskToStore(e);return}catch(t){throw new Error(`${t}`)}}async saveToLocalDisk(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.saveToLocalDisk(e);return}catch(t){throw new Error(`${t}`)}}async echo(e){return this.ensureJeepSqliteIsAvailable(),await this.jeepSqliteElement.echo(e)}async createConnection(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.createConnection(e);return}catch(t){throw new Error(`${t}`)}}async open(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.open(e);return}catch(t){throw new Error(`${t}`)}}async closeConnection(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.closeConnection(e);return}catch(t){throw new Error(`${t}`)}}async getVersion(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.getVersion(e)}catch(t){throw new Error(`${t}`)}}async checkConnectionsConsistency(e){this.ensureJeepSqliteIsAvailable();try{return await this.jeepSqliteElement.checkConnectionsConsistency(e)}catch(t){throw new Error(`${t}`)}}async close(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.close(e);return}catch(t){throw new Error(`${t}`)}}async beginTransaction(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.beginTransaction(e)}catch(t){throw new Error(`${t}`)}}async commitTransaction(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.commitTransaction(e)}catch(t){throw new Error(`${t}`)}}async rollbackTransaction(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.rollbackTransaction(e)}catch(t){throw new Error(`${t}`)}}async isTransactionActive(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isTransactionActive(e)}catch(t){throw new Error(`${t}`)}}async getTableList(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.getTableList(e)}catch(t){throw new Error(`${t}`)}}async execute(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.execute(e)}catch(t){throw new Error(`${t}`)}}async executeSet(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.executeSet(e)}catch(t){throw new Error(`${t}`)}}async run(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.run(e)}catch(t){throw new Error(`${t}`)}}async query(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.query(e)}catch(t){throw new Error(`${t}`)}}async isDBExists(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isDBExists(e)}catch(t){throw new Error(`${t}`)}}async isDBOpen(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isDBOpen(e)}catch(t){throw new Error(`${t}`)}}async isDatabase(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isDatabase(e)}catch(t){throw new Error(`${t}`)}}async isTableExists(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isTableExists(e)}catch(t){throw new Error(`${t}`)}}async deleteDatabase(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.deleteDatabase(e);return}catch(t){throw new Error(`${t}`)}}async isJsonValid(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.isJsonValid(e)}catch(t){throw new Error(`${t}`)}}async importFromJson(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.importFromJson(e)}catch(t){throw new Error(`${t}`)}}async exportToJson(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.exportToJson(e)}catch(t){throw new Error(`${t}`)}}async createSyncTable(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.createSyncTable(e)}catch(t){throw new Error(`${t}`)}}async setSyncDate(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.setSyncDate(e);return}catch(t){throw new Error(`${t}`)}}async getSyncDate(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.getSyncDate(e)}catch(t){throw new Error(`${t}`)}}async deleteExportedRows(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.deleteExportedRows(e);return}catch(t){throw new Error(`${t}`)}}async addUpgradeStatement(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.addUpgradeStatement(e);return}catch(t){throw new Error(`${t}`)}}async copyFromAssets(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.copyFromAssets(e);return}catch(t){throw new Error(`${t}`)}}async getFromHTTPRequest(e){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{await this.jeepSqliteElement.getFromHTTPRequest(e);return}catch(t){throw new Error(`${t}`)}}async getDatabaseList(){this.ensureJeepSqliteIsAvailable(),this.ensureWebstoreIsOpen();try{return await this.jeepSqliteElement.getDatabaseList()}catch(e){throw new Error(`${e}`)}}ensureJeepSqliteIsAvailable(){if(this.jeepSqliteElement===null)throw new Error("The jeep-sqlite element is not present in the DOM! Please check the @capacitor-community/sqlite documentation for instructions regarding the web platform.")}ensureWebstoreIsOpen(){if(!this.isWebStoreOpen)throw new Error('WebStore is not open yet. You have to call "initWebStore()" first.')}async getUrl(){throw this.unimplemented("Not implemented on web.")}async getMigratableDbList(e){throw console.log("getMigratableDbList",e),this.unimplemented("Not implemented on web.")}async addSQLiteSuffix(e){throw console.log("addSQLiteSuffix",e),this.unimplemented("Not implemented on web.")}async deleteOldDatabases(e){throw console.log("deleteOldDatabases",e),this.unimplemented("Not implemented on web.")}async moveDatabasesAndAddSuffix(e){throw console.log("moveDatabasesAndAddSuffix",e),this.unimplemented("Not implemented on web.")}async isSecretStored(){throw this.unimplemented("Not implemented on web.")}async setEncryptionSecret(e){throw console.log("setEncryptionSecret",e),this.unimplemented("Not implemented on web.")}async changeEncryptionSecret(e){throw console.log("changeEncryptionSecret",e),this.unimplemented("Not implemented on web.")}async clearEncryptionSecret(){throw console.log("clearEncryptionSecret"),this.unimplemented("Not implemented on web.")}async checkEncryptionSecret(e){throw console.log("checkEncryptionPassPhrase",e),this.unimplemented("Not implemented on web.")}async getNCDatabasePath(e){throw console.log("getNCDatabasePath",e),this.unimplemented("Not implemented on web.")}async createNCConnection(e){throw console.log("createNCConnection",e),this.unimplemented("Not implemented on web.")}async closeNCConnection(e){throw console.log("closeNCConnection",e),this.unimplemented("Not implemented on web.")}async isNCDatabase(e){throw console.log("isNCDatabase",e),this.unimplemented("Not implemented on web.")}async isDatabaseEncrypted(e){throw console.log("isDatabaseEncrypted",e),this.unimplemented("Not implemented on web.")}async isInConfigEncryption(){throw this.unimplemented("Not implemented on web.")}async isInConfigBiometricAuth(){throw this.unimplemented("Not implemented on web.")}async loadExtension(e){throw console.log("loadExtension",e),this.unimplemented("Not implemented on web.")}async enableLoadExtension(e){throw console.log("enableLoadExtension",e),this.unimplemented("Not implemented on web.")}}});var mt,ht=Y(()=>{Oe();ct();mt=ke("CapacitorSQLite",{web:()=>Promise.resolve().then(()=>(ut(),dt)).then(r=>new r.CapacitorSQLiteWeb),electron:()=>window.CapacitorCustomPlatform.plugins.CapacitorSQLite})});var gt={};Ce(gt,{getCardById:()=>Gt,getCardIds:()=>$t,getCardsByIds:()=>zt,getDaten:()=>Kt,getEnergieById:()=>er,getEnergieCardIds:()=>Yt,getEnergies:()=>Zt,getEngName:()=>jt,getName:()=>Ot,getTrainerById:()=>_t,getTrainerCardIds:()=>Xt,getTrainers:()=>Vt,initDatabase:()=>Ht,insertCard:()=>Wt,insertEnergie:()=>Qt,insertTrainer:()=>Jt,updateCardIds:()=>Nt,updatePrice:()=>Ut});async function Ht(){return B=await Dt.createConnection("pokepicker",!1,"no-encryption",1),await B.open(),await B.execute(`
    CREATE TABLE IF NOT EXISTS pokemon (
      id INTEGER PRIMARY KEY,
      dex TEXT,
      name TEXT,
      engName TEXT,
      cardIds TEXT
    );
  `),await B.execute(`
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
  `),await B.execute(`
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
  `),await B.execute(`
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
  `),(await B.query("SELECT COUNT(*) as count FROM pokemon")).values[0].count===0&&await B.execute(`
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
      `),B}async function Kt(){return await B.query("SELECT * FROM pokemon")}async function Ot(r){return(await B.query("SELECT name FROM pokemon WHERE dex = ?",[r])).values[0].name}async function jt(r){return(await B.query("SELECT engName FROM pokemon WHERE dex = ?",[r])).values[0].engName}async function $t(r){return(await B.query("SELECT cardIds FROM pokemon WHERE dex = ?",[r])).values[0].cardIds}async function Nt(r,e){await B.run("UPDATE pokemon SET cardIds = ? WHERE dex = ?",[e,r])}async function Wt(r){var e,t,n,i,l;try{let p=typeof r.imageSmall=="string"?r.imageSmall:null,y=typeof r.imageLarge=="string"?r.imageLarge:null;return((l=(await B.run(`INSERT INTO cards (cardId, cardName, rarity, setName, imageLow, imageHigh, subTypes, addedAt, avg30)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[r.id,r.name,r.rarity||"",((e=r.set)==null?void 0:e.name)||"",p,y,Array.isArray(r.subtypes)?r.subtypes.join(", "):"",new Date().toISOString(),(i=(n=(t=r.cardmarket)==null?void 0:t.prices)==null?void 0:n.avg30)!=null?i:null])).changes)==null?void 0:l.lastId)||null}catch(p){return console.error("Fehler in insertCard():",p.message||p,(r==null?void 0:r.id)||"unbekannte Karte"),null}}async function Gt(r){var t;return((t=(await B.query("SELECT * FROM cards WHERE id = ?",[r])).values)==null?void 0:t[0])||null}async function zt(r){let e=r.map(()=>"?").join(",");return(await B.query(`SELECT * FROM cards WHERE id IN (${e})`,r)).values}async function Ut(r,e){try{await B.run("UPDATE cards SET avg30 = ? WHERE cardId = ?",[e,r])}catch(t){console.error(`Fehler beim Speichern von avg30 f\xFCr ${r}:`,t.message)}}async function Vt(){return(await B.query("SELECT * FROM trainer")).values}async function Jt(r){var e,t,n,i,l;try{let p=typeof r.imageSmall=="string"?r.imageSmall:null,y=typeof r.imageLarge=="string"?r.imageLarge:null;return((l=(await B.run(`INSERT INTO trainer (cardId, cardName, rarity, setName, imageLow, imageHigh, subTypes, addedAt, avg30)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[r.id,r.name,r.rarity||"",((e=r.set)==null?void 0:e.name)||"",p,y,Array.isArray(r.subtypes)?r.subtypes.join(", "):"",new Date().toISOString(),(i=(n=(t=r.cardmarket)==null?void 0:t.prices)==null?void 0:n.avg30)!=null?i:null])).changes)==null?void 0:l.lastId)||null}catch(p){return console.error("Fehler in insertTrainer():",p.message||p,(r==null?void 0:r.id)||"unbekannte Karte"),null}}async function _t(r){var t;return((t=(await B.query("SELECT * FROM trainer WHERE id = ?",[r])).values)==null?void 0:t[0])||null}async function Xt(){return(await B.query("SELECT id FROM trainer")).values.map(e=>e.id)}async function Zt(){return(await B.query("SELECT * FROM energy")).values}async function Qt(r){var e,t,n,i,l;try{let p=typeof r.imageSmall=="string"?r.imageSmall:null,y=typeof r.imageLarge=="string"?r.imageLarge:null;return((l=(await B.run(`INSERT INTO energy (cardId, cardName, rarity, setName, imageLow, imageHigh, subTypes, addedAt, avg30)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[r.id,r.name,r.rarity||"",((e=r.set)==null?void 0:e.name)||"",p,y,Array.isArray(r.subtypes)?r.subtypes.join(", "):"",new Date().toISOString(),(i=(n=(t=r.cardmarket)==null?void 0:t.prices)==null?void 0:n.avg30)!=null?i:null])).changes)==null?void 0:l.lastId)||null}catch(p){return console.error("Fehler in insertEnergie():",p.message||p,(r==null?void 0:r.id)||"unbekannte Karte"),null}}async function Yt(){return(await B.query("SELECT id FROM energy")).values.map(e=>e.id)}async function er(r){var t;return((t=(await B.query("SELECT * FROM energy WHERE id = ?",[r])).values)==null?void 0:t[0])||null}var Dt,B,pt=Y(()=>{ht();Dt=new Se(mt)});Pe();var ee=Je("Http",{web:()=>Promise.resolve().then(()=>(Fe(),qe)).then(r=>new r.HttpWeb),electron:()=>Promise.resolve().then(()=>(Fe(),qe)).then(r=>new r.HttpWeb)});var ie=ot(),$;document.addEventListener("DOMContentLoaded",()=>{(async()=>{let r=document.getElementById("cardLoader");r.innerHTML=`
      <p id="loaderText">Lade Karten\u2026</p>
      <div id="progressBarContainer">
        <div id="progressBar"></div>
      </div>
      <div id="progressText">0%</div>
    `,r.classList.remove("hidden"),r.classList.add("shown");let{initDatabase:e,getDaten:t,getName:n,getEngName:i,getCardIds:l,updateCardIds:p,insertCard:y,getCardById:k,getCardsByIds:L,updatePrice:W,getTrainers:T,insertTrainer:C,getTrainerCardIds:G,getTrainerById:N,getEnergies:Q,insertEnergie:z,getEnergieCardIds:le,getEnergieById:ce}=await Promise.resolve().then(()=>(pt(),gt));$=await e();let te=await t(),re=document.querySelector("#kartentabelle tbody");window.cachedCards={},window.cachedPokemonCardsByName={},window.cachedTrainerCardsByType={},window.cachedEnergyCardsByType={};let oe=0,ge=te.values.length;for(let c of te.values){let a=document.createElement("tr"),o=parseInt(c.dex),m=`
        <td class="dexnr">${c.dex}</td>
        <td class="pokemon">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${o}.png" alt="${c.name}"><br>
          <a href="https://www.pokewiki.de/${c.name}" target="_blank">${c.name}</a>
        </td>
        <td id="td_${c.dex}">
          <div id="kartenContainer_${c.dex}" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button id="neueKarteBtn_${c.dex}" onclick="openOverlay('${c.dex}')">+ Neue Karte</button>
        </td>
      `;a.innerHTML=m,re.appendChild(a),await K(c.dex),oe++;let s=Math.min(99,Math.round(oe/ge*100)),h=document.getElementById("progressBar"),d=document.getElementById("progressText");h&&(h.style.width=s+"%"),d&&(d.textContent=s+"%")}progressBar.style.width="100%",progressText.textContent="100%";let x=r.offsetHeight,w=document.createElement("div");w.style.height=x+"px",w.style.backgroundColor="#333",w.style.borderRadius="8px",w.style.display="flex",w.style.alignItems="center",w.style.justifyContent="center",w.style.color="#DEDEDE",w.style.fontFamily='"Saira", sans-serif',w.style.marginBottom="20px",w.style.marginTop="20px",w.style.gap="10px",w.innerHTML=`
      <p id="loaderText">Lade Karten\u2026</p>
      <div id="progressBarContainer" style="width: 100%; max-width: 400px; height: 20px; background-color: #555; border-radius: 10px; margin: 10px auto;">
        <div id="progressBar" style="height: 100%; width: 100%; background-color: #00AEFF;"></div>
      </div>
      <div id="progressText" style="min-width: 40px; margin-right: 15px;">100%</div>
    `,r.replaceWith(w),setTimeout(()=>{w.style.transition="height 0.5s ease, opacity 0.5s ease",w.style.height="0px",w.style.opacity="0",w.style.overflow="hidden"},100),setTimeout(()=>{w.remove()},700),I(),A(),U(),document.querySelectorAll("#tableToggle button").forEach(c=>c.classList.remove("active")),document.getElementById("showTablePokemon").classList.add("active");function I(){let c=document.querySelectorAll("#kartentabelle tbody tr"),a=0;c.forEach(o=>{o.style.display!=="none"&&a++}),document.getElementById("eintragsAnzahl").textContent=`(${a})`}function A(){let c=document.querySelectorAll("#kartentabelle tbody tr"),a=0;c.forEach(o=>{if(o.style.display==="none")return;let m=o.querySelectorAll("div[id^='kartenContainer_'] img");a+=m.length}),document.getElementById("kartenAnzahl").textContent=`(${a})`}async function K(c){let a=document.getElementById(`kartenContainer_${c}`),o=await l(c);if(!o)return;let m=o.split(";").filter(d=>d.trim()),s=await L(m.map(d=>parseInt(d)));s.sort((d,f)=>(f.avg30||0)-(d.avg30||0));let h=document.createDocumentFragment();for(let d of s){window.cachedCards[d.cardId]=d;let f=document.createElement("img");f.alt=d.cardId,f.style.width="50px",f.style.height="69px",f.style.objectFit="cover",f.src=d.imageLow,f.addEventListener("click",()=>D(c,m.indexOf(String(d.id)))),h.appendChild(f)}a.appendChild(h)}async function D(c,a){let o=document.querySelector("#overlay");o.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',o.classList.remove("hidden"),o.classList.add("shown");let m=await l(c);if(!m)return;let s=m.split(";").filter(f=>f.trim()!=="");if(s.length===0){o.classList.add("hidden"),o.classList.remove("shown");return}let h=a;async function d(){let f=s[h];try{let b=await k(f),g="Unbekannt";if(b.addedAt){let S=new Date(b.addedAt),M={day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"};g=S.toLocaleString("de-DE",M)}let u="Keine Angabe";b.basic==1&&(u="Basic"),b.reverse==1&&(u="Reverse"),b.holo==1&&(u="Holo");let v=await q(b.cardId);if(v==null){let S=H(b.cardId);v=await q(S)}let E="\u2013";if(v!=null){let S=v.toFixed(2),M="#DEDEDE",R="\u{1FA99}";v>20?(M="#FF4444",R="\u{1F525}"):v>5&&(M="#FFAA00",R="\u{1F4B0}"),E=`<span style="color:${M};">${R} ${S}\u20AC</span>`}o.innerHTML=`
            <div id="overlayContent">
            <button class="closeGallery" id="closeGallery">X</button>
              <h2>Karte ansehen</h2>
              <div style="display:flex; align-items:center; justify-content:center;">
                <div style="display:flex; flex-direction:column; align-items:center;">
                  <img src="${b.imageHigh}" alt="${f}" style="max-width:300px; max-height:400px; margin:0 20px;">
                  <p style="margin-top:10px;">
                    ID: ${b.cardId} | Variante: <strong>${u}</strong><br>
                    30d-Wert: <strong>${E}</strong><br>
                    Hinzugef\xFCgt am: <strong>${g}
                  </p>
                </div>
              </div>
              <button id="prevCard" style="font-size:24px;">\u2B05\uFE0F</button>
              <button id="nextCard" style="font-size:24px;">\u27A1\uFE0F</button>
              <br><br>
              <button id="deleteCard">\u274C Karte l\xF6schen</button>
            </div>
          `,document.getElementById("prevCard").addEventListener("click",()=>{h=(h-1+s.length)%s.length,d()}),document.getElementById("nextCard").addEventListener("click",()=>{h=(h+1)%s.length,d()}),document.getElementById("deleteCard").addEventListener("click",async()=>{if(confirm("Willst du diese Karte wirklich l\xF6schen?")){let S=s[h];await $.run("DELETE FROM cards WHERE id = ?",[S]),s.splice(h,1),await p(c,s.join(";")+";"),o.classList.add("hidden"),o.classList.remove("shown"),o.innerHTML="";let M=document.getElementById(`kartenContainer_${c}`);M.innerHTML="",K(c),A(),U()}}),document.getElementById("closeGallery").addEventListener("click",()=>{o.classList.add("hidden"),o.classList.remove("shown"),o.innerHTML=""})}catch(b){console.error("Fehler beim Anzeigen der Karte:",b),o.classList.add("hidden"),o.classList.remove("shown"),o.innerHTML=""}}d()}window.openOverlay=async function(c){let a=document.querySelector("#overlay");a.innerHTML=`
        <div id="overlayContent">
          <h2>Bitte warten...</h2>
          <p>Karten werden geladen</p>
          <div class="loader"></div>
        </div>
      `,a.classList.remove("hidden"),a.classList.add("shown");try{let o=await n(c),m=await i(c);m=="Nidoran\u2642"&&(m="Nidoran \u2642"),m=="Nidoran\u2640"&&(m="Nidoran \u2640"),m=="Sirfetch\u2019d"&&(m="Sirfetch'd");let s=window.cachedPokemonCardsByName[m];if(s||(s=await ne(m),s&&(window.cachedPokemonCardsByName[m]=s)),!s||s.length===0){a.innerHTML=`
            <div id='overlayContent'>
              <h2>Keine Karten gefunden.</h2> 
              <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
            </div>
          `,document.getElementById("BackBtn").addEventListener("click",d=>{d.preventDefault(),a.classList.add("hidden"),a.classList.remove("shown"),a.innerHTML=""});return}let h=`
          <div id="overlayContent">
            <button class="closeGallery" id="BackBtn">X</button>
            <h2>
              Kartenauswahl f\xFCr<br>
              <strong>${o}</strong>:
            </h2>
            <p>Welche Karte m\xF6chtest du hinzuf\xFCgen?</p>
            <div class="kartenGrid">
        `;for(let d of s){let f=d.avg30,b="\u2013";if(f!=null){let g=f.toFixed(2),u="#DEDEDE",v="\u{1FA99}";f>20?(u="#FF4444",v="\u{1F525}"):f>5&&(u="#FFAA00",v="\u{1F4B0}"),b=`<span style="color:${u}; font-size:14px;">${v} ${g}\u20AC</span>`}h+=`
            <div class="kartenItem" onclick="karteAusw\xE4hlen('${d.id}', '${c}', '${o}')">
              <div>ID: ${d.id}</div>
              <img src="${d.images.small}" alt="${o}">
              <div>${b}</div>
            </div>
          `}h+=`
            </div>
          </div>
        `,a.innerHTML=h,document.getElementById("BackBtn").addEventListener("click",d=>{d.preventDefault(),a.classList.add("hidden"),a.classList.remove("shown"),a.innerHTML=""})}catch(o){console.error(o),a.innerHTML=`
        <div id='overlayContent'>
          <h2>Fehler beim Laden.</h2>
          <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
        </div>`,document.getElementById("BackBtn").addEventListener("click",m=>{m.preventDefault(),a.classList.add("hidden"),a.classList.remove("shown"),a.innerHTML=""})}};function H(c){return c.replace(/-(0*)(\d+)/,(a,o,m)=>"-"+parseInt(m,10))}async function ne(c){var a,o;try{let m=`https://api.pokemontcg.io/v2/cards?q=name:"${c}"&orderBy=-set.releaseDate`,s=await ee.get({url:m,headers:{Accept:"application/json","X-Api-Key":ie.API_KEY,Connection:"close"}});if(s.status!==200)return console.error("Fehler beim Abrufen der Karten:",s.status,s),null;let h=s.data.data;for(let d of h){let f=(a=d.cardmarket)==null?void 0:a.prices;d.avg30=(o=f==null?void 0:f.avg30)!=null?o:null}return h}catch(m){return console.error("Fehler beim Abrufen \xFCber HTTP:",m.message),null}}async function q(c){var a,o,m,s,h;try{let d=`https://api.pokemontcg.io/v2/cards?q=id:${c}`,f=await ee.get({url:d,headers:{Accept:"application/json","X-Api-Key":ie.API_KEY,Connection:"close"}});if(f.status!==200||!((o=(a=f.data)==null?void 0:a.data)!=null&&o.length))return console.error("Fehler beim Abrufen der Karte:",f.status,f),null;let b=(s=(m=f.data.data[0])==null?void 0:m.cardmarket)==null?void 0:s.prices;return(h=b==null?void 0:b.avg30)!=null?h:null}catch(d){return console.error("Fehler beim Preisabruf:",d.message),null}}window.karteAusw\u00E4hlen=async function(c,a,o){var b,g;let m=document.querySelector("#overlay");m.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',m.classList.remove("hidden"),m.classList.add("shown");let s=await ee.get({url:`https://api.pokemontcg.io/v2/cards/${c}`,headers:{Accept:"application/json","X-Api-Key":ie.API_KEY,Connection:"close"}});if(s.status!==200){console.error("Fehler beim Abrufen der Karte:",s.status,s);return}let h=s.data.data;h.imageSmall=((b=h.images)==null?void 0:b.small)||null,h.imageLarge=((g=h.images)==null?void 0:g.large)||null;let d=await y(h);if(!d){console.error("Keine ID von insertCard erhalten \u2013 Abbruch.");return}h.id=d,window.cachedCards[h.cardId]=h,m.innerHTML=`
        <div id="overlayContent">
          <h2>Karte hinzugef\xFCgt!</h2>
          <p>Du hast <strong>${o}</strong> (${c}) ausgew\xE4hlt.</p>
          <br>
          <p>Welche Variante m\xF6chtest du speichern?</p>
          <button class="overlayMenuBtn" id="btnBasic">Basic</button>
          <button class="overlayMenuBtn" id="btnReverse">Reverse</button>
          <button class="overlayMenuBtn" id="btnHolo">Holo</button>
          <br><br>
          <button class="overlayMenuBtn" id="closeOverlayConfirm">\xDCberspringen</button>
        </div>
      `;async function f(u){m.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',m.classList.remove("hidden"),m.classList.add("shown"),u!=="none"&&await $.run(`UPDATE cards SET ${u} = 1 WHERE id = ?`,[d]);let v=await l(a);v||(v=""),v+=d+";",await p(a,v);let E=document.getElementById(`kartenContainer_${a}`);E.innerHTML="",await K(a),m.classList.add("hidden"),m.classList.remove("shown"),m.innerHTML="",I(),A(),U()}document.getElementById("btnBasic").addEventListener("click",()=>f("basic")),document.getElementById("btnReverse").addEventListener("click",()=>f("reverse")),document.getElementById("btnHolo").addEventListener("click",()=>f("holo")),document.getElementById("closeOverlayConfirm").addEventListener("click",()=>f("none"))};async function U(){try{let c=await $.query("SELECT avg30 FROM cards WHERE avg30 IS NOT NULL"),a=await $.query("SELECT avg30 FROM trainer WHERE avg30 IS NOT NULL"),o=await $.query("SELECT avg30 FROM energy WHERE avg30 IS NOT NULL"),m=0;for(let d of c.values)m+=d.avg30;for(let d of a.values)m+=d.avg30;for(let d of o.values)m+=d.avg30;let s="\u{1FA99}";m>1e3?s="\u{1F525}":m>500&&(s="\u{1F4B0}");let h=`Gesamtwert: ${s} ${m.toFixed(2)}\u20AC`;document.getElementById("gesamtwert").textContent=h}catch(c){console.error("Fehler beim Berechnen des Gesamtwerts:",c)}}async function be(){let c=await $.query("SELECT cardId FROM cards"),a=await $.query("SELECT cardId FROM trainer"),o=await $.query("SELECT cardId FROM energy"),m=0,s=0,h=c.values.length+a.values.length+o.values.length;alert(`Aktualisierung von ${h} Preisen gestartet.`);for(let f of c.values){let b=f.cardId,g=await q(b);if(g==null){let E=H(b);g=await q(E)}g!=null&&(await W(b,g),m++),s++;let u=Math.round(s/h*100),v=document.getElementById("preiseAktualisierenProgress");v&&(v.textContent=u+"%")}for(let f of a.values){let b=f.cardId,g=await q(b);if(g==null){let E=H(b);g=await q(E)}g!=null&&(await $.run("UPDATE trainer SET avg30 = ? WHERE cardId = ?",[g,b]),m++),s++;let u=Math.round(s/h*100),v=document.getElementById("preiseAktualisierenProgress");v&&(v.textContent=u+"%")}for(let f of o.values){let b=f.cardId,g=await q(b);if(g==null){let E=H(b);g=await q(E)}g!=null&&(await $.run("UPDATE energy SET avg30 = ? WHERE cardId = ?",[g,b]),m++),s++;let u=Math.round(s/h*100),v=document.getElementById("preiseAktualisierenProgress");v&&(v.textContent=u+"%")}let d=document.getElementById("preiseAktualisierenProgress");d&&(d.textContent=""),alert(`${m} Preise wurden aktualisiert!`),U()}window.aktualisiereAllePreise=be;function Te(){let a=document.getElementById("search").value.toUpperCase(),m=document.getElementById("kartentabelle").getElementsByTagName("tr");for(let s=1;s<m.length;s++){m[s].style.display="none";let h=m[s].getElementsByTagName("td");for(let d=0;d<h.length;d++){let f=h[d];if(f&&f.innerHTML.toUpperCase().indexOf(a)>-1){m[s].style.display="";break}}}I(),A(),U()}window.searchTable=Te;let P={reverse:"neutral",holo:"neutral",v:"neutral",vmax:"neutral",ex:"neutral",shiny:"neutral"};function O(){document.querySelectorAll("#kartentabelle tbody tr").forEach(a=>{let m=a.querySelector("div[id^='kartenContainer_']").querySelectorAll("img"),s=!1,h=!1,d=!1,f=!1,b=!1,g=!1;m.forEach(v=>{var M,R,j,_,pe,$e,Ne,We,Ge,ze,Ue;let E=v.alt,S=(M=window.cachedCards)==null?void 0:M[E];S&&(S.reverse==1&&(s=!0),S.holo==1&&(h=!0),((R=S.subTypes)!=null&&R.toLowerCase().includes("v")||(j=S.cardName)!=null&&j.toLowerCase().includes(" v"))&&(d=!0),((_=S.subTypes)!=null&&_.toLowerCase().includes("vmax")||(pe=S.cardName)!=null&&pe.toLowerCase().includes(" vmax")||($e=S.subTypes)!=null&&$e.toLowerCase().includes("vstar")||(Ne=S.cardName)!=null&&Ne.toLowerCase().includes(" vstar"))&&(f=!0),((We=S.subTypes)!=null&&We.toLowerCase().includes("ex")||(Ge=S.cardName)!=null&&Ge.toLowerCase().includes(" ex"))&&(b=!0),((ze=S.subTypes)!=null&&ze.toLowerCase().includes("radiant")||(Ue=S.rarity)!=null&&Ue.toLowerCase().includes("shiny"))&&(g=!0))});let u=!0;P.reverse==="positive"&&!s&&(u=!1),P.reverse==="negative"&&s&&(u=!1),P.holo==="positive"&&!h&&(u=!1),P.holo==="negative"&&h&&(u=!1),P.v==="positive"&&!d&&(u=!1),P.v==="negative"&&d&&(u=!1),P.vmax==="positive"&&!f&&(u=!1),P.vmax==="negative"&&f&&(u=!1),P.ex==="positive"&&!b&&(u=!1),P.ex==="negative"&&b&&(u=!1),P.shiny==="positive"&&!g&&(u=!1),P.shiny==="negative"&&g&&(u=!1),a.style.display=u?"":"none"}),I(),A(),U()}function F(c){P[c]==="neutral"?P[c]="positive":P[c]==="positive"?P[c]="negative":P[c]="neutral",O(),V()}function V(){let c=["reverse","holo","v","vmax","ex","shiny"];for(let a of c){let o=document.getElementById(`filter-${a}`);o&&(o.classList.remove("active-positive","active-negative"),P[a]==="positive"?o.classList.add("active-positive"):P[a]==="negative"&&o.classList.add("active-negative"))}}document.getElementById("filter-alle").addEventListener("click",c=>{c.preventDefault(),P.reverse="neutral",P.holo="neutral",P.v="neutral",P.vmax="neutral",P.ex="neutral",P.shiny="neutral",O(),V()}),document.getElementById("filter-reverse").addEventListener("click",c=>{c.preventDefault(),F("reverse")}),document.getElementById("filter-holo").addEventListener("click",c=>{c.preventDefault(),F("holo")}),document.getElementById("filter-v").addEventListener("click",c=>{c.preventDefault(),F("v")}),document.getElementById("filter-vmax").addEventListener("click",c=>{c.preventDefault(),F("vmax")}),document.getElementById("filter-ex").addEventListener("click",c=>{c.preventDefault(),F("ex")}),document.getElementById("filter-shiny").addEventListener("click",c=>{c.preventDefault(),F("shiny")}),window.zeigePokemonTabelle=function(){document.querySelectorAll("#tableToggle button").forEach(c=>c.classList.remove("active")),document.getElementById("showTablePokemon").classList.add("active"),document.getElementById("pokemonFilterContainer").style.display="block",document.getElementById("kartentabelle").classList.remove("hidden"),document.getElementById("trainertabelle").classList.add("hidden"),document.getElementById("energietabelle").classList.add("hidden")},window.zeigeTrainerTabelle=async function(){document.querySelectorAll("#tableToggle button").forEach(h=>h.classList.remove("active")),document.getElementById("showTableTrainer").classList.add("active"),document.getElementById("pokemonFilterContainer").style.display="none",document.getElementById("kartentabelle").classList.add("hidden"),document.getElementById("trainertabelle").classList.remove("hidden"),document.getElementById("energietabelle").classList.add("hidden");let c=document.querySelector("#trainertabelle tbody");c.innerHTML="";let a=document.createElement("tr");a.innerHTML=`
        <td>Unter-<br>st\xFCtzer</td>
        <td>
          <div id="supporterContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Supporter')">+ Unterst\xFCtzer</button>
        </td>
      `,c.appendChild(a);let o=document.createElement("tr");o.innerHTML=`
        <td>Item</td>
        <td>
          <div id="itemContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Item')">+ Item</button>
        </td>
      `,c.appendChild(o);let m=document.createElement("tr");m.innerHTML=`
        <td>Stadion</td>
        <td>
          <div id="stadiumContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Stadium')">+ Stadion</button>
        </td>
      `,c.appendChild(m);let s=document.createElement("tr");s.innerHTML=`
        <td>Ausr\xFCs-<br>tung</td>
        <td>
          <div id="toolContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openTrainerOverlay('Tool')">+ Ausr\xFCstung</button>
        </td>
      `,c.appendChild(s),await X()};async function X(){let c=document.getElementById("supporterContainer"),a=document.getElementById("itemContainer"),o=document.getElementById("stadiumContainer"),m=document.getElementById("toolContainer"),s=await T();if(!s||!Array.isArray(s)){console.error("getTrainers() lieferte keine g\xFCltige Liste:",s);return}s.sort((g,u)=>(u.avg30||0)-(g.avg30||0));let h=document.createDocumentFragment(),d=document.createDocumentFragment(),f=document.createDocumentFragment(),b=document.createDocumentFragment();for(let g of s){window.cachedCards[g.cardId]=g;let u=document.createElement("img");u.src=g.imageLow,u.alt=g.cardId,u.style.width="50px",u.style.height="69px",u.style.objectFit="cover";let v="";if(Array.isArray(g.subTypes))g.subTypes.some(E=>E.toLowerCase().includes("supporter"))?v="supporter":g.subTypes.some(E=>E.toLowerCase().includes("item"))?v="item":g.subTypes.some(E=>E.toLowerCase().includes("stadium"))?v="stadium":g.subTypes.some(E=>E.toLowerCase().includes("tool"))&&(v="tool");else if(typeof g.subTypes=="string"){let E=g.subTypes.toLowerCase();E.includes("supporter")?v="supporter":E.includes("item")?v="item":E.includes("stadium")?v="stadium":E.includes("tool")&&(v="tool")}u.addEventListener("click",()=>J(g.id,v)),v=="supporter"&&h.appendChild(u),v=="item"&&d.appendChild(u),v=="stadium"&&f.appendChild(u),v=="tool"&&b.appendChild(u)}c.appendChild(h),a.appendChild(d),o.appendChild(f),m.appendChild(b)}window.openTrainerOverlay=async function(c){let a=document.querySelector("#overlay");a.innerHTML=`
        <div id="overlayContent">
          <h2>Bitte warten...</h2>
          <p>Karten werden geladen</p>
          <div class="loader"></div>
        </div>
      `,a.classList.remove("hidden"),a.classList.add("shown");try{let o=window.cachedTrainerCardsByType[c];if(o||(o=await Z(c),o&&(window.cachedTrainerCardsByType[c]=o)),!o||o.length===0){a.innerHTML=`
            <div id='overlayContent'>
              <h2>Keine Karten gefunden.</h2> 
              <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
            </div>
          `,document.getElementById("BackBtn").addEventListener("click",()=>{a.classList.add("hidden"),a.classList.remove("shown"),a.innerHTML=""});return}let m=`
          <div id="overlayContent">
            <button class="closeGallery" id="BackBtn">X</button>
            <h2>Kartenauswahl f\xFCr<br><strong>${c}</strong>:</h2>
            <p>
              Welche Karte m\xF6chtest du hinzuf\xFCgen?<br>
              <input type="text" id="nummerSuche" placeholder="Kartennummer eingeben\u2026" onkeyup="filterTrainerCardsByNumber()">
            </p>
            <div class="kartenGrid">
        `;for(let s of o){let h=s.avg30,d="\u2013";if(h!=null){let b=h.toFixed(2),g="#DEDEDE",u="\u{1FA99}";h>20?(g="#FF4444",u="\u{1F525}"):h>5&&(g="#FFAA00",u="\u{1F4B0}"),d=`<span style="color:${g}; font-size:14px;">${u} ${b}\u20AC</span>`}let f=s.id.split("-")[1];m+=`
            <div class="kartenItem" data-id="${s.id}" data-number="${f}" onclick="trainerKarteAusw\xE4hlen('${s.id}')">
              <div>ID: ${s.id}</div>
              <img src="${s.images.small}" alt="${s.name}">
              <div>${d}</div>
            </div>
          `}m+=`
            </div>
          </div>
        `,a.innerHTML=m,document.getElementById("BackBtn").addEventListener("click",()=>{a.classList.add("hidden"),a.classList.remove("shown"),a.innerHTML=""})}catch(o){console.error(o),a.innerHTML=`
          <div id='overlayContent'>
            <h2>Fehler beim Laden.</h2>
            <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
          </div>`,document.getElementById("BackBtn").addEventListener("click",()=>{a.classList.add("hidden"),a.classList.remove("shown"),a.innerHTML=""})}};async function Z(c){var h,d,f,b;let a=[],o=1,m=250,s=!0;for(;s;){let g=`https://api.pokemontcg.io/v2/cards?q=supertype:Trainer subtypes:${c}&orderBy=name&page=${o}&pageSize=${m}`,u=await ee.get({url:g,headers:{Accept:"application/json","X-Api-Key":ie.API_KEY,Connection:"close"}});if(u.status!==200||!((d=(h=u.data)==null?void 0:h.data)!=null&&d.length)){s=!1;break}let v=u.data.data;for(let E of v){let S=(f=E.cardmarket)==null?void 0:f.prices;E.avg30=(b=S==null?void 0:S.avg30)!=null?b:null}a=a.concat(v),v.length<m?s=!1:o++}return a}window.trainerKarteAusw\u00E4hlen=async function(c){var o,m;let a=document.querySelector("#overlay");a.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',a.classList.remove("hidden"),a.classList.add("shown");try{let s=await ee.get({url:`https://api.pokemontcg.io/v2/cards/${c}`,headers:{Accept:"application/json","X-Api-Key":ie.API_KEY,Connection:"close"}});if(s.status!==200){console.error("Fehler beim Abrufen der Karte:",s.status,s);return}let h=s.data.data;h.imageSmall=((o=h.images)==null?void 0:o.small)||null,h.imageLarge=((m=h.images)==null?void 0:m.large)||null;let d=await C(h);if(!d){console.error("Keine ID von insertCard erhalten \u2013 Abbruch.");return}h.id=d,window.cachedCards[h.cardId]=h,a.innerHTML=`
          <div id="overlayContent">
            <h2>Karte hinzugef\xFCgt!</h2>
            <p>Du hast <strong>${c}</strong> ausgew\xE4hlt.</p>
            <br>
            <p>Welche Variante m\xF6chtest du speichern?</p>
            <button class="overlayMenuBtn" id="btnBasic">Basic</button>
            <button class="overlayMenuBtn" id="btnReverse">Reverse</button>
            <button class="overlayMenuBtn" id="btnHolo">Holo</button>
            <br><br>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">\xDCberspringen</button>
          </div>
        `;async function f(b,g){a.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',a.classList.remove("hidden"),a.classList.add("shown");try{b!=="none"&&await $.run(`UPDATE trainer SET ${b} = 1 WHERE id = ?`,[g]);let u=document.getElementById("supporterContainer");u.innerHTML="";let v=document.getElementById("itemContainer");v.innerHTML="";let E=document.getElementById("stadiumContainer");E.innerHTML="";let S=document.getElementById("toolContainer");S.innerHTML="",await X()}catch(u){console.error("Fehler in finalizeTrainerSelection:",u.message,u)}a.classList.add("hidden"),a.classList.remove("shown"),a.innerHTML="",await U()}document.getElementById("btnBasic").addEventListener("click",()=>f("basic",d)),document.getElementById("btnReverse").addEventListener("click",()=>f("reverse",d)),document.getElementById("btnHolo").addEventListener("click",()=>f("holo",d)),document.getElementById("closeOverlayConfirm").addEventListener("click",()=>f("none",d))}catch(s){console.error("Fehler bei trainerKarteAusw\xE4hlen:",s),a.innerHTML=`
          <div id="overlayContent">
            <h2>Fehler beim Hinzuf\xFCgen.</h2>
            <p>${s.message}</p>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">Schlie\xDFen</button>
          </div>
        `,document.getElementById("closeOverlayConfirm").addEventListener("click",()=>{a.classList.add("hidden"),a.classList.remove("shown"),a.innerHTML=""})}};async function J(c,a){var b;let o=document.querySelector("#overlay");o.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',o.classList.remove("hidden"),o.classList.add("shown");let m=await G();if(!m||!m.length)return;let s=[],h={};for(let g of m){let u=await N(g);if(!u)continue;let v=((b=u.subTypes)==null?void 0:b.toLowerCase())||"";(a==="supporter"&&v.includes("supporter")||a==="item"&&v.includes("item")||a==="stadium"&&v.includes("stadium")||a==="tool"&&v.includes("tool"))&&(s.push(g),h[g]=u)}if(!s.length){o.classList.add("hidden"),o.classList.remove("shown");return}let d=s.findIndex(g=>g===c);d===-1&&(d=0);async function f(){let g=s[d],u=h[g]||await N(g);if(!u)return;let v="Unbekannt";u.addedAt&&(v=new Date(u.addedAt).toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}));let E="Keine Angabe";u.basic==1&&(E="Basic"),u.reverse==1&&(E="Reverse"),u.holo==1&&(E="Holo");let S="\u2013",M=await q(u.cardId);if(M==null){let R=H(u.cardId);M=await q(R)}if(M!=null){let R=M.toFixed(2),j="#DEDEDE",_="\u{1FA99}";M>20?(j="#FF4444",_="\u{1F525}"):M>5&&(j="#FFAA00",_="\u{1F4B0}"),S=`<span style="color:${j};">${_} ${R}\u20AC</span>`}o.innerHTML=`
          <div id="overlayContent">
            <button class="closeGallery" id="closeGallery">X</button>
            <h2>Trainer-Karte ansehen</h2>
            <div style="display:flex; align-items:center; justify-content:center;">
              <div style="display:flex; flex-direction:column; align-items:center;">
                <img src="${u.imageHigh}" alt="${g}" style="max-width:300px; max-height:400px; margin:0 20px;">
                <p style="margin-top:10px;">
                  ID: ${u.cardId} | Variante: <strong>${E}</strong><br>
                  30d-Wert: <strong>${S}</strong><br>
                  Hinzugef\xFCgt am: <strong>${v}</strong>
                </p>
              </div>
            </div>
            <button id="prevTrainer">\u2B05\uFE0F</button>
            <button id="nextTrainer">\u27A1\uFE0F</button>
            <br><br>
            <button id="deleteTrainer">\u274C Karte l\xF6schen</button>
          </div>
        `,document.getElementById("prevTrainer").addEventListener("click",()=>{d=(d-1+s.length)%s.length,f()}),document.getElementById("nextTrainer").addEventListener("click",()=>{d=(d+1)%s.length,f()}),document.getElementById("deleteTrainer").addEventListener("click",async()=>{if(confirm("Willst du diese Karte wirklich l\xF6schen?")){await $.run("DELETE FROM trainer WHERE id = ?",[g]),o.classList.add("hidden"),o.classList.remove("shown"),o.innerHTML="";let R=document.getElementById("supporterContainer"),j=document.getElementById("itemContainer"),_=document.getElementById("stadiumContainer"),pe=document.getElementById("toolContainer");R&&(R.innerHTML=""),j&&(j.innerHTML=""),_&&(_.innerHTML=""),pe&&(pe.innerHTML=""),await X(),await U()}}),document.getElementById("closeGallery").addEventListener("click",()=>{o.classList.add("hidden"),o.classList.remove("shown"),o.innerHTML=""})}f()}window.filterTrainerCardsByNumber=function(){let c=document.getElementById("nummerSuche").value.trim();document.querySelectorAll(".kartenItem").forEach(a=>{let o=a.dataset.number;a.style.display=o&&o.startsWith(c)?"block":"none"})},window.zeigeEnergieTabelle=async function(){document.querySelectorAll("#tableToggle button").forEach(m=>m.classList.remove("active")),document.getElementById("showTableEnergie").classList.add("active"),document.getElementById("pokemonFilterContainer").style.display="none",document.getElementById("kartentabelle").classList.add("hidden"),document.getElementById("trainertabelle").classList.add("hidden"),document.getElementById("energietabelle").classList.remove("hidden");let c=document.querySelector("#energietabelle tbody");c.innerHTML="";let a=document.createElement("tr");a.innerHTML=`
        <td>Basis-Energie</td>
        <td>
          <div id="basisEnergieContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openEnergieOverlay('Basic')">+ Basis</button>
        </td>
      `,c.appendChild(a);let o=document.createElement("tr");o.innerHTML=`
        <td>Spezial-Energie</td>
        <td>
          <div id="spezialEnergieContainer" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;"></div>
          <button onclick="openEnergieOverlay('Special')">+ Spezial</button>
        </td>
      `,c.appendChild(o),await ae()};async function ae(){var h,d,f;let c=document.getElementById("basisEnergieContainer"),a=document.getElementById("spezialEnergieContainer"),o=await Q();if(!o||!Array.isArray(o)){console.error("getEnergies() lieferte keine g\xFCltige Liste:",o);return}o.sort((b,g)=>(g.avg30||0)-(b.avg30||0));let m=document.createDocumentFragment(),s=document.createDocumentFragment();for(let b of o){window.cachedCards[b.cardId]=b;let g=document.createElement("img");g.src=b.imageLow,g.alt=b.cardId,g.style.width="50px",g.style.height="69px",g.style.objectFit="cover";let u=((h=b.subTypes)==null?void 0:h.toLowerCase())||"";g.addEventListener("click",()=>yt(b.id,u.includes("basic")?"basic":"special")),(d=b.subTypes)!=null&&d.toLowerCase().includes("basic")?m.appendChild(g):(f=b.subTypes)!=null&&f.toLowerCase().includes("special")&&s.appendChild(g)}c.appendChild(m),a.appendChild(s)}window.openEnergieOverlay=async function(c){let a=document.querySelector("#overlay");a.innerHTML=`
        <div id="overlayContent">
          <h2>Bitte warten...</h2>
          <p>Karten werden geladen</p>
          <div class="loader"></div>
        </div>
      `,a.classList.remove("hidden"),a.classList.add("shown");try{let o=window.cachedEnergyCardsByType[c];if(o||(o=await de(c),o&&(window.cachedEnergyCardsByType[c]=o)),!o||o.length===0){a.innerHTML=`
            <div id='overlayContent'>
              <h2>Keine Karten gefunden.</h2> 
              <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
            </div>
          `,document.getElementById("BackBtn").addEventListener("click",()=>{a.classList.add("hidden"),a.classList.remove("shown"),a.innerHTML=""});return}let m=`
          <div id="overlayContent">
            <button class="closeGallery" id="BackBtn">X</button>
            <h2>Kartenauswahl f\xFCr<br><strong>${c}</strong>:</h2>
            <p>
              Welche Karte m\xF6chtest du hinzuf\xFCgen?<br>
              <input type="text" id="nummerSuche" placeholder="Kartennummer eingeben\u2026" onkeyup="filterEnergieCardsByNumber()">
            </p>
            <div class="kartenGrid">
        `;for(let s of o){let h=s.avg30,d="\u2013";if(h!=null){let b=h.toFixed(2),g="#DEDEDE",u="\u{1FA99}";h>20?(g="#FF4444",u="\u{1F525}"):h>5&&(g="#FFAA00",u="\u{1F4B0}"),d=`<span style="color:${g}; font-size:14px;">${u} ${b}\u20AC</span>`}let f=s.id.split("-")[1];m+=`
            <div class="kartenItem" data-id="${s.id}" data-number="${f}" onclick="energieKarteAusw\xE4hlen('${s.id}')">
              <div>ID: ${s.id}</div>
              <img src="${s.images.small}" alt="${s.name}">
              <div>${d}</div>
            </div>
          `}m+=`
            </div>
          </div>
        `,a.innerHTML=m,document.getElementById("BackBtn").addEventListener("click",()=>{a.classList.add("hidden"),a.classList.remove("shown"),a.innerHTML=""})}catch(o){console.error(o),a.innerHTML=`
          <div id='overlayContent'>
            <h2>Fehler beim Laden.</h2>
            <button class="overlayMenuBtn" id="BackBtn">Schlie\xDFen</button>
          </div>`,document.getElementById("BackBtn").addEventListener("click",()=>{a.classList.add("hidden"),a.classList.remove("shown"),a.innerHTML=""})}};async function de(c){var h,d,f,b;let a=[],o=1,m=250,s=!0;for(;s;){let g=`https://api.pokemontcg.io/v2/cards?q=supertype:Energy subtypes:${c}&orderBy=name&page=${o}&pageSize=${m}`,u=await ee.get({url:g,headers:{Accept:"application/json","X-Api-Key":ie.API_KEY,Connection:"close"}});if(u.status!==200||!((d=(h=u.data)==null?void 0:h.data)!=null&&d.length)){s=!1;break}let v=u.data.data;for(let E of v){let S=(f=E.cardmarket)==null?void 0:f.prices;E.avg30=(b=S==null?void 0:S.avg30)!=null?b:null}a=a.concat(v),v.length<m?s=!1:o++}return a}window.energieKarteAusw\u00E4hlen=async function(c){var o,m;let a=document.querySelector("#overlay");a.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',a.classList.remove("hidden"),a.classList.add("shown");try{let s=await ee.get({url:`https://api.pokemontcg.io/v2/cards/${c}`,headers:{Accept:"application/json","X-Api-Key":ie.API_KEY,Connection:"close"}});if(s.status!==200){console.error("Fehler beim Abrufen der Karte:",s.status,s);return}let h=s.data.data;h.imageSmall=((o=h.images)==null?void 0:o.small)||null,h.imageLarge=((m=h.images)==null?void 0:m.large)||null;let d=await z(h);if(!d){console.error("Keine ID von insertCard erhalten \u2013 Abbruch.");return}h.id=d,window.cachedCards[h.cardId]=h,a.innerHTML=`
          <div id="overlayContent">
            <h2>Karte hinzugef\xFCgt!</h2>
            <p>Du hast <strong>${c}</strong> ausgew\xE4hlt.</p>
            <br>
            <p>Welche Variante m\xF6chtest du speichern?</p>
            <button class="overlayMenuBtn" id="btnBasic">Basic</button>
            <button class="overlayMenuBtn" id="btnReverse">Reverse</button>
            <button class="overlayMenuBtn" id="btnHolo">Holo</button>
            <br><br>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">\xDCberspringen</button>
          </div>
        `;async function f(b,g){a.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',a.classList.remove("hidden"),a.classList.add("shown");try{b!=="none"&&await $.run(`UPDATE energy SET ${b} = 1 WHERE id = ?`,[g]);let u=document.getElementById("basisEnergieContainer");u.innerHTML="";let v=document.getElementById("spezialEnergieContainer");v.innerHTML="",await ae()}catch(u){console.error("Fehler in finalizeEnergieSelection:",u.message,u)}a.classList.add("hidden"),a.classList.remove("shown"),a.innerHTML="",await U()}document.getElementById("btnBasic").addEventListener("click",()=>f("basic",d)),document.getElementById("btnReverse").addEventListener("click",()=>f("reverse",d)),document.getElementById("btnHolo").addEventListener("click",()=>f("holo",d)),document.getElementById("closeOverlayConfirm").addEventListener("click",()=>f("none",d))}catch(s){console.error("Fehler bei energieKarteAusw\xE4hlen:",s),a.innerHTML=`
          <div id="overlayContent">
            <h2>Fehler beim Hinzuf\xFCgen.</h2>
            <p>${s.message}</p>
            <button class="overlayMenuBtn" id="closeOverlayConfirm">Schlie\xDFen</button>
          </div>
        `,document.getElementById("closeOverlayConfirm").addEventListener("click",()=>{a.classList.add("hidden"),a.classList.remove("shown"),a.innerHTML=""})}};async function yt(c,a){var b;let o=document.querySelector("#overlay");o.innerHTML='<div id="overlayContent"><div class="loader"></div></div>',o.classList.remove("hidden"),o.classList.add("shown");let m=await le();if(!m||!m.length)return;let s=[],h={};for(let g of m){let u=await ce(g);if(!u)continue;let v=((b=u.subTypes)==null?void 0:b.toLowerCase())||"";(a==="basic"&&v.includes("basic")||a==="special"&&v.includes("special"))&&(s.push(g),h[g]=u)}if(!s.length){o.classList.add("hidden"),o.classList.remove("shown");return}let d=s.findIndex(g=>g===c);d===-1&&(d=0);async function f(){let g=s[d],u=h[g]||await ce(g);if(!u)return;let v="Unbekannt";u.addedAt&&(v=new Date(u.addedAt).toLocaleString("de-DE",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}));let E="Keine Angabe";u.basic==1&&(E="Basic"),u.reverse==1&&(E="Reverse"),u.holo==1&&(E="Holo");let S="\u2013",M=await q(u.cardId);if(M==null){let R=H(u.cardId);M=await q(R)}if(M!=null){let R=M.toFixed(2),j="#DEDEDE",_="\u{1FA99}";M>20?(j="#FF4444",_="\u{1F525}"):M>5&&(j="#FFAA00",_="\u{1F4B0}"),S=`<span style="color:${j};">${_} ${R}\u20AC</span>`}o.innerHTML=`
          <div id="overlayContent">
            <button class="closeGallery" id="closeGallery">X</button>
            <h2>Energie-Karte ansehen</h2>
            <div style="display:flex; align-items:center; justify-content:center;">
              <div style="display:flex; flex-direction:column; align-items:center;">
                <img src="${u.imageHigh}" alt="${g}" style="max-width:300px; max-height:400px; margin:0 20px;">
                <p style="margin-top:10px;">
                  ID: ${u.cardId} | Variante: <strong>${E}</strong><br>
                  30d-Wert: <strong>${S}</strong><br>
                  Hinzugef\xFCgt am: <strong>${v}</strong>
                </p>
              </div>
            </div>
            <button id="prevEnergie">\u2B05\uFE0F</button>
            <button id="nextEnergie">\u27A1\uFE0F</button>
            <br><br>
            <button id="deleteEnergie">\u274C Karte l\xF6schen</button>
          </div>
        `,document.getElementById("prevEnergie").addEventListener("click",()=>{d=(d-1+s.length)%s.length,f()}),document.getElementById("nextEnergie").addEventListener("click",()=>{d=(d+1)%s.length,f()}),document.getElementById("deleteEnergie").addEventListener("click",async()=>{if(confirm("Willst du diese Karte wirklich l\xF6schen?"))try{await $.run("DELETE FROM energy WHERE id = ?",[g]),o.classList.add("hidden"),o.classList.remove("shown"),o.innerHTML="";let R=document.getElementById("basisEnergieContainer"),j=document.getElementById("spezialEnergieContainer");R&&(R.innerHTML=""),j&&(j.innerHTML=""),await ae(),await U()}catch(R){console.error("Fehler beim L\xF6schen der Energie-Karte:",R),alert("Beim L\xF6schen ist ein Fehler aufgetreten.")}}),document.getElementById("closeGallery").addEventListener("click",()=>{o.classList.add("hidden"),o.classList.remove("shown"),o.innerHTML=""})}f()}window.filterEnergieCardsByNumber=function(){let c=document.getElementById("nummerSuche").value.trim();document.querySelectorAll(".kartenItem").forEach(a=>{let o=a.dataset.number;a.style.display=o&&o.startsWith(c)?"block":"none"})}})()});})();
/*! Bundled license information:

@capacitor/core/dist/index.js:
  (*! Capacitor: https://capacitorjs.com/ - MIT License *)

@capacitor/core/dist/index.js:
  (*! Capacitor: https://capacitorjs.com/ - MIT License *)
*/
