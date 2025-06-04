import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash } from 'react-icons/fa';
import '../../../assets/css/Stats/Hygiene/selectionBarEditor.css';

const DisinfectantEditor = () => {
  // State declarations with consistent naming
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    disinfectant: '',
    service: '',
    surface: '',
    quantity: '',
    year: '',
  });
  const [deleteYear, setDeleteYear] = useState('');

  // Static disinfectant options (could be fetched from API)
  const disinfectantOptions = ['Bleach', 'Alcohol', 'Hydrogen Peroxide'];

  // Fetch entries on component mount
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get('http://localhost:8080/disinfectants');
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching disinfectants:', error);
      }
    };
    fetchEntries();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleAdd = async () => {
    const { disinfectant, service, surface, quantity, year } = formData;
    
    if (!disinfectant || !quantity || !year) {
      alert('Please fill in all required fields.');
      return;
    }

    const newEntry = {
      disinfectant,
      service,
      surface,
      quantity: parseFloat(quantity),
      year: parseInt(year),
    };

    try {
      const response = await axios.post('http://localhost:8080/utilizations/add', newEntry);
      setEntries((prev) => [...prev, response.data]);
      setFormData({ disinfectant: '', service: '', surface: '', quantity: '', year: '' });
      alert('Entry added successfully!');
    } catch (error) {
      console.error('Error adding entry:', error);
      alert('Failed to add entry.');
    }
  };

  // Handle deletion
  const handleDelete = async () => {
    if (!deleteYear) {
      alert('Please select a year to delete.');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/utilizations/delete/${deleteYear}`);
      setEntries((prev) => prev.filter((entry) => entry.year !== parseInt(deleteYear)));
      setDeleteYear('');
      alert('Entry deleted successfully!');
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Failed to delete entry.');
    }
  };

  // Generate year options
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="disinfectant-editor">
      <h1 className="editor-title">Disinfectant Management</h1>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          name="disinfectant"
          value={formData.disinfectant}
          onChange={handleInputChange}
          placeholder="Enter Disinfectant"
          className="input-field"
        />

        

        <input
          type="text"
          name="service"
          value={formData.service}
          onChange={handleInputChange}
          placeholder="Enter Service"
          className="input-field"
        />

        <input
          type="text"
          name="surface"
          value={formData.surface}
          onChange={handleInputChange}
          placeholder="Enter Surface"
          className="input-field"
        />

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          placeholder="Enter Quantity"
          className="input-field"
          min="0"
          step="0.1"
        />

        <select
          name="year"
          value={formData.year}
          onChange={handleInputChange}
          className="input-field"
        >
          <option value="">Select Year</option>
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <button className="action-button add-button" onClick={handleAdd}>
          <FaPlus /> Add
        </button>
      </div>

      {/* Delete Section */}
      <div className="delete-section">
      <select
          name="year"
          value={formData.year}
          onChange={handleInputChange}
          className="input-field"
        >
          <option value="">Select Year to delete</option>
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <button className="action-button add-button" onClick={handleDelete}>
          <FaTrash /> Delete
        </button>
      </div>

      {/* Entries List */}
      <div className="entries-list">
        {entries.length === 0 ? (
          <p className="no-entries">No entries found.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.year} className="entry-item">
              <span>
                {entry.disinfectant} - {entry.service && `${entry.service} - `}
                {entry.surface && `${entry.surface} - `}
                {entry.quantity} units - {entry.year}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DisinfectantEditor;