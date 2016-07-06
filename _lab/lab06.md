---
layout: lab
num: lab06
ready: false
desc: "Recursive Descent Parsing"
assigned: 2016-07-13 09:30:00.00-7
due: 2016-07-22 17:00:00.00-7
javadoc_prefix: "https://ucsb-cs56-m16.github.io/cs56-parsing-assignment-javadoc/index.html?"
starter_repo: "https://github.com/UCSB-CS56-M16/cs56-parsing-assignment/"
tutorial_repo: "https://github.com/UCSB-CS56-M16/cs56-parsing-tutorial/"
---

TODO LIST:

* Create {{page.starter_repo}}.  Populate master branch with the code the students should start with.  Remove fuzzer code.
* Create {{page.tutorial_repo}}.  Put the code from the branches of cs56-parsing-assignment-private, part01 through part13, into subdirectories part01 through part13.   Also, create a README.md and factor out into that, some of the tutorial material from the lab06 writeup.
* Update the javadoc.  (i.e. consider adding some actual javadoc comments in the places where that would add value.)
* Add a "q" to the REPL in main that quits (and perhaps read until EOF so that CTRL/D works?)  Try using the repl
  interactively, by running `java -jar parser.jar` 



# Summary #

In this assignment, you will add some features to an existing parser and interpreter of arithmetic expressions.

You should start by reading the [cs56-parsing-tutorial]({{page.tutorial_repo}}).   It contains important background
information about parsing, grammars, tokens, etc.   

<div style="margin-left:auto; margin-right:auto; width:80%; border: 10px inset red; font-weight: bold; padding: 1em;" markdown="1">

The remainder of this writeup assumes that you have thoughly read and understood the information in the [cs56-parsing-tutorial]({{page.tutorial_repo}}).  If you have not, it will not make any sense to you.

</div>

The provided interpreter may or may not be buggy; it is your responsibility to test things thoroughly.

The bulk of the difficulty of this assignment is expected to be in determining exactly what in the existing interpreter must be modified, without dramatically changing how the interpreter works.


# What You'll Implement #

Your task is to update all three components of the starter code&mdash;the tokenizer, parser, and interpreter&mdash;to handle the following new features:

- The equals operator (`==`)
- The not-equals operator (`!=`)

Both of these are binary operators that compare the integer values on the left and right.  They will each return a true or false value, with true represented as the integer `1`, and false represented as the integer `0`.    Accordingly, there is still only one *type* in the system, namely *integer*.

In the tokenizer, adding these operators will entail handling `==` and `!=` as fundamentally new tokens.  You'll need to defined new classes for these tokens that implement the [`Token`]({{page.javadoc_prefix}}edu/ucsb/cs56/pconrad/parsing/tokenizer/Token.html) interface defined in `src/edu/ucsb/cs56/pconrad/parsing/tokenizer/Token.java`.   As models, you might look at the classes that currently implement that interface.  You can figure out what those are from looking at the javadoc for [`interface edu.ucsb.cs56.pconrad.parsing.tokenizer.Token`]({{page.javadoc_prefix}}edu/ucsb/cs56/pconrad/parsing/tokenizer/Token.html).

