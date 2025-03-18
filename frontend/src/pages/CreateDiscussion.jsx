import React, { useState } from "react";
import "../styles/CreateDiscussion.css"; // Importera CSS

const CreateDiscussion = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Skapa en ny diskussion
  const addDiscussion = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Titel och innehåll krävs!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/discussions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Kunde inte skapa diskussionen");
      }

      alert("Diskussion skapad!");
      window.location.href = "/"; // Navigera tillbaka till startsidan
    } catch (error) {
      console.error("Fel vid skapande av diskussion:", error);
    }
  };

  return (
    <div className="create-container">
      <div className="create-box">
        <h1 className="create-title">Skapa ny diskussion</h1>
        <form onSubmit={addDiscussion} className="create-form">
          <div>
            <label>Titel:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Skriv en titel..."
              className="create-input" 
              required
            />
          </div>

          <div>
            <label>Innehåll:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Skriv innehåll här..."
              className="create-textarea"  
              required
            ></textarea>
          </div>

          <button type="submit" className="create-btn">
            Skapa diskussion
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDiscussion;