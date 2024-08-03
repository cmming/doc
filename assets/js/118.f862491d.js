(window.webpackJsonp=window.webpackJsonp||[]).push([[118],{410:function(r,t,a){"use strict";a.r(t);var e=a(10),s=Object(e.a)({},(function(){var r=this,t=r._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":r.$parent.slotKey}},[t("h2",{attrs:{id:"作用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#作用"}},[r._v("#")]),r._v(" 作用")]),r._v(" "),t("p",[r._v("Spring Security 是一个功能强大且高度可定制的"),t("strong",[r._v("身份验证")]),r._v("和"),t("strong",[r._v("访问控制")]),r._v("框架。它是保护基于 Spring 的应用程序的事实标准。(就是用来登录和角色权限控制的)")]),r._v(" "),t("h3",{attrs:{id:"_1-身份验证"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-身份验证"}},[r._v("#")]),r._v(" 1. 身份验证")]),r._v(" "),t("p",[r._v("验证用户的常用方法是要求用户输入用户名和密码。")]),r._v(" "),t("h4",{attrs:{id:"_1-1-passwordencoder-密码编译器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-passwordencoder-密码编译器"}},[r._v("#")]),r._v(" 1.1 PasswordEncoder (密码编译器)")]),r._v(" "),t("p",[r._v("用于密码的"),t("strong",[r._v("单向")]),r._v("加密，保证密码的安全存储。")]),r._v(" "),t("h4",{attrs:{id:"_1-2-delegatingpasswordencoder-委托类"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-delegatingpasswordencoder-委托类"}},[r._v("#")]),r._v(" 1.2 DelegatingPasswordEncoder（委托类）")]),r._v(" "),t("p",[r._v("为了避免使用莫一种特定算法的编码器所带来后期升级db的麻烦，可以使用委托类，它可以根据不同的算法来选择不同的编码器。")]),r._v(" "),t("ol",[t("li",[r._v("确保使用当前密码存储建议对密码进行编码")]),r._v(" "),t("li",[r._v("能同时验证新旧密码")]),r._v(" "),t("li",[r._v("自动升级密码的编码器 （重写了upgradeEncoding，如果历史的加密模式和新的不等，修改成true。DaoAuthenticationProvider中createSuccessAuthentication根据upgradeEncoding自动更新密码的加加密编码）")])]),r._v(" "),t("p",[r._v("存储格式为")]),r._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[r._v("{编码器id}加密后的密码\n")])])]),t("h4",{attrs:{id:"_1-3-authorizationserverconfigureradapter-认证服务器配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-authorizationserverconfigureradapter-认证服务器配置"}},[r._v("#")]),r._v(" 1.3 AuthorizationServerConfigurerAdapter (认证服务器配置)")]),r._v(" "),t("ol",[t("li",[r._v("配置token的服务 DefaultTokenServices")]),r._v(" "),t("li",[r._v("配置授权服务器端点的属性和增强功能  AuthorizationServerEndpointsConfigurer")]),r._v(" "),t("li",[r._v("配置oauth2客户端的信息 ClientDetailsServiceConfigurer，实现ClientDetailsService接口")])]),r._v(" "),t("h4",{attrs:{id:"_1-4-websecurityconfigureradapter-web安全配置器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-websecurityconfigureradapter-web安全配置器"}},[r._v("#")]),r._v(" 1.4 WebSecurityConfigurerAdapter (Web安全配置器)")]),r._v(" "),t("p",[r._v("用于配置基于session方式的接口和页面安全。（如果系统是通过session控制登录权限）")]),r._v(" "),t("h3",{attrs:{id:"_2-oauth2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-oauth2"}},[r._v("#")]),r._v(" 2. oauth2")]),r._v(" "),t("h4",{attrs:{id:"_2-1-authorizationserverconfiguration-授权服务器配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-authorizationserverconfiguration-授权服务器配置"}},[r._v("#")]),r._v(" 2.1 AuthorizationServerConfiguration（授权服务器配置）")]),r._v(" "),t("p",[r._v("通过实现AuthorizationServerConfiguration接口来实现自定义的授权服务器配置。该配置用于接口权限控制。")]),r._v(" "),t("h3",{attrs:{id:"_3-自定义授权模式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-自定义授权模式"}},[r._v("#")]),r._v(" 3. 自定义授权模式")]),r._v(" "),t("p",[r._v("自定义授权的时候的参数，方便添加验证码、短信、微信整合等操作。")]),r._v(" "),t("h3",{attrs:{id:"_4-多用户体系"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-多用户体系"}},[r._v("#")]),r._v(" 4. 多用户体系")])])}),[],!1,null,null,null);t.default=s.exports}}]);