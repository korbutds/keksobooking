const path = require(`path`);

module.exports = {
  entry: [
    `./js/util.js`,
    `./js/server.js`,
    `./js/data.js`,
    `./js/page-activate.js`,
    `./js/map.js`,
    `./js/drag-and-drop.js`,
    `./js/form.js`,
    `./js/card.js`,
    `./js/pin.js`,
    `./js/debounce.js`,
    `./js/filter.js`,
    `./js/loader.js`,
    `./js/main.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
