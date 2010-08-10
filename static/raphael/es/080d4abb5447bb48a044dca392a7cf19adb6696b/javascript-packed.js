/* @license
==========================================================================
SproutCore Costello -- Property Observing Library
Copyright ©2006-2009, Sprout Systems, Inc. and contributors.
Portions copyright ©2008-2009 Apple Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.

For more information about SproutCore, visit http://www.sproutcore.com

==========================================================================
@license */
var require=require||function require(){};
var sc_require=sc_require||require;var sc_resource=sc_resource||function sc_resource(){};
sc_require("license");var YES=true;var NO=false;if(typeof console==="undefined"){window.console={};
console.log=console.info=console.warn=console.error=function(){}}var SC=SC||{};var SproutCore=SproutCore||SC;
SC.mixin=function(){var f=arguments[0]||{},a=1,e=arguments.length,b,g,c;if(e===1){f=this||{};
a=0}for(;a<e;a++){if(!(b=arguments[a])){continue}for(c in b){if(!b.hasOwnProperty(c)){continue
}g=b[c];if(f===g){continue}if(g!==undefined){f[c]=g}}}return f};SC.supplement=function(){var f=arguments[0]||{};
var a=1;var e=arguments.length;var b;if(e===1){f=this||{};a=0}for(;a<e;a++){if(!(b=arguments[a])){continue
}for(var c in b){if(!b.hasOwnProperty(c)){continue}var g=f[c];var h=b[c];if(f===h){continue
}if(h!==undefined&&g===undefined){f[c]=h}}}return f};SC.extend=SC.mixin;SC.mixin({T_ERROR:"error",T_OBJECT:"object",T_NULL:"null",T_CLASS:"class",T_HASH:"hash",T_FUNCTION:"function",T_UNDEFINED:"undefined",T_NUMBER:"number",T_BOOL:"boolean",T_ARRAY:"array",T_STRING:"string",typeOf:function(b){if(b===undefined){return SC.T_UNDEFINED
}if(b===null){return SC.T_NULL}var a=typeof(b);if(a=="object"){if(b instanceof Array){a=SC.T_ARRAY
}else{if(b instanceof Function){a=b.isClass?SC.T_CLASS:SC.T_FUNCTION}else{if(SC.Error&&(b instanceof SC.Error)){a=SC.T_ERROR
}else{if(b.isObject===true){a=SC.T_OBJECT}else{a=SC.T_HASH}}}}}else{if(a===SC.T_FUNCTION){a=(b.isClass)?SC.T_CLASS:SC.T_FUNCTION
}}return a},none:function(a){return a===null||a===undefined},empty:function(a){return a===null||a===undefined||a===""
},isArray:function(c){if(c&&c.objectAt){return YES}var a=(c?c.length:null),b=SC.typeOf(c);
return !(SC.none(a)||(b===SC.T_FUNCTION)||(b===SC.T_STRING)||c.setInterval)},makeArray:function(a){return SC.isArray(a)?a:SC.A(a)
},A:function(c){if(SC.none(c)){return[]}if(c.slice instanceof Function){if(typeof(c)==="string"){return[c]
}else{return c.slice()}}if(c.toArray){return c.toArray()}if(!SC.isArray(c)){return[c]
}var b=[],a=c.length;while(--a>=0){b[a]=c[a]}return b},guidKey:"_sc_guid_"+new Date().getTime(),_nextGUID:0,_numberGuids:[],_stringGuids:{},_keyCache:{},guidFor:function(b){if(b===undefined){return"(undefined)"
}if(b===null){return"(null)"}if(b===Object){return"(Object)"}if(b===Array){return"(Array)"
}var a=this.guidKey;if(b[a]){return b[a]}switch(typeof b){case SC.T_NUMBER:return(this._numberGuids[b]=this._numberGuids[b]||("nu"+b));
case SC.T_STRING:return(this._stringGuids[b]=this._stringGuids[b]||("st"+b));case SC.T_BOOL:return(b)?"(true)":"(false)";
default:return SC.generateGuid(b)}},keyFor:function(e,c){var b,a=this._keyCache[e];
if(!a){a=this._keyCache[e]={}}b=a[c];if(!b){b=a[c]=e+"_"+c}return b},generateGuid:function(b){var a=("sc"+(this._nextGUID++));
if(b){b[this.guidKey]=a}return a},hashFor:function(a){return(a&&a.hash&&(typeof a.hash===SC.T_FUNCTION))?a.hash():this.guidFor(a)
},isEqual:function(e,c){if(e===null){return c===null}else{if(e===undefined){return c===undefined
}else{return this.hashFor(e)===this.hashFor(c)}}},compare:function(u,s){if(u===s){return 0
}var m=SC.typeOf(u);var h=SC.typeOf(s);var b=SC.ORDER_DEFINITION_MAPPING;if(!b){var e=SC.ORDER_DEFINITION;
b=SC.ORDER_DEFINITION_MAPPING={};var t,p;for(t=0,p=e.length;t<p;++t){b[e[t]]=t}delete SC.ORDER_DEFINITION
}var x=b[m];var c=b[h];if(x<c){return -1}if(x>c){return 1}switch(m){case SC.T_BOOL:case SC.T_NUMBER:if(u<s){return -1
}if(u>s){return 1}return 0;case SC.T_STRING:var n=u.localeCompare(s);if(n<0){return -1
}if(n>0){return 1}return 0;case SC.T_ARRAY:var q=u.length;var o=s.length;var f=Math.min(q,o);
var a=0;var j=0;var g=arguments.callee;while(a===0&&j<f){a=g(u[j],s[j]);j++}if(a!==0){return a
}if(q<o){return -1}if(q>o){return 1}return 0;case SC.T_OBJECT:if(u.constructor.isComparable===YES){return u.constructor.compare(u,s)
}return 0;default:return 0}},K:function(){return this},EMPTY_ARRAY:[],EMPTY_HASH:{},EMPTY_RANGE:{start:0,length:0},beget:function(c){if(SC.none(c)){return null
}var a=SC.K;a.prototype=c;var b=new a();a.prototype=null;if(SC.typeOf(c.didBeget)===SC.T_FUNCTION){b=c.didBeget(b)
}return b},copy:function(b){var a=b;if(b&&b.isCopyable){return b.copy()}switch(SC.typeOf(b)){case SC.T_ARRAY:if(b.clone&&SC.typeOf(b.clone)===SC.T_FUNCTION){a=b.clone()
}else{a=b.slice()}break;case SC.T_HASH:case SC.T_OBJECT:if(b.clone&&SC.typeOf(b.clone)===SC.T_FUNCTION){a=b.clone()
}else{a={};for(var c in b){a[c]=b[c]}}}return a},merge:function(){var c={},b=arguments.length,a;
for(a=0;a<b;a++){SC.mixin(c,arguments[a])}return c},keys:function(c){var a=[];for(var b in c){a.push(b)
}return a},inspect:function(e){var a,b=[];for(var c in e){a=e[c];if(a==="toString"){continue
}if(SC.typeOf(a)===SC.T_FUNCTION){a="function() { ... }"}b.push(c+": "+a)}return"{"+b.join(" , ")+"}"
},tupleForPropertyPath:function(f,a){if(SC.typeOf(f)===SC.T_ARRAY){return f}var c;
var b=f.indexOf("*");if(b<0){b=f.lastIndexOf(".")}c=(b>=0)?f.slice(b+1):f;var e=this.objectForPropertyPath(f,a,b);
return(e&&c)?[e,c]:null},objectForPropertyPath:function(g,c,e){var h,b,f,a;if(!c){c=window
}if(SC.typeOf(g)===SC.T_STRING){if(e===undefined){e=g.length}h=0;while((c)&&(h<e)){b=g.indexOf(".",h);
if((b<0)||(b>e)){b=e}f=g.slice(h,b);c=c.get?c.get(f):c[f];h=b+1}if(h<e){c=undefined
}}else{h=0;a=g.length;f=null;while((h<a)&&c){f=g[h++];if(f){c=(c.get)?c.get(f):c[f]
}}if(h<a){c=undefined}}return c},STRINGS:{},stringsFor:function(b,a){SC.mixin(SC.STRINGS,a);
return this}});SC.clone=SC.copy;SC.$A=SC.A;SC.didLoad=SC.K;SC.ORDER_DEFINITION=[SC.T_ERROR,SC.T_UNDEFINED,SC.T_NULL,SC.T_BOOL,SC.T_NUMBER,SC.T_STRING,SC.T_ARRAY,SC.T_HASH,SC.T_OBJECT,SC.T_FUNCTION,SC.T_CLASS];
SC.mixin(Function.prototype,{property:function(){this.dependentKeys=SC.$A(arguments);
var a=SC.guidFor(this);this.cacheKey="__cache__"+a;this.lastSetValueKey="__lastValue__"+a;
this.isProperty=YES;return this},cacheable:function(a){this.isProperty=YES;if(!this.dependentKeys){this.dependentKeys=[]
}this.isCacheable=(a===undefined)?YES:a;return this},idempotent:function(a){this.isProperty=YES;
if(!this.dependentKeys){this.dependentKeys=[]}this.isVolatile=(a===undefined)?YES:a;
return this},observes:function(a){var f=arguments.length,b=null,e=null;while(--f>=0){var c=arguments[f];
if((c.indexOf(".")<0)&&(c.indexOf("*")<0)){if(!b){b=this.localPropertyPaths=[]}b.push(c)
}else{if(!e){e=this.propertyPaths=[]}e.push(c)}}return this}});String.prototype.fmt=function(){var b=arguments,a=0;
return this.replace(/%@([0-9]+)?/g,function(c,e){e=(e)?parseInt(e,0)-1:a++;c=b[e];
return((c===null)?"(null)":(c===undefined)?"":c).toString()})};String.prototype.loc=function(){var a=SC.STRINGS[this]||this;
return a.fmt.apply(a,arguments)};String.prototype.w=function(){var c=[],e=this.split(" "),b=e.length,f,a=0;
for(a=0;a<b;++a){f=e[a];if(f.length!==0){c.push(f)}}return c};SC.ObserverSet={targets:0,_membersCacheIsValid:NO,add:function(e,g,b){var c=(e)?SC.guidFor(e):"__this__";
var a=this[c];if(!a){a=this[c]=SC.CoreSet.create();a.target=e;a.isTargetSet=YES;this.targets++
}a.add(g);if(b!==undefined){var f=a.contexts;if(!b){b=a.contexts={}}f[SC.guidFor(g)]=b
}this._membersCacheIsValid=NO},remove:function(c,e){var b=(c)?SC.guidFor(c):"__this__";
var a=this[b];if(!a){return NO}a.remove(e);if(a.length<=0){a.target=null;a.isTargetSet=NO;
a.contexts=null;delete this[b];this.targets--}else{if(a.contexts){delete a.contexts[SC.guidFor(e)]
}}this._membersCacheIsValid=NO;return YES},invokeMethods:function(){for(var b in this){if(!this.hasOwnProperty(b)){continue
}var c=this[b];if(c&&c.isTargetSet){var a=c.length;var e=c.target;while(--a>=0){c[a].call(e)
}}}},getMembers:function(){if(this._membersCacheIsValid){return this._members}if(!this._members){this._members=[]
}else{this._members.length=0}var b=this._members;for(var c in this){if(!this.hasOwnProperty(c)){continue
}var e=this[c];if(e&&e.isTargetSet){var a=e.length;var f=e.target;var h=e.contexts;
if(h){while(--a>=0){var g=e[a];b.push([f,g,h[SC.guidFor(g)]])}}else{while(--a>=0){b.push([f,e[a]])
}}}}this._membersCacheIsValid=YES;return b},clone:function(){var b,e,c,a=SC.ObserverSet.create();
for(c in this){if(!this.hasOwnProperty(c)){continue}b=this[c];if(b&&b.isTargetSet){e=b.clone();
e.target=b.target;if(b.contexts){e.contexts=SC.clone(b.contexts)}a[c]=e}}a.targets=this.targets;
a._membersCacheIsValid=NO;return a},create:function(){return SC.beget(this)}};SC.ObserverSet.slice=SC.ObserverSet.clone;
require("private/observer_set");SC.LOG_OBSERVERS=NO;SC.Observable={isObservable:YES,automaticallyNotifiesObserversFor:function(a){return YES
},get:function(c){var b=this[c],a;if(b===undefined){return this.unknownProperty(c)
}else{if(b&&b.isProperty){if(b.isCacheable){a=this._kvo_cache;if(!a){a=this._kvo_cache={}
}return(a[b.cacheKey]!==undefined)?a[b.cacheKey]:(a[b.cacheKey]=b.call(this,c))}else{return b.call(this,c)
}}else{return b}}},set:function(i,g){var b=this[i],j=this.automaticallyNotifiesObserversFor(i),f=g,c,a,h,e;
if(!j&&this._kvo_cacheable&&(a=this._kvo_cache)){c=this._kvo_cachedep;if(!c||(c=c[i])===undefined){c=this._kvo_computeCachedDependentsFor(i)
}if(c){h=c.length;while(--h>=0){e=c[h];a[e.cacheKey]=a[e.lastSetValueKey]=undefined
}}}if(b&&b.isProperty){a=this._kvo_cache;if(b.isVolatile||!a||(a[b.lastSetValueKey]!==g)){if(!a){a=this._kvo_cache={}
}a[b.lastSetValueKey]=g;if(j){this.propertyWillChange(i)}f=b.call(this,i,g);if(b.isCacheable){a[b.cacheKey]=f
}if(j){this.propertyDidChange(i,f,YES)}}}else{if(b===undefined){if(j){this.propertyWillChange(i)
}this.unknownProperty(i,g);if(j){this.propertyDidChange(i,f)}}else{if(this[i]!==g){if(j){this.propertyWillChange(i)
}f=this[i]=g;if(j){this.propertyDidChange(i,f)}}}}return this},unknownProperty:function(a,b){if(!(b===undefined)){this[a]=b
}return b},beginPropertyChanges:function(){this._kvo_changeLevel=(this._kvo_changeLevel||0)+1;
return this},endPropertyChanges:function(){this._kvo_changeLevel=(this._kvo_changeLevel||1)-1;
var b=this._kvo_changeLevel,a=this._kvo_changes;if((b<=0)&&a&&(a.length>0)&&!SC.Observers.isObservingSuspended){this._notifyPropertyObservers()
}return this},propertyWillChange:function(a){return this},propertyDidChange:function(n,l,c){this._kvo_revision=(this._kvo_revision||0)+1;
var b=this._kvo_changeLevel||0,h,m,i,a,e,g=SC.LOG_OBSERVERS&&!(this.LOG_OBSERVING===NO);
if(this._kvo_cacheable&&(a=this._kvo_cache)){if(!c){e=this[n];if(e&&e.isProperty){a[e.cacheKey]=a[e.lastSetValueKey]=undefined
}}h=this._kvo_cachedep;if(!h||(h=h[n])===undefined){h=this._kvo_computeCachedDependentsFor(n)
}if(h){m=h.length;while(--m>=0){i=h[m];a[i.cacheKey]=a[i.lastSetValueKey]=undefined
}}}var f=SC.Observers.isObservingSuspended;if((b>0)||f){var j=this._kvo_changes;if(!j){j=this._kvo_changes=SC.CoreSet.create()
}j.add(n);if(f){if(g){console.log("%@%@: will not notify observers because observing is suspended".fmt(SC.KVO_SPACES,this))
}SC.Observers.objectHasPendingChanges(this)}}else{this._notifyPropertyObservers(n)
}return this},registerDependentKey:function(i,c){var f=this._kvo_dependents,b=this[i],j,h,a,g,e;
if(SC.typeOf(c)===SC.T_ARRAY){j=c;a=0}else{j=arguments;a=1}h=j.length;if(!f){this._kvo_dependents=f={}
}while(--h>=a){g=j[h];e=f[g];if(!e){e=f[g]=[]}e.push(i)}},_kvo_addCachedDependents:function(b,g,i,c){var a=g.length,f,e,h;
while(--a>=0){e=g[a];c.add(e);f=this[e];if(f&&(f instanceof Function)&&f.isProperty){if(f.isCacheable){b.push(f)
}if((h=i[e])&&h.length>0){this._kvo_addCachedDependents(b,h,i,c)}}}},_kvo_computeCachedDependentsFor:function(c){var e=this._kvo_cachedep,g=this._kvo_dependents,f=g?g[c]:null,a,b;
if(!e){e=this._kvo_cachedep={}}if(!f||f.length===0){return e[c]=null}a=e[c]=[];b=SC._TMP_SEEN_SET=(SC._TMP_SEEN_SET||SC.CoreSet.create());
b.add(c);this._kvo_addCachedDependents(a,f,g,b);b.clear();if(a.length===0){a=e[c]=null
}return a},_kvo_for:function(c,b){var a=this[c];if(!this._kvo_cloned){this._kvo_cloned={}
}if(!a){a=this[c]=(b===undefined)?[]:b.create();this._kvo_cloned[c]=YES}else{if(!this._kvo_cloned[c]){a=this[c]=a.copy();
this._kvo_cloned[c]=YES}}return a},addObserver:function(c,g,i,b){var e,a,f,h;if(i===undefined){i=g;
g=this}if(!g){g=this}if(SC.typeOf(i)===SC.T_STRING){i=g[i]}if(!i){throw"You must pass a method to addObserver()"
}c=c.toString();if(c.indexOf(".")>=0){a=SC._ChainObserver.createChain(this,c,g,i,b);
a.masterTarget=g;a.masterMethod=i;this._kvo_for(SC.keyFor("_kvo_chains",c)).push(a)
}else{if((this[c]===undefined)&&(c.indexOf("@")===0)){this.get(c)}if(g===this){g=null
}e=SC.keyFor("_kvo_observers",c);this._kvo_for(e,SC.ObserverSet).add(g,i,b);this._kvo_for("_kvo_observed_keys",SC.CoreSet).add(c)
}if(this.didAddObserver){this.didAddObserver(c,g,i)}return this},removeObserver:function(c,g,i){var e,f,b,h,a;
if(i===undefined){i=g;g=this}if(!g){g=this}if(SC.typeOf(i)===SC.T_STRING){i=g[i]}if(!i){throw"You must pass a method to removeObserver()"
}c=c.toString();if(c.indexOf(".")>=0){e=SC.keyFor("_kvo_chains",c);if(f=this[e]){f=this._kvo_for(e);
a=f.length;while(--a>=0){b=f[a];if(b&&(b.masterTarget===g)&&(b.masterMethod===i)){f[a]=b.destroyChain()
}}}}else{if(g===this){g=null}e=SC.keyFor("_kvo_observers",c);if(h=this[e]){h=this._kvo_for(e);
h.remove(g,i);if(h.targets<=0){this._kvo_for("_kvo_observed_keys",SC.CoreSet).remove(c)
}}}if(this.didRemoveObserver){this.didRemoveObserver(c,g,i)}return this},hasObserverFor:function(b){SC.Observers.flush(this);
var e=this[SC.keyFor("_kvo_observers",b)],c=this[SC.keyFor("_kvo_local",b)],a;if(c&&c.length>0){return YES
}if(e&&e.getMembers().length>0){return YES}return NO},initObservable:function(){if(this._observableInited){return
}this._observableInited=YES;var g,o,m,l,i,f,n,h,c,p,b,j,e,a;if(o=this._observers){h=o.length;
for(g=0;g<h;g++){m=o[g];i=this[m];f=i.propertyPaths;n=(f)?f.length:0;for(c=0;c<n;
c++){p=f[c];b=p.indexOf(".");if(b<0){this.addObserver(p,this,i)}else{if(p.indexOf("*")===0){this.addObserver(p.slice(1),this,i)
}else{j=null;if(b===0){j=this;p=p.slice(1)}else{if(b===4&&p.slice(0,5)==="this."){j=this;
p=p.slice(5)}else{if(b<0&&p.length===4&&p==="this"){j=this;p=""}}}SC.Observers.addObserver(p,this,i,j)
}}}}}this.bindings=[];if(o=this._bindings){for(g=0,a=o.length;g<a;g++){m=o[g];l=this[m];
e=m.slice(0,-7);this[m]=this.bind(e,l)}}if(o=this._properties){for(g=0,a=o.length;
g<a;g++){m=o[g];if(l=this[m]){if(l.isCacheable){this._kvo_cacheable=YES}if(l.dependentKeys&&(l.dependentKeys.length>0)){this.registerDependentKey(m,l.dependentKeys)
}}}}},observersForKey:function(a){var b=this._kvo_for("_kvo_observers",a);return b.getMembers()||[]
},_notifyPropertyObservers:function(w){if(!this._observableInited){this.initObservable()
}SC.Observers.flush(this);var h=SC.LOG_OBSERVERS&&!(this.LOG_OBSERVING===NO),q,u,o,e,p,n,t,s,l,a,g,v,c,j,f,b,i,m;
if(h){i=SC.KVO_SPACES=(SC.KVO_SPACES||"")+"  ";console.log('%@%@: notifying observers after change to key "%@"'.fmt(i,this,w))
}e=this["_kvo_observers_*"];this._kvo_changeLevel=(this._kvo_changeLevel||0)+1;while(((u=this._kvo_changes)&&(u.length>0))||w){t=++this.propertyRevision;
if(!u){u=SC.CoreSet.create()}this._kvo_changes=null;if(w==="*"){u.add("*");u.addEach(this._kvo_for("_kvo_observed_keys",SC.CoreSet))
}else{if(w){u.add(w)}}if(o=this._kvo_dependents){for(p=0;p<u.length;p++){w=u[p];n=o[w];
if(n&&(j=n.length)){if(h){console.log("%@...including dependent keys for %@: %@".fmt(i,w,n))
}m=this._kvo_cache;if(!m){m=this._kvo_cache={}}while(--j>=0){u.add(w=n[j]);if(f=this[w]){this[f.cacheKey]=undefined;
m[f.cacheKey]=m[f.lastSetValueKey]=undefined}}}}}while(u.length>0){w=u.pop();q=this[SC.keyFor("_kvo_observers",w)];
if(q){s=q.getMembers();l=s.length;for(g=0;g<l;g++){a=s[g];if(a[3]===t){continue}v=a[0]||this;
c=a[1];b=a[2];a[3]=t;if(h){console.log('%@...firing observer on %@ for key "%@"'.fmt(i,v,w))
}if(b!==undefined){c.call(v,this,w,null,b,t)}else{c.call(v,this,w,null,t)}}}s=this[SC.keyFor("_kvo_local",w)];
if(s){l=s.length;for(g=0;g<l;g++){a=s[g];c=this[a];if(c){if(h){console.log('%@...firing local observer %@.%@ for key "%@"'.fmt(i,this,a,w))
}c.call(this,this,w,null,t)}}}if(e&&w!=="*"){s=e.getMembers();l=s.length;for(g=0;
g<l;g++){a=s[g];v=a[0]||this;c=a[1];b=a[2];if(h){console.log('%@...firing * observer on %@ for key "%@"'.fmt(i,v,w))
}if(b!==undefined){c.call(v,this,w,null,b,t)}else{c.call(v,this,w,null,t)}}}if(this.propertyObserver){if(h){console.log('%@...firing %@.propertyObserver for key "%@"'.fmt(i,this,w))
}this.propertyObserver(this,w,null,t)}}if(u){u.destroy()}w=null}this._kvo_changeLevel=(this._kvo_changeLevel||1)-1;
if(h){SC.KVO_SPACES=i.slice(0,-2)}return YES},bind:function(a,c,f){var e,b;if(f!==undefined){c=[c,f]
}b=SC.typeOf(c);if(b===SC.T_STRING||b===SC.T_ARRAY){e=this[a+"BindingDefault"]||SC.Binding;
e=e.beget().from(c)}else{e=c}e=e.to(a,this).connect();this.bindings.push(e);return e
},didChangeFor:function(a){var b,g,f,l,e,c,i,j,h;a=SC.hashFor(a);b=this._kvo_didChange_valueCache;
if(!b){b=this._kvo_didChange_valueCache={}}g=this._kvo_didChange_revisionCache;if(!g){g=this._kvo_didChange_revisionCache={}
}f=b[a]||{};l=g[a]||{};e=false;c=this._kvo_revision||0;i=arguments.length;while(--i>=1){j=arguments[i];
if(l[j]!=c){h=this.get(j);if(f[j]!==h){e=true;f[j]=h}}l[j]=c}b[a]=f;g[a]=l;return e
},setIfChanged:function(a,b){return(this.get(a)!==b)?this.set(a,b):this},getPath:function(b){var a=SC.tupleForPropertyPath(b,this);
if(a===null||a[0]===null){return undefined}return a[0].get(a[1])},setPath:function(c,b){if(c.indexOf(".")>=0){var a=SC.tupleForPropertyPath(c,this);
if(!a||!a[0]){return null}a[0].set(a[1],b)}else{this.set(c,b)}return this},setPathIfChanged:function(c,b){if(c.indexOf(".")>=0){var a=SC.tupleForPropertyPath(c,this);
if(!a||!a[0]){return null}if(a[0].get(a[1])!==b){a[0].set(a[1],b)}}else{this.setIfChanged(c,b)
}return this},getEach:function(){var e=SC.A(arguments),c=[],a,b;for(a=0,b=e.length;
a<b;a++){c[c.length]=this.getPath(e[a])}return c},incrementProperty:function(a){this.set(a,(this.get(a)||0)+1);
return this.get(a)},decrementProperty:function(a){this.set(a,(this.get(a)||0)-1);
return this.get(a)},toggleProperty:function(a,b,c){if(b===undefined){b=true}if(c===undefined){c=false
}b=(this.get(a)==b)?c:b;this.set(a,b);return this.get(a)},notifyPropertyChange:function(a,b){this.propertyWillChange(a);
this.propertyDidChange(a,b);return this},allPropertiesDidChange:function(){this._kvo_cache=null;
this._notifyPropertyObservers("*");return this},addProbe:function(a){this.addObserver(a,SC.logChange)
},removeProbe:function(a){this.removeObserver(a,SC.logChange)},logProperty:function(){var b=SC.$A(arguments),e,c,a;
for(a=0,c=b.length;a<c;a++){e=b[a];console.log("%@:%@: ".fmt(SC.guidFor(this),e),this.get(e))
}},propertyRevision:1};SC.logChange=function logChange(c,a,b){console.log("CHANGE: %@[%@] => %@".fmt(c,a,c.get(a)))
};SC.mixin(SC,{get:function(a,b){if(!a){return undefined}if(b===undefined){return this[a]
}if(a.get){return a.get(b)}return a[b]}});SC.mixin(Array.prototype,SC.Observable);
SC.Enumerator=function(a){this.enumerable=a;this.reset();return this};SC.Enumerator.prototype={nextObject:function(){var c=this._index;
var a=this._length;if(c>=a){return undefined}var b=this.enumerable.nextObject(c,this._previousObject,this._context);
this._previousObject=b;this._index=c+1;if(c>=a){this._context=SC.Enumerator._pushContext(this._context)
}return b},reset:function(){var b=this.enumerable;if(!b){throw SC.$error("Enumerator has been destroyed")
}this._length=b.get?b.get("length"):b.length;var a=this._length;this._index=0;this._previousObject=null;
this._context=(a>0)?SC.Enumerator._popContext():null},destroy:function(){this.enumerable=this._length=this._index=this._previousObject=this._context=null
}};SC.Enumerator.create=function(a){return new SC.Enumerator(a)};SC.Enumerator._popContext=function(){var a=this._contextCache?this._contextCache.pop():null;
return a||{}};SC.Enumerator._pushContext=function(b){this._contextCache=this._contextCache||[];
var a=this._contextCache;a.push(b);return null};require("core");require("system/enumerator");
SC.Enumerable={isEnumerable:YES,nextObject:function(a,c,b){return this.objectAt?this.objectAt(a):this[a]
},firstObject:function(){if(this.get("length")===0){return undefined}if(this.objectAt){return this.objectAt(0)
}var b=SC.Enumerator._popContext(),a;a=this.nextObject(0,null,b);b=SC.Enumerator._pushContext(b);
return a}.property(),enumerator:function(){return SC.Enumerator.create(this)},forEach:function(h,g){if(typeof h!=="function"){throw new TypeError()
}var b=this.get?this.get("length"):this.length;if(g===undefined){g=null}var f=null;
var c=SC.Enumerator._popContext();for(var a=0;a<b;a++){var e=this.nextObject(a,f,c);
h.call(g,e,a,this);f=e}f=null;c=SC.Enumerator._pushContext(c);return this},getEach:function(a){return this.map(function(b){return b?(b.get?b.get(a):b[a]):null
},this)},setEach:function(a,b){this.forEach(function(c){if(c){if(c.set){c.set(a,b)
}else{c[a]=b}}},this);return this},map:function(i,h){if(typeof i!=="function"){throw new TypeError()
}var b=this.get?this.get("length"):this.length;if(h===undefined){h=null}var c=[];
var g=null;var e=SC.Enumerator._popContext();for(var a=0;a<b;a++){var f=this.nextObject(a,g,e);
c[a]=i.call(h,f,a,this);g=f}g=null;e=SC.Enumerator._pushContext(e);return c},mapProperty:function(a){return this.map(function(b){return b?(b.get?b.get(a):b[a]):null
})},filter:function(i,h){if(typeof i!=="function"){throw new TypeError()}var b=this.get?this.get("length"):this.length;
if(h===undefined){h=null}var c=[];var g=null;var e=SC.Enumerator._popContext();for(var a=0;
a<b;a++){var f=this.nextObject(a,g,e);if(i.call(h,f,a,this)){c.push(f)}g=f}g=null;
e=SC.Enumerator._pushContext(e);return c},sortProperty:function(b){var c=(typeof b===SC.T_STRING)?arguments:b,a=c.length,e;
if(this instanceof Array){e=this}else{e=[];this.forEach(function(f){e.push(f)})}if(!e){return[]
}return e.sort(function(h,g){var f,j,m,l,i=0;for(f=0;i===0&&f<a;f++){j=c[f];m=h?(h.get?h.get(j):h[j]):null;
l=g?(g.get?g.get(j):g[j]):null;i=SC.compare(m,l)}return i})},filterProperty:function(l,g){var e=this.get?this.get("length"):this.length;
var f=[];var j=null;var b=SC.Enumerator._popContext();for(var h=0;h<e;h++){var c=this.nextObject(h,j,b);
var i=c?(c.get?c.get(l):c[l]):null;var a=(g===undefined)?!!i:SC.isEqual(i,g);if(a){f.push(c)
}j=c}j=null;b=SC.Enumerator._pushContext(b);return f},find:function(i,e){if(typeof i!=="function"){throw new TypeError()
}var c=this.get?this.get("length"):this.length;if(e===undefined){e=null}var h=null,b,j=NO,f=null;
var a=SC.Enumerator._popContext();for(var g=0;g<c&&!j;g++){b=this.nextObject(g,h,a);
if(j=i.call(e,b,g,this)){f=b}h=b}b=h=null;a=SC.Enumerator._pushContext(a);return f
},findProperty:function(j,g){var c=this.get?this.get("length"):this.length;var l=NO,e=null,i=null,b,h;
var a=SC.Enumerator._popContext();for(var f=0;f<c&&!l;f++){b=this.nextObject(f,i,a);
h=b?(b.get?b.get(j):b[j]):null;l=(g===undefined)?!!h:SC.isEqual(h,g);if(l){e=b}i=b
}i=b=null;a=SC.Enumerator._pushContext(a);return e},every:function(i,h){if(typeof i!=="function"){throw new TypeError()
}var b=this.get?this.get("length"):this.length;if(h===undefined){h=null}var c=YES;
var g=null;var e=SC.Enumerator._popContext();for(var a=0;c&&(a<b);a++){var f=this.nextObject(a,g,e);
if(!i.call(h,f,a,this)){c=NO}g=f}g=null;e=SC.Enumerator._pushContext(e);return c},everyProperty:function(j,f){var c=this.get?this.get("length"):this.length;
var e=YES;var i=null;var a=SC.Enumerator._popContext();for(var g=0;e&&(g<c);g++){var b=this.nextObject(g,i,a);
var h=b?(b.get?b.get(j):b[j]):null;e=(f===undefined)?!!h:SC.isEqual(h,f);i=b}i=null;
a=SC.Enumerator._pushContext(a);return e},some:function(i,h){if(typeof i!=="function"){throw new TypeError()
}var b=this.get?this.get("length"):this.length;if(h===undefined){h=null}var c=NO;
var g=null;var e=SC.Enumerator._popContext();for(var a=0;(!c)&&(a<b);a++){var f=this.nextObject(a,g,e);
if(i.call(h,f,a,this)){c=YES}g=f}g=null;e=SC.Enumerator._pushContext(e);return c},someProperty:function(j,f){var c=this.get?this.get("length"):this.length;
var e=NO;var i=null;var a=SC.Enumerator._popContext();for(var g=0;!e&&(g<c);g++){var b=this.nextObject(g,i,a);
var h=b?(b.get?b.get(j):b[j]):null;e=(f===undefined)?!!h:SC.isEqual(h,f);i=b}i=null;
a=SC.Enumerator._pushContext(a);return e},reduce:function(h,i,j){if(typeof h!=="function"){throw new TypeError()
}var c=this.get?this.get("length"):this.length;if(c===0&&i===undefined){throw new TypeError()
}var e=i;var g=null;var a=SC.Enumerator._popContext();for(var f=0;f<c;f++){var b=this.nextObject(f,g,a);
if(b!==null){if(e===undefined){e=b}else{e=h.call(null,e,b,f,this,j)}}g=b}g=null;a=SC.Enumerator._pushContext(a);
if(e===undefined){throw new TypeError()}return e},invoke:function(i){var f=this.get?this.get("length"):this.length;
if(f<=0){return[]}var j;var h=[];var c=arguments.length;if(c>1){for(j=1;j<c;j++){h.push(arguments[j])
}}var g=[];var l=null;var b=SC.Enumerator._popContext();for(j=0;j<f;j++){var e=this.nextObject(j,l,b);
var a=e?e[i]:null;if(a){g[j]=a.apply(e,h)}l=e}l=null;b=SC.Enumerator._pushContext(b);
return g},invokeWhile:function(e,j){var g=this.get?this.get("length"):this.length;
if(g<=0){return null}var l;var i=[];var c=arguments.length;if(c>2){for(l=2;l<c;l++){i.push(arguments[l])
}}var h=e;var m=null;var b=SC.Enumerator._popContext();for(l=0;(h===e)&&(l<g);l++){var f=this.nextObject(l,m,b);
var a=f?f[j]:null;if(a){h=a.apply(f,i)}m=f}m=null;b=SC.Enumerator._pushContext(b);
return h},toArray:function(){var a=[];this.forEach(function(b){a.push(b)},this);return a
}};SC._buildReducerFor=function(a,b){return function(e,f){var g=this[a];if(SC.typeOf(g)!==SC.T_FUNCTION){return this.unknownProperty?this.unknownProperty(e,f):null
}else{var c=SC.Enumerable.reduce.call(this,g,null,b);return c}}.property("[]")};SC.Reducers={"[]":function(a,b){return this
}.property(),enumerableContentDidChange:function(b,a){this.notifyPropertyChange("[]");
return this},reducedProperty:function(j,h,g){if(!j||j.charAt(0)!=="@"){return undefined
}var e=j.match(/^@([^(]*)(\(([^)]*)\))?$/);if(!e||e.length<2){return undefined}var i=e[1];
var l=e[3];i="reduce"+i.slice(0,1).toUpperCase()+i.slice(1);var a=this[i];if(SC.typeOf(a)!==SC.T_FUNCTION){return undefined
}if(g===NO){return SC.Enumerable.reduce.call(this,a,null,l)}var c=SC._buildReducerFor(i,l);
var b=this.constructor.prototype;if(b){b[j]=c;var f=b._properties||[];f.push(j);b._properties=f;
this.registerDependentKey(j,"[]")}return SC.Enumerable.reduce.call(this,a,null,l)
},reduceMax:function(a,f,b,g,c){if(c&&f){f=f.get?f.get(c):f[c]}if(a===null){return f
}return(f>a)?f:a},reduceMaxObject:function(b,g,c,h,f){var a=b,i=g;if(f){if(g){i=g.get?g.get(f):g[f]
}if(b){a=b.get?b.get(f):b[f]}}if(a===null){return g}return(i>a)?g:b},reduceMin:function(a,f,b,g,c){if(c&&f){f=f.get?f.get(c):f[c]
}if(a===null){return f}return(f<a)?f:a},reduceMinObject:function(b,g,c,h,f){var a=b,i=g;
if(f){if(g){i=g.get?g.get(f):g[f]}if(b){a=b.get?b.get(f):b[f]}}if(a===null){return g
}return(i<a)?g:b},reduceAverage:function(b,h,f,i,g){if(g&&h){h=h.get?h.get(g):h[g]
}var c=(b||0)+h;var a=i.get?i.get("length"):i.length;if(f>=a-1){c=c/a}return c},reduceSum:function(a,f,b,g,c){if(c&&f){f=f.get?f.get(c):f[c]
}return(a===null)?f:a+f}};SC.mixin(SC.Enumerable,SC.Reducers);SC.mixin(Array.prototype,SC.Reducers);
Array.prototype.isEnumerable=YES;(function(){var a={nextObject:SC.Enumerable.nextObject,enumerator:SC.Enumerable.enumerator,firstObject:SC.Enumerable.firstObject,sortProperty:SC.Enumerable.sortProperty,mapProperty:function(h){var f=this.length;
var g=[];for(var e=0;e<f;e++){var i=this[e];g[e]=i?(i.get?i.get(h):i[h]):null}return g
},filterProperty:function(i,l){var g=this.length;var h=[];for(var f=0;f<g;f++){var j=this[f];
var m=j?(j.get?j.get(i):j[i]):null;var e=(l===undefined)?!!m:SC.isEqual(m,l);if(e){h.push(j)
}}return h},find:function(l,j){if(typeof l!=="function"){throw new TypeError()}var f=this.length;
if(j===undefined){j=null}var h,g=null,i=NO;for(var e=0;e<f&&!i;e++){h=this[e];if(i=l.call(j,h,e,this)){g=h
}}h=null;return g},findProperty:function(h,l){var f=this.length;var i,m,j=NO,g=null;
for(var e=0;e<f&&!j;e++){m=(i=this[e])?(i.get?i.get(h):i[h]):null;j=(l===undefined)?!!m:SC.isEqual(m,l);
if(j){g=i}}i=null;return g},everyProperty:function(h,j){var f=this.length;var g=YES;
for(var e=0;g&&(e<f);e++){var i=this[e];var l=i?(i.get?i.get(h):i[h]):null;g=(j===undefined)?!!l:SC.isEqual(l,j)
}return g},someProperty:function(h,j){var f=this.length;var g=NO;for(var e=0;!g&&(e<f);
e++){var i=this[e];var l=i?(i.get?i.get(h):i[h]):null;g=(j===undefined)?!!l:SC.isEqual(l,j)
}return g},invoke:function(g){var f=this.length;if(f<=0){return[]}var e;var i=[];
var l=arguments.length;if(l>1){for(e=1;e<l;e++){i.push(arguments[e])}}var h=[];for(e=0;
e<f;e++){var j=this[e];var m=j?j[g]:null;if(m){h[e]=m.apply(j,i)}}return h},invokeWhile:function(g,m){var i=this.length;
if(i<=0){return null}var n;var l=[];var f=arguments.length;if(f>2){for(n=2;n<f;n++){l.push(arguments[n])
}}var j=g;for(n=0;(j===g)&&(n<i);n++){var h=this[n];var e=h?h[m]:null;if(e){j=e.apply(h,l)
}}return j},toArray:function(){var f=this.length;if(f<=0){return[]}var g=[];for(var e=0;
e<f;e++){var h=this[e];g.push(h)}return g},getEach:function(h){var g=[];var f=this.length;
for(var e=0;e<f;e++){var i=this[e];g[e]=i?(i.get?i.get(h):i[h]):null}return g},setEach:function(g,h){var f=this.length;
for(var e=0;e<f;e++){var i=this[e];if(i){if(i.set){i.set(g,h)}else{i[g]=h}}}return this
}};var c={forEach:function(i,h){if(typeof i!=="function"){throw new TypeError()}var f=this.length;
if(h===undefined){h=null}for(var e=0;e<f;e++){var g=this[e];i.call(h,g,e,this)}return this
},map:function(j,i){if(typeof j!=="function"){throw new TypeError()}var f=this.length;
if(i===undefined){i=null}var g=[];for(var e=0;e<f;e++){var h=this[e];g[e]=j.call(i,h,e,this)
}return g},filter:function(j,i){if(typeof j!=="function"){throw new TypeError()}var f=this.length;
if(i===undefined){i=null}var g=[];for(var e=0;e<f;e++){var h=this[e];if(j.call(i,h,e,this)){g.push(h)
}}return g},every:function(j,i){if(typeof j!=="function"){throw new TypeError()}var f=this.length;
if(i===undefined){i=null}var g=YES;for(var e=0;g&&(e<f);e++){var h=this[e];if(!j.call(i,h,e,this)){g=NO
}}return g},some:function(j,i){if(typeof j!=="function"){throw new TypeError()}var f=this.length;
if(i===undefined){i=null}var g=NO;for(var e=0;(!g)&&(e<f);e++){var h=this[e];if(j.call(i,h,e,this)){g=YES
}}return g},reduce:function(l,g,j){if(typeof l!=="function"){throw new TypeError()
}var f=this.length;if(f===0&&g===undefined){throw new TypeError()}var h=g;for(var e=0;
e<f;e++){var i=this[e];if(i!==null){if(h===undefined){h=i}else{h=l.call(null,h,i,e,this,j)
}}}if(h===undefined){throw new TypeError()}return h}};for(var b in c){if(!c.hasOwnProperty(b)){continue
}if(!Array.prototype[b]||((typeof Prototype==="object")&&Prototype.Version.match(/^1\.6/))){Array.prototype[b]=c[b]
}}SC.mixin(Array.prototype,a)})();SC.RangeObserver={isRangeObserver:YES,toString:function(){var a=this.indexes?this.indexes.toString():"SC.IndexSet<..>";
return a.replace("IndexSet","RangeObserver(%@)".fmt(SC.guidFor(this)))},create:function(e,g,f,h,c,a){var b=SC.beget(this);
b.source=e;b.indexes=g?g.frozenCopy():null;b.target=f;b.method=h;b.context=c;b.isDeep=a||NO;
b.beginObserving();return b},extend:function(f){var e=SC.beget(this),c=arguments,b=c.length,a;
for(a=0;a<b;a++){SC.mixin(e,c[a])}return e},destroy:function(a){this.endObserving();
return this},update:function(a,b){if(this.indexes&&this.indexes.isEqual(b)){return this
}this.indexes=b?b.frozenCopy():null;this.endObserving().beginObserving();return this
},beginObserving:function(){if(!this.isDeep){return this}var b=this.observing;if(!b){b=this.observing=SC.CoreSet.create()
}var a=this._beginObservingForEach;if(!a){a=this._beginObservingForEach=function(c){var e=this.source.objectAt(c);
if(e&&e.addObserver){b.push(e);e._kvo_needsRangeObserver=YES}}}this.indexes.forEach(a,this);
this.isObserving=NO;SC.Observers.addPendingRangeObserver(this);return this},setupPending:function(a){var e=this.observing;
if(this.isObserving||!e||(e.get("length")===0)){return YES}if(e.contains(a)){this.isObserving=YES;
var b=this._setupPendingForEach;if(!b){var c=this.source,f=this.objectPropertyDidChange;
b=this._setupPendingForEach=function(g){var j=this.source.objectAt(g),h=SC.guidFor(j),i;
if(j&&j.addObserver){e.push(j);j.addObserver("*",this,f);i=this[h];if(i===undefined||i===null){this[h]=g
}else{if(i.isIndexSet){i.add(g)}else{i=this[h]=SC.IndexSet.create(i).add(g)}}}}}this.indexes.forEach(b,this);
return YES}else{return NO}},endObserving:function(){if(!this.isDeep){return this}var f=this.observing;
if(this.isObserving){var b=this.objectPropertyDidChange,c=this.source,a,g,e;if(f){g=f.length;
for(a=0;a<g;a++){e=f[a];e.removeObserver("*",this,b);this[SC.guidFor(e)]=null}f.length=0
}this.isObserving=NO}if(f){f.clear()}return this},rangeDidChange:function(b){var a=this.indexes;
if(!b||!a||a.intersects(b)){this.endObserving();this.method.call(this.target,this.source,null,"[]",b,this.context);
this.beginObserving()}return this},objectPropertyDidChange:function(e,g,h,a){var f=this.context,i=this.method,c=SC.guidFor(e),b=this[c];
if(b&&!b.isIndexSet){b=this[c]=SC.IndexSet.create(b).freeze()}if(f){i.call(this.target,this.source,e,g,b,f,a)
}else{i.call(this.target,this.source,e,g,b,a)}}};sc_require("mixins/observable");
sc_require("mixins/enumerable");sc_require("system/range_observer");SC.OUT_OF_RANGE_EXCEPTION="Index out of range";
SC.Array={isSCArray:YES,replace:function(a,c,b){throw"replace() must be implemented to support SC.Array"
},objectAt:function(a){if(a<0){return undefined}if(a>=this.get("length")){return undefined
}return this.get(a)},"[]":function(a,b){if(b!==undefined){this.replace(0,this.get("length"),b)
}return this}.property(),insertAt:function(a,b){if(a>this.get("length")){throw SC.OUT_OF_RANGE_EXCEPTION
}this.replace(a,0,[b]);return this},removeAt:function(e,a){var c=0,b=[];if(typeof e===SC.T_NUMBER){if((e<0)||(e>=this.get("length"))){throw SC.OUT_OF_RANGE_EXCEPTION
}if(a===undefined){this.replace(e,1,b);return this}else{e=SC.IndexSet.create(e,a)
}}this.beginPropertyChanges();e.forEachRange(function(g,f){g-=c;c+=f;this.replace(g,f,b)
},this);this.endPropertyChanges();return this},removeObject:function(b){var c=this.get("length")||0;
while(--c>=0){var a=this.objectAt(c);if(a==b){this.removeAt(c)}}return this},removeObjects:function(a){this.beginPropertyChanges();
a.forEach(function(b){this.removeObject(b)},this);this.endPropertyChanges();return this
},pushObject:function(a){this.insertAt(this.get("length"),a);return a},pushObjects:function(a){this.beginPropertyChanges();
a.forEach(function(b){this.pushObject(b)},this);this.endPropertyChanges();return this
},popObject:function(){var a=this.get("length");if(a===0){return null}var b=this.objectAt(a-1);
this.removeAt(a-1);return b},shiftObject:function(){if(this.get("length")===0){return null
}var a=this.objectAt(0);this.removeAt(0);return a},unshiftObject:function(a){this.insertAt(0,a);
return a},unshiftObjects:function(a){this.beginPropertyChanges();a.forEach(function(b){this.unshiftObject(b)
},this);this.endPropertyChanges();return this},isEqual:function(a){if(!a){return false
}if(a==this){return true}var b=a.get("length");if(b!=this.get("length")){return false
}while(--b>=0){if(!SC.isEqual(a.objectAt(b),this.objectAt(b))){return false}}return true
},compact:function(){return this.without(null)},without:function(b){if(this.indexOf(b)<0){return this
}var a=[];this.forEach(function(c){if(c!==b){a[a.length]=c}});return a},uniq:function(){var a=[];
this.forEach(function(b){if(a.indexOf(b)<0){a[a.length]=b}});return a},rangeObserverClass:SC.RangeObserver,addRangeObserver:function(e,g,i,f){var a=this._array_rangeObservers;
if(!a){a=this._array_rangeObservers=SC.CoreSet.create()}if(this._array_oldLength===undefined){this._array_oldLength=this.get("length")
}var h=this.rangeObserverClass;var b=NO;var c=h.create(this,e,g,i,f,b);a.add(c);if(!this._array_isNotifyingRangeObservers){this._array_isNotifyingRangeObservers=YES;
this.addObserver("[]",this,this._array_notifyRangeObservers)}return c},updateRangeObserver:function(b,a){return b.update(this,a)
},removeRangeObserver:function(c){var b=c.destroy(this);var a=this._array_rangeObservers;
if(a){a.remove(c)}return b},enumerableContentDidChange:function(i,h,g){var a=this._array_rangeObservers,e=this._array_oldLength,f,c,b;
this.beginPropertyChanges();this.notifyPropertyChange("length");if(a&&a.length>0){if(e===undefined){e=0
}this._array_oldLength=f=this.get("length");if(i===undefined){i=0}if(g===undefined){g=f-e
}if(g!==0||h===undefined){c=f-i;if(g<0){c-=g}}else{c=h}b=this._array_rangeChanges;
if(!b){b=this._array_rangeChanges=SC.IndexSet.create()}b.add(i,c)}this.notifyPropertyChange("[]");
this.endPropertyChanges();return this},_array_notifyRangeObservers:function(){var c=this._array_rangeObservers,e=this._array_rangeChanges,b=c?c.length:0,a,f;
if(b>0&&e&&e.length>0){for(a=0;a<b;a++){c[a].rangeDidChange(e)}e.clear()}}};SC.mixin(Array.prototype,SC.Array);
SC.Array=SC.mixin({},SC.Enumerable,SC.Array);SC.Array.slice=function(b,e){var a=[];
var c=this.get("length");if(SC.none(b)){b=0}if(SC.none(e)||(e>c)){e=c}while(b<e){a[a.length]=this.objectAt(b++)
}return a};SC.Array.indexOf=function(e,c){var b,a=this.get("length");if(c===undefined){c=0
}else{c=(c<0)?Math.ceil(c):Math.floor(c)}if(c<0){c+=a}for(b=c;b<a;b++){if(this.objectAt(b)===e){return b
}}return -1};if(!Array.prototype.indexOf){Array.prototype.indexOf=SC.Array.indexOf
}SC.Array.lastIndexOf=function(e,c){var b,a=this.get("length");if(c===undefined){c=a-1
}else{c=(c<0)?Math.ceil(c):Math.floor(c)}if(c<0){c+=a}for(b=c;b>=0;b--){if(this.objectAt(b)===e){return b
}}return -1};if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=SC.Array.lastIndexOf
}(function(){SC.mixin(Array.prototype,{replace:function(e,h,g){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(!g||g.length===0){this.splice(e,h)}else{var f=[e,h].concat(g);this.splice.apply(this,f)
}var c=g?(g.get?g.get("length"):g.length):0;this.enumerableContentDidChange(e,h,c-h);
return this},unknownProperty:function(e,f){var c=this.reducedProperty(e,f);if((f!==undefined)&&c===undefined){c=this[e]=f
}return c}});var b=Array.prototype.indexOf;if(!b||(b===SC.Array.indexOf)){Array.prototype.indexOf=function(g,f){var e,c=this.length;
if(f===undefined){f=0}else{f=(f<0)?Math.ceil(f):Math.floor(f)}if(f<0){f+=c}for(e=f;
e<c;e++){if(this[e]===g){return e}}return -1}}var a=Array.prototype.lastIndexOf;if(!a||(a===SC.Array.lastIndexOf)){Array.prototype.lastIndexOf=function(g,f){var e,c=this.length;
if(f===undefined){f=c-1}else{f=(f<0)?Math.ceil(f):Math.floor(f)}if(f<0){f+=c}for(e=f;
e>=0;e--){if(this[e]===g){return e}}return -1}}})();SC.Comparable={isComparable:YES,compare:function(e,c){throw"%@.compare() is not implemented".fmt(this.toString())
}};SC.Copyable={isCopyable:YES,copy:function(){throw"%@.copy() is not implemented"
},frozenCopy:function(){var a=this.get?this.get("isFrozen"):this.isFrozen;if(a===YES){return this
}else{if(a===undefined){throw"%@ does not support freezing".fmt(this)}else{return this.copy().freeze()
}}}};SC.mixin(Array.prototype,SC.Copyable);Array.prototype.copy=Array.prototype.slice;
SC.DelegateSupport={delegateFor:function(c){var b=1,a=arguments.length,e;while(b<a){e=arguments[b];
if(e&&e[c]!==undefined){return e}b++}return(this[c]!==undefined)?this:null},invokeDelegateMethod:function(c,a,b){b=SC.A(arguments);
b=b.slice(2,b.length);if(!c||!c[a]){c=this}var e=c[a];return e?e.apply(c,b):null},getDelegateProperty:function(e,f){var b=1,a=arguments.length,c;
while(b<a){c=arguments[b++];if(c&&c[e]!==undefined){return c.get?c.get(e):c[e]}}return(this[e]!==undefined)?this.get(e):undefined
}};SC.FROZEN_ERROR=new Error("Cannot modify a frozen object");SC.Freezable={isFreezable:YES,isFrozen:NO,freeze:function(){if(this.set){this.set("isFrozen",YES)
}else{this.isFrozen=YES}return this}};SC.mixin(Array.prototype,SC.Freezable);sc_require("mixins/enumerable");
sc_require("mixins/observable");sc_require("mixins/freezable");sc_require("mixins/copyable");
SC.Set=SC.mixin({},SC.Enumerable,SC.Observable,SC.Freezable,{create:function(b){var c,a,e=SC.Set._pool,f=this.isObservable;
if(!f&&b===undefined&&e.length>0){c=e.pop()}else{c=SC.beget(this);if(f){c.initObservable()
}if(b&&b.isEnumerable&&b.get("length")>0){c.isObservable=NO;if(b.isSCArray){a=b.get?b.get("length"):b.length;
while(--a>=0){c.add(b.objectAt(a))}}else{if(b.isSet){a=b.length;while(--a>=0){c.add(b[a])
}}else{b.forEach(function(g){c.add(g)},this)}}c.isObservable=f}}return c},isSet:YES,length:0,firstObject:function(){return(this.length>0)?this[0]:undefined
}.property(),clear:function(){if(this.isFrozen){throw SC.FROZEN_ERROR}this.length=0;
return this},contains:function(b){if(b===null){return NO}var a=this[SC.hashFor(b)];
return(!SC.none(a)&&(a<this.length)&&(this[a]===b))},isEqual:function(a){if(!a||!a.isSet||(a.get("length")!==this.get("length"))){return NO
}var b=this.get("length");while(--b>=0){if(!a.contains(this[b])){return NO}}return YES
},add:function(e){if(this.isFrozen){throw SC.FROZEN_ERROR}if(e===null||e===undefined){return this
}var c=SC.hashFor(e);var b=this[c];var a=this.length;if((b===null||b===undefined)||(b>=a)||(this[b]!==e)){this[a]=e;
this[c]=a;this.length=a+1}if(this.isObservable){this.enumerableContentDidChange()
}return this},addEach:function(c){if(this.isFrozen){throw SC.FROZEN_ERROR}if(!c||!c.isEnumerable){throw"%@.addEach must pass enumerable".fmt(this)
}var a,b=this.isObservable;if(b){this.beginPropertyChanges()}if(c.isSCArray){a=c.get("length");
while(--a>=0){this.add(c.objectAt(a))}}else{if(c.isSet){a=c.length;while(--a>=0){this.add(c[a])
}}else{c.forEach(function(e){this.add(e)},this)}}if(b){this.endPropertyChanges()}return this
},remove:function(e){if(this.isFrozen){throw SC.FROZEN_ERROR}if(SC.none(e)){return this
}var c=SC.hashFor(e);var b=this[c];var a=this.length;if(SC.none(b)||(b>=a)||(this[b]!==e)){return this
}delete this[c];if(b<(a-1)){e=this[b]=this[a-1];this[SC.hashFor(e)]=b}this.length=a-1;
if(this.isObservable){this.enumerableContentDidChange()}return this},pop:function(){if(this.isFrozen){throw SC.FROZEN_ERROR
}var a=(this.length>0)?this[this.length-1]:null;if(a){this.remove(a)}return a},removeEach:function(c){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(!c||!c.isEnumerable){throw"%@.addEach must pass enumerable".fmt(this)}var a,b=this.isObservable;
if(b){this.beginPropertyChanges()}if(c.isSCArray){a=c.get("length");while(--a>=0){this.remove(c.objectAt(a))
}}else{if(c.isSet){a=c.length;while(--a>=0){this.remove(c[a])}}else{c.forEach(function(e){this.remove(e)
},this)}}if(b){this.endPropertyChanges()}return this},copy:function(){return this.constructor.create(this)
},destroy:function(){this.isFrozen=NO;if(!this.isObservable){SC.Set._pool.push(this.clear())
}return this},forEach:function(c,e){var b=this.length;if(!e){e=this}for(var a=0;a<b;
a++){c.call(e,this[a],a,this)}return this},toString:function(){var b=this.length,a,c=[];
for(a=0;a<b;a++){c[a]=this[a]}return"SC.Set<%@>".fmt(c.join(","))},_pool:[],isObservable:YES});
SC.Set.constructor=SC.Set;SC.Set.clone=SC.Set.copy;SC.Set.push=SC.Set.unshift=SC.Set.add;
SC.Set.shift=SC.Set.pop;SC.Set.addObject=SC.Set.add;SC.Set.removeObject=SC.Set.remove;
SC.Set._pool=[];SC.CoreSet=SC.beget(SC.Set);SC.CoreSet.isObservable=NO;SC.CoreSet.constructor=SC.CoreSet;
sc_require("core");sc_require("mixins/observable");sc_require("mixins/array");sc_require("system/set");
SC.BENCHMARK_OBJECTS=NO;SC._object_extend=function _object_extend(h,g){if(!g){throw"SC.Object.extend expects a non-null value.  Did you forget to 'sc_require' something?  Or were you passing a Protocol to extend() as if it were a mixin?"
}h._kvo_cloned=null;var z,o,v,f,i=h.concatenatedProperties,m=SC.K;var c,b;o=(i)?i.length:0;
var a=(o>0)?{}:null;while(--o>=0){z=i[o];c=h[z];b=g[z];if(c){if(!(c instanceof Array)){c=SC.$A(c)
}a[z]=(b)?c.concat(b):b}else{if(!(b instanceof Array)){b=SC.$A(b)}a[z]=b}}var y=h._bindings,n=NO;
var w=h._observers,x=NO;var j=h._properties,e=NO;var s,l,p;var u=h.outlets,t=NO;if(g.outlets){u=(u||SC.EMPTY_ARRAY).concat(g.outlets);
t=YES}for(z in g){if(z==="_kvo_cloned"){continue}if(!g.hasOwnProperty(z)){continue
}var q=(a.hasOwnProperty(z)?a[z]:null)||g[z];if(z.slice(-7)==="Binding"){if(!n){y=(y||SC.EMPTY_ARRAY).slice();
n=YES}if(y===null){y=(h._bindings||SC.EMPTY_ARRAY).slice()}y[y.length]=z}else{if(q&&(q instanceof Function)){if(!q.superclass&&(q!==(f=h[z]))){q.superclass=q.base=f||m
}if(q.propertyPaths){if(!x){w=(w||SC.EMPTY_ARRAY).slice();x=YES}w[w.length]=z}else{if(s=q.localPropertyPaths){l=s.length;
while(--l>=0){p=h._kvo_for(SC.keyFor("_kvo_local",s[l]),SC.Set);p.add(z);h._kvo_for("_kvo_observed_keys",SC.CoreSet).add(s[l])
}}else{if(q.dependentKeys){if(!e){j=(j||SC.EMPTY_ARRAY).slice();e=YES}j[j.length]=z
}else{if(q.autoconfiguredOutlet){if(!t){u=(u||SC.EMPTY_ARRAY).slice();t=YES}u[u.length]=z
}}}}}}h[z]=q}if(g.hasOwnProperty("toString")){z="toString";q=(a.hasOwnProperty(z)?a[z]:null)||g[z];
if(!q.superclass&&(q!==(f=h[z]))){q.superclass=q.base=f||m}h[z]=q}h._bindings=y||[];
h._observers=w||[];h._properties=j||[];h.outlets=u||[];return h};SC.Object=function(a){return this._object_init(a)
};SC.mixin(SC.Object,{mixin:function(b){var a=arguments.length,c;for(c=0;c<a;c++){SC.mixin(this,arguments[c])
}return this},superclass:null,extend:function(f){var e=SC.BENCHMARK_OBJECTS;if(e){SC.Benchmark.start("SC.Object.extend")
}var h,c=function(i){return this._object_init(i)};for(h in this){if(!this.hasOwnProperty(h)){continue
}c[h]=this[h]}if(this.hasOwnProperty("toString")){c.toString=this.toString}c.superclass=this;
SC.generateGuid(c);c.subclasses=SC.Set.create();this.subclasses.add(c);var g=(c.prototype=SC.beget(this.prototype));
var b,a=arguments.length;for(b=0;b<a;b++){SC._object_extend(g,arguments[b])}g.constructor=c;
if(e){SC.Benchmark.end("SC.Object.extend")}return c},create:function(a){var b=this;
return new b(arguments)},isClass:YES,subclasses:SC.Set.create(),toString:function(){return SC._object_className(this)
},subclassOf:function(b){if(this===b){return NO}var a=this;while(a=a.superclass){if(a===b){return YES
}}return NO},hasSubclass:function(a){return(a&&a.subclassOf)?a.subclassOf(this):NO
},kindOf:function(a){return(this===a)||this.subclassOf(a)}});SC.Object.prototype={_kvo_enabled:YES,_object_init:function(c){var b,a=(c)?c.length:0;
for(b=0;b<a;b++){SC._object_extend(this,c[b])}SC.generateGuid(this);this.init();var e=this.initMixin;
a=(e)?e.length:0;for(b=0;b<a;b++){e[b].call(this)}return this},mixin:function(){var b,a=arguments.length;
for(b=0;b<a;b++){SC.mixin(this,arguments[b])}for(b=0;b<a;b++){var c=arguments[b].initMixin;
if(c){c.call(this)}}return this},init:function(){this.initObservable();return this
},isDestroyed:NO,destroy:function(){if(this.get("isDestroyed")){return this}this.set("isDestroyed",YES);
var b,c=this.destroyMixin,a=(c)?c.length:0;for(b=0;b<a;b++){c[b].call(this)}return this
},isObject:true,respondsTo:function(a){return !!(SC.typeOf(this[a])===SC.T_FUNCTION)
},tryToPerform:function(b,c,a){return this.respondsTo(b)&&(this[b](c,a)!==NO)},superclass:function(b){var a=arguments.callee.caller;
if(!a){throw"superclass cannot determine the caller method"}return a.superclass?a.superclass.apply(this,arguments):null
},instanceOf:function(a){return this.constructor===a},kindOf:function(a){return this.constructor.kindOf(a)
},toString:function(){if(!this._object_toString){var a=SC._object_className(this.constructor);
var b="%@:%@".fmt(a,SC.guidFor(this));if(a){this._object_toString=b}else{return b
}}return this._object_toString},awake:function(a){this.outlets.forEach(function(b){this.get(b)
},this);this.bindings.invoke("sync")},invokeOnce:function(a){SC.RunLoop.currentRunLoop.invokeOnce(this,a);
return this},invokeLast:function(a){SC.RunLoop.currentRunLoop.invokeLast(this,a);
return this},concatenatedProperties:["concatenatedProperties","initMixin","destroyMixin"]};
SC.Object.prototype.constructor=SC.Object;SC.mixin(SC.Object.prototype,SC.Observable);
function findClassNames(){if(SC._object_foundObjectClassNames){return}SC._object_foundObjectClassNames=true;
var b=[];var a=function(c,e,h){h--;if(b.indexOf(e)>=0){return}b.push(e);for(var f in e){if(f=="__scope__"){continue
}if(f=="superclass"){continue}if(!f.match(/^[A-Z0-9]/)){continue}var i=(c)?[c,f].join("."):f;
var g=e[f];switch(SC.typeOf(g)){case SC.T_CLASS:if(!g._object_className){g._object_className=i
}if(h>=0){a(i,g,h)}break;case SC.T_OBJECT:if(h>=0){a(i,g,h)}break;case SC.T_HASH:if(((c)||(i==="SC"))&&(h>=0)){a(i,g,h)
}break;default:break}}};a(null,window,2)}SC.instanceOf=function(a,b){return !!(a&&a.constructor===b)
};SC.kindOf=function(a,b){if(a&&!a.isClass){a=a.constructor}return !!(a&&a.kindOf&&a.kindOf(b))
};SC._object_className=function(b){if(!SC.isReady){return""}if(!b._object_className){findClassNames()
}if(b._object_className){return b._object_className}var a=b;while(a&&!a._object_className){a=a.superclass
}return(a&&a._object_className)?a._object_className:"Anonymous"};require("system/object");
SC._ChainObserver=function(a){this.property=a};SC._ChainObserver.createChain=function(e,l,g,a,b){var c=l.split("."),i=new SC._ChainObserver(c[0]),h=i,f=c.length;
for(var j=1;j<f;j++){h=h.next=new SC._ChainObserver(c[j])}i.objectDidChange(e);h.target=g;
h.method=a;h.context=b;return i};SC._ChainObserver.prototype={isChainObserver:true,object:null,property:null,next:null,target:null,method:null,objectDidChange:function(a){if(a===this.object){return
}if(this.object&&this.object.removeObserver){this.object.removeObserver(this.property,this,this.propertyDidChange)
}this.object=a;if(this.object&&this.object.addObserver){this.object.addObserver(this.property,this,this.propertyDidChange)
}this.propertyDidChange()},propertyDidChange:function(){var b=this.object;var f=this.property;
var e=(b&&b.get)?b.get(f):null;if(this.next){this.next.objectDidChange(e)}var g=this.target,h=this.method,c=this.context;
if(g&&h){var a=b?b.propertyRevision:null;if(c){h.call(g,b,f,e,c,a)}else{h.call(g,b,f,e,a)
}}},destroyChain:function(){var a=this.object;if(a&&a.removeObserver){a.removeObserver(this.property,this,this.propertyDidChange)
}if(this.next){this.next.destroyChain()}this.next=this.target=this.method=this.object=this.context=null;
return null}};sc_require("mixins/observable");sc_require("system/set");SC.Observers={queue:[],addObserver:function(c,e,f,b){var a;
if(SC.typeOf(c)===SC.T_STRING){a=SC.tupleForPropertyPath(c,b)}else{a=c}if(a){a[0].addObserver(a[1],e,f)
}else{this.queue.push([c,e,f,b])}},removeObserver:function(g,h,i,e){var c,b,a,f;a=SC.tupleForPropertyPath(g,e);
if(a){a[0].removeObserver(a[1],h,i)}c=this.queue.length;b=this.queue;while(--c>=0){f=b[c];
if((f[0]===g)&&(f[1]===h)&&(f[2]==i)&&(f[3]===e)){b[c]=null}}},addPendingRangeObserver:function(a){var b=this.rangeObservers;
if(!b){b=this.rangeObservers=SC.CoreSet.create()}b.add(a);return this},_TMP_OUT:[],flush:function(a){var f=this.queue;
if(f&&f.length>0){var i=(this.queue=[]);var j=f.length;while(--j>=0){var l=f[j];if(!l){continue
}var g=SC.tupleForPropertyPath(l[0],l[3]);if(g){g[0].addObserver(g[1],l[1],l[2])}else{i.push(l)
}}}if(a._kvo_needsRangeObserver){var h=this.rangeObservers,e=h?h.get("length"):0,b=this._TMP_OUT,c;
for(j=0;j<e;j++){c=h[j];if(c.setupPending(a)){b.push(c)}}if(b.length>0){h.removeEach(b)
}b.length=0;a._kvo_needsRangeObserver=NO}},isObservingSuspended:0,_pending:SC.CoreSet.create(),objectHasPendingChanges:function(a){this._pending.add(a)
},suspendPropertyObserving:function(){this.isObservingSuspended++},resumePropertyObserving:function(){var c;
if(--this.isObservingSuspended<=0){c=this._pending;this._pending=SC.CoreSet.create();
var b,a=c.length;for(b=0;b<a;b++){c[b]._notifyPropertyObservers()}c.clear();c=null
}}};sc_require("system/object");SC.LOG_BINDINGS=NO;SC.BENCHMARK_BINDING_NOTIFICATIONS=NO;
SC.BENCHMARK_BINDING_SETUP=NO;SC.MULTIPLE_PLACEHOLDER="@@MULT@@";SC.NULL_PLACEHOLDER="@@NULL@@";
SC.EMPTY_PLACEHOLDER="@@EMPTY@@";SC.Binding={beget:function(b){var a=SC.beget(this);
a.parentBinding=this;if(b!==undefined){a=a.from(b)}return a},builder:function(){var b=this,a=function(c){return b.beget().from(c)
};a.beget=function(){return b.beget()};return a},from:function(b,a){if(!b){return this
}var c=(this===SC.Binding)?this.beget():this;c._fromPropertyPath=b;c._fromRoot=a;
c._fromTuple=null;return c},to:function(b,a){var c=(this===SC.Binding)?this.beget():this;
c._toPropertyPath=b;c._toRoot=a;c._toTuple=null;return c},connect:function(){if(this.isConnected){return this
}this.isConnected=YES;this._connectionPending=YES;this._syncOnConnect=YES;SC.Binding._connectQueue.add(this);
return this},_connect:function(){if(!this._connectionPending){return}this._connectionPending=NO;
var c,a,b=SC.BENCHMARK_BINDING_SETUP;if(b){SC.Benchmark.start("SC.Binding.connect()")
}c=this._fromPropertyPath;a=this._fromRoot;if(SC.typeOf(c)===SC.T_STRING){if(c.indexOf(".")===0){c=c.slice(1);
if(!a){a=this._toRoot}}else{if(c.indexOf("*")===0){c=[this._fromRoot||this._toRoot,c.slice(1)];
a=null}}}SC.Observers.addObserver(c,this,this.fromPropertyDidChange,a);if(!this._oneWay){c=this._toPropertyPath;
a=this._toRoot;SC.Observers.addObserver(c,this,this.toPropertyDidChange,a)}if(b){SC.Benchmark.end("SC.Binding.connect()")
}if(this._syncOnConnect){this._syncOnConnect=NO;if(b){SC.Benchmark.start("SC.Binding.connect().sync")
}this.sync();if(b){SC.Benchmark.end("SC.Binding.connect().sync")}}},disconnect:function(){if(!this.isConnected){return this
}if(this._connectionPending){this._connectionPending=NO}else{SC.Observers.removeObserver(this._fromPropertyPath,this,this.fromPropertyDidChange,this._fromRoot);
if(!this._oneWay){SC.Observers.removeObserver(this._toPropertyPath,this,this.toPropertyDidChange,this._toRoot)
}}this.isConnected=NO;return this},fromPropertyDidChange:function(c,b){var a=c?c.get(b):null;
if(a!==this._bindingValue){this._setBindingValue(c,b);this._changePending=YES;SC.Binding._changeQueue.add(this)
}},toPropertyDidChange:function(c,b){if(this._oneWay){return}var a=c.get(b);if(a!==this._transformedBindingValue){this._setBindingValue(c,b);
this._changePending=YES;SC.Binding._changeQueue.add(this)}},_setBindingValue:function(b,a){this._bindingSource=b;
this._bindingKey=a},_computeBindingValue:function(){var h=this._bindingSource,f=this._bindingKey,c,b;
if(!h){return}this._bindingValue=c=h.getPath(f);var g=this._transforms;if(g){var a=g.length,e;
for(b=0;b<a;b++){e=g[b];c=e(c,this)}}if(this._noError&&SC.typeOf(c)===SC.T_ERROR){c=null
}this._transformedBindingValue=c},_connectQueue:SC.CoreSet.create(),_alternateConnectQueue:SC.CoreSet.create(),_changeQueue:SC.CoreSet.create(),_alternateChangeQueue:SC.CoreSet.create(),_changePending:NO,flushPendingChanges:function(){if(this._isFlushing){return NO
}this._isFlushing=YES;SC.Observers.suspendPropertyObserving();var b=NO,c=SC.LOG_BINDINGS,a,e;
while((a=this._connectQueue).length>0){this._connectQueue=this._alternateConnectQueue;
this._alternateConnectQueue=a;while(e=a.pop()){e._connect()}}while((a=this._changeQueue).length>0){if(c){console.log("Begin: Trigger changed bindings")
}b=YES;this._changeQueue=this._alternateChangeQueue;this._alternateChangeQueue=a;
while(e=a.pop()){e.applyBindingValue()}if(c){console.log("End: Trigger changed bindings")
}}this._isFlushing=NO;SC.Observers.resumePropertyObserving();return b},applyBindingValue:function(){this._changePending=NO;
this._computeBindingTargets();this._computeBindingValue();var a=this._bindingValue,b=this._transformedBindingValue,c=SC.BENCHMARK_BINDING_NOTIFICATIONS,e=SC.LOG_BINDINGS;
if(!this._oneWay&&this._fromTarget){if(e){console.log("%@: %@ -> %@".fmt(this,a,b))
}if(c){SC.Benchmark.start(this.toString()+"->")}this._fromTarget.setPathIfChanged(this._fromPropertyKey,a);
if(c){SC.Benchmark.end(this.toString()+"->")}}if(this._toTarget){if(e){console.log("%@: %@ <- %@".fmt(this,a,b))
}if(c){SC.Benchmark.start(this.toString()+"<-")}this._toTarget.setPathIfChanged(this._toPropertyKey,b);
if(c){SC.Benchmark.start(this.toString()+"<-")}}},sync:function(){if(!this.isConnected){return this
}if(this._connectionPending){this._syncOnConnect=YES}else{this._computeBindingTargets();
var c=this._fromTarget,b=this._fromPropertyKey;if(!c||!b){return this}var a=c.getPath(b);
if(a!==this._bindingValue){this._setBindingValue(c,b);this._changePending=YES;SC.Binding._changeQueue.add(this)
}}return this},_syncOnConnect:NO,_computeBindingTargets:function(){if(!this._fromTarget){var c,b,a;
c=this._fromPropertyPath;b=this._fromRoot;if(SC.typeOf(c)===SC.T_STRING){if(c.indexOf(".")===0){c=c.slice(1);
if(!b){b=this._toRoot}}else{if(c.indexOf("*")===0){c=[b||this._toRoot,c.slice(1)];
b=null}}}a=SC.tupleForPropertyPath(c,b);if(a){this._fromTarget=a[0];this._fromPropertyKey=a[1]
}}if(!this._toTarget){c=this._toPropertyPath;b=this._toRoot;a=SC.tupleForPropertyPath(c,b);
if(a){this._toTarget=a[0];this._toPropertyKey=a[1]}}},oneWay:function(c,a){if((a===undefined)&&(SC.typeOf(c)===SC.T_BOOL)){a=c;
c=null}var b=this.from(c);if(b===SC.Binding){b=b.beget()}b._oneWay=(a===undefined)?YES:a;
return b},transform:function(b){var c=(this===SC.Binding)?this.beget():this;var a=c._transforms;
if(a&&(a===c.parentBinding._transform)){a=c._transforms=a.slice()}if(!a){a=c._transforms=[]
}a.push(b);return c},resetTransforms:function(){var a=(this===SC.Binding)?this.beget():this;
a._transforms=null;return a},noError:function(c,a){if((a===undefined)&&(SC.typeOf(c)===SC.T_BOOL)){a=c;
c=null}var b=this.from(c);if(b===SC.Binding){b=b.beget()}b._noError=(a===undefined)?YES:a;
return b},single:function(b,a){if(a===undefined){a=SC.MULTIPLE_PLACEHOLDER}return this.from(b).transform(function(f,e){if(f&&f.isEnumerable){var c=f.get("length");
f=(c>1)?a:(c<=0)?null:f.firstObject()}return f})},notEmpty:function(b,a){if(a===undefined){a=SC.EMPTY_PLACEHOLDER
}return this.from(b).transform(function(e,c){if(SC.none(e)||(e==="")||(SC.isArray(e)&&e.length===0)){e=a
}return e})},notNull:function(b,a){if(a===undefined){a=SC.EMPTY_PLACEHOLDER}return this.from(b).transform(function(e,c){if(SC.none(e)){e=a
}return e})},multiple:function(a){return this.from(a).transform(function(b){if(!SC.isArray(b)){b=(b==null)?[]:[b]
}return b})},bool:function(a){return this.from(a).transform(function(b){var c=SC.typeOf(b);
if(c===SC.T_ERROR){return b}return(c==SC.T_ARRAY)?(b.length>0):(b==="")?NO:!!b})},not:function(a){return this.from(a).transform(function(b){var c=SC.typeOf(b);
if(c===SC.T_ERROR){return b}return !((c==SC.T_ARRAY)?(b.length>0):(b==="")?NO:!!b)
})},isNull:function(a){return this.from(a).transform(function(b){var c=SC.typeOf(b);
return(c===SC.T_ERROR)?b:SC.none(b)})},toString:function(){var c=this._fromRoot?"<%@>:%@".fmt(this._fromRoot,this._fromPropertyPath):this._fromPropertyPath;
var b=this._toRoot?"<%@>:%@".fmt(this._toRoot,this._toPropertyPath):this._toPropertyPath;
var a=this._oneWay?"[oneWay]":"";return"SC.Binding%@(%@ -> %@)%@".fmt(SC.guidFor(this),c,b,a)
}};SC.binding=function(b,a){return SC.Binding.from(b,a)};SC.Cookie=SC.Object.extend({name:null,value:"",expires:null,path:null,domain:null,secure:NO,isCookie:YES,destroy:function(){this.set("expires",-1);
this.write();arguments.callee.base.apply(this,arguments)},write:function(){var b=this.get("name"),j=this.get("value"),c=this.get("expires"),m=this.get("path"),f=this.get("domain"),a=this.get("secure");
var i="";if(c&&(SC.typeOf(c)===SC.T_NUMBER||(SC.DateTime&&c.get&&c.get("milliseconds"))||SC.typeOf(c.toUTCString)===SC.T_FUNCTION)){var e;
if(SC.typeOf(c)===SC.T_NUMBER){e=new Date();e.setTime(e.getTime()+(c*24*60*60*1000))
}else{if(SC.DateTime&&c.get&&c.get("milliseconds")){e=new Date(c.get("milliseconds"))
}else{if(SC.typeOf(c.toUTCString)===SC.T_FUNCTION){e=c}}}if(e){i="; expires="+e.toUTCString()
}}var l=m?"; path="+m:"";var h=f?"; domain="+f:"";var g=a?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),i,l,h,g].join("");
return this}});SC.Cookie.mixin({find:function(a){if(document.cookie&&document.cookie!=""){var e=document.cookie.split(";");
for(var c=0;c<e.length;c++){var b=String(e[c]).trim();if(b.substring(0,a.length+1)===(a+"=")){return SC.Cookie.create({name:a,value:decodeURIComponent(b.substring(a.length+1))})
}}}return null}});SC.Error=SC.Object.extend({code:-1,message:"",errorValue:null,errorObject:function(){return this
}.property().cacheable(),label:null,toString:function(){return"SC.Error:%@:%@ (%@)".fmt(SC.guidFor(this),this.get("message"),this.get("code"))
},isError:YES});SC.Error.desc=function(e,a,f,c){var b={message:e};if(a!==undefined){b.label=a
}if(c!==undefined){b.code=c}if(f!==undefined){b.errorValue=f}return this.create(b)
};SC.$error=function(b,a,e,f){return SC.Error.desc(b,a,e,f)};SC.ok=function(a){return(a!==false)&&!(a&&a.isError)
};SC.$ok=SC.ok;SC.val=function(a){if(a&&a.isError){return a.get?a.get("errorValue"):null
}else{return a}};SC.$val=SC.val;SC.Error.HAS_MULTIPLE_VALUES=-100;sc_require("mixins/enumerable");
sc_require("mixins/observable");sc_require("mixins/freezable");sc_require("mixins/copyable");
SC.IndexSet=SC.mixin({},SC.Enumerable,SC.Observable,SC.Freezable,SC.Copyable,{_sc_sliceContent:function(f){if(f.length<1000){return f.slice()
}var e=0,a=[],b=f[0];while(b!==0){a[e]=b;e=(b<0)?(0-b):b;b=f[e]}a[e]=0;this._hint(0,e,a);
return a},create:function(c,b){var a=SC.beget(this);a.initObservable();if(c&&c.isIndexSet){a._content=this._sc_sliceContent(c._content);
a.max=c.max;a.length=c.length;a.source=c.source}else{a._content=[0];if(c!==undefined){a.add(c,b)
}}return a},isIndexSet:YES,HINT_SIZE:256,length:0,max:0,min:function(){var a=this._content,b=a[0];
return(b===0)?-1:(b>0)?0:Math.abs(b)}.property("[]").cacheable(),firstObject:function(){return(this.get("length")>0)?this.get("min"):undefined
}.property(),rangeStartForIndex:function(c){var g=this._content,a=this.get("max"),b,f,e;
if(c>=a){return a}if(Math.abs(g[c])>c){return c}e=c-(c%SC.IndexSet.HINT_SIZE);b=g[e];
if(b<0||b>c){b=e}f=Math.abs(g[b]);while(f<c){b=f;f=Math.abs(g[b])}return b},isEqual:function(c){if(c===this){return YES
}if(!c||!c.isIndexSet||(c.max!==this.max)||(c.length!==this.length)){return NO}var f=this._content,b=c._content,e=0,a=f[e];
do{if(b[e]!==a){return NO}e=Math.abs(a);a=f[e]}while(e!==0);return YES},indexBefore:function(b){if(b===0){return -1
}b--;var c=this._content,a=this.get("max"),e=this.rangeStartForIndex(b);if(!c){return null
}while((e===a)||(c[e]<0)){if(e===0){return -1}b=e-1;e=this.rangeStartForIndex(b)}return b
},indexAfter:function(b){var e=this._content,a=this.get("max"),f,c;if(!e||(b>=a)){return -1
}b++;f=this.rangeStartForIndex(b);c=e[f];while(c<0){if(c===0){return -1}b=f=Math.abs(c);
c=e[f]}return b},contains:function(h,c){var b,g,a,f,e;if(c===undefined){if(h===null||h===undefined){return NO
}if(typeof h===SC.T_NUMBER){c=1}else{if(h&&h.isIndexSet){if(h===this){return YES}b=h._content;
g=0;a=b[g];while(a!==0){if((a>0)&&!this.contains(g,a-g)){return NO}g=Math.abs(a);
a=b[g]}return YES}else{c=h.length;h=h.start}}}f=this.rangeStartForIndex(h);e=this._content[f];
return(e>0)&&(f<=h)&&(e>=(h+c))},intersects:function(g,c){var b,f,a,e;if(c===undefined){if(typeof g===SC.T_NUMBER){c=1
}else{if(g&&g.isIndexSet){if(g===this){return YES}b=g._content;f=0;a=b[f];while(a!==0){if((a>0)&&this.intersects(f,a-f)){return YES
}f=Math.abs(a);a=b[f]}return NO}else{c=g.length;g=g.start}}}f=this.rangeStartForIndex(g);
b=this._content;a=b[f];e=g+c;while(f<e){if(a===0){return NO}if((a>0)&&(a>g)){return YES
}f=Math.abs(a);a=b[f]}return NO},without:function(b,a){if(b===this){return SC.IndexSet.create()
}return this.clone().remove(b,a)},replace:function(c,a){if(a===undefined){if(typeof c===SC.T_NUMBER){a=1
}else{if(c&&c.isIndexSet){this._content=this._sc_sliceContent(c._content);this.beginPropertyChanges().set("max",c.max).set("length",c.length).set("source",c.source).enumerableContentDidChange().endPropertyChanges();
return this}else{a=c.length;c=c.start}}}var b=this.length;this._content.length=1;
this._content[0]=0;this.length=this.max=0;return this.add(c,a)},add:function(a,b){if(this.isFrozen){throw SC.FROZEN_ERROR
}var f,j,e;if(a&&a.isIndexSet){f=a._content;if(!f){return this}j=0;e=f[0];while(e!==0){if(e>0){this.add(j,e-j)
}j=e<0?0-e:e;e=f[j]}return this}else{if(b===undefined){if(a===null||a===undefined){return this
}else{if(typeof a===SC.T_NUMBER){b=1}else{b=a.length;a=a.start}}}else{if(b===null){b=1
}}}if(b<=0){return this}var g=this.get("max"),c=g,i,h;f=this._content;if(a===g){if(a>0){j=this.rangeStartForIndex(a-1);
e=f[j];if(e>0){delete f[g];f[j]=g=a+b;a=j}else{f[g]=g=a+b}}else{f[a]=g=b}f[g]=0;this.set("max",g);
this.set("length",this.length+b);b=g-a}else{if(a>g){f[g]=0-a;f[a]=a+b;f[a+b]=0;this.set("max",a+b);
this.set("length",this.length+b);b=a+b-g;a=g}else{j=this.rangeStartForIndex(a);e=f[j];
g=a+b;i=0;if((a>0)&&(j===a)&&(e<=0)){j=this.rangeStartForIndex(a-1);e=f[j]}if(e<0){f[j]=0-a;
if(Math.abs(e)>g){f[a]=0-g;f[g]=e}else{f[a]=e}}else{a=j;if(e>g){g=e}}j=a;while(j<g){h=f[j];
if(h===0){f[g]=0;e=g;i+=g-j}else{e=Math.abs(h);if(e>g){f[g]=h;e=g}if(h<0){i+=e-j}}delete f[j];
j=e}if((j=f[g])>0){delete f[g];g=j}f[a]=g;if(g>c){this.set("max",g)}this.set("length",this.get("length")+i);
b=g-a}}this._hint(a,b);if(i!==0){this.enumerableContentDidChange()}return this},remove:function(a,b){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(b===undefined){if(a===null||a===undefined){return this}else{if(typeof a===SC.T_NUMBER){b=1
}else{if(a.isIndexSet){a.forEachRange(this.remove,this);return this}else{b=a.length;
a=a.start}}}}if(b<=0){return this}var g=this.get("max"),c=g,f=this._content,l,e,j,h,i;
if(a>=g){return this}l=this.rangeStartForIndex(a);e=f[l];i=a+b;j=0;if((a>0)&&(l===a)&&(e>0)){l=this.rangeStartForIndex(a-1);
e=f[l]}if(e>0){f[l]=a;if(e>i){f[a]=i;f[i]=e}else{f[a]=e}}else{a=l;e=Math.abs(e);if(e>i){i=e
}}l=a;while(l<i){h=f[l];if(h===0){f[i]=0;e=i}else{e=Math.abs(h);if(e>i){f[i]=h;e=i
}if(h>0){j+=e-l}}delete f[l];l=e}if((l=f[i])<0){delete f[i];i=Math.abs(l)}if(f[i]===0){delete f[i];
f[a]=0;this.set("max",a)}else{f[a]=0-i}this.set("length",this.get("length")-j);b=i-a;
this._hint(a,b);if(j!==0){this.enumerableContentDidChange()}return this},_hint:function(h,e,c){if(c===undefined){c=this._content
}var b=SC.IndexSet.HINT_SIZE,a=Math.abs(c[h]),g=h-(h%b)+b,f=h+e;while(g<f){while((a!==0)&&(a<=g)){h=a;
a=Math.abs(c[h])}if(a===0){delete c[g]}else{if(g!==h){c[g]=h}}g+=b}},clear:function(){if(this.isFrozen){throw SC.FROZEN_ERROR
}var a=this.length;this._content.length=1;this._content[0]=0;this.set("length",0).set("max",0);
if(a>0){this.enumerableContentDidChange()}},addEach:function(b){if(this.isFrozen){throw SC.FROZEN_ERROR
}this.beginPropertyChanges();var a=b.get("length");if(b.isSCArray){while(--a>=0){this.add(b.objectAt(a))
}}else{if(b.isEnumerable){b.forEach(function(c){this.add(c)},this)}}this.endPropertyChanges();
return this},removeEach:function(b){if(this.isFrozen){throw SC.FROZEN_ERROR}this.beginPropertyChanges();
var a=b.get("length");if(b.isSCArray){while(--a>=0){this.remove(b.objectAt(a))}}else{if(b.isEnumerable){b.forEach(function(c){this.remove(c)
},this)}}this.endPropertyChanges();return this},clone:function(){return SC.IndexSet.create(this)
},inspect:function(){var f=this._content,b=f.length,a=0,c=[],e;for(a=0;a<b;a++){e=f[a];
if(e!==undefined){c.push("%@:%@".fmt(a,e))}}return"SC.IndexSet<%@>".fmt(c.join(" , "))
},forEachRange:function(g,e){var b=this._content,f=0,a=b[f],c=this.source;if(e===undefined){e=null
}while(a!==0){if(a>0){g.call(e,f,a-f,this,c)}f=Math.abs(a);a=b[f]}return this},forEachIn:function(b,c,l,g){var h=this._content,j=0,i=0,e=b+c,a=this.source,f=h[j];
if(g===undefined){g=null}while(f!==0){if(j<b){j=b}while((j<f)&&(j<e)){l.call(g,j++,i++,this,a)
}if(j>=e){j=f=0}else{j=Math.abs(f);f=h[j]}}return this},lengthIn:function(h,e){var a=0;
if(e===undefined){if(h===null||h===undefined){return 0}else{if(typeof h===SC.T_NUMBER){e=1
}else{if(h.isIndexSet){h.forEachRange(function(j,i){a+=this.lengthIn(j,i)},this);
return a}else{e=h.length;h=h.start}}}}if(this.get("length")===0){return 0}var c=this._content,g=0,b=c[g],f=h+e;
while(g<f&&b!==0){if(b>0){a+=(b>f)?f-g:b-g}g=Math.abs(b);b=c[g]}return a},source:null,indexOf:function(e,c){var g=this.source;
if(!g){throw"%@.indexOf() requires source".fmt(this)}var b=g.get("length"),f=this._content,h=f[0]<0?Math.abs(f[0]):0,a;
while(h>=0&&h<b){a=g.indexOf(e,h);if(a<0){return -1}if(this.contains(a)){return a
}h=a+1}return -1},lastIndexOf:function(e,c){var f=this.source;if(!f){throw"%@.lastIndexOf() requires source".fmt(this)
}var b=f.get("length"),g=this.max-1,a;if(g>=b){g=b-1}while(g>=0){a=f.lastIndexOf(e,g);
if(a<0){return -1}if(this.contains(a)){return a}g=a+1}return -1},forEachObject:function(h,f){var e=this.source;
if(!e){throw"%@.forEachObject() requires source".fmt(this)}var c=this._content,g=0,a=0,b=c[g];
if(f===undefined){f=null}while(b!==0){while(g<b){h.call(f,e.objectAt(g),g,e,this);
g++}g=Math.abs(b);b=c[g]}return this},addObject:function(c,e){var f=this.source;if(!f){throw"%@.addObject() requires source".fmt(this)
}var b=f.get("length"),g=0,a;while(g>=0&&g<b){a=f.indexOf(c,g);if(a>=0){this.add(a);
if(e){return this}g=a++}else{return this}}return this},addObjects:function(b,a){b.forEach(function(c){this.addObject(c,a)
},this);return this},removeObject:function(c,e){var f=this.source;if(!f){throw"%@.removeObject() requires source".fmt(this)
}var b=f.get("length"),g=0,a;while(g>=0&&g<b){a=f.indexOf(c,g);if(a>=0){this.remove(a);
if(e){return this}g=a+1}else{return this}}return this},removeObjects:function(b,a){b.forEach(function(c){this.removeObject(c,a)
},this);return this},LOG_OBSERVING:NO,forEach:function(h,f){var c=this._content,g=0,a=0,e=this.source,b=c[g];
if(f===undefined){f=null}while(b!==0){while(g<b){h.call(f,g++,a++,this,e)}g=Math.abs(b);
b=c[g]}return this},nextObject:function(g,b,c){var f=this._content,e=c.next,a=this.get("max");
if(b===null){b=e=0}else{if(b>=a){delete c.next;return null}else{b++}}if(b===e){do{b=Math.abs(e);
e=f[b]}while(e<0);c.next=e}return b},toString:function(){var a=[];this.forEachRange(function(c,b){a.push(b===1?c:"%@..%@".fmt(c,c+b-1))
},this);return"SC.IndexSet<%@>".fmt(a.join(","))},max:0});SC.IndexSet.slice=SC.IndexSet.copy=SC.IndexSet.clone;
SC.IndexSet.EMPTY=SC.IndexSet.create().freeze();SC.LOGGER_LOG_DELIMITER=", ";SC.LOGGER_LOG_ERROR="ERROR: ";
SC.LOGGER_LOG_INFO="INFO: ";SC.LOGGER_LOG_WARN="WARNING: ";SC.LOGGER_LOG_DEBUG="DEBUG: ";
SC.Logger=SC.Object.create({debugEnabled:NO,exists:function(){return typeof(this.get("reporter"))!=="undefined"&&this.get("reporter")!=null
}.property("reporter").cacheable(),fallBackOnAlert:NO,fallBackOnLog:YES,format:YES,reporter:console,log:function(){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.log)==="function"){if(this.get("format")){a.log(this._argumentsToString.apply(this,arguments))
}else{a.log.apply(a,arguments)}return true}else{if(this.fallBackOnAlert){var b=this.get("format")?this._argumentsToString.apply(this,arguments):arguments;
if(this.get("exists")&&typeof(a.alert)==="function"){a.alert(b)}else{alert(b)}return true
}}return false},debug:function(){var c=this.get("reporter");if(this.get("debugEnabled")!==YES){return false
}if(this.get("exists")&&(typeof c.debug==="function")){c.debug.apply(c,arguments);
return true}else{if(this.fallBackOnLog){var b=this._argumentsToArray(arguments);if(typeof(b.unshift)==="function"){b.unshift(SC.LOGGER_LOG_DEBUG)
}return this.log.apply(this,b)}}return false},dir:function(){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.dir)==="function"){a.dir.apply(a,arguments);return true
}return(this.fallBackOnLog)?this.log.apply(this,arguments):false},dirxml:function(){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.dirxml)==="function"){a.dirxml.apply(a,arguments);
return true}return(this.fallBackOnLog)?this.log.apply(this,arguments):false},error:function(){var c=this.get("reporter");
if(this.get("exists")&&typeof(c.error)==="function"){c.error.apply(c,arguments);return true
}else{if(this.fallBackOnLog){var b=this._argumentsToArray(arguments);if(typeof(b.unshift)==="function"){b.unshift(SC.LOGGER_LOG_ERROR)
}return this.log.apply(this,b)}}return false},group:function(b){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.group)==="function"){a.group(b);return true}return false
},groupEnd:function(){var a=this.get("reporter");if(this.get("exists")&&typeof(a.groupEnd)==="function"){a.groupEnd();
return true}return false},info:function(){var c=this.get("reporter");if(this.get("exists")&&typeof(c.info)==="function"){c.info.apply(c,arguments);
return true}else{if(this.fallBackOnLog){var b=this._argumentsToArray(arguments);if(typeof(b.unshift)==="function"){b.unshift(SC.LOGGER_LOG_INFO)
}return this.log.apply(this,b)}}return false},profile:function(){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.profile)==="function"){a.profile();return true}return false
},profileEnd:function(){var a=this.get("reporter");if(this.get("exists")&&typeof(a.profileEnd)==="function"){a.profileEnd();
return true}return false},time:function(b){var a=this.get("reporter");if(this.get("exists")&&typeof(a.time)==="function"){a.time(b);
return true}return false},timeEnd:function(b){var a=this.get("reporter");if(this.get("exists")&&typeof(a.timeEnd)==="function"){a.timeEnd(b);
return true}return false},trace:function(){var a=this.get("reporter");if(this.get("exists")&&typeof(a.trace)==="function"){a.trace();
return true}return false},warn:function(){var c=this.get("reporter");if(this.get("exists")&&typeof(c.warn)==="function"){c.warn.apply(c,arguments);
return true}else{if(this.fallBackOnLog){var b=this._argumentsToArray(arguments);if(typeof(b.unshift)==="function"){b.unshift(SC.LOGGER_LOG_WARN)
}return this.log.apply(this,b)}}return false},_argumentsToArray:function(e){if(!e){return[]
}var b=[];for(var c=0;c<e.length;c++){b[c]=e[c]}return b},_argumentsToString:function(){var b="";
for(var a=0;a<arguments.length-1;a++){b+=arguments[a]+SC.LOGGER_LOG_DELIMITER}b+=arguments[arguments.length-1];
return b}});sc_require("private/observer_set");SC.RunLoop=SC.Object.extend({beginRunLoop:function(){this._start=new Date().getTime();
if(SC.LOG_BINDINGS||SC.LOG_OBSERVERS){console.log("-- SC.RunLoop.beginRunLoop at %@".fmt(this._start))
}return this},endRunLoop:function(){var a;if(SC.LOG_BINDINGS||SC.LOG_OBSERVERS){console.log("-- SC.RunLoop.endRunLoop ~ flushing application queues")
}do{a=this.flushApplicationQueues();if(!a){a=this._flushinvokeLastQueue()}}while(a);
this._start=null;if(SC.LOG_BINDINGS||SC.LOG_OBSERVERS){console.log("-- SC.RunLoop.endRunLoop ~ End")
}return this},invokeOnce:function(a,b){if(b===undefined){b=a;a=this}if(SC.typeOf(b)===SC.T_STRING){b=a[b]
}if(!this._invokeQueue){this._invokeQueue=SC.ObserverSet.create()}this._invokeQueue.add(a,b);
return this},invokeLast:function(a,b){if(b===undefined){b=a;a=this}if(SC.typeOf(b)===SC.T_STRING){b=a[b]
}if(!this._invokeLastQueue){this._invokeLastQueue=SC.ObserverSet.create()}this._invokeLastQueue.add(a,b);
return this},flushApplicationQueues:function(){var b=NO;var a=this._invokeQueue;if(a&&a.targets>0){this._invokeQueue=null;
b=YES;a.invokeMethods()}return SC.Binding.flushPendingChanges()||b},_flushinvokeLastQueue:function(){var a=this._invokeLastQueue,b=NO;
if(a&&a.targets>0){this._invokeLastQueue=null;b=YES;if(b){a.invokeMethods()}}return b
}});SC.RunLoop.currentRunLoop=null;SC.RunLoop.runLoopClass=SC.RunLoop;SC.RunLoop.begin=function(){var a=this.currentRunLoop;
if(!a){a=this.currentRunLoop=this.runLoopClass.create()}a.beginRunLoop();return this
};SC.RunLoop.end=function(){var a=this.currentRunLoop;if(!a){throw"SC.RunLoop.end() called outside of a runloop!"
}a.endRunLoop();return this};SC.run=function(b,a){SC.RunLoop.begin();b.call(a);SC.RunLoop.end()
};sc_require("system/object");sc_require("mixins/enumerable");sc_require("mixins/copyable");
sc_require("mixins/freezable");SC.SelectionSet=SC.Object.extend(SC.Enumerable,SC.Freezable,SC.Copyable,{isSelectionSet:YES,length:function(){var a=0,b=this._sets,c=this._objects;
if(c){a+=c.get("length")}if(b){b.forEach(function(e){a+=e.get("length")})}return a
}.property().cacheable(),sources:function(){var c=[],e=this._sets,b=e?e.length:0,a,g,f;
for(a=0;a<b;a++){g=e[a];if(g&&g.get("length")>0&&g.source){c.push(g.source)}}return c
}.property().cacheable(),indexSetForSource:function(f){if(!f||!f.isSCArray){return null
}var b=this._indexSetCache,e=this._objects,c,a;if(!b){b=this._indexSetCache={}}c=b[SC.guidFor(f)];
if(c&&c._sourceRevision&&(c._sourceRevision!==f.propertyRevision)){c=null}if(!c){c=this._indexSetForSource(f,NO);
if(c&&c.get("length")===0){c=null}if(e){if(c){c=c.copy()}e.forEach(function(g){if((a=f.indexOf(g))>=0){if(!c){c=SC.IndexSet.create()
}c.add(a)}},this)}if(c){c=b[SC.guidFor(f)]=c.frozenCopy();c._sourceRevision=f.propertyRevision
}}return c},_indexSetForSource:function(g,h){if(h===undefined){h=YES}var e=SC.guidFor(g),c=this[e],f=this._sets,a=f?f.length:0,b=null;
if(c>=a){c=null}if(SC.none(c)){if(h&&!this.isFrozen){this.propertyWillChange("sources");
if(!f){f=this._sets=[]}b=f[a]=SC.IndexSet.create();b.source=g;this[e]=a;this.propertyDidChange("sources")
}}else{b=f?f[c]:null}return b},add:function(a,b,e){if(this.isFrozen){throw SC.FROZEN_ERROR
}var h,g,l,j,c,f,i,m;if(b===undefined&&e===undefined){if(!a){throw"Must pass params to SC.SelectionSet.add()"
}if(a.isIndexSet){return this.add(a.source,a)}if(a.isSelectionSet){h=a._sets;m=a._objects;
g=h?h.length:0;this.beginPropertyChanges();for(l=0;l<g;l++){j=h[l];if(j&&j.get("length")>0){this.add(j.source,j)
}}if(m){this.addObjects(m)}this.endPropertyChanges();return this}}j=this._indexSetForSource(a,YES);
c=this.get("length");i=j.get("length");f=c-i;j.add(b,e);this._indexSetCache=null;
f+=j.get("length");if(f!==c){this.propertyDidChange("length");this.enumerableContentDidChange();
if(i===0){this.notifyPropertyChange("sources")}}return this},remove:function(a,b,e){if(this.isFrozen){throw SC.FROZEN_ERROR
}var h,g,l,j,c,f,i,m;if(b===undefined&&e===undefined){if(!a){throw"Must pass params to SC.SelectionSet.remove()"
}if(a.isIndexSet){return this.remove(a.source,a)}if(a.isSelectionSet){h=a._sets;m=a._objects;
g=h?h.length:0;this.beginPropertyChanges();for(l=0;l<g;l++){j=h[l];if(j&&j.get("length")>0){this.remove(j.source,j)
}}if(m){this.removeObjects(m)}this.endPropertyChanges();return this}}j=this._indexSetForSource(a,YES);
c=this.get("length");f=c-j.get("length");if(j&&(m=this._objects)){if(e!==undefined){b=SC.IndexSet.create(b,e);
e=undefined}m.forEach(function(n){l=a.indexOf(n);if(b.contains(l)){m.remove(n);f--
}},this)}j.remove(b,e);i=j.get("length");f+=i;this._indexSetCache=null;if(f!==c){this.propertyDidChange("length");
this.enumerableContentDidChange();if(i===0){this.notifyPropertyChange("sources")}}return this
},contains:function(b,e,a){if(e===undefined&&a===undefined){return this.containsObject(b)
}var c=this.indexSetForSource(b);if(!c){return NO}return c.contains(e,a)},intersects:function(b,e,a){var c=this.indexSetForSource(b,NO);
if(!c){return NO}return c.intersects(e,a)},_TMP_ARY:[],addObject:function(b){var c=this._TMP_ARY,a;
c[0]=b;a=this.addObjects(c);c.length=0;return a},addObjects:function(a){var e=this._objects,b,c;
if(!e){e=this._objects=SC.CoreSet.create()}b=e.get("length");e.addEach(a);c=e.get("length");
this._indexSetCache=null;if(c!==b){this.propertyDidChange("length");this.enumerableContentDidChange()
}return this},removeObject:function(b){var c=this._TMP_ARY,a;c[0]=b;a=this.removeObjects(c);
c.length=0;return a},removeObjects:function(b){var f=this._objects,c,e,a;if(!f){return this
}c=f.get("length");f.removeEach(b);e=f.get("length");if(a=this._sets){a.forEach(function(g){c+=g.get("length");
g.removeObjects(b);e+=g.get("length")},this)}this._indexSetCache=null;if(e!==c){this.propertyDidChange("length");
this.enumerableContentDidChange()}return this},containsObject:function(c){var f=this._objects;
if(f&&f.contains(c)){return YES}var e=this._sets,b=e?e.length:0,a,g;for(a=0;a<b;a++){g=e[a];
if(g&&g.indexOf(c)>=0){return YES}}return NO},constrain:function(e){var f,b,a,c;this.beginPropertyChanges();
this.get("sources").forEach(function(g){if(g===e){return}var h=this._indexSetForSource(e,NO);
if(h){this.remove(e,h)}},this);f=this._indexSetForSource(e,NO);if(f&&((a=f.get("max"))>(b=e.get("length")))){this.remove(e,b,a-b)
}if(c=this._objects){c.forEach(function(g){if(e.indexOf(g)<0){this.removeObject(g)
}},this)}this.endPropertyChanges();return this},isEqual:function(h){var g,e,b,a,c,f;
if(!h||!h.isSelectionSet){return NO}if(h===this){return YES}if((this._sets===h._sets)&&(this._objects===h._objects)){return YES
}if(this.get("length")!==h.get("length")){return NO}g=this._objects;e=h._objects;
if(g||e){if((g?g.get("length"):0)!==(e?e.get("length"):0)){return NO}if(g&&!g.isEqual(e)){return NO
}}c=this.get("sources");a=c.get("length");for(b=0;b<a;b++){f=c.objectAt(b);g=this._indexSetForSource(f,NO);
e=this._indexSetForSource(f,NO);if(!!e!==!!g){return NO}if(g&&!g.isEqual(e)){return NO
}}return YES},clear:function(){if(this.isFrozen){throw SC.FROZEN_ERROR}if(this._sets){this._sets.length=0
}if(this._objects){this._objects=null}this._indexSetCache=null;this.propertyDidChange("length");
this.enumerableContentDidChange();this.notifyPropertyChange("sources");return this
},copy:function(){var c=this.constructor.create(),e=this._sets,b=e?e.length:0,a,f;
if(e&&b>0){e=c._sets=e.slice();for(a=0;a<b;a++){if(!(f=e[a])){continue}f=e[a]=f.copy();
c[SC.guidFor(f.source)]=a}}if(this._objects){c._objects=this._objects.copy()}return c
},freeze:function(){if(this.isFrozen){return this}var a=this._sets,b=a?a.length:0,c;
while(--b>=0){if(c=a[b]){c.freeze()}}if(this._objects){this._objects.freeze()}return arguments.callee.base.apply(this,arguments)
},toString:function(){var a=this._sets||[];a=a.map(function(b){return b.toString().replace("SC.IndexSet",SC.guidFor(b.source))
},this);if(this._objects){a.push(this._objects.toString())}return"SC.SelectionSet:%@<%@>".fmt(SC.guidFor(this),a.join(","))
},firstObject:function(){var b=this._sets,c=this._objects;if(b&&b.get("length")>0){var f=b?b[0]:null,e=f?f.source:null,a=f?f.firstObject():-1;
if(e&&a>=0){return e.objectAt(a)}}return c?c.firstObject():undefined}.property(),nextObject:function(c,f,b){var e,a;
if(c===0){e=b.objects=[];this.forEach(function(g){e.push(g)},this);b.max=e.length
}e=b.objects;a=e[c];if(c+1>=b.max){b.objects=b.max=null}return a},forEach:function(h,f){var c=this._sets,e=this._objects,b=c?c.length:0,g,a;
for(a=0;a<b;a++){g=c[a];if(g){g.forEachObject(h,f)}}if(e){e.forEach(h,f)}return this
}});SC.SelectionSet.prototype.clone=SC.SelectionSet.prototype.copy;SC.SelectionSet.EMPTY=SC.SelectionSet.create().freeze();
sc_require("mixins/enumerable");sc_require("mixins/array");sc_require("mixins/observable");
sc_require("mixins/delegate_support");SC.SparseArray=SC.Object.extend(SC.Observable,SC.Enumerable,SC.Array,SC.DelegateSupport,{_requestingLength:0,_requestingIndex:0,length:function(){var a=this.delegate;
if(a&&SC.none(this._length)&&a.sparseArrayDidRequestLength){this._requestingLength++;
a.sparseArrayDidRequestLength(this);this._requestingLength--}return this._length||0
}.property().cacheable(),provideLength:function(a){if(SC.none(a)){this._sa_content=null
}if(a!==this._length){this._length=a;if(this._requestingLength<=0){this.enumerableContentDidChange()
}}return this},rangeWindowSize:1,requestedRangeIndex:[],objectAt:function(a){var c=this._sa_content,b;
if(!c){c=this._sa_content=[]}if((b=c[a])===undefined){this.requestIndex(a);b=c[a]
}return b},definedIndexes:function(e){var c=SC.IndexSet.create(),f=this._sa_content,b,a;
if(!f){return c.freeze()}if(e){e.forEach(function(g){if(f[g]!==undefined){c.add(g)
}})}else{a=f.length;for(b=0;b<a;b++){if(f[b]!==undefined){c.add(b)}}}return c.freeze()
},_TMP_RANGE:{},requestIndex:function(b){var c=this.delegate;if(!c){return this}var a=this.get("rangeWindowSize"),f=b;
if(a>1){f=f-Math.floor(f%a)}if(a<1){a=1}this._requestingIndex++;if(c.sparseArrayDidRequestRange){var e=this._TMP_RANGE;
if(this.wasRangeRequested(f)===-1){e.start=f;e.length=a;c.sparseArrayDidRequestRange(this,e);
this.requestedRangeIndex.push(f)}}else{if(c.sparseArrayDidRequestIndex){while(--a>=0){c.sparseArrayDidRequestIndex(this,f+a)
}}}this._requestingIndex--;return this},wasRangeRequested:function(c){var b,a;for(b=0,a=this.requestedRangeIndex.length;
b<a;b++){if(this.requestedRangeIndex[b]===c){return b}}return -1},rangeRequestCompleted:function(b){var a=this.wasRangeRequested(b);
if(a>=0){this.requestedRangeIndex.removeAt(a,1);return YES}return NO},provideObjectsInRange:function(b,f){var c=this._sa_content;
if(!c){c=this._sa_content=[]}var e=b.start,a=b.length;while(--a>=0){c[e+a]=f[a]}if(this._requestingIndex<=0){this.enumerableContentDidChange()
}return this},_TMP_PROVIDE_ARRAY:[],_TMP_PROVIDE_RANGE:{length:1},provideObjectAtIndex:function(c,b){var e=this._TMP_PROVIDE_ARRAY,a=this._TMP_PROVIDE_RANGE;
e[0]=b;a.start=c;return this.provideObjectsInRange(a,e)},objectsDidChangeInRange:function(a){var b=this._sa_content;
if(b){if(a.start===0&&SC.maxRange(a)>=b.length){this._sa_content=null}else{var e=a.start,c=Math.min(e+a.length,b.length);
while(--c>=e){b[c]=undefined}}}this.enumerableContentDidChange(a);return this},indexOf:function(c){var a=this.delegate;
if(a&&a.sparseArrayDidRequestIndexOf){return a.sparseArrayDidRequestIndexOf(this,c)
}else{var b=this._sa_content;if(!b){b=this._sa_content=[]}return b.indexOf(c)}},replace:function(b,h,f){f=f||[];
var c=this.delegate;if(c){if(!c.sparseArrayShouldReplace||!c.sparseArrayShouldReplace(this,b,h,f)){return this
}}var e=this._sa_content;if(!e){e=this._sa_content=[]}e.replace(b,h,f);var a=f?(f.get?f.get("length"):f.length):0;
var g=a-h;if(!SC.none(this._length)){this.propertyWillChange("length");this._length+=g;
this.propertyDidChange("length")}this.enumerableContentDidChange(b,h,g);return this
},reset:function(){this._sa_content=null;this._length=null;this.enumerableContentDidChange();
this.invokeDelegateMethod(this.delegate,"sparseArrayDidReset",this);return this}});
SC.SparseArray.array=function(a){return this.create({_length:a||0})};if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/runtime")
}SC.DataSource=SC.Object.extend({fetch:function(a,b){return NO},retrieveRecords:function(a,c,b){return this._handleEach(a,c,this.retrieveRecord,b)
},commitRecords:function(c,b,h,g,i){var e,f,a;if(b.length>0){e=this.createRecords.call(this,c,b,i)
}if(h.length>0){f=this.updateRecords.call(this,c,h,i)}if(g.length>0){a=this.destroyRecords.call(this,c,g,i)
}return((e===f)&&(e===a))?e:SC.MIXED_STATE},cancel:function(a,b){return NO},updateRecords:function(a,b,c){return this._handleEach(a,b,this.updateRecord,null,c)
},createRecords:function(a,b,c){return this._handleEach(a,b,this.createRecord,null,c)
},destroyRecords:function(a,b,c){return this._handleEach(a,b,this.destroyRecord,null,c)
},_handleEach:function(h,e,c,a,b){var f=e.length,i,g,j,l;if(!a){a=[]}for(i=0;i<f;
i++){l=a[i]?a[i]:b;j=c.call(this,h,e[i],l,b);if(g===undefined){g=j}else{if(g===YES){g=(j===YES)?YES:SC.MIXED_STATE
}else{if(g===NO){g=(j===NO)?NO:SC.MIXED_STATE}}}}return g?g:null},updateRecord:function(a,b,c){return NO
},retrieveRecord:function(a,b,c){return NO},createRecord:function(a,b,c){return NO
},destroyRecord:function(a,b,c){return NO}});sc_require("data_sources/data_source");
SC.CascadeDataSource=SC.DataSource.extend({dataSources:null,from:function(a){var b=this.get("dataSources");
if(!b){this.set("dataSources",b=[])}b.push(a);return this},fetch:function(c,h){var f=this.get("dataSources"),b=f?f.length:0,e=NO,i,g,a;
for(a=0;(e!==YES)&&a<b;a++){g=f.objectAt(a);i=g.fetch?g.fetch.call(g,c,h):NO;e=this._handleResponse(e,i)
}return e},retrieveRecords:function(c,g){var f=this.get("dataSources"),b=f?f.length:0,e=NO,i,h,a;
for(a=0;(e!==YES)&&a<b;a++){h=f.objectAt(a);i=h.retrieveRecords.call(h,c,g);e=this._handleResponse(e,i)
}return e},commitRecords:function(j,c,h,e){var b=this.get("dataSources"),f=b?b.length:0,g=NO,l,a,i;
for(i=0;(g!==YES)&&i<f;i++){a=b.objectAt(i);l=a.commitRecords.call(a,j,c,h,e);g=this._handleResponse(g,l)
}return g},cancel:function(c,g){var f=this.get("dataSources"),b=f?f.length:0,e=NO,i,h,a;
for(a=0;(e!==YES)&&a<b;a++){h=f.objectAt(a);i=h.cancel.call(h,c,g);e=this._handleResponse(e,i)
}return e},init:function(){arguments.callee.base.apply(this,arguments);var b=this.get("dataSources"),a=b?b.get("length"):0,c;
while(--a>=0){c=b[a];if(SC.typeOf(c)===SC.T_STRING){b[a]=this.get(c)}}},_handleResponse:function(b,a){if(a===YES){return YES
}else{if(b===NO){return(a===NO)?NO:SC.MIXED_STATE}else{return SC.MIXED_STATE}}}});
SC.Record=SC.Object.extend({isRecord:YES,primaryKey:"guid",id:function(a,b){if(b!==undefined){this.writeAttribute(this.get("primaryKey"),b);
return b}else{return SC.Store.idFor(this.storeKey)}}.property("storeKey").cacheable(),status:function(){return this.store.readStatus(this.storeKey)
}.property("storeKey").cacheable(),store:null,storeKey:null,isDestroyed:function(){return !!(this.get("status")&SC.Record.DESTROYED)
}.property("status").cacheable(),isEditable:function(a,b){if(b!==undefined){this._screc_isEditable=b
}if(this.get("status")&SC.Record.READY){return this._screc_isEditable}else{return NO
}}.property("status").cacheable(),_screc_isEditable:YES,isLoaded:function(){var b=SC.Record,a=this.get("status");
return !((a===b.EMPTY)||(a===b.BUSY_LOADING)||(a===b.ERROR))}.property("status").cacheable(),relationships:null,attributes:function(){var a=this.get("store"),b=this.storeKey;
return a.readEditableDataHash(b)}.property(),refresh:function(){this.get("store").refreshRecord(null,null,this.get("storeKey"));
return this},destroy:function(){this.get("store").destroyRecord(null,null,this.get("storeKey"));
this.propertyDidChange("status");return this},recordDidChange:function(a){this.get("store").recordDidChange(null,null,this.get("storeKey"),a);
this.notifyPropertyChange("status");return this},_editLevel:0,beginEditing:function(){this._editLevel++;
return this},endEditing:function(a){if(--this._editLevel<=0){this._editLevel=0;this.recordDidChange(a)
}return this},readAttribute:function(c){var a=this.get("store"),e=this.storeKey;var b=a.readDataHash(e);
return b?b[c]:undefined},writeAttribute:function(h,e,j){var f=this.get("store"),i=this.storeKey,c=f.peekStatus(i),a=this[h],b=SC.Store.recordTypeFor(i),g;
g=f.readEditableDataHash(i);if(!g){throw SC.Record.BAD_STATE_ERROR}if(e!==g[h]){if(!j){this.beginEditing()
}g[h]=e;if(h===this.get("primaryKey")){SC.Store.replaceIdFor(i,e);this.propertyDidChange("id")
}if(!j){this.endEditing(h)}}if(!b.aggregates||b.aggregates.length>0){this.propagateToAggregates()
}return this},propagateToAggregates:function(){var l=this.get("storeKey"),b=SC.Store.recordTypeFor(l),i,f,j,a,h;
var e=b.aggregates;if(!e){var c=this.get("store").readDataHash(l);e=[];for(k in c){if(this[k]&&this[k].get&&this[k].get("aggregate")===YES){e.push(k)
}}b.aggregates=e}var g=SC.Record;for(i=0,f=e.length;i<f;++i){j=e[i];a=this.get(j);
h=SC.kindOf(a,SC.ManyArray)?a:[a];h.forEach(function(o){if(o){var m=this.get("status");
if(m&g.DIRTY){var n=o.get("status");if(n===g.READY_CLEAN){o.get("store").recordDidChange(o.constructor,null,o.get("storeKey"),null,YES)
}}}},this)}},storeDidChangeProperties:function(a,b){if(a){this.notifyPropertyChange("status")
}else{if(b){this.beginPropertyChanges();b.forEach(function(f){this.notifyPropertyChange(f)
},this);this.notifyPropertyChange("status");this.endPropertyChanges()}else{this.allPropertiesDidChange()
}var e=this.relationships,c=e?e.length:0;while(--c>=0){e[c].recordPropertyDidChange(b)
}}},normalize:function(c){var h=this.primaryKey,f={},b=this.get("id"),i=this.get("store"),l=this.get("storeKey"),m,e,a,g;
f[h]=b;for(var j in this){if(this[j]&&this[j]["typeClass"]){a=SC.typeOf(this[j].typeClass())==="class";
if(!a){e=this.get(j);if(e!==undefined||(e===null&&c)){f[j]=e}}else{if(a){m=i.readDataHash(l);
if(m[j]!==undefined){f[j]=m[j]}else{g=this[j].get("defaultValue");if(SC.typeOf(g)===SC.T_FUNCTION){f[j]=g(this,j,g)
}else{f[j]=g}}}}}}i.writeDataHash(l,f);return i.materializeRecord(l)},unknownProperty:function(b,e){if(e!==undefined){var c=this.get("storeKey"),f=SC.Store.recordTypeFor(c);
if(f.ignoreUnknownProperties===YES){this[b]=e;return e}var a=this.get("primaryKey");
this.writeAttribute(b,e);if(b===a){SC.Store.replaceIdFor(c,e)}}return this.readAttribute(b)
},commitRecord:function(b){var a=this.get("store");a.commitRecord(undefined,undefined,this.get("storeKey"),b);
return this},isError:function(){return this.get("status")&SC.Record.ERROR}.property("status").cacheable(),errorValue:function(){return this.get("isError")?SC.val(this.get("errorObject")):null
}.property("isError").cacheable(),errorObject:function(){if(this.get("isError")){var a=this.get("store");
return a.readError(this.get("storeKey"))||SC.Record.GENERIC_ERROR}else{return null
}}.property("isError").cacheable(),toString:function(){var a=this.get("attributes");
return"%@(%@) %@".fmt(this.constructor.toString(),SC.inspect(a),this.statusString())
},statusString:function(){var b=[],a=this.get("status");for(var c in SC.Record){if(c.match(/[A-Z_]$/)&&SC.Record[c]===a){b.push(c)
}}return b.join(" ")}});SC.Record.mixin({ignoreUnknownProperties:NO,CLEAN:1,DIRTY:2,EMPTY:256,ERROR:4096,READY:512,READY_CLEAN:513,READY_DIRTY:514,READY_NEW:515,DESTROYED:1024,DESTROYED_CLEAN:1025,DESTROYED_DIRTY:1026,BUSY:2048,BUSY_LOADING:2052,BUSY_CREATING:2056,BUSY_COMMITTING:2064,BUSY_REFRESH:2080,BUSY_REFRESH_CLEAN:2081,BUSY_REFRESH_DIRTY:2082,BUSY_DESTROYING:2112,BAD_STATE_ERROR:SC.$error("Internal Inconsistency"),RECORD_EXISTS_ERROR:SC.$error("Record Exists"),NOT_FOUND_ERROR:SC.$error("Not found "),BUSY_ERROR:SC.$error("Busy"),GENERIC_ERROR:SC.$error("Generic Error"),attr:function(a,b){return SC.RecordAttribute.attr(a,b)
},fetch:function(b,a){return SC.FetchedAttribute.attr(b,a)},toMany:function(b,a){return SC.ManyAttribute.attr(b,a)
},toOne:function(b,a){return SC.SingleAttribute.attr(b,a)},storeKeysById:function(){var b=SC.keyFor("storeKey",SC.guidFor(this)),a=this[b];
if(!a){a=this[b]={}}return a},storeKeyFor:function(c){var b=this.storeKeysById(),a=b[c];
if(!a){a=SC.Store.generateStoreKey();SC.Store.idsByStoreKey[a]=c;SC.Store.recordTypesByStoreKey[a]=this;
b[c]=a}return a},storeKeyExists:function(c){var b=this.storeKeysById(),a=b[c];return a
},find:function(a,b){return a.find(this,b)},extend:function(){var a=SC.Object.extend.apply(this,arguments);
SC.Query._scq_didDefineRecordType(a);return a}});sc_require("data_sources/data_source");
sc_require("models/record");SC.FixturesDataSource=SC.DataSource.extend({simulateRemoteResponse:NO,latency:50,cancel:function(a,b){return NO
},fetch:function(a,b){if(b.get("location")!==SC.Query.LOCAL){throw SC.$error("SC.Fixture data source can only fetch local queries")
}if(!b.get("recordType")&&!b.get("recordTypes")){throw SC.$error("SC.Fixture data source can only fetch queries with one or more record types")
}if(this.get("simulateRemoteResponse")){this.invokeLater(this._fetch,this.get("latency"),a,b)
}else{this._fetch(a,b)}},_fetch:function(a,c){var e=c.get("recordType"),b=c.get("recordTypes")||[e];
b.forEach(function(f){if(SC.typeOf(f)===SC.T_STRING){f=SC.objectForPropertyPath(f)
}if(f){this.loadFixturesFor(a,f)}},this);a.dataSourceDidFetchQuery(c)},retrieveRecords:function(a,c){var e=this.get("latency"),b=this.hasFixturesFor(c);
if(!b){return b}if(this.get("simulateRemoteResponse")){this.invokeLater(this._retrieveRecords,e,a,c)
}else{this._retrieveRecords(a,c)}return b},_retrieveRecords:function(a,b){b.forEach(function(e){var c=[],h=SC.Store.recordTypeFor(e),g=a.idFor(e),f=this.fixtureForStoreKey(a,e);
c.push(e);a.dataSourceDidComplete(e,f,g)},this)},updateRecords:function(a,c,f){var e=this.get("latency"),b=this.hasFixturesFor(c);
if(!b){return b}if(this.get("simulateRemoteResponse")){this.invokeLater(this._updateRecords,e,a,c)
}else{this._updateRecords(a,c)}return b},_updateRecords:function(a,b){b.forEach(function(c){var e=a.readDataHash(c);
this.setFixtureForStoreKey(a,c,e);a.dataSourceDidComplete(c)},this)},createRecords:function(a,b,e){var c=this.get("latency");
if(this.get("simulateRemoteResponse")){this.invokeLater(this._createRecords,c,a,b)
}else{this._createRecords(a,b)}return YES},_createRecords:function(a,b){b.forEach(function(f){var h=a.idFor(f),g=a.recordTypeFor(f),e=a.readDataHash(f),c=this.fixturesFor(g);
if(!h){h=this.generateIdFor(g,e,a,f)}this._invalidateCachesFor(g,f,h);c[h]=e;a.dataSourceDidComplete(f,null,h)
},this)},destroyRecords:function(a,c,f){var e=this.get("latency"),b=this.hasFixturesFor(c);
if(!b){return b}if(this.get("simulateRemoteResponse")){this.invokeLater(this._destroyRecords,e,a,c)
}else{this._destroyRecords(a,c)}return b},_destroyRecords:function(a,b){b.forEach(function(e){var g=a.idFor(e),f=a.recordTypeFor(e),c=this.fixturesFor(f);
this._invalidateCachesFor(f,e,g);if(g){delete c[g]}a.dataSourceDidDestroy(e)},this)
},loadFixturesFor:function(a,h,c){var b=[],f,e,g;f=this.fixturesFor(h);for(e in f){g=h.storeKeyFor(e);
if(a.peekStatus(g)===SC.Record.EMPTY){b.push(f[e])}if(c){c.push(g)}}if(b&&b.length>0){a.loadRecords(h,b)
}return this},generateIdFor:function(e,b,a,c){return"@id%@".fmt(SC.Store.generateStoreKey())
},fixtureForStoreKey:function(a,c){var f=a.idFor(c),e=a.recordTypeFor(c),b=this.fixturesFor(e);
return b?b[f]:null},setFixtureForStoreKey:function(a,e,c){var g=a.idFor(e),f=a.recordTypeFor(e),b=this.fixturesFor(f);
this._invalidateCachesFor(f,e,g);b[g]=c;return this},fixturesFor:function(i){if(!this._fixtures){this._fixtures={}
}var g=this._fixtures[SC.guidFor(i)];if(g){return g}var f=i?i.FIXTURES:null,b=f?f.length:0,c=i?i.prototype.primaryKey:"guid",a,e,h;
this._fixtures[SC.guidFor(i)]=g={};for(a=0;a<b;a++){e=f[a];h=e[c];if(!h){h=this.generateIdFor(i,e)
}g[h]=e}return g},fixturesLoadedFor:function(c){if(!this._fixtures){return NO}var a=[],b=this._fixtures[SC.guidFor(c)];
return b?YES:NO},hasFixturesFor:function(b){var a=NO;b.forEach(function(e){if(a!==SC.MIXED_STATE){var f=SC.Store.recordTypeFor(e),c=f?f.FIXTURES:null;
if(c&&c.length&&c.length>0){if(a===NO){a=YES}}else{if(a===YES){a=SC.MIXED_STATE}}}},this);
return a},_invalidateCachesFor:function(e,b,c){var a=this._storeKeyCache;if(a){delete a[SC.guidFor(e)]
}return this}});SC.Record.fixtures=SC.FixturesDataSource.create();sc_require("models/record");
SC.RecordAttribute=SC.Object.extend({defaultValue:null,type:String,key:null,isRequired:NO,isEditable:YES,useIsoDate:YES,aggregate:NO,typeClass:function(){var a=this.get("type");
if(SC.typeOf(a)===SC.T_STRING){a=SC.objectForPropertyPath(a)}return a}.property("type").cacheable(),transform:function(){var a=this.get("typeClass")||String,c=SC.RecordAttribute.transforms,b;
while(a&&!(b=c[SC.guidFor(a)])){if(a.superclass.hasOwnProperty("create")){a=a.superclass
}else{a=SC.T_FUNCTION}}return b}.property("typeClass").cacheable(),toType:function(a,c,f){var b=this.get("transform"),e=this.get("typeClass");
if(b&&b.to){f=b.to(f,this,e,a,c)}return f},fromType:function(a,c,f){var b=this.get("transform"),e=this.get("typeClass");
if(b&&b.from){f=b.from(f,this,e,a,c)}return f},call:function(a,b,c){var e=this.get("key")||b,f;
if(c!==undefined){f=this.fromType(a,b,c);a.writeAttribute(e,f)}else{c=a.readAttribute(e);
if(SC.none(c)&&(c=this.get("defaultValue"))){if(typeof c===SC.T_FUNCTION){c=this.defaultValue(a,b,this);
if(a.attributes()){a.writeAttribute(e,c,true)}}}else{c=this.toType(a,b,c)}}return c
},isProperty:YES,isCacheable:YES,dependentKeys:[],init:function(){arguments.callee.base.apply(this,arguments);
this.cacheKey="__cache__"+SC.guidFor(this);this.lastSetValueKey="__lastValue__"+SC.guidFor(this)
}});SC.RecordAttribute.attr=function(a,b){if(!b){b={}}if(!b.type){b.type=a||String
}return this.create(b)};SC.RecordAttribute.transforms={};SC.RecordAttribute.registerTransform=function(a,b){SC.RecordAttribute.transforms[SC.guidFor(a)]=b
};SC.RecordAttribute.registerTransform(Boolean,{to:function(a){return SC.none(a)?null:!!a
}});SC.RecordAttribute.registerTransform(Number,{to:function(a){return SC.none(a)?null:Number(a)
}});SC.RecordAttribute.registerTransform(String,{to:function(a){if(!(typeof a===SC.T_STRING)&&!SC.none(a)&&a.toString){a=a.toString()
}return a}});SC.RecordAttribute.registerTransform(Array,{to:function(a){if(!SC.isArray(a)&&!SC.none(a)){a=[]
}return a}});SC.RecordAttribute.registerTransform(Object,{to:function(a){if(!(typeof a==="object")&&!SC.none(a)){a={}
}return a}});SC.RecordAttribute.registerTransform(SC.Record,{to:function(f,a,e,c){var b=c.get("store");
if(SC.none(f)||(f==="")){return null}else{return b.find(e,f)}},from:function(a){return a?a.get("id"):null
}});SC.RecordAttribute.registerTransform(SC.T_FUNCTION,{to:function(f,a,e,c){e=e.apply(c);
var b=c.get("store");return b.find(e,f)},from:function(a){return a.get("id")}});SC.RecordAttribute.registerTransform(Date,{to:function(i,a){var c;
if(a.get("useIsoDate")){var e="([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?",h=i.toString().match(new RegExp(e)),g=0,b=new Date(h[1],0,1),f;
if(h[3]){b.setMonth(h[3]-1)}if(h[5]){b.setDate(h[5])}if(h[7]){b.setHours(h[7])}if(h[8]){b.setMinutes(h[8])
}if(h[10]){b.setSeconds(h[10])}if(h[12]){b.setMilliseconds(Number("0."+h[12])*1000)
}if(h[14]){g=(Number(h[16])*60)+Number(h[17]);g*=((h[15]=="-")?1:-1)}g-=b.getTimezoneOffset();
f=(Number(b)+(g*60*1000));c=new Date();c.setTime(Number(f))}else{c=new Date(Date.parse(i))
}return c},_dates:{},_zeropad:function(a){return((a<0)?"-":"")+((a<10)?"0":"")+Math.abs(a)
},from:function(b){var a=this._dates[b.getTime()];if(a){return a}var e=this._zeropad,c=0-b.getTimezoneOffset()/60;
c=(c===0)?"Z":"%@:00".fmt(e(c));this._dates[b.getTime()]=a="%@-%@-%@T%@:%@:%@%@".fmt(e(b.getFullYear()),e(b.getMonth()+1),e(b.getDate()),e(b.getHours()),e(b.getMinutes()),e(b.getSeconds()),c);
return a}});if(SC.DateTime&&!SC.RecordAttribute.transforms[SC.guidFor(SC.DateTime)]){SC.RecordAttribute.registerTransform(SC.DateTime,{to:function(c,a){if(SC.none(c)||SC.instanceOf(c,SC.DateTime)){return c
}var b=a.get("format");return SC.DateTime.parse(c,b?b:SC.DateTime.recordFormat)},from:function(b,a){if(SC.none(b)){return b
}var c=a.get("format");return b.toFormattedString(c?c:SC.DateTime.recordFormat)}})
}sc_require("models/record");sc_require("models/record_attribute");SC.FetchedAttribute=SC.RecordAttribute.extend({paramValueKey:"link",paramOwnerKey:"owner",paramRelKey:"rel",queryKey:null,isEditable:NO,toType:function(e,j,h){var i=e.get("store");
if(!i){return null}var b=this.get("paramValueKey"),a=this.get("paramOwnerKey"),g=this.get("paramRelKey"),f=this.get("queryKey")||this.get("typeClass"),c={};
if(b){c[b]=h}if(a){c[a]=e}if(g){c[g]=this.get("key")||j}return i.findAll(f,c)},fromType:function(a,b,c){return c
}});sc_require("models/record");sc_require("models/record_attribute");SC.ManyAttribute=SC.RecordAttribute.extend({inverse:null,isMaster:YES,orderBy:null,toType:function(b,e,g){var f=this.get("typeClass"),i=this.get("key")||e,h=SC.keyFor("__manyArray__",SC.guidFor(this)),c=b[h],a;
if(!c){c=SC.ManyArray.create({recordType:f,record:b,propertyName:i,manyAttribute:this});
b[h]=c;a=b.get("relationships");if(!a){b.set("relationships",a=[])}a.push(c)}return c
},fromType:function(b,f,g){var c=[];if(!SC.isArray(g)){throw"Expects toMany attribute to be an array"
}var a=g.get("length");for(var e=0;e<a;e++){c[e]=g.objectAt(e).get("id")}return c
},inverseDidRemoveRecord:function(a,b,c,e){var f=a.get(b);if(f){f.removeInverseRecord(c)
}},inverseDidAddRecord:function(a,b,c,e){var f=a.get(b);if(f){f.addInverseRecord(c)
}}});sc_require("models/record");sc_require("models/record_attribute");SC.SingleAttribute=SC.RecordAttribute.extend({inverse:null,isMaster:YES,call:function(c,j,b){var a=this.get("key")||j,i,h,l,g,f,e;
if(b!==undefined){if(b&&!SC.kindOf(b,SC.Record)){throw"%@ is not an instance of SC.Record".fmt(b)
}i=this.get("inverse");if(i){l=this._scsa_call(c,j)}e=this.fromType(c,j,b);c.writeAttribute(a,e,!this.get("isMaster"));
f=b;if(i&&(l!==b)){if(l&&(g=l[i])){g.inverseDidRemoveRecord(l,i,c,j)}if(b&&(g=b[i])){g.inverseDidAddRecord(b,i,c,j)
}}}else{f=this._scsa_call(c,j,b)}return f},_scsa_call:SC.RecordAttribute.prototype.call,inverseDidRemoveRecord:function(c,g,h,i){var b=this.get("inverse"),f=this._scsa_call(c,g),e=this.get("isMaster"),a;
c.writeAttribute(g,null,!e);c.notifyPropertyChange(g);if((f!==h)||(i!==b)){if(f&&(a=f[b])){a.inverseDidRemoveRecord(f,b,c,g)
}}},inverseDidAddRecord:function(a,i,c,h){var f=this.get("inverse"),j=this._scsa_call(a,i),g=this.get("isMaster"),e,b;
b=this.fromType(a,i,c);a.writeAttribute(i,b,!g);a.notifyPropertyChange(i);if((j!==c)||(h!==f)){if(j&&(e=j[f])){e.inverseDidRemoveRecord(j,f,a,i)
}}}});SC.ManyArray=SC.Object.extend(SC.Enumerable,SC.Array,{recordType:null,record:null,propertyName:null,manyAttribute:null,store:function(){return this.get("record").get("store")
}.property("record").cacheable(),storeKey:function(){return this.get("record").get("storeKey")
}.property("record").cacheable(),readOnlyStoreIds:function(){return this.get("record").readAttribute(this.get("propertyName"))
}.property(),editableStoreIds:function(){var a=this.get("store"),e=this.get("storeKey"),c=this.get("propertyName"),b,f;
b=a.readEditableProperty(e,c);if(!b){f=a.readEditableDataHash(e);b=f[c]=[]}if(b!==this._prevStoreIds){this.recordPropertyDidChange()
}return b}.property(),isEditable:function(){var a=this.manyAttribute;return a?a.get("isEditable"):NO
}.property("manyAttribute").cacheable(),inverse:function(){var a=this.manyAttribute;
return a?a.get("inverse"):null}.property("manyAttribute").cacheable(),isMaster:function(){var a=this.manyAttribute;
return a?a.get("isMaster"):null}.property("manyAttribute").cacheable(),orderBy:function(){var a=this.manyAttribute;
return a?a.get("orderBy"):null}.property("manyAttribute").cacheable(),length:function(){var a=this.get("readOnlyStoreIds");
return a?a.get("length"):0}.property("readOnlyStoreIds").cacheable(),objectAt:function(a){var h=this._records,g=this.get("readOnlyStoreIds"),c=this.get("store"),i=this.get("recordType"),f,e,b;
if(!g||!c){return undefined}if(h&&(e=h[a])){return e}if(!h){this._records=h=[]}b=g.objectAt(a);
if(b){f=c.storeKeyFor(i,b);if(c.readStatus(f)===SC.Record.EMPTY){c.retrieveRecord(i,null,f)
}h[a]=e=c.materializeRecord(f)}return e},replace:function(p,e,o){if(!this.get("isEditable")){throw"%@.%@[] is not editable".fmt(this.get("record"),this.get("propertyName"))
}var c=this.get("editableStoreIds"),m=o?(o.get?o.get("length"):o.length):0,j=this.get("record"),f=this.get("propertyName"),h,q,a,b,g,n,l;
a=[];for(h=0;h<m;h++){a[h]=o.objectAt(h).get("id")}g=this.get("inverse");if(g&&e>0){b=SC.ManyArray._toRemove;
if(b){SC.ManyArray._toRemove=null}else{b=[]}for(h=0;h<e;h++){b[h]=this.objectAt(h)
}}c.replace(p,e,a);if(g){for(h=0;h<e;h++){l=b[h];n=l?l[g]:null;if(n&&n.inverseDidRemoveRecord){n.inverseDidRemoveRecord(l,g,j,f)
}}if(b){b.length=0;if(!SC.ManyArray._toRemove){SC.ManyArray._toRemove=b}}for(h=0;
h<m;h++){l=o.objectAt(h);n=l?l[g]:null;if(n&&n.inverseDidAddRecord){n.inverseDidAddRecord(l,g,j,f)
}}}if(j&&(!g||this.get("isMaster"))){j.recordDidChange(f)}return this},removeInverseRecord:function(c){if(!c){return this
}var f=c.get("id"),e=this.get("editableStoreIds"),a=(e&&f)?e.indexOf(f):-1,b;if(a>=0){e.removeAt(a);
if(this.get("isMaster")&&(b=this.get("record"))){b.recordDidChange(this.get("propertyName"))
}}return this},addInverseRecord:function(e){if(!e){return this}var h=e.get("id"),f=this.get("editableStoreIds"),g=this.get("orderBy"),b=f.get("length"),a,c;
if(g){a=this._findInsertionLocation(e,0,b,g)}else{a=b}f.insertAt(a,e.get("id"));if(this.get("isMaster")&&(c=this.get("record"))){c.recordDidChange(this.get("propertyName"))
}return this},_findInsertionLocation:function(h,e,c,g){var b=e+Math.floor((c-e)/2),f=this.objectAt(b),a=this._compare(h,f,g);
if(a<0){if(b===0){return b}else{return this._findInsertionLocation(h,0,b,g)}}else{if(a>0){if(b>=c){return b
}else{return this._findInsertionLocation(h,b,c,g)}}else{return b}}},_compare:function(g,f,j){var i=SC.typeOf(j),h,e,c;
if(i===SC.T_FUNCTION){h=j(g,f)}else{if(i===SC.T_STRING){h=SC.compare(g,f)}else{c=j.get("length");
h=0;for(e=0;(h===0)&&(e<c);e++){h=SC.compare(g,f)}}}return h},recordPropertyDidChange:function(c){if(c&&!c.contains(this.get("propertyName"))){return this
}var g=this.get("readOnlyStoreIds");var b=this._prevStoreIds,e=this._storeIdsContentDidChange;
if(g===b){return this}if(b){b.removeObserver("[]",this,e)}this._prevStoreIds=g;if(g){g.addObserver("[]",this,e)
}var a=(g)?g.propertyRevision:-1;this._storeIdsContentDidChange(g,"[]",g,a)},_storeIdsContentDidChange:function(e,b,c,a){this._records=null;
this.enumerableContentDidChange()},unknownProperty:function(b,c){var a=this.reducedProperty(b,c);
return a===undefined?arguments.callee.base.apply(this,arguments):a},init:function(){arguments.callee.base.apply(this,arguments);
this.recordPropertyDidChange()}});sc_require("models/record");SC.Store=SC.Object.extend({name:null,nestedStores:null,dataSource:null,isNested:NO,commitRecordsAutomatically:NO,from:function(a){this.set("dataSource",a);
return this},_getDataSource:function(){var a=this.get("dataSource");if(typeof a===SC.T_STRING){a=SC.objectForPropertyPath(a);
if(a){a=a.create()}if(a){this.set("dataSource",a)}}return a},cascade:function(a){var b=SC.A(arguments);
a=SC.CascadeDataSource.create({dataSources:b});return this.from(a)},chain:function(b,c){if(!b){b={}
}b.parentStore=this;if(c){if(SC.typeOf(c)!=="class"){throw new Error("%@ is not a valid class".fmt(c))
}if(!SC.kindOf(c,SC.NestedStore)){throw new Error("%@ is not a type of SC.NestedStore".fmt(c))
}}else{c=SC.NestedStore}var a=c.create(b),e=this.nestedStores;if(!e){e=this.nestedStores=[]
}e.push(a);return a},willDestroyNestedStore:function(a){if(this.nestedStores){this.nestedStores.removeObject(a)
}return this},hasNestedStore:function(a){while(a&&(a!==this)){a=a.get("parentStore")
}return a===this},dataHashes:null,statuses:null,revisions:null,editables:null,changelog:null,recordArraysWithQuery:null,recordErrors:null,queryErrors:null,storeKeyEditState:function(b){var c=this.editables,a=this.locks;
return(c&&c[b])?SC.Store.EDITABLE:SC.Store.LOCKED},readDataHash:function(a){return this.dataHashes[a]
},readEditableDataHash:function(b){var a=this.dataHashes[b];if(!a){return a}var c=this.editables;
if(!c){c=this.editables=[]}if(!c[b]){c[b]=1;a=this.dataHashes[b]=SC.clone(a)}return a
},readEditableProperty:function(c,a){var f=this.readEditableDataHash(c),e=this.editables[c],b=f[a];
if(e===1){e=this.editables[c]={}}if(!e[a]){b=f[a];if(b&&b.isCopyable){b=f[a]=b.copy()
}e[a]=YES}return b},writeDataHash:function(b,e,a){if(e){this.dataHashes[b]=e}if(a){this.statuses[b]=a
}var c=this.editables;if(!c){c=this.editables=[]}c[b]=1;return this},removeDataHash:function(c,b){var a;
this.dataHashes[c]=null;this.statuses[c]=b||SC.Record.EMPTY;a=this.revisions[c]=this.revisions[c];
var e=this.editables;if(e){e[c]=0}return this},readStatus:function(a){this.readDataHash(a);
return this.statuses[a]||SC.Record.EMPTY},peekStatus:function(a){return this.statuses[a]||SC.Record.EMPTY
},writeStatus:function(b,a){return this.writeDataHash(b,null,a)},dataHashDidChange:function(i,e,f,g){if(!e){e=SC.Store.generateStoreKey()
}var c,b,a,h;c=SC.typeOf(i)===SC.T_ARRAY;if(c){b=i.length}else{b=1;h=i}for(a=0;a<b;
a++){if(c){h=i[a]}this.revisions[h]=e;this._notifyRecordPropertyChange(h,f,g)}return this
},_notifyRecordPropertyChange:function(o,f,n){var a=this.records,h=this.get("nestedStores"),i=SC.Store,c,b,g,m,l,e,p;
g=h?h.length:0;for(m=0;m<g;m++){l=h[m];e=l.peekStatus(o);b=l.storeKeyEditState(o);
if(b===i.INHERITED){l._notifyRecordPropertyChange(o,f,n)}else{if(e&SC.Record.BUSY){if(l.get("hasChanges")){throw i.CHAIN_CONFLICT_ERROR
}l.reset()}}}var j=this.recordPropertyChanges;if(!j){j=this.recordPropertyChanges={storeKeys:SC.CoreSet.create(),records:SC.CoreSet.create(),hasDataChanges:SC.CoreSet.create(),propertyForStoreKeys:{}}
}j.storeKeys.add(o);if(a&&(c=a[o])){j.records.push(o);if(!f){j.hasDataChanges.push(o)
}if(n){if(!(p=j.propertyForStoreKeys[o])){p=j.propertyForStoreKeys[o]=SC.CoreSet.create()
}if(p!=="*"){p.add(n)}}else{j.propertyForStoreKeys[o]="*"}}this.invokeOnce(this.flush);
return this},flush:function(){if(!this.recordPropertyChanges){return this}var j=this.recordPropertyChanges,i=j.storeKeys,n=j.hasDataChanges,a=j.records,g=j.propertyForStoreKeys,e=SC.CoreSet.create(),c,b,f,l,h,m,o;
i.forEach(function(p){if(a.contains(p)){f=n.contains(p)?NO:YES;c=this.records[p];
o=g?g[p]:null;if(o==="*"){o=null}a.remove(p);if(c){c.storeDidChangeProperties(f,o)
}}b=SC.Store.recordTypeFor(p);e.add(b)},this);if(i.get("length")>0){this._notifyRecordArrays(i,e)
}i.clear();n.clear();a.clear();this.recordPropertyChanges.propertyForStoreKeys={};
return this},reset:function(){this.dataHashes={};this.revisions={};this.statuses={};
this.chainedChanges=this.locks=this.editables=null;this.changelog=null;this.recordErrors=null;
this.queryErrors=null;var a=this.records,b;if(a){for(b in a){if(!a.hasOwnProperty(b)){continue
}this._notifyRecordPropertyChange(b,NO)}}this.set("hasChanges",NO)},commitChangesFromNestedStore:function(m,n,c){if(!c){this._verifyLockRevisions(n,m.locks)
}var h=n.length,f,q,g,a,p,b,e,o,l;b=this.revisions;g=this.dataHashes;a=this.statuses;
p=this.editables;if(!p){p=this.editables=[]}e=m.dataHashes;l=m.revisions;o=m.statuses;
for(f=0;f<h;f++){q=n[f];g[q]=e[q];a[q]=o[q];b[q]=l[q];p[q]=0;this._notifyRecordPropertyChange(q,NO)
}var s=this.changelog,j=m.changelog;if(j){if(!s){s=this.changelog=SC.CoreSet.create()
}s.addEach(j)}this.changelog=s;if(!this.get("parentStore")){this.flush()}return this
},_verifyLockRevisions:function(g,j){var a=g.length,c=this.revisions,f,h,e,b;if(j&&c){for(f=0;
f<a;f++){h=g[f];e=j[h]||1;b=c[h]||1;if(e<b){throw SC.Store.CHAIN_CONFLICT_ERROR}}}return this
},find:function(b,a){if(SC.typeOf(b)===SC.T_STRING){b=SC.objectForPropertyPath(b)
}if((arguments.length===1)&&!(b&&b.get&&b.get("isRecord"))){if(!b){throw new Error("SC.Store#find() must pass recordType or query")
}if(!b.isQuery){b=SC.Query.local(b)}return this._findQuery(b,YES,YES)}else{return this._findRecord(b,a)
}},findAll:function(c,a,b){console.warn("SC.Store#findAll() will be removed in a future version of SproutCore.  Use SC.Store#find() instead");
if(!c||!c.isQuery){c=SC.Query.local(c,a,b)}return this._findQuery(c,YES,YES)},_findQuery:function(g,a,f){var b=this._scst_recordArraysByQuery,e=SC.guidFor(g),c,h;
if(!b){b=this._scst_recordArraysByQuery={}}c=b[e];if(!c&&a){b[e]=c=SC.RecordArray.create({store:this,query:g});
h=this.get("recordArrays");if(!h){this.set("recordArrays",h=SC.Set.create())}h.add(c);
if(f){this.refreshQuery(g)}}this.flush();return c},_findRecord:function(c,b){var a;
if(c&&c.get&&c.get("isRecord")){a=c.get("storeKey")}else{a=b?c.storeKeyFor(b):null
}if(a&&(this.readStatus(a)===SC.Record.EMPTY)){a=this.retrieveRecord(c,b)}return a?this.materializeRecord(a):null
},recordArrayWillDestroy:function(b){var a=this._scst_recordArraysByQuery,c=this.get("recordArrays");
if(a){delete a[SC.guidFor(b.get("query"))]}if(c){c.remove(b)}return this},refreshQuery:function(e){if(!e){throw new Error("refreshQuery() requires a query")
}var a=this._scst_recordArraysByQuery,c=a?a[SC.guidFor(e)]:null,b=this._getDataSource();
if(b&&b.fetch){if(c){c.storeWillFetchQuery(e)}b.fetch.call(b,this,e)}return this},_notifyRecordArrays:function(b,a){var c=this.get("recordArrays");
if(!c){return this}c.forEach(function(e){if(e){e.storeDidChangeStoreKeys(b,a)}},this);
return this},recordsFor:function(g){var e=[],a=g.storeKeysById(),f,c,b;for(f in a){c=a[f];
if(this.readStatus(c)!==SC.RECORD_EMPTY){e.push(c)}}if(e.length>0){b=SC.RecordArray.create({store:this,storeKeys:e})
}else{b=e}return b},_TMP_REC_ATTRS:{},materializeRecord:function(e){var a=this.records,c,f,b;
if(!a){a=this.records={}}c=a[e];if(c){return c}f=SC.Store.recordTypeFor(e);if(!f){return null
}b=this._TMP_REC_ATTRS;b.storeKey=e;b.store=this;c=a[e]=f.create(b);return c},createRecord:function(b,e,a){var i,j,c,h=SC.Record,f,g;
if(!a&&(i=b.prototype.primaryKey)){a=e[i];g=b.prototype[i]?b.prototype[i].defaultValue:null;
if(!a&&SC.typeOf(g)===SC.T_FUNCTION){a=e[i]=g()}}j=a?b.storeKeyFor(a):SC.Store.generateStoreKey();
c=this.readStatus(j);if((c&h.BUSY)||(c&h.READY)||(c==h.DESTROYED_DIRTY)){throw a?h.RECORD_EXISTS_ERROR:h.BAD_STATE_ERROR
}else{if(!a&&(c==SC.DESTROYED_CLEAN||c==SC.ERROR)){throw h.BAD_STATE_ERROR}}this.writeDataHash(j,(e?e:{}),h.READY_NEW);
SC.Store.replaceRecordTypeFor(j,b);this.dataHashDidChange(j);f=this.changelog;if(!f){f=SC.Set.create()
}f.add(j);this.changelog=f;if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)
}return this.materializeRecord(j)},createRecords:function(e,j,a){var h=[],c,b,f,g=j.length,i;
f=SC.typeOf(e)===SC.T_ARRAY;if(!f){c=e}for(i=0;i<g;i++){if(f){c=e[i]||SC.Record}b=a?a[i]:undefined;
h.push(this.createRecord(c,j[i],b))}return h},destroyRecord:function(g,f,e){if(e===undefined){e=g.storeKeyFor(f)
}var b=this.readStatus(e),c,a=SC.Record;if((b===a.BUSY_DESTROYING)||(b&a.DESTROYED)){return this
}else{if(b==a.EMPTY){throw a.NOT_FOUND_ERROR}else{if(b&a.BUSY){throw a.BUSY_ERROR
}else{if(b==a.READY_NEW){b=a.DESTROYED_CLEAN}else{b=a.DESTROYED_DIRTY}}}}this.writeStatus(e,b);
this.dataHashDidChange(e);c=this.changelog;if(!c){c=this.changelog=SC.Set.create()
}((b&a.DIRTY)?c.add(e):c.remove(e));this.changelog=c;if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)
}return this},destroyRecords:function(e,a,g){var h,f,i,b,c,j;if(g===undefined){h=a.length;
f=SC.typeOf(e)===SC.T_ARRAY;if(!f){c=e}for(i=0;i<h;i++){if(f){c=e[i]||SC.Record}b=a?a[i]:undefined;
this.destroyRecord(c,b,undefined)}}else{h=g.length;for(i=0;i<h;i++){j=g?g[i]:undefined;
this.destroyRecord(undefined,undefined,j)}}return this},recordDidChange:function(i,h,g,e,c){if(g===undefined){g=i.storeKeyFor(h)
}var b=this.readStatus(g),f,a=SC.Record;if(b&a.BUSY){throw a.BUSY_ERROR}else{if(!(b&a.READY)){throw a.NOT_FOUND_ERROR
}else{if(b!=a.READY_NEW){this.writeStatus(g,a.READY_DIRTY)}}}this.dataHashDidChange(g,null,c,e);
f=this.changelog;if(!f){f=this.changelog=SC.Set.create()}f.add(g);this.changelog=f;
if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)}return this
},recordsDidChange:function(e,a,g){var h,f,i,b,c,j;if(g===undefined){h=a.length;f=SC.typeOf(e)===SC.T_ARRAY;
if(!f){c=e}for(i=0;i<h;i++){if(f){c=e[i]||SC.Record}b=a?a[i]:undefined;j=g?g[i]:undefined;
this.recordDidChange(c,b,j)}}else{h=g.length;for(i=0;i<h;i++){j=g?g[i]:undefined;
this.recordDidChange(undefined,undefined,j)}}return this},retrieveRecords:function(g,b,j,c){var a=this._getDataSource(),i=SC.typeOf(g)===SC.T_ARRAY,l=(!j)?b.length:j.length,m=[],h=SC.Store.generateStoreKey(),o=SC.Record,e,p,q,f,n;
if(!i){e=g}for(p=0;p<l;p++){if(j){q=j[p]}else{if(i){e=g[p]}q=e.storeKeyFor(b[p])}f=this.readStatus(q);
if((f==o.EMPTY)||(f==o.ERROR)||(f==o.DESTROYED_CLEAN)){this.writeStatus(q,o.BUSY_LOADING);
this.dataHashDidChange(q,h,YES);m.push(q)}else{if(c){if(f&o.READY){this.writeStatus(q,o.BUSY_REFRESH|(f&3));
this.dataHashDidChange(q,h,YES);m.push(q)}else{if((f==o.BUSY_DESTROYING)||(f==o.BUSY_CREATING)||(f==o.BUSY_COMMITTING)){throw o.BUSY_ERROR
}else{if(f==o.DESTROYED_DIRTY){throw o.BAD_STATE_ERROR}}}}}}n=NO;if(a){n=a.retrieveRecords.call(a,this,m,b)
}if(!n){l=m.length;h=SC.Store.generateStoreKey();for(p=0;p<l;p++){q=m[p];f=this.readStatus(q);
if(f===o.BUSY_LOADING){this.writeStatus(q,o.ERROR);this.dataHashDidChange(q,h,YES)
}else{if(f&o.BUSY_REFRESH){this.writeStatus(q,o.READY|(f&3));this.dataHashDidChange(q,h,YES)
}}}m.length=0}return m},_TMP_RETRIEVE_ARRAY:[],retrieveRecord:function(g,f,b,c){var e=this._TMP_RETRIEVE_ARRAY,a;
if(b){e[0]=b;b=e;f=null}else{e[0]=f;f=e}a=this.retrieveRecords(g,f,b,c);e.length=0;
return a[0]},refreshRecord:function(c,b,a){return !!this.retrieveRecord(c,b,a,YES)
},refreshRecords:function(b,c,e){var a=this.retrieveRecords(b,c,e,YES);return a&&a.length>0
},commitRecords:function(f,n,b,q){var m=this._getDataSource(),h=SC.typeOf(f)===SC.T_ARRAY,c=[],j=[],l=[],s=SC.Store.generateStoreKey(),g=SC.Record,a,i,e,o,u,t,p;
if(!f&&!n&&!b){b=this.changelog}p=b?b.get("length"):(n?n.get("length"):0);for(i=0;
i<p;i++){if(b){e=b[i]}else{if(h){a=f[i]||SC.Record}else{a=f}e=a.storeKeyFor(n[i])
}o=this.readStatus(e);if((o==g.EMPTY)||(o==g.ERROR)){throw g.NOT_FOUND_ERROR}else{if(o==g.READY_NEW){this.writeStatus(e,g.BUSY_CREATING);
this.dataHashDidChange(e,s,YES);c.push(e)}else{if(o==g.READY_DIRTY){this.writeStatus(e,g.BUSY_COMMITTING);
this.dataHashDidChange(e,s,YES);j.push(e)}else{if(o==g.DESTROYED_DIRTY){this.writeStatus(e,g.BUSY_DESTROYING);
this.dataHashDidChange(e,s,YES);l.push(e)}else{if(o==g.DESTROYED_CLEAN){this.dataHashDidChange(e,s,YES)
}}}}}}if(m&&(p>0||q)){t=m.commitRecords.call(m,this,c,j,l,q)}if(t&&!f&&!n&&b===this.changelog){this.changelog=null
}return t},commitRecord:function(g,f,b,c){var e=this._TMP_RETRIEVE_ARRAY,a;if(f===undefined&&b===undefined){return NO
}if(b!==undefined){e[0]=b;b=e;f=null}else{e[0]=f;f=e}a=this.commitRecords(g,f,b,c);
e.length=0;return a},cancelRecords:function(f,b,j){var a=this._getDataSource(),h=SC.typeOf(f)===SC.T_ARRAY,m=SC.Record,l=[],g,i,n,c,e,o;
i=(j===undefined)?b.length:j.length;for(n=0;n<i;n++){if(h){e=f[n]||SC.Record}else{e=f||SC.Record
}c=b?b[n]:undefined;if(j===undefined){o=e.storeKeyFor(c)}else{o=j?j[n]:undefined}if(o){g=this.readStatus(o);
if((g==m.EMPTY)||(g==m.ERROR)){throw m.NOT_FOUND_ERROR}l.push(o)}}if(a){a.cancel.call(a,this,l)
}return this},cancelRecord:function(f,e,b){var c=this._TMP_RETRIEVE_ARRAY,a;if(b!==undefined){c[0]=b;
b=c;e=null}else{c[0]=e;e=c}a=this.cancelRecords(f,e,b);c.length=0;return this},loadRecord:function(h,e,g){var a=SC.Record,c,b,f;
h=h||SC.Record;b=h.prototype.primaryKey;g=g||e[b];c=f=h.storeKeyFor(g);if(this.readStatus(f)&a.BUSY){this.dataSourceDidComplete(f,e,g)
}else{this.pushRetrieve(h,g,e,f)}return c},loadRecords:function(e,o,a){var g=SC.typeOf(e)===SC.T_ARRAY,h=o.get("length"),i=[],j=SC.Record,c,b,m,l,f,n;
if(!g){c=e||SC.Record;m=c.prototype.primaryKey}for(l=0;l<h;l++){f=o.objectAt(l);if(g){c=e.objectAt(l)||SC.Record;
m=c.prototype.primaryKey}b=(a)?a.objectAt(l):f[m];i[l]=this.loadRecord(c,f,b)}return i
},readError:function(a){var b=this.recordErrors;return b?b[a]:undefined},readQueryError:function(a){var b=this.queryErrors;
return b?b[SC.guidFor(a)]:undefined},dataSourceDidCancel:function(c){var b=this.readStatus(c),a=SC.Record;
if(!(b&a.BUSY)){throw a.BAD_STATE_ERROR}switch(b){case a.BUSY_LOADING:b=a.EMPTY;break;
case a.BUSY_CREATING:b=a.READY_NEW;break;case a.BUSY_COMMITTING:b=a.READY_DIRTY;break;
case a.BUSY_REFRESH_CLEAN:b=a.READY_CLEAN;break;case a.BUSY_REFRESH_DIRTY:b=a.READY_DIRTY;
break;case a.BUSY_DESTROYING:b=a.DESTROYED_DIRTY;break;default:throw a.BAD_STATE_ERROR
}this.writeStatus(c,b);this.dataHashDidChange(c,null,YES);return this},dataSourceDidComplete:function(g,f,e){var b=this.readStatus(g),a=SC.Record,c;
if(!(b&a.BUSY)){throw a.BAD_STATE_ERROR}if(b===a.BUSY_DESTROYING){throw a.BAD_STATE_ERROR
}else{b=a.READY_CLEAN}this.writeStatus(g,b);if(f){this.writeDataHash(g,f,b)}if(e){SC.Store.replaceIdFor(g,e)
}c=f||e?NO:YES;this.dataHashDidChange(g,null,c);return this},dataSourceDidDestroy:function(c){var b=this.readStatus(c),a=SC.Record;
if(!(b&a.BUSY)){throw a.BAD_STATE_ERROR}else{b=a.DESTROYED_CLEAN}this.removeDataHash(c,b);
this.dataHashDidChange(c);return this},dataSourceDidError:function(e,c){var b=this.readStatus(e),f=this.recordErrors,a=SC.Record;
if(!(b&a.BUSY)){throw a.BAD_STATE_ERROR}else{b=a.ERROR}if(c&&c.isError){if(!f){f=this.recordErrors=[]
}f[e]=c}this.writeStatus(e,b);this.dataHashDidChange(e,null,YES);return this},pushRetrieve:function(g,f,c,e){var b=SC.Record,a;
if(e===undefined){e=g.storeKeyFor(f)}a=this.readStatus(e);if(a==b.EMPTY||a==b.ERROR||a==b.READY_CLEAN||a==b.DESTROYED_CLEAN){a=b.READY_CLEAN;
if(c===undefined){this.writeStatus(e,a)}else{this.writeDataHash(e,c,a)}this.dataHashDidChange(e);
return YES}return NO},pushDestroy:function(f,e,c){var b=SC.Record,a;if(c===undefined){c=f.storeKeyFor(e)
}a=this.readStatus(c);if(a==b.EMPTY||a==b.ERROR||a==b.READY_CLEAN||a==b.DESTROYED_CLEAN){a=b.DESTROYED_CLEAN;
this.removeDataHash(c,a);this.dataHashDidChange(c);return YES}return NO},pushError:function(h,g,c,e){var b=SC.Record,a,f=this.recordErrors;
if(e===undefined){e=h.storeKeyFor(g)}a=this.readStatus(e);if(a==b.EMPTY||a==b.ERROR||a==b.READY_CLEAN||a==b.DESTROYED_CLEAN){a=b.ERROR;
if(c&&c.isError){if(!f){f=this.recordErrors=[]}f[e]=c}this.writeStatus(e,a);this.dataHashDidChange(e,null,YES);
return YES}return NO},loadQueryResults:function(c,a){if(c.get("location")===SC.Query.LOCAL){throw new Error("Cannot load query results for a local query")
}var b=this._findQuery(c,YES,NO);if(b){b.set("storeKeys",a)}this.dataSourceDidFetchQuery(c);
return this},dataSourceDidFetchQuery:function(a){return this._scstore_dataSourceDidFetchQuery(a,YES)
},_scstore_dataSourceDidFetchQuery:function(e,a){var c=this._findQuery(e,a,NO),b=this.get("nestedStores"),f=b?b.get("length"):0;
if(c){c.storeDidFetchQuery(e)}while(--f>=0){b[f]._scstore_dataSourceDidFetchQuery(e,NO)
}return this},dataSourceDidCancelQuery:function(a){return this._scstore_dataSourceDidCancelQuery(a,YES)
},_scstore_dataSourceDidCancelQuery:function(e,a){var c=this._findQuery(e,a,NO),b=this.get("nestedStores"),f=b?b.get("length"):0;
if(c){c.storeDidCancelQuery(e)}while(--f>=0){b[f]._scstore_dataSourceDidCancelQuery(e,NO)
}return this},dataSourceDidErrorQuery:function(b,a){var c=this.queryErrors;if(a&&a.isError){if(!c){c=this.queryErrors={}
}c[SC.guidFor(b)]=a}return this._scstore_dataSourceDidErrorQuery(b,YES)},_scstore_dataSourceDidErrorQuery:function(e,a){var c=this._findQuery(e,a,NO),b=this.get("nestedStores"),f=b?b.get("length"):0;
if(c){c.storeDidErrorQuery(e)}while(--f>=0){b[f]._scstore_dataSourceDidErrorQuery(e,NO)
}return this},init:function(){arguments.callee.base.apply(this,arguments);this.reset()
},toString:function(){var b=this.get("name");if(!b){return arguments.callee.base.apply(this,arguments)
}else{var a=arguments.callee.base.apply(this,arguments);return"%@ (%@)".fmt(b,a)}},idFor:function(a){return SC.Store.idFor(a)
},recordTypeFor:function(a){return SC.Store.recordTypeFor(a)},storeKeyFor:function(b,a){return b.storeKeyFor(a)
},storeKeyExists:function(b,a){return b.storeKeyExists(a)},storeKeysFor:function(g){var a=[],f=g&&g.isEnumerable,c,e,b;
if(!this.statuses){return a}for(e in SC.Store.recordTypesByStoreKey){c=SC.Store.recordTypesByStoreKey[e];
if(f){b=g.contains(c)}else{b=c===g}if(b&&this.statuses[e]){a.push(parseInt(e,0))}}return a
},storeKeys:function(){var a=[],b;if(!this.statuses){return}for(b in this.statuses){if(this.statuses[b]!=SC.Record.EMPTY){a.push(parseInt(b,0))
}}return a},statusString:function(a){var b=this.materializeRecord(a);return b.statusString()
}});SC.Store.mixin({CHAIN_CONFLICT_ERROR:new Error("Nested Store Conflict"),NO_PARENT_STORE_ERROR:new Error("Parent Store Required"),NESTED_STORE_UNSUPPORTED_ERROR:new Error("Unsupported In Nested Store"),NESTED_STORE_RETRIEVE_DIRTY_ERROR:new Error("Cannot Retrieve Dirty Record in Nested Store"),EDITABLE:"editable",LOCKED:"locked",INHERITED:"inherited",idsByStoreKey:[],recordTypesByStoreKey:{},queriesByStoreKey:[],nextStoreKey:1,generateStoreKey:function(){return this.nextStoreKey++
},idFor:function(a){return this.idsByStoreKey[a]},queryFor:function(a){return this.queriesByStoreKey[a]
},recordTypeFor:function(a){return this.recordTypesByStoreKey[a]},replaceIdFor:function(c,a){var e=this.idsByStoreKey[c],f,b;
if(e!==a){f=this.recordTypeFor(c);if(!f){throw new Error("replaceIdFor: storeKey %@ does not exist".fmt(c))
}this.idsByStoreKey[c]=a;b=f.storeKeysById();delete b[e];b[a]=c}return this},replaceRecordTypeFor:function(a,b){this.recordTypesByStoreKey[a]=b;
return this}});SC.Store.prototype.nextStoreIndex=1;SC.Store._getDefaultStore=function(){var a=this._store;
if(!a){this._store=a=SC.Store.create()}return a};SC.Store.updateRecords=function(g,h,i,c){console.warn("SC.Store.updateRecords() is deprecated.  Use loadRecords() instead");
var e=this._getDefaultStore(),b=g.length,a,f;if(!i){i=[];for(a=0;a<b;a++){i[a]=g[a].recordType
}}f=e.loadRecords(i,g);b=f.length;for(a=0;a<b;a++){f[a]=e.materializeRecord(f[a])
}return f};SC.Store.find=function(a,b){return this._getDefaultStore().find(b,a)};
SC.Store.findAll=function(a,b){return this._getDefaultStore().findAll(a,b)};sc_require("system/store");
SC.NestedStore=SC.Store.extend({hasChanges:NO,parentStore:null,isNested:YES,lockOnRead:YES,locks:null,chainedChanges:null,find:function(a){if(a&&a.isQuery&&a.get("location")!==SC.Query.LOCAL){throw"SC.Store#find() can only accept LOCAL queries in nested stores"
}return arguments.callee.base.apply(this,arguments)},commitChanges:function(b){if(this.get("hasChanges")){var a=this.get("parentStore");
a.commitChangesFromNestedStore(this,this.chainedChanges,b)}this.reset();return this
},discardChanges:function(){var c,g;if((c=this.records)&&(g=this.locks)){var b=this.get("parentStore"),i=b.revisions;
var h=this.revisions,f,e,a;for(f in c){if(!c.hasOwnProperty(f)){continue}if(!(e=g[f])){continue
}a=i[f];if((a!==e)||(h[f]>a)){this._notifyRecordPropertyChange(f)}}}this.reset();
this.flush();return this},destroy:function(){this.discardChanges();var a=this.get("parentStore");
if(a){a.willDestroyNestedStore(this)}arguments.callee.base.apply(this,arguments);
return this},reset:function(){var a=this.get("parentStore");if(!a){throw SC.Store.NO_PARENT_STORE_ERROR
}this.dataHashes=SC.beget(a.dataHashes);this.revisions=SC.beget(a.revisions);this.statuses=SC.beget(a.statuses);
this.chainedChanges=this.locks=this.editables=null;this.changelog=null;this.set("hasChanges",NO)
},refreshQuery:function(b){var a=this.get("parentStore");if(a){a.refreshQuery(b)}return this
},readError:function(b){var a=this.get("parentStore");return a?a.readError(b):null
},readQueryError:function(b){var a=this.get("parentStore");return a?a.readQueryError(b):null
},storeKeyEditState:function(b){var c=this.editables,a=this.locks;return(c&&c[b])?SC.Store.EDITABLE:(a&&a[b])?SC.Store.LOCKED:SC.Store.INHERITED
},_lock:function(f){var e=this.locks,a,g;if(e&&e[f]){return this}if(!e){e=this.locks=[]
}g=this.editables;if(g){g[f]=0}var c=this.get("parentStore"),b;while(c&&(b=c.storeKeyEditState(f))===SC.Store.INHERITED){c=c.get("parentStore")
}if(c&&b===SC.Store.EDITABLE){this.dataHashes[f]=SC.clone(c.dataHashes[f]);if(!g){g=this.editables=[]
}g[f]=1}else{this.dataHashes[f]=this.dataHashes[f]}this.statuses[f]=this.statuses[f];
a=this.revisions[f]=this.revisions[f];e[f]=a||1;return this},readDataHash:function(a){if(this.get("lockOnRead")){this._lock(a)
}return this.dataHashes[a]},readEditableDataHash:function(a){this._lock(a);return arguments.callee.base.apply(this,arguments)
},writeDataHash:function(e,g,b){var c=this.locks,a;if(g){this.dataHashes[e]=g}this.statuses[e]=b?b:(this.statuses[e]||SC.Record.READY_NEW);
a=this.revisions[e]=this.revisions[e];if(!c){c=this.locks=[]}if(!c[e]){c[e]=a||1}var f=this.editables;
if(!f){f=this.editables=[]}f[e]=1;return this},removeDataHash:function(c,a){var b=this.locks;
if(!b){b=this.locks=[]}if(!b[c]){b[c]=this.revisions[c]||1}return arguments.callee.base.apply(this,arguments)
},dataHashDidChange:function(e,b,a,i){if(!b){b=SC.Store.generateStoreKey()}var c,f,h,j;
c=SC.typeOf(e)===SC.T_ARRAY;if(c){f=e.length}else{f=1;j=e}var g=this.chainedChanges;
if(!g){g=this.chainedChanges=SC.Set.create()}for(h=0;h<f;h++){if(c){j=e[h]}this._lock(j);
this.revisions[j]=b;g.add(j);this._notifyRecordPropertyChange(j,a,i)}this.setIfChanged("hasChanges",YES);
return this},commitChangesFromNestedStore:function(f,g,a){arguments.callee.base.apply(this,arguments);
var b=this.get("parentStore"),j=b.revisions,c;var m=this.locks,h=this.chainedChanges,e,l;
if(!m){m=this.locks=[]}if(!h){h=this.chainedChanges=SC.Set.create()}e=g.length;for(c=0;
c<e;c++){l=g[c];if(!m[l]){m[l]=j[l]||1}h.add(l)}this.setIfChanged("hasChanges",h.get("length")>0);
this.flush();return this},queryFor:function(c,a,b){return this.get("parentStore").queryFor(c,a,b)
},findAll:function(f,b,e,c,a){if(!a){a=this}return this.get("parentStore").findAll(f,b,e,c,a)
},retrieveRecords:function(g,o,b,c){var a=this.get("parentStore"),m,e,s,q=(!b)?o.length:b.length,j=SC.Record,p;
if(c){for(m=0;m<q;m++){e=!b?a.storeKeyFor(g,o[m]):b[m];p=this.peekStatus(e);if(p&j.DIRTY){throw SC.Store.NESTED_STORE_RETRIEVE_DIRTY_ERROR
}else{var h=this.dataHashes,l=this.revisions,i=this.statuses,n=this.editables,u=this.locks;
var f=NO;var t=NO;if(h&&h.hasOwnProperty(e)){delete h[e];f=YES}if(l&&l.hasOwnProperty(e)){delete l[e];
f=YES}if(n){delete n[e]}if(u){delete u[e]}if(i&&i.hasOwnProperty(e)){delete i[e];
if(!f){t=YES}f=YES}if(f){this._notifyRecordPropertyChange(e,t)}}}}return a.retrieveRecords(g,o,b,c)
},commitRecords:function(a,b,c){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},commitRecord:function(c,b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},cancelRecords:function(a,b,c){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},cancelRecord:function(c,b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},dataSourceDidCancel:function(a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},dataSourceDidComplete:function(c,b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},dataSourceDidDestroy:function(a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},dataSourceDidError:function(b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},pushRetrieve:function(e,c,a,b){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},pushDestroy:function(c,b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},pushError:function(e,c,a,b){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR}});sc_require("core");
sc_require("models/record");SC.Query=SC.Object.extend(SC.Copyable,SC.Freezable,{isQuery:YES,conditions:null,orderBy:null,recordType:null,recordTypes:null,expandedRecordTypes:function(){var b=SC.CoreSet.create(),a,c;
if(a=this.get("recordType")){this._scq_expandRecordType(a,b)}else{if(a=this.get("recordTypes")){a.forEach(function(e){this._scq_expandRecordType(e,b)
},this)}else{this._scq_expandRecordType(SC.Record,b)}}c=SC.Query._scq_queriesWithExpandedRecordTypes;
if(!c){c=SC.Query._scq_queriesWithExpandedRecordTypes=SC.CoreSet.create()}c.add(this);
return b.freeze()}.property("recordType","recordTypes").cacheable(),_scq_expandRecordType:function(b,a){if(a.contains(b)){return
}a.add(b);if(SC.typeOf(b)===SC.T_STRING){b=SC.objectForPropertyPath(b)}b.subclasses.forEach(function(c){this._scq_expandRecordType(c,a)
},this)},parameters:null,location:"local",scope:null,isRemote:function(){return this.get("location")===SC.Query.REMOTE
}.property("location").cacheable(),isLocal:function(){return this.get("location")===SC.Query.LOCAL
}.property("location").cacheable(),isEditable:NO,contains:function(a,e){var f,b=YES;
if(f=this.get("recordTypes")){b=f.find(function(g){return SC.kindOf(a,g)})}else{if(f=this.get("recordType")){b=SC.kindOf(a,f)
}}if(!b){return NO}var c=this.get("scope");if(c&&!c.contains(a)){return NO}if(!this._isReady){this.parse()
}if(!this._isReady){return NO}if(e===undefined){e=this.parameters||this}return this._tokenTree.evaluate(a,e)
},containsRecordTypes:function(a){var b=this.get("recordType");if(b){return !!a.find(function(c){return SC.kindOf(c,b)
})}else{if(b=this.get("recordTypes")){return !!b.find(function(c){return !!a.find(function(e){return SC.kindOf(e,c)
})})}else{return YES}}},compare:function(g,e){var c=0,f,b,a,h;if(g===e){return 0}if(!this._isReady){this.parse()
}if(!this._isReady){return SC.compare(g.get("id"),e.get("id"))}b=this._order;a=b?b.length:0;
for(h=0;c===0&&(h<a);h++){f=b[h].propertyName;if(SC.Query.comparisons[f]){c=SC.Query.comparisons[f](g.get(f),e.get(f))
}else{c=SC.compare(g.get(f),e.get(f))}if((c!==0)&&b[h].descending){c=(-1)*c}}if(c!==0){return c
}else{return SC.compare(g.get("id"),e.get("id"))}},_isReady:NO,parse:function(){var c=this.get("conditions"),e=this.get("queryLanguage"),b,a;
b=this._tokenList=this.tokenizeString(c,e);a=this._tokenTree=this.buildTokenTree(b,e);
this._order=this.buildOrder(this.get("orderBy"));this._isReady=!!a&&!a.error;if(a&&a.error){throw a.error
}return this._isReady},queryWithScope:function(c){var b=SC.keyFor("__query__",SC.guidFor(this)),a=c[b];
if(!a){c[b]=a=this.copy();a.set("scope",c);a.freeze()}return a},copyKeys:"conditions orderBy recordType recordTypes parameters location scope".w(),concatenatedProperties:"copyKeys".w(),copy:function(){var e={},c=this.get("copyKeys"),g=c?c.length:0,b,f,a;
while(--g>=0){b=c[g];f=this.get(b);if(f!==undefined){e[b]=f}}a=this.constructor.create(e);
e=null;return a},queryLanguage:{UNKNOWN:{firstCharacter:/[^\s'"\w\d\(\)\{\}]/,notAllowed:/[\s'"\w\d\(\)\{\}]/},PROPERTY:{firstCharacter:/[a-zA-Z_]/,notAllowed:/[^a-zA-Z_0-9]/,evalType:"PRIMITIVE",evaluate:function(b,a){return b.get(this.tokenValue)
}},NUMBER:{firstCharacter:/\d/,notAllowed:/[^\d\.]/,format:/^\d+$|^\d+\.\d+$/,evalType:"PRIMITIVE",evaluate:function(b,a){return parseFloat(this.tokenValue)
}},STRING:{firstCharacter:/['"]/,delimeted:true,evalType:"PRIMITIVE",evaluate:function(b,a){return this.tokenValue
}},PARAMETER:{firstCharacter:/\{/,lastCharacter:"}",delimeted:true,evalType:"PRIMITIVE",evaluate:function(b,a){return a[this.tokenValue]
}},"%@":{rememberCount:true,reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return a[this.tokenValue]
}},OPEN_PAREN:{firstCharacter:/\(/,singleCharacter:true},CLOSE_PAREN:{firstCharacter:/\)/,singleCharacter:true},AND:{reservedWord:true,leftType:"BOOLEAN",rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return e&&b}},OR:{reservedWord:true,leftType:"BOOLEAN",rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return e||b}},NOT:{reservedWord:true,rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(c,a){var b=this.rightSide.evaluate(c,a);
return !b}},"=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return e==b}},"!=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return e!=b}},"<":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return e<b}},"<=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return e<=b}},">":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return e>b}},">=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return e>=b}},BEGINS_WITH:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var b=this.leftSide.evaluate(c,a);
var e=this.rightSide.evaluate(c,a);return(b&&b.indexOf(e)===0)}},ENDS_WITH:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(e,b){var c=this.leftSide.evaluate(e,b);
var a=this.rightSide.evaluate(e,b);return(c&&c.indexOf(a)===(c.length-a.length))}},CONTAINS:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(e,a){var c=this.leftSide.evaluate(e,a)||[];
var g=this.rightSide.evaluate(e,a);switch(SC.typeOf(c)){case SC.T_STRING:return(c.indexOf(g)!==-1);
case SC.T_ARRAY:var f=false;var b=0;while(f===false&&b<c.length){if(g==c[b]){f=true
}b++}return f;default:break}}},ANY:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(e,a){var g=this.leftSide.evaluate(e,a);
var b=this.rightSide.evaluate(e,a);var f=false;var c=0;while(f===false&&c<b.length){if(g==b[c]){f=true
}c++}return f}},MATCHES:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var e=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return b.test(e)}},TYPE_IS:{reservedWord:true,rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(e,a){var c=SC.Store.recordTypeFor(e.storeKey);
var b=this.rightSide.evaluate(e,a);var f=SC.objectForPropertyPath(b);return c==f}},"null":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return null
}},"undefined":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return undefined
}},"false":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return false
}},"true":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return true
}},YES:{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return true
}},NO:{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return false
}}},tokenizeString:function(y,u){var m=[],w=null,j=null,g=null,x=null,a=null,l=null,e=null,h=null,v=false,b=false,o=false,p=false,q={};
function f(t,c){j=u[t];if(j.format&&!j.format.test(c)){t="UNKNOWN"}if(j.delimeted){p=true
}if(!j.delimeted){for(var i in u){if(u[i].reservedWord&&i==c){t=i}}}j=u[t];if(j&&j.rememberCount){if(!q[t]){q[t]=0
}c=q[t];q[t]+=1}m.push({tokenType:t,tokenValue:c});a=null;l=null;e=null}if(!y){return[]
}var n=y.length;for(var s=0;s<n;s++){v=(s===n-1);w=y.charAt(s);p=false;if(a){j=u[a];
b=j.delimeted?w===h:j.notAllowed.test(w);if(!b){e+=w}if(b||v){f(a,e)}if(v&&!b){p=true
}}if(!a&&!p){for(g in u){j=u[g];if(j.firstCharacter&&j.firstCharacter.test(w)){a=g
}}if(a){j=u[a];e=w;if(j.delimeted){e="";if(j.lastCharacter){h=j.lastCharacter}else{h=w
}}if(j.singleCharacter||v){f(a,e)}}}}return m},buildTokenTree:function(n,a){var q=n.slice();
var t=0;var v=[];var c=false;var s=[];if(!n||n.length===0){return{evaluate:function(){return true
}}}function u(i){var y=i;if(y<0){return false}var l=a[q[y].tokenType];if(!l){s.push("logic for token '"+q[y].tokenType+"' is not defined");
return false}q[y].evaluate=l.evaluate;return l}function b(y,i){var z=i;var l=u(z);
if(!l){return false}if(y=="left"){return l.leftType}if(y=="right"){return l.rightType
}}function p(i){var y=i;var l=u(y);if(!l){return false}else{return l.evalType}}function g(i){q.splice(i,1);
if(i<=t){t--}}function w(i){var l=i||t;if(l>0){return true}else{return false}}function m(i){var l=i;
if(l<0){return true}return(b("left",l)&&!q[l].leftSide)||(b("right",l)&&!q[l].rightSide)
}function j(l,y){var i=(y<l)?"left":"right";if(l<0||y<0){return false}if(!b(i,l)){return false
}if(!p(y)){return false}if(b(i,l)==p(y)){return true}else{return false}}function o(i){var l=i;
if(!m(l)){return false}if(!w(l)){return false}if(j(l,l-1)){return true}else{return false
}}function e(i){var l=i;if(m(l)){return false}if(!w(l)){return false}if(!m(l-1)){return false
}if(j(l-1,l)){return true}else{return false}}function h(i){var l=i;if(l<1){return false
}q[l].leftSide=q[l-1];g(l-1)}function x(i){var l=i;if(l<1){return false}q[l-1].rightSide=q[l];
g(l)}function f(i){g(i);g(v.pop())}for(t=0;t<q.length;t++){c=false;if(q[t].tokenType=="UNKNOWN"){s.push("found unknown token: "+q[t].tokenValue)
}if(q[t].tokenType=="OPEN_PAREN"){v.push(t)}if(q[t].tokenType=="CLOSE_PAREN"){f(t)
}if(o(t)){h(t)}if(e(t)){x(t);c=true}if(c){t--}}if(q.length==1){q=q[0]}else{s.push("string did not resolve to a single tree")
}if(s.length>0){return{error:s.join(",\n"),tree:q}}else{return q}},buildOrder:function(c){if(!c){return[]
}else{var e=c.split(",");for(var a=0;a<e.length;a++){var b=e[a];b=b.replace(/^\s+|\s+$/,"");
b=b.replace(/\s+/,",");b=b.split(",");e[a]={propertyName:b[0]};if(b[1]&&b[1]=="DESC"){e[a].descending=true
}}return e}}});SC.Query.mixin({LOCAL:"local",REMOTE:"remote",storeKeyFor:function(a){return a?a.get("storeKey"):null
},containsRecords:function(h,f,e){var g=[];for(var b=0,a=f.get("length");b<a;b++){var c=f.objectAt(b);
if(c&&h.contains(c)){g.push(c.get("storeKey"))}}g=SC.Query.orderStoreKeys(g,h,e);
return g},orderStoreKeys:function(e,f,b){if(e){var a=SC.Query;tempStores=a._TMP_STORES;
tempQueryKeys=a._TMP_QUERY_KEYS;if(!tempStores){tempStores=a._TMP_STORES=[]}if(!tempQueryKeys){tempQueryKeys=a._TMP_QUERY_KEYS=[]
}tempStores.push(b);tempQueryKeys.push(f);var c=e.sort(SC.Query.compareStoreKeys);
a._TMP_STORES.pop();a._TMP_QUERY_KEYS.pop()}return e},compareStoreKeys:function(f,e){var b=SC.Query,c=b._TMP_STORES,a=b._TMP_QUERY_KEYS;
store=c[c.length-1],queryKey=a[a.length-1],record1=store.materializeRecord(f),record2=store.materializeRecord(e);
return queryKey.compare(record1,record2)},build:function(i,c,h,e){var a=null,g,b,j,f;
if(c&&c.isQuery){if(c.get("location")===i){return c}else{return c.copy().set("location",i).freeze()
}}if(typeof c===SC.T_STRING){g=SC.objectForPropertyPath(c);if(!g){throw"%@ did not resolve to a class".fmt(c)
}c=g}else{if(c&&c.isEnumerable){g=[];c.forEach(function(l){if(typeof l===SC.T_STRING){l=SC.objectForPropertyPath(l)
}if(!l){throw"cannot resolve record types: %@".fmt(c)}g.push(l)},this);c=g}else{if(!c){c=SC.Record
}}}if(e===undefined){e=null}if(h===undefined){h=null}if(!e&&(typeof h!==SC.T_STRING)){a=h;
h=null}if(!e&&!a){f=SC.Query._scq_recordTypeCache;if(!f){f=SC.Query._scq_recordTypeCache={}
}b=f[i];if(!b){b=f[i]={}}if(c.isEnumerable){j=c.map(function(l){return SC.guidFor(l)
});j=j.sort().join(":")}else{j=SC.guidFor(c)}if(h){j=[j,h].join("::")}g=b[j];if(!g){if(c.isEnumerable){a={recordTypes:c.copy()}
}else{a={recordType:c}}a.location=i;a.conditions=h;g=b[j]=SC.Query.create(a).freeze()
}}else{if(!a){a={}}if(!a.location){a.location=i}if(c&&c.isEnumerable){a.recordsTypes=c
}else{a.recordType=c}if(h){a.conditions=h}if(e){a.parameters=e}g=SC.Query.create(a).freeze()
}return g},local:function(c,a,b){return this.build(SC.Query.LOCAL,c,a,b)},remote:function(c,a,b){return this.build(SC.Query.REMOTE,c,a,b)
},_scq_didDefineRecordType:function(){var a=SC.Query._scq_queriesWithExpandedRecordTypes;
if(a){a.forEach(function(b){b.notifyPropertyChange("expandedRecordTypes")},this);
a.clear()}}});SC.Query.comparisons={};SC.Query.registerComparison=function(a,b){SC.Query.comparisons[a]=b
};SC.Query.registerQueryExtension=function(b,a){SC.Query.prototype.queryLanguage[b]=a
};SC.Q=SC.Query.from;sc_require("models/record");SC.RecordArray=SC.Object.extend(SC.Enumerable,SC.Array,{store:null,query:null,storeKeys:null,status:SC.Record.EMPTY,isEditable:function(){var a=this.get("query");
return a?a.get("isEditable"):NO}.property("query").cacheable(),length:function(){this.flush();
var a=this.get("storeKeys");return a?a.get("length"):0}.property("storeKeys").cacheable(),_scra_records:null,objectAt:function(a){this.flush();
var g=this._scra_records,f=this.get("storeKeys"),b=this.get("store"),e,c;if(!f||!b){return undefined
}if(g&&(c=g[a])){return c}if(!g){this._scra_records=g=[]}e=f.objectAt(a);if(e){if(b.peekStatus(e)===SC.Record.EMPTY){b.retrieveRecord(null,null,e)
}g[a]=c=b.materializeRecord(e)}return c},forEach:function(i,e){this.flush();var f=this._scra_records,b=this.get("storeKeys"),g=this.get("store"),c=b?b.get("length"):0,h,j,a;
if(!b||!g){return this}if(!f){f=this._scra_records=[]}if(!e){e=this}for(h=0;h<c;h++){a=f[h];
if(!a){a=f[h]=g.materializeRecord(b.objectAt(h))}i.call(e,a,h,this)}return this},replace:function(b,j,h){this.flush();
var f=this.get("storeKeys"),a=h?(h.get?h.get("length"):h.length):0,c,e;if(!f){throw"storeKeys required"
}var g=this.get("query");if(g&&!g.get("isEditable")){throw SC.RecordArray.NOT_EDITABLE
}e=[];for(c=0;c<a;c++){e[c]=h.objectAt(c).get("storeKey")}f.replace(b,j,e);return this
},contains:function(a){return this.indexOf(a)>=0},indexOf:function(b,a){if(!SC.kindOf(b,SC.Record)){return NO
}this.flush();var e=b.get("storeKey"),c=this.get("storeKeys");return c?c.indexOf(e,a):-1
},lastIndexOf:function(b,a){if(!SC.kindOf(b,SC.Record)){return NO}this.flush();var e=b.get("storeKey"),c=this.get("storeKeys");
return c?c.lastIndexOf(e,a):-1},add:function(a){if(!SC.kindOf(a,SC.Record)){return this
}if(this.indexOf(a)<0){this.pushObject(a)}return this},remove:function(a){if(!SC.kindOf(a,SC.Record)){return this
}this.removeObject(a);return this},find:function(a,b){if(a&&a.isQuery){return this.get("store").find(a.queryWithScope(this))
}else{return arguments.callee.base.apply(this,arguments)}},refresh:function(){this.get("store").refreshQuery(this.get("query"));
return this},reload:function(){this.flush(YES);return this},destroy:function(){if(!this.get("isDestroyed")){this.get("store").recordArrayWillDestroy(this)
}arguments.callee.base.apply(this,arguments)},storeWillFetchQuery:function(c){var b=this.get("status"),a=SC.Record;
if((b===a.EMPTY)||(b===a.ERROR)){b=a.BUSY_LOADING}if(b&a.READY){b=a.BUSY_REFRESH}this.setIfChanged("status",b);
return this},storeDidFetchQuery:function(a){this.setIfChanged("status",SC.Record.READY_CLEAN);
return this},storeDidCancelQuery:function(c){var b=this.get("status"),a=SC.Record;
if(b===a.BUSY_LOADING){b=a.EMPTY}else{if(b===a.BUSY_REFRESH){b=a.READY_CLEAN}}this.setIfChanged("status",b);
return this},storeDidErrorQuery:function(a){this.setIfChanged("status",SC.Record.ERROR);
return this},storeDidChangeStoreKeys:function(b,a){var c=this.get("query");if(c.get("location")!==SC.Query.LOCAL){return this
}if(!c.containsRecordTypes(a)){return this}var e=this._scq_changedStoreKeys;if(!e){e=this._scq_changedStoreKeys=SC.IndexSet.create()
}e.addEach(b);this.set("needsFlush",YES);this.enumerableContentDidChange();return this
},flush:function(a){if(this._insideFlush){this.set("needsFlush",YES);return this}if(!this.get("needsFlush")&&!a){return this
}this.set("needsFlush",NO);var j=this.get("query"),n=this.get("store");if(!n||!j||j.get("location")!==SC.Query.LOCAL){return this
}this._insideFlush=YES;var h=this.get("storeKeys"),f=this._scq_changedStoreKeys,g=NO,l=SC.Record,c,e,b,p,o,i;
var m=h;if(h&&!a){if(f){f.forEach(function(q){e=n.peekStatus(q);if(!(e&l.EMPTY)&&!((e&l.DESTROYED)||(e===l.BUSY_DESTROYING))){c=n.materializeRecord(q);
i=!!(c&&j.contains(c))}else{i=NO}if(i){if(h.indexOf(q)<0){if(!g){h=h.copy()}h.pushObject(q)
}}else{if(h.indexOf(q)>=0){if(!g){h=h.copy()}h.removeObject(q)}}},this);g=YES}}else{if(o=j.get("scope")){p=o.flush().get("storeKeys")
}else{if(b=j.get("expandedRecordTypes")){p=SC.IndexSet.create();b.forEach(function(q){p.addEach(n.storeKeysFor(b))
})}}h=[];p.forEach(function(q){e=n.peekStatus(q);if(!(e&l.EMPTY)&&!((e&l.DESTROYED)||(e===l.BUSY_DESTROYING))){c=n.materializeRecord(q);
if(c&&j.contains(c)){h.push(q)}}});g=YES}if(f){f.clear()}if(g){if(h&&(h===m)){h=h.copy()
}h=SC.Query.orderStoreKeys(h,j,n);if(SC.compare(m,h)!==0){this.set("storeKeys",SC.clone(h))
}}this._insideFlush=NO;return this},needsFlush:YES,isError:function(){return this.get("status")&SC.Record.ERROR
}.property("status").cacheable(),errorValue:function(){return this.get("isError")?SC.val(this.get("errorObject")):null
}.property("isError").cacheable(),errorObject:function(){if(this.get("isError")){var a=this.get("store");
return a.readQueryError(this.get("query"))||SC.Record.GENERIC_ERROR}else{return null
}}.property("isError").cacheable(),_storeKeysDidChange:function(){var e=this.get("storeKeys");
var c=this._prevStoreKeys,g=this._storeKeysContentDidChange,a=this._storeKeysStateDidChange;
if(e===c){return}if(c){c.removeObserver("[]",this,g)}this._prevStoreKeys=e;if(e){e.addObserver("[]",this,g)
}var b=(e)?e.propertyRevision:-1;this._storeKeysContentDidChange(e,"[]",e,b)}.observes("storeKeys"),_storeKeysContentDidChange:function(e,b,c,a){if(this._scra_records){this._scra_records.length=0
}this.beginPropertyChanges().notifyPropertyChange("length").enumerableContentDidChange().endPropertyChanges()
},init:function(){arguments.callee.base.apply(this,arguments);this._storeKeysDidChange()
}});SC.RecordArray.mixin({NOT_EDITABLE:SC.Error.desc("SC.RecordArray is not editable")});
if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/datastore")
}SC.Locale=SC.Object.extend({init:function(){if(!this.language){SC.Locale._assignLocales()
}if(!this.hasStrings){var c=this._deprecatedLanguageCodes||[];c.push(this.language);
var b=c.length;var a=null;while(!a&&--b>=0){a=String[c[b]]}if(a){this.hasStrings=YES;
this.strings=a}}},hasStrings:NO,strings:{},toString:function(){if(!this.language){SC.Locale._assignLocales()
}return"SC.Locale["+this.language+"]"+SC.guidFor(this)},locWithDefault:function(a,b){return this.strings[a]||b||a
}});SC.Locale.mixin({useAutodetectedLanguage:NO,preferredLanguage:null,createCurrentLocale:function(){var c=(String.useAutodetectedLanguage!==undefined)?String.useAutodetectedLanguage:this.useAutodetectedLanguage;
var b=(String.preferredLanguage!==undefined)?String.preferredLanguage:this.preferredLanguage;
var e=((c)?SC.browser.language:null)||b||SC.browser.language||"en";e=SC.Locale.normalizeLanguage(e);
var a=this.localeClassFor(e);if(e!=this.currentLanguage){this.currentLanguage=e;this.currentLocale=a.create()
}return this.currentLocale},localeClassFor:function(c){c=SC.Locale.normalizeLanguage(c);
var b,a=this.locales[c];if(!a&&((b=c.split("-")[0])!==c)&&(a=this.locales[b])){a=this.locales[c]=a.extend()
}if(!a){a=this.locales[c]=this.locales.en.extend()}return a},define:function(b,c){var a;
if(c===undefined&&(SC.typeOf(b)!==SC.T_STRING)){a=this;c=b}else{a=SC.Locale.localeClassFor(b)
}SC.mixin(a.prototype,c);return a},options:function(){return this.prototype},addStrings:function(b){var a=this.prototype.strings;
if(a){if(!this.prototype.hasOwnProperty("strings")){this.prototype.strings=SC.clone(a)
}}else{a=this.prototype.strings={}}if(b){this.prototype.strings=SC.mixin(a,b)}this.prototype.hasStrings=YES;
return this},_map:{english:"en",french:"fr",german:"de",japanese:"ja",jp:"ja",spanish:"es"},normalizeLanguage:function(a){if(!a){return"en"
}return SC.Locale._map[a.toLowerCase()]||a},_assignLocales:function(){for(var a in this.locales){this.locales[a].prototype.language=a
}},toString:function(){if(!this.prototype.language){SC.Locale._assignLocales()}return"SC.Locale["+this.prototype.language+"]"
},extend:function(){var a=SC.Object.extend.apply(this,arguments);a.addStrings=SC.Locale.addStrings;
a.define=SC.Locale.define;a.options=SC.Locale.options;a.toString=SC.Locale.toString;
return a}});SC.Locale.locales={en:SC.Locale.extend({_deprecatedLanguageCodes:["English"]}),fr:SC.Locale.extend({_deprecatedLanguageCodes:["French"]}),de:SC.Locale.extend({_deprecatedLanguageCodes:["German"]}),ja:SC.Locale.extend({_deprecatedLanguageCodes:["Japanese","jp"]}),es:SC.Locale.extend({_deprecatedLanguageCodes:["Spanish"]})};
SC.stringsFor=function(c,b){var a=SC.Locale.localeClassFor(c);a.addStrings(b);return this
};sc_require("system/locale");SC.stringsFor("English",{"_SC.DateTime.dayNames":"Sunday Monday Tuesday Wednesday Thursday Friday Saturday","_SC.DateTime.abbreviatedDayNames":"Sun Mon Tue Wed Thu Fri Sat","_SC.DateTime.monthNames":"January February March April May June July August September October November December","_SC.DateTime.abbreviatedMonthNames":"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec"});
SC.DROP_ON=1;SC.DROP_BEFORE=2;SC.DROP_AFTER=4;SC.DROP_ANY=7;SC.SAFARI_FOCUS_BEHAVIOR=YES;
SC.mixin({data:function(c,b,e){c=(c===window)?"@window":c;var f=SC.hashFor(c);var a=SC._data_cache;
if(!a){SC._data_cache=a={}}var g=a[f];if(b&&!g){a[f]=g={}}if(g&&(e!==undefined)){g[b]=e
}return(b)?g[b]:g},removeData:function(e,c){e=(e===window)?"@window":e;var f=SC.hashFor(e);
var a=SC._data_cache;if(!a){return undefined}var g=a[f];if(!g){return undefined}var b=(c)?g[c]:g;
if(c){delete g[c]}else{delete a[f]}return b}});SC.mixin(Function.prototype,{invokeLater:function(h,a){if(a===undefined){a=1
}var g=this;if(arguments.length>2){var b=SC.$A(arguments).slice(2,arguments.length);
b.unshift(h);var e=this,c=g;g=function(){return c.apply(e,b.slice(1))}}return SC.Timer.schedule({target:h,action:g,interval:a})
}});SC.Controller=SC.Object.extend({isEditable:YES});SC.SelectionSupport={hasSelectionSupport:YES,allowsSelection:YES,allowsMultipleSelection:YES,allowsEmptySelection:YES,firstSelectableObject:function(){return this.get("firstObject")
}.property(),selection:function(c,g){var b=this._scsel_selection,h=b?b.get("length"):0,e,f,a;
if((g===undefined)||!this.get("allowsSelection")){g=b}a=(g&&g.isEnumerable)?g.get("length"):0;
if((a>1)&&!this.get("allowsMultipleSelection")){if(h>1){g=SC.SelectionSet.create().addObject(b.get("firstObject")).freeze();
a=1}else{g=b;a=h}}if((a===0)&&!this.get("allowsEmptySelection")){if(h===0){g=this.get("firstSelectableObject");
if(g){g=SC.SelectionSet.create().addObject(g).freeze()}else{g=SC.SelectionSet.EMPTY
}a=g.get("length")}else{g=b;a=h}}if(a===0){g=SC.SelectionSet.EMPTY}g=g.frozenCopy();
this._scsel_selection=g;return g}.property("arrangedObjects","allowsEmptySelection","allowsMultipleSelection","allowsSelection").cacheable(),hasSelection:function(){var a=this.get("selection");
return !!a&&(a.get("length")>0)}.property("selection").cacheable(),selectObjects:function(b,c){if(!b||b.get("length")===0){if(!c){this.set("selection",SC.SelectionSet.EMPTY)
}return this}var a=this.get("selection");if(c&&a){a=a.copy()}else{a=SC.SelectionSet.create()
}a.addObjects(b).freeze();this.set("selection",a);return this},selectObject:function(a,b){if(a===null){if(!b){this.set("selection",null)
}return this}else{return this.selectObjects([a],b)}},deselectObjects:function(b){if(!b||b.get("length")===0){return this
}var a=this.get("selection");if(!a||a.get("length")===0){return this}a=a.copy().removeObjects(b).freeze();
this.set("selection",a.freeze());return this},deselectObject:function(a){if(!a){return this
}else{return this.deselectObjects([a])}},updateSelectionAfterContentChange:function(){var f=this.get("arrangedObjects"),g=this.get("selection"),e=g,c,b,a;
if(e&&f&&e.get("sources").indexOf(f)>=0){c=e.indexSetForSource(f);b=f.get("length");
a=c?c.get("max"):0;if(a>b){e=e.copy().remove(f,b,a-b).freeze();this.set("selection",e)
}}if(e===g){b=g?g.get("length"):0;a=f?f.get("length"):0;if((b===0)&&!this.get("allowsEmptySelection")&&a>0){this.notifyPropertyChange("selection")
}}return this}};sc_require("controllers/controller");sc_require("mixins/selection_support");
SC.ArrayController=SC.Controller.extend(SC.Array,SC.SelectionSupport,{content:null,isEditable:YES,orderBy:null,allowsSingleContent:YES,destroyOnRemoval:NO,arrangedObjects:function(){return this
}.property().cacheable(),canRemoveContent:function(){var b=this.get("content"),a;
a=!!b&&this.get("isEditable")&&this.get("hasContent");if(a){return !b.isEnumerable||(SC.typeOf(b.removeObject)===SC.T_FUNCTION)
}else{return NO}}.property("content","isEditable","hasContent"),canReorderContent:function(){var b=this.get("content"),a;
a=!!b&&this.get("isEditable")&&!this.get("orderBy");return a&&!!b.isSCArray}.property("content","isEditable","orderBy"),canAddContent:function(){var b=this.get("content"),a;
a=b&&this.get("isEditable")&&b.isEnumerable;if(a){return(SC.typeOf(b.addObject)===SC.T_FUNCTION)||(SC.typeOf(b.pushObject)===SC.T_FUNCTION)
}else{return NO}}.property("content","isEditable"),hasContent:function(){var a=this.get("content");
return !!a&&(!!a.isEnumerable||!!this.get("allowsSingleContent"))}.property("content","allowSingleContent"),status:function(){var b=this.get("content"),a=b?b.get("status"):null;
return a?a:SC.Record.READY}.property().cacheable(),addObject:function(a){if(!this.get("canAddContent")){throw"%@ cannot add content".fmt(this)
}var b=this.get("content");if(b.isSCArray){b.pushObject(a)}else{if(b.addObject){b.addObject(a)
}else{throw"%@.content does not support addObject".fmt(this)}}return this},removeObject:function(a){if(!this.get("canRemoveContent")){throw"%@ cannot remove content".fmt(this)
}var b=this.get("content");if(b.isEnumerable){b.removeObject(a)}else{this.set("content",null)
}if(this.get("destroyOnRemoval")&&a.destroy){a.destroy()}return this},length:function(){var a=this._scac_observableContent();
return a?a.get("length"):0}.property().cacheable(),objectAt:function(a){var b=this._scac_observableContent();
return b?b.objectAt(a):undefined},replace:function(h,g,e){if(!e||e.get("length")===0){if(!this.get("canRemoveContent")){throw"%@ cannot remove objects from the current content".fmt(this)
}}else{if(!this.get("canReorderContent")){throw"%@ cannot add or reorder the current content".fmt(this)
}}var c=this.get("content");var b=[],a,f;if(this.get("destroyOnRemoval")){for(a=0;
a<g;a++){b.push(c.objectAt(a+h))}}if(c){c.replace(h,g,e)}for(a=0,f=b.length;a<f;a++){b[a].destroy()
}b=null;return this},indexOf:function(b,a){var c=this._scac_observableContent();return c?c.indexOf(b,a):-1
},init:function(){arguments.callee.base.apply(this,arguments);this._scac_contentDidChange()
},_scac_cached:NO,_scac_observableContent:function(){var b=this._scac_cached;if(b!==NO){return b
}var f=this.get("content"),g,e,c,a;if(SC.none(f)){return this._scac_cached=[]}if(!f.isEnumerable){b=this.get("allowsSingleContent")?[f]:[];
return(this._scac_cached=b)}g=this.get("orderBy");if(!g){if(f.isSCArray){return(this._scac_cached=f)
}else{throw"%@.orderBy is required for unordered content".fmt(this)}}switch(SC.typeOf(g)){case SC.T_STRING:g=[g];
break;case SC.T_FUNCTION:e=g;break;case SC.T_ARRAY:break;default:throw"%@.orderBy must be Array, String, or Function".fmt(this)
}if(!e){a=g.get("length");e=function(l,i){var h=0,j=0,m,o,n;for(h=0;(h<a)&&(j===0);
h++){m=g.objectAt(h);if(!l){o=l}else{if(l.isObservable){o=l.get(m)}else{o=l[m]}}if(!i){n=i
}else{if(i.isObservable){n=i.get(m)}else{n=i[m]}}j=SC.compare(o,n)}return j}}b=[];
f.forEach(function(h){b.push(h)});b.sort(e);e=null;return(this._scac_cached=b)},_scac_contentDidChange:function(){this._scac_cached=NO;
var i=this.get("content"),e=!!this.get("orderBy"),j=this._scac_content,a=this._scac_length||0,h=this._scac_rangeObserver,b=this._scac_rangeDidChange,g=this._scac_enumerableDidChange,c=this._scac_contentStatusDidChange,f;
if(j===i){return this}if(j){if(h&&j.isSCArray){j.removeRangeObserver(h)}else{if(j.isEnumerable){j.removeObserver("[]",this,g)
}}j.removeObserver("status",this,c)}h=null;this._scac_cached=NO;this._scac_content=i;
if(i){if(!e&&i.isSCArray){h=i.addRangeObserver(null,this,b)}else{if(i.isEnumerable){i.addObserver("[]",this,g)
}}f=i.isEnumerable?i.get("length"):1;i.addObserver("status",this,c)}else{f=SC.none(i)?0:1
}this._scac_rangeObserver=h;this._scac_length=f;this._scac_contentStatusDidChange();
this.enumerableContentDidChange(0,f,f-a);this.updateSelectionAfterContentChange()
}.observes("content"),_scac_enumerableDidChange:function(){var a=this.get("content"),c=a?a.get("length"):0,b=this._scac_length;
this._scac_length=c;this.beginPropertyChanges();this._scac_cached=NO;this.enumerableContentDidChange(0,c,c-b);
this.endPropertyChanges();this.updateSelectionAfterContentChange()}.observes("orderBy"),_scac_rangeDidChange:function(f,e,b,a){if(b!=="[]"){return
}var c=this.get("content");this._scac_length=c.get("length");this._scac_cached=NO;
if(a){this.beginPropertyChanges();a.forEachRange(function(h,g){this.enumerableContentDidChange(h,g,0)
},this);this.endPropertyChanges();this.updateSelectionAfterContentChange()}},_scac_contentStatusDidChange:function(){this.notifyPropertyChange("status")
}});require("controllers/controller");SC.ObjectController=SC.Controller.extend({content:null,allowsMultipleContent:NO,hasContent:function(){return !SC.none(this.get("observableContent"))
}.property("observableContent"),isEditable:YES,observableContent:function(){var b=this.get("content"),a,c;
if(b&&b.isEnumerable){a=b.get("length");c=this.get("allowsMultipleContent");if(a===1){b=b.firstObject()
}else{if(a===0||!c){b=null}}if(b&&!c&&b.isEnumerable){b=null}}return b}.property("content","allowsMultipleContent").cacheable(),destroy:function(){var a=this.get("observableContent");
if(a&&SC.typeOf(a.destroy)===SC.T_FUNCTION){a.destroy()}this.set("content",null);
return this},contentPropertyDidChange:function(b,a){if(a==="*"){this.allPropertiesDidChange()
}else{this.notifyPropertyChange(a)}},unknownProperty:function(b,e){if(b==="content"){if(e!==undefined){this.content=e
}return this.content}var c=this.get("observableContent"),g,f,a;if(c===null||c===undefined){return undefined
}if(e===undefined){if(c.isEnumerable){e=c.getEach(b);g=e.get("length");if(g>0){a=YES;
f=e.objectAt(0);while((--g>0)&&a){if(f!==e.objectAt(g)){a=NO}}if(a){e=f}}else{e=undefined
}}else{e=(c.isObservable)?c.get(b):c[b]}}else{if(!this.get("isEditable")){throw"%@.%@ is not editable".fmt(this,b)
}if(c.isEnumerable){c.setEach(b,e)}else{if(c.isObservable){c.set(b,e)}else{c[b]=e
}}}return e},init:function(){arguments.callee.base.apply(this,arguments);if(this.get("observableContent")){this._scoc_contentDidChange()
}},_scoc_contentDidChange:function(){var b=this._scoc_observableContent,e=this.get("observableContent"),a=this.contentPropertyDidChange,c=this._scoc_enumerableContentDidChange;
if(b===e){return this}this._scoc_observableContent=e;if(b){if(b.isEnumerable){b.removeObserver("[]",this,c)
}else{if(b.isObservable){b.removeObserver("*",this,a)}}}if(e){if(e.isEnumerable){e.addObserver("[]",this,c)
}else{if(e.isObservable){e.addObserver("*",this,a)}}}if((b&&b.isEnumerable)||(e&&e.isEnumerable)){this._scoc_enumerableContentDidChange()
}else{this.contentPropertyDidChange(e,"*")}}.observes("observableContent"),_scoc_enumerableContentDidChange:function(){var b=this.get("observableContent"),c=this._scoc_observableContentItems,a=this.contentPropertyDidChange;
if(c){c.forEach(function(e){if(e.isObservable){e.removeObserver("*",this,a)}},this);
c.clear()}if(b&&b.isEnumerable){if(!c){c=SC.Set.create()}b.forEach(function(e){if(c.contains(e)){return
}c.add(e);if(e.isObservable){e.addObserver("*",this,a)}},this)}else{c=null}this._scoc_observableContentItems=c;
this.contentPropertyDidChange(b,"*");return this}});SC.TreeItemContent={isTreeItemContent:YES,treeItemChildren:null,treeItemIsExpanded:YES,treeItemIsGrouped:NO,treeItemDisclosureState:function(b,a){return this.get("treeItemIsExpanded")?SC.BRANCH_OPEN:SC.BRANCH_CLOSED
},treeItemCollapse:function(b,a){this.setIfChanged("treeItemIsExpanded",NO)},treeItemExpand:function(b,a){this.setIfChanged("treeItemIsExpanded",YES)
},treeItemBranchIndexes:function(f,c){var e=this.get("treeItemChildren"),b,h,a,g;
if(!e){return null}b=SC.IndexSet.create();h=e.get("length");for(a=0;a<h;a++){if(!(g=e.objectAt(a))){continue
}if(!g.get("treeItemChildren")){continue}if(g.treeItemDisclosureState(this,a)!==SC.LEAF_NODE){b.add(a)
}}return b.get("length")>0?b:null}};SC.BRANCH_OPEN=17;SC.BRANCH_CLOSED=18;SC.LEAF_NODE=32;
SC.CollectionContent={isCollectionContent:YES,contentIndexIsSelected:function(b,c,a){var e=b.get("selection");
return e?e.contains(c,a):NO},contentIndexIsEnabled:function(b,c,a){return b.get("isEnabled")
},contentGroupIndexes:function(a,b){return null},contentIndexIsGroup:function(b,c,a){return NO
},contentIndexOutlineLevel:function(b,c,a){return -1},contentIndexDisclosureState:function(b,c,a){return SC.LEAF_NODE
},contentIndexExpand:function(b,c,a){console.log("contentIndexExpand(%@, %@, %@)".fmt(b,c,a))
},contentIndexCollapse:function(b,c,a){console.log("contentIndexCollapse(%@, %@, %@)".fmt(b,c,a))
}};sc_require("mixins/tree_item_content");sc_require("mixins/collection_content");
SC.TreeItemObserver=SC.Object.extend(SC.Array,SC.CollectionContent,{item:null,delegate:null,parentObserver:null,parentItem:function(){var a=this.get("parentObserver");
return a?a.get("item"):null}.property("parentObserver").cacheable(),index:null,outlineLevel:0,children:null,disclosureState:SC.BRANCH_OPEN,branchIndexes:function(){var f=this.get("item"),b,g,a,e,c;
if(!f){return SC.IndexSet.EMPTY}else{if(f.isTreeItemContent){g=this.get("parentItem");
a=this.get("index");return f.treeItemBranchIndexes(g,a)}else{e=this.get("children");
if(!e){return null}c=SC.IndexSet.create();b=e.get("length");g=f;for(a=0;a<b;a++){if(!(f=e.objectAt(a))){continue
}if(!this._computeChildren(f,g,a)){continue}if(this._computeDisclosureState(f,g,a)!==SC.LEAF_NODE){c.add(a)
}}return c.get("length")>0?c:null}}}.property("children").cacheable(),isHeaderVisible:function(){return !!this.get("parentObserver")
}.property("parentObserver").cacheable(),length:0,objectAt:function(e){var a=this.get("length"),g=this.get("item"),b=this._objectAtCache,i=e,h=0,c,f;
if(e>=a){return undefined}if(this.get("isHeaderVisible")){if(e===0){return g}else{i--
}}g=null;if(!b){b=this._objectAtCache=[]}if((g=b[e])!==undefined){return g}f=this.get("children");
if(!f){return undefined}if(c=this.get("branchIndexes")){c.forEach(function(m){if(g||(m>i)){return
}var l=this.branchObserverAt(m),j;if(!l){return}j=l.get("length");if(m+j>i){g=l.objectAt(i-m);
i=-1}else{i-=j-1}},this)}if(i>=0){g=f.objectAt(i)}b[e]=g;return g},replace:function(a,b,l,e){var j=a,h=null,f,g,i;
if(e===undefined){e=SC.DROP_BEFORE}if(this.get("isHeaderVisible")){j--}if(j<0){throw"Tree Item cannot replace itself"
}if(f=this.get("branchIndexes")){f.forEach(function(m){if(h||(m>=j)){return}if(!(h=this.branchObserverAt(m))){return
}g=h.get("length");if((m+g===j)&&e===SC.DROP_AFTER){j-=m}else{if(m+g>j){j-=m}else{j-=g-1;
h=null}}},this)}if(h){h.replace(j,b,l,e);return this}i=j+b;if(b>1&&f){f.forEachIn(j,f.get("max")-j,function(m){if(m>i){return
}if(!(h=this.branchObserverAt(m))){return}g=h.get("length");i-=g-1},this)}b=i-j;var c=this.get("children");
if(!c){throw"cannot replace() tree item with no children"}if((b<0)||(i>c.get("length"))){throw"replace() range must lie within a single tree item"
}c.replace(j,b,l,e);return this},observerContentDidChange:function(h,g,f){this.invalidateBranchObserversAt(h);
this._objectAtCache=this._outlineLevelCache=null;this._disclosureStateCache=null;
this._contentGroupIndexes=NO;this.notifyPropertyChange("branchIndexes");var b=this.get("length"),c=this._computeLength(),a=this.get("parentObserver"),e;
if(b!==c){this.set("length",c)}if(!this._notifyParent){return this}if(a){e=SC.IndexSet.create(this.get("index"));
a._childrenRangeDidChange(a.get("children"),null,"[]",e)}else{if(b===c){g=this.expandChildIndex(h+g);
h=this.expandChildIndex(h);g=g-h;f=0}else{h=this.expandChildIndex(h);g=c-h;f=c-b}this.enumerableContentDidChange(h,g,f)
}},expandChildIndex:function(c){var b=c;if(this.get("isHeaderVisible")){c++}var a=this.get("branchIndexes");
if(!a||a.get("length")===0){return b}a.forEachIn(0,c,function(e){b+=this.branchObserverAt(e).get("length")-1
},this);return b},_contentGroupIndexes:NO,contentGroupIndexes:function(h,f){if(f!==this){return null
}var g=this._contentGroupIndexes;if(g!==NO){return g}if(this.get("parentObserver")){return null
}var l=this.get("item"),j,b,e,i,c,a;if(l&&l.isTreeItemContent){j=l.get("treeItemIsGrouped")
}else{j=!!this.delegate.get("treeItemIsGrouped")}if(j){g=SC.IndexSet.create();b=this.get("branchIndexes");
a=this.get("children");e=a?a.get("length"):0;i=c=0;if(b){b.forEach(function(n){g.add(i,(n+1)-c);
i+=(n+1)-c;c=n+1;var m=this.branchObserverAt(n);if(m){i+=m.get("length")-1}},this)
}if(c<e){g.add(i,e-c)}}else{g=null}this._contentGroupIndexes=g;return g},contentIndexIsGroup:function(b,e,a){var c=this.contentGroupIndexes(b,e);
return c?c.contains(a):NO},contentIndexOutlineLevel:function(l,h,f){if(h!==this){return -1
}var a=this._outlineLevelCache;if(a&&(a[f]!==undefined)){return a[f]}if(!a){a=this._outlineLevelCache=[]
}var g=this.get("length"),m=f,e=0,i=null,c,b,j;if(f>=g){return -1}if(this.get("isHeaderVisible")){if(f===0){return a[0]=this.get("outlineLevel")-1
}else{m--}}if(c=this.get("branchIndexes")){c.forEach(function(p){if((i!==null)||(p>m)){return
}var o=this.branchObserverAt(p),n;if(!o){return}n=o.get("length");if(p+n>m){i=o.contentIndexOutlineLevel(l,o,m-p);
m=-1}else{m-=n-1}},this)}if(m>=0){i=this.get("outlineLevel")}a[f]=i;return i},contentIndexDisclosureState:function(l,h,f){if(h!==this){return -1
}var a=this._disclosureStateCache;if(a&&(a[f]!==undefined)){return a[f]}if(!a){a=this._disclosureStateCache=[]
}var g=this.get("length"),m=f,e=0,i=null,c,b,j;if(f>=g){return SC.LEAF_NODE}if(this.get("isHeaderVisible")){if(f===0){return a[0]=this.get("disclosureState")
}else{m--}}if(c=this.get("branchIndexes")){c.forEach(function(p){if((i!==null)||(p>m)){return
}var o=this.branchObserverAt(p),n;if(!o){return}n=o.get("length");if(p+n>m){i=o.contentIndexDisclosureState(l,o,m-p);
m=-1}else{m-=n-1}},this)}if(m>=0){i=SC.LEAF_NODE}a[f]=i;return i},contentIndexExpand:function(b,g,a){var c,h=a,e,f;
if(g!==this){return}if(this.get("isHeaderVisible")){if(a===0){this._expand(this.get("item"));
return}else{h--}}if(c=this.get("branchIndexes")){c.forEach(function(m){if(m>=h){return
}var l=this.branchObserverAt(m),j;if(!l){return}j=l.get("length");if(m+j>h){l.contentIndexExpand(b,l,h-m);
h=-1}else{h-=j-1}},this)}if(h>=0){e=this.get("children");f=e?e.objectAt(h):null;if(f){this._expand(f,this.get("item"),h)
}}},contentIndexCollapse:function(b,g,a){var c,e,f,h=a;if(g!==this){return}if(this.get("isHeaderVisible")){if(a===0){this._collapse(this.get("item"));
return}else{h--}}if(c=this.get("branchIndexes")){c.forEach(function(m){if(m>=h){return
}var l=this.branchObserverAt(m),j;if(!l){return}j=l.get("length");if(m+j>h){l.contentIndexCollapse(b,l,h-m);
h=-1}else{h-=j-1}},this)}if(h>=0){e=this.get("children");f=e?e.objectAt(h):null;if(f){this._collapse(f,this.get("item"),h)
}}},branchObserverAt:function(e){var h=this._branchObserversByIndex,c=this._branchObserverIndexes,f,i,b,l,a,g,j;
if(!h){h=this._branchObserversByIndex=[]}if(!c){c=this._branchObserverIndexes=SC.IndexSet.create()
}if(f=h[e]){return f}a=this.get("children");l=a?a.objectAt(e):null;if(!l){return null
}h[e]=f=SC.TreeItemObserver.create({item:l,delegate:this.get("delegate"),parentObserver:this,index:e,outlineLevel:this.get("outlineLevel")+1});
c.add(e);return f},invalidateBranchObserversAt:function(c){var b=this._branchObserversByIndex,a=this._branchObserverIndexes;
if(!b||b.length<=c){return this}if(c<0){c=0}a.forEachIn(c,a.get("max")-c,function(f){var e=b[f];
if(e){e.destroy()}},this);b.length=c;return this},init:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("item");if(!a){throw"SC.TreeItemObserver.item cannot be null"}a.addObserver("*",this,this._itemPropertyDidChange);
this._itemPropertyDidChange(a,"*");this._notifyParent=YES},destroy:function(){this.invalidateBranchObserversAt(0);
this._objectAtCache=null;var c=this.get("item");if(c){c.removeObserver("*",this,this._itemPropertyDidChange)
}var a=this._children,b=this._childrenRangeObserver;if(a&&b){a.removeRangeObserver(b)
}arguments.callee.base.apply(this,arguments)},_itemPropertyDidChange:function(g,b){var a=this.get("children"),f=this.get("disclosureState"),e=this.get("item"),c;
this.beginPropertyChanges();c=this._computeDisclosureState(e);if(f!==c){this.set("disclosureState",c)
}c=this._computeChildren(e);if(a!==c){this.set("children",c)}this.endPropertyChanges()
},_childrenDidChange:function(){var c=this.get("disclosureState"),e=c===SC.BRANCH_OPEN?this.get("children"):null,b=this._children,a=this._childrenRangeObserver;
if(b===e){return this}if(a){b.removeRangeObserver(a)}if(e){this._childrenRangeObserver=e.addRangeObserver(null,this,this._childrenRangeDidChange)
}else{this._childrenRangeObserver=null}this._children=e;this._childrenRangeDidChange(e,null,"[]",null)
}.observes("children","disclosureState"),_childrenRangeDidChange:function(g,j,i,e){var a=this.get("children"),f=a?a.get("length"):0,c=e?e.get("min"):0,h=e?e.get("max"):f,b=this._childrenLen||0;
this._childrenLen=f;this.observerContentDidChange(c,h-c,f-b)},_computeDisclosureState:function(e,f,b){var c,a;
if(!e||!this._computeChildren(e)){return SC.LEAF_NODE}else{if(e.isTreeItemContent){if(f===undefined){f=this.get("parentItem")
}if(b===undefined){b=this.get("index")}return e.treeItemDisclosureState(f,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}return e.get(c)?SC.BRANCH_OPEN:SC.BRANCH_CLOSED}}},_collapse:function(e,f,b){var c,a;
if(!e||!this._computeChildren(e)){return this}else{if(e.isTreeItemContent){if(f===undefined){f=this.get("parentItem")
}if(b===undefined){b=this.get("index")}e.treeItemCollapse(f,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}e.setIfChanged(c,NO)}}return this},_expand:function(e,f,b){var c,a;
if(!e||!this._computeChildren(e)){return this}else{if(e.isTreeItemContent){if(f===undefined){f=this.get("parentItem")
}if(b===undefined){b=this.get("index")}e.treeItemExpand(f,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}e.setIfChanged(c,YES)}}return this},_computeChildren:function(c){var a,b;
if(!c){return null}else{if(c.isTreeItemContent){return c.get("treeItemChildren")}else{b=this._treeItemChildrenKey;
if(!b){a=this.get("delegate");b=a?a.get("treeItemChildrenKey"):"treeItemChildren";
this._treeItemChildrenKey=b}return c.get(b)}}},_computeLength:function(){var b=this.get("isHeaderVisible")?1:0,e=this.get("disclosureState"),c=this.get("children"),a;
if((e===SC.BRANCH_OPEN)&&c){b+=c.get("length");if(a=this.get("branchIndexes")){a.forEach(function(f){var g=this.branchObserverAt(f);
b+=g.get("length")-1},this)}}return b}});sc_require("controllers/object");sc_require("mixins/selection_support");
sc_require("private/tree_item_observer");SC.TreeController=SC.ObjectController.extend(SC.SelectionSupport,{treeItemIsGrouped:NO,treeItemIsExpandedKey:"treeItemIsExpanded",treeItemChildrenKey:"treeItemChildren",arrangedObjects:function(){var a,b=this.get("content");
if(b){a=SC.TreeItemObserver.create({item:b,delegate:this})}else{a=null}this._sctc_arrangedObjects=a;
return a}.property().cacheable(),_sctc_invalidateArrangedObjects:function(){this.propertyWillChange("arrangedObjects");
var a=this._sctc_arrangedObjects;if(a){a.destroy()}this._sctc_arrangedObjects=null;
this.propertyDidChange("arrangedObjects")}.observes("content","treeItemIsExpandedKey","treeItemChildrenKey","treeItemIsGrouped"),_sctc_arrangedObjectsContentDidChange:function(){this.updateSelectionAfterContentChange()
}.observes("*arrangedObjects.[]"),firstSelectableObject:function(){var e=this.get("arrangedObjects"),c,b,a=0;
if(!e){return null}c=e.contentGroupIndexes(null,e);b=e.get("length");while(c.contains(a)&&(a<b)){a++
}return a>=b?null:e.objectAt(a)}.property()});SC.mixin(SC.Object.prototype,{invokeLater:function(b,a){if(a===undefined){a=1
}var g=b,c,e;if(arguments.length>2){c=SC.$A(arguments).slice(2);if(SC.typeOf(g)===SC.T_STRING){g=this[b]
}e=g;g=function(){return e.apply(this,c)}}return SC.Timer.schedule({target:this,action:g,interval:a})
},invokeWith:function(b,c,e){if(e===undefined){e=c;c=this}if(!c){c=this}if(SC.typeOf(e)===SC.T_STRING){e=c[e]
}var a=this.getPath(b);e.call(c,a,this);return this}});SC.RunLoop=SC.RunLoop.extend({startTime:function(){if(!this._start){this._start=Date.now()
}return this._start}.property(),endRunLoop:function(){this.fireExpiredTimers();var a=arguments.callee.base.apply(this,arguments);
this.scheduleNextTimeout();return a},scheduleTimer:function(b,a){this._timerQueue=b.removeFromTimerQueue(this._timerQueue);
this._timerQueue=b.scheduleInTimerQueue(this._timerQueue,a);return this},cancelTimer:function(a){this._timerQueue=a.removeFromTimerQueue(this._timerQueue);
return this},TIMER_ARRAY:[],fireExpiredTimers:function(){if(!this._timerQueue||this._firing){return NO
}var e=this.get("startTime");this._firing=YES;var f=this.TIMER_ARRAY;this._timerQueue=this._timerQueue.collectExpiredTimers(f,e);
var c,b=f.length;for(c=0;c<b;c++){f[c].fire()}var a=f.length>0;f.length=0;this._firing=NO;
return a},scheduleNextTimeout:function(){var e=this._timerQueue;var b=NO;if(!e){if(this._timeout){clearTimeout(this._timeout)
}}else{var c=e._timerQueueRunTime;if(this._timeoutAt!==c){if(this._timeout){clearTimeout(this._timeout)
}var a=Math.max(0,c-Date.now());this._timeout=setTimeout(this._timeoutDidFire,a);
this._timeoutAt=c}b=YES}return b},_timeoutDidFire:function(){var a=SC.RunLoop.currentRunLoop;
a._timeout=a._timeoutAt=null;SC.RunLoop.begin().end()}});SC.RunLoop.currentRunLoop=SC.RunLoop.create();
/* @license

Portions of this software are copyright Yahoo, Inc, used under the following license:

Software License Agreement (BSD License)
Copyright (c) 2009, Yahoo! Inc.
All rights reserved.
Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the
following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of Yahoo! Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission of Yahoo! Inc.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Sources of Intellectual Property Included in the YUI Library
Where not otherwise indicated, all YUI content is authored by Yahoo! engineers and consists of Yahoo!-owned intellectual property. YUI is issued by Yahoo! under the BSD license above. In some specific instances, YUI will incorporate work done by developers outside of Yahoo! with their express permission.

*/
SC.Button={value:null,toggleOnValue:YES,toggleOffValue:NO,localize:NO,localizeBindingDefault:SC.Binding.bool(),title:"",contentTitleKey:null,icon:null,contentIconKey:null,needsEllipsis:YES,displayTitle:function(){var a=this.get("title");
return(a&&this.get("localize"))?a.loc():(a||"")}.property("title","localize").cacheable(),keyEquivalent:null,renderTitle:function(b,a){var h=this.get("icon"),e="",i=this.get("displayTitle"),j=(!SC.none(i)&&i.length>0),c,l,f;
if(h){var g=SC.BLANK_IMAGE_URL;if(h.indexOf("/")>=0){e='<img src="'+h+'" alt="" class="icon" />'
}else{e='<img src="'+g+'" alt="" class="'+h+'" />'}j=YES}f=e+i;if(a){if(this.get("needsEllipsis")){b.push('<label class="sc-button-label ellipsis">'+f+"</label>")
}else{b.push('<label class="sc-button-label">'+f+"</label>")}this._ImageTitleCached=f
}else{c=this.$("label");if((l=c[0])){if(j){if(this.get("needsEllipsis")){c.addClass("ellipsis");
if(this._ImageTitleCached!==f){this._ImageTitleCached=f;l.innerHTML=f}}else{c.removeClass("ellipsis");
if(this._ImageTitleCached!==f){this._ImageTitleCached=f;l.innerHTML=f}}}else{l.innerHTML=""
}}}return b},contentPropertyDidChange:function(i,c){var b=this.get("displayDelegate"),f=this.get("content"),h;
var e=this.getDelegateProperty("contentValueKey",b);if(e&&(c===e||c==="*")){this.set("value",f?f.get(e):null)
}var a=this.getDelegateProperty("contentTitleKey",b);if(a&&(c===a||c==="*")){this.set("title",f?f.get(a):null)
}var g=this.getDelegateProperty("contentIconKey",b);if(g&&(c===g||c==="*")){this.set("icon",f?f.get(g):null)
}return this},_button_displayObserver:function(){this.displayDidChange()}.observes("title","icon","value"),performKeyEquivalent:function(c,b){if(!this.get("isEnabled")){return NO
}var a=this.get("keyEquivalent");if(a){if(a===c){return this.triggerAction(b)}}else{if((this.get("isDefault")&&(c==="return"))||(this.get("isCancel")&&(c==="escape"))){return this.triggerAction(b)
}}return NO},triggerAction:function(a){throw"SC.Button.triggerAction() is not defined in %@".fmt(this)
},computeIsSelectedForValue:function(e){var b=this.get("toggleOnValue"),c,a;if(SC.typeOf(e)===SC.T_ARRAY){if(e.length===1){c=(e[0]==b)
}else{c=null;e.find(function(f){a=(f==b);if(c===null){c=a}else{if(a!==c){c=SC.MIXED_STATE
}}return c===SC.MIXED_STATE})}}else{if(e===SC.MIXED_STATE){c=SC.MIXED_STATE}else{c=(e==b)
}}return c},initMixin:function(){if(!SC.none(this.get("value"))){this._button_valueDidChange()
}},_button_valueDidChange:function(){var b=this.get("value"),a=this.computeIsSelectedForValue(b);
this.set("isSelected",a)}.observes("value"),_button_isSelectedDidChange:function(){var c=this.get("isSelected"),b=this.computeIsSelectedForValue(this.get("value"));
if((c!==SC.MIXED_STATE)&&(b!==c)){var a=(c)?"toggleOnValue":"toggleOffValue";this.set("value",this.get(a))
}}.observes("isSelected")};SC.ContentDisplay={concatenatedProperties:"contentDisplayProperties",displayProperties:["content"],contentDisplayProperties:[],_display_contentDidChange:function(g,a,e){if((e=this.get("content"))!=this._display_content){var c=this._display_contentPropertyDidChange;
var b=this._display_content;if(b){if(SC.isArray(b)){b.invoke("removeObserver","*",this,c)
}else{if(b.removeObserver){b.removeObserver("*",this,c)}}}b=this._display_content=e;
if(b){if(SC.isArray(b)){b.invoke("addObserver","*",this,c)}else{if(b.addObserver){b.addObserver("*",this,c)
}}}this.allPropertiesDidChange();this.endPropertyChanges()}}.observes("content"),_display_contentPropertyDidChange:function(f,c,e,b){if(c==="*"){this.displayDidChange()
}else{var a=this.get("contentDisplayProperties");if(a&&a.indexOf(c)>=0){this.displayDidChange()
}}}};sc_require("system/locale");SC.STRING_TITLEIZE_REGEXP=(/([\s|\-|\_|\n])([^\s|\-|\_|\n]?)/g);
SC.STRING_DECAMELIZE_REGEXP=(/([a-z])([A-Z])/g);SC.STRING_DASHERIZE_REGEXP=(/[ _]/g);
SC.STRING_HUMANIZE_REGEXP=(/[\-_]/g);SC.STRING_TRIM_REGEXP=(/^\s+|\s+$/g);SC.STRING_TRIM_LEFT_REGEXP=(/^\s+/g);
SC.STRING_TRIM_RIGHT_REGEXP=(/\s+$/g);SC.String={loc:function(){if(!SC.Locale.currentLocale){SC.Locale.createCurrentLocale()
}var a=SC.Locale.currentLocale.locWithDefault(this)||this;return a.fmt.apply(a,arguments)
},locWithDefault:function(b){if(!SC.Locale.currentLocale){SC.Locale.createCurrentLocale()
}var c=SC.Locale.currentLocale.locWithDefault(b)||this;var a=SC.$A(arguments);a.shift();
return c.fmt.apply(c,a)},capitalize:function(){return this.charAt(0).toUpperCase()+this.slice(1)
},capitalizeEach:function(){return this.replace(SC.STRING_TITLEIZE_REGEXP,function(c,a,b){return(b)?(a+b.toUpperCase()):a
}).capitalize()},titleize:function(){var a=this.replace(SC.STRING_DECAMELIZE_REGEXP,"$1_$2");
return a.replace(SC.STRING_TITLEIZE_REGEXP,function(c,e,b){return(b)?(" "+b.toUpperCase()):" "
}).capitalize()},camelize:function(){var b=this.replace(SC.STRING_TITLEIZE_REGEXP,function(f,g,e){return(e)?e.toUpperCase():""
});var c=b.charAt(0),a=c.toLowerCase();return(c!==a)?(a+b.slice(1)):b},classify:function(){var a=this.replace(SC.STRING_TITLEIZE_REGEXP,function(f,g,e){return(e)?e.toUpperCase():""
});var c=a.charAt(0),b=c.toUpperCase();return(c!==b)?(b+a.slice(1)):a},decamelize:function(){return this.replace(SC.STRING_DECAMELIZE_REGEXP,"$1_$2").toLowerCase()
},dasherize:function(){return this.decamelize().replace(SC.STRING_DASHERIZE_REGEXP,"-")
},humanize:function(){return this.decamelize().replace(SC.STRING_HUMANIZE_REGEXP," ")
},removeDiacritics:function(){var a=SC.diacriticMappingTable;if(!a){SC.diacriticMappingTable={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Ā":"A","Ă":"A","Ą":"A","Ǎ":"A","Ǟ":"A","Ǡ":"A","Ǻ":"A","Ȁ":"A","Ȃ":"A","Ȧ":"A","Ḁ":"A","Ạ":"A","Ả":"A","Ấ":"A","Ầ":"A","Ẩ":"A","Ẫ":"A","Ậ":"A","Ắ":"A","Ằ":"A","Ẳ":"A","Ẵ":"A","Ặ":"A","Å":"A","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ç":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ḉ":"C","Ď":"D","Ḋ":"D","Ḍ":"D","Ḏ":"D","Ḑ":"D","Ḓ":"D","È":"E","É":"E","Ê":"E","Ë":"E","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ȩ":"E","Ḕ":"E","Ḗ":"E","Ḙ":"E","Ḛ":"E","Ḝ":"E","Ẹ":"E","Ẻ":"E","Ẽ":"E","Ế":"E","Ề":"E","Ể":"E","Ễ":"E","Ệ":"E","Ḟ":"F","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","Ǧ":"G","Ǵ":"G","Ḡ":"G","Ĥ":"H","Ȟ":"H","Ḣ":"H","Ḥ":"H","Ḧ":"H","Ḩ":"H","Ḫ":"H","Ì":"I","Í":"I","Î":"I","Ï":"I","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ḭ":"I","Ḯ":"I","Ỉ":"I","Ị":"I","Ĵ":"J","Ķ":"K","Ǩ":"K","Ḱ":"K","Ḳ":"K","Ḵ":"K","Ĺ":"L","Ļ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ḻ":"L","Ḽ":"L","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ñ":"N","Ń":"N","Ņ":"N","Ň":"N","Ǹ":"N","Ṅ":"N","Ṇ":"N","Ṉ":"N","Ṋ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ō":"O","Ŏ":"O","Ő":"O","Ơ":"O","Ǒ":"O","Ǫ":"O","Ǭ":"O","Ȍ":"O","Ȏ":"O","Ȫ":"O","Ȭ":"O","Ȯ":"O","Ȱ":"O","Ṍ":"O","Ṏ":"O","Ṑ":"O","Ṓ":"O","Ọ":"O","Ỏ":"O","Ố":"O","Ồ":"O","Ổ":"O","Ỗ":"O","Ộ":"O","Ớ":"O","Ờ":"O","Ở":"O","Ỡ":"O","Ợ":"O","Ṕ":"P","Ṗ":"P","Ŕ":"R","Ŗ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṙ":"R","Ṛ":"R","Ṝ":"R","Ṟ":"R","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","Ș":"S","Ṡ":"S","Ṣ":"S","Ṥ":"S","Ṧ":"S","Ṩ":"S","Ţ":"T","Ť":"T","Ț":"T","Ṫ":"T","Ṭ":"T","Ṯ":"T","Ṱ":"T","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","Ư":"U","Ǔ":"U","Ǖ":"U","Ǘ":"U","Ǚ":"U","Ǜ":"U","Ȕ":"U","Ȗ":"U","Ṳ":"U","Ṵ":"U","Ṷ":"U","Ṹ":"U","Ṻ":"U","Ụ":"U","Ủ":"U","Ứ":"U","Ừ":"U","Ử":"U","Ữ":"U","Ự":"U","Ṽ":"V","Ṿ":"V","Ŵ":"W","Ẁ":"W","Ẃ":"W","Ẅ":"W","Ẇ":"W","Ẉ":"W","Ẋ":"X","Ẍ":"X","Ý":"Y","Ŷ":"Y","Ÿ":"Y","Ȳ":"Y","Ẏ":"Y","Ỳ":"Y","Ỵ":"Y","Ỷ":"Y","Ỹ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","Ẑ":"Z","Ẓ":"Z","Ẕ":"Z","`":"`","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","ā":"a","ă":"a","ą":"a","ǎ":"a","ǟ":"a","ǡ":"a","ǻ":"a","ȁ":"a","ȃ":"a","ȧ":"a","ḁ":"a","ạ":"a","ả":"a","ấ":"a","ầ":"a","ẩ":"a","ẫ":"a","ậ":"a","ắ":"a","ằ":"a","ẳ":"a","ẵ":"a","ặ":"a","ḃ":"b","ḅ":"b","ḇ":"b","ç":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ḉ":"c","ď":"d","ḋ":"d","ḍ":"d","ḏ":"d","ḑ":"d","ḓ":"d","è":"e","é":"e","ê":"e","ë":"e","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","ȅ":"e","ȇ":"e","ȩ":"e","ḕ":"e","ḗ":"e","ḙ":"e","ḛ":"e","ḝ":"e","ẹ":"e","ẻ":"e","ẽ":"e","ế":"e","ề":"e","ể":"e","ễ":"e","ệ":"e","ḟ":"f","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","ǧ":"g","ǵ":"g","ḡ":"g","ĥ":"h","ȟ":"h","ḣ":"h","ḥ":"h","ḧ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ì":"i","í":"i","î":"i","ï":"i","ĩ":"i","ī":"i","ĭ":"i","į":"i","ǐ":"i","ȉ":"i","ȋ":"i","ḭ":"i","ḯ":"i","ỉ":"i","ị":"i","ĵ":"j","ǰ":"j","ķ":"k","ǩ":"k","ḱ":"k","ḳ":"k","ḵ":"k","ĺ":"l","ļ":"l","ľ":"l","ḷ":"l","ḹ":"l","ḻ":"l","ḽ":"l","ḿ":"m","ṁ":"m","ṃ":"m","ñ":"n","ń":"n","ņ":"n","ň":"n","ǹ":"n","ṅ":"n","ṇ":"n","ṉ":"n","ṋ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ō":"o","ŏ":"o","ő":"o","ơ":"o","ǒ":"o","ǫ":"o","ǭ":"o","ȍ":"o","ȏ":"o","ȫ":"o","ȭ":"o","ȯ":"o","ȱ":"o","ṍ":"o","ṏ":"o","ṑ":"o","ṓ":"o","ọ":"o","ỏ":"o","ố":"o","ồ":"o","ổ":"o","ỗ":"o","ộ":"o","ớ":"o","ờ":"o","ở":"o","ỡ":"o","ợ":"o","ṕ":"p","ṗ":"p","ŕ":"r","ŗ":"r","ř":"r","ȑ":"r","ȓ":"r","ṙ":"r","ṛ":"r","ṝ":"r","ṟ":"r","ś":"s","ŝ":"s","ş":"s","š":"s","ș":"s","ṡ":"s","ṣ":"s","ṥ":"s","ṧ":"s","ṩ":"s","ţ":"t","ť":"t","ț":"t","ṫ":"t","ṭ":"t","ṯ":"t","ṱ":"t","ẗ":"t","ù":"u","ú":"u","û":"u","ü":"u","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","ư":"u","ǔ":"u","ǖ":"u","ǘ":"u","ǚ":"u","ǜ":"u","ȕ":"u","ȗ":"u","ṳ":"u","ṵ":"u","ṷ":"u","ṹ":"u","ṻ":"u","ụ":"u","ủ":"u","ứ":"u","ừ":"u","ử":"u","ữ":"u","ự":"u","ṽ":"v","ṿ":"v","ŵ":"w","ẁ":"w","ẃ":"w","ẅ":"w","ẇ":"w","ẉ":"w","ẘ":"w","ẋ":"x","ẍ":"x","ý":"y","ÿ":"y","ŷ":"y","ȳ":"y","ẏ":"y","ẙ":"y","ỳ":"y","ỵ":"y","ỷ":"y","ỹ":"y","ź":"z","ż":"z","ž":"z","ẑ":"z","ẓ":"z","ẕ":"z"};
a=SC.diacriticMappingTable}var e,f,b="",g=this.length;for(var c=0;c<=g;++c){e=this.charAt(c);
f=a[e];if(f){b+=f}else{b+=e}}return b},trim:function(){return this.replace(SC.STRING_TRIM_REGEXP,"")
},trimLeft:function(){return this.replace(SC.STRING_TRIM_LEFT_REGEXP,"")},trimRight:function(){return this.replace(SC.STRING_TRIM_RIGHT_REGEXP,"")
}};SC.String.strip=SC.String.trim;SC.supplement(String.prototype,SC.String);String.prototype.loc=SC.String.loc;
SC.String.fmt=String.prototype.fmt;sc_require("mixins/string");SC.MIXED_STATE="__MIXED__";
SC.HUGE_CONTROL_SIZE="sc-huge-size";SC.LARGE_CONTROL_SIZE="sc-large-size";SC.REGULAR_CONTROL_SIZE="sc-regular-size";
SC.SMALL_CONTROL_SIZE="sc-small-size";SC.TINY_CONTROL_SIZE="sc-tiny-size";SC.Control={initMixin:function(){this._control_contentDidChange()
},isSelected:NO,isSelectedBindingDefault:SC.Binding.oneWay().bool(),isActive:NO,isActiveBindingDefault:SC.Binding.oneWay().bool(),value:null,content:null,contentValueKey:null,contentPropertyDidChange:function(b,a){return this.updatePropertyFromContent("value",a,"contentValueKey")
},updatePropertyFromContent:function(g,b,f,e){var c=b==="*";if(f===undefined){f="content%@Key".fmt(g.capitalize())
}if(e===undefined){e=this.get("content")}f=this[f]?this.get(f):this.getDelegateProperty(f,this.displayDelegate);
if(f&&(c||b===f)){var a=(e)?(e.get?e.get(f):e[f]):null;this.set(g,a)}return this},updateContentWithValueObserver:function(){var a=this.contentValueKey?this.get("contentValueKey"):this.getDelegateProperty("contentValueKey",this.displayDelegate);
var b=this.get("content");if(!a||!b){return}var c=this.get("value");if(typeof b.setIfChanged===SC.T_FUNCTION){b.setIfChanged(a,c)
}else{if(b[a]!==c){b[a]=c}}}.observes("value"),fieldKey:null,fieldLabel:null,errorLabel:function(){var a,c,b;
if(a=this.get("fieldLabel")){return a}c=this.get("fieldKey")||this.constructor.toString();
b=(c||"").humanize().capitalize();return"ErrorLabel.%@".fmt(c).locWithDefault("FieldKey.%@".fmt(c).locWithDefault(b))
}.property("fieldLabel","fieldKey").cacheable(),controlSize:SC.REGULAR_CONTROL_SIZE,displayProperties:"isEnabled isSelected isActive controlSize".w(),_CONTROL_TMP_CLASSNAMES:{},renderMixin:function(a,f){var c=this.get("isSelected"),b=!this.get("isEnabled");
var e=this._CONTROL_TMP_CLASSNAMES;e.mixed=c===SC.MIXED_STATE;e.sel=c&&(c!==SC.MIXED_STATE);
e.active=this.get("isActive");a.setClass(e).addClass(this.get("controlSize"));if(!f&&this.$input){this.$input().attr("disabled",b)
}},_control_content:null,_control_contentDidChange:function(){var b=this.get("content");
if(this._control_content===b){return}var c=this.contentPropertyDidChange;var a=this._control_content;
if(a&&a.removeObserver){a.removeObserver("*",this,c)}this._control_content=b;if(b&&b.addObserver){b.addObserver("*",this,c)
}this.contentPropertyDidChange(b,"*")}.observes("content")};SC.Editable={isEditable:NO,isEditing:NO,beginEditing:function(){if(!this.get("isEditable")){return NO
}if(this.get("isEditing")){return YES}this.set("isEditing",YES);this.becomeFirstResponder();
return YES},discardEditing:function(){return !this.get("isEditing")},commitEditing:function(){if(!this.get("isEditing")){return YES
}this.set("isEditing",NO);this.resignFirstResponder();return YES}};SC.browser=(function(){var c=navigator.userAgent.toLowerCase();
var a=(c.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1];var b={version:a,safari:(/webkit/).test(c)?a:0,opera:(/opera/).test(c)?a:0,msie:(/msie/).test(c)&&!(/opera/).test(c)?a:0,mozilla:(/mozilla/).test(c)&&!(/(compatible|webkit)/).test(c)?a:0,mobileSafari:(/apple.*mobile.*safari/).test(c)?a:0,windows:!!(/(windows)/).test(c),mac:!!((/(macintosh)/).test(c)||(/(mac os x)/).test(c)),language:(navigator.language||navigator.browserLanguage).split("-",1)[0]};
SC.extend(b,{isOpera:!!b.opera,isIe:!!b.msie,isIE:!!b.msie,isSafari:!!b.safari,isMobileSafari:!!b.mobileSafari,isMozilla:!!b.mozilla,isWindows:!!b.windows,isMac:!!b.mac,current:b.msie?"msie":b.mozilla?"mozilla":b.safari?"safari":b.opera?"opera":"unknown"});
return b})();SC.Builder=function(a){return SC.Builder.create(a)};SC.Builder.create=function create(c){var b=SC.mixin(SC.beget(this.fn),c||{});
if(c.hasOwnProperty("toString")){b.toString=c.toString}var a=function(){var e=SC.beget(b);
e.defaultClass=this;e.constructor=a;return e.init.apply(e,arguments)};a.fn=a.prototype=b;
a.extend=SC.Builder.create;a.mixin=SC.Builder.mixin;return a};SC.Builder.mixin=function(){var b=arguments.length,a;
for(a=0;a<b;a++){SC.mixin(this,arguments[a])}return this};SC.Builder.fn={init:function(a){if(a!==undefined){if(SC.typeOf(a)===SC.T_ARRAY){var b=a.length;
while(--b>=0){this[b]=a.objectAt?a.objectAt(b):a[b]}this.length=a.length}else{this[0]=a;
this.length=1}}return this},size:function(){return this.length},pushStack:function(){var a=this.constructor.apply(this,arguments);
a.prevObject=this;return a},end:function(){return this.prevObject||this.constructor()
},toString:function(){return"%@$(%@)".fmt(this.defaultClass.toString(),SC.A(this).invoke("toString").join(","))
},mixin:SC.Builder.mixin};(function(){var a=SC.Enumerable,c=SC.Builder.fn,b,e;for(b in a){if(!a.hasOwnProperty(b)){continue
}e=Array.prototype[b]||a[b];c[b]=e}})();require("system/builder");SC.CoreQuery=(function(){var G=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,j=/^.[^:#\[\.]*$/;
var y=/ CQ\d+="(?:\d+|null)"/g,f=/(<(\w+)[^>]*?)\/>/g,s=/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i,b=/\s+/,g=/^\s+/,i=/^body|html$/i,E=/href|src|style/,l=/(button|input|object|select|textarea)/i,z=/alpha\([^)]*\)/,u=/opacity=([^)]*)/;
var D=SC.browser.msie?"styleFloat":"cssFloat";var v=(SC.browser.safari&&parseInt(SC.browser.version,0)<417)?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)";
var A=new RegExp("^("+v+"+)(#)("+v+"+)");var p=new RegExp("^([#.]?)("+v+"*)");var h=new RegExp("([#.]?)("+v+"*)","g");
var o=["Left","Right"];var e=["Top","Bottom"];var q={position:"absolute",visibility:"hidden",display:"block"};
var C=function C(J,I,O){var N=I==="width"?J.offsetWidth:J.offsetHeight;var L=0,H=0,M=O.length,K;
while(--M>=0){K=O[M];L+=parseFloat(c.curCSS(J,"padding"+K,true))||0;H+=parseFloat(c.curCSS(J,"border"+K+"Width",true))||0
}N-=Math.round(L+H);return N};var m=SC.guidKey,B=0,F={},a=/z-?index|font-?weight|opacity|zoom|line-?height/i,w=document.defaultView||{};
var t=function t(I){if(!SC.browser.safari){return false}var H=w.getComputedStyle(I,null);
return !H||H.getPropertyValue("color")===""};function n(H,I){return H[0]&&parseInt(c.curCSS(H[0],I,true),10)||0
}var x,c;c=x=SC.Builder.create({jquery:"SC.CoreQuery",init:function(H,J){H=H||document;
if(H.nodeType){this[0]=H;this.length=1;return this}else{if(typeof H==="string"){var I=G.exec(H);
if(I&&(I[1]||!J)){if(I[1]){H=c.clean([I[1]],J)}else{var K=document.getElementById(I[3]);
if(K){if(K.id!=I[3]){return c().find(H)}return c(K)}H=[]}}else{return c(J).find(H)
}}else{if(SC.typeOf(H)===SC.T_FUNCTION){return SC.ready(H)}}}return this.setArray(c.makeArray(H))
},size:function(){return this.length},get:function(H){return H===undefined?c.makeArray(this):this[H]
},find:function(H){var I=c.map(this,function(J){return c.find(H,J)});return this.pushStack(I)
},filter:function(H){return this.pushStack((SC.typeOf(H)===SC.T_FUNCTION)&&c.grep(this,function(J,I){return H.call(J,I)
})||c.multiFilter(H,this))},not:function(H){if(typeof H==="string"){if(j.test(H)){return this.pushStack(c.multiFilter(H,this,true))
}else{H=c.multiFilter(H,this)}}var I=H.length&&H[H.length-1]!==undefined&&!H.nodeType;
return this.filter(function(){return I?c.inArray(this,H)<0:this!=H})},setArray:function(H){this.length=0;
Array.prototype.push.apply(this,H);return this},map:function(H){return this.pushStack(c.map(this,function(J,I){return H.call(J,I,J)
}))},each:function(I,H){return c.each(this,I,H)},index:function(H){if(H&&H.jquery){H=H[0]
}return Array.prototype.indexOf.call(this,H)},eq:function(H){return this.slice(H,+H+1)
},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments))
},add:function(H){return this.pushStack(c.merge(this.get(),typeof H==="string"?c(H):c.makeArray(H)).uniq())
},attr:function(I,K,J){var H=I;if(typeof I==="string"){if(K===undefined){return this[0]&&c[J||"attr"](this[0],I)
}else{H={};H[I]=K}}return this.each(function(L){for(I in H){c.attr((J)?this.style:this,I,c.prop(this,H[I],J,L,I))
}})},html:function(H){return H===undefined?(this[0]?this[0].innerHTML.replace(y,""):null):this.empty().append(H)
},andSelf:function(){return this.add(this.prevObject)},is:function(H){return !!H&&c.multiFilter(H,this).length>0
},hasClass:function(H){return Array.prototype.every.call(this,function(I){return(I.nodeType===1)&&c.className.has(I,H)
})},val:function(N){if(N===undefined){var H=this[0];if(H){if(c.nodeName(H,"option")){return(H.attributes.value||{}).specified?H.value:H.text
}if(c.nodeName(H,"select")){var L=H.selectedIndex,O=[],P=H.options,K=H.type==="select-one",J;
if(L<0){return null}var I,M=K?L+1:P.length;for(I=K?L:0;I<M;I++){J=P[I];if(J.selected){N=c(J).val();
if(K){return N}O.push(N)}}return O}return(H.value||"").replace(/\r/g,"")}return undefined
}else{if(typeof N==="number"){N+=""}this.each(function(){if(this.nodeType!==1){return
}if(SC.typeOf(N)===SC.T_ARRAY&&(/radio|checkbox/).test(this.type)){this.checked=(c.inArray(this.value,N)>=0||c.inArray(this.name,N)>=0)
}else{if(c.nodeName(this,"select")){var Q=c.makeArray(N);c("option",this).each(function(){this.selected=(c.inArray(this.value,Q)>=0||c.inArray(this.text,Q)>=0)
});if(!Q.length){this.selectedIndex=-1}}else{this.value=N}}})}return this},clone:function(){var H=this.map(function(){if(SC.browser.msie&&!c.isXMLDoc(this)){var K=this.cloneNode(true),J=document.createElement("div");
J.appendChild(K);return c.clean([J.innerHTML])[0]}else{return this.cloneNode(true)
}});var I=H.find("*").andSelf().each(function(){if(this[SC.guidKey]!==undefined){this[SC.guidKey]=null
}});return H},css:function(H,I){if((H==="width"||H==="height")&&parseFloat(I,0)<0){I=undefined
}return this.attr(H,I,"curCSS")},text:function(I){if(I!==undefined&&typeof I!=="object"&&I!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(I))
}var H="";c.each(I||this,function(){c.each(this.childNodes,function(){if(this.nodeType!==8){H+=this.nodeType!==1?this.nodeValue:c.fn.text([this])
}})});return H},show:function(){var H=SC.$.isVisible;this.each(function(){if(!H(this)){this.style.display=this.oldblock||"";
if(c.css(this,"display")==="none"){var I=c("<"+this.tagName+"/>");c("body").append(I);
this.style.display=I.css("display");if(this.style.display==="none"){this.style.display="block"
}I.remove();I=null}}});return this},hide:function(){var H=SC.$.isVisible;this.each(function(){if(H(this)){this.oldblock=this.oldblock||c.css(this,"display");
this.style.display="none"}});return this},domManip:function(J,K,I,M){var L=this.length>1,H;
return this.each(function(){if(!H){H=c.clean(J,this.ownerDocument);if(I){H.reverse()
}}var N=this;if(K&&c.nodeName(this,"table")&&c.nodeName(H[0],"tr")){N=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"))
}c.each(H,function(){var O=L?c(this).clone(true)[0]:this;M.call(N,O)})})},append:function(){return this.domManip(arguments,true,false,function(H){if(this.nodeType===1){this.appendChild(H)
}})},prepend:function(){return this.domManip(arguments,true,true,function(H){if(this.nodeType===1){this.insertBefore(H,this.firstChild)
}})},before:function(){return this.domManip(arguments,false,false,function(H){this.parentNode.insertBefore(H,this)
})},after:function(){return this.domManip(arguments,false,true,function(H){this.parentNode.insertBefore(H,this.nextSibling)
})},replaceWith:function(H){return this.after(H).remove()},removeData:function(H){return this.each(function(){SC.removeData(this,H)
})}});x.mixin({nodeName:function(I,H){return I.nodeName&&I.nodeName.toUpperCase()===H.toUpperCase()
},map:function(H,M){var I=[],L,J,K;for(J=0,K=H.length;J<K;J++){L=M(H[J],J);if(L!=null){I[I.length]=L
}}return I.concat.apply([],I)},each:function(J,N,I){var H,K=0,L=J.length;if(I){if(L===undefined){for(H in J){if(N.apply(J[H],I)===false){break
}}}else{for(;K<L;){if(N.apply(J[K++],I)===false){break}}}}else{if(L===undefined){for(H in J){if(N.call(J[H],H,J[H])===false){break
}}}else{for(var M=J[0];K<L&&N.call(M,K,M)!==false;M=J[++K]){}}}return J},isXMLDoc:function(H){return H.documentElement&&!H.body||H.tagName&&H.ownerDocument&&!H.ownerDocument.body
},clean:function(H,J){var I=[];J=J||document;if(typeof J.createElement=="undefined"){J=J.ownerDocument||J[0]&&J[0].ownerDocument||document
}c.each(H,function(N,P){if(typeof P==="number"){P+=""}if(!P){return}if(typeof P==="string"){P=P.replace(f,function(S,T,R){return R.match(s)?S:T+"></"+R+">"
});var M=P.replace(g,"").substring(0,10).toLowerCase(),Q=J.createElement("div");var O=!M.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!M.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||M.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!M.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!M.indexOf("<td")||!M.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!M.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||SC.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];
Q.innerHTML=O[1]+P+O[2];while(O[0]--){Q=Q.lastChild}if(SC.browser.msie){var L=!M.indexOf("<table")&&M.indexOf("<tbody")<0?Q.firstChild&&Q.firstChild.childNodes:O[1]==="<table>"&&M.indexOf("<tbody")<0?Q.childNodes:[];
for(var K=L.length-1;K>=0;--K){if(c.nodeName(L[K],"tbody")&&!L[K].childNodes.length){L[K].parentNode.removeChild(L[K])
}}if(/^\s/.test(P)){Q.insertBefore(J.createTextNode(P.match(/^\s*/)[0]),Q.firstChild)
}}P=c.makeArray(Q.childNodes)}if(P.length===0&&(!c.nodeName(P,"form")&&!c.nodeName(P,"select"))){return
}if(P[0]===undefined||c.nodeName(P,"form")||P.options){I.push(P)}else{I=c.merge(I,P)
}});return I},find:function(U,I){var P;if(typeof U!=="string"){return[U]}if(U.indexOf(",")>=0){P=U.split(",").map(function(W){return c.find(W,I)
});return P.concat.apply([],P).uniq()}if(I&&I.nodeType!==1&&I.nodeType!==9){return[]
}I=I||document;P=[I];var R,H=YES,L=U.match(h),O=L.length,K;for(var S=0;S<O;S++){U=L[S];
if(U===" "||U===""){H=YES}else{if(H){K=p.exec(U);if((K[1]==="")&&(S<(O-1))&&(L[S+1].charAt(0)==="#")){U=L[S+1];
L[S+1]=L[S];K=p.exec(U)}var N=[],M=P.length,Q,T,J=K[2],V;for(Q=0;Q<M;Q++){T=P[Q];
switch(K[1]){case"":if(!J){J="*"}if(J==="*"&&T.nodeName.toLowerCase()==="object"){J="param"
}N=c.merge(N,T.getElementsByTagName(J));break;case"#":if(T===document){V=document.getElementById(J);
if(SC.browser.msie&&V&&V.getAttribute("id")!==J){V=NO}else{if(V){N.push(V)}V=YES}}else{V=NO
}if(!V){V=T.getElementsByTagName("*");V=Array.prototype.find.call(V,function(W){return W.getAttribute&&(W.getAttribute("id")===J)
});if(V){N.push(V)}}break;case".":if(T.getElementsByClassName){N=c.merge(N,T.getElementsByClassName(J))
}else{N=c.merge(N,c.classFilter(T.getElementsByTagName("*"),J))}break;default:}}delete P;
P=N;H=NO}else{P=c.filter(U,P)}}}if(P&&P[0]==I){P.shift()}return P.uniq()},classFilter:function(M,H,L){H=" "+H+" ";
var J=[],K;for(var I=0;M[I];I++){K=(" "+M[I].className+" ").indexOf(H)>=0;if(!L&&K||L&&!K){J.push(M[I])
}}return J},filter:function(I,M,L){var H=p.exec(I),N=H[2],K=H[1],J;if(K==="."){return c.classFilter(c.makeArray(M),N,L)
}else{if(K==="#"){J=function(P){var O=P&&P.getAttribute&&(P.getAttribute("id")===N);
return(L)?!O:O}}else{J=function(P){var O=c.nodeName(P,N);return(L)?!O:O}}return Array.prototype.filter.call(c.makeArray(M),J)
}},multiFilter:function(K,H,J){K=K.indexOf(",")?K.split(","):[K];var M=K.length,L,I=[];
while(--M>=0){L=c.filter(K[M].trim(),H,J);I=J?H=L:c.merge(L,I)}return I},merge:function(K,H){var I=0,J,L=K.length;
if(SC.browser.msie){while(J=H[I++]){if(J.nodeType!==8){K[L++]=J}}}else{while(J=H[I++]){K[L++]=J
}}return K},makeArray:function(J){var H=[];if(J!==undefined||J!=null){var I=J.length;
if(I==null||typeof J==="string"||J.setInterval){H[0]=J}else{while(I){H[--I]=J[I]}}}return H
},inArray:function(H,I){return I.indexOf?I.indexOf(H):Array.prototype.indexOf.call(I,H)
},boxModel:!SC.browser.msie||document.compatMode==="CSS1Compat",props:{"for":"htmlFor","class":"className","float":D,cssFloat:D,styleFloat:D,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan"},prop:function(K,L,J,I,H){if(SC.typeOf(L)===SC.T_FUNCTION){L=L.call(K,I)
}return L&&(typeof L==="number")&&J==="curCSS"&&!a.test(H)?L+"px":L},grep:function(I,M,H){var J=[];
for(var K=0,L=I.length;K<L;K++){if(!H!=!M(I[K],K)){J.push(I[K])}}return J},className:{add:function(I,J){var H=c.className.has;
c.each((J||"").split(b),function(K,L){if(I.nodeType===1&&!H(I.className,L)){I.className+=(I.className?" ":"")+L
}})},remove:function(H,I){if(H.nodeType===1){H.className=I!==undefined?c.grep(H.className.split(b),function(J){return !c.className.has(I,J)
}).join(" "):""}},has:function(I,H){return I&&c.inArray(H,(I.className||I).toString().split(b))>-1
}},swap:function(M,L,O,N,H){var I={},K;for(K in L){I[K]=M.style[K];M.style[K]=L[K]
}var J=O(M,N,H);for(K in L){M.style[K]=I[K]}return J},css:function(J,H,K){if(H==="width"||H==="height"){var M,L=(H==="width")?o:e,I=q;
M=SC.$.isVisible(J)?C(J,H,L):c.swap(J,I,C,H,L);return Math.max(0,M)}return c.curCSS(J,H,K)
},curCSS:function(N,I,J){var S,H=N.style;if(I==="opacity"&&SC.browser.msie){S=c.attr(H,"opacity");
return S===""?"1":S}if(SC.browser.opera&&I==="display"){var T=H.outline;H.outline="0 solid black";
H.outline=T}var K=I.match(/float/i);if(K){I=D}if(!J&&H&&H[I]){S=H[I]}else{if(w.getComputedStyle){if(K){I="float"
}I=I.replace(/([A-Z])/g,"-$1").toLowerCase();var U=w.getComputedStyle(N,null);if(U&&!t(N,w)){S=U.getPropertyValue(I)
}else{var M=[],V=[],W=N,P=0,R,O;for(;W&&t(W);W=W.parentNode){V.unshift(W)}for(O=V.length;
P<O;P++){if(t(V[P])){M[P]=V[P].style.display;V[P].style.display="block"}}S=(I==="display"&&M[V.length-1]!==null)?"none":(U&&U.getPropertyValue(I))||"";
for(P=0,R=M.length;P<R;P++){if(M[P]!==null){V[P].style.display=M[P]}}}if(I==="opacity"&&S===""){S="1"
}}else{if(N.currentStyle){S=N.currentStyle[I]||N.currentStyle[I.camelize()];if(!(/^\d+(px)?$/i).test(S)&&(/^\d/).test(S)){var L=H.left,Q=N.runtimeStyle.left;
N.runtimeStyle.left=N.currentStyle.left;H.left=S||0;S=H.pixelLeft+"px";H.left=L;N.runtimeStyle.left=Q
}}}}return S},dir:function(J,I){var H=[],K=J[I];while(K&&K!=document){if(K.nodeType===1){H.push(K)
}K=K[I]}return H},nth:function(L,H,J,K){H=H||1;var I=0;for(;L;L=L[J]){if(L.nodeType===1&&++I==H){break
}}return L},sibling:function(J,I){var H=[];for(;J;J=J.nextSibling){if(J.nodeType===1&&J!=I){H.push(J)
}}return H},attr:function(I,H,O){if(!I||I.nodeType===3||I.nodeType===8){return undefined
}var J=!c.isXMLDoc(I),N=O!==undefined,L=SC.browser.msie;H=J&&c.props[H]||H;if(I.tagName){var M=E.test(H);
if(H==="selected"&&I.parentNode){I.parentNode.selectedIndex}if(H in I&&J&&!M){if(N){if(H==="type"&&c.nodeName(I,"input")&&I.parentNode){throw"type property can't be changed"
}I[H]=O}if(c.nodeName(I,"form")&&I.getAttributeNode(H)){return I.getAttributeNode(H).nodeValue
}if(H==="tabIndex"){var P=I.getAttributeNode("tabIndex");return P&&P.specified?P.value:I.nodeName.match(l)?0:I.nodeName.match(/^(a|area)$/i)&&I.href?0:undefined
}return I[H]}if(L&&J&&H==="style"){return c.attr(I.style,"cssText",O)}if(N){I.setAttribute(H,""+O)
}var K=(L&&J&&M)?I.getAttribute(H,2):I.getAttribute(H);return K===null?undefined:K
}if(L&&H==="opacity"){if(N){I.zoom=1;I.filter=(I.filter||"").replace(z,"")+(parseInt(O,0)+""=="NaN"?"":"alpha(opacity="+O*100+")")
}return I.filter&&I.filter.indexOf("opacity=")>=0?(parseFloat(I.filter.match(u)[1])/100)+"":""
}H=H.camelize();if(N){I[H]=O}return I[H]}});c.fn.init.prototype=c.fn;c.each({parent:function(H){return H.parentNode
},parents:function(H){return c.dir(H,"parentNode")},next:function(H){return c.nth(H,2,"nextSibling")
},prev:function(H){return c.nth(H,2,"previousSibling")},nextAll:function(H){return c.dir(H,"nextSibling")
},prevAll:function(H){return c.dir(H,"previousSibling")},siblings:function(H){return c.sibling(H.parentNode.firstChild,H)
},children:function(H){return c.sibling(H.firstChild)},contents:function(H){return c.nodeName(H,"iframe")?H.contentDocument||H.contentWindow.document:c.makeArray(H.childNodes)
}},function(H,I){c.fn[H]=function(J){var K=c.map(this,I);if(J&&typeof J==="string"){K=c.multiFilter(J,K)
}return this.pushStack(K.uniq())}});c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(H,I){c.fn[H]=function(){var J=arguments;
return this.each(function(){for(var K=0,L=J.length;K<L;K++){c(J[K])[I](this)}})}});
c.each({removeAttr:function(H){c.attr(this,H,"");if(this.nodeType===1){this.removeAttribute(H)
}},addClass:function(H){c.className.add(this,H)},removeClass:function(H){c.className.remove(this,H)
},toggleClass:function(H){c.className[c.className.has(this,H)?"remove":"add"](this,H)
},remove:function(H){if(!H||c.filter(H,[this]).length){if(this.parentNode){this.parentNode.removeChild(this)
}}},empty:function(){while(this.firstChild){this.removeChild(this.firstChild)}}},function(H,I){c.fn[H]=function(){return this.each(I,arguments)
}});c.each(["Height","Width"],function(L,J){var M=J.toLowerCase(),I;c.fn[M]=function(N){if(this[0]===window){if(SC.browser.opera){I=document.body["client"+J]
}else{if(SC.browser.safari){I=window["inner"+J]}else{if(document.compatMode){I=documentElement["client"+J]
}else{I=document.body["client"+J]}}}}else{if(this[0]===document){I=Math.max(Math.max(document.body["scroll"+J],document.documentElement["scroll"+J]),Math.max(document.body["offset"+J],document.documentElement["offset"+J]))
}else{if(N===undefined){return this.length?c.css(this[0],M):null}else{return this.css(M,(typeof N==="string")?N:N+"px")
}}}return I};var H=L?"Left":"Top",K=L?"Right":"Bottom";c.fn["inner"+J]=function(){return this[J.toLowerCase()]()+n(this,"padding"+H)+n(this,"padding"+K)
};c.fn["outer"+J]=function(N){return this["inner"+J]()+n(this,"border"+H+"Width")+n(this,"border"+K+"Width")+(N?n(this,"margin"+H)+n(this,"margin"+K):0)
}});x.fn.offset=function(){var I=0,Q=0,J=this[0],V=SC.browser,M;if(!J){return undefined
}function L(W){U(c.curCSS(W,"borderLeftWidth",true),c.curCSS(W,"borderTopWidth",true))
}function U(W,X){I+=parseInt(W,10)||0;Q+=parseInt(X,10)||0}var S=J.parentNode,P=J,H=J.offsetParent,R=J.ownerDocument,T=V.safari&&parseInt(V.version,0)<522&&!(/adobeair/i).test(V.userAgent),O=c.curCSS,K=c.css(J,"position")==="fixed";
if(!(V.mozilla&&J==document.body)&&J.getBoundingClientRect){var N=J.getBoundingClientRect();
U(N.left+Math.max(R.documentElement.scrollLeft,R.body.scrollLeft),N.top+Math.max(R.documentElement.scrollTop,R.body.scrollTop));
U(-R.documentElement.clientLeft,-R.documentElement.clientTop)}else{U(J.offsetLeft,J.offsetTop);
while(H){U(H.offsetLeft,H.offsetTop);if(V.mozilla&&!(/^t(able|d|h)$/i).test(H.tagName)||V.safari&&!T){L(H)
}if(!K&&O(H,"position")==="fixed"){K=true}P=(/^body$/i).test(H.tagName)?P:H;H=H.offsetParent
}while(S&&S.tagName&&!(i).test(S.tagName)){if(!(/^inline|table.*$/i).test(O(S,"display"))){U(-S.scrollLeft,-S.scrollTop)
}if(V.mozilla&&O(S,"overflow")!=="visible"){L(S)}S=S.parentNode}if((T&&(K||O(P,"position")==="absolute"))||(V.mozilla&&O(P,"position")!=="absolute")){U(-R.body.offsetLeft,-R.body.offsetTop)
}if(K){U(Math.max(R.documentElement.scrollLeft,R.body.scrollLeft),Math.max(R.documentElement.scrollTop,R.body.scrollTop))
}}M={top:Q,left:I};return M};x.fn.mixin({position:function(){var L=0,K=0,I;if(this[0]){var J=this.offsetParent(),M=this.offset(),H=i.test(J[0].tagName)?{top:0,left:0}:J.offset();
M.top-=n(this,"marginTop");M.left-=n(this,"marginLeft");H.top+=n(J,"borderTopWidth");
H.left+=n(J,"borderLeftWidth");I={top:M.top-H.top,left:M.left-H.left}}return I},offsetParent:function(){var H=this[0].offsetParent||document.body;
while(H&&(!(i).test(H.tagName)&&c.css(H,"position")==="static")){H=H.offsetParent
}return c(H)}});c.each(["Left","Top"],function(I,H){var J="scroll"+H;c.fn[J]=function(K){if(!this[0]){return
}return K!==undefined?this.each(function(){this==window||this==document?window.scrollTo(!I?K:c(window).scrollLeft(),I?K:c(window).scrollTop()):this[J]=K
}):this[0]==window||this[0]==document?self[I?"pageYOffset":"pageXOffset"]||c.boxModel&&document.documentElement[J]||document.body[J]:this[0][J]
}});return x}());SC.$=(typeof jQuery=="undefined")?SC.CoreQuery:jQuery;SC.mixin(SC.$.fn,{isCoreQuery:YES,toString:function(){var c=[];
var b=this.length,a=0;for(a=0;a<b;a++){c[a]="%@: %@".fmt(a,this[a]?this[a].toString():"(null)")
}return"<$:%@>(%@)".fmt(SC.guidFor(this),c.join(" , "))},isVisible:function(){return Array.prototype.every.call(this,function(a){return SC.$.isVisible(a)
})},first:function(){return this.pushStack([this[0]])},last:function(){return this.pushStack([this[this.length-1]])
},view:function(){return this.map(function(){var b=null,a=SC.viewKey,e=this,c;while(!b&&e&&(e!==document)){if(c=e.getAttribute("id")){b=SC.View.views[c]
}e=e.parentNode}e=null;return b})},setClass:function(e,c){if(SC.none(e)){return this
}var f=SC.typeOf(e)!==SC.T_STRING;var a=this._fixupClass,b;this.each(function(){if(this.nodeType!==1){return
}var i=this.className.split(/\s+/),h=NO;if(f){for(var g in e){if(!e.hasOwnProperty(g)){continue
}h=a(i,g,e[g])||h}}else{h=a(i,e,c)}if(h){this.className=i.join(" ")}});return this
},_fixupClass:function(e,a,c){var b=e.indexOf(a);if(c){if(b<0){e.push(a);return YES
}}else{if(b>=0){e[b]=null;return YES}}return NO},within:function(f){f=SC.$(f);var e,c,h,b,a=f.length;
var g=this.length;while(!e&&(--g>=0)){h=this[g];for(b=0;!e&&(b<a);b++){c=f[b];while(c&&(c!==h)){c=c.parentNode
}e=c===h}}h=c=null;return e}});(function(){var c={};var g={find:function(j,i){return(i!==undefined)?SC.Enumerable.find.call(this,j,i):c.find.call(this,j)
},filter:function(j,i){return(i!==undefined)?this.pushStack(SC.Enumerable.filter.call(this,j,i)):c.filter.call(this,j)
},filterProperty:function(i,j){return this.pushStack(SC.Enumerable.filterProperty.call(this,i,j))
},indexOf:SC.$.index,map:function(j,i){return(i!==undefined)?SC.Enumerable.map.call(this,j,i):c.map.call(this,j)
}};var h=SC.$.jquery==="SC.CoreQuery",e=SC.$.fn,a=h?g:SC.Enumerable,f;for(var b in a){if(!a.hasOwnProperty(b)){continue
}f=a[b];if(b in g){c[b]=e[b];f=g[b]}e[b]=f}})();SC.mixin(SC.$,{isVisible:function(a){var b=SC.$;
return("hidden"!=a.type)&&(b.css(a,"display")!="none")&&(b.css(a,"visibility")!="hidden")
}});sc_require("system/core_query");SC.Event=function(e){if(e){this.originalEvent=e;
var h=SC.Event._props,c=h.length,b=c,f;while(--b>=0){f=h[b];this[f]=e[f]}}this.timeStamp=this.timeStamp||Date.now();
if(!this.target){this.target=this.srcElement||document}if(this.target.nodeType===3){this.target=this.target.parentNode
}if(!this.relatedTarget&&this.fromElement){this.relatedTarget=(this.fromElement===this.target)?this.toElement:this.fromElement
}if(SC.none(this.pageX)&&!SC.none(this.clientX)){var i=document.documentElement,a=document.body;
this.pageX=this.clientX+(i&&i.scrollLeft||a&&a.scrollLeft||0)-(i.clientLeft||0);this.pageY=this.clientY+(i&&i.scrollTop||a&&a.scrollTop||0)-(i.clientTop||0)
}if(!this.which&&((this.charCode||e.charCode===0)?this.charCode:this.keyCode)){this.which=this.charCode||this.keyCode
}if(!this.metaKey&&this.ctrlKey){this.metaKey=this.ctrlKey}if(!this.which&&this.button){this.which=((this.button&1)?1:((this.button&2)?3:((this.button&4)?2:0)))
}if(SC.browser.safari&&e.wheelDelta!==undefined){this.wheelDelta=this.wheelDeltaY=0-(e.wheelDeltaY||e.wheelDelta);
this.wheelDeltaX=0-(e.wheelDeltaX||0)}else{if(!SC.none(e.detail)){var g=Math.floor(e.detail*2);
if(e.axis&&(e.axis===e.HORIZONTAL_AXIS)){this.wheelDeltaX=g;this.wheelDeltaY=this.wheelDelta=0
}else{this.wheelDeltaY=this.wheelDelta=g;this.wheelDeltaX=0}}else{this.wheelDelta=this.wheelDeltaY=SC.browser.msie?0-e.wheelDelta:e.wheelDelta;
this.wheelDeltaX=0}}return this};SC.mixin(SC.Event,{create:function(a){return new SC.Event(a)
},add:function(f,e,g,h,c){if(f&&f.isCoreQuery){if(f.length>0){f.forEach(function(i){this.add(i,e,g,h,c)
},this);return this}else{f=f[0]}}if(!f){return this}if(f.nodeType===3||f.nodeType===8){return SC.Event
}if(SC.browser.msie&&f.setInterval){f=window}if(SC.typeOf(g)===SC.T_FUNCTION){c=h;
h=g;g=null}else{if(g&&SC.typeOf(h)===SC.T_STRING){h=g[h]}}var b=SC.data(f,"events")||SC.data(f,"events",{}),a=b[e];
if(!a){a=b[e]={};this._addEventListener(f,e)}a[SC.guidFor(h)]=[g,h,c];SC.Event._global[e]=YES;
f=b=a=null;return this},remove:function(g,f,h,i){if(g&&g.isCoreQuery){if(g.length>0){g.forEach(function(j){this.remove(j,f,h,i)
},this);return this}else{g=g[0]}}if(!g){return this}if(g.nodeType===3||g.nodeType===8){return SC.Event
}if(SC.browser.msie&&g.setInterval){g=window}var a,e,c=SC.data(g,"events");if(!c){return this
}if(f===undefined){for(f in c){this.remove(g,f)}}else{if(a=c[f]){var b=NO;if(h||i){if(SC.typeOf(h)===SC.T_FUNCTION){i=h;
h=null}else{if(SC.typeOf(i)===SC.T_STRING){i=h[i]}}delete a[SC.guidFor(i)];e=null;
for(e in a){break}if(e===null){b=YES}}else{b=YES}if(b){delete c[f];this._removeEventListener(g,f)
}e=null;for(e in c){break}if(!e){SC.removeData(g,"events");delete this._elements[SC.guidFor(g)]
}}}g=c=a=null;return this},NO_BUBBLE:["blur","focus","change"],simulateEvent:function(e,c,b){var a=SC.Event.create({type:c,target:e,preventDefault:function(){this.cancelled=YES
},stopPropagation:function(){this.bubbles=NO},allowDefault:function(){this.hasCustomEventHandling=YES
},timeStamp:Date.now(),bubbles:(this.NO_BUBBLE.indexOf(c)<0),cancelled:NO,normalized:YES});
if(b){SC.mixin(a,b)}return a},trigger:function(c,b,j,l){if(c&&c.isCoreQuery){if(c.length>0){c.forEach(function(o){this.trigger(o,b,j,l)
},this);return this}else{c=c[0]}}if(!c){return this}if(c.nodeType===3||c.nodeType===8){return undefined
}j=SC.A(j);var i,m=SC.typeOf(c[b]||null)===SC.T_FUNCTION,a,h,f,n;a=j[0];if(!a||!a.preventDefault){a=this.simulateEvent(c,b);
j.unshift(a)}a.type=b;h=c;do{i=SC.Event.handle.apply(h,j);h=(h===document)?null:(h.parentNode||document)
}while(!i&&a.bubbles&&h);h=null;f=c["on"+b];n=SC.CoreQuery.nodeName(c,"a")&&b==="click";
if((!m||n)&&f&&f.apply(c,j)===NO){i=NO}if(m&&l!==NO&&i!==NO&&!n){this.triggered=YES;
try{c[b]()}catch(g){}}this.triggered=NO;return i},handle:function(b){if((typeof SC==="undefined")||SC.Event.triggered){return YES
}var c,h,f,j,e,i,l,m,a,g;i=SC.A(arguments);i[0]=b=SC.Event.normalizeEvent(b||window.event);
e=(SC.data(this,"events")||{})[b.type];if(!e){return NO}for(l in e){m=e[l];a=m[1];
b.handler=a;b.data=b.context=m[2];g=m[0]||this;h=a.apply(g,i);if(c!==NO){c=h}if(h===NO){b.preventDefault();
b.stopPropagation()}}return c},unload:function(){var a,b=this._elements;for(a in b){this.remove(b[a])
}for(a in b){delete b[a]}delete this._elements},special:{ready:{setup:function(){SC._bindReady();
return},teardown:function(){return}},mouseenter:{setup:function(){if(SC.browser.msie){return NO
}SC.Event.add(this,"mouseover",SC.Event.special.mouseover.handler);return YES},teardown:function(){if(SC.browser.msie){return NO
}SC.Event.remove(this,"mouseover",SC.Event.special.mouseover.handler);return YES},handler:function(a){if(SC.Event._withinElement(a,this)){return YES
}a.type="mouseenter";return SC.Event.handle.apply(this,arguments)}},mouseleave:{setup:function(){if(SC.browser.msie){return NO
}SC.Event.add(this,"mouseout",SC.Event.special.mouseleave.handler);return YES},teardown:function(){if(SC.browser.msie){return NO
}SC.Event.remove(this,"mouseout",SC.Event.special.mouseleave.handler);return YES},handler:function(a){if(SC.Event._withinElement(a,this)){return YES
}a.type="mouseleave";return SC.Event.handle.apply(this,arguments)}}},KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,_withinElement:function(e,c){var b=e.relatedTarget;
while(b&&b!=c){try{b=b.parentNode}catch(a){b=c}}return b===c},_addEventListener:function(e,c){var f,b=this.special[c];
if(!b||b.setup.call(e)===NO){var a=SC.guidFor(e);this._elements[a]=e;f=SC.data(e,"listener")||SC.data(e,"listener",function(){return SC.Event.handle.apply(SC.Event._elements[a],arguments)
});if(e.addEventListener){e.addEventListener(c,f,NO)}else{if(e.attachEvent){e.attachEvent("on"+c,f)
}}}e=b=f=null},_removeEventListener:function(c,b){var e,a=SC.Event.special[b];if(!a||(a.teardown.call(c)===NO)){e=SC.data(c,"listener");
if(e){if(c.removeEventListener){c.removeEventListener(b,e,NO)}else{if(c.detachEvent){c.detachEvent("on"+b,e)
}}}}c=a=e=null},_elements:{},normalizeEvent:function(a){if(a===window.event){return SC.Event.create(a)
}else{return a.normalized?a:SC.Event.create(a)}},_global:{},_props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view which touches targetTouches changedTouches".split(" ")});
SC.Event.prototype={hasCustomEventHandling:NO,allowDefault:function(){this.hasCustomEventHandling=YES;
return this},preventDefault:function(){var a=this.originalEvent;if(a){if(a.preventDefault){a.preventDefault()
}a.returnValue=NO}this.hasCustomEventHandling=YES;return this},stopPropagation:function(){var a=this.originalEvent;
if(a){if(a.stopPropagation){a.stopPropagation()}a.cancelBubble=YES}this.hasCustomEventHandling=YES;
return this},stop:function(){return this.preventDefault().stopPropagation()},normalized:YES,getCharString:function(){if(SC.browser.msie){if(this.keyCode==8||this.keyCode==9||(this.keyCode>=37&&this.keyCode<=40)){return String.fromCharCode(0)
}else{return(this.keyCode>0)?String.fromCharCode(this.keyCode):null}}else{return(this.charCode>0)?String.fromCharCode(this.charCode):null
}},commandCodes:function(){var f=this.keyCode,b=null,c=null,a="",e;if(f){b=SC.FUNCTION_KEYS[f];
if(!b&&(this.altKey||this.ctrlKey||this.metaKey)){b=SC.PRINTABLE_KEYS[f]}if(b){if(this.altKey){a+="alt_"
}if(this.ctrlKey||this.metaKey){a+="ctrl_"}if(this.shiftKey){a+="shift_"}}}if(!b){f=this.which;
c=b=String.fromCharCode(f);e=b.toLowerCase();if(this.metaKey){a="meta_";b=e}else{b=null
}}if(b){b=a+b}return[b,c]}};SC.Event.observe=SC.Event.add;SC.Event.stopObserving=SC.Event.remove;
SC.Event.fire=SC.Event.trigger;SC.Event.add(window,"unload",SC.Event.prototype,SC.Event.unload);
SC.MODIFIER_KEYS={16:"shift",17:"ctrl",18:"alt"};SC.FUNCTION_KEYS={8:"backspace",9:"tab",13:"return",19:"pause",27:"escape",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",44:"printscreen",45:"insert",46:"delete",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scrolllock"};
SC.PRINTABLE_KEYS={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",107:"+",109:"-",110:".",188:",",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:'"'};
SC.SYSTEM_CURSOR="default";SC.AUTO_CURSOR=SC.DEFAULT_CURSOR="auto";SC.CROSSHAIR_CURSOR="crosshair";
SC.HAND_CURSOR=SC.POINTER_CURSOR="pointer";SC.MOVE_CURSOR="move";SC.E_RESIZE_CURSOR="e-resize";
SC.NE_RESIZE_CURSOR="ne-resize";SC.NW_RESIZE_CURSOR="nw-resize";SC.N_RESIZE_CURSOR="n-resize";
SC.SE_RESIZE_CURSOR="se-resize";SC.SW_RESIZE_CURSOR="sw-resize";SC.S_RESIZE_CURSOR="s-resize";
SC.W_RESIZE_CURSOR="w-resize";SC.IBEAM_CURSOR=SC.TEXT_CURSOR="text";SC.WAIT_CURSOR="wait";
SC.HELP_CURSOR="help";SC.Cursor=SC.Object.extend({init:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("cursorStyle")||SC.DEFAULT_CURSOR,b=this.constructor.sharedStyleSheet();
if(b.insertRule){b.insertRule(".%@ {cursor: %@;}".fmt(SC.guidFor(this),a),b.cssRules?b.cssRules.length:0)
}else{if(b.addRule){b.addRule("."+SC.guidFor(this),"cursor: "+a)}}this.cursorStyle=a;
this.className=SC.guidFor(this);return this},className:null,cursorStyle:SC.DEFAULT_CURSOR,cursorStyleDidChange:function(){var e,g,c,f,h,b,a;
e=this.get("cursorStyle")||SC.DEFAULT_CURSOR;g=this._rule;if(g){g.style.cursor=e;
return}c="."+this.get("className");f=this.constructor.sharedStyleSheet();h=(f.cssRules?f.cssRules:f.rules)||[];
for(b=0,a=h.length;b<a;++b){g=h[b];if(g.selectorText===c){this._rule=g;g.style.cursor=e;
break}}}.observes("cursorStyle")});SC.Cursor.sharedStyleSheet=function(){var b,a=this._styleSheet;
if(!a){a=document.createElement("style");a.type="text/css";b=document.getElementsByTagName("head")[0];
if(!b){b=document.documentElement}b.appendChild(a);a=document.styleSheets[document.styleSheets.length-1];
this._styleSheet=a}return a};SC.Responder=SC.Object.extend({isResponder:YES,pane:null,responderContext:null,nextResponder:null,isFirstResponder:NO,hasFirstResponder:NO,acceptsFirstResponder:YES,becomeFirstResponder:function(){var a=this.get("pane")||this.get("responderContext")||this.pane();
if(a&&this.get("acceptsFirstResponder")){if(a.get("firstResponder")!==this){a.makeFirstResponder(this)
}}return this},resignFirstResponder:function(){var a=this.get("pane")||this.get("responderContext");
if(a&&(a.get("firstResponder")===this)){a.makeFirstResponder(null)}return YES},willLoseFirstResponder:function(a){},didBecomeFirstResponder:function(a){}});
sc_require("system/browser");sc_require("system/event");sc_require("system/cursor");
sc_require("system/responder");sc_require("mixins/string");SC.viewKey=SC.guidKey+"_view";
SC.LAYOUT_HORIZONTAL="sc-layout-horizontal";SC.LAYOUT_VERTICAL="sc-layout-vertical";
SC._VIEW_DEFAULT_DIMS="marginTop marginLeft".w();SC.ANCHOR_TOP={top:0};SC.ANCHOR_LEFT={left:0};
SC.ANCHOR_TOP_LEFT={top:0,left:0};SC.ANCHOR_BOTTOM={bottom:0};SC.ANCHOR_RIGHT={right:0};
SC.ANCHOR_BOTTOM_RIGHT={bottom:0,right:0};SC.FULL_WIDTH={left:0,right:0};SC.FULL_HEIGHT={top:0,bottom:0};
SC.ANCHOR_CENTER={centerX:0,centerY:0};SC.LAYOUT_AUTO="auto";SC.EMPTY_CHILD_VIEWS_ARRAY=[];
SC.EMPTY_CHILD_VIEWS_ARRAY.needsClone=YES;SC.View=SC.Responder.extend(SC.DelegateSupport,{concatenatedProperties:"outlets displayProperties layoutProperties classNames renderMixin didCreateLayerMixin willDestroyLayerMixin".w(),pane:function(){var a=this;
while(a&&!a.isPane){a=a.get("parentView")}return a}.property("parentView").cacheable(),page:null,splitView:function(){var a=this;
while(a&&!a.isSplitView){a=a.get("parentView")}return a}.property("parentView").cacheable(),parentView:null,backgroundColor:null,isEnabled:YES,isEnabledBindingDefault:SC.Binding.oneWay().bool(),isEnabledInPane:function(){var a=this.get("isEnabled"),b;
if(a&&(b=this.get("parentView"))){a=b.get("isEnabledInPane")}return a}.property("parentView","isEnabled"),isVisible:YES,isVisibleBindingDefault:SC.Binding.bool(),isVisibleInWindow:NO,recomputeIsVisibleInWindow:function(c){var f=this.get("isVisibleInWindow"),h=this.get("isVisible"),e;
if(h){h=(c===undefined)?((e=this.get("parentView"))?e.get("isVisibleInWindow"):NO):c
}this.set("isVisibleInWindow",h);this._needsVisibiltyChange=YES;var g=this.get("childViews"),b=g.length,a;
for(a=0;a<b;a++){g[a].recomputeIsVisibleInWindow(h)}if(h){if(this.parentViewDidResize){this.parentViewDidResize()
}if(this.get("childViewsNeedLayout")){this.invokeOnce(this.layoutChildViewsIfNeeded)
}}this.set("layerNeedsUpdate",YES);if(!h&&this.get("isFirstResponder")){this.resignFirstResponder()
}return this}.observes("isVisible"),childViews:SC.EMPTY_CHILD_VIEWS_ARRAY,insertBefore:function(b,e){b.beginPropertyChanges();
if(b.get("parentView")){b.removeFromParent()}if(this.willAddChild){this.willAddChild(b,e)
}if(b.willAddToParent){b.willAddToParent(this,e)}b.set("parentView",this);var a,c=this.get("childViews");
if(c.needsClone){this.set(c=[])}a=(e)?c.indexOf(e):c.length;if(a<0){a=c.length}c.insertAt(a,b);
b.parentViewDidChange();b.layoutDidChange();var f=b.get("pane");if(f&&f.get("isPaneAttached")){b._notifyDidAppendToDocument()
}if(this.didAddChild){this.didAddChild(b,e)}if(b.didAddToParent){b.didAddToParent(this,e)
}b.endPropertyChanges();return this},removeChild:function(b){if(!b){return this}if(b.parentView!==this){throw"%@.removeChild(%@) must belong to parent".fmt(this,b)
}if(b.willRemoveFromParent){b.willRemoveFromParent()}if(this.willRemoveChild){this.willRemoveChild(b)
}b.set("parentView",null);var c=this.get("childViews");var a=c.indexOf(b);if(a>=0){c.removeAt(a)
}b.parentViewDidChange();if(this.didRemoveChild){this.didRemoveChild(b)}if(b.didRemoveFromParent){b.didRemoveFromParent(this)
}return this},removeAllChildren:function(){var b=this.get("childViews"),a;while(a=b.objectAt(b.get("length")-1)){this.removeChild(a)
}return this},removeFromParent:function(){var a=this.get("parentView");if(a){a.removeChild(this)
}return this},replaceChild:function(a,b){a.beginPropertyChanges();b.beginPropertyChanges();
this.beginPropertyChanges();this.insertBefore(a,b).removeChild(b);this.endPropertyChanges();
b.endPropertyChanges();a.endPropertyChanges();return this},replaceAllChildren:function(c){var b=c.get("length"),a;
this.beginPropertyChanges();this.destroyLayer().removeAllChildren();for(a=0;a<b;a++){this.appendChild(c.objectAt(a))
}this.replaceLayer();this.endPropertyChanges();return this},appendChild:function(a){return this.insertBefore(a,null)
},parentViewDidChange:function(){this.recomputeIsVisibleInWindow();this.set("layerLocationNeedsUpdate",YES);
this.invokeOnce(this.updateLayerLocationIfNeeded);this._invalidatePaneCacheForSelfAndAllChildViews();
return this}.observes("isVisible"),_invalidatePaneCacheForSelfAndAllChildViews:function(){this.notifyPropertyChange("pane");
var c=this.get("childViews"),b=c.length,a;for(a=0;a<b;++a){var e=c[a];if(e._invalidatePaneCacheForSelfAndAllChildViews){e._invalidatePaneCacheForSelfAndAllChildViews()
}}},layer:function(a,c){if(c!==undefined){this._view_layer=c}else{c=this._view_layer;
if(!c){var b=this.get("parentView");if(b){b=b.get("layer")}if(b){this._view_layer=c=this.findLayerInParentLayer(b)
}b=null}}return c}.property("isVisibleInWindow").cacheable(),$:function(c){var a,b=this.get("layer");
a=!b?SC.$([]):(c===undefined)?SC.$(b):SC.$(c,b);b=null;return a},containerLayer:function(){return this.get("layer")
}.property("layer").cacheable(),layerId:function(){return SC.guidFor(this)}.property().cacheable(),findLayerInParentLayer:function(e){var a=this.get("layerId"),g,c,b,j,f;
if(e.getElementById){f=e.getElementById(a)}else{f=document.getElementById(a)}if(SC.browser.msie&&f&&f.id!==a){f=null
}if(!f&&e.querySelector){f=e.querySelector("#"+a)}if(!f){f=e.firstChild;var h=[];
h.push(e);while(h.length!==0){g=h[0];h.shift();if(g.id===a){j=true;f=g;break}for(c=0,b=g.childNodes.length;
c<b;c++){h.push(g.childNodes[c])}}if(!j){f=null}}return f},displayDidChange:function(){this.set("layerNeedsUpdate",YES);
return this},layerNeedsUpdate:NO,_view_layerNeedsUpdateDidChange:function(){if(this.get("layerNeedsUpdate")){this.invokeOnce(this.updateLayerIfNeeded)
}}.observes("layerNeedsUpdate"),updateLayerIfNeeded:function(){var a=this.get("isVisibleInWindow");
if((a||this._needsVisibiltyChange)&&this.get("layerNeedsUpdate")){this._needsVisibiltyChange=NO;
if(this.get("layer")){this.beginPropertyChanges();this.set("layerNeedsUpdate",NO);
this.updateLayer();this.endPropertyChanges()}}else{this.set("layerNeedsUpdate",NO)
}return this},updateLayer:function(){var a=this.renderContext(this.get("layer"));
this.prepareContext(a,NO);a.update();if(a._innerHTMLReplaced){var b=this.get("pane");
if(b&&b.get("isPaneAttached")){this._notifyDidAppendToDocument()}}if(this.didUpdateLayer){this.didUpdateLayer()
}if(this.designer&&this.designer.viewDidUpdateLayer){this.designer.viewDidUpdateLayer()
}return this},renderContext:function(a){return SC.RenderContext(a)},createLayer:function(){if(this.get("layer")){return this
}var a=this.renderContext(this.get("tagName"));this.prepareContext(a,YES);this.set("layer",a.element());
this._notifyDidCreateLayer();return this},_notifyDidCreateLayer:function(){if(this.didCreateLayer){this.didCreateLayer()
}var c=this.didCreateLayerMixin,b,a,e=this.get("childViews");if(c){b=c.length;for(a=0;
a<b;++a){c[a].call(this)}}b=e.length;for(a=0;a<b;++a){if(!e[a]){continue}e[a]._notifyDidCreateLayer()
}},destroyLayer:function(){var a=this.get("layer");if(a){this._notifyWillDestroyLayer();
if(a.parentNode){a.parentNode.removeChild(a)}a=null}return this},replaceLayer:function(){this.destroyLayer();
this.set("layerLocationNeedsUpdate",YES);this.invokeOnce(this.updateLayerLocationIfNeeded)
},_notifyWillDestroyLayer:function(){if(this.willDestroyLayer){this.willDestroyLayer()
}var c=this.willDestroyLayerMixin,b,a,e=this.get("childViews");if(c){b=c.length;for(a=0;
a<b;++a){c[a].call(this)}}b=e.length;for(a=0;a<b;++a){e[a]._notifyWillDestroyLayer()
}this.set("layer",null)},prepareContext:function(g,i){var f,b,a,e,c,h;if(i){e=this.layerId?this.get("layerId"):SC.guidFor(this);
g.id(e).classNames(this.get("classNames"),YES);this.renderLayout(g,i)}else{g.resetClassNames();
g.classNames(this.get("classNames"),YES)}if(this.get("isTextSelectable")){g.addClass("allow-select")
}if(!this.get("isEnabled")){g.addClass("disabled")}if(!this.get("isVisible")){g.addClass("hidden")
}if(this.get("isFirstResponder")){g.addClass("focus")}c=this.get("backgroundColor");
if(c){g.addStyle("backgroundColor",c)}h=this.get("cursor");if(h){g.addClass(h.get("className"))
}this.beginPropertyChanges();this.set("layerNeedsUpdate",NO);this.render(g,i);if(f=this.renderMixin){b=f.length;
for(a=0;a<b;++a){f[a].call(this,g,i)}}this.endPropertyChanges()},renderChildViews:function(f,g){var e=this.get("childViews"),b=e.length,a,c;
for(a=0;a<b;++a){c=e[a];if(!c){continue}f=f.begin(c.get("tagName"));c.prepareContext(f,g);
f=f.end()}return f},render:function(a,b){if(b){this.renderChildViews(a,b)}},_notifyDidAppendToDocument:function(){if(this.didAppendToDocument){this.didAppendToDocument()
}var c=0,e,a,b=this.get("childViews");for(c=0,a=b.length;c<a;c++){e=b[c];if(e._notifyDidAppendToDocument){e._notifyDidAppendToDocument()
}}},tagName:"div",classNames:["sc-view"],toolTip:null,isTextSelectable:NO,displayProperties:["isFirstResponder","isVisible"],cursor:null,layerLocationNeedsUpdate:NO,updateLayerLocationIfNeeded:function(a){if(this.get("layerLocationNeedsUpdate")){this.set("layerLocationNeedsUpdate",NO);
this.updateLayerLocation()}return this},updateLayerLocation:function(){var f=this.get("layer"),e=this.get("parentView"),b=e?e.get("containerLayer"):null;
if(f&&f.parentNode&&f.parentNode!==b){f.parentNode.removeChild(f)}if(!e){if(f&&f.parentNode){f.parentNode.removeChild(f)
}}else{if(!b){if(f){if(f.parentNode){f.parentNode.removeChild(f)}this.destroyLayer()
}}else{if(!f){this.createLayer();f=this.get("layer")}var g=e.get("childViews");var c=g.objectAt(g.indexOf(this)+1);
var a=(c)?c.get("layer"):null;if(c&&(!a||a.parentNode!==b)){c.updateLayerLocationIfNeeded();
a=c.get("layer")}if((f.parentNode!==b)||(f.nextSibling!==a)){b.insertBefore(f,a);
if(this.parentViewDidResize){this.parentViewDidResize()}}}}b=e=f=a=null;return this
},nextResponder:function(){return this.get("parentView")}.property("parentView").cacheable(),acceptsFirstResponder:NO,isKeyResponder:NO,willLoseKeyResponderTo:function(a){},willBecomeKeyResponderFrom:function(a){},didLoseKeyResponderTo:function(a){},didBecomeKeyResponderFrom:function(a){},interpretKeyEvents:function(b){var a=b.commandCodes(),e=a[0],f=a[1],h;
if(!e&&!f){return null}if(e){var i=SC.MODIFIED_KEY_BINDINGS[e]||SC.BASE_KEY_BINDINGS[e.match(/[^_]+$/)[0]];
if(i){var g=this,c=this.get("pane"),j=null;while(g&&!(j=g.tryToPerform(i,b))){g=(g===c)?null:g.get("nextResponder")
}return j}}if(f&&this.respondsTo("insertText")){h=this.insertText(f,b);return h?(h===YES?this:h):null
}return null},insertText:function(a){return NO},performKeyEquivalent:function(f,c){var e=NO,g=this.get("childViews"),b=g.length,a=-1;
while(!e&&(++a<b)){e=g[a].performKeyEquivalent(f,c)}return e},nextKeyView:null,nextValidKeyView:function(){var a=[],c=this.pane(),b;
b=c._computeNextValidKeyView(this,a);return b}.property("nextKeyView"),_computeNextValidKeyView:function(h,b){var c=this.get("nextKeyView"),f,e,a,g;
if(this!==h&&b.indexOf(h)!=-1&&this.get("acceptsFirstResponder")&&this.get("isVisibleInWindow")){return this
}b.push(this);if(!c){f=this.get("childViews");for(e=0,a=f.length;e<a;e++){g=f[e];
if(g.get("isVisibleInWindow")&&g.get("isVisible")){c=g._computeNextValidKeyView(h,b)
}if(c){return c}}c=null}return c},previousKeyView:null,previousValidKeyView:function(){var a=[],c=this.pane(),b;
b=c._computePreviousValidKeyView(this,a);return b}.property("previousKeyView"),_computePreviousValidKeyView:function(g,a){var b=this.get("previousKeyView"),e,c,f;
if(this!==g&&a.indexOf(g)!=-1&&this.get("acceptsFirstResponder")&&this.get("isVisibleInWindow")){return this
}a.push(this);if(!b){e=this.get("childViews");for(c=e.length-1;0<=c;c--){f=e[c];if(f.get("isVisibleInWindow")&&f.get("isVisible")){b=f._computePreviousValidKeyView(g,a)
}if(b){return b}}b=null}return b},init:function(){var f,h,c,b,a,e,i;arguments.callee.base.apply(this,arguments);
if(!this.get("isMaterialized")){SC.View.views[this.get("layerId")]=this}var g=this.get("childViews");
this.childViews=g?g.slice():[];this.createChildViews();i=this.get("displayProperties");
b=i.length;while(--b>=0){this.addObserver(i[b],this,this.displayDidChange)}if(this.get("isDropTarget")){SC.Drag.addDropTarget(this)
}if(this.get("isScrollable")){SC.Drag.addScrollableView(this)}},awake:function(){arguments.callee.base.apply(this,arguments);
var c=this.get("childViews"),b=c.length,a;for(a=0;a<b;++a){if(!c[a]){continue}c[a].awake()
}},destroy:function(){if(this.get("isDestroyed")){return this}arguments.callee.base.apply(this,arguments);
this.removeFromParent();this._destroy();if(this.get("isDropTarget")){SC.Drag.removeDropTarget(this)
}if(this.get("isScrollable")){SC.Drag.removeScrollableView(this)}return this},_destroy:function(){if(this.get("isDestroyed")){return this
}this.destroyLayer();var c=this.get("childViews"),b=c.length,a;if(b){c=c.slice();
for(a=0;a<b;++a){c[a]._destroy()}}delete SC.View.views[this.get("layerId")];delete this._CQ;
delete this.page;this.set("isDestroyed",YES);return this},createChildViews:function(){var g=this.get("childViews"),b=g.length,a,f,e,c;
this.beginPropertyChanges();for(a=0;a<b;++a){if(f=(c=g[a])){if(typeof f===SC.T_STRING){c=this[f]
}else{f=null}if(!c){console.error("No view with name "+f+" has been found in "+this.toString());
continue}if(c.isClass){c=this.createChildView(c);if(f){this[f]=c}}}g[a]=c}this.endPropertyChanges();
return this},createChildView:function(a,b){if(!b){b={}}b.owner=b.parentView=this;
b.isVisibleInWindow=this.get("isVisibleInWindow");if(!b.page){b.page=this.page}a=a.create(b);
return a},adjust:function(a,e){var b=SC.clone(this.get("layout")),c=NO,g;if(a===undefined){return this
}if(SC.typeOf(a)===SC.T_STRING){g=b[a];if(SC.none(e)){if(g!==undefined){c=YES}delete b[a]
}else{if(g!==e){c=YES}b[a]=e}}else{var f=a;for(a in f){if(!f.hasOwnProperty(a)){continue
}e=f[a];g=b[a];if(e===null){if(g!==undefined){c=YES}delete b[a]}else{if(e!==undefined){if(g!==e){c=YES
}b[a]=e}}}}if(c){this.set("layout",b)}return this},layout:{top:0,left:0,bottom:0,right:0},convertFrameToView:function(j,e){var c=0,b=0,h=0,g=0,a=this,i;
if(this.get("useStaticLayout")){throw"convertFrameToView is not available with static layout"
}while(a){i=a.get("frame");c+=i.x;b+=i.y;a=a.get("layoutView")}if(e){a=e;while(a){i=a.get("frame");
h+=i.x;g+=i.y;a=a.get("layoutView")}}c=j.x+c-h;b=j.y+b-g;return{x:c,y:b,width:j.width,height:j.height}
},convertFrameFromView:function(b,a){var l=0,i=0,h=0,g=0,j=this,c,e;if(this.get("useStaticLayout")){throw"convertFrameToView is not available with static layout"
}while(j&&j.get("frame")){e=j.get("frame");l+=e.x;i+=e.y;j=j.get("parentView")}if(a){j=a;
while(j){e=j.get("frame");h+=e.x;g+=e.y;j=j.get("parentView")}}l=b.x-l+h;i=b.y-i+g;
return{x:l,y:i,width:b.width,height:b.height}},scrollToVisible:function(){var a=this.get("parentView");
while(a&&!a.get("isScrollable")){a=a.get("parentView")}if(a){a.scrollToVisible();
return a.scrollToVisible(this)}else{return NO}},frame:function(){return this.computeFrameWithParentFrame(null)
}.property("layout","useStaticLayout").cacheable(),computeFrameWithParentFrame:function(a){var h=this.get("layout"),i={},c,g,e=SC.LAYOUT_AUTO,b=this.get("useStaticLayout");
if(h.width!==undefined&&h.width===SC.LAYOUT_AUTO&&b!==undefined&&!b){c=SC.Error.desc("%@.layout() you cannot use width:auto if staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(c.toString());throw c}if(h.height!==undefined&&h.height===SC.LAYOUT_AUTO&&b!==undefined&&!b){c=SC.Error.desc("%@.layout() you cannot use height:auto if staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(c.toString());throw c}if(b){return null}if(!SC.none(h.left)){i.x=Math.floor(h.left);
if(h.width!==undefined){if(h.width===e){i.width=e}else{i.width=Math.floor(h.width)
}}else{if(!a){a=this.computeParentDimensions(h)}i.width=Math.floor(a.width-i.x-(h.right||0))
}}else{if(!SC.none(h.right)){if(!a){a=this.computeParentDimensions(h)}if(SC.none(h.width)){i.width=a.width-h.right;
i.x=0}else{if(h.width===e){i.width=e}else{i.width=Math.floor(h.width||0)}i.x=Math.floor(a.width-h.right-i.width)
}}else{if(!SC.none(h.centerX)){if(!a){a=this.computeParentDimensions(h)}if(h.width===e){i.width=e
}else{i.width=Math.floor(h.width||0)}i.x=Math.floor((a.width-i.width)/2+h.centerX)
}else{i.x=0;if(SC.none(h.width)){if(!a){a=this.computeParentDimensions(h)}i.width=Math.floor(a.width)
}else{if(h.width===e){i.width=e}else{i.width=Math.floor(h.width||0)}}}}}if(!SC.none(h.top)){i.y=Math.floor(h.top);
if(h.height!==undefined){if(h.height===e){i.height=e}else{i.height=Math.floor(h.height)
}}else{if(!a){a=this.computeParentDimensions(h)}i.height=Math.floor(a.height-i.y-(h.bottom||0))
}}else{if(!SC.none(h.bottom)){if(!a){a=this.computeParentDimensions(h)}if(SC.none(h.height)){i.height=a.height-h.bottom;
i.y=0}else{if(h.height===e){i.height=e}else{i.height=Math.floor(h.height||0)}i.y=Math.floor(a.height-h.bottom-i.height)
}}else{if(!SC.none(h.centerY)){if(!a){a=this.computeParentDimensions(h)}if(h.height===e){i.height=e
}else{i.height=Math.floor(h.height||0)}i.y=Math.floor((a.height-i.height)/2+h.centerY)
}else{i.y=0;if(SC.none(h.height)){if(!a){a=this.computeParentDimensions(h)}i.height=Math.floor(a.height)
}else{if(h.height===e){i.height=e}else{i.height=Math.floor(h.height||0)}}}}}if(i.height===e||i.width===e){g=this.get("layer");
if(i.height===e){i.height=g?g.clientHeight:0}if(i.width===e){i.width=g?g.clientWidth:0
}}if(!SC.none(h.maxHeight)&&(i.height>h.maxHeight)){i.height=h.maxHeight}if(!SC.none(h.minHeight)&&(i.height<h.minHeight)){i.height=h.minHeight
}if(!SC.none(h.maxWidth)&&(i.width>h.maxWidth)){i.width=h.maxWidth}if(!SC.none(h.minWidth)&&(i.width<h.minWidth)){i.width=h.minWidth
}if(i.height<0){i.height=0}if(i.width<0){i.width=0}return i},computeParentDimensions:function(g){var b,c=this.get("parentView"),a=(c)?c.get("frame"):null;
if(a){b={width:a.width,height:a.height}}else{var e=g;b={width:(e.left||0)+(e.width||0)+(e.right||0),height:(e.top||0)+(e.height||0)+(e.bottom||0)}
}return b},clippingFrame:function(){var b=this.get("parentView"),c=this.get("frame"),a=c;
if(b){b=b.get("clippingFrame");a=SC.intersectRects(b,c)}a.x-=c.x;a.y-=c.y;return a
}.property("parentView","frame").cacheable(),_sc_view_clippingFrameDidChange:function(){var e=this.get("childViews"),b=e.length,a,c;
for(a=0;a<b;++a){c=e[a];if(!c.hasStaticLayout){c.notifyPropertyChange("clippingFrame")
}}}.observes("clippingFrame"),parentViewDidResize:function(){var a=this.get("layout");
var b=((a.left!==undefined)&&(a.top!==undefined)&&(a.width!==undefined)&&(a.height!==undefined));
if(!b){this.notifyPropertyChange("frame");this.viewDidResize()}},viewDidResize:function(){var e=this.childViews,b=e.length,a,c;
for(a=0;a<b;++a){c=e[a];if(c.parentViewDidResize){c.parentViewDidResize()}}}.observes("layout"),beginLiveResize:function(){if(this.willBeginLiveResize){this.willBeginLiveResize()
}var e=this.get("childViews"),b=e.length,a,c;for(a=0;a<b;++a){c=e[a];if(c.beginLiveResize){c.beginLiveResize()
}}return this},endLiveResize:function(){var e=this.get("childViews"),b=e.length,a,c;
for(a=b-1;a>=0;--a){c=e[a];if(c.endLiveResize){c.endLiveResize()}}if(this.didEndLiveResize){this.didEndLiveResize()
}return this},layoutStyle:function(){var b=this.get("layout"),e={},a=null,f,l=SC.LAYOUT_AUTO,m=this.get("useStaticLayout");
if(b.width!==undefined&&b.width===SC.LAYOUT_AUTO&&!m){f=SC.Error.desc("%@.layout() you cannot use width:auto if  staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(f.toString());throw f}if(b.height!==undefined&&b.height===SC.LAYOUT_AUTO&&!m){f=SC.Error.desc("%@.layout() you cannot use height:auto if  staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(f.toString());throw f}if(!SC.none(b.left)){e.left=Math.floor(b.left);
if(b.width!==undefined){if(b.width===SC.LAYOUT_AUTO){e.width=SC.LAYOUT_AUTO}else{e.width=Math.floor(b.width)
}e.right=null}else{e.width=null;e.right=Math.floor(b.right||0)}e.marginLeft=0}else{if(!SC.none(b.right)){e.right=Math.floor(b.right);
e.marginLeft=0;if(SC.none(b.width)){e.left=0;e.width=null}else{e.left=null;if(b.width===SC.LAYOUT_AUTO){e.width=SC.LAYOUT_AUTO
}else{e.width=Math.floor(b.width||0)}}}else{if(!SC.none(b.centerX)){e.left="50%";
e.width=Math.floor(b.width||0);e.marginLeft=Math.floor(b.centerX-e.width/2);e.right=null
}else{if(!SC.none(b.width)){e.left=0;e.right=null;if(b.width===SC.LAYOUT_AUTO){e.width=SC.LAYOUT_AUTO
}else{e.width=Math.floor(b.width)}e.marginLeft=0}else{e.left=0;e.right=0;e.width=null;
e.marginLeft=0}}}}e.minWidth=(b.minWidth===undefined)?null:b.minWidth;e.maxWidth=(b.maxWidth===undefined)?null:b.maxWidth;
if(!SC.none(b.top)){e.top=Math.floor(b.top);if(b.height!==undefined){if(b.height===SC.LAYOUT_AUTO){e.height=SC.LAYOUT_AUTO
}else{e.height=Math.floor(b.height)}e.bottom=null}else{e.height=null;e.bottom=Math.floor(b.bottom||0)
}e.marginTop=0}else{if(!SC.none(b.bottom)){e.marginTop=0;e.bottom=Math.floor(b.bottom);
if(SC.none(b.height)){e.top=0;e.height=null}else{e.top=null;if(b.height===SC.LAYOUT_AUTO){e.height=SC.LAYOUT_AUTO
}else{e.height=Math.floor(b.height||0)}}}else{if(!SC.none(b.centerY)){e.top="50%";
e.height=Math.floor(b.height||0);e.marginTop=Math.floor(b.centerY-e.height/2);e.bottom=null
}else{if(!SC.none(b.height)){e.top=0;e.bottom=null;if(b.height===SC.LAYOUT_AUTO){e.height=SC.LAYOUT_AUTO
}else{e.height=Math.floor(b.height||0)}e.marginTop=0}else{e.top=0;e.bottom=0;e.height=null;
e.marginTop=0}}}}e.minHeight=(b.minHeight===undefined)?null:b.minHeight;e.maxHeight=(b.maxHeight===undefined)?null:b.maxHeight;
e.zIndex=SC.none(b.zIndex)?null:b.zIndex.toString();e.backgroundPosition=SC.none(b.backgroundPosition)?null:b.backgroundPosition.toString();
var i=SC._VIEW_DEFAULT_DIMS,c=i.length,g;while(--c>=0){g=i[c];if(e[g]===0){e[g]=null
}}for(var j in e){var h=e[j];if(typeof h===SC.T_NUMBER){e[j]=(h+"px")}}return e}.property().cacheable(),layoutView:function(){return this.get("parentView")
}.property("parentView").cacheable(),layoutDidChange:function(){this.beginPropertyChanges();
if(this.frame){this.notifyPropertyChange("frame")}this.notifyPropertyChange("layoutStyle");
this.endPropertyChanges();var a=this.get("layoutView");if(a){a.set("childViewsNeedLayout",YES);
a.layoutDidChangeFor(this);if(a.get("childViewsNeedLayout")){a.invokeOnce(a.layoutChildViewsIfNeeded)
}}return this}.observes("layout"),childViewsNeedLayout:NO,layoutDidChangeFor:function(b){var a=this._needLayoutViews;
if(!a){a=this._needLayoutViews=SC.CoreSet.create()}a.add(b)},layoutChildViewsIfNeeded:function(a){if(!a){a=this.get("isVisibleInWindow")
}if(a&&this.get("childViewsNeedLayout")){this.set("childViewsNeedLayout",NO);this.layoutChildViews()
}return this},layoutChildViews:function(){var g=this._needLayoutViews,b=g?g.length:0,a,c,f,e;
for(a=0;a<b;a++){c=g[a];c.updateLayout()}c=f=e=null;g.clear()},updateLayout:function(){var b=this.get("layer"),a;
if(b){a=this.renderContext(b);this.renderLayout(a);a.update()}b=null;return this},renderLayout:function(a,b){a.addStyle(this.get("layoutStyle"))
},isView:YES,selectStart:function(a){return this.get("isTextSelectable")}});SC.View.mixin({isViewClass:YES,design:function(){if(this.isDesign){return this
}var a=this.extend.apply(this,arguments);a.isDesign=YES;if(SC.ViewDesigner){SC.ViewDesigner.didLoadDesign(a,this,SC.A(arguments))
}return a},layout:function(a){this.prototype.layout=a;return this},convertLayoutToAnchoredLayout:function(b,c){var a={top:0,left:0,width:c.width,height:c.height};
if(!SC.none(b.left)){a.left=Math.floor(b.left);if(b.width!==undefined){if(b.width===SC.LAYOUT_AUTO){a.width=SC.LAYOUT_AUTO
}else{a.width=Math.floor(b.width)}}else{a.width=c.width-a.left-Math.floor(b.right||0)
}}else{if(!SC.none(b.right)){if(SC.none(b.width)){a.left=0;a.width=c.width-Math.floor(b.right||0)
}else{if(b.width===SC.LAYOUT_AUTO){a.width=SC.LAYOUT_AUTO}else{a.width=b.width;a.left=c.width-(b.width+b.right)
}}}else{if(!SC.none(b.centerX)){a.width=Math.floor(b.width||0);a.left=Math.floor((c.width-a.width)/2)+b.centerX
}else{if(!SC.none(b.width)){a.left=0;if(b.width===SC.LAYOUT_AUTO){a.width=SC.LAYOUT_AUTO
}else{a.width=Math.floor(b.width)}}else{a.left=0;a.width=0}}}}if(b.minWidth!==undefined){a.minWidth=b.minWidth
}if(b.maxWidth!==undefined){a.maxWidth=b.maxWidth}if(!SC.none(b.top)){a.top=Math.floor(b.top);
if(b.height!==undefined){if(b.height===SC.LAYOUT_AUTO){a.height=SC.LAYOUT_AUTO}else{a.height=Math.floor(b.height)
}}else{a.height=c.height-a.top-Math.floor(b.bottom||0)}}else{if(!SC.none(b.bottom)){if(SC.none(b.height)){a.top=0;
a.height=c.height-Math.floor(b.bottom||0)}else{if(b.height===SC.LAYOUT_AUTO){a.height=SC.LAYOUT_AUTO
}else{a.height=b.height;a.top=c.height-(b.height+b.bottom)}}}else{if(!SC.none(b.centerY)){a.height=Math.floor(b.height||0);
a.top=Math.floor((c.height-a.height)/2)+b.centerY}else{if(!SC.none(b.height)){a.top=0;
if(b.height===SC.LAYOUT_AUTO){a.height=SC.LAYOUT_AUTO}else{a.height=Math.floor(b.height)
}}else{a.top=0;a.height=0}}}}if(b.minHeight!==undefined){a.minHeight=b.minHeight}if(b.maxHeight!==undefined){a.maxHeight=b.maxHeight
}return a},convertLayoutToCustomLayout:function(b,a,c){},classNames:function(a){a=(this.prototype.classNames||[]).concat(a);
this.prototype.classNames=a;return this},tagName:function(a){this.prototype.tagName=a;
return this},childView:function(a){var b=this.prototype.childViews||[];if(b===this.superclass.prototype.childViews){b=b.slice()
}b.push(a);this.prototype.childViews=b;return this},bind:function(b,e){var c=this.prototype,a=this.superclass.prototype;
var f=c._bindings;if(!f||f===a._bindings){f=c._bindings=(f||[]).slice()}b=b+"Binding";
c[b]=e;f.push(b);return this},prop:function(a,b){this.prototype[a]=b;return this},localization:function(b,a){if(a){b.rootElement=SC.$(a)[0]
}return b},viewFor:function(e,c){var b=SC.$A(arguments);if(SC.none(e)){b.shift()}else{b[0]={rootElement:SC.$(e)[0]}
}var a=this.create.apply(this,arguments);b=b[0]=null;return a},create:function(){var b=this,a=new b(arguments);
if(SC.ViewDesigner){SC.ViewDesigner.didCreateView(a,SC.$A(arguments))}return a},loc:function(f){var b=f.childViews;
delete f.childViews;this.applyLocalizedAttributes(f);if(SC.ViewDesigner){SC.ViewDesigner.didLoadLocalization(this,SC.$A(arguments))
}var e=this.prototype.childViews,a=e.length;while(--a>=0){var c=e[a];f=b[a];if(f&&c&&c.loc){c.loc(f)
}}return this},applyLocalizedAttributes:function(a){SC.mixin(this.prototype,a)},views:{}});
SC.outlet=function(a){return function(b){return(this[b]=SC.objectForPropertyPath(a,this))
}.property()};SC.View.unload=function(){var a=SC.View.views;if(a){for(var b in a){if(!a.hasOwnProperty(b)){continue
}delete a[b]}}};SC.Event.add(window,"unload",SC.View,SC.View.unload);SC.Validatable={initMixin:function(){this._validatable_validatorDidChange()
},validator:null,errorLabel:null,isValid:function(){return SC.typeOf(this.get("value"))!==SC.T_ERROR
}.property("value"),ownerForm:null,performValidate:function(c){var a=SC.VALIDATE_OK;
if(this._validator){var b=this.get("ownerForm");if(c){a=this._validator.validatePartial(b,this);
if((a==SC.VALIDATE_NO_CHANGE)&&(this._validator.validateChange(b,this)==SC.VALIDATE_OK)){a=SC.VALIDATE_OK
}}else{a=this._validator.validateChange(b,this)}}return a},performValidateSubmit:function(){return this._validator?this._validator.validateSubmit(this.get("ownerForm"),this):SC.VALIDATE_OK
},performValidateKeyDown:function(a){var b=a.getCharString();if(!b){return YES}return this._validator?this._validator.validateKeyDown(this.get("ownerForm"),this,b):YES
},validatorObject:function(){return this._validator}.property(),validateSubmit:function(){return this.performValidateSubmit()
},objectForFieldValue:function(b,a){return this._validator?this._validator.objectForFieldValue(b,this.get("ownerForm"),this):b
},fieldValueForObject:function(a){return this._validator?this._validator.fieldValueForObject(a,this.get("ownerForm"),this):a
},_validatable_displayObserver:function(){this.displayDidChange()}.observes("isValid"),updateLayerMixin:function(a){a.setClass("invalid",!this.get("isValid"))
},_validatable_validatorDidChange:function(){var a=this.get("ownerForm");var b=SC.Validator.findFor(a,this,this.get("validator"));
if(b!=this._validator){this.propertyWillChange("validatorObject");if(this._validator){this._validator.detachFrom(a,this)
}this._validator=b;if(this._validator){this._validator.attachTo(a,this)}this.propertyDidChange("validatorObject")
}}.observes("validator","ownerForm")};sc_require("views/view");sc_require("mixins/control");
sc_require("mixins/validatable");SC.FieldView=SC.View.extend(SC.Control,SC.Validatable,{isTextArea:NO,_field_isMouseDown:NO,fieldValue:function(){var a=this.get("value");
if(SC.typeOf(a)===SC.T_ERROR){a=a.get("value")}return this.fieldValueForObject(a)
}.property("value","validator").cacheable(),$input:function(){if(this.get("isTextArea")){return this.$("textarea").andSelf().filter("textarea")
}else{return this.$("input").andSelf().filter("input")}},setFieldValue:function(b){if(SC.none(b)){b=""
}var a=this.$input();if(a.val()!==b){a.val(b)}return this},getFieldValue:function(){return this.$input().val()
},_field_fieldValueDidChange:function(a){SC.RunLoop.begin();this.fieldValueDidChange(NO);
SC.RunLoop.end()},fieldValueDidChange:function(a){var c=this.getFieldValue();var b=this.objectForFieldValue(c,a);
this.setIfChanged("value",b)},_field_valueDidChange:function(){this.setFieldValue(this.get("fieldValue"))
}.observes("value"),didCreateLayer:function(){this.setFieldValue(this.get("fieldValue"));
SC.Event.add(this.$input(),"change",this,this._field_fieldValueDidChange)},didAppendToDocument:function(){if(this.get("isTextArea")){this.setFieldValue(this.get("fieldValue"));
SC.Event.add(this.$input(),"change",this,this._field_fieldValueDidChange)}},willDestroyLayer:function(){SC.Event.remove(this.$input(),"change",this,this._field_fieldValueDidChange)
},updateLayer:function(){arguments.callee.base.apply(this,arguments)},mouseDown:function(a){this._field_isMouseDown=YES;
a.allowDefault();return YES},mouseOut:function(a){if(this._field_isMouseDown){this.set("isActive",NO)
}a.allowDefault();return YES},mouseOver:function(a){this.set("isActive",this._field_isMouseDown);
a.allowDefault();return YES},mouseUp:function(a){if(this._field_isMouseDown){this.set("isActive",NO)
}this._field_isMouseDown=NO;a.allowDefault();return YES},keyDown:function(b){if(b.which===9){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(a){a.becomeFirstResponder()}else{b.allowDefault()}return YES}if(this.performValidateKeyDown(b)){this._isKeyDown=YES;
b.allowDefault()}else{b.stop()}return YES},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$input()[0].focus()
}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}},_field_setFieldValue:function(b){this.propertyWillChange("fieldValue");
if(this.fieldValueForObject){b=this.fieldValueForObject(b)}var a=this.setFieldValue(b);
this.propertyDidChange("fieldValue");return a},_field_getFieldValue:function(){var a=this.getFieldValue();
if(this.objectForFieldValue){a=this.objectForFieldValue(a)}return a}});SC.TextSelection=SC.Object.extend(SC.Copyable,SC.Freezable,{start:-1,end:-1,length:function(){var b=this.get("start");
var a=this.get("end");if((b)===-1||(a===-1)){return -1}else{return a-b}}.property("start","end").cacheable(),init:function(){arguments.callee.base.apply(this,arguments);
this.freeze()},copy:function(){return SC.TextSelection.create({start:this.get("start"),end:this.get("end")})
},toString:function(){var a=this.get("length");if(a&&a>0){if(a===1){return"[%@ character selected: {%@, %@}]".fmt(a,this.get("start"),this.get("end"))
}else{return"[%@ characters selected: {%@, %@}]".fmt(a,this.get("start"),this.get("end"))
}}else{return"[no text selected; caret at %@]".fmt(this.get("start"))}}});SC.StaticLayout={hasStaticLayout:YES,useStaticLayout:NO,renderMixin:function(a,b){a.setClass("sc-static-layout",this.get("useStaticLayout"))
},clippingFrame:null,parentViewDidResize:null,beginLiveResize:null,endLiveResize:null,viewDidResize:null};
sc_require("views/field");sc_require("system/text_selection");sc_require("mixins/static_layout");
SC.TextFieldView=SC.FieldView.extend(SC.StaticLayout,SC.Editable,{tagName:"label",classNames:["sc-text-field-view"],isPassword:NO,isTextArea:NO,hint:null,isEditing:NO,leftAccessoryView:null,rightAccessoryView:null,_isFocused:NO,isEditable:function(){return this.get("isEnabled")
}.property("isEnabled").cacheable(),selection:function(n,l){var e=this.$input()[0],f,a,c;
if(l===undefined){if(e){a=null;c=null;if(!e.value){a=c=0}else{if("selectionStart" in e){a=e.selectionStart
}if("selectionEnd" in e){c=e.selectionEnd}if(a===null||c===null){var m=document.selection;
if(m){var j=m.type;if(j&&(j==="None"||j==="Text")){f=m.createRange();if(!this.get("isTextArea")){var b=f.text.length;
a=Math.abs(f.moveStart("character",0-(e.value.length+1)));c=a+b}else{var i=f.duplicate();
i.moveToElementText(e);i.setEndPoint("EndToStart",f);a=i.text.length;c=a+f.text.length
}}}}}return SC.TextSelection.create({start:a,end:c})}else{return null}}else{if(!l||!l.kindOf||!l.kindOf(SC.TextSelection)){throw"When setting the selection, you must specify an SC.TextSelection instance."
}if(e){var h,g;if("selectionStart" in e){e.selectionStart=l.get("start");h=YES}if("selectionEnd" in e){e.selectionEnd=l.get("end");
g=YES}if(!h||!g){f=e.createTextRange();a=l.get("start");f.move("character",a);f.moveEnd("character",l.get("end")-a);
f.select()}}}}.property("fieldValue").cacheable(),displayProperties:"hint fieldValue isEditing leftAccessoryView rightAccessoryView isTextArea".w(),createChildViews:function(){this.accessoryViewObserver()
},acceptsFirstResponder:function(){return this.get("isEnabled")}.property("isEnabled"),accessoryViewObserver:function(){var g,j=["leftAccessoryView","rightAccessoryView"],a=j.length,b,f,e,h;
for(b=0;b<a;b++){f=j[b];e=this["_"+f];h=this.get(f);if(!(e&&h&&(e===h))){if(e){g=e.get("classNames");
g=g.without("sc-text-field-accessory-view");e.set("classNames",g);this.removeChild(e);
e=null;this["_"+f]=null}if(h){if(h.isClass){h=h.create({layoutView:this})}g=h.get("classNames");
var c="sc-text-field-accessory-view";if(g.indexOf(c)<0){g.push(c)}this.appendChild(h);
this["_"+f]=h}}}}.observes("leftAccessoryView","rightAccessoryView"),layoutChildViewsIfNeeded:function(a){if(!a){a=this.get("isVisibleInWindow")
}if(a&&this.get("childViewsNeedLayout")){var b=this.get("rightAccessoryView");if(b&&b.get){var c=b.get("layout");
if(c){c.left=null;if(!c.right){c.right=0}b.adjust({layout:c})}}}arguments.callee.base.apply(this,arguments)
},render:function(c,a){arguments.callee.base.apply(this,arguments);var f=this.get("isEnabled")?"":'disabled="disabled"',b=SC.guidFor(this),i=this.get("isPassword")?"password":"text",j,h,e,g;
if(this.get("isTextArea")){c.addClass("text-area")}j=this.get("fieldValue");if(SC.none(j)){j=""
}c.setClass("not-empty",j.length>0);h=this._getAccessoryViewWidths();e=h.left;g=h.right;
if(e){e+="px"}if(g){g+="px"}this._renderField(c,a,j,e,g);if(SC.browser.mozilla){this.invokeLast(this._applyFirefoxCursorFix)
}},_forceRenderFirstTime:NO,_renderFieldLikeFirstTime:function(){this.set("_forceRenderFirstTime",YES)
}.observes("isTextArea"),_renderField:function(c,a,m,e,i){var f=this.get("hint"),g,b,o,j,l,h,n;
if(a||this._forceRenderFirstTime){this._forceRenderFirstTime=NO;g=this.get("isEnabled")?"":'disabled="disabled"';
b=this.get("layerId");c.push('<span class="border"></span>');o="";if(e||i){o='style="';
if(e){o+="left: "+e+"; "}if(i){o+="right: "+i+";"}o+='"'}c.push('<span class="padding" %@>'.fmt(o));
c.push('<span class="sc-hint">',f,"</span>");if(this.get("isTextArea")){c.push('<textarea name="',b,'" ',g,">",m,"</textarea></span>")
}else{j=this.get("isPassword")?"password":"text";c.push('<input type="',j,'" name="',b,'" ',g,' value="',m,'"/></span>')
}}else{l=this.$(".sc-hint");if(f!==this._textField_currentHint){this._textField_currentHint=f;
l.text(f)}h=this.$input()[0];if(h){if(!this.get("isEnabled")){h.disabled="true"}else{h.disabled=null
}n=h.parentNode.style;if(e){if(n.left!==e){n.left=e}}else{n.left=null}if(i){if(n.right!==i){n.right=i
}}else{n.right=null}}}},_getAccessoryViewWidths:function(){var c={},m=["left","right"],e=m.length,g,h,n,l,a,j,f,b;
for(g=0;g<e;g++){h=m[g];n=this.get(h+"AccessoryView");if(n&&n.get){b=n.get("frame");
if(b){a=b.width;if(a){j=n.get("layout");if(j){f=j[h];a+=f}c[h]=a}}}}return c},didCreateLayer:function(){if(!this.get("isTextArea")){arguments.callee.base.apply(this,arguments);
this._addTextAreaEvents()}},didAppendToDocument:function(){if(this.get("isTextArea")){arguments.callee.base.apply(this,arguments);
this._addTextAreaEvents()}},_addTextAreaEvents:function(){var a=this.$input();SC.Event.add(a,"focus",this,this._textField_fieldDidFocus);
SC.Event.add(a,"blur",this,this._textField_fieldDidBlur);SC.Event.add(a,"select",this,this._textField_selectionDidChange);
if(SC.browser.mozilla){this._cacheInputElement=this.$input();this._cachePaddingElement=this.$(".padding")
}},willDestroyLayer:function(){arguments.callee.base.apply(this,arguments);var a=this.$input();
SC.Event.remove(a,"focus",this,this._textField_fieldDidFocus);SC.Event.remove(a,"blur",this,this._textField_fieldDidBlur);
SC.Event.remove(a,"select",this,this._textField_selectionDidChange)},_textField_fieldDidFocus:function(a){SC.RunLoop.begin();
this.fieldDidFocus();SC.RunLoop.end()},_textField_fieldDidBlur:function(a){SC.RunLoop.begin();
this.fieldDidBlur();SC.RunLoop.end()},fieldDidFocus:function(a){this.beginEditing()
},fieldDidBlur:function(){this.commitEditing()},_topOffsetForFirefoxCursorFix:3,_applyFirefoxCursorFix:function(){if(SC.browser.mozilla){var i,e,c,j,b,h,f,g;
f=this._cacheInputElement;g=this._cachePaddingElement;if(g&&g[0]){h=g[0];b=SC.$(h).offset();
if(f[0].tagName.toLowerCase()==="input"){i=b.top+this._topOffsetForFirefoxCursorFix
}else{i=b.top}e=b.left;c=h.offsetWidth;j=h.offsetHeight;var a="position: fixed; top: %@px; left: %@px; width: %@px; height: %@px;".fmt(i,e,c,j);
if(!this._prevStyle||this._prevStyle!=a){f.attr("style",a)}this._prevStyle=a}}return this
},_textField_selectionDidChange:function(){this.notifyPropertyChange("selection")
},willBecomeKeyResponderFrom:function(a){if(this.get("isVisibleInWindow")){this.$input()[0].focus();
if(!this._txtFieldMouseDown){if(SC.browser.mozilla){this.invokeOnce(this._selectRootElement)
}else{if(SC.browser.safari){this.invokeLater(this._selectRootElement,1)}else{this._selectRootElement()
}}}}},willLoseKeyResponderTo:function(a){},_selectRootElement:function(){this.$input()[0].select()
},didLoseKeyResponderTo:function(a){this.$input()[0].blur()},parentViewDidResize:function(){if(SC.browser.mozilla){this.invokeLast(this._applyFirefoxCursorFix)
}arguments.callee.base.apply(this,arguments)},keyDown:function(b){if((b.which===13)&&!this.get("isTextArea")){return NO
}if(b.which===27){return NO}if(b.which===9){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(a){a.becomeFirstResponder()}else{b.allowDefault()}return YES}if(this.performValidateKeyDown(b)){this._isKeyDown=YES;
b.allowDefault()}else{b.stop()}return YES},keyUp:function(a){this.notifyPropertyChange("selection");
if(this._isKeyDown){this.invokeLater(this.fieldValueDidChange,1,YES)}this._isKeyDown=NO;
a.allowDefault();return YES},mouseDown:function(a){this._txtFieldMouseDown=YES;if(!this.get("isEnabled")){a.stop();
return YES}else{if((this.value&&this.value.length===0)||!this.value){this.$input()[0].focus();
return YES}else{if(SC.browser.mozilla){this.$input()[0].focus()}return arguments.callee.base.apply(this,arguments)
}}},mouseUp:function(a){this._txtFieldMouseDown=NO;this.notifyPropertyChange("selection");
if(!this.get("isEnabled")){a.stop();return YES}else{if((this.value&&this.value.length===0)||!this.value){if(SC.browser.msie<8){this.invokeLater(this.focusIE7,1)
}else{this.$input()[0].focus()}return YES}else{return arguments.callee.base.apply(this,arguments)
}}},focusIE7:function(){this.$input()[0].focus()},selectStart:function(a){return YES
}});sc_require("views/text_field");SC.InlineTextFieldView=SC.TextFieldView.extend(SC.DelegateSupport,{_topOffsetForFirefoxCursorFix:0,beginEditing:function(b){if(!b){return
}var e={},g,c,f;this.beginPropertyChanges();if(this.get("isEditing")&&!this.blurEditor()){this.endPropertyChanges();
return NO}this._optframe=b.frame;this._optIsCollection=b.isCollection;this._exampleElement=b.exampleElement;
this._delegate=b.delegate;if(!this._optframe||!this._delegate){throw"At least frame and delegate options are required for inline editor"
}this._originalValue=b.value||"";this._multiline=(b.multiline!==undefined)?b.multiline:NO;
if(this._multiline){this.set("isTextArea",YES)}else{this.set("isTextArea",NO)}this._commitOnBlur=(b.commitOnBlur!==undefined)?b.commitOnBlur:YES;
this.set("validator",b.validator);this.set("value",this._originalValue);this.set("isEditing",YES);
g=this._delegate.pane();e.height=this._optframe.height;e.width=this._optframe.width;
c=this._delegate.get("layout");f=g.$()[0];if(this._optIsCollection&&c.left){e.left=this._optframe.x-c.left-f.offsetLeft-1;
if(SC.browser.msie==7){e.left--}}else{e.left=this._optframe.x-f.offsetLeft-1;if(SC.browser.msie==7){e.left--
}}if(this._optIsCollection&&c.top){e.top=this._optframe.y-c.top-f.offsetTop;if(SC.browser.msie==7){e.top=e.top-2
}}else{e.top=this._optframe.y-f.offsetTop;if(SC.browser.msie==7){e.top=e.top-2}}this.set("layout",e);
this.set("parentNode",g);g.appendChild(this);SC.RunLoop.begin().end();var a=this._delegate;
this._className=this.getDelegateProperty(a,"inlineEditorClassName");if(this._className&&!this.hasClassName(this._className)){this.setClassName(this._className,true)
}this.invokeDelegateMethod(a,"inlineEditorWillBeginEditing",this);this._previousFirstResponder=g?g.get("firstResponder"):null;
this.endPropertyChanges();this.invokeDelegateMethod(a,"inlineEditorDidBeginEditing",this);
this.invokeLast(this.becomeFirstResponder)},commitEditing:function(){if(!SC.$ok(this.validateSubmit())){return NO
}return this._endEditing(this.get("value"))},discardEditing:function(){return this._endEditing(this._originalValue)
},blurEditor:function(){if(!this.get("isEditing")){return YES}return this._commitOnBlur?this.commitEditing():this.discardEditing()
},_endEditing:function(b){if(!this.get("isEditing")){return YES}var a=this._delegate;
if(!this.invokeDelegateMethod(a,"inlineEditorShouldEndEditing",this,b)){return NO
}this.invokeDelegateMethod(a,"inlineEditorDidEndEditing",this,b);if(this._className){this.setClassName(this._className,false)
}this._originalValue=this._delegate=this._exampleElement=this._optframe=this._className=null;
this.set("isEditing",NO);if(this.get("isFirstResponder")){var c=this.get("pane");
if(c&&this._previousFirstResponder){c.makeFirstResponder(this._previousFirstResponder)
}else{this.resignFirstResponder()}}this._previousFirstResponder=null;if(this.get("parentNode")){this.removeFromParent()
}return YES},isEditing:NO,mouseDown:function(a){arguments.callee.base.call(this,a);
return this.get("isEditing")},keyDown:function(a){var b=this.interpretKeyEvents(a);
this.fieldValueDidChange(true);return !b?NO:b},insertText:null,willRemoveFromParent:function(){this.$input()[0].blur()
},willLoseFirstResponder:function(a){if(a!==this){return}this._previousFirstResponder=null;
this.$input()[0].blur();return this.blurEditor()},cancel:function(){this.discardEditing();
return YES},fieldValueDidChange:function(a){arguments.callee.base.call(this,a)},insertNewline:function(a){if(this._multiline){a.allowDefault();
return arguments.callee.base.call(this,a)}else{if(this.get("value")!=this.$input().val()){this.set("value",this.$input().val())
}this.commitEditing();return YES}},insertTab:function(a){this.resignFirstResponder();
this.commitEditing();if(this._delegate){var b=this._delegate.nextValidKeyView();if(b){b.beginEditing()
}}return YES},insertBacktab:function(a){this.commitEditing();if(this._delegate){var b=this._delegate.previousValidKeyView();
if(b){b.beginEditing()}}return YES},deleteForward:function(a){a.allowDefault();return YES
},deleteBackward:function(a){a.allowDefault();return YES}});SC.InlineTextFieldView.mixin({beginEditing:function(b){this._exampleElement=b.exampleElement;
var a=b.exampleInlineTextFieldView?b.exampleInlineTextFieldView:this;var g=b.delegate.get("layout");
var f=this.updateViewStyle();var h=this.updateViewPaddingStyle();var i=".inline-editor input{"+f+"} ";
i=i+".inline-editor textarea{"+f+"} .inline-editor .padding{"+h+"}";var e=document.getElementsByTagName("head")[0];
var c=document.createElement("style");c.type="text/css";c.media="screen";if(c.styleSheet){c.styleSheet.cssText=i
}else{c.appendChild(document.createTextNode(i))}e.appendChild(c);this.editor=a.create({classNames:"inline-editor",layout:g});
return this.editor.beginEditing(b)},commitEditing:function(){return this.editor?this.editor.commitEditing():YES
},discardEditing:function(){return this.editor?this.editor.discardEditing():YES},updateViewStyle:function(){var b=this._exampleElement[0];
var c="";var a=SC.getStyle(b,"font-size");if(a&&a.length>0){c=c+"font-size: "+a+" !important; "
}a=SC.getStyle(b,"font-family");if(a&&a.length>0){c=c+"font-family: "+a+" !important; "
}a=SC.getStyle(b,"font-weight");if(a&&a.length>0){c=c+"font-weight: "+a+" !important; "
}a=SC.getStyle(b,"z-index");if(a&&a.length>0){c=c+"z-index: "+a+" !important; "}a=SC.getStyle(b,"line-height");
if(a&&a.length>0){c=c+"line-height: "+a+" !important; "}a=SC.getStyle(b,"text-align");
if(a&&a.length>0){c=c+"text-align: "+a+" !important; "}a=SC.getStyle(b,"top-margin");
if(a&&a.length>0){c=c+"top-margin: "+a+" !important; "}a=SC.getStyle(b,"bottom-margin");
if(a&&a.length>0){c=c+"bottom-margin: "+a+" !important; "}a=SC.getStyle(b,"left-margin");
if(a&&a.length>0){c=c+"left-margin: "+a+" !important; "}a=SC.getStyle(b,"right-margin");
if(a&&a.length>0){c=c+"right-margin: "+a+" !important; "}return c},updateViewPaddingStyle:function(){var b=this._exampleElement[0];
var c="";var a=SC.getStyle(b,"padding-top");if(a&&a.length>0){c=c+"top: "+a+" !important; "
}a=SC.getStyle(b,"padding-bottom");if(a&&a.length>0){c=c+"bottom: "+a+" !important; "
}a=SC.getStyle(b,"padding-left");if(a&&a.length>0){c=c+"left: "+a+" !important; "
}a=SC.getStyle(b,"padding-right");if(a&&a.length>0){c=c+"right: "+a+" !important; "
}return c},editor:null});require("views/view");SC.Pane=SC.View.extend({isPane:YES,page:null,rootResponder:null,currentWindowSize:null,computeParentDimensions:function(c){var b=this.get("currentWindowSize");
var e={x:0,y:0,width:1000,height:1000};if(b){e.width=b.width;e.height=b.height}else{if(SC.RootResponder.responder){var a=SC.RootResponder.responder.get("currentWindowSize");
if(a){e.width=a.width;e.height=a.height}}else{if(window.innerHeight){e.width=window.innerWidth;
e.height=window.innerHeight}else{if(document.documentElement&&document.documentElement.clientHeight){e.width=document.documentElement.clientWidth;
e.height=document.documentElement.clientHeight}else{if(document.body){e.width=document.body.clientWidth;
e.height=document.body.clientHeight}}}this.windowSizeDidChange(null,e)}}return e},frame:function(){return this.computeFrameWithParentFrame(null)
}.property(),windowSizeDidChange:function(b,a){this.set("currentWindowSize",a);this.parentViewDidResize();
return this},sendEvent:function(c,a,e){var b;if(!e){e=this.get("firstResponder")}while(e&&!e.tryToPerform(c,a)){e=(e===this)?null:e.get("nextResponder")
}if(!e&&(e=this.get("defaultResponder"))){if(typeof e===SC.T_STRING){e=SC.objectForPropertyPath(e)
}if(!e){e=null}else{if(e.isResponderContext){e=e.sendAction(c,this,a)}else{e=e.tryToPerform(c,a)?e:null
}}}return a.mouseHandler||e},performKeyEquivalent:function(c,a){var b=arguments.callee.base.apply(this,arguments);
if(!b){var e=this.get("defaultResponder");if(e){if(e.performKeyEquivalent){b=e.performKeyEquivalent(c,a)
}if(!b){b=e.tryToPerform(c,a)}}}return b},defaultResponder:null,nextResponder:function(){return null
}.property().cacheable(),firstResponder:null,acceptsKeyPane:YES,isKeyPane:NO,becomeKeyPane:function(){if(this.get("isKeyPane")){return this
}if(this.rootResponder){this.rootResponder.makeKeyPane(this)}return this},resignKeyPane:function(){if(!this.get("isKeyPane")){return this
}if(this.rootResponder){this.rootResponder.makeKeyPane(null)}return this},makeFirstResponder:function(a){var c=this.get("firstResponder"),b=this.get("isKeyPane");
if(c===a){return this}if(c){c.willLoseFirstResponder(c)}if(b){if(c){c.willLoseKeyResponderTo(a)
}if(a){a.willBecomeKeyResponderFrom(c)}}if(c){c.beginPropertyChanges().set("isFirstResponder",NO).set("isKeyResponder",NO).endPropertyChanges()
}this.set("firstResponder",a);if(a){a.beginPropertyChanges().set("isFirstResponder",YES).set("isKeyResponder",b).endPropertyChanges()
}if(b){if(a){a.didBecomeKeyResponderFrom(c)}if(c){c.didLoseKeyResponderTo(a)}}if(a){a.didBecomeFirstResponder(a)
}return this},_forwardKeyChange:function(e,b,h,g){var c,a,f;if(e&&(a=this.get("firstResponder"))){f=(h)?h.get("firstResponder"):null;
c=this.get("firstResponder");if(c){c[b](f)}if((g!==undefined)&&a){a.set("isKeyResponder",g)
}}},willLoseKeyPaneTo:function(a){this._forwardKeyChange(this.get("isKeyPane"),"willLoseKeyResponderTo",a,NO);
return this},willBecomeKeyPaneFrom:function(a){this._forwardKeyChange(!this.get("isKeyPane"),"willBecomeKeyResponderFrom",a,YES);
return this},didLoseKeyPaneTo:function(b){var a=this.get("isKeyPane");this.set("isKeyPane",NO);
this._forwardKeyChange(a,"didLoseKeyResponderTo",b);return this},didBecomeKeyPaneFrom:function(b){var a=this.get("isKeyPane");
this.set("isKeyPane",YES);this._forwardKeyChange(!a,"didBecomeKeyResponderFrom",b,YES);
return this},isMainPane:NO,focusFrom:function(a){},blurTo:function(a){},blurMainTo:function(a){this.set("isMainPane",NO)
},focusMainFrom:function(a){this.set("isMainPane",YES)},append:function(){return this.appendTo(document.body)
},remove:function(){if(!this.get("isVisibleInWindow")){return this}if(!this.get("isPaneAttached")){return this
}this.set("isVisibleInWindow",NO);var b=this.get("layer");if(b.parentNode){b.parentNode.removeChild(b)
}b=null;this.resignKeyPane();var a=this.rootResponder;if(this.get("isMainPane")){a.makeMainPane(null)
}a.panes.remove(this);this.rootResponder=null;this.set("isPaneAttached",NO);return this
},appendTo:function(b){var a=this.get("layer");if(!a){a=this.createLayer().get("layer")
}if(this.get("isPaneAttached")&&(a.parentNode===b)){return this}b.insertBefore(a,null);
b=a=null;return this.paneDidAttach()},prependTo:function(b){if(this.get("isPaneAttached")){return this
}var a=this.get("layer");if(!a){a=this.createLayer().get("layer")}if(this.get("isPaneAttached")&&(a.parentNode===b)){return this
}b.insertBefore(a,b.firstChild);b=a=null;return this.paneDidAttach()},before:function(c){if(this.get("isPaneAttached")){return this
}var a=this.get("layer");if(!a){a=this.createLayer().get("layer")}var b=c.parentNode;
if(this.get("isPaneAttached")&&(a.parentNode===b)){return this}b.insertBefore(a,c);
b=c=a=null;return this.paneDidAttach()},after:function(c){var a=this.get("layer");
if(!a){a=this.createLayer().get("layer")}var b=c.parentNode;if(this.get("isPaneAttached")&&(a.parentNode===b)){return this
}b.insertBefore(a,c.nextSibling);b=c=a=null;return this.paneDidAttach()},removeFromParent:function(){},paneDidAttach:function(){var a=(this.rootResponder=SC.RootResponder.responder);
a.panes.add(this);this.set("currentWindowSize",a.computeWindowSize());this.set("isPaneAttached",YES);
this.parentViewDidChange();this._notifyDidAppendToDocument();return this},isPaneAttached:NO,recomputeIsVisibleInWindow:function(c){var e=this.get("isVisibleInWindow"),g=this.get("isVisible");
this.set("isVisibleInWindow",g);this._needsVisibiltyChange=YES;if(g&&this.get("layerNeedsUpdate")){this.updateLayerIfNeeded()
}if(g&&this.get("childViewsNeedLayout")){this.layoutChildViewsIfNeeded()}var f=this.get("childViews"),b=f.length,a;
for(a=0;a<b;a++){f[a].recomputeIsVisibleInWindow(g)}if(!g&&this.get("isFirstResponder")){this.resignFirstResponder()
}if(g){if(this.parentViewDidResize){this.parentViewDidResize()}if(this.get("childViewsNeedLayout")){this.invokeOnce(this.layoutChildViewsIfNeeded)
}}return this},updateLayerLocation:function(){return this},init:function(){var a=!!this.get("layer");
arguments.callee.base.apply(this,arguments);if(a){this.paneDidAttach()}},classNames:"sc-pane".w()});
sc_require("system/responder");SC.ResponderContext=SC.Responder.extend({isResponderContext:YES,trace:NO,defaultResponder:null,nextResponder:function(){return this.get("defaultResponder")
}.property("defaultResponder").cacheable(),firstResponder:null,nextResponderFor:function(a){var b=a.get("nextResponder");
if(typeof b===SC.T_STRING){b=SC.objectForPropertyPath(b,this)}else{if(!b&&(a!==this)){b=this
}}return b},responderNameFor:function(a){if(!a){return"(No Responder)"}else{if(a._scrc_name){return a._scrc_name
}}var b=this.NAMESPACE;this._findResponderNamesFor(this,3,b?[this.NAMESPACE]:[]);
return a._scrc_name||a.toString()},_findResponderNamesFor:function(a,f,e){var b,c;
for(b in a){if(b==="nextResponder"){continue}c=a[b];if(c&&c.isResponder){if(c._scrc_name){continue
}e.push(b);c._scrc_name=e.join(".");if(f>0){this._findResponderNamesFor(c,f-1,e)}e.pop()
}}},makeFirstResponder:function(a){var f=this.get("firstResponder"),c=this.get("nextResponder"),e=this.get("trace"),b;
if(this._locked){if(e){console.log("%@: AFTER ACTION: makeFirstResponder => %@".fmt(this,this.responderNameFor(a)))
}this._pendingResponder=a;return}if(e){console.log("%@: makeFirstResponder => %@".fmt(this,this.responderNameFor(a)))
}this._locked=YES;this._pendingResponder=null;b=a?this.nextResponderFor(a):null;while(b){if(b.get("hasFirstResponder")){break
}b=(b===c)?null:this.nextResponderFor(b)}if(!b){b=c}this._notifyWillLoseFirstResponder(f,f,b);
if(f){f.set("isFirstResponder",NO)}this.set("firstResponder",a);if(a){a.set("isFirstResponder",YES)
}this._notifyDidBecomeFirstResponder(a,a,b);this._locked=NO;if(this._pendingResponder){this.makeFirstResponder(this._pendingResponder);
this._pendingResponder=null}return this},_notifyWillLoseFirstResponder:function(b,e,a){if(e===a){return
}e.willLoseFirstResponder(b);e.set("hasFirstResponder",NO);var c=this.nextResponderFor(e);
if(c){this._notifyWillLoseFirstResponder(b,c,a)}},_notifyDidBecomeFirstResponder:function(b,e,a){if(e===a){return
}var c=this.nextResponderFor(e);if(c){this._notifyDidBecomeFirstResponder(b,c,a)}e.set("hasFirstResponder",YES);
e.didBecomeFirstResponder(b)},sendAction:function(h,e,c){var a=this.get("firstResponder"),f=this.get("nextResponder"),g=this.get("trace"),i=NO,b;
this._locked=YES;if(g){console.log("%@: begin action '%@' (%@, %@)".fmt(this,h,e,c))
}while(!i&&a){if(a.tryToPerform){i=a.tryToPerform(h,e,c)}if(!i){a=(a===f)?null:this.nextResponderFor(a)
}}if(g){if(!i){console.log("%@:  action '%@' NOT HANDLED".fmt(this,h))}else{console.log("%@: action '%@' handled by %@".fmt(this,h,this.responderNameFor(a)))
}}this._locked=NO;if(b=this._pendingResponder){this._pendingResponder=null;this.makeFirstResponder(b)
}return a}});sc_require("system/responder_context");SC.Application=SC.ResponderContext.extend({});
sc_require("core");SC.Benchmark={verbose:NO,enabled:YES,stats:{},globalStartTime:null,start:function(b,a,f,e){if(!this.enabled){return
}var g=(f||Date.now()),c;if(a){c=this._subStatFor(b,a)}else{c=this._statFor(b)}if(e&&c._starts.length>0){c._starts.push("ignore")
}else{c._starts.push(g)}c._times.push({start:g,_subStats:{}});return b},end:function(c,b,g){var f;
if(!this.enabled){return}if(b){f=this._subStatFor(c,b)}else{f=this._statFor(c)}var h=f._starts.pop();
if(!h){console.log('SC.Benchmark "%@" ended without a matching start.  No information was saved.'.fmt(c));
return}if(h=="ignore"){return}var a=(g||Date.now());var e=a-h;f._times[f._times.length-1].end=a;
f._times[f._times.length-1].dur=e;f.amt+=e;f.runs++;if(this.verbose){this.log(c)}},setGlobalStartTime:function(a){this.globalStartTime=a
},bench:function(f,e,a){if(!e){e="bench%@".fmt(this._benchCount++)}if(!a){a=1}var b;
while(--a>=0){var c=SC.Benchmark.start(e);b=f();SC.Benchmark.end(c)}return b},install:function(a,e,b){a["b__"+e]=a[e];
var c=a["b__"+e];a[e]=function(){var g="%@(%@)".fmt(e,$A(arguments).join(", "));SC.Benchmark.start(g,b);
var f=c.apply(this,arguments);SC.Benchmark.end(g);return f}},restore:function(a,b){a[b]=a["b__"+b]
},report:function(c){if(c){return this._genReport(c)}var b=[];for(var a in this.stats){if(!this.stats.hasOwnProperty(a)){continue
}b.push(this._genReport(a))}return b.join("\n")},timelineReport:function(a){a=(a)?"SproutCore Application":a;
var b=[a,"User-Agent: %@".fmt(navigator.userAgent),"Report Generated: %@ (%@)".fmt(new Date().toString(),Date.now()),""];
var e=this._compileChartData(true);for(var c=0;c<e.length;c++){if(e[c][4]){b.push(this._timelineGenSubReport(e[c]))
}else{b.push(this._timelineGenReport(e[c]))}}return b.join("\n")},timelineChart:function(v){var q=0;
this.hideChart();var o=this._compileChartData(false);var l=o.length;if(l===0){return
}var b=this.globalStartTime?this.globalStartTime:o[0][1];var e=o[l-1][2]-b;var p=50+l*30;
var s=Math.ceil(e/200)+1;var u=s*50;var c=document.createElement("div");c.className="sc-benchmark-graph";
document.body.appendChild(c);var w=document.createElement("div");w.innerHTML=((v)?v:"SproutCore Application")+(" - Total Captured Time: "+e+" ms - Points Captured: "+l)+' [<a href="javascript:SC.Benchmark.hideChart();">Hide Chart</a>]';
w.className="sc-benchmark-title";c.appendChild(w);var g=document.createElement("div");
g.className="sc-benchmark-top";g.style.width=u+"px";c.appendChild(g);for(q=0;q<s;
q++){var t=document.createElement("div");t.className="sc-benchmark-tick";t.style.left=(q*50)+"px";
t.style.height=p+"px";var f=document.createElement("div");f.className="sc-benchmark-tick-label";
f.style.left=(q*50)+"px";f.innerHTML=q*200+" ms";c.appendChild(t);c.appendChild(f)
}for(q=0;q<l;q++){var m=document.createElement("div");m.style.top=(75+(q*30))+"px";
m.style.width=u+"px";m.className=(q%2===0)?"sc-benchmark-row even":"sc-benchmark-row";
c.appendChild(m);var n=document.createElement("div");var j=o[q][1];var h=o[q][2];
var a=o[q][3];n.innerHTML="&nbsp;"+(o[q][0]+" <span class='sc-benchmark-emphasis'>"+a+"ms</span>");
n.className="sc-benchmark-bar";n.style.cssText="left:"+(((j-b)/4))+"px; width: "+((a/4))+"px; top: "+(53+(q*30))+"px;";
n.title="start: "+(j-b)+" ms, end: "+(h-b)+" ms, duration: "+a+" ms";c.appendChild(n)
}this._graph=c},hideChart:function(){if(this._graph){try{document.body.removeChild(this._graph)
}catch(a){}}},log:function(a){console.log(this.report(a))},startProfile:function(a){if(!this.enabled){return
}if(console&&console.profile){console.profile(a)}},endProfile:function(a){if(!this.enabled){return
}if(console&&console.profileEnd){console.profileEnd(a)}},_compileChartData:function(h){var m=[],a;
for(var n in this.stats){var f=this.stats[n];for(var g=0;g<f._times.length;g++){var o=f._times[g];
a=(f._times.length>1)?(g+1)+" - "+n:n;m.push([a,o.start,o.end,o.dur,false]);if(h){var b=o._subStats;
for(var c in b){var l=b[c];for(var e=0;e<l._times.length;e++){var p=l._times[e];a=(l._times.length>1)?(e+1)+" - "+c:c;
m.push([a,p.start,p.end,p.dur,true])}}}}}m.sort(function(j,i){if(j[1]<i[1]){return -1
}else{if(j[1]==i[1]){if(j[3]&&!i[3]){return -1}if(!j[3]&&i[3]){return 1}return 0}}return 1
});return m},_genReport:function(a){var b=this._statFor(a);var c=(b.runs>0)?(Math.floor(b.amt*1000/b.runs)/1000):0;
return"BENCH %@ msec: %@ (%@x)".fmt(c,(b.name||a),b.runs)},_timelineGenReport:function(a){if(this.globalStartTime){return"BENCH start: %@ msec, duration: %@ msec,  %@".fmt((a[1]-this.globalStartTime),a[3],a[0])
}else{return"BENCH duration: %@ msec, %@".fmt(a[3],a[0])}},_timelineGenSubReport:function(a){if(this.globalStartTime){return"   CHECKPOINT BENCH start: %@ msec, duration: %@ msec,  %@".fmt((a[1]-this.globalStartTime),a[3],a[0])
}else{return"   CHECKPOINT BENCH duration: %@ msec, %@".fmt(a[3],a[0])}},_subStatFor:function(e,c){var f=this.stats[c]._times.length;
if(f===0){return}var a=this.stats[c]._times[this.stats[c]._times.length-1]._subStats;
var b=a[e];if(!b){a[e]={runs:0,amt:0,name:e,_starts:[],_times:[]};b=a[e]}return b
},_statFor:function(b){var a=this.stats[b];if(!a){a=this.stats[b]={runs:0,amt:0,name:b,_starts:[],_times:[]};
a=this.stats[b]}return a},reset:function(){this.stats={}},_bench:function(b,a){SC.Benchmark.bench(b,a,1)
},_benchCount:1};SC.Benchmark=SC.Benchmark;SC.mixin({logBundleLoading:NO,bundleIsLoaded:function(a){var b=SC.BUNDLE_INFO[a];
return b?!!b.loaded:NO},_scb_bundleDidLoad:function(b,j,a,l){var f=a,p=j;if(SC.typeOf(j)===SC.T_STRING){p=SC.objectForPropertyPath(j)
}if(SC.typeOf(a)===SC.T_STRING){f=SC.objectForPropertyPath(a,p)}if(!f){if(SC.LAZY_INSTANTIATION[b]){var o=SC.LAZY_INSTANTIATION[b];
if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' is marked for lazy instantiation, instantiating it now…".fmt(b))
}for(var g=0,c=o.length;g<c;g++){try{o[g]()}catch(h){console.log("SC.loadBundle(): Failted to lazily instatiate entry for  '%@'".fmt(b))
}}delete SC.LAZY_INSTANTIATION[b];if(SC.typeOf(j)===SC.T_STRING){p=SC.objectForPropertyPath(j)
}if(SC.typeOf(a)===SC.T_STRING){f=SC.objectForPropertyPath(a,p)}if(!a){throw"SC.loadBundle(): could not find callback for lazily instantiated bundle '%@'".fmt(b)
}}else{throw"SC.loadBundle(): could not find callback for '%@'".fmt(b)}}if(!l){l=[]
}l.push(b);var n=!!SC.RunLoop.currentRunLoop;if(n){SC.RunLoop.begin()}f.apply(p,l);
if(n){SC.RunLoop.end()}},tryToLoadBundle:function(e,f,g,b){var a,c;if(SC.typeOf(f)===SC.T_STRING){c=SC.objectForPropertyPath(f)
}if(SC.typeOf(g)===SC.T_STRING){a=SC.objectForPropertyPath(g,c)}if(a||SC.LAZY_INSTANTIATION[e]){if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' found through other means, will attempt to load…".fmt(e))
}SC.BUNDLE_INFO[e]={loaded:YES};return SC.BUNDLE_INFO[e]}return NO},loadBundle:function(v,z,e){var t,w;
if(e===undefined&&SC.typeOf(z)===SC.T_FUNCTION){e=z;z=null}var o=SC.BUNDLE_INFO[v],y,x;
var c=SC.A(arguments).slice(3);if(SC.logBundleLoading){console.log("SC.loadBundle(): Attempting to load '%@'".fmt(v))
}if(!o){if(SC.logBundleLoading){console.log("SC.loadBundle(): Attemping to load %@ without SC.BUNDLE_INFO entry… could be loaded through other means.".fmt(v))
}o=this.tryToLoadBundle(v,z,e,c)}if(!o){throw"SC.loadBundle(): could not find bundle '%@'".fmt(v)
}else{if(o.loaded){if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' already loaded, skipping.".fmt(v))
}if(e){if(SC.isReady){SC._scb_bundleDidLoad(v,z,e,c)}else{SC.ready(SC,function(){SC._scb_bundleDidLoad(v,z,e,c)
})}}}else{if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' is not loaded, loading now.".fmt(v))
}y=o.callbacks||[];if(e){y.push(function(){SC._scb_bundleDidLoad(v,z,e,c)});o.callbacks=y
}if(!o.loading){var b=o.requires||[];var g=YES;for(t=0,w=b.length;t<w;++t){var p=b[t];
var l=SC.BUNDLE_INFO[p];if(!l){throw"SC.loadBundle(): could not find required bundle '%@' for bundle '%@'".fmt(p,v)
}else{if(l.loading){g=NO;break}else{if(l.loaded){continue}else{g=NO;var s=l.dependents;
if(!s){l.dependents=s=[]}s.push(v);if(SC.logBundleLoading){console.log("SC.loadBundle(): '%@' depends on '%@', loading dependency…".fmt(v,p))
}SC.loadBundle(p);break}}}}if(g){var m,f,h,a,i,n;i=document.getElementsByTagName("head")[0];
if(!i){i=document.documentElement}m=o.styles||[];for(t=0,w=m.length;t<w;++t){h=m[t];
if(h.length>0){a=document.createElement("link");a.setAttribute("href",h);a.setAttribute("rel","stylesheet");
a.setAttribute("type","text/css");i.appendChild(a)}}var j=this._jsBundleLoadQueue;
if(!j){this._jsBundleLoadQueue=j={}}j[v]=[];var u=j[v];f=o.scripts||[];for(t=0,w=f.length;
t<w;++t){h=f[t];if(h.length>0){u.push(h)}}o.loading=YES;this.scriptDidLoad(v)}}}}},scriptDidLoad:function(c){var a=this._jsBundleLoadQueue;
if(a){var f=a[c];if(f){var b=f.shift();if(SC.logBundleLoading){console.log("SC.scriptDidLoad(): Loading next file in '%@' -> '%@'".fmt(c,b))
}var e=document.createElement("script");e.setAttribute("type","text/javascript");
e.setAttribute("src",b);document.body.appendChild(e)}}},bundleDidLoad:function(e){var g=SC.BUNDLE_INFO[e],f,c;
if(!g){g=SC.BUNDLE_INFO[e]={loaded:YES};return}if(g.loaded&&SC.logBundleLoading){console.log("SC.bundleDidLoad() called more than once for bundle '%@'. Skipping.".fmt(e));
return}delete g.loading;g.loaded=YES;if(SC.isReady){SC._invokeCallbacksForBundle(e)
}else{SC.ready(SC,function(){SC._invokeCallbacksForBundle(e)})}var h=g.dependents||[];
for(var b=0,a=h.length;b<a;++b){if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' has completed loading, loading '%@' that depended on it.".fmt(e,h[b]))
}SC.loadBundle(h[b])}},_invokeCallbacksForBundle:function(c){var f=SC.BUNDLE_INFO[c],e;
if(!f){return}if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' has completed loading, invoking callbacks.".fmt(c))
}e=f.callbacks||[];SC.RunLoop.begin();for(var b=0,a=e.length;b<a;++b){e[b]()}SC.RunLoop.end()
}});SC.SCANNER_OUT_OF_BOUNDS_ERROR=new Error("Out of bounds.");SC.SCANNER_INT_ERROR=new Error("Not an int.");
SC.SCANNER_SKIP_ERROR=new Error("Did not find the string to skip.");SC.SCANNER_SCAN_ARRAY_ERROR=new Error("Did not find any string of the given array to scan.");
SC.DATETIME_COMPAREDATE_TIMEZONE_ERROR=new Error("Can't compare the dates of two DateTimes that don't have the same timezone.");
SC.DATETIME_ISO8601="%Y-%m-%dT%H:%M:%S%Z";SC.Scanner=SC.Object.extend({string:null,scanLocation:0,scan:function(a){if(this.scanLocation+a>this.length){throw SC.SCANNER_OUT_OF_BOUNDS_ERROR
}var b=this.string.substr(this.scanLocation,a);this.scanLocation+=a;return b},scanInt:function(a){var c=this.scan(a);
var b=new RegExp("\\d{"+a+"}");if(!c.match(b)){throw SC.SCANNER_INT_ERROR}return parseInt(c,10)
},skipString:function(a){if(this.scan(a.length)!==a){throw SC.SCANNER_SKIP_ERROR}return YES
},scanArray:function(c){for(var b=0,a=c.length;b<a;b++){if(this.scan(c[b].length)===c[b]){return b
}this.scanLocation-=c[b].length}throw SC.SCANNER_SCAN_ARRAY_ERROR}});SC.DateTime=SC.Object.extend(SC.Freezable,SC.Copyable,{_ms:0,timezone:0,isFrozen:YES,adjust:function(b,a){var c;
b=b?SC.clone(b):{};c=(b.timezone!==undefined)?b.timezone:(this.timezone!==undefined)?this.timezone:0;
return this.constructor._adjust(b,this._ms,c,a)._createFromCurrentState()},advance:function(a){return this.constructor._advance(a,this._ms,this.timezone)._createFromCurrentState()
},unknownProperty:function(a){return this.constructor._get(a,this._ms,this.timezone)
},toFormattedString:function(a){return this.constructor._toFormattedString(a,this._ms,this.timezone)
},toISO8601:function(){return this.constructor._toFormattedString(SC.DATETIME_ISO8601,this._ms,this.timezone)
},toString:function(){return"UTC: "+new Date(this._ms).toUTCString()+", timezone: "+this.timezone
},isEqual:function(a){return SC.DateTime.compare(this,a)===0},copy:function(){return this
},toTimezone:function(a){if(a===undefined){a=0}return this.advance({timezone:a-this.timezone})
}});SC.DateTime.mixin(SC.Comparable,{recordFormat:SC.DATETIME_ISO8601,dayNames:"_SC.DateTime.dayNames".loc().w(),_englishDayNames:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".w(),abbreviatedDayNames:"_SC.DateTime.abbreviatedDayNames".loc().w(),monthNames:"_SC.DateTime.monthNames".loc().w(),abbreviatedMonthNames:"_SC.DateTime.abbreviatedMonthNames".loc().w(),_date:new Date(),_tz:0,timezone:new Date().getTimezoneOffset(),_dt_cache:{},_dt_cache_index:-1,_DT_CACHE_MAX_LENGTH:1000,_setCalcState:function(a,c){var b={milliseconds:this._date.getTime(),timezone:this._tz};
if(a!==undefined){this._date.setTime(a)}if(c!==undefined){this._tz=c}return b},_setCalcStateFromHash:function(c,b){var e=(b!==undefined)?b:this._tz;
var a=this._toMilliseconds(c,this._ms,e);return this._setCalcState(a,e)},_get:function(x,b,o){var n,u,h,p,e,j,l,f,q,a;
var c,i;var t=this._date;var s,g=null;s=this._setCalcState(b,o);if(x==="milliseconds"){g=t.getTime()
}else{if(x==="timezone"){g=this._tz}}if(g===null){q=x.slice(0,4);a=x.slice(4);if(q==="last"||q==="next"){c=t.getDay();
i=this._englishDayNames.indexOf(a);if(i>=0){var w=i-c;if(q==="last"&&w>=0){w-=7}if(q==="next"&&w<0){w+=7
}this._advance({day:w});g=this._createFromCurrentState()}}}if(g===null){if(o!==undefined){this._setCalcState(t.getTime()-(o*60000),0)
}switch(x){case"year":g=t.getUTCFullYear();break;case"month":g=t.getUTCMonth()+1;
break;case"day":g=t.getUTCDate();break;case"dayOfWeek":g=t.getUTCDay();break;case"hour":g=t.getUTCHours();
break;case"minute":g=t.getUTCMinutes();break;case"second":g=t.getUTCSeconds();break;
case"millisecond":g=t.getUTCMilliseconds();break}if((g===null)&&(x==="isLeapYear")){e=this._get("year");
g=(e%4===0&&e%100!==0)||e%400===0}if((g===null)&&(x==="daysInMonth")){switch(this._get("month")){case 4:case 6:case 9:case 11:g=30;
break;case 2:g=this._get("isLeapYear")?29:28;break;default:g=31;break}}if((g===null)&&(x==="dayOfYear")){n=t.getTime();
h=this._get("day");this._setCalcStateFromHash({day:1});for(p=this._get("month")-1;
p>0;p--){this._setCalcStateFromHash({month:p});h+=this._get("daysInMonth")}t.setTime(n);
g=h}if((g===null)&&(x.slice(0,4)==="week")){j=x.length===4?1:parseInt(x.slice("4"),10);
l=this._get("dayOfWeek");f=this._get("dayOfYear")-1;if(j===0){g=parseInt((f-l+7)/7,10)
}else{g=parseInt((f-(l-1+7)%7+7)/7,10)}}}this._setCalcState(s.milliseconds,s.timezone);
return g},_adjust:function(c,g,f,a){var e=c?SC.clone(c):{};var b=this._toMilliseconds(c,g,f,a);
this._setCalcState(b,f);return this},_advance:function(a,g,e){var c=a?SC.clone(a):{};
var f;for(var b in c){c[b]+=this._get(b,g,e)}f=(c.timezone!==undefined)?c.timezone:e;
return this._adjust(c,g,f,NO)},_toMilliseconds:function(j,c,h,f){var a=j?SC.clone(j):{};
var i=this._date;var g=i.getTime();var b,e;if(!SC.none(c)){i.setTime(c)}e=(h!==undefined)?h:(this.timezone!==undefined)?this.timezone:0;
i.setTime(i.getTime()-(e*60000));if(f===undefined||f===YES){if(!SC.none(a.hour)&&SC.none(a.minute)){a.minute=0
}if(!(SC.none(a.hour)&&SC.none(a.minute))&&SC.none(a.second)){a.second=0}if(!(SC.none(a.hour)&&SC.none(a.minute)&&SC.none(a.second))&&SC.none(a.millisecond)){a.millisecond=0
}}if(SC.none(a.year)){a.year=i.getUTCFullYear()}if(SC.none(a.month)){a.month=i.getUTCMonth()+1
}if(SC.none(a.day)){a.day=i.getUTCDate()}if(SC.none(a.hour)){a.hour=i.getUTCHours()
}if(SC.none(a.minute)){a.minute=i.getUTCMinutes()}if(SC.none(a.second)){a.second=i.getUTCSeconds()
}if(SC.none(a.millisecond)){a.millisecond=i.getUTCMilliseconds()}b=Date.UTC(a.year,a.month-1,a.day,a.hour,a.minute,a.second,a.millisecond);
i.setTime(b+(e*60000));b=i.getTime();i.setTime(g);return b},create:function(){var j=arguments.length===0?{}:arguments[0];
var e;if(SC.typeOf(j)===SC.T_NUMBER){j={milliseconds:j}}e=(j.timezone!==undefined)?j.timezone:this.timezone;
if(e===undefined){e=0}if(!SC.none(j.milliseconds)){var i="nu"+j.milliseconds+e,a=this._dt_cache;
var f=a[i];if(!f){var g,h=this._dt_cache_index,b=this;f=a[i]=new b([{_ms:j.milliseconds,timezone:e}]);
h=this._dt_cache_index=(h+1)%this._DT_CACHE_MAX_LENGTH;g=a[h];if(g!==undefined&&a[g]){delete a[g]
}a[h]=i}return f}else{var c=new Date();return this.create({milliseconds:this._toMilliseconds(j,c.getTime(),e,j.resetCascadingly),timezone:e})
}return null},_createFromCurrentState:function(){return this.create({milliseconds:this._date.getTime(),timezone:this._tz})
},parse:function(p,c){var q=/(?:\%([aAbBcdHIjmMpSUWwxXyYZ\%])|(.))/g;var o,j,a={},b={},i=SC.Scanner.create({string:p});
try{while((j=q.exec(c))!==null){switch(j[1]){case"a":b.dayOfWeek=i.scanArray(this.abbreviatedDayNames);
break;case"A":b.dayOfWeek=i.scanArray(this.dayNames);break;case"b":a.month=i.scanArray(this.abbreviatedMonthNames)+1;
break;case"B":a.month=i.scanArray(this.monthNames)+1;break;case"c":throw"%c is not implemented";
case"d":a.day=i.scanInt(2);break;case"H":a.hour=i.scanInt(2);break;case"I":a.hour=i.scanInt(2);
break;case"j":throw"%j is not implemented";case"m":a.month=i.scanInt(2);break;case"M":a.minute=i.scanInt(2);
break;case"p":a.meridian=i.scanArray(["AM","PM"]);break;case"S":a.second=i.scanInt(2);
break;case"U":throw"%U is not implemented";case"W":throw"%W is not implemented";case"w":throw"%w is not implemented";
case"x":throw"%x is not implemented";case"X":throw"%X is not implemented";case"y":a.year=i.scanInt(2);
a.year+=(a.year>70?1900:2000);break;case"Y":a.year=i.scanInt(4);break;case"Z":var g=i.scan(1);
if(g==="Z"){a.timezone=0}else{if(g==="+"||g==="-"){var l=i.scanInt(2);if(i.scan(1)!==":"){i.scan(-1)
}var f=i.scanInt(2);a.timezone=(g==="+"?-1:1)*(l*60+f)}}break;case"%":i.skipString("%");
break;default:i.skipString(j[0]);break}}}catch(n){console.log("SC.DateTime.createFromString "+n.toString());
return null}if(!SC.none(a.meridian)&&!SC.none(a.hour)){if(a.meridian===1){a.hour=(a.hour+12)%24
}delete a.meridian}o=SC.DateTime.create(a);if(!SC.none(b.dayOfWeek)&&o.get("dayOfWeek")!==b.dayOfWeek){return null
}return o},_pad:function(b,a){var c=""+b;if(a===undefined){a=2}while(c.length<a){c="0"+c
}return c},__toFormattedString:function(b,f,c){var a,e;switch(b[1]){case"a":return this.abbreviatedDayNames[this._get("dayOfWeek")];
case"A":return this.dayNames[this._get("dayOfWeek")];case"b":return this.abbreviatedMonthNames[this._get("month")-1];
case"B":return this.monthNames[this._get("month")-1];case"c":return this._date.toString();
case"d":return this._pad(this._get("day"));case"h":return this._get("hour");case"H":return this._pad(this._get("hour"));
case"i":a=this._get("hour");return(a===12||a===0)?12:(a+12)%12;case"I":a=this._get("hour");
return this._pad((a===12||a===0)?12:(a+12)%12);case"j":return this._pad(this._get("dayOfYear"),3);
case"m":return this._pad(this._get("month"));case"M":return this._pad(this._get("minute"));
case"p":return this._get("hour")>11?"PM":"AM";case"S":return this._pad(this._get("second"));
case"u":return this._pad(this._get("utc"));case"U":return this._pad(this._get("week0"));
case"W":return this._pad(this._get("week1"));case"w":return this._get("dayOfWeek");
case"x":return this._date.toDateString();case"X":return this._date.toTimeString();
case"y":return this._pad(this._get("year")%100);case"Y":return this._get("year");
case"Z":e=-1*c;return(e>=0?"+":"-")+this._pad(parseInt(Math.abs(e)/60,10))+":"+this._pad(Math.abs(e)%60);
case"%":return"%"}},_toFormattedString:function(c,f,b){var a=this;var e=(b!==undefined)?b:(this.timezone!==undefined)?this.timezone:0;
this._setCalcState(f-(b*60000),0);return c.replace(/\%([aAbBcdHIjmMpSUWwxXyYZ\%])/g,function(){var g=a.__toFormattedString.call(a,arguments,f,b);
return g})},compare:function(e,c){var g=e.get("milliseconds");var f=c.get("milliseconds");
return g<f?-1:g===f?0:1},compareDate:function(e,c){if(e.get("timezone")!==c.get("timezone")){throw SC.DATETIME_COMPAREDATE_TIMEZONE_ERROR
}var g=e.adjust({hour:0}).get("milliseconds");var f=c.adjust({hour:0}).get("milliseconds");
return g<f?-1:g===f?0:1}});SC.Binding.dateTime=function(a){return this.transform(function(b,c){return b?b.toFormattedString(a):null
})};if(SC.RecordAttribute&&!SC.RecordAttribute.transforms[SC.guidFor(SC.DateTime)]){SC.RecordAttribute.registerTransform(SC.DateTime,{to:function(c,a){if(SC.none(c)||SC.instanceOf(c,SC.DateTime)){return c
}var b=a.get("format");return SC.DateTime.parse(c,b?b:SC.DateTime.recordFormat)},from:function(b,a){if(SC.none(b)){return b
}var c=a.get("format");return b.toFormattedString(c?c:SC.DateTime.recordFormat)}})
}sc_require("system/locale");SC.IMAGE_ABORTED_ERROR=SC.$error("SC.Image.AbortedError","Image",-100);
SC.IMAGE_FAILED_ERROR=SC.$error("SC.Image.FailedError","Image",-101);SC.imageCache=SC.Object.create({loadLimit:4,activeRequests:0,loadImage:function(a,f,g,e){var b=SC.typeOf(f);
if(SC.none(g)&&SC.typeOf(f)===SC.T_FUNCTION){f=null;g=f}if(SC.typeOf(g)===SC.T_STRING){g=f[g]
}if(SC.none(e)){e=SC.none(f)&&SC.none(g)}var c=this._imageEntryFor(a);if(c.status===this.IMAGE_LOADED){if(g){g.call(f||c.image,c.url,c.image)
}}else{if(f||g){this._addCallback(c,f,g)}c.retainCount++;this._scheduleImageEntry(c,e)
}},releaseImage:function(a,e,f){var c=this._imageEntryFor(a,NO);if(!c){return this
}if(--c.retainCount<=0){this._deleteEntry(c)}else{if(e||f){var b=SC.typeOf(e);if(SC.none(f)&&SC.typeOf(e)===SC.T_FUNCTION){e=null;
f=e}if(SC.typeOf(f)===SC.T_STRING){f=e[f]}this._removeCallback(c,e,f)}}},reloadImage:function(a){var b=this._imageEntryFor(a,NO);
if(b&&b.status===this.IMAGE_LOADED){b.status=this.IMAGE_WAITING}},loadNextImage:function(){var c=null,a;
if(this.get("activeRequests")>=this.get("loadLimit")){return}a=this._foregroundQueue;
while(a.length>0&&!c){c=a.shift()}if(!c){a=this._backgroundQueue;while(a.length>0&&!c){c=a.shift()
}}this.set("isLoading",!!c);if(c){var b=c.image;b.onabort=this._imageDidAbort;b.onerror=this._imageDidError;
b.onload=this._imageDidLoad;b.src=c.url;this._loading.push(c);this.incrementProperty("activeRequests");
this.loadNextImage()}},_imageEntryFor:function(c,a){if(a===undefined){a=YES}var e=this._images[c];
if(!e&&a){var b=new Image();e=this._images[c]={url:c,status:this.IMAGE_WAITING,callbacks:[],retainCount:0,image:b};
b.entry=e}return e},_deleteEntry:function(a){this._unscheduleEntry(a);delete this._images[a.url]
},_addCallback:function(c,e,f){var b=c.callbacks;var a=b.find(function(g){return g[0]===e&&g[1]===f
},this);if(!a){b.push([e,f])}b=null;return this},_removeCallback:function(b,c,e){var a=b.callbacks;
a.forEach(function(g,f){if(g[0]===c&&g[1]===e){a[f]=null}},this);a=null;return this
},_scheduleImageEntry:function(e,c){var b=this._backgroundQueue;var f=this._foregroundQueue;
if(e.status===this.IMAGE_LOADED){return this}if((e.status===this.IMAGE_QUEUE)&&!c&&e.isBackground){b[b.indexOf(e)]=null;
e.status=this.IMAGE_WAITING}if(e.status!==this.IMAGE_QUEUE){var a=(c)?b:f;a.push(e);
e.status=this.IMAGE_QUEUE;e.isBackground=c}if(!this.isLoading){this.invokeLater(this.loadNextImage,100)
}this.set("isLoading",YES);return this},_unscheduleImageEntry:function(b){if(b.status!==this.IMAGE_QUEUE){return this
}var a=b.isBackground?this._backgroundQueue:this._foregroundQueue;a[a.indexOf(b)]=null;
if(this._loading.indexOf(b)>=0){a.image.abort();this.imageStatusDidChange(b,this.ABORTED)
}return this},_imageDidAbort:function(){SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.ABORTED)
},_imageDidError:function(){SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.ERROR)
},_imageDidLoad:function(){SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.LOADED)
},imageStatusDidChange:function(c,a){if(!c){return}var b=c.url;var e;switch(a){case this.LOADED:e=c.image;
break;case this.ABORTED:e=SC.IMAGE_ABORTED_ERROR;break;case this.ERROR:e=SC.IMAGE_FAILED_ERROR;
break;default:e=SC.IMAGE_FAILED_ERROR;break}c.callbacks.forEach(function(g){var h=g[0],i=g[1];
i.call(h,b,e)},this);c.callbacks=[];c.status=(a===this.LOADED)?this.IMAGE_LOADED:this.IMAGE_WAITING;
var f=c.image;if(f){f.onload=f.onerror=f.onabort=null;if(a!==this.LOADED){c.image=null
}}this._loading[this._loading.indexOf(c)]=null;if(this._loading.length>this.loadLimit*2){this._loading=this._loading.compact()
}this.decrementProperty("activeRequests");this.loadNextImage()},init:function(){arguments.callee.base.apply(this,arguments);
this._images={};this._loading=[];this._foregroundQueue=[];this._backgroundQueue=[]
},IMAGE_LOADED:"loaded",IMAGE_QUEUED:"queued",IMAGE_WAITING:"waiting",ABORTED:"aborted",ERROR:"error",LOADED:"loaded"});
SC.json={encode:function(a){return JSON.stringify(a)},decode:function(a){return JSON.parse(a)
}};if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()
}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;
function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)
}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);
case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);
case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;
for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;
i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;
gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space
}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")
}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;
function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)
}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")
}}}());SC.Page=SC.Object.extend({owner:null,get:function(a){var b=this[a];if(b&&b.isClass){this[a]=b=b.create({page:this});
if(!this.get("inDesignMode")){b.awake()}return b}else{return arguments.callee.base.apply(this,arguments)
}},awake:function(){var b,a;for(a in this){if(!this.hasOwnProperty(a)){continue}b=this[a];
if(b&&b.isViewClass){this[a]=b=b.create({page:this})}}return this},getIfConfigured:function(b){var a=this[b];
return(a&&a.isViewClass)?null:this.get(b)},loc:function(c){var a,b;for(b in c){if(!c.hasOwnProperty(b)){continue
}a=this[b];if(!a||!a.isViewClass){continue}a.loc(c[b])}return this}});SC.Page.design=SC.Page.create;
SC.Page.localization=function(a){return a};sc_require("system/event");SC.mixin({_isReadyBound:NO,_bindReady:function(){if(this._isReadyBound){return
}this._isReadyBound=YES;if(document.addEventListener&&!SC.browser.opera){document.addEventListener("DOMContentLoaded",SC._didBecomeReady,NO)
}if(SC.browser.msie&&(window===top)){(function(){if(SC.isReady){return}try{document.documentElement.doScroll("left")
}catch(a){setTimeout(arguments.callee,0);return}SC._didBecomeReady()})()}if(SC.browser.opera){document.addEventListener("DOMContentLoaded",function(){if(SC.isReady){return
}for(var a=0;a<document.styleSheets.length;a++){if(document.styleSheets[a].disabled){setTimeout(arguments.callee,0);
return}}SC._didBecomeReady()},NO)}if(SC.browser.safari&&SC.browser.safari<530){console.error("ready() is not yet supported on Safari 3.1 and earlier")
}SC.Event.add(window,"load",SC._didBecomeReady)},_readyQueue:[],_afterReadyQueue:[],isReady:NO,_didBecomeReady:function(){if(SC.isReady){return
}if(typeof SC.mapDisplayNames===SC.T_FUNCTION){SC.mapDisplayNames()}if(typeof SC.addInvokeOnceLastDebuggingInfo===SC.T_FUNCTION){SC.addInvokeOnceLastDebuggingInfo()
}SC.Locale.createCurrentLocale();if(document&&document.getElementsByTagName){var e=document.getElementsByTagName("body")[0];
if(e){var h=e.className;var c=SC.Locale.currentLanguage.toLowerCase();e.className=(h&&h.length>0)?[h,c].join(" "):c
}}SC.Benchmark.start("ready");SC.RunLoop.begin();var j,b,i,f;do{b=SC._readyQueue;
SC._readyQueue=[];for(i=0,f=b.length;i<f;i++){j=b[i];var g=j[0]||document;var a=j[1];
if(a){a.call(g)}}}while(SC._readyQueue.length>0);SC.isReady=YES;SC._readyQueue=null;
SC.Event.trigger("ready",null,document,NO);if(SC.removeLoading){SC.$("#loading").remove()
}if((SC.mode===SC.APP_MODE)&&(typeof main!="undefined")&&(main instanceof Function)&&!SC.suppressMain){main()
}if(SC.routes&&SC.routes.ping){SC.routes.ping()}SC.RunLoop.end();SC.Benchmark.end("ready");
SC.Benchmark.log()},ready:function(b,c){var a=this._readyQueue;if(c===undefined){c=b;
b=null}else{if(SC.typeOf(c)===SC.T_STRING){c=b[c]}}if(!c){return this}if(this.isReady){return c.call(b||document)
}a.push([b,c]);return this}});SC._bindReady();SC.removeLoading=YES;SC.APP_MODE="APP_MODE";
SC.TEST_MODE="TEST_MODE";SC.mode=SC.APP_MODE;sc_require("system/builder");SC.MODE_REPLACE="replace";
SC.MODE_APPEND="append";SC.MODE_PREPEND="prepend";SC.RenderContext=SC.Builder.create({SELF_CLOSING:SC.CoreSet.create().addEach("area base basefront br hr input img link meta".w()),init:function(b,a){if(b===undefined){b="div"
}if(a){this.prevObject=a;this.strings=a.strings;this.offset=a.length+a.offset}if(!this.strings){this.strings=[]
}this.needsContent=YES;if(SC.typeOf(b)===SC.T_STRING){this._tagName=b.toLowerCase();
this._needsTag=YES;var e=this;while(e){e.length++;e=e.prevObject}this.strings.push(null);
this._selfClosing=this.SELF_CLOSING.contains(this._tagName)}else{this._elem=b;this._needsTag=NO;
this.length=0;this.needsContent=NO}return this},strings:null,offset:0,length:0,updateMode:SC.MODE_REPLACE,needsContent:NO,get:function(b){var a=this.strings||[];
return(b===undefined)?a.slice(this.offset,this.length):a[b+this.offset]},push:function(e){var b=this.strings,a=arguments.length;
if(!b){this.strings=b=[]}if(a>1){b.push.apply(b,arguments)}else{b.push(e)}var f=this;
while(f){f.length+=a;f=f.prevObject}this.needsContent=YES;return this},text:function(c){var b=arguments.length,a=0;
for(a=0;a<b;a++){this.push(SC.RenderContext.escapeHTML(arguments[a]))}return this
},join:function(b){if(this._needsTag){this.end()}var a=this.strings;return a?a.join(b||""):""
},begin:function(a){return SC.RenderContext(a,this)},element:function(){if(this._elem){return this._elem
}var a,b;if(!SC.RenderContext.factory){SC.RenderContext.factory=document.createElement("div")
}SC.RenderContext.factory.innerHTML=this.join();if(SC.RenderContext.factory.innerHTML.length>0){b=SC.RenderContext.factory.firstChild.cloneNode(true);
SC.RenderContext.factory.innerHTML=""}else{b=null}return b},remove:function(a){if(!a){return
}var b,c=this._elem;if(!c||!c.removeChild){return}b=document.getElementById(a);if(b){b=c.removeChild(b);
b=null}},update:function(){var a=this._elem,f=this.updateMode,j,h,m,c,i,e,g;this._innerHTMLReplaced=NO;
if(!a){return}if(this.length>0){this._innerHTMLReplaced=YES;if(f===SC.MODE_REPLACE){a.innerHTML=this.join()
}else{c=a.cloneNode(false);c.innerHTML=this.join();g=(f===SC.MODE_APPEND)?null:a.firstChild;
i=c.firstChild;while(i){e=i.nextSibling;a.insertBefore(i,e);i=e}i=e=c=g=null}}if(this._attrsDidChange&&(h=this._attrs)){for(j in h){if(!h.hasOwnProperty(j)){continue
}if(h[j]===null){a.removeAttribute(j)}else{SC.$(a).attr(j,h[j])}}}if(this._classNamesDidChange&&(h=this._classNames)){SC.$(a).attr("class",h.join(" "))
}if(this._idDidChange&&(h=this._id)){SC.$(a).attr("id",h)}if(this._stylesDidChange&&(m=this._styles)){var b=this._STYLE_PAIR_ARRAY,l=this._JOIN_ARRAY;
for(j in m){if(!m.hasOwnProperty(j)){continue}h=m[j];if(h===null){continue}if(typeof h===SC.T_NUMBER){h=h.toString()+"px"
}b[0]=j.dasherize();b[1]=h;l.push(b.join(": "))}SC.$(a).attr("style",l.join("; "));
l.length=0}a=this._elem=null;return this.prevObject||this},_DEFAULT_ATTRS:{},_TAG_ARRAY:[],_JOIN_ARRAY:[],_STYLE_PAIR_ARRAY:[],end:function(){var n=this._TAG_ARRAY,b,l,i,j=this._attrs,e=this._classNames,a=this._id,m=this._styles;
n[0]="<";n[1]=this._tagName;if(j||e||m||a){if(!j){j=this._DEFAULT_ATTRS}if(a){j.id=a
}if(e){j["class"]=e.join(" ")}if(m){l=this._JOIN_ARRAY;b=this._STYLE_PAIR_ARRAY;for(i in m){if(!m.hasOwnProperty(i)){continue
}b[0]=i.dasherize();b[1]=m[i];if(b[1]===null){continue}if(typeof b[1]===SC.T_NUMBER){b[1]=b[1]+"px"
}l.push(b.join(": "))}j.style=l.join("; ");l.length=0}n.push(" ");for(i in j){if(!j.hasOwnProperty(i)){continue
}if(j[i]===null){continue}n.push(i);n.push('="');n.push(j[i]);n.push('" ')}if(j===this._DEFAULT_ATTRS){delete j.style;
delete j["class"];delete j.id}}var h=this.strings;var g=(this._selfClosing===NO)?NO:(this.length===1);
n.push(g?" />":">");h[this.offset]=n.join("");n.length=0;if(!g){n[0]="</";n[1]=this._tagName;
n[2]=">";h.push(n.join(""));var f=this;while(f){f.length++;f=f.prevObject}n.length=0
}this._elem=null;return this.prevObject||this},tag:function(a,b){return this.begin(a,b).end()
},tagName:function(a){if(a===undefined){if(!this._tagName&&this._elem){this._tagName=this._elem.tagName
}return this._tagName}else{this._tagName=a;this._tagNameDidChange=YES;return this
}},id:function(a){if(a===undefined){if(!this._id&&this._elem){this._id=this._elem.id
}return this._id}else{this._id=a;this._idDidChange=YES;return this}},classNames:function(b,a){if(b===undefined){if(!this._classNames&&this._elem){this._classNames=(SC.$(this._elem).attr("class")||"").split(" ")
}if(this._cloneClassNames){this._classNames=(this._classNames||[]).slice();this._cloneClassNames=NO
}if(!this._classNames){this._classNames=[]}return this._classNames}else{this._classNames=b;
this._cloneClassNames=a||NO;this._classNamesDidChange=YES;return this}},hasClass:function(a){return this.classNames().indexOf(a)>=0
},addClass:function(a){var b=this.classNames();if(b.indexOf(a)<0){b.push(a);this._classNamesDidChange=YES
}return this},removeClass:function(b){var c=this._classNames,a;if(!c&&this._elem){c=this._classNames=(SC.$(this._elem).attr("class")||"").split(" ")
}if(c&&(a=c.indexOf(b))>=0){if(this._cloneClassNames){c=this._classNames=c.slice();
this._cloneClassNames=NO}c[a]=null;this._classNamesDidChange=YES}return this},resetClassNames:function(){this._classNames=[];
this._classNamesDidChange=YES;return this},setClass:function(e,c){var g,a,b,f;if(c!==undefined){return c?this.addClass(e):this.removeClass(e)
}else{g=this._classNames;if(!g&&this._elem){g=this._classNames=(SC.$(this._elem).attr("class")||"").split(" ")
}if(!g){g=this._classNames=[]}if(this._cloneClassNames){g=this._classNames=g.slice();
this._cloneClassNames=NO}f=NO;for(b in e){if(!e.hasOwnProperty(b)){continue}a=g.indexOf(b);
if(e[b]){if(a<0){g.push(b);f=YES}}else{if(a>=0){g[a]=null;f=YES}}}if(f){this._classNamesDidChange=YES
}}return this},_STYLE_REGEX:/\s*([^:\s]+)\s*:\s*([^;]+)\s*;?/g,styles:function(e,f){var a,c,b;
if(e===undefined){if(!this._styles&&this._elem){a=SC.$(this._elem).attr("style");
if(a&&(a=a.toString()).length>0){if(SC.browser.msie){a=a.toLowerCase()}e={};c=this._STYLE_REGEX;
c.lastIndex=0;while(b=c.exec(a)){e[b[1].camelize()]=b[2]}this._styles=e;this._cloneStyles=NO
}else{this._styles={}}}else{if(!this._styles){this._styles={}}else{if(this._cloneStyles){this._styles=SC.beget(this._styles);
this._cloneStyles=NO}}}return this._styles}else{this._styles=e;this._cloneStyles=f||NO;
this._stylesDidChange=YES;return this}},addStyle:function(a,f){var b,e=NO,c=this.styles();
if(typeof a===SC.T_STRING){if(f===undefined){return c[a]}else{if(c[a]!==f){c[a]=f;
this._stylesDidChange=YES}}}else{for(b in a){if(!a.hasOwnProperty(b)){continue}f=a[b];
if(c[b]!==f){c[b]=f;e=YES}}if(e){this._stylesDidChange=YES}}return this},removeStyle:function(a){if(!this._styles&&!this._elem){return this
}var b=this.styles();if(b[a]){b[a]=null;this._stylesDidChange=YES}},attr:function(a,f){var c,b=this._attrs,e=NO;
if(!b){this._attrs=b={}}if(typeof a===SC.T_STRING){if(f===undefined){return b[a]}else{if(b[a]!==f){b[a]=f;
this._attrsDidChange=YES}}}else{for(c in a){if(!a.hasOwnProperty(c)){continue}f=a[c];
if(b[c]!==f){b[c]=f;e=YES}}if(e){this._attrsDidChange=YES}}return this}});SC.RenderContext.fn.html=SC.RenderContext.fn.push;
SC.RenderContext.fn.css=SC.RenderContext.fn.addStyle;if(!SC.browser.isSafari||parseInt(SC.browser.version,10)<526){SC.RenderContext._safari3=YES
}SC.RenderContext.escapeHTML=function(e){var c,b,a;if(SC.none(e)){return e}c=this.escapeHTMLElement;
if(!c){c=this.escapeHTMLElement=document.createElement("div")}b=this.escapeTextNode;
if(!b){b=this.escapeTextNode=document.createTextNode("");c.appendChild(b)}b.data=e;
a=c.innerHTML;if(SC.RenderContext._safari3){a=a.replace(/>/g,"&gt;")}b=c=null;return a
};SC.Response=SC.Object.extend({isError:NO,errorValue:function(){return this}.property().cacheable(),errorObject:null,request:null,originalRequest:function(){var a=this.get("request");
while(a.get("source")){a=a.get("source")}return a}.property("request").cacheable(),type:function(){return this.getPath("request.type")
}.property("request").cacheable(),address:function(){return this.getPath("request.address")
}.property("request").cacheable(),isJSON:function(){return this.getPath("request.isJSON")||NO
}.property("request").cacheable(),isXML:function(){return this.getPath("request.isXML")||NO
}.property("request").cacheable(),listeners:function(){return this.getPath("request.listeners")
}.property("request").cacheable(),status:-100,headers:null,encodedBody:null,body:function(){var a=this.get("encodedBody");
if(a&&this.get("isJSON")){try{a=SC.json.decode(a)}catch(b){return SC.Error.create({message:b.name+": "+b.message,label:"Response",errorValue:this})
}}return a}.property("encodedBody").cacheable(),response:function(){return this.get("body")
}.property("body").cacheable(),isCancelled:NO,timedOut:null,timeoutTimer:null,fire:function(){var a=this.get("request"),c=a?a.get("source"):null;
if(c&&c.willSend){c.willSend(a,this)}a.freeze();if(!this.get("isCancelled")){this.invokeTransport()
}var b=a.get("timeout");if(b){var e=SC.Timer.schedule({target:this,action:"timeoutReached",interval:b,repeats:NO});
this.set("timeoutTimer",e)}if(!this.get("isCancelled")&&c&&c.didSend){c.didSend(a,this)
}},invokeTransport:function(){this.receive(function(a){this.set("status",200)},this)
},receive:function(f,a){if(!this.get("timedOut")){var e=this.get("timeoutTimer");
if(e){e.invalidate()}this.set("timedOut",NO);var b=this.get("request");var c=b?b.get("source"):null;
if(c&&c.willReceive){c.willReceive(b,this)}f.call(a,!this.get("isCancelled"));if(!this.get("isCancelled")&&c&&c.didReceive){c.didReceive(b,this)
}if(!this.get("isCancelled")){this.notify()}}SC.Request.manager.transportDidClose(this);
return this},cancel:function(){if(!this.get("isCancelled")){this.set("isCancelled",YES);
this.cancelTransport();SC.Request.manager.transportDidClose(this)}},timeoutReached:function(){if(this.get("timedOut")===null){this.set("timedOut",YES);
this.cancelTransport();SC.Request.manager.transportDidClose(this);var a=SC.$error("HTTP Request timed out","Request",408);
a.set("errorValue",this);this.set("isError",YES);this.set("errorObject",a);var b=this.get("request");
var c=b?b.get("source"):null;if(!this.get("isCancelled")&&c&&c.didTimeout){c.didTimeout(b,this)
}}},cancelTransport:function(){},_notifyListener:function(b,a){var f=b[a],g,e,c;if(!f){return NO
}g=(f.params||[]).copy();g.unshift(this);e=f.target;c=f.action;if(SC.typeOf(c)===SC.T_STRING){c=e[c]
}return c.apply(e,g)},notify:function(){var b=this.get("listeners"),a=this.get("status"),c=Math.floor(a/100)*100,e=NO;
if(!b){return this}SC.RunLoop.begin();e=this._notifyListener(b,a);if(!e){e=this._notifyListener(b,c)
}if(!e){e=this._notifyListener(b,0)}SC.RunLoop.end();return this},toString:function(){var a=arguments.callee.base.apply(this,arguments);
return"%@<%@ %@, status=%@".fmt(a,this.get("type"),this.get("address"),this.get("status"))
}});SC.XHRResponse=SC.Response.extend({headers:function(){var c=this.get("rawRequest"),b=c?c.getAllResponseHeaders():null,a={};
if(!b){return a}b.split("\n").forEach(function(h){var e=h.indexOf(":"),f,g;if(e>=0){f=h.slice(0,e);
g=h.slice(e+1).trim();a[f]=g}},this);return a}.property("status").cacheable(),header:function(a){var b=this.get("rawRequest");
return b?b.getResponseHeader(a):null},encodedBody:function(){var b=this.get("rawRequest"),a;
if(!b){a=null}else{if(this.get("isXML")){a=b.responseXML}else{a=b.responseText}}return a
}.property("status").cacheable(),cancelTransport:function(){var a=this.get("rawRequest");
if(a){a.abort()}this.set("rawRequest",null)},invokeTransport:function(){var e,h,b,c,g;
function f(){for(var j=0;j<arguments.length;j++){try{var l=arguments[j]();return l
}catch(m){}}return NO}e=f(function(){return new XMLHttpRequest()},function(){return new ActiveXObject("Msxml2.XMLHTTP")
},function(){return new ActiveXObject("Microsoft.XMLHTTP")});this.set("rawRequest",e);
c=!!this.getPath("request.isAsynchronous");if(c){if(!SC.browser.msie){SC.Event.add(e,"readystatechange",this,this.finishRequest,e)
}else{h=this;b=function(){if(!h){return null}var i=h.finishRequest();if(i){h=null
}return i};e.onreadystatechange=b}}e.open(this.get("type"),this.get("address"),c);
g=this.getPath("request.headers");for(var a in g){e.setRequestHeader(a,g[a])}e.send(this.getPath("request.encodedBody"));
if(!c){this.finishRequest()}return e},finishRequest:function(c){var f=this.get("rawRequest"),a=f.readyState,e,b,g;
if(a===4){this.receive(function(h){if(!h){return}b=-1;try{b=f.status||0}catch(j){}if((b<200)||(b>=300)){try{g=f.statusText||""
}catch(i){g=""}e=SC.$error(g||"HTTP Request failed","Request",b);e.set("errorValue",this);
this.set("isError",YES);this.set("errorObject",e)}this.set("status",b)},this);f.onreadystatechange=function(){};
return YES}return NO}});sc_require("system/response");SC.Request=SC.Object.extend(SC.Copyable,SC.Freezable,{isAsynchronous:YES,isJSON:NO,isXML:NO,headers:function(){var a=this._headers;
if(!a){a=this._headers={}}return a}.property().cacheable(),responseClass:SC.XHRResponse,source:null,address:null,type:"GET",timeout:null,body:null,encodedBody:function(){var a=this.get("body");
if(a&&this.get("isJSON")){a=SC.json.encode(a)}return a}.property("isJSON","isXML","body").cacheable(),willSend:function(b,a){},didSend:function(b,a){},willReceive:function(b,a){},didReceive:function(b,a){},didTimeout:function(b,a){},COPY_KEYS:"isAsynchronous isJSON isXML address type timeout body responseClass willSend didSend willReceive didReceive".w(),copy:function(){var a={},e=this.COPY_KEYS,g=e.length,b,c,f;
while(--g>=0){b=e[g];if(this.hasOwnProperty(b)){a[b]=this.get(b)}}if(this.hasOwnProperty("listeners")){a.listeners=SC.copy(this.get("listeners"))
}if(this.hasOwnProperty("_headers")){a._headers=SC.copy(this._headers)}a.source=this.get("source")||this;
return this.constructor.create(a)},header:function(a,b){var c;if(SC.typeOf(a)===SC.T_STRING){c=this._headers;
if(arguments.length===1){return c?c[a]:null}else{this.propertyWillChange("headers");
if(!c){c=this._headers={}}c[a]=b;this.propertyDidChange("headers");return this}}else{if(b===undefined){c=a;
this.beginPropertyChanges();for(a in c){if(!c.hasOwnProperty(a)){continue}this.header(a,c[a])
}this.endPropertyChanges();return this}}return this},json:function(a){if(a===undefined){a=YES
}if(a){this.set("isXML",NO)}return this.set("isJSON",a)},xml:function(a){if(a===undefined){a=YES
}if(a){this.set("isJSON",NO)}return this.set("isXML",a)},_prep:function(){var a=!!this.header("Content-Type");
if(this.get("isJSON")&&!a){this.header("Content-Type","application/json")}else{if(this.get("isXML")&&!a){this.header("Content-Type","text/xml")
}}return this},send:function(a){var b=this.get("timeout");if(b){if(!this.get("isAsynchronous")){throw"Timeout values cannot be used with synchronous requests"
}}else{if(b===0){throw"The timeout value must either not be specified or must be greater than 0"
}}if(a){this.set("body",a)}return SC.Request.manager.sendRequest(this.copy()._prep())
},resend:function(){var a=this.get("source")?this:this.copy()._prep();return SC.Request.manager.sendRequest(a)
},notify:function(a,f,e,g){var c=YES;if(SC.typeOf(a)!==SC.T_NUMBER){g=SC.A(arguments).slice(2);
e=f;f=a;a=0;c=NO}else{g=SC.A(arguments).slice(3)}var b=this.get("listeners");if(!b){this.set("listeners",b={})
}b[a]={target:f,action:e,params:g};return this}});SC.Request.mixin({getUrl:function(a){return this.create().set("address",a).set("type","GET")
},postUrl:function(b,a){var c=this.create().set("address",b).set("type","POST");if(a){c.set("body",a)
}return c},deleteUrl:function(a){return this.create().set("address",a).set("type","DELETE")
},putUrl:function(b,a){var c=this.create().set("address",b).set("type","PUT");if(a){c.set("body",a)
}return c}});SC.Request.manager=SC.Object.create(SC.DelegateSupport,{maxRequests:6,inflight:[],pending:[],sendRequest:function(b){if(!b){return null
}var a=b.get("responseClass").create({request:b});this.get("pending").pushObject(a);
this.fireRequestIfNeeded();return a},cancel:function(b){var e=this.get("pending"),c=this.get("inflight"),a;
if(e.indexOf(b)>=0){this.propertyWillChange("pending");e.removeObject(b);this.propertyDidChange("pending");
return YES}else{if(c.indexOf(b)>=0){b.cancel();c.removeObject(b);this.fireRequestIfNeeded();
return YES}else{return NO}}},cancelAll:function(){if(this.get("pending").length||this.get("inflight").length){this.set("pending",[]);
this.get("inflight").forEach(function(a){a.cancel()});this.set("inflight",[]);return YES
}else{return NO}},fireRequestIfNeeded:function(){var e=this.get("pending"),c=this.get("inflight"),a=this.get("maxRequests"),b;
if((e.length>0)&&(c.length<a)){b=e.shiftObject();c.pushObject(b);b.fire()}},transportDidClose:function(a){this.get("inflight").removeObject(a);
this.fireRequestIfNeeded()}});require("system/ready");SC.RootResponder=SC.Object.extend({panes:null,init:function(){arguments.callee.base.apply(this,arguments);
this.panes=SC.Set.create()},mainPane:null,makeMainPane:function(b){var a=this.get("mainPane");
if(a===b){return this}this.beginPropertyChanges();if(this.get("keyPane")===a){this.makeKeyPane(b)
}this.set("mainPane",b);if(a){a.blurMainTo(b)}if(b){b.focusMainFrom(a)}this.endPropertyChanges();
return this},keyPane:null,previousKeyPanes:[],makeKeyPane:function(g){var f,a,e;if(g){if(!g.get("acceptsKeyPane")){return this
}else{a=this.get("keyPane");if(a===g){return this}else{if(a){e=this.get("previousKeyPanes");
e.push(a)}f=g}}}else{a=this.get("keyPane");e=this.get("previousKeyPanes");f=null;
while(e.length>0){var c=e.pop();if(c.get("isPaneAttached")&&c.get("acceptsKeyPane")){f=c;
break}}}if(!f){var b=this.get("mainPane");if(b&&b.get("acceptsKeyPane")){f=b}}if(a){a.willLoseKeyPaneTo(f)
}if(f){f.willBecomeKeyPaneFrom(a)}this.set("keyPane",f);if(f){f.didBecomeKeyPaneFrom(a)
}if(a){a.didLoseKeyPaneTo(f)}return this},computeWindowSize:function(){return{width:640,height:480}
},defaultResponder:null,sendAction:function(c,e,b,f,a){e=this.targetForAction(c,e,b,f);
if(e&&e.isResponderContext){return !!e.sendAction(c,b,a)}else{return e&&e.tryToPerform(c,b)
}},_responderFor:function(c,a){var b=c?c.get("defaultResponder"):null;if(c){c=c.get("firstResponder")||c;
do{if(c.respondsTo(a)){return c}}while(c=c.get("nextResponder"))}if(typeof b===SC.T_STRING){b=SC.objectForPropertyPath(b)
}if(!b){return null}else{if(b.isResponderContext){return b}else{if(b.respondsTo(a)){return b
}else{return null}}}},targetForAction:function(b,f,e,g){if(!b||(SC.typeOf(b)!==SC.T_STRING)){return null
}if(f){if(SC.typeOf(f)===SC.T_STRING){f=SC.objectForPropertyPath(f)}if(f){if(f.respondsTo&&!f.respondsTo(b)){f=null
}else{if(SC.typeOf(f[b])!==SC.T_FUNCTION){f=null}}}return f}if(g){return this._responderFor(g,b)
}var a=this.get("keyPane"),c=this.get("mainPane");if(a&&(a!==g)){f=this._responderFor(a,b)
}if(!f&&c&&(c!==a)){f=this._responderFor(c,b)}if(!f&&(f=this.get("defaultResponder"))){if(SC.typeOf(f)===SC.T_STRING){f=SC.objectForPropertyPath(f);
if(f){this.set("defaultResponder",f)}}if(f){if(f.respondsTo&&!f.respondsTo(b)){f=null
}else{if(SC.typeOf(f[b])!==SC.T_FUNCTION){f=null}}}}return f},targetViewForEvent:function(a){return a.target?SC.$(a.target).view()[0]:null
},sendEvent:function(c,a,e){var f,b;SC.RunLoop.begin();if(e){f=e.get("pane")}else{f=this.get("keyPane")||this.get("mainPane")
}b=(f)?f.sendEvent(c,a,e):null;SC.RunLoop.end();return b},listenFor:function(b,a){b.forEach(function(c){var e=this[c];
if(e){SC.Event.add(a,c,this,e)}},this);a=null;return this},setup:function(){this.listenFor("touchstart touchmove touchend touchcancel".w(),document)
},touchstart:function(b){try{var a=this.targetViewForEvent(b);a=this._touchView=this.sendEvent("touchStart",b,a);
if(a&&a.respondsTo("touchDragged")){this._touchCanDrag=YES}}catch(c){console.log("Exception during touchStart: %@".fmt(c));
this._touchView=null;this._touchCanDrag=NO;return NO}return a?b.hasCustomEventHandling:YES
},touchmove:function(c){SC.RunLoop.begin();try{var b=this._lastHovered||[];var f=[];
var a=this.targetViewForEvent(c);while(a&&(a!==this)){if(b.indexOf(a)!==-1){a.tryToPerform("touchMoved",c);
f.push(a)}else{a.tryToPerform("touchEntered",c);f.push(a)}a=a.get("nextResponder")
}for(var i=0;i<b.length;i++){a=b[i];var h=a.respondsTo("touchExited");if(h&&!(f.indexOf(a)!==-1)){a.tryToPerform("touchExited",c)
}}this._lastHovered=f;if(this._touchView){this._touchView.tryToPerform("touchDragged",c)
}}catch(g){console.log("Exception during touchMove: %@".fmt(g))}SC.RunLoop.end();
return YES},touchend:function(b){try{b.cancel=NO;var c=null,a=this._touchView;if(a){c=this.sendEvent("touchEnd",b,a)
}if(!c){a=this.targetViewForEvent(b)}this._touchCanDrag=NO;this._touchView=null}catch(f){console.log("Exception during touchEnd: %@".fmt(f));
this._touchCanDrag=NO;this._touchView=null;return NO}return(c)?b.hasCustomEventHandling:YES
},touchcancel:function(a){a.cancel=YES;return this.touchend(a)}});SC.ready(SC.RootResponder,SC.RootResponder.ready=function(){var a;
a=SC.RootResponder.responder=SC.RootResponder.create();a.setup()});SC.routes=SC.Object.create({location:function(b,c){if(c!==undefined){if(c===null){c=""
}if(typeof(c)=="object"){var e=c.route?c.route.split("&"):[""];var a=e.shift();var f={};
e.forEach(function(h){var g=h.split("=");f[g[0]]=g[1]});for(b in c){if(!c.hasOwnProperty(b)){continue
}if(b!="route"){f[b]=encodeURIComponent(""+c[b])}}e=[a];for(b in f){if(!f.hasOwnProperty(b)){continue
}e.push([b,f[b]].join("="))}c=e.join("&")}if(this._location!=c){this._location=c;
this._setWindowLocation(c)}}return this._location}.property(),ping:function(){if(!this._didSetupHistory){this._didSetupHistory=true;
this._setupHistory()}this._checkWindowLocation()},add:function(a,c,e){if(e===undefined&&SC.typeOf(c)===SC.T_FUNCTION){e=c;
c=null}else{if(SC.typeOf(e)===SC.T_STRING){e=c[e]}}var b=a.split("/");if(!this._routes){this._routes=SC.routes._Route.create()
}this._routes.addRoute(b,c,e);return this},gotoRoute:function(a){var f={},e,b,c,g;
this._lastRoute=a;e=a.split("&");if(e&&e.length>0){a=e.shift();e.forEach(function(h){var i=h.split("=");
if(i&&i.length>1){f[i[0]]=decodeURIComponent(i[1])}})}else{a=""}e=a.split("/");if(!this._routes){this._routes=SC.routes._Route.create()
}b=this._routes.functionForRoute(e,f);if(b){c=b._target;g=b._method;if(g){g.call(c,f)
}}},init:function(){arguments.callee.base.call(this);if(SC.browser.isSafari&&parseInt(SC.browser.version,0)<417){SC.mixin(this,this.browserFuncs.safari)
}else{if(SC.browser.isIE){SC.mixin(this,this.browserFuncs.ie)}else{if(SC.browser.isMozilla){SC.mixin(this,this.browserFuncs.firefox)
}}}this._didSetupHistory=false},invokeCheckWindowLocation:function(c){var b=this.__checkWindowLocation,a=this;
if(!b){b=this.__checkWindowLocation=function(){a._checkWindowLocation()}}setTimeout(b,c)
},browserFuncs:{safari:{_setupHistory:function(){var a=location.hash;a=(a&&a.length>0)?a.slice(1,a.length):"";
this._cloc=a;this._backStack=[];this._backStack.length=history.length;this._backStack.push(a);
this._forwardStack=[];this.invokeCheckWindowLocation(1000)},_checkWindowLocation:function(){var b=(history.length-this._lastLength)!==0;
var f=(b)?(history.length-this._backStack.length):0;this._lastLength=history.length;
if(b){console.log("historyDidChange")}if(f){if(f<0){this._forwardStack.push(this._cloc);
for(var a=0;a<Math.abs(f+1);a++){this._forwardStack.push(this._backStack.pop())}this._cloc=this._backStack.pop()
}else{this._backStack.push(this._cloc);for(a=0;a<(f-1);a++){this._backStack.push(this._forwardStack.pop())
}this._cloc=this._forwardStack.pop()}}else{if(b&&this._locationDidChange){this.gotoRoute(this._cloc);
this._locationDidChange=false}}var e=this._cloc;var c=this.get("location");if(e!=c){this.set("location",(e)?e:"");
this.gotoRoute(e)}this.invokeCheckWindowLocation(50)},_setWindowLocation:function(b){var a=this._cloc;
if(a!=b){this._backStack.push(this._cloc);this._forwardStack.length=0;this._cloc=b;
location.hash=(b&&b.length>0)?b:"";this._locationDidChange=true}}},ie:{_setupHistory:function(){this.invokeCheckWindowLocation(1000)
},_checkWindowLocation:function(){var b=this.get("location");var a=location.hash;
a=(a&&a.length>0)?a.slice(1,a.length):"";if(a!=b){this.set("location",(a)?a:"")}this.invokeCheckWindowLocation(100)
},_setWindowLocation:function(b){var a=location.hash;a=(a&&a.length>0)?a.slice(1,a.length):"";
if(a!=b){location.hash=(b&&b.length>0)?b:"#"}this.gotoRoute(b)}},firefox:{_checkWindowLocation:function(){var b=this.get("location");
var a=location.hash;a=(a&&a.length>0)?a.slice(1,a.length):"";if(a!=b){SC.RunLoop.begin();
this.set("location",(a)?a:"");SC.RunLoop.end()}this.invokeCheckWindowLocation(150)
},_setWindowLocation:function(b){var a=location.hash;a=(a&&a.length>0)?a.slice(1,a.length):"";
if(a!=b){location.hash=(b&&b.length>0)?b:"#"}this.gotoRoute(b)}}},_setupHistory:function(){var a=this;
this.invokeCheckWindowLocation(1000)},_checkWindowLocation:function(){var b=this.get("location");
var a=decodeURI(location.hash);a=(a&&a.length>0)?a.slice(1,a.length):"";if(a!==b){SC.RunLoop.begin();
this.set("location",(a)?a:"");SC.RunLoop.end()}this.invokeCheckWindowLocation(150)
},_setWindowLocation:function(b){var a=location.hash;a=(a&&a.length>0)?a.slice(1,a.length):"";
if(a!=b){location.hash=(b&&b.length>0)?encodeURI(b):"#"}this.gotoRoute(b)},_routes:null,_Route:SC.Object.extend({_target:null,_method:null,_static:null,_dynamic:null,_wildcard:null,addRoute:function(e,c,g){if(!e||e.length===0){this._target=c;
this._method=g}else{var b=e.shift();var f=null;switch(b.slice(0,1)){case":":b=b.slice(1,b.length);
var a=this._dynamic[b]||[];f=SC.routes._Route.create();a.push(f);this._dynamic[b]=a;
break;case"*":b=b.slice(1,b.length);this._wildcard=b;this._target=c;this._method=g;
break;default:a=this._static[b]||[];f=SC.routes._Route.create();a.push(f);this._static[b]=a
}if(f){f.addRoute(e,c,g)}}},functionForRoute:function(c,b){if(!c||c.length===0){return this
}else{var a=c.shift(),g=null,l,i,f,e;l=this._static[a];if(l){for(f=0,e=l.length;(f<e)&&(g===null);
f++){var h=c.slice();g=l[f].functionForRoute(h,b)}}if(g===null){for(var j in this._dynamic){l=this._dynamic[j];
if(l){for(f=0,e=l.length;(f<e)&&(g===null);f++){h=c.slice();g=l[f].functionForRoute(h,b);
if(g&&b){b[j]=a}}}if(g){break}}}if((g===null)&&this._wildcard){c.unshift(a);if(b){b[this._wildcard]=c.join("/")
}g=this}return g}},init:function(){arguments.callee.base.call(this);this._static={};
this._dynamic={}}})});SC.time=function(a){var b=SC.beget(fn);b.value=timeOffset;return b
};(function(){var a=new Date();SC.mixin(SC.time,{month:function(c,b){a.setTime(c);
if(b===undefined){return a.getMonth()}a.setMonth(b);return a.getTime()},utc:function(b){a.setTime(b);
return b+(a.getTimezoneOffset()*60*1000)},local:function(b){a.setTime(b);return b-(a.getTimezoneOffset()*60*1000)
},parse:function(b){},format:function(b){}})})();SC.time.fmt=SC.time.format;SC.time.fn={done:function(){return this.value
}};"month day year".split(" ").forEach(function(a){SC.time.fn[a]=function(b){if(b===undefined){return SC.time[a](this.value)
}else{this.value=SC.time[a](this.value,b);return this}}});var MONTH_NAMES=new Array("January","February","March","April","May","June","July","August","September","October","November","December","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var DAY_NAMES=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sun","Mon","Tue","Wed","Thu","Fri","Sat");
function LZ(a){return(a<0||a>9?"":"0")+a}SC.Locale.define("en",{longMonthNames:"January February March April May".split(" "),shortMonthNames:[],shortDateFormat:"dd/mm/yy",longDateFormat:""});
SC.mixin(Date,{now:function(){return new Date().getTime()},isDate:function(c,b){var a=Date.getDateFromFormat(c,b);
if(a==0){return false}return true},compareDates:function(f,g,c,e){var b=Date.getDateFromFormat(f,g);
var a=Date.getDateFromFormat(c,e);if(b==0||a==0){return -1}else{if(b>a){return 1}}return 0
},getDateFromFormat:function(C,t){C=C+"";t=t+"";var B=0;var n=0;var v="";var g="";
var A="";var j,h;var b=new Date();var l=b.getFullYear();var z=b.getMonth()+1;var w=1;
var e=b.getHours();var u=b.getMinutes();var p=b.getSeconds();var m="";var q=SC.Locale.currentLocale;
while(n<t.length){v=t.charAt(n);g="";while((t.charAt(n)==v)&&(n<t.length)){g+=t.charAt(n++)
}if(g=="yyyy"||g=="yy"||g=="y"){if(g=="yyyy"){j=4;h=4}if(g=="yy"){j=2;h=2}if(g=="y"){j=2;
h=4}l=Date._getInt(C,B,j,h);if(l==null){return 0}B+=l.length;if(l.length==2){if(l>70){l=1900+(l-0)
}else{l=2000+(l-0)}}}else{if(g=="MMM"||g=="NNN"){z=0;for(var s=0;s<MONTH_NAMES.length;
s++){var f=MONTH_NAMES[s];if(C.substring(B,B+f.length).toLowerCase()==f.toLowerCase()){if(g=="MMM"||(g=="NNN"&&s>11)){z=s+1;
if(z>12){z-=12}B+=f.length;break}}}if((z<1)||(z>12)){return 0}}else{if(g=="EE"||g=="E"){for(var s=0;
s<DAY_NAMES.length;s++){var o=DAY_NAMES[s];if(C.substring(B,B+o.length).toLowerCase()==o.toLowerCase()){B+=o.length;
break}}}else{if(g=="MM"||g=="M"){z=Date._getInt(C,B,g.length,2);if(z==null||(z<1)||(z>12)){return 0
}B+=z.length}else{if(g=="dd"||g=="d"){w=Date._getInt(C,B,g.length,2);if(w==null||(w<1)||(w>31)){return 0
}B+=w.length}else{if(g=="hh"||g=="h"){e=Date._getInt(C,B,g.length,2);if(e==null||(e<1)||(e>12)){return 0
}B+=e.length}else{if(g=="HH"||g=="H"){e=Date._getInt(C,B,g.length,2);if(e==null||(e<0)||(e>23)){return 0
}B+=e.length}else{if(g=="KK"||g=="K"){e=Date._getInt(C,B,g.length,2);if(e==null||(e<0)||(e>11)){return 0
}B+=e.length}else{if(g=="kk"||g=="k"){e=Date._getInt(C,B,g.length,2);if(e==null||(e<1)||(e>24)){return 0
}B+=e.length;e--}else{if(g=="mm"||g=="m"){u=Date._getInt(C,B,g.length,2);if(u==null||(u<0)||(u>59)){return 0
}B+=u.length}else{if(g=="ss"||g=="s"){p=Date._getInt(C,B,g.length,2);if(p==null||(p<0)||(p>59)){return 0
}B+=p.length}else{if(g=="a"){if(C.substring(B,B+2).toLowerCase()=="am"){m="AM"}else{if(C.substring(B,B+2).toLowerCase()=="pm"){m="PM"
}else{return 0}}B+=2}else{if(C.substring(B,B+g.length)!=g){return 0}else{B+=g.length
}}}}}}}}}}}}}}if(B!=C.length){return 0}if(z==2){if(((l%4==0)&&(l%100!=0))||(l%400==0)){if(w>29){return 0
}}else{if(w>28){return 0}}}if((z==4)||(z==6)||(z==9)||(z==11)){if(w>30){return 0}}if(e<12&&m=="PM"){e=e-0+12
}else{if(e>11&&m=="AM"){e-=12}}var a=new Date(l,z-1,w,e,u,p);return a.getTime()},parseDate:function(m){var g=(arguments.length==2)?arguments[1]:false;
generalFormats=new Array("E NNN dd HH:mm:ss UTC yyyy","y-M-d","y-M-d","MMM d, y","MMM d,y","y-MMM-d","d-MMM-y","MMM d","d MMM y","d.MMM.y","y MMM d","y.MMM.d");
monthFirst=new Array("M/d/y","M-d-y","M.d.y","MMM-d","M/d","M-d");dateFirst=new Array("d/M/y","d-M-y","d.M.y","d-MMM","d/M","d-M");
var b=new Array("generalFormats",g?"dateFirst":"monthFirst",g?"monthFirst":"dateFirst");
var h=null;h=0;var e=new Date().getTime();switch(m.toLowerCase()){case"yesterday".loc():h=e-(24*60*60*1000);
break;case"today".loc():case"now".loc():h=e;break;case"tomorrow".loc():h=e+(24*60*60*1000);
break}if(h>0){return new Date(h)}for(var f=0;f<b.length;f++){var a=window[b[f]];for(var c=0;
c<a.length;c++){h=Date.getDateFromFormat(m,a[c]);if(h==0){h=Date.getDateFromFormat(m,a[c]+" H:m:s")
}if(h==0){h=Date.getDateFromFormat(m,a[c]+" h:m:s a")}if(h!=0){return new Date(h)
}}}return null},_isInteger:function(c){var b="1234567890";for(var a=0;a<c.length;
a++){if(b.indexOf(c.charAt(a))==-1){return false}}return true},_getInt:function(g,e,f,c){for(var a=c;
a>=f;a--){var b=g.substring(e,e+a);if(b.length<f){return null}if(Date._isInteger(b)){return b
}}return null}});SC.mixin(Date.prototype,{format:function(F){F=F+"";var J=this;var l="";
var w=0;var I="";var f="";var j=J.getFullYear()+"";var g=J.getMonth()+1;var G=J.getDate();
var o=J.getDay();var n=J.getHours();var z=J.getMinutes();var q=J.getSeconds();var u,v,b,t,L,e,D,C,A,p,O,n,N,i,a,B;
var x=new Object();if(j.length<4){j=""+(j-0+1900)}x.y=""+j;x.yyyy=j;x.yy=j.substring(2,4);
x.M=g;x.MM=LZ(g);x.MMM=MONTH_NAMES[g-1];x.NNN=MONTH_NAMES[g+11];x.d=G;x.dd=LZ(G);
x.E=DAY_NAMES[o+7];x.EE=DAY_NAMES[o];x.H=n;x.HH=LZ(n);if(n==0){x.h=12}else{if(n>12){x.h=n-12
}else{x.h=n}}x.hh=LZ(x.h);if(n>11){x.K=n-12}else{x.K=n}x.k=n+1;x.KK=LZ(x.K);x.kk=LZ(x.k);
if(n>11){x.a="PM"}else{x.a="AM"}x.m=z;x.mm=LZ(z);x.s=q;x.ss=LZ(q);while(w<F.length){I=F.charAt(w);
f="";while((F.charAt(w)==I)&&(w<F.length)){f+=F.charAt(w++)}if(x[f]!=null){l=l+x[f]
}else{l=l+f}}return l},utcFormat:function(){return(new Date(this.getTime()+(this.getTimezoneOffset()*60*1000))).format("E NNN dd HH:mm:ss UTC yyyy")
}});SC.Timer=SC.Object.extend({target:null,action:null,isPooled:NO,interval:0,startTime:null,repeats:NO,until:null,isPaused:NO,isScheduled:NO,isValid:YES,lastFireTime:0,fireTime:function(){if(!this.get("isValid")){return -1
}var f=this.get("startTime");if(!f||f===0){return -1}var a=this.get("interval"),c=this.get("lastFireTime");
if(c<f){c=f}var b;if(this.get("repeats")){if(a===0){b=c}else{b=f+(Math.floor((c-f)/a)+1)*a
}}else{b=f+a}var e=this.get("until");if(e&&e>0&&b>e){b=e}return b}.property("interval","startTime","repeats","until","isValid","lastFireTime").cacheable(),schedule:function(){if(!this.get("isValid")){return this
}this.beginPropertyChanges();if(!this.startTime){this.set("startTime",SC.RunLoop.currentRunLoop.get("startTime"))
}var a=this.get("fireTime"),b=this.get("lastFireTime");if(a>=b){this.set("isScheduled",YES);
SC.RunLoop.currentRunLoop.scheduleTimer(this,a)}this.endPropertyChanges();return this
},invalidate:function(){this.beginPropertyChanges();this.set("isValid",NO);SC.RunLoop.currentRunLoop.cancelTimer(this);
this.action=this.target=null;this.endPropertyChanges();if(this.get("isPooled")){SC.Timer.returnTimerToPool(this)
}return this},fire:function(){var b=Date.now();this.set("lastFireTime",b);var a=this.get("fireTime");
if(!this.get("isPaused")){this.performAction()}if(a>b){this.schedule()}else{this.invalidate()
}},performAction:function(){var a=SC.typeOf(this.action);if(a==SC.T_FUNCTION){this.action.call((this.target||this),this)
}else{if(a===SC.T_STRING){if(this.action.indexOf(".")>=0){var f=this.action.split(".");
var c=f.pop();var e=SC.objectForPropertyPath(f,window);var b=e.get?e.get(c):e[c];
if(b&&SC.typeOf(b)==SC.T_FUNCTION){b.call(e,this)}else{throw"%@: Timer could not find a function at %@".fmt(this,this.action)
}}else{SC.RootResponder.responder.sendAction(this.action,this.target,this)}}}},init:function(){arguments.callee.base.apply(this,arguments);
if(this.startTime instanceof Date){this.startTime=this.startTime.getTime()}if(this.until instanceof Date){this.until=this.until.getTime()
}},RESET_DEFAULTS:{target:null,action:null,isPooled:NO,isPaused:NO,isScheduled:NO,isValid:YES,interval:0,repeats:NO,until:null,startTime:null,lastFireTime:0},reset:function(b){if(!b){b=SC.EMPTY_HASH
}this.propertyWillChange("fireTime");var c=this.RESET_DEFAULTS;for(var a in c){if(!c.hasOwnProperty(a)){continue
}this[a]=SC.none(b[a])?c[a]:b[a]}this.propertyDidChange("fireTime");return this},removeFromTimerQueue:function(c){var b=this._timerQueuePrevious,a=this._timerQueueNext;
if(!b&&!a&&c!==this){return c}if(b){b._timerQueueNext=a}if(a){a._timerQueuePrevious=b
}this._timerQueuePrevious=this._timerQueueNext=null;return(c===this)?a:c},scheduleInTimerQueue:function(c,b){this._timerQueueRunTime=b;
var a=c;var e=null;while(a&&a._timerQueueRunTime<b){e=a;a=a._timerQueueNext}if(e){e._timerQueueNext=this;
this._timerQueuePrevious=e}if(a){a._timerQueuePrevious=this;this._timerQueueNext=a
}return(a===c)?this:c},collectExpiredTimers:function(c,a){if(this._timerQueueRunTime>a){return this
}c.push(this);var b=this._timerQueueNext;this._timerQueueNext=null;if(b){b._timerQueuePrevious=null
}return b?b.collectExpiredTimers(c,a):null}});SC.Timer.schedule=function(a){var b;
if(!a||SC.none(a.isPooled)||a.isPooled){b=this.timerFromPool(a)}else{b=this.create(a)
}return b.schedule()};SC.Timer.timerFromPool=function(a){var b=this._timerPool;if(!b){b=this._timerPool=[]
}var c=b.pop();if(!c){c=this.create()}return c.reset(a)};SC.Timer.returnTimerToPool=function(a){if(!this._timerPool){this._timerPool=[]
}this._timerPool.push(a);return this};SC.UserDefaults=SC.Object.extend({userDomain:null,appDomain:null,_defaults:null,defaults:function(a){this._defaults=a;
this.allPropertiesDidChange()},readDefault:function(g){var f=undefined;g=this._normalizeKeyName(g);
var a=this._userKeyName(g);if(this._written){f=this._written[a]}var c=window.localStorage;
if(!c&&window.globalStorage){c=window.globalStorage[window.location.hostname]}if(c){f=c[["SC.UserDefaults",a].join("@")];
if(!SC.none(f)){try{f=SC.json.decode(f)}catch(h){f=undefined}}else{f=undefined}}var b=this.delegate;
if(b&&b.userDefaultsNeedsDefault){f=b.userDefaultsNeedsDefault(this,g,a)}if((f===undefined)&&this._defaults){f=this._defaults[a]||this._defaults[g]
}return f},writeDefault:function(f,g){f=this._normalizeKeyName(f);var a=this._userKeyName(f);
var c=this._written;if(!c){c=this._written={}}c[a]=g;var e=window.localStorage;if(!e&&window.globalStorage){e=window.globalStorage[window.location.hostname]
}if(e){e[["SC.UserDefaults",a].join("@")]=SC.json.encode(g)}var b=this.delegate;if(b&&b.userDefaultsDidChange){b.userDefaultsDidChange(this,f,g,a)
}return this},resetDefault:function(f){var e=this._normalizeKeyName(f);var a=this._userKeyName(e);
this.propertyWillChange(f);this.propertyWillChange(e);var b=this._written;if(b){delete b[a]
}var c=window.localStorage;if(!c&&window.globalStorage){c=window.globalStorage[window.location.hostname]
}if(c){delete c[["SC.UserDefaults",a].join("@")]}this.propertyDidChange(f);this.propertyDidChange(e);
return this},unknownProperty:function(a,b){if(b===undefined){return this.readDefault(a)
}else{this.writeDefault(a,b);return b}},_normalizeKeyName:function(a){if(a.indexOf(":")<0){var b=this.get("appDomain")||"app";
a=[b,a].join(":")}return a},_userKeyName:function(b){var a=this.get("userDomain")||"(anonymous)";
return[a,b].join("@")},_domainDidChange:function(){var a=NO;if(this.get("userDomain")!==this._scud_userDomain){this._scud_userDomain=this.get("userDomain");
a=YES}if(this.get("appDomain")!==this._scud_appDomain){this._scud_appDomain=this.get("appDomain");
a=YES}if(a){this.allPropertiesDidChange()}}.observes("userDomain","appDomain"),init:function(){arguments.callee.base.apply(this,arguments);
this._scud_userDomain=this.get("userDomain");this._scud_appDomain=this.get("appDomain")
}});SC.userDefaults=SC.UserDefaults.create();sc_require("system/browser");SC.mixin({_downloadFrames:0,_copy_computed_props:["maxWidth","maxHeight","paddingLeft","paddingRight","paddingTop","paddingBottom","fontFamily","fontSize","fontStyle","fontWeight","fontVariant","lineHeight","whiteSpace"],download:function(f){var a=document.createElement("iframe");
var e="DownloadFrame_"+this._downloadFrames;SC.$(a).attr("id",e);a.style.border="10px";
a.style.width="0px";a.style.height="0px";a.style.position="absolute";a.style.top="-10000px";
a.style.left="-10000px";if(!SC.browser.isSafari){SC.$(a).attr("src",f)}document.getElementsByTagName("body")[0].appendChild(a);
if(SC.browser.isSafari){SC.$(a).attr("src",f)}this._downloadFrames=this._downloadFrames+1;
if(!SC.browser.isSafari){var c=function(){document.body.removeChild(document.getElementById(e));
e=null};var b=c.invokeLater(null,2000)}a=null},normalizeURL:function(a){if(a.slice(0,1)=="/"){a=window.location.protocol+"//"+window.location.host+a
}else{if((a.slice(0,5)=="http:")||(a.slice(0,6)=="https:")){}else{a=window.location.href+"/"+a
}}return a},minX:function(a){return a.x||0},maxX:function(a){return(a.x||0)+(a.width||0)
},midX:function(a){return(a.x||0)+((a.width||0)/2)},minY:function(a){return a.y||0
},maxY:function(a){return(a.y||0)+(a.height||0)},midY:function(a){return(a.y||0)+((a.height||0)/2)
},centerX:function(b,a){return(a.width-b.width)/2},centerY:function(b,a){return(a.height-b.height)/2
},pointInRect:function(a,b){return(a.x>=SC.minX(b))&&(a.y>=SC.minY(b))&&(a.x<=SC.maxX(b))&&(a.y<=SC.maxY(b))
},rectsEqual:function(b,a,c){if(!b||!a){return(b==a)}if(!c&&c!==0){c=0.1}if((b.y!=a.y)&&(Math.abs(b.y-a.y)>c)){return NO
}if((b.x!=a.x)&&(Math.abs(b.x-a.x)>c)){return NO}if((b.width!=a.width)&&(Math.abs(b.width-a.width)>c)){return NO
}if((b.height!=a.height)&&(Math.abs(b.height-a.height)>c)){return NO}return YES},intersectRects:function(b,a){var c={x:Math.max(SC.minX(b),SC.minX(a)),y:Math.max(SC.minY(b),SC.minY(a)),width:Math.min(SC.maxX(b),SC.maxX(a)),height:Math.min(SC.maxY(b),SC.maxY(a))};
c.width=Math.max(0,c.width-c.x);c.height=Math.max(0,c.height-c.y);return c},unionRects:function(b,a){var c={x:Math.min(SC.minX(b),SC.minX(a)),y:Math.min(SC.minY(b),SC.minY(a)),width:Math.max(SC.maxX(b),SC.maxX(a)),height:Math.max(SC.maxY(b),SC.maxX(a))};
c.width=Math.max(0,c.width-c.x);c.height=Math.max(0,c.height-c.y);return c},cloneRect:function(a){return{x:a.x,y:a.y,width:a.width,height:a.height}
},stringFromRect:function(a){return"{%@, %@, %@, %@}".fmt(a.x,a.y,a.width,a.height)
},stringFromLayout:function(f){var e=["maxHeight","maxWidth","minHeight","minWidth","centerY","centerX","width","height","bottom","right","top","left"];
var a=[];var c=e.length;while(--c>=0){var b=e[c];if(f.hasOwnProperty(b)){a.push(b+":"+f[b])
}}return"{"+a.join(", ")+"}"},heightForString:function(h,e,c,g){var f=this._heightCalcElement,b,a;
b=(g&&SC.typeOf(g)===SC.T_ARRAY)?g.join(" "):"";if(!e){e=100}if(!f){f=this._heightCalcElement=document.createElement("div");
document.body.insertBefore(f,null)}c="%@; width: %@px; left: %@px; position: absolute".fmt(c,e,(-1*e));
SC.$(f).attr("style",c);if(b!==""){SC.$(f).attr("class",b)}f.innerHTML=h;a=f.clientHeight;
f=null;return a},metricsForString:function(n,s,a){var m=this._metricsCalculationElement,e,q,j,t,c;
j=SC.A(a).join(" ");if(!m){m=this._metricsCalculationElement=document.createElement("div");
document.body.insertBefore(m,null)}if(SC.typeOf(s)!=SC.T_STRING){var h=null;if(document.defaultView&&document.defaultView.getComputedStyle){h=document.defaultView.getComputedStyle(s,null)
}else{h=s.currentStyle}c=h.cssText;if(!c||c.trim()===""){var p=this._copy_computed_props;
for(var l=0;l<p.length;l++){var b=p[l],g=h[b];m.style[b]=g}var o=m.style;if(o.font===""){var f="";
if(o.fontStyle){f+=o.fontStyle+" "}if(o.fontVariant){f+=o.fontVariant+" "}if(o.fontWeight){f+=o.fontWeight+" "
}if(o.fontSize){f+=o.fontSize}else{f+="10px"}if(o.lineHeight){f+="/"+o.lineHeight
}f+=" ";if(o.fontFamily){f+=o.fontFamily}else{o+="sans-serif"}m.style.font=f}SC.mixin(m.style,{left:"0px",top:"0px",position:"absolute",bottom:"auto",right:"auto",width:"auto",height:"auto"})
}else{m.setAttribute("style",c+"; position:absolute; left: 0px; top: 0px; bottom: auto; right: auto; width: auto; height: auto;")
}h=null}else{c=s;m.setAttribute("style",c+"; position:absolute; left: 0px; top: 0px; bottom: auto; right: auto; width: auto; height: auto;")
}if(typeof m.innerText!="undefined"){m.innerText=n}else{m.textContent=n}m.className=j;
var u={width:m.clientWidth,height:m.clientHeight};m.innerHTML="";m.className="";m.setAttribute("style","");
m=null;return u},viewportOffset:function(c){if(c.getBoundingClientRect){var e=c.getBoundingClientRect();
return{x:e.left,y:e.top}}var j=0;var f=0;var i=c;var b=SC.browser.mozilla>=3;while(i){f+=(i.offsetTop||0);
if(!b||(i!==c)){f+=(i.clientTop||0)}j+=(i.offsetLeft||0);if(!b||(i!==c)){j+=(i.clientLeft||0)
}if(SC.browser.mozilla){var h=SC.$(i).attr("overflow");if(h!=="visible"){var g=parseInt(SC.$(i).attr("borderLeftWidth"),0)||0;
var l=parseInt(SC.$(i).attr("borderTopWidth"),0)||0;if(c!==i){g*=2;l*=2}j+=g;f+=l
}var a=i.offsetParent;if((SC.browser.mozilla>=3)&&a){f-=a.clientTop;j-=a.clientLeft
}}if(i.offsetParent==document.body&&SC.$(i).attr("position")=="absolute"){break}i=i.offsetParent
}i=c;while(i){if(!SC.browser.isOpera||i.tagName=="BODY"){f-=i.scrollTop||0;j-=i.scrollLeft||0
}i=i.parentNode}return{x:j,y:f}},ZERO_POINT:{x:0,y:0},ZERO_RANGE:{start:0,length:0},RANGE_NOT_FOUND:{start:0,length:-1},valueInRange:function(b,a){return(b>=0)&&(b>=a.start)&&(b<(a.start+a.length))
},minRange:function(a){return a.start},maxRange:function(a){return(a.length<0)?-1:(a.start+a.length)
},unionRanges:function(c,b){if((c==null)||(c.length<0)){return b}if((b==null)||(b.length<0)){return c
}var e=Math.min(c.start,b.start);var a=Math.max(SC.maxRange(c),SC.maxRange(b));return{start:e,length:a-e}
},intersectRanges:function(c,b){if((c==null)||(b==null)){return SC.RANGE_NOT_FOUND
}if((c.length<0)||(b.length<0)){return SC.RANGE_NOT_FOUND}var e=Math.max(SC.minRange(c),SC.minRange(b));
var a=Math.min(SC.maxRange(c),SC.maxRange(b));if(a<e){return SC.RANGE_NOT_FOUND}return{start:e,length:a-e}
},subtractRanges:function(c,b){if((c==null)||(b==null)){return SC.RANGE_NOT_FOUND
}if((c.length<0)||(b.length<0)){return SC.RANGE_NOT_FOUND}var a=Math.max(SC.minRange(c),SC.minRange(b));
var e=Math.min(SC.maxRange(c),SC.maxRange(b));if(a<e){return SC.RANGE_NOT_FOUND}return{start:e,length:a-e}
},cloneRange:function(a){return{start:a.start,length:a.length}},rangesEqual:function(b,a){if(b===a){return true
}if(b==null){return a.length<0}if(a==null){return b.length<0}return(b.start==a.start)&&(b.length==a.length)
},convertHsvToHex:function(l,y,w){var a=0;var m=0;var u=0;if(w>0){var j=(l==1)?0:Math.floor(l*6);
var n=(l==1)?0:(l*6)-j;var e=w*(1-y);var c=w*(1-(y*n));var x=w*(1-(y*(1-n)));var o=[[w,x,e],[c,w,e],[e,w,x],[e,c,w],[x,e,w],[w,e,c]];
a=Math.round(255*o[j][0]);m=Math.round(255*o[j][1]);u=Math.round(255*o[j][2])}return this.parseColor("rgb("+a+","+m+","+u+")")
},convertHexToHsv:function(i){var c=this.expandColor(i);var a=Math.max(Math.max(c[0],c[1]),c[2]);
var e=Math.min(Math.min(c[0],c[1]),c[2]);var g=(a==e)?0:((a==c[0])?((c[1]-c[2])/(a-e)/6):((a==c[1])?((c[2]-c[0])/(a-e)/6+1/3):((c[0]-c[1])/(a-e)/6+2/3)));
g=(g<0)?(g+1):((g>1)?(g-1):g);var f=(a==0)?0:(1-e/a);var b=a/255;return[g,f,b]},PARSE_COLOR_RGBRE:/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i,PARSE_COLOR_HEXRE:/^\#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,expandColor:function(b){var c,f,e,a;
c=this.parseColor(b);if(c){f=parseInt(c.slice(1,3),16);e=parseInt(c.slice(3,5),16);
a=parseInt(c.slice(5,7),16);return[f,e,a]}},parseColor:function(e){var f=0,a="#",c;
if(c=this.PARSE_COLOR_RGBRE.exec(e)){var b;for(f=1;f<=3;f++){b=Math.max(0,Math.min(255,parseInt(c[f],0)));
a+=this.toColorPart(b)}return a}if(c=this.PARSE_COLOR_HEXRE.exec(e)){if(c[1].length==3){for(f=0;
f<3;f++){a+=c[1].charAt(f)+c[1].charAt(f)}return a}return"#"+c[1]}return false},toColorPart:function(a){if(a>255){a=255
}var b=a.toString(16);if(a<16){return"0"+b}return b},getStyle:function(a,b){var c="";
if(document.defaultView&&document.defaultView.getComputedStyle){c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b)
}else{if(a.currentStyle){b=b.replace(/\-(\w)/g,function(e,f){return f.toUpperCase()
});c=a.currentStyle[b]}}return c}});SC.VALIDATE_OK=YES;SC.VALIDATE_NO_CHANGE=NO;SC.Validator=SC.Object.extend({fieldValueForObject:function(b,c,a){return b
},objectForFieldValue:function(c,b,a){return c},validate:function(a,b){return true
},validateError:function(a,b){return SC.$error("Invalid.General(%@)".loc(b.get("fieldValue")),b.get("fieldKey"))
},validateChange:function(b,c,a){return this.validate(b,c)?SC.VALIDATE_OK:this.validateError(b,c)
},validateSubmit:function(a,b){return this.validate(a,b)?SC.VALIDATE_OK:this.validateError(a,b)
},validatePartial:function(a,b){if(!b.get("isValid")){return this.validate(a,b)?SC.VALIDATE_OK:this.validateError(a,b)
}else{return SC.VALIDATE_NO_CHANGE}},validateKeyDown:function(b,c,a){return true},attachTo:function(a,b){},detachFrom:function(a,b){}});
SC.Validator.mixin({OK:true,NO_CHANGE:false,findFor:function(f,h,g){var c;if(!g){return
}if(g instanceof SC.Validator){c=g}else{if(g.isClass){c=g.create()}else{if(SC.typeOf(g)===SC.T_STRING){var b=null;
var a=g.match(/^(.+)\[(.*)\]/);if(a){g=a[1];b=a[2]}g=g.classify();var e=SC.Validator[g];
if(SC.none(e)){throw"validator %@ not found for %@".fmt(g,h)}else{if(b){if(!f){throw"named validator (%@) could not be found for field %@ because the field does not belong to a form".fmt(b,h)
}if(!f._validatorHash){f._validatorHash={}}c=(b)?f._validatorHash[b]:null;if(!c){c=e.create()
}if(b){f._validatorHash[b]=c}}else{c=e.create()}}}}}return c},fieldValueForObject:function(a,b,c){if(this.prototype&&this.prototype.fieldValueForObject){return this.prototype.fieldValueForObject(a,b,c)
}else{return null}},objectForFieldValue:function(b,a,c){if(this.prototype&&this.prototype.objectForFieldValue){return this.prototype.objectForFieldValue(b,a,c)
}else{return null}}});sc_require("validators/validator");SC.Validator.CreditCard=SC.Validator.extend({fieldValueForObject:function(a,b,c){if(typeof(a)=="string"&&a.length==16){a=[a.slice(0,4),a.slice(4,8),a.slice(8,12),a.slice(12,16)].join(" ")
}return a},objectForFieldValue:function(b,a,c){return b.replace(/[\s-\.\:]/g,"")},validate:function(a,b){return this.checkNumber(b.get("fieldValue"))
},validateError:function(b,c){var a=c.get("errorLabel")||"Field";return SC.$error("Invalid.CreditCard(%@)".loc(a),a)
},validateKeyDown:function(b,c,a){return !!a.match(/[0-9\- ]/)},checkNumber:function(l){if(!l||l.length===0){return YES
}l=l.replace(/[^0-9]/g,"");var a="0123456789";var h=l.length;var g=parseInt(l,0);
var n=l.toString();n=n.replace(/^\s+|\s+$/g,"");var m=0;var p=true;var b=false;var o;
var e;for(var c=0;c<h;c++){o=""+n.substring(c,c+1);if(a.indexOf(o)=="-1"){p=false
}}if(!p){b=false}if((h===0)&&(b)){b=false}else{if(h>=15){for(var f=h;f>0;f--){e=parseInt(g,0)%10;
e=parseInt(e,0);m+=e;f--;g=g/10;e=parseInt(g,0)%10;e=e*2;switch(e){case 10:e=1;break;
case 12:e=3;break;case 14:e=5;break;case 16:e=7;break;case 18:e=9;break;default:e=e
}g=g/10;m+=e}if((m%10)===0){b=true}else{b=false}}}return b}});sc_require("validators/validator");
SC.Validator.Date=SC.Validator.extend({format:"NNN d, yyyy h:mm:ss a",fieldValueForObject:function(b,c,e){var a;
if(typeof(b)==="number"){a=new Date(b)}else{if(b instanceof Date){a=b}}if(a){b=a.format(this.get("format"))
}return b},objectForFieldValue:function(c,b,e){if(c){var a=Date.parseDate(c);c=(a)?a.getTime():null
}return c}});sc_require("validators/validator");SC.Validator.Email=SC.Validator.extend({validate:function(a,b){return(b.get("fieldValue")||"").match(/.+@.+\...+/)
},validateError:function(b,c){var a=c.get("errorLabel")||"Field";return SC.$error("Invalid.Email(%@)".loc(a),a)
}});SC.Validator.EmailOrEmpty=SC.Validator.Email.extend({validate:function(a,c){var b=c.get("fieldValue");
return(b&&b.length>0)?b.match(/.+@.+\...+/):true}});sc_require("validators/validator");
SC.Validator.NotEmpty=SC.Validator.extend({validate:function(b,e){var c=e.get("fieldValue");
var a=!!c;if(a&&c.length){a=c.length>0}return a},validateError:function(b,c){var a=c.get("errorLabel")||"Field";
return SC.$error("Invalid.NotEmpty(%@)".loc(a.capitalize()),c.get("errorLabel"))}});
sc_require("validators/validator");SC.Validator.Number=SC.Validator.extend({places:0,fieldValueForObject:function(a,b,c){switch(SC.typeOf(a)){case SC.T_NUMBER:a=a.toFixed(this.get("places"));
break;case SC.T_NULL:case SC.T_UNDEFINED:a="";break}return a},objectForFieldValue:function(b,a,c){b=b.replace(/,/g,"");
switch(SC.typeOf(b)){case SC.T_STRING:if(b.length===0){b=null}else{if(this.get("places")>0){b=parseFloat(b)
}else{if(b.length==1&&b.match(/-/)){b=null}else{b=parseInt(b,0)}}}break;case SC.T_NULL:case SC.T_UNDEFINED:b=null;
break}return b},validate:function(a,c){var b=c.get("fieldValue");return(b==="")||!(isNaN(b)||isNaN(parseFloat(b)))
},validateError:function(b,c){var a=c.get("errorLabel")||"Field";return SC.$error("Invalid.Number(%@)".loc(a),a)
},validateKeyDown:function(b,c,a){if(this.get("places")===0){return(a.match(/^[\-+]?[0-9,\0]*/)[0]===a)||a.length===0
}else{return(a.match(/^[\-+]?[0-9,\0]*\.?[0-9\0]+/)===a)||a.length===0}}});sc_require("validators/validator");
SC.Validator.Password=SC.Validator.extend({attachTo:function(a,b){arguments.callee.base.apply(this,arguments);
if(!this.fields){this.fields=[]}this.fields.push(b)},validate:function(f){if(!this.fields||this.fields.length===0){return true
}var e=false;var b=false;var a=true;var c=this.fields[0].get("fieldValue");this.fields.forEach(function(h){var g=h.get("fieldValue");
if(g!=c){a=false}if(!g||g.length===0){e=true}if(g&&g.length>0){b=true}});if(f){return(b===false)?false:a
}else{return(e===true)?true:a}},updateFields:function(c,b){if(!this.fields||this.fields.length===0){return true
}var a="Invalid.Password".loc();var e=this._field;this.fields.forEach(function(g){var h=(b)?null:((g==e)?a:"");
c.setErrorFor(g,h)});return(b)?SC.VALIDATE_OK:a},validateChange:function(b,c,a){return this.updateFields(b,this.validate(false))
},validateSubmit:function(a,b){return this.updateFields(a,this.validate(true))},validatePartial:function(b,c){var a=!this._field.get("isValid");
if(a){return this.updateFields(b,this.validate(false))}else{return SC.VALIDATE_NO_CHANGE
}}});sc_require("views/view");SC.ContainerView=SC.View.extend({classNames:["sc-container-view"],nowShowing:null,contentView:null,contentViewBindingDefault:SC.Binding.single(),replaceContent:function(a){this.removeAllChildren();
if(a){this.appendChild(a)}},createChildViews:function(){var a=this.get("contentView");
if(a){a=this.contentView=this.createChildView(a);this.childViews=[a]}},awake:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("nowShowing");if(a&&a.length>0){this.nowShowingDidChange()}},nowShowingDidChange:function(){var b=this.get("nowShowing");
var a=null;if(SC.typeOf(b)===SC.T_STRING){if(b===SC.CONTENT_SET_DIRECTLY){return}if(b&&b.length>0){if(b.indexOf(".")>0){a=SC.objectForPropertyPath(b,null)
}else{a=SC.objectForPropertyPath(b,this.get("page"))}}}else{a=b}if(a&&!(a instanceof SC.View)){a=null
}this.set("contentView",a)}.observes("nowShowing"),contentViewDidChange:function(){this.replaceContent(this.get("contentView"))
}.observes("contentView")});sc_require("views/view");sc_require("mixins/control");
SC.IMAGE_STATE_NONE="none";SC.IMAGE_STATE_LOADING="loading";SC.IMAGE_STATE_LOADED="loaded";
SC.IMAGE_STATE_FAILED="failed";SC.IMAGE_STATE_SPRITE="sprite";SC.BLANK_IMAGE_DATAURL="data:image/gif;base64,R0lGODlhAQABAJAAAP///wAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==";
SC.BLANK_IMAGE_URL=SC.browser.msie&&SC.browser.msie<8?"/static/sproutcore/foundation/es/8a251fa716984f96f1bb0da61ecbb81c07d2fc28/blank.gif":SC.BLANK_IMAGE_DATAURL;
SC.ImageView=SC.View.extend(SC.Control,{classNames:"sc-image-view",tagName:"img",status:SC.IMAGE_STATE_NONE,value:null,useImageCache:YES,canLoadInBackground:NO,localize:YES,displayProperties:"status toolTip".w(),render:function(c,g){var a=this.get("status"),e=this.get("value");
if(a===SC.IMAGE_STATE_NONE&&e){this._image_valueDidChange()}a=this.get("status");
var f=(a===SC.IMAGE_STATE_LOADED)?e:SC.BLANK_IMAGE_URL;if(a===SC.IMAGE_STATE_SPRITE){c.addClass(e)
}c.attr("src",f);var b=this.get("toolTip");if(SC.typeOf(b)===SC.T_STRING){if(this.get("localize")){b=b.loc()
}c.attr("title",b);c.attr("alt",b)}},_image_valueDidChange:function(){var b=this.get("value"),c;
if(b&&b.isEnumerable){b=b.firstObject()}c=SC.ImageView.valueIsUrl(b);if(c&&this.get("useImageCache")){var a=this.get("isVisibleInWindow")||this.get("canLoadInBackground");
this._loadingUrl=b;SC.imageCache.loadImage(b,this,this.imageDidLoad,a);if(this._loadingUrl){this.set("status",SC.IMAGE_STATE_LOADING)
}}else{this._loadingUrl=null;this.set("status",(c)?SC.IMAGE_STATE_LOADED:SC.IMAGE_STATE_SPRITE);
this.displayDidChange()}}.observes("value"),imageDidLoad:function(a,b){if(a===this._loadingUrl){this._loadingUrl=null
}if(this.get("value")===a){this.set("status",SC.$ok(b)?SC.IMAGE_STATE_LOADED:SC.IMAGE_STATE_FAILED);
this.displayDidChange()}}});SC.ImageView.valueIsUrl=function(a){return a?a.indexOf("/")>=0:NO
};sc_require("views/view");sc_require("mixins/control");SC.ALIGN_LEFT="left";SC.ALIGN_RIGHT="right";
SC.ALIGN_CENTER="center";SC.REGULAR_WEIGHT="normal";SC.BOLD_WEIGHT="bold";SC.LabelView=SC.View.extend(SC.Control,{classNames:["sc-label-view"],fontWeight:SC.REGULAR_WEIGHT,escapeHTML:true,escapeHTMLBindingDefault:SC.Binding.oneWay().bool(),localize:false,localizeBindingDefault:SC.Binding.oneWay().bool(),formatter:null,value:"",hint:null,exampleInlineTextFieldView:SC.InlineTextFieldView,icon:null,textAlign:SC.ALIGN_LEFT,isInlineEditorMultiline:NO,displayValue:function(){var g=this.get("value");
var e=this.getDelegateProperty("formatter",this.displayDelegate);if(e){var f=(SC.typeOf(e)===SC.T_FUNCTION)?e(g,this):e.fieldValueForObject(g,this);
if(!SC.none(f)){g=f}}if(SC.typeOf(g)===SC.T_ARRAY){var c=[];for(var b=0;b<g.get("length");
b++){var a=g.objectAt(b);if(!SC.none(a)&&a.toString){a=a.toString()}c.push(a)}g=c.join(",")
}if(!SC.none(g)&&g.toString){g=g.toString()}if(g&&this.getDelegateProperty("localize",this.displayDelegate)){g=g.loc()
}if(this.get("escapeHTML")){g=SC.RenderContext.escapeHTML(g)}return g}.property("value","localize","formatter","escapeHTML").cacheable(),isEditable:NO,isEditableBindingDefault:SC.Binding.bool(),isEditing:NO,validator:null,doubleClick:function(a){return this.beginEditing()
},beginEditing:function(){if(this.get("isEditing")){return YES}if(!this.get("isEditable")){return NO
}var b=this.$();var e=this.get("value")||"";var c=SC.viewportOffset(b[0]);var a=this.convertFrameFromView(this.get("frame"),null);
c.width=a.width;c.height=a.height;SC.InlineTextFieldView.beginEditing({frame:c,delegate:this,exampleElement:b,value:e,multiline:this.get("isInlineEditorMultiline"),isCollection:NO,validator:this.get("validator"),exampleInlineTextFieldView:this.get("exampleInlineTextFieldView")})
},discardEditing:function(){if(!this.get("isEditing")){return YES}return SC.InlineTextFieldView.discardEditing()
},commitEditing:function(){if(!this.get("isEditing")){return YES}return SC.InlineTextFieldView.commitEditing()
},inlineEditorWillBeginEditing:function(a){this.set("isEditing",YES)},inlineEditorDidBeginEditing:function(a){this._oldOpacity=this.$().css("opacity");
this.$().css("opacity",0)},inlineEditorShouldEndEditing:function(a,b){return YES},inlineEditorDidEndEditing:function(a,b){this.setIfChanged("value",b);
this.$().css("opacity",this._oldOpacity);this._oldOpacity=null;this.set("isEditing",NO)
},displayProperties:"displayValue textAlign fontWeight icon".w(),_TEMPORARY_CLASS_HASH:{},render:function(c,i){var g=this.get("displayValue"),f=this.get("icon"),h=this.get("hint");
if(f){var a=(f.indexOf("/")>=0)?f:SC.BLANK_IMAGE_URL;var e=(a===f)?"":f;f='<img src="%@" alt="" class="icon %@" />'.fmt(a,e);
c.push(f)}if(h&&(!g||g==="")){c.push('<span class="sc-hint">',h,"</span>")}else{c.push(g)
}c.addStyle("text-align",this.get("textAlign")).addStyle("font-weight",this.get("fontWeight"));
var b=this._TEMPORARY_CLASS_HASH;b.icon=!!this.get("icon");c.setClass(b);if(this.get("isEditing")){c.addStyle("opacity",0)
}}});require("panes/pane");SC.MainPane=SC.Pane.extend({layout:{left:0,right:0,top:0,bottom:0},paneDidAttach:function(){var b=arguments.callee.base.apply(this,arguments);
var a=this.rootResponder;a.makeMainPane(this);if(!a.get("keyRootView")){a.makeKeyPane(this)
}return b},acceptsKeyPane:YES,classNames:["sc-main"]});if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/foundation")
}SC.stringsFor("English",{"Invalid.CreditCard(%@)":"%@ is not a valid credit card number","Invalid.Email(%@)":"%@ is not a valid email address","Invalid.NotEmpty(%@)":"%@ must not be empty","Invalid.Password":"Your passwords do not match.  Please try typing them again.","Invalid.General(%@)":"%@ is invalid.  Please try again.","Invalid.Number(%@)":"%@ is not a number."});
SC.allowsBackspaceToPreviousPage=NO;SC.BORDER_BEZEL="sc-bezel-border";SC.BORDER_BLACK="sc-black-border";
SC.BORDER_GRAY="sc-gray-border";SC.BORDER_TOP="sc-top-border";SC.BORDER_BOTTOM="sc-bottom-border";
SC.BORDER_NONE=null;SC.Border={borderStyle:SC.BORDER_GRAY,_BORDER_REGEXP:(/-border$/),renderMixin:function(a,c){var b=this.get("borderStyle");
if(b){if(this._BORDER_REGEXP.exec(b)){a.addClass(b)}else{a.addStyle("border","1px %@ solid".fmt(b))
}}}};SC.CollectionGroup={classNames:["sc-collection-group"]};SC.CollectionRowDelegate={isCollectionRowDelegate:YES,rowHeight:18,customRowHeightIndexes:null,contentIndexRowHeight:function(a,b,c){return this.get("rowHeight")
}};SC.CollectionViewDelegate={isCollectionViewDelegate:YES,collectionViewSelectionForProposedSelection:function(a,b){return b
},collectionViewShouldSelectIndexes:function(a,b,c){return b},collectionViewShouldDeselectIndexes:function(a,b){return b
},collectionViewShouldDeleteIndexes:function(a,b){return b},collectionViewDeleteContent:function(a,c,b){if(!c){return NO
}if(SC.typeOf(c.destroyAt)===SC.T_FUNCTION){c.destroyAt(b);a.selectPreviousItem(NO,1);
return YES}else{if(SC.typeOf(c.removeAt)===SC.T_FUNCTION){c.removeAt(b);a.selectPreviousItem(NO,1);
return YES}else{return NO}}},collectionViewShouldBeginDrag:function(a){return YES
},collectionViewDragDataTypes:function(a){return[]},collectionViewDragDataForType:function(a,c,b){return null
},collectionViewComputeDragOperations:function(a,b,c){return c},collectionViewValidateDragOperation:function(b,e,f,c,a){return(a&SC.DROP_ON)?SC.DRAG_NONE:f
},collectionViewPerformDragOperation:function(b,e,f,c,a){return SC.DRAG_NONE},collectionViewDragViewFor:function(a,b){return null
},ghostActsLikeCursor:NO};SC.Scrollable={isScrollable:true,verticalLineScroll:20,horizontalLineScroll:20,verticalPageScroll:function(){return this.get("innerFrame").height
}.property("innerFrame"),horizontalPageScroll:function(){return this.get("innerFrame").width
}.property("innerFrame"),hasVerticalScroller:function(){return this.get("scrollFrame").height>this.get("innerFrame").height
}.property("scrollFrame"),hasHorizontalScroller:function(){return this.get("scrollFrame").width>this.get("innerFrame").width
}.property("scrollFrame"),scrollBy:function(a){var b=this.get("scrollFrame");var c=this.get("innerFrame");
if(!this.get("hasVerticalScroller")){a.y=0}if(b.height<=c.height){a.y=0}if(!this.get("hasHorizontalScroller")){a.x=0
}if(b.width<=c.width){a.x=0}var e={x:b.x-(a.x||0),y:b.y-(a.y||0)};this.set("scrollFrame",e);
e=this.get("scrollFrame");return{x:e.x-b.x,y:e.y-b.y}},scrollTo:function(a,b){this.set("scrollFrame",{x:0-a,y:0-b})
},scrollToVisible:function(b){var g=this.get("innerFrame");var e=this.get("scrollFrame");
var a=this.convertFrameFromView(b.get("frame"),b);a.x-=(g.x+e.x);a.y-=(g.y+e.y);var c={x:0-e.x,y:0-e.y,width:g.width,height:g.height};
c.y-=Math.max(0,SC.minY(c)-SC.minY(a));c.x-=Math.max(0,SC.minX(c)-SC.minX(a));c.y+=Math.max(0,SC.maxY(a)-SC.maxY(c));
c.x+=Math.max(0,SC.maxX(a)-SC.maxX(c));this.scrollTo(c.x,c.y)},scrollDownLine:function(a){if(a===undefined){a=1
}return this.scrollBy({y:this.get("verticalLineScroll")*a}).y},scrollUpLine:function(a){if(a===undefined){a=1
}return 0-this.scrollBy({y:0-this.get("verticalLineScroll")*a}).y},scrollRightLine:function(a){if(a===undefined){a=1
}return this.scrollTo({y:this.get("horizontalLineScroll")*a}).x},scrollLeftLine:function(a){if(a===undefined){a=1
}return 0-this.scrollTo({y:0-this.get("horizontalLineScroll")*a}).x},scrollDownPage:function(a){if(a===undefined){a=1
}return this.scrollBy({y:this.get("verticalPageScroll")*a}).y},scrollUpPage:function(a){if(a===undefined){a=1
}return 0-this.scrollBy({y:0-this.get("verticalPageScroll")*a}).y},scrollRightPage:function(a){if(a===undefined){a=1
}return this.scrollTo({y:this.get("horizontalPageScroll")*a}).x},scrollLeftPage:function(a){if(a===undefined){a=1
}return 0-this.scrollTo({y:0-this.get("horizontalPageScroll")*a}).x}};SC.ModalPane=SC.Pane.extend({classNames:"sc-modal",layout:{top:0,left:0,bottom:0,right:0},_openPaneCount:0,paneWillAppend:function(a){this._openPaneCount++;
if(!this.get("isVisibleInWindow")){this.append()}return this},paneDidRemove:function(a){this._openPaneCount--;
if(this._openPaneCount<=0){this._openPaneCount=0;if(this.get("isVisibleInWindow")){this.remove()
}}},mouseDown:function(b){var a=this.get("owner");if(a&&a.modalPaneDidClick){a.modalPaneDidClick(b)
}}});sc_require("panes/modal");SC.PanelPane=SC.Pane.extend({layout:{left:0,right:0,top:0,bottom:0},classNames:["sc-panel"],acceptsKeyPane:YES,isModal:YES,modalPane:SC.ModalPane.extend({classNames:"for-sc-panel"}),contentView:null,contentViewBindingDefault:SC.Binding.single(),render:function(a,b){if(a.needsContent){this.renderChildViews(a,b);
a.push("<div class='top-left-edge'></div>","<div class='top-edge'></div>","<div class='top-right-edge'></div>","<div class='right-edge'></div>","<div class='bottom-right-edge'></div>","<div class='bottom-edge'></div>","<div class='bottom-left-edge'></div>","<div class='left-edge'></div>")
}},replaceContent:function(a){this.removeAllChildren();if(a){this.appendChild(a)}},createChildViews:function(){var a=this.contentView;
if(a){a=this.contentView=this.createChildView(a);this.childViews=[a]}},contentViewDidChange:function(){this.replaceContent(this.get("contentView"))
}.observes("contentView"),_modalPane:function(){var a=this.get("modalPane");if(a&&a.isClass){a=a.create({owner:this});
this.set("modalPane",a)}return a},appendTo:function(a){var b;if(!this.get("isVisibleInWindow")&&this.get("isModal")&&(b=this._modalPane())){this._isShowingModal=YES;
b.paneWillAppend(this)}return arguments.callee.base.apply(this,arguments)},remove:function(){var b,a=arguments.callee.base.apply(this,arguments);
if(this._isShowingModal){this._isShowingModal=NO;if(b=this._modalPane()){b.paneDidRemove(this)
}}return a},_isModalDidChange:function(){var b,a=this.get("isModal");if(a){if(!this._isShowingModal&&this.get("isVisibleInWindow")&&(b=this._modalPane())){this._isShowingModal=YES;
b.paneWillAppend(this)}}else{if(this._isShowingModal&&(b=this._modalPane())){this._isShowingModal=NO;
b.paneDidRemove(this)}}}.observes("isModal"),paneDidAttach:function(){var a=arguments.callee.base.apply(this,arguments);
this.becomeKeyPane();return a}});SC.TOGGLE_BEHAVIOR="toggle";SC.PUSH_BEHAVIOR="push";
SC.TOGGLE_ON_BEHAVIOR="on";SC.TOGGLE_OFF_BEHAVIOR="off";SC.HOLD_BEHAVIOR="hold";SC.ButtonView=SC.View.extend(SC.Control,SC.Button,SC.StaticLayout,{tagName:"a",classNames:["sc-button-view"],theme:"square",buttonBehavior:SC.PUSH_BEHAVIOR,holdInterval:100,isDefault:NO,isDefaultBindingDefault:SC.Binding.oneWay().bool(),isCancel:NO,isCancelBindingDefault:SC.Binding.oneWay().bool(),href:"",action:null,target:null,triggerAction:function(a){if(!this.get("isEnabled")){return NO
}this.set("isActive",YES);this._action(a,YES);this.didTriggerAction();this.invokeLater("set",200,"isActive",NO);
return true},didTriggerAction:function(){},titleMinWidth:80,init:function(){arguments.callee.base.apply(this,arguments);
if(this.get("keyEquivalent")){this._defaultKeyEquivalent=this.get("keyEquivalent")
}},_TEMPORARY_CLASS_HASH:{},displayProperties:["href","icon","title","value","toolTip"],render:function(e,f){var a,b,c;
if(this.get("tagName")==="a"){a=this.get("href");if(!a||(a.length===0)){a="javascript:;"
}e.attr("href",a)}b=this.get("toolTip");if(SC.typeOf(b)===SC.T_STRING){if(this.get("localize")){b=b.loc()
}e.attr("title",b);e.attr("alt",b)}c=this._TEMPORARY_CLASS_HASH;c.def=this.get("isDefault");
c.cancel=this.get("isCancel");c.icon=!!this.get("icon");e.attr("role","button").setClass(c).addClass(this.get("theme"));
if(f){e=e.push("<span class='sc-button-inner' style = 'min-width:%@px'>".fmt(this.get("titleMinWidth")));
this.renderTitle(e,f);e.push("</span>")}else{this.renderTitle(e,f)}},_defaultKeyEquivalent:null,_isDefaultOrCancelDidChange:function(){var a=!!this.get("isDefault"),b=!a&&this.get("isCancel");
if(this.didChangeFor("defaultCancelChanged","isDefault","isCancel")){this.displayDidChange();
if(a){this.set("keyEquivalent","return")}else{if(b){this.setIfChanged("keyEquivalent","escape")
}else{this.set("keyEquivalent",this._defaultKeyEquivalent)}}}}.observes("isDefault","isCancel"),isMouseDown:false,mouseDown:function(a){var b=this.get("buttonBehavior");
if(!this.get("isEnabled")){return YES}this.set("isActive",YES);this._isMouseDown=YES;
if(b===SC.HOLD_BEHAVIOR){this._action(a)}else{if(!this._isFocused&&(b!==SC.PUSH_BEHAVIOR)){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$()[0].focus()
}}}return YES},mouseExited:function(a){if(this._isMouseDown){this.set("isActive",NO)
}return YES},mouseEntered:function(a){this.set("isActive",this._isMouseDown);return YES
},mouseUp:function(b){if(this._isMouseDown){this.set("isActive",NO)}this._isMouseDown=false;
if(this.get("buttonBehavior")!==SC.HOLD_BEHAVIOR){var a=this.$().within(b.target);
if(a&&this.get("isEnabled")){this._action(b)}}return YES},keyDown:function(b){if(b.which===9){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(a){a.becomeFirstResponder()}else{b.allowDefault()}return YES}if(b.which===13){this.triggerAction(b);
return YES}return YES},_action:function(a,c){switch(this.get("buttonBehavior")){case SC.TOGGLE_BEHAVIOR:var b=this.get("isSelected");
if(b){this.set("value",this.get("toggleOffValue"))}else{this.set("value",this.get("toggleOnValue"))
}break;case SC.TOGGLE_ON_BEHAVIOR:this.set("value",this.get("toggleOnValue"));break;
case SC.TOGGLE_OFF_BEHAVIOR:this.set("value",this.get("toggleOffValue"));break;case SC.HOLD_BEHAVIOR:this._runHoldAction(a,c);
break;default:this._runAction(a)}},_runAction:function(a){var b=this.get("action"),c=this.get("target")||null;
if(b){if(this._hasLegacyActionHandler()){this._triggerLegacyActionHandler(a)}else{this.getPath("pane.rootResponder").sendAction(b,c,this,this.get("pane"))
}}},_runHoldAction:function(a,b){if(this.get("isActive")){this._runAction();if(!b){SC.RunLoop.begin();
this.invokeLater("_runHoldAction",this.get("holdInterval"),a);SC.RunLoop.end()}}},_hasLegacyActionHandler:function(){var a=this.get("action");
if(a&&(SC.typeOf(a)===SC.T_FUNCTION)){return true}if(a&&(SC.typeOf(a)===SC.T_STRING)&&(a.indexOf(".")!=-1)){return true
}return false},_triggerLegacyActionHandler:function(evt){if(!this._hasLegacyActionHandler()){return false
}var action=this.get("action");if(SC.typeOf(action)===SC.T_FUNCTION){this.action(evt)
}if(SC.typeOf(action)===SC.T_STRING){eval("this.action = function(e) { return "+action+"(this, e); };");
this.action(evt)}},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$()[0].focus()
}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}}});
sc_require("panes/panel");sc_require("views/button");SC.BUTTON1_STATUS="button1";
SC.BUTTON2_STATUS="button2";SC.BUTTON3_STATUS="button3";SC.AlertPane=SC.PanelPane.extend({classNames:"sc-alert",delegate:null,icon:"sc-icon-alert-48",message:"",description:"",displayDescription:function(){var a=this.get("description");
if(!a||a.length===0){return a}a=SC.RenderContext.escapeHTML(a);return'<p class="description">'+a.split("\n").join('</p><p class="description">')+"</p>"
}.property("description").cacheable(),caption:"",displayCaption:function(){var a=this.get("caption");
if(!a||a.length===0){return a}a=SC.RenderContext.escapeHTML(a);return'<p class="caption">'+a.split("\n").join('</p><p class="caption">')+"</p>"
}.property("caption").cacheable(),buttonOne:SC.outlet("contentView.childViews.1.childViews.1"),buttonTwo:SC.outlet("contentView.childViews.1.childViews.0"),buttonThree:SC.outlet("contentView.childViews.2.childViews.0"),buttonThreeWrapper:SC.outlet("contentView.childViews.2"),layout:{centerX:0,width:500,top:55},contentView:SC.View.extend({useStaticLayout:YES,layout:{left:0,right:0,top:0,height:"auto"},childViews:[SC.View.extend(SC.StaticLayout,{classNames:["info"],render:function(a,e){var c=this.get("pane");
var b=SC.BLANK_IMAGE_URL;if(c.get("icon")=="blank"){a.addClass("plain")}a.push('<img src="%@" class="icon %@" />'.fmt(b,c.get("icon")));
a.begin("h1").text(c.get("message")||"").end();a.push(c.get("displayDescription")||"");
a.push(c.get("displayCaption")||"");a.push('<div class="separator"></div>')}}),SC.View.extend({layout:{bottom:13,height:24,right:18,width:466},childViews:["cancelButton","okButton"],classNames:["text-align-right"],cancelButton:SC.ButtonView.extend({useStaticLayout:YES,actionKey:SC.BUTTON2_STATUS,localize:YES,titleMinWidth:64,layout:{right:5,height:"auto",width:"auto",bottom:0},theme:"capsule",title:"Cancel",action:"dismiss",isVisible:NO}),okButton:SC.ButtonView.extend({useStaticLayout:YES,actionKey:SC.BUTTON1_STATUS,localize:YES,titleMinWidth:64,layout:{left:0,height:"auto",width:"auto",bottom:0},theme:"capsule",title:"OK",isDefault:YES,action:"dismiss"})}),SC.View.extend({layout:{bottom:13,height:24,left:18,width:150},isVisible:NO,childViews:[SC.ButtonView.extend({useStaticLayout:YES,actionKey:SC.BUTTON3_STATUS,localize:YES,titleMinWidth:64,layout:{left:0,height:"auto",width:"auto",bottom:0},theme:"capsule",title:"Extra",action:"dismiss",isVisible:NO})]})]}),dismiss:function(b){var a=this.delegate;
if(a&&a.alertPaneDidDismiss){a.alertPaneDidDismiss(this,b.get("actionKey"))}this.remove()
},alertInfoDidChange:function(){var a=this.getPath("contentView.childViews.0");if(a){a.displayDidChange()
}}.observes("icon","message","displayDescription","displayCaption")});SC.AlertPane._normalizeArguments=function(b){b=SC.A(b);
var a=b.length,c=b[a-1];if(SC.typeOf(c)!==SC.T_STRING){b[a-1]=null}else{c=null}b[7]=c;
return b};SC.AlertPane.show=function(s,n,p,b,c,q,a,h){var g=this._normalizeArguments(arguments);
var f=this.create({message:g[0]||"",description:g[1]||null,caption:g[2]||null,icon:g[6]||"sc-icon-alert-48",delegate:g[7]});
var m="buttonOne buttonTwo buttonThree".w(),e,i;for(var l=0;l<3;l++){e=f.get(m[l]);
i=g[l+3];if(i){e.set("title",i).set("isVisible",YES);if(i=="?"){e.set("titleMinWidth",0)
}if(l==2){var o=f.get("buttonThreeWrapper");o.set("isVisible",YES)}}}var j=f.append();
f.adjust("height",f.childViews[0].$().height());f.updateLayout();return j};SC.AlertPane.warn=function(f,e,a,i,g,h,c){var b=this._normalizeArguments(arguments);
b[6]="sc-icon-alert-48";return this.show.apply(this,b)};SC.AlertPane.info=function(f,e,a,i,g,h,c){var b=this._normalizeArguments(arguments);
b[6]="sc-icon-info-48";return this.show.apply(this,b)};SC.AlertPane.error=function(f,e,a,i,g,h,c){var b=this._normalizeArguments(arguments);
b[6]="sc-icon-error-48";return this.show.apply(this,b)};SC.AlertPane.plain=function(f,e,a,i,g,h,c){var b=this._normalizeArguments(arguments);
b[6]="blank";return this.show.apply(this,b)};sc_require("panes/panel");SC.PalettePane=SC.PanelPane.extend({classNames:"sc-palette",isModal:NO,modalPane:SC.ModalPane,isAnchored:NO,_mouseOffsetX:null,_mouseOffsetY:null,mouseDown:function(a){var b=this.get("frame");
this._mouseOffsetX=b?(b.x-a.pageX):0;this._mouseOffsetY=b?(b.y-a.pageY):0;return YES
},mouseDragged:function(a){if(!this.isAnchored){this.set("layout",{width:this.layout.width,height:this.layout.height,left:this._mouseOffsetX+a.pageX,top:this._mouseOffsetY+a.pageY});
this.updateLayout()}return YES}});sc_require("panes/palette");SC.PICKER_MENU="menu";
SC.PICKER_FIXED="fixed";SC.PICKER_POINTER="pointer";SC.POINTER_LAYOUT=["perfectRight","perfectLeft","perfectTop","perfectBottom"];
SC.PickerPane=SC.PalettePane.extend({classNames:"sc-picker",isAnchored:YES,isModal:YES,pointerPos:"perfectRight",pointerPosX:0,pointerPosY:0,anchorElement:null,preferType:null,preferMatrix:null,popup:function(c,b,e){var a=c.isView?c.get("layer"):c;
this.beginPropertyChanges();this.set("anchorElement",a);if(b){this.set("preferType",b)
}if(e){this.set("preferMatrix",e)}this.endPropertyChanges();this.positionPane();this.append()
},positionPane:function(){var b=this.get("anchorElement"),c=this.get("preferType"),e=this.get("preferMatrix"),f=this.get("layout"),a;
if(b){b=this.computeAnchorRect(b);a=SC.cloneRect(b);if(c){switch(c){case SC.PICKER_MENU:case SC.PICKER_FIXED:if(!e||e.length!==3){this.set("preferMatrix",[1,4,3])
}a.x+=((this.preferMatrix[2]===0)?a.width:0)+this.preferMatrix[0];a.y+=((this.preferMatrix[2]===3)?a.height:0)+this.preferMatrix[1];
break;default:a.y+=a.height;break}}else{a.y+=a.height}a=this.fitPositionToScreen(a,this.get("frame"),b);
f={width:a.width,height:a.height,left:a.x,top:a.y}}else{f={width:f.width,height:f.height,centerX:0,centerY:0}
}this.set("layout",f).updateLayout();return this},computeAnchorRect:function(b){var a=SC.viewportOffset(b);
var c=SC.$(b);a.width=c.outerWidth();a.height=c.outerHeight();return a},fitPositionToScreen:function(f,c,b){var a=this.get("currentWindowSize")||SC.RootResponder.responder.computeWindowSize();
var e={x:0,y:0,width:a.width,height:a.height};c.x=f.x;c.y=f.y;if(this.preferType){switch(this.preferType){case SC.PICKER_MENU:c=this.fitPositionToScreenDefault(e,c,b);
c=this.fitPositionToScreenMenu(e,c);break;case SC.PICKER_POINTER:c=this.fitPositionToScreenPointer(e,c,b);
break;case SC.PICKER_FIXED:break;default:break}}else{c=this.fitPositionToScreenDefault(e,c,b)
}this.displayDidChange();return c},fitPositionToScreenDefault:function(c,e,b){if(SC.maxX(e)>c.width){var g=Math.max(SC.maxX(b),e.width);
e.x=Math.min(g,c.width)-e.width}if(SC.minX(e)<0){e.x=SC.minX(Math.max(b,0));if(SC.maxX(e)>c.width){e.x=Math.max(0,c.width-e.width)
}}if(SC.maxY(e)>c.height){g=Math.max((b.y-e.height),0);if(g>c.height){e.y=Math.max(0,c.height-e.height)
}else{e.y=g}}if(SC.minY(e)<0){g=Math.min(SC.maxY(b),(c.height-b.height));e.y=Math.max(g,0)
}return e},fitPositionToScreenMenu:function(a,b){if((b.x+b.width)>(a.width-9)){b.x=a.width-b.width-9
}if(b.x<7){b.x=7}if(b.height>a.height){b.y=15;b.height=a.height-35}return b},fitPositionToScreenPointer:function(s,n,q){var p=(q.height>12)?0:1;
var o=(q.height>12)?0:3;var g=[[q.x+q.width+(7+p),q.y+parseInt(q.height/2,0)-40],[q.x-n.width-(7+p),q.y+parseInt(q.height/2,0)-40],[q.x+parseInt((q.width/2)-(n.width/2),0),q.y-n.height-(17+o)],[q.x+parseInt((q.width/2)-(n.width/2),0),q.y+q.height+(17+o)]];
var e=[[q.x+q.width+n.width+(7+p),q.y+parseInt(q.height/2,0)+n.height-24],[q.x-(7+p),q.y+parseInt(q.height/2,0)+n.height-24],[q.x+parseInt((q.width/2)-(n.width/2),0)+n.width,q.y-(17+o)],[q.x+parseInt((q.width/2)-(n.width/2),0)+n.width,q.y+q.height+n.height+(17+o)]];
var h=[[g[0][1]>0?0:0-g[0][1],e[0][0]<s.width?0:e[0][0]-s.width,e[0][1]<s.height?0:e[0][1]-s.height,g[0][0]>0?0:0-g[0][0]],[g[1][1]>0?0:0-g[1][1],e[1][0]<s.width?0:e[1][0]-s.width,e[1][1]<s.height?0:e[1][1]-s.height,g[1][0]>0?0:0-g[1][0]],[g[2][1]>0?0:0-g[2][1],e[2][0]<s.width?0:e[2][0]-s.width,e[2][1]<s.height?0:e[2][1]-s.height,g[2][0]>0?0:0-g[2][0]],[g[3][1]>0?0:0-g[3][1],e[3][0]<s.width?0:e[3][0]-s.width,e[3][1]<s.height?0:e[3][1]-s.height,g[3][0]>0?0:0-g[3][0]]];
if(!this.preferMatrix||this.preferMatrix.length!==5){this.set("preferMatrix",[0,1,2,3,2])
}var c=this.preferMatrix;if(c[4]===-1){n.x=q.x+parseInt(q.width/2,0);n.y=q.y+parseInt(q.height/2,0)-parseInt(n.height/2,0);
this.set("pointerPos",SC.POINTER_LAYOUT[0]+" fallback");this.set("pointerPosY",parseInt(n.height/2,0)-40)
}else{n.x=g[c[4]][0];n.y=g[c[4]][1];this.set("pointerPos",SC.POINTER_LAYOUT[c[4]]);
this.set("pointerPosY",0)}this.set("pointerPosX",0);for(var j=0,b,l=SC.POINTER_LAYOUT.length;
j<l;j++){b=c[j];if(h[b][0]===0&&h[b][1]===0&&h[b][2]===0&&h[b][3]===0){if(c[4]!==b){n.x=g[b][0];
n.y=g[b][1];this.set("pointerPosY",0);this.set("pointerPos",SC.POINTER_LAYOUT[b])
}j=SC.POINTER_LAYOUT.length}else{if((b===0||b===1)&&h[b][0]===0&&h[b][1]===0&&h[b][2]<n.height-91&&h[b][3]===0){if(c[4]!==b){n.x=g[b][0];
this.set("pointerPos",SC.POINTER_LAYOUT[b])}n.y=g[b][1]-h[b][2];this.set("pointerPosY",h[b][2]);
j=SC.POINTER_LAYOUT.length}else{if((b===0||b===1)&&h[b][0]===0&&h[b][1]===0&&h[b][2]<=n.height-57&&h[b][3]===0){if(c[4]!==b){n.x=g[b][0]
}n.y=g[b][1]-(n.height-57);this.set("pointerPosY",(n.height-59));this.set("pointerPos",SC.POINTER_LAYOUT[b]+" extra-low");
j=SC.POINTER_LAYOUT.length}}}}return n},displayProperties:["pointerPosY"],render:function(b,e){var a=arguments.callee.base.apply(this,arguments);
if(b.needsContent){if(this.get("preferType")==SC.PICKER_POINTER){b.push('<div class="sc-pointer %@" style="margin-top: %@px"></div>'.fmt(this.get("pointerPos"),this.get("pointerPosY")))
}}else{var c=this.$(".sc-pointer");c.attr("class","sc-pointer %@".fmt(this.get("pointerPos")));
c.attr("style","margin-top: %@px".fmt(this.get("pointerPosY")))}return a},modalPaneDidClick:function(a){var b=this.get("frame");
if(!this.clickInside(b,a)){this.remove()}return YES},mouseDown:function(a){return this.modalPaneDidClick(a)
},clickInside:function(b,a){return SC.pointInRect({x:a.pageX,y:a.pageY},b)},windowSizeDidChange:function(b,a){arguments.callee.base.apply(this,arguments);
this.positionPane()}});SC.SeparatorView=SC.View.extend({classNames:["sc-separator-view"],tagName:"span",layoutDirection:SC.LAYOUT_HORIZONTAL,render:function(a,b){if(b){a.push("<span></span>")
}a.addClass(this.get("layoutDirection"))}});sc_require("views/button");sc_require("views/separator");
SC.BENCHMARK_MENU_ITEM_RENDER=YES;SC.MenuItemView=SC.ButtonView.extend(SC.ContentDisplay,{classNames:["sc-menu-item"],tagName:"div",parentPane:null,acceptsFirstResponder:YES,content:null,isSubMenuViewVisible:null,isSeparator:NO,contentValueKey:null,contentIsBranchKey:null,shortCutKey:null,contentIconKey:null,contentCheckboxKey:"checkbox",contentActionKey:null,itemWidth:100,itemHeight:20,subMenu:null,hasMouseExited:NO,anchor:null,displayProperties:["contentValueKey","contentIconKey","shortCutKey","contentIsBranchKey","itemHeight","subMenu","isEnabled","content"],contentDisplayProperties:"title value icon separator action checkbox shortcut branchItem subMenu".w(),render:function(b,a){var h;
if(SC.BENCHMARK_MENU_ITEM_RENDER){h="%@.render".fmt(this);SC.Benchmark.start(h)}var j=this.get("content");
var m=this.displayDelegate;var l,f;var e;var c=this.parentMenu();var i=this.get("itemWidth")||c.layout.width;
var g=this.get("itemHeight")||20;this.set("itemWidth",i);this.set("itemHeight",g);
if(!this.get("isEnabled")){b.addClass("disabled")}e=b.begin("a").attr("href","javascript: ;");
l=this.getDelegateProperty("isSeparatorKey",m);f=(l&&j)?(j.get?j.get(l):j[l]):null;
if(f){e.push("<span class='separator'></span>");b.addClass("disabled")}else{l=this.getDelegateProperty("contentCheckboxKey",m);
if(l){f=j?(j.get?j.get(l):j[l]):NO;if(f){e.begin("div").addClass("checkbox").end()
}}l=this.getDelegateProperty("contentIconKey",m);f=(l&&j)?(j.get?j.get(l):j[l]):null;
if(f&&SC.typeOf(f)!==SC.T_STRING){f=f.toString()}if(f){this.renderImage(e,f);e.addClass("hasIcon")
}l=this.getDelegateProperty("contentValueKey",m);f=(l&&j)?(j.get?j.get(l):j[l]):j;
if(f&&SC.typeOf(f)!==SC.T_STRING){f=f.toString()}this.renderLabel(e,f||"");l=this.getDelegateProperty("contentIsBranchKey",m);
f=(l&&j)?(j.get?j.get(l):j[l]):NO;if(f){this.renderBranch(e,f);e.addClass("has-branch")
}else{l=this.getDelegateProperty("action",m);f=(l&&j)?(j.get?j.get(l):j[l]):null;
if(f&&isNaN(f)){this.set("action",f)}l=this.getDelegateProperty("target",m);f=(l&&j)?(j.get?j.get(l):j[l]):null;
if(f&&isNaN(f)){this.set("target",f)}if(this.getDelegateProperty("shortCutKey",m)){l=this.getDelegateProperty("shortCutKey",m);
f=(l&&j)?(j.get?j.get(l):j[l]):null;if(f){this.renderShortcut(e,f);e.addClass("shortcutkey")
}}}}e.end();if(SC.BENCHMARK_MENU_ITEM_RENDER){SC.Benchmark.end(h)}},renderImage:function(b,e){var a,c;
if(e&&SC.ImageView.valueIsUrl(e)){a=e;c=""}else{c=e;a=SC.BLANK_IMAGE_URL}b.begin("img").addClass("image").addClass(c).attr("src",a).end()
},renderLabel:function(b,a){b.push("<span class='value ellipsis'>"+a+"</span>")},renderBranch:function(f,b){var c=">";
var e=SC.BLANK_IMAGE_URL;f.push('<span class= "hasBranch">'+c+"</span>")},renderShortcut:function(b,a){b.push('<span class = "shortcut">'+a+"</span>")
},getAnchor:function(){var a=this.get("anchor");if(a&&a.kindOf&&a.kindOf(SC.MenuItemView)){return a
}return null},isCurrent:NO,isSeparator:function(){var c=this.get("content");var a=this.displayDelegate;
var b=this.getDelegateProperty("isSeparatorKey",a);var e=(b&&c)?(c.get?c.get(b):c[b]):null;
if(e){return YES}return NO},isSubMenuAMenuPane:function(){var b=this.get("content");
var a=b.get("subMenu");if(a&&a.kindOf(SC.MenuPane)){return a}return NO},branching:function(){if(this.get("hasMouseExited")){this.set("hasMouseExited",NO);
return}this.createSubMenu()},loseFocus:function(){if(!this.isSubMenuAMenuPane()){this.set("hasMouseExited",YES);
this.$().removeClass("focus")}},createSubMenu:function(){var a=this.isSubMenuAMenuPane();
if(a){a.set("anchor",this);a.popup(this,[0,0,0]);var b=SC.RenderContext(this);b=b.begin(a.get("tagName"));
a.prepareContext(b,YES);b=b.end();var c=a.get("menuItemViews");if(c&&c.length>0){a.becomeKeyPane()
}}},parentMenu:function(){return this.get("parentPane")},isAnchorMouseDown:NO,mouseUp:function(a){var c=this.parentMenu();
if(c){var g=c.get("currentSelectedMenuItem");if(g&&(this!==g)){return g.tryToPerform("mouseUp",a)
}}if(!this.get("isEnabled")){this.set("hasMouseExited",NO);return YES}this.set("hasMouseExited",NO);
var e=this.get("contentCheckboxKey");var f=this.get("content");if(e){if(f&&f.get(e)){f.set(e,NO)
}else{if(f.get(e)!==undefined){f.set(e,YES)}}this.displayDidChange()}this._action(a);
var b=this.getAnchor();if(b){b.mouseUp(a)}else{this.resignFirstResponder()}this.closeParent();
return YES},mouseDown:function(a){return YES},mouseEntered:function(a){var b=this.parentMenu();
this.set("hasMouseExited",NO);if(b){b.becomeKeyPane();if(b.get("anchor")._isMouseDown){var f=b.getPath("anchor._isMouseDown");
this.set("isAnchorMouseDown",f);if(this.get("isAnchorMouseDown")){SC.Event.trigger(this.get("layer"),"mousedown")
}}}if(!this.get("isEnabled")&&!this.isSeparator()){if(b){b.set("currentSelectedMenuItem",null)
}return YES}var c=this.get("contentIsBranchKey");if(c){var e=this.get("content");
var g=(c&&e)?(e.get?e.get(c):e[c]):NO;if(g){this.invokeLater(this.branching(),100)
}}this.becomeFirstResponder();return YES},mouseExited:function(a){this.loseFocus();
var b=this.parentMenu();if(b){b.set("previousSelectedMenuItem",this)}return YES},moveUp:function(b,a){var c=this.parentMenu();
if(c){c.moveUp(this)}return YES},moveDown:function(b,a){var c=this.parentMenu();if(c){c.moveDown(this)
}return YES},moveRight:function(b,a){this.createSubMenu();return YES},keyDown:function(a){return this.interpretKeyEvents(a)
},keyUp:function(a){return YES},cancel:function(a){this.loseFocus();var b=this.parentMenu();
if(b){b.remove()}var c=b.getPath("anchor.pane");if(c){c.becomeKeyPane()}return YES
},didBecomeFirstResponder:function(a){if(a!==this){return}if(!this.isSeparator()){this.$().addClass("focus")
}var b=this.parentMenu();if(b){b.set("currentSelectedMenuItem",this)}},willLoseFirstResponder:function(a){if(a!==this){return
}this.$().removeClass("focus");var b=this.parentMenu();if(b){b.set("currentSelectedMenuItem",null);
b.set("previousSelectedMenuItem",this)}},insertNewline:function(b,a){this.mouseUp(a)
},closeParent:function(){this.$().removeClass("focus");var a=this.parentMenu();if(a){a.remove()
}},clickInside:function(b,a){return SC.pointInRect({x:a.pageX,y:a.pageY},b)}});require("panes/picker");
require("views/menu_item");SC.BENCHMARK_MENU_PANE_RENDER=YES;SC.MenuPane=SC.PickerPane.extend({menuItemKeys:"itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemSeparatorKey itemActionKey itemCheckboxKey itemShortCutKey itemBranchKey itemHeightKey subMenuKey itemKeyEquivalentKey itemTargetKey".w(),classNames:["sc-menu"],tagName:"div",isModal:YES,itemIsEnabledKey:"isEnabled",itemTitleKey:"title",items:[],itemValueKey:"value",itemIconKey:"icon",itemWidth:null,itemHeight:20,menuHeight:null,itemHeightKey:"height",subMenuKey:"subMenu",localize:YES,itemSeparatorKey:"separator",itemActionKey:"action",itemCheckboxKey:"checkbox",itemBranchKey:"branchItem",itemShortCutKey:"shortcut",itemKeyEquivalentKey:"keyEquivalent",itemTargetKey:"target",preferType:SC.PICKER_MENU,currentSelectedMenuItem:null,previousSelectedMenuItem:null,anchor:null,displayItemsArray:null,menuItemViews:[],exampleView:SC.MenuItemView,controlSize:SC.REGULAR_CONTROL_SIZE,menuHeightPadding:0,createChildViews:function(){var f=[],a,c,b,e;
a=SC.MenuScrollView;b=this.get("menuItemViews");e=SC.View.design({layout:{top:0,left:0,minHeight:this.get("menuHeight")},classNames:"menuContainer",childViews:b});
this.set("itemWidth",this.get("layout").width||100);a=this.createChildView(a,{borderStyle:SC.BORDER_NONE,contentView:e});
this.childViews=[a]},popup:function(b,e){var a=b.isView?b.get("layer"):b;this.beginPropertyChanges();
var c=this.get("displayItems");this.set("anchorElement",a);this.set("anchor",b);this.set("preferType",SC.PICKER_MENU);
if(e){this.set("preferMatrix",e)}this.endPropertyChanges();this.positionPane();this.append()
},displayItems:function(){var h=this.get("items"),e=this.get("localize"),n=null,f,l,g=[],o,i=h.get("length"),j,m,c=SC._menu_fetchKeys,b=SC._menu_fetchItem,a=this.get("menuHeightPadding");
for(j=0;j<i;++j){m=h.objectAt(j);if(SC.none(m)){continue}f=SC.typeOf(m);o=g.length;
if(f===SC.T_STRING){g[o]=SC.Object.create({title:m.humanize().titleize(),value:m,isEnabled:YES,icon:null,isSeparator:null,action:null,isCheckbox:NO,menuItemNumber:j,isShortCut:NO,isBranch:NO,itemHeight:this.get("itemHeight"),subMenu:null,keyEquivalent:null,target:null});
a=a+this.get("itemHeight")}else{if(f!==SC.T_ARRAY){if(n===null){n=this.menuItemKeys.map(c,this)
}l=n.map(b,m);l[l.length]=j;if(!n[0]&&m.toString){l[0]=m.toString()}if(!n[1]){l[1]=m
}if(!n[2]){l[2]=YES}if(!l[9]){l[9]=this.get("itemHeight")}if(l[4]){l[9]=9}a=a+l[9];
if(e&&l[0]){l[0]=l[0].loc()}g[o]=SC.Object.create({title:l[0],value:l[1],isEnabled:l[2],icon:l[3],isSeparator:l[4]||NO,action:l[5],isCheckbox:l[6],isShortCut:l[7],menuItemNumber:j,isBranch:l[8],itemHeight:l[9],subMenu:l[10],keyEquivalent:l[11],target:l[12]})
}}}this.set("menuHeight",a);this.set("displayItemsArray",g);this.generateMenuItems(g);
return g}.property("items").cacheable(),itemsDidChange:function(){if(this._items){this._items.removeObserver("[]",this,this.itemContentDidChange)
}this._items=this.get("items");if(this._items){this._items.addObserver("[]",this,this.itemContentDidChange)
}this.itemContentDidChange()}.observes("items"),itemContentDidChange:function(){this.notifyPropertyChange("displayItems")
},displayProperties:["displayItems","value","controlSize"],render:function(a,c){if(SC.BENCHMARK_MENU_PANE_RENDER){var b="%@.render".fmt(this);
SC.Benchmark.start(b)}arguments.callee.base.apply(this,arguments);if(c){if(!this.get("isEnabled")){return
}a.addStyle("text-align","center")}if(SC.BENCHMARK_MENU_PANE_RENDER){SC.Benchmark.end(b)
}},menuHeightObserver:function(){var a=this.layout.height;var b=this.get("menuHeight");
if(a!==b){this.adjust("height",b).updateLayout()}}.observes("menuHeight"),generateMenuItems:function(i){if(!this.get("isEnabled")){return
}var n,j,m,h,a,f,g=[],c,e,l;c=i.length;e=SC.makeArray(i);for(l=0;l<c;++l){n=i[l];
j=n.get("action");m=n.get("menuItemNumber");a=n.get("itemHeight");f=this.get("itemWidth");
h=this.createChildView(this.exampleView,{owner:h,displayDelegate:h,parentPane:this,anchor:this.get("anchor"),isVisible:YES,contentValueKey:"title",contentIconKey:"icon",contentCheckboxKey:this.itemCheckboxKey,contentIsBranchKey:"branchItem",isSeparatorKey:"separator",shortCutKey:"shortCut",action:j,target:n.get("target"),layout:{top:0,left:0,width:f,height:a},isEnabled:n.get("isEnabled"),itemHeight:a,itemWidth:f,keyEquivalent:n.get("keyEquivalent"),controlSize:this.get("controlSize"),content:SC.Object.create({title:n.get("title"),value:n.get("value"),icon:n.get("icon"),separator:n.get("isSeparator"),action:j,checkbox:n.get("isCheckbox"),shortCut:n.get("isShortCut"),branchItem:n.get("isBranch"),subMenu:n.get("subMenu")}),rootElementPath:[m]});
g.push(h)}var b=this.childViews[0].contentView;b.replaceAllChildren(g);b.adjust("minHeight",this.get("menuHeight"));
this.set("menuItemViews",g)},previousSelectedMenuItemObserver:function(){var b=this.get("previousSelectedMenuItem");
if(b){var a=b.isSubMenuAMenuPane();if(a){a.remove()}}}.observes("previousSelectedMenuItem"),isAnchorMenuItemType:function(){var a=this.get("anchor");
return(a&&a.kindOf&&a.kindOf(SC.MenuItemView))},performKeyEquivalent:function(i,n){var j,g,a,o,f,e,m,h,l;
if(!this.get("isEnabled")){return NO}this.displayItems();SC.RunLoop.begin().end();
j=this.get("displayItemsArray");if(!j){return NO}if(i==="escape"){this.remove();var c=this.getPath("anchor.pane");
if(c){c.becomeKeyPane()}}g=j.length;for(l=0;l<g;++l){o=j[l];f=o.get("keyEquivalent");
e=o.get("action");m=o.get("isEnabled");h=o.get("target")||this;if(f==i&&m){var b=SC.RootResponder.responder.sendAction(e,h);
this.remove();return b}}return NO},mouseDown:function(a){return YES},mouseUp:function(a){this.remove();
var b=this.get("anchor");if(this.isAnchorMenuItemType()){this.sendEvent("mouseUp",a,b)
}return YES},moveDown:function(b){var a=this.getNextEnabledMenuItem(b);if(b){b.resignFirstResponder()
}a.becomeFirstResponder()},moveUp:function(b){var a=this.getPreviousEnabledMenuItem(b);
if(b){b.resignFirstResponder()}a.becomeFirstResponder();return YES},getPreviousEnabledMenuItem:function(a){var e,g,c,i,j,h,b,f=this.get("menuItemViews");
if(f){c=f.length;i=(f.indexOf(a)===-1)?c:f.indexOf(a);j=i;h=NO;b=NO;while((!h||b)&&--i!==j){if(i===-1){i=c-1
}g=f[i];h=g.get("isEnabled");e=g.get("content");if(e){b=e.get(g.get("isSeparatorKey"))
}}return f[i]}},getNextEnabledMenuItem:function(a){var e,g,f=this.get("menuItemViews");
if(f){var c=f.length;var i=(f.indexOf(a)===-1)?0:f.indexOf(a);var j=i,h=NO,b=NO;while((!h||b)&&++i!==j){if(i===c){i=0
}g=f[i];h=g.get("isEnabled");e=g.get("content");if(e){b=e.get(g.get("isSeparatorKey"))
}}return f[i]}},modalPaneDidClick:function(b){var e,c,a,g=this.get("frame");a=this.get("currentSelectedMenuItem");
if(a){c=a.getAnchor();if(c){e=c.parentMenu();if(e.kindOf(SC.MenuPane)){e.modalPaneDidClick(b)
}}}if(!this.clickInside(g,b)){this.remove()}return YES},getMenuItem:function(b,c){var f,e,a;
f=this.get("displayItemsArray");e=this.get("menuItemViews");if(f&&e){a=f.get(b).indexOf(c);
if(a!==-1){return e[a]}else{return null}}else{return null}}});SC._menu_fetchKeys=function(a){return this.get(a)
};SC._menu_fetchItem=function(a){if(!a){return null}return this.get?this.get(a):this[a]
};sc_require("views/button");SC.SelectButtonView=SC.ButtonView.extend({objects:[],objectsBindingDefault:SC.Binding.multiple(),nameKey:null,sortKey:null,valueKey:null,iconKey:null,localize:YES,disableSort:YES,classNames:["select-button"],itemList:[],currentSelItem:null,itemIdx:null,value:null,checkboxEnabled:YES,separatorPostion:null,_defaultVal:null,_defaultTitle:null,_defaultIcon:null,theme:"popup",displayProperties:["icon","value","controlSize","objects"],preferMatrix:null,SELECT_BUTTON_SPRITE_WIDTH:28,CUSTOM_MENU_ITEM_HEIGHT:20,isSelectedBinding:"*menu.isVisibleInWindow",isDefaultPosition:NO,lastMenuWidth:null,customView:null,customViewClassName:null,customViewMenuOffsetWidth:0,needsEllipsis:YES,menuPaneHeightPadding:0,leftAlign:function(){var b=0,a=this.get("controlSize");
if(a===SC.SMALL_CONTROL_SIZE){b=-14}if(a===SC.REGULAR_CONTROL_SIZE){b=-16}return b
}.property("controlSize"),sortObjects:function(b){if(!this.get("disableSort")){var a=this.get("sortKey")||this.get("nameKey");
b=b.sort(function(e,c){if(a){e=e.get?e.get(a):e[a];c=c.get?c.get(a):c[a]}return(e<c)?-1:((e>c)?1:0)
})}return b},render:function(b,f){arguments.callee.base.apply(this,arguments);var c,a,n,q,u,g,t,h,l,o,j,e,i,v,p,m,s;
c=this.layout.width;if(f&&c){this.adjust({width:c-this.SELECT_BUTTON_SPRITE_WIDTH})
}a=this.get("objects");a=this.sortObjects(a);n=a.length;q=this.get("nameKey");u=this.get("iconKey");
g=this.get("valueKey");t=this.get("checkboxEnabled");h=this.get("value");l=this.get("localize");
o=this.get("separatorPostion");j=[];e=YES;i=0;a.forEach(function(w){if(w){v=q?(w.get?w.get(q):w[q]):w.toString();
v=l?v.loc():v;p=u?(w.get?w.get(u):w[u]):null;if(SC.none(w[u])){p=null}m=(g)?(w.get?w.get(g):w[g]):w;
if(!SC.none(h)&&!SC.none(m)){if(h===m){this.set("title",v);this.set("icon",p)}}if(m===this.get("value")){this.set("itemIdx",i);
e=!t?NO:YES}else{e=NO}if(i===0){this._defaultVal=m;this._defaultTitle=v;this._defaultIcon=p
}var x=SC.Object.create({title:v,icon:p,value:m,isEnabled:YES,checkbox:e,action:this.displaySelectedItem});
j.push(x)}i+=1;if(o&&i===(n-o)){var y=SC.Object.create({separator:YES});j.push(y)
}this.set("itemList",j)},this);if(f){this.invokeLast(function(){var w=this.get("value");
if(SC.none(w)){this.set("value",this._defaultVal);this.set("title",this._defaultTitle);
this.set("icon",this._defaultIcon)}})}this.changeSelectButtonPreferMatrix(this.itemIdx)
},_action:function(n){var i,a,j,l,t,p,A,f,z,c,o,v,q,x,g,h,m,b,y;i=this.$(".sc-button-label")[0];
a=this.get("layer").offsetWidth;j=i.scrollWidth;l=this.get("lastMenuWidth");if(j){t=i.offsetWidth;
if(j&&t){a=a+j-t}}if(!l||(a>l)){l=a}p=this.get("itemList");var u=this.get("customViewClassName");
var s=this.get("customViewMenuOffsetWidth");var e="sc-view sc-pane sc-panel sc-palette sc-picker sc-menu select-button sc-scroll-view sc-menu-scroll-view sc-container-view menuContainer sc-button-view sc-menu-item sc-regular-size";
e=u?(e+" "+u):e;for(o=0,y=p.length;o<y;++o){z=p.objectAt(o);c=document.createElement("div");
c.style.cssText="top:-10000px; left: -10000px;  position: absolute;";c.className=e;
c.innerHTML=z.title;document.body.appendChild(c);A=c.offsetWidth+s;if(!f||(A>f)){f=A
}document.body.removeChild(c)}l=(f>l)?f:l;var w=SC.RootResponder.responder.get("currentWindowSize").width;
if(l>w){l=(w-25)}this.set("lastMenuWidth",l);v=this.get("currentSelItem");q=this.get("itemList");
x=this.get("controlSize");g=this.get("menuPaneHeightPadding");h=this.get("customView");
m=h?h:SC.MenuItemView;b=SC.MenuPane.create({classNames:["select-button"],items:q,exampleView:m,isEnabled:YES,menuHeightPadding:g,preferType:SC.PICKER_MENU,itemHeightKey:"height",layout:{width:l},controlSize:x,itemWidth:l,contentView:SC.View.extend({})});
if(!b){return NO}b.popup(this,this.preferMatrix);b.set("currentSelectedMenuItem",v);
return YES},displaySelectedItem:function(){var l,b,g,j,c,a=0,h,f,i,m=null,e;l=this.parentMenu();
b=l.get("currentSelectedMenuItem");g=l.menuItemViews;if(b&&g){a=g.indexOf(b)}h=l.get("anchor");
f=l.get("items");i=f.length;while(!m&&(--i>=0)){e=f[i];j=!SC.none(e.title)?e.title:f.toString();
c=!SC.none(e.value)?e.value:j;if(j===this.get("value")&&(a===i)){m=f;h.set("value",c);
h.set("title",j)}}h.set("icon",this.get("icon")).set("currentSelItem",b).set("itemIdx",a)
},changeSelectButtonPreferMatrix:function(){var e=0,b=this.get("itemIdx"),a=this.get("leftAlign"),f,c;
if(this.get("isDefaultPosition")){f=[a,4,3];this.set("preferMatrix",f)}else{if(b){e=b*this.CUSTOM_MENU_ITEM_HEIGHT
}c=[a,-e,2];this.set("preferMatrix",c)}},mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;this.becomeFirstResponder();this._action();
return YES},keyDown:function(a){if(this.interpretKeyEvents(a)){return YES}else{arguments.callee.base.apply(this,arguments)
}},interpretKeyEvents:function(a){if(a){if((a.keyCode===38||a.keyCode===40)){this._action()
}else{if(a.keyCode===27){this.resignFirstResponder()}}}return arguments.callee.base.apply(this,arguments)
}});sc_require("panes/panel");SC.SheetPane=SC.PanelPane.extend({classNames:"sc-sheet",transitionDuration:200,NO_VIEW:"NO_VIEW",ANIMATING:"ANIMATING",READY:"READY",SLIDE_DOWN:"SLIDEDOWN",SLIDE_UP:"SLIDEUP",_state:"NO_VIEW",append:function(){var a=this.get("layout");
if(!a.height||!a.top){a=SC.View.convertLayoutToAnchoredLayout(a,this.computeParentDimensions())
}a.top=-1*a.height;this.adjust(a);return arguments.callee.base.apply(this,arguments)
},remove:function(){var b=this,a=arguments;this.invokeLater(function(){a.callee.base.apply(b,a)
},this.transitionDuration);this.slideUp();return this},paneDidAttach:function(){var a=arguments.callee.base.apply(this,arguments);
this.slideDown();return a},slideDown:function(){this._start=Date.now();this._end=this._start+this.get("transitionDuration");
this._state=this.ANIMATING;this._direction=this.SLIDE_DOWN;this.tick()},slideUp:function(){this._start=Date.now();
this._end=this._start+this.get("transitionDuration");this._state=this.ANIMATING;this._direction=this.SLIDE_UP;
this.tick()},blurTo:function(a){this.setFirstResponder("")},tick:function(){this._timer=null;
var b=Date.now();var h=this;var f=(b-this._start)/(this._end-this._start);var a=this._direction,c=this.get("layout"),e,g;
if(f<0){f=0}if(f>=1){if(a===this.SLIDE_DOWN){h.adjust("top",0)}else{h.adjust("top",-1*c.height)
}this._state=SC.SheetPane.READY;this.updateLayout();return this}g=Math.floor(c.height*f);
if(a==this.SLIDE_DOWN){h.adjust("top",0-(c.height-g))}else{if(a==this.SLIDE_UP){h.adjust("top",0-g)
}}this._timer=this.invokeLater(this.tick,20);h.updateLayout();return this}});SC.DRAG_LINK=4;
SC.DRAG_COPY=1;SC.DRAG_MOVE=2;SC.DRAG_NONE=0;SC.DRAG_ANY=7;SC.DRAG_AUTOSCROLL_ZONE_THICKNESS=20;
SC.Drag=SC.Object.extend({source:null,ghostView:null,ghostActsLikeCursor:NO,dragView:null,ghost:YES,slideBack:YES,mouseDownEvent:null,ghostOffset:{x:0,y:0},location:{},dataTypes:function(){if(this.dataSource){return this.dataSource.get("dragDataTypes")||[]
}var e=this.data;if(e){var a=[];for(var b in e){if(e.hasOwnProperty(b)){a.push(b)
}}return a}var c=this.get("source");if(c&&c.dragDataTypes){return c.get("dragDataTypes")||[]
}return[]}.property().cacheable(),hasDataType:function(a){return(this.get("dataTypes").indexOf(a)>=0)
},dataForType:function(a){if(this.dataSource){return this.dataSource.dragDataForType(this,a)
}else{if(this.data){return this.data[a]}else{var b=this.get("source");if(b&&SC.typeOf(b.dragDataForType)==SC.T_FUNCTION){return b.dragDataForType(this,a)
}else{return null}}}},dataSource:null,data:null,allowedDragOperations:SC.DRAG_ANY,_dragInProgress:YES,startDrag:function(){this._createGhostView();
var p=this.event;var i={x:p.pageX,y:p.pageY};this.set("location",i);var b=this.dragView;
var e=b.get("pane");var q=b.get("parentView");var m=b.get("clippingFrame");var j=q?q.convertFrameToView(b.get("frame"),null):b.get("frame");
var l=e?e.get("frame"):{x:0,y:0};b.adjust({top:j.y+l.y,left:j.x+l.x,width:j.width,height:j.height});
var g=b.get("frame");var o=j;if(this.ghostActsLikeCursor){this.ghostOffset={x:14,y:14}
}else{this.ghostOffset={x:(i.x-o.x),y:(i.y-o.y)}}if(!this._ghostViewHidden){this._positionGhostView(p)
}this.ghostView.rootResponder.dragDidStart(this);var a=this.source;if(a&&a.dragDidBegin){a.dragDidBegin(this,i)
}var c=this._dropTargets();for(var n=0,h=c.length;n<h;n++){c[n].tryToPerform("dragStarted",this,p)
}},mouseDragged:function(a){var b=this._autoscroll(a);var g=this.get("location");
if(!b&&(a.pageX===g.x)&&(a.pageY===g.y)){return}g={x:a.pageX,y:a.pageY};this.set("location",g);
var e=this.source;var c=this._lastTarget;var f=this._findDropTarget(a);var h=SC.DRAG_NONE;
while(f&&(f!==c)&&(h===SC.DRAG_NONE)){if(f&&e&&e.dragSourceOperationMaskFor){h=e.dragSourceOperationMaskFor(this,f)
}else{h=SC.DRAG_ANY}if((h!==SC.DRAG_NONE)&&f&&f.computeDragOperations){h=h&f.computeDragOperations(this,a,h)
}else{h=SC.DRAG_NONE}this.allowedDragOperations=h;if(h===SC.DRAG_NONE){f=this._findNextDropTarget(f)
}}if(f!==c){if(c&&c.dragExited){c.dragExited(this,a)}if(f){if(f.dragEntered){f.dragEntered(this,a)
}if(f.dragUpdated){f.dragUpdated(this,a)}}this._lastTarget=f}else{if(f&&f.dragUpdated){f.dragUpdated(this,a)
}}if(e&&e.dragDidMove){e.dragDidMove(this,g)}if(!this._ghostViewHidden){this._positionGhostView(a)
}},mouseUp:function(n){var h={x:n.pageX,y:n.pageY},i=this._lastTarget,f=this.allowedDragOperations;
this.set("location",h);try{if(i&&i.acceptDragOperation&&i.acceptDragOperation(this,f)){f=i.performDragOperation?i.performDragOperation(this,f):SC.DRAG_NONE
}else{f=SC.DRAG_NONE}}catch(j){console.error("Exception in SC.Drag.mouseUp(acceptDragOperation|performDragOperation): %@".fmt(j))
}try{if(i&&i.dragExited){i.dragExited(this,n)}}catch(l){console.error("Exception in SC.Drag.mouseUp(target.dragExited): %@".fmt(l))
}var c=this._dropTargets();for(var m=0,g=c.length;m<g;m++){try{c[m].tryToPerform("dragEnded",this,n)
}catch(b){console.error("Exception in SC.Drag.mouseUp(dragEnded on %@): %@".fmt(c[m],b))
}}this._destroyGhostView();var a=this.source;if(a&&a.dragDidEnd){a.dragDidEnd(this,h,f)
}this._lastTarget=null;this._dragInProgress=NO},_createGhostView:function(){var b=this,c=this.dragView.get("frame"),a;
a=this.ghostView=SC.Pane.create({classNames:["sc-ghost-view"],layout:{top:c.y,left:c.x,width:c.width,height:c.height},owner:this,didCreateLayer:function(){if(b.dragView){var e=b.dragView.get("layer");
if(e){this.get("layer").appendChild(e.cloneNode(true))}}}});a.append()},_positionGhostView:function(a){var c=this.get("location");
c.x-=this.ghostOffset.x;c.y-=this.ghostOffset.y;var b=this.ghostView;if(b){b.adjust({top:c.y,left:c.x});
b.invokeOnce("updateLayout")}},_ghostViewHidden:NO,hideGhostView:function(){if(this.ghostView&&!this._ghostViewHidden){this.ghostView.remove();
this._ghostViewHidden=YES}},unhideGhostView:function(){if(this._ghostViewHidden){this._ghostViewHidden=NO;
this._createGhostView()}},_destroyGhostView:function(){if(this.ghostView){this.ghostView.remove();
this.ghostView=null;this._ghostViewHidden=NO}},_dropTargets:function(){if(this._cachedDropTargets){return this._cachedDropTargets
}var b=[];var e=SC.Drag._dropTargets;for(var c in e){if(e.hasOwnProperty(c)){b.push(e[c])
}}var g={};var f=SC.Drag._dropTargets;var a=function(h){if(!h){return 0}var j=SC.guidFor(h);
var i=g[j];if(!i){i=1;while(h=h.get("parentView")){if(f[SC.guidFor(h)]!==undefined){i++
}}g[j]=i}return i};b.sort(function(i,h){if(i===h){return 0}i=a(i);h=a(h);return(i>h)?-1:1
});this._cachedDropTargets=b;return b},_findDropTarget:function(c){var h={x:c.pageX,y:c.pageY};
var f,g;var e=this._dropTargets();for(var b=0,a=e.length;b<a;b++){f=e[b];if(!f.get("isVisibleInWindow")){continue
}g=f.convertFrameToView(f.get("clippingFrame"),null);if(SC.pointInRect(h,g)){return f
}}return null},_findNextDropTarget:function(a){var b=SC.Drag._dropTargets;while(a=a.get("parentView")){if(b[SC.guidFor(a)]){return a
}}return null},_autoscroll:function(n){if(!n){n=this._lastAutoscrollEvent}if(!this._dragInProgress){return NO
}var h=n?{x:n.pageX,y:n.pageY}:this.get("location"),i=this._findScrollableView(h),o=null,m,c,e,j,b,a,g;
while(i&&!o){m=i.get("canScrollVertical")?1:0;c=i.get("canScrollHorizontal")?1:0;
if(m||c){a=i.get("containerView");if(a){g=i.convertFrameToView(a.get("frame"),null)
}else{m=c=0}}if(m){j=SC.maxY(g);e=j-SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(h.y>=e&&h.y<=j){m=1
}else{e=SC.minY(g);j=e+SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(h.y>=e&&h.y<=j){m=-1}else{m=0
}}}if(c){j=SC.maxX(g);e=j-SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(h.x>=e&&h.x<=j){c=1
}else{e=SC.minX(g);j=e+SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(h.x>=e&&h.x<=j){c=-1}else{c=0
}}}if(m||c){o=i}else{i=this._findNextScrollableView(i)}}if(o&&(this._lastScrollableView===o)){if((Date.now()-this._hotzoneStartTime)>100){this._horizontalScrollAmount*=1.05;
this._verticalScrollAmount*=1.05}}else{this._lastScrollableView=o;this._horizontalScrollAmount=15;
this._verticalScrollAmount=15;this._hotzoneStartTime=(o)?Date.now():null;c=m=0}if(o&&(c||m)){var l={x:c*this._horizontalScrollAmount,y:m*this._verticalScrollAmount};
o.scrollBy(l)}if(o){if(n){this._lastAutoscrollEvent={pageX:n.pageX,pageY:n.pageY}
}this.invokeLater(this._autoscroll,100,null);return YES}else{this._lastAutoscrollEvent=null;
return NO}},_scrollableViews:function(){if(this._cachedScrollableView){return this._cachedScrollableView
}var a=[];var c=SC.Drag._scrollableViews;for(var b in c){if(c.hasOwnProperty(b)){a.push(c[b])
}}a=a.sort(function(g,e){var f=g;while(f=f.get("parentView")){if(e==f){return -1}}return 1
});this._cachedScrollableView=a;return a},_findScrollableView:function(g){var c=this._scrollableViews(),b=c?c.length:0,e,f,a;
for(a=0;a<b;a++){e=c[a];if(!e.get("isVisibleInWindow")){continue}f=e.convertFrameToView(e.get("clippingFrame"),null);
if(SC.pointInRect(g,f)){return e}}return null},_findNextScrollableView:function(a){var b=SC.Drag._scrollableViews;
while(a=a.get("parentView")){if(b[SC.guidFor(a)]){return a}}return null}});SC.Drag.mixin({start:function(b){var a=this.create(b);
a.startDrag();return a},_dropTargets:{},_scrollableViews:{},addDropTarget:function(a){this._dropTargets[SC.guidFor(a)]=a
},removeDropTarget:function(a){delete this._dropTargets[SC.guidFor(a)]},addScrollableView:function(a){this._scrollableViews[SC.guidFor(a)]=a
},removeScrollableView:function(a){delete this._scrollableViews[SC.guidFor(a)]}});
SC.MODIFIED_KEY_BINDINGS={"ctrl_.":"cancel",shift_tab:"insertBacktab",shift_left:"moveLeftAndModifySelection",shift_right:"moveRightAndModifySelection",shift_up:"moveUpAndModifySelection",shift_down:"moveDownAndModifySelection",alt_left:"moveLeftAndModifySelection",alt_right:"moveRightAndModifySelection",alt_up:"moveUpAndModifySelection",alt_down:"moveDownAndModifySelection",ctrl_a:"selectAll"};
SC.BASE_KEY_BINDINGS={escape:"cancel",backspace:"deleteBackward","delete":"deleteForward","return":"insertNewline",tab:"insertTab",left:"moveLeft",right:"moveRight",up:"moveUp",down:"moveDown",home:"moveToBeginningOfDocument",end:"moveToEndOfDocument",pagedown:"pageDown",pageup:"pageUp"};
SC.CAPTURE_BACKSPACE_KEY=NO;SC.PANEL_ORDER_LAYER=4096;SC.PALETTE_ORDER_LAYER=8192;
SC.POPUP_ORDER_LAYER=12288;SC.RootResponder=SC.RootResponder.extend({platform:"desktop",focusedPane:function(){var a=this.get("orderedPanes");
return a[a.length-1]}.property("orderedPanes"),orderedPanes:null,orderBefore:function(c,h){var a=this.get("focusedPane"),i=this.get("orderedPanes").without(c),g,j,e,f;
var b=c.get("orderLayer");if(h){g=i.length;j=i.indexOf(h);e=h.get("orderLayer");if(e<b){while((h.get("orderLayer")<b)&&(++j<g)){h=i[j]
}if(j>=g){h=null}}else{if(e>b){while((h.get("orderLayer")>b)&&(--j>=0)){h=i[j]}h=(j<0)?i[0]:i[j+1]
}}}else{j=i.length;while((--j>=0)&&!h){h=i[j];if(h.get("orderLayer")>b){h=null}}if(j<0){h=i[0]
}else{h=i[j+1]}}if(h){j=i.indexOf(h);i.insertAt(j,c)}else{i.push(c)}this.set("orderedPanes",i);
f=this.get("focusedPane");if(f!==a){if(a){a.blurTo(f)}if(f){f.focusFrom(a)}}return this
},orderOut:function(f){var e=this.get("focusedPane"),c=this.get("keyPane");var b=this.get("orderedPanes").without(f);
this.set("orderedPanes",b);if(e===f){var a=this.get("focusedPane");if(e){e.blurTo(a)
}if(a){a.focusFrom(e)}if(c===f){this.makeKeyPane(a)}}else{if(c===f){this.makeKeyPane(null)
}}return this},init:function(){arguments.callee.base.apply(this,arguments);this.orderedPanes=[]
},setup:function(){this.listenFor("keydown keyup mousedown mouseup click dblclick mouseout mouseover mousemove selectstart".w(),document).listenFor("resize focus blur".w(),window);
if(this.keypress){if(SC.CAPTURE_BACKSPACE_KEY&&SC.browser.mozilla){var b=this;document.onkeypress=function(c){c=SC.Event.normalizeEvent(c);
return b.keypress.call(b,c)};SC.Event.add(window,"unload",this,function(){document.onkeypress=null
})}else{SC.Event.add(document,"keypress",this,this.keypress)}}"drag selectstart".w().forEach(function(e){var f=this[e];
if(f){if(SC.browser.msie){var c=this;document.body["on"+e]=function(g){return f.call(c,SC.Event.normalizeEvent(event||window.event))
};SC.Event.add(window,"unload",this,function(){document.body["on"+e]=null})}else{SC.Event.add(document,e,this,f)
}}},this);var a=SC.browser.mozilla?"DOMMouseScroll":"mousewheel";SC.Event.add(document,a,this,this.mousewheel);
this.set("currentWindowSize",this.computeWindowSize());this.focus()},attemptKeyEquivalent:function(b){var f=null;
var e=b.commandCodes()[0];if(!e){return NO}var a=this.get("keyPane"),g=this.get("mainPane"),c=this.get("mainMenu");
if(a){f=a.performKeyEquivalent(e,b);if(f||a.get("isModal")){return f}}if(!f&&g&&(g!==a)){f=g.performKeyEquivalent(e,b);
if(f||g.get("isModal")){return f}}if(!f&&c){f=c.performKeyEquivalent(e,b)}return f
},currentWindowSize:null,computeWindowSize:function(){var a;if(window.innerHeight){a={width:window.innerWidth,height:window.innerHeight}
}else{if(document.documentElement&&document.documentElement.clientHeight){a={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}
}else{if(document.body){a={width:document.body.clientWidth,height:document.body.clientHeight}
}}}return a},resize:function(){this._resize();return YES},_resize:function(){var a=this.computeWindowSize(),b=this.get("currentWindowSize");
this.set("currentWindowSize",a);if(!SC.rectsEqual(a,b)){if(this.panes){SC.RunLoop.begin();
this.panes.invoke("windowSizeDidChange",b,a);SC.RunLoop.end()}}},hasFocus:NO,focus:function(){if(!this.get("hasFocus")){SC.$("body").addClass("sc-focus").removeClass("sc-blur");
SC.RunLoop.begin();this.set("hasFocus",YES);SC.RunLoop.end()}return YES},blur:function(){if(this.get("hasFocus")){SC.$("body").addClass("sc-blur").removeClass("sc-focus");
SC.RunLoop.begin();this.set("hasFocus",NO);SC.RunLoop.end()}return YES},dragDidStart:function(a){this._mouseDownView=a;
this._drag=a},_lastModifiers:null,_handleModifierChanges:function(b){var a;a=this._lastModifiers=(this._lastModifiers||{alt:false,ctrl:false,shift:false});
var c=false;if(b.altKey!==a.alt){a.alt=b.altKey;c=true}if(b.ctrlKey!==a.ctrl){a.ctrl=b.ctrlKey;
c=true}if(b.shiftKey!==a.shift){a.shift=b.shiftKey;c=true}b.modifiers=a;return(c)?(this.sendEvent("flagsChanged",b)?b.hasCustomEventHandling:YES):YES
},_isFunctionOrNonPrintableKey:function(a){return !!(a.altKey||a.ctrlKey||a.metaKey||((a.charCode!==a.which)&&SC.FUNCTION_KEYS[a.which]))
},_isModifierKey:function(a){return !!SC.MODIFIER_KEYS[a.charCode]},keydown:function(a){if(SC.none(a)){return YES
}if(SC.browser.mozilla&&(a.which===8)){return true}var b=this._handleModifierChanges(a),e=a.target||a.srcElement,c=(a.which===8)&&!SC.allowsBackspaceToPreviousPage&&(e===document.body);
if(this._isModifierKey(a)){return(c?NO:b)}b=YES;if(this._isFunctionOrNonPrintableKey(a)){if(a.keyCode>=37&&a.keyCode<=40&&SC.browser.mozilla){return YES
}b=this.sendEvent("keyDown",a);if(!b){b=!this.attemptKeyEquivalent(a)}else{b=a.hasCustomEventHandling;
if(b){c=NO}}}return c?NO:b},keypress:function(a){var b;if(SC.browser.mozilla&&(a.which===8)){a.which=a.keyCode;
b=this.sendEvent("keyDown",a);return b?(SC.allowsBackspaceToPreviousPage||a.hasCustomEventHandling):YES
}else{var c=(a.keyCode>=37&&a.keyCode<=40&&SC.browser.mozilla);if((a.charCode!==undefined&&a.charCode===0)&&!c){return YES
}if(c){a.which=a.keyCode}return this.sendEvent("keyDown",a)?a.hasCustomEventHandling:YES
}},keyup:function(a){if(this._ffevt){this._ffevt=null}var b=this._handleModifierChanges(a);
if(this._isModifierKey(a)){return b}return this.sendEvent("keyUp",a)?a.hasCustomEventHandling:YES
},mousedown:function(c){try{window.focus();this.focus();if(SC.browser.msie){this._lastMouseDownX=c.clientX;
this._lastMouseDownY=c.clientY}this._clickCount+=1;if(!this._lastMouseUpAt||((Date.now()-this._lastMouseUpAt)>200)){this._clickCount=1
}c.clickCount=this._clickCount;var b,a=this.targetViewForEvent(c);if(a){b=a.get("pane").get("firstResponder")
}if(b&&b.kindOf(SC.InlineTextFieldView)&&b!==a){b.resignFirstResponder()}a=this._mouseDownView=this.sendEvent("mouseDown",c,a);
if(a&&a.respondsTo("mouseDragged")){this._mouseCanDrag=YES}}catch(f){console.warn("Exception during mousedown: %@".fmt(f));
this._mouseDownView=null;this._mouseCanDrag=NO;throw f}return a?c.hasCustomEventHandling:YES
},mouseup:function(b){try{if(this._drag){this._drag.tryToPerform("mouseUp",b);this._drag=null
}var c=null,a=this._mouseDownView;this._lastMouseUpAt=Date.now();b.clickCount=this._clickCount;
if(a){c=this.sendEvent("mouseUp",b,a);if(!c&&(this._clickCount===2)){c=this.sendEvent("doubleClick",b,a)
}if(!c){c=this.sendEvent("click",b,a)}}if(!c){a=this.targetViewForEvent(b);if(this._clickCount===2){c=this.sendEvent("doubleClick",b,a)
}if(!c){c=this.sendEvent("click",b,a)}}this._mouseCanDrag=NO;this._mouseDownView=null
}catch(f){this._drag=null;this._mouseCanDrag=NO;this._mouseDownView=null;throw f}return(c)?b.hasCustomEventHandling:YES
},dblclick:function(a){if(SC.browser.isIE){this._clickCount=2;this.mouseup(a)}},mousewheel:function(b){try{var a=this.targetViewForEvent(b),c=this.sendEvent("mouseWheel",b,a)
}catch(f){throw f}return(c)?b.hasCustomEventHandling:YES},_lastHovered:null,mousemove:function(f){if(SC.browser.msie){if(this._lastMoveX===f.clientX&&this._lastMoveY===f.clientY){return
}}this._lastMoveX=f.clientX;this._lastMoveY=f.clientY;SC.RunLoop.begin();try{this.focus();
if(this._drag){if(SC.browser.msie){if(this._lastMouseDownX!==f.clientX&&this._lastMouseDownY!==f.clientY){this._drag.tryToPerform("mouseDragged",f)
}}else{this._drag.tryToPerform("mouseDragged",f)}}else{var c=this._lastHovered||[],g=[],j,i,a,b=this.targetViewForEvent(f);
while(b&&(b!==this)){if(c.indexOf(b)!==-1){b.tryToPerform("mouseMoved",f);g.push(b)
}else{b.tryToPerform("mouseEntered",f);g.push(b)}b=b.get("nextResponder")}for(i=0,a=c.length;
i<a;i++){b=c[i];j=b.respondsTo("mouseExited");if(j&&!(g.indexOf(b)!==-1)){b.tryToPerform("mouseExited",f)
}}this._lastHovered=g;if(this._mouseDownView){if(SC.browser.msie){if(this._lastMouseDownX!==f.clientX&&this._lastMouseDownY!==f.clientY){this._mouseDownView.tryToPerform("mouseDragged",f)
}}else{this._mouseDownView.tryToPerform("mouseDragged",f)}}}}catch(h){throw h}SC.RunLoop.end()
},_mouseCanDrag:YES,selectstart:function(b){var a=this.sendEvent("selectStart",b,this.targetViewForEvent(b));
return(a!==null?YES:NO)&&(this._mouseCanDrag?NO:YES)},drag:function(){return false
}});require("core");SC.UndoManager=SC.Object.extend({undoActionName:function(){return this.undoStack?this.undoStack.name:null
}.property("undoStack"),redoActionName:function(){return this.redoStack?this.redoStack.name:null
}.property("redoStack"),canUndo:function(){return this.undoStack!=null}.property("undoStack"),canRedo:function(){return this.redoStack!=null
}.property("redoStack"),undo:function(){this._undoOrRedo("undoStack","isUndoing")
},redo:function(){this._undoOrRedo("redoStack","isRedoing")},isUndoing:false,isRedoing:false,groupingLevel:0,registerUndo:function(b,a){this.beginUndoGroup(a);
this._activeGroup.actions.push(b);this.endUndoGroup(a)},beginUndoGroup:function(b){if(this._activeGroup){this.groupingLevel++
}else{var a=this.isUndoing?"redoStack":"undoStack";this._activeGroup={name:b,actions:[],prev:this.get(a)};
this.set(a,this._activeGroup);this.groupingLevel=1}},endUndoGroup:function(a){if(!this._activeGroup){raise("endUndoGroup() called outside group.")
}if(this.groupingLevel>1){this.groupingLevel--}else{this._activeGroup=null;this.groupingLevel=0
}this.propertyDidChange(this.isUndoing?"redoStack":"undoStack")},setActionName:function(a){if(!this._activeGroup){raise("setActionName() called outside group.")
}this._activeGroup.name=a},_activeGroup:null,undoStack:null,redoStack:null,_undoOrRedo:function(a,c){if(this._activeGroup){return false
}if(this.get(a)==null){return true}this.set(c,true);var f=this.get(a);this.set(a,f.prev);
var b;var e=f.actions.length>1;if(e){this.beginUndoGroup(f.name)}while(b=f.actions.pop()){b()
}if(e){this.endUndoGroup(f.name)}this.set(c,false)}});SC.CheckboxView=SC.FieldView.extend(SC.StaticLayout,SC.Button,{classNames:["sc-checkbox-view"],tagName:"label",needsEllipsis:NO,render:function(a,g){var e,c;
if(g){e=this._field_currentDisplayTitle=this.get("displayTitle");var f=SC.BLANK_IMAGE_URL;
var b=this.get("isEnabled")?"":'disabled="disabled"';if(SC.browser.msie){a.attr("for",SC.guidFor(this))
}a.push('<span class="button" ></span>');a.push('<input type="checkbox" id="%@" name="%@" %@ />'.fmt(SC.guidFor(this),SC.guidFor(this),b));
if(this.get("needsEllipsis")){a.push('<span class="label ellipsis">',e,"</span>")
}else{a.push('<span class="label">',e,"</span>")}a.attr("name",SC.guidFor(this))}else{if(c=this.$input()[0]){if(this.get("isEnabled")){c.disabled=NO
}else{c.disabled=YES}c=null}e=this.get("displayTitle");if(e!==this._field_currentDisplayTitle){this._field_currentDisplayTitle=e;
this.$("span.label").text(e)}}},$input:function(){return this.$("input")},getFieldValue:function(){var a=this.$input().attr("checked");
if(a){this._lastFieldValue=null}else{if(this._lastFieldValue===SC.MIXED_STATE){a=SC.MIXED_STATE
}}return a},setFieldValue:function(a){this._lastFieldValue=a;this.$input().attr("checked",(a===SC.MIXED_STATE)?NO:!!a)
},fieldValueForObject:function(a){return this.computeIsSelectedForValue(a)},objectForFieldValue:function(a){var b=(a===SC.MIXED_STATE)?this.get("value"):(!!a)?this.get("toggleOnValue"):this.get("toggleOffValue");
return b},didCreateLayer:function(){this.setFieldValue(this.get("fieldValue"));SC.Event.add(this.$input()[0],"click",this,this._field_fieldValueDidChange)
},willDestroyLayer:function(){SC.Event.remove(this.$input()[0],"click",this,this._field_fieldValueDidChange)
},mouseDown:function(a){this.set("isActive",YES);this._field_isMouseDown=YES;return YES
}});SC.LIST_ITEM_ACTION_CANCEL="sc-list-item-cancel-action";SC.LIST_ITEM_ACTION_REFRESH="sc-list-item-cancel-refresh";
SC.LIST_ITEM_ACTION_EJECT="sc-list-item-cancel-eject";SC.ListItemView=SC.View.extend(SC.StaticLayout,SC.Control,{classNames:["sc-list-item-view"],content:null,hasContentIcon:NO,hasContentRightIcon:NO,hasContentBranch:NO,contentCheckboxKey:null,contentIconKey:null,contentRightIconKey:null,contentValueKey:null,escapeHTML:YES,contentUnreadCountKey:null,contentIsBranchKey:null,isEditing:NO,outlineIndent:16,outlineLevel:0,disclosureState:SC.LEAF_NODE,contentPropertyDidChange:function(){if(this.get("contentIsEditable")!==this.contentIsEditable()){this.notifyPropertyChange("contentIsEditable")
}this.displayDidChange()},contentIsEditable:function(){var a=this.get("content");
return a&&(a.get?a.get("isEditable")!==NO:NO)}.property("content").cacheable(),render:function(c,a){var g=this.get("content"),m=this.displayDelegate,b=this.get("outlineLevel"),f=this.get("outlineIndent"),l,j,i;
c.addClass((this.get("contentIndex")%2===0)?"even":"odd");c.setClass("disabled",!this.get("isEnabled"));
i=c.begin("div").addClass("sc-outline");if(b>=0&&f>0){i.addStyle("left",f*(b+1))}j=this.get("disclosureState");
if(j!==SC.LEAF_NODE){this.renderDisclosure(i,j);c.addClass("has-disclosure")}l=this.getDelegateProperty("contentCheckboxKey",m);
if(l){j=g?(g.get?g.get(l):g[l]):NO;this.renderCheckbox(i,j);c.addClass("has-checkbox")
}if(this.getDelegateProperty("hasContentIcon",m)){l=this.getDelegateProperty("contentIconKey",m);
j=(l&&g)?(g.get?g.get(l):g[l]):null;this.renderIcon(i,j);c.addClass("has-icon")}l=this.getDelegateProperty("contentValueKey",m);
j=(l&&g)?(g.get?g.get(l):g[l]):g;if(j&&SC.typeOf(j)!==SC.T_STRING){j=j.toString()
}if(this.get("escapeHTML")){j=SC.RenderContext.escapeHTML(j)}this.renderLabel(i,j);
if(this.getDelegateProperty("hasContentRightIcon",m)){l=this.getDelegateProperty("contentRightIconKey",m);
j=(l&&g)?(g.get?g.get(l):g[l]):null;this.renderRightIcon(i,j);c.addClass("has-right-icon")
}l=this.getDelegateProperty("contentUnreadCountKey",m);j=(l&&g)?(g.get?g.get(l):g[l]):null;
if(!SC.none(j)&&(j!==0)){this.renderCount(i,j);var e=["zero","one","two","three","four","five"];
var h=(j.toString().length<e.length)?e[j.toString().length]:e[e.length-1];c.addClass("has-count "+h+"-digit")
}l=this.getDelegateProperty("listItemActionProperty",m);j=(l&&g)?(g.get?g.get(l):g[l]):null;
if(j){this.renderAction(i,j);c.addClass("has-action")}if(this.getDelegateProperty("hasContentBranch",m)){l=this.getDelegateProperty("contentIsBranchKey",m);
j=(l&&g)?(g.get?g.get(l):g[l]):NO;this.renderBranch(i,j);c.addClass("has-branch")
}c=i.end()},renderDisclosure:function(f,g){var e=(g===SC.BRANCH_OPEN)?"open":"closed",a=this._scli_disclosureHtml,c,b;
if(!a){a=this.constructor.prototype._scli_disclosureHtml={}}c=a[e];if(!c){c=a[e]='<img src="'+SC.BLANK_IMAGE_URL+'" class="disclosure button '+e+'" />'
}f.push(c)},renderCheckbox:function(f,h){var e=(h===SC.MIXED_STATE)?"mixed":h?"sel":"nosel",a=this._scli_checkboxHtml,g=this.get("contentIsEditable")&&this.get("isEnabled"),c,b;
if(!g){e=SC.keyFor("disabled",e)}if(!a){a=this.constructor.prototype._scli_checkboxHtml={}
}c=a[e];if(!c){b=SC.RenderContext("a").attr("href","javascript:;").classNames(SC.CheckboxView.prototype.classNames);
if(h===SC.MIXED_STATE){b.addClass("mixed")}else{b.setClass("sel",h)}b.setClass("disabled",!g);
b.push('<span class="button"></span>');c=a[e]=b.join()}f.push(c)},renderIcon:function(b,e){var a=null,c=null;
if(e&&SC.ImageView.valueIsUrl(e)){a=e;c=""}else{c=e;a=SC.BLANK_IMAGE_URL}b.begin("img").addClass("icon").addClass(c).attr("src",a).end()
},renderLabel:function(b,a){b.push("<label>",a||"","</label>")},$label:function(){return this.$("label")
},renderRightIcon:function(b,e){var a=null,c=null;if(e&&SC.ImageView.valueIsUrl(e)){a=e;
c=""}else{c=e;a=SC.BLANK_IMAGE_URL}b.begin("img").addClass("right-icon").addClass(c).attr("src",a).end()
},renderCount:function(a,b){a.push('<span class="count"><span class="inner">').push(b.toString()).push("</span></span>")
},renderAction:function(a,b){a.push('<img src="',SC.BLANK_IMAGE_URL,'" class="action" />')
},renderBranch:function(b,a){b.begin("span").addClass("branch").addClass(a?"branch-visible":"branch-hidden").push("&nbsp;").end()
},_isInsideElementWithClassName:function(f,a){var c=this.get("layer");if(!c){return NO
}var e=SC.$(a.target);var b=NO,g;while(!b&&e.length>0&&(e[0]!==c)){if(e.hasClass(f)){b=YES
}e=e.parent()}e=c=null;return b},_isInsideCheckbox:function(b){var a=this.displayDelegate;
var c=this.getDelegateProperty("contentCheckboxKey",a);return c&&this._isInsideElementWithClassName("sc-checkbox-view",b)
},_isInsideDisclosure:function(a){if(this.get("disclosureState")===SC.LEAF_NODE){return NO
}return this._isInsideElementWithClassName("disclosure",a)},_isInsideRightIcon:function(c){var b=this.displayDelegate;
var a=this.getDelegateProperty("hasContentRightIcon",b);return a&&this._isInsideElementWithClassName("right-icon",c)
},mouseDown:function(a){if(!this.get("contentIsEditable")){return NO}if(this._isInsideCheckbox(a)){this._addCheckboxActiveState();
this._isMouseDownOnCheckbox=YES;this._isMouseInsideCheckbox=YES;return YES}else{if(this._isInsideDisclosure(a)){this._addDisclosureActiveState();
this._isMouseDownOnDisclosure=YES;this._isMouseInsideDisclosure=YES;return YES}else{if(this._isInsideRightIcon(a)){this._addRightIconActiveState();
this._isMouseDownOnRightIcon=YES;this._isMouseInsideRightIcon=YES;return YES}}}return NO
},mouseUp:function(i){var c=NO,j,e,b,a,h,g;if(this._isMouseDownOnCheckbox){if(this._isInsideCheckbox(i)){j=this.displayDelegate;
e=this.getDelegateProperty("contentCheckboxKey",j);b=this.get("content");if(b&&b.get){var f=b.get(e);
f=(f===SC.MIXED_STATE)?YES:!f;b.set(e,f);this.displayDidChange()}}this._removeCheckboxActiveState();
c=YES}else{if(this._isMouseDownOnDisclosure){if(this._isInsideDisclosure(i)){a=this.get("disclosureState");
h=this.get("contentIndex");g=(!SC.none(h))?SC.IndexSet.create(h):null;j=this.get("displayDelegate");
if(a===SC.BRANCH_OPEN){if(g&&j&&j.collapse){j.collapse(g)}else{this.set("disclosureState",SC.BRANCH_CLOSED)
}this.displayDidChange()}else{if(a===SC.BRANCH_CLOSED){if(g&&j&&j.expand){j.expand(g)
}else{this.set("disclosureState",SC.BRANCH_OPEN)}this.displayDidChange()}}}this._removeDisclosureActiveState();
c=YES}else{if(this._isMouseDownOnRightIcon){this._removeRightIconActiveState();c=YES
}}}this._isMouseInsideCheckbox=this._isMouseDownOnCheckbox=NO;this._isMouseDownOnDisclosure=this._isMouseInsideDisclosure=NO;
this._isMouseInsideRightIcon=this._isMouseDownOnRightIcon=NO;return c},mouseExited:function(a){if(this._isMouseDownOnCheckbox){this._removeCheckboxActiveState();
this._isMouseInsideCheckbox=NO}else{if(this._isMouseDownOnDisclosure){this._removeDisclosureActiveState();
this._isMouseInsideDisclosure=NO}else{if(this._isMouseDownOnRightIcon){this._removeRightIconActiveState();
this._isMouseInsideRightIcon=NO}}}return NO},mouseEntered:function(a){if(this._isMouseDownOnCheckbox){this._addCheckboxActiveState();
this._isMouseInsideCheckbox=YES}else{if(this._isMouseDownOnDisclosure){this._addDisclosureActiveState();
this._isMouseInsideDisclosure=YES}else{if(this._isMouseDownOnRightIcon){this._addRightIconActiveState();
this._isMouseInsideRightIcon=YES}}}return NO},_addCheckboxActiveState:function(){var a=this.get("isEnabled");
this.$(".sc-checkbox-view").setClass("active",a)},_removeCheckboxActiveState:function(){this.$(".sc-checkbox-view").removeClass("active")
},_addDisclosureActiveState:function(){var a=this.get("isEnabled");this.$("img.disclosure").setClass("active",a)
},_removeDisclosureActiveState:function(){this.$("img.disclosure").removeClass("active")
},_addRightIconActiveState:function(){this.$("img.right-icon").setClass("active",YES)
},_removeRightIconActiveState:function(){this.$("img.right-icon").removeClass("active")
},contentHitTest:function(b){var a=this.displayDelegate;var c=this.getDelegateProperty("contentValueKey",a);
if(!c){return NO}var f=this.$label()[0];if(!f){return NO}var g=b.target,e=this.get("layer");
while(g&&(g!==e)&&(g!==window)){if(g===f){return YES}g=g.parentNode}return NO},beginEditing:function(){if(this.get("isEditing")){return YES
}return this._beginEditing(YES)},_beginEditing:function(w){var p=this.get("content"),h=this.get("displayDelegate"),g=this.getDelegateProperty("contentValueKey",h),i=this.get("parentView"),u=i?i.get("frame"):null,a=this.$label(),s,l,e,m,b,o,c,t,q,x;
if(w&&this.scrollToVisible()){var j=this.get("owner"),n=this.get("contentIndex");
this.invokeLater(function(){var f=j.itemViewForContentIndex(n);if(f&&f._beginEditing){f._beginEditing(NO)
}});return YES}if(!i||!a||a.get("length")===0){return NO}l=(g&&p&&p.get)?p.get(g):null;
s=this.computeFrameWithParentFrame(null);e=SC.viewportOffset(a[0]);m=a.css("lineHeight");
b=a.css("fontSize");o=this.$().css("top");if(o){o=parseInt(o.substring(0,o.length-2),0)
}else{o=0}c=m;t=0;if(b&&c){q=b*1.5;if(q<c){a.css({lineHeight:"1.5"});t=(c-q)/2}else{m=null
}}s.x=e.x;s.y=e.y+o+t;s.height=a[0].offsetHeight;s.width=a[0].offsetWidth;x=SC.InlineTextFieldView.beginEditing({frame:s,exampleElement:a,delegate:this,value:l,multiline:NO,isCollection:YES});
if(m){a.css({lineHeight:m})}return x},commitEditing:function(){if(!this.get("isEditing")){return YES
}return SC.InlineTextFieldView.commitEditing()},discardEditing:function(){if(!this.get("isEditing")){return YES
}return SC.InlineTextFieldView.discardEditing()},inlineEditorWillBeginEditing:function(a){this.set("isEditing",YES)
},inlineEditorDidBeginEditing:function(b){var a=this.$label();this._oldOpacity=a.css("opacity");
a.css("opacity",0)},inlineEditorShouldEndEditing:function(a,b){return YES},inlineEditorDidEndEditing:function(c,f){this.set("isEditing",NO);
var e=this.get("content");var a=this.displayDelegate;var b=this.getDelegateProperty("contentValueKey",a);
if(b&&e&&e.set){e.set(b,f)}this.displayDidChange()}});sc_require("mixins/collection_view_delegate");
sc_require("views/list_item");SC.DRAG_REORDER=16;SC.HORIZONTAL_ORIENTATION="horizontal";
SC.VERTICAL_ORIENTATION="vertical";SC.BENCHMARK_RELOAD=NO;SC.CollectionView=SC.View.extend(SC.CollectionViewDelegate,SC.CollectionContent,{classNames:["sc-collection-view"],ACTION_DELAY:200,content:null,contentBindingDefault:SC.Binding.multiple(),length:0,nowShowing:function(){return this.computeNowShowing()
}.property("length","clippingFrame").cacheable(),selection:null,isSelectable:YES,isSelectableBindingDefault:SC.Binding.bool(),isEnabled:YES,isEnabledBindingDefault:SC.Binding.bool(),isEditable:YES,isEditableBindingDefault:SC.Binding.bool(),canReorderContent:NO,canReorderContentBindingDefault:SC.Binding.bool(),canDeleteContent:NO,canDeleteContentBindingDefault:SC.Binding.bool(),canEditContent:NO,canEditContentBindingDefault:SC.Binding.bool(),isDropTarget:NO,useToggleSelection:NO,actOnSelect:NO,selectOnMouseDown:YES,exampleView:SC.ListItemView,contentExampleViewKey:null,groupExampleView:null,contentGroupExampleViewKey:null,action:null,target:null,contentValueKey:null,acceptsFirstResponder:NO,isActive:NO,calculatedHeight:0,calculatedWidth:0,computeLayout:function(){return null
},layoutForContentIndex:function(a){return null},allContentIndexes:function(){return SC.IndexSet.create(0,this.get("length")).freeze()
}.property("length").cacheable(),contentIndexesInRect:function(a){return null},computeNowShowing:function(){var c=this.contentIndexesInRect(this.get("clippingFrame"));
if(!c){c=this.get("allContentIndexes")}else{var b=this.get("length"),a=c.get("max");
if(a>b){c=c.copy().remove(b,a-b).freeze()}}return c},showInsertionPoint:function(a,b){},hideInsertionPoint:function(){},delegate:null,selectionDelegate:function(){var a=this.get("delegate"),b=this.get("content");
return this.delegateFor("isCollectionViewDelegate",a,b)}.property("delegate","content").cacheable(),contentDelegate:function(){var a=this.get("delegate"),b=this.get("content");
return this.delegateFor("isCollectionContent",a,b)}.property("delegate","content").cacheable(),contentRangeDidChange:function(e,b,c,a){if(!b&&(c==="[]")){this.reload(a)
}else{this.contentPropertyDidChange(b,c,a)}},contentPropertyDidChange:function(c,b,a){},updateContentRangeObserver:function(){var e=this.get("nowShowing"),a=this._cv_contentRangeObserver,c=this.get("content");
if(!c){return}if(a){c.updateRangeObserver(a,e)}else{var b=this.contentRangeDidChange;
a=c.addRangeObserver(e,this,b,null);this._cv_contentRangeObserver=a}},removeContentRangeObserver:function(){var b=this.get("content"),a=this._cv_contentRangeObserver;
if(a){if(b){b.removeRangeObserver(a)}this._cv_contentRangeObserver=null}},contentLengthDidChange:function(){var a=this.get("content");
this.set("length",a?a.get("length"):0)},_cv_contentDidChange:function(){var b=this.get("content"),a=this.contentLengthDidChange;
if(b===this._content){return this}this.removeContentRangeObserver();if(this._content){this._content.removeObserver("length",this,a)
}this._content=b;if(b){b.addObserver("length",this,a)}this.contentLengthDidChange();
this.contentRangeDidChange(b,null,"[]",null)}.observes("content"),_invalidIndexes:NO,reload:function(a){var b=this._invalidIndexes;
if(a&&b!==YES){if(b){b.add(a)}else{b=this._invalidIndexes=a.clone()}}else{this._invalidIndexes=YES
}if(this.get("isVisibleInWindow")){this.invokeOnce(this.reloadIfNeeded)}return this
},reloadIfNeeded:function(){var i=this._invalidIndexes;if(!i||!this.get("isVisibleInWindow")){return this
}this._invalidIndexes=NO;var h=this.get("content"),g=h?h.get("length"):0,f=this.computeLayout(),b=SC.BENCHMARK_RELOAD,a=this.get("nowShowing"),c=this._sc_itemViews,l=this.get("containerView")||this,n,m,j,e;
if(i.isIndexSet&&i.contains(a)){i=YES}if(this.willReload){this.willReload(i===YES?null:i)
}if(i.isIndexSet){if(b){SC.Benchmark.start(b="%@#reloadIfNeeded (Partial)".fmt(this),YES)
}i.forEach(function(o){var p=c?c[o]:null;if(a.contains(o)){j=this.itemViewForContentIndex(o,YES);
if(p&&p.parentView===l){e=p.get("layer");if(e&&e.parentNode){e.parentNode.removeChild(e)
}e=null;l.replaceChild(j,p)}else{l.appendChild(j)}}else{if(p&&p.parentView===l){delete c[o];
e=p.get("layer");if(e&&e.parentNode){e.parentNode.removeChild(e)}e=null;l.removeChild(p)
}}},this);if(b){SC.Benchmark.end(b)}}else{if(b){SC.Benchmark.start(b="%@#reloadIfNeeded (Full)".fmt(this),YES)
}if(c){c.length=0}n=[];a.forEach(function(o){n.push(this.itemViewForContentIndex(o,YES))
},this);l.beginPropertyChanges();l.destroyLayer().removeAllChildren();l.set("childViews",n);
l.replaceLayer();l.endPropertyChanges();if(b){SC.Benchmark.end(b)}}if(f){this.adjust(f)
}if(this.didReload){this.didReload(i===YES?null:i)}return this},displayProperties:"isFirstResponder isEnabled isActive".w(),render:function(a,b){if(b&&this._needsReload){this.reloadIfNeeded()
}a.setClass("focus",this.get("isFirstResponder"));a.setClass("disabled",!this.get("isEnabled"));
a.setClass("active",this.get("isActive"));return arguments.callee.base.apply(this,arguments)
},_TMP_ATTRS:{},_COLLECTION_CLASS_NAMES:"sc-collection-item".w(),_GROUP_COLLECTION_CLASS_NAMES:"sc-collection-item sc-group-item".w(),itemViewForContentIndex:function(j,i){var g=this.get("content"),c=this._sc_itemViews,o=g.objectAt(j),n=this.get("contentDelegate"),h=n.contentGroupIndexes(this,g),b=NO,m,f,p,e,a;
if(!c){c=this._sc_itemViews=[]}if(!i&&(f=c[j])){return f}b=h&&h.contains(j);if(b){b=n.contentIndexIsGroup(this,g,j)
}if(b){m=this.get("contentGroupExampleViewKey");if(m&&o){p=o.get(m)}if(!p){p=this.get("groupExampleView")||this.get("exampleView")
}}else{m=this.get("contentExampleViewKey");if(m&&o){p=o.get(m)}if(!p){p=this.get("exampleView")
}}var l=this._TMP_ATTRS;l.contentIndex=j;l.content=o;l.owner=l.displayDelegate=this;
l.parentView=this.get("containerView")||this;l.page=this.page;l.layerId=this.layerIdFor(j,o);
l.isEnabled=n.contentIndexIsEnabled(this,g,j);l.isSelected=n.contentIndexIsSelected(this,g,j);
l.outlineLevel=n.contentIndexOutlineLevel(this,g,j);l.disclosureState=n.contentIndexDisclosureState(this,g,j);
l.isGroupView=b;l.isVisibleInWindow=this.isVisibleInWindow;if(b){l.classNames=this._GROUP_COLLECTION_CLASS_NAMES
}else{l.classNames=this._COLLECTION_CLASS_NAMES}e=this.layoutForContentIndex(j);if(e){l.layout=e
}else{delete l.layout}f=this.createItemView(p,j,l);c[j]=f;return f},itemViewForContentObject:function(a){return this.itemViewForContentIndex(this.get("content").indexOf(a))
},_TMP_LAYERID:[],createItemView:function(c,a,b){return c.create(b)},layerIdFor:function(a){var b=this._TMP_LAYERID;
b[0]=SC.guidFor(this);b[1]=a;return b.join("-")},contentIndexForLayerId:function(c){if(!c||!(c=c.toString())){return null
}var b=this._baseLayerId;if(!b){b=this._baseLayerId=SC.guidFor(this)+"-"}if((c.length<=b.length)||(c.indexOf(b)!==0)){return null
}var a=Number(c.slice(c.lastIndexOf("-")+1));return isNaN(a)?null:a},itemViewForEvent:function(l){var e=this.getPath("pane.rootResponder");
if(!e){return null}var c=SC.guidFor(this)+"-",a=c.length,f=l.target,h=this.get("layer"),g=null,b,j,i;
while(f&&f!==document&&f!==h){b=f?SC.$(f).attr("id"):null;if(b&&(g=this.contentIndexForLayerId(b))!==null){break
}f=f.parentNode}if(g===null||(f===h)){f=h=null;return null}if(g>=this.get("length")){throw"layout for item view %@ was found when item view does not exist (%@)".fmt(b,this)
}return this.itemViewForContentIndex(g)},expand:function(b){if(!b){return this}var a=this.get("contentDelegate"),c=this.get("content");
b.forEach(function(e){var f=a.contentIndexDisclosureState(this,c,e);if(f===SC.BRANCH_CLOSED){a.contentIndexExpand(this,c,e)
}},this);return this},collapse:function(b){if(!b){return this}var a=this.get("contentDelegate"),c=this.get("content");
b.forEach(function(e){var f=a.contentIndexDisclosureState(this,c,e);if(f===SC.BRANCH_OPEN){a.contentIndexCollapse(this,c,e)
}},this);return this},_cv_selectionDidChange:function(){var c=this.get("selection"),b=this._cv_selection,a=this._cv_selectionContentDidChange;
if(c===b){return this}if(b){b.removeObserver("[]",this,a)}if(c){c.addObserver("[]",this,a)
}this._cv_selection=c;this._cv_selectionContentDidChange()}.observes("selection"),_cv_selectionContentDidChange:function(){var c=this.get("selection"),b=this._cv_selindexes,a=this.get("content"),e;
this._cv_selindexes=c?c.frozenCopy():null;if(b){b=b.indexSetForSource(a)}if(c){c=c.indexSetForSource(a)
}if(c&&b){e=c.without(b).add(b.without(c))}else{e=c||b}if(e&&e.get("length")>0){this.reloadSelectionIndexes(e)
}},_invalidSelection:NO,reloadSelectionIndexes:function(a){var b=this._invalidSelection;
if(a&&(b!==YES)){if(b){b.add(a)}else{b=this._invalidSelection=a.copy()}}else{this._invalidSelection=YES
}if(this.get("isVisibleInWindow")){this.invokeOnce(this.reloadSelectionIndexesIfNeeded)
}return this},reloadSelectionIndexesIfNeeded:function(){var f=this._invalidSelection;
if(!f||!this.get("isVisibleInWindow")){return this}var e=this.get("nowShowing"),b=this._invalidIndexes,a=this.get("content"),c=this.get("selection");
this._invalidSelection=NO;if(b===YES||!e){return this}if(f===YES){f=e}if(b&&b.isIndexSet){f=f.without(b)
}f.forEach(function(g){if(!e.contains(g)){return}var h=this.itemViewForContentIndex(g,NO);
if(h){h.set("isSelected",c?c.contains(a,g):NO)}},this);return this},select:function(e,h){var f=this.get("content"),b=this.get("selectionDelegate"),a=this.get("contentDelegate"),c=a.contentGroupIndexes(this,f),g;
if(!this.get("isSelectable")){return this}if(SC.typeOf(e)===SC.T_NUMBER){e=SC.IndexSet.create(e,1)
}if(e&&e.get("length")>0){if(c&&c.get("length")>0){e=e.copy().remove(c)}e=b.collectionViewShouldSelectIndexes(this,e,h);
if(!e||e.get("length")===0){return this}}else{e=null}if(h&&(g=this.get("selection"))){g=g.copy()
}else{g=SC.SelectionSet.create()}if(e&&e.get("length")>0){if(e.get("length")===1){g.addObject(f.objectAt(e.get("firstObject")))
}else{g.add(f,e)}}g=b.collectionViewSelectionForProposedSelection(this,g);if(!g){g=SC.SelectionSet.create()
}this._selectionAnchor=null;this.set("selection",g.freeze());return this},deselect:function(b){var e=this.get("selection"),c=this.get("content"),a=this.get("selectionDelegate");
if(!this.get("isSelectable")){return this}if(!e||e.get("length")===0){return this
}if(SC.typeOf(b)===SC.T_NUMBER){b=SC.IndexSet.create(b,1)}b=a.collectionViewShouldDeselectIndexes(this,b);
if(!b||b.get("length")===0){return this}e=e.copy().remove(c,b);e=a.collectionViewSelectionForProposedSelection(this,e);
if(!e){e=SC.SelectionSet.create()}this.set("selection",e.freeze());return this},_findNextSelectableItemFromIndex:function(j,a){var e=this.get("length"),f=SC.IndexSet.create(),h=this.get("content"),l=this.get("selectionDelegate"),b=this.get("contentDelegate"),i=b.contentGroupIndexes(this,h),g,c;
if(!i&&(l.collectionViewShouldSelectIndexes===this.collectionViewShouldSelectIndexes)){return j
}while(j<e){if(!i||!i.contains(j)){f.add(j);g=l.collectionViewShouldSelectIndexes(this,f);
if(g&&g.get("length")>=1){return j}f.remove(j)}j++}if(a===undefined){c=this.get("selection");
a=c?c.get("max"):-1}return a},_findPreviousSelectableItemFromIndex:function(h,i){var c=SC.IndexSet.create(),e=this.get("content"),j=this.get("selectionDelegate"),a=this.get("contentDelegate"),g=a.contentGroupIndexes(this,e),f;
if(SC.none(h)){h=-1}if(!g&&(j.collectionViewShouldSelectIndexes===this.collectionViewShouldSelectIndexes)){return h
}while(h>=0){if(!g||!g.contains(h)){c.add(h);f=j.collectionViewShouldSelectIndexes(this,c);
if(f&&f.get("length")>=1){return h}c.remove(h)}h--}if(i===undefined){var b=this.get("selection");
i=b?b.get("min"):-1}if(SC.none(i)){i=-1}return i},selectPreviousItem:function(i,b){if(SC.none(b)){b=1
}if(SC.none(i)){i=false}var g=this.get("selection"),f=this.get("content");if(g){g=g.indexSetForSource(f)
}var h=g?g.get("min"):-1,a=g?g.get("max")-1:-1,e=this._selectionAnchor;if(SC.none(e)){e=h
}if(i){if(a>e){a=a-b}else{h=this._findPreviousSelectableItemFromIndex(h-b)}if(SC.none(h)||(h<0)){h=0
}if(a<h){a=h}}else{h=this._findPreviousSelectableItemFromIndex(h-b);if(SC.none(h)||(h<0)){h=0
}a=h;e=null}var c=h;g=SC.IndexSet.create(h,a+1-h);this.scrollToContentIndex(c);this.select(g);
this._selectionAnchor=e;return this},selectNextItem:function(i,j){if(SC.none(j)){j=1
}if(SC.none(i)){i=false}var b=this.get("selection"),h=this.get("content");if(b){b=b.indexSetForSource(h)
}var a=b?b.get("min"):-1,e=b?b.get("max")-1:-1,f=this._selectionAnchor,c=this.get("length");
if(SC.none(f)){f=a}if(i){if(a<f){a=a+j}else{e=this._findNextSelectableItemFromIndex(e+j,e)
}if(e>=c){e=c-1}if(a>e){a=e}}else{e=this._findNextSelectableItemFromIndex(e+j,e);
if(e>=c){e=c-1}a=e;f=null}var g=e;b=SC.IndexSet.create(a,e-a+1);this.scrollToContentIndex(g);
this.select(b);this._selectionAnchor=f;return this},deleteSelection:function(){if(!this.get("canDeleteContent")){return NO
}var e=this.get("selection"),c=this.get("content"),a=this.get("selectionDelegate"),b=e&&c?e.indexSetForSource(c):null;
if(!c||!b||b.get("length")===0){return NO}b=a.collectionViewShouldDeleteIndexes(this,b);
if(!b||b.get("length")===0){return NO}a.collectionViewDeleteContent(this,this.get("content"),b);
return YES},scrollToContentIndex:function(b){var a=this.itemViewForContentIndex(b);
if(a){this.scrollToItemView(a)}return this},scrollToItemView:function(a){if(a){a.scrollToVisible()
}return this},keyDown:function(a){var b=this.interpretKeyEvents(a);return !b?NO:b
},keyUp:function(){return true},insertText:function(b,a){if(b===" "){var c=this.get("selection");
if(c&&c.get("length")>0){this.invokeLater(this._cv_action,0,null,a)}return YES}else{return NO
}},selectAll:function(a){var b=this.get("content"),c=b?SC.IndexSet.create(0,b.get("length")):null;
this.select(c,NO);return YES},deleteBackward:function(a){return this.deleteSelection()
},deleteForward:function(a){return this.deleteSelection()},moveDown:function(b,a){this.selectNextItem(false,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY);return true},moveUp:function(b,a){this.selectPreviousItem(false,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY);return true},moveLeft:function(g,n){if((this.get("itemsPerRow")||1)>1){this.selectPreviousItem(false,1);
this._cv_performSelectAction(null,n,this.ACTION_DELAY)}else{var c=this.get("selection"),l=this.get("content"),i=c?c.indexSetForSource(l):null;
if(i){var o=undefined,h=false,j=undefined;if(i.get("length")===1){j=i.get("firstObject");
o=this.get("contentDelegate");var b=o.contentIndexDisclosureState(this,l,j);if(b!==SC.BRANCH_OPEN){h=true
}}if(h){var a=o.contentIndexOutlineLevel(this,l,j)-1;if(a>=0){var f=-1;while(f<0){var e=this._findPreviousSelectableItemFromIndex(j-1);
if(e<0){return false}j=e;var m=o.contentIndexOutlineLevel(this,l,j);if(m===a){f=e
}}if(f!==-1){this.select(j)}}}else{this.collapse(i)}}}return true},moveRight:function(c,a){if((this.get("itemsPerRow")||1)>1){this.selectNextItem(false,1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY)}else{var f=this.get("selection"),e=this.get("content"),b=f?f.indexSetForSource(e):null;
if(b){this.expand(b)}}return true},moveDownAndModifySelection:function(b,a){this.selectNextItem(true,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY);return true},moveUpAndModifySelection:function(b,a){this.selectPreviousItem(true,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY);return true},moveLeftAndModifySelection:function(b,a){if((this.get("itemsPerRow")||1)>1){this.selectPreviousItem(true,1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY)}return true},moveRightAndModifySelection:function(b,a){if((this.get("itemsPerRow")||1)>1){this.selectNextItem(true,1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY)}return true},insertNewline:function(e,c){var b=this.get("isEditable")&&this.get("canEditContent"),h,g,i,a,f;
if(b){h=this.get("selection");g=this.get("content");if(h&&h.get("length")===1){i=h.indexSetForSource(g);
a=i?i.get("min"):-1;b=a>=0}}if(b){f=this.itemViewForContentIndex(a);b=f&&SC.typeOf(f.beginEditing)===SC.T_FUNCTION
}if(b){this.scrollToContentIndex(a);f=this.itemViewForContentIndex(a);f.beginEditing()
}else{this.invokeLater(this._cv_action,0,f,null)}return YES},mouseDown:function(i){if(this.get("useToggleSelection")){return true
}var h=this.itemViewForEvent(i),g=this.get("content"),f=h?h.get("contentIndex"):-1,c,e;
c=this.mouseDownInfo={event:i,itemView:h,contentIndex:f,at:Date.now()};this.becomeFirstResponder();
if(!h){if(this.get("allowDeselectAll")){this.select(null,false)}return YES}var b=this.get("selection"),a,j;
if(b){b=b.indexSetForSource(g)}a=b?b.contains(f):NO;c.modifierKeyPressed=j=i.ctrlKey||i.metaKey;
if(j&&a){c.shouldDeselect=f>=0}else{if(i.shiftKey&&b&&b.get("length")>0){b=this._findSelectionExtendedByShift(b,f);
e=this._selectionAnchor;this.select(b);this._selectionAnchor=e}else{if(!j&&a){c.shouldReselect=f>=0
}else{if(this.get("selectOnMouseDown")){this.select(f,j)}else{c.shouldSelect=f>=0
}}}}c.previousContentIndex=f;return YES},mouseUp:function(i){var j=this.itemViewForEvent(i),e=this.mouseDownInfo,f,c,a,b,h,g,l;
if(this.get("useToggleSelection")){if(!j){return}c=this.get("selection");f=(j)?j.get("contentIndex"):-1;
a=c&&c.include(f);if(a){this.deselect(f)}else{this.select(f,YES)}}else{if(e){l=e.contentIndex;
f=(j)?j.get("contentIndex"):-1;if(e.shouldSelect){this.select(l,e.modifierKeyPressed)
}if(e.shouldDeselect){this.deselect(l)}if(e.shouldReselect){b=this.get("isEditable")&&this.get("canEditContent");
if(b){c=this.get("selection");b=c&&(c.get("length")===1)}if(b){h=this.itemViewForContentIndex(l);
b=h&&(!h.contentHitTest||h.contentHitTest(i));b=(b&&h.beginEditing)?h.beginEditing():NO
}if(!b){if(this._cv_reselectTimer){this._cv_reselectTimer.invalidate()}this._cv_reselectTimer=this.invokeLater(this.select,300,l,false)
}}this._cleanupMouseDown()}}this._cv_performSelectAction(j,i,0,i.clickCount);return NO
},_cleanupMouseDown:function(){var b=this.mouseDownInfo,a;if(b){for(a in b){if(!b.hasOwnProperty(a)){continue
}delete b[a]}}this.mouseDownInfo=null},mouseMoved:function(c){var a=this.itemViewForEvent(c),b=this._lastHoveredItem;
if(a!==b){if(b&&b.mouseOut){b.mouseOut(c)}if(a&&a.mouseOver){a.mouseOver(c)}}this._lastHoveredItem=a;
if(a&&a.mouseMoved){a.mouseMoved(c)}return YES},mouseOut:function(b){var a=this._lastHoveredItem;
this._lastHoveredItem=null;if(a&&a.mouseOut){a.mouseOut(b)}return YES},_findSelectionExtendedByShift:function(f,i){if(!f||f.get("length")===0){return SC.IndexSet.create(i)
}var e=this.get("content"),h=e.get("length")-1,c=f.get("min"),a=f.get("max")-1,g=this.mouseDownInfo,b=this._selectionAnchor;
if(SC.none(b)){b=-1}if(i<c){c=i;if(b<0){this._selectionAnchor=b=a}}else{if(i>a){a=i;
if(b<0){this._selectionAnchor=b=c}}else{if(i>=c&&i<=a){if(b<0){this._selectionAnchor=b=c
}if(i===b){c=a=i}else{if(i>b){c=b;a=i}else{if(i<b){c=i;a=b}}}}}}return SC.IndexSet.create(c,a-c+1)
},reorderDataType:function(){return"SC.CollectionView.Reorder.%@".fmt(SC.guidFor(this))
}.property().cacheable(),dragContent:null,proposedInsertionIndex:null,proposedDropOperation:null,mouseDragged:function(j){var l=this.get("selectionDelegate"),g=this.get("content"),c=this.get("selection"),e=this.mouseDownInfo,a=this.get("contentDelegate"),h=a.contentGroupIndexes(this,g),f,b,i;
if(!e||e.contentIndex<0){return YES}if((Date.now()-e.at)<123){return YES}if(l.collectionViewShouldBeginDrag(this)){if(!this.get("selectOnMouseDown")){f=SC.IndexSet.create(e.contentIndex)
}else{f=c?c.indexSetForSource(g):null}if(f&&h&&h.get("length")>0){f=f.copy().remove(h);
if(f.get("length")===0){f=null}else{f.freeze()}}if(!f){return YES}else{f=f.frozenCopy()
}f={content:g,indexes:f};this.set("dragContent",f);b=this.get("dragDataTypes");if(b&&b.get("length")>0){i=l.collectionViewDragViewFor(this,f.indexes);
if(!i){i=this._cv_dragViewFor(f.indexes)}i.createLayer();SC.Drag.start({event:e.event,source:this,dragView:i,ghost:NO,ghostActsLikeCursor:l.ghostActsLikeCursor,slideBack:YES,dataSource:this});
this._cleanupMouseDown();this._lastInsertionIndex=null}else{this.set("dragContent",null)
}return YES}},_cv_dragViewFor:function(e){var b=this.get("nowShowing").without(e);
b=this.get("nowShowing").without(b);var c=this.get("layer").cloneNode(false);var a=SC.View.create({layer:c,parentView:this});
SC.$(c).css("backgroundColor","transparent").css("border","none").css("top",0).css("left",0);
b.forEach(function(h){var j=this.itemViewForContentIndex(h),f,g;if(j){f=j.get("isSelected");
j.set("isSelected",NO);j.updateLayerIfNeeded();g=j.get("layer");if(g){g=g.cloneNode(true)
}j.set("isSelected",f);j.updateLayerIfNeeded()}if(g){c.appendChild(g)}g=null},this);
c=null;return a},dragDataTypes:function(){var a=this.get("selectionDelegate"),b=a.collectionViewDragDataTypes(this),c;
if(this.get("canReorderContent")){b=b?b.copy():[];c=this.get("reorderDataType");if(b.indexOf(c)<0){b.push(c)
}}return b?b:[]}.property(),dragDataForType:function(c,b){if(this.get("canReorderContent")){if(b===this.get("reorderDataType")){return this.get("dragContent")
}}var a=this.get("selectionDelegate");return a.collectionViewDragDataForType(this,c,b)
},computeDragOperations:function(c,b){var e=SC.DRAG_NONE,a=this.get("selectionDelegate");
if(this.get("canReorderContent")){if(c.get("dataTypes").indexOf(this.get("reorderDataType"))>=0){e=SC.DRAG_REORDER
}}e=a.collectionViewComputeDragOperations(this,c,e);if(e&SC.DRAG_REORDER){e=SC.DRAG_MOVE
}return e},_computeDropOperationState:function(c,n,f){var h=this.convertFrameFromView(c.get("location"),null),m=SC.DROP_BEFORE,o=this.get("selectionDelegate"),e=this.get("canReorderContent"),p,i,a,j,g,b;
var l=this.insertionIndexForLocation(h,SC.DROP_ON);if(SC.typeOf(l)===SC.T_ARRAY){m=l[1];
l=l[0]}if(m===SC.DROP_ON){this.set("proposedInsertionIndex",l);this.set("proposedDropOperation",m);
b=o.collectionViewValidateDragOperation(this,c,f,l,m);l=this.get("proposedInsertionIndex");
m=this.get("proposedDropOperation");this._dropInsertionIndex=this._dropOperation=null;
if(b!==SC.DRAG_NONE){return[l,m,b]}else{m=SC.DROP_BEFORE;l=this.insertionIndexForLocation(h,SC.DROP_BEFORE);
if(SC.typeOf(l)===SC.T_ARRAY){m=l[1];l=l[0]}}}if((l>=0)&&e&&(m!==SC.DROP_ON)){p=c.dataForType(this.get("reorderDataType"));
if(p){i=this.get("content");if(m===SC.DROP_BEFORE){a=p.indexes.contains(l-1);j=p.indexes.contains(l)
}else{a=p.indexes.contains(l);j=p.indexes.contains(l-1)}if(a&&j){if(SC.none(this._lastInsertionIndex)){if(m===SC.DROP_BEFORE){while((l>=0)&&p.indexes.contains(l)){l--
}}else{g=i?i.get("length"):0;while((l<g)&&p.indexes.contains(l)){l++}}}else{l=this._lastInsertionIndex
}}if(l>=0){f=SC.DRAG_REORDER}}}this.set("proposedInsertionIndex",l);this.set("proposedDropOperation",m);
f=o.collectionViewValidateDragOperation(this,c,f,l,m);l=this.get("proposedInsertionIndex");
m=this.get("proposedDropOperation");this._dropInsertionIndex=this._dropOperation=null;
return[l,m,f]},dragUpdated:function(g,b){var i=g.get("allowedDragOperations"),h=this._computeDropOperationState(g,b,i),a=h[0],c=h[1],f=h[2];
if(f!==SC.DRAG_NONE){if((this._lastInsertionIndex!==a)||(this._lastDropOperation!==c)){var e=this.itemViewForContentIndex(a);
this.showInsertionPoint(e,c)}this._lastInsertionIndex=a;this._lastDropOperation=c
}else{this.hideInsertionPoint();this._lastInsertionIndex=this._lastDropOperation=null
}return(f&SC.DRAG_REORDER)?SC.DRAG_MOVE:f},dragExited:function(){this.hideInsertionPoint();
this._lastInsertionIndex=this._lastDropOperation=null},acceptDragOperation:function(a,b){return YES
},performDragOperation:function(f,h){var a=this._computeDropOperationState(f,null,h),m=a[0],l=a[1],i=a[2],n=this.get("selectionDelegate"),c,o,e,j,b,g;
if(i&SC.DRAG_REORDER){h=(h&SC.DRAG_MOVE)?SC.DRAG_REORDER:SC.DRAG_NONE}else{h=h&i}if(h===SC.DRAG_NONE){return h
}c=n.collectionViewPerformDragOperation(this,f,h,m,l);if((c===SC.DRAG_NONE)&&(h&SC.DRAG_REORDER)){e=f.dataForType(this.get("reorderDataType"));
if(!e){return SC.DRAG_NONE}j=this.get("content");g=e.indexes;if(g.get("length")===1){if(((l===SC.DROP_BEFORE)||(l===SC.DROP_AFTER))&&(g.get("min")===m)){return SC.DRAG_MOVE
}}j.beginPropertyChanges();o=[];b=0;e.indexes.forEach(function(p){o.push(j.objectAt(p-b));
j.removeAt(p-b);b++;if(p<m){m--}},this);if(l===SC.DROP_AFTER){m++}j.replace(m,0,o,l);
this.select(SC.IndexSet.create(m,o.length));j.endPropertyChanges();h=SC.DRAG_MOVE
}return h},collectionViewShouldBeginDrag:function(a){return this.get("canReorderContent")
},insertionIndexForLocation:function(a,b){return -1},_cv_isVisibleInWindowDidChange:function(){if(this.get("isVisibleInWindow")){if(this._invalidIndexes){this.invokeOnce(this.reloadIfNeeded)
}if(this._invalidSelection){this.invokeOnce(this.reloadSelectionIndexesIfNeeded)}}}.observes("isVisibleInWindow"),collectionViewShouldSelectItem:function(a,b){return this.get("isSelectable")
},_TMP_DIFF1:SC.IndexSet.create(),_TMP_DIFF2:SC.IndexSet.create(),_cv_nowShowingDidChange:function(){var b=this.get("nowShowing"),a=this._sccv_lastNowShowing,e,f,c;
if(a!==b){if(a&&b){f=this._TMP_DIFF1.add(a).remove(b);c=this._TMP_DIFF2.add(b).remove(a);
e=f.add(c)}else{e=a||b}}if(e&&e.get("length")>0){this._sccv_lastNowShowing=b?b.frozenCopy():null;
this.updateContentRangeObserver();this.reload(e)}if(f){f.clear()}if(c){c.clear()}}.observes("nowShowing"),init:function(){arguments.callee.base.apply(this,arguments);
if(this.get("canReorderContent")){this._cv_canReorderContentDidChange()}this._sccv_lastNowShowing=this.get("nowShowing").clone();
if(this.content){this._cv_contentDidChange()}if(this.selection){this._cv_selectionDidChange()
}},_cv_canReorderContentDidChange:function(){if(this.get("canReorderContent")){if(!this.get("isDropTarget")){this.set("isDropTarget",YES)
}SC.Drag.addDropTarget(this)}}.observes("canReorderContent"),_cv_performSelectAction:function(b,e,c,a){var f;
if(c===undefined){c=0}if(a===undefined){a=1}if((a>1)||this.get("actOnSelect")){if(this._cv_reselectTimer){this._cv_reselectTimer.invalidate()
}f=this.get("selection");f=f?f.toArray():[];if(this._cv_actionTimer){this._cv_actionTimer.invalidate()
}this._cv_actionTimer=this.invokeLater(this._cv_action,c,b,e,f)}},_cv_action:function(b,a,c){var e=this.get("action");
var f=this.get("target")||null;this._cv_actionTimer=null;if(e){if(SC.typeOf(e)===SC.T_FUNCTION){return this.action(b,a)
}var g=this.get("pane");if(g){g.rootResponder.sendAction(e,f,this,g,c)}}else{if(!b){return
}else{if(SC.typeOf(b._action)==SC.T_FUNCTION){return b._action(a)}else{if(SC.typeOf(b.action)==SC.T_FUNCTION){return b.action(a)
}}}}}});SC.DisclosureView=SC.ButtonView.extend({classNames:["sc-disclosure-view"],theme:"disclosure",buttonBehavior:SC.TOGGLE_BEHAVIOR,toggleOnValue:YES,toggleOffValue:NO,valueBindingDefault:SC.Binding.bool(),render:function(a,b){if(b){a.push('<img src="',SC.BLANK_IMAGE_URL,'" class="button" alt="" />');
if(this.get("needsEllipsis")){a.push('<label class="ellipsis">',this.get("displayTitle"),"</label>")
}else{a.push("<label>",this.get("displayTitle"),"</label>")}}else{this.$("label")[0].text=this.get("displayTitle")
}},keyDown:function(a){if(a.which===37||a.which===38){this.set("value",this.get("toggleOffValue"));
return YES}if(a.which===39||a.which===40){this.set("value",this.get("toggleOnValue"));
return YES}arguments.callee.base.apply(this,arguments)}});sc_require("views/collection");
sc_require("mixins/collection_row_delegate");SC.ListView=SC.CollectionView.extend(SC.CollectionRowDelegate,{classNames:["sc-list-view"],acceptsFirstResponder:YES,showAlternatingRows:NO,render:function(a,b){a.setClass("alternating",this.get("showAlternatingRows"));
return arguments.callee.base.apply(this,arguments)},rowDelegate:function(){var a=this.delegate,b=this.get("content");
return this.delegateFor("isCollectionRowDelegate",a,b)}.property("delegate","content").cacheable(),_sclv_rowDelegateDidChange:function(){var e=this._sclv_rowDelegate,b=this.get("rowDelegate"),c=this._sclv_rowHeightDidChange,a=this._sclv_customRowHeightIndexesDidChange;
if(e===b){return this}this._sclv_rowDelegate=b;if(e){e.removeObserver("rowHeight",this,c);
e.removeObserver("customRowHeightIndexes",this,a)}if(!b){throw"Internal Inconsistancy: ListView must always have CollectionRowDelegate"
}b.addObserver("rowHeight",this,c);b.addObserver("customRowHeightIndexes",this,a);
this._sclv_rowHeightDidChange()._sclv_customRowHeightIndexesDidChange();return this
}.observes("rowDelegate"),_sclv_rowHeightDidChange:function(){var b=this.get("rowDelegate"),a=b.get("rowHeight"),c;
if(a===this._sclv_rowHeight){return this}this._sclv_rowHeight=a;c=SC.IndexSet.create(0,this.get("length"));
this.rowHeightDidChangeForIndexes(c);return this},_sclv_customRowHeightIndexesDidChange:function(){var a=this.get("rowDelegate"),b=a.get("customRowHeightIndexes"),e=this._sclv_customRowHeightIndexes,c=this._sclv_customRowHeightIndexesContentDidChange;
if((b===e)||(e&&e.isEqual(b))){return this}if(e&&this._sclv_isObservingCustomRowHeightIndexes){e.removeObserver("[]",this,c)
}if(this._sclv_isObservingCustomRowHeightIndexes=b&&!b.get("isFrozen")){b.addObserver("[]",this,c)
}this._sclv_customRowHeightIndexesContentDidChange();return this},_sclv_customRowHeightIndexesContentDidChange:function(){var a=this.get("rowDelegate"),b=a.get("customRowHeightIndexes"),c=this._sclv_customRowHeightIndexes,e;
if(b&&c){e=b.copy().add(c)}else{e=b||c}this._sclv_customRowHeightIndexes=b?b.frozenCopy():null;
this.rowHeightDidChangeForIndexes(e);return this},rowOffsetForContentIndex:function(h){if(h===0){return 0
}var j=this.get("rowDelegate"),a=j.get("rowHeight"),f,c,b,i,g,e;f=h*a;if(this.get("rowSpacing")){f+=h*this.get("rowSpacing")
}if(j.customRowHeightIndexes&&(c=j.get("customRowHeightIndexes"))){b=this._sclv_offsetCache;
if(!b){b=this._sclv_offsetCache=[];i=g=0;c.forEach(function(l){i+=this.rowHeightForContentIndex(l)-a;
b[l+1]=i;g=l},this);this._sclv_max=g+1}i=b[h];if(i===undefined){i=b[h]=b[h-1];if(i===undefined){g=this._sclv_max;
if(h<g){g=c.indexBefore(h)+1}i=b[h]=b[g]||0}}f+=i}return f},rowHeightForContentIndex:function(a){var b=this.get("rowDelegate"),f,c,g,e;
if(b.customRowHeightIndexes&&(e=b.get("customRowHeightIndexes"))){c=this._sclv_heightCache;
if(!c){c=this._sclv_heightCache=[];g=this.get("content");e.forEach(function(h){c[h]=b.contentIndexRowHeight(this,g,h)
},this)}f=c[a];if(f===undefined){f=b.get("rowHeight")}}else{f=b.get("rowHeight")}return f
},rowHeightDidChangeForIndexes:function(b){var a=this.get("length");this._sclv_heightCache=this._sclv_offsetCache=null;
if(b&&b.isIndexSet){b=b.get("min")}this.reload(SC.IndexSet.create(b,a-b));return this
},computeLayout:function(){var a=this._sclv_layout;if(!a){a=this._sclv_layout={}}a.minHeight=this.rowOffsetForContentIndex(this.get("length"))+4;
this.set("calculatedHeight",a.minHeight);return a},layoutForContentIndex:function(a){return{top:this.rowOffsetForContentIndex(a),height:this.rowHeightForContentIndex(a),left:0,right:0}
},contentIndexesInRect:function(i){var a=this.get("rowDelegate").get("rowHeight"),h=SC.minY(i),b=SC.maxY(i),j=i.height||0,g=this.get("length"),f,c,e;
c=(h-(h%a))/a;f=this.rowOffsetForContentIndex(c);while(c>0&&f>=h){c--;f-=this.rowHeightForContentIndex(c)
}f+=this.rowHeightForContentIndex(c);while(c<g&&f<h){f+=this.rowHeightForContentIndex(c);
c++}if(c<0){c=0}if(c>=g){c=g}e=c+((j-(j%a))/a);if(e>g){e=g}f=this.rowOffsetForContentIndex(e);
while(e>=c&&f>=b){e--;f-=this.rowHeightForContentIndex(e)}f+=this.rowHeightForContentIndex(e);
while(e<g&&f<=b){f+=this.rowHeightForContentIndex(e);e++}e++;if(e<c){e=c}if(e>g){e=g
}return SC.IndexSet.create(c,e-c)},insertionPointView:SC.View.extend({classNames:"sc-list-insertion-point",render:function(a,b){if(b){a.push('<div class="anchor"></div>')
}}}),showInsertionPoint:function(h,g){var i=this._insertionPointView;if(!i){i=this._insertionPointView=this.get("insertionPointView").create()
}var e=h.get("contentIndex"),f=this.get("length"),c=SC.clone(h.get("layout")),a=h.get("outlineLevel"),b=h.get("outlineIndent")||0,j;
if((e>=f)&&e>0){j=this.itemViewForContentIndex(f-1);if(j.get("isGroupView")){a=1;
b=j.get("outlineIndent")}}if(SC.none(a)){a=-1}if(g&SC.DROP_ON){this.hideInsertionPoint();
h.set("isSelected",YES);this._lastDropOnView=h}else{if(this._lastDropOnView){this._lastDropOnView.set("isSelected",NO);
this._lastDropOnView=null}if(g&SC.DROP_AFTER){c.top+=c.height}c.height=2;c.right=0;
c.left=((a+1)*b)+12;delete c.width;i.set("layout",c);this.appendChild(i)}},hideInsertionPoint:function(){if(this._lastDropOnView){this._lastDropOnView.set("isSelected",NO);
this._lastDropOnView=null}var a=this._insertionPointView;if(a){a.removeFromParent().destroy()
}this._insertionPointView=null},insertionIndexForLocation:function(g,l){var f=this.contentIndexesInRect(g),h=f.get("min"),i=this.get("length"),b,m,n,e,p,c,o,j,a;
if(SC.none(h)||h<0){if((i===0)||(g.y<=this.rowOffsetForContentIndex(0))){h=0}else{if(g.y>=this.rowOffsetForContentIndex(i)){h=i
}}}b=this.rowOffsetForContentIndex(h);m=b+this.rowHeightForContentIndex(h);if(l==SC.DROP_ON){if(this.get("isEditable")){n=Math.min(Math.floor((m-b)*0.2),5)
}else{n=0}if(g.y>=(b+n)||g.y<=(m+n)){return[h,SC.DROP_ON]}}if((h<i)&&(g.y>=m-10)){h++
}if(h>0){j=this.itemViewForContentIndex(h-1);o=(j?j.get("outlineIndent"):0)||0;c=j?j.get("outlineLevel"):0;
if(h<i){j=this.itemViewForContentIndex(h);e=j?j.get("outlineLevel"):0;p=(j?j.get("outlineIndent"):0)||0;
p*=e}else{e=j.get("isGroupView")?1:0;p=o*e}o*=c;if((e!==c)&&(p!==o)){if(o>p){h--;
l=SC.DROP_AFTER}}}if(l===SC.DROP_BEFORE){j=(h<i)?this.itemViewForContentIndex(h):null;
if(!j||j.get("isGroupView")){if(h>0){j=this.itemViewForContentIndex(h-1);if(!j.get("isGroupView")||(j.get("disclosureState")===SC.BRANCH_OPEN)){h=h-1;
l=SC.DROP_AFTER}else{h=-1}}else{h=-1}}if(h<0){l=SC.DRAG_NONE}}return[h,l]},init:function(){arguments.callee.base.apply(this,arguments);
this._sclv_rowDelegateDidChange()}});require("views/list");SC.GridView=SC.ListView.extend({classNames:["sc-grid-view"],layout:{left:0,right:0,top:0,bottom:0},rowHeight:48,columnWidth:64,exampleView:SC.LabelView,insertionOrientation:SC.HORIZONTAL_ORIENTATION,itemsPerRow:function(){var b=this.get("frame");
var a=this.get("columnWidth")||0;return(a<=0)?1:Math.floor(b.width/a)}.property("clippingFrame","columnWidth").cacheable(),contentIndexesInRect:function(f){var e=this.get("rowHeight")||48;
var b=this.get("itemsPerRow");var c=Math.floor(SC.minY(f)/e)*b;var a=Math.ceil(SC.maxY(f)/e)*b;
return SC.IndexSet.create(c,a-c)},layoutForContentIndex:function(h){var e=this.get("rowHeight")||48;
var a=this.get("clippingFrame").width;var b=this.get("itemsPerRow");var f=Math.floor(a/b);
var g=Math.floor(h/b);var c=h-(b*g);return{left:c*f,top:g*e,height:e,width:f}},computeLayout:function(){var f=this.get("content");
var e=(f)?f.get("length"):0;var c=this.get("rowHeight")||48;var a=this.get("itemsPerRow");
var g=Math.ceil(e/a);var b=this._cachedLayoutHash;if(!b){b=this._cachedLayoutHash={}
}b.minHeight=g*c;this.calculatedHeight=b.minHeight;return b},insertionPointClass:SC.View.extend({classNames:["grid-insertion-point"],render:function(a,b){if(b){a.push('<span class="anchor"></span>')
}}}),showInsertionPoint:function(c,g){if(!c){return}if(g===SC.DROP_ON){if(c!==this._dropOnInsertionPoint){this.hideInsertionPoint();
c.addClassName("drop-target");this._dropOnInsertionPoint=c}}else{if(this._dropOnInsertionPoint){this._dropOnInsertionPoint.removeClassName("drop-target");
this._dropOnInsertionPoint=null}if(!this._insertionPointView){this._insertionPointView=this.insertionPointClass.create()
}var b=this._insertionPointView;var a=c.get("frame");var e={height:a.height-6,x:a.x,y:a.y+6,width:0};
if(!SC.rectsEqual(b.get("frame"),e)){b.set("frame",e)}if(b.parentNode!=c.parentNode){c.parentNode.appendChild(b)
}}},hideInsertionPoint:function(){var a=this._insertionPointView;if(a){a.removeFromParent()
}if(this._dropOnInsertionPoint){this._dropOnInsertionPoint.removeClassName("drop-target");
this._dropOnInsertionPoint=null}},insertionIndexForLocation:function(e,l){var g=this.get("frame");
var h=this.get("scrollFrame");var m=this.get("itemsPerRow");var a=Math.floor(g.width/m);
var o=Math.floor((e.y-g.y-h.y)/this.get("rowHeight"));var j=SC.DROP_BEFORE;var c=(e.x-g.x-h.x);
var b=Math.floor(c/a);var n=(c/a)-b;if(l===SC.DROP_ON){if(n>0.8){b++}if((n>=0.2)&&(n<=0.8)){j=SC.DROP_ON
}}else{if(n>0.45){b++}}var i=(o*m)+b;return[i,j]},_gv_clippingFrameDidChange:function(){var e=this.get("nowShowing"),c,b,a;
this.notifyPropertyChange("itemsPerRow");a=e.get("length");for(b=0;b<a;b++){c=this.itemViewForContentIndex(b);
c.adjust(this.layoutForContentIndex(b))}}.observes("clippingFrame")});SC.NATURAL_SCROLLER_THICKNESS=16;
SC.ScrollerView=SC.View.extend({classNames:["sc-scroller-view"],scrollerThickness:SC.NATURAL_SCROLLER_THICKNESS,value:function(a,c){if(c!==undefined){if(c>=0){this._value=c
}}else{var b=this._value||0;return Math.min(b,this.get("maximum"))}}.property("maximum").cacheable(),maximum:0,isEnabled:YES,layoutDirection:SC.LAYOUT_VERTICAL,ownerScrollValueKey:function(){var a=null;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:a="verticalScrollOffset";
break;case SC.LAYOUT_HORIZONTAL:a="horizontalScrollOffset";break;default:a=null}return a
}.property("layoutDirection").cacheable(),displayProperties:"maximum isEnabled layoutDirection".w(),render:function(b,c){var a=this.get("maximum");
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:b.addClass("sc-vertical");
if(c){b.push('<div class="sc-inner" style="height: %@px;">&nbsp;</div>'.fmt(a))}else{this.$("div")[0].style.height=a+"px"
}break;case SC.LAYOUT_HORIZONTAL:b.addClass("sc-horizontal");if(c){b.push('<div class="sc-inner" style="width: %@px;">&nbsp;</div>'.fmt(a))
}else{this.$("div")[0].style.width=a+"px"}break;default:throw"You must set a layoutDirection for your scroller class."
}b.setClass("disabled",!this.get("isEnabled"))},didCreateLayer:function(){var c=this._sc_scroller_scrollDidChange;
SC.Event.add(this.$(),"scroll",this,c);var b=this.get("value");var a=this.get("layer");
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:a.scrollTop=b;break;case SC.LAYOUT_HORIZONTAL:a.scrollLeft=b;
break}},willDestroyLayer:function(){var a=this._sc_scroller_scrollDidChange;SC.Event.remove(this.$(),"scroll",this,a)
},_sc_scroller_armScrollTimer:function(){if(!this._sc_scrollTimer){SC.RunLoop.begin();
var a=this._sc_scroller_scrollDidChange;this._sc_scrollTimer=this.invokeLater(a,50);
SC.RunLoop.end()}},_sc_scroller_scrollDidChange:function(){var b=Date.now(),e=this._sc_lastScroll;
if(e&&(b-e)<50){return this._sc_scroller_armScrollTimer()}this._sc_scrollTimer=null;
this._sc_lastScroll=b;SC.RunLoop.begin();if(!this.get("isEnabled")){return}var c=this.get("layer"),a=0;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:this._sc_scrollValue=a=c.scrollTop;
break;case SC.LAYOUT_HORIZONTAL:this._sc_scrollValue=a=c.scrollLeft;break}this.set("value",a);
SC.RunLoop.end()},_sc_scroller_valueDidChange:function(){var a=this.get("value");
if(a!==this._sc_scrollValue){var b=this.get("layer");if(b){switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:b.scrollTop=a;
break;case SC.LAYOUT_HORIZONTAL:b.scrollLeft=a;break}}}}.observes("value")});sc_require("views/scroller");
sc_require("mixins/border");SC.ScrollView=SC.View.extend(SC.Border,{classNames:["sc-scroll-view"],isScrollable:YES,contentView:null,horizontalScrollOffset:0,verticalScrollOffset:0,maximumHorizontalScrollOffset:function(){if(!this.get("canScrollHorizontal")){return 0
}var b=this.get("contentView");var a=b?b.get("frame").width:0;if(b.calculatedWidth&&b.calculatedWidth!==0){a=b.calculatedWidth
}var c=this.get("containerView").get("frame").width;return Math.max(0,a-c)}.property(),maximumVerticalScrollOffset:function(){if(!this.get("canScrollVertical")){return 0
}var a=this.get("contentView");var b=(a&&a.get("frame"))?a.get("frame").height:0;
if(a.calculatedHeight&&a.calculatedHeight!==0){b=a.calculatedHeight}var c=this.get("containerView").get("frame").height;
return Math.max(0,b-c)}.property(),verticalLineScroll:20,horizontalLineScroll:20,verticalPageScroll:function(){return this.get("frame").height
}.property("frame"),horizontalPageScroll:function(){return this.get("frame").width
}.property("frame"),hasHorizontalScroller:YES,horizontalScrollerView:SC.ScrollerView,isHorizontalScrollerVisible:YES,canScrollHorizontal:function(){return !!(this.get("hasHorizontalScroller")&&this.get("horizontalScrollerView")&&this.get("isHorizontalScrollerVisible"))
}.property("isHorizontalScrollerVisible").cacheable(),autohidesHorizontalScroller:YES,hasVerticalScroller:YES,verticalScrollerView:SC.ScrollerView,isVerticalScrollerVisible:YES,canScrollVertical:function(){return !!(this.get("hasVerticalScroller")&&this.get("verticalScrollerView")&&this.get("isVerticalScrollerVisible"))
}.property("isVerticalScrollerVisible").cacheable(),autohidesVerticalScroller:YES,verticalScrollerBottom:0,containerView:SC.ContainerView,scrollTo:function(a,b){if(b===undefined&&SC.typeOf(a)===SC.T_HASH){b=a.y;
a=a.x}if(!SC.none(a)){a=Math.max(0,Math.min(this.get("maximumHorizontalScrollOffset"),a));
this.set("horizontalScrollOffset",a)}if(!SC.none(b)){b=Math.max(0,Math.min(this.get("maximumVerticalScrollOffset"),b));
this.set("verticalScrollOffset",b)}return this},scrollBy:function(a,b){if(b===undefined&&SC.typeOf(a)===SC.T_HASH){b=a.y;
a=a.x}a=(a)?this.get("horizontalScrollOffset")+a:null;b=(b)?this.get("verticalScrollOffset")+b:null;
return this.scrollTo(a,b)},scrollToVisible:function(b){if(arguments.length===0){return arguments.callee.base.apply(this,arguments)
}var e=this.get("contentView");if(!e){return NO}var a=b.get("frame");if(!a){return NO
}a=e.convertFrameFromView(a,b.get("parentView"));var c=SC.cloneRect(this.get("containerView").get("frame"));
c.x=this.get("horizontalScrollOffset");c.y=this.get("verticalScrollOffset");var g=c.x,f=c.y;
c.y-=Math.max(0,SC.minY(c)-SC.minY(a));c.x-=Math.max(0,SC.minX(c)-SC.minX(a));c.y+=Math.max(0,SC.maxY(a)-SC.maxY(c));
c.x+=Math.max(0,SC.maxX(a)-SC.maxX(c));if((g!==c.x)||(f!==c.y)){this.scrollTo(c.x,c.y);
return YES}else{return NO}},scrollDownLine:function(a){if(a===undefined){a=1}return this.scrollBy(null,this.get("verticalLineScroll")*a)
},scrollUpLine:function(a){if(a===undefined){a=1}return this.scrollBy(null,0-this.get("verticalLineScroll")*a)
},scrollRightLine:function(a){if(a===undefined){a=1}return this.scrollTo(this.get("horizontalLineScroll")*a,null)
},scrollLeftLine:function(a){if(a===undefined){a=1}return this.scrollTo(0-this.get("horizontalLineScroll")*a,null)
},scrollDownPage:function(a){if(a===undefined){a=1}return this.scrollBy(null,this.get("verticalPageScroll")*a)
},scrollUpPage:function(a){if(a===undefined){a=1}return this.scrollBy(null,0-(this.get("verticalPageScroll")*a))
},scrollRightPage:function(a){if(a===undefined){a=1}return this.scrollBy(this.get("horizontalPageScroll")*a,null)
},scrollLeftPage:function(a){if(a===undefined){a=1}return this.scrollBy(0-(this.get("horizontalPageScroll")*a),null)
},tile:function(){var a=this.get("hasHorizontalScroller")?this.get("horizontalScrollerView"):null;
var e=a&&this.get("isHorizontalScrollerVisible");var g=this.get("hasVerticalScroller")?this.get("verticalScrollerView"):null;
var c=g&&this.get("isVerticalScrollerVisible");var b=this.get("containerView");var j={left:0,top:0};
var i;var f=((e)?a.get("scrollerThickness"):0);var h=(c)?g.get("scrollerThickness"):0;
if(e){a.set("layout",{left:0,bottom:0,right:h-1,height:f});j.bottom=f-1}else{j.bottom=0
}if(a){a.set("isVisible",e)}if(c){f=f+this.get("verticalScrollerBottom");g.set("layout",{top:0,bottom:f,right:0,width:h});
j.right=h-1}else{j.right=0}if(g){g.set("isVisible",c)}b.set("layout",j)},scrollerVisibilityDidChange:function(){this.tile()
}.observes("isVerticalScrollerVisible","isHorizontalScrollerVisible"),_scroll_wheelDeltaX:0,_scroll_wheelDeltaY:0,mouseWheel:function(a){this._scroll_wheelDeltaX+=a.wheelDeltaX;
this._scroll_wheelDeltaY+=a.wheelDeltaY;this.invokeLater(this._scroll_mouseWheel,10);
return this.get("canScrollHorizontal")||this.get("canScrollVertical")},_scroll_mouseWheel:function(){this.scrollBy(this._scroll_wheelDeltaX,this._scroll_wheelDeltaY);
this._scroll_wheelDeltaX=this._scroll_wheelDeltaY=0},createChildViews:function(){var b=[],a;
if(SC.none(a=this.containerView)){a=SC.ContainerView}b.push(this.containerView=this.createChildView(a,{contentView:this.contentView}));
this.contentView=this.containerView.get("contentView");if(a=this.horizontalScrollerView){if(this.get("hasHorizontalScroller")){a=this.horizontalScrollerView=this.createChildView(a,{layoutDirection:SC.LAYOUT_HORIZONTAL,valueBinding:"*owner.horizontalScrollOffset"});
b.push(a)}else{this.horizontalScrollerView=null}}if(a=this.verticalScrollerView){if(this.get("hasVerticalScroller")){a=this.verticalScrollerView=this.createChildView(a,{layoutDirection:SC.LAYOUT_VERTICAL,valueBinding:"*owner.verticalScrollOffset"});
b.push(a)}else{this.verticalScrollerView=null}}this.childViews=b;this.contentViewDidChange();
this.tile()},init:function(){arguments.callee.base.apply(this,arguments);this._scroll_contentView=this.get("contentView");
var a=this._scroll_contentView;if(a){a.addObserver("frame",this,this.contentViewFrameDidChange)
}if(this.get("isVisibleInWindow")){this._scsv_registerAutoscroll()}},_scsv_registerAutoscroll:function(){if(this.get("isVisibleInWindow")){SC.Drag.addScrollableView(this)
}else{SC.Drag.removeScrollableView(this)}}.observes("isVisibleInWindow"),contentViewDidChange:function(){var c=this.get("contentView"),a=this._scroll_contentView;
var b=this.contentViewFrameDidChange;if(c!==a){if(a){a.removeObserver("frame",this,b)
}this._scroll_contentView=c;if(c){c.addObserver("frame",this,b)}this.containerView.set("contentView",c);
this.contentViewFrameDidChange()}}.observes("contentView"),oldMaxHOffset:0,oldMaxVOffset:0,contentViewFrameDidChange:function(){var l=this.get("contentView"),j=(l)?l.get("frame"):null,b=(j)?j.width:0,n=(j)?j.height:0,h=this.get("frame");
this._scroll_contentWidth=b;this._scroll_contentHeight=n;if(this.get("hasHorizontalScroller")&&(l=this.get("horizontalScrollerView"))){b-=1;
if(this.get("autohidesHorizontalScroller")){this.set("isHorizontalScrollerVisible",b>h.width)
}l.setIfChanged("maximum",b)}if(this.get("hasVerticalScroller")&&(l=this.get("verticalScrollerView"))){n-=1;
if(this.get("autohidesVerticalScroller")){this.set("isVerticalScrollerVisible",n>h.height)
}n-=this.get("verticalScrollerBottom");l.setIfChanged("maximum",n)}if(!this.get("isVerticalScrollerVisible")&&(this.get("verticalScrollOffset")!==0)&&this.get("autohidesVerticalScroller")){this.set("verticalScrollOffset",0)
}if(!this.get("isHorizontalScrollerVisible")&&(this.get("horizontalScrollOffset")!==0)&&this.get("autohidesHorizontalScroller")){this.set("horizontalScrollOffset",0)
}var m=this.get("maximumVerticalScrollOffset"),i=this.get("verticalScrollOffset"),g=this.get("maximumHorizontalScrollOffset"),a=this.get("horizontalScrollOffset");
var e=m<i;var c=g<a;if(e||c){this.forceDimensionsRecalculation(c,e,i,a)}},_scroll_horizontalScrollOffsetDidChange:function(){var b=this.get("horizontalScrollOffset");
b=Math.max(0,Math.min(this.get("maximumHorizontalScrollOffset"),b));var a=this.get("contentView");
if(a){a.adjust("left",0-b)}}.observes("horizontalScrollOffset"),_scroll_verticalScrollOffsetDidChange:function(){var c=this.get("verticalScrollOffset");
c=Math.max(0,Math.min(this.get("maximumVerticalScrollOffset"),c));var b=this.get("contentView");
var a=this.get("containerView");if(b){b.adjust("top",0-c)}}.observes("verticalScrollOffset"),forceDimensionsRecalculation:function(b,c,f,a){var g=a;
var e=f;this.scrollTo(0,0);if(b&&c){this.scrollTo(this.get("maximumHorizontalScrollOffset"),this.get("maximumVerticalScrollOffset"))
}if(b&&!c){this.scrollTo(this.get("maximumHorizontalScrollOffset"),e)}if(!b&&c){this.scrollTo(g,this.get("maximumVerticalScrollOffset"))
}}});sc_require("views/scroll");SC.MenuScrollerView=SC.ScrollerView.extend({classNames:["sc-menu-scroller-view"],scrollDown:NO,value:function(a,c){if(c!==undefined){this._value=c
}else{var b=this._value||0;return Math.min(b,this.get("maximum"))}}.property("maximum").cacheable(),maximum:0,isEnabled:YES,layoutDirection:SC.LAYOUT_VERTICAL,verticalLineScroll:20,ownerScrollValueKey:function(){return"verticalScrollOffset"
}.property("layoutDirection").cacheable(),render:function(a,b){a.addClass("sc-vertical");
if(b){if(this.get("scrollDown")){a.push('<span class="arrowDown">&nbsp;</span>')}else{a.push('<span class="arrowUp">&nbsp;</span>')
}}a.setClass("disabled",!this.get("isEnabled"))},didCreateLayer:function(){var c,b,a;
c=this._sc_scroller_scrollDidChange;SC.Event.add(this.$(),"scroll",this,c);b=this.get("value");
a=this.get("layer");a.scrollTop=b},willDestroyLayer:function(){var a=this._sc_scroller_scrollDidChange;
SC.Event.remove(this.$(),"scroll",this,a)},mouseEntered:function(a){this.set("isMouseOver",YES);
this._invokeScrollOnMouseOver()},mouseExited:function(a){this.set("isMouseOver",NO)
},_sc_scroller_valueDidChange:function(){}.observes("value"),_sc_scroller_armScrollTimer:function(){if(!this._sc_scrollTimer){SC.RunLoop.begin();
var a=this._sc_scroller_scrollDidChange;this._sc_scrollTimer=this.invokeLater(a,50);
SC.RunLoop.end()}},_sc_scroller_scrollDidChange:function(){var b=Date.now(),e=this._sc_lastScroll,c=this.get("layer"),a=0;
if(e&&(b-e)<50){return this._sc_scroller_armScrollTimer()}this._sc_scrollTimer=null;
this._sc_lastScroll=b;SC.RunLoop.begin();if(!this.get("isEnabled")){return}this._sc_scrollValue=a=c.scrollTop;
this.set("value",a);SC.RunLoop.end()},_scrollMenu:function(){var b=this.get("value"),a;
if(this.get("scrollDown")){a=b+this.verticalLineScroll;if(a<=this.get("maximum")){this.set("value",a)
}}else{a=b-this.verticalLineScroll;if(a>=0){this.set("value",a)}else{if(b<=this.verticalLineScroll&&b>0){this.set("value",0)
}}}return YES},_invokeScrollOnMouseOver:function(){this._scrollMenu();if(this.get("isMouseOver")){this.invokeLater(this._invokeScrollOnMouseOver,50)
}}});SC.MenuScrollView=SC.ScrollView.extend({classNames:["sc-menu-scroll-view"],maximumHorizontalScrollOffset:function(){}.property(),hasHorizontalScroller:NO,horizontalScrollerView:SC.MenuScrollerView,isHorizontalScrollerVisible:NO,canScrollHorizontal:function(){return false
}.property("isHorizontalScrollerVisible").cacheable(),autohidesHorizontalScroller:NO,hasVerticalScroller:YES,verticalScrollerView:SC.MenuScrollerView,verticalScrollerView2:SC.MenuScrollerView,isVerticalScrollerVisible:YES,canScrollVertical:function(){return YES
}.property("isVerticalScrollerVisible").cacheable(),autohidesVerticalScroller:YES,verticalScrollerBottom:0,containerView:SC.ContainerView,tile:function(){var o,q,g,e,c,t,i;
o=this.get("hasVerticalScroller");q=o?this.get("verticalScrollerView"):null;g=o?this.get("verticalScrollerView2"):null;
e=q&&this.get("isVerticalScrollerVisible");c=this.get("containerView");t={left:0,top:0};
if(e){i=0;var n=this.get("contentView"),m,j=(n)?n.get("frame"):null,s=(j)?j.height:0,b=this.containerView.$()[0],u=this.get("verticalScrollOffset"),l={height:0,top:0,right:0,left:0},a={height:this.verticalLineScroll,top:0,right:0,left:0},h={height:this.verticalLineScroll,bottom:0,right:0,left:0},p={height:0,bottom:0,right:0,left:0};
if(b){i=b.offsetHeight}if(u===0){t.top=0;t.bottom=this.verticalLineScroll;q.set("layout",l);
g.set("layout",h)}else{if(u>=(s-i-this.verticalLineScroll)){t.top=this.verticalLineScroll;
t.bottom=0;q.set("layout",a);g.set("layout",p)}else{t.top=this.verticalLineScroll;
t.bottom=this.verticalLineScroll;q.set("layout",a);g.set("layout",h)}}}if(q){q.set("isVisible",e);
g.set("isVisible",e)}c.set("layout",t)},scrollerVisibilityDidChange:function(){this.tile()
}.observes("isVerticalScrollerVisible","isHorizontalScrollerVisible","verticalScrollOffset"),createChildViews:function(){var c=[],b,a;
if(SC.none(b=this.containerView)){b=SC.ContainerView}c.push(this.containerView=this.createChildView(b,{contentView:this.contentView}));
this.contentView=this.containerView.get("contentView");if((b=this.verticalScrollerView)&&(a=this.verticalScrollerView2)){if(this.get("hasVerticalScroller")){b=this.verticalScrollerView=this.createChildView(b,{layout:{top:0,left:0,right:0,height:this.verticalLineScroll},valueBinding:"*owner.verticalScrollOffset"});
c.push(b);a=this.verticalScrollerView2=this.createChildView(a,{scrollDown:YES,layout:{bottom:0,left:0,right:0,height:this.verticalLineScroll},valueBinding:"*owner.verticalScrollOffset"});
c.push(a)}else{this.verticalScrollerView=null;this.verticalScrollerView2=null}}this.childViews=c;
this.contentViewFrameDidChange();this.tile()},init:function(){arguments.callee.base.apply(this,arguments);
this._scroll_contentView=this.get("contentView");var a=this._scroll_contentView;if(a){a.addObserver("frame",this,this.contentViewFrameDidChange)
}if(this.get("isVisibleInWindow")){this._scsv_registerAutoscroll()}},_scsv_registerAutoscroll:function(){if(this.get("isVisibleInWindow")){SC.Drag.addScrollableView(this)
}else{SC.Drag.removeScrollableView(this)}}.observes("isVisibleInWindow"),contentViewDidChange:function(){var c=this.get("contentView"),a=this._scroll_contentView,b=this.contentViewFrameDidChange;
if(c!==a){if(a){a.removeObserver("frame",this,b)}this._scroll_contentView=c;if(c){c.addObserver("frame",this,b)
}this.containerView.set("content",c);this.contentViewFrameDidChange()}}.observes("contentView"),contentViewFrameDidChange:function(){var c=this.get("contentView"),b,i=(c)?c.get("frame"):null,g=(i)?i.width:0,a=(i)?i.height:0,j=this.get("frame"),e,h;
this._scroll_contentWidth=g;this._scroll_contentHeight=a;if(this.get("hasVerticalScroller")&&(c=this.get("verticalScrollerView"))&&(b=this.get("verticalScrollerView2"))){a-=1;
if(this.get("autohidesVerticalScroller")){this.set("isVerticalScrollerVisible",a>j.height)
}a-=this.get("verticalScrollerBottom");e=0;h=this.containerView.$()[0];if(h){e=h.offsetHeight
}a=a-e;c.setIfChanged("maximum",a);b.setIfChanged("maximum",a)}},_scroll_horizontalScrollOffsetDidChange:function(){}.observes("horizontalScrollOffset"),_scroll_verticalScrollOffsetDidChange:function(){var b=this.get("verticalScrollOffset");
var a=this.get("contentView");if(a){a.adjust("top",0-b)}}.observes("verticalScrollOffset")});
sc_require("views/button");SC.PopupButtonView=SC.ButtonView.extend({keyEquivalent:null,classNames:["sc-popup-button"],preferMatrix:null,acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),isSelected:NO,performKeyEquivalent:function(b,a){if(!this.get("isEnabled")){return NO
}var c=this.get("menu");return(!!c&&c.performKeyEquivalent(b,a))},menu:null,isSelectedBinding:"*menu.isVisibleInWindow",action:function(a){var b=this.get("menu");
if(!b){return NO}b.popup(this,this.preferMatrix);return YES},mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;this._action();return YES}});SC.ProgressView=SC.View.extend(SC.Control,{value:0.5,valueBindingDefault:SC.Binding.single().notEmpty(),minimum:0,minimumBindingDefault:SC.Binding.single().notEmpty(),contentMinimumKey:null,maximum:1,maximumBindingDefault:SC.Binding.single().notEmpty(),offsetRange:24,contentMaximumKey:null,isIndeterminate:NO,isIndeterminateBindingDefault:SC.Binding.bool(),isRunning:NO,isRunningBindingDefault:SC.Binding.bool(),animatedBackgroundMatrix:[],contentIsIndeterminateKey:null,classNames:"sc-progress-view",_backgroundOffset:0,_currentBackground:1,_nextBackground:1,init:function(){arguments.callee.base.apply(this,arguments);
this.animateProgressBar()},animateProgressBar:function(){if(this.get("isRunning")&&this.get("isVisibleInWindow")){this._animateProgressBar(500)
}}.observes("isRunning","isVisibleInWindow"),_animateProgressBar:function(a){if(a===0){a=1000/30
}if(this.get("isRunning")&&this.get("isVisibleInWindow")){this.displayDidChange();
this.invokeLater(this._animateProgressBar,a,10)}},displayProperties:"value minimum maximum isIndeterminate".w(),render:function(c,b){var s,g,o,e,j,h=this.get("isIndeterminate"),q=this.get("isRunning"),n=this.get("isEnabled"),p=this.get("offsetRange"),i=(h&&q)?(Math.floor(Date.now()/75)%p-p):0;
if(!n){o="0%"}else{if(h){o="120%"}else{var l=this.get("minimum")||0;var f=this.get("maximum")||1;
o=this.get("value")||0;o=(o-l)/(f-l);if(o>1){o=1}if(isNaN(o)){o=0}if(o<l){o=0}if(o>f){o=1
}o=(o*100)+"%"}}var a={"sc-indeterminate":h,"sc-empty":(o<=0),"sc-complete":(o>=100)};
if(b){var m=this._createClassNameString(a);c.push('<div class="sc-inner ',m,'" style="width: ',o,";left: ",i,'">');
c.push('<div class="sc-inner-head"></div><div class="sc-inner-tail"></div></div><div class="sc-outer-head"></div><div class="sc-outer-tail"></div>')
}else{c.setClass(a);s=this.$(".sc-inner");g=this.get("animatedBackgroundMatrix");
e="width: "+o+"; ";e=e+"left: "+i+"; ";if(g.length===3){j="0px -"+(g[0]+g[1]*this._currentBackground)+"px";
if(this._currentBackground===g[2]-1||this._currentBackground===0){this._nextBackground*=-1
}this._currentBackground+=this._nextBackground;e=e+"backgroundPosition: "+j+"; ";
s.attr("style",e)}else{s.attr("style",e)}}},contentPropertyDidChange:function(c,a){var b=this.get("content");
this.beginPropertyChanges().updatePropertyFromContent("value",a,"contentValueKey",b).updatePropertyFromContent("minimum",a,"contentMinimumKey",b).updatePropertyFromContent("maximum",a,"contentMaximumKey",b).updatePropertyFromContent("isIndeterminate",a,"contentIsIndeterminateKey",b).endPropertyChanges()
},_createClassNameString:function(c){var b=[],a;for(a in c){if(!c.hasOwnProperty(a)){continue
}if(c[a]){b.push(a)}}return b.join(" ")}});SC.RadioView=SC.FieldView.extend({classNames:["sc-radio-view"],value:null,layoutDirection:SC.LAYOUT_VERTICAL,escapeHTML:YES,items:[],itemTitleKey:null,itemValueKey:null,itemIsEnabledKey:null,itemIconKey:null,displayItems:function(){var f=this.get("items"),b=this.get("localize"),q=this.get("itemTitleKey"),p=this.get("itemValueKey"),c=this.get("itemIsEnabledKey"),n=this.get("itemIconKey");
var e=[],h=(f)?f.get("length"):0;var o,i,m,l,a,j,g;for(l=0;l<h;l++){o=f.objectAt(l);
if(SC.typeOf(o)===SC.T_ARRAY){i=o[0];m=o[1]}else{if(o){if(q){i=o.get?o.get(q):o[q]
}else{i=(o.toString)?o.toString():null}if(p){m=o.get?o.get(p):o[p]}else{m=o}if(c){j=o.get?o.get(c):o[c]
}else{j=YES}if(n){g=o.get?o.get(n):o[n]}else{g=null}}else{i=m=g=null;j=NO}}if(b){i=i.loc()
}e.push([i,m,j,g])}return e}.property("items","itemTitleKey","itemValueKey","itemIsEnabledKey","localize","itemIconKey").cacheable(),itemsDidChange:function(){if(this._items){this._items.removeObserver("[]",this,this.itemContentDidChange)
}this._items=this.get("items");if(this._items){this._items.addObserver("[]",this,this.itemContentDidChange)
}this.itemContentDidChange()}.observes("items"),itemContentDidChange:function(){this.notifyPropertyChange("displayItems")
},$input:function(){return this.$("input")},displayProperties:["value","displayItems"],render:function(f,a){var q,p,m,c,s,e,l,h,g,n,b,j=this.get("displayItems"),o=this.get("value"),i=SC.isArray(o);
f.addClass(this.get("layoutDirection"));if(i&&o.length<=0){o=o[0];i=NO}if(a){c=SC.guidFor(this);
s=j.length;for(p=0;p<s;p++){q=j[p];m=q[3];if(m){e=(m.indexOf("/")>=0)?m:SC.BLANK_IMAGE_URL;
l=(e===m)?"":m;m='<img src="%@" class="icon %@" alt="" />'.fmt(e,l)}else{m=""}b=this._getSelectionState(q,o,i,false);
h=(!q[2])||(!this.get("isEnabled"))?'disabled="disabled" ':"";g=this.escapeHTML?SC.RenderContext.escapeHTML(q[0]):q[0];
f.push('<label class="sc-radio-button ',b,'">');f.push('<input type="radio" value="',p,'" name="',c,'" ',h,"/>");
f.push('<span class="button"></span>');f.push('<span class="sc-button-label">',m,g,"</span></label>")
}this._field_setFieldValue(this.get("value"))}else{this.$input().forEach(function(t){t=this.$(t);
p=parseInt(t.val(),0);q=(p>=0)?j[p]:null;t.attr("disabled",(!q[2])?"disabled":null);
n=this._getSelectionState(q,o,i,true);t.parent().setClass(n);t=p=n=null},this)}},_getSelectionState:function(e,g,a,b){var f,i,c;
if(e){f=(a)?(g.indexOf(e[1])>=0):(g===e[1])}else{f=NO}i={sel:(f&&!a),mixed:(f&&a),disabled:(!e[2])};
if(b){return i}else{var h=[];for(c in i){if(!i.hasOwnProperty(c)){continue}if(i[c]){h.push(c)
}}return h.join(" ")}},getFieldValue:function(){var b=this.$input().filter(function(){return this.checked
}).val();var a=this.get("displayItems");b=a[parseInt(b,0)];return b?b[1]:this._mixedValue
},setFieldValue:function(c){if(SC.isArray(c)){if(c.get("length")>1){this._mixedValue=c;
c=undefined}else{c=c.objectAt(0)}}var b,a;if(c===undefined){a=-1}else{b=this.get("displayItems");
a=b.indexOf(b.find(function(e){return e[1]===c}))}this.$input().forEach(function(e){e=SC.$(e);
e.attr("checked",parseInt(e.val(),0)===a);e=null});return this},didCreateLayer:function(){this.setFieldValue(this.get("fieldValue"));
var c=this.$input();for(var a=0,b=c.length;a<b;a++){SC.Event.add(c[a],"click",this,this._field_fieldValueDidChange)
}},willDestroyLayer:function(){var c=this.$input();for(var a=0,b=c.length;a<b;a++){SC.Event.remove(this.$input()[a],"click",this,this._field_fieldValueDidChange)
}},mouseDown:function(a){var b=a.target;while(b){if(b.className&&b.className.indexOf("sc-radio-button")>-1){break
}b=b.parentNode}if(!b){return NO}b=this.$(b);b.addClass("active");this._activeRadioButton=b;
this._field_isMouseDown=YES;return YES},mouseUp:function(a){var b=this._activeRadioButton;
if(b){b.removeClass("active");this._activeRadioButton=null}}});SC.SceneView=SC.ContainerView.extend({scenes:["master","detail"],nowShowing:null,transitionDuration:200,_state:"NO_VIEW",replaceContent:function(a){if(a&&this._state===this.READY){this.animateScene(a)
}else{this.replaceScene(a)}return this},replaceScene:function(c){var e=this._targetView,f=this.STANDARD_LAYOUT,b=this.get("scenes"),a=b?b.indexOf(this.get("nowShowing")):-1;
this._targetView=c;this._targetIndex=a;if(this._timer){this._timer.invalidate()}this._leftView=this._rightView=this._start=this._end=null;
this._timer=null;this.removeAllChildren();if(e){e.set("layout",f)}if(c){c.set("layout",f)
}if(c){this.appendChild(c)}this._state=c?this.READY:this.NO_VIEW},animateScene:function(b){var c=this._targetView,g=this._targetIndex,a=this.get("scenes"),f=a?a.indexOf(this.get("nowShowing")):-1,e;
if(g<0||f<0||g===f){return this.replaceScene(b)}this._targetView=b;this._targetIndex=f;
if(f>g){this._leftView=c;this._rightView=b;this._target=-1}else{this._leftView=b;
this._rightView=c;this._target=1}this.removeAllChildren();if(c){this.appendChild(c)
}if(b){this.appendChild(b)}this._start=Date.now();this._end=this._start+this.get("transitionDuration");
this._state=this.ANIMATING;this.tick()},tick:function(){this._timer=null;var a=Date.now(),e=(a-this._start)/(this._end-this._start),h=this._target,g=this._leftView,b=this._rightView,c,f;
if(e<0){e=0}if(!this.get("isVisibleInWindow")||(e>=1)){return this.replaceScene(this._targetView)
}c=SC.clone(this.get("frame"));f=Math.floor(c.width*e);if(h>0){c.left=0-(c.width-f);
g.set("layout",c);c=SC.clone(c);c.left=f;b.set("layout",c)}else{c.left=0-f;g.set("layout",c);
c=SC.clone(c);c.left=c.width-f;b.set("layout",c)}this._timer=this.invokeLater(this.tick,20);
return this},NO_VIEW:"NO_VIEW",ANIMATING:"ANIMATING",READY:"READY",STANDARD_LAYOUT:{top:0,left:0,bottom:0,right:0}});
SC.SegmentedView=SC.View.extend(SC.Control,{classNames:["sc-segmented-view"],value:null,isEnabled:YES,allowsEmptySelection:NO,allowsMultipleSelection:NO,localize:YES,layoutDirection:SC.LAYOUT_HORIZONTAL,items:[],itemTitleKey:null,itemValueKey:null,itemIsEnabledKey:null,itemIconKey:null,itemWidthKey:null,itemActionKey:null,itemTargetKey:null,itemKeyEquivalentKey:null,itemKeys:"itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemWidthKey itemToolTipKey".w(),displayItems:function(){var g=this.get("items"),c=this.get("localize"),m=null,e,j,f=[],h=g.get("length"),i,l,b=SC._segmented_fetchKeys,a=SC._segmented_fetchItem;
for(i=0;i<h;i++){l=g.objectAt(i);if(SC.none(l)){continue}e=SC.typeOf(l);if(e===SC.T_STRING){j=[l.humanize().titleize(),l,YES,null,null,null,i]
}else{if(e!==SC.T_ARRAY){if(m===null){m=this.itemKeys.map(b,this)}j=m.map(a,l);j[j.length]=i;
if(!m[0]&&l.toString){j[0]=l.toString()}if(!m[1]){j[1]=l}if(!m[2]){j[2]=YES}}}if(c&&j[0]){j[0]=j[0].loc()
}if(c&&j[5]&&SC.typeOf(j[5])===SC.T_STRING){j[5]=j[5].loc()}f[f.length]=j}return f
}.property("items","itemTitleKey","itemValueKey","itemIsEnabledKey","localize","itemIconKey","itemWidthKey","itemToolTipKey"),itemsDidChange:function(){if(this._items){this._items.removeObserver("[]",this,this.itemContentDidChange)
}this._items=this.get("items");if(this._items){this._items.addObserver("[]",this,this.itemContentDidChange)
}this.itemContentDidChange()}.observes("items"),itemContentDidChange:function(){this.notifyPropertyChange("displayItems")
},init:function(){arguments.callee.base.apply(this,arguments);this.itemsDidChange()
},displayProperties:["displayItems","value","activeIndex"],render:function(b,a){var g=this.get("displayItems");
var j=this._seg_displayItems;if(a||(g!==j)){this._seg_displayItems=g;this.renderDisplayItems(b,g)
}else{var m=this.get("activeIndex");var i=this.get("value");var c=SC.isArray(i);if(c&&i.get("length")===1){i=i.objectAt(0);
c=NO}var h={};var e=g.length,f=this.$("a.sc-segment"),l;while(--e>=0){l=g[e];h.sel=c?(i.indexOf(l[1])>=0):(l[1]===i);
h.active=(m===e);h.disabled=!l[2];SC.$(f[e]).setClass(h)}h=g=i=g=null}},renderDisplayItems:function(e,m){var p=this.get("value"),h=SC.isArray(p),s=this.get("activeIndex"),j=m.length,o,n,b,l,f,q,a,c,g;
for(g=0;g<j;g++){f=e.begin("a").attr("href","javascript:;");q=m[g];o=q[0];n=q[3];
a=q[5];f.addStyle("display","inline-block");f.addClass("sc-segment");if(!q[2]){f.addClass("disabled")
}if(g===0){f.addClass("sc-first-segment")}if(g===(j-1)){f.addClass("sc-last-segment")
}if(g!==0&&g!==(j-1)){f.addClass("sc-middle-segment")}if(h?(p.indexOf(q[1])>=0):(q[1]===p)){f.addClass("sel")
}if(s===g){f.addClass("active")}if(q[4]){c=q[4];f.addStyle("width",c+"px")}if(a){f.attr("title",a)
}if(n){b=(n.indexOf("/")>=0)?n:SC.BLANK_IMAGE_URL;l=(b===n)?"":n;n='<img src="'+b+'" alt="" class="icon '+l+'" />'
}else{n=""}f.push('<span class="sc-button-inner"><label class="sc-button-label">',n+o,"</label></span>");
f.end()}},displayItemIndexForEvent:function(b){var e=SC.$(b.target);if(!e||e===document){return -1
}var a=this.$(),c=null;while(!c&&(e.length>0)&&(e[0]!==a[0])){if(e.hasClass("sc-segment")&&e.attr("tagName")==="A"){c=e
}else{e=e.parent()}}e=a=null;return(c)?this.$("a.sc-segment").index(c):-1},keyDown:function(e){var g,h,f,a,j,c;
if(e.which===9){var b=e.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(b){b.becomeFirstResponder()}else{e.allowDefault()}return YES}if(!this.get("allowsMultipleSelection")&&!this.get("allowsEmptySelection")){f=this.get("displayItems");
a=f.length;j=this.get("value");c=SC.isArray(j);if(e.which===39||e.which===40){for(g=0;
g<a-1;g++){h=f[g];if(c?(j.indexOf(h[1])>=0):(h[1]===j)){this.triggerItemAtIndex(g+1)
}}return YES}else{if(e.which===37||e.which===38){for(g=1;g<a;g++){h=f[g];if(c?(j.indexOf(h[1])>=0):(h[1]===j)){this.triggerItemAtIndex(g-1)
}}return YES}}}return YES},mouseDown:function(b){if(!this.get("isEnabled")){return YES
}var a=this.displayItemIndexForEvent(b);if(a>=0){this._isMouseDown=YES;this.set("activeIndex",a)
}return YES},mouseUp:function(b){var a=this.displayItemIndexForEvent(b);if(this._isMouseDown&&(a>=0)){this.triggerItemAtIndex(a)
}this._isMouseDown=NO;this.set("activeIndex",-1);return YES},mouseMoved:function(b){var a=this.displayItemIndexForEvent(b);
if(this._isMouseDown){this.set("activeIndex",a)}return YES},mouseOver:function(b){var a=this.displayItemIndexForEvent(b);
if(this._isMouseDown){this.set("activeIndex",a)}return YES},mouseOut:function(a){if(this._isMouseDown){this.set("activeIndex",-1)
}return YES},triggerItemAtIndex:function(m){var j=this.get("displayItems"),n=j.objectAt(m),b,l,c,h,g;
if(!n[2]){return this}h=this.get("allowsEmptySelection");g=this.get("allowsMultipleSelection");
b=n[1];l=c=this.get("value");if(!SC.isArray(l)){l=[l]}if(!g){if(h&&(l.get("length")===1)&&(l.objectAt(0)===b)){l=[]
}else{l=[b]}}else{if(l.indexOf(b)>=0){if(l.get("length")>1||(l.objectAt(0)!==b)||h){l=l.without(b)
}}else{l=l.concat([b])}}switch(l.get("length")){case 0:l=null;break;case 1:l=l.objectAt(0);
break;default:break}var o=this.get("itemActionKey");var a=this.get("itemTargetKey");
var f,i=null;var e=this.getPath("pane.rootResponder");if(o&&(n=this.get("items").objectAt(n[6]))){f=n.get?n.get(o):n[o];
if(a){i=n.get?n.get(a):n[a]}if(e){e.sendAction(f,i,this,this.get("pane"))}}if(!f&&c!==undefined){this.set("value",l)
}f=this.get("action");if(f&&e){e.sendAction(f,this.get("target"),this,this.get("pane"))
}},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$()[0].focus()
}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}}});
SC._segmented_fetchKeys=function(a){return this.get(a)};SC._segmented_fetchItem=function(a){if(!a){return null
}return this.get?this.get(a):this[a]};SC.SelectFieldView=SC.FieldView.extend({tagName:"select",classNames:["sc-select-field-view"],objects:[],objectsBindingDefault:SC.Binding.multiple(),nameKey:null,sortKey:null,valueKey:null,emptyName:null,localize:false,cpDidChange:YES,disableSort:NO,validateMenuItem:function(b,a){return true
},sortObjects:function(b){if(!this.get("disableSort")){var a=this.get("sortKey")||this.get("nameKey");
b=b.sort(function(e,c){if(a){e=e.get?e.get(a):e[a];c=c.get?c.get(a):c[a]}return(e<c)?-1:((e>c)?1:0)
})}return b},render:function(c,a){if(this.get("cpDidChange")){this.set("cpDidChange",NO);
var g=this.get("nameKey");var l=this.get("valueKey");var j=this.get("objects");var b=this.get("value");
var e,h;var i=this.get("localize");if(!l&&b){b=SC.guidFor(b)}if((b===null)||(b==="")){b="***"
}if(j){j=this.sortObjects(j);if(!a){h=this.$input()[0];h.innerHTML=""}var f=this.get("emptyName");
if(f){if(i){f=f.loc()}if(a){c.push('<option value="***">%@</option>'.fmt(f));c.push('<option disabled="disabled"></option>')
}else{e=document.createElement("option");e.value="***";e.innerHTML=f;h.appendChild(e);
e=document.createElement("option");e.disabled="disabled";h.appendChild(e)}}j.forEach(function(o){if(o){var n=g?(o.get?o.get(g):o[g]):o.toString();
if(i){n=n.loc()}var p=(l)?(o.get?o.get(l):o[l]):o;if(p){p=(SC.guidFor(p))?SC.guidFor(p):p.toString()
}var m=(this.validateMenuItem&&this.validateMenuItem(p,n))?"":'disabled="disabled" ';
if(a){c.push('<option %@value="%@">%@</option>'.fmt(m,p,n))}else{e=document.createElement("option");
e.value=p;e.innerHTML=n;if(m.length>0){e.disable="disabled"}h.appendChild(e)}}else{if(a){c.push('<option disabled="disabled"></option>')
}else{e=document.createElement("option");e.disabled="disabled";h.appendChild(e)}}},this);
this.setFieldValue(b)}else{this.set("value",null)}}},displayProperties:["objects","nameKey","valueKey"],_objectsObserver:function(){this.set("cpDidChange",YES)
}.observes("objects"),_nameKeyObserver:function(){this.set("cpDidChange",YES)}.observes("nameKey"),_valueKeyObserver:function(){this.set("cpDidChange",YES)
}.observes("valueKey"),$input:function(){return this.$()},mouseDown:function(a){if(!this.get("isEnabled")){a.stop();
return YES}else{return arguments.callee.base.apply(this,arguments)}},getFieldValue:function(){var g=arguments.callee.base.apply(this,arguments);
var c=this.get("valueKey");var f=this.get("objects");var e,a;if(g=="***"){g=null}else{if(g&&f){var h=(SC.typeOf(f.length)===SC.T_FUNCTION)?f.length():f.length;
e=null;while(!e&&(--h>=0)){a=f.objectAt?f.objectAt(h):f[h];if(c){a=(a.get)?a.get(c):a[c]
}var b=(a)?(SC.guidFor(a)?SC.guidFor(a):a.toString()):null;if(g==b){e=a}}}}return(c||e)?e:g
},setFieldValue:function(a){if(SC.none(a)){a=""}else{a=((a)?(SC.guidFor(a)?SC.guidFor(a):a.toString()):null)
}this.$input().val(a);return this},fieldDidFocus:function(){var a=this.get("isFocused");
if(!a){this.set("isFocused",true)}},fieldDidBlur:function(){var a=this.get("isFocused");
if(a){this.set("isFocused",false)}},_isFocusedObserver:function(){this.$().setClass("focus",this.get("isFocused"))
}.observes("isFocused"),didCreateLayer:function(){var a=this.$input();SC.Event.add(a,"blur",this,this.fieldDidBlur);
SC.Event.add(a,"focus",this,this.fieldDidFocus);return arguments.callee.base.apply(this,arguments)
},willDestroyLayer:function(){var a=this.$input();SC.Event.remove(a,"focus",this,this.fieldDidFocus);
SC.Event.remove(a,"blur",this,this.fieldDidBlur);return arguments.callee.base.apply(this,arguments)
}});SC.SliderView=SC.View.extend(SC.Control,{classNames:"sc-slider-view",handleSelector:"img.sc-handle",value:0.5,valueBindingDefault:SC.Binding.single().notEmpty(),minimum:0,minimumBindingDefault:SC.Binding.single().notEmpty(),contentMinimumKey:null,maximum:1,maximumBindingDefault:SC.Binding.single().notEmpty(),contentMaximumKey:null,step:0.1,displayProperties:"value minimum maximum".w(),render:function(e,h){arguments.callee.base.apply(this,arguments);
var c=this.get("minimum");var a=this.get("maximum");var g=this.get("value");g=Math.min(Math.max(g,c),a);
var f=this.get("step");if(!SC.none(f)&&f!==0){g=Math.round(g/f)*f}g=Math.floor((g-c)/(a-c)*100);
if(h){var b=SC.BLANK_IMAGE_URL;e.push('<span class="sc-inner">');e.push('<span class="sc-leftcap"></span>');
e.push('<span class="sc-rightcap"></span>');e.push('<img src="',b,'" class="sc-handle" style="left: ',g,'%" />');
e.push("</span>")}else{this.$(this.get("handleSelector")).css("left",g+"%")}},_isMouseDown:NO,mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;return this._triggerHandle(a)},mouseDragged:function(a){return this._isMouseDown?this._triggerHandle(a):YES
},mouseUp:function(a){if(this._isMouseDown){this.set("isActive",NO)}var b=this._isMouseDown?this._triggerHandle(a):YES;
this._isMouseDown=NO;return b},_triggerHandle:function(b){var h=this.convertFrameFromView({x:b.pageX}).x;
var f=this.get("frame").width;h=Math.max(Math.min(h,f-8),8)-8;f-=16;h=h/f;var e=this.get("minimum"),a=this.get("maximum");
var g=this.get("step"),c=this.get("value");h=e+((a-e)*h);if(g!==0){h=Math.round(h/g)*g
}if(Math.abs(c-h)>=0.01){this.set("value",h)}return YES},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$()[0].focus()
}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}},keyDown:function(c){if(c.which===9){var b=c.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(b){b.becomeFirstResponder()}else{c.allowDefault()}return YES}if(c.which===37||c.which===38||c.which===39||c.which===40){var f=this.get("minimum"),a=this.get("maximum");
var g=this.get("step");var e=a-f,i=0,h;if(c.which===37||c.which===38){if(g===0){if(e<100){i=this.get("value")-1
}else{h=Math.abs(e/100);if(h<2){h=2}i=this.get("value")-Math.abs(e/100)}}else{i=this.get("value")-g
}}if(c.which===39||c.which===40){if(g===0){if(e<100){i=this.get("value")+2}else{h=Math.abs(e/100);
if(h<2){h=2}i=this.get("value")+h}}else{i=this.get("value")+g}}if(i>=f&&i<=a){this.set("value",i)
}}SC.RunLoop.begin().end();return YES},contentPropertyDidChange:function(c,a){var b=this.get("content");
this.beginPropertyChanges().updatePropertyFromContent("value",a,"contentValueKey",b).updatePropertyFromContent("minimum",a,"contentMinimumKey",b).updatePropertyFromContent("maximum",a,"contentMaximumKey",b).updatePropertyFromContent("isIndeterminate",a,"contentIsIndeterminateKey",b).endPropertyChanges()
}});sc_require("mixins/collection_group");sc_require("views/disclosure");SC.SourceListGroupView=SC.View.extend(SC.Control,SC.CollectionGroup,{classNames:["sc-source-list-group"],content:null,isGroupVisible:YES,hasGroupTitle:YES,groupTitleKey:null,groupVisibleKey:null,render:function(a,b){a.push('<a href="javascript:;" class="sc-source-list-label sc-disclosure-view sc-button-view button disclosure no-disclosure">');
a.push('<img src="%@" class="button" />'.fmt(SC.BLANK_IMAGE_URL));a.push('<span class="label"></span></a>')
},createChildViews:function(){},contentPropertyDidChange:function(g,c){var f=this.get("content");
var i=this.outlet("labelView");if(f===null){i.setIfChanged("isVisible",NO);this.setIfChanged("hasGroupTitle",NO);
return}else{i.setIfChanged("isVisible",YES);this.setIfChanged("hasGroupTitle",YES)
}var b=this.getDelegateProperty("groupTitleKey",this.displayDelegate);if((c=="*")||(b&&(c==b))){var h=(f&&f.get&&b)?f.get(b):f;
if(h!=this._title){this._title=h;if(h){h=h.capitalize()}i.set("title",h)}}var e=this.getDelegateProperty("groupVisibleKey",this.displayDelegate);
if((c=="*")||(e&&(c==e))){if(e){i.removeClassName("no-disclosure");var a=(f&&f.get)?!!f.get(e):YES;
if(a!=this.get("isGroupVisible")){this.set("isGroupVisible",a);i.set("value",a)}}else{i.addClassName("no-disclosure")
}}},disclosureValueDidChange:function(c){if(c==this.get("isGroupVisible")){return
}var b=this.get("content");var a=this.getDelegateProperty("groupVisibleKey",this.displayDelegate);
if(b&&b.set&&a){b.set(a,c)}this.set("isGroupVisible",c);if(this.owner&&this.owner.updateChildren){this.owner.updateChildren(true)
}},labelView:SC.DisclosureView.extend({value:YES,_valueObserver:function(){if(this.owner){this.owner.disclosureValueDidChange(this.get("value"))
}}.observes("value")})});sc_require("views/list");sc_require("views/source_list_group");
SC.BENCHMARK_SOURCE_LIST_VIEW=YES;SC.SourceListView=SC.ListView.extend({classNames:["sc-source-list"],rowHeight:32,selectOnMouseDown:NO,actOnSelect:YES});
sc_require("views/split");SC.SplitDividerView=SC.View.extend({classNames:["sc-split-divider-view"],prepareContext:function(a,c){var b=this.get("splitView");
if(b){this.set("cursor",b.get("thumbViewCursor"))}return arguments.callee.base.apply(this,arguments)
},mouseDown:function(a){var b=this.get("splitView");return(b)?b.mouseDownInThumbView(a,this):arguments.callee.base.apply(this,arguments)
},doubleClick:function(a){console.log("doubleClick in split divider");var b=this.get("splitView");
return(b)?b.doubleClickInThumbView(a,this):arguments.callee.base.apply(this,arguments)
}});sc_require("views/split_divider");SC.RESIZE_BOTH="resize-both";SC.RESIZE_TOP_LEFT="resize-top-left";
SC.RESIZE_BOTTOM_RIGHT="resize-bottom-right";SC.SplitView=SC.View.extend({classNames:["sc-split-view"],childLayoutProperties:"layoutDirection dividerThickness autoresizeBehavior".w(),displayProperties:["layoutDirection"],delegate:null,layoutDirection:SC.LAYOUT_HORIZONTAL,canCollapseViews:YES,autoresizeBehavior:SC.RESIZE_BOTTOM_RIGHT,defaultThickness:0.5,isSplitView:YES,topLeftView:SC.View,dividerView:SC.SplitDividerView,bottomRightView:SC.View,topLeftThickness:function(){var a=this.get("topLeftView");
return a?this.thicknessForView(a):0}.property("topLeftView").cacheable(),bottomRightThickness:function(){var a=this.get("bottomRightView");
return a?this.thicknessForView(a):0}.property("bottomRightView").cacheable(),thumbViewCursor:null,canCollapseView:function(a){return this.invokeDelegateMethod(this.delegate,"splitViewCanCollapse",this,a)
},thicknessForView:function(a){var c=this.get("layoutDirection"),b=a.get("frame");
return(c===SC.LAYOUT_HORIZONTAL)?b.width:b.height},createChildViews:function(){var f=[],e=["topLeftView","dividerView","bottomRightView"],c,b,a;
for(b=0,a=e.length;b<a;++b){if(c=this.get(e[b])){c=this[e[b]]=this.createChildView(c,{layoutView:this,rootElementPath:[b]});
f.push(c)}}this.set("childViews",f);return this},updateChildLayout:function(){var a=this.get("topLeftView"),b=this.get("bottomRightView"),i=this.get("dividerView"),j=this.get("layoutDirection"),e=this._desiredTopLeftThickness;
var l=this.get("dividerThickness");l=(!SC.none(l))?l:7;var h=(j===SC.LAYOUT_HORIZONTAL)?this.get("frame").width:this.get("frame").height,m=h-l-e,c=this.get("autoresizeBehavior"),g,f;
f=a.get("isCollapsed")||NO;a.setIfChanged("isVisible",!f);g=SC.clone(a.get("layout"));
if(j===SC.LAYOUT_HORIZONTAL){g.top=0;g.left=0;g.bottom=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:g.right=m+l;delete g.width;break;case SC.RESIZE_BOTTOM_RIGHT:delete g.right;
delete g.height;g.width=e;break}}else{g.top=0;g.left=0;g.right=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:g.bottom=m+l;delete g.height;break;case SC.RESIZE_BOTTOM_RIGHT:delete g.bottom;
delete g.width;g.height=e;break}}a.set("layout",g);if(i){g=SC.clone(i.get("layout"));
if(j===SC.LAYOUT_HORIZONTAL){g.width=l;delete g.height;g.top=0;g.bottom=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:delete g.left;g.right=m;delete g.centerX;delete g.centerY;
break;case SC.RESIZE_BOTTOM_RIGHT:g.left=e;delete g.right;delete g.centerX;delete g.centerY;
break}}else{delete g.width;g.height=l;g.left=0;g.right=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:delete g.top;g.bottom=m;delete g.centerX;delete g.centerY;
break;case SC.RESIZE_BOTTOM_RIGHT:g.top=e;delete g.bottom;delete g.centerX;delete g.centerY;
break}}i.set("layout",g)}f=b.get("isCollapsed")||NO;b.setIfChanged("isVisible",!f);
g=SC.clone(b.get("layout"));if(j===SC.LAYOUT_HORIZONTAL){g.top=0;g.bottom=0;g.right=0;
switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";case SC.RESIZE_BOTTOM_RIGHT:g.left=e+l;
delete g.width;break;case SC.RESIZE_TOP_LEFT:delete g.left;g.width=m;break}}else{g.left=0;
g.right=0;g.bottom=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_BOTTOM_RIGHT:g.top=e+l;delete g.height;break;case SC.RESIZE_TOP_LEFT:delete g.top;
g.height=m;break}}b.set("layout",g);this.notifyPropertyChange("topLeftThickness").notifyPropertyChange("bottomRightThickness")
},renderLayout:function(b,a){if(a||this._recalculateDivider){if(!this.get("thumbViewCursor")){this.set("thumbViewCursor",SC.Cursor.create())
}var e=this.get("layoutDirection"),g=this.get("frame"),f,j=this.$(),i=this.get("defaultThickness"),c=this.get("autoresizeBehavior");
var h=this.get("dividerThickness");h=(!SC.none(h))?h:7;if(this._recalculateDivider===undefined&&i<1){this._recalculateDivider=YES
}else{if(this._recalculateDivider){this._recalculateDivider=NO}}if(j[0]){f=(e===SC.LAYOUT_HORIZONTAL)?j[0].offsetWidth:j[0].offsetHeight
}else{f=(e===SC.LAYOUT_HORIZONTAL)?g.width:g.height}if(SC.none(i)||(i>0&&i<1)){i=Math.floor((f-(h))*(i||0.5))
}if(c===SC.RESIZE_BOTTOM_RIGHT){this._desiredTopLeftThickness=i}else{this._desiredTopLeftThickness=f-h-i
}this._topLeftView=this.get("topLeftView");this._bottomRightView=this.get("bottomRightView");
this._topLeftViewThickness=this.thicknessForView(this.get("topLeftView"));this._bottomRightThickness=this.thicknessForView(this.get("bottomRightView"));
this._dividerThickness=this.get("dividerThickness");this._layoutDirection=this.get("layoutDirection");
this._updateTopLeftThickness(0);this._setCursorStyle();this.updateChildLayout()}arguments.callee.base.apply(this,arguments)
},render:function(b,c){arguments.callee.base.apply(this,arguments);if(this._inLiveResize){this._setCursorStyle()
}if(c){var a=this.get("layoutDirection");if(a===SC.LAYOUT_HORIZONTAL){b.addClass("sc-horizontal")
}else{b.addClass("sc-vertical")}}},mouseDownInThumbView:function(a,c){var b=this.getPath("pane.rootResponder");
if(!b){return NO}b.dragDidStart(this);this._mouseDownX=a.pageX;this._mouseDownY=a.pageY;
this._thumbView=c;this._topLeftView=this.get("topLeftView");this._bottomRightView=this.get("bottomRightView");
this._topLeftViewThickness=this.thicknessForView(this.get("topLeftView"));this._bottomRightThickness=this.thicknessForView(this.get("bottomRightView"));
this._dividerThickness=this.get("dividerThickness");this._layoutDirection=this.get("layoutDirection");
this.beginLiveResize();this._inLiveResize=YES;return YES},mouseDragged:function(a){var b=(this._layoutDirection===SC.LAYOUT_HORIZONTAL)?a.pageX-this._mouseDownX:a.pageY-this._mouseDownY;
this._updateTopLeftThickness(b);return YES},mouseUp:function(a){if(this._inLiveResize===YES){this._thumbView=null;
this._inLiveResize=NO;this.endLiveResize();return YES}return NO},doubleClickInThumbView:function(b,e){var a=this._topLeftView,c=a.get("isCollapsed")||NO;
if(!c&&!this.canCollapseView(a)){a=this._bottomRightView;c=a.get("isCollapsed")||NO;
if(!c&&!this.canCollapseView(a)){return NO}}if(!c){this._uncollapsedThickness=this.getThicknessForView(a);
if(a===this._topLeftView){this._topLeftViewThickness=0}else{this._bottomRightViewThickness=0
}if(!a.get("isCollapsed")){this._uncollapsedThickness=null}}else{if(a===this._topLeftView){this._topLeftViewThickness=this._uncollapsedThickness
}else{this._bottomRightViewThickness=this._uncollapsedThickness}a._uncollapsedThickness=null
}this._setCursorStyle();return true},_updateTopLeftThickness:function(f){var a=this._topLeftView,c=this._bottomRightView,g=this.thicknessForView(a),h=this.thicknessForView(c),l=this._dividerThickness,j=0,b=this._topLeftViewThickness+f,o=this._layoutDirection,q=this.canCollapseView(c),n=b,m=this.get("topLeftMaxThickness"),e=this.get("topLeftMinThickness"),p,i,s;
if(!a.get("isCollapsed")){j+=g}if(!c.get("isCollapsed")){j+=h}if(!SC.none(m)){n=Math.min(m,n)
}if(!SC.none(e)){n=Math.max(e,n)}m=this.get("bottomRightMaxThickness");e=this.get("bottomRightMinThickness");
p=j-n;if(!SC.none(m)){p=Math.min(m,p)}if(!SC.none(e)){p=Math.max(e,p)}n=j-p;n=this.invokeDelegateMethod(this.delegate,"splitViewConstrainThickness",this,a,n);
n=Math.min(n,j);n=Math.max(0,n);i=a.get("collapseAtThickness");if(!i){i=0}s=c.get("collapseAtThickness");
s=SC.none(s)?j:(j-s);if((b<=i)&&this.canCollapseView(a)){m=c.get("maxThickness");
if(!m||(l+j)<=m){n=0}}else{if(b>=s&&this.canCollapseView(c)){m=a.get("maxThickness");
if(!m||(l+j)<=m){n=j}}}if(n!=this.thicknessForView(a)){this._desiredTopLeftThickness=n;
a.set("isCollapsed",n===0);c.set("isCollapsed",n>=j);this.updateChildLayout();this.displayDidChange()
}},_setCursorStyle:function(){var a=this._topLeftView;bottomRightView=this._bottomRightView,thumbViewCursor=this.get("thumbViewCursor"),tlThickness=this.thicknessForView(a),brThickness=this.thicknessForView(bottomRightView);
this._layoutDirection=this.get("layoutDirection");if(a.get("isCollapsed")||tlThickness===this.get("topLeftMinThickness")||brThickness==this.get("bottomRightMaxThickness")){thumbViewCursor.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"e-resize":"s-resize")
}else{if(bottomRightView.get("isCollapsed")||tlThickness===this.get("topLeftMaxThickness")||brThickness==this.get("bottomRightMinThickness")){thumbViewCursor.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"w-resize":"n-resize")
}else{thumbViewCursor.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"ew-resize":"ns-resize")
}}}.observes("layoutDirection"),splitViewCanCollapse:function(b,a){if(b.get("canCollapseViews")===NO){return NO
}if(a.get("canCollapse")===NO){return NO}return YES},splitViewConstrainThickness:function(c,a,b){return b
},_forceSplitCalculation:function(){this.updateLayout()}.observes("*pane.isPaneAttached")});
sc_require("views/collection");SC.StackedView=SC.CollectionView.extend({classNames:["sc-stacked-view"],layout:{top:0,left:0,right:0,height:1},computeNowShowing:function(a){return this.get("allContentIndexes")
},updateHeight:function(a){if(a){this._updateHeight()}else{this.invokeLast(this._updateHeight)
}return this},_updateHeight:function(){var f=this.get("childViews"),b=f.get("length"),c,e,a;
if(b===0){a=1}else{c=f.objectAt(b-1);e=c?c.get("layer"):null;a=e?(e.offsetTop+e.offsetHeight):1;
e=null}this.adjust("height",a)},didReload:function(a){return this.updateHeight()},didCreateLayer:function(){return this.updateHeight()
}});sc_require("views/segmented");SC.TOP_LOCATION="top";SC.BOTTOM_LOCATION="bottom";
SC.TabView=SC.View.extend({classNames:["sc-tab-view"],displayProperties:["nowShowing"],nowShowing:null,items:[],isEnabled:YES,itemTitleKey:null,itemValueKey:null,itemIsEnabledKey:null,itemIconKey:null,itemWidthKey:null,itemToolTipKey:null,tabLocation:SC.TOP_LOCATION,userDefaultKey:null,_tab_nowShowingDidChange:function(){var a=this.get("nowShowing");
this.get("containerView").set("nowShowing",a);this.get("segmentedView").set("value",a);
return this}.observes("nowShowing"),_tab_saveUserDefault:function(){var a=this.get("nowShowing");
var b=this.get("userDefaultKey");if(b){SC.userDefaults.set([b,"nowShowing"].join(":"),a)
}}.observes("nowShowing"),_tab_itemsDidChange:function(){this.get("segmentedView").set("items",this.get("items"));
return this}.observes("items"),init:function(){arguments.callee.base.apply(this,arguments);
this._tab_nowShowingDidChange()._tab_itemsDidChange()},awake:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("userDefaultKey");if(a){a=[a,"nowShowing"].join(":");var b=SC.userDefaults.get(a);
if(!SC.none(b)){this.set("nowShowing",b)}}},createChildViews:function(){var c=[],b,a;
if(this.get("tabLocation")===SC.TOP_LOCATION){a=this.containerView.extend({layout:{top:12,left:0,right:0,bottom:0}})
}else{a=this.containerView.extend({layout:{top:0,left:0,right:0,bottom:12}})}b=this.containerView=this.createChildView(a);
c.push(b);b=this.segmentedView=this.createChildView(this.segmentedView);c.push(b);
this.set("childViews",c);return this},containerView:SC.ContainerView,segmentedView:SC.SegmentedView.extend({layout:{left:0,right:0,height:24},_sc_tab_segmented_valueDidChange:function(){var a=this.get("parentView");
if(a){a.set("nowShowing",this.get("value"))}this.set("layerNeedsUpdate",YES);this.invokeOnce(this.updateLayerIfNeeded)
}.observes("value"),render:function(b,e){arguments.callee.base.apply(this,arguments);
var c=this.get("parentView");var a=(c)?c.get("tabLocation"):SC.TOP_LOCATION;if(a===SC.TOP_LOCATION){b.addStyle("top","0px")
}else{b.addStyle("bottom","0px")}},init:function(){var a=this.get("parentView");if(a){SC._TAB_ITEM_KEYS.forEach(function(b){this[b]=a.get(b)
},this)}return arguments.callee.base.apply(this,arguments)}})});SC._TAB_ITEM_KEYS="itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemWidthKey itemToolTipKey".w();
SC.ThumbView=SC.View.extend({classNames:["sc-thumb-view"],isEnabled:YES,isEnabledBindingDefault:SC.Binding.bool(),prepareContext:function(a,c){var b=this.get("splitView");
if(b){this.set("cursor",b.get("thumbViewCursor"))}return arguments.callee.base.apply(this,arguments)
},mouseDown:function(a){if(!this.get("isEnabled")){return NO}var b=this.get("splitView");
return(b)?b.mouseDownInThumbView(a,this):arguments.callee.base.apply(this,arguments)
}});SC.ToolbarView=SC.View.extend({classNames:["sc-toolbar-view"],anchorLocation:null,layout:{left:0,height:32,right:0},init:function(){if(this.anchorLocation){this.layout=SC.merge(this.layout,this.anchorLocation)
}arguments.callee.base.apply(this,arguments)}});SC.WebView=SC.View.extend(SC.Control,{classNames:"sc-web-view",displayProperties:["value","shouldAutoResize"],shouldAutoResize:NO,render:function(a,e){var c=this.get("value");
if(e){a.push('<iframe src="'+c+'" style="position: absolute; width: 100%; height: 100%; border: 0px; margin: 0px; padding: 0p;"></iframe>')
}else{var b=this.$("iframe");b.attr("src","javascript:;");b.attr("src",c)}},didCreateLayer:function(){var a=this.$("iframe");
SC.Event.add(a,"load",this,this.iframeDidLoad)},iframeDidLoad:function(){if(this.get("shouldAutoResize")===YES){var a;
var c=this.$("iframe")[0];if(c&&c.contentWindow){a=c.contentWindow;if(a&&a.document&&a.document.documentElement){var b=a.document.documentElement;
if(!SC.browser.isIE){this.$().width(b.scrollWidth);this.$().height(b.scrollHeight)
}else{this.$().width(b.scrollWidth+12);this.$().height(b.scrollHeight+5)}}}}}});SC.WellView=SC.ContainerView.extend({classNames:"sc-well-view",contentLayout:{top:10,bottom:10,left:10,right:10},createChildViews:function(){var a=this.get("contentView");
if(a){a=this.contentView=this.createChildView(a);a.set("layout",this.contentLayout);
this.childViews=[a]}},render:function(a,b){if(b){a.push("<div class='top-left-edge'></div>","<div class='top-edge'></div>","<div class='top-right-edge'></div>","<div class='right-edge'></div>","<div class='bottom-right-edge'></div>","<div class='bottom-edge'></div>","<div class='bottom-left-edge'></div>","<div class='left-edge'></div>","<div class='content-background'></div>")
}arguments.callee.base.apply(this,arguments)},contentViewDidChange:function(){var a=this.get("contentView");
a.set("layout",this.contentLayout);this.replaceContent(a)}.observes("contentView")});
if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/desktop");
/* @license
==========================================================================
SproutCore -- JavaScript Application Framework
copyright 2006-2009, Sprout Systems Inc., Apple Inc. and contributors.

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.

SproutCore and the SproutCore logo are trademarks of Sprout Systems, Inc.

For more information about SproutCore, visit http://www.sproutcore.com


==========================================================================
@license */
}if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore")
}SC.stringsFor("English",{});CcChat=SC.Object.create({NAMESPACE:"CcChat",VERSION:"0.1.0",store:SC.Store.create().from(SC.Record.fixtures)});
CcChat.chatController=SC.ObjectController.create({comet:function(){if(typeof(Faye)!=="undefined"){return new Faye.Client("/chat/comet")
}return null}(),chatHasInitialized:NO,username:"",usersInRoom:[],latestChat:null,initChat:function(b){if(this.comet===null){this.comet=new Faye.Client("/chat/comet")
}var a=CcChat.chatRoomController.validateChannel(b);CcChat.chatRoomController.set("channel",b);
var c=this.get("username");if(c.length<1){c="Test User";this.set("username",c)}this.comet.set_username(c);
this.subscribeToChannel(a,this.receiveChat);this.subscribeToUserList(a);this.chatHasInitialized=YES;
return b},sendChat:function(c,b){if(!this.chatHasInitialized){SC.Logger.log("initializing chat");
this.initChat("test")}var a={author:this.username,message:c,item:b};this.post(CcChat.chatRoomController.get("channel"),a);
SC.Logger.log("sent: "+c)},post:function(b,a){b=CcChat.chatRoomController.validateChannel(b);
this.comet.publish(b,a)},receiveChat:function(b){SC.Logger.log("received: "+b.message);
SC.RunLoop.begin();var a=CcChat.store.createRecord(CcChat.ChatMessage,{author:b.author,message:b.message,time:this._now(),item:b.item});
this.set("latestChat",a);SC.RunLoop.end()},subscribeToChannel:function(b,c){var a=CcChat.chatRoomController.validateChannel(b);
this.comet.subscribe(a,c,this)},subscribeToUserList:function(c){var b=CcChat.chatRoomController.validateChannel(c);
var a=this;function e(g){var f=[].concat(g);a.set("usersInRoom",f)}this.subscribeToChannel("/smeta/clients"+c,e)
},_usernameSet:function(){if(this.chatHasInitialized){var a=this.get("username");
this.comet.set_username(a)}}.observes("username"),_now:function(){return new Date().getTime()
}});CcChat.chatComposeController=SC.ObjectController.create({textAreaValue:null,item:null,sendAction:function(){var b=this.get("textAreaValue");
SC.Logger.log("textAreaValue: "+b);var a="User";CcChat.chatController.sendChat(b,this.get("item"));
this.set("textAreaValue","");this.set("item",null)},imageUrl:function(){var a=CcChat.chatComposeController.get("item");
if(a!==null&&a.imageUrl!==undefined&&a.imageUrl!==null){return a.imageUrl}return""
}.property("item"),imageWidth:function(){if(this.get("imageUrl").length>0){return 40
}else{return 0}}.property("imageUrl"),clearButtonTitle:"Remove item",showClearButton:function(){if(this.get("item")!==null){return true
}return false}.property("item"),clearItem:function(){this.set("item",null)}});CcChat.chatListController=SC.ArrayController.create({});
CcChat.chatRoomController=SC.ObjectController.create({channel:"",baseChannelName:function(){return this.get("channel").split("NUM")[0]
}.property("channel"),channelIndex:function(){var a=this.get("channel").split("NUM");
if(a.length>1){return parseInt(a[a.length-1],10)}else{return 0}}.property("channel"),getFirstChannelWithSpace:function(a,b,c){(function(g,l,n){g=CcChat.chatRoomController.validateChannel(g);
var h=g.split("NUM");var e=h[0];var f=0;if(h.length>1){var j=parseInt(h[1],10);f=j+1
}var i=e+"NUM"+f;SC.Logger.log("newChannelName = "+i);function m(o){if(o<l){n(i)}else{CcChat.chatRoomController.getFirstChannelWithSpace(i,l,n)
}}CcChat.chatRoomController.getNumClientsInChannel(i,m)})(a,b,c)},getNumClientsInChannel:function(a,b){(function(e,g){function c(i){var h=[].concat(i);
SC.Logger.log("clients in "+e+": "+h);var j=CcChat.chatController.comet;j.unsubscribe("/smeta/clients"+e);
g(h.length,e)}var f=CcChat.chatController.comet;f.subscribe("/smeta/clients"+e,c,this)
})(a,b)},validateChannel:function(a){if(a.slice(0,1)!="/"){a="/"+a}return a}});CcChat.loginController=SC.ObjectController.create({textAreaValue:null,username:null,usernameBinding:"CcChat.chatController.username",welcomeMessage:function(){var a=this.get("username");
if(a!==undefined&&a!==null&&a.length>0){return"Welcome "+a}else{return""}}.property("username"),login:function(){var a=this.get("textAreaValue");
CcChat.chatController.set("username",a);this.set("textAreaValue","")}});CcChat.userListController=SC.ArrayController.create({contentBinding:"CcChat.chatController.usersInRoom"});
CcChat.ChatMessage=SC.Record.extend({author:SC.Record.attr(String),message:SC.Record.attr(String),time:SC.Record.attr(Number),item:SC.Record.attr(Object)});
CcChat.ChatComposeView=SC.View.extend(SC.StaticLayout,{childViews:"inputView imageView clearImageView sendView".w(),inputView:SC.View.design(SC.StaticLayout,{layout:{left:0,top:0,right:0,height:35},useStaticLayout:YES,childViews:"textFieldView".w(),textFieldView:SC.TextFieldView.design({isTextArea:NO,valueBinding:"CcChat.chatComposeController.textAreaValue",keyUp:function(a){if(a.keyCode===13){CcChat.chatComposeController.sendAction()
}this.fieldValueDidChange();a.allowDefault();return YES}})}),imageView:SC.ImageView.design({layout:{top:2,left:0,height:35,width:this.imageWidth},value:"",valueBinding:"CcChat.chatComposeController.imageUrl"}),clearImageView:SC.ButtonView.design({layout:{top:60,height:24,right:125,width:120},titleBinding:"CcChat.chatComposeController.clearButtonTitle",target:"CcChat.chatComposeController",action:"clearItem",isVisibleBinding:"CcChat.chatComposeController.showClearButton"}),sendView:SC.ButtonView.design({layout:{top:60,height:24,right:20,width:100},title:"Chat",action:"CcChat.chatComposeController.sendAction"}),_adjust_size:function(){var a=CcChat.chatComposeController.get("imageWidth");
this.inputView.adjust("left",a)}.observes("CcChat.chatComposeController.item")});
CcChat.ChatMessageView=SC.View.extend(SC.ContentDisplay,{contentDisplayProperties:"author message".w(),useStaticLayout:YES,render:function(a,i){var f=this.get("content");
var b=f.get("author");b=(b===null)?"":b;var e=f.get("message");var g=f.get("time");
var h="";var c=f.get("item");if(c!==null){if(c!==null&&c.imageUrl!==undefined&&c.imageUrl!==null){h='<img style="float: left" src="'+c.imageUrl+'" height="40px"></img>'
}}a=a.begin().addClass("top");a=a.begin("p").addClass("name").push(h+"<b>%@</b>: %@".fmt(b,e)).end();
a=a.end();arguments.callee.base.apply(this,arguments)}});CcChat.LoginView=SC.View.extend({childViews:"inputView loginButtonView welcomeView".w(),inputView:SC.View.design(SC.StaticLayout,{layout:{left:20,top:5,width:200,height:24},useStaticLayout:YES,childViews:"textFieldView".w(),textFieldView:SC.TextFieldView.design({isTextArea:NO,valueBinding:"CcChat.loginController.textAreaValue",keyUp:function(a){if(a.keyCode===13){CcChat.loginController.login()
}this.fieldValueDidChange();a.allowDefault();return YES}})}),loginButtonView:SC.ButtonView.design({layout:{top:5,height:24,left:240,width:100},title:"Log in",target:"CcChat.loginController",action:"login"}),welcomeView:SC.LabelView.design({layout:{top:5,height:24,left:370,width:200},value:"",valueBinding:SC.Binding.from("CcChat.loginController.welcomeMessage").oneWay()})});
CcChat.UserListView=SC.ScrollView.extend({hasHorizontalScroller:NO,layout:{height:100},backgroundColor:"white",contentView:SC.ListView.design({contentBinding:"CcChat.userListController.arrangedObjects",selectionBinding:"CcChat.userListController.selection",rowHeight:30,canEditContent:NO,isSelectable:YES,showAlternatingRows:YES})});
if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("cc/cc_chat")
}SC.stringsFor("English",{});CC=SC.Object.create({NAMESPACE:"CC",VERSION:"0.1.0"});
CC.Question=SC.Object.extend({prompt:"This is a prompt",input:"This in an input"});
CC.AppletView=SC.View.extend({jarUrls:"",code:"",params:"",width:600,height:400,appletInstance:function(){return this.$("#"+this.get("appletId"))[0]
},render:function(a,b){this.renderAppletHtml(a)},renderAppletHtml:function(b){var a=b.begin("applet");
a.attr("id",this.get("appletId"));a.attr("archive",this.get("jarUrls"));a.attr("code",this.get("code"));
a.attr("width","100%");a.attr("height",this.get("height"));a.attr("MAYSCRIPT","true");
a.push(this.get("params"));a.end()},classNames:"applet",layout:{centerX:0,centerY:0,width:600,height:400},appletId:function(){return this.get("layerId")+"-applet"
}.property("layerId").cacheable(),run:function(a){a(this.appletInstance())}});CC.AutoScrollView=SC.ScrollView.extend({autoScrollTrigger:null,autoScroll:function(){var a=this;
function b(){var c=a.get("maximumVerticalScrollOffset");a.set("verticalScrollOffset",c)
}SC.Timer.schedule({action:b,interval:100,repeats:NO})}.observes("autoScrollTrigger")});
CC.QuestionView=SC.StackedView.extend(SC.StaticLayout,{layout:{top:0,left:0,right:0},classNames:["question","open-response-question"],contentDisplayProperties:"prompt".w(),prompt:"[prompt]",useStaticLayout:NO,childViews:"promptView inputView".w(),promptView:SC.LabelView.design(SC.StaticLayout,{classNames:"question-prompt",useStaticLayout:YES,escapeHTML:NO,layout:{left:5,right:5},valueBinding:"*parentView.prompt"}),inputView:SC.View.design(SC.StaticLayout,{layout:{left:20,top:5,width:600,height:95},useStaticLayout:YES,childViews:"textFieldView".w(),textFieldView:SC.TextFieldView.design({classNames:"question-input",isTextArea:YES})})});
require("views/question");CC.MultipleChoiceQuestionView=CC.QuestionView.extend({classNames:["question","multiple-choice-question"],choices:"1 2 3 4".w(),canSelectMultipleAnswers:NO,inputView:SC.RadioView.design(SC.StaticLayout,{layout:{left:20,top:5,width:600,height:95},useStaticLayout:YES,classNames:"question-input",itemsBinding:"*parentView.choices",itemsChanged:function(){this.replaceLayer()
}.observes("items")})});CC.MwAppletView=CC.AppletView.extend({cmlUrl:"",params:function(){return'<param name="script" value="page:0:import '+this.get("cmlUrl")+'"/>'
}.property("cmlUrl"),jarUrls:"http://mw2.concord.org/public/lib/mwapplet.jar",code:"org.concord.modeler.MwApplet",width:600,height:400,classNames:"mw-applet",layout:{centerX:0,centerY:0,width:600,height:400}});
CC.SensorAppletView=CC.AppletView.extend({listenerPath:"defaultDataListener",safariSensorStatePath:null,dataRecieved:function(a,c,b){},dataStreamEvent:function(a,c,b){},sensorsReady:function(){},resourcePath:"/simple.otml",isSafari:function(){if(typeof(navigator)!="undefined"&&typeof(navigator.vendor)!="undefined"&&navigator.vendor.indexOf("Apple")!=-1){return YES
}return NO}(),sensorStatePath:function(){if(this.get("isSafari")){return this.get("safariSensorStatePath")
}return null}.property("isSafari","safariSensorStatePath"),sensorState:"ready",appletName:"sensorApplet",params:function(){var a=['<param name="resource" value="'+this.get("resourcePath")+'" />','<param name="listenerPath" value="'+this.get("listenerPath")+'" />','<param name="name" value="'+this.get("appletName")+'" />'];
if(this.get("sensorStatePath")!==null){a.pushObject('<param name="sensorStatePath" value="'+this.get("sensorStatePath")+'" />')
}return a.join("")}.property("resourcePath"),jarUrls:["http://jnlp.concord.org/dev/org/concord/sensor/sensor-applets/sensor-applets.jar?version-id=0.1.0-20100601.160817-14","http://jnlp.concord.org/dev/org/concord/otrunk/otrunk.jar?version-id=0.2.0-20100519.081729-231","http://jnlp.concord.org/dev/org/concord/framework/framework.jar?version-id=0.1.0-20100518.155205-550","http://jnlp.concord.org/dev/org/concord/frameworkview/frameworkview.jar?version-id=0.1.0-20100518.160605-394","http://jnlp.concord.org/dev/org/concord/swing/swing.jar?version-id=0.1.0-20100518.155225-382","http://jnlp.concord.org/dev/jug/jug/jug.jar?version-id=1.1.2","http://jnlp.concord.org/dev/jdom/jdom/jdom.jar?version-id=1.0","http://jnlp.concord.org/dev/org/concord/apple-support/apple-support.jar?version-id=0.1.0-20100518.155355-314","http://jnlp.concord.org/dev/org/concord/utilities/response-cache/response-cache.jar?version-id=0.1.0-20100503.180141-215","http://jnlp.concord.org/dev/org/concord/sensor-native/sensor-native.jar?version-id=0.1.0-20100520.192620-460","http://jnlp.concord.org/dev/org/concord/sensor/sensor.jar?version-id=0.2.0-20100519.082617-265","http://jnlp.concord.org/dev/org/concord/data/data.jar?version-id=0.2.0-20100518.160532-268","http://jnlp.concord.org/dev/org/concord/external/rxtx/rxtx-comm/rxtx-comm.jar?version-id=2.1.7-r2"].join(", "),code:"org.concord.sensor.applet.OTSensorApplet",width:160,height:40,classNames:"sensor-applet",layout:{centerX:0,centerY:0,width:160,height:40},start:function(){this.set("sensorState","running");
if(this.get("isSafari")==NO||this.get("sensorStatePath")===null){this.run(function(a){a.startCollecting()
})}},stop:function(){this.set("sensorState","stopped");if(this.get("isSafari")==NO||this.get("sensorStatePath")===null){this.run(function(a){a.stopCollecting()
})}},reset:function(){this.set("sensorState","ready");if(this.get("isSafari")==NO||this.get("sensorStatePath")===null){this.run(function(a){a.stopCollecting()
})}}});if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("cc/cc")
}if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("cc");
/*
 * Raphael 1.3.2 - JavaScript Vector Library
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
}Raphael=(function(){var a=/[, ]+/,a0=/^(circle|rect|path|ellipse|text|image)$/,bb="prototype",Y="hasOwnProperty",T=document,aD=window,n={was:Object[bb][Y].call(aD,"Raphael"),is:aD.Raphael},aw=function(){if(aw.is(arguments[0],"array")){var e=arguments[0],E=B[a9](aw,e.splice(0,3+aw.is(e[0],at))),be=E.set();
for(var S=0,bf=e[o];S<bf;S++){var R=e[S]||{};a0.test(R.type)&&be[f](E[R.type]().attr(R))
}return be}return B[a9](aw,arguments)},a6=function(){},aW="appendChild",a9="apply",a4="concat",aC="",av=" ",F="split",L="click dblclick mousedown mousemove mouseout mouseover mouseup"[F](av),aJ="join",o="length",bd=String[bb].toLowerCase,ah=Math,h=ah.max,aT=ah.min,at="number",aL="toString",aG=Object[bb][aL],a2={},aX=ah.pow,f="push",a7=/^(?=[\da-f]$)/,c=/^url\(['"]?([^\)]+?)['"]?\)$/i,C=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgb\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|rgb\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\)|hs[bl]\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hs[bl]\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i,W=ah.round,A="setAttribute",ac=parseFloat,M=parseInt,aZ=String[bb].toUpperCase,l={blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/",opacity:1,path:"M0,0",r:0,rotation:0,rx:0,ry:0,scale:"1 1",src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",translation:"0 0",width:0,x:0,y:0},af={along:"along",blur:at,"clip-rect":"csv",cx:at,cy:at,fill:"colour","fill-opacity":at,"font-size":at,height:at,opacity:at,path:"path",r:at,rotation:"csv",rx:at,ry:at,scale:"csv",stroke:"colour","stroke-opacity":at,"stroke-width":at,translation:"csv",width:at,x:at,y:at},a1="replace";
aw.version="1.3.2";aw.type=(aD.SVGAngle||T.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML");
if(aw.type=="VML"){var am=T.createElement("div");am.innerHTML="<!--[if vml]><br><br><![endif]-->";
if(am.childNodes[o]!=2){return aw.type=null}am=null}aw.svg=!(aw.vml=aw.type=="VML");
a6[bb]=aw[bb];aw._id=0;aw._oid=0;aw.fn={};aw.is=function(i,e){e=bd.call(e);return((e=="object"||e=="undefined")&&typeof i==e)||(i==null&&e=="null")||bd.call(aG.call(i).slice(8,-1))==e
};aw.setWindow=function(e){aD=e;T=aD.document};var aO=function(E){if(aw.vml){var e=/^\s+|\s+$/g;
aO=ap(function(S){var be;S=(S+aC)[a1](e,aC);try{var bf=new aD.ActiveXObject("htmlfile");
bf.write("<body>");bf.close();be=bf.body}catch(bh){be=aD.createPopup().document.body
}var i=be.createTextRange();try{be.style.color=S;var bg=i.queryCommandValue("ForeColor");
bg=((bg&255)<<16)|(bg&65280)|((bg&16711680)>>>16);return"#"+("000000"+bg[aL](16)).slice(-6)
}catch(bh){return"none"}})}else{var R=T.createElement("i");R.title="Rapha\xebl Colour Picker";
R.style.display="none";T.body[aW](R);aO=ap(function(i){R.style.color=i;return T.defaultView.getComputedStyle(R,aC).getPropertyValue("color")
})}return aO(E)};var aq=function(){return"hsb("+[this.h,this.s,this.b]+")"},y=function(){return this.hex
};aw.hsb2rgb=ap(function(bi,bg,bm){if(aw.is(bi,"object")&&"h" in bi&&"s" in bi&&"b" in bi){bm=bi.b;
bg=bi.s;bi=bi.h}var S,be,bn;if(bm==0){return{r:0,g:0,b:0,hex:"#000"}}if(bi>1||bg>1||bm>1){bi/=255;
bg/=255;bm/=255}var bf=~~(bi*6),bj=(bi*6)-bf,R=bm*(1-bg),E=bm*(1-(bg*bj)),bo=bm*(1-(bg*(1-bj)));
S=[bm,E,R,R,bo,bm,bm][bf];be=[bo,bm,bm,E,R,R,bo][bf];bn=[R,R,bo,bm,bm,E,R][bf];S*=255;
be*=255;bn*=255;var bk={r:S,g:be,b:bn,toString:y},e=(~~S)[aL](16),bh=(~~be)[aL](16),bl=(~~bn)[aL](16);
e=e[a1](a7,"0");bh=bh[a1](a7,"0");bl=bl[a1](a7,"0");bk.hex="#"+e+bh+bl;return bk},aw);
aw.rgb2hsb=ap(function(e,i,bg){if(aw.is(e,"object")&&"r" in e&&"g" in e&&"b" in e){bg=e.b;
i=e.g;e=e.r}if(aw.is(e,"string")){var bi=aw.getRGB(e);e=bi.r;i=bi.g;bg=bi.b}if(e>1||i>1||bg>1){e/=255;
i/=255;bg/=255}var bf=h(e,i,bg),E=aT(e,i,bg),S,R,be=bf;if(E==bf){return{h:0,s:0,b:bf}
}else{var bh=(bf-E);R=bh/bf;if(e==bf){S=(i-bg)/bh}else{if(i==bf){S=2+((bg-e)/bh)}else{S=4+((e-i)/bh)
}}S/=6;S<0&&S++;S>1&&S--}return{h:S,s:R,b:be,toString:aq}},aw);var aP=/,?([achlmqrstvxz]),?/gi;
aw._path2string=function(){return this.join(",")[a1](aP,"$1")};function ap(R,i,e){function E(){var S=Array[bb].slice.call(arguments,0),bf=S[aJ]("\u25ba"),be=E.cache=E.cache||{},bg=E.count=E.count||[];
if(be[Y](bf)){return e?e(be[bf]):be[bf]}bg[o]>=1000&&delete be[bg.shift()];bg[f](bf);
be[bf]=R[a9](i,S);return e?e(be[bf]):be[bf]}return E}aw.getRGB=ap(function(e){if(!e||!!((e=e+aC).indexOf("-")+1)){return{r:-1,g:-1,b:-1,hex:"none",error:1}
}if(e=="none"){return{r:-1,g:-1,b:-1,hex:"none"}}!(({hs:1,rg:1})[Y](e.substring(0,2))||e.charAt()=="#")&&(e=aO(e));
var be,E,R,bh,bi,bf=e.match(C);if(bf){if(bf[2]){bh=M(bf[2].substring(5),16);R=M(bf[2].substring(3,5),16);
E=M(bf[2].substring(1,3),16)}if(bf[3]){bh=M((bi=bf[3].charAt(3))+bi,16);R=M((bi=bf[3].charAt(2))+bi,16);
E=M((bi=bf[3].charAt(1))+bi,16)}if(bf[4]){bf=bf[4][F](/\s*,\s*/);E=ac(bf[0]);R=ac(bf[1]);
bh=ac(bf[2])}if(bf[5]){bf=bf[5][F](/\s*,\s*/);E=ac(bf[0])*2.55;R=ac(bf[1])*2.55;bh=ac(bf[2])*2.55
}if(bf[6]){bf=bf[6][F](/\s*,\s*/);E=ac(bf[0]);R=ac(bf[1]);bh=ac(bf[2]);return aw.hsb2rgb(E,R,bh)
}if(bf[7]){bf=bf[7][F](/\s*,\s*/);E=ac(bf[0])*2.55;R=ac(bf[1])*2.55;bh=ac(bf[2])*2.55;
return aw.hsb2rgb(E,R,bh)}bf={r:E,g:R,b:bh};var i=(~~E)[aL](16),S=(~~R)[aL](16),bg=(~~bh)[aL](16);
i=i[a1](a7,"0");S=S[a1](a7,"0");bg=bg[a1](a7,"0");bf.hex="#"+i+S+bg;return bf}return{r:-1,g:-1,b:-1,hex:"none",error:1}
},aw);aw.getColor=function(i){var E=this.getColor.start=this.getColor.start||{h:0,s:1,b:i||0.75},e=this.hsb2rgb(E.h,E.s,E.b);
E.h+=0.075;if(E.h>1){E.h=0;E.s-=0.2;E.s<=0&&(this.getColor.start={h:0,s:1,b:E.b})
}return e.hex};aw.getColor.reset=function(){delete this.start};var aE=/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,au=/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig;
aw.parsePathString=ap(function(e){if(!e){return null}var E={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},i=[];
if(aw.is(e,"array")&&aw.is(e[0],"array")){i=aF(e)}if(!i[o]){(e+aC)[a1](aE,function(S,R,bg){var bf=[],be=bd.call(R);
bg[a1](au,function(bi,bh){bh&&bf[f](+bh)});if(be=="m"&&bf[o]>2){i[f]([R][a4](bf.splice(0,2)));
be="l";R=R=="m"?"l":"L"}while(bf[o]>=E[be]){i[f]([R][a4](bf.splice(0,E[be])));if(!E[be]){break
}}})}i[aL]=aw._path2string;return i});aw.findDotsAtSegment=function(i,e,bt,br,bf,S,bh,bg,bn){var bl=1-bn,bk=aX(bl,3)*i+aX(bl,2)*3*bn*bt+bl*3*bn*bn*bf+aX(bn,3)*bh,bi=aX(bl,3)*e+aX(bl,2)*3*bn*br+bl*3*bn*bn*S+aX(bn,3)*bg,bp=i+2*bn*(bt-i)+bn*bn*(bf-2*bt+i),bo=e+2*bn*(br-e)+bn*bn*(S-2*br+e),bs=bt+2*bn*(bf-bt)+bn*bn*(bh-2*bf+bt),bq=br+2*bn*(S-br)+bn*bn*(bg-2*S+br),bm=(1-bn)*i+bn*bt,bj=(1-bn)*e+bn*br,R=(1-bn)*bf+bn*bh,E=(1-bn)*S+bn*bg,be=(90-ah.atan((bp-bs)/(bo-bq))*180/ah.PI);
(bp>bs||bo<bq)&&(be+=180);return{x:bk,y:bi,m:{x:bp,y:bo},n:{x:bs,y:bq},start:{x:bm,y:bj},end:{x:R,y:E},alpha:be}
};var aa=ap(function(bk){if(!bk){return{x:0,y:0,width:0,height:0}}bk=N(bk);var bh=0,bg=0,S=[],E=[],R;
for(var be=0,bj=bk[o];be<bj;be++){R=bk[be];if(R[0]=="M"){bh=R[1];bg=R[2];S[f](bh);
E[f](bg)}else{var bf=aN(bh,bg,R[1],R[2],R[3],R[4],R[5],R[6]);S=S[a4](bf.min.x,bf.max.x);
E=E[a4](bf.min.y,bf.max.y);bh=R[5];bg=R[6]}}var e=aT[a9](0,S),bi=aT[a9](0,E);return{x:e,y:bi,width:h[a9](0,S)-e,height:h[a9](0,E)-bi}
}),aF=function(bf){var R=[];if(!aw.is(bf,"array")||!aw.is(bf&&bf[0],"array")){bf=aw.parsePathString(bf)
}for(var E=0,S=bf[o];E<S;E++){R[E]=[];for(var e=0,be=bf[E][o];e<be;e++){R[E][e]=bf[E][e]
}}R[aL]=aw._path2string;return R},aj=ap(function(S){if(!aw.is(S,"array")||!aw.is(S&&S[0],"array")){S=aw.parsePathString(S)
}var bj=[],bl=0,bk=0,bo=0,bn=0,R=0;if(S[0][0]=="M"){bl=S[0][1];bk=S[0][2];bo=bl;bn=bk;
R++;bj[f](["M",bl,bk])}for(var bg=R,bp=S[o];bg<bp;bg++){var e=bj[bg]=[],bm=S[bg];
if(bm[0]!=bd.call(bm[0])){e[0]=bd.call(bm[0]);switch(e[0]){case"a":e[1]=bm[1];e[2]=bm[2];
e[3]=bm[3];e[4]=bm[4];e[5]=bm[5];e[6]=+(bm[6]-bl).toFixed(3);e[7]=+(bm[7]-bk).toFixed(3);
break;case"v":e[1]=+(bm[1]-bk).toFixed(3);break;case"m":bo=bm[1];bn=bm[2];default:for(var bf=1,bh=bm[o];
bf<bh;bf++){e[bf]=+(bm[bf]-((bf%2)?bl:bk)).toFixed(3)}}}else{e=bj[bg]=[];if(bm[0]=="m"){bo=bm[1]+bl;
bn=bm[2]+bk}for(var be=0,E=bm[o];be<E;be++){bj[bg][be]=bm[be]}}var bi=bj[bg][o];switch(bj[bg][0]){case"z":bl=bo;
bk=bn;break;case"h":bl+=+bj[bg][bi-1];break;case"v":bk+=+bj[bg][bi-1];break;default:bl+=+bj[bg][bi-2];
bk+=+bj[bg][bi-1]}}bj[aL]=aw._path2string;return bj},0,aF),v=ap(function(S){if(!aw.is(S,"array")||!aw.is(S&&S[0],"array")){S=aw.parsePathString(S)
}var bi=[],bk=0,bj=0,bn=0,bm=0,R=0;if(S[0][0]=="M"){bk=+S[0][1];bj=+S[0][2];bn=bk;
bm=bj;R++;bi[0]=["M",bk,bj]}for(var bg=R,bo=S[o];bg<bo;bg++){var e=bi[bg]=[],bl=S[bg];
if(bl[0]!=aZ.call(bl[0])){e[0]=aZ.call(bl[0]);switch(e[0]){case"A":e[1]=bl[1];e[2]=bl[2];
e[3]=bl[3];e[4]=bl[4];e[5]=bl[5];e[6]=+(bl[6]+bk);e[7]=+(bl[7]+bj);break;case"V":e[1]=+bl[1]+bj;
break;case"H":e[1]=+bl[1]+bk;break;case"M":bn=+bl[1]+bk;bm=+bl[2]+bj;default:for(var bf=1,bh=bl[o];
bf<bh;bf++){e[bf]=+bl[bf]+((bf%2)?bk:bj)}}}else{for(var be=0,E=bl[o];be<E;be++){bi[bg][be]=bl[be]
}}switch(e[0]){case"Z":bk=bn;bj=bm;break;case"H":bk=e[1];break;case"V":bj=e[1];break;
default:bk=bi[bg][bi[bg][o]-2];bj=bi[bg][bi[bg][o]-1]}}bi[aL]=aw._path2string;return bi
},null,aF),ba=function(i,R,e,E){return[i,R,e,E,e,E]},aV=function(i,R,bf,S,e,E){var be=1/3,bg=2/3;
return[be*i+bg*bf,be*R+bg*S,be*e+bg*bf,be*E+bg*S,e,E]},Q=function(bo,bT,bx,bv,bp,bj,be,bn,bS,bq){var S=ah.PI,bu=S*120/180,e=S/180*(+bp||0),bB=[],by,bP=ap(function(bU,bX,i){var bW=bU*ah.cos(i)-bX*ah.sin(i),bV=bU*ah.sin(i)+bX*ah.cos(i);
return{x:bW,y:bV}});if(!bq){by=bP(bo,bT,-e);bo=by.x;bT=by.y;by=bP(bn,bS,-e);bn=by.x;
bS=by.y;var E=ah.cos(S/180*bp),bl=ah.sin(S/180*bp),bD=(bo-bn)/2,bC=(bT-bS)/2;var bN=(bD*bD)/(bx*bx)+(bC*bC)/(bv*bv);
if(bN>1){bN=ah.sqrt(bN);bx=bN*bx;bv=bN*bv}var R=bx*bx,bG=bv*bv,bI=(bj==be?-1:1)*ah.sqrt(ah.abs((R*bG-R*bC*bC-bG*bD*bD)/(R*bC*bC+bG*bD*bD))),bs=bI*bx*bC/bv+(bo+bn)/2,br=bI*-bv*bD/bx+(bT+bS)/2,bi=ah.asin(((bT-br)/bv).toFixed(7)),bh=ah.asin(((bS-br)/bv).toFixed(7));
bi=bo<bs?S-bi:bi;bh=bn<bs?S-bh:bh;bi<0&&(bi=S*2+bi);bh<0&&(bh=S*2+bh);if(be&&bi>bh){bi=bi-S*2
}if(!be&&bh>bi){bh=bh-S*2}}else{bi=bq[0];bh=bq[1];bs=bq[2];br=bq[3]}var bm=bh-bi;
if(ah.abs(bm)>bu){var bt=bh,bw=bn,bk=bS;bh=bi+bu*(be&&bh>bi?1:-1);bn=bs+bx*ah.cos(bh);
bS=br+bv*ah.sin(bh);bB=Q(bn,bS,bx,bv,bp,0,be,bw,bk,[bh,bt,bs,br])}bm=bh-bi;var bg=ah.cos(bi),bR=ah.sin(bi),bf=ah.cos(bh),bQ=ah.sin(bh),bE=ah.tan(bm/4),bH=4/3*bx*bE,bF=4/3*bv*bE,bO=[bo,bT],bM=[bo+bH*bR,bT-bF*bg],bL=[bn+bH*bQ,bS-bF*bf],bJ=[bn,bS];
bM[0]=2*bO[0]-bM[0];bM[1]=2*bO[1]-bM[1];if(bq){return[bM,bL,bJ][a4](bB)}else{bB=[bM,bL,bJ][a4](bB)[aJ]()[F](",");
var bz=[];for(var bK=0,bA=bB[o];bK<bA;bK++){bz[bK]=bK%2?bP(bB[bK-1],bB[bK],e).y:bP(bB[bK],bB[bK+1],e).x
}return bz}},V=function(i,e,R,E,bh,bg,bf,be,bi){var S=1-bi;return{x:aX(S,3)*i+aX(S,2)*3*bi*R+S*3*bi*bi*bh+aX(bi,3)*bf,y:aX(S,3)*e+aX(S,2)*3*bi*E+S*3*bi*bi*bg+aX(bi,3)*be}
},aN=ap(function(E,e,S,R,bo,bn,bk,bh){var bm=(bo-2*S+E)-(bk-2*bo+S),bj=2*(S-E)-2*(bo-S),bg=E-S,bf=(-bj+ah.sqrt(bj*bj-4*bm*bg))/2/bm,be=(-bj-ah.sqrt(bj*bj-4*bm*bg))/2/bm,bi=[e,bh],bl=[E,bk],i;
ah.abs(bf)>1000000000000&&(bf=0.5);ah.abs(be)>1000000000000&&(be=0.5);if(bf>0&&bf<1){i=V(E,e,S,R,bo,bn,bk,bh,bf);
bl[f](i.x);bi[f](i.y)}if(be>0&&be<1){i=V(E,e,S,R,bo,bn,bk,bh,be);bl[f](i.x);bi[f](i.y)
}bm=(bn-2*R+e)-(bh-2*bn+R);bj=2*(R-e)-2*(bn-R);bg=e-R;bf=(-bj+ah.sqrt(bj*bj-4*bm*bg))/2/bm;
be=(-bj-ah.sqrt(bj*bj-4*bm*bg))/2/bm;ah.abs(bf)>1000000000000&&(bf=0.5);ah.abs(be)>1000000000000&&(be=0.5);
if(bf>0&&bf<1){i=V(E,e,S,R,bo,bn,bk,bh,bf);bl[f](i.x);bi[f](i.y)}if(be>0&&be<1){i=V(E,e,S,R,bo,bn,bk,bh,be);
bl[f](i.x);bi[f](i.y)}return{min:{x:aT[a9](0,bl),y:aT[a9](0,bi)},max:{x:h[a9](0,bl),y:h[a9](0,bi)}}
}),N=ap(function(bo,bj){var S=v(bo),bk=bj&&v(bj),bl={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},e={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},bf=function(bp,bq){var i,br;
if(!bp){return["C",bq.x,bq.y,bq.x,bq.y,bq.x,bq.y]}!(bp[0] in {T:1,Q:1})&&(bq.qx=bq.qy=null);
switch(bp[0]){case"M":bq.X=bp[1];bq.Y=bp[2];break;case"A":bp=["C"][a4](Q[a9](0,[bq.x,bq.y][a4](bp.slice(1))));
break;case"S":i=bq.x+(bq.x-(bq.bx||bq.x));br=bq.y+(bq.y-(bq.by||bq.y));bp=["C",i,br][a4](bp.slice(1));
break;case"T":bq.qx=bq.x+(bq.x-(bq.qx||bq.x));bq.qy=bq.y+(bq.y-(bq.qy||bq.y));bp=["C"][a4](aV(bq.x,bq.y,bq.qx,bq.qy,bp[1],bp[2]));
break;case"Q":bq.qx=bp[1];bq.qy=bp[2];bp=["C"][a4](aV(bq.x,bq.y,bp[1],bp[2],bp[3],bp[4]));
break;case"L":bp=["C"][a4](ba(bq.x,bq.y,bp[1],bp[2]));break;case"H":bp=["C"][a4](ba(bq.x,bq.y,bp[1],bq.y));
break;case"V":bp=["C"][a4](ba(bq.x,bq.y,bq.x,bp[1]));break;case"Z":bp=["C"][a4](ba(bq.x,bq.y,bq.X,bq.Y));
break}return bp},E=function(bp,bq){if(bp[bq][o]>7){bp[bq].shift();var br=bp[bq];while(br[o]){bp.splice(bq++,0,["C"][a4](br.splice(0,6)))
}bp.splice(bq,1);bm=h(S[o],bk&&bk[o]||0)}},R=function(bt,bs,bq,bp,br){if(bt&&bs&&bt[br][0]=="M"&&bs[br][0]!="M"){bs.splice(br,0,["M",bp.x,bp.y]);
bq.bx=0;bq.by=0;bq.x=bt[br][1];bq.y=bt[br][2];bm=h(S[o],bk&&bk[o]||0)}};for(var bh=0,bm=h(S[o],bk&&bk[o]||0);
bh<bm;bh++){S[bh]=bf(S[bh],bl);E(S,bh);bk&&(bk[bh]=bf(bk[bh],e));bk&&E(bk,bh);R(S,bk,bl,e,bh);
R(bk,S,e,bl,bh);var bg=S[bh],bn=bk&&bk[bh],be=bg[o],bi=bk&&bn[o];bl.x=bg[be-2];bl.y=bg[be-1];
bl.bx=ac(bg[be-4])||bl.x;bl.by=ac(bg[be-3])||bl.y;e.bx=bk&&(ac(bn[bi-4])||e.x);e.by=bk&&(ac(bn[bi-3])||e.y);
e.x=bk&&bn[bi-2];e.y=bk&&bn[bi-1]}return bk?[S,bk]:S},null,aF),t=ap(function(bi){var bh=[];
for(var be=0,bj=bi[o];be<bj;be++){var e={},bg=bi[be].match(/^([^:]*):?([\d\.]*)/);
e.color=aw.getRGB(bg[1]);if(e.color.error){return null}e.color=e.color.hex;bg[2]&&(e.offset=bg[2]+"%");
bh[f](e)}for(be=1,bj=bh[o]-1;be<bj;be++){if(!bh[be].offset){var E=ac(bh[be-1].offset||0),R=0;
for(var S=be+1;S<bj;S++){if(bh[S].offset){R=bh[S].offset;break}}if(!R){R=100;S=bj
}R=ac(R);var bf=(R-E)/(S-be+1);for(;be<S;be++){E+=bf;bh[be].offset=E+"%"}}}return bh
}),ax=function(e,S,E,R){var i;if(aw.is(e,"string")||aw.is(e,"object")){i=aw.is(e,"string")?T.getElementById(e):e;
if(i.tagName){if(S==null){return{container:i,width:i.style.pixelWidth||i.offsetWidth,height:i.style.pixelHeight||i.offsetHeight}
}else{return{container:i,width:S,height:E}}}}else{if(aw.is(e,at)&&R!=null){return{container:1,x:e,y:S,width:E,height:R}
}}},aR=function(e,E){var i=this;for(var R in E){if(E[Y](R)&&!(R in e)){switch(typeof E[R]){case"function":(function(S){e[R]=e===i?S:function(){return S[a9](i,arguments)
}})(E[R]);break;case"object":e[R]=e[R]||{};aR.call(this,e[R],E[R]);break;default:e[R]=E[R];
break}}}},ar=function(e,i){e==i.top&&(i.top=e.prev);e==i.bottom&&(i.bottom=e.next);
e.next&&(e.next.prev=e.prev);e.prev&&(e.prev.next=e.next)},ae=function(e,i){if(i.top===e){return
}ar(e,i);e.next=null;e.prev=i.top;i.top.next=e;i.top=e},m=function(e,i){if(i.bottom===e){return
}ar(e,i);e.next=i.bottom;e.prev=null;i.bottom.prev=e;i.bottom=e},G=function(i,e,E){ar(i,E);
e==E.top&&(E.top=i);e.next&&(e.next.prev=i);i.next=e.next;i.prev=e;e.next=i},az=function(i,e,E){ar(i,E);
e==E.bottom&&(E.bottom=i);e.prev&&(e.prev.next=i);i.prev=e.prev;e.prev=i;i.next=e
},w=function(e){return function(){throw new Error("Rapha\xebl: you are calling to method \u201c"+e+"\u201d of removed object")
}},aB=/^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/;if(aw.svg){a6[bb].svgns="http://www.w3.org/2000/svg";
a6[bb].xlink="http://www.w3.org/1999/xlink";W=function(e){return +e+(~~e===e)*0.5
};var ab=function(be){for(var E=0,R=be[o];E<R;E++){if(bd.call(be[E][0])!="a"){for(var e=1,S=be[E][o];
e<S;e++){be[E][e]=W(be[E][e])}}else{be[E][6]=W(be[E][6]);be[E][7]=W(be[E][7])}}return be
},aU=function(E,e){if(e){for(var i in e){if(e[Y](i)){E[A](i,e[i]+aC)}}}else{return T.createElementNS(a6[bb].svgns,E)
}};aw[aL]=function(){return"Your browser supports SVG.\nYou are running Rapha\xebl "+this.version
};var u=function(e,R){var i=aU("path");R.canvas&&R.canvas[aW](i);var E=new aH(i,R);
E.type="path";ag(E,{fill:"none",stroke:"#000",path:e});return E};var b=function(S,bn,e){var bk="linear",bh=0.5,bf=0.5,bp=S.style;
bn=(bn+aC)[a1](aB,function(br,i,bs){bk="radial";if(i&&bs){bh=ac(i);bf=ac(bs);var bq=((bf>0.5)*2-1);
aX(bh-0.5,2)+aX(bf-0.5,2)>0.25&&(bf=ah.sqrt(0.25-aX(bh-0.5,2))*bq+0.5)&&bf!=0.5&&(bf=bf.toFixed(5)-0.00001*bq)
}return aC});bn=bn[F](/\s*\-\s*/);if(bk=="linear"){var bg=bn.shift();bg=-ac(bg);if(isNaN(bg)){return null
}var be=[0,0,ah.cos(bg*ah.PI/180),ah.sin(bg*ah.PI/180)],bm=1/(h(ah.abs(be[2]),ah.abs(be[3]))||1);
be[2]*=bm;be[3]*=bm;if(be[2]<0){be[0]=-be[2];be[2]=0}if(be[3]<0){be[1]=-be[3];be[3]=0
}}var bj=t(bn);if(!bj){return null}var E=S.getAttribute("fill");E=E.match(/^url\(#(.*)\)$/);
E&&e.defs.removeChild(T.getElementById(E[1]));var R=aU(bk+"Gradient");R.id="r"+(aw._id++)[aL](36);
aU(R,bk=="radial"?{fx:bh,fy:bf}:{x1:be[0],y1:be[1],x2:be[2],y2:be[3]});e.defs[aW](R);
for(var bi=0,bo=bj[o];bi<bo;bi++){var bl=aU("stop");aU(bl,{offset:bj[bi].offset?bj[bi].offset:!bi?"0%":"100%","stop-color":bj[bi].color||"#fff"});
R[aW](bl)}aU(S,{fill:"url(#"+R.id+")",opacity:1,"fill-opacity":1});bp.fill=aC;bp.opacity=1;
bp.fillOpacity=1;return 1};var U=function(i){var e=i.getBBox();aU(i.pattern,{patternTransform:aw.format("translate({0},{1})",e.x,e.y)})
};var ag=function(bl,bu){var bo={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},bq=bl.node,bm=bl.attrs,bi=bl.rotate(),be=function(bB,bA){bA=bo[bd.call(bA)];
if(bA){var by=bB.attrs["stroke-width"]||"1",bw={round:by,square:by,butt:0}[bB.attrs["stroke-linecap"]||bu["stroke-linecap"]]||0,bz=[];
var bx=bA[o];while(bx--){bz[bx]=bA[bx]*by+((bx%2)?1:-1)*bw}aU(bq,{"stroke-dasharray":bz[aJ](",")})
}};bu[Y]("rotation")&&(bi=bu.rotation);var bh=(bi+aC)[F](a);if(!(bh.length-1)){bh=null
}else{bh[1]=+bh[1];bh[2]=+bh[2]}ac(bi)&&bl.rotate(0,true);for(var bp in bu){if(bu[Y](bp)){if(!l[Y](bp)){continue
}var bn=bu[bp];bm[bp]=bn;switch(bp){case"blur":bl.blur(bn);break;case"rotation":bl.rotate(bn,true);
break;case"href":case"title":case"target":var bs=bq.parentNode;if(bd.call(bs.tagName)!="a"){var R=aU("a");
bs.insertBefore(R,bq);R[aW](bq);bs=R}bs.setAttributeNS(bl.paper.xlink,bp,bn);break;
case"cursor":bq.style.cursor=bn;break;case"clip-rect":var i=(bn+aC)[F](a);if(i[o]==4){bl.clip&&bl.clip.parentNode.parentNode.removeChild(bl.clip.parentNode);
var E=aU("clipPath"),br=aU("rect");E.id="r"+(aw._id++)[aL](36);aU(br,{x:i[0],y:i[1],width:i[2],height:i[3]});
E[aW](br);bl.paper.defs[aW](E);aU(bq,{"clip-path":"url(#"+E.id+")"});bl.clip=br}if(!bn){var bt=T.getElementById(bq.getAttribute("clip-path")[a1](/(^url\(#|\)$)/g,aC));
bt&&bt.parentNode.removeChild(bt);aU(bq,{"clip-path":aC});delete bl.clip}break;case"path":if(bl.type=="path"){aU(bq,{d:bn?bm.path=ab(v(bn)):"M0,0"})
}break;case"width":bq[A](bp,bn);if(bm.fx){bp="x";bn=bm.x}else{break}case"x":if(bm.fx){bn=-bm.x-(bm.width||0)
}case"rx":if(bp=="rx"&&bl.type=="rect"){break}case"cx":bh&&(bp=="x"||bp=="cx")&&(bh[1]+=bn-bm[bp]);
bq[A](bp,W(bn));bl.pattern&&U(bl);break;case"height":bq[A](bp,bn);if(bm.fy){bp="y";
bn=bm.y}else{break}case"y":if(bm.fy){bn=-bm.y-(bm.height||0)}case"ry":if(bp=="ry"&&bl.type=="rect"){break
}case"cy":bh&&(bp=="y"||bp=="cy")&&(bh[2]+=bn-bm[bp]);bq[A](bp,W(bn));bl.pattern&&U(bl);
break;case"r":if(bl.type=="rect"){aU(bq,{rx:bn,ry:bn})}else{bq[A](bp,bn)}break;case"src":if(bl.type=="image"){bq.setAttributeNS(bl.paper.xlink,"href",bn)
}break;case"stroke-width":bq.style.strokeWidth=bn;bq[A](bp,bn);if(bm["stroke-dasharray"]){be(bl,bm["stroke-dasharray"])
}break;case"stroke-dasharray":be(bl,bn);break;case"translation":var bf=(bn+aC)[F](a);
bf[0]=+bf[0]||0;bf[1]=+bf[1]||0;if(bh){bh[1]+=bf[0];bh[2]+=bf[1]}x.call(bl,bf[0],bf[1]);
break;case"scale":bf=(bn+aC)[F](a);bl.scale(+bf[0]||1,+bf[1]||+bf[0]||1,isNaN(ac(bf[2]))?null:+bf[2],isNaN(ac(bf[3]))?null:+bf[3]);
break;case"fill":var S=(bn+aC).match(c);if(S){E=aU("pattern");var bk=aU("image");
E.id="r"+(aw._id++)[aL](36);aU(E,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1});
aU(bk,{x:0,y:0});bk.setAttributeNS(bl.paper.xlink,"href",S[1]);E[aW](bk);var bv=T.createElement("img");
bv.style.cssText="position:absolute;left:-9999em;top-9999em";bv.onload=function(){aU(E,{width:this.offsetWidth,height:this.offsetHeight});
aU(bk,{width:this.offsetWidth,height:this.offsetHeight});T.body.removeChild(this);
bl.paper.safari()};T.body[aW](bv);bv.src=S[1];bl.paper.defs[aW](E);bq.style.fill="url(#"+E.id+")";
aU(bq,{fill:"url(#"+E.id+")"});bl.pattern=E;bl.pattern&&U(bl);break}if(!aw.getRGB(bn).error){delete bu.gradient;
delete bm.gradient;!aw.is(bm.opacity,"undefined")&&aw.is(bu.opacity,"undefined")&&aU(bq,{opacity:bm.opacity});
!aw.is(bm["fill-opacity"],"undefined")&&aw.is(bu["fill-opacity"],"undefined")&&aU(bq,{"fill-opacity":bm["fill-opacity"]})
}else{if((({circle:1,ellipse:1})[Y](bl.type)||(bn+aC).charAt()!="r")&&b(bq,bn,bl.paper)){bm.gradient=bn;
bm.fill="none";break}}case"stroke":bq[A](bp,aw.getRGB(bn).hex);break;case"gradient":(({circle:1,ellipse:1})[Y](bl.type)||(bn+aC).charAt()!="r")&&b(bq,bn,bl.paper);
break;case"opacity":case"fill-opacity":if(bm.gradient){var e=T.getElementById(bq.getAttribute("fill")[a1](/^url\(#|\)$/g,aC));
if(e){var bg=e.getElementsByTagName("stop");bg[bg[o]-1][A]("stop-opacity",bn)}break
}default:bp=="font-size"&&(bn=M(bn,10)+"px");var bj=bp[a1](/(\-.)/g,function(bw){return aZ.call(bw.substring(1))
});bq.style[bj]=bn;bq[A](bp,bn);break}}}K(bl,bu);if(bh){bl.rotate(bh.join(av))}else{ac(bi)&&bl.rotate(bi,true)
}};var j=1.2,K=function(e,S){if(e.type!="text"||!(S[Y]("text")||S[Y]("font")||S[Y]("font-size")||S[Y]("x")||S[Y]("y"))){return
}var bi=e.attrs,E=e.node,bk=E.firstChild?M(T.defaultView.getComputedStyle(E.firstChild,aC).getPropertyValue("font-size"),10):10;
if(S[Y]("text")){bi.text=S.text;while(E.firstChild){E.removeChild(E.firstChild)}var R=(S.text+aC)[F]("\n");
for(var be=0,bj=R[o];be<bj;be++){if(R[be]){var bg=aU("tspan");be&&aU(bg,{dy:bk*j,x:bi.x});
bg[aW](T.createTextNode(R[be]));E[aW](bg)}}}else{R=E.getElementsByTagName("tspan");
for(be=0,bj=R[o];be<bj;be++){be&&aU(R[be],{dy:bk*j,x:bi.x})}}aU(E,{y:bi.y});var bf=e.getBBox(),bh=bi.y-(bf.y+bf.height/2);
bh&&isFinite(bh)&&aU(E,{y:bi.y+bh})},aH=function(i,e){var R=0,E=0;this[0]=i;this.id=aw._oid++;
this.node=i;i.raphael=this;this.paper=e;this.attrs=this.attrs||{};this.transformations=[];
this._={tx:0,ty:0,rt:{deg:0,cx:0,cy:0},sx:1,sy:1};!e.bottom&&(e.bottom=this);this.prev=e.top;
e.top&&(e.top.next=this);e.top=this;this.next=null};aH[bb].rotate=function(i,e,R){if(this.removed){return this
}if(i==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][aJ](av)
}return this._.rt.deg}var E=this.getBBox();i=(i+aC)[F](a);if(i[o]-1){e=ac(i[1]);R=ac(i[2])
}i=ac(i[0]);if(e!=null){this._.rt.deg=i}else{this._.rt.deg+=i}(R==null)&&(e=null);
this._.rt.cx=e;this._.rt.cy=R;e=e==null?E.x+E.width/2:e;R=R==null?E.y+E.height/2:R;
if(this._.rt.deg){this.transformations[0]=aw.format("rotate({0} {1} {2})",this._.rt.deg,e,R);
this.clip&&aU(this.clip,{transform:aw.format("rotate({0} {1} {2})",-this._.rt.deg,e,R)})
}else{this.transformations[0]=aC;this.clip&&aU(this.clip,{transform:aC})}aU(this.node,{transform:this.transformations[aJ](av)});
return this};aH[bb].hide=function(){!this.removed&&(this.node.style.display="none");
return this};aH[bb].show=function(){!this.removed&&(this.node.style.display="");return this
};aH[bb].remove=function(){if(this.removed){return}ar(this,this.paper);this.node.parentNode.removeChild(this.node);
for(var e in this){delete this[e]}this.removed=true};aH[bb].getBBox=function(){if(this.removed){return this
}if(this.type=="path"){return aa(this.attrs.path)}if(this.node.style.display=="none"){this.show();
var R=true}var bg={};try{bg=this.node.getBBox()}catch(be){}finally{bg=bg||{}}if(this.type=="text"){bg={x:bg.x,y:Infinity,width:0,height:0};
for(var E=0,S=this.node.getNumberOfChars();E<S;E++){var bf=this.node.getExtentOfChar(E);
(bf.y<bg.y)&&(bg.y=bf.y);(bf.y+bf.height-bg.y>bg.height)&&(bg.height=bf.y+bf.height-bg.y);
(bf.x+bf.width-bg.x>bg.width)&&(bg.width=bf.x+bf.width-bg.x)}}R&&this.hide();return bg
};aH[bb].attr=function(R,bg){if(this.removed){return this}if(R==null){var be={};for(var S in this.attrs){if(this.attrs[Y](S)){be[S]=this.attrs[S]
}}this._.rt.deg&&(be.rotation=this.rotate());(this._.sx!=1||this._.sy!=1)&&(be.scale=this.scale());
be.gradient&&be.fill=="none"&&(be.fill=be.gradient)&&delete be.gradient;return be
}if(bg==null&&aw.is(R,"string")){if(R=="translation"){return x.call(this)}if(R=="rotation"){return this.rotate()
}if(R=="scale"){return this.scale()}if(R=="fill"&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[R]}if(bg==null&&aw.is(R,"array")){var e={};for(var E=0,bf=R.length;
E<bf;E++){e[R[E]]=this.attr(R[E])}return e}if(bg!=null){var bh={};bh[R]=bg;ag(this,bh)
}else{if(R!=null&&aw.is(R,"object")){ag(this,R)}}return this};aH[bb].toFront=function(){if(this.removed){return this
}this.node.parentNode[aW](this.node);var e=this.paper;e.top!=this&&ae(this,e);return this
};aH[bb].toBack=function(){if(this.removed){return this}if(this.node.parentNode.firstChild!=this.node){this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild);
m(this,this.paper);var e=this.paper}return this};aH[bb].insertAfter=function(e){if(this.removed){return this
}var i=e.node;if(i.nextSibling){i.parentNode.insertBefore(this.node,i.nextSibling)
}else{i.parentNode[aW](this.node)}G(this,e,this.paper);return this};aH[bb].insertBefore=function(e){if(this.removed){return this
}var i=e.node;i.parentNode.insertBefore(this.node,i);az(this,e,this.paper);return this
};aH[bb].blur=function(i){var e=this;if(+i!==0){var E=aU("filter"),R=aU("feGaussianBlur");
e.attrs.blur=i;E.id="r"+(aw._id++)[aL](36);aU(R,{stdDeviation:+i||1.5});E.appendChild(R);
e.paper.defs.appendChild(E);e._blur=E;aU(e.node,{filter:"url(#"+E.id+")"})}else{if(e._blur){e._blur.parentNode.removeChild(e._blur);
delete e._blur;delete e.attrs.blur}e.node.removeAttribute("filter")}};var X=function(i,e,be,S){e=W(e);
be=W(be);var R=aU("circle");i.canvas&&i.canvas[aW](R);var E=new aH(R,i);E.attrs={cx:e,cy:be,r:S,fill:"none",stroke:"#000"};
E.type="circle";aU(R,E.attrs);return E};var aQ=function(E,e,bg,i,be,bf){e=W(e);bg=W(bg);
var S=aU("rect");E.canvas&&E.canvas[aW](S);var R=new aH(S,E);R.attrs={x:e,y:bg,width:i,height:be,r:bf||0,rx:bf||0,ry:bf||0,fill:"none",stroke:"#000"};
R.type="rect";aU(S,R.attrs);return R};var ao=function(i,e,bf,be,S){e=W(e);bf=W(bf);
var R=aU("ellipse");i.canvas&&i.canvas[aW](R);var E=new aH(R,i);E.attrs={cx:e,cy:bf,rx:be,ry:S,fill:"none",stroke:"#000"};
E.type="ellipse";aU(R,E.attrs);return E};var s=function(E,bf,e,bg,i,be){var S=aU("image");
aU(S,{x:e,y:bg,width:i,height:be,preserveAspectRatio:"none"});S.setAttributeNS(E.xlink,"href",bf);
E.canvas&&E.canvas[aW](S);var R=new aH(S,E);R.attrs={x:e,y:bg,width:i,height:be,src:bf};
R.type="image";return R};var ad=function(i,e,be,S){var R=aU("text");aU(R,{x:e,y:be,"text-anchor":"middle"});
i.canvas&&i.canvas[aW](R);var E=new aH(R,i);E.attrs={x:e,y:be,"text-anchor":"middle",text:S,font:l.font,stroke:"none",fill:"#000"};
E.type="text";ag(E,E.attrs);return E};var a8=function(i,e){this.width=i||this.width;
this.height=e||this.height;this.canvas[A]("width",this.width);this.canvas[A]("height",this.height);
return this};var B=function(){var R=ax[a9](0,arguments),E=R&&R.container,i=R.x,bf=R.y,S=R.width,e=R.height;
if(!E){throw new Error("SVG container not found.")}var be=aU("svg");S=S||512;e=e||342;
aU(be,{xmlns:"http://www.w3.org/2000/svg",version:1.1,width:S,height:e});if(E==1){be.style.cssText="position:absolute;left:"+i+"px;top:"+bf+"px";
T.body[aW](be)}else{if(E.firstChild){E.insertBefore(be,E.firstChild)}else{E[aW](be)
}}E=new a6;E.width=S;E.height=e;E.canvas=be;aR.call(E,E,aw.fn);E.clear();return E
};a6[bb].clear=function(){var e=this.canvas;while(e.firstChild){e.removeChild(e.firstChild)
}this.bottom=this.top=null;(this.desc=aU("desc"))[aW](T.createTextNode("Created with Rapha\xebl"));
e[aW](this.desc);e[aW](this.defs=aU("defs"))};a6[bb].remove=function(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);
for(var e in this){this[e]=w(e)}}}if(aw.vml){var J={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},aA=/([clmz]),?([^clmz]*)/gi,bc=/-?[^,\s-]+/g,aK=1000+av+1000,q=10,aS=function(bk){var bh=/[ahqstv]/ig,R=v;
(bk+aC).match(bh)&&(R=N);bh=/[clmz]/g;if(R==v&&!(bk+aC).match(bh)){var bg=(bk+aC)[a1](aA,function(bn,bp,bl){var bo=[],i=bd.call(bp)=="m",bm=J[bp];
bl[a1](bc,function(bq){if(i&&bo[o]==2){bm+=bo+J[bp=="m"?"l":"L"];bo=[]}bo[f](W(bq*q))
});return bm+bo});return bg}var bi=R(bk),E,e;bg=[];for(var be=0,bj=bi[o];be<bj;be++){E=bi[be];
e=bd.call(bi[be][0]);e=="z"&&(e="x");for(var S=1,bf=E[o];S<bf;S++){e+=W(E[S]*q)+(S!=bf-1?",":aC)
}bg[f](e)}return bg[aJ](av)};aw[aL]=function(){return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl "+this.version
};u=function(E,i){var be=an("group");be.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
be.coordsize=i.coordsize;be.coordorigin=i.coordorigin;var S=an("shape"),R=S.style;
R.width=i.width+"px";R.height=i.height+"px";S.coordsize=aK;S.coordorigin=i.coordorigin;
be[aW](S);var bf=new aH(S,be,i),e={fill:"none",stroke:"#000"};E&&(e.path=E);bf.isAbsolute=true;
bf.type="path";bf.path=[];bf.Path=aC;ag(bf,e);i.canvas[aW](be);return bf};ag=function(bi,bn){bi.attrs=bi.attrs||{};
var bl=bi.node,bo=bi.attrs,bf=bl.style,R,bs=bi;for(var bg in bn){if(bn[Y](bg)){bo[bg]=bn[bg]
}}bn.href&&(bl.href=bn.href);bn.title&&(bl.title=bn.title);bn.target&&(bl.target=bn.target);
bn.cursor&&(bf.cursor=bn.cursor);"blur" in bn&&bi.blur(bn.blur);if(bn.path&&bi.type=="path"){bo.path=bn.path;
bl.path=aS(bo.path)}if(bn.rotation!=null){bi.rotate(bn.rotation,true)}if(bn.translation){R=(bn.translation+aC)[F](a);
x.call(bi,R[0],R[1]);if(bi._.rt.cx!=null){bi._.rt.cx+=+R[0];bi._.rt.cy+=+R[1];bi.setBox(bi.attrs,R[0],R[1])
}}if(bn.scale){R=(bn.scale+aC)[F](a);bi.scale(+R[0]||1,+R[1]||+R[0]||1,+R[2]||null,+R[3]||null)
}if("clip-rect" in bn){var e=(bn["clip-rect"]+aC)[F](a);if(e[o]==4){e[2]=+e[2]+(+e[0]);
e[3]=+e[3]+(+e[1]);var bh=bl.clipRect||T.createElement("div"),br=bh.style,be=bl.parentNode;
br.clip=aw.format("rect({1}px {2}px {3}px {0}px)",e);if(!bl.clipRect){br.position="absolute";
br.top=0;br.left=0;br.width=bi.paper.width+"px";br.height=bi.paper.height+"px";be.parentNode.insertBefore(bh,be);
bh[aW](be);bl.clipRect=bh}}if(!bn["clip-rect"]){bl.clipRect&&(bl.clipRect.style.clip=aC)
}}if(bi.type=="image"&&bn.src){bl.src=bn.src}if(bi.type=="image"&&bn.opacity){bl.filterOpacity=" progid:DXImageTransform.Microsoft.Alpha(opacity="+(bn.opacity*100)+")";
bf.filter=(bl.filterMatrix||aC)+(bl.filterOpacity||aC)}bn.font&&(bf.font=bn.font);
bn["font-family"]&&(bf.fontFamily='"'+bn["font-family"][F](",")[0][a1](/^['"]+|['"]+$/g,aC)+'"');
bn["font-size"]&&(bf.fontSize=bn["font-size"]);bn["font-weight"]&&(bf.fontWeight=bn["font-weight"]);
bn["font-style"]&&(bf.fontStyle=bn["font-style"]);if(bn.opacity!=null||bn["stroke-width"]!=null||bn.fill!=null||bn.stroke!=null||bn["stroke-width"]!=null||bn["stroke-opacity"]!=null||bn["fill-opacity"]!=null||bn["stroke-dasharray"]!=null||bn["stroke-miterlimit"]!=null||bn["stroke-linejoin"]!=null||bn["stroke-linecap"]!=null){bl=bi.shape||bl;
var bm=(bl.getElementsByTagName("fill")&&bl.getElementsByTagName("fill")[0]),bp=false;
!bm&&(bp=bm=an("fill"));if("fill-opacity" in bn||"opacity" in bn){var i=((+bo["fill-opacity"]+1||2)-1)*((+bo.opacity+1||2)-1);
i<0&&(i=0);i>1&&(i=1);bm.opacity=i}bn.fill&&(bm.on=true);if(bm.on==null||bn.fill=="none"){bm.on=false
}if(bm.on&&bn.fill){var E=bn.fill.match(c);if(E){bm.src=E[1];bm.type="tile"}else{bm.color=aw.getRGB(bn.fill).hex;
bm.src=aC;bm.type="solid";if(aw.getRGB(bn.fill).error&&(bs.type in {circle:1,ellipse:1}||(bn.fill+aC).charAt()!="r")&&b(bs,bn.fill)){bo.fill="none";
bo.gradient=bn.fill}}}bp&&bl[aW](bm);var S=(bl.getElementsByTagName("stroke")&&bl.getElementsByTagName("stroke")[0]),bq=false;
!S&&(bq=S=an("stroke"));if((bn.stroke&&bn.stroke!="none")||bn["stroke-width"]||bn["stroke-opacity"]!=null||bn["stroke-dasharray"]||bn["stroke-miterlimit"]||bn["stroke-linejoin"]||bn["stroke-linecap"]){S.on=true
}(bn.stroke=="none"||S.on==null||bn.stroke==0||bn["stroke-width"]==0)&&(S.on=false);
S.on&&bn.stroke&&(S.color=aw.getRGB(bn.stroke).hex);i=((+bo["stroke-opacity"]+1||2)-1)*((+bo.opacity+1||2)-1);
var bj=(ac(bn["stroke-width"])||1)*0.75;i<0&&(i=0);i>1&&(i=1);bn["stroke-width"]==null&&(bj=bo["stroke-width"]);
bn["stroke-width"]&&(S.weight=bj);bj&&bj<1&&(i*=bj)&&(S.weight=1);S.opacity=i;bn["stroke-linejoin"]&&(S.joinstyle=bn["stroke-linejoin"]||"miter");
S.miterlimit=bn["stroke-miterlimit"]||8;bn["stroke-linecap"]&&(S.endcap=bn["stroke-linecap"]=="butt"?"flat":bn["stroke-linecap"]=="square"?"square":"round");
if(bn["stroke-dasharray"]){var bk={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};
S.dashstyle=bk[Y](bn["stroke-dasharray"])?bk[bn["stroke-dasharray"]]:aC}bq&&bl[aW](S)
}if(bs.type=="text"){bf=bs.paper.span.style;bo.font&&(bf.font=bo.font);bo["font-family"]&&(bf.fontFamily=bo["font-family"]);
bo["font-size"]&&(bf.fontSize=bo["font-size"]);bo["font-weight"]&&(bf.fontWeight=bo["font-weight"]);
bo["font-style"]&&(bf.fontStyle=bo["font-style"]);bs.node.string&&(bs.paper.span.innerHTML=(bs.node.string+aC)[a1](/</g,"&#60;")[a1](/&/g,"&#38;")[a1](/\n/g,"<br>"));
bs.W=bo.w=bs.paper.span.offsetWidth;bs.H=bo.h=bs.paper.span.offsetHeight;bs.X=bo.x;
bs.Y=bo.y+W(bs.H/2);switch(bo["text-anchor"]){case"start":bs.node.style["v-text-align"]="left";
bs.bbx=W(bs.W/2);break;case"end":bs.node.style["v-text-align"]="right";bs.bbx=-W(bs.W/2);
break;default:bs.node.style["v-text-align"]="center";break}}};b=function(e,bg){e.attrs=e.attrs||{};
var bh=e.attrs,bj=e.node.getElementsByTagName("fill"),be="linear",bf=".5 .5";e.attrs.gradient=bg;
bg=(bg+aC)[a1](aB,function(bl,bm,i){be="radial";if(bm&&i){bm=ac(bm);i=ac(i);aX(bm-0.5,2)+aX(i-0.5,2)>0.25&&(i=ah.sqrt(0.25-aX(bm-0.5,2))*((i>0.5)*2-1)+0.5);
bf=bm+av+i}return aC});bg=bg[F](/\s*\-\s*/);if(be=="linear"){var E=bg.shift();E=-ac(E);
if(isNaN(E)){return null}}var S=t(bg);if(!S){return null}e=e.shape||e.node;bj=bj[0]||an("fill");
if(S[o]){bj.on=true;bj.method="none";bj.type=(be=="radial")?"gradientradial":"gradient";
bj.color=S[0].color;bj.color2=S[S[o]-1].color;var bk=[];for(var R=0,bi=S[o];R<bi;
R++){S[R].offset&&bk[f](S[R].offset+av+S[R].color)}bj.colors&&(bj.colors.value=bk[o]?bk[aJ](","):"0% "+bj.color);
if(be=="radial"){bj.focus="100%";bj.focussize=bf;bj.focusposition=bf}else{bj.angle=(270-E)%360
}}return 1};aH=function(S,bf,e){var be=0,E=0,i=0,R=1;this[0]=S;this.id=aw._oid++;
this.node=S;S.raphael=this;this.X=0;this.Y=0;this.attrs={};this.Group=bf;this.paper=e;
this._={tx:0,ty:0,rt:{deg:0},sx:1,sy:1};!e.bottom&&(e.bottom=this);this.prev=e.top;
e.top&&(e.top.next=this);e.top=this;this.next=null};aH[bb].rotate=function(i,e,E){if(this.removed){return this
}if(i==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][aJ](av)
}return this._.rt.deg}i=(i+aC)[F](a);if(i[o]-1){e=ac(i[1]);E=ac(i[2])}i=ac(i[0]);
if(e!=null){this._.rt.deg=i}else{this._.rt.deg+=i}E==null&&(e=null);this._.rt.cx=e;
this._.rt.cy=E;this.setBox(this.attrs,e,E);this.Group.style.rotation=this._.rt.deg;
return this};aH[bb].setBox=function(br,E,e){if(this.removed){return this}var bl=this.Group.style,S=(this.shape&&this.shape.style)||this.node.style;
br=br||{};for(var bp in br){if(br[Y](bp)){this.attrs[bp]=br[bp]}}E=E||this._.rt.cx;
e=e||this._.rt.cy;var bn=this.attrs,bg,bf,bh,bq;switch(this.type){case"circle":bg=bn.cx-bn.r;
bf=bn.cy-bn.r;bh=bq=bn.r*2;break;case"ellipse":bg=bn.cx-bn.rx;bf=bn.cy-bn.ry;bh=bn.rx*2;
bq=bn.ry*2;break;case"rect":case"image":bg=+bn.x;bf=+bn.y;bh=bn.width||0;bq=bn.height||0;
break;case"text":this.textpath.v=["m",W(bn.x),", ",W(bn.y-2),"l",W(bn.x)+1,", ",W(bn.y-2)][aJ](aC);
bg=bn.x-W(this.W/2);bf=bn.y-this.H/2;bh=this.W;bq=this.H;break;case"path":if(!this.attrs.path){bg=0;
bf=0;bh=this.paper.width;bq=this.paper.height}else{var bo=aa(this.attrs.path);bg=bo.x;
bf=bo.y;bh=bo.width;bq=bo.height}break;default:bg=0;bf=0;bh=this.paper.width;bq=this.paper.height;
break}E=(E==null)?bg+bh/2:E;e=(e==null)?bf+bq/2:e;var R=E-this.paper.width/2,bk=e-this.paper.height/2,bj;
bl.left!=(bj=R+"px")&&(bl.left=bj);bl.top!=(bj=bk+"px")&&(bl.top=bj);this.X=this.type=="path"?-R:bg;
this.Y=this.type=="path"?-bk:bf;this.W=bh;this.H=bq;if(this.type=="path"){S.left!=(bj=-R*q+"px")&&(S.left=bj);
S.top!=(bj=-bk*q+"px")&&(S.top=bj)}else{if(this.type=="text"){S.left!=(bj=-R+"px")&&(S.left=bj);
S.top!=(bj=-bk+"px")&&(S.top=bj)}else{bl.width!=(bj=this.paper.width+"px")&&(bl.width=bj);
bl.height!=(bj=this.paper.height+"px")&&(bl.height=bj);S.left!=(bj=bg-R+"px")&&(S.left=bj);
S.top!=(bj=bf-bk+"px")&&(S.top=bj);S.width!=(bj=bh+"px")&&(S.width=bj);S.height!=(bj=bq+"px")&&(S.height=bj);
var be=(+br.r||0)/aT(bh,bq);if(this.type=="rect"&&this.arcsize.toFixed(4)!=be.toFixed(4)&&(be||this.arcsize)){var bm=an("roundrect"),bs={},bi=this.events&&this.events[o];
bp=0;bm.arcsize=be;bm.raphael=this;this.Group[aW](bm);this.Group.removeChild(this.node);
this[0]=this.node=bm;this.arcsize=be;for(bp in bn){bs[bp]=bn[bp]}delete bs.scale;
this.attr(bs);if(this.events){for(;bp<bi;bp++){this.events[bp].unbind=ak(this.node,this.events[bp].name,this.events[bp].f,this)
}}}}}};aH[bb].hide=function(){!this.removed&&(this.Group.style.display="none");return this
};aH[bb].show=function(){!this.removed&&(this.Group.style.display="block");return this
};aH[bb].getBBox=function(){if(this.removed){return this}if(this.type=="path"){return aa(this.attrs.path)
}return{x:this.X+(this.bbx||0),y:this.Y,width:this.W,height:this.H}};aH[bb].remove=function(){if(this.removed){return
}ar(this,this.paper);this.node.parentNode.removeChild(this.node);this.Group.parentNode.removeChild(this.Group);
this.shape&&this.shape.parentNode.removeChild(this.shape);for(var e in this){delete this[e]
}this.removed=true};aH[bb].attr=function(E,bf){if(this.removed){return this}if(E==null){var S={};
for(var R in this.attrs){if(this.attrs[Y](R)){S[R]=this.attrs[R]}}this._.rt.deg&&(S.rotation=this.rotate());
(this._.sx!=1||this._.sy!=1)&&(S.scale=this.scale());S.gradient&&S.fill=="none"&&(S.fill=S.gradient)&&delete S.gradient;
return S}if(bf==null&&aw.is(E,"string")){if(E=="translation"){return x.call(this)
}if(E=="rotation"){return this.rotate()}if(E=="scale"){return this.scale()}if(E=="fill"&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[E]}if(this.attrs&&bf==null&&aw.is(E,"array")){var be,e={};for(R=0,be=E[o];
R<be;R++){e[E[R]]=this.attr(E[R])}return e}var bg;if(bf!=null){bg={};bg[E]=bf}bf==null&&aw.is(E,"object")&&(bg=E);
if(bg){if(bg.text&&this.type=="text"){this.node.string=bg.text}ag(this,bg);if(bg.gradient&&(({circle:1,ellipse:1})[Y](this.type)||(bg.gradient+aC).charAt()!="r")){b(this,bg.gradient)
}(this.type!="path"||this._.rt.deg)&&this.setBox(this.attrs)}return this};aH[bb].toFront=function(){!this.removed&&this.Group.parentNode[aW](this.Group);
this.paper.top!=this&&ae(this,this.paper);return this};aH[bb].toBack=function(){if(this.removed){return this
}if(this.Group.parentNode.firstChild!=this.Group){this.Group.parentNode.insertBefore(this.Group,this.Group.parentNode.firstChild);
m(this,this.paper)}return this};aH[bb].insertAfter=function(e){if(this.removed){return this
}if(e.Group.nextSibling){e.Group.parentNode.insertBefore(this.Group,e.Group.nextSibling)
}else{e.Group.parentNode[aW](this.Group)}G(this,e,this.paper);return this};aH[bb].insertBefore=function(e){if(this.removed){return this
}e.Group.parentNode.insertBefore(this.Group,e.Group);az(this,e,this.paper);return this
};var a5=/ progid:\S+Blur\([^\)]+\)/g;aH[bb].blur=function(e){var i=this.node.style,E=i.filter;
E=E.replace(a5,"");if(+e!==0){this.attrs.blur=e;i.filter=E+" progid:DXImageTransform.Microsoft.Blur(pixelradius="+(+e||1.5)+")";
i.margin=Raphael.format("-{0}px 0 0 -{0}px",Math.round(+e||1.5))}else{i.filter=E;
i.margin=0;delete this.attrs.blur}};X=function(i,e,bg,be){var S=an("group"),bf=an("oval"),E=bf.style;
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aK;S.coordorigin=i.coordorigin;S[aW](bf);var R=new aH(bf,S,i);R.type="circle";
ag(R,{stroke:"#000",fill:"none"});R.attrs.cx=e;R.attrs.cy=bg;R.attrs.r=be;R.setBox({x:e-be,y:bg-be,width:be*2,height:be*2});
i.canvas[aW](S);return R};aQ=function(i,bg,bf,bh,R,e){var S=an("group"),E=an("roundrect"),bi=(+e||0)/(aT(bh,R));
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aK;S.coordorigin=i.coordorigin;S[aW](E);E.arcsize=bi;var be=new aH(E,S,i);
be.type="rect";ag(be,{stroke:"#000"});be.arcsize=bi;be.setBox({x:bg,y:bf,width:bh,height:R,r:e});
i.canvas[aW](S);return be};ao=function(e,bh,bg,E,i){var S=an("group"),R=an("oval"),bf=R.style;
S.style.cssText="position:absolute;left:0;top:0;width:"+e.width+"px;height:"+e.height+"px";
S.coordsize=aK;S.coordorigin=e.coordorigin;S[aW](R);var be=new aH(R,S,e);be.type="ellipse";
ag(be,{stroke:"#000"});be.attrs.cx=bh;be.attrs.cy=bg;be.attrs.rx=E;be.attrs.ry=i;
be.setBox({x:bh-E,y:bg-i,width:E*2,height:i*2});e.canvas[aW](S);return be};s=function(i,e,bh,bg,bi,R){var S=an("group"),E=an("image"),bf=E.style;
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aK;S.coordorigin=i.coordorigin;E.src=e;S[aW](E);var be=new aH(E,S,i);
be.type="image";be.attrs.src=e;be.attrs.x=bh;be.attrs.y=bg;be.attrs.w=bi;be.attrs.h=R;
be.setBox({x:bh,y:bg,width:bi,height:R});i.canvas[aW](S);return be};ad=function(i,bh,bg,bi){var S=an("group"),R=an("shape"),bf=R.style,bj=an("path"),e=bj.style,E=an("textpath");
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aK;S.coordorigin=i.coordorigin;bj.v=aw.format("m{0},{1}l{2},{1}",W(bh*10),W(bg*10),W(bh*10)+1);
bj.textpathok=true;bf.width=i.width;bf.height=i.height;E.string=bi+aC;E.on=true;R[aW](E);
R[aW](bj);S[aW](R);var be=new aH(E,S,i);be.shape=R;be.textpath=bj;be.type="text";
be.attrs.text=bi;be.attrs.x=bh;be.attrs.y=bg;be.attrs.w=1;be.attrs.h=1;ag(be,{font:l.font,stroke:"none",fill:"#000"});
be.setBox();i.canvas[aW](S);return be};a8=function(E,e){var i=this.canvas.style;E==+E&&(E+="px");
e==+e&&(e+="px");i.width=E;i.height=e;i.clip="rect(0 "+E+" "+e+" 0)";return this};
var an;T.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!T.namespaces.rvml&&T.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
an=function(e){return T.createElement("<rvml:"+e+' class="rvml">')}}catch(al){an=function(e){return T.createElement("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
}}B=function(){var E=ax[a9](0,arguments),e=E.container,bh=E.height,bi,i=E.width,bg=E.x,bf=E.y;
if(!e){throw new Error("VML container not found.")}var S=new a6,be=S.canvas=T.createElement("div"),R=be.style;
i=i||512;bh=bh||342;i==+i&&(i+="px");bh==+bh&&(bh+="px");S.width=1000;S.height=1000;
S.coordsize=q*1000+av+q*1000;S.coordorigin="0 0";S.span=T.createElement("span");S.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
be[aW](S.span);R.cssText=aw.format("width:{0};height:{1};position:absolute;clip:rect(0 {0} {1} 0);overflow:hidden",i,bh);
if(e==1){T.body[aW](be);R.left=bg+"px";R.top=bf+"px"}else{e.style.width=i;e.style.height=bh;
if(e.firstChild){e.insertBefore(be,e.firstChild)}else{e[aW](be)}}aR.call(S,S,aw.fn);
return S};a6[bb].clear=function(){this.canvas.innerHTML=aC;this.span=T.createElement("span");
this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
this.canvas[aW](this.span);this.bottom=this.top=null};a6[bb].remove=function(){this.canvas.parentNode.removeChild(this.canvas);
for(var e in this){this[e]=w(e)}return true}}if((/^Apple|^Google/).test(aD.navigator.vendor)&&!(aD.navigator.userAgent.indexOf("Version/4.0")+1)){a6[bb].safari=function(){var e=this.rect(-99,-99,this.width+99,this.height+99);
aD.setTimeout(function(){e.remove()})}}else{a6[bb].safari=function(){}}var ak=(function(){if(T.addEventListener){return function(S,E,i,e){var R=function(be){return i.call(e,be)
};S.addEventListener(E,R,false);return function(){S.removeEventListener(E,R,false);
return true}}}else{if(T.attachEvent){return function(be,R,E,i){var S=function(bf){return E.call(i,bf||aD.event)
};be.attachEvent("on"+R,S);var e=function(){be.detachEvent("on"+R,S);return true};
return e}}}})();for(var ai=L[o];ai--;){(function(e){aH[bb][e]=function(i){if(aw.is(i,"function")){this.events=this.events||[];
this.events.push({name:e,f:i,unbind:ak(this.shape||this.node,e,i,this)})}return this
};aH[bb]["un"+e]=function(R){var E=this.events,i=E[o];while(i--){if(E[i].name==e&&E[i].f==R){E[i].unbind();
E.splice(i,1);!E.length&&delete this.events;return this}}return this}})(L[ai])}aH[bb].hover=function(i,e){return this.mouseover(i).mouseout(e)
};aH[bb].unhover=function(i,e){return this.unmouseover(i).unmouseout(e)};a6[bb].circle=function(e,E,i){return X(this,e||0,E||0,i||0)
};a6[bb].rect=function(e,S,i,E,R){return aQ(this,e||0,S||0,i||0,E||0,R||0)};a6[bb].ellipse=function(e,R,E,i){return ao(this,e||0,R||0,E||0,i||0)
};a6[bb].path=function(e){e&&!aw.is(e,"string")&&!aw.is(e[0],"array")&&(e+=aC);return u(aw.format[a9](aw,arguments),this)
};a6[bb].image=function(R,e,S,i,E){return s(this,R||"about:blank",e||0,S||0,i||0,E||0)
};a6[bb].text=function(e,E,i){return ad(this,e||0,E||0,i||aC)};a6[bb].set=function(e){arguments[o]>1&&(e=Array[bb].splice.call(arguments,0,arguments[o]));
return new Z(e)};a6[bb].setSize=a8;a6[bb].top=a6[bb].bottom=null;a6[bb].raphael=aw;
function z(){return this.x+av+this.y}aH[bb].scale=function(bl,bk,R,E){if(bl==null&&bk==null){return{x:this._.sx,y:this._.sy,toString:z}
}bk=bk||bl;!+bk&&(bk=bl);var bp,bn,bo,bm,bB=this.attrs;if(bl!=0){var bj=this.getBBox(),bg=bj.x+bj.width/2,S=bj.y+bj.height/2,bA=bl/this._.sx,bz=bk/this._.sy;
R=(+R||R==0)?R:bg;E=(+E||E==0)?E:S;var bi=~~(bl/ah.abs(bl)),bf=~~(bk/ah.abs(bk)),bs=this.node.style,bD=R+(bg-R)*bA,bC=E+(S-E)*bz;
switch(this.type){case"rect":case"image":var bh=bB.width*bi*bA,br=bB.height*bf*bz;
this.attr({height:br,r:bB.r*aT(bi*bA,bf*bz),width:bh,x:bD-bh/2,y:bC-br/2});break;
case"circle":case"ellipse":this.attr({rx:bB.rx*bi*bA,ry:bB.ry*bf*bz,r:bB.r*aT(bi*bA,bf*bz),cx:bD,cy:bC});
break;case"path":var bu=aj(bB.path),bv=true;for(var bx=0,bq=bu[o];bx<bq;bx++){var bt=bu[bx],be=aZ.call(bt[0]);
if(be=="M"&&bv){continue}else{bv=false}if(be=="A"){bt[bu[bx][o]-2]*=bA;bt[bu[bx][o]-1]*=bz;
bt[1]*=bi*bA;bt[2]*=bf*bz;bt[5]=+!(bi+bf?!+bt[5]:+bt[5])}else{if(be=="H"){for(var bw=1,by=bt[o];
bw<by;bw++){bt[bw]*=bA}}else{if(be=="V"){for(bw=1,by=bt[o];bw<by;bw++){bt[bw]*=bz
}}else{for(bw=1,by=bt[o];bw<by;bw++){bt[bw]*=(bw%2)?bA:bz}}}}}var e=aa(bu);bp=bD-e.x-e.width/2;
bn=bC-e.y-e.height/2;bu[0][1]+=bp;bu[0][2]+=bn;this.attr({path:bu});break}if(this.type in {text:1,image:1}&&(bi!=1||bf!=1)){if(this.transformations){this.transformations[2]="scale("[a4](bi,",",bf,")");
this.node[A]("transform",this.transformations[aJ](av));bp=(bi==-1)?-bB.x-(bh||0):bB.x;
bn=(bf==-1)?-bB.y-(br||0):bB.y;this.attr({x:bp,y:bn});bB.fx=bi-1;bB.fy=bf-1}else{this.node.filterMatrix=" progid:DXImageTransform.Microsoft.Matrix(M11="[a4](bi,", M12=0, M21=0, M22=",bf,", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
bs.filter=(this.node.filterMatrix||aC)+(this.node.filterOpacity||aC)}}else{if(this.transformations){this.transformations[2]=aC;
this.node[A]("transform",this.transformations[aJ](av));bB.fx=0;bB.fy=0}else{this.node.filterMatrix=aC;
bs.filter=(this.node.filterMatrix||aC)+(this.node.filterOpacity||aC)}}bB.scale=[bl,bk,R,E][aJ](av);
this._.sx=bl;this._.sy=bk}return this};aH[bb].clone=function(){var e=this.attr();
delete e.scale;delete e.translation;return this.paper[this.type]().attr(e)};var g=ap(function(R,e,bg,bf,bm,bl,bk,bj,S){var bi=0,be;
for(var bh=0;bh<1.001;bh+=0.001){var E=aw.findDotsAtSegment(R,e,bg,bf,bm,bl,bk,bj,bh);
bh&&(bi+=aX(aX(be.x-E.x,2)+aX(be.y-E.y,2),0.5));if(bi>=S){return E}be=E}}),aM=function(e,i){return function(bn,S,be){bn=N(bn);
var bj,bi,E,bf,R="",bm={},bk,bh=0;for(var bg=0,bl=bn.length;bg<bl;bg++){E=bn[bg];
if(E[0]=="M"){bj=+E[1];bi=+E[2]}else{bf=p(bj,bi,E[1],E[2],E[3],E[4],E[5],E[6]);if(bh+bf>S){if(i&&!bm.start){bk=g(bj,bi,E[1],E[2],E[3],E[4],E[5],E[6],S-bh);
R+=["C",bk.start.x,bk.start.y,bk.m.x,bk.m.y,bk.x,bk.y];if(be){return R}bm.start=R;
R=["M",bk.x,bk.y+"C",bk.n.x,bk.n.y,bk.end.x,bk.end.y,E[5],E[6]][aJ]();bh+=bf;bj=+E[5];
bi=+E[6];continue}if(!e&&!i){bk=g(bj,bi,E[1],E[2],E[3],E[4],E[5],E[6],S-bh);return{x:bk.x,y:bk.y,alpha:bk.alpha}
}}bh+=bf;bj=+E[5];bi=+E[6]}R+=E}bm.end=R;bk=e?bh:i?bm:aw.findDotsAtSegment(bj,bi,E[1],E[2],E[3],E[4],E[5],E[6],1);
bk.alpha&&(bk={x:bk.x,y:bk.y,alpha:bk.alpha});return bk}},p=ap(function(R,e,bf,be,bl,bk,bj,bi){var S={x:0,y:0},bh=0;
for(var bg=0;bg<1.01;bg+=0.01){var E=V(R,e,bf,be,bl,bk,bj,bi,bg);bg&&(bh+=aX(aX(S.x-E.x,2)+aX(S.y-E.y,2),0.5));
S=E}return bh});var ay=aM(1),I=aM(),P=aM(0,1);aH[bb].getTotalLength=function(){if(this.type!="path"){return
}return ay(this.attrs.path)};aH[bb].getPointAtLength=function(e){if(this.type!="path"){return
}return I(this.attrs.path,e)};aH[bb].getSubpath=function(E,i){if(this.type!="path"){return
}if(ah.abs(this.getTotalLength()-i)<0.000001){return P(this.attrs.path,E).end}var e=P(this.attrs.path,i,1);
return E?P(e,E).end:e};aw.easing_formulas={linear:function(e){return e},"<":function(e){return aX(e,3)
},">":function(e){return aX(e-1,3)+1},"<>":function(e){e=e*2;if(e<1){return aX(e,3)/2
}e-=2;return(aX(e,3)+2)/2},backIn:function(i){var e=1.70158;return i*i*((e+1)*i-e)
},backOut:function(i){i=i-1;var e=1.70158;return i*i*((e+1)*i+e)+1},elastic:function(E){if(E==0||E==1){return E
}var i=0.3,e=i/4;return aX(2,-10*E)*ah.sin((E-e)*(2*ah.PI)/i)+1},bounce:function(R){var i=7.5625,E=2.75,e;
if(R<(1/E)){e=i*R*R}else{if(R<(2/E)){R-=(1.5/E);e=i*R*R+0.75}else{if(R<(2.5/E)){R-=(2.25/E);
e=i*R*R+0.9375}else{R-=(2.625/E);e=i*R*R+0.984375}}}return e}};var O={length:0},a3=function(){var bh=+new Date;
for(var bt in O){if(bt!="length"&&O[Y](bt)){var by=O[bt];if(by.stop||by.el.removed){delete O[bt];
O[o]--;continue}var bf=bh-by.start,bq=by.ms,bp=by.easing,bu=by.from,bm=by.diff,R=by.to,bl=by.t,bo=by.prev||0,bg=by.el,S=by.callback,bn={},E;
if(bf<bq){var be=aw.easing_formulas[bp]?aw.easing_formulas[bp](bf/bq):bf/bq;for(var br in bu){if(bu[Y](br)){switch(af[br]){case"along":E=be*bq*bm[br];
R.back&&(E=R.len-E);var bs=I(R[br],E);bg.translate(bm.sx-bm.x||0,bm.sy-bm.y||0);bm.x=bs.x;
bm.y=bs.y;bg.translate(bs.x-bm.sx,bs.y-bm.sy);R.rot&&bg.rotate(bm.r+bs.alpha,bs.x,bs.y);
break;case"number":E=+bu[br]+be*bq*bm[br];break;case"colour":E="rgb("+[H(W(bu[br].r+be*bq*bm[br].r)),H(W(bu[br].g+be*bq*bm[br].g)),H(W(bu[br].b+be*bq*bm[br].b))][aJ](",")+")";
break;case"path":E=[];for(var bw=0,bk=bu[br][o];bw<bk;bw++){E[bw]=[bu[br][bw][0]];
for(var bv=1,bx=bu[br][bw][o];bv<bx;bv++){E[bw][bv]=+bu[br][bw][bv]+be*bq*bm[br][bw][bv]
}E[bw]=E[bw][aJ](av)}E=E[aJ](av);break;case"csv":switch(br){case"translation":var bj=bm[br][0]*(bf-bo),bi=bm[br][1]*(bf-bo);
bl.x+=bj;bl.y+=bi;E=bj+av+bi;break;case"rotation":E=+bu[br][0]+be*bq*bm[br][0];bu[br][1]&&(E+=","+bu[br][1]+","+bu[br][2]);
break;case"scale":E=[+bu[br][0]+be*bq*bm[br][0],+bu[br][1]+be*bq*bm[br][1],(2 in R[br]?R[br][2]:aC),(3 in R[br]?R[br][3]:aC)][aJ](av);
break;case"clip-rect":E=[];bw=4;while(bw--){E[bw]=+bu[br][bw]+be*bq*bm[br][bw]}break
}break}bn[br]=E}}bg.attr(bn);bg._run&&bg._run.call(bg)}else{if(R.along){bs=I(R.along,R.len*!R.back);
bg.translate(bm.sx-(bm.x||0)+bs.x-bm.sx,bm.sy-(bm.y||0)+bs.y-bm.sy);R.rot&&bg.rotate(bm.r+bs.alpha,bs.x,bs.y)
}(bl.x||bl.y)&&bg.translate(-bl.x,-bl.y);R.scale&&(R.scale=R.scale+aC);bg.attr(R);
delete O[bt];O[o]--;bg.in_animation=null;aw.is(S,"function")&&S.call(bg)}by.prev=bf
}}aw.svg&&bg&&bg.paper.safari();O[o]&&aD.setTimeout(a3)},H=function(e){return e>255?255:(e<0?0:e)
},x=function(e,E){if(e==null){return{x:this._.tx,y:this._.ty,toString:z}}this._.tx+=+e;
this._.ty+=+E;switch(this.type){case"circle":case"ellipse":this.attr({cx:+e+this.attrs.cx,cy:+E+this.attrs.cy});
break;case"rect":case"image":case"text":this.attr({x:+e+this.attrs.x,y:+E+this.attrs.y});
break;case"path":var i=aj(this.attrs.path);i[0][1]+=+e;i[0][2]+=+E;this.attr({path:i});
break}return this};aH[bb].animateWith=function(i,E,e,S,R){O[i.id]&&(E.start=O[i.id].start);
return this.animate(E,e,S,R)};aH[bb].animateAlong=aI();aH[bb].animateAlongBack=aI(1);
function aI(e){return function(R,E,i,be){var S={back:e};aw.is(i,"function")?(be=i):(S.rot=i);
R&&R.constructor==aH&&(R=R.attrs.path);R&&(S.along=R);return this.animate(S,E,be)
}}aH[bb].onAnimation=function(e){this._run=e||0;return this};aH[bb].animate=function(bt,bk,bj,R){if(aw.is(bj,"function")||!bj){R=bj||null
}var bo={},E={},bh={};for(var bl in bt){if(bt[Y](bl)){if(af[Y](bl)){bo[bl]=this.attr(bl);
(bo[bl]==null)&&(bo[bl]=l[bl]);E[bl]=bt[bl];switch(af[bl]){case"along":var br=ay(bt[bl]),bm=I(bt[bl],br*!!bt.back),S=this.getBBox();
bh[bl]=br/bk;bh.tx=S.x;bh.ty=S.y;bh.sx=bm.x;bh.sy=bm.y;E.rot=bt.rot;E.back=bt.back;
E.len=br;bt.rot&&(bh.r=ac(this.rotate())||0);break;case"number":bh[bl]=(E[bl]-bo[bl])/bk;
break;case"colour":bo[bl]=aw.getRGB(bo[bl]);var bn=aw.getRGB(E[bl]);bh[bl]={r:(bn.r-bo[bl].r)/bk,g:(bn.g-bo[bl].g)/bk,b:(bn.b-bo[bl].b)/bk};
break;case"path":var be=N(bo[bl],E[bl]);bo[bl]=be[0];var bi=be[1];bh[bl]=[];for(var bq=0,bg=bo[bl][o];
bq<bg;bq++){bh[bl][bq]=[0];for(var bp=1,bs=bo[bl][bq][o];bp<bs;bp++){bh[bl][bq][bp]=(bi[bq][bp]-bo[bl][bq][bp])/bk
}}break;case"csv":var e=(bt[bl]+aC)[F](a),bf=(bo[bl]+aC)[F](a);switch(bl){case"translation":bo[bl]=[0,0];
bh[bl]=[e[0]/bk,e[1]/bk];break;case"rotation":bo[bl]=(bf[1]==e[1]&&bf[2]==e[2])?bf:[0,e[1],e[2]];
bh[bl]=[(e[0]-bo[bl][0])/bk,0,0];break;case"scale":bt[bl]=e;bo[bl]=(bo[bl]+aC)[F](a);
bh[bl]=[(e[0]-bo[bl][0])/bk,(e[1]-bo[bl][1])/bk,0,0];break;case"clip-rect":bo[bl]=(bo[bl]+aC)[F](a);
bh[bl]=[];bq=4;while(bq--){bh[bl][bq]=(e[bq]-bo[bl][bq])/bk}break}E[bl]=e}}}}this.stop();
this.in_animation=1;O[this.id]={start:bt.start||+new Date,ms:bk,easing:bj,from:bo,diff:bh,to:E,el:this,callback:R,t:{x:0,y:0}};
++O[o]==1&&a3();return this};aH[bb].stop=function(){O[this.id]&&O[o]--;delete O[this.id];
return this};aH[bb].translate=function(e,i){return this.attr({translation:e+" "+i})
};aH[bb][aL]=function(){return"Rapha\xebl\u2019s object"};aw.ae=O;var Z=function(e){this.items=[];
this[o]=0;if(e){for(var E=0,R=e[o];E<R;E++){if(e[E]&&(e[E].constructor==aH||e[E].constructor==Z)){this[this.items[o]]=this.items[this.items[o]]=e[E];
this[o]++}}}};Z[bb][f]=function(){var S,e;for(var E=0,R=arguments[o];E<R;E++){S=arguments[E];
if(S&&(S.constructor==aH||S.constructor==Z)){e=this.items[o];this[e]=this.items[e]=S;
this[o]++}}return this};Z[bb].pop=function(){delete this[this[o]--];return this.items.pop()
};for(var D in aH[bb]){if(aH[bb][Y](D)){Z[bb][D]=(function(e){return function(){for(var E=0,R=this.items[o];
E<R;E++){this.items[E][e][a9](this.items[E],arguments)}return this}})(D)}}Z[bb].attr=function(E,bf){if(E&&aw.is(E,"array")&&aw.is(E[0],"object")){for(var e=0,be=E[o];
e<be;e++){this.items[e].attr(E[e])}}else{for(var R=0,S=this.items[o];R<S;R++){this.items[R].attr(E,bf)
}}return this};Z[bb].animate=function(be,E,bh,bg){(aw.is(bh,"function")||!bh)&&(bg=bh||null);
var e=this.items[o],R=e,bf=this,S;bg&&(S=function(){!--e&&bg.call(bf)});this.items[--R].animate(be,E,bh||S,S);
while(R--){this.items[R].animateWith(this.items[e-1],be,E,bh||S,S)}return this};Z[bb].insertAfter=function(E){var e=this.items[o];
while(e--){this.items[e].insertAfter(E)}return this};Z[bb].getBBox=function(){var e=[],bf=[],E=[],S=[];
for(var R=this.items[o];R--;){var be=this.items[R].getBBox();e[f](be.x);bf[f](be.y);
E[f](be.x+be.width);S[f](be.y+be.height)}e=aT[a9](0,e);bf=aT[a9](0,bf);return{x:e,y:bf,width:h[a9](0,E)-e,height:h[a9](0,S)-bf}
};Z[bb].clone=function(R){R=new Z;for(var e=0,E=this.items[o];e<E;e++){R[f](this.items[e].clone())
}return R};aw.registerFont=function(i){if(!i.face){return i}this.fonts=this.fonts||{};
var R={w:i.w,face:{},glyphs:{}},E=i.face["font-family"];for(var bf in i.face){if(i.face[Y](bf)){R.face[bf]=i.face[bf]
}}if(this.fonts[E]){this.fonts[E][f](R)}else{this.fonts[E]=[R]}if(!i.svg){R.face["units-per-em"]=M(i.face["units-per-em"],10);
for(var S in i.glyphs){if(i.glyphs[Y](S)){var be=i.glyphs[S];R.glyphs[S]={w:be.w,k:{},d:be.d&&"M"+be.d[a1](/[mlcxtrv]/g,function(bg){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[bg]||"M"
})+"z"};if(be.k){for(var e in be.k){if(be[Y](e)){R.glyphs[S].k[e]=be.k[e]}}}}}}return i
};a6[bb].getFont=function(bh,bi,E,S){S=S||"normal";E=E||"normal";bi=+bi||{normal:400,bold:700,lighter:300,bolder:800}[bi]||400;
var be=aw.fonts[bh];if(!be){var R=new RegExp("(^|\\s)"+bh[a1](/[^\w\d\s+!~.:_-]/g,aC)+"(\\s|$)","i");
for(var e in aw.fonts){if(aw.fonts[Y](e)){if(R.test(e)){be=aw.fonts[e];break}}}}var bf;
if(be){for(var bg=0,bj=be[o];bg<bj;bg++){bf=be[bg];if(bf.face["font-weight"]==bi&&(bf.face["font-style"]==E||!bf.face["font-style"])&&bf.face["font-stretch"]==S){break
}}}return bf};a6[bb].print=function(S,R,e,bg,bh,bq){bq=bq||"middle";var bm=this.set(),bp=(e+aC)[F](aC),bn=0,bj=aC,br;
aw.is(bg,"string")&&(bg=this.getFont(bg));if(bg){br=(bh||16)/bg.face["units-per-em"];
var E=bg.face.bbox.split(a),bf=+E[0],bi=+E[1]+(bq=="baseline"?E[3]-E[1]+(+bg.face.descent):(E[3]-E[1])/2);
for(var bl=0,be=bp[o];bl<be;bl++){var bk=bl&&bg.glyphs[bp[bl-1]]||{},bo=bg.glyphs[bp[bl]];
bn+=bl?(bk.w||bg.w)+(bk.k&&bk.k[bp[bl]]||0):0;bo&&bo.d&&bm[f](this.path(bo.d).attr({fill:"#000",stroke:"none",translation:[bn,0]}))
}bm.scale(br,br,bf,bi).translate(S-bf,R-bi)}return bm};var aY=/\{(\d+)\}/g;aw.format=function(i,E){var e=aw.is(E,"array")?[0][a4](E):arguments;
i&&aw.is(i,"string")&&e[o]-1&&(i=i[a1](aY,function(S,R){return e[++R]==null?aC:e[R]
}));return i||aC};aw.ninja=function(){n.was?(Raphael=n.is):delete Raphael;return aw
};aw.el=aH[bb];return aw})();(function(){Raphael.fn.g=Raphael.fn.g||{};Raphael.fn.g.markers={disc:"disc",o:"disc",flower:"flower",f:"flower",diamond:"diamond",d:"diamond",square:"square",s:"square",triangle:"triangle",t:"triangle",star:"star","*":"star",cross:"cross",x:"cross",plus:"plus","+":"plus",arrow:"arrow","->":"arrow"};
Raphael.fn.g.shim={stroke:"none",fill:"#000","fill-opacity":0};Raphael.fn.g.txtattr={font:"12px Arial, sans-serif"};
Raphael.fn.g.colors=[];var b=[0.6,0.2,0.05,0.1333,0.75,0];for(var a=0;a<10;a++){if(a<b.length){Raphael.fn.g.colors.push("hsb("+b[a]+", .75, .75)")
}else{Raphael.fn.g.colors.push("hsb("+b[a-b.length]+", 1, .5)")}}Raphael.fn.g.text=function(c,f,e){return this.text(c,f,e).attr(this.g.txtattr)
};Raphael.fn.g.labelise=function(c,f,e){if(c){return(c+"").replace(/(##+(?:\.#+)?)|(%%+(?:\.%+)?)/g,function(g,i,h){if(i){return(+f).toFixed(i.replace(/^#+\.?/g,"").length)
}if(h){return(f*100/e).toFixed(h.replace(/^%+\.?/g,"").length)+"%"}})}else{return(+f).toFixed(0)
}};Raphael.fn.g.finger=function(j,i,e,l,f,g,h){if((f&&!l)||(!f&&!e)){return h?"":this.path()
}g={square:"square",sharp:"sharp",soft:"soft"}[g]||"round";var n;l=Math.round(l);
e=Math.round(e);j=Math.round(j);i=Math.round(i);switch(g){case"round":if(!f){var c=Math.floor(l/2);
if(e<c){c=e;n=["M",j+0.5,i+0.5-Math.floor(l/2),"l",0,0,"a",c,Math.floor(l/2),0,0,1,0,l,"l",0,0,"z"]
}else{n=["M",j+0.5,i+0.5-c,"l",e-c,0,"a",c,c,0,1,1,0,l,"l",c-e,0,"z"]}}else{var c=Math.floor(e/2);
if(l<c){c=l;n=["M",j-Math.floor(e/2),i,"l",0,0,"a",Math.floor(e/2),c,0,0,1,e,0,"l",0,0,"z"]
}else{n=["M",j-c,i,"l",0,c-l,"a",c,c,0,1,1,e,0,"l",0,l-c,"z"]}}break;case"sharp":if(!f){var m=Math.floor(l/2);
n=["M",j,i+m,"l",0,-l,Math.max(e-m,0),0,Math.min(m,e),m,-Math.min(m,e),m+(m*2<l),"z"]
}else{var m=Math.floor(e/2);n=["M",j+m,i,"l",-e,0,0,-Math.max(l-m,0),m,-Math.min(m,l),m,Math.min(m,l),m,"z"]
}break;case"square":if(!f){n=["M",j,i+Math.floor(l/2),"l",0,-l,e,0,0,l,"z"]}else{n=["M",j+Math.floor(e/2),i,"l",1-e,0,0,-l,e-1,0,"z"]
}break;case"soft":var c;if(!f){c=Math.min(e,Math.round(l/5));n=["M",j+0.5,i+0.5-Math.floor(l/2),"l",e-c,0,"a",c,c,0,0,1,c,c,"l",0,l-c*2,"a",c,c,0,0,1,-c,c,"l",c-e,0,"z"]
}else{c=Math.min(Math.round(e/5),l);n=["M",j-Math.floor(e/2),i,"l",0,c-l,"a",c,c,0,0,1,c,-c,"l",e-2*c,0,"a",c,c,0,0,1,c,c,"l",0,l-c,"z"]
}}if(h){return n.join(",")}else{return this.path(n)}};Raphael.fn.g.disc=function(c,f,e){return this.circle(c,f,e)
};Raphael.fn.g.line=function(c,f,e){return this.rect(c-e,f-e/5,2*e,2*e/5)};Raphael.fn.g.square=function(c,f,e){e=e*0.7;
return this.rect(c-e,f-e,2*e,2*e)};Raphael.fn.g.triangle=function(c,f,e){e*=1.75;
return this.path("M".concat(c,",",f,"m0-",e*0.58,"l",e*0.5,",",e*0.87,"-",e,",0z"))
};Raphael.fn.g.diamond=function(c,f,e){return this.path(["M",c,f-e,"l",e,e,-e,e,-e,-e,e,-e,"z"])
};Raphael.fn.g.flower=function(g,f,c,e){c=c*1.25;var m=c,l=m*0.5;e=+e<3||!e?5:e;var o=["M",g,f+l,"Q"],j;
for(var h=1;h<e*2+1;h++){j=h%2?m:l;o=o.concat([+(g+j*Math.sin(h*Math.PI/e)).toFixed(3),+(f+j*Math.cos(h*Math.PI/e)).toFixed(3)])
}o.push("z");return this.path(o.join(","))};Raphael.fn.g.star=function(c,l,j,e){e=e||j*0.5;
var h=["M",c,l+e,"L"],g;for(var f=1;f<10;f++){g=f%2?j:e;h=h.concat([(c+g*Math.sin(f*Math.PI*0.2)).toFixed(3),(l+g*Math.cos(f*Math.PI*0.2)).toFixed(3)])
}h.push("z");return this.path(h.join(","))};Raphael.fn.g.cross=function(c,f,e){e=e/2.5;
return this.path("M".concat(c-e,",",f,"l",[-e,-e,e,-e,e,e,e,-e,e,e,-e,e,e,e,-e,e,-e,-e,-e,e,-e,-e,"z"]))
};Raphael.fn.g.plus=function(c,f,e){e=e/2;return this.path("M".concat(c-e/2,",",f-e/2,"l",[0,-e,e,0,0,e,e,0,0,e,-e,0,0,e,-e,0,0,-e,-e,0,0,-e,"z"]))
};Raphael.fn.g.arrow=function(c,f,e){return this.path("M".concat(c-e*0.7,",",f-e*0.4,"l",[e*0.6,0,0,-e*0.4,e,e*0.8,-e,e*0.8,0,-e*0.4,-e*0.6,0],"z"))
};Raphael.fn.g.tag=function(c,l,j,i,g){i=i||0;g=g==null?5:g;j=j==null?"$9.99":j;var f=0.5522*g,e=this.set(),h=3;
e.push(this.path().attr({fill:"#000",stroke:"none"}));e.push(this.text(c,l,j).attr(this.g.txtattr).attr({fill:"#fff"}));
e.update=function(){this.rotate(0,c,l);var n=this[1].getBBox();if(n.height>=g*2){this[0].attr({path:["M",c,l+g,"a",g,g,0,1,1,0,-g*2,g,g,0,1,1,0,g*2,"m",0,-g*2-h,"a",g+h,g+h,0,1,0,0,(g+h)*2,"L",c+g+h,l+n.height/2+h,"l",n.width+2*h,0,0,-n.height-2*h,-n.width-2*h,0,"L",c,l-g-h].join(",")})
}else{var m=Math.sqrt(Math.pow(g+h,2)-Math.pow(n.height/2+h,2));this[0].attr({path:["M",c,l+g,"c",-f,0,-g,f-g,-g,-g,0,-f,g-f,-g,g,-g,f,0,g,g-f,g,g,0,f,f-g,g,-g,g,"M",c+m,l-n.height/2-h,"a",g+h,g+h,0,1,0,0,n.height+2*h,"l",g+h-m+n.width+2*h,0,0,-n.height-2*h,"L",c+m,l-n.height/2-h].join(",")})
}this[1].attr({x:c+g+h+n.width/2,y:l});i=(360-i)%360;this.rotate(i,c,l);i>90&&i<270&&this[1].attr({x:c-g-h-n.width/2,y:l,rotation:[180+i,c,l]});
return this};e.update();return e};Raphael.fn.g.popupit=function(j,i,l,e,s){e=e==null?2:e;
s=s||5;j=Math.round(j)+0.5;i=Math.round(i)+0.5;var g=l.getBBox(),m=Math.round(g.width/2),f=Math.round(g.height/2),q=[0,m+s*2,0,-m-s*2],n=[-f*2-s*3,-f-s,0,-f-s],c=["M",j-q[e],i-n[e],"l",-s,(e==2)*-s,-Math.max(m-s,0),0,"a",s,s,0,0,1,-s,-s,"l",0,-Math.max(f-s,0),(e==3)*-s,-s,(e==3)*s,-s,0,-Math.max(f-s,0),"a",s,s,0,0,1,s,-s,"l",Math.max(m-s,0),0,s,!e*-s,s,!e*s,Math.max(m-s,0),0,"a",s,s,0,0,1,s,s,"l",0,Math.max(f-s,0),(e==1)*s,s,(e==1)*-s,s,0,Math.max(f-s,0),"a",s,s,0,0,1,-s,s,"l",-Math.max(m-s,0),0,"z"].join(","),o=[{x:j,y:i+s*2+f},{x:j-s*2-m,y:i},{x:j,y:i-s*2-f},{x:j+s*2+m,y:i}][e];
l.translate(o.x-m-g.x,o.y-f-g.y);return this.path(c).attr({fill:"#000",stroke:"none"}).insertBefore(l.node?l:l[0])
};Raphael.fn.g.popup=function(c,j,i,e,g){e=e==null?2:e;g=g||5;i=i||"$9.99";var f=this.set(),h=3;
f.push(this.path().attr({fill:"#000",stroke:"none"}));f.push(this.text(c,j,i).attr(this.g.txtattr).attr({fill:"#fff"}));
f.update=function(n,m,o){n=n||c;m=m||j;var s=this[1].getBBox(),t=s.width/2,q=s.height/2,x=[0,t+g*2,0,-t-g*2],u=[-q*2-g*3,-q-g,0,-q-g],l=["M",n-x[e],m-u[e],"l",-g,(e==2)*-g,-Math.max(t-g,0),0,"a",g,g,0,0,1,-g,-g,"l",0,-Math.max(q-g,0),(e==3)*-g,-g,(e==3)*g,-g,0,-Math.max(q-g,0),"a",g,g,0,0,1,g,-g,"l",Math.max(t-g,0),0,g,!e*-g,g,!e*g,Math.max(t-g,0),0,"a",g,g,0,0,1,g,g,"l",0,Math.max(q-g,0),(e==1)*g,g,(e==1)*-g,g,0,Math.max(q-g,0),"a",g,g,0,0,1,-g,g,"l",-Math.max(t-g,0),0,"z"].join(","),v=[{x:n,y:m+g*2+q},{x:n-g*2-t,y:m},{x:n,y:m-g*2-q},{x:n+g*2+t,y:m}][e];
if(o){this[0].animate({path:l},500,">");this[1].animate(v,500,">")}else{this[0].attr({path:l});
this[1].attr(v)}return this};return f.update(c,j)};Raphael.fn.g.flag=function(c,i,h,g){g=g||0;
h=h||"$9.99";var e=this.set(),f=3;e.push(this.path().attr({fill:"#000",stroke:"none"}));
e.push(this.text(c,i,h).attr(this.g.txtattr).attr({fill:"#fff"}));e.update=function(j,n){this.rotate(0,j,n);
var m=this[1].getBBox(),l=m.height/2;this[0].attr({path:["M",j,n,"l",l+f,-l-f,m.width+2*f,0,0,m.height+2*f,-m.width-2*f,0,"z"].join(",")});
this[1].attr({x:j+l+f+m.width/2,y:n});g=360-g;this.rotate(g,j,n);g>90&&g<270&&this[1].attr({x:j-r-f-m.width/2,y:n,rotation:[180+g,j,n]});
return this};return e.update(c,i)};Raphael.fn.g.label=function(c,g,f){var e=this.set();
e.push(this.rect(c,g,10,10).attr({stroke:"none",fill:"#000"}));e.push(this.text(c,g,f).attr(this.g.txtattr).attr({fill:"#fff"}));
e.update=function(){var i=this[1].getBBox(),h=Math.min(i.width+10,i.height+10)/2;
this[0].attr({x:i.x-h/2,y:i.y-h/2,width:i.width+h,height:i.height+h,r:h})};e.update();
return e};Raphael.fn.g.labelit=function(f){var e=f.getBBox(),c=Math.min(20,e.width+10,e.height+10)/2;
return this.rect(e.x-c/2,e.y-c/2,e.width+c,e.height+c,c).attr({stroke:"none",fill:"#000"}).insertBefore(f[0])
};Raphael.fn.g.drop=function(c,i,h,f,g){f=f||30;g=g||0;var e=this.set();e.push(this.path(["M",c,i,"l",f,0,"A",f*0.4,f*0.4,0,1,0,c+f*0.7,i-f*0.7,"z"]).attr({fill:"#000",stroke:"none",rotation:[22.5-g,c,i]}));
g=(g+90)*Math.PI/180;e.push(this.text(c+f*Math.sin(g),i+f*Math.cos(g),h).attr(this.g.txtattr).attr({"font-size":f*12/30,fill:"#fff"}));
e.drop=e[0];e.text=e[1];return e};Raphael.fn.g.blob=function(e,l,j,i,g){i=(+i+1?i:45)+90;
g=g||12;var c=Math.PI/180,h=g*12/12;var f=this.set();f.push(this.path().attr({fill:"#000",stroke:"none"}));
f.push(this.text(e+g*Math.sin((i)*c),l+g*Math.cos((i)*c)-h/2,j).attr(this.g.txtattr).attr({"font-size":h,fill:"#fff"}));
f.update=function(s,q,x){s=s||e;q=q||l;var z=this[1].getBBox(),C=Math.max(z.width+h,g*25/12),y=Math.max(z.height+h,g*25/12),n=s+g*Math.sin((i-22.5)*c),A=q+g*Math.cos((i-22.5)*c),p=s+g*Math.sin((i+22.5)*c),B=q+g*Math.cos((i+22.5)*c),E=(p-n)/2,D=(B-A)/2,o=C/2,m=y/2,v=-Math.sqrt(Math.abs(o*o*m*m-o*o*D*D-m*m*E*E)/(o*o*D*D+m*m*E*E)),u=v*o*D/m+(p+n)/2,t=v*-m*E/o+(B+A)/2;
if(x){this.animate({x:u,y:t,path:["M",e,l,"L",p,B,"A",o,m,0,1,1,n,A,"z"].join(",")},500,">")
}else{this.attr({x:u,y:t,path:["M",e,l,"L",p,B,"A",o,m,0,1,1,n,A,"z"].join(",")})
}return this};f.update(e,l);return f};Raphael.fn.g.colorValue=function(g,f,e,c){return"hsb("+[Math.min((1-g/f)*0.4,1),e||0.75,c||0.75]+")"
};Raphael.fn.g.snapEnds=function(m,n,l){var h=m,o=n;if(h==o){return{from:h,to:o,power:0}
}function p(f){return Math.abs(f-0.5)<0.25?Math.floor(f)+0.5:Math.round(f)}var j=(o-h)/l,c=Math.floor(j),g=c,e=0;
if(c){while(g){e--;g=Math.floor(j*Math.pow(10,e))/Math.pow(10,e)}e++}else{while(!c){e=e||1;
c=Math.floor(j*Math.pow(10,e))/Math.pow(10,e);e++}e&&e--}var o=p(n*Math.pow(10,e))/Math.pow(10,e);
if(o<n){o=p((n+0.5)*Math.pow(10,e))/Math.pow(10,e)}var h=p((m-(e>0?0:0.5))*Math.pow(10,e))/Math.pow(10,e);
return{from:h,to:o,power:e}};Raphael.fn.g.axis=function(u,s,n,F,h,I,l,K,m,c){c=c==null?2:c;
m=m||"t";I=I||10;var E=m=="|"||m==" "?["M",u+0.5,s,"l",0,0.001]:l==1||l==3?["M",u+0.5,s,"l",0,-n]:["M",u,s+0.5,"l",n,0],w=this.g.snapEnds(F,h,I),J=w.from,A=w.to,H=w.power,G=0,B=this.set();
d=(A-J)/I;var q=J,p=H>0?H:0;v=n/I;if(+l==1||+l==3){var e=s,z=(l-1?1:-1)*(c+3+!!(l-1));
while(e>=s-n){m!="-"&&m!=" "&&(E=E.concat(["M",u-(m=="+"||m=="|"?c:!(l-1)*c*2),e+0.5,"l",c*2+1,0]));
B.push(this.text(u+z,e,(K&&K[G++])||(Math.round(q)==q?q:+q.toFixed(p))).attr(this.g.txtattr).attr({"text-anchor":l-1?"start":"end"}));
q+=d;e-=v}if(Math.round(e+v-(s-n))){m!="-"&&m!=" "&&(E=E.concat(["M",u-(m=="+"||m=="|"?c:!(l-1)*c*2),s-n+0.5,"l",c*2+1,0]));
B.push(this.text(u+z,s-n,(K&&K[G])||(Math.round(q)==q?q:+q.toFixed(p))).attr(this.g.txtattr).attr({"text-anchor":l-1?"start":"end"}))
}}else{var g=u,q=J,p=H>0?H:0,z=(l?-1:1)*(c+9+!l),v=n/I,C=0,D=0;while(g<=u+n){m!="-"&&m!=" "&&(E=E.concat(["M",g+0.5,s-(m=="+"?c:!!l*c*2),"l",0,c*2+1]));
B.push(C=this.text(g,s+z,(K&&K[G++])||(Math.round(q)==q?q:+q.toFixed(p))).attr(this.g.txtattr));
var o=C.getBBox();if(D>=o.x-5){B.pop(B.length-1).remove()}else{D=o.x+o.width}q+=d;
g+=v}if(Math.round(g-v-u-n)){m!="-"&&m!=" "&&(E=E.concat(["M",u+n+0.5,s-(m=="+"?c:!!l*c*2),"l",0,c*2+1]));
B.push(this.text(u+n,s+z,(K&&K[G])||(Math.round(q)==q?q:+q.toFixed(p))).attr(this.g.txtattr))
}}var L=this.path(E);L.text=B;L.all=this.set([L,B]);L.remove=function(){this.text.remove();
this.constructor.prototype.remove.call(this)};return L};Raphael.el.lighter=function(e){e=e||2;
var c=[this.attrs.fill,this.attrs.stroke];this.fs=this.fs||[c[0],c[1]];c[0]=Raphael.rgb2hsb(Raphael.getRGB(c[0]).hex);
c[1]=Raphael.rgb2hsb(Raphael.getRGB(c[1]).hex);c[0].b=Math.min(c[0].b*e,1);c[0].s=c[0].s/e;
c[1].b=Math.min(c[1].b*e,1);c[1].s=c[1].s/e;this.attr({fill:"hsb("+[c[0].h,c[0].s,c[0].b]+")",stroke:"hsb("+[c[1].h,c[1].s,c[1].b]+")"})
};Raphael.el.darker=function(e){e=e||2;var c=[this.attrs.fill,this.attrs.stroke];
this.fs=this.fs||[c[0],c[1]];c[0]=Raphael.rgb2hsb(Raphael.getRGB(c[0]).hex);c[1]=Raphael.rgb2hsb(Raphael.getRGB(c[1]).hex);
c[0].s=Math.min(c[0].s*e,1);c[0].b=c[0].b/e;c[1].s=Math.min(c[1].s*e,1);c[1].b=c[1].b/e;
this.attr({fill:"hsb("+[c[0].h,c[0].s,c[0].b]+")",stroke:"hsb("+[c[1].h,c[1].s,c[1].b]+")"})
};Raphael.el.original=function(){if(this.fs){this.attr({fill:this.fs[0],stroke:this.fs[1]});
delete this.fs}}})();Raphael.fn.g.linechart=function(M,L,a,c,v,u,F){function E(y,ab){var x=y.length/ab,X=0,i=x,aa=0,Y=[];
while(X<y.length){i--;if(i<0){aa+=y[X]*(1+i);Y.push(aa/x);aa=y[X++]*-i;i+=x}else{aa+=y[X++]
}}return Y}F=F||{};if(!this.raphael.is(v[0],"array")){v=[v]}if(!this.raphael.is(u[0],"array")){u=[u]
}var R=Array.prototype.concat.apply([],v),P=Array.prototype.concat.apply([],u),q=this.g.snapEnds(Math.min.apply(Math,R),Math.max.apply(Math,R),v[0].length-1),A=q.from,l=q.to,n=F.gutter||10,S=(a-n*2)/(l-A),J=this.g.snapEnds(Math.min.apply(Math,P),Math.max.apply(Math,P),u[0].length-1),z=J.from,h=J.to,Q=(c-n*2)/(h-z),w=Math.max(v[0].length,u[0].length),p=F.symbol||"",N=F.colors||Raphael.fn.g.colors,K=this,s=null,m=null,W=this.set(),O=[];
for(var V=0,H=u.length;V<H;V++){w=Math.max(w,u[V].length)}var Z=this.set();for(var V=0,H=u.length;
V<H;V++){if(F.shade){Z.push(this.path().attr({stroke:"none",fill:N[V],opacity:F.nostroke?1:0.3}))
}if(u[V].length>a-2*n){u[V]=E(u[V],a-2*n);w=a-2*n}if(v[V]&&v[V].length>a-2*n){v[V]=E(v[V],a-2*n)
}}var B=this.set();if(F.axis){var g=(F.axis+"").split(/[,\s]+/);+g[0]&&B.push(this.g.axis(M+n,L+n,a-2*n,A,l,F.axisxstep||Math.floor((a-2*n)/20),2));
+g[1]&&B.push(this.g.axis(M+a-n,L+c-n,c-2*n,z,h,F.axisystep||Math.floor((c-2*n)/20),3));
+g[2]&&B.push(this.g.axis(M+n,L+c-n,a-2*n,A,l,F.axisxstep||Math.floor((a-2*n)/20),0));
+g[3]&&B.push(this.g.axis(M+n,L+c-n,c-2*n,z,h,F.axisystep||Math.floor((c-2*n)/20),1))
}var I=this.set(),T=this.set(),o;for(var V=0,H=u.length;V<H;V++){if(!F.nostroke){I.push(o=this.path().attr({stroke:N[V],"stroke-width":F.width||2,"stroke-linejoin":"round","stroke-linecap":"round","stroke-dasharray":F.dash||""}))
}var b=this.raphael.is(p,"array")?p[V]:p,C=this.set();O=[];for(var U=0,t=u[V].length;
U<t;U++){var f=M+n+((v[V]||v[0])[U]-A)*S;var e=L+c-n-(u[V][U]-z)*Q;(Raphael.is(b,"array")?b[U]:b)&&C.push(this.g[Raphael.fn.g.markers[this.raphael.is(b,"array")?b[U]:b]](f,e,(F.width||2)*3).attr({fill:N[V],stroke:"none"}));
O=O.concat([U?"L":"M",f,e])}T.push(C);if(F.shade){Z[V].attr({path:O.concat(["L",f,L+c-n,"L",M+n+((v[V]||v[0])[0]-A)*S,L+c-n,"z"]).join(",")})
}!F.nostroke&&o.attr({path:O.join(",")})}function G(ah){var ae=[];for(var af=0,aj=v.length;
af<aj;af++){ae=ae.concat(v[af])}ae.sort();var ak=[],ab=[];for(var af=0,aj=ae.length;
af<aj;af++){ae[af]!=ae[af-1]&&ak.push(ae[af])&&ab.push(M+n+(ae[af]-A)*S)}ae=ak;aj=ae.length;
var aa=ah||K.set();for(var af=0;af<aj;af++){var Y=ab[af]-(ab[af]-(ab[af-1]||M))/2,ai=((ab[af+1]||M+a)-ab[af])/2+(ab[af]-(ab[af-1]||M))/2,x;
ah?(x={}):aa.push(x=K.rect(Y-1,L,Math.max(ai+1,1),c).attr({stroke:"none",fill:"#000",opacity:0}));
x.values=[];x.symbols=K.set();x.y=[];x.x=ab[af];x.axis=ae[af];for(var ad=0,ag=u.length;
ad<ag;ad++){ak=v[ad]||v[0];for(var ac=0,y=ak.length;ac<y;ac++){if(ak[ac]==ae[af]){x.values.push(u[ad][ac]);
x.y.push(L+c-n-(u[ad][ac]-z)*Q);x.symbols.push(W.symbols[ad][ac])}}}ah&&ah.call(x)
}!ah&&(s=aa)}function D(af){var ab=af||K.set(),x;for(var ad=0,ah=u.length;ad<ah;ad++){for(var ac=0,ae=u[ad].length;
ac<ae;ac++){var aa=M+n+((v[ad]||v[0])[ac]-A)*S,ag=M+n+((v[ad]||v[0])[ac?ac-1:1]-A)*S,y=L+c-n-(u[ad][ac]-z)*Q;
af?(x={}):ab.push(x=K.circle(aa,y,Math.abs(ag-aa)/2).attr({stroke:"none",fill:"#000",opacity:0}));
x.x=aa;x.y=y;x.value=u[ad][ac];x.line=W.lines[ad];x.shade=W.shades[ad];x.symbol=W.symbols[ad][ac];
x.symbols=W.symbols[ad];x.axis=(v[ad]||v[0])[ac];af&&af.call(x)}}!af&&(m=ab)}W.push(I,Z,T,B,s,m);
W.lines=I;W.shades=Z;W.symbols=T;W.axis=B;W.hoverColumn=function(j,i){!s&&G();s.mouseover(j).mouseout(i);
return this};W.clickColumn=function(i){!s&&G();s.click(i);return this};W.hrefColumn=function(Y){var aa=K.raphael.is(arguments[0],"array")?arguments[0]:arguments;
if(!(arguments.length-1)&&typeof Y=="object"){for(var j in Y){for(var y=0,X=s.length;
y<X;y++){if(s[y].axis==j){s[y].attr("href",Y[j])}}}}!s&&G();for(var y=0,X=aa.length;
y<X;y++){s[y]&&s[y].attr("href",aa[y])}return this};W.hover=function(j,i){!m&&D();
m.mouseover(j).mouseout(i);return this};W.click=function(i){!m&&D();m.click(i);return this
};W.each=function(i){D(i);return this};W.eachColumn=function(i){G(i);return this};
return W};if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("raphael")
};