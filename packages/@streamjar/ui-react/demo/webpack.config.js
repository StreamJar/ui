'use strict';

const { CheckerPlugin } = require('awesome-typescript-loader');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require('glob');


const { join } = require('path');

module.exports = {
	entry: './src/index.tsx',
	mode: 'development',
	output: {
		filename: 'bundle.js',
		path: join(__dirname, 'dist')
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
						options: {
							includePaths: glob.sync('../node_modules').map((d) => path.join(__dirname, d)),
						}
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					name: 'assets/[name].[ext]',
				},
			},
		],
	},
	plugins: [
		new MonacoWebpackPlugin(),
		new CheckerPlugin(),
		new HtmlWebpackPlugin({
			template: join('src', 'index.html'),
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, "/../node_modules/@streamjar/ui-shared"),
		watchContentBase: true,
		port: 8089,
		historyApiFallback: true
	}
};
