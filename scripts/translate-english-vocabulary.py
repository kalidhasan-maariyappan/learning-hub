"""Translate the selected public CC0 learning text; resumable, no app-runtime API.
Only public source definitions/examples are sent. No learner data is read or sent.
"""
import concurrent.futures, hashlib, json, pathlib, re, threading, time, urllib.parse, urllib.request
ROOT=pathlib.Path(__file__).resolve().parent.parent
CACHE=ROOT/'.cache/english-sources'
items=json.loads((CACHE/'vocabulary-selected.json').read_text(encoding='utf-8'))
log=CACHE/'translations-ta.jsonl'
translated={}
if log.exists():
    for line in log.read_text(encoding='utf-8').splitlines():
        if line.strip():
            record=json.loads(line);translated[record['en']]=record['ta']
texts=list(dict.fromkeys(s for item in items for s in [item['why'],item['en']]))
pending=[s for s in texts if s not in translated]
batches=[];batch=[];size=0
for text in pending:
    n=len(urllib.parse.quote(text))+30
    if batch and (len(batch)>=35 or size+n>6000):batches.append(batch);batch=[];size=0
    batch.append(text);size+=n
if batch:batches.append(batch)
lock=threading.Lock();write_lock=threading.Lock();next_request=0

def request(text):
    global next_request
    with lock:
        delay=max(0,next_request-time.monotonic());next_request=time.monotonic()+delay+0.65
    if delay:time.sleep(delay)
    url='https://translate.googleapis.com/translate_a/single?'+urllib.parse.urlencode({'client':'gtx','sl':'en','tl':'ta','dt':'t','q':text})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(url,timeout=40) as response: data=json.load(response)
            return ''.join(x[0] for x in data[0] if x and x[0])
        except Exception:
            if attempt==3:raise
            time.sleep(min(30,3*(2**attempt)))

def translate_batch(batch):
    raw=request('\n'.join(str(10001+i)+'. '+s for i,s in enumerate(batch)))
    matches=list(re.finditer(r'(?m)(?:^|\n)\s*(1\d{4})\s*[.।:\-]\s*',raw))
    result={}
    for i,m in enumerate(matches):
        index=int(m.group(1))-10001
        if 0<=index<len(batch):result[batch[index]]=raw[m.end():matches[i+1].start() if i+1<len(matches) else len(raw)].strip()
    for text in batch:
        ta=result.get(text,'')
        if not re.search('[\u0B80-\u0BFF]',ta) or re.search(r'\b1\d{4}\.',ta):result[text]=request(text).strip()
        if not re.search('[\u0B80-\u0BFF]',result[text]):raise ValueError('Missing Tamil: '+text)
    with write_lock:
        with log.open('a',encoding='utf-8') as f:
            for en,ta in result.items():f.write(json.dumps({'en':en,'ta':ta},ensure_ascii=False)+'\n')
    return result

print('Texts:',len(texts),'Cached:',len(translated),'Pending:',len(pending),'Batches:',len(batches),flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
    for i,result in enumerate(executor.map(translate_batch,batches)):
        translated.update(result)
        if (i+1)%10==0 or i+1==len(batches):print('Translated batches',i+1,'/',len(batches),'Cached texts',len(translated),flush=True)
for item in items:
    item['ta']=translated[item['why']]
    item['exampleTa']=translated[item['en']]
    item['source']=item.get('source','tkg-cc0')
    item['translationStatus']='machine-assisted'
    item.pop('band',None)
    item.pop('kind',None)
out=ROOT/'public/content/english/vocabulary-expanded.json'
out.write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Saved',len(items),'bilingual vocabulary entries to',out,flush=True)
