/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   RaphaelViews
// Copyright: ©2010 Richard Klancer and Concord Consortium
// ==========================================================================
/*globals */

var RaphaelViews = SC.Object.create();

/* >>>>>>>>>> BEGIN source/context/raphael_context.js */
// ==========================================================================
// Project:   RaphaelViews.RaphaelContext
// Copyright: ©2010 Richard Klancer and Concord Consortium
// ==========================================================================
/*globals RaphaelViews */

/** @namespace

    A RaphaelContext mimics the SC.RenderContext provided by Sproutcore.

    Use it when rendering your RaphaelViews to provide delayed instructions for how to render your view to the Raphael
    canvas.

    The RaphaelContext will take care of executing those instructions at a later time (when the layer surrounding your
    view has been instantiated) and making the DOM nodes so created your view's layer.

    It will also take care of wrapping your layer node in a grouping node together with your child views' layers and
    making the layer node a child of your parent view.

    If you want your view to consist of multiple shapes that are not child views, return a Raphael set object. These
    shapes in the Raphael set will be wrapped in a grouping node so that your view can respond to events within any of
    those shapes.
*/
  
RaphaelViews.RaphaelContext = SC.Builder.create(/** RaphaelViews.RaphaelContext.fn */ {
  
  // remember this isn't really an SC.Object. The semantics of this hash are different than if they were passed to SC.Extend
  // Notably, defining 'children' in the hash would result in all RaphaelContexts sharing the same 'children' array
   
  isRaphaelContext: YES,

  init: function (node, prevContext) {
    this._node = node;
    this.prevObject = prevContext;
    this.isTopLevel = !prevContext;
    this.children = [];
    this._groupNode = NO;

    return this;
  },
  

  begin: function (node) {
    var ret = RaphaelViews.RaphaelContext(node, this);
    this.children.push(ret);
    
    return ret;
  },
  
  
  end: function () {
    return this.prevObject || this;
  },
 
  
  // For now the only way for render method to draw a graph is to pass a callback that calls the raphael methods itself. 
  // Eventually I'll probably add methods to RaphaelContext with the same names as Raphael methods
  // and that allow you to *find* and set attributes on pre-existing Raphael objects 
  // (this would be useful during render when firstTime = NO)
  callback: function (thisArg, callback) {
    this._thisArg = thisArg;
    this._callback = callback;
    this._arguments = Array.prototype.slice.call(arguments, 2);           // store the arguments 2...n
        
    return this;
  },
  
  
  id: function (id) {
    this._id = id;
    return this;
  },
  

  visible: function (isVisible) {
    this._isVisible = isVisible;
    return this;
  },
  
  
  populateCanvas: function (raphaelCanvas) {

    // given a raphael canvas, actually call the callbacks that will create dom nodes using raphael.
    // use our own special sauce here to insert grouping nodes with the appropriate layer ids whenever a view has 
    // child views
    
    var raphaelObjects = [],
        childNode,
        childNodes = [],
        layerNode,
        layerNodes = [],
        raphaelObj,
        groupNode;

    // generate node or set of nodes from the Raphael object returned by the render callback, if any
    if (this._callback) {
      raphaelObj = this._callback.apply(this._thisArg, [raphaelCanvas].concat(this._arguments));
      if (raphaelObj) {
        raphaelObjects = this.flattenRaphaelSets(raphaelObj);
        layerNodes = layerNodes.concat(raphaelObjects.map( this.nodeForRaphaelObject ));
      }
    }
    
    // recursively populateCanvas in child contexts
    for (var i = 0, ii = this.children.length; i < ii; i++) {
      childNode = this.children[i].populateCanvas(raphaelCanvas);
      if (childNode) childNodes.push(childNode);
    }

    // generate a group node at least if there are no child contexts and no Raphael objects created in this context
    if (layerNodes.length === 0 && childNodes.length === 0) {
      groupNode = this.generateGroupNode(raphaelCanvas);
      SC.$(raphaelCanvas.canvas).append(SC.$(groupNode));
      layerNodes.push(groupNode);
    }
    
    // if this view itself has just one node, that's the layer node
    if (layerNodes.length === 1 && childNodes.length === 0) {
      layerNode = layerNodes[0];
    }
    else if(!this.isTopLevel) {
      // If we have multiple nodes, wrap them in a group node, because we must assign a single node to be the view's
      // layer.
      // Skip this step if we're in the top-level context (i.e., the one corresponding to the RaphaelCanvasView)
      // because the RaphaelCanvasView's layer already exists, and is a <div> containing the <svg> node (or VML nodes)
      layerNode = this.wrap( layerNodes.concat(childNodes), raphaelCanvas);
    }

    if (layerNode) {
      // When Raphael draws a shape, it stashes a reference to the raphael object in the DOM node for the shape.
      // If we've wrapped the shape, just stash it at the top level node we've created (note also that Raphael creates
      // a wrapper <group> node in VML mode but doesn't stash the reference there-another reason to stash it ourselves)
      if (!layerNode.raphael) {
        layerNode.raphael = raphaelObj;     
      }
      this.update(layerNode);
    }

    return layerNode;
  },
  
  
  update: function (node) {
    if (node === undefined) node = this._node;
    
    node.id = this._id;
    node.style.display = this._isVisible ? "" : "none";
  },
  
  
  raphael: function () {
    return this._node && this._node.raphael;
  },
  
  
  generateGroupNode: function (raphaelCanvas) {
    return raphaelCanvas.constructor.vml ?
      document.createElement("group") :
      document.createElementNS("http://www.w3.org/2000/svg", "g");
  },
  
  /**
    Wraps the list of nodes 'nodes' with a new grouping element (<g> in SVG, <group> in VML). Appends the new grouping
    element, now containing the passed nodes, into the raphael canvas immediately before the previous location of 
    node[0]
  
    TODO
    @param (nodes) the list of
    @param (raphaelCanvas) the raphael Canvas manager object ('paper')
    @returns
  */
  wrap: function (nodes, raphaelCanvas) {
    // see http://smartgraph-demos.dev.concord.org/test-raphael-group.html

    var wrapper = this.generateGroupNode(raphaelCanvas);
    var $wrapper = SC.$(wrapper);

    // we know nodes.length > 0 or we wouldn't have been called.
    $wrapper.insertBefore(SC.$(nodes[0]));

    for (var i=0, ii=nodes.length; i < ii; i++) {
      $wrapper.append(nodes[i]);
    }
    return $wrapper[0];
  },

  /**
    Converts a Raphael 'manager' object raphaelObj that may represent a Raphael set 
    (http://raphaeljs.com/reference.html#set) into a simple array of Raphael manager objects that represent the 
    underlying shapes. (Nested Raphael sets are flattened, rather than converted into nested arrays.)
  
    TODO:
    @param (raphaelObj) a Raphael manager object that represents either a Raphael set or a simple shape
    @returns (array of raphaelObjs) 'flattened' list of Raphael manager objects that represent simple shapes
  */
  flattenRaphaelSets: function (raphaelObj) { 
    var objs = [];
    if (raphaelObj.type === 'set') {
      for (var i = 0, ii = raphaelObj.items.length; i < ii; i++) {
        objs = objs.concat(this.flattenRaphaelSets(raphaelObj.items[i]));
      }
      return objs;
    }
    else {
      return [raphaelObj];
    }
  },

  /**
    Returns the outermost DOM node created for a given shape by Raphael, given the Raphael object raphaelObj that
    manages the shape. Raphael endows raphaelObj with a 'node' property that references the shape node, but in VML mode
    Raphael also wraps that shape node with a outer 'group' element, referenced by the Group property of raphaelObj. In
    VML mode, this returns the outer group element. In SVG mode, the 'node' is the outermost element, and is what is
    returned.

    TODO: 
    @param ...?
    @returns ...?
  */
  nodeForRaphaelObject: function (raphaelObj) {
    var isVML = raphaelObj.paper.constructor.vml;
    
    if (!(isVML || raphaelObj.paper.constructor.svg)) {
      throw "RaphaelContext can't figure out from raphaelObj whether mode is SVG or VML";
    }
    
    return isVML ? raphaelObj.Group : raphaelObj.node;
  }
});

