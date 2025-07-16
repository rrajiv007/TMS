/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var		                                   
************************************************************************************************/
Ext.define('CueTrans.view.tms.VehicleRosteringSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Rostering List";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Vehicle Bulk Scheduling","linkid":"tms_bulkroster"}
                   //  {"name":"OTO Rostering","linkid":"tms_OTORoster"} 
		]		
		//Vehicle Rostering Search Section Begins
		plf.columns=3
		var helpOnVehicleRostHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"getDetailsBtn"},this);
	 	var helpOnVehicleRostFormCtrl=
		[
			plf.addDate({"label":"Date",id:"dtDate","mandatory":"true"}),
			plf.addText({"label":"Time",id:"strTime"}),
            plf.addCombo({"label":"Commodity",id:"strCommodity"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),	
			plf.addCombo({"label":"Destination",id:"strDestination"}),			
			//plf.addBlank(),
			//plf.addBlank(),
			//plf.addButton({"label":"Search",id:"getDetailsBtn","tooltip":"Click here to search."})
			

		]
		
		helpOnVehicleRostHdrCollapse.add(helpOnVehicleRostFormCtrl);
		//Driver Search Section Ends
		
		//Driver Grid Section Begins
		var helpOnVehicleRostGridFieldObj=
		[
			
			{columnname:"Request No",dataname:"DOC_NO",datatype:"string",width:100,linkId:"requestnolink",tooltip:"Click here to launch the scheduling screen."},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:100},
                     {columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:100},
                     {columnname:"Ref Doc No",dataname:"DO_NO",datatype:"string",width:100},
                     {columnname:"Requested By",dataname:"REQUESTOR_NAME",datatype:"string",width:100},
        		{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:120},
       		{columnname:"No Of Vehicles",dataname:"NO_OF_VEHICLES",datatype:"string",width:100,colAlign:'center'},
       		{columnname:"Roster<br>Pending",dataname:"ROSTER_PENDING",datatype:"string",width:70,colAlign:'center'},
			{columnname:"Required Date",dataname:"ROS_DATE_TIME",datatype:"string",width:100},			
			{columnname:"Scheduling Status",dataname:"ROSTER_STATUS",datatype:"string",width:120},
			{columnname:"Ref<br>Line.No",dataname:"REF_LINE_NO",datatype:"string",width:70,hidden:true},
			
		]
		helpOnVehicleRostGridDtl=
		{
			title:"",
			id:"getDetailsGrid",
	       detail:helpOnVehicleRostGridFieldObj,
		     visibleRow:8
		   }
		var helpGridSection = plf.addGrid(helpOnVehicleRostGridDtl,this)
		//Driver Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnVehicleRostHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initVehRosterTS"
			},	
		{       
				"controlid":"getDetailsBtn",
				"tasktype":"btnclick",
				"input":["dtDate","strTime","strPriority","strCommodity","strOrigin","strDestination"],
			    "service":"TMSCoreTransportTS",
				"methodName":"rostGetDetailsTS"
		}
			
		];
		//Event Handlers Mapping Ends
		mainpage.screenLinks=
		{
			"VehicleRosteringLTL":
				{
					"dest":"tms.VehicleRosteringLTL",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"DOC_NO","dest":"strLoadNo"},
							{"src":"VEHICLE_CATEGORY","dest":"strVehicleCategory"},
							]
				},
			"VehicleRosteringFTL":
				{
					"dest":"tms.VehicleRosteringFTL",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"DOC_NO","dest":"strRequestNo"}
							]
				},
				"tms_bulkroster":
				{
					"dest":"tms.VehicleRosteringBulk",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
                         "requestnolink":
                           {
					"dest":"tms.OTORostering",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"DOC_NO","dest":"strRequestNo"}
							]
				}
                         

				
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
