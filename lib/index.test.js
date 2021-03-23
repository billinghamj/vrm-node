const { coerce, info } = require('./index');

describe('coerce', () => {
  it('should return vrm object', () => {
    const [coerced] = coerce('HJ 1');
    expect(coerced.vrm).toStrictEqual('HJ1');
  });
});

describe('info', () => {
  it('should return vrm object', () => {
    const vrmInfo = info('HJ1');
    expect(vrmInfo.prettyVrm).toStrictEqual('HJ 1');
  });
});
