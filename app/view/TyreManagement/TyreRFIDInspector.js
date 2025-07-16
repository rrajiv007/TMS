/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	Tyre RFID Inspector                                                               		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                                   
************************************************************************************************/
Ext.define('CueTrans.view.TyreManagement.TyreRFIDInspector', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Tyre Inspector";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			//{"name":"View Uploaded Photo","linkid":"tyrerfidUploadpic_link","tooltip":"Click here to view uploaded photo."},
			{"name":"Tyre Inspector Summary","linkid":"tyrerfidInspectorMstr","tooltip":"Click here for tyre inspector summary."}
		]
		mainpage.toolbarActions= [
		    {
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Submit",
                "tooltip": "Click here to submit."
            }
            ]
		//Supplier Master Header Section Begins
		plf.columns=4
		var tyresupplierMstrColumn = plf.addColumnSection({});	
		var tyresupplierMstrCtrl=	
		[
			plf.addText({"label":"RFID #",id:"strRFID","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Serial #","id":"strDOT"}),
			plf.addDisplayOnly({"label":"Supplier","id":"strSupplier"}),
			plf.addDisplayOnly({"label":"Assigned Vehicle #","id":"strTruckCode"}),
			
			plf.addDisplayOnly({"label":"Tyre Position","id":"strTyrePosition"}),
			plf.addDateTime({"label":"Scan Date/Time",dateid:"dtInspectionDate",timeid:"iInspectionTime","mandatory":"true"}),
		    plf.addCombo({"label":"Location",id:"strScanLocation",InputLength:"100","mandatory":"true"}),
			plf.addCombo({"label":"Arrived Vehicle #",id:"strArrivedVehicle","mandatory":"true"}), 
			plf.addCombo({"label":"Mismatch Reason",id:"strMismatchReason"}),
			//plf.addCombo({"label":"Changed Vehicle #",id:"strChangedVehicle"}),
			
			
			plf.addTextArea({"label":"Remarks",id:"strInspectionRemarks",InputLength:"2000"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addBlank(), 
			
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank()
			
			//plf.addCombo({"label":"Truck Code",id:"strTruckCode","mandatory":"true"}),
			//plf.addCombo({"label":"Tyre Position",id:"strTyrePosition","mandatory":"true"})		   
		]
		tyresupplierMstrColumn.add(tyresupplierMstrCtrl);
		//Supplier Master Header Section Ends
		
		var OptionalTyresPhotoUploadObj=	
		[
			//{columnname:"Tyre Position",dataname:"TYRE_POSITION",datatype:"string",storeId:"strOptTyrepos",editControl:"combo",width:125},
			//{columnname:"Asset Type",dataname:"ASSET_TYPE",datatype:"string",storeId:"strOptAssettype",editControl:"combo",width:100},
			{columnname:"File Name",dataname:"FILE_NAME",datatype:"string",width:250},
			{columnname:"Upload Photo",dataname:"UPLOAD_PHOTO",datatype:"string",editControl:"fileupload",fileGroup:"Driver/Documents",width:135,nameColumn:"FILE_NAME"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:500}
		]
		var OptionalTyresPhotoGridDtl=		
		{
			title:"Optional Photo Upload",
			id:"OptionalTyresPhotoUpload",
			//columnWidth:0.50,
			detail:OptionalTyresPhotoUploadObj,
			visibleRow:8,
			removeAppend:true,
		}
	    var  OptionalTyresPhotoGridSection = plf.addGrid(OptionalTyresPhotoGridDtl,this)
		
		//Add Header Section to Main Page
		mainpage.ptrMainSection.add(tyresupplierMstrColumn)
		mainpage.ptrMainSection.add(OptionalTyresPhotoGridSection) //Add Grid Section to Main Page
		
		mainpage.dataHistorySectionFlag=true;
		
		// for green line
		//tyresupplierMstrColumn.add(plf.addStripLine({}));
		//mainpage.ptrMainSection.add(tyresupplierMstrColumn)//add hdr details
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreInspectionsService",
					"methodName":"initrfidinspectorTS"
			},		
			{
					"controlid":"strRFID",
					"tasktype":"onenter",
					"input":["strRFID"],
					"service":"CoreInspectionsService",
					"methodName":"fetchRfidDtl"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Submit",
					"input":["strRFID","strDOT","strTruckCode","strTyrePosition","strInspectionRemarks","dtInspectionDate",
					"iInspectionTime","strScanLocation","OptionalTyresPhotoUpload","strArrivedVehicle","strMismatchReason","strChangedVehicle"],
					"service":"CoreInspectionsService",
					"methodName":"submitrfidinspectorTS",
					"msg":"Are you sure you want to submit?"
			}/*,
			{
					"controlid":"strMismatchReason",
					"tasktype":"onchange",
					"input":["strMismatchReason"],
					"service":"CoreInspectionsService",
					"methodName":"onchangeMismatchReason"
			}*/
		];
		//Event Handlers Mapping Ends
		mainpage.screenLinks=
		{
			"tyrerfidInspectorMstr":
				{
					"dest":"TyreManagement.TyreRFIDInspectorSum",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"tyrerfidUploadpic_link":
				{
					"dest":"TyreManagement.TyreInspectorPhotoUploadSum",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}	
		//Generate Screen Section
		//mainpage.generateScreen();
		
		mainpage.screenModes=
		{
		
		}
		
		
		mainpage.hlpLinks=
		{

			
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
