(function(){var a="pig";if(!SC.BUNDLE_INFO){throw"SC.BUNDLE_INFO is not defined!"
}if(SC.BUNDLE_INFO[a]){return}SC.BUNDLE_INFO[a]={requires:["sproutcore/ace"],styles:["/static/pig/en/aaa2036d9820bacbc85107807851544740ec501b/stylesheet-packed.css","/static/pig/en/aaa2036d9820bacbc85107807851544740ec501b/stylesheet.css"],scripts:["/static/pig/en/aaa2036d9820bacbc85107807851544740ec501b/javascript-packed.js","/static/pig/en/aaa2036d9820bacbc85107807851544740ec501b/javascript.js"]}
})();Smartgraphs=SC.Application.create({NAMESPACE:"Smartgraphs",VERSION:"0.1.0",DATA_FORMAT_VERSION:5,rootStore:function(){var a=Smartgraphs.store;
while(a.get("parentStore")){a=a.get("parentStore")}return a}.property(),_nextGuid:1000,getNextGuid:function(){return this._nextGuid++
},trace:YES,logDataSource:YES,showOutline:YES});SC.CONTEXT_MENU_ENABLED=YES;Smartgraphs.activityDocs=Smartgraphs.activityDocs||{};
Smartgraphs.activityDocs["/shared/instantaneous-speed"]={_id:"instantanous-speed.df5",_rev:"10-bfcf2cf128db41df9bd9141454564e9d",data_format_version:5,activity:{title:"Instantaneous Speed (Slope Tool)",url:"/shared/instantaneous-speed",owner:"shared",pages:["/shared/instantaneous-speed/page/12","/shared/instantaneous-speed/page/13","/shared/instantaneous-speed/page/14"],datasets:["/shared/instantaneous-speed/dataset/slope-data"],units:[],axes:["/shared/instantaneous-speed/axes/10s","/shared/instantaneous-speed/axes/15m"],graphs:[],responseTemplates:["/components/response-template/open","/components/response-template/numeric"]},pages:[{name:"Instantaneous Speed I",url:"/shared/instantaneous-speed/page/12",activity:"/shared/instantaneous-speed",index:12,introText:"<h1>Analysis</h1><p>Suppose you collected some actual position-time data while walking from 0 to 15 meters and displayed your data to the right. Let's find out how fast you walked during different time intervals.</p><p>First you will pick two points that are next to each other and find the velocity between those points. This calculation will be close to your <b>instantaneous</b> velocity. </p>",steps:["/shared/instantaneous-speed/page/12/step/1","/shared/instantaneous-speed/page/12/step/2","/shared/instantaneous-speed/page/12/step/3","/shared/instantaneous-speed/page/12/step/4","/shared/instantaneous-speed/page/12/step/5","/shared/instantaneous-speed/page/12/step/6","/shared/instantaneous-speed/page/12/step/7","/shared/instantaneous-speed/page/12/step/8","/shared/instantaneous-speed/page/12/step/9","/shared/instantaneous-speed/page/12/step/10","/shared/instantaneous-speed/page/12/step/11","/shared/instantaneous-speed/page/12/step/12","/shared/instantaneous-speed/page/12/step/13","/shared/instantaneous-speed/page/12/step/14","/shared/instantaneous-speed/page/12/step/15","/shared/instantaneous-speed/page/12/step/16"],firstStep:"/shared/instantaneous-speed/page/12/step/1"},{name:"Instantaneous Speed II",url:"/shared/instantaneous-speed/page/13",activity:"/shared/instantaneous-speed",index:13,introText:"<h1>Analysis</h1><p>Now you will pick another set of points that are next to each other and find the velocity between those points.</p>",steps:["/shared/instantaneous-speed/page/13/step/1","/shared/instantaneous-speed/page/13/step/1a","/shared/instantaneous-speed/page/13/step/2","/shared/instantaneous-speed/page/13/step/3","/shared/instantaneous-speed/page/13/step/4","/shared/instantaneous-speed/page/13/step/5","/shared/instantaneous-speed/page/13/step/6","/shared/instantaneous-speed/page/13/step/7","/shared/instantaneous-speed/page/13/step/8","/shared/instantaneous-speed/page/13/step/9","/shared/instantaneous-speed/page/13/step/10","/shared/instantaneous-speed/page/13/step/11","/shared/instantaneous-speed/page/13/step/12","/shared/instantaneous-speed/page/13/step/13","/shared/instantaneous-speed/page/13/step/14","/shared/instantaneous-speed/page/13/step/15","/shared/instantaneous-speed/page/13/step/16"],firstStep:"/shared/instantaneous-speed/page/13/step/1"},{name:"Instantaneous Speed III",url:"/shared/instantaneous-speed/page/14",activity:"/shared/instantaneous-speed",index:14,steps:["/shared/instantaneous-speed/page/14/step/1"],firstStep:"/shared/instantaneous-speed/page/14/step/1",introText:"<h1>Analysis</h1><p>Was your velocity the same during the two different time intervals? If not, during which interval were you going faster? Explain how you know.</p>"}],steps:[{url:"/shared/instantaneous-speed/page/12/step/1",activityPage:"/shared/instantaneous-speed/page/12",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A"]}},beforeText:"<p>Select a point and then click <b>OK</b>.</p>",tools:[{type:"interactiveSelection",annotation:"first-point-A",dataset:"slope-data"}],defaultBranch:"/shared/instantaneous-speed/page/12/step/2",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/12/step/2",activityPage:"/shared/instantaneous-speed/page/12",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A"]}},beforeText:"<p>Select a point next to to the first point. Then click <b>OK</b>.</p>",tools:[{type:"interactiveSelection",annotation:"second-point-A",dataset:"slope-data"}],responseBranches:[{criterion:["=",1,["absDiff",["indexOf","first-point-A"],["indexOf","second-point-A"]]],step:"/shared/instantaneous-speed/page/12/step/4"}],defaultBranch:"/shared/instantaneous-speed/page/12/step/3",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/12/step/3",activityPage:"/shared/instantaneous-speed/page/12",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A"]}},beforeText:"<p>To calculate velocity in a small time interval, select a point that is next to the first point. Then click <b>OK</b>.</p>",tools:[{type:"interactiveSelection",annotation:"second-point-A",dataset:"slope-data"}],responseBranches:[{criterion:["=",1,["absDiff",["indexOf","first-point-A"],["indexOf","second-point-A"]]],step:"/shared/instantaneous-speed/page/12/step/4"}],defaultBranch:"/shared/instantaneous-speed/page/12/step/3",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/12/step/4",activityPage:"/shared/instantaneous-speed/page/12",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","slope-line-A"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A"]}},beforeText:"<p>Here is the line connecting the two points you selected. The velocity during this interval is the slope of this line.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",responseTemplate:"/components/response-template/numeric",contextVars:[{name:"start-position",value:["coord","y",["listItem",1,["slopeToolOrder","first-point-A","second-point-A"]]]},{name:"end-position",value:["coord","y",["listItem",2,["slopeToolOrder","first-point-A","second-point-A"]]]},{name:"change-position",value:["-",["get","end-position"],["get","start-position"]]},{name:"change-position-units",value:["pluralizeUnits","/builtins/units/meters",["get","change-position"]]},{name:"start-time",value:["coord","x",["listItem",1,["slopeToolOrder","first-point-A","second-point-A"]]]},{name:"end-time",value:["coord","x",["listItem",2,["slopeToolOrder","first-point-A","second-point-A"]]]},{name:"change-time",value:["-",["get","end-time"],["get","start-time"]]},{name:"change-time-units",value:["pluralizeUnits","/builtins/units/seconds",["get","change-time"]]},{name:"velocity",value:["/",["get","change-position"],["get","change-time"]]},{name:"velocity-units",value:["pluralizeUnits","/builtins/units/meters-per-second",["get","velocity"]]}],submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["slope","first-point-A","second-point-A"],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/12/step/16"}],defaultBranch:"/shared/instantaneous-speed/page/12/step/5",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/12/step/5",activityPage:"/shared/instantaneous-speed/page/12",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","slope-line-A"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A"]}},beforeText:"<p>Incorrect.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",responseTemplate:"/components/response-template/numeric",afterText:"<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["slope","first-point-A","second-point-A"],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/12/step/16"}],defaultBranch:"/shared/instantaneous-speed/page/12/step/6",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/12/step/6",activityPage:"/shared/instantaneous-speed/page/12",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","slope-line-A"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A"]}},beforeText:"<p>Incorrect.</p><p>What is the change in position?</p>",responseTemplate:"/components/response-template/numeric",afterText:"<p>Hint: Look at the graph.</p>",startCommands:[{action:"createRiseArrow",literalArgs:{arrowName:"rise-arrow-A",firstPoint:"first-point-A",secondPoint:"second-point-A",color:"#cccccc",isHighlighted:true}},{action:"addAnnotation",literalArgs:{name:"rise-arrow-A",pane:"top"}}],submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["delta","y",["slopeToolOrder","first-point-A","second-point-A"]],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/12/step/10"}],defaultBranch:"/shared/instantaneous-speed/page/12/step/7",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/12/step/7",activityPage:"/shared/instantaneous-speed/page/12",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","slope-line-A","rise-arrow-A"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A"]}},beforeText:"<p>Incorrect.</p><p>What is the change in position?</p>",responseTemplate:"/components/response-template/numeric",afterText:"<p>Hint: Look at the table and the graph.</p>",startCommands:[{action:"createRiseBracket",literalArgs:{bracketName:"rise-bracket-A",point1:"first-point-A",point2:"second-point-A",datasetName:"slope-data",color:"#cccccc",isHighlighted:true}},{action:"addAnnotation",literalArgs:{name:"rise-bracket-A",tableName:"slope-data"}}],submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["delta","y",["slopeToolOrder","first-point-A","second-point-A"]],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/12/step/10"}],defaultBranch:"/shared/instantaneous-speed/page/12/step/8",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/12/step/8",activityPage:"/shared/instantaneous-speed/page/12",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","slope-line-A","rise-arrow-A"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","rise-bracket-A"]}},beforeText:"<p>Incorrect. The change in position is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",substitutedExpressions:["end-position","start-position","change-position","change-position-units"],defaultBranch:"/shared/instantaneous-speed/page/12/step/9",submitButtonTitle:"Continue"},{url:"/shared/instantaneous-speed/page/12/step/9",activityPage:"/shared/instantaneous-speed/page/12",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","slope-line-A","rise-arrow-A"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","rise-bracket-A"]}},beforeText:"<p>What is the change in time? </p>",responseTemplate:"/components/response-template/numeric",afterText:"<p>Hint:Look at the graph.</p>",startCommands:[{action:"setAnnotationAttribute",literalArgs:{name:"rise-arrow-A",isHighlighted:false}},{action:"setAnnotationAttribute",literalArgs:{name:"rise-bracket-A",isHighlighted:false}},{action:"createRunArrow",literalArgs:{arrowName:"run-arrow-A",firstPoint:"first-point-A",secondPoint:"second-point-A",color:"#cccccc",isHighlighted:true}},{action:"addAnnotation",literalArgs:{name:"run-arrow-A",pane:"top"}}],submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["delta","x",["slopeToolOrder","first-point-A","second-point-A"]],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/12/step/13"}],defaultBranch:"/shared/instantaneous-speed/page/12/step/11",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/12/step/10",activityPage:"/shared/instantaneous-speed/page/12",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","slope-line-A","rise-arrow-A"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","rise-bracket-A"]}},beforeText:"<p>Correct!</p><p>What is the change in time? </p>",responseTemplate:"/components/response-template/numeric",afterText:"<p>Hint:Look at the graph.</p>",startCommands:[{action:"createRunArrow",literalArgs:{arrowName:"run-arrow-A",firstPoint:"first-point-A",secondPoint:"second-point-A",color:"#cccccc",isHighlighted:true}},{action:"addAnnotation",literalArgs:{name:"run-arrow-A",graphName:"slope-graph"}}],submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["delta","x",["slopeToolOrder","first-point-A","second-point-A"]],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/12/step/13"}],defaultBranch:"/shared/instantaneous-speed/page/12/step/11",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/12/step/11",activityPage:"/shared/instantaneous-speed/page/12",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","slope-line-A","rise-arrow-A","run-arrow-A"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","rise-bracket-A"]}},beforeText:"<p>Incorrect.</p><p>What is the change in time?</p>",responseTemplate:"/components/response-template/numeric",afterText:"<p>Hint: Look at the table and the graph.</p>",startCommands:[{action:"createRunBracket",literalArgs:{bracketName:"run-bracket-A",point1:"first-point-A",point2:"second-point-A",datasetName:"slope-data",color:"#cccccc",isHighlighted:true}},{action:"addAnnotation",literalArgs:{name:"run-bracket-A",tableName:"slope-data"}}],submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["delta","x",["slopeToolOrder","first-point-A","second-point-A"]],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/12/step/13"}],defaultBranch:"/shared/instantaneous-speed/page/12/step/12",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/12/step/12",activityPage:"/shared/instantaneous-speed/page/12",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","slope-line-A","rise-arrow-A","run-arrow-A"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","rise-bracket-A","run-bracket-A"]}},beforeText:"<p>Incorrect. The change in time is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",substitutedExpressions:["end-time","start-time","change-time","change-time-units"],defaultBranch:"/shared/instantaneous-speed/page/12/step/13",submitButtonTitle:"Continue"},{url:"/shared/instantaneous-speed/page/12/step/13",activityPage:"/shared/instantaneous-speed/page/12",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","slope-line-A"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A"]}},beforeText:"<p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",responseTemplate:"/components/response-template/numeric",substitutedExpressions:["change-position","change-position-units","change-time","change-time-units"],submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["slope","first-point-A","second-point-A"],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/12/step/16"}],defaultBranch:"/shared/instantaneous-speed/page/12/step/14",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/12/step/14",activityPage:"/shared/instantaneous-speed/page/12",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","slope-line-A"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A"]}},beforeText:"<p>Incorrect.</p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",responseTemplate:"/components/response-template/numeric",afterText:"<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",substitutedExpressions:["change-position","change-position-units","change-time","change-time-units"],submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["slope","first-point-A","second-point-A"],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/12/step/16"}],defaultBranch:"/shared/instantaneous-speed/page/12/step/15",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/12/step/15",activityPage:"/shared/instantaneous-speed/page/12",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","slope-line-A"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A"]}},beforeText:"<p>Incorrect.</p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, the velocity is <b>%@</b> divided by <b>%@</b>, or <b>%@</b> %@.</p>",substitutedExpressions:["change-position","change-position-units","change-time","change-time-units","change-position","change-time","velocity","velocity-units"],shouldFinishImmediately:true,isFinalStep:true,hideSubmitButton:true},{url:"/shared/instantaneous-speed/page/12/step/16",activityPage:"/shared/instantaneous-speed/page/12",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","slope-line-A"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A"]}},beforeText:"<p>Correct!</p><p>The position changed <b>%@</b> %@ in <b>%@</b> %@, so the velocity was <b>%@</b> %@.</p>",substitutedExpressions:["change-position","change-position-units","change-time","change-time-units","velocity","velocity-units"],shouldFinishImmediately:true,isFinalStep:true,hideSubmitButton:true},{url:"/shared/instantaneous-speed/page/13/step/1",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B"]}},beforeText:"<p>Choose a point that is different from those you selected earlier. Then click <b>OK</b>.</p>",tools:[{type:"interactiveSelection",annotation:"first-point-B",dataset:"slope-data"}],startCommands:[{action:"setAnnotationAttribute",literalArgs:{name:"first-point-A",pointColor:"#f2b3b3"}},{action:"setAnnotationAttribute",literalArgs:{name:"second-point-A",pointColor:"#f2b3b3"}}],responseBranches:[{criterion:["or",["samePoint","first-point-B","first-point-A"],["samePoint","first-point-B","second-point-A"]],step:"/shared/instantaneous-speed/page/13/step/1a"}],defaultBranch:"/shared/instantaneous-speed/page/13/step/2",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/13/step/1a",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B"]}},beforeText:"<p>Try again.</p><p>Choose a point that is <b>different</b> from those you selected earlier. Then click <b>OK</b>.</p>",tools:[{type:"interactiveSelection",annotation:"first-point-B",dataset:"slope-data"}],responseBranches:[{criterion:["or",["samePoint","first-point-B","first-point-A"],["samePoint","first-point-B","second-point-A"]],step:"/shared/instantaneous-speed/page/13/step/1a"}],defaultBranch:"/shared/instantaneous-speed/page/13/step/2",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/13/step/2",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B","second-point-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B","second-point-B"]}},beforeText:"<p>Select a point next to to the first point. Then click <b>OK</b>.</p>",tools:[{type:"interactiveSelection",annotation:"second-point-B",dataset:"slope-data"}],responseBranches:[{criterion:["=",1,["absDiff",["indexOf","first-point-B"],["indexOf","second-point-B"]]],step:"/shared/instantaneous-speed/page/13/step/4"}],defaultBranch:"/shared/instantaneous-speed/page/13/step/3",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/13/step/3",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B","second-point-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B","second-point-B"]}},beforeText:"<p>To calculate velocity in a small time interval, select a point that is next to the first point. Then click <b>OK</b>.</p>",tools:[{type:"interactiveSelection",annotation:"second-point-B",dataset:"slope-data"}],responseBranches:[{criterion:["=",1,["absDiff",["indexOf","first-point-B"],["indexOf","second-point-B"]]],step:"/shared/instantaneous-speed/page/13/step/4"}],defaultBranch:"/shared/instantaneous-speed/page/13/step/3",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/13/step/4",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B","second-point-B","slope-line-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B","second-point-B"]}},beforeText:"<p>Here is the line connecting the two points you selected. The velocity during this interval is the slope of this line.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",responseTemplate:"/components/response-template/numeric",contextVars:[{name:"start-position",value:["coord","y",["listItem",1,["slopeToolOrder","first-point-B","second-point-B"]]]},{name:"end-position",value:["coord","y",["listItem",2,["slopeToolOrder","first-point-B","second-point-B"]]]},{name:"change-position",value:["-",["get","end-position"],["get","start-position"]]},{name:"change-position-units",value:["pluralizeUnits","/builtins/units/meters",["get","change-position"]]},{name:"start-time",value:["coord","x",["listItem",1,["slopeToolOrder","first-point-B","second-point-B"]]]},{name:"end-time",value:["coord","x",["listItem",2,["slopeToolOrder","first-point-B","second-point-B"]]]},{name:"change-time",value:["-",["get","end-time"],["get","start-time"]]},{name:"change-time-units",value:["pluralizeUnits","/builtins/units/seconds",["get","change-time"]]},{name:"velocity",value:["/",["get","change-position"],["get","change-time"]]},{name:"velocity-units",value:["pluralizeUnits","/builtins/units/meters-per-second",["get","velocity"]]}],submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["slope","first-point-B","second-point-B"],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/13/step/16"}],defaultBranch:"/shared/instantaneous-speed/page/13/step/5",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/13/step/5",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B","second-point-B","slope-line-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B","second-point-B"]}},beforeText:"<p>Incorrect.</p><p>What is the <b>velocity</b> between the two points, in meters per second?</p>",responseTemplate:"/components/response-template/numeric",afterText:"<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["slope","first-point-B","second-point-B"],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/13/step/16"}],defaultBranch:"/shared/instantaneous-speed/page/13/step/6",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/13/step/6",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B","second-point-B","slope-line-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B","second-point-B"]}},beforeText:"<p>Incorrect.</p><p>What is the change in position?</p>",responseTemplate:"/components/response-template/numeric",afterText:"<p>Hint: Look at the graph.</p>",startCommands:[{action:"createRiseArrow",literalArgs:{arrowName:"rise-arrow-B",firstPoint:"first-point-B",secondPoint:"second-point-B",color:"#cccccc",isHighlighted:true}},{action:"addAnnotation",literalArgs:{name:"rise-arrow-B",pane:"top"}}],submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["delta","y",["slopeToolOrder","first-point-B","second-point-B"]],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/13/step/10"}],defaultBranch:"/shared/instantaneous-speed/page/13/step/7",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/13/step/7",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B","second-point-B","slope-line-B","rise-arrow-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B","second-point-B"]}},beforeText:"<p>Incorrect.</p><p>What is the change in position?</p>",responseTemplate:"/components/response-template/numeric",afterText:"<p>Hint: Look at the table and the graph.</p>",startCommands:[{action:"createRiseBracket",literalArgs:{bracketName:"rise-bracket-B",point1:"first-point-B",point2:"second-point-B",datasetName:"slope-data",color:"#cccccc",isHighlighted:true}},{action:"addAnnotation",literalArgs:{name:"rise-bracket-B",tableName:"slope-data"}}],submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["delta","y",["slopeToolOrder","first-point-B","second-point-B"]],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/13/step/10"}],defaultBranch:"/shared/instantaneous-speed/page/13/step/8",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/13/step/8",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B","second-point-B","slope-line-B","rise-arrow-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B","second-point-B","rise-bracket-B"]}},beforeText:"<p>Incorrect. The change in position is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",substitutedExpressions:["end-position","start-position","change-position","change-position-units"],defaultBranch:"/shared/instantaneous-speed/page/13/step/9",submitButtonTitle:"Continue"},{url:"/shared/instantaneous-speed/page/13/step/9",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B","second-point-B","slope-line-B","rise-arrow-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B","second-point-B","rise-bracket-B"]}},beforeText:"<p>What is the change in time? </p>",responseTemplate:"/components/response-template/numeric",afterText:"<p>Hint:Look at the graph.</p>",startCommands:[{action:"setAnnotationAttribute",literalArgs:{name:"rise-arrow-B",isHighlighted:false}},{action:"setAnnotationAttribute",literalArgs:{name:"rise-bracket-B",isHighlighted:false}},{action:"createRunArrow",literalArgs:{arrowName:"run-arrow-B",firstPoint:"first-point-B",secondPoint:"second-point-B",color:"#cccccc",isHighlighted:true}},{action:"addAnnotation",literalArgs:{name:"run-arrow-B",pane:"top"}}],submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["delta","x",["slopeToolOrder","first-point-B","second-point-B"]],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/13/step/13"}],defaultBranch:"/shared/instantaneous-speed/page/13/step/11",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/13/step/10",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B","second-point-B","slope-line-B","rise-arrow-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B","second-point-B","rise-bracket-B"]}},beforeText:"<p>Correct!</p><p>What is the change in time? </p>",responseTemplate:"/components/response-template/numeric",afterText:"<p>Hint:Look at the graph.</p>",startCommands:[{action:"setAnnotationAttribute",literalArgs:{name:"rise-arrow-B",isHighlighted:false}},{action:"setAnnotationAttribute",literalArgs:{name:"rise-bracket-B",isHighlighted:false}},{action:"createRunArrow",literalArgs:{arrowName:"run-arrow-B",firstPoint:"first-point-B",secondPoint:"second-point-B",color:"#cccccc",isHighlighted:true}},{action:"addAnnotation",literalArgs:{name:"run-arrow-B",pane:"top"}}],submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["delta","x",["slopeToolOrder","first-point-B","second-point-B"]],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/13/step/13"}],defaultBranch:"/shared/instantaneous-speed/page/13/step/11",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/13/step/11",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B","second-point-B","slope-line-B","rise-arrow-B","run-arrow-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B","second-point-B","rise-bracket-B"]}},beforeText:"<p>Incorrect.</p><p>What is the change in time?</p>",responseTemplate:"/components/response-template/numeric",afterText:"<p>Hint: Look at the table and the graph.</p>",startCommands:[{action:"createRunBracket",literalArgs:{bracketName:"run-bracket-B",point1:"first-point-B",point2:"second-point-B",datasetName:"slope-data",color:"#cccccc",isHighlighted:true}},{action:"addAnnotation",literalArgs:{name:"run-bracket-B",tableName:"slope-data"}}],submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["delta","x",["slopeToolOrder","first-point-B","second-point-B"]],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/13/step/13"}],defaultBranch:"/shared/instantaneous-speed/page/13/step/12",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/13/step/12",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B","second-point-B","slope-line-B","rise-arrow-B","run-arrow-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B","second-point-B","rise-bracket-B","run-bracket-B"]}},beforeText:"<p>Incorrect. The change in time is <b>%@</b> - <b>%@</b>, or <b>%@</b> %@.</p>",substitutedExpressions:["end-time","start-time","change-time","change-time-units"],defaultBranch:"/shared/instantaneous-speed/page/13/step/13",submitButtonTitle:"Continue"},{url:"/shared/instantaneous-speed/page/13/step/13",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B","second-point-B","slope-line-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B","second-point-B"]}},beforeText:"<p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",responseTemplate:"/components/response-template/numeric",substitutedExpressions:["change-position","change-position-units","change-time","change-time-units"],submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["slope","first-point-B","second-point-B"],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/13/step/16"}],defaultBranch:"/shared/instantaneous-speed/page/13/step/14",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/13/step/14",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B","second-point-B","slope-line-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B","second-point-B"]}},beforeText:"<p>Incorrect.</p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, what is the velocity, in meters per second?</p>",responseTemplate:"/components/response-template/numeric",afterText:"<p>Hint: Recall that velocity is the change in position divided by the change in time.</p>",substitutedExpressions:["change-position","change-position-units","change-time","change-time-units"],submissibilityCriterion:["isNumeric",["responseField",1]],responseBranches:[{criterion:["withinAbsTolerance",["slope","first-point-B","second-point-B"],["responseField",1],0.1],step:"/shared/instantaneous-speed/page/13/step/16"}],defaultBranch:"/shared/instantaneous-speed/page/13/step/15",submitButtonTitle:"OK"},{url:"/shared/instantaneous-speed/page/13/step/15",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B","second-point-B","slope-line-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B","second-point-B"]}},beforeText:"<p>Incorrect.</p><p>If the change in position is <b>%@</b> %@ and the change in time is <b>%@</b> %@, the velocity is <b>%@</b> divided by <b>%@</b>, or <b>%@</b> %@.</p>",substitutedExpressions:["change-position","change-position-units","change-time","change-time-units","change-position","change-time","velocity","velocity-units"],shouldFinishImmediately:true,isFinalStep:true,hideSubmitButton:true},{url:"/shared/instantaneous-speed/page/13/step/16",activityPage:"/shared/instantaneous-speed/page/13",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","first-point-B","second-point-B","slope-line-B"]},bottom:{type:"table",dataset:"slope-data",annotations:["first-point-A","second-point-A","first-point-B","second-point-B"]}},beforeText:"<p>Correct!</p><p>The position changed <b>%@</b> %@ in <b>%@</b> %@, so the velocity was <b>%@</b> %@.</p>",substitutedExpressions:["change-position","change-position-units","change-time","change-time-units","velocity","velocity-units"],shouldFinishImmediately:true,isFinalStep:true,hideSubmitButton:true},{url:"/shared/instantaneous-speed/page/14/step/1",activityPage:"/shared/instantaneous-speed/page/14",paneConfig:"split",panes:{top:{type:"graph",title:"Position vs. Time",xAxis:"/shared/instantaneous-speed/axes/10s",yAxis:"/shared/instantaneous-speed/axes/15m",datasets:["slope-data"],annotations:["first-point-A","second-point-A","slope-line-A","first-point-B","second-point-B","slope-line-B"]}},responseTemplate:"/components/response-template/open",startCommands:[{action:"setAnnotationAttribute",literalArgs:{name:"first-point-B",pointColor:"#f2b3b3"}},{action:"setAnnotationAttribute",literalArgs:{name:"second-point-B",pointColor:"#f2b3b3"}}],submissibilityCriterion:["textLengthIsAtLeast",1,["responseField",1]],isFinalStep:true,hideSubmitButton:true,nextButtonShouldSubmit:true}],units:[],axes:[{url:"/shared/instantaneous-speed/axes/10s",units:"/builtins/units/seconds",min:0,max:10,nSteps:5,label:"Time"},{url:"/shared/instantaneous-speed/axes/15m",units:"/builtins/units/meters",min:0,max:15,nSteps:5,label:"Position"}],graphs:[],responseTemplates:[{url:"/components/response-template/open",templateString:"",fieldTypes:["textarea"],fieldChoicesList:[null],initialValues:[""]},{url:"/components/response-template/numeric",templateString:"",fieldTypes:["numeric"],fieldChoicesList:[null],initialValues:[]}],datasets:[{url:"/shared/instantaneous-speed/dataset/slope-data",name:"slope-data",activity:"/shared/instantaneous-speed",xUnits:"/builtins/units/seconds",xLabel:"Time",xShortLabel:"Time",yUnits:"/builtins/units/meters",yLabel:"Position",yShortLabel:"Position",points:[1,2,3,4,5,6,7,8,9,10,11],session:null,defaultColor:null}],datapoints:[{x:0,y:0,guid:1,dataset:"/shared/instantaneous-speed/dataset/slope-data"},{x:1,y:2,guid:2,dataset:"/shared/instantaneous-speed/dataset/slope-data"},{x:2,y:4,guid:3,dataset:"/shared/instantaneous-speed/dataset/slope-data"},{x:3,y:5,guid:4,dataset:"/shared/instantaneous-speed/dataset/slope-data"},{x:4,y:6,guid:5,dataset:"/shared/instantaneous-speed/dataset/slope-data"},{x:5,y:4,guid:6,dataset:"/shared/instantaneous-speed/dataset/slope-data"},{x:6,y:8,guid:7,dataset:"/shared/instantaneous-speed/dataset/slope-data"},{x:7,y:10,guid:8,dataset:"/shared/instantaneous-speed/dataset/slope-data"},{x:8,y:11,guid:9,dataset:"/shared/instantaneous-speed/dataset/slope-data"},{x:9,y:12,guid:10,dataset:"/shared/instantaneous-speed/dataset/slope-data"},{x:10,y:15,guid:11,dataset:"/shared/instantaneous-speed/dataset/slope-data"},{x:7,y:4,guid:"16-A"},{x:10,y:2.9,guid:"16-B"},{x:10.5,y:1.9,guid:"16-C"},{x:13,y:0.9,guid:"16-D"}],annotations:[{type:"LineThroughPoints",records:[{url:"/shared/instantaneous-speed/annotation/slope-line-A",name:"slope-line-A",activity:"/shared/instantaneous-speed",session:null,point1:"first-point-A",point2:"second-point-A",color:"#1f77b4"},{url:"/shared/instantaneous-speed/annotation/slope-line-B",name:"slope-line-B",activity:"/shared/instantaneous-speed",session:null,point1:"first-point-B",point2:"second-point-B",color:"#ff7f0d"}]},{type:"HighlightedPoint",records:[{url:"/shared/instantaneous-speed/annotation/first-point-A",name:"first-point-A",activity:"/shared/instantaneous-speed",session:null,point:null,displayStyle:"highlight-point-and-dim-background",datasetColor:"#cccccc",pointColor:"#1f77b4"},{url:"/shared/instantaneous-speed/annotation/second-point-A",name:"second-point-A",activity:"/shared/instantaneous-speed",session:null,point:null,displayStyle:"highlight-point-and-dim-background",datasetColor:"#cccccc",pointColor:"#ff7f0e"},{url:"/shared/instantaneous-speed/annotation/first-point-B",name:"first-point-B",activity:"/shared/instantaneous-speed",session:null,point:null,displayStyle:"highlight-point-and-dim-background",datasetColor:"#cccccc",pointColor:"#1f77b4"},{url:"/shared/instantaneous-speed/annotation/second-point-B",name:"second-point-B",activity:"/shared/instantaneous-speed",session:null,point:null,displayStyle:"highlight-point-and-dim-background",datasetColor:"#cccccc",pointColor:"#ff7f0e"}]}]};
Smartgraphs.activityController=SC.ObjectController.create({canGotoNextPage:NO,isSaving:NO,cleanup:function(){Smartgraphs.activityPageController.cleanup();
Smartgraphs.activityStepController.cleanup()},isDirty:function(){return !!(this.get("status")&SC.Record.DIRTY)
}.property("status"),isError:function(){return !!(this.get("status")&SC.Record.ERROR)
}.property("status"),isReady:function(){return !!(this.get("status")&SC.Record.READY)
}.property("status"),save:function(){this.get("content").commitRecord();this.set("isSaving",YES)
},_clearIsSaving:function(){if(this.get("isReady")){this.set("isSaving",NO)}}.observes("isReady"),_sendErrorSavingActivity:function(){if(this.get("isSaving")&&this.get("isError")){Smartgraphs.statechart.sendAction("errorSavingActivity")
}}.observes("isSaving","isError")});Smartgraphs.activityObjectsController=SC.Controller.create({_annotations:{},_datasets:{},_variables:{},loadPredefinedObjects:function(){var c,b,a=this;
this._datasets={};this._annotations={};this._variables={};b=function(e,d,h){var g,f;
g=SC.Query.local(e,"activity={activity}",{activity:c});f=Smartgraphs.store.find(g);
if(!(f.get("status")&SC.Record.READY)){throw"predefined %@ records are not READY!".fmt(d)
}f.forEach(function(j){var i=j.get("name");if(h[i]){throw"The activity contains multiple %@ records named '%@'".fmt(d,i)
}if(j.get("session")){throw"The predefined %@ record '%@' was incorrectly annotated with a session!".fmt(d,i)
}h[i]=j})};c=Smartgraphs.activityController.get("content");if(c){b(Smartgraphs.Dataset,"dataset",this._datasets);
b(Smartgraphs.Annotation,"annotation",this._annotations);b(Smartgraphs.Variable,"variable",this._variables)
}this.notifyPropertyChange("datasetNames");this.notifyPropertyChange("annotationNames");
this.notifyPropertyChange("variableNames")},findDataset:function(a){return this._datasets[a]
},findAnnotation:function(a){return this._annotations[a]},findVariable:function(a){return this._variables[a]
},createDataset:function(b,a,d){if(this._datasets[b]){throw"The activity tried to create a dataset with name %@, which is already in use.".fmt(b)
}var c=Smartgraphs.store.createRecord(Smartgraphs.Dataset,{activity:Smartgraphs.activityController.get("id"),name:b,points:[],xUnits:a,yUnits:d});
c.set("id",Smartgraphs.getNextGuid());this._datasets[b]=c;this.notifyPropertyChange("datasetNames");
return c},createAnnotation:function(d,c,b){if(this._annotations[c]){throw"The activity tried to create an annotation with name %@, which is already in use.".fmt(c)
}var a=Smartgraphs.store.createRecord(d,SC.mixin({activity:Smartgraphs.activityController.get("id"),name:c},b));
a.set("id",Smartgraphs.getNextGuid());var e=Smartgraphs.sessionController.get("content");
if(e){a.set("session",e)}this._annotations[c]=a;this.notifyPropertyChange("annotationNames");
return a},setVariable:function(b,c){var a=this._variables[b];if(!a){a=Smartgraphs.store.createRecord(Smartgraphs.Variable,{activity:Smartgraphs.activityController.get("id"),name:b,value:null});
a.set("id",Smartgraphs.getNextGuid());this.notifyPropertyChange("variableNames")}a.set("value",c);
this._variables[b]=a;return a},getVariable:function(a){return this._variables[a]},deleteAnnotation:function(b){var a=this.findAnnotation(b);
if(!a){return NO}a.destroy();delete this._annotations[b];this.notifyPropertyChange("annotationNames");
return YES},datasetNames:function(){var b=[];for(var a in this._datasets){if(this._datasets.hasOwnProperty(a)){b.push(a)
}}return b}.property(),annotationNames:function(){var b=[];for(var a in this._annotations){if(this._annotations.hasOwnProperty(a)){b.push(a)
}}return b}.property(),variableNames:function(){var b=[];for(var a in this._variables){if(this._variables.hasOwnProperty(a)){b.push(a)
}}return b}.property()});Smartgraphs.activityOutlineController=SC.TreeController.create({allowsMultipleSelection:NO,allowsEmptySelection:YES,contentBinding:SC.Binding.oneWay("Smartgraphs.activityPagesController.outline"),isSelectable:NO,currentStepBinding:SC.Binding.oneWay("Smartgraphs.activityStepController.content"),currentPageBinding:SC.Binding.oneWay("Smartgraphs.activityPageController.content"),updateSelection:function(){var d=this.get("content");
if(!d){return}var b=d.get("pages");if(!b){return}var g=Smartgraphs.activityPageController.get("content");
var a=b.indexOf(g);if(a<0){return}var c=d.get("treeItemChildren").objectAt(a);var e=Smartgraphs.activityStepController.get("content");
var f=c.get("steps").indexOf(e);if(f<0){return}this.selectObject(c.get("treeItemChildren").objectAt(f))
}.observes("currentStep","currentPage"),selectionDidChange:function(){var a=this.get("selection").firstObject(),b=a&&a.get("step"),c=a&&a.get("page");
if(c){Smartgraphs.activityPageController.set("content",c);Smartgraphs.activityStepController.set("content",null)
}else{if(b){Smartgraphs.activityPageController.set("content",b.get("activityPage"));
Smartgraphs.activityStepController.set("content",b)}}}.observes("selection")});Smartgraphs.activityPageController=SC.ObjectController.create({pageSelectionDidChange:function(){this.setIfChanged("content",Smartgraphs.activityPagesController.get("selection").firstObject())
}.observes("Smartgraphs.activityPagesController.selection"),cleanup:function(){Smartgraphs.firstGraphController.clear();
Smartgraphs.secondGraphController.clear();Smartgraphs.firstTableController.clear();
Smartgraphs.secondTableController.clear();Smartgraphs.activityViewController.clear()
},getFromContext:function(a){var b=this.get("context");return b.hasOwnProperty(a)?b[a]:Smartgraphs.activityObjectsController.findVariable(a).get("value")
},setInContext:function(a,c){var b=this.get("context");b[a]=c}});Smartgraphs.activityPagesController=SC.ArrayController.create({allowsMultipleSelection:NO,currentPageDidChange:function(){var a=this.get("content");
var b=Smartgraphs.activityPageController.get("content");if(a&&a.indexOf(b)>=0){this.selectObject(b)
}}.observes("Smartgraphs.activityPageController.content"),currentPageNumber:function(){var a=this.get("selection").indexSetForSource(this);
return a&&a.firstObject()}.property("selection","[]").cacheable(),selectFirstPage:function(){if(this.get("length")>0){this.selectObject(this.objectAt(0))
}},selectNextPage:function(){var a=this.get("currentPageNumber");if(a+1<this.get("length")){this.selectObject(this.objectAt(a+1))
}},selectPreviousPage:function(){var a=this.get("currentPageNumber");if(a>0){this.selectObject(this.objectAt(a-1))
}},isLastPage:function(){return(this.get("currentPageNumber")>=(this.get("length")-1))
}.property("currentPageNumber","length").cacheable(),isFirstPage:function(){return(this.get("currentPageNumber")===0)
}.property("currentPageNumber").cacheable(),contentsDidChange:function(){var a=0;
this.forEach(function(b){b.set("pageNumber",a++)})}.observes("[]"),outline:function(){var a=this.getPath("content.length")||0;
return a===0?null:SC.Object.create({title:"toplevel",treeItemIsExpanded:YES,pages:this.map(function(b){return b
}),treeItemChildren:this.map(function(b){var c=1;return SC.Object.create({title:b.get("name")||"Page %@".fmt(b.get("pageNumber")+1),treeItemIsExpanded:YES,treeItemIsGrouped:NO,page:b,steps:b.get("steps"),treeItemChildren:b.get("steps").map(function(d){return SC.Object.create({title:"Step %@".fmt(c++),step:d,treeItemIsExpanded:YES,treeItemChildren:null})
})})})})}.property("[]").cacheable()});Smartgraphs.activityStepController=SC.ObjectController.create({canSubmit:NO,showSubmitButton:NO,submissibilityInspectorInstance:null,dialogTextHasContent:function(){return this.get("beforeText")||this.get("responseTemplate")||this.get("afterText")
}.property("beforeText","responseTemplate","afterText").cacheable(),cleanup:function(){var a=this.get("submissibilityInspectorInstance");
if(a){a.stopWatching();a.removeObserver("value",this,this.checkSubmissibility);a.destroy()
}this.set("submissibilityInspectorInstance",null);if(this._liveExpression){this._liveExpression.die()
}},begin:function(){this.setupPanes();Smartgraphs.responseTemplateController.setTemplate(this.get("responseTemplate"));
Smartgraphs.statechart.sendAction("enableSubmission");this.setContextVars(this.get("contextVars"));
this.startTools();this.executeCommands(this.get("startCommands"));this.processSubstitutions(this.get("substitutedExpressions"));
if(this.get("shouldFinishImmediately")){Smartgraphs.statechart.sendAction("submitStep")
}else{Smartgraphs.statechart.sendAction("waitForResponse")}},setupPanes:function(){Smartgraphs.statechart.sendAction("setPaneConfig",this,this.get("paneConfig"));
var b=this.get("panes");for(var a in b){if(!b.hasOwnProperty(a)){continue}this.setupPane(a,b[a])
}},setupPane:function(d,b){var a,c;d=Smartgraphs.activityViewController.validPaneFor(d);
if(!d){return}if(b===null){Smartgraphs.statechart.sendAction("hidePane",this,d);return
}switch(b.type){case"graph":if(!b.name){c=Smartgraphs.getNextGuid();a="graph"+c;Smartgraphs.store.createRecord(Smartgraphs.Graph,{url:c,activity:Smartgraphs.activityController.get("id"),name:a,title:b.title,xAxis:b.xAxis,yAxis:b.yAxis,initialDatasets:b.datasets,initialAnnotations:b.annotations})
}else{a=b.name}Smartgraphs.statechart.sendAction("showGraph",this,{pane:d,name:a});
return;case"table":Smartgraphs.statechart.sendAction("showTable",this,{pane:d,dataset:b.datasetName||b.dataset,annotations:b.annotations});
return;case"image":Smartgraphs.statechart.sendAction("showImage",this,{pane:d,path:b.path,caption:b.caption});
return}},setContextVars:function(a){if(!a){return}a.forEach(function(b){Smartgraphs.activityPageController.setInContext(b.name,Smartgraphs.evaluator.evaluate(b.value))
})},startTools:function(){var a=this.get("tools");a.forEach(function(b){switch(b.type){case"interactiveSelection":Smartgraphs.statechart.sendAction("startInteractiveSelection",null,{annotationName:b.annotation,datasetName:b.dataset});
break;default:throw"unknown tool "+b.type}})},executeCommands:function(a){if(!a){return
}var b=this;a.forEach(function(c){Smartgraphs.statechart.sendAction(c.action,b,c.literalArgs)
})},processSubstitutions:function(c){var e=[],b=this;if(!c){return}c.forEach(function(f){if(typeof f==="string"){e.push(Smartgraphs.activityPageController.getFromContext(f))
}else{var h=b.makeInspector(f);if(h){var g=h.inspect();e.push(g)}}});var d=this.get("beforeText");
if(d){this.set("beforeText",d.fmt.apply(d,e))}var a=this.get("afterText");if(a){this.set("afterText",a.fmt.apply(a,e))
}},enableSubmission:function(){this.set("canSubmit",YES)},disableSubmission:function(){this.set("canSubmit",NO)
},waitForResponse:function(){var b=this.get("submissibilityInspector");if(!b&&this.get("submissibilityCriterion")){var a=this;
this._liveExpression=Smartgraphs.evaluator.evaluateLive(this.get("submissibilityCriterion"),function(e){var d=a.get("canSubmit");
if(e&&!d){Smartgraphs.statechart.sendAction("enableSubmission")}else{if(d&&!e){Smartgraphs.statechart.sendAction("disableSubmission")
}}}).evaluate()}else{if(b){var c=this.makeInspector(b);if(c){this.set("submissibilityInspectorInstance",c);
Smartgraphs.statechart.sendAction("disableSubmission");c.addObserver("value",this,this.checkSubmissibility);
c.watch()}else{console.error("submissibilityInspector was truthy, but makeInspector could not make an inspector instance.")
}}}},checkSubmissibility:function(){var c=this.getPath("submissibilityInspectorInstance.value");
var b=Smartgraphs.evaluate(this.get("submissibilityCriterion"),c);var a=this.get("canSubmit");
if(b&&!a){Smartgraphs.statechart.sendAction("enableSubmission")}else{if(a&&!b){Smartgraphs.statechart.sendAction("disableSubmission")
}}},handleSubmission:function(){if(!this.get("canSubmit")){return NO}var d=this.get("responseInspector"),b=this.get("responseBranches"),e,c;
this.executeCommands(this.get("afterSubmissionCommands"));if(b&&b.length>0&&!d){for(c=0;
c<b.length;c++){e=b[c];if(Smartgraphs.evaluator.evaluate(e.criterion)){Smartgraphs.statechart.sendAction("gotoStep",this,{stepId:e.step});
return}}}else{var g=this.makeInspector(d);if(g){var f=g.inspect();for(c=0;c<b.length;
c++){e=b[c];if(Smartgraphs.evaluate(e.criterion,f)){Smartgraphs.statechart.sendAction("gotoStep",this,{stepId:e.step});
return}}}}var a=this.get("defaultBranch");if(a){Smartgraphs.statechart.sendAction("gotoStep",this,{stepId:a.get("id")})
}},makeInspector:function(b){if(!b||!b.type){return NO}var a=SC.objectForPropertyPath(b.type);
if(!a||!a.isClass||!SC.kindOf(a,Smartgraphs.Inspector)){throw"makeInspector was given an non-empty, but invalid, Inspector class name"
}return a.create({config:b.config})}});Smartgraphs.activityViewController=SC.ObjectController.create({dataViewNowShowing:null,topPaneNowShowing:null,bottomPaneNowShowing:null,singlePaneNowShowing:null,firstImageValue:null,firstImageCaption:null,secondImageValue:null,secondImageCaption:null,firstGraphPaneControls:null,secondGraphPaneControls:null,startControlIsVisible:NO,startControlIsEnabled:NO,startControlIsDefault:NO,stopControlIsVisible:NO,stopControlIsEnabled:NO,stopControlIsDefault:NO,clearControlIsVisible:NO,clearControlIsEnabled:NO,clearControlIsDefault:NO,paneIsSplit:null,canGotoNextPage:null,canGotoNextPageBinding:"Smartgraphs.activityController.canGotoNextPage",canSubmit:null,canSubmitBinding:"Smartgraphs.activityStepController.canSubmit",canSubmitBindingDefault:SC.Binding.oneWay(),isFinalStep:null,isFinalStepBinding:"Smartgraphs.activityStepController.isFinalStep",isFinalStepBindingDefault:SC.Binding.oneWay(),hideSubmitButton:null,hideSubmitButtonBinding:"Smartgraphs.activityStepController.hideSubmitButton",hideSubmitButtonBindingDefault:SC.Binding.oneWay(),nextButtonShouldSubmit:null,nextButtonShouldSubmitBinding:"Smartgraphs.activityStepController.nextButtonShouldSubmit",nextButtonShouldSubmitBindingDefault:SC.Binding.oneWay(),isFirstPage:NO,isFirstPageBinding:"Smartgraphs.activityPagesController.isFirstPage",isLastPage:NO,isLastPageBinding:"Smartgraphs.activityPagesController.isLastPage",enableBackAndForward:NO,showSubmitButton:function(){return !(this.get("hideSubmitButton")||this.get("nextButtonShouldSubmit"))
}.property("hideSubmitButton","nextButtonShouldSubmit").cacheable(),enableSubmitButton:null,enableSubmitButtonBinding:"Smartgraphs.activityStepController.canSubmit",enableSubmitButtonBindingDefault:SC.Binding.oneWay(),showNextPageButton:null,showNextPageButtonBinding:SC.Binding.not("Smartgraphs.activityPagesController.isLastPage"),highlightNextPageButton:function(){return this.get("canGotoNextPage")||(this.get("isFinalStep")&&this.get("nextButtonShouldSubmit")&&this.get("canSubmit"))
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
}}},showImage:function(d,b,a){d=this.validPaneFor(d);var c=this.firstOrSecondFor(d);
if(!c){return NO}this.set(c+"ImageValue",b);this.set(c+"ImageCaption",a||null);this.set(d+"PaneNowShowing","Smartgraphs.activityPage."+c+"ImageView");
return YES},showGraph:function(c,a){c=this.validPaneFor(c);var b=this.firstOrSecondFor(c);
if(!b){return NO}Smartgraphs.get(b+"GraphController").openGraph(a);this.set(c+"PaneNowShowing","Smartgraphs.activityPage."+b+"GraphPane");
return YES},showTable:function(e,c,b){e=this.validPaneFor(e);var d=this.firstOrSecondFor(e),a;
if(!d){return NO}a=Smartgraphs.get(d+"TableController");if(b){a.clearAnnotations()
}a.openDataset(c);a.addAnnotationsByName(b);this.set(e+"PaneNowShowing","Smartgraphs.activityPage."+d+"TableView");
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
}});Smartgraphs.AnnotationSupport={initMixin:function(){this._propertyOverridesByTarget={};
this._propertyOverrideTargetsBySource={};this.overrideQueuesByTarget={}},supportsAnnotations:YES,annotationList:null,addAnnotation:function(a){if(this.findAnnotationByName(a.get("name"))){return
}var b=this;var c=a.get("propertyOverrides")||[];c.forEach(function(d){a.addObserver(d.targetObject,b,b._targetObjectDidChange);
a.notifyPropertyChange(d.targetObject)});this.get("annotationList").pushObject(a)
},_targetObjectDidChange:function(e,c){var b=SC.guidFor(e);if(!this._propertyOverrideTargetsBySource[b]){this._propertyOverrideTargetsBySource[b]={}
}var a=this._propertyOverrideTargetsBySource[b];var d=a[c];if(d){this._removeSourceFromTarget(e,d,c)
}var f=e&&c&&e.get(c);this._addSourceToTarget(e,f,c);a[c]=f},_removeSourceFromTarget:function(f,g,d){if(!g){return
}var c=SC.guidFor(f);delete this._propertyOverrideTargetsBySource[c][d];var e=SC.guidFor(g);
var a=this.get("overrideQueuesByTarget")[e];var h=this._propertyOverridesByTarget[e];
var b=this;f.get("propertyOverrides").forEach(function(l){if(l.targetObject!==d){return
}var j=h[l.targetProperty];for(var k=0;k<j.length;k++){if(j[k].source===f){if(k===j.length-1){f.removeObserver(j[k].sourceProperty,b,b._sourcePropertyDidChange);
if(j.length>1){j[k-1].source.addObserver(j[k-1].sourceProperty,b,b._sourcePropertyDidChange);
b._sourcePropertyDidChange(j[k-1].source,j[k-1].sourceProperty)}}j.splice(k,1);break
}}if(j.length===0){a.pushObject({property:l.targetProperty,restoreBaseValue:YES})
}})},_addSourceToTarget:function(d,e,b){if(!e){return}var c=SC.guidFor(e);if(!this._propertyOverridesByTarget[c]){this._propertyOverridesByTarget[c]={}
}var f=this._propertyOverridesByTarget[c];var a=this;d.get("propertyOverrides").forEach(function(h){if(h.targetObject!==b){return
}if(!f[h.targetProperty]){f[h.targetProperty]=[]}var g=f[h.targetProperty];if(g.length>1){var i=g[g.length-1].source;
var j=g[g.length-1].sourceProperty;i.removeObserver(j,a,a._sourcePropertyDidChange)
}g.push({source:d,sourceProperty:h.sourceProperty});d.addObserver(h.sourceProperty,a,a._sourcePropertyDidChange);
a._sourcePropertyDidChange(d,h.sourceProperty)})},_sourcePropertyDidChange:function(c,b){var a=this.get("overrideQueuesByTarget");
c.get("propertyOverrides").forEach(function(d){if(d.sourceProperty!==b){return}var f=c.get(d.targetObject);
var e=SC.guidFor(f);if(!a[e]){a[e]=[]}a[e].pushObject({property:d.targetProperty,value:c.get(b)})
})},clearAnnotations:function(){var a=this;var b=(this.get("annotationList")||[]).getEach("name");
b.forEach(function(c){a.removeAnnotation(c)});this.set("annotationList",[])},removeAnnotation:function(c){var a=this.findAnnotationByName(c);
if(a){var b=this;var d=a.get("propertyOverrides")||[];d.forEach(function(e){b._removeSourceFromTarget(a,a.get(e.targetObject),e.targetObject);
a.removeObserver(e.targetObject,b,b._targetObjectDidChange)});this.get("annotationList").removeObject(a)
}},findAnnotationByName:function(a){var b=this.get("annotationList");return b?b.findProperty("name",a):null
},addAnnotationsByName:function(b){var a=this;if(!b){return}b.forEach(function(c){var d=(typeof c==="string")?c:c.name;
a.addAnnotation(Smartgraphs.activityObjectsController.findAnnotation(d))})}};sc_require("mixins/annotation_support");
Smartgraphs.GraphController=SC.ObjectController.extend(Smartgraphs.AnnotationSupport,{datasetList:null,eventQueue:[],_routeEvents:NO,colors:["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"],clear:function(){var a=this.get("name");
if(a){Smartgraphs.GraphController.controllerForName.set(a,null)}this.set("datasetList",[]);
this.clearAnnotations();this.set("content",null)},openGraph:function(e){var d=this.get("name");
if(e===d){return YES}var g=Smartgraphs.activityController.get("content");var f=g?SC.Query.local(Smartgraphs.Graph,"name={name} AND activity={activity}",{name:e,activity:Smartgraphs.activityController.get("content")}):SC.Query.local(Smartgraphs.Graph,"name={name}",{name:e});
var b=Smartgraphs.store.find(f);if(b.get("length")<1){throw"Could not open graph %@".fmt(e)
}this.clear();if(d){Smartgraphs.GraphController.controllerForName.set(d,null)}this.set("content",b.objectAt(0));
Smartgraphs.GraphController.controllerForName.set(e,this);var c=this.get("initialDatasets")||[];
var a=this;c.forEach(function(h){a.addDataset(Smartgraphs.activityObjectsController.findDataset(h))
});this.addAnnotationsByName(this.get("initialAnnotations"))},addObjectByName:function(a,c){var b;
if(SC.kindOf(a,Smartgraphs.Annotation)){b=Smartgraphs.activityObjectsController.findAnnotation(c);
if(b){this.addAnnotation(b)}}else{if(SC.kindOf(a,Smartgraphs.Dataset)){b=Smartgraphs.activityObjectsController.findDataset(c);
if(b){this.addDataset(b)}}}},addDataset:function(c){if(this.findDatasetByName(c.get("name"))){return
}var a=this.getPath("xAxis.units");var b=this.getPath("yAxis.units");if(a&&a!==c.get("xUnits")){console.error("x units of dataset %s do not match x axis units (%s)",c.get("name"),a.get("pluralName"));
return}if(b&&b!==c.get("yUnits")){console.error("y units of dataset %s do not match y axis units (%s)",c.get("name"),b.get("pluralName"));
return}c.set("color",this.getColorForDataset(c));this.get("datasetList").pushObject(c)
},removeDataset:function(b){var a=this.get("datasetList");var c=this.findDatasetByName(b);
if(c){a.removeObject(c)}},findDatasetByName:function(a){var b=this.get("datasetList");
return b?b.findProperty("name",a):null},getColorForDataset:function(f){var e=f.get("defaultColor");
var d=this.get("datasetList").getEach("color");if(e&&!d.contains(e)){return e}var b=this.get("colors");
for(var c=0,a=b.get("length");c<a;c++){if(!d.contains(b.objectAt(c))){return b.objectAt(c)
}}return b.objectAt(0)},inputAreaMouseDown:function(a,b){if(this._routeEvents){this._eventQueue.pushObject({x:a,y:b,type:Smartgraphs.freehandInputController.START})
}},inputAreaMouseDragged:function(a,b){if(this._routeEvents){this._eventQueue.pushObject({x:a,y:b,type:Smartgraphs.freehandInputController.CONTINUE})
}},inputAreaMouseUp:function(a,b){if(this._routeEvents){this._eventQueue.pushObject({x:a,y:b,type:Smartgraphs.freehandInputController.END})
}},startFreehandInput:function(){this._routeEvents=YES;this._eventQueue=[];this.set("eventQueue",this._eventQueue)
},endFreehandInput:function(){this._routeEvents=NO}});Smartgraphs.GraphController.controllerForName=SC.Object.create({});
sc_require("controllers/graph");Smartgraphs.firstGraphController=Smartgraphs.GraphController.create({viewPath:"activityPage.firstGraphPane.graphView"});
sc_require("mixins/annotation_support");Smartgraphs.TableController=SC.ArrayController.extend(Smartgraphs.AnnotationSupport,{graphController:null,graphName:null,datasetName:null,dataset:null,selectionBinding:"*dataset.selection",isSelectableBinding:"*dataset.isSelectable",isStreamingBinding:"*dataset.isStreaming",showTable:function(){return !this.get("isStreaming")
}.property("isStreaming").cacheable(),latestXBinding:"*dataset.latestPoint.xRounded",latestYBinding:"*dataset.latestPoint.yRounded",pendingDatasetName:null,datasetNamesBinding:"Smartgraphs.activityObjectsController.datasetNames",datasetNamesBindingDefault:SC.Binding.oneWay(),clear:function(){this.set("pendingDatasetName",null);
this.clearAnnotations();this.set("content",null);this.set("dataset",null);if(this.get("datasetName")){Smartgraphs.TableController.controllerForDataset.set(this.get("datasetName"),null)
}this.set("datasetName",null)},openDataset:function(b){var a=this.get("datasetName");
if(a===b){return YES}this.clear();this.set("datasetName",b);if(a){Smartgraphs.TableController.controllerForDataset.set(a,null)
}Smartgraphs.TableController.controllerForDataset.set(b,this);this.set("pendingDatasetName",b);
this.maybeUsePendingDataset()},maybeUsePendingDataset:function(){var c=this.get("pendingDatasetName");
if(!c){return}var a=Smartgraphs.activityObjectsController.get("datasetNames");if(a&&a.indexOf(c)>=0){var b=Smartgraphs.activityObjectsController.findDataset(c);
this.set("dataset",b);this.set("content",b.get("points"));this.set("pendingDatasetName",null)
}}.observes("datasetNames")});Smartgraphs.TableController.controllerForDataset=SC.Object.create({});
sc_require("controllers/table");Smartgraphs.firstTableController=Smartgraphs.TableController.create({viewPath:"activityPage.firstTableView"});
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
}.property(),register:function(f,c,b,e){if(this._inputIsEnabled){return NO}f=Smartgraphs.activityViewController.validPaneFor(f);
var a=Smartgraphs.store.find(Smartgraphs.Unit,"/builtins/units/meters");var d=Smartgraphs.store.find(Smartgraphs.Unit,"/builtins/units/seconds");
if(f&&c&&c.get("xUnits")===d&&c.get("yUnits")===a){this._pane=f;this._dataset=c;if(b){this.set("xMin",b)
}if(e){this.set("xMax",e)}return YES}return NO},enableInput:function(){if(this._inputIsEnabled||!this._pane||!this._dataset){return NO
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
}this._nsamples++}},dataStreamEvent:function(){}});Smartgraphs.sessionController=SC.ObjectController.create({beginSession:function(){if(this.get("content")){throw"beginSession was called when a session is already open!"
}Smartgraphs.set("store",Smartgraphs.store.chain());var a=Smartgraphs.store.createRecord(Smartgraphs.Session,{user:Smartgraphs.userController.get("id")});
a.set("id",Smartgraphs.getNextGuid());this.set("content",a);if(Smartgraphs.activityController.get("content")){Smartgraphs.activityController.set("content",Smartgraphs.store.find(Smartgraphs.activityController.get("content")))
}Smartgraphs.activityObjectsController.loadPredefinedObjects()},endSession:function(){if(!this.get("content")){throw"endSession was called when no session is open!"
}var g=Smartgraphs.store.get("parentStore"),a=Smartgraphs.activityController.get("id"),d=Smartgraphs.activityPageController.get("id"),e=Smartgraphs.activityStepController.get("id"),c,h,i,b,f;
if(!g){throw"Tried to end session, but there is no parent store to restore"}SC.RunLoop.begin().end();
f=Smartgraphs.store.get("changelog")||[];f.forEach(function(j){var k=Smartgraphs.store.materializeRecord(j);
if(k){console.log("destroying record %s of type ",k.get("id"),Smartgraphs.store.recordTypeFor(j));
k.storeDidChangeProperties=function(){};k._notifyPropertyObservers=function(){}}});
Smartgraphs.store.discardChanges().destroy();Smartgraphs.set("store",g);Smartgraphs.activityOutlineController.set("selection",SC.SelectionSet.create());
Smartgraphs.activityController.set("content",Smartgraphs.store.find(Smartgraphs.Activity,a));
c=Smartgraphs.activityController.get("pages");h=c&&c.findProperty("id",d)||null;i=h&&h.get("steps")||null;
b=i&&i.findProperty("id",e)||null;Smartgraphs.activityPagesController.set("content",c);
Smartgraphs.activityPageController.set("content",h);Smartgraphs.activityStepController.set("content",b);
this.set("content",null)}});Smartgraphs.toolbarController=SC.ObjectController.create({shouldShowEditButton:NO,shouldShowRunButton:NO,shouldShowSaveButton:NO,showRunButton:function(){this.set("shouldShowEditButton",NO);
this.set("shouldShowRunButton",YES)},showEditButton:function(){this.set("shouldShowEditButton",YES);
this.set("shouldShowRunButton",NO)},showSaveButton:function(){this.set("shouldShowSaveButton",YES)
},hideSaveButton:function(){this.set("shouldShowSaveButton",NO)}});Smartgraphs.userController=SC.ObjectController.create({});
Smartgraphs.CouchDataSource=SC.DataSource.extend({_ids:{},_revs:{},fetch:function(a,b){this.log("CouchDataSource.fetch()");
return NO},retrieveRecord:function(c,e){var g=c.recordTypeFor(e);var f=c.idFor(e);
this.log("CouchDataSource.retrieveRecord()");this.log("  Record type requested = %s",g.toString());
this.log("  id requested = %s",f);if(g===Smartgraphs.Activity){var b=f;var d='/db/smartgraphs/_design/app/_view/activities-by-url-and-version?key=["'+b+'",'+Smartgraphs.DATA_FORMAT_VERSION+"]";
var a=Smartgraphs.activityDocs[f]?SC.Object.create({body:{rows:[{value:Smartgraphs.activityDocs[f]}]}}):SC.Error.create();
this.didRetrieveActivity(a,c,e);return YES}this.log("returning NO from retrieveRecord");
return NO},didRetrieveActivity:function(d,c,e){if(SC.ok(d)){var a=d.get("body");this.log("retrieved response.body = ",a);
if(a&&a.rows&&a.rows.length===1&&a.rows[0].value){var f=a.rows[0].value;this.log("doc = ",f);
this.log("doc.activity = ",f.activity);this._ids[e]=f._id;this._revs[e]=f._rev;var b=this;
[["ActivityPage","pages"],["ActivityStep","steps"],["Unit","units"],["Axis","axes"],["Graph","graphs"],["ResponseTemplate","responseTemplates"],["DataPoint","datapoints"],["Dataset","datasets"]].forEach(function(g){b.loadRecordsFromArray(c,Smartgraphs[g[0]],f[g[1]])
});f.annotations.forEach(function(g){b.loadRecordsFromArray(c,Smartgraphs[g.type],g.records)
});c.dataSourceDidComplete(e,f.activity);return}}c.dataSourceDidError(e,d)},loadRecordsFromArray:function(a,c,b){b.forEach(function(d){a.loadRecord(c,d,d.url)
})},createRecord:function(a,b){return NO},markRecordBusy:function(e,c){if(c.get("store")!==e){throw"WHOOPS. Trying to mark a record busy that's from the wrong store"
}var f=c.get("storeKey");var b=e.readStatus(c.get("storeKey"));var d;var a=SC.Record;
switch(b){case a.EMPTY:case a.ERROR:throw a.NOT_FOUND_ERROR;case a.READY_NEW:d=a.BUSY_CREATING;
break;case a.READY_DIRTY:case a.READY_CLEAN:d=a.BUSY_COMMITTING;break;case a.DESTROYED_DIRTY:d=a.BUSY_DESTROYING;
break}if(d){e.writeStatus(f,d);e.dataHashDidChange(f,null,YES)}},markRecordCommitted:function(d,c){var b=SC.Record;
var e=c.get("storeKey");var a=d.readStatus(e);if(a===b.BUSY_DESTROYING){d.dataSourceDidDestroy(e)
}else{if(a&b.BUSY){d.dataSourceDidComplete(e)}}},applyToChildRecords:function(d,b,f){var c=this;
f.call(this,d,b);for(var h in b){if(SC.kindOf(b[h],SC.SingleAttribute)||SC.kindOf(b[h],SC.ManyAttribute)){var e=b[h].type;
var a=b[h].inverse;if(e&&a&&SC.objectForPropertyPath(e).prototype[a].aggregate){var g=b.get(h);
if(!g.get("isSCArray")){g=[g]}g.forEach(function(i){c.applyToChildRecords(d,i,f)})
}}}if(SC.kindOf(b,Smartgraphs.Activity)){b.get("annotations").forEach(function(i){c.applyToChildRecords(d,i,f)
})}},updateRecord:function(b,c){if(this._ids[c]){var a=b.find(b.recordTypeFor(c),b.idFor(c));
if(a&&a.serialize){var d=a.serialize();d._rev=this._revs[c];d.data_format_version=Smartgraphs.DATA_FORMAT_VERSION;
this.applyToChildRecords(b,a,this.markRecordBusy);SC.Request.putUrl("/db/smartgraphs/"+this._ids[c]).json().header("Accept","application/json").notify(this,"didUpdateActivity",b,c).send(d);
return YES}}return NO},didUpdateActivity:function(d,c,e){var b=SC.Record;var a=c.find(c.recordTypeFor(e),c.idFor(e));
if(SC.ok(d)){this.applyToChildRecords(c,a,this.markRecordCommitted);this._revs[e]=d.get("body").rev
}else{c.dataSourceDidError(e)}},destroyRecord:function(a,b){return NO},camelizeKeys:function(c){var a={};
for(var b in c){if(c.hasOwnProperty(b)){a[b.camelize()]=c[b]}}return a},log:function(){if(Smartgraphs.get("logDataSource")){if(console.log.apply){console.log.apply(console,arguments)
}else{this.log=console.log}}}});Smartgraphs.Unit=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",activity:SC.Record.toOne("Smartgraphs.Activity",{inverse:"units",isMaster:YES,aggregate:YES}),name:SC.Record.attr(String),pluralName:SC.Record.attr(String),abbreviation:SC.Record.attr(String),pluralizeFor:function(a){return Math.abs(a)===1?this.get("name"):this.get("pluralName")
}});sc_require("models/unit");Smartgraphs.Unit.FIXTURES=[{url:"/builtins/units/meters",activity:null,name:"meter",abbreviation:"m",pluralName:"meters"},{url:"/builtins/units/degrees-celsius",activity:null,name:"°C",abbreviation:"°C",pluralName:"°C"},{url:"/builtins/units/seconds",activity:null,name:"second",abbreviation:"s",pluralName:"seconds"},{url:"/builtins/units/minutes",activity:null,name:"minute",abbreviation:"min",pluralName:"minutes"},{url:"/builtins/units/meters-per-second",activity:null,name:"meter per second",abbreviation:"m/s",pluralName:"meters per second"}];
Smartgraphs.User=SC.Record.extend({userId:SC.Record.attr(String),primaryKey:"userId",name:SC.Record.attr(String),sessions:SC.Record.toMany(Smartgraphs.Session,{inverse:"user"})});
sc_require("models/user");Smartgraphs.User.FIXTURES=[{guid:"default",userId:"default",name:"Default Smartgraphs User",sessions:[]}];
Smartgraphs.Inspector=SC.Object.extend({init:function(){var a=this.get("config");
if(this.configure){this.configure(a||{})}arguments.callee.base.apply(this,arguments)
},watch:function(){},stopWatching:function(){}});sc_require("inspectors/inspector");
Smartgraphs.AnnotationInspector=Smartgraphs.Inspector.extend({annotationNames:null,annotations:null,configure:function(a){this.set("annotationNames",a.annotationNames)
},inspect:function(){var c=[];var b=this.get("annotationNames");for(var a=0;a<b.length;
a++){c.push(Smartgraphs.activityObjectsController.findAnnotation(b[a]))}this.set("annotations",c);
return c},watch:function(){},stopWatching:function(){}});sc_require("inspectors/inspector");
Smartgraphs.AnnotationAttributeInspector=Smartgraphs.Inspector.extend({annotationName:null,attributePath:null,response:null,configure:function(a){if(SC.none(a.name)){throw ("name is required for AnnotationAttributeInspector config")
}if(SC.none(a.attributePath)){throw ("attributePath is required for AnnotationAttributeInspector config")
}this.set("annotationName",a.name);this.set("attributePath",a.attributePath)},inspect:function(){var response=Smartgraphs.activityObjectsController.findAnnotation(this.get("annotationName"));
var attributes=this.get("attributePath").split(".");for(var i=0;i<attributes.length;
i++){if(typeof(response.get)=="function"){response=response.get(attributes[i])}else{eval("response = response."+attributes[i])
}}this.set("response",response);return response},watch:function(){},stopWatching:function(){}});
sc_require("inspectors/inspector");Smartgraphs.DatasetAttributeInspector=Smartgraphs.Inspector.extend({datasetName:null,attributePath:null,response:null,configure:function(a){if(SC.none(a.datasetName)){throw ("datasetName is required for DatasetAttributeInspector config")
}if(SC.none(a.attributePath)){throw ("attributePath is required for DatasetAttributeInspector config")
}this.set("datasetName",a.datasetName);this.set("attributePath",a.attributePath)},inspect:function(){var response=Smartgraphs.activityObjectsController.findDataset(this.get("datasetName"));
var attributes=this.get("attributePath").split(".");for(var i=0;i<attributes.length;
i++){if(typeof(response.get)=="function"){response=response.get(attributes[i])}else{eval("response = response."+attributes[i])
}}this.set("response",response);return response},watch:function(){},stopWatching:function(){}});
sc_require("inspectors/inspector");Smartgraphs.EvaluatorInspector=Smartgraphs.Inspector.extend({config:null,response:null,configure:function(a){this.set("config",a)
},inspect:function(){var a=Smartgraphs.evaluate(this.get("config"),"value");this.set("response",a);
return a},watch:function(){},stopWatching:function(){}});sc_require("inspectors/inspector");
Smartgraphs.ResponseFieldsInspector=Smartgraphs.Inspector.extend({value:null,fieldIndex:null,configure:function(a){this.set("fieldIndex",a.fieldIndex)
},inspect:function(){var b=Smartgraphs.responseTemplateController.get("values");var a=this.get("fieldIndex");
if(!SC.none(a)){b=b[a]}this.set("value",b);return b},watch:function(){Smartgraphs.responseTemplateController.addObserver("values.[]",this,this.inspect)
},stopWatching:function(){Smartgraphs.responseTemplateController.removeObserver("values.[]",this,this.inspect)
}});sc_require("inspectors/response_fields");Smartgraphs.FirstResponseFieldInspector=Smartgraphs.ResponseFieldsInspector.extend({configure:function(a){a.fieldIndex=0;
arguments.callee.base.apply(this,arguments)}});sc_require("inspectors/inspector");
Smartgraphs.ResponseFieldAnnotationsInspector=Smartgraphs.Inspector.extend({annotationNames:null,fieldIndex:null,response:null,configure:function(a){this.set("annotationNames",a.annotationNames);
this.set("fieldIndex",a.fieldIndex)},inspect:function(){var d=Smartgraphs.responseTemplateController.get("values");
var b=this.get("fieldIndex");if(!SC.none(b)){d=d[b]}var f=[];var e=this.get("annotationNames");
for(var c=0;c<e.length;c++){f.push(Smartgraphs.activityObjectsController.findAnnotation(e[c]))
}var a={annotations:f,fieldValue:d};this.set("response",a);return a},watch:function(){},stopWatching:function(){}});
sc_require("inspectors/inspector");Smartgraphs.ResponseFieldVariableSetter=Smartgraphs.Inspector.extend({variables:null,configure:function(a){this.set("variables",a.variables)
},inspect:function(){var e=this.get("variables");if(!SC.none(e)){var d=Smartgraphs.responseTemplateController.get("values");
for(var b in e){if(!e.hasOwnProperty(b)){continue}var c=e[b].name;var a=e[b].fieldIndex;
if(!SC.none(c)&&!SC.none(a)){if(SC.none(d[a])){throw ("No response field value found for fieldIndex %@".fmt(a))
}Smartgraphs.activityObjectsController.setVariable(c,d[a]);response=YES}}}return null
},watch:function(){},stopWatching:function(){}});sc_require("inspectors/inspector");
Smartgraphs.SelectedPointInspector=Smartgraphs.Inspector.extend({value:null,dataset:null,configure:function(a){this.set("dataset",Smartgraphs.activityObjectsController.findDataset(a.datasetName))
},inspect:function(){var c=this.get("dataset");var a=c&&c.get("selection");var b=a&&a.get("length")===1?a.firstObject():undefined;
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
}}});sc_require("inspectors/inspector");Smartgraphs.VariableInspector=Smartgraphs.Inspector.extend({evalStatement:null,variableNames:null,response:null,configure:function(a){if(SC.none(a.evalStatement)){throw ("evalStatement is required for VariableInspector config")
}if(SC.none(a.variableNames)){throw ("variableNames is required for VariableInspector config")
}this.set("evalStatement",a.evalStatement);this.set("variableNames",a.variableNames)
},inspect:function(){var evalStatement=this.get("evalStatement");var variableNames=this.get("variableNames");
for(var ind in variableNames){if(!variableNames.hasOwnProperty(ind)){continue}var variableName=variableNames[ind];
var variable=Smartgraphs.activityObjectsController.getVariable(variableName);if(SC.none(variable)){throw ("no variable exists with name '%@'".fmt(variableName))
}evalStatement=evalStatement.replace("["+ind+"]",variable.get("value"))}var response=eval(evalStatement);
this.set("response",response);return response},watch:function(){},stopWatching:function(){}});
Smartgraphs.evaluator={operators:{},def:function(b,a){if(!this.operators[b]){this.operators[b]={}
}var c=this.operators[b];if(!c.argSpec){c.argSpec={}}if(!c.deps){c.deps=[]}c.impl=a;
c.args=this.args;c.dependsOn=this.dependsOn;return c},args:function(a){this.argSpec=a;
return this},dependsOn:function(){this.deps=Array.prototype.splice.apply(arguments);
return this},evaluate:function(d){if((typeof d==="object")&&(d.splice===[].splice)){if(d.length<1){throw"Evaluator was asked to evaluate an empty expression"
}if(d[0]==="'"||d[0]==="quote"){return d[1]}var e=this.operators[d[0]];var a=d.length-1;
if(e.argSpec.n&&a!==e.argSpec.n){throw"Evaluator expected "+e.argSpec.n+" arguments, but got "+a+" arguments"
}if(e.argSpec.min&&a<e.argSpec.min){throw"Evaluator expected at least "+e.argSpec.min+" arguments, but got "+a+" arguments"
}if(e.argSpec.max&&a>e.argSpec.max){throw"Evaluator expected at most "+e.argSpec.max+" arguments, but got "+a+" arguments"
}var b=[];for(var c=1;c<d.length;c++){b[c-1]=this.evaluate(d[c])}return e.impl.apply(null,b)
}return d},evaluateLive:function(g,h){var d=[],b,f,c,a,e;f=this.collectDeps(g);e=function(){var i=Smartgraphs.evaluator.evaluate(g);
h(i)};for(c=0;c<f.length;c++){a=f[c].indexOf(".[]");if(a>0){f[c]=f[c].substr(0,a);
if(f[c].indexOf("*")<0){b=[SC.objectForPropertyPath(f[c]),"[]"]}else{b=SC.tupleForPropertyPath(f[c]);
b[1]=b[1]+".[]"}}else{b=SC.tupleForPropertyPath(f[c])}b[0].addObserver(b[1],null,e);
d.push(b)}return{die:function(){for(var j=0;j<d.length;j++){d[j][0].removeObserver(d[j][1],null,e)
}},evaluate:function(){e();return this}}},collectDeps:function(c){var a;if((typeof c==="object")&&(c.splice===[].splice)){if(c[0]==="'"||c[0]==="quote"){return[]
}var d=this.operators[c[0]];a=d.deps.concat();for(var b=1;b<c.length;b++){a=a.concat(this.collectDeps(c[b]))
}return a}return[]}};Smartgraphs.evaluator.def("+",function(){var a=0;for(var b=0;
b<arguments.length;b++){a+=arguments[b]}return a}).args({min:2});Smartgraphs.evaluator.def("-",function(){var a=arguments[0];
for(var b=1;b<arguments.length;b++){a-=arguments[b]}return a}).args({min:2});Smartgraphs.evaluator.def("absDiff",function(a,b){return Math.abs(a-b)
}).args({n:2});Smartgraphs.evaluator.def("=",function(a,b){return a===b}).args({n:2});
Smartgraphs.evaluator.def("indexOf",function(b){var a=Smartgraphs.activityObjectsController.findAnnotation(b);
if(!a){throw"Annotation "+b+" not found."}return a.getPath("point.dataset.points").indexOf(a.get("point"))
}).args({n:1});Smartgraphs.evaluator.def("isNumeric",function(a){return !isNaN(parseFloat(a))&&isFinite(a)
}).args({n:1});Smartgraphs.evaluator.def("responseField",function(b){var a=Smartgraphs.responseTemplateController.get("values");
return a[b-1]}).args({n:1}).dependsOn("Smartgraphs.responseTemplateController*values.[]");
Smartgraphs.evaluator.def("coord",function(b,c){var a=Smartgraphs.activityObjectsController.findAnnotation(c);
if(b!=="x"&&b!=="y"){throw"x or y coordinates only!"}if(!a){throw"Annotation "+c+" not found."
}if(!a.get("point")){throw"Annotation "+c+" does not have a 'point' property"}return a.get("point").get(b)
}).args({n:2});Smartgraphs.evaluator.def("slope",function(e,c){var b=Smartgraphs.activityObjectsController.findAnnotation(e);
var a=Smartgraphs.activityObjectsController.findAnnotation(c);var f=b.get("point");
var d=a.get("point");return(f.get("y")-d.get("y"))/(f.get("x")-d.get("x"))}).args({n:2});
Smartgraphs.evaluator.def("withinAbsTolerance",function(c,b,a){return Math.abs(c-b)<a
}).args({n:3});Smartgraphs.evaluator.def("slopeToolOrder",function(e,c){var b=Smartgraphs.activityObjectsController.findAnnotation(e);
var a=Smartgraphs.activityObjectsController.findAnnotation(c);var f=b.get("point");
var d=a.get("point");return f.get("x")<d.get("x")?[e,c]:[c,e]}).args({n:2});Smartgraphs.evaluator.def("delta",function(c,a){var d=Smartgraphs.activityObjectsController.findAnnotation(a[0]);
var b=Smartgraphs.activityObjectsController.findAnnotation(a[1]);var f=d.get("point");
var e=b.get("point");return e.get(c)-f.get(c)}).args({n:2});Smartgraphs.evaluator.def("or",function(){for(var a=0;
a<arguments.length;a++){if(arguments[a]){return true}}return false}).args({min:1});
Smartgraphs.evaluator.def("not",function(a){return !a}).args({n:1});Smartgraphs.evaluator.def("samePoint",function(e,c){var b=Smartgraphs.activityObjectsController.findAnnotation(e);
var a=Smartgraphs.activityObjectsController.findAnnotation(c);var f=b.get("point");
var d=a.get("point");return f&&f===d}).args({n:2});Smartgraphs.evaluator.def("textLengthIsAtLeast",function(a,b){return(b||"").strip().length>=a
}).args({n:2});Smartgraphs.evaluator.def("coord",function(c,d){var b=Smartgraphs.activityObjectsController.findAnnotation(d),a=b.get("point");
return a.get(c)}).args({n:2});Smartgraphs.evaluator.def("max",function(){return Math.max.apply(Math,arguments)
}).args({min:1});Smartgraphs.evaluator.def("min",function(){return Math.min.apply(Math,arguments)
}).args({min:1});Smartgraphs.evaluator.def("abs",function(a){return Math.abs(a)}).args({n:1});
Smartgraphs.evaluator.def("pluralizeUnits",function(c,b){var a=Smartgraphs.store.find(Smartgraphs.Unit,c);
if(!a){throw"Couldn't find units '%@'".fmt(c)}return a.pluralizeFor(b)}).args({n:2});
Smartgraphs.evaluator.def("get",function(a){return Smartgraphs.activityPageController.getFromContext(a)
}).args({n:1});Smartgraphs.evaluator.def("/",function(a,b){return a/b}).args({n:2});
Smartgraphs.evaluator.def("listItem",function(a,b){return b[a-1]}).args({n:2});sc_require("lib/evaluator");
(function(g){var q;function i(B,C){for(var A=0;A<B.length;A++){if(q(B[A],C)){return true
}}return false}function z(B,C){for(var A=0;A<B.length;A++){if(!q(B[A],C)){return false
}}return true}function o(A,B){return(q(A[0],B)>q(A[1],B))}function h(A,B){return(q(A[0],B)<q(A[1],B))
}function f(C,D){var B=q(C[0],D);var A=q(C[1],D);var E=q(C[2],D);return(B<=A&&A<=E)
}function x(C,D){var B=q(C[0],D);var A=q(C[1],D);return B-A}function d(C,D){var B=q(C[0],D);
var A=q(C[1],D);return B+A}function c(C,D){var B=q(C[0],D);var A=q(C[1],D);return B*A
}function a(C,D){var B=q(C[0],D);var A=q(C[1],D);return B/A}function w(D,E){var C=q(D[0],E);
var B=q(D[1],E);var A=Math.round(C*Math.pow(10,B))/Math.pow(10,B);return A}function l(A,B){return q(A[0],B)===q(A[1],B)
}function p(A,B){return(q(A,B)||"").strip()}function r(B,C){var A=Smartgraphs.activityObjectsController.getVariable(B);
if(A){return A.get("value")}return null}function s(C,E){var B=q(C[0],E);var D=q(C[1],E)||[];
for(var A=0;A<D.length;A++){var F=q(D[A],E);if(B===F){return true}}return false}function e(A,B){return(q(A,B)||[]).length
}function y(A,B){var C=q(A,B);return(C===0)||!!C}function k(A,B){var C=q(A,B);return C.get&&C.get("x")
}function v(C,H){var D=H.annotations;var A=H.fieldValue;var B=C.axis;var E=C.respectOrder;
if(D&&D.length==2&&A&&B){var G=D[0].get("point");var F=D[1].get("point");var I=F.get(B)-G.get(B);
if(!E){I=Math.abs(I)}return I==A}return false}function j(C,H){var D=H.annotations;
var A=H.fieldValue;if(D&&D.length==2&&A){var G=D[0].get("point");var F=D[1].get("point");
var B=G.get("dataset");if(B!=F.get("dataset")){return false}var J=F.get("x")-G.get("x");
var I=F.get("y")-G.get("y");var E=I/J;return E==A}return false}function b(B){var C=[];
var A=B.get("points");A.forEach(function(D){C.push(D.get("x"))});return C.sort(function(E,D){return E-D
})}function u(B,D){if(D.length!=2){return false}var C=D[0].get("point");var A=D[1].get("point");
var E=C.get("dataset");if(E!=A.get("dataset")){return false}var G=b(E);var H=G.indexOf(C.get("x"));
var F=G.indexOf(A.get("x"));return Math.abs(H-F)==1}function m(A,B){return parseInt(q(A,B),10)
}function n(A,B){return parseFloat(q(A,B),10)}function t(B,C){var A=q(B,C);return A.length>0&&!isNaN(A)
}q=function(C,B){if(C==="value"){return B}if(C===g||C===null||typeof(C)==="string"||typeof(C)==="number"||typeof(C)==="boolean"||C.splice===[].splice){return C
}for(var D in C){if(C.hasOwnProperty(D)){var A=C[D];switch(D){case"literal":return A;
case"variable":return r(A,B);case"or":return i(A,B);case"and":return z(A,B);case"equals":return l(A,B);
case"strip":return p(A,B);case"in":return s(A,B);case"length":return e(A,B);case"gt":return o(A,B);
case"lt":return h(A,B);case"between":return f(A,B);case"round":return w(A,B);case"notempty":return y(A,B);
case"xvalue":return k(A,B);case"int":return m(A,B);case"float":return n(A,B);case"dataPointsAreAdjacent":return u(A,B);
case"slope":return j(A,B);case"delta":return v(A,B);case"difference":return x(A,B);
case"sum":return d(A,B);case"product":return c(A,B);case"quotient":return a(A,B);
case"isNumeric":return t(A,B)}console.error('invalid expression operator: "'+D+'"');
return}}};Smartgraphs.evaluate=q}());(function(b){function a(c){c=c.replace(/[^-a-zA-Z0-9,&\s]+/ig,"");
c=c.replace(/-/gi,"_");c=c.replace(/\s/gi,"-");return c.toLowerCase()}Smartgraphs.slugify=a
}());Smartgraphs.ArrowDrawing={arrowPath:function(b,a,j,i,k,f){var e=Math.atan2((i-a),(j-b));
var h=e+f*Math.PI/180;var g=e-f*Math.PI/180;var n=j;var l=i;var d=j-k*Math.cos(h);
var c=i-k*Math.sin(h);var p=j-k*Math.cos(g);var m=i-k*Math.sin(g);var o=" M "+b+" "+a+" L "+n+" "+l+" L "+d+" "+c+" L "+p+" "+m+" L "+n+" "+l;
return o}};Smartgraphs.Activity=SC.Record.extend({init:function(){this.set("annotations",[]);
this.set("variables",[])},url:SC.Record.attr(String),primaryKey:"url",title:SC.Record.attr(String),owner:SC.Record.attr(String),pages:SC.Record.toMany("Smartgraphs.ActivityPage",{inverse:"activity",orderBy:"index"}),axes:SC.Record.toMany("Smartgraphs.Axis",{inverse:"activity"}),units:SC.Record.toMany("Smartgraphs.Unit",{inverse:"activity"}),graphs:SC.Record.toMany("Smartgraphs.Graph",{inverse:"activity"}),datasets:SC.Record.toMany("Smartgraphs.Dataset",{inverse:"activity"}),annotations:null,variables:null,responseTemplates:SC.Record.toMany("Smartgraphs.ResponseTemplate",{inverse:"activity"}),serialize:function(){var e={};
var k=this.get("store");e.activity=k.readDataHash(this.get("storeKey"));var a=this.get("pages");
e.pages=a.map(function(n){return n.serialize()});var j=a.map(function(n){return n.get("steps").map(function(o){return o.serialize()
})});e.steps=Array.prototype.concat.apply([],j);var f=this.get("units");e.units=f.map(function(n){return n.serialize()
});var h=this.get("axes");e.axes=h.map(function(n){return n.serialize()});var c=this.get("graphs");
e.graphs=c.map(function(n){return n.serialize()});var g=this.get("responseTemplates");
e.responseTemplates=g.map(function(n){return n.serialize()});var b=this.get("datasets");
e.datasets=b.map(function(n){return n.serialize()});var d=b.map(function(n){return n.get("points").map(function(o){return o.serialize()
})});e.datapoints=Array.prototype.concat.apply([],d);var m=this;e.annotations=[];
Smartgraphs.Annotation.typeNames().forEach(function(n){var o=SC.Query.local(Smartgraphs[n],"activity={activity}",{activity:m});
var p=k.find(o);if(p.get("length")>0){e.annotations.push({type:n,records:p.map(function(q){return q.serialize()
})})}});e.variables=[];var i=SC.Query.local(Smartgraphs.Variable,"activity={activity}",{activity:m});
var l=k.find(i);if(l.get("length")>0){e.variables=l.map(function(n){return n.serialize()
})}return e}});Smartgraphs.ActivityPage=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",activity:SC.Record.toOne("Smartgraphs.Activity",{inverse:"pages",isMaster:YES,aggregate:YES}),_statusDidChange:function(){if(this.get("status")&SC.Record.DIRTY){this.invokeLast(this.propagateToAggregates)
}}.observes("status"),name:SC.Record.attr(String),index:SC.Record.attr(Number),introText:SC.Record.attr(String),steps:SC.Record.toMany("Smartgraphs.ActivityStep",{inverse:"activityPage"}),firstStep:SC.Record.toOne("Smartgraphs.ActivityStep"),isSelectable:NO,pageNumber:null,pageNumberAsString:function(){return(this.get("pageNumber")+1)+""
}.property("pageNumber"),context:null,init:function(){arguments.callee.base.apply(this,arguments);
this.set("context",{})}});Smartgraphs.ActivityStep=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",activityPage:SC.Record.toOne("Smartgraphs.ActivityPage",{inverse:"steps",isMaster:YES,aggregate:YES}),paneConfig:SC.Record.toOne(String),panes:SC.Record.attr(Object),beforeText:SC.Record.attr(String),responseTemplate:SC.Record.toOne("Smartgraphs.ResponseTemplate"),afterText:SC.Record.attr(String),substitutedExpressions:SC.Record.attr(Array),tools:SC.Record.attr(Array,{defaultValue:[]}),contextVars:SC.Record.attr(Array),startCommands:SC.Record.attr(Array),shouldFinishImmediately:SC.Record.attr(Boolean),submissibilityInspector:SC.Record.attr(Object),submissibilityCriterion:SC.Record.attr(Object),afterSubmissionCommands:SC.Record.attr(Array),responseInspector:SC.Record.attr(Object),responseBranches:SC.Record.attr(Array),defaultBranch:SC.Record.toOne("Smartgraphs.ActivityStep"),isFinalStep:SC.Record.attr(Boolean),hideSubmitButton:SC.Record.attr(Boolean),submitButtonTitle:SC.Record.attr(String),nextButtonShouldSubmit:SC.Record.attr(Boolean)});
Smartgraphs.Annotation=SC.Record.extend({init:function(){this.invokeLast(this._updateAnnotationsList);
arguments.callee.base.apply(this,arguments)},url:SC.Record.attr(String),primaryKey:"url",isAnnotation:YES,name:SC.Record.attr(String),activity:SC.Record.toOne("Smartgraphs.Activity",{aggregate:YES}),_updateAnnotationsList:function(){var a=this.get("activity");
if(a){console.log("updating activity");if(this._activity){this._activity.get("annotations").removeObject(this)
}a.get("annotations").pushObject(this);this._activity=a}}.observes("activity"),session:SC.Record.toOne("Smartgraphs.Session"),color:SC.Record.attr(String,{defaultValue:"#cc0000"}),isHighlighted:SC.Record.attr(Boolean,{defaultValue:false}),viewClass:function(){return this.constructor.viewClass
}.property()});(function(){var b=null;var c=null;function a(){b=[];c=[];for(var d in Smartgraphs){if(Smartgraphs.hasOwnProperty(d)&&Smartgraphs[d]&&Smartgraphs[d].isClass&&d!=="Annotation"&&SC.kindOf(Smartgraphs[d],Smartgraphs.Annotation)){b.push(Smartgraphs[d]);
c.push(d)}}}Smartgraphs.Annotation.types=function(){if(!b){a()}return b};Smartgraphs.Annotation.typeNames=function(){if(!c){a()
}return c}}());Smartgraphs.DataPoint=SC.Record.extend({x:SC.Record.attr(Number),y:SC.Record.attr(Number),dataset:SC.Record.toOne("Smartgraphs.Dataset",{inverse:"points",isMaster:YES,aggregate:YES}),xRounded:function(){return Math.round(this.get("x")*100)/100
}.property("x").cacheable(),yRounded:function(){return Math.round(this.get("y")*100)/100
}.property("y").cacheable()});sc_require("mixins/arrow_drawing");Smartgraphs.ArrowView=RaphaelViews.RaphaelView.extend(Smartgraphs.ArrowDrawing,{canShowInTable:NO,itemColorBinding:".item.color",isHighlightedBinding:".item.isHighlighted",strokeWidth:2,strokeOpacity:0.9,stroke:function(){return this.get("isHighlighted")?"#ff0000":this.get("itemColor")
}.property("isHighlighted","itemColor"),displayProperties:"point1 point2 label stroke isHighlighted strokeWidth strokeOpacity".w(),renderCallback:function(g,d,c,f,b){var e=f&&f.x||0;
var a=f&&f.y||0;return g.set().push(g.path(d.d).attr(d),g.text(e,a,c||"").attr({fill:d.stroke,"font-size":15,"stroke-width":1}).rotate(b||0,true))
},render:function(c,a){var d=this.get("graphView");var e=this.getStartAndEnd(this.get("item"));
var i=this.getPath("item.label");var h=d.coordinatesForPoint(e.start.x,e.start.y);
var b=d.coordinatesForPoint(e.end.x,e.end.y);var f,l;if(i&&this.get("item").get("isHorizontal")){f=d.coordinatesForPoint((e.start.x+e.end.x)/2,e.start.y);
f.y-=12;l=0}else{if(i&&this.get("item").get("isVertical")){f=d.coordinatesForPoint(e.start.x,(e.start.y+e.end.y)/2);
f.x-=12;l=-90}}var g;if((h.x!==b.x)||(h.y!==b.y)){g=this.arrowPath(h.x,h.y,b.x,b.y,10,15)
}else{g="";i=""}var k={d:g,stroke:this.get("stroke"),"stroke-width":this.get("strokeWidth"),"stroke-opacity":this.get("strokeOpacity")};
if(a){c.callback(this,this.renderCallback,k,i,f,l)}else{var j=c.raphael();j.items[0].attr(k);
j.items[1].attr({fill:this.get("stroke")})}},getStartAndEnd:function(d){var k=d.get("point1"),j=d.get("point2");
var c=k.get("x"),h=k.get("y"),a=j.get("x"),g=j.get("y");var i,f,b,e;if(d.get("isHorizontal")){f=d.get("isClockwise")?g:h;
b={x:c,y:f};e={x:a,y:f}}else{if(d.get("isVertical")){i=d.get("isClockwise")?c:a;b={x:i,y:h};
e={x:i,y:g}}else{b={x:c,y:h};e={x:a,y:g}}}return{start:b,end:e}}});sc_require("models/annotation");
sc_require("models/data_point");sc_require("views/arrow");Smartgraphs.Arrow=Smartgraphs.Annotation.extend({point1:SC.Record.toOne("Smartgraphs.DataPoint"),point2:SC.Record.toOne("Smartgraphs.DataPoint"),isHorizontal:SC.Record.attr(Boolean,{defaultValue:false}),isVertical:SC.Record.attr(Boolean,{defaultValue:false}),isClockwise:SC.Record.attr(Boolean,{defaultValue:false}),label:SC.Record.attr(String)});
Smartgraphs.Arrow.viewClass=Smartgraphs.ArrowView;Smartgraphs.Axis=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",activity:SC.Record.toOne("Smartgraphs.Activity",{inverse:"axes",isMaster:YES,aggregate:YES}),units:SC.Record.toOne("Smartgraphs.Unit"),min:SC.Record.attr(Number),max:SC.Record.attr(Number),nSteps:SC.Record.attr(Number),label:SC.Record.attr(String)});
sc_require("mixins/arrow_drawing");Smartgraphs.BracketArcView=RaphaelViews.RaphaelView.extend(Smartgraphs.ArrowDrawing,{canShowInTable:YES,itemColorBinding:".item.color",isHighlightedBinding:".item.isHighlighted",strokeWidth:2,strokeOpacity:0.9,stroke:function(){return this.get("isHighlighted")?"#ff0000":this.get("itemColor")
}.property("isHighlighted","itemColor"),displayProperties:"point1 point2 label stroke isHighlighted strokeWidth strokeOpacity".w(),renderCallback:function(f,d,c,e,b,a){return f.set().push(f.path(d.d).attr(d),f.text(e||0,b||0,c||"").attr({fill:d.stroke,"font-size":15}).rotate(a||0,true))
},render:function(c,a){var e=this.get("item");var d=this.figurePath(e);var h=e.get("label");
var g,f,j;if((e.get("isClockwise")&&(e.get("startY")<e.get("endY")))||(!e.get("isClockwise")&&(e.get("startY")>e.get("endY")))){j=90;
g=e.get("startX")+10;f=(e.get("startY")+e.get("endY"))/2}else{j=-90;g=e.get("startX")-10;
f=(e.get("startY")+e.get("endY"))/2}var i={d:d,stroke:this.get("stroke"),"stroke-width":this.get("strokeWidth"),"stroke-opacity":this.get("strokeOpacity")};
if(a){c.callback(this,this.renderCallback,i,h,g,f,j)}else{var b=c.raphael();b.items[0].attr(i);
b.items[1].attr({fill:this.get("stroke")})}},figurePath:function(h){var g={x:h.get("startX"),y:h.get("startY")};
var e={x:h.get("endX"),y:h.get("endY")};var q,p,l,n,k,j,i;var u=25;var f=6;if((h.get("isClockwise")&&(g.y<e.y))||(!h.get("isClockwise")&&(g.y>e.y))){l=Math.atan2((e.y-g.y),(e.x-g.x))+(Math.PI/2);
q={x:g.x+40,y:g.y};p={x:e.x+40,y:e.y};if(g.y<e.y){n=l+(1.5*u)*Math.PI/180;k=l-(0.5*u)*Math.PI/180;
j=l+(0.5*u)*Math.PI/180;i=l-(1.5*u)*Math.PI/180}else{n=l+(0.5*u)*Math.PI/180;k=l-(1.5*u)*Math.PI/180;
j=l+(1.5*u)*Math.PI/180;i=l-(0.5*u)*Math.PI/180}}else{l=Math.atan2((e.y-g.y),(e.x-g.x))-(Math.PI/2);
q={x:g.x-40,y:g.y};p={x:e.x-40,y:e.y};if(g.y<e.y){n=l+(0.5*u)*Math.PI/180;k=l-(1.5*u)*Math.PI/180;
j=l+(1.5*u)*Math.PI/180;i=l-(0.5*u)*Math.PI/180}else{n=l+(1.5*u)*Math.PI/180;k=l-(0.5*u)*Math.PI/180;
j=l+(0.5*u)*Math.PI/180;i=l-(1.5*u)*Math.PI/180}}var c,a,o,m,t,s,d,b;if(g.y<e.y){c=g.x-f*Math.cos(n);
a=g.y-f*Math.sin(n);o=g.x-f*Math.cos(k);m=g.y-f*Math.sin(k);t=e.x-f*Math.cos(j);s=e.y-f*Math.sin(j);
d=e.x-f*Math.cos(i);b=e.y-f*Math.sin(i)}else{c=g.x+f*Math.cos(n);a=g.y+f*Math.sin(n);
o=g.x+f*Math.cos(k);m=g.y+f*Math.sin(k);t=e.x+f*Math.cos(j);s=e.y+f*Math.sin(j);d=e.x+f*Math.cos(i);
b=e.y+f*Math.sin(i)}var r="M "+g.x+" "+g.y+"C "+q.x+" "+q.y+" "+p.x+" "+p.y+" "+e.x+" "+e.y+"L "+t+" "+s+"L "+d+" "+b+"L "+e.x+" "+e.y;
return r}});sc_require("models/annotation");sc_require("views/bracket_arc");Smartgraphs.BracketArc=Smartgraphs.Annotation.extend({startX:SC.Record.attr(Number),startY:SC.Record.attr(Number),endX:SC.Record.attr(Number),endY:SC.Record.attr(Number),isClockwise:SC.Record.attr(Boolean,{defaultValue:false})});
Smartgraphs.BracketArc.viewClass=Smartgraphs.BracketArcView;Smartgraphs.AnnotatableItemView={initMixin:function(){this._aiv_baseValues={};
this._aiv_targetGuids=[];this._aiv_contentDidChange()},_aiv_contentDidChange:function(){var a=this.get("content");
var d=this._oldContent;this._oldContent=a;var c=this.getPath(this.get("controllerPath")).get("overrideQueuesByTarget");
if(d){c[SC.guidFor(d)].removeObserver("[]",this,this._aiv_overridePropertyDidChange)
}var b=SC.guidFor(a);if(!c[b]){c[b]=[]}c[b].addObserver("[]",this,this._aiv_overridePropertyDidChange);
c[b].notifyPropertyChange("[]");this._aiv_targetGuids.push(b)}.observes("content"),willRemoveFromDataView:function(){var b=this.getPath(this.get("controllerPath")).get("overrideQueuesByTarget");
var a=this;this._aiv_targetGuids.forEach(function(c){if(b[c]){b[c].removeObserver("[]",a,a._aiv_overridePropertyDidChange)
}delete b[c]});this._aiv_targetGuids=[]},_aiv_overridePropertyDidChange:function(a){a.beginPropertyChanges();
var b=this;a.forEach(function(c){if(b._aiv_baseValues[c.property]===undefined){b._aiv_baseValues[c.property]=b.get(c.property)||null
}b.set(c.property,c.restoreBaseValue?b._aiv_baseValues[c.property]:c.value)});this.invokeLast(function(){a.splice(0,a.length)
});a.endPropertyChanges()}};sc_require("views/mixins/annotatable_item_view");Smartgraphs.DataPointView=RaphaelViews.RaphaelView.extend(Smartgraphs.AnnotatableItemView,{displayProperties:"content.x content.y isEnabled fill stroke radius".w(),controllerPath:"parentView.graphView.graphController",datasetColorBinding:".parentView.color",color:function(){return this.get("overrideColor")||this.get("datasetColor")
}.property("overrideColor","datasetColor"),notSelectedFillBinding:".color",notSelectedStrokeBinding:".color",selectedFill:"#aa0000",selectedStroke:"#aa0000",hoveredRadius:5,notHoveredRadius:3,isEnabled:YES,isHovered:NO,isSelected:NO,layerIsCacheable:YES,isPoolable:YES,fill:function(){return(this.get("isSelected")?this.get("selectedFill"):this.get("notSelectedFill"))
}.property("isSelected","selectedFill","notSelectedFill").cacheable(),stroke:function(){return(this.get("isSelected")?this.get("selectedStroke"):this.get("notSelectedStroke"))
}.property("isSelected","selectedStroke","notSelectedStroke").cacheable(),radius:function(){return(this.get("isHovered")?this.get("hoveredRadius"):this.get("notHoveredRadius"))
}.property("isHovered","hoveredRadius","notHoveredRadius").cacheable(),mouseEntered:function(){this.set("isHovered",YES)
},mouseExited:function(){this.set("isHovered",NO)},mouseDown:function(){Smartgraphs.statechart.sendAction("dataPointSelected",this,null);
return NO},renderCallback:function(f,b,e,a,d,c){return f.circle(b,e,a).attr({fill:d,stroke:c})
},render:function(c,a){var d=this.getPath("parentView.graphView");if(!d){this.displayDidChange();
return}var i=this.get("fill"),j=this.get("stroke"),e=this.get("radius");var h=this.getPath("content.x"),f=this.getPath("content.y");
var g=d.coordinatesForPoint(h,f);if(a){c.callback(this,this.renderCallback,g.x,g.y,e,i,j)
}else{var b=c.raphael();b.attr({cx:g.x,cy:g.y,r:e,fill:i,stroke:j})}}});Smartgraphs.AnnotatableParentView={init:function(){arguments.callee.base.apply(this,arguments);
this._apv_baseValues={};this._apv_targetGuids=[];var b=this.getPath("controller.overrideQueuesByTarget");
var c=this.get("item");var a=SC.guidFor(c);if(!b[a]){b[a]=[]}b[a].addObserver("[]",this,this._apv_overridePropertyDidChange);
b[a].notifyPropertyChange("[]");this._apv_targetGuids.push(a)},willRemoveFromDataView:function(){var b=this.getPath("controller.overrideQueuesByTarget");
var a=this;this._apv_targetGuids.forEach(function(c){if(b[c]){b[c].removeObserver("[]",a,a._apv_overridePropertyDidChange)
}delete b[c]});this._apv_targetGuids=[]},_apv_overridePropertyDidChange:function(a){a.beginPropertyChanges();
var b=this;a.forEach(function(c){if(b._apv_baseValues[c.property]===undefined){b._apv_baseValues[c.property]=b.get(c.property)
}b.set(c.property,c.restoreBaseValue?b._apv_baseValues[c.property]:c.value)});a.splice(0,a.length);
a.endPropertyChanges()}};sc_require("views/data_point");sc_require("views/mixins/annotatable_parent_view");
Smartgraphs.DatasetView=RaphaelViews.RaphaelCollectionView.extend(Smartgraphs.AnnotatableParentView,{exampleView:Smartgraphs.DataPointView,useFastPath:YES,modelColorBinding:".item.color",modelColorBindingDefault:SC.Binding.oneWay(),color:function(){return this.get("overrideColor")||this.get("modelColor")
}.property("overrideColor","modelColor"),selectionBinding:".item.selection",isSelectableBinding:".item.isSelectable",content:function(){var a=this.get("item");
if(!a){return null}return Smartgraphs.store.find(SC.Query.local(Smartgraphs.DataPoint,{conditions:"dataset = {dataset}",dataset:a,orderBy:"id"}))
}.property("dataset").cacheable()});sc_require("views/dataset");Smartgraphs.Dataset=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",name:SC.Record.attr(String),activity:SC.Record.toOne("Smartgraphs.Activity",{inverse:"datasets",isMaster:YES,aggregate:YES}),_statusDidChange:function(){if(this.get("status")&SC.Record.DIRTY){this.invokeLast(this.propagateToAggregates)
}}.observes("status"),session:SC.Record.toOne("Smartgraphs.Session"),xUnits:SC.Record.toOne("Smartgraphs.Unit"),xLabel:SC.Record.attr(String),xShortLabel:SC.Record.attr(String),yUnits:SC.Record.toOne("Smartgraphs.Unit"),yLabel:SC.Record.attr(String),yShortLabel:SC.Record.attr(String),points:SC.Record.toMany("Smartgraphs.DataPoint",{inverse:"dataset"}),defaultColor:SC.Record.attr(String),selection:null,isSelectable:YES,color:null,isStreaming:NO,streamSouce:null,latestPoint:null,expectedLength:null,viewClass:function(){return Smartgraphs.DatasetView
}.property()});Smartgraphs.FreehandSketchView=RaphaelViews.RaphaelView.extend({stroke:"#000000",strokeWidth:2,displayProperties:"item.points.[]".w(),renderCallback:function(d,a,b,c){return d.path(a).attr({stroke:b,"stroke-width":c})
},render:function(b,a){var c=this.get("graphView");var h=this.get("item");var j=(h?h.get("points"):null)||[{x:0,y:0}];
var e=[];var g,f;for(var d=0,k=j.get("length");d<k;d++){g=j.objectAt(d);f=c.coordinatesForPoint(g.x,g.y)||{x:0,y:0};
e.push(d===0?"M":"L");e.push(Math.round(f.x));e.push(" ");e.push(Math.round(f.y))
}var m=e.join("")||"M0 0";if(a){b.callback(this,this.renderCallback,m,this.get("stroke"),this.get("strokeWidth"))
}else{var l=b.raphael();l.attr({path:m})}}});sc_require("models/annotation");sc_require("views/freehand_sketch");
Smartgraphs.FreehandSketch=Smartgraphs.Annotation.extend({points:SC.Record.attr(Array),isDirectional:SC.Record.attr(Boolean)});
Smartgraphs.FreehandSketch.viewClass=Smartgraphs.FreehandSketchView;Smartgraphs.Graph=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",activity:SC.Record.toOne("Smartgraphs.Activity",{inverse:"graphs",isMaster:YES,aggregate:YES}),name:SC.Record.attr(String),description:SC.Record.attr(String),title:SC.Record.attr(String),xAxis:SC.Record.toOne("Smartgraphs.Axis"),yAxis:SC.Record.toOne("Smartgraphs.Axis"),initialDatasets:SC.Record.attr(Array),initialAnnotations:SC.Record.attr(Array)});
Smartgraphs.HighlightedPointView=RaphaelViews.RaphaelView.extend({canShowInTable:NO,radius:8,strokeBinding:".item.color",strokeWidth:2,strokeOpacity:1,fill:"#ffffff",fillOpacity:0,displayProperties:"item.point.x item.point.y radius stroke strokeWidth strokeOpacity fill fillOpacity".w(),renderCallback:function(b,a){return b.circle(a.x,a.y,a.r).attr(a)
},render:function(c,a){var d=this.get("graphView");var e=this.get("item");var i=e.get("point");
var h=i?i.get("x"):-9999;var f=i?i.get("y"):-9999;var g=d.coordinatesForPoint(h,f);
var j={cx:g.x,cy:g.y,r:this.get("radius"),stroke:this.get("stroke"),"stroke-width":this.get("strokeWidth"),"stroke-opacity":this.get("strokeOpacity"),fill:this.get("fill"),"fill-opacity":this.get("fillOpacity")};
if(a){c.callback(this,this.renderCallback,j)}else{var b=c.raphael();b.attr(j)}}});
sc_require("models/annotation");sc_require("views/highlighted_point");Smartgraphs.HighlightedPoint=Smartgraphs.Annotation.extend({point:SC.Record.toOne("Smartgraphs.DataPoint"),viewClass:function(){return this.get("displayStyle")===Smartgraphs.HighlightedPoint.HIGHLIGHT_POINT_AND_DIM_BACKGROUND_STYLE?null:Smartgraphs.HighlightedPointView
}.property(),dataset:function(){return this.getPath("point.dataset")}.property("point").cacheable(),datasetOverrideColor:function(){return this.get("point")&&this.get("datasetColor")
}.property("datasetColor","point"),propertyOverrides:function(){if(this.get("displayStyle")===Smartgraphs.HighlightedPoint.HIGHLIGHT_POINT_AND_DIM_BACKGROUND_STYLE){return[{targetObject:"dataset",targetProperty:"overrideColor",sourceProperty:"datasetOverrideColor"},{targetObject:"point",targetProperty:"overrideColor",sourceProperty:"pointColor"}]
}}.property("displayStyle").cacheable()});Smartgraphs.HighlightedPoint.CIRCLE_STYLE="circle-point";
Smartgraphs.HighlightedPoint.HIGHLIGHT_POINT_AND_DIM_BACKGROUND_STYLE="highlight-point-and-dim-background";
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
Smartgraphs.IndicatingArrow.viewClass=Smartgraphs.IndicatingArrowView;Smartgraphs.LabelAnnotationView=RaphaelViews.RaphaelView.extend({displayProperties:"item.label stroke size item.xOffset item.yOffset isHighlighted strokeWidth".w(),canShowInTable:NO,selectedColor:"#aa0000",notSelectedColorBinding:".item.color",isHighlightedBinding:".item.isHighlighted",highlightedStrokeWidth:2,notHighlightedStrokeWidth:1,isSelected:NO,ox:null,oy:null,strokeWidth:function(){return(this.get("isHighlighted")?this.get("highlightedStrokeWidth"):this.get("notHighlightedStrokeWidth"))
}.property("isHighlighted","highlightedStrokeWidth","notHighlightedStrokeWidth").cacheable(),stroke:function(){return(this.get("isSelected")?this.get("selectedColor"):this.get("notSelectedColor"))
}.property("isSelected","selectedColor","notSelectedColor").cacheable(),exampleInlineTextFieldView:SC.InlineTextFieldView,isInlineEditorMultiline:NO,isEditable:YES,isEditing:NO,editorWidth:80,doubleClick:function(a){return this.beginEditing()
},beginEditing:function(){if(this.get("isEditing")){return YES}if(!this.get("isEditable")){return NO
}var c=this.$(),e=SC.viewportOffset(c[0]);var b=this.graphCoordinates();var a=Smartgraphs.mainPage.mainPane.container.get("bottomRightThickness");
var d=a*Smartgraphs.mainPage.mainPane.container.bottomRightView.childViews[0].instructionsWrapper.get("layout").width;
e.width=80;e.height=this.get("item").get("size")+8;e.x=b.x-(e.width/2)+Smartgraphs.mainPage.mainPane.container.dividerView.get("layout").left+d;
e.y=b.y-(e.height/2)+32;SC.InlineTextFieldView.beginEditing({frame:e,delegate:this,exampleElement:c,value:this.get("item").get("label"),multiline:this.get("isInlineEditorMultiline"),isCollection:NO,validator:this.get("validator"),exampleInlineTextFieldView:this.get("exampleInlineTextFieldView")})
},discardEditing:function(){if(!this.get("isEditing")){return YES}return SC.InlineTextFieldView.discardEditing()
},commitEditing:function(){if(!this.get("isEditing")){return YES}return SC.InlineTextFieldView.commitEditing()
},inlineEditorWillBeginEditing:function(a){this.set("isEditing",YES)},inlineEditorDidBeginEditing:function(b){var a=this.$();
this._oldOpacity=a.css("opacity");a.css("opacity",0)},inlineEditorShouldBeginEditing:function(){return this.get("isEditable")
},inlineEditorShouldEndEditing:function(a,b){return YES},inlineEditorDidEndEditing:function(a,b){this.get("item").setIfChanged("label",b);
this.$().css("opacity",this._oldOpacity);this._oldOpacity=null;this.set("isEditing",NO)
},toggleSelection:function(){if(this.get("isSelected")){this.set("isSelected",NO)
}else{this.set("isSelected",YES)}},graphCoordinates:function(){var b=this.get("graphView");
var a=this.getPath("item.point");var d=this.getPath("item.xOffset");var e=this.getPath("item.yOffset");
var c=b.coordinatesForPoint(a.get("x"),a.get("y"));if(d){c.x+=d}if(e){c.y+=e}return c
},renderCallback:function(c,b){var a=c.text().attr(b);window.label=a;return a},render:function(e,g){var c=this.getPath("item.label");
var d=this.getPath("item.size");var f=this.graphCoordinates();var b={text:c,x:f.x,y:f.y,"font-size":d,stroke:this.get("stroke"),"stroke-width":this.get("strokeWidth")};
if(g){e.callback(this,this.renderCallback,b)}else{var a=e.raphael();a.attr(b)}}});
sc_require("models/annotation");sc_require("models/data_point");sc_require("views/label_annotation");
Smartgraphs.LabelAnnotation=Smartgraphs.Annotation.extend({point:SC.Record.toOne("Smartgraphs.DataPoint"),label:SC.Record.attr(String),xOffset:SC.Record.attr(Number,{defaultValue:0}),yOffset:SC.Record.attr(Number,{defaultValue:-15}),size:SC.Record.attr(Number,{defaultValue:15})});
Smartgraphs.LabelAnnotation.viewClass=Smartgraphs.LabelAnnotationView;Smartgraphs.LineThroughPointsView=RaphaelViews.RaphaelView.extend({canShowInTable:NO,strokeBinding:".item.color",strokeWidth:2,strokeOpacity:0.3,displayProperties:"point1 point2 stroke strokeWidth strokeOpacity".w(),renderCallback:function(c,a){var b=c.path(a.d).attr(a);
return b},render:function(c,a){var d=this.get("graphView");var g=this.get("item");
var m=g.get("point1");var k=g.get("point2");var e=d.get("xAxis");var b=d.get("yAxis");
var q=this.getEndPoints(m,k,e,b);var n,o;var l=[];for(var h=0,j=q.length;h<j;h++){l.push(h===0?"M":"L");
o=q[h];n=d.coordinatesForPoint(o.x,o.y);l.push(n.x);l.push(n.y)}var f=l.join(" ");
var p={d:f,stroke:this.get("stroke"),"stroke-width":this.get("strokeWidth"),"stroke-opacity":this.get("strokeOpacity")};
if(a){c.callback(this,this.renderCallback,p)}else{var r=c.raphael();r.attr(p)}},_y:function(d,c,a){return(c*d)+a
},_x:function(d,c,a){if(c===0){return a}else{return(d-a)/c}},getEndPoints:function(n,j,f,c){var i=f.get("max");
var e=f.get("min");var g=c.get("max");var q=c.get("min");var p=[];var d=n.get("x"),o=n.get("y"),a=j.get("x"),l=j.get("y");
if(d===a){p.push({x:d,y:q});p.push({x:d,y:g});return p}var h=(l-o)/(a-d);var k=l-(h*a);
if(this._y(e,h,k)<q){p.push({y:q,x:this._x(q,h,k)});if(this._y(i,h,k)>g){p.push({y:g,x:this._x(g,h,k)})
}else{p.push({x:i,y:this._y(i,h,k)})}return p}if((q<=this._y(e,h,k))&&(this._y(e,h,k)<=g)){p.push({x:e,y:this._y(e,h,k)});
if(this._y(i,h,k)<q){p.push({y:q,x:this._x(q,h,k)})}else{if(this._y(i,h,k)<=g){p.push({x:i,y:this._y(i,h,k)})
}else{p.push({y:g,x:this._x(g,h,k)})}}return p}if(g<this._y(e,h,k)){p.push({y:g,x:this._x(g,h,k)});
if(this._y(i,h,k)<q){p.push({y:q,x:this._x(q,h,k)})}else{p.push({x:i,y:this._y(i,h,k)})
}return p}return null}});sc_require("models/annotation");sc_require("models/data_point");
sc_require("views/line_through_points");(function(){var a={to:function(e,d,g,f){var c,b;
if(SC.none(e)||(e==="")){return null}if(e[0]==="/"){return f.get("store").find(g,e)
}c=Smartgraphs.activityObjectsController.findAnnotation(e);b=c&&c.get("point");return b||null
},from:function(b){return b?b.get("id"):null}};Smartgraphs.LineThroughPoints=Smartgraphs.Annotation.extend({point1:SC.Record.toOne("Smartgraphs.DataPoint",{transform:a}),point2:SC.Record.toOne("Smartgraphs.DataPoint",{transform:a})});
Smartgraphs.LineThroughPoints.viewClass=Smartgraphs.LineThroughPointsView}());Smartgraphs.LineToAxisView=RaphaelViews.RaphaelView.extend({canShowInTable:NO,radius:8,defaultStroke:"#aa0000",defaultStrokeWidth:2,defaultStrokeOpacity:0.7,fill:"#ffffff",fillOpacity:0,displayProperties:"item.point.x item.point.y".w(),renderCallback:function(d,c){var a;
if(c.shouldHideLinePath){a=d.path("M 0 0 L 0 0");a.hide()}else{var b="M "+c.linePathStartingCoords.x+" "+c.linePathStartingCoords.y+" L "+c.linePathEndingCoords.x+" "+c.linePathEndingCoords.y;
a=d.path(b)}a.attr({"stroke-width":this.defaultStrokeWidth,stroke:this.defaultStroke,"stroke-opacity":this.defaultStrokeOpacity});
return a},render:function(b,a){var c=this.get("graphView");var e=this.get("item");
var j;var f=e.get("point");if(f){var g=c.coordinatesForPoint(f.get("x"),f.get("y"));
if(g){var h;var d=e.get("axis");if(d=="x"){h=c.coordinatesForPoint(f.get("x"),0)}else{h=c.coordinatesForPoint(0,f.get("y"))
}if(h){j={linePathStartingCoords:g,linePathEndingCoords:h,shouldHideLinePath:e.get("shouldHideLinePath")}
}}}if(!j){j={shouldHideLinePath:YES}}if(a){b.callback(this,this.renderCallback,j)
}else{var i=b.raphael();i.attr(j)}}});sc_require("models/annotation");sc_require("models/highlighted_point");
sc_require("views/line_to_axis");Smartgraphs.LineToAxis=Smartgraphs.Annotation.extend({point:SC.Record.toOne("Smartgraphs.DataPoint"),shouldHideLinePath:SC.Record.attr(Boolean,{defaultValue:NO}),axis:SC.Record.attr(String,{defaultValue:"y"})});
Smartgraphs.LineToAxis.viewClass=Smartgraphs.LineToAxisView;SC.Record.prototype.serialize=function(){return this.get("store").readDataHash(this.get("storeKey"))
};Smartgraphs.ResponseTemplate=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",activity:SC.Record.toOne("Smartgraphs.Activity",{inverse:"pages",isMaster:YES,aggregate:YES}),templateString:SC.Record.attr(String),fieldTypes:SC.Record.attr(Array),fieldChoicesList:SC.Record.attr(Array),intialValues:SC.Record.attr(Array),values:[]});
Smartgraphs.Session=SC.Record.extend({user:SC.Record.toOne("Smartgraphs.User",{inverse:"session",isMaster:YES})});
Smartgraphs.TriggeredCommands=SC.Record.extend({systemInspector:SC.Record.attr(Object),triggerCriterion:SC.Record.attr(Object),onCommands:SC.Record.attr(Object),offCommands:SC.Record.attr(Object)});
Smartgraphs.Variable=SC.Record.extend({url:SC.Record.attr(String),primaryKey:"url",name:SC.Record.attr(String),activity:SC.Record.toOne("Smartgraphs.Activity",{inverse:"variables",isMaster:YES,aggregate:YES}),_statusDidChange:function(){if(this.get("status")&SC.Record.DIRTY){this.invokeLast(this.propagateToAggregates)
}}.observes("status"),session:SC.Record.toOne("Smartgraphs.Session"),value:SC.Record.attr(String)});
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
if(c&&c.get("id")===a.id){return YES}Smartgraphs.activityController.set("content",Smartgraphs.get("rootStore").find(Smartgraphs.Activity,a.id));
this.gotoState("LOADING_ACTIVITY");return YES},LOADING_ACTIVITY:SC.State.design(Smartgraphs.ResourceLoader,{masterResource:{load:function(){return Smartgraphs.activityController.get("content")
}},subordinateResources:[],enterState:function(){if(Smartgraphs.loadingActivityController.get("openAuthorViewAfterLoading")){Smartgraphs.toolbarController.showRunButton()
}else{Smartgraphs.toolbarController.showEditButton()}if(this.loadResources()){return
}else{Smartgraphs.appWindowController.showActivityLoadingView()}},exitState:function(){this.cancelLoading()
},resourcesDidLoad:function(){if(Smartgraphs.loadingActivityController.get("openAuthorViewAfterLoading")){Smartgraphs.activityPagesController.set("content",Smartgraphs.activityController.get("pages"));
Smartgraphs.activityPagesController.selectFirstPage();this.gotoState("AUTHOR")}else{this.gotoState("ACTIVITY")
}},resourceLoadingError:function(){this.gotoState("ERROR_LOADING_ACTIVITY")},openActivity:function(b,a){return(a.id===Smartgraphs.activityController.getPath("content.id"))?YES:NO
},openAuthorView:function(){Smartgraphs.loadingActivityController.set("openAuthorViewAfterLoading",YES);
return YES},runActivity:function(){Smartgraphs.loadingActivityController.set("openAuthorViewAfterLoading",NO);
return YES}}),ERROR_LOADING_ACTIVITY:SC.State.design({enterState:function(){Smartgraphs.appWindowController.showErrorLoadingActivityView()
}}),ACTIVITY:SC.State.plugin("Smartgraphs.ACTIVITY"),ACTIVITY_DONE:SC.State.design(),AUTHOR:SC.State.plugin("Smartgraphs.AUTHOR")})})});
Smartgraphs.ACTIVITY=SC.State.extend({initialSubstate:"ACTIVITY_PAGE_START",enterState:function(){Smartgraphs.sessionController.beginSession();
var a=Smartgraphs.activityController.get("pages");Smartgraphs.activityPagesController.set("content",a);
Smartgraphs.activityPagesController.selectFirstPage();Smartgraphs.appWindowController.showActivityView()
},exitState:function(){Smartgraphs.activityController.cleanup();Smartgraphs.sessionController.endSession()
},ACTIVITY_PAGE_START:SC.State.design({enterState:function(){Smartgraphs.activityStepController.set("content",Smartgraphs.activityPageController.get("firstStep"));
this.gotoState("ACTIVITY_STEP")}}),ACTIVITY_STEP:SC.State.plugin("Smartgraphs.ACTIVITY_STEP"),ACTIVITY_STEP_SUBMITTED:SC.State.plugin("Smartgraphs.ACTIVITY_STEP_SUBMITTED"),ACTIVITY_PAGE_DONE:SC.State.design({enterState:function(){if(Smartgraphs.activityPagesController.get("isLastPage")){this.gotoState("ACTIVITY_DONE")
}else{Smartgraphs.activityController.set("canGotoNextPage",YES)}},exitState:function(){Smartgraphs.activityController.set("canGotoNextPage",NO);
Smartgraphs.activityPageController.cleanup()},gotoNextPage:function(){Smartgraphs.activityPagesController.selectNextPage();
this.gotoState("ACTIVITY_PAGE_START")}}),openAuthorView:function(){this.gotoState("AUTHOR");
return YES},openActivity:function(){Smartgraphs.loadingActivityController.set("openAuthorViewAfterLoading",NO);
return NO},createLineThroughPoints:function(c,b){var f=Smartgraphs.activityObjectsController.findAnnotation(b.firstPoint).get("point");
var e=Smartgraphs.activityObjectsController.findAnnotation(b.secondPoint).get("point");
var a=b.color||"#000000";var d=Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.LineThroughPoints,b.lineName,{point1:f.get("id"),point2:e.get("id"),color:a});
return YES},createRiseArrow:function(d,c){var g=Smartgraphs.activityObjectsController.findAnnotation(c.firstPoint).get("point");
var f=Smartgraphs.activityObjectsController.findAnnotation(c.secondPoint).get("point");
var b=c.color||"#000000";var e=g.get("x")<f.get("x")?[g,f]:[f,g];var a=Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.Arrow,c.arrowName,{point1:e[0].get("id"),point2:e[1].get("id"),color:b,isVertical:YES,isClockwise:YES,isHighlighted:c.isHighlighted||NO,label:c.label});
return YES},createRunArrow:function(c,b){var g=Smartgraphs.activityObjectsController.findAnnotation(b.firstPoint).get("point");
var f=Smartgraphs.activityObjectsController.findAnnotation(b.secondPoint).get("point");
var a=b.color||"#000000";var d=g.get("x")<f.get("x")?[g,f]:[f,g];var e=Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.Arrow,b.arrowName,{point1:d[0].get("id"),point2:d[1].get("id"),color:a,isHorizontal:YES,isClockwise:YES,isHighlighted:b.isHighlighted||NO,label:b.label});
return YES},createIndicatingArrowFromDataPoint:function(b,a){},createIndicatingArrowFromHighlightedPoint:function(c,b){var d=Smartgraphs.activityObjectsController.findAnnotation(b.point);
var a=Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.IndicatingArrow,b.arrowName,{annotation:d.get("id"),pointAngle:b.angle||335,color:b.color||"#cc0000",length:b.length||40});
return YES},createIndicatingArrowFromCoordinates:function(c,b){var a=Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.IndicatingArrow,b.arrowName,{specificX:b.x,specificY:b.y,pointAngle:b.angle||335,color:b.color||"#cc0000",length:b.length||40});
return YES},createBracketArcFromCoordinates:function(c,a){var b=Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.BracketArc,a.bracketName,{startX:a.startX,startY:a.startY,endX:a.endX,endY:a.endY,color:a.color||"#cc0000",isClockwise:false});
return YES},createRiseBracket:function(e,c){var b=Smartgraphs.TableController.controllerForDataset[c.datasetName];
if(!b){return YES}var a=b.findAnnotationByName(c.point1);var h=b.findAnnotationByName(c.point2);
var f=b.getPath("dataset.points");var g=[a,h].getEach("point").map(f.indexOf,f);if(g[0]>g[1]){g=[g[1],g[0]]
}var d=Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.BracketArc,c.bracketName,{startX:230,startY:(g[0]*20)+20,endX:230,endY:(g[1]*20)+20,color:c.color||"#cc0000",isClockwise:YES,isHighlighted:c.isHighlighted||NO,label:c.label});
return YES},createRunBracket:function(e,c){var b=Smartgraphs.TableController.controllerForDataset[c.datasetName];
if(!b){return YES}var a=b.findAnnotationByName(c.point1);var h=b.findAnnotationByName(c.point2);
var f=b.getPath("dataset.points");var g=[a,h].getEach("point").map(f.indexOf,f);if(g[0]>g[1]){g=[g[1],g[0]]
}var d=Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.BracketArc,c.bracketName,{startX:40,startY:(g[0]*20)+20,endX:40,endY:(g[1]*20)+20,color:c.color||"#cc0000",isClockwise:NO,isHighlighted:c.isHighlighted||NO,label:c.label});
return YES},createLabelAnnotation:function(d,c){var a;if(c.point.length){a=Smartgraphs.store.find(Smartgraphs.DataPoint,c.point)
}else{if(c.point.kindOf(Smartgraphs.DataPoint)){a=c.point}else{if(c.point.kindOf(Smartgraphs.Annotation)&&c.point.get("point")){a=c.point.get("point")
}}}if(a.kindOf(Smartgraphs.DataPoint)!==undefined){var b=Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.LabelAnnotation,c.labelName,{point:a.get("id"),label:c.label,color:c.color?c.color:"#000000",xOffset:c.xOffset?c.xOffset:0,yOffset:c.yOffset?c.yOffset:-15,size:c.size?c.size:15});
if(!b.kindOf(Smartgraphs.LabelAnnotation)){console.log("Creation of the LabelAnnotation may not have worked properly.")
}}else{console.log("Couldn't figure out which DataPoint to associate with the annotation.")
}return YES},toggleAnnotationHighlight:function(c,b){var a=Smartgraphs.activityObjectsController.findAnnotation(b.annotationName);
a.toggleProperty("isHighlighted");return YES},setAnnotationAttribute:function(c,b){var a=Smartgraphs.activityObjectsController.findAnnotation(b.name);
if(!a){return YES}for(var d in b){if(!b.hasOwnProperty(d)||d==="name"){continue}a.set(d,b[d])
}},setVariable:function(d,c){var h;if(c.name&&c.expression){if(SC.none(c.name)){throw ("variable name is required")
}if(SC.none(c.expression)){throw ("variable value is required")}h=Smartgraphs.evaluator.evaluate(c.expression);
Smartgraphs.activityObjectsController.setVariable(c.name,h);return YES}var f=c.variableName;
var a=c.inspectorType;var b=c.config;if(SC.none(f)){throw ("variableName is required")
}if(SC.none(a)){throw ("inspectorType is required")}if(SC.none(b)){throw ("config is required")
}var g=this.makeInspector(a,b);if(g){var e=g.inspect();Smartgraphs.activityObjectsController.setVariable(f,e);
return YES}return YES},makeInspector:function(b,c){if(!b){return NO}var a=SC.objectForPropertyPath(b);
if(!a||!a.isClass||!SC.kindOf(a,Smartgraphs.Inspector)){throw"makeInspector was given an non-empty, but invalid, Inspector class name"
}return a.create({config:c})}});Smartgraphs.ACTIVITY_STEP=SC.State.extend({enterState:function(){this.invokeLast(this.didEnterState)
},didEnterState:function(){Smartgraphs.activityStepController.begin()},exitState:function(){Smartgraphs.responseTemplateController.set("editingShouldBeEnabled",NO)
},initialSubstate:"ACTIVITY_STEP_DEFAULT",ACTIVITY_STEP_DEFAULT:SC.State.design(),SENSOR:SC.State.plugin("Smartgraphs.SENSOR"),FREEHAND_INPUT:SC.State.plugin("Smartgraphs.FREEHAND_INPUT"),INTERACTIVE_SELECTION:SC.State.plugin("Smartgraphs.INTERACTIVE_SELECTION"),setPaneConfig:function(b,a){Smartgraphs.activityViewController.setPaneConfig(a);
return YES},hidePane:function(b,a){Smartgraphs.activityViewController.hidePane(a);
return YES},showImage:function(b,a){return Smartgraphs.activityViewController.showImage(a.pane,a.path,a.caption)
},showGraph:function(b,a){Smartgraphs.activityViewController.showGraph(a.pane,a.name);
return YES},showTable:function(b,a){Smartgraphs.activityViewController.showTable(a.pane,a.dataset,a.annotations)
},waitForResponse:function(b,a){Smartgraphs.activityStepController.waitForResponse();
Smartgraphs.responseTemplateController.set("editingShouldBeEnabled",YES);return YES
},disableSubmission:function(){Smartgraphs.activityStepController.disableSubmission();
return YES},enableSubmission:function(){Smartgraphs.activityStepController.enableSubmission();
return YES},submitStep:function(){if(Smartgraphs.activityStepController.get("canSubmit")){this.gotoState("ACTIVITY_STEP_SUBMITTED")
}return YES},gotoNextPage:function(){this.submitStep();this.invokeLast(function(){Smartgraphs.statechart.sendAction("gotoNextPage")
})},createDataset:function(c,b){var d=Smartgraphs.activityObjectsController.createDataset(b.datasetName);
if(b.graphName){var a=Smartgraphs.GraphController.controllerForName[b.graphName];
a.addDataset(d)}return YES},removeDataset:function(c,b){var a=Smartgraphs.GraphController.controllerForName[b.graphName];
a.removeDataset(b.datasetName);return YES},createAnnotation:function(d,c){var b=Smartgraphs.GraphController.controllerForName[c.graphName];
var a=Smartgraphs.activityObjectsController.createAnnotation(c.type,c.name);if(b){b.addAnnotation(a)
}return YES},addAnnotation:function(c,b){var a=Smartgraphs.activityObjectsController.findAnnotation(b.name),d;
if(!a){return YES}if(b.graphName){d=Smartgraphs.GraphController.controllerForName[b.graphName]
}else{if(b.pane){d=Smartgraphs.activityViewController.graphControllerForPane(b.pane)
}}if(d){d.addAnnotation(a)}if(b.tableName&&Smartgraphs.TableController.controllerForDataset[b.tableName]){Smartgraphs.TableController.controllerForDataset[b.tableName].addAnnotation(a)
}return YES},removeAnnotation:function(c,b){var a;if(b.graphName){a=Smartgraphs.GraphController.controllerForName[b.graphName]
}else{if(b.tableName){a=Smartgraphs.TableController.controllerForDataset[b.tableName]
}}a.removeAnnotation(b.name);return YES},startFreehandInput:function(c,b){this.createAnnotation(this,{graphName:b.graphName,type:Smartgraphs.FreehandSketch,name:b.annotationName});
var a=Smartgraphs.GraphController.controllerForName[b.graphName];if(Smartgraphs.freehandInputController.register(a,b.annotationName)){this.gotoState("FREEHAND_INPUT")
}return YES},startSensorInput:function(d,c){var e=Smartgraphs.activityObjectsController.createDataset(c.datasetName,"/builtins/units/seconds","/builtins/units/meters");
e.set("xLabel","Time");e.set("xShortLabel","Time");e.set("yLabel","Position");e.set("yShortLabel","Position");
var a=Smartgraphs.GraphController.controllerForName[c.graphName];a.addDataset(e);
if(!e||!a){return YES}var b=a.getPath("xAxis.min");var g=a.getPath("xAxis.max");var f=Smartgraphs.activityViewController.paneForController(a);
if(Smartgraphs.sensorController.register(f,e,b,g)){this.gotoState("SENSOR")}return YES
},startInteractiveSelection:function(c,b){var e=Smartgraphs.activityObjectsController.findDataset(b.datasetName),a=Smartgraphs.activityObjectsController.findAnnotation(b.annotationName),f,d;
if(b.graphName){f=Smartgraphs.GraphController.controllerForName[b.graphName];d=Smartgraphs.TableController.controllerForDataset[b.datasetName];
if(!a){a=Smartgraphs.activityObjectsController.createAnnotation(Smartgraphs.HighlightedPoint,b.annotationName,{color:b.color})
}f.addAnnotation(a);if(d){d.addAnnotation(a)}}Smartgraphs.interactiveSelectionController.set("annotation",a);
Smartgraphs.interactiveSelectionController.set("dataset",e);this.gotoState("INTERACTIVE_SELECTION");
return YES}});Smartgraphs.ACTIVITY_STEP_SUBMITTED=SC.State.extend({enterState:function(){var c=Smartgraphs.activityStepController.get("content");
Smartgraphs.activityStepController.handleSubmission();var b=Smartgraphs.activityStepController.get("content");
if(b===c&&c&&c.get("isFinalStep")){var a=this;this.invokeLast(function(){a.gotoState("ACTIVITY_PAGE_DONE")
})}},exitState:function(){Smartgraphs.activityStepController.cleanup()},gotoStep:function(b,a){var c=Smartgraphs.store.find(Smartgraphs.ActivityStep,a.stepId);
Smartgraphs.activityStepController.set("content",c);this.gotoState("ACTIVITY_STEP");
return YES}});Smartgraphs.AUTHOR=SC.State.extend({initialSubstate:"AUTHOR_DEFAULT",enterState:function(){Smartgraphs.appWindowController.showAuthorView();
Smartgraphs.toolbarController.showRunButton();Smartgraphs.toolbarController.showSaveButton();
Smartgraphs.activityOutlineController.set("isSelectable",YES);Smartgraphs.activityViewController.set("enableBackAndForward",YES)
},exitState:function(){Smartgraphs.toolbarController.hideSaveButton();Smartgraphs.activityOutlineController.set("isSelectable",NO);
Smartgraphs.activityViewController.set("enableBackAndForward",NO)},AUTHOR_DEFAULT:SC.State.design({}),ERROR_SAVING_ACTIVITY:SC.State.design({enterState:function(){SC.AlertPane.error("Could not save activity","Could not save the activity. Someone else may have edited the activity you were working on. Try reloading the page and redoing your edits.")
}}),openActivity:function(){Smartgraphs.loadingActivityController.set("openAuthorViewAfterLoading",YES);
return NO},runActivity:function(){Smartgraphs.loadingActivityController.set("openAuthorViewAfterLoading",NO);
this.gotoState("LOADING_ACTIVITY");return YES},gotoNextPage:function(){Smartgraphs.activityPagesController.selectNextPage();
return YES},gotoPreviousPage:function(){Smartgraphs.activityPagesController.selectPreviousPage();
return YES},saveActivity:function(){Smartgraphs.activityController.save();return YES
},errorSavingActivity:function(){this.gotoState("ERROR_SAVING_ACTIVITY");return YES
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
a.set("isSelectable",NO);Smartgraphs.interactiveSelectionController.setPath("annotation.point",null)
},exitState:function(){var a=Smartgraphs.interactiveSelectionController.get("dataset");
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
this.gotoState("SENSOR_READY");return YES}})})});Smartgraphs.AxisView=RaphaelViews.RaphaelView.extend({displayProperties:"axis.min axis.max axis.nSteps axis.label parentView.parentView.frame".w(),render:function(a,b){if(!b){this.drawAxis();
this.drawLabel()}},didCreateLayer:function(){this._label=null;this.invokeLater(this.drawLabel);
this.invokeLater(this.drawAxis)},drawAxis:function(){if(this._axis){this._axis.remove()
}var e=this.get("axis");if(!e){return}var m=this.getPath("parentView.parentView.parentView.padding");
var c=this.getPath("parentView.parentView.frame");var b=c.x+m.left;var l=c.y+c.height-m.bottom;
var g=this.get("raphaelCanvas");if(g.canvas.style.display!=="block"){g.canvas.style.display="block"
}if(this.get("type")==="y"){var n=e.get("min");var d=e.get("max");var i=e.get("nSteps");
var k=c.height-m.top-m.bottom;this._axis=g.g.axis(b,l,k,n,d,i,1)}else{if(this.get("type")==="x"){var a=e.get("min");
var h=e.get("max");var f=e.get("nSteps");var j=c.width-m.left-m.right;this._axis=g.g.axis(b,l,j,a,h,f,0)
}}this._axis.all[0].attr({stroke:"#333333"});this._axis.all[1].attr({fill:"#333333"})
},drawLabel:function(){var h=this.getPath("parentView.parentView.parentView.padding");
var b=this.getPath("parentView.parentView.frame");var e=this.get("axis");if(!e){return
}var c=e.get("label");var a=e.getPath("units.pluralName");var d=a?"%@ (%@)".fmt(c,a):c;
var i,g,j;if(this.get("type")==="x"){i=(h.left+b.width-h.right)/2;g=b.height-15;j=0
}else{i=10;g=(h.top+b.height-h.bottom)/2;j=270}if(this._label){this._label.attr({text:d,x:i,y:g})
}else{var f=this.get("raphaelCanvas");if(f.canvas.style.display!=="block"){f.canvas.style.display="block"
}this._label=f.text(i,g,d).attr({font:"14px Arial, sans-serif",fill:"#333333"}).rotate(j)
}}});Smartgraphs.GraphView=SC.View.extend({xAxisBinding:"*graphController.xAxis",yAxisBinding:"*graphController.yAxis",datasetListBinding:"*graphController.datasetList",annotationListBinding:"*graphController.annotationList",padding:{top:15,right:15,bottom:45,left:45},childViews:"titleView graphCanvasView".w(),init:function(){this._viewsByClassAndId={};
arguments.callee.base.apply(this,arguments)},viewDidResize:function(){arguments.callee.base.apply(this,arguments);
this.replaceLayer()},annotationListDidChange:function(){this._itemListsDidChange()
}.observes("*annotationList.[]"),datasetListDidChange:function(){this._itemListsDidChange()
}.observes("*datasetList.[]"),_itemListsDidChange:function(){var g=this.get("datasetList").concat(this.get("annotationList"));
var m,e,b;var h={};var f,a=["data","annotation"];for(var c=0;c<a.length;c++){f=a[c];
g=this.get(f==="data"?"datasetList":"annotationList");for(var d=0,l=g.get("length");
d<l;d++){m=g.objectAt(d);e=SC.guidFor(m.constructor);b=m.get("id");if(h[e]===undefined){h[e]={}
}h[e][b]=m;if(!this._viewsByClassAndId[e]||!this._viewsByClassAndId[e][b]){this._addViewForItem(m,f)
}}}var k;for(e in this._viewsByClassAndId){if(this._viewsByClassAndId.hasOwnProperty(e)){for(b in this._viewsByClassAndId[e]){if(this._viewsByClassAndId[e].hasOwnProperty(b)){k=this._viewsByClassAndId[e][b];
if(!h[e]||!h[e][b]){this._removeView(k)}}}}}},_addViewForItem:function(c,e){var d=c.get("viewClass");
if(!d){return}var b=d.create({graphView:this,controller:this.get("graphController"),item:c,itemType:e});
if(e==="data"){this.getPath("graphCanvasView.dataHolder").appendChild(b)}else{if(e==="annotation"){this.getPath("graphCanvasView.annotationsHolder").appendChild(b)
}}var a=SC.guidFor(c.constructor);if(this._viewsByClassAndId[a]===undefined){this._viewsByClassAndId[a]={}
}this._viewsByClassAndId[a][c.get("id")]=b},_removeView:function(b){var c=b.get("item");
var d=b.get("itemType");var a=SC.guidFor(c.constructor);var e=c.get("id");delete this._viewsByClassAndId[a][e];
if(b.willRemoveFromDataView){b.willRemoveFromDataView()}if(d==="data"){this.getPath("graphCanvasView.dataHolder").removeChild(b)
}else{if(d==="annotation"){this.getPath("graphCanvasView.annotationsHolder").removeChild(b)
}}},coordinatesForPoint:function(m,k){var f=this.get("xAxis");var a=this.get("yAxis");
if(!f||!a){return{x:-9999,y:-9999}}var c=f.get("min"),h=f.get("max"),o=a.get("min"),g=a.get("max");
var e=this.get("frame");var p=e.height,b=e.width;var l=this.get("padding");var j=b-l.left-l.right;
var i=p-l.top-l.bottom;var n=j/(h-c);var d=i/(g-o);return{x:l.left+(m-c)*n,y:l.top+i-(k-o)*d}
},pointForCoordinates:function(m,k){var f=this.get("xAxis");var a=this.get("yAxis");
if(!f||!a){return undefined}var c=f.get("min"),h=f.get("max"),o=a.get("min"),g=a.get("max");
var e=this.get("frame");var p=e.height,b=e.width;var l=this.get("padding");var j=b-l.left-l.right;
var i=p-l.top-l.bottom;var n=j/(h-c);var d=i/(g-o);return{x:c+(m-l.left)/n,y:o+(l.top+i-k)/d}
},titleView:SC.LabelView.design({valueBinding:".parentView*graphController.title",classNames:"pane-label",layout:{width:400,centerX:0,height:20,top:20,zIndex:1},textAlign:SC.ALIGN_CENTER}),graphCanvasView:RaphaelViews.RaphaelCanvasView.design({layout:{zIndex:0},xAxisBinding:".parentView.xAxis",yAxisBinding:".parentView.yAxis",displayProperties:"xAxis.min xAxis.max yAxis.min yAxis.max".w(),childViews:"axesView annotationsHolder dataHolder".w(),axesView:RaphaelViews.RaphaelView.design({xAxisBinding:".parentView.parentView.xAxis",yAxisBinding:".parentView.parentView.yAxis",paddingBinding:".parentView.parentView.padding",childViews:"inputArea xAxisView yAxisView".w(),inputArea:RaphaelViews.RaphaelView.design({didCreateLayer:function(){this._graphView=this.getPath("parentView.parentView.parentView");
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
}}),xAxisView:Smartgraphs.AxisView.design({axisBinding:".parentView.parentView.parentView.xAxis",type:"x"}),yAxisView:Smartgraphs.AxisView.design({axisBinding:".parentView.parentView.parentView.yAxis",type:"y"})}),annotationsHolder:RaphaelViews.RaphaelView.design({}),dataHolder:RaphaelViews.RaphaelView.design({})})});
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
}}});sc_require("views/mixins/annotatable_item_view");Smartgraphs.TableItemView=SC.ListItemView.extend(Smartgraphs.AnnotatableItemView,{displayProperties:["backgroundColor"],classNames:["table-item"],controllerPath:"parentView.parentView.tableController",backgroundColor:function(){return this.get("overrideColor")||""
}.property("overrideColor").cacheable(),mouseDown:function(){Smartgraphs.statechart.sendAction("dataPointSelected",this,null);
return NO}});sc_require("views/table_item");Smartgraphs.TableView=SC.View.extend({showTableBinding:"*tableController.showTable",datasetBinding:"*tableController.dataset",xUnitsAbbreviatedBinding:"*tableController.dataset.xUnits.abbreviation",xShortLabelBinding:"*tableController.dataset.xShortLabel",yUnitsAbbreviatedBinding:"*tableController.dataset.yUnits.abbreviation",yShortLabelBinding:"*tableController.dataset.yShortLabel",yUnitsBinding:"*tableController.dataset.yUnits",latestXBinding:"*tableController.latestX",latestYBinding:"*tableController.latestY",annotationListBinding:"*tableController.annotationList",xLabel:function(){var a=this.get("xUnitsAbbreviated");
return a?"%@ (%@)".fmt(this.get("xShortLabel"),a):this.get("xShortLabel")}.property("xUnitsAbbreviated","xShortLabel").cacheable(),yLabel:function(){var a=this.get("yUnitsAbbreviated");
return a?"%@ (%@)".fmt(this.get("yShortLabel"),a):this.get("yShortLabel")}.property("yUnitsAbbreviated","yShortLabel").cacheable(),init:function(){this._viewsByClassAndId={};
arguments.callee.base.apply(this,arguments)},fix:function(a,b){return(a===undefined||a===null)?null:a.toFixed(b)
},numericX:function(){return this.fix(this.get("latestX"),1)}.property("latestX").cacheable(),numericY:function(){return this.fix(this.get("latestY"),2)
}.property("latestY").cacheable(),layout:{top:10,bottom:10},childViews:["numericView","tableColumnView"],numericView:SC.View.design({layout:{width:300,centerX:-10,height:90,centerY:-10},childViews:["xs","ys"],xs:SC.View.design({layout:{left:0,width:100},childViews:["xLabel","xValue"],xLabel:SC.LabelView.design({classNames:["smartgraph-numeric-view-label"],layout:{top:0,height:25},textAlign:SC.ALIGN_RIGHT,valueBinding:".parentView.parentView.parentView.xLabel"}),xValue:SC.LabelView.design({classNames:["smartgraph-numeric-view-value"],layout:{top:40},textAlign:SC.ALIGN_RIGHT,valueBinding:".parentView.parentView.parentView.numericX"})}),ys:SC.View.design({layout:{right:0,width:120},childViews:["yLabel","yValue"],yLabel:SC.LabelView.design({classNames:["smartgraph-numeric-view-label"],layout:{top:0,height:25},textAlign:SC.ALIGN_RIGHT,valueBinding:".parentView.parentView.parentView.yLabel"}),yValue:SC.LabelView.design({classNames:["smartgraph-numeric-view-value"],layout:{top:40},textAlign:SC.ALIGN_RIGHT,valueBinding:".parentView.parentView.parentView.numericY"})})}),tableColumnView:SC.View.design({layout:{width:350,left:45},classNames:["smartgraph-table"],childViews:["labelsView","scrollView"],labelsView:SC.View.design({classNames:["table-background","table-background-top"],layout:{left:40,top:0,width:250,height:25},childViews:["xsLabel","ysLabel"],xsLabel:SC.LabelView.design({layout:{left:15,top:7,width:90,height:18},valueBinding:".parentView.parentView.parentView.xLabel"}),ysLabel:SC.LabelView.design({layout:{left:105,top:7,width:90,height:18},valueBinding:".parentView.parentView.parentView.yLabel"})}),scrollView:SC.ScrollView.design({layout:{left:0,top:25,width:290},classNames:["table-background"],borderStyle:SC.BORDER_NONE,contentView:SC.View.design({rowHeight:20,tableControllerBinding:".parentView.parentView.parentView.parentView*tableController",contentBinding:".parentView.parentView.parentView.parentView*tableController.arrangedObjects",selectionBinding:".parentView.parentView.parentView.parentView*tableController.selection",isSelectableBinding:".parentView.parentView.parentView.parentView*tableController.isSelectable",contentLengthBinding:".content.length",annotationsListBinding:".parentView.parentView.parentView.parentView*tableController.annotationsList",contentLengthDidChange:function(){this.adjustHeightForContentLength()
}.observes("contentLength"),adjustHeightForContentLength:function(){var a=this.getPath("content.length");
this.adjust("height",a===0?0:a*this.get("rowHeight")+15)},childViews:["backdrop","xsView","ysView"],backdrop:RaphaelViews.RaphaelCanvasView.design({layout:{zIndex:0,width:290},childViews:"annotationsHolder".w(),annotationsHolder:RaphaelViews.RaphaelView.design({})}),xsView:SC.ListView.design({layout:{left:50,top:10,bottom:3,width:80},classNames:"table-column",rowHeightBinding:".parentView.rowHeight",canEditContent:NO,contentValueKey:"xRounded",contentBinding:".parentView.content",isSelectableBinding:".parentView.isSelectable",selectionBinding:".parentView.selection",exampleView:Smartgraphs.TableItemView}),ysView:SC.ListView.design({layout:{left:140,top:10,bottom:3,width:80},classNames:"table-column",rowHeightBinding:".parentView.rowHeight",canEditContent:NO,contentValueKey:"yRounded",contentBinding:".parentView.content",isSelectableBinding:".parentView.isSelectable",selectionBinding:".parentView.selection",exampleView:Smartgraphs.TableItemView})})})}),datasetDidChange:function(){this.invokeOnce("adjustViews")
}.observes("dataset"),showTableDidChange:function(){this.invokeOnce("adjustViews")
}.observes("showTable"),annotationListDidChange:function(){var g=this.get("annotationList");
var f,b,h;var a={};for(var d=0,e=g.get("length");d<e;d++){f=g.objectAt(d);b=SC.guidFor(f.constructor);
h=f.get("id");if(a[b]===undefined){a[b]={}}a[b][h]=f;if(!this._viewsByClassAndId[b]||!this._viewsByClassAndId[b][h]){this._addViewForItemToBackdrop(f,"annotation")
}}var c;for(b in this._viewsByClassAndId){if(this._viewsByClassAndId.hasOwnProperty(b)){for(h in this._viewsByClassAndId[b]){if(this._viewsByClassAndId[b].hasOwnProperty(h)){c=this._viewsByClassAndId[b][h];
if(!a[b]||!a[b][h]){this._removeViewFromBackdrop(c)}}}}}}.observes("*annotationList.[]"),adjustViews:function(){var b=this.get("tableColumnView");
var a=b.get("scrollView");var d=a.get("contentView");var c=this.get("numericView");
if(this.get("showTable")){c.set("isVisible",NO);d.bindings.forEach(function(e){e.connect()
});b.set("isVisible",YES);this.invokeLast(function(){d.adjustHeightForContentLength()
})}else{c.set("isVisible",YES);d.bindings.forEach(function(e){e.disconnect()});b.set("isVisible",NO)
}},_addViewForItemToBackdrop:function(c,d){var b=SC.guidFor(c.constructor);var a=c.constructor.viewClass.design({item:c,itemType:d}).create();
if(a.get("canShowInTable")){this.getPath("tableColumnView.scrollView.contentView.backdrop.annotationsHolder").appendChild(a);
if(this._viewsByClassAndId[b]===undefined){this._viewsByClassAndId[b]={}}this._viewsByClassAndId[b][c.get("id")]=a
}},_removeViewFromBackdrop:function(b){var c=b.get("item");var d=b.get("itemType");
var a=SC.guidFor(c.constructor);var e=c.get("id");delete this._viewsByClassAndId[a][e];
this.getPath("tableColumnView.scrollView.contentView.backdrop.annotationsHolder").removeChild(b)
}});Smartgraphs.mainPage=SC.Page.design({mainPane:SC.MainPane.design({theme:"pig",defaultResponder:"Smartgraphs.statechart",childViews:"topToolbar container bottomToolbar".w(),topToolbar:SC.ToolbarView.design({anchorLocation:SC.ANCHOR_TOP,childViews:["title","editButton","runButton","saveButton","savingMessage"],title:SC.LabelView.design({layout:{centerY:0,height:24,left:8,width:400},controlSize:SC.LARGE_CONTROL_SIZE,fontWeight:SC.BOLD_WEIGHT,valueBinding:"Smartgraphs.activityController.title"}),editButton:SC.ButtonView.design({layout:{right:20,centerY:0,height:24,width:80},isVisibleBinding:"Smartgraphs.toolbarController.shouldShowEditButton",title:"Edit",action:"openAuthorView"}),runButton:SC.ButtonView.design({layout:{right:20,centerY:0,height:24,width:80},isVisibleBinding:"Smartgraphs.toolbarController.shouldShowRunButton",title:"Run",action:"runActivity"}),saveButton:SC.ButtonView.design({layout:{right:120,centerY:0,height:24,width:80},isVisibleBinding:"Smartgraphs.toolbarController.shouldShowSaveButton",isEnabledBinding:"Smartgraphs.activityController.isDirty",title:"Save",action:"saveActivity"}),savingMessage:SC.LabelView.design({layout:{right:200,centerY:0,height:16,width:80},classNames:["toolbar-message"],value:"saving...",isVisibleBinding:"Smartgraphs.activityController.isSaving"})}),container:SC.SplitView.design({layout:{top:32,bottom:33,minWidth:960,minHeight:536},defaultThickness:200,topLeftMaxThickness:300,layoutDirection:SC.LAYOUT_HORIZONTAL,topLeftView:SC.ScrollView.design({classNames:["desk"],contentView:SC.SourceListView.design({classNames:["desk"],contentBinding:"Smartgraphs.activityOutlineController.arrangedObjects",contentValueKey:"title",selectionBinding:"Smartgraphs.activityOutlineController.selection",isSelectableBinding:"Smartgraphs.activityOutlineController.isSelectable"})}),dividerView:SC.SplitDividerView,bottomRightView:SC.ContainerView.design({nowShowingBinding:"Smartgraphs.appWindowController.viewToShow"}),shouldShowOutlineBinding:"Smartgraphs.appWindowController.shouldShowOutline",shouldShowOutlineDidChange:function(){if(this.get("shouldShowOutline")){this.setPath("topLeftView.isVisible",YES);
this.setPath("dividerView.isVisible",YES);this.updateChildLayout()}else{this.setPath("topLeftView.isVisible",NO);
this.setPath("dividerView.isVisible",NO);this.get("bottomRightView").adjust("left",0)
}}.observes("shouldShowOutline")}),bottomToolbar:SC.ToolbarView.design({anchorLocation:SC.ANCHOR_BOTTOM,childViews:["backButton","pageButtons","nextButton"],backButton:SC.ButtonView.design({layout:{left:20,centerY:0,height:24,width:80},title:"Back",theme:"capsule",action:"gotoPreviousPage",isSwipeLeft:YES,isEnabledBinding:"Smartgraphs.activityViewController.enableBackPageButton"}),pageButtons:SC.SegmentedView.design({layout:{left:120,right:120,height:24,centerY:0},classNames:["sc-regular-size"],itemsBinding:"Smartgraphs.activityPagesController",itemTitleKey:"pageNumberAsString",itemValueKey:"pageNumber",valueBinding:"Smartgraphs.activityPagesController.currentPageNumber"}),nextButton:SC.ButtonView.design({layout:{right:20,centerY:0,height:24,width:80},title:"Next",theme:"capsule",action:"gotoNextPage",isSwipeRight:YES,isVisibleBinding:"Smartgraphs.activityViewController.showNextPageButton",isEnabledBinding:"Smartgraphs.activityViewController.enableNextPageButton",isDefaultBinding:"Smartgraphs.activityViewController.highlightNextPageButton"})})}),loadingView:SC.View.design({classNames:"smartgraph-pane".w(),childViews:"loadingIconView loadingMessageView".w(),loadingIconView:SC.ImageView.design({layout:{width:48,height:48,centerX:0,centerY:-39},value:"/static/smartgraphs/en/c6b12a6d06047b38a17880b3dbeb632a0139b5ce/resources/pane_loading.gif"}),loadingMessageView:SC.LabelView.design({classNames:"loading".w(),layout:{width:200,height:24,centerX:0,centerY:15},textAlign:SC.ALIGN_CENTER,valueBinding:"Smartgraphs.appWindowController.loadingMessage"})})});
sc_require("resources/main_page");Smartgraphs.activityPageDef=SC.Page.extend({activityView:SC.View.design({childViews:"instructionsWrapper dataWrapper".w(),theme:"sc-ace",loadingMessage:"Loading Activity...",instructionsWrapper:SC.View.design({layout:{left:0,width:0.45},childViews:"instructionsView".w(),instructionsView:SC.View.design({classNames:"smartgraph-pane",childViews:"textWrapper".w(),textWrapper:SC.View.design({layout:{top:20,right:20,left:20},classNames:"text-wrapper".w(),childViews:"introText activityStepWrapper".w(),introText:SC.StaticContentView.design({contentBinding:"Smartgraphs.activityPageController.introText",isVisibleBinding:SC.Binding.bool("Smartgraphs.activityPageController.introText")}),activityStepWrapper:SC.View.design({useStaticLayout:YES,childViews:"activityStepDialog buttonsView".w(),activityStepDialog:SC.View.design({useStaticLayout:YES,isVisibleBinding:"Smartgraphs.activityStepController.dialogTextHasContent",childViews:"beforeText responseTemplate afterText".w(),classNames:"dialog-text".w(),beforeText:SC.StaticContentView.design({contentBinding:"Smartgraphs.activityStepController.beforeText",isVisibleBinding:SC.Binding.bool("Smartgraphs.activityStepController.beforeText")}),responseTemplate:Smartgraphs.ResponseTemplateView.design({fieldTypesBinding:"Smartgraphs.responseTemplateController.fieldTypes",fieldChoicesListBinding:"Smartgraphs.responseTemplateController.fieldChoicesList",valuesBinding:"Smartgraphs.responseTemplateController.values",editingShouldBeEnabledBinding:"Smartgraphs.responseTemplateController.editingShouldBeEnabled",viewShouldResetBinding:"Smartgraphs.responseTemplateController.viewShouldReset"}),afterText:SC.StaticContentView.design({contentBinding:"Smartgraphs.activityStepController.afterText",isVisibleBinding:SC.Binding.bool("Smartgraphs.activityStepController.afterText")})}),buttonsView:SC.View.design({useStaticLayout:YES,layout:{height:24},childViews:"submitButton".w(),submitButton:SC.ButtonView.design({layout:{width:180,right:0},titleBinding:"Smartgraphs.activityStepController.submitButtonTitle",isVisibleBinding:"Smartgraphs.activityViewController.showSubmitButton",isEnabledBinding:"Smartgraphs.activityViewController.enableSubmitButton",isDefaultBinding:"Smartgraphs.activityViewController.enableSubmitButton",action:"submitStep",titleDidChange:function(){var a=SC.metricsForString(this.get("title"),"label",["sc-button-label","text-wrapper"]);
this.adjust("width",a.width+48)}.observes("title")})})})})})}),dataWrapper:SC.View.design({layout:{right:0,width:0.55},childViews:"dataView".w(),dataView:SC.ContainerView.design({layout:{top:4,right:4,bottom:4,left:4},nowShowingBinding:"Smartgraphs.activityViewController.dataViewNowShowing"})})}),singlePaneDataView:SC.ContainerView.design({classNames:"smartgraph-pane",nowShowingBinding:"Smartgraphs.activityViewController.singlePaneNowShowing"}),splitPaneDataView:SC.View.design({childViews:"topPaneWrapper bottomPaneWrapper".w(),topPaneWrapper:SC.View.design({layout:{top:0,height:0.5},childViews:"topPane".w(),topPane:SC.ContainerView.design({layout:{bottom:2},classNames:"smartgraph-pane",nowShowingBinding:"Smartgraphs.activityViewController.topPaneNowShowing"})}),bottomPaneWrapper:SC.View.design({layout:{bottom:0,height:0.5},childViews:"bottomPane".w(),bottomPane:SC.ContainerView.design({layout:{top:2},classNames:"smartgraph-pane",nowShowingBinding:"Smartgraphs.activityViewController.bottomPaneNowShowing"})})}),firstImageView:SC.View.design({useStaticLayout:YES,childViews:["image","caption"],useStaticLayout:YES,caption:SC.LabelView.design({valueBinding:"Smartgraphs.activityViewController.firstImageCaption",valueBindingDefault:SC.Binding.oneWay(),isVisible:function(){return !!this.get("value")
}.property("value"),classNames:"floating-caption",layout:{top:10,left:10,right:10,height:20}}),image:SC.ImageView.design({valueBinding:"Smartgraphs.activityViewController.firstImageValue",useStaticLayout:YES,layout:{width:0.9999999}})}),secondImageView:SC.View.design({useStaticLayout:YES,childViews:["image","caption"],caption:SC.LabelView.design({valueBinding:"Smartgraphs.activityViewController.secondImageCaption",valueBindingDefault:SC.Binding.oneWay(),isVisible:function(){return !!this.get("value")
}.property("value"),classNames:"floating-caption",layout:{top:10,left:10,right:10,height:20}}),image:SC.ImageView.design({valueBinding:"Smartgraphs.activityViewController.secondImageValue",useStaticLayout:YES,layout:{width:0.9999999}})}),firstGraphPane:Smartgraphs.GraphPane.design({graphControllerBinding:"Smartgraphs.firstGraphController",controlsNowShowingBinding:"Smartgraphs.activityViewController.firstGraphPaneControls"}),secondGraphPane:Smartgraphs.GraphPane.design({graphControllerBinding:"Smartgraphs.secondGraphController",controlsNowShowingBinding:"Smartgraphs.activityViewController.secondGraphPaneControls"}),firstTableView:Smartgraphs.TableView.design({tableControllerBinding:"Smartgraphs.firstTableController"}),secondTableView:Smartgraphs.TableView.design({tableControllerBinding:"Smartgraphs.secondTableController"}),errorLoadingActivityView:SC.View.design({classNames:"smartgraph-pane",childViews:"errorMessage".w(),errorMessage:SC.LabelView.design({layout:{height:32,width:500,centerX:0,centerY:0},classNames:"error",textAlign:SC.ALIGN_CENTER,value:"There was an error loading that Activity."})}),graphControlsView:SC.View.design({layout:{height:35},childViews:"startControl stopControl clearControl".w(),startControl:SC.ButtonView.design({layout:{centerX:-110,bottom:10,width:80,height:24},isVisibleBinding:"Smartgraphs.activityViewController.startControlIsVisible",isEnabledBinding:"Smartgraphs.activityViewController.startControlIsEnabled",isDefaultBinding:"Smartgraphs.activityViewController.startControlIsDefault",title:"Start",action:"startControlWasClicked"}),stopControl:SC.ButtonView.design({layout:{centerX:0,bottom:10,width:80,height:24},isVisibleBinding:"Smartgraphs.activityViewController.stopControlIsVisible",isEnabledBinding:"Smartgraphs.activityViewController.stopControlIsEnabled",isDefaultBinding:"Smartgraphs.activityViewController.stopControlIsDefault",title:"Stop",action:"stopControlWasClicked"}),clearControl:SC.ButtonView.design({layout:{centerX:110,bottom:10,width:80,height:24},isVisibleBinding:"Smartgraphs.activityViewController.clearControlIsVisible",isEnabledBinding:"Smartgraphs.activityViewController.clearControlIsEnabled",isDefaultBinding:"Smartgraphs.activityViewController.clearControlIsDefault",title:"Clear",action:"clearControlWasClicked"})}),sensorLoadingView:SC.LabelView.design({layout:{height:35,width:250,centerX:0},classNames:"sensor-message".w(),textAlign:SC.ALIGN_CENTER,value:"Loading sensor..."})});
Smartgraphs.activityPage=Smartgraphs.activityPageDef.design();Smartgraphs.appletPage=SC.Page.design({sensorAppletView:CC.SensorAppletView.design({layout:{width:1,height:1},listenerPath:"Smartgraphs.sensorController"})});
sc_require("resources/main_page");Smartgraphs.authorPageDef=SC.Page.extend({authorView:SC.View.design({childViews:["instructionsWrapper","dataWrapper"],theme:"sc-ace",instructionsWrapper:SC.View.design({layout:{left:0,width:0.45},childViews:"instructionsView".w(),instructionsView:SC.View.design({classNames:"smartgraph-pane",childViews:"textWrapper".w(),textWrapper:SC.View.design({layout:{top:20,right:20,left:20},classNames:"text-wrapper".w(),childViews:"introTextView introTextHintView activityStepView".w(),minEditorHeight:100,introTextView:SC.LabelView.design({valueBinding:"Smartgraphs.activityPageController.introText",useStaticLayout:YES,escapeHTML:NO,isEditable:YES,isInlineEditorMultiline:YES,minEditorHeightBinding:".parentView.minEditorHeight",showEditor:NO,showEditorDidChange:function(){if(this.get("showEditor")){this.beginEditing()
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
this.adjust("height",this.get("originalHeight"))}}),activityStepView:SC.View.design({useStaticLayout:YES,isVisibleBinding:"Smartgraphs.activityStepController.dialogTextHasContent",childViews:"beforeTextView afterTextView".w(),classNames:"dialog-text".w(),beforeTextView:SC.StaticContentView.design({contentBinding:"Smartgraphs.activityStepController.beforeText",isVisibleBinding:SC.Binding.bool("Smartgraphs.activityStepController.beforeText")}),afterTextView:SC.StaticContentView.design({contentBinding:"Smartgraphs.activityStepController.afterText",isVisibleBinding:SC.Binding.bool("Smartgraphs.activityStepController.afterText")})})})})}),dataWrapper:SC.View.design({layout:{right:0,width:0.55},childViews:"dataView".w(),dataView:SC.View.design({layout:{top:4,right:4,bottom:4,left:4}})})})});
Smartgraphs.authorPage=Smartgraphs.authorPageDef.design();Smartgraphs.main=function main(){Smartgraphs.dataSource=SC.CascadeDataSource.create({dataSources:"couch fixtures".w(),couch:Smartgraphs.CouchDataSource.create(),fixtures:SC.FixturesDataSource.create()});
Smartgraphs.store=SC.Store.create().from(Smartgraphs.dataSource);Smartgraphs.preloadFixtures();
Smartgraphs.getPath("mainPage.mainPane").append();if(!window.location.hash){window.location.hash="/shared/instantaneous-speed"
}window.onbeforeunload=function(){return"You will lose your place in the activity if you leave this page."
};Smartgraphs.statechart.initStatechart()};Smartgraphs.preloadFixtures=function(){for(var a in Smartgraphs){if(Smartgraphs.hasOwnProperty(a)&&Smartgraphs[a]&&Smartgraphs[a].isClass&&Smartgraphs[a].FIXTURES){Smartgraphs.store.find(Smartgraphs[a])
}}};function main(){Smartgraphs.main()};