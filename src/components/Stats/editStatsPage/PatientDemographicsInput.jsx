import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import '../../../assets/css/Stats/editStatsPage/PatientDemographicsInput.css';
import { Database } from 'lucide-react';
import { data } from 'react-router-dom';

const PatientDemographicsInput = ({ onSubmit }) => {
  // State to hold the input values for each age group
  const [demographics, setDemographics] = useState({
    '0-18': '',
    '19-30': '',
    '31-45': '',
    '46-60': '',
    '61+': '',
    'description': ''
  });

  const keyMap = {
    "category1": "0-18",
    "category2": "19-30",
    "category3": "31-45",
    "category4": "46-60",
    "category5": "61+",
    'description': 'description'
  }

  const handleInputChange = (group, value) => {
      setDemographics((prev) => ({
        ...prev,
        [group]: value
      }))
  }


  const BacktoDb = (data) => {
    const data3= {}
    Object.entries(keyMap).forEach(([key, value]) => {
      data3[key] = data[value];
    })
    return data3;
  }

  const handleSubmit = async() => {
    try
    {
      const response = await fetch("http://localhost:8080/patientDemographics",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            BacktoDb(demographics)
          )
        }
      )
    }catch(err) {console.log(err.message);
    }
  }

  useEffect(()=> {
    const getDemographics= async ()=>
    {
      try
      {
        const response = await fetch("http://localhost:8080/patientDemographics", {method: "GET"});
        if (!response.ok) { throw new Error(response.statusText);}
        const data = await response.json();
        console.log(data);

        
        const data2 ={}

        Object.entries(keyMap).forEach(([key, value]) => {
          data2[value] = data[0][key]
        })

        setDemographics(data2);
        console.log(demographics);
        
      }catch(err) {console.log(err.message);
    }
  }
  getDemographics()
  },[])


  // Array of age groups for dynamic rendering
  const ageGroups = ['0-18', '19-30', '31-45', '46-60', '61+', 'description'];
  
  
  return (
    <div className="patient-demographics-input">
      <h2>Patient Demographics by Age</h2>
      <form onSubmit={handleSubmit}>
  {ageGroups.map((group) => (
    <div className="form-group" key={group}>
      <label htmlFor={group}>
        <FaUsers className="icon" /> {group}
      </label>

      {group !== "description" && (
        <input
          type="number"
          id={group}
          value={demographics[group]}
          onChange={(e) => handleInputChange(group, e.target.value)}
          min="0"
          step="1"
          placeholder="Enter number"
        />
      )}

      {group === "description" && (
        <textarea
          id="description"
          value={demographics.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter description"
          rows="4"
          cols="50"
        />
      )}
    </div>
  ))}
  <button type="submit" className="submit-button">
    Update Demographics
  </button>
</form>

    </div>
  );
};

export default PatientDemographicsInput;