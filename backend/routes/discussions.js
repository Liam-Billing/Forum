const express = require("express");
const db = require("../database");
const router = express.Router();

// Hämta alla diskussioner
router.get("/", (req, res) => {
  try {
    const discussions = db.prepare("SELECT * FROM discussions").all();
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta diskussioner" });
  }
});

// Hämta en diskussion med svar
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const discussion = db.prepare("SELECT * FROM discussions WHERE id = ?").get(id);

    if (!discussion) {
      return res.status(404).json({ error: "Diskussionen hittades inte" });
    }

    const replies = db.prepare("SELECT * FROM replies WHERE discussionId = ? ORDER BY createdAt DESC").all(id);
    res.json({ ...discussion, replies });
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta diskussionen" });
  }
});

// Skapa en ny diskussion
router.post("/", (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Titel och innehåll krävs" });
    }

    const stmt = db.prepare("INSERT INTO discussions (title, content) VALUES (?, ?)");
    const result = stmt.run(title, content);

    res.status(201).json({ id: result.lastInsertRowid, title, content });
  } catch (error) {
    res.status(500).json({ error: "Kunde inte skapa diskussion" });
  }
});

// Skicka ett svar på en diskussion
router.post("/:id/replies", (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Innehåll krävs för att skicka ett svar" });
    }

    const stmt = db.prepare("INSERT INTO replies (discussionId, content) VALUES (?, ?)");
    const result = stmt.run(id, content);

    res.status(201).json({ id: result.lastInsertRowid, discussionId: id, content });
  } catch (error) {
    res.status(500).json({ error: "Kunde inte skicka svar" });
  }
});

// Ta bort en diskussion (och alla tillhörande svar)
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    // Kolla om diskussionen finns
    const discussion = db.prepare("SELECT * FROM discussions WHERE id = ?").get(id);
    if (!discussion) {
      return res.status(404).json({ error: "Diskussionen hittades inte" });
    }

    // Ta bort alla svar kopplade till diskussionen
    db.prepare("DELETE FROM replies WHERE discussionId = ?").run(id);

    // Ta bort själva diskussionen
    db.prepare("DELETE FROM discussions WHERE id = ?").run(id);

    res.json({ message: "Diskussionen har raderats", success: true });
  } catch (error) {
    res.status(500).json({ error: "Kunde inte ta bort diskussionen" });
  }
});

// Ta bort ett svar från en diskussion
router.delete("/:discussionId/replies/:replyId", (req, res) => {
  try {
    const { discussionId, replyId } = req.params;

    console.log(`Försöker ta bort svar med ID: ${replyId} från diskussion: ${discussionId}`);

    // Kontrollera att id:n är numeriska
    const numericDiscussionId = parseInt(discussionId, 10);
    const numericReplyId = parseInt(replyId, 10);

    // Kontrollera om svaret finns i databasen
    const reply = db.prepare("SELECT * FROM replies WHERE id = ? AND discussionId = ?").get(numericReplyId, numericDiscussionId);
    if (!reply) {
      console.log("Svaret hittades inte i databasen.");
      return res.status(404).json({ error: "Svaret hittades inte" });
    }

    // Ta bort svaret
    db.prepare("DELETE FROM replies WHERE id = ?").run(numericReplyId);
    console.log("Svaret har raderats framgångsrikt.");

    res.json({ message: "Svaret har raderats", success: true });
  } catch (error) {
    console.error("Fel vid radering:", error);
    res.status(500).json({ error: "Kunde inte ta bort svaret" });
  }
});

module.exports = router;