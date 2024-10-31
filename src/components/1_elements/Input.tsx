import { ClassValue } from 'clsx'
import { cn } from '../../@utils/utils'

type Props = {
  id?: string
  className?: ClassValue
  value: string
  setValue: (value: string) => void
  placeholder: string
}

export default function Input({
  id,
  className,
  value,
  setValue,
  placeholder,
}: Props) {
  return (
    <input
      className={cn(
        'rounded-base bg-white dark:bg-secondaryBlack border-2 border-border dark:border-darkBorder p-[10px] font-base ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 outline-none',
        className,
      )}
      id={id}
      type="text"
      name="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      aria-label={placeholder}
    />
  )
}