"use strict";(self.webpackChunkmini_chef_app=self.webpackChunkmini_chef_app||[]).push([[226],{226:(n,t,e)=>{e.r(t),e.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var c=e(89),r=e(264),__assign=function(){return __assign=Object.assign||function(n){for(var t,e=1,c=arguments.length;e<c;e++)for(var r in t=arguments[e])Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n},__assign.apply(this,arguments)},i;const __WEBPACK_DEFAULT_EXPORT__=function(){var n=(0,r.useState)([]),t=n[0],e=n[1];return(0,r.useEffect)((function(){fetch("https://jsonplaceholder.typicode.com/albums").then((function(n){return n.json()})).then((function(n){return e(n.splice(1,10))}))}),[]),(0,r.useEffect)((function(){console.log(t)}),[t]),(0,c.jsx)("div",__assign({style:{color:"#ff7535"}},{children:t.map((function(n){return(0,c.jsx)("li",{children:n.title},n.id)}))}))}}}]);