/* >>>>>>>>>> BEGIN source/mixins/raphael_render_support.js */
// ==========================================================================
// Project:   RaphaelViews.RenderSupport
// Copyright: ©2010 Richard Klancer and Concord Consortium
// ==========================================================================
/*globals RaphaelViews */

/** @namespace
  
    Modifies and extends SC.View functionality for SC.View subclasses that want to render using a RaphaelContext
  
*/
RaphaelViews.RenderSupport = {

  // default behavior that we can override
  render: function (context, firstTime) {
    if (firstTime) this.renderChildViews(context, firstTime);
  },
  
  /**
    Handles changes in the layer id. Modified from SC.View for bugfixes needed by CollectionFastPath mixin.
    Heads up on the need for this bugfix to alexiskander.
    
  */
  layerIdDidChange: function() {
    var layer = this.get("layer");
    if (layer && this.get("layerId") !== this._lastLayerId) {
      // if we had an earlier one, remove from view hash. If another view has just claimed our old layerId in the 
      // views hash, be careful not to overwrite that view. (bugfix per alexiskander)
      if (this._lastLayerId && SC.View.views[this._lastLayerId] === this) {
        delete SC.View.views[this._lastLayerId];
      }
      
      // set the current one as the new old one
      this._lastLayerId = this.get("layerId");
      
      // and add the new one
      SC.View.views[this.get("layerId")] = this;
      
      // and finally, set the actual layer id.
      layer.id = this.get("layerId");
    }
    // Yes, this really works to monkey patch SC.View.layerIdDidChange (observers added by 
    // 'function () {...}.observes(...)' are referenced by name, so the observer dispatcher will find this method 
    // instead of the base layerIdDidChange):
  }.observes('layerId'),  


  createLayer: function () {
    if (this.get('layer')) return;          // move along, nothing to do here

    var raphaelContext = RaphaelViews.RaphaelContext();
    raphaelContext.isTopLevel = NO;

    this.prepareRaphaelContext(raphaelContext, YES);
    this.set('layer', raphaelContext.populateCanvas(this.get('raphaelCanvas')));

    // now notify the view and its child views..
    this._notifyDidCreateLayer();
  },

  raphaelCanvas: function () {
    var pv = this.get('parentView');
    return pv.get('raphaelCanvas');     // recurse until you hit parent RaphaelCanvasView
  }.property(),


  raphaelObject: function () {
    var layer = this.get('layer');
    return layer && layer.raphael;
  }.property(),


  updateLayer: function () {
    var context = RaphaelViews.RaphaelContext(this.get('layer'));
    this.prepareRaphaelContext(context, NO);
    context.update();
  },


  prepareRaphaelContext: function (raphaelContext, firstTime) {
    raphaelContext.id(this.get('layerId'));
    raphaelContext.visible(this.get('isVisible'));
    
    this.beginPropertyChanges();
    this.set('layerNeedsUpdate', NO);
    this.render(raphaelContext, firstTime);
    this.endPropertyChanges();
  },


  renderChildViews: function (context, firstTime) {
    var cv = this.get('childViews');
    var view;

    for (var i=0, ii=cv.length; i<ii; ++i) {
      view = cv[i];
      if (!view) continue;

      context = context.begin(view.get('layer'));
      view.prepareRaphaelContext(context, firstTime);
      context = context.end();
    }

    return context;
  },


  // Temporary fix for quilmes
  // Sproutcore 1.1 refactored much of the render logic. The code above uses now-deprecated code paths.
  // The following is a temporary patch to avoid problems with renderers attempting to apply setClass to SVG
  // elements, which don't support that method.
  
  renderLayout: function (context, firstTime) {
    // do nothing.
  },
  
  // CollectionFastPath support
  
  /** @private
      Items that are 'sleeping in the DOM pool' stay in our childViews array. Therefore we need to deal with the 
      fact that we will end up telling them to create a layer while they are still asleep.  */
      
  _notifyDidCreateLayer: function () {
    arguments.callee.base.apply(this,arguments);
    if (this._isSleeping) {
      this.get('raphaelObject').hide();
    }
    
    // set the layer cache explicitly
    this._view_layer = null;
    this.notifyPropertyChange('layer');
    this._view_layer = this.get('layer');
  },
  
  /** @private
  
      Invalidate SC.View's internal layer cache when the layer is destroyed. We need to have some layer caching
      because layerIdDidChange needs to access the previous layer without knowing the current layer id
  */
  
  _notifyWillDestroyLayer: function () {
    this._view_layer = null;
    arguments.callee.base.apply(this,arguments);
  },
  
  /**
    @private
    Hides the view using Raphael, before it's pooled, because the standard off-screening mechanism used by
    CollectionFastPath won't work for Raphael views. Note that even though this method is called 'sleepInDOMPool',
    CollectionFastPath may eventually move this from the DOM pool to an off-DOM pool before it's awakened.
  */
  sleepInDOMPool: function () {
    this._isSleeping = YES;
    this._wasVisibleBeforeSleep = this.get('isVisible');
    var layer = this.get('layer');  
    if (layer && layer.raphael && this._wasVisibleBeforeSleep) {
      layer.raphael.hide();
    }
  },
  
  /**
    @private
    Re-show the view if it's been pooled in the DOM.
  */
  wakeFromDOMPool: function () {
    this.wakeFromPool();
  },
  
  /**
    @private
    Re-show the view if it's been pooled off-DOM. Note that even though the only sleep method is 'sleepInDOMPool()',
    we can't therefore conclude that this view will be awakened from the DOM pool. CollectionFastPath moves some views
    from the DOM pool to the off-DOM pool while they sleep.
  */
  awakeFromPool: function () {
    this.wakeFromPool();
  },
  
  /**
    @private
    Re-show the view whether it's been pooled on or off-DOM.
  */
  wakeFromPool: function () {
    this._isSleeping = NO;
    var layer = this.get('layer');
    if (this._wasVisibleBeforeSleep && layer && layer.raphael) layer.raphael.show();
  }
};

