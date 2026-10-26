import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('minishop-theme')
    return savedTheme === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('minishop-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="เปิดหรือปิด Dark Mode"
      aria-pressed={theme === 'dark'}
      className="btn btn-outline btn-sm"
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  )
}
