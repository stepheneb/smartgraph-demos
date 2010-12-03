SC.EmptyTheme=SC.BaseTheme.extend({classNames:["sc-empty"]});SC.Theme.register("sc-empty",SC.EmptyTheme);
SC.AceTheme=SC.EmptyTheme.extend({name:"Ace",description:"Coolness.",classNames:["ace"]});
SC.Theme.register("sc-ace",SC.AceTheme);SC.AceTheme.Dark=SC.AceTheme.subtheme("dark","dark");
SC.defaultTheme="sc-ace";sc_require("src/theme");SC.AceTheme.renderers.Well=SC.BaseTheme.renderers.Well.extend({render:function(a){if(this.contentProvider){this.contentProvider.renderContent(a)
}},update:function(){}});SC.AceTheme.renderers.well=SC.AceTheme.renderers.Well.create();
require("src/theme");SC.AceTheme.PointLeft=SC.AceTheme.subtheme("point-left","point-left");
SC.AceTheme.PointRight=SC.AceTheme.subtheme("point-right","point-right");SC.AceTheme.PointRight=SC.AceTheme.subtheme("capsule","capsule");
SC.AceTheme.renderers.Button=SC.EmptyTheme.renderers.Button.extend({renderContents:function(a){a.push("<span class='button-left'></span>");
a.push("<span class='button-middle'>");a=a.begin("label").addClass("sc-button-label");
this._titleRenderer.render(a);a=a.end();a.push("</span>");a.push("<span class='button-right'></span>")
}});SC.AceTheme.renderers.button=SC.AceTheme.renderers.Button.create();SC.AceTheme.renderers.Slider=SC.BaseTheme.renderers.Slider.extend({renderSlider:function(b){var a=SC.BLANK_IMAGE_URL;
b.push('<span class="sc-track">','<span class="sc-left"></span>','<span class="sc-middle"></span>','<span class="sc-right"></span>',"</span>",'<img src="',a,'" class="sc-handle" style="left: ',this.value,'%" />')
}});SC.AceTheme.renderers.slider=SC.AceTheme.renderers.Slider.create();SC.AceTheme.Dark.PointLeft=SC.AceTheme.Dark.subtheme("point-left","point-left");
SC.AceTheme.Dark.PointRight=SC.AceTheme.Dark.subtheme("point-right","point-right");
SC.AceTheme.Dark.PointRight=SC.AceTheme.Dark.subtheme("capsule","capsule");if(SC.EmptyTheme.renderers.Form){sc_require("src/theme");
SC.AceTheme.IphoneForm=SC.AceTheme.subtheme("iphone-form","iphone-form")}require("src/form/iphone/iphone");
if(SC.AceTheme.IphoneForm){SC.AceTheme.IphoneForm.renderers.Form=SC.EmptyTheme.renderers.Form.extend({formFlowSpacing:{left:10,right:10,top:0,bottom:0}});
SC.AceTheme.IphoneForm.renderers.form=SC.AceTheme.IphoneForm.renderers.Form.create()
}require("src/form/iphone/iphone");if(SC.AceTheme.IphoneForm){SC.AceTheme.IphoneForm.renderers.FormRow=SC.EmptyTheme.renderers.FormRow.extend({rowFlowPadding:{left:15,right:0,top:0,bottom:0},rowFlowSpacing:{left:0,right:15,top:0,bottom:0}});
SC.AceTheme.IphoneForm.renderers.formRow=SC.AceTheme.IphoneForm.renderers.FormRow.create()
}require("src/form/iphone/iphone");if(SC.AceTheme.IphoneForm){SC.AceTheme.IphoneForm.renderers.Label=SC.EmptyTheme.renderers.Label.extend({renderTitle:function(a){a.push("<div class='inner'>");
this.titleRenderer.render(a);a.push("</div>");a.css("font-weight","")},updateTitle:function(){this.titleRenderer.update();
this.$().css("font-weight","")},didAttachLayer:function(a){this.titleRenderer.attachLayer(this.provide(".inner"))
}});SC.AceTheme.IphoneForm.renderers.label=SC.AceTheme.IphoneForm.renderers.Label.create()
}SC.AceTheme.Popover=SC.AceTheme.Dark.subtheme("popover","popover");SC.AceTheme.register("popover",SC.AceTheme.Popover);
SC.AceTheme.SolidPopover=SC.AceTheme.Popover.subtheme("solid","solid");SC.AceTheme.register("solid-popover",SC.AceTheme.SolidPopover);
require("src/panels/picker/popover/popover");SC.AceTheme.Popover.renderers.Picker=SC.EmptyTheme.renderers.Picker.extend({render:function(a){if(this.contentProvider){this.contentProvider.renderContent(a)
}a.addClass(this.pointerPos)},update:function(){this.$().addClass(this.pointerPos)
}});SC.AceTheme.Popover.renderers.picker=SC.AceTheme.Popover.renderers.Picker.create();
require("src/panels/picker/popover/popover");var theme=SC.AceTheme.Popover;SC.AceTheme.Popover.renderers.Workspace=SC.EmptyTheme.renderers.Workspace.extend({computeClassNames:function(){var a=this._TMP_CLASS_NAMES||{};
a["top-toolbar"]=this.hasTopToolbar;a["bottom-toolbar"]=this.hasBottomToolbar;this._TMP_CLASS_NAMES=a;
return a},render:function(a){a.setClass(this.computeClassNames());a.push("<div class='sc-workspace-overlay'>","<div class='middle'></div>","<div class='top-left-edge'></div>","<div class='top-edge'></div>","<div class='top-right-edge'></div>","<div class='right-edge'></div>","<div class='bottom-right-edge'></div>","<div class='bottom-edge'></div>","<div class='bottom-left-edge'></div>","<div class='left-edge'></div>","<div class='sc-pointer'></div>","</div>");
if(this.contentProvider){this.contentProvider.renderContent(a)}},update:function(){this.$().setClass(this.computeClassNames())
}});SC.AceTheme.Popover.renderers.workspace=SC.AceTheme.Popover.renderers.Workspace.create();
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