import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { ListViewIcon, GridIcon } from '@hugeicons/core-free-icons'
import { collections } from '../data/mock'
import { ProjectCard } from '../components/ProjectCard'
import { useApp } from '../components/AppContext'
import { t } from '../i18n'
import { useProjectsFilter } from '../hooks/useProjectsFilter'
import { FilterModal } from '../components/FilterModal'
import { BottomBar } from '../components/BottomBar'

export default function Home() {
  const { lang } = useApp()
  
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

  return (
    <div className="col" style={{ gap: 12, paddingBottom: 150 }}>
      {/* Hero */}
      <div className="card" style={{ padding: 14 }}>
        <h1 className="h1">{t(lang,'home.title')} (v2.1)</h1>
        <p className="p">{t(lang,'home.subtitle')}</p>
        <div className="row" style={{ marginTop: 10, gap: 10, flexWrap: 'wrap' }}>
          <Link className="btn primary" to="/projects">{t(lang,'home.browse')}</Link>
          <Link className="btn" to="/areas">{t(lang,'home.explore')}</Link>
        </div>
      </div>

      {/* Collections */}
      <div className="grid4">
        {collections.map(c => (
          <Link key={c.id} to={`/projects?collection=${c.id}`} className="card" style={{ padding: 12 }}>
            <div className="h2">{lang === 'ru' ? c.titleRu : c.titleEn}</div>
            <p className="p" style={{ marginTop: 6 }}>{c.projectIds.length} {t(lang,'projects.results')}</p>
          </Link>
        ))}
      </div>

      {/* Recommended Header with View Toggle */}
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="h2">{t(lang,'home.recommended')}</div>
        <div className="row" style={{ gap: 8, alignItems: 'center' }}>
            <Link className="p" to="/projects" style={{ textDecoration: 'underline', marginRight: 8 }}>{t(lang,'home.seeAll')}</Link>
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

      {/* Filter Modal */}
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
        resultsCount={filteredProjects.length}
      />

      {/* Projects List */}
      {loading ? (
        <div className="p" style={{ textAlign: 'center', padding: 20 }}>Loading...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="p" style={{ textAlign: 'center', padding: 20 }}>
          No projects found. Check connection.
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid2' : 'col'}>
          {filteredProjects.map((p) => (
            <ProjectCard 
              key={p.id} 
              project={p} 
              layout={viewMode === 'grid' ? 'vertical' : 'horizontal'} 
            />
          ))}
        </div>
      )}

      {/* Floating Bottom Bar */}
      <BottomBar 
        onOpenFilters={() => setIsFiltersOpen(true)}
        onToggleSort={toggleSort}
      />
    </div>
  )
}
