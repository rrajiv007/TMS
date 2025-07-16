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
Ext.define('CueTrans.view.jm_master.SupplierHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		
		mainpage.screenName = "Supplier List";
		//HelpOnSupplier Search Section starts
		plf.columns=3
		var supplierHdrCollapse = plf.addColumnSection({ collapsed: true});				//69995
		
		
		var supplierFormCtrl=												//69995
		[
			plf.addText({"label":"Supplier Code",id:"strSupplierCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Supplier Code To",id:"strSupplierCodeTo","anywhereSearch":"true"}),
			plf.addText({"label":"Supplier Name",id:"strSupplierName"}),
			plf.addCombo({"label":"Supplier Type",id:"strSupplierType"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),
            plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
			
		]
		
		supplierHdrCollapse.add(supplierFormCtrl);
		//HelpOnSupplier Header Section Ends
		
		//HelpOnSupplier Grid Section Begins
		var supplierGridFieldObj=									//69995
		[
			{columnname:"Supplier Code",dataname:"SUPPLIER_CODE",datatype:"string",width:150},
			{columnname:"Supplier Name",dataname:"SUPPLIER_NAME",datatype:"string",width:200},
			{columnname:"Supplier Type",dataname:"SUPPLIER_TYPE",datatype:"string",datatype:"string",width:100},
			{columnname:"Phone1",dataname:"PHONE1",datatype:"string",width:100},
			{columnname:"City",dataname:"CITY",datatype:"string",width:100},
			{columnname:"State",dataname:"STATE",datatype:"string",width:100},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:100},
			{columnname:"Contact Person",dataname:"CONTACT_PERSON",datatype:"string",width:200},
			{columnname:"Contact Phone<br>No",dataname:"CONTACT_PERSON_PH",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:80},
		]
		var supplierGridDtl=			//69995
		{
			title:"Supplier Details",
			id:"supplierDtl",
			detail:supplierGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
		}
		var supplierGridSection = plf.addGrid(supplierGridDtl,this)				//69995
		mainpage.hlpSearchGridPtr = supplierGridSection
		//HelpOnSupplier Grid Section Ends
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(supplierHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(supplierGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreSupplierService",
				"methodName":"initSupplierMasterSearchScrTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strSupplierCodeFrom","strSupplierName","strSupplierType","strCity","strState","strCountry","strStatus"],
				"service":"CoreSupplierService",
				"methodName":"fetchAllSupplierTS"
			},
			{
				"tasktype":"proto",
				"filename":"jm_master/SupplierHelp.json"
			},
			
		
		{
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreSupplierService",
				"methodName":"fetchCityTS"
		}
			
		];
		
		
		this.callParent(arguments);
		
	}
});
