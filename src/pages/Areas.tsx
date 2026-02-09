import { Link } from 'react-router-dom'
import { useMemo, useState, useEffect } from 'react'
import { useApp } from '../components/AppContext'
import { t } from '../i18n'
import { convertFromAED, formatMoney } from '../currency'
import { getAreas } from '../api/areas'
import { Area } from '../data/mock'

export default function Areas() {
  const { lang, currency } = useApp()
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
    <div className="col" style={{ gap: 12 }}>
      <div>
        <div className="h2">{t(lang,'areas.title')}</div>
        <div className="p">{t(lang,'areas.subtitle')}</div>
      </div>

      <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t(lang,'areas.search')} />

      <div className="col" style={{ gap: 16 }}>
        {filtered.map(a => (
          <AreaCard key={a.id} area={a} lang={lang} currency={currency} />
        ))}
      </div>
    </div>
  )
}

function AreaCard({ area, lang, currency }: { area: Area, lang: 'en'|'ru', currency: string }) {
  const [expanded, setExpanded] = useState(false)
  const name = lang === 'ru' ? area.nameRu : area.nameEn
  const description = lang === 'ru' ? area.descriptionRu : area.descriptionEn
  const features = lang === 'ru' ? area.featuresRu : area.featuresEn
  const type = lang === 'ru' ? area.propertyTypeRu : area.propertyTypeEn
  
  const schools = lang === 'ru' ? area.schoolsRu : area.schoolsEn
  const prices = lang === 'ru' ? area.avgPricesRu : area.avgPricesEn

  // Fallback to legacy price if available, or try to extract from avgPrices
  const priceDisplay = area.priceFromAED 
    ? formatMoney(convertFromAED(area.priceFromAED, currency), currency)
    : null

  return (
    <div className="card" style={{ padding: 16 }}>
       {/* Header */}
       <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div className="h2">{name}</div>
            {type && <div className="p" style={{ opacity: 0.7, fontSize: 13, marginTop: 2 }}>{type}</div>}
          </div>
          {area.roi && <div className="badge" style={{ marginLeft: 8 }}>ROI {area.roi}</div>}
       </div>

       {/* Features tags */}
       {features && features.length > 0 && (
         <div className="row" style={{ flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {features.map((f, i) => (
              <span key={i} style={{ 
                background: 'var(--bg-secondary)', 
                color: 'var(--text-secondary)',
                padding: '4px 8px', 
                borderRadius: 6, 
                fontSize: 11,
                fontWeight: 500
              }}>
                {f}
              </span>
            ))}
         </div>
       )}

       {/* Description Preview */}
       {description && (
         <div className="p" style={{ 
           marginTop: 12, 
           display: '-webkit-box', 
           WebkitLineClamp: expanded ? 'none' : 3, 
           WebkitBoxOrient: 'vertical', 
           overflow: 'hidden',
           lineHeight: '1.4'
         }}>
            {description}
         </div>
       )}
       
       <div 
         style={{ color: 'var(--accent)', cursor: 'pointer', fontSize: 14, marginTop: 8, fontWeight: 500 }}
         onClick={(e) => {
           e.preventDefault()
           setExpanded(!expanded)
         }}
       >
         {expanded ? (lang === 'ru' ? 'Свернуть' : 'Show Less') : (lang === 'ru' ? 'Подробнее...' : 'Read More...')}
       </div>

       {/* Detailed Info (Expanded) */}
       {expanded && (
         <div style={{ marginTop: 16, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            {/* Location */}
            {(lang === 'ru' ? area.locationRu : area.locationEn) && (
              <div style={{ marginBottom: 12 }}>
                 <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 13 }}>{lang === 'ru' ? 'Расположение' : 'Location'}</div>
                 <div style={{ fontSize: 13, opacity: 0.8 }}>{lang === 'ru' ? area.locationRu : area.locationEn}</div>
              </div>
            )}

            {/* Schools */}
            {schools && Array.isArray(schools) && schools.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 13 }}>{lang === 'ru' ? 'Школы поблизости' : 'Nearby Schools'}</div>
                {schools.map((s: any, i: number) => (
                  <div key={i} style={{ fontSize: 13, opacity: 0.8, marginBottom: 2 }}>• {s.name} <span style={{ opacity: 0.6 }}>({s.distance})</span></div>
                ))}
              </div>
            )}
            
            {/* Prices Table */}
            {prices && (
              <div style={{ marginBottom: 12 }}>
                 <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 13 }}>{lang === 'ru' ? 'Цены' : 'Prices'}</div>
                 <div style={{ display: 'grid', gap: 4 }}>
                   {Object.entries(prices).map(([k, v]) => (
                     <div key={k} style={{ fontSize: 13, display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border)', paddingBottom: 2 }}>
                       <span style={{ opacity: 0.7, textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                       <span style={{ fontWeight: 500 }}>{v as string}</span>
                     </div>
                   ))}
                 </div>
              </div>
            )}
         </div>
       )}

       {/* Footer / CTA */}
       <div className="row" style={{ justifyContent: 'space-between', marginTop: 16, alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <div>
            {priceDisplay ? (
              <div style={{ fontWeight: 900, fontSize: 16 }}>{priceDisplay} <span style={{ color: 'var(--muted)', fontWeight: 700, fontSize: 12 }}>from</span></div>
            ) : (
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>{lang === 'ru' ? 'Различные варианты' : 'Various options'}</div>
            )}
          </div>
          <Link to={`/projects?area=${area.id}`} className="btn" style={{ padding: '8px 16px', fontSize: 14 }}>
            {t(lang,'areas.viewProjects')}
          </Link>
       </div>
    </div>
  )
}