/* >>>>>>>>>> BEGIN source/views/raphael.js */
// ==========================================================================
// Project:   RaphaelViews.RaphaelView
// Copyright: ©2010 Richard Klancer and Concord Consortium
// ==========================================================================
/*globals RaphaelViews */

/** @class

    Base class for creating Raphael-based views with actual content.

    Needs to be the child view of another RaphaelView or a RaphaelCanvasView.

    Override the render() method as needed to render the content of your view.

  @extends SC.View
  @extends RaphaelViews.RenderSupport
*/
RaphaelViews.RaphaelView = SC.View.extend(RaphaelViews.RenderSupport, 
/** @scope RaphaelViews.RaphaelView.prototype */ {
});

/* >>>>>>>>>> BEGIN source/views/raphael_canvas.js */
// ==========================================================================
// Project:   RaphaelViews.RaphaelCanvasView
// Copyright: ©2010 Richard Klancer and Concord Consortium
// ==========================================================================
/*globals RaphaelViews Raphael */

/** @class

    Class for managing the Raphael 'canvas' instance. (Not to be confused with a <canvas> element created by the
    Canvas API. We are not using the Canvas API.)
    
    All Raphael shapes must be drawn within a 'canvas', managed by the object returned by Raphael(). In SVG-supporting
    browsers, this corresponds to the containing <svg> element.
    
    Therefore, all RaphaelView instances must have a RaphaelCanvasView as an ancestor in the view hierarchy.

  @extends SC.View
*/

