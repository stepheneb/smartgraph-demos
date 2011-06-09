SC.stringsFor("English",{});CcChat=SC.Object.create({NAMESPACE:"CcChat",VERSION:"0.1.0",store:SC.Store.create().from(SC.Record.fixtures)});
CcChat.chatController=SC.ObjectController.create({comet:function(){if(!this._comet){this._comet=typeof("Faye")!=="undefined"?new Faye.Client("/chat/comet"):null
}return this._comet}.property().cacheable(),chatHasInitialized:NO,username:"",usersInRoom:[],latestChat:null,initChat:function(b){var a=CcChat.chatRoomController.validateChannel(b);
CcChat.chatRoomController.set("channel",b);var c=this.get("username");if(c.length<1){c="Test User";
this.set("username",c)}this.get("comet").set_username(c);this.subscribeToChannel(a,this.receiveChat);
this.subscribeToUserList(a);CcChat.chatController.set("chatHasInitialized",YES);this.propertyDidChange("chatHasInitialized");
return b},sendChat:function(c,b){if(!this.chatHasInitialized){SC.Logger.log("initializing chat");
this.initChat("test")}var a={author:this.username,message:c,item:b};this.post(CcChat.chatRoomController.get("channel"),a);
SC.Logger.log("sent: "+c)},post:function(b,a){b=CcChat.chatRoomController.validateChannel(b);
SC.Logger.log("sending on "+b);this.get("comet").publish(b,a)},receiveChat:function(a){SC.Logger.log("received: "+a.message);
this.addMessage(a)},addMessage:function(b){SC.RunLoop.begin();var a=CcChat.store.createRecord(CcChat.ChatMessage,{author:b.author,message:b.message,time:this._now(),item:b.item});
this.set("latestChat",a);SC.RunLoop.end()},subscribeToChannel:function(b,c){var a=CcChat.chatRoomController.validateChannel(b);
this.get("comet").subscribe(a,c,this)},subscribeToUserList:function(c){var b=CcChat.chatRoomController.validateChannel(c);
var a=this;function d(f){var e=[].concat(f);a.set("usersInRoom",e)}this.subscribeToChannel("/smeta/clients"+c,d)
},_usernameSet:function(){if(this.chatHasInitialized){var a=this.get("username");
this.get("comet").set_username(a)}}.observes("username"),_now:function(){return new Date().getTime()
}});CcChat.chatComposeController=SC.ObjectController.create({textAreaValue:null,item:null,sendAction:function(){var b=this.get("textAreaValue");
SC.Logger.log("textAreaValue: "+b);var a="User";CcChat.chatController.sendChat(b,this.get("item"));
this.set("textAreaValue","");this.set("item",null)},imageUrl:function(){var a=CcChat.chatComposeController.get("item");
if(a!==null&&a.imageUrl!==undefined&&a.imageUrl!==null){return a.imageUrl}return""
}.property("item"),imageWidth:function(){if(this.get("imageUrl").length>0){return 40
}else{return 0}}.property("imageUrl"),clearButtonTitle:"Remove item",showClearButton:function(){if(this.get("item")!==null){return true
}return false}.property("item"),clearItem:function(){this.set("item",null)}});CcChat.chatListController=SC.ArrayController.create({});
CcChat.chatRoomController=SC.ObjectController.create({channel:"",baseChannelName:function(){return this.get("channel").split("NUM")[0]
}.property("channel"),channelIndex:function(){var a=this.get("channel").split("NUM");
if(a.length>1){return parseInt(a[a.length-1],10)}else{return 0}}.property("channel"),getFirstChannelWithSpace:function(a,b,c){(function(f,j,l){f=CcChat.chatRoomController.validateChannel(f);
var g=f.split("NUM");var d=g[0];var e=0;if(g.length>1){var i=parseInt(g[1],10);e=i+1
}var h=d+"NUM"+e;SC.Logger.log("newChannelName = "+h);function k(m){if(m<j){l(h)}else{CcChat.chatRoomController.getFirstChannelWithSpace(h,j,l)
}}CcChat.chatRoomController.getNumClientsInChannel(h,k)})(a,b,c)},getNumClientsInChannel:function(a,b){(function(d,f){function c(h){var g=[].concat(h);
SC.Logger.log("clients in "+d+": "+g);var i=CcChat.chatController.get("comet");i.unsubscribe("/smeta/clients"+d);
f(g.length,d)}var e=CcChat.chatController.get("comet");e.subscribe("/smeta/clients"+d,c,this)
})(a,b)},validateChannel:function(a){if(a.slice(0,1)!="/"){a="/"+a}return a}});CcChat.loginController=SC.ObjectController.create({textAreaValue:null,username:null,passwordValue:null,retypePasswordValue:null,usernameBinding:"CcChat.chatController.username",showRetypeField:NO,test:35,welcomeMessage:function(){var a=this.get("username");
if(a!==undefined&&a!==null&&a.length>0){return"Welcome "+a}else{return""}}.property("username"),login:function(){var a=this.get("textAreaValue");
CcChat.chatController.set("username",a);this.set("textAreaValue","")},register:function(){if(!this.get("showRetypeField")){this.set("showRetypeField",YES)
}else{if(this.get("passwordValue")===this.get("retypePasswordValue")){var a=this.get("textAreaValue");
alert("Welcome "+a+"!");CcChat.chatController.set("username",a)}else{alert("The two passwords do not match")
}}}});CcChat.userListController=SC.ArrayController.create({contentBinding:"CcChat.chatController.usersInRoom"});
CcChat.ChatMessage=SC.Record.extend({author:SC.Record.attr(String),message:SC.Record.attr(String),time:SC.Record.attr(Number),item:SC.Record.attr(Object)});
CcChat.ChatComposeView=SC.View.extend(SC.StaticLayout,{childViews:"inputView imageView clearImageView sendView".w(),inputView:SC.View.design(SC.StaticLayout,{layout:{left:0,top:0,right:0,height:35},useStaticLayout:YES,childViews:"textFieldView".w(),textFieldView:SC.TextFieldView.design({isTextArea:NO,valueBinding:"CcChat.chatComposeController.textAreaValue",keyUp:function(a){if(a.keyCode===13){CcChat.chatComposeController.sendAction()
}this.fieldValueDidChange();a.allowDefault();return YES}})}),imageView:SC.ImageView.design({layout:{top:2,left:0,height:35,width:this.imageWidth},value:"",valueBinding:"CcChat.chatComposeController.imageUrl"}),clearImageView:SC.ButtonView.design({layout:{top:45,height:24,right:125,width:120},titleBinding:"CcChat.chatComposeController.clearButtonTitle",target:"CcChat.chatComposeController",action:"clearItem",isVisibleBinding:"CcChat.chatComposeController.showClearButton"}),sendView:SC.ButtonView.design({layout:{top:45,height:24,right:20,width:100},title:"Chat",action:"CcChat.chatComposeController.sendAction"}),_adjust_size:function(){var a=CcChat.chatComposeController.get("imageWidth");
this.inputView.adjust("left",a)}.observes("CcChat.chatComposeController.item")});
CcChat.ChatMessageView=SC.View.extend(SC.ContentDisplay,{contentDisplayProperties:"author message".w(),useStaticLayout:YES,render:function(a,h){var e=this.get("content");
var b=e.get("author");b=(b===null)?"":b;var d=e.get("message");var f=e.get("time");
var g="";var c=e.get("item");if(c!==null){if(c!==null&&c.imageUrl!==undefined&&c.imageUrl!==null){g='<img style="float: left" src="'+c.imageUrl+'" height="40px"></img>'
}}a=a.begin().addClass("top");a=a.begin("p").addClass("name").push(g+"<b>%@</b>: %@".fmt(b,d)).end();
a=a.end();arguments.callee.base.apply(this,arguments)}});CcChat.LoginView=SC.View.extend({showPasswordField:YES,childViews:"nameLabel nameField passwordLabel passwordField retypePasswordLabel retypePasswordField loginButtonView registerButtonView welcomeView".w(),nameLabel:SC.LabelView.design({layout:{left:40,top:5,width:80,height:24},value:"Username",fontWeight:SC.BOLD_WEIGHT}),nameField:SC.TextFieldView.design({layout:{left:130,top:5,width:200,height:24},isTextArea:NO,valueBinding:"CcChat.loginController.textAreaValue",keyUp:function(a){if(a.keyCode===13){CcChat.loginController.login()
}this.fieldValueDidChange();a.allowDefault();return YES}}),passwordLabel:SC.LabelView.design({layout:{left:40,top:35,width:80,height:24},value:"Password",fontWeight:SC.BOLD_WEIGHT,isVisibleBinding:"*parentView.showPasswordField"}),passwordField:SC.TextFieldView.design({layout:{left:130,top:35,width:200,height:24},isPassword:YES,isTextArea:NO,valueBinding:"CcChat.loginController.passwordValue",keyUp:function(a){if(a.keyCode===13){CcChat.loginController.login()
}this.fieldValueDidChange();a.allowDefault();return YES},isVisibleBinding:"*parentView.showPasswordField"}),retypePasswordLabel:SC.LabelView.design({layout:{left:0,top:65,width:120,height:24},value:"Retype Password",fontWeight:SC.BOLD_WEIGHT,isVisibleBinding:"CcChat.loginController.showRetypeField"}),retypePasswordField:SC.TextFieldView.design({layout:{left:130,top:65,width:200,height:24},isPassword:YES,isTextArea:NO,valueBinding:"CcChat.loginController.retypePasswordValue",keyUp:function(a){if(a.keyCode===13){CcChat.loginController.login()
}this.fieldValueDidChange();a.allowDefault();return YES},isVisibleBinding:"CcChat.loginController.showRetypeField"}),loginButtonView:SC.ButtonView.design({layout:{top:35,height:24,left:350,width:100},title:"Log in",target:"CcChat.loginController",action:"login",isVisibleBinding:SC.Binding.not("CcChat.loginController.showRetypeField"),init:function(){if(!this.get("parentView").get("showPasswordField")){this.adjust({top:5})
}arguments.callee.base.apply(this,arguments)}}),registerButtonView:SC.ButtonView.design({layout:{top:65,height:24,left:350,width:140},title:"Register new user",target:"CcChat.loginController",action:"register",isVisibleBinding:"*parentView.showPasswordField"}),welcomeView:SC.LabelView.design({layout:{top:5,height:24,left:370,width:200},value:"",valueBinding:SC.Binding.from("CcChat.loginController.welcomeMessage").oneWay()})});
CcChat.UserListView=SC.ScrollView.extend({hasHorizontalScroller:NO,layout:{height:100},backgroundColor:"white",contentView:SC.ListView.design({contentBinding:"CcChat.userListController.arrangedObjects",selectionBinding:"CcChat.userListController.selection",rowHeight:30,canEditContent:NO,isSelectable:YES,showAlternatingRows:YES})});
if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("cc/cc_chat")
};