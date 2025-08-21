import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function Home() {
  const [showCalculator, setShowCalculator] = useState(false);

  if (showCalculator) {
    return <CalculatorPage onBack={() => setShowCalculator(false)} />;
  }

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">🌱 Carbon Footprint</span>
            <br />
            <span className="hero-subtitle">Tracker</span>
          </h1>
          <p className="hero-description">
            Understand your environmental impact and take steps towards a sustainable future
          </p>
          <button 
            className="cta-button"
            onClick={() => setShowCalculator(true)}
          >
            🚀 Start Calculating
          </button>
        </div>
        <div className="hero-visual">
          <div className="image-placeholder">
            🌱
          </div>
          <div className="floating-earth">🌍</div>
          <div className="floating-leaf">🌿</div>
          <div className="floating-tree">🌳</div>
        </div>
      </div>

      {/* What is Carbon Footprint Section */}
      <div className="info-section">
        <div className="section-header">
          <h2>🌍 What is Carbon Footprint?</h2>
          <p>Your carbon footprint is the total amount of greenhouse gases you produce through daily activities</p>
        </div>
        
        <div className="info-grid">
          <div className="info-card">
            <div className="card-icon">🚗</div>
            <h3>Transportation</h3>
            <p>Every kilometer you travel contributes to CO₂ emissions through fuel combustion</p>
          </div>
          
          <div className="info-card">
            <div className="card-icon">⚡</div>
            <h3>Energy Usage</h3>
            <p>Electricity consumption from fossil fuel power plants releases greenhouse gases</p>
          </div>
          
          <div className="info-card">
            <div className="card-icon">🛍️</div>
            <h3>Plastic Consumption</h3>
            <p>Plastic production and disposal contribute significantly to carbon emissions</p>
          </div>
        </div>
      </div>

      {/* Why It Matters Section */}
      <div className="impact-section">
        <div className="section-header">
          <h2>⚠️ Why Carbon Footprint Matters</h2>
          <p>The impact of our daily choices on the environment and future generations</p>
        </div>
        
        <div className="impact-grid">
          <div className="impact-item">
            <div className="impact-number">2.4°C</div>
            <div className="impact-label">Global Temperature Rise</div>
            <div className="impact-description">Current trajectory could lead to catastrophic climate change</div>
          </div>
          
          <div className="impact-item">
            <div className="impact-number">50%</div>
            <div className="impact-label">Species at Risk</div>
            <div className="impact-description">Biodiversity loss due to habitat destruction</div>
          </div>
          
          <div className="impact-item">
            <div className="impact-number">1.5M</div>
            <div className="impact-label">Deaths Annually</div>
            <div className="impact-description">Air pollution related fatalities worldwide</div>
          </div>
        </div>
      </div>

      {/* How We Calculate Section */}
      <div className="calculation-section">
        <div className="section-header">
          <h2>🧮 How We Calculate Your Impact</h2>
          <p>Transparent methodology based on scientific research and environmental data</p>
        </div>
        
        <div className="calculation-method">
          <div className="method-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>🚗 Travel Distance</h4>
              <p><strong>Formula:</strong> Distance (km) × 0.12 kg CO₂/km</p>
              <p><strong>Why:</strong> Average car emits 0.12 kg CO₂ per kilometer</p>
            </div>
          </div>
          
          <div className="method-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>⚡ Electricity Usage</h4>
              <p><strong>Formula:</strong> Usage (kWh) × 0.5 kg CO₂/kWh</p>
              <p><strong>Why:</strong> Grid electricity mix averages 0.5 kg CO₂ per kWh</p>
            </div>
          </div>
          
          <div className="method-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>🛍️ Plastic Items</h4>
              <p><strong>Formula:</strong> Items × 0.3 kg CO₂/item</p>
              <p><strong>Why:</strong> Each plastic item contributes to production emissions</p>
            </div>
          </div>
        </div>
        
        <div className="formula-display">
          <h3>📊 Total Carbon Footprint Formula</h3>
          <div className="formula">
            CO₂ = (Travel × 0.12) + (Electricity × 0.5) + (Plastic × 0.3)
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section">
        <h2>Ready to Discover Your Impact?</h2>
        <p>Join thousands of people tracking their environmental footprint</p>
        <div className="cta-buttons">
          <button 
            className="primary-cta"
            onClick={() => setShowCalculator(true)}
          >
            🌿 Calculate My Footprint
          </button>
          <a href="/history" className="secondary-cta">
            📊 View History
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>🌱 Making environmental awareness beautiful and accessible</p>
        <p>Built with ❤️ for a sustainable future</p>
      </div>
    </div>
  );
}

