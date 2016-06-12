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
    console.log("site.js: done");
});
