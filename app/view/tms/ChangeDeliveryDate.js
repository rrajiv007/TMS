/************************************************************************************************
							      Modification History        									                               	
************************************************************************************************
Description	  :	                                                                    		         
Author		  :	CUETRANS																                                         
Version		  :	1.0.1															                                               
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	
1.0.1	 Manibharathi		05/02/2016    69997                         Addition of var     
1.0.1	Mohammed Razhith.S.A 10/05/2016    72415                           Adding Mandatory Field For Reason.   
************************************************************************************************/
Ext.define('CueTrans.view.tms.ChangeDeliveryDate', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Change Delivery Date";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		//mainpage.toolbarActions=["Save"]
		mainpage.toolbarActions= 
			[
				{
					"name": "Save",
					"tooltip": "Click here to save the changed delivery date."
				}
            ]
		
		plf.columns=4
		 var chgeDelDateColumn1 = plf.addColumnSection({title:"Shipment Details"});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
			 var ChangeDelDateCtrl1=
			[	
			    //plf.addDisplayOnly({"label":"Shipment No",id:"strShippmentNo"}),	
				plf.addHlpText({"label":"Shipment No",id:"strShippmentNo",hlpLinkID:"shipmentno"},this),
				plf.addDisplayOnly({"label":"Request No",id:"strRequestNo"}),
				plf.addDisplayOnly({"label":"Ref Doc No",id:"strDocNo","mandatory":"true"}),
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				plf.addDisplayOnly({"label":"Priority",id:"strPriority"}),
				plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
				
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
				plf.addDisplayOnly({"label":"Created Type",id:"strCreatedType"}),
				plf.addDisplayOnly({"label":"Cost Center Name",id:"strCostCenterName"}),
				plf.addDisplayOnly({"label":"Operations A/c No",id:"strOperAccNo"}),
				
				plf.addDisplayOnly({"label":"Requested By",id:"strRequestorId"}),
				plf.addDisplayOnly({"label":"Requestor Name",id:"strRequestorName"}),
				plf.addDisplayOnly({"label":"Requestor Mail Id",id:"strReqMailId"}),
				plf.addBlank(),


				plf.addDisplayOnly({"label":"Total Weight (tons)",id:"strWeight"}),
				plf.addDisplayOnly({"label":"Total Volume (cu.m)",id:"strVolume"}),
				//plf.addDateTime({"label":"Current Delivery Date/Time",dateid:"dtNewDelDate",timeid:"dtNewDelTime"})
				plf.addDisplayOnly({"label":"Current Delivery Date",id:"dtNewDelDate"})
				
			]
		
		}
		
		else
		{
			ChangeDelDateCtrl1=
			[	
			    	plf.addDisplayOnly({"label":"Shipment No",id:"strShippmentNo"}),	
				plf.addDisplayOnly({"label":"Request No",id:"strRequestNo"}),
				plf.addDisplayOnly({"label":"Ref Doc No",id:"strDocNo","mandatory":"true"}),
				
				plf.addDisplayOnly({"label":"Status",id:"strStatus"}),
				plf.addDisplayOnly({"label":"Origin",id:"strOrigin"}),
				plf.addDisplayOnly({"label":"Destination",id:"strDestination"}),
				
				plf.addDisplayOnly({"label":"Priority",id:"strPriority"}),
				plf.addDisplayOnly({"label":"Commodity",id:"strCommodity"}),
				plf.addDisplayOnly({"label":"Customer Name",id:"strCustomerName"}),
				
				plf.addDisplayOnly({"label":"Created Type",id:"strCreatedType"}),
				plf.addDisplayOnly({"label":"Cost Center Name",id:"strCostCenterName"}),
				plf.addDisplayOnly({"label":"Operations A/c No",id:"strOperAccNo"}),

				plf.addDisplayOnly({"label":"Requested By",id:"strRequestorId"}),
				plf.addDisplayOnly({"label":"Requestor Name",id:"strRequestorName"}),
				plf.addDisplayOnly({"label":"Requestor Mail Id",id:"strReqMailId"}),
				
				plf.addBlank(),
				plf.addDisplayOnly({"label":"Total Weight(ton)",id:"strWeight"}),
				plf.addDisplayOnly({"label":"Total Volume (cu.m)",id:"strVolume"}),
				//plf.addDateTime({"label":"Current Delivery Date/Time",dateid:"dtNewDelDate",timeid:"dtNewDelTime"})
				plf.addDisplayOnly({"label":"Current Delivery Date/Time",id:"dtNewDelDate"})

				
			]
		}	
		

              plf.columns=4
		 var chgeDelDateColumn2 = plf.addColumnSection({title:"Change Delivery Date"});
		if(plf.defaultLayout==4)
		{
			plf.columns=4
			
		var	ChangeDelDateCtrl2=
			[	
				plf.addDateTime({"label":"New Delivery Date/Time",dateid:"dtNewDeliveryDate",timeid:"tmNewDelTime"}),			   
				//plf.addDate({"label":"New Delivery Date",id:"dtNewDelDt"}),	
			//	plf.addText({"label":"New Delivery Time",id:"dtNewDelDt"}),
				plf.addText({"label":"Approver Id",id:"strApproverId"}),
				plf.addText({"label":"Approver Name",id:"strApproverName"}),
				plf.addCombo({"label":"Reason",id:"strChgeReason","mandatory":"true"})
				
			]
		     }
		
		else
		{
			ChangeDelDateCtrl2=
			[	
				plf.addDateTime({"label":"New Delivery Date/Time",dateid:"dtNewDeliveryDate",timeid:"tmNewDelTime"}),
				//plf.addDate({"label":"New Delivery Date",id:"dtNewDelDt"}),	
				//plf.addText({"label":"New Delivery Time",id:"dtNewDelTime"}),
				plf.addText({"label":"Approver Id",id:"strApproverId"}),

				plf.addText({"label":"Approver Name",id:"strApproverName"}),
				plf.addCombo({"label":"Reason",id:"strChgeReason"})
			]
		}

          var  ChangeDelDateCtrl3=
			[	
			       plf.addText({"label":"Updated By",id:"strUpdatedBy"}),
				plf.addText({"label":"Updated Date and Time",id:"strUpdDtTime"})
				
			]


	
             //docUpload = plf.addColumnSection({columnWidth:.75});	
		//plf.columns=4		
		 var docUploadCtrl=
		[		
			
			plf.addFileUpload({"label":"Approval Document",id:"strFileAttach",Entity:"Journey_Plan\\File_Attachment"})
		]
		
		//docUpload.add(docUploadCtrl)	
		
		
              chgeDelDateColumn1.add(ChangeDelDateCtrl1);
		chgeDelDateColumn2.add(ChangeDelDateCtrl2); 
		chgeDelDateColumn2.add(docUploadCtrl);
		chgeDelDateColumn2.add(ChangeDelDateCtrl3); 
		
		mainpage.ptrMainSection.add(chgeDelDateColumn1) 
		mainpage.ptrMainSection.add(chgeDelDateColumn2) 
		//mainpage.ptrMainSection.add(docUpload) 

             mainpage.eventHandlers = 
			[	
			{	                     
					"controlid":"",
					"tasktype":"onload",
					"input":["strShippmentNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"initChgeDelDateTS"
			},
			{	                     
					"controlid":"strShippmentNo",
					"tasktype":"onenter",
					"input":["strShippmentNo"],
					"service":"TMSCoreTransportTS",
					"methodName":"initChgeDelDateTS"
			},
			{
					"controlid":"",
					"tasktype":"toolbarclick",
					"action":"Save",
					"input":["dtNewDelDt","dtNewDelTime","strApproverId","strApproverName","strChgeReason","strUpdatedBy","strUpdDtTime","strShippmentNo",
                                            "strRequestNo","strDocNo","strOrigin","strDestination","strPriority","strCommodity","strCustomerName","strCreatedType","strCostCenterName",
						  "strOperNo","strWeight","strVolume","strShippmentNo","strFileAttach","tmNewDelTime","dtNewDeliveryDate"],
					"service":"TMSCoreTransportTS",
					"methodName":"chgeDelDateTS"
			}
			];
			mainpage.hlpLinks=
		   {
			"shipmentno":
				{
					"hlpType":"Header",
					"hlpScreen":"tms.ShipmentHelpForChangeDelDate",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strShippmentNo","child":"SHIPMENT_NO"}
							
							]
				}
		     }

	
	      this.callParent(arguments);
		
	}
});
