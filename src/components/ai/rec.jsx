import React, { useState } from 'react';
import '../../assets/css/ai/rec.css';

import ChatBot from '../ChatBot/ChatBot';
import Footer from '../footer/footer';


// Mock API function (to be replaced with real API call)
const fetchRecommendations = async (service, surface) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const disinfectants = [
    { name: 'Bleach', score: 0, quantity: 0 },
    { name: 'Ethanol', score: 0, quantity: 0 },
    { name: 'Isopropyl Alcohol', score: 0, quantity: 0 },
    { name: 'Hydrogen Peroxide', score: 0, quantity: 0 },
    { name: 'Quaternary Ammonium', score: 0, quantity: 0 },
  ];

  // Mock logic for scores and quantities
  if (surface === 'Sink') {
    disinfectants[0].score = service === 'A' ? 90 : service === 'B' ? 80 : 70;
    disinfectants[0].quantity = 200;
    disinfectants[1].score = service === 'A' ? 70 : service === 'B' ? 85 : 60;
    disinfectants[1].quantity = 150;
    disinfectants[2].score = service === 'A' ? 65 : service === 'B' ? 80 : 55;
    disinfectants[2].quantity = 180;
    disinfectants[3].score = service === 'A' ? 60 : service === 'B' ? 50 : 80;
    disinfectants[3].quantity = 250;
    disinfectants[4].score = service === 'A' ? 50 : service === 'B' ? 60 : 55;
    disinfectants[4].quantity = 220;
  } else if (surface === 'Floor') {
    disinfectants[0].score = service === 'A' ? 80 : service === 'B' ? 90 : 85;
    disinfectants[0].quantity = 1000;
    disinfectants[1].score = service === 'A' ? 60 : service === 'B' ? 70 : 65;
    disinfectants[1].quantity = 800;
    disinfectants[2].score = service === 'A' ? 55 : service === 'B' ? 65 : 60;
    disinfectants[2].quantity = 850;
    disinfectants[3].score = service === 'A' ? 70 : service === 'B' ? 60 : 75;
    disinfectants[3].quantity = 900;
    disinfectants[4].score = service === 'A' ? 65 : service === 'B' ? 55 : 60;
    disinfectants[4].quantity = 950;
  } else if (surface === 'Air') {
    disinfectants[0].score = service === 'A' ? 50 : service === 'B' ? 40 : 30;
    disinfectants[0].quantity = 300;
    disinfectants[1].score = service === 'A' ? 80 : service === 'B' ? 85 : 90;
    disinfectants[1].quantity = 400;
    disinfectants[2].score = service === 'A' ? 75 : service === 'B' ? 80 : 85;
    disinfectants[2].quantity = 450;
    disinfectants[3].score = service === 'A' ? 90 : service === 'B' ? 80 : 85;
    disinfectants[3].quantity = 500;
    disinfectants[4].score = service === 'A' ? 70 : service === 'B' ? 75 : 65;
    disinfectants[4].quantity = 480;
  }

  return disinfectants.sort((a, b) => b.score - a.score);
};

const AIRecommendation = () => {
  const [formData, setFormData] = useState({
    service: 'A',
    surface: 'Sink',
  });
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const data = await fetchRecommendations(formData.service, formData.surface);
      setRecommendations(data);
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className="ai-recommendation-container">
      <h2 className="ai-recommendation-title mt-[25px]">AI Disinfectant Recommendation</h2>
      <div className="ai-recommendation-content">
        <form className="ai-recommendation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="service">Service:</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
            >
              <option value="A">Service A</option>
              <option value="B">Service B</option>
              <option value="C">Service C</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="surface">Surface:</label>
            <select
              id="surface"
              name="surface"
              value={formData.surface}
              onChange={handleInputChange}
            >
              <option value="Sink">Sink</option>
              <option value="Floor">Floor</option>
              <option value="Air">Air</option>
            </select>
          </div>
          <button type="submit" className="recommend-button">
            Get Recommendations
          </button>
        </form>

        {isLoading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Generating Results...</p>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        {recommendations.length > 0 && !isLoading && (
          <div className="recommendation-results">
            <h3>Recommended Disinfectants</h3>
            <ul className="disinfectant-list">
              {recommendations.map((disinfectant, index) => (
                <li key={disinfectant.name} className={`disinfectant-item rank-${index + 1}`}>
                  <span className="rank-badge">{index + 1}</span>
                  <div className="disinfectant-details">
                    <span className="disinfectant-name">{disinfectant.name}</span>
                    <span className="score">Effectiveness: {disinfectant.score}%</span>
                    <span className="quantity">Quantity: {disinfectant.quantity} mL</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
       <ChatBot/>
       
    </div>
    <Footer/>
    </>
  );
};

export default AIRecommendation;