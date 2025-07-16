Ext.define('CueTrans.view.bpmn.BPMNProcess', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "BPMN Process Flow";
		
		var me=this;
		
		this.imgPtr = 	plf.addImage({"title":"Process Viewer",id:"strProcessviewer",src:"resources/images/bpmn/AutoGenerateRequestProcess.png"})
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		mainpage.toolbarLinks=
		[
			{"name":"BPMN Rule Definition","linkid":"bpmn_ruledefinition"},
			{"name":"BPMN User Assignment","linkid":"bpmn_usrassignment"},
			{"name":"Multi Authorise - Path Definition","linkid":"bpmn_pathdefinition"},
			{"name":"Multi Authorise - Level Definition","linkid":"bpmn_leveldefinition"}
		]
		
		
		//Add Keyfields
		//mainpage.keyFields=[""]
		
		//Process Master Section Begins
		plf.columns=4
		ProcessMstrColumn = plf.addColumnSection({title:"",columnWidth:.75});
		
		ProcessMasterCtrl=
		[	
			plf.addCombo({"label":"Process Name",id:"strProcessName","mandatory":"true"}),
			plf.addCombo({"label":"Sub Process Name",id:"strSubProcessName","mandatory":"true",
			"listeners":{
							change: function (field, newValue, oldValue) 
							{	
								////var tmpId = Ext.ComponentQuery.query('#strProcessviewer')[0].id;
								//var  DomEl= Ext.getCmp(tmpId);	
								//console.log(DomEl,"DomEl");
								//alert("Wait");
								//DomEl.setSrc("");		
								// alert("field"+field+"oldvalue"+oldvalue);								
								if (newValue !=undefined & newValue !="" & newValue !='' & newValue!=null)
								{
									var newValue1 =newValue+".png";
									//DomEl.setSrc("resources/images/bpmn/"+newValue);
									//DomEl.doComponentLayout();
									//DomEl.updateLayout();
									me.imgPtr.setSrc("resources/images/bpmn/"+newValue1)
								}											
							}
						}
			
			})
			
	
						
		]	
		plf.columns=4
		ProcessDescColumn = plf.addColumnSection({title:"",columnWidth:.75,height:50});
		
		ProcessDescCtrl=
		[
			//plf.addTextArea({"label":"Process Desc",id:"strProcessDesc",inputFormat:"string",InputLength:"100",height:50,readOnly:true})
			
						
		]	
		
		
		ProcessImgColumn = plf.addGenSection({title:"",columnWidth:.9,height:275,layout:"fit",scroll:true});
		
		ProcessImageCtrl=
		[	
			
			this.imgPtr
			
		]
		
		PdfVwColumn = plf.addColumnSection({title:"",columnWidth:.9,scroll:true});
		
		PdfviewerCtrl=
		[	
			plf.addFieldContainer
			({
					"layout":"hbox",
					"controls":
					[
						plf.addLabel({"label":" ","id":"strPath"}),
						Ext.create('Ext.Component', {
							html: '<u>Pdf Viewer</u>',
							listeners: {
							render: function(c){
								c.getEl().on({
									click: function() {
											//var DomEl = Ext.getCmp('strProcessName');
											var DomEl = Ext.ComponentQuery.query('#strSubProcessName#')[0];
											console.log(DomEl.rawValue);
											if (DomEl.rawValue !=undefined & DomEl.rawValue !="" & DomEl.rawValue !='' & DomEl.rawValue!=null)
											{
											var tmpValue="resources/images/bpmn/"+DomEl.rawValue+".png";	
											var win = Ext.create('Ext.window.Window' ,{
											title: 'PDF Content',
											width: 		plf.screenWidth*.8,
											height: 	window.screen.availHeight *.8,
											autoScroll:	true,
											closeAction: 'hide',
											items: [{ 
													 xtype: 'component',
													 html : '<iframe src="'+tmpValue+'" height="500" width="'+plf.screenWidth*.8+'"></iframe>',
												  }]
											});
											win.show();
											}
											
										
									}
								});
							}
							}
						})
						
					]
				}
			)		
						
		]
		
		ProcessMstrColumn.add(ProcessMasterCtrl);
		ProcessDescColumn.add(ProcessDescCtrl);
		ProcessImgColumn.add(ProcessImageCtrl);
		PdfVwColumn.add(PdfviewerCtrl);
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(ProcessMstrColumn) //Add Header Section to Main Page
		mainpage.ptrMainSection.add(ProcessDescColumn) //Add Header Section to Main Page
		mainpage.ptrMainSection.add(ProcessImgColumn)  //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(PdfVwColumn)  //Add Grid Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strProcessName"],
				"service":"BPMNCoreService",
				"methodName":"initBPMNTS"
			},
			{
					"controlid":"strProcessName",
					"tasktype":"onchange",
					"input":["strProcessName"],
					"service":"BPMNCoreService",
					"methodName":"fetchProcessTS"
			}
			
			
		];
		//Event Handlers Mapping Ends
		mainpage.screenLinks=
		{
			"bpmn_ruledefinition":
				{
					"dest":"bpmn.BPMNRuleDefinition",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"bpmn_pathdefinition":
				{
					"dest":"bpmn.PathDefinition",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"bpmn_leveldefinition":
				{
					"dest":"bpmn.LevelDefinition",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"bpmn_usrassignment":
			{
				"dest":"bpmn.BPMNUserAssignment",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			}	
		}
		
		mainpage.screenModes=
		{
			
		}
			
		//Generate Screen Section
		/*mainpage.generateScreen();
		
		
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	}
});