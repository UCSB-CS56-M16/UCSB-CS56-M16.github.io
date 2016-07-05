---
layout: examHandout
num: e01b
ready: false
desc: "Handout for Practice Exam 'e01b'"
exam_date: 2016-07-07 09:30:00.00-7
---

<h2>CODE FOR QUESTION 1</h2>

```java
/** Exercise based on p. 266 in HFJ, for H16, S12, CS56, UCSB, P. Conrad 
*/

public class Dog {

    private static Dog dogOfTheWeek = null;
    
    private String name;
    
    public void setAsDogOfTheWeek() {
	dogOfTheWeek = this;
    }

    public static Dog getDogOfTheWeek() {
	return dogOfTheWeek;
    }
    
    public Dog(String name) { this.name = name;}

    public static void main(String [] args) {

	Dog d1 = new Dog("Fido"); 
	Dog d2 = new Dog("Rover");
	Dog d3 = new Dog("Princess"); 
	Dog d4 = new Dog("Spot"); 
	Dog d5 = new Dog("Snoopy"); 


	d1.setAsDogOfTheWeek();   /*  1 */
	d1 = d2;                 /*  2 */
	Dog d6 = d3;             /*  3 */ 
	Dog temp = d4;		 /*  4 */
	d4 = d3;                 /*  5 */
	d3 = temp;		 /*  6 */
	d2 = getDogOfTheWeek();  /*  7 */
	d4.setAsDogOfTheWeek();	 /*  8 */
	d5 = null;               /*  9 */
	d4 = null;		 /* 10 */
	d3 = null;               /* 11 */
	d2 = null;		 /* 12 */
	d1 = null;               /* 13 */
	temp = null;		 /* 14 */
    }                            /* 15 */
}
```

<h2 class="page-break-before">See other side</h2>


