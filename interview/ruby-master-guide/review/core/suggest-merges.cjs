const fs=require('fs'),path=require('path');
let records=[];
for(const d of fs.readdirSync(path.resolve(__dirname,'..'))){const f=path.resolve(__dirname,'..',d,'records.json');if(fs.existsSync(f))records.push(...JSON.parse(fs.readFileSync(f,'utf8')));}
const questions=[...new Set(records.map(r=>r.question))];
function term(q){return q.toLowerCase().replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[`*_]/g,'').replace(/ruby\s+on\s+rails/g,'rails').replace(/active\s+record/g,'activerecord').replace(/\s+/g,' ').replace(/[?!.:]+$/,'').trim();}
const exclude=q=>q.includes('\n')||q.length>400||/following|below|above|this (?:code|program|snippet)|what (?:is|will be|would be) the output|what will.*equal|mcq/i.test(q);
const rules=[
['ruby-class-module',q=>/difference.*(?:class.*module|module.*class)|modules and.*different from classes|difference.*modules and classes/.test(q)&&!/singleton|class_eval|instance_eval/.test(q)],
['ruby-proc-lambda',q=>/proc.*lambda|lambda.*proc/.test(q)&&!/block|literal/.test(q)],
['ruby-block-proc-lambda',q=>/(?:block.*proc.*lambda)/.test(q)&&!/literal/.test(q)],
['ruby-instance-class-variable',q=>/difference.*class.*instance variables|class variables.*different from instance variables|class variables.*and instance variables/.test(q)&&!/local/.test(q)],
['ruby-accessor-getter-setter',q=>/accessor|getter.*setter/.test(q)&&!/create a ruby class|custom|restrict|attraccess/.test(q)],
['ruby-accessor-three-macros',q=>/attraccessor.*attrreader.*attrwriter|attrreader.*attrwriter.*attraccessor/.test(q)],
['ruby-gc',q=>/garbage collection/.test(q)&&!/tuning|profile|leak/.test(q)],
['ruby-closure',q=>/closure|clouser|clouser/.test(q)&&!/\bjs\b|binding|proc|javascript/.test(q)],
['ruby-refinement',q=>/refinement/.test(q)&&!/monkey/.test(q)],
['ruby-metaprogramming',q=>/metaprogramming/.test(q)&&!/advanced|singleton|methodmissing|method_missing/.test(q)],
['ruby-symbol-string',q=>/symbol.*string|string.*symbol/.test(q)&&!/hash|variables|String#/.test(q)],
['ruby-symbol-variable',q=>/symbol.*different.*variable/.test(q)&&!/developers use|global|class variable/.test(q)],
['ruby-load-require',q=>/load.*requir|requir.*load/.test(q)&&!/require.?relative|autoload/.test(q)],
['ruby-load-require-relative',q=>/load.*requir|requir.*load/.test(q)&&/require.?relative/.test(q)],
['ruby-method-visibility',q=>/access control|access modifier|public, private, and protected/.test(q)&&!/role|rbac|policy|authoriz/.test(q)],
['ruby-self-receiver',q=>/^(?:describe the role of 'self' in ruby and its contexts|what is (?:the (?:purpose|role) of (?:the )?)?['"]?self['"]?(?: keyword)?(?: in ruby)?|what does self (?:refer to in ruby|mean(?: in ruby)?))$/.test(q)],
['ruby-puts-print-p',q=>/puts, print, and p/.test(q)],
['ruby-four-variable-types',q=>/types of variables|four types of variables/.test(q)],
['ruby-variable-prefix-three',q=>/define (?:the )?instance variable, global variable, and class variable in ruby/.test(q)],
['ruby-exception-handling',q=>/exception handling|handle exceptions/.test(q)&&!/rails|standarderror|exception.*rather|begin.*rescue.*ensure.*difference/.test(q)],
['ruby-loop-types',q=>/types of loops|looping structures/.test(q)],
['ruby-multiple-inheritance',q=>/does ruby.*multiple inheritance|explain multiple inheritance and mixins/.test(q)],
['ruby-dup-clone',q=>/dup.*clone|clone.*dup/.test(q)],
['ruby-flexibility',q=>/ruby.*(?:known as a (?:language of flexibility|flexible language)|flexible language)/.test(q)&&!/metaprogram/.test(q)],
['ruby-nil-value',q=>/^(?:what is the purpose of the 'nil' value in ruby|what does nil mean)$/.test(q)],
['ruby-object-values',q=>/everything.*object|ruby and why is it considered an object/.test(q)],
['ruby-class-instance',q=>/difference.*(?:ruby class|a class).*instance(?: of a class)?/.test(q)&&!/variable|method/.test(q)],
['ruby-yield',q=>/^(?:discuss the purpose of the 'yield' keyword in ruby|explain what is ["']?yield["']? in rails|what (?:is|does the term) ["']?yield["']?(?: refer to in the context of)?(?: in ruby| in rails)?|what is the (?:purpose|use) of (?:the )?yield keyword(?: in ruby)?)$/.test(q)],
['ruby-each-map',q=>/difference.*(?:array#)?map.*(?:array#)?each|difference.*(?:array#)?each.*(?:array#)?map/.test(q)&&!/reduce|select/.test(q)],
['rails-constant-naming',q=>/naming convention/.test(q)&&/rails/.test(q)&&!/comments/.test(q)],
['ruby-class-library',q=>/class librar/.test(q)],
['ruby-constructor',q=>/constructor.*ruby|declare.*constructor/.test(q)&&!/initialize.*new|new.*initialize/.test(q)],
['ruby-rake',q=>/^(?:what is rake|explain rake|what is the purpose of the rakefile available in the demo directory in ruby)$/.test(q)],
['ruby-vs-rails',q=>/^what is the difference between ruby and (?:ruby on )?rails$/.test(q)],
['rails-mvc',q=>/mvc|model-view-controller/.test(q)&&!/strong|failure|anti-pattern|pattern.*versus|why.*model.*business|mvc and.*rest|scenario|describe the flow|request|challenges/.test(q)],
['rails-active-record-definition',q=>/^(?:what (?:is|exactly is the role of) (?:rails )?activerecord(?: in ruby| in rails)?|explain activerecord(?: in rails)?|what is activerecord\? what does it help us do)$/.test(q)],
['rails-orm',q=>/^(?:what is (?:the |an )?(?:orm|object.relational mapping)(?: in rails)?|explain orm(?: in rails)?|what is the object relationship model in rails)$/.test(q)],
['rails-definition',q=>/^(?:what is rails(?: framework)?(?:,? and why (?:is it (?:used|popular)(?: for web development)?|use it))?|what exactly do you know about rails and how well it can be defined|explain (?:what is )?rails)$/.test(q)],
['rails-migration-definition',q=>/^(?:what is (?:a )?(?:rails )?migration(?: in rails)?|what are migrations(?: in rails)?|explain rails migration|can you describe the purpose of a rails migration|what is a rails migration\? why would you use one)$/.test(q)],
['rails-advantages',q=>/^what are (?:some of )?(?:the )?(?:advantages|benefits) of (?:using )?rails$/.test(q)],
['rails-limits',q=>/^what are the (?:limits|limitations) of rails$|^in what ways is rails limited$/.test(q)],
['rails-helper',q=>/^(?:what (?:is|are) (?:a )?(?:rails )?helpers?(?: in rails)?|explain the purpose of rails helpers|how do you use helpers in rails|what are helpers and how do use helpers in rails)$/.test(q)],
['rails-callback-definition',q=>/^(?:what is (?:a )?callback(?: in rails)?|what are callbacks(?: in rails)?|explain (?:the concept of activerecord )?callbacks(?: in rails)?)$/.test(q)],
['rails-associations',q=>/^(?:explain the concept of associations in activerecord|outline the types of associations models can have in rails|what are (?:the (?:different )?types of )?associations(?: in rails)?|explain associations in rails)$/.test(q)],
['rails-observer-callback',q=>/difference.*observers.*callbacks/.test(q)],
['rails-rest-routing',q=>/restful rout/.test(q)&&!/test|security|custom|nested|namespace/.test(q)],
['rails-asset-pipeline',q=>/asset pipeline/.test(q)&&!/sprockets.*propshaft|webpack|importmap|vs\.?|difference|upgrade/.test(q)],
['rails-action-cable',q=>/^(?:what is action ?cable(?: in rails)?|explain (?:the concept of )?action ?cable(?: in rails)?(?: and how it facilitates real-time features in web applications)?)$/.test(q)],
['ruby-gem-definition',q=>/^(?:what (?:is|are) (?:a |an? ["']?)?(?:ruby)?gems?(?:["'])?(?: in ruby| in rails)?(?:,? (?:and )?how (?:is it useful|do you use them|are they used)(?: in the development process)?)?(?:\? give an example of a gem and what it does)?)$/.test(q)],
['ruby-gems-experience',q=>/what are (?:ruby)?gems.*(?:favou?rites|worked on personally)/.test(q)],
['ruby-gemfile',q=>/^(?:what is (?:the |a )?gemfile(?: in rails)?|what is the purpose of (?:the )?'?gemfile'?(?: in a rails project)?)$/.test(q)],
['rails-hash',q=>/^what is (?:a )?hash(?: in ruby| in rails)?$|^what are hashes(?: in ruby)?$|^explain hashes(?: in ruby)?$/.test(q)],
['ruby-false-nil',q=>/^(?:what is the difference between ["']?false["']? and ["']?nil["']?(?: in ruby| in rails)?|mention what the difference is between false and nil in ruby)$/.test(q)],
];
const suggestions=[];const seen=new Map();
for(const [key,predicate] of rules){const matched=questions.filter(q=>!exclude(q)&&predicate(term(q)));if(matched.length<2)continue;for(const q of matched){if(seen.has(q))throw Error(`Overlapping merge: ${key} vs ${seen.get(q)}: ${q}`);seen.set(q,key);}suggestions.push({key,questions:matched});}
fs.writeFileSync(path.join(__dirname,'merge-suggestions.json'),JSON.stringify(suggestions,null,2));
console.log('Suggested',suggestions.length,'groups covering',suggestions.reduce((n,g)=>n+g.questions.length,0),'distinct title strings');
console.log(suggestions.map(g=>g.key+': '+g.questions.length+'\n'+g.questions.map(q=>'  '+q).join('\n')).join('\n'));
