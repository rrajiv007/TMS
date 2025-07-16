Ext.define('CueTrans.view.jm_master.NumberingTypeSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Numbering Type Summary";
	
		//Numbering Type Section starts
		plf.columns=2
		numberingTypeSearchColumn = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"searchBtn"},this);
		
		numberingTypeSearchFormCtrl=
		[
			plf.addText({"label":"Numbering Type Code From",id:"strNumberingTypeCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Numbering Type Code To",id:"strNumberingTypeCodeTo","anywhereSearch":"true"}),
			plf.addText({"label":"Numbering Type Description",id:"strNumberingTypeDesc"}),
			plf.addBlank(),
			plf.addCombo({"label":"Component",id:"strComponent"}),
			plf.addCombo({"label":"Activity",id:"strActivity"}),
			//plf.addButton({"label":"Search",id:"searchBtn","tooltip":"Click here to search."}),
		]
		
		numberingTypeSearchColumn.add(numberingTypeSearchFormCtrl);
		//Numbering Type Header Section Ends
		
		//Numbering Type Grid Section Begins
		numberingTypeGridFieldObj=
		[
			{columnname:"Numbering Type Code",dataname:"NUMTYPE_CODE",datatype:"string",width:250,linkId:"numMaster","tooltip":"Click here to launch the numbering series screen."},
			{columnname:"Numbering Type Description",dataname:"NUMTYPE_DESC",datatype:"string",editControl:"textbox",width:250},
			{columnname:"Component",dataname:"COMPONENT_CODE",datatype:"string",editControl:"textbox",width:250},
			{columnname:"Actitvity",dataname:"ACTIVITY_CODE",datatype:"string",editControl:"textbox",width:250}
			
		]
		numberingTypeGridDtl=
		{
			title:"Numbering Type Details",
			id:"numberingTypeSearch",
			detail:numberingTypeGridFieldObj
		}
		//Numbering Type Grid Section Ends
		
		
		//Add Child Sections
		tmp_gridsection1 = plf.addGrid(numberingTypeGridDtl,this)	
		mainpage.ptrMainSection.add(numberingTypeSearchColumn)//Add Header Section to Numbering Type Page
		mainpage.ptrMainSection.add(tmp_gridsection1) //Add Grid Section to Numbering Type Page
		
		//History Data Section
		//mainpage.data_his_sec_flag=false;
		
		// Event Handlers Mapping Begins
				mainpage.eventHandlers = 
			[
				{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreNumberingService",
					"methodName":"initNumSearchScrTS"
				},
			/*	{  
					"controlid":"",
					"tasktype":"onload",
					"input":[],
					"service":"CoreNumberingService",
					"methodName":"fetchAllNumType"
				},*/
				{
					"controlid":"strComponent",
					"tasktype":"onchange",
					"input":["strComponent"],
					"service":"CoreNumberingService",
					"methodName":"initNumSearchTS"
				},
				{  
					"controlid":"searchBtn",
					"tasktype":"btnclick",
					"input":["strNumberingTypeCodeFrom","strNumberingTypeDesc","strComponent","strActivity"],
					"service":"CoreNumberingService",
					"methodName":"fetchAllNumType"
				}
			];
			//Event Handlers Mapping Ends
			
			
		
			mainpage.screenLinks=
		{
			"numMaster":
				{
					"dest":"jm_master.NumberingTypeMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"NUMTYPE_CODE","dest":"strNumTypeCode"}
							]
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
