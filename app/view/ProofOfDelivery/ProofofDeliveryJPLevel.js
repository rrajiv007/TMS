/************************************************************************************************
Modification History        									                               	
************************************************************************************************
Description :Proof of Delivery – Joruney Plan Level
Author      : Shekar                                                           		         
Version     : 1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1       Shekar             23/12/2016        75113  
************************************************************************************************/

Ext.define('CueTrans.view.ProofOfDelivery.ProofofDeliveryJPLevel',

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{	
	
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Proof of Delivery – Journey Plan Level";  
		mainpage.toolbarSectionFlag=true;
	
		
//Tool bar Section begins

		mainpage.toolbarActions= 
		[
		  /*  {
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },*/
			
			{
                "name": "Save",
                "tooltip": "Click here to save."
            }
        ]
//Tool bar Section ends		
		
//  Header Section 	
		plf.columns=4
		var jPLevelHdrColumn = plf.addColumnSection({});			
		var jPLevelHdrCtrl=						
		[
			plf.addHlpText({"label":"Journey Plan No",id:"strJourneyPlanNo",hlpLinkID:"JPNo",mandatory:"true"},this),
            plf.addDisplayOnly({"label":"Load No",id:"strLoadNo"}),
			plf.addDisplayOnly({"label":"Load Description",id:"strLoadDesc"}),
			plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
			plf.addDisplayOnly({"label":"Destination",id:"strDestination"})
			
		]
		jPLevelHdrColumn.add(jPLevelHdrCtrl);

		var ScheVehDetails= plf.addColumnSection({title:"Scheduled Asset Details"});
		
		var ScheVehDetailsCtrl=
		[   
		   plf.addDisplayOnly({"label":"Vehicle No",id:"strVehicleNo"}),
		   plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
		   plf.addDisplayOnly({"label":"Driver Contact",id:"strContractNo"}),
		   plf.addDisplayOnly({"label":"Trailer Code",id:"strTrailerCode"})
			 
			  
		]
		
		ScheVehDetails.add(ScheVehDetailsCtrl);
		
		 
		
		var ReportVehDetails= plf.addColumnSection({title:"Reporting Asset Details"});
		
		var ReportVehDetailsCtrl=
		[   
		    plf.addDisplayOnly({"label":"Vehicle No",id:"strRepTruckCode"}),
			plf.addDisplayOnly({"label":"Driver Name",id:"strRepDriverCode"}),
			plf.addDisplayOnly({"label":"Driver Contact",id:"strRepMobileNo"}),
			plf.addDisplayOnly({"label":"Trailer Code",id:"strRTri"})
		]
		
		ReportVehDetails.add(ReportVehDetailsCtrl);
		
		
// Detail Section	

        var journeyPlanSum = plf.addColumnSection({columnWidth:.10,title:""});
		var jPDtlObj=							
		[
		    {columnname:"Shipment No",dataname:"SHIP_NO",datatype:"string",editControl:"DisplayOnly",width:200},
			{columnname:"Vendor Name",dataname:"VENDOR_NAME",datatype:"string",editControl:"DisplayOnly",width:200},
			{columnname:"Ref Doc No",dataname:"REF_DOC",datatype:"string",editControl:"DisplayOnly",width:200},
			{columnname:"Commodity",dataname:"COMMODITY",datatype:"string",editControl:"DisplayOnly",width:200},
			{columnname:"Quantity",dataname:"QTY",datatype:"string",editControl:"DisplayOnly",width:200},
			{columnname:"Weight (ton)",dataname:"WEIGHT",datatype:"string",editControl:"DisplayOnly",width:200},
			{columnname:"Contractual Delivery Date/Time",dataname:"CON_DEL_DATE",datatype:"string",editControl:"DisplayOnly",width:200},
			{columnname:"Delivered Date/Time",dataname:"DEL_DATE_TIME",datatype:"string",editControl:"DisplayOnly",width:200}
		]
		var jPDtl=								
		{
			title:"Shipment Details",
			id:"jPLevel",
			detail:jPDtlObj,
			visibleRow:plf.searchVisibleRows,
			removeAddDelete:true,
			visibleRow:6
			//columnWidth:.825
		}	
			 
		var  jP1DtlCtrl = plf.addGrid(jPDtl,this)	  
	         journeyPlanSum.add(jP1DtlCtrl);


//  Header Section 	
		plf.columns=4
		var jPLvlHdrColumn = plf.addColumnSection({title:"POD Details"});			
		var jPLvlHdrCtrl=						
		[
			plf.addDate({"label":"Received Date",id:"dtReceivedDate",inputFormat:"string",InputLength:"100",mandatory:"true"}),
			plf.addTime({"label":"Received Time",id:"dtReceivedTime",inputFormat:"string",InputLength:"100",mandatory:"true"}),
			plf.addCheckBox({"labelWidth":250,"label":"Material Received in Good Condition",id:"strMRGC",inputFormat:"string",InputLength:"100",mandatory:"true"})
            
		]
		jPLvlHdrColumn.add(jPLvlHdrCtrl);

// free Text Editor
var freeTextEditor = plf.addColumnSection({title:"Notes"});
		
		freeTextEditor.add({
                 xtype: "container",
                 layout: "column",
                 //cls: plf.getContainerCls(),
                 items: 
				 [						
						 Ext.create('Ext.form.field.TextArea', {
							itemId:"strNotes",
							label:"Body",
							height: 150,
							width:plf.screenWidth-120
						})
                 ]
             })			
		
//Main Page Section Starts

		mainpage.ptrMainSection.add(jPLevelHdrColumn)
		mainpage.ptrMainSection.add(ScheVehDetails) 
		mainpage.ptrMainSection.add(ReportVehDetails) 
		mainpage.ptrMainSection.add(journeyPlanSum) 
		mainpage.ptrMainSection.add(jPLvlHdrColumn)
		mainpage.ptrMainSection.add(freeTextEditor)
		mainpage.dataHistorySectionFlag=true;
		
//Main Page Section ends
		
// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[
            {
				"controlid":"",
				"tasktype":"onload",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"initfetchProfDelJouTS"
			} ,
			{
				"controlid":"strJourneyPlanNo",
				"tasktype":"onenter",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				"methodName":"fetchProfDelJouTS"
			} ,
			{
				"controlid":"strJourneyPlanNo",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strJourneyPlanNo","strLoadNo","dtReceivedDate","dtReceivedTime","strMRGC","strNotes"],
				"service":"CoreJourneyPlanService",
				"methodName":"SaveProfDelJouTS"
			}  
			
		];
		
// Event Handlers Mapping ends

// Help link section starts	
		mainpage.hlpLinks=
		{
		
		"JPNo":
				{
					"hlpType":"Header",
					"hlpScreen":"journey_management.JourneyPlanHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strJourneyPlanNo","child":"JOURNEY_PLAN_NO"}
							]
				}
		
		}
// Help link section ends
	

		this.callParent(arguments);
		
	}
});
