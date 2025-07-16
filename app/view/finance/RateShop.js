/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1		Bhuvan			05-Feb-2016	  69995	                           Added var for all local variable
************************************************************************************************/
Ext.define('CueTrans.view.finance.RateShop', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		//mainpage.hlpSectionFlag=true
		mainpage.startPainting();
		
		mainpage.screenName = "Rate Shop";
		
			
		plf.columns = 3
		var rateShopHdrCollapse = plf.addColumnSection({title:""},this);			//69995
		
		var rateShopFormCtrl=														//69995
		[
			plf.addDisplayOnly({"label":"Request No",id:"strRequestNo"}),
			plf.addDisplayOnly({"label":"Customer Code",id:"strCustCode"}),
			plf.addDisplayOnly({"label":"Customer Name",id:"strCustName"})
		]
		
		rateShopHdrCollapse.add(rateShopFormCtrl);
	
		
		
		var rateShopGridFieldObj=							//69995
		[
			{columnname:"Service Item Code",dataname:"SERVICE_ITEM",datatype:"string",width:150},
			{columnname:"Description",dataname:"SERVICE_ITEM_DESC",datatype:"string",width:150},
			{columnname:"Amount",dataname:"AMOUNT",datatype:"string",width:100},
			{editControl:"button","label":"select",id:"cmn_select",datatype:"string",width:100,
			"tooltip":"Click here to select the service item."}
			
		]
		var rateShopGridDtl=								//69995
		{
			title:"",
			id:"serItemGrid",
			detail:rateShopGridFieldObj,
			visibleRow:5,
			readonly:true,	
			removePaging:true,			
			removeTbar:true
		}
		
		chargeHdrCollapse = plf.addColumnSection({title:"Charges"},this);
		
		var chargeFormCtrl=				//69995
		[
			plf.addDisplayOnly({"label":"Service Item Code",id:"strServiceItem"}),
			plf.addDisplayOnly({"label":"Description",id:"strServiceDesc"}),
			plf.addDisplayOnly({"label":"Amount",id:"iAmount"})
		]
		
		chargeHdrCollapse.add(chargeFormCtrl);
		
		var chargeGridFieldObj=				//69995
		[
			{columnname:"Charge Code",dataname:"CHARGE_CODE",datatype:"string",width:150},
			{columnname:"Charge Description",dataname:"CHARGE_DESC",datatype:"string",width:150},
			{columnname:"Nature of Charge",dataname:"NAT_CHG",datatype:"string",width:150},
			{columnname:"Amount",dataname:"AMOUNT",datatype:"string",width:100}
		]
		var chargeGridDtl=						//69995
		{
			title:"",
			id:"chargeGrid",
			detail:chargeGridFieldObj,
			visibleRow:5,
			readonly:true,			
			removeTbar:true
		}
		
		//charge Grid Section Ends
		
		buttonHdrCollapse = plf.addColumnSection({title:""},this);
		
		var buttonFormCtrl=			//69995
		[
			plf.addButton({"label":"OK",id:"cmn_btnok","tooltip":"Click here to select the service item."})
		]
		
		buttonHdrCollapse.add(buttonFormCtrl);
		
		//Add Child Sections
	
		mainpage.ptrMainSection.add(rateShopHdrCollapse)//Add Header Section to Main Page
		
		serviceGridSection=plf.addGrid(rateShopGridDtl,this)	
		mainpage.hlpSearchGridPtr = serviceGridSection
		mainpage.ptrMainSection.add(serviceGridSection)
		
		mainpage.ptrMainSection.add(chargeHdrCollapse) 
		
		var chargeGridSection=plf.addGrid(chargeGridDtl,this)			//69995
		mainpage.hlpSearchGridPtr = chargeGridSection
		mainpage.ptrMainSection.add(chargeGridSection)
		
		mainpage.ptrMainSection.add(buttonHdrCollapse) 
		
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
			
			{
				"controlid":"",
				"tasktype":"onload",
				"input":["strRequestNo"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"initRateShopTS"
			}
			/*,
			{
				"controlid":"searchBtn",
				"tasktype":"btnclick",
				"input":["strFinYearCodeFrom","strFinYearCodeTo","strStatus","strFinYearDesc","dtStartDate","dtEndDate"],
				"service":"FINCoreFinanceServiceTS",
				"methodName":"fetchAllFinCalTS"
			}
			*/
		];
	
		this.callParent(arguments);
		
	}
});
