"""Prefer additional lexical headwords over rare figurative phrases.
Keeps the 4,500-item total and all level quotas unchanged.
"""
import collections,csv,json,pathlib,re,zipfile
ROOT=pathlib.Path(__file__).resolve().parent.parent
CACHE=ROOT/'.cache/english-sources'
selected=json.loads((CACHE/'vocabulary-selected.json').read_text(encoding='utf-8'))
wn=json.loads((CACHE/'wordnet-full-sentences.json').read_text(encoding='utf-8'))
lex={r['word']:r for r in csv.DictReader((CACHE/'lexicore-LexiCore_5000.csv').open(encoding='utf-8'))}
existing=json.loads((CACHE/'existing.json').read_text(encoding='utf-8'))['lessons']
seen={x['title'].lower()for x in selected if x['pos']!='phrase'}|{x['title'].lower()for x in existing}
# Known spelling variants are the same vocabulary item.
source=json.loads((CACHE/'tkg-entries.json').read_text(encoding='utf-8'))
variants={}
for entry in source:
    group={entry['headword'].lower()}
    for v in entry.get('variants',[]):
        text=v if isinstance(v,str)else v.get('form')or v.get('text')or v.get('headword')
        if text:group.add(text.lower())
    for text in group:variants.setdefault(text,set()).update(group)
additional=[]
for k,x in sorted(wn.items(),key=lambda pair:int(lex[pair[0]]['rank_global'])):
    equivalent=variants.get(k,{k})
    if k in seen or equivalent & seen:continue
    if re.search(r'\b(archaic|obsolete|slang|derogatory)\b',x['why'],re.I):continue
    example=x['en'][0].upper()+x['en'][1:]
    if example[-1]not in '.!?':example+='.'
    additional.append({**x,'en':example,'id':'vocab-'+k,'lexicalKey':k,'level':'B2','source':'wordnet-3.0','sourceEntry':x['synset'],'kind':'headword','band':3,'inflections':{}})
    seen.add(k)
# Preserve the curated basic greetings and common literal expressions.
phrases=[x for x in selected if x['pos']=='phrase']
text=' '.join((CACHE/'wikipedia-en-ta-20210201/en-ta/en.txt').read_text(encoding='utf-8').lower().split())
text+=' '+' '.join((CACHE/'nativeplanet-en-ta-20210315/en-ta/np_train.ta').read_text(encoding='utf-8').lower().split())
for x in phrases:x['_occurrences']=text.count(x['title'].lower())
phrases.sort(key=lambda x:(x['level']!='A1',-x['_occurrences'],len(x['title'].split()),x['title']))
replace=min(len(additional),len(phrases)-sum(x['level']=='A1'for x in phrases))
keep=phrases[:len(phrases)-replace]
result=[x for x in selected if x['pos']!='phrase']+keep+additional[:replace]
for x in result:x.pop('_occurrences',None)
assert len(result)==4175
assert collections.Counter(x['level']for x in result)==collections.Counter(x['level']for x in selected)
(CACHE/'vocabulary-selected.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Added direct headwords:',replace,'Remaining sourced expressions:',len(keep))
print('Expressions retained:',[x['title']for x in keep])
print('Source totals:',dict(collections.Counter(x.get('source','tkg-cc0')for x in result)))
# Record the complete required WordNet notice with the distributed data.
z=zipfile.ZipFile(CACHE/'wordnet.zip')
(ROOT/'public/content/english/licenses/WORDNET-LICENSE.txt').write_bytes(z.read('wordnet/LICENSE'))
