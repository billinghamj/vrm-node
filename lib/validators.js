const isString = (val) => {
    return typeof val === 'string';
};

const minLength = (val, length) => {
    return val.length >= length;
};

const maxLength = (val, length) => {
    return val.length <= length;
};

const validateInput = (input) => {
    return isString(input) && minLength(input, 1);
};

const formatPattern = /^[a-z0-9_]+/;

const validateAllowedFormats = (formats) => {
    if (!Array.isArray(formats)) return false;
    if (!minLength(formats, 1)) return false;
    return formats.reduce((acc, val) => {
        if (!acc) return false;
        return isString(val) && minLength(val, 1) && formatPattern.test(val);
    }, true);
};

const validateNormalizedVRM = (vrm) => {
    return (
        isString(vrm) &&
        minLength(vrm, 1) &&
        maxLength(vrm, 7) &&
        /^[A-Z0-9]+$/.test(vrm)
    );
};

const validateFormat = (format) => {
    return isString(format) && minLength(format, 1) && formatPattern.test(format);
};

module.exports = {
    validateInput,
    validateAllowedFormats,
    validateNormalizedVRM,
    validateFormat,
};
