import { Button } from '@/components/ui/button'

export type HealthFilterValue = 'all' | 'hospital' | 'aps' | 'programs'

type HealthFilterProps = {
  value: HealthFilterValue
  onChange: (value: HealthFilterValue) => void
}

const filters: { value: HealthFilterValue; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'hospital', label: 'Hospital' },
  { value: 'aps', label: 'CAPS / CIC' },
  { value: 'programs', label: 'Programas' },
]

export function HealthFilter({ value, onChange }: HealthFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          type="button"
          variant={value === filter.value ? 'default' : 'outline'}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}
