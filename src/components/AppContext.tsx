import React, { createContext, useContext, useMemo, useState } from 'react'
import { useTelegramWebApp } from './useTelegramWebApp'

export type Lang = 'en' | 'ru'
export type Currency = 'AED' | 'USD' | 'EUR' | 'GBP' | 'CNY'

type Haptic = {
  selection: () => void
  impact: (style?: 'light' | 'medium' | 'heavy') => void
  success: () => void
  error: () => void
}

type AppState = {
  lang: Lang
  setLang: (l: Lang) => void
  currency: Currency
  setCurrency: (c: Currency) => void
  haptic: Haptic
}

const Ctx = createContext<AppState | null>(null)

const LS_LANG = 'uae_showcase_lang'
const LS_CUR = 'uae_showcase_currency'

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem(LS_LANG) as Lang) || 'ru')
  const [currency, setCurrencyState] = useState<Currency>(() => (localStorage.getItem(LS_CUR) as Currency) || 'AED')
  
  const { haptic } = useTelegramWebApp()

  const setLang = (l: Lang) => {
    haptic.selection()
    localStorage.setItem(LS_LANG, l)
    setLangState(l)
  }

  const setCurrency = (c: Currency) => {
    haptic.selection()
    localStorage.setItem(LS_CUR, c)
    setCurrencyState(c)
  }

  const value = useMemo(() => ({ lang, setLang, currency, setCurrency, haptic }), [lang, currency, haptic])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useApp must be used inside AppProvider')
  return v
}
