const fs = require('fs');
module.exports = (req,res) => {
  const DATA_FILE = 'data.json';
  const data = fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE)) : [];
  res.setHeader('Content-Type','application/json');
  res.send(JSON.stringify(data));
};