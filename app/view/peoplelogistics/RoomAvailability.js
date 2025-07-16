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
Ext.define('CueTrans.view.peoplelogistics.RoomAvailability', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Room Availability";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;
		mainpage.hlpSectionFlag=true;
		
		plf.columns = 4
		var accSchHdrCollapse = plf.addColumnSection({});
		
		var accSchFormCtrl=
		[

			//plf.addText({"label":"Date From",id:"dtDateFrom"}),
			//plf.addText({"label":"Date To",id:"dtDateTo"}),
			plf.addCombo({"label":"View Availability By",id:"strViewBy"}),
			plf.addCombo({"label":"Guest House",id:"strGuestHouse"}),
			plf.addCombo({"label":"Room Type",id:"strRoomType"})
		]
		accSchHdrCollapse.add(accSchFormCtrl);
		
		var availabilityGridPrevNextBtn = [
			plf.addButton({label:"Prev"}),
			plf.addButton({label:"Next"})
		]
		
		//Vehicle List Header Section Ends
		
		//Vehicle List Grid Section Begins
		var accSchGridFieldObj=
		[
			/*
			mainpage.generateGridColumn("Sunday","SUNDAY"),
			mainpage.generateGridColumn("Monday","MONDAY"),
			mainpage.generateGridColumn("Tuesday","TUESDAY"),
			mainpage.generateGridColumn("Wednesday","WED"),
			mainpage.generateGridColumn("Thursday","THUR"),
			mainpage.generateGridColumn("Friday","FRI"),
			mainpage.generateGridColumn("Saturday","SAT"),
			*/
			{columnname:"Guest House",dataname:"GUEST_CODE",datatype:"string",width:80},
			{columnname:"Room No",dataname:"ROOM_NO",datatype:"string",width:50},
			
			mainpage.generateGridColumn("18","D1"),
			mainpage.generateGridColumn("19","D2"),
			mainpage.generateGridColumn("20","D3"),
			mainpage.generateGridColumn("21","D4"),
			mainpage.generateGridColumn("22","D5"),
			mainpage.generateGridColumn("23","D6"),
			mainpage.generateGridColumn("24","D7"),
			mainpage.generateGridColumn("25","D8"),
			mainpage.generateGridColumn("26","D9"),
			mainpage.generateGridColumn("27","D10"),

			mainpage.generateGridColumn("29","D11"),
			mainpage.generateGridColumn("30","D12"),
			mainpage.generateGridColumn("31","D13"),
			mainpage.generateGridColumn("1","D14"),
			mainpage.generateGridColumn("2","D15"),
			mainpage.generateGridColumn("3","D16"),
			mainpage.generateGridColumn("4","D17"),
			mainpage.generateGridColumn("5","D18"),
			mainpage.generateGridColumn("6","D19"),
			mainpage.generateGridColumn("7","D20"),

			mainpage.generateGridColumn("8","D21"),
			mainpage.generateGridColumn("9","D22"),
			mainpage.generateGridColumn("10","D23"),
			mainpage.generateGridColumn("11","D24"),
			mainpage.generateGridColumn("12","D25"),
			/*
			mainpage.generateGridColumn("13","D26"),
			mainpage.generateGridColumn("14","D27"),
			mainpage.generateGridColumn("15","D28"),
			mainpage.generateGridColumn("16","D29"),
			mainpage.generateGridColumn("17","D30"),
			

			
			{dataname:"hdnD1",datatype:"string",hidden:true},
			{dataname:"hdnD2",datatype:"string",hidden:true},
			{dataname:"hdnD3",datatype:"string",hidden:true},
			{dataname:"hdnD4",datatype:"string",hidden:true},
			{dataname:"hdnD5",datatype:"string",hidden:true},
			{dataname:"hdnD6",datatype:"string",hidden:true},
			{dataname:"hdnD7",datatype:"string",hidden:true},
			{dataname:"hdnD8",datatype:"string",hidden:true},
			{dataname:"hdnD9",datatype:"string",hidden:true},
			{dataname:"hdnD10",datatype:"string",hidden:true}
			*/
			/*
			{columnname:"Sunday",dataname:"hdnSUNDAY",datatype:"string",hidden:true},
			{columnname:"Monday",dataname:"hdnMONDAY",datatype:"string",hidden:true},
			{columnname:"Tuesday",dataname:"hdnTUESDAY",datatype:"string",hidden:true},
			{columnname:"Wednesday",dataname:"hdnWED",datatype:"string",hidden:true},
			{columnname:"Thursday",dataname:"hdnTHUR",datatype:"string",hidden:true},
		//	{columnname:"Vehicle Sub Type",dataname:"TRUCK_SUBTYPE",datatype:"string",width:50},
			{columnname:"Friday",dataname:"hdnFRI",datatype:"string",hidden:true},
			{columnname:"Saturday",dataname:"hdnSAT",datatype:"string",hidden:true}			
			*/
		]
		var accSchGridDtl=
		{
			title:"",
			id:"roomAvailabiltyGrid",
			detail:accSchGridFieldObj,
			removeAddDelete:true,
			visibleRow:12,
			readonly:true,
			removePaging:true,
			removeTbar:true
			//widthBasis:"flex",
			//tool:availabilityGridPrevNextBtn
		}
		var accSchGridSection = plf.addGrid(accSchGridDtl,this)

		/*
		 Ext.define('roomAvailabiltyGrid_col_model', {
			 extend: 'Ext.data.Model',
			 requires: ['Ext.data.identifier.Sequential'],
			 idProperty: 'id',
			 identifier: 'sequential',
			 fields: [
				 {name: 'colid', type: 'string'},
				 {name: 'colname', type: 'string'}
			 ]
		 });	
		 */

		 /*
		 var roomAvailabiltyGrid_col_store = Ext.create("Ext.data.Store", {
			 storeId: 'roomAvailabiltyGrid_col_store',
			 model: 'roomAvailabiltyGrid_col_model'
		});
		
		roomAvailabiltyGrid_col_store.on("endupdate",
			function(){
					roomAvailabiltyGrid_col_store.each( function(colGridRec)
					{
						accSchGridSection.columns[colGridRec.get("colid")].setText(colGridRec.get("colname"))
					})
			}
		)
		*/
		
		var accSchHdrCollapse1 = plf.addColumnSection({});
		var accSchFormCtrl1=
		[

			plf.addBlank({}),
			plf.addButton({"label":"Process Request",id:"btnSearch","tooltip":"Click here to get details."})
			
		    
		]
		accSchHdrCollapse1.add(accSchFormCtrl1);	
	
       
		//Vehicle Grid Section Ends
		
		//Add Child Sections
		
		
		//mainpage.ptrMainSection.add(accSchHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(accSchGridSection)
		//mainpage.ptrMainSection.add(accSchHdrCollapse1)

		
      		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
			[	
			
				{
					"tasktype":"proto",
					"filename":"peoplelogistics/AccommodationSchedule.json"
				},
				{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"PPLCoreTS",
					"methodName":"initRoomAvailTS"
				}				
				
			];	
		//Event Handlers Mapping Ends
	
		//Event Handle
		
		//Generate Screen Section
	/*	mainpage.generateScreen();

		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
	},
	generateGridColumn:function(tmpColName,tmpDataCol)
	{
			var gridColObj = 
				{
					"columnname":tmpColName,"dataname":tmpDataCol,"datatype":"string","width":35,
					renderer:function(value, metadata, record) {
						if (record.get(tmpDataCol) > 0){
							metadata.tdCls = metadata.tdCls +"availCell";
						}
						else if(record.get(tmpDataCol) == 0) {
							metadata.tdCls = metadata.tdCls +"unavailCell";
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
