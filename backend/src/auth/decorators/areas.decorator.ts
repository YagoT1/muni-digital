import { SetMetadata } from '@nestjs/common'

export const AREAS_KEY = 'areas'
export const Areas = (...areas: string[]) => SetMetadata(AREAS_KEY, areas)
