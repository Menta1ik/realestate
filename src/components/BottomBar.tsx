import { SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import { tenant } from '../data/mock'
import { useApp } from './AppContext'
import { t } from '../i18n'

type Props = {
  onOpenFilters: () => void
  onToggleSort: () => void
}

export function BottomBar({ onOpenFilters, onToggleSort }: Props) {
  const { lang, haptic } = useApp()

  return (
    <div className="bottomBar">
      <button 
        onClick={() => {
          haptic.impact('light')
          onOpenFilters()
        }}
        className="bottomBarBtn primary"
      >
        <SlidersHorizontal size={18} />
        {t(lang, 'projects.filters').toUpperCase()}
      </button>

      <button 
        onClick={() => {
          haptic.impact('light')
          onToggleSort()
        }}
        className="bottomBarBtn secondary"
      >
        <ArrowUpDown size={20} />
      </button>

      <a 
        href={`https://wa.me/${tenant.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="bottomBarAvatar"
      >
          {/* Avatar placeholder */}
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" 
            alt="Agent"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ 
            position: 'absolute', 
            top: 4, 
            right: 4, 
            width: 10, 
            height: 10, 
            background: '#48BB78', 
            borderRadius: '50%', 
            border: '1px solid #fff' 
          }} />
      </a>
    </div>
  )
}
