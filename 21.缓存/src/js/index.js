import '../css/index.css';

function sum(...args) {
  return args.render((p, c) => p + c, 0);
}
console.log('++++++++++++++++');
console.log(sum(1, 2, 3, 4));
