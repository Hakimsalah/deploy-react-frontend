import React, { useState,useEffect } from 'react';
import styles from '../../../assets/css/Stats/editStatsPage/EditParagraphActPha.module.css';
import { FaSave } from 'react-icons/fa';

const EditParagraphActPha = ({ initialText = '', onSubmit }) => {
  const [text, setText] = useState(initialText);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try
    {
        const response = await fetch("http://localhost:8080/ParagraphActPha",
            {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(
                    {
                        "paragraph": text
                    }
                )
            }
        )
        if (!response.ok) {throw new Error(response.statusText);
        }
        alert("Changes done successfully!");


    }catch(err){
        console.log(err.message);
        
    }
    
    
  };


  useEffect(()=>{
          const getParagraph= async() => {
              try
              {
                  const response = await fetch("http://localhost:8080/ParagraphActPha",
                      {method: "GET"}
                  );
                  if (!response.ok) {throw new Error(response.statusText);
                  }
                  const data= await response.json();
                  console.log("API Response :", data);
                  setText(data[0].paragraph);
                  
              }catch(err){
                  console.log(err.message);
                  
              }
          }
          getParagraph();
      },[])

  return (
    <div className={styles.EditParagraphActPhaContainer}>
      <h2 className={styles.EditParagraphActPhaTitle}>Edit Pharmacy Service Activities Paragraph</h2>
      <form onSubmit={handleSubmit} className={styles.EditParagraphActPhaForm}>
        <label htmlFor="paragraphText" className={styles.EditParagraphActPhaLabel}>
          Paragraph Content
        </label>
        <textarea
          id="paragraphText"
          className={styles.EditParagraphActPhaTextarea}
          value={text}
          onChange={handleChange}
          placeholder="Enter paragraph text here..."
          rows="8"
        />
        <button type="submit" className={styles.EditParagraphActPhaSubmitButton}>
          <FaSave className={styles.EditParagraphActPhaIcon} /> Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditParagraphActPha;