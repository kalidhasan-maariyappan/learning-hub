"""Assign custom A1-B2 learning bands to the fixed 4,500-item vocabulary catalog.
The original authored entries retain their levels. Frequency/profile evidence only
orders the new words; the result is a course plan, not CEFR certification.
"""
import collections,csv,json,pathlib,re
ROOT=pathlib.Path(__file__).resolve().parent.parent
CACHE=ROOT/'.cache/english-sources'
items=json.loads((CACHE/'vocabulary-selected.json').read_text(encoding='utf-8'))
frequency={r['word'].lower():r for r in csv.DictReader((CACHE/'lexicore-LexiCore_5000.csv').open(encoding='utf-8'))}
levels=['A1','A2','B1','B2']
easy=set('''yes no hello goodbye please thanks thank you good morning good afternoon good evening good night how are you you're welcome excuse me sorry
mother father brother sister son daughter baby child boy girl man woman parents grandmother grandfather uncle aunt cousin husband wife
head hair face eye ear nose mouth tooth teeth tongue neck shoulder arm hand finger thumb leg knee foot feet toe back stomach heart body
bread rice milk egg meat fish chicken fruit apple banana orange lemon potato tomato onion carrot sugar salt pepper butter cheese soup cake biscuit
house room bedroom bathroom kitchen garden door window floor wall roof table chair bed desk sofa clock mirror lamp light key phone computer book notebook paper pencil pen ruler school teacher student lesson class homework playground bag box cup glass plate bowl spoon fork knife bottle basket
red blue green yellow black white brown pink purple grey gray colour color
one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty thirty forty fifty sixty seventy eighty ninety hundred thousand zero
Monday Tuesday Wednesday Thursday Friday Saturday Sunday January February March April May June July August September October November December
morning afternoon evening night day week month year hour minute second time birthday holiday weekend
sun moon star sky cloud rain snow wind tree flower leaf grass animal dog cat cow goat sheep horse pig bird duck hen lion tiger elephant monkey snake mouse rabbit
big small tall short long young old new good bad nice fine happy sad hungry thirsty tired sick ill clean dirty hot cold warm cool easy hard fast slow quiet loud empty full beautiful ugly rich poor cheap expensive right wrong ready
car bus train bicycle bike boat plane road street station airport shop market hospital bank hotel park beach village town city country map ticket money price coat shirt dress skirt trousers pants shoes socks hat umbrella watch toy ball game music song story name address number friend family people home food water'''.lower().splitlines())
# Split the basic word lists, but preserve the greeting phrases above as whole items.
easy_words=set(re.findall(r"[a-z]+",' '.join(easy)))
easy_phrases={'thank you','good morning','good afternoon','good evening','good night','how are you',"you're welcome",'excuse me','at home','at school','at work','in bed','of course','all right','a little','a lot','a lot of','how much','how many'}
def rank(x):
    k=x['lexicalKey']; f=frequency.get(k,{})
    if k in easy_phrases:return (-1,0,0,k)
    if k in easy_words:return (-1,1,-float(f.get('wordfreq_zipf_2021_baseline') or 0),k)
    band={'A1':0,'A2':1,'B1':2,'B2':3,'C1':4}.get(f.get('cefr_level'),1 if x['pos']!='phrase' else 3)
    if x['pos']=='phrase':band=max(2,band)
    return (band,2,-float(f.get('wordfreq_zipf_2021_baseline') or 0),k)
items.sort(key=rank)
existing=json.loads((CACHE/'existing.json').read_text(encoding='utf-8'))['lessons']
lexical={'verbs','phrasal-verbs','vocabulary','adjectives','adverbs','prepositions','connectors','collocations','idioms'}
first={}
for l in existing:
    if l['category']in lexical:first.setdefault(l['title'].lower(),l['level'])
current=offset=0
for level,target in zip(levels,[500,1200,2500,4500]):
    current+=sum(v==level for v in first.values());n=target-current
    for item in items[offset:offset+n]:item['level']=level
    offset+=n;current+=n
assert offset==len(items)
(CACHE/'vocabulary-selected.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
# May also be rerun after translation without sending any additional requests.
out=ROOT/'public/content/english/vocabulary-expanded.json'
if out.exists():
    mapped={x['id']:x for x in json.loads(out.read_text(encoding='utf-8'))}
    ordered=[]
    for x in items:
        row=mapped[x['id']];row['level']=x['level'];ordered.append(row)
    out.write_text(json.dumps(ordered,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Learning bands assigned:',dict(collections.Counter(x['level']for x in items)))
print('First A1 words:',[x['title']for x in items[:25]])
