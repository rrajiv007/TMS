Ext.define('CueTrans.view.FXADMIN.LoadingUnloading', 
/****************************************************************************************************************
                                          Modification History                                                                                                                                                                                
****************************************************************************************************************               
Description           :                                                                                                                      
Author                :  FX
Version               :  1.0.0

****************************************************************************************************************               
Version              Modified By      Date               Defect ID                 Remarks            
****************************************************************************************************************               
****************************************************************************************************************/
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Loading & Unloading Charges";
		mainpage.toolbarSectionFlag=true;		
		mainpage.toolbarActions= 
		[	
			{
                "name": "Save",
                "tooltip": "Click here to save rate card"
            }
		]
		
		var RateObj=
		 [	
			{columnname:"Region",dataname:"FROM_REGION",datatype:"string",width:230,editControl:"combo",storeId:"strGrdRegionFrom"},            
			{columnname:"Charges per ton",dataname:"STD_RATE",datatype:"string",width:230,editControl:"textbox",inputFormat:"numeric",weightPrecision:"3"}
		 ]
		 var RateGridDtl=			
		{
			title:"Loading & Unloading Charges",
			id:"ratedtl",
			detail:RateObj,
			visibleRow:13,
			removepaging:true
		}	
	
		var RateGridSection = plf.addGrid(RateGridDtl,this)
		

		mainpage.ptrMainSection.add(RateGridSection)
		//History Data Section
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[
				  
               {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_INITLOADUNLOADTS"
		      },
			  {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["ratedtl"],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_SAVELOADUNLOADTS"
			  }         
			];
		
		this.callParent(arguments);
		
	
	}
});
