/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.ShiftMasterSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shift Summary";
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Create Shift","linkid":"ad_shiftmst","tooltip":"Click here to create a shift."},
			{"name":"Create Employee Roster","linkid":"roster","tooltip":"Click here to create a roster."}
		]
						
		plf.columns = 4
		var shiftHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);				//69995
		var shiftHdrColumn=								//69995
		[
			plf.addText({"label":"Shift Code",id:"strShiftCode",inputFormat:"string",InputLength:"100","anywhereSearch":"true"}),
			plf.addText({"label":"Shift Description",id:"strShiftDesc",inputFormat:"string",InputLength:"100","anywhereSearch":"true"}),
			plf.addCombo({"label":"Day Type",id:"strDayType"}),
			plf.addCombo({"label":"Status",id:"strStatus"})
			
		]
		
		shiftHdrCollapse.add(shiftHdrColumn);
		var shiftGridFieldObj=								//69995
		[
			{columnname:"Shift Code",dataname:"SHIFT_CODE",datatype:"string",width:250,linkId:"shiftCode"},
			{columnname:"Shift Description",dataname:"SHIFT_DESCRIPTION",datatype:"string",width:250},	
			{columnname:"Day Type",dataname:"DAY_TYPE",datatype:"string",width:250},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:250}
		]
		var shiftGridDtl=									//69995
		{
			title:"",
			id:"shiftGrid",
			detail:shiftGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			readonly:true,
			removeAddDelete:true
		}
		var shiftGridSection = plf.addGrid(shiftGridDtl,this)	//69995
		//HelpOn3PL Grid Section Ends
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(shiftHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(shiftGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreShiftService",
				"methodName":"initShiftSrchTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strShiftCode","strShiftDesc","strStatus","strDayType"],
				"service":"CoreShiftService",
				"methodName":"FETCHALLShiftSrchTS"
			}
				
				
		];
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		mainpage.screenLinks=
		{
			"shiftCode":
				{
					"dest":"jm_master.ShiftMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SHIFT_CODE","dest":"strShiftCode"}
							]
				},
				"ad_shiftmst":
				{
					"dest":"jm_master.ShiftMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"roster":
				{
					"dest":"jm_master.EmployeeRoster",
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
