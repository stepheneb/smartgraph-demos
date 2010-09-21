/* >>>>>>>>>> BEGIN bundle_info.js */
        ;(function() {
          var target_name = 'sproutcore/ace' ;
          if (!SC.BUNDLE_INFO) throw "SC.BUNDLE_INFO is not defined!" ;
          if (SC.BUNDLE_INFO[target_name]) return ; 

          SC.BUNDLE_INFO[target_name] = {
            requires: ['sproutcore/empty_theme'],
            styles:   ['/static/sproutcore/ace/en/71fef724301b04e00df8643ac18a190f56ab68a0/stylesheet-packed.css','/static/sproutcore/ace/en/71fef724301b04e00df8643ac18a190f56ab68a0/stylesheet.css'],
            scripts:  ['/static/sproutcore/ace/en/71fef724301b04e00df8643ac18a190f56ab68a0/javascript-packed.js','/static/sproutcore/ace/en/71fef724301b04e00df8643ac18a190f56ab68a0/javascript.js']
          }
        })();

/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   RaphaelDemo
// Copyright: ©2010 Richard Klancer
// ==========================================================================
/*globals RaphaelDemo */

/** @namespace

  A demo app for the RaphaelViews framework.
  
  @extends SC.Object
*/
RaphaelDemo = SC.Application.create(
  /** @scope RaphaelDemo.prototype */ {

  NAMESPACE: 'RaphaelDemo',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures)
  
  // TODO: Add global constants or singleton objects needed by your app here.

}) ;

/* >>>>>>>>>> BEGIN source/controllers/data_series.js */
// ==========================================================================
// Project:   RaphaelDemo.dataSeriesController
// Copyright: ©2010 Richard Klancer
// ==========================================================================
/*globals RaphaelDemo */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
RaphaelDemo.DataSeriesController = SC.ArrayController.extend(
/** @scope RaphaelDemo.dataSeriesController.prototype */ {

  series: null,
  contentWhenConnected: null,
  isConnected: YES,
  
  disconnect: function () {
    this.set('isConnected', NO);
  },
  
  reconnect: function () {
    this.set('isConnected', YES);
  },
  
  content: function () {
    if (this.get('isConnected')) {
      return this.get('contentWhenConnected');
    }
    else {
      return [];
    }
  }.property('contentWhenConnected', 'isConnected').cacheable(),
  
  addRandomPoint: function () {
    var x = Math.random() * 320;
    var y = Math.random() * 200;
    var point = RaphaelDemo.store.createRecord(RaphaelDemo.DataPoint, {
      x: x, 
      y: y, 
      guid: RaphaelDemo.DataPoint.nextGuid++
    });
    
    point.set('series', this.get('series'));
  },
  
  addManyPoints: function (n) {
    var controller = this;

    var addPointWithTimeout = function () {
      if (n > 0) {
        n--;
        SC.RunLoop.begin();
        controller.addRandomPoint();
        controller.incrementProperty('nAdded');
        SC.RunLoop.end();
        setTimeout(addPointWithTimeout, 1);
      }
      else {
        controller.timingStop();
        SC.RunLoop.begin();
        controller.didAddManyPoints();
        SC.RunLoop.end();
      }
    };

    this.set('nAdded' , 0);
    this.willAddManyPoints();
    SC.RunLoop.end();

    this.timingStart();
    addPointWithTimeout();
  },
  
  startTime: null,
  endTime: null,
  nAdded: null,
  
  timingStart: function () {
    this.set('startTime', new Date());
  },
  
  timingStop: function () {
    this.set('endTime', new Date());
  },
  
  totalTime: function () {
    return this.get('endTime') - this.get('startTime');
  }.property('endTime').cacheable(),
  
  add100Points: function () {
    this.addManyPoints(100);
  },
  
  add20Points: function () {
    this.addManyPoints(20);
  },
  
  willAddManyPoints: function () {
  },
  
  didAddManyPoints: function () {
  }

}) ;

/* >>>>>>>>>> BEGIN source/controllers/fast_path.js */
// ==========================================================================
// Project:   RaphaelDemo.fastPathController
// Copyright: ©2010 Richard Klancer
// ==========================================================================
/*globals RaphaelDemo */

/** @class

  (Document Your Controller Here)

  @extends RaphaelDemo.DataSeriesController
*/
sc_require('controllers/data_series');

