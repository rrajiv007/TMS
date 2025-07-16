/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                         
************************************************************************************************/
Ext.define('CueTrans.view.COASTAL_PERF_CONFI.OriginGrpConfiguration', 

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.7;
		mainpage.popupWidthRatio=.7;	
		mainpage.startPainting();
		
		mainpage.screenName = "Origin Group Configuration";
		
	
		mainpage.liveScreenFlag=true;
		mainpage.toolbarSectionFlag=true;
		//Add the header portion
		plf.columns=3
		var OriginGroupConfDetailsColumn = plf.addColumnSection({title:"", collapsed: true});
		
		
		var OriginGroupConfCtrl=
		[
			plf.addCombo({"label":"Origin Group Name",id:"strJourneyPlanNo","mandatory":"true"}) 
		]
		
		OriginGroupConfDetailsColumn.add(OriginGroupConfCtrl);
		 
		 
		var OriginGroupConfDetailsGridObj=	
		[
			{columnname:"Location Code",dataname:"LSR_TYPE",datatype:"string",width:150,editControl:"textbox",helpid:'Location'},
			//{columnname:"Location Code",dataname:"LOC_CODE",datatype:"string",width:150,editControl:"textbox",helpid:'Location'},
			{columnname:"Location Name",dataname:"LOC_NAME",datatype:"string",width:150,editControl:"addDisplayOnly"},
            {columnname:"Region",dataname:"REGION",datatype:"string",width:200,editControl:"addDisplayOnly"}
			
			
		]
		var OriginGroupConfDetailsGridDtl=
		{
			title:"",
			id:"JMSLSRDTL", 
			detail:OriginGroupConfDetailsGridObj,
			columnWidth:1,
			visibleRow:10
		}
		var OriginGroupConfDetailsGridSection = plf.addGrid(OriginGroupConfDetailsGridDtl,this)
		
		
		var amendDetails = plf.addColumnSection({title:""})
		
		var amendDetailsCtrl=
		[   
		    // plf.addText({"label":"Amend Reason",id:"strReason","mandatory":"true"}) ,
			plf.addBlank({}),
            plf.addButton({"label":"Save","id":"Save",tooltip:"Click here to save.",width:100})			 
		]
		
		amendDetails.add(amendDetailsCtrl);	
		// mainpage
		mainpage.ptrMainSection.add(OriginGroupConfDetailsColumn)
		OriginGroupConfDetailsGridSection.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(OriginGroupConfDetailsGridSection) 
		mainpage.ptrMainSection.add(amendDetails) 
		
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=false;
		
		
		mainpage.eventHandlers = 
			[
			   {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreJourneyPlanService",
				"methodName":"initOriginGroupConfTs"
		       },
			   {
					"controlid":"strJourneyPlanNo",
					"tasktype":"onchange",
					"input":["strJourneyPlanNo"],
					"service":"CoreJourneyPlanService",
					"methodName":"onchangeOrgGrpConfiNameTs"
				},
				{
					"controlid":"Save",
					"tasktype":"btnclick",
					"input":["strJourneyPlanNo","JMSLSRDTL"],
					"service":"CoreJourneyPlanService",
					"methodName":"saveOrgGroupConfTS" 
				}
			]
		mainpage.screenLinks=
		{
			
		}	
		
		mainpage.hlpLinks=
		{
			"Location":
				{
					"hlpType":"grid",
					"gridID":"JMSLSRDTL",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
					        {"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						],
					"receive":[
					           
							   {"parent":"LSR_TYPE","child":"LOC_CODE"},
							   //{"parent":"LOC_CODE","child":"LOC_CODE"},
							  {"parent":"LOC_NAME","child":"LOC_NAME"},
							  {"parent":"REGION","child":"REGION"}

                              ]
				}

		}
		
		this.callParent(arguments);
		
	
	}
});