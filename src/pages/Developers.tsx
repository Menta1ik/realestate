import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { getDevelopers, projects } from '../data/mock'
import { useApp } from '../components/AppContext'
import { t } from '../i18n'

export default function Developers() {
  const { lang } = useApp()
  const [q, setQ] = useState('')
  const devs = useMemo(() => getDevelopers(), [])
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return devs
    return devs.filter(d => d.toLowerCase().includes(s))
  }, [q, devs])

  const countFor = (dev: string) => projects.filter(p => p.developer === dev).length

  return (
    <div className="col" style={{ gap: 12 }}>
      <div>
        <div className="h2">{t(lang,'dev.title')}</div>
        <div className="p">{t(lang,'dev.subtitle')}</div>
      </div>

      <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(lang,'dev.search')} />

      <div className="col">
        {filtered.map(dev => (
          <Link key={dev} to={`/projects?developer=${encodeURIComponent(dev)}`} className="card" style={{ padding: 12 }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div className="h2">{dev}</div>
              <div className="badge">{countFor(dev)} {t(lang,'projects.results')}</div>
            </div>
            <div className="row" style={{ justifyContent: 'space-between', marginTop: 10 }}>
              <div className="p">{t(lang,'ui.developer')}: {dev}</div>
              <span className="btn" style={{ padding: '8px 10px' }}>{t(lang,'dev.viewProjects')}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
