/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	FMS -Document Summary                                                                   		         
Author		  :	Raj					 											                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.GATEPASS.SAPPO_Summary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "SAP PO Summary";
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;	
        
		/* SAP PO Summary Header Search Section start here */
		plf.columns=4
		var SummaryHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: false,btnID:"searchBtn"},this);	
	 	var SummaryFormCtrl=												
		[
			plf.addText({"label":"PO Number",id:"strPONumber",inputFormat:"string"}),
			plf.addCombo({"label":"Date Type",id:"strDateType"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"}),
			plf.addText({"label":"Vendor Number",id:"strVendorNo"}),	
			plf.addText({"label":"Vendor Name",id:"strVendorName"}),	
			plf.addCombo({"label":"SAP PO Status",id:"strStatus"})
		]
		
		SummaryHdrCollapse.add(SummaryFormCtrl);
		/* SAP PO Summary Header Search Section end here */
		
		/* SAP PO Summary Grid Section start here */
		var SummaryGridFieldObj=						
		[
           	{columnname:"PO Number",dataname:"PO_NUMBER",datatype:"string",linkId:"LINKID","tooltip":"Click here to launch the SAP PO details.",width:"auto"},
			{columnname:"SAP PO Status",dataname:"SAP_PO_STATUS",datatype:"string",width:150},
			{columnname:"PO Date",dataname:"PO_DT",datatype:"string",width:150},			
			{columnname:"Vendor Name",dataname:"VENDOR_NAME",datatype:"string",width:150},
			
			{columnname:"Vendor Number",dataname:"VENDOR_NO",datatype:"string",width:150},			
			{columnname:"Received Date/time",dataname:"RECEIVED_DT",datatype:"string",width:150},
			{columnname:"Amendment Number",dataname:"AMENDMENT_NO",datatype:"string",width:150},
			{columnname:"Amendment Date/time",dataname:"AMENDMENT_DT",datatype:"string",width:150},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:90},
		]
		var SummaryGridDtl=
		{
			title:"",
			id:"Summary",
	        detail:SummaryGridFieldObj,
		    readonly:true,
			removeAddDelete:true,
			visibleRow:9,
			rowDisabled:true
		   }
		var SummaryGridSection = plf.addGrid(SummaryGridDtl,this)
		/* SAP PO Summary Grid Section end here */
		
		/* Add Child  Sections start here*/
		mainpage.ptrMainSection.add(SummaryHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(SummaryGridSection) //Add Grid Section to Main Page
		/* Add Child  Sections end here*/
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"GPCoreServiceTS",
				"methodName":"initSAPPOSumTS"
			},
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strPONumber","strStatus","strVendorNo","strVendorName","strDateType","dtDateFrom","dtDateTo"],
				"service":"GPCoreServiceTS",
				"methodName":"FetchSAPPOSumTS"
			}
			
		];
			
			
		mainpage.screenLinks=
		{
			"LINKID":
			{
				"dest":"GATEPASS.SAPPODtl",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"PO_NUMBER","dest":"strPONumber"}
						]
			}
		}
		this.callParent(arguments);
		
	}
});
