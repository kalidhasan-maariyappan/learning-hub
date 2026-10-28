// Lessons: methods, parameters, return values, overloading, scope, recursion.
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, note, syn, ex } = JT.h;

  JT.def('java_methods', {
    body: () => [
      h2('What is a method?'),
      p('A method is a named block of code that runs only when it is <b>called</b>. Methods let you reuse code and split a program into small, understandable pieces.'),
      syn(`static returnType methodName() {\n    // code\n}`),
      ex(`
        public class Main {
            static void sayHello() {
                System.out.println("Hello from a method!");
            }

            public static void main(String[] args) {
                sayHello();
                sayHello();
            }
        }`),
      ul(['<code>static</code> means the method belongs to the class, so <code>main</code> can call it without creating an object.', '<code>void</code> means it does not return a value.', 'The parentheses hold parameters (none here).']),
    ].join(''),
    exercise: { q: 'Call the method <code>greet</code>.', code: 'static void greet() {\n    System.out.println("Hi");\n}\n\npublic static void main(String[] args) {\n    ___;\n}', options: ['greet()', 'call greet', 'greet', 'run(greet)'], answer: ['greet()'] },
  });

  JT.challenge('methods', {
    intro: p('Methods are the building blocks of every Java program. Show that you can declare and call one.'),
    task: p('Write a <code>static void</code> method <code>drawLine()</code> that prints ten dashes. Call it twice from <code>main</code>, printing <code>Report</code> between the calls.'),
    starter: `
      public class Main {
          // declare drawLine() here

          public static void main(String[] args) {

          }
      }`,
    expected: '----------\nReport\n----------',
  });

  JT.def('java_methods_param', {
    body: () => [
      h2('Parameters'),
      p('Parameters pass information into a method. They behave like local variables that the caller fills in. Values passed in a call are called <b>arguments</b>.'),
      ex(`
        public class Main {
            static void welcome(String name, int visits) {
                System.out.println("Welcome back, " + name + "! Visit #" + visits);
            }

            public static void main(String[] args) {
                welcome("Noor", 3);
                welcome("Sam", 12);
            }
        }`),
      note('Arguments must match the parameters in number, order and type.'),
    ].join(''),
  });
  JT.def('java_methods_return', {
    body: () => [
      h2('Return values'),
      p('Replace <code>void</code> with a type to make a method produce a value. <code>return</code> ends the method and hands the value back to the caller.'),
      ex(`
        public class Main {
            static double circleArea(double radius) {
                return Math.PI * radius * radius;
            }

            static boolean isEven(int n) {
                return n % 2 == 0;
            }

            public static void main(String[] args) {
                System.out.printf("%.2f%n", circleArea(3));
                System.out.println(isEven(10));
                int x = 7;
                if (!isEven(x)) {
                    System.out.println(x + " is odd");
                }
            }
        }`),
    ].join(''),
  });
  JT.challenge('methods_param', {
    task: p('Write a method <code>static int max3(int a, int b, int c)</code> that returns the largest of three numbers. Print <code>max3(4, 19, 11)</code> and <code>max3(-2, -9, -5)</code>.'),
    starter: `
      public class Main {
          static int max3(int a, int b, int c) {
              return 0; // your code here
          }

          public static void main(String[] args) {
              System.out.println(max3(4, 19, 11));
              System.out.println(max3(-2, -9, -5));
          }
      }`,
    expected: '19\n-2',
    hint: '<code>Math.max(a, Math.max(b, c))</code> is one way.',
  });

  JT.def('java_methods_overloading', {
    body: () => [
      h2('Method overloading'),
      p('Several methods may share a name as long as their parameter lists differ. Java picks the right one based on the arguments.'),
      ex(`
        public class Main {
            static int add(int a, int b) {
                return a + b;
            }

            static double add(double a, double b) {
                return a + b;
            }

            static int add(int a, int b, int c) {
                return a + b + c;
            }

            public static void main(String[] args) {
                System.out.println(add(2, 3));
                System.out.println(add(2.5, 0.25));
                System.out.println(add(1, 2, 3));
            }
        }`),
      note('Only the return type is not enough to overload: the parameters must differ.'),
    ].join(''),
  });

  JT.def('java_scope', {
    body: () => [
      h2('Scope'),
      p('A variable is only visible inside the block where it is declared — its <b>scope</b>.'),
      ex(`
        public class Main {
            public static void main(String[] args) {
                int outer = 1;
                {
                    int inner = 2;
                    System.out.println(outer + inner);
                }
                // inner is not visible here
                for (int i = 0; i < 2; i++) {
                    System.out.println("i = " + i);
                }
                // i is not visible here either
                System.out.println(outer);
            }
        }`),
      ex(`
        int total = 5;
        if (total > 0) {
            int bonus = 10;
        }
        System.out.println(bonus); // error: cannot find symbol`, { desc: 'This example fails to compile on purpose.' }),
    ].join(''),
  });

  JT.def('java_recursion', {
    body: () => [
      h2('Recursion'),
      p('A recursive method calls itself, each time with a smaller problem, until it reaches a simple <b>base case</b> that it can answer directly.'),
      ex(`
        public class Main {
            static int factorial(int n) {
                if (n <= 1) {
                    return 1;              // base case
                }
                return n * factorial(n - 1); // recursive step
            }

            public static void main(String[] args) {
                System.out.println(factorial(5));
            }
        }`),
      ex(`
        public class Main {
            static int sumDigits(int n) {
                return n < 10 ? n : n % 10 + sumDigits(n / 10);
            }

            public static void main(String[] args) {
                System.out.println(sumDigits(2026));
            }
        }`),
      note('Without a base case the method calls itself forever and the program ends with a <code>StackOverflowError</code>.'),
    ].join(''),
  });
})();
