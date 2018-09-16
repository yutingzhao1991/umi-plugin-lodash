'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('path'),
    dirname = _require.dirname;

function importPlugin(key) {
  return [require.resolve('babel-plugin-import'), {
    libraryName: key,
    libraryDirectory: '',
    camel2DashComponentName: false
  }, key];
}

exports.default = function (api, opts) {
  api.chainWebpackConfig(function (webpackConfig) {
    webpackConfig.resolve.alias.set('umi/lodash', dirname(require.resolve('lodash/package')));
  });

  api.modifyAFWebpackOpts(function (memo) {
    if (opts.external) {
      return memo;
    }
    return _extends({}, memo, {
      babel: _extends({}, memo.babel || {}, {
        plugins: [importPlugin('umi/lodash'), importPlugin('lodash')]
      })
    });
  });

  api.modifyAFWebpackOpts(function (memo) {
    if (opts.external) {
      return _extends({}, memo, {
        externals: _extends({}, memo.externals || [], {
          'umi/lodash': '_',
          'lodash': '_'
        })
      });
    }
    return memo;
  });

  api.addHTMLHeadScript(function () {
    if (opts.external) {
      if (opts.version) {
        return {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/' + opts.version + '/lodash.min.js'
        };
      } else {
        throw new Error('if you need external lodash, version is required!');
      }
    }
    return [];
  });
};