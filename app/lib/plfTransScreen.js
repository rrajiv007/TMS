/*
File Version: 1.0.0.2
File Name 	: plfTransScreen.js
Purpose 	: Core file which is used to Application Screen layout.

Screen Format:
_________________________________________
Screen Name
_________________________________________
Action Bar / Tool Bar 
_________________________________________

Main Content - "ptrMainSection" - Pointer to Content Section.
				* "vbox" Layout is used. Hence, All the sections will be added vertically.

_________________________________________
History Section
_________________________________________

*/
/* Modified By			Date						ID					*/
/* Rajiv R				02/09/2014					57349				*/
/* Rajiv R				04/09/2014					57410				*/
/*
	Application Screen Definition.
*/
Ext.define('CueTrans.lib.plfTransScreen', {
    extend: 'Ext.panel.Panel',

    /*
		Flag to Specify whether the current setup is Live or Proto.
	*/
    liveSetupFlag: true,
    liveScreenFlag: true,

    /*Class Attribute Definition Starts*/

    /*
		Toolbar Section related Attributes.
	*/
    toolbarSectionFlag: false,
    toolbarActions: [],
    toolbarLinks: [],
    ptrToolbar: "",
    ptrScrActions: "",

    /*
		Main Section Pointer
	*/
    ptrMainSection: "",

    /*
		Screen Name Attribute
	*/
    screenName: "",

    /*
		History Section related Attribute.
	*/
    dataHistorySectionFlag: false,

    /*
		Array to Hold Event Handlers.
	*/
    eventHandlers: [],

    /*
		JSON Object to Hold link Handlers.
	*/
    linkHandlers: {},

    /*
		Attribute to hold History back JS Class.
		Currently this feature is not used. Close icon is removed.
	*/
    //backScreenClass: "",

    /*
		Array to Hold key fields.
	*/
    keyFields: [],

    /*
		Array to hold Screen launch values.
	*/
    initialValues: [],

    /*
		Object to hold screen link definitions.
	*/
    screenLinks: {},

    /*
		Object to hold screen link definitions.
	*/
    hlpLinks: {},

    /*
		Flag to specify whether the launched screen is Help screen.
		If Yes, "OK" button section will be added to the bottom.
	*/
    hlpSectionFlag: false,

    /*
		Flag to specify whether the launched screen is popup screen.
		The Screen width will be 
	*/
    popupSectionFlag: false,
	popupWidthRatio: .8,
	popupHeightRatio: .68,
	gridPopupLinks: {},
	chartSearchPanel:false,
	
	
    /*
		Placeholder to store launched parent form object.
		This will be used on click of "OK"
	*/
    hlpParentForm: {},

    /*
		Placeholder to store parent help ID. (Launced help ID)
	*/
    hlpParentHelpID: "",

    /*
		Pointer to hold result grid pointer.
	*/
    hlpSearchGridPtr: {},
	
	
	/*
		Flag to hold whether the popup screen should be closed or not.
	*/
	popupCloseWindow:false,
	
    /*Class Attribute Definition Ends*/

    /*Loading standard parameters starts*/

    /*
		Application Screen Width Definition
	*/
    //width:Ext.getBody().getViewSize().width-110,
    //width:plf.screenWidth-plf.appMargin,
    width: plf.screenWidth,
    height: plf.screenHeight,
    autoScroll: false,
    //padding:plf.padding,
    //defaults:{padding:plf.padding, width:plf.screenWidth-plf.appMargin},
    //	defaults:{padding:plf.padding, width:plf.screenWidth},
    defaults: {
        width: plf.screenWidth
    },
    cls: "content_container_new",
    //padding:plf.padding,
    //layout:'form',
    layout: 'border',
    border: false,
    titleAlign: 'left',
    /*Loading standard parameters ends*/

    /*Custom Coding Starts*/
    initComponent: function(arguments) {
        //alert(Ext.getBody().getViewSize().width);
        this.callParent(arguments);
        this.generateScreen();
        /*
		this.ptrMainSection = Ext.create("Ext.panel.Panel",
							{
								border:false,
								layout: 
								{
									type: 'vbox',
									align: 'stretch'
								}								
							}
							);
		*/
    },
    /*
		Function to create "Main Content" Pointer.
	*/
    startPainting: function() {

        var tmpDefaultsObj = {};
        var tmpMainScreenWidth = "";
        if (this.hlpSectionFlag) {
            tmpMainScreenWidth = plf.screenWidth * plf.helpRatio - plf.helpMargin
            tmpDefaultsObj = { /*padding:plf.padding,margin:0,*/
                width: tmpMainScreenWidth
            }
        } 
        else if (this.popupSectionFlag) {
		
            tmpMainScreenWidth = plf.screenWidth * this.popupWidthRatio - plf.helpMargin
            tmpDefaultsObj = { /*padding:plf.padding,margin:0,*/
                width: tmpMainScreenWidth
            }
        } 		
		else {
            //tmpDefaultsObj = {padding:plf.padding,margin:0,width:plf.screenWidth-plf.appMargin-15}
            tmpMainScreenWidth = plf.screenWidth - plf.appMargin - 29
            tmpDefaultsObj = { /*padding:plf.padding,margin:0,*/
                width: tmpMainScreenWidth
            }

        }

        this.ptrHdrSection = Ext.create("Ext.form.Panel", {
            border: false,
            region: "north",
            //padding:plf.padding,
            autoScroll: false,
            height: 0,
            cls: "section_bg",
            width: plf.screenWidth,
            //height:plf.screenHeight,
            defaults: tmpDefaultsObj,
            /*
									Application Screen Width Definition
								*/
            layout: {
                type: 'vbox'
            },

        });

        this.ptrMainSection = Ext.create("Ext.form.Panel", {
            border: false,
            //padding:plf.padding,
            region: "center",
            autoScroll: true,
            cls: "section_bg",
            width: plf.screenWidth,
            //height:plf.screenHeight,
            defaults: tmpDefaultsObj,
            /*
									Application Screen Width Definition
								*/

            layout: {
                type: 'form'
            },
            //cls:"ptrMainSectionCls"
        });

        //this.ptrMainSection.add({xtype:"container",height:2,width:tmpMainScreenWidth});

        this.ptrFootSection = Ext.create("Ext.form.Panel", {
            border: false,
            region: "south",
            //padding:plf.padding,
            autoScroll: false,
            //cls:"Cue-MainSection",
            height: 0,
            cls: "Footer_section_bg",
           // width: plf.screenWidth,
            //height:plf.screenHeight,
            //defaults: tmpDefaultsObj,
            /*
									Application Screen Width Definition
								*/
            layout: {
                type: 'vbox'
            },
            //cls:"ptrMainSectionCls"
        });
		
		this.ptrHistorySection = Ext.create("Ext.form.Panel", {
            border: false,
            region: "south",
            //padding:plf.padding,
            autoScroll: false,
            //cls:"Cue-MainSection",
			width: plf.screenWidth,
            //height:plf.screenHeight,
            defaults: tmpDefaultsObj,
            height: 0,
            cls: "",
            layout: {
                type: 'hbox'
            }            
        });
		
    },
    generateScreen: function() {

        var tmpDefaultsObj = {};
        var tmpMainScreenWidth = "";
        if (this.hlpSectionFlag) {
            tmpMainScreenWidth = plf.screenWidth * plf.helpRatio - plf.helpMargin
            tmpDefaultsObj = { /*padding:plf.padding,margin:0,*/
                width: tmpMainScreenWidth
            }

        } 
        else if (this.popupSectionFlag) {
            tmpMainScreenWidth = plf.screenWidth * plf.popupWidthRatio - plf.helpMargin
            tmpDefaultsObj = { /*padding:plf.padding,margin:0,*/
                width: tmpMainScreenWidth
            }
        } 		
		else {
            tmpMainScreenWidth = plf.screenWidth - plf.appMargin - 29
            tmpDefaultsObj = { /*padding:plf.padding,margin:0,*/
                width: tmpMainScreenWidth
            }
        }
        /*Adding Screen Label*/
        /*Add Ruling*/
        var hrLine = {
            xtype: "container",
            height: 2,
            cls: "hrline",
            width: tmpMainScreenWidth
        };
        var hrLineNoColor = {
            xtype: "container",
            height: 2,
            width: tmpMainScreenWidth
        };

        var form_obj = this;

        var screenToolbar = Ext.create("Ext.panel.Panel", {
                "layout": "hbox",
                //cls:"ptrMainSectionCls Cue-MainToolbar",
                cls: "ptrMainSectionCls",
                //height:40,
                border: 0,
                width: plf.screenWidth,
                defaults: tmpDefaultsObj
            })
            /*
			Screen Title Defined.
		*/
        if (this.screenName != "" & !this.hlpSectionFlag  & !this.popupSectionFlag) {
            //Add Screen Title
            //this.add
            //(
            screenToolbar.add({
                    layout: 'fit',
                    border: false,
                    width: 400,
                    height: 38,
                    border: 0,
                    bodyCls: 'screen_heading_container',
                    items: [{
                        xtype: "label",
                        border: false,
                        align: 'center',
                        itemId: 'lbl_screen_display',
                        cls: 'screen_heading',
                        text: this.screenName
                    }]
                })
                //)
                //this.add(hrLine);
        }

        /*
			Toolbar section Defined.
		*/
		//console.log("toolbarSectionFlag",this.toolbarSectionFlag,"hlpSectionFlag",this.hlpSectionFlag,"popupSectionFlag",this.popupSectionFlag)
		
        if (this.toolbarSectionFlag & !this.hlpSectionFlag  & !this.popupSectionFlag) {
            this.ptrToolbar = Ext.create("CueTrans.lib.plfTransScreenToolBar", {
                toolbarActions: this.toolbarActions,
                toolbarLinks: this.toolbarLinks,
                basePtr: this
            });
            screenToolbar.add(this.ptrToolbar)
                //this.add(this.ptrToolbar);
        }
        if (this.toolbarSectionFlag || this.screenName != "" & !this.hlpSectionFlag  & !this.popupSectionFlag) {
            //this.add(screenToolbar)
            //this.add(hrLine)
            //this.add(hrLineNoColor)

            this.ptrHdrSection.add(screenToolbar)
            this.ptrHdrSection.setHeight(38)
                //this.ptrHdrSection.add(hrLine);
        }

        if (this.toolbarActions.length > 0) {
            //alert(this.ptrHdrSection);
            var tmpBtn = [];
            /*this.toolbarActions.forEach(function(tmpAction)
			{
				if(tmpAction.toLowerCase()=="refresh")
				{
					
					var tmpLowerCaseAction = tmpAction.toLowerCase();		
					var me=this;
					tmpBtn=
					{
					xtype:"image",
					itemId:tmpLowerCaseAction+'_icon',
					height: 25,										
					width:25,					
					src:'resources/images/common/refresh.png',
					listeners: {
								el: {
									click: function() {
										form_obj.initialValues=[];
										form_obj.query('.field').forEach(function(field_obj)
										{
											field_obj.setDisabled(false); 
											field_obj.suspendEvents(false);
											field_obj.setValue();
											field_obj.resumeEvents();						
										})
										
										form_obj.query('.grid').forEach(function(field_obj)
										{
											field_obj.setDisabled(false); //By default, make all the controls editable.
											field_obj.getStore().clearFilter();
											field_obj.getStore().removeAll();
										})
									}
								}
					}						
						}
				}
			}			
		)*/
            //screenToolbar.add(tmpBtn);
            //this.ptrHdrSection.add(screenToolbar);
        }
        //this.ptrHdrSection.add(hrLine);
        /*
			Help section Defined.
		*/
        if (this.hlpSectionFlag) {
            var hlpSection = Ext.create("Ext.panel.Panel", {
                "layout": {
                    type: 'hbox',
                    align: 'middle',
                    pack: 'center'
                }
            })
            var hlpBtnOK = Ext.create("Ext.Button", {
                text: "OK"
            })
            hlpBtnOK.on("click", function() {
                form_obj.packHelpResult(form_obj)
            })
            hlpSection.add(hlpBtnOK)
            this.ptrMainSection.add(hlpSection);
        }

        /*
			Add Screen Actions-  Revisit
		*/

        var tmpSection = Ext.create("Ext.panel.Panel", {
            "layout": "hbox",
            cls: "ptrMainSectionCls",
            border: 0,
            width: plf.screenWidth,
            defaults: tmpDefaultsObj
        })
        tmpSection.add({
            layout: 'fit',
            border: false,
            width: 140,
            height: 40,
            items: [{
                xtype: 'label',
                text: "* Mandatory fields",
                cls: "c-mainpage-section  mandatory_field_bottom_bar"
            }]
        });


        this.ptrScrActions = Ext.create("CueTrans.lib.plfTransScreenActions", {
            toolbarActions: this.toolbarActions,
            toolbarLinks: this.toolbarLinks,
            basePtr: this
        });

        if (this.toolbarActions.length > 0) {
            //this.ptrFootSection.add(hrLine);
            //
            tmpSection.add(this.ptrScrActions)
            this.ptrFootSection.add(tmpSection)
            this.ptrFootSection.setHeight(40)

        }

        /*
			Data History section Defined.
		*/
        if (this.dataHistorySectionFlag) {
            //this.ptrMainSection.add(hrLine);
            /*this.ptrMainSection.add(
			{ 
				xtype: 'label',text:"* Mandatory fields",cls:"c-mainpage-section  mandatory_field",margin:plf.margin,
				width:tmpMainScreenWidth
			})*/
            /*History Section Starts*/
            plf.columns = 4
            datahistoryColumn = plf.addColumnSection({
                title: ""
            });
            datahistoryColumnCtrl = [
                plf.addDisplayOnly({
                    "label": "Created by",
                    id: "strCreatedBy"
                }),
                plf.addDisplayOnly({
                    "label": "Created date",
                    id: "dtCreatedDate"
                }),
                plf.addDisplayOnly({
                    "label": "Modified by",
                    id: "strModifiedBy"
                }),
                plf.addDisplayOnly({
                    "label": "Modified date",
                    id: "dtModifiedDate"
                })
            ]
            datahistoryColumn.add(datahistoryColumnCtrl);


            var tmpHistorySection = Ext.create("Ext.panel.Panel", {
                layout: 'column',
                border: false,
                cls: "history_section",
                //width:tmpMainScreenWidth,
                //columns:4, //Specify Columns
                items: [
                    //Adding First Column Starts
                    {
                        xtype: 'displayfield',
                        columnWidth: .25,
                        fieldLabel: "Created by",
                        id: "strCreatedBy",
                        cls: "history_section_label"
                    }, {
                        xtype: 'displayfield',
                        columnWidth: .25,
                        fieldLabel: "Created date",
                        id: "dtCreatedDate",
                        cls: "history_section_label"
                    }, {
                        xtype: 'displayfield',
                        columnWidth: .25,
                        fieldLabel: "Modified by",
                        id: "strModifiedBy",
                        cls: "history_section_label"
                    }, {
                        xtype: 'displayfield',
                        columnWidth: .25,
                        fieldLabel: "Modified date",
                        id: "dtModifiedDate",
                        cls: "history_section_label"
                    }
                    //Adding Third Column Ends
                ]
            });
            /*History Section Ends*/
            this.ptrHistorySection.add(tmpHistorySection);
			this.ptrHistorySection.setHeight(30)
            //this.ptrMainSection.add(hrLine);			
        } else {
            //this.ptrMainSection.add(plf.addColumnSection({}));
            //this.ptrMainSection.add(plf.addColumnSection({}));
            //this.ptrMainSection.add(hrLine);
        }


        //this.ptrMainSection.add(Ext.create('CueTrans.view.common.SouthPanel'));

        /*Main Control Section Starts*/
        this.add(this.ptrHdrSection);
        this.add(this.ptrMainSection);
		this.add(this.ptrHistorySection);
        this.add(this.ptrFootSection);
        /*Main Control Section Ends*/



        //Hidden field to store  Method  Starts
        var tmp_hdn_methodName = {
                xtype: 'hidden',
                itemId: 'methodName',
                width: 0,
                height: 0
            }
            //Hidden field to store  Method Ends
            //this.ptrMainSection.add(tmp_hdn_methodName);
        this.add(tmp_hdn_methodName);

        //Hidden field to store  Method  Starts
        var tmp_hdn_RptViewer = {
                xtype: 'hidden',
                itemId: 'ReportViewer',
                width: 0,
                height: 0
            }
            //Hidden field to store  Method Ends
            //this.ptrMainSection.add(tmp_hdn_methodName);
        this.add(tmp_hdn_RptViewer);
		

        //Hidden field to store  Method  Starts
        var tmp_hdn_dynMethodName = {
                xtype: 'hidden',
                itemId: 'dynMethodName',
                width: 0,
                height: 0
            }
            //Hidden field to store  Method Ends
            //this.ptrMainSection.add(tmp_hdn_methodName);
        this.add(tmp_hdn_dynMethodName);
		
		
        //Hidden field to store Screen Mode
        this.hdnScreenMode = Ext.create("Ext.form.Hidden", {
                itemId: "screenMode",
                width: 0,
                height: 0
            })
            //this.ptrMainSection.add(this.hdnScreenMode);
        this.add(this.hdnScreenMode);
        //Hidden field to store Screen Mode
        
		this.hdnUID = Ext.create("Ext.form.Hidden", {
                itemId: "iUID",
                width: 0,
                height: 0,
				value:"111333"
            })
            //this.ptrMainSection.add(this.hdnScreenMode);
        this.add(this.hdnUID);
		
		this.hdnScreenName = Ext.create("Ext.form.Hidden", {
                itemId: "strScreenName",
                width: 0,
                height: 0,
				value:""
            })
            //this.ptrMainSection.add(this.hdnScreenMode);
        this.add(this.hdnScreenName);
		
		/*
		this.hdnChartSeries = Ext.create("Ext.form.Hidden", {
                itemId: "hdnChartSeries",
                width: 0,
                height: 0
            })
            //this.ptrMainSection.add(this.hdnScreenMode);
        this.add(this.hdnChartSeries);
		
		this.hdnChartValue = Ext.create("Ext.form.Hidden", {
                itemId: "hdnChartValue",
                width: 0,
                height: 0
            })
            //this.ptrMainSection.add(this.hdnScreenMode);
        this.add(this.hdnChartValue);		
		*/
		
        //Export to Excel. IFRAME

        this.hdnIframe = Ext.create("Ext.Component", {
                hidden: true,
                width: 0,
                height: 0
            })
            //this.ptrMainSection.add(this.hdnIframe);
        this.add(this.hdnIframe);
		




        //Attach Event Handlers
        Ext.each(this.eventHandlers,
            function(event_handler_obj) {
                /*
					Logic :
						If (liveSetupFlag) 
							process event handlers
						else
							load Proto Data.
				*/
                if (form_obj.liveSetupFlag & form_obj.liveScreenFlag) {
                    /*
						Textbox On Enter
					*/

                    if (event_handler_obj["tasktype"] == "onenter") {
                        form_obj.queryById(event_handler_obj["controlid"]).on("specialkey",
                            function(controlobj, eventobj) {
                                //console.log(eventobj);
                                /*
									if (eventobj==undefined)
									{
									form_obj.queryById("methodName").setValue(event_handler_obj["methodName"]);
									textbox_helponenter(form_obj,controlobj,event_handler_obj["controlid"],event_handler_obj["input"],event_handler_obj["service"]);
									}
									else
									*/
                                if (eventobj. /*getKey()*/ keyCode == eventobj.ENTER) {
                                    form_obj.queryById("methodName").setValue(event_handler_obj["methodName"]);
                                    textbox_onenter(form_obj, controlobj, eventobj, event_handler_obj["controlid"], event_handler_obj["input"], event_handler_obj["service"]);
                                }
                            }, form_obj);
                    }

                    /*
						Combo on Change
					
                    if (event_handler_obj["tasktype"] == "onchange") {
                        form_obj.queryById(event_handler_obj["controlid"]).on("change",
                            function(controlobj, cbo_newvalue, cbo_oldvalue) {
                                form_obj.queryById("methodName").setValue(event_handler_obj["methodName"]);
                                combo_onchange(form_obj, controlobj, cbo_newvalue, cbo_oldvalue, event_handler_obj["controlid"], event_handler_obj["input"], event_handler_obj["service"]);
                            }, form_obj);
                    }*/
					if (event_handler_obj["tasktype"] == "onchange") 
					{
						
                        form_obj.queryById(event_handler_obj["controlid"]).on("change",
                            function(controlobj, cbo_newvalue, cbo_oldvalue) 
							{								
								
								//if (cbo_newvalue != "" && cbo_newvalue != null) //74897
								if (cbo_newvalue != "" && cbo_newvalue != null) //74897
								{								
                                form_obj.queryById("methodName").setValue(event_handler_obj["methodName"]);
                                combo_onchange(form_obj, controlobj, cbo_newvalue, cbo_oldvalue, event_handler_obj["controlid"], event_handler_obj["input"], event_handler_obj["service"]);
								}
                            }, form_obj);
                    }
                    /*
						Screen on Load
					*/
                    if (event_handler_obj["tasktype"] == "onload") {
                        form_obj.on("afterrender",
                            function() {

                                //Load Initial Values
                                //console.log("Initialize ")
                                //console.log(form_obj.initialValues)
                                if (form_obj.initialValues != "") {
                                    Ext.each(form_obj.initialValues, function(initValueObj) {
                                        form_obj.queryById(initValueObj["ctrl"]).setValue(initValueObj["value"]);
                                    })
                                }
								
								form_obj.queryById("methodName").setValue(event_handler_obj["methodName"]);
								
								if(form_obj.queryById("dynMethodName").getValue() != "")
								{
									form_obj.queryById("methodName").setValue(form_obj.queryById("dynMethodName").getValue());
									form_obj.queryById("dynMethodName").setValue("");
								}

                                form_onload(form_obj, event_handler_obj["input"], event_handler_obj["service"],event_handler_obj["callbackMethod"]);
                            }, form_obj);
							
							
                    }

                    /*
						Button Click Handlers.
					*/
                    if (event_handler_obj["tasktype"] == "btnclick") {
						if (form_obj.queryById(event_handler_obj["controlid"]) !=undefined &&
							form_obj.queryById(event_handler_obj["controlid"]) !=null
						)
						{
							form_obj.queryById(event_handler_obj["controlid"]).on("click",
								function(controlobj, eventobj) {
									/*Code commented by Rajiv R for id: 57349 starts here*/
									/*							
									//form_obj.queryById("methodName").setValue(event_handler_obj["methodName"]);
									//button_click(form_obj,controlobj,eventobj,event_handler_obj["controlid"],event_handler_obj["input"],event_handler_obj["service"]);
									*/
									/*Code commented by Rajiv R for id: 57349 ends here*/
									/*Code added by Rajiv R for id: 57349 starts here*/
									
									if(form_obj.ptrMainSection.getForm().isValid())
										{
										if (event_handler_obj["ExcelViewer"] !=undefined)
											form_obj.queryById("ReportViewer").setValue(event_handler_obj["ExcelViewer"]);
										else
											form_obj.queryById("ReportViewer").setValue("");
											
										form_obj.queryById("methodName").setValue(event_handler_obj["methodName"]);
										
										
										button_click(form_obj,controlobj,eventobj,event_handler_obj["controlid"],event_handler_obj["input"],event_handler_obj["service"],event_handler_obj["callbackMethod"]);
										}
									else
										{
											var invalidFields=[]
											form_obj.ptrMainSection.getForm().getFields().filterBy(function(field) {
											if (field.validate()) return;
											invalidFields.push(field.getActiveError());
											})			
											Ext.Msg.alert('Failure',(invalidFields.join("")))
										}
										
									/*Code added by Rajiv R for id: 57349 ends here*/
									//form_obj.queryById("methodName").setValue(event_handler_obj["methodName"]);
									//button_click(form_obj, controlobj, eventobj, event_handler_obj["controlid"], event_handler_obj["input"], event_handler_obj["service"]);
								}, form_obj);
							}
                    }

                    /*
						Toolbar click event handlers.
					*/
                    if (event_handler_obj["tasktype"] == "toolbarclick") {
                        form_obj.ptrScrActions.on(event_handler_obj["action"],
                            function() {
                                if (event_handler_obj["methodName"] == "customJSCall") {
                                    eval("form_obj." + event_handler_obj["service"] + "()");
                                } else {
                                    if (event_handler_obj["reportflag"] != undefined) {
                                        form_obj.queryById("methodName").setValue(event_handler_obj["methodName"]);
                                        toolbar_button_click(form_obj, event_handler_obj["input"], event_handler_obj["service"]);
                                    } else
                                    if (form_obj.ptrMainSection.getForm().isValid()) 
									{
										if (event_handler_obj["msg"] != undefined) 
										{
										var msg=event_handler_obj["msg"];
										var result = confirm(msg);
										if (result) 
										{
										form_obj.queryById("methodName").setValue(event_handler_obj["methodName"]);
										toolbar_button_click(form_obj, event_handler_obj["input"], event_handler_obj["service"]);										
										}
										}
										else
										{
                                        form_obj.queryById("methodName").setValue(event_handler_obj["methodName"]);
                                        toolbar_button_click(form_obj, event_handler_obj["input"], event_handler_obj["service"]);
										}
                                    } 
									else {
                                        var invalidFields = []
                                        form_obj.ptrMainSection.getForm().getFields().filterBy(function(field) {
                                            if (field.validate()) return;
                                            invalidFields.push(field.getActiveError());
                                        })
                                        Ext.Msg.alert('Failure', (invalidFields.join("")))
                                    }
                                }
                            }, this);
                    }
                } else {
                    /*
						Logic to load Proto data
					*/
                    if (event_handler_obj["tasktype"] == "proto") {
                        form_obj.on("afterrender",
                            function() {
                                launch_proto(form_obj, event_handler_obj["filename"]);
                            }, form_obj);
                    }

                }
            }
        );

        if (form_obj.liveSetupFlag && form_obj.toolbarSectionFlag) {
            form_obj.ptrScrActions.on("refresh",
                function() {
                    form_obj.initialValues = [];

                    form_obj.query('.field').forEach(function(field_obj) {
                        field_obj.setDisabled(false);
                        field_obj.suspendEvents(false);
                        field_obj.setValue();
                        field_obj.resumeEvents();
                    })

                    form_obj.query('.grid').forEach(function(field_obj) {
                        field_obj.setDisabled(false); //By default, make all the controls editable.
                        field_obj.getStore().clearFilter();
                        field_obj.getStore().removeAll();
                    })

                    form_obj.fireEvent("afterrender");
                }, this);
        }
    },

    /*
		Function to apply Screen Modes.
		Parameters: 
			enableFlag : true - All Screen Controls will be enabled.
						 false - All Screen Controls will be disabled.
			exceptionControl:
						: Array list to hold exception controls.
							These controls will be ignored in "Disable" operation.
		Logic:
			Except, KeyControls and exceptionControls all the other controls will 
					be enabled or disabled based on the enableFlag option.
	*/
    applyScreenMode: function(enableFlag, exceptionControl) {
        return;
        var form_obj = this;

        form_obj.query('.field').forEach(function(field_obj) {
            field_obj.setDisabled(false); //By default, make all the controls editable.
            if (!Ext.Array.contains(form_obj.keyFields, field_obj.getItemId())) {
                if (!Ext.Array.contains(exceptionControl, field_obj.getItemId())) {
                    field_obj.setDisabled(!enableFlag);
                } else {
                    field_obj.setDisabled(enableFlag);
                }
            }
        })

        form_obj.query('.grid').forEach(function(field_obj) {
            field_obj.setDisabled(false); //By default, make all the controls editable.

            if (!Ext.Array.contains(form_obj.keyFields, field_obj.getItemId())) {
                if (!Ext.Array.contains(exceptionControl, field_obj.getItemId())) {
                    field_obj.setDisabled(!enableFlag);
                } else {
                    field_obj.setDisabled(enableFlag);
                }
            }
        })

    },
    triggerLink: function() {
        alert("Test");
    },
    /*
		Function to process Hyper Links
	*/
    processHLink: function(linkId, record,chartPopup) {
        var initValueObj = [];
        var formObj = this;
		//Screen Link Validations
		if (formObj.screenLinks[linkId]["linkservice"] != undefined) {
			
			form_obj.queryById("methodName").setValue(formObj.screenLinks[linkId]["linkservice"]["methodName"]);
			
			if(!process_ebpack_service(form_obj,formObj.screenLinks[linkId]["linkservice"]["controlid"],formObj.screenLinks[linkId]["linkservice"]["service"]))
				return false
		}
		
        //Build Initial Value Object
        if (formObj.screenLinks[linkId]["hdr"] != undefined) {
            //console.log(this.screenLinks[linkId]["hdr"])
            formObj.screenLinks[linkId]["hdr"].forEach(
                function(hdrCtrlTmp) {

                    if (hdrCtrlTmp["src"] != "") {
                        var tmpObj = {}
                        tmpObj.ctrl = hdrCtrlTmp["dest"]
                        tmpObj.value = formObj.queryById(hdrCtrlTmp["src"]).getValue();
                        initValueObj.push(tmpObj)
                    }
                }
            )
        }
        if (formObj.screenLinks[linkId]["grid"] != undefined) {
            formObj.screenLinks[linkId]["grid"].forEach(
                function(hdrCtrlTmp) {
                    if (hdrCtrlTmp["src"] != "") {
                        var tmpObj = {}
                        tmpObj.ctrl = hdrCtrlTmp["dest"]
                        tmpObj.value = record.get(hdrCtrlTmp["src"]);
                        initValueObj.push(tmpObj)
                    }
                }
            )
        }
        plf.viewport.ptrContentPanel.appScreenPtr.removeAll(); /*code added for id:57410*/
        launch_screen(form_obj,"CueTrans.view." + formObj.screenLinks[linkId]["dest"], initValueObj, formObj.screenLinks[linkId]["tab"])
		if(chartPopup==true && chartPopup != undefined )
			{formObj.ownerCt.close()}
    },
    launchHlpLink: function(linkId, record, widthRatio, heightRatio) 
	{
		 /*
		This logic will be used to populate Help Screen values from Parent Screen.
		Pending
		*/
		/*
        var formObj = this;
        var hlpType = formObj.hlpLinks[linkId]["hlpType"];
		var gridID=	formObj.hlpLinks[linkId]["gridID"];
       
		var initValueObj=[];
        if (hlpType != undefined && hlpType == "grid") 
		{
		if(formObj.hlpLinks[linkId]["send"] != undefined)
		{			
			formObj.hlpLinks[linkId]["send"].forEach(
				function(hdrCtrlTmp)
				{	
					if(hdrCtrlTmp["parent"] != undefined && hdrCtrlTmp["parent"] != "")
					{						
						var tmpObj = {}
						tmpObj.ctrl = hdrCtrlTmp["child"]						
						var tmprecord = formObj.queryById(gridID).getSelectionModel().getSelection()[0];						
						tmpObj.value= tmprecord.get(hdrCtrlTmp["parent"]);
						initValueObj.push(tmpObj)
					}
					if(hdrCtrlTmp["direct"] != undefined && hdrCtrlTmp["direct"] != "")
					{						
						var tmpObj = {}
						tmpObj.ctrl = hdrCtrlTmp["child"]
						tmpObj.value= hdrCtrlTmp["direct"];
						initValueObj.push(tmpObj)
					}					
				}
			)
		}
		} 
		else 
		{
		
		if(formObj.hlpLinks[linkId]["send"] != undefined)
		{			
			formObj.hlpLinks[linkId]["send"].forEach(
				function(hdrCtrlTmp)
				{	
					if(hdrCtrlTmp["parent"] != undefined && hdrCtrlTmp["parent"] != "")
					{						
						var tmpObj = {}
						tmpObj.ctrl = hdrCtrlTmp["child"]
						tmpObj.value= formObj.queryById(hdrCtrlTmp["parent"]).getValue();
						initValueObj.push(tmpObj)
					}
					if(hdrCtrlTmp["direct"] != undefined && hdrCtrlTmp["direct"] != "")
					{						
						var tmpObj = {}
						tmpObj.ctrl = hdrCtrlTmp["child"]
						tmpObj.value= hdrCtrlTmp["direct"];
						initValueObj.push(tmpObj)
					}					
				}
			)
		}
		}
		*/
		var formObj = this;
        var hlpType = formObj.hlpLinks[linkId]["hlpType"];

        /*
		This logic will be used to populate Help Screen values from Parent Screen.
		Pending
		*/
        if (hlpType != undefined && hlpType == "grid") {} else {

        }
		var initValueObj=[];
		if(formObj.hlpLinks[linkId]["send"] != undefined)
		{			
			formObj.hlpLinks[linkId]["send"].forEach(
				function(hdrCtrlTmp)
				{	
					if(hdrCtrlTmp["parent"] != undefined && hdrCtrlTmp["parent"] != "")
					{						
						var tmpObj = {}
						tmpObj.ctrl = hdrCtrlTmp["child"]
						tmpObj.value= formObj.queryById(hdrCtrlTmp["parent"]).getValue();
						initValueObj.push(tmpObj)
					}
					if(hdrCtrlTmp["direct"] != undefined && hdrCtrlTmp["direct"] != "")
					{						
						var tmpObj = {}
						tmpObj.ctrl = hdrCtrlTmp["child"]
						tmpObj.value= hdrCtrlTmp["direct"];
						initValueObj.push(tmpObj)
					}					
				}
			)
		}
        launch_helpscreen(formObj, linkId, "CueTrans.view." + formObj.hlpLinks[linkId]["hlpScreen"],initValueObj,widthRatio,heightRatio)
    },
	/*
    launchpopupLink: function(linkId, record) {
        var initValueObj = [];
        var formObj = this;
        //popupLinks
        if (formObj.popupLinks[linkId]["grid"] != undefined) {
            formObj.popupLinks[linkId]["grid"].forEach(
                function(hdrCtrlTmp) {
                    if (hdrCtrlTmp["src"] != "") {
                        var tmpObj = {}
                        tmpObj.ctrl = hdrCtrlTmp["dest"]
                        tmpObj.value = record.get(hdrCtrlTmp["src"]);
                        initValueObj.push(tmpObj)
                    }
                }
            )
        }
        launch_custompopupscreen(formObj, linkId, "CueTrans.view." + formObj.popupLinks[linkId]["hlpScreen"], initValueObj)
    },
    launchpopupchart: function(linkId, xValue, yValue) {
        var initValueObj = [];
        var formObj = this;
        //popupLinks
        if (formObj.popupLinks[linkId]["grid"] != undefined) {
            formObj.popupLinks[linkId]["grid"].forEach(
                function(hdrCtrlTmp) {
                    if (hdrCtrlTmp["src"] != "") {
                        var tmpObj = {}
                        tmpObj.ctrl = hdrCtrlTmp["dest"]
                        tmpObj.value = xValue;
                        initValueObj.push(tmpObj)
                    }
                }
            )
        }
        launch_custompopupscreen(formObj, linkId, "CueTrans.view." + formObj.popupLinks[linkId]["hlpScreen"], initValueObj)
    },
    launchpopupSvg: function(linkId, id, Value) {
        var initValueObj = [];
        var formObj = this;
        launch_custompopupscreen(formObj, linkId, "CueTrans.view." + linkId["hlpScreen"], initValueObj)
    },
	*/
    packHelpResult: function(formObj) 
	{
        var dataToSave = [];
        formObj.hlpSearchGridPtr.getStore().clearFilter();
        Ext.each(formObj.hlpSearchGridPtr.getStore().getRange(), function(record) {
            if (record.get("select") != "" & record.get("select") != undefined & record.get("select") != '' & record.get("select") != null)
                dataToSave.push(record.data);
        })
        formObj.hlpParentForm.loadHelpResult(formObj.hlpParentForm, dataToSave, formObj.hlpParentHelpID)
        formObj.ownerCt.close()
    },
    loadHelpResult: function(formObj, hlpResultArray, linkId) 
	{
		
        var hlpType = formObj.hlpLinks[linkId]["hlpType"];
		if (hlpType != undefined && hlpType == "hdrgrid") 
		{
			if (hlpResultArray.length > 0) 
			{
				 var dataToSave = [];
				 var gridID = formObj.hlpLinks[linkId]["gridID"];
				 for (i = 0; i < hlpResultArray.length; i++) 
				 {
					var tmpHelpRecord = {};
					tmpHelpRecord["recStatus"] = "I";
					//tmpHelpRecord["id"] = i+1;
                    formObj.hlpLinks[linkId]["receive"].forEach(
                        function(hdrCtrlTmp) 
						{  	
						
                           tmpHelpRecord[hdrCtrlTmp["parent"]] = hlpResultArray[i][hdrCtrlTmp["child"]]							
                        })
					//console.log(i,tmpHelpRecord)
					dataToSave.push(tmpHelpRecord);		
                }

				//console.log(tmpHelpRecord,dataToSave,"sss");
				//console.log(dataToSave);
				
				//dataToSave.push(tmpHelpRecord);
				//console.log(hlpResultArray,tmpHelpRecord,dataToSave,"tmpHelpRecord");
				/*for(var i = 0; i < 5; i++) 
				  {								 
					 dataToSave.push({"recStatus":"I"});							 
				  }	*/
				//console.log(dataToSave,"dataToSave");
				var gridStore = Ext.data.StoreManager.lookup(gridID+'_store');
				//gridStore.clearFilter();
				if (gridStore.proxy.enablePaging)
				{							
					gridStore.getProxy().setData(dataToSave);
					gridStore.read();
					gridStore.setRemoteSort(true); 
				}
				else										
					gridStore.loadData(dataToSave,false);
			}
		}
        else if (hlpType != undefined && hlpType == "grid") 
		{
            if (hlpResultArray.length > 0) 
			{
                var gridID = formObj.hlpLinks[linkId]["gridID"];
                var record = formObj.queryById(gridID).getSelectionModel().getSelection()[0];
                var selected = formObj.queryById(gridID).store.indexOf(record);
                var parentcnt = formObj.queryById(gridID).getStore().getRange().length;
				//console.log(selected,parentcnt,"hlpResultArray");
				if (selected ==-1)
					selected=0;
				
                var cnt = parentcnt - selected;
                var i, j, k;
                for (i = 0; i < hlpResultArray.length; i++) {
                    formObj.hlpLinks[linkId]["receive"].forEach(
                        function(hdrCtrlTmp) {
                            j = 0;
                            Ext.each(formObj.queryById(gridID).getStore().getRange(), function(record, rowIndex) {
                                if (selected == rowIndex & j == 0) {
                                    record.set(hdrCtrlTmp["parent"], hlpResultArray[i][hdrCtrlTmp["child"]])
                                    j = 1;
                                }
                            })
                        })
                    selected = selected + 1;
                }
                /*New Records Insert*/
				var tmpHelpRecord = {};
				
				var gridStore = Ext.data.StoreManager.lookup(gridID + '_store');
				var recorddata = gridStore.getProxy().getReader().rawData;
				var dataToSave = [];
				
                for (k = cnt; k < hlpResultArray.length; k++)
				{
                    formObj.hlpLinks[linkId]["receive"].forEach(
                        function(hdrCtrlTmp) 
						{
                            tmpHelpRecord[hdrCtrlTmp["parent"]] = hlpResultArray[k][hdrCtrlTmp["child"]]
                        }
                    )
					if (gridStore.proxy.enablePaging != undefined) 
					{					
					recorddata.push(tmpHelpRecord);
					tmpHelpRecord = {};
					}
					else
					Ext.data.StoreManager.lookup(gridID + '_store').add(tmpHelpRecord);
                }
				console.log(recorddata,"recorddata");
				if (gridStore.proxy.enablePaging != undefined) 
				{
				var recCount = 0;
				Ext.each(recorddata, function(record) 
					 {
						 if (record.recStatus != "D") 
						 {
						 var tmpSelRecord = Ext.clone(record);
						 tmpSelRecord.recStatus = "I";
						 record.select = false;
						 tmpSelRecord.select = false;
						 delete tmpSelRecord["id"];
						 dataToSave.push(tmpSelRecord)
						 recCount = recCount + 1;
						 }
						 })
				console.log(dataToSave,"dataToSave");
				gridStore.getProxy().setData(dataToSave, true);
				gridStore.setRemoteSort(true)
				gridStore.setRemoteFilter(true)	
				//gridStore.loadPage(Math.ceil(recCount / gridStore.getPageSize()));
				}
				/*
                var tmpHelpRecord = {};
                for (k = cnt; k < hlpResultArray.length; k++) {
                    formObj.hlpLinks[linkId]["receive"].forEach(
                        function(hdrCtrlTmp) {
                            tmpHelpRecord[hdrCtrlTmp["parent"]] = hlpResultArray[k][hdrCtrlTmp["child"]]
                        }
                    )
                    Ext.data.StoreManager.lookup(gridID + '_store').add(tmpHelpRecord);
                }
				*/
                /*New Records Insert*/
                /*
					var i;
					for (i = 0; i < hlpResultArray.length; i++) 
					{
						if(i==0)
						{
							var tmpHelpRecord = formObj.queryById(gridID).getSelectionModel().getSelection()[0]
						}
						else
						{
							var tmpHelpRecord = {}
						}
						
						formObj.hlpLinks[linkId]["receive"].forEach(
							function(hdrCtrlTmp)
							{
								if(i==0)
									tmpHelpRecord.set(hdrCtrlTmp["parent"],hlpResultArray[i][hdrCtrlTmp["child"]])
								else
									tmpHelpRecord[hdrCtrlTmp["parent"]] =hlpResultArray[i][hdrCtrlTmp["child"]]
							})

						if(i!=0)
						{
							Ext.data.StoreManager.lookup(gridID+'_store').add(tmpHelpRecord);
						}
					}
					*/

                //var record =formObj.queryById(gridID).getSelectionModel().getSelection()[0];

                /*
							Ext.each(formObj.queryById(gridID).getStore().getRange(), function(record,rowIndex) 
							{
								//alert(rowIndex);										
								var i;
								for (i = 0; i < hlpResultArray.length; i++) 
								{
									if (i<=rowIndex)
									{													
										record.set(hdrCtrlTmp["parent"],hlpResultArray[i][hdrCtrlTmp["child"]]);													
									}
								}
									
							})
						}
						*/
            }
        } else {
            if (hlpResultArray.length > 0) {
                formObj.hlpLinks[linkId]["receive"].forEach(
                    function(hdrCtrlTmp) {
                        if (hdrCtrlTmp["parent"] != "") {
                            formObj.queryById(hdrCtrlTmp["parent"]).setValue(hlpResultArray[0][hdrCtrlTmp["child"]]);
                            formObj.queryById(hdrCtrlTmp["parent"]).fireEvent("specialkey", formObj.queryById(hdrCtrlTmp["parent"]), {
                                keyCode: 13,
                                ENTER: 13
                            });
                        }
                    }
                )
            }
        }
    },

    ProcessGridOnEnter: function(gridID, recordID, eventID) 
	{
        //console.log(gridID,recordID,eventID)

        var form_obj = this;
        Ext.each(this.eventHandlers,
            function(event_handler_obj) {
                if (form_obj.liveSetupFlag) {
                    if (event_handler_obj["grideventid"] == eventID) {
                        form_obj.queryById("methodName").setValue(event_handler_obj["methodName"]);
                        grid_onenter(form_obj, event_handler_obj["input"], event_handler_obj["service"], gridID, recordID);
                    }
                }
            })

    },
	 ProcessGridOnPrint: function(gridID, recordID, eventID) 
	{
        //console.log(gridID,recordID,eventID)
		
        var form_obj = this;
        Ext.each(this.eventHandlers,
            function(event_handler_obj) {
                if (form_obj.liveSetupFlag) {
                    if (event_handler_obj["grideventid"] == eventID) {
                        form_obj.queryById("methodName").setValue(event_handler_obj["methodName"]);
                        grid_onprint(form_obj, event_handler_obj["input"], event_handler_obj["service"], gridID, recordID);
                    }
                }
            })
    }
    /*Custom Coding Ends*/

});