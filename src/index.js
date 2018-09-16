const { dirname } = require('path');

function importPlugin(key) {
  return [
    require.resolve('babel-plugin-import'),
    {
      libraryName: key,
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    key,
  ];
}

export default (api, opts) => {
  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias.set(
      'umi/lodash',
      dirname(
        require.resolve('lodash/package'),
      ),
    );
  });

  api.modifyAFWebpackOpts(memo => {
    if (opts.external) {
      return memo;
    }
    return {
      ...memo,
      babel: {
        ...(memo.babel || {}),
        plugins: [
          importPlugin('umi/lodash'),
          importPlugin('lodash'),
        ],
      },
    };
  });

  api.modifyAFWebpackOpts(memo => {
    if (opts.external) {
      return {
        ...memo,
        externals: {
          ...(memo.externals || []),
          'umi/lodash': '_',
          'lodash': '_',
        }
      }
    }
    return memo;
  });

  api.addHTMLHeadScript(() => {
    if (opts.external) {
      if (opts.version) {
        return {
          src: `https://cdnjs.cloudflare.com/ajax/libs/lodash.js/${opts.version}/lodash.min.js`,
        };
      } else {
        throw new Error('if you need external lodash, version is required!');
      }
    }
    return [];
  });
};
