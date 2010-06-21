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

  // set up the Raphael 'canvas' and add 3 horizontally-alighned shapes to it.

  r = Raphael($container[0]);

  points = r.set().push(
    r.circle(w/2 + 50, h/2, 6),
    r.rect(-6, -6, 12, 12).rotate(45).translate(w/2, h/2),
    r.circle(w/2 - 50, h/2, 6)
  );


  // interpose a group node (using SVG or VML semantics as appropriate) between the canvas & the 3 points

  group = r.raphael.vml ?
    document.createElement("group") :
    document.createElementNS("http://www.w3.org/2000/svg", "g"); // (jQuery can't create namespaced DOM nodes)

  $(r.canvas).append($(group));
  group.id = "the-group";             // test that we can set an id and retrieve the group by its id
  var $group = $("#the-group");
             
  // Reparent every node with the just-created group node.

  // What's going on here? Raphael wraps every VML shape node with its very own VML group node.
  // This group node is created by Raphael in order to apply style correctly to the VML shape node it contains.
  // However point.node doesn't point at this group node. Instead it points at the shape node inside the group node.
  // We need to move not just point.node, but also the 'style-applying' group node it is contained within, into the
  // 'grouping-together' group node that we created above.

  $.each(points.items, function (index, point) {
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

  points.attr(notClicked).attr(notHighlighted);


  // and attach event handlers to the group node

  $group.mousedown(function (evt) {
    points.attr(highlighted);
    evt.target.raphael.attr(clicked);   // but call out the clicked node (this is event delegation)
    evt.preventDefault();
    return false;
  });

  var done = function (evt) {
    points.attr(notHighlighted);
    evt.target.raphael.attr(notClicked);
    return false;
  };
  $group.mouseup(done);
  $group.mouseleave(done);
});