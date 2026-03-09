import './FixturesList.css';

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_ABBR = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return {
    day: DAY_ABBR[d.getDay()],
    date: d.getDate(),
    month: MONTH_ABBR[d.getMonth()],
    year: d.getFullYear(),
    time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

function FixtureCard({ fixture }) {
  const { day, date, month, year, time } = formatDate(fixture.date);
  const isHome = fixture.homeTeam === 'AKEZ';
  const isFinished = fixture.status === 'finished';

  return (
    <div className={`fixture-card ${isFinished ? 'fixture-finished' : 'fixture-upcoming'}`}>
      <div className="fixture-date-block">
        <span className="fixture-day">{day}</span>
        <span className="fixture-num">{date}</span>
        <span className="fixture-month">{month} {year}</span>
        <span className="fixture-time">{time}</span>
      </div>

      <div className="fixture-main">
        <span className="fixture-round">{fixture.round} · {fixture.competition}</span>
        <div className="fixture-teams">
          <span className={`fixture-team ${fixture.homeTeam === 'AKEZ' ? 'our-team' : ''}`}>
            {fixture.homeTeam}
          </span>
          <div className="fixture-score-block">
            {isFinished && fixture.result ? (
              <span className="fixture-score">
                {fixture.result.homeScore} – {fixture.result.awayScore}
              </span>
            ) : (
              <span className="fixture-vs">VS</span>
            )}
          </div>
          <span className={`fixture-team fixture-team-away ${fixture.awayTeam === 'AKEZ' ? 'our-team' : ''}`}>
            {fixture.awayTeam}
          </span>
        </div>
        <span className="fixture-venue">📍 {fixture.venue}</span>
      </div>

      <div className="fixture-badge">
        {isFinished ? (
          (() => {
            const weWon =
              (isHome && fixture.result.homeScore > fixture.result.awayScore) ||
              (!isHome && fixture.result.awayScore > fixture.result.homeScore);
            return (
              <span className={`badge ${weWon ? 'badge-win' : 'badge-loss'}`}>
                {weWon ? 'WIN' : 'LOSS'}
              </span>
            );
          })()
        ) : (
          <span className="badge badge-upcoming">UPCOMING</span>
        )}
      </div>
    </div>
  );
}

function FixturesList({ fixtures }) {
  const finished = fixtures.filter((f) => f.status === 'finished').reverse();
  const upcoming = fixtures.filter((f) => f.status === 'upcoming');

  return (
    <div className="fixtures-container">
      <h2 className="section-title">
        <span className="section-icon">📅</span> Fixtures &amp; Results
      </h2>

      {upcoming.length > 0 && (
        <div className="fixtures-group">
          <h3 className="group-title">Upcoming</h3>
          {upcoming.map((f) => (
            <FixtureCard key={f.id} fixture={f} />
          ))}
        </div>
      )}

      {finished.length > 0 && (
        <div className="fixtures-group">
          <h3 className="group-title">Results</h3>
          {finished.map((f) => (
            <FixtureCard key={f.id} fixture={f} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FixturesList;
