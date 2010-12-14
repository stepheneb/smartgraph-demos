SC.State=SC.Object.extend({name:null,parentState:null,historyState:null,initialSubstate:null,substatesAreConcurrent:NO,substates:null,statechart:null,stateIsInitialized:NO,currentSubstates:null,init:function(){this._registeredEventHandlers={};
this._registeredStringEventHandlers={};this._registeredRegExpEventHandlers=[]},initState:function(){if(this.get("stateIsInitialized")){return
}this._registerWithParentStates();var k=null,j=null,a=null,l=[],h=NO,g=this.get("initialSubstate"),e=this.get("substatesAreConcurrent"),c=this.get("statechart"),b=0,f=0,d=NO;
for(k in this){j=this[k];d=SC.typeOf(j)===SC.T_FUNCTION;if(d&&j.isEventHandler){this._registerEventHandler(k,j);
continue}if(d&&j.statePlugin){j=j.apply(this)}if(SC.kindOf(j,SC.State)&&j.isClass&&this[k]!==this.constructor){a=this.createSubstate(j,{name:k,parentState:this,statechart:c});
l.push(a);this[k]=a;a.initState();if(k===g){this.set("initialSubstate",a);h=YES}}}if(!SC.none(g)&&!h){SC.Logger.error("Unable to set initial substate %@ since it did not match any of state's %@ substates".fmt(g,this))
}this.set("substates",l);this.set("currentSubstates",[]);if(l.length===0){if(!SC.none(g)){SC.Logger.warn("Unable to make %@ an initial substate since state %@ has no substates".fmt(g,this))
}}else{if(l.length>0){if(SC.none(g)&&!e){a=l[0];this.set("initialSubstate",a);SC.Logger.warn("state %@ has no initial substate defined. Will default to using %@ as initial substate".fmt(this,a))
}else{if(!SC.none(g)&&e){this.set("initialSubstate",null);SC.Logger.warn("Can not use %@ as initial substate since substates are all concurrent for state %@".fmt(g,this))
}}}}this.set("stateIsInitialized",YES)},createSubstate:function(b,a){if(!a){a={}}b=b.create(a);
return b},_registerEventHandler:function(b,e){var d=e.events,f=null,a=d.length,c=0;
this._registeredEventHandlers[b]=e;for(;c<a;c+=1){f=d[c];if(SC.typeOf(f)===SC.T_STRING){this._registeredStringEventHandlers[f]={name:b,handler:e};
continue}if(f instanceof RegExp){this._registeredRegExpEventHandlers.push({name:b,handler:e,regexp:f});
continue}SC.Logger.error("Invalid event %@ for event handler %@ in state %@".fmt(f,b,this))
}},_registerWithParentStates:function(){this._registerSubstate(this);var a=this.get("parentState");
while(!SC.none(a)){a._registerSubstate(this);a=a.get("parentState")}},_registerSubstate:function(b){var c=b.pathRelativeTo(this);
if(SC.none(c)){return}if(SC.none(this._registeredSubstatePaths)){this._registeredSubstatePaths={};
this._registeredSubstates=[]}this._registeredSubstates.push(b);var a=this._registeredSubstatePaths;
if(a[b.get("name")]===undefined){a[b.get("name")]={__ki_paths__:[]}}var d=a[b.get("name")];
d[c]=b;d.__ki_paths__.push(c)},pathRelativeTo:function(b){var c=this.get("name"),a=this.get("parentState");
while(!SC.none(a)&&a!==b){c="%@.%@".fmt(a.get("name"),c);a=a.get("parentState")}if(a!==b&&b!==this){SC.Logger.error("Can not generate relative path from %@ since it not a parent state of %@".fmt(b,this));
return null}return c},getSubstate:function(c){var f=SC.typeOf(c);if(f===SC.T_OBJECT){return this._registeredSubstates.indexOf(c)>-1?c:null
}if(f!==SC.T_STRING){SC.Logger.error("Can not find matching subtype. value must be an object or string: %@".fmt(c));
return null}var b=c.match(/(^|\.)(\w+)$/);if(!b){return null}var e=this._registeredSubstatePaths[b[2]];
if(SC.none(e)){return null}var a=e[c];if(!SC.none(a)){return a}if(b[1]===""){if(e.__ki_paths__.length===1){return e[e.__ki_paths__[0]]
}if(e.__ki_paths__.length>1){var d="Can not find substate matching %@ in state %@. Ambiguous with the following: %@";
SC.Logger.error(d.fmt(c,this,e.__ki_paths__))}}return null},gotoState:function(a){var b=null;
if(this.get("isCurrentState")){b=this}else{if(this.get("hasCurrentSubstates")){b=this.get("currentSubstates")[0]
}}this.get("statechart").gotoState(a,b)},gotoHistoryState:function(b,a){var c=null;
if(this.get("isCurrentState")){c=this}else{if(this.get("hasCurrentSubstates")){c=this.get("currentSubstates")[0]
}}this.get("statechart").gotoHistoryState(b,c,a)},resumeGotoState:function(){this.get("statechart").resumeGotoState()
},stateIsCurrentSubstate:function(a){if(SC.typeOf(a)===SC.T_STRING){a=this.get("statechart").getState(a)
}return this.get("currentSubstates").indexOf(a)>=0},isRootState:function(){return this.getPath("statechart.rootState")===this
}.property(),isCurrentState:function(){return this.stateIsCurrentSubstate(this)}.property().cacheable(),isConcurrentState:function(){return this.getPath("parentState.substatesAreConcurrent")
}.property(),hasSubstates:function(){return this.getPath("substates.length")>0}.property("substates"),hasCurrentSubstates:function(){var a=this.get("currentSubstates");
return !SC.none(a)&&a.get("length")>0}.property("currentSubstates"),reenter:function(){var a=this.get("statechart");
if(this.get("isCurrentState")){a.gotoState(this)}else{SC.Logger.error("Can not re-enter state %@ since it is not a current state in the statechart".fmt(this))
}},tryToHandleEvent:function(f,d,c){if(this._registeredEventHandlers[f]){SC.Logger.warn("state %@ can not handle event %@ since it is a registered event handler".fmt(this,f));
return NO}if(this.tryToPerform(f,d,c)){return YES}var e=this._registeredStringEventHandlers[f];
if(e){e.handler.call(this,f,d,c);return YES}var a=this._registeredRegExpEventHandlers.length,b=0;
for(;b<a;b+=1){e=this._registeredRegExpEventHandlers[b];if(f.match(e.regexp)){e.handler.call(this,f,d,c);
return YES}}if(SC.typeOf(this["unknownEvent"])===SC.T_FUNCTION){this.unknownEvent(f,d,c);
return YES}return NO},enterState:function(){},exitState:function(){},performAsync:function(c,b,a){return SC.Async.perform(c,b,a)
},toString:function(){return"SC.State<%@, %@>".fmt(this.get("name"),SC.guidFor(this))
}});SC.State.plugin=function(b){var a=function(){return SC.objectForPropertyPath(b)
};a.statePlugin=YES;return a};SC.State.design=SC.State.extend;Function.prototype.handleEvents=function(){this.isEventHandler=YES;
this.events=arguments;return this};SC.StatechartManager={isResponderContext:YES,isStatechart:YES,statechartIsInitialized:NO,rootState:null,monitorIsActive:NO,monitor:null,trace:NO,initMixin:function(){this._gotoStateLocked=NO;
this._sendEventLocked=NO;this._pendingStateTransitions=[];this._pendingSentEvents=[];
this.sendAction=this.sendEvent;if(this.get("monitorIsActive")){this.set("monitor",SC.StatechartMonitor.create())
}},initStatechart:function(){if(this.get("statechartIsInitialized")){return}var b=this.get("trace"),a=this.get("rootState");
if(b){SC.Logger.info("BEGIN initialize statechart")}if(SC.typeOf(a)===SC.T_FUNCTION&&a.statePlugin){a=a.apply(this)
}if(!(SC.kindOf(a,SC.State)&&a.isClass)){throw"Unable to initialize statechart. Root state must be a state class"
}a=this.createRootState(a,{statechart:this,name:SC.ROOT_STATE_NAME});this.set("rootState",a);
a.initState();this.set("statechartIsInitialized",YES);this.gotoState(a);if(b){SC.Logger.info("END initialize statechart")
}},createRootState:function(b,a){if(!a){a={}}b=b.create(a);return b},currentStates:function(){return this.getPath("rootState.currentSubstates")
}.property(),currentStateCount:function(){return this.getPath("currentStates.length")
}.property("currentStates"),stateIsCurrentState:function(a){return this.get("rootState").stateIsCurrentSubstate(a)
},doesContainState:function(a){return !SC.none(this.getState(a))},getState:function(a){return this.get("rootState").getSubstate(a)
},gotoState:function(b,i,j){if(!this.get("statechartIsInitialized")){SC.Logger.error("can not go to state %@. statechart has not yet been initialized".fmt(b));
return}var l=null,h=[],k=[],e=this.get("trace"),a=this.get("rootState"),g=b,d=i;b=a.getSubstate(b);
if(SC.none(b)){SC.Logger.error("Can not to goto state %@. Not a recognized state in statechart".fmt(g));
return}if(this._gotoStateLocked){this._pendingStateTransitions.push({state:b,fromCurrentState:i,useHistory:j});
return}this._gotoStateLocked=YES;if(!SC.none(i)){i=a.getSubstate(i);if(SC.none(i)||!i.get("isCurrentState")){var c="Can not to goto state %@. %@ is not a recognized current state in statechart";
SC.Logger.error(c.fmt(g,d));this._gotoStateLocked=NO;return}}else{if(this.getPath("currentStates.length")>0){i=this.get("currentStates")[0]
}}if(e){SC.Logger.info("BEGIN gotoState: %@".fmt(b));SC.Logger.info("starting from current state: %@".fmt(i));
SC.Logger.info("current states before: %@".fmt(this.get("currentStates")))}if(!SC.none(i)){h=this._createStateChain(i)
}k=this._createStateChain(b);l=this._findPivotState(h,k);if(l){if(e){SC.Logger.info("pivot state = "+l)
}if(l.get("substatesAreConcurrent")){SC.Logger.error("Can not go to state %@. Pivot state %@ has concurrent substates.".fmt(b,l));
this._gotoStateLocked=NO;return}}var f=[];this._traverseStatesToExit(h.shift(),h,l,f);
if(l!==b){this._traverseStatesToEnter(k.pop(),k,l,j,f)}else{this._traverseStatesToExit(l,[],null,f);
this._traverseStatesToEnter(l,null,null,j,f)}this._executeGotoStateActions(b,f)},gotoStateActive:function(){return this._gotoStateLocked
}.property(),gotoStateSuspended:function(){return this._gotoStateLocked&&!!this._gotoStateSuspendedPoint
}.property(),resumeGotoState:function(){if(!this.get("gotoStateSuspended")){SC.Logger.error("Can not resume goto state since it has not been suspended");
return}var a=this._gotoStateSuspendedPoint;this._executeGotoStateActions(a.gotoState,a.actions,a.marker)
},_executeGotoStateActions:function(f,e,b){var d=null,a=e.length,c=null;b=SC.none(b)?0:b;
for(;b<a;b+=1){d=e[b];switch(d.action){case SC.EXIT_STATE:c=this._exitState(d.state);
break;case SC.ENTER_STATE:c=this._enterState(d.state,d.currentState);break}if(SC.kindOf(c,SC.Async)){this._gotoStateSuspendedPoint={gotoState:f,actions:e,marker:b+1};
c.tryToPerform(d.state);return}}this.notifyPropertyChange("currentStates");if(this.get("trace")){SC.Logger.info("current states after: %@".fmt(this.get("currentStates")));
SC.Logger.info("END gotoState: %@".fmt(f))}this._gotoStateSuspendedPoint=null;this._gotoStateLocked=NO;
this._flushPendingStateTransition()},_exitState:function(c){if(c.get("currentSubstates").indexOf(c)>=0){var b=c.get("parentState");
while(b){b.get("currentSubstates").removeObject(c);b=b.get("parentState")}}if(this.get("trace")){SC.Logger.info("exiting state: "+c)
}c.set("currentSubstates",[]);c.notifyPropertyChange("isCurrentState");var a=this.exitState(c);
if(this.get("monitorIsActive")){this.get("monitor").pushExitedState(c)}c._traverseStatesToExit_skipState=NO;
return a},exitState:function(a){return a.exitState()},_enterState:function(c,d){var b=c.get("parentState");
if(b&&!c.get("isConcurrentState")){b.set("historyState",c)}if(d){b=c;while(b){b.get("currentSubstates").push(c);
b=b.get("parentState")}}if(this.get("trace")){SC.Logger.info("entering state: "+c)
}c.notifyPropertyChange("isCurrentState");var a=this.enterState(c);if(this.get("monitorIsActive")){this.get("monitor").pushEnteredState(c)
}return a},enterState:function(a){return a.enterState()},gotoHistoryState:function(d,c,b){if(!this.get("statechartIsInitialized")){SC.Logger.error("can not go to state %@'s history state. Statechart has not yet been initialized".fmt(d));
return}d=this.getState(d);if(!d){SC.Logger.error("Can not to goto state %@'s history state. Not a recognized state in statechart".fmt(d));
return}var a=d.get("historyState");if(!b){if(a){this.gotoState(a,c)}else{this.gotoState(d,c)
}}else{this.gotoState(d,c,YES)}},sendEvent:function(a,d,b){var j=NO,f=this.get("currentStates").slice(),g=0,e=0,c=null;
if(this._sendEventLocked||this._goStateLocked){this._pendingSentEvents.push({event:a,sender:d,context:b});
return}this._sendEventLocked=YES;g=f.get("length");for(;e<g;e+=1){j=NO;c=f[e];if(!c.get("isCurrentState")){continue
}while(!j&&c){if(c.tryToPerform){try{j=c.tryToHandleEvent(a,d,b)}catch(h){}}if(!j){c=c.get("parentState")
}}}this._sendEventLocked=NO;this._flushPendingSentEvents();return c},_createStateChain:function(b){var a=[];
while(b){a.push(b);b=b.get("parentState")}return a},_findPivotState:function(c,b){if(c.length===0||b.length===0){return null
}var a=c.find(function(e,d){if(b.indexOf(e)>=0){return YES}});return a},_traverseStatesToExit:function(b,k,d,h){if(!b||b===d){return
}var e=this.get("trace");if(b.get("substatesAreConcurrent")){var f=0,g=b.get("currentSubstates"),j=g.length,c=null;
for(;f<j;f+=1){c=g[f];if(c._traverseStatesToExit_skipState===YES){continue}var a=this._createStateChain(c);
this._traverseStatesToExit(a.shift(),a,b,h)}}h.push({action:SC.EXIT_STATE,state:b});
if(b.get("isCurrentState")){b._traverseStatesToExit_skipState=YES}this._traverseStatesToExit(k.shift(),k,d,h)
},_traverseStatesToEnter:function(b,e,i,g,d){if(!b){return}var c=this.get("trace");
if(i){if(b!==i){this._traverseStatesToEnter(e.pop(),e,i,g,d)}else{this._traverseStatesToEnter(e.pop(),e,null,g,d)
}}else{if(!e||e.length===0){var h={action:SC.ENTER_STATE,state:b,currentState:NO};
d.push(h);var f=b.get("initialSubstate"),a=b.get("historyState");if(b.get("substatesAreConcurrent")){this._traverseConcurrentStatesToEnter(b.get("substates"),null,g,d)
}else{if(b.get("hasSubstates")&&a&&g){this._traverseStatesToEnter(a,null,null,g,d)
}else{if(f){this._traverseStatesToEnter(f,null,null,g,d)}else{h.currentState=YES}}}}else{if(e.length>0){d.push({action:SC.ENTER_STATE,state:b});
var j=e.pop();this._traverseStatesToEnter(j,e,null,g,d);if(b.get("substatesAreConcurrent")){this._traverseConcurrentStatesToEnter(b.get("substates"),j,g,d)
}}}}},_traverseConcurrentStatesToEnter:function(d,c,f,b){var e=0,a=d.length,g=null;
for(;e<a;e+=1){g=d[e];if(g!==c){this._traverseStatesToEnter(g,null,null,f,b)}}},_flushPendingStateTransition:function(){var a=this._pendingStateTransitions.shift();
if(!a){return}this.gotoState(a.state,a.fromCurrentState,a.useHistory)},_flushPendingSentEvents:function(){var a=this._pendingSentEvents.shift();
if(!a){return}this.sendEvent(a.event,a.sender,a.context)},_monitorIsActiveDidChange:function(){if(this.get("monitorIsActive")&&SC.none(this.get("monitor"))){this.set("monitor",SC.StatechartMonitor.create())
}}.observes("monitorIsActive")};SC.ROOT_STATE_NAME="__ROOT_STATE__";SC.EXIT_STATE=0;
SC.ENTER_STATE=1;SC.Statechart=SC.Object.extend(SC.StatechartManager);SC.Async=SC.Object.extend({func:null,arg1:null,arg2:null,tryToPerform:function(d){var c=this.get("func"),b=this.get("arg1"),a=this.get("arg2"),e=SC.typeOf(c);
if(e===SC.T_STRING){d.tryToPerform(c,b,a)}else{if(e===SC.T_FUNCTION){c.apply(d,[b,a])
}}}});SC.Async.mixin({perform:function(c,b,a){return SC.Async.create({func:c,arg1:b,arg2:a})
}});if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/statechart")
};