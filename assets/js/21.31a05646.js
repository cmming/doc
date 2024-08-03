(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{297:function(t,a,s){t.exports=s.p+"assets/img/ssh_password.16fffdf1.png"},298:function(t,a,s){t.exports=s.p+"assets/img/ssh_copy_path.7deb8003.png"},359:function(t,a,s){"use strict";s.r(a);var e=s(10),n=Object(e.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[t._v("#")]),t._v(" 介绍")]),t._v(" "),a("blockquote",[a("p",[t._v("Jenkins是一个开源的、可扩展的持续集成、交付、部署（软件/代码的编译、打包、部署）的基于web界面的平台。允许持续集成和持续交付项目，无论用的是什么平台，可以处理任何类型的构建或持续集成。")])]),t._v(" "),a("h2",{attrs:{id:"安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),a("h3",{attrs:{id:"_1-docker方式运行"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-docker方式运行"}},[t._v("#")]),t._v(" 1.docker方式运行")]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("version")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'3'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("services")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("jenkins")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" jenkinsci/blueocean\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# image: jenkins/jenkins:lts")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("volumes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" ./jenkins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("/var/jenkins_home\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" /var/run/docker.sock"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("/var/run/docker.sock\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ports")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"8029:8080"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("expose")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"8080"')]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"50000"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("privileged")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("true")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("user")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" root\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("restart")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" always\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("container_name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" jenkins\n")])])]),a("h3",{attrs:{id:"_2-war包"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-war包"}},[t._v("#")]),t._v(" 2. war包")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("java")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-jar")]),t._v(" jenkins.war\n")])])]),a("h2",{attrs:{id:"插件安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#插件安装"}},[t._v("#")]),t._v(" 插件安装")]),t._v(" "),a("h3",{attrs:{id:"gitlab-相关插件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gitlab-相关插件"}},[t._v("#")]),t._v(" gitlab 相关插件")]),t._v(" "),a("blockquote",[a("p",[t._v("gitlab plugin 安装完成后，在gitlab端可以触发Jenkins进行操作。")])]),t._v(" "),a("h3",{attrs:{id:"node-相关插件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node-相关插件"}},[t._v("#")]),t._v(" node 相关插件")]),t._v(" "),a("blockquote",[a("p",[t._v("在打包环境中部署node (安装过程中会出现环境变量问题，提示node找不到，很可能是版本的原因，使用老版本即可；如node11)")])]),t._v(" "),a("h3",{attrs:{id:"ssh-相关插件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ssh-相关插件"}},[t._v("#")]),t._v(" ssh 相关插件")]),t._v(" "),a("blockquote",[a("p",[t._v("链接远程主机，将指定文件复制到远程服务器中")])]),t._v(" "),a("h4",{attrs:{id:"_1-使用密码登录"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-使用密码登录"}},[t._v("#")]),t._v(" 1. 使用密码登录")]),t._v(" "),a("p",[a("img",{attrs:{src:s(297),alt:"使用密码登录"}})]),t._v(" "),a("h4",{attrs:{id:"_2-使用密钥免密登录-travis-cl-中免密登录原理一样"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-使用密钥免密登录-travis-cl-中免密登录原理一样"}},[t._v("#")]),t._v(" 2.使用密钥免密登录（travis-cl 中免密登录原理一样）")]),t._v(" "),a("blockquote",[a("p",[t._v("原理：利用 ssh-keygen 生产一对密钥文件，将私钥内容放到指定用户的authorized_keys文件中。在客户端中创建config文件。配置公钥位置等信息。然后通过ssh username@hostname登录")])]),t._v(" "),a("h4",{attrs:{id:"_3-复制文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-复制文件"}},[t._v("#")]),t._v(" 3.复制文件")]),t._v(" "),a("p",[a("img",{attrs:{src:s(298),alt:"复制文件"}})]),t._v(" "),a("p",[t._v("在要传输得文件夹后面写两个 **\n如果只写一个* ，传输得只有build/classes下得文件，文件夹不会传输")]),t._v(" "),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("blockquote",[a("p",[t._v("gitlab中有文件推送时候，会触发jenkins。然后jenkins开始从gitlab拉取代码，然后执行指定的脚本。然后将编译后的代码通过ssh将代码推送到远端服务器中。")])]),t._v(" "),a("h2",{attrs:{id:"参考文章"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.jianshu.com/p/90c3ff51aff7",target:"_blank",rel:"noopener noreferrer"}},[t._v("jenkins+gitlab 持续集成，自动构建"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.jianshu.com/p/0a865a321d78",target:"_blank",rel:"noopener noreferrer"}},[t._v("jenkins中安装nodejs"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://blog.csdn.net/suo082407128/article/details/90715278",target:"_blank",rel:"noopener noreferrer"}},[t._v("Jenkins publish over ssh传输文件夹"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.jianshu.com/p/dd053c18e5ee",target:"_blank",rel:"noopener noreferrer"}},[t._v("ssh-keygen"),a("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=n.exports}}]);