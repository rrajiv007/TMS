Ext.define('CueTrans.view.consignmentnote.ConsignmentNoteHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
	
	   var mainpage = this;
	   mainpage.hlpSectionFlag=true;
		mainpage.startPainting();
		mainpage.screenName = "Consignment Note Help";
		mainpage.hlpSectionFlag=true;
		
		
		//Inspection Search Section Begins
		
		plf.columns=3
		helpOnConsignHdrCollapse =plf.addColumnSection({title:"", collapsed: true});
		
		
		consignmentFormCtrl=
		[
			plf.addText({"label":"Consignment Note From",id:"strConsNoteFrom"}),
			plf.addText({"label":"Consignment Note To",id:"strConsNoteTo"}),
			plf.addCombo({"label":"Status","id":"strStatus"}),
			
			plf.addDate({"label":"Consignment Note Date From","id":"dtConsDateFrom"}),
			plf.addDate({"label":"Consignment Note Date From","id":"dtConsDateTo"}),
			plf.addText({"label":"Material Movement No","id":"strCustomerRequestNo"}),
			
			plf.addCombo({"label":"Origin","id":"strOrigin"}),
			plf.addCombo({"label":"Destination","id":"strDestination"}),
			plf.addCombo({"label":"Commodity","id":"strCommodity"}),
			
			plf.addCombo({"label":"Service Type","id":"strServiceType"}),
			plf.addButton({"label":"Search","id":"btnSearch"})
		
		]
		helpOnConsignHdrCollapse.add(consignmentFormCtrl);
		
		consignmentSummaryObj=
		[
			{columnname:"Consignment Note",dataname:"CONS_NO",datatype:"string",width:120,linkId:"contractsmaster"},
			{columnname:"Consignment Date",dataname:"CONS_DATE",datatype:"string",width:120},
			{columnname:"Material Movement No",dataname:"MAT_MOV_NO",datatype:"string",width:150},
			{columnname:"Origin",dataname:"ORIGIN",datatype:"string",width:80},
			{columnname:"Destination",dataname:"DESTINATION",datatype:"string",width:80},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",width:120},
			{columnname:"Service Type",dataname:"SERVICE_TYPE",datatype:"string",width:90},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100}
		]
		consignmentSummaryGridDetail=
		{
			title:"",
			id:"consignmentNote",
			detail:consignmentSummaryObj,
			visibleRow:10,
			removeAddDelete:true
			
		}
		helpGridSection = plf.addGrid(consignmentSummaryGridDetail,this)
		mainpage.hlpSearchGridPtr = helpGridSection
		
		mainpage.ptrMainSection.add(helpOnConsignHdrCollapse)
		mainpage.ptrMainSection.add(helpGridSection) 
		
		mainpage.dataHistorySectionFlag=false;
		
		
		
			mainpage.eventHandlers = 
			[
               {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreConsignment",
				"methodName":"initConsScrTS"
				},
              {
			   "controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strOrigin","strDestination","strConsNoteFrom","strConsNoteTo","dtConsDateFrom","dtConsDateTo","strStatus","strCommodity","strServiceType","strCustomerRequestNo"],
				"service":"CoreConsignment",
				"methodName":"fetchConsignDetailsTS"
			}					
			             
			];
			
	this.callParent(arguments);
		
	}
});	
		