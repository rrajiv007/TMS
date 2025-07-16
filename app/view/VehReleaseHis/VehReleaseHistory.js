/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	Divya																                                         
Version		  :	1.0.2															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
            
************************************************************************************************/
Ext.define('CueTrans.view.VehReleaseHis.VehReleaseHistory', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Vehicle Release History";
		
		mainpage.toolbarSectionFlag=true;
		plf.columns = 4
		var VehHisHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch",},this);//69997
		
		
		var VehHisFormCtrl=															//69997
		[
			plf.addText({"label":"Scheduled Vehicle",id:"strSchVehicle"}),
			plf.addCombo({"label":"Vehicle Category",id:"strVehicleCategory"}),
			plf.addText({"label":"Contract No",id:"strContractNo"}),
			plf.addText({"label":"Reported Vehicle",id:"strReportingVehicle"}),
			plf.addText({"label":"Load No",id:"strLoadNo"}),
			plf.addCombo({"label":"Origin",id:"strOrigin"}),
			plf.addCombo({"label":"Destination",id:"strDestination"}),
			plf.addCombo({"label":"Loading Point",id:"strLoadPoint"}),
			plf.addCombo({"label":"Unloading Point",id:"strUnLoadPoint"}),
			plf.addText({"label":"Journey Plan No",id:"strJourneyPlanNo"}),
			plf.addCombo({"label":"Release To",id:"strReleaseTo"}),
			plf.addCombo({"label":"Date Type",id:"strDateType"}),
			plf.addDate({"label":"Date From",id:"strFromDate"}),
			plf.addDate({"label":"Date To",id:"strToDate"})
			
		]
		
		VehHisHdrCollapse.add(VehHisFormCtrl);
		
		var VehHisGridFieldObj=									//69997
		[
			{columnname:"Scheduled Vehicle",dataname:"SCH_VEH",datatype:"string",width:120,linkId:"vehicledetailslink","tooltip": "Click here to view vehicle release history details."},
			{columnname:"Vehicle category",dataname:"VEH_CAT",datatype:"string",width:150},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",datatype:"string",width:90},
			{columnname:"Contractor Name",dataname:"CONTRACT_NAME",datatype:"string",datatype:"string",width:120},
			{columnname:"Contractor contact",dataname:"CONTRACT_CONT",datatype:"string",datatype:"string",width:120},
			{columnname:"Reported Vehicle",dataname:"REP_VEH",datatype:"string",datatype:"string",width:120},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:90},
			{columnname:"Load Created Date",dataname:"LOAD_CR_DT",datatype:"string",width:130},
			{columnname:"Load Departure Date",dataname:"LOAD_DEP_DT",datatype:"string",width:130},
			{columnname:"Vehicle Allocated Date",dataname:"VEH_ALL_DT",datatype:"string",width:130},
			
			
			{columnname:"Delivered Date",dataname:"DELV_DATE",datatype:"string",datatype:"string",width:100},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",datatype:"string",width:100},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",datatype:"string",width:100},
			{columnname:"Loading Point",dataname:"LOAD_POINT",datatype:"string",datatype:"string",width:100},
			{columnname:"Unloading Point",dataname:"UNLOAD_POINT",datatype:"string",width:130},
			{columnname:"Load Description",dataname:"LOAD_DESC",datatype:"string",width:130},
			{columnname:"Journey Plan No",dataname:"JP_NO",datatype:"string",width:120},
			{columnname:"Journey Manager Name",dataname:"JP_MANG_NAME",datatype:"string",width:150},
	
			{columnname:"Driver Code",dataname:"DRIVER_CODE",datatype:"string",width:130},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",datatype:"string",width:100},
			{columnname:"Driver Contact",dataname:"DRIVER_CONT",datatype:"string",datatype:"string",width:120},
			{columnname:"Journey Closed Date",dataname:"JP_CLOSE_DT",datatype:"string",datatype:"string",width:130},
			{columnname:"Journey Closed By",dataname:"JP_CLOSE_BY",datatype:"string",datatype:"string",width:120},
			{columnname:"Truck Released Date",dataname:"TRUCK_REL_DT",datatype:"string",width:130},
			{columnname:"Truck Released By",dataname:"TRUCK_REL_BY",datatype:"string",width:130},
			{columnname:"Vehicle Base Location during allocation",dataname:"VEH_BASELOC",datatype:"string",width:132},
			{columnname:"Release To",dataname:"RELEASE_TO",datatype:"string",width:100}
		]
		VehHisGridDtl=
		{
			title:"",
			id:"distGrid",
			detail:VehHisGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			readOnly:true,
			removeAddDelete:true
		}
		var VehHisGridSection = plf.addGrid(VehHisGridDtl,this)	//69997
		
	
		mainpage.ptrMainSection.add(VehHisHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(VehHisGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins

		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initVehRelHisTs"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strLoadNo","strDateType","strFromDate","strToDate","strOrigin","strDestination",
				"strVehicleCategory","strContractNo","strJourneyPlanNo","strReportingVehicle","strLoadPoint",
				"strUnLoadPoint","strReleaseTo","strSchVehicle"],
				"service":"TMSCoreTransportTS",
				"methodName":"fetchVehRelHisTs"
			}
		/*{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initAddKMSetSrc"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strDistCodeFrom","strDistDesc","strStatus","strFromLoc","strToLoc","strDistance","strTime"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchAllAddKMSetTs"
			}*/
			
		];
			
		mainpage.screenLinks=
		{
			"fin_newdist":
				{
					"dest":"AdditionKMSetup.AddKMSetupMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"vehicledetailslink":
				{
					"dest":"VehReleaseHis.VehReleaseHisDetails",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SCH_VEH","dest":"strVehRegNo"},
							{"src":"VEH_CAT","dest":"strVehicleCategory"},
							]
				},
				"distBulk":
				{
					"dest":"tariff.DistanceBulk",
					"hdr":[
							{"src":"","dest":""}							
					],
					"grid":[
							{"src":"","dest":""}
					]
				}
		}
		this.callParent(arguments);
	}
});