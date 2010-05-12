var graphs = [],
    series = [],
    questions = [];

var displayedObjects = [];

var nodeForConfigId = {};

function getObjectDefs() {
  $('.sg-object-defs').items().each(function () {

    var def = getDef($(this));
    switch( $(this).itemType() ) {
      case 'sg-graph':
        graphs.push(def);
        break;
      case 'sg-question':
        questions.push(def);
        break;
      case 'sg-series':
        series.push(def);
        break;
    };
  });
};


function getDef($item) {
  var def = { id: $item.attr('id') };
  
  $item.properties().each( function () {
    var val = $(this).itemValue();
    $.each($(this).itemProp(), function (idx, prop) {
      // handles the interesting case where there are multiple itemprops for the same value; e.g,
      // <span itemprop='key1 key2'>val1</span> is speced to assign 'val1' to key1 AND key2.
      def[prop] = val;
    });
  });
  return def;
};


function createObjects() {
  $('<div id="sg-offscreen"></div>').appendTo($('body')).hide();

  // Cheat. Create the first graph only, and don't allow the series to be modified (yet).
  
  graphs[0].node = createGraph(graphs[0], series[0]);
  nodeForConfigId[graphs[0].id] = graphs[0].node;
};


function createGraph() {
  
  var demo = $("<div id='container' style='width:400px; height: 200px; background-color: #66aa66;'></div>").appendTo($('#sg-panel'));
  
  setupDemoGraph(demo);
  return demo[0];
};


function objectsToRemove(objectsNeeded) {
  var toRemove = [];
  $.each(displayedObjects, function (idx, objName) {
    if (!objectsNeeded[objName]) {
      toRemove.push(objName);
    }
  });
  return toRemove;
};

function objectsToAdd(objectsNeeded) {
  var toAdd = [];
  
  $.each(objectsNeeded, function(objName) {
    if (objectsNeeded[objName]) {
      toAdd.push(objName);
    }
  });
  return toAdd;      
};

function idFromHref(href) {
  // making a simplistic assumption here about how to get an id from an href
  return href.substr(href.lastIndexOf('#')+1);
};


function fadeTextOut() {
  $('#sg-panel > .sg-text > div').fadeOut('slow').remove();
};


function fadeTextIn($section) {
  $section.find('.sg-text').each( function () {
    
    classes = $(this).attr('class');
    displayClass = classes.match('right|left')[0];
    
    if ($('#sg-panel > div.'+displayClass).length == 0) {
      $('<div class="sg-text ' + displayClass + '"></div>').appendTo($('#sg-panel'));
    }
    
    $('#sg-panel > div.'+displayClass).addClass('sg-text').append(
      $('<div></div').append($(this).clone().contents()).hide());
  });
  
  $('#sg-panel .sg-text div').fadeIn('slow');
};


function removeObject(objId) {
  $(nodeForConfigId[objId]).hide().appendTo($('#sg-offscreen'));
};

function addObject(objId, displayClass) {
  
  // ah. a sticking point: you have to dereference the id of the config to find the id of the created object.  

  if ( $('#sg-panel > div.' + displayClass).length == 0) {
    $('#sg-panel').append( $('<div class="'+displayClass+'"></div>') );
  }
  
  $(nodeForConfigId[objId]).appendTo( $('#sg-panel > div.' + displayClass).removeClass('sg-text') ).show();     
};


