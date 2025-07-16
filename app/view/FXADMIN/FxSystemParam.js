/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	Divya																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/
Ext.define('CueTrans.view.FXADMIN.FxSystemParam', 
{
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function() 
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "System Parameter";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
 
		mainpage.toolbarActions= [
			{
                "name": "Save",
                "tooltip": "Click here to save a system parameter."
            }
            ]	
		
		//hdr Starts
		plf.columns=1
		var sysparamHdrColumn = plf.addColumnSection({title:""});				
		var sysparamFormCtrl=																			
		[
		plf.addBlank(),
	
		plf.addHlpText({"labelWidth":480,"label":"Item Code",id:"strItemDesc","mandatory":"true",inputFormat:"string",hlpLinkID:"itemhelp",columnWidth:.25},this),
		
		plf.addHlpText({"labelWidth":480,"label":"Cost Center Code",id:"strCostCenter","mandatory":"true",inputFormat:"string",hlpLinkID:"CostCenter",columnWidth:.25},this),
		
		plf.addText({"labelWidth":480,"label":"Planning Window (duration)",id:"strPlanWindow","mandatory":"true",inputFormat:"integer",columnWidth:.25}),
		
		plf.addCombo({"labelWidth":480,"label":"Vehicle Category",id:"strVehicleCat","mandatory":"true",columnWidth:.25}),
			
		plf.addText({"labelWidth":480,"label":"Map Radius Search(km)",id:"strMapRadius","mandatory":"true",inputFormat:"integer",columnWidth:.25}),
		plf.addText({"labelWidth":480,"label":"Cut-off Time(Hrs)",id:"strCutOffTime","mandatory":"true",inputFormat:"integer",columnWidth:.25}),
		]		
		sysparamHdrColumn.add(sysparamFormCtrl);
		
		var MaxPanel = plf.addColumnSection({title:"Maximum Value"});
		var MaxPanelCtrl=																			
		[
		plf.addBlank(),
	
		plf.addText({"labelWidth":480,"label":"Quantity",id:"strMaxQuantity","mandatory":"true",inputFormat:"integer",/*weightPrecision:"2",*/columnWidth:.25,InputLength:"6"}),
		plf.addText({"labelWidth":480,"label":"Weight(tons)",id:"strMaxWeight","mandatory":"true",inputFormat:"numeric",weightPrecision:"2",columnWidth:.25,InputLength:"9"}),
		plf.addText({"labelWidth":480,"label":"Length(cum)",id:"strMaxLength","mandatory":"true",inputFormat:"numeric",weightPrecision:"2",columnWidth:.25,InputLength:"9"}),
		plf.addText({"labelWidth":480,"label":"Breadth(cum)",id:"strMaxBreadth","mandatory":"true",inputFormat:"numeric",weightPrecision:"2",columnWidth:.25,InputLength:"9"}),
		plf.addText({"labelWidth":480,"label":"Height(cum)",id:"strMaxHeight","mandatory":"true",inputFormat:"numeric",weightPrecision:"2",columnWidth:.25,InputLength:"9"})
		]		
		MaxPanel.add(MaxPanelCtrl);
		
		var MinPanel = plf.addColumnSection({title:"Minimum Value"});
		var MinPanelCtrl=																			
		[
		plf.addBlank(),
	
		plf.addText({"labelWidth":480,"label":"Quantity",id:"strMinQuantity","mandatory":"true",inputFormat:"integer",columnWidth:.25,InputLength:"6"}),
		plf.addText({"labelWidth":480,"label":"Weight(tons)",id:"strMinWeight","mandatory":"true",inputFormat:"numeric",weightPrecision:"2",columnWidth:.25,InputLength:"9"}),
		plf.addText({"labelWidth":480,"label":"Length(cum)",id:"strMinLength","mandatory":"true",inputFormat:"numeric",weightPrecision:"2",columnWidth:.25,InputLength:"9"}),
		plf.addText({"labelWidth":480,"label":"Breadth(cum)",id:"strMinBreadth","mandatory":"true",inputFormat:"numeric",weightPrecision:"2",columnWidth:.25,InputLength:"9"}),
		plf.addText({"labelWidth":480,"label":"Height(cum)",id:"strMinHeight","mandatory":"true",inputFormat:"numeric",weightPrecision:"2",columnWidth:.25,InputLength:"9"})
		]		
		MinPanel.add(MinPanelCtrl);
		
		var ODCPanel = plf.addColumnSection({title:"ODC Parameter Configuration "});
		var ODCPanelCtrl=																			
		[
		plf.addBlank(),
		plf.addText({"labelWidth":480,"label":"Weight(tons)",id:"strODCWeight","mandatory":"true",inputFormat:"numeric",weightPrecision:"2",columnWidth:.25,InputLength:"9"}),
		plf.addText({"labelWidth":480,"label":"Length(m)",id:"strODCLength","mandatory":"true",inputFormat:"numeric",weightPrecision:"2",columnWidth:.25,InputLength:"9"}),
		plf.addText({"labelWidth":480,"label":"Breadth(m)",id:"strODCBreadth","mandatory":"true",inputFormat:"numeric",weightPrecision:"2",columnWidth:.25,InputLength:"9"}),
		plf.addText({"labelWidth":480,"label":"Height(m)",id:"strODCHeight","mandatory":"true",inputFormat:"numeric",weightPrecision:"2",columnWidth:.25,InputLength:"9"})
		]		
		ODCPanel.add(ODCPanelCtrl);
		
		//hdr ends
		
		var weightageObj=
		 [	
			{columnname:"Parameter Weightage",dataname:"PARAM_VALUE",datatype:"string",width:230},
            {columnname:"Weightage",dataname:"WEIGHTAGE",datatype:"string",width:230}
		
		 ]
		var weightageGridDtl=			
		{
			title:"Weightage Details",
			id:"weightage",
			detail:weightageObj,
			visibleRow:8,
			readonly:true,
			removeTbar:true,
			removePaging:true
		}
		var weightageGridSection = plf.addGrid(weightageGridDtl,this)
		
	
		var ratingObj=
		 [	
			{columnname:"Parameter Rating",dataname:"PARAM_VAL",datatype:"string",width:230},
            {columnname:"Rating",dataname:"RATING",datatype:"string",width:230}
		
		 ]
		var rateGridDtl=			
		{
			title:"Rating Details",
			id:"rating",
			detail:ratingObj,
			visibleRow:8,
			readonly:true,
			removeTbar:true	,
			removePaging:true		
		}
		var ratingGridSection = plf.addGrid(rateGridDtl,this)
		
		var truckVolConfObj=
		 [	
			{columnname:"Truck Category",dataname:"TRUCK_CAT",datatype:"string",width:230,storeId:"strTruckCat",editControl:"combo"},
            {columnname:"Capacity",dataname:"CAPACITY",datatype:"string",width:230,editControl:"textbox",inputFormat:"numeric",weightPrecision:"2"},
			{columnname:"Max Load Allowed",dataname:"MAX_LOAD",datatype:"string",width:230,editControl:"textbox",inputFormat:"numeric",weightPrecision:"2"}
		
		 ]
		var truckVolGridDtl=			
		{
			title:"Truck Volumetric Configuration",
			id:"truckVolConf",
			detail:truckVolConfObj,
			visibleRow:8
			//readonly:false,
			//removeTbar:true	,
			//removePaging:true		
		}
		var truckVolGridSection = plf.addGrid(truckVolGridDtl,this)
		
		var baseTab = plf.addTabSection({columnWidth:1, tabs:[weightageGridSection,ratingGridSection,truckVolGridSection
						                       ]});
		mainpage.ptrMainSection.add(sysparamHdrColumn)		
		mainpage.ptrMainSection.add(MaxPanel)	
		mainpage.ptrMainSection.add(MinPanel)	
		mainpage.ptrMainSection.add(ODCPanel)
		
		//mainpage.ptrMainSection.add(baseTab)
		      
		
	
		
		mainpage.eventHandlers = 
		[		
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_INITSYSPARAMTS"
			},		
			{       
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strPlanWindow","strItemDesc","strCostCenter","strVehicleCat","strMapRadius",
						"strMaxQuantity","strMaxWeight","strMaxLength","strMaxBreadth","strMaxHeight",
						"strMinQuantity","strMinWeight","strMinLength","strMinBreadth","strMinHeight",
						"strODCWeight","strODCLength","strODCBreadth","strODCHeight","strCutOffTime"
						],
				"service":"FXCoreTS",
				"methodName":"FXPORTAL_SAVESYSPARAMETERTS"
			 }			
		
		]
		
	
		mainpage.hlpLinks=
		{
		"itemhelp":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.ItemHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strItemDesc","child":"ITEM_CODE"},
							]
				},
				"CostCenter":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.CostCenterHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strCostCenter","child":"COST_CENTER_CODE"}
							]
				}
			

				
		}
		this.callParent(arguments);
	}
});