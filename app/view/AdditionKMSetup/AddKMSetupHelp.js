/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	Divya																                                         
Version		  :	1.0.2															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
            
************************************************************************************************/
Ext.define('CueTrans.view.AdditionKMSetup.AddKMSetupHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		
		mainpage.screenName = "Additional KM Setup Help";
		
		
		
		plf.columns = 3
		
		var distHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);//69997
		
		var distFormCtrl=															//69997
		[
			plf.addText({"label":"Distance Code",id:"strDistCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Distance Code To",id:"strDistCodeTo"}),
			plf.addText({"label":"Description",id:"strDistDesc"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Region Code",id:"strToLoc"}),
			plf.addCombo({"label":"Location Code",id:"strFromLoc"}),
			
			plf.addText({"label":"Distance(km)",id:"strDistance"})
			//plf.addText({"label":"Transit Time(hrs)",id:"strTime"})
			//plf.addButton({"label":"Search",id:"btnSearch"})
		]
		
		distHdrCollapse.add(distFormCtrl);
		
		var distGridFieldObj=									//69997
		[
			{columnname:"Distance Code",dataname:"DIST_CODE",datatype:"string",width:150},
			{columnname:"Description",dataname:"DIST_DESC",datatype:"string",width:150},
			{columnname:"Region Code",dataname:"TO_LOC_CODE",datatype:"string",width:130},
			{columnname:"Location Code",dataname:"FRM_LOC_CODE",datatype:"string",datatype:"string",width:100},
			
			{columnname:"Distance(km)",dataname:"DISTANCE",datatype:"string",width:130},
			//{columnname:"Transit Time(hrs)",dataname:"TRANSIT_TIME",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130}
		]
		distGridDtl=
		{
			title:"",
			id:"distGrid",
			detail:distGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
		}
		//var distGridSection = plf.addGrid(distGridDtl,this)	//69997
		
	
		mainpage.ptrMainSection.add(distHdrCollapse)//Add Header Section to Main Page
		//mainpage.ptrMainSection.add(distGridSection) //Add Grid Section to Main Page
		
		var helpGridSection=plf.addGrid(distGridDtl,this)	//69997
		mainpage.hlpSearchGridPtr = helpGridSection
		mainpage.ptrMainSection.add(helpGridSection)
		
		// Event Handlers Mapping Begins

		mainpage.eventHandlers = 
		[
		{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initAddKMSetSrc"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strDistCodeFrom","strDistDesc","strStatus","strFromLoc","strToLoc","strDistance","strTime"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchAllAddKMSetTs"
			}
			/*{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TARCoreTariffServiceTS",
				"methodName":"initDistSrchTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strDistCodeFrom","strDistDesc","strStatus","strFromLoc","strToLoc","strDistance","strTime"],
				"service":"TARCoreTariffServiceTS",
				"methodName":"fetchAllDistanceTS"
			}*/
		];
			
		mainpage.screenLinks=
		{
			"fin_newdist":
				{
					"dest":"AdditionKMSetup.AddKMSetupMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"distancemaster":
				{
					"dest":"AdditionKMSetup.AddKMSetupMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"DIST_CODE","dest":"strDistCode"}
							]
				},
				"distBulk":
				{
					"dest":"tariff.DistanceBulk",
					"hdr":[
							{"src":"","dest":""}							
					],
					"grid":[
							{"src":"","dest":""}
					]
				}
		}
		this.callParent(arguments);
	}
});