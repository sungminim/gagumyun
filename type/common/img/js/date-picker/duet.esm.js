import{p as e,w as a,d as t,N as s,a as i,b as r}from"./index-a3afd6e1.js";(()=>{e.t=a.__cssshim;const r=Array.from(t.querySelectorAll("script")).find((e=>new RegExp(`/${s}(\\.esm)?\\.js($|\\?|#)`).test(e.src)||e.getAttribute("data-stencil-namespace")===s)),n={};return n.resourcesUrl=new URL(".",new URL(r.getAttribute("data-resources-url")||r.src,a.location.href)).href,((e,i)=>{const r=`__sc_import_${s.replace(/\s|-/g,"_")}`;try{a[r]=new Function("w",`return import(w);//${Math.random()}`)}catch(s){const n=new Map;a[r]=s=>{const o=new URL(s,e).href;let c=n.get(o);if(!c){const e=t.createElement("script");e.type="module",e.crossOrigin=i.crossOrigin,e.src=URL.createObjectURL(new Blob([`import * as m from '${o}'; window.${r}.m = m;`],{type:"application/javascript"})),c=new Promise((t=>{e.onload=()=>{t(a[r].m),e.remove()}})),n.set(o,c),t.head.appendChild(e)}return c}}})(n.resourcesUrl,r),a.customElements?i(n):__sc_import_duet("./dom-fb6a473e.js").then((()=>n))})().then((e=>r([["duet-date-picker",[[0,"duet-date-picker",{name:[1],identifier:[1],disabled:[516],role:[1],direction:[1],required:[4],value:[1537],min:[1],max:[1],firstDayOfWeek:[2,"first-day-of-week"],localization:[16],dateAdapter:[16],isDateDisabled:[16],activeFocus:[32],focusedDay:[32],open:[32],setFocus:[64],show:[64],hide:[64]},[[6,"click","handleDocumentClick"]]]]]],e)));
