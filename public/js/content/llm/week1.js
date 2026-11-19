// LLM Engineering, Week 1.
// Source: ai/transcript/01-Week 1 .../01-Day 1 - Running Your First LLM Locally with Ollama and Open Source Models.txt
// and the "Instant Gratification" section of ai/llm_engineering/README.md.
// Outputs shown were produced on Windows with Ollama 0.40.16.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, h3, ul, ex } = JT.h;
  const K = JT.kit;
  // A command typed in the terminal, with what the terminal printed.
  const term = (code, result, title, label) => K.rails(code, { title: title || 'Terminal', lang: 'text', result, label: label || 'Output' });
  // A command the page can send to the local Ollama (Run here / Try it Yourself).
  const run = (code, title) => ex(code, { title: title || 'Example', lang: 'ollama' });
  const note = (html) => '<div class="note"><p>' + html + '</p></div>';
  const tryit = (html) => '<div class="note"><p><strong>Try it yourself:</strong> ' + html + '</p></div>';

  JT.def('llm_home', {
    title: 'Running Your First LLM Locally with Ollama',
    h1: 'Run Your First <span>LLM Locally</span>',
    body: () => [
      p('In this lesson we run a Large Language Model (LLM) on our own computer and chat with it. We start with action; the theory behind what you see comes later in the course.'),

      // ---------------------------------------------------------------
      h2('Running an LLM Locally'),
      p('When you use ChatGPT, Claude or Gemini, your message travels over the internet to the provider\'s computers. The model runs <b>there</b>, and only the answer comes back.'),
      p('Running a model <b>locally</b> flips this. You download the model files, and <b>your</b> computer does the work of producing the answer. Once a model is downloaded, the conversation does not depend on a cloud service.'),
      p('Why start here? Because it removes every barrier: no account, no API key, no cost per message. You get to interact with a real LLM in minutes, and what you learn carries into the rest of the course.'),
      note('<b>"Open-source" vs "open-weight":</b> the models in this lesson are published so that anyone can download and run them. Strictly speaking, most of them are <b>open-weight</b> — the trained model itself is released, but not necessarily everything used to build it. Each model has its own license, which you can read on its page at <code>ollama.com</code>. The course calls them "open-source", and we will too.'),

      // ---------------------------------------------------------------
      h2('What is Ollama?'),
      p('A model file cannot run by itself. Something has to load it into memory, feed it your message and show you the reply.'),
      p('<b>Ollama</b> is that program. It runs open models on your computer in a fast, packaged way, and it behaves the same on Windows, Mac and Linux. Its name is a tribute to <b>Llama</b>, one of the first open models, built by Meta.'),
      K.tip('The course repository (<code>ai/llm_engineering/</code>) has a <code>README.md</code> with an <b>Instant Gratification</b> section covering this lesson. The README is updated often, so check it first if something looks different on your machine.'),

      // ---------------------------------------------------------------
      h2('Installing and Verifying Ollama'),
      p('Go to <code>ollama.com</code>, press <b>Download</b>, choose your system and install it the usual way. On Windows you may need administrator permissions; on a Mac the current release needs macOS 14 or later. Then launch Ollama from the Start menu or Applications folder.'),
      p('A small chat window opens. <b>Close it.</b> Closing the window does not stop Ollama — it keeps running in the background. We close the window because we will talk to Ollama from the command line, which is how engineers work with LLMs.'),
      p('Open a command line: on <b>Windows</b>, type <b>PowerShell</b> in the Start menu; on a <b>Mac</b>, open Applications → Utilities → <b>Terminal</b>; on Linux, your usual terminal. Every command in this lesson is typed there.'),

      h3('Is the installation working?'),
      p('Ask Ollama to list what it can do:'),
      run('ollama --help', 'Example'),
      term('ollama --help', `
        Large language model runner

        Usage:
          ollama [flags]
          ollama [command]

        Available Commands:
          serve        Start Ollama
          run          Run a model
          pull         Pull a model from a registry
          list         List models
          ...`),
      p('<code>ollama</code> is the program, and <code>--help</code> asks it to describe itself. Seeing this list proves the operating system can find the program. Ollama is driven by <b>commands</b>; the two we need now are <code>serve</code> and <code>run</code>.'),
      note('Typing plain <code>ollama</code> also works. Older versions print this same help; newer versions (like 0.40) open an interactive menu instead — press <b>Esc</b> to leave it.'),

      h3('Is Ollama running?'),
      p('A model can only run if Ollama itself is running. The command that starts it is <code>ollama serve</code>, so let\'s try it:'),
      term('ollama serve', 'Error: listen tcp 127.0.0.1:11434: bind: Only one usage of each socket address (protocol/network address/port) is normally permitted.', 'Terminal (Windows)'),
      p('An error, but a useful one. Launching Ollama from its icon already started it, and it is listening at a local address (<code>127.0.0.1:11434</code>). This second <code>serve</code> tried to use the same address and was refused — so the first copy must be running. On a Mac or Linux the message says <code>address already in use</code>.'),
      p('If Ollama instead says it <b>started</b>, that is fine too: leave that window open and use a second window for the next steps.'),

      // ---------------------------------------------------------------
      h2('Running Our First Model: Gemma 3'),
      p('<b>Gemma</b> is a family of models from Google, the small cousin of Gemini (Google\'s flagship model). Gemini is offered as a cloud service; Gemma is the family whose weights Google released for download. <b>Gemma 3</b> is its latest version.'),
      p('Models come in different sizes, and we will begin with a very small one so the download is quick and any computer can run it:'),
      term('ollama run gemma3:270m', '>>> Send a message (/? for help)'),

      h3('The command, part by part'),
      ul([
        '<code>ollama run</code> — run a model and start a chat with it.',
        '<code>gemma3</code> — the model\'s name.',
        '<code>:270m</code> — a <b>tag</b> that selects which version of the model. Here it selects the size: 270 million <b>parameters</b>.',
      ]),
      p('What is a parameter? The course studies this properly later. For now, treat the parameter count as a measure of the model\'s <b>size</b>. 270 million sounds large, but models are usually measured in <b>billions</b>, so this is a tiny one.'),

      h3('What happens when you press Enter'),
      ul([
        '<b>Ollama looks for the model file on your computer.</b> A model is a file of numbers (its parameters), and it must be loaded before it can answer.',
        '<b>If the file is missing, Ollama downloads it.</b> This happens only the first time. On our machine <code>gemma3:270m</code> was 291 MB, which takes seconds or a few minutes depending on your connection.',
        '<b>Ollama loads the model into memory and opens a chat.</b> The <code>&gt;&gt;&gt;</code> prompt means the model is running on your computer and waiting for you.',
      ]),
      p('Run the command again later and it starts without downloading anything.'),

      h3('Chatting'),
      p('Type after the <code>&gt;&gt;&gt;</code> prompt and press Enter:'),
      term('>>> hi there', 'Hi there! How can I help you today? 😊', 'Chat'),
      term('>>> My name is Ed', 'Hi Ed, I\'m here to help! What can I do for you today?', 'Chat'),
      p('That reply was generated by the model on your machine. To <b>end the chat</b>, press <b>Ctrl + D</b>.'),
      K.warn('On a Mac, use the <b>Control</b> key, not Command. Command + D does not end the chat.'),

      h3('Sending one message from this page'),
      p('The terminal chat is interactive. If you give <code>ollama run</code> the message in quotes, it answers once and exits instead of opening <code>&gt;&gt;&gt;</code>. That is what the buttons below use, and they ask your local Ollama, exactly like the terminal does:'),
      run('ollama run gemma3:270m "hi there"', 'Example'),
      tryit('Press <b>Try it Yourself</b>, change the text inside the quotes (for example, to <code>"My name is Ed"</code>), and run it. Then run the <b>same</b> message again. The wording changes between runs, because an LLM generates a fresh reply each time — you should expect similar, not identical, answers. Your output will not match ours word for word.'),

      // ---------------------------------------------------------------
      h2('Model Size and Why It Matters'),
      p('Chat with this model for a few minutes and you will see how limited it is. It may lose track of the conversation or misread you — for example, it can answer "My name is Ed" as though Ed were <i>its</i> name. This is not a problem with your setup. A very small model simply has less capacity, so it makes more mistakes.'),
      p('Which raises the question: does a bigger model do better? Let\'s see which sizes exist. On <code>ollama.com</code>, open <b>Models</b> to see everything Ollama can run. Most models come in several sizes. For Gemma 3:'),
      ul([
        '<code>gemma3:270m</code> — the tiny one we just used.',
        '<code>gemma3</code> with no tag — this means <code>gemma3:latest</code>, which was a 3.3 GB download when this course was written.',
        'Several sizes in between.',
      ]),
      p('Two details are worth getting right:'),
      ul([
        '<b>Parameters and file size are related, but they are not the same thing.</b> The parameter count is the model\'s size in numbers (270 million). The file size is how much disk those numbers take (291 MB). More parameters generally means a bigger file, but the file size is the number to check before you download.',
        '<b><code>latest</code> is just a tag.</b> It is the version the model\'s page marks as the default, and it is not necessarily the biggest or the one you want. When size matters, name the size explicitly, as we did with <code>:270m</code>.',
      ]),
      p('This is the trade-off behind all those sizes. Bigger models tend to hold more robust conversations, but they need more disk space, more memory and a faster computer. Smaller ones download quickly and run almost anywhere, but are easier to confuse.'),

      h3('See what you have downloaded'),
      run('ollama list', 'Example'),
      p('<code>ollama list</code> shows every model on your computer with its size on disk. Here is what it printed on our machine, after downloading Gemma 3:'),
      term('ollama list', `
        NAME                     ID              SIZE      MODIFIED
        gemma3:270m              e7d36fb2c3b3    291 MB    19 minutes ago
        llama3.2:latest          a80c4f17acd5    2.0 GB    3 months ago
        embeddinggemma:latest    85462619ee72    621 MB    3 months ago`),
      p('Your list will show your own models. Notice that the name includes the tag: Ollama stores <code>llama3.2:latest</code>, even though we would type just <code>llama3.2</code>.'),

      // ---------------------------------------------------------------
      h2('Running a Larger Model: Phi-3'),
      p('Let\'s try <b>Phi-3</b>, a bigger model from Microsoft. It needs about <b>2.2 GB</b> of free disk space and a reasonably fast computer.'),
      term('ollama run phi3', '>>> Send a message (/? for help)'),
      p('<code>ollama run</code> is already familiar. What is new is <code>phi3</code> with <b>no tag</b>, so Ollama uses <code>phi3:latest</code>. The model is not on your computer yet, so Ollama downloads it first, and then you get the same <code>&gt;&gt;&gt;</code> prompt.'),
      p('Now ask it something more open-ended than "hi there":'),
      term('>>> Tell me a fun fact', '(a fact — different every time)', 'Chat'),
      term('>>> Tell me another', '(a different fact)', 'Chat'),
      p('Look at two things. First, does "Tell me another" make sense to the model — does it understand that you mean another fun fact? That tests whether it tracks the conversation. Second, your facts will differ from anyone else\'s, because each run generates a new answer. Press <b>Ctrl + D</b> to leave.'),
      p('Once Phi-3 is downloaded, you can ask it from this page too. Until then, <b>Run here</b> tells you to download it first with <code>ollama pull phi3</code>:'),
      run('ollama run phi3 "Tell me a fun fact"', 'Example'),

      h3('Compare two models yourself'),
      p('The best way to understand size is to give two models the <b>same</b> question. The first example below uses the tiny Gemma; the second uses <b>Llama 3.2</b>, the model the course README suggests for smaller computers (<code>ollama run llama3.2</code>). If you have not downloaded it, the button tells you to run <code>ollama pull llama3.2</code> first.'),
      run('ollama run gemma3:270m "Tell me a fun fact"', 'Tiny model'),
      run('ollama run llama3.2 "Tell me a fun fact"', 'Larger model'),
      p('Here is what each printed on our machine. Yours will differ, but compare the <i>kind</i> of answer:'),
      term('ollama run gemma3:270m "Tell me a fun fact"', 'Okay, here\'s a fun fact:', 'gemma3:270m (our run)'),
      term('ollama run llama3.2 "Tell me a fun fact"', `
        Did you know that there is a species of jellyfish that is immortal? The Turritopsis dohrnii, also known as the "immortal jellyfish," is a type of jellyfish that can transform its body into a younger state through a process called transdifferentiation. [...]`, 'llama3.2 (our run)'),
      p('On this run the tiny model announced a fact and never gave one, while the larger model gave a complete answer. That is a single sample, not a guarantee: a small model can sometimes do well, and a larger one can sometimes fail. Run each a few times before you decide. Also check the time shown under each result — the larger model needed noticeably longer, which is the cost side of the trade-off.'),
      note('We have not verified the fact the model gave; LLMs can state wrong things confidently. Treat any answer as generated text, not as checked information.'),

      // ---------------------------------------------------------------
      h2('A Big Model: GPT-OSS (Optional)'),
      p('The largest model in this lesson is <b>GPT-OSS</b>, an open-weight model from OpenAI. We use its <b>20 billion</b> parameter version:'),
      term('ollama run gpt-oss:20b', '>>> Send a message (/? for help)'),
      p('For scale: <code>gemma3:270m</code> has 270 <b>million</b> parameters, and this one has 20 <b>billion</b>. Phi-3 sits in between, with billions of parameters, and GPT-OSS is many times larger than it.'),
      K.warn('This step needs at least <b>16 GB of RAM</b> and about <b>20 GB of free disk space</b>. The download is long, and the model works your computer hard. If your machine is smaller, skip it — Phi-3 or Llama 3.2 is enough to continue.'),
      p('We will put this model to real use in the next lesson.'),

      // ---------------------------------------------------------------
      h2('If Something Does Not Work'),
      ul([
        '<b>Computer too small?</b> Use <code>ollama run llama3.2</code>, or <code>ollama run llama3.2:1b</code> for an even smaller one.',
        '<b>Avoid <code>llama3.3</code>.</b> At 70 billion parameters it is far too large for most home computers.',
        '<b>Command fails?</b> Run <code>ollama serve</code> in a second terminal window, then try again. On Windows, you may need to open PowerShell as Administrator.',
        '<b>Still stuck?</b> The README links to a free Google Colab notebook (needs a Google account) that does the same in the cloud.',
      ]),
      note('<b>About the Run here buttons:</b> they only use models that are already downloaded, so a click never starts a large download. Download with <code>ollama pull &lt;model&gt;</code> in your own terminal. The interactive <code>&gt;&gt;&gt;</code> chat and <code>ollama serve</code> also need your own terminal.'),

      // ---------------------------------------------------------------
      h2('Key Takeaways'),
      K.remember([
        'Running locally means a downloaded model runs on your computer. Ollama is the program that does it.',
        '<code>ollama run name:tag</code> downloads the model the first time, loads it, and opens a chat. The tag usually selects the size; with no tag you get <code>latest</code>, which is not necessarily the biggest.',
        'Parameter count is model size; file size is disk space. They are related but different, so check the file size before you download.',
        'Bigger models tend to converse better but need more disk, memory and time. Small models are fast and light but easier to confuse.',
        'An LLM generates new text on each run, so answers vary. Compare models by giving them the same prompt several times.',
        '<code>ollama serve</code> failing with an "address in use" error means Ollama is already running. Ctrl + D ends a chat.',
      ]),

      '<details class="qa"><summary>Sources for this lesson</summary><div><p>Transcript: <code>ai/transcript/01-Week 1 - Build Your First LLM Product- Exploring Top Models/01-Day 1 - Running Your First LLM Locally with Ollama and Open Source Models.txt</code>. Repository: <code>ai/llm_engineering/README.md</code>, section "Instant Gratification". This lesson has no notebook code; commands come from the transcript and README. Outputs were produced on Windows with Ollama 0.40.16; the Llama 3.2 comparison is an added exercise built from the README\'s own suggestion. Phi-3 and GPT-OSS replies are not shown because those models were not run on the test machine.</p><p>The transcript ends as the GPT-OSS chat begins; that conversation continues in the next lesson ("Spanish Tutor Demo").</p></div></details>',
    ].join(''),
  });
})();
