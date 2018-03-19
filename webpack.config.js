/* eslint-env node */

const path = require('path'),
	webpack = require('webpack')

module.exports = {
	entry: './app/client.js',
	context: __dirname,
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'bundle.js',
		publicPath: '/build/'
	},
	devtool: 'inline-eval-cheap-source-map',
	devServer: {
		port: 4300,
		historyApiFallback: true
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			include: path.resolve(__dirname, './app')
		},
		{
			test: /\.scss$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}
			],
		}],
	},
	plugins: [
		new webpack.ProgressPlugin({
			profile: false
		}),
		// new webpack.optimize.UglifyJsPlugin({
		// 	mangle: {
		// 		screw_ie8: true,
		// 		keep_fnames: true
		// 	},
		// 	compress: {
		// 		warnings: false,
		// 		screw_ie8: true
		// 	},
		// 	comments: false,
		// 	sourceMap: true
		// }),
	]
}