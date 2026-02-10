import { useState, useMemo, useEffect } from 'react'
import { Project, PropertyType } from '../data/mock'
import { Status, UnitKind, Currency, AreaUnit, getBudgets, getSizes } from '../components/FilterModal'
import { fetchProjects } from '../api/projects'

const RATES = {
  AED: 1,
  USD: 3.67,
  EUR: 4.00
}

const AREA_RATES = {
  sqft: 1,
  sqm: 10.764
}

export function useProjectsFilter() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<Status>('All')
  const [propertyType, setPropertyType] = useState<PropertyType | 'all'>('all')
  const [unitKind, setUnitKind] = useState<UnitKind>('Any')
  const [budgetId, setBudgetId] = useState<string>('any')
  const [currency, setCurrency] = useState<Currency>('AED')
  const [sizeId, setSizeId] = useState<string>('any')
  const [areaUnit, setAreaUnit] = useState<AreaUnit>('sqft')
  const [sortOrder, setSortOrder] = useState<'default' | 'price_asc' | 'price_desc'>('default')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects()
        setProjects(data)
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  const setCurrencyWrapped = (c: Currency) => {
    setCurrency(c)
    setBudgetId('any')
  }

  const setAreaUnitWrapped = (u: AreaUnit) => {
    setAreaUnit(u)
    setSizeId('any')
  }

  const filteredProjects = useMemo(() => {
    let res = projects.filter(p => {
      if (status !== 'All' && p.status !== status) return false
      if (propertyType !== 'all' && p.type !== propertyType) return false
      if (unitKind !== 'Any') {
        const hasUnit = p.unitTypes.some(u => u.kind === unitKind)
        
        if (!hasUnit) {
          let matchesStr = false
          if (p.bedroomsStr) {
            let target = ''
            if (unitKind === 'Studio') target = 'Studio'
            else if (unitKind === '1BR') target = '1'
            else if (unitKind === '2BR') target = '2'
            else if (unitKind === '3BR') target = '3'
            
            if (target) {
              const parts = p.bedroomsStr.split(',').map(s => s.trim())
              if (parts.includes(target)) matchesStr = true
            }
          }
          
          if (!matchesStr) return false
        }
      }
      
      const budgets = getBudgets(currency)
      const budget = budgets.find(b => b.id === budgetId)
      if (budget) {
        // Convert filter range to AED to match project price
        const rate = RATES[currency]
        const minAED = budget.min * rate
        const maxAED = budget.max * rate
        
        if (p.priceFromAED < minAED || p.priceFromAED >= maxAED) return false
      }

      const sizes = getSizes(areaUnit)
      const size = sizes.find(s => s.id === sizeId)
      if (size) {
        // Convert filter range to sq.ft to match project size
        const rate = AREA_RATES[areaUnit]
        const minSqFt = size.min * rate
        const maxSqFt = size.max * rate

        if (p.specs.sizeSqft < minSqFt || p.specs.sizeSqft >= maxSqFt) return false
      }

      return true
    })

    if (sortOrder === 'price_asc') {
      res.sort((a, b) => a.priceFromAED - b.priceFromAED)
    } else if (sortOrder === 'price_desc') {
      res.sort((a, b) => b.priceFromAED - a.priceFromAED)
    }

    return res
  }, [projects, status, propertyType, unitKind, budgetId, currency, sizeId, areaUnit, sortOrder])

  const toggleSort = () => {
    if (sortOrder === 'default') setSortOrder('price_asc')
    else if (sortOrder === 'price_asc') setSortOrder('price_desc')
    else setSortOrder('default')
  }

  return {
    status, setStatus,
    propertyType, setPropertyType,
    unitKind, setUnitKind,
    budgetId, setBudgetId,
    currency, setCurrency: setCurrencyWrapped,
    sizeId, setSizeId,
    areaUnit, setAreaUnit: setAreaUnitWrapped,
    sortOrder, setSortOrder,
    toggleSort,
    filteredProjects,
    viewMode, setViewMode,
    loading
  }
}
