/************************************************************************************************
MODIFICATION HISTORY        									                               	
************************************************************************************************
DESCRIPTION : Waste and Water Haulage
AUTHOR      : Raj                                                           		         
VERSION     : 1.0.0
************************************************************************************************	
VERSION 	MODIFIED BY	     DATE	      DEFECT ID			               REMARKS             
************************************************************************************************	

************************************************************************************************/

Ext.define('CueTrans.view.WASTE_WATER.WasteWaterManagDownload',

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function() 
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Waste, Water & Transport Haulage";
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;			
	    mainpage.toolbarLinks=
		[
			//{"name":"Upload Document","linkid":"UploadDocument","tooltip":"Click here to upload document."}
		]	
		/****** TOOL BAR SECTION BEGINS******/
		mainpage.toolbarActions= 
		[		    
        ]
		/****** TOOL BAR SECTION ENDS******/
		
		/****** HEADER SECTION BEGINS******/
		plf.columns=4
		var WasteWaterDownloadHdrColumn = plf.addColumnSection({});			
		var WasteWaterDownloadHdrCtrl=						
		[
			plf.addCombo({"label":"Type",id:"strType"}),
			plf.addCombo({"label":"Contractor Name",id:"strContractorName"}),
			plf.addCombo({"label":"Year",id:"strYear"}),
			plf.addCombo({"label":"Month",id:"strMonth"}),
			plf.addCombo({"label":"Month",id:"strMonth"}),
			plf.addText({"label":"Total Amount",id:"strTotalAmount",inputFormat:'numeric',weightPrecision:3})
			//plf.addButton({"label":"Search","id":"btnSearch",width:100})
			
		]
		WasteWaterDownloadHdrColumn.add(WasteWaterDownloadHdrCtrl);	   
		
		/****** HEADER SECTION ENDS******/
		
		/* Download search button start here	*/
		plf.columns=3
		var DocumentDowanload = plf.addColumnSection({title:"",columnWidth:1});									
		var DocDowanloadCtrl=						
		[
			plf.addBlank(), 
			plf.addButton({"label":"Search","id":"Search",width:100}),
			plf.addBlank() 
		]
		DocumentDowanload.add(DocDowanloadCtrl)
		/* Download search button end here	*/
		
		
		/****** GRID SECTION BEGINS******/

		var WasteWaterDownloadSection = plf.addColumnSection({});
		var WasteWaterDownloadObj=							
		[		    
			{columnname:"Type",dataname:"TYPE",datatype:"string",width:100},
			{columnname:"Contractor Name",dataname:"CONTRACTOR_NAME",datatype:"string",width:"auto",editControl:"DisplayOnly"},
			{columnname:"Year",dataname:"YEAR",datatype:"string",width:"auto",editControl:"DisplayOnly"},
			{columnname:"Month",dataname:"MONTH",datatype:"string",width:"auto",editControl:"DisplayOnly"},
			{columnname:"Total Amount",dataname:"TOTAL_AMOUNT",datatype:"string",width:"auto",editControl:"DisplayOnly",weightPrecision:3},
			{columnname:"Attachment",dataname:"ATTACHMENT",datatype:"string",linkId:"DOWN_LINKID","tooltip":"Click here to download",type:"filedownload",fileGroup:"Service/Doc_Attachment",width:"auto"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",width:"auto",editControl:"DisplayOnly"},
			{columnname:"Uploaded By",dataname:"UPLOADED_BY",datatype:"string",width:"auto",editControl:"DisplayOnly"},
			{columnname:"Uploaded Date",dataname:"UPLOADED_DT",datatype:"string",width:"auto",editControl:"DisplayOnly",hidden:true}
			
		]
		var WasteWaterDownloadDtl=								
		{
			title:"",
			id:"WasteWaterUpload",
			detail:WasteWaterDownloadObj,
			visibleRow:10,
			readOnly:true,
			removeAddDelete:true
		}	
			 
		var  gridSection = plf.addGrid(WasteWaterDownloadDtl,this)	  
	    WasteWaterDownloadSection.add(gridSection);
		
		/****** GRID SECTION ENDS******/
		
		
        /****** MAINPAGE SECTION BEGINS******/

		mainpage.ptrMainSection.add(WasteWaterDownloadHdrColumn)
		mainpage.ptrMainSection.add(DocumentDowanload)
		mainpage.ptrMainSection.add(WasteWaterDownloadSection);
		
	    /****** MAINPAGE SECTION ENDS******/
			
	    /******  EVENT HANDLERS MAPPING BEGINS******/
		mainpage.eventHandlers = 
		[
          {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"WasteWaterCoreServiceTS",
				"methodName":"initWWaterUploadSumTS"
			},
			{
				"controlid":"Search",
				"tasktype":"btnclick",
				"action":"Search",
				"input":["strType","strContractorName","strYear","strMonth","strTotalAmount"],
				"service":"WasteWaterCoreServiceTS",
				"methodName":"searchUploadedDocTs"			
			}
 
		];
		
		/******  EVENT HANDLERS MAPPING ENDS******/
		mainpage.screenLinks=
		{
				"UploadDocument":
				{
					"dest":"WASTE_WATER.WasteWaterManagUpload",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}

				
		}	
		/******  HELP LINK BEGINS******/
		mainpage.hlpLinks=
		{
		
		}
		/******  HELP LINK ENDS******/
		
		this.callParent(arguments);
		
	}
});