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
Ext.define('CueTrans.view.peoplelogistics.GuestHouseMaster', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		/*var mainpage = Ext.create("CueTrans.lib.plfTransScreen");*/
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Guest House Master";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions= [{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			{
                "name": "Create",
                "tooltip": "Click here to create an guest house."
            },
			{
                "name": "Edit",
                "tooltip": "Click here to edit an guest house."
            },
            {
                "name": "Delete",
                "tooltip": "Click here to delete an guest house."
            },
            {
                "name": "Activate",
                "tooltip": "Click here to activate an guest house."
            },
            {
                "name": "Inactivate",
                "tooltip": "Click here to inactivate an guest house."
            }
            ]
		
		//Add Keyfields
		mainpage.keyFields=["strEmployeeCode"]
		
		//GuestHouse Header Section Begins
		plf.columns=4
		var GuestHouseMasterColumn = plf.addColumnSection({});			//69995
		var GuestHouseMstrCtrl=											//69995
		[
			plf.addHlpText({"label":"Guest House Code",id:"strGuestHouseCode","mandatory":"true",hlpLinkID:"GuestHouseCode",inputFormat:"string",InputLength:"40"},this),
			plf.addText({"label":"Guest House Name",id:"strGuestHouseName","mandatory":"true",inputFormat:"string",InputLength:"100"}),						
			plf.addText({"label":"Phone No",id:"strPhoneNo",inputFormat:"string",InputLength:"20"}),
			plf.addDisplayOnly({"label":"Status",id:"strStatus"}),			
			plf.addText({"label":"Care Taker",id:"strCareTaker","mandatory":"true",inputFormat:"string",InputLength:"40"}),
			//plf.addText({"label":"Name",id:"strName",inputFormat:"string",InputLength:"60","mandatory":"true"}),
			plf.addText({"label":"Email Id",id:"strEmail",inputFormat:"string",InputLength:"60","mandatory":"true"}),
			plf.addText({"label":"Address",id:"strAddress",inputFormat:"string",InputLength:"200"}),			
			plf.addCombo({"label":"Country",id:"strCountry",inputFormat:"string",InputLength:"60"}),			
			plf.addCombo({"label":"State",id:"strState",inputFormat:"string",InputLength:"60"}),
			plf.addCombo({"label":"City",id:"strCity",inputFormat:"string",InputLength:"50"}),
			plf.addText({"label":"Zip Code",id:"strZipCode",inputFormat:"string",InputLength:"20"})			
		]
		GuestHouseMasterColumn.add(GuestHouseMstrCtrl);
		//EmployeeMaster Header Section Ends
		
		var guestHouseDtlObj=
		[   			
			{columnname:"Room No",dataname:"ROOM_NO",datatype:"string",editControl:"textbox",width:150},
			{columnname:"Room Type",dataname:"ROOM_TYPE",datatype:"string",storeId:"strRoomType",editControl:"combo",width:200},			
			{columnname:"No of Beds",dataname:"NO_OF_BEDS",datatype:"string",width:150,editControl:"textbox"}			
		]
		var GuestHouseRoomGridDtl=
		{
			title:"",
			id:"guestHouseDtl",
			detail:guestHouseDtlObj,
			visibleRow:10
		}
		var GuestHouseGridSection = plf.addGrid(GuestHouseRoomGridDtl,this)	
		
		
		
		//History Data Section
		mainpage.dataHistorySectionFlag=true;
				
		mainpage.ptrMainSection.add(GuestHouseMasterColumn)//add hdr details
		mainpage.ptrMainSection.add(GuestHouseGridSection)//Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
					
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strGuestHouseCode"],
				"service":"PPLCoreMasterTS",
				"methodName":"initGuestTS"
			},	
							
			{
				"controlid":"strGuestHouseCode",
				"tasktype":"onenter",
				"input":["strGuestHouseCode"],
				"service":"PPLCoreMasterTS",
				"methodName":"fetchGuestTS"
			},	
					
		    {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strGuestHouseCode","strGuestHouseName","strPhoneNo","strStatus","strCareTaker",
				"strName","strEmail","strAddress","strCountry","strState","strCity","strZipCode","guestHouseDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"createGuestTS"
			},	
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Edit",
				"input":["strGuestHouseCode","strGuestHouseName","strPhoneNo","strStatus","strCareTaker","strName","strEmail","strAddress","strCountry","strState","strCity","strZipCode","guestHouseDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"editGuestTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Delete",
				"input":["strGuestHouseCode","strGuestHouseName","strPhoneNo","strStatus","strCareTaker","strName","strEmail","strAddress","strCountry","strState","strCity","strZipCode","guestHouseDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"deleteGuestTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Activate",
				"input":["strGuestHouseCode","strGuestHouseName","strPhoneNo","strStatus","strCareTaker","strName","strEmail","strAddress","strCountry","strState","strCity","strZipCode","guestHouseDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"activateGuestTS"
			},
            {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Inactivate",
				"input":["strGuestHouseCode","strGuestHouseName","strPhoneNo","strStatus","strCareTaker","strName","strEmail","strAddress","strCountry","strState","strCity","strZipCode","guestHouseDtl"],
				"service":"PPLCoreMasterTS",
				"methodName":"inactivateGuestTS"
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
		
		//Generate Screen Section
		//mainpage.generateScreen();
		
		
		
		
		mainpage.hlpLinks=
		{
			"GuestHouseCode":
				{
					"hlpType":"Header",
					"hlpScreen":"peoplelogistics.GuestHouseHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strGuestHouseCode","child":"GUEST_CODE"}
							]
				}
		}
		
		this.callParent(arguments);
			
	}
});
