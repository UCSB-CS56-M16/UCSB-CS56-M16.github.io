---
layout: null
---

// TODO: Rewrite in JQuery 
function countPoints(n) {                     // n is a Node 
  if (n.nodeType == 3 /*Node.TEXT_NODE*/)   // Check if n is a Text object
    return pointCount(n);                 // If so, parse its text and return number of points
  // Otherwise, iterate through n's children, totalling up the points
  var numpoints = 0; 
  for(var m = n.firstChild; m != null; m = m.nextSibling)  {
     numpoints += countPoints(m);  
  }
  return numpoints;   // Return total of all children's points
}


  


$(document).ready(function(){
    console.log("site.js: document is ready");
    $('[data-hfj]').each(function() {
	var chapter_num = $(this).data('hfj');
	var href = "{{ site.hfj_chapter_url_prefix }}" + chapter_num;
	$(this).html('<a href="' + href + '">HFJ Chapter ' + $(this).data('hfj') + '</a>');
    });

    $('.pagebreak').each(function() {
	$('.hwk-page-header-template').first().clone().appendTo($(this));
    });

    $('td.page-num').each(function(i) {
	$(this).html(i+1); // re-calculate page numbers
    });
    
    if ($(".pointCount").length > 0 ) {
      var total = countPoints(document.body);
      $(".pointCount").html(total);
    }
    
    console.log("site.js: done");
});
