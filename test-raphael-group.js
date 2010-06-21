/*globals $ Raphael */

// make these accessible at the Firebug/Web Inspector console
var r, group, points;

$(function () {
  
  var notHighlighted = {
        stroke: "#999999",
        fill: "#999999"
      },
      
      highlighted = {
        stroke: "#aa0000",
        fill: "#aa0000"            
      },
      
      notClicked = {
        opacity: 0.3
      },
      
      clicked = {
        opacity: 1.0
      };

  var $container = $("#container"),
      w = $container.width(),
      h = $container.height();      
  
  // set up the Raphael 'canvas' and add 3 horizontally-alighted points to it.
  
  r = Raphael($container[0]);       
  
  points = [r.circle(w/2 + 50, h/2, 6), 
    r.path("M " + (w/2-6) + " " + (h/2-6) + "l 0 12 l 12 0 l 0 -12 z"), 
    r.circle(w/2 - 50, h/2, 6)];
  
  
  // interpose a group node (using SVG or VML semantics as appropriate) between the canvas & the 3 points
  
  group = r.raphael.vml ? 
    document.createElement("group") : 
    document.createElementNS("http://www.w3.org/2000/svg", "g"); // (jQuery can't create namespaced DOM nodes)
  
  group.id = "the-group";             // test that we can set an id and retrieve the group by its id
  $(r.canvas).append($(group));
  var $group = $("#the-group");
  
  // reparent every node with the just-created group node.
  // What's going on here? Raphael puts every VML shape node into a group node which Raphael creates.
  // However point.node doesn't point at this group node. Instead it points at the shape node inside the group node.
  // Therefore we find the group node created by Raphael, if it exists, and reparent that with the grouping node *we*
  // created.
  
  $.each(points, function (index, point) {
    var node, groupNode;
    
    if (r.raphael.vml && (groupNode = $(point.node).closest('group')[0])) {
      node = groupNode;
    }
    else {
      node = point.node;
    }
    
    $group.append($(node)); 
  });
  
  // add style now because it gets lost on reparenting (in IE7)
  
  $.each(points, function (index, point) { point.attr(notClicked).attr(notHighlighted); });
    
  
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
    evt.preventDefault();
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