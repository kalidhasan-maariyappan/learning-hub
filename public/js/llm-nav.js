// LLM Engineering navigation. Lessons follow the course transcripts in ai/transcript/,
// in their original order. Only lessons that have been written are listed.
(function () {
  'use strict';
  const JT = window.JT;
  const groups = [
    ['Week 1 Build Your First LLM Product', [
      ['llm_home', '1. Running Your First LLM Locally with Ollama'],
      ['llm_spanish_tutor', '2. Spanish Tutor Demo and Course Overview'],
      ['llm_ai_engineer_path', '3. Your Path to Becoming an AI Engineer'],
      ['llm_setup_overview', '4. Setting Up Your Development Environment'],
      ['llm_setup_pc', '5. Setting Up Your PC: Git and Cursor'],
      ['llm_setup_mac', '6. Mac Setup: Git, Cloning and Cursor'],
      ['llm_uv_setup', '7. Installing uv and Syncing the Environment'],
      ['llm_api_key_env', '8. OpenAI API Key and the .env File'],
      ['llm_notebook_setup', '9. Extensions, Kernel and First Notebook'],
      ['llm_first_api_call', '10. Your First API Call: System vs User Prompts'],
      ['llm_website_summarizer', '11. Building a Website Summarizer'],
      ['llm_first_exercise', '12. Exercise: Your First API Call from Scratch'],
      ['llm_building_blocks', '13. LLM Engineering Building Blocks'],
      ['llm_eight_week_journey', '14. Your 8-Week Journey'],
      ['llm_frontier_models', '15. Frontier Models: GPT, Claude, Gemini, Grok'],
      ['llm_open_source_models', '16. Open-Source LLMs and Three Ways to Use Models'],
      ['llm_http_vs_client', '17. Chat Completions: HTTP Endpoints vs the Client'],
      ['llm_openai_client_providers', '18. One Client, Many Providers'],
      ['llm_ollama_endpoints', '19. Ollama as an OpenAI-Compatible Endpoint'],
      ['llm_model_types', '20. Base, Chat and Reasoning Models'],
      ['llm_frontier_strengths_pitfalls', '21. Frontier Models: Strengths and Pitfalls'],
      ['llm_testing_chatgpt', '22. Testing Frontier Models Through the Web UI'],
      ['llm_comparing_frontier', '23. Comparing Claude, Gemini, Grok and DeepSeek'],
      ['llm_agentic_in_action', '24. Agentic AI in Action'],
      ['llm_outsmart_game', '25. The Outsmart Game: Frontier Models Showdown'],
      ['llm_transformers_intro', '26. Understanding Transformers'],
      ['llm_lstm_to_transformers', '27. From LSTMs to Transformers'],
      ['llm_parameters', '28. Parameters: From Millions to Trillions'],
      ['llm_what_are_tokens', '29. What Are Tokens?'],
      ['llm_tokenization', '30. Understanding Tokenization'],
      ['llm_tiktoken_memory', '31. Tokenizing with tiktoken and the Illusion of Memory'],
      ['llm_context_windows_costs', '32. Context Windows, API Costs and Token Limits'],
      ['llm_brochure_intro', '33. Sales Brochure Generator: The Challenge'],
      ['llm_json_prompts', '34. JSON Prompts and One-Shot Prompting'],
      ['llm_chaining_calls', '35. Chaining Calls: Collecting the Material'],
      ['llm_brochure_streaming', '36. The Brochure Generator and Streaming'],
      ['llm_business_applications', '37. Business Applications, Challenges and Your AI Tutor'],
    ]],
  ];
  JT.llmNav = groups.map(([title, items]) => ({ title, items: items.map(([slug, t]) => ({ slug, title: t })) }));
  JT.llmOrder = [];
  for (const g of JT.llmNav) for (const it of g.items) {
    JT.navInfo[it.slug] = { title: it.title, parent: it, group: g.title, fullTitle: it.title, heading: it.title };
    JT.llmOrder.push(it.slug);
  }
})();
