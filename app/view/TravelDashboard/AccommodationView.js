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
Ext.define('CueTrans.view.TravelDashboard.AccommodationView', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Accommodation Availability";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=false;
		
		mainpage.toolbarLinks=
		[				
			//{"name":"Transport Dashbord","linkid":"db_transportDash"},
			{"name":"Travel Dashboard","linkid":"db_travelDash"}				
		]	
	   
		
		plf.columns = 4
		var accSchHdrCollapse = plf.addColumnSection({});
		
		var accSchFormCtrl=
		[

			plf.addText({"label":"Date From",id:"dtDateFrom"}),
			plf.addText({"label":"Date To",id:"dtDateTo"}),
			plf.addText({"label":"location",id:"strLocation"}),
			plf.addCombo({"label":"Guest House Code",id:"strCampId"}),
			plf.addText({"label":"Guest House Name",id:"strCampName"}),
			plf.addText({"label":"Room No",id:"strRoomNo",}),
			plf.addCombo({"label":"Room Type",id:"strRoomType"}),
			plf.addButton({"label":"Get Details",id:""})
			
		    
		]
		accSchHdrCollapse.add(accSchFormCtrl);
		
		//Vehicle List Header Section Ends
		
		//Vehicle List Grid Section Begins
		var accSchGridFieldObj=
		[
			{columnname:"Sunday",dataname:"SUNDAY",datatype:"string",width:80,
				renderer:function(value, metadata, record) {
					if (record.get('hdnSUNDAY') == 'A'){
						metadata.tdCls = metadata.tdCls +"availCell";
					}
					else if (record.get('hdnSUNDAY') == ''){
						metadata.tdCls = metadata.tdCls +"freeCell";
					}
					else{
						metadata.tdCls = metadata.tdCls +"unavailCell";
					}
					return value;
				}
			},
			{columnname:"Monday",dataname:"MONDAY",datatype:"string",editControl:"textbox",width:80
				,renderer:function(value, metadata, record) {
					if (record.get('hdnMONDAY') == 'A'){
						metadata.tdCls = metadata.tdCls +"availCell";
					}
					else if (record.get('hdnMONDAY') == ''){
						metadata.tdCls = metadata.tdCls +"freeCell";
					}
					else{
						metadata.tdCls = metadata.tdCls +"unavailCell";
					}
					return value;
				}			
			},
			{columnname:"Tuesday",dataname:"TUESDAY",datatype:"string",width:80
				,renderer:function(value, metadata, record) {
					if (record.get('hdnTUESDAY') == 'A'){
						metadata.tdCls = metadata.tdCls +"availCell";
					}
					else if (record.get('hdnTUESDAY') == ''){
						metadata.tdCls = metadata.tdCls +"freeCell";
					}					
					else{
						metadata.tdCls = metadata.tdCls +"unavailCell";
					}
					return '<span>'+value+'</span>';
				}			
			},
			{columnname:"Wednesday",dataname:"WED",datatype:"string",width:80
				,renderer:function(value, metadata, record) {
					if (record.get('hdnWED') == 'A'){
						metadata.tdCls = metadata.tdCls +"availCell";
					}
					else if (record.get('hdnWED') == ''){
						metadata.tdCls = metadata.tdCls +"freeCell";
					}					
					else{
						metadata.tdCls = metadata.tdCls +"unavailCell";
					}
					return value;
				}			
			},
			{columnname:"Thursday",dataname:"THUR",datatype:"string",width:80
				,renderer:function(value, metadata, record) {
					if (record.get('hdnTHUR') == 'A'){
						metadata.tdCls = metadata.tdCls +"availCell";
					}
					else if (record.get('hdnTHUR') == ''){
						metadata.tdCls = metadata.tdCls +"freeCell";
					}					
					else{
						metadata.tdCls = metadata.tdCls +"unavailCell";
					}
					return value;
				}			
			},
		//	{columnname:"Vehicle Sub Type",dataname:"TRUCK_SUBTYPE",datatype:"string",width:50},
			{columnname:"Friday",dataname:"FRI",datatype:"string",width:80
				,renderer:function(value, metadata, record) {
					if (record.get('hdnFRI') == 'A'){
						metadata.tdCls = metadata.tdCls +"availCell";
					}
					else if (record.get('hdnFRI') == ''){
						metadata.tdCls = metadata.tdCls +"freeCell";
					}					
					else{
						metadata.tdCls = metadata.tdCls +"unavailCell";
					}
					return value;
				}			
			},
			{columnname:"Saturday",dataname:"SAT",datatype:"string",width:80
				,renderer:function(value, metadata, record) {
					if (record.get('hdnSAT') == 'A'){
						metadata.tdCls = metadata.tdCls +"availCell";
					}
					else if (record.get('hdnSAT') == ''){
						metadata.tdCls = metadata.tdCls +"freeCell";
					}					
					else{
						metadata.tdCls = metadata.tdCls +"unavailCell";
					}
					return value;
				}
			},
			
			{columnname:"Sunday",dataname:"hdnSUNDAY",datatype:"string",hidden:true},
			{columnname:"Monday",dataname:"hdnMONDAY",datatype:"string",hidden:true},
			{columnname:"Tuesday",dataname:"hdnTUESDAY",datatype:"string",hidden:true},
			{columnname:"Wednesday",dataname:"hdnWED",datatype:"string",hidden:true},
			{columnname:"Thursday",dataname:"hdnTHUR",datatype:"string",hidden:true},
		//	{columnname:"Vehicle Sub Type",dataname:"TRUCK_SUBTYPE",datatype:"string",width:50},
			{columnname:"Friday",dataname:"hdnFRI",datatype:"string",hidden:true},
			{columnname:"Saturday",dataname:"hdnSAT",datatype:"string",hidden:true}			
		]
		var accSchGridDtl=
		{
			title:"Accommodation Schedule From 01-Aug-2015 to 31-Aug-2015",
			id:"truckList",
			detail:accSchGridFieldObj,
			removeAddDelete:true,
			visibleRow:plf.searchVisibleRows,
			readonly:true,
			removePaging:true,
			removeTbar:true,
			widthBasis:"flex"
		}
		var accSchGridSection = plf.addGrid(accSchGridDtl,this)
		
		accSchGridSection.addCls("c-custom-grid-cls")
		
		var accSchHdrCollapse1 = plf.addColumnSection({});
		var accSchFormCtrl1=
		[

			plf.addBlank({}),
			plf.addButton({"label":"Process Request",id:"btnSearch","tooltip":"Click here to get details."})
			
		    
		]
		accSchHdrCollapse1.add(accSchFormCtrl1);	
	
       
		//Vehicle Grid Section Ends
		
		//Add Child Sections
		
		
		mainpage.ptrMainSection.add(accSchHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(accSchGridSection)
		//mainpage.ptrMainSection.add(accSchHdrCollapse1)

		
      		
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
			[	
				{
					"tasktype":"proto",
					"filename":"peoplelogistics/AccommodationSchedule.json"
				}				
			];	
		//Event Handlers Mapping Ends
	
			mainpage.screenLinks=
			{
			"db_travelDash":
			{
				"dest":"TravelDashboard.ManagementDashboard",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"","dest":""}
						]
			}
		}
	
	
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
		
	}
});
