require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var glob = require("glob");
var shelljs = require("shelljs");

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    const dir = path.resolve(__dirname, "../dist/static/img");
    var imgs = glob.sync(`${dir}/**/*.*`);
    imgs.forEach((res) => {
      var file = (path.basename(res));
      if (file.split('.').length < 3) {
        console.log(chalk.cyan('delete ' + file));
        shelljs.rm("-f", res);
      }
    });

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
