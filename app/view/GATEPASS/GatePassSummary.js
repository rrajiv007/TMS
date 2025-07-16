/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	GATEPASS -Gate Pass Summary                                                                   		         
Author		  :	Raj					 											                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.GATEPASS.GatePassSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function() 
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Gate Pass Summary";
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;	
        mainpage.toolbarLinks=
		[
		  {"name":"Issue Gate Pass","linkid":"Issue_Gate_Pass","tooltip":"Click here to issue gate pass."}
            
		]
		/* Gate Pass Summary Header Search Section start here */
		plf.columns=4
		var GPSummaryHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: false,btnID:"searchBtn"},this);	
	 	var GPSummaryFormCtrl=												
		[
			plf.addText({"label":"Gate Pass Number",id:"strGatePassNo"}),
			plf.addText({"label":"Vehicle Number",id:"strVehicleNo"}),
			plf.addText({"label":"Issued By",id:"strIssuedBy"}),
			plf.addCombo({"label":"Gate Pass Status",id:"strStatus"}),
			plf.addText({"label":"Driver Name",id:"strDriverName"}),
			plf.addText({"label":"Driver Contact",id:"strDriverContact"})
		]
		
		GPSummaryHdrCollapse.add(GPSummaryFormCtrl);
		/* Gate Pass Summary Header Search Section end here */
		
		/* Gate Pass Summary Grid Section start here */
		var GPSummaryGridFieldObj=						
		[
			 
			{columnname:"Print Gate Pass",dataname:"PRINT_GP",datatype:"string",width:130,gridReport:"PrintGP",imageURL:"resources/images/shared/calendar.gif",tooltip:"Click here to print gate pass."},
           	{columnname:"Gate Pass Number",dataname:"GATE_PASS_NUMBER",datatype:"string",linkId:"GATE_PASS_LINKID","tooltip":"Click here to launch issue gate pass screen.",width:"auto"},
			{columnname:"Gate Pass Status",dataname:"GATE_PASS_STATUS",datatype:"string",width:150},
			{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:150},
			{columnname:"Vehicle Number",dataname:"VEHICLE_NUMBER",datatype:"string",width:150},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			
			{columnname:"Driver Contact No",dataname:"DRIVER_CONTACT",datatype:"string",width:150},
			{columnname:"Vehicle In Date/Time",dataname:"VEHICLE_IN_DT_TM",datatype:"string",width:150},
			{columnname:"Vehicle Out Date/Time",dataname:"VEHICLE_OUT_DT_TM",datatype:"string",width:150},
			
			
		]
		var GPSummaryGridDtl=
		{
			title:"",
			id:"GPSummary",
	        detail:GPSummaryGridFieldObj,
		    readonly:true,
			removeAddDelete:true,
			visibleRow:14
		   }
		var GPSummaryGridSection = plf.addGrid(GPSummaryGridDtl,this)
		/* Service Request Summary Grid Section end here */
		
		/* Add Child  Sections start here*/
		mainpage.ptrMainSection.add(GPSummaryHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(GPSummaryGridSection) //Add Grid Section to Main Page
		/* Add Child  Sections end here*/
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"GPCoreServiceTS",
				"methodName":"initGPSummary"
			},
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strGatePassNo","strVehicleNo","strIssuedBy","strStatus","strDriverName","strDriverContact"],
				"service":"GPCoreServiceTS",
				"methodName":"fetchGPSummary"
			},
			{
				"grideventid":"PrintGP",
				"tasktype":"gridonprint",
				"input":["strGatePassNo"],
				"service":"CoreReportService",
				"methodName":"PrintissueGPReport"
			}
			
		];
		mainpage.hlpLinks=
		{
			/*"inspectionno":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.InspectionHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strInspectionNo","child":"INSPECTION_NO"}
							]
				}*/
			}
			
			
		mainpage.screenLinks=
		{
				"Issue_Gate_Pass":
				{
					"dest":"GATEPASS.IssueGatePass",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"GATE_PASS_LINKID":
			{
				"dest":"GATEPASS.IssueGatePass",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"GATE_PASS_NUMBER","dest":"strGatePassNo"}
						]
			}
		}
		this.callParent(arguments);
		
	}
});
