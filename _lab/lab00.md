---
layout: lab
num: lab00
ready: true
desc: "Tools for java development"
assigned: 2016-06-21 09:30:00.00-7
due: 2016-06-24 17:00:00.00-7
---


If you find typos or problems with the lab instructions, please report them on Piazza

Step 0: Getting oriented
========================

Chances are you are already familiar with all of the following because you already took CS courses that used this stuff (i.e. CS8, CS16, CS24, CS32).

If not--if for example, you are a transfer student and this is your first CS course using the CSIL Lab resources, please let your TA know and he/she will help you find resources to come up to speed on these things. Or, your TA can assign you a pair partner that knows this stuff and doesn't mind helping you come up to speed.

-   knowing your College of Engineering/CSIL computer account username/password--and having an active working account.
-   knowing how to login to the systems in Phelps 3525 and the CSIL lab, and bring up both a web browser, and a terminal window.
-   knowing that "CSIL" is both a server you can log into, as well as a physical room full of computers--and knowing where to find that physical room, and what hours it is open.
-   knowing how to use a **basic text editor such as emacs or vim** to edit files on the Linux systems in Phelps 3525 and CSIL.
-   knowing basic Unix/Linux commands to create directories, change directory, manipulate files, etc., e.g. mkdir, cd, pwd, mv, rm, ls.

The rest of these instruction will assume you know all of the above. If not, then let your TA know, and we'll point you to resources where you can come up to speed.

<div style="background-color:#eee; border: 4px inset #333; font-size:80%; width:80%;">
<b>If you need help with one or more of the items in the list above</b>: here is one suggestion--the lab00 from Conrad's CS16 course. Just ignore the stuff about C programming, and pay attention to everything else:

<http://www.cs.ucsb.edu/~pconrad/cs16/10S/labs/lab00>

</div>

As a separate item, you should also know how to connect to CSIL from your own computer (PC/Mac/Linux)

