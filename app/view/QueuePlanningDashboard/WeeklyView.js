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
Ext.define('CueTrans.view.QueuePlanningDashboard.WeeklyView',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Weekly View";
			
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=false;
			
			var weeklyVehViewCtrl=
			[
				mainpage.generateGridColumn("Sunday","SUN"),
				mainpage.generateGridColumn("Monday","MON"),
				mainpage.generateGridColumn("Tuesday","TUES"),
				mainpage.generateGridColumn("Wednesday","WED"),
				mainpage.generateGridColumn("Thursday","THURS"),
				mainpage.generateGridColumn("Friday","FRI"),
				mainpage.generateGridColumn("Saturday","SAT")
			]

			var weeklyVehViewObj=
			{
				title:"",
				id:"weeklyVw",
				detail:weeklyVehViewCtrl,
				visibleRow:19,
				readonly:true,
				removePaging:true,				
				removeTbar:true,
				widthBasis:"flex",
				removeColumns:true
			}
			
			var weeklyVehViewGrid = plf.addGrid(weeklyVehViewObj,this)
			
			weeklyVehViewGrid.addCls("c-custom-grid-weekly")
			
			mainpage.ptrMainSection.add(weeklyVehViewGrid)
			
			mainpage.toolbarLinks=
			[				
				{"name":"Queue","linkid":"lnk_queue"},
				{"name":"Monthly","linkid":"lnk_monthly"},
				{"name":"Six Months","linkid":"lnk_sixmonth"}
				
			]	
				
			// Event Handlers Mapping Begins
			mainpage.eventHandlers = 
				[	
					{
						"tasktype":"proto",
						"filename":"QueuePlanningDashboard/WeeklyView.json"
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
					"lnk_sixmonth":
					{
						"dest":"QueuePlanningDashboard.SixMonthly",
						"hdr":[
								{"src":"","dest":""}							
								],
						"grid":[
								{"src":"","dest":""}
								]
					},
					"lnk_queue":
					{
						"dest":"QueuePlanningDashboard.QueuePlanning",
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
						renderer:function(value, metadata, record,rowIndex,colIndex) {
							console.log(rowIndex,colIndex)
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