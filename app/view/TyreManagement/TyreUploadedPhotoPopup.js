/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	View Optional Photo                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
     		                                   
************************************************************************************************/
Ext.define('CueTrans.view.TyreManagement.TyreUploadedPhotoPopup', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.7;
		mainpage.popupWidthRatio=.75;
		mainpage.startPainting();
		
		mainpage.screenName = "View Uploaded Photo";	

		var formCtrl=[];
		plf.columns=3
		var OptPhotoUploadHdrColumn = plf.addColumnSection({title:""});
		
		var OptPhotoUploadHdrFormCtrl=
		[
			plf.addHidden({"label":"RFID #","id":"strRFID"}),
			plf.addHidden({"label":"Serial #","id":"strDOT"}),
			plf.addHidden({"label":"Version","id":"strDocNo"})
		]		
		OptPhotoUploadHdrColumn.add(OptPhotoUploadHdrFormCtrl);	
		//Grid Section Begins
		var TyreRFIDInspectorGridFieldObj=		
		[
			
			{columnname:"RFID #",dataname:"RFID",datatype:"string",width:130},
			{columnname:"Serial #",dataname:"SERIAL",datatype:"string",width:130},
			{columnname:"Version",dataname:"VERSION",datatype:"string",width:70,colAlign:'center'},
			{columnname:"File Name",dataname:"FILE_NAME",datatype:"string",width:130,hidden:true},
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

 
		
		//adding control to the mainpage
		mainpage.ptrMainSection.add(OptPhotoUploadHdrColumn)
		//tyreRFIDInspectorGridSection.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(tyreRFIDInspectorGridSection) 
 
	   
	   //History Data Section
		mainpage.dataHistorySectionFlag=false;	
	
		mainpage.eventHandlers = 
		[	
		{
			"controlid":"",
			"tasktype":"onload",
			"input":["strRFID","strDocNo","strDOT"],
			"service":"CoreInspectionsService",
			"methodName":"initRFIDTyrePhotopopup"
		}	
		];		
		this.callParent(arguments);
	}
});