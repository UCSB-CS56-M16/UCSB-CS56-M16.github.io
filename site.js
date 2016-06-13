---
layout: null
---

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
    
    console.log("site.js: done");
});
