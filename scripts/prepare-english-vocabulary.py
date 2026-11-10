"""Prepare a pinned, concise vocabulary expansion from CC0 TKG learner entries.
No network at application runtime. Translation cache is resumable and separate.
"""
import collections, hashlib, json, pathlib, re, unicodedata
ROOT = pathlib.Path(__file__).resolve().parent.parent
CACHE = ROOT / '.cache/english-sources'
SOURCE = CACHE / 'tkg-entries.json'
DEST = CACHE / 'vocabulary-selected.json'
LEXICAL = {'verbs','phrasal-verbs','vocabulary','adjectives','adverbs','prepositions','connectors','collocations','idioms'}
LEVELS = ['A1','A2','B1','B2']
def clean(s):
    return re.sub(r'\s+', ' ', re.sub(r'[*_`]', '', str(s))).strip()
def key(s):
    s = unicodedata.normalize('NFKC', clean(s)).lower().replace('’', "'")
    s = re.sub(r'\b(somebody|sb)\b', 'someone', s)
    s = re.sub(r'\b(sth)\b', 'something', s)
    return s.strip(' .')
entries = json.loads(SOURCE.read_text(encoding='utf-8'))
existing = json.loads((CACHE/'existing.json').read_text(encoding='utf-8'))['lessons']
seen = {key(l['title']) for l in existing if l['category'] in LEXICAL}
# Alternative spellings belong to one entry, not an additional vocabulary item.
alias = {}
for e in entries:
    for v in e.get('variants', []):
        text = v if isinstance(v,str) else v.get('form') or v.get('text') or v.get('headword')
        if text: alias[key(text)] = key(e['headword'])
def canonical(s):
    k = key(s)
    return alias.get(k,k)
seen = {canonical(x) for x in seen}
# Corpus frequency is a learning-order aid, not an official CEFR label.
frequency = collections.Counter()
for f in [CACHE/'wikipedia-en-ta-20210201/en-ta/en.txt', CACHE/'nativeplanet-en-ta-20210315/en-ta/np_train.ta', CACHE/'tatoeba/Tatoeba.en-ta.en']:
    frequency.update(re.findall(r"[a-z]+(?:'[a-z]+)?",f.read_text(encoding='utf-8').lower()))

def example(sense):
    candidates = [clean(x['text']) for x in sense.get('examples',[]) if isinstance(x,dict) and x.get('text')]
    candidates = [x for x in candidates if 3 <= len(x.split()) <= 19 and not re.search(r'https?://|\[|\]|…',x)]
    return min(candidates,key=lambda x:(len(x.split()),len(x))) if candidates else None

def usable(sense):
    definition = clean(sense.get('definition',''))
    ex = example(sense)
    return definition and len(definition.split()) <= 30 and ex

candidates = []
for e in entries:
    if e['pos'] in {'prefix','suffix','comb','abbr','inf'} or e.get('provenance',{}).get('status')!='reviewed': continue
    headword = clean(e['headword'])
    if not re.fullmatch(r"[A-Za-z][A-Za-z '\-]*",headword): continue
    senses = [s for s in e.get('senses',[]) if usable(s)]
    if senses:
        s = senses[0]
        candidates.append({'title':headword,'why':clean(s['definition']),'en':example(s),'pos':e['pos'],
            'sourceEntry':e['id'],'kind':'headword','band':e.get('frequency',{}).get('band',3),
            'inflections':e.get('inflections',{}).get('forms',{}),'regular':e.get('inflections',{}).get('regular')})
    for phrase in e.get('phrases',[]):
        head = clean(phrase.get('text',''))
        if not re.fullmatch(r"[A-Za-z][A-Za-z ',/()\-]*",head) or len(head.split()) > 7 or not usable(phrase): continue
        candidates.append({'title':head,'why':clean(phrase['definition']),'en':example(phrase),'pos':'phrase',
            'sourceEntry':e['id'],'kind':'phrase','band':e.get('frequency',{}).get('band',3),'inflections':{}})

# Main headwords first; phrases are complete fixed expressions, never word permutations.
candidates.sort(key=lambda x:(x['kind']!='headword',x['band'], -frequency[x['title'].lower()],len(x['title'].split()),x['title'].lower()))
unique=[]
for item in candidates:
    k=canonical(item['title'])
    if k in seen: continue
    # Existing natural personalised expression is the same idiom.
    if k=='give someone a hand' and 'give me a hand' in seen: continue
    seen.add(k);item['lexicalKey']=k;unique.append(item)
    if len(seen)==4500: break
if len(seen)!=4500: raise ValueError('Only '+str(len(seen))+' available unique items')
counts=collections.Counter(l['level'] for l in existing if l['category'] in LEXICAL)
existing_keys={}
for l in existing:
    if l['category'] in LEXICAL: existing_keys.setdefault(canonical(l['title']),l['level'])
current=0;offset=0
for level,target in zip(LEVELS,[500,1200,2500,4500]):
    current += sum(v==level for v in existing_keys.values())
    needed=target-current
    for item in unique[offset:offset+needed]: item['level']=level
    offset+=needed;current+=needed
assert offset==len(unique)
for i,item in enumerate(unique):item['id']='vocab-'+re.sub(r'[^a-z0-9]+','-',item['lexicalKey']).strip('-')
DEST.write_text(json.dumps(unique,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Existing unique:',len(existing_keys),'New:',len(unique),'Total:',len(seen))
print('Levels:',dict(collections.Counter(x['level']for x in unique)))
print('Types:',dict(collections.Counter(x['pos']for x in unique)))
print('Headwords/phrases:',dict(collections.Counter(x['kind']for x in unique)))
print('Samples:',[(x['title'],x['why'],x['en'])for x in unique[:6]])
