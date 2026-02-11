import { useMemo, useState } from 'react'
import { Project, genLeadId } from '../data/mock'
import { useApp } from './AppContext'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'

type Props = {
  open: boolean
  onClose: () => void
  project?: Project | null
}

export function LeadModal({ open, onClose, project }: Props) {
  const { lang } = useApp()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [channel, setChannel] = useState<'whatsapp' | 'telegram'>('whatsapp')
  const [note, setNote] = useState('')
  const [consent, setConsent] = useState(false)

  const leadId = useMemo(() => genLeadId(), [open])

  if (!open) return null

  const submit = () => {
    if (!phone.trim()) {
      alert('Phone is required')
      return
    }
    if (!consent) {
      alert('Consent is required')
      return
    }
    console.log('[LEAD_SUBMIT]', {
      leadId,
      name,
      phone,
      channel,
      note,
      projectId: project?.id ?? null
    })
    alert(`Lead sent! LeadID: ${leadId}`)
    onClose()
  }

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div>
            <div className="h2">Request details</div>
            <div className="p">{project ? (lang === 'ru' ? project.nameRu : project.nameEn) : 'General request'} • LeadID: {leadId}</div>
          </div>
          <button className="btn" onClick={onClose} style={{ padding: 8 }}>
            <HugeiconsIcon icon={Cancel01Icon} size={20} />
          </button>
        </div>

        <div className="hr" />

        <div className="grid2">
          <div>
            <div className="label">Name (optional)</div>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div>
            <div className="label">Phone (required)</div>
            <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+971..." />
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <div className="label">Preferred contact</div>
          <div className="chips">
            <button className="chip" aria-pressed={channel==='whatsapp'} onClick={() => setChannel('whatsapp')}>WhatsApp</button>
            <button className="chip" aria-pressed={channel==='telegram'} onClick={() => setChannel('telegram')}>Telegram</button>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <div className="label">Message (optional)</div>
          <textarea className="input" style={{ minHeight: 84, resize: 'vertical' }} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Budget, move-in date, purpose, etc." />
        </div>

        <label style={{ display: 'flex', gap: 10, marginTop: 10, color: 'var(--muted-legacy)', fontSize: 12 }}>
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          I agree to be contacted and to the processing of my data.
        </label>

        <div className="row" style={{ justifyContent: 'space-between', marginTop: 12 }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={submit}>Send request</button>
        </div>
      </div>
    </div>
  )
}
