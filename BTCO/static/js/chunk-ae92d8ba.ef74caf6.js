(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ae92d8ba"],{"293e":function(t,n,o){},"5bac":function(t,n,o){"use strict";o.r(n);var i=function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"controlCo"},[o("switchItem")],1)},s=[],e=o("c451"),c=o("8876"),a=function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"switchItem"},[o("div",{staticClass:"open"},[o("span",[t._v("监控开关")]),o("div",{class:"switch"+(t.switchOpen?" switch-click":""),on:{click:function(n){return t.isSwitch()}}})]),o("div",{staticClass:"this"},[o("div",{staticClass:"header"},[o("i",{staticClass:"el-icon-date"}),o("div",{staticClass:"title"},[t._v("监控配置 [单位: /天]")]),o("nav"),o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return t.cleanControl()}}},[t._v("清空")])],1),o("div",{staticClass:"day"},[o("el-input-number",{attrs:{size:"mini",precision:0},model:{value:t.thisDayNum,callback:function(n){t.thisDayNum=n},expression:"thisDayNum"}}),o("nav"),o("el-button",{attrs:{size:"mini",icon:"el-icon-check"},on:{click:function(n){return t.saveChange()}}},[t._v("更改")])],1)])])},p=[],r={methods:{isSwitch:function(){var t=this,n=this;this.$store.commit("thisControl/changeSwitchOpen",!this.switchOpen),this.$copop.load("正在"+(this.switchOpen?"启用":"关闭")+"···",2500),this.$http.post("/config?action=SetControl",{type:this.switchOpen?1:0,day:this.isDay},{emulateJSON:!0}).then((function(o){o.data.status?n.$copop.success((t.switchOpen?"启用":"关闭")+"成功"):n.$copop.warn(o.data.msg)}),(function(n){return t.$copop.warn((t.switchOpen?"启用":"关闭")+"失败，请检查网络或修复面板",2500)}))},saveChange:function(){var t=this;this.$copop.infoUse("现在保存监控天数？",(function(n){n&&(t.isDev?t.$copop.warn("Dev 模式无法配置监控",1500):(t.$copop.load("正在保存···",2500),t.$http.post("/config?action=SetControl",{type:1,day:t.isDay},{emulateJSON:!0}).then((function(n){n.data.status?t.$copop.success("保存成功",1500):t.$copop.warn(n.data.msg)}),(function(n){return t.$copop.warn("保存失败，请检查网络或修复面板",2e3)}))))}))},cleanControl:function(){var t=this;this.$copop.infoUse("现在清空监控？",(function(n){n&&(t.isDev||(t.$copop.load("正在清空···",2500),t.$http.post("/config?action=SetControl",{type:"del"},{emulateJSON:!0}).then((function(n){t.$copop.load("正在重启面板服务······"),t.$http.get("/system?action=ReWeb").then((function(n){t.$copop.success("服务已重启！"),t.Call.$emit("ReloadControl")}))}),(function(n){return t.$copop.warn("清空失败，请检查网络或修复面板",2e3)}))))}))}},computed:Object(e["a"])({},Object(c["b"])("Global",["isDev"]),{},Object(c["b"])("thisControl",["switchOpen","isDay"]),{thisDayNum:{get:function(){return this.isDay},set:function(t){this.$store.commit("thisControl/updateIsDay",t)}}})},u=r,l=(o("e407"),o("e90a")),h=Object(l["a"])(u,a,p,!1,null,"4160044f",null),d=h.exports,f={mounted:function(){var t=this;this.isDev||this.network(),this.Call.$on("ReloadControl",(function(){return t.network()}))},methods:{network:function(){var t=this,n=this;this.$copop.load("正在获取配置···",1500),this.$http.post("/config?action=SetControl",{type:-1},{emulateJSON:!0}).then((function(t){n.load?(n.$copop.success("重试成功",2500),n.load=!1):n.$copop.success("获取成功",1500),n.$store.commit("thisControl/changeSwitchOpen",t.data.status),n.$store.commit("thisControl/updateIsDay",t.data.day)}),(function(o){return t.$copop.warnUse("监控配置获取失败，重试？",(function(t){t?(n.load=!0,n.network()):n.$copop.warn("配置监控将会发生异常")}))}))}},data:function(){return{load:!1}},components:{switchItem:d},computed:Object(e["a"])({},Object(c["b"])("Global",["isDev"]))},m=f,w=(o("8bb3"),Object(l["a"])(m,i,s,!1,null,"c4c657dc",null));n["default"]=w.exports},"6a41":function(t,n,o){},"8bb3":function(t,n,o){"use strict";var i=o("6a41"),s=o.n(i);s.a},e407:function(t,n,o){"use strict";var i=o("293e"),s=o.n(i);s.a}}]);