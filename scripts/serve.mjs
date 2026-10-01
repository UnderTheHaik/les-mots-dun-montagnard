import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {root} from './build.mjs';
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml'};
http.createServer((req,res)=>{
  try{
    let url=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    // Test the same site below a repository subpath, as on GitHub Pages.
    url=url.replace(/^\/recueil(?=\/)/,'');
    const mode=url.startsWith('/demo/')?'demo':'public';
    if(mode==='demo')url=url.slice(5);
    if(url.endsWith('/'))url+='index.html';
    const base=path.join(root,mode),file=path.resolve(base,'.'+url);
    if(!file.startsWith(base+path.sep)||!types[path.extname(file)]){res.writeHead(403);res.end('Accès non autorisé');return;}
    fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':types[path.extname(file)],'Cache-Control':'no-store'});res.end(err?'Page introuvable':data);});
  }catch{res.writeHead(400);res.end('Adresse invalide');}
}).listen(8790,'127.0.0.1',()=>console.log('Site : http://127.0.0.1:8790/ — exemple : http://127.0.0.1:8790/demo/'));
