import { deriveFeatures, hashString } from '../Avatar';

describe('hashString', () => {
  it('is deterministic for same input', () => {
    expect(hashString('Alice')).toBe(hashString('Alice'));
  });
  it('differs for different inputs (likely)', () => {
    const a = hashString('Alice');
    const b = hashString('Bob');
    expect(a).not.toBe(b);
  });
});

describe('deriveFeatures', () => {
  it('returns deterministic features for name', () => {
    const first = deriveFeatures('Example Name');
    const second = deriveFeatures('Example Name');
    expect(first).toEqual(second);
  });
  it('allows overrides for hair + mood + background', () => {
    const custom = deriveFeatures('Override Test', {
      hair: { style: 'buzz', color: '#123456' },
      mood: 'grin',
      background: { from: '#000', to: '#fff' },
    });
    expect(custom.hair.style).toBe('buzz');
    expect(custom.hair.color).toBe('#123456');
    expect(custom.mood).toBe('grin');
    expect(custom.background.from).toBe('#000');
  });
});
