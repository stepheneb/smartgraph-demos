var RaphaelViews=SC.Object.create();RaphaelViews.RaphaelContext=SC.Builder.create({isRaphaelContext:YES,init:function(b,a){this._node=b;
this.prevObject=a;this.isTopLevel=!a;this.children=[];this._groupNode=NO;return this
},begin:function(b){var a=RaphaelViews.RaphaelContext(b,this);this.children.push(a);
return a},end:function(){return this.prevObject||this},callback:function(a,b){this._thisArg=a;
this._callback=b;this._arguments=Array.prototype.slice.call(arguments,2);return this
},id:function(a){this._id=a;return this},visible:function(a){this._isVisible=a;return this
},populateCanvas:function(d){var h=[],a,k=[],g,b=[],f,c;if(this._callback){f=this._callback.apply(this._thisArg,[d].concat(this._arguments));
if(f){h=this.flattenRaphaelSets(f);b=b.concat(h.map(this.nodeForRaphaelObject))}}for(var e=0,j=this.children.length;
e<j;e++){a=this.children[e].populateCanvas(d);if(a){k.push(a)}}if(b.length===0&&k.length===0){c=this.generateGroupNode(d);
SC.$(d.canvas).append(SC.$(c));b.push(c)}if(b.length===1&&k.length===0){g=b[0]}else{if(!this.isTopLevel){g=this.wrap(b.concat(k),d)
}}if(g){if(!g.raphael){g.raphael=f}this.update(g)}return g},update:function(a){if(a===undefined){a=this._node
}a.id=this._id;a.style.display=this._isVisible?"":"none"},raphael:function(){return this._node&&this._node.raphael
},generateGroupNode:function(a){return a.constructor.vml?document.createElement("group"):document.createElementNS("http://www.w3.org/2000/svg","g")
},wrap:function(a,f){var e=this.generateGroupNode(f);var d=SC.$(e);d.insertBefore(SC.$(a[0]));
for(var b=0,c=a.length;b<c;b++){d.append(a[b])}return d[0]},flattenRaphaelSets:function(c){var d=[];
if(c.type==="set"){for(var a=0,b=c.items.length;a<b;a++){d=d.concat(this.flattenRaphaelSets(c.items[a]))
}return d}else{return[c]}},nodeForRaphaelObject:function(b){var a=b.paper.constructor.vml;
if(!(a||b.paper.constructor.svg)){throw"RaphaelContext can't figure out from raphaelObj whether mode is SVG or VML"
}return a?b.Group:b.node}});RaphaelViews.RenderSupport={render:function(a,b){if(b){this.renderChildViews(a,b)
}},layerIdDidChange:function(){var a=this.get("layer");if(a&&this.get("layerId")!==this._lastLayerId){if(this._lastLayerId&&SC.View.views[this._lastLayerId]===this){delete SC.View.views[this._lastLayerId]
}this._lastLayerId=this.get("layerId");SC.View.views[this.get("layerId")]=this;a.id=this.get("layerId")
}}.observes("layerId"),createLayer:function(){if(this.get("layer")){return}var a=RaphaelViews.RaphaelContext();
a.isTopLevel=NO;this.prepareRaphaelContext(a,YES);this.set("layer",a.populateCanvas(this.get("raphaelCanvas")));
this._notifyDidCreateLayer()},raphaelCanvas:function(){var a=this.get("parentView");
return a.get("raphaelCanvas")}.property(),raphaelObject:function(){var a=this.get("layer");
return a&&a.raphael}.property(),updateLayer:function(){var a=RaphaelViews.RaphaelContext(this.get("layer"));
this.prepareRaphaelContext(a,NO);a.update()},prepareRaphaelContext:function(a,b){a.id(this.get("layerId"));
a.visible(this.get("isVisible"));this.beginPropertyChanges();this.set("layerNeedsUpdate",NO);
this.render(a,b);this.endPropertyChanges()},renderChildViews:function(d,f){var b=this.get("childViews");
var a;for(var c=0,e=b.length;c<e;++c){a=b[c];if(!a){continue}d=d.begin(a.get("layer"));
a.prepareRaphaelContext(d,f);d=d.end()}return d},renderLayout:function(a,b){},_notifyDidCreateLayer:function(){arguments.callee.base.apply(this,arguments);
if(this._isSleeping){this.get("raphaelObject").hide()}this._view_layer=null;this.notifyPropertyChange("layer");
this._view_layer=this.get("layer")},_notifyWillDestroyLayer:function(){this._view_layer=null;
arguments.callee.base.apply(this,arguments)},sleepInDOMPool:function(){this._isSleeping=YES;
this._wasVisibleBeforeSleep=this.get("isVisible");var a=this.get("layer");if(a&&a.raphael&&this._wasVisibleBeforeSleep){a.raphael.hide()
}},wakeFromDOMPool:function(){this.wakeFromPool()},awakeFromPool:function(){this.wakeFromPool()
},wakeFromPool:function(){this._isSleeping=NO;var a=this.get("layer");if(this._wasVisibleBeforeSleep&&a&&a.raphael){a.raphael.show()
}}};RaphaelViews.RaphaelView=SC.View.extend(RaphaelViews.RenderSupport,{});sc_require("context/raphael_context");
RaphaelViews.RaphaelCanvasView=SC.View.extend({_notifyDidCreateLayer:function(){this.notifyPropertyChange("layer");
this._viewRenderer.attachLayer(this);if(this.renderer){this.renderer.attachLayer(this)
}this.didCreateLayer();var a=this.didCreateLayerMixin;if(a){for(var b=0,c=a.length;
b<c;++b){a[b].call(this)}}},_notifyDidCreateChildViewLayers:function(){var a=this.get("childViews");
for(var b=0,c=a.length;b<c;++b){if(!a[b]){continue}a[b]._notifyDidCreateLayer()}},didCreateLayer:function(){var a=this.get("layer");
var c=this.get("frame");var b=Raphael(a,c.width,c.height);this.set("raphaelCanvas",b);
if(this._preparedRaphaelContext){this._preparedRaphaelContext.populateCanvas(b);this._notifyDidCreateChildViewLayers()
}},containerLayer:function(){return this.get("raphaelCanvas").canvas}.property(),render:function(a,b){if(b){this.renderChildViews(a,b)
}},renderChildViews:function(e,g){var c=this.get("childViews");var a;var b=this.raphaelContext();
b.isTopLevel=YES;for(var d=0,f=c.length;d<f;++d){a=c[d];if(!a){continue}b=b.begin(a.get("layer"));
a.prepareRaphaelContext(b,g);b=b.end()}this._preparedRaphaelContext=b;return e},raphaelContext:function(){return RaphaelViews.RaphaelContext()
}});RaphaelViews.RaphaelCollectionView=SC.CollectionView.extend(RaphaelViews.RenderSupport,{});
if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("raphael_views/raphael_views")
};