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
Ext.define('CueTrans.view.tms.LoadPlanView', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Load Plan View";
		mainpage.toolbarSectionFlag=true;	
		mainpage.toolbarActions=["Confirm Load"]
		mainpage.toolbarLinks=
		[
			{"name":"Vehicle Demand Planning","linkid":"tms_vehdemandplan"}			
		]
		/*Hdr starts here*/
		plf.columns=4
		var LoanPlanViewHdr = plf.addColumnSection({}); 
		var LoanPlanViewHdrFormCtrl=
		[
		plf.addDisplayOnly({"label":"Plan Line No",id:"strPlanLineNo"}),		
		plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
		plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
		plf.addDisplayOnly({"label":"Route",id:"strRouteCode"}),
		plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCategory"}),
		plf.addCombo({"label":"Utilization Type",id:"strUtilType"}),
		plf.addDate({"label":"Load Date",id:"dtLoadDate","mandatory":"true"}),
		//plf.addText({"label":"Load Time",id:"tmLoadTime","mandatory":"true"}),
		plf.addHidden({"label":"",id:"strHdnGuid"})
		]	
		LoanPlanViewHdr.add(LoanPlanViewHdrFormCtrl); 
		/*Hdr ends here*/	
		
		/*LoanPlanView Grid Section starts here*/
		var LoanPlanViewGridObj=
		[	
			{columnname:"Vehicle_code",dataname:"REQUEST_TYPE",datatype:"string",width:70,hidden:true},
			{columnname:"Load Line No",dataname:"PLANLINENO",datatype:"string",width:200},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:150},
			{columnname:"Load Weight(ton)",dataname:"LOAD_WEIGHT",datatype:"string",width:160},
			{columnname:"Utilization %",dataname:"Utilization",datatype:"string",width:200},
			{columnname:"Total Shipments",dataname:"TOT_SHIPMENTS",datatype:"string",width:150,linkId:"shiplink"},					
		]
		LoanPlanViewGridDtl=
		{
			title:"",
			id:"LoanPlanView",
			detail:LoanPlanViewGridObj,
			readOnly:true,
			removeAddDelete: true
		   }
		var GridSection = plf.addGrid(LoanPlanViewGridDtl,this)
				
		//Add Child Sections
		mainpage.ptrMainSection.add(LoanPlanViewHdr)		
		mainpage.ptrMainSection.add(GridSection) 
		//mainpage.ptrMainSection.add(VehDemandHdrConfirmLoadbtn) 
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		  {
				    "controlid":"",
				    "tasktype":"onload",
				    "input":["strOrigin","strDestination","strRouteCode","strVehicleCategory","strUtilType","strHdnGuid"],
				    "service":"TMSCoreTransportTS",
				    "methodName":"initLoanPlanViewTS"
	      }
		];
		mainpage.screenLinks=
		{
			"shiplink":
				{
					"dest":"tms.ShipmentLoadPlanView",
					"hdr":[
							{"src":"strPlanLineNo","dest":"strPlanLineNo"},						
							{"src":"strRouteCode","dest":"strRouteCode"},
							{"src":"strOrigin","dest":"strOrigin"},
							{"src":"strDestination","dest":"strDestination"},
							{"src":"strVehicleCategory","dest":"strVehicleCategory"},
							{"src":"strHdnGuid","dest":"strHdnGuid"},
							
							],
					"grid":[
							{"src":"PLANLINENO","dest":"strLoadLineNo"},
							{"src":"COMMODITY","dest":"strCommodity"},
							{"src":"LOAD_WEIGHT","dest":"iLoadWeight"},
							{"src":"Utilization","dest":"iLoadUtil"},
							{"src":"REQUEST_TYPE","dest":"strRequestType"}

							]
				},
			"tms_vehdemandplan":
				{
					"dest":"tms.VehiclePlanning",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
		}	
		this.callParent(arguments);
		
	}
});
