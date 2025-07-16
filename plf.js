 /*
 File Version: 1.0.0.3
 File Name 	: plf.js
 Purpose 	: Core file which is used to generate controls.
 Class Type	: Static Class

 Notes: 
 1) All the controls  used in Header / Search sections are wrapped in Container.
 This is done for better formatting.
 2) Controls which are wrapped in Containers cannot  be used in grid. 
 Hence, "Plain" controls are used for grid containers.
 */
 /*
 Generic Model which is used to load all the  combos. 
 Notes : This definition is available in "plfTransScreen.js". Hence, commented .
 */
 /*
 Ext.define('combo_model',  
 {
 	extend: 'Ext.data.Model',
 	fields: ["id","value"]
 });
 */ 
 /* Modified By			Date						ID					*/
 /* Rajiv R				28/08/2014					57336				*/
 /* Rajiv R				02/09/2014					57351				*/
 /* Rajiv R				03/09/2014					57342				*/
 /* Rajiv R				04/09/2014					57410				*/
 /*
 plf class creation
 */
 Ext.define('plf', {
     alternativeClassName: 'plf',
     statics: {
         /*
         Defines number of column in layout View. Can be modified before column layout creation.
         */
         columns: 1,

         /*
         Global Padding. Can be modified before layout creation.
         */
         padding: 0,

         /*
         Global Padding. Can be modified before layout creation.
         */
         margin: 0,


         /*
         Global label. Can be modified before control creation.
         */
         labelWidth: 130,

         defaultLayout: 4,

         controlCounter: 0,

         defDateFormat: "d-m-Y",
         renderDateFormat: "d-m-Y",
         appMarginHeight: 50,
         /*
         Global Screen width. Screens are designed for this width.
         Removing Width results in controls are overlapping / controls moving to next line.
         There will be a horizontal scrollbar for low resolution screens.
         */
         /*Search Input*/
         searchValue: null,
         indexes: [],
         currentIndex: null,
         searchRegExp: null,
         caseSensitive: false,
         regExpMode: false,
         matchCls: 'x-livesearch-match',
         defaultStatusText: 'Nothing Found',
         tagsRe: /<[^>]*>/gm,
         tagsProtect: '\x0f',
         regExpProtect: /\\|\/|\+|\\|\.|\[|\]|\{|\}|\?|\$|\*|\^|\|/gm,
         /*Search Input*/
         grideventid: "",
         weightPrecision: 3,
         volumePrecision: 3,
         commonPrecision: 3,
         qtyPrecision: 3,
         screenWidth: Ext.getBody().getViewSize().width,
         screenHeight: Ext.getBody().getViewSize().height,
         appMargin: 0, //180
         helpMargin: 0, //120
         helpRatio: .78,
         helpVisibleRows: 8,
         searchVisibleRows: 14,
	  	 chartCounter:0,
	  	 customChartCounter:0,
         viewport: {},
	  gisMap : undefined,	
         setPlfDefaults: function() {
             plf.appMargin = 60
                 //plf.margin=3
         },
         /*
         Column Layout creation.
         Usage : This layout will  be used in "Header" section creation.
         */
         addFileUploadColumnSection: function(inObj) {
             outObj = Ext.create("Ext.panel.Panel", {
                 layout: "column",
                 /*padding:plf.padding,
                 margin:plf.margin,
                 border:true,
                 defaults:{padding:plf.padding,margin:plf.margin}*/
             })
             plf.controlCounter = 0
             if (inObj.title != undefined) outObj.title = inObj.title
             if (inObj.height != undefined) outObj.height = inObj.height
             if (inObj.controls != undefined) outObj.items = inObj.controls
             if (inObj.columnWidth != undefined)
                 outObj.columnWidth = inObj.columnWidth;
             /*code added for bug id:57372 starts here*/

             /*code added for bug id:57372 ends here*/
             return outObj;
         },
         addColumnSection: function(inObj) {
             outObj = Ext.create("Ext.panel.Panel", {
                 layout: "column",
                 //padding:plf.padding,
                 //margin:plf.margin,
                 border: false,
                 //defaults:{padding:plf.padding,margin:plf.margin},
                 //cls:"c-mainpage-section",
                 //bodyCls:"c-mainpage-section"
             })
             plf.controlCounter = 0
             if (inObj.title != undefined) outObj.title = inObj.title
             if (inObj.height != undefined) outObj.height = inObj.height
             if (inObj.hidden != undefined) outObj.hidden = inObj.hidden
             if (inObj.margin != undefined) outObj.setMargin(inObj.margin)
             if (inObj.padding != undefined) outObj.padding = inObj.padding;
             if (inObj.id != undefined) outObj.itemId = "cnt_" + inObj.id
             if (inObj.keySection) outObj.cls = "c-mainpage-keySection";
             else
                 outObj.cls = "c-mainpage-section";


             if (inObj.scroll != undefined) outObj.setScrollable(true)
             if (inObj.columnWidth != undefined)
                 outObj.columnWidth = inObj.columnWidth;

             /*code added for bug id:57372 starts here*/
             if (inObj.cls != undefined) {
                 outObj.cls = inObj.cls
                 outObj.bodyCls = inObj.cls
             }
			 if (inObj.tool != undefined)
				 outObj.tools = inObj.tool;
				 
             /*code added for bug id:57372 ends here*/
             return outObj;
         },
         /*
         Column Layout creation.
         Usage : This layout will  be used in "Header" section creation.
         */
         addGenSection: function(inObj) {
             if (inObj.layout == undefined) {
                 inObj.layout = "column";
                 //inObj.height=plf.screenHeight				
             }
             if (inObj.layout == "hbox.max") {
                 inObj.layout = "hbox";
                 inObj.width = plf.screenWidth
             }
             if (inObj.layout == "vbox") {
                 inObj.layout = "vbox";
                 inObj.width = plf.screenWidth
             }
             outObj = Ext.create("Ext.panel.Panel", {
                 layout: inObj.layout,
                 //padding:plf.padding,
                 //margin:plf.margin,
                 border: false,
                 //defaults:{padding:plf.padding,margin:plf.margin},
                 //cls:"c-mainpage-section",
                 //bodyCls:"c-plainpage-section"
             })

             plf.controlCounter = 0
             if (inObj.title != undefined) outObj.title = inObj.title
                 //if(inObj.height != undefined) outObj.height=plf.gAH(inObj.height)
                 //if(inObj.width != undefined) outObj.width=plf.gAW(inObj.width)
                 //var tmpMainScreenWidth=plf.screenWidth-111
                 //outObj.width=tmpMainScreenWidth;
             if (inObj.columnWidth != undefined)
                 outObj.columnWidth = inObj.columnWidth;

             /*code added for bug id:57372 starts here*/
             if (inObj.cls != undefined) {
                 outObj.cls = inObj.cls
                 outObj.bodyCls = inObj.cls
             } else {
                 outObj.cls = "c-mainpage-section"
                 outObj.bodyCls = "c-mainpage-section"
             }
             /*code added for bug id:57372 ends here*/
             return outObj;
         },
         /*
         Tab Layout creation.
         Usage : This layout will  be used in "Header" section creation.
         */
         addTabSection: function(inObj,parentForm) {
             outObj = {
                 xtype: "tabpanel",
                 padding: plf.padding,
                 margin: plf.margin,
                 autoWidth: false,
                 autoHeight: false,
                 defaults: {
                     padding: plf.padding,
                     margin: plf.margin
                 },
                 cls: "c-mainpage-section_tab",
                 //bodyCls:"c-mainpage-section"
             }
			 if (inObj.columnWidth != undefined)
                 outObj.columnWidth = inObj.columnWidth;
			 if (inObj.id != undefined) outObj.itemId = "cnt_" + inObj.id
             if (inObj.tabs != undefined) outObj.items = inObj.tabs
             //if (inObj.listeners != undefined) outObj.listeners = inObj.listeners			 
             if (inObj.listeners != undefined) 			outObj.listeners ={
				tabchange: function (tabPanel, tab) 
				{					 	 
					 if (parentForm != undefined) 
						 {			
							
							 Ext.each(parentForm.eventHandlers,
								 function(event_handler_obj) 
								 {															
									 if (parentForm.liveSetupFlag & parentForm.liveScreenFlag) 
									 {						
										
										 if (event_handler_obj["tasktype"] == "tabchange") 
										 {											
											 if (event_handler_obj["controlid"] == tab.itemId) 
											 {
												parentForm.queryById("methodName").setValue(event_handler_obj["methodName"]);
												process_ebpack_service(parentForm,event_handler_obj["input"],event_handler_obj["service"]);												
											 }
										 }
									 }
								 })
						 }			 
				}
				}
                 //if(inObj.title != undefined) outObj.title=inObj.title
                 //if(inObj.height != undefined) outObj.height=inObj.height
             return outObj;
         },
		 addBorderSection: function(inObj) {
             outObj = Ext.create("Ext.panel.Panel", {
                 layout: "border"
             })             
             
			 outObj.minimizable = true;
			 outObj.maximizable = true;
			 outObj.closeAction = 'hide';
			 var tmpWidth=plf.screenWidth-60;
			 var tmpHeight=plf.screenHeight-79;
			 if (inObj.width != undefined) tmpWidth = inObj.width
			 if (inObj.height != undefined) tmpHeight = inObj.height
			 
			 outObj.width=tmpWidth
			 outObj.height=tmpHeight
			 outObj.height=plf.screenHeight-79
			 if (inObj.hidden != undefined) outObj.hidden = inObj.hidden
             if (inObj.id != undefined) outObj.itemId = "cnt_" + inObj.id
			if (inObj.cls != undefined) {
                 outObj.cls = inObj.cls
                 outObj.bodyCls = inObj.cls
             }			 
             return outObj;
         },
		 addBorderColumnSection: function(inObj) 
		 {
             outObj = Ext.create("Ext.panel.Panel", {                
             border:false
             })
			 if (inObj.title != undefined) outObj.title = inObj.title
             if (inObj.height != undefined) outObj.height = inObj.height
			 if (inObj.width != undefined) outObj.width = inObj.width		
			/*  outObj.height=plf.screenHeight-79
			outObj.width=plf.screenWidth-79*/
			 	 
             //if (inObj.id != undefined) outObj.itemId = "cnt_" + inObj.id
			 if (inObj.id != undefined) outObj.id = "cnt_" + inObj.id
			 if (inObj.region != undefined) outObj.region = inObj.region;
			 if (inObj.collapsible != undefined) outObj.collapsible = inObj.collapsible;
			 if (inObj.collapsed != undefined) outObj.collapsed = inObj.collapsed;
			 /*
			 if (inObj.keySection) outObj.cls = "c-mainpage-keySection";
             else
                 outObj.cls = "c-mainpage-section";
			  */if (inObj.cls != undefined) {
                 outObj.cls = inObj.cls
                 outObj.bodyCls = inObj.cls
             }
			 
			 if (inObj.listeners != undefined) outObj.listeners = inObj.listeners             
             return outObj;
         },
         /*
         Collapse - Column Section
         Usage: This layout will be used in "Search" section creation.
         Defaults: Section Collapsed.
         */
         addCollapseSection: function(inObj, parentForm) {
             outObj = Ext.create("Ext.panel.Panel", {
                 layout: "column",
                 //padding:plf.padding,
                 //margin:plf.margin,
                 border: false,
                 collapsible: true,
                 animCollapse: false,
                 animateShadow: false,
                 titleCollapse: true,
                 collapseFirst: false,
                 //frame:true,
                 //defaults:{padding:plf.padding,margin:plf.margin},
                 cls: "c-mainpage-section",
                 listeners: {
                     afterrender: function(comp) {
                         if (comp.getEl().dom.getElementsByClassName("x-tool-img x-tool-expand-bottom")[0] != undefined) {
                             var tmpExpand = comp.getEl().dom.getElementsByClassName("x-tool-img x-tool-expand-bottom")[0].id;
                             document.getElementById(tmpExpand).title = "Click here to expand section."
                         }
                         if (comp.getEl().dom.getElementsByClassName("x-tool-img x-tool-collapse-top")[0] != undefined) {
                             var tmpCollapse = comp.getEl().dom.getElementsByClassName("x-tool-img x-tool-collapse-top")[0].id;
                             document.getElementById(tmpCollapse).title = "Click here to collapse section."
                         }
                     },
                     "collapse": function(comp) {
                         var tmpExpand = comp.getEl().dom.getElementsByClassName("x-tool-img x-tool-expand-bottom")[0].id;
                         document.getElementById(tmpExpand).title = "Click here to expand section."
                     },
                     "expand": function(comp) {
                         var tmpCollapse = comp.getEl().dom.getElementsByClassName("x-tool-img x-tool-collapse-top")[0].id;
                         document.getElementById(tmpCollapse).title = "Click here to collapse section.";
                     }
                 }
                 /*listeners: {
                 	afterrender: function (comp) 
                 	{
                 		var element = comp.getEl();
                 		//comp.collapse(true);
                 		//alert(parentForm.queryById("searchBtn"));
                 		if (parentForm !=undefined)
                 		{
                 		parentForm.queryById("searchBtn").setHidden(true);
                 		element.on('click', function() 
                 		{
                 			if (parentForm.queryById("searchBtn").hidden)
                 				parentForm.queryById("searchBtn").setHidden(false);
                 			else
                 				parentForm.queryById("searchBtn").setHidden(true);
                 		});
                 		}
                 	}
                 },*/

                 //bodyCls:"c-mainpage-section"
             })
             if (inObj.btnID != undefined) {
                 outObj.tools = [{
                     type: 'search',
                     html: 'Search',
                     tooltip: 'Click here to search.',
                     width: 57,
                     height: 25,
                     //hidden:true,
                     itemId: inObj.btnID,
                     listeners: {
                         afterrender: function() {
                             //callback: function() {
                             //alert(parentForm.eventHandlers);
                             if (parentForm != undefined) {
                                 Ext.each(parentForm.eventHandlers,
                                     function(event_handler_obj) {
                                         if (parentForm.liveSetupFlag & parentForm.liveScreenFlag) {
                                             if (event_handler_obj["tasktype"] == "btnclick") {
                                                 if (event_handler_obj["controlid"] == inObj.btnID) {
                                                     parentForm.queryById(event_handler_obj["controlid"]).on("click",
                                                         function(controlobj, eventobj) {
                                                             parentForm.queryById("methodName").setValue(event_handler_obj["methodName"]);
                                                             button_click(parentForm, controlobj, eventobj, event_handler_obj["controlid"], event_handler_obj["input"], event_handler_obj["service"]);
                                                         }, parentForm);
                                                 }
                                             }
                                         }
                                     })
                             }
                         }
                     }
                 }]
             }
             if (inObj.id != undefined) outObj.itemId = inObj.id
             if (inObj.collapsed != undefined) outObj.collapsed = inObj.collapsed
             if (inObj.title != undefined) outObj.title = inObj.title
             if (inObj.height != undefined) outObj.height = inObj.height
			 if (inObj.hidden != undefined) outObj.hidden = inObj.hidden
             plf.controlCounter = 0
             return outObj;
         },

         /*
         Collapse - Field Set Section
         Usage : This will be used to group header fields
         Default: Expanded section.
         */

         addFieldSet: function(inObj) {
             outObj = Ext.create("Ext.form.FieldSet", {
                 collapsible: false,
                 layout: "column",
                 padding: plf.padding,
                 margin: plf.margin,
                 defaults: {
                     padding: plf.padding,
                     margin: plf.margin
                 },
                 //cls:"c-mainpage-section",
                 //bodyCls:"c-mainpage-section",
                 border: false
             });
             if (inObj.title != undefined) outObj.setTitle(inObj.title);
             if (inObj.height != undefined) outObj.height = inObj.height
             if (inObj.border != undefined) outObj.border = true
             plf.controlCounter = 0
             outObj.columnWidth = plf.getColumnwidth()
             outObj.cls = plf.getContainerCls()
                 /*else
                 	outObj.columnWidth=1;*/
             return outObj

         },

         /*
         Field Container - To  hold two  or more controls (Textbox,Combo etc) with single label.
         Usage : To create Length, Volume etc with "UOM" as combo.
         */
         addFieldContainer: function(inObj) {
             outObj = {
                 xtype: "fieldcontainer",
                 layout: 'hbox'
             }
             if (inObj.label != undefined) outObj.fieldLabel = inObj.label
             outObj.labelWidth = plf.labelWidth
             if (inObj.controls != undefined) outObj.items = inObj.controls
             if (inObj.gridFlag == undefined) {
                 outObj.labelCls = "c-fieldlabel";
                 outObj.fieldCls = "c-fieldctrl";
             }
             //outObj.columnWidth=plf.getColumnwidth()
             //outObj.cls=plf.getContainerCls()	
             outObj.labelSeparator = "";
             return outObj;
             //return {xtype:'container',columnWidth:1/plf.columns,items:outObj};
         },

         /*
         Splitter Control.
         Usage : To create split section in Panel, toolbars etc.
         */
         addSplitter: function(inObj) {
             return {
                 xtype: 'splitter'
             }
         },
         addSpicer: function(inObj) {
             outObj = Ext.create("Ext.Img", {})
             if (inObj.src != undefined) outObj.src = inObj.src;
             if (inObj.width != undefined) outObj.width = inObj.width;
             return outObj
         },
         /*
         Textbox with Container control.
         Usage : Used in Header / Search sections.
         Validation: Mandatory Check.
         */
         addPlainText: function(inObj) {

             if (inObj.inputFormat != undefined) 
			 {

                 if (inObj.inputFormat == "numeric") {
                     var precision = 2;
                     if (inObj.weightPrecision != undefined) {
                         precision = inObj.weightPrecision;
                     }
                     if (inObj.volumePrecision != undefined) {
                         precision = inObj.volumePrecision;
                     }
                     if (inObj.qtyPrecision != undefined) {
                         precision = inObj.qtyPrecision;
                     }
                     if (inObj.InputPrecision != undefined)
                         precision = inObj.InputPrecision;

                     outObj = {
                         xtype: "textfield",
                         alwaysDisplayDecimals: true,
                         hideTrigger: true,
                         minValue: 0,
                         allowDecimals: true,
                         //decimalPrecision: inObj.InputPrecision,
                         forcePrecision: true,
                         maskRe: /[0-9.]/,
                         listeners: {
                             blur: function(field) {
                                 var value = field.getValue();								 
                                 if (value != '' && value != 0 && value != '.') 
								 {
                                     value = parseFloat(value).toFixed(precision);
                                     field.setValue(value);
                                 } 
								 else if (value == '.') 
								 {									
									 value = parseFloat(0).toFixed(precision);
                                     field.setValue(value);
								 }
								 else 
								 {
                                     field.setValue('');
                                 }
                             }/*,
							 paste: {
								element: 'inputEl',
									fn: function(event, inputEl) {
									if(event.type == "paste"){
									event.preventDefault();
									return false;
									}
									}
								}*/
                         }
                     }
                 }
                 if (inObj.inputFormat == "integer") {
                     outObj = {
                         xtype: "textfield",
                         maskRe: /[0-9]/,
						 listeners: {
                             blur: function(field) {
                                 var value = field.getValue();
                                 value = value.trim();
                                 field.setValue(value);
                             }/*,
							 paste: {
								element: 'inputEl',
									fn: function(event, inputEl) {
									if(event.type == "paste"){
									event.preventDefault();
									return false;
									}
									}
								}*/
                         }
                     }

                 }
                 if (inObj.inputFormat == "string") {
                     //outObj={xtype:"textfield",maskRe: /[a-zA-Z0-9]/}
                     outObj = {
                         xtype: "textfield",
                         listeners: {
                             blur: function(field) {
                                 var value = field.getValue();
                                 value = value.trim();
                                 field.setValue(value);
                             }/*,
							 paste: {
								element: 'inputEl',
									fn: function(event, inputEl) {
									if(event.type == "paste"){
									event.preventDefault();
									return false;
									}
									}
								}*/
                         }
                     }
                 }
				 if (inObj.inputFormat == "time") 
				 {					
                     //outObj={xtype:"textfield",maskRe: /[a-zA-Z0-9]/}
                     outObj = {
                         xtype: "textfield",
						 regex: /^(([0-1][0-9])|(2[0-3])):[0-5][0-9]$/,
						 blankText: 'Please enter valid time.',
                         listeners: {
                             blur: function(field) {
                                 var value = field.getValue();
                                 value = value.trim();
                                 field.setValue(value);
                             }
                         }
                     }
                 }
				 if (inObj.inputFormat == "Password") 
				 {					
                     //outObj={xtype:"textfield",maskRe: /[a-zA-Z0-9]/}
                     outObj = {
                         xtype: "textfield",
						 enableKeyEvents:true
                     }
					 if (inObj.listeners != undefined) outObj.listeners = inObj.listeners					 
                 }
				 //^(([0-1][0-9])|(2[0-3])):[0-5][0-9]$/
                 if (inObj.inputFormat == "email") {
                     outObj = {
                         xtype: "textfield",
                         allowBlank: true,
                         regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?;\s*?)*)*$/,
                         regexText: 'This field must contain single or multiple valid email addresses separated by semicolon (;)',
                         //blankText: 'Please enter email address(s)'
                     }
					 if (inObj.mandatory != undefined) 
					 {
					 outObj.blankText='Please enter email address(s)'
					 }
                 }
                 /*
                 if (inObj.inputFormat =="phone")
                 {
                 outObj={xtype:"textfield",maskRe: /[0-9-]/,regex:/^[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{4}[\(\)\.\- ]{0,}$/,
                 regexText:'The phone number format is wrong, ie: 123-456-7890',
                 blankText : 'Please enter phone number'}				
                 }
                 */
                 //if(inObj.weightPrecision != undefined)inObj.InputLength=inObj.InputLength+inObj.weightPrecision+1;
                 if (inObj.InputLength != undefined) outObj.maxLength = inObj.InputLength;
                 if (inObj.InputLength != undefined) outObj.enforceMaxLength = inObj.InputLength;
                 //outObj.maxLength=inObj.InputLength;
                 //outObj.enforceMaxLength=inObj.InputLength;
             } else {
                 outObj = {
                     xtype: "textfield",
                     listeners: {
                         blur: function(field) {
                             var value = field.getValue();
                             value = value.trim();
                             field.setValue(value);
                         }/*,
							 paste: {
								element: 'inputEl',
									fn: function(event, inputEl) {
									if(event.type == "paste"){
									event.preventDefault();
									return false;
									}
									}
								}*/
                     }
                 }
             }

             if (inObj.gridFlag == undefined) {
                 //outObj.labelCls="c-fieldlabel";
                 outObj.fieldCls = "c-fieldctrl";
             }

             //if(inObj.label != undefined) outObj.fieldLabel=inObj.label
             if (inObj.id != undefined) outObj.itemId = inObj.id
             if (inObj.inputType != undefined) outObj.inputType = inObj.inputType
                 /*
                 if(inObj.mandatory != undefined)
                 {
                 	outObj.allowBlank=false				
                 	if(inObj.label != undefined) outObj.fieldLabel="<span class='mandatory_field'>*</span>"+inObj.label
                 	outObj.blankText=inObj.label + " cannot be blank."
                 	if(inObj.gridFlag == undefined)
                 	{
                 		//outObj.labelCls="mandatory_field"
                 	}
                 }
                 */
             if (inObj.gridFlag == undefined) {
                 outObj.inputWrapCls = "x-form-text-wrap c-fieldctrlwrap";
             }
             /*
             if(inObj.anywhereSearch)
             {
             outObj.labelCls="any_where_search";
             }
             */
             //outObj.columnWidth=1/plf.columns
             //outObj.labelWidth=plf.labelWidth
             //outObj.minWidth=300
             //outObj.labelSeparator ="";
			 
			 /*
             if (inObj.labelWidth == undefined)
                 outObj.columnWidth = 1
             else
                 outObj.columnWidth = .15
			*/			
			if (inObj.labelWidth == 480)
                 outObj.columnWidth = .15
             else
                 outObj.columnWidth = 1
				 
			//outObj.columnWidth = 1
             if (inObj.mandatory != undefined) {
                 outObj.allowBlank = false
                 outObj.blankText = inObj.label + " cannot be blank."
             }
             return outObj;
             //return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:outObj};
         },
	  addRegexTime: function(inObj) {
             outObj = {
                 xtype: "container",
                 layout: "column",
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 itemId: "cnt_" + inObj.id,
                 items: [
                     //plf.addLabel({text:inObj.label,width:plf.labelWidth})
                     //{xtype:"label",cls:tmpcls,labelSeparator:"",text:inObj.label,width:plf.labelWidth},
                     //{xtype:"textfield",id:inObj.id,fieldCls:"c-fieldctrl",inputWrapCls:"x-form-text-wrap c-fieldctrlwrap",cls:"c-fieldctrl",columnWidth:1}										
                     plf.addFieldLabel(inObj),
                     plf.addPlainRegexTime(inObj)
                     //{xtype:"textfield",id:inObj.id,fieldCls:"c-fieldctrl",inputWrapCls:"x-form-text-wrap c-fieldctrlwrap",cls:"c-fieldctrl",columnWidth:1}										
                 ]
             }
             return outObj;
             //return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:plf.addPlainText(inObj)};
         },
	   addPlainRegexTime: function(inObj) 
		 {
                outObj = {
                     xtype: "textfield",
					 //regex:/^([0-9][0-9]):([0-9][0-9])$/i,
					 maskRe: /[\d:]/i,
					 regex: /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/,
					 regexText:'The time format is wrong, ie: anything from 00:00 to 23:59',
                     listeners: {
                         blur: function(field) {
                             var value = field.getValue();
                             value = value.trim();
                             field.setValue(value);
                         }
                     }
                 }
             

             if (inObj.gridFlag == undefined) 
			 {
                 outObj.fieldCls = "c-fieldctrl";
             }

            
             if (inObj.id != undefined) outObj.itemId = inObj.id
             if (inObj.inputType != undefined) outObj.inputType = inObj.inputType
               
             if (inObj.gridFlag == undefined) {
                 outObj.inputWrapCls = "x-form-text-wrap c-fieldctrlwrap";
             }
            		
			if (inObj.labelWidth == 480)
                 outObj.columnWidth = .15
            else
                 outObj.columnWidth = 1			 
			
             if (inObj.mandatory != undefined) {
                 outObj.allowBlank = false
                 outObj.blankText = inObj.label + " cannot be blank."
             }
             return outObj;
             
         },
	  addRegexDateTime: function(inObj) 
		{
					 outObj = [
						 plf.addFieldLabel(inObj), {
							 xtype: "container",
							 layout: "column",
							 columnWidth: 1,					 
							 items: [
								 plf.addCustomDate(inObj),
								 plf.addRegexCustomTime(inObj),
							 ]
						 }
					 ]

					 return {
						 xtype: 'container',
						 layout: "column",
						 itemId: "cnt_" + inObj.dateid,
						 columnWidth: plf.getColumnwidth(),
						 cls: plf.getContainerCls(),
						 items: outObj
					 };
		},
		addRegexCustomTime: function(inObj) 
		{             
			 outObj = {
			 xtype: "textfield",	 
			 maskRe: /[\d:]/i,
			 regex: /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/,
			 regexText:'The time format is wrong, ie: anything from 00:00 to 23:59',
			 listeners: 
			 {
				 blur: function(field) {
					 var value = field.getValue();
					 value = value.trim();
					 field.setValue(value);
				 }
			 },
			 columnWidth: .4,
			 fieldCls: "c-fieldctrl",
			 inputWrapCls: "x-form-text-wrap c-fieldctrlwrap",
			 triggerBaseCls: "c-triggerbtn"
			}

			if (inObj.timeid != undefined) outObj.itemId = inObj.timeid
			if (inObj.mandatory != undefined) {
			 outObj.allowBlank = false
			 outObj.blankText = inObj.label + " cannot be blank."
			}
			return outObj;
		},
         addText: function(inObj) {
             outObj = {
                 xtype: "container",
                 layout: "column",
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 itemId: "cnt_" + inObj.id,
                 items: [
                     //plf.addLabel({text:inObj.label,width:plf.labelWidth})
                     //{xtype:"label",cls:tmpcls,labelSeparator:"",text:inObj.label,width:plf.labelWidth},
                     //{xtype:"textfield",id:inObj.id,fieldCls:"c-fieldctrl",inputWrapCls:"x-form-text-wrap c-fieldctrlwrap",cls:"c-fieldctrl",columnWidth:1}										
                     plf.addFieldLabel(inObj),
                     plf.addPlainText(inObj)
                     //{xtype:"textfield",id:inObj.id,fieldCls:"c-fieldctrl",inputWrapCls:"x-form-text-wrap c-fieldctrlwrap",cls:"c-fieldctrl",columnWidth:1}										
                 ]
             }
             return outObj;
             //return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:plf.addPlainText(inObj)};
         },
         addFieldLabel: function(inObj) {
             outObj = {
                 xtype: "label",
                 cls: "c-fieldlabel",
                 labelSeparator: ""
             }
             if (inObj.anywhereSearch) {
                 outObj.cls = "any_where_search";
             }
             if (inObj.label != undefined) outObj.html = inObj.label
             if (inObj.labelWidth == undefined)
                 outObj.width = plf.labelWidth
             else
                 outObj.width = inObj.labelWidth
             if (inObj.id != undefined) outObj.itemId = "lbl_" + inObj.id
             if (inObj.hidden != undefined) outObj.hidden = inObj.hidden
             if (inObj.mandatory != undefined) {
                 outObj.allowBlank = false
                 if (inObj.label != undefined) outObj.html = "<span class='mandatory_field'>*</span>" + inObj.label
                     //outObj.blankText=inObj.label + " cannot be blank."			
             }
			 if (inObj.conditionalmandatory != undefined) 
			 {
                 outObj.allowBlank = false
                 if (inObj.label != undefined) outObj.html = "<span class='mandatory_field'>**</span>" + inObj.label
                     //outObj.blankText=inObj.label + " cannot be blank."			
             }
             return outObj;
         },
         addLabel: function(inObj) {
             outObj = {
                 xtype: "label",
                 cls: "c-fielddisplabel",
                 labelSeparator: ""
             }
             if (inObj.anywhereSearch) {
                 outObj.cls = "any_where_search";
             }
             if (inObj.text != undefined) outObj.text = inObj.text

             if (inObj.id != undefined) outObj.itemId = inObj.id
             tmpStyle = {}

             if (inObj.fontsize != undefined) tmpStyle["font-size"] = inObj.fontsize
             if (inObj.fontcolor != undefined) tmpStyle["color"] = inObj.fontcolor
             if (inObj.bgColor != undefined) tmpStyle["background"] = inObj.bgColor
             outObj.style = tmpStyle;
             outObj.labelSeparator = "";
             outObj.columnWidth = 1;
             return outObj

         },
         addDisplayLabel: function(inObj) {
             outObj = {
                 xtype: "container",
                 layout: "column",
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 itemId: "cnt_" + inObj.id,
                 items: [
                     plf.addFieldLabel(inObj),
                     plf.addLabel(inObj)
                 ]
             }
             return outObj;
         },		 
         addTextArea: function(inObj) {
             outObj = {
                 xtype: "container",
                 layout: "column",
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 itemId: "cnt_" + inObj.id,
                 items: [
                     //plf.addLabel({text:inObj.label,width:plf.labelWidth})
                     //{xtype:"label",cls:tmpcls,labelSeparator:"",text:inObj.label,width:plf.labelWidth},
                     //{xtype:"textfield",id:inObj.id,fieldCls:"c-fieldctrl",inputWrapCls:"x-form-text-wrap c-fieldctrlwrap",cls:"c-fieldctrl",columnWidth:1}										
                     plf.addFieldLabel(inObj),
                     plf.addPlainTextArea(inObj)
                     //{xtype:"textfield",id:inObj.id,fieldCls:"c-fieldctrl",inputWrapCls:"x-form-text-wrap c-fieldctrlwrap",cls:"c-fieldctrl",columnWidth:1}										
                 ]
             }
             return outObj;
             //return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:plf.addPlainText(inObj)};
         },	
		addDisplayTextArea: function(inObj) {
             outObj = {
                 xtype: "container",
                 layout: "column",
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 itemId: "cnt_" + inObj.id,
                 items: [
                     //plf.addLabel({text:inObj.label,width:plf.labelWidth})
                     //{xtype:"label",cls:tmpcls,labelSeparator:"",text:inObj.label,width:plf.labelWidth},
                     //{xtype:"textfield",id:inObj.id,fieldCls:"c-fieldctrl",inputWrapCls:"x-form-text-wrap c-fieldctrlwrap",cls:"c-fieldctrl",columnWidth:1}										
                     plf.addFieldLabel(inObj),
                     plf.addDisplayPlainTextArea(inObj)
                     //{xtype:"textfield",id:inObj.id,fieldCls:"c-fieldctrl",inputWrapCls:"x-form-text-wrap c-fieldctrlwrap",cls:"c-fieldctrl",columnWidth:1}										
                 ]
             }
             return outObj;
             //return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:plf.addPlainText(inObj)};
         },	
		 	
         addDisplayPlainTextArea: function(inObj) {            
			 
             outObj = {
                 xtype: "textareafield",                 
				 fieldCls: "textareadisplyonlyctrl",
				 readOnly: true
             }             
             //outObj.fieldCls = "c-fieldctrl";
             //outObj.inputWrapCls = "x-form-text-wrap c-fieldctrlwrap";
			 //if (inObj.maxLength != undefined) outObj.maxLength = inObj.maxLength
			 if (inObj.id != undefined) outObj.itemId = inObj.id
             if (inObj.inputType != undefined) outObj.inputType = inObj.inputType

             //outObj.columnWidth=1/plf.columns
            if (inObj.labelWidth == undefined)
                 outObj.columnWidth = 1
             else
                 outObj.columnWidth = .15
             //outObj.minWidth = tmpWidth
            // outObj.minHeight = tmpHeight             
             return outObj;             
         },
         addPlainTextArea: function(inObj) {
             var tmpHeight = 450;
             var tmpWidth = 1250;
             if (inObj.height != undefined) tmpHeight = inObj.height;
             if (inObj.width != undefined) tmpWidth = inObj.width;
			 
             outObj = {
                 xtype: "textareafield",
                 grow: true
             }             
             //outObj.fieldCls = "c-fieldctrl";
             //outObj.inputWrapCls = "x-form-text-wrap c-fieldctrlwrap";
			 //if (inObj.maxLength != undefined) outObj.maxLength = inObj.maxLength
			 if (inObj.id != undefined) outObj.itemId = inObj.id
             if (inObj.inputType != undefined) outObj.inputType = inObj.inputType

             //outObj.columnWidth=1/plf.columns
            if (inObj.labelWidth == undefined)
                 outObj.columnWidth = 1
             else
                 outObj.columnWidth = .15
             //outObj.minWidth = tmpWidth
            // outObj.minHeight = tmpHeight             
             return outObj;             
         },
         /*
         Textbox with Container control.
         Usage : Used in Header / Search sections.
         Validation: Mandatory Check.
         */
         addPlainHlpText: function(inObj, parentForm) {
             outObj = {
                 xtype: "textfield", //labelCls:"c-fieldlabel",fieldCls:"c-fieldctrl",

                 triggers: {
                     "hlptrigger": {
                         baseCls: "helpIcon",
                         handler: function() {
                             parentForm.launchHlpLink(inObj.hlpLinkID, inObj.grideventid)
                         }
                     }
                 },
                 listeners: {
                     blur: function(field) {
                         var value = field.getValue();
                         value = value.trim();
                         field.setValue(value);
                     }
                 }

             }

             if (inObj.gridFlag == undefined) {
                 //outObj.labelCls="c-fieldlabel";
                 outObj.fieldCls = "c-fieldctrl";
             }
             //if(inObj.label != undefined) outObj.fieldLabel=inObj.label
             if (inObj.id != undefined) outObj.itemId = inObj.id
             if (inObj.inputType != undefined) outObj.inputType = inObj.inputType
             if (inObj.value != undefined) outObj.value = inObj.value
             if (inObj.hidden != undefined) outObj.hidden = inObj.hidden
                 //outObj.maskRe= /[a-zA-Z0-9]/;
             if (inObj.InputLength != undefined) outObj.maxLength = inObj.InputLength;
             if (inObj.InputLength != undefined) outObj.enforceMaxLength = inObj.InputLength;
             /*if(inObj.mandatory != undefined)
             {
             	outObj.allowBlank=false
             	if(inObj.label != undefined) outObj.fieldLabel="<span class='mandatory_field'>*</span>"+inObj.label				
             	outObj.blankText=inObj.label + " cannot be blank."
             	
             	if(inObj.gridFlag == undefined)
             	{
             		//outObj.labelCls="mandatory_field"			
             	}				
             }
             */
             if (inObj.gridFlag == undefined) {
                 outObj.inputWrapCls = "x-form-text-wrap c-fieldctrlwrap";
             }
             //outObj.columnWidth=1/plf.columns
             //outObj.labelWidth=plf.labelWidth
             //outObj.labelSeparator ="";
             /*
             outObj.onTriggerClick= function() 
             	{									
             		parentForm.launchHlpLink(inObj.hlpLinkID,inObj.grideventid)
             	}
             */
             outObj.columnWidth = 1
                 //outObj.minWidth=300
             if (inObj.mandatory != undefined) {
                 outObj.allowBlank = false
                 outObj.blankText = inObj.label + " cannot be blank."
             }
             return outObj;
             //return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:outObj};
         },
         addHlpText: function(inObj, parentForm) {
             //return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:plf.addPlainHlpText(inObj,parentForm)};
             outObj = {
                 xtype: "container",
                 itemId: "cnt_" + inObj.id,
                 layout: "column",
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 items: [
                     //plf.addLabel({text:inObj.label,width:plf.labelWidth})
                     //{xtype:"label",cls:tmpcls,labelSeparator:"",text:inObj.label,width:plf.labelWidth},
                     //{xtype:"textfield",id:inObj.id,fieldCls:"c-fieldctrl",inputWrapCls:"x-form-text-wrap c-fieldctrlwrap",cls:"c-fieldctrl",columnWidth:1}										
                     plf.addFieldLabel(inObj),
                     plf.addPlainHlpText(inObj, parentForm)
                     //{xtype:"textfield",id:inObj.id,fieldCls:"c-fieldctrl",inputWrapCls:"x-form-text-wrap c-fieldctrlwrap",cls:"c-fieldctrl",columnWidth:1}										
                 ]
             }
             return outObj;
         },

         /*
         Textbox control.
         Usage : Used in grid sections as editors.
         */
         /*		
         addPlainText:function(inObj)
         {
         	if(inObj.inputFormat != undefined)
         	{
         		if(inObj.inputFormat=="number")
         		{
         			outObj={xtype:"numberfield",hideTrigger: true}
         		}
         	}
         	else
         	{
         		outObj={xtype:"textfield"}
         	}
         	
         	if(inObj.label != undefined) outObj.fieldLabel=inObj.label
         	if(inObj.id != undefined) outObj.itemId=inObj.id
         	if(inObj.inputType != undefined) outObj.inputType=inObj.inputType
         	if(inObj.flex != undefined) outObj.flex=inObj.flex
         	if(inObj.width != undefined) outObj.maxWidth=inObj.width
         	outObj.columnWidth=plf.getColumnwidth()
         	//outObj.minWidth=300
         	outObj.labelWidth=plf.labelWidth
         	return outObj;
         	//return {xtype:'container',columnWidth:1/plf.columns,items:outObj};
         },	
         */

         addQrcode: function(inObj) {

             outObj = {
                 xtype: "qrpanel",
                 textToEncode: "",
                 qrRenderMethod: "gif",
                 qrBlocksize: 6
             };
             if (inObj.id != undefined) outObj.itemId = inObj.id
             outObj.cls = "qrpanel_1";
             return outObj;
             //return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:outObj};
         },
         addImage: function(inObj) {
             //outObj={xtype:"image"}
             outObj = Ext.create("Ext.Img", {
                 scrollable: true
             })
             if (inObj.id != undefined) outObj.itemId = inObj.id
                 //if(inObj.id != undefined) outObj.id=inObj.id
             if (inObj.title != undefined) outObj.html = inObj.title
             if (inObj.src != undefined) outObj.src = inObj.src
             if (inObj.srinkWrap != undefined) outObj.srinkWrap = inObj.srinkWrap;
             else outObj.srinkWrap = 3;
             outObj.labelSeparator = "";
             return outObj
         },

         /*
         Combo with Container control.
         Usage : Used in Header / Search sections.
         Notes : <combo id>_store - "Store" will be created and attached automatically to the combo.
         */
         addCombo: function(inObj) {

             outObj = {
                 xtype: "container",
                 itemId: "cnt_" + inObj.id,
                 layout: "column",
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 items: [
                     plf.addFieldLabel(inObj),
                     plf.addPlainCombo(inObj)
                 ]
             }
             return outObj;
         },

         /*
         Combo control.
         Usage : Used in grid sections.
         Notes : <combo id>_store - "Store" will be created and attached automatically to the combo.
         */
         addPlainCombo: function(inObj) {
             outObj = {
                     xtype: "combo",
                     fieldCls: "c-fieldctrl",
                     triggerCls: "c-triggerbtn",
                     editable: true,
                     store: Ext.create('Ext.data.Store', {
                         storeId: inObj.id + '_cbostore',
                         model: 'combo_model'
                     }),
                     queryMode: "local",
                     queryDelay: 5,
                     queryCaching: false,
					 value:"",
					 //forceSelection :true,
                     displayField: "value",
                     matchFieldWidth: false,
                     valueField: "id",
					 listeners: {
						beforequery: function(record) {
							 record.query = new RegExp(record.query, 'i');
							 record.forceAll = true;
							 return true;
							 }
					}
                 }
                 //if(inObj.label != undefined) outObj.fieldLabel=inObj.label
             if (inObj.id != undefined) outObj.itemId = inObj.id
             if (inObj.hidden != undefined) outObj.hidden = inObj.hidden
             if (inObj.flex != undefined) outObj.flex = inObj.flex
                 //if(inObj.width != undefined) outObj.maxWidth=inObj.width
             outObj.inputWrapCls = "x-form-text-wrap c-fieldctrlwrap";
             if (inObj.listeners != undefined) outObj.listeners = inObj.listeners
                 /*if(inObj.columnWidth != undefined)
                 	outObj.columnWidth=inObj.columnWidth;
                 else
                 	outObj.columnWidth=plf.getColumnwidth();
                 */
                 //outObj.labelWidth=plf.labelWidth
                 //outObj.minWidth=300
                 //outObj.labelSeparator ="";
                 /*if(inObj.mandatory != undefined)
                 {
                 	outObj.allowBlank=false
                 	if(inObj.label != undefined) outObj.fieldLabel="<span class='mandatory_field'>*</span>"+inObj.label							
                 	outObj.blankText=inObj.label + " cannot be blank."
                 	//outObj.labelCls="mandatory_field"
                 }*/
             if (inObj.labelWidth == undefined)
                 outObj.columnWidth = 1
             else
                 outObj.columnWidth = .15
             if (inObj.mandatory != undefined) {
                 outObj.allowBlank = false
                 outObj.blankText = inObj.label + " cannot be blank."
             }
             return outObj;
         },
		 addComboWithoutStore: function(inObj) {

             outObj = {
                 xtype: "container",
                 itemId: "cnt_" + inObj.id,
                 layout: "column",
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 items: [
                     plf.addFieldLabel(inObj),
                     plf.addPlainComboWithoutStore(inObj)
                 ]
             }
             return outObj;
         },
		  /*
         Combo control.
         Usage : Used in grid sections.
         Notes : <combo id>_store - "Store" will be created and attached automatically to the combo.
         */
         addPlainComboWithoutStore: function(inObj) {
             outObj = {
                     xtype: "combo",
                     fieldCls: "c-fieldctrl",
                     triggerCls: "c-triggerbtn",
                     editable: true,
                     store: Ext.data.StoreManager.lookup(inObj.storeId+'_cbostore'),
                     queryMode: "local",
                     queryDelay: 5,
                     queryCaching: false,
					 value:"",
					 //forceSelection :true,
                     displayField: "value",
                     matchFieldWidth: false,
                     valueField: "id",
					 listeners: {
						beforequery: function(record) {
							 record.query = new RegExp(record.query, 'i');
							 record.forceAll = true;
							 return true;
							 }
				     }
                 }
                 //if(inObj.label != undefined) outObj.fieldLabel=inObj.label
             if (inObj.id != undefined) outObj.itemId = inObj.id
             if (inObj.hidden != undefined) outObj.hidden = inObj.hidden
             if (inObj.flex != undefined) outObj.flex = inObj.flex
                 //if(inObj.width != undefined) outObj.maxWidth=inObj.width
             outObj.inputWrapCls = "x-form-text-wrap c-fieldctrlwrap";
             if (inObj.listeners != undefined) outObj.listeners = inObj.listeners
                
			 if (inObj.labelWidth != undefined)
			 {
				if (inObj.columnWidth == undefined) 
				{
                 outObj.columnWidth = .15
				 }
				else
				{
				outObj.columnWidth = inObj.columnWidth
				}
			 }
             else
                 outObj.columnWidth = 1
				 
             
             if (inObj.mandatory != undefined) {
                 outObj.allowBlank = false
                 outObj.blankText = inObj.label + " cannot be blank."
             }
             return outObj;
         },
         addPlainListCombo: function(inObj) {
             outObj = {
                 xtype: "combo",
                 editable: false,
                 store: Ext.create('Ext.data.Store', {
                     storeId: inObj.id + '_cbostore',
                     model: inObj.model
                 }),
                 tpl: inObj.tbl,
                 queryMode: "local",
                 queryDelay: 5,
                 //queryCaching : false,
                 //matchFieldWidth:false,
                 displayField: "value",
                 valueField: "id"
             }
             if (inObj.label != undefined) outObj.fieldLabel = inObj.label
             if (inObj.id != undefined) outObj.itemId = inObj.id
             if (inObj.flex != undefined) outObj.flex = inObj.flex
             if (inObj.width != undefined) outObj.maxWidth = inObj.width
             if (inObj.columnWidth != undefined)
                 outObj.columnWidth = inObj.columnWidth;
             else
                 outObj.columnWidth = plf.getColumnwidth();
             outObj.labelSeparator = "";
             outObj.labelWidth = plf.labelWidth
                 //outObj.minWidth=300			
             return outObj;
         },
         /*
         List Edit with Container control.
         Usage : Used in Header / Search sections.
         Notes : <combo id>_store - "Store" will be created and attached automatically to the combo.
         */
         addListEdit: function(inObj, parentForm) {
             //return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:plf.addPlainDate(inObj)};
             outObj = {
                 xtype: "container",
                 layout: "column",
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 itemId: "cnt_" + inObj.id,
                 items: [
                     plf.addFieldLabel(inObj),
                     plf.addPlainListEdit(inObj, parentForm)
                 ]
             }
             return outObj;
         },
         addPlainListEdit: function(inObj, parentForm) {
             outObj = {
                 xtype: "combo",
                 fieldCls: "c-fieldctrl",
                 store: Ext.create('Ext.data.Store', {
                     storeId: inObj.id + '_cbostore',
                     model: 'combo_model'
                 }),
                 queryMode: "local",
                 tpl: Ext.create('Ext.XTemplate',
                     '<tpl for=".">',
                     '<div class="x-boundlist-item">',
                     '{value}({id})',
                     '</div>',
                     '</tpl>'
                 ),
                 queryDelay: 5,
                 queryCaching: false,
                 displayField: "value",
                 matchFieldWidth: false,
                 valueField: "id",
                 typeAhead: true,
                 hideTrigger: true,
                 listeners: {
                     "select": function(combo, records, eOpts) {
                         if (inObj.keyField != undefined)
                             parentForm.queryById(inObj.keyField).setValue(combo.getValue());
                     },

                     beforequery: function(record) {
                         record.query = new RegExp(record.query, 'i');
                         record.forceAll = true;
                         return true;
                     }
                 }
             }

             if (inObj.gridFlag == undefined) {
                 //outObj.labelCls="c-fieldlabel"
                 outObj.fieldCls = "c-fieldctrl",
                     outObj.inputWrapCls = "x-form-text-wrap c-fieldctrlwrap";
             }

             //if(inObj.label != undefined) outObj.fieldLabel=inObj.label
             if (inObj.id != undefined) outObj.itemId = inObj.id
             if (inObj.flex != undefined) outObj.flex = inObj.flex
			 if (inObj.listeners != undefined) outObj.listeners = inObj.listeners
                 //if(inObj.width != undefined) outObj.maxWidth=inObj.width
                 //outObj.inputWrapCls="x-form-text-wrap c-fieldctrlwrap";
                 /*if(inObj.columnWidth != undefined)
                 	outObj.columnWidth=inObj.columnWidth;
                 else
                 	outObj.columnWidth=plf.getColumnwidth();
                 */
             outObj.columnWidth = 1
             if (inObj.mandatory != undefined) {
                 outObj.allowBlank = false
                 outObj.blankText = inObj.label + " cannot be blank."
             }
             //outObj.labelWidth=plf.labelWidth
             //outObj.labelSeparator ="";
             return outObj;
         },
         /*
         Checkbox with Container control.
         Usage : Used in Header / Search sections.
         */
         addCheckBox: function(inObj) {
             outObj = {
                 xtype: "container",
                 layout: "column",
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 itemId: "cnt_" + inObj.id,
                 items: [
                     plf.addFieldLabel(inObj),
                     plf.addPlainCheckBox(inObj)
                 ]
             }
             return outObj;
         },
         addPlainCheckBox: function(inObj) {
             outObj = {
                     xtype: "checkbox"
                 }
                 //if(inObj.label != undefined) outObj.fieldLabel=inObj.label
                 //if(inObj.label != undefined) outObj.fieldLabel=inObj.label
             if (inObj.id != undefined) outObj.itemId = inObj.id
                 //outObj.columnWidth=1/plf.columns
                 //outObj.labelWidth=plf.labelWidth
             outObj.boxLabelAlign = 'before';
             //return outObj;	
             //outObj.labelSeparator ="";

             if (inObj.gridFlag == undefined) {
                 //outObj.labelCls="c-fieldlabel"
                 //outObj.fieldCls="c-fieldctrl"
                 //outObj.inputWrapCls="x-form-text-wrap c-fieldctrlwrap";	
             }
             if (inObj.mandatory != undefined) {
                 outObj.allowBlank = false
                 outObj.blankText = inObj.label + " cannot be blank."
             }
			 if (inObj.listeners != undefined) outObj.listeners = inObj.listeners;
			 if (inObj.disabled != undefined) outObj.disabled = inObj.disabled;
             return outObj;
         },
         /*
         Calender Control.
         Usage : Used in grid sections.
         Default: "d-m-y" date format will be used.
         */
         addPlainDate: function(inObj) {
             outObj = {
                 xtype: "datefield",
                 format: plf.renderDateFormat,
                 fieldCls: "c-fieldctrl",
                 maskRe: /[0-9-]/,
                 emptyText: 'DD-MM-YYYY',
                 enableKeyEvents: true,
                 listeners: {
                     'keydown': {
                         fn: function(field, date) {
                             field.onTriggerClick();
                         }
                     }
                 }
             }
             outObj.triggerBaseCls = "c-triggerbtn"
                 //if(inObj.label != undefined) outObj.fieldLabel=inObj.label
             if (inObj.id != undefined) outObj.itemId = inObj.id
                 //if(inObj.width != undefined) outObj.width=inObj.width
                 /*if(inObj.columnWidth != undefined)
                 	outObj.columnWidth=inObj.columnWidth;
                 else
                 	outObj.columnWidth=plf.getColumnwidth();
                 */
                 //outObj.labelWidth=plf.labelWidth
             outObj.inputWrapCls = "x-form-text-wrap c-fieldctrlwrap";
             //outObj.labelSeparator ="";
             /*Code added by Rajiv R for id:57336 starts here*/
             /*if(inObj.mandatory != undefined)
             			{
             				outObj.allowBlank=false
             				if(inObj.label != undefined) outObj.fieldLabel="<span class='mandatory_field'>*</span>"+inObj.label							
             				outObj.blankText=inObj.label + " cannot be blank."
             				//outObj.labelCls="mandatory_field"
             			}*/
             /*Code added by Rajiv R for id:57336 ends here*/
             outObj.columnWidth = 1
             if (inObj.mandatory != undefined) {
                 outObj.allowBlank = false
                 outObj.blankText = inObj.label + " cannot be blank."
             }
             return outObj;

         },

         /*
         Calender with Container control.
         Usage : Used in Header / Search sections.
         Default: "d-m-y" date format will be used.
         */
         addDate: function(inObj) {
             //return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:plf.addPlainDate(inObj)};
             //return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:plf.addPlainDate(inObj)};
             outObj = {
                 xtype: "container",
                 layout: "column",
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 itemId: "cnt_" + inObj.id,
                 items: [
                     plf.addFieldLabel(inObj),
                     plf.addPlainDate(inObj)
                 ]
             }
             return outObj;
         },

         /*
         Time with Container control.
         Usage : Used in Header / Search sections.
         */
         addTime: function(inObj) {
             /*
             outObj={xtype:"timefield",labelCls:"c-fieldlabel",fieldCls:"c-fieldctrl"}
             outObj.triggerCls="c-triggerbtn"
             outObj.hideTrigger=true
             if(inObj.label != undefined) outObj.fieldLabel=inObj.label
             if(inObj.id != undefined) outObj.itemId=inObj.id
             if(inObj.Increment != undefined) outObj.increment=inObj.Increment
             //outObj.columnWidth=1/plf.columns
             outObj.labelWidth=plf.labelWidth
             //return outObj;		
             outObj.inputWrapCls="x-form-text-wrap c-fieldctrlwrap";		
             outObj.labelSeparator ="";
             return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:outObj};
             */
             outObj = {
                 xtype: "container",
                 layout: "column",
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 itemId: "cnt_" + inObj.id,
                 items: [
                     plf.addFieldLabel(inObj),
                     plf.addPlainTime(inObj)
                 ]
             }
             return outObj;
         },
         addPlainTime: function(inObj) {
             var tmpData = [{
                 "id": "00:00",
                 "value": "00:00"
             },
			 {
                 "id": "00:05",
                 "value": "00:05"
             },
			 {
                 "id": "00:10",
                 "value": "00:10"
             },
			 {
                 "id": "00:15",
                 "value": "00:15"
             },
 {
                 "id": "00:20",
                 "value": "00:20"
             },
 {
                 "id": "00:25",
                 "value": "00:25"
             },			 {
                 "id": "00:30",
                 "value": "00:30"
             }, 
			  {
                 "id": "00:35",
                 "value": "00:35"
             },
			  {
                 "id": "00:40",
                 "value": "00:40"
             },
			  
			 {
                 "id": "00:45",
                 "value": "00:45"
             }, 
			 {
                 "id": "00:50",
                 "value": "00:50"
             },
			 {
                 "id": "00:55",
                 "value": "00:55"
             },
			 {
                 "id": "01:00",
                 "value": "01:00"
             },
			 {
                 "id": "01:05",
                 "value": "01:05"
             },
			 {
                 "id": "01:10",
                 "value": "01:10"
             },
			 {
                 "id": "01:15",
                 "value": "01:15"
             },
{
                 "id": "01:20",
                 "value": "01:20"
             },
{
                 "id": "01:25",
                 "value": "01:25"
             },
			 {
                 "id": "01:30",
                 "value": "01:30"
             },
			 {
                 "id": "01:35",
                 "value": "01:35"
             },
			 {
                 "id": "01:40",
                 "value": "01:40"
             },
			 
			 {
                 "id": "01:45",
                 "value": "01:45"
             }, 
			 {
                 "id": "01:50",
                 "value": "01:50"
             },
			 {
                 "id": "01:55",
                 "value": "01:55"
             },
			 {
                 "id": "02:00",
                 "value": "02:00"
             },
			{
                 "id": "02:05",
                 "value": "02:05"
             },
			 {
                 "id": "02:10",
                 "value": "02:10"
             },
			 {
                 "id": "02:15",
                 "value": "02:15"
             },
			{
                 "id": "02:20",
                 "value": "02:20"
             },
			{
                 "id": "02:25",
                 "value": "02:25"
             },
			 {
                 "id": "02:30",
                 "value": "02:30"
             },
			 {
                 "id": "02:35",
                 "value": "02:35"
             },
			 {
                 "id": "02:40",
                 "value": "02:40"
             },
			 
			 {
                 "id": "02:45",
                 "value": "02:45"
             }, 
			 {
                 "id": "02:50",
                 "value": "02:50"
             },
			 {
                 "id": "02:55",
                 "value": "02:55"
             },
			 {
                 "id": "03:00",
                 "value": "03:00"
             }, 
			{
                 "id": "03:05",
                 "value": "03:05"
             },
			 {
                 "id": "03:10",
                 "value": "03:10"
             },
			 {
                 "id": "03:15",
                 "value": "03:15"
             },
			{
                 "id": "03:20",
                 "value": "03:20"
             },
			{
                 "id": "03:25",
                 "value": "03:25"
             },
			 {
                 "id": "03:30",
                 "value": "03:30"
             },
			 {
                 "id": "03:35",
                 "value": "03:35"
             },
			 {
                 "id": "03:40",
                 "value": "03:40"
             },
			 
			 {
                 "id": "03:45",
                 "value": "03:45"
             }, 
			 {
                 "id": "03:50",
                 "value": "03:50"
             },
			 {
                 "id": "03:55",
                 "value": "03:55"
             },
			 {
                 "id": "04:00",
                 "value": "04:00"
             },
			 {
                 "id": "04:05",
                 "value": "04:05"
             },
			 {
                 "id": "04:10",
                 "value": "04:10"
             },
			 {
                 "id": "04:15",
                 "value": "04:15"
             },
			{
                 "id": "04:20",
                 "value": "04:20"
             },
			{
                 "id": "04:25",
                 "value": "04:25"
             },
			 {
                 "id": "04:30",
                 "value": "04:30"
             },
			 {
                 "id": "04:35",
                 "value": "04:35"
             },
			 {
                 "id": "04:40",
                 "value": "04:40"
             },
			 
			 {
                 "id": "04:45",
                 "value": "04:45"
             }, 
			 {
                 "id": "04:50",
                 "value": "04:50"
             },
			 {
                 "id": "04:55",
                 "value": "04:55"
             },
			 {
                 "id": "05:00",
                 "value": "05:00"
             }, 
			 {
                 "id": "05:05",
                 "value": "05:05"
             },
			 {
                 "id": "05:10",
                 "value": "05:10"
             },
			 {
                 "id": "05:15",
                 "value": "05:15"
             },
			{
                 "id": "05:20",
                 "value": "05:20"
             },
			{
                 "id": "05:25",
                 "value": "05:25"
             },
			 {
                 "id": "05:30",
                 "value": "05:30"
             },
			 {
                 "id": "05:35",
                 "value": "05:35"
             },
			 {
                 "id": "05:40",
                 "value": "05:40"
             },
			 
			 {
                 "id": "05:45",
                 "value": "05:45"
             }, 
			 {
                 "id": "05:50",
                 "value": "05:50"
             },
			 {
                 "id": "05:55",
                 "value": "05:55"
             },
			 {
                 "id": "06:00",
                 "value": "06:00"
             }, 
			 {
                 "id": "06:05",
                 "value": "06:05"
             },
			 {
                 "id": "06:10",
                 "value": "06:10"
             },
			 {
                 "id": "06:15",
                 "value": "06:15"
             },
			{
                 "id": "06:20",
                 "value": "06:20"
             },
			{
                 "id": "06:25",
                 "value": "06:25"
             },
			 {
                 "id": "06:30",
                 "value": "06:30"
             },
			 {
                 "id": "06:35",
                 "value": "06:35"
             },
			 {
                 "id": "06:40",
                 "value": "06:40"
             },
			 
			 {
                 "id": "06:45",
                 "value": "06:45"
             }, 
			 {
                 "id": "06:50",
                 "value": "06:50"
             },
			 {
                 "id": "06:55",
                 "value": "06:55"
             },
			 {
                 "id": "07:00",
                 "value": "07:00"
             }, 
			 {
                 "id": "07:05",
                 "value": "07:05"
             },
			 {
                 "id": "07:10",
                 "value": "07:10"
             },
			 {
                 "id": "07:15",
                 "value": "07:15"
             },
			{
                 "id": "07:20",
                 "value": "07:20"
             },
			{
                 "id": "07:25",
                 "value": "07:25"
             },
			 {
                 "id": "07:30",
                 "value": "07:30"
             },
			 {
                 "id": "07:35",
                 "value": "07:35"
             },
			 {
                 "id": "07:40",
                 "value": "07:40"
             },
			 
			 {
                 "id": "07:45",
                 "value": "07:45"
             }, 
			 {
                 "id": "07:50",
                 "value": "07:50"
             },
			 {
                 "id": "07:55",
                 "value": "07:55"
             },
			 {
                 "id": "08:00",
                 "value": "08:00"
             },
			 {
                 "id": "08:05",
                 "value": "08:05"
             },
			 {
                 "id": "08:10",
                 "value": "08:10"
             },
			 {
                 "id": "08:15",
                 "value": "08:15"
             },
			{
                 "id": "08:20",
                 "value": "08:20"
             },
			{
                 "id": "08:25",
                 "value": "08:25"
             },
			 {
                 "id": "08:30",
                 "value": "08:30"
             },
			 {
                 "id": "08:35",
                 "value": "08:35"
             },
			 {
                 "id": "08:40",
                 "value": "08:40"
             },
			 
			 {
                 "id": "08:45",
                 "value": "08:45"
             }, 
			 {
                 "id": "08:50",
                 "value": "08:50"
             },
			 {
                 "id": "08:55",
                 "value": "08:55"
             },
			 {
                 "id": "09:00",
                 "value": "09:00"
             }, 
			 {
                 "id": "09:05",
                 "value": "09:05"
             },
			 {
                 "id": "09:10",
                 "value": "09:10"
             },
			 {
                 "id": "09:15",
                 "value": "09:15"
             },
			{
                 "id": "09:20",
                 "value": "09:20"
             },
			{
                 "id": "09:25",
                 "value": "09:25"
             },
			 {
                 "id": "09:30",
                 "value": "09:30"
             },
			 {
                 "id": "09:35",
                 "value": "09:35"
             },
			 {
                 "id": "09:40",
                 "value": "09:40"
             },
			 
			 {
                 "id": "09:45",
                 "value": "09:45"
             }, 
			 {
                 "id": "09:50",
                 "value": "09:50"
             },
			 {
                 "id": "09:55",
                 "value": "09:55"
             },
			 {
                 "id": "10:00",
                 "value": "10:00"
             }, 
			 {
                 "id": "10:05",
                 "value": "10:05"
             },
			 {
                 "id": "10:10",
                 "value": "10:10"
             },
			 {
                 "id": "10:15",
                 "value": "10:15"
             },
			{
                 "id": "10:20",
                 "value": "10:20"
             },
			{
                 "id": "10:25",
                 "value": "10:25"
             },
			 {
                 "id": "10:30",
                 "value": "10:30"
             },
			 {
                 "id": "10:35",
                 "value": "10:35"
             },
			 {
                 "id": "10:40",
                 "value": "10:40"
             },
			 
			 {
                 "id": "10:45",
                 "value": "10:45"
             }, 
			 {
                 "id": "10:50",
                 "value": "10:50"
             },
			 {
                 "id": "10:55",
                 "value": "10:55"
             },
			 {
                 "id": "11:00",
                 "value": "11:00"
             }, 
			 {
                 "id": "11:05",
                 "value": "11:05"
             },
			 {
                 "id": "11:10",
                 "value": "11:10"
             },
			 {
                 "id": "11:15",
                 "value": "11:15"
             },
			{
                 "id": "11:20",
                 "value": "11:20"
             },
			{
                 "id": "11:25",
                 "value": "11:25"
             },
			 {
                 "id": "11:30",
                 "value": "11:30"
             },
			 {
                 "id": "11:35",
                 "value": "11:35"
             },
			 {
                 "id": "11:40",
                 "value": "11:40"
             },
			 
			 {
                 "id": "11:45",
                 "value": "11:45"
             }, 
			 {
                 "id": "11:50",
                 "value": "11:50"
             },
			 {
                 "id": "11:55",
                 "value": "11:55"
             }, 
			 {
                 "id": "12:00",
                 "value": "12:00"
             }, 
			 
			 {
                 "id": "12:05",
                 "value": "12:05"
             },
			 {
                 "id": "12:10",
                 "value": "12:10"
             },
			 {
                 "id": "12:15",
                 "value": "12:15"
             },
			{
                 "id": "12:20",
                 "value": "12:20"
             },
			{
                 "id": "12:25",
                 "value": "12:25"
             },
			 {
                 "id": "12:30",
                 "value": "12:30"
             },
			 {
                 "id": "12:35",
                 "value": "12:35"
             },
			 {
                 "id": "12:40",
                 "value": "12:40"
             },
			 
			 {
                 "id": "12:45",
                 "value": "12:45"
             }, 
			 {
                 "id": "12:50",
                 "value": "12:50"
             },
			 {
                 "id": "12:55",
                 "value": "12:55"
             },
			 {
                 "id": "13:00",
                 "value": "13:00"
             }, 
			 {
                 "id": "13:05",
                 "value": "13:05"
             },
			 {
                 "id": "13:10",
                 "value": "13:10"
             },
			 {
                 "id": "13:15",
                 "value": "13:15"
             },
			{
                 "id": "13:20",
                 "value": "13:20"
             },
			{
                 "id": "13:25",
                 "value": "13:25"
             },
			 {
                 "id": "13:30",
                 "value": "13:30"
             },
			 {
                 "id": "13:35",
                 "value": "13:35"
             },
			 {
                 "id": "13:40",
                 "value": "13:40"
             },
			 
			 {
                 "id": "13:45",
                 "value": "13:45"
             }, 
			 {
                 "id": "13:50",
                 "value": "13:50"
             },
			 {
                 "id": "13:55",
                 "value": "13:55"
             },
			 {
                 "id": "14:00",
                 "value": "14:00"
             },
			 {
                 "id": "14:05",
                 "value": "14:05"
             },
			 {
                 "id": "14:10",
                 "value": "14:10"
             },
			 {
                 "id": "14:15",
                 "value": "14:15"
             },
			{
                 "id": "14:20",
                 "value": "14:20"
             },
			{
                 "id": "14:25",
                 "value": "14:25"
             },
			 {
                 "id": "14:30",
                 "value": "14:30"
             },
			 {
                 "id": "14:35",
                 "value": "14:35"
             },
			 {
                 "id": "14:40",
                 "value": "14:40"
             },
			 
			 {
                 "id": "14:45",
                 "value": "14:45"
             }, 
			 {
                 "id": "14:50",
                 "value": "14:50"
             },
			 {
                 "id": "14:55",
                 "value": "14:55"
             },
			 {
                 "id": "15:00",
                 "value": "15:00"
             },
			 
			 {
                 "id": "15:05",
                 "value": "15:05"
             },
			 {
                 "id": "15:10",
                 "value": "15:10"
             },
			 {
                 "id": "15:15",
                 "value": "15:15"
             },
			{
                 "id": "15:20",
                 "value": "15:20"
             },
			{
                 "id": "15:25",
                 "value": "15:25"
             },
			 {
                 "id": "15:30",
                 "value": "15:30"
             },
			 {
                 "id": "15:35",
                 "value": "15:35"
             },
			 {
                 "id": "15:40",
                 "value": "15:40"
             },
			 
			 {
                 "id": "15:45",
                 "value": "15:45"
             }, 
			 {
                 "id": "15:50",
                 "value": "15:50"
             },
			 {
                 "id": "15:55",
                 "value": "15:55"
             }, 
			 {
                 "id": "16:00",
                 "value": "16:00"
             }, 
			 {
                 "id": "16:05",
                 "value": "16:05"
             },
			 {
                 "id": "16:10",
                 "value": "16:10"
             },
			 {
                 "id": "16:15",
                 "value": "16:15"
             },
			{
                 "id": "16:20",
                 "value": "16:20"
             },
			{
                 "id": "16:25",
                 "value": "16:25"
             },
			 {
                 "id": "16:30",
                 "value": "16:30"
             },
			 {
                 "id": "16:35",
                 "value": "16:35"
             },
			 {
                 "id": "16:40",
                 "value": "16:40"
             },
			 
			 {
                 "id": "16:45",
                 "value": "16:45"
             }, 
			 {
                 "id": "16:50",
                 "value": "16:50"
             },
			 {
                 "id": "16:55",
                 "value": "16:55"
             },
			 {
                 "id": "17:00",
                 "value": "17:00"
             }, 
			 {
                 "id": "17:05",
                 "value": "17:05"
             },
			 {
                 "id": "17:10",
                 "value": "17:10"
             },
			 {
                 "id": "17:15",
                 "value": "17:15"
             },
			{
                 "id": "17:20",
                 "value": "17:20"
             },
			{
                 "id": "17:25",
                 "value": "17:25"
             },
			 {
                 "id": "17:30",
                 "value": "17:30"
             },
			 {
                 "id": "17:35",
                 "value": "17:35"
             },
			 {
                 "id": "17:40",
                 "value": "17:40"
             },
			 
			 {
                 "id": "17:45",
                 "value": "17:45"
             }, 
			 {
                 "id": "17:50",
                 "value": "17:50"
             },
			 {
                 "id": "17:55",
                 "value": "17:55"
             },
			 {
                 "id": "18:00",
                 "value": "18:00"
             },
			 {
                 "id": "18:05",
                 "value": "18:05"
             },
			 {
                 "id": "18:10",
                 "value": "18:10"
             },
			 {
                 "id": "18:15",
                 "value": "18:15"
             },
			{
                 "id": "18:20",
                 "value": "18:20"
             },
			{
                 "id": "18:25",
                 "value": "18:25"
             },
			 {
                 "id": "18:30",
                 "value": "18:30"
             },
			 {
                 "id": "18:35",
                 "value": "18:35"
             },
			 {
                 "id": "18:40",
                 "value": "18:40"
             },
			 
			 {
                 "id": "18:45",
                 "value": "18:45"
             }, 
			 {
                 "id": "18:50",
                 "value": "18:50"
             },
			 {
			 
                 "id": "18:55",
                 "value": "18:55"
             },
			 {
                 "id": "19:00",
                 "value": "19:00"
             }, 
			 {
                 "id": "19:05",
                 "value": "19:05"
             },
			 {
                 "id": "19:10",
                 "value": "19:10"
             },
			 {
                 "id": "19:15",
                 "value": "19:15"
             },
			{
                 "id": "19:20",
                 "value": "19:20"
             },
			{
                 "id": "19:25",
                 "value": "19:25"
             },
			 {
                 "id": "19:30",
                 "value": "19:30"
             },
			 {
                 "id": "19:35",
                 "value": "19:35"
             },
			 {
                 "id": "19:40",
                 "value": "19:40"
             },
			 
			 {
                 "id": "19:45",
                 "value": "19:45"
             }, 
			 {
                 "id": "19:50",
                 "value": "19:50"
             },
			 {
                 "id": "19:55",
                 "value": "19:55"
             },
			 {
                 "id": "20:00",
                 "value": "20:00"
             }, 
			 {
                 "id": "20:05",
                 "value": "20:05"
             },
			 {
                 "id": "20:10",
                 "value": "20:10"
             },
			 {
                 "id": "20:15",
                 "value": "20:15"
             },
			{
                 "id": "20:20",
                 "value": "20:20"
             },
			{
                 "id": "20:25",
                 "value": "20:25"
             },
			 {
                 "id": "20:30",
                 "value": "20:30"
             },
			 {
                 "id": "20:35",
                 "value": "20:35"
             },
			 {
                 "id": "20:40",
                 "value": "20:40"
             },
			 
			 {
                 "id": "20:45",
                 "value": "20:45"
             }, 
			 {
                 "id": "20:50",
                 "value": "20:50"
             },
			 {
                 "id": "20:55",
                 "value": "20:55"
             },
			 {
                 "id": "21:00",
                 "value": "21:00"
             }, 
			 {
                 "id": "21:05",
                 "value": "21:05"
             },
			 {
                 "id": "21:10",
                 "value": "21:10"
             },
			 {
                 "id": "21:15",
                 "value": "21:15"
             },
			{
                 "id": "21:20",
                 "value": "21:20"
             },
			{
                 "id": "21:25",
                 "value": "21:25"
             },
			 {
                 "id": "21:30",
                 "value": "21:30"
             },
			 {
                 "id": "21:35",
                 "value": "21:35"
             },
			 {
                 "id": "21:40",
                 "value": "21:40"
             },
			 
			 {
                 "id": "21:45",
                 "value": "21:45"
             }, 
			 {
                 "id": "21:50",
                 "value": "21:50"
             },
			 {
                 "id": "21:55",
                 "value": "21:55"
             }, {
                 "id": "22:00",
                 "value": "22:00"
             }, 
			 {
                 "id": "22:05",
                 "value": "22:05"
             },
			 {
                 "id": "22:10",
                 "value": "22:10"
             },
			 {
                 "id": "22:15",
                 "value": "22:15"
             },
			{
                 "id": "22:20",
                 "value": "22:20"
             },
			{
                 "id": "22:25",
                 "value": "22:25"
             },
			 {
                 "id": "22:30",
                 "value": "22:30"
             },
			 {
                 "id": "22:35",
                 "value": "22:35"
             },
			 {
                 "id": "22:40",
                 "value": "22:40"
             },
			 
			 {
                 "id": "22:45",
                 "value": "22:45"
             }, 
			 {
                 "id": "22:50",
                 "value": "22:50"
             },
			 {
                 "id": "22:55",
                 "value": "22:55"
             },
			 {
                 "id": "23:00",
                 "value": "23:00"
             }, 
			 {
                 "id": "23:05",
                 "value": "23:05"
             },
			 {
                 "id": "23:10",
                 "value": "23:10"
             },
			 {
                 "id": "23:15",
                 "value": "23:15"
             },
			{
                 "id": "23:20",
                 "value": "23:20"
             },
			{
                 "id": "23:25",
                 "value": "23:25"
             },
			 {
                 "id": "23:30",
                 "value": "23:30"
             },
			 {
                 "id": "23:35",
                 "value": "23:35"
             },
			 {
                 "id": "23:40",
                 "value": "23:40"
             },
			 
			 {
                 "id": "23:45",
                 "value": "23:45"
             }, 
			 {
                 "id": "23:50",
                 "value": "23:50"
             },
			 {
                 "id": "23:55",
                 "value": "23:55"
             },];
             outObj = {
                 xtype: "combo",
                 editable: false,
                 maskRe: /[0-9]/,
                 store: Ext.create('Ext.data.Store', {
                     storeId: inObj.id + '_cbostore',
                     model: 'combo_model',
                     data: tmpData
                 }),
                 queryMode: "local",
                 queryDelay: 5,
                 queryCaching: false,
                 displayField: "value",
                 matchFieldWidth: false,
                 valueField: "id",
				 value:"06:00",
                 typeAhead: true,
                 hideTrigger: false,
                 listeners: {
                     /*
                     "select":function( combo, records, eOpts)
                     {	
                     	if(inObj.keyField != undefined)
                     		parentForm.queryById(inObj.keyField).setValue(combo.getValue());
                     },
                     */
                     beforequery: function(record) {
                         record.query = new RegExp(record.query, 'i');
                         record.forceAll = true;
                         return true;
                     }
                 },
                 columnWidth: .5,
                 fieldCls: "c-fieldctrl",
                 inputWrapCls: "x-form-text-wrap c-fieldctrlwrap",
                 triggerBaseCls: "c-triggerbtn"
             }

             if (inObj.id != undefined) outObj.itemId = inObj.id
             if (inObj.mandatory != undefined) {
                 outObj.allowBlank = false
                 outObj.blankText = inObj.label + " cannot be blank."
             }
             if (inObj.labelWidth == undefined)
                 outObj.columnWidth = 1
             else
                 outObj.columnWidth = .15
             return outObj;
         },
         /*
         Button with Container control.
         Usage : Used in Header / Search sections.
         Default: "d-m-y" date format will be used.
         */
         addButton: function(inObj) {
             outObj = {
                 xtype: "button",
                 align: "right"
             }
             if (inObj.label != undefined) outObj.text = inObj.label
             if (inObj.id != undefined) outObj.itemId = inObj.id
             if (inObj.width != undefined) outObj.width = inObj.width
                 //outObj.height=25
                 //outObj.columnWidth=1/plf.columns
                 //return outObj;		
             outObj.labelSeparator = "";
             if (inObj.tooltip != undefined) outObj.tooltip = inObj.tooltip
             if (inObj.handler != undefined) outObj.handler = inObj.handler
             return {
                 xtype: 'container',
                 layout: {
                     type: 'vbox',
                     align: 'center'
                 },
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 items: outObj
             };
         },

         /*
         Display only Field with Container control.
         Usage : Used in Header / Search sections.
         */
         addDisplayOnly: function(inObj) {
             //return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:plf.addPlainDate(inObj)};
             outObj = {
                 xtype: "container",
                 layout: "column",
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 itemId: "cnt_" + inObj.id,
                 items: [
                     plf.addFieldLabel(inObj),
                     plf.addPlainDisplayOnly(inObj)
                 ]
             }
             return outObj;

         },
         addPlainDisplayOnly: function(inObj) {
             outObj = {
                     xtype: "displayfield",
                     readOnly: true,
                     fieldCls: "c-displyonlyctrl",
                     border: false
                 }
                 //if(inObj.label != undefined) outObj.fieldLabel=inObj.label
             if (inObj.id != undefined) outObj.itemId = inObj.id
             if (inObj.value != undefined) outObj.value = inObj.value
             outObj.columnWidth = 1
             if (inObj.mandatory != undefined) {
                 outObj.allowBlank = false
                 outObj.blankText = inObj.label + " cannot be blank."
             }
             outObj.inputWrapCls="x-form-text-wrap c-fieldctrlwrap";			
             return outObj;
         },
         addDisplayOnlyDate: function(inObj) {
             outObj = {
                 xtype: "container",
                 layout: "column",
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 itemId: "cnt_" + inObj.id,
                 items: [
                     plf.addFieldLabel(inObj),
                     plf.addPlainDisplayOnlyDate(inObj)
                 ]
             }
             return outObj;
         },
         addPlainDisplayOnlyDate: function(inObj) {
             outObj = {
                 xtype: "datefield",
                 readOnly: true,
                 hideTrigger: true,
                 fieldCls: "c-displyonlyctrl",
                 border: false,
                 emptyText: 'DD-MM-YYYY'
             }
             if (inObj.id != undefined) outObj.itemId = inObj.id
             if (inObj.value != undefined) outObj.value = inObj.value
                 //outObj.columnWidth=plf.getColumnwidth()
                 //outObj.labelWidth=plf.labelWidth
                 //return outObj;	
                 //outObj.labelSeparator ="";
             outObj.columnWidth = 1
             if (inObj.mandatory != undefined) {
                 outObj.allowBlank = false
                 outObj.blankText = inObj.label + " cannot be blank."
             }
             return outObj;
         },
         /*
         Hidden control.
         Usage : Used in Header / Search sections to hold processing values.
         */
         addHidden: function(inObj) {
             outObj = {
                 xtype: "hidden"
             }
             if (inObj.id != undefined) outObj.itemId = inObj.id
             if (inObj.value != undefined) outObj.value = inObj.value
             outObj.columnWidth = plf.getColumnwidth()
             outObj.labelSeparator = "";
             return outObj;
         },

         /*
         Blank / &nbsp; Control.
         Usage : Used in to fill space in header / search sections.
         */
         addBlank: function(inObj) {
             return {
                 xtype: "container",
                 cls: plf.getContainerCls(),
                 border: false,
                 columnWidth: plf.getColumnwidth() /*,height:"30px"*/
             } //code remoed for bug id:57342
             //return {border:false,columnWidth:1/plf.columns}
         },

         addStripLine: function(inObj) {
             /*
             return {
             	xtype:'container',layout:"column",height:7,margin:2,style:"background-color:#ffffff",
             	border:false,columnWidth:1,
             	items:
             	[
             		{xtype:'container',height:5,style:"background-color:#ffffff",
             		border:true,columnWidth:.02},
             		{xtype:'container',height:5,style:"background-color:#98dd57",
             		border:true,columnWidth:.96},
             		{xtype:'container',height:5,style:"background-color:#ffffff",
             		border:true,columnWidth:.02}					
             	]
             }
             */
         },
         addImageFileUpload: function(inObj) 
		 {
			var tmpPath="local";
			if (inObj.Path != undefined) tmpPath = inObj.Path;
             outObj = Ext.create("CueTrans.lib.control.cueimagefileupload", {
                 LabelText: inObj.label,
                 itemId: inObj.id,
                 Entity: inObj.Entity,
				 Path: tmpPath
             })

             //return outObj;
             return {
                 xtype: 'container',
                 columnWidth: plf.getColumnwidth(),
                 items: outObj
             };
         },
         addFileUpload: function(inObj) 
		 {
			var tmpPath="local";
			if (inObj.Path != undefined) tmpPath = inObj.Path;
             outObj = Ext.create("CueTrans.lib.control.cuefileupload", {
                 LabelText: inObj.label,
                 itemId: inObj.id,
                 Entity: inObj.Entity,
                 Path: tmpPath
             })

             //return outObj;
             return {
                 xtype: 'container',
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 items: outObj
             };
         },
		  addCustomFileUpload: function(inObj) 
		 {
			var tmpPath="local";
			if (inObj.Path != undefined) tmpPath = inObj.Path;
             outObj = Ext.create("CueTrans.lib.control.cuecustomfileupload", {
                 LabelText: inObj.label,
                 itemId: inObj.id,
                 Entity: inObj.Entity,
                 Path: tmpPath
             })

             //return outObj;
             return {
                 xtype: 'container',
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 items: outObj
             };
         },
		 addCustomFileDownload: function(inObj) 
		 {
			var tmpPath="local";
			if (inObj.Path != undefined) tmpPath = inObj.Path;
             outObj = Ext.create("CueTrans.lib.control.cuecustomfiledownload", {
                 LabelText: inObj.label,
                 itemId: inObj.id,
                 Entity: inObj.Entity,
                 Path: tmpPath
             })

             //return outObj;
             return {
                 xtype: 'container',
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 items: outObj
             };
         },
		 addWeekYear: function(inObj) {
             outObj = [
                 plf.addFieldLabel(inObj), {
                     xtype: "container",
                     layout: "column",
                     columnWidth: 1,					 
                     items: [
                         plf.addCustomWeek(inObj),
                         plf.addCustomYear(inObj),
                     ]
                 }
             ]

             return {
                 xtype: 'container',
                 layout: "column",
				 itemId: "cnt_" + inObj.weekId,
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 items: outObj
             };
         },
		 addCustomWeek: function(inObj) {
             outObj = {
                 xtype: "combo",
                 store: Ext.create('Ext.data.Store', {
                     storeId: inObj.weekId + '_cbostore',
                     model: 'combo_model'
                 }),
                 queryMode: "local",
                 queryDelay: 5,				 
                 queryCaching: false,
                 displayField: "value",
                 matchFieldWidth: false,
                 valueField: "id",
                 typeAhead: true,
                 hideTrigger: false,
                 listeners: {
                     beforequery: function(record) {
                         record.query = new RegExp(record.query, 'i');
                         record.forceAll = true;
                         return true;
                     }
                 },
                 columnWidth: .5,
                 fieldCls: "c-fieldctrl",
                 inputWrapCls: "x-form-text-wrap c-fieldctrlwrap",
                 triggerBaseCls: "c-triggerbtn"
             }

             if (inObj.weekId != undefined) outObj.itemId = inObj.weekId
             if (inObj.mandatory != undefined) {
                 outObj.allowBlank = false
                 outObj.blankText = inObj.label + " cannot be blank."
             }
             return outObj;
         },
		 addCustomYear: function(inObj) {
             outObj = {
                 xtype: "combo",
                 store: Ext.create('Ext.data.Store', {
                     storeId: inObj.YearId + '_cbostore',
                     model: 'combo_model'
                 }),
                 queryMode: "local",
                 queryDelay: 5,				 
                 queryCaching: false,
                 displayField: "value",
                 matchFieldWidth: false,
                 valueField: "id",
                 typeAhead: true,
                 hideTrigger: false,
                 listeners: {
                     beforequery: function(record) {
                         record.query = new RegExp(record.query, 'i');
                         record.forceAll = true;
                         return true;
                     }
                 },
                 columnWidth: .5,
                 fieldCls: "c-fieldctrl",
                 inputWrapCls: "x-form-text-wrap c-fieldctrlwrap",
                 triggerBaseCls: "c-triggerbtn"
             }

             if (inObj.YearId != undefined) outObj.itemId = inObj.YearId
             if (inObj.mandatory != undefined) {
                 outObj.allowBlank = false
                 outObj.blankText = inObj.label + " cannot be blank."
             }
             return outObj;
         },
         /*code for Custom Time Control starts here*/
         addDateTime: function(inObj) {
             outObj = [
                 plf.addFieldLabel(inObj), {
                     xtype: "container",
                     layout: "column",
                     columnWidth: 1,					 
                     items: [
                         plf.addCustomDate(inObj),
                         plf.addCustomTime(inObj),
                     ]
                 }
             ]

             return {
                 xtype: 'container',
                 layout: "column",
				 itemId: "cnt_" + inObj.dateid,
                 columnWidth: plf.getColumnwidth(),
                 cls: plf.getContainerCls(),
                 items: outObj
             };
         },
         addCustomDate: function(inObj) {
             outObj = {
                 xtype: "datefield",
                 itemId: inObj.dateid,
                 columnWidth: .6,
                 inputWrapCls: "x-form-text-wrap c-fieldctrlwrap",
                 triggerBaseCls: "c-triggerbtn",
                 format: plf.renderDateFormat,
                 emptyText: 'DD-MM-YYYY',
                 fieldCls: "c-fieldctrl",
                 maskRe: /[0-9-]/
             }
             if (inObj.mandatory != undefined) {
                 outObj.allowBlank = false
                 outObj.blankText = inObj.label + " cannot be blank."
             }
             return outObj;
         },
         addCustomTime: function(inObj) {

             var tmpData = [{
                 "id": "00:00",
                 "value": "00:00"
             },
			 {
                 "id": "00:05",
                 "value": "00:05"
             },
			 {
                 "id": "00:10",
                 "value": "00:10"
             },
			 {
                 "id": "00:15",
                 "value": "00:15"
             },
 {
                 "id": "00:20",
                 "value": "00:20"
             },
 {
                 "id": "00:25",
                 "value": "00:25"
             },			 {
                 "id": "00:30",
                 "value": "00:30"
             }, 
			  {
                 "id": "00:35",
                 "value": "00:35"
             },
			  {
                 "id": "00:40",
                 "value": "00:40"
             },
			  
			 {
                 "id": "00:45",
                 "value": "00:45"
             }, 
			 {
                 "id": "00:50",
                 "value": "00:50"
             },
			 {
                 "id": "00:55",
                 "value": "00:55"
             },
			 {
                 "id": "01:00",
                 "value": "01:00"
             },
			 {
                 "id": "01:05",
                 "value": "01:05"
             },
			 {
                 "id": "01:10",
                 "value": "01:10"
             },
			 {
                 "id": "01:15",
                 "value": "01:15"
             },
{
                 "id": "01:20",
                 "value": "01:20"
             },
{
                 "id": "01:25",
                 "value": "01:25"
             },
			 {
                 "id": "01:30",
                 "value": "01:30"
             },
			 {
                 "id": "01:35",
                 "value": "01:35"
             },
			 {
                 "id": "01:40",
                 "value": "01:40"
             },
			 
			 {
                 "id": "01:45",
                 "value": "01:45"
             }, 
			 {
                 "id": "01:50",
                 "value": "01:50"
             },
			 {
                 "id": "01:55",
                 "value": "01:55"
             },
			 {
                 "id": "02:00",
                 "value": "02:00"
             },
			{
                 "id": "02:05",
                 "value": "02:05"
             },
			 {
                 "id": "02:10",
                 "value": "02:10"
             },
			 {
                 "id": "02:15",
                 "value": "02:15"
             },
			{
                 "id": "02:20",
                 "value": "02:20"
             },
			{
                 "id": "02:25",
                 "value": "02:25"
             },
			 {
                 "id": "02:30",
                 "value": "02:30"
             },
			 {
                 "id": "02:35",
                 "value": "02:35"
             },
			 {
                 "id": "02:40",
                 "value": "02:40"
             },
			 
			 {
                 "id": "02:45",
                 "value": "02:45"
             }, 
			 {
                 "id": "02:50",
                 "value": "02:50"
             },
			 {
                 "id": "02:55",
                 "value": "02:55"
             },
			 {
                 "id": "03:00",
                 "value": "03:00"
             }, 
			{
                 "id": "03:05",
                 "value": "03:05"
             },
			 {
                 "id": "03:10",
                 "value": "03:10"
             },
			 {
                 "id": "03:15",
                 "value": "03:15"
             },
			{
                 "id": "03:20",
                 "value": "03:20"
             },
			{
                 "id": "03:25",
                 "value": "03:25"
             },
			 {
                 "id": "03:30",
                 "value": "03:30"
             },
			 {
                 "id": "03:35",
                 "value": "03:35"
             },
			 {
                 "id": "03:40",
                 "value": "03:40"
             },
			 
			 {
                 "id": "03:45",
                 "value": "03:45"
             }, 
			 {
                 "id": "03:50",
                 "value": "03:50"
             },
			 {
                 "id": "03:55",
                 "value": "03:55"
             },
			 {
                 "id": "04:00",
                 "value": "04:00"
             },
			 {
                 "id": "04:05",
                 "value": "04:05"
             },
			 {
                 "id": "04:10",
                 "value": "04:10"
             },
			 {
                 "id": "04:15",
                 "value": "04:15"
             },
			{
                 "id": "04:20",
                 "value": "04:20"
             },
			{
                 "id": "04:25",
                 "value": "04:25"
             },
			 {
                 "id": "04:30",
                 "value": "04:30"
             },
			 {
                 "id": "04:35",
                 "value": "04:35"
             },
			 {
                 "id": "04:40",
                 "value": "04:40"
             },
			 
			 {
                 "id": "04:45",
                 "value": "04:45"
             }, 
			 {
                 "id": "04:50",
                 "value": "04:50"
             },
			 {
                 "id": "04:55",
                 "value": "04:55"
             },
			 {
                 "id": "05:00",
                 "value": "05:00"
             }, 
			 {
                 "id": "05:05",
                 "value": "05:05"
             },
			 {
                 "id": "05:10",
                 "value": "05:10"
             },
			 {
                 "id": "05:15",
                 "value": "05:15"
             },
			{
                 "id": "05:20",
                 "value": "05:20"
             },
			{
                 "id": "05:25",
                 "value": "05:25"
             },
			 {
                 "id": "05:30",
                 "value": "05:30"
             },
			 {
                 "id": "05:35",
                 "value": "05:35"
             },
			 {
                 "id": "05:40",
                 "value": "05:40"
             },
			 
			 {
                 "id": "05:45",
                 "value": "05:45"
             }, 
			 {
                 "id": "05:50",
                 "value": "05:50"
             },
			 {
                 "id": "05:55",
                 "value": "05:55"
             },
			 {
                 "id": "06:00",
                 "value": "06:00"
             }, 
			 {
                 "id": "06:05",
                 "value": "06:05"
             },
			 {
                 "id": "06:10",
                 "value": "06:10"
             },
			 {
                 "id": "06:15",
                 "value": "06:15"
             },
			{
                 "id": "06:20",
                 "value": "06:20"
             },
			{
                 "id": "06:25",
                 "value": "06:25"
             },
			 {
                 "id": "06:30",
                 "value": "06:30"
             },
			 {
                 "id": "06:35",
                 "value": "06:35"
             },
			 {
                 "id": "06:40",
                 "value": "06:40"
             },
			 
			 {
                 "id": "06:45",
                 "value": "06:45"
             }, 
			 {
                 "id": "06:50",
                 "value": "06:50"
             },
			 {
                 "id": "06:55",
                 "value": "06:55"
             },
			 {
                 "id": "07:00",
                 "value": "07:00"
             }, 
			 {
                 "id": "07:05",
                 "value": "07:05"
             },
			 {
                 "id": "07:10",
                 "value": "07:10"
             },
			 {
                 "id": "07:15",
                 "value": "07:15"
             },
			{
                 "id": "07:20",
                 "value": "07:20"
             },
			{
                 "id": "07:25",
                 "value": "07:25"
             },
			 {
                 "id": "07:30",
                 "value": "07:30"
             },
			 {
                 "id": "07:35",
                 "value": "07:35"
             },
			 {
                 "id": "07:40",
                 "value": "07:40"
             },
			 
			 {
                 "id": "07:45",
                 "value": "07:45"
             }, 
			 {
                 "id": "07:50",
                 "value": "07:50"
             },
			 {
                 "id": "07:55",
                 "value": "07:55"
             },
			 {
                 "id": "08:00",
                 "value": "08:00"
             },
			 {
                 "id": "08:05",
                 "value": "08:05"
             },
			 {
                 "id": "08:10",
                 "value": "08:10"
             },
			 {
                 "id": "08:15",
                 "value": "08:15"
             },
			{
                 "id": "08:20",
                 "value": "08:20"
             },
			{
                 "id": "08:25",
                 "value": "08:25"
             },
			 {
                 "id": "08:30",
                 "value": "08:30"
             },
			 {
                 "id": "08:35",
                 "value": "08:35"
             },
			 {
                 "id": "08:40",
                 "value": "08:40"
             },
			 
			 {
                 "id": "08:45",
                 "value": "08:45"
             }, 
			 {
                 "id": "08:50",
                 "value": "08:50"
             },
			 {
                 "id": "08:55",
                 "value": "08:55"
             },
			 {
                 "id": "09:00",
                 "value": "09:00"
             }, 
			 {
                 "id": "09:05",
                 "value": "09:05"
             },
			 {
                 "id": "09:10",
                 "value": "09:10"
             },
			 {
                 "id": "09:15",
                 "value": "09:15"
             },
			{
                 "id": "09:20",
                 "value": "09:20"
             },
			{
                 "id": "09:25",
                 "value": "09:25"
             },
			 {
                 "id": "09:30",
                 "value": "09:30"
             },
			 {
                 "id": "09:35",
                 "value": "09:35"
             },
			 {
                 "id": "09:40",
                 "value": "09:40"
             },
			 
			 {
                 "id": "09:45",
                 "value": "09:45"
             }, 
			 {
                 "id": "09:50",
                 "value": "09:50"
             },
			 {
                 "id": "09:55",
                 "value": "09:55"
             },
			 {
                 "id": "10:00",
                 "value": "10:00"
             }, 
			 {
                 "id": "10:05",
                 "value": "10:05"
             },
			 {
                 "id": "10:10",
                 "value": "10:10"
             },
			 {
                 "id": "10:15",
                 "value": "10:15"
             },
			{
                 "id": "10:20",
                 "value": "10:20"
             },
			{
                 "id": "10:25",
                 "value": "10:25"
             },
			 {
                 "id": "10:30",
                 "value": "10:30"
             },
			 {
                 "id": "10:35",
                 "value": "10:35"
             },
			 {
                 "id": "10:40",
                 "value": "10:40"
             },
			 
			 {
                 "id": "10:45",
                 "value": "10:45"
             }, 
			 {
                 "id": "10:50",
                 "value": "10:50"
             },
			 {
                 "id": "10:55",
                 "value": "10:55"
             },
			 {
                 "id": "11:00",
                 "value": "11:00"
             }, 
			 {
                 "id": "11:05",
                 "value": "11:05"
             },
			 {
                 "id": "11:10",
                 "value": "11:10"
             },
			 {
                 "id": "11:15",
                 "value": "11:15"
             },
			{
                 "id": "11:20",
                 "value": "11:20"
             },
			{
                 "id": "11:25",
                 "value": "11:25"
             },
			 {
                 "id": "11:30",
                 "value": "11:30"
             },
			 {
                 "id": "11:35",
                 "value": "11:35"
             },
			 {
                 "id": "11:40",
                 "value": "11:40"
             },
			 
			 {
                 "id": "11:45",
                 "value": "11:45"
             }, 
			 {
                 "id": "11:50",
                 "value": "11:50"
             },
			 {
                 "id": "11:55",
                 "value": "11:55"
             }, 
			 {
                 "id": "12:00",
                 "value": "12:00"
             }, 
			 
			 {
                 "id": "12:05",
                 "value": "12:05"
             },
			 {
                 "id": "12:10",
                 "value": "12:10"
             },
			 {
                 "id": "12:15",
                 "value": "12:15"
             },
			{
                 "id": "12:20",
                 "value": "12:20"
             },
			{
                 "id": "12:25",
                 "value": "12:25"
             },
			 {
                 "id": "12:30",
                 "value": "12:30"
             },
			 {
                 "id": "12:35",
                 "value": "12:35"
             },
			 {
                 "id": "12:40",
                 "value": "12:40"
             },
			 
			 {
                 "id": "12:45",
                 "value": "12:45"
             }, 
			 {
                 "id": "12:50",
                 "value": "12:50"
             },
			 {
                 "id": "12:55",
                 "value": "12:55"
             },
			 {
                 "id": "13:00",
                 "value": "13:00"
             }, 
			 {
                 "id": "13:05",
                 "value": "13:05"
             },
			 {
                 "id": "13:10",
                 "value": "13:10"
             },
			 {
                 "id": "13:15",
                 "value": "13:15"
             },
			{
                 "id": "13:20",
                 "value": "13:20"
             },
			{
                 "id": "13:25",
                 "value": "13:25"
             },
			 {
                 "id": "13:30",
                 "value": "13:30"
             },
			 {
                 "id": "13:35",
                 "value": "13:35"
             },
			 {
                 "id": "13:40",
                 "value": "13:40"
             },
			 
			 {
                 "id": "13:45",
                 "value": "13:45"
             }, 
			 {
                 "id": "13:50",
                 "value": "13:50"
             },
			 {
                 "id": "13:55",
                 "value": "13:55"
             },
			 {
                 "id": "14:00",
                 "value": "14:00"
             },
			 {
                 "id": "14:05",
                 "value": "14:05"
             },
			 {
                 "id": "14:10",
                 "value": "14:10"
             },
			 {
                 "id": "14:15",
                 "value": "14:15"
             },
			{
                 "id": "14:20",
                 "value": "14:20"
             },
			{
                 "id": "14:25",
                 "value": "14:25"
             },
			 {
                 "id": "14:30",
                 "value": "14:30"
             },
			 {
                 "id": "14:35",
                 "value": "14:35"
             },
			 {
                 "id": "14:40",
                 "value": "14:40"
             },
			 
			 {
                 "id": "14:45",
                 "value": "14:45"
             }, 
			 {
                 "id": "14:50",
                 "value": "14:50"
             },
			 {
                 "id": "14:55",
                 "value": "14:55"
             },
			 {
                 "id": "15:00",
                 "value": "15:00"
             },
			 
			 {
                 "id": "15:05",
                 "value": "15:05"
             },
			 {
                 "id": "15:10",
                 "value": "15:10"
             },
			 {
                 "id": "15:15",
                 "value": "15:15"
             },
			{
                 "id": "15:20",
                 "value": "15:20"
             },
			{
                 "id": "15:25",
                 "value": "15:25"
             },
			 {
                 "id": "15:30",
                 "value": "15:30"
             },
			 {
                 "id": "15:35",
                 "value": "15:35"
             },
			 {
                 "id": "15:40",
                 "value": "15:40"
             },
			 
			 {
                 "id": "15:45",
                 "value": "15:45"
             }, 
			 {
                 "id": "15:50",
                 "value": "15:50"
             },
			 {
                 "id": "15:55",
                 "value": "15:55"
             }, 
			 {
                 "id": "16:00",
                 "value": "16:00"
             }, 
			 {
                 "id": "16:05",
                 "value": "16:05"
             },
			 {
                 "id": "16:10",
                 "value": "16:10"
             },
			 {
                 "id": "16:15",
                 "value": "16:15"
             },
			{
                 "id": "16:20",
                 "value": "16:20"
             },
			{
                 "id": "16:25",
                 "value": "16:25"
             },
			 {
                 "id": "16:30",
                 "value": "16:30"
             },
			 {
                 "id": "16:35",
                 "value": "16:35"
             },
			 {
                 "id": "16:40",
                 "value": "16:40"
             },
			 
			 {
                 "id": "16:45",
                 "value": "16:45"
             }, 
			 {
                 "id": "16:50",
                 "value": "16:50"
             },
			 {
                 "id": "16:55",
                 "value": "16:55"
             },
			 {
                 "id": "17:00",
                 "value": "17:00"
             }, 
			 {
                 "id": "17:05",
                 "value": "17:05"
             },
			 {
                 "id": "17:10",
                 "value": "17:10"
             },
			 {
                 "id": "17:15",
                 "value": "17:15"
             },
			{
                 "id": "17:20",
                 "value": "17:20"
             },
			{
                 "id": "17:25",
                 "value": "17:25"
             },
			 {
                 "id": "17:30",
                 "value": "17:30"
             },
			 {
                 "id": "17:35",
                 "value": "17:35"
             },
			 {
                 "id": "17:40",
                 "value": "17:40"
             },
			 
			 {
                 "id": "17:45",
                 "value": "17:45"
             }, 
			 {
                 "id": "17:50",
                 "value": "17:50"
             },
			 {
                 "id": "17:55",
                 "value": "17:55"
             },
			 {
                 "id": "18:00",
                 "value": "18:00"
             },
			 {
                 "id": "18:05",
                 "value": "18:05"
             },
			 {
                 "id": "18:10",
                 "value": "18:10"
             },
			 {
                 "id": "18:15",
                 "value": "18:15"
             },
			{
                 "id": "18:20",
                 "value": "18:20"
             },
			{
                 "id": "18:25",
                 "value": "18:25"
             },
			 {
                 "id": "18:30",
                 "value": "18:30"
             },
			 {
                 "id": "18:35",
                 "value": "18:35"
             },
			 {
                 "id": "18:40",
                 "value": "18:40"
             },
			 
			 {
                 "id": "18:45",
                 "value": "18:45"
             }, 
			 {
                 "id": "18:50",
                 "value": "18:50"
             },
			 {
			 
                 "id": "18:55",
                 "value": "18:55"
             },
			 {
                 "id": "19:00",
                 "value": "19:00"
             }, 
			 {
                 "id": "19:05",
                 "value": "19:05"
             },
			 {
                 "id": "19:10",
                 "value": "19:10"
             },
			 {
                 "id": "19:15",
                 "value": "19:15"
             },
			{
                 "id": "19:20",
                 "value": "19:20"
             },
			{
                 "id": "19:25",
                 "value": "19:25"
             },
			 {
                 "id": "19:30",
                 "value": "19:30"
             },
			 {
                 "id": "19:35",
                 "value": "19:35"
             },
			 {
                 "id": "19:40",
                 "value": "19:40"
             },
			 
			 {
                 "id": "19:45",
                 "value": "19:45"
             }, 
			 {
                 "id": "19:50",
                 "value": "19:50"
             },
			 {
                 "id": "19:55",
                 "value": "19:55"
             },
			 {
                 "id": "20:00",
                 "value": "20:00"
             }, 
			 {
                 "id": "20:05",
                 "value": "20:05"
             },
			 {
                 "id": "20:10",
                 "value": "20:10"
             },
			 {
                 "id": "20:15",
                 "value": "20:15"
             },
			{
                 "id": "20:20",
                 "value": "20:20"
             },
			{
                 "id": "20:25",
                 "value": "20:25"
             },
			 {
                 "id": "20:30",
                 "value": "20:30"
             },
			 {
                 "id": "20:35",
                 "value": "20:35"
             },
			 {
                 "id": "20:40",
                 "value": "20:40"
             },
			 
			 {
                 "id": "20:45",
                 "value": "20:45"
             }, 
			 {
                 "id": "20:50",
                 "value": "20:50"
             },
			 {
                 "id": "20:55",
                 "value": "20:55"
             },
			 {
                 "id": "21:00",
                 "value": "21:00"
             }, 
			 {
                 "id": "21:05",
                 "value": "21:05"
             },
			 {
                 "id": "21:10",
                 "value": "21:10"
             },
			 {
                 "id": "21:15",
                 "value": "21:15"
             },
			{
                 "id": "21:20",
                 "value": "21:20"
             },
			{
                 "id": "21:25",
                 "value": "21:25"
             },
			 {
                 "id": "21:30",
                 "value": "21:30"
             },
			 {
                 "id": "21:35",
                 "value": "21:35"
             },
			 {
                 "id": "21:40",
                 "value": "21:40"
             },
			 
			 {
                 "id": "21:45",
                 "value": "21:45"
             }, 
			 {
                 "id": "21:50",
                 "value": "21:50"
             },
			 {
                 "id": "21:55",
                 "value": "21:55"
             }, {
                 "id": "22:00",
                 "value": "22:00"
             }, 
			 {
                 "id": "22:05",
                 "value": "22:05"
             },
			 {
                 "id": "22:10",
                 "value": "22:10"
             },
			 {
                 "id": "22:15",
                 "value": "22:15"
             },
			{
                 "id": "22:20",
                 "value": "22:20"
             },
			{
                 "id": "22:25",
                 "value": "22:25"
             },
			 {
                 "id": "22:30",
                 "value": "22:30"
             },
			 {
                 "id": "22:35",
                 "value": "22:35"
             },
			 {
                 "id": "22:40",
                 "value": "22:40"
             },
			 
			 {
                 "id": "22:45",
                 "value": "22:45"
             }, 
			 {
                 "id": "22:50",
                 "value": "22:50"
             },
			 {
                 "id": "22:55",
                 "value": "22:55"
             },
			 {
                 "id": "23:00",
                 "value": "23:00"
             }, 
			 {
                 "id": "23:05",
                 "value": "23:05"
             },
			 {
                 "id": "23:10",
                 "value": "23:10"
             },
			 {
                 "id": "23:15",
                 "value": "23:15"
             },
			{
                 "id": "23:20",
                 "value": "23:20"
             },
			{
                 "id": "23:25",
                 "value": "23:25"
             },
			 {
                 "id": "23:30",
                 "value": "23:30"
             },
			 {
                 "id": "23:35",
                 "value": "23:35"
             },
			 {
                 "id": "23:40",
                 "value": "23:40"
             },
			 
			 {
                 "id": "23:45",
                 "value": "23:45"
             }, 
			 {
                 "id": "23:50",
                 "value": "23:50"
             },
			 {
                 "id": "23:55",
                 "value": "23:55"
             },];
             outObj = {
                 xtype: "combo",
                 //editable: false,
                 maskRe: /[0-9]/,
                 store: Ext.create('Ext.data.Store', {
                     storeId: inObj.timeid + '_cbostore',
                     model: 'combo_model',
                     data: tmpData
                 }),
                 queryMode: "local",
                 queryDelay: 5,				 
                 queryCaching: false,
                 displayField: "value",
                 matchFieldWidth: false,
                 valueField: "id",
				 value:"06:00",
                 typeAhead: true,
                 hideTrigger: false,
                 listeners: {
                     /*
                     "select":function( combo, records, eOpts)
                     {	
                     	if(inObj.keyField != undefined)
                     		parentForm.queryById(inObj.keyField).setValue(combo.getValue());
                     },
                     */
                     beforequery: function(record) {
                         record.query = new RegExp(record.query, 'i');
                         record.forceAll = true;
                         return true;
                     }
                 },
                 columnWidth: .4,
                 fieldCls: "c-fieldctrl",
                 inputWrapCls: "x-form-text-wrap c-fieldctrlwrap",
                 triggerBaseCls: "c-triggerbtn"
             }

             if (inObj.timeid != undefined) outObj.itemId = inObj.timeid
             if (inObj.mandatory != undefined) {
                 outObj.allowBlank = false
                 outObj.blankText = inObj.label + " cannot be blank."
             }
             return outObj;
         },
         /*code for Custom Time Control ends here*/
         /*
         addDateTime:function(inObj)
         {	
         	
         	outObj = Ext.create("CueTrans.lib.control.datetimectrl",{
         		Label:inObj.Label,
         		itemId:inObj.id,
         		//id:inObj.id,
         		//Value:inObj.Value,
         		Increment:inObj.Increment
         	})	
         	
         	//return outObj;
         	return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:outObj};
         },
		
         addCustomTime:function(inObj)
         {				
         	outObj = Ext.create("CueTrans.lib.control.Time",{
         		Label:inObj.Label,
         		itemId:inObj.id,
         		//id:inObj.id,
         		//Value:inObj.Value,
         		Increment:inObj.Increment
         	})				
         	//return outObj;
         	return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:outObj};
         },		
         addPlainDateTime:function(inObj)
         {		
         	
         	outObj = Ext.create("CueTrans.lib.control.datetimectrl",{
         		Label:inObj.label,
         		//id:inObj.id,
         		//Value:inObj.Value,
         		Increment:inObj.Increment
         	})		
         	
         	if(inObj.columnWidth != undefined)
         		outObj.columnWidth=inObj.columnWidth;
         	else
         		outObj.columnWidth=plf.getColumnwidth();
         		
         	outObj.labelWidth=plf.labelWidth			
         	return outObj;
         	//return {xtype:'container',columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),items:outObj};
         },*/
         /*Code added by Rajiv R for id:57336 starts here*/
         addSVGObject: function(inObj) {
             outObj = Ext.create("CueTrans.lib.svgObject", {
                 svgFileName: inObj.svgFileName,
                 svgID: inObj.svgID
             })
             if (inObj.id != undefined) outObj.itemId = inObj.id
                 /*code added for id: 57410 starts here*/
             if (inObj.columnWidth != undefined)
                 outObj.columnWidth = inObj.columnWidth;
             else
                 outObj.columnWidth = plf.getColumnwidth();
             /*code added for id: 57410 ends here*/
             return outObj;
         },
         /*code added for id: 57410 starts here*/
         addGRAPHObject: function(inObj) {
             var tmpChartType = "line"

             if (inObj.chartType != undefined) tmpChartType = inObj.chartType

             outObj = Ext.create("CueTrans.lib.GraphObject", {
                 graphHdr: inObj.graphHdr,
                 id: inObj.id,
                 xAxisCaption: inObj.xAxisCaption,
                 chartType: tmpChartType,
                 yAxisCaption: inObj.yAxisCaption
             })
             if (inObj.id != undefined) outObj.itemId = inObj.id

             if (inObj.columnWidth != undefined)
                 outObj.columnWidth = inObj.columnWidth;
             else
                 outObj.columnWidth = plf.getColumnwidth();

             return outObj;
         },
         /*code added for id: 57410 ends here*/
         /*addGRAPHObject:function(inObj)
         {	
         	//model			
         	Ext.define(inObj.id+'_model', 
         	{
         		extend: 'Ext.data.Model',
         		requires: ['Ext.data.SequentialIdGenerator'],
         		idProperty: 'id',
         		idgen:'sequential',
         		fields:[
         				{ name:'yaxis', type:'Numeric' },
         				{ name:'xaxis', type:'string' }
         			]
         	})
         	
         	//store
         	Ext.create("Ext.data.Store",
         					{
         						storeId:inObj.id+'_store',
         						model:inObj.id+'_model'
         						
         					})	
         	outObj =
         	{
         	store:Ext.data.StoreManager.lookup(inObj.id+'_store')
         	}
         	outObj = Ext.create("CueTrans.lib.graphobj",{
         		graphID:inObj.id+'_store'
         	})		
         	
         	if(inObj.id != undefined) outObj.itemId=inObj.id
         	
         	return outObj;
         },*/
         /*Code added by Rajiv R for id:57336 ends here*/
         /*
         Blank / &nbsp; Control.
         Usage : Used in to fill space in header / search sections.
         */
         addGraph: function(inObj, parentForm) {
             var tmpGraphProp = {
                 chartType: inObj.chartType
             }
             if (inObj.xAxisCaption != undefined) tmpGraphProp.xAxisCaption = inObj.xAxisCaption
             if (inObj.ChartTitle != undefined) tmpGraphProp.ChartTitle = inObj.ChartTitle
             if (inObj.yAxisCaption != undefined) tmpGraphProp.yAxisCaption = inObj.yAxisCaption
             if (inObj.chartHeight != undefined) tmpGraphProp.chartHeight = inObj.chartHeight
             if (inObj.chartWidth != undefined) tmpGraphProp.chartWidth = inObj.chartWidth
             if (inObj.lnkID != undefined) tmpGraphProp.lnkID = inObj.lnkID
             if (inObj.labelRotate != undefined) tmpGraphProp.labelRotate = inObj.labelRotate
             if (parentForm != undefined) tmpGraphProp.parentForm = parentForm;

             if (inObj.id != undefined) {
                 tmpGraphProp.itemId = inObj.id
                 tmpGraphProp.chartId = inObj.id
             }

             outObj = Ext.create("CueTrans.lib.control.svgGraph", tmpGraphProp)

             if (inObj.id != undefined) outObj.itemId = inObj.id


             var tmpColumnWidth;
             if (inObj.columnWidth != undefined)
                 tmpColumnWidth = inObj.columnWidth;
             else
                 tmpColumnWidth = 1


             var outPanel = Ext.create("Ext.panel.Panel", {
                 padding: 10,
                 title: "Testing",
                 columnWidth: tmpColumnWidth,
                 items: outObj
             })


             return outPanel;
         },
		 addMultiSelect: function(inObj) {
			 var tmpvisibleRow = 12;
		     if(inObj.visibleRow != undefined)
				tmpvisibleRow = inObj.visibleRow
				
             outObj = Ext.create("CueTrans.lib.control.cueMultiSelect", 
						{
						ctrlId:inObj.id,
						mapgridid:inObj.mapgridid,
						unmapgridid:inObj.unmapgridid,
						keycolumn:inObj.keycolumn,
						mapdetail:inObj.mapdetail,
						unmapdetail:inObj.unmapdetail,
						visibleRow:tmpvisibleRow
						})
             if (inObj.id != undefined) outObj.itemId = inObj.id
             return outObj;			
		 },
         addChart: function(inObj, parentForm) {
             var tmpGraphProp = {}
			 var tmpChartType='Cartesian'
			 if (inObj.chartType != undefined) tmpChartType = inObj.chartType;
			 if (inObj.xAxisColumn != undefined) tmpGraphProp.chartType = tmpChartType;			 
             if (inObj.xAxisColumn != undefined) tmpGraphProp.xAxisColumn = inObj.xAxisColumn;

             if (inObj.xAxisCaption != undefined) tmpGraphProp.xAxisCaption = inObj.xAxisCaption
             if (inObj.yAxisCaption != undefined) tmpGraphProp.yAxisCaption = inObj.yAxisCaption
             if (inObj.seriesArray != undefined) tmpGraphProp.seriesArray = inObj.seriesArray;
			 if (inObj.stacked != undefined) tmpGraphProp.stacked = inObj.stacked;

             if (inObj.chartTitle != undefined) tmpGraphProp.chartTitle = inObj.chartTitle

             if (inObj.chartTheme != undefined) tmpGraphProp.chartTheme = inObj.chartTheme
             if (inObj.chartHeight != undefined) tmpGraphProp.chartHeight = inObj.chartHeight
             if (inObj.chartWidth != undefined) tmpGraphProp.chartWidth = inObj.chartWidth
             if (parentForm != undefined) tmpGraphProp.parentForm = parentForm;
             if (inObj.heightFactor != undefined) tmpGraphProp.heightFactor = inObj.heightFactor
	      if (inObj.MoneySeparator!= undefined) tmpGraphProp.MoneySeparator= inObj.MoneySeparator	      
	      if (inObj.showStack!= undefined) tmpGraphProp.showStack= inObj.showStack
             if (inObj.popScreen != undefined) tmpGraphProp.popScreen = inObj.popScreen
             if (inObj.popSeriesCtrl != undefined) tmpGraphProp.popSeriesCtrl = inObj.popSeriesCtrl
             if (inObj.popValueCtrl != undefined) tmpGraphProp.popValueCtrl = inObj.popValueCtrl
			 if (inObj.popMethodName != undefined) tmpGraphProp.popMethodName = inObj.popMethodName
             if (inObj.showLegend != undefined) tmpGraphProp.showLegend = inObj.showLegend
			 if (inObj.chartColors != undefined) tmpGraphProp.chartColors = inObj.chartColors

             if (inObj.id != undefined) {
                 tmpGraphProp.itemId = inObj.id
                 tmpGraphProp.chartId = inObj.id
             }

             var tmpColumnWidth;
             if (inObj.columnWidth != undefined)
                 tmpColumnWidth = inObj.columnWidth;
             else
                 tmpColumnWidth = 1

             tmpGraphProp.columnWidth = tmpColumnWidth
             outObj = Ext.create("CueTrans.lib.control.cueChart", tmpGraphProp)
             if (inObj.id != undefined) outObj.itemId = inObj.id

             /*
             var outPanel = Ext.create("Ext.panel.Panel",{
             		padding:10,
             		title:"Testing",
             		columnWidth:tmpColumnWidth,
             		items:outObj
             	})
             */
             return outObj;
         },
         addSvg: function(inObj, parentForm) {
             /*
             if(inObj.width == undefined)
             {
             	inObj.width=plf.gAW(1250)
             }
             if(inObj.height == undefined)
             {
             	inObj.height=plf.gAH(330)
             }
             */

             var tmpSVGProp = {
                 svgURL: inObj.svgURL
             }
             if (inObj.svgData != undefined) tmpSVGProp.svgData = inObj.svgData
             if (inObj.svgLinks != undefined) tmpSVGProp.svgLinks = inObj.svgLinks
                 //if(inObj.svgObjData != undefined) tmpSVGProp.svgObjData=inObj.svgObjData
                 //if(inObj.svgHeight != undefined) tmpSVGProp.svgHeight=inObj.svgHeight
                 //if(inObj.svgWidth != undefined) tmpSVGProp.svgWidth=inObj.svgWidth
             if (parentForm != undefined) tmpSVGProp.form_obj = parentForm;
             if (inObj.heightFactor != undefined) tmpSVGProp.heightFactor = inObj.heightFactor
                 //console.log(tmpSVGProp)
             var tmpColumnWidth;
             if (inObj.columnWidth != undefined)
                 tmpColumnWidth = inObj.columnWidth;
             else
                 tmpColumnWidth = 1

             tmpSVGProp.columnWidth = tmpColumnWidth
             outObj = Ext.create("CueTrans.lib.control.cueSvg", tmpSVGProp)
                 //outObj = Ext.create("CueTrans.lib.control.svgControl",tmpSVGProp)

             if (inObj.id != undefined) outObj.itemId = inObj.id
                 /*code added for id: 57410 starts here*/

             /*code added for id: 57410 ends here*/
             return outObj;
         },
         addBlankBlock: function(inObj) {
             outObj = {
                 html: "&nbsp;",
                 border: false
             }
             if (inObj.columnWidth != undefined)
                 outObj.columnWidth = inObj.columnWidth
             else
                 columnWidth: plf.getColumnwidth()

             return outObj
         },
         getColumnwidth: function() {
             //plf.columns=3;
             return (1 / plf.columns)
         },

         getContainerCls: function() {
             //plf.columns=3;
             if (plf.columns == 1) {
                 return "c-fieldcontainer_odd";
             }
             if (plf.columns % 2 == 1) {
                 if (plf.controlCounter % plf.columns == 0 || plf.controlCounter % plf.columns == 2) {
                     plf.controlCounter++;
                     return "c-fieldcontainer_odd";
                 } else {
                     plf.controlCounter++;
                     return "c-fieldcontainer_even"
                 }
             } else {
                 if (plf.controlCounter % 2 == 0) {
                     plf.controlCounter++;
                     return "c-fieldcontainer_odd";
                 } else {
                     plf.controlCounter++;
                     return "c-fieldcontainer_even"
                 }
             }
         },
         /*
         Grid / Multi-line  Control
         Features:
         	1) Add  / Delete  Row
         	2) Export to Excel, Word, PDF (Pending)
         	3) "Editable" columns.
         	4) "Combo"  columns.
         	5) "Date" Columns.
         	6) "Hyperlink" columns.
         	7) "Paging" (Pending)
         	8) "Hidden" columns
         	
         Input Array Format:
         header : Column Header
         dataname : Record set field name.
         width : Column width
         datatype : Column datatype (String,Numeric)
         editControl : 
         	"textbox" : Editable text field column
         	"combo" : Combo field column
         	"date" : Calender field column
         linkId : Hyperlink column. "Link ID" defined in "screenLinks" section should be mapped.
		
         */
         addDataView: function(inObj, parentForm) {
             var tmpFieldObjArr = [];
             var tmpLinkColumn = {};
             var tmpColumnNo
             tmpColumnNo = 1
             inObj.detail.forEach(function(detail_obj) {
                 tmpFieldObj = {};
                 if (detail_obj.dataname != undefined) {
                     tmpFieldObj.name = detail_obj.dataname
                 }
                 if (detail_obj.datatype != undefined) {
                     tmpFieldObj.type = detail_obj.datatype
                     if (detail_obj.datatype == 'int' || detail_obj.datatype == 'integer') tmpFieldObj.useNull = true
                 }
                 tmpFieldObjArr.push(tmpFieldObj);
                 if (detail_obj.linkId != undefined) {
                     tmpLinkColumn[tmpColumnNo] = {
                         "linkId": detail_obj.linkId
                     }
                 }
                 tmpColumnNo = tmpColumnNo + 1;
             });

             /*
             	DataView Model defined.
             */
             Ext.define(inObj.id + '_model', {
                 extend: 'Ext.data.Model',
                 requires: ['Ext.data.identifier.Sequential'],
                 idProperty: 'id',
                 identifier: 'sequential',
                 fields: tmpFieldObjArr
             });
             /*
             	Grid Store created.
             */

             Ext.create("Ext.data.Store", {
                 storeId: inObj.id + '_store',
                 model: inObj.id + '_model'
             })

             dataviewPropObj = {
                 store: Ext.data.StoreManager.lookup(inObj.id + '_store'),
                 tpl: inObj.tbl,
                 itemSelector: inObj.itemSelector,
                 title: "Employee",
                 style: 'overflow:auto;',
                 listeners: {
                     'itemclick': function(view, record, item, idx, event, opts) {
                         var gridStore = Ext.data.StoreManager.lookup(inObj.id + '_store');
                         //parentForm.processHLink("driverMaster",record)	
                         if (inObj.dataviewlnk != undefined && inObj.dataviewlnk != "")
                             parentForm.processHLink(inObj.dataviewlnk, record)
                             //console.log(event.item.innerHTML,record,"Rajiv");
                     }
                 }
             }
             dataviewPropObj.height = 500;
             outObj = Ext.create('Ext.view.View', dataviewPropObj)
             return outObj;
         },
         addGrid: function(inObj, parentForm) {

             /*
             	"tmpFieldObjArr" will  be used to hold Field definitions.
             	This will be used in Grid Store creation.
             */
             var tmpFieldObjArr = [];

             /*
             	"tmpColumnObjArr" will  be used to hold Column definitions.
             	This will be used in Grid field definition.
             */
             var tmpColumnObjArr = [];
             var tmpColumnGroupObjArr = [];
             /*
             	"tmpLinkColumn" will be used to hold hyper link related definitions.
             	This information will be used in processing hyperlinks.
             */
             var tmpLinkColumn = {};

             var gridOffsetheight = 102;

             /*
             Default Definitions
             */
             if (inObj.visibleRow == undefined) {
                 inObj.visibleRow = 5;
             }



             tmpFieldObjArr.push({
                 name: "id",
                 type: "string"
             })

             /*
             	Rownumber column  creation.
             */
             var hdnColumn = false;
             if (inObj.removeColumns)
                 hdnColumn = true;
             tmpColumnObjArr.push({
                 xtype: "rownumberer",
                 header: "",
                 width: 45,
                 align: 'center',
                 hidden: hdnColumn
             })

             /*
             	Checkbox column creation. 
             	This check box will be used for row deletions, header link processing.
             */
             var tmpColumnNo
             tmpColumnNo = 1

             if (inObj.readonly == undefined) {
                 tmpColumnObjArr.push({
                     xtype: "checkcolumn",
                     header:'<input type="checkbox"  onclick=gridHdrCheckboxAllClick(this,"'+inObj.id + '_store","select")>&nbsp;',
                     text: 'Y',
                     dataIndex: 'select',
                     width: 25,
					 sortable:false,
                     hideable: false,
                     listeners: {
                         checkchange: function(column, recordIndex, checked) 
						 {
							var lblSelectedID=inObj.id+"_selectedRowCnt";
							var recCount;
							var ChkCount=0;
							var tmpGridStore = Ext.data.StoreManager.lookup(inObj.id+"_store");
							if (tmpGridStore.proxy.enablePaging == undefined)
							{
								recCount=tmpGridStore.getCount();
								tmpGridStore.each(function(rec)
								{
										if(rec.get("select"))
										{
											ChkCount=ChkCount+1
										}
								}); 
								
							}
							else
							{
								recCount=tmpGridStore.getTotalCount();
								var recorddata = tmpGridStore.getProxy().getReader().rawData;
								Ext.each(recorddata, function(rec) 
								{	
									console.log(rec,"rec" );
									if(rec.select)
									{
									ChkCount=ChkCount+1
									}
								 })
							}
							if (form_obj.queryById(lblSelectedID) !=undefined)
							{
							form_obj.queryById(lblSelectedID).setText(ChkCount + " of " +recCount );
							}
							
                             var myGrid = parentForm.queryById(inObj.id);
                             if (checked)
                                 Ext.fly(myGrid.getView().getNode(recordIndex)).addCls("myHighlightRow");
                             else
                                 Ext.fly(myGrid.getView().getNode(recordIndex)).removeCls("myHighlightRow");
                         }
                     }
                 })
                 tmpColumnNo = 2
             }

             tmpFieldObjArr.push({
                 name: "select",
                 datatype: "string",
                 defaultValue: false
             })

             /*RowHighlighter- Starts*/
             if (inObj.rowHighlight != undefined) {
                 tmpFieldObjArr.push({
                     name: "rowColor",
                     datatype: "string",
                     defaultValue: "blank"
                 })
             }
             /*RowHighlighter- Ends*/

             /*
             	recStatus - Flag to differentiate Inserted / Deleted Records.
             */
             //tmpFieldObjArr.push({name:"recStatus",datatype:"string",defaultValue:false})
             tmpFieldObjArr.push({
                 name: "recStatus",
                 datatype: "string",
                 defaultValue: ""
             })

             inObj.detail.forEach(function(detail_obj) {
                 tmpFieldObj = {};
                 tmpColumnObj = {
                     hideable: false
                 };

                 /*
                 	Field Name in Model/Store created and mapped.
                 */
                 if (detail_obj.dataname != undefined) {
                     tmpFieldObj.name = detail_obj.dataname
                     tmpColumnObj.dataIndex = detail_obj.dataname
                 }

                 /*
                 	Column header created.
                 */
                 if (detail_obj.group != undefined) 
		    {
			tmpColumnGroupObjArr = [];
                     if (detail_obj.group != undefined) tmpColumnObj.header = detail_obj.group
                     detail_obj.dtl.forEach(function(obj) {
                         tmpColumnGroupObjArr.push({
                             "header": obj.columnname,
                             "dataIndex": obj.dataname
                         });
                         tmpColumnObj["columns"] = tmpColumnGroupObjArr
                     })
                 } else
                 if (detail_obj.columnname != undefined) {
                     var tmpColumnName = plf.replaceAll(detail_obj.columnname, "<BR>", " ");
                     tmpColumnName = plf.replaceAll(tmpColumnName, "<br>", " ");
                     tmpColumnObj.header = tmpColumnName;
                 }


                 //tmpColumnGroupObj=tmpColumnObj;
                 //console.log(tmpColumnGroupObj,"tmpColumnGroupObj");
                 /*
                 	Column width defined.
                 */

                 if (detail_obj.width != undefined) {
                     if (detail_obj.width == "auto") {
                         tmpColumnObj.autoSizeColumn = true
                     } else {
                         if (inObj.widthBasis != undefined) {
                             tmpColumnObj.flex = detail_obj.width
                         } else {
                             tmpColumnObj.width = detail_obj.width
                         }
                     }
                 }


                 //tmpColumnObj.flex= 1
                 //tmpColumnObj.autoSizeColumn= true

                 /*
                 	Column datatype defined.
                 */
                 if (detail_obj.datatype != undefined) {
                     tmpFieldObj.type = detail_obj.datatype
                     if (detail_obj.datatype == 'int' || detail_obj.datatype == 'integer') tmpFieldObj.useNull = true
                     if (detail_obj.datatype == 'date') {
                         tmpFieldObj.type = 'string'
                         tmpFieldObj.sortType = function(value) {
                             return Ext.Date.parse(value, plf.defDateFormat)
                         }

                     }

                 }
                 /*	
                 	Hidden attribute applied.
                 */
                 if (detail_obj.hidden != undefined) tmpColumnObj.hidden = detail_obj.hidden

                 /*
                 	Editor definitions.
                 */
                 if (detail_obj.editControl != undefined) 
				 {
					 if (detail_obj.editControl == "RegexTime") 
					 {
					 var tmpTextEditorInputObj = {};
					 tmpTextEditorInputObj["gridFlag"] = true;
					 tmpColumnObj.editor = plf.addPlainRegexTime(tmpTextEditorInputObj)
					 }
                     if (detail_obj.editControl == "textbox") 
					 {
                         var tmpTextEditorInputObj = {};
                         if (detail_obj.inputFormat != undefined) {
                             tmpTextEditorInputObj["inputFormat"] = detail_obj.inputFormat
                         }
                         if (detail_obj.InputPrecision != undefined) {
                             tmpTextEditorInputObj["InputPrecision"] = detail_obj.InputPrecision
                         }
                         if (detail_obj.InputLength != undefined) {
                             tmpTextEditorInputObj["InputLength"] = detail_obj.InputLength
                         }
						 if (detail_obj.weightPrecision != undefined) {
                             tmpTextEditorInputObj["weightPrecision"] = detail_obj.weightPrecision
                         }
						 if (detail_obj.volumePrecision != undefined) {
                             tmpTextEditorInputObj["volumePrecision"] = detail_obj.volumePrecision
                         }
						 if (detail_obj.qtyPrecision != undefined) {
                             tmpTextEditorInputObj["qtyPrecision"] = detail_obj.qtyPrecision
                         }

                         if (detail_obj.helpid != undefined) {
                             tmpTextEditorInputObj["hlpLinkID"] = detail_obj.helpid
                             tmpTextEditorInputObj["grideventid"] = detail_obj.onenter
                             tmpTextEditorInputObj["gridFlag"] = true;
                             tmpColumnObj.editor = plf.addPlainHlpText(tmpTextEditorInputObj, parentForm)
                         } else {
                             tmpTextEditorInputObj["gridFlag"] = true;
                             tmpColumnObj.editor = plf.addPlainText(tmpTextEditorInputObj)
                         }

                         if (detail_obj.onenter != undefined) {
                             tmpColumnObj.editor.listeners = {
                                 "specialkey": function(controlobj, eventobj) {
                                     if (eventobj.getKey() == eventobj.ENTER) {
                                         var selectedRecord = parentForm.queryById(inObj.id).getSelectionModel().getSelection()[0]
                                         this.ownerCt.completeEdit();
                                         parentForm.ProcessGridOnEnter(inObj.id, selectedRecord.getId(), detail_obj.onenter);

                                     }
                                 }
                             }
                         }
                     }
                     if (detail_obj.editControl == "combo") {
                         tmpColumnObj.editor = plf.addPlainCombo({
                             "id": detail_obj.storeId,
                             "gridFlag": true,
                             "columnWidth": 1
                         });
                         /*
                         Without the Render method, Instead of Combo "Value", Combo "Code" are displayed.
                         */
                         tmpColumnObj.renderer = function(val) {
                             /*
                             Logic:
                             Based on the "code", find the  record from "combo" store.
                             Fetch the "value" of the above  record.
                             */
                             var record = Ext.data.StoreManager.lookup(detail_obj.storeId + '_cbostore').findRecord("id", val)
                             return record ? record.get("value") : ""
                         }
                     }
					 if (detail_obj.editControl == "checkbox") 
					 {
						/*
                         tmpColumnObj.editor = plf.addPlainCheckBox({                             
                             "gridFlag": true,
                             "columnWidth": 1
                         });
                         */
						/*
							Checkbox will have 4 values:
							0 - Unchecked. Enabled.
							1 - Checked. Enabled.
							2 - Unchecked. Disabled.
							3 - Checked. Disabled.
						*/
						
						tmpColumnObj.editor= {xtype:"checkbox"}
						tmpColumnObj.header= '<input type="checkbox"  onclick=gridHdrCheckboxClick(this,"'+inObj.id + '_store","'+detail_obj.dataname+'")>&nbsp;'+tmpColumnObj.header 
						tmpColumnObj.sortable=false;
						tmpColumnObj.getEditor=function(record)
						{
							if (record.get(detail_obj.dataname)>=2)
							{
								return false;
							}
							else
								return Ext.create("Ext.form.field.Checkbox")
						}
						
						tmpColumnObj.renderer = function(val) 
						{
							if (val == "1") {
								return '<div class="x-grid-cell-inner x-grid-cell-inner-checkcolumn" style="text-align:center;"><img class="x-grid-checkcolumn-checked x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="></div>';
							} else if (val == "2") {
								return '<div class="gridCheckboxDisabled x-grid-cell-inner x-grid-cell-inner-checkcolumn" style="text-align:center;"><img class="x-grid-checkcolumn x-grid-checkcolumn " src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="></div>';
							} else if (val == "3") {
								return '<div class="gridCheckboxDisabled x-grid-cell-inner x-grid-cell-inner-checkcolumn" style="text-align:center;"><img class="x-grid-checkcolumn-checked x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="></div>';
							} else {
								return '<div class="x-grid-cell-inner x-grid-cell-inner-checkcolumn" style="text-align:center;"><img class="x-grid-checkcolumn x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="></div>';
							}
							
						};
                     }
                     if (detail_obj.editControl == "time") {

                         tmpColumnObj.editor = plf.addPlainTime({
                             "id": detail_obj.storeId,
                             "gridFlag": true,
                             "columnWidth": 1
                         });
                         //console.log(tmpColumnObj.editor,"Rajiv R");
                         /*
                         Without the Render method, Instead of Combo "Value", Combo "Code" are displayed.
                         */
                         tmpColumnObj.renderer = function(val) {

                             /*
                             Logic:
                             Based on the "code", find the  record from "combo" store.
                             Fetch the "value" of the above  record.
                             */
                             var record = Ext.data.StoreManager.lookup(detail_obj.storeId + '_cbostore').findRecord("id", val)
                             return record ? record.get("value") : ""
                         }
                     }
                     if (detail_obj.editControl == "listcombo") {
                         tmpColumnObj.editor = plf.addPlainListCombo({
                             "id": detail_obj.storeId,
                             "gridFlag": true,
                             "columnWidth": 1,
                             "model": detail_obj.model,
                             "tbl": detail_obj.tbl
                         });
                         /*
                         Without the Render method, Instead of Combo "Value", Combo "Code" are displayed.
                         */
                         tmpColumnObj.renderer = function(val) {
                             /*
                             Logic:
                             Based on the "code", find the  record from "combo" store.
                             Fetch the "value" of the above  record.
                             */
                             var record = Ext.data.StoreManager.lookup(detail_obj.storeId + '_cbostore').findRecord("id", val)
                             return record ? record.get("value") : ""
                         }
                     }
                     if (detail_obj.editControl == "listbox") {
                         tmpColumnObj.editor = plf.addPlainListEdit({
                             "id": detail_obj.storeId,
                             "gridFlag": true,
                             "columnWidth": 1
                         });
                         /*
                         Without the Render method, Instead of Combo "Value", Combo "Code" are displayed.
                         */
                         tmpColumnObj.renderer = function(val) {
                             /*
                             Logic:
                             Based on the "code", find the  record from "combo" store.
                             Fetch the "value" of the above  record.
                             */
                             var record = Ext.data.StoreManager.lookup(detail_obj.storeId + '_cbostore').findRecord("id", val)
                             return record ? record.get("value") : ""
                         }
                     }
                     if (detail_obj.editControl == "datetime") {
                         tmpColumnObj.editor = plf.addPlainDateTime({
                             "columnWidth": 1,
                             "gridFlag": true
                         });
                     }
                     if (detail_obj.editControl == "fileupload") {
                         tmpColumnObj.xtype = "actioncolumn"
                         tmpColumnObj.items = [{
                             iconCls: 'upload-icon',
                             tooltip: 'Click here to upload file.',
                             handler: function(grid, rowIndex, colIndex) {
                                 //var rec = grid.getStore().getAt(rowIndex);
                                 //alert("excel" + rowIndex + " " + colIndex);
                                 //plf.invokeFileUpload(grid, rowIndex, colIndex, detail_obj.fileGroup, detail_obj.dataname)
								 var tmpnameColumn=undefined;
								 if (detail_obj.nameColumn != undefined) {
									 tmpnameColumn = detail_obj.nameColumn
								 }
								 plf.invokeFileUpload(grid, rowIndex, colIndex, detail_obj.fileGroup, detail_obj.dataname,tmpnameColumn,inObj.id,parentForm)
                             }
                         }, {
                             iconCls: 'download-icon',
                             tooltip: 'Click here to download file.',
                             handler: function(grid, rowIndex, colIndex) {
                                 var rec = grid.getStore().getAt(rowIndex);
                                 var fieldName = detail_obj.dataname; //grid.headerCt.getGridColumns()[colIndex+1].dataIndex;
                                 var entityName = detail_obj.fileGroup;
                                 var filename = rec.get(fieldName);
								 if (filename =="")
								 {
								 Ext.Msg.alert('Failure', 'No file to download.');	
								 return;
								 }
                                 //parentForm.hdnIframe.update("<iframe src='" + "DownloadFileServlet?entityName=" + encodeURI(entityName) + "&fileName=" + encodeURI(filename) + "' style='display:none' />");
								 
								 var FilePath ="app";
								 //parentForm.hdnIframe.update("<iframe src='" + "DownloadFileServlet?filePath="+encodeURI(FilePath)+"&entityName="+encodeURI(entityName)+"&fileName="+encodeURI(filename) + "' style='display:none' />")
								 parentForm.hdnIframe.update("<iframe src='" + "DownloadFileServlet?filePath="+encodeURI(FilePath)+"&entityName="+encodeURI(entityName)+"&fileName="+encodeURI(filename) + "' style='display:none' />");
								 
                             }
                         }, {
                             iconCls: 'clear-icon',
                             tooltip: 'Click here to remove file.',
                             handler: function(grid, rowIndex, colIndex) {
                                 var rec = grid.getStore().getAt(rowIndex);
                                 var fieldName = detail_obj.dataname;
								 var filename = rec.get(fieldName);
								 if (filename =="")
								 {
								 Ext.Msg.alert('Failure', 'No file to remove.');									
								 }
								 else
								 {
									rec.set(fieldName, "");
									rec.set(detail_obj.nameColumn, "");
								 }
                                 //rec.set(fieldName, "")
                             }
                         }]
                     }
					 if (detail_obj.editControl == "filedownload") 
					 {
                         tmpColumnObj.xtype = "actioncolumn";
                         tmpColumnObj.items = [ 
						 {
                             iconCls: 'download-icon',
                             tooltip: 'Click here to download file.',
                             handler: function(grid, rowIndex, colIndex) {
                                 var rec = grid.getStore().getAt(rowIndex);
                                 var fieldName = detail_obj.dataname; //grid.headerCt.getGridColumns()[colIndex+1].dataIndex;
                                 var entityName = detail_obj.fileGroup;
                                 var filename = rec.get(fieldName);
                                 //parentForm.hdnIframe.update("<iframe src='" + "DownloadFileServlet?entityName=" + encodeURI(entityName) + "&fileName=" + encodeURI(filename) + "' style='display:none' />");
								 
								 var FilePath ="app";
								 //parentForm.hdnIframe.update("<iframe src='" + "DownloadFileServlet?filePath="+encodeURI(FilePath)+"&entityName="+encodeURI(entityName)+"&fileName="+encodeURI(filename) + "' style='display:none' />")
								 parentForm.hdnIframe.update("<iframe src='" + "DownloadFileServlet?filePath="+encodeURI(FilePath)+"&entityName="+encodeURI(entityName)+"&fileName="+encodeURI(filename) + "' style='display:none' />");
								 
                             }
                         }
						 ]
                     }
                     /*
                     if(detail_obj.editControl == "splitItenary")
                     {
                     	tmpColumnObj.xtype ="actioncolumn"
                     	tmpColumnObj.items=[
                     					{iconCls : 'split-icon',
                     						 handler: function(grid, rowIndex, colIndex)
                     						 {
                     								//var rec = grid.getStore().getAt(rowIndex);
                     								//alert("excel" + rowIndex + " " + colIndex);
                     								var gridStore = Ext.data.StoreManager.lookup(inObj.id+'_store');
                     								var newRecord = Ext.create(inObj.id+'_model',{"recStatus":"I"})
                     								//newRecord.setDirty();
                     								//gridStore.add(newRecord);
                     								gridStore.insert(rowIndex+1 ,newRecord);
                     								//plf.invokeFileUpload(grid, rowIndex, colIndex,detail_obj.fileGroup,detail_obj.dataname)
                     						}							
                     					}
                     	]
                     }
                     */
                     if (detail_obj.editControl == "date") {
                         //for date column, plf.addPlainDate cannot be used.

                         //tmpColumnObj.xtype = "datecolumn"
                         //tmpColumnObj.format=plf.defDateFormat
                         tmpFieldObj.type = 'string'
                         tmpColumnObj.editor = {
                                 xtype: 'datefield',
                                 allowBlank: true,
                                 format: plf.defDateFormat,
                                 submitFormat: plf.defDateFormat,
                                 maskRe: /[0-9-]/
                             }
                             /*
                             tmpColumnObj.editor.listeners=
                             	{
                             		"blur":
                             			function(dateCtrlObj)
                             			{
                             				console.log(dateCtrlObj)
                             				var selectedRecord=
                             				dateCtrlObj.ownerCt.grid.getSelectionModel().getSelection()[0]
                             				console.log(detail_obj.dataname,Ext.Date.format(dateCtrlObj.getValue(),plf.renderDateFormat))
                             				selectedRecord.set(detail_obj.dataname,Ext.Date.format(dateCtrlObj.getValue(),plf.renderDateFormat))
                             				
                             			}	
                             	}
                             */

                         if (detail_obj.type != undefined) {
                             tmpColumnObj.editor.readOnly = true;
                             tmpColumnObj.editor.hideTrigger = true;
                         }


                         /*
                         tmpColumnObj.renderer = function(val)
                         {
                         	if(val != "")
                         	{
                         		return Ext.Date.format(Ext.Date.parse(val,plf.defDateFormat),plf.renderDateFormat)
                         	}
                         	else
                         	{
                         		return ""
                         	}
                         }
                         */

                         /*
                         tmpColumnObj.editor= new Ext.form.DateField({
                         	allowBlank:true, 
                         	format:'d-m-Y', 
                         	renderer:Ext.util.Format.dateRenderer('d-m-Y')     
                         })
                         */
                         /*
                         Without the Render method, Date is displayed in long format.
                         */
                         /*
                         tmpColumnObj.renderer = function(val)
                         {
                         	var dt = new Date(val);
                         	return val=="" ? "" : Ext.Date.format(dt,"d-m-y")
                         }
                         */

                     }
                 }
                 if (detail_obj.renderer != undefined) {
                     tmpColumnObj.renderer = detail_obj.renderer
                 }
                 if (detail_obj.listeners != undefined) {
                     tmpColumnObj.listeners = detail_obj.listeners
                 }
                 /*
                 	Hyper-link Column definition
                 */
                 /*Code added for bug id:57355 starts here*/
                 if (detail_obj.popup != undefined) {
                     tmpLinkColumn[tmpColumnNo] = {
                         "popup": detail_obj.popup
                     }
                 }
                 if (detail_obj.gridpopup != undefined) {
                     tmpLinkColumn[tmpColumnNo] = {
                         "gridpopup": detail_obj.gridpopup
                     }
                 }
				 
				  if (detail_obj.editControl == "link") 
				 {
					tmpLinkColumn[tmpColumnNo] = {
                             "linktype": "link",
							 "url": detail_obj.url
                         }
					 tmpColumnObj.renderer = function(val) 
					 {
						  return "<div style='cursor: pointer;' title='" + detail_obj.tooltip + "' class='x-panel-header-text-container-default'><u>" + val + "</u></div>"
					 }
						 
				 }
				 
                 if (detail_obj.linkId != undefined && detail_obj.editControl == undefined) 
				 {
                     if (detail_obj.linkType != undefined) {
                         tmpLinkColumn[tmpColumnNo] = {
                             "linkId": detail_obj.linkId,
                             "linkType": "DYN"
                         }
                     } else if (detail_obj.popup != undefined) {
                         tmpLinkColumn[tmpColumnNo] = {
                             "popup": detail_obj.popup,
                             "linkId": detail_obj.linkId
                         }
                     } else if (detail_obj.gridpopup != undefined) {
                         tmpLinkColumn[tmpColumnNo] = {
                             "gridpopup": detail_obj.gridpopup,
                             "linkId": detail_obj.linkId
                         }
                     } 
					 else if (detail_obj.gridClick != undefined) 
					 {
                         tmpLinkColumn[tmpColumnNo] = 
						 {
                             "gridClick": detail_obj.gridClick,
                             "MethodName": detail_obj.MethodName,
                             "service": detail_obj.service,
							 "colName": detail_obj.colName
                         }
                     } 
					 else if (detail_obj.gridReport != undefined) 
					 {
                         tmpLinkColumn[tmpColumnNo] = 
						 {
                             "gridReport": detail_obj.gridReport
                         }
                     }
					 else if (detail_obj.type != undefined) 
					 {
                         tmpLinkColumn[tmpColumnNo] = {
                             "type": detail_obj.type,
                             "linkId": detail_obj.linkId,
							 "fileGroup": detail_obj.fileGroup,
							 "fieldName": detail_obj.dataname
                         }
					}
					 else 
					 {
                         tmpLinkColumn[tmpColumnNo] = 
						 {
                                 "linkId": detail_obj.linkId
                          }
                             //alert(tmpLinkColumn[tmpColumnNo].linkId)
                     } /*Code added for bug id:57355 ends here*/

                     /*Image Column*/
					 if (detail_obj.heading == undefined) 
					{					 
						 if (detail_obj.imageURL != undefined) {
							 tmpColumnObj.width = 28;
							 tmpColumnObj.header = "";
						 }
					}
                     tmpColumnObj.renderer = function(val) 
					 {
                         if (detail_obj.imageURL != undefined) 
						 {
                             if (val != undefined && val != ' ') {
                                 return "<div style='cursor: pointer;' class='grid_icon'><img width=16 src=" + detail_obj.imageURL + " title='" + plf.replaceAll(detail_obj.columnname, "<BR>", " ") + "'></img></div>"
                             } else {
                                 return "";
                             }
                         } 
						 else if (detail_obj.type != undefined) 
						 {
						 var str=val;
						 var pos = str.indexOf("_")+1;
						 var res = str.substr(0, pos);
						 var tmpVal=str.replace(res,""); 
						 
                         return "<div style='cursor: pointer;' title='" + detail_obj.tooltip + "' class='x-panel-header-text-container-default'><u>" + tmpVal + "</u></div>"
                         }
						 else {
                             return "<div style='cursor: pointer;' title='" + detail_obj.tooltip + "' class='x-panel-header-text-container-default'><u>" + val + "</u></div>"
                         }
                     };
                 }
                 /*Grid Popup Window starts here*/
                 if (detail_obj.popupid != undefined) {
                     tmpLinkColumn[tmpColumnNo] = {
                         "popupid": detail_obj.popupid
                     }
                     tmpColumnObj.renderer = function(val) {
                         return "<div style='cursor: pointer;' title='" + detail_obj.tooltip + "' class='x-panel-header-text-container-default'><u>" + val + "</u></div>"
                     }
                 }
                 /*Grid Popup Window ends here*/
                 /*Grid Click starts here*/
                 if (detail_obj.gridClick != undefined) {
                     tmpLinkColumn[tmpColumnNo] = {
                         "gridClick": detail_obj.gridClick,
                         "MethodName": detail_obj.MethodName,
                         "service": detail_obj.service,
						 "colName": detail_obj.colName,
						 "callbackMethod": detail_obj.callbackMethod
                     }
                     tmpColumnObj.renderer = function(val) {
                         return "<div style='cursor: pointer;' title='" + detail_obj.tooltip + "' class='x-panel-header-text-container-default'><u>" + val + "</u></div>"
                     }
                 }
				 if (detail_obj.gridReport != undefined) 
					 {
                         tmpLinkColumn[tmpColumnNo] = 
						 {
                             "gridReport": detail_obj.gridReport
                         }
						 if (detail_obj.heading == undefined) 
						 {
							 if (detail_obj.imageURL != undefined) 
							 {
									 tmpColumnObj.width = 28;
									 tmpColumnObj.header = "";
							}
						}
						 tmpColumnObj.renderer = function(val) 
						 {
							 if (detail_obj.imageURL != undefined) {
								 if (val != undefined && val != ' ') {
									 return "<div style='cursor: pointer;' class='grid_icon'><img title='" + detail_obj.tooltip + "' width=16 src=" + detail_obj.imageURL + " title='" + plf.replaceAll(detail_obj.columnname, "<BR>", " ") + "'></img></div>"
								 } else {
									 return "";
								 }
							 } else {
								 return "<div style='cursor: pointer;' title='" + detail_obj.tooltip + "' class='x-panel-header-text-container-default'><u>" + val + "</u></div>"
							 }
						 };
                     }
                 /*Grid Click ends here*/

                 /*
                 if(detail_obj.helpid != undefined) 
                 	{
                 		tmpLinkColumn[tmpColumnNo] = {
                 				"helpid":detail_obj.helpid								
                 				}
                 	}
                 */
                 /*Column Color Implementation Starts*/
                 if (detail_obj.columnColor != undefined) {
                     tmpColumnObj.tdCls = detail_obj.columnColor;
                 }

                 if (detail_obj.colAlign != undefined) {
                     tmpColumnObj.align = detail_obj.colAlign;
                 }
                 var volprecision;
                 var qtyprecision;
                 var weightprecision;
                 if (detail_obj.weightPrecision != undefined) {
                     weightprecision = detail_obj.weightPrecision;
                     tmpColumnObj.renderer = function(val) {
                         if (val != '' && val != 0 && val != null) 
			    {
                             val = parseFloat(val).toFixed(weightprecision);
                             return val;
                         } 
			    else if (val == 0) 
			    {
				 val=0;
                             val = parseFloat(val).toFixed(weightprecision);
                             return val;
                         } 
			    else
                             return "";
                     };

                 }
                 if (detail_obj.volumePrecision != undefined) {
                     volprecision = detail_obj.volumePrecision;
                     tmpColumnObj.renderer = function(val) {
                         if (val != '' && val != 0 && val != null) {
                             val = parseFloat(val).toFixed(volprecision);
                             return val;
                         } else
                             return "";
                     };
                 }
                 if (detail_obj.qtyPrecision != undefined) {
                     qtyprecision = detail_obj.qtyPrecision;
                     tmpColumnObj.renderer = function(val) {
                         if (val != '' && val != 0 && val != null) {
                             val = parseFloat(val).toFixed(qtyprecision);
                             return val;
                         } else
                             return "";
                     };
                 }

                 /*Column Color Implementation Ends*/

                 //console.log(tmpColumnObj)
                 tmpFieldObjArr.push(tmpFieldObj);
                 tmpColumnObjArr.push(tmpColumnObj);

                 tmpColumnNo = tmpColumnNo + 1;
             })




             /*
             	Grid Model defined.
             */
             Ext.define(inObj.id + '_model', {
                 extend: 'Ext.data.Model',
                 requires: ['Ext.data.identifier.Sequential'],
                 idProperty: 'id',
                 //idgen:'sequential',
                 identifier: 'sequential',
                 fields: tmpFieldObjArr
             });

             /*
             	Dummy record inserted in store.
             */

             var newRecord = Ext.create(inObj.id + '_model', {
                     "recStatus": "I"
                 })
                 //newRecord.setDirty();

             /*
             	Grid Store created.
             */
             if (inObj.groupByField != undefined) {
                 Ext.create("Ext.data.Store", {
                     storeId: inObj.id + '_store',
                     model: inObj.id + '_model',
                     groupField: inObj.groupByField
                         //fields: tmpFieldObjArr
                         //autoLoad: 'false'
                         //,proxy:'memory'
                         //,data:newRecord
                 })

             } else {
                 if (!inObj.removePaging) {
                     var memoryProxy = new Ext.data.MemoryProxy({
                         type: 'memory',
                         enablePaging: true,
                         reader: {
                             type: 'json'
                         }
                     });

                     Ext.create("Ext.data.Store", {
                         storeId: inObj.id + '_store',
                         model: inObj.id + '_model',
                         pageSize: inObj.visibleRow,
                         proxy: memoryProxy,
                         autoSync: true
                             //fields: tmpFieldObjArr
                             //autoLoad: 'false'
                             //,proxy:'memory'
                             //,data:newRecord
                     })
                 } else {
                     gridOffsetheight = gridOffsetheight - 36;

                     Ext.create("Ext.data.Store", {
                         storeId: inObj.id + '_store',
                         model: inObj.id + '_model'
                             //fields: tmpFieldObjArr
                             //autoLoad: 'false'
                             //,proxy:'memory'
                             //,data:newRecord
                     })
                 }
             }

             /*Code to load Empty Rows starts here*/
             /*
             var gridStore = Ext.data.StoreManager.lookup(inObj.id+'_store');						
             gridStore.on('load', function(store) 
             {
               var tmpCnt=store.getCount();					 
               var dataToSave = [];
               if  (tmpCnt==0)
               {						  
             	for(var i = 0; i < 5; i++) 
             	  {								 
             		 dataToSave.push({"recStatus":"I"});							 
             	  }	
             	console.log(dataToSave,"dataToSave");
             	gridStore.clearFilter();
             	if (gridStore.proxy.enablePaging)
             	{							
             	gridStore.getProxy().setData(dataToSave);
             	gridStore.read();
             	gridStore.setRemoteSort(true); 
             	}
             	else										
             	gridStore.loadData(dataToSave,false);						
               }					  
             })
             */
             /*Code to load Empty Rows ends here*/
             /*
             	Grid Panel created.
             */
			 if(inObj.columnLines == undefined) inObj.columnLines=true;
			 if(inObj.rowLines == undefined) inObj.rowLines=true;
			 if(inObj.cls == undefined) inObj.cls="c-mainpage-section";
             gridPropObj = {
                 /*
                 store:Ext.create("Ext.data.Store",
                 		{
                 			storeId:inObj.id+'_store',
                 			model:inObj.id+'_model',
                 			//fields: tmpFieldObjArr,
                 			autoLoad: 'true',
                 			proxy:'memory'
                 		}),
                 */
                 store: Ext.data.StoreManager.lookup(inObj.id + '_store'),
                 columns: tmpColumnObjArr,
                 columnLines: true,
                 autoScroll: true,
                 overFlow: true,
                 sortable: true,
                 itemId: inObj.id,
                 //cls: "c-mainpage-section",
				 cls:inObj.cls,
                 //width:plf.screenWidth-100,
                 selType: 'cellmodel',
                 selectAll: true,
                 /*
                 	Grid toolbar creation.
                 */
                 plugins: [
                     Ext.create('Ext.grid.plugin.CellEditing', {
                         clicksToEdit: 1,
                         listeners: {
                             'edit': function(editor, e) 
							 {
								 if(e.column.getEditor(e.record)) 
								 {
									if(e.column.getEditor(e.record).getXType() == "datefield")
									{
										 if (e.record.get(e.field) != "") {
											 e.record.set(e.field, Ext.Date.format(new Date(e.record.get(e.field)), plf.defDateFormat))
										 }									
									}
									if(e.column.getEditor(e.record).getXType() == "checkbox")
									{
										if (e.record.get(e.field) == "true") {
											e.record.set(e.field, 1)
										}
										else{
											e.record.set(e.field, 0)
										}
									}
								 }							 
                                // console.log(editor, e)
                                 //console.log(e.column.field.getXType())
                                     /*
                                     if(e.column.getXType()=="datecolumn")
                                     {
                                     	//console.log(e.record.get(e.field))
                                     	//console.log(plf.defDateFormat)
                                     	//console.log(Ext.Date.format(new Date(e.record.get(e.field)),plf.defDateFormat))
                                     	if(e.record.get(e.field) != "")
                                     	{
                                     		console.log("date",e.field,Ext.Date.format(new Date(e.record.get(e.field)),plf.defDateFormat))
                                     		e.record.set(e.field,Ext.Date.format(new Date(e.record.get(e.field)),plf.defDateFormat))
                                     	}
                                     }
                                     */
									 /*
                                 if (e.column.field.getXType() == "datefield") 
								 {
                                     
                                     if (e.record.get(e.field) != "") {

                                         e.record.set(e.field, Ext.Date.format(new Date(e.record.get(e.field)), plf.defDateFormat))
                                     }
                                 }
								 */
                                 e.record.commit();
                             }
                         }
                     })
                 ],
                 listeners: {
                     /*
                     "afterrender": function(dataview, eOpts) 
                     {
                     	
                     	var gridStore = Ext.data.StoreManager.lookup(inObj.id+'_store');
                     	
                     	gridStore.on('load', function(store) 
                     	{
                     	  var tmpCnt=store.getCount();					 
                     	  var dataToSave = [];
                     	  if  (tmpCnt==0)
                     	  {						  
                     		for(var i = 0; i < 5; i++) 
                     		  {								 
                     			 dataToSave.push({"recStatus":"I"});							 
                     		  }
                     		
                     		gridStore.clearFilter();
                     		if (gridStore.proxy.enablePaging)
                     		{							
                     		gridStore.getProxy().setData(dataToSave);
                     		gridStore.read();
                     		gridStore.setRemoteSort(true); 
                     		}
                     		else										
                     		gridStore.loadData(dataToSave,false);						
                     	  }					  
                     	})
                     },*/
                     "itemdblclick": function(dataview, record, item, index, e) {
                         var dataToSave = [];
                         if (parentForm.hlpParentHelpID != undefined & parentForm.hlpParentHelpID != "" & parentForm.hlpParentHelpID != '') {
                             dataToSave.push(record.data);
                             parentForm.loadHelpResult(parentForm.hlpParentForm, dataToSave, parentForm.hlpParentHelpID)
                             parentForm.ownerCt.close();
                         }
                     },
                     "cellclick": function(obj_tmp1, td, columnIndex, record, tr, rowIndex, e, eOpts) {
                         /*Code commented by Rajiv R for id: 57351 starts here*/
                         if (tmpLinkColumn[columnIndex] != undefined) {
                             var columnname = obj_tmp1.getHeaderCt().getHeaderAtIndex(columnIndex).dataIndex;
                             var columnvalue = record.get(columnname);

                             if (columnvalue != undefined && columnvalue != ' ') {

                                 if (tmpLinkColumn[columnIndex].linkType != undefined) {
                                     //console.log(record.get(tmpLinkColumn[columnIndex].linkId))
                                     parentForm.processHLink(record.get(tmpLinkColumn[columnIndex].linkId), record)
                                 } else if (tmpLinkColumn[columnIndex].helpid != undefined) {
                                     //console.log(record.get(tmpLinkColumn[columnIndex].linkId))									
                                     parentForm.launchHlpLink(tmpLinkColumn[columnIndex].helpid, record)
                                 } else if (tmpLinkColumn[columnIndex].popupid != undefined) {
                                     parentForm.launchpopupLink(tmpLinkColumn[columnIndex].popupid, record)
                                 } 
								 else if (tmpLinkColumn[columnIndex].gridClick != undefined) 
								 {
									if (tmpLinkColumn[columnIndex].colName != undefined && tmpLinkColumn[columnIndex].colName != ' ') 
									 {
									 var columnvalue;
									 var recCount = 0;
									 /*
									 var tmpColName=obj_tmp1.getHeaderCt().getGridColumns();
									 Ext.each(tmpColName, function(col) 
									 {
                                         console.log(col.dataIndex,tmpLinkColumn[columnIndex].gridClick[0],"rec");												
                                     })
									 */									  
									 Ext.each(tmpLinkColumn[columnIndex].colName, function(rec) 
									 {										 
                                         console.log(tmpLinkColumn[columnIndex].gridClick[recCount],"rec");	
										 columnvalue = record.get(rec);
										 parentForm.queryById(tmpLinkColumn[columnIndex].gridClick[recCount]).setValue(columnvalue);
										 recCount = recCount + 1;
										 
                                      })									  
									 
									 }
									 
									 //columnvalue = record.get(tmpLinkColumn[columnIndex].colName);
									 /*
									 var tmpgridClick= tmpLinkColumn[columnIndex].gridClick;
									 tmpgridClick=tmpgridClick.replace("[","");
									 tmpgridClick=tmpgridClick.replace("]","");
									 console.log(tmpgridClick,"tmpgridClick")
									 
									 console.log(tmpLinkColumn[columnIndex].gridClick,"tmpgridClick");
									 */
									 
                                     parentForm.queryById("methodName").setValue(tmpLinkColumn[columnIndex].MethodName);
                                     parentForm.queryById(tmpLinkColumn[columnIndex].gridClick).setValue(columnvalue);
                                     process_ebpack_service(parentForm, [tmpLinkColumn[columnIndex].gridClick], tmpLinkColumn[columnIndex].service,undefined,undefined,tmpLinkColumn[columnIndex].callbackMethod);

                                 } 
								 else if (tmpLinkColumn[columnIndex].gridReport != undefined) 
								 {                                   
								   parentForm.ProcessGridOnPrint(inObj.id, record.getId(), tmpLinkColumn[columnIndex].gridReport);
                                 } 
								 else if (tmpLinkColumn[columnIndex].type != undefined) 
								 {                                   
								    var fieldName = tmpLinkColumn[columnIndex].fieldName 
									var entityName = tmpLinkColumn[columnIndex].fileGroup;
									var filename = record.get(fieldName);
									var FilePath ="app";
									 parentForm.hdnIframe.update("<iframe src='" + "DownloadFileServlet?filePath="+encodeURI(FilePath)+"&entityName="+encodeURI(entityName)+"&fileName="+encodeURI(filename) + "' style='display:none' />");
                                 }
								 
								 
								 else if (tmpLinkColumn[columnIndex].linktype != undefined) 
								 { 
								 var url = tmpLinkColumn[columnIndex].url;
								 var filename = record.get(url);
								 if(filename != undefined & filename !="" & filename !=null)
								 {
									 window.open(filename);
								 }			 
								 
								 }
								 else {

                                     /*Code for Grid pop up starts here*/
                                     if (tmpLinkColumn[columnIndex].gridpopup) {
                                         var initValueObj = [];
                                         var popId = tmpLinkColumn[columnIndex].linkId;
                                         if (parentForm.gridPopupLinks[popId]["grid"] != undefined) {
                                             parentForm.gridPopupLinks[popId]["grid"].forEach(
                                                 function(hdrCtrlTmp) {
                                                     if (hdrCtrlTmp["src"] != "") {
                                                         var tmpObj = {}
                                                         tmpObj.ctrl = hdrCtrlTmp["dest"]
                                                         tmpObj.value = record.get(hdrCtrlTmp["src"]);
                                                         initValueObj.push(tmpObj)
                                                     }
                                                 }
                                             )
                                             initValueObj.push({
                                                 ctrl: "dynMethodName",
                                                 "value": parentForm.gridPopupLinks[popId]["popMethodName"]
                                             });
                                             initValueObj.push({
                                                 ctrl: "iUID",
                                                 "value": parentForm.hdnUID.getValue()
                                             });
                                         }
                                         console.log(initValueObj);
                                         launch_helpscreen(parentForm, "", "CueTrans.view." + parentForm.gridPopupLinks[popId]["dest"], initValueObj)
                                     }
                                     /*Code for Grid pop up starts here*/
                                     else
                                         parentForm.processHLink(tmpLinkColumn[columnIndex].linkId, record, tmpLinkColumn[columnIndex].popup)
                                 }
                                 return false
                             }
                         }

                         /*Code commented by Rajiv R for id: 57351 ends here*/

                         /*Code added by Rajiv R for id: 57351 starts here*/
                         /*
                        var columnname = obj_tmp1.getHeaderCt().getHeaderAtIndex(columnIndex).dataIndex; 
						var columnvalue = record.get(columnname);  	                      		
						if (columnvalue != undefined && columnvalue != ' ')
                        {
							if (tmpLinkColumn[columnIndex] != undefined)
							{                            
								parentForm.processHLink(tmpLinkColumn[columnIndex],record)
								return false
							}
                        }
						*/
                         /*Code added by Rajiv R for id: 57351 ends here*/
                     }
                 }
             }

             //Grid Toolbar Definition Starts
             var tbarArrObj = [];

             //Editable Grid. Add Insert / Delete Icons
             if (inObj.readonly == undefined & inObj.removeAddDelete == undefined) {
                 //Adding Insert Icon
                 tbarArrObj.push({
                     xtype: 'image',
                     title: 'Click here to add a row.',
                     src: 'resources/images/gridbar/add.png',
                     cls: 'gridtbar_icon_left',
                     listeners: {
                         render: function(objctrl) {
                             objctrl.getEl().on('click',
                                 function(eventobj) {
                                     var gridStore = Ext.data.StoreManager.lookup(inObj.id + '_store');
                                     if (gridStore.proxy.enablePaging != undefined) {
                                         var recorddata = gridStore.getProxy().getReader().rawData;
                                         if (recorddata == undefined) {
                                             recorddata = [];
                                         }

                                         var recCount = 1;
                                         Ext.each(recorddata, function(rec) {
                                             if (rec.recStatus != 'D') {
                                                 recCount = recCount + 1;
                                             }
                                         })
										 
										 if(inObj.selRowProcess != undefined & inObj.selRowProcess=="Y")
										 {
											 recorddata.push({
												 recStatus: "I",
												 select:true
											 })
										 }
										 else
										 {
                                         recorddata.push({
                                             recStatus: "I"
                                         })
										 }

                                         gridStore.getProxy().setData(recorddata, true);
                                         gridStore.setRemoteSort(true)
                                         gridStore.setRemoteFilter(true)

                                         gridStore.loadPage(Math.ceil(recCount / gridStore.getPageSize()));
                                     } else {
									 
                                         var newRecord = Ext.create(inObj.id + '_model', {
                                                 "recStatus": "I"
                                             })
                                             //newRecord.setDirty();
										 if(inObj.selRowProcess != undefined & inObj.selRowProcess=="Y")
										 {
											newRecord.set("select",true);
										 }
										 
                                         gridStore.add(newRecord);
                                     }
                                     /*
										var grid =parentForm.queryById(inObj.id);	
										grid.view.refresh();
										var dataToSave = [];									  						  
										dataToSave.push({"recStatus":"I"});				
										gridStore.clearFilter();
										if (gridStore.proxy.enablePaging)
										{							
										gridStore.getProxy().setData(dataToSave);
										gridStore.read();
										gridStore.setRemoteSort(true); 
										}
										else										
										gridStore.loadData(dataToSave,false);						
									    */
                                 })
                         }
                     }
                 });
                 //Adding Space
                 tbarArrObj.push({
                     width: 10,
                     xtype: 'label',
                     text: ''
                 })

                 //Adding Delete Icon
                 tbarArrObj.push({
                         xtype: 'image',
                         title: 'Click here to delete a row.',
                         src: 'resources/images/gridbar/delete.png',
                         cls: 'gridtbar_icon_left',
                         listeners: {
                             render: function(objctrl) {
                                 objctrl.getEl().on('click',
                                     function(eventobj) {
                                         var gridStore = Ext.data.StoreManager.lookup(inObj.id + '_store')

                                         if (gridStore.proxy.enablePaging != undefined) 
										 {
                                             var currentPage = gridStore.currentPage;
                                             var recorddata = gridStore.getProxy().getReader().rawData;
                                             if (recorddata == undefined) {
                                                 recorddata = [];
                                             }

                                             var recCount = 0;
                                             Ext.each(recorddata, function(record) {
                                                 if (record.select) {
                                                     record.recStatus = "D"
                                                 } else {
                                                     recCount = recCount + 1;
                                                 }
                                             })

                                             gridStore.getProxy().setData(recorddata, true);
                                             gridStore.setRemoteSort(true)

                                             gridStore.filterBy(function(item) {
                                                 if (item.getData().recStatus == 'D')
                                                     return false;
                                                 else
                                                     return true;
                                             })
                                             gridStore.setRemoteFilter(true)

                                             //Current page is greater than total page means last page is empty.
                                             if (currentPage > Math.ceil(recCount / gridStore.getPageSize())) {
                                                 gridStore.loadPage(Math.ceil(recCount / gridStore.getPageSize()))
                                             } else {
                                                 gridStore.loadPage(currentPage);
                                             }
                                         } else {

                                             //var gridStore = Ext.data.StoreManager.lookup(inObj.id+'_store');
                                             Ext.each(gridStore.getRange(), function(record) {
                                                 if (record.getData().select) {
                                                     record.set('recStatus', "D")
                                                 }
                                             })

                                             gridStore.filterBy(function(item) {
                                                 if (item.getData().recStatus == 'D')
                                                     return false;
                                                 else
                                                     return true;
                                             })
                                         }
                                     })
                             }
                         }
                     })
                     //Adding Space
                 tbarArrObj.push({
                         width: 10,
                         xtype: 'label',
                         text: ''
                     })
                     //Adding append Icon
                 tbarArrObj.push({
                         xtype: 'image',
                         title: 'Click here to duplicate a row.',
                         src: 'resources/images/gridbar/append.png',
                         cls: 'gridtbar_icon_left',
                         listeners: {
                             render: function(objctrl) {
                                 objctrl.getEl().on('click',
                                     function(eventobj) {
                                         var gridStore = Ext.data.StoreManager.lookup(inObj.id + '_store');
                                         if (gridStore.proxy.enablePaging != undefined) {
										     
                                             var recorddata = gridStore.getProxy().getReader().rawData;
                                             if (recorddata == undefined) {
                                                 recorddata = [];
                                             }

                                             var recCount = 0;
                                             var newrecord = [];
                                             Ext.each(recorddata, function(record) 
											 {
                                                     console.log(record.select)
													 //if (inObj.readonly == undefined & inObj.removeAddDelete == undefined)
                                                     if (record.select & record.recStatus != "D") 
													 {
                                                         var tmpSelRecord = Ext.clone(record);
                                                         tmpSelRecord.recStatus = "I";
                                                         record.select = false;
                                                         tmpSelRecord.select = false;
                                                         delete tmpSelRecord["id"];
                                                         //newrecord.push(tmpSelRecord)
                                                         recorddata.push(tmpSelRecord)
                                                         recCount = recCount + 1;
                                                     }
                                                     recCount = recCount + 1;
                                                 })
                                                 //recorddata.concat(newrecord);
                                             
                                                 //console.log(newrecord)

                                             gridStore.getProxy().setData(recorddata, true);
                                             gridStore.setRemoteSort(true)
                                             gridStore.setRemoteFilter(true)
											 
                                             gridStore.loadPage(Math.ceil(recCount / gridStore.getPageSize()));
                                         } else {
                                             Ext.each(gridStore.getRange(), function(record) {
                                                 if (record.getData().select & record.getData().recStatus!= "D" ) {
                                                     var newRec = record.copy()
                                                     newRec.set("select", false);
                                                     gridStore.add(newRec)
                                                 }
                                             })
                                         }
										 
                                         /*
                                         gridStore.filterBy(function(item) 
                                         {
                                         	if(item.getData().recStatus == 'D') 
                                         		return false;
                                         	else 
                                         		return true;
                                         })
                                         */
                                     })
                             }
                         }
                     })
                     //Adding Space
                 tbarArrObj.push({
                     width: 10,
                     xtype: 'label',
                     text: ''
                 })
             }
             if (inObj.removeFilter == false || inObj.removeFilter == undefined) {
                 tbarArrObj.push(
				 {
                     xtype: 'textfield',
                     itemId: inObj.id+"_Filter",
                     emptyText: 'Enter to filter',
                     labelWidth: 0,
                     fieldCls: 'c-fieldctrl',
                     inputWrapCls: "x-form-text-wrap c-fieldctrlwrap",
                     listeners: {
                         'change': function(field, event) {
                             if (field.getValue() == "") {
                                 var gridStore = Ext.data.StoreManager.lookup(inObj.id + '_store');
                                 gridStore.clearFilter();
                                 var grid = parentForm.queryById(inObj.id);
                                 var columns = grid.getView().getHeaderCt().getGridColumns();
                                 var searchValue = field.getValue();
                                 gridStore.reload();
                             }

                         },
                         "specialkey": function(f, e) {

                                 if (e.getKey() == e.ENTER) {
                                     var gridStore = Ext.data.StoreManager.lookup(inObj.id + '_store');
                                     gridStore.clearFilter();
									
                                     var grid = parentForm.queryById(inObj.id);
									  
                                     var columns = grid.getView().getHeaderCt().getGridColumns();
									 
                                     var searchValue = f.getValue();
									 
									 
                                     //gridStore.reload();
									 console.log(searchValue,"gridStore");
                                     if (!!searchValue) {
                                         var filters = [
                                             new Ext.util.Filter({
                                                 filterFn: function(item) {
                                                     var strResult = false;
                                                     Ext.each(columns, function(col) {
                                                         if (col.dataIndex != undefined & col.dataIndex != '' & col.dataIndex != null & col.dataIndex != "" & col.dataIndex != 'select') {
                                                             if (item.get(col.dataIndex)) {
                                                                 if (!Ext.isNumber(item.get(col.dataIndex))) {

                                                                     if (item.get(col.dataIndex).toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
                                                                         strResult = true;
                                                                     }
                                                                 }

                                                             }
                                                             //else
                                                             //  console.log(col.dataIndex);
                                                         }
                                                     });
                                                     return strResult;
                                                 }
                                             })
                                         ];
										if (gridStore.proxy.enablePaging !=  undefined)
										{
                                         gridStore.remoteFilter = true;
                                         gridStore.filter(filters);	
										 gridStore.reload();
										}
										else										
										{
										gridStore.filter(filters);	
										}
                                     }
                                     
                                 }
                             }
                             /*,
                             blur: function(field) 
                             {
                             	var value=field.getValue();
                             	
                             	if (value=="")
                             		{
                             			console.log(value,"value");
                             			var gridStore = Ext.data.StoreManager.lookup(inObj.id+'_store');								
                             			gridStore.clearFilter();
                             		}
                             }*/
                     }
                 }, {
                     xtype: 'button',
                     text: 'Filter',
                     tooltip: 'Click here to filter a row.',
                     height: 25,
                     cls: 'Gridbtn',
                     handler: function(eventobj) {
                         var gridStore = Ext.data.StoreManager.lookup(inObj.id + '_store');
                         gridStore.clearFilter();
                         var grid = parentForm.queryById(inObj.id);
                         var columns = grid.getView().getHeaderCt().getGridColumns();
                         var searchValue = parentForm.queryById(inObj.id+"_Filter").getValue();
						 console.log(searchValue,inObj.id,"searchValue");
                         if (!!searchValue) {
                             var filters = [
                                 new Ext.util.Filter({
                                     filterFn: function(item) {
                                         var strResult = false;
                                         Ext.each(columns, function(col) {
                                             if (col.dataIndex != undefined & col.dataIndex != '' & col.dataIndex != null & col.dataIndex != "") {
                                                 if (item.get(col.dataIndex)) {
                                                     if ( (!Ext.isNumber(item.get(col.dataIndex))) & (col.dataIndex != "select")) {
                                                         if (item.get(col.dataIndex).toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
                                                             strResult = true;
                                                         }
                                                     }

                                                 } 
												 //else
                                                     //console.log(col.dataIndex);
                                             }
                                         });
                                         return strResult;
                                     }
                                 })
                             ];
							 if (gridStore.proxy.enablePaging !=  undefined)
										{
                                         gridStore.remoteFilter = true;
                                         gridStore.filter(filters);	
										 gridStore.reload();
										}
										else										
										{
										gridStore.filter(filters);	
										}
                             //gridStore.remoteFilter = true;
                             //gridStore.filter(filters);
                         }

                     }
                 })
                 tbarArrObj.push({
                         xtype: 'textfield',
                         labelCls: 'c-fieldlabel',
                         emptyText: 'Enter to highlight',
                         labelWidth: 0,
                         fieldCls: 'c-fieldctrl',
                         inputWrapCls: "x-form-text-wrap c-fieldctrlwrap",
                         listeners: {
                             /*
                     change: 
					 {
                         fn:plf.onTextFieldChange(this,newValue)
                     }
					 */
                             "change": function(field) {
                                 var gridStore = Ext.data.StoreManager.lookup(inObj.id + '_store');
                                 var grid = parentForm.queryById(inObj.id);
                                 //alert(parentForm.queryById(inObj.id));
                                 plf.onTextFieldChange(field.getValue(), gridStore, grid, field)
                             }
                         }

                     }, {
                         xtype: 'button',
                         // text: '&lt;',
                         cls: 'Gridbtn x-tbar-line-previous',
                         width: 25,
                         height: 25,
                         tooltip: 'Click here to find a previous row.',
                         handler: function() {
                             var grid = parentForm.queryById(inObj.id);
                             plf.onPreviousClick(grid);
                         }
                     },
                     /*{width:10,xtype: 'label',text:''},*/
                     {
                         xtype: 'button',
                         // text: '&gt;',
                         cls: 'Gridbtn x-tbar-line-next',
                         width: 25,
                         height: 25,
                         tooltip: 'Click here to find a next Row.',
                         handler: function() {
                             var grid = parentForm.queryById(inObj.id);
                             plf.onNextClick(grid)
                         }
                     }
					 /*,
					 {
                         xtype: 'label',  
						 width: 150,
						 itemId:'lblNoRecords',
                         height: 25,						 
						 text:''
                     }
					 */
                 )
				 if (inObj.selectedRowCnt) 
				 {
				 tbarArrObj.push( 
					{
                         xtype: 'label',						
                         text: 'Selected ',
                         cls: ".c-generalfont c-selectedCountCss"
                     },
					 {
                         xtype: 'label',						
                         text: ':',
                         cls: ".c-generalfont c-selectedCountCss"
                     },
					 {
                         xtype: 'label',
						 itemId: inObj.id+"_selectedRowCnt",
                         text: '',
                         cls: ".c-generalfont c-selectedCountCss"
                     }
					 )
				 }
             }
			 
			  //Code Added by Hari for Excel Import Starts
			tbarArrObj.push({
						xtype: 'tbfill'
			})

			if (inObj.importTemplate != undefined) 
			 {
                 tbarArrObj.push(
						{
                         xtype: 'label',
                         text: 'Template',
                         cls: "c-generalfont"
						}, 
						{
                         width: 17,
                         height: 22,
                         cls: "grid_logo_splitter",
                         xtype: 'image',
                         src: 'resources/images/common/spacer.png'
						},						
						{
							 xtype: 'image',
							 title: 'Click here to download Tempate.',
							 src: 'resources/images/gridbar/excel_template.png',
							 cls: "gridtbar_icon_right",
							 listeners: {
								 render: function(objctrl) {
									 objctrl.getEl().on('click',
										 function(eventobj) {
											parentForm.hdnIframe.update("<iframe src='" + encodeURI(inObj.importTemplate)+ "' style='display:none' />");
										 })
								 }
							 }
						 },												
						{
                         width: 17,
                         height: 22,
                         cls: "grid_logo_splitter",
                         xtype: 'image',
                         src: 'resources/images/common/spacer.png'
						},
						
						{
                         xtype: 'label',
                         text: 'Import',
                         cls: "c-generalfont"
						}, 
						{
                         width: 17,
                         height: 22,
                         cls: "grid_logo_splitter",
                         xtype: 'image',
                         src: 'resources/images/common/spacer.png'
						},
						{
							 xtype: 'image',
							 title: 'Click here to import data into grid.',
							 src: 'resources/images/gridbar/excel_import.png',
							 cls: "gridtbar_icon_right",
							 listeners: {
								 render: function(objctrl) {
									 objctrl.getEl().on('click',
										 function(eventobj) {
											console.log(inObj.id,"before import");
											plf.importExcelDataToGrid(inObj.id)
										 })
								 }
							 }
						 },						
						{
                         width: 17,
                         height: 22,
                         cls: "grid_logo_splitter",
                         xtype: 'image',
                         src: 'resources/images/common/spacer.png'
						}
					 )
			 }
			 //Code Added by Hari for Excel Import Ends
			 
			 //&& parentForm.hlpSectionFlag==false  && parentForm !=undefined
             if ((inObj.removeExport == false || inObj.removeExport == undefined)) 
			 {
				if ( parentForm ==undefined || (parentForm !=undefined /*&& parentForm.hlpSectionFlag==false*/))
				
                 //Adding Export Icons
                 tbarArrObj.push({
                         xtype: 'tbfill'
                     }, {
                         xtype: 'label',
                         text: 'Export',
                         cls: "c-generalfont"
                     }, {
                         width: 17,
                         height: 22,
                         cls: "grid_logo_splitter",
                         xtype: 'image',
                         src: 'resources/images/common/spacer.png'
                     },
					/* {
                         xtype: 'image',
                         title: 'Click here to export pdf.',
                         src: 'resources/images/gridbar/pdf_logo.png',
                         cls: "gridtbar_icon_right",
                         listeners: {
                             render: function(objctrl) {
                                 objctrl.getEl().on('click',
                                     function(eventobj) {

                                         var ser_input_array = {};
                                         //ser_input_array["gridid"] = inObj.id;
                                         ser_input_array["grid_defn"] = inObj.detail;

                                         var dataToSave = [];
                                         var tmp_control_obj = form_obj.queryById(inObj.id)
                                             //gridStore.getProxy().getReader().rawData;

                                         if (tmp_control_obj.getStore().proxy.enablePaging != undefined) {
                                             dataToSave = tmp_control_obj.getStore().getProxy().getReader().rawData;
                                             //console.log("Grid Data to Save",tmp_ctrl_id, tmp_control_obj.getStore().getProxy().getReader().rawData)
                                         } else

                                         {
                                             tmp_control_obj.getStore().clearFilter();
                                             tmp_control_obj.getStore().each(function(record) {
                                                     dataToSave.push(record.data);
                                                 })
                                                 //Defect : On Save, Deleted records appears in multiline
                                             tmp_control_obj.getStore().filterBy(function(item) {
                                                 if (item.getData().recStatus == 'D')
                                                     return false;
                                                 else
                                                     return true;
                                             })

                                         }
                                         ser_input_array["gridid"] = dataToSave;

                                         //process_ebpack_service(parentForm,ser_input_array,"ExportToPDF")
                                         invoke_ebpack_service(parentForm, ser_input_array, "ExportToPDF", "Report", "ExportToPDF")


                                     })
                             }
                         }
                     },*/
                     /*{width:10,xtype: 'label',text:''},*/
                     {
                         xtype: 'image',
                         title: 'Click here to export excel.',
                         src: 'resources/images/gridbar/excel_logo.png',
                         cls: "gridtbar_icon_right",
                         listeners: {
                             render: function(objctrl) {
                                 objctrl.getEl().on('click',
                                     function(eventobj) {
                                         var ser_input_array = {};
                                         //ser_input_array["gridid"] = inObj.id;
                                         ser_input_array["grid_defn"] = inObj.detail;

                                         var dataToSave = [];
                                         var tmp_control_obj = parentForm.queryById(inObj.id);
										 if (tmp_control_obj.getStore().getRange().length ==0)
											{
											Ext.Msg.alert('Failure', 'No data found.');
											return;
											};						
                                         if (tmp_control_obj.getStore().proxy.enablePaging != undefined) {
                                             dataToSave = tmp_control_obj.getStore().getProxy().getReader().rawData;
                                             //console.log("Grid Data to Save",tmp_ctrl_id, tmp_control_obj.getStore().getProxy().getReader().rawData)
                                         } else

                                         {
                                             tmp_control_obj.getStore().clearFilter();
                                             tmp_control_obj.getStore().each(function(record) {
                                                     dataToSave.push(record.data);
                                                 })
                                                 /*Defect : On Save, Deleted records appears in multiline
                                                  */
                                             tmp_control_obj.getStore().filterBy(function(item) {
                                                 if (item.getData().recStatus == 'D')
                                                     return false;
                                                 else
                                                     return true;
                                             })

                                         }
                                         ser_input_array["gridid"] = dataToSave;
										
										/*
										var  tmpWrkFlwName="ExportToExcel";
										//var  tmpWrkFlwParam=encodeURI(Ext.JSON.encode(ser_input_array));
										var  tmpWrkFlwParam=Ext.JSON.encode(ser_input_array);
										var  tmpProcessType="Report";
										console.log(tmpWrkFlwParam);								
										input_array["grid_defn"]=AssetMstGrid_def;
										input_array["gridid"] = dataToSave;
										//console.log(arrayLength);
										console.log(dataToSave);
										var  tmpWrkFlwParam=encodeURI(Ext.JSON.encode(input_array));
										var tmpWrkFlwName='ExportToExcel';
										var tmpProcessType='Report';
										*/
										var tmpParams={};
										tmpParams['workFlowName']="ExportToExcel";
										tmpParams['workFlowParams']=Ext.JSON.encode(ser_input_array);
										tmpParams['processType']="Report";
										window.onbeforeunload = function (evt) 
											{		 
											};
										plf.windowOpen('POST',"GridExportExcel",tmpParams);
											
										//parentForm.hdnIframe.update("<form action='action' target='an_iframe' type='post'></form><iframe id ='an_iframe' src='GridExportExcel?workFlowName="+tmpWrkFlwName+"&workFlowParams=" + tmpWrkFlwParam + "&processType="+ tmpProcessType + "' style='display:none' />");
										 
                                        //process_ebpack_service(parentForm,ser_input_array,"ExportToPDF")
                                        //invoke_ebpack_service(parentForm, ser_input_array, "ExportToExcel", "Report", "ExportToExcel")
                                        //process_ebpack_service(parentForm,inObj.id,"ExportToExcel")
                                     })
                             }
                         }
                     }
                     /*
                     ,{width:10,xtype: 'label',text:''},
                     {xtype: 'image',src:'resources/images/gridbar/word_logo.png',height:22,width:22}
                     */
                 )
             }

             var tmp = Ext.create("Ext.panel.Panel", {
                 layout: "hbox",
                 items: tbarArrObj,
                 cls: "tbarSection",
                 height: 34
             })

             if (!inObj.removeTbar)
                 gridPropObj.tbar = tmp;
             else
                 gridOffsetheight = gridOffsetheight - 36;

             if (inObj.tool != undefined)
                 gridPropObj.tools = inObj.tool;
			 if (inObj.processdRowCnt != undefined) 
				 gridPropObj.processdRowCnt = inObj.processdRowCnt;
			 if (inObj.processdRowMsg != undefined) 
				 gridPropObj.processdRowMsg = inObj.processdRowMsg;
				 
             if (inObj.visibleRow != undefined) {
                 gridPropObj.height = inObj.visibleRow * 27 + gridOffsetheight;
             } else {
                 gridPropObj.height = 5 * 27 + gridOffsetheight;
             }

             if (inObj.groupByField != undefined) {
                 gridPropObj.features = [{
                     ftype: 'grouping',
					 groupHeaderTpl:'<div style="text-align:left">{name}</div>'
                 }]
             }
             if (!inObj.removePaging) {
                 gridPropObj.dockedItems = [{
                     xtype: 'pagingtoolbar',
                     cls: 'pagination',
                     itemId: inObj.id + 'paging',
                     store: Ext.data.StoreManager.lookup(inObj.id + '_store'),
                     dock: 'bottom',
                     displayInfo: true
                 }]
             }
             /*
			gridPropObj.bbar=Ext.create('Ext.PagingToolbar', {
            store:store,
            displayInfo: true,
            displayMsg: '{0} - {1} of {2}',
            emptyMsg: "No records to display"
			})
			*/
             /*Row highlight - Starts*/
             gridPropObj.viewConfig = {};

             if (inObj.rowHighlight != undefined) {
                 //gridPropObj.viewConfig = {
                 //getRowClass: function(record, index) 
                 gridPropObj.viewConfig["getRowClass"] =
                     function(record, index) {
                         if (!record.get('select')) {
                             if (record.get('rowColor') != "blank" & record.get('rowColor') != "")
                                 return record.get('rowColor');
                         } else {
                             return record.get('myHighlightRow');
                         }
                     }
             }
	      gridPropObj.viewConfig["enableTextSelection"] = true; 
             gridPropObj.viewConfig["listeners"] = {
                     refresh: function(dataview) {
                         Ext.each(dataview.panel.columns, function(column) {
                             if (column.autoSizeColumn === true)
                                 column.autoSize();
                         })
                     }
                 }     
                 /*Row highlight - Ends*/
                 /*console.log(gridPropObj,"gridPropObj");*/
             if (inObj.hideGrid)
                 gridPropObj.hidden = true

             if (inObj.margin != undefined)
                 gridPropObj.margin = inObj.margin;
             if (inObj.heightFactor != undefined) {
                 if (parentForm.chartSearchPanel)
                     gridPropObj.height = (plf.screenHeight - 170 - 40) * inObj.heightFactor
                 else
                     gridPropObj.height = (plf.screenHeight - 170) * inObj.heightFactor
             }
             var tmpColumnWidth;
             if (inObj.columnWidth != undefined)
                 tmpColumnWidth = inObj.columnWidth;
             else
                 tmpColumnWidth = 1

             gridPropObj.columnWidth = tmpColumnWidth

			 if(inObj.hideHeaders != undefined)
				gridPropObj.hideHeaders = inObj.hideHeaders;

             outObj = Ext.create('Ext.grid.GridPanel', gridPropObj)
			 if(inObj.selRowProcess != undefined)
			 {
				outObj.selRowProcess=inObj.selRowProcess
			 }
			 else
			 {
				inObj.selRowProcess=="N"
			 }
			 
             if (inObj.title != undefined) outObj.setTitle(inObj.title);

             /*
             if(inObj.title != undefined) outObj.setTitle(inObj.title);
             if(inObj.columnWidth != undefined)
             	outObj.columnWidth=inObj.columnWidth;
             else
             	outObj.columnWidth=1;
             */
             return outObj

         },
         onPreviousClick: function(grid) {
             var me = this,
                 idx;
             if ((idx = Ext.Array.indexOf(me.indexes, me.currentIndex)) !== -1) {
                 me.currentIndex = me.indexes[idx - 1] || me.indexes[me.indexes.length - 1];
                 grid.getSelectionModel().select(me.currentIndex);
                 grid.view.bufferedRenderer.scrollTo(me.currentIndex, true);
             }
         },
         onNextClick: function(grid) {
             var me = this,
                 idx;
             if ((idx = Ext.Array.indexOf(me.indexes, me.currentIndex)) !== -1) {
                 me.currentIndex = me.indexes[idx + 1] || me.indexes[0];
                 grid.getSelectionModel().select(me.currentIndex);
                 grid.view.bufferedRenderer.scrollTo(me.currentIndex, true);
             }
         },
         onTextFieldChange: function(value, gridStore, grid, field) {
             var count = 0;
             var me = this;
             grid.view.refresh();
             me.searchValue = plf.getSearchValue(value);
             me.indexes = [];
             me.currentIndex = null;
             if (me.searchValue !== null) {

                 me.searchRegExp = new RegExp(me.searchValue, 'g' + (me.caseSensitive ? '' : 'i'));
                 gridStore.data.each(function(record, idx) {
                     var td = Ext.fly(grid.view.getNode(idx)).down('td'),
                         cell, matches, cellHTML;
                     //console.log(grid.view.getNode(idx));
                     while (td) {
                         //alert(me.searchValue);
                         cell = td.down('.x-grid-cell-inner');

                         //alert(cell);
                         matches = cell.dom.innerHTML.match(me.tagsRe);
                         cellHTML = cell.dom.innerHTML.replace(me.tagsRe, me.tagsProtect);
                         //console.log(cellHTML ,"cellHTML");
						 cellHTML=cellHTML.replace("&nbsp;", ""); 
				 
                         // populate indexes array, set currentIndex, and replace wrap matched string in a span
                         cellHTML = cellHTML.replace(me.searchRegExp, function(m) {
                             count += 1;

                             if (Ext.Array.indexOf(me.indexes, idx) === -1) {
                                 me.indexes.push(idx);
                             }
                             if (me.currentIndex === null) {
                                 me.currentIndex = idx;
                             }
								
                             return '<span class="' + me.matchCls + '">' + m + '</span>';
                         });
                         // restore protected tags
                         Ext.each(matches, function(match) {
                             cellHTML = cellHTML.replace(me.tagsProtect, match);
                         });
                         // update cell html
                         cell.dom.innerHTML = cellHTML;
                         td = td.next();
                     }
                 }, me);

                 // results found
                 if (me.currentIndex !== null) {
                     grid.getSelectionModel().select(me.currentIndex);
                 }
             }
             if (me.currentIndex === null) {
                 grid.getSelectionModel().deselectAll();
             }
             field.focus();
         },
         getSearchValue: function(value) {
             //alert(Ext.getCmp('textfield').getValue());


             var me = this;

             if (value === '') {
                 return null;
             }
             if (!me.regExpMode) {
                 value = value.replace(me.regExpProtect, function(m) {
                     return '\\' + m;
                 });
             } else {
                 try {
                     new RegExp(value);
                 } catch (error) {
                     me.statusBar.setStatus({
                         text: error.message,
                         iconCls: 'x-status-error'
                     });
                     return null;
                 }
                 // this is stupid
                 if (value === '^' || value === '$') {
                     return null;
                 }
             }

             return value;

         },
         invokeFileUpload: function(grid, rowIndex, colIndex, tmpEntity, fieldName,nameColumn,gridID,parentForm) {
             //alert(this.ptrHiddenField.value);
			 var tmpFilePath ="app"
             var tmpWindow = "";
             tmpWindow = Ext.create('Ext.window.Window', {
                 title: 'File Upload',
                 header: {
                     titlePosition: 0,
                     titleAlign: 'center'
                 },
                 layout: 'hbox'
             });
             var ptrFileUploadField = Ext.create('Ext.form.Panel', {
                 title: '',
                 width: 400,
                 bodyPadding: 10,
                 frame: true,
                 renderTo: Ext.getBody(),
                 items: [{
                     xtype: 'filefield',
                     name: 'fileName',
                     fieldLabel: 'Upload File',
                     labelWidth: 100,
                     msgTarget: 'side',
                     allowBlank: false,
                     anchor: '100%',
                     listeners: {
                         change: function(thiss, value, eOpts) {
                             if (value != "") {
                                 ptrFileUploadField.submit({
                                     //url: "UploadFileServlet?entityName=" + tmpEntity,
									 url: "UploadFileServlet?filePath="+tmpFilePath+"&entityName="+tmpEntity,
                                     waitMsg: 'Uploading...',
                                     success: function(form, action) {},
                                     failure: function(form, action) {
                                         Ext.Msg.alert('Success', 'Your File has been uploaded.');
                                         var response_data = Ext.JSON.decode(action.response.responseText);
										 var newValue = value.replace(/C:\\fakepath\\/g, '');							
										 thiss.setRawValue(newValue);
										 
                                         //me.ptrHiddenField.value=response_data["fileName"];
                                         var rec = grid.getStore().getAt(rowIndex);
                                         //var fieldName = grid.headerCt.getGridColumns()[colIndex+1].dataIndex;
                                         //alert(fieldName)
                                         //alert(response_data["fileName"])
										 
										 var fileName=value;
                                         rec.set(fieldName, response_data["fileName"])
										 console.log("fileName:",fileName);
										 rec.set(nameColumn, newValue)//74337 nameColumn
										 //rec.set(fieldName, newValue)
                                         tmpWindow.close();
										 
										 /*
                                         rec.set(fieldName, response_data["fileName"])
                                         tmpWindow.close();
										 */
                                     }
                                 });
                             }
                         }
                     }
                 }]
             });
             tmpWindow.add(ptrFileUploadField);
             tmpWindow.show();
         },
         gAW: function(tmpWidth) {
             return tmpWidth * (plf.screenWidth / 1250)
         },
         gAH: function(tmpHeight) {
             return tmpHeight * (plf.screenHeight / 500)
         },
         escapeRegExp: function(inStr) {
             return inStr.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
         },
         replaceAll: function(inStr, findStr, replaceStr) {
             return inStr.replace(new RegExp(plf.escapeRegExp(findStr), 'g'), replaceStr);
         },
		 getChartColor:function(inStr)
		 {
			var tmpBaseColorArray = [ '#1ABC9C', '#F1C40F', '#3498DB', '#C0392B', '#9B59B6' ];			
			if(inStr=="greenred")
			{
				return ["#00cc46","#ff3333"];
			}
			if(inStr=="greenorange")
			{
				return ["#00cc46","#ffff00"];
			}
			if(inStr=="brownblue")
			{
				return ["#C0504D","#4F81BD"];
			}
			if(inStr=="Ageing")
			{
				return ["#638EC1","#8F77AC","#C66765","#A6C16E","#67CBE9"];
			}

			if(inStr=="greenredorange")
			{
				return ["#00cc46","#ffff00","#ff3333"];
			}
			if(inStr=="redgreen")
			{
				return ["#FF6600","#00cc46"];
			}

			else if(inStr=="rgb")
			{
				return ["#ff3333","yellow","#00cc46"];
			}
			else if(inStr =="base")
			{
				return tmpBaseColorArray;
			}
			else
			{
				var tmpColorArray =[];
				var tmpColorArrayLen = tmpBaseColorArray.length;
				
				for(var i=0;i<tmpColorArrayLen;i++)
				{
					tmpColorArray.push(tmpBaseColorArray[(i+parseInt(inStr))%tmpColorArrayLen]);
				}
				return tmpColorArray;
			}
		 },
		 windowOpen:function(verb, url, data, target)
		 {		 
		  var form = document.createElement("form");
		  form.action = url;
		  form.method = verb;
		  form.target = target || "_self";
		 
		  if (data) {
			for (var key in data) 
			{
				
				var hiddenField = document.createElement("input"); 
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", key);
				hiddenField.setAttribute("value", data[key]);
				
				form.appendChild(hiddenField);
				
			}
		  }
		   
		  form.style.display = 'none';
		  document.body.appendChild(form);
		  form.submit();
		 },
		addGIS: function(inObj,parentForm)
		 {
			if (inObj.columnWidth == undefined) inObj.columnWidth = 1
			if (inObj.heightFactor == undefined) inObj.heightFactor = 1			
			if (inObj.toolBarConfig != undefined)
				var tmpToolBarConfig = inObj.toolBarConfig
			else
				var tmpToolBarConfig = {};
			var tmpZoom=10;
			if (inObj.Zoom != undefined)
				tmpZoom = inObj.Zoom;
				
			var gisLayer = Ext.create("CueGis.plugins.ExtJs.Main", {
				dataSource : 'tenant2',
				enableToolBar : false,
				//cls:"chart_container",
				layout:'fit',
				//height:(plf.screenHeight-170)*inObj.heightFactor,
				height:(plf.screenHeight),
				//heightFactor:.5,
				columnWidth:inObj.columnWidth,				
				width : '100%',
				zoom : tmpZoom,
				center : {
					lat : 23.5859,
					lng : 58.4059
				},
				scale : 'metric',	
				toolBarConfig: tmpToolBarConfig,
				toolBarGroups : inObj.toolBarGroups,
				subContainerProportion : 30,
				actions : inObj.actions,
				mapId : "ivmsMap",
				itemId: "ivmsMap",
				startUpAction:function(){
					parentForm.fireEvent("aftergisload");
				}
			});
			
			if(inObj.contextMenu != undefined)
				gisLayer.contextMenus = inObj.contextMenu
			return gisLayer;
		 },
		 //Code Added by Hari for Excel Import - Starts
		 importExcelDataToGrid:function(grid_id_key)
		 {
             var tmpWindow = Ext.create('Ext.window.Window', {
                 title: 'File Upload',
                 header: {
                     titlePosition: 0,
                     titleAlign: 'center'
                 },
                 layout: 'hbox'
             });
			Ext.apply(Ext.form.VTypes, {
             fileUpload: function(val, field) {                              
                                 var fileName = /^.*\.(xls|xlsx|org)$/i;
                                 return fileName.test(val);
                           },                 
             fileUploadText: 'File must be in .xls,.xlsx,.org format'
			});			 
			var ptrExcelFileUploadField = Ext.create('Ext.form.Panel', {
					title: '',
					width: 400,
					bodyPadding: 10,
					frame: true,
					//renderTo: Ext.getBody(),
					items: 
						[{
						xtype: 'filefield',
						name: 'fileName',
						fieldLabel: 'Upload File',
						labelWidth: 100,
						msgTarget: 'side',
						//allowBlank: false,
						anchor: '100%',
						vtype:'fileUpload',
						listeners:
						{
						change:function( thiss, value, eOpts )
						{	                     				
						if (value !="")
						{
						ptrExcelFileUploadField.submit({									
							url: "UploadExcelServlet",
							//url: "UploadExcelServlet?filePath="+tmpFilePath+"&entityName="+tmpEntity,
							waitMsg: 'Uploading...',
							success: function(form, action) 
							{
								console.log("success")
							},									
							failure: function(form, action)
							{	
								console.log("failure")
								if (action.response!=undefined)
								{							
								var response_data = Ext.JSON.decode(action.response.responseText);
								console.log(value,response_data,Object.keys(response_data).length);
								if (Object.keys(response_data).length ==0)
								{
								Ext.MessageBox.show({
													'title':'Failure', 
													'msg':"Error in Excel Format.",
													'buttons': Ext.MessageBox.OK,
													icon:Ext.MessageBox["ERROR"]
													})
								tmpWindow.close();
								return;
								}
										
								//Ext.Msg.alert('Success', 'Your File has been uploaded.');
								//load grid store starts here
								var newValue = value.replace(/C:\\fakepath\\/g, '');							
								thiss.setRawValue(newValue);							
								for(var key in response_data)
								{
									var attrName = key;	
									console.log(attrName,"attrName");
									if(attrName.match(/fileName/))
									{
										var attrValue = response_data[key];
										console.log(attrValue,attrValue.length,"attrValue");
										if (attrValue.length ==0)
										{
										Ext.MessageBox.show({
															'title':'Failure', 
															'msg':"No data exists.",
															'buttons': Ext.MessageBox.OK,
															icon:Ext.MessageBox["ERROR"]
															})
										tmpWindow.close();
										return;
										}
										//grid_id_key = 'PacDetailsgrid';
										if 
										(
											Ext.data.StoreManager.containsKey(grid_id_key+'_store') //load grid store
											&& 
											attrValue != null 
										)
										{
											Ext.MessageBox.show({
												'title':'Success', 
												'msg':'Excel details have been uploaded in the grid.',
												'buttons': Ext.MessageBox.OK,
												icon:'success_check_icon'//Ext.MessageBox["ERROR"]
												})
											if (Ext.data.StoreManager.lookup(grid_id_key+'_store').proxy.enablePaging != undefined)
											{												
												var tmpStore = Ext.data.StoreManager.lookup(grid_id_key+'_store')											
												tmpStore.getProxy().setData(attrValue,true);
												tmpStore.setRemoteSort(true);
												tmpStore.setRemoteFilter(true);
												tmpStore.loadPage(1);
											}
											else
											{
											Ext.data.StoreManager.lookup(grid_id_key+'_store').clearFilter();
											Ext.data.StoreManager.lookup(grid_id_key+'_store').loadData(attrValue,false);
											}
										}
									}
								}
								
								}
								tmpWindow.close();
							}});
							return value;
						  }
						}}					
						}]
			});
             tmpWindow.add(ptrExcelFileUploadField);
             tmpWindow.show();			
		 }
		
     	}
 });