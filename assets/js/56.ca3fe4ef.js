(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{343:function(t,s,a){"use strict";a.r(s);var n=a(10),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"数据恢复"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数据恢复"}},[t._v("#")]),t._v(" 数据恢复")]),t._v(" "),s("blockquote",[s("p",[t._v("误删库不用跑路必备")])]),t._v(" "),s("h3",{attrs:{id:"binlog日志"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#binlog日志"}},[t._v("#")]),t._v(" Binlog日志")]),t._v(" "),s("blockquote",[s("p",[t._v("binary log，是二进制日志文件，有两个作用，一个是增量备份，另一个是主从复制，即主节点维护一个binlog日志文件，从节点从binlog中同步数据，也可以通过binlog日志来恢复数据")])]),t._v(" "),s("h3",{attrs:{id:"操作步骤"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#操作步骤"}},[t._v("#")]),t._v(" 操作步骤")]),t._v(" "),s("div",{staticClass:"language-sql extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sql"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- 模拟数据插入")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INSERT")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INTO")]),t._v(" t_order_0 "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("order_id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" user_id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" create_time"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("VALUES")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'2021-11-20 11:34:07'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- 查看是否开启 binlog")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("show")]),t._v(" variables "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("like")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'%log_bin%'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- 查看所有的binlog日志文件")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("show")]),t._v(" master logs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- 查看最后一个binlog日志的编号名称及其最后一个操作事件pos结束点的值")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("show")]),t._v(" master "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("status")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- ")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("show")]),t._v(" binlog events "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("in")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mysql-bin.000003'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- 20211129 17:07 模拟删除 后面是有binlog进行恢复 将这个时间点作为恢复数据的结束点")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("DELETE")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("FROM")]),t._v(" t_order_0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- 开始利用binlog日志恢复数据")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- 1、重置binlog日志，避免新的操作对之前的数据产生污染，刷新日志")]),t._v("\nFlush LOGS"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- 2、查看日志是否刷新重置")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("SHOW")]),t._v(" MASTER "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("STATUS")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- 3、通过事件点进行大致恢复  恢复 下午两点到5点之间的数据，忽略5点之后的数据")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("usr"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("bin"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("mysqlbinlog "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('--start-datetime="2021-11-29 14:00:00" --stop-datetime="2021-11-29 17:00:00" --database=ds1 /var/log/mysql/mysql-bin.000003 | mysql -uroot -proot -v ds1')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- 密码放在命令行中会由于安全策略导致执行失败，使用时间恢复的时候 一定要注意 mysql服务器的时区")]),t._v("\nmysqlbinlog "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('--start-datetime="2021-11-29 06:00:00" --stop-datetime="2021-11-29 9:00:00" --database=ds1 /var/log/mysql/mysql-bin.000003 | mysql -uroot -p -v ds1')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("-- 4、通过position进行准确恢复")]),t._v("\n")])])]),s("h2",{attrs:{id:"参考文章"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://www.cnblogs.com/YCcc/p/10825870.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Mysql 通过binlog日志恢复数据"),s("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=e.exports}}]);