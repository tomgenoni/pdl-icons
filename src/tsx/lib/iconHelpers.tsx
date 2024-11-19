export type IconSize = "x-sm" | "sm" | "md" | "lg" | "x-lg";

export interface IconTypes {
  size?: IconSize;
  className?: string;
}

// Lookup table for icon sizes
export const ICON_SIZE: Record<IconSize, number> = {
  "x-sm": 12,
  sm: 18,
  md: 20,
  lg: 24,
  "x-lg": 28,
};

// This is needed because an rule in src/styles/poe/globals.css that is
// setting a `height` value to all `svg` nodes.
export const getInlineIconStyles = (size: IconSize) => ({
  height: ICON_SIZE[size],
  width: ICON_SIZE[size],
  display: "block",
  flex: "none",
});
