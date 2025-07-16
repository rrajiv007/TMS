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
Ext.define('CueTrans.view.QueuePlanningDashboard.SixMonthly',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Six Monthly View";
			
            // Add Toolbar
            mainpage.toolbarSectionFlag = true;	
			mainpage.liveScreenFlag=false;
			
			var firstRowSection = plf.addGenSection({title:"",cls:""});
			var secRowSection = plf.addGenSection({title:"",cls:""});
			
			var monthVehViewCtrl=
			[
				mainpage.generateGridColumn("Sun","SUN"),
				mainpage.generateGridColumn("Mon","MON"),
				mainpage.generateGridColumn("Tues","TUES"),
				mainpage.generateGridColumn("Wed","WED"),
				mainpage.generateGridColumn("Thurs","THURS"),
				mainpage.generateGridColumn("Fri","FRI"),
				mainpage.generateGridColumn("Sat","SAT")
			]

			var FirstMonViewObj=
			{
				title:"",
				id:"FirstMonVw",
				detail:monthVehViewCtrl,
				visibleRow:12,
				readonly:true,
				removePaging:true,				
				removeTbar:true,
				widthBasis:"flex",
				removeColumns:true,
				columnWidth:.33
			}
			
			var FirstMonViewGrid = plf.addGrid(FirstMonViewObj,this)
			FirstMonViewGrid.addCls("c-six-month-cls")
			FirstMonViewGrid.setStyle("background","#F0E4C0")
			firstRowSection.add(FirstMonViewGrid)

			var SecMonViewObj=
			{
				title:"",
				id:"SecMonVw",
				detail:monthVehViewCtrl,
				visibleRow:12,
				readonly:true,
				removePaging:true,				
				removeTbar:true,
				widthBasis:"flex",
				removeColumns:true,
				columnWidth:.33
			}
			
			var SecMonViewGrid = plf.addGrid(SecMonViewObj,this)
			SecMonViewGrid.addCls("c-six-month-cls")
			SecMonViewGrid.setStyle("background","#c3e8a5")
			firstRowSection.add(SecMonViewGrid)

			var ThirdMonViewObj=
			{
				title:"",
				id:"ThirdMonVw",
				detail:monthVehViewCtrl,
				visibleRow:12,
				readonly:true,
				removePaging:true,				
				removeTbar:true,
				widthBasis:"flex",
				removeColumns:true,
				columnWidth:.33
			}
			
			var ThirdMonViewGrid = plf.addGrid(ThirdMonViewObj,this)
			ThirdMonViewGrid.addCls("c-six-month-cls")
			ThirdMonViewGrid.setStyle("background","#beebf2")
			firstRowSection.add(ThirdMonViewGrid)


			var FourMonViewObj=
			{
				title:"",
				id:"FourMonVw",
				detail:monthVehViewCtrl,
				visibleRow:12,
				readonly:true,
				removePaging:true,				
				removeTbar:true,
				widthBasis:"flex",
				removeColumns:true,
				columnWidth:.33
			}
			
			var FourMonViewGrid = plf.addGrid(FourMonViewObj,this)
			FourMonViewGrid.addCls("c-six-month-cls")
			FourMonViewGrid.setStyle("background","#ebcab0")
			secRowSection.add(FourMonViewGrid)

			var FifthMonViewObj=
			{
				title:"",
				id:"FifthMonVw",
				detail:monthVehViewCtrl,
				visibleRow:12,
				readonly:true,
				removePaging:true,				
				removeTbar:true,
				widthBasis:"flex",
				removeColumns:true,
				columnWidth:.33
			}
			
			var FifthMonViewGrid = plf.addGrid(FifthMonViewObj,this)
			FifthMonViewGrid.addCls("c-six-month-cls")
			FifthMonViewGrid.setStyle("background","#cebeed")
			secRowSection.add(FifthMonViewGrid)

			var SixMonViewObj=
			{
				title:"",
				id:"SixMonVw",
				detail:monthVehViewCtrl,
				visibleRow:12,
				readonly:true,
				removePaging:true,				
				removeTbar:true,
				widthBasis:"flex",
				removeColumns:true,
				columnWidth:.33
			}
			
			var SixMonViewGrid = plf.addGrid(SixMonViewObj,this)
			SixMonViewGrid.addCls("c-six-month-cls")
			SixMonViewGrid.setStyle("background","#d4d4ce")
			secRowSection.add(SixMonViewGrid)

			
			mainpage.ptrMainSection.add(firstRowSection)
			mainpage.ptrMainSection.add(secRowSection)
			
			
			mainpage.toolbarLinks=
			[				
				{"name":"Queue","linkid":"lnk_queue"},
				{"name":"Monthly","linkid":"lnk_monthly"},
				{"name":"Weekly","linkid":"lnk_weekly"}
				
			]	
				
			// Event Handlers Mapping Begins
			mainpage.eventHandlers = 
				[	
					{
						"tasktype":"proto",
						"filename":"QueuePlanningDashboard/SixMonth.json"
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