// Lessons: if/else, switch, while, for, break/continue, arrays.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, h3, note, syn, ex } = JT.h;
  const MAIN = (body) => 'public class Main {\n    public static void main(String[] args) {\n' + body + '\n    }\n}';

  // ---- Conditions ----
  JT.def('java_conditions', {
    body: () => [
      h2('Making decisions'),
      p('An <code>if</code> statement runs a block of code only when its condition is <code>true</code>.'),
      syn(`if (condition) {\n    // runs when condition is true\n}`),
      ex(`
        int battery = 15;
        if (battery < 20) {
            System.out.println("Battery low — plug in the charger.");
        }
        System.out.println("Check finished.");`),
      note('The condition must be a <code>boolean</code>. Unlike some languages, Java does not treat <code>0</code> or <code>null</code> as false.'),
    ].join(''),
    exercise: { q: 'Print "Hot" if <code>temp</code> is above 30.', code: '___ (temp > 30) {\n    System.out.println("Hot");\n}', options: ['when', 'if', 'case', 'check'], answer: ['if'] },
  });
  JT.def('java_conditions_else', {
    body: () => [
      h2('else'),
      p('<code>else</code> provides the block that runs when the condition is false.'),
      ex(`
        int stock = 0;
        if (stock > 0) {
            System.out.println("Add to cart");
        } else {
            System.out.println("Out of stock");
        }`),
    ].join(''),
  });
  JT.def('java_conditions_elseif', {
    body: () => [
      h2('else if'),
      p('Chain several conditions with <code>else if</code>. Java checks them from top to bottom and runs only the first block whose condition is true.'),
      ex(`
        int score = 74;
        if (score >= 90) {
            System.out.println("Grade A");
        } else if (score >= 75) {
            System.out.println("Grade B");
        } else if (score >= 60) {
            System.out.println("Grade C");
        } else {
            System.out.println("Try again");
        }`),
    ].join(''),
  });
  JT.def('java_conditions_shorthand', {
    body: () => [
      h2('The ternary operator'),
      p('<code>condition ? valueIfTrue : valueIfFalse</code> chooses between two values in a single expression.'),
      syn(`variable = (condition) ? expressionTrue : expressionFalse;`),
      ex(`
        int hour = 20;
        String greeting = (hour < 12) ? "Good morning" : "Good evening";
        System.out.println(greeting);`),
      note('Use the ternary operator for short choices. For anything with side effects or more than two outcomes, a normal <code>if</code> is clearer.'),
    ].join(''),
  });
  JT.def('java_conditions_nested', {
    body: () => [
      h2('Nested if'),
      p('An <code>if</code> can sit inside another <code>if</code>. The inner check only happens when the outer one passed.'),
      ex(`
        boolean hasTicket = true;
        int age = 15;
        if (hasTicket) {
            if (age >= 16) {
                System.out.println("Enjoy the concert!");
            } else {
                System.out.println("A parent must come with you.");
            }
        } else {
            System.out.println("Please buy a ticket first.");
        }`),
    ].join(''),
  });
  JT.def('java_conditions_logical', {
    body: () => [
      h2('Combining conditions'),
      p('Use <code>&amp;&amp;</code>, <code>||</code> and <code>!</code> to express richer rules in one condition.'),
      ex(`
        int age = 34;
        boolean member = false;
        if (age < 12 || age >= 65) {
            System.out.println("Reduced price");
        } else if (member && age >= 18) {
            System.out.println("Member price");
        } else {
            System.out.println("Full price");
        }`),
    ].join(''),
  });
  JT.def('java_conditions_reallife', {
    body: () => [
      h2('Example: a password length check'),
      ex(`
        String password = "s3cret!";
        if (password.length() < 8) {
            System.out.println("Too short (" + password.length() + " characters)");
        } else if (password.equals(password.toLowerCase())) {
            System.out.println("Add at least one uppercase letter");
        } else {
            System.out.println("Password accepted");
        }`),
      h3('Example: even or odd'),
      ex(`
        int n = 27;
        if (n % 2 == 0) {
            System.out.println(n + " is even");
        } else {
            System.out.println(n + " is odd");
        }`),
    ].join(''),
  });
  JT.challenge('conditions', {
    task: p('Write a program that classifies <code>int number = -8;</code>. Print <code>positive</code>, <code>negative</code> or <code>zero</code>. Then on a second line print <code>even</code> or <code>odd</code>.'),
    starter: MAIN('        int number = -8;\n\n'),
    expected: 'negative\neven',
    hint: 'Use <code>if / else if / else</code> for the sign and <code>number % 2 == 0</code> for even.',
  });

  JT.def('java_switch', {
    body: () => [
      h2('switch'),
      p('A <code>switch</code> compares one value against several <code>case</code> labels. It is a tidy alternative to a long chain of <code>else if</code>.'),
      ex(`
        int day = 3;
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            default:
                System.out.println("Another day");
        }`),
      p('<code>break</code> leaves the switch. Without it, execution "falls through" into the next case. <code>default</code> runs when no case matches.'),
      h2('Switch expressions (Java 14+)'),
      p('The arrow form needs no <code>break</code> and can return a value.'),
      ex(`
        String size = "M";
        int price = switch (size) {
            case "S" -> 8;
            case "M", "L" -> 10;
            default -> 12;
        };
        System.out.println("Price: " + price);`),
    ].join(''),
    exercise: { q: 'Complete the switch statement.', code: '___ (color) {\n    ___ "red":\n        System.out.println("Stop");\n        break;\n}', options: ['switch', 'case', 'when', 'if'], answer: ['switch', 'case'] },
  });
  JT.challenge('switch', {
    task: p('Use a <code>switch</code> on <code>char op = \'*\';</code> to compute <code>a op b</code> for <code>int a = 6, b = 4;</code> (support <code>+ - * /</code>) and print the result.'),
    starter: MAIN("        int a = 6, b = 4;\n        char op = '*';\n\n"),
    expected: '24',
    hint: 'A switch expression works well: <code>int result = switch (op) { case \'+\' -> a + b; ... };</code>',
  });

  // ---- Loops ----
  JT.def('java_while_loop', {
    body: () => [
      h2('while'),
      p('A <code>while</code> loop repeats its block as long as the condition stays true. The condition is checked before every round.'),
      syn(`while (condition) {\n    // repeated code\n}`),
      ex(`
        int countdown = 5;
        while (countdown > 0) {
            System.out.println(countdown);
            countdown--;
        }
        System.out.println("Lift-off!");`),
      note('Make sure something inside the loop eventually makes the condition false, or the loop never ends. The runner stops programs after 10 seconds.'),
    ].join(''),
    exercise: { q: 'Print numbers 1 to 3 with a while loop.', code: 'int i = 1;\n___ (i <= 3) {\n    System.out.println(i);\n    i___;\n}', options: ['while', '++', 'loop', '--'], answer: ['while', '++'] },
  });
  JT.def('java_while_loop_do', {
    body: () => [
      h2('do / while'),
      p('A <code>do/while</code> loop checks its condition <i>after</i> the block, so the block always runs at least once.'),
      ex(`
        int attempts = 10;
        do {
            System.out.println("Attempt " + attempts);
            attempts++;
        } while (attempts < 3);`),
    ].join(''),
  });
  JT.def('java_while_loop_reallife', {
    body: () => [
      h2('Example: digits of a number'),
      ex(`
        int number = 90417;
        int digits = 0;
        int sum = 0;
        while (number > 0) {
            sum += number % 10;
            number /= 10;
            digits++;
        }
        System.out.println(digits + " digits, digit sum " + sum);`),
      h3('Example: savings goal'),
      ex(`
        double balance = 1000;
        int years = 0;
        while (balance < 1500) {
            balance *= 1.05;
            years++;
        }
        System.out.printf("%d years, balance %.2f%n", years, balance);`),
    ].join(''),
  });
  JT.challenge('while_loop', {
    task: p('Using a <code>while</code> loop, print the powers of two from 1 up to and including 64, one per line.'),
    starter: MAIN('\n'),
    expected: '1\n2\n4\n8\n16\n32\n64',
    hint: 'Start with <code>int n = 1;</code> and double it each time while <code>n &lt;= 64</code>.',
  });

  JT.def('java_for_loop', {
    body: () => [
      h2('for'),
      p('When you know how many times to repeat, a <code>for</code> loop keeps the start value, condition and update together in one line.'),
      syn(`for (initialization; condition; update) {\n    // repeated code\n}`),
      ex(`
        for (int i = 1; i <= 5; i++) {
            System.out.println("Round " + i);
        }`),
      ex(`
        for (int i = 10; i >= 0; i -= 2) {
            System.out.print(i + " ");
        }`, { desc: 'Counting down in steps of two:' }),
    ].join(''),
    exercise: { q: 'Complete the loop that runs 5 times.', code: '___ (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}', options: ['for', 'while', 'repeat', 'loop'], answer: ['for'] },
  });
  JT.def('java_for_loop_nested', {
    body: () => [
      h2('Nested loops'),
      p('A loop inside another loop runs completely for every round of the outer loop.'),
      ex(`
        for (int row = 1; row <= 3; row++) {
            for (int col = 1; col <= 4; col++) {
                System.out.print(row * col + "\\t");
            }
            System.out.println();
        }`),
    ].join(''),
  });
  JT.def('java_foreach_loop', {
    body: () => [
      h2('for-each'),
      p('The enhanced <code>for</code> loop visits every element of an array or collection without an index variable.'),
      syn(`for (type element : arrayOrCollection) {\n    // use element\n}`),
      ex(`
        String[] planets = {"Mercury", "Venus", "Earth", "Mars"};
        for (String planet : planets) {
            System.out.println(planet);
        }`),
    ].join(''),
  });
  JT.def('java_for_loop_reallife', {
    body: () => [
      h2('Example: a multiplication table'),
      ex(`
        int n = 7;
        for (int i = 1; i <= 10; i++) {
            System.out.println(n + " x " + i + " = " + n * i);
        }`),
      h3('Example: sum of 1..100'),
      ex(`
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            sum += i;
        }
        System.out.println(sum);`),
    ].join(''),
  });
  JT.challenge('for_loop', {
    task: p('Use nested <code>for</code> loops to print this right-angled triangle of stars.'),
    starter: MAIN('\n'),
    expected: '*\n**\n***\n****',
    hint: 'The inner loop should run <code>row</code> times; print a new line after it.',
  });

  JT.def('java_break', {
    body: () => [
      h2('break'),
      p('<code>break</code> leaves a loop immediately.'),
      ex(`
        for (int i = 1; i <= 10; i++) {
            if (i == 4) {
                break;
            }
            System.out.println(i);
        }`),
      h2('continue'),
      p('<code>continue</code> skips the rest of the current round and jumps to the next one.'),
      ex(`
        for (int i = 1; i <= 6; i++) {
            if (i % 3 == 0) {
                continue;
            }
            System.out.println(i);
        }`),
      h2('In while loops'),
      ex(`
        int n = 0;
        while (true) {
            n++;
            if (n % 2 == 1) continue;
            if (n > 8) break;
            System.out.println(n);
        }`),
    ].join(''),
    exercise: { q: 'Stop the loop when <code>i</code> reaches 5.', code: 'for (int i = 0; i < 10; i++) {\n    if (i == 5) {\n        ___;\n    }\n}', options: ['stop', 'break', 'exit', 'continue'], answer: ['break'] },
  });

  // ---- Arrays ----
  JT.def('java_arrays', {
    body: () => [
      h2('Arrays'),
      p('An array stores several values of the same type in one variable. Its size is fixed when it is created.'),
      ex(`
        String[] fruits = {"apple", "banana", "cherry"};
        System.out.println(fruits[0]);
        System.out.println(fruits.length);`),
      h2('Changing an element'),
      p('Elements are numbered from 0. Assign to an index to replace a value.'),
      ex(`
        int[] temps = {12, 15, 9};
        temps[2] = 11;
        System.out.println(temps[2]);`),
      h2('Creating an empty array'),
      ex(`
        double[] prices = new double[3]; // all values start at 0.0
        prices[0] = 4.5;
        System.out.println(java.util.Arrays.toString(prices));`),
      note('Reading index <code>length</code> or higher throws an <code>ArrayIndexOutOfBoundsException</code>.'),
    ].join(''),
    exercise: { q: 'Create an array and print its first element.', code: 'String[] cars = {"Volvo", "Fiat"};\nSystem.out.println(cars[___]);', options: ['1', '0', 'first', '-1'], answer: ['0'] },
  });
  JT.def('java_arrays_loop', {
    body: () => [
      h2('Looping through an array'),
      ex(`
        int[] steps = {4200, 8100, 6500, 10200};
        for (int i = 0; i < steps.length; i++) {
            System.out.println("Day " + (i + 1) + ": " + steps[i]);
        }`),
      ex(`
        int[] steps = {4200, 8100, 6500, 10200};
        int total = 0;
        for (int s : steps) {
            total += s;
        }
        System.out.println("Total: " + total);`, { desc: 'With for-each when the index is not needed:' }),
    ].join(''),
  });
  JT.def('java_arrays_reallife', {
    body: () => [
      h2('Example: average and maximum'),
      ex(`
        double[] grades = {7.5, 8.0, 6.5, 9.0, 8.5};
        double sum = 0, max = grades[0];
        for (double g : grades) {
            sum += g;
            if (g > max) max = g;
        }
        System.out.println("Average: " + sum / grades.length);
        System.out.println("Best: " + max);`),
      h3('Example: sorting'),
      ex(`
        int[] nums = {42, 7, 19, 3, 88};
        java.util.Arrays.sort(nums);
        System.out.println(java.util.Arrays.toString(nums));`),
    ].join(''),
  });
  JT.def('java_arrays_multi', {
    body: () => [
      h2('Multidimensional arrays'),
      p('An array of arrays forms a grid. Use two indexes: row then column.'),
      ex(`
        int[][] seats = {
            {1, 0, 1},
            {0, 0, 1}
        };
        System.out.println(seats[1][2]);
        for (int[] row : seats) {
            for (int s : row) {
                System.out.print(s == 1 ? "X " : ". ");
            }
            System.out.println();
        }`),
    ].join(''),
  });
  JT.challenge('arrays', {
    task: p('Given <code>int[] values = {5, 12, 8, 21, 3};</code> print the sum on the first line and the largest value on the second.'),
    starter: MAIN('        int[] values = {5, 12, 8, 21, 3};\n\n'),
    expected: '49\n21',
    hint: 'Loop once, keeping a running <code>sum</code> and a <code>max</code> that starts at <code>values[0]</code>.',
  });
})();
