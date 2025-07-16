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
Ext.define('CueTrans.view.jm_master.AlertHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		mainpage.screenName = "Alert Configuration Help";
		//mainpage.liveScreenFlag=false;
		mainpage.startPainting();
		
		
		//GuestHouse Header Section Begins
		plf.columns=4
		var AlertMasHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
		
		
		//plf.addText({"label":"Employee Code To",id:"strEmployeeCodeTo","anywhereSearch":"true"}),
		
		var AlertMasFormCtrl=
		[
			plf.addText({"label":"Alert Code",id:"strAlertCode"}),	
            plf.addText({"label":"Alert Description",id:"strAlertDesc"}),
			plf.addCombo({"label":"Module",id:"strModule"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Alert On",id:"strAlertOn"}),
			plf.addDate({"label":"Effective From",id:"dtEffectiveDtFrom"}),
			plf.addDate({"label":"Effective To",id:"dtEffectiveDtTo"}),
			plf.addText({"label":"Subject",id:"strSubject"})
		]
		
		AlertMasHdrCollapse.add(AlertMasFormCtrl);
		//HelpOnEmployee Header Section Ends
		
		//HelpOnEmployee Grid Section Begins
		var alertMasGridFieldObj=		//69995
		[
			{columnname:"Alert Code",dataname:"ALERT_CODE",datatype:"string",width:100},
			{columnname:"Alert Description",dataname:"ALERT_DESC",datatype:"string",width:100},
			{columnname:"Module",dataname:"MODULE",datatype:"string",width:100},
			{columnname:"Alert On",dataname:"ALERT_ON",datatype:"string",width:100},
			{columnname:"Effective From",dataname:"EFFECTIVE_FROM",datatype:"string",width:100},
			{columnname:"Effective To",dataname:"EFFECTIVE_TO",datatype:"string",width:100},
			{columnname:"Subject",dataname:"SUBJECT",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		var alertMasGridDtl=		//69995
		{

		title:"",
		id:"alertDetails",
	    detail:alertMasGridFieldObj,
		readonly:true,
		visibleRow:plf.searchVisibleRows,
		widthBasis:"flex",
		}
		var alertMasGridSection = plf.addGrid(alertMasGridDtl,this)	 //69995
		//HelpOnEmployee Grid Section Ends
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(AlertMasHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(alertMasGridSection) //Add Grid Section to Main Page
		
	
		
	 mainpage.screenLinks=
		{
			"AlertConfigcode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.AlertHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strAlertCode","child":"ALERT_CODE"}
							]
				}
				
		}	
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
			{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"PPLCoreMasterTS",
				"methodName":"initAlertSrch"
			},
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strAlertCode","strAlertDesc","strStatus","strCalendarCode"],
				"service":"PPLCoreMasterTS",
				"methodName":"fetchAllAlertSrch"
			},
			
		];
		this.callParent(arguments);
		
	}
});
