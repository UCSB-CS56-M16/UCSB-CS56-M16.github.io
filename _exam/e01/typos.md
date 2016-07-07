---
layout: default
num: e01
---

# Typo corrections for {{site.qtr}} exam {{page.num}}

On the yellow handout, p.2., line 3 is incorrect:

WRONG: `Dog d3 = d6;     /* 3 */`

CORRECT: `Dog d6 = d3;   /* 3 /`

# Clarifications and Hints

Question 1: You have a choice: you can design for an unlimited number of Cabins per Aircraft, or 
you can set a maximum (e.g. 4, or 10).   

If you DO choose to set a maximum, that MUST be declared as a
constant, and the actual number should appear in only one place in your code.   Do that in whatever
way is appropriate in Java.

For Question 2: java.lang.Integer has these constructors only:

|`Integer(int value)` | Constructs a newly allocated Integer object that represents the specified int value. |
| `Integer(String s)` |  Constructs a newly allocated Integer object that represents the int value indicated by the String parameter. |
