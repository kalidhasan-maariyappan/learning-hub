# English vocabulary sources

The expanded catalog adds 4,175 items to the existing 325 unique items, reaching 4,500. Each new item contains a concise English definition and a real usage sentence adapted from the source entry, plus Tamil translations. The list includes words, phrasal verbs and fixed expressions. It does not count spelling variants or repeated senses as extra words.

## English text

The expansion uses 3,295 TKG items and 880 WordNet items.

TKG English Learner’s Dictionary, https://github.com/tkgally/eex-dict (snapshot recorded in sources.json). Dictionary data is CC0 1.0: https://creativecommons.org/publicdomain/zero/1.0/. A copy of the source data license is in licenses/TKG-CC0.txt. Only dictionary text and grammatical metadata were adapted; no source code or external dictionary was copied. The upstream dictionary describes model-assisted drafting and review; this app does not claim independent human validation of its whole catalog.

Princeton WordNet 3.0: https://wordnet.princeton.edu/. Definitions and usage examples are adapted under the WordNet license, retained in licenses/WORDNET-LICENSE.txt. WordNet 3.0 Copyright 2006 by Princeton University. All rights reserved. Terms: https://wordnet.princeton.edu/license-and-commercial-use.

## Tamil text

Machine-assisted translation of the selected public source definitions and examples, followed by structural checks and reviewed short beginner meanings in short-meanings.txt, contextual translations for all 142 retained sourced expressions and 83 sourced phrasal verbs in expression-corrections.txt, and additional sample corrections in vocabulary-overrides.json. No learner data was transmitted. Runtime learning is entirely local and does not call a translation service. Translation status is shown on sourced lessons. This is not a claim of professional Tamil review of every item.

## Learning order

LexiCore-5000 (v1.0.0), https://github.com/X-Trivle/LexiCore — CC BY 4.0. Frequency evidence derived from FineWeb, FineWeb-Edu, Wikipedia (20231101.en), OPUS-OpenSubtitles 2024 and Common Crawl CC-MAIN-2026-34. Notice: https://github.com/X-Trivle/LexiCore/blob/main/NOTICE.md.

Frequency/profile evidence was used to inform ordering only. We assign our own A1–B2 learning bands to meet the requested cumulative targets (500 / 1,200 / 2,500 / 4,500), preserve existing lesson levels, and introduce simple greetings and everyday words early. These are course groupings, not official CEFR classifications. No upstream corpus, proprietary list, paid deck, audio or images are redistributed.

## Rebuilding

The ordinary build consumes the checked-in vocabulary-expanded.json, vocabulary-overrides.json and sources.json. It needs no network or Python packages. Optional preparation/translation scripts consume cached public source files in .cache/english-sources; their output is resumable. Source snapshots, hashes and modifications are recorded in the manifest. No unlicensed dictionary or parallel corpus from exploratory downloads is included in the application.


## Additional usage and B2 practice

`additional-examples.json` adds sourced usage sentences to 1,414 existing lessons (3,712 additional example instances). English is from the same TKG or WordNet entry, under the licenses above. Tamil for this supplementary batch is machine-assisted and labelled in the UI. A matching source sense is used when the original sourced example can be identified; legacy authored words use the first dictionary sense. Original meanings, examples and stable lesson IDs are retained.

`fluency-*.txt` contains 79 authored practice units: 68 new units and 11 richer replacements of existing skill lessons. These include 422 bilingual examples, dialogue turns and passage paragraphs, with explicit comprehension/form questions, production prompts and short guidance. They do not increase the lexical vocabulary count. Models are educational examples, not reports of actual events or certified CEFR assessments.
