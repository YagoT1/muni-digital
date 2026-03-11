export type PublicNewsItem = {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  author: string
  featured?: boolean
}

export const publicNews: PublicNewsItem[] = [
  {
    id: 1,
    title: 'Comenzó la obra del nuevo SUM de la Comunidad',
    excerpt:
      'Se iniciaron los trabajos de construcción del nuevo Salón de Usos Múltiples que beneficiará a más de 500 familias del barrio.',
    content:
      'La Municipalidad inició la primera etapa de la obra del nuevo SUM comunitario. El proyecto contempla un salón principal, sanitarios accesibles, cocina y espacio para talleres vecinales. La obra forma parte del plan anual de infraestructura social y tiene un plazo estimado de ejecución de 8 meses.',
    date: '13 de febrero, 2026',
    category: 'Obras',
    author: 'Prensa Municipal',
    featured: true,
  },
  {
    id: 2,
    title: 'Continúan las mejoras edilicias en escuelas primarias',
    excerpt:
      'Se realizan trabajos de mantenimiento y refacción en establecimientos educativos de la zona urbana.',
    content:
      'Se avanza con refacciones en aulas, instalaciones sanitarias y cubiertas en tres escuelas primarias. El plan de mejoras prioriza seguridad, accesibilidad y confort térmico para estudiantes y docentes.',
    date: '10 de febrero, 2026',
    category: 'Educación',
    author: 'Secretaría de Educación',
  },
  {
    id: 3,
    title: 'Más obras de infraestructura para educación',
    excerpt:
      'Nuevas aulas y espacios recreativos para los alumnos de las escuelas municipales.',
    content:
      'El municipio presentó un paquete de obras que incluye ampliación de aulas, mejoras en patios y equipamiento para actividades deportivas. La iniciativa se desarrollará durante el ciclo lectivo 2026.',
    date: '5 de febrero, 2026',
    category: 'Educación',
    author: 'Prensa Municipal',
  },
]

export const publicEvents = [
  {
    id: 1,
    title: 'Carnavales 2026',
    date: '15 de febrero',
    time: '21:00 hs.',
    location: 'Plaza Central',
    category: 'Cultura',
    description:
      'Las tradicionales noches de carnaval con comparsas y música en vivo.',
  },
  {
    id: 2,
    title: 'Reunión Vecinal Barrio Centro',
    date: '18 de febrero',
    time: '19:00 hs.',
    location: 'Sede Vecinal',
    category: 'Comunidad',
    description:
      'Espacio de diálogo entre vecinos y autoridades municipales.',
  },
]
