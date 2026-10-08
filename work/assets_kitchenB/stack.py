import sys
from PIL import Image
out=sys.argv[1]; names=sys.argv[2:]
ims=[Image.open(f'cands/{a}/_verify/sheet.png').convert('RGB') for a in names]
ims=[im.crop((0,30,im.size[0],im.size[1])) for im in ims]
w=ims[0].size[0]; H=sum(i.size[1] for i in ims); M=Image.new('RGB',(w,H)); y=0
for i in ims: M.paste(i,(0,y)); y+=i.size[1]
M=M.resize((w*55//100,H*55//100)); M.save(out,quality=85)
