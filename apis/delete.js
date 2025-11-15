const fs = require('fs');
module.exports = (req,res) => {
  const id = parseInt(req.query.id);
  const DATA_FILE = 'data.json';
  const data = fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE)) : [];
  if(isNaN(id) || id<0 || id>=data.length) return res.status(400).send('invalid id');
  data.splice(id,1);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data,null,2));
  return res.send('ok');
};