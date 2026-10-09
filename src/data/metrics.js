// Métricas mostradas en la consola del hero. Cada cifra proviene de la
// sección "Performance" del README del repositorio enlazado.

export const HERO_METRICS = [
  {
    id: 'axis',
    project: 'AXIS 2D',
    label: 'JavaScript en ruta crítica',
    before: { value: 299.79, display: '299.79 KB' },
    after: { value: 12.32, display: '12.32 KB' },
    improvement: 95.9,
    method: 'Lighthouse 13 · build de producción',
    repo: 'https://github.com/AlejandroDukesini/AXIS-2D-SCROLL-ANIMATION',
  },
  {
    id: 'maison',
    project: 'Maison Noir',
    label: 'Consultas SQL por request',
    before: { value: 157, display: '157' },
    after: { value: 3, display: '3' },
    improvement: 98,
    method: 'Eliminación de N+1 con JOIN FETCH',
    repo: 'https://github.com/AlejandroDukesini/Restaurant_reservations',
  },
  {
    id: 'task',
    project: 'Plan Gestor Task',
    label: 'Tiempo de consulta de tareas',
    before: { value: 7.56, display: '7.56 ms' },
    after: { value: 0.596, display: '0.596 ms' },
    improvement: 92.1,
    method: 'EXPLAIN QUERY PLAN · índice de cobertura',
    repo: 'https://github.com/AlejandroDukesini/Personal_Task_Gestor',
  },
  {
    id: 'valinor',
    project: 'Ludoteca Valinor',
    label: 'Imagen principal',
    before: { value: 4880, display: '4.8 MB' },
    after: { value: 170, display: '170 KB' },
    improvement: 96.5,
    method: 'Pipeline WebP con sharp',
    repo: 'https://github.com/AlejandroDukesini/LUDOTECA-VALINOR',
  },
]
