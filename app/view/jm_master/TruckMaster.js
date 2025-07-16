/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	     Added var for all local variable	
1.0.2       Steffie         16-Jul-2016     73395            Service Location 
1.0.3       Shekar         	03-Aug-2016    73727  
1.0.4       Divya           29/12/2016     75263     Added QR Code Report
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.TruckMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Vehicle Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a vehicle."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a vehicle."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a vehicle."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a vehicle."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a vehicle."
            },
			{
                "name": "Print",											//75263
                "tooltip": "Click here to print QR Code."
            },
			{
                "name": "Archive",
                "tooltip": "Click here to archive a vehicle."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strTruckCode"]
		//truckQrCodeSection = plf.addColumnSection({});
		//Vehicle Master Header Section starts
		plf.columns=3
		var truckMasterColumn = plf.addColumnSection({columnWidth:.85});				//69995
		//truckMasterColumn = plf.addColumnSection({});
		//truckMasterCommonColumn = plf.addColumnSection({});
		//plf.addText({"label":"Vehicle Description",id:"strTruckDesc","mandatory":"true",inputFormat:"string",InputLength:"100"}),
		
		var truckMasterFormCtrl=														//69995
		[
 	        plf.addHlpText({"label":"Vehicle Code",id:"strTruckCode","mandatory":"true",hlpLinkID:"truckcode",inputFormat:"string",InputLength:"40"},this),	
     		plf.addText({"label":"Vehicle Description",id:"strTruckDesc","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
			plf.addText({"label":"Vehicle Reg No","id":"strVehicleRegno","mandatory":"true",inputFormat:"string",InputLength:"80"}),			
			plf.addCombo({"label":"Vehicle Type",id:"strTruckType"}),
			//plf.addCombo({"label":"Sub Type",id:"strTruckSubtype"}),
			plf.addCombo({"label":"Vehicle Category","id":"strTruckCategory"}),
			plf.addCombo({"label":"Vehicle Make","id":"strTruckMake"}),
			plf.addDisplayOnly({"label":"Availability Status",id:"strAvailabilityStatus"}),
			plf.addText({"label":"No Of Axles(Rear)",id:"ino_of_axles_rear",inputFormat:"integer"}),
			plf.addText({"label":"No Of Axles(front)",id:"ino_of_axles_front",inputFormat:"integer"}),
			plf.addText({"label":"Remarks",id:"remarks",inputFormat:"string",InputLength:"250"}),
			//plf.addCombo({"label":"Vehicle Location",id:"truckLocation"}),
			plf.addText({"label":"Year of Manufacture","id":"dtYearOfManufacture",inputFormat:"integer",InputLength:"4"}),
			plf.addListEdit({"label":"Trailer Description ","id":"strTrailerDescription",
			listeners: {
                     beforequery: function(record) {
                         record.query = new RegExp(record.query, 'i');
                         record.forceAll = true;
                         return true;
                     },
					render : function(cmp) {
                                    cmp.getEl().on('keypress', function(e) {
                                        if (e.getKey() == e.ENTER) {
											mainpage.queryById("methodName").setValue("onchangeTrailerDescTS");
											process_ebpack_service(mainpage,["strTrailerDescription"],"CoreTruckService");
                                        }
                                    });
                                }
                 }
			}),
			plf.addHlpText({"label":"Trailer Code",id:"strTrailerCode",hlpLinkID:"trailercode",inputFormat:"string",InputLength:"40"},this),		
			plf.addCombo({"label":"Vehicle Availability",id:"strVehicleAvailability","mandatory":"true"}),
			//plf.addBlank(),
			//plf.addText({"label":"Vehicle Photo",id:"truckPhoto"}),
			//plf.addText({"label":"Barcode",id:"barCode"}),
			//plf.addCheckBox({"label":"Tracking Available","id":"trackingAvailable"})
			//plf.addButton({"label":"Submit","id":"btnSubmit"})
			plf.addHlpText({"label":"Carrier Code",id:"strTruckOwnerCode","mandatory":"true",hlpLinkID:"truckownercode",inputFormat:"string",InputLength:"40"},this),
			plf.addListEdit({"label":"Carrier Name",id:"strTruckOwnerName"}),
			plf.addHlpText({"label":"Base Location",id:"strLocCode","mandatory":"true",hlpLinkID:"baseloc",inputFormat:"string",InputLength:"40"},this),
            //plf.addDisplayOnly({"label":"3PL Owner Phone No",id:"3PLOwnerPhoneNo"}),
			plf.addText({"label":"Contract No",id:"strContractNum",inputFormat:"string",InputLength:"15"}),
			plf.addText({"label":"Contract Holder Name",id:"strContractHolderName",inputFormat:"string"}),
			plf.addText({"label":"Contact No",id:"strContractContactNum",inputFormat:"string",InputLength:"50"}) ,// 73727 
			plf.addCombo({"label":"Smartphone Available",id:"strSmartphoneAvailable"}),
			plf.addCombo({"label":"Phone OS",id:"strPhoneOS"}) ,
			plf.addText({"label":"OS Version",id:"strOSVersion",inputFormat:"string",InputLength:"100"}),
            plf.addCombo({"label":"RFID Validation",id:"strRFIDValidation"})			
		]
		
		truckMasterColumn.add(truckMasterFormCtrl);
		//truckMasterColumn.add(plf.addStripLine({}));
		
		truckQrCode = plf.addColumnSection({columnWidth:.15});	
		plf.columns=4
		var truckQrCodeCtrl=				//69995
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
		var configFieldsetFormCtrl=				//69995
		[
			plf.addText({"label":"Length (m)",id:"iTruckLength","width":"50",inputFormat:"numeric",weightPrecision:2}),
     		plf.addText({"label":"Width (m)",id:"iTruckWidth","width":"50",inputFormat:"numeric",weightPrecision:2}),
			plf.addText({"label":"Bed Height (m)",id:"iBedHeight","width":"50",inputFormat:"numeric",weightPrecision:2}),
			plf.addText({"label":"Head Height (m)",id:"iHeadHeight","width":"50",inputFormat:"numeric",weightPrecision:2}),			
			plf.addText({"label":"Tare Weight (ton)",id:"iTareWeight","width":"50",inputFormat:"numeric",weightPrecision:2}),
			plf.addText({"label":"Pay Load Weight (ton)",id:"iPayLoadWeight","width":"50",inputFormat:"numeric","mandatory":"true",weightPrecision:2}),
			//plf.addText({"label":"Gross Comb Weight (ton)",id:"iTruckGcw","width":"50",inputFormat:"numeric",weightPrecision:2}),
			plf.addText({"label":"Gross Weight (ton)",id:"iTruckGcw"}),
			plf.addText({"label":"Volume (cu.m)",id:"iTruckVolume","width":"50",inputFormat:"numeric",weightPrecision:3})
		]
		
		configurationFieldset.add(configFieldsetFormCtrl);
		//Configuration Fieldset Ends
		
		//Stenciled Tyre Pressure in PSI Begins
		var StenciledTyrePressure = plf.addColumnSection({title:"Stenciled Tyre Pressure in PSI"});
		plf.columns=4
		var StenciledTyrePressureFormCtrl=		
		[
			plf.addText({"label":"Driver Side",id:"iDriverSide",inputFormat:"integer",InputLength:"3"}),
			plf.addText({"label":"Passenger Side",id:"iPassengerSide",inputFormat:"integer",InputLength:"3"})
		]
		
		StenciledTyrePressure.add(StenciledTyrePressureFormCtrl);
		//Stenciled Tyre Pressure in PSI Ends
		
		//'Activate / Inactivate Reason Begins
		var ActivateInactivateReason = plf.addColumnSection({title:"Activate/Inactivate/Archive Reason"});
		plf.columns=2
		var ActivateInactivateReasonFormCtrl=		
		[
			plf.addTextArea({"label":"Reason for Action",id:"starReasonAction",inputFormat:"string",InputLength:"4000"}),
			plf.addCustomFileUpload({"label":"Upload Document",id:"strUploadDoc",Entity:"Service/Doc_Attachment",Path:"app"}),
			plf.addBlank(), 
			plf.addBlank()
		]
		
		ActivateInactivateReason.add(ActivateInactivateReasonFormCtrl);
		//'Activate / Inactivate Reason Ends
		
		/*
		capacityFieldset = plf.addFieldSet({title:"Capacity",});
		capacityFieldsetFormCtrl=
		[
			//plf.addText({"label":"Volume",id:"iTruckVolume"}),
			//plf.addCombo({"label":"Uom",id:"iTruckVolumeUom"}),
			plf.addFieldContainer({"label":"Volume",
				"controls":[
					plf.addPlainText({id:"iTruckVolume","width":"50"}),
					plf.addPlainCombo({id:"iTruckVolumeUom","width":"70"})
				]	
			}),
			plf.addFieldContainer({"label":"Gross Combination Weight",
				"controls":[
					plf.addPlainText({id:"iTruckGcw","width":"50"}),
					plf.addPlainCombo({id:"iTruckGcwuom","width":"70"})
				]	
			}),
			
			//plf.addText({"label":"Gross Combination Weight",id:"iTruckGcw"}),
			//plf.addCombo({"label":"Uom",id:"iTruckGcwuom"}),
			plf.addFieldContainer({"label":"Tare Weight",
				"controls":[
					plf.addPlainText({id:"iTareWeight","width":"50"}),
					plf.addPlainCombo({id:"iTareWeightUom","width":"70"})
				]	
			}),
			plf.addFieldContainer({"label":"Pay Load Weight",
				"controls":[
					plf.addPlainText({id:"iPayLoadWeight","width":"50"}),
					plf.addPlainCombo({id:"iPayLoadWeightUom","width":"70"})
				]	
			}),
			plf.addFieldContainer({"label":"Vehicle Speed",
				"controls":[
					plf.addPlainText({id:"iSpeed","width":"50"}),
					plf.addPlainCombo({id:"iSpeedUom","width":"70"})
				]	
			}),
            //plf.addText({"label":"Tare Weight",id:"iTareWeight"}),
			//plf.addCombo({"label":"Uom",id:"iTareWeightUom"}),
		//	plf.addText({"label":"Payload Weight",id:"iPayLoadWeight"}),
		//	plf.addCombo({"label":"Uom",id:"iPayLoadWeightUom"})
			
		]
		capacityFieldset.add(capacityFieldsetFormCtrl);
		*/
		//Capacity Fieldset Ends
		
		
		//3PL Fieldset Begins
		/*PLFieldset = plf.addFieldSet({title:"3PL Owner",});
		PLFieldsetFormCtrl=
		[
			
			plf.addHlpText({"label":"3PL Owner Code",id:"strTruckOwnerCode","mandatory":"true",hlpLinkID:"truckownercode"},this),
			plf.addDisplayOnly({"label":"3PL Owner Name",id:"strTruckOwnerName"}),
			plf.addDisplayOnly({"label":"3PL Owner Phone No",id:"3PLOwnerPhoneNo"}),
			
		]
		PLFieldset.add(PLFieldsetFormCtrl);
		PLFieldset.add(plf.addStripLine({}));*/
		//3PL Fieldset Ends	
		
		//IVMS Fieldset Begins
	/*	ivmsFieldset = plf.addFieldSet({title:"IVMS",});
		ivmsFieldsetFormCtrl=
		[
			plf.addText({"label":"IVMS Supplier Code",id:"strIvmsVendor"}),
			plf.addDisplayOnly({"label":"IVMS Supplier Name",id:"strIvmsVendorName"}),
			plf.addText({"label":"IVMS Box Id",id:"strIvmsBoxId"}),
			plf.addCheckBox({"label":"Tracking Available","id":"trackingAvailable"}),
		]*/
		//ivmsFieldset.add(ivmsFieldsetFormCtrl);
		//IVMS Fieldset Ends
		
		
		//Vehicle Document Mapping Page Begins
		//Vehicle Document Mapping Grid Section Begins
		var truckMapGridFieldObj=										//69995
		[
			{columnname:"SL No",dataname:"DOC_SLNO",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",editControl:"combo",width:150,storeId:"strInsType"},
			{columnname:"Document Number",dataname:"DOC_NO",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"40"},
			//{columnname:"Expiry Date",dataname:"EXPIRTY_DT",datatype:"date",width:150,editControl:"date"},
			{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:150,editControl:"textbox",inputFormat:"string",InputLength:"100"},
			//{columnname:"Inspector",dataname:"INSPECTOR_NAME",datatype:"string",width:150,editControl:"textbox"},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"date",width:160,editControl:"date"},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"date",width:160,editControl:"date"},
		//	{columnname:"Attach Document",dataname:"ATTACHDOCUMENT",datatype:"string",width:150,editControl:"fileupload",fileGroup:"Vehicle\\Document",width:175}
		    {columnname:"File Name",dataname:"FILE_NAME",datatype:"string",width:150},			
			{columnname:"Attach Document",dataname:"ATTACHDOCUMENT",datatype:"string",editControl:"fileupload",fileGroup:"Driver/Documents",width:245,nameColumn:"FILE_NAME"}
		]
		var truckMapGridDtl=											//69995			
		{
			title:"",
			id:"truckDocGrid",
			detail:truckMapGridFieldObj
		}
		plf.columns=4
		var AllVehHdrCol = plf.addColumnSection({title:"Vehicle Document Details"});
		var truckMapGridSection = plf.addGrid(truckMapGridDtl,this)
		AllVehHdrCol.add(truckMapGridSection)	
        
			
		////var passRefDocDtl =  plf.addCollapseSection({title:"Vehicle Document Details",collapsed:false})
											//69995		
		////passRefDocDtl.add(truckMapGridSection)
		//truckMasterCommonColumn.add(truckMapGridSection)
		//truckMasterCommonColumn.add(plf.addStripLine({}));
		//Vehicle Document Mapping Grid Section Ends
		//Vehicle Document Mapping Page Ends
		
		//Vehicle IVMS Mapping Page Begins
		//Vehicle IVMS Mapping Grid Section Begins
		truckIvmsMapGridFieldObj=
		[
			{columnname:"SL No",dataname:"IVMS_SLNO",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"IVMS Supplier Code",dataname:"IVMS_VENDOR_CODE",datatype:"string",editControl:"textbox",width:150,helpid:'supplierCode',"onenter":"SUPPLIER_CODE_ONENTER"},
			{columnname:"IVMS Supplier Name",dataname:"SUPPLIER_NAME",datatype:"string",width:250},
			{columnname:"IVMS Device ID",dataname:"IVMS_BOXID",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"40"},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"date",width:150,editControl:"date"},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"date",width:150,editControl:"date"}
		]
		truckIvmsMapGridDtl=
		{
			title:"Vehicle IVMS Mapping",
			id:"ivmsGrid",
			detail:truckIvmsMapGridFieldObj
		}
		
		plf.columns=4
		var AllVehIVMSHdrCol = plf.addColumnSection({title:"IVMS Mapping"});
		var truckIvmsMapGridSection = plf.addGrid(truckIvmsMapGridDtl,this)	
		AllVehIVMSHdrCol.add(truckIvmsMapGridSection)	
        
		
		
		//Vehicle IVMS Mapping Grid Section Ends
		//Vehicle VMS Mapping Page Ends
		/*73395 changes*/
              var VehLocDtlCacheObj=
		[
			{columnname:"Location Code",dataname:"LOC_CODE",datatype:"string",width:150,editControl:"textbox",helpid:'Location'},
			{columnname:"Location Name",dataname:"LOC_NAME",datatype:"string",width:150,editControl:"addDisplayOnly"},
            {columnname:"Region",dataname:"REGION",datatype:"string",width:200,editControl:"addDisplayOnly"}			
			
		]
		var VehLocGridDtl=									
		{
			title:"Vehicle Service Location",
			id:"VehLocDtlCache",
			detail:VehLocDtlCacheObj,
			

		}
		plf.columns=4
		var AllVehLocHdrCol = plf.addColumnSection({title:"Service Location Mapping"});
		var VehLocGridSection = plf.addGrid(VehLocGridDtl,this)
		AllVehLocHdrCol.add(VehLocGridSection)	
        
		var changeHistory=
		[
			{columnname:"Contract No",dataname:"CONT_NO",datatype:"string",width:150},
			{columnname:"From Status",dataname:"CHANGE_STATUS",datatype:"string",width:150},
			{columnname:"Reason for Action",dataname:"REASON_FOR_ACTION",datatype:"string",width:150,editControl:"addDisplayOnly"},
			//{columnname:"Uploaded Document",dataname:"UPLOADED_DOCUMENT",datatype:"string",width:150},
			{columnname:"Uploaded Document",dataname:"UPLOADED_DOCUMENT",datatype:"string",linkId:"DOWN_LINKID","tooltip":"Click here to download",type:"filedownload",fileGroup:"Service/Doc_Attachment",width:"auto"},
			{columnname:"Modified By",dataname:"MODIFIED_BY",datatype:"string",width:150,editControl:"addDisplayOnly"},
            {columnname:"Modified Date",dataname:"MODIFIED_DATE",datatype:"string",width:200,editControl:"addDisplayOnly"}			
			
		]
		var changeHistoryGridDtl=									
		{
			title:"",
			id:"ChangeHistory",
			detail:changeHistory,
			visibleRow:7,
			removeAddDelete:true,
			removePaging:true
			}		
		var HistoryCol = plf.addCollapseSection({title:"Change History"});
		var HistoryGridSection = plf.addGrid(changeHistoryGridDtl,this)
		HistoryCol.add(HistoryGridSection)
		
		/*73395 changes ends*/
		
	   //Tyre Management Grid Section Begins
		var tyreDetailsGridFieldObj=
		[
			{columnname:"Field Name",dataname:"FIELD_NAME",datatype:"string",width:130,/*editControl:"combo",*/storeId:"strFieldName",editControl:"addDisplayOnly"},
			{columnname:"Serial #",dataname:"VALUE_CODE",datatype:"string",width:100,editControl:"textbox",InputLength:"100"},
			{columnname:"RFID #",dataname:"RFID",datatype:"string",width:100,editControl:"textbox",InputLength:"100"},
			
			{columnname:"Supplier",dataname:"SUPPLIER",datatype:"string",width:130},
			{columnname:"RFID Date",dataname:"RFID_DATE",datatype:"string",width:130},
			{columnname:"RFID Action By",dataname:"RFID_ACTION_BY",datatype:"string",width:130},
			{columnname:"Tyre Brand",dataname:"TYRE_BRAND",datatype:"string",width:130},
			
			{columnname:"Tyre Size",dataname:"TYRE_SIZE",datatype:"string",width:130},
			{columnname:"Pattern",dataname:"PATTERN",datatype:"string",width:130},
			{columnname:"LI/SS",dataname:"LI_SS",datatype:"string",width:130},
			{columnname:"DOT",dataname:"DOT",datatype:"string",width:130},
			{columnname:"Inflation Pressure (PSI)",dataname:"INFLATION_PRESSURE_PSI",datatype:"string",width:160,colAlign:'center'},
			{columnname:"Load per Tyre(Kg)- Single Axle",dataname:"LOAD_PER_TYRE_KG_SINGLE_AXLE",datatype:"string",width:220,colAlign:'center'},
			{columnname:"Load per Tyre(Kg)- Dual Axle",dataname:"LOAD_PER_TYRE_KG_DUAL_AXLE",datatype:"string",width:200,colAlign:'center'},
			
			{columnname:"Speed Symbol(SS) Km/Hr",dataname:"SPEED_SYMBOL_KM_HR",datatype:"string",width:165,colAlign:'center'},
			{columnname:"Fitment Action By",dataname:"FITMENT_ACTION_BY",datatype:"string",width:130},
			{columnname:"Fitment Date",dataname:"FITMENT_DATE",datatype:"string",width:130},
			{columnname:"Fitment Initial(Km)",dataname:"FITMENT_INITIAL_KM",datatype:"string",width:130,colAlign:'center'},
			//{columnname:"Fitment Position",dataname:"FITMENT_POSITION",datatype:"string",width:130},
			{columnname:"Installation Remarks",dataname:"INSTALLATION_REMARKS",datatype:"string",width:200}
			
		]
		var tyreDetailsGridDtl=
		{
			title:"",
			id:"tyreDetailsDtl",
			detail:tyreDetailsGridFieldObj,
			visibleRow:5,
			removeAddDelete:true,
			readonly:true
		}
		
		plf.columns=4
		var tyreDetailsHdrCol = plf.addColumnSection({id:"TyreDetailsTab",title:"Tyre Details"});
		var tyreDetailsGridSection = plf.addGrid(tyreDetailsGridDtl,this)	
		tyreDetailsHdrCol.add(tyreDetailsGridSection)	
        
		//Tyre Management Grid Section Begins

		//Add Child Sections
	//	mainpage.ptrMainSection.add(driverFileUploadSection) //Add Header Section to Main Page
		mainpage.ptrMainSection.add(tmpSection)//Add Header Section to Main Page
		
		mainpage.ptrMainSection.add(configurationFieldset)//Add Configuration Field set to Main Page
		mainpage.ptrMainSection.add(StenciledTyrePressure)//Add StenciledTyrePressure to Main Page 
		mainpage.ptrMainSection.add(ActivateInactivateReason)//Add Activate/Inactivate Reason to Main Page 
		//mainpage.ptrMainSection.add(capacityFieldset)//Add capacity Field set to Main Page
		//mainpage.ptrMainSection.add(PLFieldset)//Add 3PL Field set to Main Page
		//mainpage.ptrMainSection.add(ivmsFieldset)//Add IVMS Field set to Main Page
	    //mainpage.ptrMainSection.add(truckMasterCommonColumn)
		//mainpage.ptrMainSection.add(truckMapGridSection) //Add Grid Section to Main Page
		
		//mainpage.ptrMainSection.add(truckIvmsMapGridSection) //Add Grid Section to Main Page
		//mainpage.ptrMainSection.add(passRefDocDtl)
              //mainpage.ptrMainSection.add(VehLocGridSection)
		/*73395 changes*/	  
		var baseTab = plf.addTabSection({ tabs:[
												AllVehHdrCol,AllVehIVMSHdrCol,AllVehLocHdrCol,HistoryCol,tyreDetailsHdrCol/*,
												scheduleServiceSection,scheduleAllocServiceToTripSection,
												scheduleServiceToTripSection*/
												]});

		
		//History Data Section
		mainpage.ptrMainSection.add(baseTab) 
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
				
				{
					"controlid":"strTruckCode",
					"tasktype":"onenter",
					"input":["strTruckCode","strSmartphoneAvailable"],
					"service":"CoreTruckService",
					"methodName":"fetchTruckDetailsTS"
				},		
				{
					"controlid":"strTruckOwnerCode",
					"tasktype":"onenter",
					"input":["strTruckOwnerCode"],
					"service":"CoreTruckService",
					"methodName":"fetchTruckOwnerNameTS"
				},		
				/*
				{
					"controlid":"strIvmsVendor",
					"tasktype":"onenter",
					"input":["strIvmsVendor"],
					"service":"CoreTruckService",
					"methodName":"fetchIVMSVendorNameTS"
				},	
				*/

				{
				"controlid":"",
				"tasktype":"onload",
				"input":["strTruckCode","strSmartphoneAvailable"],
				"service":"CoreTruckService",
				"methodName":"initTruckMasterScrTS"
				},				
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strTruckCode","strTruckDesc","strVehicleRegno","strTruckType","strTruckSubtype","strTruckCategory",
				"strTruckMake","ino_of_axles_front","ino_of_axles_rear","iPower","iPowerUom","iTorque","iTorqueUom",
				"iTruckLength","iTruckLengthUom","iTruckWidth","iTruckWidthUom","iTruckHeight","iTruckHeightUom",
				"iTruckGcw","iTruckGcwuom","iTareWeight","iTareWeightUom","iPayLoadWeight","iPayLoadWeightUom",
				"iTruckVolume","iTruckVolumeUom","strTruckOwnerCode","dtYearOfManufacture","ivmsGrid","truckDocGrid","iSpeed","iSpeedUom","strTrailerCode",
				"strTrailerDescription","strAvailabilityStatus","iBedHeight","iBedHeightUom","iHeadHeight","iHeadHeightUom","strPhoto",
				"strVehicleAvailability","strLocCode","strContractNum","strContractHolderName","strContractContactNum","VehLocDtlCache","trailerMappingDtl","VehicleCatMappingDtl","iDriverSide","iPassengerSide","starReasonAction","strUploadDoc","strSmartphoneAvailable","strPhoneOS","strOSVersion",
				"strRFIDValidation"],//73395
				"service":"CoreTruckService",
				"methodName":"createTruckTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strTruckCode","strTruckDesc","strVehicleRegno","strTruckType","strTruckSubtype","strTruckCategory","strTruckMake","ino_of_axles_front",
				"ino_of_axles_rear","iPower","iPowerUom","iTorque","iTorqueUom","iTruckLength","iTruckLengthUom","iTruckWidth","iTruckWidthUom","iTruckHeight","dtYearOfManufacture",
				"iTruckHeightUom","iTruckGcw","iTruckGcwuom","iTareWeight","iTareWeightUom","iPayLoadWeight","iPayLoadWeightUom","iTruckVolume","iTruckVolumeUom",
				"strTruckOwnerCode","truckDocGrid","ivmsGrid","strTrailerCode","strTrailerDescription","strAvailabilityStatus","iBedHeight","iBedHeightUom","iHeadHeight","iHeadHeightUom",
                            "strPhoto","strVehicleAvailability","strLocCode","strContractNum","strContractHolderName","strContractContactNum","VehLocDtlCache","trailerMappingDtl","VehicleCatMappingDtl","iDriverSide","iPassengerSide","starReasonAction","strUploadDoc","strSmartphoneAvailable","strPhoneOS","strOSVersion",
							"strRFIDValidation"],//73395
				"service":"CoreTruckService",
				"methodName":"modifyTruckTS"
				},
					
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strTruckCode","strTruckDesc","strVehicleRegno","strTruckType","strTruckSubtype","strTruckCategory",
				"strTruckMake","ino_of_axles_front","ino_of_axles_rear","iPower","iPowerUom","iTorque","iTorqueUom",
				"iTruckLength","iTruckLengthUom","iTruckWidth","iTruckWidthUom","iTruckHeight","iTruckHeightUom",
				"iTruckGcw","iTruckGcwuom","iTareWeight","iTareWeightUom","iPayLoadWeight","iPayLoadWeightUom",
				"iTruckVolume","iTruckVolumeUom","strTruckOwnerCode","dtYearOfManufacture","ivmsGrid","truckDocGrid","iSpeed","iSpeedUom","strTrailerCode",
				"strTrailerDescription","strAvailabilityStatus","iBedHeight","iBedHeightUom","iHeadHeight","iHeadHeightUom","strPhoto",
				"strVehicleAvailability","strLocCode","strContractNum","strContractHolderName","strContractContactNum","VehLocDtlCache","trailerMappingDtl",
				"VehicleCatMappingDtl","iDriverSide","iPassengerSide","starReasonAction","strUploadDoc","strStatus","strSmartphoneAvailable","strPhoneOS",
				"strOSVersion","strRFIDValidation"],//73395
				"service":"CoreTruckService",
				"methodName":"activateTruckTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strTruckCode","strContractNum","starReasonAction","strStatus","strUploadDoc"],
				"service":"CoreTruckService",
				"methodName":"inactivateTruckTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Archive",
				"input":["strTruckCode","strContractNum","starReasonAction","strStatus","strUploadDoc"],
				"service":"CoreTruckService",
				"methodName":"ArchiveTruckTS"
				},
				{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strTruckCode"],
				"service":"CoreTruckService",
				"methodName":"deleteTruckTS"
				},
				{
				"controlid":"strTrailerCode",
				"tasktype":"onenter",
				"input":["strTrailerCode"],
				"service":"CoreTruckService",
				"methodName":"fetchTrailerDetailsTS"
				},
				{
				"grideventid":"SUPPLIER_CODE_ONENTER",
				"tasktype":"gridonenter",
				"input":["IVMS_VENDOR_CODE"],
				"service":"CoreTruckService",
				"methodName":"fetchSupplierCodeTS"
				},
				{
					"controlid":"strTruckCategory",
					"tasktype":"onchange",
					"input":["strTruckCategory"],
					"service":"CoreTruckService",
					"methodName":"onchangeVehicleCategoryParamScrTS"
				},
			
				{
					"controlid":"strTrailerDescription",
					"tasktype":"onchange",
					"input":["strTrailerDescription"],
					"service":"CoreTruckService",
					"methodName":"onchangeTrailerDescTS"
				},
              /*75263*/
			  {
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print",
				"input":["strTruckCode"],
				"service":"CoreReportService",
				"methodName":"PrintQRCodeVehicleReport"
				},
                {
					"controlid":"strSmartphoneAvailable",
					"tasktype":"onchange",
					"input":["strSmartphoneAvailable"],
					"service":"CoreTruckService",
					"methodName":"onchangeSmartphAvailable"
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
				},
				"truckownercode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"CARRIER_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strTruckOwnerCode","child":"OWNER_CODE_3PL"}

							//{"parent":"strTruckOwnerName","child":"OWNER_NAME_3PL"},
							//{"parent":"3PLOwnerPhoneNo","child":"PHONE1"}
							]
				},
				"trailercode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TrailerHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTrailerCode","child":"TRUCK_CODE"},
							{"parent":"strTrailerDescription","child":"TRUCK_DESC"}
							]
				},
				
			"supplierCode":
				{
					"hlpType":"grid",
					"gridID":"ivmsGrid",
					"hlpScreen":"jm_master.SupplierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
					{"parent":"IVMS_VENDOR_CODE","child":"SUPPLIER_CODE"},
					{"parent":"SUPPLIER_NAME", "child":"SUPPLIER_NAME"}
							]
				},
                      "baseloc":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"LOCATION_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"strLocCode","child":"LOC_NAME"}
						    ]
				},
                       //73395 changes
                     "Location":
				{
					"hlpType":"grid",
					"gridID":"VehLocDtlCache",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
					        {"parent":"","child":""}
						],
					"receive":[
					           {"parent":"LOC_CODE","child":"LOC_CODE"},
                                              {"parent":"LOC_NAME","child":"LOC_NAME"},
                                              {"parent":"REGION","child":"REGION"}

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
		//Generate Screen Section
	//	mainpage.generateScreen();
		
		
	/*	Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	}
});