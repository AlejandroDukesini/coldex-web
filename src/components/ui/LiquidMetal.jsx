import { useEffect, useRef } from 'react'
import { isLiteMode } from '../../lib/device'

// Metal líquido iridiscente en WebGL puro (un único fragment shader, sin
// librerías). Metaballs con caída gaussiana → normales a partir del gradiente
// → reflejo de un "estudio" procedural, película iridiscente cian/azul/violeta
// en los bordes y un especular que sigue al cursor.
//
// Coste controlado: resolución interna reducida, pausa fuera de pantalla y con
// la pestaña oculta, y un solo frame estático con movimiento reducido.
// Sin WebGL (o en modo ligero) se queda la esfera CSS de .metal-fallback.

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAGMENT = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uEnergy;
uniform float uIntro;

const vec3 CYAN = vec3(0.37, 0.95, 1.0);
const vec3 BLUE = vec3(0.30, 0.45, 1.0);
const vec3 VIOLET = vec3(0.63, 0.48, 1.0);
const float THRESHOLD = 0.42;

vec3 spectrum(float x) {
  x = fract(x);
  vec3 c = mix(CYAN, BLUE, smoothstep(0.0, 0.33, x));
  c = mix(c, VIOLET, smoothstep(0.33, 0.66, x));
  return mix(c, CYAN, smoothstep(0.66, 1.0, x));
}

float ball(vec2 p, vec2 c, float r) {
  vec2 d = p - c;
  return exp(-dot(d, d) / (r * r));
}

