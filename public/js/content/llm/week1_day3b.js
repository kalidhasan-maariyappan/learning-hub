// LLM Engineering, Week 1 Day 3: lessons 22-25 (chat-product demos, agentic AI, Outsmart game).
// The lectures use web products that cannot run here; each lesson adds a local experiment you can run.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, h3, ul, ol, table, ex } = JT.h;
  const K = JT.kit;
  const term = (code, result, title, label) => K.rails(code, { title: title || 'Terminal', lang: 'text', result, label: label || 'Output' });
  const py = (code, title, opts) => ex(code, Object.assign({ title: title || 'Example', lang: 'python' }, opts || {}));
  const run = (code, title) => ex(code, { title: title || 'Example', lang: 'ollama' });
  const note = (html) => '<div class="note"><p>' + html + '</p></div>';
  const tryit = (html) => '<div class="note"><p><strong>Try it yourself:</strong> ' + html + '</p></div>';
  const sources = (html) => '<details class="qa"><summary>Sources for this lesson</summary><div>' + html + '</div></details>';
  const T = 'ai/transcript/01-Week 1 - Build Your First LLM Product- Exploring Top Models/';

  // ---------------------------------------------------------------- 22
  JT.def('llm_testing_chatgpt', {
    title: 'Testing ChatGPT-5 and Frontier LLMs Through the Web UI',
    h1: 'Testing Frontier Models <span>Through the Web UI</span>',
    body: () => [
      p('Most of this course connects to LLMs through code. For one lesson, we use the finished <b>chat products</b> to feel what these models can and cannot do. The tests below are worth running yourself in any chat product you have — and some of them also on your local model.'),
      note('These demos use the ChatGPT website with GPT-5, so they cannot run on this page. Where possible, we give you a <b>local version</b> that runs on Ollama.'),

      h2('Test 1: A Practical Business Question'),
      p('Ask: <i>"How do I decide if a business problem is suitable for an LLM solution?"</i> (Not every problem is.)'),
      p('A strong answer is <b>coherent and structured</b>: headings and sub-bullets, both sides of the argument, and a balanced view. On this question it covered: define the problem clearly, structured vs unstructured input, ambiguity and open-endedness (where LLMs are particularly powerful), business value against risk, data availability, operational fit, and a quick "litmus test". This is the kind of synthesis LLMs do best.'),

      h2('Test 2: Self-Awareness'),
      p('Ask: <i>"What kinds of questions are you best at answering and what do you find most challenging? Which other LLMs have capabilities that complement yours?"</i>'),
      p('The answer was surprisingly self-aware. Strengths: teaching and structured explanations, using tools, personalization and memory (a feature of the <b>product</b>), and combining knowledge across fields. Weaknesses: very fresh information (the knowledge cut-off from last lesson; it relies on web search), exact math in long derivations, personal matters where experts are needed, and very long reasoning chains. (That last one connects to the <b>context window</b>, which the course covers tomorrow.) It named other models as better for other things — Claude for long context and a human-like style, Gemini for real-time multimodal work, Mistral for being lightweight and fast. Your answer will differ; read it for what is useful.'),

      h2('Test 3: Questions With No Fixed Answer'),
      p('Ask: <i>"What does it feel like to be jealous?"</i> The answer described jealousy as a cocktail of fear, insecurity, anger and longing, with physical signs (chest tightness, heat, restlessness), emotional and mental signs (obsessive thinking), and "a storm of vulnerability and competitiveness".'),
      p('One caution: such text may resemble much that exists in the training data, so it is not proof of anything deeper. Later labs use harder questions that are definitely outside training data. Try your own: think of the hardest, most human question you can.'),
      p('A nonsense question tests it too. Early GPT models gave a silly answer to <i>"How many rainbows does it take to jump from Hawaii to 17?"</i>. Today\'s answer is sensible: it calls the question poetic, explains that rainbows are not a unit of distance, and asks what you meant.'),

      h2('Test 4: Trick Questions'),
      p('LLMs used to fail at letter counting. The reason: a model does not see letters. The text goes in as chunks called <b>tokens</b> (explained in the next lesson), so counting letters inside those chunks was very hard. Frontier models usually handle it correctly today.'),
      p('An even harder one: <i>"How many words are there in your answer to this question?"</i> The model has to count the words of the very answer it is writing. GPT-5 answered correctly.'),
      p('Let\'s try both on a small local model. The correct count of the letter "a" in the sentence below is <b>4</b> — first confirm that with Python:'),
      py(`sentence = "How many times does the letter a appear in this sentence?"
print(sentence.count("a"))`, 'The ground truth'),
      term('python', '4', 'Output'),
      p('Now ask a model to do the same:'),
      run('ollama run llama3.2 "How many times does the letter a appear in this sentence?"', 'Ask a local model'),
      p('Our local models both got it wrong:'),
      term('ollama run ...', `llama3.2:    ...The letter "a" appears 7 times in this sentence.
gemma3:270m: The letter a appears 1 time in the sentence.`, 'Our runs'),
      p('Both are wrong (the correct answer is 4), and both sound sure. This is the weakness described above: the model predicts plausible text from tokens; it does not count. Run it a few times, and also try the word-count question:'),
      run('ollama run llama3.2 "How many words are there in your answer to this question?"', 'The meta question'),
      tryit('Try the tests on <code>gemma3:270m</code> and <code>llama3.2</code> and compare. Which model sounds more sure, and which is right? To be fair to the model, check the answer with Python as we did above.'),
      K.remember([
        'A good LLM answer is structured, balanced and coherent — that is the strength to use.',
        'Models can reflect on their own strengths and weaknesses, but verify their claims.',
        'Letter counting was hard because models read tokens, not letters; frontier models usually manage it today, small local models often do not.',
        'Check an LLM\'s answer with something reliable (like code) when it can be checked.',
      ]),
      sources('<p>Transcript: <code>' + T + '22-Day 3 - Testing ChatGPT-5 and Frontier LLMs Through the Web UI.txt</code>. The ChatGPT results are from the lecture; the local experiment (the sentence and its count) is an illustration written for this lesson, and its output was produced on this machine.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 23
  JT.def('llm_comparing_frontier', {
    title: 'Testing Claude, Gemini, Grok and DeepSeek, and Deep Research',
    h1: 'Comparing Claude, Gemini, Grok <span>and DeepSeek</span>',
    body: () => [
      p('The same questions, different models. Comparing models side by side shows you how they differ in style and reliability.'),
      note('These are demos of web products with specific model versions from when this course was recorded. They cannot run on this page. Your results will differ with newer versions, so repeat them yourself.'),

      h2('Claude'),
      p('Asked to compare itself with other models (Claude Sonnet 4.5): earlier Claude versions refused such questions because of how they were trained for <b>alignment</b>; now it answers. Its strengths: nuance, reasoning, long-form writing, code, and ethical reasoning. Weaknesses: specialized fields, real-time information, very long context (as anyone who has filled the context in a coding session knows — quality drops), and some multimodal tasks. It also slipped: it recommended "GPT-4" models as complements, which are old, showing the knowledge cut-off at work.'),
      p('Asked <i>"How would you describe the color blue to someone who has never been able to see?"</i>, Claude\'s answer was very evocative: blue as the cool side of color, shade on a hot day, crisp cold water on skin; connected to emotions, space, sound and metaphor. Poetic, rich writing is one of Claude\'s greatest strengths.'),

      h2('The Word-Count Test Across Models'),
      p('The question <i>"How many words are there in your answer to this question?"</i> is a meta test: the model must count its own answer. Results of that test:'),
      table(['Model (at the time)', 'Result'], [
        ['GPT-5', 'Correct'],
        ['Claude Sonnet 4.5', 'Wrong'],
        ['Claude Opus 4.1 (biggest Claude)', 'Wrong twice; correct with <b>extended thinking</b> turned on'],
        ['Gemini 2.5 Pro (a thinking model)', 'Long, wordy answer — and wrong'],
        ['Grok 4 Fast', 'Correct, even in the fast variant'],
        ['DeepSeek (without "deep think")', 'Reasoned to a correct assumption, then got into a loop of overthinking and gave a wrong final number'],
      ]),
      p('What do we learn? (1) Even the best models fail sometimes, and one test is one data point. (2) Turning on <b>extended thinking</b> (reasoning) fixed Opus — a direct example of Lesson 20. (3) Thinking models can <b>overthink</b>: DeepSeek talked itself out of the right answer. (4) The ranking you see depends on the question, so compare on your own task.'),

      h2('Deep Research: An LLM That Works While You Wait'),
      p('Chat products offer much more than chatting. One is <b>Deep Research</b>: the model works on your behalf, for minutes to an hour, and returns a report. Here is how it went, with ChatGPT:'),
      ol([
        'Ask a research question (here: the greatest commercial impact of generative and agentic AI, with revenue and the innovations behind it).',
        'The model first asks <b>clarifying questions</b> (public companies only? which industry? global? which dates?). You answer.',
        'It runs the research on its own, reading many sources, and lists them at the side as it goes.',
      ]),
      p('This is many LLM calls working together toward a goal — your first example of <b>agentic AI</b>, which the next lesson explains. It feels like a junior analyst going off to work for you.'),
      K.remember([
        'Compare models on your own tasks; one test is one data point.',
        'Reasoning (extended thinking) can turn a wrong answer into a right one, but reasoning models can also overthink.',
        'Deep Research is an agentic feature: the model plans, clarifies, searches and reports on its own.',
      ]),
      sources('<p>Transcript: <code>' + T + '23-Day 3 - Testing Claude, Gemini, Grok &amp; DeepSeek with ChatGPT Deep Research.txt</code>. Model versions and results are from the lecture and have since changed. No local experiment is added to this lesson: the models are cloud products.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 24
  JT.def('llm_agentic_in_action', {
    title: 'Agentic AI in Action: Deep Research, Agent Mode and Claude Code',
    h1: 'Agentic AI <span>in Action</span>',
    body: () => [
      p('Three more demos, all examples of <b>agentic AI</b>. Agentic AI means an LLM-based system that carries out work with some autonomy, instead of just answering one question.'),

      h2('Deep Research: The Result'),
      p('The report from the last lesson came back as a long, thorough markdown document. It focused mostly on tech companies — OpenAI first, then Anthropic, Midjourney (images), Runway (video), ElevenLabs (voice), Microsoft Copilot, GitHub Copilot and Cursor — rather than on, say, legal-sector AI. It quoted sources such as TechCrunch with links, so that you can <b>validate</b> the claims, and ended with a summary. Notice the shape of what happened: while you did something else, something went away, worked, and came back with a researched report.'),

      h2('Agent Mode'),
      p('ChatGPT\'s <b>agent mode</b> does more than talk. The task was: <i>find a restaurant in New York with a table tonight at 9 p.m. that serves British food, and has banoffee pie on the menu.</i> The agent set up a virtual desktop and opened a browser by itself. You can watch it work: it handles browser cookies, finds a British pub, checks the menu, opens a reservation system and looks for availability. It then reported: found, with address and link, and offered to <b>book it for you</b> if you confirm.'),
      p('The big difference from a chatbot: it uses tools (a browser) and takes steps toward a goal. And the last step, booking, was left for the user to approve — a sensible design for an action with real consequences.'),

      h2('Claude Code'),
      p('<b>Claude Code</b> is a coding agent that runs in your terminal. The demo task: <i>read the Day 1 and Day 2 notebooks in the week 1 folder, then write a solution to the Day 2 challenge as a Python module called <code>solution.py</code> that I can run with uv.</i> It read both notebooks, understood the challenge — a website summarizer that uses Ollama instead of OpenAI — and wrote the file. That file is in your repository at <code>week1/solution.py</code>:'),
      K.show(`"""
Website summarizer using Ollama instead of OpenAI.
"""

from openai import OpenAI
from scraper import fetch_website_contents

OLLAMA_BASE_URL = "http://localhost:11434/v1"
MODEL = "llama3.2"

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
    """Create message list for the LLM."""
    return [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt_prefix + website}
    ]


def summarize(url):
    """Fetch and summarize a website using Ollama."""
    ollama = OpenAI(base_url=OLLAMA_BASE_URL, api_key='ollama')
    website = fetch_website_contents(url)
    response = ollama.chat.completions.create(
        model=MODEL,
        messages=messages_for(website)
    )
    return response.choices[0].message.content


def main():
    """Main entry point for testing."""
    url = input("Enter a URL to summarize: ")
    print("\\nFetching and summarizing...\\n")
    summary = summarize(url)
    print(summary)


if __name__ == "__main__":
    main()`, 'week1/solution.py', 'python'),
      p('You know every piece of it: the prompts, <code>messages_for</code> and <code>summarize</code> come from Lesson 11, the Ollama client from Lesson 19. The new parts are <code>input()</code>, which asks for a URL, and <code>if __name__ == "__main__":</code>, which runs <code>main()</code> only when the file is run directly. Let\'s run it. The URL is sent to the program as typed input:'),
      py(`from openai import OpenAI
from scraper import fetch_website_contents

OLLAMA_BASE_URL = "http://localhost:11434/v1"
MODEL = "llama3.2"

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
    """Create message list for the LLM."""
    return [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt_prefix + website}
    ]


def summarize(url):
    """Fetch and summarize a website using Ollama."""
    ollama = OpenAI(base_url=OLLAMA_BASE_URL, api_key='ollama')
    website = fetch_website_contents(url)
    response = ollama.chat.completions.create(
        model=MODEL,
        messages=messages_for(website)
    )
    return response.choices[0].message.content


def main():
    """Main entry point for testing."""
    url = input("Enter a URL to summarize: ")
    print("\\nFetching and summarizing...\\n")
    summary = summarize(url)
    print(summary)


if __name__ == "__main__":
    main()`, 'Run week1/solution.py', { stdin: 'https://example.com' }),
      p('The page sends <code>https://example.com</code> as the typed input (see the input box in <b>Try it Yourself</b>). The output is generated by your local model, so your wording will differ:'),
      term('python week1/solution.py', `Enter a URL to summarize: 
Fetching and summarizing...

**Example Domain: A Boring but Useful Place**

This website is a testing ground for domain names, where you can experiment with examples without causing any actual harm. Don't get too attached, it's not a service to be relied upon for your production needs.`, 'Our run'),
      p('What matters is not the code (you could write it yourself) but what happened: an agent read your earlier work, understood the task, used a stronger model than the one it was writing for, and produced a working solution in one step.'),
      note('<b>Why this course still teaches you to build it.</b> These tools are impressive, but the aim is to build such systems yourself and take them in your own direction. Use agents like these, and supervise them as in Lesson 21.'),
      K.remember([
        'Agentic AI: LLM-based systems that work toward a goal on their own — researching, browsing, coding — over many steps.',
        'Deep Research (clarify, research, report), agent mode (a browser to carry out a task) and Claude Code (reads files and writes code) are all examples.',
        'Keep a human in the loop for actions with consequences, such as booking or paying.',
      ]),
      sources('<p>Transcript: <code>' + T + '24-Day 3 - Agentic AI in Action- Deep Research, Claude Code, and Agent Mode.txt</code>. Code: <code>ai/llm_engineering/week1/solution.py</code> (unchanged) and <code>week1/scraper.py</code>. The runnable block is the same code with the final <code>main()</code> call written inline, as the page runs a script, which already satisfies the file\'s own <code>__main__</code> check. The output shown is the shape of the result, because the model\'s wording changes each run.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 25
  JT.def('llm_outsmart_game', {
    title: 'Frontier Models Showdown: Building an LLM Competition Game',
    h1: 'Frontier Models Showdown: <span>The Outsmart Game</span>',
    body: () => [
      p('Today had no lab, but there is something close: a game in which LLMs compete, so you can <b>watch</b> how different models behave. The game was built by the course author as a hands-on way to see model characteristics.'),

      h2('Why Build a Game?'),
      p('A single question shows you how a model answers. A game shows you how it <b>plans, negotiates and reacts</b> over many turns. It is a good way to build intuition for what models can do, and to compare them under the same conditions.'),

      h2('The Rules of Outsmart'),
      ul([
        'Four players: <b>Alex, Blake, Charlie and Drew</b> — each played by a different LLM.',
        'Each starts with <b>12 coins</b>.',
        'Every turn, before deciding, the players <b>exchange messages</b> with each other — diplomacy, scheming and negotiation.',
        'Then each player chooses one player to <b>take a coin from</b> and one to <b>give a coin to</b>.',
        'If two players target the same person and also give coins to each other, they form an <b>alliance</b>, which wins extra coins and takes extra from the player they ganged up on.',
      ]),
      p('On the public website, the players were smaller models (GPT-4o, Claude 3 Sonnet, Gemini 2 Flash, and a small DeepSeek or Llama 70B) — cheaper models, since many people play it every day. For the demo, a stronger line-up ran locally: OpenAI\'s open-source GPT-OSS (120B, run in the cloud through Groq, which is very fast), GPT-5, Grok 4 and Claude Sonnet 4.5.'),

      h2('What the Game Shows'),
      ul([
        '<b>Speed differs a lot.</b> GPT-OSS on Groq answers almost at once; GPT-5, with no limit on its thinking, takes much longer. All four players think in parallel, but the turn waits for the slowest.',
        '<b>Each model explains its strategy</b> (for example "build trust and explore alliances first"), and its "inner thoughts" and messages are visible, so you can read the schemes.',
        'After turn 1, the open-source GPT-OSS led. After turn 2, GPT-5 led with 15 coins, and Claude Sonnet 4.5 was being ganged up on.',
        'The winner is not shown: the result is held back for the next lesson day.',
      ]),
      note('<b>A useful trick:</b> asking a model to <b>explain its strategy</b> can push it to reason more explicitly and put more work into its answer. You can use this in your own prompts.'),
      p('The app is built with <b>Streamlit</b> (a Python library for web apps). The course uses Gradio for most of its interfaces, starting in Week 2.'),
      note('The Outsmart source code is the author\'s separate project and is <b>not inside the course repository</b>, so it is not included in this Learning Hub. The game can be played on the author\'s website.'),

      h2('Wrapping Up Day 3'),
      p('You are about 7.5% of the way through. You can now write code that calls frontier models, and you can talk about their strengths and limits, compare them, and tell chat, reasoning, hybrid and base models apart. Tomorrow: the transformer architecture, and foundations such as <b>tokens, context windows, parameters and API costs</b>.'),
      K.remember([
        'Price and speed matter more as top models converge in capability; you will trade them off against intelligence later.',
        'Games and side-by-side tests give a feel for model behavior that single questions do not.',
        'Asking a model to explain its strategy can push it to reason more explicitly.',
      ]),
      sources('<p>Transcript: <code>' + T + '25-Day 3 - Frontier Models Showdown- Building an LLM Competition Game.txt</code>. No code from the course repository belongs to this lecture, so there is no runnable example here. Model line-ups are as described in the lecture.</p>'),
    ].join(''),
  });
})();
