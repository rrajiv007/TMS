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
Ext.define('CueTrans.view.jm_master.SupplierMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Supplier Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a supplier."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a supplier."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a supplier."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a supplier."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a supplier."
            }
            ]
		//Supplier Master Header Section Begins
		plf.columns=4
		var supplierMstrColumn = plf.addColumnSection({});						//69995
		var supplierMstrCtrl=													//69995	
		[
			plf.addHlpText({"label":"Supplier Code",id:"strSupplierCode","mandatory":"true",hlpLinkID:"supplierCode",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Supplier Name",id:"strSupplierName","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addCombo({"label":"Supplier Type",id:"strSupplierType"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Phone 1",id:"strPhone1",inputFormat:"string",InputLength:"20"}),
			plf.addText({"label":"Phone 2",id:"strPhone2",inputFormat:"string",InputLength:"20"}),
			plf.addText({"label":"Email",id:"strEmail",inputFormat:"email",InputLength:"50"}),
			plf.addText({"label":"Address",id:"strAddress",inputFormat:"string",InputLength:"200"}),
			plf.addText({"label":"Area",id:"strArea",inputFormat:"string",InputLength:"50"}),
			plf.addCombo({"label":"Country",id:"strCountry",inputFormat:"string",inputFormat:"string",InputLength:"50"}),
			
			plf.addCombo({"label":"State",id:"strState",inputFormat:"string",inputFormat:"string",InputLength:"50"}),
			plf.addCombo({"label":"City",id:"strCity",inputFormat:"string",inputFormat:"string",InputLength:"50"}),
			plf.addText({"label":"Zip Code",id:"strZipCode",inputFormat:"string",InputLength:"20"}),	
			plf.addText({"label":"Contact Person",id:"strContactPerson",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Contact Phone No",id:"strContactPersonPh",inputFormat:"string",InputLength:"20"})
				
			
		   
		]
		supplierMstrColumn.add(supplierMstrCtrl);
		//Supplier Master Header Section Ends
		
		
		
		//Add Header Section to Main Page
		mainpage.ptrMainSection.add(supplierMstrColumn)
		
		
		mainpage.dataHistorySectionFlag=true;
		
		// for green line
		supplierMstrColumn.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(supplierMstrColumn)//add hdr details
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
					"controlid":"",
					"tasktype":"onload",
					"input":["strSupplierCode"],
					"service":"CoreSupplierService",
					"methodName":"initSupplierMasterScrTS"
			},		
			{
					"controlid":"strSupplierCode",
					"tasktype":"onenter",
					"input":["strSupplierCode"],
					"service":"CoreSupplierService",
					"methodName":"fetchSupplierTS"
			},	
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strSupplierCode","strSupplierName","strSupplierType","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode","strCreatedBy",
					"dtCreatedDate","strModifiedBy","dtModifiedDate","strOrganisationId","strStatus"],
					"service":"CoreSupplierService",
					"methodName":"createSupplierTS"
			},

			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
					"input":["strSupplierCode","strSupplierName","strSupplierType","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode","strCreatedBy",
					"dtCreatedDate","strModifiedBy","dtModifiedDate","strOrganisationId","strStatus"],
					"service":"CoreSupplierService",
					"methodName":"modifySupplierTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strSupplierCode"],
					"service":"CoreSupplierService",
					"methodName":"deleteSupplierTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Activate",
					"input":["strSupplierCode","strSupplierName","strSupplierType","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode","strCreatedBy",
					"dtCreatedDate","strModifiedBy","dtModifiedDate","strOrganisationId","strStatus"],
					"service":"CoreSupplierService",
					"methodName":"activateSupplierTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Inactivate",
					"input":["strSupplierCode","strSupplierName","strSupplierType","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode","strCreatedBy",
					"dtCreatedDate","strModifiedBy","dtModifiedDate","strOrganisationId","strStatus"],
					"service":"CoreSupplierService",
					"methodName":"inactivateSupplierTS"
			},
			{
				"controlid":"strCountry",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreSupplierService",
				"methodName":"fetchonchangeStateTS"
		},
		
		{
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreSupplierService",
				"methodName":"fetchonchangeCityTS"
		},
			
			{
				"tasktype":"proto",
				"filename":"jm_master/SupplierMaster.json"
			}
		];
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		//mainpage.generateScreen();
		
		mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":true,
				"except":[]
			},
			"active":
			{
				"enableAll":true,
				"except":[]
			}			
		}
		
		
		mainpage.hlpLinks=
		{
			"supplierCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.SupplierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strSupplierCode","child":"SUPPLIER_CODE"}
							]
				}
			
		}
		
		/*Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
	}
});
