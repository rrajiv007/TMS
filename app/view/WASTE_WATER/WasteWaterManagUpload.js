/************************************************************************************************
MODIFICATION HISTORY        									                               	
************************************************************************************************
DESCRIPTION : Waste and Water Management
AUTHOR      : Raj                                                           		         
VERSION     : 1.0.0
************************************************************************************************	
VERSION 	MODIFIED BY	     DATE	      DEFECT ID			               REMARKS             
************************************************************************************************	

************************************************************************************************/

Ext.define('CueTrans.view.WASTE_WATER.WasteWaterManagUpload',

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function() 
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Waste, Water & Transport Management";
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;			
	    mainpage.toolbarLinks=
		[
						
		]
		/****** TOOL BAR SECTION BEGINS******/
		mainpage.toolbarActions= 
		[		    
        ]
		/****** TOOL BAR SECTION ENDS******/
		
		/****** HEADER SECTION BEGINS******/
		plf.columns=4
		var WasteWaterUploadHdrColumn = plf.addColumnSection({});			
		var WasteWaterUploadHdrCtrl=						
		[
			plf.addCombo({"label":"Type",id:"strType","mandatory":"true"}),
			plf.addCombo({"label":"Contractor Name",id:"strContractorName","mandatory":"true"}),
			plf.addCombo({"label":"Year",id:"strYear","mandatory":"true"}),
			plf.addCombo({"label":"Month",id:"strMonth","mandatory":"true"}),
			//plf.addCombo({"label":"Month",id:"strMonth","mandatory":"true"}),
			plf.addText({"label":"Total Amount",id:"strTotalAmount",inputFormat:'numeric',weightPrecision:3,"mandatory":"true"}),
			plf.addTextArea({"label":"Remarks",id:"strRemarks"}),
			
			plf.addBlank(), 
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank()
			
		]
		WasteWaterUploadHdrColumn.add(WasteWaterUploadHdrCtrl);	   
		
		/* Upload Document start here	*/
		plf.columns=3
		var DocumentUpload = plf.addColumnSection({title:"",columnWidth:1});									
		var DocUploadCtrl=						
		[
			plf.addCustomFileUpload({"label":"Upload Document",id:"strUploadDoc",mandatory:"true",Entity:"Service/Doc_Attachment",Path:"app"}),
			plf.addButton({"label":"Submit","id":"Submit",width:100})
			/*plf.addButton({"label":"Submit","id":"Submit",
						   handler: function() 
							{
								var result = confirm("Are you sure about submit?");
										if (result) 
										{
											form_obj.queryById("methodName").setValue("submitWWUploadTS");
											process_ebpack_service(form_obj,["strType","strContractorName","strYear","strMonth","strTotalAmount","strRemarks","strUploadDoc"],"WasteWaterCoreServiceTS");
										}
							}}),*/
		]
		DocumentUpload.add(DocUploadCtrl)
		/* Upload Document start here	*/



		
		/****** HEADER SECTION ENDS******/
		
		
		/****** GRID SECTION BEGINS******/

		var WasteWaterUploadSection = plf.addColumnSection({});
		var WasteWaterUploadObj=							
		[		    
			{columnname:"Seqno",dataname:"SEQ_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Type",dataname:"TYPE",datatype:"string",width:"auto"},
			{columnname:"Contractor Name",dataname:"CONTRACTOR_NAME",datatype:"string",width:"auto",editControl:"DisplayOnly"},
			{columnname:"Year",dataname:"YEAR",datatype:"string",width:"auto",editControl:"DisplayOnly"},
			{columnname:"Month",dataname:"MONTH",datatype:"string",width:"auto",editControl:"DisplayOnly"},
			{columnname:"Total Amount",dataname:"TOTAL_AMOUNT",datatype:"string",width:"auto",editControl:"DisplayOnly",weightPrecision:3},
			{columnname:"Attachment",dataname:"ATTACHMENT",datatype:"string",linkId:"DOWN_LINKID","tooltip":"Click here to download",type:"filedownload",fileGroup:"Service/Doc_Attachment",width:"auto"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:"auto",editControl:"DisplayOnly"},
			{columnname:"Uploaded By",dataname:"UPLOADED_BY",datatype:"string",width:"auto",editControl:"DisplayOnly"},
			{columnname:"Uploaded Date",dataname:"UPLOADED_DT",datatype:"string",width:"auto",editControl:"DisplayOnly",hidden:true},
			//{columnname:"Delete",dataname:"DELETE",datatype:"string",width:120}
			//{columnname:"Delete",dataname:"DELETE",width:70,tooltip:"Click here to delete.",imageURL:"resources/images/gridbar/deleteww.png"}
			{columnname:"Click here to delete.",dataname:"DELETE",width:"auto",linkId:"ReqAmendHdrDtl",imageURL:"resources/images/gridbar/deleteww.png",tooltip:"Click here to delete."}
			
		]
		var WasteWaterUploadDtl=								
		{
			title:"",
			id:"WasteWaterUpload",
			detail:WasteWaterUploadObj,
			visibleRow:10,
			readOnly:true,
			removeAddDelete:true
		}	
			 
		var  gridSection = plf.addGrid(WasteWaterUploadDtl,this)	  
	    WasteWaterUploadSection.add(gridSection);
		
		/****** GRID SECTION ENDS******/
		
		
        /****** MAINPAGE SECTION BEGINS******/

		mainpage.ptrMainSection.add(WasteWaterUploadHdrColumn)
		mainpage.ptrMainSection.add(DocumentUpload)
		mainpage.ptrMainSection.add(WasteWaterUploadSection);
		
	    /****** MAINPAGE SECTION ENDS******/
			
	    /******  EVENT HANDLERS MAPPING BEGINS******/
		mainpage.eventHandlers = 
		[
          {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"WasteWaterCoreServiceTS",
				"methodName":"initWasteWaterUploadTS"
			},
			{
				"controlid":"Submit",
				"tasktype":"btnclick",
				"action":"Submit",
				"input":["strType","strContractorName","strYear","strMonth","strTotalAmount","strRemarks","strUploadDoc"],
				"service":"WasteWaterCoreServiceTS",
				"methodName":"submitWWUploadTS"		//SubmitQuotationTS		
			}
 
		];
		
		/******  EVENT HANDLERS MAPPING ENDS******/
		
		/******  HELP LINK BEGINS******/
		mainpage.hlpLinks=
		{
		
		}
		/******  HELP LINK ENDS******/
		mainpage.screenLinks=
		{
						
				"ReqAmendHdrDtl":
				{
					"dest":"WASTE_WATER.DeletewasteWaterDoc",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"SEQ_NO","dest":"strSeqno"}
							]
				}
				
		}	
		this.callParent(arguments);
		
	}
});