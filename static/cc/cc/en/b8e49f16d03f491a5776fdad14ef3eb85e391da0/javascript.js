/* >>>>>>>>>> BEGIN source/lproj/strings.js */
// ==========================================================================
// Project:   CC Strings
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

// Place strings you want to localize here.  In your app, use the key and
// localize it using "key string".loc().  HINT: For your key names, use the
// english string with an underscore in front.  This way you can still see
// how your UI will look and you'll notice right away when something needs a
// localized string added to this file!
//
SC.stringsFor('English', {
  // "_String Key": "Localized String"
}) ;

/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   CC
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @namespace

  My cool new framework.  Describe your framework.
  
  @extends SC.Object
*/
CC = SC.Object.create(
  /** @scope CC.prototype */ {

  NAMESPACE: 'CC',
  VERSION: '0.1.0'

  // TODO: Add global constants or singleton objects needed by your app here.

}) ;

/* >>>>>>>>>> BEGIN source/models/question.js */
// ==========================================================================
// Project:   Cc.Question
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
CC.Question = SC.Object.extend(
/** @scope Cc.Question.prototype */ {
  
  prompt: "This is a prompt",
  
  input: "This in an input"

}) ;

/* >>>>>>>>>> BEGIN source/views/applet.js */
// ==========================================================================
// Project:   Cc.AppletView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  A simple view for embedding applets

  @extends SC.View
*/
CC.AppletView = SC.View.extend(
/** @scope Cc.AppletView.prototype */ {
  
  jarUrls: '',    // e.g. 'http://mw2.concord.org/public/lib/mwapplet.jar'. If more than one jar, they can be comma-separated
  
  code: '',       // main class. e.g. 'org.concord.modeler.MwApplet'
  
  params: '',     // any params, as html. e.g. '<param name="script" value="..."/>'
  
  width: 600,
  
  height: 400,

	appletInstance: function() {
		return this.$('#' + this.get('appletId'))[0];
	},

  render: function(context, firstTime) {
			this.renderAppletHtml(context);
  },
  
  renderAppletHtml: function(context) {
	  var appletContext = context.begin('applet');
	  appletContext.attr('id', this.get('appletId'));
	  appletContext.attr('archive', this.get('jarUrls'));
	  appletContext.attr('code', this.get('code'));
	  appletContext.attr('width', '100%');
	  appletContext.attr('height', this.get('height'));
	  appletContext.attr('MAYSCRIPT', 'true');
		appletContext.push(this.get('params'));
		appletContext.end();
  },
  
  classNames: "applet",
  
  layout: { centerX: 0, centerY: 0, width: 600, height: 400 },     // defaults

	appletId: function() {
		return this.get('layerId') + '-applet';
	}.property('layerId').cacheable(),
	
	run: function(func) {
		func(this.appletInstance());
	}
});

/* >>>>>>>>>> BEGIN source/views/auto_scroll.js */
// ==========================================================================
// Project:   CC.AutoScollView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
CC.AutoScrollView = SC.ScrollView.extend(
/** @scope Cc.AutoScollView.prototype */ {

  autoScrollTrigger: null,     // bind this to anything that changes to have it scroll to bottom on change
  
  autoScroll: function() {
    var self = this;
    function scrollToMax() {
      var maxY = self.get('maximumVerticalScrollOffset');
      self.set('verticalScrollOffset', maxY) ;
    }
    // double invoke last -- this fixes a problem where it would sometimes
    // not scroll far enough, leaving the last item or 2 still not showing
    self.invokeLast(function() { self.invokeLast(scrollToMax); });
  }.observes('autoScrollTrigger')
});

