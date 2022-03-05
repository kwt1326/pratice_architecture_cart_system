const webpack = require('webpack');

module.exports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://kwt1326.github.io/pratice_architecture_cart_system"
      : "",
  
  webpack: (config, _options) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    });

    config.plugins.push(new webpack.DefinePlugin({
      'process.env.apiHost': '"http://localhost:3000/api"',
    }));


    return config;
  },
};
