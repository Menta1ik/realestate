import { HugeiconsIcon } from '@hugeicons/react'
import { FilterHorizontalIcon, SortByUp01Icon } from '@hugeicons/core-free-icons'
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
        <HugeiconsIcon icon={FilterHorizontalIcon} size={18} strokeWidth={1.5} />
        {t(lang, 'projects.filters').toUpperCase()}
      </button>

      <button 
        onClick={() => {
          haptic.impact('light')
          onToggleSort()
        }}
        className="bottomBarBtn secondary"
      >
        <HugeiconsIcon icon={SortByUp01Icon} size={20} strokeWidth={1.5} />
      </button>

      <a 
        href={`https://wa.me/${tenant.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="bottomBarAvatar"
      >
          {/* Avatar placeholder */}
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-full">
            <span className="text-xs text-gray-500">A</span>
          </div>
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