float field(vec2 p) {
  float t = uTime * 0.32;
  // Ondulación lenta de la superficie.
  p += 0.022 * vec2(sin(p.y * 7.0 + t * 2.1), cos(p.x * 6.0 - t * 1.7));
  float grow = 0.55 + 0.45 * uIntro;
  float f = ball(p, vec2(0.0), 0.36 * grow);
  f += ball(p, vec2(cos(t * 0.9) * 0.3, sin(t * 1.15) * 0.22), 0.2 * grow);
  f += ball(p, vec2(sin(t * 0.7 + 1.0) * 0.27, cos(t * 0.8 + 2.0) * 0.3), 0.17 * grow);
  // Una gota que el cursor atrae hacia sí.
  vec2 idle = vec2(cos(t * 0.6 + 4.0) * 0.34, sin(t * 0.5 + 1.0) * 0.18);
  f += ball(p, mix(idle, uMouse * 0.42, uEnergy), (0.13 + 0.03 * uEnergy) * grow);
  return f;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  p -= uMouse * 0.035;
  float t = uTime;

  float f = field(p);
  float mask = smoothstep(THRESHOLD - 0.02, THRESHOLD + 0.02, f);
  float glowA = smoothstep(0.04, THRESHOLD, f) * (1.0 - mask);

  vec3 col = vec3(0.0);
  if (mask > 0.0) {
    float e = 0.006;
    vec2 g = vec2(field(p + vec2(e, 0.0)) - field(p - vec2(e, 0.0)),
                  field(p + vec2(0.0, e)) - field(p - vec2(0.0, e))) / (2.0 * e);
    // Más inclinación cerca del borde para que se lea como un volumen.
    float rim = 1.0 - smoothstep(THRESHOLD, THRESHOLD + 0.45, f);
    vec3 n = normalize(vec3(-g * (0.32 + rim * 0.9), 1.0));
    vec3 r = reflect(vec3(0.0, 0.0, -1.0), n);

    // Estudio procedural: horizonte claro arriba, bandas de luz que se mueven.
    float horizon = smoothstep(-0.35, 0.75, r.y + 0.12 * sin(r.x * 3.0 + t * 0.4));
    float bands = pow(0.5 + 0.5 * sin(r.x * 5.5 + r.y * 3.0 + t * 0.35), 8.0);
    float floorRef = smoothstep(0.1, -0.7, r.y) * 0.25;
    vec3 chrome = mix(vec3(0.015, 0.02, 0.05), vec3(0.86, 0.9, 1.0), horizon * 0.62 + bands * 0.55);
    chrome += floorRef * BLUE;

    float fres = pow(1.0 - n.z, 1.6);
    vec3 film = spectrum(fres * 1.4 + r.x * 0.35 + r.y * 0.2 + t * 0.03);
    col = chrome * mix(vec3(1.0), film, 0.35 + 0.45 * fres) + film * fres * 0.45;

    // Especular del cursor (más intenso mientras el puntero está dentro).
    vec3 L = normalize(vec3(uMouse.x * 1.1 - p.x * 0.4, uMouse.y * 1.1 - p.y * 0.4 + 0.35, 0.85));
    vec3 h = normalize(L + vec3(0.0, 0.0, 1.0));
    float spec = pow(max(dot(n, h), 0.0), 70.0);
    col += spec * (0.45 + 0.9 * uEnergy) * vec3(0.92, 0.97, 1.0);
    col += film * pow(rim, 3.0) * 0.35;
    col *= mask;
  }

  // Halo iridiscente alrededor del metal.
  vec3 glow = spectrum(atan(p.y, p.x) / 6.2831 + t * 0.04) * glowA * (0.28 + 0.25 * uEnergy);
  float alpha = mask + glowA * (0.28 + 0.25 * uEnergy) * (1.0 - mask);
  // Desvanecido en los bordes del canvas: ni el halo ni una gota se cortan en seco.
  vec2 uv = gl_FragCoord.xy / uRes;
  float edge = smoothstep(0.0, 0.14, uv.x) * smoothstep(1.0, 0.86, uv.x) *
               smoothstep(0.0, 0.14, uv.y) * smoothstep(1.0, 0.86, uv.y);
  gl_FragColor = vec4(col + glow, alpha) * edge;
}
`

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('[LiquidMetal]', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function LiquidMetal({ field, className = '' }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas || isLiteMode()) return

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    })
    if (!gl) return

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    if (!vs || !fs) return
    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    // Un triángulo que cubre todo el viewport.
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const u = {
      res: gl.getUniformLocation(program, 'uRes'),
      time: gl.getUniformLocation(program, 'uTime'),
      mouse: gl.getUniformLocation(program, 'uMouse'),
      energy: gl.getUniformLocation(program, 'uEnergy'),
      intro: gl.getUniformLocation(program, 'uIntro'),
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    // Resolución interna: el metal es suave, no necesita la densidad completa.
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * (coarse ? 0.55 : 0.75)

    let width = 0
    let height = 0
    const resize = () => {
      width = Math.max(1, Math.round(wrap.clientWidth * scale))
      height = Math.max(1, Math.round(wrap.clientHeight * scale))
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
    }
    resize()

    const start = performance.now()
    let frame = 0
    let visible = true
    let first = true

    const draw = (now) => {
      const elapsed = (now - start) / 1000
      const intro = reduced ? 1 : Math.min(elapsed / 2.2, 1)
      const state = field?.current ?? { x: 0, y: 0, energy: 0 }
      gl.uniform2f(u.res, width, height)
      // Con movimiento reducido el tiempo se congela en un instante agradable.
      gl.uniform1f(u.time, reduced ? 12 : elapsed + 12)
      gl.uniform2f(u.mouse, state.x, -state.y)
      gl.uniform1f(u.energy, state.energy)
      gl.uniform1f(u.intro, 1 - (1 - intro) ** 3)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (first) {
        first = false
        wrap.dataset.gl = 'ready'
      }
    }

    const loop = (now) => {
      draw(now)
      frame = visible && !document.hidden && !reduced ? requestAnimationFrame(loop) : 0
    }
    const wake = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      wake()
    })
    io.observe(wrap)
    const ro = new ResizeObserver(() => {
      resize()
      if (reduced || !frame) draw(performance.now())
    })
    ro.observe(wrap)
    document.addEventListener('visibilitychange', wake)

    const onLost = (event) => {
      event.preventDefault()
      cancelAnimationFrame(frame)
      frame = 0
      delete wrap.dataset.gl
    }
    canvas.addEventListener('webglcontextlost', onLost)

    wake()

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', wake)
      canvas.removeEventListener('webglcontextlost', onLost)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      delete wrap.dataset.gl
    }
  }, [field])

  return (
    <div ref={wrapRef} className={`metal ${className}`} aria-hidden="true">
      <div className="metal-fallback" />
      <canvas ref={canvasRef} />
    </div>
  )
}
