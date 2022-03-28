import { mul } from './test';
import '../css/index.css';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(mul(2, 3));
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));
/*
*   1. eslint不认识 window、navigator全局变量
*     解决：需要修改package.json中eslintConfig配置
*       "env":{
*         "browser": true //支持浏览器全局变量
*       }
*    2. sw代码必须运行在服务器上
*       -->nodejs
*       -->
*         npm i serve -g
*         serve -s build 启动服务器将build目录下所有资源作为静态资源暴露出去
* */
// 注册serviceWorker
// 处理兼容性问题
// eslint-disable-next-line no-undef
if ('serviceWorker' in navigator) {
  // eslint-disable-next-line no-undef
  window.addEventListener('load', () => {
    // eslint-disable-next-line no-undef
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功了~');
      })
      .catch(() => {
        console.log('sw注册失败了~');
      });
  });
}
