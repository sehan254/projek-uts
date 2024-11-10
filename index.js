const express = require("express");
const db = require("./modules/db");

const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint untuk menambahkan data student baru
app.post("/senjata", (req, res) => {
  const { Nama_Senjata, magazine, jarak, type } = req.body;
  const query = `INSERT INTO senjata (Nama_Senjata, magazine, jarak, type) VALUES ('${Nama_Senjata}', '${magazine}', '${jarak}','${type}')`;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res
        .status(201)
        .json({ id: result.insertId, Nama_Senjata, magazine, jarak, type });
    }
  });
});

// Endpoint untuk mendapatkan semua data Nama Senjata
app.get("/senjata", (req, res) => {
  const query = "SELECT * FROM senjata";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Endpoint untuk mendapatkan data senjata berdasarkan Nama Senjata
app.get("/senjata/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM senjata WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ message: "senjata not found" });
    } else {
      res.json(results[0]);
    }
  });
});

// Endpoint untuk memperbarui data student berdasarkan  Nama Senjata
app.put("/senjata/:id", (req, res) => {
  const { id } = req.params;
  const { Nama_Senjata, magazine, jarak, type } = req.body;
  const query =
    "UPDATE senjata SET Nama_Senjata= ?, magazine = ?, jarak = ?, type = ? WHERE id=?";
  db.query(query, [Nama_Senjata, magazine, jarak, type, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "senjata not found" });
    } else {
      res.json({ Nama_Senjata, magazine, jarak, type });
    }
  });
});

// Endpoint untuk menghapus data student berdasarkan Nama Senjata
app.delete("/senjata/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM senjata WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "senjata not found" });
    } else {
      res.json({ message: "senjata deleted" });
    }
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
