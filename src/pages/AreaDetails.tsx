import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useApp } from '../components/AppContext'
import { getArea } from '../api/areas'
import { fetchAllFeatures, Feature } from '../api/features'
import { Area } from '../data/mock'
import { 
  ArrowLeft, MapPin, School, Building2, Wallet, CheckCircle2, Trees, ShoppingBag, 
  Dumbbell, Utensils, Waves, TrainFront, Briefcase, Flag, Car, ShieldCheck, 
  ConciergeBell, Wind, UserCheck, PawPrint, Flame, Fan, Warehouse, ChefHat, 
  Refrigerator, Tv, BookOpen, HardHat 
} from 'lucide-react'

const ICON_MAP: Record<string, any> = {
  Waves, Trees, ShoppingBag, School, Dumbbell, Utensils, TrainFront, Briefcase, MapPin, 
  CheckCircle2, Car, ShieldCheck, ConciergeBell, Wind, UserCheck, PawPrint, Flame, Fan,
  Warehouse, ChefHat, Refrigerator, Tv, BookOpen, HardHat
}

const getFeatureIcon = (featureName: string, featuresList: Feature[]) => {
  const lower = featureName.toLowerCase()
  
  // Try to find in catalog first
  const found = featuresList.find(f => 
    f.nameEn.toLowerCase() === lower || 
    f.nameRu.toLowerCase() === lower
  )

  if (found && ICON_MAP[found.icon]) {
    const Icon = ICON_MAP[found.icon]
    return <Icon size={18} className="text-accent" />
  }

  // Fallback to heuristic if not found in catalog (for backward compatibility)
  if (lower.includes('beach') || lower.includes('пляж') || lower.includes('sea') || lower.includes('мор') || 
      lower.includes('pool') || lower.includes('бассейн') || lower.includes('water') || lower.includes('вод')) 
    return <Waves size={18} className="text-accent" />
    
  if (lower.includes('park') || lower.includes('парк') || lower.includes('green') || lower.includes('зелен')) 
    return <Trees size={18} className="text-accent" />
    
  if (lower.includes('mall') || lower.includes('торгов') || lower.includes('shop') || lower.includes('магазин')) 
    return <ShoppingBag size={18} className="text-accent" />
    
  return <CheckCircle2 size={18} className="text-accent" />
}

export default function AreaDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { lang, currency } = useApp()
  const [area, setArea] = useState<Area | null>(null)
  const [featureCatalog, setFeatureCatalog] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [areaData, featuresData] = await Promise.all([
          id ? getArea(id) : Promise.resolve(null),
          fetchAllFeatures()
        ])
        setArea(areaData)
        setFeatureCatalog(featuresData)
      } catch (err) {
        console.error('Failed to fetch data:', err)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [id])

  if (loading) return <div className="p-4 text-center">Loading...</div>
  if (!area) return <div className="p-4 text-center">Area not found</div>

  const name = lang === 'ru' ? area.nameRu : area.nameEn
  const description = lang === 'ru' ? area.descriptionRu : area.descriptionEn
  const features = lang === 'ru' ? area.featuresRu : area.featuresEn
  const type = lang === 'ru' ? area.propertyTypeRu : area.propertyTypeEn
  const location = lang === 'ru' ? area.locationRu : area.locationEn
  const schools = lang === 'ru' ? area.schoolsRu : area.schoolsEn
  const prices = lang === 'ru' ? area.avgPricesRu : area.avgPricesEn
  const nearby = lang === 'ru' ? area.nearbyAreasRu : area.nearbyAreasEn

  return (
    <div className="col" style={{ gap: 20, paddingBottom: 80 }}>
      {/* Header with Back Button */}
      <div className="row" style={{ alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} className="btn-icon" style={{ background: 'none', border: 'none', padding: 0 }}>
          <ArrowLeft size={24} />
        </button>
        <div className="h2" style={{ margin: 0 }}>{name}</div>
      </div>

      {/* Main Info Card */}
      <div className="card" style={{ padding: 20 }}>
        {type && (
          <div className="row" style={{ gap: 8, marginBottom: 16, alignItems: 'center', opacity: 0.7 }}>
            <Building2 size={16} />
            <span style={{ fontSize: 14 }}>{type}</span>
          </div>
        )}
        
        <div className="p" style={{ lineHeight: '1.6', fontSize: 15 }}>
          {description}
        </div>

        {area.roi && (
          <div style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(var(--accent-rgb-legacy), 0.1)', color: 'var(--accent-legacy)', padding: '6px 12px', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>
            <Wallet size={16} />
            ROI {area.roi}
          </div>
        )}
      </div>

      {/* Location */}
      {location && (
        <div className="card" style={{ padding: 20 }}>
          <div className="h3" style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={20} className="text-accent" />
            {lang === 'ru' ? 'Расположение' : 'Location'}
          </div>
          <div className="p">{location}</div>
          
          {nearby && nearby.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 8 }}>{lang === 'ru' ? 'Рядом:' : 'Nearby:'}</div>
              <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
                {nearby.map((n, i) => (
                  <span key={i} style={{ background: 'var(--bg-secondary-legacy)', padding: '4px 10px', borderRadius: 6, fontSize: 13 }}>
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Features */}
      {features && features.length > 0 && (
        <div className="card" style={{ padding: 20 }}>
          <div className="h3" style={{ marginBottom: 16 }}>
            {lang === 'ru' ? 'Особенности и удобства' : 'Features & Amenities'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {features.map((f, i) => (
              <div key={i} className="row" style={{ alignItems: 'center', gap: 10 }}>
                {getFeatureIcon(f, featureCatalog)}
                <span style={{ fontSize: 14 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Schools */}
      {schools && Array.isArray(schools) && schools.length > 0 && (
        <div className="card" style={{ padding: 20 }}>
          <div className="h3" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <School size={20} className="text-accent" />
            {lang === 'ru' ? 'Школы' : 'Schools'}
          </div>
          <div className="col" style={{ gap: 12 }}>
            {schools.map((s: any, i: number) => (
              <div key={i} style={{ padding: 12, background: 'var(--bg-secondary-legacy)', borderRadius: 8 }}>
                <div style={{ fontWeight: 500, marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: 13, opacity: 0.7 }}>{s.distance}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prices */}
      {prices && (
        <div className="card" style={{ padding: 20 }}>
          <div className="h3" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Wallet size={20} className="text-accent" />
            {lang === 'ru' ? 'Средние цены' : 'Average Prices'}
          </div>
          <div className="col" style={{ gap: 10 }}>
            {Object.entries(prices).map(([k, v]) => (
              <div key={k} className="row" style={{ justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid var(--border-legacy)' }}>
                <span style={{ opacity: 0.8, textTransform: 'capitalize' }}>
                  {k === 'oneBed' ? '1 Bed' : 
                   k === 'twoBed' ? '2 Bed' : 
                   k === 'threeBed' ? '3 Bed' : 
                   k === 'fourPlusBed' ? '4+ Bed' : 
                   k.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{v as string}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      <Link to={`/projects?area=${area.id}`} className="btn btn-primary" style={{ marginTop: 10, textAlign: 'center', justifyContent: 'center' }}>
        {lang === 'ru' ? 'Смотреть проекты в этом районе' : 'View Projects in this Area'}
      </Link>
    </div>
  )
}
