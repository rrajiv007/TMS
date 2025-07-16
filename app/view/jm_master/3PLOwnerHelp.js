Ext.define('CueTrans.view.jm_master.3PLOwnerHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true; 
		mainpage.startPainting();
		
		mainpage.screenName = "3PL Owner Help";
		//HelpOn3PL Search Section starts
		plf.columns=3
		helpOn3PLHdrCollapse = plf.addColumnSection({title:"", collapsed: true});
		
		
		helpOn3PLFormCtrl=
		[
			plf.addText({"label":"3PL Owner Code From",id:"str3PLOwnerCodeFrom"}),
			plf.addText({"label":"3PL Owner Code To",id:"str3PLOwnerCodeTo"}),
			plf.addText({"label":"3PL Owner Name",id:"str3PlOwnerName"}),
			plf.addText({"label":"City",id:"strCity"}),
			plf.addText({"label":"State",id:"strState"}),
			plf.addText({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addButton({"label":"Search",id:"btnSearch"})
			
		]
		
		helpOn3PLHdrCollapse.add(helpOn3PLFormCtrl);
		//HelpOn3PL Header Section Ends
		
		//HelpOn3PL Grid Section Begins
		helpOn3PLGridFieldObj=
		[
			{columnname:"3PL Owner Code",dataname:"OWNER_CODE_3PL",datatype:"string",width:150},
			{columnname:"3PL Owner Name",dataname:"OWNER_NAME_3PL",datatype:"string",width:200},
			{columnname:"Phone1",dataname:"PHONE1",datatype:"string",datatype:"string",width:100},
			{columnname:"City",dataname:"CITY",datatype:"string",width:130},
			{columnname:"State",dataname:"STATE",datatype:"string",width:130},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:130},
			{columnname:"Contact Person",dataname:"CONTACT_PERSON",datatype:"string",width:200},
			{columnname:"Contact Phone<br>No",dataname:"CONTACT_PERSON_PH",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:90},
		]
		helpOn3PLGridDtl=
		{
			title:"3PL Owner Details",
			id:"ownerDtlCache",
			detail:helpOn3PLGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			readOnly:true,
			removeAddDelete:true
		}
		helpGridSection = plf.addGrid(helpOn3PLGridDtl,this)
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
				"input":["str3PLOwnerCodeFrom","str3PLOwnerCodeTo","str3PlOwnerName","strCity","strState","strCountry","strStatus"],
				"service":"Core3PLOwnerService",
				"methodName":"fetchAll3PlOwnerTS"
			},
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["ownerDtlCache"],
				"service":"Core3PLOwnerService",
				"methodName":"init3PlOwnerMasterScrSearchTS"
			},
				
		{
			"tasktype":"proto",
			"filename":"jm_master/3PLOwnerHelp.json"
		}				
			
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
		
		
		this.callParent(arguments);
		
	}
});
