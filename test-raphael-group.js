/*globals $ Raphael */

// make these accessible at the Firebug/Web Inspector console
var r, group;

$(function () {
  
  var notHighlighted = {
        stroke: "#aaaaaa",
        fill: "#aaaaaa"
      },
      highlighted = {
        stroke: "#aa0000",
        fill: "#aa0000"            
      },
      notClicked = {
        opacity: 0.5,
        r: 6
      },
      clicked = {
        opacity: 1.0, 
        r: 8
      };

  var $container = $("#container"),
      w = $container.width(),
      h = $container.height();      
  
  // set up the Raphael 'canvas' and add 3 horizontally-alighted points to it.
  
  r = Raphael($container[0]);       

  var points = [r.circle(w/2 + 50, h/2), r.circle(w/2, h/2), r.circle(w/2 - 50, h/2)];
  $.each(points, function (index, point) { point.attr(notClicked).attr(notHighlighted); });
  
  
  // interpose a group node (using SVG or VML semantics as appropriate) between the canvas & the 3 points
  
  group = r.raphael.vml ? 
    document.createElement("vml:group") : 
    document.createElementNS("http://www.w3.org/2000/svg", "g"); // (jQuery can't create namespaced DOM nodes)

  var $group = $(group);
  $(r.canvas).append($group);
  $.each(points, function (index, point) { $group.append($(point.node)); });

  
  // and attach event handlers to the group node
  
  var addHighlight = function (index, point) {
    point.attr(highlighted);
  };
  var removeHighlight = function (index, point) {
    point.attr(notHighlighted);
  };
  
  $group.mousedown(function (evt) {
    $.each(points, addHighlight);       // highlight all the points
    evt.target.raphael.attr(clicked);   // but call out the clicked node (this is event delegation)
    return false;
  });
  
  var done = function (evt) {
    $.each(points, removeHighlight);
    evt.target.raphael.attr(notClicked);        
    return false;
  };
  $group.mouseup(done);
  $group.mouseleave(done);
});