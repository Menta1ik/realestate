import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Areas from './pages/Areas'
import AreaDetails from './pages/AreaDetails'
import Developers from './pages/Developers'
import DeveloperDetails from './pages/DeveloperDetails'
import Projects from './pages/Projects'
import Objects from './pages/Objects'
import ProjectDetails from './pages/ProjectDetails'
import PropertyDetails from './pages/PropertyDetails'
import Agent from './pages/Agent'
import { TopBar } from './components/TopBar'
import { BottomNav } from './components/BottomNav'
import { AppProvider } from './components/AppContext'

export default function App() {
  const location = useLocation()
  const hideNav = location.pathname.startsWith('/project/') || location.pathname.startsWith('/property/')

  return (
    <AppProvider>
      <div className="appShell">
        <TopBar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/areas/:id" element={<AreaDetails />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/developers/:developerId" element={<DeveloperDetails />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/objects" element={<Objects />} />
            <Route path="/project/:projectId" element={<ProjectDetails />} />
            <Route path="/property/:propertyId" element={<PropertyDetails />} />
            <Route path="/agent" element={<Agent />} />
          </Routes>
        </main>
        {!hideNav && <BottomNav />}
      </div>
    </AppProvider>
  )
}
