(function(){var a="sproutcore/ace";if(!SC.BUNDLE_INFO){throw"SC.BUNDLE_INFO is not defined!"
}if(SC.BUNDLE_INFO[a]){return}SC.BUNDLE_INFO[a]={requires:["sproutcore/empty_theme"],styles:["/static/sproutcore/ace/en/71fef724301b04e00df8643ac18a190f56ab68a0/stylesheet-packed.css","/static/sproutcore/ace/en/71fef724301b04e00df8643ac18a190f56ab68a0/stylesheet.css"],scripts:["/static/sproutcore/ace/en/71fef724301b04e00df8643ac18a190f56ab68a0/javascript-packed.js","/static/sproutcore/ace/en/71fef724301b04e00df8643ac18a190f56ab68a0/javascript.js"]}
})();Smartgraphs=SC.Application.create({NAMESPACE:"Smartgraphs",VERSION:"0.1.0",triggers:[],_nextGuid:1,getNextGuid:function(){return this._nextGuid++
},trace:NO,useMockResponses:YES,logDataSource:NO});Smartgraphs.activityController=SC.ObjectController.create({lookup:function(b){var a=this.get("context");
return(a.hasOwnProperty(b)?a[b]:undefined)},cleanup:function(){Smartgraphs.activityPageController.cleanup()
},canOpenNextPage:NO});Smartgraphs.activityPageController=SC.ObjectController.create({lookup:function(b){var a=this.get("context");
return(a.hasOwnProperty(b)?a[b]:Smartgraphs.activityController.lookup(b))},cleanup:function(){Smartgraphs.firstGraphController.clear();
Smartgraphs.secondGraphController.clear();Smartgraphs.activityViewController.clear();
Smartgraphs.activityStepController.cleanup()}});Smartgraphs.activityPagesController=SC.ArrayController.create({allowsMultipleSelection:NO,indexOfSelectedPage:function(){var a=this.get("selection");
var b=a.indexSetForSource(this);return(b?b.toArray().objectAt(0):undefined)}.property("selection","[]").cacheable(),selectFirstPage:function(){if(this.get("length")>0){this.selectObject(this.objectAt(0))
}},selectNextPage:function(){var a=this.get("indexOfSelectedPage");if(a+1<this.get("length")){this.selectObject(this.objectAt(a+1))
}}});Smartgraphs.activityStepController=SC.ObjectController.create({registeredTriggers:[],submitButtonShouldBeEnabled:NO,begin:function(){this.registerTriggerResponses();
Smartgraphs.sendAction("fireActivityEvent",this,{eventName:"stepBeginning"})},finish:function(){Smartgraphs.sendAction("fireActivityEvent",this,{eventName:"stepFinished"})
},cleanup:function(){this.unregisterOldTriggers()},unregisterOldTriggers:function(){var c=this.get("registeredTriggers");
for(var a=0,b=c.get("length");a<b;a++){c[a].unregister()}this.set("registeredTriggers",[])
},registerTriggerResponses:function(){var h=this.get("triggerResponses");var e=this.get("registeredTriggers");
var f,a,b,d,j,c;for(var g=0,k=h.get("length");g<k;g++){f=h.objectAt(g);a=f.get("trigger");
b=a.get("name");d=Smartgraphs.triggers[b];if(d){j=SC.mixin(SC.copy(a.get("args")),f.get("args"));
c=f.get("commands");d.register(j,c);e.pushObject(d)}}},configureInputValidator:function(b){var c=Smartgraphs.activityStepController.get("registeredTriggers");
var a;if(c.lastIndexOf("responseBecameValid")<0){a=Smartgraphs.triggers.responseBecameValid;
a.register(b,[]);c.pushObject(a)}if(c.lastIndexOf("responseBecameInvalid")<0){a=Smartgraphs.triggers.responseBecameInvalid;
a.register({},[]);c.pushObject(a)}},executeCommands:function(g){var f,c,a,e,d,h;for(var b=0,j=g.get("length");
b<j;b++){f=g.objectAt(b);c=f.get("command");d=SC.mixin(SC.copy(c.get("literalArgs")),f.get("literalArgs"));
e=SC.mixin(SC.copy(c.get("substitutedArgs")),f.get("substitutedArgs"));for(h in e){if(e.hasOwnProperty(h)){d[h]=this.lookup(e[h])
}}Smartgraphs.sendAction(c.get("actionName"),this,d)}},lookup:function(b){var a=this.get("context");
return(a.hasOwnProperty(b)?a[b]:Smartgraphs.activityPageController.lookup(b))}});
Smartgraphs.activityViewController=SC.ObjectController.create({dataViewNowShowing:null,topPaneNowShowing:null,bottomPaneNowShowing:null,singlePaneNowShowing:null,firstImageValue:null,secondImageValue:null,paneIsSplit:null,showSinglePane:function(){this.set("paneIsSplit",false);
this.set("dataViewNowShowing","Smartgraphs.activityPage.singlePaneDataView")},showSplitPane:function(){this.set("paneIsSplit",true);
this.set("dataViewNowShowing","Smartgraphs.activityPage.splitPaneDataView")},showImage:function(b,a){if(this.get("paneIsSplit")){if(b==="top"){this.set("firstImageValue",a);
this.set("topPaneNowShowing","Smartgraphs.activityPage.firstImageView");return YES
}if(b==="bottom"){this.set("secondImageValue",a);this.set("bottomPaneNowShowing","Smartgraphs.activityPage.secondImageView");
return YES}}else{this.set("firstImageValue",a);this.set("singlePaneNowShowing","Smartgraphs.activityPage.firstImageView");
return YES}return NO},showGraph:function(b,a){if(this.get("paneIsSplit")){if(b==="top"){Smartgraphs.firstGraphController.openGraph(a);
this.set("topPaneNowShowing","Smartgraphs.activityPage.firstGraphView");return YES
}if(b==="bottom"){Smartgraphs.secondGraphController.openGraph(a);this.set("bottomPaneNowShowing","Smartgraphs.activityPage.secondGraphView");
return YES}}else{Smartgraphs.firstGraphController.openGraph(a);this.set("singlePaneNowShowing","Smartgraphs.activityPage.firstGraphView");
return YES}return NO},hidePane:function(a){if(this.get("paneIsSplit")){if(a==="top"){this.set("topPaneNowShowing",null);
return YES}if(a==="bottom"){this.set("bottomPaneNowShowing",null);return YES}}else{this.set("singlePaneNowShowing",null);
return YES}return NO},createSeriesView:function(a){},removeSeriesView:function(a){},clear:function(){if(!this.hidePane()){this.hidePane("top");
this.hidePane("bottom")}}});Smartgraphs.appWindowController=SC.ObjectController.create({nowShowing:null,loadingMessage:null,showActivityView:function(){this.set("nowShowing","Smartgraphs.activityPage.activityView")
},showActivityLoadingView:function(){this.set("nowShowing","Smartgraphs.mainPage.loadingView");
this.set("loadingMessage",Smartgraphs.activityPage.getPath("activityView.loadingMessage"))
},showActivityLoadingErrorView:function(){this.set("nowShowing","Smartgraphs.activityPage.errorLoadingActivityView")
}});Smartgraphs.GraphController=SC.ObjectController.extend(SC.Responder,{seriesList:null,selectedSeries:null,annotationList:null,_routeEvents:NO,eventQueue:[],freehandIsOn:NO,openGraph:function(b){var f=Smartgraphs.store.find(Smartgraphs.Graph,b);
if(!f){f=Smartgraphs.store.createRecord(Smartgraphs.Graph,{id:b});Smartgraphs.store.commitRecords()
}this.set("content",f);this.set("seriesList",[]);this.set("annotationList",[]);var c=this.get("initialSeries")||[];
for(var d=0,e=c.get("length");d<e;d++){this.addObjectByName(Smartgraphs.DataSeries,c.objectAt(d))
}c=this.get("initialAnnotations")||[];var a;for(d=0,e=c.get("length");d<e;d++){a=c.objectAt(d);
this.addObjectByName(SC.objectForPropertyPath(a.type),a.name)}},setAxes:function(a){var b=Smartgraphs.store.find(Smartgraphs.Axes,a);
if(!b){b=Smartgraphs.store.createRecord(Smartgraphs.Axes,{guid:a})}this.set("axes",b);
Smartgraphs.store.commitRecords()},addSeries:function(a){if(this.findSeriesByName(a.get("name"))){return NO
}this.get("seriesList").pushObject(a);Smartgraphs.store.commitRecords();return YES
},addObjectByName:function(a,e){var d=SC.Query.local(a,"name={name} AND session={session}",{name:e,session:Smartgraphs.sessionController.getPath("content")});
var c=Smartgraphs.store.find(d);if(c.get("length")<1){d=SC.Query.local(a,"name={name} AND isExample=YES",{name:e});
c=Smartgraphs.store.find(d);if(c.get("length")<1){return NO}}var b=c.objectAt(0);
if(a===Smartgraphs.DataSeries){this.addSeries(b);return YES}if(b.get("isAnnotation")){this.addAnnotation(b)
}},removeSeries:function(a){var c=this.get("seriesList");var b=this.findSeriesByName(a);
if(b){c.removeObject(b)}},findSeriesByName:function(a){var d=this.get("seriesList");
var c;for(var b=0,e=d.get("length");b<e;b++){c=d.objectAt(b);if(c.get("name")===a){return c
}}},findAnnotationByName:function(d){var e=this.get("annotationList");var a;for(var b=0,c=e.get("length");
b<c;b++){a=e.objectAt(b);if(a.get("name")===d){return a}}return null},selectSeries:function(a){var b=this.findSeriesByName(a);
if(b){this.set("selectedSeries",b)}},removeAllSeries:function(){},addAnnotation:function(a){if(this.findAnnotationByName(a.get("name"))){return NO
}this.get("annotationList").pushObject(a);return YES},clear:function(){this.set("seriesList",[]);
this.set("annotationList",[]);this.set("content",null)},inputAreaMouseDown:function(a,b){if(this._routeEvents){this._eventQueue.pushObject({x:a,y:b,type:Smartgraphs.freehandInputController.START})
}},inputAreaMouseDragged:function(a,b){if(this._routeEvents){this._eventQueue.pushObject({x:a,y:b,type:Smartgraphs.freehandInputController.CONTINUE})
}},inputAreaMouseUp:function(a,b){if(this._routeEvents){this._eventQueue.pushObject({x:a,y:b,type:Smartgraphs.freehandInputController.END})
}},startFreehandInput:function(){this._routeEvents=YES;this._eventQueue=this.get("eventQueue");
this.set("freehandIsOn",YES)},endFreehandInput:function(){this.set("freehandIsOn",NO);
this._routeEvents=NO}});sc_require("controllers/graph");Smartgraphs.firstGraphController=Smartgraphs.GraphController.create({viewPath:"activityPage.firstGraphView"});
Smartgraphs.freehandInputController=SC.ObjectController.create({_inputStarted:NO,register:function(b,a){if(this._inputStarted){return NO
}var c=b?b.findAnnotationByName(a):NO;if(c&&SC.kindOf(c,Smartgraphs.FreehandSketch)){this._graphController=b;
this._sketch=c;return YES}return NO},startInput:function(){if(!this._sketch){return NO
}this._inputStarted=YES;this._graphController.startFreehandInput();this._graphController.get("eventQueue").addObserver("[]",this,this.graphObserver);
return YES},endInput:function(){this.graphObserver();this._graphController.get("eventQueue").removeObserver("[]",this,this.graphObserver);
this._graphController.endFreehandInput();this._graphController=null;this._sketch=null;
this._inputStarted=NO},graphObserver:function(){var b,a=this._graphController.get("eventQueue");
while((b=a.shiftObject())){switch(b.type){case this.CONTINUE:this.continueAt(b.x,b.y);
break;case this.START:this.startAt(b.x,b.y);break;case this.END:this.endAt(b.x,b.y);
break}}},startAt:function(a,b){this._sketch.set("points",[{x:a,y:b}])},continueAt:function(a,b){this._sketch.get("points").pushObject({x:a,y:b})
},endAt:function(a,b){this._sketch.get("points").pushObject({x:a,y:b})}});Smartgraphs.freehandInputController.START=1;
Smartgraphs.freehandInputController.CONTINUE=2;Smartgraphs.freehandInputController.END=3;
Smartgraphs.pageNavController=SC.ArrayController.create({nextShouldBeEnabled:NO,backShouldBeEnabled:NO,currentIndex:null,visitableIndices:null,nextShouldBeEnabledBinding:"Smartgraphs.activityController.canOpenNextPage"});
Smartgraphs.responseTemplateController=SC.ObjectController.create({contentBinding:"Smartgraphs.activityStepController.responseTemplate",contentDidChange:function(){this.invokeOnce(this._initializeValues)
}.observes("content"),_initializeValues:function(){var a=this.get("initialValues");
if(a){this.set("values",a.copy())}},editingShouldBeEnabled:NO});sc_require("controllers/graph");
Smartgraphs.secondGraphController=Smartgraphs.GraphController.create({viewPath:"activityPage.secondGraphView"});
Smartgraphs.selectedPointsController=SC.ArrayController.create({contentBinding:"Smartgraphs.selectedSeriesController.points",addSensorPoint:function(b,c){var a=Smartgraphs.store.createRecord(Smartgraphs.DataPoint,{x:b,y:c,guid:Smartgraphs.getNextGuid()});
this.pushObject(a);Smartgraphs.store.commitRecords()}});Smartgraphs.selectedSeriesController=SC.ObjectController.create({nBins:50,xMin:null,xMax:null});
Smartgraphs.sessionController=SC.ObjectController.create({newSession:function(){var a=Smartgraphs.store.createRecord(Smartgraphs.Session,{steps:[]});
a.set("user",Smartgraphs.userController.get("content"));a.set("id",Smartgraphs.getNextGuid());
this.set("content",a);Smartgraphs.store.commitRecords()},createSeries:function(a){var b=Smartgraphs.store.createRecord(Smartgraphs.DataSeries,{isExample:NO,name:a,points:[]});
b.set("session",this.get("content"));b.set("id",Smartgraphs.getNextGuid());Smartgraphs.store.commitRecords();
return b},createAnnotation:function(a,c){var b=Smartgraphs.store.createRecord(c,{isExample:NO,name:a});
b.set("session",this.get("content"));b.set("id",Smartgraphs.getNextGuid());return b
},copyExampleSeries:function(m,c){var h=SC.Query.local(Smartgraphs.DataSeries,"isExample=YES AND name={seriesName}",{seriesName:m});
var f=Smartgraphs.store.find(h);if(f.get("length")<1){return NO}var j=f.objectAt(0);
h=SC.Query.local(Smartgraphs.DataSeries,"isExample=NO AND session={session} AND name={seriesName}",{session:this.get("content"),name:c});
var g=Smartgraphs.store.find(h);if(g.get("length")<1){return NO}var a=g.objectAt(0);
var d=j.get("points");var k,b;for(var e=0,l=d.get("length");e<l;e++){k=d[e];b=Smartgraphs.store.createRecord(Smartgraphs.DataPoint,{x:k.get("x"),y:k.get("y")});
b.set("id",Smartgraphs.getNextGuid());b.set("series",a)}Smartgraphs.store.commitRecords();
return YES}});Smartgraphs.userController=SC.ObjectController.create({});Smartgraphs.mockResponses={};
sc_require("data_sources/mock_responses/mock_responses");Smartgraphs.mockResponses["/backend/activity/1"]={"trigger-list-url":"/backend/triggers","command-list-url":"/backend/commands",title:"Away and Toward",url:"/backend/activity/1",pages:["/backend/activity/1/page/1","/backend/activity/1/page/2","/backend/activity/1/page/3","/backend/activity/1/page/4"],pageListUrl:"/backend/activity/1/pages"};
Smartgraphs.mockResponses["/backend/activity/2"]={"trigger-list-url":"/backend/triggers","command-list-url":"/backend/commands",title:"Second Activity",url:"/backend/activity/1",pages:["/backend/activity/2/page/1"],pageListUrl:"/backend/activity/2/pages"};
sc_require("data_sources/mock_responses/mock_responses");Smartgraphs.mockResponses["/backend/activity/1/pages"]=[{steps:["/backend/activity/1/page/1/step/1"],name:"Introductory Page",firstStep:"/backend/activity/1/page/1/step/1",introText:"<h1>How can you tell a story about motion without using words?</h1>\n\n<p>The picture at right communicates direction of traffic using recognizable symbols. In this activity, you will explore how motions in two opposite directions appear on a position-time graph. By doing so, you will learn conventional methods of motion storytelling and analysis.</p>",url:"/backend/activity/1/page/1",activity:"/backend/activity/1",index:1,stepListUrl:"/backend/activity/1/page/1/steps"},{steps:["/backend/activity/1/page/2/step/1","/backend/activity/1/page/2/step/2"],name:"Prediction Page",firstStep:"/backend/activity/1/page/2/step/1",introText:"<p>Let\u2019s start by demonstrating what you already know about representing motion on a graph. Imagine a straight walking path that is 5 meters long. Point A is at the 0-meter mark. Point B is at the 4-meter mark.</p>",url:"/backend/activity/1/page/2",activity:"/backend/activity/1",index:2,stepListUrl:"/backend/activity/1/page/2/steps"},{steps:["/backend/activity/1/page/3/step/1","/backend/activity/1/page/3/step/2"],name:"Motion Sensor Page",firstStep:"/backend/activity/1/page/3/step/1",introText:"<p>Let\u2019s practice collecting data with the motion sensor so you can see whether your sketches were accurate. You will walk on a 5-meter walking path like the one described earlier.</p>",url:"/backend/activity/1/page/3",activity:"/backend/activity/1",index:3,stepListUrl:"/backend/activity/1/page/3/steps"},{steps:["/backend/activity/1/page/4/step/1"],name:"Replay Page",firstStep:"/backend/activity/1/page/4/step/1",introText:"<p>How did the actual graph of your motion compare to your prediction?<p>",url:"/backend/activity/1/page/4",activity:"/backend/activity/1",index:4,stepListUrl:"/backend/activity/1/page/4/steps"}];
Smartgraphs.mockResponses["/backend/activity/1/page/1"]={steps:["/backend/activity/1/page/1/step/1"],name:"Introductory Page",firstStep:"/backend/activity/1/page/1/step/1",introText:"<h1>How can you tell a story about motion without using words?</h1>\n\n<p>The picture at right communicates direction of traffic using recognizable symbols. In this activity, you will explore how motions in two opposite directions appear on a position-time graph. By doing so, you will learn conventional methods of motion storytelling and analysis.</p>",url:"/backend/activity/1/page/1",activity:"/backend/activity/1",index:1,stepListUrl:"/backend/activity/1/page/1/steps"};
Smartgraphs.mockResponses["/backend/activity/1/page/2"]={steps:["/backend/activity/1/page/2/step/1","/backend/activity/1/page/2/step/2"],name:"Prediction Page",firstStep:"/backend/activity/1/page/2/step/1",introText:"<p>Let\u2019s start by demonstrating what you already know about representing motion on a graph. Imagine a straight walking path that is 5 meters long. Point A is at the 0-meter mark. Point B is at the 4-meter mark.</p>",url:"/backend/activity/1/page/2",activity:"/backend/activity/1",index:2,stepListUrl:"/backend/activity/1/page/2/steps"};
Smartgraphs.mockResponses["/backend/activity/1/page/3"]={steps:["/backend/activity/1/page/3/step/1","/backend/activity/1/page/3/step/2"],name:"Motion Sensor Page",firstStep:"/backend/activity/1/page/3/step/1",introText:"<p>Let\u2019s practice collecting data with the motion sensor so you can see whether your sketches were accurate. You will walk on a 5-meter walking path like the one described earlier.</p>",url:"/backend/activity/1/page/3",activity:"/backend/activity/1",index:3,stepListUrl:"/backend/activity/1/page/3/steps"};
Smartgraphs.mockResponses["/backend/activity/1/page/4"]={steps:["/backend/activity/1/page/4/step/1"],name:"Replay Page",firstStep:"/backend/activity/1/page/4/step/1",introText:"<p>How did the actual graph of your motion compare to your prediction?<p>",url:"/backend/activity/1/page/4",activity:"/backend/activity/1",index:4,stepListUrl:"/backend/activity/1/page/4/steps"};
Smartgraphs.mockResponses["/backend/activity/2/page/1"]={steps:["/backend/activity/2/page/1/step/1"],name:"First Page of Second Activity",firstStep:"/backend/activity/2/page/1/step/1",introText:"<h1>A Second Activity</h1>",url:"/backend/activity/2/page/1",activity:"/backend/activity/2",index:1,stepListUrl:"/backend/activity/2/page/1/steps"};
Smartgraphs.mockResponses["/backend/activity/2/pages"]=[Smartgraphs.mockResponses["/backend/activity/2/page/1"]];
sc_require("data_sources/mock_responses/mock_responses");Smartgraphs.mockResponses["/backend/activity/1/page/1/steps"]=[{url:"/backend/activity/1/page/1/step/1",activityPage:"/backend/activity/1/page/1",beforeText:"",responseTemplate:null,afterText:"",buttons:[],triggerResponses:["/backend/activity/1/page/1/step/1/response/1/step-beginning"],submitButtonShouldBeVisible:false,submitButtonTitle:"",isLastStep:true,triggerResponseListUrl:"/backend/activity/1/page/1/step/1/trigger_responses",commandListUrl:"/backend/activity/1/page/1/step/1/commands"}];
Smartgraphs.mockResponses["/backend/activity/1/page/2/steps"]=[{url:"/backend/activity/1/page/2/step/1",activityPage:"/backend/activity/1/page/2",beforeText:"<p>In the top-right area, draw a graph of someone walking at a slow, steady pace from point A to point B between 0 and 15 seconds.</p>",responseTemplate:null,afterText:"",buttons:[],triggerResponses:["/backend/activity/1/page/2/step/1/response/1/step-beginning","/backend/activity/1/page/2/step/1/response/2/step-finished"],submitButtonShouldBeVisible:true,submitButtonTitle:"Done",isLastStep:false,triggerResponseListUrl:"/backend/activity/1/page/2/step/1/trigger_responses",commandListUrl:"/backend/activity/1/page/2/step/1/commands"},{url:"/backend/activity/1/page/2/step/2",activityPage:"/backend/activity/1/page/2",beforeText:"<p>In the bottom-right area, draw a graph of someone walking at a slow, steady pace from point B to point A between 0 and 15 seconds. Click Next when you are ready.</p>",responseTemplate:null,afterText:"",buttons:[],triggerResponses:["/backend/activity/1/page/2/step/2/response/1/step-beginning"],submitButtonShouldBeVisible:true,submitButtonTitle:"Done",isLastStep:true,triggerResponseListUrl:"/backend/activity/1/page/2/step/2/trigger_responses",commandListUrl:"/backend/activity/1/page/2/step/2/commands"}];
Smartgraphs.mockResponses["/backend/activity/1/page/3/steps"]=[{url:"/backend/activity/1/page/3/step/1",activityPage:"/backend/activity/1/page/3",beforeText:"<p>Place the sensor at the 0-meter mark. Stand near the sensor. When you are ready, have your partner click Start to record the position and time data for your movements. Walk on the path for 15 seconds. Experiment with different kinds of motions (walking fast, slow, forward, backward\u2026) Click Stop after 15 seconds is up. Click Reset to try a different movement.</p>",responseTemplate:null,afterText:"",buttons:[],triggerResponses:["/backend/activity/1/page/3/step/1/response/1/step-beginning","/backend/activity/1/page/3/step/1/response/2/step-finished"],submitButtonShouldBeVisible:true,submitButtonTitle:"Done",isLastStep:false,triggerResponseListUrl:"/backend/activity/1/page/3/step/1/trigger_responses",commandListUrl:"/backend/activity/1/page/3/step/1/commands"},{url:"/backend/activity/1/page/3/step/2",activityPage:"/backend/activity/1/page/3",beforeText:"<p>How are different motions represented on a position-time graph? (For example, what does the graph look like when you are standing still, walking forward ...?)</p><p>Try to use some of the following words: slope, flat, upward, downward, curved, straight, steep, gradual, line, curve.",responseTemplate:"/backend/response-template/2/open",afterText:"",buttons:[],triggerResponses:["/backend/activity/1/page/3/step/2/response/1/step-beginning"],submitButtonShouldBeVisible:true,submitButtonTitle:"Submit My Answer",isLastStep:true,triggerResponseListUrl:"/backend/activity/1/page/3/step/2/trigger_responses",commandListUrl:"/backend/activity/1/page/3/step/2/commands"}];
Smartgraphs.mockResponses["/backend/activity/1/page/4/steps"]=[{url:"/backend/activity/1/page/4/step/1",activityPage:"/backend/activity/1/page/3",beforeText:"<p>At right is your prediction and your actual motion, together</p>",responseTemplate:null,afterText:"",buttons:[],triggerResponses:["/backend/activity/1/page/4/step/1/response/1/step-beginning"],submitButtonShouldBeVisible:false,submitButtonTitle:"",isLastStep:true,triggerResponseListUrl:"/backend/activity/1/page/4/step/1/trigger_responses",commandListUrl:"/backend/activity/1/page/4/step/1/commands"}];
Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1"]={url:"/backend/activity/2/page/1/step/1",activityPage:"/backend/activity/2/page/1",beforeText:"<p>Try visiting the first activity by changing just the last digit of the URL from '2' to '1' and hitting Enter.<p><p>Also, observe that you can resize the browser window without scrambling the prediction graph on the right.</p>",responseTemplate:null,afterText:"",buttons:[],triggerResponses:["/backend/activity/2/page/1/step/1/response/1/step-beginning"],submitButtonShouldBeVisible:false,submitButtonTitle:"",isLastStep:true,triggerResponseListUrl:"/backend/activity/2/page/1/step/1/trigger_responses",commandListUrl:"/backend/activity/2/page/1/step/1/commands"};
Smartgraphs.mockResponses["/backend/activity/2/page/1/steps"]=[Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1"]];
sc_require("data_sources/mock_responses/mock_responses");Smartgraphs.mockResponses["/backend/commands"]=[{url:"/backend/command/1/show-single-pane",name:"showSinglePane",description:"Set the right-side display to show a single pane.",actionName:"showSinglePane",literalArgs:{},substitutedArgs:{}},{url:"/backend/command/10/hide-pane",name:"hidePane",description:"Hide the first or second pane.",actionName:"hidePane",literalArgs:{},substitutedArgs:{}},{url:"/backend/command/11/wait-for-response",name:"waitForResponse",description:"Wait for a valid response before allowing submission.",actionName:"waitForResponse",literalArgs:{},substitutedArgs:{}},{url:"/backend/command/2/show-split-pane",name:"showSplitPane",description:"Set the right-side display to show two panes.",actionName:"showSplitPane",literalArgs:{},substitutedArgs:{}},{url:"/backend/command/3/show-image",name:"showFirstPaneImage",description:"Set the right-side display to show an image in the first (or top) pane.",actionName:"showImage",literalArgs:{pane:"single"},substitutedArgs:{}},{url:"/backend/command/4/show-graph",name:"showGraph",description:"Set the right-side display to show a graph.",actionName:"showGraph",literalArgs:{},substitutedArgs:{}},{url:"/backend/command/5/enable-submission",name:"enableSubmission",description:"Allows the user to submit his or her work on this step",actionName:"enableSubmission",literalArgs:{},substitutedArgs:{}},{url:"/backend/command/6/finish-step",name:"finishActivityStep",description:"Finishes this Activity step.",actionName:"finishActivityStep",literalArgs:{},substitutedArgs:{}},{url:"/backend/command/7/start-freehand-input",name:"startFreehandInput",description:"Open up the prediction graph.",actionName:"startFreehandInput",literalArgs:{},substitutedArgs:{}},{url:"/backend/command/8/goto-step",name:"openActivityStep",description:"Open a new activity step.",actionName:"openActivityStep",literalArgs:{},substitutedArgs:{}},{url:"/backend/command/9/start-sensor-input",name:"startSensorInput",description:"Open the controls that input data from a usb-connected sensor.",actionName:"startSensorInput",literalArgs:{},substitutedArgs:{}}];
sc_require("data_sources/mock_responses/mock_responses");Smartgraphs.mockResponses["/backend/activity/1/page/1/step/1/commands"]=[{url:"/backend/activity/1/page/1/step/1/response/1/command/1/single-pane",command:"/backend/command/1/show-single-pane",triggerResponse:"/backend/activity/1/page/1/step/1/response/1/step-beginning",index:1,literalArgs:{},substitutedArgs:{}},{url:"/backend/activity/1/page/1/step/1/response/1/command/2/show-image",command:"/backend/command/3/show-image",triggerResponse:"/backend/activity/1/page/1/step/1/response/1/step-beginning",index:2,literalArgs:{path:"/static/smartgraphs/en/current/resources/arrow.jpg?1281156420"},substitutedArgs:{}},{url:"/backend/activity/1/page/1/step/1/response/1/command/3/finish-step",command:"/backend/command/6/finish-step",triggerResponse:"/backend/activity/1/page/1/step/1/response/1/step-beginning",index:3,literalArgs:{},substitutedArgs:{}}];
Smartgraphs.mockResponses["/backend/activity/1/page/2/step/1/commands"]=[{url:"/backend/activity/1/page/2/step/1/response/1/command/1/split-pane",command:"/backend/command/2/show-split-pane",triggerResponse:"/backend/activity/1/page/2/step/1/response/1/step-beginning",index:1,literalArgs:{},substitutedArgs:{}},{url:"/backend/activity/1/page/2/step/1/response/1/command/2/show-graph",command:"/backend/command/4/show-graph",triggerResponse:"/backend/activity/1/page/2/step/1/response/1/step-beginning",index:3,literalArgs:{pane:"top",graphId:"/backend/activity/1/graph/1/prediction-away"},substitutedArgs:{}},{url:"/backend/activity/1/page/2/step/1/response/1/command/3/predict",command:"/backend/command/7/start-freehand-input",triggerResponse:"/backend/activity/1/page/2/step/1/response/1/step-beginning",index:3,literalArgs:{pane:"top",annotationName:"prediction-away",xMin:0,xMax:15},substitutedArgs:{}},{url:"/backend/activity/1/page/2/step/1/response/2/command/1/goto-step-2",command:"/backend/command/8/goto-step",triggerResponse:"/backend/activity/1/page/2/step/1/response/2/step-finished",index:1,literalArgs:{stepId:"/backend/activity/1/page/2/step/2"},substitutedArgs:{}}];
Smartgraphs.mockResponses["/backend/activity/1/page/2/step/2/commands"]=[{url:"/backend/activity/1/page/2/step/2/response/1/command/1/show-graph",command:"/backend/command/4/show-graph",triggerResponse:"/backend/activity/1/page/2/step/2/response/1/step-beginning",index:1,literalArgs:{pane:"bottom",graphId:"/backend/activity/1/graph/2/prediction-toward"},substitutedArgs:{}},{url:"/backend/activity/1/page/2/step/2/response/1/command/2/predict",command:"/backend/command/7/start-freehand-input",triggerResponse:"/backend/activity/1/page/2/step/2/response/1/step-beginning",index:2,literalArgs:{pane:"bottom",annotationName:"prediction-toward",xMin:0,xMax:15},substitutedArgs:{}}];
Smartgraphs.mockResponses["/backend/activity/1/page/3/step/1/commands"]=[{url:"/backend/activity/1/page/3/step/1/response/1/command/1/show-graph",command:"/backend/command/4/show-graph",triggerResponse:"/backend/activity/1/page/3/step/1/response/1/step-beginning",index:1,literalArgs:{pane:"top",graphId:"/backend/activity/1/graph/3/sensor-playing"},substitutedArgs:{}},{url:"/backend/activity/1/page/3/step/1/response/1/command/2/hide-pane",command:"/backend/command/10/hide-pane",triggerResponse:"/backend/activity/1/page/3/step/1/response/1/step-beginning",index:2,literalArgs:{pane:"bottom"},substitutedArgs:{}},{url:"/backend/activity/1/page/3/step/1/response/1/command/3/enable-submission",command:"/backend/command/5/enable-submission",triggerResponse:"/backend/activity/1/page/3/step/1/response/1/step-beginning",index:3,literalArgs:{},substitutedArgs:{}},{url:"/backend/activity/1/page/3/step/1/response/1/command/4/start-sensor",command:"/backend/command/9/start-sensor-input",triggerResponse:"/backend/activity/1/page/3/step/1/response/1/step-beginning",index:4,literalArgs:{pane:"top",seriesName:"sensor"},substitutedArgs:{}},{url:"/backend/activity/1/page/3/step/1/response/2/command/1/goto-step-2",command:"/backend/command/8/goto-step",triggerResponse:"/backend/activity/1/page/3/step/1/response/2/step-finished",index:1,literalArgs:{stepId:"/backend/activity/1/page/3/step/2"},substitutedArgs:{}}];
Smartgraphs.mockResponses["/backend/activity/1/page/3/step/2/commands"]=[{url:"/backend/activity/1/page/3/step/2/response/1/command/1/wait-for-response",command:"/backend/command/11/wait-for-response",triggerResponse:"/backend/activity/1/page/3/step/2/response/1/step-beginning",index:1,literalArgs:{},substitutedArgs:{}}];
Smartgraphs.mockResponses["/backend/activity/1/page/4/step/1/commands"]=[{url:"/backend/activity/1/page/4/step/1/response/1/command/1/hide-pane",command:"/backend/command/10/hide-pane",triggerResponse:"/backend/activity/1/page/4/step/1/response/1/step-beginning",index:1,literalArgs:{pane:"bottom"},substitutedArgs:{}},{url:"/backend/activity/1/page/4/step/1/response/1/command/2/show-graph",command:"/backend/command/4/show-graph",triggerResponse:"/backend/activity/1/page/4/step/1/response/1/step-beginning",index:2,literalArgs:{pane:"top",graphId:"/backend/activity/1/graph/4/combined"},substitutedArgs:{}}];
var commandList=[];var command={url:"/backend/activity/2/page/1/step/1/response/1/command/1/single-pane",command:"/backend/command/1/show-single-pane",triggerResponse:"/backend/activity/2/page/1/step/1/response/1/step-beginning",index:1,literalArgs:{},substitutedArgs:{}};
Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1/response/1/command/1/single-pane"]=command;
commandList.push(command);command={url:"/backend/activity/2/page/1/step/1/response/1/command/2/show-graph",command:"/backend/command/4/show-graph",triggerResponse:"/backend/activity/2/page/1/step/1/response/1/step-beginning",index:2,literalArgs:{pane:"single",graphId:"/backend/activity/1/graph/1/prediction-away"},substitutedArgs:{}};
Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1/response/1/command/2/show-graph"]=command;
commandList.push(command);command={url:"/backend/activity/2/page/1/step/1/response/1/command/3/predict",command:"/backend/command/7/start-freehand-input",triggerResponse:"/backend/activity/2/page/1/step/1/response/1/step-beginning",index:3,literalArgs:{pane:"single",annotationName:"prediction-away",xMin:0,xMax:15},substitutedArgs:{}};
Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1/response/1/command/3/predict"]=command;
commandList.push(command);Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1/commands"]=commandList;
sc_require("data_sources/mock_responses/mock_responses");Smartgraphs.mockResponses["/backend/triggers"]=[{url:"/backend/trigger/1/step-beginning",name:"stepBeginning",description:"This is the list of commands that run when the activity step begins.",args:{}},{url:"/backend/trigger/2/response-submitted",name:"responseSubmitted",description:"This is the list of commands that check the answer.",args:{}},{url:"/backend/trigger/3/step-finished",name:"stepFinished",description:"This is the list of commands that run when the activity step finishes.",args:{}}];
sc_require("data_sources/mock_responses/mock_responses");Smartgraphs.mockResponses["/backend/activity/1/page/1/step/1/trigger_responses"]=[{url:"/backend/activity/1/page/1/step/1/response/1/step-beginning",trigger:"/backend/trigger/1/step-beginning",step:"/backend/activity/1/page/1/step/1",args:{},commands:["/backend/activity/1/page/1/step/1/response/1/command/1/single-pane","/backend/activity/1/page/1/step/1/response/1/command/2/show-image","/backend/activity/1/page/1/step/1/response/1/command/3/finish-step"]}];
Smartgraphs.mockResponses["/backend/activity/1/page/2/step/1/trigger_responses"]=[{url:"/backend/activity/1/page/2/step/1/response/1/step-beginning",trigger:"/backend/trigger/1/step-beginning",step:"/backend/activity/1/page/2/step/1",args:{},commands:["/backend/activity/1/page/2/step/1/response/1/command/1/split-pane","/backend/activity/1/page/2/step/1/response/1/command/2/show-graph","/backend/activity/1/page/2/step/1/response/1/command/3/predict"]},{url:"/backend/activity/1/page/2/step/1/response/2/step-finished",trigger:"/backend/trigger/3/step-finished",step:"/backend/activity/1/page/2/step/1",args:{},commands:["/backend/activity/1/page/2/step/1/response/2/command/1/goto-step-2"]}];
Smartgraphs.mockResponses["/backend/activity/1/page/2/step/2/trigger_responses"]=[{url:"/backend/activity/1/page/2/step/2/response/1/step-beginning",trigger:"/backend/trigger/1/step-beginning",step:"/backend/activity/1/page/2/step/2",args:{},commands:["/backend/activity/1/page/2/step/2/response/1/command/1/show-graph","/backend/activity/1/page/2/step/2/response/1/command/2/predict"]}];
Smartgraphs.mockResponses["/backend/activity/1/page/3/step/1/trigger_responses"]=[{url:"/backend/activity/1/page/3/step/1/response/1/step-beginning",trigger:"/backend/trigger/1/step-beginning",step:"/backend/activity/1/page/3/step/1",args:{},commands:["/backend/activity/1/page/3/step/1/response/1/command/1/show-graph","/backend/activity/1/page/3/step/1/response/1/command/2/hide-pane","/backend/activity/1/page/3/step/1/response/1/command/3/enable-submission","/backend/activity/1/page/3/step/1/response/1/command/4/start-sensor"]},{url:"/backend/activity/1/page/3/step/1/response/2/step-finished",trigger:"/backend/trigger/3/step-finished",step:"/backend/activity/1/page/3/step/1",args:{},commands:["/backend/activity/1/page/3/step/1/response/2/command/1/goto-step-2"]}];
Smartgraphs.mockResponses["/backend/activity/1/page/3/step/2/trigger_responses"]=[{url:"/backend/activity/1/page/3/step/2/response/1/step-beginning",trigger:"/backend/trigger/1/step-beginning",step:"/backend/activity/1/page/3/step/2",args:{},commands:["/backend/activity/1/page/3/step/2/response/1/command/1/wait-for-response"]}];
Smartgraphs.mockResponses["/backend/activity/1/page/4/step/1/trigger_responses"]=[{url:"/backend/activity/1/page/4/step/1/response/1/step-beginning",trigger:"/backend/trigger/1/step-beginning",step:"/backend/activity/1/page/4/step/1",args:{},commands:["/backend/activity/1/page/4/step/1/response/1/command/1/hide-pane","/backend/activity/1/page/4/step/1/response/1/command/2/show-graph"]}];
Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1/response/1/step-beginning"]={url:"/backend/activity/2/page/1/step/1/response/1/step-beginning",trigger:"/backend/trigger/1/step-beginning",step:"/backend/activity/2/page/1/step/1",args:{},commands:["/backend/activity/2/page/1/step/1/response/1/command/1/single-pane","/backend/activity/2/page/1/step/1/response/1/command/2/show-graph","/backend/activity/2/page/1/step/1/response/1/command/3/predict"]};
Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1/trigger_responses"]=[Smartgraphs.mockResponses["/backend/activity/2/page/1/step/1/response/1/step-beginning"]];
Smartgraphs.RestDataSource=SC.DataSource.extend({latency:10,fetch:function(a,f){var g,b,e,c;
this.log("RestDataSource.fetch()");if(f.get("isPagesQuery")){g=f.get("parameters").activity;
b=g.get("pageListUrl");var d=g.get("id");this.log("  Query: pagesQuery for Activity %s",d);
this.log("  URL endpoint for query: %s",b);if(b===null){b=d+"/pages";this.log("  Mock URL endpoint for query: %s",b);
this.invokeLater(this._mockRequestListFromServer,this.get("latency"),a,f,b)}else{this.requestListFromServer(a,f,b)
}this.log("  returning YES from fetch");return YES}else{if(f===Smartgraphs.ALL_COMMANDS_QUERY){this.log("  Query: ALL_COMMANDS_QUERY");
b=Smartgraphs.activityController.get("commandListUrl");this.log("  URL endpoint for query: %s",b);
if(b===null){b="/backend/commands";this.log("  Mock URL endpoint for query: %s",b);
this.invokeLater(this._mockRequestListFromServer,this.get("latency"),a,f,b)}else{this.requestListFromServer(a,f,b)
}return YES}else{if(f===Smartgraphs.ALL_TRIGGERS_QUERY){this.log("  Query: ALL_TRIGGERS_QUERY");
b=Smartgraphs.activityController.get("triggerListUrl");this.log("  URL endpoint for query: %s",b);
if(b===null){b="/backend/triggers";this.log("  Mock URL endpoint for query: %s",b);
this.invokeLater(this._mockRequestListFromServer,this.get("latency"),a,f,b)}else{this.requestListFromServer(a,f,b)
}return YES}else{if(f.get("isStepsQuery")){e=f.get("parameters").page;var h=e.get("id");
this.log("  Query: stepsQuery for ActivityPage %s",h);b=e.get("stepListUrl");this.log("  URL endpoint for query: %s",b);
if(b===null){b=h+"/steps";this.log("  Mock URL endpoint for query: %s",b);this.invokeLater(this._mockRequestListFromServer,this.get("latency"),a,f,b)
}else{this.requestListFromServer(a,f,b)}return YES}else{if(f.get("isTriggerResponsesQuery")){c=f.get("parameters").step;
this.log("  Query: triggerResponsesQuery for ActivityStep %s",c.get("id"));b=c.get("triggerResponseListUrl");
this.log("  URL endpoint for query: %s",b);if(this.get("isTriggerResponsesOnBackend")){this.requestListFromServer(a,f,b)
}else{this.log("  Mock URL endpoint for query: %s",b);this.invokeLater(this._mockRequestListFromServer,this.get("latency"),a,f,b)
}return YES}else{if(f.get("isCommandInvocationsQuery")){c=f.get("activityStep");this.log("  Query: commandInvocationsQuery for ActivityStep %s",c.get("id"));
b=c.get("commandListUrl");this.log("  URL endpoint for query: %s",b);if(this.get("isCommandInvocationsOnBackend")){this.requestListFromServer(a,f,b)
}else{this.log("  Mock URL endpoint for query: %s",b);this.invokeLater(this._mockRequestListFromServer,this.get("latency"),a,f,b)
}return YES}}}}}}return NO},retrieveRecords:function(a,c,b){this.log("RestDataSource.retrieveRecords(storeKeys=%s)",c.toString());
arguments.callee.base.apply(this,arguments)},retrieveRecord:function(a,b){var c=Smartgraphs.store.recordTypeFor(b);
this.log("RestDataSource.retrieveRecord()");this.log("  Record type requested = %s",c.toString());
this.log("  id requested = %s",Smartgraphs.store.idFor(b));if((c===Smartgraphs.Activity)||c===Smartgraphs.ActivityPage){this.requestRecordFromServer(a,b);
this.log("  returning YES from retrieveRecord");return YES}return NO},createRecord:function(a,b){this.log("RestDataSource.createRecord()");
return NO},updateRecord:function(a,b){this.log("RestDataSource.updateRecord()");return NO
},destroyRecord:function(a,b){this.log("RestDataSource.destroyRecord()");return NO
},requestRecordFromServer:function(a,c){var b=a.idFor(c);if(Smartgraphs.get("useMockResponses")){this.invokeLater(this._mockRequestRecordFromServer,this.get("latency"),a,c)
}else{SC.Request.getUrl(b).notify(this,this.didRetrieveRecordFromServer,{store:a,storeKey:c}).header("Accept","application/json").json().send()
}},_mockRequestRecordFromServer:function(b,d){var c=b.idFor(d);var a=Smartgraphs.mockResponses.hasOwnProperty(c)?SC.Object.create({body:Smartgraphs.mockResponses[c]}):SC.Error.create();
this.didRetrieveRecordFromServer(a,{store:b,storeKey:d})},didRetrieveRecordFromServer:function(b,d){var a=d.store;
var c=d.storeKey;var e=Smartgraphs.store.recordTypeFor(c);this.log("RestDataSource.didRetrieveRecordFromServer()");
this.log("  Record type requested = %s",e.toString());this.log("  id requested = %s",Smartgraphs.store.idFor(c));
if(SC.ok(b)){this.log("  ...SUCCESS");a.dataSourceDidComplete(c,this.camelizeKeys(b.get("body")))
}else{this.log("  ...FAILURE");a.dataSourceDidError(c)}},requestListFromServer:function(a,c,b){if(Smartgraphs.get("useMockResponses")){this.invokeLater(this._mockRequestListFromServer,this.get("latency"),a,c,b)
}else{SC.Request.getUrl(b).notify(this,this.didRetrieveListFromServer,{store:a,query:c}).header("Accept","application/json").json().send()
}},_mockRequestListFromServer:function(b,d,c){var a=Smartgraphs.mockResponses.hasOwnProperty(c)?SC.Object.create({body:Smartgraphs.mockResponses[c]}):SC.Error.create();
this.didRetrieveListFromServer(a,{store:b,query:d})},didRetrieveListFromServer:function(b,e){var a=e.store;
var d=e.query;var f=d.get("recordType");this.log("RestDataSource.didRetrieveListFromServer()");
this.log("  Record type requested = %s",f.toString());if(SC.ok(b)){this.log("  ...SUCCESS");
var c=b.get("body").map(function(g){return this.camelizeKeys(g)},this);a.loadRecords(f,c);
a.dataSourceDidFetchQuery(d)}else{this.log("  ...FAILURE");a.dataSourceDidErrorQuery(d)
}},camelizeKeys:function(c){var a={};for(var b in c){if(c.hasOwnProperty(b)){a[b.camelize()]=c[b]
}}return a},log:function(){if(Smartgraphs.get("logDataSource")){console.log.apply(console,arguments)
}}});Smartgraphs.ActivityPage=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",activity:SC.Record.toOne("Smartgraphs.Activity",{inverse:"pages",isMaster:YES}),name:SC.Record.attr(String),index:SC.Record.attr(Number),introText:SC.Record.attr(String),steps:SC.Record.toMany("Smartgraphs.ActivityStep",{inverse:"activityPage"}),firstStep:SC.Record.toOne("Smartgraphs.ActivityStep"),context:{},isSelectable:NO,currentStep:null,stepListUrl:SC.Record.attr(String),stepsQuery:function(){return SC.Query.create({isStepsQuery:YES,recordType:Smartgraphs.ActivityStep,conditions:"page = {page}",parameters:{page:this}})
}.property().cacheable()});sc_require("models/activity_page");Smartgraphs.ActivityPage.FIXTURES=[];
Smartgraphs.ActivityStep=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",activityPage:SC.Record.toOne("Smartgraphs.ActivityPage",{inverse:"steps",isMaster:YES}),beforeText:SC.Record.attr(String),responseTemplate:SC.Record.toOne("Smartgraphs.ResponseTemplate"),afterText:SC.Record.attr(String),triggerResponses:SC.Record.toMany("Smartgraphs.TriggerResponse",{inverse:"step"}),context:{},isLastStep:SC.Record.attr(Boolean),submitButtonShouldBeVisible:SC.Record.attr(Boolean),submitButtonTitle:SC.Record.attr(String),triggerResponseListUrl:SC.Record.attr(String),commandListUrl:SC.Record.attr(String),triggerResponsesQuery:function(){return SC.Query.create({isTriggerResponsesQuery:YES,recordType:Smartgraphs.TriggerResponse,conditions:"step = {step}",parameters:{step:this}})
}.property().cacheable(),commandsQuery:function(){return SC.Query.create({isCommandInvocationsQuery:YES,activityStep:this,recordType:Smartgraphs.CommandInvocation,conditions:"{triggerResponses} CONTAINS triggerResponse",parameters:{triggerResponses:this.get("triggerResponses").map(function(a){return a
})}})}.property().cacheable(),triggerResponsesDidChange:function(){this.notifyPropertyChange("commandsQuery")
}.observes("*triggerResponses.[]")});sc_require("models/activity_step");Smartgraphs.ActivityStep.FIXTURES=[];
Smartgraphs.Axes=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",xMin:SC.Record.attr(Number),xMax:SC.Record.attr(Number),xSteps:SC.Record.attr(Number),xLabel:SC.Record.attr(String),xLabelAbbreviated:SC.Record.attr(String),yMin:SC.Record.attr(Number),yMax:SC.Record.attr(Number),ySteps:SC.Record.attr(Number),yLabel:SC.Record.attr(String),yLabelAbbreviated:SC.Record.attr(String)});
sc_require("models/axes");Smartgraphs.Axes.FIXTURES=[{url:"/backend/axes/1/5m-15s",xMin:0,xMax:15,xSteps:15,xLabel:"Time (seconds)",xLabelAbbreviated:"Time (s)",yMin:0,yMax:5,ySteps:10,yLabel:"Position (meters)",yLabelAbbreviated:"Position (m)"}];
Smartgraphs.Button=SC.Record.extend({name:SC.Record.attr(String),title:SC.Record.attr(String),description:SC.Record.attr(String),width:SC.Record.attr(Number),isSubmitButton:SC.Record.attr(Boolean)});
sc_require("models/button");Smartgraphs.Button.FIXTURES=[];Smartgraphs.Command=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",name:SC.Record.attr(String),description:SC.Record.attr(String),actionName:SC.Record.attr(String),literalArgs:SC.Record.attr(Object),substitutedArgs:SC.Record.attr(Object)});
sc_require("models/command");Smartgraphs.Command.FIXTURES=[];Smartgraphs.CommandInvocation=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",command:SC.Record.toOne("Smartgraphs.Command"),triggerResponse:SC.Record.toOne("Smartgraphs.TriggerResponse",{inverse:"commands",isMaster:YES}),index:SC.Record.attr(Number),literalArgs:SC.Record.attr(Object),substitutedArgs:SC.Record.attr(Object)});
sc_require("models/command_invocation");Smartgraphs.CommandInvocation.FIXTURES=[];
Smartgraphs.DataPoint=SC.Record.extend({x:SC.Record.attr(Number),y:SC.Record.attr(Number),series:SC.Record.toOne("Smartgraphs.DataSeries",{inverse:"points"})});
sc_require("models/data_point");Smartgraphs.DataPoint.FIXTURES=[];Smartgraphs.DataPointView=RaphaelViews.RaphaelView.extend({displayProperties:"content.x content.y isEnabled fill stroke radius".w(),notSelectedFill:"#1F77B4",notSelectedStroke:"#1F77B4",selectedFill:"#FF7F0E",selectedStroke:"#FF7F0E",hoveredRadius:5,notHoveredRadius:3,isEnabled:YES,isHovered:NO,isSelected:NO,layerIsCacheable:YES,isPoolable:YES,fill:function(){return(this.get("isSelected")?this.get("selectedFill"):this.get("notSelectedFill"))
}.property("isSelected","selectedFill","notSelectedFill").cacheable(),stroke:function(){return(this.get("isSelected")?this.get("selectedStroke"):this.get("notSelectedStroke"))
}.property("isSelected","selectedStroke","notSelectedStroke").cacheable(),radius:function(){return(this.get("isHovered")?this.get("hoveredRadius"):this.get("notHoveredRadius"))
}.property("isHovered","hoveredRadius","notHoveredRadius").cacheable(),mouseEntered:function(){this.set("isHovered",YES)
},mouseExited:function(){this.set("isHovered",NO)},renderCallback:function(f,b,e,a,d,c){return f.circle(b,e,a).attr({fill:d,stroke:c})
},render:function(c,a){var h=this.get("fill"),i=this.get("stroke"),d=this.get("radius");
var g=this.getPath("content.x"),e=this.getPath("content.y");var f=this.getPath("parentView.graphView").coordinatesForPoint(g,e);
if(a){c.callback(this,this.renderCallback,f.x,f.y,d,h,i)}else{var b=c.raphael();b.attr({cx:f.x,cy:f.y,r:d,fill:h,stroke:i})
}}});sc_require("views/data_point");Smartgraphs.DataSeriesView=RaphaelViews.RaphaelCollectionView.extend({exampleView:Smartgraphs.DataPointView,useFastPath:YES,content:function(){var a=this.get("item");
if(!a){return null}return Smartgraphs.store.find(SC.Query.local(Smartgraphs.DataPoint,{conditions:"series = {series}",series:a,orderBy:"id"}))
}.property("series").cacheable()});sc_require("views/data_series");Smartgraphs.DataSeries=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",name:SC.Record.attr(String),session:SC.Record.toOne("Smartgraphs.Session"),isExample:SC.Record.attr(Boolean),points:SC.Record.toMany("Smartgraphs.DataPoint",{inverse:"series"}),defaultDisplayType:SC.Record.attr(Number)});
Smartgraphs.DataSeries.LINE_GRAPH=1;Smartgraphs.DataSeries.SCATTER_PLOT=2;Smartgraphs.DataSeries.viewClass=Smartgraphs.DataSeriesView;
sc_require("models/data_series");Smartgraphs.DataSeries.FIXTURES=[{url:"/backend/activity/1/series/example-1",name:"example-1",isExample:YES,points:[],session:null}];
Smartgraphs.FreehandSketchView=RaphaelViews.RaphaelView.extend({stroke:"#000000",strokeWidth:2,displayProperties:"item.points.[]".w(),renderCallback:function(d,a,b,c){return d.path(a).attr({stroke:b,"stroke-width":c})
},render:function(b,a){var c=this.getPath("parentView.parentView");var h=this.get("item");
var j=(h?h.get("points"):null)||[{x:0,y:0}];var e=[];var g,f;for(var d=0,k=j.get("length");
d<k;d++){g=j.objectAt(d);f=c.coordinatesForPoint(g.x,g.y)||{x:0,y:0};e.push(d===0?"M":"L");
e.push(Math.round(f.x));e.push(" ");e.push(Math.round(f.y))}var m=e.join("");if(a){b.callback(this,this.renderCallback,m,this.get("stroke"),this.get("strokeWidth"))
}else{var l=b.raphael();l.attr({path:m})}}});sc_require("views/freehand_sketch");
Smartgraphs.FreehandSketch=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",isAnnotation:YES,name:SC.Record.attr(String),session:SC.Record.toOne("Smartgraphs.Session"),isExample:SC.Record.attr(Boolean),points:SC.Record.attr(Array),isDirectional:SC.Record.attr(Boolean)});
Smartgraphs.FreehandSketch.viewClass=Smartgraphs.FreehandSketchView;sc_require("models/freehand_sketch");
Smartgraphs.FreehandSketch.FIXTURES=[{url:"/backend/activity/1/annotations/sketch-1",name:"sketch-1",isExample:YES,points:[],session:null}];
Smartgraphs.Graph=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",name:SC.Record.attr(String),description:SC.Record.attr(String),title:SC.Record.attr(String),axes:SC.Record.toOne("Smartgraphs.Axes"),initialSeries:SC.Record.attr(Array),initialAnnotations:SC.Record.attr(Array)});
sc_require("models/graph");Smartgraphs.Graph.FIXTURES=[{url:"/backend/activity/1/graph/1/prediction-away",name:"Prediction-Away",description:"Prediction graph of movement away",title:"Away",axes:"/backend/axes/1/5m-15s",initialSeries:[],initialAnnotations:[]},{url:"/backend/activity/1/graph/2/prediction-toward",name:"Prediction-Toward",title:"Toward",description:"Prediction graph of movement towards",axes:"/backend/axes/1/5m-15s",initialSeries:[],initialAnnotations:[]},{url:"/backend/activity/1/graph/3/sensor-playing",name:"Sensor-Playing",description:"Playing around with the sensor in page 3",title:"Away",axes:"/backend/axes/1/5m-15s",initialSeries:[],initialAnnotations:[]},{url:"/backend/activity/1/graph/4/combined",name:"Combined",description:"Combines the prediction graphs and the sensor graph",title:"Combined 'Away' Graph",axes:"/backend/axes/1/5m-15s",initialSeries:["sensor"],initialAnnotations:[{type:"Smartgraphs.FreehandSketch",name:"prediction-away"}]}];
Smartgraphs.Inspector=SC.Record.extend({});sc_require("models/inspector");Smartgraphs.Inspector.FIXTURES=[];
Smartgraphs.ResponseTemplate=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",templateString:SC.Record.attr(String),fieldTypes:SC.Record.attr(Array),fieldChoiceLists:SC.Record.attr(Array),intialValues:SC.Record.attr(Array),values:[]});
sc_require("models/response_template");Smartgraphs.ResponseTemplate.FIXTURES=[{url:"/backend/response-template/1/numeric",templateString:"",fieldTypes:["numeric"],fieldChoiceLists:[null],initialValues:[""]},{url:"/backend/response-template/2/open",templateString:"",fieldTypes:["textarea"],fieldChoiceLists:[null],initialValues:[""]}];
Smartgraphs.Session=SC.Record.extend({user:SC.Record.toOne("Smartgraphs.User",{inverse:"session",isMaster:YES}),steps:SC.Record.toMany("Smartgraphs.  SessionStep",{inverse:"session"})});
sc_require("models/session");Smartgraphs.Session.FIXTURES=[{guid:"empty-session",user:null,steps:[]}];
Smartgraphs.SessionStep=SC.Record.extend({values:SC.Record.attr(Array),series:SC.Record.toOne("Smartgraphs.DataSeries")});
sc_require("models/session_step");Smartgraphs.SessionStep.FIXTURES=[];Smartgraphs.Trigger=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",name:SC.Record.attr(String),description:SC.Record.attr(String),args:SC.Record.attr(Object)});
sc_require("models/trigger");Smartgraphs.Trigger.FIXTURES=[];Smartgraphs.TriggerResponse=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",trigger:SC.Record.toOne("Smartgraphs.Trigger"),step:SC.Record.toOne("Smartgraphs.ActivityStep",{inverse:"triggerResponses",isMaster:YES}),args:SC.Record.attr(Object),commands:SC.Record.toMany("Smartgraphs.CommandInvocation",{inverse:"triggerResponse",orderBy:"index"})});
sc_require("models/trigger_response");Smartgraphs.TriggerResponse.FIXTURES=[];Smartgraphs.User=SC.Record.extend({userId:SC.Record.attr(String),name:SC.Record.attr(String),sessions:SC.Record.toMany(Smartgraphs.Session,{inverse:"user"})});
sc_require("models/user");Smartgraphs.User.FIXTURES=[{guid:"default",userId:"anonymous",name:"Anonymous User",sessions:[]}];
Smartgraphs.Activity=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",title:SC.Record.attr(String),pages:SC.Record.toMany("Smartgraphs.ActivityPage",{inverse:"activity",orderBy:"index"}),context:{},pageListUrl:SC.Record.attr(String),triggerListUrl:SC.Record.attr(String),commandListUrl:SC.Record.attr(String),pagesQuery:function(){return SC.Query.create({isPagesQuery:YES,recordType:Smartgraphs.ActivityPage,conditions:"activity = {activity}",parameters:{activity:this}})
}.property().cacheable()});Smartgraphs.READY=SC.Responder.create({nextResponder:null,didBecomeFirstResponder:function(){SC.routes.add("*activityId",this,"route")
},willLoseFirstResponder:function(){},route:function(b){var a=b.activityId;if(a){Smartgraphs.sendAction("openActivity",this,{id:a})
}},openActivity:function(b,a){var c=Smartgraphs.activityController.get("content");
if(c&&c.get("id")===a.id){return YES}Smartgraphs.activityController.set("content",Smartgraphs.store.find(Smartgraphs.Activity,a.id));
Smartgraphs.makeFirstResponder(Smartgraphs.LOADING_ACTIVITY);return YES}});sc_require("states/ready");
Smartgraphs.ACTIVITY=SC.Responder.create({nextResponder:Smartgraphs.READY,didBecomeFirstResponder:function(){Smartgraphs.appWindowController.showActivityView()
},willLoseFirstResponder:function(){Smartgraphs.activityController.cleanup()},fireActivityEvent:function(c,b){if(b.eventName){console.log("Firing Activity Event %s",b.eventName);
var a=Smartgraphs.triggers[b.eventName];if(a){a.eventWasObserved()}}return YES}});
sc_require("states/activity");Smartgraphs.ACTIVITY_DONE=SC.Responder.create({nextResponder:Smartgraphs.ACTIVITY});
Smartgraphs.ResourceLoader={loadResources:function(){var b=this.get("subordinateResources");
for(var a=0,c=b.get("length");a<c;a++){b[a].record=null}var d=this.get("masterResource");
d.record=d.load(this);this._watchedRecords=[];this.watch(d.record);return this.checkResourceStatuses()
},watch:function(a){this._watchedRecords.push(a);a.addObserver("status",this,this.checkResourceStatuses)
},checkResourceStatuses:function(){var a=this.get("masterResource").record.get("status");
if(a&SC.Record.READY){return this.checkSubordinateResources()}else{if(a&SC.Record.ERROR){this.cleanupLoading();
if(this.resourceLoadingError){this.resourceLoadingError()}return YES}return NO}},checkSubordinateResources:function(){var d,b=this.get("subordinateResources");
for(var a=0,c=b.get("length");a<c;a++){d=b[a];if(d.record===null){d.record=d.load(this);
this.watch(d.record)}}if(this.subordinateResourcesAreReady()){this.cleanupLoading();
this.resourcesDidLoad();return YES}if(this.subordinateResourcesHaveErrors()){this.cleanupLoading();
if(this.resourceLoadingError){this.resourceLoadingError()}return YES}return NO},cleanupLoading:function(){this._watchedRecords.forEach(function(a){a.removeObserver("status",this,this.checkResourceStatuses)
},this);this._watchedRecords=[]},subordinateResourcesAreReady:function(){var c=this.get("subordinateResources");
for(var a=0,b=c.get("length");a<b;a++){if(c[a].record===null||!(c[a].record.get("status")&SC.Record.READY)){return NO
}}return YES},subordinateResourcesHaveErrors:function(){var c=this.get("subordinateResources");
for(var a=0,b=c.get("length");a<b;a++){if(c[a].record&&(c[a].record.get("status")&SC.Record.ERROR)){return YES
}}return NO},cancelLoading:function(){this.cleanupLoading()}};sc_require("states/activity");
sc_require("states/mixins/resource_loader");Smartgraphs.ACTIVITY_LOADING_PAGE=SC.Responder.create(Smartgraphs.ResourceLoader,{nextResponder:Smartgraphs.ACTIVITY,masterResource:{load:function(){return Smartgraphs.activityPageController.get("content").toArray().objectAt(0)
}},subordinateResources:[{load:function(){return Smartgraphs.store.find(Smartgraphs.activityPageController.get("stepsQuery"))
}}],didBecomeFirstResponder:function(){this.loadResources()},willLoseFirstResponder:function(){this.cancelLoading()
},resourcesDidLoad:function(){Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_START)
}});sc_require("states/activity");sc_require("states/mixins/resource_loader");Smartgraphs.ACTIVITY_LOADING_STEP=SC.Responder.create(Smartgraphs.ResourceLoader,{nextResponder:Smartgraphs.ACTIVITY,masterResource:{load:function(){return Smartgraphs.activityStepController.get("content")
}},subordinateResources:[{load:function(){return Smartgraphs.store.find(Smartgraphs.activityStepController.get("triggerResponsesQuery"))
}},{load:function(){return Smartgraphs.store.find(Smartgraphs.activityStepController.get("commandsQuery"))
}}],didBecomeFirstResponder:function(){Smartgraphs.activityStepController.set("content",Smartgraphs.activityPageController.get("currentStep"));
this.loadResources()},willLoseFirstResponder:function(){this.cancelLoading()},resourcesDidLoad:function(){Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_START)
},resourceLoadingError:function(){console.error("Error status loading subordinate resource for %s",this.get("masterResource").record.get("id"))
}});sc_require("states/activity");Smartgraphs.ACTIVITY_PAGE_DONE=SC.Responder.create({nextResponder:Smartgraphs.ACTIVITY,didBecomeFirstResponder:function(){if(Smartgraphs.activityController.get("isLastPage")){Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_DONE)
}else{Smartgraphs.activityController.set("canOpenNextPage",YES)}},willLoseFirstResponder:function(){Smartgraphs.activityController.set("canOpenNextPage",NO);
Smartgraphs.activityPageController.cleanup()},openNextActivityPage:function(){Smartgraphs.activityPagesController.selectNextPage();
Smartgraphs.activityPageController.set("content",Smartgraphs.activityPagesController.get("selection"));
Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_LOADING_PAGE)}});sc_require("states/activity");
Smartgraphs.ACTIVITY_PAGE_START=SC.Responder.create({nextResponder:Smartgraphs.ACTIVITY,didBecomeFirstResponder:function(){Smartgraphs.activityPageController.set("currentStep",Smartgraphs.activityPageController.get("firstStep"));
Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_LOADING_STEP)}});sc_require("states/activity");
Smartgraphs.ACTIVITY_START=SC.Responder.create({nextResponder:Smartgraphs.ACTIVITY,didBecomeFirstResponder:function(){Smartgraphs.sessionController.newSession();
var a=Smartgraphs.activityController.get("pages");Smartgraphs.activityPagesController.set("content",a);
if(a.get("length")>0){Smartgraphs.activityPagesController.selectFirstPage()}Smartgraphs.activityPageController.set("content",Smartgraphs.activityPagesController.get("selection"));
Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_LOADING_PAGE)}});sc_require("states/activity");
Smartgraphs.ACTIVITY_STEP=SC.Responder.create({nextResponder:Smartgraphs.ACTIVITY,submissionIsEnabled:YES,didBecomeFirstResponder:function(){this.enableSubmission();
Smartgraphs.activityStepController.invokeLater(Smartgraphs.activityStepController.begin)
},willLoseFirstResponder:function(){Smartgraphs.activityStepController.set("submitButtonShouldBeEnabled",NO);
Smartgraphs.responseTemplateController.set("editingShouldBeEnabled",NO)},_graphControllerFor:function(a){if(!Smartgraphs.activityViewController.get("paneIsSplit")||a==="top"){return Smartgraphs.firstGraphController
}if(a==="bottom"){return Smartgraphs.secondGraphController}},_graphViewFor:function(a){if(a==="top"||a==="single"){return Smartgraphs.getPath("activityPage.firstGraphView")
}if(a==="bottom"){return Smartgraphs.getPath("activityPage.firstGraphView")}},finishActivityStep:function(){if(this.get("submissionIsEnabled")){Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_DONE)
}else{console.error("ACTIVITY_STEP received finishActivityStep action when submissionIsEnabled was NO")
}return YES},enableSubmission:function(){this.set("submissionIsEnabled",YES);Smartgraphs.activityStepController.set("submitButtonShouldBeEnabled",YES)
},disableSubmission:function(){this.set("submissionIsEnabled",NO);Smartgraphs.activityStepController.set("submitButtonShouldBeEnabled",NO)
},waitForResponse:function(b,a){Smartgraphs.activityStepController.configureInputValidator(a);
this.disableSubmission();Smartgraphs.responseTemplateController.set("editingShouldBeEnabled",YES);
return YES},showSinglePane:function(){return Smartgraphs.activityViewController.showSinglePane()
},showSplitPane:function(){return Smartgraphs.activityViewController.showSplitPane()
},showImage:function(b,a){return Smartgraphs.activityViewController.showImage(a.pane,a.path)
},showGraph:function(b,a){Smartgraphs.activityViewController.showGraph(a.pane,a.graphId);
return YES},hidePane:function(b,a){Smartgraphs.activityViewController.hidePane(a.pane);
return YES},setAxes:function(c,b){var a=this._graphControllerFor(b.pane);a.setAxes(b.axesId);
return YES},displaySeriesOnGraph:function(c,b){var a=this._graphControllerFor(b.pane);
a.addObjectByName(Smartgraphs.DataSeries,b.seriesName);return YES},copyExampleSeriesToGraph:function(d,b){var a=this._graphControllerFor(b.pane);
var c=Smartgraphs.sessionController.createSeries(b.seriesName);Smartgraphs.sessionController.copyExampleSeries(b.exampleSeriesName,b.seriesName);
a.addSeries(c);return YES},createSeriesOnGraph:function(d,b){var a=this._graphControllerFor(b.pane);
var c=Smartgraphs.sessionController.createSeries(b.seriesName);a.addSeries(c);return YES
},removeSeries:function(c,b){var a=this._graphControllerFor(b.pane);a.removeSeries(b.seriesName);
return YES},removeAllSeries:function(b,a){return NO},selectDataSeries:function(c,b){var a=this._graphControllerFor(b.pane);
a.selectSeries(b.seriesName);return YES},createAnnotation:function(d,c){var b=this._graphControllerFor(c.pane);
var a=Smartgraphs.sessionController.createAnnotation(c.annotationName,c.annotationType);
b.addAnnotation(a);return YES},startFreehandInput:function(c,b){Smartgraphs.sendAction("createAnnotation",this,{pane:b.pane,annotationName:b.annotationName,annotationType:Smartgraphs.FreehandSketch});
var a=this._graphControllerFor(b.pane);if(Smartgraphs.freehandInputController.register(a,b.annotationName)){Smartgraphs.makeFirstResponder(Smartgraphs.FREEHAND_INPUT);
return YES}},startSensorInput:function(d,b){Smartgraphs.sendAction("createSeriesOnGraph",this,{pane:b.pane,seriesName:b.seriesName});
var a=this._graphControllerFor(b.pane);var c=a.findSeriesByName(b.seriesName);if(c.get("isExample")===NO){Smartgraphs.selectedSeriesController.set("content",c)
}Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR);return YES}});sc_require("states/activity");
Smartgraphs.ACTIVITY_STEP_DONE=SC.Responder.create({nextResponder:Smartgraphs.ACTIVITY,didBecomeFirstResponder:function(){var a=Smartgraphs.activityStepController.get("isLastStep");
Smartgraphs.activityStepController.finish();Smartgraphs.activityStepController.cleanup();
if(a){Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_DONE)}},openActivityStep:function(b,a){var c=Smartgraphs.store.find(Smartgraphs.ActivityStep,a.stepId);
Smartgraphs.activityPageController.set("currentStep",c);Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_LOADING_STEP);
return YES}});sc_require("states/activity");Smartgraphs.ACTIVITY_STEP_START=SC.Responder.create({nextResponder:Smartgraphs.ACTIVITY,didBecomeFirstResponder:function(){Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP)
}});sc_require("states/ready");Smartgraphs.ERROR_LOADING_ACTIVITY=SC.Responder.create({nextResponder:Smartgraphs.READY,didBecomeFirstResponder:function(){Smartgraphs.appWindowController.showActivityLoadingErrorView()
}});sc_require("states/activity_step");Smartgraphs.FREEHAND_INPUT=SC.Responder.create({nextResponder:Smartgraphs.ACTIVITY_STEP,didBecomeFirstResponder:function(){var a=Smartgraphs.freehandInputController.startInput();
if(!a){Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP)}},willLoseFirstResponder:function(){Smartgraphs.freehandInputController.endInput()
},startFreehandInput:function(){console.error("Attempted to startFreehandInput when in FREEHAND_INPUT state");
return YES}});sc_require("states/ready");sc_require("states/mixins/resource_loader");
Smartgraphs.LOADING_ACTIVITY=SC.Responder.create(Smartgraphs.ResourceLoader,{nextResponder:Smartgraphs.READY,masterResource:{load:function(){return Smartgraphs.activityController.get("content")
}},subordinateResources:[{load:function(){return Smartgraphs.store.find(Smartgraphs.activityController.get("pagesQuery"))
}},{load:function(){return Smartgraphs.store.find(Smartgraphs.ALL_TRIGGERS_QUERY)
}},{load:function(){return Smartgraphs.store.find(Smartgraphs.ALL_COMMANDS_QUERY)
}}],didBecomeFirstResponder:function(){if(this.loadResources()){return}Smartgraphs.appWindowController.showActivityLoadingView()
},willLoseFirstResponder:function(){this.cancelLoading()},resourcesDidLoad:function(){Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_START)
},resourceLoadingError:function(){Smartgraphs.makeFirstResponder(Smartgraphs.ERROR_LOADING_ACTIVITY)
},openActivity:function(b,a){if(a.id===Smartgraphs.activityController.getPath("content.id")){return YES
}Smartgraphs.invokeLater(Smartgraphs.resetFirstResponder);return NO}});Smartgraphs.LOGIN=SC.Responder.create({nextResponder:null,didBecomeFirstResponder:function(){Smartgraphs.userController.set("content",Smartgraphs.store.find(Smartgraphs.User,"default"));
Smartgraphs.makeFirstResponder(Smartgraphs.READY)}});sc_require("states/activity_step");
Smartgraphs.SENSOR=SC.Responder.create({nextResponder:Smartgraphs.ACTIVITY_STEP,didBecomeFirstResponder:function(){Smartgraphs.appletPage.get("appletPane").append()
},willLoseFirstResponder:function(){Smartgraphs.appletPage.get("appletPane").remove();
Smartgraphs.selectedSeriesController.set("content",null)},sensorDataReceived:function(b,a){Smartgraphs.selectedPointsController.addSensorPoint(a.x,a.y)
}});sc_require("states/sensor");Smartgraphs.SENSOR_ERROR=SC.Responder.create({nextResponder:Smartgraphs.SENSOR,didBecomeFirstResponder:function(){},willLoseFirstResponder:function(){}});
sc_require("states/sensor");Smartgraphs.SENSOR_READY=SC.Responder.create({nextResponder:Smartgraphs.SENSOR,didBecomeFirstResponder:function(){},willLoseFirstResponder:function(){}});
sc_require("states/sensor");Smartgraphs.SENSOR_RECORDING=SC.Responder.create({nextResponder:Smartgraphs.SENSOR,didBecomeFirstResponder:function(){},willLoseFirstResponder:function(){}});
Smartgraphs.START=SC.Responder.create({nextResponder:null,didBecomeFirstResponder:function(){Smartgraphs.makeFirstResponder(Smartgraphs.LOGIN)
}});Smartgraphs.TriggerObserver=SC.Object.extend({isRegistered:NO,commands:null,register:function(b,a){this.set("isRegistered",YES);
this.set("commands",a);if(this.registerObservers){this.registerObservers(b)}},unregister:function(){this.set("isRegistered",NO);
this.set("commands",null);if(this.unregisterObservers){this.unregisterObservers()
}},eventWasObserved:function(){if(this.get("isRegistered")){Smartgraphs.activityStepController.executeCommands(this.get("commands"))
}}});sc_require("triggers/trigger_observer");Smartgraphs.triggers.buttonWasClicked=Smartgraphs.TriggerObserver.create({});
sc_require("triggers/trigger_observer");Smartgraphs.triggers.responseBecameInvalid=Smartgraphs.TriggerObserver.create({eventWasObserved:function(){Smartgraphs.sendAction("disableSubmission");
arguments.callee.base.apply(this,arguments)}});sc_require("triggers/trigger_observer");
Smartgraphs.triggers.responseBecameValid=Smartgraphs.TriggerObserver.create({registerObservers:function(a){Smartgraphs.responseTemplateController.addObserver("values.[]",this,this.valuesObserver);
this._valueWasValid=NO},unregisterObservers:function(){Smartgraphs.responseTemplateController.removeObserver("values.[]",this,this.valuesObserver);
this._valueWasValid=NO},valuesObserver:function(){var a=Smartgraphs.responseTemplateController.get("values");
if(!a){return}var c=a.objectAt(0);var b=!!(c&&c.strip().length>0);if(b&&!this._valueWasValid){Smartgraphs.sendAction("fireActivityEvent",this,{eventName:"responseBecameValid"})
}else{if(this._valueWasValid&&!b){Smartgraphs.sendAction("fireActivityEvent",this,{eventName:"responseBecameInvalid"})
}}this._valueWasValid=b},eventWasObserved:function(){Smartgraphs.sendAction("enableSubmission");
arguments.callee.base.apply(this,arguments)}});sc_require("triggers/trigger_observer");
Smartgraphs.triggers.responseSubmitted=Smartgraphs.TriggerObserver.create({});sc_require("triggers/trigger_observer");
Smartgraphs.triggers.stepBeginning=Smartgraphs.TriggerObserver.create({});sc_require("triggers/trigger_observer");
Smartgraphs.triggers.stepFinished=Smartgraphs.TriggerObserver.create({});Smartgraphs.AxisView=RaphaelViews.RaphaelView.extend({init:function(){if(this.get("type")==="x"){this.set("displayProperties","axes.xMin axes.xMax axes.xSteps axes.xLabel".w())
}else{this.set("displayProperties","axes.yMin axes.yMax axes.ySteps axes.yLabel".w())
}arguments.callee.base.apply(this,arguments)},render:function(a,b){if(!b){this.drawAxis();
this.drawLabel()}},didCreateLayer:function(){this._label=null;this.invokeLater(this.drawLabel);
this.invokeLater(this.drawAxis)},drawAxis:function(){if(this._axis){this._axis.remove()
}var h=this.get("axes");if(!h){return}var l=this.getPath("parentView.parentView.parentView.padding");
var c=this.getPath("parentView.parentView.parentView.frame");var b=c.x+l.left;var k=c.y+c.height-l.bottom;
if(this.get("type")==="y"){var m=h.get("yMin");var d=h.get("yMax");var g=h.get("ySteps");
var j=c.height-l.top-l.bottom;this._axis=this.get("raphaelCanvas").g.axis(b,k,j,m,d,g,1)
}else{if(this.get("type")==="x"){var a=h.get("xMin");var f=h.get("xMax");var e=h.get("xSteps");
var i=c.width-l.left-l.right;this._axis=this.get("raphaelCanvas").g.axis(b,k,i,a,f,e,0)
}}this._axis.all[0].attr({stroke:"#333333"});this._axis.all[1].attr({fill:"#333333"})
},drawLabel:function(){var e=this.getPath("parentView.parentView.parentView.padding");
var f=this.getPath("parentView.parentView.parentView.frame");var d=this.get("axes");
if(!d){return}var c,a,g,b;if(this.get("type")==="x"){c=d.get("xLabel");a=(e.left+f.width-e.right)/2;
g=f.height-15;b=0}else{c=d.get("yLabel");a=15;g=(e.top+f.height-e.bottom)/2;b=270
}if(this._label){this._label.attr({text:c,x:a,y:g})}else{this._label=this.get("raphaelCanvas").text(a,g,c).attr({font:"14px Arial, sans-serif",fill:"#333333"}).rotate(b)
}}});Smartgraphs.GraphView=SC.View.extend({axesBinding:"*graphController.axes",seriesListBinding:"*graphController.seriesList",annotationListBinding:"*graphController.annotationList",padding:{top:40,right:20,bottom:45,left:55},childViews:"titleView graphCanvasView".w(),init:function(){this._viewsByClassAndId={};
arguments.callee.base.apply(this,arguments)},viewDidResize:function(){arguments.callee.base.apply(this,arguments);
this.replaceLayer()},annotationListDidChange:function(){this._itemListsDidChange()
}.observes("*annotationList.[]"),seriesListDidChange:function(){this._itemListsDidChange()
}.observes("*seriesList.[]"),_itemListsDidChange:function(){var g=this.get("seriesList").concat(this.get("annotationList"));
var f,e,h;var a={};for(var c=0,d=g.get("length");c<d;c++){f=g.objectAt(c);e=f.constructor.toString();
h=f.get("id");if(a[e]===undefined){a[e]={}}a[e][h]=f;if(!this._viewsByClassAndId[e]||!this._viewsByClassAndId[e][h]){this._addViewForItem(f)
}}var b;for(e in this._viewsByClassAndId){if(this._viewsByClassAndId.hasOwnProperty(e)){for(h in this._viewsByClassAndId[e]){if(this._viewsByClassAndId[e].hasOwnProperty(h)){b=this._viewsByClassAndId[e][h];
if(!a[e]||!a[e][h]){this._removeView(b)}}}}}},_addViewForItem:function(c){var b=c.constructor.toString();
var a=c.constructor.viewClass.design({graphView:this,item:c}).create();this.get("graphCanvasView").appendChild(a);
if(this._viewsByClassAndId[b]===undefined){this._viewsByClassAndId[b]={}}this._viewsByClassAndId[b][c.get("id")]=a
},_removeView:function(a){var c=a.get("item");var b=c.constructor.toString();var d=c.get("id");
delete this._viewsByClassAndId[b][d];this.get("graphCanvasView").removeChild(a)},coordinatesForPoint:function(l,j){var g=this.get("axes");
if(!g){return undefined}var b=g.get("xMin"),f=g.get("xMax"),n=g.get("yMin"),e=g.get("yMax");
var d=this.get("frame");var o=d.height,a=d.width;var k=this.get("padding");var i=a-k.left-k.right;
var h=o-k.top-k.bottom;var m=i/(f-b);var c=h/(e-n);return{x:k.left+(l-b)*m,y:k.top+h-(j-n)*c}
},pointForCoordinates:function(l,j){var g=this.get("axes");if(!g){return undefined
}var b=g.get("xMin"),f=g.get("xMax"),n=g.get("yMin"),e=g.get("yMax");var d=this.get("frame");
var o=d.height,a=d.width;var k=this.get("padding");var i=a-k.left-k.right;var h=o-k.top-k.bottom;
var m=i/(f-b);var c=h/(e-n);return{x:b+(l-k.left)/m,y:n+(k.top+h-j)/c}},titleView:SC.LabelView.design({valueBinding:".parentView*graphController.title",classNames:"pane-label",layout:{width:400,centerX:0,height:20,top:10},textAlign:SC.ALIGN_CENTER}),graphCanvasView:RaphaelViews.RaphaelCanvasView.design({axesBinding:".parentView.axes",displayProperties:"axes.xMin axes.xMax axes.yMin axes.yMax".w(),childViews:"axesView".w(),axesView:RaphaelViews.RaphaelView.design({axesBinding:".parentView.parentView.axes",paddingBinding:".parentView.parentView.padding",childViews:"inputArea xAxisView yAxisView".w(),inputArea:RaphaelViews.RaphaelView.design({axesBinding:".parentView.parentView.parentView*axes",didCreateLayer:function(){this._graphView=this.getPath("parentView.parentView.parentView");
this._$graphView=this._graphView.$()},renderCallback:function(e,d,b,c,a){return e.rect(d,b,c,a).attr({fill:"#ffffff",stroke:"#ffffff",opacity:0.7})
},render:function(b,a){var d=this.getPath("parentView.parentView.frame");var i=this.getPath("parentView.parentView.parentView.padding");
var c=d.x+i.left;var e=d.y+i.top;var f=d.width-i.left-i.right;var g=d.height-i.top-i.bottom;
if(a){b.callback(this,this.renderCallback,c,e,f,g)}else{var h=b.raphael();h.attr({x:c,y:e,width:f,height:g})
}},coordsForEvent:function(b){var a=this._$graphView.offset();return{x:b.pageX-a.left,y:b.pageY-a.top}
},mouseDown:function(b){this._graphController=this._graphView.get("graphController");
var c=this.coordsForEvent(b);var a=this._graphView.pointForCoordinates(c.x,c.y);return this._graphController.inputAreaMouseDown(a.x,a.y)
},mouseDragged:function(b){var c=this.coordsForEvent(b);var a=this._graphView.pointForCoordinates(c.x,c.y);
return this._graphController.inputAreaMouseDragged(a.x,a.y)},mouseUp:function(b){var c=this.coordsForEvent(b);
var a=this._graphView.pointForCoordinates(c.x,c.y);return this._graphController.inputAreaMouseUp(a.x,a.y)
}}),xAxisView:Smartgraphs.AxisView.design({axesBinding:".parentView.parentView.parentView.axes",type:"x"}),yAxisView:Smartgraphs.AxisView.design({axesBinding:".parentView.parentView.parentView.axes",type:"y"})})})});
Smartgraphs.ImageView=SC.View.extend({});Smartgraphs.ResponseTemplateView=SC.StaticContentView.extend({fieldTypes:null,fieldChoiceLists:null,values:null,editingShouldBeEnabled:null,isVisibleBinding:SC.Binding.bool(".fieldTypes"),fieldsTypesDidChange:function(){this.invokeOnce(this._updateChildViews)
}.observes("fieldTypes"),_updateChildViews:function(){this.get("childViews").invoke("destroy");
var k=this.get("fieldTypes");if(!k){return}var a=this.get("fieldChoiceLists");var l=this.get("values");
var g,e,j;var n,f,b;var d;for(var c=0,m=k.get("length");c<m;c++){g=k.objectAt(c);
e=a.objectAt(c);j=l.objectAt(c);if(g==="textarea"){n=YES;b="Enter you answer here...";
f={height:97}}else{if(g==="numeric"){n=NO;f={height:22,width:100}}else{throw"ResponseTemplateView received unexpected field type string '"+g+"'."
}}d=SC.View.design({useStaticLayout:YES,layout:f,classNames:"text-field-view-wrapper".w(),childViews:[SC.TextFieldView.design({isTextArea:n,hint:b,index:c,value:j,isEnabledBinding:".parentView.parentView.editingShouldBeEnabled",valueDidChange:function(){var i=this.getPath("parentView.parentView.values");
i.replace(this.get("index"),1,this.get("value"))}.observes("value")})]});var h=d.create();
if(c===0){this._firstInputFieldView=h.get("childViews").objectAt(0)}this.appendChild(h)
}this.invokeLater(this._beginEditingFirstView)},_beginEditingFirstView:function(){if(this._firstInputFieldView){this._firstInputFieldView.beginEditing()
}}});Smartgraphs.TableView=SC.View.extend({});Smartgraphs.activityPage=SC.Page.design({activityView:SC.View.design({childViews:"instructionsWrapper dataWrapper".w(),loadingMessage:"Loading Activity...",instructionsWrapper:SC.View.design({layout:{left:0,width:0.5},childViews:"instructionsView".w(),instructionsView:SC.View.design({layout:{right:5,top:0,bottom:0},classNames:"smartgraph-pane",childViews:"textWrapper nextButton".w(),textWrapper:SC.View.design({layout:{top:20,right:20,bottom:80,left:20},classNames:"text-wrapper".w(),childViews:"introText activityStepWrapper".w(),introText:SC.StaticContentView.design({contentBinding:SC.Binding.oneWay("Smartgraphs.activityPageController.introText"),isVisibleBinding:SC.Binding.bool("Smartgraphs.activityPageController.introText")}),activityStepWrapper:SC.View.design({useStaticLayout:YES,childViews:"activityStepDialog buttonsView".w(),activityStepDialog:SC.View.design({useStaticLayout:YES,childViews:"beforeText responseTemplate afterText".w(),classNames:"dialog-text".w(),beforeText:SC.StaticContentView.design({contentBinding:SC.Binding.oneWay("Smartgraphs.activityStepController.beforeText"),isVisibleBinding:SC.Binding.bool("Smartgraphs.activityStepController.beforeText")}),responseTemplate:Smartgraphs.ResponseTemplateView.design({fieldTypesBinding:"Smartgraphs.responseTemplateController.fieldTypes",fieldChoiceListsBinding:"Smartgraphs.responseTemplateController.fieldChoiceLists",valuesBinding:"Smartgraphs.responseTemplateController.values",editingShouldBeEnabledBinding:"Smartgraphs.responseTemplateController.editingShouldBeEnabled"}),afterText:SC.StaticContentView.design({contentBinding:SC.Binding.oneWay("Smartgraphs.activityStepController.afterText"),isVisibleBinding:SC.Binding.bool("Smartgraphs.activityStepController.afterText")})}),buttonsView:SC.View.design({useStaticLayout:YES,layout:{height:24},childViews:"submitButton".w(),submitButton:SC.ButtonView.design({layout:{width:200,right:0},titleBinding:"Smartgraphs.activityStepController.submitButtonTitle",isVisibleBinding:"Smartgraphs.activityStepController.submitButtonShouldBeVisible",isEnabledBinding:"Smartgraphs.activityStepController.submitButtonShouldBeEnabled",action:"finishActivityStep"})})})}),nextButton:SC.ButtonView.design({layout:{right:30,bottom:36,height:24,width:80},title:"Next >>",action:"openNextActivityPage",isEnabledBinding:"Smartgraphs.pageNavController.nextShouldBeEnabled",isVisibleBinding:"Smartgraphs.pageNavController.nextShouldBeVisible"})})}),dataWrapper:SC.View.design({layout:{right:0,width:0.5},childViews:"dataView".w(),dataView:SC.ContainerView.design({layout:{left:5},nowShowingBinding:"Smartgraphs.activityViewController.dataViewNowShowing"})})}),singlePaneDataView:SC.ContainerView.design({classNames:"smartgraph-pane",nowShowingBinding:"Smartgraphs.activityViewController.singlePaneNowShowing"}),splitPaneDataView:SC.View.design({childViews:"topPaneWrapper bottomPaneWrapper".w(),topPaneWrapper:SC.View.design({layout:{top:0,height:0.5},childViews:"topPane".w(),topPane:SC.ContainerView.design({layout:{bottom:5},classNames:"smartgraph-pane",nowShowingBinding:"Smartgraphs.activityViewController.topPaneNowShowing"})}),bottomPaneWrapper:SC.View.design({layout:{bottom:0,height:0.5},childViews:"bottomPane".w(),bottomPane:SC.ContainerView.design({layout:{top:5},classNames:"smartgraph-pane",nowShowingBinding:"Smartgraphs.activityViewController.bottomPaneNowShowing"})})}),firstImageView:SC.ImageView.design({useStaticLayout:YES,valueBinding:"Smartgraphs.activityViewController.firstImageValue",layout:{width:0.9999999,height:0.9999999}}),secondImageView:SC.ImageView.design({useStaticLayout:YES,valueBinding:"Smartgraphs.activityViewController.secondImageValue",layout:{width:0.9999999,height:0.9999999}}),firstGraphView:Smartgraphs.GraphView.design({graphControllerBinding:"Smartgraphs.firstGraphController",viewName:"firstGraphView"}),secondGraphView:Smartgraphs.GraphView.design({graphControllerBinding:"Smartgraphs.secondGraphController",viewName:"secondGraphView"}),firstTableView:Smartgraphs.TableView.design({}),secondTableView:Smartgraphs.TableView.design({}),errorLoadingActivityView:SC.View.design({classNames:"smartgraph-pane",childViews:"errorMessage".w(),errorMessage:SC.LabelView.design({layout:{height:32,width:500,centerX:0,centerY:0},classNames:"error",textAlign:SC.ALIGN_CENTER,value:"There was an error loading that Activity."})})});
Smartgraphs.appletPage=SC.Page.design({appletPane:SC.PalettePane.design({layout:{left:0,top:0,width:255,height:285},contentView:SC.View.design({childViews:"sensorApplet startButton stopButton resetButton".w(),sensorApplet:CC.SensorAppletView.design({layout:{left:0,top:0,width:1,height:1},safariSensorStatePath:"Smartgraphs.appletPage.appletPane.contentView.sensorApplet.sensorState",hideButtons:YES,dt:0.1,resultsBinding:"Smartgraphs.selectedPointsController",listenerPath:"Smartgraphs.appletPage.appletPane.contentView.sensorApplet",everyNth:2,maxPoints:75,_nsamples:0,_npoints:0,dataReceived:function(g,h,c){var e=this.getPath("results");
var a=this.get("dt");var k=e.get("length");var d=this.get("everyNth");var j=this.get("maxPoints");
for(var b=0;b<h;b++){var f=c[b];if(this._nsamples%d===0){SC.RunLoop.begin();Smartgraphs.sendAction("sensorDataReceived",this,{x:this._nsamples*a,y:f});
SC.RunLoop.end()}this._nsamples++}},sensorsReady:function(){SC.RunLoop.begin();this.setPath("parentView.startButton.isEnabled",YES);
this.getPath("parentView.resetButton").action();SC.RunLoop.end()}}),startButton:SC.ButtonView.design({layout:{centerX:0,centerY:-60,height:24,width:160},isEnabled:NO,title:"Start",appletBinding:".parentView.sensorApplet",action:function(){this.set("isEnabled",NO);
this.setPath("parentView.stopButton.isEnabled",YES);this.setPath("parentView.resetButton.isEnabled",YES);
this.get("applet").start();this.get("applet")._nsamples=0}}),stopButton:SC.ButtonView.design({layout:{centerX:0,centerY:0,height:24,width:160},isVisibleBinding:".parentView.shouldBeEnabled",isEnabled:NO,title:"Stop",appletBinding:".parentView.sensorApplet",action:function(){this.set("isEnabled",NO);
this.get("applet").stop()}}),resetButton:SC.ButtonView.design({layout:{centerX:0,centerY:60,height:24,width:160},isVisibleBinding:".parentView.shouldBeEnabled",isEnabled:NO,title:"Reset",appletBinding:".parentView.sensorApplet",resultsBinding:"Smartgraphs.selectedPointsController",action:function(){this.set("isEnabled",NO);
this.setPath("parentView.stopButton.isEnabled",NO);this.setPath("parentView.startButton.isEnabled",YES);
this.get("applet").reset();var a=this.getPath("results");a.invoke("destroy");Smartgraphs.store.commitRecords();
this.get("applet")._nsamples=0}})})})});Smartgraphs.mainPage=SC.Page.design({mainPane:SC.MainPane.design({layout:{minWidth:960,minHeight:600},childViews:"container".w(),defaultResponder:"Smartgraphs",container:SC.ContainerView.design({layout:{top:15,right:20,bottom:15,left:20},nowShowingBinding:"Smartgraphs.appWindowController.nowShowing"})}),loadingView:SC.View.design({classNames:"smartgraph-pane".w(),childViews:"loadingIconView loadingMessageView".w(),loadingIconView:SC.ImageView.design({layout:{width:48,height:48,centerX:0,centerY:-39},value:"/static/smartgraphs/en/9fe608468f71197e8fe1a77d6fec7cb48df8b501/resources/pane_loading.gif"}),loadingMessageView:SC.LabelView.design({classNames:"loading".w(),layout:{width:200,height:24,centerX:0,centerY:15},textAlign:SC.ALIGN_CENTER,valueBinding:"Smartgraphs.appWindowController.loadingMessage"})})});
Smartgraphs.main=function main(){Smartgraphs.ALL_COMMANDS_QUERY=SC.Query.local(Smartgraphs.Command);
Smartgraphs.ALL_TRIGGERS_QUERY=SC.Query.local(Smartgraphs.Trigger);Smartgraphs.dataSource=SC.CascadeDataSource.create({dataSources:"rest fixtures".w(),rest:Smartgraphs.RestDataSource.create(),fixtures:SC.FixturesDataSource.create({simulateRemoteResponse:NO,latency:500})});
Smartgraphs.store=SC.Store.create().from(Smartgraphs.dataSource);Smartgraphs.getPath("mainPage.mainPane").append();
if(!window.location.hash){window.location.hash="/backend/activity/1"}Smartgraphs.makeFirstResponder(Smartgraphs.START)
};function main(){Smartgraphs.main()};