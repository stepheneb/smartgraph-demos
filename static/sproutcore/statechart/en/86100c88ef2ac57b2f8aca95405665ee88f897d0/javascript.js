/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   SC.Statechart - A Statechart Framework for SproutCore
// Copyright: ©2010 Michael Cohen, and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/* >>>>>>>>>> BEGIN source/system/state.js */
// ==========================================================================
// Project:   SC - A Statechart Framework for SproutCore
// Copyright: ©2010 Michael Cohen, and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals SC */

/**
  Represents a state within a statechart. 
  
  The statechart actively manages all states belonging to it. When a state is created, 
  it immediately registers itself with it parent states. 
  
  You do not create an instance of a state itself. The statechart manager will go through its 
  state heirarchy and create the states itself.
*/
SC.State = SC.Object.extend({
  
  /**
    The name of the state
    
    @property {String}
  */
  name: null,
  
  /**
    This state's parent state. Managed by the statechart
    
    @property {State}
  */
  parentState: null,
  
  /**
    This state's history state. Can be null. Managed by the statechart.
    
    @property {State}
  */
  historyState: null,
  
  /**
    Used to indicate the initial substate of this state to enter into. 
    
    You assign the value with the name of the state. Upon creation of 
    the state, the statechart will automatically change the property 
    to be a corresponding state object
    
    The substate is only to be this state's immediate substates.
    
    @property {State}
  */
  initialSubstate: null,
  
  /**
    Used to indicates if this state's immediate substates are to be
    concurrent (orthogonal) to each other. 
    
    @property {Boolean}
  */
  substatesAreConcurrent: NO,
  
  /**
    The immediate substates of this state. Managed by the statechart.
    
    @property {Array}
  */
  substates: null,
  
  /**
    The statechart that this state belongs to. Assigned by the owning
    statechart.
  
    @property {Statechart}
  */
  statechart: null,
  
  /**
    Indicates if this state has been initialized by the statechart
    
    @propety {Boolean}
  */
  stateIsInitialized: NO,
  
  /**
    An array of this state's current substates. Managed by the statechart
    
    @propety {Array}
  */
  currentSubstates: null,
  
  init: function() {
    this._registeredEventHandlers = {};
    this._registeredStringEventHandlers = {};
    this._registeredRegExpEventHandlers = [];
  },
  
  /**
    Used to initialize this state. To only be called by the owning statechart.
  */
  initState: function() {
    if (this.get('stateIsInitialized')) return;
    
    this._registerWithParentStates();
    
    var key = null, 
        value = null,
        state = null,
        substates = [],
        matchedInitialSubstate = NO,
        initialSubstate = this.get('initialSubstate'),
        substatesAreConcurrent = this.get('substatesAreConcurrent'),
        statechart = this.get('statechart'),
        i = 0,
        len = 0,
        valueIsFunc = NO;
    
    // Iterate through all this state's substates, if any, create them, and then initialize
    // them. This causes a recursive process.
    for (key in this) {
      value = this[key];
      valueIsFunc = SC.typeOf(value) === SC.T_FUNCTION;
      
      if (valueIsFunc && value.isEventHandler) {
        this._registerEventHandler(key, value);
        continue;
      }
      
      if (valueIsFunc && value.statePlugin) {
        value = value.apply(this);
      }
      
      if (SC.kindOf(value, SC.State) && value.isClass && this[key] !== this.constructor) {
        state = this.createSubstate(value, { name: key, parentState: this, statechart: statechart });
        substates.push(state);
        this[key] = state;
        state.initState();
        if (key === initialSubstate) {
          this.set('initialSubstate', state);
          matchedInitialSubstate = YES;
        } 
      }
    }
    
    if (!SC.none(initialSubstate) && !matchedInitialSubstate) {
      SC.Logger.error('Unable to set initial substate %@ since it did not match any of state\'s %@ substates'.fmt(initialSubstate, this));
    }
    
    this.set('substates', substates);
    this.set('currentSubstates', []);
    
    if (substates.length === 0) {
      if (!SC.none(initialSubstate)) {
        SC.Logger.warn('Unable to make %@ an initial substate since state %@ has no substates'.fmt(initialSubstate, this));
      }
    } 
    else if (substates.length > 0) {
      if (SC.none(initialSubstate) && !substatesAreConcurrent) {
        state = substates[0];
        this.set('initialSubstate', state);
        SC.Logger.warn('state %@ has no initial substate defined. Will default to using %@ as initial substate'.fmt(this, state));
      } 
      else if (!SC.none(initialSubstate) && substatesAreConcurrent) {
        this.set('initialSubstate', null);
        SC.Logger.warn('Can not use %@ as initial substate since substates are all concurrent for state %@'.fmt(initialSubstate, this));
      }
    }
    
    this.set('stateIsInitialized', YES);
  },
  
  /**
    creates a substate for this state
  */
  createSubstate: function(state, attrs) {
    if (!attrs) attrs = {};
    state = state.create(attrs);
    return state;
  },
  
  /** @private 
  
    Registers event handlers with this state. Event handlers are special
    functions on the state that are intended to handle more than one event. This
    compared to basic functions that only respond to a single event that reflects
    the name of the method.
  */
  _registerEventHandler: function(name, handler) {
    var events = handler.events,
        event = null,
        len = events.length,
        i = 0;
        
    this._registeredEventHandlers[name] = handler;
    
    for (; i < len; i += 1) {
      event = events[i];
      
      if (SC.typeOf(event) === SC.T_STRING) {
        this._registeredStringEventHandlers[event] = {
          name: name,
          handler: handler
        };
        continue;
      }
      
      if (event instanceof RegExp) {
        this._registeredRegExpEventHandlers.push({
          name: name,
          handler: handler,
          regexp: event
        });
        continue;
      }
      
      SC.Logger.error("Invalid event %@ for event handler %@ in state %@".fmt(event, name, this));
    }
  },
  
  /** @private
    Will traverse up through this state's parent states to register
    this state with them.
  */
  _registerWithParentStates: function() {
    this._registerSubstate(this);
    var parent = this.get('parentState');
    while (!SC.none(parent)) {
      parent._registerSubstate(this);
      parent = parent.get('parentState');
    }
  },
  
  /** @private
    Will register a given state as a substate of this state
  */
  _registerSubstate: function(state) {
    var path = state.pathRelativeTo(this);
    if (SC.none(path)) return; 
    
    // Create special private member variables to help
    // keep track of substates and access them.
    if (SC.none(this._registeredSubstatePaths)) {
      this._registeredSubstatePaths = {};
      this._registeredSubstates = [];
    }
    
    this._registeredSubstates.push(state);
    
    // Keep track of states based on their relative path
    // to this state. 
    var regPaths = this._registeredSubstatePaths;
    if (regPaths[state.get('name')] === undefined) {
      regPaths[state.get('name')] = { __ki_paths__: [] };
    }
    
    var paths = regPaths[state.get('name')];
    paths[path] = state;
    paths.__ki_paths__.push(path);
  },
  
  /**
    Will generate path for a given state that is relative to this state. It is
    required that the given state is a substate of this state.
    
    If the heirarchy of the given state to this state is the following:
    A > B > C, where A is this state and C is the given state, then the 
    relative path generated will be "B.C"
  */
  pathRelativeTo: function(state) {
    var path = this.get('name'),
        parent = this.get('parentState');
    
    while (!SC.none(parent) && parent !== state) {
      path = "%@.%@".fmt(parent.get('name'), path);
      parent = parent.get('parentState');
    }
    
    if (parent !== state && state !== this) {
      SC.Logger.error('Can not generate relative path from %@ since it not a parent state of %@'.fmt(state, this));
      return null;
    }
    
    return path;
  },
  
  /**
    Used to get a substate of this state that matches a given value. 
    
    If the value is a state object, then the value will be returned if it is indeed 
    a substate of this state, otherwise null is returned. 
    
    If the given value is a string, then the string is assumed to be a path to a substate. 
    The value is then parsed to find the closes match. If there is no match then null 
    is returned. If there is more than one match then null is return and an error 
    is generated indicating ambiguity of the given value. 
    
    Note that when the value is a string, it is assumed to be a path relative to this 
    state; not the root state of the statechart.
  */
  getSubstate: function(value) {
    var valueType = SC.typeOf(value);
    
    // If the value is an object then just check if the value is 
    // a registered substate of this state, and if so return it. 
    if (valueType === SC.T_OBJECT) {
      return this._registeredSubstates.indexOf(value) > -1 ? value : null;
    }
    
    if (valueType !== SC.T_STRING) {
      SC.Logger.error("Can not find matching subtype. value must be an object or string: %@".fmt(value));
      return null;
    }
    
    // The value is a string. Therefore treat the value as a relative path to 
    // a substate of this state.
    
    // Extract that last part of the string. Ex. 'foo' => 'foo', 'foo.bar' => 'bar'
    var matches = value.match(/(^|\.)(\w+)$/);
    if (!matches) return null;

    // Get all the paths related to the matched value. If no paths then return null.
    var paths = this._registeredSubstatePaths[matches[2]];
    if (SC.none(paths)) return null;
    
    // Do a quick check to see if there is a path that exactly matches the given
    // value, and if so return the corresponding state
    var state = paths[value];
    if (!SC.none(state)) return state;
    
    // No exact match found. If the value given is a basic string with no ".", then check
    // if there is only one path containing that string. If so, return it. If there is
    // more than one path then it is ambiguous as to what state is trying to be reached.
    if (matches[1] === "") {
      if (paths.__ki_paths__.length === 1) return paths[paths.__ki_paths__[0]];
      if (paths.__ki_paths__.length > 1) {
        var msg = 'Can not find substate matching %@ in state %@. Ambiguous with the following: %@';
        SC.Logger.error(msg.fmt(value, this, paths.__ki_paths__));
      }
    } 
    
    return null;
  },
  
  /**
    Used to go to a state in the statechart either directly from this state if it is a current state,
    or from one of this state's current substates.
    
    Note that if the value given is a string, it will be assumed to be a path to a state. The path
    will be relative to the statechart's root state; not relative to this state.
    
    @param state {SC.State|String} the state to go to
  */
  gotoState: function(state) {
    var fromState = null;
    
    if (this.get('isCurrentState')) {
      fromState = this;
    } else if (this.get('hasCurrentSubstates')) {
      fromState = this.get('currentSubstates')[0];
    }
    
    this.get('statechart').gotoState(state, fromState);
  },
  
  /**
    Used to go to a given state's history state in the statechart either directly from this state if it
    is a current state or from one of this state's current substates. 
    
    Note that if the value given is a string, it will be assumed to be a path to a state. The path
    will be relative to the statechart's root state; not relative to this state.
    
    @param state {SC.State|String} the state whose history state to go to
    @param recusive {Boolean} Optional. Indicates whether to follow history states recusively starting
                              from the given state
  */
  gotoHistoryState: function(state, recursive) {
    var fromState = null;
    
    if (this.get('isCurrentState')) {
      fromState = this;
    } else if (this.get('hasCurrentSubstates')) {
      fromState = this.get('currentSubstates')[0];
    }
    
    this.get('statechart').gotoHistoryState(state, fromState, recursive);
  },
  
  /**
    Resumes an active goto state transition process that has been suspended.
  */
  resumeGotoState: function() {
    this.get('statechart').resumeGotoState();
  },
  
  /**
    Used to check if a given state is a current substate of this state. Mainly used in cases
    when this state is a concurrent state.
    
    @param state {State|String} either a state object or the name of a state
    @returns {Boolean} true is the given state is a current substate, otherwise false is returned
  */
  stateIsCurrentSubstate: function(state) {
    if (SC.typeOf(state) === SC.T_STRING) state = this.get('statechart').getState(state);
    return this.get('currentSubstates').indexOf(state) >= 0;
  }, 
  
  /**
    Indicates if this state is the root state of the statechart.
    
    @property {Boolean}
  */
  isRootState: function() {
    return this.getPath('statechart.rootState') === this;
  }.property(),
  
  /**
    Indicates if this state is a current state of the statechart.
    
    @property {Boolean} 
  */
  isCurrentState: function() {
    return this.stateIsCurrentSubstate(this);
  }.property().cacheable(),
  
  /**
    Indicates if this state is a concurrent state
    
    @property {Boolean}
  */
  isConcurrentState: function() {
    return this.getPath('parentState.substatesAreConcurrent');
  }.property(),
  
  /**
    Indicate if this state has any substates
    
    @propety {Boolean}
  */
  hasSubstates: function() {
    return this.getPath('substates.length') > 0;
  }.property('substates'),
  
  /**
    Indicates if this state has any current substates
  */
  hasCurrentSubstates: function() {
    var current = this.get('currentSubstates');
    return !SC.none(current) && current.get('length') > 0;
  }.property('currentSubstates'),
  
  /**
    Used to re-enter this state. Call this only when the state a current state of
    the statechart.  
  */
  reenter: function() {
    var statechart = this.get('statechart');
    if (this.get('isCurrentState')) {
      statechart.gotoState(this);
    } else {
       SC.Logger.error('Can not re-enter state %@ since it is not a current state in the statechart'.fmt(this));
    }
  },
  
  /**
    Called by the statechart to allow a state to try and handle the given event. If the
    event is handled by the state then YES is returned, otherwise NO.
    
    There is a particular order in how an event is handled by a state:
    
      1) Basic function whose name matches the event
      2) Registered event handler that is associated with an event represented as a string
      3) Registered event handler that is associated with events matching a regular expression
      4) The unknownEvent function
      
    Use of event handlers that are associated with events matching a regular expression may
    incur a performance hit, so they should be used sparingly.
    
    The unknownEvent function is only invoked if the state has it, otherwise it is skipped. Note that
    you should be careful when using unknownEvent since it can be either abused or cause unexpected
    behavior.
    
    Example of a state using all four event handling techniques:
    
    {{{
    
      SC.State.extend({
      
        // Basic function handling event 'foo'
        foo: function(sender, context) { ... },
        
        // event handler that handles 'frozen' and 'canuck'
        eventHandlerA: function(event, sender, context) {
          ...
        }.handleEvent('frozen', 'canuck'),
        
        // event handler that handles events matching the regular expression /num\d/
        //   ex. num1, num2
        eventHandlerB: function(event, sender, context) {
          ...
        }.handleEvent(/num\d/),
        
        // Handle any event that was not handled by some other
        // method on the state
        unknownEvent: function(event, sender, context) {
        
        }
      
      })
    
    }}}
  */
  tryToHandleEvent: function(event, sender, context) {
        
    // First check if the name of the event is the same as a registered event handler. If so,
    // then do not handle the event.
    if (this._registeredEventHandlers[event]) {
      SC.Logger.warn("state %@ can not handle event %@ since it is a registered event handler".fmt(this, event));
      return NO;
    }    
    
    // Now begin by trying a basic method on the state to respond to the event
    if (this.tryToPerform(event, sender, context)) return YES;
    
    // Try an event handler that is associated with an event represented as a string
    var handler = this._registeredStringEventHandlers[event];
    if (handler) {
      handler.handler.call(this, event, sender, context);
      return YES;
    }
    
    // Try an event handler that is associated with events matching a regular expression
    
    var len = this._registeredRegExpEventHandlers.length,
        i = 0;
        
    for (; i < len; i += 1) {
      handler = this._registeredRegExpEventHandlers[i];
      if (event.match(handler.regexp)) {
        handler.handler.call(this, event, sender, context);
        return YES;
      }
    }
    
    // Final attempt. If the state has an unknownEvent function then invoke it to 
    // handle the event
    if (SC.typeOf(this['unknownEvent']) === SC.T_FUNCTION) {
      this.unknownEvent(event, sender, context);
      return YES;
    }
    
    // Nothing was able to handle the given event for this state
    return NO;
  },
  
  /**
    Called whenever this state is to be entered during a state transition process. This 
    is useful when you want the state to perform some initial set up procedures. 
    
    If when entering the state you want to perform some kind of asynchronous action, such
    as an animation or fetching remote data, then you need to return an asynchronous 
    action, which is done like so:
    
    {{{
    
      enterState: function() {
        return this.performAsync('foo');
      }
    
    }}}
    
    After returning an action to be performed asynchronously, the statechart will suspend
    the active state transition process. In order to resume the process, you must call
    this state's resumeGotoState method or the statechart's resumeGotoState. If no asynchronous 
    action is to be perform, then nothing needs to be returned.
  */
  enterState: function() { },
  
  /**
    Called whenever this state is to be exited during a state transition process. This is 
    useful when you want the state to peform some clean up procedures.
    
    If when exiting the state you want to perform some kind of asynchronous action, such
    as an animation or fetching remote data, then you need to return an asynchronous 
    action, which is done like so:
    
    {{{
    
      exitState: function() {
        return this.performAsync('foo');
      }
    
    }}}
    
    After returning an action to be performed asynchronously, the statechart will suspend
    the active state transition process. In order to resume the process, you must call
    this state's resumeGotoState method or the statechart's resumeGotoState. If no asynchronous 
    action is to be perform, then nothing needs to be returned.
  */
  exitState: function() { },
  
  /**
    Call when an asynchronous action need to be performed when either entering or exiting
    a state.
    
    @see enterState
    @see exitState
  */
  performAsync: function(func, arg1, arg2) {
    return SC.Async.perform(func, arg1, arg2);
  },
  
  toString: function() {
    return "SC.State<%@, %@>".fmt(this.get("name"), SC.guidFor(this));
  }
  
});

