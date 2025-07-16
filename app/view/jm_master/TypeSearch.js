Ext.define('CueTrans.view.jm_master.TypeSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Type Summary";

		//TypeList Search Header Section Begins
		plf.columns=2
		typeListCollapsible = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		typeSearchCtrl=
		[
			plf.addCombo({"label":"Category",id:"strCategoryName"}),
			plf.addText({"label":"Type Description",id:"strCategoryDesc"}),
			//plf.addBlank(),
			//plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		]
		typeListCollapsible.add(typeSearchCtrl);
		//TypeList Search Header Section Ends
		
		//TypeList Search Grid Section Begins
		typeGridFieldObj=
		[
			{columnname:"Category",dataname:"CATEGORY_DESC",datatype:"string",width:200,linkId:"typecode"},
			{columnname:"Type Code",dataname:"TYPE_CODE",datatype:"string",width:200},
			{columnname:"Type Description",dataname:"TYPE_DESC",datatype:"string",width:300}
			
		]
		typeGridDtl=
		{
			title:"Type Details",
			id:"typeDtlCache",
			detail:typeGridFieldObj,
			visibleRow:50,
			readonly:true
		}
		
		typeGridSection = plf.addGrid(typeGridDtl,this)
		//TypeList Search Grid Section Ends
		
		mainpage.ptrMainSection.add(typeListCollapsible)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(typeGridSection) //Add Grid Section to Main Page
		
		
		
		// Event Handlers Mapping Begins
			mainpage.eventHandlers = 
		[
		{
				"controlid":"strCategoryName",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreTypeMasterService",
				"methodName":"initTypeMasterScrTS"
				},
				{
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strCategoryDesc","strCategoryName"],
					"service":"CoreTypeMasterService",
					"methodName":"fetchAllTypesDetailsTS"
				},
				/*,
				{  
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strCategoryName"],
					"service":"CoreTypeMasterService",
					"methodName":"fetchTypeMasterSearchScrTS"
				}*/
		/*	{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreRouteService",
				"methodName":"initRouteMasterScrTS"
			},		
			{
				"controlid":"strRouteId",
				"tasktype":"onenter",
				"input":["strRouteId"],
				"service":"CoreRouteService",
				"methodName":"fetchRouteTS"
			},	*/					
			{
				"tasktype":"proto",
				"filename":"jm_master/TypeSearch.json"
			}
		];
		mainpage.screenLinks=
		{
			"typecode":
				{
					"dest":"jm_master.TypeMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"CATEGORY_DESC","dest":"strCategoryName"}
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
