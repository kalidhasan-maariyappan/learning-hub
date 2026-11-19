// LLM Engineering, Week 1 Day 4 (continued): lessons 29-32 (tokens, tiktoken, the illusion of memory, context windows and costs).
// Code comes from ai/llm_engineering/week1/day4.ipynb; calls to OpenAI are replaced by local Ollama (see the box on each page).
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, h3, ul, ol, table, ex } = JT.h;
  const K = JT.kit;
  const term = (code, result, title, label) => K.rails(code, { title: title || 'Terminal', lang: 'text', result, label: label || 'Output' });
  const py = (code, title) => ex(code, { title: title || 'Example', lang: 'python' });
  const show = (code, title) => K.show(code, title, 'python');
  const note = (html) => '<div class="note"><p>' + html + '</p></div>';
  const tryit = (html) => '<div class="note"><p><strong>Try it yourself:</strong> ' + html + '</p></div>';
  const sources = (html) => '<details class="qa"><summary>Sources for this lesson</summary><div>' + html + '</div></details>';
  const T = 'ai/transcript/01-Week 1 - Build Your First LLM Product- Exploring Top Models/';

  // ---------------------------------------------------------------- 29
  JT.def('llm_what_are_tokens', {
    title: 'What Are Tokens? From Characters to the GPT Tokenizer',
    h1: 'What Are Tokens? <span>From Characters to Tokenizers</span>',
    body: () => [
      p('LLMs do not read letters or words. They read <b>tokens</b>. Before we use them in code, let\'s understand why they exist.'),

      h2('Why Not Characters? Why Not Words?'),
      p('Before an LLM can process text, the text must be turned into a form a neural network accepts: a sequence of pieces, each identified by a number. The question is: what should one piece be? Three answers have been tried.'),
      h3('Attempt 1: one piece per character'),
      p('Early neural networks read letter by letter and predicted the most likely next letter. There are only about 100 possible characters (upper and lower case, punctuation), so the <b>vocabulary</b> is tiny and memory use is small. The problem: the network has to learn too much. It must figure out how letters combine into words <b>and</b> what words mean, all at once. That was too hard to train.'),
      h3('Attempt 2: one piece per word'),
      p('The obvious next step: each word is one input. Now the network can focus on meaning. But the vocabulary explodes: there are so many words in a language, plus all the names of people and places. Rare words had to be left out, so the model could not understand them.'),
      h3('The solution: tokens, a middle ground'),
      p('A <b>token</b> is a chunk of text. In practice it is a whole word (with the space before it), a fragment of a word, a punctuation mark or a run of symbols. (You may hear that a token can even join two very common words; in OpenAI\'s tokenizers, which we test two lessons from now, ordinary word pairs such as "of the" are two separate tokens, so do not count on that.) The vocabulary is a fixed set of such chunks. Because it can always fall back to single characters, nothing is left out. And the model can recognize that a fragment has a meaning, wherever it appears.'),
      p('This works because words often have a main chunk followed by different endings, which fits how we spell language, so the network learns faster. As with the transformer, there is nothing <b>fundamental</b> about tokens: we could use characters or huge word lists. Tokens are simply an efficient compromise that works well.'),

      h2('What Does the Model Actually Receive?'),
      p('The first input to the model is not the text, and not a list of numbers describing meaning. It is just the <b>token ID</b> — the number that says which token of the vocabulary this is. (Vectors, which carry meaning, appear deeper inside the network; the course covers them later. Do not confuse the two.)'),
      p('To see this for real, we use the <b>tokenizer</b>: the tool that converts text to token IDs and back. OpenAI offers a web page to explore it at <code>platform.openai.com/tokenizer</code>. The next lessons look at it, and then use it in code.'),
      K.remember([
        'Character-level inputs are tiny in vocabulary but too hard to learn from; word-level inputs have a vocabulary that is too large.',
        'A token is a chunk of text — usually a whole word (with its leading space), a part of a word, or punctuation. The vocabulary is a fixed set of them.',
        'The model\'s first input is the token ID, a number. It is different from a vector.',
      ]),
      sources('<p>Transcript: <code>' + T + '29-Day 4 - What Are Tokens- From Characters to GPT\'s Tokenizer.txt</code>.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 30
  JT.def('llm_tokenization', {
    title: 'Understanding Tokenization: How GPT Breaks Down Text into Tokens',
    h1: 'Understanding Tokenization: <span>How Text Becomes Tokens</span>',
    body: () => [
      p('Let\'s look at what a tokenizer does to real sentences. OpenAI offers a tokenizer web page that colors each token. The next lesson reproduces the same thing in code; here we learn what to notice.'),

      h2('Common Words: One Token Each'),
      p('For <i>"An important sentence for my class of AI engineers"</i>, each word gets one token. Two details are worth noticing:'),
      ul([
        'You can pick different models in the tool, because different models may tokenize slightly differently. It is a decision made during training and makes little practical difference, so do not choose a model based on it.',
        'The <b>space before a word</b> is part of the token. A token is not just "important" but "<code> important</code>" — a <b>beginning-of-word</b> token. That tells the model a new word starts here. A fragment in the middle of a word is a different token without the space.',
      ]),
      p('So <code>important</code> (inside a word) and <code> important</code> (a new word) are different tokens with different IDs. We will see the IDs in code next.'),

      h2('Rare Words Are Split'),
      p('Take: <i>"An exquisitely handcrafted quip for my masterers of LLM witchcraft"</i>. This has uncommon words, and even an invented one ("masterers"). They are broken into several tokens, so the model still understands them:'),
      ul([
        '<b>exquisitely</b> — several fragments (not a common word).',
        '<b>handcrafted</b> — <code>hand</code> + <code>crafted</code>. "Crafted" has no leading space: it represents a word <i>ending</i>, so the model recognizes it in any word that ends that way.',
        '<b>masterers</b> — <code>master</code> + <code>ers</code>: the verb "to master" plus the "one who does it" ending.',
        '<b>LLM</b> — two tokens. At the time this tokenizer was built, "LLM" was not a common expression!',
        '<b>witchcraft</b> — <code>witch</code> + <code>craft</code>.',
      ]),
      p('Splitting like this does not <b>need</b> to follow word structure; it just helps the network train faster and capture meaning quicker when pieces look like the way words are built. In that example, 66 characters became 18 tokens, and in the first one, 50 characters became 9 tokens.'),

      h2('Numbers'),
      p('In OpenAI\'s tokenizer page, a long number like <code>3.141592653589793</code> was split into pieces of <b>three digits</b> at a time. Every possible three-digit number is a token. That explains an old joke: early GPT models could do three-digit math but failed at four digits, because a four-digit number was split across tokens, so the problem looked very different. Modern models handle it easily.'),
      p('(The web tool may use a different tokenizer from the one the next lesson uses in code (<code>o200k_base</code>, from recent OpenAI models), so the exact splits can differ slightly. The ideas are the same.)'),

      h2('Rules of Thumb'),
      ul([
        'About <b>4 characters</b> per token in ordinary English.',
        'About <b>¾ of a word</b> per token, so <b>1,000 tokens ≈ 750 words</b>.',
        'The complete works of Shakespeare is about 900,000 words, which is roughly <b>1.2 million tokens</b>. Prices are often quoted <i>per million tokens</i>, so think of that as "about one Shakespeare".',
        'Math, scientific terms and <b>code</b> use more tokens per character (variable names can be obscure and dense); it can approach one token per character.',
      ]),
      tryit('Open the tokenizer page and paste a sentence, a long number and a few lines of code. Compare characters with tokens, and see how code differs from ordinary text. Then continue to the next lesson to do the same in Python.'),
      K.remember([
        'Common words are one token; rare words are split into several known fragments.',
        'A leading space is part of the token: a new word and a word fragment are different tokens.',
        'About 4 characters, or ¾ of a word, per token; 1,000 tokens ≈ 750 words. Code needs more tokens.',
      ]),
      sources('<p>Transcript: <code>' + T + '30-Day 4 - Understanding Tokenization- How GPT Breaks Down Text into Tokens.txt</code>. The sentences are the lecture\'s examples (the spelling of the invented word is approximated from the audio). Token counts are the lecture\'s; they may differ for newer tokenizers.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 31
  JT.def('llm_tiktoken_memory', {
    title: 'Tokenizing with tiktoken and the Illusion of Memory',
    h1: 'Tokenizing with <span>tiktoken and the Illusion of Memory</span>',
    body: () => [
      p('Two things in the Day 4 lab: tokenizing in code with <b>tiktoken</b>, and a short experiment that shows how chat <b>memory</b> really works.'),

      h2('Tokenizing with tiktoken'),
      p('<b>tiktoken</b> is OpenAI\'s tokenizer library. It does not call an API: it is a <b>lookup</b>, so it runs on your computer. First, we get the encoding and turn a sentence into token IDs:'),
      py(`import tiktoken

# gpt-6-luna isn't in tiktoken yet, so we use the encoding of recent OpenAI models
encoding = tiktoken.get_encoding("o200k_base")

tokens = encoding.encode("Hi my name is Ed and I like banoffee pie")
print(tokens)`, 'Encode text into tokens'),
      p('<code>get_encoding("o200k_base")</code> loads the vocabulary used by recent OpenAI models (the first run may download it). <code>encode</code> splits the text into chunks and looks up each chunk\'s ID. This is what came out:'),
      term('python', '[12194, 922, 1308, 382, 6117, 326, 357, 1299, 9171, 26458, 5148]', 'Output'),
      p('Eleven numbers: these are the model\'s real inputs. To see what each ID stands for, decode them one by one:'),
      py(`import tiktoken

encoding = tiktoken.get_encoding("o200k_base")

tokens = encoding.encode("Hi my name is Ed and I like banoffee pie")

for token_id in tokens:
    token_text = encoding.decode([token_id])
    print(f"{token_id} = {token_text}")`, 'Decode each token'),
      term('python', `12194 = Hi
922 =  my
1308 =  name
382 =  is
6117 =  Ed
326 =  and
357 =  I
1299 =  like
9171 =  ban
26458 = offee
5148 =  pie`, 'Output'),
      p('Look closely:'),
      ul([
        'Most tokens start with a <b>space</b> (<code> my</code>, <code> name</code>) — the beginning-of-word idea from the last lesson. The first word, <code>Hi</code>, has no space before it.',
        '<b>Ed</b> got a token of its own (6117).',
        '<b>banoffee</b> was split into <code> ban</code> and <code>offee</code>: an unusual word, so two pieces.',
        '40 characters became 11 tokens — close to the rule of thumb of about four characters per token.',
      ]),
      p('You can also decode a single ID:'),
      py(`import tiktoken

encoding = tiktoken.get_encoding("o200k_base")

print(repr(encoding.decode([326])))`, 'Decode one token'),
      term('python', "' and'", 'Output'),
      p('Let\'s check the claims from the last lesson — the leading space, word fragments, numbers and code:'),
      py(`import tiktoken

encoding = tiktoken.get_encoding("o200k_base")

for text in ["important", " important", "unimportant", " of the", "3.141592653589793", "x = [i for i in range(10)]"]:
    ids = encoding.encode(text)
    print(repr(text), "->", len(text), "characters,", len(ids), "tokens:", ids)
    print("    pieces:", [encoding.decode([i]) for i in ids])`, 'Explore tokenization'),
      term('python', `'important' -> 9 characters, 1 tokens: [31371]
    pieces: ['important']
' important' -> 10 characters, 1 tokens: [3378]
    pieces: [' important']
'unimportant' -> 11 characters, 2 tokens: [373, 31371]
    pieces: ['un', 'important']
' of the' -> 7 characters, 2 tokens: [328, 290]
    pieces: [' of', ' the']
'3.141592653589793' -> 17 characters, 7 tokens: [18, 13, 16926, 40146, 41229, 44016, 47262]
    pieces: ['3', '.', '141', '592', '653', '589', '793']
'x = [i for i in range(10)]' -> 26 characters, 11 tokens: [87, 314, 723, 72, 395, 575, 306, 3352, 7, 702, 15710]
    pieces: ['x', ' =', ' [', 'i', ' for', ' i', ' in', ' range', '(', '10', ')]']`, 'Our run'),
      p('<code>important</code> and <code> important</code> have different IDs (31371 and 3378). <code>unimportant</code> is <code>un</code> + <code>important</code>. Even a very common word pair, <code> of the</code>, is <b>two</b> tokens, one per word. The long number is split into groups of three digits. The line of code is 26 characters but 11 tokens: about 2.4 characters per token — fewer characters per token than ordinary text, as predicted.'),
      tryit('Change the sentence or the list of texts. Try a word that is very rare, a sentence in another language, or a long sentence, and compare the characters per token. Small IDs are not meaningful, but it is fun to look for words with very small or very large IDs.'),

      h2('The Illusion of Memory'),
      p('Now an experiment that often gives an "aha" moment. We use the same client you know, here pointed at Ollama (the notebook uses OpenAI; nothing else changes). First, we introduce ourselves:'),
      py(`from openai import OpenAI

ollama = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

messages = [
    {"role": "system", "content": "You are a helpful assistant"},
    {"role": "user", "content": "Hi! I'm Ed!"}
    ]

response = ollama.chat.completions.create(model="llama3.2", messages=messages)
print(response.choices[0].message.content)`, 'Call 1: introduce yourself'),
      term('python', `Hi Ed! It's nice to meet you. How can I help you today? [...]`, 'Our run (shortened)'),
      p('Now a <b>new</b> call, with the follow-up question only:'),
      py(`from openai import OpenAI

ollama = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

messages = [
    {"role": "system", "content": "You are a helpful assistant"},
    {"role": "user", "content": "What's my name?"}
    ]

response = ollama.chat.completions.create(model="llama3.2", messages=messages)
print(response.choices[0].message.content)`, 'Call 2: ask for the name'),
      term('python', `I don't have any information about your name. This is the start of our conversation, and I don't have any prior knowledge about you. [...]`, 'Our run (shortened)'),
      p('We just told it! What happened? <b>Every call to an LLM is completely stateless.</b> The model gets the input sequence you send, predicts the next tokens, and nothing else. It does not know that you called it a moment ago.'),
      p('So how does a chat product hold a conversation? With a trick that is <b>our job</b> as engineers: with every call we send the <b>entire conversation so far</b>. Note the new role, <code>assistant</code>, which holds the model\'s earlier replies:'),
      py(`from openai import OpenAI

ollama = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

messages = [
    {"role": "system", "content": "You are a helpful assistant"},
    {"role": "user", "content": "Hi! I'm Ed!"},
    {"role": "assistant", "content": "Hi Ed! How can I assist you today?"},
    {"role": "user", "content": "What's my name?"}
    ]

response = ollama.chat.completions.create(model="llama3.2", messages=messages)
print(response.choices[0].message.content)`, 'Call 3: send the whole conversation'),
      term('python', `Your name is Ed! I remember, you told me that when we started chatting. [...]`, 'Our run (shortened)'),
      p('Now it "remembers". Of course, the model remembers nothing: its input contains "Hi! I\'m Ed!" and then "What\'s my name?", and the most likely next tokens after that are "Your name is Ed". Take away the first message and the most likely next tokens are "I don\'t know your name".'),
      p('Here is the recap — it must become second nature:'),
      ol([
        'Every call to an LLM is <b>stateless</b>.',
        'We pass in the <b>entire conversation so far</b>, every time.',
        'That gives the <b>illusion</b> that the LLM remembers and keeps context.',
        'It is a trick: a by-product of sending the whole conversation each time. Chat products such as ChatGPT work on this same basic principle (some add extra features, such as saved memories, on top).',
        'An LLM only predicts the most likely next tokens for the sequence it is given.',
      ]),
      note('<b>Does this mean you pay for the past again each time?</b> Yes. The model has to compute over the whole conversation to answer well, and that compute costs money. The next lesson shows how this adds up.'),
      K.remember([
        'tiktoken encodes text to token IDs and decodes IDs back to text, locally — it makes no API call.',
        'Words that are common are one token; rare words are split; a leading space is part of a token.',
        'LLM calls are stateless: memory is an illusion created by sending the whole conversation every time.',
      ]),
      sources('<p>Transcript: <code>' + T + '31-Day 4 - Tokenizing with tiktoken and Understanding the Illusion of Memory.txt</code>. Code: <code>ai/llm_engineering/week1/day4.ipynb</code> (tiktoken cells and the memory cells). The memory cells use Ollama (<code>llama3.2</code>) instead of OpenAI; the notebook version uses <code>OpenAI()</code> and a GPT model. The extra "Explore tokenization" example is added for this lesson. Token IDs shown are from the <code>o200k_base</code> encoding on this machine.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 32
  JT.def('llm_context_windows_costs', {
    title: 'Context Windows, API Costs and Token Limits in LLMs',
    h1: 'Context Windows, <span>API Costs and Token Limits</span>',
    body: () => [
      p('Two practical limits shape every LLM application: how much text a model can look at (the context window), and what each call costs.'),

      h2('The Context Window'),
      p('The <b>context window</b> is the maximum number of tokens a model can look at when it generates the next token. If your input is longer, the call fails.'),
      p('What has to fit is more than your latest message. It is the <b>whole</b> input sequence: the entire conversation so far, plus the tokens the model is generating. A model produces one token at a time, and each new token is added to the input before the next one is predicted. So the window must hold: the original input, earlier replies, your newest message, and all the generated tokens up to the last one.'),
      p('Let\'s see how fast a conversation grows. This counts the tokens of the conversation from the last lesson as each message is added (it ignores the small extra tokens that formats add around messages, so it is an estimate):'),
      py(`import tiktoken

encoding = tiktoken.get_encoding("o200k_base")

conversation = [
    "You are a helpful assistant",
    "Hi! I'm Ed!",
    "Hi Ed! How can I assist you today?",
    "What's my name?",
]

total = 0
for i, text in enumerate(conversation, start=1):
    total += len(encoding.encode(text))
    print(f"after message {i}: the input so far is {total} tokens")`, 'The input grows with every message'),
      term('python', `after message 1: the input so far is 5 tokens
after message 2: the input so far is 10 tokens
after message 3: the input so far is 20 tokens
after message 4: the input so far is 24 tokens`, 'Our run'),
      p('Every turn adds to the input, and all of it counts. The context window is what limits how much background the model can remember — references, instructions, and data. It matters a lot for:'),
      ul([
        '<b>Multi-shot prompting</b> — you give a series of example questions and answers in the input, to draw from.',
        '<b>RAG</b> and other inference-time techniques that put extra information in the input (later in the course).',
        'Long sessions: anyone who has used a coding agent has seen quality drop as the context fills up.',
      ]),
      p('For scale: the complete works of Shakespeare is about 1.2 million tokens, so you would need a context window of about a million tokens to hold it.'),

      h2('API Costs'),
      h3('Subscription vs API'),
      p('Chat products like ChatGPT have a free tier and paid tiers (roughly $20 to $200 a month): a flat fee with usage limits. The <b>API</b> is different: you pay <b>per use</b>, regardless of any subscription. If you build a product with it, you also pay per call — the compute bill. Those costs pay for the inference (trillions of calculations) and, indirectly, the cost of training.'),
      h3('What you pay for'),
      p('The cost depends on the <b>input tokens</b> you send and the <b>output tokens</b> you receive, and two catches apply:'),
      ol([
        'Input tokens include the <b>entire sequence</b> — all the "fake memory", plus any extra information like RAG context. It feels unfair that costs accumulate, but the model must compute over all of it to answer well. You could send only the last message and avoid paying for history; the answers would be poor.',
        'Output tokens include any <b>reasoning</b> a reasoning model does. With some models you do not even see these tokens, but you still pay for them. That makes cost less predictable.',
      ]),
      p('Your tokens are reported on every response. This shows the counts for one call to our local model and what that call would cost at example prices (GPT-5 when this course was recorded: <b>$1.25 per million input tokens</b> and <b>$10 per million output tokens</b>). The local model itself costs nothing:'),
      py(`from openai import OpenAI

ollama = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

response = ollama.chat.completions.create(
    model="llama3.2",
    messages=[{"role": "user", "content": "Tell me a fun fact"}]
)

used = response.usage
print("input tokens: ", used.prompt_tokens)
print("output tokens:", used.completion_tokens)

# Example prices (GPT-5 when this course was recorded): $1.25 per million input tokens, $10 per million output tokens
cost = used.prompt_tokens / 1_000_000 * 1.25 + used.completion_tokens / 1_000_000 * 10
print(f"cost of this call at those prices: \${cost:.6f}")`, 'Token usage and cost'),
      term('python', `input tokens:  30
output tokens: 102
cost of this call at those prices: $0.001058`, 'Our run (token counts vary)'),
      p('A tenth of a cent for a whole call. Individual experiments cost almost nothing: the $5 deposit is annoying, but everyday calls use a tiny fraction of it. Costs matter when you operate at scale — many concurrent conversations or an agent loop that eats tokens — and then you must work out the <b>cost per user</b>.'),
      note('<b>Prices and windows change often.</b> The numbers below date from when this course was recorded and are only examples. A useful reference is a leaderboard from Vellum (<code>vellum.ai/llm-leaderboard</code>) that lists context windows and API costs side by side. We look at leaderboards properly in Week 4.'),
      table(['Model (at the time)', 'Context window', 'Input / output price per million tokens'], [
        ['GPT-5', '400,000 tokens', '$1.25 / $10'],
        ['GPT-5 nano', '—', '$0.05 / $0.40 (generating the works of Shakespeare would cost under $1)'],
        ['Claude models', '200,000 tokens', '—'],
        ['GPT-OSS (open source)', 'about 130,000 tokens', 'free to run yourself'],
        ['Gemini 2.5 Flash', '1,000,000 tokens', '—'],
      ]),
      p('One more cost idea: <b>caching</b>. If you send the same input twice within a few minutes, the repeated part can be cheaper. With GPT this is automatic; with Claude it takes some setup. We return to it later.'),

      h2('Where You Are'),
      p('You are 10% through. You can call OpenAI and Ollama, build a summarizer, compare frontier models, and you now know transformers, tokens, context windows, costs and the illusion of memory. The rest of this week: stronger use of the Chat Completions API, <b>one-shot prompting</b>, streaming, markdown and JSON results, and a business solution in a few minutes.'),
      K.remember([
        'The context window is the maximum number of tokens a model can consider: the whole conversation plus the tokens it generates.',
        'API cost = input tokens + output tokens; input includes the full history and extra context, and output includes hidden reasoning tokens.',
        'Costs per call are small; they matter at scale. Check prices and windows, because they change often.',
      ]),
      sources('<p>Transcript: <code>' + T + '32-Day 4 - Context Windows, API Costs, and Token Limits in LLMs.txt</code>. Prices and context sizes are the lecture\'s, as of its recording, and are not current. The token-count and cost examples are written for this lesson and run on Ollama; <code>o200k_base</code> is used for counting.</p>'),
    ].join(''),
  });
})();
