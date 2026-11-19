// LLM Engineering, Week 1 Day 1 (lab): lessons 10-12. Code comes from ai/llm_engineering/week1/day1.ipynb.
// Runnable examples use the course's documented free alternative: the OpenAI client pointed at local Ollama
// (see ai/llm_engineering/week1/solutions/day1_with_ollama.ipynb). Outputs were produced on this machine.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, h3, ul, ol, ex } = JT.h;
  const K = JT.kit;
  const term = (code, result, title, label) => K.rails(code, { title: title || 'Terminal', lang: 'text', result, label: label || 'Output' });
  const py = (code, title) => ex(code, { title: title || 'Example', lang: 'python' });
  const show = (code, title) => K.show(code, title, 'python');
  const note = (html) => '<div class="note"><p>' + html + '</p></div>';
  const tryit = (html) => '<div class="note"><p><strong>Try it yourself:</strong> ' + html + '</p></div>';
  const sources = (html) => '<details class="qa"><summary>Sources for this lesson</summary><div>' + html + '</div></details>';
  const T = 'ai/transcript/01-Week 1 - Build Your First LLM Product- Exploring Top Models/';

  // Shown in every lab lesson: how this page's runnable code differs from the notebook.
  const swapBox = () => note('<b>OpenAI or Ollama?</b> The notebook creates the client with <code>OpenAI()</code>, which reads <code>OPENAI_API_KEY</code> from <code>.env</code> and calls a cloud model. The examples on this page create it with <code>OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")</code> and use the model <code>llama3.2</code>, so they run on your own Ollama with no key and no cost. This is the free alternative the course provides; everything else is the same code. To use OpenAI instead, put the notebook\'s two lines back (shown in the first lab lesson).');

  // ---------------------------------------------------------------- 10
  JT.def('llm_first_api_call', {
    title: 'Your First API Call and System vs User Prompts',
    h1: 'Your First API Call: <span>System vs User Prompts</span>',
    body: () => [
      p('Time for the first lab. We will send a message to an LLM <b>from code</b>, and then learn the two kinds of prompt every LLM application uses.'),
      swapBox(),

      h2('Running a Cell'),
      p('Open <code>week1/day1.ipynb</code>. To run a cell, click inside it and press <b>Shift + Enter</b>. A tick appears when it finishes. If a cell throws an import error or hangs, the kernel is wrong: the top right must show your <code>.venv</code> (Python 3.12.x).'),
      p('Run the imports cell and the key-check cell from the previous lessons. Imports print nothing, which is normal.'),

      h2('The Message Format'),
      p('An LLM API does not take a plain string. It takes a <b>list of messages</b>, and each message is a dictionary with two keys: <code>role</code> (who is speaking) and <code>content</code> (what they say). Let\'s build the smallest possible example:'),
      py(`message = "Hello, Llama! This is my first ever message to you! Hi!"

messages = [{"role": "user", "content": message}]

print(messages)`, 'Build the messages list'),
      p('Line by line:'),
      ul([
        '<code>message</code> — an ordinary Python string.',
        '<code>messages</code> — a <b>list</b> that contains one <b>dictionary</b>. Its <code>role</code> is <code>"user"</code>, meaning this text comes from the person talking to the model, and its <code>content</code> is our text.',
        '<code>print(messages)</code> — shows the structure.',
      ]),
      p('Output:'),
      term('python', `[{'role': 'user', 'content': 'Hello, Llama! This is my first ever message to you! Hi!'}]`, 'Output'),
      p('Why a list? Because a conversation has many turns. Soon we will put more than one message in it.'),

      h2('Making the API Call'),
      p('Now we send it to a model. Three steps: create a client, call the <b>Chat Completions</b> API, read the answer.'),
      py(`from openai import OpenAI

message = "Hello, Llama! This is my first ever message to you! Hi!"
messages = [{"role": "user", "content": message}]

openai = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

response = openai.chat.completions.create(model="llama3.2", messages=messages)
print(response.choices[0].message.content)`, 'First API call (Ollama)'),
      p('What each part does:'),
      ul([
        '<code>OpenAI(...)</code> creates a <b>client</b>: an object that knows where to send requests. <code>base_url</code> points it at Ollama running on your computer (port 11434, the address you saw in the <code>ollama serve</code> error); <code>api_key</code> is required by the library but ignored by Ollama.',
        '<code>openai.chat.completions.create(...)</code> is the Chat Completions API call. You will type it so often that you will know it by heart. <code>model</code> chooses the model, and <code>messages</code> is our list.',
        '<code>response.choices[0].message.content</code> digs the answer out of the response object: <code>choices</code> is a list of possible replies, we take the first one, then its <code>message</code>, then the text in <code>content</code>.',
      ]),
      p('Here is what the model said on our machine (yours will differ — the model writes new text every time, and the first call may take a while because the model has to load):'),
      term('python', `Hello! Welcome! I'm excited to be your first chat with me! I'm a large language model, and I'm here to help answer any questions, provide information, or just have a conversation with you. How's your day going so far? Is there something specific you'd like to talk about, or do you want to get to know me better?`, 'Our run'),
      p('That was a call to an LLM from code. In the notebook, the same call goes to a model in the cloud:'),
      show(`openai = OpenAI()

response = openai.chat.completions.create(model="gpt-6-luna", reasoning_effort="none", messages=messages)
response.choices[0].message.content`, 'Notebook version (OpenAI, needs a valid key)'),
      note('<b>Model names change.</b> AI companies retire models every few months, so the notebook may name a newer model than earlier versions of this lab (which used <code>gpt-5-nano</code>, a very cheap version of GPT-5). If a model stops working, choose a similar one from that company\'s current list.'),

      h2('Fetching a Web Page'),
      p('Our project will summarize web pages, so we need the page text first. The course provides a helper for that: <code>fetch_website_contents</code> in <code>week1/scraper.py</code>. It downloads a page with the <b>Beautiful Soup</b> library and returns its title and text, cut at 2,000 characters. It is a simple "server-side" fetch, with no AI involved yet.'),
      py(`from scraper import fetch_website_contents

ed = fetch_website_contents("https://edwarddonner.com")
print(ed)`, 'Fetch a web page'),
      p('The beginning of what came back on our run (the page changes over time, so yours will differ):'),
      term('python', `Home - Edward Donner

Skip to content
Avatar
Curriculum
Proficiency
C4
Outsmart
An arena that pits LLMs against each other in a battle of diplomacy and deviousness
About
Posts
Well, hi there.
I'm Ed. I like writing code and experimenting with LLMs, [...]`, 'Our run (shortened)'),
      p('Notice how much of it is navigation text (<code>About</code>, <code>Posts</code>, ...). The model will have to ignore that.'),

      h2('System Prompt and User Prompt'),
      p('LLMs are trained to receive instructions in a particular shape: two kinds of prompt.'),
      ul([
        '<b>System prompt</b> — sets the scene. It tells the model what task it is doing, what tone to use, and can supply background information (later in the course you will use it to give the model extra knowledge).',
        '<b>User prompt</b> — the message the model has to answer, in the context the system prompt created.',
      ]),
      p('In the API, they are two dictionaries in the same list, with roles <code>"system"</code> and <code>"user"</code>:'),
      show(`[
    {"role": "system", "content": "system message goes here"},
    {"role": "user", "content": "user message goes here"}
]`, 'The shape'),
      p('Let\'s see the system prompt change a model\'s behavior. The user question stays the same — only the system message changes:'),
      py(`from openai import OpenAI

openai = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

messages = [
    {"role": "system", "content": "You are a snarky assistant"},
    {"role": "user", "content": "What is 2 + 2?"}
]

response = openai.chat.completions.create(model="llama3.2", messages=messages)
print(response.choices[0].message.content)`, 'System prompt: snarky'),
      term('python', `*sigh* Oh, really? You need me to tell you that the answer to 2 + 2 is 4? That's not exactly rocket science, is it? But hey, I'll indulge you. The answer is indeed 4. Can I go back to pretending I'm a sophisticated AI assistant now?`, 'Our run'),
      p('With "You are a helpful assistant" instead, the same question gave us just <code>2 + 2 = 4</code>. Same question, same model, different answer — because the system prompt changed the model\'s character.'),
      tryit('Press <b>Try it Yourself</b> and rewrite the system message. Make the assistant speak like a pirate or a cowboy, or answer in another language. Run it a few times and watch how the tone changes while the question stays the same. For example, with <code>"You are a pirate. Answer in pirate speak."</code> our model replied: <i>"Yer lookin\' fer a treasure o\' math, eh? ... it be... 4!"</i>'),
      K.remember([
        'An LLM API takes a list of messages; each is a dictionary with <code>role</code> and <code>content</code>.',
        'Three steps for every call: create the client, call <code>chat.completions.create(model=..., messages=...)</code>, read <code>response.choices[0].message.content</code>.',
        'The system prompt sets the task and tone; the user prompt is what to respond to. Changing only the system prompt changes the behavior.',
        'Model names change over time; pick a similar current model if one is retired.',
      ]),
      sources('<p>Transcript: <code>' + T + '10-Day 1 - Running Your First OpenAI API Call and System vs User Prompts.txt</code>. Code: <code>ai/llm_engineering/week1/day1.ipynb</code> (cells for the first message, the scraper and the "What is 2 + 2?" example) and <code>week1/scraper.py</code>; the Ollama client lines are from <code>week1/solutions/day1_with_ollama.ipynb</code>. The pirate prompt is the lecture\'s own suggestion for a variation.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 11
  JT.def('llm_website_summarizer', {
    title: 'Building a Website Summarizer with the Chat Completions API',
    h1: 'Build a <span>Website Summarizer</span>',
    body: () => [
      p('Now we combine everything into a small product: give it a URL, and it returns a summary of the page. It is a Reader\'s Digest of the internet.'),
      swapBox(),

      h2('The Plan'),
      ol([
        'Fetch the page text with <code>fetch_website_contents</code>.',
        'Wrap it in a system prompt and a user prompt.',
        'Send the messages to the model.',
        'Show the answer.',
      ]),

      h2('Step 1: Write the Two Prompts'),
      p('The system prompt describes the model\'s job and the style of its answer. The user prompt is the instruction that goes in front of the page text:'),
      show(`system_prompt = """
You are a snarky assistant that analyzes the contents of a website,
and provides a short, snarky, humorous summary, ignoring text that might be navigation related.
Respond in markdown. Do not wrap the markdown in a code block - respond just with the markdown.
"""

user_prompt_prefix = """
Here are the contents of a website.
Provide a short summary of this website.
If it includes news or announcements, then summarize these too.

"""`, 'Prompts'),
      ul([
        '"ignoring text that might be navigation related" tells the model to skip the menu items we saw in the scraped page.',
        '"Respond in markdown" asks for formatted text, which we will display nicely later.',
        '"Do not wrap the markdown in a code block" is a small trick: without it, models sometimes put the whole answer inside a code fence, which displays badly.',
      ]),
      p('A system prompt is something you tune by experiment. Earlier versions of this lab used a plain assistant prompt before switching to "snarky"; the notebook uses the snarky version.'),

      h2('Step 2: A Function That Builds the Messages'),
      p('We will build the same two-dictionary list for every website, so we write a function once:'),
      show(`def messages_for(website):
    return [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt_prefix + website}
    ]`, 'messages_for'),
      p('It takes the page text and returns exactly the list the API expects: the system prompt, then the user prompt followed by the page. The blank line at the end of the prefix keeps the page text separate from the instruction. To see what the model will receive, we can print the messages for a tiny page:'),
      py(`from scraper import fetch_website_contents

system_prompt = """
You are a snarky assistant that analyzes the contents of a website,
and provides a short, snarky, humorous summary, ignoring text that might be navigation related.
Respond in markdown. Do not wrap the markdown in a code block - respond just with the markdown.
"""

user_prompt_prefix = """
Here are the contents of a website.
Provide a short summary of this website.
If it includes news or announcements, then summarize these too.

"""

def messages_for(website):
    return [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt_prefix + website}
    ]

ed = fetch_website_contents("https://example.com")
for message in messages_for(ed):
    print(message["role"].upper() + ":")
    print(message["content"])
    print()`, 'Look at the messages'),
      term('python', `SYSTEM:

You are a snarky assistant that analyzes the contents of a website,
and provides a short, snarky, humorous summary, ignoring text that might be navigation related.
Respond in markdown. Do not wrap the markdown in a code block - respond just with the markdown.


USER:

Here are the contents of a website.
Provide a short summary of this website.
If it includes news or announcements, then summarize these too.

Example Domain

This domain is for use in documentation examples without needing permission. This is not a service; avoid relying on it for testing and monitoring purposes.`, 'Output'),
      p('(The notebook uses a loop-free version, <code>messages_for(ed)</code>, which prints the raw list. The loop here only makes it easier to read.)'),

      h2('Step 3: Bring It Together'),
      p('Now the whole pipeline in one function, <code>summarize</code>:'),
      show(`def summarize(url):
    website = fetch_website_contents(url)
    response = openai.chat.completions.create(
        model="llama3.2",
        messages=messages_for(website)
    )
    return response.choices[0].message.content`, 'summarize'),
      ul([
        '<code>fetch_website_contents(url)</code> gets the page text.',
        '<code>messages_for(website)</code> builds the messages.',
        '<code>chat.completions.create(...)</code> is the call from the last lesson; the messages now come from our function.',
        'The function returns the text of the answer.',
      ]),
      p('Calling <code>summarize("https://...")</code> returns a plain string, which prints on one long line. So we add a function that shows it as formatted Markdown:'),
      show(`def display_summary(url):
    summary = summarize(url)
    display(Markdown(summary))`, 'display_summary'),
      p('In a notebook, <code>display(Markdown(...))</code> renders headings and bullets. On this page it prints the Markdown text.'),

      h2('Run It'),
      py(`from scraper import fetch_website_contents
from IPython.display import Markdown, display
from openai import OpenAI

openai = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

system_prompt = """
You are a snarky assistant that analyzes the contents of a website,
and provides a short, snarky, humorous summary, ignoring text that might be navigation related.
Respond in markdown. Do not wrap the markdown in a code block - respond just with the markdown.
"""

user_prompt_prefix = """
Here are the contents of a website.
Provide a short summary of this website.
If it includes news or announcements, then summarize these too.

"""

def messages_for(website):
    return [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt_prefix + website}
    ]

def summarize(url):
    website = fetch_website_contents(url)
    response = openai.chat.completions.create(
        model="llama3.2",
        messages=messages_for(website)
    )
    return response.choices[0].message.content

def display_summary(url):
    summary = summarize(url)
    display(Markdown(summary))

display_summary("https://edwarddonner.com")`, 'The complete summarizer'),
      p('What happens when you run it: the page is downloaded, wrapped into two messages, sent to the model, and the answer is printed. A local model takes tens of seconds. This is what ours produced:'),
      term('python', `**A website that's part AI enthusiast, part entrepreneur**

Meet Ed, a CTO of AI startup Nebula.io, who's passionate about Large Language Models (LLMs) and loves to share his knowledge. The site features Ed's personal story, his work in the AI industry, and various courses and resources on AI-related topics. There's also a "C4 Arena" where LLMs battle each other, [...]`, 'Our run (shortened)'),
      p('Your output will differ — both because the website changes and because the model writes new text every time.'),

      h2('Change the Behavior, Not the Code'),
      p('The only thing that makes this summarizer "snarky" is one sentence in the system prompt. Edit it, run again, and the same code produces a different product.'),
      tryit('In the editor above, delete the word <b>snarky</b> and the phrase <b>, humorous</b> from the system prompt, then run it. We did that, and the same page produced a plain summary with headings:<br><i>"# Summary of the Website … # News/Announcements …"</i><br>Then try other sites: <code>"https://cnn.com"</code> (ours returned a snarky tour of the news sections) or <code>"https://anthropic.com"</code>.'),
      note('<b>Limits.</b> This is a simple scraper: it only works for pages whose content is in the downloaded HTML. Pages that build themselves with JavaScript (React apps) show little text, and sites that block scrapers may return a 403 error. A browser-automation tool such as Selenium or Playwright fixes this — see the <code>week1/community-contributions</code> folder for versions students have built.'),

      h2('Where This Applies'),
      p('Summarization is one of the most important and simplest Gen AI use cases, and you now know how to build it. The same code, with a different system prompt, can translate a page, extract key facts, or rewrite it for a different audience. Students have extended this project in the <code>community-contributions</code> folder — for example, summarizing stock movements from a finance API. Take it to a problem of your own.'),
      K.remember([
        'A prompt-driven app is: get data, build messages, call the API, show the result.',
        '<code>messages_for</code> builds the messages once, so every website goes through the same prompts.',
        'The system prompt decides the style: change the prompt to change the product.',
        'Scraping with <code>requests</code> and Beautiful Soup only sees HTML delivered by the server.',
      ]),
      sources('<p>Transcript: <code>' + T + '11-Day 1 - Building a Website Summarizer with OpenAI Chat Completions API.txt</code>. Code: <code>ai/llm_engineering/week1/day1.ipynb</code> (prompts, <code>messages_for</code>, <code>summarize</code>, <code>display_summary</code>) and <code>week1/scraper.py</code>. The notebook\'s model is a cloud model; this page uses <code>llama3.2</code> through Ollama. Websites and model output change over time.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 12
  JT.def('llm_first_exercise', {
    title: 'Hands-On Exercise: Your First API Call from Scratch',
    h1: 'Exercise: <span>Your First API Call from Scratch</span>',
    body: () => [
      p('Now it is your turn. You will write your own call to an LLM for a task you choose, using only what you have learned.'),
      swapBox(),

      h2('The Task'),
      p('Pick a different business task from website summarization. A good one is still about text: summarize an email, or read an email and suggest a subject line for it. Then:'),
      ol([
        'Write a <b>system prompt</b> that describes the task.',
        'Write a <b>user prompt</b> that holds the content (for example, the email).',
        'Build the <code>messages</code> list — two dictionaries with <code>role</code> and <code>content</code>.',
        'Call <code>chat.completions.create(model=..., messages=...)</code>.',
        'Print <code>response.choices[0].message.content</code>.',
      ]),
      p('This is the starter from the notebook. Fill in the steps yourself first, and look back at the previous lessons when you get stuck:'),
      show(`# Step 1: Create your prompts

system_prompt = "something here"
user_prompt = """
    Lots of text
    Can be pasted here
"""

# Step 2: Make the messages list

messages = [] # fill this in

# Step 3: Call OpenAI
# response =

# Step 4: print the result
# print(`, 'week1/day1.ipynb — exercise starter'),
      p('Using an AI assistant to help is fine. Do try it without first — it is the best practice.'),

      h2('One Possible Solution'),
      p('Here is one way to complete it, for the "suggest an email subject" idea. This is an example solution written for this lesson, not code from the course; yours can be completely different.'),
      py(`from openai import OpenAI

openai = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

# Step 1: Create your prompts
system_prompt = "You write short, clear email subject lines. Reply with the subject line only."
user_prompt = """
Hi team, the quarterly planning meeting has moved from Tuesday to Thursday at 3pm.
Please update your calendars and bring your project status updates.
"""

# Step 2: Make the messages list
messages = [
    {"role": "system", "content": system_prompt},
    {"role": "user", "content": user_prompt},
]

# Step 3: Call the model
response = openai.chat.completions.create(model="llama3.2", messages=messages)

# Step 4: Print the result
print(response.choices[0].message.content)`, 'Solution example (runs on Ollama)'),
      p('The system prompt gives the task and a strict output rule ("subject line only"). The user prompt carries the email. The rest is the same four steps you used before.'),
      tryit('Replace the email with a different one, or change the system prompt to ask for three alternatives. Run it several times — the subject line will vary.'),

      h2('Optional Extra: Better Scraping'),
      p('For people who already know browser automation: the scraper in this lab is simple. Try rewriting <code>scraper.py</code> (or a new module) with <b>Selenium</b> or <b>Playwright</b>, which render a page in a real browser, so JavaScript-built sites also work. Other students\' versions are in <code>week1/community-contributions</code>. If you share your work, the <code>guides</code> folder (git and GitHub guide) explains how to submit a pull request.'),

      h2('Where You Are'),
      p('You have finished the biggest day of the course. You can now:'),
      ul([
        'Run open-source models locally with Ollama.',
        'Call a model from code with the Chat Completions API.',
        'Tell the system prompt from the user prompt.',
        'Build a summarizer and adapt it to a business task.',
      ]),
      p('Next comes a calmer day: the steps to becoming an LLM engineer, the leading frontier models, and a repeat of this lab with Ollama.'),
      K.remember([
        'Every LLM call you write follows the same four steps: prompts, messages, call, print.',
        'If you cannot finish the exercise today, do not worry — you will repeat this pattern many times in the coming weeks.',
      ]),
      sources('<p>Transcript: <code>' + T + '12-Day 1 - Hands-On Exercise- Building Your First OpenAI API Call from Scratch.txt</code>. Code: the exercise starter is the last code cell of <code>ai/llm_engineering/week1/day1.ipynb</code>. The solution shown is an illustration written for this lesson.</p>'),
    ].join(''),
  });
})();
