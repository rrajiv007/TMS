/************************************************************************************************
Modification History        									                               	
************************************************************************************************
Description : GATEPASS -Issue Gate Pass
Author      : Raj                                                           		         
Version     : 1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.GATEPASS.IssueGatePassHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		mainpage.screenName = "Gate Pass Help";

		plf.columns=3
		var hdrSection = plf.addColumnSection({title:"", collapsed: false}); 	
	 	var hdrFormCtrl=																										
		[
			plf.addText({"label":"Gate Pass Number",id:"strGatePassNo"}),
			plf.addText({"label":"Vehicle Number",id:"strVehicleNo"}),
			plf.addText({"label":"Issued By",id:"strIssuedBy"}),
			plf.addCombo({"label":"Gate Pass Status",id:"strStatus"}),
			plf.addText({"label":"Driver Name",id:"strDriverName"}),
			plf.addText({"label":"Driver Contact",id:"strDriverContact"}),
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})
		]
		
		hdrSection.add(hdrFormCtrl);		
		
		var GridFieldObj=
		[
			//{columnname:"Print Gate Pass",dataname:"PRINT_GP",datatype:"string",width:130,gridReport:"PrintGP",imageURL:"resources/images/shared/calendar.gif",tooltip:"Click here to print gate pass."},
           	{columnname:"Gate Pass Number",dataname:"GATE_PASS_NUMBER",datatype:"string",width:"auto"},
			{columnname:"Gate Pass Status",dataname:"GATE_PASS_STATUS",datatype:"string",width:150},
			{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:150},
			{columnname:"Vehicle Number",dataname:"VEHICLE_NUMBER",datatype:"string",width:150},
			{columnname:"Driver Name",dataname:"DRIVER_NAME",datatype:"string",width:150},
			
			{columnname:"Driver Contact No",dataname:"DRIVER_CONTACT",datatype:"string",width:150},
			{columnname:"Vehicle In Date/Time",dataname:"VEHICLE_IN_DT_TM",datatype:"string",width:150},
			{columnname:"Vehicle Out Date/Time",dataname:"VEHICLE_OUT_DT_TM",datatype:"string",width:150}
		]
		var GridDtl=					
		{
		   title:"",
		   id:"GPSummary",
	       detail:GridFieldObj,
		   visibleRow:plf.helpVisibleRows,
		   removeAddDelete:true,
		   removePaging:true
		}
		var helpGridSection = plf.addGrid(GridDtl,this)		
		mainpage.hlpSearchGridPtr = helpGridSection;
		
		//Add Child Sections
		mainpage.ptrMainSection.add(hdrSection)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
				{
				"controlid":"",
				"tasktype":"onload",
				"input":["strGatePassNo"],
				"service":"GPCoreServiceTS",
				"methodName":"initGPSummary"
				},
				{
					"controlid":"searchBtn",
					"tasktype":"btnclick",
					"input":["strGatePassNo","strVehicleNo","strIssuedBy","strStatus","strDriverName","strDriverContact"],
					"service":"GPCoreServiceTS",
					"methodName":"fetchGPSummary"
				}
				
		];
		//Event Handlers Mapping Ends
		this.callParent(arguments);
		
	}
});
