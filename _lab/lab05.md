---
layout: lab
num: lab05
ready: true
desc: "Recursive Descent Parsing"
assigned: 2016-07-15 09:00:00.00-7
due: 2016-07-26 17:00:00.00-7
javadoc_prefix: "https://ucsb-cs56-m16.github.io/cs56-parsing-assignment-javadoc/index.html?"
starter_repo: "https://github.com/UCSB-CS56-M16/cs56-parsing-assignment"
tutorial_repo: "https://github.com/UCSB-CS56-M16/cs56-parsing-tutorial/"
---

<style>
 div.tip {
   
   margin-left:auto; 
   margin-right:auto; 
   width:80%; 
   border: 10px inset red; 
   padding: 1em;
 }
</style>

<div class="tip" markdown="1">
NOW AVAILABLE ON submit.cs: <https://submit.cs.ucsb.edu/form/project/519>
</div>

# Summary #

In this assignment, you will add some features to an existing parser and interpreter of arithmetic expressions.

You should start by reading the [cs56-parsing-tutorial]({{page.tutorial_repo}}).   It contains important background
information about parsing, grammars, tokens, etc.   

<div class="tip" markdown="1">

The remainder of this writeup assumes that you have thoughly read and understood the information in the [cs56-parsing-tutorial]({{page.tutorial_repo}}).  

*If you have not, it will not make any sense to you.*

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

In the parser, you'll need to handle the following EBNF description, derived from the Wikipedia page for [Operator Precedence Parser](https://en.wikipedia.org/wiki/Operator-precedence_parser) (retrieved 06/13/2016):

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

The `main` function defined in `src/edu/ucsb/cs56/pconrad/parsing/Main.java` provides a "Read/Eval/Print" loop (REPL) for the combined tokenizer/parser/interpreter.    This is sometimes also called a "Command Line Interface", though we don't really have any commands, except for "q" for quit.  This should work properly with the new operations you have added, and you **should not** modify `main` in any way.

# Understanding the Starter Code #

The starter code you are given is fairly complex.    The [cs56-parsing-tutorial]({{page.tutorial_repo}}) has lots of information to help you.  We are not going to repeat that information here&mdash;we are only going to suggest&mdash;again&mdash;that you thoroughy read that tutorial.


# Javadoc for the Starter Code #

Javadoc for the starter code in [cs56-parsing-assignment]({{page.starter_repo}}) is available:

