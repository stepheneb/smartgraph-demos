jasmine.TrivialReporter=function(a){this.document=a||document;this.suiteDivs={};this.logRunningSpecs=false
};jasmine.TrivialReporter.prototype.createDom=function(f,c,b){var e=document.createElement(f);
for(var d=2;d<arguments.length;d++){var g=arguments[d];if(typeof g==="string"){e.appendChild(document.createTextNode(g))
}else{if(g){e.appendChild(g)}}}for(var a in c){if(a=="className"){e[a]=c[a]}else{e.setAttribute(a,c[a])
}}return e};jasmine.TrivialReporter.prototype.reportRunnerStarting=function(h){var c,e;
this.outerDiv=this.createDom("div",{className:"jasmine_reporter"},this.createDom("div",{className:"banner"},this.createDom("div",{className:"logo"},this.createDom("a",{href:"http://pivotal.github.com/jasmine/",target:"_blank"},"Jasmine"),this.createDom("span",{className:"version"},h.env.versionString())),this.createDom("div",{className:"options"},"Show ",c=this.createDom("input",{id:"__jasmine_TrivialReporter_showPassed__",type:"checkbox"}),this.createDom("label",{"for":"__jasmine_TrivialReporter_showPassed__"}," passed "),e=this.createDom("input",{id:"__jasmine_TrivialReporter_showSkipped__",type:"checkbox"}),this.createDom("label",{"for":"__jasmine_TrivialReporter_showSkipped__"}," skipped"))),this.runnerDiv=this.createDom("div",{className:"runner running"},this.createDom("a",{className:"run_spec",href:"?"},"run all"),this.runnerMessageSpan=this.createDom("span",{},"Running..."),this.finishedAtSpan=this.createDom("span",{className:"finished-at"},"")));
this.document.body.appendChild(this.outerDiv);var f=h.suites();for(var b=0;b<f.length;
b++){var d=f[b];var g=this.createDom("div",{className:"suite"},this.createDom("a",{className:"run_spec",href:"?spec="+encodeURIComponent(d.getFullName())},"run"),this.createDom("a",{className:"description",href:"?spec="+encodeURIComponent(d.getFullName())},d.description));
this.suiteDivs[d.id]=g;var a=this.outerDiv;if(d.parentSuite){a=this.suiteDivs[d.parentSuite.id]
}a.appendChild(g)}this.startedAt=new Date();var j=this;c.onclick=function(i){if(c.checked){j.outerDiv.className+=" show-passed"
}else{j.outerDiv.className=j.outerDiv.className.replace(/ show-passed/,"")}};e.onclick=function(i){if(e.checked){j.outerDiv.className+=" show-skipped"
}else{j.outerDiv.className=j.outerDiv.className.replace(/ show-skipped/,"")}}};jasmine.TrivialReporter.prototype.reportRunnerResults=function(f){var c=f.results();
var d=(c.failedCount>0)?"runner failed":"runner passed";this.runnerDiv.setAttribute("class",d);
this.runnerDiv.setAttribute("className",d);var g=f.specs();var a=0;for(var b=0;b<g.length;
b++){if(this.specFilter(g[b])){a++}}var e=""+a+" spec"+(a==1?"":"s")+", "+c.failedCount+" failure"+((c.failedCount==1)?"":"s");
e+=" in "+((new Date().getTime()-this.startedAt.getTime())/1000)+"s";this.runnerMessageSpan.replaceChild(this.createDom("a",{className:"description",href:"?"},e),this.runnerMessageSpan.firstChild);
this.finishedAtSpan.appendChild(document.createTextNode("Finished at "+new Date().toString()))
};jasmine.TrivialReporter.prototype.reportSuiteResults=function(c){var b=c.results();
var a=b.passed()?"passed":"failed";if(b.totalCount==0){a="skipped"}this.suiteDivs[c.id].className+=" "+a
};jasmine.TrivialReporter.prototype.reportSpecStarting=function(a){if(this.logRunningSpecs){this.log(">> Jasmine Running "+a.suite.description+" "+a.description+"...")
}};jasmine.TrivialReporter.prototype.reportSpecResults=function(c){var g=c.results();
var b=g.passed()?"passed":"failed";if(g.skipped){b="skipped"}var d=this.createDom("div",{className:"spec "+b},this.createDom("a",{className:"run_spec",href:"?spec="+encodeURIComponent(c.getFullName())},"run"),this.createDom("a",{className:"description",href:"?spec="+encodeURIComponent(c.getFullName()),title:c.getFullName()},c.description));
var h=g.getItems();var f=this.createDom("div",{className:"messages"});for(var e=0;
e<h.length;e++){var a=h[e];if(a.type=="log"){f.appendChild(this.createDom("div",{className:"resultMessage log"},a.toString()))
}else{if(a.type=="expect"&&a.passed&&!a.passed()){f.appendChild(this.createDom("div",{className:"resultMessage fail"},a.message));
if(a.trace.stack){f.appendChild(this.createDom("div",{className:"stackTrace"},a.trace.stack))
}}}}if(f.childNodes.length>0){d.appendChild(f)}this.suiteDivs[c.suite.id].appendChild(d)
};jasmine.TrivialReporter.prototype.log=function(){var a=jasmine.getGlobal().console;
if(a&&a.log){if(a.log.apply){a.log.apply(a,arguments)}else{a.log(arguments)}}};jasmine.TrivialReporter.prototype.getLocation=function(){return this.document.location
};jasmine.TrivialReporter.prototype.specFilter=function(a){var c={};var e=this.getLocation().search.substring(1).split("&");
for(var b=0;b<e.length;b++){var d=e[b].split("=");c[decodeURIComponent(d[0])]=decodeURIComponent(d[1])
}if(!c.spec){return true}return a.getFullName().indexOf(c.spec)==0};var jsApiReporter;
(function(){var a=jasmine.getEnv();jsApiReporter=new jasmine.JsApiReporter();var b=new jasmine.TrivialReporter();
a.addReporter(jsApiReporter);a.addReporter(b);a.specFilter=function(c){return b.specFilter(c)
};window.onload=function(){a.execute()}})();function clickOn(a){SC.RunLoop.begin();
var b=SC.CoreQuery(a);if(b.length==0){throw new Error("Could not find "+a+" on the page")
}SC.Event.trigger(b,"mousemove");SC.Event.trigger(b,"mousedown");SC.Event.trigger(b,"mouseup");
SC.RunLoop.end()}function fillIn(a,b){SC.RunLoop.begin();var c=SC.CoreQuery(a);if(c.length==0){throw new Error("Could not find "+a+" on the page")
}c.val(b);SC.RunLoop.end()}jasmine.Matchers.prototype.toHaveClass=function(a){this.message=function(){return["Expected object to have the '"+a+"' css class, but it did not","Expected object not to have the '"+a+"' css class, but it did"]
};return this.actual.hasClass(a)};var jasmine={};jasmine.unimplementedMethod_=function(){throw new Error("unimplemented method")
};jasmine.undefined=jasmine.___undefined___;jasmine.DEFAULT_UPDATE_INTERVAL=250;jasmine.DEFAULT_TIMEOUT_INTERVAL=5000;
jasmine.getGlobal=function(){function a(){return this}return a()};jasmine.bindOriginal_=function(c,a){var b=c[a];
if(b.apply){return function(){return b.apply(c,arguments)}}else{return jasmine.getGlobal()[a]
}};jasmine.setTimeout=jasmine.bindOriginal_(jasmine.getGlobal(),"setTimeout");jasmine.clearTimeout=jasmine.bindOriginal_(jasmine.getGlobal(),"clearTimeout");
jasmine.setInterval=jasmine.bindOriginal_(jasmine.getGlobal(),"setInterval");jasmine.clearInterval=jasmine.bindOriginal_(jasmine.getGlobal(),"clearInterval");
jasmine.MessageResult=function(a){this.type="log";this.values=a;this.trace=new Error()
};jasmine.MessageResult.prototype.toString=function(){var b="";for(var a=0;a<this.values.length;
a++){if(a>0){b+=" "}if(jasmine.isString_(this.values[a])){b+=this.values[a]}else{b+=jasmine.pp(this.values[a])
}}return b};jasmine.ExpectationResult=function(a){this.type="expect";this.matcherName=a.matcherName;
this.passed_=a.passed;this.expected=a.expected;this.actual=a.actual;this.message=this.passed_?"Passed.":a.message;
this.trace=this.passed_?"":new Error(this.message)};jasmine.ExpectationResult.prototype.toString=function(){return this.message
};jasmine.ExpectationResult.prototype.passed=function(){return this.passed_};jasmine.getEnv=function(){return jasmine.currentEnv_=jasmine.currentEnv_||new jasmine.Env()
};jasmine.isArray_=function(a){return jasmine.isA_("Array",a)};jasmine.isString_=function(a){return jasmine.isA_("String",a)
};jasmine.isNumber_=function(a){return jasmine.isA_("Number",a)};jasmine.isA_=function(a,b){return Object.prototype.toString.apply(b)==="[object "+a+"]"
};jasmine.pp=function(a){var b=new jasmine.StringPrettyPrinter();b.format(a);return b.string
};jasmine.isDomNode=function(a){return a.nodeType>0};jasmine.any=function(a){return new jasmine.Matchers.Any(a)
};jasmine.Spy=function(a){this.identity=a||"unknown";this.isSpy=true;this.plan=function(){};
this.mostRecentCall={};this.argsForCall=[];this.calls=[]};jasmine.Spy.prototype.andCallThrough=function(){this.plan=this.originalValue;
return this};jasmine.Spy.prototype.andReturn=function(a){this.plan=function(){return a
};return this};jasmine.Spy.prototype.andThrow=function(a){this.plan=function(){throw a
};return this};jasmine.Spy.prototype.andCallFake=function(a){this.plan=a;return this
};jasmine.Spy.prototype.reset=function(){this.wasCalled=false;this.callCount=0;this.argsForCall=[];
this.calls=[];this.mostRecentCall={}};jasmine.createSpy=function(b){var a=function(){a.wasCalled=true;
a.callCount++;var e=jasmine.util.argsToArray(arguments);a.mostRecentCall.object=this;
a.mostRecentCall.args=e;a.argsForCall.push(e);a.calls.push({object:this,args:e});
return a.plan.apply(this,arguments)};var c=new jasmine.Spy(b);for(var d in c){a[d]=c[d]
}a.reset();return a};jasmine.isSpy=function(a){return a&&a.isSpy};jasmine.createSpyObj=function(b,c){if(!jasmine.isArray_(c)||c.length==0){throw new Error("createSpyObj requires a non-empty array of method names to create spies for")
}var d={};for(var a=0;a<c.length;a++){d[c[a]]=jasmine.createSpy(b+"."+c[a])}return d
};jasmine.log=function(){var a=jasmine.getEnv().currentSpec;a.log.apply(a,arguments)
};var spyOn=function(b,a){return jasmine.getEnv().currentSpec.spyOn(b,a)};var it=function(b,a){return jasmine.getEnv().it(b,a)
};var xit=function(b,a){return jasmine.getEnv().xit(b,a)};var expect=function(a){return jasmine.getEnv().currentSpec.expect(a)
};var runs=function(a){jasmine.getEnv().currentSpec.runs(a)};var waits=function(a){jasmine.getEnv().currentSpec.waits(a)
};var waitsFor=function(c,a,b){jasmine.getEnv().currentSpec.waitsFor.apply(jasmine.getEnv().currentSpec,arguments)
};var beforeEach=function(a){jasmine.getEnv().beforeEach(a)};var afterEach=function(a){jasmine.getEnv().afterEach(a)
};var describe=function(b,a){return jasmine.getEnv().describe(b,a)};var xdescribe=function(b,a){return jasmine.getEnv().xdescribe(b,a)
};jasmine.XmlHttpRequest=(typeof XMLHttpRequest=="undefined")?function(){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")
}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP")
}catch(a){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(a){}throw new Error("This browser does not support XMLHttpRequest.")
}:XMLHttpRequest;jasmine.util={};jasmine.util.inherit=function(b,c){var a=function(){};
a.prototype=c.prototype;b.prototype=new a};jasmine.util.formatException=function(d){var a;
if(d.line){a=d.line}else{if(d.lineNumber){a=d.lineNumber}}var b;if(d.sourceURL){b=d.sourceURL
}else{if(d.fileName){b=d.fileName}}var c=(d.name&&d.message)?(d.name+": "+d.message):d.toString();
if(b&&a){c+=" in "+b+" (line "+a+")"}return c};jasmine.util.htmlEscape=function(a){if(!a){return a
}return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")};jasmine.util.argsToArray=function(b){var a=[];
for(var c=0;c<b.length;c++){a.push(b[c])}return a};jasmine.util.extend=function(a,c){for(var b in c){a[b]=c[b]
}return a};jasmine.Env=function(){this.currentSpec=null;this.currentSuite=null;this.currentRunner_=new jasmine.Runner(this);
this.reporter=new jasmine.MultiReporter();this.updateInterval=jasmine.DEFAULT_UPDATE_INTERVAL;
this.defaultTimeoutInterval=jasmine.DEFAULT_TIMEOUT_INTERVAL;this.lastUpdate=0;this.specFilter=function(){return true
};this.nextSpecId_=0;this.nextSuiteId_=0;this.equalityTesters_=[];this.matchersClass=function(){jasmine.Matchers.apply(this,arguments)
};jasmine.util.inherit(this.matchersClass,jasmine.Matchers);jasmine.Matchers.wrapInto_(jasmine.Matchers.prototype,this.matchersClass)
};jasmine.Env.prototype.setTimeout=jasmine.setTimeout;jasmine.Env.prototype.clearTimeout=jasmine.clearTimeout;
jasmine.Env.prototype.setInterval=jasmine.setInterval;jasmine.Env.prototype.clearInterval=jasmine.clearInterval;
jasmine.Env.prototype.version=function(){if(jasmine.version_){return jasmine.version_
}else{throw new Error("Version not set")}};jasmine.Env.prototype.versionString=function(){if(jasmine.version_){var a=this.version();
return a.major+"."+a.minor+"."+a.build+" revision "+a.revision}else{return"version unknown"
}};jasmine.Env.prototype.nextSpecId=function(){return this.nextSpecId_++};jasmine.Env.prototype.nextSuiteId=function(){return this.nextSuiteId_++
};jasmine.Env.prototype.addReporter=function(a){this.reporter.addReporter(a)};jasmine.Env.prototype.execute=function(){this.currentRunner_.execute()
};jasmine.Env.prototype.describe=function(f,b){var d=new jasmine.Suite(this,f,b,this.currentSuite);
var c=this.currentSuite;if(c){c.add(d)}else{this.currentRunner_.add(d)}this.currentSuite=d;
var a=null;try{b.call(d)}catch(g){a=g}this.currentSuite=c;if(a){this.it("encountered a declaration exception",function(){throw a
})}return d};jasmine.Env.prototype.beforeEach=function(a){if(this.currentSuite){this.currentSuite.beforeEach(a)
}else{this.currentRunner_.beforeEach(a)}};jasmine.Env.prototype.currentRunner=function(){return this.currentRunner_
};jasmine.Env.prototype.afterEach=function(a){if(this.currentSuite){this.currentSuite.afterEach(a)
}else{this.currentRunner_.afterEach(a)}};jasmine.Env.prototype.xdescribe=function(b,a){return{execute:function(){}}
};jasmine.Env.prototype.it=function(c,b){var a=new jasmine.Spec(this,this.currentSuite,c);
this.currentSuite.add(a);this.currentSpec=a;if(b){a.runs(b)}return a};jasmine.Env.prototype.xit=function(b,a){return{id:this.nextSpecId(),runs:function(){}}
};jasmine.Env.prototype.compareObjects_=function(e,d,c,h){if(e.__Jasmine_been_here_before__===d&&d.__Jasmine_been_here_before__===e){return true
}e.__Jasmine_been_here_before__=d;d.__Jasmine_been_here_before__=e;var f=function(b,a){return b!=null&&b[a]!==jasmine.undefined
};for(var g in d){if(!f(e,g)&&f(d,g)){c.push("expected has key '"+g+"', but missing from actual.")
}}for(g in e){if(!f(d,g)&&f(e,g)){c.push("expected missing key '"+g+"', but present in actual.")
}}for(g in d){if(g=="__Jasmine_been_here_before__"){continue}if(!this.equals_(e[g],d[g],c,h)){h.push("'"+g+"' was '"+(d[g]?jasmine.util.htmlEscape(d[g].toString()):d[g])+"' in expected, but was '"+(e[g]?jasmine.util.htmlEscape(e[g].toString()):e[g])+"' in actual.")
}}if(jasmine.isArray_(e)&&jasmine.isArray_(d)&&e.length!=d.length){h.push("arrays were not the same length")
}delete e.__Jasmine_been_here_before__;delete d.__Jasmine_been_here_before__;return(c.length==0&&h.length==0)
};jasmine.Env.prototype.equals_=function(f,e,d,j){d=d||[];j=j||[];for(var g=0;g<this.equalityTesters_.length;
g++){var h=this.equalityTesters_[g];var c=h(f,e,this,d,j);if(c!==jasmine.undefined){return c
}}if(f===e){return true}if(f===jasmine.undefined||f===null||e===jasmine.undefined||e===null){return(f==jasmine.undefined&&e==jasmine.undefined)
}if(jasmine.isDomNode(f)&&jasmine.isDomNode(e)){return f===e}if(f instanceof Date&&e instanceof Date){return f.getTime()==e.getTime()
}if(f instanceof jasmine.Matchers.Any){return f.matches(e)}if(e instanceof jasmine.Matchers.Any){return e.matches(f)
}if(jasmine.isString_(f)&&jasmine.isString_(e)){return(f==e)}if(jasmine.isNumber_(f)&&jasmine.isNumber_(e)){return(f==e)
}if(typeof f==="object"&&typeof e==="object"){return this.compareObjects_(f,e,d,j)
}return(f===e)};jasmine.Env.prototype.contains_=function(b,c){if(jasmine.isArray_(b)){for(var a=0;
a<b.length;a++){if(this.equals_(b[a],c)){return true}}return false}return b.indexOf(c)>=0
};jasmine.Env.prototype.addEqualityTester=function(a){this.equalityTesters_.push(a)
};jasmine.Reporter=function(){};jasmine.Reporter.prototype.reportRunnerStarting=function(a){};
jasmine.Reporter.prototype.reportRunnerResults=function(a){};jasmine.Reporter.prototype.reportSuiteResults=function(a){};
jasmine.Reporter.prototype.reportSpecStarting=function(a){};jasmine.Reporter.prototype.reportSpecResults=function(a){};
jasmine.Reporter.prototype.log=function(a){};jasmine.Block=function(b,c,a){this.env=b;
this.func=c;this.spec=a};jasmine.Block.prototype.execute=function(b){try{this.func.apply(this.spec)
}catch(a){this.spec.fail(a)}b()};jasmine.JsApiReporter=function(){this.started=false;
this.finished=false;this.suites_=[];this.results_={}};jasmine.JsApiReporter.prototype.reportRunnerStarting=function(d){this.started=true;
var c=d.topLevelSuites();for(var a=0;a<c.length;a++){var b=c[a];this.suites_.push(this.summarize_(b))
}};jasmine.JsApiReporter.prototype.suites=function(){return this.suites_};jasmine.JsApiReporter.prototype.summarize_=function(e){var d=e instanceof jasmine.Suite;
var a={id:e.id,name:e.description,type:d?"suite":"spec",children:[]};if(d){var c=e.children();
for(var b=0;b<c.length;b++){a.children.push(this.summarize_(c[b]))}}return a};jasmine.JsApiReporter.prototype.results=function(){return this.results_
};jasmine.JsApiReporter.prototype.resultsForSpec=function(a){return this.results_[a]
};jasmine.JsApiReporter.prototype.reportRunnerResults=function(a){this.finished=true
};jasmine.JsApiReporter.prototype.reportSuiteResults=function(a){};jasmine.JsApiReporter.prototype.reportSpecResults=function(a){this.results_[a.id]={messages:a.results().getItems(),result:a.results().failedCount>0?"failed":"passed"}
};jasmine.JsApiReporter.prototype.log=function(a){};jasmine.JsApiReporter.prototype.resultsForSpecs=function(d){var c={};
for(var b=0;b<d.length;b++){var a=d[b];c[a]=this.summarizeResult_(this.results_[a])
}return c};jasmine.JsApiReporter.prototype.summarizeResult_=function(a){var e=[];
var b=a.messages.length;for(var d=0;d<b;d++){var c=a.messages[d];e.push({text:c.type=="log"?c.toString():jasmine.undefined,passed:c.passed?c.passed():true,type:c.type,message:c.message,trace:{stack:c.passed&&!c.passed()?c.trace.stack:jasmine.undefined}})
}return{result:a.result,messages:e}};jasmine.Matchers=function(b,d,a,c){this.env=b;
this.actual=d;this.spec=a;this.isNot=c||false;this.reportWasCalled_=false};jasmine.Matchers.pp=function(a){throw new Error("jasmine.Matchers.pp() is no longer supported, please use jasmine.pp() instead!")
};jasmine.Matchers.prototype.report=function(a,c,b){throw new Error("As of jasmine 0.11, custom matchers must be implemented differently -- please see jasmine docs")
};jasmine.Matchers.wrapInto_=function(b,c){for(var a in b){if(a=="report"){continue
}var d=b[a];c.prototype[a]=jasmine.Matchers.matcherFn_(a,d)}};jasmine.Matchers.matcherFn_=function(b,a){return function(){var f=jasmine.util.argsToArray(arguments);
var c=a.apply(this,arguments);if(this.isNot){c=!c}if(this.reportWasCalled_){return c
}var e;if(!c){if(this.message){e=this.message.apply(this,arguments);if(jasmine.isArray_(e)){e=e[this.isNot?1:0]
}}else{var h=b.replace(/[A-Z]/g,function(i){return" "+i.toLowerCase()});e="Expected "+jasmine.pp(this.actual)+(this.isNot?" not ":" ")+h;
if(f.length>0){for(var d=0;d<f.length;d++){if(d>0){e+=","}e+=" "+jasmine.pp(f[d])
}}e+="."}}var g=new jasmine.ExpectationResult({matcherName:b,passed:c,expected:f.length>1?f:f[0],actual:this.actual,message:e});
this.spec.addMatcherResult(g);return jasmine.undefined}};jasmine.Matchers.prototype.toBe=function(a){return this.actual===a
};jasmine.Matchers.prototype.toNotBe=function(a){return this.actual!==a};jasmine.Matchers.prototype.toEqual=function(a){return this.env.equals_(this.actual,a)
};jasmine.Matchers.prototype.toNotEqual=function(a){return !this.env.equals_(this.actual,a)
};jasmine.Matchers.prototype.toMatch=function(a){return new RegExp(a).test(this.actual)
};jasmine.Matchers.prototype.toNotMatch=function(a){return !(new RegExp(a).test(this.actual))
};jasmine.Matchers.prototype.toBeDefined=function(){return(this.actual!==jasmine.undefined)
};jasmine.Matchers.prototype.toBeUndefined=function(){return(this.actual===jasmine.undefined)
};jasmine.Matchers.prototype.toBeNull=function(){return(this.actual===null)};jasmine.Matchers.prototype.toBeTruthy=function(){return !!this.actual
};jasmine.Matchers.prototype.toBeFalsy=function(){return !this.actual};jasmine.Matchers.prototype.toHaveBeenCalled=function(){if(arguments.length>0){throw new Error("toHaveBeenCalled does not take arguments, use toHaveBeenCalledWith")
}if(!jasmine.isSpy(this.actual)){throw new Error("Expected a spy, but got "+jasmine.pp(this.actual)+".")
}this.message=function(){return["Expected spy "+this.actual.identity+" to have been called.","Expected spy "+this.actual.identity+" not to have been called."]
};return this.actual.wasCalled};jasmine.Matchers.prototype.wasCalled=jasmine.Matchers.prototype.toHaveBeenCalled;
jasmine.Matchers.prototype.wasNotCalled=function(){if(arguments.length>0){throw new Error("wasNotCalled does not take arguments")
}if(!jasmine.isSpy(this.actual)){throw new Error("Expected a spy, but got "+jasmine.pp(this.actual)+".")
}this.message=function(){return["Expected spy "+this.actual.identity+" to not have been called.","Expected spy "+this.actual.identity+" to have been called."]
};return !this.actual.wasCalled};jasmine.Matchers.prototype.toHaveBeenCalledWith=function(){var a=jasmine.util.argsToArray(arguments);
if(!jasmine.isSpy(this.actual)){throw new Error("Expected a spy, but got "+jasmine.pp(this.actual)+".")
}this.message=function(){if(this.actual.callCount==0){return["Expected spy to have been called with "+jasmine.pp(a)+" but it was never called.","Expected spy not to have been called with "+jasmine.pp(a)+" but it was."]
}else{return["Expected spy to have been called with "+jasmine.pp(a)+" but was called with "+jasmine.pp(this.actual.argsForCall),"Expected spy not to have been called with "+jasmine.pp(a)+" but was called with "+jasmine.pp(this.actual.argsForCall)]
}};return this.env.contains_(this.actual.argsForCall,a)};jasmine.Matchers.prototype.wasCalledWith=jasmine.Matchers.prototype.toHaveBeenCalledWith;
jasmine.Matchers.prototype.wasNotCalledWith=function(){var a=jasmine.util.argsToArray(arguments);
if(!jasmine.isSpy(this.actual)){throw new Error("Expected a spy, but got "+jasmine.pp(this.actual)+".")
}this.message=function(){return["Expected spy not to have been called with "+jasmine.pp(a)+" but it was","Expected spy to have been called with "+jasmine.pp(a)+" but it was"]
};return !this.env.contains_(this.actual.argsForCall,a)};jasmine.Matchers.prototype.toContain=function(a){return this.env.contains_(this.actual,a)
};jasmine.Matchers.prototype.toNotContain=function(a){return !this.env.contains_(this.actual,a)
};jasmine.Matchers.prototype.toBeLessThan=function(a){return this.actual<a};jasmine.Matchers.prototype.toBeGreaterThan=function(a){return this.actual>a
};jasmine.Matchers.prototype.toThrow=function(d){var a=false;var b;if(typeof this.actual!="function"){throw new Error("Actual is not a function")
}try{this.actual()}catch(f){b=f}if(b){a=(d===jasmine.undefined||this.env.equals_(b.message||b,d.message||d))
}var c=this.isNot?"not ":"";this.message=function(){if(b&&(d===jasmine.undefined||!this.env.equals_(b.message||b,d.message||d))){return["Expected function "+c+"to throw",d?d.message||d:" an exception",", but it threw",b.message||b].join(" ")
}else{return"Expected function to throw an exception."}};return a};jasmine.Matchers.Any=function(a){this.expectedClass=a
};jasmine.Matchers.Any.prototype.matches=function(a){if(this.expectedClass==String){return typeof a=="string"||a instanceof String
}if(this.expectedClass==Number){return typeof a=="number"||a instanceof Number}if(this.expectedClass==Function){return typeof a=="function"||a instanceof Function
}if(this.expectedClass==Object){return typeof a=="object"}return a instanceof this.expectedClass
};jasmine.Matchers.Any.prototype.toString=function(){return"<jasmine.any("+this.expectedClass+")>"
};jasmine.MultiReporter=function(){this.subReporters_=[]};jasmine.util.inherit(jasmine.MultiReporter,jasmine.Reporter);
jasmine.MultiReporter.prototype.addReporter=function(a){this.subReporters_.push(a)
};(function(){var c=["reportRunnerStarting","reportRunnerResults","reportSuiteResults","reportSpecStarting","reportSpecResults","log"];
for(var a=0;a<c.length;a++){var b=c[a];jasmine.MultiReporter.prototype[b]=(function(d){return function(){for(var e=0;
e<this.subReporters_.length;e++){var f=this.subReporters_[e];if(f[d]){f[d].apply(f,arguments)
}}}})(b)}})();jasmine.NestedResults=function(){this.totalCount=0;this.passedCount=0;
this.failedCount=0;this.skipped=false;this.items_=[]};jasmine.NestedResults.prototype.rollupCounts=function(a){this.totalCount+=a.totalCount;
this.passedCount+=a.passedCount;this.failedCount+=a.failedCount};jasmine.NestedResults.prototype.log=function(a){this.items_.push(new jasmine.MessageResult(a))
};jasmine.NestedResults.prototype.getItems=function(){return this.items_};jasmine.NestedResults.prototype.addResult=function(a){if(a.type!="log"){if(a.items_){this.rollupCounts(a)
}else{this.totalCount++;if(a.passed()){this.passedCount++}else{this.failedCount++
}}}this.items_.push(a)};jasmine.NestedResults.prototype.passed=function(){return this.passedCount===this.totalCount
};jasmine.PrettyPrinter=function(){this.ppNestLevel_=0};jasmine.PrettyPrinter.prototype.format=function(a){if(this.ppNestLevel_>40){throw new Error("jasmine.PrettyPrinter: format() nested too deeply!")
}this.ppNestLevel_++;try{if(a===jasmine.undefined){this.emitScalar("undefined")}else{if(a===null){this.emitScalar("null")
}else{if(a===jasmine.getGlobal()){this.emitScalar("<global>")}else{if(a instanceof jasmine.Matchers.Any){this.emitScalar(a.toString())
}else{if(typeof a==="string"){this.emitString(a)}else{if(jasmine.isSpy(a)){this.emitScalar("spy on "+a.identity)
}else{if(a instanceof RegExp){this.emitScalar(a.toString())}else{if(typeof a==="function"){this.emitScalar("Function")
}else{if(typeof a.nodeType==="number"){this.emitScalar("HTMLNode")}else{if(a instanceof Date){this.emitScalar("Date("+a+")")
}else{if(a.__Jasmine_been_here_before__){this.emitScalar("<circular reference: "+(jasmine.isArray_(a)?"Array":"Object")+">")
}else{if(jasmine.isArray_(a)||typeof a=="object"){a.__Jasmine_been_here_before__=true;
if(jasmine.isArray_(a)){this.emitArray(a)}else{this.emitObject(a)}delete a.__Jasmine_been_here_before__
}else{this.emitScalar(a.toString())}}}}}}}}}}}}}finally{this.ppNestLevel_--}};jasmine.PrettyPrinter.prototype.iterateObject=function(c,a){for(var b in c){if(b=="__Jasmine_been_here_before__"){continue
}a(b,c.__lookupGetter__?(c.__lookupGetter__(b)!=null):false)}};jasmine.PrettyPrinter.prototype.emitArray=jasmine.unimplementedMethod_;
jasmine.PrettyPrinter.prototype.emitObject=jasmine.unimplementedMethod_;jasmine.PrettyPrinter.prototype.emitScalar=jasmine.unimplementedMethod_;
jasmine.PrettyPrinter.prototype.emitString=jasmine.unimplementedMethod_;jasmine.StringPrettyPrinter=function(){jasmine.PrettyPrinter.call(this);
this.string=""};jasmine.util.inherit(jasmine.StringPrettyPrinter,jasmine.PrettyPrinter);
jasmine.StringPrettyPrinter.prototype.emitScalar=function(a){this.append(a)};jasmine.StringPrettyPrinter.prototype.emitString=function(a){this.append("'"+a+"'")
};jasmine.StringPrettyPrinter.prototype.emitArray=function(b){this.append("[ ");for(var a=0;
a<b.length;a++){if(a>0){this.append(", ")}this.format(b[a])}this.append(" ]")};jasmine.StringPrettyPrinter.prototype.emitObject=function(b){var a=this;
this.append("{ ");var c=true;this.iterateObject(b,function(d,e){if(c){c=false}else{a.append(", ")
}a.append(d);a.append(" : ");if(e){a.append("<getter>")}else{a.format(b[d])}});this.append(" }")
};jasmine.StringPrettyPrinter.prototype.append=function(a){this.string+=a};jasmine.Queue=function(a){this.env=a;
this.blocks=[];this.running=false;this.index=0;this.offset=0;this.abort=false};jasmine.Queue.prototype.addBefore=function(a){this.blocks.unshift(a)
};jasmine.Queue.prototype.add=function(a){this.blocks.push(a)};jasmine.Queue.prototype.insertNext=function(a){this.blocks.splice((this.index+this.offset+1),0,a);
this.offset++};jasmine.Queue.prototype.start=function(a){this.running=true;this.onComplete=a;
this.next_()};jasmine.Queue.prototype.isRunning=function(){return this.running};jasmine.Queue.LOOP_DONT_RECURSE=true;
jasmine.Queue.prototype.next_=function(){var a=this;var d=true;while(d){d=false;if(a.index<a.blocks.length&&!this.abort){var e=true;
var b=false;var c=function(){if(jasmine.Queue.LOOP_DONT_RECURSE&&e){b=true;return
}if(a.blocks[a.index].abort){a.abort=true}a.offset=0;a.index++;var f=new Date().getTime();
if(a.env.updateInterval&&f-a.env.lastUpdate>a.env.updateInterval){a.env.lastUpdate=f;
a.env.setTimeout(function(){a.next_()},0)}else{if(jasmine.Queue.LOOP_DONT_RECURSE&&b){d=true
}else{a.next_()}}};a.blocks[a.index].execute(c);e=false;if(b){c()}}else{a.running=false;
if(a.onComplete){a.onComplete()}}}};jasmine.Queue.prototype.results=function(){var b=new jasmine.NestedResults();
for(var a=0;a<this.blocks.length;a++){if(this.blocks[a].results){b.addResult(this.blocks[a].results())
}}return b};jasmine.Runner=function(b){var a=this;a.env=b;a.queue=new jasmine.Queue(b);
a.before_=[];a.after_=[];a.suites_=[]};jasmine.Runner.prototype.execute=function(){var a=this;
if(a.env.reporter.reportRunnerStarting){a.env.reporter.reportRunnerStarting(this)
}a.queue.start(function(){a.finishCallback()})};jasmine.Runner.prototype.beforeEach=function(a){a.typeName="beforeEach";
this.before_.splice(0,0,a)};jasmine.Runner.prototype.afterEach=function(a){a.typeName="afterEach";
this.after_.splice(0,0,a)};jasmine.Runner.prototype.finishCallback=function(){this.env.reporter.reportRunnerResults(this)
};jasmine.Runner.prototype.addSuite=function(a){this.suites_.push(a)};jasmine.Runner.prototype.add=function(a){if(a instanceof jasmine.Suite){this.addSuite(a)
}this.queue.add(a)};jasmine.Runner.prototype.specs=function(){var b=this.suites();
var c=[];for(var a=0;a<b.length;a++){c=c.concat(b[a].specs())}return c};jasmine.Runner.prototype.suites=function(){return this.suites_
};jasmine.Runner.prototype.topLevelSuites=function(){var b=[];for(var a=0;a<this.suites_.length;
a++){if(!this.suites_[a].parentSuite){b.push(this.suites_[a])}}return b};jasmine.Runner.prototype.results=function(){return this.queue.results()
};jasmine.Spec=function(c,b,d){if(!c){throw new Error("jasmine.Env() required")}if(!b){throw new Error("jasmine.Suite() required")
}var a=this;a.id=c.nextSpecId?c.nextSpecId():null;a.env=c;a.suite=b;a.description=d;
a.queue=new jasmine.Queue(c);a.afterCallbacks=[];a.spies_=[];a.results_=new jasmine.NestedResults();
a.results_.description=d;a.matchersClass=null};jasmine.Spec.prototype.getFullName=function(){return this.suite.getFullName()+" "+this.description+"."
};jasmine.Spec.prototype.results=function(){return this.results_};jasmine.Spec.prototype.log=function(){return this.results_.log(arguments)
};jasmine.Spec.prototype.runs=function(a){var b=new jasmine.Block(this.env,a,this);
this.addToQueue(b);return this};jasmine.Spec.prototype.addToQueue=function(a){if(this.queue.isRunning()){this.queue.insertNext(a)
}else{this.queue.add(a)}};jasmine.Spec.prototype.addMatcherResult=function(a){this.results_.addResult(a)
};jasmine.Spec.prototype.expect=function(b){var a=new (this.getMatchersClass_())(this.env,b,this);
a.not=new (this.getMatchersClass_())(this.env,b,this,true);return a};jasmine.Spec.prototype.waits=function(a){var b=new jasmine.WaitsBlock(this.env,a,this);
this.addToQueue(b);return this};jasmine.Spec.prototype.waitsFor=function(c,a,d){var h=null;
var b=null;var g=null;for(var f=0;f<arguments.length;f++){var j=arguments[f];switch(typeof j){case"function":h=j;
break;case"string":b=j;break;case"number":g=j;break}}var e=new jasmine.WaitsForBlock(this.env,g,h,b,this);
this.addToQueue(e);return this};jasmine.Spec.prototype.fail=function(b){var a=new jasmine.ExpectationResult({passed:false,message:b?jasmine.util.formatException(b):"Exception"});
this.results_.addResult(a)};jasmine.Spec.prototype.getMatchersClass_=function(){return this.matchersClass||this.env.matchersClass
};jasmine.Spec.prototype.addMatchers=function(b){var c=this.getMatchersClass_();var a=function(){c.apply(this,arguments)
};jasmine.util.inherit(a,c);jasmine.Matchers.wrapInto_(b,a);this.matchersClass=a};
jasmine.Spec.prototype.finishCallback=function(){this.env.reporter.reportSpecResults(this)
};jasmine.Spec.prototype.finish=function(a){this.removeAllSpies();this.finishCallback();
if(a){a()}};jasmine.Spec.prototype.after=function(a){if(this.queue.isRunning()){this.queue.add(new jasmine.Block(this.env,a,this))
}else{this.afterCallbacks.unshift(a)}};jasmine.Spec.prototype.execute=function(b){var a=this;
if(!a.env.specFilter(a)){a.results_.skipped=true;a.finish(b);return}this.env.reporter.reportSpecStarting(this);
a.env.currentSpec=a;a.addBeforesAndAftersToQueue();a.queue.start(function(){a.finish(b)
})};jasmine.Spec.prototype.addBeforesAndAftersToQueue=function(){var c=this.env.currentRunner();
var a;for(var b=this.suite;b;b=b.parentSuite){for(a=0;a<b.before_.length;a++){this.queue.addBefore(new jasmine.Block(this.env,b.before_[a],this))
}}for(a=0;a<c.before_.length;a++){this.queue.addBefore(new jasmine.Block(this.env,c.before_[a],this))
}for(a=0;a<this.afterCallbacks.length;a++){this.queue.add(new jasmine.Block(this.env,this.afterCallbacks[a],this))
}for(b=this.suite;b;b=b.parentSuite){for(a=0;a<b.after_.length;a++){this.queue.add(new jasmine.Block(this.env,b.after_[a],this))
}}for(a=0;a<c.after_.length;a++){this.queue.add(new jasmine.Block(this.env,c.after_[a],this))
}};jasmine.Spec.prototype.explodes=function(){throw"explodes function should not have been called"
};jasmine.Spec.prototype.spyOn=function(d,b,c){if(d==jasmine.undefined){throw"spyOn could not find an object to spy upon for "+b+"()"
}if(!c&&d[b]===jasmine.undefined){throw b+"() method does not exist"}if(!c&&d[b]&&d[b].isSpy){throw new Error(b+" has already been spied upon")
}var a=jasmine.createSpy(b);this.spies_.push(a);a.baseObj=d;a.methodName=b;a.originalValue=d[b];
d[b]=a;return a};jasmine.Spec.prototype.removeAllSpies=function(){for(var a=0;a<this.spies_.length;
a++){var b=this.spies_[a];b.baseObj[b.methodName]=b.originalValue}this.spies_=[]};
jasmine.Suite=function(d,e,b,c){var a=this;a.id=d.nextSuiteId?d.nextSuiteId():null;
a.description=e;a.queue=new jasmine.Queue(d);a.parentSuite=c;a.env=d;a.before_=[];
a.after_=[];a.children_=[];a.suites_=[];a.specs_=[]};jasmine.Suite.prototype.getFullName=function(){var b=this.description;
for(var a=this.parentSuite;a;a=a.parentSuite){b=a.description+" "+b}return b};jasmine.Suite.prototype.finish=function(a){this.env.reporter.reportSuiteResults(this);
this.finished=true;if(typeof(a)=="function"){a()}};jasmine.Suite.prototype.beforeEach=function(a){a.typeName="beforeEach";
this.before_.unshift(a)};jasmine.Suite.prototype.afterEach=function(a){a.typeName="afterEach";
this.after_.unshift(a)};jasmine.Suite.prototype.results=function(){return this.queue.results()
};jasmine.Suite.prototype.add=function(a){this.children_.push(a);if(a instanceof jasmine.Suite){this.suites_.push(a);
this.env.currentRunner().addSuite(a)}else{this.specs_.push(a)}this.queue.add(a)};
jasmine.Suite.prototype.specs=function(){return this.specs_};jasmine.Suite.prototype.suites=function(){return this.suites_
};jasmine.Suite.prototype.children=function(){return this.children_};jasmine.Suite.prototype.execute=function(b){var a=this;
this.queue.start(function(){a.finish(b)})};jasmine.WaitsBlock=function(b,c,a){this.timeout=c;
jasmine.Block.call(this,b,null,a)};jasmine.util.inherit(jasmine.WaitsBlock,jasmine.Block);
jasmine.WaitsBlock.prototype.execute=function(a){this.env.reporter.log(">> Jasmine waiting for "+this.timeout+" ms...");
this.env.setTimeout(function(){a()},this.timeout)};jasmine.WaitsForBlock=function(b,e,d,c,a){this.timeout=e||b.defaultTimeoutInterval;
this.latchFunction=d;this.message=c;this.totalTimeSpentWaitingForLatch=0;jasmine.Block.call(this,b,null,a)
};jasmine.util.inherit(jasmine.WaitsForBlock,jasmine.Block);jasmine.WaitsForBlock.TIMEOUT_INCREMENT=10;
jasmine.WaitsForBlock.prototype.execute=function(f){this.env.reporter.log(">> Jasmine waiting for "+(this.message||"something to happen"));
var a;try{a=this.latchFunction.apply(this.spec)}catch(d){this.spec.fail(d);f();return
}if(a){f()}else{if(this.totalTimeSpentWaitingForLatch>=this.timeout){var c="timed out after "+this.timeout+" msec waiting for "+(this.message||"something to happen");
this.spec.fail({name:"timeout",message:c});this.abort=true;f()}else{this.totalTimeSpentWaitingForLatch+=jasmine.WaitsForBlock.TIMEOUT_INCREMENT;
var b=this;this.env.setTimeout(function(){b.execute(f)},jasmine.WaitsForBlock.TIMEOUT_INCREMENT)
}}};jasmine.FakeTimer=function(){this.reset();var a=this;a.setTimeout=function(b,c){a.timeoutsMade++;
a.scheduleFunction(a.timeoutsMade,b,c,false);return a.timeoutsMade};a.setInterval=function(b,c){a.timeoutsMade++;
a.scheduleFunction(a.timeoutsMade,b,c,true);return a.timeoutsMade};a.clearTimeout=function(b){a.scheduledFunctions[b]=jasmine.undefined
};a.clearInterval=function(b){a.scheduledFunctions[b]=jasmine.undefined}};jasmine.FakeTimer.prototype.reset=function(){this.timeoutsMade=0;
this.scheduledFunctions={};this.nowMillis=0};jasmine.FakeTimer.prototype.tick=function(b){var a=this.nowMillis;
var c=a+b;this.runFunctionsWithinRange(a,c);this.nowMillis=c};jasmine.FakeTimer.prototype.runFunctionsWithinRange=function(b,a){var g;
var f=[];for(var d in this.scheduledFunctions){g=this.scheduledFunctions[d];if(g!=jasmine.undefined&&g.runAtMillis>=b&&g.runAtMillis<=a){f.push(g);
this.scheduledFunctions[d]=jasmine.undefined}}if(f.length>0){f.sort(function(i,e){return i.runAtMillis-e.runAtMillis
});for(var c=0;c<f.length;++c){try{var j=f[c];this.nowMillis=j.runAtMillis;j.funcToCall();
if(j.recurring){this.scheduleFunction(j.timeoutKey,j.funcToCall,j.millis,true)}}catch(h){}}this.runFunctionsWithinRange(b,a)
}};jasmine.FakeTimer.prototype.scheduleFunction=function(c,a,b,d){this.scheduledFunctions[c]={runAtMillis:this.nowMillis+b,funcToCall:a,recurring:d,timeoutKey:c,millis:b}
};jasmine.Clock={defaultFakeTimer:new jasmine.FakeTimer(),reset:function(){jasmine.Clock.assertInstalled();
jasmine.Clock.defaultFakeTimer.reset()},tick:function(a){jasmine.Clock.assertInstalled();
jasmine.Clock.defaultFakeTimer.tick(a)},runFunctionsWithinRange:function(b,a){jasmine.Clock.defaultFakeTimer.runFunctionsWithinRange(b,a)
},scheduleFunction:function(c,a,b,d){jasmine.Clock.defaultFakeTimer.scheduleFunction(c,a,b,d)
},useMock:function(){if(!jasmine.Clock.isInstalled()){var a=jasmine.getEnv().currentSpec;
a.after(jasmine.Clock.uninstallMock);jasmine.Clock.installMock()}},installMock:function(){jasmine.Clock.installed=jasmine.Clock.defaultFakeTimer
},uninstallMock:function(){jasmine.Clock.assertInstalled();jasmine.Clock.installed=jasmine.Clock.real
},real:{setTimeout:jasmine.getGlobal().setTimeout,clearTimeout:jasmine.getGlobal().clearTimeout,setInterval:jasmine.getGlobal().setInterval,clearInterval:jasmine.getGlobal().clearInterval},assertInstalled:function(){if(!jasmine.Clock.isInstalled()){throw new Error("Mock clock is not installed, use jasmine.Clock.useMock()")
}},isInstalled:function(){return jasmine.Clock.installed==jasmine.Clock.defaultFakeTimer
},installed:null};jasmine.Clock.installed=jasmine.Clock.real;jasmine.getGlobal().setTimeout=function(a,b){if(jasmine.Clock.installed.setTimeout.apply){return jasmine.Clock.installed.setTimeout.apply(this,arguments)
}else{return jasmine.Clock.installed.setTimeout(a,b)}};jasmine.getGlobal().setInterval=function(a,b){if(jasmine.Clock.installed.setInterval.apply){return jasmine.Clock.installed.setInterval.apply(this,arguments)
}else{return jasmine.Clock.installed.setInterval(a,b)}};jasmine.getGlobal().clearTimeout=function(a){if(jasmine.Clock.installed.clearTimeout.apply){return jasmine.Clock.installed.clearTimeout.apply(this,arguments)
}else{return jasmine.Clock.installed.clearTimeout(a)}};jasmine.getGlobal().clearInterval=function(a){if(jasmine.Clock.installed.clearTimeout.apply){return jasmine.Clock.installed.clearInterval.apply(this,arguments)
}else{return jasmine.Clock.installed.clearInterval(a)}};jasmine.version_={major:1,minor:0,build:1,revision:1286311016};
if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("jasmine-sproutcore")
};