sc_require('context/raphael_context');

RaphaelViews.RaphaelCanvasView = SC.View.extend(
/** @scope RaphaelViews.RaphaelCanvasView.prototype */ {

  // override the base class notification mechanism, which wants to notify all our descendant views that their layer
  // was created, at the moment our layer is created.
  // That works for normal SC.Views but *our* child view layers aren't created until after we call populateCanvas()
  
  _notifyDidCreateLayer: function() {
    // notify, not just the view, but also the view renderers
    this.notifyPropertyChange('layer');
    //this._viewRenderer.attachLayer(this);
    //if (this.renderer) this.renderer.attachLayer(this);
    
    this.didCreateLayer() ;
    
    var mixins = this.didCreateLayerMixin;
    if (mixins) {
      for (var i=0, ii=mixins.length; i<ii; ++i) {
        mixins[i].call(this);
      }
    }
  },
  
  
  // notify our children (and, recursively, their children) that their layers have been created.
  _notifyDidCreateChildViewLayers: function () {
    var cv = this.get('childViews');
    for (var i=0, ii=cv.length; i<ii; ++i) {
      if (!cv[i]) continue;
      cv[i]._notifyDidCreateLayer();    // it s/b ok for our children to use the normal SC.View notification mechanism
    }
  },
  
  
  didCreateLayer: function () {
    var layer = this.get('layer');
    var r = Raphael(layer, "100%", "100%");
    this.set('raphaelCanvas', r);
    
    if (this._preparedRaphaelContext) {
      this._preparedRaphaelContext.populateCanvas(r);
      this._notifyDidCreateChildViewLayers();
    }
  },
  
  
  // informs the SC.View that child views' layers should be placed in the contained svg/vml node rather than in this 
  // view's layer node (which is a div)
  containerLayer: function () {
    return this.get('raphaelCanvas').canvas;        // canvas = Raphael's pointer to the SVG or VML element itself
  }.property(),
  
  // TODO eventually we can move to the Renderer paradigm and ditch this re-statement of the pre-Quilmes render()
  render: function (context, firstTime) {
    if (firstTime) this.renderChildViews(context, firstTime);
  },
    
  renderChildViews: function (context, firstTime) {
    var cv = this.get('childViews');
    var view;
    
    var raphaelContext = this.raphaelContext();
    raphaelContext.isTopLevel = YES;
    
    for (var i=0, ii=cv.length; i<ii; ++i) {
      view = cv[i];
      if (!view) continue;

      raphaelContext = raphaelContext.begin(view.get('layer'));
      view.prepareRaphaelContext(raphaelContext, firstTime);
      raphaelContext = raphaelContext.end();
    }  
    this._preparedRaphaelContext = raphaelContext;

    return context;
  },
  
  
  raphaelContext: function () {
    return RaphaelViews.RaphaelContext();
  }
});

/* >>>>>>>>>> BEGIN source/views/raphael_collection.js */
// ==========================================================================
// Project:   RaphaelViews.RaphaelCollectionView
// Copyright: ©2010 Richard Klancer and Concord Consortium
// ==========================================================================
/*globals RaphaelViews */

/** @class

    Base class for creating Raphael-based CollectionViews

    Needs to be the child view of a RaphaelView or a RaphaelCanvasView.

  @extends SC.View 
  @extends RaphaelViews.RenderSupport
*/
RaphaelViews.RaphaelCollectionView = SC.CollectionView.extend(RaphaelViews.RenderSupport, 
/** @scope RaphaelViews.RaphaelView.prototype */ {

});

