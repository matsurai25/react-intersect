const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
  mode: 'development', //webpack4以降はモード指定しなければいけない
  entry: { app: './src/index.ts' }, //エントリーポイント。連想配列にすることでappというキーに対してはindex.jsがentryとセットできる
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/js/', //ブラウザからバンドルにアクセスする際のパス
    filename: '[name].js', //バンドルのファイル名。[name]の部分にはentryで指定したキーが入る
    library: ['com', 'example'], //パッケージ名を配列で表現する
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        // 拡張子 .ts もしくは .tsx の場合
        test: /\.tsx?$/,
        // TypeScript をコンパイルする
        use: 'ts-loader'
      }
    ]
  },
  devtool: 'inline-source-map', //ブラウザでのデバッグ用にソースマップを出力する

  //webpack-dev-server用設定
  devServer: {
    open: true, //ブラウザを自動で開く
    openPage: 'index.html', //自動で指定したページを開く
    contentBase: path.join(__dirname, 'public'), // HTML等コンテンツのルートディレクトリ
    watchContentBase: true, //コンテンツの変更監視をする
    port: 3000 // ポート番号
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
}
