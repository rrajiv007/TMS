/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1														                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	            Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.ConstraintMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
		initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Constraint Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			
			{"name":"Constraint Mapping","linkid":"jm_ConstraintMapping","tooltip":"Click here to create a constraint maping."}
			
		]
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a constraint."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a constraint."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a constraint."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a constraint."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a constraint."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strConstraintCode"]
		
		//ConstraintMaster Header Section Begins
		plf.columns=3
		var constraintMasterColumn = plf.addColumnSection({});		//69995
		var constraintMstrCtrl=										//69995		
		[
			/*Help Screen*/
			//plf.addText({"label":"Constraint Code",id:"strConstraintCode","mandatory":"true"}),
			plf.addHlpText({"label":"Constraint Code","id":"strConstraintCode","mandatory":"true",hlpLinkID:"constraintcode",inputFormat:"string",InputLength:"40"},this),
		   /*Help Screen*/
			plf.addText({"label":"Constraint Desc",id:"strConstraintDesc","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			/*
			plf.addText({"label":"Start Time","mandatory":"true",id:"strStartTime"}),
			plf.addText({"label":"End Time","mandatory":"true",id:"strEndTime"}),
			plf.addText({"label":"Continuous Driving Time (hrs)","mandatory":"true",id:"iContinuousDriving",inputFormat:"numeric",InputPrecision:"2"}),
			plf.addText({"label":"Maximum Driving Time (Hrs)","mandatory":"true",id:"iMaximumDriving",inputFormat:"numeric",InputPrecision:"2"})
			 //lf.addButton({"label":"Submit","id":"btnSubmit"})
			*/
		]
		constraintMasterColumn.add(constraintMstrCtrl);
		//ConstraintMaster Header Section Ends
		plf.columns=1
		var constraintMstColumn = plf.addColumnSection({columnWidth:.275,title:"Time Details"});		//69995
		var constMstrCtrl=																				//69995			
		[
		    plf.addTime({"label":"Start Time",id:"strStartTime","mandatory":"true"}),
			//plf.addTime({"label":"Start Time","mandatory":"true",id:"strStartTime"}),
			plf.addTime({"label":"End Time",id:"strEndTime","mandatory":"true"}),
			plf.addText({"label":"Continuous Driving","mandatory":"true",id:"iContinuousDriving",inputFormat:"numeric",InputPrecision:"2"}),
			plf.addText({"label":"Maximum Driving","mandatory":"true",id:"iMaximumDriving",inputFormat:"numeric",InputPrecision:"2"})
		]
		constraintMstColumn.add(constMstrCtrl);
		
		//ConstraintMaster Grid Section Begins
		var constraintFieldObj=				//69995
		[
			{columnname:"Seq No",dataname:"SEQ_NO",datatype:"string",editControl:"textbox",width:150,hidden:true},	
            {columnname:"From Time(hh:mm)",dataname:"FROM_TIME",datatype:"string",width:150,storeId:"FROM_TIME",editControl:"textbox"},	
			{columnname:"To Time(hh:mm)",dataname:"TO_TIME",datatype:"string",width:150,storeId:"TO_TIME",editControl:"textbox"},
			//{columnname:"From Time(hh:mm)",dataname:"FROM_TIME",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"5"},
			//{columnname:"To Time(hh:mm)",dataname:"TO_TIME",datatype:"string",editControl:"textbox",width:150,inputFormat:"string",InputLength:"5"},
			{columnname:"Rest Duration(hh:mm)",dataname:"REST",datatype:"string",width:150,storeId:"REST",editControl:"textbox"},

			{columnname:"Driving Hours",dataname:"DRIVING_TIME",datatype:"string",editControl:"textbox",width:150,inputFormat:"numeric",InputPrecision:"2",hidden:true},
			{columnname:"Rest Hours",dataname:"REST_TIME",datatype:"string",editControl:"textbox",width:150,inputFormat:"numeric",InputPrecision:"2",hidden:true}
			
		]
		var constraintMstrGridDtl=			//69995
		{
			title:"Constraint Details",
			id:"constraintMstrDtlCache",
			columnWidth:.450,
			visibleRow:6,
			removeFilter:true,
			removeExport:true,
		//	removeAddDelete:false,
			detail:constraintFieldObj
		}
		
		var constraintMstrGridSection = plf.addGrid(constraintMstrGridDtl,this)			//69995
		//ConstraintMaster Grid Section Ends
		
		var tmpSection =  plf.addColumnSection({title:""})
		tmpSection.add(constraintMstColumn)
		tmpSection.add(plf.addSplitter)
		tmpSection.add(constraintMstrGridSection)
		
		mainpage.ptrMainSection.add(constraintMasterColumn)//Add Header Section to Main Page
		//mainpage.ptrMainSection.add(constraintMstColumn)//Add Header Section to Main Page
		//mainpage.ptrMainSection.add(constraintMstrGridSection) //Add Grid Section to Main Page
		mainpage.ptrMainSection.add(tmpSection)
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strConstraintCode"],
				"service":"CoreConstraintService",
				"methodName":"initConstraintMasterScrTS"
			},		
			
            {
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strConstraintCode","strConstraintDesc","strStartTime","strEndTime","iContinuousDriving","iMaximumDriving"
					,"strStatus","strCreatedBy","dtCreatedDate","strModifiedBy","dtModifiedDate","iDrivingTime","iRestTime","constraintMstrDtlCache"],
					"service":"CoreConstraintService",
					"methodName":"createConstraintTS"
			},
			
			 {
					"controlid":"strConstraintCode",
					"tasktype":"toolbarclick",
					"action":"Edit",
					"input":["strConstraintCode","strConstraintDesc","strStartTime","strEndTime","iContinuousDriving","iMaximumDriving",
					"strStatus","strCreatedBy","dtCreatedDate","strModifiedBy","dtModifedDate","iDrivingTime","iRestTime","constraintMstrDtlCache"],
					"service":"CoreConstraintService",
					"methodName":"modifyConstraintMasterTS"
			},
			 {
					"controlid":"strConstraintCode",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strConstraintCode"],
					"service":"CoreConstraintService",
					"methodName":"deleteConstraintTS"
			}	,
			 {
					"controlid":"strConstraintCode",
					"tasktype":"toolbarclick",
					"action":"Activate",
					"input":["strConstraintCode","strConstraintDesc","strStartTime","strEndTime","iContinuousDriving","iMaximumDriving",
					"strStatus","strCreatedBy","dtCreatedDate","strModifiedBy","dtModifedDate","iDrivingTime","iRestTime","constraintMstrDtlCache"],
					"service":"CoreConstraintService",
					"methodName":"activateConstraintTS"
			},
			 {
					"controlid":"strConstraintCode",
					"tasktype":"toolbarclick",
					"action":"Inactivate",
					"input":["strConstraintCode"],
					"service":"CoreConstraintService",
					"methodName":"inactivateConstraintTS"
			},
			{
				"controlid":"strConstraintCode",
				"tasktype":"onenter",
				"input":["strConstraintCode"],
				"service":"CoreConstraintService",
				"methodName":"fetchConstraintMasterTS"
			},							
			{
				"tasktype":"proto",
				"filename":"jm_master/ConstraintMaster.json"
			}
		
		];
		//Event Handlers Mapping Ends
		/*Help Screen handler starts here*/
		mainpage.hlpLinks=
		{
			"constraintcode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.ConstraintHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strConstraintCode","child":"CONSTRAINT_CODE"},
							{"parent":"strConstraintDesc","child":"CONSTRAINT_DESC"},
							{"parent":"strStatus","child":"STATUS"},
							{"parent":"strStartTime","child":"START_TIME"},
							{"parent":"strEndTime","child":"END_TIME"},
							{"parent":"iContinuousDriving","child":"CONTINOUS_DRIVING"},
							{"parent":"iMaximumDriving","child":"MAXIMUM_DRIVING"}
							]
				}
			
		}
		/*Help Screen handler ends here*/
		//Generate Screen Section
		//mainpage.generateScreen();
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
				"except":["strConstraintCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":["constraintMstrDtlCache"]
			}			
		}
		
		
		mainpage.screenLinks=
		{
			
				"jm_ConstraintMapping":
				{
					"dest":"jm_master.ConstraintMapping",
					"hdr":[
							{"src":"strConstraintCode","dest":"strConstraintCode"},
							{"src":"strConstraintDesc","dest":"strConstraintDesc"},
							{"src":"strStatus","dest":"strStatus"}
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
				
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

