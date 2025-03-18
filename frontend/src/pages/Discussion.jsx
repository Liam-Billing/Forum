import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // För att hämta id från URL
import "../styles/Discussion.css";

const Discussion = () => {
  const { id } = useParams();  // Hämtar diskussionens ID från URL
  const [discussion, setDiscussion] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    // Gör ett API-anrop för att hämta diskussionen med id
    fetch(`http://localhost:5000/api/discussions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDiscussion(data);  // Uppdatera diskussionen
        setReplies(data.replies || []);  // Uppdatera svaren om de finns
      })
      .catch((error) => {
        console.error("Fel vid hämtning av diskussion:", error);
      });
  }, [id]);  // Hämta diskussion när id ändras

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/api/discussions/${id}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyContent }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Kunde inte skicka svar");

      setReplies([...replies, data]); // Lägg till det nya svaret
      setReplyContent("");  // Töm input-fältet
    } catch (error) {
      console.error("Fel vid svarsinlämning:", error);
    }
  };

  const handleDeleteReply = async (replyId) => {
    if (!window.confirm("Är du säker på att du vill ta bort detta svar?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/discussions/${id}/replies/${replyId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Kunde inte radera svaret");

      setReplies(replies.filter((reply) => reply.id !== replyId)); // Ta bort svaret från listan
    } catch (error) {
      console.error("Fel vid radering av svar:", error);
    }
  };

  const handleDeleteDiscussion = async () => {
    if (!window.confirm("Är du säker på att du vill ta bort hela tråden?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/discussions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Kunde inte ta bort diskussionen");

      alert("Diskussionen har tagits bort!");
      // Navigera tillbaka till startsidan efter borttagning
      window.location.href = "/";  // Eller använd React Router för att navigera
    } catch (error) {
      console.error("Fel vid borttagning av diskussion:", error);
    }
  };

  if (!discussion) return <p>Laddar...</p>; // Visa laddningsmeddelande om data inte har hämtats ännu

  return (
    <div className="discussion-container">
      <div className="discussion-box">
        <h1 className="discussion-title">{discussion.title}</h1>
        <p className="discussion-content">{discussion.content}</p>

        <button className="delete-discussion-btn" onClick={handleDeleteDiscussion}>
          Ta bort tråd
        </button>

        <h2 className="replies-title">Svar</h2>
        <ul className="reply-list">
          {replies.length === 0 ? (
            <p>Inga svar ännu. Bli den första att svara!</p>
          ) : (
            replies.map((reply) => (
              <li key={reply.id} className="reply-item">
                {reply.content}
                <button className="delete-reply-btn" onClick={() => handleDeleteReply(reply.id)}>
                  Ta bort
                </button>
              </li>
            ))
          )}
        </ul>

        <h3 className="replies-title">Skriv ett svar...</h3>
        <form onSubmit={handleReplySubmit} className="reply-form">
          <textarea
            className="reply-input"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Skriv ditt svar här..."
            required
          ></textarea>
          <button type="submit" className="reply-btn">Skicka</button>
        </form>
      </div>
    </div>
  );
};

export default Discussion;