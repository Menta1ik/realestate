import { useState, useMemo, useEffect } from 'react'
import { Project, PropertyType } from '../data/mock'
import { Status, UnitKind, Currency, AreaUnit, getBudgets, getSizes } from '../components/FilterModal'
import { fetchProperties } from '../api/properties'

const RATES = {
  AED: 1,
  USD: 3.67,
  EUR: 4.00
}

const AREA_RATES = {
  sqft: 1,
  sqm: 10.764
}

export function usePropertiesFilter() {
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
    const loadProperties = async () => {
      try {
        const data = await fetchProperties()
        setProjects(data)
      } catch (error) {
        console.error('Failed to fetch properties:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProperties()
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
        if (!hasUnit) return false
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
    sizeId, setSizeId,
    currency, setCurrency: setCurrencyWrapped,
    areaUnit, setAreaUnit: setAreaUnitWrapped,
    sortOrder, setSortOrder,
    toggleSort,
    filteredProjects,
    loading,
    viewMode, setViewMode
  }
}