/**
  Use this when you want to plug-in a state into a statechart. This is beneficial
  in cases where you split your statechart's states up into multiple files.
  
  Example:
  
    {{{
    
      MyApp.statechart = SC.Statechart.create({
      
        rootState: SC.State.design({
        
          initialSubstate: 'a',
          
          a: SC.State.plugin('path.to.a.state.class'),
          
          b: SC.State.pluing('path.to.another.state.class)
        
        })
      
      })
    
    }}}
  
  @param value {String} property path to a state class
*/
SC.State.plugin = function(value) {
  var func = function() {
    return SC.objectForPropertyPath(value);
  };
  func.statePlugin = YES;
  return func;
};

SC.State.design = SC.State.extend;

/**
  Extends the JS Function object with the handleEvents method that
  will provide more advanced event handling capabilities when constructing
  your statechart's states.
  
  By default, when you add a method to a state, the state will react to 
  events that matches a method's name, like so:
  
  {{{
  
    state = SC.State.extend({
    
      // Will be invoked when a event named "foo" is sent to this state
      foo: function(event, sender, context) { ... }
    
    })
  
  }}}
  
  In some situations, it may be advantageous to use one method that can react to 
  multiple events instead of having multiple methods that essentially all do the
  same thing. In order to set a method to handle more than one event you use
  the handleEvents method which can be supplied a list of string and/or regular
  expressions. The following example demonstrates the use of handleEvents:
  
  {{{
  
    state = SC.State.extend({
    
      eventHandlerA: function(event, sender, context) {
      
      }.handleEvents('foo', 'bar'),
      
      eventHandlerB: function(event, sender, context) {
      
      }.handleEvents(/num\d/, 'decimal')
    
    })
  
  }}}
  
  Whenever events 'foo' and 'bar' are sent to the state, the method eventHandlerA
  will be invoked. When there is an event that matches the regular expression
  /num\d/ or the event is 'decimal' then eventHandlerB is invoked. In both 
  cases, the name of the event will be supplied to the event handler. 
  
  It should be noted that the use of regular expressions may impact performance
  since that statechart will not be able to fully optimize the event handling logic based
  on its use. Therefore the use of regular expression should be used sparingly. 
  
  @param {(String|RegExp)...} args
*/
Function.prototype.handleEvents = function() {
  this.isEventHandler = YES;
  this.events = arguments;
  return this;
};
/* >>>>>>>>>> BEGIN source/system/statechart.js */
// ==========================================================================
// Project:   SC - A Statechart Framework for SproutCore
// Copyright: ©2010 Michael Cohen, and contributors.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*globals SC */

