Ext.define('CueTrans.view.journey_management.JourneyAssessmentParameter', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Risk Assessment Parameter";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		//mainpage.toolbarActions=["Save"]
		mainpage.toolbarActions= [{
                "name": "Save",
                "tooltip": "Click here to save."
            }
            ]
		//Add Keyfields
		mainpage.keyFields=[""]
		//Journey Assessment Paremeter  Section Begins
		JourneyAssessmentParameterObj=
		[   
			
			{columnname:"Risk Level",dataname:"CATEGORY",datatype:"string",width:150},
			{columnname:"Weightage From",dataname:"RANGE_FROM",datatype:"string",editControl:"textbox",width:200},
			{columnname:"Weightage To",dataname:"RANGE_TO",datatype:"string",editControl:"textbox",width:200}
			
			
		]
		JourneyAssessmentParameterGrid=
		{
			//title:"Journey Assessment Parameter",
			id:"journeyAssessmentMapping",
			detail:JourneyAssessmentParameterObj,
                     readOnly:true,
			removeAddDelete:true
		
		}
		helpGridSection = plf.addGrid(JourneyAssessmentParameterGrid)	
		//Journey Assessment Paremeter Section Ends
		//Add Child Sections
		
		mainpage.ptrMainSection.add(helpGridSection)  //Add Header Section to Main Page
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		{
			    "controlid":"",
			    "tasktype":"toolbarclick",
				"action":"Maintain",
				"input":["journeyAssessmentMapping"],
				"service":"CoreJourneyAssessmentService",
				"methodName":"maintainJourneyParameterTS"
		},
        {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreJourneyAssessmentService",
				"methodName":"initJourneyAssessmentParameter"
		}				
		];
		//Event Handlers Mapping Ends
		/*mainpage.hlpLinks=
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
					"hlpScreen":"jm_master.3PLOwnerHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"str3plOwnerName","child":"OWNER_CODE_3PL"}
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
				"except":["driverMapping","strDriverCode"]
			}			
		}*/
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