/* >>>>>>>>>> BEGIN source/views/question.js */
// ==========================================================================
// Project:   Cc.QuestionView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
CC.QuestionView = SC.StackedView.extend(SC.StaticLayout, {
	
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

/* >>>>>>>>>> BEGIN source/views/multiple_choice_question.js */
// ==========================================================================
// Project:   CC.MultipleChoiceQuestionView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  (Document Your View Here)

  @extends CC.QuestionView
*/
require('views/question');
CC.MultipleChoiceQuestionView = CC.QuestionView.extend(
/** @scope CC.MultipleChoiceQuestionView.prototype */ {
	classNames: ['question','multiple-choice-question'],
	
	choices: '1 2 3 4'.w(),
  canSelectMultipleAnswers: NO,

	inputView: SC.RadioView.design(SC.StaticLayout, {
		layout: {left: 20, top: 5, width: 600, height: 95 },
		useStaticLayout: YES,
		classNames: 'question-input',
		itemsBinding: '*parentView.choices',
		
		// FIXME! This is necessary because SC.RadioView doesn't properly recreate its child
		// radio buttons after the first time it renders itself.
		itemsChanged: function() {
			this.replaceLayer();
		}.observes('items')
	})

});

/* >>>>>>>>>> BEGIN source/views/mw_applet.js */
// ==========================================================================
// Project:   Cc.MwAppletView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  A simple view for embedding MW applets. The only property that must be set is
  the url to the .cml file.

  @extends CC.AppletView
*/
CC.MwAppletView = CC.AppletView.extend(
/** @scope Cc.MwAppletView.prototype */ {  

  cmlUrl: '',         // url to cml file
  
  params: function() {    // adds cml url as the param to the mw applet
    return '<param name="script" value="page:0:import ' + this.get('cmlUrl') + '"/>';
  }.property('cmlUrl'),
  
  jarUrls: 'http://mw2.concord.org/public/lib/mwapplet.jar',
  
  code: 'org.concord.modeler.MwApplet',
  
  width: 600,
  
  height: 400,
  
  classNames: "mw-applet",
  
  layout: { centerX: 0, centerY: 0, width: 600, height: 400 }     // defaults

});
/* >>>>>>>>>> BEGIN source/views/sensor_applet.js */
// ==========================================================================
// Project:   CC.SensorAppletView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CC */

/** @class

  (Document Your View Here)

  @extends CC.AppletView
*/
CC.SensorAppletView = CC.AppletView.extend(
/** @scope CC.SensorAppletView.prototype */ {
	
	//OVERRIDES!!! These are typically overridden in the page definitions
	// This is the Javascript object path to the listener function... eg App.mainPage.mainPane.sensorApplet.sensorListener
	listenerPath: 'defaultDataListener',
	
	// the Javascript object path to the sensorState variable, which needs to be used under safari to trigger starting and stopping the sensors
	safariSensorStatePath: null,
	
	// these need to be overridden when implemented, if you want to use this view as the data listener
	// called whenever data is received in the sensor. dataPoints is an array of floats
	dataRecieved: function(dataType, numberOfDataPoints, dataPoints) {},
	
	// called whenever meta data about the data stream changes
	dataStreamEvent: function(dataType, numberOfDataPoints, dataPoints) {},
	
	// called when the applet is done initializing itself, and the sensors are ready to be used
	sensorsReady: function() {},
	
	// END OVERRIDES!!!
	
	// TODO This only supports a Vernier GoMotion right now...
	resourcePath: '/simple.otml',
	
	isSafari: function() {
		// detect safari
		if (typeof(navigator) != 'undefined' && typeof(navigator.vendor) != 'undefined' && navigator.vendor.indexOf("Apple") != -1) {
			return YES;
		}
		return NO;
	}(),
	
	// this is the javascript object patch to a String variable which will store the current sensor applet's state: "ready", "running", "stopped"
	sensorStatePath: function() {
		if (this.get('isSafari')) {
			return this.get('safariSensorStatePath');
		}
		return null;
	}.property('isSafari', 'safariSensorStatePath'),
	// the current sensor applet's state: "ready", "running", "stopped". If sensorStatePath is set, the applet will watch this variable for changes to trigger
	// starting and stopping the sensors. This is necessary on Safari on Mac OSX since the javascript can sometimes not call applet methods directly.
	sensorState: "ready",
	
	appletName: "sensorApplet",

	params: function() {    // adds cml url as the param to the mw applet
		var params = [
			'<param name="resource" value="' + this.get('resourcePath') + '" />',
			'<param name="listenerPath" value="' + this.get('listenerPath') + '" />',
			'<param name="name" value="' + this.get('appletName') + '" />'
		];
		if (this.get('sensorStatePath') !== null) {
			params.pushObject('<param name="sensorStatePath" value="' + this.get('sensorStatePath') + '" />');
		}
		return params.join("");
	}.property('resourcePath'),
	
	jarUrls: ['http://jnlp.concord.org/dev/org/concord/sensor/sensor-applets/sensor-applets.jar?version-id=0.1.0-20100601.160817-14',
						'http://jnlp.concord.org/dev/org/concord/otrunk/otrunk.jar?version-id=0.2.0-20100519.081729-231',
						'http://jnlp.concord.org/dev/org/concord/framework/framework.jar?version-id=0.1.0-20100518.155205-550',
						'http://jnlp.concord.org/dev/org/concord/frameworkview/frameworkview.jar?version-id=0.1.0-20100518.160605-394',
						'http://jnlp.concord.org/dev/org/concord/swing/swing.jar?version-id=0.1.0-20100518.155225-382',
						'http://jnlp.concord.org/dev/jug/jug/jug.jar?version-id=1.1.2',
						'http://jnlp.concord.org/dev/jdom/jdom/jdom.jar?version-id=1.0',
						'http://jnlp.concord.org/dev/org/concord/apple-support/apple-support.jar?version-id=0.1.0-20100518.155355-314',
						'http://jnlp.concord.org/dev/org/concord/utilities/response-cache/response-cache.jar?version-id=0.1.0-20100503.180141-215',
						'http://jnlp.concord.org/dev/org/concord/sensor-native/sensor-native.jar?version-id=0.1.0-20100520.192620-460',
						'http://jnlp.concord.org/dev/org/concord/sensor/sensor.jar?version-id=0.2.0-20100519.082617-265',
						'http://jnlp.concord.org/dev/org/concord/data/data.jar?version-id=0.2.0-20100518.160532-268',
						'http://jnlp.concord.org/dev/org/concord/external/rxtx/rxtx-comm/rxtx-comm.jar?version-id=2.1.7-r2' ].join(', '),
	
	code: 'org.concord.sensor.applet.OTSensorApplet',
	
	width: 160,
	height: 40,
	
	classNames: "sensor-applet",
	
	layout: { centerX: 0, centerY: 0, width: 160, height: 40 },     // defaults
	
	start: function() {
		this.set('sensorState', 'running');
		if (this.get('isSafari') == NO || this.get('sensorStatePath') === null) {
			this.run(function(applet) { applet.startCollecting(); });
		}
	},
	
	stop: function() {
		this.set('sensorState', 'stopped');
		if (this.get('isSafari') == NO || this.get('sensorStatePath') === null) {
			this.run(function(applet) { applet.stopCollecting(); });
		}
	},
	
	reset: function() {
		this.set('sensorState', 'ready');
		if (this.get('isSafari') == NO || this.get('sensorStatePath') === null) {
			this.run(function(applet) { applet.stopCollecting(); });
		}
	}

});

/* >>>>>>>>>> BEGIN bundle_loaded.js */
; if ((typeof SC !== 'undefined') && SC && SC.bundleDidLoad) SC.bundleDidLoad('cc/cc');
