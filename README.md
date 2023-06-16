#  栖地


# Vue前端
> [vue-router](https://router.vuejs.org/zh-cn/) 是官方提供的路由器，使用vue.js构建单页面应用程序变得轻而易举。

> [vuex](https://vuex.vuejs.org/zh-cn/) 是一个专为 vue.js 应用程序开发的状态管理模式，简单来说Vuex就是管理数据的。


> [axios](https://www.npmjs.com/package/axios) 请求api


## 项目运行
安装Node.js
```shell
# 安装项目依赖（-–legacy-peer-deps忽略项目中引入的各个modules之间的相同modules但不同版本的问题并继续安装） 
npm install -–legacy-peer-deps

# 启动服务
npm run dev 

# 编译打包
npm run build
```
## 连接服务器
> 修改`./config/prod.env.js`的`VUE_APP_SERVER_URL`为服务器ip地址
## 安装apk
> 使用Android手机，通过应用宝、QQ浏览器等方式打开apk.1文件进行安装。

> 由于资金有限，后端未上传到云服务器，直接使用我们提供的apk无法连接服务器从而无法正常进行登录注册。若使用本机运行后端服务器，需要按照上面的方式修改服务器ip地址后打包apk。
> 
# MySQL数据库
导入moodland.sql，设置用户名为root，密码为123456

# nginx配置
nginx-1.24.0/conf/nginx.conf文件配置如下：其中server_name需设置为服务器本机ip地址。
```conf

#user  nobody;
worker_processes  1;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;
    client_max_body_size  2048m;
    #gzip  on;
    
    server {
        listen       5000;
        server_name  localhost;
        server_name  127.0.0.1;
        server_name  10.128.211.2;#设置为本机ip地址
        charset utf-8;
        client_max_body_size  2048m;
        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
            proxy_pass http://localhost:8081;
            client_max_body_size  2048m;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }

}


```
