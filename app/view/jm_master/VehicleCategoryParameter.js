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
Ext.define('CueTrans.view.jm_master.VehicleCategoryParameter', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Category Parameter";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to save."
            },
            ]
		//Add Keyfields
		mainpage.keyFields=["strTruckCode"]
		
		//Truck Master Header Section starts
		plf.columns=4
		var truckMasterColumn = plf.addColumnSection({});			//69995
		//truckMasterCommonColumn = plf.addColumnSection({});
		var truckMasterFormCtrl=									//69995
		[
			plf.addCombo({"label":"Vehicle Category","id":"strTruckCategory"}),
            plf.addCombo({"label":" Vehicle Category Group","id":"strVehCategoryGroup"}),
			plf.addText({"label":"No Of Axles (Rear)",id:"ino_of_axles_rear",inputFormat:"integer"}),
			plf.addText({"label":"No Of Axles (Front)",id:"ino_of_axles_front",inputFormat:"integer"})
		]	
		truckMasterColumn.add(truckMasterFormCtrl);
		truckMasterColumn.add(plf.addStripLine({}));
			
		var configurationFieldset = plf.addColumnSection({title:"Configuration",});		//69995
		var configFieldsetFormCtrl=														//69995
		[		
					plf.addFieldContainer({"label":"Length (m)","id":"conTruckLength",
					"controls":[
					plf.addPlainText({id:"iTruckLength","width":"50","mandatory":"true",inputFormat:"numeric",InputPrecision:"2"})
					/*plf.addPlainCombo({id:"iTruckLengthUom","width":"70"})*/
				]	
			}),
			
					plf.addFieldContainer({"label":"Width (m)",
					"controls":[
					plf.addPlainText({id:"iTruckWidth","width":"50",inputFormat:"numeric",InputPrecision:"2"})
					//plf.addPlainCombo({id:"iTruckWidthUom","width":"70"})
				]	
			}),
			
					plf.addFieldContainer({"label":"Bed Height (m)",
					"controls":[
					plf.addPlainText({id:"iBedHeight","width":"50",inputFormat:"numeric",InputPrecision:"2"})
					//plf.addPlainCombo({id:"iBedHeightUom","width":"70"})
				]	
			}),
		  
					plf.addFieldContainer({"label":"Head Height (m)",
					"controls":[
					plf.addPlainText({id:"iHeadHeight","width":"50",inputFormat:"numeric",InputPrecision:"2"})
					//plf.addPlainCombo({id:"iHeadHeightUom","width":"70"})
				]	
			}),
			
					plf.addFieldContainer({"label":"Tare Weight (ton)",
					"controls":[
					plf.addPlainText({id:"iTareWeight","width":"50",inputFormat:"numeric",InputPrecision:"2"})
					//plf.addPlainCombo({id:"iTareWeightUom","width":"70"})
				]	
			}),
			
					plf.addFieldContainer({"label":"Pay Load Weight (ton)",
					"controls":[
					plf.addPlainText({id:"iPayLoadWeight","width":"50",inputFormat:"numeric",InputPrecision:"2"})
					//plf.addPlainCombo({id:"iPayLoadWeightUom","width":"70"})
				]	
			}),
			
					plf.addFieldContainer({"label":"Volume (cu.m)",
					"controls":[
					plf.addPlainText({id:"iTruckVolume","width":"50",inputFormat:"numeric",InputPrecision:"2"})
					//plf.addPlainCombo({id:"iTruckVolumeUom","width":"70"})
				]	
			}),
						
		
		]
		
		configurationFieldset.add(configFieldsetFormCtrl);
		//Truck Master Header Section Ends
	
	
	    //Vehicle IVMS Mapping Grid Section Begins
		var truckIvmsMapGridFieldObj=						//69995
		[
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",editControl:"combo",width:200,storeId:"strCommodity"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:200,storeId:"strRemarks",inputFormat:"string",InputLength:"250"}
		]
		var truckIvmsMapGridDtl=							//69995
		{
			title:"Goods Permissible",
			id:"commodityGrid",
			detail:truckIvmsMapGridFieldObj
		}
		var truckIvmsMapGridSection = plf.addGrid(truckIvmsMapGridDtl)			//69995
		
		//Vehicle IVMS Mapping Grid Section Ends
	
		
		//Add Child Sections
	//	mainpage.ptrMainSection.add(truckMasterColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(truckMasterColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(configurationFieldset)
	//	mainpage.ptrMainSection.add(truckIvmsMapGridSection) //Add Grid Section to Main Page

		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[			
			{
				"controlid":"strTruckCategory",
				"tasktype":"onload",
				"input":["strTruckCategory"],
				"service":"CoreTruckService",
				"methodName":"initVehicleCategoryParamScrTS"
			},	
			
			{
				"controlid":"",
				"tasktype":"toolbarclick",	
				"action":"Save",
				"input":["strTruckCategory","ino_of_axles_rear","ino_of_axles_front","iTruckLength","iTruckLengthUom","iTruckWidth","iTruckWidthUom",
                                     "iBedHeight","iBedHeightUom","iHeadHeight","iHeadHeightUom","iTareWeight","iTareWeightUom","iPayLoadWeight","iPayLoadWeightUom","iTruckVolume",
                                     "iTruckVolumeUom","commodityGrid","strVehCategoryGroup"],
				"service":"CoreTruckService",
				"methodName":"maintainVehicleCategoryParamScrTS"
			},	
			
		{
				"controlid":"strTruckCategory",
				"tasktype":"onchange",
				"input":["strTruckCategory"],
				"service":"CoreTruckService",
				"methodName":"onchangeVehicleCategoryParamScrTS"
		},			
			
		];
		//Event Handlers Mapping Ends
		
		

		this.callParent(arguments);
		
	}
});
