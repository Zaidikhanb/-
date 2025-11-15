(function(){
  const form = document.getElementById('regForm');
  const submitBtn = document.getElementById('submitBtn');
  const clearBtn = document.getElementById('clearBtn');

  function onChildCount(){
    const val = document.getElementById('childCount').value;
    document.getElementById('classWrap').style.display = val === 'none' ? 'none' : 'block';
  }
  window.onChildCount = onChildCount;

  function toVCF(data){
    return `BEGIN:VCARD
VERSION:3.0
FN:${escapeNewlines(data.name)}
TEL;TYPE=CELL:${escapeNewlines(data.phone)}
ADR;TYPE=HOME:;;${escapeNewlines(data.address)}
NOTE:Registered via Ali Institute
END:VCARD`;
  }
  function escapeNewlines(s){ return (s||'').replace(/\r?\n/g,' '); }

  submitBtn.addEventListener('click', async ()=>{
    submitBtn.disabled=true;
    const payload = {
      name: document.getElementById('name').value.trim(),
      childCount: document.getElementById('childCount').value,
      class: document.getElementById('class').value || '',
      gender: document.getElementById('gender').value,
      address: document.getElementById('address').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      interest: document.getElementById('interest').value,
      surveyor: document.getElementById('surveyor').value.trim(),
      createdAt: new Date().toISOString()
    };
    try{
      const res = await fetch('/api/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      if(!res.ok) throw new Error('Save failed');
      // download single-person VCF immediately for convenience
      const vcf = toVCF(payload);
      const blob = new Blob([vcf],{type:'text/vcard'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href=url; a.download = `vcf_${payload.phone||Date.now()}.vcf`; document.body.appendChild(a); a.click(); a.remove();
      alert('Saved — VCF downloaded');
      form.reset();
      onChildCount();
    }catch(e){ console.error(e); alert('Error saving — see console'); }finally{ submitBtn.disabled=false }
  });

  clearBtn.addEventListener('click', ()=>{ if(confirm('Clear form?')) form.reset(); onChildCount(); });
})();