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
Ext.define('CueTrans.view.PDOFinance.PDOCarrierPendingTrip', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Pending Trip Closure";
		mainpage.toolbarSectionFlag=true;
		
		plf.columns = 4
		var CarPenTripCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch",},this);
		
		
		var VehHisFormCtrl=															
		[
			plf.addDate({"label":"Trip Sheet Date From",id:"dtInvoiceFromDate"}),	
			plf.addDate({"label":"Trip Sheet Date To",id:"dtInvoiceToDate"})
			
		]
		
		CarPenTripCollapse.add(VehHisFormCtrl);
		
		var GridFieldObj=
		[
			{columnname:"Trip No",dataname:"TRIP_NO",datatype:"string",width:150,linkId:"finTripView",gridpopup:true,"tooltip":"Click here to view trip details."},
			{columnname:"Trip Sheet Date",dataname:"TRIP_DATE",datatype:"string",width:150},
			{columnname:"Contract No",dataname:"CONTRACT_NO",datatype:"string",width:150},
			{columnname:"Contractor Name",dataname:"CONTRACT_NAME",datatype:"string",width:150},
			{columnname:"Vehicle Regn No",dataname:"VEH_NO",datatype:"string",width:150}	
		]
		var finGridDtl=			
		{
			title:"",
			id:"trippending",
			detail:GridFieldObj,
			visibleRow:13,
			readonly:true,
			removeAddDelete:true,
			widthBasis:"flex"
		}
		
		
		
		//Add Child Sections
	
		
		var InvSection=plf.addGrid(finGridDtl,this)	
		
		mainpage.ptrMainSection.add(CarPenTripCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(InvSection) 
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOinitCarPendTripTS"
			},
            {
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["dtInvoiceFromDate","dtInvoiceToDate"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"PDOSearchCarPNTripTS"
			}				
		];
		mainpage.gridPopupLinks=
		{
			"finTripView":
			{
				"dest":"PDOFinance.PDOViewTripPNDetails",
				"popMethodName":"finTripPendPoupTS",
				"hdr":[
						{"src":"","dest":""}							
						],
				"grid":[
						{"src":"TRIP_NO","dest":"strTripSheetNo"}
						]
			}
		}
		this.callParent(arguments);
		
	}
});
