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
Ext.define('CueTrans.view.PDOFinance.PDOViewTripDetails', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.5;
		mainpage.popupWidthRatio=.80;
		
		mainpage.startPainting();
		mainpage.screenName = "View Trip Details";
		
		//mainpage.liveScreenFlag=false;
		mainpage.liveScreenFlag=true;
      
			
		plf.columns = 3
		var finInvSumHdrCollapse = plf.addColumnSection({});		
		
		var finInvSumFormCtrl=										
		[
			plf.addDisplayOnly({"label":"Trip No",id:"strTripSheetNo"}),
			plf.addDisplayOnly({"label":"Trip Sheet Date",id:"dtTripDate"}),
			plf.addDisplayOnly({"label":"Trip Closure Date",id:"dtCloseDate"}),
			plf.addDisplayOnly({"label":"Contract No",id:"strContractNo"}),
			plf.addDisplayOnly({"label":"Contractor Name",id:"strContractNm"}), 
			plf.addDisplayOnly({"label":"Vehicle Regn No",id:"strVehCode"}),
			
		]
		
		finInvSumHdrCollapse.add(finInvSumFormCtrl);
	
		
		
		var finInvSumGridFieldObj=			
		[
			{columnname:"Journey Plan No",dataname:"JP_NO",datatype:"string",width:120},
			{columnname:"Load No",dataname:"LOAD_NO",datatype:"string",width:90},
			{columnname:"Load Type",dataname:"LOAD_TYPE",datatype:"string",width:100},
			{columnname:"Load Category",dataname:"LOAD_CAT",datatype:"string",width:120},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:150},
			{columnname:"Finance Region From",dataname:"FIN_FROM",datatype:"string",width:150},
			{columnname:"Destination",dataname:"DEST",datatype:"string",width:150},
			{columnname:"Finance Region To",dataname:"FIN_TO",datatype:"string",width:150},
			{columnname:"Load Weight",dataname:"LOAD_WT",datatype:"string",width:100},
			{columnname:"Load Distance",dataname:"LOAD_DIST",datatype:"string",width:100},
			{columnname:"Start Time",dataname:"START_TIME",datatype:"string",width:110},
			{columnname:"End Time",dataname:"END_TIME",datatype:"string",width:110},
			{columnname:"Journey Type",dataname:"JOURNEY_TYPE",datatype:"string",width:110},
			{columnname:"JP Exception",dataname:"JP_EXCEPTION",datatype:"string",width:300}
			
			
		]
		var finInvSumGridDtl=			
		{
			title:"Trip Summary",
			id:"tripsumGrid",
			detail:finInvSumGridFieldObj,
			visibleRow:5,
			readonly:true,
			removeAddDelete:true,
			//widthBasis:"flex",
			removeTbar:true,
			removePaging:true
		}
		
		//charge Grid Section Ends
		
		//Add Child Sections
	   
		mainpage.ptrMainSection.add(finInvSumHdrCollapse)//Add Header Section to Main Page
		var InvSumSection=plf.addGrid(finInvSumGridDtl,this)			
		mainpage.InvSumGridPtr = InvSumSection
		mainpage.ptrMainSection.add(InvSumSection) 
		
	// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
		
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strTripSheetNo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"finTripDetalsPoupTS"
			}/*,
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strInvoiceFrom","dtInvoiceDesc","strStatus","dtInvoiceFromDate","dtInvoiceToDate"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"fetchPDOCarSummaryTS"
			}
			*/
			
			/*{
				
					"tasktype":"proto",
					"filename":"PDOFinance/PDOViewTripDetails.json"
			}*/

		];
		
		
		
		this.callParent(arguments);
		
	}
});
