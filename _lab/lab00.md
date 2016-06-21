---
layout: lab
num: lab00
ready: false
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
    - detailed instructions [here](#step-2)
3.  Configure your CSIL account for git
    - detailed instructions [here](https://ucsb-cs56-pconrad.github.io/topics/csil_git_configuration/)

Additional Detailed Instructions
================================

In this section, we provide additional detailed instructions for the steps
that need them.

Step 2
------

Navigate to your github.com page (NOT github.ucsb.edu).

Find the link to create a repository.

Then be sure you are creating the repo under the UCSB-CS56-M16 organization,
not under your personal github account.  This is important, because creating
it under the UCSB-CS56-M16 organization is what gives your instructor and TA
access to the repo.

Fill in the form like this:

-   Repository name:
    -   Use the name {{ page.num }}_yourgithubid  (e.g. lab00_jgaucho )
    -   Use EXACTLY that name, because that will be how your TAs find it to give you a grade.
    -   If you don't use the right letters, punctuation, capitalization, etc. it makes your TAs life more difficult. He/she may therefore decide to make your life difficult by giving you a lower grade for "not following directions". They will have my full support.
-   Under description, you may write anything you like, within reason.
    -   For example, something like "lab00 for Joe Schmoe" (if your name is Joe Schmoe) would be reasonable.
-   Select "private".
-   Check the box that says "Initialize this repository with a README.
    -   This is important because if you don't do this, the repo may have no content, and you can't clone a repo with no content.
-   Click the pull-down menu for "Add .gitignore" and select Java.

Then click "Create Repository".

Step 3. Configure your CSIL account for using git
-------------------------------------------------

Detailed instructions for this step are at this link:
<https://ucsb-cs56-pconrad.github.io/topics/csil_git_configuration/>



Step 4: Review a few basics facts about git, github.com, and github.ucsb.edu
----------------------------------------------------------------------------

In addition to learning Java, one of the major goals of this course is to get really comfortable with "version control", using a tool called "git" and a website called "github.com", and one called "github.ucsb.edu". Our first step is to "clone a github repo".

### What is git and what is a repo?

The software package "git" is an example of a "version control system". (Others include SVN, Mercurial, and in a previous generations, CVS, RCS, and SCCS).

A git repo (short for repository) is nothing more than a collection of files and directories (folders), along with a special subdirectory called .git (stored only once in the top level directory of the repo) that keeps track of the complete history of the files and directories contained in the repo. To some extent, the ".git" directory stays out of your way, and you use the files and directories in the repository exactly the same way you'd use files and directories in a regular directory.

On the other hand, keeping files in a git repository has many advantages:

-   making it easier to collaborate with others on a project (whether that's an open source or closed source project)
-   making it easier to recover from screwups (like deleting important files, messing up code that was previously working, complete failure of your hard drive)
-   making it easier to share "works in progress" with TAs and instructors and fellow students to get help during lab, office hours, or by emai
-   making it easier to share "open source" projects with others on the internet.

### What is github.ucsb.edu and github.com, and how do they differ from git?

A git repository can be local, on your file system, or it can be remote on a server somewhere on the Internet. (We might say, using terminology that is trendy these days, that a repo on the internet is "in the cloud" if we get to remain blissfully ignorant of exactly how that service is being provided to us—i,.e. someone else is worrying about all the system management issues like keeping that server up and running, keeping it free of malware and defending from Denial of Service attacks, managing backups, etc.)

The github.com company is a commercial enterprise that runs a website called github.com. Github.com provides a service for hosting github repositories "in the cloud". The github.com company hosts open source projects for free (via free public repositories) and makes money by charging uses for hosting closed source projects in private repositories.

In addition github licenses its software to various organizations that want to set up their own private "github" like servers within their enterprise. UCSB licensed this software and set up a github server called github.ucsb.edu that is based on your CSIL account.

We will use github.ucsb.edu for some assignments and github.com for others.

Step 5: Cloning your first repo
-------------------------------

The instructions below are written from the standpoint of someone that has never used git before on CSIL. If you have never used git before, then just follow the instructions as given.

<b>If you already used git in a previous course</b>, then you might be aware that using the ssh protocol rather than https to clone repos has certain advantages. You may also have ssh keys set up on github.ucsb.edu for your CSIL account. If so, and you remember how to do it, <em>you may use the ssh URLs for cloning your repo</em>. It's entirely up to you. That will simply things because you won't have to enter your username/password as often.

If you've forgotten how, don't worry—just follow the instructions as given. We'll cover ssh keys in the next lab. Above all, don't show off and confuse any git noobs by trying to bring up ssh keys before they've gotten used to the basics.

### Locate your first repo

Go back to web browser where you github.ucsb.edu open. Find the link to your repository, cs56-w15-lab00, and click on it.

### Cloning your cs56-w16-lab00 repo

Open a shell on your CSIL account, and create a directory for cs56:

    -bash-4.2$ mkdir -p ~/cs56
    -bash-4.2$ cd ~/cs56
    -bash-4.2$ pwd
    /cs/student/bobgaucho/cs56
    -bash-4.2$ 

Now you will "clone" your repository. This creates a copy of your repository—which is a separate repository in its own right—in your cs56 directory on the CSIL systems.

On the web page for your repo, look at the lower right of the repo home page. You should see something labelled as HTTPS clone URL. Copy the URL there.

-   Note that this is NOT THE SAME as the URL shown in the browser url window. Don't copy that one!

Next, in the terminal window where you are in your ~/cs56 directory, type the command below to clone the repository into a new cs56-w16-lab00 directory, replacing the URL shown there with the http URL you copied from the web page.

    $ git clone https://github.ucsb.edu/username/cs56-w16-lab00.git
    ...

and you should see something like this. You will be asked for a username and password. Note that this is your **csil username and password**.

    -bash-4.2$ git clone https://github.ucsb.edu/username/cs56-w16-lab00.git
    Cloning into 'cs56-w16-lab00'...
    Username for 'https://github.ucsb.edu': bgaucho
    Password for 'https://bgaucho@github.ucsb.edu': 
    remote: Counting objects: 8, done.
    remote: Compressing objects: 100% (5/5), done.
    remote: Total 8 (delta 0), reused 4 (delta 0)
    Unpacking objects: 100% (8/8), done.
    -bash-4.2$ 

This should create a new directory called

cd into that directory and use the ls command to list the files.

    $ ls
    cs56-w16-lab00
    $ cd cs56-w16-lab00
    $ ls
    README.md
    $ 

Congratulations—you have now cloned your repository!

Next, we are going to do a few things with this repository.

Step 6: Compiling and Running a Java Program
--------------------------------------------

The next step we'll do does not depend on git. It is simply the way that we compile and execute Java code at the command line, regardless of whether we are using git or not.

We are going to take the code from p. 8 and 9 of the Head First Java, 2nd Edition textbook, which you can view at the links below and type them into a file called MyFirstApp.java. This will give us some practice with working with a repo. (Note that if you try to copy/paste, you'll end up with some screwball characters in your source, e.g. curly quotes, and it may not compile. So, even though its tedious, I suggest you type it in.)

-   page
-   page

Do the following now:

-   (1) Use your favorite editor to create `MyFirstApp.java` to list the contents of the program.
-   (2) Use the command `more` `MyFirstApp.java` to list the contents of the program.
-   (3) Use the command `javac` `MyFirstApp.java` to compile the program.
-   (4) Use the command `ls` to see that the file `MyFirstApp.class` was created.
-   (5) Use the command `java` `MyFirstApp` to run the code.

-   To run, we use `java` `MyFirstApp`
-   NOT `java` `MyFirstApp.java`
-   NOT `java` `MyFirstApp.class`

Great, you can now compile and run a program in Java.

Assuming class MyFirstApp contains a main() method, which of these is the correct command to compile?

-   (a) `java` `MyFirstApp`
-   (b) `java` `MyFirstApp.java`
-   (c) `java` `MyFirstApp.class`
-   (d) `javac` `MyFirstApp.java`
-   (e) `javac` `MyFirstApp.class`

Assuming the class mentioned in the previous question was successfully compiled, which of these is the correct command to run the class?

-   (a) `java` `MyFirstApp`
-   (b) `java` `MyFirstApp.java`
-   (c) `java` `MyFirstApp.class`
-   (d) `javac` `MyFirstApp.java`
-   (e) `javac` `MyFirstApp.class`

Step 6: Commit and push your changes to the MyFirstApp.java file
----------------------------------------------------------------

The next few steps are related to using git. They would be the same steps whether you were working with Java, C, C++, Python, or even plain text files. These are the steps that you'll want to get very accustomed to, because they represent a typical "workflow" in git—the workflow you'll use when working on an simple, single author, individual project.

We've made some changes to one of the files in our repository—and with luck, those changes worked. (In this case, that means we got the javadoc to show up.) So it is important before we finish work for the day to make sure we go through a "workflow" to get those changes get "committed" and "pushed". First we'll describe what that means, then we'll show how to do it.

### What's a *workflow*? What's a *commit*? What's a *push*?

The word **workflow** is often used to describe a typical sequence of steps you go through to interact with a version control system to use it effectively. In particular, it describes how the use of the tool fits in with the other parts of software development that you are already used to, such as editing code, compiling code, and testing code.

As you make changes to a repository—adding/deleting files or directories, renaming files, editing files—at a certain point, you should periodically **commit** those changes.

When should you commit? Often. Typicallly, after each edit or set of edits that successfully accomplishes some goal, however small.

-   Get in the habit of committing any time you have improved your code in some way (e.g. you've added a few lines of code or some comments, and the code compiles, and nothing that was working before is now broken.)

It is typically NOT a good practice to commit changes that make the code "worse" (e.g. break something or cause it to no longer compile). This is especially true in projects with multiple developers (the rule is sometimes called "don't break the build").

But that's not a hard-and-fast rule. It depends on the situation. For now, I'd suggest you err on the side of committing TOO often, rather than the other way around. The idea of a commit is that it is a checkpoint that you can roll back to if necessary. Any commit can be "undone".

And as long as you **push** your commits to the github.ucsb.edu server in the cloud, you'll be able to recover every commit you've ever made, even if the system where you are working (e.g. CSIL) is wiped out by a fire, earthquake or tsunami (along with all the CSIL backups.)

**The difference between a commit and a push** is this:

-   in general, a **commit is local**
-   a push copies the **results of a commit to a remote server**.

To understand this, you need to understand what happened when you did the first "git clone" command in this lab.

To start with, the cs56-w16-lab00 repository existed in only one place: on the github.ucsb.edu server. Then you cloned it with "git clone" into a subdirectory of your ~/cs56 directory on your CSIL account. Now there are TWO repositories, not ONE.

That's worth repeating: after you clone a repository, you now have TWO SEPARATE REPOSITORIES. For example, this in case:

-   a REMOTE repository called that lives on github.ucsb.edu (git calls this the "origin master")
-   a LOCAL repository called that lives in your current directory.

When you "commit" a change, you are committing it in your LOCAL copy of the repository.

When you "push" that commit, you are updating the REMOTE copy on github.ucsb.edu.

Ok, now that we've talked through what we are about to do, let's actually do it.

### Step 6a: Do a `git` `pull`

Normally, if we were working with other people, or perhaps doing work on more than one system (e.g. sometimes working on our laptop, sometimes our desktop machine at home and sometimes on CSIL), the first step before doing a commit is always to do a `git` `pull`. The `git` `pull` command ensures that we get the latest updates from elsewhere, in case there are any.

In this case, we probably don't need to do that, because we've just been working with this one clone of this one repo, but just because we want to establish a good set of habits, let's start with the `git` `pull`. You'll have to type in your github username and password for this step.

    -bash-4.2$ git pull
    Username for 'https://github.ucsb.edu': bnieder
    Password for 'https://bnieder@github.ucsb.edu': 
    Already up-to-date.
    -bash-4.2$ 

Unless the instructor or TAs updated the repositories after your did the "git clone" command, there aren't any changes made by "other people" that you need to pull from anywhere else. So the message "Already up-to-date" is most likely what you will see.

(If not, check in with your TA or instructor before continuing.)

### Step 6b: Do a `git` `status`

The next step before committing a change is to use the `git` `status` command to see what's up. Specifically, we need to see which files may have changed since the last commit, and decide which of those changes we want to make part of our commit. This command doesn't require us to type our github.ucsb.edu username and password (i.e. our CSIL username/password) because it is ONLY checking the current files in our directory against the "last" commit that we did—or if we have not done any commits yet, against the version that was in place when we originally cloned the repository. That's something that can be done ENTIRELY on the local file system.

Remember:

-   A commit is typically a LOCAL operation—it doesn't touch the server.
-   A pull or a push is typically an operation involving the SERVER, and we have to authenticate with a username/password.

There are exceptions to those rules, and later things may get more complicated, but that explanation is a reasonable starting point.

Here is what a git status looks like:

    -bash-4.2$ git status
    On branch master
    Your branch is up-to-date with 'origin/master'.

    Untracked files:
      (use "git add <file>..." to include in what will be committed)

            MyFirstApp.java

    nothing added to commit but untracked files present (use "git add" to track)
    -bash-4.2$    

We can see that we've made a change to MyFirstApp.java that hasn't been committed.

To tell git that we want this file to be part of our commit, we use the command "git add", which is the next step.

### Step 6c: Use `git` `add` to add files into the commit

Nothing goes into a commit unless we specifically tell git we want it to be a part of the commit. The git status command can be used to tell us what we might want to add to the commit, but ultimately, it is up to us to make this choice.

Type the following: git add MyFirstApp.java

It should look like this:

    -bash-4.2$ git add MyFirstApp.java
    -bash-4.2$ 

It typical 'unix command" fashion, there is no output, which means "it worked." But if we want to really see that it worked, we can type "git status" again:

    -bash-4.2$ git status
    # On branch master
    # Changes to be committed:
    #   (use "git reset HEAD <file>..." to unstage)
    #
    #   modified:   MyFirstApp.java
    #
    -bash-4.2$ 

Now we see that when we do our next commit, MyFirstApp.java will be part of the commit. So, let's do that now.

### Step 6d: Use `git` `commit` `-m` `"some` `message` `here"`

This will to commit these files to the LOCAL repository (the one in our CSIL directory.)

When we commit, we need to add a message that describes what change we made to the file. These are typically short. For example, in this case our message might be:

    Added javadoc comment

So type this command: git commit -m "Added Javadoc Comment"

Here's an example:

    -bash-4.2$ git commit -m "Added Javadoc Comment"
    [master 7180ef4] Added Javadoc Comment
     1 file changed, 7 insertions(+), 1 deletion(-)
    -bash-4.2$ 

Note that there is a hex number that goes with the commit—in this case, 7180ef4. That hex number is the first few hex digits of the SHA-1 Hash of the contents of the entire repository, and is the identifier by which this commit is known to the git system. Those numbers will be important later. For now, just notice that each time you commit a change, this hex number changes.

<http://i.imgur.com/lJQ26Fm.png>

**Help! I tried the commit command and my screen went all weird!**

If you see something like the picture at right when doing a commit command, it means you forgot the -m, or somehow the -m got messed up.

So, the git commit command put you in the vi editor so you could finish typing the message. This is all well and good if you know how to edit in vi. In that case, just type your commit message, then type escape, and use **:wq** to save your changes. Then your commit will go through just fine.

But if you don't know how to edit in vi, you are likely to be very confused. To get out, just type escape, then **:q!**

Then try your commit again.

### Step 6e: Use `git` `status` to see the status now

It you now type git status, you'll see this message. Read it carefully (it helps if you read it out loud.)

    -bash-4.2$ git status
    # On branch master
    # Your branch is ahead of 'origin/master' by 1 commit.
    #   (use "git push" to publish your local commits)
    #
    nothing to commit, working directory clean
    -bash-4.2$ 

The important part here is that you are being told that you need to git push to "publish" your local commits. That is, your commits are currently only in your local repository. When you "publish" them, you push the back to the "origin/master" branch of your repository at github.ucsb.edu—which is the one that your instructor and/or TA will look at to give you a grade.

So, let's push the changes there, because you certainly want your instructor/TA to see the results of all your hard work!

### Step 6f: Use `git` `push` `origin` `master` to push the changes to github.ucsb.edu

Type "git push". In this case, this is short for "git push origin master", which means "push all my local changes up to the master branch at the origin of this repository, the main repo at github.ucsb.edu".

Here's what that should look like. Note that you'll need to type your github.ucsb.edu username and password again (which again, is your CSIL username/password), since you are updating content on the server.

    -bash-4.2$ git push origin master
    Username for 'https://github.ucsb.edu': bgaucho
    Password for 'https://bgaucho@github.ucsb.edu': 
    Counting objects: 5, done.
    Delta compression using up to 4 threads.
    Compressing objects: 100% (3/3), done.
    Writing objects: 100% (3/3), 563 bytes, done.
    Total 3 (delta 0), reused 0 (delta 0)
    To https://github.ucsb.edu/UCSB-CS56-W16/cs56-w16-lab00.git
       2d598d9..7180ef4  master -> master
    -bash-4.2$ 

**Am I really going to have to type in my CSIL username and password so often!?**

For right now, every time we do one of these git commands, we have to type in our CSIL username and password. That's going to get old real fast. Fortunately, there is an easier way: we can use SSH public/private keys.

Because there is already a lot of potentially "new" stuff in lab00, we are deferring discussions of setting up public/private SSH keys until lab01. I'm mentioning it now just so you don't freak out and thing this is going to totally be a pain—once we move to using public/private keys, you won't necessarily have to type in your password nearly as often.

### Step 6g: Seeing the effect on github.ucsb.edu

<http://i.imgur.com/516g3rN.png>

Until you do the git push command, if you go to your repo on github.ucsb.edu, the changes you make aren't there. But now, your changes will be there.

Go to the github.ucsb.edu page for your repo.

You should see something like the image at right. You should see the commit message you put in after -m on the git commit command. Also, try clicking on the file, and you should see the changes in your code there.

### So what's the big deal?

This may not seem very exciting at this point---you may wonder what all the fuss is about. And to be clear, the value of all this isn't really very apparent when we are dealing with one person making one change in one file. But, as we work with this over the weeks ahead, with much larger projects, the benefits will become clear. So, be patient and stay tuned.

Step 7: Making, committing and pushing another change (to README.md)
--------------------------------------------------------------------

<http://i.imgur.com/xps1j5G.png>

Now, in order to practice this workflow of "edit, git status, git add, git commit, git push", we are going to make another change.

This time, we are going to work with a very nice feature of github—the use of "markdown" for creating quick web content.

The file README.md has an file extension of ".md" for "Markdown".

-   HTML is a "HyperText Markup Language", for "marking-up" your text. That is, indicating which part is the heading, which part is a link, which part is a bullet list, etc.
-   But "mark-up" with HTML requires learning HTML. Mark-down does the same kinds of things, but with a much easier syntax.

In your Markdown file, you can make a link to your javadoc as a bullet item but just adding this to the file:

    * My javadoc is here: http://www.cs.ucsb.edu/~mycsilaccount/cs56/lab00/javadoc

So afterwards, the whole thing will look something like this:

    lab00
    =====
    lab00 for CS56, W16

    * My javadoc is here: http://www.cs.ucsb.edu/~mycsilaccount/cs56/lab00/javadoc

So, now we've made a change to README.md.

So, repeating our earlier work flow, we need to to through the steps of:

-   git pull
-   git status
-   git add README.md
-   git commit -m "added link to javadoc in README file"
-   git push

Do that now, for practice, and to get the change to show up at github.ucsb.edu. Once you do, if you refresh your browser page, and scroll down, you should see the link show up, as shown in the image at right.

If you don't, ask for help!

Step 7: Add a Javadoc style comment to the top of the file
----------------------------------------------------------

Now, use your favorite text editor (e.g. emacs, vi) to make a change to the MyFirstApp.java file

At the top of the file:

-   Add this comment, substituting your own name where it says INSERT NAME HERE.
-   Also, for the item that says version, change the date, lab number and quarter to the actual date that you are doing this lab.
-   All of this should come before the line that says `public` `static` `void` `main(String` `[]` `args)` `{`.

<!-- -->

    /** MyFirstApp is a sample program from p. 8-9 of Head First Java, 2nd edition.
     @author Kathy Sierra and Bert Bates
     @author INSERT NAME HERE
     @version 01/05/2016 for lab00, cs56, W16
    */

The format of Javadoc comments is special, so be careful to format everything exactly as shown, with two stars after the open slash, and all of the other punctuation , spacing, and line breaks exactly as you see them above.

The reason for these specially formatted comments is that they allow us to automatically build documentation for our Java code in the form of a web site with hyperlinks. Working with Javadoc (and documentation generation, generally) is an important real-world job skill that we'll learn in this course.

After you add the javadoc comment, compile it and run it again to make sure it still compiles and runs, i.e:

    javac MyFirstApp.java
    java MyFirstApp

Then, see if you can create javadoc for this program on your CSIL website, with the following command:

    javadoc -d ~/public_html/cs56/lab00/javadoc *.java 

This command says: run the javadoc utility,

-   create the javadoc in the directory `~/public_html/cs56/lab00/javadoc`
-   use all of the files ending in .java in the current directory as input (that's the \*.java part)

<http://i.imgur.com/dOYeYSd.png>

The output should look something like this:

    -bash-4.2$ javadoc -d ~/public_html/cs56/lab00/javadoc *.java 
    Loading source file MyFirstApp.java...
    Constructing Javadoc information...
    Standard Doclet version 1.7.0_09-icedtea
    Building tree for all the packages and classes...
    Generating /cs/student/bgaucho/public_html/cs56/lab00/javadoc/MyFirstApp.html...
    Generating /cs/student/bgaucho/public_html/cs56/lab00/javadoc/package-frame.html...
    Generating /cs/student/bgaucho/public_html/cs56/lab00/javadoc/package-summary.html...
    Generating /cs/student/bgaucho/public_html/cs56/lab00/javadoc/package-tree.html...
    Generating /cs/student/bgaucho/public_html/cs56/lab00/javadoc/constant-values.html...
    Building index for all the packages and classes...
    Generating /cs/student/bgaucho/public_html/cs56/lab00/javadoc/overview-tree.html...
    Generating /cs/student/bgaucho/public_html/cs56/lab00/javadoc/index-all.html...
    Generating /cs/student/bgaucho/public_html/cs56/lab00/javadoc/deprecated-list.html...
    Building index for all classes...
    Generating /cs/student/bgaucho/public_html/cs56/lab00/javadoc/allclasses-frame.html...
    Generating /cs/student/bgaucho/public_html/cs56/lab00/javadoc/allclasses-noframe.html...
    Generating /cs/student/bgaucho/public_html/cs56/lab00/javadoc/index.html...
    Generating /cs/student/bgaucho/public_html/cs56/lab00/javadoc/help-doc.html...
    -bash-4.2$ 

As you probably know by now, the directory ~/public\_html/cs56/lab00/javadoc corresponds to the following web page (substitute your CSIL username in place of the word <span style="color:blue; font-style:italic;">username</span> below.

-   http://www.cs.ucsb.edu/~<span style="color:blue; font-style:italic;">username</span>/cs56/lab00/javadoc

Check that link, and see if you find Javadoc for your class there.

IF YOU GET A PERMISSION DENIED ERROR: then you'll need to adjust the permissions with chmod. Here are some troubleshooting tips:

-   If you get permission troubles, make sure that your home directory allows your public\_html file to be seen, i.e. do `chmod` `711` `~`
-   If you still get permission errors, make sure that your ~/public\_html directory permissions modes are set to 755, i.e. do `chmod` `-R` `755` `~/public_html`
-   If you see it, but the CSS looks all wrong, remove the entire javadoc directory and run the javadoc command again, i.e.:
    -   cd ~/public\_html/cs56
    -   rm -rf lab00/javadoc
    -   then repeat the javadoc command from before.

When it works, you should see a website like the one shown here.

### Adding the author and version information to the javadoc

<http://i.imgur.com/ZmSWIX0.png>

Two things that are missing are the author and the version. To get those to appear, you can include `-author` and `-version` on the command line, like this:

    javadoc -author -version -d ~/public_html/cs56/lab00/javadoc *.java 

That should cause the author and version to appear. Be sure that your name and the correct date appears now, and not the name and date that you see in this picture at right.

As part of grading this assignment, the TA will be checking to be sure that your Javadoc appears on the web at the link: http://www.cs.ucsb.edu/~<span style="color:blue; font-style:italic;">username</span>/cs56/lab00/javadoc so be sure that is true now.

If it is not, then go back over this step and see if you can figure out what went wrong—then ask for help if you need it.

If you are still stuck, and no-one is available to help now, you can continue with the steps below, but you'll need to come back to this step eventually before you do the final "submit" step for this lab.

Step 8: Making, committing and pushing another change (to MyFirstApp.java)
--------------------------------------------------------------------------

Now, in order to practice this workflow of "edit, git status, git add, git commit, git push", we are going to make one final change.

To print out the current data and time in a Java program, you can add the following lines (this comes from <http://www.tutorialspoint.com/java/java_date_time.htm>, and is the result of a Google search on "Java print date and time")

           // Instantiate a Date object
           Date date = new Date();
            
           // display time and date using toString()
           System.out.println(date.toString());

Add these lines to your Java program after the existing `System.out.println("...");` lines. If you try to compile, you'll find that you get a syntax error. The problem is that in order to use the Date object, you also need to put the following at the very top of your file (this can go before the javadoc comment):

    import java.util.Date;

If you are familiar with C/C++ program, you might think that this is similar to a `#include...`, but that's not the case—rather, it has more in common with the `using` `namespace` `std;` code that you find in a C++ program. But we can go into more detail on that another time.

Make sure that your code compiles, and that when you run it, you see the date. If necessary, go back to an earlier step to review how to compile and run your Java code.

Then, when the code is working, **go through the steps to commit and push your change**. You can review the necessary sequence of steps (workflow) in one of the earlier steps of this lab. This time, try running `git` `diff` before you commit so you can see what it looks like.

This time, I'm not giving you all the steps. I want you to work through those yourself.

Final Step: Submitting your Code via visiting the lab00 link on Gauchospace
---------------------------------------------------------------------------

As we mentioned earlier, we are NOT planning to use the turnin program in CS56 this quarter, and we may or may not use submit.cs

For this lab, in any case, we will be grading your code by looking for your code on github.ucsb.edu.

To let us know that you are finished with your lab, and that it is ready for grading, you should visit the lab00 link on Gauchospace.com:

-   Click on the lab00 link shown here: [lab00](https://gauchospace.ucsb.edu/courses/mod/assign/view.php?id=477678)
-   In the place where you can submit some text, put in two things:
    -   A link to your repo e.g. https://github.ucsb.edu/yourusername/cs56-w16-lab00
    -   A link to your javadoc, e.g. https://www.cs.ucsb.edu/~yourcsilusername/cs56/lab00/javadoc

NOW: very important: if you want to get full credit, please make both of these clickable links in your Gauchospace submission. You can do that like this for each of the two URLs:

-   Select the URL
-   Copy it (CTRL/C or Cmd-C, or whatever)
-   Click the link icon (little chain picture)
-   Paste in URL in the little box that pops up.

This should turn your URL into a clickable link.

NOW: ALSO very important! Test your link! After saving the text in Gauchospace, please click each of the two links and make sure that they go to the repo, and the javadoc, respectively.

It is important that these links work, because they are how your TAs are going to find your work to grade it. If they don't work, and the TAs have to go hunting for you stuff, they will not be in a good mood. Trust me: when TAs are grading your work, you want them to be in a good mood. Just sayin'.

Then click submit and you are done!

Grading Rubric
==============

Partial credit may be awarded for each step at the discretion of the TA/Instructor.

Repo
----

-   (A) (30 pts): Your have created the cs56-w16-lab00, and pushed (at least) three commits to the origin/master on github.com (as described in the lab instructions)
    -   At least one for the javadoc comment
    -   At least one for updating the README.md file
    -   At least one for adding the code that prints the date to the MyFirstApp.java file
    -   If you have more than three commits, that's no problem at all.
-   (B) (10 pts): Your README.md file contains a link to the javadoc

Javadoc
-------

-   (C) (10 pts): You generated the javadoc and it appears at http://www.cs.ucsb.edu/~<span style="color:blue; font-style:italic;">username</span>/cs56/lab00/javadoc
-   (D) (10 pts): Your generated javadoc contains the author and version as described in the instructions

Gauchospace
-----------

-   (E) (10 pts): Your submission on Gauchospace has the two links asked for in the instructions (to your github repo, and to your javadoc)
-   (F) (30 pts): For otherwise following instructions and submitting on time.

<span class="pointCount"></span> points towards lab component of your grade.

\_\_TOC\_\_
