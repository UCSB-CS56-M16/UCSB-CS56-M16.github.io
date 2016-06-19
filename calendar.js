var cal = {
    numWeeks : 6,
    startDate : new Date("June 19, 2016 00:00:00")
};


$(document).ready(function() {

    // page is now ready, initialize the calendar...

    $('#calendar').append(  '<table />' );
    $('#calendar table').append( '<tr><th>Week</th><th>S</th><th>M</th><th>T</th><th>W</th><th>R</th><th>F</th><th>S</th></tr>');
    var dayOffset = 0;
    for(var i=1;i<=6; i++){
	$('#calendar table').append( '<tr data-week-num="' + i +'" />')
	var thisWeeksTrSelector = '#calendar table tr[data-week-num="' + i + '"]';
	$(thisWeeksTrSelector).append('<td>' + i + '</td>');
	for (var day=0; day<7; day++) {
	    var thisDate = new Date(cal.startDate);
	    thisDate.setDate(thisDate.getDate() + dayOffset);
	    var thisDateFormatted = $.format.date(thisDate, "MM/dd");
	    var obj = { day : thisDate.getDay(),
			month : thisDate.getMonth(),
			dayOffset : dayOffset };
	    $('<td/>')
		.append('<span class="cal_mmdd">'+ thisDateFormatted + '</span>')
		.attr('data-day',thisDate.getDay())
	    	.attr('data-month',thisDate.getMonth())
	    	.attr('data-dayOffset',dayOffset)
		.appendTo(thisWeeksTrSelector);

	    dayOffset++;
	}
    }

});
