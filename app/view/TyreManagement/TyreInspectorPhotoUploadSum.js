/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	Tyre RFID Inspector Photo upload Summary                                                                		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.3															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                                 
************************************************************************************************/
Ext.define('CueTrans.view.TyreManagement.TyreInspectorPhotoUploadSum', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "View Uploaded Photo";
		
		plf.columns=4
		var TyreRFIDInspectorHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
		]
		
		var TyreRFIDInspectorFormCtrl=
		[
			plf.addText({"label":"RFID #",id:"strRFID"}),
			plf.addText({"label":"Serial #",id:"strDOT"}),
			//plf.addText({"label":"Supplier",id:"strSupplier"}),
			//plf.addCombo({"label":"Truck Code",id:"strTruckCode"}),
			//plf.addCombo({"label":"Tyre Position",id:"strTyrePosition"}),
			
			plf.addDate({"label":"Uploaded Date",id:"strScanDate","mandatory":"true"}),
		    //plf.addCombo({"label":"Location",id:"strScanLocation"}),
			//plf.addCombo({"label":"Status","id":"strStatus"}),
			plf.addText({"label":"Remarks",id:"strInspectionRemarks"})
			

		]
		
		 TyreRFIDInspectorHdrCollapse.add(TyreRFIDInspectorFormCtrl);									
		//Search Section Ends
		
		//Grid Section Begins
		var TyreRFIDInspectorGridFieldObj=		
		[
			
			{columnname:"RFID #",dataname:"RFID",datatype:"string",width:130},
			{columnname:"Serial #",dataname:"SERIAL",datatype:"string",width:130},
			{columnname:"File Name",dataname:"FILE_NAME",datatype:"string",width:130},
			//{columnname:"Uploaded Photo",dataname:"UPLOAD_PHOTO",datatype:"string",width:130},
			{columnname:"Uploaded Photo",dataname:"UPLOAD_PHOTO",datatype:"string",linkId:"DOWN_LINKID","tooltip":"Click here to download",type:"filedownload",fileGroup:"Service/Doc_Attachment",width:"auto"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:130},
			{columnname:"Uploaded Date",dataname:"UPLOAD_DATE",datatype:"string",width:130},
			{columnname:"Uploaded By",dataname:"UPLOADED_BY",datatype:"string",width:130}
		]
		var TyreRFIDInspectorGridDtl=		
		{
			title:"",
			id:"TyreRFIDPhotoUploadSum",
			detail:TyreRFIDInspectorGridFieldObj,
			removeAddDelete:true,
			readonly:true,
			visibleRow:12
		}
		var tyreRFIDInspectorGridSection = plf.addGrid(TyreRFIDInspectorGridDtl,this)
		//Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(TyreRFIDInspectorHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(tyreRFIDInspectorGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		 	{
			"controlid":"",
			"tasktype":"onload",
			"input":[""],
			"service":"CoreInspectionsService",
			"methodName":"initRFIDOptionalPhotoSum"
			
			},
			{
		   "controlid":"btnSearch",
			"tasktype":"btnclick",
			"input":["strRFID","strDOT","strScanDate","strInspectionRemarks"],
			"service":"CoreInspectionsService",
			"methodName":"fetchRFIDOptionalPhotoSum"
		
			}
		];
		mainpage.hlpLinks=
		{
			
		}
		//Event Handlers Mapping Ends


		this.callParent(arguments);
		
	}
});
