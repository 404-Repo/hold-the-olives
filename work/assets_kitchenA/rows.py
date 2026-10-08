# usage: rows.py out.png sheet1:row[,row] sheet2:row ...   (row index 0-based) -> stacked crop
import sys
from PIL import Image
out=sys.argv[1]; parts=[]
for a in sys.argv[2:]:
    p,rs=a.rsplit(':',1); im=Image.open(p); W,H=im.size
    n=max(1,round((H-30)/353)); rh=(H-30)/n
    for r in rs.split(','):
        r=int(r); parts.append(im.crop((0,int(30+r*rh),W,int(30+(r+1)*rh))))
W=max(p.size[0] for p in parts); H=sum(p.size[1] for p in parts)
o=Image.new('RGB',(W,H)); y=0
for p in parts: o.paste(p,(0,y)); y+=p.size[1]
o.save(out)
