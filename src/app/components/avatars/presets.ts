import type { BackgroundGradient, HairConfig } from './Avatar';

export interface AvatarPreset {
  background?: BackgroundGradient;
  hair?: Pick<HairConfig, 'style'>;
}

export const presets: Record<string, AvatarPreset> = {
  maxwell: {
    background: { from: '#2a71ff', to: '#00b0ff' },
    hair: { style: 'short' },
  },
  petras: {
    background: { from: '#7d3cff', to: '#ff3cc7' },
    hair: { style: 'wavy' },
  },
  marek: {
    background: { from: '#ff8a00', to: '#ff3d00' },
    hair: { style: 'buzz' },
  },
};

export type PresetKey = keyof typeof presets;
