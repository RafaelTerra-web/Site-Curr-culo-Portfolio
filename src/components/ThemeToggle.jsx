import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ dark, onToggle }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggle = () => {
    if (onToggle) {
      onToggle()
    }
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className="theme-toggle"
        aria-label="Alternar tema"
        style={{ visibility: 'hidden' }}
      >
        <Sun width={18} height={18} />
      </button>
    )
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'}
    >
      {dark ? (
        <Sun width={18} height={18} />
      ) : (
        <Moon width={18} height={18} />
      )}
    </button>
  )
}
