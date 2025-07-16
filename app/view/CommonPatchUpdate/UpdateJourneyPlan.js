/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	Patch  Update                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.5															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.CommonPatchUpdate.UpdateJourneyPlan', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Update Journey Plan";
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
		]	
		
		
		
		//Truck Master Section starts
		var parentForm=mainpage;
		plf.columns=4
			
		var JourneyRelatedButtonColumn = plf.addColumnSection({title:""});	
		JPFormCtrl=
		[
		 plf.addBlank({}),/*
		 plf.addButton({id:"Reverse_JP_Status",label:"Reverse JP Status",tooltip:"Click here to reverse JP status.",   
		 width:170,
							"handler": function() 
							{
								parentForm.launchHlpLink("Reverse_JP")						
							}
                                           }),
		 plf.addBlank({}), */
		 plf.addButton({id:"Update_JP_Distance",label:"Update JP Distance",tooltip:"Click here to update JP distance.",   
		 width:170,
							"handler": function() 
							{
								parentForm.launchHlpLink("JP_Distance_Upd")						
							}
                                           })
											   
		]
		JourneyRelatedButtonColumn.add(JPFormCtrl)
		JourneyRelatedButtonColumn.add(plf.addStripLine({}));
				

		mainpage.ptrMainSection.add(JourneyRelatedButtonColumn)
		
		//History Data Section
		//mainpage.dataHistorySectionFlag=false;
		
		
		
		mainpage.eventHandlers = 
			[	
				/*{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"TMSCoreTransportTS",
					"methodName":"initLoadBasedSearchTS"
				}*/
			];
			
		mainpage.hlpLinks=
		{	
			
			"Reverse_JP":
			{
				"hlpType":"Header",
				"hlpScreen":"CommonPatchUpdate.JPStatusChange",
				"send":[
						{"parent":"","child":""}
						],
				"receive":[
						{"parent":"","child":""}
						]
			},
			"JP_Distance_Upd":
			{
				"hlpType":"Header",
				"hlpScreen":"CommonPatchUpdate.JPDistanceUpdate",
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
