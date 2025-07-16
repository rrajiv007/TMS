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
Ext.define('CueTrans.view.Report.TyreDotDetails', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Tyre Monitoring Report";
		
		plf.columns=4
		mainpage.toolbarSectionFlag=true;
		/*
		mainpage.toolbarLinks=
		[
		]
		*/
		var ReportsColumn = plf.addColumnSection({});
		
		var ReportsFormCtrl=		
		[		
			plf.addText({"label":"Load #",id:"strLoadNoFrom"}),
			plf.addText({"label":"Inspection #",id:"strInspectionNoFrom"}),
			plf.addText({"label":"Vehicle Code",id:"strVehicleCodeFrom"}),
			plf.addCombo({"label":"Compare","id":"strStatus"}),
		    plf.addCombo({"label":"Date Type","id":"strDateType"}),
			plf.addDate({"label":"Date From",id:"dtDateFrom"}),
			plf.addDate({"label":"Date To",id:"dtDateTo"})
		]
		
		ReportsColumn.add(ReportsFormCtrl);
		
		//reports button section
		plf.columns=3
		var ReportsButtonColumn = plf.addColumnSection({});	//69997
		ReportsFormCtrl=
		[ 
		  plf.addBlank(),
		  //plf.addBlank(),
		  plf.addButton({"label":"Show Details",id:"getTyreDot"}),
		  //plf.addButton({"label":"Generate PDF",id:"genPdfTyreDot"}),
		  plf.addBlank()
		
		]	
		
		ReportsGrid=
		[  
        {columnname:"Load #",dataname:"LOAD_NO",datatype:"string",width:"auto"},
        {columnname:"Inspection #",dataname:"INSPECTION_NO",datatype:"string",width:"auto"},		
		{columnname:"Vehicle Code",dataname:"VEH_CODE",datatype:"string",width:"auto"},
		{columnname:"Inspection Date",dataname:"INSPECTION_DATE",datatype:"string",width:"auto"},
		
		{columnname:"Configured Value - Driver Tyre",dataname:"CV_DRIVER_TYRE",datatype:"string",width:"auto"},
		{columnname:"Configured Value - Passenger Tyre",dataname:"CV_PASSENGER_TYRE",datatype:"string",width:"auto"},
		{columnname:"Configured Value - Spare Tyre",dataname:"CV_SPARE_TYRE",datatype:"string",width:"auto"},
		
		{columnname:"Inspection Value - Driver Tyre",dataname:"hndIV_DRIVER_TYRE",datatype:"string",hidden:true},
		{columnname:"Inspection Value - Driver Tyre",dataname:"IV_DRIVER_TYRE",datatype:"string",width:"auto",renderer:function(value, metadata, record) {
					if (record.get('hndIV_DRIVER_TYRE') == '1'){
						metadata.tdCls = metadata.tdCls +"expiryCell";
					}
					else if (record.get('hndIV_DRIVER_TYRE') == '2'){
						metadata.tdCls = metadata.tdCls +"NoExpiryCell";
					}
					return value;
				}},
		
		{columnname:"Inspection Value - Passenger Tyre",dataname:"hndIV_PASSENGER_TYRE",datatype:"string",hidden:true},
		{columnname:"Inspection Value - Passenger Tyre",dataname:"IV_PASSENGER_TYRE",datatype:"string",width:"auto",renderer:function(value, metadata, record) {
					if (record.get('hndIV_PASSENGER_TYRE') == '1'){
						metadata.tdCls = metadata.tdCls +"expiryCell";
					}
					else if (record.get('hndIV_PASSENGER_TYRE') == '2'){
						metadata.tdCls = metadata.tdCls +"NoExpiryCell";
					}
					return value;
				}},
		
		{columnname:"Inspection Value - Spare Tyre",dataname:"hndIV_SPARE_TYRE",datatype:"string",hidden:true},
		{columnname:"Inspection Value - Spare Tyre",dataname:"IV_SPARE_TYRE",datatype:"string",width:"auto",renderer:function(value, metadata, record) {
					if (record.get('hndIV_SPARE_TYRE') == '1'){
						metadata.tdCls = metadata.tdCls +"expiryCell";
					}
					else if (record.get('hndIV_SPARE_TYRE') == '2'){
						metadata.tdCls = metadata.tdCls +"NoExpiryCell";
					}
					return value;
				}},
		{columnname:"Action By",dataname:"ACTION_BY",datatype:"string",width:"auto"},
		{columnname:"Action Date/Time",dataname:"ACTION_DATE_TM",datatype:"string",width:"auto"},
		{columnname:"Action Button",dataname:"ACTION_BUTTON",datatype:"string",width:"auto"}
		]
		ReportsDetails=
		{
			title:"Tyre Details",
			id:"TyreDetails",
			detail:ReportsGrid,
			visibleRow:15,
			removeExport:false,
			readonly:true
		}
		ReportsGridSection = plf.addGrid(ReportsDetails,this)
		ReportsButtonColumn.add(ReportsFormCtrl);
		
		mainpage.ptrMainSection.add(ReportsColumn)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(ReportsButtonColumn) //Add buttons to Main Page

		mainpage.ptrMainSection.add(ReportsGridSection)
		
		
		mainpage.eventHandlers = 
		[	
         { 
				"controlid":"",
				"tasktype":"onload", 
				"input":[""],
				"service":"CoreReportService",
				"methodName":"InitTyreDotDetails"
			},
			{       
				"controlid":"getTyreDot",
				"tasktype":"btnclick", 
				"input":[
				"strLoadNoFrom","strInspectionNoFrom","strVehicleCodeFrom","strStatus",
				"strDateType","dtDateFrom","dtDateTo"
					],
			    "service":"CoreReportService",
				"methodName":"getTyreDotDetailsXL"
			}
			
		];

		
				
		this.callParent(arguments);
		
	}
	

			
});
