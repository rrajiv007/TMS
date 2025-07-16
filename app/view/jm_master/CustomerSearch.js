/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.2
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Manibharathi	04/02/2016      69952					Status Combo Alignment
1.0.2		Bhuvan			05-Feb-2016	  	69995					Added var for all local variable
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.CustomerSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Customer Summary";
		
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Create a Customer","linkid":"jm_customerMaster","tooltip":"Click here to create a customer."}
		]
		
		//Help on Customer Search Section Begins
		plf.columns=3
		var helpOncustomerHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);	//69995
		var helpOncustomerFormCtrl=									//69995
		[
			plf.addText({"label":"Customer code",id:"strCustomerCode","anywhereSearch":"true"}),
			plf.addText({"label":"Customer name",id:"strCustomerName"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"})
			
			//plf.addButton({"label":"Search","id":"btnSearch","tooltip":"Click here to search."})
			
		]
		
		helpOncustomerHdrCollapse.add(helpOncustomerFormCtrl);
		//Help on Customer Header Section Ends
		
		//Help on Customer Grid Section Begins
		var helpOncustomerGridFieldObj=				//69995
		[
			{columnname:"Customer Code",dataname:"CUST_CODE",datatype:"string",width:150,linkId:"custMaster","tooltip":"Click here to launch the customer screen."},
			{columnname:"Customer Name",dataname:"CUST_NAME",datatype:"string",width:175},
			{columnname:"Phone1",dataname:"PHONE1",datatype:"string",datatype:"string",width:100},
			{columnname:"City",dataname:"CITY",datatype:"string",width:130},
			{columnname:"State",dataname:"STATE",datatype:"string",width:130},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:130},
			{columnname:"Contact Person",dataname:"CONTACT_PERSON",datatype:"string",width:175},
			{columnname:"Contact Phone<br> No",dataname:"CONTACT_PERSON_PH",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:90},
			
		]
		var helpOncustomerGridDtl=   //69995
		{
			title:"",
			id:"CustomerDtlCache",
			detail:helpOncustomerGridFieldObj,
			visibleRow:plf.searchVisibleRows,
        		removeAddDelete:true,
			readonly:true
		}
		var helpGridSection = plf.addGrid(helpOncustomerGridDtl,this)			//69995
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
				"input":[""],
				"service":"CoreCustomerService",
				"methodName":"initCustomerSearchTS"
			},
			{
			"tasktype":"proto",
			"filename":"jm_master/CustomerSearch.json"
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
		
		mainpage.screenLinks=
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
				},
				"jm_customerMaster":
				{
					"dest":"jm_master.CustomerMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
});
