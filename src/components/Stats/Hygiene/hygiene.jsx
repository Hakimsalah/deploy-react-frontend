import React, { useState, useEffect } from 'react'; // Added useEffect import
import axios from 'axios'; // Added axios import
import "../../../assets/css/Stats/DiseaseOverview/diseaseOverview.css";
import SelectionBar from "./selectionBar";
import Footer from '../../footer/footer';
import ChatBot from "../../ChatBot/ChatBot";


const Hygiene = () => {


    const [Germs, setGerms] = useState([]);
      
    // Fetch germs on component mount
    useEffect(() => {
      axios.get("http://localhost:8080/germs")
        .then(response => setGerms(response.data))
        .catch(error => console.error("Error fetching germs:", error));
  
    }, []);
  

  return (
    <div className="disease-overview-container ">
        <div className="selectionBar-class mt-[150px]">
            <div className="section-title">Visualize Germs and Disinfectants charts</div>
            <SelectionBar/>
        </div>
      <h1 className="section-title">Germs Overview</h1>
      <p className="section-subtitle">
        Explore the different germs encountered at the Marrow Transplant Center.
      </p>
      {Germs.map((germ, index) => (
        <div
          key={index}
          className={`disease-section ${index % 2 === 0 ? 'left' : 'right'}`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="disease-content">
            <img
            src={`data:image/png;base64,${germ.image}`}
            alt={`${germ.name} illustration`}
            className="disease-image"
            />
            <div className="disease-info">
              <h2 className="disease-name">{germ.name}</h2>
              <p className="disease-description">{germ.description}</p>
            </div>
          </div>
        </div>
      ))}
       <ChatBot/>
      <Footer/>
    </div>
  );
};

export default Hygiene;