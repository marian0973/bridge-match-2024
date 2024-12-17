import * as React from "react"
import { cn } from "@/lib/utils"

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options?: SelectOption[]
  onChange?: (value: string) => void
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options = [], onChange, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full h-10 px-3 py-2 rounded-md border border-gray-300",
          "bg-white text-sm",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "disabled:opacity-50",
          className
        )}
        onChange={e => onChange?.(e.target.value)}
        {...props}
      >
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }
)
Select.displayName = "Select"

export { Select }
export type { SelectOption }
