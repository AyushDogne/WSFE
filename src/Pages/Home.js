import React, { useState, useEffect } from 'react';
import '../Style/Home.css';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('Happy');
  const [entries, setEntries] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [filterMood, setFilterMood] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [quote, setQuote] = useState(''); 



  const fetchEntries = async () => {
    try {
      const response = await fetch('http://localhost:8081/getUserData');
      const data = await response.json();
      console.log("this is responce :",response);
      console.log("data",data);
      
      if (Array.isArray(data.data)) {
        console.log("this is data",data);
        
        console.log("entries is : ",entries);
        
        setEntries(data.data);
        console.log("entries is : ",entries);

      } else {
        setEntries([]); // Ensure empty array if the data isn't in the expected format
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  console.log(entries);
  
  useEffect(() => {
    fetchEntries(); // Fetch entries on mount
  }, []);

  const addEntry = async () => {
    if (title && content) {
      const newEntry = { title, content, mood, date: new Date().toLocaleString() };
      try {
        const response = await fetch('http://localhost:8081/addJournal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEntry),
        });
      
        console.log("this is responce",response);
        
        
        const data = await response.json();
        console.log("data is :",data);
        console.log("data.data : ",data.data);
        
        setEntries([data.data, ...entries]); 
        console.log(" this is  entries", entries);
        
        setTitle('');
        setContent('');
        setMood('Happy');
        setIsModalOpen(true); // Show motivational quote modal
      } catch (error) {
        console.error("Error adding entry:", error);
      }
    }
  };

  console.log(entries);
  
  const deleteEntry = async (id) => {
    try {
      await fetch("http://localhost:8081/deleteCustomer");
      setEntries(entries.filter((entry) => entry._id.toString() === id));
      console.log("id delete:",entries);
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

 

  const startEditing = (entry) => {
    setIsEditing(entry.id);
    setTitle(entry.title);
    setContent(entry.content);
    setMood(entry.mood);
  };

  const updateEntry = async () => {
    if (isEditing) {
      const updatedEntry = { title, content, mood, date: new Date().toLocaleString() };
      try {
        const response = await fetch(`http://localhost:8081/editSauda/${isEditing}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedEntry),
        });
        const data = await response.json();
        setEntries(entries.map((entry) => (entry.id === isEditing ? { ...entry, ...updatedEntry } : entry)));
        setIsEditing(null);
        setTitle('');
        setContent('');
        setMood('Happy');
      } catch (error) {
        console.error("Error updating entry:", error);
      }
    }
  };
  
   const filteredEntries = filterMood === 'All' ? entries : entries.filter((entry) => entry.mood === filterMood);

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };


  return (
    <div className="app-container">
      <h1>Journal Entry</h1>
      <div className="journal-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="Happy">Happy</option>
          <option value="Neutral">Neutral</option>
          <option value="Sad">Sad</option>
        </select>

        {isEditing ? (
          <button onClick={updateEntry}>Update Entry</button>
        ) : (
          <button onClick={addEntry}>Add Entry</button>
        )}
      </div>

      <div className="filter-container">
        <label>Filter by Mood: </label>
        <select value={filterMood} onChange={(e) => setFilterMood(e.target.value)}>
          <option value="All">All</option>
          <option value="Happy">Happy</option>
          <option value="Neutral">Neutral</option>
          <option value="Sad">Sad</option>
        </select>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal">
            <h2>Motivational Quote</h2>
            <p>{quote}</p>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <div className="journal-list">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <div key={entry.id} className="journal-entry">
              <h3>Title: {entry.title}</h3>
              <p>Content: {entry.content}</p>
              <p>Mood: {entry.mood}</p>
              <p><strong>Date:</strong> {entry.date}</p>
              <button onClick={() => startEditing(entry)}>Edit</button>
              <button onClick={() => deleteEntry(entry.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No entries found. Please add some!</p>
        )}
      </div>
    </div>
  );
}

export default App;
