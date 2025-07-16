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
Ext.define('CueTrans.view.QueuePlanningDashboard.MonthlyView',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

			//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
			var mainpage = this;
			mainpage.startPainting();
			mainpage.screenName = "Monthly View";
			
			// Add Toolbar
			mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=false;
			
			var monthVehViewCtrl=
			[
				mainpage.generateGridColumn("Sunday","SUN"),
				mainpage.generateGridColumn("Monday","MON"),
				mainpage.generateGridColumn("Tuesday","TUES"),
				mainpage.generateGridColumn("Wednesday","WED"),
				mainpage.generateGridColumn("Thursday","THURS"),
				mainpage.generateGridColumn("Friday","FRI"),
				mainpage.generateGridColumn("Saturday","SAT")
			]

			var monthVehViewObj=
			{
				title:"",
				id:"monthlyVw",
				detail:monthVehViewCtrl,
				visibleRow:19,
				readonly:true,
				removePaging:true,				
				removeTbar:true,
				widthBasis:"flex",
				removeColumns:true
			}
			
			var monthVehViewGrid = plf.addGrid(monthVehViewObj,this)
			
			monthVehViewGrid.addCls("c-custom-grid-cls")
			
			mainpage.ptrMainSection.add(monthVehViewGrid)
			
			mainpage.toolbarLinks=
			[				
				{"name":"Queue","linkid":"lnk_queue"},
				{"name":"Weekly","linkid":"lnk_weekly"},
				{"name":"Six Months","linkid":"lnk_sixmonth"}
			]	
				
			// Event Handlers Mapping Begins
			mainpage.eventHandlers = 
				[	
					{
						"tasktype":"proto",
						"filename":"QueuePlanningDashboard/MonthlyView.json"
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
					"lnk_queue":
					{
						"dest":"QueuePlanningDashboard.QueuePlanning",
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
			
			
			this.callParent(arguments);
        },
		generateGridColumn:function(tmpColName,tmpDataCol)
		{
				var gridColObj = 
					{
						"columnname":tmpColName,"dataname":tmpDataCol,"datatype":"string","width":100,
						renderer:function(value, metadata, record) {
							if (record.get(tmpDataCol) != ""){
								metadata.tdCls = metadata.tdCls +"availCell";
							}
							else {
								metadata.tdCls = metadata.tdCls +"freeCell";
								value ="";
							}
							return value;
						}
					}	
				return gridColObj;
		}		

    });