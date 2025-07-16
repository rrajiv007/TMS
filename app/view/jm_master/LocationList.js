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
Ext.define('CueTrans.view.jm_master.LocationList', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Location Summary";
		// Add Toolbar
		//mainpage.toolbarSectionFlag=false;
		
		//Add Keyfields
		//mainpage.keyFields=["locationCodeFrom"]
		
		//Location Search Section Begins
		plf.columns=4
		var locationHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);			//69995
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
			{"name":"Create Location","linkid":"jm_locationMst","tooltip":"Click here to create a location."}
		]
		var locationFormCtrl=			//69995
		[ 
		
			plf.addText({"label":"Location Code",id:"strLocCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Location Code To",id:"strLocCodeTo","anywhereSearch":"true"}),
			plf.addText({"label":"Location Name",id:"strLocName"}),
			plf.addCombo({"label":"Location Type",id:"strLocType"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Zone",id:"strRegion"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			plf.addText({"label":"Province",id:"strProvince",inputFormat:"string",InputLength:"200"}),	
			//plf.addText({"label":"Area",id:"strArea",inputFormat:"string",InputLength:"200"})
            plf.addCombo({"label":"Finance Region",id:"strArea",inputFormat:"string",InputLength:"200"})			
		]
		
		locationHdrCollapse.add(locationFormCtrl);
		//Location Header Section Ends
		
		//Location Grid Section Begins
		var locationGridFieldObj=				//69995
		[
			{columnname:"Location Code",dataname:"LOC_CODE",datatype:"string",width:110,linkId:"LocationCode","tooltip":"Click here to launch the location screen."},
			{columnname:"Location Name",dataname:"LOC_NAME",datatype:"string",width:110},
			{columnname:"Location Type",dataname:"LOC_TYPE",datatype:"string",storeId:"strLocationType",width:110},
			{columnname:"Zone",dataname:"REGION",datatype:"string",storeId:"strRegion1",width:110},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:110},
			{columnname:"State",dataname:"STATE",datatype:"string",width:110},		
			{columnname:"City",dataname:"CITY",datatype:"string",width:110},
			{columnname:"Province",dataname:"PROVINCE",datatype:"string",width:110},
			//{columnname:"Area",dataname:"AREA",datatype:"string",width:110},
			{columnname:"Finance Region",dataname:"AREA",datatype:"string",width:110},
			{columnname:"Zipcode",dataname:"ZIP_CODE",datatype:"string",width:110},
			{columnname:"Latitude",dataname:"GEOLATTITUDE",datatype:"string",width:100},
			{columnname:"Longitude",dataname:"GEOLONGITUDE",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
			//{columnname:"Resting Point",dataname:"RESTING_POINT",datatype:"string",width:110},
			//{columnname:"Motel Name",dataname:"MOTEL_NAME",datatype:"string",width:110}
		]
		var locationGridDtl=				//69995
		{
			title:"Location Details",
			id:"locationDetail",
			
			readonly:true,
			detail:locationGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true
		}
		var locationGridSection = plf.addGrid(locationGridDtl,this)			//69995
		//Location Grid Section Ends
		
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
				"input":["locationDetail"],
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
				"filename":"jm_master/LocationSearch.json"
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
		
		mainpage.screenLinks=
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
				},
				"jm_locationMst":
				{
					"dest":"jm_master.LocationMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
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
