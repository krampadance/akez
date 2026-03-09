import { useState, useEffect } from 'react';
import './CountdownTimer.css';

function CountdownTimer({ nextGame }) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!nextGame) return;

    const target = new Date(nextGame.date).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, live: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        live: false,
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [nextGame]);

  if (!nextGame) {
    return (
      <div className="countdown-banner countdown-no-game">
        <span className="countdown-label">No upcoming games scheduled</span>
      </div>
    );
  }

  if (!timeLeft) return null;

  const matchupLabel = `${nextGame.homeTeam} vs ${nextGame.awayTeam}`;

  return (
    <div className="countdown-banner">
      <div className="countdown-intro">
        <span className="countdown-fire">🏐</span>
        <span className="countdown-label">Next Game</span>
        <span className="countdown-matchup">{matchupLabel}</span>
        <span className="countdown-round">{nextGame.round} · {nextGame.competition}</span>
      </div>

      {timeLeft.live ? (
        <div className="countdown-live">
          <span className="live-dot" />
          LIVE NOW
        </div>
      ) : (
        <div className="countdown-units">
          <div className="countdown-unit">
            <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="countdown-sub">Days</span>
          </div>
          <span className="countdown-colon">:</span>
          <div className="countdown-unit">
            <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="countdown-sub">Hours</span>
          </div>
          <span className="countdown-colon">:</span>
          <div className="countdown-unit">
            <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="countdown-sub">Mins</span>
          </div>
          <span className="countdown-colon">:</span>
          <div className="countdown-unit">
            <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="countdown-sub">Secs</span>
          </div>
        </div>
      )}

      <div className="countdown-venue">
        <span className="countdown-venue-icon">📍</span>
        {nextGame.venue}
      </div>
    </div>
  );
}

export default CountdownTimer;
