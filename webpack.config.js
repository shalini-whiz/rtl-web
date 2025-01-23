

const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const autoprefixer = require('autoprefixer');
const webpack = require("webpack");


module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  mode: 'development',
  devServer: {
    //host: '192.168.0.106',
    port: 8081,
    historyApiFallback: {
      disableDotRule: true
    }
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              modules: true,
              localIdentName: '[local]'
            }
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer()]

              }
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['./node_modules']
              }
            }
          }
        ],
      },
      {
        test: /\.html$/,
        use: [
          { loader: "html-loader" }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      },
      {
        test: /\.(pdf)$/,
        use: {
          loader: "file-loader",
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx"]
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/react'],
            plugins: ['@babel/proposal-class-properties']
          }
          // options: { presets: ["env"] }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      ] },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [
    //new HtmlWebPackPlugin(),
    // new PreloadWebpackPlugin()
    // new webpack.DefinePlugin(envKeys),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),

     new webpack.ProvidePlugin({
       "React": "react",
     }),
  ]
};