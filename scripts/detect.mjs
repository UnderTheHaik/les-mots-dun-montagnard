const months=['janvier','fevrier','mars','avril','mai','juin','juillet','aout','septembre','octobre','novembre','decembre'];
export function detectSignature(text) {
 const lines=text.split(/\r?\n/).map(s=>s.trim());
 // Only a signature followed by a place and full French date near the end.
 for(let i=Math.max(1,lines.length-16);i<lines.length;i++) {
  const m=lines[i].match(/^(.+?)\s+le\s+(\d{1,2})\s+(\p{L}+)\s+(\d{4})$/u);
  if(!m)continue;
  const month=months.indexOf(m[3].normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase())+1;
  const date=`${m[4]}-${String(month).padStart(2,'0')}-${m[2].padStart(2,'0')}`;
  const author=lines[i-1];
  if(!month||!Number.isFinite(Date.parse(date))||!author||!/^\p{Lu}[\p{L}’' -]+$/u.test(author)||new Date(date).toISOString().slice(0,10)!==date)continue;
  return {auteur:author,lieu:m[1],date};
 }
 return {auteur:'',lieu:'',date:''};
}
