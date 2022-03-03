console.log('print.js被加载了~');
const print = function print() {
  const content = 'hello print webpack';
  console.log(content)();
};
export default print;
