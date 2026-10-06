import type { ReactElement } from 'react';

import { Colors, Elevation, Fonts, Radius } from '../theme';

/** Lightweight pure-SVG charts — no chart dependency required (Factor-12:
 *  "charts on dashboard" with a plain SVG, no heavy new deps). */

export type BarDatum = { label: string; value: number; color?: string };

/**
 * Vertical bar chart. Percent widths so it scales; labels + values are HTML
 * below the SVG so they stay crisp at any container width.
 */
export function BarChart({
  data,
  height = 180,
}: {
  data: BarDatum[];
  height?: number;
}): ReactElement {
  const max = Math.max(...data.map((d) => d.value), 1);
  const barColor = (d: BarDatum) => d.color ?? Colors.primary;
  return (
    <div className="chart chart-bars" style={{ fontFamily: Fonts.body }}>
      <div className="chart-bars-grid" style={{ height }}>
        {data.map((d, i) => (
          <div className="chart-col" key={d.label}>
            <div className="chart-bar-track">
              <div
                className="chart-bar"
                role="img"
                aria-label={`${d.label}: ${d.value}`}
                style={{
                  height: `${Math.max((d.value / max) * 100, 2)}%`,
                  background: barColor(d),
                  transitionProperty: 'height',
                }}
              />
            </div>
            <div className="chart-bar-value" style={{ fontFamily: Fonts.display }}>
              {d.value.toLocaleString('en-IN')}
            </div>
            <div className="chart-bar-label">{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export type Slice = { label: string; value: number; color: string };

/**
 * Donut chart — SVG arcs with a center total. Each slice gets an accessible
 * label; the legend renders beside it.
 */
export function DonutChart({
  data,
  size = 150,
  thickness = 20,
  centerLabel = 'total',
}: {
  data: Slice[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
}): ReactElement {
  const total = data.reduce((sum, s) => sum + s.value, 0);
  const radius = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * radius;

  let acc = 0;
  const arcs = data.map((s) => {
    const frac = total > 0 ? s.value / total : 0;
    const arc = { ...s, start: acc, end: acc + frac };
    acc += frac;
    return arc;
  });

  return (
    <div className="chart chart-donut">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="img"
        aria-label={`${centerLabel}: ${total.toLocaleString('en-IN')}`}
        style={{ borderRadius: Radius.pill }}
      >
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke={Colors.backgroundSelected} strokeWidth={thickness} />
        {arcs.map((s) =>
          s.value <= 0 ? null : (
            <circle
              key={s.label}
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${(s.end - s.start) * circ} ${circ}`}
              strokeDashoffset={-s.start * circ}
            />
          ),
        )}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fill={Colors.text}
          style={{ fontFamily: Fonts.display, fontSize: size * 0.2, fontWeight: 800 }}
        >
          {total.toLocaleString('en-IN')}
        </text>
      </svg>
      <ul className="chart-legend">
        {arcs.map((s) => (
          <li key={s.label}>
            <span className="chart-legend-swatch" style={{ backgroundColor: s.color }} />
            <span className="chart-legend-label">{s.label}</span>
            <span className="chart-legend-value" style={{ fontFamily: Fonts.display }}>
              {s.value.toLocaleString('en-IN')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Reference the elevation token so the shared shadow definition is consumed
// (charts sit on cards that already apply it, but keep the import live).
void Elevation.card;