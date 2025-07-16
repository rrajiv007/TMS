/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.2															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Manibharathi	04/02/2016      69952					Status Combo Alignment  
1.0.2	 	Manibharathi	05/02/2016   	69997                         Addition of var               
************************************************************************************************/
Ext.define('CueTrans.view.tariff.DistanceSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Distance Summary";
		
		
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Create Distance Master","linkid":"fin_newdist","tooltip":"Click here to define distance."},
			{"name":"Distance Bulk","linkid":"distBulk","tooltip":"Click here to define distance bulk."}
		]
		
		
		plf.columns = 4
		var distHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);//69997
		
		
		var distFormCtrl=															//69997
		[
			plf.addText({"label":"Distance Code",id:"strDistCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Distance Code To",id:"strDistCodeTo"}),
			plf.addText({"label":"Description",id:"strDistDesc"}),
			plf.addText({"label":"From Location",id:"strFromLoc"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addText({"label":"To Location",id:"strToLoc"}),
			plf.addText({"label":"Distance(km)",id:"strDistance"})
			//plf.addText({"label":"Transit Time(hrs)",id:"strTime"})
			//plf.addButton({"label":"Search",id:"btnSearch"})
		]
		
		distHdrCollapse.add(distFormCtrl);
		
		var distGridFieldObj=									//69997
		[
			{columnname:"Distance Code",dataname:"DIST_CODE",datatype:"string",width:150,linkId:"distancemaster"},
			{columnname:"Description",dataname:"DIST_DESC",datatype:"string",width:150},
			{columnname:"From Location",dataname:"FRM_LOC_CODE",datatype:"string",datatype:"string",width:100},
			{columnname:"To Location",dataname:"TO_LOC_CODE",datatype:"string",width:130},
			{columnname:"Distance(km)",dataname:"DISTANCE",datatype:"string",width:130},
			//{columnname:"Transit Time(hrs)",dataname:"TRANSIT_TIME",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130}
		]
		distGridDtl=
		{
			title:"",
			id:"distGrid",
			detail:distGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			readOnly:true,
			removeAddDelete:true
		}
		var distGridSection = plf.addGrid(distGridDtl,this)	//69997
		
	
		mainpage.ptrMainSection.add(distHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(distGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins

		mainpage.eventHandlers = 
		[
			{
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
			}
		];
			
		mainpage.screenLinks=
		{
			"fin_newdist":
				{
					"dest":"tariff.DistanceMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
				"distancemaster":
				{
					"dest":"tariff.DistanceMaster",
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