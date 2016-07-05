---
layout: null
---


  

$(document).ready(function(){
    console.log("hwk.js: document is ready");

    $('td.page-num').each(function(i) {
	$(this).html(i+1); // re-calculate page numbers
    });

    $('.pagebreak').each(function() {
	$('.hwk-page-header-template').first().clone().appendTo($(this));
    });
    
    console.log("hwk.js: done");
});
