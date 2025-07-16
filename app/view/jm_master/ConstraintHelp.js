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
Ext.define('CueTrans.view.jm_master.ConstraintHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.screenName = "Constraint Help";
		mainpage.startPainting();
		
		
		//Calendar List Header Section Begins
		plf.columns=3
		var helpOnconstraintHdrCollapse = plf.addColumnSection({title:"Search Criteria",collapsed:false});			//69995
		
		var helpOnConstraintFormCtrl=		//69995
		[
			plf.addText({"label":"Constraint Code",id:"strConstraintCodeFrom","anywhereSearch":"true"}),
			plf.addText({"label":"Constraint Description",id:"strConstraintDesc"}),
			//plf.addText({"label":"Constraint Code To",id:"strConstraintCodeTo","anywhereSearch":"true"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),			
			plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})			
		]
		helpOnconstraintHdrCollapse.add(helpOnConstraintFormCtrl);
		//Calendar List Header Section Ends
		
		//Calendar Grid Section Begins
		var helpOnconstraintGridFieldObj=			//69995
		[
		    {columnname:"Constraint Code",dataname:"CONSTRAINT_CODE",datatype:"string",width:200},
			{columnname:"Constraint Description",dataname:"CONSTRAINT_DESC",datatype:"string",width:150},
			{columnname:"Start Time",dataname:"START_TIME",datatype:"string",width:100},
			{columnname:"End Time",dataname:"END_TIME",datatype:"string",width:100},
			{columnname:"Continuous Driving",dataname:"CONTINOUS_DRIVING",datatype:"string",width:150},
			{columnname:"Maximum Driving",dataname:"MAXIMUM_DRIVING",datatype:"string",width:150},
		 {columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		var helpOnconstraintGridDtl=		//69995
		{
			title:"",
			id:"constraintDtlCache",
			detail:helpOnconstraintGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true,
			widthBasis:"flex",
		}
		var helpGridSection = plf.addGrid(helpOnconstraintGridDtl,this)		//69995
		mainpage.hlpSearchGridPtr = helpGridSection		
		//Calendar Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnconstraintHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		
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
		this.callParent(arguments);
		
	}
});
