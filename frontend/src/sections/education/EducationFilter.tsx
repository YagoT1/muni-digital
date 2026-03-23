import { Button } from '@/components/ui/button'

export type EducationFilterValue =
  | 'all'
  | 'inicial'
  | 'primario'
  | 'secundario'
  | 'tecnico'
  | 'especial'
  | 'adultos'

type EducationFilterProps = {
  value: EducationFilterValue
  onChange: (value: EducationFilterValue) => void
}

const options: { value: EducationFilterValue; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'inicial', label: 'Inicial' },
  { value: 'primario', label: 'Primario' },
  { value: 'secundario', label: 'Secundario' },
  { value: 'tecnico', label: 'Técnico' },
  { value: 'especial', label: 'Especial' },
  { value: 'adultos', label: 'Adultos' },
]

export function EducationFilter({ value, onChange }: EducationFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option.value}
          type="button"
          variant={value === option.value ? 'default' : 'outline'}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}
