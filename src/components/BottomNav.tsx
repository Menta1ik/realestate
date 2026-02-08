import { NavLink } from 'react-router-dom'
import { Map, Pickaxe, Home, Building2, Key } from 'lucide-react'
import { useApp } from './AppContext'
import { t } from '../i18n'

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  padding: '8px 2px',
  borderRadius: 8,
  background: 'transparent',
  color: isActive ? 'var(--accent)' : 'var(--muted)',
  textDecoration: 'none',
  fontSize: 10,
  fontWeight: isActive ? 700 : 500,
  minWidth: 60,
})

export function BottomNav() {
  const { lang, haptic } = useApp()
  return (
    <nav style={{ 
      position: 'fixed', 
      left: 0, 
      right: 0, 
      bottom: 0, 
      padding: '6px 0 20px 0', 
      borderTop: '1px solid var(--border)', 
      background: 'rgba(255,255,255,0.95)', 
      backdropFilter: 'blur(10px)', 
      zIndex: 100 
    }}>
      <div style={{ maxWidth: 940, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
        <NavLink to="/areas" style={linkStyle} onClick={() => haptic.selection()}>
          <Map size={20} />
          {t(lang,'nav.areas')}
        </NavLink>
        <NavLink to="/developers" style={linkStyle} onClick={() => haptic.selection()}>
          <Pickaxe size={20} />
          {t(lang,'nav.developers')}
        </NavLink>
        <NavLink to="/" style={linkStyle} onClick={() => haptic.selection()}>
          <Home size={20} />
          {t(lang,'nav.home')}
        </NavLink>
        <NavLink to="/projects" style={linkStyle} onClick={() => haptic.selection()}>
          <Building2 size={20} />
          {t(lang,'nav.projects')}
        </NavLink>
        <NavLink to="/objects" style={linkStyle} onClick={() => haptic.selection()}>
          <Key size={20} />
          {t(lang,'nav.objects')}
        </NavLink>
      </div>
    </nav>
  )
}
