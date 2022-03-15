let myCar = [
  {
    brand: "bmw",
    color: "black",
    price: 30,
  },
  {
    brand: "porches",
    color: "white",
    price: 50,
  },

  {
    brand: "mazda",
    color: "red",
    price: 15,
  },

  {
    brand: "lexus",
    color: "grey",
    price: 35,
  },

  {
    brand: "mercedes",
    color: "yellow",
    price: 33,
  },
];

//reduce

Array.prototype.reduce2 = function (callback, result) {
  for (i = 0; i < this.length; i++) {
    result = callback(result, this[i], i, this);
  }
  return result;
};

const totalPrice = myCar.reduce2(function (total, current) {
  return total + current.price;
}, 0);

console.log(totalPrice);

//map

const newArray = myCar.map(function (car) {
  return car.brand;
});

console.log(newArray);
