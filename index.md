---
title: CS56, Summer 2016, pconrad
---

# CS56, Summer 2016


## Homework:

<table id="hwk_table">
<tr>
  <th>Hxx</th>
  <th>ready?</th>
  <th>assigned</th>
  <th>due</th>
</tr>
{% for hwk in site.hwk %}
  <tr>
    <td><a href="{{hwk.url}}">{{ hwk.title }}</a></td>
    <td>{{hwk.ready}}</td>
    <td>{{hwk.assigned}}</td>
    <td>{{hwk.due}}</td>
  </tr>
{% endfor %}
</table>
