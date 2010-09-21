/* >>>>>>>>>> BEGIN source/lproj/strings.js */
// ==========================================================================
// Project:   CcChat Strings
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

// Place strings you want to localize here.  In your app, use the key and
// localize it using "key string".loc().  HINT: For your key names, use the
// english string with an underscore in front.  This way you can still see
// how your UI will look and you'll notice right away when something needs a
// localized string added to this file!
//
SC.stringsFor('English', {
  // "_String Key": "Localized String"
}) ;

/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   CcChat
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @namespace

  My cool new framework.  Describe your framework.
  
  @extends SC.Object
*/
CcChat = SC.Object.create(
  /** @scope CcChat.prototype */ {

  NAMESPACE: 'CcChat',
  VERSION: '0.1.0',

  // TODO: Add global constants or singleton objects needed by your app here.
  store: SC.Store.create().from(SC.Record.fixtures)
}) ;

/* >>>>>>>>>> BEGIN source/controllers/chat.js */
// ==========================================================================
// Project:   CcChat.chatController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat Faye*/

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

// require('http://geniverse.dev.concord.org/chat/comet.js');
CcChat.chatController = SC.ObjectController.create(
/** @scope CcChat.chatController.prototype */ {
  
  comet: function() {
	  // If the Faye library is initialized, set up a client.
		if(typeof(Faye) !== 'undefined') {
	  	return new Faye.Client('/chat/comet');
		}
		return null;
	}(),
  
  chatHasInitialized: NO,
  
  username: "",
  
  usersInRoom: [],
  
  latestChat: null,       // other controllers can hook into this
  
  initChat: function(channel){
    if (this.comet === null){
        this.comet = new Faye.Client('/chat/comet');
    }

    var _channel = CcChat.chatRoomController.validateChannel(channel);
    CcChat.chatRoomController.set('channel', channel);
    
    var username = this.get('username');
    if (username.length < 1){
      username = "Test User";
      this.set('username', username);
    }
    this.comet.set_username(username);
    
    this.subscribeToChannel(_channel, this.receiveChat);
    
    this.subscribeToUserList(_channel);
    //  SC.Logger.log("initializing chat....");
    CcChat.chatController.set('chatHasInitialized', YES);
    this.propertyDidChange('chatHasInitialized');
    // this.chatHasInitialized = YES;
    return channel;
  },

  sendChat: function(message, item){
    
    if (!this.chatHasInitialized){
      SC.Logger.log("initializing chat");
      this.initChat('test');
    }
    var jsonMessage = {author: this.username, message: message, item: item};
    this.post(CcChat.chatRoomController.get('channel'), jsonMessage);
    
    SC.Logger.log("sent: "+message);
  },
  
  post: function(channel, jsonMessage){
    channel = CcChat.chatRoomController.validateChannel(channel);
    SC.Logger.log("sending on "+channel);
    this.comet.publish(channel, jsonMessage);
  },
  
  receiveChat: function(message){
    SC.Logger.log("received: "+message.message);
    this.addMessage(message);
  },
  
  addMessage: function(message){
  SC.RunLoop.begin();
    var chatMessage = CcChat.store.createRecord(CcChat.ChatMessage, {
      author: message.author, 
      message: message.message,
      time: this._now(),
      item: message.item
    });
    this.set('latestChat', chatMessage);
    SC.RunLoop.end();
  },
  
  subscribeToChannel: function(channel, callback){
    var _channel = CcChat.chatRoomController.validateChannel(channel);
    this.comet.subscribe(_channel, callback, this);
  },
  
  subscribeToUserList: function(channel){
    var _channel = CcChat.chatRoomController.validateChannel(channel);
    
    var self = this;
    function updateUserList(message){
      var clients = [].concat(message);
      self.set('usersInRoom', clients);
    }
    
    this.subscribeToChannel('/smeta/clients'+channel, updateUserList);
  },
  
  _usernameSet: function () {
    if (this.chatHasInitialized){
      var username = this.get('username');
      this.comet.set_username(username);
    }
  }.observes('username'),
  
  _now: function() { 
    return new Date().getTime();  // for now, just using time as ms, so we can order easily.
  }
  

}) ;

