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
    "lab": [
	{% for asn in site.lab %}
	{% if asn.num %}
	{
	    "num" : "{{ asn.num }}",
	    "ready" :  "{{ asn.ready }}",
	    "desc" :  "{{ asn.desc }}",
	    "assigned" :  "{{ asn.assigned }}",
	    "due" :  "{{ asn.due }}",
	    "url" :  "{{ asn.url }}",
	},
	{% endif %}
	{% endfor %}
    ],

    "exam": [
	{% for asn in site.exam %}
	 {% if asn.layout == "exam_info" %}
	{
	    "num" : "{{ asn.num }}",
	    "ready" :  "{{ asn.ready }}",
	    "desc" :  "{{ asn.desc }}",
	    "exam_date" :  "{{ asn.exam_date }}",
	    "url" :  "{{ asn.url }}",
	},
	{% endif %}
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
	    cal.days[mmdd] = [];
	    thisDay = thisDay.add(1,"days");
	    mmdd = thisDay.format("MM/DD");	    
	}
    }
    for (var i = 0, len = dates.hwk.length; i < len; i++) {
	processHwkOrLab(dates.hwk[i],"hwk");
    }
    for (var i = 0, len = dates.lab.length; i < len; i++) {
	processHwkOrLab(dates.lab[i],"lab");
    }
    for (var i = 0, len = dates.exam.length; i < len; i++) {
	processExam(dates.exam[i]);
    }

}

function isHwkOrLabAssignment(hwkOrLab) {
    return hwkOrLab.hasOwnProperty('num') &&
	hwkOrLab.hasOwnProperty('ready') &&
	hwkOrLab.hasOwnProperty('desc') &&
 	hwkOrLab.hasOwnProperty('assigned') &&
	hwkOrLab.hasOwnProperty('due') ;
}


function isExam(exam) {
    return exam.hasOwnProperty('num') &&
	exam.hasOwnProperty('ready') &&
	exam.hasOwnProperty('desc') &&
 	exam.hasOwnProperty('exam_date');
}


function processHwkOrLab(item,which) {
    if (which!="hwk" && which!="lab") {
	reportError("processHwkorLab: second param must be hwk or lab: " + which);
	return;
    }
    if (!isHwkOrLabAssignment(item)) {
	reportError("processHwkOrLab: problem with item" + JSON.stringify(item));
    }

    mmdd_assigned = moment(item.assigned).format("MM/DD");
    mmdd_due = moment(item.due).format("MM/DD");

    var assigned = {"asn_type" : which, "date_type" : "assigned", "value": JSON.stringify(item) };
    pushToFirstIfArrayElseSecond(assigned,cal.days[mmdd_assigned],cal.days_outside_calendar);

    var due = {"asn_type" : which, "date_type" : "due", "value": JSON.stringify(item)};
    pushToFirstIfArrayElseSecond(due,cal.days[mmdd_due],cal.days_outside_calendar);
    
}

function processExam(item) {
    if (!isExam(item)) {
	reportError("processExam: problem with item" + JSON.stringify(item));
    }

    mmdd_exam_date = moment(item.exam_date).format("MM/DD");

    var assigned = {"asn_type" : "exam", "date_type" : "exam", "value": JSON.stringify(item) };
    pushToFirstIfArrayElseSecond(assigned,
				 cal.days[mmdd_exam_date],
				 cal.days_outside_calendar);
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
    if (hwk.ready=="true") {
		$(this).addClass("ready");
	} else {
		$(this).addClass("not-ready");
	}
	var link = $('<a />')
	    .attr('href',hwk.url)
	    .attr('data-ajax','false')
	    .text(hwk.num)
	    .appendTo($(this));
	$(this).addClass("hwk");
    });

    
    
    $('.cal-assignments div[data-asn-type="lab"]').each(function() {
	var asn = $(this).data("date-value");
    if (asn.ready=="true") {
		$(this).addClass("ready");
	} else {
		$(this).addClass("not-ready");
	}
	var link = $('<a />')
	    .attr('href',asn.url)
		// .attr('data-ajax','false')
	    .text(asn.num)
	    .appendTo($(this));
	$(this).addClass("lab");
    });


    $('.cal-assignments div[data-asn-type="exam"]').each(function() {
	var exam = ($(this).data("date-value"));
    if (exam.ready=="true") {
		$(this).addClass("ready");
	} else {
		$(this).addClass("not-ready");
	}
	var label = $('<span />')
	    .text(exam.desc + ": ")
	    .appendTo($(this));
	var link = $('<a />')
	    .attr('href',exam.url)
	    .attr('data-ajax','false')
	    .text(exam.num)
	    .appendTo($(this));
	$(this).addClass("exam")
;
    });

    
    $('.cal-assignments div[data-date-type="due"]').each(function() {
	var asn = ($(this).data("date-value"));
	$(this).append(" due " + moment(asn.due).format("hh:mma") );
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

