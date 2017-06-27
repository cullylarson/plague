import webpack from 'webpack'
import path from 'path'

const debug = process.env.NODE_ENV !== "production"

export default {
    target: 'web',
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./src/js/main.js",
    output: {
        path: path.join(__dirname, "/dist/js"),
        filename: "app.js",
    },
    resolve: {
        alias: {
            app: path.resolve(__dirname, 'src/js'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader',
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'eslint-loader',
                enforce: 'pre',
            },
        ],
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
    devServer: {
        contentBase: path.join(__dirname),
        port: 9000
    }
}
