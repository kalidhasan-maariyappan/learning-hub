// LLM Engineering, Week 1 Day 3: lessons 20-21 (concepts). Transcript-based; demos run on local Ollama.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, h3, ul, ol, table, ex } = JT.h;
  const K = JT.kit;
  const term = (code, result, title, label) => K.rails(code, { title: title || 'Terminal', lang: 'text', result, label: label || 'Output' });
  const py = (code, title) => ex(code, { title: title || 'Example', lang: 'python' });
  const run = (code, title) => ex(code, { title: title || 'Example', lang: 'ollama' });
  const note = (html) => '<div class="note"><p>' + html + '</p></div>';
  const tryit = (html) => '<div class="note"><p><strong>Try it yourself:</strong> ' + html + '</p></div>';
  const sources = (html) => '<details class="qa"><summary>Sources for this lesson</summary><div>' + html + '</div></details>';
  const T = 'ai/transcript/01-Week 1 - Build Your First LLM Product- Exploring Top Models/';

  // ---------------------------------------------------------------- 20
  JT.def('llm_model_types', {
    title: 'Base, Chat and Reasoning Models: Understanding LLM Types',
    h1: 'Base, Chat and Reasoning Models: <span>LLM Types</span>',
    body: () => [
      p('Today there is no lab — we study how models differ, so that you pick the right type for each job. By the end you will know the difference between chat and reasoning models, and where each is strong.'),

      h2('Three Kinds of LLM'),
      p('LLMs come in three kinds, depending on what they were trained to do. Each one is built from the one before.'),

      h3('1. Base models'),
      p('A <b>base model</b> does one thing: it takes a sequence of text and <b>predicts what comes next</b>. It knows nothing about chatting.'),
      p('You already use one: <b>predictive text on your phone</b>. Type "hello there", and the keyboard suggests a next word. Pick it, and it suggests the next one after that. Each pick extends the sequence, and the model predicts again from the new sequence. That is a base model: complete the sequence, over and over.'),
      p('Before ChatGPT (2022), models such as GPT-3 were base models. To make one answer questions, people used tricks, like writing <code>Q: question A: answer</code> pairs in the prompt and ending with a new <code>Q: ...</code> and <code>A:</code>, so that the most likely next text was an answer.'),
      p('You rarely meet base models today, but you will in Week 7 when you train your own — and a base model is the right starting point for that, as you will see below.'),

      h3('2. Chat (instruct) models'),
      p('OpenAI\'s next idea: train the model further on data shaped like a conversation. Instead of one long text, the data has an overall description (the <b>system prompt</b>), then a message from the user, then the AI\'s reply, then another user message and another reply. Training on that structure produces a <b>chat model</b> (also called an <b>instruct variant</b>): the system and user prompts you used in Lesson 10 are the structure it was trained on. The technique that took GPT to ChatGPT is called <b>reinforcement learning from human feedback</b> (RLHF).'),

      h3('3. Reasoning (thinking) models'),
      p('People then found a prompting trick called <b>chain of thought</b>: end your question with "please think step by step". The model then works methodically, and the text it predicts is more likely to reach a correct solution. It sounds too simple, but it often helps.'),
      p('That raised a new idea: train a chat model on many examples of thinking step by step before the answer. The result is a <b>reasoning model</b> (or <b>thinking model</b>): it first outputs its thinking steps, then gives the answer. You saw this in Lesson 2, when <code>gpt-oss</code> printed its thoughts in grey before replying.'),

      h2('Hybrid Models and Reasoning Effort'),
      p('Many of the newest models are <b>hybrids</b>: they decide for themselves how much to think. For a simple "hi there", they barely reason; for a hard puzzle, they reason a lot. GPT-5 and Gemini 2.5 Pro are examples. Some model families offer separate chat-only and reasoning versions too. The amount of thinking is called the <b>reasoning budget</b> or <b>reasoning effort</b> — remember the <code>reasoning_effort="none"</code> parameter in the notebook code of Lesson 10: that is this setting.'),
      p('How do you make a model think longer? The technique is called <b>budget forcing</b>, and the best-known version is almost silly. A paper called <b>s1</b> (January 2025) found that if, while the model is writing its thinking, you insert the word <b>"Wait"</b> into the text, the model carries on as if it is reconsidering: "Wait, I should rethink this..." — and it goes deeper and weighs its own arguments. That small change improves results.'),

      h2('Which Type for Which Job?'),
      p('Reasoning models with a high budget do better on almost every benchmark (the course looks at benchmarks in Week 4). So why not always use them? Because each type has its own strengths:'),
      table(['Type', 'Best at', 'Why'], [
        ['<b>Reasoning</b>', 'Problem solving, puzzles, anything where you can afford to wait', 'They score higher on intelligence-type tests, but produce long thinking text first.'],
        ['<b>Chat</b>', 'Interactive use, speed, low cost; often fluent writing', 'No thinking tokens, so they are faster and cheaper. For emails and other content, they are often more fluid, while reasoning models can overthink and sound cold. (This last point is anecdotal — there are no good measurements, so test it yourself.)'],
        ['<b>Base</b>', 'Training a model for a new skill', 'You do not want a chat or reasoning structure already baked in; you want to teach your own.'],
      ]),
      p('Let\'s see the "think step by step" idea in code. The question is a classic puzzle, and the only change is the last sentence:'),
      py(`from openai import OpenAI

ollama = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

question = "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?"
prompt = question + " Please think step by step."

response = ollama.chat.completions.create(
    model="llama3.2",
    messages=[{"role": "user", "content": prompt}]
)
print(response.choices[0].message.content)`, 'Chain-of-thought prompt (Ollama)'),
      p('Here is what we saw. <code>llama3.2</code> answered correctly ($0.05) both <b>with and without</b> the extra sentence — it already shows its steps by itself, because it is a chat model trained on lots of step-by-step answers. The tiny <code>gemma3:270m</code> got the puzzle <b>wrong both ways</b> (it said $1.10 without the sentence, and $3.00 with it). So the phrase is a nudge, not a guarantee, and bigger models get less benefit from it, since they already reason step by step.'),
      tryit('Change <code>llama3.2</code> to <code>gemma3:270m</code>, and delete the <code>prompt = question + ...</code> line\'s extra sentence to compare. Run each a few times. Answers vary between runs, so look at the pattern across runs rather than one result.'),
      K.remember([
        'Base model: predicts the next text (like phone predictive text). Chat/instruct model: trained on system/user/assistant conversations. Reasoning model: trained to write its thinking steps before the answer.',
        'Hybrid models choose how much to reason; the amount is the reasoning budget or effort.',
        'Reasoning models are stronger at problem solving; chat models are faster, cheaper and often better for interaction and writing; base models are the starting point for training new skills.',
        '"Think step by step" can help, but is not a guarantee.',
      ]),
      sources('<p>Transcript: <code>' + T + '20-Day 3 - Base, Chat, and Reasoning Models- Understanding LLM Types.txt</code>. The code example is an illustration written for this lesson to show the technique the lecture names; it is not from the course repository. The lecture names the s1 paper (Jan 2025) for budget forcing.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 21
  JT.def('llm_frontier_strengths_pitfalls', {
    title: 'Frontier Models: Strengths and Pitfalls',
    h1: 'Frontier Models: <span>Strengths and Pitfalls</span>',
    body: () => [
      p('Frontier models are astonishing, and they have real weaknesses. A good LLM engineer knows both. Let\'s start with who builds what, and then look at both sides.'),

      h2('The Labs, Models and Chat Products'),
      p('Remember the difference between a <b>model</b> and a <b>chat product</b> built on it. Frontier models are also called <b>foundation models</b>; the terms are used almost interchangeably and have no strict definitions.'),
      table(['Lab', 'Model', 'Chat product', 'Notes'], [
        ['OpenAI', 'GPT', 'ChatGPT', 'GPT-5 is a hybrid chat-and-reasoning model that replaces the older GPT series and the "o" series (pure reasoning). GPT-4.1, the pure chat model that came right before GPT-5, is still a good choice for interactive uses: it is much faster than GPT-5, even when GPT-5 is told to reason as little as possible.'],
        ['Anthropic', 'Claude (Haiku, Sonnet, Opus)', 'Claude', 'The course mostly uses the middle size, Sonnet.'],
        ['Google', 'Gemini', 'Gemini', 'The chat product has had several names.'],
        ['xAI', 'Grok', 'Grok', 'With a K — not to be confused with Groq (with a Q), covered later.'],
        ['DeepSeek', 'DeepSeek', 'DeepSeek', 'The odd one out: it open-sourced all its models, including the biggest. OpenAI has since released an open-source model too (gpt-oss, which you used in Lesson 1).'],
      ]),
      note('Version numbers move quickly. Use the latest model from each company and compare it for yourself.'),

      h2('What They Do Brilliantly'),
      ul([
        '<b>Synthesizing information</b> — as your web-page summarizer showed, they summarize and answer in detail, with structure: ask for pros and cons of something and you get a remarkable answer.',
        '<b>Generating content</b> — drafting emails, presentations and project plans. A good use is as a partner to bounce ideas around when starting something new.',
        '<b>Coding</b> — writing, testing and fixing code, in a loop. They have largely replaced Stack Overflow as the first place engineers go with a problem.',
      ]),

      h2('Where They Struggle'),
      h3('Knowledge gaps and cut-off dates'),
      p('A model\'s training stops at a <b>knowledge cut-off</b>, and it knows little beyond it. For example, a model helping with your code may "correct" a current model name into an outdated one and insist that yours "does not exist". Also, web search in products like ChatGPT is <b>not part of the model</b>: it is extra code that engineers added around it.'),
      h3('Confident mistakes (hallucination)'),
      p('An LLM predicts the most plausible next word, and it was trained to sound confident. It is almost surprising that it is so often right. When it is wrong, it sounds just as sure. This is called a <b>hallucination</b>.'),
      p('You can see this with a very small model. We asked two local models about a village that does not exist:'),
      run('ollama run gemma3:270m "What is the population of the village of Xyzzyville, Montana? Answer in two sentences."', 'Ask about a village that does not exist'),
      p('Here is what they said on our machine:'),
      term('gemma3:270m', 'The population of the village of Xyzzyville, Montana, is approximately 2,800 people.', 'Our run: gemma3:270m'),
      term('llama3.2', `I couldn't find any information on a village called Xyzzyville, Montana. Xyzzyville is actually a fictional place and a well-known example of a nonexistent word [...]`, 'Our run: llama3.2 (shortened)'),
      p('The tiny model gave an invented number with complete confidence. The larger model declined. Run it yourself — answers vary, and neither is guaranteed.'),
      tryit('Change <code>gemma3:270m</code> to <code>llama3.2</code> (or the reverse), and invent your own fake place or person. Does the model admit it does not know?'),

      h3('Going down the wrong path'),
      p('A concrete story: a student on this course shared pages of strange code that did not work. They were chatting with an open-source model through Hugging Face, but had typed the name of the <b>base</b> variant instead of the <b>chat/instruct</b> variant. A base model does not expect system and user prompts, so the call failed. The LLM the student was using to fix it did not step back and question the model name; it concluded that the model needed to be <b>converted</b> into a chat model, and generated pages of sophisticated code about special tokens. The real problem was a misspelled model name.'),
      p('The student did not understand the code, but things seemed to progress, so they continued. The lesson: LLMs tend to <b>apply band-aids and push forward</b> instead of challenging the whole situation — especially in coding tasks.'),
      p('That is why LLM coding help is most useful for <b>senior</b> developers, who can spot and correct errors. It helps juniors too, but can lead them astray with confidence.'),

      h2('The Key Idea: Supervise'),
      p('Treat an LLM like an <b>incredibly hard-working, tireless junior analyst</b>. It will do a huge amount of work for you, but it is your job to check it, keep it on the rails, and challenge conclusions it jumps to.'),
      K.remember([
        '"Frontier" and "foundation" model are used almost interchangeably for the large models from the leading labs.',
        'Strengths: synthesizing information, generating content, coding.',
        'Weaknesses: knowledge cut-offs, confident mistakes (hallucinations), jumping to wrong conclusions.',
        'Web search in a chat product is code added around the model, not part of the model.',
        'Supervise LLM work like a junior analyst\'s: check it, and challenge it.',
      ]),
      sources('<p>Transcript: <code>' + T + '21-Day 3 - Frontier Models- GPT, Claude, Gemini &amp; Their Strengths and Pitfalls.txt</code>. The Xyzzyville demo is an illustration written for this lesson; it is not from the course repository, and its output was produced on this machine and varies from run to run.</p>'),
    ].join(''),
  });
})();
