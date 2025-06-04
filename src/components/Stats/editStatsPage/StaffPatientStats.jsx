import React, { useEffect, useState } from 'react';
import { FaUserMd, FaUserNurse, FaUsers } from 'react-icons/fa';
import '../../../assets/css/Stats/editStatsPage/StaffPatientStats.css';

const StaffPatientStats = ({ onSubmit }) => {
  // State variables to hold input values
  const [doctors, setDoctors] = useState(0);
  const [nurses, setNurses] = useState(0);
  const [patients, setPatients] = useState(0);
  const [data, setData] = useState([]);

  useEffect(()=>{
    const getStats = async() => {
      try
      {
        const response = await fetch("http://localhost:8080/StaffPatientStats")
        if (!response.ok) {console.log(response.statusText); return;}
        const data = await response.json();
        setData(data);
        setDoctors(data[0].doctors);
        setNurses(data[0].nurses);
        setPatients(data[0].patients);
      }catch(err){console.log(err.message);}}
    getStats();

    }, []
    
    
  )


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit clicked ✅");
  
    const doctorsNum = Math.floor(parseFloat(doctors) || 0);
    const nursesNum = Math.floor(parseFloat(nurses) || 0);
    const patientsNum = Math.floor(parseFloat(patients) || 0);
  
    console.log("Submitting values:", { doctorsNum, nursesNum, patientsNum });
  
    if (isNaN(doctorsNum) || isNaN(nursesNum) || isNaN(patientsNum)) {
      alert("Please enter valid numbers for all fields.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/StaffPatientStats", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctors: doctorsNum,
          nurses: nursesNum,
          patients: patientsNum,
        }),
      });
  
      if (!response.ok) {
        console.error("Update failed ❌", response.statusText);
      } else {
        console.log("Update succeeded ✅");
        alert("Statistics updated successfully!");
      }
    } catch (err) {
      console.error("Request error ❌", err.message);
    }
  };
  

  return (
    <div className="staff-patient-input">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="doctors">
            <FaUserMd className="icon" /> Number of Doctors
          </label>
          <input
            type="number"
            id="doctors"
            value={doctors}
            onChange={(e) => setDoctors(e.target.value)}
            min="0"
            step="1"
            placeholder="Enter number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="nurses">
            <FaUserNurse className="icon" /> Number of Nurses
          </label>
          <input
            type="number"
            id="nurses"
            value={nurses}
            onChange={(e) => setNurses(e.target.value)}
            min="0"
            step="1"
            placeholder="Enter number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="patients">
            <FaUsers className="icon" /> Number of Patients
          </label>
          <input
            type="number"
            id="patients"
            value={patients}
            onChange={(e) => setPatients(e.target.value)}
            min="0"
            step="1"
            placeholder="Enter number"
          />
        </div>

        <button type="submit" className="submit-button">
          Update Statistics
        </button>
      </form>
    </div>
  );
};

export default StaffPatientStats;