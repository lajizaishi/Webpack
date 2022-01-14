function add(x, y) {
  return x + y;
}
// 下一行不eslint所有规则都失效（下一行不进行eslint检测）
// eslint-disable-next-line
console.log(add(1, 2));
