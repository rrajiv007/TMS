Ext.define('CueTrans.view.FXADMIN.RateCard', 
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
		mainpage.screenName = "Rate Card";
		mainpage.toolbarSectionFlag=true;		
		mainpage.toolbarActions= 
		[	
			{
                "name": "Save",
                "tooltip": "Click here to save rate card"
            }
		]
		//Header Section starts
		plf.columns=5
		var HdrSection = plf.addColumnSection({title:"Rate Card Details"},this);		
		var HdrSectionCtrl=
		[
			plf.addCombo({"label":"From Region",id:"strRegionFrom","mandatory":"true"}),
			plf.addCombo({"label":"To Region",id:"strRegionTo","mandatory":"true"}),
			plf.addText({"label":"Standard Rate(OMR)",id:"strStdRate",inputFormat:"numeric",weightPrecision:"3","mandatory":"true"}),
			plf.addText({"label":"Discount %",id:"strDiscount",inputFormat:"numeric",weightPrecision:"3"}),
			plf.addDisplayOnly({"label":"Price(OMR)",id:"strPrice"})
		]		
		HdrSection.add(HdrSectionCtrl);
		//Header Section Ends
		
		
		var RateObj=
		 [	
			{columnname:"From Region",dataname:"FROM_REGION",datatype:"string",width:230,editControl:"combo",storeId:"strGrdRegionFrom"},
            {columnname:"To Region",dataname:"TO_REGION",datatype:"string",width:230,editControl:"combo",storeId:"strGrdRegionTo"},
			{columnname:"Standard Rate(OMR)",dataname:"STD_RATE",datatype:"string",width:230,editControl:"textbox",inputFormat:"numeric",weightPrecision:"3"},
			{columnname:"Additional Cost(OMR)",dataname:"ADDITIONAL_COST",datatype:"string",width:230,editControl:"textbox",inputFormat:"numeric",weightPrecision:"3"},
			{columnname:"Insurance Cost(OMR)",dataname:"INSURANCE_COST",datatype:"string",width:230,editControl:"textbox",inputFormat:"numeric",weightPrecision:"3"},
			{columnname:"Type",dataname:"TYPE",datatype:"string",width:130,editControl:"combo",storeId:"strGrdType"},
			{columnname:"Min Weight(tons)",dataname:"MIN_WT",datatype:"string",width:150,editControl:"textbox",inputFormat:"numeric",weightPrecision:"3"},
			{columnname:"Max Weight(tons)",dataname:"MAX_WT",datatype:"string",width:150,editControl:"textbox",inputFormat:"numeric",weightPrecision:"3"}
            //{columnname:"Discount %",dataname:"DISCOUNT",datatype:"string",width:230,editControl:"textbox",inputFormat:"numeric",weightPrecision:"2"},
			//{columnname:"Price(OMR)",dataname:"PRICE",datatype:"string",width:230,inputFormat:"numeric",weightPrecision:"2"}
			
		 ]
		 var RateGridDtl=			
		{
			title:"Rate Details",
			id:"ratedtl",
			detail:RateObj,
			visibleRow:13,
			removepaging:true
		}	
	
		var RateGridSection = plf.addGrid(RateGridDtl,this)
		
		//adding the control to the mainpage
		//mainpage.ptrMainSection.add(HdrSection)
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
				"methodName":"FXPORTAL_INITRATECARDTS"
		      },
			  {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["ratedtl"],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_SAVERATETS"
			  }/*			  
			  {
				"controlid":"strRegionFrom",
				"tasktype":"onchange",
				"input":["strRegionFrom"],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_RATEONCHANGEFROMREGTS"
			 },
			 {
				"controlid":"strRegionTo",
				"tasktype":"onchange",
				"input":["strRegionTo"],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_RATEONCHANGETOREGTS"
		     },
			 ,
			 {       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Calculate",
				"input":["strRegionFrom","strRegionTo","strStdRate","strDiscount"],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_CALCULATERATETS"
			 }
			 */            
			];
		
		this.callParent(arguments);
		
	
	}
});
