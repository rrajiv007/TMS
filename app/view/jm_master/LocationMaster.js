/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.2															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable		                                   
1.0.2		Yeshwanth		24-Feb-2016	  70598	                           		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.LocationMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Location Master";
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create a location."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit a location."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete a location."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate a location."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate a location."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strLocCode"]
		
		//Location Header Section starts
		plf.columns=4
		var LocationHdrColumn = plf.addColumnSection({title:""});			//69995
		
		
		var LocationFormCtrl=									//69995
		[
			
			plf.addHlpText({"label":"Location Code",id:"strLocCode","mandatory":"true",hlpLinkID:"locationcode",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Location Name",id:"strLocName","mandatory":"true",inputFormat:"string",InputLength:"100"}),
			plf.addCombo({"label":"Location Type",id:"strLocType","mandatory":"true"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Zone",id:"strRegion","mandatory":"true"}),
		
			plf.addText({"label":"Address",id:"strAddress",inputFormat:"string",InputLength:"200"}),
			plf.addCombo({"label":"Country",id:"strCountry",inputFormat:"string"}),
			plf.addCombo({"label":"State",id:"strState",inputFormat:"string"}),
			plf.addCombo({"label":"City",id:"strCity",inputFormat:"string"}),			
			plf.addText({"label":"Province",id:"strProvince",inputFormat:"string",InputLength:"200"}),	
			//plf.addText({"label":"Area",id:"strArea",inputFormat:"string",InputLength:"200"}),
            plf.addCombo({"label":"Finance Region",id:"strArea",inputFormat:"string",InputLength:"200","mandatory":"true"}),			
			plf.addText({"label":"Zip Code",id:"strZipCode",inputFormat:"integer"}),
			plf.addText({"label":"Lattitude",id:"strGeoLattitude",inputFormat:"string"}),
			plf.addText({"label":"Longitude",id:"strGeoLongitude",inputFormat:"string"}),
			plf.addCombo({"label":"H2S Location",id:"strh2s",inputFormat:"string"})			//70598
			//plf.addText({"label":"Degree",id:"iLatDegree"}),
			//plf.addText({"label":"Degree",id:"iLongDegree"}),
			//plf.addBlank(),
			//plf.addText({"label":"Minutes",id:"iLatMinute"}),
			//plf.addText({"label":"Minutes",id:"iLongMinute"}),
			//plf.addBlank(),
			//plf.addText({"label":"Seconds",id:"iLatSecond"}),
			//plf.addText({"label":"Seconds",id:"iLongSecond"}),
			//plf.addCombo({"label":"Direction",id:"strLongDirection"}),
			//plf.addBlank(),
			//plf.addCombo({"label":"Direction",id:"strLatDirection"}),
			//plf.addCheckBox({"label":"Resting Point",id:"strRestingPoint"}),
			//plf.addText({"label":"Motel Name",id:"strMotelName"}),
			//plf.addButton({"label":"Submit",id:"cmn_btnsubmit"})
		]
		
		LocationHdrColumn.add(LocationFormCtrl);
		//Location Header Section Ends
		LocationHdrColumn.add(plf.addStripLine({}));
		//Add Child Sections
		mainpage.ptrMainSection.add(LocationHdrColumn)//Add Header Section to Main Page
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strLocCode"],
				"service":"CoreLocationService",
				"methodName":"initLocationMasterScrTS"
			},
             {
					"controlid":"strLocCode",
					"tasktype":"toolbarclick",
					"action":"Create",
					"input":["strLocCode","strLocName","strLocType","strRegion","strCity","strState","strZipCode","strCountry","strStatus","strAddress","strGeoLattitude","strGeoLongitude","strCreatedBy","strModifiedBy","dtModifiedDate","strModifiedBy","strh2s","strArea"],
					"service":"CoreLocationService",
					"methodName":"createLocationTS"
			},
			{
				"controlid":"strLocCode",
				"tasktype":"onenter",
				"input":["strLocCode"],
				"service":"CoreLocationService",
				"methodName":"fetchLocationTS"
			},	
			{
					"controlid":"strLocCode",
					"tasktype":"toolbarclick",
					"action":"Edit",
					"input":["strLocCode","strLocName","strLocType","strRegion","strCity","strState","strZipCode","strCountry","strStatus","strAddress","strGeoLattitude","strGeoLongitude","strh2s","strArea"],
					"service":"CoreLocationService",
					"methodName":"modifyLocationTS"
			},
			{
					"controlid":"strLocCode",
					"tasktype":"toolbarclick",
					"action":"Delete",
					"input":["strLocCode","strLocName","strLocType","strRegion","strCity","strState","strZipCode","strCountry","strStatus","strAddress","strGeoLattitude","strGeoLongitude","strh2s","strArea"],			//70598
					"service":"CoreLocationService",
					"methodName":"deleteLocationTS"
			},
			{
					"controlid":"strLocCode",
					"tasktype":"toolbarclick",
					"action":"Activate",
					"input":["strLocCode","strLocName","strLocType","strRegion","strCity","strState","strZipCode","strCountry","strStatus","strAddress","strGeoLattitude","strGeoLongitude","strh2s","strArea"],			//70598
					"service":"CoreLocationService",
					"methodName":"activateLocationTS"
			},
			{
					"controlid":"strLocCode",
					"tasktype":"toolbarclick",
					"action":"Inactivate",
					"input":["strLocCode"],
					"service":"CoreLocationService",
					"methodName":"inactivateLocationTS"
			},
			{
				"controlid":"strCountry",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreLocationService",
				"methodName":"fetchonchangeStateTS"
		},
		
		{
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreLocationService",
				"methodName":"fetchonchangeCityTS"
		},
			{
				"tasktype":"proto",
				"filename":"jm_master/LocationMaster.json"
			}
			/*{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"create",
					"input":["strLocCode","strLocName","strLocType","strRegion","strCity","strState","strCountry","strZipCode","","","","","","","",],
					"service":"CoreInspectorService",
					"methodName":"createInspectorTS"
			}*/
			/*{
					"controlid":"cmn_btnsubmit",
					"tasktype":"btnclick",
					"input":["strLocCode","strLocName","strLocType","strRegion","strCity","strZipCode","strState","strCountry","iLatDegree","iLatMinute","iLatSecond","strLatDirection","iLongDegree","iLongMinute","iLongSecond","strLongDirection","strRestingPoint","strMotelName"],
					"service":"CoreLocationService",
					"methodName":"createLocationTS"
					}*/
			/*{
				"tasktype":"proto",
				"filename":"jm_master/LocationMaster.json"
			}*/
		];
		//Event Handlers Mapping Ends
		mainpage.hlpLinks=
		{
			"locationcode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.LocationHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strLocCode","child":"LOC_CODE"}
							]
				}
			
		}

		//Generate Screen Section
		//mainpage.generateScreen();
			mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":["strLocCode"]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strLocCode"]
			},
			"active":
			{
				"enableAll":false,
				"except":["strLocCode"]
			}			
		}
		
		
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
