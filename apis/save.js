const fs = require('fs');
module.exports = async (req, res) => {
  if(req.method !== 'POST') return res.status(405).send('Method not allowed');
  const body = req.body;
  if(!body || !body.name || !body.phone) return res.status(400).send('name & phone required');
  const DATA_FILE = 'data.json';
  let arr = [];
  try{ arr = fs.existsSync(DATA_FILE) ? JSON.parse(fs.readFileSync(DATA_FILE)) : []; }catch(e){ arr = []; }
  arr.push(body);
  fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2));
  const vcf = `BEGIN:VCARD
VERSION:3.0
FN:${body.name}
TEL;TYPE=CELL:${body.phone}
ADR;TYPE=HOME:;;${(body.address||'')}
END:VCARD
`;
  try{ fs.writeFileSync(`vcf_${body.phone||Date.now()}.vcf`, vcf); }catch(e){ console.warn('vcf write failed', e); }
  return res.status(200).send('ok');
};