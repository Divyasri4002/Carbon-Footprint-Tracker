import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function History() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [insights, setInsights] = useState({ avg: 0, max: 0, dominant: "" });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/history`);
      const data = await res.json();
      setHistory(data);
      if (data.length) {
        const totals = data.map(d => d.totalCO2);
        const avg = totals.reduce((a,b)=>a+b,0) / data.length;
        const max = Math.max(...totals);
        // Determine dominant cause overall by summing breakdowns
        const sums = data.reduce((acc, d) => {
          const b = d.breakdown || { travelCO2: 0, electricityCO2: 0, plasticCO2: 0 };
          acc.travel += b.travelCO2 || 0;
          acc.electricity += b.electricityCO2 || 0;
          acc.plastic += b.plasticCO2 || 0;
          return acc;
        }, { travel: 0, electricity: 0, plastic: 0 });
        const dominant = Object.entries(sums).sort((a,b)=>b[1]-a[1])[0][0];
        setInsights({ avg, max, dominant });
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Good': return '#00ff88';
      case 'Average': return '#ffaa00';
      case 'Bad': return '#ff4757';
      default: return '#00d4ff';
    }
  };

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <h1>📊 Carbon Footprint History</h1>
        <p>Track your environmental journey over time</p>
      </div>

      {/* Main Card */}
      <div className="card">
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="loading" style={{ width: '40px', height: '40px', margin: '0 auto 20px' }}></div>
            <p>Loading your environmental history...</p>
          </div>
        ) : history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🌱</div>
            <h2 style={{ color: '#2d3748', marginBottom: '15px' }}>No Entries Yet</h2>
            <p style={{ color: '#718096' }}>Start tracking your carbon footprint to see your environmental impact over time!</p>
            <a href="/" className="nav-link" style={{ marginTop: '20px' }}>
              🏠 Go to Calculator
            </a>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ color: '#2d3748', marginBottom: '10px' }}>Your Environmental Journey</h2>
              <p style={{ color: '#718096' }}>Total entries: {history.length}</p>
            </div>

            {/* Daily Level Visualization (height = total CO2) */}
            <div className="card" style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#065f46', marginBottom: '12px' }}>📈 Daily Footprint Level</h3>
              <div className="level-chart">
                {history.map((d, idx) => {
                  const maxBase = Math.max(15, insights.max || 1);
                  const heightPct = Math.min(100, (d.totalCO2 / maxBase) * 100);
                  const status = d.totalCO2 < 5 ? 'Good' : d.totalCO2 < 15 ? 'Average' : 'Bad';
                  const levelClass = status === 'Good' ? 'good' : status === 'Average' ? 'avg' : 'bad';
                  return (
                    <div className="level-col" key={idx} title={`${d.date} • ${d.totalCO2.toFixed(2)} kg`}>
                      <div className={`level-bar ${levelClass}`} style={{ height: `${heightPct}%` }} />
                      <span className="level-value">{d.totalCO2.toFixed(1)} kg</span>
                      <span className="trend-label">{new Date(d.date).toLocaleDateString('en-US', { month:'short', day:'numeric'})}</span>
                    </div>
                  );
                })}
                <div className="level-lines">
                  <span className="line good" style={{ bottom: `${(5/Math.max(15, insights.max||1))*100}%` }}>5</span>
                  <span className="line avg" style={{ bottom: `${(15/Math.max(15, insights.max||1))*100}%` }}>15</span>
                </div>
              </div>
              <div className="trend-legend">
                <span><i className="legend-box" style={{ background: '#10b981' }}></i> Good (&lt;5)</span>
                <span><i className="legend-box" style={{ background: '#f59e0b' }}></i> Average (5-15)</span>
                <span><i className="legend-box" style={{ background: '#ef4444' }}></i> Bad (≥15)</span>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="history-table">
          <thead>
            <tr>
                    <th>📅 Date</th>
                    <th>🌍 CO₂ (kg)</th>
                    <th>📊 Status</th>
                    <th>😊 Mood</th>
                    <th>💡 Impact</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
                    <tr key={index} style={{ animation: `fadeInLeft 0.5s ease-out ${index * 0.1}s both` }}>
                      <td>
                        <strong>{new Date(item.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}</strong>
                      </td>
                      <td>
                        <span style={{ 
                          fontWeight: '600',
                          color: item.totalCO2 < 5 ? '#00ff88' : 
                                 item.totalCO2 < 15 ? '#ffaa00' : '#ff4757'
                        }}>
                          {item.totalCO2.toFixed(2)} kg
                        </span>
                      </td>
                      <td>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          backgroundColor: getStatusColor(item.status) + '20',
                          color: getStatusColor(item.status),
                          border: `1px solid ${getStatusColor(item.status)}40`
                        }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '1.5rem' }}>{item.emoji}</td>
                      <td>
                        <span style={{ fontSize: '0.9rem', color: '#718096' }}>
                          {item.totalCO2 < 5 && "🌟 Excellent"}
                          {item.totalCO2 >= 5 && item.totalCO2 < 15 && "📊 Good"}
                          {item.totalCO2 >= 15 && "⚠️ Needs Improvement"}
                        </span>
                      </td>
              </tr>
            ))}
          </tbody>
        </table>
            </div>

            {/* Summary Statistics */}
            <div style={{ 
              marginTop: '30px', 
              padding: '20px', 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(5, 150, 105, 0.12))',
              borderRadius: '16px',
              border: '1px solid rgba(16, 185, 129, 0.25)'
            }}>
              <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>📈 Summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#00ff88' }}>
                    {history.length}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#718096' }}>Total Entries</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#00d4ff' }}>
                    {insights.avg.toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#718096' }}>Average CO₂</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#ffaa00' }}>
                    {insights.max.toFixed(2)} kg
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#718096' }}>Peak Day</div>
                </div>
              </div>
            </div>

            {/* Causes & Dangers Section */}
            <div className="card" style={{ marginTop: '20px' }}>
              <h3 style={{ color: '#065f46', marginBottom: '10px' }}>⚠️ Causes & Dangers</h3>
              <p style={{ color: '#065f46', marginBottom: '10px' }}>Dominant cause overall: <strong>{insights.dominant.charAt(0).toUpperCase() + insights.dominant.slice(1)}</strong></p>
              <ul className="suggestions-list">
                {insights.dominant === 'travel' && (
                  <>
                    <li className="suggestion-item">Transport emissions contribute to urban smog and respiratory diseases</li>
                    <li className="suggestion-item">Long-term: increased greenhouse gases accelerate climate change</li>
                  </>
                )}
                {insights.dominant === 'electricity' && (
                  <>
                    <li className="suggestion-item">Coal-heavy grids emit CO₂ and fine particulates harmful to health</li>
                    <li className="suggestion-item">High energy demand increases grid strain and fossil fuel reliance</li>
                  </>
                )}
                {insights.dominant === 'plastic' && (
                  <>
                    <li className="suggestion-item">Plastic production is fossil-fuel intensive and emits CO₂</li>
                    <li className="suggestion-item">Improper disposal pollutes oceans and harms wildlife</li>
                  </>
                )}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <a href="/" className="nav-link">
          ⬅️ Back to Calculator
        </a>
      </div>

      {/* Floating Decorative Elements */}
      <div style={{ 
        position: 'fixed', 
        top: '15%', 
        left: '15%', 
        fontSize: '2.5rem', 
        opacity: 0.1,
        zIndex: -1 
      }} className="floating">
        📊
      </div>
      <div style={{ 
        position: 'fixed', 
        bottom: '25%', 
        right: '15%', 
        fontSize: '2rem', 
        opacity: 0.1,
        zIndex: -1 
      }} className="floating">
        🌱
      </div>
    </div>
  );
}
