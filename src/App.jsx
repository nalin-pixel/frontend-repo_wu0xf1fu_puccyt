import MinimalHero from './components/MinimalHero'
import { AboutMinimal, WorkMinimal, ProjectsMinimal, ContactMinimal, StatsStrip } from './components/MinimalSections'
import MinimalCursor from './components/MinimalCursor'

function App() {
  return (
    <div className="relative text-black bg-white">
      <MinimalHero />
      <StatsStrip />
      <AboutMinimal />
      <WorkMinimal />
      <ProjectsMinimal />
      <ContactMinimal />
      <MinimalCursor />
    </div>
  )
}

export default App
