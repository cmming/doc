(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{387:function(t,a,s){"use strict";s.r(a);var e=s(10),r=Object(e.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置"}},[t._v("#")]),t._v(" 配置")]),t._v(" "),a("blockquote",[a("p",[t._v("项目开发中涉及到配置的")])]),t._v(" "),a("h2",{attrs:{id:"多模式-打包和环境变量设置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#多模式-打包和环境变量设置"}},[t._v("#")]),t._v(" 多模式 打包和环境变量设置")]),t._v(" "),a("blockquote",[a("p",[t._v("为不同的环境设置不同的环境变量,使得编译的代码能够适应不同的网路环境")])]),t._v(" "),a("ol",[a("li",[t._v("创建 不同环境的配置文件")])]),t._v(" "),a("blockquote",[a("p",[t._v('命名 规则 例如  "vue-cli-service build --mode tag" 加载的配置文件为 .env.tag')])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("# 创建文件 .env.tag   指定环境\nNODE_ENV = 'tag'\n\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("修改 config.json 文件")])]),t._v(" "),a("div",{staticClass:"language-json extra-class"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[t._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"build:tag"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"vue-cli-service build --mode tag"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n")])])]),a("h2",{attrs:{id:"为项目添加不经过编译的文件和资源"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为项目添加不经过编译的文件和资源"}},[t._v("#")]),t._v(" 为项目添加不经过编译的文件和资源")]),t._v(" "),a("blockquote",[a("p",[t._v("方便后期修改")])]),t._v(" "),a("h3",{attrs:{id:"添加不经过编译的配置文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#添加不经过编译的配置文件"}},[t._v("#")]),t._v(" 添加不经过编译的配置文件")]),t._v(" "),a("ol",[a("li",[t._v("在 public中index.html的头部添加")])]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("script src"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./js/config.js"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('// 使用全局变量的方式引入\nwindow.GLOBAL_CONFIG_SETTING = {\n    UAM_WEB_BASE_API:"/chmi",\n    UAM_WEB_WS_API:"ws:192.168.50.179:99",\n    UAM_FILE_SERVER_URL:"http://192.168.50.179:8082"\n    // UAM_FILE_SERVER_URL:"http://192.168.10.128:8080"\n}\n')])])]),a("p",[t._v("2.不经过编译的资源")]),t._v(" "),a("blockquote",[a("p",[t._v("资源也应该放在public中")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("# 资源路径\n./static/public/...\n")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);