/**
  The startchart manager mixin allows an object to be a statechart. By becoming a statechart, the
  object can then be manage a set of its own states.
  
  This implemention of the statechart manager closely follows the concepts stated in D. Harel's 
  original paper "Statecharts: A Visual Formalism For Complex Systems" 
  (www.wisdom.weizmann.ac.il/~harel/papers/Statecharts.pdf). 
  
  The statechart allows for complex state heircharies by nesting states within states, and 
  allows for state orthogonality based on the use of concurrent states.
  
  At minimum, a statechart must have one state: The root state. All other states in the statechart
  are a decendents (substates) of the root state.
  
  The following example shows how states are nested within a statechart:
  
    {{{
    
      MyApp.Statechart = SC.Object.extend(SC.StatechartManager, {
      
        rootState: SC.State.design({
      
          initialSubstate: 'stateA',
        
          stateA: SC.State.design({
            // ... can continue to nest further states
          }),
        
          stateB: SC.State.design({
            // ... can continue to nest further states
          })
        })
      
      })
    
    }}}
  
  Note how in the example above, the root state as an explicit initial substate to enter into. If no
  initial substate is provided, then the statechart will default to the the state's first substate.
  
  To provide your statechart with orthogonality, you use concurrent states. If you use concurrent states,
  then your statechart will have multiple current states. That is because each concurrent state represents an
  independent state structure from other concurrent states. The following example shows how to provide your
  statechart with concurrent states:
  
    {{{
    
      MyApp.Statechart = SC.Object.extend(SC.StatechartManager, {
      
        rootState: SC.State.design({
      
          substatesAreConcurrent: YES,
        
          stateA: SC.State.design({
            // ... can continue to nest further states
          }),
        
          stateB: SC.State.design({
            // ... can continue to nest further states
          })
        })
      
      })
    
    }}}
  
  Above, to indicate that a state's substates are concurrent, you just have to set the substatesAreConcurrent to 
  YES. Once done, then stateA and stateB will be independent of each other and each will manage their
  own current substates. The root state will then have more then one current substate.
  
  Remember that a startchart can have a mixture of nested and concurrent states in order for you to 
  create as complex of statecharts that suite your needs. Here is an example of a mixed state structure:
  
    {{{
    
      MyApp.Statechart = SC.Object.extend(SC.StatechartManager, {
      
        rootState: SC.State.design({
      
          initialSubstate: 'stateA',
        
          stateA: SC.State.design({
          
            substatesAreConcurrent: YES,
          
            stateM: SC.State.design({ ... })
            stateN: SC.State.design({ ... })
            stateO: SC.State.design({ ... })
          
          }),
        
          stateB: SC.State.design({
          
            initialSubstate: 'stateX',
          
            stateX: SC.State.design({ ... })
            stateY: SC.State.desgin({ ... })
          
          })
        })
      
      })
    
    }}}
  
  Deeping on your needs, a statechart can have lots of states, which can become hard to manage all within
  one file. To modularize your states and make them easier to manage and maintain, you can plug-in states
  into other states. Let's say we are using the statechart in the last example above, and all the code is 
  within one file. We could update the code and split the logic across two or more files like so:
  
    {{{
      ---- state_a.js
  
      MyApp.StateA = SC.State.extend({
    
        substatesAreConcurrent: YES,
    
        stateM: SC.State.design({ ... })
        stateN: SC.State.design({ ... })
        stateO: SC.State.design({ ... })
    
      });
    
      ---- state_b.js
    
      MyApp.StateB = SC.State.extend({
    
        substatesAreConcurrent: YES,
    
        stateM: SC.State.design({ ... })
        stateN: SC.State.design({ ... })
        stateO: SC.State.design({ ... })
    
      });
    
      ---- statechart.js
    
      MyApp.Statechart = SC.Object.extend(SC.StatechartManager, {
    
        rootState: SC.State.design({
    
          initialSubstate: 'stateA',
      
          stateA: SC.State.plugin('MyApp.stateA'),
      
          stateB: SC.State.plugin('MyApp.stateB')
        
        })
    
      })
  
    }}}
    
  Using state plug-in functionality is optional. If you use the plug-in feature you can break up your statechart
  into as many files as you see fit.

*/

