const http=require('http'),fs=require('fs'),path=require('path');const root=path.join(__dirname,'www');
http.createServer((q,s)=>{const f=path.join(root,/^\/\?unit/.test(q.url)?'unit.html':decodeURIComponent(q.url.split('?')[0])==='/'?'index.html':decodeURIComponent(q.url.split('?')[0]).slice(1));
 if(!f.startsWith(root)||!fs.existsSync(f)){s.writeHead(404);return s.end();}const st=fs.statSync(f);const ct=f.endsWith('.mp4')?'video/mp4':f.endsWith('.webp')?'image/webp':'text/html';const range=q.headers.range;
 if(range){const [a,b]=range.replace('bytes=','').split('-');const start=+a,end=b?+b:st.size-1;s.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${st.size}`,'Accept-Ranges':'bytes','Content-Length':end-start+1,'Content-Type':ct});return fs.createReadStream(f,{start,end}).pipe(s);}
 s.writeHead(200,{'Content-Type':ct,'Content-Length':st.size,'Accept-Ranges':'bytes'});fs.createReadStream(f).pipe(s);}).listen(+process.argv[2]||8790);
