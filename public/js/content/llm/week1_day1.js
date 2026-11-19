// LLM Engineering, Week 1 Day 1 (continued): lessons 2-9. Each lesson cites its transcript in the Sources box.
// Outputs shown were produced on Windows with Ollama 0.40.16, git 2.41, uv 0.12.0, Python 3.12.12.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, h3, ul, ol, ex } = JT.h;
  const K = JT.kit;
  const term = (code, result, title, label) => K.rails(code, { title: title || 'Terminal', lang: 'text', result, label: label || 'Output' });
  const run = (code, title, lang) => ex(code, { title: title || 'Example', lang: lang || 'ollama' });
  const note = (html) => '<div class="note"><p>' + html + '</p></div>';
  const tryit = (html) => '<div class="note"><p><strong>Try it yourself:</strong> ' + html + '</p></div>';
  const sources = (html) => '<details class="qa"><summary>Sources for this lesson</summary><div>' + html + '</div></details>';
  const T = 'ai/transcript/01-Week 1 - Build Your First LLM Product- Exploring Top Models/';

  // ---------------------------------------------------------------- 2
  JT.def('llm_spanish_tutor', {
    title: 'Spanish Tutor Demo and Course Overview',
    h1: 'Spanish Tutor Demo <span>and Course Overview</span>',
    body: () => [
      p('A local model is not only a toy. In this lesson we give it a real job, and then we look at the road ahead.'),

      h2('Giving the Model a Job'),
      p('So far we only said "hi". Now let\'s ask for something useful: a conversation partner for learning Spanish. This is the kind of feature you see in commercial language apps.'),
      p('Before we run it, notice what we are doing: we are not writing any logic for teaching Spanish. We describe the job in plain English, and the model decides how to behave. The message <b>is</b> the program.'),
      p('Here is the request, sent as a single message:'),
      run('ollama run llama3.2 "Hi, I am trying to learn Spanish. I am a total beginner. Please have a conversation with me as my Spanish tutor."', 'Example'),
      p('On our machine, <code>llama3.2</code> answered like this:'),
      term('ollama run llama3.2 "Hi, I am trying to learn Spanish. ..."', `
        ¡Hola! (Hello!) I'm thrilled to be your Spanish tutor. Don't worry if you're a total beginner - we'll take it one step at a time, and I'll help you learn Spanish in a fun and interactive way.

        To get us started, can you tell me a little bit about yourself? Where are you from, and what do you want to achieve with your Spanish learning journey? ¿De dónde eres? (Where are you from?)`, 'Our run'),
      p('Look at what the model did without being told how: it greeted you in Spanish, translated each phrase, and ended with a question so that <b>you</b> speak next. In the interactive chat (<code>ollama run llama3.2</code> in your terminal) you would answer, for example, <i>"Hola, me llamo Ed"</i>, and the tutor would continue step by step.'),
      tryit('Press <b>Try it Yourself</b> and change the request: ask for a different language, or say you are an intermediate learner. Run it twice — the replies will differ, because the model generates new text each time.'),

      h3('What the bigger model does differently'),
      p('The larger <code>gpt-oss:20b</code> model shows something extra. Before the final answer, it first prints its <b>thought process</b> (in grey, in the terminal), and only then the answer. These are <b>thinking models</b>, and the course returns to them in the coming days — for now, just recognize them when you see them.'),
      p('The more important point: bigger models tend to handle this kind of conversation more intelligently. Try the same request on different sizes (<code>gemma3:270m</code>, <code>llama3.2</code>, <code>phi3</code>) and compare.'),

      h2('The Eight-Week Map'),
      p('You have used an LLM before you know how it works. That is deliberate. Now, here is where the course goes. Each week builds on the one before:'),
      ol([
        '<b>Week 1 — Foundations.</b> Build your first LLM solution, and gain early intuition for what transformers are.',
        '<b>Week 2 — Frontier models.</b> Work with the leading models, and build multi-modal chatbots.',
        '<b>Week 3 — Open-source models.</b> Run and use open models with Hugging Face.',
        '<b>Week 4 — Choosing the right model.</b> Select the model that fits the task.',
        '<b>Week 5 — RAG.</b> One of the hottest techniques in AI, covered in depth.',
        '<b>Week 6 — Fine-tune a frontier model.</b>',
        '<b>Week 7 — Fine-tune an open-source model.</b>',
        '<b>Week 8 — Agentic AI.</b> The final week brings it all together.',
      ]),
      p('Three layers make up the curriculum:'),
      ul([
        '<b>Models</b> — different LLMs, open-source and closed-source.',
        '<b>Toolkits</b> — libraries and platforms that use those LLMs: Hugging Face, Gradio (user interfaces), LangChain, Weights &amp; Biases and Modal.',
        '<b>Techniques</b> — ways to get more out of a model: RAG, fine-tuning and agents.',
      ]),
      p('And the method is <b>learning by building</b>: multi-modal projects, consumer-style applications, a code-porting project (converting code from one language to another), projects with vectors and training charts, and a large commercial project at the end.'),
      K.remember([
        'You control an LLM with plain-language instructions: describing the job in the message is enough to make it behave as a tutor.',
        'Thinking models show their reasoning before the final answer; bigger models generally handle richer tasks better.',
        'The course order is: foundations, frontier models, open-source models, model selection, RAG, two kinds of fine-tuning, then agents.',
      ]),
      sources('<p>Transcript: <code>' + T + '02-Day 1 - Spanish Tutor Demo with Open-Source Models &amp; Course Overview.txt</code>. The demo in the lecture used <code>gpt-oss:20b</code>; the runnable example here uses <code>llama3.2</code>, which the course README recommends for smaller computers. The lecture\'s personal introduction (background, LinkedIn) is not a teaching topic and is left out.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 3
  JT.def('llm_ai_engineer_path', {
    title: 'Your Path to Becoming a Proficient AI Engineer',
    h1: 'Your Path to Becoming <span>an AI Engineer</span>',
    body: () => [
      p('Before we start building, it helps to know where this course sits in a bigger curriculum, so you know what it covers — and what it leaves for others.'),

      h2('Six Courses, Six Different Goals'),
      p('The curriculum has six courses. They complement each other, with little overlap:'),
      ul([
        '<b>AI Builder</b> — create agents and voice agents for your business without writing code (with tools such as n8n and ElevenLabs).',
        '<b>AI Coder</b> — build software and products fast using coding agents such as Claude Code.',
        '<b>AI Leader</b> — deliver AI projects, transform a business with AI, and even start an AI business.',
        '<b>AI Engineer Core Track</b> — <b>this course</b>: LLMs and APIs, open-source LLMs, RAG and fine-tuning. It prepares you to select, apply and optimize LLMs to solve real commercial problems.',
        '<b>AI Engineer Agentic Track</b> — the same idea with autonomous agents: agent loops, the OpenAI Agents SDK, MCP.',
        '<b>AI Engineer Production Track</b> — deploy LLMs and agents at scale on AWS, GCP and Azure, with resilience, observability and security.',
      ]),
      p('The first three suit technical and non-technical people alike. The Core and Agentic tracks suit people who are technical or becoming technical. The Production track suits people who are already technical, or who have finished the earlier courses.'),

      h2('In What Order?'),
      p('Any order works. The natural progression is the order above, from one to six, but you should pick the topic that interests you. Completing all six and delivering their projects is what the curriculum calls a proficient AI engineer, ready for roles such as AI engineer or applied AI engineer.'),
      note('<b>Where you are now:</b> in the Core Track — the course this Learning Hub follows, week by week. The sidebar shows the lessons.'),
      K.remember([
        'This course is the AI Engineer <b>Core</b> track: LLMs, APIs, open-source models, RAG and fine-tuning.',
        'The Agentic and Production tracks continue where this one ends; the three Builder/Coder/Leader courses cover other skills.',
      ]),
      sources('<p>Transcript: <code>' + T + '03-Your Path to Becoming a Proficient AI Engineer.txt</code>. Promotional details (final-lecture document and student offers) are not part of the lesson.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 4
  JT.def('llm_setup_overview', {
    title: 'Setting Up Your LLM Development Environment',
    h1: 'Set Up Your <span>Development Environment</span>',
    body: () => [
      p('From here until the first project, we prepare the workspace you will use for the next eight weeks. This is the part of the course where most problems happen, so we go through it with a clear map.'),

      h2('Why We Need a Setup'),
      p('Running <code>ollama run</code> needs only one program. Building LLM <b>applications</b> needs more: the course code, an editor, the right Python version and exactly the right packages, and (optionally) a key to call a cloud model. If any piece is missing or different, code that works on one computer fails on another.'),
      p('So the setup does one job: it makes your computer match the course.'),

      h2('The Five Steps'),
      ol([
        '<b>Clone the repository and open it in an editor.</b> "Cloning" copies all the course code from GitHub to your computer. The course uses <b>Cursor</b> as its editor, but any editor works.',
        '<b>Install uv and build the environment.</b> uv is a tool that manages Python and the packages the course depends on.',
        '<b>Create an OpenAI API key.</b> Optional — a free alternative exists, and we will use it too.',
        '<b>Put the key in a <code>.env</code> file.</b> The file name and key name must be exactly right.',
        '<b>Start.</b> There is no real step five: after step four, you open the first notebook and begin.',
      ]),
      p('Steps 1 differs between Windows and Mac, so it has two lessons. From step 2 on, everything is the same for both.'),

      h2('Before You Begin: Common Traps'),
      p('The course\'s setup guide opens with a short list of problems that trip people up. Check them first:'),
      ul([
        '<b>Anti-virus, firewall or VPN</b> can block installs and network access. Try turning them off briefly, or use a phone hotspot to find out whether the network is the problem.',
        '<b>Windows 260-character path limit</b> — long file names inside the project can break the install. The guide explains how to test for it and how to fix it.',
      ]),
      p('When something fails, use this order: (1) the setup guide, (2) the troubleshooting notebook in the <code>setup</code> folder, (3) an AI assistant to help find the cause — but <b>verify</b> what it tells you instead of blindly doing it, (4) ask the course instructor.'),
      note('Which lesson next? On <b>Windows</b>, open "Setting Up Your PC". On a <b>Mac</b> (or Linux), open "Mac Setup". Then both continue with "Installing uv".'),
      K.remember([
        'The setup exists to make your computer match the course: same code, same Python, same packages.',
        'Five steps: clone + editor, uv, OpenAI key (optional), <code>.env</code>, start.',
        'Read the "gotchas" at the top of the setup guide before you start.',
      ]),
      sources('<p>Transcript: <code>' + T + '04-Day 1 - Setting Up Your LLM Development Environment with Cursor and UV.txt</code>. Repository: <code>ai/llm_engineering/setup/SETUP-new.md</code>, "Step 0" and the step list.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 5
  JT.def('llm_setup_pc', {
    title: 'Setting Up Your PC: Git and Cursor',
    h1: 'Set Up Your PC: <span>Git and Cursor</span>',
    body: () => [
      p('This lesson is for <b>Windows</b>. On a Mac, use the next lesson. Our goal: get the course code onto your computer and open it in an editor.'),

      h2('Open PowerShell'),
      p('Open the Start menu and type <b>PowerShell</b>. If a command ever fails with a permissions problem, right-click PowerShell and choose <b>Run as administrator</b>, then try again — that is the first thing to try.'),

      h2('Is Git Installed?'),
      p('The course code lives on GitHub, and <b>Git</b> is the tool that copies it. Git and GitHub are different things: Git is the program on your computer; GitHub is a website that stores Git projects. (The repository\'s <code>guides</code> folder has a guide that explains this difference, and another on the command line.)'),
      p('Check whether Git is installed:'),
      run('git --version', 'Example', 'shell'),
      p('The command asks Git for its version. If Git is installed, it prints one — here is what it printed on our machine:'),
      term('git --version', 'git version 2.41.0.windows.1', 'Terminal'),
      p('If you see "not recognized" instead, Git is missing. Follow the download link in the setup guide, install it, then open a <b>new</b> PowerShell (a running one does not see the new install; restart the computer if it still does not).'),

      h2('Create a Projects Folder and Clone the Repository'),
      p('Keep all your code projects in one folder. Create it and go into it:'),
      K.show(`mkdir projects
cd projects`, 'PowerShell', 'text'),
      ul([
        '<code>mkdir projects</code> — make a new folder called <code>projects</code> (skip this if you already have one; just run <code>cd projects</code>).',
        '<code>cd projects</code> — change into that folder.',
        '<code>ls</code> — list what is inside. A new folder is empty.',
      ]),
      p('Now <b>clone</b> the course repository. Cloning copies the whole project, with its history, from GitHub to your machine:'),
      K.show('git clone https://github.com/ed-donner/llm_engineering.git', 'PowerShell', 'text'),
      p('In the browser, the same URL comes from the green <b>Code</b> button (with <b>HTTPS</b> selected, copy the URL). After a few seconds, <code>ls</code> shows a new folder <code>llm_engineering</code>. Go into it and list it, and you will see the weekly folders:'),
      K.show(`cd llm_engineering
ls`, 'PowerShell', 'text'),
      note('<b>This Learning Hub already has the repository</b> at <code>ai/llm_engineering/</code> — you do not need to clone it again to follow along here. Clone it to practise the steps on your own machine.'),

      h2('Install Cursor and Open the Project'),
      p('An editor lets you read and run the code. The course uses <b>Cursor</b>, an editor with AI help built in. It is a fork of VS Code, so VS Code, Windsurf or PyCharm all work too. Cursor has a free trial and a paid plan; you do not need to pay — without the paid plan you lose only the AI autocomplete.'),
      ol([
        'Download Cursor for Windows from its website and run the installer. Accept the defaults, create an account and start the trial.',
        'Launch Cursor from the Start menu. If the welcome screen looks different, choose <b>File → New Window</b>.',
        'Press <b>Open Project</b> and select the <code>llm_engineering</code> folder you cloned.',
      ]),
      p('This folder is the <b>project root</b>: the top-level folder that holds all your work. Opening the wrong folder (one level too high or low) causes confusing problems later. You opened the right one if the explorer on the left shows <code>LLM_ENGINEERING</code> in capitals at the top, with the folders for the eight weeks below it.'),
      K.remember([
        'Git copies code; GitHub hosts it. <code>git clone &lt;url&gt;</code> brings a whole project to your computer.',
        'Keep projects in one folder, and open the <b>project root</b> in the editor.',
        'A new install is only seen by a <b>new</b> terminal window.',
      ]),
      sources('<p>Transcript: <code>' + T + '05-Day 1 - Setting Up Your PC Development Environment with Git and Cursor.txt</code>. Repository: <code>ai/llm_engineering/setup/SETUP-new.md</code>, Step 1. The <code>git --version</code> button runs on your own computer.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 6
  JT.def('llm_setup_mac', {
    title: 'Mac Setup: Git, Cloning and Cursor',
    h1: 'Mac Setup: <span>Git, Cloning and Cursor</span>',
    body: () => [
      p('This lesson is for <b>Mac</b> (Linux users can follow it too). On Windows, use the previous lesson. The goal is the same: get the course code onto your computer and open it in an editor.'),

      h2('Open Terminal and Check Git'),
      p('Open Finder → Applications → Utilities → <b>Terminal</b>. Then ask for Git\'s version:'),
      run('git --version', 'Example', 'shell'),
      p('It prints a line like <code>git version 2.x</code>; the exact number depends on your computer.'),
      p('If Git is not installed, macOS offers to install it when you run this command — accept it. (The setup guide also lists a few Mac "gotchas", such as keeping the system tools up to date.)'),

      h2('Where Are You? Make a Projects Folder'),
      p('Two commands help you find your way around:'),
      ul([
        '<code>cd</code> on its own takes you to your home folder.',
        '<code>pwd</code> prints the folder you are in, such as <code>/Users/yourname</code>.',
      ]),
      p('Create a folder for all projects and go into it:'),
      K.show(`mkdir projects
cd projects
pwd`, 'Terminal', 'text'),
      note('<b>Keep projects out of iCloud folders.</b> Documents and Desktop are synced to iCloud, which can slow things down and cause problems with Git repositories. Your home folder is better, and the repository is already backed up on GitHub, so syncing is unnecessary.'),

      h2('Clone the Repository'),
      K.show('git clone https://github.com/ed-donner/llm_engineering.git', 'Terminal', 'text'),
      p('This copies the whole project into a new <code>llm_engineering</code> folder. Check with <code>ls</code>, then enter it with <code>cd llm_engineering</code> and run <code>ls</code> again — you will see the weekly folders.'),
      note('This Learning Hub already contains the repository at <code>ai/llm_engineering/</code>, so you can follow the course without cloning again.'),

      h2('Install Cursor and Open the Project'),
      ol([
        'Download Cursor for macOS from its website, install and launch it (accept the defaults and start the free trial).',
        'If the welcome screen looks different, choose <b>File → New Window</b>, then <b>Open Project</b>.',
        'Choose the <code>llm_engineering</code> folder inside <code>projects</code>.',
      ]),
      p('This is the <b>project root</b>. You opened the right folder if <code>LLM_ENGINEERING</code> appears in capitals at the top of the explorer, with the weekly folders below. If an AI chat panel opens on the right, drag it closed.'),
      p('Cursor is optional: it is a fork of VS Code, so everything looks almost identical in VS Code, and any other editor works too.'),
      K.remember([
        '<code>pwd</code> shows where you are; <code>cd</code> moves; <code>mkdir</code> creates a folder.',
        '<code>git clone &lt;url&gt;</code> copies a repository; open its top folder (the project root) in the editor.',
        'Avoid iCloud-synced folders for code projects.',
      ]),
      sources('<p>Transcript: <code>' + T + '06-Day 1 - Mac Setup- Installing Git, Cloning the Repo, and Cursor IDE.txt</code>. Repository: <code>ai/llm_engineering/setup/SETUP-new.md</code>, Step 1 (Mac).</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 7
  JT.def('llm_uv_setup', {
    title: 'Installing uv and Syncing the Environment',
    h1: 'Install <span>uv</span> and Build the Environment',
    body: () => [
      p('Windows and Mac come back together here. We now build the Python environment the course code needs.'),

      h2('The Problem uv Solves'),
      p('The course code uses many Python packages (libraries). It must run on the <b>same Python version</b> with the <b>same package versions</b> as the course expects — otherwise things break in ways that are hard to debug. A tool that manages this is a <b>package and environment manager</b>.'),
      p('<b>uv</b> is that tool. The course used Anaconda before, which is powerful but could take an hour or more to build the environment. uv does the same job in minutes, because it is written in Rust. It is fast, reliable and simple, and it is increasingly the standard in the Python world.'),

      h2('Open the Terminal Inside Cursor'),
      p('Cursor has a terminal built in, which is easier than the system one. Open it from <b>View → Terminal</b>, or with <b>Ctrl + `</b> (Control and the back-tick key, not the apostrophe; Control on a Mac too, not Command). The terminal opens already inside <code>llm_engineering</code>. The <b>+</b> button opens a second terminal, and <code>exit</code> closes one.'),

      h2('Check and Install uv'),
      p('Check whether uv is installed:'),
      run('uv --version', 'Example', 'shell'),
      term('uv --version', 'uv 0.12.0 (b88d7c5c4 2026-07-28 x86_64-pc-windows-msvc)', 'Terminal (your version will differ)'),
      p('If you get an error, install uv with the command for your system from the uv documentation (<code>docs.astral.sh/uv</code>, linked in the setup guide). On Windows, <code>winget</code> is another option. After installing, <b>open a new terminal</b> so that it picks up the change; restart the computer only if it still fails.'),
      note('Mac permission errors during install usually mean something was previously installed with <code>sudo</code> and left your shell profile files with the wrong permissions. The setup guide explains the fix.'),
      p('Then make sure uv is up to date:'),
      K.show('uv self update', 'Terminal', 'text'),

      h2('Build the Environment with uv sync'),
      p('Now the main command. Run it from the project root:'),
      K.show('uv sync', 'Terminal', 'text'),
      p('What does it do? It reads the project\'s configuration files (<code>pyproject.toml</code> and <code>uv.lock</code>), then downloads and installs <b>exactly</b> the Python version and package versions the course needs. The first run downloads from the internet, but even so it should take only minutes (under about 10 on a normal connection).'),
      p('The result is a <code>.venv</code> folder in the project root: a <b>virtual environment</b>, a private Python with all the course\'s packages inside, separate from anything else on your computer.'),
      p('Our machine\'s course environment uses this Python:'),
      run('python --version', 'Example', 'shell'),
      term('python --version', 'Python 3.12.12', 'Terminal'),
      p('That is the version in the course\'s <code>.python-version</code> file (3.12). It is the Python of the course\'s own <code>.venv</code> — the Learning Hub\'s runner uses it for all Python examples.'),
      K.remember([
        'uv manages the Python version and package versions so every student runs the same environment.',
        '<code>uv sync</code> builds the <code>.venv</code> virtual environment from <code>pyproject.toml</code> and <code>uv.lock</code>.',
        'After installing a tool, open a new terminal so it is found.',
      ]),
      sources('<p>Transcript: <code>' + T + '07-Day 1 - Installing UV and Setting Up Your Cursor Development Environment.txt</code>. Repository: <code>ai/llm_engineering/setup/SETUP-new.md</code>, Step 2; <code>ai/llm_engineering/pyproject.toml</code>. Your Learning Hub\'s Python examples run in the environment found in <code>D:\\learnings\\udemy\\llm_engineering\\.venv</code>.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 8
  JT.def('llm_api_key_env', {
    title: 'OpenAI API Key and Environment Variables',
    h1: 'OpenAI API Key <span>and the .env File</span>',
    body: () => [
      p('Steps three and four of the setup are optional but recommended: get an OpenAI API key and store it safely. You can skip them and use free models, such as Gemma or Llama through Ollama, or Gemini; the course documents each alternative.'),

      h2('Why an API Key?'),
      p('To call a cloud model from code, you must prove who you are, so that the provider can bill you. The <b>API key</b> is that proof. It works like a password: whoever has it can spend your money.'),
      p('This is different from ChatGPT. <b>ChatGPT</b> is a product you chat with in a browser (with its own monthly plan). The <b>OpenAI API</b> is a separate service for calling the model from code, billed by use. Paying for one does not give you the other. (The <code>guides</code> folder has a "Technical Foundations" guide explaining this.)'),

      h2('Creating the Key'),
      ol([
        'Go to <code>platform.openai.com</code> and sign up. This is the API side, not ChatGPT. Signing up is free.',
        'Open <b>Settings → Billing</b>. OpenAI is <b>pay as you go</b>: you add a balance and draw it down. When this course was recorded, the minimum was <b>$5</b> and the credit lasted a year (check the current terms on the billing page), and the course spends only fractions of a cent per project. Keep <b>auto recharge off</b>, so the card is never charged automatically. If a payment is declined, it is usually your bank blocking an international vendor, not OpenAI.',
        'Open <b>Settings → API keys</b> (under the organization). Press <b>Create new secret key</b>, name it (for example "LLM engineering"), choose the <b>Default project</b> and keep permissions at <b>All</b>. Extra restrictions cause errors later.',
        'Copy the key straight away. It starts with <code>sk-proj-</code>. Do not paste it elsewhere first, and do not change a single character — it works like a password.',
      ]),
      note('Check your spending at <code>platform.openai.com</code> from time to time. Pay-as-you-go means you only ever lose what you put in.'),

      h2('Why a .env File?'),
      p('The key has to reach your code, but it must <b>never</b> be written inside the code (code gets shared, and keys leak). The standard answer is an <b>environment variable</b>: a named value that lives outside your code, which the program reads at run time. A <code>.env</code> file is a simple way to set those variables for one project.'),
      p('Create a file in the <b>project root</b> and name it exactly <code>.env</code> — those four characters. Not <code>.env.txt</code>, not <code>openai.env</code>. Put one line in it:'),
      K.show('OPENAI_API_KEY=sk-proj-your-key-goes-here', '.env', 'text'),
      ul([
        'The name must be exactly <code>OPENAI_API_KEY</code>: capital letters, with an <b>AI</b> in the middle (not "OPENAPI").',
        'No spaces around the key, no quotes needed, and no extra characters at the end.',
        '<b>Save the file</b> (Ctrl + S, Cmd + S on Mac). A white dot on the tab means it is unsaved.',
      ]),
      p('Cursor puts a small stop sign next to <code>.env</code>. That is <b>good</b>: it means Cursor will not send this file to an AI, because it contains secrets.'),

      h2('Checking That Python Can See the Key'),
      p('The first notebook of the course starts with a check cell. It reads the key from the environment and tests that it looks right. Let\'s run the same code:'),
      ex(`import os
from dotenv import load_dotenv

load_dotenv(override=True)
api_key = os.getenv('OPENAI_API_KEY')

if not api_key:
    print("No API key was found - please head over to the troubleshooting notebook in this folder to identify & fix!")
elif not api_key.startswith("sk-proj-"):
    print("An API key was found, but it doesn't start sk-proj-; please check you're using the right key - see troubleshooting notebook")
elif api_key.strip() != api_key:
    print("An API key was found, but it looks like it might have space or tab characters at the start or end - please remove them - see troubleshooting notebook")
else:
    print("API key found and looks good so far!")`, { title: 'week1/day1.ipynb — key check', lang: 'python' }),
      p('How it works:'),
      ul([
        '<code>load_dotenv(override=True)</code> reads the <code>.env</code> file and puts each line into the program\'s environment variables. <code>override=True</code> means the file wins over any value already set on your computer.',
        '<code>os.getenv(\'OPENAI_API_KEY\')</code> reads the variable, or gives <code>None</code> when it does not exist.',
        'The <code>if</code> chain checks three typical mistakes in order: no key, a key with the wrong beginning, a key with spaces around it.',
      ]),
      p('On a correct setup it prints:'),
      term('python (key check)', 'API key found and looks good so far!', 'Output'),
      note('<b>Important:</b> this check only looks at the <b>format</b> of the key. A key can look right and still be refused by OpenAI — for example, if it has <b>expired</b> or been revoked. The real test is the first API call, which you will make in a later lesson. The message to look for is then an <code>Authentication</code> error, not a format error.'),
      K.remember([
        'An API key identifies you to the provider; treat it like a password and never put it in code.',
        'Environment variables keep secrets outside the code. <code>.env</code> holds them for one project; <code>load_dotenv()</code> loads them.',
        'The file must be named exactly <code>.env</code>, sit in the project root, use the name <code>OPENAI_API_KEY</code>, and be saved.',
        'The key check tests format only, not whether the key is valid.',
      ]),
      sources('<p>Transcript: <code>' + T + '08-Day 1 - Setting Up Your OpenAI API Key and Environment Variables.txt</code>. Code: <code>ai/llm_engineering/week1/day1.ipynb</code>, the key-check cell (unchanged). Repository: <code>setup/SETUP-new.md</code>, Steps 3 and 4. The example runs with the Python environment and the <code>.env</code> of your course folder.</p>'),
    ].join(''),
  });

  // ---------------------------------------------------------------- 9
  JT.def('llm_notebook_setup', {
    title: 'Cursor Extensions and Your First Notebook',
    h1: 'Extensions, Kernel <span>and Your First Notebook</span>',
    body: () => [
      p('The final setup step: teach the editor to run Python notebooks, and open the first lab.'),

      h2('Install Two Extensions'),
      p('Extensions add features to the editor. Open <b>View → Extensions</b> (Cursor may also offer to install the recommended ones — say yes). Install:'),
      ul([
        '<b>Python</b> — colours and checks Python code. There are two versions: one by Anysphere (the makers of Cursor) and one by <code>ms-python</code> (Microsoft). Either one works.',
        '<b>Jupyter</b> by Microsoft (<code>ms-toolsai</code>) — lets the editor open and run notebooks.',
      ]),
      p('Then return to <b>View → Explorer</b> to see the files again.'),

      h2('What Is a Notebook?'),
      p('Open <code>week1/day1.ipynb</code> in the Explorer. The <code>.ipynb</code> ending stands for IPython notebook, also called a <b>Jupyter notebook</b> or <b>lab</b>.'),
      p('A notebook is a document that mixes formatted text with code. The code is split into <b>cells</b>, and you run one cell at a time and see the output right below it. That makes it ideal for experimenting: run a cell, look, change it, run it again.'),
      p('The course treats the notebooks as living documents. Read the text in them — the first one maps out the project — and expect them to change over time, since models and explanations are updated often. If the notebook differs from an older recording or screenshot, the notebook is the newer one.'),
      note('In this Learning Hub, each code example works like a notebook cell: it has <b>Run here</b> and <b>Try it Yourself</b> buttons, and the output appears under it. The code in the lessons comes from those notebooks.'),

      h2('Select the Kernel'),
      p('A notebook needs a running Python process behind it. That process is the <b>kernel</b>. You must tell the editor which Python to use, and it must be the one uv built:'),
      ol([
        'Click <b>Select Kernel</b> at the top right of the notebook.',
        'Choose <b>Python Environments…</b>.',
        'Pick the entry that is marked <b>Recommended</b> (it has a star): <code>.venv (Python 3.12.x)</code>, with a path ending in <code>.venv/bin/python</code> (<code>.venv\\Scripts\\python.exe</code> on Windows).',
      ]),
      p('Why this one? Because it is the environment that contains every package from <code>uv sync</code>. A different Python would not have them, and the imports would fail. You must select the kernel again for every notebook. If the option does not appear, the troubleshooting notebook in the <code>setup</code> folder helps.'),

      h2('Run the Imports Cell'),
      p('The first code cell of the first lab imports what the project needs. Running it is the final test of your setup — if it runs without an error, your environment works:'),
      ex(`# imports

import os
from dotenv import load_dotenv
from scraper import fetch_website_contents
from IPython.display import Markdown, display
from openai import OpenAI

print("Imports OK")`, { title: 'week1/day1.ipynb — imports cell', lang: 'python' }),
      p('Each line imports something the project uses:'),
      ul([
        '<code>os</code> and <code>dotenv</code> — read environment variables, as in the last lesson.',
        '<code>scraper</code> — the course\'s helper file <code>week1/scraper.py</code>, which downloads a web page.',
        '<code>IPython.display</code> — shows formatted (Markdown) output.',
        '<code>openai</code> — the library for calling OpenAI models.',
      ]),
      p('The last line, <code>print("Imports OK")</code>, is added here so that you can see something; the original cell prints nothing when it succeeds. An <code>ImportError</code> means the wrong kernel is selected or <code>uv sync</code> did not finish.'),

      h2('How to Work Through the Labs'),
      p('The course does not make you type code line by line. The better way to learn: <b>read</b> the code, <b>run</b> it, then <b>change it</b> — add print statements, edit prompts, break it, fix it. If you prefer to type it yourself, copy a cell into a new notebook and rewrite it. And ask yourself where it could be used commercially.'),
      K.remember([
        'Two extensions are needed: Python and Jupyter.',
        'A notebook is a document of text and code cells; the kernel is the Python process that runs them.',
        'Pick the <code>.venv</code> kernel marked Recommended — it holds the packages from <code>uv sync</code>.',
        'A successful imports cell proves that the setup works.',
      ]),
      sources('<p>Transcript: <code>' + T + '09-Day 1 - Installing Cursor Extensions and Setting Up Your Jupyter Notebook.txt</code>. Code: <code>ai/llm_engineering/week1/day1.ipynb</code>, imports cell (with one added <code>print</code>). Repository: <code>setup/SETUP-new.md</code>, Step 5.</p>'),
    ].join(''),
  });
})();
