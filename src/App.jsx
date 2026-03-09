import './App.css'
import CountdownTimer from './components/CountdownTimer'
import FixturesList from './components/FixturesList'
import StandingsTable from './components/StandingsTable'
import fixtures from './data/fixtures.json'
import standings from './data/standings.json'

function App() {
  const nextGame = fixtures
    .filter((f) => f.status === 'upcoming')
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0] || null

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-brand">
          <span className="header-ball">🏐</span>
          <div>
            <h1 className="header-title">AKEZ Volleyball</h1>
            <span className="header-subtitle">A1 Division · 2025/26 Season</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <section className="countdown-section">
          <CountdownTimer nextGame={nextGame} />
        </section>

        <section className="content-section">
          <FixturesList fixtures={fixtures} />
          <StandingsTable standings={standings} />
        </section>
      </main>

      <footer className="app-footer">
        <span>© 2026 AKEZ Volleyball Club · All rights reserved</span>
      </footer>
    </div>
  )
}

export default App
