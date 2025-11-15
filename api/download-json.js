const fs = require('fs');
module.exports = (req,res) => {
  const file = 'data.json';
  if(!fs.existsSync(file)) return res.status(404).send('no data');
  const content = fs.readFileSync(file);
  res.setHeader('Content-Disposition','attachment; filename="ali_institute_data.json"');
  res.setHeader('Content-Type','application/json');
  res.send(content);
};