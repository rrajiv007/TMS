/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			           Remarks             
************************************************************************************************	
1.0.0	     Raj		    20/07/2020                         Origin Group Configuration  		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.OriginGroupConfiguration', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Origin Group Configuration";
		
		
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [
			
			{
                "name": "Save",
                "tooltip": "Click here to save."
            }
            ]
		mainpage.toolbarLinks=
		[
			{"name":"SLA For Coastal Performance","linkid":"SLA_COASTAL","tooltip":"Click here to launch the SLA For Coastal Performance screen."},
			
		]
		plf.columns=4
		var OriginGroupConfDetailsColumn = plf.addColumnSection({title:"This module is to manage the Origin Group for the Coastal Performance Report"});
		
		var OriginGroupConfCtrl=										
		[	
	
			plf.addCombo({"label":"Origin Group Name",id:"strJourneyPlanNo","mandatory":"true"})      			
		]
		OriginGroupConfDetailsColumn.add(OriginGroupConfCtrl);
		//OriginGroupConf Details  Section start
      
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
		
				
		//OriginGroupConfDetailsColumn.add(OriginGroupConfDetailsGridSection)
		
		//OriginGroupConf Details  Section Ends
		mainpage.ptrMainSection.add(OriginGroupConfDetailsColumn)
		OriginGroupConfDetailsGridSection.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(OriginGroupConfDetailsGridSection);//OriginGroupConfDetailsColumn
		
		mainpage.eventHandlers = 
		[	
            { 
				"controlid":"",
				"tasktype":"onload", 
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"initOriginGroupConfTs"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strJourneyPlanNo","JMSLSRDTL"],
				"service":"CoreJourneyPlanService",
				//"methodName":"saveOriginGroupConfTS"
				"methodName":"saveOrgGroupConfTS"
			},
            {
				"controlid":"strJourneyPlanNo",
				"tasktype":"onchange",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"onchangeOrgGrpConfiNameTs"
			}			
		];
		
		mainpage.screenLinks=	
		{
			"SLA_COASTAL":
				{
					"dest":"jm_master.SLAConfigurationForCoastalPerRpt",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
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
		//mainpage.generateScreen();
		
	}
	

			
});
