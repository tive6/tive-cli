const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');

const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';
const optimization = {
  runtimeChunk: {
    name: 'manifest',
  },
  // 分割代码块
  splitChunks: {

    cacheGroups: {
      vue_base: {
        name: 'vue_base',
        test: (module) => /vue|vue-router|vuex|vant|axios/.test(module.context),
        chunks: 'initial',
        priority: 10,
      },
      lib_vendor: {
        name: 'lib_vendor',
        test: (module) => /echarts|moment|lodash|html2canvas/.test(module.context),
        chunks: 'initial',
        priority: 8,
      },
      common: {
        name: 'common',
        chunks: 'initial',
        priority: 2,
        minChunks: 2,
      },
    },
  },
  minimizer: [
    new UglifyPlugin({
      uglifyOptions: {
        cache: true,
        parallel: true,
        compress: false,
      },
    }),
  ],
};

module.exports = {
  lintOnSave: false,
  publicPath: './',
  assetsDir: 'static',
  css: {
    sourceMap: true,
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          /* rem适配忽略文件目录 */
          require('postcss-px2rem-exclude')({
            remUnit: 75,
            exclude: /node_modules|vant/i,
          }),
        ],
      },
    },
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8085/api/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  productionSourceMap: false,
  configureWebpack: (config) => {
    if (isProduction) {
      config.performance = {
        hints: false,
      };
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8,
      }));
      if (process.env.npm_lifecycle_event === 'build:az') {
        config.plugins.push(new BundleAnalyzerPlugin());
      }
      Object.assign(config, {
        optimization,
      });
    } else {
      config.devtool = 'source-map';
    }
    config.plugins.push(new webpack.BannerPlugin({
      banner:
        'hash:[hash], chunkhash:[chunkhash], file:[file] \n@Version: 1.0.0 \n@Author: zmnaer(zxf) \n@Description: A web project based on Vue family barrel , @vue/cli and vantUI.',
      entryOnly: true,
    }));
    // 解决moment过大问题
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
  },
  // chainWebpack: (config) => {
  //   // 移除 prefetch 插件
  //   config.plugins.delete('prefetch');
  // },
};