RaphaelDemo.fastPathController = RaphaelDemo.DataSeriesController.create(
/** @scope RaphaelDemo.fastPathController.prototype */ {
  
  willAddManyPoints: function (n) {
    RaphaelDemo.noFastPathController.disconnect();
  },
  
  didAddManyPoints: function () {
    RaphaelDemo.noFastPathController.reconnect();
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/controllers/no_fast_path.js */
// ==========================================================================
// Project:   RaphaelDemo.noFastPathController
// Copyright: ©2010 Richard Klancer
// ==========================================================================
/*globals RaphaelDemo */

/** @class

  (Document Your Controller Here)

  @extends RaphaelDemo.DataSeriesController
*/
sc_require('controllers/data_series');

RaphaelDemo.noFastPathController = RaphaelDemo.DataSeriesController.create(
/** @scope RaphaelDemo.fastPathController.prototype */ {
  
  willAddManyPoints: function (n) {
    RaphaelDemo.fastPathController.disconnect();
  },
  
  didAddManyPoints: function () {
    RaphaelDemo.fastPathController.reconnect();
  }
  
}) ;


/* >>>>>>>>>> BEGIN source/models/data_point.js */
// ==========================================================================
// Project:   RaphaelDemo.DataPoint
// Copyright: ©2010 Richard Klancer
// ==========================================================================
/*globals RaphaelDemo */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
RaphaelDemo.DataPoint = SC.Record.extend(
/** @scope RaphaelDemo.DataPoint.prototype */ {

  x: SC.Record.attr(Number),
  y: SC.Record.attr(Number),
  series: SC.Record.toOne('RaphaelDemo.DataSeries', { inverse: 'points' } )
  
}) ;

/* >>>>>>>>>> BEGIN source/fixtures/data_point.js */
// ==========================================================================
// Project:   RaphaelDemo.DataPoint Fixtures
// Copyright: ©2010 Richard Klancer
// ==========================================================================
/*globals RaphaelDemo */

sc_require('models/data_point');

RaphaelDemo.DataPoint.FIXTURES = [];

RaphaelDemo.DataPoint.nextGuid = 1;
/* >>>>>>>>>> BEGIN source/models/data_series.js */
// ==========================================================================
// Project:   RaphaelDemo.DataSeries
// Copyright: ©2010 Richard Klancer
// ==========================================================================
/*globals RaphaelDemo */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
RaphaelDemo.DataSeries = SC.Record.extend(
/** @scope RaphaelDemo.DataSeries.prototype */ {
  
  points: SC.Record.toMany('RaphaelDemo.DataPoint', { inverse: 'series' } )

}) ;

/* >>>>>>>>>> BEGIN source/fixtures/data_series.js */
// ==========================================================================
// Project:   RaphaelDemo.DataSeries Fixtures
// Copyright: ©2010 Richard Klancer
// ==========================================================================
/*globals RaphaelDemo */

sc_require('models/data_series');

RaphaelDemo.DataSeries.FIXTURES = [

  { guid: 'fast-path', points: [] },
  { guid: 'no-fast-path', points: [] }

];

/* >>>>>>>>>> BEGIN source/views/data_point.js */
// ==========================================================================
// Project:   RaphaelDemo.DataPointView
// Copyright: ©2010 Richard Klancer
// ==========================================================================
/*globals RaphaelDemo RaphaelViews*/

/** @class

  (Document Your View Here)

  @extends SC.View
*/
RaphaelDemo.DataPointView = RaphaelViews.RaphaelView.extend(
/** @scope RaphaelDemo.DataPointView.prototype */ {

  displayProperties: 'content.x content.y isEnabled isSelected fill stroke radius'.w(),
  
  fill: '#cccccc',
  stroke: '#cccccc',
  noHoverRadius: 3,
  hoverRadius: 5,
  isHovered: NO,
  isSelected: NO,
  isEnabled: YES,
  selectedFill: '#0000aa',
  selectedStroke: '#0000aa',
  layerIsCacheable: YES,
  isPoolable: YES,
  
  radius: function () {
    return (this.get('isHovered') ? this.get('hoverRadius') : this.get('noHoverRadius'));
  }.property('isHovered', 'hoverRadius', 'noHoverRadius').cacheable(),
  
  mouseEntered: function () {
    this.set('isHovered', YES);
  },
  
  mouseExited: function () {
    this.set('isHovered', NO);
  },
  
  renderCallback: function (raphaelCanvas, x, y, radius, fill, stroke) {
    return raphaelCanvas.circle(x, y, radius).attr({ fill: fill, stroke: stroke });
  },
  
  render: function (context, firstTime) {

    var isSelected = this.get('isSelected');
    var fill = isSelected ?  this.get('selectedFill') : this.get('fill');
    var stroke = isSelected ? this.get('selectedStroke') : this.get('stroke');
    
    if (firstTime) {
      context.callback(this, this.renderCallback, this.getPath('content.x') || 0, this.getPath('content.y') || 0, 
        this.get('radius'), fill, stroke);
    }
    else {
      var circle = context.raphael();
      circle.attr({ cx: this.getPath('content.x') || 0, cy: this.getPath('content.y') || 0, radius: this.get('radius'), 
        fill: fill, stroke: stroke });
    }
  }
    
});

/* >>>>>>>>>> BEGIN source/views/rect.js */
// ==========================================================================
// Project:   RaphaelDemo.RectView
// Copyright: ©2010 Richard Klancer
// ==========================================================================
/*globals RaphaelDemo RaphaelViews */

/** @class

  (Document Your View Here)

  @extends RaphaelViews.RaphaelView
*/
RaphaelDemo.RectView = RaphaelViews.RaphaelView.extend(
/** @scope RaphaelDemo.RectView.prototype */ {

  displayProperties: 'x y width height fill stroke'.w(),
  
  renderCallback: function (raphaelCanvas, x, y, width, height, fill, stroke) {
    return raphaelCanvas.rect(x, y, width, height).attr({ fill: fill, stroke: stroke });
  },
  
  render: function (context, firstTime) {
    // note context should always be a RaphaelContext
    
    if (firstTime) {
      context.callback(this, this.renderCallback, this.get('x'), this.get('y'), this.get('width'), 
        this.get('height'), this.get('fill'), this.get('stroke'));
      this.renderChildViews(context, firstTime);      // don't forget to render child views
    }
    else {
      var rect = context.raphael();
      rect.attr({ x: this.get('x'), y: this.get('y'), width: this.get('width'), height: this.get('height'), 
        fill: this.get('fill'), stroke: this.get('stroke') });
    }
  }

});

/* >>>>>>>>>> BEGIN source/views/scatter_test.js */
// ==========================================================================
// Project:   RaphaelDemo.ScatterTestView
// Copyright: ©2010 Richard Klancer
// ==========================================================================
/*globals RaphaelDemo RaphaelViews*/

/** @class

  (Document Your View Here)

  @extends SC.View
*/
RaphaelDemo.ScatterTestView = SC.View.extend(
/** @scope RaphaelDemo.ScatterTestView.prototype */ {

});

/* >>>>>>>>>> BEGIN source/resources/main_page.js */
// ==========================================================================
// Project:   RaphaelDemo - mainPage
// Copyright: ©2010 Richard Klancer
// ==========================================================================
/*globals RaphaelDemo RaphaelViews */

// This page describes the main user interface for your application.  
RaphaelDemo.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'fastPathView noFastPathView'.w(), 
    
    fastPathView: SC.View.design({
      layout: { centerX: 0, centerY: -140, left: 0, right: 0, height: 280 },
      
      childViews: 'labelView drawingView addPairButton timingView'.w(),
      
      labelView: SC.LabelView.design({
        layout: { centerX: 0, top: 20, left: 20, right: 20, height: 42 },
        classNames: 'view-label'.w(),
        value: "Using fast RaphaelCollectionView (the new way):"
      }),

      drawingView: RaphaelViews.RaphaelCanvasView.design({
        layout: { centerX: -100, centerY: 40, width: 320, height: 200 },

        childViews: 'rectView'.w(),

        rectView: RaphaelDemo.RectView.design({
          x: 0,
          y: 0,
          width: 320,
          height: 200,
          fill: '#aa0000',
          stroke: '#aa0000',

          childViews: 'fastPathScatterView '.w(),

          fastPathScatterView: RaphaelViews.RaphaelCollectionView.design({
            exampleView: RaphaelDemo.DataPointView,
            contentBinding: 'RaphaelDemo.fastPathController',
            useFastPath: YES
          })
        })
      }),

      addPairButton: SC.ButtonView.design({
        layout: { centerX: 175, centerY: 15, width: 150, height: 28 },
        title: "Add 20 Points",
        target: RaphaelDemo.fastPathController,
        action: 'add20Points'
      }),

      timingView: SC.LabelView.design({
        layout: { centerX: 250, centerY: 65, width: 300, height: 28 },
        totalTimeBinding: 'RaphaelDemo.fastPathController.totalTime',
        classNames: 'timing-label',

        value: function () {
          return Math.round(this.get('totalTime') / 20) + ' ms per point';
        }.property('totalTime').cacheable()
      })
    }),
    
    // TODO remove duplicate code below; using the composite view pattern here requires overriding createChildViews
    // rather than just passing hashes (b/c binding paths and useFastPath have to be known at view init time)
    
    noFastPathView: SC.View.design({
      layout: { centerX: 0, centerY: 140, left: 0, right: 0, height: 280 },
      
      childViews: 'labelView drawingView addPairButton timingView'.w(),
      
      labelView: SC.LabelView.design({
        layout: { centerX: 0, top: 20, left: 20, right: 20, height: 42 },
        classNames: 'view-label'.w(),
        value: "Complete redraw after every new point (the old way):"
      }),

      drawingView: RaphaelViews.RaphaelCanvasView.design({
        layout: { centerX: -100, centerY: 40, width: 320, height: 200 },

        childViews: 'rectView'.w(),

        rectView: RaphaelDemo.RectView.design({
          x: 0,
          y: 0,
          width: 320,
          height: 200,
          fill: '#aa0000',
          stroke: '#aa0000',

          childViews: 'noFastPathScatterView '.w(),

          noFastPathScatterView: RaphaelViews.RaphaelCollectionView.design({
            exampleView: RaphaelDemo.DataPointView,
            contentBinding: 'RaphaelDemo.noFastPathController',
            useFastPath: NO            
          })
        })
      }),

      addPairButton: SC.ButtonView.design({
        layout: { centerX: 175, centerY: 15, width: 150, height: 28 },
        title: "Add 20 Points",
        target: RaphaelDemo.noFastPathController,
        action: 'add20Points'
      }),

      timingView: SC.LabelView.design({
        layout: { centerX: 250, centerY: 65, width: 300, height: 28 },
        totalTimeBinding: 'RaphaelDemo.noFastPathController.totalTime',
        classNames: 'timing-label',

        value: function () {
          return Math.round(this.get('totalTime') / 20) + ' ms per point';
        }.property('totalTime').cacheable()
      })
    })
    
  })
});

