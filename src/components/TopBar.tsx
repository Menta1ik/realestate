import { Link, useLocation } from 'react-router-dom'
import { tenant } from '../data/mock'
import { useApp } from './AppContext'
import { t } from '../i18n'

export function TopBar() {
  const loc = useLocation()
  const showBackProject = loc.pathname.startsWith('/project/')
  const showBackProperty = loc.pathname.startsWith('/property/')
  const showBack = showBackProject || showBackProperty
  
  const { lang, setLang, currency, setCurrency } = useApp()

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-legacy)', background: 'rgba(255,255,255,0.85)' }}>
      <div style={{ maxWidth: 940, margin: '0 auto', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
        {showBack && (
          <Link className="btn" to={showBackProject ? "/projects" : "/objects"} style={{ padding: '8px 10px' }}>←</Link>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: 12, background: 'rgba(43, 108, 176, 0.1)', border: '1px solid rgba(43, 108, 176, 0.2)', color: 'var(--accent-legacy)', display: 'grid', placeItems: 'center', fontWeight: 900 }}>
            {tenant.brandShort}
          </div>
        </div>

        <div className="row" style={{ gap: 8 }}>
          <select className="input" value={lang} onChange={(e) => setLang(e.target.value as any)} style={{ width: 86, padding: '8px 10px' }} aria-label={t(lang,'ui.language')}>
            <option value="en">EN</option>
            <option value="ru">RU</option>
          </select>

          <select className="input" value={currency} onChange={(e) => setCurrency(e.target.value as any)} style={{ width: 96, padding: '8px 10px' }} aria-label={t(lang,'ui.currency')}>
            <option value="AED">AED</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="CNY">CNY</option>
          </select>

          <Link to="/agent" className="btn primary" style={{ padding: '8px 10px' }}>{t(lang,'top.contacts')}</Link>
        </div>
      </div>
    </header>
  )
}
