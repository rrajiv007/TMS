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
Ext.define('CueTrans.view.QueuePlanningDashboard.QueuePlanning',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {
			//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
			var mainpage = this;
			mainpage.startPainting();
			mainpage.screenName = "Queue Planning Dashboard";
			
			// Add Toolbar
			mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=false;
				
			mainpage.toolbarLinks=
			[				
				{"name":"Monthly","linkid":"lnk_monthly"},
				{"name":"Weekly","linkid":"lnk_weekly"},
				{"name":"Six Months","linkid":"lnk_sixmonth"}
			]	
			
			var dayVehViewCtrl=
			[
				mainpage.generateGridColumn("Time","Time"),
				mainpage.generateGridColumn("Total Journey","totalJourney"),
				mainpage.generateGridColumn("","jpCompleted"),
				mainpage.generateGridColumn("","gateEntryComp"),
				
				mainpage.generateGridColumn("","currQueue"),
				mainpage.generateGridColumn("","InspecNotAssigned"),
				mainpage.generateGridColumn("","InsInProg"),
				mainpage.generateGridColumn("","InsSuccess"),
				mainpage.generateGridColumn("","InsRej"),
				mainpage.generateGridColumn("","ReIns")
				
				
			]
			
			var dayVehViewObj=
			{
				title:"",
				id:"dayVw",
				detail:dayVehViewCtrl,
				visibleRow:19,
				readonly:true,
				removePaging:true,				
				removeTbar:true,
				widthBasis:"flex",
				removeColumns:true,
				hideHeaders:true
			}			
				
			var dayVehViewGrid = plf.addGrid(dayVehViewObj,this)
			
			dayVehViewGrid.addCls("c-custom-grid-day")
		
			//currDateTime= plf.addDisplayOnly({id:"strDateTime"})
			
			//mainpage.ptrMainSection.add(currDateTime)
			mainpage.ptrMainSection.add(dayVehViewGrid)
				
			// Event Handlers Mapping Begins
			mainpage.eventHandlers = 
				[	
					{
						"tasktype":"proto",
						"filename":"QueuePlanningDashboard/QueuePlanning.json"
					}
					/*
					,
					{
						"controlid":"",
						"tasktype":"onload",
						"input":[""],
						"service":"PPLCoreTS",
						"methodName":"initRoomAvailTS"
					}				
					*/
				];	
				
				mainpage.screenLinks=
				{
					"lnk_monthly":
					{
						"dest":"QueuePlanningDashboard.MonthlyView",
						"hdr":[
								{"src":"","dest":""}							
								],
						"grid":[
								{"src":"","dest":""}
								]
					},
					"lnk_weekly":
					{
						"dest":"QueuePlanningDashboard.WeeklyView",
						"hdr":[
								{"src":"","dest":""}							
								],
						"grid":[
								{"src":"","dest":""}
								]
					},
					"lnk_sixmonth":
					{
						"dest":"QueuePlanningDashboard.SixMonthly",
						"hdr":[
								{"src":"","dest":""}							
								],
						"grid":[
								{"src":"","dest":""}
								]
					}				
				}
			
				Ext.TaskManager.start({
					run: function()
					{
						var currDate = new Date();
						dayVehViewGrid.setTitle(Ext.Date.format(currDate,"d-F-y H:i:s"));
					},
					interval:1000
				});
		
			this.callParent(arguments);
        },
		generateGridColumn:function(tmpColName,tmpDataCol)
		{
				var gridColObj = 
					{
						"columnname":tmpColName,"dataname":tmpDataCol,"datatype":"string","width":100,
						renderer:function(value, metadata, record,rowIndex,colIndex) {
							
							if(rowIndex==0)
							{
								metadata.tdCls = metadata.tdCls +"c-cal-day-view"+colIndex;
							}
							else
							{
								metadata.tdCls = metadata.tdCls +"availCell";
							}
							console.log("c-cal-day-view"+colIndex)
							/*
							console.log(rowIndex,colIndex)
							if (record.get(tmpDataCol) != ""){
								//metadata.tdCls = metadata.tdCls +"availCell";
								metadata.tdCls = metadata.tdCls  + "c-cal-day-view"+colIndex;
							}
							else {
								metadata.tdCls = metadata.tdCls +"freeCell";
								value ="";
							}
							*/
							return value;
						}
					}	
				return gridColObj;
		}		

    });