import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getAreaById, tenant, genLeadId, Project } from '../data/mock'
import { fetchPropertyById } from '../api/properties'
import { useApp } from '../components/AppContext'
import { t } from '../i18n'
import { convertFromAED, formatMoney } from '../currency'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {
  Bed,
  Bath,
  Maximize,
  HardHat,
  MapPin,
  CheckCircle2,
  Building2,
  Waves,
  Dumbbell,
  Car,
  ShieldCheck,
  ConciergeBell,
  Trees,
  ShoppingBag,
  PawPrint,
  Wind,
  UserCheck,
  BookOpen,
  Fan,
  Utensils,
  Bus,
  ChefHat,
  Mountain,
  Tv,
  Gamepad2,
  Flame,
  Droplets,
  Flower2,
  Warehouse,
  Refrigerator,
  FileText,
  Download
} from 'lucide-react'

// --- Icon Mapping ---
const AMENITY_ICONS: Record<string, any> = {
  // Common
  shared_pool: Waves,
  private_pool: Waves,
  kids_pool: Waves,
  
  shared_gym: Dumbbell,
  private_gym: Dumbbell,
  gym: Dumbbell,
  
  covered_parking: Car,
  security: ShieldCheck,
  concierge: ConciergeBell,
  
  balcony: Wind,
  
  maid_service: UserCheck,
  maids_room: UserCheck,
  
  pets_allowed: PawPrint,
  
  beachfront: Trees,
  public_parks: Trees,
  private_garden: Flower2,
  
  near_mall: ShoppingBag,
  supermarket: ShoppingBag,
  
  restaurant: Utensils,
  bbq_area: Flame,
  bbq_facility: Flame,
  
  near_transport: Bus,
  
  central_ac: Fan,
  
  builtin_wardrobes: Warehouse,
  builtin_wardrobe: Warehouse,
  
  equipped_kitchen: ChefHat,
  builtin_appliances: Refrigerator,
  
  sea_view: Mountain,
  water_view: Waves,
  landmark_view: Building2,
  
  cable_tv: Tv,
  kids_playground: Gamepad2,
  
  shared_spa: Droplets,
  private_jacuzzi: Droplets,
  
  study: BookOpen,
  
  maintenance: HardHat,
}

