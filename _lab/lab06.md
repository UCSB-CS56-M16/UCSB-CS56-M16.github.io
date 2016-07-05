---
layout: lab
num: lab06
ready: false
desc: "Recursive Descent Parsing"
assigned: 2016-07-13 09:30:00.00-7
due: 2016-07-22 17:00:00.00-7
javadoc_prefix: "https://ucsb-cs56-m16.github.io/cs56-parsing-assignment-javadoc/index.html?"
---

TODO: Fill in this lab.

# Summary #

In this assignment, you will add some features to an existing parser and interpreter of arithmetic expressions.
The provided interpreter may or may not be buggy; it is your responsibility to test things thoroughly.
The bulk of the difficulty of this assignment is expected to be in determining exactly what in the existing interpreter must be modified, without dramatically changing how the interpreter works.

We do not expect you to be familiar with these topics already.
As such, details regarding necessary background information on parsing and interpretation follow.
Our treatment of these topics is quite shallow; you will get a more in-depth introduction to these topics in courses such as:

* [CMPSC 138](http://www.cs.ucsb.edu/education/courses/cmpsc-138) (Automata and Formal Languages)
* [CMPSC 160](http://www.cs.ucsb.edu/education/courses/cmpsc-160) (Compilers)
* [CMPSC 162](http://www.cs.ucsb.edu/education/courses/cmpsc-162) (Programming Languages)


# Background #

The execution of a program is a complex problem requiring multiple distinct components working together.
To illustrate this complexity, consider the snippet of Java code below:

```java
if (x > 7) { // magic number
  foo = 10;
} else {
  /* TODO: this needs a better solution
     right now this is broken */
  System.err.println( "FIX THIS CODE" );
}
```

From a human standpoint, the above code is relatively simple.
However, from the standpoint of a system which reads the above code character-by-character, there are immediately some challenges here, including:

1. The characters `x > 7` (as in the above program) have the same meaning as `x>7`, as whitespace is unimportant in this context.
   For simplicity and consistency, these two forms should be treated uniformly.
   Simply stripping programs of all whitespace looks promising here, except...
2. Some whitespace is significant.
   For example, with `"FIX THIS CODE"`, we cannot simply strip out the whitespace.
   Otherwise the program would print `"FIXTHISCODE"`, which differs from the intended string.
   In this particular example, the component which reads the code must understand that `"` is somehow significant, and that the whole string `"FIX THIS CODE"` must be treated as a single unit.
3. Certain groupings of characters act as a single unit.
   This was true for `"FIX THIS CODE"`, but it is also true for `if`, `else`, `foo`, `System`, `err`, and `println`.
   This is even true for `10`, which represents the decimal constant "10" as opposed to two completely independent digits.
   Each of these element groupings are indivisible.
4. Whole groupings of characters form even larger cohesive units.
   The previous point alone suggests that the character string `if if else if if if` might form a valid program, but this clearly isn't true.
   In the Java snippet, `if` and `else` work together to form a single if-else statement.
5. Making things even more complex with the if-else statement in the Java code snippet, the braces (`{` and `}`) are not actually required here.
   If we had multiple statements they would be required.
   As with the first point, this difference is not significant when it comes to actually executing the code (they work the same), so they should be treated uniformly.
6. We can have recursive forms.
   While `System.err.println(...)` may look simple, this actually reads as `(System.err).println(...)`.
   That is, this uses the dot (`.`) operator in a nested way.
   Nested loops and nested if-else statements behave similarly.
7. The variables `x` and `foo` have particular values which may change as the program is executed.
   The values of these variables are independent of issues like whether or not braces were used in if-else statements.
   Additionally, the comments in the above code have no effect on the program's execution.
   As such, actually executing the code is a very different problem from reading the code.

This is but a short list of potential challenges, but the main point should be clear: this is a complex problem, with multiple different concerns in play.
The trick which is often employed to make this tractable to reason about is to separate these problems into distinct phases, where each phase addresses a unique set of concerns.
There are different ways of going about this.
However, one of the simplest and most commonly-employed methods is to take a three-phase approach, where the phases are (in order):

1. Tokenization
2. Parsing
3. Interpretation

Further description of each of these phases follows.

## Tokenization ##

Tokenization involves converting larger sequences of characters into meaningful units (integers, operators, variables, keywords, etc.).
Each of these units is called a "token".
To illustrate what tokens are, consider again the aforementioned Java code snippet, repeated below for convenience:

```java
if (x > 7) { // magic number
  foo = 10;
} else {
  /* TODO: this needs a better solution
     right now this is broken */
  System.err.println( "FIX THIS CODE" );
}
```

This code snippet contains over 100 characters.
However, it contains only 24 tokens, namely (put into a table to save space):

|                 |     |      |         |        |
|-----------------|-----|------|---------|--------|
|`if`             |`(`  |`x`   |`>`      |`7`     |
|`)`              |`{`  |`foo` |`=`      |`10`    |
|`;`              |`}`  |`else`|`{`      |`System`|
|`.`              |`err`| `.`  |`println`|`(`     |
|`"FIX THIS CODE"`|`)`  | `;`  |`}`      |        |

As shown, tokens separate semantically meaningful groupings of characters into individual units.
For example, `if`, `else`, `10`, `"FIX THIS CODE"`, and others are considered individual, distinct tokens.
Additionally, components extraneous to the code, such as unnecessary whitespace and comments, are completely stripped out.
That said, there are still some "extra" components in here, such as the braces (`{` and `}`).
This is left for the next phase to handle, namely parsing.

## Parsing ##

Parsing involves recognizing structures that are made up of tokens.
These structures can be large, and they may even be recursively defined (as with if-else statements).
Such structures are usually referred to as **Abstract Syntax Trees** (ASTs).
A breakdown of this term follows:

- **Abstract**: this forms an abstraction over not only what the programmer typed, but over the language's syntax itself.
  This is in contrast to the **Concrete** syntax, which includes extra details which are ultimately unimportant to execution.
  For example, `if` statements work in the same way whether or not braces (`{` and `}`) are used.
  As such, we can treat `if` statements with and without braces uniformly, and this is precisely what is done in the abstract syntax.
- **Syntax**: these deal with the syntax of the language.
- **Tree**: The underlying representation for the code is that of a tree.

To better understand what an AST is, consider the following example.
This shows an AST which resulted from parsing the tokens `1`, `+`, `2`:

![1+2](IMAGES/1+2.png)

As shown, `+` forms the root of the tree, and it has the child nodes `1` and `2`.
Each of these is a leaf, which makes sense considering that integer constants simply evaluate to themselves without any other bits of code getting involved.

A more complex example is shown below, which uses the tokens from our running example.
The actual tokens have been repeated below for convenience.

|                 |     |      |         |        |
|-----------------|-----|------|---------|--------|
|`if`             |`(`  |`x`   |`>`      |`7`     |
|`)`              |`{`  |`foo` |`=`      |`10`    |
|`;`              |`}`  |`else`|`{`      |`System`|
|`.`              |`err`| `.`  |`println`|`(`     |
|`"FIX THIS CODE"`|`)`  | `;`  |`}`      |        |

![parsing_example](IMAGES/parsing_example.png)

As shown in the above example, parsing takes operator precedence into account.
Specifically, the parser knew to parse `System.err.println(...)` effectively as `(System.err).println(...)`, as opposed ot the invalid `System.(err.println(...))`.

## <a name="interpreter_general_description"></a>Interpretation ##

Interpretation involves taking ASTs and recursively evaluating them to values.
In a language like Java, this can get fairly complex, given the complexity of the overall language.
As such, we will refrain from using the running example here.
Instead, we'll use a much simpler arithmetic expression language for the purpose of an example.

Consider the AST below, corresponding to the expression `3 * 4 + 2`:

![interp_01](IMAGES/interp_01.png)

Evaluation starts at the top of the AST, which corresponds to the `+` node in this AST.
The `+` node first finds the value of its left child, corresponding to the `*` node.
Evaluation then proceeds to the `*` node, which gets the value of its left child.
This leads evaluation to the `3` node.
Because the constant `3` trivially evaluates to itself, evaluation returns `3` at this point.
This is illustrated in the image below, which shows values returned from evaluation in red:

![interp_02](IMAGES/interp_02.png)

Once the `3` node is complete, evaluation goes back to the `*` node, which gets the value of its right child.
Evaluation then moves to the `4` node, which simply returns `4`.
This is illustrated below:

![interp_03](IMAGES/interp_03.png)

Evaluation now proceeds to the `*` node, which finally has the values of both of its child nodes.
From here, it multiplies these values together, and returns the result.
This is illustrated below:

![interp_04](IMAGES/interp_04.png)

At this point, evaluation returns to the `+` node, which now has the value of its left child (`*`).
Evaluation then proceeds to the right child, which returns the constant `2`, illustrated below:

![interp_05](IMAGES/interp_05.png)

The `+` node finally has the values of both of its children, and subsequently adds them together.
This result is then returned.
This is illustrated below:

![interp_06](IMAGES/interp_06.png)

Note that this entire process followed the general pattern of a recursive depth-first traversal.

# Provided Components #

You are given an existing tokenizer, parser, and interpreter for a simple arithmetic expression language.
The language consists of the following feature set:

- Addition (`+`)
- Subtraction (`-`)
- Multiplication (`*`)
- Division (`/`).
  Division by zero is considered an error condition which is handled specially.
- Parenthesized expressions
- Unary minus (e.g., `-3`)

Some examples of programs in this language follow, along with their expected results:

| Expresssion             | Result                          |
|-------------------------|---------------------------------|
| `2+4`                   |  6                              |
| `3+4/5-6*2+3/7`         | -9                              |
| `3+(4/5)-(6*2)+(3/7)`   | -9                              |
| `((3+4)/(5-6))*(2+3)/7` | -5                              |      
| `2+`                    | error (parsing)                 |
| `)5(`                   | error (parsing)                 |
| `((2+3)`                | error (parsing)                 |
| `@2`                    | error (tokenization)            |
| `1/0`                   | error (interpretation)          |

The provided components collectively handle the above feature set.
While some tests are included, you are encouraged to write your own tests.
There may be bugs in the provided code, and indeed some bugs may have been *intentionally placed* into the code.

Further description of each of the provided components follows.

## Provided Tokenizer ##

The tokenizer is spread across the `.java` files in `src/edu/ucsb/cs56/pconrad/parsing/tokenizer`.
The tokenizer recognizes the following tokens:

* integers (e.g., `1`, `672`, `25`)
* left-paren `(`
* right-paren `)`
* plus `+`
* minus `-`
* times `*`
* divide `/`

## Provided Parser ##

The parser is spread across the `.java` files in `src/edu/ucsb/cs56/pconrad/parsing/parser`.
While this parser is relatively simple compared to the one for Java, this still contains a fair amount of complexity.
Describing how this parser works is fairly difficult to do purely in English.
Fortunately, there are standardized ways of describing how a parser should work, and we will use one of them here.
The specific technique we will use is that of [Extended Backus-Naur Form (EBNF)](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_Form), which traces its history back to the development of the programming language [ALGOL](https://en.wikipedia.org/wiki/ALGOL) in the 1950s.
This technique, along with its particular application to our arithmetic expression language, is subsequently described.

In EBNF, languages are broken up into **terminals** and **non-terminals**.
To understand what these terms mean, consider the AST for `1+2` again, repeated below for convenience:

![1+2](IMAGES/1+2.png)

In this AST, `1` and `2` would be terminals, because they are leaves in the tree (that is, they *terminate* paths through the tree).
In contrast, `+` would be a non-terminal, as it acts as an internal node in the tree (that is, non-terminals *do not terminate* paths through the tree).

A relatively simple EBNF description of a parser that could handle `1+2` is shown below:

```
simple ::= INTEGER '+' INTEGER
```

The above description roughly states that `simple` is a non-terminal, which consists of a terminal `INTEGER` (which is understood to mean integers like `1`, `734`, `28`, and so on), followed by the `+` token, followed by another `INTEGER` token.

In general, grammars in EBNF consist of a series of *productions*, each of which has:
* a left-hand side consisting of a non-terminal
* the symbol `::=` which is read as "produces"
* a right-hand side, which consists of a sequence that may include both terminals and non-terminals

In our example with `simple`, there is only one production, namely `simple` itself.
The `simple` example is actually too simple for our purposes.
While it will handle inputs like `1+2`, `3+4`, and so on, it does not understand other operations like `-` (e.g., it does not handle `1-2`).
Moreover, it cannot handle nested inputs, such as `1+2+3`.
In order to handle all these other desirable features, we need to add some additional productions to this, and overall make some major changes.
Exactly what changes need to be made and why we make them is beyond the scope of this assignment and even the course overall; this is a topic better suited for [CMPSC 160](http://www.cs.ucsb.edu/education/courses/cmpsc-160) (Compilers).
As such, we will merely provide the final EBNF description of our language's parser, shown below:

```
expression ::= additive-expression
additive-expression ::= multiplicative-expression ( ( '+' | '-' ) multiplicative-expression ) *
multiplicative-expression ::= primary ( ( '*' | '/' ) primary ) *
primary ::= '(' expression ')' | INTEGER | '-' primary
```

This grammar adds in some additional complexity, along with some features of EBNF which have not yet been discussed.
Here is how to make sense of these four productions:

*   The non-terminals in the above grammar are 
    `expression`, `additive-expression`, `multiplicative-expression`, and `primary`.  
*   The terminals are `'+'`, `'-'`, `'*'`, `'/'`, `'('`, `')'`, and `INTEGER`, where `INTEGER` is a stand-in 
    for non-negative integers (e.g., `1`, `17`, `254`, and so on)
*   When parentheses appear without quotes around them (e.g. `( )` as opposed to `'('` and `')'`), 
    they are used for grouping.

* The vertical bar (`|`) signifies "or".  For example `( '*' | '/' )` means "either the star or the slash symbol appears here".
* The star, when not in quotes, signifies "zero or more repetitions of".  
  For example `primary ( ( '*' | '/' ) primary ) *` means "a instance of `primary`" followed by zero or more instances of "a star or a slash followed by another `primary`."

This EBNF description is a simplified version of the example from the Wikipedia page for [Operator-Precedence Parser](https://en.wikipedia.org/wiki/Operator-precedence_parser).
Of special note is the fact that the token `-` appears in two distinct places in the above productions.
One case handles binary minus, as with `1-2`, and another case handles unary minus, as with `-7`.
Both cases still deal with the same token, namely `-`.
The provided parser should correctly handle this description, modulo any bugs.

## Provided Interpreter ##

The interpreter is spread across the `.java` files in `src/edu/ucsb/cs56/pconrad/parsing/parser/evaluator`.
The interpreter is arguably the simplest component in all of the provided code; for the most part, it merely executes whatever the user specified using the [same mechanism previously described](#interpreter_general_description).
The only exeception to this is if division by zero occurs, in which case it will throw an `EvaluatorException`.

# What You'll Implement #

Your task is to update all three components&mdash;the tokenizer, parser, and interpreter&mdash;to handle the following new features:

- The equals operator (`==`)
- The not-equals operator (`!=`)

Both of these are binary operators that compare the integer values on the left and right.  They will each return a true or false value, with true represented as the integer `1`, and false represented as the integer `0`.    Accordingly, there is still only one *type* in the system, namely *integer*.

In the tokenizer, adding these operators will entail handling `==` and `!=` as fundamentally new tokens.  You'll need to defined new classes for these tokens that implement the [`Token`]({{page.javadoc_prefix}}edu/ucsb/cs56/pconrad/parsing/tokenizer/Token.html) interface defined in `src/edu/ucsb/cs56/pconrad/parsing/tokenizer/Token.java`.

Reading in the tokens will require you to use the [State Pattern](https://en.wikipedia.org/wiki/State_pattern), which is heavily utilized in the tokenizer.

Adding in additional tokens will require you to understand the Visitor Pattern; for this, you should consult [our tutorial on the Visitor Pattern](https://github.com/UCSB-CS56-M16/visitor-pattern-tutorial), and perhaps also [the Wikipedia entry on the Visitor Pattern](https://en.wikipedia.org/wiki/Visitor_pattern).

In the parser, you'll need to handle the following EBNF description, derived from the Wikipedia page for [Operator-precedence_parser](https://en.wikipedia.org/wiki/Operator-precedence_parser) (as of 06/13/2016):

```
expression ::= equality-expression
equality-expression ::= additive-expression ( ( '==' | '!=' ) additive-expression ) *
additive-expression ::= multiplicative-expression ( ( '+' | '-' ) multiplicative-expression ) *
multiplicative-expression ::= primary ( ( '*' | '/' ) primary ) *
primary ::= '(' expression ')' | INTEGER | '-' primary
```

The crucial difference between this EBNF description and the one currenly implemented this one has an additional level in it, namely `equality-expression`.

In the interpreter, these new operations will also need to be handled.
Equality expressions will be evaluated and return either 1 for true, or 0 for false (thus preserving the simplifying rule that the results of all operations are of type integer.)

The `main` function defined in `src/edu/ucsb/cs56/pconrad/parsing/Main.java` serves as an entry point for the overall interpreter.
This should work properly with the new operations you have added, and you **should not** modify `main` in any way.

The provided code is fairly complex, and it very much resembles the final product after many rounds of modification and refactoring.
To get a better idea of how this code works starting from the most basic version, you may wish to consult the code on branches `part01` through `part13`.
`part01` is the first version, which has a major bug present, and it can only determine if something parses.
That is, it does *not* produce ASTs, so it is not very useful in practice.
However, it is extremely simple, with nearly all the code in a single file under 150 lines.
Incrementally this is refined all the way up until `part13`, which is the version which you'll be putting your modifications on.

Javadoc for the provided code is available [here](https://ucsb-cs56-m16.github.io/cs56-parsing-assignment-javadoc/).

You may ignore the code in the `src/edu/ucsb/cs56/pconrad/parsing/fuzzing` directory.
This code, however, should compile without modification.

<div style="display:none">
http://ucsb-cs56-m16.github.io/lab/lab06/
</div>
