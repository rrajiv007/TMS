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
Ext.define('CueTrans.view.jm_master.ShiftMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Shift Master";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		
		
		mainpage.toolbarActions= [
			{
                "name": "Create",
                "tooltip": "Click here to create shift."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit shift."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete shift."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate shift."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate shift."
            }
            ]


		plf.columns=4
		var ShiftHdrColumn = plf.addColumnSection({});					//69995
		var ShiftHdrCtrl=												//69995				
			[	
			    plf.addHlpText({"label":"Shift Code",id:"strShiftCode","mandatory":"true",hlpLinkID:"ShiftScreenHelp"},this),	
				plf.addText({"label":"Shift Description",id:"strShiftDesc","mandatory":"true"}),
				plf.addCombo({"label":"Day Type",id:"strDayType","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"})
				
			]
		
		ShiftHdrColumn.add(ShiftHdrCtrl)
		
		
		var shiftHdrCol = plf.addColumnSection({title:""});			//69995
		var shiftGridFieldObj=										//69995	
		[   
			{columnname:"Shift Name",dataname:"SHIFT_NAME",datatype:"string",width:250,editControl:"combo",storeId:"strShiftName",},
			{columnname:"Start Time (hh:mm)",dataname:"START_TIME",datatype:"string",width:150,storeId:"strStartTime",editControl:"time"},
			{columnname:"End Time (hh:mm)",dataname:"END_TIME",datatype:"string",width:150,storeId:"strEndTime",editControl:"time"}	
		]
		var shiftGridDtl=											//69995
		{
			title:"Shift Details",
			id:"shiftDtlCache",
			detail:shiftGridFieldObj,
			visibleRow:10
		}
		var shiftGridSection = plf.addGrid(shiftGridDtl,this)		//69995
		
		mainpage.ptrMainSection.add(ShiftHdrColumn) 
		mainpage.ptrMainSection.add(shiftGridSection)
				
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strShiftCode"],
				"service":"CoreShiftService",
				"methodName":"initShiftMasterTS"
		},
		{
				"controlid":"strShiftCode",
				"tasktype":"onenter",
				"input":["strShiftCode"],
				"service":"CoreShiftService",
				"methodName":"fetchShiftMasterTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strShiftCode","strShiftDesc","strDayType","shiftDtlCache","strStatus"],
				"service":"CoreShiftService",
				"methodName":"createShiftMasterTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strShiftCode","strShiftDesc","strDayType","shiftDtlCache"],
				"service":"CoreShiftService",
				"methodName":"editShiftMasterTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strShiftCode","strShiftDesc","strDayType","shiftDtlCache"],
				"service":"CoreShiftService",
				"methodName":"deleteShiftMasterTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strShiftCode","strShiftDesc","strDayType","shiftDtlCache"],
				"service":"CoreShiftService",
				"methodName":"activeShiftMasterTS"
		},
		{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strShiftCode","strShiftDesc","strDayType","shiftDtlCache"],
				"service":"CoreShiftService",
				"methodName":"inactiveShiftMasterTS"
		}	
		];
		
		
			mainpage.hlpLinks=
		{
			"ShiftScreenHelp":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.ShiftMasterHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strShiftCode","child":"SHIFT_CODE"}
							]
				}
				
		}
		
		this.callParent(arguments);
		
	}
});