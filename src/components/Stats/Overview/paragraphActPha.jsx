import React, { useEffect, useState } from 'react';
import styles from '../../../assets/css/Stats/Overview/ParagraphActPha.module.css';

const ParagraphActPha = () => {

    const [paragraph, setParagraph]= useState('');
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
                setParagraph(data[0].paragraph);
                
            }catch(err){
                console.log(err.message);
                
            }
        }
        getParagraph();
    },[])
  return (

    <div className={styles.ParagraphActPhaContainer}>
      <h2 className={styles.ParagraphActPhaTitle}>
        Activités du service pharmacie du CNGMO
      </h2>
      <p className={styles.ParagraphActPhaText}>
        {paragraph}
      </p>
    </div>
  );
};

export default ParagraphActPha;