Reading in the tokens will require you to use the [State Pattern](https://en.wikipedia.org/wiki/State_pattern), which is a Design Pattern heavily utilized in the tokenizer.    Your reading in the HFDP textbook about Design Patterns, in general, may help here.

Adding in additional tokens will require you to understand another Design Pattern, namely the Visitor Pattern. For this, you should consult [our tutorial on the Visitor Pattern](https://github.com/UCSB-CS56-M16/visitor-pattern-tutorial), and perhaps also [the Wikipedia entry on the Visitor Pattern](https://en.wikipedia.org/wiki/Visitor_pattern).

In the parser, you'll need to handle the following EBNF description, derived from the Wikipedia page for [Operator-precedence_parser](https://en.wikipedia.org/wiki/Operator-precedence_parser) (retrieved 06/13/2016):

```
expression ::= equality-expression
equality-expression ::= additive-expression ( ( '==' | '!=' ) additive-expression ) *
additive-expression ::= multiplicative-expression ( ( '+' | '-' ) multiplicative-expression ) *
multiplicative-expression ::= primary ( ( '*' | '/' ) primary ) *
primary ::= '(' expression ')' | INTEGER | '-' primary
```

There is a crucial difference between this EBNF description and the one in the code provided to you.  The difference&mdash;that is, the change that your code needs to implement&mdash;is the addition of another level in the grammar, namely `equality-expression`.

The interpreter will also need to be modified to handle the two new operators `==` and `!=`.
Expressions involving either `==` or `!=` will be evaluated and will return either `1` for true, or `0` for false.   This means that there is a new type of entity that can be part of the Abstract Syntax Trees (ASTs).  You'll need to understand the code that implements the ASTs, and determine what needs to be changed to allow for this new structure.

The `main` function defined in `src/edu/ucsb/cs56/pconrad/parsing/Main.java` provides a "Read/Eval/Print" loop (REPL) for the combined tokenizer/parser/interpreter.    This is sometimes also called a "Command Line Interface", though we don't really have any commands, except for "q" for quit.   TODO: IMPLEMENT THIS...    This should work properly with the new operations you have added, and you **should not** modify `main` in any way.

# Understanding the starter code

The starter code you are given is fairly complex.    The [cs56-parsing-tutorial]({{page.tutorial_repo}} has lots of information to help you.  We are not going to repeat that information here&mdash;we are only going to suggest&mdash;again&mdash;that you thoroughy read that tutorial.


# Javadoc for the starter code 

Javadoc for the starter code in [cs56-parsing-assignment]({{page.starter_repo}} is available: 
* [cs56-parsing-assignment-javadoc](https://ucsb-cs56-m16.github.io/cs56-parsing-assignment-javadoc/).

# Getting started

Please create a private repo in the UCSB-CS56-M16 organization with the name `lab06_yourgithubid`.

Then, add a remote for the starter code:

`git remote add starter ` <tt>{{page.starter_repo}}.git</tt>

You can then do a `git pull starter master` to bring this code into your repository.

In the unlikely event that any problems are discovered in the starter code, you will be able to do a second or third `git pull starter master` after the instructional staff fix the starter code problems.   That additional `git pull` will update your code accordingly.   If you have already made modifications, there may be merge conflicts, but you'll be able to handle those with no problem.

Once you've done the `git pull starter master` to bring in the starter code:

1. Try doing an `ant test` on the starter code.  The code should compile, and the tests should pass.
2. Try running the code with `java -jar build/parser.jar`.  You should get a prompt for a "read-eval-print" loop 
    where you can type in expressions, and the parser will evaluate them.

If that works, you are now ready to pull in the tests for the additional features, i.e. the addition of the `==` and
`!=` operators.    These tests will "break" the code, in that it will initially no longer compile.

Your first job will be to make the code compile, by writing "stubs" for all of the objects, methods, etc. that the tests imply must exist before the test could even compile, much less pass.

Your second job will be, once the code compiles, to make all of the tests pass.

Your third job will be to try to come up with additional tests that might expose bugs in your code that the supplied 
tests do not find.   How many of those you come up with will be up to you.  Keep in mind that as with the Polynomial
lab earlier in the quarter, there may be "secret tests" that are not revealed to you that might be part of your grade.

When you've done those three things, and all tests are passing, you are ready to submit.   You'll submit via a link
on Gauchospace, just as before.

# Suggested order of work for getting the tests to compile

TODO: Kyle, write this. :-)

# Suggested order of work for getting the tests to pass

TODO: Kyle, write this. :-)

# Suggestions for coming up with your own tests

TODO: Kyle, write this. :-)


----

Credits: This lab primarily written by Kyle Dewey, with edits by Phill Conrad.  Additional helpful suggestions from Hiranya Jayathilaka, and others.


<div style="display:none">
http://ucsb-cs56-m16.github.io/lab/lab06/
</div>
