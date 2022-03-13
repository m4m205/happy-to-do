import{o as u,c as p,a as e,b as x,w as $,u as k,R as C,d as R,e as A,r as b,f as w,v as H,i as j,g as F,t as P,n as q,p as S,h as B,j as U,F as E,k as O,l as G,m as J,q as W,s as z,x as K}from"./vendor.5f4e63dc.js";const Y=function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerpolicy&&(i.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?i.credentials="include":t.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}};Y();const Q={class:"d-flex flex-column min-vh-100"},X={class:"navbar navbar-expand-md navbar-light",style:{"background-color":"#e3f2fd"}},Z={class:"container-fluid"},ee=e("a",{class:"navbar-brand",href:"#"},"Happy to-do",-1),te=e("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"},[e("span",{class:"navbar-toggler-icon"})],-1),oe={class:"collapse navbar-collapse",id:"navbarText"},ne={class:"navbar-nav me-auto mb-2 mb-md-0"},ae={class:"nav-item"},se=A("Home"),ie={class:"nav-item"},le=A("About"),ce={class:"container"},re=e("footer",{class:"mt-auto bg-secondary bg-gradient text-white-75"},[e("p",{class:"text-end fw-bold pe-2 pt-1 align-middle"}," developed by: Mahmoud Almorahlee ")],-1),de={setup(a){return(l,n)=>(u(),p("div",Q,[e("nav",X,[e("div",Z,[ee,te,e("div",oe,[e("ul",ne,[e("li",ae,[x(k(C),{class:"nav-link active","aria-current":"page",to:"/"},{default:$(()=>[se]),_:1})]),e("li",ie,[x(k(C),{class:"nav-link active","aria-current":"page",to:"/about"},{default:$(()=>[le]),_:1})])])])])]),e("div",ce,[x(k(R))]),re]))}},ue="modulepreload",T={},me="/",L=function(l,n){return!n||n.length===0?l():Promise.all(n.map(o=>{if(o=`${me}${o}`,o in T)return;T[o]=!0;const t=o.endsWith(".css"),i=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${i}`))return;const s=document.createElement("link");if(s.rel=t?"stylesheet":ue,t||(s.as="script",s.crossOrigin=""),s.href=o,document.head.appendChild(s),t)return new Promise((h,y)=>{s.addEventListener("load",h),s.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>l())};class f{static getLists(){return fetch("https://todo-api.niveaubepaling.nl/list",{method:"GET",headers:{Accept:"application/json",Origin:"*","Content-type":"application/json"}}).then(n=>n.ok?n:Promise.reject(n))}static getItems(l){const n={method:"GET",headers:{Accept:"application/json",Origin:"*","Content-type":"application/json"}};return fetch(`https://todo-api.niveaubepaling.nl/list/${l}`,n).then(o=>o.ok?o:Promise.reject(o))}static addItem(l,n){const o={method:"POST",headers:{Accept:"application/json",Origin:"*","Content-type":"application/json"},body:JSON.stringify(n)};return fetch(`https://todo-api.niveaubepaling.nl/list/${l}`,o).then(t=>t.ok?t:Promise.reject(t))}static updateItem(l,n,o){const t={method:"PATCH",headers:{Accept:"application/json",Origin:"*","Content-type":"application/json"},body:JSON.stringify(o)};return fetch(`https://todo-api.niveaubepaling.nl/list/${l}/${n}`,t).then(i=>i.ok?i:Promise.reject(i))}static deleteItem(l,n){const o={method:"DELETE",headers:{Accept:"application/json",Origin:"*","Content-type":"application/json"}};return fetch(`https://todo-api.niveaubepaling.nl/list/${l}/${n}`,o).then(t=>t.ok?t:Promise.reject(t))}}var N=(a,l)=>{const n=a.__vccOpts||a;for(const[o,t]of l)n[o]=t;return n};const pe=a=>(S("data-v-4c09ae22"),a=a(),B(),a),he={class:"card p-2 mb-3 rounded-3"},ve={class:"nav justify-content-end item-header"},_e=pe(()=>e("i",{class:"bi bi-info-circle text-info px-1"},null,-1)),fe={key:0,class:"input-group"},be={class:"input-group-text"},ge=["checked"],ye={key:1,class:"input-group"},xe={class:"input-group-text"},ke=["checked","value"],Ie={props:{itemText:String,isItemCompleted:Boolean,itemId:Number},emits:["update","delete"],setup(a,{emit:l}){const n=b(!1),o=()=>{n.value=!0,setTimeout(()=>{document.getElementById("item-text-input").focus()},0)},t=()=>{n.value=!1};return(i,s)=>(u(),p("div",he,[e("div",ve,[e("i",{class:"bi bi-check-circle-fill text-success px-1",onClick:t}),e("i",{class:"bi bi-trash3-fill text-danger px-1",onClick:s[0]||(s[0]=h=>i.$emit("delete",a.itemId)),"data-bs-toggle":"modal","data-bs-target":"#delete-overlay"}),_e]),n.value?(u(),p("div",fe,[e("div",be,[e("input",{class:"form-check-input mt-0",type:"checkbox",value:"",checked:a.isItemCompleted,"aria-label":"Checkbox for following text input"},null,8,ge)]),w(e("input",{id:"item-text-input","onUpdate:modelValue":s[1]||(s[1]=h=>j(itemText)?itemText.value=h:null),type:"text",class:"form-control","aria-label":"Text input with checkbox"},null,512),[[H,a.itemText]])])):(u(),p("div",ye,[e("div",xe,[w(e("input",{class:"form-check-input mt-0",type:"checkbox","aria-label":"Checkbox for following text input",checked:a.isItemCompleted,value:a.itemId,"onUpdate:modelValue":s[2]||(s[2]=h=>j(isItemCompleted)?isItemCompleted.value=h:null)},null,8,ke),[[F,a.isItemCompleted]])]),e("p",{class:q(["form-control mb-0",{"text-decoration-line-through":a.isItemCompleted}]),onClick:o},P(a.itemText),3)]))]))}};var $e=N(Ie,[["__scopeId","data-v-4c09ae22"]]);const g=a=>(S("data-v-004f92ef"),a=a(),B(),a),Ce={class:"container shadow-sm p-5"},we=g(()=>e("div",{id:"spinner-overlay",class:"modal",tabindex:"-1","aria-labelledby":"spinnerModalLabel","aria-hidden":"true"},[e("div",{class:"d-flex align-items-center justify-content-center h-100 modal-dialog"},[e("div",{class:"spinner-border text-primary",role:"status"},[e("span",{class:"visually-hidden",id:"spinnerModalLabel"},"Loading...")])])],-1)),je={id:"delete-overlay",class:"modal fade",tabindex:"-1","aria-labelledby":"confirmModalLabel","aria-hidden":"true"},Ee={class:"modal-dialog"},Oe={class:"modal-content"},Te=g(()=>e("div",{class:"modal-header"},[e("h5",{class:"modal-title",id:"confirmModalLabel"},"Confirm")],-1)),Le=g(()=>e("div",{class:"modal-body"}," Are you sure you want to delete this item? ",-1)),Ae={class:"modal-footer"},Pe={class:"row justify-content-between g-3"},Se={class:"col-3 p-3 gx-3 shadow"},Be=["onClick"],Ne={class:"p-2 mb-0"},De={class:"col-8 p-3 gx-3 shadow"},Ve=g(()=>e("div",{class:"input-group-text shadow-sm mb-3"},[e("input",{id:"new-item-input",type:"text",class:"form-control",placeholder:"Add to-do item here"})],-1)),Me={key:0},Re={setup(a){const l=b([]),n=b([]),o=b(null),t=b(null);let i={};U(()=>{i=new bootstrap.Modal(document.getElementById("spinner-overlay"),{keyboard:!1});const r=document.getElementById("delete-overlay"),d=document.getElementById("cancel-delete");document.getElementById("new-item-input").addEventListener("keydown",function(m){m.key==="Enter"&&(m.preventDefault(),h(m.target.value))}),r.addEventListener("shown.bs.modal",function(){d.focus()}),i.show(),f.getLists().then(m=>{m.json().then(v=>{var I;((I=v.data)==null?void 0:I.length)>0&&(l.value=v.data,o.value=v.data[0].id,s(o.value)),setTimeout(()=>{i.hide()},250)})}).catch(()=>_.push({name:"error"}))});const s=r=>{f.getItems(r).then(d=>{d.json().then(c=>{var m,v;((v=(m=c.data)==null?void 0:m.items)==null?void 0:v.length)>0&&(n.value=c.data.items)})}).catch(()=>_.push({name:"error"}))},h=r=>{const d={name:r.trim()};f.addItem(o.value,d).then(c=>{c.json().then(()=>{document.getElementById("new-item-input").value="",s(o.value)}).catch(()=>_.push({name:"error"}))})};function y(r){const d={completed:r.target.checked};f.updateItem(o.value,r.target.value,d).then(c=>{c.json().then(()=>s(o.value)).catch(()=>_.push({name:"error"}))})}function V(r){t.value=r}function M(){t.value!==null&&f.deleteItem(o.value,t.value).then(r=>{r.json().then(()=>s(o.value)).catch(()=>_.push({name:"error"}))})}return(r,d)=>(u(),p("main",Ce,[we,e("div",je,[e("div",Ee,[e("div",Oe,[Te,Le,e("div",Ae,[e("button",{id:"cancel-delete",type:"button",class:"btn btn-primary","data-bs-dismiss":"modal",onClick:d[0]||(d[0]=()=>t.value=null)}," No "),e("button",{id:"confirm-delete",type:"button",class:"btn btn-danger","data-bs-dismiss":"modal",onClick:M}," Yes ")])])])]),e("div",Pe,[e("div",Se,[(u(!0),p(E,null,O(l.value,c=>(u(),p("div",{key:c.id,onClick:m=>s(c.id),class:"card d-flex align-items-center justify-content-center text-center mb-2 list-card"},[e("p",Ne,P(c.name),1)],8,Be))),128))]),e("div",De,[Ve,n.value.length>0?(u(),p("div",Me,[(u(!0),p(E,null,O(n.value.slice().reverse(),c=>(u(),J($e,{key:c.id,"item-text":c.name,"is-item-completed":c.completed,"item-id":c.id,onDelete:V,onChange:y},null,8,["item-text","is-item-completed","item-id"]))),128))])):G("",!0)])])]))}};var He=N(Re,[["__scopeId","data-v-004f92ef"]]);const _=W({history:z("/"),routes:[{path:"/",name:"home",component:He},{path:"/about",name:"about",component:()=>L(()=>import("./AboutView.92554748.js"),["assets/AboutView.92554748.js","assets/vendor.5f4e63dc.js"])},{path:"/error",name:"error",component:()=>L(()=>import("./ErrorView.ab921788.js"),["assets/ErrorView.ab921788.js","assets/vendor.5f4e63dc.js"])}]}),D=K(de);D.use(_);D.mount("#app");export{N as _};
