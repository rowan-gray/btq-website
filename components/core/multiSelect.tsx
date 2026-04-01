import { useId, useMemo, useRef, useState } from 'react'

export function MultiSelect<T extends string>({
  values,
  options,
  onChange,
  truncateAfterCount = 3,
  allSelectedText,
  noneSelectedText = 'Select Items',
  requiredCount,
}: {
  values: T[]
  options: Record<T, string>
  onChange: (values: T[]) => void
  truncateAfterCount?: number
  allSelectedText?: string | null
  noneSelectedText?: string | null
  requiredCount?: number
}) {
  const popoverId = useId()
  const measureRef = useRef<HTMLDivElement>(null)
  const [minWidth, setMinWidth] = useState<number | undefined>(undefined)

  // --- Build the current combined label ---
  const combinedLabel = useMemo(() => {
    const allKeys = Object.keys(options) as T[]

    if (allSelectedText && values.length === allKeys.length) {
      return allSelectedText
    }

    if (values.length === 0) return noneSelectedText

    const full = values.map((v) => options[v]).join(', ')

    // If too many, truncate with "..."
    if (values.length > truncateAfterCount) {
      return full + '...'
    }

    return full
  }, [values, options, truncateAfterCount, allSelectedText, noneSelectedText])

  const toggle = (key: T) => {
    if (values.includes(key)) {
      onChange(values.filter((v) => v !== key))
    } else {
      onChange([...values, key])
    }
  }

  const optionsDiv = useMemo(() => {
    return (
      <div className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm shadow-sm">
        <div className="flex flex-col gap-2">
          {Object.keys(options).map((key) => {
            const k = key as T
            const checked = values.includes(k)
            return (
              <label
                key={k}
                className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 select-none hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={checked && values.length <= (requiredCount ?? 0)}
                  onChange={() => toggle(k)}
                  className="h-4 w-4"
                />
                {options[k]}
              </label>
            )
          })}
        </div>
      </div>
    )
  }, [options, values])

  return (
    <div className="content">
      <button
        popoverTarget={popoverId}
        className="min-w-48 truncate rounded-md border border-gray-300 bg-white px-3 py-1.5 text-left text-sm shadow-sm hover:bg-gray-50"
      >
        {combinedLabel}
      </button>

      <div
        id={popoverId}
        popover="auto"
        className="position-area-bottom-center mt-1 w-full min-w-fit"
      >
        {optionsDiv}
      </div>
    </div>
  )
}
