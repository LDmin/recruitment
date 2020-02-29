## 技术栈
react + typescript + rxjs + react-amap + apollo
## 本地开发
0. 首先启动server端
1. 执行npm install安装依赖包
2. 执行npm start启动项目
3. 启动跨域的chrome浏览器
mac下执行
```
open -a "/Applications/Google Chrome.app" --args --disable-web-security  --user-data-dir
```
## 待改进
- [] 设置家的位置
- [] 请求api能够查询家到公司的路线并展示在地图上
- [] 限制查询次数
- [] api跨域方式从请求跨域的chrome浏览器改为代理方式（可能不做）