/* >>>>>>>>>> BEGIN source/controllers/chat_compose.js */
// ==========================================================================
// Project:   CcChat.chatComposeController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
CcChat.chatComposeController = SC.ObjectController.create(
/** @scope CcChat.chatComposeController.prototype */ {
  
  textAreaValue: null,            // for some reason, we can only set using "value" and not "fieldValue"
  
  item: null,
  
  sendAction: function () {
    var textAreaValue = this.get('textAreaValue');
    SC.Logger.log("textAreaValue: " + textAreaValue);
    var user = "User";
    CcChat.chatController.sendChat(textAreaValue, this.get('item'));

    this.set('textAreaValue', '');
    this.set('item', null);
  },
  
  imageUrl: function() {
    var item = CcChat.chatComposeController.get('item');
    if (item !== null && item.imageUrl !== undefined && item.imageUrl !== null){
      return item.imageUrl;
    }
    return "";
  }.property('item'),
    
  imageWidth: function() {
    if (this.get('imageUrl').length > 0){
      return 40;
    } else {
      return 0;
    }
  }.property('imageUrl'),
  
  clearButtonTitle: 'Remove item',
  
  showClearButton: function() {
    if (this.get('item') !== null){
      return true;
    }
    return false;
  }.property('item'),
  
  clearItem: function() {
    this.set('item', null);
  }

}) ;

/* >>>>>>>>>> BEGIN source/controllers/chat_list.js */
// ==========================================================================
// Project:   CcChat.chatListController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
CcChat.chatListController = SC.ArrayController.create(
/** @scope CcChat.chatListController.prototype */ {

  // TODO: Add your own code here.

}) ;

