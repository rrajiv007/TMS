	/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID		Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995			Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.DriverMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Driver Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a driver."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a driver."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a driver."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a driver."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a driver."
            },
			{
                "name": "Archive",
                "tooltip": "Click here to archive a driver."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strDriverCode"]
		
		driverFileUploadSection = plf.addColumnSection({});
		
		//Driver Master Section Begins
		plf.columns=3
		var driverMasterColumn = plf.addColumnSection({columnWidth:.85});			//69995
		//driverMasterColumn = plf.addColumnSection({});
		//driverMasterCommonColumn = plf.addColumnSection({});
        //DriverHdrFieldset1 = plf.addColumnSection({title:""});
		
		var driverMasterCtrl=					//69995
		[	
			plf.addHlpText({"label":"Driver Code",id:"strDriverCode","mandatory":"true",hlpLinkID:"driver",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Driver Name",id:"strDriverName","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"})
		]	
		driverMasterColumn.add(driverMasterCtrl);
		driverMasterColumn.add(plf.addStripLine({}));
		
		plf.columns=3
		var driverMasterColumn1 = plf.addColumnSection({columnWidth:.85});			//69995
		var driverMasterCtrl1=				//69995
		[	
		    plf.addText({"label":"Driver Phone No",id:"strDriverPhoneNo","mandatory":"true",inputFormat:"string",InputLength:"20"}),
			plf.addListEdit({"label":"Carrier Name",id:"str3plOwnerName",inputFormat:"string",InputLength:"100",keyField:"str3plOwnerCode"},this),
			plf.addHlpText({"label":"Carrier Code",id:"str3plOwnerCode","mandatory":"true",hlpLinkID:"3plowner"},this),
			plf.addCombo({"label":"Driver Type",id:"strDriverType"}),
			plf.addDisplayOnly({"label":"Availability Status",id:"strAvailabilityStatus"}),
			//plf.addCombo({"label":"Licence Type",id:"strLicenceType"}),
			//plf.addText({"label":"National Id",id:"strNationalityId","mandatory":"true"}),
			//plf.addText({"label":"IVMS Blue Key No",id:"strIvmsKeyNo","mandatory":"true"}),
			plf.addText({"label":"Nationality Id",id:"strNationalityId",inputFormat:"string",InputLength:"40"}),
			plf.addText({"label":"IVMS Blue Key No",id:"strIvmsKeyNo",inputFormat:"string",InputLength:"40"}),
			plf.addText({"label":"Contract No",id:"strContractNum",inputFormat:"string",InputLength:"100"}),
			plf.addText({"label":"Remarks",id:"strRemarks",inputFormat:"string",InputLength:"250"}),
			plf.addDate({"label":"Date of Birth",id:"dtDOB","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Age",id:"strAge"}),
			plf.addBlank({})
		]	
		driverMasterColumn1.add(driverMasterCtrl1);
		driverMasterColumn1.add(plf.addStripLine({}));
		
		driverUpload = plf.addColumnSection({columnWidth:.15});	
		plf.columns=8	
		var driverUploadCtrl=		//69995
		[		
			
			plf.addImageFileUpload({"label":"",id:"strPhoto",Entity:"Driver",Path:"app"})
		]
		driverUpload.add(driverUploadCtrl)
		//driverFileUploadSection.add(driverMasterColumn);
        driverFileUploadSection.add(driverMasterColumn1);		
		driverFileUploadSection.add(driverUploadCtrl);
		//Driver Master Header Section Ends
		//3PL Fieldset Begins
		/*
		PLFieldset = plf.addFieldSet({title:"3PL Owner",});
		PLFieldsetFormCtrl=
		[
			plf.addHlpText({"label":"3PL Owner Code",id:"str3plOwnerCode","mandatory":"true",hlpLinkID:"3plowner"},this),
			plf.addText({"label":"3PL Owner Name",id:"str3plOwnerName"})
		]
		PLFieldset.add(PLFieldsetFormCtrl);
		//3PL Fieldset Ends
		*/
		//Driver License Grid section starts
		driverlicGridFieldObj=
		[   
			{columnname:"SL No",dataname:"DOC_SLNO",datatype:"string",editControl:"textbox",width:140,hidden:true},
			{columnname:"Vehicle/Equipment<br>Category",dataname:"TRUCK_CATEGORY",datatype:"string",storeId:"strTruckCategory",editControl:"combo",width:250},
			{columnname:"Licence No",dataname:"LICENCE_NO",datatype:"string",editControl:"textbox",width:200},
			{columnname:"Issue Date",dataname:"ISSUE_DT",datatype:"date",width:200,editControl:"date"},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"date",width:200,editControl:"date"},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"date",width:150,editControl:"date"},
			//{columnname:"Attach Document",dataname:"ATTACH_DOCUMENT_LICENCE",datatype:"string",editControl:"fileupload",fileGroup:"Driver\\Licence",width:175}		
		]
		driverlicGridDtl=
		{
			title:"Driver Licence Mapping",
			id:"licenceMapping",
			detail:driverlicGridFieldObj,
		
		}
		driverlicGridSection = plf.addGrid(driverlicGridDtl,this)	
		
		
		
		
		//Driver License Grid section ends
		
		//Driver Document Mapping Grid Section Starts
		driverMapGridFieldObj=
		[   
			{columnname:"SL No",dataname:"DOC_SLNO",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",storeId:"strDocumentType",editControl:"combo",width:200},
			{columnname:"Document Number",dataname:"DOC_NO",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Issue Date",dataname:"ISSUE_DT",datatype:"string",width:150,editControl:"date"},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:150,editControl:"date"},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:150,editControl:"date"},
			//{columnname:"Attach Document",dataname:"ATTACH_DOCUMENT",datatype:"string",editControl:"fileupload",fileGroup:"Driver/Documents",width:245}
			{columnname:"File Name",dataname:"FILE_NAME",datatype:"string",width:200},			
			{columnname:"Attach Document",dataname:"ATTACH_DOCUMENT",datatype:"string",editControl:"fileupload",fileGroup:"Driver/Documents",width:140,nameColumn:"FILE_NAME"}
			
		]
		driverMapGridDtl=
		{
			title:"",
			id:"driverMapping",
			detail:driverMapGridFieldObj,
		
		}
		
		//Driver Document Mapping Grid Section Ends
		
		var passRefDocDtl =  plf.addCollapseSection({title:"Driver Document Mapping",collapsed:false})
		driverMapGridSection = plf.addGrid(driverMapGridDtl,this)	
		passRefDocDtl.add(driverMapGridSection)
		
		
		//'Activate / Inactivate/Archive Reason Begins
		ActivateInactivateReason = plf.addColumnSection({title:"Activate/Inactivate/Archive Reason"});
		plf.columns=2
		var ActivateInactivateReasonFormCtrl=		
		[
			plf.addTextArea({"label":"Reason for Action",id:"starReasonAction",inputFormat:"string",InputLength:"4000"}),
			plf.addCustomFileUpload({"label":"Upload Document",id:"strUploadDoc",Entity:"Service/Doc_Attachment",Path:"app"}),
			plf.addBlank(), 
			plf.addBlank()
		]
		
		ActivateInactivateReason.add(ActivateInactivateReasonFormCtrl);
		//'Activate / Inactivate/Archive Reason Ends
		
		var changeHistory=
		[		
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
			id:"driverHistory",
			detail:changeHistory,
			visibleRow:7,
			removeAddDelete:true,
			removePaging:true
			}		
		var HistoryCol = plf.addCollapseSection({title:"Change History",collapsed:true});
		var HistoryGridSection = plf.addGrid(changeHistoryGridDtl,this)
		HistoryCol.add(HistoryGridSection)
		
		//Add Child Sections
		
		
			//mainpage.ptrMainSection.add(driverFileUploadSection1) //Add Header Section to Main Page
		mainpage.ptrMainSection.add(driverMasterColumn) //Add Header Section to Main Page
		mainpage.ptrMainSection.add(driverFileUploadSection) //Add Header Section to Main Page
		//mainpage.ptrMainSection.add(PLFieldset)//Add 3PL Field set to Main Page
		mainpage.ptrMainSection.add(driverlicGridSection)  //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(passRefDocDtl)  //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(ActivateInactivateReason)//Add Activate/Inactivate Reason to Main Page
		mainpage.ptrMainSection.add(HistoryCol) 
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strDriverCode"],
				"service":"CoreDriveService",
				"methodName":"initDriverMasterScrTS"
			},	

			{
				"controlid":"strDriverCode",
				"tasktype":"onenter",
				"input":["strDriverCode"],
				"service":"CoreDriveService",
				"methodName":"fetchDriverDetailsTS"
			},	
		
		    {
				"controlid":"str3plOwnerCode",
				"tasktype":"onenter",
				"input":["str3plOwnerCode"],
				"service":"CoreDriveService",
				"methodName":"fetch3plOwnerNameTS"
			},	
			{
			
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"create",
				"input":["strDriverCode","strRemarks","strDriverName","strDriverPhoneNo","strDriverType","strLicenceType","strNationalityId",
				"strIvmsKeyNo","strCreatedBy","dtCreatedDate","str3plOwnerCode","str3plOwnerName","strDocumentType","strDocumentNo","dtIssueDate",
				"dtExpiryDate","dtEffectiveFrom","dtEffectiveTo","strPhoto","driverMapping","licenceMapping","strContractNum","dtDOB","starReasonAction","strUploadDoc"],
				"service":"CoreDriveService",
				"methodName":"createDriverTS"
				},
			
			{
			   
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"edit",
				"input":["strDriverCode","strRemarks","strDriverName","strDriverPhoneNo","strDriverType","strLicenceType","strNationalityId",
				"strIvmsKeyNo","strModifiedBy","dtModifiedDate","str3plOwnerCode","str3plOwnerName","strDocumentType","strDocumentNo","dtIssueDate",
				"dtExpiryDate","dtEffectiveFrom","dtEffectiveTo","strPhoto","driverMapping","licenceMapping","strContractNum","dtDOB","starReasonAction","strUploadDoc"],
				"service":"CoreDriveService",
				"methodName":"modifyDriverTS"
				},
			{
			    
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"delete",
				"input":["strDriverCode"],
				"service":"CoreDriveService",
				"methodName":"deleteDriverTS"
				},
			{
			    
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"activate",
				"input":["strDriverCode","strRemarks","strDriverName","strDriverPhoneNo","strDriverType","strLicenceType","strNationalityId","strIvmsKeyNo",
				"strModifiedBy","dtModifiedDate","str3plOwnerCode","str3plOwnerName","strDocumentType","strDocumentNo","dtIssueDate","dtExpiryDate",
				"dtEffectiveFrom","dtEffectiveTo","strPhoto","driverMapping","licenceMapping","strContractNum","dtDOB","starReasonAction","strUploadDoc"],
				"service":"CoreDriveService",
				"methodName":"activateDriverTS"
				},
			{
			 
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"inactivate",
				"input":["strDriverCode","strRemarks","strDriverName","strDriverPhoneNo","strDriverType","strLicenceType","strNationalityId","strIvmsKeyNo",
				"strModifiedBy","dtModifiedDate","str3plOwnerCode","str3plOwnerName","strDocumentType","strDocumentNo","dtIssueDate","dtExpiryDate",
				"dtEffectiveFrom","dtEffectiveTo","strPhoto","driverMapping","licenceMapping","strContractNum","starReasonAction","strUploadDoc"],
				"service":"CoreDriveService",
				"methodName":"inactivateDriverTS"
				}	,
               {
			 
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Archive",
				"input":["strDriverCode","strRemarks","strDriverName","strDriverPhoneNo","strDriverType","strLicenceType","strNationalityId","strIvmsKeyNo",
				"strModifiedBy","dtModifiedDate","str3plOwnerCode","str3plOwnerName","strDocumentType","strDocumentNo","dtIssueDate","dtExpiryDate",
				"dtEffectiveFrom","dtEffectiveTo","strPhoto","driverMapping","licenceMapping","strContractNum","starReasonAction","strUploadDoc"],
				"service":"CoreDriveService",
				"methodName":"ArchiveDriverTS"
				}				
		];
		//Event Handlers Mapping Ends
		mainpage.hlpLinks=
		{
		"driver":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strDriverCode","child":"DRIVER_CODE"}
							]
				},
				"3plowner":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""},
							{"direct":"CARRIER_AC","child":"strContext"}
						   ],
					"receive":[
							{"parent":"str3plOwnerCode","child":"OWNER_CODE_3PL"},
							{"parent":"str3plOwnerName","child":"OWNER_NAME_3PL"}
							]
				}
		}
		
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
				"except":["strDriverCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strDriverPhoneNo","strNationalityId","strIvmsKeyNo","strRemarks","driverMapping","licenceMapping"]
			}	
		}

			
		//Generate Screen Section
		/*mainpage.generateScreen();
		
		
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
		
	}
});