/* >>>>>>>>>> BEGIN source/main.js */
// ==========================================================================
// Project:   RaphaelDemo
// Copyright: ©2010 Richard Klancer
// ==========================================================================
/*globals RaphaelDemo */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
RaphaelDemo.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  RaphaelDemo.getPath('mainPage.mainPane').append() ;

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!
  
  var fastPathSeries = RaphaelDemo.store.find(RaphaelDemo.DataSeries, 'fast-path');
  RaphaelDemo.FAST_PATH_QUERY = SC.Query.local(RaphaelDemo.DataPoint, { 
    conditions: 'series = {series}',
    series: fastPathSeries,
    orderBy: 'id'
  });
  RaphaelDemo.fastPathController.set('contentWhenConnected', RaphaelDemo.store.find(RaphaelDemo.FAST_PATH_QUERY));
  RaphaelDemo.fastPathController.set('series', fastPathSeries);

  var noFastPathSeries = RaphaelDemo.store.find(RaphaelDemo.DataSeries, 'no-fast-path');
  RaphaelDemo.NO_FAST_PATH_QUERY = SC.Query.local(RaphaelDemo.DataPoint, { 
    conditions: 'series = {series}',
    series: noFastPathSeries,
    orderBy: 'id'
  });
  RaphaelDemo.noFastPathController.set('contentWhenConnected', RaphaelDemo.store.find(RaphaelDemo.NO_FAST_PATH_QUERY));
  RaphaelDemo.noFastPathController.set('series', noFastPathSeries);
} ;

function main() { RaphaelDemo.main(); }

