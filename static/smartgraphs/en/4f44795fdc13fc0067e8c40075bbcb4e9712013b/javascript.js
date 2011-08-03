(function(){var a="pig";if(!SC.BUNDLE_INFO){throw"SC.BUNDLE_INFO is not defined!"
}if(SC.BUNDLE_INFO[a]){return}SC.BUNDLE_INFO[a]={requires:["sproutcore/ace"],styles:["/static/pig/en/aaa2036d9820bacbc85107807851544740ec501b/stylesheet-packed.css","/static/pig/en/aaa2036d9820bacbc85107807851544740ec501b/stylesheet.css"],scripts:["/static/pig/en/aaa2036d9820bacbc85107807851544740ec501b/javascript-packed.js","/static/pig/en/aaa2036d9820bacbc85107807851544740ec501b/javascript.js"]}
})();Smartgraphs=SC.Application.create({NAMESPACE:"Smartgraphs",VERSION:"0.1.0",DATA_FORMAT_VERSION:2,triggers:[],_nextGuid:1000,getNextGuid:function(){return this._nextGuid++
},trace:NO,logDataSource:NO});SC.CONTEXT_MENU_ENABLED=YES;Smartgraphs.activityJson=Smartgraphs.activityJson||{};
Smartgraphs.activityJson["/shared/boiling-water"]={_rev:"34-22527fd9d5e7795fc94b780e1134a460",data_format_version:2,activity:{title:"Boiling Water",url:"/shared/boiling-water",owner:"shared",pages:["/shared/boiling-water/page/1","/shared/boiling-water/page/2","/shared/boiling-water/page/3","/shared/boiling-water/page/4","/shared/boiling-water/page/5","/shared/boiling-water/page/6"],pageListUrl:"/shared/boiling-water/pages"},pages:[{steps:["/shared/boiling-water/page/1/step/1"],name:"Introduction",firstStep:"/shared/boiling-water/page/1/step/1",introText:"<h1>SmartGraphs</h1><p>The SmartGraphs project is developing <i>open source, browser-based</i> activities that help students learn the meaning of graphs. </p><p> Activities run directly in a modern Web browser such as Firefox.  Programming is done in Javascript using the Sproutcore framework.  This demo does not use Java or Flash.</p><p>Click the <b>Next</b> button for a demo.<p>",url:"/shared/boiling-water/page/1",activity:"/shared/boiling-water",index:1,stepListUrl:"/shared/boiling-water/page/1/steps"},{steps:["/shared/boiling-water/page/2/step/1"],name:"Boiling Point Prediction",firstStep:"/shared/boiling-water/page/2/step/1",introText:"<h1>Boiling Water</h1><p>Water is being heated on a stove.  A thermometer placed in the water reads 90 degrees Celsius (&deg;C).  After 5 minutes the water begins to boil and the thermometer reads 100&deg;C.  The water continues boiling for 5 more minutes.</p><p>At the top right, use your mouse to sketch a graph of the temperature for a period of 10 minutes, starting when the temperature measured 90&deg;C.</p><p>When you are done click <b>Next</b>.</p>",url:"/shared/boiling-water/page/2",activity:"/shared/boiling-water",index:2,stepListUrl:"/shared/boiling-water/page/2/steps"},{steps:["/shared/boiling-water/page/3/step/1"],name:"Boiling Point Actual",firstStep:"/shared/boiling-water/page/3/step/1",introText:"<h1>Boiling Water</h1><p>The graph at the top right shows the actual temperature of the water each minute for 10 minutes.  The graph at the bottom right is your prediction.</p><p>How well does your prediction match the actual graph?</p>",url:"/shared/boiling-water/page/3",activity:"/shared/boiling-water",index:3,stepListUrl:"/shared/boiling-water/page/3/steps"},{steps:["/shared/boiling-water/page/4/step/1","/shared/boiling-water/page/4/step/2","/shared/boiling-water/page/4/step/3","/shared/boiling-water/page/4/step/4"],name:"Find Point",firstStep:"/shared/boiling-water/page/4/step/1",introText:"<h1>Boiling Water</h1><p>Click on the graph or the table, at a time one minute or more after the water had started to boil.  When you are done click <b>Check Answer</b>.</p>",url:"/shared/boiling-water/page/4",activity:"/shared/boiling-water",index:4,stepListUrl:"/shared/boiling-water/page/4/steps"},{steps:["/shared/boiling-water/page/5/step/1","/shared/boiling-water/page/5/step/2","/shared/boiling-water/page/5/step/3","/shared/boiling-water/page/5/step/4"],name:"Multiple Choice",firstStep:"/shared/boiling-water/page/5/step/1",introText:"<p>Why did the temperature remain the same from 5 minutes to 10 minutes even though the stove was still heating the pot and the water?</p>",url:"/shared/boiling-water/page/5",activity:"/shared/boiling-water",index:5,stepListUrl:"/shared/boiling-water/page/5/steps"},{steps:["/shared/boiling-water/page/6/step/1"],name:"End",firstStep:"/shared/boiling-water/page/6/step/1",introText:'<h1>SmartGraphs</h1><p>Thank you for trying this demo.</p><p>Although much has been accomplished since we began SmartGraphs about a year ago, there is lots more development and testing to be done!</p><p>We hope you will return to the Concord Consortium\'s <a href="http://www.concord.org/projects/smartgraphs">SmartGraphs website</a> in a few months to look at what is new.</p><p></p><p>November 2010</p>',url:"/shared/boiling-water/page/6",activity:"/shared/boiling-water",index:6,stepListUrl:"/shared/boiling-water/page/6/steps"}],steps:[{url:"/shared/boiling-water/page/1/step/1",activityPage:"/shared/boiling-water/page/1",paneConfig:"single",panes:{single:{type:"html",html:'<div style="width: 440px; margin: 0 auto"><img src="/static/smartgraphs/en/current/resources/images/smart-graphs-100.png" style="position: relative; top: 60px; left: 10px"><div style="position: relative; top: -40px; left: 120px;"><h1 style="font-size: 48px; margin: 0">SmartGraphs</h1><p style="margin: 5px 2px; font-size: 18px">A project of the Concord Consortium</p></div></div><div style="position: absolute; bottom: 0"><img src="/static/smartgraphs/en/current/resources/images/nsf-flat-logo.jpg" style="position: absolute; left: 10px; bottom: 20px; width: 100px; height: 100px"><p style="float: right; margin: 0 10px 20px 120px; font-size: 14px; font-style: italic">This material is based upon work supported by the National Science Foundation under Grant No. DRL-0918522. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the National Science Foundation.</p></div>'}},beforeText:"",responseTemplate:null,afterText:"",startCommands:[],shouldFinishImmediately:true,shouldWaitForSubmissibleResponse:false,submissibilityInspector:null,submissibilityCriterion:null,triggeredCommands:[],afterSubmissionCommands:[],responseInspector:null,responseBranches:[],defaultBranch:null,isFinalStep:true,shouldAutoAdvancePage:false,hideSubmitButton:true,submitButtonTitle:"",nextButtonShouldSubmit:false},{url:"/shared/boiling-water/page/2/step/1",activityPage:"/shared/boiling-water/page/2",paneConfig:"split",panes:{top:{type:"graph",name:"freehand-boiling-point"},bottom:null},beforeText:"",responseTemplate:null,afterText:"",startCommands:[{action:"startFreehandInput",literalArgs:{graphName:"freehand-boiling-point",annotationName:"prediction"}}],shouldFinishImmediately:false,shouldWaitForSubmissibleResponse:true,submissibilityInspector:{type:"Smartgraphs.SketchLengthInspector",config:{annotationName:"prediction",check:"continuously"}},submissibilityCriterion:{gt:["value",6]},triggeredCommands:[],afterSubmissionCommands:[],responseInspector:null,responseBranches:[],defaultBranch:null,isFinalStep:true,shouldAutoAdvancePage:false,hideSubmitButton:false,submitButtonTitle:"",nextButtonShouldSubmit:true},{url:"/shared/boiling-water/page/3/step/1",activityPage:"/shared/boiling-water/page/3",paneConfig:"split",panes:{top:{type:"graph",name:"correct-boiling-point-with-connected-dots",datasetName:"correct-boiling-point"},bottom:{type:"graph",name:"predicted-boiling-point"}},beforeText:"",responseTemplate:"/components/response-template/open",afterText:"",startCommands:[],shouldFinishImmediately:false,shouldWaitForSubmissibleResponse:true,submissibilityInspector:{type:"Smartgraphs.FirstResponseFieldInspector"},submissibilityCriterion:{gt:[{length:{strip:"value"}},0]},triggeredCommands:[],afterSubmissionCommands:[],responseInspector:null,responseBranches:[],defaultBranch:null,isFinalStep:true,shouldAutoAdvancePage:false,hideSubmitButton:true,submitButtonTitle:"",nextButtonShouldSubmit:true},{url:"/shared/boiling-water/page/4/step/1",activityPage:"/shared/boiling-water/page/4",paneConfig:"split",panes:{top:{type:"graph",name:"correct-boiling-point",datasetName:"correct-boiling-point"},bottom:{type:"table",graphName:"correct-boiling-point",datasetName:"correct-boiling-point"}},beforeText:"<p>(For the demonstration, try entering an incorrect answer first.)</p>",responseTemplate:null,afterText:"",startCommands:[],shouldFinishImmediately:false,shouldWaitForSubmissibleResponse:true,submissibilityInspector:{type:"Smartgraphs.SelectedPointInspector",config:{graphName:"correct-boiling-point",datasetName:"correct-boiling-point"}},submissibilityCriterion:{notempty:"value"},triggeredCommands:[],afterSubmissionCommands:[],responseInspector:{type:"Smartgraphs.SelectedPointInspector",config:{graphName:"correct-boiling-point",datasetName:"correct-boiling-point"}},responseBranches:[{criterion:{"in":[{xvalue:"value"},[0,1,2,3,4]]},step:"/shared/boiling-water/page/4/step/2"},{criterion:{equals:[{xvalue:"value"},5]},step:"/shared/boiling-water/page/4/step/3"}],defaultBranch:"/shared/boiling-water/page/4/step/4",isFinalStep:false,shouldAutoAdvancePage:false,hideSubmitButton:false,submitButtonTitle:"Check Answer",nextButtonShouldSubmit:false},{url:"/shared/boiling-water/page/4/step/2",activityPage:"/shared/boiling-water/page/4",paneConfig:"split",panes:{top:{type:"graph",name:"correct-boiling-point",datasetName:"correct-boiling-point"},bottom:{type:"table",graphName:"correct-boiling-point",datasetName:"correct-boiling-point"}},beforeText:"<p>Incorrect. In the highlighted section of the graph the water was not yet boiling. Try again.</p>",responseTemplate:null,afterText:"",startCommands:[{action:"removeAnnotation",literalArgs:{graphName:"correct-boiling-point",name:"where-boiling-began"}},{action:"addAnnotation",literalArgs:{graphName:"correct-boiling-point",type:"Smartgraphs.HighlightedSegment",name:"before-boiling-began"}}],shouldFinishImmediately:false,shouldWaitForSubmissibleResponse:true,submissibilityInspector:{type:"Smartgraphs.SelectedPointInspector",config:{graphName:"correct-boiling-point",datasetName:"correct-boiling-point"}},submissibilityCriterion:{notempty:"value"},triggeredCommands:[],afterSubmissionCommands:[],responseInspector:{type:"Smartgraphs.SelectedPointInspector",config:{graphName:"correct-boiling-point",datasetName:"correct-boiling-point"}},responseBranches:[{criterion:{"in":[{xvalue:"value"},[0,1,2,3,4]]},step:"/shared/boiling-water/page/4/step/2"},{criterion:{equals:[{xvalue:"value"},5]},step:"/shared/boiling-water/page/4/step/3"}],defaultBranch:"/shared/boiling-water/page/4/step/4",isFinalStep:false,shouldAutoAdvancePage:false,hideSubmitButton:false,submitButtonTitle:"Check Answer",nextButtonShouldSubmit:false},{url:"/shared/boiling-water/page/4/step/3",activityPage:"/shared/boiling-water/page/4",paneConfig:"split",panes:{top:{type:"graph",name:"correct-boiling-point",datasetName:"correct-boiling-point"},bottom:{type:"table",graphName:"correct-boiling-point",datasetName:"correct-boiling-point"}},beforeText:"<p>Incorrect. The circled point shows where the water began to boil. Try again.</p>",responseTemplate:null,afterText:"",startCommands:[{action:"removeAnnotation",literalArgs:{graphName:"correct-boiling-point",name:"before-boiling-began"}},{action:"addAnnotation",literalArgs:{graphName:"correct-boiling-point",type:"Smartgraphs.HighlightedPoint",name:"where-boiling-began"}}],shouldFinishImmediately:false,shouldWaitForSubmissibleResponse:true,submissibilityInspector:{type:"Smartgraphs.SelectedPointInspector",config:{graphName:"correct-boiling-point",datasetName:"correct-boiling-point"}},submissibilityCriterion:{notempty:"value"},triggeredCommands:[],afterSubmissionCommands:[],responseInspector:{type:"Smartgraphs.SelectedPointInspector",config:{graphName:"correct-boiling-point",datasetName:"correct-boiling-point"}},responseBranches:[{criterion:{"in":[{xvalue:"value"},[0,1,2,3,4]]},step:"/shared/boiling-water/page/4/step/2"},{criterion:{equals:[{xvalue:"value"},5]},step:"/shared/boiling-water/page/4/step/3"}],defaultBranch:"/shared/boiling-water/page/4/step/4",isFinalStep:false,shouldAutoAdvancePage:false,hideSubmitButton:false,submitButtonTitle:"Check Answer",nextButtonShouldSubmit:false},{url:"/shared/boiling-water/page/4/step/4",activityPage:"/shared/boiling-water/page/4",paneConfig:"split",panes:{top:{type:"graph",name:"correct-boiling-point",datasetName:"correct-boiling-point"},bottom:{type:"table",graphName:"correct-boiling-point",datasetName:"correct-boiling-point"}},beforeText:"<p>Correct! The highlighted segment represents the period one minute or more after the water had started to boil.</p><p>Click the <b>Next</b> button to go to the next page.</p>",responseTemplate:null,afterText:"",startCommands:[{action:"removeAnnotation",literalArgs:{graphName:"correct-boiling-point",name:"before-boiling-began"}},{action:"removeAnnotation",literalArgs:{graphName:"correct-boiling-point",name:"where-boiling-began"}},{action:"addAnnotation",literalArgs:{graphName:"correct-boiling-point",type:"Smartgraphs.HighlightedSegment",name:"after-boiling-began"}}],shouldFinishImmediately:true,shouldWaitForSubmissibleResponse:false,submissibilityInspector:null,submissibilityCriterion:null,triggeredCommands:[],afterSubmissionCommands:[],responseInspector:null,responseBranches:[],defaultBranch:null,isFinalStep:true,shouldAutoAdvancePage:false,hideSubmitButton:true,submitButtonTitle:"",nextButtonShouldSubmit:false},{url:"/shared/boiling-water/page/5/step/1",activityPage:"/shared/boiling-water/page/5",paneConfig:"split",panes:{top:{type:"graph",name:"correct-boiling-point",datasetName:"correct-boiling-point"},bottom:{type:"table",graphName:"correct-boiling-point",datasetName:"correct-boiling-point"}},beforeText:"<p>(For the demonstration, try entering an incorrect answer first.)</p>",responseTemplate:"/shared/boiling-water/response-template/plateau-explanation",afterText:"",startCommands:[],shouldFinishImmediately:false,shouldWaitForSubmissibleResponse:true,submissibilityInspector:{type:"Smartgraphs.FirstResponseFieldInspector"},submissibilityCriterion:{"in":["value",[1,2,3,4]]},triggeredCommands:[],afterSubmissionCommands:[],responseInspector:{type:"Smartgraphs.FirstResponseFieldInspector"},responseBranches:[{criterion:{"in":["value",[1,2,4]]},step:"/shared/boiling-water/page/5/step/2"},{criterion:{equals:["value",3]},step:"/shared/boiling-water/page/5/step/4"}],defaultBranch:"",isFinalStep:false,shouldAutoAdvancePage:false,hideSubmitButton:false,submitButtonTitle:"OK",nextButtonShouldSubmit:false},{url:"/shared/boiling-water/page/5/step/2",activityPage:"/shared/boiling-water/page/5",paneConfig:"split",panes:{top:{type:"graph",name:"correct-boiling-point",datasetName:"correct-boiling-point"},bottom:{type:"table",graphName:"correct-boiling-point",datasetName:"correct-boiling-point"}},beforeText:"<p>Incorrect! Try again.</p>",responseTemplate:"/shared/boiling-water/response-template/plateau-explanation",afterText:"",startCommands:[],shouldFinishImmediately:false,shouldWaitForSubmissibleResponse:true,submissibilityInspector:{type:"Smartgraphs.FirstResponseFieldInspector"},submissibilityCriterion:{"in":["value",[1,2,3,4]]},triggeredCommands:[],afterSubmissionCommands:[],responseInspector:{type:"Smartgraphs.FirstResponseFieldInspector"},responseBranches:[{criterion:{"in":["value",[1,2,4]]},step:"/shared/boiling-water/page/5/step/3"},{criterion:{equals:["value",3]},step:"/shared/boiling-water/page/5/step/4"}],defaultBranch:"",isFinalStep:false,shouldAutoAdvancePage:false,hideSubmitButton:false,submitButtonTitle:"OK",nextButtonShouldSubmit:false},{url:"/shared/boiling-water/page/5/step/3",activityPage:"/shared/boiling-water/page/5",paneConfig:"split",panes:{top:{type:"graph",name:"correct-boiling-point",datasetName:"correct-boiling-point"},bottom:{type:"table",graphName:"correct-boiling-point",datasetName:"correct-boiling-point"}},beforeText:"<p>Incorrect! Think about what happens when water boils. Try again.</p>",responseTemplate:"/shared/boiling-water/response-template/plateau-explanation",afterText:"",startCommands:[],shouldFinishImmediately:false,shouldWaitForSubmissibleResponse:true,submissibilityInspector:{type:"Smartgraphs.FirstResponseFieldInspector"},submissibilityCriterion:{"in":["value",[1,2,3,4]]},triggeredCommands:[],afterSubmissionCommands:[],responseInspector:{type:"Smartgraphs.FirstResponseFieldInspector"},responseBranches:[{criterion:{"in":["value",[1,2,4]]},step:"/shared/boiling-water/page/5/step/3"},{criterion:{equals:["value",3]},step:"/shared/boiling-water/page/5/step/4"}],defaultBranch:"",isFinalStep:false,shouldAutoAdvancePage:false,hideSubmitButton:false,submitButtonTitle:"OK",nextButtonShouldSubmit:false},{url:"/shared/boiling-water/page/5/step/4",activityPage:"/shared/boiling-water/page/5",paneConfig:"split",panes:{top:{type:"graph",name:"correct-boiling-point",datasetName:"correct-boiling-point"},bottom:{type:"table",graphName:"correct-boiling-point",datasetName:"correct-boiling-point"}},beforeText:"<p>Correct! Once a liquid reaches the boiling point its temperature does not change.</p><p>Click <b>Next</b> to continue to the last page.</p>",responseTemplate:null,afterText:"",startCommands:[],shouldFinishImmediately:false,shouldWaitForSubmissibleResponse:true,submissibilityInspector:null,submissibilityCriterion:{},triggeredCommands:[],afterSubmissionCommands:[],responseInspector:null,responseBranches:[],defaultBranch:"",isFinalStep:true,shouldAutoAdvancePage:false,hideSubmitButton:false,submitButtonTitle:"",nextButtonShouldSubmit:true},{url:"/shared/boiling-water/page/6/step/1",activityPage:"/shared/boiling-water/page/6",paneConfig:"single",panes:{single:{type:"html",html:'<div style="width: 370px; margin: 0 auto; padding-top: 40px"><img src="/static/smartgraphs/en/current/resources/images/cc-logo-vertical.jpg"><h1 style="margin: 25px 10px 10px 20px">Our SmartGraphs project team includes:</h1> <ul style="padding-left: 10px"> <li>Eric Kattwinkel</li> <li>Rachel Kay</li> <li>Richard Klancer</li> <li>Carolyn Staudt</li> <li>Robert Tinker</li> <li>Kofi Weusijana</li> <li>Dewi Win</li> <li>Andy Zucker</li> </ul></div>'}},beforeText:"",responseTemplate:null,afterText:"",startCommands:[],shouldFinishImmediately:false,shouldWaitForSubmissibleResponse:false,submissibilityInspector:null,submissibilityCriterion:null,triggeredCommands:[],afterSubmissionCommands:[],responseInspector:null,responseBranches:[],defaultBranch:null,isFinalStep:true,shouldAutoAdvancePage:false,hideSubmitButton:true,submitButtonTitle:"",nextButtonShouldSubmit:false}],responseTemplates:[{url:"/components/response-template/open",templateString:"",fieldTypes:["textarea"],fieldChoicesList:[null],initialValues:[""]},{url:"/shared/boiling-water/response-template/plateau-explanation",templateString:"",fieldTypes:["multiplechoice"],fieldChoicesList:[["The thermometer was broken.","The flame was too low.","After the water boiled, the added heat turned water into steam.","Water is a magical substance."]],initialValues:[""]}],datasets:[{url:"/shared/boiling-water/dataset/correct-boiling-point",name:"correct-boiling-point",activity:"/shared/boiling-water",isExample:true,points:[100,101,102,103,104,105,106,107,108,109,110],session:null,defaultColor:null}],datapoints:[{x:0,y:90,guid:100,dataset:"/shared/boiling-water/dataset/correct-boiling-point"},{x:1,y:92,guid:101,dataset:"/shared/boiling-water/dataset/correct-boiling-point"},{x:2,y:94,guid:102,dataset:"/shared/boiling-water/dataset/correct-boiling-point"},{x:3,y:96,guid:103,dataset:"/shared/boiling-water/dataset/correct-boiling-point"},{x:4,y:98,guid:104,dataset:"/shared/boiling-water/dataset/correct-boiling-point"},{x:5,y:100,guid:105,dataset:"/shared/boiling-water/dataset/correct-boiling-point"},{x:6,y:100,guid:106,dataset:"/shared/boiling-water/dataset/correct-boiling-point"},{x:7,y:100,guid:107,dataset:"/shared/boiling-water/dataset/correct-boiling-point"},{x:8,y:100,guid:108,dataset:"/shared/boiling-water/dataset/correct-boiling-point"},{x:9,y:100,guid:109,dataset:"/shared/boiling-water/dataset/correct-boiling-point"},{x:10,y:100,guid:110,dataset:"/shared/boiling-water/dataset/correct-boiling-point"}],graphs:[{url:"/shared/boiling-water/graph/freehand-boiling-point",activity:"/shared/boiling-water",name:"freehand-boiling-point",description:"freehand boiling point prediciton",title:"Boiling Point: Prediction",axes:"/shared/boiling-water/axes/80-120d_0-10m",initialDatasets:[],initialAnnotations:[]},{url:"/shared/boiling-water/graph/correct-boiling-point",activity:"/shared/boiling-water",name:"correct-boiling-point",description:"scatterpoint graph showing correct boiling point data",title:"Boiling Point: Actual",axes:"/shared/boiling-water/axes/80-120d_0-10m",initialDatasets:["correct-boiling-point"],initialAnnotations:[]},{url:"/shared/boiling-water/graph/correct-boiling-point-with-connected-dots",activity:"/shared/boiling-water",name:"correct-boiling-point-with-connected-dots",description:"scatterpoint graph showing correct boiling point data, plus annotation connecting the dots",title:"Boiling Point: Actual",axes:"/shared/boiling-water/axes/80-120d_0-10m",initialDatasets:["correct-boiling-point"],initialAnnotations:[{type:"Smartgraphs.FreehandSketch",name:"sketch-to-match-correct-boiling-point"}]},{url:"/shared/boiling-water/graph/predicted-boiling-point",activity:"/shared/boiling-water",name:"predicted-boiling-point",description:"graph showing user's prediction",title:"Boiling Point: Predicted",axes:"/shared/boiling-water/axes/80-120d_0-10m",initialDatasets:[],initialAnnotations:[{type:"Smartgraphs.FreehandSketch",name:"prediction"}]}],axes:[{url:"/shared/boiling-water/axes/80-120d_0-10m",xMin:0,xMax:10,xSteps:10,xLabel:"Time (minutes)",xLabelAbbreviated:"Time (m)",yMin:80,yMax:120,ySteps:8,yLabel:"Temperature (Celsius)",yLabelAbbreviated:"Temp. (C)"}],freehandSketches:[{url:"/shared/boiling-water/annotation/sketch-to-match-correct-boiling-point",name:"sketch-to-match-correct-boiling-point",activity:"/shared/boiling-water",isExample:true,points:[{x:0,y:90},{x:5,y:100},{x:10,y:100}],session:null}],highlightedPoints:[{url:"/shared/boiling-water/annotation/where-boiling-began",name:"where-boiling-began",activity:"/shared/boiling-water",isExample:true,session:null,point:105}],highlightedSegments:[{url:"/shared/boiling-water/annotation/before-boiling-began",name:"before-boiling-began",activity:"/shared/boiling-water",isExample:true,session:null,points:[100,104]},{url:"/shared/boiling-water/annotation/after-boiling-began",name:"after-boiling-began",activity:"/shared/boiling-water",isExample:true,session:null,points:[106,110]}],linesToAxis:[]};
Smartgraphs.activityController=SC.ObjectController.create({canGotoNextPage:NO,cleanup:function(){Smartgraphs.activityPageController.cleanup();
Smartgraphs.activityStepController.cleanup()}});Smartgraphs.activityOutlineController=SC.TreeController.create({treeItemIsGrouped:YES,allowsMultipleSelection:NO,allowsEmptySelection:NO,contentBinding:SC.Binding.oneWay("Smartgraphs.activityPagesController.outline"),currentStepBinding:SC.Binding.oneWay("Smartgraphs.activityStepController.content"),currentStepDidChange:function(){var d=this.get("content");
if(!d){return}var b=d.get("pages");if(!b){return}var g=Smartgraphs.activityPageController.get("content");
var a=b.indexOf(g);if(a<0){return}var c=d.get("treeItemChildren").objectAt(a);var e=Smartgraphs.activityStepController.get("content");
var f=c.get("steps").indexOf(e);if(f<0){return}this.selectObject(c.get("treeItemChildren").objectAt(f))
}.observes("currentStep")});Smartgraphs.activityPageController=SC.ObjectController.create({cleanup:function(){Smartgraphs.firstGraphController.clear();
Smartgraphs.secondGraphController.clear();Smartgraphs.firstTableController.clear();
Smartgraphs.secondTableController.clear();Smartgraphs.activityViewController.clear()
}});Smartgraphs.activityPagesController=SC.ArrayController.create({allowsMultipleSelection:NO,currentPageNumber:function(){var a=this.get("selection").indexSetForSource(this);
return a&&a.firstObject()}.property("selection","[]").cacheable(),selectFirstPage:function(){if(this.get("length")>0){this.selectObject(this.objectAt(0))
}},selectNextPage:function(){var a=this.get("currentPageNumber");if(a+1<this.get("length")){this.selectObject(this.objectAt(a+1))
}},isLastPage:function(){return(this.get("currentPageNumber")>=(this.get("length")-1))
}.property("currentPageNumber","length").cacheable(),contentsDidChange:function(){var a=0;
this.forEach(function(b){b.set("pageNumber",a++)})}.observes("[]"),outline:function(){return SC.Object.create({title:"toplevel",treeItemIsExpanded:YES,pages:this.map(function(a){return a
}),treeItemChildren:this.map(function(a){var b=1;return SC.Object.create({title:a.get("name")||"Page %@".fmt(a.get("pageNumber")+1),treeItemIsExpanded:YES,steps:a.get("steps"),treeItemChildren:a.get("steps").map(function(c){return SC.Object.create({title:"Step %@".fmt(b++),step:c,treeItemIsExpanded:YES,treeItemChildren:null})
})})})})}.property("[]").cacheable()});Smartgraphs.activityStepController=SC.ObjectController.create({canSubmit:NO,showSubmitButton:NO,submissibilityInspectorInstance:null,cleanup:function(){var a=this.get("submissibilityInspectorInstance");
if(a){a.stopWatching();a.removeObserver("value",this,this.checkSubmissibility);a.destroy()
}this.set("submissibilityInspectorInstance",null)},begin:function(){this.setupPanes();
Smartgraphs.responseTemplateController.setTemplate(this.get("responseTemplate"));
this.executeCommands(this.get("startCommands"));this.setupTriggers();this.enableSubmission();
if(this.get("shouldWaitForSubmissibleResponse")){Smartgraphs.sendAction("waitForResponse")
}else{if(this.get("shouldFinishImmediately")){Smartgraphs.sendAction("submitStep")
}}},setupPanes:function(){Smartgraphs.sendAction("setPaneConfig",this,this.get("paneConfig"));
var b=this.get("panes");for(var a in b){if(!b.hasOwnProperty(a)){continue}this.setupPane(a,b[a])
}},setupPane:function(b,a){b=Smartgraphs.activityViewController.validPaneFor(b);if(!b){return
}if(a===null){Smartgraphs.sendAction("hidePane",this,b);return}switch(a.type){case"graph":Smartgraphs.sendAction("showGraph",this,{pane:b,name:a.name});
return;case"table":Smartgraphs.sendAction("showTable",this,{pane:b,graphName:a.graphName,datasetName:a.datasetName});
return;case"image":Smartgraphs.sendAction("showImage",this,{pane:b,path:a.path});
return;case"html":Smartgraphs.sendAction("showHtml",this,{pane:b,html:a.html})}},executeCommands:function(a){if(!a){return
}var b=this;a.forEach(function(c){Smartgraphs.sendAction(c.action,b,c.literalArgs)
})},setupTriggers:function(){},enableSubmission:function(){this.set("canSubmit",YES)
},disableSubmission:function(){this.set("canSubmit",NO)},waitForResponse:function(){if(this.get("submissibilityInspector")){this.disableSubmission();
this.setupSubmissibilityInspector()}else{this.enableSubmission()}},handleSubmission:function(){if(!this.get("canSubmit")){return NO
}this.executeCommands(this.get("afterSubmissionCommands"));var f=this.makeInspector("responseInspector");
if(f){var e=f.inspect();var d,b=this.get("responseBranches");for(var c=0;c<b.length;
c++){d=b.objectAt(c);if(Smartgraphs.evaluate(d.criterion,e)){Smartgraphs.sendAction("gotoStep",this,{stepId:d.step});
return}}}var a=this.get("defaultBranch");if(a){Smartgraphs.sendAction("gotoStep",this,{stepId:a.get("id")})
}},setupSubmissibilityInspector:function(){if(!this.get("submissibilityInspector")){this.enableSubmission();
return}var a=this.makeInspector("submissibilityInspector");if(!a){console.error("setupSubmissibilityInspector was called, but makeInspector could not make an inspector instance.");
return}this.set("submissibilityInspectorInstance",a);this._valueWasValid=null;a.addObserver("value",this,this.checkSubmissibility);
a.watch()},makeInspector:function(b){var c=this.get(b);if(!c||!c.type){return NO}var a=SC.objectForPropertyPath(c.type);
if(!a||!a.isClass){return NO}return a.create({config:c.config})},checkSubmissibility:function(){var c=this.get("submissibilityInspectorInstance");
var b=c.get("value");var a=Smartgraphs.evaluate(this.get("submissibilityCriterion"),b);
if(a&&!this._valueWasValid){this.enableSubmission()}else{if(this._valueWasValid&&!a){this.disableSubmission()
}}this._valueWasValid=a}});Smartgraphs.activityViewController=SC.ObjectController.create({dataViewNowShowing:null,topPaneNowShowing:null,bottomPaneNowShowing:null,singlePaneNowShowing:null,firstImageValue:null,secondImageValue:null,firstGraphPaneControls:null,secondGraphPaneControls:null,firstPaneHtml:"",secondPaneHtml:"",startControlIsVisible:NO,startControlIsEnabled:NO,startControlIsDefault:NO,stopControlIsVisible:NO,stopControlIsEnabled:NO,stopControlIsDefault:NO,clearControlIsVisible:NO,clearControlIsEnabled:NO,clearControlIsDefault:NO,paneIsSplit:null,canGotoNextPage:null,canGotoNextPageBinding:"Smartgraphs.activityController.canGotoNextPage",canSubmit:null,canSubmitBinding:"Smartgraphs.activityStepController.canSubmit",isFinalStep:null,isFinalStepBinding:"Smartgraphs.activityStepController.isFinalStep",hideSubmitButton:null,hideSubmitButtonBinding:"Smartgraphs.activityStepController.hideSubmitButton",nextButtonShouldSubmit:null,nextButtonShouldSubmitBinding:"Smartgraphs.activityStepController.nextButtonShouldSubmit",showSubmitButton:function(){return !(this.get("hideSubmitButton")||this.get("nextButtonShouldSubmit"))
}.property("hideSubmitButton","nextButtonShouldSubmit").cacheable(),enableSubmitButton:null,enableSubmitButtonBinding:"Smartgraphs.activityStepController.canSubmit",showNextPageButton:null,showNextPageButtonBinding:SC.Binding.not("Smartgraphs.activityPagesController.isLastPage"),enableNextPageButton:function(){return this.get("canGotoNextPage")||(this.get("isFinalStep")&&this.get("nextButtonShouldSubmit")&&this.get("canSubmit"))
}.property("canGotoNextPage","isFinalStep","nextButtonShouldSubmit","canSubmit").cacheable(),firstOrSecondFor:function(b){var a=this.get("paneIsSplit");
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
return YES},showHtml:function(c,a){c=this.validPaneFor(c);var b=this.firstOrSecondFor(c);
if(!b){return NO}this.set(c+"PaneNowShowing","Smartgraphs.activityPage."+b+"HtmlView");
this.set(b+"PaneHtml",a);return YES},showTable:function(d,a,b){d=this.validPaneFor(d);
var c=this.firstOrSecondFor(d);if(!c){return NO}Smartgraphs.get(c+"TableController").openDataset(a,b);
this.set(d+"PaneNowShowing","Smartgraphs.activityPage."+c+"TableView");return YES
},hidePane:function(a){a=this.validPaneFor(a);if(!a){return NO}this.set(a+"PaneNowShowing",null);
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
}}});Smartgraphs.appWindowController=SC.ObjectController.create({nowShowing:null,loadingMessage:null,showActivityView:function(){this.set("nowShowing","Smartgraphs.activityPage.activityView")
},showActivityLoadingView:function(){this.set("nowShowing","Smartgraphs.mainPage.loadingView");
this.set("loadingMessage",Smartgraphs.activityPage.getPath("activityView.loadingMessage"))
},showErrorLoadingActivityView:function(){this.set("nowShowing","Smartgraphs.activityPage.errorLoadingActivityView")
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
sc_require("mixins/annotation_support");Smartgraphs.TableController=SC.ArrayController.extend(Smartgraphs.AnnotationSupport,{graphController:null,graphName:null,datasetName:null,dataset:null,axesBinding:"*graphController.axes",selectionBinding:"*dataset.selection",isStreamingBinding:"*dataset.isStreaming",showLabels:function(){return this.get("length")>0
}.property("length").cacheable(),showTable:function(){return !this.get("isStreaming")
}.property("isStreaming").cacheable(),latestXBinding:"*dataset.latestPoint.xRounded",latestYBinding:"*dataset.latestPoint.yRounded",clear:function(){this.removeObservers();
this.clearAnnotations();this.set("content",null);this.set("dataset",null);this.set("graphController",null);
this.set("graphName",null);this.set("datasetName",null)},openDataset:function(b,c){var a=this.get("datasetName");
if(a===c){return YES}this.clear();this.removeObservers();this.set("graphName",b);
this.set("datasetName",c);if(a){Smartgraphs.TableController.controllerForDataset.set(a,null)
}Smartgraphs.TableController.controllerForDataset.set(c,this);this.waitForController()
},waitForController:function(){var a=this.get("graphName");var b=this.get("datasetName");
var c=Smartgraphs.GraphController.controllerForName[a];if(c){this.removeObservers();
this.set("graphController",c);this.waitForDataset()}else{Smartgraphs.GraphController.controllerForName.addObserver(a,this,this.waitForController)
}},waitForDataset:function(){var c=this.get("graphController");var b=this.get("datasetName");
var a=c.findDatasetByName(b);if(a){this.removeObservers();if(this.get("graphName")!==c.get("name")){this.waitForController();
return}this.set("content",a.get("points"));this.set("dataset",a)}else{c.get("datasetList").addObserver("[]",this,this.waitForDataset)
}},removeObservers:function(){var a=this.get("graphName");if(a){Smartgraphs.TableController.controllerForDataset.removeObserver(a,this,this.waitForController);
var b=this.get("graphController");if(b){b.get("datasetList").removeObserver("[]",this,this.waitForDataset)
}}},addAnnotation:function(a){arguments.callee.base.apply(this,arguments);if(a.kindOf(Smartgraphs.HighlightedPoint)){a.addObserver("point",this,"updateDataPoints")
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
Smartgraphs.sendAction("freehandSketchCompleted")}},startRecording:function(){this._isRecording=YES
},stopRecording:function(){this._isRecording=NO},clearSketch:function(){if(!this._isRecording&&this._inputIsEnabled){this._sketch.set("points",[])
}}});Smartgraphs.freehandInputController.START=1;Smartgraphs.freehandInputController.CONTINUE=2;
Smartgraphs.freehandInputController.END=3;Smartgraphs.responseTemplateController=SC.ObjectController.create({editingShouldBeEnabled:NO,viewShouldReset:NO,setTemplate:function(b){this.set("content",b);
var a=this.get("initialValues");if(a){this.set("values",a.copy())}this.set("viewShouldReset",YES)
}});sc_require("controllers/graph");Smartgraphs.secondGraphController=Smartgraphs.GraphController.create({viewPath:"activityPage.secondGraphPane.graphView"});
sc_require("controllers/table");Smartgraphs.secondTableController=Smartgraphs.TableController.create({viewPath:"activityPage.secondTableView"});
Smartgraphs.sensorController=SC.ObjectController.create({xMin:null,xMax:null,downsampleRatio:function(){return $.browser.msie?3:2
}(),dt:0.1,sensorIsReady:NO,_appletView:null,_inputIsEnabled:NO,_isRecording:NO,_pane:null,_dataset:null,pane:function(){return this._pane
}.property(),register:function(d,b,a,c){if(this._inputIsEnabled){return NO}d=Smartgraphs.activityViewController.validPaneFor(d);
if(d&&b&&b.get("isExample")===NO){this._pane=d;this._dataset=b;if(a){this.set("xMin",a)
}if(c){this.set("xMax",c)}return YES}return NO},enableInput:function(){if(this._inputIsEnabled||!this._pane||!this._dataset){return NO
}this._inputIsEnabled=YES;if(!this._appletView){this._appletView=Smartgraphs.appletPage.sensorAppletView.create();
Smartgraphs.mainPage.get("mainPane").appendChild(this._appletView)}if(this.get("sensorIsReady")){Smartgraphs.sendAction("sensorHasLoaded")
}else{Smartgraphs.sendAction("waitForSensorToLoad")}return YES},disableInput:function(){this._inputIsEnabled=NO;
this._dataset=null;this._pane=null},startRecording:function(){this._isRecording=YES;
this._dataset.set("isStreaming",YES);this._dataset.set("streamSource",this);this._nsamples=0;
this._appletView.start();var b=this._dataset.getPath("points.length");var a=b+Math.floor(1+this.get("xMax")/(this.get("downsampleRatio")*this.get("dt")));
this._dataset.set("expectedLength",a)},stopRecording:function(){this._isRecording=NO;
this._dataset.set("isStreaming",NO);this._appletView.stop()},clearRecordedData:function(){SC.RunLoop.begin();
var b=this._dataset.get("points");var a=[];b.forEach(function(c){a.push(c)});a.forEach(function(c){c.set("dataset",null);
c.destroy()});SC.RunLoop.end()},sensorsReady:function(){SC.RunLoop.begin();this.set("sensorIsReady",YES);
if(this._inputIsEnabled){Smartgraphs.sendAction("sensorHasLoaded")}SC.RunLoop.end()
},dataReceived:function(e,g,c){if(!(this._inputIsEnabled&&this._isRecording)){return
}var a=this.get("dt");var d=this.get("downsampleRatio");var h,f;var j;for(var b=0;
b<g;b++){h=this._nsamples*a;f=c[b];if(h>this.get("xMax")){setTimeout(function(){SC.RunLoop.begin();
Smartgraphs.sendAction("stopSensor");SC.RunLoop.end()},10);return}if(this._nsamples%d===0){SC.RunLoop.begin();
j=Smartgraphs.store.createRecord(Smartgraphs.DataPoint,{x:h,y:f,guid:Smartgraphs.getNextGuid()});
this._dataset.set("latestPoint",j);this._dataset.get("points").pushObject(j);SC.RunLoop.end()
}this._nsamples++}},dataStreamEvent:function(){}});Smartgraphs.sessionController=SC.ObjectController.create({newSession:function(){var a=Smartgraphs.store.createRecord(Smartgraphs.Session,{steps:[],user:Smartgraphs.userController.getPath("content.id")});
a.set("id",Smartgraphs.getNextGuid());this.set("content",a)},createDataset:function(b){var a=Smartgraphs.store.createRecord(Smartgraphs.Dataset,{isExample:NO,name:b,points:[]});
a.set("session",this.get("content"));a.set("id",Smartgraphs.getNextGuid());return a
},createAnnotation:function(c,b,a){var d=Smartgraphs.store.createRecord(c,SC.mixin({isExample:NO,session:this.getPath("content.id"),name:b},a));
d.set("id",Smartgraphs.getNextGuid());return d}});Smartgraphs.userController=SC.ObjectController.create({});
Smartgraphs.CouchDataSource=SC.DataSource.extend({fetch:function(a,b){this.log("CouchDataSource.fetch()");
this.invokeLast(function(){a.dataSourceDidFetchQuery(b)});return YES},retrieveRecord:function(d,e){var g=Smartgraphs.store.recordTypeFor(e);
var f=Smartgraphs.store.idFor(e);this.log("CouchDataSource.retrieveRecord()");this.log("  Record type requested = %s",g.toString());
this.log("  id requested = %s",f);if(g===Smartgraphs.Activity){var c=f;var a=Smartgraphs.activityJson[c];
var b=a?SC.Response.create({body:{rows:[{value:a}]}}):SC.Error.create();this.didRetrieveActivity(b,d,e);
this.log("  returning YES from retrieveRecord");return YES}if(g===Smartgraphs.User){this.log("  recognized request for User record");
if(f==="default"){d.dataSourceDidComplete(e,{userId:"default",name:"Default Smartgraphs User",sessions:[]});
this.log("  handled request for User record of 'default' user")}return YES}return NO
},didRetrieveActivity:function(d,c,e){if(SC.ok(d)){var a=d.get("body");this.log("retrieved response.body = ",a);
if(a&&a.rows&&a.rows.length===1&&a.rows[0].value){var f=a.rows[0].value;this.log("doc = ",f);
this.log("doc.activity = ",f.activity);var b=this;[["ActivityPage","pages"],["ActivityStep","steps"],["Axes","axes"],["DataPoint","datapoints"],["Dataset","datasets"],["FreehandSketch","freehandSketches"],["Graph","graphs"],["HighlightedPoint","highlightedPoints"],["HighlightedSegment","highlightedSegments"],["LineToAxis","linesToAxis"],["ResponseTemplate","responseTemplates"]].forEach(function(g){b.loadRecordsFromArray(Smartgraphs[g[0]],f[g[1]])
});c.dataSourceDidComplete(e,f.activity);return}}c.dataSourceDidError(e,d)},loadRecordsFromArray:function(b,a){a.forEach(function(c){Smartgraphs.store.loadRecord(b,c,c.url)
})},createRecord:function(a,b){return NO},updateRecord:function(a,b){return NO},destroyRecord:function(a,b){return NO
},camelizeKeys:function(c){var a={};for(var b in c){if(c.hasOwnProperty(b)){a[b.camelize()]=c[b]
}}return a},log:function(){if(Smartgraphs.get("logDataSource")){if(console.log.apply){console.log.apply(console,arguments)
}else{this.log=console.log}}}});Smartgraphs.Inspector=SC.Object.extend({init:function(){var a=this.get("config");
this.configure(a||{});arguments.callee.base.apply(this,arguments)}});sc_require("inspectors/inspector");
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
}());Smartgraphs.Activity=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",title:SC.Record.attr(String),owner:SC.Record.attr(String),pages:SC.Record.toMany("Smartgraphs.ActivityPage",{inverse:"activity",orderBy:"index"}),context:{},pageListUrl:SC.Record.attr(String),pagesQuery:function(){return SC.Query.create({isPagesQuery:YES,recordType:Smartgraphs.ActivityPage,conditions:"activity = {activity}",parameters:{activity:this}})
}.property().cacheable()});Smartgraphs.ActivityPage=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",activity:SC.Record.toOne("Smartgraphs.Activity",{inverse:"pages",isMaster:YES}),name:SC.Record.attr(String),index:SC.Record.attr(Number),introText:SC.Record.attr(String),steps:SC.Record.toMany("Smartgraphs.ActivityStep",{inverse:"activityPage"}),firstStep:SC.Record.toOne("Smartgraphs.ActivityStep"),context:{},isSelectable:NO,stepListUrl:SC.Record.attr(String),stepsQuery:function(){return SC.Query.create({isStepsQuery:YES,recordType:Smartgraphs.ActivityStep,conditions:"page = {page}",parameters:{page:this}})
}.property().cacheable(),pageNumber:null,pageNumberAsString:function(){return(this.get("pageNumber")+1)+""
}.property("pageNumber")});Smartgraphs.ActivityStep=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",activityPage:SC.Record.toOne("Smartgraphs.ActivityPage",{inverse:"steps",isMaster:YES}),paneConfig:SC.Record.toOne(String),panes:SC.Record.attr(Object),beforeText:SC.Record.attr(String),responseTemplate:SC.Record.toOne("Smartgraphs.ResponseTemplate"),afterText:SC.Record.attr(String),startCommands:SC.Record.attr(Array),shouldFinishImmediately:SC.Record.attr(Boolean),shouldWaitForSubmissibleResponse:SC.Record.attr(Boolean),submissibilityInspector:SC.Record.attr(Object),submissibilityCriterion:SC.Record.attr(Object),triggeredCommands:SC.Record.toMany("Smartgraphs.TriggeredCommands"),afterSubmissionCommands:SC.Record.attr(Array),responseInspector:SC.Record.attr(Object),responseBranches:SC.Record.attr(Array),defaultBranch:SC.Record.toOne("Smartgraphs.ActivityStep"),isFinalStep:SC.Record.attr(Boolean),hideSubmitButton:SC.Record.attr(Boolean),submitButtonTitle:SC.Record.attr(String),nextButtonShouldSubmit:SC.Record.attr(Boolean),shouldAutoAdvancePage:SC.Record.attr(Boolean)});
Smartgraphs.Annotation=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",isAnnotation:YES,isExample:SC.Record.attr(Boolean),name:SC.Record.attr(String),activity:SC.Record.toOne("Smartgraphs.Activity"),session:SC.Record.toOne("Smartgraphs.Session"),color:SC.Record.attr(String,{defaultValue:"#cc0000"})});
Smartgraphs.Axes=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",xMin:SC.Record.attr(Number),xMax:SC.Record.attr(Number),xSteps:SC.Record.attr(Number),xLabel:SC.Record.attr(String),xLabelAbbreviated:SC.Record.attr(String),yMin:SC.Record.attr(Number),yMax:SC.Record.attr(Number),ySteps:SC.Record.attr(Number),yLabel:SC.Record.attr(String),yLabelAbbreviated:SC.Record.attr(String)});
Smartgraphs.DataPoint=SC.Record.extend({x:SC.Record.attr(Number),y:SC.Record.attr(Number),dataset:SC.Record.toOne("Smartgraphs.Dataset",{inverse:"points"}),xRounded:function(){return Math.round(this.get("x")*100)/100
}.property("x").cacheable(),yRounded:function(){return Math.round(this.get("y")*100)/100
}.property("y").cacheable()});Smartgraphs.DataPointView=RaphaelViews.RaphaelView.extend({displayProperties:"content.x content.y isEnabled fill stroke radius".w(),notSelectedFillBinding:".parentView.color",notSelectedStrokeBinding:".parentView.color",selectedFill:"#aa0000",selectedStroke:"#aa0000",hoveredRadius:5,notHoveredRadius:3,isEnabled:YES,isHovered:NO,isSelected:NO,layerIsCacheable:YES,isPoolable:YES,fill:function(){return(this.get("isSelected")?this.get("selectedFill"):this.get("notSelectedFill"))
}.property("isSelected","selectedFill","notSelectedFill").cacheable(),stroke:function(){return(this.get("isSelected")?this.get("selectedStroke"):this.get("notSelectedStroke"))
}.property("isSelected","selectedStroke","notSelectedStroke").cacheable(),radius:function(){return(this.get("isHovered")?this.get("hoveredRadius"):this.get("notHoveredRadius"))
}.property("isHovered","hoveredRadius","notHoveredRadius").cacheable(),mouseEntered:function(){this.set("isHovered",YES)
},mouseExited:function(){this.set("isHovered",NO)},mouseDown:function(){Smartgraphs.sendAction("dataPointSelected",this,null);
return NO},renderCallback:function(f,b,e,a,d,c){return f.circle(b,e,a).attr({fill:d,stroke:c})
},render:function(c,a){var h=this.get("fill"),i=this.get("stroke"),d=this.get("radius");
var g=this.getPath("content.x"),e=this.getPath("content.y");var f=this.getPath("parentView.graphView").coordinatesForPoint(g,e);
if(a){c.callback(this,this.renderCallback,f.x,f.y,d,h,i)}else{var b=c.raphael();b.attr({cx:f.x,cy:f.y,r:d,fill:h,stroke:i})
}}});sc_require("views/data_point");Smartgraphs.DatasetView=RaphaelViews.RaphaelCollectionView.extend({exampleView:Smartgraphs.DataPointView,useFastPath:YES,colorBinding:".item.color",selectionBinding:".item.selection",isSelectableBinding:".item.isSelectable",content:function(){var a=this.get("item");
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
Smartgraphs.HighlightedPointView=RaphaelViews.RaphaelView.extend({radius:8,strokeBinding:".item.color",strokeWidth:2,strokeOpacity:1,fill:"#ffffff",fillOpacity:0,displayProperties:"item.point.x item.point.y radius stroke strokeWidth strokeOpacity fill fillOpacity".w(),renderCallback:function(b,a){return b.circle(a.x,a.y,a.r).attr(a)
},render:function(c,a){var d=this.get("graphView");var e=this.get("item");var i=e.get("point");
var h=i?i.get("x"):-9999;var f=i?i.get("y"):-9999;var g=d.coordinatesForPoint(h,f);
var j={cx:g.x,cy:g.y,r:this.get("radius"),stroke:this.get("stroke"),"stroke-width":this.get("strokeWidth"),"stroke-opacity":this.get("strokeOpacity"),fill:this.get("fill"),"fill-opacity":this.get("fillOpacity")};
if(a){c.callback(this,this.renderCallback,j)}else{var b=c.raphael();b.attr(j)}}});
sc_require("models/annotation");sc_require("views/highlighted_point");Smartgraphs.HighlightedPoint=Smartgraphs.Annotation.extend({point:SC.Record.toOne("Smartgraphs.DataPoint")});
Smartgraphs.HighlightedPoint.viewClass=Smartgraphs.HighlightedPointView;Smartgraphs.HighlightedSegmentView=RaphaelViews.RaphaelView.extend({strokeBinding:".item.color",strokeWidth:14,strokeOpacity:0.1,displayProperties:"points.[] stroke strokeWidth strokeOpacity".w(),renderCallback:function(c,a){var b=c.path(a.d).attr(a);
return b},render:function(b,a){var c=this.get("graphView");var e=this.get("item");
var m=e.get("points");var j,k;var h=[];for(var f=0,g=m.get("length");f<g;f++){h.push(f===0?"M":"L");
k=m.objectAt(f);j=c.coordinatesForPoint(k.get("x"),k.get("y"));h.push(j.x);h.push(j.y)
}var d=h.join(" ");var l={d:d,stroke:this.get("stroke"),"stroke-width":this.get("strokeWidth"),"stroke-opacity":this.get("strokeOpacity"),"stroke-linecap":"round","stroke-linejoin":"round"};
if(a){b.callback(this,this.renderCallback,l)}else{var n=b.raphael();n.attr(l)}}});
sc_require("models/annotation");sc_require("models/data_point");sc_require("views/highlighted_segment");
Smartgraphs.HighlightedSegment=Smartgraphs.Annotation.extend({points:SC.Record.toMany("Smartgraphs.DataPoint",{orderBy:"x"})});
Smartgraphs.HighlightedSegment.viewClass=Smartgraphs.HighlightedSegmentView;Smartgraphs.LineThroughPointsView=RaphaelViews.RaphaelView.extend({strokeBinding:".item.color",strokeWidth:2,strokeOpacity:0.3,displayProperties:"point1 point2 stroke strokeWidth strokeOpacity".w(),renderCallback:function(c,a){var b=c.path(a.d).attr(a);
return b},render:function(b,a){var c=this.get("graphView");var e=this.get("item");
var l=e.get("point1");var j=e.get("point2");var h=c.get("axes");var p=this.getEndPoints(l,j,h);
var m,n;var k=[];for(var f=0,g=p.length;f<g;f++){k.push(f===0?"M":"L");n=p[f];m=c.coordinatesForPoint(n.x,n.y);
k.push(m.x);k.push(m.y)}var d=k.join(" ");var o={d:d,stroke:this.get("stroke"),"stroke-width":this.get("strokeWidth"),"stroke-opacity":this.get("strokeOpacity")};
if(a){b.callback(this,this.renderCallback,o)}else{var q=b.raphael();q.attr(o)}},_y:function(d,c,a){return(c*d)+a
},_x:function(d,c,a){if(c===0){return a}else{return(d-a)/c}},getEndPoints:function(l,i,h){var g=h.get("xMax");
var d=h.get("xMin");var e=h.get("yMax");var p=h.get("yMin");var o=[];var c=l.get("x"),n=l.get("y"),a=i.get("x"),k=i.get("y");
if(c===a){o.push({x:c,y:p});o.push({x:c,y:e});return o}var f=(k-n)/(a-c);var j=k-(f*a);
if(this._y(d,f,j)<p){o.push({y:p,x:this._x(p,f,j)});if(this._y(g,f,j)>e){o.push({y:e,x:this._x(e,f,j)})
}else{o.push({x:g,y:this._y(g,f,j)})}return o}if(p<=this._y(d,f,j)<=e){o.push({x:d,y:this._y(d,f,j)});
if(this._y(g,f,j)<p){o.push({y:p,x:this._x(p,f,j)})}else{if(this._y(g,f,j)<=e){o.push({x:g,y:this._y(g,f,j)})
}else{o.push({y:e,x:this._x(e,f,j)})}}return o}if(e<this._y(d,f,j)){o.push({y:e,x:this._x(e,f,j)});
if(this._y(g,f,j)<p){o.push({y:p,x:this._x(p,f,j)})}else{o.push({x:g,y:this._y(g,f,j)})
}return o}return null}});sc_require("models/annotation");sc_require("models/data_point");
sc_require("views/line_through_points");Smartgraphs.LineThroughPoints=Smartgraphs.Annotation.extend({point1:SC.Record.toOne("Smartgraphs.DataPoint"),point2:SC.Record.toOne("Smartgraphs.DataPoint")});
Smartgraphs.LineThroughPoints.viewClass=Smartgraphs.LineThroughPointsView;Smartgraphs.LineToAxisView=RaphaelViews.RaphaelView.extend({radius:8,defaultStroke:"#aa0000",defaultStrokeWidth:2,defaultStrokeOpacity:0.7,fill:"#ffffff",fillOpacity:0,displayProperties:"item.point.x item.point.y".w(),renderCallback:function(d,c){var a;
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
Smartgraphs.READY=SC.Responder.create({nextResponder:null,fencedActivityId:null,didBecomeFirstResponder:function(){SC.routes.add("*activityId",this,"route")
},willLoseFirstResponder:function(){},route:function(b){var a=b.activityId;if(a==="fence"){if(this.fencedActivityId){SC.routes.set("location",this.fencedActivityId)
}}else{if(a){if(a===this.fencedActivityId){Smartgraphs.sendAction("openActivity",this,{id:this.fencedActivityId})
}else{this.fencedActivityId=a;SC.routes.set("location","fence")}}}},openActivity:function(b,a){var c=Smartgraphs.activityController.get("content");
if(c&&c.get("id")===a.id){return YES}Smartgraphs.activityController.set("content",Smartgraphs.store.find(Smartgraphs.Activity,a.id));
Smartgraphs.makeFirstResponder(Smartgraphs.LOADING_ACTIVITY);return YES}});sc_require("states/ready");
Smartgraphs.ACTIVITY=SC.Responder.create({nextResponder:Smartgraphs.READY,didBecomeFirstResponder:function(){Smartgraphs.appWindowController.showActivityView()
},willLoseFirstResponder:function(){Smartgraphs.activityController.cleanup()},createLineThroughPoints:function(e,d){var a=Smartgraphs.GraphController.controllerForName[d.graphName];
if(!a){return YES}var f=a.findAnnotationByName(d.firstPoint);var c=a.findAnnotationByName(d.secondPoint);
var b=d.color?d.color:"#000000";var g=Smartgraphs.sessionController.createAnnotation(Smartgraphs.LineThroughPoints,d.lineName,{point1:f.get("point").get("id"),point2:c.get("point").get("id"),color:b});
return YES}});sc_require("states/activity");Smartgraphs.ACTIVITY_DONE=SC.Responder.create({nextResponder:Smartgraphs.ACTIVITY});
sc_require("states/activity");Smartgraphs.ACTIVITY_PAGE_DONE=SC.Responder.create({nextResponder:Smartgraphs.ACTIVITY,didBecomeFirstResponder:function(){if(Smartgraphs.activityPagesController.get("isLastPage")){Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_DONE)
}else{Smartgraphs.activityController.set("canGotoNextPage",YES)}},willLoseFirstResponder:function(){Smartgraphs.activityController.set("canGotoNextPage",NO);
Smartgraphs.activityPageController.cleanup()},gotoNextPage:function(){Smartgraphs.activityPagesController.selectNextPage();
Smartgraphs.activityPageController.set("content",Smartgraphs.activityPagesController.get("selection").firstObject());
Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_LOADING)}});Smartgraphs.ResourceLoader={loadResources:function(){var b=this.get("subordinateResources");
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
sc_require("states/mixins/resource_loader");Smartgraphs.ACTIVITY_PAGE_LOADING=SC.Responder.create(Smartgraphs.ResourceLoader,{nextResponder:Smartgraphs.ACTIVITY,masterResource:{load:function(){return Smartgraphs.activityPageController.get("content")
}},subordinateResources:[{load:function(){return Smartgraphs.store.find(Smartgraphs.activityPageController.get("stepsQuery"))
}}],didBecomeFirstResponder:function(){this.loadResources()},willLoseFirstResponder:function(){this.cancelLoading()
},resourcesDidLoad:function(){Smartgraphs.activityStepController.set("content",Smartgraphs.activityPageController.get("firstStep"));
Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_LOADING)}});sc_require("states/activity");
Smartgraphs.ACTIVITY_STEP=SC.Responder.create({nextResponder:Smartgraphs.ACTIVITY,didBecomeFirstResponder:function(){Smartgraphs.activityStepController.begin()
},willLoseFirstResponder:function(){Smartgraphs.responseTemplateController.set("editingShouldBeEnabled",NO)
},setPaneConfig:function(b,a){Smartgraphs.activityViewController.setPaneConfig(a);
return YES},hidePane:function(b,a){Smartgraphs.activityViewController.hidePane(a);
return YES},showImage:function(b,a){return Smartgraphs.activityViewController.showImage(a.pane,a.path)
},showGraph:function(b,a){Smartgraphs.activityViewController.showGraph(a.pane,a.name);
return YES},showHtml:function(b,a){Smartgraphs.activityViewController.showHtml(a.pane,a.html);
return YES},showTable:function(b,a){Smartgraphs.activityViewController.showTable(a.pane,a.graphName,a.datasetName)
},waitForResponse:function(b,a){Smartgraphs.activityStepController.waitForResponse();
Smartgraphs.responseTemplateController.set("editingShouldBeEnabled",YES);return YES
},submitStep:function(){if(Smartgraphs.activityStepController.get("canSubmit")){Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_SUBMITTED)
}return YES},gotoNextPage:function(){this.submitStep();this.invokeLast(function(){Smartgraphs.sendAction("gotoNextPage")
})},createDataset:function(c,b){var d=Smartgraphs.sessionController.createDataset(b.datasetName);
if(b.graphName){var a=Smartgraphs.GraphController.controllerForName[b.graphName];
a.addDataset(d)}return YES},removeDataset:function(c,b){var a=Smartgraphs.GraphController.controllerForName[b.graphName];
a.removeDataset(b.datasetName);return YES},createAnnotation:function(d,c){var b=Smartgraphs.GraphController.controllerForName[c.graphName];
var a=Smartgraphs.sessionController.createAnnotation(c.type,c.name);b.addAnnotation(a);
return YES},addAnnotation:function(c,b){var a=Smartgraphs.GraphController.controllerForName[b.graphName];
a.addObjectByName(b.type,b.name);return YES},removeAnnotation:function(c,b){var a=Smartgraphs.GraphController.controllerForName[b.graphName];
a.removeAnnotation(b.name);return YES},startFreehandInput:function(c,b){Smartgraphs.sendAction("createAnnotation",this,{graphName:b.graphName,type:Smartgraphs.FreehandSketch,name:b.annotationName});
var a=Smartgraphs.GraphController.controllerForName[b.graphName];if(Smartgraphs.freehandInputController.register(a,b.annotationName)){Smartgraphs.makeFirstResponder(Smartgraphs.FREEHAND_INPUT)
}return YES},startSensorInput:function(d,c){Smartgraphs.sendAction("createDataset",this,{graphName:c.graphName,datasetName:c.datasetName});
var a=Smartgraphs.GraphController.controllerForName[c.graphName];var e=a&&a.findDatasetByName(c.datasetName);
if(!e){return YES}var b=a.getPath("axes.xMin");var g=a.getPath("axes.xMax");var f=Smartgraphs.activityViewController.paneForController(a);
if(Smartgraphs.sensorController.register(f,e,b,g)){Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR)
}return YES},startInteractiveSelection:function(c,b){var f=Smartgraphs.GraphController.controllerForName[b.graphName];
var e=f&&f.findDatasetByName(b.datasetName);if(!e){return YES}var d=Smartgraphs.TableController.controllerForDataset[b.datasetName];
var a=Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint,b.annotationName,{color:b.color});
f.addAnnotation(a);if(d){d.addAnnotation(a)}Smartgraphs.INTERACTIVE_SELECTION.set("annotation",a);
Smartgraphs.INTERACTIVE_SELECTION.set("dataset",e);Smartgraphs.activityStepController.disableSubmission();
Smartgraphs.makeFirstResponder(Smartgraphs.INTERACTIVE_SELECTION);return YES}});sc_require("states/activity");
sc_require("states/mixins/resource_loader");Smartgraphs.ACTIVITY_STEP_LOADING=SC.Responder.create(Smartgraphs.ResourceLoader,{nextResponder:Smartgraphs.ACTIVITY,masterResource:{load:function(){return Smartgraphs.activityStepController.get("content")
}},subordinateResources:[],didBecomeFirstResponder:function(){this.loadResources()
},willLoseFirstResponder:function(){this.cancelLoading()},resourcesDidLoad:function(){Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP)
},resourceLoadingError:function(){console.error("Error status loading subordinate resource for %s",this.get("masterResource").record.get("id"))
}});sc_require("states/activity");Smartgraphs.ACTIVITY_STEP_SUBMITTED=SC.Responder.create({nextResponder:Smartgraphs.ACTIVITY,didBecomeFirstResponder:function(){var b=Smartgraphs.activityStepController.get("content");
Smartgraphs.activityStepController.handleSubmission();var a=Smartgraphs.activityStepController.get("content");
if(a===b&&b.get("isFinalStep")){Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_DONE)
}},willLoseFirstResponder:function(){Smartgraphs.activityStepController.cleanup()
},gotoStep:function(b,a){var c=Smartgraphs.store.find(Smartgraphs.ActivityStep,a.stepId);
Smartgraphs.activityStepController.set("content",c);Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP_LOADING);
return YES},createHighlightedPointsFromSelection:function(c,a){var b=a.graphName;
a.dataset.get("selection").forEach(function(e){var d=Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint,a.highlightedPointName,{point:e})
});return YES},createHighlightedPointFromSelection:function(c,b){var a=Smartgraphs.GraphController.controllerForName[b.graphName];
var f=a&&a.findDatasetByName(b.datasetName);if(!f){return YES}var d=f.get("selection");
if(d.get("length")!==1){return YES}var e=d.firstObject();var g=Smartgraphs.sessionController.createAnnotation(Smartgraphs.HighlightedPoint,b.highlightedPointName,{point:e.get("id")});
return YES},createLineThroughPointsFromHighlightedPointAndSelection:function(a,g){var e=Smartgraphs.GraphController.controllerForName[g.graphName];
var d=e&&e.findDatasetByName(g.datasetName);if(!d){return YES}var i=d.get("selection");
if(i.get("length")!==1){return YES}var f=i.firstObject();var b=e.findAnnotationByName(g.highlightedName);
var c=g.color?g.color:"#000000";var h=Smartgraphs.sessionController.createAnnotation(Smartgraphs.LineThroughPoints,g.lineName,{point1:b.get("point").get("id"),point2:f.get("id"),color:c});
return YES}});sc_require("states/ready");Smartgraphs.ERROR_LOADING_ACTIVITY=SC.Responder.create({nextResponder:Smartgraphs.READY,didBecomeFirstResponder:function(){Smartgraphs.appWindowController.showErrorLoadingActivityView()
}});sc_require("states/activity_step");Smartgraphs.FREEHAND_INPUT=SC.Responder.create({nextResponder:Smartgraphs.ACTIVITY_STEP,didBecomeFirstResponder:function(){var a=Smartgraphs.freehandInputController.enableInput();
if(a){Smartgraphs.activityViewController.revealOnlyClearControl();Smartgraphs.activityViewController.showControls(Smartgraphs.freehandInputController.get("pane"));
Smartgraphs.makeFirstResponder(Smartgraphs.FREEHAND_INPUT_READY)}else{Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP)
}},willLoseFirstResponder:function(){Smartgraphs.freehandInputController.disableInput();
Smartgraphs.activityViewController.hideControls(Smartgraphs.freehandInputController.get("pane"))
},startFreehandInput:function(){console.error("Attempted to startFreehandInput when in FREEHAND_INPUT state");
return YES}});sc_require("states/freehand_input");Smartgraphs.FREEHAND_INPUT_COMPLETED=SC.Responder.create({nextResponder:Smartgraphs.FREEHAND_INPUT,didBecomeFirstResponder:function(){Smartgraphs.freehandInputController.stopRecording();
Smartgraphs.activityViewController.highlightClearControl()},willLoseFirstResponder:function(){},clearControlWasClicked:function(){return this.clearFreehandSketch()
},clearFreehandSketch:function(){Smartgraphs.freehandInputController.clearSketch();
Smartgraphs.makeFirstResponder(Smartgraphs.FREEHAND_INPUT_READY);return YES}});sc_require("states/freehand_input");
Smartgraphs.FREEHAND_INPUT_READY=SC.Responder.create({nextResponder:Smartgraphs.FREEHAND_INPUT,didBecomeFirstResponder:function(){Smartgraphs.activityViewController.disableAllControls();
Smartgraphs.freehandInputController.startRecording()},willLoseFirstResponder:function(){Smartgraphs.freehandInputController.stopRecording()
},freehandSketchCompleted:function(){Smartgraphs.makeFirstResponder(Smartgraphs.FREEHAND_INPUT_COMPLETED)
}});Smartgraphs.INTERACTIVE_SELECTION=SC.Responder.create({nextResponder:Smartgraphs.ACTIVITY_STEP,annotation:null,dataset:null,didBecomeFirstResponder:function(){var a=this.get("dataset");
this._oldIsSelectable=a.get("isSelectable");a.set("isSelectable",NO)},willLoseFirstResponder:function(){var a=this.get("dataset");
a.set("isSelectable",this._oldIsSelectable);this.set("dataset",null);this.set("annotation",null)
},dataPointSelected:function(b){var c=this.get("dataset");var a=b.get("content");
if(c&&a.get("dataset")===c){this.setPath("annotation.point",a);Smartgraphs.activityStepController.enableSubmission()
}},startInteractiveSelection:function(){return YES}});sc_require("states/ready");
sc_require("states/mixins/resource_loader");Smartgraphs.LOADING_ACTIVITY=SC.Responder.create(Smartgraphs.ResourceLoader,{nextResponder:Smartgraphs.READY,masterResource:{load:function(){return Smartgraphs.activityController.get("content")
}},subordinateResources:[{load:function(){return Smartgraphs.store.find(Smartgraphs.activityController.get("pagesQuery"))
}}],didBecomeFirstResponder:function(){if(this.loadResources()){return}Smartgraphs.appWindowController.showActivityLoadingView()
},willLoseFirstResponder:function(){this.cancelLoading()},resourcesDidLoad:function(){Smartgraphs.sessionController.newSession();
var a=Smartgraphs.activityController.get("pages");Smartgraphs.activityPagesController.set("content",a);
if(a.get("length")>0){Smartgraphs.activityPagesController.selectFirstPage()}Smartgraphs.activityPageController.set("content",Smartgraphs.activityPagesController.get("selection").firstObject());
Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_PAGE_LOADING)},resourceLoadingError:function(){Smartgraphs.makeFirstResponder(Smartgraphs.ERROR_LOADING_ACTIVITY)
},openActivity:function(b,a){if(a.id===Smartgraphs.activityController.getPath("content.id")){return YES
}Smartgraphs.invokeLater(Smartgraphs.resetFirstResponder);return NO}});Smartgraphs.LOGIN=SC.Responder.create({nextResponder:null,didBecomeFirstResponder:function(){Smartgraphs.userController.set("content",Smartgraphs.store.find(Smartgraphs.User,"default"));
Smartgraphs.makeFirstResponder(Smartgraphs.READY)}});sc_require("states/activity_step");
Smartgraphs.SENSOR=SC.Responder.create({nextResponder:Smartgraphs.ACTIVITY_STEP,didBecomeFirstResponder:function(){var a=Smartgraphs.sensorController.enableInput();
if(!a){Smartgraphs.makeFirstResponder(Smartgraphs.ACTIVITY_STEP)}},willLoseFirstResponder:function(){Smartgraphs.sensorController.disableInput();
Smartgraphs.activityViewController.hideControls()},sensorHasLoaded:function(){Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_LOADED);
return YES},waitForSensorToLoad:function(){Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_LOADING);
return YES}});sc_require("states/sensor");Smartgraphs.SENSOR_LOADED=SC.Responder.create({nextResponder:Smartgraphs.SENSOR,didBecomeFirstResponder:function(){Smartgraphs.activityViewController.revealAllControls();
Smartgraphs.activityViewController.showControls(Smartgraphs.sensorController.get("pane"));
Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_READY)},willLoseFirstResponder:function(){}});
sc_require("states/sensor");Smartgraphs.SENSOR_LOADING=SC.Responder.create({nextResponder:Smartgraphs.SENSOR,didBecomeFirstResponder:function(){Smartgraphs.activityViewController.showSensorLoadingView(Smartgraphs.sensorController.get("pane"))
},willLoseFirstResponder:function(){}});sc_require("states/sensor_loaded");Smartgraphs.SENSOR_READY=SC.Responder.create({nextResponder:Smartgraphs.SENSOR_LOADED,didBecomeFirstResponder:function(){Smartgraphs.activityViewController.highlightStartControl()
},willLoseFirstResponder:function(){},startControlWasClicked:function(){return this.startSensor()
},startSensor:function(){Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_RECORDING);
return YES}});sc_require("states/sensor_loaded");Smartgraphs.SENSOR_RECORDING=SC.Responder.create({nextResponder:Smartgraphs.SENSOR_LOADED,didBecomeFirstResponder:function(){Smartgraphs.sensorController.startRecording();
Smartgraphs.activityViewController.highlightStopControl()},willLoseFirstResponder:function(){Smartgraphs.sensorController.stopRecording()
},stopControlWasClicked:function(){return this.stopSensor()},stopSensor:function(){Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_STOPPED);
return YES}});sc_require("states/sensor_loaded");Smartgraphs.SENSOR_STOPPED=SC.Responder.create({nextResponder:Smartgraphs.SENSOR_LOADED,didBecomeFirstResponder:function(){Smartgraphs.activityViewController.highlightClearControl()
},willLoseFirstResponder:function(){},clearControlWasClicked:function(){return this.clearSensor()
},clearSensor:function(){Smartgraphs.sensorController.clearRecordedData();Smartgraphs.makeFirstResponder(Smartgraphs.SENSOR_READY);
return YES}});Smartgraphs.START=SC.Responder.create({nextResponder:null,didBecomeFirstResponder:function(){Smartgraphs.makeFirstResponder(Smartgraphs.LOGIN)
}});Smartgraphs.AxisView=RaphaelViews.RaphaelView.extend({init:function(){if(this.get("type")==="x"){this.set("displayProperties","axes.xMin axes.xMax axes.xSteps axes.xLabel parentView.parentView.frame".w())
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
if(!h[e]||!h[e][b]){this._removeView(k)}}}}}},_addViewForItem:function(d,e){var b=SC.guidFor(d.constructor);
var a=d.constructor.viewClass.design({graphView:this,item:d,itemType:e}).create();
if(e==="data"){this.getPath("graphCanvasView.dataHolder").appendChild(a)}else{if(e==="annotation"){this.getPath("graphCanvasView.annotationsHolder").appendChild(a)
}}if(this._viewsByClassAndId[b]===undefined){this._viewsByClassAndId[b]={}}this._viewsByClassAndId[b][d.get("id")]=a;
var c=this.get("graphCanvasView").$("svg")[0];if(c){c.style.display="none";this.invokeLast(function(){c.style.display="block"
})}},_removeView:function(b){var c=b.get("item");var d=b.get("itemType");var a=SC.guidFor(c.constructor);
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
sc_require("views/table_item");Smartgraphs.TableView=SC.View.extend({showTableBinding:"*tableController.showTable",showLabelsBinding:"*tableController.showLabels",datasetBinding:"*tableController.dataset",xLabelBinding:"*tableController.axes.xLabelAbbreviated",yLabelBinding:"*tableController.axes.yLabelAbbreviated",latestXBinding:"*tableController.latestX",latestYBinding:"*tableController.latestY",fix:function(a,b){return(a===undefined||a===null)?null:a.toFixed(b)
},numericX:function(){return this.fix(this.get("latestX"),1)}.property("latestX").cacheable(),numericY:function(){return this.fix(this.get("latestY"),2)
}.property("latestY").cacheable(),layout:{top:10,bottom:10},childViews:["numericView","tableColumnView"],numericView:SC.View.design({layout:{width:300,centerX:-10,height:90,centerY:-10},childViews:["xs","ys"],xs:SC.View.design({layout:{left:0,width:100},childViews:["xLabel","xValue"],xLabel:SC.LabelView.design({classNames:["smartgraph-numeric-view-label"],layout:{top:0,height:25},textAlign:SC.ALIGN_RIGHT,valueBinding:".parentView.parentView.parentView.xLabel"}),xValue:SC.LabelView.design({classNames:["smartgraph-numeric-view-value"],layout:{top:40},textAlign:SC.ALIGN_RIGHT,valueBinding:".parentView.parentView.parentView.numericX"})}),ys:SC.View.design({layout:{right:0,width:120},childViews:["yLabel","yValue"],yLabel:SC.LabelView.design({classNames:["smartgraph-numeric-view-label"],layout:{top:0,height:25},textAlign:SC.ALIGN_RIGHT,valueBinding:".parentView.parentView.parentView.yLabel"}),yValue:SC.LabelView.design({classNames:["smartgraph-numeric-view-value"],layout:{top:40},textAlign:SC.ALIGN_RIGHT,valueBinding:".parentView.parentView.parentView.numericY"})})}),tableColumnView:SC.View.design({layout:{width:250,centerX:0},childViews:["labelsView","scrollView"],labelsView:SC.View.design({isVisibleBinding:".parentView.parentView.showLabels",layout:{left:0,top:0,width:250,height:30},classNames:["smartgraph-table"],childViews:["xsLabel","ysLabel"],xsLabel:SC.LabelView.design({layout:{left:0,top:0,width:120,height:25},valueBinding:".parentView.parentView.parentView.xLabel"}),ysLabel:SC.LabelView.design({layout:{right:0,top:0,width:120,height:25},valueBinding:".parentView.parentView.parentView.yLabel"})}),scrollView:SC.ScrollView.design({layout:{left:0,top:35,width:250},borderStyle:SC.BORDER_NONE,contentView:SC.View.design({classNames:["smartgraph-table"],rowHeight:20,contentBinding:".parentView.parentView.parentView.parentView*tableController.arrangedObjects",selectionBinding:".parentView.parentView.parentView.parentView*tableController.selection",contentLengthBinding:".content.length",annotationsListBinding:".parentView.parentView.parentView.parentView*tableController.annotationsList",contentLengthDidChange:function(){this.adjust("height",this.get("contentLength")*this.get("rowHeight"))
}.observes("contentLength"),childViews:["xsView","ysView"],xsView:SC.ListView.design({layout:{left:0,top:0,width:120},rowHeightBinding:".parentView.rowHeight",canEditContent:NO,contentValueKey:"xRounded",contentBinding:".parentView.content",selectionBinding:".parentView.selection",exampleView:Smartgraphs.TableItemView}),ysView:SC.ListView.design({layout:{left:130,top:0,width:120},rowHeightBinding:".parentView.rowHeight",canEditContent:NO,contentValueKey:"yRounded",contentBinding:".parentView.content",selectionBinding:".parentView.selection",exampleView:Smartgraphs.TableItemView})})})}),datasetDidChange:function(){this.invokeOnce("adjustViews")
}.observes("dataset"),showTableDidChange:function(){this.invokeOnce("adjustViews")
}.observes("showTable"),adjustViews:function(){var b=this.get("tableColumnView");
var a=b.get("scrollView");var d=a.get("contentView");var c=this.get("numericView");
if(this.get("showTable")){c.set("isVisible",NO);d.bindings.forEach(function(e){e.connect()
});b.set("isVisible",YES);this.invokeLast(function(){d.adjust("height",d.getPath("content.length")*d.get("rowHeight"))
})}else{c.set("isVisible",YES);d.bindings.forEach(function(e){e.disconnect()});b.set("isVisible",NO)
}}});Smartgraphs.activityPageDef=SC.Page.extend({activityView:SC.View.design({childViews:"instructionsWrapper dataWrapper".w(),theme:"sc-ace",loadingMessage:"Loading Activity...",instructionsWrapper:SC.View.design({layout:{left:0,width:0.45},childViews:"instructionsView".w(),instructionsView:SC.View.design({classNames:"smartgraph-pane",childViews:"textWrapper".w(),textWrapper:SC.View.design({layout:{top:20,right:20,left:20},classNames:"text-wrapper".w(),childViews:"introText activityStepWrapper".w(),introText:SC.StaticContentView.design({contentBinding:"Smartgraphs.activityPageController.introText",isVisibleBinding:SC.Binding.bool("Smartgraphs.activityPageController.introText")}),activityStepWrapper:SC.View.design({useStaticLayout:YES,childViews:"activityStepDialog buttonsView".w(),activityStepDialog:SC.View.design({useStaticLayout:YES,childViews:"beforeText responseTemplate afterText".w(),classNames:"dialog-text".w(),beforeText:SC.StaticContentView.design({contentBinding:"Smartgraphs.activityStepController.beforeText",isVisibleBinding:SC.Binding.bool("Smartgraphs.activityStepController.beforeText")}),responseTemplate:Smartgraphs.ResponseTemplateView.design({fieldTypesBinding:"Smartgraphs.responseTemplateController.fieldTypes",fieldChoicesListBinding:"Smartgraphs.responseTemplateController.fieldChoicesList",valuesBinding:"Smartgraphs.responseTemplateController.values",editingShouldBeEnabledBinding:"Smartgraphs.responseTemplateController.editingShouldBeEnabled",viewShouldResetBinding:"Smartgraphs.responseTemplateController.viewShouldReset"}),afterText:SC.StaticContentView.design({contentBinding:"Smartgraphs.activityStepController.afterText",isVisibleBinding:SC.Binding.bool("Smartgraphs.activityStepController.afterText")})}),buttonsView:SC.View.design({useStaticLayout:YES,layout:{height:24},childViews:"submitButton".w(),submitButton:SC.ButtonView.design({layout:{width:180,right:0},titleBinding:"Smartgraphs.activityStepController.submitButtonTitle",isVisibleBinding:"Smartgraphs.activityViewController.showSubmitButton",isEnabledBinding:"Smartgraphs.activityViewController.enableSubmitButton",isDefaultBinding:"Smartgraphs.activityViewController.enableSubmitButton",action:"submitStep",titleDidChange:function(){var a=SC.metricsForString(this.get("title"),"label",["sc-button-label","text-wrapper"]);
this.adjust("width",a.width+48)}.observes("title")})})})})})}),dataWrapper:SC.View.design({layout:{right:0,width:0.55},childViews:"dataView".w(),dataView:SC.ContainerView.design({layout:{top:4,right:4,bottom:4,left:4},nowShowingBinding:"Smartgraphs.activityViewController.dataViewNowShowing"})})}),singlePaneDataView:SC.ContainerView.design({classNames:"smartgraph-pane",nowShowingBinding:"Smartgraphs.activityViewController.singlePaneNowShowing"}),splitPaneDataView:SC.View.design({childViews:"topPaneWrapper bottomPaneWrapper".w(),topPaneWrapper:SC.View.design({layout:{top:0,height:0.5},childViews:"topPane".w(),topPane:SC.ContainerView.design({layout:{bottom:2},classNames:"smartgraph-pane",nowShowingBinding:"Smartgraphs.activityViewController.topPaneNowShowing"})}),bottomPaneWrapper:SC.View.design({layout:{bottom:0,height:0.5},childViews:"bottomPane".w(),bottomPane:SC.ContainerView.design({layout:{top:2},classNames:"smartgraph-pane",nowShowingBinding:"Smartgraphs.activityViewController.bottomPaneNowShowing"})})}),firstImageView:SC.ImageView.design({useStaticLayout:YES,valueBinding:"Smartgraphs.activityViewController.firstImageValue",layout:{width:0.9999999,height:0.9999999}}),secondImageView:SC.ImageView.design({useStaticLayout:YES,valueBinding:"Smartgraphs.activityViewController.secondImageValue",layout:{width:0.9999999,height:0.9999999}}),firstGraphPane:Smartgraphs.GraphPane.design({graphControllerBinding:"Smartgraphs.firstGraphController",controlsNowShowingBinding:"Smartgraphs.activityViewController.firstGraphPaneControls"}),secondGraphPane:Smartgraphs.GraphPane.design({graphControllerBinding:"Smartgraphs.secondGraphController",controlsNowShowingBinding:"Smartgraphs.activityViewController.secondGraphPaneControls"}),firstTableView:Smartgraphs.TableView.design({tableControllerBinding:"Smartgraphs.firstTableController"}),secondTableView:Smartgraphs.TableView.design({tableControllerBinding:"Smartgraphs.secondTableController"}),firstHtmlView:SC.StaticContentView.design({contentBinding:"Smartgraphs.activityViewController.firstPaneHtml",classNames:["html-pane"]}),secondHtmlView:SC.StaticContentView.design({contentBinding:"Smartgraphs.activityViewController.secondPaneHtml",classNames:["html-pane"]}),errorLoadingActivityView:SC.View.design({classNames:"smartgraph-pane",childViews:"errorMessage".w(),errorMessage:SC.LabelView.design({layout:{height:32,width:500,centerX:0,centerY:0},classNames:"error",textAlign:SC.ALIGN_CENTER,value:"There was an error loading that Activity."})}),graphControlsView:SC.View.design({layout:{height:35},childViews:"startControl stopControl clearControl".w(),startControl:SC.ButtonView.design({layout:{centerX:-110,bottom:10,width:80,height:24},isVisibleBinding:"Smartgraphs.activityViewController.startControlIsVisible",isEnabledBinding:"Smartgraphs.activityViewController.startControlIsEnabled",isDefaultBinding:"Smartgraphs.activityViewController.startControlIsDefault",title:"Start",action:"startControlWasClicked"}),stopControl:SC.ButtonView.design({layout:{centerX:0,bottom:10,width:80,height:24},isVisibleBinding:"Smartgraphs.activityViewController.stopControlIsVisible",isEnabledBinding:"Smartgraphs.activityViewController.stopControlIsEnabled",isDefaultBinding:"Smartgraphs.activityViewController.stopControlIsDefault",title:"Stop",action:"stopControlWasClicked"}),clearControl:SC.ButtonView.design({layout:{centerX:110,bottom:10,width:80,height:24},isVisibleBinding:"Smartgraphs.activityViewController.clearControlIsVisible",isEnabledBinding:"Smartgraphs.activityViewController.clearControlIsEnabled",isDefaultBinding:"Smartgraphs.activityViewController.clearControlIsDefault",title:"Clear",action:"clearControlWasClicked"})}),sensorLoadingView:SC.LabelView.design({layout:{height:35,width:250,centerX:0},classNames:"sensor-message".w(),textAlign:SC.ALIGN_CENTER,value:"Loading sensor..."})});
Smartgraphs.activityPage=Smartgraphs.activityPageDef.design();Smartgraphs.appletPage=SC.Page.design({sensorAppletView:CC.SensorAppletView.design({layout:{width:1,height:1},listenerPath:"Smartgraphs.sensorController"})});
Smartgraphs.mainPage=SC.Page.design({mainPane:SC.MainPane.design({theme:"pig",defaultResponder:"Smartgraphs",childViews:"topToolbar container bottomToolbar".w(),topToolbar:SC.ToolbarView.design({anchorLocation:SC.ANCHOR_TOP,childViews:["title"],title:SC.LabelView.design({layout:{centerY:0,height:24,left:8,width:400},controlSize:SC.LARGE_CONTROL_SIZE,fontWeight:SC.BOLD_WEIGHT,valueBinding:"Smartgraphs.activityController.title"})}),container:SC.ContainerView.design({layout:{top:32,bottom:33,minWidth:960,minHeight:502},classNames:["sg-overflow-fix"],nowShowingBinding:"Smartgraphs.appWindowController.nowShowing"}),bottomToolbar:SC.ToolbarView.design({anchorLocation:SC.ANCHOR_BOTTOM,childViews:["backButton","pageButtons","nextButton"],backButton:SC.ButtonView.design({layout:{left:20,centerY:0,height:24,width:80},title:"Back",theme:"capsule",action:"gotoPrevPage",isSwipeLeft:YES,isEnabled:NO}),pageButtons:SC.SegmentedView.design({layout:{left:120,right:120,height:24,centerY:0},classNames:["sc-regular-size"],itemsBinding:"Smartgraphs.activityPagesController",itemTitleKey:"pageNumberAsString",itemValueKey:"pageNumber",valueBinding:"Smartgraphs.activityPagesController.currentPageNumber"}),nextButton:SC.ButtonView.design({layout:{right:20,centerY:0,height:24,width:80},title:"Next",theme:"capsule",action:"gotoNextPage",isSwipeRight:YES,isVisibleBinding:"Smartgraphs.activityViewController.showNextPageButton",isEnabledBinding:"Smartgraphs.activityViewController.enableNextPageButton",isDefaultBinding:"Smartgraphs.activityViewController.enableNextPageButton"})})}),loadingView:SC.View.design({classNames:"smartgraph-pane".w(),childViews:"loadingIconView loadingMessageView".w(),loadingIconView:SC.ImageView.design({layout:{width:48,height:48,centerX:0,centerY:-39},value:"/static/smartgraphs/en/4f44795fdc13fc0067e8c40075bbcb4e9712013b/resources/images/pane_loading.gif"}),loadingMessageView:SC.LabelView.design({classNames:"loading".w(),layout:{width:200,height:24,centerX:0,centerY:15},textAlign:SC.ALIGN_CENTER,valueBinding:"Smartgraphs.appWindowController.loadingMessage"})})});
Smartgraphs.main=function main(){Smartgraphs.dataSource=Smartgraphs.CouchDataSource.create();
Smartgraphs.store=SC.Store.create().from(Smartgraphs.dataSource);Smartgraphs.getPath("mainPage.mainPane").append();
if(!window.location.hash){window.location.hash="/shared/boiling-water"}window.onbeforeunload=function(){return"You will lose your place in the activity if you leave this page."
};Smartgraphs.makeFirstResponder(Smartgraphs.START)};function main(){Smartgraphs.main()
};