SC.StatechartManager = {
  
  // Walk like a duck
  isResponderContext: YES,
  
  // Walk like a duck
  isStatechart: YES,
  
  /**
    Indicates if this statechart has been initialized

    @property {Boolean}
  */
  statechartIsInitialized: NO,
  
  /**
    The root state of this statechart. All statecharts must have a root state.
    
    @property {SC.State}
  */
  rootState: null,
  
  /** 
    Indicates whether to use a monitor to monitor that statechart's activities. If true then
    the monitor will be active, otherwise the monitor will not be used. Useful for debugging
    purposes.
    
    @property {Boolean}
  */
  monitorIsActive: NO,
  
  /**
    A statechart monitor that can be used to monitor this statechart. Useful for debugging purposes.
    A monitor will only be used if monitorIsActive is true.
    
    @property {StatechartMonitor}
  */
  monitor: null,
  
  /**
    Indicates whether to trace the statecharts activities. If true then the statechart will output
    its activites to the browser's JS console. Useful for debugging purposes.
  */
  trace: NO,
  
  initMixin: function() {
    this._gotoStateLocked = NO;
    this._sendEventLocked = NO;
    this._pendingStateTransitions = [];
    this._pendingSentEvents = [];
    
    this.sendAction = this.sendEvent;
    
    if (this.get('monitorIsActive')) {
      this.set('monitor', SC.StatechartMonitor.create());
    }
  },
  
  /**
    Initializes the statechart. By initializing the statechart, it will create all the states and register
    them with the statechart. Once complete, the statechart can be used to go to states and send events to.
  */
  initStatechart: function() {
    if (this.get('statechartIsInitialized')) return;
    
    var trace = this.get('trace'),
        rootState = this.get('rootState');
    
    if (trace) SC.Logger.info('BEGIN initialize statechart');
    
    if (SC.typeOf(rootState) === SC.T_FUNCTION && rootState.statePlugin) {
      rootState = rootState.apply(this);
    }
    
    if (!(SC.kindOf(rootState, SC.State) && rootState.isClass)) {
      throw "Unable to initialize statechart. Root state must be a state class";
    }
    
    rootState = this.createRootState(rootState, { statechart: this, name: SC.ROOT_STATE_NAME });
    this.set('rootState', rootState);
    rootState.initState();
    this.set('statechartIsInitialized', YES);
    this.gotoState(rootState);
    
    if (trace) SC.Logger.info('END initialize statechart');
  },
  
  /**
    Will create a root state for the statechart
  */
  createRootState: function(state, attrs) {
    if (!attrs) attrs = {};
    state = state.create(attrs);
    return state;
  },
  
  /**
    Returns an array of all the current states for this statechart
    
    @returns {Array} the current states
  */
  currentStates: function() {
    return this.getPath('rootState.currentSubstates');
  }.property(),
  
  /**
    Returns the count of the current states for this statechart
    
    @returns {Number} the count 
  */
  currentStateCount: function() {
    return this.getPath('currentStates.length');
  }.property('currentStates'),
  
  /**
    Checks if a given state is a current state of this statechart. 
    
    @param state {State} the state to check
    @returns {Boolean} true if the state is a current state, otherwise fals is returned
  */
  stateIsCurrentState: function(state) {
    return this.get('rootState').stateIsCurrentSubstate(state);
  },
  
  /**
    Checks if the given value represents a state is this statechart
    
    @param value {State|String} either a state object or the name of a state
    @returns {Boolean} true if the state does belong ot the statechart, otherwise false is returned
  */
  doesContainState: function(value) {
    return !SC.none(this.getState(value));
  },
  
  /**
    Gets a state from the statechart that matches the given value
    
    @param value {State|String} either a state object of the name of a state
    @returns {State} if a match then the matching state is returned, otherwise null is returned 
  */
  getState: function(value) {
    return this.get('rootState').getSubstate(value);
  },
  
  /**
    When called, the statechart will proceed with making state transitions in the statechart starting from 
    a current state that meet the statechart conditions. When complete, some or all of the statechart's 
    current states will be changed, and all states that were part of the transition process will either 
    be exited or entered in a specific order.
    
    The state that is given to go to will not necessarily be a current state when the state transition process
    is complete. The final state or states are dependent on factors such an initial substates, concurrent 
    states, and history states.
    
    Because the statechart can have one or more current states, it may be necessary to indicate what current state
    to start from. If no current state to start from is provided, then the statechart will default to using
    the first current state that it has; depending of the make up of the statechart (no concurrent state vs.
    with concurrent states), the outcome may be unexpected. For a statechart with concurrent states, it is best
    to provide a current state in which to start from.
    
    When using history states, the statechart will first make transitions to the given state and then use that
    state's history state and recursively follow each history state's history state until there are no 
    more history states to follow. If the given state does not have a history state, then the statechart
    will continue following state transition procedures.
    
    @param state {SC.State|String} the state to go to (may not be the final state in the transition process)
    @param fromCurrentState {SC.State|String} Optional. The current state to start the transition process from.
    @param useHistory {Boolean} Optional. Indicates whether to include using history states in the transition process
  */
  gotoState: function(state, fromCurrentState, useHistory) {
    
    if (!this.get('statechartIsInitialized')) {
      SC.Logger.error('can not go to state %@. statechart has not yet been initialized'.fmt(state));
      return;
    }
    
    var pivotState = null,
        exitStates = [],
        enterStates = [],
        trace = this.get('trace'),
        rootState = this.get('rootState'),
        paramState = state,
        paramFromCurrentState = fromCurrentState;
    
    state = rootState.getSubstate(state);
    
    if (SC.none(state)) {
      SC.Logger.error('Can not to goto state %@. Not a recognized state in statechart'.fmt(paramState));
      return;
    }
    
    if (this._gotoStateLocked) {
      // There is a state transition currently happening. Add this requested state
      // transition to the queue of pending state transitions. The request will
      // be invoked after the current state transition is finished.
      this._pendingStateTransitions.push({
        state: state,
        fromCurrentState: fromCurrentState,
        useHistory: useHistory
      });
      
      return;
    }
    
    // Lock the current state transition so that no other requested state transition 
    // interferes. 
    this._gotoStateLocked = YES;
    
    if (!SC.none(fromCurrentState)) {
      // Check to make sure the current state given is actually a current state of this statechart
      fromCurrentState = rootState.getSubstate(fromCurrentState);
      if (SC.none(fromCurrentState) || !fromCurrentState.get('isCurrentState')) {
        var msg = 'Can not to goto state %@. %@ is not a recognized current state in statechart';
        SC.Logger.error(msg.fmt(paramState, paramFromCurrentState));
        this._gotoStateLocked = NO;
        return;
      }
    } 
    else if (this.getPath('currentStates.length') > 0) {
      // No explicit current state to start from; therefore, just use the first current state as 
      // a default, if there is a current state.
      fromCurrentState = this.get('currentStates')[0];
    }
        
    if (trace) {
      SC.Logger.info('BEGIN gotoState: %@'.fmt(state));
      SC.Logger.info('starting from current state: %@'.fmt(fromCurrentState));
      SC.Logger.info('current states before: %@'.fmt(this.get('currentStates')));
    }

    // If there is a current state to start the transition process from, then determine what
    // states are to be exited
    if (!SC.none(fromCurrentState)) {
      exitStates = this._createStateChain(fromCurrentState);
    }
    
    // Now determine the initial states to be entered
    enterStates = this._createStateChain(state);
    
    // Get the pivot state to indicate when to go from exiting states to entering states
    pivotState = this._findPivotState(exitStates, enterStates);

    if (pivotState) {
      if (trace) SC.Logger.info('pivot state = ' + pivotState);
      if (pivotState.get('substatesAreConcurrent')) {
        SC.Logger.error('Can not go to state %@. Pivot state %@ has concurrent substates.'.fmt(state, pivotState));
        this._gotoStateLocked = NO;
        return;
      }
    }
    
    // Collect what actions to perform for the state transition process
    var gotoStateActions = [];
    
    // Go ahead and find states that are to be exited
    this._traverseStatesToExit(exitStates.shift(), exitStates, pivotState, gotoStateActions);
    
    // Now go find states that are to entered
    if (pivotState !== state) {
      this._traverseStatesToEnter(enterStates.pop(), enterStates, pivotState, useHistory, gotoStateActions);
    } else {
      this._traverseStatesToExit(pivotState, [], null, gotoStateActions);
      this._traverseStatesToEnter(pivotState, null, null, useHistory, gotoStateActions);
    }
    
    // Collected all the state transition actions to be performed. Now execute them.
    this._executeGotoStateActions(state, gotoStateActions);
  },
  
  /**
    Indicates if the statechart is in an active goto state process
  */
  gotoStateActive: function() {
    return this._gotoStateLocked;
  }.property(),
  
  /**
    Indicates if the statechart is in an active goto state process
    that has been suspended
  */
  gotoStateSuspended: function() {
    return this._gotoStateLocked && !!this._gotoStateSuspendedPoint;
  }.property(),
  
  /**
    Resumes an active goto state transition process that has been suspended.
  */
  resumeGotoState: function() {
    if (!this.get('gotoStateSuspended')) {
      SC.Logger.error('Can not resume goto state since it has not been suspended');
      return;
    }
    
    var point = this._gotoStateSuspendedPoint;
    this._executeGotoStateActions(point.gotoState, point.actions, point.marker);
  },
  
  /** @private */
  _executeGotoStateActions: function(gotoState, actions, marker) {
    var action = null,
        len = actions.length,
        actionResult = null;
      
    marker = SC.none(marker) ? 0 : marker;
    
    for (; marker < len; marker += 1) {
      action = actions[marker];
      switch (action.action) {
        case SC.EXIT_STATE:
          actionResult = this._exitState(action.state);
          break;
          
        case SC.ENTER_STATE:
          actionResult = this._enterState(action.state, action.currentState);
          break;
      }
      
      //
      // Check if the state wants to perform an asynchronous action during
      // the state transition process. If so, then we need to first
      // suspend the state transition process and then invoke the 
      // asynchronous action. Once called, it is then up to the state or something 
      // else to resume this statechart's state transition process by calling the
      // statechart's resumeGotoState method.
      //
      if (SC.kindOf(actionResult, SC.Async)) {
        this._gotoStateSuspendedPoint = {
          gotoState: gotoState,
          actions: actions,
          marker: marker + 1
        }; 
        
        actionResult.tryToPerform(action.state);
        return;
      }
    }
    
    this.notifyPropertyChange('currentStates');
    
    if (this.get('trace')) {
      SC.Logger.info('current states after: %@'.fmt(this.get('currentStates')));
      SC.Logger.info('END gotoState: %@'.fmt(gotoState));
    }
    
    // Okay. We're done with the current state transition. Make sure to unlock the
    // gotoState and let other pending state transitions execute.
    this._gotoStateSuspendedPoint = null;
    this._gotoStateLocked = NO;
    this._flushPendingStateTransition();
  },
  
  /** @private */
  _exitState: function(state) {
    if (state.get('currentSubstates').indexOf(state) >= 0) {  
      var parentState = state.get('parentState');
      while (parentState) {
        parentState.get('currentSubstates').removeObject(state);
        parentState = parentState.get('parentState');
      }
    }
      
    if (this.get('trace')) SC.Logger.info('exiting state: ' + state);
    
    state.set('currentSubstates', []);
    state.notifyPropertyChange('isCurrentState');
    var result = this.exitState(state);
    
    if (this.get('monitorIsActive')) this.get('monitor').pushExitedState(state);
    
    state._traverseStatesToExit_skipState = NO;
    
    return result;
  },
  
  exitState: function(state) {
    return state.exitState();
  },
  
  /** @private */
  _enterState: function(state, current) {
    var parentState = state.get('parentState');
    if (parentState && !state.get('isConcurrentState')) parentState.set('historyState', state);
    
    if (current) {
      parentState = state;
      while (parentState) {
        parentState.get('currentSubstates').push(state);
        parentState = parentState.get('parentState');
      }
    }
    
    if (this.get('trace')) SC.Logger.info('entering state: ' + state);
    
    state.notifyPropertyChange('isCurrentState');
    var result = this.enterState(state);
    
    if (this.get('monitorIsActive')) this.get('monitor').pushEnteredState(state);
    
    return result;
  },
  
  enterState: function(state) {
    return state.enterState();
  },
  
  /**
    When called, the statechart will proceed to make transitions to the given state then follow that
    state's history state. 
    
    You can either go to a given state's history recursively or non-recursively. To go to a state's history
    recursively means to following each history state's history state until no more history states can be
    followed. Non-recursively means to just to the given state's history state but do not recusively follow
    history states. If the given state does not have a history state, then the statechart will just follow
    normal procedures when making state transitions.
    
    Because a statechart can have one or more current states, depending on if the statechart has any concurrent
    states, it is optional to provided current state in which to start the state transition process from. If no
    current state is provided, then the statechart will default to the first current state that it has; which, 
    depending on the make up of that statechart, can lead to unexpected outcomes. For a statechart with concurrent
    states, it is best to explicitly supply a current state.
    
    @param state {SC.State|String} the state to go to and follow it's history state
    @param fromCurrentState {SC.State|String} Optional. the current state to start the state transition process from
    @param recursive {Boolean} Optional. whether to follow history states recursively.
  */
  gotoHistoryState: function(state, fromCurrentState, recursive) {
    if (!this.get('statechartIsInitialized')) {
      SC.Logger.error("can not go to state %@'s history state. Statechart has not yet been initialized".fmt(state));
      return;
    }
    
    state = this.getState(state);
  
    if (!state) {
      SC.Logger.error("Can not to goto state %@'s history state. Not a recognized state in statechart".fmt(state));
      return;
    }
    
    var historyState = state.get('historyState');
    
    if (!recursive) { 
      if (historyState) {
        this.gotoState(historyState, fromCurrentState);
      } else {
        this.gotoState(state, fromCurrentState);
      }
    } else {
      this.gotoState(state, fromCurrentState, YES);
    }
  },
  
  /**
    Sends a given event to all the statechart's current states.
    
    If a current state does can not respond to the sent event, then the current state's parent state
    will be tried. This process is recursively done until no more parent state can be tried.
    
    @param event {String} name of the event
    @param sender {Object} Optional. object sending the event
    @param context {Object} Optional. additional information to pass along
    @returns {SC.Responder} the responder that handled it or null
  */
  sendEvent: function(event, sender, context) {
    var eventHandled = NO,
        currentStates = this.get('currentStates').slice(),
        len = 0,
        i = 0,
        responder = null;
    
    if (this._sendEventLocked || this._goStateLocked) {
      // Want to prevent any actions from being processed by the states until 
      // they have had a chance to handle the most immediate action or completed 
      // a state transition
      this._pendingSentEvents.push({
        event: event,
        sender: sender,
        context: context
      });

      return;
    }
    
    this._sendEventLocked = YES;
    
    len = currentStates.get('length');
    for (; i < len; i += 1) {
      eventHandled = NO;
      responder = currentStates[i];
      if (!responder.get('isCurrentState')) continue;
      while (!eventHandled && responder) {
        if (responder.tryToPerform) {
          // try {
            eventHandled = responder.tryToHandleEvent(event, sender, context);
          // } catch (ex) { /** Gobal the exception and move on */ }
        }
        if (!eventHandled) responder = responder.get('parentState');
      }
    }
    
    // Now that all the states have had a chance to process the 
    // first event, we can go ahead and flush any pending sent events.
    this._sendEventLocked = NO;
    this._flushPendingSentEvents();
    
    return responder ;
  },

  /** @private
  
    Creates a chain of states from the given state to the greatest ancestor state (the root state). Used
    when perform state transitions.
  */
  _createStateChain: function(state) {
    var chain = [];
    
    while (state) {
      chain.push(state);
      state = state.get('parentState');
    }
    
    return chain;
  },
  
  /** @private
  
    Finds a pivot state from two given state chains. The pivot state is the state indicating when states
    go from being exited to states being entered during the state transition process. The value 
    returned is the fist matching state between the two given state chains. 
  */
  _findPivotState: function(stateChain1, stateChain2) {
    if (stateChain1.length === 0 || stateChain2.length === 0) return null;
    
    var pivot = stateChain1.find(function(state, index) {
      if (stateChain2.indexOf(state) >= 0) return YES;
    });
    
    return pivot;
  },
  
  /** @private
    
    Recursively follow states that are to be exited during a state transition process. The exit
    process is to start from the given state and work its way up to when either all exit
    states have been reached based on a given exit path or when a stop state has been reached.
    
    @param state {State} the state to be exited
    @param exitStatePath {Array} an array representing a path of states that are to be exited
    @param stopState {State} an explicit state in which to stop the exiting process
  */
  _traverseStatesToExit: function(state, exitStatePath, stopState, gotoStateActions) {    
    if (!state || state === stopState) return;
    
    var trace = this.get('trace');
    
    // This state has concurrent substates. Therefore we have to make sure we
    // exit them up to this state before we can go any further up the exit chain.
    if (state.get('substatesAreConcurrent')) {
      var i = 0,
          currentSubstates = state.get('currentSubstates'),
          len = currentSubstates.length,
          currentState = null;
      
      for (; i < len; i += 1) {
        currentState = currentSubstates[i];
        if (currentState._traverseStatesToExit_skipState === YES) continue;
        var chain = this._createStateChain(currentState);
        this._traverseStatesToExit(chain.shift(), chain, state, gotoStateActions);
      }
    }
    
    gotoStateActions.push({ action: SC.EXIT_STATE, state: state });
    if (state.get('isCurrentState')) state._traverseStatesToExit_skipState = YES;
    this._traverseStatesToExit(exitStatePath.shift(), exitStatePath, stopState, gotoStateActions);
  },
  
  /** @private
  
    Recursively follow states that are to be entred during the state transition process. The
    enter process is to start from the given state and work its way down a given enter path. When
    the end of enter path has been reached, then continue entering states based on whether 
    an initial substate is defined, there are concurrent substates or history states are to be
    followed; when none of those condition are met then the enter process is done.
    
    @param state {State} the sate to be entered
    @param enterStatePath {Array} an array representing an initial path of states that are to be entered
    @param pivotState {State} The state pivoting when to go from exiting states to entering states
    @param useHistory {Boolean} indicates whether to recursively follow history states 
  */
  _traverseStatesToEnter: function(state, enterStatePath, pivotState, useHistory, gotoStateActions) {
    if (!state) return;
    
    var trace = this.get('trace');
    
    // We do not want to enter states in the enter path until the pivot state has been reached. After
    // the pivot state has been reached, then we can go ahead and actually enter states.
    if (pivotState) {
      if (state !== pivotState) {
        this._traverseStatesToEnter(enterStatePath.pop(), enterStatePath, pivotState, useHistory, gotoStateActions);
      } else {
        this._traverseStatesToEnter(enterStatePath.pop(), enterStatePath, null, useHistory, gotoStateActions);
      }
    }
    
    // If no more explicit enter path instructions, then default to enter states based on 
    // other criteria
    else if (!enterStatePath || enterStatePath.length === 0) {
      var gotoStateAction = { action: SC.ENTER_STATE, state: state, currentState: NO };
      gotoStateActions.push(gotoStateAction);
      
      var initialSubstate = state.get('initialSubstate'),
          historyState = state.get('historyState');
      
      // State has concurrent substates. Need to enter all of the substates
      if (state.get('substatesAreConcurrent')) {
        this._traverseConcurrentStatesToEnter(state.get('substates'), null, useHistory, gotoStateActions);
      }
      
      // State has substates and we are instructed to recursively follow the state's
      // history state if it has one.
      else if (state.get('hasSubstates') && historyState && useHistory) {
        this._traverseStatesToEnter(historyState, null, null, useHistory, gotoStateActions);
      }
      
      // State has an initial substate to enter
      else if (initialSubstate) {
        this._traverseStatesToEnter(initialSubstate, null, null, useHistory, gotoStateActions);  
      } 
      
      // Looks like we hit the end of the road. Therefore the state has now become
      // a current state of the statechart.
      else {
        gotoStateAction.currentState = YES;
      }
    }
    
    // Still have an explicit enter path to follow, so keep moving through the path.
    else if (enterStatePath.length > 0) {
      gotoStateActions.push({ action: SC.ENTER_STATE, state: state });
      var nextState = enterStatePath.pop();
      this._traverseStatesToEnter(nextState, enterStatePath, null, useHistory, gotoStateActions); 
      
      // We hit a state that has concurrent substates. Must go through each of the substates
      // and enter them
      if (state.get('substatesAreConcurrent')) {
        this._traverseConcurrentStatesToEnter(state.get('substates'), nextState, useHistory, gotoStateActions);
      }
    }
  },
  
  /** @private
  
    Iterate over all the given concurrent states and enter them
  */
  _traverseConcurrentStatesToEnter: function(states, exclude, useHistory, gotoStateActions) {
    var i = 0,
        len = states.length,
        state = null;
    
    for (; i < len; i += 1) {
      state = states[i];
      if (state !== exclude) this._traverseStatesToEnter(state, null, null, useHistory, gotoStateActions);
    }
  },
  
  /** @private
  
    Called by gotoState to flush a pending state transition at the front of the 
    pending queue.
  */
  _flushPendingStateTransition: function() {
    var pending = this._pendingStateTransitions.shift();
    if (!pending) return;
    this.gotoState(pending.state, pending.fromCurrentState, pending.useHistory);
  },
  
  /** @private

     Called by sendEvent to flush a pending actions at the front of the pending
     queue
   */
  _flushPendingSentEvents: function() {
    var pending = this._pendingSentEvents.shift();
    if (!pending) return;
    this.sendEvent(pending.event, pending.sender, pending.context);
  },
  
  _monitorIsActiveDidChange: function() {
    if (this.get('monitorIsActive') && SC.none(this.get('monitor'))) {
      this.set('monitor', SC.StatechartMonitor.create());
    }
  }.observes('monitorIsActive')
  
};

