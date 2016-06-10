---
title: "H00"
ready: false
assigned: 2016-06-20 09:30:00.00-8:00
due: 2016-06-22 09:30:00.00-8:00
---

# H00


<div style="font-size:120%">

<ol>

<li> (6 pts) Please write your name: __________________________


<li> (5 pts)  If you didn't do it yet: 

Login at https://github.ucsb.edu

* Use your CSIL username/password to login.
* Then you can immediately log out.

This establishes your account on the local private UCSB Github server.    Until you have logged in at least once, your login doesn't exist, so we can't add you to the CS56 "organization"&nbsp;and that is something we must do before Thursday's lab.       <b>If it doesn't work</b>: Email help@engineering.ucsb.edu, and cc Prof. Conrad (pconrad@cs.ucsb.edu).  Include "github.ucsb.edu access" in the subject line.     Indicate whether the problem is CSIL access in general, or only access to github.ucsb.edu.

Write your CSIL username here:

Points will be awarded if you do this by the time this homework is graded.  If not, you'll still have to do it, but you wont get those points back.

</li>

<li> (5 pts) If you didn't do it yet:

In addition to the UCSB campus github server, we will also be using the regular public github.com service for certain open source projects.   So please:


* create your github.com username and password (free account) at github.com

* fill in the form at: http://bit.ly/cs56-w16-githubform

Write your github.com username in the box here

Points will be awarded if you do this by the time this homework is graded.  If not, you'll still have to do it, but you wont get those points back.

</li>
</ol>

<b>READING ASSIGNMENT</b>

Throughout the quarter, when I refer to '''HFJ''', this means your Head First Java, 2nd Edition textbook---the one that has its own wiki page at [[HFJ]].

* Please read [[HFJ:Chapter 1]], and [[HFJ:Chapter 2]]
    * If you don't have your book yet, buy it!  But in the meantime you can read this either at the UCSB library, or online.
    * Visit the course wiki at http://foo.cs.ucsb.edu/56wiki and you'll find the link to the online textbook.   
* As you read, also consult the reading notes which you can find at this page on the wiki: [[HFJ:Chapter 1]], [[HFJ:Chapter 2]]
* Then, do the problems on page 2 of this handout.   Bring those with you to class to turn in on Wednesday.


<ol start="4">

<li> (8 pts) On page 5 and 6, there is a set of exercises, and the answer to those.  Here is a similar set of exercises, but the answer are not provided.  Fill in the blanks.

<table class="wikitable" border="1" width="100%">
<tr>
<th> java code</th>
<th> explanation</th>
</tr>
<tr>
<td> <code>boolean cs56IsAwesome= true;<code>   </td>
<td> <div style="height: 2em; width: 30em;">&nbsp;</div></td>
</tr>
<tr>
<td> <code>Course c = new Course("CMPSC56","W16");<code> </td>
<td> <div style="height: 2em; width: 30em;">&nbsp;</div></td>
</td>
</tr>
<tr>
<td> <code>String thisQuarter = "M16";<code></td>
<td> <div style="padding-top: 2em; padding-left: 30em;">&nbsp;</div></td>
<tr>
<td> <code>if (c.getQuarter().equals(thisQuarter))<code> </td>
<td> <div style="padding-top: 2em; padding-left: 30em;">&nbsp;</div></td>
</tr>
</table>

</li>

<li> (8 pts) Now, the same kind of exercise, but in reverse---I give you the description, you give me the code.    These are designed that you should be able to just reason them out from the examples of Java code given on p.4 and p.5, and your general programming background from CS16 and CS24 in C/C++---no other knowledge of Java should be needed.

{| class="wikitable" border="1" 
|-
! java code
! explanation
|-
<td> <div style="padding-top: 2em; padding-left: 30em;">&nbsp;</div></td>
| declare a variable that indicates whether this year is a leap year or not, and initialize it to say that it is not a leap year
|-
<td> <div style="padding-top: 2em; padding-left: 30em;">&nbsp;</div></td>
| declare a variable item of type MenuItem, and initialize it to a "Caesar Salad" that costs 8.95.   Assume those are the two parameters that the constructor takes.
|-
<td> <div style="padding-top: 2em; padding-left: 30em;">&nbsp;</div></td>
| declare a variable of type double called total
|-
<td> <div style="padding-top: 2em; padding-left: 30em;">&nbsp;</div></td>
| an assignment statement that calls the method getPrice on the variable item and adds the result into the variable total
|}
</li>

<li> (6 pts) According to chapter two, anytime you need to test a class in Java, you need at least two classes.  (As we'll discuss in lecture, this isn't strictly true, but let's go with it for now.)   In the (oversimplified) view the author is presented (it is just chapter two, after all,) what are the <em>two roles</em> that these two classes are playing? <b>Idenfity the roles, and explain each briefly,</b> 
</li>

<li> (6 pts) The author describes two different approaches to a problem&mdash;one taken by "Larry", and the other taken by "Brad".    Based on what you read here, and in your own words, how would you characterize the main difference between the two approaches?    
</li>

<li> (6 pts) Throughout the book, some important material is sometimes in the little "side boxes" and dialogues.  It's important to read everything on every page.   One of these little side-boxes contains some important information about the "heap" in Java, and how it differs from the heap in C++.   (C++ is not specifically mentioned, but from taking CS32, you should know about how the heap works in C++.)    <b>Briefly explain</b> what the authors tell us about the heap in Java&mdash;something that is definitely different from the heap in C++. 
</li>
</ol>