export default function PropertyDetails() {
  const { lang, currency } = useApp()
  const { propertyId } = useParams()
  
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProperty = async () => {
      if (!propertyId) return
      try {
        const data = await fetchPropertyById(propertyId)
        setProject(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadProperty()
  }, [propertyId])

  const area = project ? getAreaById(project.areaId) : null

  // Local state for units toggle
  const [isSqft, setIsSqft] = useState(true)

  const leadId = useMemo(() => genLeadId(), [propertyId])

  if (loading) {
    return <div className="p" style={{ padding: 20, textAlign: 'center' }}>Loading...</div>
  }

  if (!project) {
    return (
      <div className="card" style={{ padding: 20, textAlign: 'center' }}>
        <div className="h2">{t(lang, 'project.notFound')}</div>
        <Link className="btn" to="/objects" style={{ marginTop: 16, display: 'inline-block' }}>
          {t(lang, 'project.back')}
        </Link>
      </div>
    )
  }

  // Derived Values
  const price = formatMoney(convertFromAED(project.priceFromAED, currency), currency)
  const sizeVal = isSqft 
    ? project.specs.sizeSqft 
    : Math.round(project.specs.sizeSqft * 0.092903)
  const sizeUnit = isSqft ? 'sq.ft' : 'm²'

  // WhatsApp message
  const baseText = `LeadID:${leadId} | Property:${lang === 'ru' ? project.nameRu : project.nameEn}`
  const wa = `https://wa.me/${tenant.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(baseText)}`

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* 1. Hero Section (Gallery) */}
      <div style={{ position: 'relative', height: '45vh', minHeight: 320, backgroundColor: '#000' }}>
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          style={{ width: '100%', height: '100%' }}
        >
          {project.photos.map((url, idx) => (
            <SwiperSlide key={idx}>
              <img 
                src={url} 
                alt={`Slide ${idx}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '70%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
              }} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overlay Badges */}
        <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, display: 'flex', gap: 8 }}>
          <div className="badge" style={{ background: project.status === 'Ready' ? '#10b981' : '#3b82f6', color: '#fff', border: 'none' }}>
            {t(lang, project.status === 'Ready' ? 'filter.status.ready' : 'filter.status.offplan')}
          </div>
          <div className="badge" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', color: '#000', border: 'none' }}>
            {t(lang, `type.${project.type}`)}
          </div>
        </div>

        {/* Hero Content (Bottom Left) */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, padding: '0 20px 24px' }}>
          <div className="row" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 16, gap: 6 }}>
            <MapPin size={16} />
            <span style={{ fontSize: 15 }}>
              {area ? (lang === 'ru' ? area.nameRu : area.nameEn) : 'Dubai'}
            </span>
          </div>

          <div style={{ fontSize: 26, fontWeight: 800, color: '#fff' }}>
            {price} <span style={{ fontSize: 16, fontWeight: 400, opacity: 0.9 }}>{t(lang, 'project.starting')}</span>
          </div>
        </div>
      </div>

      <div className="content-pad" style={{ marginTop: 24 }}>

        {/* 2. Title & Developer */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, lineHeight: 1.1, flex: 1 }}>
              {lang === 'ru' ? project.nameRu : project.nameEn}
            </h1>
            <div style={{ 
              fontSize: 12, 
              color: 'var(--muted)', 
              background: '#f0f0f0', 
              padding: '4px 8px', 
              borderRadius: 6,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              marginLeft: 12,
              marginTop: 2
            }}>
              {t(lang, 'project.ref')}: {project.ref}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted)', fontSize: 15, marginTop: 6 }}>
            <Building2 size={16} />
            <span>{project.developer}</span>
          </div>
        </div>
        
        {/* 2. Key Specs Grid */}
        <div className="grid4" style={{ gap: 12 }}>
          <SpecItem 
            icon={<Bed size={20} />} 
            label={t(lang, 'project.specs.beds')}
            value={`${project.specs.bedrooms} ${lang === 'ru' ? 'сп.' : 'BR'}`} 
          />
          <SpecItem 
            icon={<Bath size={20} />} 
            label={t(lang, 'project.specs.baths')}
            value={project.specs.bathrooms} 
          />
          <SpecItem 
            icon={<Maximize size={20} />} 
            label={t(lang, 'project.specs.area')} 
            value={`${sizeVal} ${sizeUnit}`} 
            onClick={() => setIsSqft(!isSqft)}
            isActionable
          />
          <SpecItem 
            icon={<HardHat size={20} />} 
            label={t(lang, 'project.specs.developer')}
            value={project.developer} 
          />
        </div>

        {/* 3. Unit Types */}
        <div style={{ marginTop: 36 }}>
          <div className="h2" style={{ marginBottom: 16 }}>{t(lang, 'project.unitTypes')}</div>
          <div className="col" style={{ gap: 12 }}>
            {project.unitTypes.map((u, i) => {
               const uPrice = formatMoney(convertFromAED(u.priceFromAED, currency), currency)
               const uSize = u.sizeFromSqFt 
                 ? (isSqft ? u.sizeFromSqFt : Math.round(u.sizeFromSqFt * 0.092903))
                 : null
               
               return (
                 <div key={i} className="card" style={{ padding: 16, background: '#fff' }}>
                   <div className="row" style={{ justifyContent: 'space-between', marginBottom: 6 }}>
                     <div style={{ fontWeight: 600, fontSize: 17 }}>{t(lang, `unit.${u.kind}`)}</div>
                     <div style={{ fontWeight: 700, color: 'var(--accent)', fontSize: 17 }}>{uPrice}</div>
                   </div>
                   {uSize && (
                     <div className="row" style={{ gap: 6, opacity: 0.6, fontSize: 14 }}>
                        <Maximize size={14} />
                        {uSize} {sizeUnit}
                     </div>
                   )}
                 </div>
               )
            })}
          </div>
        </div>

        {/* 4. Payment Plan & Handover */}
        <div className="card" style={{ marginTop: 32, padding: 20, background: 'linear-gradient(135deg, rgba(43, 108, 176, 0.08), rgba(43, 108, 176, 0.02))', border: '1px solid rgba(43, 108, 176, 0.15)' }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div>
              <div className="muted" style={{ fontSize: 12, textTransform: 'uppercase', marginBottom: 6, letterSpacing: '0.05em' }}>{t(lang, 'project.paymentPlan')}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)' }}>
                {lang === 'ru' ? project.paymentPlanRu : project.paymentPlanEn}
              </div>
            </div>
            <div style={{ textAlign: 'right', paddingLeft: 20, borderLeft: '1px solid var(--border)' }}>
              <div className="muted" style={{ fontSize: 12, textTransform: 'uppercase', marginBottom: 6, letterSpacing: '0.05em' }}>{t(lang, 'project.handover')}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>
                {lang === 'ru' ? project.handoverRu : project.handoverEn}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Description */}
        <div style={{ marginTop: 36 }}>
          <div className="h2" style={{ marginBottom: 16 }}>{t(lang, 'project.about')}</div>
          <div className="p" style={{ lineHeight: 1.7, opacity: 0.9, fontSize: 15, color: 'var(--text)' }}>
            {lang === 'ru' ? project.descriptionRu : project.descriptionEn}
          </div>
          
          <div className="row" style={{ gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{ 
                fontSize: 12, 
                padding: '6px 12px', 
                borderRadius: 20, 
                background: '#edf2f7', 
                color: 'var(--muted)',
                fontWeight: 600
              }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 6. Amenities */}
        <div style={{ marginTop: 36 }}>
          <div className="h2" style={{ marginBottom: 16 }}>{t(lang, 'project.amenities')}</div>
          <div className="grid2" style={{ gap: 12 }}>
            {project.amenities.map(key => {
              const Icon = AMENITY_ICONS[key] || CheckCircle2
              return (
                <div key={key} className="row" style={{ gap: 12, padding: 14, background: '#fff', borderRadius: 12, border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
                  <Icon size={20} color="var(--accent)" />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{t(lang, `amenity.${key}`)}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 7. Documents */}
        {project.documents && project.documents.length > 0 && (
          <div style={{ marginTop: 36 }}>
            <div className="h2" style={{ marginBottom: 16 }}>{t(lang, 'project.documents')}</div>
            <div className="col" style={{ gap: 12 }}>
              {project.documents.map((doc, i) => (
                <a 
                  key={i} 
                  href={doc.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="row" 
                  style={{ 
                    padding: 16, 
                    background: '#fff', 
                    borderRadius: 14, 
                    border: '1px solid var(--border)', 
                    textDecoration: 'none',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow)'
                  }}
                >
                  <div className="row" style={{ gap: 12 }}>
                    <div style={{ 
                      width: 40, height: 40, 
                      borderRadius: 10, 
                      background: '#fff0f0', 
                      color: '#e53e3e',
                      display: 'grid', placeItems: 'center' 
                    }}>
                      <FileText size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text)' }}>
                        {lang === 'ru' ? doc.labelRu : doc.labelEn}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>PDF</div>
                    </div>
                  </div>
                  <div style={{ color: 'var(--accent)' }}>
                    <Download size={20} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* 7. Sticky Footer */}
      <div style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        padding: '12px 16px 24px',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--border)',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        gap: 12
      }}>
        <a 
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="btn"
          style={{ 
            width: '100%',
            maxWidth: 240,
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 8,
            height: 44,
            fontSize: 15,
            fontWeight: 700,
            borderRadius: 12,
            background: 'var(--accent)',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(43, 108, 176, 0.3)'
          }}
        >
          <Building2 size={18} />
          {t(lang, 'project.enquire')}
        </a>
      </div>
    </div>
  )
}

function SpecItem({ icon, label, value, onClick, isActionable }: any) {
  return (
    <div 
      onClick={onClick}
      style={{ 
        padding: 16, 
        background: '#fff', 
        borderRadius: 16, 
        border: '1px solid var(--border)',
        cursor: isActionable ? 'pointer' : 'default',
        transition: 'all 0.2s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 8,
        boxShadow: 'var(--shadow)'
      }}
    >
      <div style={{ opacity: 0.7, color: 'var(--accent)' }}>{icon}</div>
      <div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{value}</div>
      </div>
    </div>
  )
}
