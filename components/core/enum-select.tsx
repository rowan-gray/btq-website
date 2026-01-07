'use client'

import { useState } from 'react'

type EnumLike = { [key: string]: string | number }

interface EnumSelectProps<T extends EnumLike> {
  id: string
  name: string
  enumObject: T
  placeholder: string
  required?: boolean
  className?: string
  value?: string
  onChange?: (value: T[keyof T]) => void
}

export function EnumSelect<T extends EnumLike>({
  id,
  name,
  enumObject,
  placeholder,
  required = false,
  className = '',
  value: controlledValue,
  onChange,
}: EnumSelectProps<T>) {
  const [internalValue, setInternalValue] = useState('')

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onChange?.(newValue as T[keyof T])
  }

  const formatLabel = (val: string) =>
    val.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <select
      id={id}
      name={name}
      required={required}
      value={value}
      onChange={handleChange}
      className={`peer mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-pink-500 focus:ring-pink-500 ${value === '' ? 'text-gray-950/50' : ''} ${className}`}
    >
      {/* Hidden placeholder */}
      <option value="" disabled={required} hidden={required}>
        {placeholder}
      </option>

      {Object.values(enumObject).map((val) => (
        <option key={val} value={val} className="text-gray-900">
          {formatLabel(String(val))}
        </option>
      ))}
    </select>
  )
}
