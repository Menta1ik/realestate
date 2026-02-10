import { Link, useNavigate } from 'react-router-dom'
import { MapPin, HardHat, Bed, Bath, Maximize, Calendar, Heart, Camera } from 'lucide-react'
import { Project, getAreaById } from '../data/mock'
import { useApp } from './AppContext'
import { t } from '../i18n'
import { convertFromAED, formatMoney } from '../currency'

export function ProjectCard({ project, layout = 'horizontal', linkPrefix = '/project' }: { project: Project; layout?: 'horizontal' | 'vertical'; linkPrefix?: string }) {
  const { lang, currency } = useApp()
  const navigate = useNavigate()
  const area = getAreaById(project.areaId)
  const price = formatMoney(convertFromAED(project.priceFromAED, currency), currency)
  const [priceSymbol, priceValue] = price.split(' ')

  const statusKey = project.status === 'Ready' ? 'filter.status.ready' : 'filter.status.offplan'
  const isGrid = layout === 'vertical'

  // Helper for area formatting
  const sizeSqFt = project.specs.sizeSqft
  const sizeM2 = Math.round(sizeSqFt * 0.092903)
  const sizeLabel = lang === 'ru' 
    ? `${sizeM2} м²` 
    : `${sizeM2} m² (${sizeSqFt} sq.ft)`

  // Helper for handover formatting
  let handoverLabel = lang === 'ru' ? project.handoverRu : project.handoverEn
  if (lang === 'ru') {
    // Standardize to "2 кв. 2027" format
    // Handle "Q2 2027" -> "2 кв. 2027"
    handoverLabel = handoverLabel.replace(/Q(\d)\s+(\d{4})/i, '$1 кв. $2')
    // Handle "2-й квартал 2027" -> "2 кв. 2027"
    handoverLabel = handoverLabel.replace(/(\d)-?й?\s*квартал\s+(\d{4})/i, '$1 кв. $2')
  }

  return (
    <Link 
      to={`${linkPrefix}/${project.id}`} 
      className="card project-card-hover" 
      style={{ 
        padding: 20, 
        display: 'flex', 
        gap: 16,
        flexDirection: isGrid ? 'column' : 'row',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
    >
      {/* Thumbnail placeholder or first photo */}
      <div style={{ 
        width: isGrid ? '100%' : 100, 
        height: isGrid ? 200 : 100, 
        borderRadius: 16, 
        border: '1px solid var(--border-legacy)', 
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: project.photos?.[0] ? `url(${project.photos[0]}) center/cover` : 'linear-gradient(180deg, rgba(93,228,199,0.15), rgba(255,255,255,0.02))' 
        }} />
        
        {/* Gradient Overlay for bottom text readability */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
          pointerEvents: 'none'
        }} />

        {/* Favorite Icon */}
        <div style={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: 'rgba(0,0,0,0.2)',
          backdropFilter: 'blur(4px)',
          borderRadius: '50%',
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          transition: 'transform 0.2s',
          zIndex: 2
        }} onClick={(e) => {
          e.preventDefault()
          // Toggle favorite logic here
        }}>
          <Heart size={18} strokeWidth={1.5} />
        </div>
        
        {/* Gallery Count */}
        <div style={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          color: 'white',
          fontSize: 11,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}>
          <Camera size={12} strokeWidth={1.5} />
          <span>{project.photos?.length || 0} {lang === 'ru' ? 'фото' : 'photos'}</span>
        </div>

        {/* Status Badge on Photo (Moved to bottom right or keep top left? User said "if it will be at bottom". Let's keep top left or move. User requirement: "Gradient for status tag readability if it is at bottom". Let's place status at bottom right) */}
        <div className="badge" style={{ 
          position: 'absolute', 
          bottom: 8, 
          right: 8, 
          background: 'rgba(255,255,255,0.9)', 
          backdropFilter: 'blur(4px)',
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          fontSize: 10,
          padding: '4px 8px',
          fontWeight: 700,
          color: '#1A1A1A'
        }}>
          {t(lang, statusKey)}
        </div>
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header: Name + Ref */}
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div className="h2" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.2 }}>
            {lang === 'ru' ? project.nameRu : project.nameEn}
            <span style={{ 
              fontSize: 12, 
              color: 'var(--muted-legacy)', 
              fontWeight: 400, 
              marginLeft: 8,
              verticalAlign: 'middle',
              display: 'inline-block',
              background: 'var(--bg-secondary-legacy)',
              padding: '2px 6px',
              borderRadius: 4
            }}>
              {project.ref}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 28, lineHeight: 1, color: '#1A1A1A' }}>
            <span style={{ fontSize: 18, fontWeight: 400, color: '#9CA3AF', marginRight: 4, verticalAlign: 'baseline' }}>{priceSymbol}</span>
            {priceValue} 
            <span style={{ color: 'var(--muted-legacy)', fontWeight: 400, fontSize: 16, marginLeft: 6 }}>{t(lang, 'project.starting')}</span>
          </div>
        </div>
        
        {/* Location & Developer */}
        <div className="row" style={{ gap: 12, fontSize: 14, color: '#2D2D2D', marginBottom: 8, alignItems: 'center' }}>
           <div className="row" style={{ gap: 6, alignItems: 'center' }}>
             <MapPin size={16} style={{ color: 'var(--accent-legacy)' }} strokeWidth={1.5} />
             <span 
               className="hover-underline"
               style={{ cursor: 'pointer' }}
               onClick={(e) => {
                 e.preventDefault()
                 e.stopPropagation()
                 if (project.areaId) {
                   navigate(`/areas/${project.areaId}`)
                 }
               }}
             >
               {(area ? (lang === 'ru' ? area.nameRu : area.nameEn) : '—')}
             </span>
           </div>
           <div style={{ color: '#E5E7EB', fontSize: 8 }}>•</div>
           <div className="row" style={{ gap: 6, alignItems: 'center' }}>
             <HardHat size={16} style={{ color: 'var(--accent-legacy)' }} strokeWidth={1.5} />
             <span
               className="hover-underline"
               style={{ cursor: 'pointer' }}
               onClick={(e) => {
                 e.preventDefault()
                 e.stopPropagation()
                 // Use developerId if available, otherwise fallback to name as slug or just name
                 const devId = project.developerId || project.developer
                 navigate(`/developers/${devId}`)
               }}
             >
               {project.developer}
             </span>
           </div>
        </div>

        {/* Handover Date */}
        <div className="row" style={{ gap: 6, fontSize: 14, color: '#2D2D2D', marginBottom: 12, alignItems: 'center' }}>
          <Calendar size={16} style={{ color: 'var(--accent-legacy)' }} strokeWidth={1.5} />
          <span>{handoverLabel}</span>
        </div>

        {/* Specs */}
        <div className="row" style={{ gap: 12, fontSize: 14, color: '#2D2D2D', fontWeight: 500, lineHeight: 1.5, marginBottom: 16, alignItems: 'center' }}>
          <div className="row" style={{ gap: 6, alignItems: 'center' }}>
             <Bed size={16} style={{ color: 'var(--accent-legacy)' }} strokeWidth={1.5} />
             <span>{project.specs.bedrooms === 0 ? 'Std' : project.specs.bedrooms}</span>
          </div>
          <div style={{ color: '#E5E7EB', fontSize: 8 }}>•</div>
          <div className="row" style={{ gap: 6, alignItems: 'center' }}>
             <Bath size={16} style={{ color: 'var(--accent-legacy)' }} strokeWidth={1.5} />
             <span>{project.specs.bathrooms}</span>
          </div>
          <div style={{ color: '#E5E7EB', fontSize: 8 }}>•</div>
          <div className="row" style={{ gap: 6, alignItems: 'center' }}>
             <Maximize size={16} style={{ color: 'var(--accent-legacy)' }} strokeWidth={1.5} />
             <span>{sizeLabel}</span>
          </div>
          <div style={{ color: '#E5E7EB', fontSize: 8 }}>•</div>
          <div style={{ fontWeight: 400 }}>{t(lang, `type.${project.type}`)}</div>
        </div>
        
        {/* Tags */}
        <div className="badges" style={{ gap: 8 }}>
          {project.tags.slice(0, 3).map(tg => {
            // Default style (Gray/Neutral)
            let bg = 'rgba(107, 114, 128, 0.1)'
            let col = '#4B5563'
            let label = tg

            // Tag Mapping
            if (['Top', 'Hot', 'New'].includes(tg)) {
               // Green (Top/Hot)
               bg = 'rgba(16, 185, 129, 0.1)'
               col = '#10B981'
               if (tg === 'Top') label = lang === 'ru' ? 'Топ' : 'Top'
               if (tg === 'Hot') label = lang === 'ru' ? 'Хит' : 'Hot'
               if (tg === 'New') label = lang === 'ru' ? 'Новинка' : 'New'
            }
            else if (tg === 'View') {
               // Blue
               bg = 'rgba(59, 130, 246, 0.1)'
               col = '#3B82F6'
               label = lang === 'ru' ? 'Вид' : 'View'
            }
            else if (tg === 'Ready') {
               // Orange
               bg = 'rgba(245, 158, 11, 0.1)'
               col = '#F59E0B'
               label = lang === 'ru' ? 'Готово' : 'Ready'
            }
            else if (tg === 'Best ROI') { 
              bg = 'rgba(16, 185, 129, 0.1)'; col = '#10B981'; 
              label = lang === 'ru' ? 'Высокая доходность' : 'High ROI'
            }
            else if (tg === 'Affordable') { 
              bg = 'rgba(59, 130, 246, 0.1)'; col = '#3B82F6';
              label = lang === 'ru' ? 'Выгодная цена' : 'Best Price'
            }
            
            return (
              <span key={tg} style={{ 
                background: bg, 
                color: col, 
                padding: '0 8px',
                height: 24,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12, 
                borderRadius: 6, 
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}>
                {label}
              </span>
            )
          })}
        </div>
      </div>
    </Link>
  )
}
