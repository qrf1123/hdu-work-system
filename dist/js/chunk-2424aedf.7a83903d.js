(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2424aedf"],{"159b":function(t,e,a){var n=a("da84"),r=a("fdbc"),s=a("17c2"),i=a("9112");for(var o in r){var c=n[o],l=c&&c.prototype;if(l&&l.forEach!==s)try{i(l,"forEach",s)}catch(u){l.forEach=s}}},"17c2":function(t,e,a){"use strict";var n=a("b727").forEach,r=a("a640"),s=a("ae40"),i=r("forEach"),o=s("forEach");t.exports=i&&o?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"34b2":function(t,e,a){"use strict";var n=a("5666"),r=a.n(n);r.a},4160:function(t,e,a){"use strict";var n=a("23e7"),r=a("17c2");n({target:"Array",proto:!0,forced:[].forEach!=r},{forEach:r})},4819:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("van-tabs",{attrs:{"title-active-color":"rgb(81, 125, 252)",color:"rgb(48, 52, 253)","line-width":"50%","line-height":"1px"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[t._t("default")],2)},r=[],s={data:function(){return{active:0}}},i=s,o=a("2877"),c=Object(o["a"])(i,n,r,!1,null,null,null);e["a"]=c.exports},5666:function(t,e,a){},"65fd":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("van-tabbar",{attrs:{"inactive-color":"#333","active-color":"#004efd"},model:{value:t.activeValue,callback:function(e){t.activeValue=e},expression:"activeValue"}},[a("van-tabbar-item",{attrs:{to:"/message",icon:"chat-o"}},[t._v("消息")]),a("van-tabbar-item",{attrs:{to:"/Tnotify",icon:"bell"}},[t._v("公告")]),a("van-tabbar-item",{attrs:{to:"/Tpolicy",icon:"newspaper-o"}},[t._v("政策")]),a("van-tabbar-item",{attrs:{to:"/publish",icon:"edit"}},[t._v("发布")]),a("van-tabbar-item",{attrs:{to:"/admission",icon:"bag-o"}},[t._v("录取")]),a("van-tabbar-item",{attrs:{to:"/confirm",icon:"sign"}},[t._v("工时")]),a("van-tabbar-item",{attrs:{to:"/teacherInfo",icon:"manager"}},[t._v("我的")])],1)},r=[],s={props:["active"],data:function(){return{activeValue:0}},activated:function(){this.activeValue=this.$props.active},mounted:function(){this.activeValue=this.$props.active}},i=s,o=a("2877"),c=Object(o["a"])(i,n,r,!1,null,null,null);e["a"]=c.exports},"7d2e":function(t,e,a){},"7e4f":function(t,e,a){},"8bf9":function(t,e,a){"use strict";var n=a("7e4f"),r=a.n(n);r.a},a434:function(t,e,a){"use strict";var n=a("23e7"),r=a("23cb"),s=a("a691"),i=a("50c4"),o=a("7b0b"),c=a("65f0"),l=a("8418"),u=a("1dde"),f=a("ae40"),d=u("splice"),p=f("splice",{ACCESSORS:!0,0:0,1:2}),h=Math.max,v=Math.min,m=9007199254740991,b="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!d||!p},{splice:function(t,e){var a,n,u,f,d,p,g=o(this),w=i(g.length),S=r(t,w),x=arguments.length;if(0===x?a=n=0:1===x?(a=0,n=w-S):(a=x-2,n=v(h(s(e),0),w-S)),w+a-n>m)throw TypeError(b);for(u=c(g,n),f=0;f<n;f++)d=S+f,d in g&&l(u,f,g[d]);if(u.length=n,a<n){for(f=S;f<w-n;f++)d=f+n,p=f+a,d in g?g[p]=g[d]:delete g[p];for(f=w;f>w-n+a;f--)delete g[f-1]}else if(a>n)for(f=w-n;f>S;f--)d=f+n-1,p=f+a-1,d in g?g[p]=g[d]:delete g[p];for(f=0;f<a;f++)g[f+S]=arguments[f+2];return g.length=w-n+a,u}})},a640:function(t,e,a){"use strict";var n=a("d039");t.exports=function(t,e){var a=[][t];return!!a&&n((function(){a.call(null,e||function(){throw 1},1)}))}},ae40:function(t,e,a){var n=a("83ab"),r=a("d039"),s=a("5135"),i=Object.defineProperty,o={},c=function(t){throw t};t.exports=function(t,e){if(s(o,t))return o[t];e||(e={});var a=[][t],l=!!s(e,"ACCESSORS")&&e.ACCESSORS,u=s(e,0)?e[0]:c,f=s(e,1)?e[1]:void 0;return o[t]=!!a&&!r((function(){if(l&&!n)return!0;var t={length:-1};l?i(t,1,{enumerable:!0,get:c}):t[1]=1,a.call(t,u,f)}))}},b727:function(t,e,a){var n=a("0366"),r=a("44ad"),s=a("7b0b"),i=a("50c4"),o=a("65f0"),c=[].push,l=function(t){var e=1==t,a=2==t,l=3==t,u=4==t,f=6==t,d=5==t||f;return function(p,h,v,m){for(var b,g,w=s(p),S=r(w),x=n(h,v,3),y=i(S.length),k=0,L=m||o,_=e?L(p,y):a?L(p,0):void 0;y>k;k++)if((d||k in S)&&(b=S[k],g=x(b,k,w),t))if(e)_[k]=g;else if(g)switch(t){case 3:return!0;case 5:return b;case 6:return k;case 2:c.call(_,b)}else if(u)return!1;return f?-1:l||u?u:_}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6)}},de05:function(t,e,a){"use strict";var n=a("7d2e"),r=a.n(n);r.a},e516:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"publish"},[a("top-nav",{attrs:{title:"发布管理",isShow:!1}}),a("van-cell",{attrs:{center:"",title:"发布用工",icon:"wap-nav"},scopedSlots:t._u([{key:"right-icon",fn:function(){return[a("van-icon",{attrs:{name:"plus",size:"16"},on:{click:function(e){return t.$router.push("/publishment")}}})]},proxy:!0}])}),a("tabs",[a("shenpi"),a("mystations")],1),a("bottom-nav",{attrs:{active:3}})],1)},r=[],s=(a("4160"),a("fb6a"),a("a434"),a("159b"),a("96cf"),a("1da1")),i=a("40d6"),o=a("65fd"),c=a("4819"),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("van-tab",{attrs:{title:"审批流程"}},[a("van-dialog",{model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[a("van-steps",{attrs:{active:0,direction:"vertical","active-color":"rgb(36, 126, 255)","active-icon":"success"}},[a("van-step",[t._v("用工老师")]),a("van-step",[t._v("本部门/学院二级管理员")])],1)],1),a("ul",{staticClass:"list"},[a("van-list",{attrs:{finished:t.finished,"finished-text":"加载完成!!!"},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.publishList,(function(e,n){return a("list-layout",{key:n,attrs:{firstLayout:0}},[a("van-icon",{attrs:{slot:"left-icon",size:"40",color:"rgb(81, 125, 252)",name:"info"},slot:"left-icon"}),a("div",{attrs:{slot:"content"},slot:"content"},[a("h4",[t._v(t._s(e.flowName))]),a("div",[a("span",[t._v(t._s(e.updateTime))])])]),a("div",{attrs:{slot:"right"},slot:"right"},[a("span",{staticClass:"date"},[t._v(t._s(e.flowState))]),a("div",{staticClass:"right-bottom"},["被驳回"===e.flowState?a("van-icon",{attrs:{size:"20",color:"rgb(81, 125, 252)",name:"edit"},on:{click:function(a){return t.toEdit(e.flowId,e.flowName)}}}):t._e(),"审核中"===e.flowState?a("van-button",{staticStyle:{"margin-left":"10px"},attrs:{color:"rgb(81, 125, 252)",size:"mini"},on:{click:function(a){return t.handleStep(e.flowId)}}},[t._v("查看审批")]):t._e(),"被驳回"===e.flowState?a("van-button",{staticStyle:{"margin-left":"10px"},attrs:{color:"rgb(81, 125, 252)",size:"mini"},on:{click:function(a){return t.deleteFlowApply(e.flowId)}}},[t._v("删除申请")]):t._e()],1)])],1)})),1)],1)],1)},u=[],f=a("086d"),d={data:function(){return{publishList:[],show:!1,processStatus:1,pageNum:1,loading:!1,finished:!1,flowSteps:[]}},components:{ListLayout:f["a"]},methods:{handleDelete:function(t,e){var a=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log(a.publishList[t]),n.next=3,a.$ajax.post("/api/activiti/deleteProcess",{processInstanceId:e});case 3:r=n.sent,console.log(r.data),200===r.data.code?(a.publishList.splice(t,1),a.$toast.success(r.msg)):a.$toast.fail("删除失败，请稍后重试！");case 6:case"end":return n.stop()}}),n)})))()},deleteFlowApply:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.$ajax.post("/system/flows/deleteFlow",{flowId:t});case 2:n=a.sent,200===n.data.code?(e.$toast("删除成功"),e.finished=!1,e.getPublish()):e.$toast("删除失败，请重试");case 4:case"end":return a.stop()}}),a)})))()},toEdit:function(t,e){console.log(t,e),this.$router.push({path:"/edit",query:{flowId:t,flowName:e}})},getPublish:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$ajax.get("/system/flows/queryMyFlows");case 2:a=e.sent,200===a.data.code&&(a.data.data.forEach((function(t){switch(t.createTime=t.createTime.slice(0,10),t.updateTime?t.updateTime=t.updateTime.slice(0,10):t.updateTime=t.createTime,t.flowState){case"1":t.flowState="已归档";break;case"2":t.flowState="已删除";break;case"3":t.flowState="审核中";break;case"4":t.flowState="被驳回";break;default:break}})),t.publishList=a.data.data,console.log(t.publishList),t.finished=!0);case 4:case"end":return e.stop()}}),e)})))()},handleStep:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.show=!0,a.next=3,e.$ajax.get("/system/flows/queryFlowOpers",{params:{flowId:t}});case 3:n=a.sent,e.flowSteps=n.data.data,console.log(e.flowSteps),e.flowSteps=e.sortAscByKey(e.flowSteps,"operStatus"),console.log(e.flowSteps);case 8:case"end":return a.stop()}}),a)})))()},sortAscByKey:function(t,e){return t.sort((function(t,a){var n=t[e],r=a[e];return n<r?-1:n>r?1:0}))}},mounted:function(){this.getPublish()}},p=d,h=(a("34b2"),a("2877")),v=Object(h["a"])(p,l,u,!1,null,"fd47b4ca",null),m=v.exports,b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("van-tab",{attrs:{title:"我的岗位"}},[a("ul",{staticClass:"list"},[a("van-list",{attrs:{finished:t.finished,"finished-text":"加载完成!!!"},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.publishList,(function(e,n){return a("list-layout",{key:n,attrs:{firstLayout:0}},[a("van-icon",{attrs:{slot:"left-icon",size:"40",color:"rgb(81, 125, 252)",name:"info"},slot:"left-icon"}),a("div",{attrs:{slot:"content"},slot:"content"},[a("h4",{on:{click:function(a){return t.handleDetail(e.stationId)}}},[t._v(t._s(e.stationName))]),a("div",[a("span",[t._v(t._s(e.workStartTime))])])]),a("div",{attrs:{slot:"right"},slot:"right"},[a("span",{staticClass:"date"},[t._v(t._s(e.stationState))]),a("div",{staticClass:"right-bottom"},["已生效"===e.stationState?a("van-button",{staticStyle:{"margin-left":"10px"},attrs:{color:"rgb(81, 125, 252)",size:"mini"},on:{click:function(a){return t.handleStart(e.stationId)}}},[t._v("开始")]):t._e(),"已开始"===e.stationState?a("van-button",{staticStyle:{"margin-left":"10px"},attrs:{color:"rgb(81, 125, 252)",size:"mini"},on:{click:function(a){return t.handleStop(e.stationId)}}},[t._v("结束")]):t._e()],1)])],1)})),1)],1)])},g=[],w={data:function(){return{publishList:[],show:!1,processStatus:0,pageNum:1,loading:!1,finished:!1}},components:{ListLayout:f["a"]},methods:{handleStart:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.$ajax.post("/system/api/teacher/startStation",{stationId:t});case 2:n=a.sent,200===n.data.code?(e.$toast("成功开始该岗位!"),e.getPublish()):e.$toast("操作失败,请重试～");case 4:case"end":return a.stop()}}),a)})))()},handleStop:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.$ajax.post("/system/api/teacher/endStation",{stationId:t});case 2:n=a.sent,200===n.data.code?(e.$toast("成功结束该岗位!"),e.getPublish()):e.$toast("操作失败,请重试～");case 4:case"end":return a.stop()}}),a)})))()},handleDelete:function(t,e){var a=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log(a.publishList[t]),n.next=3,a.$ajax.post("/api/activiti/deleteProcess",{processInstanceId:e});case 3:r=n.sent,console.log(r.data),200===r.data.code?(a.publishList.splice(t,1),a.$toast.success(r.msg)):a.$toast.fail("删除失败，请稍后重试！");case 6:case"end":return n.stop()}}),n)})))()},handleDetail:function(t){this.$router.push({path:"/jobInfo",query:{stationId:t}})},getPublish:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$ajax.get("/system/api/teacher/queryTeacherStation");case 2:a=e.sent,a.data&&(a.data.forEach((function(t){switch(t.workStartTime=t.workStartTime.slice(0,10),t.stationState){case"1":t.stationState="已生效";break;case"2":t.stationState="已删除";break;case"3":t.stationState="已开始";break;case"4":t.stationState="已结束";break;default:break}})),t.publishList=a.data,console.log(t.publishList),t.finished=!0);case 4:case"end":return e.stop()}}),e)})))()},handleStep:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.show=!0,a.next=3,e.$ajax.get("/api/activiti/queryTaskDetails",{params:{processInstanceId:t}});case 3:n=a.sent,console.log(n.data),r=n.data.data[0].rejectStatus,e.processStatus=parseInt(r);case 7:case"end":return a.stop()}}),a)})))()}},mounted:function(){this.getPublish()}},S=w,x=(a("de05"),Object(h["a"])(S,b,g,!1,null,"622f4ef0",null)),y=x.exports,k={data:function(){return{publishList:[],show:!1,processStatus:0,pageNum:1,loading:!1,finished:!1}},components:{TopNav:i["a"],BottomNav:o["a"],Tabs:c["a"],shenpi:m,mystations:y},methods:{handleDelete:function(t,e){var a=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log(a.publishList[t]),n.next=3,a.$ajax.post("/api/activiti/deleteProcess",{processInstanceId:e});case 3:r=n.sent,console.log(r.data),200===r.data.code?(a.publishList.splice(t,1),a.$toast.success(r.msg)):a.$toast.fail("删除失败，请稍后重试！");case 6:case"end":return n.stop()}}),n)})))()},handleDetail:function(t){this.$router.push({path:"/jobInfo",query:{processInstanceId:t}})},getPublish:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$ajax.get("/system/flows/queryMyFlows");case 2:a=e.sent,200===a.data.code&&(a.data.data.forEach((function(t){switch(t.createTime=t.createTime.slice(0,10),t.updateTime?t.updateTime=t.updateTime.slice(0,10):t.updateTime=t.createTime,t.flowState){case"1":t.flowState="已归档";break;case"2":t.flowState="已删除";break;case"3":t.flowState="审批中";break;case"4":t.flowState="被驳回";break;default:break}})),t.publishList=a.data.data,console.log(t.publishList),t.finished=!0);case 4:case"end":return e.stop()}}),e)})))()},handleStep:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.show=!0,a.next=3,e.$ajax.get("/api/activiti/queryTaskDetails",{params:{processInstanceId:t}});case 3:n=a.sent,console.log(n.data),r=n.data.data[0].rejectStatus,e.processStatus=parseInt(r);case 7:case"end":return a.stop()}}),a)})))()}},mounted:function(){this.getPublish()}},L=k,_=(a("8bf9"),Object(h["a"])(L,n,r,!1,null,"8c30ebda",null));e["default"]=_.exports},fb6a:function(t,e,a){"use strict";var n=a("23e7"),r=a("861d"),s=a("e8b5"),i=a("23cb"),o=a("50c4"),c=a("fc6a"),l=a("8418"),u=a("b622"),f=a("1dde"),d=a("ae40"),p=f("slice"),h=d("slice",{ACCESSORS:!0,0:0,1:2}),v=u("species"),m=[].slice,b=Math.max;n({target:"Array",proto:!0,forced:!p||!h},{slice:function(t,e){var a,n,u,f=c(this),d=o(f.length),p=i(t,d),h=i(void 0===e?d:e,d);if(s(f)&&(a=f.constructor,"function"!=typeof a||a!==Array&&!s(a.prototype)?r(a)&&(a=a[v],null===a&&(a=void 0)):a=void 0,a===Array||void 0===a))return m.call(f,p,h);for(n=new(void 0===a?Array:a)(b(h-p,0)),u=0;p<h;p++,u++)p in f&&l(n,u,f[p]);return n.length=u,n}})},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-2424aedf.7a83903d.js.map