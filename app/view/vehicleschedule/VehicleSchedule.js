/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var		                                   
************************************************************************************************/
Ext.define('CueTrans.view.vehicleschedule.VehicleSchedule', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Truck Schedule";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarActions=["Refresh","Create","Maintain"]
		
		
		//Add Keyfields
		mainpage.keyFields=[""]
		
		

		var formCtrl=[];
		plf.columns=4
		var truckScheduleColumn = plf.addColumnSection({});	//69997
		if(plf.defaultLayout==3)
		{
			plf.columns=3
			
			var truckScheduleFormCtrl=						//69997
			[
				plf.addText({"label":"Schedule Id","id":"strScheduleId","mandatory":"true"}),
				plf.addText({"label":"Description","id":"strDescription","mandatory":"true"}),
				plf.addDate({"label":"From Date","id":"dtFromDate","mandatory":"true"}),
				plf.addDate({"label":"To Date","id":"dtToDate","mandatory":"true"})
				
			]
		
		}
		
		else
		{
		  	truckScheduleFormCtrl=
			[
				plf.addText({"label":"Schedule Id","id":"strScheduleId"}),
				plf.addText({"label":"Description","id":"strDescription","mandatory":"true"}),
				plf.addDate({"label":"From Date","id":"dtFromDate","mandatory":"true"}),
				plf.addDate({"label":"To Date","id":"dtToDate","mandatory":"true"})
			]

			
		}	
		
		var vehRequestGridFieldObj=								//69997
		[   
			{columnname:"Date",dataname:"SCHDATE",datatype:"string",editControl:"date",width:140},
			{columnname:"Time",dataname:"SCHTIME",datatype:"string",editControl:"textbox",width:100},
			{columnname:"Truck Category",dataname:"TRUCK_CATEGORY",datatype:"string",storeId:"strTruckCategory",editControl:"combo",width:200},
			{columnname:"No Of Vehicles",dataname:"NO_OF_VEHICLES",datatype:"string",width:100,editControl:"textbox"},
			{columnname:"From Location",dataname:"FROM_LOCATION",datatype:"string",width:200,editControl:"textbox"},
			{columnname:"To Location",dataname:"TO_LOCATION",datatype:"string",width:150,editControl:"textbox"}
			
			
		]
		vehReqGridDtl=
		{
			title:"",
			id:"trkschedule",
			detail:vehRequestGridFieldObj,
		
		}
		var vehSchGridSection = plf.addGrid(vehReqGridDtl)		//69997
		
		
		 truckScheduleColumn.add(truckScheduleFormCtrl);	
		mainpage.ptrMainSection.add(truckScheduleColumn);
		mainpage.ptrMainSection.add(vehSchGridSection);
		
		mainpage.dataHistorySectionFlag=true;
		
			mainpage.eventHandlers = 
			[
                  {
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"CoreTruckSchedule",
					"methodName":"initTruckSchduleTS"
			},
			 {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Maintain",
				"input":["strScheduleId","strDescription","dtFromDate","dtToDate","trkschedule"],
				"service":"CoreTruckSchedule",
				"methodName":"maintainTrkScheduleTS"
			},
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Create",
				"input":["strScheduleId","strDescription","dtFromDate","dtToDate","trkschedule"],
				"service":"CoreTruckSchedule",
				"methodName":"createTrkScheduleTS"
			},
			{
					"controlid":"strScheduleId",
					"tasktype":"onenter",
					"input":["strScheduleId"],
					"service":"CoreTruckSchedule",
					"methodName":"fetchTrkScheduleTS"
			}
              				
			];
			
				this.callParent(arguments);
		
	
	}
});