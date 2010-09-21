/* >>>>>>>>>> BEGIN bundle_info.js */
        ;(function() {
          var target_name = 'sproutcore/ace' ;
          if (!SC.BUNDLE_INFO) throw "SC.BUNDLE_INFO is not defined!" ;
          if (SC.BUNDLE_INFO[target_name]) return ; 

          SC.BUNDLE_INFO[target_name] = {
            requires: ['sproutcore/empty_theme'],
            styles:   ['/static/sproutcore/ace/es/71fef724301b04e00df8643ac18a190f56ab68a0/stylesheet-packed.css','/static/sproutcore/ace/es/71fef724301b04e00df8643ac18a190f56ab68a0/stylesheet.css'],
            scripts:  ['/static/sproutcore/ace/es/71fef724301b04e00df8643ac18a190f56ab68a0/javascript-packed.js','/static/sproutcore/ace/es/71fef724301b04e00df8643ac18a190f56ab68a0/javascript.js']
          }
        })();

/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @namespace

  Smaht Graphs. Wicked Smaht Graphs!
  
  @extends SC.Object
*/
Smartgraphs = SC.Application.create(
  /** @scope Smartgraphs.prototype */ {

  NAMESPACE: 'Smartgraphs',
  VERSION: '0.1.0',
  
  // Add global constants or singleton objects here
  triggers: [],

  _nextGuid: 1000,
  getNextGuid: function () {
    return this._nextGuid++;
  },
  
  // DEBUG SETTINGS
  trace: YES,                    // whether to trace firstResponder changes and app actions
  useMockResponses: YES,        // whether the data source should use mock responses or real XHR        
  logDataSource: NO             // whether the data source should log   
  
}) ;

SC.CONTEXT_MENU_ENABLED = YES;
/* >>>>>>>>>> BEGIN source/controllers/activity.js */
// ==========================================================================
// Project:   Smartgraphs.activityController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  The Activity controller represents the currently open Activity.

  @extends SC.Object
*/
Smartgraphs.activityController = SC.ObjectController.create(
/** @scope Smartgraphs.activityController.prototype */ {
  
  // return the context variable's value from the activity context
  lookup: function (key) {
    var context = this.get('context');
    return (context.hasOwnProperty(key) ? context[key] : undefined);
  },
  
  /** Whatever needs to be done to clean up state when leaving an activity */
  cleanup: function () {
    Smartgraphs.activityPageController.cleanup();
    Smartgraphs.activityStepController.cleanup();
  },
  
  // let buttons know.
  canGotoNextPage: NO
    
}) ;

/* >>>>>>>>>> BEGIN source/controllers/activity_page.js */
// ==========================================================================
// Project:   Smartgraphs.activityPageController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.activityPageController = SC.ObjectController.create(
/** @scope Smartgraphs.activityPageController.prototype */ {
  
  // return the context variable's value from the activityPage or activity context
  lookup: function (key) {
    var context = this.get('context');
    return (context.hasOwnProperty(key) ? context[key] : Smartgraphs.activityController.lookup(key));
  },
  
  cleanup: function () {
    Smartgraphs.firstGraphController.clear();
    Smartgraphs.secondGraphController.clear();
    Smartgraphs.activityViewController.clear();
  }
}) ;

/* >>>>>>>>>> BEGIN source/controllers/activity_pages.js */
// ==========================================================================
// Project:   Smartgraphs.activityPagesController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Smartgraphs.activityPagesController = SC.ArrayController.create(
/** @scope Smartgraphs.activityPagesController.prototype */
{

    allowsMultipleSelection: NO,

    indexOfSelectedPage: function() {
        var selection = this.get('selection');
        var indexSet = selection.indexSetForSource(this);
        return (indexSet ? indexSet.toArray().objectAt(0) : undefined);
    }.property('selection', '[]').cacheable(),

    pageInfo: function() {
        var index = this.get('indexOfSelectedPage');
        // Avoid displaying when there is no content
        if (index === undefined) {
            return "";
        }
        var pageNumber = index + 1;
        var totalNumPages = this.get('length');
        // Avoid displaying illogical information
        if (! (totalNumPages >= pageNumber)) {
            totalNumPages = pageNumber;
        }
        return "Page " + pageNumber.toString() + " of " + totalNumPages.toString();
    }.property('indexOfSelectedPage', 'length').cacheable(),

    selectFirstPage: function() {
        if (this.get('length') > 0) {
            this.selectObject(this.objectAt(0));
        }
    },

    selectNextPage: function() {
        var index = this.get('indexOfSelectedPage');
        if (index + 1 < this.get('length')) {
            this.selectObject(this.objectAt(index + 1));
        }
    },

    isLastPage: function() {
        return (this.get('indexOfSelectedPage') >= (this.get('length') - 1));
    }.property('indexOfSelectedPage', 'length').cacheable()
});

/* >>>>>>>>>> BEGIN source/controllers/activity_step.js */
// ==========================================================================
// Project:   Smartgraphs.activityStepController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

Smartgraphs.activityStepController = SC.ObjectController.create(
/** @scope Smartgraphs.activityStepController.prototype */ {

  canSubmit: NO,
  showSubmitButton: NO,
  
  submissibilityInspectorInstance: null,
  
  /**
    Initializes the ActivityStep. Called when we enter ACTIVITY_STEP state.
  */
  begin: function () {
    
    this.enableSubmission();
    
    // FIXME: this is a hack
    SC.RunLoop.begin();
    Smartgraphs.responseTemplateController.set('content', null);
    SC.RunLoop.end();
    Smartgraphs.responseTemplateController.set('content', this.get('responseTemplate'));
    
    // setup window pane
    this.setupPanes();
    
    this.setupTriggers();

    // do the commands
    this.executeCommands(this.get('startCommands'));
  
    // then, finish the step, or wait
    if (this.get('shouldWaitForSubmissibleResponse')) {
      Smartgraphs.sendAction('waitForResponse');
    }
    else if (this.get('shouldFinishImmediately')) {
      Smartgraphs.sendAction('submitStep');
    }
  },
  
  setupPanes: function () {
    var initialPaneConfig = this.get('initialPaneConfig');
    if (initialPaneConfig === 'single') {
      Smartgraphs.sendAction('showSinglePane');
      this.setupPane('single');
    }
    else if (initialPaneConfig === 'split') {
      Smartgraphs.sendAction('showSplitPane');
      this.setupPane('top');
      this.setupPane('bottom');
    }
  },
  
  setupPane: function (pane) {
    if (pane !== 'single' && pane !== 'top' && pane !== 'bottom') {
      console.error('setupPane: invalid pane "' + pane + '"');
      return;
    }
    
    var graph = this.get(pane + 'Graph');

    if (graph) {
      Smartgraphs.sendAction('showGraph', this, { pane: pane, graphId: graph.get('id') });
    }
    else {
      var imagePath = this.get(pane + 'Image');
      if (imagePath) {
        Smartgraphs.sendAction('showImage', this, { pane: pane, path: imagePath });
      }
    }
  },

  setupTriggers: function () {
      // TODO!!
  },
  
  
  /**
    Called when the user clicks the 'done' or 'submit' button associated with this step.
        
    Generally this happens in concert with a transition to ACTIVITY_STEP_SUBMITTED. Any 'goto (next) step' commands,
    or any branching to other steps based on the user-submitted response ('answer checking') should be done 
    here. Step transitions are only allowed during ACTIVITY_STEP_SUBMITTED.
    
    Loops in order through the responseBranches associated with this step, evaluates the 'criterion' property of each 
    in turn (passing in the return value of the responseInspector) and jumps to the step associated with the first 
    branch whose 'criterion' evaluates to YES.
    
    If there are no Reactions or none evaluate to YES, jumps to the defaultBranch, if any.
    
    Does nothing if no Reactions evaluate to YES and there is no defaultBranch. In this case, it is considered
    an error if the 'isFinalStep' property is NO.
  */
  handleSubmission: function () {
    var inspector = this.makeInspector('responseInspector');

    if (inspector) {
      var value = inspector.inspect();
    
      var branch, branches = this.get('responseBranches');
    
      for (var i = 0, ii = branches.get('length'); i < ii; i++) {
        branch = branches.objectAt(i);
        if (Smartgraphs.evaluate(branch.criterion, value)) {
          Smartgraphs.sendAction('gotoStep', this, { stepId: branch.step });
          return;
        }
      }
    }
    
    var defaultBranch = this.get('defaultBranch');
    
    if (defaultBranch) {
      Smartgraphs.sendAction('gotoStep', this, { stepId: defaultBranch.get('id') });
    }
  },
  
  /**
    Clean up any stale controller state. Called when we leave ACTIVITY_STEP_SUBMITTED and/or ACTIVITY itself
  */  
  cleanup: function () {
    console.log('cleaning up');
    var inspector = this.get('submissibilityInspectorInstance');
    if (inspector) {
      inspector.stopWatching();
      inspector.removeObserver('value', this, this.checkSubmissibility);      
      inspector.destroy();
    }
    this.set('submissibilityInspectorInstance', null);
  },
  
  waitForResponse: function () {
    if (!this.get('submissibilityInspector')) {
      this.enableSubmission();
    }
    else {
      this.disableSubmission();
      this.setupSubmissibilityInspector();
    }
  },
  
  setupSubmissibilityInspector: function () {
    if (!this.get('submissibilityInspector')) {
      this.enableSubmission();
      return;
    }
    
    var inspector = this.makeInspector('submissibilityInspector');
    
    if (!inspector) {
      console.error('setupSubmissibilityInspector was called, but makeInspector could not make an inspector instance.');
      return;
    }
    
    this.set('submissibilityInspectorInstance', inspector);
    inspector.addObserver('value', this, this.checkSubmissibility);
    inspector.watch();
  },
  
  makeInspector: function (inspectorProperty) {
    var inspectorInfo = this.get(inspectorProperty);
    
    if (!inspectorInfo) {
      return NO;
    }
    
    if (!inspectorInfo.type) {
      return NO;
    }
    
    var klass = SC.objectForPropertyPath(inspectorInfo.type);
    
    if (!klass || !klass.isClass) {
      return NO;
    }
    
    return klass.create({
      config: inspectorInfo.config
    });
  },
  
  checkSubmissibility: function () {
    var inspector = this.get('submissibilityInspectorInstance');
    var value = inspector.get('value');

    var valueIsValid = Smartgraphs.evaluate(this.get('submissibilityCriterion'), value);
    
    console.log('evaluating "' + value + '" to: ' + (valueIsValid ? 'VALID' : 'NOT VALID'));
    
    if (valueIsValid && !this._valueWasValid) {
      this.enableSubmission();
    }
    else if (this._valueWasValid && !valueIsValid) {
      this.disableSubmission();
    }
    
    this._valueWasValid = valueIsValid;
  },
  
  /**
  */
  executeCommands: function (commands) {
    // 'commands' is a hash, not an SC.Object
    var command;
    for (var i = 0, ii = commands.length; i < ii; i++) {
      command = commands[i];
      // TODO action 'whitelist'?
      // TODO deal with argument substitution?
      Smartgraphs.sendAction(command.action, this, command.literalArgs);
    }
  },
  
  enableSubmission: function () {
    this.set('canSubmit', YES);
  },
  
  disableSubmission: function () {
    this.set('canSubmit', NO);    
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/controllers/activity_view.js */
// ==========================================================================
// Project:   Smartgraphs.activityViewController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.activityViewController = SC.ObjectController.create(
/** @scope Smartgraphs.activityViewController.prototype */ {

  dataViewNowShowing: null,
  topPaneNowShowing: null,
  bottomPaneNowShowing: null,
  singlePaneNowShowing: null,

  firstImageValue: null,
  secondImageValue: null,
  
  firstGraphPaneControls: null,
  secondGraphPaneControls: null,
  
  startControlIsVisible: NO,
  startControlIsEnabled: NO,
  startControlIsDefault: NO,
  
  stopControlIsVisible: NO,
  stopControlIsEnabled: NO,
  stopControlIsDefault: NO,

  clearControlIsVisible: NO,
  clearControlIsEnabled: NO,
  clearControlIsDefault: NO,
  
  paneIsSplit: null,
  
  // ..........................................................
  // ACTIVITY VIEW BUTTON STATE
  //
  
  canGotoNextPage: null,
  canGotoNextPageBinding: 'Smartgraphs.activityController.canGotoNextPage',
  canSubmit: null,
  canSubmitBinding: 'Smartgraphs.activityStepController.canSubmit',
  isFinalStep: null,
  isFinalStepBinding: 'Smartgraphs.activityStepController.isFinalStep',
  hideSubmitButton: null,
  hideSubmitButtonBinding: 'Smartgraphs.activityStepController.hideSubmitButton',
  nextButtonShouldSubmit: null,
  nextButtonShouldSubmitBinding: 'Smartgraphs.activityStepController.nextButtonShouldSubmit',
  
  showSubmitButton: function () {
    return !(this.get('hideSubmitButton') || this.get('nextButtonShouldSubmit'));
  }.property('hideSubmitButton', 'nextButtonShouldSubmit').cacheable(),
    
  enableSubmitButton: null,
  enableSubmitButtonBinding: 'Smartgraphs.activityStepController.canSubmit',
    
  showNextPageButton: null,
  showNextPageButtonBinding: SC.Binding.not('Smartgraphs.activityPagesController.isLastPage'),
    
  enableNextPageButton: function () {
    return this.get('canGotoNextPage') || (this.get('isFinalStep') && this.get('nextButtonShouldSubmit') && this.get('canSubmit'));
  }.property('canGotoNextPage', 'isFinalStep', 'nextButtonShouldSubmit', 'canSubmit').cacheable(),
  
  
  // ..........................................................
  // ACTIVITY VIEW COMMANDS
  //
  firstOrSecondFor: function (pane) {
    var split = this.get('paneIsSplit');
    
    if ( (!split && pane === 'single') || (split && pane === 'top') ) {
      return 'first';
    }
    if ( split && pane === 'bottom' ) {
      return 'second';
    }
    return NO;
  },
  
  validPaneFor: function (pane) {
    var split = this.get('paneIsSplit');
    
    if ( (!split && pane === 'single') || (split && (pane === 'top' || pane === 'bottom')) ) {
      return pane;
    }
    else {
      console.error('invalid pane "' + pane + '"');
      return NO;
    }
  },
  
  otherPaneFor: function (pane) {
    pane = this.validPaneFor(pane);
    
    if (pane === 'bottom') return 'top';
    if (pane === 'top') return 'bottom';
    
    return NO;
  },
  
  showSinglePane: function () {
    this.set('paneIsSplit', false);
    this.set('dataViewNowShowing', 'Smartgraphs.activityPage.singlePaneDataView');
  },
  
  showSplitPane: function () {
    this.set('paneIsSplit', true);
    this.set('dataViewNowShowing', 'Smartgraphs.activityPage.splitPaneDataView');    
  },

  showImage: function (pane, path) {
    pane = this.validPaneFor(pane);
    var which = this.firstOrSecondFor(pane);
    
    if ( !which ) return NO;
    
    this.set(which + 'ImageValue', path);
    this.set(pane + 'PaneNowShowing', 'Smartgraphs.activityPage.'+which+'ImageView');
    
    return YES;
  },
  
  showGraph: function (pane, graphId) {
    pane = this.validPaneFor(pane);
    var which = this.firstOrSecondFor(pane);
    
    if ( !which ) return NO;
    
    Smartgraphs.get(which+'GraphController').openGraph(graphId);
    this.set(pane+'PaneNowShowing', 'Smartgraphs.activityPage.'+which+'GraphPane');
  
    return YES;
  },
  
  hidePane: function (pane) {
    pane = this.validPaneFor(pane);
    
    if ( !pane ) return NO;
    
    this.set(pane+'PaneNowShowing', null);
  },
  
  showSensorLoadingView: function (pane) {
    pane = this.validPaneFor(pane);
    var which = this.firstOrSecondFor(pane);
    
    if ( !which ) return NO;
    
    this.hideControls();
    
    this.set(which+'GraphPaneControls', 'Smartgraphs.activityPage.sensorLoadingView');
  },
  
  showControls: function (pane) {
    pane = this.validPaneFor(pane);
    var which = this.firstOrSecondFor(pane);
    
    if ( !which ) return NO;
    

    this.hideControls();
    this.disableAllControls();
    this.set(which+'GraphPaneControls', 'Smartgraphs.activityPage.graphControlsView');

    return YES;
  },
  
  hideControls: function (pane) {
    if (pane) {
      pane = this.validPaneFor(pane);
      var which = this.firstOrSecondFor(pane);

      if ( !which ) return NO;
      
      this.set(which+'GraphPaneControls', null);
    }
    else {  
      this.set('firstGraphPaneControls', null);
      this.set('secondGraphPaneControls', null);
    }
  },
  
  disableAllControls: function () {
    this.set('startControlIsVisible',  YES);
    this.set('startControlIsEnabled',  NO);
    this.set('startControlIsDefault',  NO);

    this.set('stopControlIsVisible',  YES);
    this.set('stopControlIsEnabled',  NO);
    this.set('stopControlIsDefault',  NO);

    this.set('clearControlIsVisible',  YES);
    this.set('clearControlIsEnabled',  NO);
    this.set('clearControlIsDefault',  NO);
  },
      
  highlightStartControl: function () {
    this.set('startControlIsVisible',  YES);
    this.set('startControlIsEnabled',  YES);
    this.set('startControlIsDefault',  YES);

    this.set('stopControlIsVisible',  YES);
    this.set('stopControlIsEnabled',  NO);
    this.set('stopControlIsDefault',  NO);

    this.set('clearControlIsVisible',  YES);
    this.set('clearControlIsEnabled',  NO);
    this.set('clearControlIsDefault',  NO);
  },
  
  highlightStopControl: function () {
    this.set('startControlIsVisible',  YES);
    this.set('startControlIsEnabled',  NO);
    this.set('startControlIsDefault',  NO);

    this.set('stopControlIsVisible',  YES);
    this.set('stopControlIsEnabled',  YES);
    this.set('stopControlIsDefault',  YES);

    this.set('clearControlIsVisible',  YES);
    this.set('clearControlIsEnabled',  NO);
    this.set('clearControlIsDefault',  NO);
  },
  
  highlightClearControl: function () {
    this.set('startControlIsVisible',  YES);
    this.set('startControlIsEnabled',  NO);
    this.set('startControlIsDefault',  NO);

    this.set('stopControlIsVisible',  YES);
    this.set('stopControlIsEnabled',  NO);
    this.set('stopControlIsDefault',  NO);

    this.set('clearControlIsVisible',  YES);
    this.set('clearControlIsEnabled',  YES);
    this.set('clearControlIsDefault',  YES);
  },
  
  clear: function () {
    this.hideControls();
    
    if (this.get('paneIsSplit')) {
      this.hidePane('top');
      this.hidePane('bottom');
    }
    else {
      this.hidePane('single');
    }
  }

}) ;

/* >>>>>>>>>> BEGIN source/controllers/app_window.js */
// ==========================================================================
// Project:   Smartgraphs.appWindowController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  The appWindow controller controls what high-level views are visible on the main screen.

  @extends SC.Object
*/
Smartgraphs.appWindowController = SC.ObjectController.create(
/** @scope Smartgraphs.appWindowController.prototype */ {

  nowShowing: null,
  loadingMessage: null,
  
  showActivityView: function () {
    this.set('nowShowing', 'Smartgraphs.activityPage.activityView');
  },
  
  showActivityLoadingView: function () {
    // show the generic loading view, with a custom message for activity loading
    this.set('nowShowing', 'Smartgraphs.mainPage.loadingView');
    this.set('loadingMessage', Smartgraphs.activityPage.getPath('activityView.loadingMessage'));
  },
  
  showErrorLoadingActivityView: function () {
    // show the particular error view associated with a activity-loading error
    this.set('nowShowing', 'Smartgraphs.activityPage.errorLoadingActivityView');
  }

}) ;

/* >>>>>>>>>> BEGIN source/controllers/graph.js */
// ==========================================================================
// Project:   Smartgraphs.GraphController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Smartgraphs.GraphController = SC.ObjectController.extend(SC.Responder, 
/** @scope Smartgraphs.graphController.prototype */ {
  
  seriesList: null,
  selectedSeries: null,
  annotationList: null,
  _routeEvents: NO,
  eventQueue: [],
  
  // follow the pattern that if object doesn't exist, create it in the db.
  openGraph: function (graphId) {
    if (this.get('id') === graphId) return;    // nothing to do!

    var graph = Smartgraphs.store.find(Smartgraphs.Graph, graphId);

    if (!graph) {
      graph = Smartgraphs.store.createRecord(Smartgraphs.Graph, { id: graphId });
      Smartgraphs.store.commitRecords();
    }
    
    this.set('content', graph);
    this.set('seriesList', []);
    this.set('annotationList', []);
    
    // add the initial data series and annotations
    var initial = this.get('initialSeries') || [];
    for (var i = 0, ii = initial.get('length'); i < ii; i++) {
      this.addObjectByName(Smartgraphs.DataSeries, initial.objectAt(i));
    }
    
    initial = this.get('initialAnnotations') || [];
    var annotation;
    for (i = 0, ii = initial.get('length'); i < ii; i++) {
      annotation = initial.objectAt(i);
      // FIXME we probably just want to have a session-scoped list of all annotation names mapped to types
      // so the type can be assumed from the name
      this.addObjectByName(SC.objectForPropertyPath(annotation.type), annotation.name);
    }
  },
  
  setAxes: function (axesId) {
    var axes = Smartgraphs.store.find(Smartgraphs.Axes, axesId);
    if (!axes) {
      axes = Smartgraphs.store.createRecord(Smartgraphs.Axes, { guid: axesId });
    }
    
    this.set('axes', axes);
    Smartgraphs.store.commitRecords();
  },
  
  addSeries: function (series) {
    if (this.findSeriesByName(series.get('name'))) {
      return NO;
    }
    this.get('seriesList').pushObject(series);
    Smartgraphs.store.commitRecords();
    return YES;
  },
  
  addObjectByName: function (objectType, objectName) {
    // first try to get the named series from the current session
    var query = SC.Query.local(objectType, 'name={name} AND session={session}', { 
      name: objectName,
      session: Smartgraphs.sessionController.getPath('content')
    });
    var objectList = Smartgraphs.store.find(query);
    
    if (objectList.get('length') < 1) {
      // get an example series if that's what has this name
      query = SC.Query.local(objectType, 'name={name} AND isExample=YES', { 
        name: objectName
      });
      objectList = Smartgraphs.store.find(query);
      if (objectList.get('length') < 1) return NO;
      
      // FIXME copy the object to the session before using it!
    }
  
    var object = objectList.objectAt(0);
    if (objectType === Smartgraphs.DataSeries) {
      this.addSeries(object);
      return YES;
    }
    if (object.get('isAnnotation')) {
      this.addAnnotation(object);
    }
  },
  
  removeSeries: function (seriesName) {
    var seriesList = this.get('seriesList');
    var series = this.findSeriesByName(seriesName);
    if (series) seriesList.removeObject(series);
  },
  
  
  // TODO DRY up vs. findAnnotationByName
  findSeriesByName: function (seriesName) {
    var seriesList = this.get('seriesList');
    var series;

    for (var i = 0, ii = seriesList.get('length'); i < ii; i++) {
      series = seriesList.objectAt(i);
      if (series.get('name') === seriesName) {
        return series;
      }
    }
  },
  
  findAnnotationByName: function (annotationName) {
    var annotationList = this.get('annotationList');
    var annotation;
    for (var i = 0, ii = annotationList.get('length'); i < ii; i++) {
      annotation = annotationList.objectAt(i);
      if (annotation.get('name') === annotationName) {
        return annotation;
      }
    }
    return null;
  },
  
  selectSeries: function (seriesName) {
    var series = this.findSeriesByName(seriesName);
    if (series) this.set('selectedSeries', series);
  },
  
  removeAllSeries: function () {
    // TODO
  },
  
  addAnnotation: function (annotation) {
    if (this.findAnnotationByName(annotation.get('name'))) {
      return NO;
    }
    this.get('annotationList').pushObject(annotation);
    return YES;
  },
  
  clear: function () {
    this.set('seriesList', []);
    this.set('annotationList', []);
    this.set('content', null);
  },
  
  inputAreaMouseDown: function (x, y) {
    if (this._routeEvents) {
      this._eventQueue.pushObject({
        x: x,
        y: y,
        type: Smartgraphs.freehandInputController.START
      });
    }
  },
  
  inputAreaMouseDragged: function (x, y) {
    if (this._routeEvents) {
      this._eventQueue.pushObject({
        x: x,
        y: y,
        type: Smartgraphs.freehandInputController.CONTINUE
      });
    }
  },
  
  inputAreaMouseUp: function (x, y) {
    if (this._routeEvents) {
      this._eventQueue.pushObject({
        x: x,
        y: y,
        type: Smartgraphs.freehandInputController.END
      });
    }
  },
  
  startFreehandInput: function () {
    this._routeEvents = YES;
    this._eventQueue = [];
    this.set('eventQueue', this._eventQueue);
  },
  
  endFreehandInput: function () {   
    this._routeEvents = NO;
  }
}) ;

/* >>>>>>>>>> BEGIN source/controllers/first_graph.js */
// ==========================================================================
// Project:   Smartgraphs.firstGraphController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
sc_require('controllers/graph');

Smartgraphs.firstGraphController = Smartgraphs.GraphController.create(
/** @scope Smartgraphs.firstGraphController.prototype */ {
  
  viewPath: 'activityPage.firstGraphPane.graphView'

}) ;

/* >>>>>>>>>> BEGIN source/controllers/freehand_input.js */
// ==========================================================================
// Project:   Smartgraphs.freehandInputController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.freehandInputController = SC.ObjectController.create(
/** @scope Smartgraphs.freehandInputController.prototype */ {
  
  _inputStarted: NO,
  _pane: null,
  
  pane: function () {
    return this._pane;
  }.property(),

  register: function (pane, controller, sketchName) {
    // guard against accidentally swapping the input controller during freehand input. Guarantee that a controller
    // will always receive endFreehandInput after receiving startFreehandInput
  
    if (this._inputStarted) return NO;
    
    pane = Smartgraphs.activityViewController.validPaneFor(pane);
    
    var sketch = controller ? controller.findAnnotationByName(sketchName) : NO;
    if (pane && sketch && SC.kindOf(sketch, Smartgraphs.FreehandSketch)) {      
      this._graphController = controller;
      this._sketch = sketch;
      this._pane = pane;
      return YES;
    }
    return NO;
  },
  
  enableInput: function () {
    if (!this._sketch) return NO;

    this._inputStarted = YES;
    this._graphController.startFreehandInput();

    this._graphController.get('eventQueue').addObserver('[]', this, this.graphObserver);
    this._strokeEntered = NO;
    return YES;
  },
  
  disableInput: function () {
    this.graphObserver();
    this._graphController.get('eventQueue').removeObserver('[]', this, this.graphObserver);
    this._graphController.endFreehandInput();
    this._graphController = null;
    this._sketch = null;
    this._inputStarted = NO;
    this._pane = null;
  },
  
  graphObserver: function () {
    var strokeEvt, 
        queue = this._graphController.get('eventQueue');

    while ((strokeEvt = queue.shiftObject())) {
      switch (strokeEvt.type) {
        case this.CONTINUE:
          this.continueAt(strokeEvt.x, strokeEvt.y);
          break;
        case this.START:
          this.startAt(strokeEvt.x, strokeEvt.y);
          break;
        case this.END:
          this.endAt(strokeEvt.x, strokeEvt.y);
          break;
      }
    }
  },
  
  startAt: function (x, y) {
    if ( !this._strokeEntered ) {
      this._sketch.set('points', [{x: x, y: y}]);
      this._strokeEntered = YES;
    }
  },
  
  continueAt: function (x, y) {
    this._sketch.get('points').pushObject({x: x, y: y});
  },
  
  endAt: function (x, y) {
    this._sketch.get('points').pushObject({x: x, y: y});

    Smartgraphs.sendAction('freehandStrokeCompleted');
  },
  
  clearStroke: function () {
    this._strokeEntered = NO;
    this._sketch.set('points', []);
  }

}) ;

