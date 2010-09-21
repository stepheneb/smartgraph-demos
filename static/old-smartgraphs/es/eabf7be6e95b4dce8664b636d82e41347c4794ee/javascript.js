/* >>>>>>>>>> BEGIN bundle_info.js */
        ;(function() {
          var target_name = 'sproutcore/standard_theme' ;
          if (!SC.BUNDLE_INFO) throw "SC.BUNDLE_INFO is not defined!" ;
          if (SC.BUNDLE_INFO[target_name]) return ; 

          SC.BUNDLE_INFO[target_name] = {
            requires: ['sproutcore/empty_theme'],
            styles:   ['/static/sproutcore/standard_theme/es/eac7eda4ca53c2191a6875e712ff9f5111a58676/stylesheet-packed.css','/static/sproutcore/standard_theme/es/eac7eda4ca53c2191a6875e712ff9f5111a58676/stylesheet.css'],
            scripts:  ['/static/sproutcore/standard_theme/es/eac7eda4ca53c2191a6875e712ff9f5111a58676/javascript-packed.js']
          }
        })();

/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
Smartgraphs = SC.Application.create(
  /** @scope Smartgraphs.prototype */ {

  NAMESPACE: 'Smartgraphs',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures)
  
  // TODO: Add global constants or singleton objects needed by your app here.

});

/* >>>>>>>>>> BEGIN source/models/dialog_turn.js */
// ==========================================================================
// Project:   Smartgraphs.DialogTurn
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.DialogTurn = SC.Record.extend(
/** @scope Smartgraphs.DialogTurn.prototype */ {

  // text to diplay *before* the question prompt
  beforeText: SC.Record.attr(String),                                           
  
  responseTemplate: SC.Record.toOne('Smartgraphs.ResponseTemplate'),

  // a DialogTurn with a ResponseTemplate but no ResponseVerifier should be considered 'open response'
  responseVerifier: SC.Record.toOne('Smartgraphs.ResponseVerifier'),
  
  // e.g., instructions to highlight portions of the graph. *static* annotations do not require 'play again' buttons.
  staticAnnotations: SC.Record.toMany('Smartgraphs.StaticAnnotation'),   
  
  // text to display *after* the question prompt, before the buttons
  afterText: SC.Record.attr(String),      
  
  nextTurnButtonTitle: SC.Record.attr(String),
  
  // the next DialogTurn to go to if the response is 'nominal' -- if the response was correct, or if the response
  // is not to be checked and the "ok" button was hit
  nextTurnForNominalResponse: SC.Record.toOne('Smartgraphs.DialogTurn'),
  
  nextTurnForIncorrectResponse: SC.Record.toOne('Smartgraphs.DialogTurn'),
  
  // if YES, dialog is over when we hit this DialogTurn -- allow user to go to next page
  isLastTurn: SC.Record.attr(Boolean),
  
  // if YES and isLastTurn is YES, immediately go to the next page on reaching this dialog turn.
  // (the text of this dialog turn will be visible if the user hits 'back', however!)
  
  shouldAutoAdvance: SC.Record.attr(Boolean),

  wasVisited: NO,             // transient; is set to YES after we switch to new turn
  // student responses, if any...
  responseArray: null

}) ;

/* >>>>>>>>>> BEGIN source/models/guide_page.js */
// ==========================================================================
// Project:   Smartgraphs.GuidePage
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.GuidePage = SC.Record.extend(
/** @scope Smartgraphs.GuidePage.prototype */ {

  sequence: SC.Record.toOne('Smartgraphs.GuidePageSequence', {
    inverse: 'pages'   // gPages?
  }),

  index: SC.Record.attr(Number),
  
  title: SC.Record.attr(String),
  
  introText: SC.Record.attr(String),

  firstDialogTurn: SC.Record.toOne('Smartgraphs.DialogTurn'),

  dataSeries: SC.Record.toOne('Smartgraphs.DataSeries'),

  axes: SC.Record.toOne('Smartgraphs.Axes'),
  
  sensorAppletShouldBeEnabled: SC.Record.attr(Boolean),
  
  // nextStep: SC.Record.toOne('Smartgraphs.GuidePage')
  
  // *** transient properties not saved to db
  
  // keep track of the dialog turn user last saw on the current page
  selectedDialogTurn: null,

  // the 'isSelectable' property is set to YES for:
  //   * the *first* page
  //   * the *next* page once the current dialog has marked the page finished
  //   * any page you've previously visited
  
  isSelectable: NO,
  
  // a hack put in for the Randolph test to show imageView on first page only
  shouldShowImage: SC.Record.attr(Boolean)
}) ;

/* >>>>>>>>>> BEGIN source/controllers/authoring.js */
// ==========================================================================
// Project:   Smartgraphs.authoringController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class
 Controls authoring mode and business logic
 @extends SC.Object
 */
sc_require('models/dialog_turn');
sc_require('models/guide_page');

Smartgraphs.authoringController = SC.ObjectController.create(
/** @scope Smartgraphs.authoringController.prototype */
{
  isAuthoring: NO,
  
  toggleAuthoring: function(){
    this.set('isAuthoring', !this.get('isAuthoring'));
  }
  
});

/* >>>>>>>>>> BEGIN source/controllers/axes.js */
// ==========================================================================
// Project:   Smartgraphs.axesController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.axesController = SC.ObjectController.create(
/** @scope Smartgraphs.axesController.prototype */ {
  padding: { top: 20, right: 20, bottom: 40, left: 60 },
  
  contentBinding: SC.Binding.oneWay('Smartgraphs.guidePageController.axes')
}) ;

/* >>>>>>>>>> BEGIN source/controllers/data_series.js */
// ==========================================================================
// Project:   Smartgraphs.dataSeriesController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

Smartgraphs.dataSeriesController = SC.ArrayController.create(
/** @scope Smartgraphs.dataSeriesController.prototype */ {

  seriesBinding: SC.Binding.oneWay('Smartgraphs.guidePageController.dataSeries'),
  
  content: function () {
    var series = this.get('series');
    var query = SC.Query.local(Smartgraphs.DataPoint, {conditions: 'series = {series}', series: series, orderBy: 'x'} );
    return Smartgraphs.store.find(query);
  }.property('series').cacheable(),
  
  addDataPoint: function (x, y) {
    var newPoint = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, {x: x, y: y});
    newPoint.set('series', this.get('series'));
    return newPoint;
  },
  
  allowsMultipleSelection: NO
}) ;

/* >>>>>>>>>> BEGIN source/controllers/dialog_turn.js */
// ==========================================================================
// Project:   Smartgraphs.dialogTurnController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.dialogTurnController = SC.ObjectController.create(
/** @scope Smartgraphs.dialogTurnController.prototype */ {
  
  contentBinding: 'Smartgraphs.guidePageController.selectedDialogTurn',
  _oldContent: null,
  
  contentDidChange: function () {
    var content = this.get('content');

    // update previous dialogTurn's wasVisited 
    if (this._oldContent !== this.get('content')) {
      if (this._oldContent) {
        this._oldContent.set('wasVisited', YES);
      }
    }
    this._oldContent = content;
    this.invokeOnce(this._updateForChangedContent);
  }.observes('content'),
  
  _updateForChangedContent: function () {
    var responseTemplate = this.getPath('responseTemplate');
    var newArray = [];
    
    if (responseTemplate && !this.get('responseArray')) {
      newArray.length = responseTemplate.get('numberOfResponseFields');
      this.set('responseArray', newArray);
    }
    
    if (this.get('isLastTurn')) {
      Smartgraphs.guidePageSequenceController.set('nextPageIsSelectable', YES);
      // autoadvance if turn says to and we're not currently *re*visiting the turn (i.e., wasVisited = NO)
      if (this.get('shouldAutoAdvance') && !this.get('wasVisited')) {
        Smartgraphs.guidePageSequenceController.invokeLast('selectNextPage');
      }
    }
  },

  // an unknown number of fields will be generated, so instead of creating a dynamically expanding and contracting list
  // of properties which can be bound, we'll accept a simple 'updateResponse' message from the field with index 'index'
  
  updateResponse: function (index, value) {
    var responseArray = this.get('responseArray');
    if (responseArray) {
      responseArray.replace(index, 1, [value]);
    }
  },

  gotoNextTurn: function () {
    if (Smartgraphs.responseVerifierController.get('verificationIsRequired')) {
      Smartgraphs.responseVerifierController.checkResponse();
    }
    else {
      // just go to the next turn
      var nextTurn = this.get('nextTurnForNominalResponse');
      Smartgraphs.guidePageController.set('selectedDialogTurn', nextTurn);      
    }
  },
  
  didReceiveCorrectResponse: function () {
    //console.log('didReceiveCorrectResponse');
    var nextTurn = this.get('nextTurnForNominalResponse');
    Smartgraphs.guidePageController.set('selectedDialogTurn', nextTurn);
  },
  
  didReceiveIncorrectResponse: function () {
    //console.log('didReceiveIncorrectResponse');
    var nextTurn = this.get('nextTurnForIncorrectResponse');
    Smartgraphs.guidePageController.set('selectedDialogTurn', nextTurn);
  },
  
  didReceiveIncompleteResponse: function () {
    //console.log('didReceiveIncompleteResponse');
  },
  
  didReceiveMalformedResponse: function () {
    //console.log('didReceiveMalformedResponse');
  },
  
  // TODO: let content dictate what buttons are available (including 'ok', 'show me again', 'i dont know'...)
  

  // return a default value for the nextTurnButtonTitle unless it's explictly specified in the model
  defaultNextTurnButtonTitle: "Check My Answer",
  
  rawNextTurnButtonTitleBinding: SC.Binding.oneWay('*content.nextTurnButtonTitle'),
  nextTurnButtonTitle: function () {
    var rawTitle = this.get('rawNextTurnButtonTitle');
    return rawTitle ? rawTitle : this.get('defaultNextTurnButtonTitle');
  }.property('rawNextTurnButtonTitle').cacheable(),


  // NOTE this pattern!
  // first define the property 'nextTurnButtonShouldBeVisible' on the controller, so it doesn't pass through to the proxied content
  // then define a binding that will update the property on the controller.
  // (without it, you'll have two model objects attempting to share the same SC.Binding object)
    
  nextTurnButtonShouldBeVisible: null,
  nextTurnButtonShouldBeVisibleBinding: SC.Binding.not('.isLastTurn').oneWay(),
  
  verificationIsNotRequired: null,
  verificationIsNotRequiredBinding: SC.Binding.not('Smartgraphs.responseVerifierController.verificationIsRequired').oneWay(),
  
  // Weird binding issue: can't use relative path syntax ('.verificationIsNotRequired') in the or transform below.

  nextTurnButtonShouldBeEnabled: null,
  nextTurnButtonShouldBeEnabledBinding: SC.Binding.or(
    'Smartgraphs.dialogTurnController.verificationIsNotRequired', 
    'Smartgraphs.responseVerifierController.responseIsReady'),
  
  
  // just pass this through from the GuidePage model for now.
  sensorAppletShouldBeEnabled: null,
  sensorAppletShouldBeEnabledBinding: SC.Binding.oneWay('Smartgraphs.guidePageController.sensorAppletShouldBeEnabled')
}) ;

/* >>>>>>>>>> BEGIN source/controllers/guide_page.js */
// ==========================================================================
// Project:   Smartgraphs.guidePageController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class
 (Document Your Controller Here)
 @extends SC.ObjectController
 */
