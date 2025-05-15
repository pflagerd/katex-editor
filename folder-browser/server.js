const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// API to list directory contents
app.get('/api/list', (req, res) => {
  const folderPath = req.query.path;

  if (!folderPath) {
    return res.status(400).json({ error: 'Missing "path" query parameter.' });
  }

  fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read directory.' });
    }

    const result = files.map(file => ({
      name: file.name,
      type: file.isDirectory() ? 'folder' : 'file'
    }));

    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
