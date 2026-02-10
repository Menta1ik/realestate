import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LayoutList, LayoutGrid } from 'lucide-react'
import { collections, getAreaById } from '../data/mock'
import { ProjectCard } from '../components/ProjectCard'
import { useApp } from '../components/AppContext'
import { t } from '../i18n'
import { useProjectsFilter } from '../hooks/useProjectsFilter'
import { FilterModal } from '../components/FilterModal'
import { BottomBar } from '../components/BottomBar'

export default function Projects() {
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
    filteredProjects,
    loading
  } = useProjectsFilter()

  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // Apply URL params filtering on top of hook filtering
  // The hook filters by status/type/budget/unit.
  // URL params filter by area/collection/developer.
  // We need to combine them.
  // Wait, `useProjectsFilter` filters `projects` (all projects).
  // So we just need to filter `filteredProjects` further.

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
      return c ? (lang === 'ru' ? c.titleRu : c.titleEn) : t(lang,'projects.title')
    }
    if (areaId) {
      const a = getAreaById(areaId)
      return a ? (lang === 'ru' ? a.nameRu : a.nameEn) : t(lang,'projects.title')
    }
    return t(lang,'projects.title')
  }, [areaId, collectionId, developer, lang])

  if (loading) {
    return <div className="p" style={{ padding: 20, textAlign: 'center' }}>Loading projects...</div>
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
              <LayoutList size={20} />
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
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>
      </div>

      <FilterModal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        status={status}
        setStatus={setStatus}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        unitKind={unitKind}
        setUnitKind={setUnitKind}
        budgetId={budgetId}
        setBudgetId={setBudgetId}
        currency={currency}
        setCurrency={setCurrency}
        sizeId={sizeId}
        setSizeId={setSizeId}
        areaUnit={areaUnit}
        setAreaUnit={setAreaUnit}
        resultsCount={finalFiltered.length}
      />

      <div className={viewMode === 'grid' ? 'grid2' : 'col'}>
        {finalFiltered.map((p) => (
          <ProjectCard 
            key={p.id} 
            project={p} 
            layout={viewMode === 'grid' ? 'vertical' : 'horizontal'} 
          />
        ))}
      </div>

      <BottomBar 
        onOpenFilters={() => setIsFiltersOpen(true)}
        onToggleSort={toggleSort}
      />
    </div>
  )
}
