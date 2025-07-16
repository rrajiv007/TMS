/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995				Added var for all local variable		                                   
************************************************************************************************/
Ext.define('CueTrans.view.jm_master.CarrierHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		
		mainpage.screenName = "Carrier Help";
		//HelpOn3PL Search Section starts
		plf.columns=3
		var helpOn3PLHdrCollapse = plf.addColumnSection({title:"", collapsed: true});			//69995
		
		var helpOn3PLFormCtrl=							//69995
		[
			plf.addText({"label":"Carrier Code",id:"str3PLOwnerCode"}),
		//	plf.addText({"label":"Carrier Code To",id:"str3PLOwnerCodeTo","anywhereSearch":"true"}),
		    plf.addText({"label":"Carrier Name",id:"str3PlOwnerName"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Carrier Type",id:"strCarrierType"}),
			plf.addCombo({"label":"Roster Required",id:"strRosterReq"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),			
		    plf.addHidden({"label":"Context",id:"strContext"}),
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		]
		
		helpOn3PLHdrCollapse.add(helpOn3PLFormCtrl);
		//HelpOn3PL Header Section Ends
		
		//HelpOn3PL Grid Section Begins
		var helpOn3PLGridFieldObj=		//69995
		[
			{columnname:"Carrier Code",dataname:"OWNER_CODE_3PL",datatype:"string",width:150},
			{columnname:"Carrier Name",dataname:"OWNER_NAME_3PL",datatype:"string",width:200},
			{columnname:"Carrier Type",dataname:"CARRIER_TYPE",datatype:"string",datatype:"string",width:100},
			{columnname:"Roster Required",dataname:"ROSTER_REQ",datatype:"string",width:100},
			{columnname:"Phone1",dataname:"PHONE1",datatype:"string",datatype:"string",width:100},
			{columnname:"City",dataname:"CITY",datatype:"string",width:130},
			{columnname:"State",dataname:"STATE",datatype:"string",width:130},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:130},
			{columnname:"Contact Person",dataname:"CONTACT_PERSON",datatype:"string",width:200},
			{columnname:"Contact Phone<br>No",dataname:"CONTACT_PERSON_PH",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:90},
		]
		var helpOn3PLGridDtl=			//69995
		{
			title:"Carrier Details",
			id:"ownerDtlCache",
			detail:helpOn3PLGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true
		}
		var helpGridSection = plf.addGrid(helpOn3PLGridDtl,this)			//69995
		mainpage.hlpSearchGridPtr = helpGridSection			
		//HelpOn3PL Grid Section Ends
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(helpOn3PLHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
	
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["str3PLOwnerCode","str3PlOwnerName","strCity",
				"strState","strCountry","strStatus","strCarrierType","strRosterReq"],
				"service":"Core3PLOwnerService",
				"methodName":"fetchAll3PlOwnerTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["ownerDtlCache","strContext"],
				"service":"Core3PLOwnerService",
				"methodName":"init3PlOwnerMasterScrSearchTS"
			},
			
			{
					"controlid":"strCountry",
					"tasktype":"onchange",
					"input":["strCountry","strState"],
					"service":"Core3PLOwnerService",
					"methodName":"fetchStateTS"
			},
			
			{
					"controlid":"strState",
					"tasktype":"onchange",
					"input":["strCountry","strState"],
					"service":"Core3PLOwnerService",
					"methodName":"fetchCityTS"
			},
						
			
		];
		//Event Handlers Mapping Ends
			
		//Generate Screen Section
		/*
		mainpage.screenLinks=
		{
			"3PLMaster":
				{
					"dest":"jm_master.3PLOwnerMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"OWNER_CODE_3PL","dest":"str3PlOwnerCode"}
							]
				}
		}
		*/
		
		mainpage.screenLinks=
		{
				"carriercode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CarrierHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"str3PLOwnerCodeFrom","child":"OWNER_CODE_3PL"}
							]
				}
		}
		
		this.callParent(arguments);
		
	}
});
