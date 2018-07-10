
var choices = new Array;
var id = new Array;
// local data
function loadXMLDoc(dname)
{
  if (window.XMLHttpRequest)
  {
    xhttp=new XMLHttpRequest();
  }
  else
  {
    xhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.open("GET",dname,false);
  try {xhttp.responseType="msxml-document"} catch(err) {} // Helping IE
  xhttp.send("");
  return xhttp;
}

function loadList()
{
  var x=loadXMLDoc("https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_status");
  var xml=x.responseXML;
  path="//stations/station/name";
  var nodes=xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
  var result=nodes.iterateNext();
  
  while(result!=null){
    choices.push(result.childNodes[0].nodeValue);
    result=nodes.iterateNext();
  }
  path="//stations/station/id";
  var nodes=xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
  var result=nodes.iterateNext();
  
  while(result!=null){
    id.push(result.childNodes[0].nodeValue);
    result=nodes.iterateNext();
  }
}

function getStatus()
{
  var x=loadXMLDoc("bikeStations.xml");
  var xml=x.responseXML;
  var statID = choices.indexOf(document.getElementById("station").value);
  
  path="//stations/station[id='"+id[statID]+"']/name | //stations/station[id='"+id[statID]+"']/nbBikes | //stations/station[id='"+id[statID]+"']/nbEmptyDocks";
  console.log(path);
  var nodes=xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
  var result=nodes.iterateNext();
  
  document.getElementById("name").innerHTML = result.childNodes[0].nodeValue;
  result=nodes.iterateNext();
  document.getElementById("bikes").innerHTML = result.childNodes[0].nodeValue;
  result=nodes.iterateNext();
  document.getElementById("docks").innerHTML = result.childNodes[0].nodeValue;
}

$(function(){
  $('#station').autoComplete({
    source: function(term, suggest){
      term = term.toLowerCase();
      var suggestions = [];
      for (i=0;i<choices.length;i++)
        if (~choices[i].toLowerCase().indexOf(term)) 
          suggestions.push(choices[i]);
          suggest(suggestions);
    }
  });
});

// AJAX requests

$('input[name="q"]').autoComplete({
source: function(term, response){
$.getJSON('/some/ajax/url/', { q: term }, function(data){ response(data); });
}
});

// Optimizing AJAX requests

$('input[name="q"]').autoComplete({
source: function(term, response){
try { xhr.abort(); } catch(e){}
var xhr = $.getJSON('/some/ajax/url/', { q: term }, function(data){ response(data); });
}
});
