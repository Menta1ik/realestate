import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type TgWebApp = {
  expand: () => void
  ready: () => void
  close: () => void
  initData: string
  initDataUnsafe: any
  themeParams: Record<string, string>
  setHeaderColor: (color: string) => void
  setBackgroundColor: (color: string) => void
  BackButton: {
    isVisible: boolean
    show: () => void
    hide: () => void
    onClick: (cb: () => void) => void
    offClick: (cb: () => void) => void
  }
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void
    selectionChanged: () => void
  }
}

declare global {
  interface Window {
    Telegram?: { WebApp?: TgWebApp }
  }
}

export function useTelegramWebApp() {
  const location = useLocation()
  const navigate = useNavigate()
  const tg = window.Telegram?.WebApp

  useEffect(() => {
    if (!tg) return

    try {
      tg.ready()
      tg.expand()
      
      // Set colors to match the new light theme
      tg.setHeaderColor('#f5f7fa')
      tg.setBackgroundColor('#f5f7fa')
      
      console.log('[TG] initData length:', tg.initData.length)
    } catch (e) {
      console.warn('Telegram WebApp error:', e)
    }
  }, [tg])

  // BackButton Logic
  useEffect(() => {
    if (!tg) return

    const isHome = location.pathname === '/'
    
    if (isHome) {
      tg.BackButton.hide()
    } else {
      tg.BackButton.show()
    }

    const handleBack = () => {
      navigate(-1)
    }

    tg.BackButton.onClick(handleBack)
    return () => {
      tg.BackButton.offClick(handleBack)
    }
  }, [tg, location.pathname, navigate])

  return {
    tg,
    haptic: {
      selection: () => tg?.HapticFeedback.selectionChanged(),
      impact: (style: 'light' | 'medium' | 'heavy' = 'medium') => tg?.HapticFeedback.impactOccurred(style),
      success: () => tg?.HapticFeedback.notificationOccurred('success'),
      error: () => tg?.HapticFeedback.notificationOccurred('error'),
    }
  }
}