Smartgraphs.freehandInputController.START = 1;
Smartgraphs.freehandInputController.CONTINUE = 2;
Smartgraphs.freehandInputController.END = 3;

/* >>>>>>>>>> BEGIN source/controllers/response_template.js */
// ==========================================================================
// Project:   Smartgraphs.responseTemplateController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.responseTemplateController = SC.ObjectController.create(
/** @scope Smartgraphs.responseTemplate.prototype */ {
  
  contentDidChange: function () {
    this.invokeOnce(this._initializeValues);
  }.observes('content'),
  
  _initializeValues: function () {
    var initialValues = this.get('initialValues');
    if (initialValues) this.set('values', initialValues.copy());
  },
  
  editingShouldBeEnabled: NO

}) ;

/* >>>>>>>>>> BEGIN source/controllers/second_graph.js */
// ==========================================================================
// Project:   Smartgraphs.secondGraphController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
sc_require('controllers/graph');

Smartgraphs.secondGraphController = Smartgraphs.GraphController.create(
/** @scope Smartgraphs.secondGraphController.prototype */ {
  
  viewPath: 'activityPage.secondGraphPane.graphView'
}) ;

/* >>>>>>>>>> BEGIN source/controllers/selected_points.js */
// ==========================================================================
// Project:   Smartgraphs.selectedPointsController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

// TODO!!!! Separate out 'prediction graph' functionality like _cleanupData and other functionality like
// addSensorPoint()

Smartgraphs.selectedPointsController = SC.ArrayController.create(
/** @scope Smartgraphs.selectedPointsController.prototype */ {

  contentBinding: 'Smartgraphs.selectedSeriesController.points',
  
  addSensorPoint: function (x, y) {
    var point = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, { x: x, y: y, guid: Smartgraphs.getNextGuid() });
    this.pushObject(point);
    Smartgraphs.store.commitRecords();
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/controllers/selected_series.js */
// ==========================================================================
// Project:   Smartgraphs.selectedSeriesController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.selectedSeriesController = SC.ObjectController.create(
/** @scope Smartgraphs.selectedSeriesController.prototype */ {

  // default # bins for prediction graph
  nBins: 50,
  xMin: null,
  xMax: null
}) ;

/* >>>>>>>>>> BEGIN source/controllers/sensor.js */
// ==========================================================================
// Project:   Smartgraphs.sensorController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.sensorController = SC.ObjectController.create(
/** @scope Smartgraphs.sensorController.prototype */ {

  
  xMin: null,
  xMax: null,

  /**
    A downsample ratio of 1 = 1:1 = sample every point
    a downsample ration of 2 = 2:1 = sample every other point
    etc.
    
    TODO: make downsample ratio settable from startSensorInput action?
  */
  downsampleRatio: 2,
  
  /* the rate at which samples are received */
  
  dt: 0.1,
  
  sensorIsReady: NO,

  _appletView: null,
  _inputStarted: NO,
  _recording: NO,
  _pane: null,
  _series: null,
  
  pane: function () {
    return this._pane;
  }.property(),
  
  register: function (pane, series, xMin, xMax) {
    if (this._inputStarted) return NO;    

    pane = Smartgraphs.activityViewController.validPaneFor(pane);
    
    if (pane && series && series.get('isExample') === NO) {
      this._pane = pane;
      this._series = series;
      
      if (xMin) this.set('xMin', xMin);
      if (xMax) this.set('xMax', xMax);
      
      return YES;
    }
    return NO;
  },
  
  enableInput: function () {
    if (this._inputStarted || !this._pane || !this._series) {
      return NO;
    }
    this._inputStarted = YES;
    
    if ( !this._appletView ) {
      this._appletView = Smartgraphs.appletPage.sensorAppletView.create();
      Smartgraphs.mainPage.get('mainPane').appendChild(this._appletView);
    }

    if (this.get('sensorIsReady')) {
      Smartgraphs.sendAction('sensorHasLoaded');
    }
    else {
      Smartgraphs.sendAction('waitForSensorToLoad');
    }

    return YES;
  },
  
  disableInput: function () {
    this._inputStarted = NO;
    this._recording = NO;
    this._series = null;
    this._pane = null;
  },
  
  startRecording: function () {
    this._recording = YES;
    this._nsamples = 0;
    this._appletView.start();
  },
  
  stopRecording: function () {
    this._recording = NO;
    this._appletView.stop();
  },
  
  clearRecordedData: function () {
    SC.RunLoop.begin();
    this._series.get('points').invoke('destroy');
    SC.RunLoop.end();
  },

  /**
    applet callback
  */
  sensorsReady: function () {
    SC.RunLoop.begin();
    this.set('sensorIsReady', YES);
    if (this._inputStarted) {
      Smartgraphs.sendAction('sensorHasLoaded');
    }
    SC.RunLoop.end();
  },

  /**
    applet callback
  */
  dataReceived: function (type, numPoints, data) {
    
    if ( !(this._inputStarted && this._recording) ) {
      return;
    }
    
    var dt = this.get('dt');
    var downsampleRatio = this.get('downsampleRatio');
    var x, y;
    var point;
    
    for (var i = 0; i < numPoints; i++) {
      x = this._nsamples * dt;
      y = data[i];
      
      if (x > this.get('xMax')) {
        Smartgraphs.sendAction('stopSensor');
        return;
      }
      
      if ( this._nsamples % downsampleRatio === 0 ) {
        SC.RunLoop.begin();
        point = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, { x: x, y: y, guid: Smartgraphs.getNextGuid() });
        this._series.get('points').pushObject(point);
        Smartgraphs.store.commitRecords();
        SC.RunLoop.end();
      }
      this._nsamples++;
    }
  },
  
  /**
    applet callback (applet doesn't send useful information with this callback yet)
  */
  dataStreamEvent: function () {
  }

}) ;

/* >>>>>>>>>> BEGIN source/controllers/session.js */
// ==========================================================================
// Project:   Smartgraphs.sessionController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.sessionController = SC.ObjectController.create(
/** @scope Smartgraphs.sessionController.prototype */ {

  newSession: function () {
    var session = Smartgraphs.store.createRecord(Smartgraphs.Session, { steps: [] });
    session.set('user', Smartgraphs.userController.get('content'));
    session.set('id', Smartgraphs.getNextGuid());
    this.set('content', session);
    Smartgraphs.store.commitRecords();
  },
  
  createSeries: function (seriesName) {
    var newSeries = Smartgraphs.store.createRecord(Smartgraphs.DataSeries, { 
      isExample: NO,
      name: seriesName,
      points: []
    });
    newSeries.set('session', this.get('content'));
    newSeries.set('id', Smartgraphs.getNextGuid());
    Smartgraphs.store.commitRecords();
    
    return newSeries;
  },
  
  createAnnotation: function (annotationName, annotationType) {
    var newAnnotation = Smartgraphs.store.createRecord(annotationType, {
      isExample: NO,
      name: annotationName
    });
    newAnnotation.set('session', this.get('content'));
    newAnnotation.set('id', Smartgraphs.getNextGuid());
    
    return newAnnotation;
  },
  
  // TODO: change to 'copy example object to session' or the like. (but only if we really need that functionality)
  
  copyExampleSeries: function (exampleSeriesName, targetSeriesName) {
    // get the example series
    var query = SC.Query.local(
      Smartgraphs.DataSeries, 
      'isExample=YES AND name={seriesName}', 
      { seriesName: exampleSeriesName }
    );

    var exampleSeriesList = Smartgraphs.store.find(query);
    if (exampleSeriesList.get('length') < 1) return NO;
    
    var exampleSeries = exampleSeriesList.objectAt(0);
    
    // get the series we're copying into
    query = SC.Query.local(
      Smartgraphs.DataSeries,
      'isExample=NO AND session={session} AND name={seriesName}',
      { session: this.get('content'), name: targetSeriesName }
    );
    var targetSeriesList = Smartgraphs.store.find(query);
    
    if (targetSeriesList.get('length') < 1) return NO;
    var targetSeries = targetSeriesList.objectAt(0);
    
    // copy all the data points
    var examplePoints = exampleSeries.get('points');
    var point, newPoint;
    for (var i = 0, ii = examplePoints.get('length'); i < ii; i++) {
      point = examplePoints[i];
      newPoint = Smartgraphs.store.createRecord(Smartgraphs.DataPoint, { x: point.get('x'), y: point.get('y') });
      newPoint.set('id', Smartgraphs.getNextGuid());
      newPoint.set('series', targetSeries);
    }
    Smartgraphs.store.commitRecords();
    
    return YES;
  }
}) ;

/* >>>>>>>>>> BEGIN source/controllers/user.js */
// ==========================================================================
// Project:   Smartgraphs.userController
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Smartgraphs.userController = SC.ObjectController.create(
/** @scope Smartgraphs.userController.prototype */ {

}) ;

/* >>>>>>>>>> BEGIN source/data_sources/mock_responses/mock_responses.js */
// ==========================================================================
// Project:   Smartgraphs.mockResponses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

// Will contain mock JSON responses from the backend until we're happy with them.

Smartgraphs.mockResponses = {};
/* >>>>>>>>>> BEGIN source/data_sources/mock_responses/activity.js */
// ==========================================================================
// Project:   Smartgraphs.Activity mock server responses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// @author    Dewi Win <dwin@concord.org> (activity text)
// ==========================================================================
/*globals Smartgraphs */

sc_require('data_sources/mock_responses/mock_responses');

// starting Activity url
// generated on the console by running: 
//   Smartgraphs.mockResponsesForRecordType(Smartgraphs.Activity)

Smartgraphs.mockResponses["/backend/activity/1"] = 
{
  "title":            "Away and Toward",
  "url":              "/backend/activity/1",
  "pages":            [
    "/backend/activity/1/page/1",
    "/backend/activity/1/page/2",
    "/backend/activity/1/page/3",
    "/backend/activity/1/page/4",
    "/backend/activity/1/page/5",
    "/backend/activity/1/page/6",
    "/backend/activity/1/page/7",
    "/backend/activity/1/page/8",
    "/backend/activity/1/page/9",
    "/backend/activity/1/page/10",
    "/backend/activity/1/page/11"    
  ],
  "pageListUrl": "/backend/activity/1/pages"
};

// demo of a second activity
Smartgraphs.mockResponses["/backend/activity/2"] = 
{
  "title":            "Second Activity",
  "url":              "/backend/activity/2",
  "pages":            ["/backend/activity/2/page/1"],
  "pageListUrl":      "/backend/activity/2/pages"
};

// activity with new activity-step structure

Smartgraphs.mockResponses["/backend/activity/new-step"] = 
{
  "title":            "Activity Demonstrating New ActivityStep Structure",
  "url":              "/backend/activity/new-step",
  "pages":            ["/backend/activity/new-step/page/1"],
  "pageListUrl":      "/backend/activity/new-step/pages"
};

/* >>>>>>>>>> BEGIN source/data_sources/mock_responses/activity_page.js */
// ==========================================================================
// Project:   Smartgraphs.ActivityPage mock server responses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// @author    Dewi Win <dwin@concord.org> (activity text)
// ==========================================================================
/*globals Smartgraphs */

sc_require('data_sources/mock_responses/mock_responses');

// ActivityPage list url for first Activity
// generated on the console by running:
//   Smartgraphs.addStepListUrlsToPages()
//   a = Smartgraphs.store.find(Smartgraphs.Activity, '/backend/activity/1')
//   Smartgraphs.mockResponseForRecordArray(a.get('pages'), a.get('pageListUrl'))

// individual ActivityPage urls
// originally generated on the console by running: 
//   Smartgraphs.mockResponsesForRecordType(Smartgraphs.ActivityPage)

var page, pages = [];

page = Smartgraphs.mockResponses["/backend/activity/1/page/1"] = 
{
  "steps": [
    "/backend/activity/1/page/1/step/1"
  ],
  "name": "Introductory Page",
  "firstStep": "/backend/activity/1/page/1/step/1",
  "introText": "<h1>How can you tell a story about motion without using words?</h1>\n\n<p>The picture at right communicates direction of traffic using recognizable symbols. In this activity, you will explore how motions in two opposite directions appear on a position-time graph. By doing so, you will learn conventional methods of motion storytelling and analysis.</p>",
  "url": "/backend/activity/1/page/1",
  "activity": "/backend/activity/1",
  "index": 1,
  "stepListUrl": "/backend/activity/1/page/1/steps"
};
pages.push(page);

page = Smartgraphs.mockResponses["/backend/activity/1/page/2"] = 
{
  "steps": [
    "/backend/activity/1/page/2/step/1",
    "/backend/activity/1/page/2/step/2"
  ],
  "name": "Prediction Page",
  "firstStep": "/backend/activity/1/page/2/step/1",
  "introText": "<p>Let\u2019s start by demonstrating what you already know about representing motion on a graph. "+
               "Imagine a straight walking path that is 4 meters long. Point A is at the 0-meter mark. Point B is at "+
               "the 4-meter mark.</p>",
  "url": "/backend/activity/1/page/2",
  "activity": "/backend/activity/1",
  "index": 2,
  "stepListUrl": "/backend/activity/1/page/2/steps"
};
pages.push(page);

page = Smartgraphs.mockResponses["/backend/activity/1/page/3"] = 
{
  "steps": [
    "/backend/activity/1/page/3/step/1",
    "/backend/activity/1/page/3/step/2"
  ],
  "name": "Motion Sensor Page",
  "firstStep": "/backend/activity/1/page/3/step/1",
  "introText": "<p>Let\u2019s practice collecting data with the motion sensor so you can see whether your sketches "+
              "were accurate. You will walk on a 4-meter walking path like the one described earlier.</p>",
  "url": "/backend/activity/1/page/3",
  "activity": "/backend/activity/1",
  "index": 3,
  "stepListUrl": "/backend/activity/1/page/3/steps"
};
pages.push(page);

