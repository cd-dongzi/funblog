// import ColorThief from 'colorthief';

// function sortPalette(array) {
//   // 建一個空陣列，把調色盤裡的 RGB 存進去，並存一個三數加總的值
//   const tempForCalc = [];
//   Array.prototype.forEach.call(array, (palette) => {
//     const sum = palette.reduce((a, b) => a + b, 0);
//     const item = {
//       color: palette,
//       sum,
//     };
//     tempForCalc.push(item);
//   });

//   // 用三數加總的值做 大 -> 小 排序
//   const result = tempForCalc.concat().sort((a, b) => {
//     return a.sum > b.sum ? -1 : 1;
//   });
//   return result;
// }
// export function getColor() {
//   const url = '/test.jpg';
//   const sourceImage = document.createElement('img');
//   sourceImage.src = url;
//   const ct = new ColorThief();
//   sourceImage.addEventListener('load', () => {
//     const palette = ct.getPalette(sourceImage, 8);
//     console.log(111, palette, sortPalette(palette));
//   });
// }
