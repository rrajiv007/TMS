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
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.LocationHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true; //help
		mainpage.startPainting();
		mainpage.screenName = "Location Help";
		// Add Toolbar
		//mainpage.toolbarSectionFlag=false;
		
		//Add Keyfields
		//mainpage.keyFields=["locationCodeFrom"]
		
		//Location Search Section Begins
		plf.columns=3
		var locationHdrCollapse =plf.addColumnSection({title:"", collapsed: true});//help		//69995
		
		var locationFormCtrl=				//69995
		[ 
			plf.addText({"label":"Location Code",id:"strLocCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Location Code To",id:"strLocCodeTo","anywhereSearch":"true"}),
			plf.addText({"label":"Location Name",id:"strLocName"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Location Type",id:"strLocType"}),
			plf.addCombo({"label":"Zone",id:"strRegion"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			plf.addText({"label":"Province",id:"strProvince",inputFormat:"string",InputLength:"200"}),	
			plf.addCombo({"label":"Finance Region",id:"strArea",inputFormat:"string",InputLength:"200"}),
			plf.addHidden({"label":"Context",id:"strContext"}),
			plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."})			
		]
		
		locationHdrCollapse.add(locationFormCtrl);
		//Location Header Section Ends
		
		//Location Grid Section Begins
		var locationGridFieldObj=			//69995
		[
			{columnname:"Location Code",dataname:"LOC_CODE",datatype:"string",width:100},
			{columnname:"Location Name",dataname:"LOC_NAME",datatype:"string",width:100},
			{columnname:"Location Type",dataname:"LOC_TYPE",datatype:"string",storeId:"strLocationType",width:100},
			{columnname:"Zone",dataname:"REGION",datatype:"string",storeId:"strRegion1",width:100},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:100},
			{columnname:"State",dataname:"STATE",datatype:"string",width:100},		
			{columnname:"City",dataname:"CITY",datatype:"string",width:100},
			{columnname:"Province",dataname:"PROVINCE",datatype:"string",width:100},
			{columnname:"Finance Region",dataname:"AREA",datatype:"string",width:110},
			{columnname:"Zipcode",dataname:"ZIP_CODE",datatype:"string",width:100},
			{columnname:"Latitude",dataname:"GEOLATTITUDE",datatype:"string",width:100},
			{columnname:"Longitude",dataname:"GEOLONGITUDE",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		var locationGridDtl=			//69995
		{
			title:"Location Details",
			id:"locationDetail",
			detail:locationGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
		}
		var locationGridSection = plf.addGrid(locationGridDtl,this)				//69995
		//Location Grid Section Ends
		mainpage.hlpSearchGridPtr = locationGridSection
		//Add Child Sections
			
		mainpage.ptrMainSection.add(locationHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(locationGridSection) //Add Grid Section to Main Page
		
		//History Data Section
		//mainpage.data_his_sec_flag=true;
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["locationDetail","strContext"],
				"service":"CoreLocationService",
				"methodName":"fetchAllLocationsTS"
			},
			{
					"controlid":"searchBtn",
					"tasktype":"btnclick",
					"input":["strLocCodeFrom","strLocName","strRegion","strLocType","strCity","strState","strCountry","strStatus","strArea"],
					"service":"CoreLocationService",
					"methodName":"initLocationMasterSearchScrTS"
					},	
			/*{
				"controlid":"strRouteId",
				"tasktype":"onenter",
				"input":["strRouteId"],
				"service":"CoreRouteService",
				"methodName":"fetchRouteTS"
			},	*/					
			{
				"tasktype":"proto",
				"filename":"jm_master/LocationHelp.json"
			},
			{
				"controlid":"strCountry",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreLocationService",
				"methodName":"fetchStateTS"
		},
		
		{
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreLocationService",
				"methodName":"fetchCityTS"
		}
		];
		
	/*	mainpage.screenLinks=
		{
			"LocationCode":
				{
					"dest":"jm_master.LocationMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"LOC_CODE","dest":"strLocCode"}
							]
				}
		}*/
		//Event Handlers Mapping Ends
		
		//Generate Screen Section
		//mainpage.generateScreen();
		
		
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