function visit(id) {

  $section = $('section#' + id);
  objectsNeeded = {}; // horribly, this is a hash from ids of needed objects to classes 'left' or 'right'

  // objectsNeeded should be renamed 'displayClasses' or some such.
  $section.find('.sg-object-refs a').each( function () {
    classes = $(this).parent().attr('class');
    objectsNeeded[idFromHref($(this).attr('href'))] = classes.match('right|left')[0];
  });

  toRemove = objectsToRemove(objectsNeeded);
  toAdd = objectsToAdd(objectsNeeded);

  fadeTextOut();
        
  $.each(toRemove, function (idx, objId) { removeObject(objId); });
  $.each(toAdd, function (idx, objId) { addObject(objId, objectsNeeded[objId]); });
  
  fadeTextIn($section);
  
  $('#sg-panel a.nextlink').remove();
  $section.find('a[rel=next]').each( function () {
    var href = $(this).attr('href');
    $('<a class="nextlink" href="' + href + '">&gt;</a>').appendTo('#sg-panel').click(function () {
      visit(idFromHref(href));
    });
  });

  $('#sg-panel a.prevlink').remove();      
  $section.find('a[rel=prev]').each( function () {
    var href = $(this).attr('href');
    $('<a class="prevlink" href="' + href + '">&lt;</a>').appendTo('#sg-panel').click(function () {
      visit(idFromHref(href));
    });
  });
};

$(function () {      
  $('.sg-object-defs').hide();
  $('article#sg-content').hide();
  $('#sg-panel').show();
  
  // a pretty basic procedural decomposition...
  
  getObjectDefs();
  createObjects();
  $('#equation-here').text(series[0].equation);  // this is a cheatie- not a general mechanism.
  visit('page1');
});



