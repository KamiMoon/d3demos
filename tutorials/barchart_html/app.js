var data = [4, 8, 15, 16, 23, 42];

var body = d3.select("body");

// body.style("color", "white");
// body.style("background-color", "black");

var div = body.append("div");
div.html("Hello, world!");

// linear scale
var x = d3.scale.linear().domain([0, d3.max(data)]).range([0, 420]);

var chart = d3.select(".chart");
var bar = chart.selectAll("div");
var barUpdate = bar.data(data);
var barEnter = barUpdate.enter().append("div");
barEnter.style("width", function(d) {
    return x(d) + "px";
});
barEnter.text(function(d) {
    return d;
});
