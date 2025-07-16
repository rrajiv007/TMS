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
Ext.define('CueTrans.view.jm_master.ConstraintSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",

	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Constraint Summary";

		//ConstraintList Search Header Section Begins
		plf.columns=3
		var constraintListCollapsible = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);		//69995
		mainpage.toolbarSectionFlag=true;	
        mainpage.toolbarLinks=
		[
			{"name":"Create Constraint","linkid":"jm_Constraint","tooltip":"Click here to create a constraint."}
		]
		var constraintSearchCtrl=				//69995
		[
			
			plf.addText({"label":"Constraint Code",id:"strConstraintCodeFrom","anywhereSearch":"true"}),
			//plf.addText({"label":"Constraint Code To",id:"strConstraintCodeTo","anywhereSearch":"true"}),
			plf.addText({"label":"Constraint Description",id:"strConstraintDesc"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			//plf.addBlank({}),  
           // plf.addBlank({}), 
            //plf.addBlank({}),                    
			//plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."}),
            //plf.addBlank({})
		]
		constraintListCollapsible.add(constraintSearchCtrl);
		//ConstraintList Search Header Section Ends
		
		//ConstraintList Search Grid Section Begins
		var constraintGridFieldObj=				//69995
		[
			{columnname:"Constraint Code",dataname:"CONSTRAINT_CODE",datatype:"string",width:200,linkId:"constraintMaster","tooltip":"Click here to launch the constraint screen."},
			{columnname:"Constraint Description",dataname:"CONSTRAINT_DESC",datatype:"string",width:200},
			{columnname:"Start Time",dataname:"START_TIME",datatype:"string",width:150},
			{columnname:"End Time",dataname:"END_TIME",datatype:"string",width:150},
			{columnname:"Continuous Driving",dataname:"CONTINOUS_DRIVING",datatype:"string",width:150},
			{columnname:"Maximum Driving",dataname:"MAXIMUM_DRIVING",datatype:"string",width:150},
		 {columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
			
		]
		var constraintGridDtl=			//69995
		{
			title:"",
			id:"constraintDtlCache",
			detail:constraintGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			readonly:true
		}
		
		var constraintGridSection = plf.addGrid(constraintGridDtl,this)			//69995
		//ConstraintList Search Grid Section Ends
		
		mainpage.ptrMainSection.add(constraintListCollapsible)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(constraintGridSection) //Add Grid Section to Main Page
		
		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
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
					"controlid":"btnSearch",
					"tasktype":"btnclick",
					"input":["strConstraintCodeFrom","strConstraintDesc","strStatus"],
					"service":"CoreConstraintService",
					"methodName":"fetchAllConstraintTS"
			},
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreConstraintService",
				"methodName":"initConstraintTS"
			},
			{
				"tasktype":"proto",
				"filename":"jm_master/ConstraintSearch.json"
			}
		];
		mainpage.screenLinks=
		{
			"constraintMaster":
				{
					"dest":"jm_master.ConstraintMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"CONSTRAINT_CODE","dest":"strConstraintCode"}
							]
				},
				"jm_Constraint":
				{
					"dest":"jm_master.ConstraintMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
		//Event Handlers Mapping Ends
		/*	
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});
		*/
		//Generate Screen Section
		this.callParent(arguments);
		//mainpage.generateScreen();
		
	}
});
