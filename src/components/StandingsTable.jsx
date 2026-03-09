import './StandingsTable.css';

function StandingsTable({ standings }) {
  return (
    <div className="standings-container">
      <h2 className="section-title">
        <span className="section-icon">🏆</span> Standings
      </h2>
      <div className="standings-table-wrapper">
        <table className="standings-table">
          <thead>
            <tr>
              <th className="col-pos">#</th>
              <th className="col-team">Team</th>
              <th title="Played">P</th>
              <th title="Won">W</th>
              <th title="Lost">L</th>
              <th title="Sets For">SF</th>
              <th title="Sets Against">SA</th>
              <th title="Points">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row) => (
              <tr
                key={row.position}
                className={`standings-row ${row.isOurTeam ? 'our-team-row' : ''} ${
                  row.position <= 3 ? 'top-three' : ''
                }`}
              >
                <td className="col-pos">
                  {row.position <= 3 ? (
                    <span className={`pos-badge pos-${row.position}`}>{row.position}</span>
                  ) : (
                    row.position
                  )}
                </td>
                <td className="col-team">
                  {row.isOurTeam && <span className="team-marker">●</span>}
                  {row.team}
                </td>
                <td>{row.played}</td>
                <td className="col-won">{row.won}</td>
                <td className="col-lost">{row.lost}</td>
                <td>{row.setsFor}</td>
                <td>{row.setsAgainst}</td>
                <td className="col-pts">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="standings-legend">
        <span className="legend-item our-team-legend">● Our Team</span>
        <span className="legend-item">
          <span className="pos-badge pos-1">1</span> Top 3 – Playoffs
        </span>
      </div>
    </div>
  );
}

export default StandingsTable;
