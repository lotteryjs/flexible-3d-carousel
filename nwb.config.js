const path = require("path");
const ES3ifyPlugin = require('es3ify-webpack-plugin');

const ENV_DEV = process.env.NODE_ENV === "development";
const ENV_PROD = process.env.NODE_ENV === "production";
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

console.log(process.env.NODE_ENV);
// ts,tsx
const tsTsx = {
  test: /\.tsx?$/,
  use: [{ loader: "ts-loader", options: { happyPackMode: true } }],
  exclude: /node_modules/
};

// sass
const sass = {
  options: {
    data: `
      @import "./assets/css/_variables";
      @import "./assets/css/sprites";
    `,
    includePaths: [path.resolve("demo/src")]
  }
};

// sass-postcss
const sassPostCSS = {
  plugins: []
};

// sass-css-modules
const sassCSS = {
  options: {
    modules: true,
    localIdentName: "[name]__[local]__[hash:base64:7]"
  }
};

const config = {
  type: "web-module",
  npm: {
    esModules: true,
    umd: {
      global: "flexible3dCarousel",
      externals: {}
    }
  },
  devServer: {
    disableHostCheck: true,
  },
  webpack: {
    html: {
      template: 'demo/src/index.html'
    },
    rules: {
      'sass-css': sassCSS,
      'sass-postcss': sassPostCSS,
      sass,
      graphics: {
        name: '[name].[ext]'
        // query: { publicPath: cdn },
      }
    },
    // uglify: {
    //   uglifyOptions: {
    //     mangle: false,
    //     beautify: false
    //   }
    // },
    uglify: false,
    extra: {
      module: {
        rules: [tsTsx]
      },
      plugins: [],
      resolve: {
        extensions: [".js", ".json", ".ts", ".tsx"]
      }
    },
    config(config) {
      if (ENV_DEV) {
        config.entry.unshift("react-hot-loader/patch");
      }
      return config;
    }
  }
};

if (ENV_DEV) {
  config.webpack.extra.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      checkSyntacticErrors: true,
      watch: ['./src'] // optional but improves performance (fewer stat calls)
    })
  );
}

if (ENV_PROD){
  config.webpack.extra.plugins.push(
    new ES3ifyPlugin()
  );
  config.webpack.aliases = {
    'react': 'qreact/dist/ReactIE',
    'react-dom': 'qreact/dist/ReactIE'
  };
}

module.exports = config;
