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
Ext.define('CueTrans.view.jm_master.CustomerHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		
		mainpage.screenName = "Customer Search";
		//Help on Customer Search Section Begins
		plf.columns=3
		var helpOncustomerHdrCollapse = plf.addColumnSection({title:"", collapsed: true});			//69995
		
		
		var helpOncustomerFormCtrl=				//69995
		[
			plf.addText({"label":"Customer Code",id:"strCustomerCode","anywhereSearch":"true"}),
			plf.addText({"label":"Customer Name",id:"strCustomerName"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addHidden({"label":"Context",id:"strContext"}),
			plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."})
			
		]
		
		helpOncustomerHdrCollapse.add(helpOncustomerFormCtrl);
		//Help on Customer Header Section Ends
		
		//Help on Customer Grid Section Begins
		var helpOncustomerGridFieldObj=				//69995
		[
			{columnname:"Customer Code",dataname:"CUST_CODE",datatype:"string",width:150},
			{columnname:"Customer Name",dataname:"CUST_NAME",datatype:"string",width:200},
			{columnname:"Phone1",dataname:"PHONE1",datatype:"string",datatype:"string",width:200},
			{columnname:"City",dataname:"CITY",datatype:"string",width:200},
			{columnname:"State",dataname:"STATE",datatype:"string",width:200},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:200},
			{columnname:"Contact Person",dataname:"CONTACT_PERSON",datatype:"string",width:200},
			{columnname:"Contact Phone No",dataname:"CONTACT_PERSON_PH",datatype:"string",width:200},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:200},
			
		]
		var helpOncustomerGridDtl=				//69995
		{
			title:"Customer Details",
			id:"CustomerDtlCache",
			detail:helpOncustomerGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
		}
		var helpGridSection = plf.addGrid(helpOncustomerGridDtl,this)			//69995
		mainpage.hlpSearchGridPtr = helpGridSection
		//Help on Customer Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(helpOncustomerHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		
			
			{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strCustomerCode","strCustomerName","strCity","strState","strCountry","strStatus"],
					"service":"CoreCustomerService",
					"methodName":"fetchAllCustomerTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strContext"],
				"service":"CoreCustomerService",
				"methodName":"initCustomerSearchTS"
			},
			{
			"tasktype":"proto",
			"filename":"jm_master/CustomerHelp.json"
			},
			{
				"controlid":"strCountry",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreCustomerService",
				"methodName":"fetchStateTS"
		},
		
		{
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreCustomerService",
				"methodName":"fetchCityTS"
		}
					
			
		];
		
		/*mainpage.screenLinks=
		{
			"custMaster":
				{
					"dest":"jm_master.CustomerMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"CUST_CODE","dest":"strCustomerCode"}
							]
				}
		}*/
		
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
});
