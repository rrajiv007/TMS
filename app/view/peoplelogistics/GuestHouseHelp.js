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
Ext.define('CueTrans.view.peoplelogistics.GuestHouseHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.screenName = "Guest House Help";
		//mainpage.liveScreenFlag=false;
		mainpage.startPainting();
		
		
		//GuestHouse Header Section Begins
		plf.columns=3
		var GuestHouseHdrCollapse = plf.addColumnSection({collapsed: true});
		
		var GuestHouseFormCtrl=
		[
			plf.addText({"label":"Guest House Code",id:"strGuestHouseCode","anywhereSearch":"true"}),			
			plf.addText({"label":"Guest House Name",id:"strGuestHouseName"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),			
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),
			plf.addBlank({}),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		]
		GuestHouseHdrCollapse.add(GuestHouseFormCtrl);
		//GuestHouse Header Section Ends
		
		//GuestHouse Grid Section Begins
		var GuestHouseGridFieldObj=
		[
			{columnname:"Guest House Code",dataname:"GUEST_CODE",datatype:"string",width:150},
			{columnname:"Guest House Name",dataname:"GUEST_NAME",datatype:"string",width:150},			
			{columnname:"Phone No",dataname:"PHONE",datatype:"string",width:100},
			{columnname:"City",dataname:"CITY",datatype:"string",width:130},
			{columnname:"State",dataname:"STATE",datatype:"string",width:130},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:200}		
		]
		var GuestHouseGridDtl=
		{
			title:"Guest House Details",
			id:"GuestHouseRole",
			detail:GuestHouseGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			readOnly:true,
			removeAddDelete:true
		}
		var GuestHouseGridSection = plf.addGrid(GuestHouseGridDtl,this)	
		
		mainpage.dataHistorySectionFlag=false;
		mainpage.hlpSearchGridPtr = GuestHouseGridSection		
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
				"input":["strGuestHouseCode","strGuestHouseName","strCountry","strState","strCity","strStatus"],
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
		this.callParent(arguments);
		
	}
});
