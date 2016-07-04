---
layout: null
---




$(document).ready(function(){
    console.log("exam.js: document is ready");


    $('.page-break-before').each(function() {
	var prev = $(this).prev();
	var $div = $("<div>", {class: "pagebreak"});
	prev.css('background-color','pink');
	prev.append($div);
	$('.exam-page-header-template').first().clone().appendTo($div);
	prev.css('margin-bottom','0');
    });


    $('td.page-num').each(function(i) {
	$(this).html(i+1); // re-calculate page numbers
    });


    console.log("exam.js: done");
});
