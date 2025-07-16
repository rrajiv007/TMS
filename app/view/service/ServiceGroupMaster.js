/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
		                                   
************************************************************************************************/
Ext.define('CueTrans.view.service.ServiceGroupMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.screenName = "Service Group Master";
		mainpage.startPainting();
		
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= 
			[{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create service group."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit service group."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete service group."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate service group."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate service group."
            }
            ]
		
		//Service Group Header Section Begins
		plf.columns=3
		var SerGrpHdrPanel = plf.addColumnSection({});
		
		var SerGrpFormCtrl=
		[
			plf.addHlpText({"label":"Service Group ID",id:"strServiceGroup","mandatory":"true",hlpLinkID:"servicegroup"},this),			
			plf.addText({"label":"Description",id:"strServiceGroupDesc","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"})			
		]
		SerGrpHdrPanel.add(SerGrpFormCtrl);
		//Service Group Header Section Ends
		
		//Service Group Grid Section Begins
		var SerGrpGridFieldObj=
		[
			{columnname:"Vehicle Category",dataname:"VEHICLE_CATEGORY",datatype:"string",width:200,storeId:"strVehicleCategory",editControl:"combo"},
			{columnname:"No of Vehicles*",dataname:"NO_OF_VEHICLES",editControl:"textbox",width:150,"inputFormat":"integer","InputLength":2}
		]
		var SerGrpGridDtl=
		{
			title:"Service Group Details",
			id:"ServiceGroup",			
			visibleRow:plf.searchVisibleRows,
			detail:SerGrpGridFieldObj			
		}
		var GridSection = plf.addGrid(SerGrpGridDtl,this)	
		//Service Group Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(SerGrpHdrPanel)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(GridSection) //Add Grid Section to Main Page
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strServiceGroup","strServiceGroupDesc","ServiceGroup"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"createServiceGrpTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strServiceGroup","strServiceGroupDesc","ServiceGroup"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"editServiceGrpTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strServiceGroup","strServiceGroupDesc","ServiceGroup"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"activateServiceGrpTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strServiceGroup","strServiceGroupDesc","ServiceGroup"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"deleteServiceGrpTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strServiceGroup","strServiceGroupDesc","ServiceGroup"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"inactivateServiceGrpTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strServiceGroup"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"initServiceGrpTS"
			},
			{
				"tasktype":"proto",
				"filename":"jm_master/ServiceGroup.json"
			},
			{
				"controlid":"strServiceGroup",
				"tasktype":"onenter",
				"input":["strServiceGroup"],
				"service":"SERCoreServiceGroupTS",
				"methodName":"onenterServiceGroupTS"
			}
			
		];
		mainpage.hlpLinks=
		{
			"servicegroup":
				{
					"hlpType":"Header",
					"hlpScreen":"service.ServiceGroupHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strServiceGroup","child":"SERVICE_ID"},
							{"parent":"strServiceGroupDesc","child":"SERVICE_DESC"},
							{"parent":"strStatus","child":"STATUS"}
							]
				}
		}
		//Event Handlers Mapping Ends
		
		this.callParent(arguments);
		
	}
});
