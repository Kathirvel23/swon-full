import { Colors } from '@/constants/theme';
import Svg, { Path } from 'react-native-svg';

/**
 * The SWON wing motif (UI_PROTOTYPE.html `--motif`): three soaring strokes
 * drawn once and reused everywhere the prototype decorates a brand surface
 * (topbar corner, host hero, hired hero). SVG paths are verbatim from the
 * approved prototype — do not redraw.
 */
export function WingMotif({
  width = 210,
  height = 130,
  opacity = 1,
  style,
}: {
  width?: number;
  height?: number;
  opacity?: number;
  style?: object;
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 200 130"
      fill="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={style}
    >
      <Path
        d="M8 108 Q80 44 192 34"
        stroke={Colors.light.onPrimary}
        strokeOpacity={0.14 * opacity}
        strokeWidth={7}
        strokeLinecap="round"
      />
      <Path
        d="M44 122 Q106 66 194 64"
        stroke={Colors.light.onPrimary}
        strokeOpacity={0.14 * opacity}
        strokeWidth={7}
        strokeLinecap="round"
      />
      <Path
        d="M88 130 Q134 92 196 96"
        stroke={Colors.light.onPrimary}
        strokeOpacity={0.14 * opacity}
        strokeWidth={7}
        strokeLinecap="round"
      />
    </Svg>
  );
}
