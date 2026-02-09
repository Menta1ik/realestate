import { Link } from 'react-router-dom'
import { MapPin, HardHat, Bed, Bath, Maximize } from 'lucide-react'
import { Project, getAreaById } from '../data/mock'
import { useApp } from './AppContext'
import { t } from '../i18n'
import { convertFromAED, formatMoney } from '../currency'

export function ProjectCard({ project, layout = 'horizontal', linkPrefix = '/project' }: { project: Project; layout?: 'horizontal' | 'vertical'; linkPrefix?: string }) {
  const { lang, currency } = useApp()
  const area = getAreaById(project.areaId)
  const price = formatMoney(convertFromAED(project.priceFromAED, currency), currency)

  const statusKey = project.status === 'Ready' ? 'filter.status.ready' : 'filter.status.offplan'
  const isGrid = layout === 'vertical'

  return (
    <Link 
      to={`${linkPrefix}/${project.id}`} 
      className="card" 
      style={{ 
        padding: 12, 
        display: 'flex', 
        gap: 12,
        flexDirection: isGrid ? 'column' : 'row'
      }}
    >
      {/* Thumbnail placeholder or first photo */}
      <div style={{ 
        width: isGrid ? '100%' : 88, 
        height: isGrid ? 160 : 88, 
        borderRadius: 14, 
        border: '1px solid var(--border)', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: project.photos?.[0] ? `url(${project.photos[0]}) center/cover` : 'linear-gradient(180deg, rgba(93,228,199,0.15), rgba(255,255,255,0.02))' 
        }} />
        
        {/* Status Badge on Photo */}
        <div className="badge" style={{ 
          position: 'absolute', 
          top: 6, 
          right: 6, 
          background: 'rgba(255,255,255,0.9)', 
          backdropFilter: 'blur(4px)',
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          fontSize: 10,
          padding: '4px 8px',
          fontWeight: 700
        }}>
          {t(lang, statusKey)}
        </div>
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="h2">{lang === 'ru' ? project.nameRu : project.nameEn}</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', background: '#f5f5f5', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>
              {project.ref}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: 11, textAlign: 'right' }}>
              {t(lang, 'project.handover')}: {lang === 'ru' ? project.handoverRu : project.handoverEn}
            </div>
          </div>
        </div>
        
        <div className="row" style={{ gap: 12, fontSize: 13, color: 'var(--muted)' }}>
           <div className="row" style={{ gap: 4 }}>
             <MapPin size={14} />
             <span>{(area ? (lang === 'ru' ? area.nameRu : area.nameEn) : '—')}</span>
           </div>
           <div>•</div>
           <div>{t(lang, `type.${project.type}`)}</div>
        </div>

        <div className="row" style={{ gap: 4, fontSize: 13, color: 'var(--muted)' }}>
          <HardHat size={14} />
          <span>{project.developer}</span>
        </div>

        <div className="row" style={{ gap: 12, fontSize: 13, color: 'var(--text)', opacity: 0.9 }}>
          <div className="row" style={{ gap: 4 }}>
             <Bed size={14} style={{ opacity: 0.7 }} />
             <span>{project.specs.bedrooms}</span>
          </div>
          <div className="row" style={{ gap: 4 }}>
             <Bath size={14} style={{ opacity: 0.7 }} />
             <span>{project.specs.bathrooms}</span>
          </div>
          <div className="row" style={{ gap: 4 }}>
             <Maximize size={14} style={{ opacity: 0.7 }} />
             <span>{project.specs.sizeSqft} sq.ft</span>
          </div>
        </div>

        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 900 }}>
            {price} <span style={{ color: 'var(--muted)', fontWeight: 700 }}>{t(lang, 'project.starting')}</span>
          </div>
        </div>
        <div className="badges">
          {project.tags.map(tg => <span key={tg} className="badge">{tg}</span>)}
        </div>
      </div>
    </Link>
  )
}