page = Smartgraphs.mockResponses["/backend/activity/1/page/4"] = 
{
  "steps": [
    "/backend/activity/1/page/4/step/1",
    "/backend/activity/1/page/4/step/2",
    "/backend/activity/1/page/4/step/3"
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/4/step/1",
  "introText": 
    "<p>To the right are your predictions. Now that you &quot;have the hang of it,&quot; you will walk "+
    "with the sensor to see if your sketches of forward and backward motion are correct.</p>",
  "url": "/backend/activity/1/page/4",
  "activity": "/backend/activity/1",
  "index": 4,
  "stepListUrl": "/backend/activity/1/page/4/steps"
};
pages.push(page);

page = Smartgraphs.mockResponses["/backend/activity/1/page/5"] = 
{
  "steps": [
    "/backend/activity/1/page/5/step/1",
    "/backend/activity/1/page/5/step/2"
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/5/step/1",
  "introText": 
    "<p>At right is the data you just collected with the motion sensor.</p>",
  "url": "/backend/activity/1/page/5",
  "activity": "/backend/activity/1",
  "index": 5,
  "stepListUrl": "/backend/activity/1/page/5/steps"
};
pages.push(page);
Smartgraphs.mockResponses["/backend/activity/1/pages"] = pages;


page = Smartgraphs.mockResponses["/backend/activity/1/page/6"] = 
{
  "steps": [
    "/backend/activity/1/page/6/step/1",
    "/backend/activity/1/page/6/step/2",
    "/backend/activity/1/page/6/step/3",
    "/backend/activity/1/page/6/step/4",
    "/backend/activity/1/page/6/step/5",
    "/backend/activity/1/page/6/step/6",
    "/backend/activity/1/page/6/step/7"        
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/6/step/1",
  "introText": 
    "<p>At right is a position-time graph created by someone walking in front of a motion sensor.</p>",
  "url": "/backend/activity/1/page/6",
  "activity": "/backend/activity/1",
  "index": 6,
  "stepListUrl": "/backend/activity/1/page/6/steps"
};
pages.push(page);

page = Smartgraphs.mockResponses["/backend/activity/1/page/7"] = 
{
  "steps": [
    "/backend/activity/1/page/7/step/1",
    "/backend/activity/1/page/7/step/2",
    "/backend/activity/1/page/7/step/3",
    "/backend/activity/1/page/7/step/4" 
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/7/step/1",
  "introText": 
    "<p>Now you will collect and analyze your own data once again.</p>",
  "url": "/backend/activity/1/page/7",
  "activity": "/backend/activity/1",
  "index": 7,
  "stepListUrl": "/backend/activity/1/page/7/steps"
};
pages.push(page);

page = Smartgraphs.mockResponses["/backend/activity/1/page/8"] = 
{
  "steps": [
    "/backend/activity/1/page/8/step/1",
    "/backend/activity/1/page/8/step/2",
    "/backend/activity/1/page/8/step/3",
    "/backend/activity/1/page/8/step/4",
    "/backend/activity/1/page/8/step/5",
    "/backend/activity/1/page/8/step/6"
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/8/step/1",
  "introText": 
    "<p>The position-time graph to the right includes two different data sets.</p>",
  "url": "/backend/activity/1/page/8",
  "activity": "/backend/activity/1",
  "index": 8,
  "stepListUrl": "/backend/activity/1/page/8/steps"
};
pages.push(page);


page = Smartgraphs.mockResponses["/backend/activity/1/page/9"] = 
{
  "steps": [
    "/backend/activity/1/page/9/step/1",
    "/backend/activity/1/page/9/step/2"    
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/9/step/1",
  "introText": 
    "<p>Look at the position-time graph to the right. You are going to recreate this graph as closely as "+
    "possible by walking in front of the motion sensor to collect position and time data.</p>",
  "url": "/backend/activity/1/page/9",
  "activity": "/backend/activity/1",
  "index": 9,
  "stepListUrl": "/backend/activity/1/page/9/steps"
};
pages.push(page);


page = Smartgraphs.mockResponses["/backend/activity/1/page/10"] = 
{
  "steps": [
    "/backend/activity/1/page/10/step/1",
    "/backend/activity/1/page/10/step/2",
    "/backend/activity/1/page/10/step/3"
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/10/step/1",
  "introText": 
    "<p>To the right are the sketches you drew at the beginning of this activity.</p>",
  "url": "/backend/activity/1/page/10",
  "activity": "/backend/activity/1",
  "index": 10,
  "stepListUrl": "/backend/activity/1/page/10/steps"
};
pages.push(page);


page = Smartgraphs.mockResponses["/backend/activity/1/page/11"] = 
{
  "steps": [
    "/backend/activity/1/page/11/step/1"
  ],
  "name": "Replay Page",
  "firstStep": "/backend/activity/1/page/11/step/1",
  "introText": 
    "<p>Congratulations! You have finished the activity.</p>",
  "url": "/backend/activity/1/page/11",
  "activity": "/backend/activity/1",
  "index": 10,
  "stepListUrl": "/backend/activity/1/page/11/steps"
};
pages.push(page);

Smartgraphs.mockResponses["/backend/activity/1/pages"] = pages;


// hand generated demo of second page
pages = [];

page = Smartgraphs.mockResponses["/backend/activity/2/page/1"] = 
{
  "steps": [
    "/backend/activity/2/page/1/step/1"
  ],
  "name": "First Page of Second Activity",
  "firstStep": "/backend/activity/2/page/1/step/1",
  "introText": "<h1>A Second Activity</h1>",
  "url": "/backend/activity/2/page/1",
  "activity": "/backend/activity/2",
  "index": 1,
  "stepListUrl": "/backend/activity/2/page/1/steps"
};
pages.push(page);

Smartgraphs.mockResponses["/backend/activity/2/pages"] = pages;


// for activity with new activity-step structure
pages = [];
page = Smartgraphs.mockResponses["/backend/activity/new-step/page/1"] = 
{
  "steps": [
    "/backend/activity/new-step/page/1/step/1",
    "/backend/activity/new-step/page/1/step/2",
    "/backend/activity/new-step/page/1/step/3"
  ],
  "name": "Only Page",
  "firstStep": "/backend/activity/new-step/page/1/step/1",
  "introText": "<h1>Watch the system respond!</h1>",
  "url": "/backend/activity/new-step/page/1",
  "activity": "/backend/activity/new-step",
  "index": 1,
  "stepListUrl": "/backend/activity/new-step/page/1/steps"
};
pages.push(page);

Smartgraphs.mockResponses["/backend/activity/new-step/pages"] = pages;
/* >>>>>>>>>> BEGIN source/data_sources/mock_responses/activity_step.js */
// ==========================================================================
// Project:   Smartgraphs.ActivityStep mock server responses
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// @author    Dewi Win <dwin@concord.org> (activity text)
// ==========================================================================
/*globals Smartgraphs */

sc_require('data_sources/mock_responses/mock_responses');

var step, steps = [];


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 1
****************************************************************************/

step = Smartgraphs.mockResponses["/backend/activity/1/page/1/step/1"] = 
{
  "url": "/backend/activity/1/page/1/step/1",
  "activityPage": "/backend/activity/1/page/1",
  "initialPaneConfig": 'single',
  "singleGraph": null,
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": '/static/smartgraphs/es/6dca466763f18fb87eebad83879709b4e8d9aa45/resources/arrow.jpg',
  "topImage": null,
  "bottomImage": null,
  "beforeText": "",
   "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": true,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": false
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/1/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 2
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/1/page/2/step/1"] =
{
  "url": "/backend/activity/1/page/2/step/1",
  "activityPage": "/backend/activity/1/page/2",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/1/prediction-away",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>In the top-right area, draw a graph of someone walking at a slow, steady pace from point A to point B "+
    "between 0 and 15 seconds.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
    { "action": "startFreehandInput",
      "literalArgs": {
        "pane": "top",
        "annotationName": "prediction-away"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/2/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};

steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/2/step/2"] =
{
  "url": "/backend/activity/1/page/2/step/2",
  "activityPage": "/backend/activity/1/page/2",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/1/prediction-away",
  "bottomGraph": "/backend/activity/1/graph/2/prediction-toward",
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
     "<p>In the bottom-right area, draw a graph of someone walking at a slow, steady pace from point B to point A "+
     "between 0 and 15 seconds. Click Next when you are done.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
    { "action": "startFreehandInput",
      "literalArgs": {
        "pane": "bottom",
        "annotationName": "prediction-toward"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/2/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 3
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/1/page/3/step/1"] = 
{
  "url": "/backend/activity/1/page/3/step/1",
  "activityPage": "/backend/activity/1/page/3",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/3/sensor-playing",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
     "<p><b>Place</b> the sensor at the 0-meter mark. <b>Stand</b> near the sensor. When you are ready, have your partner <b>click "+
     "Start</b> to record the position and time data for your movements. </p>"+
     "<p><b>Walk</b> on the path for 15 seconds. <b>Try</b> "+
     "different kinds of motions (walking fast, slow, forward, backward\u2026) <b>Click Stop</b> after 15 seconds are "+
     "up. <b>Click Reset</b> if you want to try again.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",  
      "literalArgs": {
        "pane": "top",
        "seriesName": "sensor-play"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/3/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/3/step/2"] = 
{
  "url": "/backend/activity/1/page/3/step/2",
  "activityPage": "/backend/activity/1/page/3",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/3/sensor-playing",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
     "<p>How are different motions represented on a position-time graph? (For example, what does the graph look "+
     "like when you are standing still, walking forward ...?)</p>"+
     "<p>Try to use some of the following words: slope, flat, upward, downward, curved, straight, steep, gradual, "+
     "line, curve.",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/3/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 4
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/1/page/4/step/1"] = 
{
  "url": "/backend/activity/1/page/4/step/1",
  "activityPage": "/backend/activity/1/page/4",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/4/graph-with-away-prediction',
  "bottomGraph": '/backend/activity/1/graph/5/graph-with-toward-prediction',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>First, <b>stand</b> close to the sensor, near the 0-meter mark. "+
    "When you are ready, have your partner <b>click Start</b> to record the position and time data for your "+
    "movements. "+
    "<p><b>Walk</b> on the path at a slow, steady pace, away from the sensor, for 15 seconds. <b>Click "+
    "Stop</b> after 15 seconds are up.",
  "responseTemplate": "",
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",  
      "literalArgs": {
        "pane": "top",
        "seriesName": "sensor-away"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/4/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/4/step/2"] = 
{
  "url": "/backend/activity/1/page/4/step/2",
  "activityPage": "/backend/activity/1/page/4",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/4/graph-with-away-prediction',
  "bottomGraph": '/backend/activity/1/graph/5/graph-with-toward-prediction',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>To make the second graph, <b>stand</b> approximately 4 meters away from the sensor on the path. When you "+
    "are ready, have your partner <b>click Start</b> to record the position and time data for your movements. "+
    "<p><b>Walk</b> on the path at the same slow, steady pace, toward the sensor, for 15 seconds. <b>Click Stop</b> "+
    "after 15 seconds are up.",
  "responseTemplate": "",
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",  
      "literalArgs": {
        "pane": "bottom",
        "seriesName": "sensor-toward"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/4/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/4/step/3"] = 
{
  "url": "/backend/activity/1/page/4/step/3",
  "activityPage": "/backend/activity/1/page/4",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/4/graph-with-away-prediction',
  "bottomGraph": '/backend/activity/1/graph/5/graph-with-toward-prediction',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>How closely do the graphs of your data match your original sketches?</p>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);
Smartgraphs.mockResponses["/backend/activity/1/page/4/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 5
****************************************************************************/

steps = [];
step = Smartgraphs.mockResponses["/backend/activity/1/page/5/step/1"] = 
{
  "url": "/backend/activity/1/page/5/step/1",
  "activityPage": "/backend/activity/1/page/5",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/6/sensor-away',
  "bottomGraph": '/backend/activity/1/graph/7/sensor-toward',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>How are the two position-time graphs <b>similar</b> to each other?</p>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/5/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/5/step/2"] = 
{
  "url": "/backend/activity/1/page/5/step/2",
  "activityPage": "/backend/activity/1/page/5",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/6/sensor-away',
  "bottomGraph": '/backend/activity/1/graph/7/sensor-toward',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>How does motion away from the sensor <b>differ</b> from motion toward the sensor on a position-time "+
    "graph?</b>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/5/steps"] = steps;

/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 6
****************************************************************************/
steps = [];
step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/1"] = 
{
  "url": "/backend/activity/1/page/6/step/1",
  "activityPage": "/backend/activity/1/page/6",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/8/walking-example-1',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>What happened at the red point?</p>",
  "responseTemplate": "/backend/response-template/3/walking-example-1",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": ["value", 1]
      },
      "step": "/backend/activity/1/page/6/step/5"
    },
    { "criterion": { 
        "equals": ["value", 2]
      },
      "step": "/backend/activity/1/page/6/step/2"
    },
    { "criterion": { 
        "equals": ["value", 3]
      },
      "step": "/backend/activity/1/page/6/step/3"
    },
    { "criterion": { 
        "equals": ["value", 4]
      },
      "step": "/backend/activity/1/page/6/step/4"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/6/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/2"] = 
{
  "url": "/backend/activity/1/page/6/step/2",
  "activityPage": "/backend/activity/1/page/6",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/8/walking-example-1',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
    "<p>What happened at the red point?</p>",
  "responseTemplate": "/backend/response-template/3/walking-example-1",
  "afterText":  "<p><b>Incorrect.</b> Look at the walker's position at the red point.</p>",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": ["value", 1]
      },
      "step": "/backend/activity/1/page/6/step/5"
    },
    { "criterion": { 
        "equals": ["value", 2]
      },
      "step": "/backend/activity/1/page/6/step/2"
    },
    { "criterion": { 
        "equals": ["value", 3]
      },
      "step": "/backend/activity/1/page/6/step/3"
    },
    { "criterion": { 
        "equals": ["value", 4]
      },
      "step": "/backend/activity/1/page/6/step/4"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/6/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/3"] = 
{
  "url": "/backend/activity/1/page/6/step/3",
  "activityPage": "/backend/activity/1/page/6",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/8/walking-example-1',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
    "<p>What happened at the red point?</p>",
  "responseTemplate": "/backend/response-template/3/walking-example-1",
  "afterText": "<p><b>Incorrect.</b> Was the walker 2 meters away at the red point?</p>", 
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": ["value", 1]
      },
      "step": "/backend/activity/1/page/6/step/5"
    },
    { "criterion": { 
        "equals": ["value", 2]
      },
      "step": "/backend/activity/1/page/6/step/2"
    },
    { "criterion": { 
        "equals": ["value", 3]
      },
      "step": "/backend/activity/1/page/6/step/3"
    },
    { "criterion": { 
        "equals": ["value", 4]
      },
      "step": "/backend/activity/1/page/6/step/4"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/6/step/4",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/4"] = 
{
  "url": "/backend/activity/1/page/6/step/4",
  "activityPage": "/backend/activity/1/page/6",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/8/walking-example-1',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
    "<p>What happened at the red point?</p>",
  "responseTemplate": "/backend/response-template/3/walking-example-1",
  "afterText": "<p><b>Incorrect.</b> Look at the walker's direction after the red point.</p>",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals": ["value", 1]
      },
      "step": "/backend/activity/1/page/6/step/5"
    },
    { "criterion": { 
        "equals": ["value", 2]
      },
      "step": "/backend/activity/1/page/6/step/2"
    },
    { "criterion": { 
        "equals": ["value", 3]
      },
      "step": "/backend/activity/1/page/6/step/3"
    },
    { "criterion": { 
        "equals": ["value", 4]
      },
      "step": "/backend/activity/1/page/6/step/4"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/6/step/5",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/5"] = 
{
  "url": "/backend/activity/1/page/6/step/5",
  "activityPage": "/backend/activity/1/page/6",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/8/walking-example-1',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
    "<p><b>Correct!</b> At this point, the walker was 4 meters away, getting ready to walk toward the sensor.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": {
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/6/step/6",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/6/step/6"] = 
{
  "url": "/backend/activity/1/page/6/step/6",
  "activityPage": "/backend/activity/1/page/6",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/8/walking-example-1',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
  "<p>What is a good strategy for finding out what is happening at a given point in a position-time graph?</p>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "",
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/6/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 7
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/1/page/7/step/1"] = 
{
  "url": "/backend/activity/1/page/7/step/1",
  "activityPage": "/backend/activity/1/page/7",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/3/sensor-playing",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
    "<p><b>Stand</b> at a starting point <b>other</b> than the 0-meter mark. When you are ready, have your "+
    "partner <b>click Start</b> to record the position and time data for your movements. </p>"+
    "<p><b>Walk</b> on the path for 15 seconds, experimenting with different directions and speeds. "+
    "<b>Click Stop</b> after 15 seconds are up.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",  
      "literalArgs": {
        "pane": "top",
        "seriesName": "sensor-play-2"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/7/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/7/step/2"] = 
{
  "url": "/backend/activity/1/page/7/step/2",
  "activityPage": "/backend/activity/1/page/7",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/3/sensor-playing",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
     "<p>What is the significance of the y-intercept (the y-value of the point where the graph crosses the "+
     "y-axis) of the position-time graph?</p>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/7/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/7/step/3"] = 
{
  "url": "/backend/activity/1/page/7/step/3",
  "activityPage": "/backend/activity/1/page/7",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/3/sensor-playing",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
     "<p>Explain how the graph conveys how fast you walked.</p>", 
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/7/step/4",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/7/step/4"] = 
{
  "url": "/backend/activity/1/page/7/step/4",
  "activityPage": "/backend/activity/1/page/7",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/3/sensor-playing",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
     "<p>How is direction represented on the graph?</p>", 
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/7/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 8
****************************************************************************/

steps = [];
step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/1"] = 
{
  "url": "/backend/activity/1/page/8/step/1",
  "activityPage": "/backend/activity/1/page/8",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/9/two-walkers',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Which of the following motion scenarios could have resulted in this graph?</p>",
  "responseTemplate": "/backend/response-template/4/two-walkers",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals" : ["value", 2]
      },
      "step": "/backend/activity/1/page/8/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/8/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/2"] = 
{
  "url": "/backend/activity/1/page/8/step/2",
  "activityPage": "/backend/activity/1/page/8",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/9/two-walkers',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Which of the following motion scenarios could have resulted in this graph?</p>",
  "responseTemplate": "/backend/response-template/4/two-walkers",
  "afterText": "<p><b>Incorrect.</b> Two data sets are represented on one graph. Analyze each set of data.</p>",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals" : ["value", 2]
      },
      "step": "/backend/activity/1/page/8/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/8/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/3"] = 
{
  "url": "/backend/activity/1/page/8/step/3",
  "activityPage": "/backend/activity/1/page/8",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/9/two-walkers',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Which of the following motion scenarios could have resulted in this graph?</p>",
  "responseTemplate": "/backend/response-template/4/two-walkers",
  "afterText": "<p><b>Incorrect.</b> Figure out where each person started and ended.</p>",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals" : ["value", 2]
      },
      "step": "/backend/activity/1/page/8/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/8/step/4",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/4"] = 
{
  "url": "/backend/activity/1/page/8/step/4",
  "activityPage": "/backend/activity/1/page/8",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/9/two-walkers',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Which of the following motion scenarios could have resulted in this graph?</p>",
  "responseTemplate": "/backend/response-template/4/two-walkers",
  "afterText": "<p><b>Incorrect.</b> Think about the direction each walker moved from the starting point.</p>",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": ["value", [1, 2, 3, 4]]
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "responseBranches": [
    { "criterion": { 
        "equals" : ["value", 2]
      },
      "step": "/backend/activity/1/page/8/step/6"
    }
  ],
  "defaultBranch": "/backend/activity/1/page/8/step/5",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/5"] = 
{
  "url": "/backend/activity/1/page/8/step/5",
  "activityPage": "/backend/activity/1/page/8",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/9/two-walkers',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p><b>Still incorrect.</b> Both walkers started 2 meters away. Then, one walked toward the sensor for 20 seconds, "+
    "while the other walked away from the sensor during the same 20 seconds.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": null,
  "submissibilityCriterion": {
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
  },
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": true
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/8/step/6"] = 
{
  "url": "/backend/activity/1/page/8/step/6",
  "activityPage": "/backend/activity/1/page/8",
  "initialPaneConfig": 'single',
  "singleGraph": '/backend/activity/1/graph/9/two-walkers',
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p><b>Correct!</b> Both walkers started 2 meters away. Then, one walked toward the sensor for 20 seconds, "+
    "while the other walked away from the sensor during the same 20 seconds.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": null,
  "submissibilityCriterion": {
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
  },
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/8/steps"] = steps;

steps = [];

/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 9
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/1/page/9/step/1"] = 
{
  "url": "/backend/activity/1/page/9/step/1",
  "activityPage": "/backend/activity/1/page/9",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/10/graph-to-match",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText":
     "<p><b>Move</b> to your starting point and, when you are ready, have your partner <b>click Start</b> to record "+
     "the data for your movements. "+
     "<p><b>Walk</b> on the path for 15 seconds while trying to match the given graph. "+
     "<b>Click stop</b> after 15 seconds are up.</p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
    { "action": "startSensorInput",  
      "literalArgs": {
        "pane": "top",
        "seriesName": "sensor-match"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/9/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/9/step/2"] = 
{
  "url": "/backend/activity/1/page/9/step/2",
  "activityPage": "/backend/activity/1/page/9",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/10/graph-to-match",
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
     "<p>How closely does your graph match the given graph? What could you have done to match the given graph "+
     "more closely?",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/9/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 10
****************************************************************************/

steps = [];
step = Smartgraphs.mockResponses["/backend/activity/1/page/10/step/1"] = 
{
  "url": "/backend/activity/1/page/10/step/1",
  "activityPage": "/backend/activity/1/page/10",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/4/graph-with-away-prediction',
  "bottomGraph": '/backend/activity/1/graph/5/graph-with-toward-prediction',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Write down <b>3</b> things you have learned about motion since you started this activity.</p>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/10/step/2",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/10/step/2"] = 
{
  "url": "/backend/activity/1/page/10/step/2",
  "activityPage": "/backend/activity/1/page/10",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/4/graph-with-away-prediction',
  "bottomGraph": '/backend/activity/1/graph/5/graph-with-toward-prediction',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Describe <b>2</b> segments of the graphs and describe what is happening in each.</p>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": "/backend/activity/1/page/10/step/3",
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "OK",
  "nextButtonShouldSubmit": false
};
steps.push(step);


step = Smartgraphs.mockResponses["/backend/activity/1/page/10/step/3"] = 
{
  "url": "/backend/activity/1/page/10/step/3",
  "activityPage": "/backend/activity/1/page/10",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": '/backend/activity/1/graph/4/graph-with-away-prediction',
  "bottomGraph": '/backend/activity/1/graph/5/graph-with-toward-prediction',
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Describe <b>1</b> type of motion you would like to try with the motion sensor.</p>",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "gt": [{ "length" : { "strip":  "value" }}, 0]
  },
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": true
};
steps.push(step);
Smartgraphs.mockResponses["/backend/activity/1/page/10/steps"] = steps;


/****************************************************************************
*    Activity 1 (Moving Away and Toward)
*    Page 11 (end page)
****************************************************************************/

steps = [];
step = Smartgraphs.mockResponses["/backend/activity/1/page/11/step/1"] = 
{
  "url": "/backend/activity/1/page/11/step/1",
  "activityPage": "/backend/activity/1/page/11",
  "initialPaneConfig": 'single',
  "singleGraph": null,
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": '/static/smartgraphs/es/6dca466763f18fb87eebad83879709b4e8d9aa45/resources/arrow.jpg',
  "topImage": null,
  "bottomImage": null,
  "beforeText": "",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": false
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/1/page/11/steps"] = steps;


/****************************************************************************
*    Activity 2 (Demo of Activity Switching)
*    Page 1
****************************************************************************/


steps = [];
step = Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1"] = 
{
  "url": "/backend/activity/2/page/1/step/1",
  "activityPage": "/backend/activity/2/page/1",
  "initialPaneConfig": 'single',
  "singleGraph": "/backend/activity/1/graph/1/prediction-away",
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": 
    "<p>Try visiting the first activity by changing just the last digit of the URL from '2' to '1' and hitting "+
    "Enter.<p>"+
    "<p>Also, you can now resize the browser window without scrambling the prediction graph on the right.</p>",
  "responseTemplate": "",
  "afterText": "",
  "startCommands": [
    { "action": "startFreehandInput",
      "literalArgs": {
        "pane": "single",
        "annotationName": "prediction-away"
      }
    }
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": true,
  "submitButtonTitle": "",
  "nextButtonShouldSubmit": false
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/2/page/1/steps"] = steps;


/****************************************************************************
*    Activity 'new-step' (Testbed for activity step refactoring)
*    Page 1
****************************************************************************/

steps = [];

step = Smartgraphs.mockResponses["/backend/activity/new-step/page/1/step/1"] = 
{
  "url": "/backend/activity/new-step/page/1/step/1",
  "activityPage": "/backend/activity/new-step/page/1",
  "initialPaneConfig": 'single',
  "singleGraph": null,
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": '/static/smartgraphs/es/6dca466763f18fb87eebad83879709b4e8d9aa45/resources/arrow.jpg',
  "topImage": null,
  "bottomImage": null,
  "beforeText": "<p>How many panes would you like to see on the next page? Enter 'one' or 'two': ",
  "responseTemplate": "/backend/response-template/2/open",
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": true,
  "submissibilityInspector": {
    "type": "Smartgraphs.FirstResponseFieldInspector"
  },
  "submissibilityCriterion": {
    "in": [{ "strip":  "value" }, ["one", "two"]] 
  },
  "triggeredCommands": [
  ],
  "responseInspector": {
    "type": "Smartgraphs.ResponseFieldsInspector",
    "config": {
      "fieldIndex": 0
    }
  },
  "responseBranches": [
    { "criterion": { 
        "equals": [ {"strip" : "value" }, "one" ] 
      },
      "step": "/backend/activity/new-step/page/1/step/2"
    },
    { "criterion": { 
        "equals": [ {"strip" : "value" }, "two" ] 
      },
      "step": "/backend/activity/new-step/page/1/step/3"
    }
  ],
  "defaultBranch": null,
  "isFinalStep": false,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "Show me!",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/new-step/page/1/step/2"] = 
{
  "url": "/backend/activity/new-step/page/1/step/2",
  "activityPage": "/backend/activity/new-step/page/1",
  "initialPaneConfig": 'single',
  "singleGraph": "/backend/activity/1/graph/1/prediction-away",
  "topGraph": null,
  "bottomGraph": null,
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": "<p>Enjoy the single pane on the right!<p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "I saw it!",
  "nextButtonShouldSubmit": false
};
steps.push(step);

step = Smartgraphs.mockResponses["/backend/activity/new-step/page/1/step/3"] = 
{
  "url": "/backend/activity/new-step/page/1/step/3",
  "activityPage": "/backend/activity/new-step/page/1",
  "initialPaneConfig": 'split',
  "singleGraph": null,
  "topGraph": "/backend/activity/1/graph/1/prediction-away",
  "bottomGraph": "/backend/activity/1/graph/2/prediction-toward",
  "singleImage": null,
  "topImage": null,
  "bottomImage": null,
  "beforeText": "<p>Enjoy the split pane on the right!<p>",
  "responseTemplate": null,
  "afterText": "",
  "startCommands": [
  ],
  "shouldFinishImmediately": false,
  "shouldWaitForSubmissibleResponse": false,
  "submissibilityInspector": null,
  "submissibilityCriterion": null,
  "triggeredCommands": [
  ],
  "responseInspector": null,
  "responseBranches": [
  ],
  "defaultBranch": null,
  "isFinalStep": true,
  "shouldAutoAdvancePage": false,
  "hideSubmitButton": false,
  "submitButtonTitle": "I saw it!",
  "nextButtonShouldSubmit": false
};
steps.push(step);

Smartgraphs.mockResponses["/backend/activity/new-step/page/1/steps"] = steps;
/* >>>>>>>>>> BEGIN source/data_sources/rest.js */
// ==========================================================================
// Project:   Smartgraphs.RestDataSource
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// @author    Kofi Weusijana <babakofi@gmail.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Smartgraphs backend.

  @extends SC.DataSource
*/
Smartgraphs.RestDataSource = SC.DataSource.extend(
/** @scope Smartgraphs.RestDataSource.prototype */
{

  // latency for mock retrieval
  latency: 10,

  // ..........................................................
  // QUERY SUPPORT
  // 
  fetch: function(store, query) {

    var activity, listUrl, page, step;

    this.log('RestDataSource.fetch()');

    // this all suggests an obvious pattern for handling queries whose contents are fetched at listUrls

    // As we develop the backend, we need to mix mock requests and live requests.
    // Here we use the pattern that if the listUrl is null, then the backend doesn't yet return what is wanted
    // at that listUrl and we should make a mock request instead.
    // (and we must guess what listUrl should be based on the query)
    
    if (query.get('isPagesQuery')) {
      activity = query.get('parameters').activity;
      listUrl = activity.get('pageListUrl');

      var pagesQueryUrl = activity.get('id');
      this.log('  Query: pagesQuery for Activity %s', pagesQueryUrl);
      this.log('  URL endpoint for query: %s', listUrl);

      if (listUrl === null) {
        // guess what listUrl should be based on the query and make a mock request
        listUrl = pagesQueryUrl + "/pages";
        this.log('  Mock URL endpoint for query: %s', listUrl);
        this.invokeLater(this._mockRequestListFromServer, this.get('latency'), store, query, listUrl);
      } 
      else {
        this.requestListFromServer(store, query, listUrl);
      }
      this.log('  returning YES from fetch');
      return YES;
    }
    else if (query === Smartgraphs.ALL_COMMANDS_QUERY) {
      this.log('  Query: ALL_COMMANDS_QUERY');
      listUrl = Smartgraphs.activityController.get('commandListUrl');
      this.log('  URL endpoint for query: %s', listUrl);
      if (listUrl === null) {
        // guess what listUrl should be based on the query and make a mock request
        listUrl = "/backend/commands";
        this.log('  Mock URL endpoint for query: %s', listUrl);
        this.invokeLater(this._mockRequestListFromServer, this.get('latency'), store, query, listUrl);
      } else {
        this.requestListFromServer(store, query, listUrl);
      }
      return YES;
    }
    else if (query === Smartgraphs.ALL_TRIGGERS_QUERY) {
      this.log('  Query: ALL_TRIGGERS_QUERY');
      listUrl = Smartgraphs.activityController.get('triggerListUrl');
      this.log('  URL endpoint for query: %s', listUrl);
      if (listUrl === null) {
        // guess what listUrl should be based on the query and make a mock request
        listUrl = "/backend/triggers";
        this.log('  Mock URL endpoint for query: %s', listUrl);
        this.invokeLater(this._mockRequestListFromServer, this.get('latency'), store, query, listUrl);
      } else {
        this.requestListFromServer(store, query, listUrl);
      }
      return YES;
    }
    else if (query.get('isStepsQuery')) {
      page = query.get('parameters').page;
      var stepsQueryUrl = page.get('id');
      this.log('  Query: stepsQuery for ActivityPage %s', stepsQueryUrl);
      listUrl = page.get('stepListUrl');
      this.log('  URL endpoint for query: %s', listUrl);
      if (listUrl === null) {
        // guess what listUrl should be based on the query and make a mock request
        listUrl = stepsQueryUrl + "/steps";
        this.log('  Mock URL endpoint for query: %s', listUrl);
        this.invokeLater(this._mockRequestListFromServer, this.get('latency'), store, query, listUrl);
      } else {
        this.requestListFromServer(store, query, listUrl);
      }
      return YES;
    }
    else if (query.get('isTriggerResponsesQuery')) {
      step = query.get('parameters').step;
      this.log('  Query: triggerResponsesQuery for ActivityStep %s', step.get('id'));
      listUrl = step.get('triggerResponseListUrl');
      this.log('  URL endpoint for query: %s', listUrl);
      // Check to see if Triggers are implemented on the backend yet
      if (this.get('isTriggerResponsesOnBackend') ){
        this.requestListFromServer(store, query, listUrl);
      } else {
        this.log('  Mock URL endpoint for query: %s', listUrl);
        this.invokeLater(this._mockRequestListFromServer, this.get('latency'), store, query, listUrl);
      }
      return YES;
    }
    else if (query.get('isCommandInvocationsQuery')) {
      step = query.get('activityStep');
      this.log('  Query: commandInvocationsQuery for ActivityStep %s', step.get('id'));
      listUrl = step.get('commandListUrl');
      this.log('  URL endpoint for query: %s', listUrl);
      // Check to see if CommandInvocations are implemented on the backend yet
      if (this.get('isCommandInvocationsOnBackend') ){
        this.requestListFromServer(store, query, listUrl);
      } else {
        this.log('  Mock URL endpoint for query: %s', listUrl);
        this.invokeLater(this._mockRequestListFromServer, this.get('latency'), store, query, listUrl);
      }
      return YES;
    }

    return NO; // return YES if you handled the query
  },

  // ..........................................................
  // BULK RECORD SUPPORT
  //
  retrieveRecords: function(store, storeKeys, ids) {
    this.log('RestDataSource.retrieveRecords(storeKeys=%s)', storeKeys.toString());
    arguments.callee.base.apply(this,arguments);
  },

  // ..........................................................
  // RECORD SUPPORT
  // 
  retrieveRecord: function(store, storeKey) {

    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    var recordType = Smartgraphs.store.recordTypeFor(storeKey);

    this.log('RestDataSource.retrieveRecord()');
    this.log('  Record type requested = %s', recordType.toString());
    this.log('  id requested = %s', Smartgraphs.store.idFor(storeKey));

    if ((recordType === Smartgraphs.Activity) || recordType === Smartgraphs.ActivityPage) {
      this.requestRecordFromServer(store, storeKey);
      this.log('  returning YES from retrieveRecord');
      return YES;
    }

    return NO; // return YES if you handled the storeKey
  },

  createRecord: function(store, storeKey) {

    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    this.log('RestDataSource.createRecord()');
    return NO; // return YES if you handled the storeKey
  },

  updateRecord: function(store, storeKey) {

    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.
    this.log('RestDataSource.updateRecord()');
    return NO; // return YES if you handled the storeKey
  },

  destroyRecord: function(store, storeKey) {

    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    this.log('RestDataSource.destroyRecord()');
    return NO; // return YES if you handled the storeKey
  },

  // ..........................................................
  // REQUEST AND RESPONSE - SINGLE RECORDS
  //
  requestRecordFromServer: function(store, storeKey) {
    // The url IS the id. As it should be.
    var url = store.idFor(storeKey);

    if (Smartgraphs.get('useMockResponses')) {
      this.invokeLater(this._mockRequestRecordFromServer, this.get('latency'), store, storeKey);
    }
    else {
      SC.Request.getUrl(url).notify(this, this.didRetrieveRecordFromServer, {
        store: store,
        storeKey: storeKey
      }).header('Accept', 'application/json').json().send();
    }
  },

  _mockRequestRecordFromServer: function(store, storeKey) {
    var url = store.idFor(storeKey);
    var response = Smartgraphs.mockResponses.hasOwnProperty(url) ? SC.Object.create({
      body: Smartgraphs.mockResponses[url]
    }) : SC.Error.create();

    this.didRetrieveRecordFromServer(response, {
      store: store,
      storeKey: storeKey
    });
  },

  didRetrieveRecordFromServer: function(response, params) {
    var store = params.store;
    var storeKey = params.storeKey;

    var recordType = Smartgraphs.store.recordTypeFor(storeKey);

    this.log('RestDataSource.didRetrieveRecordFromServer()');
    this.log('  Record type requested = %s', recordType.toString());
    this.log('  id requested = %s', Smartgraphs.store.idFor(storeKey));

    if (SC.ok(response)) {
      this.log('  ...SUCCESS');
      store.dataSourceDidComplete(storeKey, this.camelizeKeys(response.get('body')));
    }
    else {
      this.log('  ...FAILURE');
      store.dataSourceDidError(storeKey);
    }
  },

  // ..........................................................
  // REQUEST AND RESPONSE - MULTIPLE RECORDS
  //
  /** request multiple records from listUrl in order to satisfy query */

  requestListFromServer: function(store, query, listUrl) {
    if (Smartgraphs.get('useMockResponses')) {
      this.invokeLater(this._mockRequestListFromServer, this.get('latency'), store, query, listUrl);
    }
    else {
      SC.Request.getUrl(listUrl).notify(this, this.didRetrieveListFromServer, {
        store: store,
        query: query
      }).header('Accept', 'application/json').json().send();
    }
  },

  _mockRequestListFromServer: function(store, query, listUrl) {
    var response = Smartgraphs.mockResponses.hasOwnProperty(listUrl) ? SC.Object.create({
      body: Smartgraphs.mockResponses[listUrl]
    }) : SC.Error.create();
    this.didRetrieveListFromServer(response, {
      store: store,
      query: query
    });
  },

  didRetrieveListFromServer: function(response, params) {
    var store = params.store;
    var query = params.query;

    var recordType = query.get('recordType');
    this.log('RestDataSource.didRetrieveListFromServer()');
    this.log('  Record type requested = %s', recordType.toString());

    if (SC.ok(response)) {
      this.log('  ...SUCCESS');
      var dataHashes = response.get('body').map(function(hash) {
        return this.camelizeKeys(hash);
      },
      this);
      store.loadRecords(recordType, dataHashes);
      store.dataSourceDidFetchQuery(query);
    }
    else {
      this.log('  ...FAILURE');
      store.dataSourceDidErrorQuery(query);
    }
  },

  // ..........................................................
  // SUPPORT
  //
  /** turn snake_cased_fields from server into JS-friendly camelCasedPropertyNames */
  camelizeKeys: function(hash) {
    var ret = {};
    for (var key in hash) {
      if (hash.hasOwnProperty(key)) {
        ret[key.camelize()] = hash[key];
      }
    }
    return ret;
  },

  log: function() {
    if (Smartgraphs.get('logDataSource')) {
      console.log.apply(console, arguments);
    }
  }

});

/* >>>>>>>>>> BEGIN source/models/activity_page.js */
// ==========================================================================
// Project:   Smartgraphs.ActivityPage
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A ActivityPage is one 'page' in a learner Activity (which steps learners through a complicated learning activity, and 
  helps them generate various artifacts during that acitivity, such as a lab book or slide show presentation) 

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.ActivityPage = SC.Record.extend(
/** @scope Smartgraphs.ActivityPage.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /**
    The Activity this ActivityPage belongs to.
  */
  activity: SC.Record.toOne('Smartgraphs.Activity',  { inverse: 'pages', isMaster: YES }),

  /**
    A name for this ActivityPage; to be exposed to authors and, possibly, to learners as the heading of the page.
  */
  name: SC.Record.attr(String),

  /**
    The order of this ActivityPage in the Activity, relative to other pages. Note that this means, at least for now,
    we're not implementing a tree or branching structure of ActivityPages.
  */
  index: SC.Record.attr(Number),

  /**
    The text that sets up the problem to be solved in this page. Remains on the screen for the duration of this
    ActivityPage.
  */
  introText: SC.Record.attr(String),

  /**
    All ActivitySteps associated with this ActivityPage.
  */
  steps: SC.Record.toMany('Smartgraphs.ActivityStep', { inverse: 'activityPage' }),
  
  /**
    The one ActivityStep to open first.
  */
  firstStep: SC.Record.toOne('Smartgraphs.ActivityStep'),
  
  // TODO!! This needs to migrate to session
  /**
    @private
    The ActivityPage context (variables). This would include things like responses that were deemed acceptable at the end
    of the last ActivityStep, and therefore promoted to the ActivityPage context so that they can be referenced by subsequent
    ActivitySteps
  */
  context: {},
  
  /**
    @private
    Whether the ActivityPage is selectable or not
  */
  isSelectable: NO,

  /**
    server endpoint for finding associated steps
  */
  stepListUrl: SC.Record.attr(String),
  
  /**
    a local SC.Query that returns all the ActivitySteps associated with this page. Used to signal the data
    source to fetch these records from the server.
  */
  stepsQuery: function () {
    // cacheable, so DataStore only ever sees one stepsQuery instance per ActivityPage record
    return SC.Query.create({
      isStepsQuery: YES,                       // so the data source can interpret what query we are
      recordType: Smartgraphs.ActivityStep,
      conditions: 'page = {page}',
      parameters: { page: this }
    });
  }.property().cacheable()

}) ;

/* >>>>>>>>>> BEGIN source/fixtures/activity_page.js */
// ==========================================================================
// Project:   Smartgraphs.ActivityPage Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// @author    Dewi Win <dwin@concord.org> (activity text)
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/activity_page');

Smartgraphs.ActivityPage.FIXTURES = [

];

/* >>>>>>>>>> BEGIN source/models/activity_step.js */
// ==========================================================================
// Project:   Smartgraphs.ActivityStep
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.ActivityStep = SC.Record.extend(
/** @scope Smartgraphs.ActivityStep.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /** 
    The ActivityPage this ActivityStep is a part of.
  */
  activityPage: SC.Record.toOne('Smartgraphs.ActivityPage', { inverse: 'steps', isMaster: YES }),
  
  /**
    Whether to show a split pane or single pane
  */  
  initialPaneConfig: SC.Record.toOne(String),
  
  singleGraph: SC.Record.toOne('Smartgraphs.Graph'),
  topGraph: SC.Record.toOne('Smartgraphs.Graph'),
  bottomGraph: SC.Record.toOne('Smartgraphs.Graph'),
  
  singleImage: SC.Record.attr(String),
  topImage: SC.Record.attr(String),
  bottomImage: SC.Record.attr(String),
  
  /**
    Text to display *before* the response template
  */
  beforeText: SC.Record.attr(String),                                           
  
  /** 
    The responseTemplate. If null, none is shown. If set to a ResponseTemplate, it displays an 'input form' between
    the beforeText and the afterText
  */
  responseTemplate: SC.Record.toOne('Smartgraphs.ResponseTemplate'),
  
  /**
    Text to display *after* the response template
  */
  afterText: SC.Record.attr(String),

  /** 
    The list of commands (and their arguments) to be run when this ActivityStep is loaded.
  */
  startCommands: SC.Record.attr(Array),
  
  /**
    Whether to 'submit' (aka finish) automatically as soon as the startCommands execute, or whether to wait for
    the user to click 'submit'/'done' button
  */
  shouldFinishImmediately: SC.Record.attr(Boolean),
  
  /**
    Whether to turn submissibility off at the beginning of the step and wait for submissibility to become true
    before allowing the user to click submit/done.
    (The alternative is that the user can click 'done' without taking any prior step, as we might want if the step is
    purely informative or if the users' action is optional.)
  */
  shouldWaitForSubmissibleResponse: SC.Record.attr(Boolean),
  
  /**
    a hash that contains:
      the class name of the Inspector that checks system state for submissibility
      a config hash to be passed to the inspector when created
  */
  submissibilityInspector: SC.Record.attr(Object),

  /** 
    JSON expression tree to be used to convert the Inspector's output to a YES or NO answer.
  */
  submissibilityCriterion: SC.Record.attr(Object),
  
  /**
    A list of (systemInspector, triggerCriterion, onCommands, offCommands) sets
      * the systemInspector is registered to observe the system state while the step is waiting and produce a
        value whenever the relevant state changes
      * the triggerCriterion turns the value into a boolean
      * when the boolean goes from NO to YES, the onCommands are run
      * when the boolean goes from YES to NO, the offCommands are run
      
      (Possible improvement: each systemInspector gets a *list* of (triggerCriterion, onCommand, offCommand) sets
      
      These can do things like run commands immediately when the student's graph acquires certain features
  */
  triggeredCommands: SC.Record.toMany('Smartgraphs.TriggeredCommands'),  
  
  /**
    a hash that contains:
      the class name of the Inspector that checks the user's submitted response, if any.
      a config hash to be passed to the inspector when created
  */
  responseInspector: SC.Record.attr(Object),
  
  /**
    An ordered list of criterion -> ActivityStep pairs
    
    After response is submitted, each criterion is evaluated in order, with the return value of the responseInspector
    as the value . The system jumps to the ActivityStep associated with the first criterion that evaluates to YES.
    
    Think of an if-else chain.
    
    If no reactionCriterion evaluates to YES, the defaultBranch is jumped to, if it exists
  */
  responseBranches: SC.Record.attr(Array),
  
  defaultBranch: SC.Record.toOne('Smartgraphs.ActivityStep'),
  
  /** 
    If, after the step is finished/submitted, we don't jump to any new step *AND* isFinalStep === NO for this step,
    we know there was an error.
  */
  isFinalStep: SC.Record.attr(Boolean),
  
  /**
    if we are the last step, whether to automatically skip to the next page when this step finishes.
    FIXME. Different from nextButtonShouldSubmit because (nominally) it leaves the submit button visible and the next
    button hidden; unsure if we want to implement both this and nextButtonShouldSubmit
  */
  shouldAutoAdvancePage: SC.Record.attr(Boolean),
  
  /**
     Whether the submit/done button needs to be hidden or not
     Might be YES for steps that submit automatically when the student's responses acquires certain characteristics
  */
  hideSubmitButton: SC.Record.attr(Boolean),

  /**
    The title of the submit/done button
  */
  submitButtonTitle: SC.Record.attr(String),
  
  /**
    Whether the 'next page' button should do double duty and also submit the step. If YES, the submit button
    will not be shown, and the 'next' button will be enabled or not depending on whether submission is enabled.
  */
  nextButtonShouldSubmit: SC.Record.attr(Boolean)

}) ;

/* >>>>>>>>>> BEGIN source/fixtures/activity_step.js */
// ==========================================================================
// Project:   Smartgraphs.ActivityStep Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// @author    Dewi Win <dwin@concord.org> (activity text)
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/activity_step');

Smartgraphs.ActivityStep.FIXTURES = [
  
];

/* >>>>>>>>>> BEGIN source/models/axes.js */
// ==========================================================================
// Project:   Smartgraphs.Axes
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Axes = SC.Record.extend(
/** @scope Smartgraphs.Axes.prototype */ {
  
  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  xMin: SC.Record.attr(Number),
  xMax: SC.Record.attr(Number),
  xSteps: SC.Record.attr(Number),
  xLabel: SC.Record.attr(String),
  xLabelAbbreviated: SC.Record.attr(String),  
    
  yMin: SC.Record.attr(Number),
  yMax: SC.Record.attr(Number),
  ySteps: SC.Record.attr(Number),
  yLabel: SC.Record.attr(String),
  yLabelAbbreviated: SC.Record.attr(String)

}) ;
/* >>>>>>>>>> BEGIN source/fixtures/axes.js */
// ==========================================================================
// Project:   Smartgraphs.Axes Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/axes');

Smartgraphs.Axes.FIXTURES = [
  
  { url: '/backend/axes/1/5m-15s',

    xMin: 0,
    xMax: 15,
    xSteps: 15,
    xLabel: 'Time (seconds)',
    xLabelAbbreviated: 'Time (s)',

    yMin: 0,
    yMax: 5,
    ySteps: 10,
    yLabel: 'Position (meters)',
    yLabelAbbreviated: 'Position (m)'
  },
  
  { url: '/backend/axes/2/5m-25s',
  
    xMin: 0,
    xMax: 25,
    xSteps: 25,
    xLabel: 'Time (seconds)',
    xLabelAbbreviated: 'Time (s)',

    yMin: 0,
    yMax: 5,
    ySteps: 10,
    yLabel: 'Position (meters)',
    yLabelAbbreviated: 'Position (m)'
  }

];

/* >>>>>>>>>> BEGIN source/models/button.js */
// ==========================================================================
// Project:   Smartgraphs.Button
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Describes an instance of a button that the user can click during a activity step. Includes the commands to be executed
  on click.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Button = SC.Record.extend(
/** @scope Smartgraphs.Button.prototype */ {

  /**
    The name of this button
  */
  name: SC.Record.attr(String),
  
  /**
    The title users see when they click on this button
  */
  title: SC.Record.attr(String),

  /**
    A free-form description of this button and the purpose of this button. For use by authors.
  */
  description: SC.Record.attr(String),
  
  /**
    Width of this button in pixels
  */
  width: SC.Record.attr(Number),

  /**
    When this property is YES, the button will only be enabled in the submission is enabled (i.e., when some inspector
    or other command has instructed the system that a response is ready.)
  */
  isSubmitButton: SC.Record.attr(Boolean)

}) ;

/* >>>>>>>>>> BEGIN source/fixtures/button.js */
// ==========================================================================
// Project:   Smartgraphs.Button Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/button');

Smartgraphs.Button.FIXTURES = [

];

/* >>>>>>>>>> BEGIN source/models/data_point.js */
// ==========================================================================
// Project:   Smartgraphs.DataPoint
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.DataPoint = SC.Record.extend(
/** @scope Smartgraphs.DataPoint.prototype */ {

  x: SC.Record.attr(Number),
  y: SC.Record.attr(Number),
  series: SC.Record.toOne('Smartgraphs.DataSeries', { inverse: 'points' } )

}) ;

/* >>>>>>>>>> BEGIN source/fixtures/data_point.js */
// ==========================================================================
// Project:   Smartgraphs.DataPoint Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/data_point');

Smartgraphs.DataPoint.FIXTURES = [

  {x: 0.000, y: 4.016, guid: 1, series: '/backend/activity/1/series/walking-example-1'},
  {x: 0.200, y: 3.965, guid: 2, series: '/backend/activity/1/series/walking-example-1'},
  {x: 0.400, y: 3.899, guid: 3, series: '/backend/activity/1/series/walking-example-1'},
  {x: 0.600, y: 3.826, guid: 4, series: '/backend/activity/1/series/walking-example-1'},
  {x: 0.800, y: 3.795, guid: 5, series: '/backend/activity/1/series/walking-example-1'},
  {x: 1.000, y: 3.793, guid: 6, series: '/backend/activity/1/series/walking-example-1'},
  {x: 1.200, y: 3.768, guid: 7, series: '/backend/activity/1/series/walking-example-1'},
  {x: 1.400, y: 3.695, guid: 8, series: '/backend/activity/1/series/walking-example-1'},
  {x: 1.600, y: 3.612, guid: 9, series: '/backend/activity/1/series/walking-example-1'},
  {x: 1.800, y: 3.535, guid: 10, series: '/backend/activity/1/series/walking-example-1'},
  {x: 2.000, y: 3.453, guid: 11, series: '/backend/activity/1/series/walking-example-1'},
  {x: 2.200, y: 3.418, guid: 12, series: '/backend/activity/1/series/walking-example-1'},
  {x: 2.400, y: 3.393, guid: 13, series: '/backend/activity/1/series/walking-example-1'},
  {x: 2.600, y: 3.321, guid: 14, series: '/backend/activity/1/series/walking-example-1'},
  {x: 2.800, y: 3.249, guid: 15, series: '/backend/activity/1/series/walking-example-1'},
  {x: 3.000, y: 3.175, guid: 16, series: '/backend/activity/1/series/walking-example-1'},
  {x: 3.200, y: 3.120, guid: 17, series: '/backend/activity/1/series/walking-example-1'},
  {x: 3.400, y: 3.056, guid: 18, series: '/backend/activity/1/series/walking-example-1'},
  {x: 3.600, y: 2.992, guid: 19, series: '/backend/activity/1/series/walking-example-1'},
  {x: 3.800, y: 2.925, guid: 20, series: '/backend/activity/1/series/walking-example-1'},
  {x: 4.000, y: 2.868, guid: 21, series: '/backend/activity/1/series/walking-example-1'},
  {x: 4.200, y: 2.829, guid: 22, series: '/backend/activity/1/series/walking-example-1'},
  {x: 4.400, y: 2.791, guid: 23, series: '/backend/activity/1/series/walking-example-1'},
  {x: 4.600, y: 2.794, guid: 24, series: '/backend/activity/1/series/walking-example-1'},
  {x: 4.800, y: 2.669, guid: 25, series: '/backend/activity/1/series/walking-example-1'},
  {x: 5.000, y: 2.596, guid: 26, series: '/backend/activity/1/series/walking-example-1'},
  {x: 5.200, y: 2.559, guid: 27, series: '/backend/activity/1/series/walking-example-1'},
  {x: 5.400, y: 2.503, guid: 28, series: '/backend/activity/1/series/walking-example-1'},
  {x: 5.600, y: 2.441, guid: 29, series: '/backend/activity/1/series/walking-example-1'},
  {x: 5.800, y: 2.398, guid: 30, series: '/backend/activity/1/series/walking-example-1'},
  {x: 6.000, y: 2.339, guid: 31, series: '/backend/activity/1/series/walking-example-1'},
  {x: 6.200, y: 2.331, guid: 32, series: '/backend/activity/1/series/walking-example-1'},
  {x: 6.400, y: 2.268, guid: 33, series: '/backend/activity/1/series/walking-example-1'},
  {x: 6.600, y: 2.178, guid: 34, series: '/backend/activity/1/series/walking-example-1'},
  {x: 6.800, y: 2.124, guid: 35, series: '/backend/activity/1/series/walking-example-1'},
  {x: 7.000, y: 2.062, guid: 36, series: '/backend/activity/1/series/walking-example-1'},
  {x: 7.200, y: 2.001, guid: 37, series: '/backend/activity/1/series/walking-example-1'},
  {x: 7.400, y: 1.971, guid: 38, series: '/backend/activity/1/series/walking-example-1'},
  {x: 7.600, y: 1.935, guid: 39, series: '/backend/activity/1/series/walking-example-1'},
  {x: 7.800, y: 1.883, guid: 40, series: '/backend/activity/1/series/walking-example-1'},
  {x: 8.000, y: 1.824, guid: 41, series: '/backend/activity/1/series/walking-example-1'},
  {x: 8.200, y: 1.763, guid: 42, series: '/backend/activity/1/series/walking-example-1'},
  {x: 8.400, y: 1.706, guid: 43, series: '/backend/activity/1/series/walking-example-1'},
  {x: 8.600, y: 1.644, guid: 44, series: '/backend/activity/1/series/walking-example-1'},
  {x: 8.800, y: 1.604, guid: 45, series: '/backend/activity/1/series/walking-example-1'},
  {x: 9.000, y: 1.557, guid: 46, series: '/backend/activity/1/series/walking-example-1'},
  {x: 9.200, y: 1.540, guid: 47, series: '/backend/activity/1/series/walking-example-1'},
  {x: 9.400, y: 1.478, guid: 48, series: '/backend/activity/1/series/walking-example-1'},
  {x: 9.600, y: 1.424, guid: 49, series: '/backend/activity/1/series/walking-example-1'},
  {x: 9.800, y: 1.344, guid: 50, series: '/backend/activity/1/series/walking-example-1'},
  {x: 10.000, y: 1.280, guid: 51, series: '/backend/activity/1/series/walking-example-1'},
  {x: 10.200, y: 1.244, guid: 52, series: '/backend/activity/1/series/walking-example-1'},
  {x: 10.400, y: 1.189, guid: 53, series: '/backend/activity/1/series/walking-example-1'},
  {x: 10.600, y: 1.132, guid: 54, series: '/backend/activity/1/series/walking-example-1'},
  {x: 10.800, y: 1.082, guid: 55, series: '/backend/activity/1/series/walking-example-1'},
  {x: 11.000, y: 1.036, guid: 56, series: '/backend/activity/1/series/walking-example-1'},
  {x: 11.200, y: 0.984, guid: 57, series: '/backend/activity/1/series/walking-example-1'},
  {x: 11.400, y: 0.926, guid: 58, series: '/backend/activity/1/series/walking-example-1'},
  {x: 11.600, y: 0.873, guid: 59, series: '/backend/activity/1/series/walking-example-1'},
  {x: 11.800, y: 0.835, guid: 60, series: '/backend/activity/1/series/walking-example-1'},
  {x: 12.000, y: 0.778, guid: 61, series: '/backend/activity/1/series/walking-example-1'},
  {x: 12.200, y: 0.720, guid: 62, series: '/backend/activity/1/series/walking-example-1'},
  {x: 12.400, y: 0.694, guid: 63, series: '/backend/activity/1/series/walking-example-1'},
  {x: 12.600, y: 0.651, guid: 64, series: '/backend/activity/1/series/walking-example-1'},
  {x: 12.800, y: 0.623, guid: 65, series: '/backend/activity/1/series/walking-example-1'},
  {x: 13.000, y: 0.554, guid: 66, series: '/backend/activity/1/series/walking-example-1'},
  {x: 13.200, y: 0.493, guid: 67, series: '/backend/activity/1/series/walking-example-1'},
  {x: 13.400, y: 0.446, guid: 68, series: '/backend/activity/1/series/walking-example-1'},
  {x: 13.600, y: 0.393, guid: 69, series: '/backend/activity/1/series/walking-example-1'},
  {x: 13.800, y: 0.351, guid: 70, series: '/backend/activity/1/series/walking-example-1'},
  {x: 14.000, y: 0.314, guid: 71, series: '/backend/activity/1/series/walking-example-1'},
  {x: 14.200, y: 0.287, guid: 72, series: '/backend/activity/1/series/walking-example-1'},
  {x: 14.400, y: 0.266, guid: 73, series: '/backend/activity/1/series/walking-example-1'},
  {x: 14.600, y: 0.239, guid: 74, series: '/backend/activity/1/series/walking-example-1'},
  {x: 14.800, y: 0.191, guid: 75, series: '/backend/activity/1/series/walking-example-1'},
  {x: 15.000, y: 0.133, guid: 76, series: '/backend/activity/1/series/walking-example-1'},
  
  {x: 0.000, y: 2.000, guid: 100, series: '/backend/activity/1/series/walking-away-example'},
  {x: 0.200, y: 2.001, guid: 101, series: '/backend/activity/1/series/walking-away-example'},
  {x: 0.400, y: 2.039, guid: 102, series: '/backend/activity/1/series/walking-away-example'},
  {x: 0.600, y: 2.092, guid: 103, series: '/backend/activity/1/series/walking-away-example'},
  {x: 0.800, y: 2.175, guid: 104, series: '/backend/activity/1/series/walking-away-example'},
  {x: 1.000, y: 2.220, guid: 105, series: '/backend/activity/1/series/walking-away-example'},
  {x: 1.200, y: 2.262, guid: 106, series: '/backend/activity/1/series/walking-away-example'},
  {x: 1.400, y: 2.304, guid: 107, series: '/backend/activity/1/series/walking-away-example'},
  {x: 1.600, y: 2.352, guid: 108, series: '/backend/activity/1/series/walking-away-example'},
  {x: 1.800, y: 2.356, guid: 109, series: '/backend/activity/1/series/walking-away-example'},
  {x: 2.000, y: 2.377, guid: 110, series: '/backend/activity/1/series/walking-away-example'},
  {x: 2.200, y: 2.374, guid: 111, series: '/backend/activity/1/series/walking-away-example'},
  {x: 2.400, y: 2.378, guid: 112, series: '/backend/activity/1/series/walking-away-example'},
  {x: 2.600, y: 2.397, guid: 113, series: '/backend/activity/1/series/walking-away-example'},
  {x: 2.800, y: 2.415, guid: 114, series: '/backend/activity/1/series/walking-away-example'},
  {x: 3.000, y: 2.441, guid: 115, series: '/backend/activity/1/series/walking-away-example'},
  {x: 3.200, y: 2.473, guid: 116, series: '/backend/activity/1/series/walking-away-example'},
  {x: 3.400, y: 2.481, guid: 117, series: '/backend/activity/1/series/walking-away-example'},
  {x: 3.600, y: 2.495, guid: 118, series: '/backend/activity/1/series/walking-away-example'},
  {x: 3.800, y: 2.512, guid: 119, series: '/backend/activity/1/series/walking-away-example'},
  {x: 4.000, y: 2.530, guid: 120, series: '/backend/activity/1/series/walking-away-example'},
  {x: 4.200, y: 2.539, guid: 121, series: '/backend/activity/1/series/walking-away-example'},
  {x: 4.400, y: 2.558, guid: 122, series: '/backend/activity/1/series/walking-away-example'},
  {x: 4.600, y: 2.579, guid: 123, series: '/backend/activity/1/series/walking-away-example'},
  {x: 4.800, y: 2.601, guid: 124, series: '/backend/activity/1/series/walking-away-example'},
  {x: 5.000, y: 2.621, guid: 125, series: '/backend/activity/1/series/walking-away-example'},
  {x: 5.200, y: 2.641, guid: 126, series: '/backend/activity/1/series/walking-away-example'},
  {x: 5.400, y: 2.653, guid: 127, series: '/backend/activity/1/series/walking-away-example'},
  {x: 5.600, y: 2.661, guid: 128, series: '/backend/activity/1/series/walking-away-example'},
  {x: 5.800, y: 2.670, guid: 129, series: '/backend/activity/1/series/walking-away-example'},
  {x: 6.000, y: 2.676, guid: 130, series: '/backend/activity/1/series/walking-away-example'},
  {x: 6.200, y: 2.722, guid: 131, series: '/backend/activity/1/series/walking-away-example'},
  {x: 6.400, y: 2.695, guid: 132, series: '/backend/activity/1/series/walking-away-example'},
  {x: 6.600, y: 2.744, guid: 133, series: '/backend/activity/1/series/walking-away-example'},
  {x: 6.800, y: 2.754, guid: 134, series: '/backend/activity/1/series/walking-away-example'},
  {x: 7.000, y: 2.778, guid: 135, series: '/backend/activity/1/series/walking-away-example'},
  {x: 7.200, y: 2.799, guid: 136, series: '/backend/activity/1/series/walking-away-example'},
  {x: 7.400, y: 2.808, guid: 137, series: '/backend/activity/1/series/walking-away-example'},
  {x: 7.600, y: 2.829, guid: 138, series: '/backend/activity/1/series/walking-away-example'},
  {x: 7.800, y: 2.846, guid: 139, series: '/backend/activity/1/series/walking-away-example'},
  {x: 8.000, y: 2.881, guid: 140, series: '/backend/activity/1/series/walking-away-example'},
  {x: 8.200, y: 2.886, guid: 141, series: '/backend/activity/1/series/walking-away-example'},
  {x: 8.400, y: 2.892, guid: 142, series: '/backend/activity/1/series/walking-away-example'},
  {x: 8.600, y: 2.916, guid: 143, series: '/backend/activity/1/series/walking-away-example'},
  {x: 8.800, y: 2.939, guid: 144, series: '/backend/activity/1/series/walking-away-example'},
  {x: 9.000, y: 2.937, guid: 145, series: '/backend/activity/1/series/walking-away-example'},
  {x: 9.200, y: 2.956, guid: 146, series: '/backend/activity/1/series/walking-away-example'},
  {x: 9.400, y: 2.961, guid: 147, series: '/backend/activity/1/series/walking-away-example'},
  {x: 9.600, y: 2.989, guid: 148, series: '/backend/activity/1/series/walking-away-example'},
  {x: 9.800, y: 3.001, guid: 149, series: '/backend/activity/1/series/walking-away-example'},
  {x: 10.000, y: 3.012, guid: 150, series: '/backend/activity/1/series/walking-away-example'},
  {x: 10.200, y: 3.026, guid: 151, series: '/backend/activity/1/series/walking-away-example'},
  {x: 10.400, y: 3.049, guid: 152, series: '/backend/activity/1/series/walking-away-example'},
  {x: 10.600, y: 3.058, guid: 153, series: '/backend/activity/1/series/walking-away-example'},
  {x: 10.800, y: 3.072, guid: 154, series: '/backend/activity/1/series/walking-away-example'},
  {x: 11.000, y: 3.096, guid: 155, series: '/backend/activity/1/series/walking-away-example'},
  {x: 11.200, y: 3.119, guid: 156, series: '/backend/activity/1/series/walking-away-example'},
  {x: 11.400, y: 3.151, guid: 157, series: '/backend/activity/1/series/walking-away-example'},
  {x: 11.600, y: 3.161, guid: 158, series: '/backend/activity/1/series/walking-away-example'},
  {x: 11.800, y: 3.185, guid: 159, series: '/backend/activity/1/series/walking-away-example'},
  {x: 12.000, y: 3.212, guid: 160, series: '/backend/activity/1/series/walking-away-example'},
  {x: 12.200, y: 3.216, guid: 161, series: '/backend/activity/1/series/walking-away-example'},
  {x: 12.400, y: 3.246, guid: 162, series: '/backend/activity/1/series/walking-away-example'},
  {x: 12.600, y: 3.283, guid: 163, series: '/backend/activity/1/series/walking-away-example'},
  {x: 12.800, y: 3.293, guid: 164, series: '/backend/activity/1/series/walking-away-example'},
  {x: 13.000, y: 3.302, guid: 165, series: '/backend/activity/1/series/walking-away-example'},
  {x: 13.200, y: 3.322, guid: 166, series: '/backend/activity/1/series/walking-away-example'},
  {x: 13.400, y: 3.346, guid: 167, series: '/backend/activity/1/series/walking-away-example'},
  {x: 13.600, y: 3.359, guid: 168, series: '/backend/activity/1/series/walking-away-example'},
  {x: 13.800, y: 3.379, guid: 169, series: '/backend/activity/1/series/walking-away-example'},
  {x: 14.000, y: 3.397, guid: 170, series: '/backend/activity/1/series/walking-away-example'},
  {x: 14.200, y: 3.419, guid: 171, series: '/backend/activity/1/series/walking-away-example'},
  {x: 14.400, y: 3.415, guid: 172, series: '/backend/activity/1/series/walking-away-example'},
  {x: 14.600, y: 3.439, guid: 173, series: '/backend/activity/1/series/walking-away-example'},
  {x: 14.800, y: 3.450, guid: 174, series: '/backend/activity/1/series/walking-away-example'},
  {x: 15.000, y: 3.466, guid: 175, series: '/backend/activity/1/series/walking-away-example'},
  {x: 15.200, y: 3.481, guid: 176, series: '/backend/activity/1/series/walking-away-example'},
  {x: 15.400, y: 3.485, guid: 177, series: '/backend/activity/1/series/walking-away-example'},
  {x: 15.600, y: 3.517, guid: 178, series: '/backend/activity/1/series/walking-away-example'},
  {x: 15.800, y: 3.507, guid: 179, series: '/backend/activity/1/series/walking-away-example'},
  {x: 16.000, y: 3.530, guid: 180, series: '/backend/activity/1/series/walking-away-example'},
  {x: 16.200, y: 3.547, guid: 181, series: '/backend/activity/1/series/walking-away-example'},
  {x: 16.400, y: 3.570, guid: 182, series: '/backend/activity/1/series/walking-away-example'},
  {x: 16.600, y: 3.569, guid: 183, series: '/backend/activity/1/series/walking-away-example'},
  {x: 16.800, y: 3.595, guid: 184, series: '/backend/activity/1/series/walking-away-example'},
  {x: 17.000, y: 3.609, guid: 185, series: '/backend/activity/1/series/walking-away-example'},
  {x: 17.200, y: 3.618, guid: 186, series: '/backend/activity/1/series/walking-away-example'},
  {x: 17.400, y: 3.643, guid: 187, series: '/backend/activity/1/series/walking-away-example'},
  {x: 17.600, y: 3.668, guid: 188, series: '/backend/activity/1/series/walking-away-example'},
  {x: 17.800, y: 3.678, guid: 189, series: '/backend/activity/1/series/walking-away-example'},
  {x: 18.000, y: 3.677, guid: 190, series: '/backend/activity/1/series/walking-away-example'},
  {x: 18.200, y: 3.718, guid: 191, series: '/backend/activity/1/series/walking-away-example'},
  {x: 18.400, y: 3.710, guid: 192, series: '/backend/activity/1/series/walking-away-example'},
  {x: 18.600, y: 3.730, guid: 193, series: '/backend/activity/1/series/walking-away-example'},
  {x: 18.800, y: 3.740, guid: 194, series: '/backend/activity/1/series/walking-away-example'},
  {x: 19.000, y: 3.799, guid: 195, series: '/backend/activity/1/series/walking-away-example'},
  {x: 19.200, y: 3.839, guid: 196, series: '/backend/activity/1/series/walking-away-example'},
  {x: 19.400, y: 3.870, guid: 197, series: '/backend/activity/1/series/walking-away-example'},
  {x: 19.600, y: 3.901, guid: 198, series: '/backend/activity/1/series/walking-away-example'},
  {x: 19.800, y: 4.003, guid: 199, series: '/backend/activity/1/series/walking-away-example'},
  {x: 20.000, y: 4.000, guid: 200, series: '/backend/activity/1/series/walking-away-example'},
  
  {x: 0.000, y: 2.040, guid: 201, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 0.200, y: 2.031, guid: 202, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 0.400, y: 2.006, guid: 203, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 0.600, y: 2.004, guid: 204, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 0.800, y: 1.994, guid: 205, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 1.000, y: 1.987, guid: 206, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 1.200, y: 1.959, guid: 207, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 1.400, y: 1.946, guid: 208, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 1.600, y: 1.928, guid: 209, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 1.800, y: 1.930, guid: 210, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 2.000, y: 1.891, guid: 211, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 2.200, y: 1.886, guid: 212, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 2.400, y: 1.853, guid: 213, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 2.600, y: 1.833, guid: 214, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 2.800, y: 1.827, guid: 215, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 3.000, y: 1.801, guid: 216, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 3.200, y: 1.783, guid: 217, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 3.400, y: 1.765, guid: 218, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 3.600, y: 1.748, guid: 219, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 3.800, y: 1.730, guid: 220, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 4.000, y: 1.708, guid: 221, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 4.200, y: 1.694, guid: 222, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 4.400, y: 1.679, guid: 223, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 4.600, y: 1.655, guid: 224, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 4.800, y: 1.641, guid: 225, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 5.000, y: 1.633, guid: 226, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 5.200, y: 1.622, guid: 227, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 5.400, y: 1.628, guid: 228, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 5.600, y: 1.621, guid: 229, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 5.800, y: 1.598, guid: 230, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 6.000, y: 1.602, guid: 231, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 6.200, y: 1.577, guid: 232, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 6.400, y: 1.554, guid: 233, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 6.600, y: 1.530, guid: 234, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 6.800, y: 1.488, guid: 235, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 7.000, y: 1.464, guid: 236, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 7.200, y: 1.450, guid: 237, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 7.400, y: 1.440, guid: 238, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 7.600, y: 1.428, guid: 239, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 7.800, y: 1.402, guid: 240, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 8.000, y: 1.393, guid: 241, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 8.200, y: 1.369, guid: 242, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 8.400, y: 1.354, guid: 243, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 8.600, y: 1.321, guid: 244, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 8.800, y: 1.293, guid: 245, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 9.000, y: 1.273, guid: 246, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 9.200, y: 1.258, guid: 247, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 9.400, y: 1.229, guid: 248, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 9.600, y: 1.221, guid: 249, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 9.800, y: 1.212, guid: 250, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 10.000, y: 1.197, guid: 251, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 10.200, y: 1.177, guid: 252, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 10.400, y: 1.156, guid: 253, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 10.600, y: 1.165, guid: 254, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 10.800, y: 1.124, guid: 255, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 11.000, y: 1.102, guid: 256, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 11.200, y: 1.089, guid: 257, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 11.400, y: 1.073, guid: 258, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 11.600, y: 1.052, guid: 259, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 11.800, y: 1.034, guid: 260, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 12.000, y: 1.002, guid: 261, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 12.200, y: 0.991, guid: 262, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 12.400, y: 0.951, guid: 263, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 12.600, y: 0.925, guid: 264, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 12.800, y: 0.913, guid: 265, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 13.000, y: 0.908, guid: 266, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 13.200, y: 0.879, guid: 267, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 13.400, y: 0.855, guid: 268, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 13.600, y: 0.837, guid: 269, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 13.800, y: 0.813, guid: 270, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 14.000, y: 0.801, guid: 271, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 14.200, y: 0.780, guid: 272, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 14.400, y: 0.772, guid: 273, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 14.600, y: 0.761, guid: 274, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 14.800, y: 0.729, guid: 275, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 15.000, y: 0.687, guid: 276, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 15.200, y: 0.656, guid: 277, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 15.400, y: 0.632, guid: 278, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 15.600, y: 0.621, guid: 279, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 15.800, y: 0.612, guid: 280, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 16.000, y: 0.602, guid: 281, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 16.200, y: 0.575, guid: 282, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 16.400, y: 0.550, guid: 283, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 16.600, y: 0.537, guid: 284, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 16.800, y: 0.517, guid: 285, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 17.000, y: 0.494, guid: 286, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 17.200, y: 0.473, guid: 287, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 17.400, y: 0.444, guid: 288, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 17.600, y: 0.427, guid: 289, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 17.800, y: 0.389, guid: 290, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 18.000, y: 0.353, guid: 291, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 18.200, y: 0.325, guid: 292, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 18.400, y: 0.297, guid: 293, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 18.600, y: 0.272, guid: 294, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 18.800, y: 0.249, guid: 295, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 19.000, y: 0.225, guid: 296, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 19.200, y: 0.200, guid: 297, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 19.400, y: 0.161, guid: 298, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 19.600, y: 0.134, guid: 299, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 19.800, y: 0.127, guid: 300, series: '/backend/activity/1/series/walking-toward-example'},
  {x: 20.000, y: 0.133, guid: 301, series: '/backend/activity/1/series/walking-toward-example'}
  
];

/* >>>>>>>>>> BEGIN source/views/data_point.js */
// ==========================================================================
// Project:   Smartgraphs.DataPointView
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews*/

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.DataPointView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.DataPointView.prototype */ {
  
  displayProperties: 'content.x content.y isEnabled fill stroke radius'.w(),
  
  //graphViewBinding: '*parentView.graphView',
  
  // TODO should inherit these colors (and possibly other properties) from parent view
  notSelectedFill: '#1F77B4',
  notSelectedStroke: '#1F77B4',
  selectedFill: '#FF7F0E',
  selectedStroke: '#FF7F0E',
  
  hoveredRadius: 5,
  notHoveredRadius: 3,
  isEnabled: YES,
  isHovered: NO,
  isSelected: NO,

  // required by CollectionFastPath
  layerIsCacheable: YES,
  isPoolable: YES,
  
  fill: function () {
    return (this.get('isSelected') ? this.get('selectedFill') : this.get('notSelectedFill'));
  }.property('isSelected', 'selectedFill', 'notSelectedFill').cacheable(),
  
  stroke: function () {
    return (this.get('isSelected') ? this.get('selectedStroke') : this.get('notSelectedStroke'));
  }.property('isSelected', 'selectedStroke', 'notSelectedStroke').cacheable(),
  
  radius: function () {
    return (this.get('isHovered') ? this.get('hoveredRadius') : this.get('notHoveredRadius'));
  }.property('isHovered', 'hoveredRadius', 'notHoveredRadius').cacheable(),
  
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
    var fill = this.get('fill'),
        stroke = this.get('stroke'),
        radius = this.get('radius');
    
    // get the x and y values, and translate to our coordinate system
    var x = this.getPath('content.x'),
        y = this.getPath('content.y');
    var coords = this.getPath('parentView.graphView').coordinatesForPoint(x, y);
    
    if (firstTime) {
      context.callback(this, this.renderCallback, coords.x, coords.y, radius, fill, stroke);
    }
    else {
      var circle = context.raphael();
      circle.attr({ cx: coords.x, cy: coords.y, r: radius, fill: fill, stroke: stroke });
    }
  }

});
/* >>>>>>>>>> BEGIN source/views/data_series.js */
// ==========================================================================
// Project:   Smartgraphs.DataSeriesView
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  @extends SC.View
*/
sc_require('views/data_point');

Smartgraphs.DataSeriesView = RaphaelViews.RaphaelCollectionView.extend({

  exampleView: Smartgraphs.DataPointView, 
  // keep this set to YES prevents the collection view from redrawing all the points when re-rendering
  useFastPath: YES,
  
  content: function () {
    var series = this.get('item');
    if (!series) return null;
    
    return Smartgraphs.store.find(SC.Query.local(Smartgraphs.DataPoint, { 
      conditions: 'series = {series}',
      series: series,
      orderBy: 'id'
    }));
  }.property('series').cacheable()
  
});

/* >>>>>>>>>> BEGIN source/models/data_series.js */
// ==========================================================================
// Project:   Smartgraphs.DataSeries
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
sc_require('views/data_series');

Smartgraphs.DataSeries = SC.Record.extend(
/** @scope Smartgraphs.DataSeries.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  name: SC.Record.attr(String),
  session: SC.Record.toOne('Smartgraphs.Session'),
  isExample: SC.Record.attr(Boolean),    // might make sense as a transient property  
  points: SC.Record.toMany('Smartgraphs.DataPoint', { inverse: 'series' } ),
  defaultDisplayType: SC.Record.attr(Number)   // LINE_GRAPH or SCATTER_PLOT

}) ;

Smartgraphs.DataSeries.LINE_GRAPH = 1;
Smartgraphs.DataSeries.SCATTER_PLOT = 2;
Smartgraphs.DataSeries.viewClass = Smartgraphs.DataSeriesView;

/* >>>>>>>>>> BEGIN source/fixtures/data_series.js */
// ==========================================================================
// Project:   Smartgraphs.DataSeries Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/data_series');

Smartgraphs.DataSeries.FIXTURES = [
  // need to have some fixtures or fixturesDataSource's updateRecords() thinks it can't handle the record.
  
  { url: '/backend/activity/1/series/walking-example-1',
    name: 'walking-example-1',
    isExample: YES,
    points: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76], 
    session: null
  },
  
  { url: '/backend/activity/1/series/walking-away-example',
    name: 'walking-away-example',
    isExample: YES,
    points: (function () { 
        var points = [];
        for (var i = 100; i <= 200; i++) {
          points.push(i);
        }
        return points;
      }()),
    session: null
  },
  
  { url: '/backend/activity/1/series/walking-toward-example',
    name: 'walking-toward-example',
    isExample: YES,
    points: (function () { 
      var points = [];
      for (var i = 201; i <= 301; i++) {
        points.push(i);
      }
      return points;
    }()),
    session: null
  }
  
];


/* >>>>>>>>>> BEGIN source/models/annotation.js */
// ==========================================================================
// Project:   Smartgraphs.Annotation
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  'Abstract superclass' of all Annotation types.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Annotation = SC.Record.extend(
/** @scope Smartgraphs.Annotation.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /**
    tell the system that we are an annotation.
  */
  isAnnotation: YES,
  
  /**
    name of the annotation
  */
  name: SC.Record.attr(String),
  
  /**
    the session this annotation is associated with, if any.
  */
  session: SC.Record.toOne('Smartgraphs.Session'),
  
  /**
    Whether this is an 'example' annotation (part of the authored content of the activity) or a session-scoped,
    student-drawn annotation
  */
  isExample: SC.Record.attr(Boolean)

}) ;

/* >>>>>>>>>> BEGIN source/views/freehand_sketch.js */
// ==========================================================================
// Project:   Smartgraphs.FreehandSketchView
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.FreehandSketchView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.FreehandSketchView.prototype */ {
  
  stroke: '#000000',
  strokeWidth: 2,
  
  displayProperties: 'item.points.[]'.w(),
  
  renderCallback: function (raphaelCanvas, pathStr, stroke, strokeWidth) {
    return raphaelCanvas.path(pathStr).attr({stroke: stroke, 'stroke-width': strokeWidth});
  },

  render: function (context, firstTime) {
    var graphView = this.getPath('parentView.parentView');
    var sketch = this.get('item');
    var points = (sketch ? sketch.get('points') : null) || [{x: 0, y: 0}];
    
    var str = [];
    var point, coords;
    
    for (var i = 0, ii = points.get('length'); i < ii; i++) {
      point = points.objectAt(i);
      coords = graphView.coordinatesForPoint(point.x, point.y) || {x: 0, y: 0};
      str.push(i === 0 ? 'M' : 'L');
      str.push(Math.round(coords.x));
      str.push(' ');
      str.push(Math.round(coords.y));
    } 
    var pathStr = str.join('');
    
    if (firstTime) {
      context.callback(this, this.renderCallback, pathStr, this.get('stroke'), this.get('strokeWidth'));
    }
    else {
      var path = context.raphael();
      path.attr({path: pathStr});
    }
  }

});

/* >>>>>>>>>> BEGIN source/models/freehand_sketch.js */
// ==========================================================================
// Project:   Smartgraphs.FreehandSketch
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A 'freehand sketch' annotation drawn on top of the graph. 
  
  Note that, unlike a standard DataSeries, a sketch consists of an *ordered* list of x,y pairs; also, we don't expect
  to need to reference individual points that make up the sketch, so there's no need for a 'SketchPoints' model.

  @extends SC.Record
  @version 0.1
*/

sc_require('models/annotation');
sc_require('views/freehand_sketch');

Smartgraphs.FreehandSketch = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.FreehandSketch.prototype */ {
  
  /**
    ordered array of {x, y} pairs that make up the sketch.
  */
  points: SC.Record.attr(Array),

  /**
    whether the sketch is considered 'directional'; ie proceeds from beginning to end the points list and should 
    have an arrow
  */
  isDirectional: SC.Record.attr(Boolean)
    
}) ;

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.FreehandSketch.viewClass = Smartgraphs.FreehandSketchView;

/* >>>>>>>>>> BEGIN source/fixtures/freehand_sketch.js */
// ==========================================================================
// Project:   Smartgraphs.FreehandSketch Fixtures
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/freehand_sketch');

Smartgraphs.FreehandSketch.FIXTURES = [
  // need to have some fixtures or fixturesDataSource's updateRecords() thinks it can't handle the record.
  
  { url: '/backend/activity/1/annotations/sketch-to-match',
    name: 'sketch-to-match',
    isExample: YES,
    points: [ {x: 0, y: 3}, {x: 3, y: 1}, {x: 9, y: 2}, {x: 15, y:0} ],
    session: null
  }
  
];

/* >>>>>>>>>> BEGIN source/models/graph.js */
// ==========================================================================
// Project:   Smartgraphs.Graph
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Graph = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.Graph.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /**
    The name the author will use to reference this graph while building the activity.
  */
  name: SC.Record.attr(String),

  /**
    Description of the graph for authors' reference.
  */
  description: SC.Record.attr(String),
  
  /**
    Title of the graph as seen by learners. Unlike the name (which should be constant, so that authors can
    reference the graph at different locations in the activity) the title can be changed. Authors may even ask users 
    to provide their own title.
  */
  title: SC.Record.attr(String),
  
  axes: SC.Record.toOne('Smartgraphs.Axes'),
  initialSeries: SC.Record.attr(Array),
  initialAnnotations: SC.Record.attr(Array)
    
}) ;

/* >>>>>>>>>> BEGIN source/fixtures/graph.js */
// ==========================================================================
// Project:   Smartgraphs.Graph Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/graph');

Smartgraphs.Graph.FIXTURES = [

  { url: 
      '/backend/activity/1/graph/1/prediction-away',
    name:
      'Prediction-Away',
    description: 
      'Prediction graph of movement away',
    title:
      'Away',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  
  { url: 
      '/backend/activity/1/graph/2/prediction-toward',
    name:
      'Prediction-Toward',
    title:
      'Toward',
    description: 
      'Prediction graph of movement towards',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  
  { url: 
      '/backend/activity/1/graph/3/sensor-playing',
    name:
      'Sensor-Playing',
    description: 
      'Playing around with the sensor in page 3',
    title: 
      'Away',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      [],
    initialAnnotations:
      []
  },
  
  { url: 
      '/backend/activity/1/graph/4/graph-with-away-prediction',
    name:
      'Match-Away-With-Sensor',
    description: 
      "Graph with 'away' prediction for adding 'away' sensor data in page 4",
    title:
      'Away',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      [],
    initialAnnotations: [
      { type: 'Smartgraphs.FreehandSketch', name: 'prediction-away' }
    ]
  },
  
  { url: 
      '/backend/activity/1/graph/5/graph-with-toward-prediction',
    name:
      'Match-Toward-With-Sensor',
    description: 
      "Graph with 'toward' prediction for adding 'toward' sensor data in page 4",
    title:
      'Toward',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      [],
    initialAnnotations: [
      { type: 'Smartgraphs.FreehandSketch', name: 'prediction-toward' }
    ]
  },
  
  { url: 
      '/backend/activity/1/graph/6/sensor-away',
    name:
      'Sensor-Away',
    description: 
      "Graph with'away' sensor data from page 4",
    title:
      'Away',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      ['sensor-away'],
    initialAnnotations: [
    ]
  },
  
  { url: 
      '/backend/activity/1/graph/7/sensor-toward',
    name:
      'Match-Toward-With-Sensor',
    description: 
      "Graph with 'toward' prediction for adding 'toward' sensor data in page 4",
    title:
      'Toward',
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      ['sensor-toward'],
    initialAnnotations: [
    ]
  },
  
  { url: 
      '/backend/activity/1/graph/8/walking-example-1',
    name:
      'Walking',
    description: 
      'Graph for multiple choice question in page 6',
    title:
      "An Example Walk",
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      ['walking-example-1'],
    initialAnnotations: [
      { type: 'Smartgraphs.HighlightedPoint', name: 'walking-first-point' }
    ]
  },
  
  { url: 
      '/backend/activity/1/graph/9/two-walkers',
    name:
      'Two walkers',
    description: 
      'Graph for multiple choice question in page 6',
    title:
      "",
    axes:
      '/backend/axes/2/5m-25s',
    initialSeries: 
      ['walking-away-example', 'walking-toward-example'],
    initialAnnotations: [
    ]
  },
  
  { url: 
      '/backend/activity/1/graph/10/graph-to-match',
    name:
      'Graph to match',
    description: 
      'Graph to match with sensor data',
    title:
      "",
    axes:
      '/backend/axes/1/5m-15s',
    initialSeries: 
      [],
    initialAnnotations: [
      { type: 'Smartgraphs.FreehandSketch', name: 'sketch-to-match' }
    ]
  }
  
];

/* >>>>>>>>>> BEGIN source/views/highlighted_point.js */
// ==========================================================================
// Project:   Smartgraphs.HighlightedPointView
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/

Smartgraphs.HighlightedPointView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.FreehandSketchView.prototype */ {

  // defaults
  radius: 8,
  stroke: '#cc0000',
  strokeWidth: 2,
  strokeOpacity: 1.0,
  fill: '#ffffff',
  fillOpacity: 0,
  
  displayProperties: 'item.point.x item.point.y radius stroke strokeWidth strokeOpacity fill fillOpacity'.w(),

  renderCallback: function (raphaelCanvas, attrs) {
    return raphaelCanvas.circle(attrs.x, attrs.y, attrs.r).attr(attrs);
  },
  
  render: function (context, firstTime) {
    var graphView = this.getPath('parentView.parentView');
    var annotation = this.get('item');
    
    var point = annotation.get('point');
    var x = point ? point.get('x') : 0;
    var y = point ? point.get('y') : 0;
    var coords = graphView.coordinatesForPoint(x, y);
    
    var attrs = {
      cx: coords.x,
      cy: coords.y,
      r: this.get('radius'),
      stroke: this.get('stroke'),
      'stroke-width': this.get('strokeWidth'),
      'stroke-opacity': this.get('strokeOpacity'),
      fill: this.get('fill'),
      'fill-opacity': this.get('fillOpacity')
    };

    if (firstTime) {
      context.callback(this, this.renderCallback, attrs);
    }
    else {
      var circle = context.raphael();
      circle.attr(attrs);
    }
  }
  
});

/* >>>>>>>>>> BEGIN source/models/highlighted_point.js */
// ==========================================================================
// Project:   Smartgraphs.HighlightedPoint
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Highlight a particular point on the graph. This model should eventually encompass several kinds of highlight.
  
  It is conceptually distinct from the highlight applied by default to the 'selected' point of a DataSeriesView;
  however, one might code a Smartgraphs step to add this annotation to a point after the user selects it.

  @extends Smartgraphs.Annotation
  @version 0.1
*/

sc_require('models/annotation');
sc_require('views/highlighted_point');

Smartgraphs.HighlightedPoint = Smartgraphs.Annotation.extend(
/** @scope Smartgraphs.HighlightedPoint.prototype */ {
  
  point: SC.Record.toOne('Smartgraphs.DataPoint')

});

// let the graph view know how to instantiate a view class to display this item
Smartgraphs.HighlightedPoint.viewClass = Smartgraphs.HighlightedPointView;

/* >>>>>>>>>> BEGIN source/fixtures/highlighted_point.js */
// ==========================================================================
// Project:   Smartgraphs.HighlightedPoint Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/highlighted_point');

Smartgraphs.HighlightedPoint.FIXTURES = [

  // need to have some fixtures or fixturesDataSource's updateRecords() thinks it can't handle the record.
  { url: '/backend/activity/1/annotations/walking-first-point',
    name: 'walking-first-point',
    isExample: YES,
    session: null,
    point: 1
  }

];

/* >>>>>>>>>> BEGIN source/models/response_template.js */
// ==========================================================================
// Project:   Smartgraphs.ResponseTemplate
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Specifies a string interspersed with text fields or other input types, to be displayed in a 'form-like' manner
  in a given ActivityStep.
  
  This allows learners or authors to respond to questions.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.ResponseTemplate = SC.Record.extend(
/** @scope Smartgraphs.ResponseTemplate.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  templateString: SC.Record.attr(String),
  fieldTypes: SC.Record.attr(Array),
  fieldChoicesList: SC.Record.attr(Array),            // for multiple choice
  intialValues: SC.Record.attr(Array),
  
  // cache the actual values entered
  values: []

}) ;

/* >>>>>>>>>> BEGIN source/fixtures/response_template.js */
// ==========================================================================
// Project:		Smartgraphs.ResponseTemplate Fixtures
// Copyright: ©2010 Concord Consortium
// @author		Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/response_template');

Smartgraphs.ResponseTemplate.FIXTURES = [
  
  { url: '/backend/response-template/1/numeric',
  	templateString: '',
  	fieldTypes: ['numeric'],
  	fieldChoicesList: [null],
  	initialValues: ['']
  },

  { url: '/backend/response-template/2/open',
  	templateString: '',
  	fieldTypes: ['textarea'],
  	fieldChoicesList: [null],
  	initialValues: ['']
  },

  { url: '/backend/response-template/3/walking-example-1',
  	templateString: '',
  	fieldTypes: ['multiplechoice'],
  	fieldChoicesList: [[
  		'The walker was 4 meters away, getting ready to walk toward the sensor.',
  		'The walker was closest to the motion sensor, getting ready to walk away from the sensor.',
  		'The walker was 2 meters away from the motion sensor, getting ready to walk toward the sensor.',
  		'The walker was 2 meters away from the motion sensor, getting ready to walk away from the sensor.'
  	 ]],
  	initialValues: [""]
  },
  
  { url: '/backend/response-template/4/two-walkers',
  	templateString: '',
  	fieldTypes: ['multiplechoice'],
  	fieldChoicesList: [[
      "I started at the motion sensor and walked away from the sensor for 10 seconds. Then I walked toward the "+
      "sensor for 10 seconds.",
      
      "My friend and I both started 2 meters away from the sensor. He walked away from the motion sensor for "+
      "20 seconds. I walked toward the sensor for 20 seconds.",
      
      "I started at the sensor and walked away from the sensor for 20 seconds. My friend started 2 meters away "+
      "from the sensor and walked away from the sensor for 20 seconds.",
      
      "I started at the sensor and walked away from the sensor for 20 seconds. My friend started 2 meters away "+
      "from the sensor and walked toward the sensor for 20 seconds."
  	 ]],
  	initialValues: [""]
  }

];

/* >>>>>>>>>> BEGIN source/models/session.js */
// ==========================================================================
// Project:   Smartgraphs.Session
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Session = SC.Record.extend(
/** @scope Smartgraphs.Session.prototype */ {

  user: SC.Record.toOne('Smartgraphs.User', { inverse: 'session', isMaster: YES }),
  
  steps: SC.Record.toMany('Smartgraphs.  SessionStep', { inverse: 'session' })

}) ;

/* >>>>>>>>>> BEGIN source/fixtures/session.js */
// ==========================================================================
// Project:   Smartgraphs.Session Fixtures
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/session');

Smartgraphs.Session.FIXTURES = [

  { guid: 'empty-session',
    user: null,
    steps: []
  }

];
/* >>>>>>>>>> BEGIN source/models/session_step.js */
// ==========================================================================
// Project:   Smartgraphs.SessionStep
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.SessionStep = SC.Record.extend(
/** @scope Smartgraphs.SessionStep.prototype */ {

  values: SC.Record.attr(Array),
  series: SC.Record.toOne('Smartgraphs.DataSeries')

}) ;

/* >>>>>>>>>> BEGIN source/fixtures/session_step.js */
// ==========================================================================
// Project:   Smartgraphs.SessionStep Fixtures
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/session_step');

Smartgraphs.SessionStep.FIXTURES = [

];

/* >>>>>>>>>> BEGIN source/models/triggered_commands.js */
// ==========================================================================
// Project:   Smartgraphs.TriggeredCommands
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.TriggeredCommands = SC.Record.extend(
/** @scope Smartgraphs.TriggeredCommands.prototype */ {

  /**
    a hash that contains:
      the class name of the Inspector that checks system state for changes
      a config hash to be passed to the inspector when created
  */
  systemInspector: SC.Record.attr(Object),
  
  /**
    JSON expression tree to be used to convert the Inspector's output to a YES or NO answer.
  */
  triggerCriterion: SC.Record.attr(Object),
  
  /**
    series of commands to run when the triggerCriterion switches from NO to YES
  */
  onCommands: SC.Record.attr(Object),
  
  /**
    series of commands to run when the triggerCriterion switches from YES to NO
  */
  offCommands: SC.Record.attr(Object)

}) ;

/* >>>>>>>>>> BEGIN source/fixtures/triggered_commands.js */
// ==========================================================================
// Project:   Smartgraphs.TriggeredCommands Fixtures
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/triggered_commands');

Smartgraphs.TriggeredCommands.FIXTURES = [

];

/* >>>>>>>>>> BEGIN source/models/user.js */
// ==========================================================================
// Project:   Smartgraphs.User
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.User = SC.Record.extend(
/** @scope Smartgraphs.User.prototype */ {

  userId: SC.Record.attr(String),

  name: SC.Record.attr(String),
  
  sessions: SC.Record.toMany(Smartgraphs.Session, { inverse: 'user' })

}) ;

/* >>>>>>>>>> BEGIN source/fixtures/user.js */
// ==========================================================================
// Project:   Smartgraphs.User Fixtures
// Copyright: ©2010 Concord Consortium
// Author:    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('models/user');

Smartgraphs.User.FIXTURES = [

  { guid: 'default',
    userId: 'anonymous',
    name: 'Anonymous User',
    sessions: []
  }

];

/* >>>>>>>>>> BEGIN source/inspectors/inspector.js */
// ==========================================================================
// Project:   Smartgraphs.Inspector
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.Inspector = SC.Object.extend({
  
  init: function () {
    var config = this.get('config'); 
    this.configure(config || {});
    arguments.callee.base.apply(this,arguments);
  }
});
/* >>>>>>>>>> BEGIN source/inspectors/response_fields.js */
// ==========================================================================
// Project:   Smartgraphs.ResponseFieldsInspector
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('inspectors/inspector');

Smartgraphs.ResponseFieldsInspector = Smartgraphs.Inspector.extend({
  
  value: null,
  fieldIndex: null,
  
  configure: function (config) {
    this.set('fieldIndex', config.fieldIndex);
  },
  
  inspect: function () {
    var value = Smartgraphs.responseTemplateController.get('values');

    // FIXME error check the fieldIndex value!`
    var fieldIndex = this.get('fieldIndex');
    if (!SC.none(fieldIndex)) value = value[fieldIndex];

    this.set('value', value);
    return value;
  },
  
  watch: function () {
    Smartgraphs.responseTemplateController.addObserver('values.[]', this, this.inspect);
  },
  
  stopWatching: function () {
    Smartgraphs.responseTemplateController.removeObserver('values.[]', this, this.inspect);
  }
  
});
/* >>>>>>>>>> BEGIN source/inspectors/first_response_field.js */
// ==========================================================================
// Project:   Smartgraphs.FirstResponseFieldInspector
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

sc_require('inspectors/response_fields');

Smartgraphs.FirstResponseFieldInspector = Smartgraphs.ResponseFieldsInspector.extend({
  
  configure: function (config) {
    config.fieldIndex = 0;
    arguments.callee.base.apply(this,arguments);
  }
  
});

/* >>>>>>>>>> BEGIN source/lib/evaluator.js */
// ==========================================================================
// Project:   Smartgraphs.evaluator
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

(function () {
  
  var evaluate;       // defined below; defined here to make jslint happy
  
  var example = {
    "or": [{ "equals": [ "value", { "literal": "one" } ] }, 
           { "equals": [ "value", { "literal": "two" } ] }]
  };
  
  function or(terms, value) {
    for (var i = 0, ii = terms.length; i < ii; i++) {
      if (evaluate(terms[i], value)) return true;
    }
    return false;
  }
  
  function and(terms, value) {
    for (var i = 0, ii = terms.length; i < ii; i++) {
      if (!evaluate(terms[i], value)) return false;
    }
    return true;
  }
  
  function gt(terms, value) {
    return (evaluate(terms[0], value) > evaluate(terms[1], value));
  }
  
  function equals(terms, value) {
    return evaluate(terms[0], value) === evaluate(terms[1], value);
  }
  
  function strip(terms, value) {
    return (evaluate(terms, value) || '').strip();
  }
  
  function isIn(terms, value) {
    var item = evaluate(terms[0], value);
    var list = evaluate(terms[1], value);
    
    for (var i = 0, ii = list.length; i < ii; i++) {
      if (item === list[i]) return true;
    }
    return false;
  }
  
  function length(terms,value) {
    return (evaluate(terms, value) || []).length;
  }
  
  evaluate = function (exp, value) {
    if (exp === 'value') return value;

    if (typeof(exp) === 'string' || typeof(exp) === 'number' || exp.splice === [].splice || exp === undefined || exp === null) { 
      return exp;
    }
    
    for (var op in exp) {   // iterates only to the first 'own property', then returns
      if (exp.hasOwnProperty(op)) {
        var terms = exp[op];
        
        switch (op) {
          case 'literal':
            return terms;
          case 'or': 
            return or(terms, value);
          case 'and': 
            return and(terms, value);
          case 'equals':
            return equals(terms, value);
          case 'strip':
            return strip(terms, value);
          case 'in':
            return isIn(terms, value);
          case 'length':
            return length(terms, value);
          case 'gt':
            return gt(terms, value);
        }
        console.error('invalid expression operator: "' + op + '"');
        return;
      }
    }
  };
  
  Smartgraphs.evaluate = evaluate;

}());
/* >>>>>>>>>> BEGIN source/models/activity.js */
// ==========================================================================
// Project:   Smartgraphs.Activity
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  A guide, or wizard, that steps a user through some activity.

  @extends SC.Record
  @version 0.1
*/
Smartgraphs.Activity = SC.Record.extend(
/** @scope Smartgraphs.Activity.prototype */ {

  url: SC.Record.attr(String),
  primaryKey: 'url',
  
  /** 
    The title of this Activity.
  */
  title: SC.Record.attr(String),
  
  /**
    The ActivityPages that make up this Activity.
  */
  pages: SC.Record.toMany('Smartgraphs.ActivityPage', { inverse: 'activity', orderBy: 'index' }),
  
  
  // TODO a) this would be broken -- all Activity records would share the same {};
  //      b) move all state like 'context' to session
  
  /**
    @private
    a list of 'global' variables in a given Activity. These would be, for example, names of 'globally available' things
    like the labels created by the openLabelTool command.
  */
  context: {},
  
  
  /**
    Server endpoint for getting the page records. 
  */
  pageListUrl: SC.Record.attr(String),

  /**
    A local SC.Query that returns all the ActivityPages associated with this activity. Used to signal the data
    source to fetch those records from the server.
  */
  pagesQuery: function () {
    // cacheable, so DataStore only ever sees one pagesQuery instance per Activity record
    return SC.Query.create({
      isPagesQuery: YES,                       // so the data source can interpret what query we are
      recordType: Smartgraphs.ActivityPage,
      conditions: 'activity = {activity}',
      parameters: { activity: this }
    });
  }.property().cacheable()

}) ;

/* >>>>>>>>>> BEGIN source/states/ready.js */
// ==========================================================================
// Project:   Smartgraphs.READY
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate indicating that the Smartgraphs application is loaded and ready for user interaction.
  
  From here, we might:
    * show the list of Activities
    * open a particular Activity based on the route (or based on a directive set by the teacher, if there is one)
    * allow the user to edit an Activity
    * allow the user to update their personal information
    * allow the user to examine their lab book
    * allow the user to see their previous answer sheets
    * allow the user to go into a 'mess around' state where they can plug in sensors and edit graphs
  etc.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.READY = SC.Responder.create(
/** @scope Smartgraphs.READY.prototype */ {

  nextResponder: null,
  fencedActivityId: null,
  
  didBecomeFirstResponder: function() {
    // Eventually we can use SC.routes to parse a 'query string' for us, as per:
    // http://smartgraphs.concord.org/app#?mode=edit_activity&activity=/activities/rklancer/my-fancy-activity'
    
    // for now, we just take the URL fragment to be the activityId
    SC.routes.add('*activityId', this, 'route');
  },
  
  willLoseFirstResponder: function() {
  },
  
  // SC.routes callback (not really an action; SC.routes calls this method directly)
  route: function (route) {
    var activityId = route.activityId;

    // as a quickfix, put a 'fence' around the back button
    // URL Fragment #1: user visits '#/backend/activity/1":
    //    a. Smartgraphs saves activity id "/backend/activity/1" as this.fencedActivityId
    //    b. Smartgraphs visits fragment #fence
    // URL Fragment # 2: Smartgraphs visits #fence
    //    a. Smartgraphs visits the URL fragment at this.fencedActivityId; in this case, '#/backend/activity/1'
    // URL Fragment #3: Smartgraphs visits '#/backend/activity/1'
    //    a. Since this.fencedActivityId, Smartgraphs issues openActivity Command instead of revisiting the steps
    //       above (those starting with Fragment #1)
    
    if (activityId === 'fence') {
      if (this.fencedActivityId) {
        SC.routes.set('location', this.fencedActivityId);
      }
    }
    else if (activityId) {
      if (activityId === this.fencedActivityId) {
        Smartgraphs.sendAction('openActivity', this, { id: this.fencedActivityId });
      }
      else  {
        this.fencedActivityId = activityId;
        SC.routes.set('location', 'fence');
      }
    }
  },

  // ..........................................................
  // ACTIONS
  //
  
  openActivity: function (context, args) {
    var activityContent = Smartgraphs.activityController.get('content');
    if (activityContent && activityContent.get('id') === args.id) {
      return YES; // nothing to do!
    }
    
    Smartgraphs.activityController.set('content', Smartgraphs.store.find(Smartgraphs.Activity, args.id));
    Smartgraphs.makeFirstResponder(Smartgraphs.LOADING_ACTIVITY);
    return YES;
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/states/activity.js */
// ==========================================================================
// Project:   Smartgraphs.ACTIVITY
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate representing that the application is running a Activity.

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/ready');

Smartgraphs.ACTIVITY = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY.prototype */ {
  
  nextResponder: Smartgraphs.READY,       // the default; if some other app state implements the openActivity action in 
                                          // some way, presumably that state should set itself as our nextResponder
  
  didBecomeFirstResponder: function() {
    Smartgraphs.appWindowController.showActivityView();
  },
  
  willLoseFirstResponder: function () {
    Smartgraphs.activityController.cleanup();
  }
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;

/* >>>>>>>>>> BEGIN source/states/activity_done.js */
// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_DONE
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the activity activity is finished. User may want to proceed to another activity, or may 
  want to view the lab book/answer sheet/etc they they have created with the help of this Activity.
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_DONE = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_DONE.prototype */ {
  
  nextResponder: Smartgraphs.ACTIVITY
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;

/* >>>>>>>>>> BEGIN source/states/activity_page_done.js */
// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_PAGE_DONE
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing a finished activity page. The user should be able to proceed to the next activity page from here.

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_PAGE_DONE = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_PAGE_DONE.prototype */ {

  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function() {    
    if (Smartgraphs.activityPagesController.get('isLastPage')) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_DONE);
    }
    else {
      Smartgraphs.activityController.set('canGotoNextPage', YES);
    }
  },
  
  willLoseFirstResponder: function() {
    Smartgraphs.activityController.set('canGotoNextPage', NO);
    Smartgraphs.activityPageController.cleanup();
  },
  
  // ..........................................................
  // ACTIONS
  //

  gotoNextPage: function () {
    Smartgraphs.activityPagesController.selectNextPage();
    Smartgraphs.activityPageController.set('content', Smartgraphs.activityPagesController.get('selection'));
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_LOADING);
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/states/mixins/resource_loader.js */
// ==========================================================================
// Project:   Smartgraphs.ResourceLoader
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

// Common functionality for application states that need to load a resource and its subordinate resources
// before proceeding.

Smartgraphs.ResourceLoader = {
  
  loadResources: function () {
    var subs = this.get('subordinateResources');
    for (var i = 0, ii = subs.get('length'); i < ii; i++) {
      subs[i].record = null;
    }
    
    var master = this.get('masterResource');
    master.record = master.load(this);
    
    this._watchedRecords = [];
    this.watch(master.record);
    
    return this.checkResourceStatuses();
  },
  
  watch: function (recordOrRecordArray) {
    this._watchedRecords.push(recordOrRecordArray);
    recordOrRecordArray.addObserver('status', this, this.checkResourceStatuses);
  },
  
  checkResourceStatuses: function () {    
    var masterStatus = this.get('masterResource').record.get('status');
    
    if (masterStatus & SC.Record.READY) {
      return this.checkSubordinateResources();
    }
    else {
      if (masterStatus & SC.Record.ERROR) {
        this.cleanupLoading();
        if (this.resourceLoadingError) this.resourceLoadingError();
        return YES;
      }
      return NO; // not ready and not in error -> need to keep checking
    }
  },
  
  checkSubordinateResources: function () {
    var resource, subs = this.get('subordinateResources');
     
    for (var i = 0, ii = subs.get('length'); i < ii; i++) {
      resource = subs[i];
      if (resource.record === null) {
        resource.record = resource.load(this);
        this.watch(resource.record);
      }
    }
    
    if (this.subordinateResourcesAreReady()) {
      this.cleanupLoading();
      this.resourcesDidLoad();
      return YES;
    }
    
    if (this.subordinateResourcesHaveErrors()) {
      this.cleanupLoading();
      if (this.resourceLoadingError) this.resourceLoadingError();
      return YES;
    }
    
    return NO;
  },
  
  cleanupLoading: function () {
    this._watchedRecords.forEach( function (recordOrRecordArray) {
      recordOrRecordArray.removeObserver('status', this, this.checkResourceStatuses);
    }, this);
    this._watchedRecords = [];
  },
  
  subordinateResourcesAreReady: function () {
    var resources = this.get('subordinateResources');
    
    for (var i = 0, ii = resources.get('length'); i < ii; i++) {
      if (resources[i].record === null || !(resources[i].record.get('status') & SC.Record.READY)) {
        return NO;
      }
    }
    return YES;
  },
  
  subordinateResourcesHaveErrors: function () {
    var resources = this.get('subordinateResources');
    
    for (var i = 0, ii = resources.get('length'); i < ii; i++) {
      if (resources[i].record && (resources[i].record.get('status') & SC.Record.ERROR)) {
        return YES;
      }
    }
    return NO;
  },
  
  cancelLoading: function () {
    this.cleanupLoading(); 
  }
};

/* >>>>>>>>>> BEGIN source/states/activity_page_loading.js */
// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_PAGE_LOADING
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');
sc_require('states/mixins/resource_loader');

Smartgraphs.ACTIVITY_PAGE_LOADING = SC.Responder.create(Smartgraphs.ResourceLoader,
/** @scope Smartgraphs.ACTIVITY_PAGE_LOADING.prototype */ {
  
  nextResponder: Smartgraphs.ACTIVITY,
  
  masterResource: {
    load: function () { return Smartgraphs.activityPageController.get('content').toArray().objectAt(0); }
  },
  
  subordinateResources: [
    { load: function () { return Smartgraphs.store.find(Smartgraphs.activityPageController.get('stepsQuery')); } }
  ],
  
  didBecomeFirstResponder: function () {  
    this.loadResources();
  },
  
  willLoseFirstResponder: function () {
    this.cancelLoading();
  },
  
  resourcesDidLoad: function () {
    Smartgraphs.activityStepController.set('content', Smartgraphs.activityPageController.get('firstStep'));
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_LOADING);
  }
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;

/* >>>>>>>>>> BEGIN source/states/activity_step.js */
// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that an ActivityStep is currently active. Defines most of the commands available to an activity
  step.
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_STEP = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_STEP.prototype */ {
  
  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function() {
    Smartgraphs.activityStepController.begin();
  },
  
  willLoseFirstResponder: function () {
    Smartgraphs.activityStepController.disableSubmission();
    Smartgraphs.responseTemplateController.set('editingShouldBeEnabled', NO);
  },
  
  // action helpers
  _graphControllerFor: function (pane) {
    if ( !Smartgraphs.activityViewController.get('paneIsSplit') || pane === 'top' ) {
      return Smartgraphs.firstGraphController;
    }
    if (pane === 'bottom') return Smartgraphs.secondGraphController;
  },
  
  _graphViewFor: function (pane) {
    if (pane === 'top' || pane === 'single') return Smartgraphs.getPath('activityPage.firstGraphPane');
    if (pane === 'bottom') return Smartgraphs.getPath('activityPage.firstGraphPane');
  },
  
  // ..........................................................
  // ACTIONS
  // 
  
  gotoNextPage: function () {
    this.submitStep();
    this.invokeLast(function () {
      Smartgraphs.sendAction('gotoNextPage');
    });
  },
  
  submitStep: function () {
    if (Smartgraphs.activityStepController.get('canSubmit')) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_SUBMITTED);
    }
    return YES;
  },

  waitForResponse: function (context, args) {
    Smartgraphs.activityStepController.waitForResponse();
    Smartgraphs.responseTemplateController.set('editingShouldBeEnabled', YES);
    return YES;
  },
  
  showSinglePane: function () {
    return Smartgraphs.activityViewController.showSinglePane();
  },
  
  showSplitPane: function () {
    return Smartgraphs.activityViewController.showSplitPane();
  },
  
  showImage: function (context, args) {
    return Smartgraphs.activityViewController.showImage(args.pane, args.path);
  },
  
  showGraph: function (context, args) {
    Smartgraphs.activityViewController.showGraph(args.pane, args.graphId);
    return YES;
  },
  
  hidePane: function (context, args) {
    Smartgraphs.activityViewController.hidePane(args.pane);
    return YES;
  },
  
  setAxes: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    controller.setAxes(args.axesId);
    return YES;
  },
  
  displaySeriesOnGraph: function (context, args) {
    var controller = this._graphControllerFor(args.pane);    
    controller.addObjectByName(Smartgraphs.DataSeries, args.seriesName);
    return YES;
  },
  
  copyExampleSeriesToGraph: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    var series = Smartgraphs.sessionController.createSeries(args.seriesName);
    Smartgraphs.sessionController.copyExampleSeries(args.exampleSeriesName, args.seriesName);
    controller.addSeries(series);
    return YES;
  },
  
  createSeriesOnGraph: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    var series = Smartgraphs.sessionController.createSeries(args.seriesName);
    controller.addSeries(series);
    return YES;
  },
  
  removeSeries: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    controller.removeSeries(args.seriesName);
    return YES;
  },
  
  removeAllSeries: function (context, args) {
    return NO;      // not handled yet.
    // var controller = this._graphControllerFor(args.pane);
    // controller.removeAllSeries();
  },
  
  selectDataSeries: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    controller.selectSeries(args.seriesName);
    return YES;
  },
  
  createAnnotation: function (context, args) {
    var controller = this._graphControllerFor(args.pane);
    var annotation = Smartgraphs.sessionController.createAnnotation(args.annotationName, args.annotationType);
    controller.addAnnotation(annotation);
    return YES;
  },
  
  startFreehandInput: function (context, args) {
    Smartgraphs.sendAction('createAnnotation', this, { 
      pane: args.pane, 
      annotationName: args.annotationName,
      annotationType: Smartgraphs.FreehandSketch
    });

    var controller = this._graphControllerFor(args.pane);
    if (Smartgraphs.freehandInputController.register(args.pane, controller, args.annotationName)) {
      Smartgraphs.makeFirstResponder(Smartgraphs.FREEHAND_INPUT);
      return YES;
    }
  },
  
  startSensorInput: function (context, args) {
    Smartgraphs.sendAction('createSeriesOnGraph', this, { 
      pane: args.pane, 
      seriesName: args.seriesName
    });

    var controller = this._graphControllerFor(args.pane);
    var series = controller && controller.findSeriesByName(args.seriesName);
    
    if ( !series ) return YES;        // handled, but invalid pane or series...
    
    // TODO let 'args' override these settings if desired
    var xMin = controller.getPath('axes.xMin');
    var xMax = controller.getPath('axes.xMax');

    if (Smartgraphs.sensorController.register(args.pane, series, xMin, xMax)) {
      Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR);
      return YES;
    }
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/states/activity_step_loading.js */
// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP_LOADING
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');
sc_require('states/mixins/resource_loader');

Smartgraphs.ACTIVITY_STEP_LOADING = SC.Responder.create(Smartgraphs.ResourceLoader,
/** @scope Smartgraphs.ACTIVITY_STEP_LOADING.prototype */ {
  
  nextResponder: Smartgraphs.ACTIVITY,
  
  masterResource: {
    load: function () { return Smartgraphs.activityStepController.get('content'); }
  },
  
  subordinateResources: [],    
  
  didBecomeFirstResponder: function() {
    this.loadResources();
  },
  
  willLoseFirstResponder: function () {
    this.cancelLoading();
  },
  
  resourcesDidLoad: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP);
  },
  
  resourceLoadingError: function () {
    console.error('Error status loading subordinate resource for %s', this.get('masterResource').record.get('id'));
  }
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;

/* >>>>>>>>>> BEGIN source/states/activity_step_submitted.js */
// ==========================================================================
// Project:   Smartgraphs.ACTIVITY_STEP_SUBMITTED
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class
  
  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity');

Smartgraphs.ACTIVITY_STEP_SUBMITTED = SC.Responder.create(
/** @scope Smartgraphs.ACTIVITY_STEP_SUBMITTED.prototype */ {

  nextResponder: Smartgraphs.ACTIVITY,
  
  didBecomeFirstResponder: function () {
    var oldStep = Smartgraphs.activityStepController.get('content');

    Smartgraphs.activityStepController.handleSubmission();

    var newStep = Smartgraphs.activityStepController.get('content');
    // if we didn't change steps after submission completed, then there must be no more steps for this page.
    
    if (newStep === oldStep && oldStep.get('isFinalStep')) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_DONE);
    }
  },
   
  willLoseFirstResponder: function () {
    Smartgraphs.activityStepController.cleanup();
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  gotoStep: function (context, args) {
    var step = Smartgraphs.store.find(Smartgraphs.ActivityStep, args.stepId);
    Smartgraphs.activityStepController.set('content', step);
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_LOADING);    
    return YES;
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/states/error_loading_activity.js */
// ==========================================================================
// Project:   Smartgraphs.ERROR_LOADING_ACTIVITY
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that we attempted to load a Activity but encountered an error. Trivial implementation for now.

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/ready');

Smartgraphs.ERROR_LOADING_ACTIVITY = SC.Responder.create(
/** @scope Smartgraphs.ERROR_LOADING_ACTIVITY.prototype */ {

  nextResponder: Smartgraphs.READY,

  didBecomeFirstResponder: function() {    
    Smartgraphs.appWindowController.showErrorLoadingActivityView();
  }
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;

/* >>>>>>>>>> BEGIN source/states/freehand_input.js */
// ==========================================================================
// Project:   Smartgraphs.FREEHAND_INPUT
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/activity_step');

Smartgraphs.FREEHAND_INPUT = SC.Responder.create(
/** @scope Smartgraphs.FREEHAND_INPUT.prototype */ {

  nextResponder: Smartgraphs.ACTIVITY_STEP,
  
  didBecomeFirstResponder: function () {
    var enableSucceeded = Smartgraphs.freehandInputController.enableInput();
    // if freehandInputController says NO, don't accept first responder
    if (enableSucceeded) {
      Smartgraphs.activityViewController.showControls(Smartgraphs.freehandInputController.get('pane'));
    }
    else {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP);
    }
  },
  
  willLoseFirstResponder: function () {
    Smartgraphs.freehandInputController.disableInput();
    Smartgraphs.activityViewController.hideControls(Smartgraphs.freehandInputController.get('pane'));   
  },
  
  // ..........................................................
  // ACTIONS
  //

  startFreehandInput: function () {
    console.error('Attempted to startFreehandInput when in FREEHAND_INPUT state');
    return YES;       // do nothing and consider that handling it!
  },
  
  freehandStrokeCompleted: function () {
    Smartgraphs.activityViewController.highlightClearControl();
  },
  
  clearControlWasClicked: function () {
    this.clearSketch();
  },
  
  clearSketch: function () {
    Smartgraphs.freehandInputController.clearStroke();
    Smartgraphs.activityViewController.disableAllControls();    
  }
}) ;

/* >>>>>>>>>> BEGIN source/states/loading_activity.js */
// ==========================================================================
// Project:   Smartgraphs.LOADING_ACTIVITY
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Loading state for Activity view. (Not called ACTIVITY_LOADING because it is not an ACTIVITY substate)

  @extends SC.Responder
  @extends Smartgraphs.ResourceLoader
  @version 0.1
*/

sc_require('states/ready');
sc_require('states/mixins/resource_loader');

Smartgraphs.LOADING_ACTIVITY = SC.Responder.create(Smartgraphs.ResourceLoader,
/** @scope Smartgraphs.LOADING_ACTIVITY.prototype */ {

  nextResponder: Smartgraphs.READY,
  
  masterResource: {
    load: function () { return Smartgraphs.activityController.get('content'); }
  },
  
  subordinateResources: [
    { load: function () { return Smartgraphs.store.find(Smartgraphs.activityController.get('pagesQuery')); } }
  ],
  
  didBecomeFirstResponder: function () {
    if (this.loadResources()) {
      return;
    }
    Smartgraphs.appWindowController.showActivityLoadingView();
  },
  
  willLoseFirstResponder: function () {
    this.cancelLoading();
  },
  
  resourcesDidLoad: function () {
    Smartgraphs.sessionController.newSession();

    var pages = Smartgraphs.activityController.get('pages');
    Smartgraphs.activityPagesController.set('content', pages);

    if (pages.get('length') > 0) {
      Smartgraphs.activityPagesController.selectFirstPage();
    }
    
    Smartgraphs.activityPageController.set('content', Smartgraphs.activityPagesController.get('selection'));    
    Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_LOADING);
  },

  resourceLoadingError: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.ERROR_LOADING_ACTIVITY);
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  // Handle 're-entrance' (opening a activity while we're still waiting for another activity to load)
  openActivity: function (context, args){
    if (args.id === Smartgraphs.activityController.getPath('content.id')) {
      // do nothing if it's a repeat request to load the same id
      return YES;
    }
    
    //  let READY handle opening the new activity, but we need to resetFirstResponder because the
    // 'makeFirstResponder' call in READY won't cause our didBecomeFirstResponder method to be called again
    Smartgraphs.invokeLater(Smartgraphs.resetFirstResponder);
    return NO;
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/states/login.js */
// ==========================================================================
// Project:   Smartgraphs.LOGIN
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  The login state. 
  
  (The page displayed during this state should implement an "I'm new here" type button to switch to signup mode.)

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.LOGIN = SC.Responder.create(
/** @scope Smartgraphs.LOGIN.prototype */ {

  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    // for now we use just a default user and assume the user record loads in synchronously from fixtures
    Smartgraphs.userController.set('content', Smartgraphs.store.find(Smartgraphs.User, 'default'));
    Smartgraphs.makeFirstResponder(Smartgraphs.READY);
  }
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;

/* >>>>>>>>>> BEGIN source/states/sensor.js */
// ==========================================================================
// Project:   Smartgraphs.SENSOR
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  Superstate representing that the sensor applet is being loaded up or has been loaded

  @extends SC.Responder
  @version 0.1
*/
sc_require('states/activity_step');

Smartgraphs.SENSOR = SC.Responder.create(
/** @scope Smartgraphs.SENSOR.prototype */ {

  nextResponder: Smartgraphs.ACTIVITY_STEP,
  
  didBecomeFirstResponder: function () {
    var enableSucceeded = Smartgraphs.sensorController.enableInput();
    if ( !enableSucceeded ) {
      Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP);
    }
  },
  
  willLoseFirstResponder: function () {
    Smartgraphs.sensorController.disableInput();
    Smartgraphs.activityViewController.hideControls();
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  sensorHasLoaded: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_LOADED);
    return YES;
  },
  
  waitForSensorToLoad: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_LOADING);
    return YES;
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/states/sensor_loaded.js */
// ==========================================================================
// Project:   Smartgraphs.SENSOR_LOADED
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the sensor applet is ready to record data to a data series.

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/sensor');

Smartgraphs.SENSOR_LOADED = SC.Responder.create(
/** @scope Smartgraphs.SENSOR_LOADED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: Smartgraphs.SENSOR,
  
  didBecomeFirstResponder: function () {
    Smartgraphs.activityViewController.showControls(Smartgraphs.sensorController.get('pane'));
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_READY);
  },
  
  willLoseFirstResponder: function () {
  }
  
  // ..........................................................
  // ACTIONS
  //
  
}) ;

/* >>>>>>>>>> BEGIN source/states/sensor_loading.js */
// ==========================================================================
// Project:   Smartgraphs.SENSOR_LOADING
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing an error with the sensor. You could transition here from SENSOR_RECORDING if data stops coming.

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/sensor');

Smartgraphs.SENSOR_LOADING = SC.Responder.create(
/** @scope Smartgraphs.SENSOR_LOADING.prototype */ {

  nextResponder: Smartgraphs.SENSOR,
  
  didBecomeFirstResponder: function () {
    Smartgraphs.activityViewController.showSensorLoadingView(Smartgraphs.sensorController.get('pane'));
  },
  
  willLoseFirstResponder: function () {
  }
  
  // ..........................................................
  // ACTIONS
  //

  
}) ;

/* >>>>>>>>>> BEGIN source/states/sensor_ready.js */
// ==========================================================================
// Project:   Smartgraphs.SENSOR_READY
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the sensor applet is loaded and ready for the user to click 'start'

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/sensor_loaded');

Smartgraphs.SENSOR_READY = SC.Responder.create(
/** @scope Smartgraphs.SENSOR_READY.prototype */ {

  nextResponder: Smartgraphs.SENSOR_LOADED,
  
  didBecomeFirstResponder: function () {
    Smartgraphs.activityViewController.highlightStartControl();
  },
  
  willLoseFirstResponder: function () {
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  startControlWasClicked: function () {
    return this.startSensor();
  },
  
  startSensor: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_RECORDING);
    return YES;
  }

});

/* >>>>>>>>>> BEGIN source/states/sensor_recording.js */
// ==========================================================================
// Project:   Smartgraphs.SENSOR_RECORDING
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the sensor is in the process of recording data.

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/sensor_loaded');

Smartgraphs.SENSOR_RECORDING = SC.Responder.create(
/** @scope Smartgraphs.SENSOR_RECORDING.prototype */ {

  nextResponder: Smartgraphs.SENSOR_LOADED,
  
  didBecomeFirstResponder: function () {
    Smartgraphs.sensorController.startRecording();
    Smartgraphs.activityViewController.highlightStopControl();   
  },
  
  willLoseFirstResponder: function () {
    Smartgraphs.sensorController.stopRecording();
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  stopControlWasClicked: function () {
    return this.stopSensor();
  },
  
  stopSensor: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_STOPPED);
    return YES;
  }

}) ;

/* >>>>>>>>>> BEGIN source/states/sensor_stopped.js */
// ==========================================================================
// Project:   Smartgraphs.SENSOR_STOPPED
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  State representing that the sensor applet has been stopped, ready for data to be cleared or for user to finish
  working with the sensor.

  @extends SC.Responder
  @version 0.1
*/

sc_require('states/sensor_loaded');

Smartgraphs.SENSOR_STOPPED = SC.Responder.create(
/** @scope Smartgraphs.SENSOR_STOPPED.prototype */ {

  nextResponder: Smartgraphs.SENSOR_LOADED,
  
  didBecomeFirstResponder: function () {
    Smartgraphs.activityViewController.highlightClearControl();
  },
  
  willLoseFirstResponder: function () {
  },
  
  // ..........................................................
  // ACTIONS
  //
  
  clearControlWasClicked: function () {
    return this.clearSensor();
  },
  
  clearSensor: function () {
    Smartgraphs.sensorController.clearRecordedData();
    Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_READY);
    return YES;
  }

});
/* >>>>>>>>>> BEGIN source/states/start.js */
// ==========================================================================
// Project:   Smartgraphs.START
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  The transient start state of the Smartgraphs application.

  @extends SC.Responder
  @version 0.1
*/
Smartgraphs.START = SC.Responder.create(
/** @scope Smartgraphs.START.prototype */ {

  nextResponder: null,
  
  didBecomeFirstResponder: function () {
    Smartgraphs.makeFirstResponder(Smartgraphs.LOGIN);
  }
  
  // ..........................................................
  // ACTIONS
  //

}) ;

/* >>>>>>>>>> BEGIN source/views/axis.js */
// ==========================================================================
// Project:   Smartgraphs.AxisView
// Copyright: ©2010 Concord Consortium
// @author:   Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.AxisView = RaphaelViews.RaphaelView.extend(
/** @scope Smartgraphs.AxisView.prototype */ {

  init: function () {
    if (this.get('type') === 'x') {
      this.set('displayProperties', 'axes.xMin axes.xMax axes.xSteps axes.xLabel parentView.parentView.frame'.w());
    }
    else {
      this.set('displayProperties', 'axes.yMin axes.yMax axes.ySteps axes.yLabel parentView.parentView.frame'.w());
    }
    arguments.callee.base.apply(this,arguments);
  },
  
  render: function (context, firstTime) {
    // unfortunately, Raphael can't draw text correctly when the svg element is hidden or offscreen (as it is when
    // rendering with firstTime =TRUE). Thus draw the axis only after the graph is onscreen by waiting until after
    // didCreateLayer. Note that this means the elements that make up the axis are not children of the layer...
    if (!firstTime) {
      this.drawAxis();
      this.drawLabel();
    }
  },
  
  didCreateLayer: function () {
    this._label = null;
    this.invokeLater(this.drawLabel);
    this.invokeLater(this.drawAxis);
  },
  
  drawAxis: function () {
    // the g.raphael axis this._axis has a lot of 'moving parts' so, unlike label, recreate the axis object every time
    // instead of updating it via .attr()
    if (this._axis) this._axis.remove();
    
    var axes = this.get('axes');
    if (!axes) return;
    
    var padding = this.getPath('parentView.parentView.parentView.padding');
    var frame = this.getPath('parentView.parentView.frame');

    var xLeft = frame.x + padding.left;
    var yBottom = frame.y + frame.height - padding.bottom;
    
    if (this.get('type') === 'y') {
      var yMin = axes.get('yMin');
      var yMax = axes.get('yMax');
      var ySteps = axes.get('ySteps');
      var plotHeight = frame.height - padding.top - padding.bottom;
    
      this._axis = this.get('raphaelCanvas').g.axis(xLeft, yBottom, plotHeight, yMin, yMax, ySteps, 1);
    }
    else if (this.get('type') === 'x') {
      var xMin = axes.get('xMin');
      var xMax = axes.get('xMax');
      var xSteps = axes.get('xSteps');
      
      var plotWidth = frame.width - padding.left - padding.right;
      
      this._axis = this.get('raphaelCanvas').g.axis(xLeft, yBottom, plotWidth, xMin, xMax, xSteps, 0);
    }
    
    this._axis.all[0].attr({stroke: '#333333'});          // path
    this._axis.all[1].attr({fill: '#333333'});            // text
  },
  
  drawLabel: function () {
    var padding = this.getPath('parentView.parentView.parentView.padding');
    var frame = this.getPath('parentView.parentView.frame');
    
    var axes  = this.get('axes');
    if (!axes) return;
    
    var labelText, x, y, rotation;
    
    if (this.get('type') === 'x') {
      labelText = axes.get('xLabel');
      x = (padding.left + frame.width - padding.right) / 2;
      y = frame.height - 15;
      rotation = 0;
    }
    else {
      labelText = axes.get('yLabel');
      x = 10;
      y = (padding.top + frame.height - padding.bottom) / 2;
      rotation = 270;
    }
    
    if (this._label) {
      this._label.attr({text: labelText, x: x, y: y});
    }
    else {
      this._label = this.get('raphaelCanvas').text(x, y, labelText).attr({font: "14px Arial, sans-serif", fill: '#333333'}).rotate(rotation);
    }
  }
});

/* >>>>>>>>>> BEGIN source/views/graph.js */
// ==========================================================================
// Project:   Smartgraphs.GraphView
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs RaphaelViews */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.GraphView = SC.View.extend( 
/** @scope Smartgraphs.GraphView.prototype */ {
  
  axesBinding: '*graphController.axes',
  seriesListBinding: '*graphController.seriesList',
  annotationListBinding: '*graphController.annotationList',
  
  padding: { top: 15, right: 15, bottom: 45, left: 45 },  
  
  childViews: 'titleView graphCanvasView'.w(),
  
  init: function () {
    this._viewsByClassAndId = {};
    arguments.callee.base.apply(this,arguments);
  },
  
  viewDidResize: function () {
    arguments.callee.base.apply(this,arguments);
    this.replaceLayer();
  },
  
  annotationListDidChange: function () {
    this._itemListsDidChange();
  }.observes('*annotationList.[]'),
  
  seriesListDidChange: function () {
    this._itemListsDidChange();
  }.observes('*seriesList.[]'),
  
  _itemListsDidChange: function () {  
    var list = this.get('seriesList').concat(this.get('annotationList'));
    var item, className, id;
    var desiredViewsByClassAndId = {};
    
    // add views for items (series or annotations) not currently in the list of child views
    for (var i = 0, ii = list.get('length'); i < ii; i++) {
      item = list.objectAt(i);
      className = item.constructor.toString();
      id = item.get('id');
      
      if (desiredViewsByClassAndId[className] === undefined) {
        desiredViewsByClassAndId[className] = {};
      }
      
      desiredViewsByClassAndId[className][id] = item;     // for our reference when we remove views
      
      if (!this._viewsByClassAndId[className] || !this._viewsByClassAndId[className][id]) {
        this._addViewForItem(item);
      }
    }
    
    // remove views for no-longer-to-be-displayed items
    var oldView;
    
    for (className in this._viewsByClassAndId) {
      if (this._viewsByClassAndId.hasOwnProperty(className)) {
        for (id in this._viewsByClassAndId[className]) {
          if (this._viewsByClassAndId[className].hasOwnProperty(id)) {
            oldView = this._viewsByClassAndId[className][id];
            
            if (!desiredViewsByClassAndId[className] || !desiredViewsByClassAndId[className][id]) {
              this._removeView(oldView);
            }
          }
        }
      }
    }
  },
  
  
  _addViewForItem: function (item) {
    var className = item.constructor.toString();

    var view = item.constructor.viewClass.design({
        graphView: this,
        item: item
    }).create();
    
    this.get('graphCanvasView').appendChild(view);
    
    if (this._viewsByClassAndId[className] === undefined) {
      this._viewsByClassAndId[className] = {};
    }    
    this._viewsByClassAndId[className][item.get('id')] = view;
  },
  
  
  _removeView: function (view) {
    var item = view.get('item');
    var className = item.constructor.toString();
    var id = item.get('id');
    
    delete this._viewsByClassAndId[className][id];
    this.get('graphCanvasView').removeChild(view);
  },  
  
  
  coordinatesForPoint: function (x, y) {
    var axes = this.get('axes');

    if (!axes) return undefined;

    var xMin = axes.get('xMin'),
        xMax = axes.get('xMax'),
        yMin = axes.get('yMin'),
        yMax = axes.get('yMax');

    var frame = this.get('frame');
    var height = frame.height,
        width  = frame.width;
        
    var padding = this.get('padding');
    
    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;
    
    var xScale = plotWidth / (xMax - xMin);
    var yScale = plotHeight / (yMax - yMin);
    
    return { 
      x: padding.left + (x - xMin) * xScale,
      y: padding.top + plotHeight - (y - yMin) * yScale
    };
  },
  
  
  pointForCoordinates: function (x, y) {
    var axes = this.get('axes');

    if (!axes) return undefined;
    
    var xMin = axes.get('xMin'),
        xMax = axes.get('xMax'),
        yMin = axes.get('yMin'),
        yMax = axes.get('yMax');

    var frame = this.get('frame');
    var height = frame.height,
        width  = frame.width;
        
    var padding = this.get('padding');
    
    var plotWidth = width - padding.left - padding.right;
    var plotHeight = height - padding.top - padding.bottom;
    
    var xScale = plotWidth / (xMax - xMin);
    var yScale = plotHeight / (yMax - yMin);
    
    return {
      x: xMin + (x - padding.left) / xScale,
      y: yMin + (padding.top + plotHeight - y) / yScale
    };
  },
  
  titleView: SC.LabelView.design({
    valueBinding: '.parentView*graphController.title',
    classNames: 'pane-label',
    layout: { width: 400, centerX: 0, height: 20, top: 20, zIndex: 1 },
    textAlign: SC.ALIGN_CENTER
  }),
  
  graphCanvasView: RaphaelViews.RaphaelCanvasView.design({

    layout: { zIndex: 0 },
    
    axesBinding: '.parentView.axes',
    
    displayProperties: 'axes.xMin axes.xMax axes.yMin axes.yMax'.w(),
    
    childViews: 'axesView'.w(),
      
    axesView: RaphaelViews.RaphaelView.design({
      axesBinding: '.parentView.parentView.axes',      
      paddingBinding: '.parentView.parentView.padding',
      
      childViews: 'inputArea xAxisView yAxisView'.w(),
      
      inputArea: RaphaelViews.RaphaelView.design({
        axesBinding: '.parentView.parentView.parentView*axes',
        
        didCreateLayer: function () {
          // cache these rather than lookup the jquery object (graphView.$()) per mouse event
          this._graphView = this.getPath('parentView.parentView.parentView');
          this._$graphView = this._graphView.$();
        },
        
        renderCallback: function (raphaelCanvas, xLeft, yTop, plotWidth, plotHeight) {          
          return raphaelCanvas.rect(xLeft, yTop, plotWidth, plotHeight).attr({
            fill: '#ffffff', stroke: '#ffffff', opacity: 0.7 
          });
        },
        
        render: function (context, firstTime) {
          var frame = this.getPath('parentView.parentView.frame');
          var padding = this.getPath('parentView.parentView.parentView.padding');

          var xLeft = frame.x + padding.left;
          var yTop = frame.y + padding.top;
          var plotWidth = frame.width - padding.left - padding.right;
          var plotHeight = frame.height - padding.top - padding.bottom;
          
          if (firstTime) {
            context.callback(this, this.renderCallback, xLeft, yTop, plotWidth, plotHeight);
          }
          else {       
            var rect = context.raphael();
            rect.attr({x: xLeft, y: yTop, width: plotWidth, height: plotHeight});
          }
        },
        
        coordsForEvent: function (e) {
          var graphOffset = this._$graphView.offset();
          return { x: e.pageX - graphOffset.left, y: e.pageY - graphOffset.top };
        },

        mouseDown: function (evt) {
          this._graphController = this._graphView.get('graphController');
          var coords = this.coordsForEvent(evt);
          var point = this._graphView.pointForCoordinates(coords.x, coords.y);
          return this._graphController.inputAreaMouseDown(point.x, point.y);
        },

        mouseDragged: function (evt) {
          var coords = this.coordsForEvent(evt);  
          var point = this._graphView.pointForCoordinates(coords.x, coords.y);
          return this._graphController.inputAreaMouseDragged(point.x, point.y);
        },

        mouseUp: function (evt) {
          var coords = this.coordsForEvent(evt);
          var point = this._graphView.pointForCoordinates(coords.x, coords.y);
          return this._graphController.inputAreaMouseUp(point.x, point.y);
        }
      }),
      
      xAxisView: Smartgraphs.AxisView.design({
        axesBinding: '.parentView.parentView.parentView.axes',
        type: 'x'
      }),
      
      yAxisView: Smartgraphs.AxisView.design({
        axesBinding: '.parentView.parentView.parentView.axes',
        type: 'y'
      })
    })
  })
});

/* >>>>>>>>>> BEGIN source/views/graph_pane.js */
// ==========================================================================
// Project:   Smartgraphs.GraphPane
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.GraphPane = SC.View.extend(
/** @scope Smartgraphs.GraphPane.prototype */ {

  childViews: 'graphView controlsContainer'.w(),
  
  graphView: Smartgraphs.GraphView.design({
    graphControllerBinding: '.parentView.graphController',
    viewName: 'secondGraphPane'
  }),

  controlsContainer: SC.ContainerView.design({
    layout: { bottom: 0, height: 0 }
  }),
  
  controlsNowShowingDidChange: function () {
    var nowShowing = this.get('controlsNowShowing');
    var bottom = 0, 
        height = 0;
    
    if (nowShowing) {
      bottom = 35; 
      height = 35;
    }
    
    this.get('graphView').adjust('bottom', bottom);
    this.get('controlsContainer').adjust('height', height);
    this.setPath('controlsContainer.nowShowing', nowShowing);

  }.observes('controlsNowShowing')

});

/* >>>>>>>>>> BEGIN source/views/image.js */
// ==========================================================================
// Project:   Smartgraphs.ImageView
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.ImageView = SC.View.extend(
/** @scope Smartgraphs.ImageView.prototype */ {

  // TODO: Add your own code here.

});

/* >>>>>>>>>> BEGIN source/views/question.js */
// ==========================================================================
// Project:   Cc.QuestionView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.QuestionView = SC.StackedView.extend(SC.StaticLayout, {
	
	layout: {top: 0, left: 0, right: 0},

  classNames: ['question','open-response-question'],

  contentDisplayProperties: 'prompt'.w(),

	prompt: "[prompt]",
	
	useStaticLayout: NO,
		
	childViews: 'promptView inputView'.w(),
	
	promptView: SC.LabelView.design(SC.StaticLayout, {
		classNames: 'question-prompt',
		useStaticLayout: YES,
		escapeHTML: NO,
		layout: { left: 5, right: 5 },
		valueBinding: "*parentView.prompt"
	}),

	inputView: SC.View.design(SC.StaticLayout, {
		layout: {left: 20, top: 5, width: 600, height: 95 },
		useStaticLayout: YES,
		childViews: 'textFieldView'.w(),
		textFieldView: SC.TextFieldView.design({
			classNames: 'question-input',
			isTextArea: YES
		})
	})

});

/* >>>>>>>>>> BEGIN source/views/response_template.js */
// ==========================================================================
// Project:   Smartgraphs.ResponseTemplateView
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// @author    Dr. Baba Kofi Weusijana <kofi@edutek.net>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.StaticContentView
*/
Smartgraphs.ResponseTemplateView = SC.StaticContentView.extend(
/** @scope Smartgraphs.ResponseTemplateView.prototype */
{

  // Bind these properties
  fieldTypes: [],
  fieldChoicesList: [],
  values: [],
  editingShouldBeEnabled: null,

  // hide if there is no response template; especially important because IE7 doesn't its height as 0 when empty.
  isVisibleBinding: SC.Binding.bool('.fieldTypes'),

  fieldsTypesDidChange: function () {
    this.clearChildViews();
    this.invokeOnce(this.addChildViews);
  }.observes('fieldTypes'),

  clearChildViews: function () {
    this._firstInputFieldView = null;
    this.get('childViews').invoke('destroy');
  },

  addChildViews: function () {
    var fieldTypes = this.get('fieldTypes');
    if (!fieldTypes) return;

    var fieldChoicesList = this.get('fieldChoicesList');
    var values = this.get('values');
    
    var fieldType;

    for (var i = 0, ii = fieldTypes.get('length'); i < ii; i++) {
      fieldType = fieldTypes.objectAt(i);
      this.addChildView(fieldType, fieldChoicesList.objectAt(i), values.objectAt(i), i);
      
      if (i === 0 && (fieldType === 'numeric' || fieldType === 'textarea')) {
        this._firstInputFieldView = this.get('childViews').objectAt(0).get('childViews').objectAt(0);
        this.invokeLater(this._beginEditingFirstView);
      }
    }
  },
  
  addChildView: function (fieldType, fieldChoices, initialValue, fieldIndex) {
    var view;
    
    switch (fieldType) {
      case 'textarea':
        view = this.wrap(this.makeTextAreaDesign(initialValue, fieldIndex), {
          height: 97
        });
        break;
      case 'numeric': 
        view = this.wrap(this.makeNumericFieldDesign(initialValue, fieldIndex), {
          height: 22,
          width: 100
        });
        break;
      case 'multiplechoice':
        view = this.makeMultipleChoiceView(fieldChoices, initialValue, fieldIndex);
        break;
      default:
        throw "ResponseTemplateView received unexpected field type string '" + fieldType + "'.";
    }
    
    this.appendChild(view);
  },
  
  wrap: function (subViewDesign, layout) {
    return SC.View.design({
      useStaticLayout: YES,
      layout: layout,
      classNames: 'text-field-view-wrapper'.w(),

      childViews: [subViewDesign]
    }).create();
  },
  
  makeTextAreaDesign: function (initialValue, fieldIndex) {
    return SC.TextFieldView.design({
      isTextArea: YES,
      hint:  'Enter your answer here...',
      fieldIndex: fieldIndex,
      value: initialValue,
      isEnabledBinding: '.parentView.parentView.editingShouldBeEnabled',

      valueDidChange: function () {
        var values = this.getPath('parentView.parentView.values');
        values.replace(this.get('fieldIndex'), 1, this.get('value'));
      }.observes('value')
    });
  },
  
  makeNumericFieldDesign: function (initialValue, fieldIndex) {
    return SC.TextFieldView.design({
      isTextArea: NO,
      fieldIndex: fieldIndex,
      value: initialValue,
      isEnabledBinding: '.parentView.parentView.editingShouldBeEnabled',

      valueDidChange: function () {
        var values = this.getPath('parentView.parentView.values');
        values.replace(this.get('fieldIndex'), 1, this.get('value'));
      }.observes('value')
    });
  },
  
  makeMultipleChoiceView: function (fieldChoices, initialValue, fieldIndex) {
    var items = [];
    
    // transform ['Choice 1', 'Choice 2'] -> [ {title: 'Choice 1', index: 1}, {title: 'Choice 2', index: 2} ]
    items = fieldChoices.reduce(function (prev, item, index) {
      return prev.concat({ title: item, index: index+1 });
    }, []);
    
    return SC.RadioView.design({
      items: items,
      itemTitleKey: 'title', 
      itemValueKey: 'index',
      
      fieldIndex: fieldIndex,
      value: initialValue,
      isEnabledBinding: '.parentView.editingShouldBeEnabled',
      useStaticLayout: YES,     
      
      valueDidChange: function () {
        var values = this.getPath('parentView.values');
        values.replace(this.get('fieldIndex'), 1, this.get('value'));
      }.observes('value'),
      
      didAppendToDocument: function () {
        this.invokeLater(this.adjustItemHeights);
      },
      
      adjustItemHeights: function () {
        this.$('.sc-radio-button').each( function () {
          var labelHeight = $(this).find('.sc-button-label').outerHeight();
          $(this).css({height: labelHeight});

          var $button = $(this).find('.button');
          $button.css({marginTop: Math.max( (labelHeight - $button.height()) / 2 - 3, 0) });
        });
      }
    }).create();
  },

  _beginEditingFirstView: function () {
    if (this._firstInputFieldView) {
      this._firstInputFieldView.beginEditing();
    }
  }
});

/* >>>>>>>>>> BEGIN source/views/table.js */
// ==========================================================================
// Project:   Smartgraphs.TableView
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Smartgraphs.TableView = SC.View.extend(
/** @scope Smartgraphs.TableView.prototype */ {

  // TODO: Add your own code here.

});

/* >>>>>>>>>> BEGIN source/resources/activity_page.js */
// ==========================================================================
// Project:   Smartgraphs.activityPage
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

// This is a place to hold the activityView until it's appended to the document

Smartgraphs.activityPage = SC.Page.design({

  activityView: SC.View.design({
    childViews: 'instructionsWrapper dataWrapper'.w(),
    
    loadingMessage: 'Loading Activity...',
    
    // ..........................................................
    // LEFT PANE
    //
    // the left pane shows the activity page intro and the instructions for the currently selected activity step
    
    instructionsWrapper: SC.View.design({
      layout: { left: 0, width: 0.5 },       // need to specify 0.5 rather than '50%'
      childViews: 'instructionsView'.w(),
      
      instructionsView: SC.View.design({
        layout: { right: 5, top: 0, bottom: 0 },
        classNames: 'smartgraph-pane',
        childViews: 'textWrapper nextButton pageInfo'.w(),

        // provide padding and style rules for the intro text and dialog
        textWrapper: SC.View.design({
          layout: {
            top: 20,
            right: 20,
            bottom: 70,
            left: 20
          },

          classNames: 'text-wrapper'.w(),

          childViews: 'introText activityStepWrapper'.w(),

          introText: SC.StaticContentView.design({
            contentBinding: SC.Binding.oneWay('Smartgraphs.activityPageController.introText'),
            isVisibleBinding: SC.Binding.bool('Smartgraphs.activityPageController.introText')
          }),
          
          activityStepWrapper: SC.View.design({
            useStaticLayout: YES,
            
            childViews: 'activityStepDialog buttonsView'.w(),
            
            activityStepDialog: SC.View.design({          
              useStaticLayout: YES,
              
              childViews: 'beforeText responseTemplate afterText'.w(),
              classNames: 'dialog-text'.w(),

              beforeText: SC.StaticContentView.design({
                contentBinding: SC.Binding.oneWay('Smartgraphs.activityStepController.beforeText'),
                isVisibleBinding: SC.Binding.bool('Smartgraphs.activityStepController.beforeText')
              }),
              
              responseTemplate: Smartgraphs.ResponseTemplateView.design({
                fieldTypesBinding: 'Smartgraphs.responseTemplateController.fieldTypes',
                fieldChoicesListBinding: 'Smartgraphs.responseTemplateController.fieldChoicesList',
                valuesBinding: 'Smartgraphs.responseTemplateController.values',
                editingShouldBeEnabledBinding: 'Smartgraphs.responseTemplateController.editingShouldBeEnabled'
              }),
              
              afterText: SC.StaticContentView.design({
                contentBinding: SC.Binding.oneWay('Smartgraphs.activityStepController.afterText'),
                isVisibleBinding: SC.Binding.bool('Smartgraphs.activityStepController.afterText')
              })
            }),
          
            buttonsView: SC.View.design({
              useStaticLayout: YES,
            
              layout: {
                height: 24
              },

              childViews: 'submitButton'.w(),

              submitButton: SC.ButtonView.design({
                layout: {
                  width: 80,
                  right: 0
                },
                titleBinding: 'Smartgraphs.activityStepController.submitButtonTitle',
                isVisibleBinding: 'Smartgraphs.activityViewController.showSubmitButton',
                isEnabledBinding: 'Smartgraphs.activityViewController.enableSubmitButton',
                isDefaultBinding: 'Smartgraphs.activityViewController.enableSubmitButton',                
                action: 'submitStep'
              })
            })
          })
        }),

        nextButton: SC.ButtonView.design({
          layout: {
            right: 30,            
            bottom: 36,
            height: 24,
            width: 110
          },
          title: "Next Page >>",
          action: 'gotoNextPage',
          isVisibleBinding: 'Smartgraphs.activityViewController.showNextPageButton',
          isEnabledBinding: 'Smartgraphs.activityViewController.enableNextPageButton',
          isDefaultBinding: 'Smartgraphs.activityViewController.enableNextPageButton'
        }),
        
        // TODO disabled for now, until we have page *visitation* working.

        // backButton: SC.ButtonView.design({
        //   layout: {
        //     bottom: 36,
        //     left: 30,
        //     height: 24,
        //     width: 80
        //   },
        //   title: "<< Back",
        //   action: 'openPreviousActivityPage',
        //   isEnabledBinding: SC.Binding.oneWay('Smartgraphs.activityPagesController.canSelectPreviousPage'),
        //   isVisibleBinding: SC.Binding.not('Smartgraphs.activityPagesController.isFirstPage').oneWay()
        // }),

        pageInfo: SC.LabelView.design({
          classNames: 'pane-label',
          layout: {
            bottom: 36,
            left: 30,
            height: 24,
            width: 200
          },
          valueBinding: 'Smartgraphs.activityPagesController.pageInfo',
          isVisible: YES
        })
      })
    }),
    
    
    // ..........................................................
    // RIGHT PANE
    //
    // the right pane shows the data the user is manipulating
    dataWrapper: SC.View.design({
      layout: { right: 0, width: 0.5 },
      
      childViews: 'dataView'.w(),
      
      dataView: SC.ContainerView.design({
        layout: { left: 5 },
        nowShowingBinding: 'Smartgraphs.activityViewController.dataViewNowShowing'
      })
    })
  }),
  
  singlePaneDataView: SC.ContainerView.design({
    classNames: 'smartgraph-pane',
    nowShowingBinding: 'Smartgraphs.activityViewController.singlePaneNowShowing'
  }),
  
  splitPaneDataView: SC.View.design({
    childViews: 'topPaneWrapper bottomPaneWrapper'.w(),
    
    topPaneWrapper: SC.View.design({
      layout: { top: 0, height: 0.5 },
      childViews: 'topPane'.w(),
      
      topPane: SC.ContainerView.design({
        layout: { bottom: 5 },
        classNames: 'smartgraph-pane',
        nowShowingBinding: 'Smartgraphs.activityViewController.topPaneNowShowing'
      })
    }),

    bottomPaneWrapper: SC.View.design({
      layout: { bottom: 0, height: 0.5 },
      childViews: 'bottomPane'.w(),
    
      bottomPane: SC.ContainerView.design({
        layout: { top: 5 },
        classNames: 'smartgraph-pane',//TEMP
        nowShowingBinding: 'Smartgraphs.activityViewController.bottomPaneNowShowing'
      })
    })
  }),
  
  firstImageView: SC.ImageView.design({
    useStaticLayout: YES,
    valueBinding: 'Smartgraphs.activityViewController.firstImageValue',

    // This is a hack.  At the moment SC.View.layoutStyle doesn't know how to set width or height to '100%',
    // but it does recognize numbers between 0 and 1, non-inclusive, as percentages; 0.9999999 appears to be about
    // the smallest number that gets recognized as a percentage and gets rounded up to 'height=100%' (rather than
    // 'height=99.9999%')
    
    layout: { width: 0.9999999, height: 0.9999999 }
  }),
  
  secondImageView: SC.ImageView.design({
    useStaticLayout: YES,
    valueBinding: 'Smartgraphs.activityViewController.secondImageValue',

    // same hack described in firstImageView:
    layout: { width: 0.9999999, height: 0.9999999 }
  }),
  
  firstGraphPane: Smartgraphs.GraphPane.design({
    graphControllerBinding: 'Smartgraphs.firstGraphController',
    controlsNowShowingBinding: 'Smartgraphs.activityViewController.firstGraphPaneControls'
  }),
  
  secondGraphPane: Smartgraphs.GraphPane.design({
    graphControllerBinding: 'Smartgraphs.secondGraphController',
    controlsNowShowingBinding: 'Smartgraphs.activityViewController.secondGraphPaneControls'
  }),
  
  firstTableView: Smartgraphs.TableView.design({}),
  
  secondTableView: Smartgraphs.TableView.design({}),
  
  errorLoadingActivityView: SC.View.design({
    classNames: 'smartgraph-pane',
    childViews: 'errorMessage'.w(),
    
    errorMessage: SC.LabelView.design({
      layout: { height: 32, width: 500, centerX: 0, centerY: 0 },
      classNames: 'error',
      textAlign: SC.ALIGN_CENTER,
      value: 'There was an error loading that Activity.'
    })
  }),
  
  graphControlsView: SC.View.design({
    layout: { height: 35 },
    
    childViews: 'startControl stopControl clearControl'.w(),
    
    startControl: SC.ButtonView.design({
      layout: { centerX: -110, bottom: 10, width: 80, height: 24 },
      isVisibleBinding: 'Smartgraphs.activityViewController.startControlIsVisible',
      isEnabledBinding: 'Smartgraphs.activityViewController.startControlIsEnabled',      
      isDefaultBinding: 'Smartgraphs.activityViewController.startControlIsDefault',
      
      title: 'Start',
      action: 'startControlWasClicked'
    }),
    
    stopControl: SC.ButtonView.design({
      layout: { centerX: 0, bottom: 10, width: 80, height: 24 },
      isVisibleBinding: 'Smartgraphs.activityViewController.stopControlIsVisible',
      isEnabledBinding: 'Smartgraphs.activityViewController.stopControlIsEnabled',      
      isDefaultBinding: 'Smartgraphs.activityViewController.stopControlIsDefault',
      
      title: 'Stop',
      action: 'stopControlWasClicked'
    }),
    
    clearControl: SC.ButtonView.design({
      layout: { centerX: 110, bottom: 10, width: 80, height: 24 },
      isVisibleBinding: 'Smartgraphs.activityViewController.clearControlIsVisible',
      isEnabledBinding: 'Smartgraphs.activityViewController.clearControlIsEnabled',      
      isDefaultBinding: 'Smartgraphs.activityViewController.clearControlIsDefault',
      
      title: 'Reset',
      action: 'clearControlWasClicked'
    })
  }),
  
  sensorLoadingView: SC.LabelView.design({
    layout: { height: 35 },
    classNames: 'sensor-message'.w(),
    textAlign: SC.ALIGN_CENTER,
    value: 'Please wait, the sensor is loading...'
  })
  
});

/* >>>>>>>>>> BEGIN source/resources/applet_page.js */
// ==========================================================================
// Project:   Smartgraphs.appletPage
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// @author    Aaron Unger <aunger@concord.org>
// ==========================================================================
/*globals Smartgraphs CC */

// This page holds the applet view definition off-DOM until we need to start it up.
// Be prepared to take a long coffee break when you start it up, though

Smartgraphs.appletPage = SC.Page.design({

  sensorAppletView: CC.SensorAppletView.design({
    layout: { width: 1, height: 1 },
    listenerPath: 'Smartgraphs.sensorController'   // path to object that will receive applet callbacks
  })
  
});

//   
//     safariSensorStatePath: 'Smartgraphs.appletPage.sensorAppletView.sensorState',
//     hideButtons: YES,
//     dt: 0.1,
//     
//     
//     resultsBinding: "Smartgraphs.selectedPointsController",
//     listenerPath: "Smartgraphs.appletPage.appletPane.contentView.sensorApplet", // absolute path to this instance...
//     
//     // old hardwired hacks
//     everyNth: 2,
//     maxPoints: 75,
//     _nsamples: 0,
//     _npoints: 0,
//     
//     dataReceived: function (type, numPoints, data) {
//       var content = this.getPath('results');
// 
//       var dt = this.get('dt');
//       var size = content.get('length');
//       
//       var everyNth = this.get('everyNth');
//       var maxPoints = this.get('maxPoints');
//       
//       for (var i = 0; i < numPoints; i++) {
//         var yVal = data[i];      
//         if (this._nsamples % everyNth === 0) {
// 
//           SC.RunLoop.begin();
//           Smartgraphs.sendAction('sensorDataReceived', this, {x: this._nsamples*dt, y: yVal });
//           SC.RunLoop.end();
//           
//           // this will migrate to sensorController and SENSOR_* states
//         }
//         this._nsamples++;
//       }
//     },
//     
//     sensorsReady: function() {
//       SC.RunLoop.begin();
//       // enable the start button
//       this.setPath('parentView.startButton.isEnabled', YES);
//       this.getPath('parentView.resetButton').action();
//       SC.RunLoop.end();
//     }
//   }),
// 
// 
// 
//   appletPane: SC.PalettePane.design({
//     layout: {
//       left: 0,
//       top: 0,
//       width: 255,
//       height: 285
//     },
//     
//     contentView: SC.View.design({
//      // don't actually hide the applet - it doesn't like it very much. 
//       childViews: 'sensorApplet startButton stopButton resetButton'.w(),
//     
//       sensorApplet: CC.SensorAppletView.design({
//         layout: {
//           left: 0, 
//           top: 0, 
//           width: 1, 
//           height: 1
//         },
// 
//         safariSensorStatePath: 'Smartgraphs.appletPage.appletPane.contentView.sensorApplet.sensorState',
//         hideButtons: YES,
//         dt: 0.1,
//         resultsBinding: "Smartgraphs.selectedPointsController",
//         listenerPath: "Smartgraphs.appletPage.appletPane.contentView.sensorApplet", // absolute path to this instance...
//         
//         // old hardwired hacks
//         everyNth: 2,
//         maxPoints: 75,
//         _nsamples: 0,
//         _npoints: 0,
//         
//         dataReceived: function (type, numPoints, data) {
//           var content = this.getPath('results');
// 
//           var dt = this.get('dt');
//           var size = content.get('length');
//           
//           var everyNth = this.get('everyNth');
//           var maxPoints = this.get('maxPoints');
//           
//           for (var i = 0; i < numPoints; i++) {
//             var yVal = data[i];      
//             if (this._nsamples % everyNth === 0) {
// 
//               SC.RunLoop.begin();
//               Smartgraphs.sendAction('sensorDataReceived', this, {x: this._nsamples*dt, y: yVal });
//               SC.RunLoop.end();
//               
//               // this will migrate to sensorController and SENSOR_* states
//             }
//             this._nsamples++;
//           }
//         },
//         
//         sensorsReady: function() {
//           SC.RunLoop.begin();
//           // enable the start button
//           this.setPath('parentView.startButton.isEnabled', YES);
//           this.getPath('parentView.resetButton').action();
//           SC.RunLoop.end();
//         }
//       }),
//        
//       startButton: SC.ButtonView.design({
//         layout: {
//           centerX: 0, 
//           centerY: -60,          
//           height: 24, 
//           width: 160
//         },
// 
//         isEnabled: NO, // disabled until the sensor applet signals that it is ready
//         title: "Start",
//         appletBinding: ".parentView.sensorApplet",
// 
//         action: function() {
//           this.set('isEnabled', NO);
//           this.setPath('parentView.stopButton.isEnabled', YES);
//           this.setPath('parentView.resetButton.isEnabled', YES);
//           this.get('applet').start();
//           this.get('applet')._nsamples = 0;
//         }
//       }),
//       
//       stopButton: SC.ButtonView.design({
//         layout: {
//           centerX: 0, 
//           centerY: 0, 
//           height: 24, 
//           width: 160
//         },
// 
//         isVisibleBinding: '.parentView.shouldBeEnabled',    
//         isEnabled: NO, // disabled until the sensor applet signals that it is ready
//         title: "Stop",
//         appletBinding: ".parentView.sensorApplet",
// 
//         action: function() {
//           this.set('isEnabled', NO);
//           this.get('applet').stop();
//         }
//       }),
//       
//       resetButton: SC.ButtonView.design({        
//         layout: { 
//           centerX: 0, 
//           centerY: 60, 
//           height: 24, 
//           width: 160
//         },
//         
//         isVisibleBinding: '.parentView.shouldBeEnabled', 
//         isEnabled: NO, // disabled until the sensor applet signals that it is ready
//         title: "Reset",
//         appletBinding: ".parentView.sensorApplet",
//         resultsBinding: "Smartgraphs.selectedPointsController",
//        
//         action: function() {
//           this.set('isEnabled', NO);
//           this.setPath('parentView.stopButton.isEnabled', NO);
//           this.setPath('parentView.startButton.isEnabled', YES);
//           this.get('applet').reset();
//           var content = this.getPath('results');
//           content.invoke('destroy');
//           Smartgraphs.store.commitRecords();
//           this.get('applet')._nsamples = 0;
//         }
//       })
//    })
//   })
// 
// });

/* >>>>>>>>>> BEGIN source/resources/main_page.js */
// ==========================================================================
// Project:   Smartgraphs - mainPage
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

// This page describes the main user interface  
Smartgraphs.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    // this minimum width & height should not overflow on a 1024x768 screen even in a browsing setup with lots of 
    // extraneous on-screen chrome (say, in FF or IE running in Windows XP)
    layout: { width: 960, height: 600 },

    childViews: 'container'.w(),
    
    defaultResponder: 'Smartgraphs',
    
    container: SC.ContainerView.design({
      layout: { top: 15, right: 20, bottom: 15, left: 20 },
      nowShowingBinding: 'Smartgraphs.appWindowController.nowShowing'
    })
  }),
  
  // a generic loading view for whatever is loading into mainPane.container
  loadingView: SC.View.design({
    classNames: 'smartgraph-pane'.w(),
    childViews: 'loadingIconView loadingMessageView'.w(),
    
    loadingIconView: SC.ImageView.design({
      layout: { width: 48, height: 48, centerX: 0, centerY: -39 },
      value: '/static/smartgraphs/es/6dca466763f18fb87eebad83879709b4e8d9aa45/resources/pane_loading.gif'
    }),
    
    loadingMessageView: SC.LabelView.design({
      classNames: 'loading'.w(),
      layout: { width: 200, height: 24, centerX: 0, centerY: 15 },
      textAlign: SC.ALIGN_CENTER,
      valueBinding: 'Smartgraphs.appWindowController.loadingMessage'
    })
  })

});

/* >>>>>>>>>> BEGIN source/main.js */
// ==========================================================================
// Project:   Smartgraphs
// Copyright: ©2010 Concord Consortium
// @author    Richard Klancer <rpk@pobox.com>
// ==========================================================================
/*globals Smartgraphs */

Smartgraphs.main = function main() {
  
  // cascade the Rails data source in front of the fixtures data source until everything is transferred to Rails
  Smartgraphs.dataSource = SC.CascadeDataSource.create({
    dataSources: "rest fixtures".w(),
    
    rest: Smartgraphs.RestDataSource.create(),
    
    fixtures: SC.FixturesDataSource.create({
      simulateRemoteResponse: NO,
      latency: 500
    })
  });
  
  Smartgraphs.store = SC.Store.create().from(Smartgraphs.dataSource);
  
  // make the mainPane visible on screen.
  Smartgraphs.getPath('mainPage.mainPane').append() ;

  // We're letting SC.route handle navigating to a particular Activity. It needs a runloop to sync up, so 
  // just reach in and set default window.location.hash for now.
  if (!window.location.hash) {
    window.location.hash = '/backend/activity/1';      // default activity for now
  }
  
  // ... then the START state will kick things off
  Smartgraphs.makeFirstResponder(Smartgraphs.START);
  
} ;

function main() { Smartgraphs.main(); }

