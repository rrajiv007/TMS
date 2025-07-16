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
1.0.2		Bhuvan			05-Feb-2016	  	69995	                Added var for all local variable               
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.CustomerVendorSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Vendor Summary";
		
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Create a vendor","linkid":"jm_CustomerVendor","tooltip":"Click here to create a vendor."}
		]
		
		
		//HelpOn3PL Search Section Begins
		plf.columns=3
		var helpOnCustomerVendorHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);   //69995
		var helpOnCustomerVendorFormCtrl=			//69995
		[
			plf.addText({"label":"Vendor Code",id:"strCustVendorCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Vendor Code To",id:"strCustVendorCodeTo","anywhereSearch":"true"}),
			plf.addText({"label":"Vendor Name",id:"strCustVendorName"}),
			/*plf.addText({"label":"Customer Code",id:"strCustomerCode"}),
			plf.addText({"label":"Customer Name",id:"strCustomerName"}),*/
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"})
           // plf.addBlank({}),
           // plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
			
		]
		
		helpOnCustomerVendorHdrCollapse.add(helpOnCustomerVendorFormCtrl);
		//HelpOn3PL Header Section Ends
		
		//HelpOn3PL Grid Section Begins
		var helpOnCustomerVendorGridFieldObj=			//69995
		[
			{columnname:"Vendor Code",dataname:"CUST_VENDOR_CODE",datatype:"string",width:150,linkId:"CustomerVendorMaster","tooltip":"Click here to launch the vendor screen."},
			{columnname:"Vendor Name",dataname:"CUST_VENDOR_NAME",datatype:"string",width:150},
			/*{columnname:"Customer Code",dataname:"CUSTOMER_CODE",datatype:"string",width:100},
			{columnname:"Customer Name",dataname:"CUSTOMER_NAME",datatype:"string",width:100},*/
			{columnname:"Phone 1",dataname:"PHONE1",datatype:"string",datatype:"string",width:100},
			{columnname:"City",dataname:"CITY",datatype:"string",width:100},
			{columnname:"State",dataname:"STATE",datatype:"string",width:100},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:100},
			{columnname:"Contact Person",dataname:"CONTACT_PERSON",datatype:"string",width:100},
			{columnname:"Contact Phone No",dataname:"CONTACT_PERSON_PH",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:90},
		]
		var helpOnCustomerVendorGridDtl=			//69995
		{
			title:"Vendor Details",
			id:"customerVendorDtlCache",
			detail:helpOnCustomerVendorGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			readOnly:true,
			removeAddDelete:true
		}
		var helpGridSection = plf.addGrid(helpOnCustomerVendorGridDtl,this)		//69995
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
				"input":["strCustVendorCodeFrom",/*"strCustVendorCodeTo","strCustomerCode","strCustomerName",*/"strCustVendorName","strCity","strState","strCountry","strStatus"],
				"service":"CoreCustVendorService",
				"methodName":"fetchAllCustVendorTS"
			},
			{
			"tasktype":"proto",
			"filename":"jm_master/CustomerVendorSearch.json"
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
			"CustomerVendorMaster":
				{
					"dest":"jm_master.CustomerVendorMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"CUST_VENDOR_CODE","dest":"strCustVendorCode"}
							]
				},
				"jm_CustomerVendor":
				{
					"dest":"jm_master.CustomerVendorMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
this.callParent(arguments);
		
	}
});
