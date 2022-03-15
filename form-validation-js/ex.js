function counter() {
  let count = 0;
  function increase() {
    return ++count;
  }
  return increase;
}

var counter1 = counter();
console.log(counter1());
console.log(counter1());
