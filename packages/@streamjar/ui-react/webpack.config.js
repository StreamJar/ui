'use strict';

const { CheckerPlugin } = require('awesome-typescript-loader');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require('glob');


const { join } = require('path');

module.exports = {
	entry: './src/index.ts',
	mode: 'development',
	output: {
		filename: '[name].js',
		libraryTarget: 'umd',
		library: '@streamjar/react-ui',
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
							includePaths: glob.sync('node_modules').map((d) => path.join(__dirname, d)),
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
		],
	},
	plugins: [
		new CheckerPlugin(),
	],
};