* [cs56-parsing-assignment-javadoc](https://ucsb-cs56-m16.github.io/cs56-parsing-assignment-javadoc/).

# Getting Started #

Please create a private repo in the UCSB-CS56-M16 organization with the name `lab05_yourgithubid`.

<div class="tip" markdown="1">
Note: You need to `git clone ...` that repo into your directory before you proceed with the
rest of the instructions.
</div>


Then, add a remote for the starter code:

`git remote add starter ` <tt>{{page.starter_repo}}.git</tt>

You can then do a `git pull starter master` to bring this code into your repository.

<div class="tip" markdown="1">
When you pull in this code, you may end up with merge conflicts in `README.md` and possibly in `.gitignore`.

To resolve these, just edit those two files, and get rid of lines that look like these (your SHA commit hash will be different from the one shown):

* `<<<<<<< HEAD`  
* `========`
* `>>>>>>> 0fe9c0565c5150b3a72df6c3a563213f565b3cc9`

These lines mark the beginning and end of the parts that differ.  Edit the rest of the file as needed.

Then `git add README.md`; `git add .gitignore`, and do a commit.   That "resolves the merge conflict".

You might also get thrown into vim here or at some future point in the course of this lab.  To get out, use `<ESC>:wq` (that's hit the esc key, then type colon, then wq).

</div>


In the unlikely event that any problems are discovered in the starter code, you will be able to do a second or third `git pull starter master` after the instructional staff fix the starter code problems.   That additional `git pull` will update your code accordingly.   If you have already made modifications, there may be merge conflicts, but you'll be able to handle those with no problem.

Once you've done the `git pull starter master` to bring in the starter code:

1. Try doing an `ant test` on the starter code.  The code should compile, and the tests should pass.
2. Try running the code with `ant jar && java -jar build/jar/CS56Parser.jar`.  You should get a prompt for a "read-eval-print" loop 
    where you can type in expressions, and the parser will evaluate them.

If that works, you are now ready to pull in the tests for the additional features, i.e. the addition of the `==` and
`!=` operators.  These tests will "break" the code, in that it will initially no longer compile.  We have organized the tests so that they incrementally build on top of each other, allowing you to first get your tokenizer working, then your parser, and finally your evaluator.

To bring the tests for the tokenizer into your repository, run the following command:

* `git pull starter update_tokenizer`

<div class="tip" markdown="1">

When you do the `git pull starter update_tokenizer`, you might get thrown into vim with the message at the top 
of the screen `Merge branch ...` etc. 

This is an automatic commit message, because pulling in the starter code is doing a commit.

To finish the commit, use this sequence of keys to save and quit from vim: `<ESC>:wq` (that's hit the esc key, then type colon,
then wq). 

</div>


If you run `ant clean && ant test`, you should see that it no longer compiles.  Your first job will be to make the code compile, by writing "stubs" for all of the objects, methods, etc. that the tests imply must exist before the test could even compile, much less pass.  Stubs usually do relatively silly things like `return null;`, but they nonetheless will allow code to at least compile with failing tests.  Further details are available in the following sections.  **Before** making any edits, be sure to at least read the **Restrictions** section, which specifies what you may and may not change.

Your second job will be, once the code compiles, to make all of the tests pass.  Further details are available in the following sections.

Your third job will be to try to come up with additional tests that might expose bugs in your code that the supplied 
tests do not find.   How many of those you come up with will be up to you.  Keep in mind that as with the Polynomial
lab earlier in the quarter, there may be "secret tests" that are not revealed to you that might be part of your grade.  Further details are available in the following sections.

Once you have your tokenizer compiling and passing all the tests, you're ready to start on the parser.  You can bring in tests for the parser like so:

* `git pull starter update_parser`

You should follow the same development procedures to update the parser as you did with the tokenizer.

Once the tokenizer is compiling and passing all the tests, you can start on the evaluator, which is the last component you'll need to implement.  Tests for the evaluator can be brought in like so:

* `git pull starter update_evaluator`

When you've done those three things, and all tests are passing, you are ready to submit.

## Submitting ##


You'll submit via the link for lab05 on Gauchospace.
In contrast to some of your previous submissions, you should **not** make a publicly accessible Javadoc for your code.
A large portion of the work for this lab is in how you structure your classes and methods, which usually will be included with the Javadoc.

# Restrictions #

You may **not** modify `src/edu/ucsb/cs56/pconrad/parsing/Main.java`.
Additionally, while you may add tests and are encouraged to add your own tests, you may **not** modify the existing tests.
Any modifications you make to these components will be discarded on our end when we test your code.
These restrictions are not arbitrary; `Main` and the tests already sensibly interface with the various parser components, so they should not need to be changed.
This is reflective of a realistic scenario where certain implementation details are fixed.

Additionally, there are a number of design patterns which you must conform to.
These are listed below, along where they must be used:

* The [Visitor design pattern](https://github.com/UCSB-CS56-M16/visitor-pattern-tutorial) must be used in `Token` (in `src/edu/ucsb/cs56/pconrad/parsing/tokenizer/Token.java`) and in `AST` (in `src/edu/ucsb/cs56/pconrad/parsing/syntax/AST.java`).  Specifically, this is for performing different operations depending on which `Token` or `AST` node is observed.
* The [State design pattern](https://en.wikipedia.org/wiki/State_pattern) (see also <span data-hfdp="10">HFDP Chapter 10</span>) must be used in `Tokenizer` (in `src/edu/ucsb/cs56/pconrad/parsing/tokenizer/Tokenizer.java`).  This is for piecing together different tokens in a way that they are independent of each other.
* The [Factory design pattern](https://en.wikipedia.org/wiki/Factory_method_pattern) (see also <span data-hfdp="4">HFDP Chapter 10</span>) must be used in `DefaultTokenFactory` (in `src/edu/ucsb/cs56/pconrad/parsing/tokenizer/DefaultTokenFactory.java`), and in `DefaultASTFactory` (in `src/edu/ucsb/cs56/pconrad/parsing/syntax/DefaultASTFactory.java`).  Because these components are used in the provided test suite, you are unable to change their corresponding interfaces in `TokenFactory` (in `src/edu/ucsb/cs56/pconrad/parsing/tokenizer/TokenFactory.java`) and `ASTFactory` (in `src/edu/ucsb/cs56/pconrad/parsing/syntax/ASTFactory.java`).  However, you may change the implementations of these interfaces in `DefaultTokenFactory` and `DefaultASTFactory`.

The provided code already uses the above three design patterns, so your only real requirement here is that you don't strip out the use of these patterns.
For the most part, your code should gracefully integrate into these patterns.
For example, many tokenizer modifications can be performed by simply adding additional state classes to the state design pattern.
If you do find it difficult to integrate something into these design patterns, it may indicate a problem in your fundamental approach.

Other than the above restrictions, you may make any modifications necessary to make the tests pass.
This includes adding in new files and modifying existing files.


# General Suggestions #

As previously stated, you should first focus on getting the tests for the tokenizer to pass, then the tests for the parser to pass, and finally the tests for the evaluator to pass.
While it's possible to pull in all the tests at once, you'll be making much more work for yourself if you do this; in this case, effectively, you won't be able to properly test anything until **all** code has been written.
Additionally, because each component builds on the other (i.e., the parser needs the tokenizer, and the evaluator needs the parser), this becomes a practical problem if we apply end-to-end testing.
For example, your evaluator and parser might work just fine, but if your tokenizer is broken, we cannot run `Main`, so we can't actually test the tokenizer and the parser easily.

It is expected that some edits will need to span multiple components.
For example, if an AST node were removed, then this would require modifications to both the parser and the evaluator, as both deal with AST nodes (the parser produces them while the evaluator uses them).
That said, if edits in one component require many edits in other components, you might want to stop and rethink your design.
This isn't necessarily wrong, and you are free to make such edits, but you might be making a lot more work for yourself than necessary.

While the provided code has been heavily tested internally, it is not guaranteed to be bug-free.
Additionally, it is not guaranteed to be entirely clean; you might take issue with some of the design choices made.
While your focus should be on getting everything up and running, if cleaning up the code will make your life easier, then feel free to do so.

You will likely spend much more time *thinking* about the code you want to write as opposed to *actually writing* code.
This may feel frustrating, especially if you're used to measuring process by the number of lines of code you've written.
**This is normal.**
In professional development settings, developers often average only about [8-10 lines of code written per day](http://codebetter.com/patricksmacchia/2012/01/23/mythical-man-month-10-lines-per-developer-day/).
Most time is spent figuring out what needs to be written.


# Suggested Order of Work for Getting the Tests to Compile #

This section provides some hints on how to get things to compile, broken down by the component.

## Tokenizer ##

You'll need to implement the `makeEqualsToken` and the `makeNotEquals` methods in `DefaultTokenFactory` (`src/edu/ucsb/cs56/pconrad/parsing/tokenizer/DefaultTokenFactory.java`), which are now required by the updated `TokenFactory` interface (`src/edu/ucsb/cs56/pconrad/parsing/tokenizer/TokenFactory.java`).
This will require you to add tokens for `==` and `!=`.
There are a variety of ways to accomplish this; the only constraint is that these new tokens must implement the `Token` interface (`src/edu/ucsb/cs56/pconrad/parsing/tokenizer/Token.java`).

If you end up adding in whole new tokens, the `accept` method will need an implementation (`accept` is one of the methods in the `Token` interface).
Just for getting the tokenizer to compile, it is sufficient to just `return null` in the method.
Currently, the only place `accept` is used is in the parser, so this returning of `null` is not a concern until you start working on the parser.

If you end up modifying the existing token definitions at all, you'll likely need to make edits to `Parser`, which is currently somewhat dependent on the different implementations of `Token` which are available.

## Parser ##

You will first need to get `DefaultASTFactory` (`src/edu/ucsb/cs56/pconrad/parsing/syntax/DefaultASTFactory.java`) compiling by providing implementations for the `makeEqualsNode` and `makeNotEqualsNode` methods, which are now required by the updated `ASTFactory` interface (`src/edu/ucsb/cs56/pconrad/parsing/syntax/ASTFactory.java`).
This will require editing or adding files to the code in `syntax`.

If you add in whole AST nodes, they must implement the `AST` interface (`src/edu/ucsb/cs56/pconrad/parsing/syntax/AST.java`).
As with the tokenizer previously, while there is an `accept` method you'll need to implement, `return null` should be sufficient here, as `accept` is currently used only in the evaluator.
You can fix this later.

## Evaluator ##

Depending on how you implemented the tokenizer and the parser, it is possible that the evaluator tests compile as-is.
If not, it is likely do to a change in either the `ASTVisitor` (`src/edu/ucsb/cs56/pconrad/parsing/syntax/ASTVisitor.java`) or `OperatorVisitor` (`src/edu/ucsb/cs56/pconrad/parsing/syntax/OperatorVisitor.java`) interfaces, as these are used in `EvaluatorASTVisitor` (`src/edu/ucsb/cs56/pconrad/parsing/evaluator/EvaluatorASTVisitor.java`) and `EvaluatorOperatorVisitor` (`src/edu/ucsb/cs56/pconrad/parsing/evaluator/EvaluatorOperatorVisitor.java`).
You'll likely want to update these first.


# Suggested Order of Work for Getting the Tests to Pass #

This section provides some hints on how to get the tests to pass, broken down by the component.

## Tokenizer ##

The bulk of the work will be in recognizing the new tokens.
This will likely entail adding in new states to the state pattern used in `Tokenizer`.
If you do end up adding new states, you may want to draw out the state machine representing what you are handling first, in order to make sure your fundamental design is correct.
Ideally, you should avoid adding in a state unless you are absolutely sure it needs to be there; extra states mean extra code, which means more room for bugs to come into play.

## Parser ##

If you ended up adding in whole new tokens with your tokenizer edits, you should replace any stubs (e.g., `return null`) for the `accept` method in implementors of `Token` with actual implementation.
As part of this process, you might need to edit the `TokenVisitor` (`src/edu/ucsb/cs56/pconrad/parsing/tokenizer/TokenVisitor.java`) interface, along with any classes which implement `TokenVisitor` in the parser.
The parser itself will also need to be modified to add in the new production, which will (somewhat ironically) likely be the smallest edit you need to perform for the parser.

## Evaluator ##

Similar to the tokenizer, if you ended up adding in whole new AST nodes with your parser edits, you should replace any stubs for the `accept` method in implementors of `AST` with actual implementation.
You might need to edit `ASTVisitor` (`src/edu/ucsb/cs56/pconrad/parsing/syntax/ASTVisitor.java`) as part of this process.
Once again, depending on your design, it is likely that actually updating the evaluator to handle `==` and `!=` will be a relatively small change.

# Suggestions for Devising Your Own Tests #

As previously stated, while the provided code has been heavily tested internally, the provided test suite is severely lacking.
The provided tests are mostly just to jump-start things when it comes to writing your own tests.
In fact, it might be prudent to write your own tests for things *before* even starting on the tokenizer.

For the tokenizer, you should write tests which cover every kind of token which can be created.
Because whitespace is treated specially, you should also have tests ensuring that extra whitespace in different spots (e.g., before a number) does not negatively impact the result.

For the parser, you should write tests which collectively cover every alternative of every production at least once.
For example, you should have a test for each operator.
As another example, for productions involving a repeat like `e*`, you should have a case for zero, one, and two instances of `e`.

For the evaluator, you should have tests for every kind of operator, including special cases like division by zero.

Whenever you're in doubt, write a test.
This means that if you see code you're not confident about, you should immediately write a test to try to expose a bug in it.


<div class="tip" markdown="1">
## Some Hints:

Consider the following cases:

* What should happen if there is whitespace or something unexpected in the middle of a `==` or `!=` token, e.g. if the input is `2=3` or `2! =3` ?
* What should happen if the input ends in the middle of a `==` or `!=` token, e.g. `2+3=` or `4/5!` ?

In both cases, a `TokenizerException` should be thrown.    

</div>

----

Credits: This lab primarily written by Kyle Dewey, with edits by Phill Conrad.  Additional helpful suggestions from Hiranya Jayathilaka, and others.


<div style="display:none">
http://ucsb-cs56-m16.github.io/lab/lab05/
</div>
