const fs = require('fs');

fs.readdir('./node_modules/@streamjar/ui-shared/assets/icons', 'utf8', (err, files) => {
	const out = files.filter(file => file.endsWith('.svg')).map(i => i.replace('.svg', ''));
	const string = `export const icons = ${JSON.stringify(out)};`;

	fs.writeFile('./demo/src/icons.generated.ts', string, 'utf8', () => {});
});
