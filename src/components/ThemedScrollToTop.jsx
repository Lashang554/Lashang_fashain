import React, { useEffect, useMemo, useState } from 'react'
import ScrollToTop from 'react-scroll-to-top'

const ThemedScrollToTop = () => {
  const [theme, setTheme] = useState('orange') // 'orange' | 'white'

  const handleScroll = useMemo(() => {
    return () => {
      const btnOffsetFromBottom = 24 + 48 // margin + approx size
      const btnY = window.innerHeight - btnOffsetFromBottom

      const footerEl = document.getElementById('footer')
      const midEl = document.getElementById('midbanner')

      let nextTheme = 'orange'

      if (footerEl) {
        const rect = footerEl.getBoundingClientRect()
        if (rect.top <= btnY) {
          nextTheme = 'white'
        }
      }

      if (midEl && nextTheme !== 'white') {
        const rect = midEl.getBoundingClientRect()
        if (rect.top < btnY && rect.bottom > btnY) {
          nextTheme = 'orange'
        }
      }

      setTheme(prev => prev !== nextTheme ? nextTheme : prev)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const isWhite = theme === 'white'
  const bg = isWhite ? '#ffffff' : '#F85606'
  const color = isWhite ? '#F85606' : '#ffffff'
  const border = isWhite ? '1px solid #F85606' : 'none'

  return (
    <ScrollToTop
      smooth
      color={color}
      style={{ backgroundColor: bg, display:'flex', alignItems:'center', justifyContent:'center', border }}
    />
  )
}

export default ThemedScrollToTop


