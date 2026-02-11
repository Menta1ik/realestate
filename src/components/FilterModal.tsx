import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { useApp } from './AppContext'
import { t } from '../i18n'
import { PropertyType } from '../data/mock'

export type Status = 'All' | 'Off-plan' | 'Ready'
export type UnitKind = 'Any' | 'Studio' | '1BR' | '2BR' | '3BR'
export type Currency = 'AED' | 'USD' | 'EUR'
export type AreaUnit = 'sqft' | 'sqm'

export const currencies: Currency[] = ['AED', 'USD', 'EUR']
export const areaUnits: AreaUnit[] = ['sqft', 'sqm']

export const getBudgets = (currency: Currency) => {
  if (currency === 'USD') return [
    { id: 'any', key: 'filter.budget.any', min: 0, max: Infinity },
    { id: 'lt200', key: 'filter.budget.usd.lt200', min: 0, max: 200000 },
    { id: '200-400', key: 'filter.budget.usd.200-400', min: 200000, max: 400000 },
    { id: '400-800', key: 'filter.budget.usd.400-800', min: 400000, max: 800000 },
    { id: 'gt800', key: 'filter.budget.usd.gt800', min: 800000, max: Infinity },
  ]
  if (currency === 'EUR') return [
    { id: 'any', key: 'filter.budget.any', min: 0, max: Infinity },
    { id: 'lt200', key: 'filter.budget.eur.lt200', min: 0, max: 200000 },
    { id: '200-400', key: 'filter.budget.eur.200-400', min: 200000, max: 400000 },
    { id: '400-750', key: 'filter.budget.eur.400-750', min: 400000, max: 750000 },
    { id: 'gt750', key: 'filter.budget.eur.gt750', min: 750000, max: Infinity },
  ]
  return [
    { id: 'any', key: 'filter.budget.any', min: 0, max: Infinity },
    { id: 'lt800', key: 'filter.budget.lt800', min: 0, max: 800000 },
    { id: '800-1500', key: 'filter.budget.800-1500', min: 800000, max: 1500000 },
    { id: '1500-3000', key: 'filter.budget.1500-3000', min: 1500000, max: 3000000 },
    { id: 'gt3000', key: 'filter.budget.gt3000', min: 3000000, max: Infinity },
  ]
}

export const getSizes = (unit: AreaUnit) => {
  if (unit === 'sqm') return [
    { id: 'any', key: 'filter.size.any', min: 0, max: Infinity },
    { id: 'lt100', key: 'filter.size.sqm.lt100', min: 0, max: 100 },
    { id: '100-200', key: 'filter.size.sqm.100-200', min: 100, max: 200 },
    { id: 'gt200', key: 'filter.size.sqm.gt200', min: 200, max: Infinity },
  ]
  return [
    { id: 'any', key: 'filter.size.any', min: 0, max: Infinity },
    { id: 'lt1000', key: 'filter.size.lt1000', min: 0, max: 1000 },
    { id: '1000-2000', key: 'filter.size.1000-2000', min: 1000, max: 2000 },
    { id: 'gt2000', key: 'filter.size.gt2000', min: 2000, max: Infinity },
  ]
}

export const statusOptions: Status[] = ['All', 'Off-plan', 'Ready']
export const propertyTypes: (PropertyType | 'all')[] = ['all', 'apartment', 'villa', 'townhouse', 'penthouse', 'commercial_property']
export const unitKinds: UnitKind[] = ['Any', 'Studio', '1BR', '2BR', '3BR']

export const statusKey = (s: Status) => (s === 'All' ? 'filter.status.all' : s === 'Off-plan' ? 'filter.status.offplan' : 'filter.status.ready')
export const propertyTypeKey = (k: PropertyType | 'all') => k === 'all' ? 'cat.all' : `type.${k}`
export const unitKindKey = (k: UnitKind) => {
  if (k === 'Any') return 'filter.type.any'
  if (k === 'Studio') return 'filter.type.studio'
  if (k === '1BR') return 'filter.type.1br'
  if (k === '2BR') return 'filter.type.2br'
  if (k === '3BR') return 'filter.type.3br'
  return k
}

type Props = {
  isOpen: boolean
  onClose: () => void
  status: Status
  setStatus: (s: Status) => void
  propertyType: PropertyType | 'all'
  setPropertyType: (p: PropertyType | 'all') => void
  unitKind: UnitKind
  setUnitKind: (u: UnitKind) => void
  budgetId: string
  setBudgetId: (id: string) => void
  currency: Currency
  setCurrency: (c: Currency) => void
  sizeId: string
  setSizeId: (id: string) => void
  areaUnit: AreaUnit
  setAreaUnit: (u: AreaUnit) => void
  resultsCount: number
}

