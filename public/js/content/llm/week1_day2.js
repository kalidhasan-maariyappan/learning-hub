// LLM Engineering, Week 1 Day 2: lessons 13-19. Code comes from ai/llm_engineering/week1/day2.ipynb.
// Runnable examples talk to your local Ollama (OpenAI-compatible endpoint); cloud examples are shown, not run.
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

  // ---------------------------------------------------------------- 13
  JT.def('llm_building_blocks', {
    title: 'LLM Engineering Building Blocks: Models, Tools and Techniques',
    h1: 'LLM Engineering <span>Building Blocks</span>',
    body: () => [
      p('Day 1 was the big hands-on day. Day 2 is lighter: we step back and see how the pieces of LLM engineering fit together, then meet the leading models.'),

      h2('What You Already Know'),
      ul([
        'You ran open-source models locally with Ollama.',
        'You called a model from code and learned system prompts vs user prompts.',
        'You built a summarizer — a core Gen AI use case.',
      ]),

      h2('Three Layers of LLM Engineering'),
      p('This course is <b>practical</b>: theory is taught inside projects, with one goal — using LLMs to create commercial value, whether you work at a startup, a large company or on your own idea. Everything you learn sits in one of three layers, each built on the one below:'),
      ol([
        '<b>Models</b> — the LLMs themselves: open-source and closed-source, models that generate images and audio (multi-modal), how models are built, and how to <b>choose the right model</b> for a task.',
        '<b>Tools</b> — frameworks and libraries built around models: Hugging Face, LangChain, Gradio, Weights &amp; Biases and Modal.',
        '<b>Techniques</b> — ways of getting more from models using those tools: calling APIs (you have started), multi-shot prompting, RAG, fine-tuning and agentic AI.',
      ]),
      p('A useful habit: when a new topic appears, ask which layer it belongs to.'),

      h2('Getting the Most Out of the Course'),
      ul([
        '<b>The ideal background</b> is intermediate Python. If a line of Python looks unfamiliar, the <code>guides</code> folder has beginner and intermediate Python guides, and an AI assistant in your editor can explain any line. People with no programming background have finished the course using the guides; if that is you, go slowly, add print statements, and keep moving even if something is unclear at first.',
        '<b>Run the code, then change it.</b> Reading is not enough. Add print statements, change prompts, break things. Typing the code from scratch is fine if that is how you learn.',
        '<b>Do the exercises</b> and keep your solutions in your own GitHub. You can also submit a pull request to share them.',
        '<b>Apply it to something personal.</b> One student built an LLM app that helped a relative track medication refills across pharmacies. A concrete, personal problem teaches more than any example.',
        '<b>Stay the course.</b> Some parts will feel too easy and others too hard. Both are normal — keep going.',
      ]),
      K.remember([
        'Three layers: models, tools, techniques.',
        'Learn by running and changing the code, and by applying it to a real problem of your own.',
        'Intermediate Python is ideal; the guides fill any gaps.',
      ]),
      sources('<p>Transcript: <code>' + T + '13-Day 2 - LLM Engineering Building Blocks- Models, Tools &amp; Techniques.txt</code>. The repository\'s <code>guides</code> folder is referenced for the Python and command-line guides.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 14
  JT.def('llm_eight_week_journey', {
    title: 'Your 8-Week Journey: From Chat Completions API to LLM Engineer',
    h1: 'Your 8-Week Journey: <span>From API to LLM Engineer</span>',
    body: () => [
      p('Let\'s walk through the plan week by week, and what you will build in each.'),

      h2('Week by Week'),
      table(['Week', 'Focus', 'What happens'], [
        ['1', 'Foundations', 'The Chat Completions API — the one you already used.'],
        ['2', 'Frontier models', 'Call many frontier models\' APIs until APIs feel natural; multi-modality, with an impressive project; extra material for experienced readers.'],
        ['3', 'Open-source models', 'Go deep with <b>Hugging Face</b> — how it differs from what you have used so far — and build open-source projects.'],
        ['4', 'Choosing the right LLM', 'How to pick a model for the job; using LLMs to generate or port code.'],
        ['5', 'RAG', 'Build a knowledge-worker expert that reads a large set of documents and answers knowledgeably about them — a major commercial use case.'],
        ['6', 'Fine-tuning, and data', 'A core data-science week: working with data sets, cleaning and curating data, then fine-tuning.'],
        ['7', 'Fine-tune an open-source model', 'Teach an open-source model to do a business task of your own, with a surprising result.'],
        ['8', 'Agentic platform', 'Everything comes together in an agentic platform that solves a commercial problem.'],
      ]),
      p('Two tips:'),
      ul([
        '<b>Do not skip ahead to RAG.</b> Each week builds on the one before; Week 5 makes more sense after Weeks 1-4.',
        'Along the way you collect tools and a "cookbook" of code you can reuse in your own projects.',
      ]),
      note('At the end of the eight weeks, you will be able to say: <b>I am an LLM engineer</b>.'),
      K.remember([
        'Foundations → frontier models → open-source models → model selection → RAG → fine-tuning → fine-tuning open-source → agents.',
        'Each week builds on the previous ones; follow the order.',
      ]),
      sources('<p>Transcript: <code>' + T + '14-Day 2 - Your 8-Week Journey- From Chat Completions API to LLM Engineer.txt</code>.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 15
  JT.def('llm_frontier_models', {
    title: 'Frontier Models: OpenAI GPT, Claude, Gemini and Grok Compared',
    h1: 'Frontier Models: <span>GPT, Claude, Gemini and Grok</span>',
    body: () => [
      p('Before we call different models, let\'s learn who builds them and what the vocabulary means.'),

      h2('What Is a Frontier Model?'),
      p('The strongest LLMs in the world are called <b>frontier models</b>, and the big companies that build them are <b>frontier labs</b>. "Frontier" is informal; there is no strict definition.'),
      p('Usually it means <b>closed-source</b> models: you pay to use them, because training them cost the company hundreds of millions of dollars, and running them is expensive because they are enormous. Open-source models (like Llama) can be downloaded and run by anyone. Some people also call the strongest open models "frontier", so watch the context. In this course, "frontier" means the big closed-source models unless said otherwise.'),
      note('<b>"Open-source" vs "open-weight".</b> People who care about the distinction point out that Meta\'s models are not strictly open-source but <b>open-weight</b>: the trained weights are published, but not necessarily the training data and methods. We still say "open-source" in everyday talk, as the course does.'),

      h2('The Big Four'),
      h3('OpenAI — GPT'),
      p('The most famous lab and model. ChatGPT, launched in late 2022 on GPT-3.5, changed what people thought these models could do. OpenAI also had a separate "o" series of reasoning models (o1, o3, o4-mini); today the GPT and o lines have converged — GPT-5 combines both. We will see more of this later.'),
      h3('Anthropic — Claude'),
      p('Founded by former OpenAI staff and a favorite of many practitioners. Claude comes in three sizes: <b>Haiku</b> (small), <b>Sonnet</b> (medium) and <b>Opus</b> (large). When this course was recorded, Claude 4.5 Sonnet was the most powerful and neck and neck with GPT-5. It is also the model behind the Claude Code coding agent.'),
      h3('Google — Gemini'),
      p('Gemini is the big closed-source sibling of Gemma, the open model you ran in the first lesson. Google started late (remember Bard?) but caught up fully. Smaller Gemini versions are often free or cheap for students.'),
      h3('xAI — Grok'),
      p('Grok (spelled with a K) comes from Elon Musk\'s xAI and is the fourth of the big four.'),
      p('There are other strong models in the next tier: the model behind Perplexity, Cohere (Canada), and Mistral (France), which offers both closed and open models. The course uses the big four, and you do not need all four keys — you can watch them being used. Week 4 teaches you how to choose.'),
      note('Model versions move fast. The names and numbers above date from when this course was recorded; the repository\'s notebooks list newer ones. The ideas — closed vs open, small vs large — stay the same.'),
      K.remember([
        '"Frontier" usually means the big closed-source models from the leading labs.',
        'The big four: OpenAI (GPT), Anthropic (Claude: Haiku/Sonnet/Opus), Google (Gemini), xAI (Grok).',
        'Meta\'s Llama and similar "open-source" models are strictly open-weight: the weights are public, not necessarily the training data.',
      ]),
      sources('<p>Transcript: <code>' + T + '15-Day 2 - Frontier Models- OpenAI GPT, Claude, Gemini &amp; Grok Compared.txt</code>. Product versions mentioned (GPT-5, Claude 4.5 Sonnet, Gemini 2.5 Pro) are the lecture\'s; they have since been replaced.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 16
  JT.def('llm_open_source_models', {
    title: 'Open-Source LLMs: Llama, Mistral, DeepSeek and Ollama',
    h1: 'Open-Source LLMs <span>and Three Ways to Use Models</span>',
    body: () => [
      p('Now the open side: who builds open models, and how can you actually use a model? The second question matters more, because it explains the difference between Ollama, Hugging Face and an API.'),

      h2('The Main Open-Source Models'),
      ul([
        '<b>Llama (Meta)</b> — Meta was one of the first major companies to release its large models openly, and it made open-source AI a stance. Llama is used a lot in this course. <b>Llama 3.2</b> is notable because it comes in small sizes (1 billion and 3 billion parameters) that run easily on a home computer. These are sometimes called "small language models", though 3 billion parameters is still large.',
        '<b>Mistral (France)</b> — has open models, including Mixtral, a <b>mixture of experts</b>: many smaller specialist models inside one, with each request routed to the right specialists.',
        '<b>Qwen (Alibaba Cloud)</b> — remarkably powerful, less famous than Llama, and worth trying.',
        '<b>Gemma (Google)</b> — the open cousin of Gemini, which you used already. Its 270-million-parameter size is a true small language model: not impressive, but it still produces language.',
        '<b>Phi (Microsoft)</b> — a family of models that are especially good with tool calling and commercial work.',
        '<b>DeepSeek</b> — took the world by surprise. It was not stronger than the top closed models; what shocked people was that it reached frontier-level capability at a <b>fraction of the training cost</b> (reported at a few million dollars versus more than a hundred million), and it was open-sourced.',
        '<b>GPT-OSS (OpenAI)</b> — OpenAI\'s open-source GPT, released recently, in two sizes (20 billion and 120 billion parameters). The 20 billion version is the one used in the course.',
      ]),
      note('<b>The "DeepSeek" models in Ollama.</b> The main DeepSeek model has 671 billion parameters — far too big for a home computer. The small "DeepSeek" versions in Ollama are really small <b>Llama and Qwen models</b> trained further with data generated by the big DeepSeek. This technique is called <b>distillation</b>: a big model teaches a small one. In this form, the big model generates training examples and the small model learns from them.'),

      h2('Three Ways to Use an LLM'),
      h3('1. Packaged products'),
      p('A product has a user interface and built-in features such as memory and web search. <b>ChatGPT</b> is a product, not a model: engineers built the interface and the glue around the model. Claude\'s chat app is another.'),
      h3('2. Cloud APIs'),
      p('You call a model running in the cloud from your code. Options include:'),
      ul([
        'Calling a provider directly — as you did with OpenAI.',
        'Managed cloud services that host models for you: <b>Amazon Bedrock</b>, <b>Google Vertex AI</b>, <b>Azure ML</b>.',
        '<b>Groq</b> (spelled with a Q) — runs open-source models very fast on special hardware. It is not the same as xAI\'s Grok (with a K).',
        '<b>OpenRouter</b> — one platform that routes your request to many providers.',
      ]),
      p('Both closed-source and open-source models can be called this way.'),
      h3('3. Direct inference of an open-source model'),
      p('You run the model yourself, on your own computer. <b>Inference</b> is the technical word for running a model: you give it new input and get an output. There are two main ways:'),
      ul([
        '<b>Hugging Face Transformers</b> — the Python library that implements these neural networks. You load the open weights and run the model inside your own Python code. It is flexible and simple to explain.',
        '<b>Ollama</b> — a product that packages a smaller set of models for efficiency: the code is optimized, and the weights are compressed into a special file format (GGUF). It runs on your computer and gives you an <b>API on your own machine</b> — you connect to your computer instead of the cloud.',
      ]),
      p('So Ollama is like Hugging Face, but more efficient, more packaged and focused on fewer models. The next lesson shows that local API in action.'),
      p('Here are the models you have downloaded with Ollama so far, with their sizes on disk — a direct look at "parameters vs file size":'),
      ex('ollama list', { title: 'Example', lang: 'ollama' }),
      K.remember([
        'Open-source families: Llama, Mistral/Mixtral, Qwen, Gemma, Phi, DeepSeek and GPT-OSS.',
        'Distillation: a large model generates data to train a smaller one.',
        'Three ways to use a model: a product (ChatGPT), a cloud API, or running an open-source model yourself (Hugging Face Transformers or Ollama).',
        'Inference means running a model on new input.',
      ]),
      sources('<p>Transcript: <code>' + T + '16-Day 2 - Open-Source LLMs- LLaMA, Mistral, DeepSeek, and Ollama.txt</code>. Dollar figures and model details are the lecture\'s. The lecture describes GPT-OSS as 20 billion and 120 billion; the transcript text lists the sizes imprecisely, and Ollama\'s <code>gpt-oss:20b</code> is the one used in Lesson 1.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 17
  JT.def('llm_http_vs_client', {
    title: 'Chat Completions API: HTTP Endpoints vs the OpenAI Python Client',
    h1: 'Chat Completions API: <span>HTTP Endpoints vs the Client</span>',
    body: () => [
      p('You have called an LLM with the OpenAI library. In this lesson we look <b>under</b> that library, to see what it really does. Understanding this removes a lot of mystery.'),
      note('<b>Running these examples.</b> The notebook calls OpenAI. The examples here send the very same requests to your local Ollama, which accepts the OpenAI format, so you need no key. The OpenAI versions are shown alongside.'),

      h2('The Chat Completions API'),
      p('It is the simplest way to call an LLM, especially a frontier one. The name tells you what happens: you send a <b>chat</b> (the conversation so far) and the model <b>completes</b> it, by predicting the most likely next message. Think of predictive text on a phone. The model is trying to predict the most likely next words (more precisely, tokens, which you will meet soon). Being good at answering questions is a side effect of being good at that.'),
      p('OpenAI invented this style of request, and it became so popular that most providers now offer it. It is the standard way to talk to an LLM.'),

      h2('What Is an Endpoint?'),
      p('An <b>endpoint</b> is just a web address (HTTP URL) that you send an API request to. There is nothing special about it. (If APIs and endpoints are new to you, the "Technical Foundations" guide in the <code>guides</code> folder explains them.) OpenAI\'s endpoint for chat is <code>https://api.openai.com/v1/chat/completions</code>; Ollama\'s on your computer is <code>http://localhost:11434/v1/chat/completions</code>.'),

      h2('Calling the Endpoint by Hand'),
      p('To call an endpoint you send an HTTP <b>POST</b> request with three things: the URL, <b>headers</b> (information about the request) and a <b>payload</b> (the data, here as JSON).'),
      py(`import requests

headers = {"Content-Type": "application/json"}

payload = {
    "model": "llama3.2",
    "messages": [
        {"role": "user", "content": "Tell me a fun fact"}]
}

response = requests.post(
    "http://localhost:11434/v1/chat/completions",
    headers=headers,
    json=payload
)

print(response.json())`, 'Call the endpoint with requests (Ollama)'),
      ul([
        '<code>headers</code> says the content is JSON. For OpenAI, a header <code>Authorization: Bearer &lt;your key&gt;</code> is also added — that is how the provider knows who you are. Ollama needs no key.',
        '<code>payload</code> holds the <code>model</code> and the <code>messages</code> list you already know.',
        '<code>requests.post(url, headers=..., json=...)</code> sends it. A POST like this is like "create a chat completion".',
        '<code>response.json()</code> turns the JSON reply into Python dictionaries and lists.',
      ]),
      p('What comes back is a big dictionary. This is what ours returned:'),
      term('python', `{'id': 'chatcmpl-785', 'object': 'chat.completion', 'created': 1794916941, 'model': 'llama3.2', 'system_fingerprint': 'fp_ollama', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and are still edible! [...]"}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 30, 'prompt_tokens_details': {'cached_tokens': 15}, 'completion_tokens': 66, 'total_tokens': 96}}`, 'Our run (shortened)'),
      p('Find the answer: the field <code>choices</code> is a <b>list</b>; its first item has a <code>message</code>; that message has <code>content</code> — the text. (The other fields — <code>usage</code> and so on — we will meet later.) So to print only the text:'),
      py(`import requests

headers = {"Content-Type": "application/json"}

payload = {
    "model": "llama3.2",
    "messages": [
        {"role": "user", "content": "Tell me a fun fact"}]
}

response = requests.post(
    "http://localhost:11434/v1/chat/completions",
    headers=headers,
    json=payload
)

print(response.json()["choices"][0]["message"]["content"])`, 'Dig out the text'),
      p('That works, but you have to know the JSON layout, write the dictionary keys correctly, and repeat this for every call. There must be a nicer way.'),
      show(`# The same call to OpenAI in the notebook:
headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}

payload = {
    "model": "gpt-6-luna",
    "reasoning_effort": "none",
    "messages": [
        {"role": "user", "content": "Tell me a fun fact"}]
}

response = requests.post(
    "https://api.openai.com/v1/chat/completions",
    headers=headers,
    json=payload
)
response.json()["choices"][0]["message"]["content"]`, 'OpenAI version (needs a valid key)'),

      h2('What Is the OpenAI Package?'),
      p('The <code>openai</code> package is a <b>Python client library</b>: a thin wrapper that builds this HTTP request for you and turns the reply into Python objects, so you write nice Python instead of picking through dictionaries. That is all it is.'),
      p('A common misunderstanding: the OpenAI package does <b>not</b> contain the GPT model, and your code is not "running GPT". It is vanilla, open-source code that makes a web request. The model runs on the other end of the endpoint.'),
      K.remember([
        'Chat Completions: you send a conversation and the model predicts the next message.',
        'An endpoint is an HTTP URL. A call is a POST with headers (including the key) and a JSON payload.',
        'The answer sits at <code>choices[0].message.content</code> in the JSON.',
        'The <code>openai</code> package only wraps this HTTP call; it holds no model.',
      ]),
      sources('<p>Transcript: <code>' + T + '17-Day 2 - Chat Completions API- HTTP Endpoints vs OpenAI Python Client.txt</code>. Code: <code>ai/llm_engineering/week1/day2.ipynb</code> (the <code>requests</code> cells), with the endpoint changed to Ollama\'s so it can run without an OpenAI key. The OpenAI version is shown as in the notebook.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 18
  JT.def('llm_openai_client_providers', {
    title: 'Using the OpenAI Python Client with Multiple LLM Providers',
    h1: 'One Client, <span>Many Providers</span>',
    body: () => [
      p('The last lesson showed the raw HTTP call. Now the nicer way — and a trick that lets one library talk to many different providers.'),

      h2('The Client Library'),
      p('The same call with the library:'),
      py(`from openai import OpenAI

ollama = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

response = ollama.chat.completions.create(model="llama3.2", messages=[{"role": "user", "content": "Tell me a fun fact"}])

print(response.choices[0].message.content)`, 'Chat completion with the client (Ollama)'),
      p('Compare it to the HTTP version:'),
      ul([
        '<code>OpenAI(...)</code> creates the client. For OpenAI itself, <code>OpenAI()</code> with no arguments reads <code>OPENAI_API_KEY</code> from the environment and puts it in the <code>Authorization</code> header for you.',
        '<code>chat.completions.create(...)</code> is the <code>POST</code> to <code>/chat/completions</code> — "create" a completion.',
        'The response is a Python <b>object</b> (not a plain dictionary), so you reach the text with attributes: <code>response.choices[0].message.content</code>. The editor can check the names, so you are not guessing dictionary keys.',
      ]),
      p('Let\'s confirm the response is a real Python object, and see its model and role:'),
      py(`from openai import OpenAI

ollama = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
response = ollama.chat.completions.create(model="llama3.2", messages=[{"role": "user", "content": "Tell me a fun fact"}])

print(type(response))
print(response.choices[0].message.role)
print(response.model)`, 'Look at the response object'),
      term('python', `<class 'openai.types.chat.chat_completion.ChatCompletion'>
assistant
llama3.2`, 'Our run'),
      show(`# The OpenAI version in the notebook
from openai import OpenAI
openai = OpenAI()

response = openai.chat.completions.create(model="gpt-6-luna", reasoning_effort="none", messages=[{"role": "user", "content": "Tell me a fun fact"}])

response.choices[0].message.content`, 'OpenAI version (needs a valid key)'),

      h2('Why One Library Works for Many Providers'),
      p('OpenAI\'s Chat Completions API became so popular that the other providers built endpoints <b>identical</b> to it, called <b>OpenAI-compatible endpoints</b>. Google did (its address contains "openai"), and even Anthropic, which held out the longest, eventually did too.'),
      p('OpenAI then did something generous: the client library lets you change the <b>base URL</b> and the <b>API key</b>. So with the same library you can talk to a completely different provider:'),
      show(`GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/"

gemini = OpenAI(base_url=GEMINI_BASE_URL, api_key=google_api_key)

response = gemini.chat.completions.create(model="gemini-3.1-flash-lite", messages=[{"role": "user", "content": "Tell me a fun fact"}])

response.choices[0].message.content`, 'Gemini through the OpenAI client (shown only)'),
      p('The only differences from the OpenAI version are the <b>base URL</b>, the <b>key</b>, and the <b>model name</b> (a Gemini model, since a GPT name would not exist there). Despite "OpenAI" in the code, nothing here uses an OpenAI model: it is only a lightweight library making a web request.'),
      note('This example needs a Google API key (<code>GOOGLE_API_KEY</code> in <code>.env</code>), which most students will not have, so it is shown rather than run. Guide 9 in the <code>guides</code> folder explains how to get one. Skip it if you do not use Gemini.'),
      p('You already used this trick: in Lessons 10-12, pointing the client at <code>http://localhost:11434/v1</code> is exactly this idea, aimed at your own computer.'),
      K.remember([
        'The client library wraps the HTTP call and returns Python objects.',
        'Many providers offer OpenAI-compatible endpoints, so one client library works with them.',
        'To switch provider, change three things: <code>base_url</code>, <code>api_key</code> and the model name.',
      ]),
      sources('<p>Transcript: <code>' + T + '18-Day 2 - Using the OpenAI Python Client with Multiple LLM Providers.txt</code>. Code: <code>ai/llm_engineering/week1/day2.ipynb</code> (client and Gemini cells). The runnable example uses Ollama instead of OpenAI.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 19
  JT.def('llm_ollama_endpoints', {
    title: 'Running Ollama Locally with OpenAI-Compatible Endpoints',
    h1: 'Ollama as an <span>OpenAI-Compatible Endpoint</span>',
    body: () => [
      p('Ollama also offers an OpenAI-compatible endpoint, on <b>your own computer</b>. That lets you use the same code with a model that costs nothing and never leaves your machine.'),

      h2('Is Ollama Running?'),
      p('Ollama serves its API at <code>http://localhost:11434</code>. A plain web request to that address answers with a message:'),
      py(`import requests

print(requests.get("http://localhost:11434").content)`, 'Check that Ollama is running'),
      term('python', "b'Ollama is running'", 'Our run'),
      p('If you do not get that, install Ollama, or run <code>ollama serve</code> in a terminal (an "address already in use" error means it is already running).'),

      h2('Download a Model'),
      p('Models must be on your computer before you can call them. The notebook downloads Llama 3.2 with:'),
      K.show('ollama pull llama3.2', 'Terminal', 'text'),
      p('<code>ollama pull</code> downloads a model without starting a chat. If you already ran <code>ollama run llama3.2</code> earlier, it is already there and this finishes at once. For a smaller computer, use <code>llama3.2:1b</code>. Avoid <code>llama3.3</code> and <code>llama4</code>: they are too big for a home computer.'),

      h2('Call It with the Same Client'),
      p('Ollama\'s base URL is <code>http://localhost:11434/v1</code>. The <code>/v1</code> mirrors OpenAI\'s <code>/v1/chat/completions</code>. The API key can be any word — Ollama ignores it, but the library requires one.'),
      py(`from openai import OpenAI

OLLAMA_BASE_URL = "http://localhost:11434/v1"

ollama = OpenAI(base_url=OLLAMA_BASE_URL, api_key='ollama')

# Get a fun fact

response = ollama.chat.completions.create(model="llama3.2", messages=[{"role": "user", "content": "Tell me a fun fact"}])

print(response.choices[0].message.content)`, 'Ollama through the OpenAI client'),
      p('The <code>model</code> is the name of the model you pulled. The rest is identical to the calls you made to OpenAI and Gemini. The fun fact came from your computer:'),
      term('python', `Here's a fun fact:

Did you know that there is a species of jellyfish that is immortal?! The Turritopsis dohrnii, also known as the "immortal jellyfish," is a type of jellyfish that can transform its body into a younger state [...]`, 'Our run (shortened)'),

      h3('Benefits and trade-offs'),
      ul([
        '<b>No API charges</b> — it is free.',
        '<b>Privacy</b> — the data never leaves your computer. You could unplug from the internet and it would still work.',
        '<b>Less power</b> — a local model is far smaller than a frontier model (by one estimate, Llama is roughly a thousand times smaller), which shows in how well it handles hard tasks.',
      ]),

      h2('Try DeepSeek, Distilled'),
      p('Remember the small "DeepSeek" in Ollama? It is a Qwen model taught by the big DeepSeek. Download it, then call it by changing only the model name:'),
      K.show('ollama pull deepseek-r1:1.5b', 'Terminal', 'text'),
      py(`from openai import OpenAI

ollama = OpenAI(base_url="http://localhost:11434/v1", api_key='ollama')

response = ollama.chat.completions.create(model="deepseek-r1:1.5b", messages=[{"role": "user", "content": "Tell me a fun fact"}])

print(response.choices[0].message.content)`, 'DeepSeek R1 1.5B through Ollama'),
      p('The name has a tag, <code>1.5b</code>: 1.5 billion parameters, half the size of Llama 3.2 3B. Expect a less impressive answer — the point is that you can pull and compare any open model this way.'),
      term('python', `Sure! Here's a fun fact for you:

**"The Eiffel Tower was designed with a famous "three-armed" symbol, a triangle, to represent the principles of democracy, democracy, and democracy."** The tower was built on three occasions, and each time, it was a different color. [...]`, 'Our run (shortened)'),
      note('<b>Read that answer critically.</b> It is confident, and it is wrong: that is not a real fact about the Eiffel Tower. A very small model invents things easily, which is what "less capable" means in practice. Always check what an LLM tells you.'),
      p('So you can pull and compare any open model this way.'),
      tryit('Change <code>deepseek-r1:1.5b</code> to <code>gemma3:270m</code> or <code>phi3</code>, and change the question. Run the same question on three models and compare the answers.'),

      h2('Assignment'),
      p('Take the Day 1 website summarizer and make it use an Ollama model instead of OpenAI. You did exactly this in the lab lessons: the only changes were the client\'s <code>base_url</code> and <code>api_key</code>, and the model name. A variation to try: change the system prompt so that the summary is in another language or has a different tone, then compare it with a different model. The repository has a solution in <code>week1/solutions</code> (<code>day1_with_ollama.ipynb</code>) — try it yourself first. Consider sharing your version in <code>community-contributions</code>.'),
      K.remember([
        'Ollama gives an OpenAI-compatible API at <code>http://localhost:11434/v1</code>; the key is ignored.',
        'Switch models by changing only <code>model=</code> — after <code>ollama pull</code>.',
        'Local models: free and private, but much less powerful than frontier models.',
      ]),
      sources('<p>Transcript: <code>' + T + '19-Day 2 - Running Ollama Locally with OpenAI-Compatible Endpoints.txt</code>. Code: <code>ai/llm_engineering/week1/day2.ipynb</code> (Ollama cells and the homework description); solution folder: <code>week1/solutions/day1_with_ollama.ipynb</code>. Day 2 recap: you are 5% along the course.</p>'),
    ].join(''),
  });
})();
