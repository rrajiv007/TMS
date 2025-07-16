/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	JMC LSR Action Overview                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
     		                                   
************************************************************************************************/
Ext.define('CueTrans.view.LSR.JMCLSRActionOverviewpopup', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		
		var mainpage = this;
		//mainpage.hlpSectionFlag=true;
		mainpage.popupSectionFlag=true;
		mainpage.popupHeightRatio=.7;
		mainpage.popupWidthRatio=.25;
		mainpage.startPainting();
		
		mainpage.screenName = "JMC LSR Action Overview";	

		var formCtrl=[];
		plf.columns=1
		var LSRPopupHdrColumn = plf.addColumnSection({title:""});
		
		var LSRPopupHdrFormCtrl=
		[
			plf.addHidden({"label":"Journey Plan No","id":"strJourneyPlanNo"}),
			plf.addDisplayOnly({"label":"Number of LSR's Reported","id":"strLSRNo"})
		]		
		LSRPopupHdrColumn.add(LSRPopupHdrFormCtrl);	
		/* In Confirmation Process start */
		var ConfirmationProcessObj=
		[			
			{columnname:"Pending Action",dataname:"CON_PENDING_ACTION",datatype:"string",width:"auto",colAlign:'center'},			
			{columnname:"Accepted",dataname:"CON_ACCEPTED",datatype:"string",width:"auto",colAlign:'center'},						
			{columnname:"Rejected",dataname:"CON_REJECTED",datatype:"string",width:"auto",colAlign:'center'}
					
		]
		ConfirmationProcessGridDetail=
		{
			title:"In Confirmation Process",
			id:"ConfirmationProcess",
			detail:ConfirmationProcessObj,
			visibleRow:3,
			removeAddDelete:true,
			removeTbar:true,
			removePaging:true,
			readonly:true,
            "rowHighlight":true			
			
		}
		var ConfirmationProcessGridSection = plf.addGrid(ConfirmationProcessGridDetail,this)
		/* In Confirmation Process Ends */		

       /* In Review Process start */
		var ReviewProcessObj=
		[			
			{columnname:"Pending Action",dataname:"REV_PENDING_ACTION",datatype:"string",width:"auto",colAlign:'center'},			
			{columnname:"Accepted",dataname:"REV_ACCEPTED",datatype:"string",width:"auto",colAlign:'center'},						
			{columnname:"Rejected",dataname:"REV_REJECTED",datatype:"string",width:"auto",colAlign:'center'}
					
		]
		ReviewProcessGridDetail=
		{
			title:"In Review Process",
			id:"ReviewProcess",
			detail:ReviewProcessObj,
			visibleRow:3,
			removeAddDelete:true,
			removeTbar:true,
			removePaging:true,
			readonly:true,
			"rowHighlight":true
			
		}
		var ReviewProcessGridSection = plf.addGrid(ReviewProcessGridDetail,this)
		/* In Review Process Ends */		

       /* In Approval Process start */
		var ApprovalProcessObj=
		[			
			{columnname:"Pending Action",dataname:"APP_PENDING_ACTION",datatype:"string",width:"auto",colAlign:'center'},			
			{columnname:"Accepted",dataname:"APP_ACCEPTED",datatype:"string",width:"auto",colAlign:'center'},						
			{columnname:"Rejected",dataname:"APP_REJECTED",datatype:"string",width:"auto",colAlign:'center'}
					
		]
		ApprovalProcessGridDetail=
		{
			title:"In Approval Process",
			id:"ApprovalProcess",
			detail:ApprovalProcessObj,
			visibleRow:3,
			removeAddDelete:true,
			removeTbar:true,
			removePaging:true,
			readonly:true,
			"rowHighlight":true
			
		}
		var ApprovalProcessGridSection = plf.addGrid(ApprovalProcessGridDetail,this)
		/* In Approval Process Ends */	
		
		//adding control to the mainpage
		mainpage.ptrMainSection.add(LSRPopupHdrColumn)
		ConfirmationProcessGridSection.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(ConfirmationProcessGridSection) 
		ReviewProcessGridSection.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(ReviewProcessGridSection) 
		ApprovalProcessGridSection.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(ApprovalProcessGridSection) 
	   
	   //History Data Section
		mainpage.dataHistorySectionFlag=false;	
	
		mainpage.eventHandlers = 
		[	
		{
			"controlid":"",
			"tasktype":"onload",
			"input":["strJourneyPlanNo"],
			"service":"CoreJourneyPlanService",
			"methodName":"initLSRActionpopup"
		}	
		];		
		this.callParent(arguments);
	}
});