export function FilterModal({
  isOpen, onClose,
  status, setStatus,
  propertyType, setPropertyType,
  unitKind, setUnitKind,
  budgetId, setBudgetId,
  currency, setCurrency,
  sizeId, setSizeId,
  areaUnit, setAreaUnit,
  resultsCount
}: Props) {
  const { lang, haptic } = useApp()
  
  if (!isOpen) return null

  const budgets = getBudgets(currency)
  const sizes = getSizes(areaUnit)

  const handleSelection = (fn: () => void) => {
    haptic.selection()
    fn()
  }

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ paddingBottom: 80 }}>
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
          <div className="h2">{t(lang, 'projects.filters')}</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', padding: 4 }}>
            <HugeiconsIcon icon={Cancel01Icon} size={24} />
          </button>
        </div>

        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {/* Status */}
          <div style={{ marginBottom: 16 }}>
            <div className="label" style={{ marginBottom: 8 }}>{t(lang, 'filter.label.status')}</div>
            <div className="chips">
              {statusOptions.map((s) => (
                <button key={s} className="chip" aria-pressed={status === s} onClick={() => handleSelection(() => setStatus(s))}>
                  {t(lang, statusKey(s))}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div style={{ marginBottom: 16 }}>
            <div className="label" style={{ marginBottom: 8 }}>{t(lang, 'filter.label.propertyType')}</div>
            <div className="chips">
              {propertyTypes.map((k) => (
                <button key={k} className="chip" aria-pressed={propertyType === k} onClick={() => handleSelection(() => setPropertyType(k))}>
                  {t(lang, propertyTypeKey(k))}
                </button>
              ))}
            </div>
          </div>

          {/* Bedrooms (Unit Kind) */}
          <div style={{ marginBottom: 16 }}>
            <div className="label" style={{ marginBottom: 8 }}>{t(lang, 'filter.label.bedrooms')}</div>
            <div className="chips">
              {unitKinds.map((k) => (
                <button key={k} className="chip" aria-pressed={unitKind === k} onClick={() => handleSelection(() => setUnitKind(k))}>
                  {t(lang, unitKindKey(k))}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div className="label">{t(lang, 'filter.label.budget')}</div>
              <div style={{ display: 'flex', background: 'var(--bg-legacy)', borderRadius: 8, padding: 2 }}>
                {currencies.map(c => (
                  <button
                    key={c}
                    onClick={() => handleSelection(() => setCurrency(c))}
                    style={{
                      border: 'none',
                      background: currency === c ? 'var(--card-legacy)' : 'transparent',
                      color: currency === c ? 'var(--text-legacy)' : 'var(--muted-legacy)',
                      boxShadow: currency === c ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      borderRadius: 6,
                      padding: '2px 8px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="chips">
              {budgets.map((b) => (
                <button key={b.id} className="chip" aria-pressed={budgetId === b.id} onClick={() => handleSelection(() => setBudgetId(b.id))}>
                  {t(lang, b.key)}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div className="label">{t(lang, 'filter.label.size')}</div>
              <div style={{ display: 'flex', background: 'var(--bg-legacy)', borderRadius: 8, padding: 2 }}>
                {areaUnits.map(u => (
                  <button
                    key={u}
                    onClick={() => handleSelection(() => setAreaUnit(u))}
                    style={{
                      border: 'none',
                      background: areaUnit === u ? 'var(--card-legacy)' : 'transparent',
                      color: areaUnit === u ? 'var(--text-legacy)' : 'var(--muted-legacy)',
                      boxShadow: areaUnit === u ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      borderRadius: 6,
                      padding: '2px 8px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {t(lang, `filter.unit.${u}`)}
                  </button>
                ))}
              </div>
            </div>
            <div className="chips">
              {sizes.map((s) => (
                <button key={s.id} className="chip" aria-pressed={sizeId === s.id} onClick={() => handleSelection(() => setSizeId(s.id))}>
                  {t(lang, s.key)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 16, borderTop: '1px solid var(--border-legacy)', marginTop: 16 }}>
          <button 
            className="btn primary" 
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => {
              haptic.impact('light')
              onClose()
            }}
          >
            {t(lang, 'ui.show')} ({resultsCount})
          </button>
        </div>
      </div>
    </div>
  )
}
