(function(){var a="sproutcore/standard_theme";if(!SC.BUNDLE_INFO){throw"SC.BUNDLE_INFO is not defined!"
}if(SC.BUNDLE_INFO[a]){return}SC.BUNDLE_INFO[a]={requires:["sproutcore/empty_theme"],styles:["/static/sproutcore/standard_theme/en/8b65428a7dcfa2226586b487bde1bf11560de2aa/stylesheet-packed.css","/static/sproutcore/standard_theme/en/8b65428a7dcfa2226586b487bde1bf11560de2aa/stylesheet.css"],scripts:["/static/sproutcore/standard_theme/en/8b65428a7dcfa2226586b487bde1bf11560de2aa/javascript-packed.js"]}
})();Todos=SC.Application.create({NAMESPACE:"Todos",VERSION:"0.1.0",store:SC.Store.create({commitRecordsAutomatically:YES}).from("Todos.TaskDataSource")});
Todos.tasksController=SC.ArrayController.create(SC.CollectionViewDelegate,{summary:function(){var a=this.get("length"),b;
if(a&&a>0){b=a===1?"1 task":"%@ tasks".fmt(a)}else{b="No tasks"}return b}.property("length").cacheable(),collectionViewDeleteContent:function(a,e,d){var c=d.map(function(f){return this.objectAt(f)
},this);c.invoke("destroy");var b=d.get("min")-1;if(b<0){b=0}this.selectObject(this.objectAt(b))
},addTask:function(){var a;a=Todos.store.createRecord(Todos.Task,{description:"New Task",isDone:false});
this.selectObject(a);this.invokeLater(function(){var d=this.indexOf(a);var c=Todos.mainPage.getPath("mainPane.middleView.contentView");
var b=c.itemViewForContentIndex(d);b.beginEditing()});return YES},toggleDone:function(){var a=this.get("selection");
a.setEach("isDone",!a.everyProperty("isDone"));return YES}});Todos.TASKS_QUERY=SC.Query.local(Todos.Task,{orderBy:"isDone,description"});
Todos.TaskDataSource=SC.DataSource.extend({_dbpath:"/db/todos/",getServerPath:function(a){var b=this._dbpath+a;
return b},getServerView:function(b){var a=this._dbpath+"_design/app/_view/"+b;return a
},fetch:function(a,b){if(b===Todos.TASKS_QUERY){SC.Request.getUrl(this.getServerView("allTasks")).json().header("Accept","application/json").notify(this,"didFetchTasks",a,b).send();
return YES}return NO},didFetchTasks:function(d,c,e){if(SC.ok(d)){var a=d.get("encodedBody");
var f=SC.json.decode(a);var b=f.rows.getEach("value");c.loadRecords(Todos.Task,b);
c.dataSourceDidFetchQuery(e)}else{c.dataSourceDidErrorQuery(e,d)}},retrieveRecord:function(a,b){if(SC.kindOf(a.recordTypeFor(b),Todos.Task)){var c=a.idFor(b);
SC.Request.getUrl(this.getServerPath(c)).header("Accept","application/json").json().notify(this,"didRetrieveTask",a,b).send();
return YES}return NO},didRetrieveTask:function(b,a,d){if(SC.ok(b)){var c=b.get("body").content;
a.dataSourceDidComplete(d,c)}else{a.dataSourceDidError(d,b)}},processResponse:function(c){if(SC.ok(c)){var a=c.get("encodedBody");
var e=SC.json.decode(a);var d=e.ok;if(d!=YES){return{error:true,response:e}}var f=e.id;
var b=e.rev;return{ok:true,id:f,rev:b}}else{return{error:true,response:c}}},getDocRev:function(a){return a._rev
},createRecord:function(a,b){if(SC.kindOf(a.recordTypeFor(b),Todos.Task)){SC.Request.postUrl(this.getServerPath("/")).json().header("Accept","application/json").notify(this,this.didCreateTask,a,b).send(a.readDataHash(b));
return YES}return NO},didCreateTask:function(b,a,d){var c=this.processResponse(b);
if(c.ok){var e=a.readDataHash(d);e._id=c.id;e._rev=c.rev;a.dataSourceDidComplete(d,e,c.id)
}else{a.dataSourceDidError(d,b)}},updateRecord:function(a,c){if(SC.kindOf(a.recordTypeFor(c),Todos.Task)){var d=a.idFor(c);
var b=a.readDataHash(c);SC.Request.putUrl(this.getServerPath(d)).json().header("Accept","application/json").notify(this,this.didUpdateTask,a,c).send(b);
return YES}return NO},didUpdateTask:function(b,a,d){var c=this.processResponse(b);
if(c.ok){var e=a.readDataHash(d);e._rev=c.rev;a.dataSourceDidComplete(d,e)}else{a.dataSourceDidError(d)
}},destroyRecord:function(b,d){if(SC.kindOf(b.recordTypeFor(d),Todos.Task)){var e=b.idFor(d);
var c=b.readDataHash(d);var a=this.getDocRev(c);SC.Request.deleteUrl(this.getServerPath(e+"?rev="+a)).json().header("Accept","application/json").notify(this,this.didDeleteTask,b,d).send();
return YES}return NO},didDeleteTask:function(b,a,d){var c=this.processResponse(b);
if(c.ok){a.dataSourceDidDestroy(d)}else{a.dataSourceDidError(b)}}});Todos.Task=SC.Record.extend({primaryKey:"_id",isDone:SC.Record.attr(Boolean),description:SC.Record.attr(String)});
Todos.mainPage=SC.Page.design({mainPane:SC.MainPane.design({childViews:"middleView topView bottomView".w(),topView:SC.ToolbarView.design({layout:{top:0,left:0,right:0,height:36},childViews:"labelView addButton".w(),anchorLocation:SC.ANCHOR_TOP,labelView:SC.LabelView.design({layout:{centerY:0,height:24,left:8,width:200},controlSize:SC.LARGE_CONTROL_SIZE,fontWeight:SC.BOLD_WEIGHT,value:"Todos"}),addButton:SC.ButtonView.design({layout:{centerY:0,height:24,right:12,width:100},title:"Add Task",target:"Todos.tasksController",action:"addTask"})}),middleView:SC.ScrollView.design({hasHorizontalScroller:NO,layout:{top:36,bottom:32,left:0,right:0},backgroundColor:"white",contentView:SC.ListView.design({contentBinding:"Todos.tasksController.arrangedObjects",selectionBinding:"Todos.tasksController.selection",contentValueKey:"description",contentCheckboxKey:"isDone",rowHeight:21,canEditContent:YES,canDeleteContent:YES,target:"Todos.tasksController",action:"toggleDone"})}),bottomView:SC.ToolbarView.design({layout:{bottom:0,left:0,right:0,height:32},childViews:"summaryView".w(),anchorLocation:SC.ANCHOR_BOTTOM,summaryView:SC.LabelView.design({layout:{centerY:0,height:18,left:20,right:20},textAlign:SC.ALIGN_CENTER,valueBinding:"Todos.tasksController.summary"})})})});
Todos.main=function main(){Todos.getPath("mainPage.mainPane").append();var a=Todos.TASKS_QUERY;
var b=Todos.store.find(a);Todos.tasksController.set("content",b)};function main(){Todos.main()
};