(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{336:function(e,a,s){"use strict";s.r(a);var t=s(10),n=Object(t.a)({},(function(){var e=this,a=e._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"使用swoole加速laravel"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用swoole加速laravel"}},[e._v("#")]),e._v(" 使用swoole加速laravel")]),e._v(" "),a("h2",{attrs:{id:"_1-安装扩展包"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-安装扩展包"}},[e._v("#")]),e._v(" 1. 安装扩展包")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("composer")]),e._v(" require swooletw/laravel-swoole\n")])])]),a("h2",{attrs:{id:"_2-修改docker-compose-配置-env"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-修改docker-compose-配置-env"}},[e._v("#")]),e._v(" 2. 修改docker-compose 配置（.env）")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("WORKSPACE_INSTALL_SWOOLE = true\nPHP_FPM_INSTALL_SWOOLE=true\n\n docker-compose build workspace php-fpm\n    \ndocker-compose up -d workspace php-fpm\n\n# 检测是否安装成功插件\nphp -m | grep swoole\n")])])]),a("h2",{attrs:{id:"_3-发布配置文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-发布配置文件"}},[e._v("#")]),e._v(" 3. 发布配置文件")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("php artisan vendor:publish "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("--tag")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("laravel-swoole\n\n")])])]),a("h2",{attrs:{id:"_4-修改nginx配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-修改nginx配置"}},[e._v("#")]),e._v(" 4. 修改nginx配置")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('map $http_upgrade $connection_upgrade {\n    default upgrade;\n    \'\'      close;\n}\n\n upstream laravels {\n     # Connect IP:Port\n     server workspace:1215 weight=5 max_fails=3 fail_timeout=30s;\n     keepalive 16;\n }\n\nserver {\n\n    listen 80 default_server;\n    listen [::]:80 default_server ipv6only=on;\n\n\n    server_name localhost;\n    root /var/www/blog-list/public;\n    index index.php index.html index.htm;\n\n    location = /index.php {\n         # Ensure that there is no such file named "not_exists"\n         # in your "public" directory.\n         try_files /not_exists @swoole;\n     }\n\n    location / {\n        try_files $uri $uri/ @swoole;\n    }\n\n    location @swoole {\n        set $suffix "";\n\n        if ($uri = /index.php) {\n            set $suffix ?$query_string;\n        }\n\n        proxy_set_header Host $http_host;\n        proxy_set_header Scheme $scheme;\n        proxy_set_header SERVER_PORT $server_port;\n        proxy_set_header REMOTE_ADDR $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection $connection_upgrade;\n\n        # IF https\n        # proxy_set_header HTTPS "on";\n\n        #proxy_pass http://127.0.0.1:1215$suffix;\n        proxy_pass http://laravels$suffix;\n    }\n\n    location ~ /\\.ht {\n        deny all;\n    }\n\n    location /.well-known/acme-challenge/ {\n        root /var/www/letsencrypt/;\n        log_not_found off;\n    }\n}\n\n')])])]),a("h2",{attrs:{id:"_5-修改项目配置文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-修改项目配置文件"}},[e._v("#")]),e._v(" 5. 修改项目配置文件")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("#swoole 是否热加载（生产环境改成false）\nSWOOLE_HOT_RELOAD_ENABLE=true\n#指定 swoole 代理的host\nSWOOLE_HTTP_HOST=workspace\nSWOOLE_HTTP_DAEMONIZE=true\n")])])]),a("h2",{attrs:{id:"_6-重启nginx服务和开启-swoole"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-重启nginx服务和开启-swoole"}},[e._v("#")]),e._v(" 6. 重启nginx服务和开启 swoole")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("docker-compose up -d nginx\n\n\ndocker-compose exec workspace bash \n   \nphp artisan swoole:http start\n")])])]),a("h2",{attrs:{id:"_7-注意"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7-注意"}},[e._v("#")]),e._v(" 7. 注意")]),e._v(" "),a("blockquote",[a("p",[e._v("启动swoole 会很占用cpu (如果主机是使用cpu积分消耗型，会很快把cpu积分耗尽，造成主机卡顿)")])])])}),[],!1,null,null,null);a.default=n.exports}}]);