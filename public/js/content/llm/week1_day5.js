// LLM Engineering, Week 1 Day 5: lessons 33-37 (sales brochure generator). Code: ai/llm_engineering/week1/day5.ipynb,
// "week1 EXERCISE.ipynb" and solutions/week1 SOLUTION.ipynb. Runnable code uses local Ollama (llama3.2) instead of OpenAI.
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
  const swapBox = () => note('<b>OpenAI or Ollama?</b> The notebook uses <code>OpenAI()</code> and a cloud model. The runnable code on this page uses the same code with <code>OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")</code> and <code>llama3.2</code>, so it runs on your computer with no key. A local model is slower and less capable, so expect <b>waits of up to a few minutes</b> and weaker results than a frontier model gives.');

  // Code blocks shared by the lessons (each runnable example repeats what it needs, as the notebook cells run top to bottom).
  const IMPORTS = `import json
from scraper import fetch_website_links, fetch_website_contents
from openai import OpenAI

MODEL = "llama3.2"
openai = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
`;
  const LINK_PROMPTS = `link_system_prompt = """
You are provided with a list of links found on a webpage.
You are able to decide which of the links would be most relevant to include in a brochure about the company,
such as links to an About page, or a Company page, or Careers/Jobs pages.
You should respond in JSON as in this example:

{
    "links": [
        {"type": "about page", "url": "https://full.url/goes/here/about"},
        {"type": "careers page", "url": "https://another.full.url/careers"}
    ]
}
"""

def get_links_user_prompt(url):
    user_prompt = f"""
Here is the list of links on the website {url} -
Please decide which of these are relevant web links for a brochure about the company,
respond with the full https URL in JSON format.
Do not include Terms of Service, Privacy, email links.

Links (some might be relative links):

"""
    links = fetch_website_links(url)
    user_prompt += "\\n".join(links)
    return user_prompt
`;
  const SELECT = `def select_relevant_links(url):
    print(f"Selecting relevant links for {url} by calling {MODEL}")
    response = openai.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": link_system_prompt},
            {"role": "user", "content": get_links_user_prompt(url)}
        ],
        response_format={"type": "json_object"}
    )
    result = response.choices[0].message.content
    links = json.loads(result)
    print(f"Found {len(links['links'])} relevant links")
    return links
`;
  const FETCHALL = `def fetch_page_and_all_relevant_links(url):
    contents = fetch_website_contents(url)
    relevant_links = select_relevant_links(url)
    result = f"## Landing Page:\\n\\n{contents}\\n## Relevant Links:\\n"
    for link in relevant_links['links']:
        result += f"\\n\\n### Link: {link['type']}\\n"
        result += fetch_website_contents(link["url"])
    return result
`;
  const BROCHURE_PROMPTS = `brochure_system_prompt = """
You are an assistant that analyzes the contents of several relevant pages from a company website
and creates a short brochure about the company for prospective customers, investors and recruits.
Respond in markdown without code blocks.
Include details of company culture, customers and careers/jobs if you have the information.
"""

def get_brochure_user_prompt(company_name, url):
    user_prompt = f"""
You are looking at a company called: {company_name}
Here are the contents of its landing page and other relevant pages;
use this information to build a short brochure of the company in markdown without code blocks.\\n\\n
"""
    user_prompt += fetch_page_and_all_relevant_links(url)
    user_prompt = user_prompt[:5_000] # Truncate if more than 5,000 characters
    return user_prompt
`;
  const CREATE = `def create_brochure(company_name, url):
    response = openai.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": brochure_system_prompt},
            {"role": "user", "content": get_brochure_user_prompt(company_name, url)}
        ],
    )
    result = response.choices[0].message.content
    print(result)
`;
  const STREAM = `def stream_brochure(company_name, url):
    stream = openai.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": brochure_system_prompt},
            {"role": "user", "content": get_brochure_user_prompt(company_name, url)}
          ],
        stream=True
    )
    for chunk in stream:
        print(chunk.choices[0].delta.content or "", end="", flush=True)
    print()
`;

  // ---------------------------------------------------------------- 33
  JT.def('llm_brochure_intro', {
    title: 'Building a Sales Brochure Generator: The Challenge',
    h1: 'Build a Sales Brochure Generator: <span>The Challenge</span>',
    body: () => [
      p('Day 5 is hands-on. We take the summarizer from Day 1 and grow it into a commercial product that makes <b>several</b> LLM calls. By the end of the week you will be confident with the Chat Completions API, and you will have used <b>one-shot prompting</b>, <b>streaming</b>, <b>markdown</b> and <b>JSON</b> responses.'),
      swapBox(),

      h2('The Business Challenge'),
      p('Build a product that creates a <b>sales brochure</b> for a company, for prospective clients, investors and recruits. The input is a company name and its main website.'),
      p('It sounds like Day 1\'s summarizer, but it needs more:'),
      ol([
        'Fetch the main page.',
        'Find the links on that page and decide which ones matter for a brochure (an About page, careers, and so on).',
        'Fetch those pages too.',
        'Use everything together to write the brochure.',
      ]),
      p('That is <b>two LLM calls</b>: the first selects the links, and its result feeds the second, which writes the brochure. Chaining calls like this is how you get more commercial value out of models.'),

      h2('"Couldn\'t I Just Ask ChatGPT?"'),
      p('Yes — and it would probably do well. But ChatGPT is a <b>product</b> built on GPT by engineers, and here we act as the engineers building a focused product with our own business logic. Think of Duolingo: its chat feature may call a GPT model behind the scenes, and anyone could in principle recreate it with prompts. People still pay for the convenience of carefully crafted prompts, data and design. A product that wraps a model can still have real commercial value. (This is sometimes called a "GPT wrapper".) Over the coming weeks the course adds more and more of your own logic, which moves you far beyond a simple wrapper.'),

      h2('Step 1: Get the Links'),
      p('The helper <code>fetch_website_links</code> in <code>week1/scraper.py</code> downloads a page and returns every link on it. It is plain parsing with Beautiful Soup — nothing to do with AI. (It downloads the page twice if you also call <code>fetch_website_contents</code>; the code is kept simple on purpose, because this is not a scraping course.)'),
      py(`from scraper import fetch_website_links

links = fetch_website_links("https://edwarddonner.com")
print(len(links), "links found")
for link in links:
    print(link)`, 'Fetch the links of a page'),
      p('The beginning of what came back (the page changes over time):'),
      term('python', `33 links found
#wp--skip-link--target
https://edwarddonner.com/avatar/
https://edwarddonner.com/curriculum/
https://edwarddonner.com/proficient/
https://edwarddonner.com/connect-four/
https://edwarddonner.com/outsmart/
https://edwarddonner.com/about-me-and-about-nebula/
https://edwarddonner.com/posts/
https://edwarddonner.com/
https://news.ycombinator.com
[...]
mailto:hello@mygroovydomain.com
https://www.linkedin.com/in/eddonner/`, 'Our run (shortened)'),
      p('There are two problems with this list:'),
      ul([
        'Many links are <b>not relevant</b> to a brochure — for example the link to Hacker News — while others, like a LinkedIn page, may be relevant even though they leave the site. Deciding that needs <b>understanding</b> of what the link represents.',
        'Some links may be <b>relative</b> (like <code>/about</code>) instead of full URLs. Fixing those is doable in code, but trickier than you might think.',
      ]),
      p('Writing code to judge relevance would be very hard. Four years ago this was simply not possible. Now it is a small call to an LLM. This ability — to parse information, interpret it in an almost human way, and reconstruct it — is new and powerful. You can use the same technique to parse résumés, restaurant reviews and much more.'),
      K.remember([
        'The brochure generator uses two chained LLM calls: one to select links, one to write the brochure.',
        'A product built on a model can still have business value: prompts, data and logic make it useful.',
        'LLMs can do the nuanced "is this link relevant?" judgment that is very hard to code.',
      ]),
      sources('<p>Transcript: <code>' + T + '33-Day 5 - Building a Sales Brochure Generator with OpenAI Chat Completions API.txt</code>. Code: <code>ai/llm_engineering/week1/day5.ipynb</code> and <code>week1/scraper.py</code> (unchanged).</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 34
  JT.def('llm_json_prompts', {
    title: 'Building JSON Prompts and Using the Chat Completions API',
    h1: 'JSON Prompts and <span>One-Shot Prompting</span>',
    body: () => [
      p('Now the first LLM call: choosing the relevant links, and getting the answer back as structured <b>JSON</b>.'),
      swapBox(),

      h2('Start with the Prompts'),
      p('Whenever you make a call, start by thinking about the prompts: what input sequence will make the most likely next tokens be the ones that complete my task? Here is the system prompt:'),
      show(`link_system_prompt = """
You are provided with a list of links found on a webpage.
You are able to decide which of the links would be most relevant to include in a brochure about the company,
such as links to an About page, or a Company page, or Careers/Jobs pages.
You should respond in JSON as in this example:

{
    "links": [
        {"type": "about page", "url": "https://full.url/goes/here/about"},
        {"type": "careers page", "url": "https://another.full.url/careers"}
    ]
}
"""`, 'System prompt'),
      p('Notice what it does: it states the task, tells the model to answer in JSON, and gives an <b>example</b> of the JSON. The structure (<code>links</code>, then a list of <code>type</code> and <code>url</code>) was simply invented for this task.'),

      h3('Why JSON?'),
      p('Models were trained on a huge amount of three kinds of text: natural language, <b>markdown</b> (shorthand for HTML — they know it extremely well and like to generate it) and <b>JSON</b>. So JSON is something they recognize and produce coherently. And it is a clean way to say what you want back: here, a <code>type</code> for each link, which would be hard to produce otherwise. The old way — "reply with a first bullet containing this, a second bullet containing that" — is clumsy by comparison.'),
      note('Week 8 introduces <b>structured outputs</b>, which forces the JSON to match a schema. Here we just give an example.'),

      h3('One-shot prompting'),
      p('Giving the model an example of a good answer in the prompt is called <b>one-shot prompting</b> (one example). With several examples it is <b>multi-shot prompting</b>. Strictly, multi-shot means example questions with their good answers, but giving several example answers is close to it. Why does it work? The model predicts the most likely next tokens, and after an example, the most likely next tokens are ones that follow the same pattern.'),

      h2('The User Prompt'),
      p('The user prompt changes with each website, so it is a <b>function</b> that takes a URL:'),
      show(`def get_links_user_prompt(url):
    user_prompt = f"""
Here is the list of links on the website {url} -
Please decide which of these are relevant web links for a brochure about the company,
respond with the full https URL in JSON format.
Do not include Terms of Service, Privacy, email links.

Links (some might be relative links):

"""
    links = fetch_website_links(url)
    user_prompt += "\\n".join(links)
    return user_prompt`, 'User prompt'),
      ul([
        'It states the task and asks for full <code>https</code> URLs, which handles the relative-link problem.',
        '"Do not include Terms of Service, Privacy, email links" tells the model what <b>not</b> to do — the opposite of an example. It was added because the model was returning those links.',
        'It calls <code>fetch_website_links</code> and appends each link on its own line.',
      ]),
      note('<b>The most important habit in LLM engineering:</b> experiment and iterate. If the model returns privacy policies, add "do not include privacy policies". Add examples. Refine. LLM engineering is as much data science as engineering, and the best results come from refining prompts.'),
      p('No AI has been used yet: we are only building a string. Here is what a user prompt looks like (the page used here, <code>example.com</code>, has no links, so the list is empty; on a real site, the links follow):'),
      py(IMPORTS + '\n' + LINK_PROMPTS + `
print(get_links_user_prompt("https://example.com"))`, 'Look at the user prompt'),
      term('python', `
Here is the list of links on the website https://example.com -
Please decide which of these are relevant web links for a brochure about the company,
respond with the full https URL in JSON format.
Do not include Terms of Service, Privacy, email links.

Links (some might be relative links):
`, 'Our run'),

      h2('Making the Call'),
      p('Now the Chat Completions call, in a function. It has the same shape as before, plus one new parameter:'),
      py(IMPORTS + '\n' + LINK_PROMPTS + '\n' + SELECT + `
print(select_relevant_links("https://edwarddonner.com"))`, 'select_relevant_links'),
      ul([
        '<code>model</code> and <code>messages</code> are as before: the system prompt, then the user prompt from our function.',
        '<code>response_format={"type": "json_object"}</code> tells the API we want JSON back.',
        '<code>response.choices[0].message.content</code> is the raw reply — a <b>string</b> that looks like JSON.',
        '<code>json.loads(result)</code> turns that string into Python dictionaries and lists. (<code>loads</code> means "load string".)',
        'The two <code>print</code> lines just show progress.',
      ]),
      p('This is what our local model returned for that page:'),
      term('python', `Selecting relevant links for https://edwarddonner.com by calling llama3.2
Found 3 relevant links
{'links': [{'type': 'about page', 'url': 'https://edwarddonner.com/about-me-and-about-nebula/'}, {'type': 'company page', 'url': 'https://edwarddonner.com/'}, {'type': 'linkedin profile', 'url': 'https://www.linkedin.com/in/eddonner/'}]}`, 'Our run'),
      p('Compare it with the example in the system prompt: a <code>links</code> list, and each item with a <code>type</code> and a <code>url</code>. The model selected an About page, the home page and the LinkedIn profile, and left out the Hacker News link. That is the nuanced judgment that was so hard to code.'),
      note('<b>Local models can slip.</b> We ran the same function on <code>huggingface.co</code> and our small model turned the relative link <code>/join</code> into <code>https://join.huggingface.co</code> instead of <code>https://huggingface.co/join</code>. That host does not exist, so the next step of the pipeline failed with a connection error. That page uses relative links, which the prompt asks the model to convert into full URLs, and larger models make this mistake less often. In your own code, guard against it — for example, wrap the page fetch in <code>try/except</code> — and always check the model\'s output.'),

      h3('Behind the scenes: constrained generation (for the curious)'),
      p('A model does not just pick one next token; it computes a <b>probability for every possible next token</b>. Normally we take a likely one. Because inference works token by token, a system can also <b>refuse to pick any token that would make the JSON invalid</b>: the model predicts whatever it wants, but only tokens that keep the output well-formed can be selected. That is one way <code>response_format</code> can enforce valid JSON at inference time, even though a model cannot "know" the JSON rules from an English instruction alone.'),
      K.remember([
        'Prompts first: the input sequence decides what is likely to come next.',
        'JSON is a good format to request: models know it well, and it gives your code structure to work with.',
        'One-shot prompting = one example in the prompt; multi-shot = several.',
        '<code>response_format={"type": "json_object"}</code> asks for JSON; <code>json.loads</code> converts it to Python.',
        'Experiment and iterate on prompts — the key skill of an LLM engineer.',
      ]),
      sources('<p>Transcript: <code>' + T + '34-Day 5 - Building JSON Prompts and Using OpenAI\'s Chat Completions API.txt</code>. Code: <code>ai/llm_engineering/week1/day5.ipynb</code> (<code>link_system_prompt</code>, <code>get_links_user_prompt</code>, <code>select_relevant_links</code>). The notebook version of the call also passes <code>reasoning_effort="none"</code> and uses a cloud model; the runnable version uses Ollama. The constrained-generation paragraph explains a mechanism described in the lecture.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 35
  JT.def('llm_chaining_calls', {
    title: 'Chaining GPT Calls: Building an AI Company Brochure Generator',
    h1: 'Chaining Calls: <span>Collecting the Material</span>',
    body: () => [
      p('The first call gave us relevant links. Now we use them: fetch all those pages, and assemble the material for the second call — the one that writes the brochure.'),
      swapBox(),

      h2('Wrapping an LLM Call in a Function'),
      p('Look at the next function. It looks like ordinary Python, but one line inside it calls an LLM:'),
      py(IMPORTS + '\n' + LINK_PROMPTS + '\n' + SELECT + '\n' + FETCHALL + `
text = fetch_page_and_all_relevant_links("https://edwarddonner.com")
print(len(text), "characters")
print(text[:500])`, 'fetch_page_and_all_relevant_links'),
      ol([
        '<code>fetch_website_contents(url)</code> gets the landing page text.',
        '<code>select_relevant_links(url)</code> is our first LLM call, packaged as an ordinary function.',
        'The loop builds one big block of text: a <code>## Landing Page:</code> heading and the page, then <code>## Relevant Links:</code> and, for each selected link, a <code>### Link:</code> heading with its type and that page\'s contents. (Two <code>#</code> signs make a level-2 heading in markdown.)',
      ]),
      p('The start of the result (the first call also prints its progress):'),
      term('python', `Selecting relevant links for https://edwarddonner.com by calling llama3.2
Found 4 relevant links
6015 characters
## Landing Page:

Home - Edward Donner

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
I'm Ed. I like writing code [...]`, 'Our run (shortened)'),
      note('This is a hint of what people call <b>agentic workflows</b>: stitching together LLM calls with ordinary Python code. Here a call is simply wrapped in a function. The course returns to this in Week 2, and builds a full agent in Week 8.'),

      h2('The Second Pair of Prompts'),
      p('Just as the link-selection call had a system and a user prompt, the brochure call has its own:'),
      show(`brochure_system_prompt = """
You are an assistant that analyzes the contents of several relevant pages from a company website
and creates a short brochure about the company for prospective customers, investors and recruits.
Respond in markdown without code blocks.
Include details of company culture, customers and careers/jobs if you have the information.
"""`, 'System prompt'),
      p('It names the audience (customers, investors, recruits), the format (markdown, without code blocks), and the topics to cover. A second, commented-out version in the notebook asks for a <b>humorous</b> brochure — a good example of how easily tone changes.'),
      show(`def get_brochure_user_prompt(company_name, url):
    user_prompt = f"""
You are looking at a company called: {company_name}
Here are the contents of its landing page and other relevant pages;
use this information to build a short brochure of the company in markdown without code blocks.\\n\\n
"""
    user_prompt += fetch_page_and_all_relevant_links(url)
    user_prompt = user_prompt[:5_000] # Truncate if more than 5,000 characters
    return user_prompt`, 'User prompt'),
      ul([
        'It takes the company name and URL, and puts the whole collected text into the prompt.',
        '<code>user_prompt[:5_000]</code> cuts the text to 5,000 characters. That keeps costs and the context window under control (remember Lessons 31-32), and protects you from large sites. (The scraper also truncates each page.)',
      ]),
      p('Calling <code>get_brochure_user_prompt("Edward Donner", url)</code> runs the whole first stage — including the first LLM call — and returns the prompt for the second call. We have still not called the second one. Now we make it.'),
      K.remember([
        'You can wrap an LLM call in a normal function and use it like any other step in your program.',
        'Chaining: the output of the first LLM call becomes part of the input of the second.',
        'Truncate long inputs to control cost and fit the context window.',
      ]),
      sources('<p>Transcript: <code>' + T + '35-Day 5 - Chaining GPT Calls- Building an AI Company Brochure Generator.txt</code>. Code: <code>ai/llm_engineering/week1/day5.ipynb</code> (<code>fetch_page_and_all_relevant_links</code>, <code>brochure_system_prompt</code>, <code>get_brochure_user_prompt</code>).</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 36
  JT.def('llm_brochure_streaming', {
    title: 'Building a Brochure Generator and Streaming Results',
    h1: 'The Brochure Generator <span>and Streaming</span>',
    body: () => [
      p('The final piece: the second LLM call, which writes the brochure — first the plain way, then with <b>streaming</b>.'),
      swapBox(),
      note('<b>Please be patient.</b> The two examples below run <b>two</b> local model calls each, plus several web requests. On our machine the first took about <b>2.5 minutes</b> and the streaming one about <b>1.5 minutes</b>. The page shows nothing until the run finishes.'),

      h2('The Second Call: Write the Brochure'),
      py(IMPORTS + '\n' + LINK_PROMPTS + '\n' + SELECT + '\n' + FETCHALL + '\n' + BROCHURE_PROMPTS + '\n' + CREATE + `
create_brochure("Edward Donner", "https://edwarddonner.com")`, 'create_brochure'),
      p('It is the same Chat Completions call, but we want <b>text</b>, not JSON, so there is no <code>response_format</code>. The system prompt is the brochure prompt, and the user prompt comes from <code>get_brochure_user_prompt</code> — which is where the first LLM call happens. So running this function does everything: fetch the page, select links, fetch them, build the prompt, write the brochure. (The notebook displays the result as markdown; here we print it.) This is what our run printed:'),
      term('python', `Selecting relevant links for https://edwarddonner.com by calling llama3.2
Found 4 relevant links
# Edward Donner
## About Us

Edward Donner is an AI startup that aims to revolutionize the way we source, understand, engage, and manage talent using Generative AI and machine learning. [...]

## Our Mission

Our long-term goal is to help people discover their potential and pursue their reason for being, motivated by the concept of Ikigai. [...]

## Our Values

* **Innovation**: [...]
* **Collaboration**: [...]
* **Passion**: [...]

## Get in Touch
[...]`, 'Our run (shortened)'),
      note('<b>Read it critically.</b> The brochure is well structured and has the headings we asked for — but the small local model got facts wrong: it calls "Edward Donner" itself an AI startup, mixing the person with the company page it read (the site mentions the company Nebula). A stronger model gets this right more often, and in a real product a human would review the result. This is Lesson 21 in practice.'),

      h2('Streaming'),
      p('LLMs generate content <b>one token at a time</b>, so we can show each token as it arrives — the typewriter effect you know from ChatGPT. To do it, add one parameter, <code>stream=True</code>. Then the call does not return the response object; it returns a <b>stream</b> you can loop over:'),
      show(`stream = openai.chat.completions.create(
    model=MODEL,
    messages=messages,
    stream=True
)
for chunk in stream:
    ...`, 'The idea'),
      p('In the notebook, we display markdown, so the code must update an already-displayed block each time:'),
      show(`def stream_brochure(company_name, url):
    stream = openai.chat.completions.create(
        model="gpt-6-luna",
        reasoning_effort="none",
        messages=[
            {"role": "system", "content": brochure_system_prompt},
            {"role": "user", "content": get_brochure_user_prompt(company_name, url)}
          ],
        stream=True
    )
    response = ""
    display_handle = display(Markdown(""), display_id=True)
    for chunk in stream:
        response += chunk.choices[0].delta.content or ''
        update_display(Markdown(response), display_id=display_handle.display_id)`, 'week1/day5.ipynb — stream_brochure (OpenAI)'),
      ul([
        '<code>display(Markdown(""), display_id=True)</code> shows an empty markdown block and gives us a <b>handle</b> to it.',
        'Each <code>chunk</code> holds a little extra piece of the answer. We read it from <code>chunk.choices[0].delta.content</code> — <code>delta</code> instead of <code>message</code>, because it is only the new bit. (It can be empty, hence <code>or \'\'</code>.)',
        'We add it to <code>response</code> and update the displayed block, which re-renders the markdown.',
      ]),
      p('If you were not using markdown, a simple <code>print</code> would do. That is the version we use on this page: it prints each piece as it arrives.'),
      py(IMPORTS + '\n' + LINK_PROMPTS + '\n' + SELECT + '\n' + FETCHALL + '\n' + BROCHURE_PROMPTS + '\n' + STREAM + `
stream_brochure("Edward Donner", "https://edwarddonner.com")`, 'stream_brochure (Ollama, printed)'),
      p('The result is the same kind of brochure:'),
      term('python', `Selecting relevant links for https://edwarddonner.com by calling llama3.2
Found 4 relevant links
# Edward Donner: Empowering Talent and Transformation

At Edward Donner, we believe that the right match between individuals and roles is the key to unlocking human potential. [...]

## Our Mission
[...]`, 'Our run (shortened)'),
      note('This page shows the output when the program ends, so you will not see the typewriter effect here. Run the same code in a terminal or notebook to watch the text appear piece by piece.'),
      p('Streaming is not only a nicer user experience. It shows what the model really does: it generates a token, that token is fed back in, and the next token is generated. The tokens travel to your program as a steady flow (using a web technology called <b>server-sent events</b>).'),

      h2('Change the Tone'),
      p('We can make a different product without touching the logic. In the system prompt, use the humorous version (the commented-out one in the notebook): "<i>creates a short, humorous, entertaining, witty brochure about the company ...</i>". Run it again, and you get a very different brochure — for example: "keep it open, keep it ethical, keep it hugging", with an emoji.'),
      p('Is that hallucination? Partly, yes: the model invents a motto. But that is exactly what we asked for: a humorous take consistent with the company\'s style. Whether that is good depends on your goal. If you want to bring out the joyful side of a company, it may be perfect. If not, go back to the prompts: iterate, experiment, improve.'),
      tryit('Edit <code>brochure_system_prompt</code> in the streaming example: replace "creates a short brochure" with "creates a short, humorous, entertaining, witty brochure", and run again. It takes a minute or two.'),
      note('<b>Why is it fine that the notebook changes a variable and just re-runs a cell?</b> In notebooks, variables are global, so changing a prompt in one cell changes it everywhere. That is poor practice in production code, but it is perfect for experimenting — and encouraged, because it makes experimentation fast.'),
      K.remember([
        'The second LLM call takes the collected material and writes the output; the whole program is a chain of calls and ordinary code.',
        '<code>stream=True</code> returns a stream of chunks; read the new text from <code>chunk.choices[0].delta.content</code>.',
        'Streaming shows how models actually generate: token by token.',
        'Changing the system prompt changes tone and style without changing any logic.',
      ]),
      sources('<p>Transcript: <code>' + T + '36-Day 5 - Building a Brochure Generator with GPT-4 and Streaming Results.txt</code>. Code: <code>ai/llm_engineering/week1/day5.ipynb</code> (<code>create_brochure</code>, <code>stream_brochure</code>). The runnable versions use Ollama and print instead of using Markdown display. The lecture ran this on <code>huggingface.co</code>; this page uses <code>edwarddonner.com</code> because the small local model mangled some relative links on larger sites (see Lesson 34).</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 37
  JT.def('llm_business_applications', {
    title: 'Business Applications, Challenges and Building Your AI Tutor',
    h1: 'Business Applications, Challenges <span>and Your AI Tutor</span>',
    body: () => [
      p('You built a document generator from a few chained LLM calls. Now we look at where this applies, and at the exercises that finish Week 1.'),
      swapBox(),

      h2('Where This Applies'),
      p('You extended Day 1\'s code to make a couple of LLM calls and generate a document that serves a purpose. The pattern — <b>collect data, understand and synthesize it, generate an output</b> — fits any business: a blog post, a product tutorial from a specification, email content, a report. The brochure is a springboard.'),
      p('Embrace the <b>notebook mindset</b>. Many developers want to jump to Python modules, but when working with AI, a willingness to experiment, tweak and reshape is what gets the best results. It may feel hacky at first. It is a different mindset — a scientist\'s — and it is important.'),

      h2('Your Challenges'),
      ol([
        '<b>Tweak the brochure generator.</b> Try different prompts, add examples (multi-shot prompting), try other styles.',
        '<b>Add a third LLM call</b> that does something to the brochure — for example, translate it into Spanish, or any language you choose — so that you end up with two brochures. That is a call, then a call, then a call: more of an agentic workflow.',
        '<b>Apply it to your own business or life.</b> Find a similar problem that involves distilling information, synthesizing it and producing an output.',
        '<b>Build your own technical tutor</b> (the Week 1 exercise below).',
      ]),
      p('Look in <code>week1/community-contributions</code> to see what other students have built. If you share your work, put it in that folder, clear the notebook outputs, and explain what you did; the git guide in <code>guides</code> shows how to make a pull request.'),

      h2('The Week 1 Exercise: A Technical Tutor'),
      p('The exercise notebook is <code>week1/week1 EXERCISE.ipynb</code>. The task: build a tool that takes a technical question and responds with an explanation — a tool you can use yourself for the rest of the course. The notebook starts with this question to explain:'),
      show(`question = """
Please explain what this code does and why:
yield from {book.get("author") for book in books if book.get("author")}
"""`, 'The question to ask'),
      p('The repository\'s solution (<code>week1/solutions/week1 SOLUTION.ipynb</code>) sets up the prompts and messages, and then asks two models: a GPT model with streaming, and Llama through Ollama. Here is the Llama part, as in the solution, and it runs on your computer:'),
      py(`import ollama
from IPython.display import Markdown, display

MODEL_LLAMA = 'llama3.2'

question = """
Please explain what this code does and why:
yield from {book.get("author") for book in books if book.get("author")}
"""

system_prompt = "You are a helpful technical tutor who answers questions about python code, software engineering, data science and LLMs"
user_prompt = "Please give a detailed explanation to the following question: " + question

messages = [
    {"role": "system", "content": system_prompt},
    {"role": "user", "content": user_prompt}
]

response = ollama.chat(model=MODEL_LLAMA, messages=messages)
reply = response['message']['content']
display(Markdown(reply))`, 'Technical tutor with Ollama'),
      p('What is new here: the <code>ollama</code> Python package is another way to talk to Ollama, instead of the OpenAI client. <code>ollama.chat(model=..., messages=...)</code> takes the same messages list; the answer is in <code>response[\'message\'][\'content\']</code>. This took about 78 seconds on our machine. The start of the answer:'),
      term('python', `**Generator Expression Explanation**

Let's break down the given code:

yield from {book.get("author") for book in books if book.get("author")}

This code uses a combination of Python features to generate a sequence of authors from a list of books. [...]

1. **Dictionary comprehension**: \`{book.get("author") for book in books if book.get("author")}\` is a dictionary comprehension. [...]`, 'Our run (shortened)'),
      note('<b>Spot the mistake.</b> The model calls the curly-brace expression a "dictionary comprehension". It is actually a <b>set</b> comprehension: a dictionary comprehension needs <code>key: value</code> pairs. This is the point of Lesson 21: the answer reads confidently and is partly wrong. Use the tutor as an assistant, and check it.'),
      p('The solution\'s GPT part (shown, not run, because it needs OpenAI) uses streaming, as you learned in the last lesson:'),
      show(`stream = openai.chat.completions.create(model=MODEL_GPT, messages=messages,stream=True)

response = ""
display_handle = display(Markdown(""), display_id=True)
for chunk in stream:
    response += chunk.choices[0].delta.content or ''
    response = response.replace("\`\`\`","").replace("markdown", "")
    update_display(Markdown(response), display_id=display_handle.display_id)`, 'solutions/week1 SOLUTION.ipynb — GPT with streaming'),
      p('Make it your own: change the system prompt so that the tutor explains things the way you like, to your level. When it answers well, put that answer into the prompt as an <b>example</b>; when it answers badly, add it as a <b>counter-example</b> ("do not explain it like this, because..."). The more examples you give, the better it gets — that is multi-shot prompting. With Ollama you can also try other models (Phi-3, Qwen, DeepSeek) and compare.'),
      tryit('Replace the <code>question</code> with something you actually want to understand, and run it. Then change the system prompt (for example, "Explain as if I am new to Python") and compare the answers.'),

      h2('Week 1 Complete'),
      p('You now have the fundamentals: transformers, tokens, context windows, API costs and the illusion of memory; a view of the leading frontier models; and confident use of the Chat Completions API — streaming, markdown, JSON, and the OpenAI client with Ollama.'),
      p('Next week: working across the different frontier model APIs (OpenAI, Anthropic and Gemini), your first steps toward agents by <b>calling tools</b>, and a multi-modal customer-support assistant with a chat interface built with <b>Gradio</b>.'),
      K.remember([
        'Collect, synthesize, generate: a pattern that fits many business problems.',
        'Work like a scientist in notebooks: experiment, tweak, iterate.',
        'Challenges: improve the brochure, add a third (translation) call, apply it to your own problem, build a personal technical tutor.',
        'Always review what the model says — even a good-looking explanation can contain mistakes.',
      ]),
      sources('<p>Transcript: <code>' + T + '37-Day 5 - Business Applications, Challenges &amp; Building Your AI Tutor.txt</code>. Code: <code>ai/llm_engineering/week1/week1 EXERCISE.ipynb</code> and <code>week1/solutions/week1 SOLUTION.ipynb</code> (the question, prompts, messages and the Llama call are unchanged). The solution\'s GPT cell is shown but not run. The lecture\'s request to rate the course is not part of the lesson.</p>'),
    ].join(''),
  });
})();
