(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f3f6a90"],{"0868":function(t,e,n){"use strict";var a=n("7739"),r=n.n(a);r.a},"159b":function(t,e,n){var a=n("da84"),r=n("fdbc"),o=n("17c2"),i=n("9112");for(var s in r){var c=a[s],u=c&&c.prototype;if(u&&u.forEach!==o)try{i(u,"forEach",o)}catch(l){u.forEach=o}}},"17c2":function(t,e,n){"use strict";var a=n("b727").forEach,r=n("a640"),o=n("ae40"),i=r("forEach"),s=o("forEach");t.exports=i&&s?[].forEach:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}},"240a":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"profile"},[n("top-nav",{attrs:{title:"个人考勤",isShow:!1}}),n("clock",{attrs:{stationId:t.stationId}}),n("tabs",[n("sign")],1),n("bottom-nav",{attrs:{active:2}})],1)},r=[],o=n("40d6"),i=n("cf7f"),s=n("4819"),c=n("6161"),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("van-tab",{attrs:{title:"签到签退"}},[n("ul",{staticClass:"list"},t._l(t.myJob,(function(e,a){return n("list-layout",{key:a,attrs:{firstLayout:1}},[n("van-icon",{attrs:{slot:"left-icon",size:"40",color:"rgb(81, 125, 252)",name:"clock-o"},slot:"left-icon"}),n("div",{attrs:{slot:"content"},slot:"content"},[n("h4",[t._v(t._s(e.stationName))]),n("div")]),n("div",{staticClass:"sign",attrs:{slot:"right"},slot:"right"},[n("span",{staticClass:"date"},[t._v(t._s(e.operateDate))]),n("van-button",{attrs:{size:"mini",color:"rgb(81, 125, 252)"},on:{click:function(n){return t.handleSignIn(e.stationId)}}},[t._v("签到")]),n("van-button",{attrs:{size:"mini",color:"rgb(81, 125, 252)"},on:{click:function(n){return t.handleSignOut(e.stationId)}}},[t._v("签退")]),n("van-button",{attrs:{size:"mini",color:"rgb(81, 125, 252)"},on:{click:function(n){return t.handleResign(e.stationId)}}},[t._v("补签")])],1)],1)})),1),n("van-dialog",{attrs:{title:"理由","show-cancel-button":""},on:{confirm:t.submitResign},model:{value:t.showResign,callback:function(e){t.showResign=e},expression:"showResign"}},[n("van-field",{attrs:{rows:"1",autosize:"",label:"辞职理由",type:"textarea",placeholder:"请输入辞职的理由"},model:{value:t.remarkContent,callback:function(e){t.remarkContent=e},expression:"remarkContent"}}),n("van-field",{attrs:{rows:"1",autosize:"",label:"空闲时间",type:"textarea",placeholder:"请输入空闲时间"},model:{value:t.spareTime,callback:function(e){t.spareTime=e},expression:"spareTime"}})],1)],1)},l=[],f=(n("4160"),n("159b"),n("96cf"),n("1da1")),d=n("086d"),g={data:function(){return{myJob:[],spareTime:"",remarkContent:"",resignStationId:"",showResign:!1,workDate:"",signTime:""}},components:{ListLayout:d["a"]},methods:{getNow:function(){var t=new Date,e=t.getMonth()<9?"0"+(t.getMonth()+1):t.getMonth()+1,n=t.getDate()<=9?"0"+t.getDate():t.getDate(),a=t.getFullYear()+"-"+e+"-"+n;return a},resignJob:function(t){this.showResign=!0,this.cancleStationId=t},submitResign:function(){var t=this;return Object(f["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=t.$ajax.post("/system/api/student//resignJob",{stationId:t.stationId,remarkContent:t.remarkContent,spareTime:t.spareTime}),200===n.data.code?(t.$toast("辞职成功"),t.getList()):t.$toast("辞职失败"),t.showResign=!1;case 3:case"end":return e.stop()}}),e)})))()},handleSignIn:function(t){var e=this;return Object(f["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log(t),n.next=3,e.$ajax.post("/system/api/student/signInOut",{stationId:t,signStatus:"1",resignStatus:"0",workDate:e.getNow()+""});case 3:a=n.sent,a.data.code,e.$toast(a.data.msg),console.log(a.data);case 6:case"end":return n.stop()}}),n)})))()},handleSignOut:function(t){var e=this;return Object(f["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log(t),n.next=3,e.$ajax.post("/system/api/student/signInOut",{stationId:t,signStatus:"2",resignStatus:"0",workDate:e.getNow()+""});case 3:a=n.sent,a.data.code,e.$toast(a.data.msg),console.log(a.data);case 6:case"end":return n.stop()}}),n)})))()},handleResignIn:function(t){var e=this;return Object(f["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log(t),n.next=3,e.$ajax.post("/system/api/student/signInOut",{stationId:t,signStatus:"1",resignStatus:"1"});case 3:a=n.sent,200===a.data.code&&e.$toast(a.data.msg),console.log(a.data);case 6:case"end":return n.stop()}}),n)})))()},handleResignOut:function(t){var e=this;return Object(f["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log(t),n.next=3,e.$ajax.post("/system/api/student/signInOut",{stationId:t,signStatus:"2",resignStatus:"1"});case 3:a=n.sent,200===a.data.code&&e.$toast(a.data.msg),console.log(a.data);case 6:case"end":return n.stop()}}),n)})))()},getList:function(){var t=this;return Object(f["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$ajax.get("/system/api/student/queryMyJob");case 2:n=e.sent,n.data&&n.data.forEach((function(e){"1"===e.offerState&&t.myJob.push(e)})),console.log(t.myJob);case 5:case"end":return e.stop()}}),e)})))()},handleResign:function(t){this.$router.push({path:"/resign",query:{stationId:t}})}},mounted:function(){this.getList()}},v=g,p=(n("0868"),n("2877")),h=Object(p["a"])(v,u,l,!1,null,"6509b192",null),m=h.exports,b={components:{TopNav:o["a"],BottomNav:i["a"],Tabs:s["a"],Sign:m,Clock:c["a"]},data:function(){return{stationId:2}}},w=b,S=Object(p["a"])(w,a,r,!1,null,"432dffe2",null);e["default"]=S.exports},4160:function(t,e,n){"use strict";var a=n("23e7"),r=n("17c2");a({target:"Array",proto:!0,forced:[].forEach!=r},{forEach:r})},"42f0":function(t,e,n){"use strict";var a=n("7d0c"),r=n.n(a);r.a},4819:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("van-tabs",{attrs:{"title-active-color":"rgb(81, 125, 252)",color:"rgb(48, 52, 253)","line-width":"50%","line-height":"1px"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[t._t("default")],2)},r=[],o={data:function(){return{active:0}}},i=o,s=n("2877"),c=Object(s["a"])(i,a,r,!1,null,null,null);e["a"]=c.exports},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,n){var a=n("1d80"),r=n("5899"),o="["+r+"]",i=RegExp("^"+o+o+"*"),s=RegExp(o+o+"*$"),c=function(t){return function(e){var n=String(a(e));return 1&t&&(n=n.replace(i,"")),2&t&&(n=n.replace(s,"")),n}};t.exports={start:c(1),end:c(2),trim:c(3)}},6161:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"clock"},[n("van-icon",{attrs:{size:"40",name:"todo-list-o",color:"rgb(81, 125, 252)"}}),n("span",[t._v(" 工时明细查询"),n("van-icon",{attrs:{name:"arrow"},on:{click:function(e){return t.$router.push("/hourDetail")}}}),n("br")],1),n("span",[t._v(" 考勤记录查询"),n("van-icon",{attrs:{name:"arrow"},on:{click:function(e){return t.$router.push("/record")}}})],1)],1)},r=[],o=(n("a9e3"),{name:"clock",props:{stationId:Number},data:function(){return{sturdyTotalTime:0}},methods:{getNowMonth:function(){var t=new Date,e=t.getMonth()<9?"0"+(t.getMonth()+1):t.getMonth()+1,n=t.getFullYear()+"-"+e;return n},getNowMonthDays:function(){var t=new Date,e=new Date(t.getFullYear(),t.getMonth()+1,0).getDate();return console.log(e),e}},mounted:function(){}}),i=o,s=(n("42f0"),n("2877")),c=Object(s["a"])(i,a,r,!1,null,"93a666f4",null);e["a"]=c.exports},7156:function(t,e,n){var a=n("861d"),r=n("d2bb");t.exports=function(t,e,n){var o,i;return r&&"function"==typeof(o=e.constructor)&&o!==n&&a(i=o.prototype)&&i!==n.prototype&&r(t,i),t}},7739:function(t,e,n){},"7d0c":function(t,e,n){},a640:function(t,e,n){"use strict";var a=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&a((function(){n.call(null,e||function(){throw 1},1)}))}},a9e3:function(t,e,n){"use strict";var a=n("83ab"),r=n("da84"),o=n("94ca"),i=n("6eeb"),s=n("5135"),c=n("c6b6"),u=n("7156"),l=n("c04e"),f=n("d039"),d=n("7c73"),g=n("241c").f,v=n("06cf").f,p=n("9bf2").f,h=n("58a8").trim,m="Number",b=r[m],w=b.prototype,S=c(d(w))==m,I=function(t){var e,n,a,r,o,i,s,c,u=l(t,!1);if("string"==typeof u&&u.length>2)if(u=h(u),e=u.charCodeAt(0),43===e||45===e){if(n=u.charCodeAt(2),88===n||120===n)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:a=2,r=49;break;case 79:case 111:a=8,r=55;break;default:return+u}for(o=u.slice(2),i=o.length,s=0;s<i;s++)if(c=o.charCodeAt(s),c<48||c>r)return NaN;return parseInt(o,a)}return+u};if(o(m,!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var x,k=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof k&&(S?f((function(){w.valueOf.call(n)})):c(n)!=m)?u(new b(I(e)),n,k):I(e)},y=a?g(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),L=0;y.length>L;L++)s(b,x=y[L])&&!s(k,x)&&p(k,x,v(b,x));k.prototype=w,w.constructor=k,i(r,m,k)}},ae40:function(t,e,n){var a=n("83ab"),r=n("d039"),o=n("5135"),i=Object.defineProperty,s={},c=function(t){throw t};t.exports=function(t,e){if(o(s,t))return s[t];e||(e={});var n=[][t],u=!!o(e,"ACCESSORS")&&e.ACCESSORS,l=o(e,0)?e[0]:c,f=o(e,1)?e[1]:void 0;return s[t]=!!n&&!r((function(){if(u&&!a)return!0;var t={length:-1};u?i(t,1,{enumerable:!0,get:c}):t[1]=1,n.call(t,l,f)}))}},b727:function(t,e,n){var a=n("0366"),r=n("44ad"),o=n("7b0b"),i=n("50c4"),s=n("65f0"),c=[].push,u=function(t){var e=1==t,n=2==t,u=3==t,l=4==t,f=6==t,d=5==t||f;return function(g,v,p,h){for(var m,b,w=o(g),S=r(w),I=a(v,p,3),x=i(S.length),k=0,y=h||s,L=e?y(g,x):n?y(g,0):void 0;x>k;k++)if((d||k in S)&&(m=S[k],b=I(m,k,w),t))if(e)L[k]=b;else if(b)switch(t){case 3:return!0;case 5:return m;case 6:return k;case 2:c.call(L,m)}else if(l)return!1;return f?-1:u||l?l:L}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},cf7f:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("van-tabbar",{attrs:{"inactive-color":"#333","active-color":"#004efd"},model:{value:t.activeValue,callback:function(e){t.activeValue=e},expression:"activeValue"}},[n("van-tabbar-item",{attrs:{to:"/employment",icon:"friends"}},[t._v("应聘")]),n("van-tabbar-item",{attrs:{to:"/notify",icon:"bell"}},[t._v("公告")]),n("van-tabbar-item",{attrs:{to:"/checkWork",icon:"sign"}},[t._v("考勤")]),n("van-tabbar-item",{attrs:{to:"/policy",icon:"newspaper-o"}},[t._v("政策")]),n("van-tabbar-item",{attrs:{to:"/studentInfo",icon:"manager"}},[t._v("我的")])],1)},r=[],o={props:["active"],data:function(){return{activeValue:0}},mounted:function(){this.activeValue=this.$props.active}},i=o,s=n("2877"),c=Object(s["a"])(i,a,r,!1,null,null,null);e["a"]=c.exports},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-5f3f6a90.b2939dd5.js.map