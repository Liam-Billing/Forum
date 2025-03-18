import { createContext, useState, useEffect } from "react";

export const DiscussionContext = createContext();

export const DiscussionProvider = ({ children }) => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/discussions")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Kunde inte hämta diskussioner, status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API-data:", data);
        setDiscussions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fel vid hämtning:", err);
        setLoading(false);
      });
  }, []);

  return (
    <DiscussionContext.Provider value={{ discussions, loading }}>
      {children}
    </DiscussionContext.Provider>
  );
};