Ext.define('CueTrans.view.jm_master.JourneyAssessmentParameter', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Journey Assessment Parameter";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Maintain"]
		
		//Add Keyfields
		mainpage.keyFields=[""]
		//Journey Assessment Paremeter  Section Begins
		JourneyAssessmentParameterObj=
		[   
			{columnname:"Range From",dataname:"RANGE_FROM",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Range To",dataname:"RANGE_TO",datatype:"string",editControl:"textbox",width:200},
			{columnname:"Category",dataname:"CATEGORY",datatype:"string",editControl:"textbox",width:150}
			
			
		]
		JourneyAssessmentParameterGrid=
		{
			title:"Journey Assessment Parameter",
			id:"journeyAssessmentMapping",
			detail:JourneyAssessmentParameterObj,
		
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