/** 
  The default name given to a statechart's root state
*/
SC.ROOT_STATE_NAME = "__ROOT_STATE__";

/**
  Constants used during the state transition process
*/
SC.EXIT_STATE = 0;
SC.ENTER_STATE = 1;

/**
  A Startchart class. 
*/
SC.Statechart = SC.Object.extend(SC.StatechartManager);

/**
  Represents a call that is intended to be asynchronous. This is
  used during a state transition process when either entering or
  exiting a state.
*/
SC.Async = SC.Object.extend({
  
  func: null,
  
  arg1: null,
  
  arg2: null,
  
  /** @private
    Called by the statechart
  */
  tryToPerform: function(state) {
    var func = this.get('func'),
        arg1 = this.get('arg1'),
        arg2 = this.get('arg2'),
        funcType = SC.typeOf(func);
      
    if (funcType === SC.T_STRING) {
      state.tryToPerform(func, arg1, arg2);
    } 
    else if (funcType === SC.T_FUNCTION) {
      func.apply(state, [arg1, arg2]);
    }
  }
  
});

/**
  Singleton
*/
SC.Async.mixin({
  
  /**
    Call in either a state's enterState or exitState method when you
    want a state to perform an asynchronous action, such as an animation.
    
    Examples:
    
    {{
    
      SC.State.extend({
    
        enterState: function() {
          return SC.Async.perform('foo');
        },
      
        exitState: function() {
          return SC.Async.perform('bar', 100);
        }
      
        foo: function() { ... },
      
        bar: function(arg) { ... }
    
      });
    
    }}
    
    @param func {String|Function} the functio to be invoked on a state
    @param arg1 Optional. An argument to pass to the given function
    @param arg2 Optional. An argument to pass to the given function
    @return {SC.Async} a new instance of a SC.Async
  */
  perform: function(func, arg1, arg2) {
    return SC.Async.create({ func: func, arg1: arg1, arg2: arg2 });
  }
  
});
