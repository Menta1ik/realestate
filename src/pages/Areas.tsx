import { Link } from 'react-router-dom'
import { areas } from '../data/mock'
import { useMemo, useState } from 'react'
import { useApp } from '../components/AppContext'
import { t } from '../i18n'
import { convertFromAED, formatMoney } from '../currency'

export default function Areas() {
  const { lang, currency } = useApp()
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return areas
    return areas.filter(a => (lang === 'ru' ? a.nameRu : a.nameEn).toLowerCase().includes(s))
  }, [q, lang])

  return (
    <div className="col" style={{ gap: 12 }}>
      <div>
        <div className="h2">{t(lang,'areas.title')}</div>
        <div className="p">{t(lang,'areas.subtitle')}</div>
      </div>

      <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(lang,'areas.search')} />

      <div className="col">
        {filtered.map(a => {
          const price = formatMoney(convertFromAED(a.priceFromAED, currency), currency)
          return (
            <Link key={a.id} to={`/projects?area=${a.id}`} className="card" style={{ padding: 12 }}>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <div className="h2">{lang === 'ru' ? a.nameRu : a.nameEn}</div>
                {a.roi && <div className="badge">ROI {a.roi}</div>}
              </div>
              <div className="p" style={{ marginTop: 6 }}>{lang === 'ru' ? a.teaserRu : a.teaserEn}</div>
              <div className="row" style={{ justifyContent: 'space-between', marginTop: 10 }}>
                <div style={{ fontWeight: 900 }}>{price} <span style={{ color: 'var(--muted)', fontWeight: 700 }}>from</span></div>
                <span className="btn" style={{ padding: '8px 10px' }}>{t(lang,'areas.viewProjects')}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