/* >>>>>>>>>> BEGIN source/controllers/chat_room.js */
// ==========================================================================
// Project:   CcChat.chatRoomController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
CcChat.chatRoomController = SC.ObjectController.create(
/** @scope CcChat.chatRoomController.prototype */ {
  
  channel: "",                  // the main channel that the user will chat in
  
  baseChannelName: function(){    // if channels are dynamically assigned, e.g. 'myRoom/1', this would be 'myRoom'
    return this.get('channel').split('NUM')[0];
  }.property('channel'),
  
  channelIndex:  function(){    // if channels are dynamically assigned, e.g. 'myRoom/1', this would be 1
    var channelNameParts = this.get('channel').split('NUM');
    if (channelNameParts.length > 1){
      return parseInt(channelNameParts[channelNameParts.length-1], 10);
    } else {
      return 0;
    }
  }.property('channel'),
  
  /**
   * This method can be used to assign students to rooms with no more
   * than n students. For instance, if you want no more than two
   * students per room, and you call getFirstChannelWithSpace("myRoom", 2)
   * for each student. The first two calls will return "myRoom/0," and, if
   * those students subscribe to that channel, the third call will return
   * "myRoom-2."
   * Callback should be a function which takes a string (the room name).
   */
  getFirstChannelWithSpace: function (baseChannelName, maxClients, callback){
    (function(baseChannelName, maxClients, callback){
      baseChannelName = CcChat.chatRoomController.validateChannel(baseChannelName);
      var channelNameParts = baseChannelName.split('NUM');
      var baseName = channelNameParts[0];
      
      var nextNum = 0;
      if (channelNameParts.length > 1){
        var prevNum = parseInt(channelNameParts[1], 10);
        nextNum = prevNum + 1;
      }
      
      var newChannelName = baseName + "NUM" + nextNum;
      SC.Logger.log("newChannelName = "+newChannelName);
      
      function checkIfChannelHasSpace(numClients){
        if (numClients < maxClients){
          callback(newChannelName);
        } else {
          CcChat.chatRoomController.getFirstChannelWithSpace(newChannelName, maxClients, callback);
        }
      }
      
      CcChat.chatRoomController.getNumClientsInChannel(newChannelName, checkIfChannelHasSpace);
      
    })(baseChannelName, maxClients, callback);
  },
  
  /**
   * Callback should be a function that takes a number (the clients in the room).
   */
  getNumClientsInChannel: function(channel, callback){
    (function(channel, callback){
      function returnNumberOfClients(message){
        var numClients = [].concat(message);
        SC.Logger.log("clients in "+channel+": "+numClients);
        var comet = CcChat.chatController.comet;
        comet.unsubscribe('/smeta/clients'+channel);
                
        callback(numClients.length, channel);
      }
            
      var comet = CcChat.chatController.comet;
      comet.subscribe('/smeta/clients'+channel, returnNumberOfClients, this);
    })(channel, callback);
  },
    
  validateChannel: function(channel){
    if (channel.slice(0,1) != "/"){
      channel = "/"+channel;
    }
    return channel;
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/controllers/login.js */
// ==========================================================================
// Project:   CcChat.loginController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  This view currently does nothing but set the 'username' property on
  chatController. However, it can be used by other views that want to
  hook into the login process. For instance, if the students start out
  seeing a login field, a controller can be watching the username property
  on chatController and, once it is set, log in and start up the application.

  @extends SC.Object
*/
CcChat.loginController = SC.ObjectController.create(
/** @scope CcChat.loginController.prototype */ {

  // TODO: Add your own code here.
  
  textAreaValue: null,
  
  username: null,
  
  passwordValue: null,
  
  retypePasswordValue: null,
  
  usernameBinding: 'CcChat.chatController.username',
  
  showRetypeField: NO,
  
  test: 35,
  
  welcomeMessage: function(){
    var username = this.get('username');
    if (username !== undefined && username !== null && username.length > 0){
      return "Welcome " + username;
    } else {
      return "";
    }
  }.property('username'),
  
  login: function (){
    var username = this.get('textAreaValue');
    CcChat.chatController.set('username', username);
    this.set('textAreaValue', '');
  },
  
  register: function (){
    if (!this.get('showRetypeField')){
      this.set('showRetypeField', YES);
    } else {
      if (this.get('passwordValue') === this.get('retypePasswordValue')){
        var username = this.get('textAreaValue');
        alert("Welcome "+username + "!");
        CcChat.chatController.set('username', username);
        
      } else {
        alert("The two passwords do not match");
      }
    }
  }

}) ;

/* >>>>>>>>>> BEGIN source/controllers/user_list.js */
// ==========================================================================
// Project:   CcChat.userListController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
CcChat.userListController = SC.ArrayController.create(
/** @scope CcChat.userListController.prototype */ {
  
  contentBinding: 'CcChat.chatController.usersInRoom'
  
}) ;

/* >>>>>>>>>> BEGIN source/models/chat_message.js */
// ==========================================================================
// Project:   CcChat.ChatMessage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals SC CcChat */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
CcChat.ChatMessage = SC.Record.extend(
/** @scope CcChat.ChatMessage.prototype */ {

    author: SC.Record.attr(String),
    
    message: SC.Record.attr(String),
    
    time: SC.Record.attr(Number),
    
    item: SC.Record.attr(Object)     // if items[0] is a json object with the attr imageUrl, that image will be shown in chat

}) ;

/* >>>>>>>>>> BEGIN source/views/chat_compose.js */
// ==========================================================================
// Project:   CcChat.ChatComposeView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
CcChat.ChatComposeView = SC.View.extend(SC.StaticLayout,
/** @scope CcChat.ChatComposeView.prototype */ {

  // TODO: Add your own code here.
  childViews: 'inputView imageView clearImageView sendView'.w(),
	
  inputView: SC.View.design(SC.StaticLayout, {
    layout: {left: 0, top: 0, right: 0, height: 35 },
		useStaticLayout: YES,
		childViews: 'textFieldView'.w(),
    textFieldView: SC.TextFieldView.design({
      isTextArea: NO,
      valueBinding: "CcChat.chatComposeController.textAreaValue",
      keyUp: function (evt){
        if (evt.keyCode === 13){
          CcChat.chatComposeController.sendAction();
        }
        this.fieldValueDidChange();
        evt.allowDefault(); 
        return YES;
      }
		})
	}),
	
  imageView: SC.ImageView.design({
    layout: {top: 2, left: 0, height: 35, width: this.imageWidth},
    value: '',
    valueBinding: 'CcChat.chatComposeController.imageUrl'
  }),
  
  clearImageView: SC.ButtonView.design({
    layout: { top: 45, height: 24, right: 125, width: 120 },
    titleBinding:  'CcChat.chatComposeController.clearButtonTitle',
    target: 'CcChat.chatComposeController',
    action: "clearItem",
    isVisibleBinding: 'CcChat.chatComposeController.showClearButton'
  }),
	
  sendView: SC.ButtonView.design({
    layout: { top: 45, height: 24, right: 20, width: 100 },
    title:  "Chat",
    action: "CcChat.chatComposeController.sendAction"
  }),
  
  _adjust_size: function() {
    var newWidth = CcChat.chatComposeController.get('imageWidth');
    this.inputView.adjust('left', newWidth);
  }.observes('CcChat.chatComposeController.item')
});

/* >>>>>>>>>> BEGIN source/views/chat_message.js */
// ==========================================================================
// Project:   CcChat.ChatMessageView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
CcChat.ChatMessageView = SC.View.extend(SC.ContentDisplay, 
/** @scope CcChat.ChatMessageView.prototype */ {
  
  contentDisplayProperties: 'author message'.w(),
  
  useStaticLayout: YES,
  
  // TODO: Add your own code here.
  render: function(context, firstTime) {
    var content = this.get('content');
    var author = content.get('author');
    author = (author === null) ? "" : author;
    var message = content.get('message');
    var time = content.get('time');
    var imageUrlStr = "";
    
    var item = content.get('item');
    if (item !== null){
      if (item !== null && item.imageUrl !== undefined && item.imageUrl !== null){
        imageUrlStr = '<img style="float: left" src="'+item.imageUrl+'" height="40px"></img>';
      }
    }
    
    context = context.begin().addClass('top');
    context = context.begin('p').addClass('name').push(imageUrlStr+'<b>%@</b>: %@'.fmt(author, message)).end();
    context = context.end(); // div.top
    
     arguments.callee.base.apply(this,arguments);
  }
});

/* >>>>>>>>>> BEGIN source/views/login.js */
// ==========================================================================
// Project:   CcChat.LoginView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
CcChat.LoginView = SC.View.extend(
/** @scope CcChat.LoginView.prototype */ {
  
  showPasswordField: YES,

  // TODO: Add your own code here.
  childViews: 'nameLabel nameField passwordLabel passwordField retypePasswordLabel retypePasswordField loginButtonView registerButtonView welcomeView'.w(),
  
  nameLabel: SC.LabelView.design({
    layout: {left: 40, top: 5, width: 80, height: 24 },
    value: "Username",
    fontWeight: SC.BOLD_WEIGHT
	}),
	
  nameField: SC.TextFieldView.design({
    layout: {left: 130, top: 5, width: 200, height: 24 },
    isTextArea: NO,
    valueBinding: 'CcChat.loginController.textAreaValue',
    keyUp: function (evt){
      if (evt.keyCode === 13){
        CcChat.loginController.login();
      }
      this.fieldValueDidChange();
      evt.allowDefault(); 
      return YES;
    }
	}),
	
	passwordLabel: SC.LabelView.design({
    layout: {left: 40, top: 35, width: 80, height: 24 },
    value: "Password",
    fontWeight: SC.BOLD_WEIGHT,
    isVisibleBinding: '*parentView.showPasswordField'
	}),
	
  passwordField: SC.TextFieldView.design({
    layout: {left: 130, top: 35, width: 200, height: 24 },
    isPassword: YES,
    isTextArea: NO,
    valueBinding: 'CcChat.loginController.passwordValue',
    keyUp: function (evt){
      if (evt.keyCode === 13){
        CcChat.loginController.login();
      }
      this.fieldValueDidChange();
      evt.allowDefault(); 
      return YES;
    },
    isVisibleBinding: '*parentView.showPasswordField'
	}),
	
 retypePasswordLabel: SC.LabelView.design({
    layout: {left: 0, top: 65, width: 120, height: 24 },
    value: "Retype Password",
    fontWeight: SC.BOLD_WEIGHT,
    isVisibleBinding: 'CcChat.loginController.showRetypeField'
	}),
	
  retypePasswordField: SC.TextFieldView.design({
    layout: {left: 130, top: 65, width: 200, height: 24 },
    isPassword: YES,
    isTextArea: NO,
    valueBinding: 'CcChat.loginController.retypePasswordValue',
    keyUp: function (evt){
      if (evt.keyCode === 13){
        CcChat.loginController.login();
      }
      this.fieldValueDidChange();
      evt.allowDefault(); 
      return YES;
    },
    isVisibleBinding: 'CcChat.loginController.showRetypeField'
	}),
	
  loginButtonView: SC.ButtonView.design({
    layout: { top: 35, height: 24, left: 350, width: 100 },
    title:  "Log in",
    target: 'CcChat.loginController',
    action: 'login',
    isVisibleBinding: SC.Binding.not('CcChat.loginController.showRetypeField'),
    
    init: function() {
      if (!this.get('parentView').get('showPasswordField')){
        this.adjust({ top: 5 });
      }
  		arguments.callee.base.apply(this,arguments);
  	}
  }),
  
  registerButtonView: SC.ButtonView.design({
    layout: { top: 65, height: 24, left: 350, width: 140 },
    title:  "Register new user",
    target: 'CcChat.loginController',
    action: 'register',
    isVisibleBinding: '*parentView.showPasswordField'
  }),
  
  welcomeView: SC.LabelView.design({
      layout: { top: 5, height: 24, left: 370, width: 200 },
      value: "",
      valueBinding: SC.Binding.from('CcChat.loginController.welcomeMessage').oneWay()
  })
});

/* >>>>>>>>>> BEGIN source/views/user_list.js */
// ==========================================================================
// Project:   CcChat.UserListView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals CcChat */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
CcChat.UserListView = SC.ScrollView.extend({
  hasHorizontalScroller: NO,
  layout: { height: 100 },
  backgroundColor: 'white',
  contentView: SC.ListView.design({
		contentBinding: 'CcChat.userListController.arrangedObjects',
		selectionBinding: 'CcChat.userListController.selection',
		rowHeight: 30,
		canEditContent: NO,
		isSelectable: YES,
		showAlternatingRows: YES
  })
});

/* >>>>>>>>>> BEGIN bundle_loaded.js */
; if ((typeof SC !== 'undefined') && SC && SC.bundleDidLoad) SC.bundleDidLoad('cc/cc_chat');
