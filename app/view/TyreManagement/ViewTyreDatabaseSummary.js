/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	Tyre RFID Inspector Summary                                                                		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.3															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
                                 
************************************************************************************************/
Ext.define('CueTrans.view.TyreManagement.ViewTyreDatabaseSummary', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Tyre Database Summary";
		
		plf.columns=4
		var TyreDatabaseSumHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		mainpage.toolbarSectionFlag=true;
		mainpage.toolbarLinks=
		[
		//{"name":"Update Tyre Database","linkid":"updateTyreDBLink","tooltip":"Click here to update tyre database."}
		]
		
		var TyreDatabaseSumFormCtrl=
		[   
		    plf.addText({"label":"RFID #",id:"strRFID"}),
			plf.addText({"label":"Serial #",id:"strDOT"}),
			plf.addCombo({"label":"Supplier",id:"strSupplier"}),
			plf.addCombo({"label":"Vehicle No",id:"strTruckCode"}),
			plf.addCombo({"label":"Fitment Position",id:"strTyrePosition"})
			

		]
		
		 TyreDatabaseSumHdrCollapse.add(TyreDatabaseSumFormCtrl);									
		//Search Section Ends
		
		//Grid Section Begins
		var TyreDatabaseSumGridFieldObj=		
		[
			{columnname:"RFID #",dataname:"RFID",datatype:"string",width:130},
			{columnname:"Serial #",dataname:"SERIAL",datatype:"string",width:130},
			{columnname:"Supplier",dataname:"SUPPLIER",datatype:"string",width:130},
			
			{columnname:"RFID Date",dataname:"RFID_DATE",datatype:"string",width:130},
			{columnname:"RFID Action By",dataname:"RFID_ACTION_BY",datatype:"string",width:130},
			{columnname:"Tyre Brand",dataname:"TYRE_BRAND",datatype:"string",width:130},
			
			
			{columnname:"Tyre Size",dataname:"TYRE_SIZE",datatype:"string",width:130},
			{columnname:"Pattern",dataname:"PATTERN",datatype:"string",width:130},
			{columnname:"LI/SS",dataname:"LI_SS",datatype:"string",width:130},
			{columnname:"DOT",dataname:"DOT",datatype:"string",width:130},
			{columnname:"Inflation Pressure (PSI)",dataname:"INFLATION_PRESSURE_PSI",datatype:"string",width:160,colAlign:'center'},
			{columnname:"Load per Tyre(Kg)- Single Axle",dataname:"LOAD_PER_TYRE_KG_SINGLE_AXLE",datatype:"string",width:220,colAlign:'center'},
			{columnname:"Load per Tyre(Kg)- Dual Axle",dataname:"LOAD_PER_TYRE_KG_DUAL_AXLE",datatype:"string",width:200,colAlign:'center'},
			
			{columnname:"Speed Symbol(SS) Km/Hr",dataname:"SPEED_SYMBOL_KM_HR",datatype:"string",width:165,colAlign:'center'},
			{columnname:"Vehicle No",dataname:"VEHICLE_NO",datatype:"string",width:130},
			{columnname:"Fitment Action By",dataname:"FITMENT_ACTION_BY",datatype:"string",width:130},
			{columnname:"Fitment Date",dataname:"FITMENT_DATE",datatype:"string",width:130},
			{columnname:"Fitment Initial(Km)",dataname:"FITMENT_INITIAL_KM",datatype:"string",width:130,colAlign:'center'},
			{columnname:"Fitment Position",dataname:"FITMENT_POSITION",datatype:"string",width:130},
			{columnname:"Installation Remarks",dataname:"INSTALLATION_REMARKS",datatype:"string",width:200}
		]
		var TyreDatabaseSumGridDtl=		
		{
			title:"",
			id:"TyreDatabaseSumSummary",
			detail:TyreDatabaseSumGridFieldObj,
			removeAddDelete:true,
			readonly:true,
			visibleRow:12
		}
		var TyreDatabaseSumGridSection = plf.addGrid(TyreDatabaseSumGridDtl,this)
		//Grid Section Ends
		
		//Add Child Sections
			
		mainpage.ptrMainSection.add(TyreDatabaseSumHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(TyreDatabaseSumGridSection) //Add Grid Section to Main Page
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		 	{
			"controlid":"",
			"tasktype":"onload",
			"input":[""],
			"service":"CoreInspectionsService",
			"methodName":"initTyreDatabaseSum"
			
			},
			{
		   "controlid":"btnSearch",
			"tasktype":"btnclick",
			"input":["strRFID","strDOT","strSupplier","strTruckCode","strTyrePosition"],
			"service":"CoreInspectionsService",
			"methodName":"fetchTyreDatabaseSum"
		
			}
		];
		mainpage.hlpLinks=
		{
			
		}
		mainpage.screenLinks=
		{
			"updateTyreDBLink":
				{
					"dest":"TyreManagement.updateTyreDatabaseDtl",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				},
			"grid_updateTyreDBLink":
				{
					"dest":"TyreManagement.updateTyreDatabaseDtl",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"VEHICLE_NO","dest":"strTruckCode"},
							{"src":"RFID","dest":"strRFID"},
							{"src":"SERIAL","dest":"strDOT"},
							{"src":"FITMENT_POSITION","dest":"strTyrePosition"},
							{"src":"SUPPLIER","dest":"strSupplier"},
							{"src":"FITMENT_DATE","dest":"strFitmentDate"}
							]
				}
		}


		this.callParent(arguments);
		
	}
});
