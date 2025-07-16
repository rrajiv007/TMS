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
Ext.define('CueTrans.view.jm_master.ShiftMasterHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();		
		mainpage.screenName = "Shift Help";						
		plf.columns = 3
		var shiftHdrCollapse = plf.addColumnSection({title:"", collapsed: true}); 
		var shiftHdrColumn=
		[
			plf.addText({"label":"Shift Code",id:"strShiftCode",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Shift Description",id:"strShiftDesc",inputFormat:"string",InputLength:"100"}),
			plf.addCombo({"label":"Day Type",id:"strDayType"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addButton({"label":"Search","id":"btnSearch"})			
		]
		
		shiftHdrCollapse.add(shiftHdrColumn);
		
		var shiftGridFieldObj=
		[
			{columnname:"Shift Code",dataname:"SHIFT_CODE",datatype:"string",width:250},
			{columnname:"Shift Description",dataname:"SHIFT_DESCRIPTION",datatype:"string",width:250},
			{columnname:"Day Type",dataname:"DAY_TYPE",datatype:"string",width:250},			
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:250}
		]
		var shiftGridDtl=
		{
			title:"",
			id:"shiftGrid",
			detail:shiftGridFieldObj,
			visibleRow:plf.helpVisibleRows,
		    removeAddDelete:true
		}
		/*
		visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true,
			removeTbar:false
			*/
		var shiftGridSection = plf.addGrid(shiftGridDtl,this)			//69995
		mainpage.hlpSearchGridPtr = shiftGridSection 
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
			
		
		
		
		this.callParent(arguments);
		
	}
});
