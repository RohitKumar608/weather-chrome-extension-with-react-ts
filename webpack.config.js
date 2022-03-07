const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    popup: path.resolve(__dirname, 'src/popup/popup.tsx'),
    options: path.resolve(__dirname, 'src/options/options.tsx'),
    background: path.resolve(__dirname, 'src/background/background.ts'),
    contentScript: path.resolve(
      __dirname,
      'src/contentScript/contentScript.ts'
    ),
  },
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve('src/static'), to: path.resolve('dist') },
      ],
    }),
    ...getHtmlPlugin(['popup', 'options']),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

function getHtmlPlugin(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlPlugin({
        title: 'React App',
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  )
}
