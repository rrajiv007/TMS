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
Ext.define('CueTrans.view.jm_master.CustomerVendorMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Vendor Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a vendor."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a vendor."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a vendor."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a vendor."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a vendor."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["customerVendorCode"]
		
		//Customer Vendor Header Section Begins
		plf.columns=4
		var customerVendorHdrColumn = plf.addColumnSection({});			//69995
		
		var customerVendorFormCtrl=			//69995
		[
			
			plf.addHlpText({"label":"Vendor Code",id:"strCustVendorCode","mandatory":"true",hlpLinkID:"customerVendorCode",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Vendor Name",id:"strCustVendorName","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Email",id:"strEmail",inputFormat:"email",InputLength:"60"}),
			
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			/*plf.addListEdit({"label":"Customer Name",id:"strCustomerName",inputFormat:"string",InputLength:"100",keyField:"strCustomerCode"},this),
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode","mandatory":"true",hlpLinkID:"customerCode",inputFormat:"string",InputLength:"40"},this),
			*/
			plf.addText({"label":"Phone 1",id:"strPhone1",inputFormat:"integer",InputLength:"20"}),
			plf.addText({"label":"Phone 2",id:"strPhone2",inputFormat:"integer",InputLength:"20"}),
			
			plf.addText({"label":"Address",id:"strAddress",inputFormat:"string",InputLength:"200"}),
			plf.addText({"label":"Area",id:"strArea",inputFormat:"string",InputLength:"50"}),
			plf.addCombo({"label":"Country",id:"strCountry",inputFormat:"string",InputLength:"20"}),
			
			plf.addCombo({"label":"State",id:"strState",inputFormat:"string",InputLength:"20"}),
			plf.addCombo({"label":"City",id:"strCity",inputFormat:"string",InputLength:"20"}),
			plf.addText({"label":"Zip Code",id:"strZipCode",inputFormat:"string",InputLength:"20"}),
			plf.addText({"label":"Contact Person",id:"strContactPerson",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Contact Phone No",id:"strContactPersonPh",inputFormat:"string",InputLength:"20"})
			
		]
		
		customerVendorHdrColumn.add(customerVendorFormCtrl);
		//Customer Vendor Header Section Ends
		
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(customerVendorHdrColumn)//Add Header Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		// for green line
		customerVendorHdrColumn.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(customerVendorHdrColumn)//add hdr details
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
					"controlid":"",
					"tasktype":"onload",
					"input":["strCustVendorCode"],
					"service":"CoreCustVendorService",
					"methodName":"initCustVendorMasterScrTS"
			},
			{
					"controlid":"strCustVendorCode",
					"tasktype":"onenter",
					"input":["strCustVendorCode"],
					"service":"CoreCustVendorService",
					"methodName":"fetchCustomerVendorTS"
			},
			/*{
					"controlid":"strCustomerCode",
					"tasktype":"onenter",
					"input":["strCustomerCode"],
					"service":"CoreCustVendorService",
					"methodName":"fetchCustomerTS"
			},*/
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strCustVendorCode","strCustVendorName","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode"/*,"strCustomerCode"*/],
					"service":"CoreCustVendorService",
					"methodName":"createCustVendorTS"
			},	

			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
					"input":["strCustVendorCode","strCustVendorName","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode"/*,"strCustomerCode"*/],
					"service":"CoreCustVendorService",
					"methodName":"modifyCustVendorTS"
			},

			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strCustVendorCode"],
					"service":"CoreCustVendorService",
					"methodName":"deleteCustVendorTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Activate",
					"input":["strCustVendorCode","strCustVendorName","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode"/*,"strCustomerCode"*/],
					"service":"CoreCustVendorService",
					"methodName":"activateCustVendorTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Inactivate",
					"input":["strCustVendorCode"],
					"service":"CoreCustVendorService",
					"methodName":"inactivateCustVendorTS"
			},
			{
				"controlid":"strCountry",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreCustVendorService",
				"methodName":"fetchonchangeStateTS"
		},
		
		{
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreCustVendorService",
				"methodName":"fetchonchangeCityTS"
		},
			{
			"tasktype":"proto",
			"filename":"jm_master/CustomerVendorMaster.json"
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
				"except":[""]
			},
			"active":
			{
				"enableAll":true,
				"except":[""]
			}			
		}
		
		mainpage.hlpLinks=
		{
			"customerVendorCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerVendorHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCustVendorCode","child":"CUST_VENDOR_CODE"}
							]
				}
			/*"customerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCustomerCode","child":"CUST_CODE"},
							{"parent":"strCustomerName","child":"CUST_NAME"}
							]
				}*/
			
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