setupDemoGraph = (function () {
  var undefined;    
  var f, point_val;
  
  var xrange = { min: -5, max: 5 },
      xstep = 0.1,
      xaxis_steps = 10,
      yaxis_steps = 10,
      padding = { top: 20, right: 20, bottom: 20, left: 20 },
      txt = {font: '12px Fontin-Sans, Arial', fill: "#fff"},
      colorhue = .6,
      color = "hsb(" + [colorhue, 1, .75] + ")",
      boundary_width = 30;

  // range from min to max by step, augmented with one point below min and one above max
  var augmented_range = function (min, max, step) {
      var range = [];
      var n_steps = Math.floor((max-min)/step)+3;  
      min -= step;
      
      for (var i = 0; i < n_steps; i++) {
          range[i] = min + i*step;
      }
      
      return range;
  };
  
  
  // evaluate f over xs
  var eval_func = function (f, xs) {
      var ys = [];

      for (var i = 0; i < xs.length; i++) {
          ys[i] = f(xs[i]);
      }
      
      return ys;
  };
  
  // handy utilities        
  var max = function (arr) { return Math.max.apply(null, arr); };
  var min = function (arr) { return Math.min.apply(null, arr); };
  
  
  function setupGraph($container) {

      var canvas_width = $container.width(),
          canvas_height = $container.height(),
          plot_width = canvas_width - padding.left - padding.right,
          plot_height = canvas_height - padding.top - padding.bottom;

      var plot = function () {
          
          var r = Raphael($container.attr('id'));

          var augmented_xs = augmented_range(xrange.min, xrange.max, xstep),
              augmented_ys = eval_func(f, augmented_xs);

          var xs = [], 
              ys = [];
          
          for (var i = 1, ii=augmented_xs.length-1; i < ii; i++) {
              xs[i-1] = augmented_xs[i];
              ys[i-1] = augmented_ys[i];
          }
          
          // note this won't work the way you want for functions that have infinities
          var yrange = { min: min(ys), max: max(ys) };                

          var xaxis_offset = plot_height *
              ((yrange.min < 0 && yrange.max > 0) ? (yrange.max / (yrange.max - yrange.min)) : 1);
              
          var yaxis_offset = plot_width *
              ((xrange.min < 0 && xrange.max > 0) ? (-xrange.min / (xrange.max - xrange.min)) : 0);

          r.g.txtattr.font = "12px 'Fontin Sans', Fontin-Sans, sans-serif";

          // x axis
          r.g.axis(
              padding.left, padding.top + xaxis_offset, plot_width, xrange.min, xrange.max, xaxis_steps, 2);

          // can we animate these when we switch between ranges?

          // y axis 
          r.g.axis(
              padding.left + yaxis_offset, padding.top + plot_height, plot_height, yrange.min, yrange.max, yaxis_steps, 3);


          // how to do it with graphael:
          // var chart = r.g.linechart(padding.left, padding.top, plot_width, plot_height, xs, ys);
          
          // convert function values to pixel values
          var scale_vals = function (vals, plot_dim, vals_range, dim) {
              var scale = plot_dim / (vals_range.max - vals_range.min);
              var direction = (dim == 'x' ? 1 : -1);
              var edge = (dim == 'x' ? vals_range.min : vals_range.max);
              
              var locs = [];
              for(i = 0, ii = vals.length; i<ii; i++) {
                  locs[i] = Math.round(scale * direction * (vals[i] - edge));
              }
              return locs;
          };
          
          var xlocs = scale_vals(augmented_xs, plot_width, xrange, 'x');
          var ylocs = scale_vals(augmented_ys, plot_height, yrange, 'y');
          
          // use xlocs and ylocs to draw the plot
          var pathspec = [];
          var pi = 0;
          
          for (var i = 1, ii = xlocs.length-1; i < ii; i++) {
              var x = padding.left + xlocs[i],
                  y = padding.top + ylocs[i];
                  
              pathspec[pi] = (pi == 0) ? "M" : "L";
              pi++;
              pathspec[pi++] = x;
              pathspec[pi++] = ' ';
              pathspec[pi++] = y;
          }
          
          
          // draw the path
          var pathstr = pathspec.join('');
          var curve = r.path(pathstr).attr({
              stroke: color,
              "stroke-width": 2
          });
          
          // Draw a boundary around the curve to track mouse events
          
          pathspec = [];
          pi = 0;
          var half_width = boundary_width / 2;
          var dx, dy;
          
          // define segments above the function curve
          for (i = 2, ii = xlocs.length; i < ii; i++) {
              var dx = xlocs[i] - xlocs[i-1],
                  dy = ylocs[i] - ylocs[i-1];
              
              var scale = half_width / (Math.sqrt(Math.pow(dx, 2)+Math.pow(dy, 2)));
              
              var x = Math.round(xlocs[i-1] + scale*dy),
                  y = Math.round(ylocs[i-1] - scale*dx);

              pathspec[pi] = (pi == 0) ? "M" : "L";
              pi++;
              pathspec[pi++] = padding.left + x;
              pathspec[pi++] = ' ';
              pathspec[pi++] = padding.top + y;
          }
          
          // define segments below the function curve...
          for (i = xlocs.length-1; i > 1; i--) {
              var dx = xlocs[i] - xlocs[i-1],
                  dy = ylocs[i] - ylocs[i-1];
                  
              var scale = half_width / (Math.sqrt(Math.pow(dx, 2)+Math.pow(dy, 2)));   
              
              var x = Math.round(xlocs[i-1] - scale*dy),
                  y = Math.round(ylocs[i-1] + scale*dx);

              pathspec[pi++] = "L";
              pathspec[pi++] = padding.left + x;
              pathspec[pi++] = ' ';
              pathspec[pi++] = padding.top + y;
          }

          // and connect the above and below curves
          pathspec[pi++] = 'z';
          
          pathstr = pathspec.join('');
          var curve_boundary = r.path(pathstr).attr({
              fill: "#000000",
              stroke: "#000000",
              opacity: 0,
              "stroke-width": 0
          });

          // Now events work properly on the curve_boundary...
          
          
          var point = r.circle(0, 0, 3).attr({
              stroke: "#aa0000",
              fill: "#aa0000",
              opacity: 0.5,
              r: 6
          }).hide();

          var xcross = r.path("M " + padding.left + " " + padding.top + "L " + padding.left + " " + (padding.top + plot_height)).hide();

          var ycross = r.path("M " + padding.left + " " + padding.top + "L " + (padding.left + plot_width) + " " + padding.top).hide();
          
          
          var point_has_been_dropped = false;
          var tracking_is_on = false;
          var point_is_being_dragged = false;
          

          var set_tracking_mode_on = function () {
              point.attr("opacity", 0.5);
              tracking_is_on = true;
              var xloc = point.attr("cx");
              var yloc = point.attr("cy");
              
              xcross.attr("path", 
                  "M " + xloc + " " + padding.top + 
                  "L " + xloc + " " + (padding.top + plot_height)
              ).show();
              
              ycross.attr("path", 
                  "M " + padding.left + " " + yloc + 
                  "L " + (padding.left + plot_width) + " " + yloc
              ).show();
          };
          
          var set_tracking_mode_off = function () {
              xcross.hide();
              ycross.hide();
              point.attr("opacity", 1.0);
              tracking_is_on = false;
          };

          var xspacing = plot_width / (xrange.max - xrange.min);
          var yspacing = plot_height / (yrange.max - yrange.min);
          
          var get_xy = function (clientX) {

              var xloc = clientX - $container.offset().left - padding.left;
              
              if (xloc < 0) {
                  xloc = 0;
              }
              if (xloc >= plot_width) {
                  xloc = plot_width-1;
              }

              var xval = (xloc) / xspacing + xrange.min;
              var yval = f(xval);
              var yloc = Math.round(yspacing * (yrange.max - yval));
              
              return {
                  xloc: xloc,
                  yloc: yloc,
                  xval: xval,
                  yval: yval
              };
          };
              
          var move_point = function (clientX) {
              var locs_and_vals = get_xy(clientX);
              
              var xloc = locs_and_vals.xloc;
              var yloc = locs_and_vals.yloc;
              
              point.attr({cx: xloc + padding.left, cy: yloc + padding.top});

              xcross.attr("path", 
				"M " + (padding.left + xloc) + " " + padding.top + 
				"L " + (padding.left + xloc) + " " + (padding.top + plot_height)
			);
				
              ycross.attr("path", 
				"M " + padding.left + " " + (padding.top + yloc) + 
				"L " + (padding.left + plot_width) + " " + (padding.top + yloc)
			);

          };
          
          
          $(curve_boundary.node).hover(function () {
              if (!point_has_been_dropped) {
                  point.show();
                  set_tracking_mode_on();

                  $(document).bind("mousemove.initial-point-selection", function (e) {
                      move_point(e.clientX);                         
                  });
              }
          }, function () {
              if (!point_is_being_dragged) {
                  if (!point_has_been_dropped) {
                      point.hide();
                  }
                  set_tracking_mode_off();
                  $(document).unbind("mousemove.initial-point-selection");
              }
          });
          
          
          $(curve_boundary.node).click(function (e) {
              if (!point_has_been_dropped) {
                  point_has_been_dropped = true;
                  point.toFront();
                  set_tracking_mode_off();
                  $(document).unbind("mousemove.initial-point-selection");
                  
                  var locs_and_vals = get_xy(e.clientX);
                  point_val = {
                      x: locs_and_vals.xval,
                      y: locs_and_vals.yval
                  };
              }
          });
          
          
          $(point.node).hover(function () {
              if (point_has_been_dropped && !point_is_being_dragged) {
                 set_tracking_mode_on();
              } 
          }, function () {
              if (point_has_been_dropped && !point_is_being_dragged) {
                  set_tracking_mode_off();
              }
          });
          
          
          $(point.node).mousedown(function () {
              if (point_has_been_dropped) {
                  point_is_being_dragged = true;
                  set_tracking_mode_on();
                  $(document).bind("mousemove.point-dragging", function (e) {
                      move_point(e.clientX);
                  });
              }
              return false;
          });
          
          $(document).mouseup(function (e) {
              if (point_is_being_dragged) {
                  point_is_being_dragged = false;
                  set_tracking_mode_off();
                  $(document).unbind("mousemove.point-dragging");
                  
                  var locs_and_vals = get_xy(e.clientX);
                  point_val = {
                      x: locs_and_vals.xval,
                      y: locs_and_vals.yval
                  };
              }
          });

          // make sure the curve_boundary is in front, otherwise spurious mouseleave events will be generated.
          curve_boundary.toFront();
      };

      
      var plot_f = function () {                
          var f_as_string = "f = function (x) { return (" + series[0].equation + "); }";
          eval(f_as_string);
      
          $container.empty();
          point_val = undefined;
          plot();
      };
                
      plot_f();
  };
  
  return setupGraph;
})();
