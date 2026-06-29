/**
 * The two-tone palette as data (mirrors the --sd-tone-* tokens in tokens.css).
 * Components that need to map a semantic color name → values (Tag, StatusPill,
 * charts, avatars) import from here so there's one list, not many.
 */
export interface Tone {
  /** solid — chart series, avatar fills, the tag dot */
  solid: string;
  /** tint — tag / status-pill background */
  tint: string;
  /** text — tag / status-pill label */
  text: string;
}

export const TONES = {
  green: { solid: "#36d080", tint: "#d2f7e4", text: "#1c9159" },
  blue: { solid: "#3e63dd", tint: "#edf2fe", text: "#3a5bc7" },
  turquoise: { solid: "#12a594", tint: "#e0f8f3", text: "#008573" },
  sky: { solid: "#7ce2fe", tint: "#e1f6fd", text: "#00749e" },
  red: { solid: "#e5484d", tint: "#ffefef", text: "#ce2c31" },
  orange: { solid: "#f76b15", tint: "#ffefd6", text: "#cc4e00" },
  yellow: { solid: "#ffe629", tint: "#fffab8", text: "#9e6c00" },
  purple: { solid: "#8e4ec6", tint: "#f7edfe", text: "#8347b9" },
  pink: { solid: "#d6409f", tint: "#fee9f5", text: "#cd1d8d" },
  gray: { solid: "#999999", tint: "#f1f1f1", text: "#666666" },
} satisfies Record<string, Tone>;

export type ToneName = keyof typeof TONES;

export const TONE_NAMES = Object.keys(TONES) as ToneName[];

/** The css var for a tone channel, e.g. toneVar("green", "tint"). */
export function toneVar(name: ToneName, channel: keyof Tone): string {
  return `var(--sd-tone-${name}-${channel})`;
}
