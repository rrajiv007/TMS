/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	Coastal Performance Configuration                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.0															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.COASTAL_PERF_CONFI.CoastalPerformanceConfiguration', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Coastal Performance Configuration";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
		]	
		
		
		
		var parentForm=mainpage;
		plf.columns=4
			
		var OrgGrpRelatedButtonColumn = plf.addColumnSection({title:"This section is to manage the origin group for the coastal performance report"});	
		OrgGrpFormCtrl=
		[
		 

		plf.addButton({id:"Origin_Group_Configuration",label:"Origin Group Configuration",tooltip:"Click here to group origin for coastal performance report.", 
        width:210,		
							"handler": function() 
							{
								parentForm.launchHlpLink("Org_Grp_Confi")						
							}
                                           })					   
		]
		OrgGrpRelatedButtonColumn.add(OrgGrpFormCtrl)
		OrgGrpRelatedButtonColumn.add(plf.addStripLine({}));
		
		plf.columns=4
			
		var SLARelatedButtonColumn = plf.addColumnSection({title:"This section is to manage SLA for the coastal performance report"});	
		ShipFormCtrl=
		[
		 //plf.addBlank({}),
		 
		 plf.addButton({id:"SLA_FOR_RAMADAN",label:"Considering as Ramadan",tooltip:"Click here to configure SLA considering as Ramadan.",    
		 width:210,
							"handler": function() 
							{
								parentForm.launchHlpLink("SLA_Ramadan")						
							}
                                           }), 
		
         plf.addButton({id:"SLA_FOR_NONRAMADAN",label:"Considering Not as Ramadan",tooltip:"Click here to configure SLA considering not as Ramadan.",    
		 width:215, 
							"handler": function() 
							{
								parentForm.launchHlpLink("SLA_NonRamadan")						
							}
                                           })
		//plf.addBlank({}),
		//plf.addBlank({})
		]
		SLARelatedButtonColumn.add(ShipFormCtrl)
		SLARelatedButtonColumn.add(plf.addStripLine({}));
		
			
		
		
		
		mainpage.ptrMainSection.add(OrgGrpRelatedButtonColumn)
		mainpage.ptrMainSection.add(SLARelatedButtonColumn)

		
		//History Data Section
		//mainpage.dataHistorySectionFlag=false;
		
		
		
		mainpage.eventHandlers = 
			[	
				
			];
			
		mainpage.hlpLinks=
		{	

			"Org_Grp_Confi":
			{
				"hlpType":"Header",
				"hlpScreen":"COASTAL_PERF_CONFI.OriginGrpConfiguration",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			},

			"SLA_Ramadan":
			{
				"hlpType":"Header",
				"hlpScreen":"COASTAL_PERF_CONFI.SLAForRamadan",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			},
			"SLA_NonRamadan":
			{
				"hlpType":"Header",
				"hlpScreen":"COASTAL_PERF_CONFI.SLAForNonRamadan",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			}
         }			
		
		mainpage.screenLinks=
		   {

		    }
		this.callParent(arguments);
		
	
	}
});
