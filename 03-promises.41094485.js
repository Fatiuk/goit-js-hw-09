function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){o[e]=n},n.parcelRequired7c6=i);var r=i("7Y9D8");const l=document.querySelector(".form");function s(e,n){return new Promise(((t,o)=>{const i=Math.random()>.3;setTimeout((()=>{i?t({position:e,delay:n}):o({position:e,delay:n})}),n)}))}l.addEventListener("submit",(n=>{n.preventDefault();let t=parseInt(l.elements.delay.value);const o=parseInt(l.elements.step.value),i=parseInt(l.elements.amount.value);t<0&&o<0&&i<0?e(r).Notify.warning("⚠️ The form should contain only positive values"):function(n,t,o,i){for(;i<o;i+=1)s(i+1,n+i*t).then((({position:n,delay:t})=>{e(r).Notify.success(`✅ Fulfilled promise ${n} in ${t}ms`)})).catch((({position:n,delay:t})=>{e(r).Notify.failure(`❌ Rejected promise ${n} in ${t}ms`)}))}(t,o,i,0)}));
//# sourceMappingURL=03-promises.41094485.js.map
