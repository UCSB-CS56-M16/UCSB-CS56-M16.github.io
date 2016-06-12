---
layout: null
---

$(document).ready(function(){
    console.log("site.js: document is ready");
    $('.hfj').each(function() {
	var chapter_num = $(this).data('hfj');
	var href = "{{ site.hfj_chapter_url_prefix }}" + chapter_num;
	console.log("site.js: chapter_num=" + chapter_num + " href=" + href);
	$(this).html('<a href="' + href + '">HFJ Chapter ' + $(this).data('hfj') + '</a>');
    });

});
