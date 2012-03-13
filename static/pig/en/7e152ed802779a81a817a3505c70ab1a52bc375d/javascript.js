/* >>>>>>>>>> BEGIN __sc_chance.js */
if (typeof CHANCE_SLICES === 'undefined') var CHANCE_SLICES = [];CHANCE_SLICES = CHANCE_SLICES.concat([]);

/* >>>>>>>>>> BEGIN source/pig.js */
var Pig = SC.AceTheme.extend({
  "classNames": "pig"
});
SC.Theme.register("pig", Pig);
/* >>>>>>>>>> BEGIN source/src/master-detail/master-detail.js */
/*global Pig*/
require("pig");
Pig.renderers.MasterDetail = SC.EmptyTheme.renderers.MasterDetail.extend({
  BORDER: 0
});

Pig.renderers.masterDetail = Pig.renderers.MasterDetail.create();
/* >>>>>>>>>> BEGIN source/src/paper/paper.js */
require("pig");

Pig.Paper = Pig.subtheme("paper", "paper");
/* >>>>>>>>>> BEGIN source/src/paper/toolbar/chromeless.js */
require("pig");
/*global Pig*/
Pig.ChromelessTheme = Pig.subtheme("chromeless", "chromeless");
Pig.ChromelessTheme.renderers.Button = SC.AceTheme.renderers.Button.extend({
  renderContents: function(context) {
    context = context.begin("label");
    this._titleRenderer.render(context);
    context = context.end();
  },
  updateContents: function(){
    this._titleRenderer.update();
  }
});

Pig.ChromelessTheme.renderers.button = Pig.ChromelessTheme.renderers.Button.create();
/* >>>>>>>>>> BEGIN source/src/paper/toolbar/icon.js */
require("src/paper/paper");
/*global Paper Pig*/
Pig.IconTheme = Pig.Paper.subtheme("icon", "icon");
Pig.IconTheme.renderers.Button = Pig.renderers.Button.extend({
  renderContents: function(context) {
    if (!this.imageRenderer) this.imageRenderer = this.theme.image();
    this.imageRenderer.attr('src', this.icon);
    
    context = context.begin("img");
    this.imageRenderer.render(context);
    context = context.end();
  },
  updateContents: function(){
    this.imageRenderer.attr('src', this.icon);
    this.imageRenderer.update();
  },
  didAttachLayer: function(l){ 
    SC.AceTheme.renderers.Button.didAttachLayer.call(this, l);
    this.imageRenderer.attachLayer(this.provide("img")); 
  },
  didDetachLayer: function(){
    SC.AceTheme.renderers.Button.didDetachLayer.call(this);
    this.imageRenderer.detachLayer();
  }
});

Pig.IconTheme.renderers.button = Pig.IconTheme.renderers.Button.create();
