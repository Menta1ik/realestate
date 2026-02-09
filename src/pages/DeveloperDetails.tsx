import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useApp } from '../components/AppContext'
import { t } from '../i18n'
import { fetchDeveloperById, Developer } from '../api/developers'
import { ProjectCard } from '../components/ProjectCard'
import { Project } from '../data/mock'

export default function DeveloperDetails() {
  const { lang } = useApp()
  const { developerId } = useParams()
  const [developer, setDeveloper] = useState<Developer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (developerId) {
      fetchDeveloperById(developerId).then(data => {
        setDeveloper(data)
        setLoading(false)
      }).catch(err => {
        console.error(err)
        setLoading(false)
      })
    }
  }, [developerId])

  if (loading) return <div className="p" style={{ padding: 20 }}>Loading...</div>
  if (!developer) return <div className="p" style={{ padding: 20 }}>Developer not found</div>

  return (
    <div className="col" style={{ gap: 24, paddingBottom: 100 }}>
      {/* Developer Header */}
      <div className="card" style={{ padding: 20 }}>
        <h1 className="h1" style={{ marginBottom: 12 }}>{developer.name}</h1>
        
        <div className="row" style={{ gap: 24, flexWrap: 'wrap', marginBottom: 16 }}>
          {developer.year && (
            <div className="row" style={{ gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 20 }}>📅</span>
              <div>
                <div className="p" style={{ fontSize: 12, opacity: 0.7 }}>Since</div>
                <div style={{ fontWeight: 600 }}>{developer.year}</div>
              </div>
            </div>
          )}
          {developer.office && (
            <div className="row" style={{ gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 20 }}>📍</span>
              <div>
                <div className="p" style={{ fontSize: 12, opacity: 0.7 }}>Office</div>
                <div style={{ fontWeight: 600 }}>{developer.office}</div>
              </div>
            </div>
          )}
          <div className="row" style={{ gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: 20 }}>🏗️</span>
            <div>
              <div className="p" style={{ fontSize: 12, opacity: 0.7 }}>Projects</div>
              <div style={{ fontWeight: 600 }}>{developer.projects?.length || 0}</div>
            </div>
          </div>
        </div>

        {developer.description && (
          <div className="p" style={{ lineHeight: 1.6, whiteSpace: 'pre-line' }}>
            {developer.description}
          </div>
        )}
      </div>

      {/* Developer Projects */}
      <div>
        <div className="h2" style={{ marginBottom: 16 }}>{t(lang, 'dev.projects')} ({developer.projects?.length || 0})</div>
        
        {developer.projects && developer.projects.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: 16 
          }}>
            {developer.projects.map((p: any) => (
              <ProjectCard key={p.id} project={p as Project} />
            ))}
          </div>
        ) : (
          <div className="p" style={{ opacity: 0.7 }}>{t(lang, 'projects.noResults')}</div>
        )}
      </div>
    </div>
  )
}
