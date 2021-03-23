const Alternatives = require('./alternatives');
const Formats = require('./formats');

exports.coerce = coerce;
exports.info = info;

const validateInput = (input) => {
	if(typeof input !== 'string') return false;
	if(input.length < 1) return false;
	return true;
};

const validateAllowedFormats = (formats) => {
	if(!Array.isArray(formats)) return false;
	if(input.length < 1) return false;

	return formats.reduce((acc, val) => {
		if(!acc) return false;
		if(typeof val !== 'string') return false;
		if(val.length < 1) return false;
		if(!/^[a-z0-9_]+$/.test(val)) return false;
		return acc;
	}, true);
};

const validateNormalizedVRM = (vrm) => {
	if(typeof vrm !== 'string') return false;
	if(vrm.length < 1) return false;
	if(vrm.length > 7) return false;
	if(!/^[A-Z0-9]+$/.test(vrm)) return false;
	return true;
};

const validateFormat = (format) => {
	if(typeof format !== 'string') return false;
	if(format.length < 1) return false;
	if(!/^[a-z0-9_]+$/.test(format)) return false;
	return true;
};

function coerce(input, allowedFormats) {
	if (allowedFormats === void 0)
		allowedFormats = null;

	if (!validateInput(input))
		throw new Error('input invalid');

	if (allowedFormats !== null) {
		if (!validateAllowedFormats(allowedFormats))
			throw new Error('allowed formats invalid');

		if (allowedFormats.filter(function (f) { return !Formats.map[f]; }).length)
			throw new Error('allowed formats unknown');
	}

	const normalized = normalize(input);

	if (!normalized)
		return [];

	const combinations = Alternatives(normalized);
	const formats = getSortedFormats(allowedFormats);

	const results = [];

	formats.forEach(function (fmt) {
		combinations.forEach(function (vrm) {
			var details = fmt.parse(vrm);

			if (!details)
				return;

			results.push(mapDetails(details, fmt, vrm));
		});
	});

	preferVrm(results, normalized);

	return results;
}

function info(normalizedVRM, format) {
	if (format === void 0)
		format = null;

	if (!validateNormalizedVRM(normalizedVRM))
		throw new Error('normalized vrm invalid');

	if (format !== null) {
		if (!validateFormat(format))
			throw new Error('format invalid');

		if (!Formats.map[format])
			throw new Error('format unknown');
	}

	const formats = format ? [Formats.map[format]] : Formats.all;

	for (var i = 0; i < formats.length; i++) {
		var fmt = formats[i];
		var details = fmt.parse(normalizedVRM);

		if (details)
			return mapDetails(details, fmt, normalizedVRM);
	}

	return null;
}

function normalize(vrm) {
	if (!vrm)
		return null;

	const cleaned = vrm.replace(/\s/g, '').toUpperCase();

	if (!validateNormalizedVRM(cleaned))
		return null;

	return cleaned;
}

function getSortedFormats(allowedRefs) {
	if (!allowedRefs)
		return Formats.all;

	return Formats.all.filter(function (format) {
		return allowedRefs.indexOf(format.ref) !== -1;
	});
}

function mapDetails(details, format, vrm) {
	if (!details)
		return null;

	details.format = format.ref;
	details.vrm = vrm;

	// for now, since structure is undefined
	details._extra = void 0;

	return details;
}

function preferVrm(results, preferredVrm) {
	for (var i = 0; i < results.length; i++) {
		var result = results[i];

		if (result.vrm !== preferredVrm)
			continue;

		results.splice(i, 1);
		results.unshift(result);
		return;
	}
}
