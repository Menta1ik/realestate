import { Link } from 'react-router-dom'
import { useMemo, useState, useEffect } from 'react'
import { useApp } from '../components/AppContext'
import { t } from '../i18n'
import { fetchDevelopers, Developer } from '../api/developers'

export default function Developers() {
  const { lang } = useApp()
  const [q, setQ] = useState('')
  const [sort, setSort] = useState<'alpha' | 'projects'>('projects')
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDevelopers().then(data => {
      setDevelopers(data)
      setLoading(false)
    }).catch(err => {
      console.error(err)
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    let res = developers
    const s = q.trim().toLowerCase()
    if (s) {
      res = res.filter(d => d.name.toLowerCase().includes(s))
    }
    
    return res.sort((a, b) => {
      if (sort === 'projects') {
        const countA = a.projects?.length || 0
        const countB = b.projects?.length || 0
        if (countA !== countB) return countB - countA
      }
      return a.name.localeCompare(b.name)
    })
  }, [q, developers, sort])

  if (loading) return <div className="p" style={{ padding: 20 }}>Loading...</div>

  return (
    <div className="col" style={{ gap: 12 }}>
      <div>
        <div className="h2">{t(lang,'dev.title')}</div>
        <div className="p">{t(lang,'dev.subtitle')}</div>
      </div>

      <div className="row" style={{ gap: 12 }}>
        <input className="input" style={{ flex: 1 }} value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(lang,'dev.search')} />
        <select className="input" style={{ width: 'auto' }} value={sort} onChange={(e) => setSort(e.target.value as any)}>
          <option value="projects">{t(lang, 'dev.sort.projects')}</option>
          <option value="alpha">{t(lang, 'dev.sort.alpha')}</option>
        </select>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: 16 
      }}>
        {filtered.map(dev => (
          <Link key={dev.id} to={`/developers/${dev.id}`} className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div className="h2" style={{ fontSize: 18, lineHeight: 1.2 }}>{dev.name}</div>
              <div className="badge" style={{ flexShrink: 0 }}>{(dev.projects || []).length} {t(lang,'projects.results')}</div>
            </div>
            
            {(dev.year || dev.office) && (
              <div className="row" style={{ gap: 12, fontSize: 13, color: 'var(--text)', opacity: 0.7, marginBottom: 12 }}>
                 {dev.year && (
                   <div className="row" style={{ gap: 4 }}>
                     <span>📅</span>
                     <span>{dev.year}</span>
                   </div>
                 )}
                 {dev.office && (
                   <div className="row" style={{ gap: 4 }}>
                     <span>📍</span>
                     <span>{dev.office}</span>
                   </div>
                 )}
              </div>
            )}

            {dev.description && (
              <div className="p" style={{ fontSize: 14, lineHeight: 1.4, flex: 1, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {dev.description}
              </div>
            )}

            <div style={{ marginTop: 'auto' }}>
              <span className="btn" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>{t(lang,'dev.viewProjects')}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