-   Windows: Putty, optionally with XMing. See for example: [CSIL Access:Windows](https://foo.cs.ucsb.edu/56wiki/index.php/CSIL_Access:Windows).
-   Mac/Linux: `ssh` `-Y` `username@csil.cs.ucsb.edu`, [CSIL Access:Mac and Linux](https://foo.cs.ucsb.edu/56wiki/index.php/CSIL_Access:Mac_and_Linux).

But, you don't need that for today's lab---so let's continue.

The rest of the lab: Step-by-Step
=================================


Here is an overview of the remaining steps in the lab:

1. If you didn't already do it:
    - Create a github.com account
    - Fill out the form at <http://bit.ly/cs56-m16-survey>
    - Join the UCSB-CS56-M16 organization by visiting <https://github.com/UCSB-CS56-M16/>
2. Create a *private* repo for lab00 under the UCSB-CS56-M16 organization
    - It should be called lab00_yourgithubid
    - Add a .gitignore for Java and a README.md file
    - detailed instructions [here](https://ucsb-cs56-pconrad.github.io/topics/github_com_create_private_repo_under_org/)
3.  Configure your CSIL account for git
    - detailed instructions [here](https://ucsb-cs56-pconrad.github.io/topics/csil_git_configuration/)
4.  Review a few basic facts about git, github.com and github.ucsb.edu
    - detailed information [here](https://ucsb-cs56-pconrad.github.io/topics/git_overview/)
5.  Clone your lab00_yourgithubid repo into your CSIL account.
    - If you know how to do that, great.
    - If not, there are detailed instructions [here](https://ucsb-cs56-pconrad.github.io/topics/git_cloning_your_first_repo/)
6.  Fork the cs56_rational_example into your own github.com account.  Here's how:
    - Go to the page <https://github.com/UCSB-CS56-M16/cs56-rational-example>
    - Click the "fork" button at the top right of the page
    - If asked where to fork it, choose your own github.com account
    - Congratulations: you now have a forked copy of the cs56-rational-example
    - What do you do with it? Read on...
7.  Clone the cs56_rational_example repo that you forked to your cs56 account (or your
    personal computer).
    - You can review the [cloning your first repo](https://ucsb-cs56-pconrad.github.io/topics/git_cloning_your_first_repo/) tutorial if you need a reminder as to how to do this.
8.  Work through the eight examples shown, as explained in lecture, to review some basics:
    - `java`, `javac`, `ant`
    - `build.xml` files
    - JUnit testing
9.  You are now ready to work on your own lab.
    - Copy the files from the ex08 subdirectory into the top level directory of
      your own lab00 repo.
    - This means all of the files, including the directories.  You may need `cp -r` for the directories.  If you need a refresher on unix commands, ask a mentor, TA, or instructor for help.
    - Commit an initial version of those files.
    - For that, you'll need the basic git workflow, explained [here](git_basic_workflow)
    - Once you have an initial version of the files, you are ready to start work.
10. Follow the detailed instructions below to complete the assignment.
11. When you are finished, to "submit", there will be a link on Gauchospace for you to enter
    the URL of your repo, and the URL of your javadoc.    If you cannot find that link,
    ask your instructor on Piazza.
    
Come back to this page for updates; we may add some information about testing,
and a grading rubric that you can check your lab against before you submit.

Detailed Instructions 
=====================

These are adapted from the material in the cs56-rational-example/ex08/README.md file

* Start with the code in the ex08 directory. 
* Add both tests and correct implementations of these methods to the class.
* Note that for each method, you should add a reasonable number of tests.  The exact number is left to you to determine, but it should be no less than three for each method.


| method                                    | explanation                     |
|-------------------------------------------|---------------------------------|
| `public static int lcm(int a, int b)` | returns least common multiple of a and b. See [wikipedia discussion](https://en.wikipedia.org/wiki/Least_common_multiple#Computing_the_least_common_multiple) |
| `public Rational plus(Rational r)` | returns sum of this number plus r |
| `public static Rational sum(Rational a, Rational b)` | returns a+b |
| `public Rational minus(Rational r)` | returns this number minus r |
| `public static Rational difference(Rational a, Rational b)` | returns a-b |
| `public Rational reciprocalOf()`   | returns reciprocal (swap numerator and denominator).  If numerator if zero, throws an instance of `java.lang.ArithmeticException`. To review exceptions, see [ex07](https://github.com/UCSB-CS56-M16/cs56-rational-example/tree/master/ex07) |
| `public Rational dividedBy(Rational r)` | returns this number divided by r |
| `public static Rational quotient(Rational a, Rational b`) | returns a divided by b |

Some hints to make things easier:

* (a - b) is equivalent to (a + (-1 * b))
* (a / b) is equivalent to (a * reciprocal(b))

So, don't repeat yourself:
* Multiplication and gcd are already defined for you in the example code.
* You need lcm to find a common denominator to add two rationals, so define lcm before addition.
* The lcm can be defined in terms of gcd and absolute value&mdash;see [wikipedia discussion](https://en.wikipedia.org/wiki/Least_common_multiple#Computing_the_least_common_multiple). Absolute value is predefined `public int Math.abs(int a)`
* Define addition before subtraction, and then define subtraction in terms of addition and multiplication.
* Define reciprocal before division, then define division as multiplication by the reciprocal.

Signify that you are finished by committing code to a github repo that contains a modified version of ex08, with all of the
following:
* a `build.xml` file (you shouldn't need to modify the example)
* a `src` subdirectory containing `Main.java`, `Rational.java`, and `RationalTest.java`
* a `lib` subdirectory contining the jar file for JUnit
* a `javadoc` subdirectory in which you have produced the javadoc by running `ant javadoc`

Note that you will not be able to publish your javadoc online with the github pages technique (i.e. pushing to a gh-pages branch), because this only works with public repos, not with private ones.   So, we've added some instructions below for publishing the javadoc to a separate public repo with the name lab00_javadoc_yourgithubid.

Publishing your javadoc online
==============================

1. Create a *public*_repo with the name `lab00_javadoc_yourgithubid` under the <https://github.com/UCSB-CS56-M16> organization with a `README.md` (it is not necessary to include a .gitignore).
2. cd into your ~/cs56 directory (or into whatever directory you cloned your `lab00_yourgithubid` repo).  You want to clone your `lab00_javadoc_yourgithubid` repo into the same directory so that they are siblings, side-by-side in the same directory.
3. We will now add some lines into your build.xml that copy the generated javadoc from your private repo to the public repo, 
   and we'll set the default branch of the public repo to be gh-pages.
   That process is explained in detail here: [Javadoc: publishing to github pages from private repo](https://ucsb-cs56-pconrad.github.io/topics/javadoc_publishing_to_github_pages_from_private_repo)
4. Once you've followed the instructions in the link at step 3, your javadoc should be available online at a URL similar to
   the following one (but with your githubid instead of `yourgithubid`).
   `https://UCSB-CS56-M16.github.io/lab00_javadoc_yourgithubid/javadoc/index.html`

If you run into difficulties, ask your mentor/TA/instructor if in class, or ask on Piazza if outside of class.

When you are finished
=====================

When you are finished, you'll have:
* the url of your completed repo (e.g. <https://github.com/UCSB-CS56-M16/lab00_yourgithubid> )
* the url of your javadoc (which will be in a separate public repo)
    * URL of that repo will be: <https://github.com/UCSB-CS56-M16/lab00_javadoc_yourgithubid>
    * When you push to a gh-pages branch, that repo's content will be published at
      <https://UCSB-CS56-M16.github.io/lab00_javadoc_yourgithubid/javadoc/index.html>

Look for instructions on Gauchospace to paste these URLs into the "online text" submission area for lab00.
