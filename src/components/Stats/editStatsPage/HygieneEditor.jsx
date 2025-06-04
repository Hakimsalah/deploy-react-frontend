import React, { useState, useEffect } from 'react'; // Added useEffect import
import { FaTrash, FaUpload } from 'react-icons/fa';
import axios from 'axios'; // Added axios import
import '../../../assets/css/Stats/editStatsPage/DiseaseEditor.css';

const GermEditor = () => {
  const [germs, setgerms] = useState([]);
    
  // Fetch germs on component mount
  useEffect(() => {
    axios.get("http://localhost:8080/germs")
      .then(response => setgerms(response.data))
      .catch(error => console.error("Error fetching germs:", error));
      
  }, []);

  const handleInputChange = async (id, field, value) => {
    console.log("ID value in handleInputChange:", id); // Log the ID value
  
    if (!id) {
      console.error("ID is undefined or invalid");
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:8080/germs/update/${id}/${field}`, value, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        setgerms(
          germs.map((germ) =>
            germ.id === id ? { ...germ, [field]: value } : germ
          )
        );
      } else {
        throw new Error('Failed to update germ');
      }
    } catch (error) {
      console.error('Update error:', error.message);
      alert('Error updating germ: ' + error.message);
    }
  };
  

  const handleImageUpload = async (germId, e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const response = await fetch(`http://localhost:8080/germs/update/image/${germId}`, {
        method: "PUT",
        body: formData,
      });
  
      if (response.ok) {
        alert("Image uploaded successfully!");
        // Optionally refresh the germ list
        const updatedResponse = await axios.get("http://localhost:8080/germs");
        setgerms(updatedResponse.data);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/germs/delete/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete germ");
      }
  
      setgerms(germs.filter((germ) => germ.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting.");
    }
  };

  const handleAddDisease = async () => {
    try {
      const newDisease = {
        name: "",
        description: "",
        image: null
      };

      const response = await axios.post("http://localhost:8080/germs/add", newDisease, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data) {
        setgerms([...germs, response.data]);
      } else {
        throw new Error("Failed to add germ");
      }
    } catch (error) {
      console.error("Add germ error:", error.message);
      alert("Error adding new germ: " + error.message);
    }
  };

  return (
    <div className="disease-editor">
      <h1>Edit Germs</h1>
      {console.log(germs)}
      {germs.map((germ) => (
        <div key={germ.id} className="disease-container">
          <div className="image-section">
            {/* Handle base64 image data */}
            <img 
              src={germ.image ? `data:image/jpeg;base64,${germ.image}` : ''} 
              alt={germ.name} 
            />
            <label className="upload-button">
              <FaUpload /> Upload New
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(germ.id, e)}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <div className="input-section">
            <input
              type="text"
              value={germ.name || ''} // Add fallback for undefined
              onChange={(e) => handleInputChange(germ.id, 'name', e.target.value)}
              placeholder="germ Name"
            />
            <textarea
              value={germ.description || ''} // Add fallback for undefined
              onChange={(e) => handleInputChange(germ.id, 'description', e.target.value)}
              placeholder="germ Description"
            />
          </div>

          <button
            className="delete-button"
            onClick={() => handleDelete(germ.id)}
          >
            <FaTrash />
          </button>
        </div>
      ))}
      {germs.length > 0 && (
        <div className="update-section">
          <button onClick={handleAddDisease} className="add-button">
            Add new Germ
          </button>
        </div>
      )}
    </div>
  );
};

export default GermEditor;