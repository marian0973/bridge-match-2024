import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          variant === 'default' ? 'bg-blue-500 text-white hover:bg-blue-600' : '',
          variant === 'outline' ? 'border border-gray-300 hover:bg-gray-100' : '',
          variant === 'ghost' ? 'hover:bg-gray-100' : '',
          size === 'default' ? 'h-10 py-2 px-4 text-sm' : '',
          size === 'sm' ? 'h-9 px-3 text-sm' : '',
          size === 'lg' ? 'h-11 px-8 text-base' : '',
          size === 'icon' ? 'h-10 w-10' : '',
          className || ''
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }