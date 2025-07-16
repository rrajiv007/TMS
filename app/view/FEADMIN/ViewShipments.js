Ext.define('CueTrans.view.FEADMIN.ViewShipments', 
/****************************************************************************************************************
                                          Modification History                                                                                                                                                                                
****************************************************************************************************************               
Description           :                                                                                                                      
Author                :  FX
Version               :  1.0.0

****************************************************************************************************************               
Version              Modified By      Date               Defect ID                 Remarks            
****************************************************************************************************************               
****************************************************************************************************************/
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "View Shipment";
		mainpage.toolbarSectionFlag=true;		
		mainpage.toolbarActions= 
		[	
		]
		//Header Section starts
		plf.columns=4
		var HdrSection = plf.addColumnSection({title:"Shipment Details"},this);		
		var HdrSectionCtrl=
		[
			plf.addDisplayOnly({"label":"Shipment No",id:"strShipmentNo"}),
			plf.addDisplayOnly({"label":"Shipment Date",id:"dtShipmentDate"}),			
			plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			//plf.addDisplayOnly({"label":"Shipper Name",id:"strShipperName"})
		]		
		HdrSection.add(HdrSectionCtrl);
		//Header Section Ends
		plf.columns=3
		//Pick up Details Section starts		
		var PickupSection = plf.addColumnSection({title:"Collection Point Details"},this);		
		var PickupSectionCtrl=
		[
			plf.addDisplayOnly({"label":"Region","id":"strFromRegion"}),
			plf.addDisplayOnly({"label":"Origin","id":"strOrigin"}),
			plf.addDisplayOnly({"label":"Address","id":"strOrgAddress"}),
			plf.addDisplayOnly({"label":"Pickup Date/Time",id:"dtPickDate"}),
			plf.addDisplayOnly({"label":"Contact No","id":"strContactNo"})
		]		
		PickupSection.add(PickupSectionCtrl);
		//Pick up Details Section Ends
		
		plf.columns=4
		//Drop Details Section starts		
		var DropSection = plf.addColumnSection({title:"Delivery Point Details"},this);		
		var DropSectionCtrl=
		[
			plf.addDisplayOnly({"label":"Region","id":"strToRegion"}),
			plf.addDisplayOnly({"label":"Destination","id":"strDestination"}),
			plf.addDisplayOnly({"label":"Address","id":"strDestAddress"}),
			plf.addDisplayOnly({"label":"Contact No","id":"strDestContactNo"})
		]		
		DropSection.add(DropSectionCtrl);
		//Drop up Details Section Ends
		
		
		
		//Grid Section starts
		var GridObj=
		[		
			{columnname:"Item Description",dataname:"ITEM_DESC",datatype:"string",width:130},
			{columnname:"Quantity",dataname:"QUANTITY",datatype:"string",width:80,inputFormat:"numeric",weightPrecision:"3"},
			{columnname:"UOM",dataname:"UOM",datatype:"string",width:90},
			{columnname:"Length(cm)",dataname:"LENGTH",datatype:"string",width:90,inputFormat:"numeric",weightPrecision:"3"},
			{columnname:"Width(cm)",dataname:"WIDTH",datatype:"string",width:80,inputFormat:"numeric",weightPrecision:"3"},
          	{columnname:"Height(cm)",dataname:"HEIGHT",datatype:"string",width:80,inputFormat:"numeric",weightPrecision:"3"},
			//{columnname:"LBH(UOM)",dataname:"LBH_UOM",datatype:"string",width:80},
		    {columnname:"Weight(tons)",dataname:"WIGHT",datatype:"string",width:80,inputFormat:"numeric",weightPrecision:"3"},
			//{columnname:"Weight(UOM)",dataname:"WEIGHT_UOM",datatype:"string"},
			{columnname:"Fragile",dataname:"FRAGILE",datatype:"string",width:80},
			{columnname:"Hazardous",dataname:"HAZARDOUS",datatype:"string",width:80},
			{columnname:"ODC",dataname:"ODC",datatype:"string",width:80}			
		]
		var GridDetail=
		{
			title:"",
			id:"itemdetails",
			detail:GridObj,
			visibleRow:5,
			removeAddDelete:true	
		}
		var GridSection = plf.addGrid(GridDetail,this)	
		var GridColSection = plf.addCollapseSection({title:"Item Details",collapsed: true},this);
		GridColSection.add(GridSection)
		//Grid Section Ends
		
		//File Upload section starts here
		var FileUploadSection = plf.addCollapseSection({title:"Attachment",collapsed: true},this);		
		var FileUploadSectionCtrl=
		[
			plf.addFileUpload({"label":"Upload File",id:"strAttach",Entity:"Reports/images/Ship/File_Attachment",Path:"app"}),
		]		
		FileUploadSection.add(FileUploadSectionCtrl);
		//File Upload section Ends here
		
		//CueTrans Section starts here
		plf.columns=4
		var CueTransSection = plf.addColumnSection({"title":"Plan Details"}); 
		var CueTransSectionCtrl=
		[
			plf.addDisplayOnly({"label":"Origin",id:"strCueOrigin"}),
			plf.addDisplayOnly({"label":"Destination",id:"strCueDestination"}),			
			plf.addDisplayOnly({"label":"Rate","id":"strRate"}),
			plf.addDisplayOnly({"label":"Vehicle Category",id:"strVehicleCat"})
		]
		CueTransSection.add(CueTransSectionCtrl)
		//CueTrans Section Ends here
		
		//adding the control to the mainpage
		mainpage.ptrMainSection.add(HdrSection)
		mainpage.ptrMainSection.add(PickupSection)
		mainpage.ptrMainSection.add(DropSection)
		mainpage.ptrMainSection.add(GridColSection) 
		//mainpage.ptrMainSection.add(FileUploadSection)
		mainpage.ptrMainSection.add(CueTransSection)
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		
		
			mainpage.eventHandlers = 
			[
				  
               {
				"controlid":"",
				"tasktype":"onload",
				"input":["strShipmentNo"],
				"service":"FXCoreTS",
				"methodName":"ViewSEShipmentTS"
		      }
			             
			];
		
		this.callParent(arguments);
		
	
	}
});
