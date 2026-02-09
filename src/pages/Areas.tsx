import { Link } from 'react-router-dom'
import { useMemo, useState, useEffect } from 'react'
import { useApp } from '../components/AppContext'
import { t } from '../i18n'
import { getAreas } from '../api/areas'
import { Area } from '../data/mock'
import { ArrowRight } from 'lucide-react'

const getAreaImage = (id: string) => {
  const images: Record<string, string> = {
    'downtown': 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?auto=format&fit=crop&w=800&q=80',
    'marina': 'https://images.unsplash.com/photo-1512453979798-5ea904ac22ac?auto=format&fit=crop&w=800&q=80',
    'palm-jumeirah': 'https://images.unsplash.com/photo-1610555356070-d0efb6505f81?auto=format&fit=crop&w=800&q=80',
    'business-bay': 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
    'arabian-ranches': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    'jvc': 'https://images.unsplash.com/photo-1576435728672-024f182da3c0?auto=format&fit=crop&w=800&q=80',
    'dubai-hills-estate': 'https://images.unsplash.com/photo-1613469425754-bf7ecb7c4335?auto=format&fit=crop&w=800&q=80',
    'bluewaters-island': 'https://images.unsplash.com/photo-1577708316282-017a78d052d9?auto=format&fit=crop&w=800&q=80'
  }
  return images[id] || 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800&q=80'
}

export default function Areas() {
  const { lang } = useApp()
  const [q, setQ] = useState('')
  const [areas, setAreas] = useState<Area[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAreas()
      .then(data => {
        setAreas(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch areas:', err)
        setLoading(false)
      })
  }, [])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return areas
    return areas.filter(a => (lang === 'ru' ? a.nameRu : a.nameEn).toLowerCase().includes(s))
  }, [q, lang, areas])

  if (loading) return <div className="p-4 text-center" style={{ opacity: 0.6 }}>Loading areas...</div>

  return (
    <div className="col" style={{ gap: 24, paddingBottom: 40 }}>
      <div>
        <div className="h2">{t(lang,'areas.title')}</div>
        <div className="p" style={{ opacity: 0.7 }}>{t(lang,'areas.subtitle')}</div>
      </div>

      <input 
        className="input" 
        value={q} 
        onChange={(e) => setQ(e.target.value)} 
        placeholder={t(lang,'areas.search')} 
      />

      <style>{`
        .areas-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 600px) {
          .areas-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      <div className="areas-grid">
        {filtered.map(a => (
          <AreaTile key={a.id} area={a} lang={lang} />
        ))}
      </div>
    </div>
  )
}

function AreaTile({ area, lang }: { area: Area, lang: 'en'|'ru' }) {
  const name = lang === 'ru' ? area.nameRu : area.nameEn
  const type = lang === 'ru' ? area.propertyTypeRu : area.propertyTypeEn
  const image = getAreaImage(area.slug || area.id)
  
  return (
    <Link to={`/areas/${area.id}`} className="card" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      textDecoration: 'none', 
      color: 'inherit',
      overflow: 'hidden',
      height: '100%',
      transition: 'transform 0.2s',
      cursor: 'pointer'
    }}>
      <div style={{ 
        height: 200, 
        background: `url(${image}) center/cover no-repeat`,
        position: 'relative'
      }}>
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', 
          padding: '20px 16px 16px'
        }}>
          <div className="h3" style={{ color: 'white', marginBottom: 4 }}>{name}</div>
          {type && <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{type}</div>}
        </div>
      </div>
      
      <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="p" style={{ 
          fontSize: 14, 
          lineHeight: '1.5',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          marginBottom: 16
        }}>
          {lang === 'ru' ? area.teaserRu || area.descriptionRu : area.teaserEn || area.descriptionEn}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           {area.roi && (
             <div className="badge" style={{ fontSize: 12 }}>ROI {area.roi}</div>
           )}
           <div style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
             {lang === 'ru' ? 'Подробнее' : 'Details'} <ArrowRight size={16} />
           </div>
        </div>
      </div>
    </Link>
  )
}
