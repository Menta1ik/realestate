import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { ListViewIcon, GridIcon } from '@hugeicons/core-free-icons'
import { collections, getAreaById } from '../data/mock'
import { ProjectCard } from '../components/ProjectCard'
import { useApp } from '../components/AppContext'
import { t } from '../i18n'
import { usePropertiesFilter } from '../hooks/usePropertiesFilter'
import { FilterModal } from '../components/FilterModal'
import { BottomBar } from '../components/BottomBar'

export default function Objects() {
  const { lang } = useApp()
  const [params] = useSearchParams()
  const areaId = params.get('area')
  const collectionId = params.get('collection')
  const developer = params.get('developer')

  const {
    status, setStatus,
    propertyType, setPropertyType,
    unitKind, setUnitKind,
    budgetId, setBudgetId,
    sizeId, setSizeId,
    currency, setCurrency,
    areaUnit, setAreaUnit,
    sortOrder, setSortOrder,
    toggleSort,
    filteredProjects, // naming kept as is from hook, effectively properties
    loading
  } = usePropertiesFilter()

  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const finalFiltered = useMemo(() => {
    let list = filteredProjects

    if (collectionId) {
      const c = collections.find(x => x.id === collectionId)
      if (c) list = list.filter(p => c.projectIds.includes(p.id))
    }

    if (areaId) list = list.filter(p => p.areaId === areaId)
    if (developer) list = list.filter(p => p.developer === developer)

    return list
  }, [filteredProjects, areaId, collectionId, developer])

  const heading = useMemo(() => {
    if (developer) return `${t(lang,'dev.title')}: ${developer}`
    if (collectionId) {
      const c = collections.find(c => c.id === collectionId)
      return c ? (lang === 'ru' ? c.titleRu : c.titleEn) : t(lang,'nav.objects')
    }
    if (areaId) {
      const a = getAreaById(areaId)
      return a ? (lang === 'ru' ? a.nameRu : a.nameEn) : t(lang,'nav.objects')
    }
    return t(lang,'nav.objects')
  }, [areaId, collectionId, developer, lang])

  if (loading) {
    return <div className="p" style={{ padding: 20, textAlign: 'center' }}>Loading properties...</div>
  }

  return (
    <div className="col" style={{ gap: 12, paddingBottom: 150 }}>
      <div>
        <div className="h2">{heading}</div>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="p">
            {finalFiltered.length} {t(lang, 'projects.results')}
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button 
              className="btn-icon" 
              onClick={() => setViewMode('list')}
              style={{ 
                padding: 8, 
                background: viewMode === 'list' ? 'var(--card-legacy)' : 'transparent',
                border: viewMode === 'list' ? '1px solid var(--border-legacy)' : 'none',
                opacity: viewMode === 'list' ? 1 : 0.5
              }}
            >
              <HugeiconsIcon icon={ListViewIcon} size={20} />
            </button>
            <button 
              className="btn-icon" 
              onClick={() => setViewMode('grid')}
              style={{ 
                padding: 8, 
                background: viewMode === 'grid' ? 'var(--card-legacy)' : 'transparent',
                border: viewMode === 'grid' ? '1px solid var(--border-legacy)' : 'none',
                opacity: viewMode === 'grid' ? 1 : 0.5
              }}
            >
              <HugeiconsIcon icon={GridIcon} size={20} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ 
        display: viewMode === 'grid' ? 'grid' : 'flex',
        gridTemplateColumns: '1fr 1fr',
        flexDirection: 'column',
        gap: 12 
      }}>
        {finalFiltered.map(p => (
          <ProjectCard 
            key={p.id} 
            project={p} 
            layout={viewMode === 'grid' ? 'vertical' : 'horizontal'} 
            linkPrefix="/property"
          />
        ))}
      </div>

      <BottomBar 
        onOpenFilters={() => setIsFiltersOpen(true)} 
        onToggleSort={toggleSort}
      />

      <FilterModal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        status={status} setStatus={setStatus}
        propertyType={propertyType} setPropertyType={setPropertyType}
        unitKind={unitKind} setUnitKind={setUnitKind}
        budgetId={budgetId} setBudgetId={setBudgetId}
        sizeId={sizeId} setSizeId={setSizeId}
        currency={currency} setCurrency={setCurrency}
        areaUnit={areaUnit} setAreaUnit={setAreaUnit}
        resultsCount={finalFiltered.length}
      />
    </div>
  )
}
