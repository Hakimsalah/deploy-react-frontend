import React, { useState } from 'react';
import '../assets/css/disinfectantRec.css';

const DisinfectantRecommendationPage = () => {
  const [serviceType, setServiceType] = useState('');
  const [surfaceType, setSurfaceType] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!serviceType || !surfaceType) return;

    setIsLoading(true);
    setShowResults(false);

    // Simulate AI model processing (replace with actual API call to AI model)
    setTimeout(() => {
      const mockResults = [
        { disinfectant: 'Alcohol-Based Sanitizer', score: 0.95, quantity: '200ml' },
        { disinfectant: 'Hydrogen Peroxide', score: 0.85, quantity: '150ml' },
        { disinfectant: 'Bleach Solution', score: 0.75, quantity: '100ml' },
      ];
      setResults(mockResults);
      setIsLoading(false);
      setShowResults(true);
    }, 1500); // Simulate processing delay
  };

  return (
    <div className="recommendationPageContainer">
      <h1 className="pageTitle">Disinfectant Recommendation System</h1>
      <div className="formCard">
        <form onSubmit={handleSubmit} className="recommendationForm">
          <div className="inputGroup">
            <label htmlFor="serviceType">Service Type</label>
            <select
              id="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              required
            >
              <option value="">Select Service Type</option>
              <option value="A">Service A</option>
              <option value="B">Service B</option>
              <option value="C">Service C</option>
            </select>
          </div>
          <div className="inputGroup">
            <label htmlFor="surfaceType">Surface Type</label>
            <select
              id="surfaceType"
              value={surfaceType}
              onChange={(e) => setSurfaceType(e.target.value)}
              required
            >
              <option value="">Select Surface Type</option>
              <option value="sink">Sink</option>
              <option value="air">Air</option>
              <option value="floor">Floor</option>
            </select>
          </div>
          <button type="submit" className="submitButton" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Get Recommendations'}
          </button>
        </form>
      </div>

      {showResults && (
        <div className="resultsContainer">
          <h2>Recommended Disinfectants</h2>
          <div className="resultsList">
            {results.map((result, index) => (
              <div key={index} className="resultItem" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="resultRank">{index + 1}</div>
                <div className="resultDetails">
                  <h3>{result.disinfectant}</h3>
                  <p>Score: {(result.score * 100).toFixed(1)}%</p>
                  <p>Recommended Quantity: {result.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisinfectantRecommendationPage;