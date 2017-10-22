const path = require('path');
// const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');


// exports.assetsPath = function (_path) {
//   const assetsSubDirectory = process.env.NODE_ENV === 'production'
//     ? config.build.assetsSubDirectory
//     : config.dev.assetsSubDirectory;
//   return path.posix.join(assetsSubDirectory, _path);
// };

exports.cssLoaders = function (options) {
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap,
    },
  };

  // https://github.com/vuejs/vue-loader/issues/424
  // @todo https://github.com/vuejs/vue-loader/search?q=autoprefixer+&type=Issues&utf8=%E2%9C%93
  // https://github.com/vuejs/vue-loader/issues/440
  const postcssLoader = {
    loader: 'postcss-loader', // 解决.js文件require/import autoprefixer问题
    options: {
      sourceMap: true, // 消除警告
    },
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = [cssLoader, postcssLoader];
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      });
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
      });
    }
    return ['vue-style-loader'].concat(loaders);
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus'),
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  // eslint-disable-next-line
  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader,
    });
  }
  return output;
};

exports.getEntries = function (globPath) {
  const entries = {};
  let basename;
  let tmp;
  let pathname;

  glob.sync(globPath).forEach(function (entry) {
    // basename = path.basename(entry, path.extname(entry));
    // tmp = entry.split('/').splice(-3);
    // pathname = tmp.splice(1, 1) + '/' + basename;
    pathname = entry.split('./src/pages/')[1];
    if (path.dirname(pathname) !== 'index') {
      pathname = path.dirname(pathname);
    }
    entries[pathname] = entry;
  });
  return entries;
};

exports.getEntriesJs = function () {
  const entry = exports.getEntries('./src/pages/**/*.js');
  entry['index'] = './src/main.js';
  return entry;
};

exports.getEntriesHtml = function () {
  const pages = exports.getEntries('./src/pages/**/*.html');
  pages['index'] = './index.html';
  const htmlWebpackPluginConf = [];
  // eslint-disable-next-line
  for (const pathname in pages) {
    const chunk = pathname;
    const conf = {
      filename: pathname + '.html',
      template: pages[pathname],
      inject: true,
      hash: false,
      chunks: ['vendor', 'manifest', chunk],
      // excludeChunks: Object.keys(pages).filter(item => (item !== pathname)),
    };
    htmlWebpackPluginConf.push(conf);
  }
  // @todo 写入页面地址
  return htmlWebpackPluginConf;
};

exports.getEntriesHtmlProd = function () {
  const pages = exports.getEntries('./src/pages/**/*.html');
  pages['index'] = './index.html';
  const htmlWebpackPluginConf = [];
  // eslint-disable-next-line
  for (const pathname in pages) {
    // 配置生成的html文件，定义路径等
    const conf = {
      filename: pathname + '.html',
      template: pages[pathname],   // 模板路径
      inject: true,              // js插入位置
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      hash: false,
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
    };
    if (pathname in pages) {    // 为页面导入所需的依赖
      conf.chunks = ['vendor', 'manifest', pathname];
      conf.hash = false;
    }
    htmlWebpackPluginConf.push(conf);
    const debugConf = Object.assign({}, conf);
    delete debugConf.minify;
    debugConf.filename = pathname + '-debug.html';
    htmlWebpackPluginConf.push(debugConf);
  }
  return htmlWebpackPluginConf;
};

// https://www.npmjs.com/package/ip
exports.getIp = function () {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  let IPv4 = '127.0.0.1';
  // eslint-disable-next-line
  for (const key in interfaces) {
    // const alias = 0;
    // eslint-disable-next-line
    interfaces[key].forEach(function (details) {
      if (details.family === 'IPv4' && key === 'en0') {
        IPv4 = details.address;
      }
    });
  }
  return IPv4;
};

/**
 * 增加 hljs 的 classname
 */
exports.wrapCustomClass = render => function (...args) {
  return render(...args)
      .replace('<code class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">');
};

/**
 * Format HTML string
 */
exports.convertHtml = str => str.replace(/(&#x)(\w{4});/gi, $0 => String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16)));