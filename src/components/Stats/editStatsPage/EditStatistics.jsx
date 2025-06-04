import React, { useState } from 'react';
import '../../../assets/css/Stats/editStatsPage/EditStatistics.css';

const EditStatistics = () => {
  // State for form fields
  const [disease, setDisease] = useState('');
  const [customDisease, setCustomDisease] = useState('');
  const [successRate, setSuccessRate] = useState('');

  // Handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!disease) {
      alert('Please select a disease');
      return;
    }
    if (disease === 'other' && !customDisease) {
      alert('Please enter the custom disease name');
      return;
    }
    if (!successRate || isNaN(successRate) || successRate < 0 || successRate > 100) {
      alert('Please enter a valid success rate between 0 and 100');
      return;
    }

    // Log the submitted data (replace with backend integration in a real app)
    console.log('Disease:', disease === 'other' ? customDisease : disease);
    console.log('Success Rate:', successRate);
    // Optionally, reset the form or show a success message here
  };

  return (
    <div className="edit-statistics">
      <h2>Edit Success Statistics</h2>
      <form onSubmit={handleSubmit}>
        {/* Disease selection */}
        <div className="form-group">
          <label htmlFor="disease">Disease:</label>
          <select
            id="disease"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
          >
            <option value="">Select a disease</option>
            <option value="aplasie medullaire">Aplasie Medullaire</option>
            <option value="lymphoma">Lymphoma</option>
            <option value="leucémie aigue">Leucémie Aigue</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Custom disease input (appears if "Other" is selected) */}
        {disease === 'other' && (
          <div className="form-group">
            <label htmlFor="custom-disease">Custom Disease:</label>
            <input
              type="text"
              id="custom-disease"
              value={customDisease}
              onChange={(e) => setCustomDisease(e.target.value)}
              placeholder="Enter disease name"
            />
          </div>
        )}

        {/* Success rate input */}
        <div className="form-group">
          <label htmlFor="success-rate">Success Rate (%):</label>
          <input
            type="number"
            id="success-rate"
            value={successRate}
            onChange={(e) => setSuccessRate(e.target.value)}
            min="0"
            max="100"
            placeholder="Enter success rate (0-100)"
          />
        </div>

        {/* Submit button */}
        <button className='editStatistics-button' type="submit">Update Statistics</button>
      </form>
    </div>
  );
};

export default EditStatistics;