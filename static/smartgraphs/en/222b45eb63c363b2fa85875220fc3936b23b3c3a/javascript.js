(function(){var a="pig";if(!SC.BUNDLE_INFO){throw"SC.BUNDLE_INFO is not defined!"
}if(SC.BUNDLE_INFO[a]){return}SC.BUNDLE_INFO[a]={requires:["sproutcore/ace"],styles:["/static/pig/en/aaa2036d9820bacbc85107807851544740ec501b/stylesheet-packed.css","/static/pig/en/aaa2036d9820bacbc85107807851544740ec501b/stylesheet.css"],scripts:["/static/pig/en/aaa2036d9820bacbc85107807851544740ec501b/javascript-packed.js","/static/pig/en/aaa2036d9820bacbc85107807851544740ec501b/javascript.js"]}
})();Smartgraphs=SC.Application.create({NAMESPACE:"Smartgraphs",VERSION:"0.1.0",DATA_FORMAT_VERSION:2,triggers:[],_nextGuid:1000,getNextGuid:function(){return this._nextGuid++
},trace:YES,logDataSource:YES,showOutline:YES});SC.CONTEXT_MENU_ENABLED=YES;Smartgraphs.activityController=SC.ObjectController.create({canGotoNextPage:NO,cleanup:function(){Smartgraphs.activityPageController.cleanup();
Smartgraphs.activityStepController.cleanup()}});Smartgraphs.activityOutlineController=SC.TreeController.create({treeItemIsGrouped:function(){return !this.get("shouldSelectPageInOutline")
}.property("shouldSelectPageInOutline").cacheable(),allowsMultipleSelection:NO,allowsEmptySelection:NO,contentBinding:SC.Binding.oneWay("Smartgraphs.activityPagesController.outline"),isSelectable:NO,shouldSelectPageInOutline:NO,currentStepBinding:SC.Binding.oneWay("Smartgraphs.activityStepController.content"),currentPageBinding:SC.Binding.oneWay("Smartgraphs.activityPageController.content"),updateSelection:function(){var d=this.get("content");
if(!d){return}var b=d.get("pages");if(!b){return}var g=Smartgraphs.activityPageController.get("content");
var a=b.indexOf(g);if(a<0){return}var c=d.get("treeItemChildren").objectAt(a);if(this.get("shouldSelectPageInOutline")){this.selectObject(c)
}else{var e=Smartgraphs.activityStepController.get("content");var f=c.get("steps").indexOf(e);
if(f<0){return}this.selectObject(c.get("treeItemChildren").objectAt(f))}}.observes("currentStep","currentPage"),selectionDidChange:function(){var a=this.get("selection").firstObject();
var b=a?a.get("page"):null;if(b){Smartgraphs.activityPageController.set("content",b)
}}.observes("selection")});Smartgraphs.activityPageController=SC.ObjectController.create({pageSelectionDidChange:function(){this.setIfChanged("content",Smartgraphs.activityPagesController.get("selection").firstObject())
}.observes("Smartgraphs.activityPagesController.selection"),cleanup:function(){Smartgraphs.firstGraphController.clear();
Smartgraphs.secondGraphController.clear();Smartgraphs.firstTableController.clear();
Smartgraphs.secondTableController.clear();Smartgraphs.activityViewController.clear()
}});Smartgraphs.activityPagesController=SC.ArrayController.create({allowsMultipleSelection:NO,shouldShowStepsInOutline:YES,currentPageDidChange:function(){var a=this.get("content");
var b=Smartgraphs.activityPageController.get("content");if(a&&a.indexOf(b)>=0){this.selectObject(b)
}}.observes("Smartgraphs.activityPageController.content"),currentPageNumber:function(){var a=this.get("selection").indexSetForSource(this);
return a&&a.firstObject()}.property("selection","[]").cacheable(),selectFirstPage:function(){if(this.get("length")>0){this.selectObject(this.objectAt(0))
}},selectNextPage:function(){var a=this.get("currentPageNumber");if(a+1<this.get("length")){this.selectObject(this.objectAt(a+1))
}},selectPreviousPage:function(){var a=this.get("currentPageNumber");if(a>0){this.selectObject(this.objectAt(a-1))
}},isLastPage:function(){return(this.get("currentPageNumber")>=(this.get("length")-1))
}.property("currentPageNumber","length").cacheable(),isFirstPage:function(){return(this.get("currentPageNumber")===0)
}.property("currentPageNumber").cacheable(),contentsDidChange:function(){var a=0;
this.forEach(function(b){b.set("pageNumber",a++)})}.observes("[]"),outline:function(){var b=!this.get("shouldShowStepsInOutline");
var a=this.getPath("content.length")||0;return a===0?null:SC.Object.create({title:"toplevel",treeItemIsExpanded:YES,pages:this.map(function(c){return c
}),treeItemChildren:this.map(function(c){var d=1;return SC.Object.create({title:c.get("name")||"Page %@".fmt(c.get("pageNumber")+1),treeItemIsExpanded:YES,page:c,steps:b?undefined:c.get("steps"),treeItemChildren:b?undefined:c.get("steps").map(function(e){return SC.Object.create({title:"Step %@".fmt(d++),step:e,treeItemIsExpanded:YES,treeItemChildren:null})
})})})})}.property("[]","shouldShowStepsInOutline").cacheable()});Smartgraphs.activityStepController=SC.ObjectController.create({canSubmit:NO,showSubmitButton:NO,submissibilityInspectorInstance:null,dialogTextHasContent:function(){return this.get("beforeText")||this.get("responseTemplate")||this.get("afterText")
}.property("beforeText","responseTemplate","afterText").cacheable(),cleanup:function(){var a=this.get("submissibilityInspectorInstance");
if(a){a.stopWatching();a.removeObserver("value",this,this.checkSubmissibility);a.destroy()
}this.set("submissibilityInspectorInstance",null)},begin:function(){this.setupPanes();
Smartgraphs.responseTemplateController.setTemplate(this.get("responseTemplate"));
Smartgraphs.statechart.sendAction("enableSubmission");this.executeCommands(this.get("startCommands"));
this.setupTriggers();if(this.get("shouldFinishImmediately")){Smartgraphs.statechart.sendAction("submitStep")
}else{Smartgraphs.statechart.sendAction("waitForResponse")}},setupPanes:function(){Smartgraphs.statechart.sendAction("setPaneConfig",this,this.get("paneConfig"));
var b=this.get("panes");for(var a in b){if(!b.hasOwnProperty(a)){continue}this.setupPane(a,b[a])
}},setupPane:function(b,a){b=Smartgraphs.activityViewController.validPaneFor(b);if(!b){return
}if(a===null){Smartgraphs.statechart.sendAction("hidePane",this,b);return}switch(a.type){case"graph":Smartgraphs.statechart.sendAction("showGraph",this,{pane:b,name:a.name});
return;case"table":Smartgraphs.statechart.sendAction("showTable",this,{pane:b,datasetName:a.datasetName});
return;case"image":Smartgraphs.statechart.sendAction("showImage",this,{pane:b,path:a.path});
return}},executeCommands:function(a){if(!a){return}var b=this;a.forEach(function(c){Smartgraphs.statechart.sendAction(c.action,b,c.literalArgs)
})},setupTriggers:function(){},enableSubmission:function(){this.set("canSubmit",YES)
},disableSubmission:function(){this.set("canSubmit",NO)},waitForResponse:function(){var a=this.get("submissibilityInspector");
if(a){var b=this.makeInspector(a);if(b){this.set("submissibilityInspectorInstance",b);
Smartgraphs.statechart.sendAction("disableSubmission");b.addObserver("value",this,this.checkSubmissibility);
b.watch()}else{console.error("submissibilityInspector was truthy, but makeInspector could not make an inspector instance.")
}}},checkSubmissibility:function(){var c=this.getPath("submissibilityInspectorInstance.value");
var b=Smartgraphs.evaluate(this.get("submissibilityCriterion"),c);var a=this.get("canSubmit");
if(b&&!a){Smartgraphs.statechart.sendAction("enableSubmission")}else{if(a&&!b){Smartgraphs.statechart.sendAction("disableSubmission")
}}},handleSubmission:function(){if(!this.get("canSubmit")){return NO}this.executeCommands(this.get("afterSubmissionCommands"));
var f=this.makeInspector(this.get("responseInspector"));if(f){var e=f.inspect();var d,b=this.get("responseBranches");
for(var c=0;c<b.length;c++){d=b.objectAt(c);if(Smartgraphs.evaluate(d.criterion,e)){Smartgraphs.statechart.sendAction("gotoStep",this,{stepId:d.step});
return}}}var a=this.get("defaultBranch");if(a){Smartgraphs.statechart.sendAction("gotoStep",this,{stepId:a.get("id")})
}},makeInspector:function(b){if(!b||!b.type){return NO}var a=SC.objectForPropertyPath(b.type);
if(!a||!a.isClass){return NO}return a.create({config:b.config})}});Smartgraphs.activityViewController=SC.ObjectController.create({dataViewNowShowing:null,topPaneNowShowing:null,bottomPaneNowShowing:null,singlePaneNowShowing:null,firstImageValue:null,secondImageValue:null,firstGraphPaneControls:null,secondGraphPaneControls:null,startControlIsVisible:NO,startControlIsEnabled:NO,startControlIsDefault:NO,stopControlIsVisible:NO,stopControlIsEnabled:NO,stopControlIsDefault:NO,clearControlIsVisible:NO,clearControlIsEnabled:NO,clearControlIsDefault:NO,paneIsSplit:null,canGotoNextPage:null,canGotoNextPageBinding:"Smartgraphs.activityController.canGotoNextPage",canSubmit:null,canSubmitBinding:"Smartgraphs.activityStepController.canSubmit",isFinalStep:null,isFinalStepBinding:"Smartgraphs.activityStepController.isFinalStep",hideSubmitButton:null,hideSubmitButtonBinding:"Smartgraphs.activityStepController.hideSubmitButton",nextButtonShouldSubmit:null,nextButtonShouldSubmitBinding:"Smartgraphs.activityStepController.nextButtonShouldSubmit",isFirstPage:NO,isFirstPageBinding:"Smartgraphs.activityPagesController.isFirstPage",isLastPage:NO,isLastPageBinding:"Smartgraphs.activityPagesController.isLastPage",enableBackAndForward:NO,showSubmitButton:function(){return !(this.get("hideSubmitButton")||this.get("nextButtonShouldSubmit"))
}.property("hideSubmitButton","nextButtonShouldSubmit").cacheable(),enableSubmitButton:null,enableSubmitButtonBinding:"Smartgraphs.activityStepController.canSubmit",showNextPageButton:null,showNextPageButtonBinding:SC.Binding.not("Smartgraphs.activityPagesController.isLastPage"),highlightNextPageButton:function(){return this.get("canGotoNextPage")||(this.get("isFinalStep")&&this.get("nextButtonShouldSubmit")&&this.get("canSubmit"))
}.property("canGotoNextPage","isFinalStep","nextButtonShouldSubmit","canSubmit").cacheable(),enableNextPageButton:function(){return(this.get("enableBackAndForward")&&!this.get("isLastPage"))||this.get("highlightNextPageButton")
}.property("enableBackAndForward","isLastPage","highlightNextPageButton").cacheable(),enableBackPageButton:function(){return(this.get("enableBackAndForward")&&!this.get("isFirstPage"))
}.property("enableBackAndForward","isFirstPage"),firstOrSecondFor:function(b){var a=this.get("paneIsSplit");
if((!a&&b==="single")||(a&&b==="top")){return"first"}if(a&&b==="bottom"){return"second"
}return NO},validPaneFor:function(b){var a=this.get("paneIsSplit");if((!a&&b==="single")||(a&&(b==="top"||b==="bottom"))){return b
}else{console.error('invalid pane "'+b+'"');return NO}},otherPaneFor:function(a){a=this.validPaneFor(a);
if(a==="bottom"){return"top"}if(a==="top"){return"bottom"}return NO},graphControllerForPane:function(b){b=this.validPaneFor(b);
var a=this.firstOrSecondFor(b);if(a){return Smartgraphs.get(a+"GraphController")}return NO
},setPaneConfig:function(a){if(a==="single"){this.set("paneIsSplit",false);this.set("dataViewNowShowing","Smartgraphs.activityPage.singlePaneDataView")
}else{if(a==="split"){this.set("paneIsSplit",true);this.set("dataViewNowShowing","Smartgraphs.activityPage.splitPaneDataView")
}}},showImage:function(c,a){c=this.validPaneFor(c);var b=this.firstOrSecondFor(c);
if(!b){return NO}this.set(b+"ImageValue",a);this.set(c+"PaneNowShowing","Smartgraphs.activityPage."+b+"ImageView");
return YES},showGraph:function(c,a){c=this.validPaneFor(c);var b=this.firstOrSecondFor(c);
if(!b){return NO}Smartgraphs.get(b+"GraphController").openGraph(a);this.set(c+"PaneNowShowing","Smartgraphs.activityPage."+b+"GraphPane");
return YES},showTable:function(c,a){c=this.validPaneFor(c);var b=this.firstOrSecondFor(c);
if(!b){return NO}Smartgraphs.get(b+"TableController").openDataset(a);this.set(c+"PaneNowShowing","Smartgraphs.activityPage."+b+"TableView");
return YES},hidePane:function(a){a=this.validPaneFor(a);if(!a){return NO}this.set(a+"PaneNowShowing",null);
return YES},paneForController:function(a){if(this.get("paneIsSplit")){if(a===Smartgraphs.firstGraphController){return"top"
}else{if(a===Smartgraphs.secondGraphController){return"bottom"}}}else{if(a===Smartgraphs.firstGraphController){return"single"
}}return NO},showSensorLoadingView:function(b){b=this.validPaneFor(b);var a=this.firstOrSecondFor(b);
if(!a){return NO}this.hideControls();this.set(a+"GraphPaneControls","Smartgraphs.activityPage.sensorLoadingView");
return YES},showControls:function(b){b=this.validPaneFor(b);var a=this.firstOrSecondFor(b);
if(!a){return NO}this.hideControls();this.disableAllControls();this.set(a+"GraphPaneControls","Smartgraphs.activityPage.graphControlsView");
return YES},hideControls:function(b){if(b){b=this.validPaneFor(b);var a=this.firstOrSecondFor(b);
if(!a){return NO}this.set(a+"GraphPaneControls",null)}else{this.set("firstGraphPaneControls",null);
this.set("secondGraphPaneControls",null)}return YES},revealAllControls:function(){this.set("startControlIsVisible",YES);
this.set("stopControlIsVisible",YES);this.set("clearControlIsVisible",YES)},revealOnlyClearControl:function(){this.set("startControlIsVisible",NO);
this.set("stopControlIsVisible",NO);this.set("clearControlIsVisible",YES)},disableAllControls:function(){this.set("startControlIsEnabled",NO);
this.set("startControlIsDefault",NO);this.set("stopControlIsEnabled",NO);this.set("stopControlIsDefault",NO);
this.set("clearControlIsEnabled",NO);this.set("clearControlIsDefault",NO)},highlightStartControl:function(){this.set("startControlIsEnabled",YES);
this.set("startControlIsDefault",YES);this.set("stopControlIsEnabled",NO);this.set("stopControlIsDefault",NO);
this.set("clearControlIsEnabled",NO);this.set("clearControlIsDefault",NO)},highlightStopControl:function(){this.set("startControlIsEnabled",NO);
this.set("startControlIsDefault",NO);this.set("stopControlIsEnabled",YES);this.set("stopControlIsDefault",YES);
this.set("clearControlIsEnabled",NO);this.set("clearControlIsDefault",NO)},highlightClearControl:function(){this.set("startControlIsEnabled",NO);
this.set("startControlIsDefault",NO);this.set("stopControlIsEnabled",NO);this.set("stopControlIsDefault",NO);
this.set("clearControlIsEnabled",YES);this.set("clearControlIsDefault",YES)},clear:function(){this.hideControls();
if(this.get("paneIsSplit")){this.hidePane("top");this.hidePane("bottom")}else{this.hidePane("single")
}}});Smartgraphs.appWindowController=SC.ObjectController.create({viewToShow:null,loadingMessage:null,shouldShowOutline:Smartgraphs.showOutline,shouldShowOutlineBindingDefault:SC.Binding.oneWay(),showActivityView:function(){this.set("viewToShow","Smartgraphs.activityPage.activityView")
},showActivityLoadingView:function(){this.set("viewToShow","Smartgraphs.mainPage.loadingView");
this.set("loadingMessage",Smartgraphs.activityPage.getPath("activityView.loadingMessage"))
},showErrorLoadingActivityView:function(){this.set("viewToShow","Smartgraphs.activityPage.errorLoadingActivityView")
},showAuthorView:function(){this.set("viewToShow","Smartgraphs.authorPage.authorView")
},showOutline:function(){this.set("shouldShowOutline",YES)},hideOutline:function(){this.set("shouldShowOutline",NO)
}});Smartgraphs.AnnotationSupport={supportsAnnotations:YES,annotationList:null,addAnnotation:function(a){if(this.findAnnotationByName(a.get("name"))){return
}this.get("annotationList").pushObject(a)},clearAnnotations:function(){this.set("annotationList",[])
},removeAnnotation:function(b){var c=this.get("annotationList");var a=this.findAnnotationByName(b);
if(a){c.removeObject(a)}},findAnnotationByName:function(b){var c=this.get("annotationList");
if(c){var d=c.getEach("name");var a=d.indexOf(b);return(a>=0)?c.objectAt(a):null}else{return null
}}};sc_require("mixins/annotation_support");Smartgraphs.GraphController=SC.ObjectController.extend(Smartgraphs.AnnotationSupport,{datasetList:null,eventQueue:[],_routeEvents:NO,colors:["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"],clear:function(){var a=this.get("name");
if(a){Smartgraphs.GraphController.controllerForName.set(a,null)}this.set("datasetList",[]);
this.clearAnnotations();this.set("content",null)},openGraph:function(a){var j=this.get("name");
if(a===j){return YES}var b=Smartgraphs.activityController.get("content");var h=b?SC.Query.local(Smartgraphs.Graph,"name={name} AND activity={activity}",{name:a,activity:Smartgraphs.activityController.get("content")}):SC.Query.local(Smartgraphs.Graph,"name={name}",{name:a});
var e=Smartgraphs.store.find(h);if(e.get("length")<1){return NO}this.clear();if(j){Smartgraphs.GraphController.controllerForName.set(j,null)
}this.set("content",e.objectAt(0));Smartgraphs.GraphController.controllerForName.set(a,this);
var g=this.get("initialDatasets")||[];for(var d=0,f=g.get("length");d<f;d++){this.addObjectByName(Smartgraphs.Dataset,g.objectAt(d))
}g=this.get("initialAnnotations")||[];var c;for(d=0,f=g.get("length");d<f;d++){c=g.objectAt(d);
this.addObjectByName(SC.objectForPropertyPath(c.type),c.name)}},addObjectByName:function(a,e){var d=SC.Query.local(a,"name={name} AND session={session}",{name:e,session:Smartgraphs.sessionController.getPath("content")});
var c=Smartgraphs.store.find(d);if(c.get("length")<1){d=SC.Query.local(a,"name={name} AND isExample=YES",{name:e});
c=Smartgraphs.store.find(d);if(c.get("length")<1){return NO}}var b=c.objectAt(0);
if(a===Smartgraphs.Dataset){this.addDataset(b);return YES}if(b.get("isAnnotation")){this.addAnnotation(b)
}},addDataset:function(a){if(this.findDatasetByName(a.get("name"))){return}a.set("color",this.getColorForDataset(a));
this.get("datasetList").pushObject(a)},removeDataset:function(b){var a=this.get("datasetList");
var c=this.findDatasetByName(b);if(c){a.removeObject(c)}},findDatasetByName:function(a){return this.findObjectByNameIn(a,this.get("datasetList"))
},findObjectByNameIn:function(b,c){var d=c.getEach("name");var a=d.indexOf(b);return(a>=0)?c.objectAt(a):null
},getColorForDataset:function(f){var e=f.get("defaultColor");var d=this.get("datasetList").getEach("color");
if(e&&!d.contains(e)){return e}var b=this.get("colors");for(var c=0,a=b.get("length");
c<a;c++){if(!d.contains(b.objectAt(c))){return b.objectAt(c)}}return b.objectAt(0)
},inputAreaMouseDown:function(a,b){if(this._routeEvents){this._eventQueue.pushObject({x:a,y:b,type:Smartgraphs.freehandInputController.START})
}},inputAreaMouseDragged:function(a,b){if(this._routeEvents){this._eventQueue.pushObject({x:a,y:b,type:Smartgraphs.freehandInputController.CONTINUE})
}},inputAreaMouseUp:function(a,b){if(this._routeEvents){this._eventQueue.pushObject({x:a,y:b,type:Smartgraphs.freehandInputController.END})
}},startFreehandInput:function(){this._routeEvents=YES;this._eventQueue=[];this.set("eventQueue",this._eventQueue)
},endFreehandInput:function(){this._routeEvents=NO}});Smartgraphs.GraphController.controllerForName=SC.Object.create({});
sc_require("controllers/graph");Smartgraphs.firstGraphController=Smartgraphs.GraphController.create({viewPath:"activityPage.firstGraphPane.graphView"});
sc_require("mixins/annotation_support");Smartgraphs.TableController=SC.ArrayController.extend(Smartgraphs.AnnotationSupport,{graphController:null,graphName:null,datasetName:null,dataset:null,sessionDatasets:null,axesBinding:"*graphController.axes",selectionBinding:"*dataset.selection",isStreamingBinding:"*dataset.isStreaming",showLabels:function(){return this.get("length")>0
}.property("length").cacheable(),showTable:function(){return !this.get("isStreaming")
}.property("isStreaming").cacheable(),latestXBinding:"*dataset.latestPoint.xRounded",latestYBinding:"*dataset.latestPoint.yRounded",clear:function(){this.removeDatasetsObserver();
this.set("sessionDatasets",null);this.clearAnnotations();this.set("content",null);
this.set("dataset",null);this.set("datasetName",null)},openDataset:function(e){var a=this.get("datasetName");
if(a===e){return YES}this.clear();this.set("datasetName",e);if(a){Smartgraphs.TableController.controllerForDataset.set(a,null)
}Smartgraphs.TableController.controllerForDataset.set(e,this);var d=SC.Query.local(Smartgraphs.Dataset,"name={name} AND session={session}",{name:e,session:Smartgraphs.sessionController.getPath("content")});
var c=Smartgraphs.store.find(d);if(c.get("length")>0){this.useDataset(c.firstObject());
return}d=SC.Query.local(Smartgraphs.Dataset,"name={name} AND isExample=YES",{name:e});
var b=Smartgraphs.store.find(d);if(b.get("length")>0){this.useDataset(b.firstObject());
return}this.set("sessionDatasets",c);c.addObserver("length",this,this.sessionDatasetsObserver)
},sessionDatasetsObserver:function(){var a=this.get("sessionDatasets");if(a.get("length")>0){this.useDataset(a.firstObject())
}this.removeDatasetsObserver();this.set("sessionDatasets",null)},removeDatasetsObserver:function(){var a=this.get("sessionDatasets");
if(a){a.removeObserver("length",this,this.sessionDatasetsObserver)}},useDataset:function(a){this.set("dataset",a);
this.set("content",a.get("points"))},addObjectByName:function(a,e){var d=SC.Query.local(a,"name={name} AND session={session}",{name:e,session:Smartgraphs.sessionController.getPath("content")});
var c=Smartgraphs.store.find(d);if(c.get("length")<1){d=SC.Query.local(a,"name={name} AND isExample=YES",{name:e});
c=Smartgraphs.store.find(d);if(c.get("length")<1){return NO}}var b=c.objectAt(0);
if(a===Smartgraphs.Dataset){this.addDataset(b);return YES}if(b.get("isAnnotation")){this.addAnnotation(b)
}},addAnnotation:function(a){arguments.callee.base.apply(this,arguments);if(a.kindOf(Smartgraphs.HighlightedPoint)){a.addObserver("point",this,"updateDataPoints")
}},updateDataPoints:function(b,a){var c=this.get("dataset");if(b.kindOf(Smartgraphs.HighlightedPoint)&&(b.get("point")!==undefined)){c.get("points").forEach(function(d){if(d==b.get("point")){d.set("backgroundColor",b.get("color"))
}else{if(d.get("backgroundColor")==b.get("color")){d.set("backgroundColor","")}}})
}}});Smartgraphs.TableController.controllerForDataset=SC.Object.create({});sc_require("controllers/table");
Smartgraphs.firstTableController=Smartgraphs.TableController.create({viewPath:"activityPage.firstTableView"});
Smartgraphs.freehandInputController=SC.ObjectController.create({_inputIsEnabled:NO,_isRecording:NO,pane:function(){return Smartgraphs.activityViewController.paneForController(this._graphController)
}.property(),register:function(c,b){if(this._inputIsEnabled){return NO}var a=c?c.findAnnotationByName(b):NO;
if(a&&SC.kindOf(a,Smartgraphs.FreehandSketch)){this._graphController=c;this._sketch=a;
return YES}return NO},enableInput:function(){if(!this._sketch){return NO}this._inputIsEnabled=YES;
this._graphController.startFreehandInput();this._graphController.get("eventQueue").addObserver("[]",this,this.graphObserver);
return YES},disableInput:function(){this.graphObserver();this._graphController.get("eventQueue").removeObserver("[]",this,this.graphObserver);
this._graphController.endFreehandInput();this._graphController=null;this._sketch=null;
this._inputIsEnabled=NO;this._pane=null;this._isRecording=NO},graphObserver:function(){var b,a=this._graphController.get("eventQueue");
while((b=a.shiftObject())){switch(b.type){case this.CONTINUE:this.continueAt(b.x,b.y);
break;case this.START:this.startAt(b.x,b.y);break;case this.END:this.endAt(b.x,b.y);
break}}},startAt:function(a,b){if(this._isRecording&&this._inputIsEnabled&&!this._sketch.getPath("points.length")){this._sketch.set("points",[{x:a,y:b}])
}},continueAt:function(a,b){if(this._isRecording&&this._inputIsEnabled){this._sketch.get("points").pushObject({x:a,y:b})
}},endAt:function(a,b){if(this._isRecording&&this._inputIsEnabled){this._sketch.get("points").pushObject({x:a,y:b});
Smartgraphs.statechart.sendAction("freehandSketchCompleted")}},startRecording:function(){this._isRecording=YES
},stopRecording:function(){this._isRecording=NO},clearSketch:function(){if(!this._isRecording&&this._inputIsEnabled){this._sketch.set("points",[])
}}});Smartgraphs.freehandInputController.START=1;Smartgraphs.freehandInputController.CONTINUE=2;
Smartgraphs.freehandInputController.END=3;Smartgraphs.interactiveSelectionController=SC.ObjectController.create({annotation:null,dataset:null});
Smartgraphs.loadingActivityController=SC.ObjectController.create({openAuthorViewAfterLoading:NO});
Smartgraphs.responseTemplateController=SC.ObjectController.create({editingShouldBeEnabled:NO,viewShouldReset:NO,setTemplate:function(b){this.set("content",b);
var a=this.get("initialValues");if(a){this.set("values",a.copy())}this.set("viewShouldReset",YES)
}});sc_require("controllers/graph");Smartgraphs.secondGraphController=Smartgraphs.GraphController.create({viewPath:"activityPage.secondGraphPane.graphView"});
sc_require("controllers/table");Smartgraphs.secondTableController=Smartgraphs.TableController.create({viewPath:"activityPage.secondTableView"});
Smartgraphs.sensorController=SC.ObjectController.create({xMin:null,xMax:null,downsampleRatio:function(){return $.browser.msie?3:2
}(),dt:0.1,sensorIsReady:NO,_appletView:null,_inputIsEnabled:NO,_isRecording:NO,_pane:null,_dataset:null,pane:function(){return this._pane
}.property(),register:function(d,b,a,c){if(this._inputIsEnabled){return NO}d=Smartgraphs.activityViewController.validPaneFor(d);
if(d&&b&&b.get("isExample")===NO){this._pane=d;this._dataset=b;if(a){this.set("xMin",a)
}if(c){this.set("xMax",c)}return YES}return NO},enableInput:function(){if(this._inputIsEnabled||!this._pane||!this._dataset){return NO
}this._inputIsEnabled=YES;if(!this._appletView){this._appletView=Smartgraphs.appletPage.sensorAppletView.create();
Smartgraphs.mainPage.get("mainPane").appendChild(this._appletView)}if(this.get("sensorIsReady")){Smartgraphs.statechart.sendAction("sensorHasLoaded")
}else{Smartgraphs.statechart.sendAction("waitForSensorToLoad")}return YES},disableInput:function(){this._inputIsEnabled=NO;
this._dataset=null;this._pane=null},startRecording:function(){this._isRecording=YES;
this._dataset.set("isStreaming",YES);this._dataset.set("streamSource",this);this._nsamples=0;
this._appletView.start();var b=this._dataset.getPath("points.length");var a=b+Math.floor(1+this.get("xMax")/(this.get("downsampleRatio")*this.get("dt")));
this._dataset.set("expectedLength",a)},stopRecording:function(){this._isRecording=NO;
this._dataset.set("isStreaming",NO);this._appletView.stop()},clearRecordedData:function(){SC.RunLoop.begin();
var b=this._dataset.get("points");var a=[];b.forEach(function(c){a.push(c)});a.forEach(function(c){c.set("dataset",null);
c.destroy()});SC.RunLoop.end()},sensorsReady:function(){SC.RunLoop.begin();this.set("sensorIsReady",YES);
if(this._inputIsEnabled){Smartgraphs.statechart.sendAction("sensorHasLoaded")}SC.RunLoop.end()
},dataReceived:function(e,g,c){if(!(this._inputIsEnabled&&this._isRecording)){return
}var a=this.get("dt");var d=this.get("downsampleRatio");var h,f;var j;for(var b=0;
b<g;b++){h=this._nsamples*a;f=c[b];if(h>this.get("xMax")){setTimeout(function(){SC.RunLoop.begin();
Smartgraphs.statechart.sendAction("stopSensor");SC.RunLoop.end()},10);return}if(this._nsamples%d===0){SC.RunLoop.begin();
j=Smartgraphs.store.createRecord(Smartgraphs.DataPoint,{x:h,y:f,guid:Smartgraphs.getNextGuid()});
this._dataset.set("latestPoint",j);this._dataset.get("points").pushObject(j);SC.RunLoop.end()
}this._nsamples++}},dataStreamEvent:function(){}});Smartgraphs.sessionController=SC.ObjectController.create({newSession:function(){var a=Smartgraphs.store.createRecord(Smartgraphs.Session,{steps:[],user:Smartgraphs.userController.getPath("content.id")});
a.set("id",Smartgraphs.getNextGuid());this.set("content",a)},createDataset:function(b){var a=Smartgraphs.store.createRecord(Smartgraphs.Dataset,{isExample:NO,name:b,points:[]});
a.set("session",this.get("content"));a.set("id",Smartgraphs.getNextGuid());return a
},createAnnotation:function(c,b,a){var d=Smartgraphs.store.createRecord(c,SC.mixin({isExample:NO,session:this.getPath("content.id"),name:b},a));
d.set("id",Smartgraphs.getNextGuid());return d}});Smartgraphs.toolbarController=SC.ObjectController.create({shouldShowEditButton:NO,shouldShowRunButton:NO,showRunButton:function(){this.set("shouldShowEditButton",NO);
this.set("shouldShowRunButton",YES)},showEditButton:function(){this.set("shouldShowEditButton",YES);
this.set("shouldShowRunButton",NO)}});Smartgraphs.userController=SC.ObjectController.create({});
Smartgraphs.CouchDataSource=SC.DataSource.extend({fetch:function(a,b){this.log("CouchDataSource.fetch()");
this.invokeLast(function(){a.dataSourceDidFetchQuery(b)});return YES},retrieveRecord:function(b,d){var f=Smartgraphs.store.recordTypeFor(d);
var e=Smartgraphs.store.idFor(d);this.log("CouchDataSource.retrieveRecord()");this.log("  Record type requested = %s",f.toString());
this.log("  id requested = %s",e);if(f===Smartgraphs.Activity){var a=e;var c='/db/smartgraphs/_design/app/_view/activities-by-url-and-version?key=["'+a+'",'+Smartgraphs.DATA_FORMAT_VERSION+"]";
SC.Request.getUrl(c).json().header("Accept","application/json").notify(this,"didRetrieveActivity",b,d).send();
this.log("  sent request to url %s",c);this.log("  returning YES from retrieveRecord");
return YES}if(f===Smartgraphs.User){this.log("  recognized request for User record");
if(e==="default"){b.dataSourceDidComplete(d,{userId:"default",name:"Default Smartgraphs User",sessions:[]});
this.log("  handled request for User record of 'default' user")}return YES}return NO
},didRetrieveActivity:function(d,c,e){if(SC.ok(d)){var a=d.get("body");this.log("retrieved response.body = ",a);
if(a&&a.rows&&a.rows.length===1&&a.rows[0].value){var f=a.rows[0].value;this.log("doc = ",f);
this.log("doc.activity = ",f.activity);var b=this;[["ActivityPage","pages"],["ActivityStep","steps"],["Axes","axes"],["DataPoint","datapoints"],["Dataset","datasets"],["FreehandSketch","freehandSketches"],["Graph","graphs"],["HighlightedPoint","highlightedPoints"],["HighlightedSegment","highlightedSegments"],["LineToAxis","linesToAxis"],["ResponseTemplate","responseTemplates"]].forEach(function(g){b.loadRecordsFromArray(Smartgraphs[g[0]],f[g[1]])
});c.dataSourceDidComplete(e,f.activity);return}}c.dataSourceDidError(e,d)},loadRecordsFromArray:function(b,a){a.forEach(function(c){Smartgraphs.store.loadRecord(b,c,c.url)
})},createRecord:function(a,b){return NO},updateRecord:function(a,b){return NO},destroyRecord:function(a,b){return NO
},camelizeKeys:function(c){var a={};for(var b in c){if(c.hasOwnProperty(b)){a[b.camelize()]=c[b]
}}return a},log:function(){if(Smartgraphs.get("logDataSource")){if(console.log.apply){console.log.apply(console,arguments)
}else{this.log=console.log}}}});Smartgraphs.Inspector=SC.Object.extend({init:function(){var a=this.get("config");
if(this.configure){this.configure(a||{})}arguments.callee.base.apply(this,arguments)
},watch:function(){},stopWatching:function(){}});sc_require("inspectors/inspector");
Smartgraphs.ResponseFieldsInspector=Smartgraphs.Inspector.extend({value:null,fieldIndex:null,configure:function(a){this.set("fieldIndex",a.fieldIndex)
},inspect:function(){var b=Smartgraphs.responseTemplateController.get("values");var a=this.get("fieldIndex");
if(!SC.none(a)){b=b[a]}this.set("value",b);return b},watch:function(){Smartgraphs.responseTemplateController.addObserver("values.[]",this,this.inspect)
},stopWatching:function(){Smartgraphs.responseTemplateController.removeObserver("values.[]",this,this.inspect)
}});sc_require("inspectors/response_fields");Smartgraphs.FirstResponseFieldInspector=Smartgraphs.ResponseFieldsInspector.extend({configure:function(a){a.fieldIndex=0;
arguments.callee.base.apply(this,arguments)}});sc_require("inspectors/inspector");
Smartgraphs.SelectedPointInspector=Smartgraphs.Inspector.extend({value:null,dataset:null,configure:function(b){var a=Smartgraphs.GraphController.controllerForName[b.graphName];
if(!a){return}this.set("dataset",a.findDatasetByName(b.datasetName))},inspect:function(){var c=this.get("dataset");
var a=c&&c.get("selection");var b=a&&a.get("length")===1?a.toArray().objectAt(0):undefined;
this.set("value",b);return b},watch:function(){var a=this.get("dataset");if(a){a.addObserver("selection",this,this.inspect)
}},stopWatching:function(){var a=this.get("dataset");if(a){a.removeObserver("selection",this,this.inspect)
}}});sc_require("inspectors/inspector");Smartgraphs.SketchLengthInspector=Smartgraphs.Inspector.extend({value:null,sketch:null,checkContinuosly:null,configure:function(b){this.set("checkContinuously",b.check&&b.check==="continuously");
var a=Smartgraphs.activityViewController.graphControllerForPane(Smartgraphs.freehandInputController.get("pane"));
if(!a){return}this.set("sketch",a.findAnnotationByName(b.annotationName))},inspect:function(){var d;
var c=this.getPath("sketch.points");if(!c||c.get("length")===0){d=-1}else{var b=c.getEach("x");
var a=Math.min.apply(null,b);var e=Math.max.apply(null,b);d=e-a}this.set("value",d);
return d},inspectOnStateChange:function(){var a=Smartgraphs.get("firstResponder");
if(a===Smartgraphs.FREEHAND_INPUT_COMPLETED||a===Smartgraphs.FREEHAND_INPUT_READY){this.inspect()
}},watch:function(){var a;if(this.get("checkContinuously")){a=this.get("sketch");
if(a){a.addObserver("points.[]",this,this.inspect)}}else{Smartgraphs.addObserver("firstResponder",this,this.inspectOnStateChange)
}},stopWatching:function(){var a;if(this.get("checkContinuously")){a=this.get("sketch");
if(a){a.removeObserver("points.[]",this,this.inspect)}}else{Smartgraphs.removeObserver("firstResponder",this,this.inspectOnStateChange)
}}});(function(g){var e;function h(n,o){for(var m=0;m<n.length;m++){if(e(n[m],o)){return true
}}return false}function j(n,o){for(var m=0;m<n.length;m++){if(!e(n[m],o)){return false
}}return true}function c(m,n){return(e(m[0],n)>e(m[1],n))}function f(m,n){return e(m[0],n)===e(m[1],n)
}function b(m,n){return(e(m,n)||"").strip()}function i(o,q){var n=e(o[0],q);var p=e(o[1],q)||[];
for(var m=0;m<p.length;m++){if(n===p[m]){return true}}return false}function d(m,n){return(e(m,n)||[]).length
}function k(m,n){var o=e(m,n);return(o===0)||!!o}function l(m,n){var o=e(m,n);return o.get&&o.get("x")
}function a(m,n){return parseInt(e(m,n),10)}e=function(o,n){if(o==="value"){return n
}if(o===g||o===null||typeof(o)==="string"||typeof(o)==="number"||typeof(o)==="boolean"||o.splice===[].splice){return o
}for(var p in o){if(o.hasOwnProperty(p)){var m=o[p];switch(p){case"literal":return m;
case"or":return h(m,n);case"and":return j(m,n);case"equals":return f(m,n);case"strip":return b(m,n);
case"in":return i(m,n);case"length":return d(m,n);case"gt":return c(m,n);case"notempty":return k(m,n);
case"xvalue":return l(m,n);case"int":return a(m,n)}console.error('invalid expression operator: "'+p+'"');
return}}};Smartgraphs.evaluate=e}());(function(b){function a(c){c=c.replace(/[^-a-zA-Z0-9,&\s]+/ig,"");
c=c.replace(/-/gi,"_");c=c.replace(/\s/gi,"-");return c.toLowerCase()}Smartgraphs.slugify=a
}());Smartgraphs.ArrowDrawing={arrowPath:function(b,a,j,i,k,f){var e=Math.atan2((i-a),(j-b));
var h=e+f*Math.PI/180;var g=e-f*Math.PI/180;var n=j;var l=i;var d=j-k*Math.cos(h);
var c=i-k*Math.sin(h);var p=j-k*Math.cos(g);var m=i-k*Math.sin(g);var o=" M "+b+" "+a+" L "+n+" "+l+" L "+d+" "+c+" L "+p+" "+m+" L "+n+" "+l;
return o}};Smartgraphs.Activity=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",title:SC.Record.attr(String),owner:SC.Record.attr(String),pages:SC.Record.toMany("Smartgraphs.ActivityPage",{inverse:"activity",orderBy:"index"}),context:{}});
Smartgraphs.ActivityPage=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",activity:SC.Record.toOne("Smartgraphs.Activity",{inverse:"pages",isMaster:YES}),name:SC.Record.attr(String),index:SC.Record.attr(Number),introText:SC.Record.attr(String),steps:SC.Record.toMany("Smartgraphs.ActivityStep",{inverse:"activityPage"}),firstStep:SC.Record.toOne("Smartgraphs.ActivityStep"),context:{},isSelectable:NO,pageNumber:null,pageNumberAsString:function(){return(this.get("pageNumber")+1)+""
}.property("pageNumber")});Smartgraphs.ActivityStep=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",activityPage:SC.Record.toOne("Smartgraphs.ActivityPage",{inverse:"steps",isMaster:YES}),paneConfig:SC.Record.toOne(String),panes:SC.Record.attr(Object),beforeText:SC.Record.attr(String),responseTemplate:SC.Record.toOne("Smartgraphs.ResponseTemplate"),afterText:SC.Record.attr(String),startCommands:SC.Record.attr(Array),shouldFinishImmediately:SC.Record.attr(Boolean),submissibilityInspector:SC.Record.attr(Object),submissibilityCriterion:SC.Record.attr(Object),triggeredCommands:SC.Record.toMany("Smartgraphs.TriggeredCommands"),afterSubmissionCommands:SC.Record.attr(Array),responseInspector:SC.Record.attr(Object),responseBranches:SC.Record.attr(Array),defaultBranch:SC.Record.toOne("Smartgraphs.ActivityStep"),isFinalStep:SC.Record.attr(Boolean),hideSubmitButton:SC.Record.attr(Boolean),submitButtonTitle:SC.Record.attr(String),nextButtonShouldSubmit:SC.Record.attr(Boolean),shouldAutoAdvancePage:SC.Record.attr(Boolean)});
Smartgraphs.Annotation=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",isAnnotation:YES,isExample:SC.Record.attr(Boolean),name:SC.Record.attr(String),activity:SC.Record.toOne("Smartgraphs.Activity"),session:SC.Record.toOne("Smartgraphs.Session"),color:SC.Record.attr(String,{defaultValue:"#cc0000"}),isHighlighted:SC.Record.attr(Boolean,{defaultValue:false})});
Smartgraphs.DataPoint=SC.Record.extend({x:SC.Record.attr(Number),y:SC.Record.attr(Number),dataset:SC.Record.toOne("Smartgraphs.Dataset",{inverse:"points"}),xRounded:function(){return Math.round(this.get("x")*100)/100
}.property("x").cacheable(),yRounded:function(){return Math.round(this.get("y")*100)/100
}.property("y").cacheable()});sc_require("mixins/arrow_drawing");Smartgraphs.ArrowView=RaphaelViews.RaphaelView.extend(Smartgraphs.ArrowDrawing,{canShowInTable:NO,strokeBinding:".item.color",isHighlightedBinding:".item.isHighlighted",strokeWidth:function(){return this.get("isHighlighted")?3:2
}.property("isHighlighted"),strokeOpacity:function(){return this.get("isHighlighted")?0.9:0.5
}.property("isHighlighted"),displayProperties:"point1 point2 label stroke isHighlighted strokeWidth strokeOpacity".w(),renderCallback:function(c,a){var b=c.path(a.d).attr(a);
return b},render:function(c,a){var d=this.get("graphView");var e=this.getStartAndEnd(this.get("item"));
var g=d.coordinatesForPoint(e.start.x,e.start.y);var b=d.coordinatesForPoint(e.end.x,e.end.y);
var f=this.arrowPath(g.x,g.y,b.x,b.y,10,15);var h={d:f,stroke:this.get("stroke"),"stroke-width":this.get("strokeWidth"),"stroke-opacity":this.get("strokeOpacity")};
if(a){c.callback(this,this.renderCallback,h)}else{var i=c.raphael();i.attr(h)}},getStartAndEnd:function(d){var k=d.get("point1"),j=d.get("point2");
var c=k.get("x"),h=k.get("y"),a=j.get("x"),g=j.get("y");var i,f,b,e;if(d.get("isHorizontal")){f=d.get("isClockwise")?g:h;
b={x:c,y:f};e={x:a,y:f}}else{if(d.get("isVertical")){i=d.get("isClockwise")?c:a;b={x:i,y:h};
e={x:i,y:g}}else{b={x:c,y:h};e={x:a,y:g}}}return{start:b,end:e}}});sc_require("models/annotation");
sc_require("models/data_point");sc_require("views/arrow");Smartgraphs.Arrow=Smartgraphs.Annotation.extend({point1:SC.Record.toOne("Smartgraphs.DataPoint"),point2:SC.Record.toOne("Smartgraphs.DataPoint"),isHorizontal:SC.Record.attr(Boolean,{defaultValue:false}),isVertical:SC.Record.attr(Boolean,{defaultValue:false}),isClockwise:SC.Record.attr(Boolean,{defaultValue:false}),label:SC.Record.attr(String)});
Smartgraphs.Arrow.viewClass=Smartgraphs.ArrowView;Smartgraphs.Axes=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",xMin:SC.Record.attr(Number),xMax:SC.Record.attr(Number),xSteps:SC.Record.attr(Number),xLabel:SC.Record.attr(String),xLabelAbbreviated:SC.Record.attr(String),yMin:SC.Record.attr(Number),yMax:SC.Record.attr(Number),ySteps:SC.Record.attr(Number),yLabel:SC.Record.attr(String),yLabelAbbreviated:SC.Record.attr(String)});
sc_require("mixins/arrow_drawing");Smartgraphs.BracketArcView=RaphaelViews.RaphaelView.extend(Smartgraphs.ArrowDrawing,{canShowInTable:YES,strokeBinding:".item.color",isHighlightedBinding:".item.isHighlighted",strokeWidth:function(){return this.get("isHighlighted")?3:2
}.property("isHighlighted"),strokeOpacity:function(){return this.get("isHighlighted")?0.9:0.5
}.property("isHighlighted"),displayProperties:"point1 point2 label stroke isHighlighted strokeWidth strokeOpacity".w(),renderCallback:function(c,a){var b=c.path(a.d).attr(a);
return b},render:function(e,n){var i=this.get("item");var h={x:i.get("startX"),y:i.get("startY")};
var f={x:i.get("endX"),y:i.get("endY")};var s,r,m,p,l,k,j;var y=25;var g=6;if((i.get("isClockwise")&&(h.y<f.y))||(!i.get("isClockwise")&&(h.y>f.y))){m=Math.atan2((f.y-h.y),(f.x-h.x))+(Math.PI/2);
s={x:h.x+40,y:h.y};r={x:f.x+40,y:f.y};p=m+(1.5*y)*Math.PI/180;l=m-(0.5*y)*Math.PI/180;
k=m+(0.5*y)*Math.PI/180;j=m-(1.5*y)*Math.PI/180}else{m=Math.atan2((f.y-h.y),(f.x-h.x))-(Math.PI/2);
s={x:h.x-40,y:h.y};r={x:f.x-40,y:f.y};p=m+(0.5*y)*Math.PI/180;l=m-(1.5*y)*Math.PI/180;
k=m+(1.5*y)*Math.PI/180;j=m-(0.5*y)*Math.PI/180}var c=h.x-g*Math.cos(p);var a=h.y-g*Math.sin(p);
var q=h.x-g*Math.cos(l);var o=h.y-g*Math.sin(l);var x=f.x-g*Math.cos(k);var w=f.y-g*Math.sin(k);
var d=f.x-g*Math.cos(j);var b=f.y-g*Math.sin(j);var u="M "+h.x+" "+h.y+"L "+c+" "+a+"L "+q+" "+o+"L "+h.x+" "+h.y+"C "+s.x+" "+s.y+" "+r.x+" "+r.y+" "+f.x+" "+f.y+"L "+x+" "+w+"L "+d+" "+b+"L "+f.x+" "+f.y;
var v={d:u,stroke:this.get("stroke"),"stroke-width":this.get("strokeWidth"),"stroke-opacity":this.get("strokeOpacity")};
if(n){e.callback(this,this.renderCallback,v)}else{var t=e.raphael();t.attr(v)}}});
sc_require("models/annotation");sc_require("views/bracket_arc");Smartgraphs.BracketArc=Smartgraphs.Annotation.extend({startX:SC.Record.attr(Number),startY:SC.Record.attr(Number),endX:SC.Record.attr(Number),endY:SC.Record.attr(Number),isClockwise:SC.Record.attr(Boolean,{defaultValue:false})});
Smartgraphs.BracketArc.viewClass=Smartgraphs.BracketArcView;Smartgraphs.DataPointView=RaphaelViews.RaphaelView.extend({displayProperties:"content.x content.y isEnabled fill stroke radius".w(),notSelectedFillBinding:".parentView.color",notSelectedStrokeBinding:".parentView.color",selectedFill:"#aa0000",selectedStroke:"#aa0000",hoveredRadius:5,notHoveredRadius:3,isEnabled:YES,isHovered:NO,isSelected:NO,layerIsCacheable:YES,isPoolable:YES,fill:function(){return(this.get("isSelected")?this.get("selectedFill"):this.get("notSelectedFill"))
}.property("isSelected","selectedFill","notSelectedFill").cacheable(),stroke:function(){return(this.get("isSelected")?this.get("selectedStroke"):this.get("notSelectedStroke"))
}.property("isSelected","selectedStroke","notSelectedStroke").cacheable(),radius:function(){return(this.get("isHovered")?this.get("hoveredRadius"):this.get("notHoveredRadius"))
}.property("isHovered","hoveredRadius","notHoveredRadius").cacheable(),mouseEntered:function(){this.set("isHovered",YES)
},mouseExited:function(){this.set("isHovered",NO)},mouseDown:function(){Smartgraphs.statechart.sendAction("dataPointSelected",this,null);
return NO},renderCallback:function(f,b,e,a,d,c){return f.circle(b,e,a).attr({fill:d,stroke:c})
},render:function(c,a){var d=this.getPath("parentView.graphView");if(!d){this.displayDidChange();
return}var i=this.get("fill"),j=this.get("stroke"),e=this.get("radius");var h=this.getPath("content.x"),f=this.getPath("content.y");
var g=d.coordinatesForPoint(h,f);if(a){c.callback(this,this.renderCallback,g.x,g.y,e,i,j)
}else{var b=c.raphael();b.attr({cx:g.x,cy:g.y,r:e,fill:i,stroke:j})}}});sc_require("views/data_point");
Smartgraphs.DatasetView=RaphaelViews.RaphaelCollectionView.extend({exampleView:Smartgraphs.DataPointView,useFastPath:YES,colorBinding:".item.color",selectionBinding:".item.selection",isSelectableBinding:".item.isSelectable",content:function(){var a=this.get("item");
if(!a){return null}return Smartgraphs.store.find(SC.Query.local(Smartgraphs.DataPoint,{conditions:"dataset = {dataset}",dataset:a,orderBy:"id"}))
}.property("dataset").cacheable()});sc_require("views/dataset");Smartgraphs.Dataset=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",name:SC.Record.attr(String),isExample:SC.Record.attr(Boolean),activity:SC.Record.toOne("Smartgraphs.Activity"),session:SC.Record.toOne("Smartgraphs.Session"),points:SC.Record.toMany("Smartgraphs.DataPoint",{inverse:"dataset"}),defaultColor:SC.Record.attr(String),selection:null,isSelectable:YES,color:null,isStreaming:NO,streamSouce:null,latestPoint:null,expectedLength:null});
Smartgraphs.Dataset.viewClass=Smartgraphs.DatasetView;Smartgraphs.FreehandSketchView=RaphaelViews.RaphaelView.extend({stroke:"#000000",strokeWidth:2,displayProperties:"item.points.[]".w(),renderCallback:function(d,a,b,c){return d.path(a).attr({stroke:b,"stroke-width":c})
},render:function(b,a){var c=this.get("graphView");var h=this.get("item");var j=(h?h.get("points"):null)||[{x:0,y:0}];
var e=[];var g,f;for(var d=0,k=j.get("length");d<k;d++){g=j.objectAt(d);f=c.coordinatesForPoint(g.x,g.y)||{x:0,y:0};
e.push(d===0?"M":"L");e.push(Math.round(f.x));e.push(" ");e.push(Math.round(f.y))
}var m=e.join("")||"M0 0";if(a){b.callback(this,this.renderCallback,m,this.get("stroke"),this.get("strokeWidth"))
}else{var l=b.raphael();l.attr({path:m})}}});sc_require("models/annotation");sc_require("views/freehand_sketch");
Smartgraphs.FreehandSketch=Smartgraphs.Annotation.extend({points:SC.Record.attr(Array),isDirectional:SC.Record.attr(Boolean)});
Smartgraphs.FreehandSketch.viewClass=Smartgraphs.FreehandSketchView;Smartgraphs.Graph=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",activity:SC.Record.toOne("Smartgraphs.Activity"),name:SC.Record.attr(String),description:SC.Record.attr(String),title:SC.Record.attr(String),axes:SC.Record.toOne("Smartgraphs.Axes"),initialDatasets:SC.Record.attr(Array),initialAnnotations:SC.Record.attr(Array)});
Smartgraphs.HighlightedPointView=RaphaelViews.RaphaelView.extend({canShowInTable:NO,radius:8,strokeBinding:".item.color",strokeWidth:2,strokeOpacity:1,fill:"#ffffff",fillOpacity:0,displayProperties:"item.point.x item.point.y radius stroke strokeWidth strokeOpacity fill fillOpacity".w(),renderCallback:function(b,a){return b.circle(a.x,a.y,a.r).attr(a)
},render:function(c,a){var d=this.get("graphView");var e=this.get("item");var i=e.get("point");
var h=i?i.get("x"):-9999;var f=i?i.get("y"):-9999;var g=d.coordinatesForPoint(h,f);
var j={cx:g.x,cy:g.y,r:this.get("radius"),stroke:this.get("stroke"),"stroke-width":this.get("strokeWidth"),"stroke-opacity":this.get("strokeOpacity"),fill:this.get("fill"),"fill-opacity":this.get("fillOpacity")};
if(a){c.callback(this,this.renderCallback,j)}else{var b=c.raphael();b.attr(j)}}});
sc_require("models/annotation");sc_require("views/highlighted_point");Smartgraphs.HighlightedPoint=Smartgraphs.Annotation.extend({point:SC.Record.toOne("Smartgraphs.DataPoint")});
Smartgraphs.HighlightedPoint.viewClass=Smartgraphs.HighlightedPointView;Smartgraphs.HighlightedSegmentView=RaphaelViews.RaphaelView.extend({canShowInTable:NO,strokeBinding:".item.color",strokeWidth:14,strokeOpacity:0.1,displayProperties:"points.[] stroke strokeWidth strokeOpacity".w(),renderCallback:function(c,a){var b=c.path(a.d).attr(a);
return b},render:function(b,a){var c=this.get("graphView");var e=this.get("item");
var m=e.get("points");var j,k;var h=[];for(var f=0,g=m.get("length");f<g;f++){h.push(f===0?"M":"L");
k=m.objectAt(f);j=c.coordinatesForPoint(k.get("x"),k.get("y"));h.push(j.x);h.push(j.y)
}var d=h.join(" ");var l={d:d,stroke:this.get("stroke"),"stroke-width":this.get("strokeWidth"),"stroke-opacity":this.get("strokeOpacity"),"stroke-linecap":"round","stroke-linejoin":"round"};
if(a){b.callback(this,this.renderCallback,l)}else{var n=b.raphael();n.attr(l)}}});
sc_require("models/annotation");sc_require("models/data_point");sc_require("views/highlighted_segment");
Smartgraphs.HighlightedSegment=Smartgraphs.Annotation.extend({points:SC.Record.toMany("Smartgraphs.DataPoint",{orderBy:"x"})});
Smartgraphs.HighlightedSegment.viewClass=Smartgraphs.HighlightedSegmentView;sc_require("mixins/arrow_drawing");
Smartgraphs.IndicatingArrowView=RaphaelViews.RaphaelView.extend(Smartgraphs.ArrowDrawing,{canShowInTable:YES,strokeBinding:".item.color",isHighlightedBinding:".item.isHighlighted",strokeWidth:function(){return this.get("isHighlighted")?3:2
}.property("isHighlighted"),strokeOpacity:function(){return this.get("isHighlighted")?0.9:0.5
}.property("isHighlighted"),displayProperties:"point1 point2 label stroke isHighlighted strokeWidth strokeOpacity".w(),renderCallback:function(c,a){var b=c.path(a.d).attr(a);
return b},render:function(c,a){var d=this.get("graphView");var e=this.getStartAndEnd(this.get("item"));
var g=d?d.coordinatesForPoint(e.start.x,e.start.y):{x:e.start.x,y:e.start.y};var b=d?d.coordinatesForPoint(e.end.x,e.end.y):{x:e.end.x,y:e.end.y};
var f=this.arrowPath(g.x,g.y,b.x,b.y,10,15);var h={d:f,stroke:this.get("stroke"),"stroke-width":this.get("strokeWidth"),"stroke-opacity":this.get("strokeOpacity")};
if(a){c.callback(this,this.renderCallback,h)}else{var i=c.raphael();i.attr(h)}},getStartAndEnd:function(f){var a=f.get("x"),i=f.get("y"),h=f.get("length"),e=f.get("pointAngle");
var c,j,b,g;if(e===0){c=a;j=i+h}else{if(e==180){c=a;j=i-h}else{if(e==90){j=i;c=a+h
}else{if(e==270){j=i;c=a-h}else{var d=e*Math.PI/180;c=a-h*Math.cos(d);j=i-h*Math.sin(d)
}}}}b={x:c,y:j};g={x:a,y:i};return{start:b,end:g}}});sc_require("models/annotation");
sc_require("views/indicating_arrow");Smartgraphs.IndicatingArrow=Smartgraphs.Annotation.extend({specificX:SC.Record.attr(Number),specificY:SC.Record.attr(Number),annotation:SC.Record.toOne("Smartgraphs.HighlightedPoint"),dataPoint:SC.Record.toOne("Smartgraphs.DataPoint"),pointAngle:SC.Record.attr(Number,{default_value:335}),length:SC.Record.attr(Number,{default_value:25}),x:function(){if(this.get("specificX")){return this.get("specificX")
}else{if(this.get("dataPoint")){return this.get("dataPoint").get("x")}else{if(this.get("annotation")){if(this.get("annotation").get("point")){return this.get("annotation").get("point").get("x")
}else{if(this.get("annotation").get("point1")){return this.get("annotation").get("point1").get("x")
}else{return null}}}else{return null}}}}.property("annotation","dataPoint","specificX").cacheable(),y:function(){if(this.get("specificY")){return this.get("specificY")
}else{if(this.get("dataPoint")){return this.get("dataPoint").get("y")}else{if(this.get("annotation")){if(this.get("annotation").get("point")){return this.get("annotation").get("point").get("y")
}else{if(this.get("annotation").get("point1")){return this.get("annotation").get("point1").get("y")
}else{return null}}}else{return null}}}}.property("annotation","dataPoint","specificY").cacheable()});
Smartgraphs.IndicatingArrow.viewClass=Smartgraphs.IndicatingArrowView;Smartgraphs.LineThroughPointsView=RaphaelViews.RaphaelView.extend({canShowInTable:NO,strokeBinding:".item.color",strokeWidth:2,strokeOpacity:0.3,displayProperties:"point1 point2 stroke strokeWidth strokeOpacity".w(),renderCallback:function(c,a){var b=c.path(a.d).attr(a);
return b},render:function(b,a){var c=this.get("graphView");var e=this.get("item");
var l=e.get("point1");var j=e.get("point2");var h=c.get("axes");var p=this.getEndPoints(l,j,h);
var m,n;var k=[];for(var f=0,g=p.length;f<g;f++){k.push(f===0?"M":"L");n=p[f];m=c.coordinatesForPoint(n.x,n.y);
k.push(m.x);k.push(m.y)}var d=k.join(" ");var o={d:d,stroke:this.get("stroke"),"stroke-width":this.get("strokeWidth"),"stroke-opacity":this.get("strokeOpacity")};
if(a){b.callback(this,this.renderCallback,o)}else{var q=b.raphael();q.attr(o)}},_y:function(d,c,a){return(c*d)+a
},_x:function(d,c,a){if(c===0){return a}else{return(d-a)/c}},getEndPoints:function(l,i,h){var g=h.get("xMax");
var d=h.get("xMin");var e=h.get("yMax");var p=h.get("yMin");var o=[];var c=l.get("x"),n=l.get("y"),a=i.get("x"),k=i.get("y");
if(c===a){o.push({x:c,y:p});o.push({x:c,y:e});return o}var f=(k-n)/(a-c);var j=k-(f*a);
if(this._y(d,f,j)<p){o.push({y:p,x:this._x(p,f,j)});if(this._y(g,f,j)>e){o.push({y:e,x:this._x(e,f,j)})
}else{o.push({x:g,y:this._y(g,f,j)})}return o}if((p<=this._y(d,f,j))&&(this._y(d,f,j)<=e)){o.push({x:d,y:this._y(d,f,j)});
if(this._y(g,f,j)<p){o.push({y:p,x:this._x(p,f,j)})}else{if(this._y(g,f,j)<=e){o.push({x:g,y:this._y(g,f,j)})
}else{o.push({y:e,x:this._x(e,f,j)})}}return o}if(e<this._y(d,f,j)){o.push({y:e,x:this._x(e,f,j)});
if(this._y(g,f,j)<p){o.push({y:p,x:this._x(p,f,j)})}else{o.push({x:g,y:this._y(g,f,j)})
}return o}return null}});sc_require("models/annotation");sc_require("models/data_point");
sc_require("views/line_through_points");Smartgraphs.LineThroughPoints=Smartgraphs.Annotation.extend({point1:SC.Record.toOne("Smartgraphs.DataPoint"),point2:SC.Record.toOne("Smartgraphs.DataPoint")});
Smartgraphs.LineThroughPoints.viewClass=Smartgraphs.LineThroughPointsView;Smartgraphs.LineToAxisView=RaphaelViews.RaphaelView.extend({canShowInTable:NO,radius:8,defaultStroke:"#aa0000",defaultStrokeWidth:2,defaultStrokeOpacity:0.7,fill:"#ffffff",fillOpacity:0,displayProperties:"item.point.x item.point.y".w(),renderCallback:function(d,c){var a;
if(c.shouldHideLinePath){a=d.path("M 0 0 L 0 0");a.hide()}else{var b="M "+c.linePathStartingCoords.x+" "+c.linePathStartingCoords.y+" L "+c.linePathEndingCoords.x+" "+c.linePathEndingCoords.y;
a=d.path(b)}a.attr({"stroke-width":this.defaultStrokeWidth,stroke:this.defaultStroke,"stroke-opacity":this.defaultStrokeOpacity});
return a},render:function(b,a){var c=this.get("graphView");var e=this.get("item");
var j;var f=e.get("point");if(f){var g=c.coordinatesForPoint(f.get("x"),f.get("y"));
if(g){var h;var d=e.get("axis");if(d=="x"){h=c.coordinatesForPoint(f.get("x"),0)}else{h=c.coordinatesForPoint(0,f.get("y"))
}if(h){j={linePathStartingCoords:g,linePathEndingCoords:h,shouldHideLinePath:e.get("shouldHideLinePath")}
}}}if(!j){j={shouldHideLinePath:YES}}if(a){b.callback(this,this.renderCallback,j)
}else{var i=b.raphael();i.attr(j)}}});sc_require("models/annotation");sc_require("models/highlighted_point");
sc_require("views/line_to_axis");Smartgraphs.LineToAxis=Smartgraphs.Annotation.extend({point:SC.Record.toOne("Smartgraphs.DataPoint"),shouldHideLinePath:SC.Record.attr(Boolean,{defaultValue:NO}),axis:SC.Record.attr(String,{defaultValue:"y"})});
Smartgraphs.LineToAxis.viewClass=Smartgraphs.LineToAxisView;Smartgraphs.ResponseTemplate=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",templateString:SC.Record.attr(String),fieldTypes:SC.Record.attr(Array),fieldChoicesList:SC.Record.attr(Array),intialValues:SC.Record.attr(Array),values:[]});
Smartgraphs.Session=SC.Record.extend({user:SC.Record.toOne("Smartgraphs.User",{inverse:"session",isMaster:YES})});
Smartgraphs.TriggeredCommands=SC.Record.extend({systemInspector:SC.Record.attr(Object),triggerCriterion:SC.Record.attr(Object),onCommands:SC.Record.attr(Object),offCommands:SC.Record.attr(Object)});
Smartgraphs.User=SC.Record.extend({userId:SC.Record.attr(String),primaryKey:"userId",name:SC.Record.attr(String),sessions:SC.Record.toMany(Smartgraphs.Session,{inverse:"user"})});
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
}}return NO},cancelLoading:function(){this.cleanupLoading()}};sc_require("states/mixins/resource_loader");
Smartgraphs.statechart=SC.Statechart.create({trace:YES,init:function(){arguments.callee.base.apply(this,arguments);
this.invokeLast(function(){this.sendAction=function(c,b,a){var d=this.get("trace");
if(d){console.log("BEGIN sendAction %s",c)}this.sendEvent(c,b,a);if(d){console.log("END sendAction %s",c)
}};if(this.get("trace")){console.log("BEGIN LOGGING ACTIONS:")}})},rootState:SC.State.design({initialSubstate:"LOGIN",LOGIN:SC.State.design({enterState:function(){Smartgraphs.userController.set("content",Smartgraphs.store.find(Smartgraphs.User,"default"));
this.gotoState("READY")}}),READY:SC.State.design({initialSubstate:"READY_DEFAULT",READY_DEFAULT:SC.State.design({enterState:function(){SC.routes.add("*activityId",this,"route")
},route:function(a){if(a.activityId){Smartgraphs.statechart.sendAction("openActivity",this,{id:a.activityId})
}}}),openActivity:function(b,a){var c=Smartgraphs.activityController.get("content");
if(c&&c.get("id")===a.id){return YES}Smartgraphs.activityController.set("content",Smartgraphs.store.find(Smartgraphs.Activity,a.id));
this.gotoState("LOADING_ACTIVITY");return YES},LOADING_ACTIVITY:SC.State.design(Smartgraphs.ResourceLoader,{masterResource:{load:function(){return Smartgraphs.activityController.get("content")
}},subordinateResources:[],enterState:function(){if(Smartgraphs.loadingActivityController.get("openAuthorViewAfterLoading")){Smartgraphs.toolbarController.showRunButton()
}else{Smartgraphs.toolbarController.showEditButton()}if(this.loadResources()){return
}else{Smartgraphs.appWindowController.showActivityLoadingView()}},exitState:function(){this.cancelLoading()
},resourcesDidLoad:function(){Smartgraphs.sessionController.newSession();var a=Smartgraphs.activityController.get("pages");
Smartgraphs.activityPagesController.set("content",a);if(a.get("length")>0){Smartgraphs.activityPagesController.selectFirstPage()
}var b=Smartgraphs.loadingActivityController.get("openAuthorViewAfterLoading");this.gotoState(b?"AUTHOR":"ACTIVITY")
},resourceLoadingError:function(){this.gotoState("ERROR_LOADING_ACTIVITY")},openActivity:function(b,a){return(a.id===Smartgraphs.activityController.getPath("content.id"))?YES:NO
},openAuthorView:function(){Smartgraphs.loadingActivityController.set("openAuthorViewAfterLoading",YES);
return YES},runActivity:function(){Smartgraphs.loadingActivityController.set("openAuthorViewAfterLoading",NO);
return YES}}),ERROR_LOADING_ACTIVITY:SC.State.design({enterState:function(){Smartgraphs.appWindowController.showErrorLoadingActivityView()
}}),ACTIVITY:SC.State.plugin("Smartgraphs.ACTIVITY"),ACTIVITY_DONE:SC.State.design(),AUTHOR:SC.State.plugin("Smartgraphs.AUTHOR")})})});
Smartgraphs.ACTIVITY=SC.State.extend({initialSubstate:"ACTIVITY_PAGE_START",enterState:function(){Smartgraphs.appWindowController.showActivityView()
},exitState:function(){Smartgraphs.activityController.cleanup()},ACTIVITY_PAGE_START:SC.State.design({enterState:function(){Smartgraphs.activityStepController.set("content",Smartgraphs.activityPageController.get("firstStep"));
this.gotoState("ACTIVITY_STEP")}}),ACTIVITY_STEP:SC.State.plugin("Smartgraphs.ACTIVITY_STEP"),ACTIVITY_STEP_SUBMITTED:SC.State.plugin("Smartgraphs.ACTIVITY_STEP_SUBMITTED"),ACTIVITY_PAGE_DONE:SC.State.design({enterState:function(){if(Smartgraphs.activityPagesController.get("isLastPage")){this.gotoState("ACTIVITY_DONE")
}else{Smartgraphs.activityController.set("canGotoNextPage",YES)}},exitState:function(){Smartgraphs.activityController.set("canGotoNextPage",NO);
Smartgraphs.activityPageController.cleanup()},gotoNextPage:function(){Smartgraphs.activityPagesController.selectNextPage();
this.gotoState("ACTIVITY_PAGE_START")}}),openAuthorView:function(){this.gotoState("AUTHOR");
return YES},openActivity:function(){Smartgraphs.loadingActivityController.set("openAuthorViewAfterLoading",NO);
return NO},createLineThroughPoints:function(e,d){var a=Smartgraphs.GraphController.controllerForName[d.graphName];
if(!a){return YES}var f=a.findAnnotationByName(d.firstPoint);var c=a.findAnnotationByName(d.secondPoint);
var b=d.color?d.color:"#000000";var g=Smartgraphs.sessionController.createAnnotation(Smartgraphs.LineThroughPoints,d.lineName,{point1:f.get("point").get("id"),point2:c.get("point").get("id"),color:b});
return YES},createRiseArrow:function(f,d){var b=Smartgraphs.GraphController.controllerForName[d.graphName];
if(!b){return YES}var e=b.findAnnotationByName(d.firstPoint).get("point");var h=b.findAnnotationByName(d.secondPoint).get("point");
var c=d.color?d.color:"#000000";var g;if(e.get("x")<h.get("x")){g=[e.get("id"),h.get("id")]
}else{g=[h.get("id"),e.get("id")]}var a=Smartgraphs.sessionController.createAnnotation(Smartgraphs.Arrow,d.arrowName,{point1:g[0],point2:g[1],color:c,isVertical:YES,isClockwise:YES});
return YES},createRunArrow:function(e,c){var a=Smartgraphs.GraphController.controllerForName[c.graphName];
if(!a){return YES}var d=a.findAnnotationByName(c.firstPoint).get("point");var h=a.findAnnotationByName(c.secondPoint).get("point");
var b=c.color?c.color:"#000000";var f;if(d.get("x")<h.get("x")){f=[d.get("id"),h.get("id")]
}else{f=[h.get("id"),d.get("id")]}var g=Smartgraphs.sessionController.createAnnotation(Smartgraphs.Arrow,c.arrowName,{point1:f[0],point2:f[1],color:b,isHorizontal:YES,isClockwise:YES});
return YES},createIndicatingArrowFromDataPoint:function(c,b){var a=Smartgraphs.sessionController.createAnnotation(Smartgraphs.IndicatingArrow,b.arrowName,{dataPoint:b.point.get("id"),pointAngle:b.angle,color:b.color});
return YES},createIndicatingArrowFromHighlightedPoint:function(d,c){var b;if(c.graphName){b=Smartgraphs.GraphController.controllerForName[c.graphName]
}else{if(c.tableName){b=Smartgraphs.TableController.controllerForName[c.tableName]
}}if(!b){return YES}var e=b.findAnnotationByName(c.point);var a=Smartgraphs.sessionController.createAnnotation(Smartgraphs.IndicatingArrow,c.arrowName,{annotation:e.get("id"),pointAngle:c.angle?c.angle:335,color:c.color?c.color:"#cc0000",length:c.length?c.length:40});
return YES},createIndicatingArrowFromCoordinates:function(c,b){var a=Smartgraphs.sessionController.createAnnotation(Smartgraphs.IndicatingArrow,b.arrowName,{specificX:b.x,specificY:b.y,pointAngle:b.angle?b.angle:335,color:b.color?b.color:"#cc0000",length:b.length?b.length:40});
return YES},createBracketArcFromCoordinates:function(c,a){var b=Smartgraphs.sessionController.createAnnotation(Smartgraphs.BracketArc,a.bracketName,{startX:a.startX,startY:a.startY,endX:a.endX,endY:a.endY,color:a.color?a.color:"#cc0000",isClockwise:false});
return YES},createRiseBracket:function(g,d){var c=Smartgraphs.TableController.controllerForDataset[d.tableName];
if(!c){return YES}var a=c.findAnnotationByName(d.point1);var h=c.findAnnotationByName(d.point2);
var b=c.get("dataset").get("points").indexOf(a.get("point"));var f=c.get("dataset").get("points").indexOf(h.get("point"));
var e=Smartgraphs.sessionController.createAnnotation(Smartgraphs.BracketArc,d.bracketName,{startX:310,startY:(b*20)+10,endX:310,endY:(f*20)+10,color:d.color?d.color:"#cc0000",isClockwise:(b<f)});
return YES},createRunBracket:function(g,d){var c=Smartgraphs.TableController.controllerForDataset[d.tableName];
if(!c){return YES}var a=c.findAnnotationByName(d.point1);var h=c.findAnnotationByName(d.point2);
var b=c.get("dataset").get("points").indexOf(a.get("point"));var f=c.get("dataset").get("points").indexOf(h.get("point"));
var e=Smartgraphs.sessionController.createAnnotation(Smartgraphs.BracketArc,d.bracketName,{startX:40,startY:(b*20)+10,endX:40,endY:(f*20)+10,color:d.color?d.color:"#cc0000",isClockwise:(b>f)});
return YES},toggleAnnotationHighlight:function(d,c){var b=Smartgraphs.GraphController.controllerForName[c.graphName];
if(!b){return YES}var a=b.findAnnotationByName(c.annotationName);if(a.get("isHighlighted")){a.set("isHighlighted",NO)
}else{a.set("isHighlighted",YES)}return YES}});Smartgraphs.ACTIVITY_STEP=SC.State.extend({enterState:function(){this.invokeLast(this.didEnterState)
},didEnterState:function(){Smartgraphs.activityStepController.begin()},exitState:function(){Smartgraphs.responseTemplateController.set("editingShouldBeEnabled",NO)
},initialSubstate:"ACTIVITY_STEP_DEFAULT",ACTIVITY_STEP_DEFAULT:SC.State.design(),SENSOR:SC.State.plugin("Smartgraphs.SENSOR"),FREEHAND_INPUT:SC.State.plugin("Smartgraphs.FREEHAND_INPUT"),INTERACTIVE_SELECTION:SC.State.plugin("Smartgraphs.INTERACTIVE_SELECTION"),setPaneConfig:function(b,a){Smartgraphs.activityViewController.setPaneConfig(a);
return YES},hidePane:function(b,a){Smartgraphs.activityViewController.hidePane(a);
return YES},showImage:function(b,a){return Smartgraphs.activityViewController.showImage(a.pane,a.path)
},showGraph:function(b,a){Smartgraphs.activityViewController.showGraph(a.pane,a.name);
return YES},showTable:function(b,a){Smartgraphs.activityViewController.showTable(a.pane,a.datasetName)
},waitForResponse:function(b,a){Smartgraphs.activityStepController.waitForResponse();
Smartgraphs.responseTemplateController.set("editingShouldBeEnabled",YES);return YES
},disableSubmission:function(){Smartgraphs.activityStepController.disableSubmission();
return YES},enableSubmission:function(){Smartgraphs.activityStepController.enableSubmission();
return YES},submitStep:function(){if(Smartgraphs.activityStepController.get("canSubmit")){this.gotoState("ACTIVITY_STEP_SUBMITTED")
}return YES},gotoNextPage:function(){this.submitStep();this.invokeLast(function(){Smartgraphs.statechart.sendAction("gotoNextPage")
})},createDataset:function(c,b){var d=Smartgraphs.sessionController.createDataset(b.datasetName);
if(b.graphName){var a=Smartgraphs.GraphController.controllerForName[b.graphName];
a.addDataset(d)}return YES},removeDataset:function(c,b){var a=Smartgraphs.GraphController.controllerForName[b.graphName];
a.removeDataset(b.datasetName);return YES},createAnnotation:function(d,c){var b=Smartgraphs.GraphController.controllerForName[c.graphName];
var a=Smartgraphs.sessionController.createAnnotation(c.type,c.name);b.addAnnotation(a);
return YES},addAnnotation:function(c,b){var a;if(b.graphName){a=Smartgraphs.GraphController.controllerForName[b.graphName]
}else{if(b.tableName){a=Smartgraphs.TableController.controllerForDataset[b.tableName]
}}a.addObjectByName(b.type,b.name);return YES},removeAnnotation:function(c,b){var a;
if(b.graphName){a=Smartgraphs.GraphController.controllerForName[b.graphName]}else{if(b.tableName){a=Smartgraphs.TableController.controllerForDataset[b.tableName]
}}a.removeAnnotation(b.name);return YES},startFreehandInput:function(c,b){this.createAnnotation(this,{graphName:b.graphName,type:Smartgraphs.FreehandSketch,name:b.annotationName});
var a=Smartgraphs.GraphController.controllerForName[b.graphName];if(Smartgraphs.freehandInputController.register(a,b.annotationName)){this.gotoState("FREEHAND_INPUT")
}return YES},startSensorInput:function(d,c){this.createDataset(this,{graphName:c.graphName,datasetName:c.datasetName});
var a=Smartgraphs.GraphController.controllerForName[c.graphName];var e=a&&a.findDatasetByName(c.datasetName);
if(!e){return YES}var b=a.getPath("axes.xMin");var g=a.getPath("axes.xMax");var f=Smartgraphs.activityViewController.paneForController(a);
if(Smartgraphs.sensorController.register(f,e,b,g)){this.gotoState("SENSOR")}return YES
},startInteractiveSelection:function(c,b){var f=Smartgraphs.GraphController.controllerForName[b.graphName];
var e=f&&f.findDatasetByName(b.datasetName);if(!e){return YES}var d=Smartgraphs.TableController.controllerForDataset[b.datasetName];
var a=Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint,b.annotationName,{color:b.color});
f.addAnnotation(a);if(d){d.addAnnotation(a)}Smartgraphs.interactiveSelectionController.set("annotation",a);
Smartgraphs.interactiveSelectionController.set("dataset",e);this.gotoState("INTERACTIVE_SELECTION");
return YES}});Smartgraphs.ACTIVITY_STEP_SUBMITTED=SC.State.extend({enterState:function(){var b=Smartgraphs.activityStepController.get("content");
Smartgraphs.activityStepController.handleSubmission();var a=Smartgraphs.activityStepController.get("content");
if(a===b&&b.get("isFinalStep")){this.gotoState("ACTIVITY_PAGE_DONE")}},exitState:function(){Smartgraphs.activityStepController.cleanup()
},gotoStep:function(b,a){var c=Smartgraphs.store.find(Smartgraphs.ActivityStep,a.stepId);
Smartgraphs.activityStepController.set("content",c);this.gotoState("ACTIVITY_STEP");
return YES},createHighlightedPointsFromSelection:function(c,a){var b=a.graphName;
a.dataset.get("selection").forEach(function(e){var d=Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint,a.highlightedPointName,{point:e})
});return YES},createHighlightedPointFromSelection:function(c,b){var a=Smartgraphs.GraphController.controllerForName[b.graphName];
var f=a&&a.findDatasetByName(b.datasetName);if(!f){return YES}var d=f.get("selection");
if(d.get("length")!==1){return YES}var e=d.firstObject();var g=Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint,b.highlightedPointName,{point:e.get("id")});
return YES},createLineThroughPointsFromHighlightedPointAndSelection:function(a,g){var e=Smartgraphs.GraphController.controllerForName[g.graphName];
var d=e&&e.findDatasetByName(g.datasetName);if(!d){return YES}var i=d.get("selection");
if(i.get("length")!==1){return YES}var f=i.firstObject();var b=e.findAnnotationByName(g.highlightedName);
var c=g.color?g.color:"#000000";var h=Smartgraphs.sessionController.createAnnotation(Smartgraphs.LineThroughPoints,g.lineName,{point1:b.get("point").get("id"),point2:f.get("id"),color:c});
return YES}});Smartgraphs.AUTHOR=SC.State.extend({enterState:function(){Smartgraphs.appWindowController.showAuthorView();
Smartgraphs.toolbarController.showRunButton();Smartgraphs.activityPagesController.set("shouldShowStepsInOutline",NO);
Smartgraphs.activityOutlineController.set("shouldSelectPageInOutline",YES);Smartgraphs.activityOutlineController.set("isSelectable",YES);
Smartgraphs.activityViewController.set("enableBackAndForward",YES)},exitState:function(){Smartgraphs.activityPagesController.set("shouldShowStepsInOutline",YES);
Smartgraphs.activityOutlineController.set("shouldSelectPageInOutline",NO);Smartgraphs.activityOutlineController.set("isSelectable",NO);
Smartgraphs.activityViewController.set("enableBackAndForward",NO)},openActivity:function(){Smartgraphs.loadingActivityController.set("openAuthorViewAfterLoading",YES);
return NO},runActivity:function(){Smartgraphs.loadingActivityController.set("openAuthorViewAfterLoading",NO);
this.gotoState("LOADING_ACTIVITY");return YES},gotoNextPage:function(){Smartgraphs.activityPagesController.selectNextPage()
},gotoPreviousPage:function(){Smartgraphs.activityPagesController.selectPreviousPage()
}});Smartgraphs.FREEHAND_INPUT=SC.State.extend({initialSubstate:"FREEHAND_INPUT_START",exitState:function(){Smartgraphs.freehandInputController.disableInput();
Smartgraphs.activityViewController.hideControls(Smartgraphs.freehandInputController.get("pane"))
},FREEHAND_INPUT_START:SC.State.design({enterState:function(){var a=Smartgraphs.freehandInputController.enableInput();
if(a){Smartgraphs.activityViewController.revealOnlyClearControl();Smartgraphs.activityViewController.showControls(Smartgraphs.freehandInputController.get("pane"));
this.gotoState("FREEHAND_INPUT_READY")}else{this.gotoState("ACTIVITY_STEP_DEFAULT")
}}}),FREEHAND_INPUT_READY:SC.State.design({enterState:function(){Smartgraphs.activityViewController.disableAllControls();
Smartgraphs.freehandInputController.startRecording()},exitState:function(){Smartgraphs.freehandInputController.stopRecording()
},freehandSketchCompleted:function(){this.gotoState("FREEHAND_INPUT_COMPLETED")}}),FREEHAND_INPUT_COMPLETED:SC.State.design({enterState:function(){Smartgraphs.freehandInputController.stopRecording();
Smartgraphs.activityViewController.highlightClearControl()},clearControlWasClicked:function(){return this.clearFreehandSketch()
},clearFreehandSketch:function(){Smartgraphs.freehandInputController.clearSketch();
this.gotoState("FREEHAND_INPUT_READY");return YES}}),startFreehandInput:function(){console.error("Attempted to startFreehandInput when in FREEHAND_INPUT state");
return YES}});Smartgraphs.INTERACTIVE_SELECTION=SC.State.extend({annotation:null,dataset:null,enterState:function(){Smartgraphs.statechart.sendAction("disableSubmission");
var a=Smartgraphs.interactiveSelectionController.get("dataset");this._oldIsSelectable=a.get("isSelectable");
a.set("isSelectable",NO)},exitState:function(){var a=Smartgraphs.interactiveSelectionController.get("dataset");
a.set("isSelectable",this._oldIsSelectable);Smartgraphs.interactiveSelectionController.set("dataset",null);
Smartgraphs.interactiveSelectionController.set("annotation",null)},dataPointSelected:function(b){var c=Smartgraphs.interactiveSelectionController.get("dataset");
var a=b.get("content");if(c&&a.get("dataset")===c){Smartgraphs.interactiveSelectionController.setPath("annotation.point",a);
Smartgraphs.statechart.sendAction("enableSubmission")}},startInteractiveSelection:function(){return YES
}});Smartgraphs.SENSOR=SC.State.extend({initialSubstate:"SENSOR_DEFAULT",enterState:function(){var a=Smartgraphs.sensorController.enableInput();
if(!a){this.gotoState("ACTIVITY_STEP_DEFAULT")}},exitState:function(){Smartgraphs.sensorController.disableInput();
Smartgraphs.activityViewController.hideControls()},sensorHasLoaded:function(){this.gotoState("SENSOR_LOADED");
return YES},waitForSensorToLoad:function(){this.gotoState("SENSOR_LOADING");return YES
},SENSOR_DEFAULT:SC.State.design(),SENSOR_LOADING:SC.State.design({enterState:function(){Smartgraphs.activityViewController.showSensorLoadingView(Smartgraphs.sensorController.get("pane"))
}}),SENSOR_LOADED:SC.State.design({enterState:function(){Smartgraphs.activityViewController.revealAllControls();
Smartgraphs.activityViewController.showControls(Smartgraphs.sensorController.get("pane"))
},initialSubstate:"SENSOR_READY",SENSOR_READY:SC.State.design({enterState:function(){Smartgraphs.activityViewController.highlightStartControl()
},startControlWasClicked:function(){return this.startSensor()},startSensor:function(){this.gotoState("SENSOR_RECORDING");
return YES}}),SENSOR_RECORDING:SC.State.design({enterState:function(){Smartgraphs.sensorController.startRecording();
Smartgraphs.activityViewController.highlightStopControl()},exitState:function(){Smartgraphs.sensorController.stopRecording()
},stopControlWasClicked:function(){return this.stopSensor()},stopSensor:function(){this.gotoState("SENSOR_STOPPED");
return YES}}),SENSOR_STOPPED:SC.State.design({enterState:function(){Smartgraphs.activityViewController.highlightClearControl()
},clearControlWasClicked:function(){return this.clearSensor()},clearSensor:function(){Smartgraphs.sensorController.clearRecordedData();
this.gotoState("SENSOR_READY");return YES}})})});Smartgraphs.AxisView=RaphaelViews.RaphaelView.extend({init:function(){if(this.get("type")==="x"){this.set("displayProperties","axes.xMin axes.xMax axes.xSteps axes.xLabel parentView.parentView.frame".w())
}else{this.set("displayProperties","axes.yMin axes.yMax axes.ySteps axes.yLabel parentView.parentView.frame".w())
}arguments.callee.base.apply(this,arguments)},render:function(a,b){if(!b){this.drawAxis();
this.drawLabel()}},didCreateLayer:function(){this._label=null;this.invokeLater(this.drawLabel);
this.invokeLater(this.drawAxis)},drawAxis:function(){if(this._axis){this._axis.remove()
}var i=this.get("axes");if(!i){return}var m=this.getPath("parentView.parentView.parentView.padding");
var c=this.getPath("parentView.parentView.frame");var b=c.x+m.left;var l=c.y+c.height-m.bottom;
var f=this.get("raphaelCanvas");if(f.canvas.style.display!=="block"){f.canvas.style.display="block"
}if(this.get("type")==="y"){var n=i.get("yMin");var d=i.get("yMax");var h=i.get("ySteps");
var k=c.height-m.top-m.bottom;this._axis=f.g.axis(b,l,k,n,d,h,1)}else{if(this.get("type")==="x"){var a=i.get("xMin");
var g=i.get("xMax");var e=i.get("xSteps");var j=c.width-m.left-m.right;this._axis=f.g.axis(b,l,j,a,g,e,0)
}}this._axis.all[0].attr({stroke:"#333333"});this._axis.all[1].attr({fill:"#333333"})
},drawLabel:function(){var e=this.getPath("parentView.parentView.parentView.padding");
var f=this.getPath("parentView.parentView.frame");var d=this.get("axes");if(!d){return
}var c,a,h,b;if(this.get("type")==="x"){c=d.get("xLabel");a=(e.left+f.width-e.right)/2;
h=f.height-15;b=0}else{c=d.get("yLabel");a=10;h=(e.top+f.height-e.bottom)/2;b=270
}if(this._label){this._label.attr({text:c,x:a,y:h})}else{var g=this.get("raphaelCanvas");
if(g.canvas.style.display!=="block"){g.canvas.style.display="block"}this._label=g.text(a,h,c).attr({font:"14px Arial, sans-serif",fill:"#333333"}).rotate(b)
}}});Smartgraphs.GraphView=SC.View.extend({axesBinding:"*graphController.axes",datasetListBinding:"*graphController.datasetList",annotationListBinding:"*graphController.annotationList",padding:{top:15,right:15,bottom:45,left:45},childViews:"titleView graphCanvasView".w(),init:function(){this._viewsByClassAndId={};
arguments.callee.base.apply(this,arguments)},viewDidResize:function(){arguments.callee.base.apply(this,arguments);
this.replaceLayer()},annotationListDidChange:function(){this._itemListsDidChange()
}.observes("*annotationList.[]"),datasetListDidChange:function(){this._itemListsDidChange()
}.observes("*datasetList.[]"),_itemListsDidChange:function(){var g=this.get("datasetList").concat(this.get("annotationList"));
var m,e,b;var h={};var f,a=["data","annotation"];for(var c=0;c<a.length;c++){f=a[c];
g=this.get(f==="data"?"datasetList":"annotationList");for(var d=0,l=g.get("length");
d<l;d++){m=g.objectAt(d);e=SC.guidFor(m.constructor);b=m.get("id");if(h[e]===undefined){h[e]={}
}h[e][b]=m;if(!this._viewsByClassAndId[e]||!this._viewsByClassAndId[e][b]){this._addViewForItem(m,f)
}}}var k;for(e in this._viewsByClassAndId){if(this._viewsByClassAndId.hasOwnProperty(e)){for(b in this._viewsByClassAndId[e]){if(this._viewsByClassAndId[e].hasOwnProperty(b)){k=this._viewsByClassAndId[e][b];
if(!h[e]||!h[e][b]){this._removeView(k)}}}}}},_addViewForItem:function(c,d){var b=SC.guidFor(c.constructor);
var a=c.constructor.viewClass.design({graphView:this,item:c,itemType:d}).create();
if(d==="data"){this.getPath("graphCanvasView.dataHolder").appendChild(a)}else{if(d==="annotation"){this.getPath("graphCanvasView.annotationsHolder").appendChild(a)
}}if(this._viewsByClassAndId[b]===undefined){this._viewsByClassAndId[b]={}}this._viewsByClassAndId[b][c.get("id")]=a
},_removeView:function(b){var c=b.get("item");var d=b.get("itemType");var a=SC.guidFor(c.constructor);
var e=c.get("id");delete this._viewsByClassAndId[a][e];if(d==="data"){this.getPath("graphCanvasView.dataHolder").removeChild(b)
}else{if(d==="annotation"){this.getPath("graphCanvasView.annotationsHolder").removeChild(b)
}}},coordinatesForPoint:function(l,j){var g=this.get("axes");if(!g){return undefined
}var b=g.get("xMin"),f=g.get("xMax"),n=g.get("yMin"),e=g.get("yMax");var d=this.get("frame");
var o=d.height,a=d.width;var k=this.get("padding");var i=a-k.left-k.right;var h=o-k.top-k.bottom;
var m=i/(f-b);var c=h/(e-n);return{x:k.left+(l-b)*m,y:k.top+h-(j-n)*c}},pointForCoordinates:function(l,j){var g=this.get("axes");
if(!g){return undefined}var b=g.get("xMin"),f=g.get("xMax"),n=g.get("yMin"),e=g.get("yMax");
var d=this.get("frame");var o=d.height,a=d.width;var k=this.get("padding");var i=a-k.left-k.right;
var h=o-k.top-k.bottom;var m=i/(f-b);var c=h/(e-n);return{x:b+(l-k.left)/m,y:n+(k.top+h-j)/c}
},titleView:SC.LabelView.design({valueBinding:".parentView*graphController.title",classNames:"pane-label",layout:{width:400,centerX:0,height:20,top:20,zIndex:1},textAlign:SC.ALIGN_CENTER}),graphCanvasView:RaphaelViews.RaphaelCanvasView.design({layout:{zIndex:0},axesBinding:".parentView.axes",displayProperties:"axes.xMin axes.xMax axes.yMin axes.yMax".w(),childViews:"axesView annotationsHolder dataHolder".w(),axesView:RaphaelViews.RaphaelView.design({axesBinding:".parentView.parentView.axes",paddingBinding:".parentView.parentView.padding",childViews:"inputArea xAxisView yAxisView".w(),inputArea:RaphaelViews.RaphaelView.design({axesBinding:".parentView.parentView.parentView*axes",didCreateLayer:function(){this._graphView=this.getPath("parentView.parentView.parentView");
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
}}),xAxisView:Smartgraphs.AxisView.design({axesBinding:".parentView.parentView.parentView.axes",type:"x"}),yAxisView:Smartgraphs.AxisView.design({axesBinding:".parentView.parentView.parentView.axes",type:"y"})}),annotationsHolder:RaphaelViews.RaphaelView.design({}),dataHolder:RaphaelViews.RaphaelView.design({})})});
Smartgraphs.GraphPane=SC.View.extend({childViews:"graphView controlsContainer".w(),graphView:Smartgraphs.GraphView.design({graphControllerBinding:".parentView.graphController"}),controlsContainer:SC.ContainerView.design({layout:{bottom:0,height:0}}),controlsNowShowingDidChange:function(){var c=this.get("controlsNowShowing");
var b=0,a=0;if(c){b=35;a=35}this.get("graphView").adjust("bottom",b);this.get("controlsContainer").adjust("height",a);
this.setPath("controlsContainer.nowShowing",c)}.observes("controlsNowShowing")});
Smartgraphs.ImageView=SC.View.extend({});Smartgraphs.ResponseTemplateView=SC.StaticContentView.extend({fieldTypes:[],fieldChoicesList:[],values:[],editingShouldBeEnabled:null,viewShouldReset:NO,isVisibleBinding:SC.Binding.bool(".fieldTypes"),viewShouldResetDidChange:function(){if(this.get("viewShouldReset")){this.invokeOnce(this.resetView)
}}.observes("viewShouldReset"),resetView:function(){this.clearChildViews();this.addChildViews();
this.set("viewShouldReset",NO)},clearChildViews:function(){this._firstInputFieldView=null;
this.get("childViews").invoke("destroy")},addChildViews:function(){var e=this.get("fieldTypes");
if(!e){return}var c=this.get("fieldChoicesList");var b=this.get("values");var a;for(var d=0,f=e.get("length");
d<f;d++){a=e.objectAt(d);this.addChildView(a,c.objectAt(d),b.objectAt(d),d);if(d===0&&(a==="numeric"||a==="textarea")){this._firstInputFieldView=this.get("childViews").objectAt(0).get("childViews").objectAt(0);
this.invokeLater(this._beginEditingFirstView)}}},addChildView:function(d,b,a,e){var c;
switch(d){case"textarea":c=this.wrap(this.makeTextAreaDesign(a,e),{height:97});break;
case"numeric":c=this.wrap(this.makeNumericFieldDesign(a,e),{height:22,width:100});
break;case"multiplechoice":c=this.makeMultipleChoiceView(b,a,e);break;default:throw"ResponseTemplateView received unexpected field type string '"+d+"'."
}this.appendChild(c)},wrap:function(b,a){return SC.View.design({useStaticLayout:YES,layout:a,classNames:"text-field-view-wrapper".w(),childViews:[b]}).create()
},makeTextAreaDesign:function(a,b){return SC.TextFieldView.design({isTextArea:YES,hint:"Enter your answer here...",fieldIndex:b,value:a,isEnabledBinding:".parentView.parentView.editingShouldBeEnabled",valueDidChange:function(){var c=this.getPath("parentView.parentView.values");
if(c){c.replace(this.get("fieldIndex"),1,this.get("value"))}}.observes("value")})
},makeNumericFieldDesign:function(a,b){return SC.TextFieldView.design({isTextArea:NO,fieldIndex:b,value:a,isEnabledBinding:".parentView.parentView.editingShouldBeEnabled",valueDidChange:function(){var c=this.getPath("parentView.parentView.values");
if(c){c.replace(this.get("fieldIndex"),1,this.get("value"))}}.observes("value")})
},makeMultipleChoiceView:function(b,a,d){var c=[];c=b.reduce(function(g,f,e){return g.concat({title:f,index:e+1})
},[]);return SC.RadioView.design({items:c,itemTitleKey:"title",itemValueKey:"index",fieldIndex:d,value:a,isEnabledBinding:".parentView.editingShouldBeEnabled",useStaticLayout:YES,valueDidChange:function(){var e=this.getPath("parentView.values");
if(e){e.replace(this.get("fieldIndex"),1,this.get("value"))}}.observes("value")}).create()
},_beginEditingFirstView:function(){if(this._firstInputFieldView){this._firstInputFieldView.beginEditing()
}}});Smartgraphs.TableItemView=SC.ListItemView.extend({displayProperties:["backgroundColor"],classNames:"table-item-view",backgroundColorBinding:".content.backgroundColor"});
sc_require("views/table_item");Smartgraphs.TableView=SC.View.extend({showTableBinding:"*tableController.showTable",showLabelsBinding:"*tableController.showLabels",datasetBinding:"*tableController.dataset",xLabelBinding:"*tableController.axes.xLabelAbbreviated",yLabelBinding:"*tableController.axes.yLabelAbbreviated",latestXBinding:"*tableController.latestX",latestYBinding:"*tableController.latestY",annotationListBinding:"*tableController.annotationList",init:function(){this._viewsByClassAndId={};
arguments.callee.base.apply(this,arguments)},fix:function(a,b){return(a===undefined||a===null)?null:a.toFixed(b)
},numericX:function(){return this.fix(this.get("latestX"),1)}.property("latestX").cacheable(),numericY:function(){return this.fix(this.get("latestY"),2)
}.property("latestY").cacheable(),layout:{top:10,bottom:10},childViews:["numericView","tableColumnView"],numericView:SC.View.design({layout:{width:300,centerX:-10,height:90,centerY:-10},childViews:["xs","ys"],xs:SC.View.design({layout:{left:0,width:100},childViews:["xLabel","xValue"],xLabel:SC.LabelView.design({classNames:["smartgraph-numeric-view-label"],layout:{top:0,height:25},textAlign:SC.ALIGN_RIGHT,valueBinding:".parentView.parentView.parentView.xLabel"}),xValue:SC.LabelView.design({classNames:["smartgraph-numeric-view-value"],layout:{top:40},textAlign:SC.ALIGN_RIGHT,valueBinding:".parentView.parentView.parentView.numericX"})}),ys:SC.View.design({layout:{right:0,width:120},childViews:["yLabel","yValue"],yLabel:SC.LabelView.design({classNames:["smartgraph-numeric-view-label"],layout:{top:0,height:25},textAlign:SC.ALIGN_RIGHT,valueBinding:".parentView.parentView.parentView.yLabel"}),yValue:SC.LabelView.design({classNames:["smartgraph-numeric-view-value"],layout:{top:40},textAlign:SC.ALIGN_RIGHT,valueBinding:".parentView.parentView.parentView.numericY"})})}),tableColumnView:SC.View.design({layout:{width:350,centerX:0},childViews:["labelsView","scrollView"],labelsView:SC.View.design({isVisibleBinding:".parentView.parentView.showLabels",layout:{left:0,top:0,width:350,height:30},classNames:["smartgraph-table"],childViews:["xsLabel","ysLabel"],xsLabel:SC.LabelView.design({layout:{left:50,top:0,width:120,height:25},valueBinding:".parentView.parentView.parentView.xLabel"}),ysLabel:SC.LabelView.design({layout:{right:50,top:0,width:120,height:25},valueBinding:".parentView.parentView.parentView.yLabel"})}),scrollView:SC.ScrollView.design({layout:{left:0,top:35,width:350},borderStyle:SC.BORDER_NONE,contentView:SC.View.design({classNames:["smartgraph-table"],rowHeight:20,contentBinding:".parentView.parentView.parentView.parentView*tableController.arrangedObjects",selectionBinding:".parentView.parentView.parentView.parentView*tableController.selection",contentLengthBinding:".content.length",annotationsListBinding:".parentView.parentView.parentView.parentView*tableController.annotationsList",contentLengthDidChange:function(){this.adjust("height",this.get("contentLength")*this.get("rowHeight"))
}.observes("contentLength"),childViews:["backdrop","xsView","ysView"],backdrop:RaphaelViews.RaphaelCanvasView.design({layout:{zIndex:0,width:350},childViews:"annotationsHolder".w(),annotationsHolder:RaphaelViews.RaphaelView.design({})}),xsView:SC.ListView.design({layout:{left:50,top:0,width:120},rowHeightBinding:".parentView.rowHeight",canEditContent:NO,contentValueKey:"xRounded",contentBinding:".parentView.content",selectionBinding:".parentView.selection",exampleView:Smartgraphs.TableItemView}),ysView:SC.ListView.design({layout:{left:180,top:0,width:120},rowHeightBinding:".parentView.rowHeight",canEditContent:NO,contentValueKey:"yRounded",contentBinding:".parentView.content",selectionBinding:".parentView.selection",exampleView:Smartgraphs.TableItemView})})})}),datasetDidChange:function(){this.invokeOnce("adjustViews")
}.observes("dataset"),showTableDidChange:function(){this.invokeOnce("adjustViews")
}.observes("showTable"),annotationListDidChange:function(){var g=this.get("annotationList");
var f,b,h;var a={};for(var d=0,e=g.get("length");d<e;d++){f=g.objectAt(d);b=SC.guidFor(f.constructor);
h=f.get("id");if(a[b]===undefined){a[b]={}}a[b][h]=f;if(!this._viewsByClassAndId[b]||!this._viewsByClassAndId[b][h]){this._addViewForItemToBackdrop(f,"annotation")
}}var c;for(b in this._viewsByClassAndId){if(this._viewsByClassAndId.hasOwnProperty(b)){for(h in this._viewsByClassAndId[b]){if(this._viewsByClassAndId[b].hasOwnProperty(h)){c=this._viewsByClassAndId[b][h];
if(!a[b]||!a[b][h]){this._removeViewFromBackdrop(c)}}}}}}.observes("*annotationList.[]"),adjustViews:function(){var b=this.get("tableColumnView");
var a=b.get("scrollView");var d=a.get("contentView");var c=this.get("numericView");
if(this.get("showTable")){c.set("isVisible",NO);d.bindings.forEach(function(e){e.connect()
});b.set("isVisible",YES);this.invokeLast(function(){d.adjust("height",d.getPath("content.length")*d.get("rowHeight"))
})}else{c.set("isVisible",YES);d.bindings.forEach(function(e){e.disconnect()});b.set("isVisible",NO)
}},_addViewForItemToBackdrop:function(c,d){var b=SC.guidFor(c.constructor);var a=c.constructor.viewClass.design({item:c,itemType:d}).create();
if(a.get("canShowInTable")){this.getPath("tableColumnView.scrollView.contentView.backdrop.annotationsHolder").appendChild(a);
if(this._viewsByClassAndId[b]===undefined){this._viewsByClassAndId[b]={}}this._viewsByClassAndId[b][c.get("id")]=a
}},_removeViewFromBackdrop:function(b){var c=b.get("item");var d=b.get("itemType");
var a=SC.guidFor(c.constructor);var e=c.get("id");delete this._viewsByClassAndId[a][e];
this.getPath("tableColumnView.scrollView.contentView.backdrop.annotationsHolder").removeChild(b)
}});Smartgraphs.mainPage=SC.Page.design({mainPane:SC.MainPane.design({theme:"pig",defaultResponder:"Smartgraphs.statechart",childViews:"topToolbar container bottomToolbar".w(),topToolbar:SC.ToolbarView.design({anchorLocation:SC.ANCHOR_TOP,childViews:["title","editButton","runButton"],title:SC.LabelView.design({layout:{centerY:0,height:24,left:8,width:400},controlSize:SC.LARGE_CONTROL_SIZE,fontWeight:SC.BOLD_WEIGHT,valueBinding:"Smartgraphs.activityController.title"}),editButton:SC.ButtonView.design({layout:{right:20,centerY:0,height:24,width:80},isVisibleBinding:"Smartgraphs.toolbarController.shouldShowEditButton",title:"Edit",action:"openAuthorView"}),runButton:SC.ButtonView.design({layout:{right:20,centerY:0,height:24,width:80},isVisibleBinding:"Smartgraphs.toolbarController.shouldShowRunButton",title:"Run",action:"runActivity"})}),container:SC.SplitView.design({layout:{top:32,bottom:33,minWidth:960,minHeight:536},defaultThickness:200,topLeftMaxThickness:300,layoutDirection:SC.LAYOUT_HORIZONTAL,topLeftView:SC.ScrollView.design({classNames:["desk"],contentView:SC.SourceListView.design({classNames:["desk"],contentBinding:"Smartgraphs.activityOutlineController.arrangedObjects",contentValueKey:"title",selectionBinding:"Smartgraphs.activityOutlineController.selection",isSelectableBinding:"Smartgraphs.activityOutlineController.isSelectable"})}),dividerView:SC.SplitDividerView,bottomRightView:SC.ContainerView.design({nowShowingBinding:"Smartgraphs.appWindowController.viewToShow"}),shouldShowOutlineBinding:"Smartgraphs.appWindowController.shouldShowOutline",shouldShowOutlineDidChange:function(){if(this.get("shouldShowOutline")){this.setPath("topLeftView.isVisible",YES);
this.setPath("dividerView.isVisible",YES);this.updateChildLayout()}else{this.setPath("topLeftView.isVisible",NO);
this.setPath("dividerView.isVisible",NO);this.get("bottomRightView").adjust("left",0)
}}.observes("shouldShowOutline")}),bottomToolbar:SC.ToolbarView.design({anchorLocation:SC.ANCHOR_BOTTOM,childViews:["backButton","pageButtons","nextButton"],backButton:SC.ButtonView.design({layout:{left:20,centerY:0,height:24,width:80},title:"Back",theme:"capsule",action:"gotoPreviousPage",isSwipeLeft:YES,isEnabledBinding:"Smartgraphs.activityViewController.enableBackPageButton"}),pageButtons:SC.SegmentedView.design({layout:{left:120,right:120,height:24,centerY:0},classNames:["sc-regular-size"],itemsBinding:"Smartgraphs.activityPagesController",itemTitleKey:"pageNumberAsString",itemValueKey:"pageNumber",valueBinding:"Smartgraphs.activityPagesController.currentPageNumber"}),nextButton:SC.ButtonView.design({layout:{right:20,centerY:0,height:24,width:80},title:"Next",theme:"capsule",action:"gotoNextPage",isSwipeRight:YES,isVisibleBinding:"Smartgraphs.activityViewController.showNextPageButton",isEnabledBinding:"Smartgraphs.activityViewController.enableNextPageButton",isDefaultBinding:"Smartgraphs.activityViewController.highlightNextPageButton"})})}),loadingView:SC.View.design({classNames:"smartgraph-pane".w(),childViews:"loadingIconView loadingMessageView".w(),loadingIconView:SC.ImageView.design({layout:{width:48,height:48,centerX:0,centerY:-39},value:"/static/smartgraphs/en/222b45eb63c363b2fa85875220fc3936b23b3c3a/resources/pane_loading.gif"}),loadingMessageView:SC.LabelView.design({classNames:"loading".w(),layout:{width:200,height:24,centerX:0,centerY:15},textAlign:SC.ALIGN_CENTER,valueBinding:"Smartgraphs.appWindowController.loadingMessage"})})});
sc_require("resources/main_page");Smartgraphs.activityPageDef=SC.Page.extend({activityView:SC.View.design({childViews:"instructionsWrapper dataWrapper".w(),theme:"sc-ace",loadingMessage:"Loading Activity...",instructionsWrapper:SC.View.design({layout:{left:0,width:0.45},childViews:"instructionsView".w(),instructionsView:SC.View.design({classNames:"smartgraph-pane",childViews:"textWrapper".w(),textWrapper:SC.View.design({layout:{top:20,right:20,left:20},classNames:"text-wrapper".w(),childViews:"introText activityStepWrapper".w(),introText:SC.StaticContentView.design({contentBinding:"Smartgraphs.activityPageController.introText",isVisibleBinding:SC.Binding.bool("Smartgraphs.activityPageController.introText")}),activityStepWrapper:SC.View.design({useStaticLayout:YES,childViews:"activityStepDialog buttonsView".w(),activityStepDialog:SC.View.design({useStaticLayout:YES,isVisibleBinding:"Smartgraphs.activityStepController.dialogTextHasContent",childViews:"beforeText responseTemplate afterText".w(),classNames:"dialog-text".w(),beforeText:SC.StaticContentView.design({contentBinding:"Smartgraphs.activityStepController.beforeText",isVisibleBinding:SC.Binding.bool("Smartgraphs.activityStepController.beforeText")}),responseTemplate:Smartgraphs.ResponseTemplateView.design({fieldTypesBinding:"Smartgraphs.responseTemplateController.fieldTypes",fieldChoicesListBinding:"Smartgraphs.responseTemplateController.fieldChoicesList",valuesBinding:"Smartgraphs.responseTemplateController.values",editingShouldBeEnabledBinding:"Smartgraphs.responseTemplateController.editingShouldBeEnabled",viewShouldResetBinding:"Smartgraphs.responseTemplateController.viewShouldReset"}),afterText:SC.StaticContentView.design({contentBinding:"Smartgraphs.activityStepController.afterText",isVisibleBinding:SC.Binding.bool("Smartgraphs.activityStepController.afterText")})}),buttonsView:SC.View.design({useStaticLayout:YES,layout:{height:24},childViews:"submitButton".w(),submitButton:SC.ButtonView.design({layout:{width:180,right:0},titleBinding:"Smartgraphs.activityStepController.submitButtonTitle",isVisibleBinding:"Smartgraphs.activityViewController.showSubmitButton",isEnabledBinding:"Smartgraphs.activityViewController.enableSubmitButton",isDefaultBinding:"Smartgraphs.activityViewController.enableSubmitButton",action:"submitStep",titleDidChange:function(){var a=SC.metricsForString(this.get("title"),"label",["sc-button-label","text-wrapper"]);
this.adjust("width",a.width+48)}.observes("title")})})})})})}),dataWrapper:SC.View.design({layout:{right:0,width:0.55},childViews:"dataView".w(),dataView:SC.ContainerView.design({layout:{top:4,right:4,bottom:4,left:4},nowShowingBinding:"Smartgraphs.activityViewController.dataViewNowShowing"})})}),singlePaneDataView:SC.ContainerView.design({classNames:"smartgraph-pane",nowShowingBinding:"Smartgraphs.activityViewController.singlePaneNowShowing"}),splitPaneDataView:SC.View.design({childViews:"topPaneWrapper bottomPaneWrapper".w(),topPaneWrapper:SC.View.design({layout:{top:0,height:0.5},childViews:"topPane".w(),topPane:SC.ContainerView.design({layout:{bottom:2},classNames:"smartgraph-pane",nowShowingBinding:"Smartgraphs.activityViewController.topPaneNowShowing"})}),bottomPaneWrapper:SC.View.design({layout:{bottom:0,height:0.5},childViews:"bottomPane".w(),bottomPane:SC.ContainerView.design({layout:{top:2},classNames:"smartgraph-pane",nowShowingBinding:"Smartgraphs.activityViewController.bottomPaneNowShowing"})})}),firstImageView:SC.ImageView.design({useStaticLayout:YES,valueBinding:"Smartgraphs.activityViewController.firstImageValue",layout:{width:0.9999999,height:0.9999999}}),secondImageView:SC.ImageView.design({useStaticLayout:YES,valueBinding:"Smartgraphs.activityViewController.secondImageValue",layout:{width:0.9999999,height:0.9999999}}),firstGraphPane:Smartgraphs.GraphPane.design({graphControllerBinding:"Smartgraphs.firstGraphController",controlsNowShowingBinding:"Smartgraphs.activityViewController.firstGraphPaneControls"}),secondGraphPane:Smartgraphs.GraphPane.design({graphControllerBinding:"Smartgraphs.secondGraphController",controlsNowShowingBinding:"Smartgraphs.activityViewController.secondGraphPaneControls"}),firstTableView:Smartgraphs.TableView.design({tableControllerBinding:"Smartgraphs.firstTableController"}),secondTableView:Smartgraphs.TableView.design({tableControllerBinding:"Smartgraphs.secondTableController"}),errorLoadingActivityView:SC.View.design({classNames:"smartgraph-pane",childViews:"errorMessage".w(),errorMessage:SC.LabelView.design({layout:{height:32,width:500,centerX:0,centerY:0},classNames:"error",textAlign:SC.ALIGN_CENTER,value:"There was an error loading that Activity."})}),graphControlsView:SC.View.design({layout:{height:35},childViews:"startControl stopControl clearControl".w(),startControl:SC.ButtonView.design({layout:{centerX:-110,bottom:10,width:80,height:24},isVisibleBinding:"Smartgraphs.activityViewController.startControlIsVisible",isEnabledBinding:"Smartgraphs.activityViewController.startControlIsEnabled",isDefaultBinding:"Smartgraphs.activityViewController.startControlIsDefault",title:"Start",action:"startControlWasClicked"}),stopControl:SC.ButtonView.design({layout:{centerX:0,bottom:10,width:80,height:24},isVisibleBinding:"Smartgraphs.activityViewController.stopControlIsVisible",isEnabledBinding:"Smartgraphs.activityViewController.stopControlIsEnabled",isDefaultBinding:"Smartgraphs.activityViewController.stopControlIsDefault",title:"Stop",action:"stopControlWasClicked"}),clearControl:SC.ButtonView.design({layout:{centerX:110,bottom:10,width:80,height:24},isVisibleBinding:"Smartgraphs.activityViewController.clearControlIsVisible",isEnabledBinding:"Smartgraphs.activityViewController.clearControlIsEnabled",isDefaultBinding:"Smartgraphs.activityViewController.clearControlIsDefault",title:"Clear",action:"clearControlWasClicked"})}),sensorLoadingView:SC.LabelView.design({layout:{height:35,width:250,centerX:0},classNames:"sensor-message".w(),textAlign:SC.ALIGN_CENTER,value:"Loading sensor..."})});
Smartgraphs.activityPage=Smartgraphs.activityPageDef.design();Smartgraphs.appletPage=SC.Page.design({sensorAppletView:CC.SensorAppletView.design({layout:{width:1,height:1},listenerPath:"Smartgraphs.sensorController"})});
sc_require("resources/main_page");Smartgraphs.authorPageDef=SC.Page.extend({authorView:SC.View.design({childViews:["instructionsWrapper","dataWrapper"],theme:"sc-ace",instructionsWrapper:SC.View.design({layout:{left:0,width:0.45},childViews:"instructionsView".w(),instructionsView:SC.View.design({classNames:"smartgraph-pane",childViews:"textWrapper".w(),textWrapper:SC.View.design({layout:{top:20,right:20,left:20},classNames:"text-wrapper".w(),childViews:"introTextView introTextHintView".w(),minEditorHeight:100,introTextView:SC.LabelView.design({valueBinding:"Smartgraphs.activityPageController.introText",useStaticLayout:YES,escapeHTML:NO,isEditable:YES,isInlineEditorMultiline:YES,minEditorHeightBinding:".parentView.minEditorHeight",showEditor:NO,showEditorDidChange:function(){if(this.get("showEditor")){this.beginEditing()
}}.observes("showEditor"),beginEditing:function(){if(this.get("frame").height<this.get("minEditorHeight")){SC.RunLoop.begin();
this.adjust("height",this.get("minEditorHeight"));SC.RunLoop.end()}arguments.callee.base.apply(this,arguments)
},inlineEditorDidEndEditing:function(){arguments.callee.base.apply(this,arguments);
this.set("showEditor",NO);this.set("layout",{})},mouseEntered:function(){if(this.get("frame").height<this.get("minEditorHeight")){this.adjust("height",this.get("minEditorHeight"))
}this.$().addClass("hovered")},mouseExited:function(){this.$().removeClass("hovered");
this.set("layout",{})},mouseDown:function(){this.beginEditing()}}),introTextHintView:SC.LabelView.design({value:"<p>Introduce Page Here...</p>",classNames:"hint".w(),escapeHTML:NO,showEditorBinding:SC.Binding.oneWay(".parentView.introTextView.showEditor"),introTextIsEmptyBinding:SC.Binding.not("Smartgraphs.activityPageController.introText"),isVisible:function(){return this.get("introTextIsEmpty")&&!this.get("showEditor")
}.property("introTextIsEmpty","showEditor").cacheable(),minEditorHeightBinding:".parentView.minEditorHeight",didUpdateLayer:function(){this.invokeLast(function(){this.set("originalHeight",this.$("p").outerHeight(true));
this.adjust("height",this.get("originalHeight"))})},mouseDown:function(){this.adjust("height",this.get("originalHeight"));
this.setPath("parentView.introTextView.showEditor",YES)},mouseEntered:function(){this.adjust("height",this.get("minEditorHeight"));
this.$().addClass("hovered")},mouseExited:function(){this.$().removeClass("hovered");
this.adjust("height",this.get("originalHeight"))}})})})}),dataWrapper:SC.View.design({layout:{right:0,width:0.55},childViews:"dataView".w(),dataView:SC.View.design({layout:{top:4,right:4,bottom:4,left:4}})})})});
Smartgraphs.authorPage=Smartgraphs.authorPageDef.design();Smartgraphs.main=function main(){Smartgraphs.dataSource=Smartgraphs.CouchDataSource.create();
Smartgraphs.store=SC.Store.create().from(Smartgraphs.dataSource);Smartgraphs.getPath("mainPage.mainPane").append();
if(!window.location.hash){window.location.hash="/shared/marias-run"}window.onbeforeunload=function(){return"You will lose your place in the activity if you leave this page."
};Smartgraphs.statechart.initStatechart()};function main(){Smartgraphs.main()};