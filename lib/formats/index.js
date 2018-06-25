const formats = [
	require('./diplomatic.js'),
	require('./gb-1903.js'),
	require('./gb-1932.js'),
	require('./gb-1963.js'),
	require('./gb-1983.js'),
	require('./gb-2001.js'),
	require('./military.js'),
	require('./ni-1903.js'),
	require('./ni-1966.js')
];

formats.sort(function (a, b) {
	return b.validFrom - a.validFrom;
});

const map = {};

formats.forEach(function (format) {
	map[format.ref] = format;
});

exports.all = formats;
exports.map = map;
