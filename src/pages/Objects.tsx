import { useApp } from '../components/AppContext'
import { t } from '../i18n'

export default function Objects() {
  const { lang } = useApp()
  return (
    <div style={{ padding: 20, textAlign: 'center', paddingTop: 100 }}>
      <h1>{t(lang, 'nav.objects')}</h1>
      <p style={{ color: 'var(--muted)', marginTop: 10 }}>
        {lang === 'ru' 
          ? 'Раздел находится в разработке. Скоро здесь появятся отдельные объекты.' 
          : 'This section is under construction. Individual listings coming soon.'}
      </p>
    </div>
  )
}
