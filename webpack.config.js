const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = 'localhost';
const PORT = 3000;

const PATH_DIST = path.join(__dirname, 'dist')
const PATH_ENTRY = path.join(__dirname, 'src', 'index.js');
const PATH_HTML = path.join(__dirname, 'src', 'index.html');

module.exports = () => ({
	mode: 'development',
	devtool: 'cheap-module-source-map',

	entry: {
		index: PATH_ENTRY,
	},

	output: {
		path: PATH_DIST,
		filename: '[name].[hash:8].bundle.js',
		chunkFilename: '[name].[hash:8].chunk.js',
	},

	devServer: {
		port: PORT,
		host: HOST,
		hot: true,
		compress: true,
		historyApiFallback: true,
		contentBase: PATH_DIST,
		watchContentBase: true,
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: PATH_HTML,
			inject: 'body',
			filename: 'index.html',
		}),
		new CleanWebpackPlugin({
			verbose: true,
		}),
		new webpack.HotModuleReplacementPlugin(),
	],

	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
});