sc_require('models/guide_page');

Smartgraphs.guidePageController = SC.ObjectController.create(
/** @scope Smartgraphs.guidePageController.prototype */
{
  contentBinding: 'Smartgraphs.guidePageSequenceController.selectedPage',
  
  contentDidChange: function() {
    //console.log('Smartgraphs.guidePageController observed content');
    this.invokeOnce(this._setDialogTurn);
  }.observes('content'),
  
  _setDialogTurn: function () {
    //console.log('_setDialogTurn');
    // display the first 'line' of dialog if user hasn't been to this page before; 
    // otherwise, leave dialog state at whatever state user saw last time they were on this page

    if (SC.none(this.get('selectedDialogTurn'))) {
      this.set('selectedDialogTurn', this.get('firstDialogTurn'));
    }
  }

});

/* >>>>>>>>>> BEGIN source/controllers/guide_page_sequence.js */

// ==========================================================================
// Project:   Smartgraphs.guidePageSequenceController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.guidePageSequenceController = SC.ArrayController.create(
/** @scope Smartgraphs.guidePageSequenceController.prototype */ {

  allowsEmptySelection: NO,
  allowsMultipleSelection: NO,

   // override selectObject to allow self-bindings in guidePageSequenceController to sync...

  selectObject: function (value) {
    SC.RunLoop.begin();
    arguments.callee.base.apply(this,arguments);
    SC.RunLoop.end();
  },

  sequenceDidChange: function () {
    //console.log('Smartgraphs.guidePageSequenceController observed sequence');
    
    var sequence = this.get('sequence');
    var pages = sequence.get('pages');
    this.set('content', pages);

    var firstPage = pages.objectAt(0);
    if (firstPage) {
      firstPage.set('isSelectable', true);
      this.set('selectedPage', firstPage);
    }
  }.observes('sequence'),

  selectedPage: function (key, value) {
    if (value !== undefined && value.get('isSelectable')) {
      this.selectObject(value);
    }
    return this.get('selection').toArray().objectAt(0);
  }.property('selection'),

  indexOfSelectedPage : function () {
    var selection = this.get('selection');
    var indexSet = selection.indexSetForSource(this);
    var index = indexSet ? indexSet.toArray().objectAt(0) : undefined;

    return index;
  }.property('selectedPage', 'content', '[]').cacheable(),

  previousPage: function () {
    var index = this.get('indexOfSelectedPage');

    return (index > 0) ? this.objectAt(index-1) : null;
  }.property('selectedPage', 'content', '[]').cacheable(),

  nextPage: function () {
    var index = this.get('indexOfSelectedPage');

    return (index + 1 < this.get('length')) ? this.objectAt(index+1) : null;
  }.property('selectedPage', 'content', '[]').cacheable(),

  isFirstPage: null,
  isFirstPageBinding: SC.Binding.bool('.previousPage').not(),
  
  isLastPage: null,
  isLastPageBinding: SC.Binding.bool('.nextPage').not(),

  canSelectPreviousPage: null,
  canSelectPreviousPageBinding: SC.Binding.not('.isFirstPage'),

  nextPageIsSelectable: null,
  nextPageIsSelectableBinding: '*nextPage.isSelectable',

  canSelectNextPage: function () {
    return (!this.get('isLastPage') && this.get('nextPageIsSelectable'));
  }.property('isLastPage', 'nextPageIsSelectable').cacheable(),

  selectPreviousPage: function () {
    if (this.get('canSelectPreviousPage')) {
      this.selectObject( this.get('previousPage') );
    }
  },

  selectNextPage: function () {
    if (this.get('canSelectNextPage')) {
      this.selectObject( this.get('nextPage') );
    }
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/controllers/response_template.js */
// ==========================================================================
// Project:   Smartgraphs.responseTemplateController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

Smartgraphs.responseTemplateController = SC.ObjectController.create(
/** @scope Smartgraphs.responseTemplateController.prototype */ {
  
  contentBinding: 'Smartgraphs.dialogTurnController.responseTemplate'

}) ;

/* >>>>>>>>>> BEGIN source/controllers/response_verifier.js */
// ==========================================================================
// Project:   Smartgraphs.responseVerifierController
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.responseVerifierController = SC.ObjectController.create( 
/** @scope Smartgraphs.responseVerifierController.prototype */ {

  contentBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.responseVerifier'),
  
  verificationIsRequired: null,
  verificationIsRequiredBinding: SC.Binding.bool('.content'),
  
  contentDidChange: function () {
    var content = this.get('content');
    //console.log('Smartgraphs.responseVerifierController observed content');

    if (!content) {
      // nothing to do
      return;
    }
    
    this.invokeOnce(this._setVerifierDelegate);
  }.observes('content'),

  _setVerifierDelegate: function () {
    var delegatePath = 'Smartgraphs.' + this.get('verifierDelegateName') + 'VerifierDelegate';
    var delegate = SC.objectForPropertyPath(delegatePath);
    delegate.set('configString', this.get('configString'));
    this.set('verifierDelegate', delegate);
  },

  responseIsReady: null,
  responseIsReadyBinding: SC.Binding.bool('*verifierDelegate.responseIsReady'),

  checkResponse: function () {
    var delegate = this.get('verifierDelegate');
    delegate.checkResponse();
    
    var isIncomplete = delegate.get('responseIsIncomplete');
    var isMalformed = delegate.get('responseIsMalformed');
    var isCorrect = delegate.get('responseIsCorrect');
    
    if (isIncomplete) {
      Smartgraphs.dialogTurnController.didReceiveIncompleteResponse();
      return;
    }
    
    if (isMalformed) {
      Smartgraphs.dialogTurnController.didReceiveMalformedResponse();
      return;
    }
    
    this.set('responseAsString', delegate.get('responseAsString'));
    
    if (isCorrect) {
      Smartgraphs.dialogTurnController.didReceiveCorrectResponse();        
    }
    else {
      Smartgraphs.dialogTurnController.didReceiveIncorrectResponse();
    }
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/controllers/static_annotations.js */
// ==========================================================================
// Project:   Smartgraphs.staticAnnotationsController
// Copyright: ©2010 Concord Consortium, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.staticAnnotationsController = SC.ArrayController.create(
/** @scope Smartgraphs.staticAnnotationsController.prototype */ {
  
  // could turn thisn into a RecordArray from a query instead of a ManyArray which has trouble updating

  contentBinding: 'Smartgraphs.dialogTurnController.staticAnnotations'

}) ;

/* >>>>>>>>>> BEGIN source/models/axes.js */
// ==========================================================================
// Project:   Smartgraphs.Axes
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Axes = SC.Record.extend(
/** @scope Smartgraphs.Axes.prototype */ {
  
  xMax: SC.Record.attr(Number),
  xMin: SC.Record.attr(Number),
  yMax: SC.Record.attr(Number),
  yMin: SC.Record.attr(Number),
  ySteps: SC.Record.attr(Number),
  xSteps: SC.Record.attr(Number),
  xLabel: SC.Record.attr(String),
  yLabel: SC.Record.attr(String),
  xLabelAbbreviated: SC.Record.attr(String),  
  yLabelAbbreviated: SC.Record.attr(String)
}) ;

/* >>>>>>>>>> BEGIN source/fixtures-prod/axes.js */
// ==========================================================================
// Project:   Smartgraphs.Axes Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/axes');

Smartgraphs.Axes.FIXTURES = [


  { guid: 'axes-sensor',        // TODO: modify these values

    xMin: 0,
    xMax: 60,
    xSteps: 6,
    xLabel: 'Time (seconds)',
    xLabelAbbreviated: 'Time (s)',

    yMin: 0,
    yMax: 5,
    ySteps: 10,
    yLabel: 'Position (meters)',
    yLabelAbbreviated: 'Position (m)'
  },

  { guid: 'axes-maria',
  
    xMin: 0,
    xMax: 10,
    xSteps: 10,
    xLabel: 'Time (minutes)',
    xLabelAbbreviated: 'Time (min)',
    
    yMin: 0,
    yMax: 2000,
    ySteps: 10,
    yLabel: 'Position (meters)',
    yLabelAbbreviated: 'Position (m)'
  }

];

/* >>>>>>>>>> BEGIN source/models/data_point.js */
// ==========================================================================
// Project:   Smartgraphs.DataPoint
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.DataPoint = SC.Record.extend(
/** @scope Smartgraphs.DataPoint.prototype */ {
  series: SC.Record.toOne('Smartgraphs.DataSeries', {
    inverse: 'points' }),
  x: SC.Record.attr(Number),
  y: SC.Record.attr(Number)
}) ;

/* >>>>>>>>>> BEGIN source/fixtures-prod/data_point.js */
// ==========================================================================
// Project:   Smartgraphs.DataPoint Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/data_point');

Smartgraphs.DataPoint.FIXTURES = [

  {x: 1, y: 200, guid: 1, series: 'series-maria'},
  {x: 2, y: 400, guid: 2, series: 'series-maria'},
  {x: 3, y: 600, guid: 3, series: 'series-maria'},
  {x: 4, y: 800, guid: 4, series: 'series-maria'},
  {x: 5, y: 800, guid: 5, series: 'series-maria'},
  {x: 6, y: 800, guid: 6, series: 'series-maria'},
  {x: 7, y: 1050, guid: 7, series: 'series-maria'},
  {x: 8, y: 1300, guid: 8, series: 'series-maria'},
  {x: 9, y: 1550, guid: 9, series: 'series-maria'},
  {x: 10, y: 1800, guid: 10, series: 'series-maria'}
  
];

/* >>>>>>>>>> BEGIN source/models/data_series.js */
// ==========================================================================
// Project:   Smartgraphs.DataSeries
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.DataSeries = SC.Record.extend(
/** @scope Smartgraphs.DataSeries.prototype */ {

  // TODO: Add your own code here.
  
  points: SC.Record.toMany('Smartgraphs.DataPoint', {
    inverse: 'series'})
}) ;

/* >>>>>>>>>> BEGIN source/fixtures-prod/data_series.js */
// ==========================================================================
// Project:   Smartgraphs.DataSeries Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/data_series');

Smartgraphs.Pair = SC.Object.extend({
  x: null,
  y: null
});

Smartgraphs.DataSeries.FIXTURES = [

  { guid: 'series-sensor',
    points: []
  },
  
  { guid: 'series-maria',
    points:  ['1','2','3','4','5','6','7','8','9','10']
  }
  
];

/* >>>>>>>>>> BEGIN source/fixtures-prod/dialog_turn.js */
// ==========================================================================
// Project:   Smartgraphs.DialogTurn Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/dialog_turn');

Smartgraphs.DialogTurn.FIXTURES = [

  // Page 1
  { guid: 'turn-1',
    beforeText: 
      "<p>In this activity, when you see the 'Next >>' button turned on, you can go to the next page.</p>" +
      "<p>Go ahead and click on the Next button now to see the next page.<p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnButtonTitle: null,
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES,
    shouldAutoAdvance: NO
  },


  // Page 2
  { guid: 'turn-2-start',
    beforeText: 
      '<p>How are your motions represented in the position versus time graph? ' +
      '(For example, what does the graph look like when you are standing still?)</p>',
    responseTemplate: 'template-open-1',
    responseVerifier: null,
    afterText: '',
    nextTurnButtonTitle: 'Submit My Response',
    nextTurnForNominalResponse: 'turn-2-done',
    nextTurnForIncorrectResponse: null,
    isLastTurn: NO
  },

  { guid: 'turn-2-done',
    beforeText: 
      "<p>Your answer for this question was recorded. </p> <p>Click Next >> when you are ready.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES,
    shouldAutoAdvance: YES
  },


  // Page 3
  { guid: 'turn-3-start',
    beforeText:
      '<p>How are the two different speeds represented in the position versus time graph?</p>',
    responseTemplate: 'template-open-1',
    responseVerifier: null,
    afterText: '',
    nextTurnButtonTitle: 'Submit My Response',
    nextTurnForNominalResponse: 'turn-3-done',
    nextTurnForIncorrectResponse: null,
    isLastTurn: NO
  },

  { guid: 'turn-3-done',
    beforeText:
      "<p>Your answer for this question was recorded. </p> <p>Click Next >> when you are ready.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES,
    shouldAutoAdvance: YES
  },
  
  
  // Page 4
  { guid: 'turn-4-start',
    beforeText: 
      "<p>What do you notice about the <b>steepness</b> of the three different segments during each of the motions?</p>",
    responseTemplate: 'template-open-1',
    responseVerifier: null,
    afterText: '',
    nextTurnButtonTitle: 'Submit My Response',
    nextTurnForNominalResponse: 'turn-4-done',
    nextTurnForIncorrectResponse: null,
    isLastTurn: NO
  },

  { guid: 'turn-4-done',
    beforeText: 
      "<p>Your answer for this question was recorded. </p> <p>Click Next >> when you are ready.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES,
    shouldAutoAdvance: YES
  },


  // Page 5
  { guid: 'turn-5-start',
    beforeText: 
      "<p>Click the point in the graph that shows when and where Maria might have first stopped to talk to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText: '',
    nextTurnForNominalResponse: 'turn-5-correct',
    nextTurnForIncorrectResponse: 'turn-5-hint-1',
    isLastTurn: NO
  },
  
  { guid: 'turn-5-hint-1',
    beforeText:
      "<p>Incorrect.</p>" +
      "<p><b>Hint 1</b>: Look at the graph and table and find where Maria’s position <b>stayed the same.</b></p>" +
      "<p>Try again. Click the first point in the graph that shows when and where Maria might have stopped to talk " +
      "to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText: '',
    nextTurnForNominalResponse: 'turn-5-correct',
    nextTurnForIncorrectResponse: 'turn-5-hint-2',
    isLastTurn: NO
  },
  
  { guid: 'turn-5-hint-2',
    beforeText: 
      "<p>Incorrect.</p>" +
      "<p><b>Hint 2</b>: In these two intervals, Maria’s position <b>changed</b> as time passed.</b></p>" +
      "<p>Try again. Click the first point in the graph that shows when and where Maria might have stopped to talk " +
      "to her coach.</p>",
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText: "",
    staticAnnotations: ['annotation-1', 'annotation-2'],
    nextTurnForNominalResponse: 'turn-5-correct',
    nextTurnForIncorrectResponse: 'turn-5-hint-3',
    isLastTurn: NO    
  },
  
  { guid: 'turn-5-hint-3',
    beforeText: 
      "<p><b>Hint 3</b>: In this interval, Maria’s position <b>stayed the same</b> as time passed.</b></p>" +
      "<p>Try again. Click the first point in the graph that shows when and where Maria might have stopped to talk " +
      "to her coach.</p>", 
    responseTemplate: null,
    responseVerifier: 'verifier-1',
    afterText: '',   
    staticAnnotations: ['annotation-3'],
    nextTurnForNominalResponse: 'turn-5-correct',
    nextTurnForIncorrectResponse: 'turn-5-incorrect',
    isLastTurn: NO    
  },
  
  { guid: 'turn-5-incorrect',
    beforeText:   
      "<p>If you look carefully, you’ll see that between four and six minutes, Maria’s position did not change, " +
      "meaning that she stopped at four minutes.</p>" +
      "<p>Click Next >> when you are ready.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES,
    shouldAutoAdvance: NO    
  },
  
  { guid: 'turn-5-correct',
    beforeText: 
      "<p>Correct! Four minutes into her run, Maria’s distance stayed the same compared to the next few minutes, " +
      "meaning she stopped running.</p>" +
      "<p>Click Next >> when you are ready.</p>",
    responseTemplate: null,
    responseVerifer: null,
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES,
    shouldAutoAdvance: NO  
  },
  
  
  { guid: 'turn-6-start',
    beforeText: 
      "<p>How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-2',
    afterText: '',
    nextTurnForNominalResponse: 'turn-6-correct',
    nextTurnForIncorrectResponse: 'turn-6-hint-1',
    isLastTurn: NO    
  },
  

  { guid: 'turn-6-hint-1',
    beforeText:
      "<p>Incorrect.</p>" +
      "<p><b>Hint 1</b>: Look at the data and find how many minutes passed <b>before</b> Maria stopped.</p>" +
      "<p>Try again. How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-2',
    afterText: '',
    nextTurnForNominalResponse: 'turn-6-correct',
    nextTurnForIncorrectResponse: 'turn-6-hint-2',
    isLastTurn: NO    
  },
  
  { guid: 'turn-6-hint-2',
    beforeText:
      "<p>Incorrect.</p>" +
      "<p><b>Hint 2</b>: Here is where Maria stopped. Find her position from the start of the track.</p>" +
      "<p>Try again. How many meters did Maria run before she stopped to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-2',
    afterText: '',
    staticAnnotations: ['annotation-4'],
    nextTurnForNominalResponse: 'turn-6-correct',
    nextTurnForIncorrectResponse: 'turn-6-hint-3',
    isLastTurn: NO    
  },

  { guid: 'turn-6-hint-3',
    beforeText:
      "<p>Incorrect.</p>" +    
      "<p><b>Hint 3</b>: Here is where Maria stopped. Find her position from the start of the track.</p>" +
      "<p>Try again. Find the y value (position) of this point?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-2',
    afterText: '',
    staticAnnotations: ['annotation-4', 'annotation-5'],    
    nextTurnForNominalResponse: 'turn-6-correct',
    nextTurnForIncorrectResponse: 'turn-6-incorrect',
    isLastTurn: NO    
  },
  
  { guid: 'turn-6-incorrect',
    beforeText:
      "<p>Four minutes into her run, Maria stopped. At that point, Maria was 800 meters away from the start line.</p>" +
      "<p>Click Next >> when you are ready.</p>",
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES,
    shouldAutoAdvance: NO    
  },
  
  { guid: 'turn-6-correct',
    beforeText: 
      "<p>Correct! Four minutes into her run, Maria stopped. At that point, " +
      "Maria’s was 800 meters away from the start line.</p>" +
      "<p>Click Next >> when you are ready.</p>",      
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES,
    shouldAutoAdvance: NO    
  },

  { guid: 'turn-7-start',
    beforeText:
      "<p>For how many minutes did Maria stop to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-3',
    afterText: '',
    nextTurnForNominalResponse: 'turn-7-correct',
    nextTurnForIncorrectResponse: 'turn-7-hint-1',
    isLastTurn: NO    
  },

  { guid: 'turn-7-hint-1',
    beforeText:
      "<p>Incorrect.</p>" +  
      "<p><b>Hint 1</b>: Here is the interval when Maria’s distance stayed the same.</p>" +
      "<p>Try again. For how many minutes did Maria stop to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-3',
    afterText: '',
    staticAnnotations: ['annotation-3'],
    nextTurnForNominalResponse: 'turn-7-correct',
    nextTurnForIncorrectResponse: 'turn-7-hint-2',
    isLastTurn: NO    
  },

  { guid: 'turn-7-hint-2',
    beforeText:
      "<p>Incorrect.</p>" +    
      "<p><b>Hint 2</b>: How much time elapsed during this interval?</p>" +    
      "<p>Try again. For how many minutes did Maria stop to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-3',
    afterText: '',
    staticAnnotations: ['annotation-3'],    
    nextTurnForNominalResponse: 'turn-7-correct',
    nextTurnForIncorrectResponse: 'turn-7-hint-3',
    isLastTurn: NO
  },

  { guid: 'turn-7-hint-3',
    beforeText:
      "<p>Incorrect.</p>" +
      "<p><b>Hint 3</b>: After four minutes, Maria stopped and did not start moving again until six minutes. " +
      "So, how many minutes passed?</p>" +
      "<p>Try again. For how many minutes did Maria stop to talk to her coach?</p>",
    responseTemplate: 'template-numeric-1',
    responseVerifier: 'verifier-3',
    afterText: '',
    nextTurnForNominalResponse: 'turn-7-correct',
    nextTurnForIncorrectResponse: 'turn-7-incorrect',
    isLastTurn: NO    
  },

  { guid: 'turn-7-incorrect',
    beforeText:
      "<p>Maria stopped during the horizontal segment of the graph. This is when her position did not change. " +
      "As you can see, this interval lasted 2 minutes.</p>" +
      "<p>Click Next >> when you are ready.</p>",      
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES,
    shouldAutoAdvance: NO
  },

  { guid: 'turn-7-correct',
    beforeText: 
      "<p>Correct! Maria stopped during the horizontal segment of the graph. " +
      "This is when her position did not change. As you can see, this interval lasted 2 minutes.</p>" +
      "<p>Click Next >> when you are ready.</p>",      
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES,
    shouldAutoAdvance: NO
  },
  
  { guid: 'turn-8-start',
    beforeText: 
      "<p>Think back on the activities you just did.</p>" +
      "<p>Now that you have had a chance to create your own position versus time graphs, " +
      "explain what kind of details this graph can tell about motion on a straight track. " +
      "Give examples of some details that a position versus time graph cannot tell.</p>" +
      "<p>What other elements would make the story complete?</p>",
    responseTemplate: 'template-open-1',
    responseVerifier: null,
    afterText: '',
    nextTurnButtonTitle: 'Submit My Response',
    nextTurnForNominalResponse: 'turn-8-done',
    nextTurnForIncorrectResponse: null,
    isLastTurn: NO
  },

  { guid: 'turn-8-done',
    beforeText: 
      "<p>Your answer has been recorded. This is the end of the activity.</p>",      
    responseTemplate: null,
    responseVerifier: null,
    afterText: '',
    nextTurnForNominalResponse: null,
    nextTurnForIncorrectResponse: null,
    isLastTurn: YES,
    shouldAutoAdvance: NO
  }     
];

/* >>>>>>>>>> BEGIN source/fixtures-prod/guide_page.js */
// ==========================================================================
// Project:   Smartgraphs.GuidePage Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/guide_page');

Smartgraphs.GuidePage.FIXTURES = [

  { guid: 1,
    sequence: 'sequence-1',
    index: 1,
    title: '1',
    introText: 
      "<p>Have you ever tried to tell someone a story about a trip you took? " +
      "Most likely, your story included words and pictures. In this activity, " +
      "you will tell stories that convey information about motion during a specific type of journey.</p>" +
      "<p>You will learn that the motion of an object can be described by its position, direction of motion, and speed. "+
      "Motion can be measured and represented on a graph.</p>",
    firstDialogTurn: 'turn-1',
    dataSeries: null,
    axes: null,
    sensorAppletShouldBeEnabled: NO,
    shouldShowImage: YES
  },

  { guid: 2,
    sequence: 'sequence-1',
    index: 1,
    title: '2',
    introText:
      "<p>You are going to try moving in different ways on a straight path while collecting data with a motion " +
      "sensor.</p>" +
      "<p>When you are ready, click Start to record the position and time data for your movements. " +
      "Walk on the path for 30 seconds. " +
      "Experiment with different kinds of motions (walking fast, slow, forward, backward…). " +
      "Click Stop after 30 seconds are up.</p>",
    firstDialogTurn: 'turn-2-start',
    dataSeries: 'series-sensor',
    axes: 'axes-sensor',
    sensorAppletShouldBeEnabled: YES,
    shouldShowImage: NO    
  },

  { guid: 3,
    sequence: 'sequence-1',
    index: 1,
    title: '3',
    introText: 
      "<p>Next you will try moving at two different speeds.</p>" +
      "<p>Start close to the motion sensor. When you are ready, click Reset and then Start and walk away from the "+
      "sensor at a slow, steady pace for 15 seconds, then at a faster, steady pace for 15 seconds. " +
      "Click Stop when the time is up.</p>",
    firstDialogTurn: 'turn-3-start',
    dataSeries: 'series-sensor',
    axes: 'axes-sensor',
    sensorAppletShouldBeEnabled: YES,
    shouldShowImage: NO    
  },
  
  { guid: 4,
    sequence: 'sequence-1',
    index: 1,
    title: '4',
    introText: 
      "<p>This time, you are going to record your position and time during three different tasks.</p>" +
      "<p>Start close to the motion sensor, click Reset, and then click Start. " +
      "Walk slowly for about 10 seconds, stop for 10 seconds, then walk faster for the remaining 10 seconds. " + 
      "Click Stop.</p>",
    firstDialogTurn: 'turn-4-start',
    dataSeries: 'series-sensor',
    axes: 'axes-sensor',
    sensorAppletShouldBeEnabled: YES,
    shouldShowImage: NO     
  },

  { guid: 5,
    sequence: 'sequence-1',
    index: 1,
    title: '5',
    introText: 
      "<p>Now you that you’ve had a chance to create position versus time graphs from your own motions, " +
      "let’s look at some graphs that were created by someone running.</p>" +
      "<p>Maria ran practice laps around the school track. " +
      "Her coach recorded the distances she ran after each minute. " +
      "These data are shown in the graph and the table at right. " +
      "Remember that the time was recorded in minutes rather than seconds.</p>",
    firstDialogTurn: 'turn-5-start',
    dataSeries: 'series-maria',
    axes: 'axes-maria',
    sensorAppletShouldBeEnabled: NO,
    shouldShowImage: NO       
  },
  
  { guid: 6,
    sequence: 'sequence-1',
    index: 1,
    title: '6',
    introText: 
     "<p>Remember that the data on the right is the Maria's distance, recorded every minute (60 seconds) by her coach.<p>",
    firstDialogTurn: 'turn-6-start',
    dataSeries: 'series-maria',
    axes: 'axes-maria',
    sensorAppletShouldBeEnabled: NO,
    shouldShowImage: NO       
  },
  
  { guid: 7,
    sequence: 'sequence-1',
    index: 1,
    title: '7',
    introText: 
     "<p>Remember that the data on the right is the Maria's distance, recorded every minute (60 seconds) by her coach.<p>",
    firstDialogTurn: 'turn-7-start',
    dataSeries: 'series-maria',
    axes: 'axes-maria',
    sensorAppletShouldBeEnabled: NO,
    shouldShowImage: NO      
  },
  
  { guid: 8,
    sequence: 'sequence-1',
    index: 1,
    title: '8',
    introText: '',
    firstDialogTurn: 'turn-8-start',
    dataSeries: 'series-maria',
    axes: 'axes-maria',
    sensorAppletShouldBeEnabled: NO,
    shouldShowImage: NO
  }
  
];

/* >>>>>>>>>> BEGIN source/models/guide_page_sequence.js */
// ==========================================================================
// Project:   Smartgraphs.GuidePageSequence
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.GuidePageSequence = SC.Record.extend(
/** @scope Smartgraphs.GuidePageSequence.prototype */ {

  pages: SC.Record.toMany('Smartgraphs.GuidePage', {
    inverse: 'sequence',
    orderBy: ['index']
  })
}) ;

/* >>>>>>>>>> BEGIN source/fixtures-prod/guide_page_sequence.js */
// ==========================================================================
// Project:   Smartgraphs.GuidePageSequence Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/guide_page_sequence');

Smartgraphs.GuidePageSequence.FIXTURES = [

  { guid: 'sequence-1',
    pages: ['1', '2', '3', '4', '5', '6', '7', '8']
  }
];

/* >>>>>>>>>> BEGIN source/models/response_template.js */
// ==========================================================================
// Project:   Smartgraphs.ResponseTemplate
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/

Smartgraphs.ResponseTemplate = SC.Record.extend(
/** @scope Smartgraphs.ResponseTemplate.prototype */ {
  
  // for future use:
  //
  // A templated string that could be parsed to generate input fields in which the user can enter his/her response.
  // It should include the minimal prompt text necessary to describe the expected response to the user (so that the 
  // same template can be reused by successive DialogTurns that offer grammatically and semantically different hints).
  //
  // e.g., 'Maria ran {number} {minutes|meters|miles per hour}"  

  templateString: SC.Record.attr(String),
  fieldTypes: SC.Record.attr(Array),
  fieldValues: SC.Record.attr(Array)
  
}) ;

/* >>>>>>>>>> BEGIN source/fixtures-prod/response_template.js */
// ==========================================================================
// Project:   Smartgraphs.ResponseTemplate Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/response_template');

Smartgraphs.ResponseTemplate.FIXTURES = [

  { guid: 'template-numeric-1',
    fieldTypes: 'numeric'.w(),
    fieldValues: [''],
    numberOfResponseFields: 1
  },
  
  { guid: 'template-open-1',
    fieldTypes: 'textarea'.w(),
    fieldValues: [''],
    numberOfResponseFields: 1
  }

];

/* >>>>>>>>>> BEGIN source/models/response_verifier.js */
// ==========================================================================
// Project:   Smartgraphs.ResponseVerifier
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.ResponseVerifier = SC.Record.extend(
/** @scope Smartgraphs.ResponseVerifier.prototype */ {

  // e.g., what kind of response verifier we want
  verifierDelegateName: SC.Record.attr(String),

  // the verifier delegate will interpret this string as appropriate.
  configString: SC.Record.attr(String)
}) ;

/* >>>>>>>>>> BEGIN source/fixtures-prod/response_verifier.js */
// ==========================================================================
// Project:   Smartgraphs.ResponseVerifier Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/response_verifier');

Smartgraphs.ResponseVerifier.FIXTURES = [

  { guid: 'verifier-1',
    verifierDelegateName: 'GraphSelection',
    configString: 'x: 4'
  },
  
  { guid: 'verifier-2',
    verifierDelegateName: 'ResponseTemplate',
    configString: 'number: 800'
  },
  
  { guid: 'verifier-3',
    verifierDelegateName: 'ResponseTemplate',
    configString: 'number: 2'
  }
];

/* >>>>>>>>>> BEGIN source/models/static_annotation.js */
// ==========================================================================
// Project:   Smartgraphs.StaticAnnotation
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.StaticAnnotation = SC.Record.extend(
/** @scope Smartgraphs.StaticAnnotation.prototype */ {

  type: SC.Record.attr(String),
  points: SC.Record.toMany(Smartgraphs.DataPoint)
}) ;

/* >>>>>>>>>> BEGIN source/fixtures-prod/static_annotation.js */
// ==========================================================================
// Project:   Smartgraphs.StaticAnnotation Fixtures
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/static_annotation');

Smartgraphs.StaticAnnotation.FIXTURES = [

  { guid: 'annotation-1',
    type: 'segment',
    points: ['1','2','3','4']
  },
  
  { guid: 'annotation-2',
    type: 'segment',
    points: ['6','7','8','9', '10']
  },
  
  { guid: 'annotation-3',
    type: 'segment',
    points: ['4', '5', '6']
  },
  
  { guid: 'annotation-4',
    type: 'point',
    points: ['4']
  },
  
  { guid: 'annotation-5',
    type: 'line',
    points: ['4']
  }
];

/* >>>>>>>>>> BEGIN source/models/static_annotation_list.js */
// ==========================================================================
// Project:   Smartgraphs.StaticAnnotationList
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.StaticAnnotationList = SC.Record.extend(
/** @scope Smartgraphs.StaticAnnotationList.prototype */ {

  annotations: SC.Record.toMany('Smartgraphs.StaticAnnotation', {
    inverse: 'list'
  })

}) ;

/* >>>>>>>>>> BEGIN source/verifier_delegates/verifier_delegate.js */
// ==========================================================================
// Project:   Smartgraphs.VerifierDelegate
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

// VerifierDelegate classes know
//  (1) where in the property path to get the response (e.g., if from some annotation object on the graph, or from the responseTemplateController)
//  (2) how to interpret the 'value' parameter of the ResponseVerifier object

Smartgraphs.VerifierDelegate = SC.Object.extend({
  isVerifierDelegate: YES,
  configString: '',
  
  // implement these in each instance
  checkResponse: null,
  responseAsString: '',
  responseIsIncomplete: YES,
  responseIsMalformed: NO,
  responseIsCorrect: NO,
  responseIsReady: NO
});
/* >>>>>>>>>> BEGIN source/verifier_delegates/graph_selection.js */
// ==========================================================================
// Project:   Smartgraphs.GraphSelectionVerifierDelegate
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('verifier_delegates/verifier_delegate');

Smartgraphs.GraphSelectionVerifierDelegate = Smartgraphs.VerifierDelegate.create({

  checkResponse: function () {
    // note that we'll need to find some way to tell the delegate *which* dataseries to observe

    if (this.get('responseIsIncomplete')) {
      return;
    }
    if (this.get('responseIsMalformed')) {
      return;
    }

    var expectedXValue;
    var configString = this.get('configString');

    // for now configString just specifies x-value

    if (configString.indexOf('x:') === 0) {
      expectedXValue = parseFloat(configString.substring(2));
    }
    else {
      throw "GraphSelectionVerifierDelegate received a configString that didn't start with 'x:'";
    }

    var selectedPoint = this.get('selectedPoint');
    
    //  this could be a computed property
    this.set('responseAsString', 'the point (' + selectedPoint.get('x') + ', ' + selectedPoint.get('y') + ')');
    
    this.set('responseIsMalformed', NO);
    var responseXValue = selectedPoint.get('x');
    
    this.set('responseIsCorrect', responseXValue === expectedXValue);     
  },

  graphSelectionBinding: SC.Binding.oneWay('Smartgraphs.dataSeriesController.selection'),

  responseIsReady: function () {
    var selection = this.get('graphSelection');
    return (!!selection && selection.get('length') === 1);
  }.property('graphSelection').cacheable(),
    
  responseIsIncomplete: function () {
    return !this.get('responseIsReady');
  }.property('responseIsReady').cacheable(),
  
  responseIsMalformed: function () {
    var selection = this.get('graphSelection');
    return (selection && selection.get('length') > 1);
  }.property('graphSelection').cacheable(),
  
  selectedPoint: function () {
    var selection = this.get('graphSelection');
    return ((selection && selection.get('length') === 1) ? selection.toArray().objectAt(0) : undefined);
  }.property('graphSelection').cacheable()
});

/* >>>>>>>>>> BEGIN source/verifier_delegates/response_template.js */
// ==========================================================================
// Project:   Smartgraphs.ResponseTemplateVerifierDelegate
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

sc_require('verifier_delegates/verifier_delegate');

Smartgraphs.ResponseTemplateVerifierDelegate = Smartgraphs.VerifierDelegate.create({
  
  // init: function () {
  //   arguments.callee.base.apply(this,arguments);
  //   this.responseArrayDidChange();
  // },

  checkResponse: function () {

    if (this.get('responseIsIncomplete')) {
      return;
    }

    var expectedResponse;
    var responseTypeIsNumeric = NO;
    var configString = this.get('configString');
    
    if (configString.indexOf('number:') === 0) {
      responseTypeIsNumeric = YES;
      expectedResponse = parseFloat(configString.substring(7));
    }
    else if (configString.indexOf('string:' === 0)) {
      expectedResponse = configString.substring(7);
    }
    else {
      // FIXME: use SC.Error?
      throw "ResponseTemplateVerifierDelegate received a configString that didn't start with 'number:' or 'string:'";
    }      

    var response = this.get('response');
    
    // eventually we could process responseAsString in a more sophisticated way, perhaps adding units, etc.
    this.set('responseAsString', response);
    
    this.set('responseIsMalformed', NO);
    if (responseTypeIsNumeric) {
      response = parseFloat(response);
      if (isNaN(response)) {
        this.set('responseIsMalformed', YES);
      }
    }
    if (this.get('responseIsMalformed')) {
      return;
    }

    this.set('responseIsCorrect', response === expectedResponse);
  },
  
  // Simplified implementation for now; will handle more objects in the responseArray after we implement actual
  // parsing of the templateString in ResponseTemplate

  responseArrayBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.responseArray'),
  _oldResponseArray: null,
  
  responseArrayDidChange: function () {
    //console.log('ResponseTemplateVerifierDelegate observed responseArray');
    var responseArray = this.get('responseArray');
    
    if (this._oldResponseArray) {
      this._oldResponseArray.removeObserver('[]', this, this.rawResponseDidChange);
    }
    if (responseArray) {
      responseArray.addObserver('[]', this, this.rawResponseDidChange);
    }
    this._oldResponseArray = responseArray;

    this.rawResponseDidChange();        // don't forget to calculate the new response value from the responseArray
  }.observes('responseArray'),
  
  rawResponseDidChange: function () {
    //console.log('Smartgraphs.ResponseTemplateVerifierDelegate rawResponseDidChange');
    var responseArray = this.get('responseArray');
    var response = (responseArray && responseArray.get(length) > 0) ? responseArray.objectAt(0) : null;
    
    if (typeof response === 'string') {
      response = response.strip();
    }
    this.set('response', response);
  },
  
  responseIsReady: function () {
    var response = this.get('response');
    return (!!response && (response.length > 0));
  }.property('response').cacheable(), 
  
  responseIsIncomplete: function () {
    return !this.get('responseIsReady');
  }.property('responseIsReady').cacheable()
});

/* >>>>>>>>>> BEGIN source/views/author.js */
// ==========================================================================
// Project:   Smartgraphs.AuthorView
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class
 (Document Your View Here)
 @extends SC.View
 */
Smartgraphs.AuthorView = SC.View.extend(
/** @scope Smartgraphs.AuthorView.prototype */{
  isVisible: YES,
  childViews: ["titleLabel", "indexViewLabel", "indexView", "titleViewLabel", "titleView", "introTextViewLabel", "introTextView", 
  "dialogTurnGuidViewLabel", "dialogTurnGuidView", "firstDialogTurnViewLabel", "firstDialogTurnView", 
  "dialogTurnBeforeTextViewLabel", "dialogTurnBeforeTextView", "responseTemplateGuidViewLabel", "responseTemplateGuidView", 
  "verifierDelegateNameViewLabel", "verifierDelegateNameView", "verifierConfigViewLabel", "verifierConfigView",
  "dialogTurnAfterTextViewLabel", "dialogTurnAfterTextView",
  "nextTurnForNominalResponseViewLabel","nextTurnForNominalResponseView","nextTurnForIncorrectResponseViewLabel","nextTurnForIncorrectResponseView",
  "isLastTurnView", "isLastTurnViewLabel"],
  
  titleLabel: SC.LabelView.design({
    layout: {
      top: 0,
      height: 20,
      width: 300
    },
    textAlign: "center",
    backgroundColor: "black",
    value: "Author's Controls:"
  }),
  
  indexViewLabel: SC.LabelView.design({
    layout: {
      top: 20,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Guide Page index #:"
  }),
  indexView: SC.LabelView.design({
    layout: {
      top: 40,
      height: 20,
      width: 300
    },
    isEditable: NO, // TODO: Add controls for adding, removing, and moving questions in the question sequence
    backgroundColor: "darkgrey",
    valueBinding: "*parentView.content.index"
  }),
  
  titleViewLabel: SC.LabelView.design({
    layout: {
      top: 60,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Title for Guide Page tabs:"
  }),
  titleView: SC.LabelView.design({
    layout: {
      top: 80,
      height: 20,
      width: 300
    },
    isEditable: YES,
    backgroundColor: "darkblue",
    valueBinding: "*parentView.content.title"
  }),
  
  introTextViewLabel: SC.LabelView.design({
    layout: {
      top: 100,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Introduction Text:"
  }),
  introTextView: SC.LabelView.design({
    layout: {
      top: 120,
      height: 80,
      width: 300
    },
    isInlineEditorMultiline: YES,
    isEditable: YES,
    backgroundColor: "darkblue",
    valueBinding: "*parentView.content.introText"
    // TODO: set CSS 
  }),
  
  firstDialogTurnViewLabel: SC.LabelView.design({
    layout: {
      top: 200,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "First Dialog Turn:"
  }),
  firstDialogTurnView: SC.LabelView.design({
    layout: {
      top: 220,
      height: 80,
      width: 300
    },
    isInlineEditorMultiline: YES,
    isEditable: NO, // TODO: show which dialog turn is first in a better way
    //YES,
    backgroundColor: "darkgrey",
    valueBinding: "*parentView.content.firstDialogTurn"
  }),
  
  dialogTurnGuidViewLabel: SC.LabelView.design({
    layout: {
      top: 300,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Selected Dialog Turn's ID:"
  }),
  dialogTurnGuidView: SC.LabelView.design({
    layout: {
      top: 320,
      height: 20,
      width: 300
    },
    isInlineEditorMultiline: NO,
    isEditable: NO, // TODO: add buttons for adding, moving and removing dialogTurns
    //YES,
    backgroundColor: "darkgrey",
    valueBinding: "*parentView.content.selectedDialogTurn.guid"
  }),
  
  dialogTurnBeforeTextViewLabel: SC.LabelView.design({
    layout: {
      top: 340,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Selected Dialog Turn's Before Text:"
  }),
  dialogTurnBeforeTextView: SC.LabelView.design({
    layout: {
      top: 360,
      height: 80,
      width: 300
    },
    isInlineEditorMultiline: YES,
    isEditable: YES,
    backgroundColor: "darkblue",
    valueBinding: "*parentView.content.selectedDialogTurn.beforeText"
  }),
  
  responseTemplateGuidViewLabel: SC.LabelView.design({
    layout: {
      top: 440,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Selected Dialog Turn's Response Template ID:"
  }),
  responseTemplateGuidView: SC.LabelView.design({
    layout: {
      top: 460,
      height: 20,
      width: 300
    },
    isInlineEditorMultiline: NO,
    isEditable: NO, // TODO: Make an editable control to dynamically change the template
    //YES,
    backgroundColor: "darkgrey",
    valueBinding: "*parentView.content.selectedDialogTurn.responseTemplate.guid"
  }),
  
  verifierDelegateNameViewLabel: SC.LabelView.design({
    layout: {
      top: 480,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Selected Dialog Turn's Response Verifier Type:"
  }),
  verifierDelegateNameView: SC.LabelView.design({
    layout: {
      top: 500,
      height: 20,
      width: 300
    },
    isInlineEditorMultiline: NO,
    isEditable: NO, // TODO: Make an editable control to dynamically change the responseVerifier
    //YES,
    backgroundColor: "darkgrey",
    valueBinding: "*parentView.content.selectedDialogTurn.responseVerifier.verifierDelegateName"
  }),
  
  verifierConfigViewLabel: SC.LabelView.design({
    layout: {
      top: 520,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Selected Dialog Turn's Correct Answer:"
  }),
  verifierConfigView: SC.LabelView.design({
    layout: {
      top: 540,
      height: 20,
      width: 300
    },
    isInlineEditorMultiline: NO,
    isEditable: NO, // TODO: FIX:When this is editable the behavior doesn't change
    //YES,
    backgroundColor: "darkgrey",
    valueBinding: "*parentView.content.selectedDialogTurn.responseVerifier.configString"
  }),
  
  dialogTurnAfterTextViewLabel: SC.LabelView.design({
    layout: {
      top: 560,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Selected Dialog Turn's After Text:"
  }),
  dialogTurnAfterTextView: SC.LabelView.design({
    layout: {
      top: 580,
      height: 80,
      width: 300
    },
    isInlineEditorMultiline: YES,
    isEditable: YES,
    backgroundColor: "darkblue",
    valueBinding: "*parentView.content.selectedDialogTurn.afterText"
  }),
  
  nextTurnForNominalResponseViewLabel: SC.LabelView.design({
    layout: {
      top: 600,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Next Turn ID for Correct Response:"
  }),
  nextTurnForNominalResponseView: SC.LabelView.design({
    layout: {
      top: 620,
      height: 20,
      width: 300
    },
    isInlineEditorMultiline: YES,
    isEditable: NO, // TODO: Make a selector
    //YES,
    backgroundColor: "darkgrey",
    valueBinding: "*parentView.content.selectedDialogTurn.nextTurnForNominalResponse.guid"
  }),
  
  nextTurnForIncorrectResponseViewLabel: SC.LabelView.design({
    layout: {
      top: 640,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Next Turn ID for Incorrect Response:"
  }),
  nextTurnForIncorrectResponseView: SC.LabelView.design({
    layout: {
      top: 660,
      height: 20,
      width: 300
    },
    isInlineEditorMultiline: NO,
    isEditable: NO, // TODO: Make a selector
    //YES,
    backgroundColor: "darkgrey",
    valueBinding: "*parentView.content.selectedDialogTurn.nextTurnForIncorrectResponse.guid"
  }),
  
  isLastTurnViewLabel: SC.LabelView.design({
    layout: {
      top: 680,
      height: 20,
      width: 300
    },
    backgroundColor: "grey",
    value: "Is This the Last Turn?:"
  }),
  isLastTurnView: SC.LabelView.design({
    layout: {
      top: 700,
      height: 20,
      width: 300
    },
    isInlineEditorMultiline: NO,
    isEditable: NO, // TODO: Make an editor
    //YES,
    backgroundColor: "darkgrey",
    valueBinding: "Smartgraphs.dialogTurnController.isLastTurn"
  })
});

/* >>>>>>>>>> BEGIN source/views/axes.js */
// ==========================================================================
// Project:   Smartgraphs.AxesView
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.AxesView = SC.View.extend(
/** @scope Smartgraphs.AxesView.prototype */ {
  
  // note this assumes that axes has a 'content' property that can be monitored. This will be true for ObjectControllers
  
  displayProperties: 'axes.xMin axes.xMax axes.yMin axes.yMax axes.padding axes.xLabel axes.yLabel'.w(),
  
  didCreateLayer: function () {
    // hacky, hacky, but works for now.
    this.$().css('zIndex', '-1');
  },
  
  render: function (context, firstTime) {

    var parent = this.get('parentView');
    var raphael = parent.get('raphaelObject');

    if (!raphael) {
      return;
    }

    var axes = this.get('axes');
    
    // use xMin as a proxy for all the properties of 'axes' object that have to be defined...
    if (!axes || (axes.get('xMin') === undefined)) { 
      this._clearObjects();
      this.renderChildViews(context, firstTime);
      return;
    }

    var layout = parent.get('layout');    
    var xMin = axes.get('xMin'),
        xMax = axes.get('xMax'),
        yMin = axes.get('yMin'),
        yMax = axes.get('yMax'),
        padding = axes.get('padding'),       
        xSteps = axes.get('xSteps'),
        ySteps = axes.get('ySteps'),
        xLabelText = axes.get('xLabel'),
        yLabelText = axes.get('yLabel');

    var height = layout.height,
        width  = layout.width;

    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;

    this._clearObjects();
    this._x = raphael.g.axis(padding.left, padding.top + plotHeight, plotWidth, 0, xMax, xSteps, 0);    // x axis
    this._y = raphael.g.axis(padding.left, padding.top + plotHeight, plotHeight, 0, yMax, ySteps, 1);   // y axis

    this._xLabel = 
      raphael.text(padding.left + plotWidth/2, height - 10, xLabelText).attr({font: "14px Arial, sans-serif"});
    this._yLabel = 
      raphael.text(10, padding.top + plotHeight/2, yLabelText).attr({font: "14px Arial, sans-serif"});

    this.renderChildViews(context, firstTime);
    this.invokeLater(this.rotateLabel);
  },
  
  // hack to work around Raphael bug where text doesn't rotate if hidden?
  rotateLabel: function () {
    if (this._yLabel) this._yLabel.rotate(270);
  },
    
  _clearObjects: function () {
    if (this._x) this._x.remove();
    if (this._y) this._y.remove();
    if (this._xLabel) this._xLabel.remove();  
    if (this._yLabel) this._yLabel.remove();
  }  
});


/* >>>>>>>>>> BEGIN source/views/dialog_turn.js */
// ==========================================================================
// Project:   Smartgraphs.DialogTurnView
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.DialogTurnView = SC.View.extend(
/** @scope Smartgraphs.DialogTurnView.prototype */ {
  
  useStaticLayout: YES,
  
  childViews: 'textView buttonsView'.w(),
  
  textView: SC.View.extend( {
    useStaticLayout: YES,
    
    childViews: 'beforeTextView responseFieldsView afterTextView'.w(),
    
    classNames: 'dialog-text'.w(),
  
    beforeTextView: SC.StaticContentView.design({
      contentBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.beforeText'),
      isVisibleBinding: SC.Binding.bool('Smartgraphs.dialogTurnController.beforeText')
    }),
  
    // FIXME: this could go into its own view class.
    // responseFields could be a property on the responseTemplateController, bound to dialogTurnView
    // (responses do properly live with the DialogTurn...)
  
    responseFieldsView: SC.StaticContentView.design({
    
      fieldTypesBinding: 'Smartgraphs.responseTemplateController.fieldTypes',
      fieldValuesBinding: 'Smartgraphs.responseTemplateController.fieldValues',
    
      // hide if there is no response template; especially important because IE7 doesn't its height as 0 when empty.
      isVisibleBinding: SC.Binding.bool('Smartgraphs.responseTemplateController.content'),
          
      fieldsTypesDidChange: function () {
        //console.log('fieldTypesDidChange');
        this.invokeOnce(this._updateChildViews);
      }.observes('fieldTypes'),
    
      fieldValuesDidChange: function () {
        //console.log('fieldValuesDidChange');      
        this.invokeOnce(this._updateChildViews);
      }.observes('fieldValues'),
    
      _updateChildViews: function () {
        //console.log('_updateChildViews');   
        this.removeAllChildren();
        this.contentLayoutDidChange();

        var fieldTypes = this.get('fieldTypes');
        var fieldValues = this.get('fieldValues');
        var childViews = [];
      
        if (!fieldTypes) {
          return;
        }

        var type, textFieldWrapperDesign, isTextArea, layout, hint = '';
      
        for (var i = 0, ii = fieldTypes.get('length'); i < ii; i++) {
          type = fieldTypes.objectAt(i);
        
          if (type === 'textarea') {
            isTextArea = YES;
            hint = 'Enter you answer here...';
            layout = {
              height: 97
            };
          }
          else if (type === 'numeric') {
            isTextArea = NO;
            layout = {
              height: 22,
              width: 100 
            };          
          }
          else {
            throw "responseFieldsView received unexpected field type string '" + type + "'.";
          }
 
          // note that SC.TextFieldViews don't display properly at all if they have useStaticLayout: YES
          textFieldWrapperDesign = SC.View.design({
            useStaticLayout: YES,
            hasStaticLayout: YES,
            layout: layout,
            classNames: 'text-field-view-wrapper'.w(),
        
            childViews: [SC.TextFieldView.design({
              isTextArea: isTextArea,
              hint: hint,
              index: i,
              oldGuid: null,
              
              // note that this seeming cruft is caused by our inability (?) to bind to a particular model object.
              // but maybe this could be refactored to bind to a model object.
              
              valueDidChange: function () {
                //console.log("responseFieldsView's child textFieldView observed value");
                var index = this.get('index');
                Smartgraphs.dialogTurnController.updateResponse(index, this.get('value'));
              }.observes('value')
            })]
          });
          
          var view = textFieldWrapperDesign.create();
          if (i === 0) {
            this._firstTextFieldView = view.get('childViews').objectAt(0);
          }
          this.appendChild(view);
          childViews.push(view);
        }
        this.contentLayoutDidChange();
        this.invokeOnce(this._beginEditingFirstView);         
        this.set('childViews', childViews);
      },
      
      
      dialogTurnDidChange: function () {
        var guid = Smartgraphs.dialogTurnController.get('guid');
        if (guid !== this._oldGuid) {
          this.invokeOnce(this._clearValuesAndResetEditing);
        }
        this._oldGuid = guid;
      }.observes('Smartgraphs.dialogTurnController.guid'),
            
      _clearValuesAndResetEditing: function () {
        var childViews = this.get('childViews');
        
        if (childViews) { 
          childViews.forEach(function (view) {
            var textfield = view.get('childViews').objectAt(0);
            //textfield.discardEditing();
            textfield.set('value', null);
          });
          this.invokeLater(this._beginEditingFirstView);
        }
      },
        
      _beginEditingFirstView: function () {
        if (this._firstTextFieldView) {
          this._firstTextFieldView.beginEditing();
        }
      } 
    }),
  
    afterTextView: SC.StaticContentView.design({
      contentBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.afterText'),
      isVisibleBinding: SC.Binding.bool('Smartgraphs.dialogTurnController.afterText')
    })
  }),
  
  buttonsView: SC.View.design({
    useStaticLayout: YES,
    layout: {
      height: 24
    },
    
    childViews: 'nextTurnButton'.w(),
    
    nextTurnButton: SC.ButtonView.design({
      layout: {
        width: 160,
        right: 0
      },
      titleBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.nextTurnButtonTitle'),
      isVisibleBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.nextTurnButtonShouldBeVisible'),
      isEnabledBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.nextTurnButtonShouldBeEnabled'),
      target: 'Smartgraphs.dialogTurnController',
      action: 'gotoNextTurn'
    })
  })
});

/* >>>>>>>>>> BEGIN source/views/height_adjusting_list.js */
// ==========================================================================
// Project:   Smartgraphs.HeightAdjustingListView
// Copyright: ©2010 Consord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A ListView that recomputes its layout when its content length or rowHeight changes.
  
   Note that, as far as heights are concerned, it only observes its own 'rowHeight' property; it does not recompute 
   its layout when individual list item row heights change.

  @extends SC.ListView
*/
Smartgraphs.HeightAdjustingListView = SC.ListView.extend(
/** @scope Smartgraphs.HeightAdjustingListView.prototype */ {

  contentLengthBinding: '*content.length',
  
  _recomputeLayout: function () {
    this.computeLayout();
  }.observes('contentLength', 'rowHeight')

});

/* >>>>>>>>>> BEGIN source/views/raphael.js */
// ==========================================================================
// Project:   Smartgraphs.RaphaelView
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs Raphael*/

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.RaphaelView = SC.View.extend(
/** @scope Smartgraphs.RaphaelView.prototype */ {

  raphaelObject: null,
  _childViewForId: {},
  _lastViewForMouseMove: null,
  
  didCreateLayer: function () {    
    var raphaelConstructor = Raphael;  // make jslint stop complaining that Raphael needs to be called with 'new' because of the initial cap
    var frame = this.get('frame');
    
    var raphaelObject = raphaelConstructor(this.get('layer'), frame.width, frame.height);
    
    // cache a reference to the raphaelObject in the top level dom element ('canvas') created by Raphael
    // note that all the *other* dom nodes created by Raphael are already given a 'raphael' property by Raphael itself
    raphaelObject.canvas.raphael = raphaelObject;
    
    this.set('raphaelObject', raphaelObject);
  },
  
  registerChildView: function (view, id) {
    this._childViewForId[id] = view;
  },
  
  _ID_MATCHER: /^(sc\d+)/,
  
  _childViewForEvent: function (e) {
    var id = e.target.id;
    var match = id.match(this._ID_MATCHER);
    
    return match ? this._childViewForId[match[1]] : null;
  },
  
  mouseMoved: function (e) {
    var view = this._childViewForEvent(e);
    
    if (view && view.mouseMoved) view.mouseMoved(e);

    var lastView = this._lastViewForMouseMove;
    
    if (view !== lastView) {
      if (lastView && lastView.mouseExited) lastView.mouseExited(e);
      if (view && view.mouseEntered) view.mouseEntered(e);
    }
    
    this._lastViewForMouseMove = view;  
  },
  
  mouseDown: function (e) {
    var view = this._childViewForEvent(e);
    if (view) {
      return view.mouseDown(e);
    }
  }
});

/* >>>>>>>>>> BEGIN source/views/series.js */
// ==========================================================================
// Project:   Smartgraphs.SeriesView
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.SeriesView = SC.View.extend(
/** @scope Smartgraphs.SeriesView.prototype */ {
  
  _raphaelObjForId: {},     // index of raphael objects representing data points in this series, by id
  _dataPointForId: {},
  _highlightedPoint: null,   // unclear whether this is a DOM object or a DataPoint record...

  NO_HIGHLIGHT_ATTR: { r: 4 },
  HIGHLIGHT_ATTR: { r: 6 },
  SELECTED_ATTR: { stroke: '#aa0000', fill: '#aa0000', opacity: 0.8 },
  NOT_SELECTED_ATTR: { stroke: "#BFADA7", fill: "#BFADA7", opacity: 0.8 },
  DATA_POINT_ID_MATCHER : '',
  id : '',
  
  init: function () {
    arguments.callee.base.apply(this,arguments);
    
    this.id = SC.guidFor(this);
    this.DATA_POINT_ID_MATCHER = new RegExp(this.id + "-data-point-(\\d+)");
    var parent = this.get('parentView');
    parent.registerChildView(this, this.id);
  },
  
  displayProperties: 'xMin xMax yMin yMax padding selection content.[]'.w(),
  
  didCreateLayer: function () {
    this.$().css('zIndex', '-1');
  },
  
  mouseDown: function (e) {
    var pair = this._dataPointForId[e.target.id];
    
    if (pair) {
      var controller = this.get('controller');
      var selection = this.get('selection');
      
      if (selection.contains(pair)) {
        controller.deselectObject(pair);
      }
      else {
        controller.selectObject(pair, NO);
      }
    }
  },
  
  mouseEntered: function (e) {
    var point = this._raphaelObjForId[e.target.id];
    
    if (point) point.attr(this.HIGHLIGHT_ATTR);
    this._highlightedPoint = point;
  },
  
  mouseExited: function (e) {
    var point = this._highlightedPoint;
    if (point) point.attr(this.NO_HIGHLIGHT_ATTR);    
    this._highlightedPoint = null;
  },
  
  render: function (context, firstTime) {

    var parent = this.get('parentView');
    var raphaelNode = parent.$().children()[0];
    var raphael = (raphaelNode && raphaelNode.raphael) ? raphaelNode.raphael : null;
    
    var padding = this.get('padding');
    var layout = parent.get('layout');
    var xMin = this.get('xMin'),
        xMax = this.get('xMax'),
        yMin = this.get('yMin'),
        yMax = this.get('yMax');
    
    if (raphael && padding && layout && (xMin !== undefined) && (xMax !== undefined) && (yMin !== undefined) && (yMax !== undefined)) {
      var height = layout.height,
          width  = layout.width;

      var plotWidth = width - padding.left - padding.right;
      var plotHeight = height - padding.top - padding.bottom;          

      var xScale = plotWidth / xMax;
      var yScale = plotHeight / yMax;
      
      var rObjs = this._raphaelObjForId;
      for (var objName in rObjs) {
        if (rObjs.hasOwnProperty(objName)) rObjs[objName].remove();
      }

      this._raphaelObjForId = {};
      this._dataPointForId = {};
      
      var series = this.get('content');
      var selection = this.get('selection');
      
      for (var i = 0, ii = series.get('length'); i < ii; i++) {
        var pair = series.objectAt(i);
        var x = padding.left + (pair.get('x') * xScale);
        var y = padding.top + plotHeight - (pair.get('y') * yScale);
    
        var point = raphael.circle(x, y).attr(this.NO_HIGHLIGHT_ATTR);
        
        // we want: if this point corresponds to the highlighted PAIR, highlight it.
        // but note that this requires a different data model
        
        if (selection.contains(pair)) {
          point.attr(this.SELECTED_ATTR);
        }
        else {
          point.attr(this.NOT_SELECTED_ATTR);
        }
    
        point.node.id = this.id + '-data-point-%@'.fmt(i);
        this._raphaelObjForId[point.node.id] = point;
        this._dataPointForId[point.node.id] = pair;
      }
    }
  }
});

/* >>>>>>>>>> BEGIN source/views/static_annotations.js */
// ==========================================================================
// Project:   Smartgraphs.StaticAnnotationsViews
// Copyright: ©2010 Concord Consortium, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.StaticAnnotationsView = SC.View.extend(
/** @scope Smartgraphs.StaticAnnotationsViews.prototype */ {


  // Quick and dirty implementation for now until we build out the annotations model a little better, and fix up 
  // the raphael object rendering to hook into the Sproutcore rendering and event system a little better.
  
  displayProperties: 'annotations.[] axes.xMin axes.xMax axes.yMin axes.yMax axes.padding'.w(),
  
  _raphaelObjects: [],
  
  didCreateLayer: function () {
    this.$().css('zIndex', '-1');
  },
 
  render: function (context, firstTime) {
    //console.log('rendering StaticAnnotationsView');
    //console.log(this.get('annotations'));
      
    var parent = this.get('parentView');
    var raphael = parent.get('raphaelObject');

    if (!raphael) {
      //console.log('raphael undefined');
      return;
    }
    
    var axes = this.get('axes');
    var annotations = this.get('annotations');

    //console.log('removing objects');
    this._raphaelObjects.forEach(function (raphaelObject) {
      //console.log('removing object');
      raphaelObject.remove();
    });
    this._raphaelObjects = [];    
    
    if (!annotations || !axes || (axes.get('xMin') === undefined)) {
      //console.log('axes or annotations undefined or empty');
      return;
    }
    
    var points = this.get('points');
    var layout = parent.get('layout');
    
    var height = layout.height;
    var width  = layout.width;
    var padding = axes.get('padding');

    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;          
    var xMax = axes.get('xMax');
    var yMax = axes.get('yMax');
    
    this._xScale = plotWidth / xMax;
    this._yScale = plotHeight / yMax;
    this._left = padding.left;
    this._top = padding.top;
    this._plotHeight = plotHeight;
    this._raphael = raphael;
       
    for (var i = 0, ii = annotations.get('length'); i < ii; i++) {
      this._renderAnnotation(annotations.objectAt(i));
    }
  },
  
  _renderAnnotation: function (annotation, raphael, axes) {
    
    //console.log('rendering annotation');
    //console.log(annotation);
    
    if (annotation.get('type') === 'segment') {
      this._renderSegment(annotation);
    }
    else if (annotation.get('type') === 'point') {
      this._renderPoint(annotation);
    }
    else if (annotation.get('type')  === 'line') {
      this._renderLine(annotation);
    }
    //console.log("couldn't find type");
  },
  
  _renderSegment: function (annotation) {
    //console.log('rendering segment');

    var points = annotation.get('points');

    var coords, point;
    var pathComponents = ['M'];
    for (var i = 0, ii = points.get('length'); i < ii; i++) {
      point = points.objectAt(i);
      coords = this._screenCoordinatesFor(point);
      pathComponents.push(coords.x);
      pathComponents.push(coords.y);
      pathComponents.push('L');
    }
    
    pathComponents.splice(pathComponents.length);      // get rid of trailing 'L'
    var pathString = pathComponents.join(' ');
    //console.log(pathString);
    
    var path = this._raphael.path(pathString).attr({
      'stroke-width': 14,
      'stroke': '#aa0000',
      'stroke-opacity': 0.10,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }).toBack();
    
    this._raphaelObjects.push(path);
  },
  
  _renderPoint: function (annotation) {
    //console.log('rendering point');
    
    var point = annotation.get('points').objectAt(0);
    
    if (!point) return;
    
    var coords = this._screenCoordinatesFor(point);
    
    var highlight = this._raphael.circle(coords.x, coords.y, 8).attr({
      'stroke-opacity': 0.7,
      'fill-opacity': 0.1,
      stroke: '#aa0000'
    }).toBack();
    
    this._raphaelObjects.push(highlight);
  },
  
  
  _renderLine: function (annotation) {
    //console.log('rendering line');
    var point = annotation.get('points').objectAt(0);
    
    if (!point) return;
    
    var coords = this._screenCoordinatesFor(point);
    
    var pathString = 'M ' + coords.x + ' ' + coords.y + ' L ' + this._left + ' ' + coords.y;
    var path = this._raphael.path(pathString).attr({
      'stroke-width': 2,
      'stroke': '#aa0000',
      'stroke-opacity': 0.7
    }).toBack();
    
    this._raphaelObjects.push(path);
  },

  _screenCoordinatesFor: function (point) {
    return {
      x: this._left + (point.get('x') * this._xScale),
      y: this._top + this._plotHeight - (point.get('y') * this._yScale)
    };
  }
});

/* >>>>>>>>>> BEGIN source/main.js */
// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.main = function main() {

  Smartgraphs.getPath('mainPage.mainPane').append() ;
  
  var theSequence = Smartgraphs.store.find(Smartgraphs.GuidePageSequence, 'sequence-1');
  Smartgraphs.guidePageSequenceController.set('sequence', theSequence);
};

function main() { Smartgraphs.main(); }

/* >>>>>>>>>> BEGIN source/resources/main_page.js */
// ==========================================================================
// Project:   Smartgraphs - mainPage
// Copyright: ©2010 Concord Consortium
// ==========================================================================
/*globals Smartgraphs CC*/

sc_require('main');

// This page describes the main user interface for your application.
Smartgraphs.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    layout: {
      width: 1260,
      height: 1250
    },

    childViews: 'dialogView graphView tableView sensorAppletView imageView authoringModeButton authorScrollView'.w(), 
    
    imageView: SC.ImageView.design({
      isVisibleBinding: SC.Binding.oneWay('Smartgraphs.guidePageController.shouldShowImage'),
      layout: {
        left: 485,
        top: 10,
        width: 455,
        height: 580
      },
      
      //classNames: 'smartgraph-pane'.w()
      value: '/static/old-smartgraphs/es/eabf7be6e95b4dce8664b636d82e41347c4794ee/resources/walking_path.jpg'
    }),
    
    dialogView: SC.View.design({
      layout: {
        left: 20,
        top: 10,
        width: 453,
        height: 578
      },
      
      classNames: 'smartgraph-pane'.w(),

      childViews: 'textView navButtons nextButton backButton'.w(),

      // provide padding and style rules for the intro text and dialog
      textView: SC.View.design({
        layout: {
          top: 20,
          left: 20,
          right: 20,
          bottom: 80
        },
        
        classNames: 'text-view'.w(),
        
        childViews: 'introTextView dialogTurnView'.w(),
        
        introTextView: SC.StaticContentView.design({
          contentBinding: SC.Binding.oneWay('Smartgraphs.guidePageController.introText'),
          isVisibleBinding: SC.Binding.bool('Smartgraphs.guidePageController.introText')
        }),
        
        dialogTurnView: Smartgraphs.DialogTurnView.design({})
      }),

      navButtons: SC.SegmentedView.design({
        layout: {
          bottom: 36,
          height: 24
        },

        // in order to enable the button for the next question when it becomes selectable:
        displayProperties: 'nextPageIsSelectable'.w(),

        itemsBinding: SC.Binding.oneWay('Smartgraphs.guidePageSequenceController'),
        itemTitleKey: 'title',
        itemIsEnabledKey: 'isSelectable',
        valueBinding: 'Smartgraphs.guidePageSequenceController.selectedPage',
        nextPageIsSelectableBinding: SC.Binding.oneWay('Smartgraphs.guidePageSequenceController*nextPage.isSelectable')
      }),
      
      nextButton: SC.ButtonView.design({
        displayProperties: ['isEnabled'],
        layout: {
          bottom: 36,
          height: 24,
          right: 30,
          width: 80
        },
        title: "Next >>",
        target: 'Smartgraphs.guidePageSequenceController',
        action: 'selectNextPage',
        isEnabledBinding: SC.Binding.oneWay('Smartgraphs.guidePageSequenceController.canSelectNextPage'),
        isVisibleBinding: SC.Binding.not('Smartgraphs.guidePageSequenceController.isLastPage').oneWay()
      }),
      
      backButton: SC.ButtonView.design({
        displayProperties: ['isEnabled'],
        layout: {
          bottom: 36,
          height: 24,
          left: 30,
          width: 80
        },
        title: "<< Back",
        target: 'Smartgraphs.guidePageSequenceController',
        action: 'selectPreviousPage',
        isEnabledBinding: SC.Binding.oneWay('Smartgraphs.guidePageSequenceController.canSelectPreviousPage'),
        isVisibleBinding: SC.Binding.not('Smartgraphs.guidePageSequenceController.isFirstPage').oneWay()
      })
    }),
    
    
    graphView: Smartgraphs.RaphaelView.design({
      //isVisibleBinding: SC.Binding.not('Smartgraphs.guidePageController.shouldShowImage').oneWay(),
      layout: {
        left: 485,
        top: 10,
        width: 453,
        height: 283
      },
      childViews: 'axesView series1View annotationsView'.w(),
      classNames: ['smartgraph-pane'],
      
      axesView: Smartgraphs.AxesView.design({
        axesBinding: 'Smartgraphs.axesController'
      }),
      
      series1View: Smartgraphs.SeriesView.design({
        xMinBinding: 'Smartgraphs.axesController.xMin',
        xMaxBinding: 'Smartgraphs.axesController.xMax',
        yMinBinding: 'Smartgraphs.axesController.yMin',
        yMaxBinding: 'Smartgraphs.axesController.yMax',
        xScaleBinding: 'Smartgraphs.axesController.xScale',
        yScaleBinding: 'Smartgraphs.axesController.yScale',
        paddingBinding: 'Smartgraphs.axesController.padding',
        controllerBinding: 'Smartgraphs.dataSeriesController',
        contentBinding: 'Smartgraphs.dataSeriesController.arrangedObjects',
        selectionBinding: 'Smartgraphs.dataSeriesController.selection'
      }),
      
      annotationsView: Smartgraphs.StaticAnnotationsView.design({
        annotationsBinding: 'Smartgraphs.staticAnnotationsController',
        axesBinding: 'Smartgraphs.axesController'
      })
    
    }),
    
    tableView: SC.View.design({
      //isVisibleBinding: SC.Binding.not('Smartgraphs.guidePageController.shouldShowImage').oneWay(),      
      layout: {
        left: 485,
        top: 305,
        width: 188,
        height: 283
      },
      classNames: ['smartgraph-pane'],
      
      childViews: ['labelsView', 'scrollerView'],
      
      labelsView: SC.View.design({
        layout: {
          left: 0,
          top: 0,
          width: 190,
          height: 30
        },
        childViews: ['xsLabel', 'ysLabel'],
        
        xsLabel: SC.LabelView.design({
          layout: {
            right: 10,
            width: 80,
            top: 7,
            height: 20
          },

          valueBinding: SC.Binding.oneWay('Smartgraphs.axesController.xLabelAbbreviated')
        }),
        
        ysLabel: SC.LabelView.design({
          layout: {
            left: 10,
            width: 80,
            top: 7,
            height: 20
          },
          valueBinding: SC.Binding.oneWay('Smartgraphs.axesController.yLabelAbbreviated')
        })
      }),
      
      scrollerView: SC.ScrollView.design({
        layout: {
          left: 0,
          top: 30,
          width: 190,
          bottom: 15
        },
        
        borderStyle: SC.BORDER_NONE,
        
        contentView: SC.View.design({
          childViews: ['xsView', 'ysView'],
          
          // look at SC.ContentDisplay for this too
          xHeightBinding: SC.Binding.from('.xsView.calculatedHeight').oneWay(),
          yHeightBinding: SC.Binding.from('.ysView.calculatedHeight').oneWay(),
          
          height: function(){
            return Math.max(this.get('xHeight'), this.get('yHeight'));
          }.property('xHeight', 'yHeight').cacheable(),
          
          _heightDidChange: function(){
            this.invokeOnce(this._adjustHeight);
          }.observes('height'),
          
          _adjustHeight: function () {
            this.adjust('height', this.get('height'));
          },
          
          xsView: Smartgraphs.HeightAdjustingListView.design({
            layout: {
              left: 100,
              top: 0,
              width: 70
            },

            canEditContent: NO,
            contentValueKey: 'x',
            contentBinding: 'Smartgraphs.dataSeriesController.arrangedObjects',
            selectionBinding: 'Smartgraphs.dataSeriesController.selection',
            rowHeight: 18
          }),
          
          ysView: Smartgraphs.HeightAdjustingListView.design({
            layout: {
              left: 10,
              top: 0,
              width: 70
            },

            canEditContent: NO,
            contentValueKey: 'y',
            contentBinding: 'Smartgraphs.dataSeriesController.arrangedObjects',
            selectionBinding: 'Smartgraphs.dataSeriesController.selection',
            rowHeight: 18
          })
        })
      })
    }),

		sensorAppletView: SC.View.design({
		  // don't actually hide the applet - it doesn't like it very much.
      //isVisibleBinding: SC.Binding.not('Smartgraphs.guidePageController.shouldShowImage').oneWay(),		  
      childViews: 'sensorApplet startButton stopButton resetButton'.w(),
      classNames: 'smartgraph-pane'.w(),     
			layout: {
			  left: 685, 
			  top: 305, 
			  width: 253, 
			  height: 283
			},

      shouldBeEnabledBinding: SC.Binding.oneWay('Smartgraphs.dialogTurnController.sensorAppletShouldBeEnabled'),
      _shouldBeEnabledWasTrue: null,
      
      _stopAppletIfNeeded: function () {
        var shouldBeEnabled = this.get('shouldBeEnabled');
        
        // out of an abundance of caution: only stop applet on 'falling edge signal' of shouldBeEnabled
        if (!shouldBeEnabled && this._shouldBeEnabledWasTrue) {
          //console.log('sensorAppletView.shouldBeEnabled became falsy; stopping applet');

          // make sure to ignore the error thrown if the applet hasn't loaded at this point!
          try {
            this.get('sensorApplet').stop();
          } 
          catch (e) {
          }
        }
        this._shouldBeEnabledWasTrue = shouldBeEnabled;
      }.observes('shouldBeEnabled'),
    
      sensorApplet: CC.SensorAppletView.design({
        layout: {
          left: 0, 
          top: 0, 
          width: 1, 
          height: 1
        },

        safariSensorStatePath: 'Smartgraphs.mainPage.mainPane.sensorAppletView.sensorApplet.sensorState',
        hideButtons: YES,
        dt: 0.1,
        resultsBinding: "Smartgraphs.dataSeriesController",
        listenerPath: "Smartgraphs.mainPage.mainPane.sensorAppletView.sensorApplet", // absolute path to this instance...
        
        everyNth: 10,
        maxPoints: 30,
        _nsamples: 0,
        _npoints: 0,
        
        dataReceived: function(type, numPoints, data) {
          if (!this.getPath('parentView.shouldBeEnabled')) {
            // callback may be called while stoppage of the applet is pending
            //console.log('dataReceived called, but sensorAppletView.isEnabled = false');
            return;
          }
          
          // make sure timing issues don't change data series out from under our feet!
          if (this.get('dataSeriesBeingUpdated') !== Smartgraphs.dataSeriesController.get('series')) {
            //console.log(
            //  'dataReceived called, but sensorAppletView was updating a different series than the current '+
            //  'series managed by the dataSeriesController');
          }

          var content = this.getPath('results.content');

          var dt = this.get('dt');
          var size = content.length();
          
          var everyNth = this.get('everyNth');
          var maxPoints = this.get('maxPoints');
          
          for (var i = 0; i < numPoints; i++) {
            var yVal = data[i];      
            if (this._nsamples % everyNth === 0) {
              SC.RunLoop.begin();
              var record = Smartgraphs.dataSeriesController.addDataPoint(this._nsamples*dt, yVal);
              SC.RunLoop.end();
              if (Smartgraphs.dataSeriesController.get('length') >= maxPoints) {
                this.getPath('parentView.stopButton').action();
                return;
              }
            }
            this._nsamples++;
          }
        },
        
        dataStreamEvent: function(type, numPoints, data) {
          // ignore for now
          // SC.RunLoop.begin();
          // SC.RunLoop.end();
        },
        
        sensorsReady: function() {

          SC.RunLoop.begin();
          // enable the start button
          this.setPath('parentView.startButton.isEnabled', YES);
          this.getPath('parentView.resetButton').action();
          SC.RunLoop.end();
        }
      }),
       
      startButton: SC.ButtonView.design({
        layout: {
          centerX: 0, 
          centerY: -60,          
          height: 24, 
          width: 160
        },
                
        isVisibleBinding: '.parentView.shouldBeEnabled',
        isEnabled: NO, // disabled until the sensor applet signals that it is ready
        title: "Start",
        appletBinding: ".parentView.sensorApplet",

        action: function() {
          this.set('isEnabled', NO);
          this.setPath('parentView.stopButton.isEnabled', YES);
          this.setPath('parentView.resetButton.isEnabled', YES);
          this.get('applet').start();
          this.set('dataSeriesBeingUpdated', Smartgraphs.dataSeriesController.get('series'));
          this.get('applet')._nsamples = 0;
        }
      }),
      
      stopButton: SC.ButtonView.design({
        layout: {
          centerX: 0, 
          centerY: 0, 
          height: 24, 
          width: 160
        },

        isVisibleBinding: '.parentView.shouldBeEnabled',    
        isEnabled: NO, // disabled until the sensor applet signals that it is ready
        title: "Stop",
        appletBinding: ".parentView.sensorApplet",

        action: function() {
          this.set('isEnabled', NO);
          this.get('applet').stop();
        }
      }),
      
      resetButton: SC.ButtonView.design({        
        layout: { 
          centerX: 0, 
          centerY: 60, 
          height: 24, 
          width: 160
        },
        
        isVisibleBinding: '.parentView.shouldBeEnabled', 
        isEnabled: NO, // disabled until the sensor applet signals that it is ready
        title: "Reset",
        appletBinding: ".parentView.sensorApplet",
        resultsBinding: "Smartgraphs.dataSeriesController",
       
        action: function() {
          this.set('isEnabled', NO);
          this.setPath('parentView.stopButton.isEnabled', NO);
          this.setPath('parentView.startButton.isEnabled', YES);
          this.get('applet').reset();
          var content = this.getPath('results.content');
          content.invoke('destroy');
          Smartgraphs.store.commitRecords();
          this.get('applet')._nsamples = 0;
        }
      })
		}),
		
    authoringModeButton: SC.ButtonView.design({
      layout: {
        left: 20,
        top: 600
      },
      useStaticLayout: YES,
      title: 'Toggle Authoring Mode',
      targetBinding: 'Smartgraphs.authoringController',
      action: 'toggleAuthoring'
    }),
    
    authorScrollView: SC.ScrollView.design({
      layout: {
        left: 965,
        top: 5,
        width: 300
      },
      
      borderStyle: SC.BORDER_NONE,
      
      contentView: Smartgraphs.AuthorView.design({
        contentBinding: "Smartgraphs.guidePageSequenceController.selectedPage",
        canEditContent: YES //TODO: Make authoring actually work (persistent)
      }),
      isVisibleBinding : "Smartgraphs.authoringController.isAuthoring"
    })
  })
});

