export class User {
  timespan: Number;
  constructor(name: string) {
    this.timespan = Math.ceil(Math.random() * 1000);
    // 执行构造函数的时候输出当前的name
    console.log(`${name}执行了构造函数`);
  }
}