// Calculator Component (moved to separate component)
function CalculatorPage({ onBack }) {
  const [travelKm, setTravelKm] = useState("");
  const [electricityKWh, setElectricityKWh] = useState("");
  const [plasticItems, setPlasticItems] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!travelKm || !electricityKWh || !plasticItems) {
      alert("Please fill in all fields!");
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          travelKm: Number(travelKm),
          electricityKWh: Number(electricityKWh),
          plasticItems: Number(plasticItems)
        })
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to calculate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const travelCO2 = Number(travelKm || 0) * 0.12;
  const electricityCO2 = Number(electricityKWh || 0) * 0.5;
  const plasticCO2 = Number(plasticItems || 0) * 0.3;
  const total = travelCO2 + electricityCO2 + plasticCO2 || 1;

  const suggestionsByStatus = {
    Good: [
      "Keep it up! Maintain low-emission travel (walk, cycle, public transport)",
      "Consider a green electricity plan or partial renewable subscription",
      "Minimize single-use plastics; carry a reusable bottle and bag"
    ],
    Average: [
      "Try carpooling or public transport 2-3 days a week",
      "Switch to LED bulbs and unplug idle devices to cut electricity",
      "Replace disposable plastics with durable reusables"
    ],
    Bad: [
      "Reduce car use: combine trips, carpool, or switch to transit",
      "Run a home energy audit; adjust AC set-points and appliance usage",
      "Avoid single-use plastics; buy in bulk and recycle diligently"
    ]
  };

  return (
    <div className="container">
      {/* Back Button */}
      <div className="back-section">
        <button className="back-button" onClick={onBack}>
          ⬅️ Back to Home
        </button>
      </div>

      {/* Header Section */}
      <div className="header">
        <h1>🌱 Carbon Footprint Calculator</h1>
        <p>Enter your daily activities to calculate your CO₂ emissions</p>
      </div>

      {/* Main Card */}
      <div className="card">
        <div className="form-group">
          <label>🚗 Daily Travel Distance (km)</label>
          <input 
            type="number" 
            value={travelKm} 
            onChange={e => setTravelKm(e.target.value)}
            placeholder="Enter your daily travel distance"
          />
        </div>
        
        <div className="form-group">
          <label>⚡ Daily Electricity Usage (kWh)</label>
          <input 
            type="number" 
            value={electricityKWh} 
            onChange={e => setElectricityKWh(e.target.value)}
            placeholder="Enter your daily electricity consumption"
          />
        </div>
        
        <div className="form-group">
          <label>🛍️ Daily Plastic Items Used</label>
          <input 
            type="number" 
            value={plasticItems} 
            onChange={e => setPlasticItems(e.target.value)}
            placeholder="Enter number of plastic items used"
          />
        </div>

        <button 
          className="btn" 
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading"></span>
              Calculating...
            </>
          ) : (
            "🌿 Calculate My Footprint"
          )}
        </button>

        {/* Result Display */}
        {result && (
          <>
            <div className="result">
              <h2>🌍 Your Carbon Footprint Result</h2>
              <p><strong>Date:</strong> {result.date}</p>
              <p><strong>Total CO₂:</strong> {result.totalCO2.toFixed(2)} kg</p>
              <div className="status-badge">
                Status: {result.status} {result.emoji}
              </div>
              
              {/* Environmental Impact Message */}
              <div style={{ marginTop: '20px', fontSize: '0.9rem', opacity: 0.9 }}>
                {result.totalCO2 < 5 && "🌟 Excellent! You're making great environmental choices!"}
                {result.totalCO2 >= 5 && result.totalCO2 < 15 && "📊 You're doing okay, but there's room for improvement!"}
                {result.totalCO2 >= 15 && "⚠️ Consider reducing your carbon footprint for a better planet!"}
              </div>
            </div>

            {/* Breakdown Visualization */}
            <div className="breakdown">
              <h3 className="breakdown-title">Contribution Breakdown</h3>
              <div className="bar-row">
                <div className="bar-label">🚗 Travel</div>
                <div className="bar"><div className="bar-fill travel" style={{ width: `${(travelCO2/total)*100}%` }} /></div>
                <div className="bar-value">{travelCO2.toFixed(2)} kg</div>
              </div>
              <div className="bar-row">
                <div className="bar-label">⚡ Electricity</div>
                <div className="bar"><div className="bar-fill electricity" style={{ width: `${(electricityCO2/total)*100}%` }} /></div>
                <div className="bar-value">{electricityCO2.toFixed(2)} kg</div>
              </div>
              <div className="bar-row">
                <div className="bar-label">🛍️ Plastic</div>
                <div className="bar"><div className="bar-fill plastic" style={{ width: `${(plasticCO2/total)*100}%` }} /></div>
                <div className="bar-value">{plasticCO2.toFixed(2)} kg</div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="suggestions">
              <h3 className="suggestions-title">Personalized Suggestions</h3>
              <ul className="suggestions-list">
                {suggestionsByStatus[result.status].map((tip, idx) => (
                  <li key={idx} className="suggestion-item">{tip}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <a href="/history" className="nav-link">
          📊 View Calculation History
        </a>
      </div>
    </div>
  );
}
