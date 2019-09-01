const glob = require('glob');
const path = require('path');

module.exports = ({ config }) => {
	config.module.rules.push({
	  test: /\.(ts|tsx)$/,
	  use: [
		{
		  loader: require.resolve('awesome-typescript-loader'),
		},
		// Optional
		{
		  loader: require.resolve('react-docgen-typescript-loader'),
		},
	  ],
	});

	config.module.rules.push({
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
					sassOptions: {
						includePaths: glob.sync('../node_modules').map((d) => path.join(__dirname, d)),
					}
				}
			},
		],
	})
	config.resolve.extensions.push('.ts', '.tsx', '.scss');

	return config;
  };
