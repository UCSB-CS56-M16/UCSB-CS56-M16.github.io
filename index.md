---
title: CS56, Summer 2016, pconrad
---

# CS56, Summer 2016


## Homework Assignments:

<table>
<tr>
  <th>Hxx</th>
  <th>ready?</th>
</tr>
{% for hwk in site.hwk %}
  <tr>
    <td><a href="{{hwk.url}}">{{ hwk.title }}</a></td>
    <td>{{hwk.ready}}</td>
  </tr>
{% endfor %}
</table>
