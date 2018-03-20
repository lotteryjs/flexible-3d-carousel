const path = require("path");

const ENV_TEST = process.env.NODE_ENV === "test";
const ENV_DEV = process.env.NODE_ENV === "development";
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

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
      @import "../assets/css/_variables";
      @import "../assets/css/sprites";
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

module.exports = {
  type: "web-app",
  npm: {
    esModules: false,
    umd: {
      global: "flexible3dCarousel",
      externals: {
        react: "React"
      }
    }
  },
  webpack: {
    rules: {
      'sass-css': sassCSS,
      'sass-postcss': sassPostCSS,
      sass,
      graphics: {
        name: '[name].[ext]'
        // query: { publicPath: cdn },
      }
    },
    extra: {
      module: {
        rules: [tsTsx]
      },
      plugins: [
        new ForkTsCheckerWebpackPlugin({
          tslint: true,
          checkSyntacticErrors: true,
          watch: ['./src'] // optional but improves performance (fewer stat calls)
        }),
      ],
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
