/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable	
1.0.2       Steffie	        09-Dec-2016                          
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.ViolationMaster', 
{
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Violation Consequence Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
	
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a violation."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a violation."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a violation."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a violation."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a violation."
            }
            ]
		//Add Keyfields
		mainpage.keyFields=["violationCode"]
		
		//Violation Header Section Starts

		plf.columns=4
		var violationHdrColumn = plf.addColumnSection({title:""});			//69995
		var violationFormCtrl=												//69995	
		[
			plf.addHlpText({"label":"Violation Code",id:"strViolationCode","mandatory":"true",hlpLinkID:"Vlno",InputLength:"40",inputFormat:"string"},this),
			plf.addText({"label":"Violation Name",id:"strViolationDesc","mandatory":"true"}),
			plf.addCombo({"label":"Violation Type",id:"strViolationType","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addDate({"label":"Effective From",id:"dtEffectiveFrom","mandatory":"true"}),
			plf.addDate({"label":"Effective To",id:"dtEffectiveTo","mandatory":"true"}),
			plf.addText({"label":"Remarks",id:"strRemarks",InputLength:"250",inputFormat:"string"})
                    
		]
		
		violationHdrColumn.add(violationFormCtrl);
		//Violation Header Section Ends
		
		//Violation Footer Section starts

		/*plf.columns=2
		violationFtrColumn = plf.addColumnSection({title:""});
		
		
		violationFtrFormCtrl=
		[
			plf.addDisplayOnly({"label":"Created By",id:"strCreatedBy"}),
			plf.addDisplayOnly({"label":"Modified By",id:"dtModifiedBy"}),
			plf.addDisplayOnly({"label":"Created Date",id:"dtCreatedDate"}),
			plf.addDisplayOnly({"label":"Modified Date",id:"dtModifiedDate"})
			
		]
		
		violationFtrColumn.add(violationFtrFormCtrl);*/
		//Violation Footer Section Ends
		
		
		//Violation Grid Section Begins
		var ViolationGridFieldObj=									//69995
		[
		{columnname:"Seq No",dataname:"VOL_SLNO",datatype:"string",editControl:"textbox",width:150,hidden:true},
			{columnname:"Occurrence Frequency",dataname:"OCCURANCE_FREQUENCY",datatype:"string",storeId:"strFrequency",editControl:"combo",width:300},
			{columnname:"Consequence For",dataname:"CONSEQUENCE_FOR",datatype:"string",storeId:"strConseqFor",editControl:"combo",width:300},      /*09-Dec-2016 changes*/
			{columnname:"Consequence Action",dataname:"CONSEQUENCE",datatype:"string",storeId:"strConsequence",editControl:"combo",width:300},      
			{columnname:"Validity(days)",dataname:"VALIDITY_IN_MONTHS",datatype:"string",editControl:"textbox",width:300,inputFormat:"integer"}
			
		]
		var ViolationGridDtl=										//69995	
		{
			title:"Consequence Details",
			id:"violationDtl",
			visibleRow:plf.searchVisibleRows,
			detail:ViolationGridFieldObj
		}
		var violationGridSection = plf.addGrid(ViolationGridDtl)	//69995
		//Violation Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(violationHdrColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(violationGridSection) //Add Grid Section to Main Page
		//mainpage.ptrMainSection.add(violationFtrColumn)//Add Footer Section to Main Page
		//History Data Section
		//mainpage.data_his_sec_flag=true;
			mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
				mainpage.eventHandlers = 
			[
				{
					"controlid":"",
					"tasktype":"onload",
					"input":["strViolationCode"],
					"service":"CoreViolationService",
					"methodName":"initViolationMSTS"
				},		
				{
					"controlid":"strViolationCode",
					"tasktype":"onenter",
					"input":["strViolationCode"],
					"service":"CoreViolationService",
					"methodName":"fetchViolationTS"
				},						
				{
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Create",
				"input":["dtEffectiveFrom","strViolationCode","strViolationDesc","strViolationType","strStatus","dtEffectiveTo","strRemarks","strCreatedBy","dtModifiedBy","dtCreatedDate","dtModifiedDate","strConsequence","strOccuranceFreq","strValidityInMnths","violationDtl"],
				"service":"CoreViolationService",
				"methodName":"createViolationTS"
				},
					{
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Edit",
				"input":["dtEffectiveFrom","strViolationCode","strViolationDesc","strViolationType","strStatus","dtEffectiveTo","strRemarks","strCreatedBy","dtModifiedBy","dtCreatedDate","dtModifiedDate","strConsequence","strOccuranceFreq","strValidityInMnths","violationDtl"],
				"service":"CoreViolationService",
				"methodName":"modifyViolationTS"
				},
				{
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Delete",
				"input":["dtEffectiveFrom","strViolationCode","strViolationDesc","strViolationType","strStatus","dtEffectiveTo","strRemarks","strCreatedBy","dtModifiedBy","dtCreatedDate","dtModifiedDate","strConsequence","strOccuranceFreq","strValidityInMnths","violationDtl"],
				"service":"CoreViolationService",
				"methodName":"deleteViolationTS"
				},
				{
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Activate",
				"input":["dtEffectiveFrom","strViolationCode","strViolationDesc","strViolationType","strStatus","dtEffectiveTo","strRemarks","strCreatedBy","dtModifiedBy","dtCreatedDate","dtModifiedDate","strConsequence","strOccuranceFreq","strValidityInMnths","violationDtl"],
				"service":"CoreViolationService",
				"methodName":"activateViolationTS"
				},
				{
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strViolationCode"],
				"service":"CoreViolationService",
				"methodName":"inactivateViolationTS"
				}
							//CoreViolationService
			];
			//Event Handlers Mapping Ends
		
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
				"except":["strViolationCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":["violationDtl","strViolationCode"]
			}			
		}
		mainpage.hlpLinks=
		{
			"Vlno":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.ViolationHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strViolationCode","child":"VIOLATION_CODE"},
							{"parent":"strViolationDesc","child":"VIOLATION_DESC"},
							{"parent":"strViolationType","child":"VIOLATION_TYPE"},
							{"parent":"dtEffectiveFrom","child":"EFFECTIVE_FROM"},
							{"parent":"dtEffectiveTo","child":"EFFECTIVE_TO"},
							{"parent":"strStatus","child":"STATUS"}
							
							]
				}
		}
		
		this.callParent(arguments);
		
	}
});
