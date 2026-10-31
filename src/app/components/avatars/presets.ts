import type { BackgroundGradient, HairConfig } from './Avatar';

export interface AvatarPreset {
  background?: BackgroundGradient;
  hair?: Pick<HairConfig, 'style'>;
}

export const presets: Record<string, AvatarPreset> = {
  maxwell: {
    background: { from: '#3a3a3a', to: '#0a0a0a' },
    hair: { style: 'short' },
  },
  petras: {
    background: { from: '#3a3a3a', to: '#0a0a0a' },
    hair: { style: 'wavy' },
  },
  marek: {
    background: { from: '#3a3a3a', to: '#0a0a0a' },
    hair: { style: 'buzz' },
  },
};

export type PresetKey = keyof typeof presets;
