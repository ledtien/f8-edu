// Array.prototype.reduce2 = function (callback, result) {
//   let i = 0;
//   if (arguments.length < 2) {
//     i = 1;
//     result = this[0];
//   }
//   for (; i < this.length; i++) {
//     result = callback(result, this[i], i, this);
//   }
//   return result;
// };

// let number = [1, 2, 3, 4, 5];

// const newNumber = number.reduce2((result, number) => {
//   console.log(result, number);
//   return result + number;
// });

// console.log(newNumber);

// Array.prototype.map2 = function (callback) {
//   let arrayLength = this.length;
//   let output = [];
//   for (let i = 0; i < arrayLength; i++) {
//     let result = callback(this[i], i, this);
//     output.push(result);
//   }
//   return output;
// };

// var courses = ["Javascript", "PHP", "Ruby"];

// let newCourse = courses.map2(function (course) {
//   return `<h2>${course}</h2>`;
// });

// console.log(newCourse.join(""));

//forEach
// Array.prototype.forEach2 = function (callback) {
//   for (index in this) {
//     if (this.hasOwnProperty(index)) {
//       callback(this[index], index, this);
//     }
//   }
// };

// var courses = ["Javascript", "PHP", "Ruby"];

// courses.length = 100;

// courses.forEach2(function (item, index, array) {
//   console.log(item, index, array);
// });

// filter

// Array.prototype.filter2 = function (callback) {
//   var output = [];
//   for (var index in this) {
//     if (this.hasOwnProperty(index)) {
//       var result = callback(this[index], index, this);
//       if (result) {
//         output.push(this[index]);
//       }
//     }
//   }
//   return output;
// };

// let courses = [
//   {
//     name: "Javascript",
//     coin: 780,
//   },
//   {
//     name: "PHP",
//     coin: 600,
//   },
//   {
//     name: "Java",
//     coin: 780,
//   },
// ];

// let newCourse = courses.filter2((item, index, array) => {
//   return item.coin > 700;
// });
// console.log(newCourse);
// some

// Array.prototype.some2 = function (callback) {
//   var output = true;
//   for (var index in this) {
//     if (this.hasOwnProperty(index)) {
//       var result = callback(this[index], index, this);
//       if (!result) {
//         output = false;
//         break;
//       }
//     }
//   }
//   return output;
// };

// let courses = [
//   {
//     name: "Javascript",
//     coin: 780,
//     isTrue: true,
//   },
//   {
//     name: "PHP",
//     coin: 600,
//     isTrue: true,
//   },
//   {
//     name: "Java",
//     coin: 780,
//     isTrue: true,
//   },
// ];

// let newCourse = courses.some2(function (course) {
//   return course.isTrue;
// });

// console.log(newCourse);
// every
