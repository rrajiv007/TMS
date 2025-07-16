/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.jm_master.TruckDocMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Document Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Submit",
                "tooltip": "Click here to submit."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strTruckCode"]
		//truckQrCodeSection = plf.addColumnSection({});
		//Vehicle Master Header Section starts
		plf.columns=3
		var truckMasterColumn = plf.addColumnSection({columnWidth:.85});			
		var truckMasterFormCtrl=											
		[
 	        plf.addHlpText({"label":"Vehicle Code",id:"strTruckCode","mandatory":"true",hlpLinkID:"truckcode",inputFormat:"string",InputLength:"40"},this),	
     		plf.addDisplayOnly({"label":"Vehicle Description",id:"strTruckDesc",inputFormat:"string",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addDisplayOnly({"label":"Vehicle Reg No","id":"strVehicleRegno",inputFormat:"string",InputLength:"80"}),			
			plf.addDisplayOnly({"label":"Vehicle Type",id:"strTruckType"}),
			plf.addDisplayOnly({"label":"Vehicle Category","id":"strTruckCategory"}),
			plf.addDisplayOnly({"label":"Vehicle Make","id":"strTruckMake"}),
			plf.addDisplayOnly({"label":"Availability Status",id:"strAvailabilityStatus"}),
			plf.addDisplayOnly({"label":"No Of Axles(Rear)",id:"ino_of_axles_rear",inputFormat:"integer"}),
			plf.addDisplayOnly({"label":"No Of Axles(front)",id:"ino_of_axles_front",inputFormat:"integer"}),
			plf.addDisplayOnly({"label":"Remarks",id:"remarks",inputFormat:"string",InputLength:"250"}),
			plf.addDisplayOnly({"label":"Year of Manufacture","id":"dtYearOfManufacture",inputFormat:"integer",InputLength:"4"}),
			plf.addDisplayOnly({"label":"Trailer Description ","id":"strTrailerDescription"}),
            plf.addDisplayOnly({"label":"Trailer Code",id:"strTrailerCode"}),
			
			plf.addDisplayOnly({"label":"Vehicle Availability",id:"strVehicleAvailability"}),
			plf.addDisplayOnly({"label":"Carrier Code",id:"strTruckOwnerCode"}),
			plf.addDisplayOnly({"label":"Carrier Name",id:"strTruckOwnerName"}),
			plf.addDisplayOnly({"label":"Base Location",id:"strLocCode"}),
			plf.addDisplayOnly({"label":"Contract No",id:"strContractNum",inputFormat:"string",InputLength:"15"}),
			plf.addDisplayOnly({"label":"Contract Holder Name",id:"strContractHolderName",inputFormat:"string"}),
			plf.addDisplayOnly({"label":"Contact No",id:"strContractContactNum",inputFormat:"string",InputLength:"50"}) 
		]
		
		truckMasterColumn.add(truckMasterFormCtrl);
		//truckMasterColumn.add(plf.addStripLine({}));
		
		truckQrCode = plf.addColumnSection({columnWidth:.15});	
		plf.columns=4
		var truckQrCodeCtrl=	
		[		
			
			plf.addQrcode({"label":"",id:"strQrCode"})
		]
		truckQrCode.add(truckQrCodeCtrl);
		//truckQrCodeSection.add(truckMasterColumn)	
		//truckQrCodeSection.add(truckQrCodeCtrl)
		
		tmpSection = plf.addColumnSection({title:""});
		tmpSection.add(truckMasterColumn)		
		tmpSection.add(plf.addSplitter)		
		tmpSection.add(truckQrCode)	
		//Vehicle Master Header Section Ends
		
		
		//Configuration Fieldset Begins
		configurationFieldset = plf.addColumnSection({title:"Configuration"});
		plf.columns=4
		var configFieldsetFormCtrl=		
		[
			plf.addDisplayOnly({"label":"Length (m)",id:"iTruckLength","width":"50",inputFormat:"numeric",weightPrecision:2}),
     		plf.addDisplayOnly({"label":"Width (m)",id:"iTruckWidth","width":"50",inputFormat:"numeric",weightPrecision:2}),
			plf.addDisplayOnly({"label":"Bed Height (m)",id:"iBedHeight","width":"50",inputFormat:"numeric",weightPrecision:2}),
			plf.addDisplayOnly({"label":"Head Height (m)",id:"iHeadHeight","width":"50",inputFormat:"numeric",weightPrecision:2}),			
			plf.addDisplayOnly({"label":"Tare Weight (ton)",id:"iTareWeight","width":"50",inputFormat:"numeric",weightPrecision:2}),
			plf.addDisplayOnly({"label":"Pay Load Weight (ton)",id:"iPayLoadWeight","width":"50",inputFormat:"numeric",weightPrecision:2}),
			//plf.addText({"label":"Gross Comb Weight (ton)",id:"iTruckGcw","width":"50",inputFormat:"numeric",weightPrecision:2}),
			plf.addDisplayOnly({"label":"Gross Weight (ton)",id:"iTruckGcw"}),
			plf.addDisplayOnly({"label":"Volume (cu.m)",id:"iTruckVolume","width":"50",inputFormat:"numeric",weightPrecision:3})
		]
		
		configurationFieldset.add(configFieldsetFormCtrl);
		//Configuration Fieldset Ends
		
		//Stenciled Tyre Pressure in PSI Begins
		var StenciledTyrePressure = plf.addColumnSection({title:"Stenciled Tyre Pressure in PSI"});
		plf.columns=4
		var StenciledTyrePressureFormCtrl=		
		[
			plf.addDisplayOnly({"label":"Driver Side",id:"iDriverSide",inputFormat:"integer",InputLength:"3"}),
			plf.addDisplayOnly({"label":"Passenger Side",id:"iPassengerSide",inputFormat:"integer",InputLength:"3"})
		]
		
		StenciledTyrePressure.add(StenciledTyrePressureFormCtrl);
		//Stenciled Tyre Pressure in PSI Ends		
		
		//Vehicle Document Mapping Grid Section Begins
		var truckMapGridFieldObj=
		[
			{columnname:"SL No",dataname:"DOC_SLNO",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",editControl:"combo",width:150,storeId:"strInsType"},
			{columnname:"Document Number",dataname:"DOC_NO",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"40"},
			{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:150,editControl:"textbox",inputFormat:"string",InputLength:"100"},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"date",width:160,editControl:"date"},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"date",width:160,editControl:"date"},        
		    {columnname:"File Name",dataname:"FILE_NAME",datatype:"string",width:150},			
			{columnname:"Attach Document",dataname:"ATTACHDOCUMENT",datatype:"string",editControl:"fileupload",fileGroup:"Driver/Documents",width:245,nameColumn:"FILE_NAME"}
		]
		var truckMapGridDtl=			
		{
			title:"",
			id:"truckDocGrid",
			detail:truckMapGridFieldObj
		}
		plf.columns=4
		var AllVehHdrCol = plf.addColumnSection({title:"Vehicle Document Details"});
		var truckMapGridSection = plf.addGrid(truckMapGridDtl,this)
		AllVehHdrCol.add(truckMapGridSection)	
        
		
		//Add Child Sections
		mainpage.ptrMainSection.add(tmpSection)//Add Header Section to Main Page
		
		mainpage.ptrMainSection.add(configurationFieldset)//Add Configuration Field set to Main Page
		mainpage.ptrMainSection.add(StenciledTyrePressure)//Add StenciledTyrePressure to Main Page 

		var baseTab = plf.addTabSection({ tabs:[AllVehHdrCol]});

		
		//History Data Section
		mainpage.ptrMainSection.add(baseTab) 
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
				
				{
				"controlid":"",
				"tasktype":"onload",
				"input":["strTruckCode"],
				"service":"CoreTruckService",
				"methodName":"initTruckDocumentTS"
				},
				{
					"controlid":"strTruckCode",
					"tasktype":"onenter",
					"input":["strTruckCode"],
					"service":"CoreTruckService",
					"methodName":"onenterTruckDocTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Submit",
				"input":["strTruckCode","truckDocGrid"],
				"service":"CoreTruckService",
				"methodName":"submitTruckDocumentTS"
				}
			
		];
		//Event Handlers Mapping Ends
		mainpage.hlpLinks=
		{
			
			"truckcode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTruckCode","child":"TRUCK_CODE"}
							]
				}

				
		}
		//Screenmode setting starts
		mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strTruckCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":["ivmsGrid","truckDocGrid","ino_of_axles_rear","ino_of_axles_front","iPower",
				"iTorque","iTruckLength","iTruckWidth","iTruckHeight","iTruckGcw","iTareWeight",
				"iPayLoadWeight","iTruckVolume","dtYearOfManufacture","iSpeed","iPowerUom",
               "iTorqueUom","iTruckLengthUom","iTruckWidthUom","iTruckHeightUom","iTruckGcwuom","iTareWeightUom","iPayLoadWeightUom","iTruckVolumeUom"]
			}			
		}
		

			//Screen Mode setting ends
		this.callParent(arguments);
		
	}
});