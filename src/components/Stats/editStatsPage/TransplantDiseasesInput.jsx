import React, { useEffect, useState } from 'react';
import '../../../assets/css/Stats/editStatsPage/TransplantDiseasesInput.css';

const TransplantDiseasesInput = ({ onSubmit }) => {
  const [diseasesList, setDiseasesList] = useState([]);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [error, setError] = useState('');
  const [disease, setDisease] = useState({
    "disease": "",
    "acronym": "",
    "percentage": 0
  });


  useEffect(() => {
    console.log("diseases List After Addition / Removal : ", diseasesList);
  }, [diseasesList]);

  const handleDisease = (field, value) => {
    setDisease((prev) => (
      {...prev,
        [field]: value
      }
    ))
  }

  const handleAdd = () => {

    // Validate and parse the percentage
    const perc = parseFloat(disease.percentage);
    if (isNaN(perc) || perc <= 0 || perc > 100) {
      setError('Please enter a valid percentage between 0 and 100');
      return;
    }

    // Check if adding this percentage would exceed 100%
    if (totalPercentage + perc > 100) {
      setError('Adding this percentage would make the total exceed 100%');
      disease.percentage=0;
      return;
    }
    console.log("Added disease : ", disease);
    setDiseasesList([... diseasesList, disease]); 
    setTotalPercentage(totalPercentage+perc);
    setDisease({
      "disease": "",
      "acronym": "",
      "percentage": 0
    })
    setError('');
    
  }

  const handleRemove = (index) => {
    // Remove the disease at the specified index
    console.log("removed disease : ", diseasesList[index]);
    setDiseasesList(diseasesList.filter((_, i) => i !== index));
    setTotalPercentage(totalPercentage - diseasesList[index].percentage);
    
    
    
  };

  const handleSubmit= async () => {

    if (totalPercentage!= 100) {alert("The total Percentage is less than 100. Try adding more entries !");}
    else{

    try{
        const response = await fetch("http://localhost:8080/MaladiePriseEnCharge/batch",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(diseasesList)
          }
        )
        if (!response.ok)
        {
          throw new Error(response.statusText); 
        }
        console.log("the posted diseases List", diseasesList);
        setDisease({
          "disease": "",
          "acronym": "",
          "percentage": 0
        });
        setDiseasesList([]);
        setTotalPercentage(0);
        alert("Submission done with success!")
    }catch(err){
      console.log(err.message);
      alert("Errors. You might have duplicates. Keep one instance only.");
    }
    
  }
}


  return (
    <div className="transplant-diseases-input">
      <h2>Diseases Covered by Transplantation</h2>

      <div className="form-group">
        <label>Disease:</label>
          <input
            type="text"
            value={disease.disease}
            onChange={(e) => handleDisease("disease", e.target.value)}
            placeholder="Enter disease name"
          />
      </div>

      <div className="form-group">
        <label>Disease Acronym:</label>
        <input
          type="text"
          value={disease.acronym}
          onChange={(e) => handleDisease("acronym", e.target.value)}
          placeholder="Enter disease Acronym"
        />
      </div>
    
      <div className="form-group">
        <label>Percentage:</label>
        <input
          type="number"
          value={disease.percentage}
          step="0.01"
          min="0"
          max="100"
          onChange={(e) => handleDisease("percentage", e.target.value)}
          placeholder="Enter percentage"
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button  className= 'my-button-transplantDiseaseInput'onClick={handleAdd}>Add Disease</button>

      <div className="diseases-list">
        {diseasesList.map((d, index) => (
          <div key={index} className="disease-item">
            <span>
              {d.disease}: {d.acronym}: {d.percentage}%
            </span>
            <button  className= 'my-button-transplantDiseaseInput' onClick={() => handleRemove(index)}>Remove</button>
          </div>
        ))}
      </div>

      <p>Total Percentage: {totalPercentage.toFixed(2)}%</p>

      <button className= 'my-button-transplantDiseaseInput' onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TransplantDiseasesInput;