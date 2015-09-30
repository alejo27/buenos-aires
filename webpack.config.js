var webpack = require("webpack");

module.exports = {
	entry: './js/index.js',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/dist'
	},
  devtool: 'source-map',
	module: {
		loaders: [
			{ test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.html$/, loader: 'html' },
      { test: /\.url$/, loader: 'raw' }
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
    		compress: {
        		warnings: false
    		}
		})
	]
};
