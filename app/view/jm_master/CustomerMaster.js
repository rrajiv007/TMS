/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995				Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.CustomerMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Customer Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a customer."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a customer."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a customer."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a customer."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a customer."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["CustomerCode"]
		
		//3pl Owner Header Section Begins
		plf.columns=4
		var customerHdrColumn = plf.addColumnSection({});		//69995
		
		
		var customerFormCtrl=									//69995
		[
			
			plf.addHlpText({"label":"Customer Code",id:"strCustomerCode","mandatory":"true",hlpLinkID:"customerCode",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Customer Name",id:"strCustomerName","mandatory":"true",inputFormat:"string",InputLength:"100"}),	
			plf.addText({"label":"Email",id:"strEmail",inputFormat:"email",InputLength:"60","mandatory":"true",}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"Phone 1",id:"strPhone1",inputFormat:"string",InputLength:"20"}),
			plf.addText({"label":"Phone 2",id:"strPhone2",inputFormat:"string",InputLength:"20"}),
			
			plf.addText({"label":"Address",id:"strAddress",inputFormat:"string",InputLength:"200"}),
			plf.addText({"label":"Area",id:"strArea",inputFormat:"string",InputLength:"50"}),
			plf.addCombo({"label":"Country",id:"strCountry",inputFormat:"string",InputLength:"50"}),
			
			plf.addCombo({"label":"State",id:"strState",inputFormat:"string",InputLength:"50"}),
			plf.addCombo({"label":"City",id:"strCity",inputFormat:"string",InputLength:"50"}),
			plf.addText({"label":"Zip Code",id:"strZipCode",inputFormat:"string",InputLength:"20"}),
			plf.addText({"label":"Contact Person",id:"strContactPerson",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Contact Phone No",id:"strContactPersonPh",inputFormat:"string",InputLength:"20"}),
			plf.addCombo({"label":"Default",id:"strCustomerDefault",inputFormat:"string",InputLength:"50"})
		]
		
		customerHdrColumn.add(customerFormCtrl);
		//3pl Owner Header Section Ends
		var JBdashCtrl=
		[	
			{columnname:"Logistics Group Description",dataname:"LOG_GROUP",datatype:"string",width:230,editControl:"combo",storeId:"strLogGroup"},
			{columnname:"Description",dataname:"LOG_DESC",datatype:"string",width:150},
			{columnname:"Default",dataname:"DEFAULT_LOGGRP",datatype:"string",width:150,editControl:"combo",storeId:"strDefault"}			
		]
		var JBdashGridDtl=			//69995
		{
			title:"Logistics Group",
			id:"JBdashDtlCacheObj",
			detail:JBdashCtrl,
			visibleRow:plf.searchVisibleRows,
			//readonly:true,
			//removeAddDelete:true,
			removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var JBdashGridSection = plf.addGrid(JBdashGridDtl,this)	 //69995
		
		var SLACtrl=
		[
		//{columnname:"Region",dataname:"REGION",datatype:"string",width:150},
	    {columnname:"Division Code",dataname:"DIV_CODE",datatype:"string",width:200,editControl:"textbox",helpid:'divisioncode',"onenter":"DIVISION_CODE_ONENTER"},		
		{columnname:"Division Name",dataname:"DIV_NAME",datatype:"string",width:250},			
		{columnname:"Default",dataname:"DEFAULT_DIV",datatype:"string",width:150,editControl:"combo",storeId:"strDefault1"}			
		]
		var SLAGridDtl=									//69995
		{
			title:"Division Details",
			id:"SLDtlCacheObj",
			detail:SLACtrl,
			visibleRow:plf.searchVisibleRows,
			//readonly:true,
			//removeAddDelete:true,
			removeFilter:true,
			removeExport:true,
			removeColumns:true
		}
		var SLAGridSection = plf.addGrid(SLAGridDtl,this)		//69995
		
		
		var tmpTabs= 
		[
				JBdashGridSection,
				SLAGridSection		
		]
		tabSection=plf.addTabSection({tabs:tmpTabs})		
		
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(customerHdrColumn)//Add Header Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		// for green line
		customerHdrColumn.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(customerHdrColumn)//add hdr details
		mainpage.ptrMainSection.add(tabSection)
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
	       /* {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreRouteService",
				"methodName":"initSupplierMasterScrTS"
			},		*/
			{
					"grideventid":"DIVISION_CODE_ONENTER",
					"tasktype":"gridonenter",
					"input":["DIV_CODE","strLocationCode"],
					"service":"CoreCustomerService",
					"methodName":"fetchLocationNameML"
			},
			{
					"controlid":"",
					"tasktype":"onload",
					"input":["strCustomerCode"],
					"service":"CoreCustomerService",
					"methodName":"initCustomerMasterScrTS"
			},
			/*{
					"controlid":"strLogGroup",
					"tasktype":"onchange",
					"input":["strLogGroup"],
					"service":"CoreCustomerService",
					"methodName":"fetchLogisticsGroupNameTS"
			},*/
			{
					"controlid":"strCustomerCode",
					"tasktype":"onenter",
					"input":["strCustomerCode"],
					"service":"CoreCustomerService",
					"methodName":"fetchCustomerTS"
			},	
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strCustomerCode","strCustomerName","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode","strCreatedBy",
					"dtCreatedDate","strOrganisationId","strStatus","SLDtlCacheObj","strLocationCode","strLocationName","strDefault1","JBdashDtlCacheObj",
					"strLogGroup","strDesc","strDefault","strCustomerDefault"],
					"service":"CoreCustomerService",
					"methodName":"createCustomerTS"
			},

			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Edit",
					"input":["strCustomerCode","strCustomerName","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode","strCreatedBy",
					"dtCreatedDate","strOrganisationId","strStatus","SLDtlCacheObj","strLocationCode","strLocationName","strDefault1","JBdashDtlCacheObj",
					"strLogGroup","strDesc","strDefault","strCustomerDefault"],
					"service":"CoreCustomerService",
					"methodName":"modifyCustomerTS"
			},	

			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strCustomerCode"],
					"service":"CoreCustomerService",
					"methodName":"deleteCustomerTS"
			},

			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Activate",
					"input":["strCustomerCode","strCustomerName","strPhone1","strAddress","strState","strContactPerson","strPhone2",
					"strArea","strCountry","strContactPersonPh","strEmail","strCity","strZipCode","strCreatedBy",
					"dtCreatedDate","strOrganisationId","strStatus","SLDtlCacheObj","strLocationCode","strLocationName","strDefault1","JBdashDtlCacheObj",
					"strLogGroup","strDesc","strDefault","strCustomerDefault"],
					"service":"CoreCustomerService",
					"methodName":"activateCustomerTS"
			},
			
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Inactivate",
					"input":["strCustomerCode"],
					"service":"CoreCustomerService",
					"methodName":"inactivateCustomerTS"
			},
			{
				"controlid":"strCountry",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreCustomerService",
				"methodName":"fetchonchangeStateTS"
		},
		
		{
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreCustomerService",
				"methodName":"fetchonchangeCityTS"
		},
		{
					"tasktype":"proto",
					"filename":"jm_master/CustomerMaster.json"
				}
		];
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		
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
			"customerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CustomerHelp",
					"send":[
							{"parent":"","child":""}
							/*{"direct":"CUST_Master","child":"strContext"}*/
						   ],
					"receive":[
							{"parent":"strCustomerCode","child":"CUST_CODE"}
							]
				},
				"divisioncode":
				{
					"hlpType":"grid",
					"gridID":"SLDtlCacheObj",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"DIV_CODE","child":"LOC_CODE"},
					{"parent":"DIV_NAME","child":"LOC_NAME"}
					]
				}
			
		}
		
		/*
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});
		*/
		
		this.callParent(arguments);
		//mainpage.generateScreen();
	}
});
