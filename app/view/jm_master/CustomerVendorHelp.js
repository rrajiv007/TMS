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
Ext.define('CueTrans.view.jm_master.CustomerVendorHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		
		mainpage.screenName = "Vendor List";
		//HelpOn3PL Search Section Begins
		plf.columns=3
		var helpOnCustomerVendorHdrCollapse = plf.addColumnSection({collapsed: true});    //69995
		var helpOnCustomerVendorFormCtrl=			//69995
		[
			plf.addText({"label":"Vendor Code From",id:"strCustVendorCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Vendor Code To",id:"strCustVendorCodeTo","anywhereSearch":"true"}),
			plf.addText({"label":"Vendor Name",id:"strCustVendorName"}),
			plf.addCombo({"label":"State",id:"strState"}),
			/*plf.addText({"label":"Customer Code",id:"strCustomerCode"}),
			plf.addText({"label":"Customer Name",id:"strCustomerName"}),*/
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
			
		]
		
		helpOnCustomerVendorHdrCollapse.add(helpOnCustomerVendorFormCtrl);
		//HelpOn3PL Header Section Ends
		
		//HelpOn3PL Grid Section Begins
		var helpOnCustomerVendorGridFieldObj=			//69995
		[
			{columnname:"Vendor Code",dataname:"CUST_VENDOR_CODE",datatype:"string",width:150},
			{columnname:"Vendor Name",dataname:"CUST_VENDOR_NAME",datatype:"string",width:200},
			/*{columnname:"Customer Code",dataname:"CUSTOMER_CODE",datatype:"string",width:150},
			{columnname:"Customer Name",dataname:"CUSTOMER_NAME",datatype:"string",width:200},*/
			{columnname:"Phone 1",dataname:"PHONE1",datatype:"string",datatype:"string",width:200},
			{columnname:"City",dataname:"CITY",datatype:"string",width:200},
			{columnname:"State",dataname:"STATE",datatype:"string",width:200},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:200},
			{columnname:"Contact Person",dataname:"CONTACT_PERSON",datatype:"string",width:200},
			{columnname:"Contact Phone No",dataname:"CONTACT_PERSON_PH",datatype:"string",width:200},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:200},
		]
		var helpOnCustomerVendorGridDtl=			//69995
		{
			title:"Vendor Details",
			id:"customerVendorDtlCache",
			detail:helpOnCustomerVendorGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
		}
		var helpGridSection = plf.addGrid(helpOnCustomerVendorGridDtl,this)		//69995
		mainpage.hlpSearchGridPtr = helpGridSection
		//HelpOn3PL Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(helpOnCustomerVendorHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		/*	{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreRouteService",
				"methodName":"initRouteMasterScrTS"
			},		*/
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreCustVendorService",
				"methodName":"initCustVendorMasterSearchScrTS"
			},
			{       
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strCustVendorCodeFrom","strCustVendorCodeTo","strCustVendorName","strCustomerName","strCustomerCode","strCity","strState","strCountry","strStatus"],
				"service":"CoreCustVendorService",
				"methodName":"fetchAllCustVendorTS"
			},
			{
			"tasktype":"proto",
			"filename":"jm_master/CustomerVendorHelp.json"
			},
			{
				"controlid":"strCountry",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreCustVendorService",
				"methodName":"fetchStateTS"
		},
		
		{
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreCustVendorService",
				"methodName":"fetchCityTS"
		}
			
		];
		
		
		
		

		this.callParent(arguments);
		
	}
});
