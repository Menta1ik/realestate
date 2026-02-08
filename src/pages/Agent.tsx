import { tenant } from '../data/mock'
import { useApp } from '../components/AppContext'
import { t } from '../i18n'

export default function Agent() {
  const { lang } = useApp()
  const wa = `https://wa.me/${tenant.whatsapp.replace(/\D/g, '')}`
  const tg = `https://t.me/${tenant.telegram}`

  return (
    <div className="col" style={{ gap: 12 }}>
      <div className="card" style={{ padding: 14 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div>
            <div className="h1">{tenant.brandName}</div>
            <div className="p">{tenant.tagline}</div>
          </div>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 18,
              background: 'rgba(43, 108, 176, 0.1)',
              border: '1px solid rgba(43, 108, 176, 0.2)',
              color: 'var(--accent)',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 950,
              fontSize: 18,
            }}
          >
            {tenant.brandShort}
          </div>
        </div>

        <div className="hr" />

        <div className="grid2">
          <a className="btn primary" href={wa} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="btn" href={tg} target="_blank" rel="noreferrer">
            Telegram
          </a>
        </div>

        <div className="hr" />

        <div className="p">{t(lang, 'agent.disclaimer')}</div>
      </div>
    </div>
  )
}
