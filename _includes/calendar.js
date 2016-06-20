var dates = {
    "hwk": [
	{% for asn in site.hwk %}
	{
	    "num" : "{{ asn.num }}",
	    "ready" :  "{{ asn.ready }}",
	    "desc" :  "{{ asn.desc }}",
	    "assigned" :  "{{ asn.assigned }}",
	    "due" :  "{{ asn.due }}",
	    "url" :  "{{ asn.url }}",
	},
	{% endfor %}
    ],
};



var cal = {
    numWeeks : {{ site.num_weeks }},
    startDate : moment("{{site.start_date}}"),
    days : {},
    days_outside_calendar : []
};


function traverseDates(dates) {
    var thisDay = moment(cal.startDate);
    var mmdd = thisDay.format("MM/DD");
    for (var i = 1, len = cal.numWeeks; i <= len; i++) {
	for (var j=1; j<=7; j++) {
	    console.log("mmdd=" + mmdd);
	    cal.days[mmdd] = [];
	    thisDay = thisDay.add(1,"days");
	    mmdd = thisDay.format("MM/DD");	    
	}
    }
    for (var i = 0, len = dates.hwk.length; i < len; i++) {
	processHwk(dates.hwk[i]);
    }
}


function isHwkAssignment(hwk) {
    return hwk.hasOwnProperty('num') &&
	hwk.hasOwnProperty('ready') &&
	hwk.hasOwnProperty('desc') &&
 	hwk.hasOwnProperty('assigned') &&
	hwk.hasOwnProperty('due') ;
}

function processHwk(item) {
    if (!isHwkAssignment(item)) {
	reportError("problem with hwk object: " + JSON.stringify(hwk));
	return;
    }

    var hwk=item;     // Now we know properties are present.

    mmdd_assigned = moment(hwk.assigned).format("MM/DD");
    mmdd_due = moment(hwk.due).format("MM/DD");

    var assigned = {"asn_type" : "hwk", "date_type" : "assigned", "value": JSON.stringify(hwk) };
    pushToFirstIfArrayElseSecond(assigned,cal.days[mmdd_assigned],cal.days_outside_calendar);

    var due = {"asn_type" : "hwk", "date_type" : "due", "value": JSON.stringify(hwk)};
    pushToFirstIfArrayElseSecond(due,cal.days[mmdd_due],cal.days_outside_calendar);
    
}

// Used to cal.days[date], but fail over to
//  the cal.days_outside_calendar as a backup

function pushToFirstIfArrayElseSecond(obj, first, second) {
    if ( first instanceof Array) {
	first.push(obj);
    } else {
	second.push(obj);
    }
}

function reportError(error_message) {
    console.log(error_message);
    $('#calendar').append('<p>' + error_message + '</p>');

}


function setUpCalendar() {

    // page is now ready, initialize the calendar...
    var startDate = cal.startDate;
    var startDayOfWeek = startDate.format("ddd");

    if (startDayOfWeek != "Sun") {
	reportError("Error: site.start_date is not a Sunday.  Instead, it is: " + startDayOfWeek);
	return;
    }


    traverseDates(dates);
    reportDaysOutsideCalendar(cal);
    addCalendarTable(cal);

}

function addCalendarTable(cal) {
    
    $('#calendar').append(  '<table >' );
    $('#calendar table').append( '<tr><th>Week</th><th>S</th><th>M</th><th>T</th><th>W</th><th>R</th><th>F</th><th>S</th></tr>');
    var thisDay = new moment(cal.startDate);
    for(var i=1;i<=cal.numWeeks; i++){
	$('#calendar table').append( '<tr data-week-num="' + i +'" />')
	var thisWeeksTrSelector = '#calendar table tr[data-week-num="' + i + '"]';
	$(thisWeeksTrSelector).append('<td>' + i + '</td>');
	for (var day=1; day<=7; day++) {
	    var thisDateFormatted = thisDay.format("MM/DD");
	    var cal_mmdd = $('<div class="cal_mmdd">'+ thisDateFormatted + '</div>');
	    var assignments = getAssignments(cal,thisDateFormatted);
	    $('<td/>')
		.append(cal_mmdd)
		.append(assignments)
		.attr('data-mmdd',thisDateFormatted)
		.appendTo(thisWeeksTrSelector)
	    
	    thisDay = thisDay.add(1,'days');
	}
    }
    $('.cal-assignments div[data-asn-type="hwk"]').each(function() {
	var hwk = ($(this).data("date-value"));
	var link = $('<a />')
	    .attr('href',hwk.url)
	    .attr('data-ajax','false')
	    .text(hwk.num)
	    .appendTo($(this));
	$(this).addClass("hwk");
    });

    $('.cal-assignments div[data-date-type="due"]').each(function() {
	var hwk = ($(this).data("date-value"));
	$(this).append(" due " + moment(hwk.due).format("hh:mma") );
    });

    $('.cal-assignments div[data-date-type="assigned"]').each(function() {
	$(this).append(" assigned");
    });

    
}

function getAssignments(cal,mmdd) {

    var div = $("<div />")
	.addClass("cal-assignments")
	.attr("data-mmdd",mmdd);
    if ( (typeof(cal.days[mmdd]) === undefined)
	 || (! cal.days[mmdd] instanceof Array )
	 || ( typeof(cal.days[mmdd].length) === undefined ) ) {
	div.text("error: " + mmdd);
    } else if (cal.days[mmdd].length != 0) {
	// There are some assignments
	for (var i=0,len=cal.days[mmdd].length; i<len; i++) {
	    var item=cal.days[mmdd][i];
	    $("<div />")
		.attr("data-asn-type",item.asn_type)
		.attr("data-date-type",item.date_type)
	    	.attr("data-date-value",item.value)
		.appendTo(div);
	}
    }
    
    return div;
}

function reportDaysOutsideCalendar(cal) {
    if (cal.days_outside_calendar.length > 0) {
	$('#calendar').append(  '<div class="calendar-errors" />' );
	$('#calendar div.calendar-errors').append("<h2>Errors:</h2>");
	for (var i=0, len=cal.days_outside_calendar.length; i<len; i++) {
	    $('#calendar div.calendar-errors').append("<p><code>" +
						      JSON.stringify(cal.days_outside_calendar[i]) +
						      "</p>");
	}
    }
}

$(document).ready(function() {
    setUpCalendar();
});

