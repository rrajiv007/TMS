/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
		                                   
************************************************************************************************/
Ext.define('CueTrans.view.peoplelogistics.GuestHouseSearch',
{
	extend:"CueTrans.lib.plfTransScreen",
   
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Guest House Summary";
		//mainpage.liveScreenFlag=false;
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Create Guest House","linkid":"jm_GuestHouseMst","tooltip":"Click here to create an guest house."}
		]
		
		
		//GuestHouse Search Section starts
		plf.columns=4
		var GuestHouseHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
			
		var GuestHouseFormCtrl=
		[
			plf.addText({"label":"Guest House Code",id:"strGuestHouseCode","anywhereSearch":"true"}),			
			plf.addText({"label":"Guest House Name",id:"strGuestHouseName"}),	
            plf.addText({"label":"Care Taker",id:"strCareTaker"}),						
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"Country",id:"strCountry"})
		]
		
		GuestHouseHdrCollapse.add(GuestHouseFormCtrl);
		//GuestHouse Header Section Ends
		
		//GuestHouse Grid Section Begins
		var GuestHouseRoleObj=
		[
			{columnname:"Guest House Code",dataname:"GUEST_CODE",datatype:"string",width:150,linkId:"GuestHouseMaster",
						"tooltip":"Click here to launch the guest house master screen."},
			{columnname:"Guest House Name",dataname:"GUEST_NAME",datatype:"string",width:150},
            {columnname:"Care Taker",dataname:"CARE_TAKER",datatype:"string",width:150},				
			{columnname:"Phone No",dataname:"PHONE_NO",datatype:"string",width:100},
			{columnname:"City",dataname:"CITY",datatype:"string",width:130},
			{columnname:"State",dataname:"STATE",datatype:"string",width:130},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:200}		
		]
		var GuestHouseGridDtl=
		{
			title:"",
			id:"GuestHouseRole",
			detail:GuestHouseRoleObj,
			visibleRow:plf.searchVisibleRows,
			readOnly:true,
			removeAddDelete:true
		}
		var GuestHouseGridSection = plf.addGrid(GuestHouseGridDtl,this)	
		//GuestHouse Grid Section Ends
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(GuestHouseHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(GuestHouseGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strGuestHouseCode"],
				"service":"PPLCoreMasterTS",
				"methodName":"initGuestSearchTS"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strGuestHouseCode","strGuestHouseName","strCareTaker","strStatus","strCity","strstate","strCountry"],
				"service":"PPLCoreMasterTS",
				"methodName":"fetchAllGuestSrch"
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
		//Event Handlers Mapping Ends
		
		mainpage.screenLinks=
		{			
			"GuestHouseMaster":
				{
					"dest":"peoplelogistics.GuestHouseMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"GUEST_CODE","dest":"strGuestHouseCode"}
							]
				},
				"jm_GuestHouseMst":
				{
					"dest":"peoplelogistics.GuestHouseMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}				
		};
			
	
		this.callParent(arguments);
		
	}
});
