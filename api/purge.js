const fs = require('fs');
module.exports = (req,res) => {
  const file = 'data.json';
  if(fs.existsSync(file)) fs.unlinkSync(file);
  const vcfs = fs.readdirSync('.').filter(f=>f.endsWith('.vcf'));
  vcfs.forEach(f=>{ try{ fs.unlinkSync(f) }catch(e){} });
  res.send('ok');
};