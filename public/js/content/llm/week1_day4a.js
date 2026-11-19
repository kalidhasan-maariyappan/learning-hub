// LLM Engineering, Week 1 Day 4: lessons 26-28 (transformers, attention, parameters).
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, h3, ul, ol, table, ex } = JT.h;
  const K = JT.kit;
  const term = (code, result, title, label) => K.rails(code, { title: title || 'Terminal', lang: 'text', result, label: label || 'Output' });
  const run = (code, title) => ex(code, { title: title || 'Example', lang: 'ollama' });
  const note = (html) => '<div class="note"><p>' + html + '</p></div>';
  const tryit = (html) => '<div class="note"><p><strong>Try it yourself:</strong> ' + html + '</p></div>';
  const sources = (html) => '<details class="qa"><summary>Sources for this lesson</summary><div>' + html + '</div></details>';
  const T = 'ai/transcript/01-Week 1 - Build Your First LLM Product- Exploring Top Models/';

  // ---------------------------------------------------------------- 26
  JT.def('llm_transformers_intro', {
    title: 'Understanding Transformers: The Architecture Behind GPT and LLMs',
    h1: 'Understanding Transformers: <span>The Architecture Behind GPT</span>',
    body: () => [
      p('Today covers the ideas under every LLM: transformers, tokens, context windows, parameters and costs. We start with the result of yesterday\'s game, and then tell the story of the transformer.'),

      h2('Who Won Outsmart?'),
      p('In that run, <b>Charlie</b> won — played by <b>Grok 4</b>, a model with a reputation for being devious. It was close: Charlie finished first, then GPT-OSS, then GPT-5 in third, and <b>Drew (Claude Sonnet 4.5)</b> last. For a while Drew led, until the others ganged up on it. On the public site, after more than 2,000 games, a ranking feature shows how each model does overall — but be careful: a model with only three games (Grok had won all three) says little, so look at the models with the most games.'),

      h2('What Does GPT Stand For?'),
      p('GPT is <b>Generative Pre-trained Transformer</b>:'),
      ul([
        '<b>Generative</b> — it generates: it predicts what comes next after a sequence of input.',
        '<b>Pre-trained</b> — it was trained beforehand on huge amounts of data from the internet and other sources.',
        '<b>Transformer</b> — the type of neural network it uses. This is what we look at now.',
      ]),
      note('The course does not start with the inside of a transformer. It reveals the details gradually, over eight weeks, through code. For now, the goal is intuition: the <b>story</b> of the transformer.'),

      h2('Step 1: From Traditional Models to Neural Networks'),
      p('In <b>traditional data science</b>, a statistical model predicts an outcome from some inputs. Take a credit score: you gather examples of many people with their factors and their known scores, and the model learns how to weigh each factor (its <b>parameters</b>). Then it can estimate the score of a new person.'),
      p('In the 1950s came the <b>neural network</b>, loosely inspired by the brain: instead of one statistical program, many small programs (<b>artificial neurons</b>) connected together. It proved very good at learning patterns. Its history had ups and downs, and the breakthroughs were mostly about training bigger networks on more data. Stacking many layers of neurons is what makes it <b>deep</b> — hence <b>deep neural network</b> and <b>deep learning</b>.'),

      h2('Step 2: The 2017 Paper'),
      p('In 2017, scientists at Google published <b>"Attention Is All You Need"</b>. It proposed a new <b>architecture</b> — a way of connecting the neurons — that is especially good with <b>sequences</b>, like text. Its key piece is the <b>attention layer</b>: a layer that works out which parts of the input sequence matter most for the current step.'),
      p('Why that mattered: this design lets you train much <b>bigger networks on much more data in less time</b>. It scales far better. The authors themselves seemed not to realize how big the discovery was; they thought of it as a useful optimization.'),

      h2('Step 3: The GPT Timeline'),
      table(['Year', 'Event'], [
        ['2017', 'The transformer paper, from Google.'],
        ['2018', 'OpenAI releases GPT-1. It was basic — OpenAI was then a young research lab, not yet a household name.'],
        ['2019', 'GPT-2.'],
        ['2020', 'GPT-3 — many practitioners sensed that something big was happening.'],
        ['2022', 'ChatGPT, based on GPT-3.5 and trained with RLHF so that it works as a chat (system prompt, user prompt, reply).'],
        ['2023', 'GPT-4.'],
        ['2024', 'GPT-4o, the multimodal version.'],
        ['Since', 'GPT-5 and beyond.'],
      ]),

      h2('Is the Transformer Special?'),
      p('One honest point: nobody believes the transformer is <b>fundamentally necessary</b> for models like these. It is an <b>efficiency</b> gain — it let us train with more data and more parameters, faster and cheaper. Without it, we might have reached today\'s models later, and API costs might be 10 or 100 times higher.'),
      p('There are alternatives (such as state-space and hybrid architectures), but none has definitively proven better yet, so the transformer is still the dominant architecture for LLMs.'),
      K.remember([
        'GPT = Generative Pre-trained Transformer.',
        'A neural network is many connected small programs; "deep" means many layers.',
        'The 2017 paper "Attention Is All You Need" introduced the transformer: attention layers decide which parts of the input matter, and the design scales very well.',
        'The transformer is an efficiency breakthrough, not a proven necessity; other architectures exist.',
      ]),
      sources('<p>Transcript: <code>' + T + '26-Day 4 - Understanding Transformers- The Architecture Behind GPT and LLMs.txt</code>. The Outsmart result is the one shown in the lecture; it was a single run. The lecture treats the history in outline; GPT-4o is described as "last year\'s" model at the time.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 27
  JT.def('llm_lstm_to_transformers', {
    title: 'From LSTMs to Transformers: Attention, Emergent Intelligence and Agentic AI',
    h1: 'From LSTMs to Transformers: <span>Attention and Emergent Intelligence</span>',
    body: () => [
      p('The last lesson told the story forward. Now we look at what the transformer replaced, why it won, and the surprising thing about it. Then we place four buzzwords you will hear all the time.'),

      h2('Before the Transformer: The LSTM'),
      p('The most-used model for sequences was the <b>LSTM</b> (long short-term memory), a type of <b>recurrent neural network</b>. It reads a sequence one element at a time and carries a running "memory" forward, which makes it a natural fit for text. Some practitioners consider it very capable at modelling the relationships inside a sequence; its weakness was <b>scale</b>.'),
      p('Its problem: it must process the input <b>step by step</b>. The result of one step feeds the next, so you cannot run the calculations at the same time. Training was slow and complicated, and that made it hard to train on very large amounts of data.'),

      h2('Why Attention Won'),
      p('The transformer is, in some ways, a <b>simplification</b>: it drops the clever step-by-step machinery. The paper\'s title, "Attention Is All You Need", says exactly that: the simple attention construct is enough. And because it can run in <b>parallel</b>, it can be scaled to far bigger models and datasets. That benefit outweighed the simplification, and the results speak for themselves.'),

      h2('The Surprise: Emergent Intelligence'),
      p('By 2023 the transformer was everywhere, and a backlash grew alongside the excitement. Its best-known expression is the paper "On the Dangers of Stochastic Parrots" (published in 2021, and widely discussed once ChatGPT arrived). Its authors worried that people would treat simple statistical models, which predict likely next words, as sources of truth: the model is "predictive text on steroids". Reading that paper shows the concern at the time.'),
      p('But here is what even the experts did not expect. That we can predict plausible words is not surprising: it is just very good predictive text. What <b>is</b> surprising is that, as a side effect, the predicted words are so often <b>true</b>. Give it a math problem and you would expect text that <i>sounds like</i> an answer — yet it is often <i>the</i> answer. We understand the statistics, but not fully why it works so well. This is called <b>emergent intelligence</b>: with enough scale, a model does not only produce likely tokens but tokens that imitate intelligence accurately.'),
      note('Two cautions. First, keep the balance from Lesson 21: the model is usually right, but it is <b>still predicting</b>, which is why hallucinations happen. Second, "emergent" is a descriptive label, not a settled explanation: researchers still debate how sudden these abilities really are, and how much depends on how we measure them.'),

      h2('Four Terms You Will Hear Everywhere'),
      h3('Prompt engineering'),
      p('Once a high-paid job title. Now everyone is a prompt engineer: we all know the tricks — explain the context, give background, say the style you want.'),
      h3('Copilots'),
      p('Microsoft Copilot, GitHub Copilot and similar. The moment people saw humans and LLMs <b>working together</b> on a document or code: automating manual work and enriching it.'),
      h3('Context engineering'),
      p('The newer idea. Think broadly about <b>everything</b> you can give the model to set it up for success: business-specific information placed in the prompt, put together well, plus <b>tools</b> (Week 2). It is not fancy: it is better input, so the output is more aligned to the task. If you want the model to tell customers about ticket prices, the prices must be in the input, so that the predicted tokens include the right ones.'),
      h3('Agentic AI'),
      p('The hottest topic. There are many definitions. Two common ones:'),
      ul([
        'A system where <b>an LLM controls the workflow</b>: it decides what happens next, possibly calling other LLMs and using tools.',
        'An <b>LLM in a loop with tools</b>: it is called repeatedly, and its tools let it take actions. If you have used Claude Code, you have seen it — a to-do list, a plan, and items ticked off one by one, each a series of LLM calls.',
      ]),
      p('And <b>autonomy</b>? It sounds like magic, but it is mechanical: the model generates output text, and that text can include instructions about what to do next (use a tool, call another model). When the output <b>chooses its own next step</b>, that is autonomous behavior. Week 8 builds a full agentic platform.'),
      K.remember([
        'LSTMs process sequences step by step, which is hard to parallelize; attention allows parallelism and so scales far better.',
        'Emergent intelligence: at scale, predicted tokens are often not only plausible but correct. We do not fully understand why.',
        'Context engineering = giving the model the best possible input (information and tools). Agentic AI = an LLM that controls the workflow, often in a loop with tools.',
      ]),
      sources('<p>Transcript: <code>' + T + '27-Day 4 - From LSTMs to Transformers- Attention, Emergent Intelligence &amp; Agentic A.txt</code>. The lecture places the "stochastic parrots" paper among the 2023 reactions; the paper itself dates from 2021, so the lesson gives its real date. The LSTM sentence is worded more cautiously than in the lecture, because which model is "more powerful" depends on scale and task.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 28
  JT.def('llm_parameters', {
    title: 'Parameters: From Millions to Trillions',
    h1: 'Parameters: <span>From Millions to Trillions</span>',
    body: () => [
      p('You have heard "parameters" since Lesson 1 (<code>gemma3:270m</code>, 3.2 billion for Llama 3.2). Now we explain what they are, why the numbers grew so fast, and the two ways to get more from a model.'),

      h2('What Is a Parameter?'),
      p('A parameter is one of the numbers inside a model that is <b>learned during training</b> and then controls how the model behaves. In a traditional model, such as the credit-score example, there were typically 20 to 200 of them. A neural network has millions, billions, and now trillions.'),
      p('You can see this number for a model you have downloaded. Ask Ollama to describe one:'),
      run('ollama show gemma3:270m', 'Example'),
      term('ollama show gemma3:270m', `Model
  architecture        gemma3
  parameters          268.10M
  context length      32768
  embedding length    640
  quantization        Q8_0
  [...]`, 'Our run (shortened)'),
      p('<code>parameters 268.10M</code> is the 270 million from the model name. Compare with Llama 3.2:'),
      run('ollama show llama3.2', 'Example'),
      term('ollama show llama3.2', `Model
  architecture        llama
  parameters          3.2B
  context length      131072
  embedding length    3072
  quantization        Q4_K_M
  [...]`, 'Our run (shortened)'),
      p('3.2 <b>billion</b> parameters, about twelve times more than Gemma 270M. (The other lines can wait: <b>context length</b> is explained in Lesson 32, and <b>quantization</b> later in the course.)'),

      h2('How Fast the Numbers Grew'),
      table(['Model', 'Parameters'], [
        ['Traditional machine learning', 'roughly 20-200'],
        ['GPT-1', '117 million'],
        ['GPT-2', '1.5 billion'],
        ['GPT-3', '175 billion'],
        ['GPT-4', 'reported about 1.76 trillion (not officially confirmed)'],
        ['Latest frontier models', 'not published; probably tens of trillions'],
      ]),
      p('Interesting: the count has not only gone up. We got far better at packing information into fewer parameters. The smallest Gemma has only 270 million parameters — far fewer than the 1.5 billion of GPT-2 above — and yet it is the more capable model. As a general rule, though, more parameters means more intelligence, because more training information has been absorbed.'),
      p('This is why models come in sizes: GPT-5 has <i>nano</i>, <i>mini</i> and full versions; Claude has <i>Haiku</i>, <i>Sonnet</i> and <i>Opus</i>. Companies do not publish exact numbers, but the understanding is that they are three increasing sizes, and the price reflects the compute cost of using all those parameters.'),

      h2('Two Ways to Get More from a Model'),
      h3('Training-time scaling'),
      p('Make the model <b>bigger</b> and train it on more data. A rule of thumb from a few years ago (the <b>Chinchilla scaling laws</b>) says the number of parameters is roughly proportional to the amount of training data a model can usefully absorb. Bigger model, more training, more cost.'),
      h3('Inference-time scaling'),
      p('Remember that <b>inference</b> means running a trained model. Some tricks make a model better when you <b>run</b> it, without changing the model:'),
      ul([
        '<b>Reasoning</b> — have it generate thinking tokens before answering (Lesson 20), even with the "Wait" trick. This spends more computation at run time, and it is what the term "inference-time scaling" most often means.',
        '<b>More information in the input</b> — such as the ticket prices example. The model draws on the input while it generates. This is the idea behind <b>RAG</b>, which we study later. It is often grouped with reasoning because both improve results at run time, with no retraining; strictly, it supplies more <i>information</i> rather than more <i>computation</i>.',
      ]),
      p('Until about two years ago, "bigger is better" was the whole story. RAG came first as a run-time technique, and in the last year reasoning techniques have taken off. The two tracks are independent, and <b>you can use both</b>.'),

      h2('Model Sizes at a Glance'),
      p('Here are some open models on a <b>logarithmic</b> scale (each step is 10 times bigger, not one more):'),
      table(['Model', 'Parameters'], [
        ['Llama 3.2', '3 billion (about twice GPT-2, but far more capable)'],
        ['Llama 3.1', '8 billion'],
        ['Llama 3.3', '70 billion (the README warns it is too big for home computers)'],
        ['GPT-OSS', '20 billion and 120 billion versions'],
        ['DeepSeek', '671 billion'],
      ]),
      note('Llama 3.3 is sometimes quoted with a different size, but the course README states it as <b>70 billion</b>, so that is the figure used here. Also, most of the largest models are <b>mixture of experts</b>: they contain many smaller specialist sub-networks ("experts"), and only some of them are used for each token the model processes.'),
      tryit('Run <code>ollama show</code> on another model you downloaded (for example <code>phi3</code> or <code>deepseek-r1:1.5b</code>) and compare its parameter count with its size in <code>ollama list</code>. More parameters usually means a bigger file.'),
      K.remember([
        'Parameters are the learned numbers inside a model; the count is a measure of model size (millions, billions, trillions).',
        'More parameters generally means more capability, but better training lets small models do far more than old large ones.',
        'Two ways to improve: training-time scaling (bigger model, more data) and inference-time scaling (reasoning, more input information, RAG).',
        'Frontier labs usually do not publish parameter counts.',
      ]),
      sources('<p>Transcript: <code>' + T + '28-Day 4 - Parameters- From Millions to Trillions in GPT, LLaMA & DeepSeek.txt</code>. Local output: <code>ollama show</code> on this machine. Llama 3.3 at 70B: <code>ai/llm_engineering/README.md</code>. GPT-4\'s count is the lecture\'s figure and is not officially confirmed.</p>'),
    ].join(''),
  });
})();
