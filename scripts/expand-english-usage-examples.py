"""Add usage examples from the same source sense; do not invent tense templates."""
import ast,concurrent.futures,json,pathlib,re,threading,time,urllib.parse,urllib.request,zipfile
ROOT=pathlib.Path(__file__).resolve().parent.parent
CACHE=ROOT/'.cache/english-sources'
lessons=json.loads((CACHE/'current-lessons.json').read_text(encoding='utf-8'))
entries=json.loads((CACHE/'tkg-entries.json').read_text(encoding='utf-8'))
by_id={x['id']:x for x in entries};by_word={}
for e in entries:by_word.setdefault((e['headword'].lower(),e['pos']),[]).append(e)
z=zipfile.ZipFile(CACHE/'wordnet.zip');wn={}
for pos in ['adj','adv']:
 for line in z.read('wordnet/data.'+pos).decode().splitlines():
  if line and line[0].isdigit():wn[line.split()[0]+'-'+line.split()[2]]=line.partition(' | ')[2]
def clean(s):return re.sub(r'\s+',' ',re.sub(r'[*_`]','',s)).strip()
def key(s):return clean(s).lower().strip(' .!?')
selected={};sources={}
for l in lessons:
 if l['category']not in ['verbs','adjectives','adverbs','connectors','prepositions']:continue
 old={key(x[0])for x in l['examples']};examples=[];source=l.get('source')
 if source=='wordnet-3.0':
  gloss=wn.get(l.get('sourceEntry'),'');examples=re.findall(r'"([^"]+)"',gloss)
  examples=[x for x in examples if 4<=len(x.split())<=19 and re.search(r'\b(is|are|was|were|he|she|they|it|we|you|has|have|had)\b',x,re.I)]
 elif source=='tkg-cc0' or not source:
  pos={'verbs':'v','adjectives':'adj','adverbs':'adv','connectors':'conj','prepositions':'prep'}[l['category']]
  entry=by_id.get(l.get('sourceEntry')) if source else next(iter(by_word.get((l['title'].lower(),pos),[])),None)
  if entry:
   senses=entry.get('senses',[])
   matched=[s for s in senses if any(key(x.get('text',''))in old for x in s.get('examples',[]))]
   sense=(matched or senses or [{}])[0]
   examples=[clean(x['text'])for x in sense.get('examples',[]) if x.get('text')]
   source='tkg-cc0'
 extras=[]
 for en in examples:
  en=clean(en)
  if 3<=len(en.split())<=22 and key(en)not in old:
   en=en[0].upper()+en[1:]
   if en[-1]not in '.!?':en+='.'
   extras.append(en);old.add(key(en))
  if len(extras)>=3:break
 if extras:selected[l['id']]=extras;sources[l['id']]=source
log=CACHE/'translations-ta.jsonl';translated={x['en']:x['ta']for x in map(json.loads,log.read_text(encoding='utf-8').splitlines())}
texts=list(dict.fromkeys(x for examples in selected.values()for x in examples));pending=[x for x in texts if x not in translated]
batches=[];batch=[];size=0
for text in pending:
 n=len(urllib.parse.quote(text))+30
 if batch and (len(batch)>=30 or size+n>6000):batches.append(batch);batch=[];size=0
 batch.append(text);size+=n
if batch:batches.append(batch)
lock=threading.Lock();write_lock=threading.Lock();next_request=0
# Reuse only the request/cache helper functions from our own translation script.
tree=ast.parse((ROOT/'scripts/translate-english-vocabulary.py').read_text(encoding='utf-8-sig'))
functions=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in ['request','translate_batch']]
exec(compile(ast.Module(body=functions,type_ignores=[]),'<translation helpers>','exec'))
print('Lessons enriched:',len(selected),'Additional examples:',len(texts),'Pending translations:',len(pending),flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=2)as pool:
 for i,result in enumerate(pool.map(translate_batch,batches)):
  translated.update(result)
  if (i+1)%10==0:print('Translated batches',i+1,'/',len(batches),flush=True)
out={k:{'examples':[[en,translated[en]]for en in v],'source':sources[k],'translationStatus':'machine-assisted'}for k,v in selected.items()}
(ROOT/'public/content/english/additional-examples.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Saved additional examples.',flush=True)
