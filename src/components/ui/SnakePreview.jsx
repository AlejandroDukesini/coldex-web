import { useId } from 'react'

// Ilustración vectorial del proyecto Snake IA: tablero con la serpiente y la
// red recurrente 26 → 20 → 3 (se dibuja una muestra de neuronas por capa).

const LAYERS = [
  { x: 300, count: 7, label: '26' },
  { x: 380, count: 6, label: '20' },
  { x: 460, count: 3, label: '3' },
]

const nodesFor = ({ x, count }) =>
  Array.from({ length: count }, (_, i) => ({ x, y: 50 + ((i + 0.5) * 220) / count }))

const SNAKE = 'M60 210 H120 V150 H180 V90 H220 V60'

export function SnakePreview({ className = 'h-full w-full' }) {
  const layers = LAYERS.map(nodesFor)
  const gridId = `snake-grid-${useId().replace(/:/g, '')}`

  return (
    <svg
      viewBox="0 0 520 325"
      role="img"
      aria-label="Ilustración: tablero de Snake junto a una red neuronal de 26 entradas, 20 neuronas ocultas y 3 salidas"
      preserveAspectRatio="xMidYMid slice"
      className={`bg-[radial-gradient(80%_80%_at_70%_30%,#121836,#06070d)] ${className}`}
    >
      <defs>
        <pattern id={gridId} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgb(255 255 255 / 0.05)" />
        </pattern>
      </defs>
      <rect x="30" y="40" width="220" height="240" rx="10" fill={`url(#${gridId})`} stroke="rgb(255 255 255 / 0.1)" />
      <path d={SNAKE} fill="none" stroke="#5ef2ff" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <circle cx="220" cy="60" r="4" fill="#06070d" />
      <rect x="194" y="194" width="12" height="12" rx="3" fill="#a07bff" />

      {layers.slice(0, -1).map((layer, l) =>
        layer.map((from) =>
          layers[l + 1].map((to) => (
            <line
              key={`${from.x}-${from.y}-${to.y}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgb(94 242 255 / 0.16)"
            />
          )),
        ),
      )}
      {layers.map((layer, l) =>
        layer.map((node) => (
          <circle
            key={`${node.x}-${node.y}`}
            cx={node.x}
            cy={node.y}
            r="7"
            fill="#0a0c14"
            stroke={l === 2 ? '#5ef2ff' : 'rgb(255 255 255 / 0.35)'}
            strokeWidth="1.5"
          />
        )),
      )}
      {LAYERS.map((layer) => (
        <text
          key={layer.label}
          x={layer.x}
          y="300"
          textAnchor="middle"
          fill="rgb(255 255 255 / 0.5)"
          fontFamily="ui-monospace, monospace"
          fontSize="12"
        >
          {layer.label}
        </text>
      ))}
    </svg>
  )
}
