var Pig=SC.AceTheme.extend({classNames:"pig"});SC.Theme.register("pig",Pig);require("pig");
Pig.renderers.MasterDetail=SC.EmptyTheme.renderers.MasterDetail.extend({BORDER:0});
Pig.renderers.masterDetail=Pig.renderers.MasterDetail.create();require("pig");Pig.Paper=Pig.subtheme("paper","paper");
require("pig");Pig.ChromelessTheme=Pig.subtheme("chromeless","chromeless");Pig.ChromelessTheme.renderers.Button=SC.AceTheme.renderers.Button.extend({renderContents:function(a){a=a.begin("label");
this._titleRenderer.render(a);a=a.end()},updateContents:function(){this._titleRenderer.update()
}});Pig.ChromelessTheme.renderers.button=Pig.ChromelessTheme.renderers.Button.create();
require("src/paper/paper");Pig.IconTheme=Pig.Paper.subtheme("icon","icon");Pig.IconTheme.renderers.Button=Pig.renderers.Button.extend({renderContents:function(a){if(!this.imageRenderer){this.imageRenderer=this.theme.image()
}this.imageRenderer.attr("src",this.icon);a=a.begin("img");this.imageRenderer.render(a);
a=a.end()},updateContents:function(){this.imageRenderer.attr("src",this.icon);this.imageRenderer.update()
},didAttachLayer:function(a){SC.AceTheme.renderers.Button.didAttachLayer.call(this,a);
this.imageRenderer.attachLayer(this.provide("img"))},didDetachLayer:function(){SC.AceTheme.renderers.Button.didDetachLayer.call(this);
this.imageRenderer.detachLayer()}});Pig.IconTheme.renderers.button=Pig.IconTheme.renderers.Button.create();