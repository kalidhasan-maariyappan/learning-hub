// "Java Examples" group: generated indexes (examples, exercises, challenges), the online compiler,
// quiz, final exam, practice problems, local runner info, syllabus, study plan and interview Q&A.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, h3, ul, ol, note, table, code } = JT.h;
  const esc = JT.esc;
  const SELF_GROUP = 'Java Examples';   // index pages must not index this group (avoids recursion)
  const lessonGroups = () => JT.nav.filter((g) => g.title !== SELF_GROUP);
  const slugsOf = (g) => [...new Set(g.items.flatMap((it) => (it.children ? it.children.map((c) => c.slug) : [it.slug])))];
  const done = (kind, id) => (JT.store.get(kind)[id] ? '<span class="badge done">done</span>' : '');

  // ---------- Examples index ----------
  JT.def('java_examples', {
    body: () => {
      let total = 0;
      const sections = lessonGroups().map((g) => {
        const rows = [];
        for (const slug of slugsOf(g)) {
          const { examples } = JT.renderBody(slug);
          examples.forEach((e, i) => {
            total++;
            rows.push([
              JT.link(slug, esc(JT.navInfo[slug].fullTitle)),
              esc(e.title || 'Example ' + (i + 1)),
              '<a href="' + JT.tryitUrl(slug, i) + '" target="_blank">Try it Yourself »</a>',
            ]);
          });
        }
        return rows.length ? h2(esc(g.title)) + table(['Lesson', 'Example', ''], rows) : '';
      }).join('');
      return p('Every runnable example in the tutorial, ' + total + ' in total, grouped like the sidebar. Each one opens in the editor, where it runs on your local JDK.') + sections;
    },
  });

  // ---------- Online compiler ----------
  const COMPILER_START = `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String name = in.hasNextLine() ? in.nextLine() : "world";
        System.out.println("Hello, " + name + "!");
    }
}
`;
  JT.def('java_compiler', {
    body: () => [
      p('Write any Java program and run it. The code is compiled and executed by the JDK installed on this computer, through the <a href="' + JT.url('java_server') + '">local runner</a>. The public class may have any name, and the file is named after it.'),
      '<div id="cmp-editor"></div>',
      '<details class="stdin" open><summary>Program input (stdin)</summary><textarea class="stdin-box" id="cmp-stdin">Ada</textarea></details>',
      '<div class="run-bar"><button class="btn" id="cmp-run">Run ❯</button><button class="btn ghost" id="cmp-reset">Reset</button><span class="run-status" id="cmp-status">Ctrl+Enter runs the code.</span></div>',
      h3('Output'),
      '<div class="console" id="cmp-console"><span class="sys">Output appears here.</span></div>',
      note('Limits: 10 seconds of run time, 256 MB of memory, 64 KB of output. The program runs with your user\'s permissions, so only run code you trust.'),
    ].join(''),
    after: () => {
      let saved = null;
      try { saved = localStorage.getItem('jt-compiler-code'); } catch { /* storage blocked */ }
      const ed = JT.createEditor(document.getElementById('cmp-editor'), saved || COMPILER_START, { onRun: run, minHeight: '320px' });
      const btn = document.getElementById('cmp-run');
      const status = document.getElementById('cmp-status');
      async function run() {
        try { localStorage.setItem('jt-compiler-code', ed.value); } catch { /* storage blocked */ }
        btn.disabled = true; status.textContent = 'Compiling and running…';
        const r = await JT.runJava(ed.value, document.getElementById('cmp-stdin').value);
        btn.disabled = false; status.textContent = '';
        JT.showResult(document.getElementById('cmp-console'), r);
      }
      btn.addEventListener('click', run);
      document.getElementById('cmp-reset').addEventListener('click', () => { ed.value = COMPILER_START; });
    },
  });

  // ---------- Exercises index ----------
  JT.def('java_exercises', {
    body: () => {
      const doneCount = Object.keys(JT.store.get('exercises')).length;
      let total = 0;
      const sections = lessonGroups().map((g) => {
        const cards = slugsOf(g).filter((s) => JT.pages[s] && JT.pages[s].exercise).map((s) => {
          total++;
          return '<a class="card" href="' + JT.url(s) + '">' + esc(JT.navInfo[s].fullTitle) + done('exercises', s) + '<small>' + JT.pages[s].exercise.q.replace(/<[^>]+>/g, '') + '</small></a>';
        });
        return cards.length ? h2(esc(g.title)) + '<div class="card-grid">' + cards.join('') + '</div>' : '';
      }).join('');
      return p('Short fill-in-the-blank exercises appear at the bottom of many lessons. Pick one below. Completed exercises are marked <span class="badge done">done</span> (stored only in this browser).') +
        p('<b>Progress:</b> ' + Math.min(doneCount, total) + ' of ' + total + ' completed.') + sections;
    },
  });

  // Questions are written with the answer wherever it was convenient; shuffle each question's options
  // with a fixed seed so correct answers are spread over A–D but stay identical on every visit.
  function spreadAnswers(questions, seed) {
    let s = seed;
    const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
    return questions.map((q) => {
      const order = q.options.map((_, i) => i);
      for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
      return { ...q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) };
    });
  }

  // ---------- Quiz (25 questions) ----------
  const QUIZ = spreadAnswers([
    { q: 'Which method is the entry point of a Java application?', options: ['start()', 'main()', 'run()', 'init()'], answer: 1 },
    { q: 'Which keyword creates an object?', options: ['class', 'this', 'new', 'make'], answer: 2 },
    { q: 'What does this print?', code: 'System.out.println(7 / 2);', options: ['3.5', '3', '4', '3.0'], answer: 1 },
    { q: 'Which type stores a single character?', options: ['String', 'char', 'Character[]', 'byte'], answer: 1 },
    { q: 'What does this print?', code: 'String s = "Java";\nSystem.out.println(s.length());', options: ['3', '4', '5', 'Error'], answer: 1 },
    { q: 'Which operator compares two values for equality?', options: ['=', '==', '===', 'equals'], answer: 1 },
    { q: 'How do you write a single-line comment?', options: ['# comment', '<!-- comment -->', '// comment', '-- comment'], answer: 2 },
    { q: 'What is the index of the first element of an array?', options: ['0', '1', '-1', 'It depends'], answer: 0 },
    { q: 'What does this print?', code: 'int x = 5;\nx += 3;\nSystem.out.println(x);', options: ['5', '3', '8', '53'], answer: 2 },
    { q: 'Which loop always runs its body at least once?', options: ['for', 'while', 'do/while', 'for-each'], answer: 2 },
    { q: 'Which keyword prevents a variable from being reassigned?', options: ['static', 'const', 'final', 'fixed'], answer: 2 },
    { q: 'What does this print?', code: 'System.out.println("5" + 3 + 2);', options: ['10', '532', '55', 'Error'], answer: 1 },
    { q: 'Which access modifier makes a member visible only inside its own class?', options: ['public', 'protected', 'private', 'default'], answer: 2 },
    { q: 'How does a class inherit from another class?', options: ['implements', 'extends', 'inherits', 'super'], answer: 1 },
    { q: 'Which collection does not allow duplicate elements?', options: ['ArrayList', 'LinkedList', 'HashSet', 'Array'], answer: 2 },
    { q: 'What does this print?', code: 'int[] a = {4, 8, 15};\nSystem.out.println(a.length);', options: ['2', '3', '15', '27'], answer: 1 },
    { q: 'What is the correct way to compare the contents of two strings a and b?', options: ['a == b', 'a.equals(b)', 'a = b', 'a.compare(b)'], answer: 1 },
    { q: 'Which block always runs, whether or not an exception occurs?', options: ['catch', 'finally', 'throw', 'else'], answer: 1 },
    { q: 'What does this print?', code: 'boolean b = 10 > 3 && 2 > 5;\nSystem.out.println(b);', options: ['true', 'false', '1', 'Error'], answer: 1 },
    { q: 'Which class reads keyboard input?', options: ['System.in.read', 'Scanner', 'Console.log', 'Input'], answer: 1 },
    { q: 'A method that returns nothing has the return type…', options: ['null', 'empty', 'void', 'none'], answer: 2 },
    { q: 'What does this print?', code: 'for (int i = 0; i < 3; i++) {\n    System.out.print(i);\n}', options: ['123', '012', '0123', '3'], answer: 1 },
    { q: 'Which keyword refers to the current object?', options: ['self', 'this', 'me', 'current'], answer: 1 },
    { q: 'Which wrapper class belongs to the primitive int?', options: ['Int', 'Integer', 'Number', 'Long'], answer: 1 },
    { q: 'What does this print?', code: 'System.out.println(Math.max(3, 9) % 4);', options: ['0', '1', '2', '3'], answer: 1 },
  ], 2031);
  JT.def('java_quiz', {
    body: () => p('Test your Java knowledge with ' + QUIZ.length + ' multiple-choice questions. Answer them all, then press <b>Submit answers</b> to see your score and the correct answers. There is no time limit.') + JT.renderQuiz(QUIZ, { id: 'quiz' }),
    after: (main, { wireQuiz }) => wireQuiz(QUIZ, null, 'quiz'),
  });

  // ---------- Final exam (30 questions, pass mark 75%) ----------
  const EXAM = spreadAnswers([
    { q: 'Which of these is a primitive type?', options: ['String', 'Integer', 'double', 'ArrayList'], answer: 2 },
    { q: 'What does this print?', code: 'int a = 10, b = 4;\nSystem.out.println(a % b + a / b);', options: ['4', '2.5', '4.5', '6'], answer: 0 },
    { q: 'What does this print?', code: 'double d = (double) 9 / 2;\nSystem.out.println(d);', options: ['4', '4.0', '4.5', '5.0'], answer: 2 },
    { q: 'What does this print?', code: 'String s = "programming";\nSystem.out.println(s.substring(3, 7));', options: ['gram', 'ogra', 'gramm', 'rogr'], answer: 0 },
    { q: 'What does this print?', code: 'int x = 4;\nString r = (x % 2 == 0) ? "even" : "odd";\nSystem.out.println(r);', options: ['odd', 'even', 'true', '0'], answer: 1 },
    { q: 'Which statement exits a loop immediately?', options: ['continue', 'return 0', 'break', 'exit'], answer: 2 },
    { q: 'How many times does this loop print?', code: 'int i = 10;\nwhile (i > 0) {\n    System.out.println(i);\n    i -= 3;\n}', options: ['3', '4', '10', 'Forever'], answer: 1 },
    { q: 'What does this print?', code: 'int[][] m = {{1, 2}, {3, 4}, {5, 6}};\nSystem.out.println(m[2][0]);', options: ['2', '3', '5', '6'], answer: 2 },
    { q: 'What is method overloading?', options: ['A subclass replacing a parent method', 'Several methods with the same name but different parameters', 'A method calling itself', 'A method with too many lines'], answer: 1 },
    { q: 'What happens when a recursive method has no reachable base case?', options: ['It returns 0', 'The compiler refuses it', 'A StackOverflowError occurs', 'It stops after 100 calls'], answer: 2 },
    { q: 'Which is true about constructors?', options: ['They must return void', 'They have the same name as the class', 'They must be static', 'A class can have only one'], answer: 1 },
    { q: 'What does this print?', code: 'class Counter {\n    static int n = 0;\n    Counter() { n++; }\n}\n// in main:\nnew Counter(); new Counter(); new Counter();\nSystem.out.println(Counter.n);', options: ['0', '1', '3', 'Error'], answer: 2 },
    { q: 'Encapsulation mainly means…', options: ['Putting all code in one class', 'Hiding fields and exposing them through methods', 'Inheriting from several classes', 'Using many packages'], answer: 1 },
    { q: 'What does this print?', code: 'class A { String hi() { return "A"; } }\nclass B extends A { String hi() { return "B"; } }\n// in main:\nA obj = new B();\nSystem.out.println(obj.hi());', options: ['A', 'B', 'AB', 'Error'], answer: 1 },
    { q: 'Which statement about abstract classes is correct?', options: ['They cannot have constructors', 'They cannot be instantiated directly', 'All their methods must be abstract', 'They cannot have fields'], answer: 1 },
    { q: 'A class can implement…', options: ['only one interface', 'several interfaces', 'no interfaces if it extends a class', 'interfaces only if it is abstract'], answer: 1 },
    { q: 'What does this print?', code: 'enum Size { S, M, L }\n// in main:\nSystem.out.println(Size.L.ordinal());', options: ['0', '1', '2', 'L'], answer: 2 },
    { q: 'Which exception does Integer.parseInt("abc") throw?', options: ['IOException', 'NumberFormatException', 'ArithmeticException', 'NullPointerException'], answer: 1 },
    { q: 'What does this print?', code: 'try {\n    System.out.print("A");\n    int x = 1 / 0;\n    System.out.print("B");\n} catch (ArithmeticException e) {\n    System.out.print("C");\n} finally {\n    System.out.print("D");\n}', options: ['ABD', 'ACD', 'AC', 'ABCD'], answer: 1 },
    { q: 'Which kind of exception must be caught or declared with throws?', options: ['Unchecked', 'Checked', 'RuntimeException', 'Error'], answer: 1 },
    { q: 'What is the main benefit of try-with-resources?', options: ['Faster code', 'Resources are closed automatically', 'Exceptions are ignored', 'Files are created automatically'], answer: 1 },
    { q: 'What does this print?', code: 'List<Integer> list = new ArrayList<>(List.of(5, 10, 15));\nlist.remove(1);\nSystem.out.println(list);', options: ['[10, 15]', '[5, 15]', '[5, 10]', '[5, 10, 15]'], answer: 1 },
    { q: 'Which map keeps its keys sorted?', options: ['HashMap', 'LinkedHashMap', 'TreeMap', 'Hashtable'], answer: 2 },
    { q: 'What does this print?', code: 'Set<String> s = new TreeSet<>(List.of("pear", "fig", "apple", "fig"));\nSystem.out.println(s);', options: ['[pear, fig, apple, fig]', '[apple, fig, pear]', '[pear, fig, apple]', '[apple, fig, fig, pear]'], answer: 1 },
    { q: 'What does this print?', code: 'Map<String, Integer> m = new HashMap<>();\nm.put("a", 1);\nm.put("a", 2);\nSystem.out.println(m.get("a") + " " + m.size());', options: ['1 1', '2 1', '2 2', '1 2'], answer: 1 },
    { q: 'How do you safely remove elements while iterating over a list?', options: ['list.remove() inside a for-each loop', 'Iterator.remove()', 'You cannot remove elements', 'list.clear()'], answer: 1 },
    { q: 'What does this print?', code: 'Integer a = 1000, b = 1000;\nSystem.out.println(a.equals(b));', options: ['true', 'false', 'Error', 'It varies'], answer: 0 },
    { q: 'Which interface does the lambda x -> x > 5 fit (with x an Integer)?', options: ['Supplier<Integer>', 'Predicate<Integer>', 'Consumer<Integer>', 'Runnable'], answer: 1 },
    { q: 'What does this print?', code: 'List<String> w = List.of("kiwi", "plum", "fig");\nSystem.out.println(w.stream().filter(s -> s.length() == 4).count());', options: ['1', '2', '3', '0'], answer: 1 },
    { q: 'What does join() do on a Thread?', options: ['Starts the thread', 'Merges two threads', 'Waits until the thread has finished', 'Stops the thread'], answer: 2 },
  ], 1995);
  const EXAM_PASS = 75;
  JT.def('java_exam', {
    body: () => [
      p('The final exam checks your knowledge of the whole tutorial: ' + EXAM.length + ' questions from basics to collections, lambdas and threads. You need <b>' + EXAM_PASS + '%</b> to pass.'),
      note('This is a self-assessment for your own practice. It is not an official certification.'),
      JT.renderQuiz(EXAM, { id: 'exam', passMark: EXAM_PASS }),
    ].join(''),
    after: (main, { wireQuiz }) => wireQuiz(EXAM, EXAM_PASS, 'exam'),
  });

  // ---------- Challenges index ----------
  JT.def('java_challenges', {
    body: () => {
      const all = JT.order.filter((s) => s.startsWith('java_challenges_') && JT.pages[s]);
      const solved = all.filter((s) => JT.store.get('challenges')[s]).length;
      const cards = all.map((s) => {
        const c = JT.pages[s].challenge;
        return '<a class="card" href="' + JT.url(s) + '">' + esc(JT.pages[s].title) + done('challenges', s) + '<small>' + c.task.replace(/<[^>]+>/g, '').slice(0, 110) + '…</small></a>';
      });
      return p('Code challenges ask you to write a complete program. Your code is really compiled and run, and its output is compared with the expected output. Solved challenges are marked <span class="badge done">done</span> (stored only in this browser).') +
        p('<b>Progress:</b> ' + solved + ' of ' + all.length + ' solved. For more problems, see ' + JT.link('java_practice', 'Practice Problems') + '.') +
        '<div class="card-grid">' + cards.join('') + '</div>';
    },
  });

  // ---------- Practice problems (graded by a real run) ----------
  const MAIN = (body) => 'public class Main {\n    public static void main(String[] args) {\n' + body.split('\n').map((l) => '        ' + l).join('\n') + '\n    }\n}';
  const PRACTICE = [
    { title: 'FizzBuzz', level: 'Easy', task: p('Print the numbers 1 to 15, one per line. For multiples of 3 print <code>Fizz</code> instead, for multiples of 5 print <code>Buzz</code>, and for multiples of both print <code>FizzBuzz</code>.'),
      starter: MAIN('for (int i = 1; i <= 15; i++) {\n    // your code\n}'), expected: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz' },
    { title: 'Sum of digits', level: 'Easy', task: p('Print the sum of the digits of <code>n = 98765</code> using a loop with <code>%</code> and <code>/</code>.'),
      starter: MAIN('int n = 98765;\nint sum = 0;\n// your code\nSystem.out.println(sum);'), expected: '35' },
    { title: 'Count the vowels', level: 'Easy', task: p('Print how many vowels (a, e, i, o, u, in either case) the word <code>Encyclopedia</code> contains.'),
      starter: MAIN('String word = "Encyclopedia";\nint vowels = 0;\n// your code\nSystem.out.println(vowels);'), expected: '5' },
    { title: 'Reverse the words', level: 'Easy', task: p('Print the words of <code>"Java makes code fun"</code> in reverse order, separated by single spaces: <code>fun code makes Java</code>.'),
      starter: MAIN('String sentence = "Java makes code fun";\n// your code'), expected: 'fun code makes Java' },
    { title: 'Second largest', level: 'Medium', task: p('Print the second-largest <b>distinct</b> value in the array <code>{12, 45, 7, 45, 30}</code>.'),
      starter: MAIN('int[] values = {12, 45, 7, 45, 30};\n// your code'), expected: '30', hint: 'Track the largest and second-largest values in one loop, skipping values equal to the largest.' },
    { title: 'Palindrome numbers', level: 'Medium', task: p('Print every number from 100 to 200 that reads the same backwards, on one line separated by spaces.'),
      starter: MAIN('// your code'), expected: '101 111 121 131 141 151 161 171 181 191' },
    { title: 'Letter frequency', level: 'Medium', task: p('Count each letter of <code>"banana"</code> and print the counts in alphabetical order, one per line, as <code>a=3</code>.'),
      starter: MAIN('String word = "banana";\n// your code'), expected: 'a=3\nb=1\nn=2', hint: 'A <code>TreeMap&lt;Character, Integer&gt;</code> keeps keys sorted. Remember to import <code>java.util.*</code>.' },
    { title: 'Transpose a matrix', level: 'Medium', task: p('Print the transpose of <code>{{1, 2, 3}, {4, 5, 6}}</code>: three rows of two numbers separated by a space.'),
      starter: MAIN('int[][] m = {{1, 2, 3}, {4, 5, 6}};\n// your code'), expected: '1 4\n2 5\n3 6' },
    { title: 'GCD and LCM', level: 'Medium', task: p('Write a method <code>gcd(int a, int b)</code> using Euclid\'s algorithm, then print <code>GCD 12, LCM 840</code> for 84 and 120.'),
      starter: 'public class Main {\n    // static int gcd(int a, int b) { ... }\n\n    public static void main(String[] args) {\n        int a = 84, b = 120;\n\n    }\n}', expected: 'GCD 12, LCM 840', hint: 'gcd(a, b) = gcd(b, a % b) until b is 0. LCM = a / gcd × b.' },
    { title: 'Anagram check', level: 'Medium', task: p('Write <code>isAnagram(String a, String b)</code> and print the result for <code>"evil"</code>/<code>"vile"</code> and for <code>"java"</code>/<code>"lava"</code>.'),
      starter: 'public class Main {\n    static boolean isAnagram(String a, String b) {\n        return false; // your code\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isAnagram("evil", "vile"));\n        System.out.println(isAnagram("java", "lava"));\n    }\n}', expected: 'true\nfalse', hint: 'Sort the characters of both words (<code>toCharArray</code> + <code>Arrays.sort</code>) and compare.' },
    { title: 'Grade report', level: 'Hard', task: p('Read lines of the form <code>name score</code> from standard input until it ends. Print the average with two decimals and the name of the top student.'),
      starter: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner in = new Scanner(System.in);\n        // your code\n    }\n}', stdin: 'Ana 78\nBo 92\nCy 85\n', expected: 'Average: 85.00\nTop: Bo' },
    { title: 'Collatz steps', level: 'Hard', task: p('Starting from 27, repeatedly halve even numbers and replace odd numbers <i>n</i> with 3<i>n</i> + 1. Print how many steps it takes to reach 1.'),
      starter: MAIN('long n = 27;\nint steps = 0;\n// your code\nSystem.out.println(steps);'), expected: '111' },
  ];
  JT.def('java_practice', {
    body: () => {
      const solved = JT.store.get('challenges');
      const cards = PRACTICE.map((pr, i) => '<button type="button" class="card practice-pick" data-pick="' + i + '" style="text-align:left;background:none;font:inherit;cursor:pointer">' +
        (i + 1) + '. ' + esc(pr.title) + (solved['practice_' + i] ? '<span class="badge done">done</span>' : '') + '<small>' + pr.level + '</small></button>').join('');
      return p('Extra problems to sharpen your skills. Choose one, write the program, and press <b>Run &amp; Check</b>: your code really runs, and the output must match exactly.') +
        '<div class="card-grid">' + cards + '</div><div id="practice-area"></div>';
    },
    after: (main, { renderChallenge, wireChallenge }) => {
      const area = document.getElementById('practice-area');
      main.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', () => {
        const i = Number(b.dataset.pick);
        const pr = PRACTICE[i];
        main.querySelectorAll('[data-pick]').forEach((x) => (x.style.borderColor = ''));
        b.style.borderColor = 'var(--accent)';
        area.innerHTML = '<hr>' + h2((i + 1) + '. ' + esc(pr.title) + ' <span class="badge">' + pr.level + '</span>') + renderChallenge(pr);
        wireChallenge('practice_' + i, pr);
        area.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }));
    },
  });
  JT.practiceProblems = PRACTICE;   // exposed for automated checks

  // ---------- Local runner ----------
  JT.def('java_server', {
    body: () => [
      p('Every <b>Run</b> button on this site sends your code to a small server running on <b>this computer</b>. The server compiles it with <code>javac</code>, runs it with <code>java</code>, and sends back exactly what the program printed. Nothing is simulated, and no code leaves your machine.'),
      h2('Status'),
      '<div class="console" id="srv-status"><span class="sys">Checking the runner…</span></div>',
      h2('Starting it'),
      code(`
        node server.js
        # then open http://127.0.0.1:8080/java/`),
      table(['Setting', 'Purpose'], [
        ['<code>PORT</code>', 'port to listen on (default 8080)'],
        ['<code>JAVA_RUNNER_HOME</code>', 'path of the JDK to use; otherwise the newest installed JDK is chosen'],
      ]),
      h2('How a run works'),
      ol([
        'The browser posts the code and any input to <code>/api/run</code>.',
        'The server writes the code into a fresh temporary folder, named after the public class.',
        'It compiles with a 20-second limit. Compiler errors are returned as they are.',
        'It runs the program with a 10-second limit, 256 MB of memory, and input from the stdin box.',
        'Output (up to 64 KB), the exit code and timings are returned, and the folder is deleted.',
      ]),
      h2('Security'),
      note('The runner is <b>not a sandbox</b>. Programs run with the permissions of the user who started the server and could read or change your files. The server only listens on 127.0.0.1 and rejects requests from other websites, but you should still only run code you understand.'),
    ].join(''),
    after: async () => {
      const box = document.getElementById('srv-status');
      try {
        const res = await fetch('/api/health');
        const h = await res.json();
        box.innerHTML = '<span>Runner is up. JDK ' + esc(String(h.version || '?')) + ' at ' + esc(h.jdk) + '</span>';
      } catch {
        box.innerHTML = '<span class="err">The runner is not reachable. Start it with: node server.js</span>';
      }
    },
  });

  // ---------- Syllabus ----------
  const GROUP_GOALS = {
    'Java Tutorial': 'syntax, output, variables, types, operators, strings, conditions, loops and arrays',
    'Java Methods': 'declaring and calling methods, parameters, return values, overloading, scope and recursion',
    'Java Classes': 'object-oriented programming: classes, constructors, encapsulation, inheritance, polymorphism, interfaces, enums, input and dates',
    'Java Errors': 'reading errors, debugging, and handling exceptions',
    'Java File Handling': 'creating, writing, reading and deleting files',
    'Java I/O Streams': 'byte and character streams and buffering',
    'Java Data Structures': 'lists, sets, maps, iterators and built-in algorithms',
    'Java Advanced': 'wrapper classes, generics, annotations, regex, threads, lambdas and sorting',
    'Java Projects': 'small projects that combine everything',
    'Java Cert': 'a final self-assessment',
    "Java How To's": 'short recipes for everyday tasks',
    'Java Reference': 'quick-lookup tables of keywords and methods',
  };
  JT.def('java_syllabus', {
    body: () => [
      p('The full course outline. Work through the modules in order: each one builds on the previous.'),
      table(['#', 'Module', 'You will learn', 'Pages'], lessonGroups().map((g, i) => [
        String(i + 1), JT.link(g.items[0].slug, esc(g.title)), GROUP_GOALS[g.title] || '', String(slugsOf(g).length),
      ])),
      h2('Learning outcomes'),
      ul([
        'Write, compile and run Java programs and read compiler messages.',
        'Use variables, operators, control flow, arrays and methods to solve problems.',
        'Design programs with classes, objects, inheritance and interfaces.',
        'Handle errors gracefully and work with files.',
        'Choose the right collection for a task and process data with lambdas and streams.',
      ]),
    ].join(''),
  });

  // ---------- Study plan ----------
  JT.def('java_study_plan', {
    body: () => [
      p('A suggested four-week plan at about one hour a day. Adjust the pace to suit you: understanding matters more than speed. Finish each lesson by running and changing its examples, then do its exercise or challenge.'),
      table(['Week', 'Topics', 'Practice'], [
        ['1', JT.link('java_intro', 'Intro') + ' → ' + JT.link('java_booleans', 'Booleans') + ': syntax, output, variables, types, operators, strings, math', 'Challenges for syntax to booleans; the ' + JT.link('java_projects', 'tip calculator') + ' project'],
        ['2', JT.link('java_conditions', 'If…Else') + ' → ' + JT.link('java_recursion', 'Recursion') + ': conditions, loops, arrays, methods', 'Control-flow and method challenges; ' + JT.link('java_practice', 'practice') + ' problems 1–4'],
        ['3', JT.link('java_oop', 'OOP') + ' → ' + JT.link('java_bufferedwriter', 'BufferedWriter') + ': classes, inheritance, interfaces, exceptions, files', 'Class challenge; guessing game and to-do projects; practice 5–8'],
        ['4', JT.link('java_data_structures', 'Data Structures') + ' → ' + JT.link('java_advanced_sorting', 'Advanced Sorting') + ': collections, generics, lambdas, threads', 'Practice 9–12; the ' + JT.link('java_quiz', 'quiz') + ', then the ' + JT.link('java_exam', 'final exam') + ''],
      ]),
      h2('Tips'),
      ul([
        'Type the examples yourself instead of copying them. Mistakes teach you to read compiler errors.',
        'After each lesson, change one thing in an example and predict the output before you run it.',
        'Keep a "mistakes log" of errors you met and how you fixed them.',
        'Review earlier topics briefly at the start of each week.',
      ]),
    ].join(''),
  });

  // ---------- Interview questions ----------
  const QA = [
    ['What is the difference between the JDK, the JRE and the JVM?', 'The JVM runs compiled bytecode. The JRE is the JVM plus the standard libraries needed to run programs. The JDK adds development tools such as the compiler <code>javac</code>. Modern Java ships the JDK only.'],
    ['Why is Java called platform-independent?', 'Source code compiles to bytecode, not machine code. Any system with a JVM can run that bytecode, so the same <code>.class</code> files work on Windows, Linux and macOS.'],
    ['What is the difference between == and equals()?', '<code>==</code> compares primitive values, or for objects whether two references point to the same object. <code>equals()</code> compares the contents, as defined by the class (for example the characters of two strings).'],
    ['Why are strings immutable?', 'Immutability makes strings safe to share between threads and to use as map keys, allows the JVM to reuse identical literals (the string pool), and prevents security-sensitive values from being changed after they are checked.'],
    ['What are the four pillars of OOP?', 'Encapsulation (hiding data behind methods), inheritance (reusing a class by extending it), polymorphism (one interface, many implementations) and abstraction (exposing what something does, not how).'],
    ['Abstract class or interface: when do you use which?', 'Use an abstract class when related classes share state and code. Use an interface to define a capability that unrelated classes can have; a class can implement many interfaces but extend only one class.'],
    ['What is the difference between overloading and overriding?', 'Overloading means several methods with the same name but different parameters in one class; it is resolved at compile time. Overriding means a subclass provides its own version of an inherited method; it is resolved at run time.'],
    ['What does the static keyword mean?', 'A static member belongs to the class itself rather than to any object. Static methods can be called without creating an object, and static fields are shared by all instances.'],
    ['Checked vs. unchecked exceptions?', 'Checked exceptions (such as <code>IOException</code>) must be caught or declared; they represent recoverable conditions. Unchecked exceptions extend <code>RuntimeException</code> and usually indicate programming bugs.'],
    ['ArrayList vs. LinkedList?', '<code>ArrayList</code> is backed by an array: fast random access, slower inserts in the middle. <code>LinkedList</code> uses linked nodes: fast inserts at the ends, slow access by index. <code>ArrayList</code> is the usual default.'],
    ['How does a HashMap work?', 'It computes the key\'s <code>hashCode()</code> to choose a bucket, then uses <code>equals()</code> to find the exact key within the bucket. That is why keys must implement both methods consistently.'],
    ['What is the difference between final, finally and finalize?', '<code>final</code> marks something unchangeable (a variable, method or class). <code>finally</code> is a block that always runs after try/catch. <code>finalize()</code> was an old object clean-up hook, now deprecated.'],
    ['What is a lambda expression?', 'A compact way to write an implementation of a functional interface (an interface with one abstract method), such as <code>x -&gt; x * 2</code>. Lambdas make it easy to pass behaviour to methods like <code>sort</code> or <code>stream().filter</code>.'],
    ['What is a race condition and how do you prevent it?', 'Two threads accessing shared data at the same time can interleave and corrupt it. Prevent it with <code>synchronized</code> blocks, locks, atomic classes, or by avoiding shared mutable state.'],
    ['What does garbage collection do?', 'The JVM automatically frees memory used by objects that can no longer be reached from the program. You do not delete objects manually, but you should drop references you no longer need.'],
  ];
  JT.def('java_interview_questions', {
    body: () => p('Common questions from Java job interviews, with short answers. Try to answer each one aloud before opening it.') +
      QA.map(([q, a], i) => '<details class="qa"><summary><b>' + (i + 1) + '.</b> ' + q + '</summary><p>' + a + '</p></details>').join(''),
  });
})();
