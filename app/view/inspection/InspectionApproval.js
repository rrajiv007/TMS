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
Ext.define('CueTrans.view.inspection.InspectionApproval', 
{
	extend:"CueTrans.lib.plfTransScreen",
	
	initComponent: function()
	{
		var mainpage = this; 
		mainpage.startPainting();
		mainpage.screenName = "Tyre Inspection Approval";
		
		//Add Keyfields
		mainpage.keyFields=["strInspectionNo"]
		
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		//
		mainpage.grid_passviol_flag=true;

		mainpage.toolbarActions= 
			[


				{
					"name": "Approve",
					"tooltip": "Click here to approve."
				},
				{
					"name": "Reject",
					"tooltip": "Click here to reject."
				}/*,
				{
					"name": "Print Inspection Report",
					"tooltip": "Click here to print inspection report."
				}*/

            ]
	
		//Pre Journey Inspection  Header Section Begins
		plf.columns=4
		var preJourneyInspectionColumn = plf.addColumnSection({title:"Inspection Details"});		//69997
		
		var preJourneyInspectionCtrl=								//69997
		[	

            plf.addHlpText({"label":"Inspection No",id:"strInspectionNo","mandatory":"true",hlpLinkID:"inspectionno"},this),
			plf.addDateTime({"label":"Inspection Date/Time",dateid:"dtInspectionDate",timeid:"iInspectionTime"}),
			
            plf.addDisplayOnly({"label":"Inspector Name",id:"strInspectorName"}),
			plf.addDisplayOnly({"label":"Status","id":"strStatus"}),
            plf.addDisplayOnly({"label":"Load Description","id":"strLoadDesc"}),
            plf.addDisplayOnly({"label":"Loading Point","id":"strLoadAt"}),
			plf.addDisplayOnly({"label":"Unloading Point","id":"strDeliveryAt"}),
			plf.addDisplayOnly({"label":"Load No",id:"strLoadNo"}),
			plf.addDisplayOnly({"label":"Inspection Type","id":"strInspectionType"}),
			plf.addDisplayOnly({"label":"Carrier","id":"strCarrierName"})
	]
		preJourneyInspectionColumn.add(preJourneyInspectionCtrl);	//69997
		preJourneyInspectionColumn.add(plf.addStripLine({}));
		//Pre Journey Inspection  Header Section Ends
			//Raj for Scheduled Asset Details
			//Pre Scheduled Asset Details  Header Section Begins
		plf.columns=4
		var preSADJourneyInspectionColumn = plf.addColumnSection({title:"Scheduled Asset Details"});		//69997
		
		var preSAJourneyInspectionCtrl=								//69997
		[	

            plf.addDisplayOnly({"label":"Vehicle Code",id:"strRegNoSec"}), //strTruckCode
            plf.addDisplayOnly({"label":"Vehicle Regn No","id":"strRegNo"}),
			plf.addDisplayOnly({"label":"Vehicle Category","id":"strVehicleCategory"}),
            plf.addDisplayOnly({"label":"Contract No","id":"strContractNo"}),
			plf.addDisplayOnly({"label":"Trailer Code",id:"strTrailerCodeSC"}),
            plf.addDisplayOnly({"label":"Driver Code",id:"strDriverCode"}),
			plf.addDisplayOnly({"label":"Driver Name",id:"strDriverName"}),
			plf.addDisplayOnly({"label":"Driver Contact No",id:"strDriverPhNo"}),
			plf.addDisplayOnly({"label":"Driver License No",id:"strDriverDocuments"}),
			plf.addDisplayOnly({"label":"Driver DOB",id:"strSchDriverDOB"}),
			plf.addDisplayOnly({"label":"Driver Age",id:"strSchDriverAge"})
            
		]
		preSADJourneyInspectionColumn.add(preSAJourneyInspectionCtrl);	//69997
		preSADJourneyInspectionColumn.add(plf.addStripLine({}));
		//Pre Scheduled Asset Details Header Section Ends
				//Raj for Reporting Asset Details
			//Pre Reporting Asset Details  Header Section Begins
		plf.columns=4
		var parentForm=mainpage;
		var preRADJourneyInspectionColumn = plf.addColumnSection({title:"Reporting Asset Details"});		//69997
		
		var preRAJourneyInspectionCtrl=								//69997
		[	


            //plf.addHlpText({"label":"Vehicle Code","id":"strReportingVehicle",hlpLinkID:"reportingvehicle"},this),
			plf.addDisplayOnly({"label":"Vehicle Code","id":"strReportingVehicle",hlpLinkID:"reportingvehicle"},this),
			plf.addDisplayOnly({"label":"Vehicle Regn No","id":"strReportingVeh"}),//strTruckCode strReportingVeh
            plf.addDisplayOnly({"label":"Vehicle Category","id":"strVehicleCat"}),//75145
			//plf.addHlpText({"label":"Trailer Code","id":"strTrailerCode",hlpLinkID:"reportingTrailerCode"},this),
			//plf.addHlpText({"label":"Driver Code","id":"strReportingDriver",hlpLinkID:"reportingdriver"},this),
			plf.addDisplayOnly({"label":"Trailer Code","id":"strTrailerCode",hlpLinkID:"reportingTrailerCode"},this),
			plf.addDisplayOnly({"label":"Driver Code","id":"strReportingDriver",hlpLinkID:"reportingdriver"},this),
            plf.addDisplayOnly({"label":"Driver Name",id:"strReprDriverName"}),
			plf.addDisplayOnly({"label":"Driver Contact No",id:"strReprDriverPhNo"}),
			plf.addDisplayOnly({"label":"Driver License No",id:"strReprDriverDocuments"}),
			plf.addDisplayOnly({"label":"Driver DOB",id:"strRepoDriverDOB"}),
			plf.addDisplayOnly({"label":"Driver Age",id:"strRepoDriverAge"})/*,
			plf.addButton({id:"Update_Driver_DOB",label:"Update Driver DOB",tooltip:"Click here to update driver date of birth.", 
            width:130,		
			"handler": function() 
			{
				parentForm.launchHlpLink("DOB_Update")			
			}})  */          
            // plf.addDisplayOnly({"label":"Trailer Code",id:"strTrailerCode"})			
			
		]
		preRADJourneyInspectionColumn.add(preRAJourneyInspectionCtrl);	//69997
		preRADJourneyInspectionColumn.add(plf.addStripLine({}));
		//Pre Reporting Asset Details Header Section Ends
		var TruckGridFieldObj=							//69997
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:120},//188
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:123},//140
			{columnname:"Expiry Date",dataname:"EXPIRTY_DT",datatype:"string",width:100}
			//{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:110}//Raj
		]
		var truckGridDtl=								//69997
		{
			title:"Truck Documents Details",
			id:"preJourneyTruck",
			columnWidth:0.33,
			detail:TruckGridFieldObj,
			visibleRow:6,	
			readonly:true,
			removeFilter:true,
			removeTbar:true,
			"rowHighlight":true

		}
	  var  TruckGridSection = plf.addGrid(truckGridDtl,this)		//69997
	   
		//Pre Journey Inspection Truck Document Grid Section Ends

            //Pre Journey Inspection Trailer Document Grid Section start           	
	var TrailerGridFieldObj=							//69997
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:120},
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:130},
			{columnname:"Expiry Date",dataname:"EXPIRTY_DT",datatype:"string",width:105}
			//{columnname:"Issued By",dataname:"ISSUED_BY",datatype:"string",width:110}//Raj
		]
		var TrailerGridDtl=								//69997
		{
			title:"Trailer Documents Details",
			id:"preJourneyTrailer",
			columnWidth:0.34,
			detail:TrailerGridFieldObj,
			visibleRow:6,	
			readonly:true,
			removeFilter:true,
			removeTbar:true,
			"rowHighlight":true

		}
	  var  TrailerGridSection = plf.addGrid(TrailerGridDtl,this)		//69997
	   
		//Pre Journey Inspection Truck Document Grid Section Ends        

		//Pre Journey Inspection Driver Document Grid Section Begins
		var preJourneyInspectionDriverGridFieldObj=	     //69997
		[
			{columnname:"Document Type",dataname:"DOC_TYPE",datatype:"string",width:120},
			{columnname:"Document No",dataname:"DOC_NO",datatype:"string",width:123},
			//{columnname:"Issue Date",dataname:"DOC_ISSUE_DT",datatype:"string",width:140},//Raj
			{columnname:"Expiry Date",dataname:"DOC_EXPIRY_DT",datatype:"string",width:100}
			
		]
		var driverGridDtl=			//69997
		{
			title:"Driver Documents Details",
			id:"preJourneyDriver",
			columnWidth:0.33,
			detail:preJourneyInspectionDriverGridFieldObj,
			visibleRow:6,			
			readonly:true,
			removeFilter:true,
			removeTbar:true,
			"rowHighlight":true				
		}
		
		var DriverGridSection = plf.addGrid(driverGridDtl,this)			//69997
       
		var truckAndDriverColumn = plf.addColumnSection({});			//69997
		truckAndDriverColumn.add(TruckGridSection)
		truckAndDriverColumn.add(plf.addSplitter)
              truckAndDriverColumn.add(TrailerGridSection)//Raj
		truckAndDriverColumn.add(plf.addSplitter)//Raj

		truckAndDriverColumn.add(DriverGridSection)
		truckAndDriverColumn.add(plf.addStripLine({}));
		

//Check list Grid Section starts
	    
		
	 checkListOptionRenderFn =  function(val,metaData,record)		
		{
			var radioHTML;
			radioHTML=""
			if(val== "")
				return;	
			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('checkListGrid','"+record.getId()+"','ANSWER','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}	
		
		checkListOptionNxtRenderFn =  function(val,metaData,record)
		{
		
			var radioHTML;
			radioHTML=""
			if(val== "")
				return;
			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO_NXT") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER_NXT") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('checkListGrid','"+record.getId()+"','ANSWER_NXT','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}
		
		checkListOptionLstRenderFn =  function(val,metaData,record)
		{
			var radioHTML;
			radioHTML=""
			if(val== "")
				return;

			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO_LST") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER_LST") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('checkListGrid','"+record.getId()+"','ANSWER_LST','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}
		checkListImageRenderFn =  function(val,metaData,record)
		{
			var btnHTML;
			var tmpName ="Download";
			var tmpColName="IMAGE";
			btnHTML=""
			if(val== "")
				return;									
			hdnImages=val;			
			btnHTML=btnHTML+"<img src='resources/images/FileUpload/imagedownload.png' style='cursor:pointer;' title ='click here to preview' "			
			btnHTML=btnHTML+" onClick=downloadCheckListImage('checkListGrid','"+record.getId()+"','"+tmpColName+"') "
			btnHTML=btnHTML+"/>"			
			return btnHTML
		}
		checkListNxtImageRenderFn =  function(val,metaData,record)
		{
			var btnHTML;
			var tmpName ="Download";
			var tmpColName="IMAGE_NXT";
			btnHTML=""
			if(val== "")
				return;									
			hdnImages=val;			
			btnHTML=btnHTML+"<img src='resources/images/FileUpload/imagedownload.png' style='cursor:pointer;' title ='click here to preview' "			
			btnHTML=btnHTML+" onClick=downloadCheckListImage('checkListGrid','"+record.getId()+"','"+tmpColName+"') "
			btnHTML=btnHTML+"/>"			
			return btnHTML
		}
		checkListLstImageRenderFn =  function(val,metaData,record)
		{
			var btnHTML;
			var tmpName ="Download";
			var tmpColName="IMAGE_LST";
			btnHTML=""
			if(val== "")
				return;									
			hdnImages=val;			
			btnHTML=btnHTML+"<img src='resources/images/FileUpload/imagedownload.png' style='cursor:pointer;' title ='click here to preview' "		
			btnHTML=btnHTML+" onClick=downloadCheckListImage('checkListGrid','"+record.getId()+"','"+tmpColName+"') "
			btnHTML=btnHTML+"/>"			
			return btnHTML
		}
		var chkListObj=									//69997
		[

			
			{columnname:"No",dataname:"SEQ_NO",datatype:"string",width:50,colAlign:"center",columnColor:"firstColumn"},
			{columnname:"Check List Code",dataname:"CHK_LIST_CODE",datatype:"string",width:100,hidden:true,columnColor:"firstColumn"},
			{columnname:"Check List Description",dataname:"CHK_LIST_NAME",datatype:"string",width:200,hidden:true,columnColor:"firstColumn"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC",datatype:"string",width:230,columnColor:"firstColumn"},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",width:100,hidden:true,columnColor:"firstColumn"},
			{columnname:"Options",dataname:"OPTION_DESCCSV",datatype:"string",width:100,renderer:checkListOptionRenderFn,columnColor:"firstColumn"},
			{columnname:"Answer",dataname:"ANSWER",datatype:"string",editControl:"textbox",width:100,hidden:true,columnColor:"firstColumn"},
			{columnname:"",dataname:"IMAGE",datatype:"string",/*editControl:"filedownload",*/width:40,columnColor:"firstColumn",renderer:checkListImageRenderFn},
			
			{columnname:"No",dataname:"SEQ_NO_NXT",datatype:"string",width:50,colAlign:"center",columnColor:"secondColumn"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_NXT",datatype:"string",width:230,columnColor:"secondColumn"},
			{columnname:"Options",dataname:"OPTION_DESCCSV_NXT",datatype:"string",width:100,renderer:checkListOptionNxtRenderFn,columnColor:"secondColumn"},			
			{columnname:"Answer",dataname:"ANSWER_NXT",datatype:"string",editControl:"textbox",width:100,hidden:true,columnColor:"secondColumn"},
			{columnname:"",dataname:"IMAGE_NXT",datatype:"string",renderer:checkListNxtImageRenderFn,/*editControl:"filedownload",*/width:40,columnColor:"secondColumn"},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_NXT",datatype:"string",width:100,hidden:true,columnColor:"secondColumn"},
			
			{columnname:"No",dataname:"SEQ_NO_LST",datatype:"string",width:50,colAlign:"center",columnColor:"thirdColumn"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_LST",datatype:"string",width:230,columnColor:"thirdColumn"},
			{columnname:"Options",dataname:"OPTION_DESCCSV_LST",datatype:"string",width:100,renderer:checkListOptionLstRenderFn,columnColor:"thirdColumn"},			
			{columnname:"Answer",dataname:"ANSWER_LST",datatype:"string",editControl:"textbox",width:100,hidden:true,columnColor:"thirdColumn"},
			{columnname:"",dataname:"IMAGE_LST",datatype:"string",renderer:checkListLstImageRenderFn,/*editControl:"filedownload",*/width:40,columnColor:"thirdColumn"},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_LST",datatype:"string",width:100,hidden:true,columnColor:"thirdColumn"}
			
		
		]
		var chkListGridDetail=								//69997
		{
			//title:"PreLoad-1",
			id:"checkListGrid",
			detail:chkListObj,
			columnWidth:1,
			visibleRow:15,
			groupByField: 'CHK_LIST_NAME',
			removeAddDelete:true,
			readonly:true,
			removeFilter:true,
			removeColumns:true

		}
		
		var checkListGridSection = plf.addGrid(chkListGridDetail,this)			//69997
		
		//Second Check List Grid
		newCheckListGridRenderFn =  function(val,metaData,record)
		{
			var radioHTML;
			radioHTML=""
			if(val== "")
				return;


			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('newCheckListGrid','"+record.getId()+"','ANSWER','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}	
		
		newCheckListGridNxtRenderFn =  function(val,metaData,record)
		{
		
			var radioHTML;
			radioHTML=""
			if(val== "")
				return;


			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO_NXT") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER_NXT") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('newCheckListGrid','"+record.getId()+"','ANSWER_NXT','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}
		
		newCheckListGridLstRenderFn =  function(val,metaData,record)
		{
			var radioHTML;
			radioHTML=""
			if(val== "")
				return;


			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO_LST") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER_LST") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('newCheckListGrid','"+record.getId()+"','ANSWER_LST','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}
		newcheckListImageRenderFn =  function(val,metaData,record)
		{
			var btnHTML;
			var tmpName ="Download"
			var tmpColName="IMAGE";
			btnHTML=""
			if(val== "")
				return;									
			hdnImages=val;			
			btnHTML=btnHTML+"<img src='resources/images/FileUpload/imagedownload.png' style='cursor:pointer;' title ='click here to preview' "			
			btnHTML=btnHTML+" onClick=downloadCheckListImage('newCheckListGrid','"+record.getId()+"','"+tmpColName+"') "
			btnHTML=btnHTML+"/>"			
			return btnHTML
		}
		newcheckListNxtImageRenderFn =  function(val,metaData,record)
		{
			var btnHTML;
			var tmpName ="Download";
			var tmpColName="IMAGE_NXT";
			btnHTML=""
			if(val== "")
				return;									
			hdnImages=val;			
			btnHTML=btnHTML+"<img src='resources/images/FileUpload/imagedownload.png' style='cursor:pointer;' title ='click here to preview' "			
			btnHTML=btnHTML+" onClick=downloadCheckListImage('newCheckListGrid','"+record.getId()+"','"+tmpColName+"') "
			btnHTML=btnHTML+"/>"			
			return btnHTML
		}
		newcheckListLstImageRenderFn =  function(val,metaData,record)
		{
			var btnHTML;
			var tmpName ="Download";
			var tmpColName="IMAGE_NXT";
			btnHTML=""
			if(val== "")
				return;									
			hdnImages=val;			
			btnHTML=btnHTML+"<img src='resources/images/FileUpload/imagedownload.png' style='cursor:pointer;' title ='click here to preview' "			
			btnHTML=btnHTML+" onClick=downloadCheckListImage('newCheckListGrid','"+record.getId()+"','"+tmpColName+"') "
			btnHTML=btnHTML+"/>"			
			return btnHTML
		}
		
		var chkListObj1=									//69997
		[	

			
			{columnname:"No",dataname:"SEQ_NO",datatype:"string",width:50,colAlign:"center",columnColor:"firstColumn"},
			{columnname:"Check List Code",dataname:"CHK_LIST_CODE",datatype:"string",width:100,hidden:true,columnColor:"firstColumn"},
			{columnname:"Check List Description",dataname:"CHK_LIST_NAME",datatype:"string",width:200,hidden:true,columnColor:"firstColumn"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC",datatype:"string",width:230,columnColor:"firstColumn"},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",width:100,hidden:true,columnColor:"firstColumn"},
			{columnname:"Options",dataname:"OPTION_DESCCSV",datatype:"string",width:100,renderer:newCheckListGridRenderFn,columnColor:"firstColumn"},
			{columnname:"Answer",dataname:"ANSWER",datatype:"string",editControl:"textbox",width:100,hidden:true,columnColor:"firstColumn"},
			{columnname:"",dataname:"IMAGE",datatype:"string",renderer:newcheckListImageRenderFn,/*editControl:"filedownload",*/width:40,columnColor:"firstColumn"},
			
			{columnname:"No",dataname:"SEQ_NO_NXT",datatype:"string",width:50,colAlign:"center",columnColor:"secondColumn"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_NXT",datatype:"string",width:230,columnColor:"secondColumn"},
			{columnname:"Options",dataname:"OPTION_DESCCSV_NXT",datatype:"string",width:100,renderer:newCheckListGridNxtRenderFn,columnColor:"secondColumn"},			
			{columnname:"Answer",dataname:"ANSWER_NXT",datatype:"string",editControl:"textbox",width:100,hidden:true,columnColor:"secondColumn"},
			{columnname:"",dataname:"IMAGE_NXT",datatype:"string",renderer:newcheckListNxtImageRenderFn,/*editControl:"filedownload",*/width:40,columnColor:"secondColumn"},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_NXT",datatype:"string",width:100,hidden:true,columnColor:"secondColumn"},
			
			{columnname:"No",dataname:"SEQ_NO_LST",datatype:"string",width:50,colAlign:"center",columnColor:"thirdColumn"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_LST",datatype:"string",width:230,columnColor:"thirdColumn"},
			{columnname:"Options",dataname:"OPTION_DESCCSV_LST",datatype:"string",width:100,renderer:newCheckListGridLstRenderFn,columnColor:"thirdColumn"},			
			{columnname:"Answer",dataname:"ANSWER_LST",datatype:"string",editControl:"textbox",width:100,hidden:true,columnColor:"thirdColumn"},
			{columnname:"",dataname:"IMAGE_LST",datatype:"string",renderer:newcheckListLstImageRenderFn,/*editControl:"filedownload",*/width:40,columnColor:"thirdColumn"},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_LST",datatype:"string",width:100,hidden:true,columnColor:"thirdColumn"}
			
		]
		var chkListGridDetail1=						//69997
		{
			
			id:"newCheckListGrid",
			detail:chkListObj1,
			columnWidth:1,
			visibleRow:15,
			groupByField: 'CHK_LIST_NAME',
			removeAddDelete:true,
			readonly:true,
			removeFilter:true,
			removeColumns:true

		}
	
		var checkListGridSection1 = plf.addGrid(chkListGridDetail1,this)		//69997
		//Second chk list code ends
		var checkListColumn = plf.addColumnSection({title:"Checklist: Critical"});	//69997
		var checkListColumn1 = plf.addCollapseSection({title:"Checklist: Non-critical",collapsed: true},this);
		checkListColumn.add(checkListGridSection)	
		checkListColumn.add(plf.addSplitter)
		checkListColumn1.add(checkListGridSection1)
		
		
		LoadCheckListGridRenderFn =  function(val,metaData,record)
		{
			var radioHTML;
			radioHTML=""
			if(val== "")
				return;	
			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('checkLoadList','"+record.getId()+"','ANSWER','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}	
		
		LoadCheckListGridNxtRenderFn =  function(val,metaData,record)
		{
		
			var radioHTML;
			radioHTML=""
			if(val== "")
				return;	
			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO_NXT") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER_NXT") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('checkLoadList','"+record.getId()+"','ANSWER_NXT','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}
		
		LoadCheckListGridLstRenderFn =  function(val,metaData,record)
		{
			var radioHTML;
			radioHTML=""
			if(val== "")
				return;	
			val.split(",").forEach(function(tmp_arr_inst)
				{
					radioHTML=radioHTML+"<input type='radio' "
					radioHTML=radioHTML+" name='"+ record.get("CHK_LIST_CODE")+'~'+record.get("CHKLST_DTL_SEQ_NO_LST") +"' "
					radioHTML=radioHTML+" value='"+tmp_arr_inst+"' "
					if(record.get("ANSWER_LST") == tmp_arr_inst)
					{
						radioHTML=radioHTML+ " checked "
					}
					radioHTML=radioHTML+" onClick=updateCheckListRecord('checkLoadList','"+record.getId()+"','ANSWER_LST','"+tmp_arr_inst+"') "
					radioHTML=radioHTML+">"+tmp_arr_inst+"</input>"
					
				}
			)							
			return radioHTML
		}
		
		var chkLoadListObj=									//69997
		[
			
			{columnname:"No",dataname:"SEQ_NO",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Check List Code",dataname:"CHK_LIST_CODE",datatype:"string",width:100,hidden:true},
			{columnname:"Check List Header Desc",dataname:"CHK_LIST_NAME",datatype:"string",width:200,hidden:true},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC",datatype:"string",width:225},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO",datatype:"string",width:100,hidden:true},
			{columnname:"Options",dataname:"OPTION_DESCCSV",datatype:"string",width:100,renderer:LoadCheckListGridRenderFn},
			{columnname:"Answer",dataname:"ANSWER",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Image",dataname:"IMAGE",datatype:"string",editControl:"filedownload",width:100,columnColor:"firstColumn"},
			
			{columnname:"No",dataname:"SEQ_NO_NXT",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_NXT",datatype:"string",width:225},
			{columnname:"Options",dataname:"OPTION_DESCCSV_NXT",datatype:"string",width:100,renderer:LoadCheckListGridNxtRenderFn},			
			{columnname:"Answer",dataname:"ANSWER_NXT",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Image",dataname:"IMAGE_NXT",datatype:"string",editControl:"filedownload",width:100,columnColor:"secondColumn"},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_NXT",datatype:"string",width:100,hidden:true},
			
			{columnname:"No",dataname:"SEQ_NO_LST",datatype:"string",width:50,colAlign:"center"},
			{columnname:"Description",dataname:"CHKLST_DTL_DESC_LST",datatype:"string",width:225},
			{columnname:"Options",dataname:"OPTION_DESCCSV_LST",datatype:"string",width:100,renderer:LoadCheckListGridLstRenderFn},			
			{columnname:"Answer",dataname:"ANSWER_LST",datatype:"string",editControl:"textbox",width:100,hidden:true},
			{columnname:"Image",dataname:"IMAGE_LST",datatype:"string",editControl:"filedownload",width:100,columnColor:"thirdColumn"},
			{columnname:"Det Seq No",dataname:"CHKLST_DTL_SEQ_NO_LST",datatype:"string",width:100,hidden:true}
			
			
		]
		var chkLoadListGridDetail=									//69997
		{
			title:"Load Inspection Checklist",
			id:"checkLoadList",
			detail:chkLoadListObj,
			visibleRow:5,
			//groupByField: 'CHK_LIST_NAME',
			removeAddDelete:true,
			readonly:true,
			removeFilter:true,
			removeColumns:true
		}
		
		var checkLoadListGridSection = plf.addGrid(chkLoadListGridDetail)					//69997
		 /******* Tyre Photo upload section start here ****************/
     var MandatoryTyresPhotoUploadObj=	
		[
			{columnname:"Tyre Position",dataname:"TYRE_POSITION",datatype:"string",editControl:"readonly",width:125},
			{columnname:"Asset Type",dataname:"ASSET_TYPE",datatype:"string",editControl:"readonly",width:100},
			{columnname:"File Name",dataname:"FILE_NAME",datatype:"string",width:100},
			{columnname:"Upload Photo",dataname:"UPLOAD_PHOTO",datatype:"string",editControl:"fileupload",fileGroup:"Driver/Documents",width:140,nameColumn:"FILE_NAME"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:180}
		]
		var MandatoryTyresPhotoGridDtl=	
		{
			title:"Mandatory Photo Upload for Tyres",
			id:"MandatoryTyresPhotoUpload",
			columnWidth:0.50,
			detail:MandatoryTyresPhotoUploadObj,
			visibleRow:4,
			removeAddDelete:true,
			readonly:true

		}
	  var  MandatoryTyresPhotoGridSection = plf.addGrid(MandatoryTyresPhotoGridDtl,this)	
	   
          	
	var OptionalTyresPhotoUploadObj=	
		[
			{columnname:"Tyre Position",dataname:"TYRE_POSITION",datatype:"string",storeId:"strOptTyrepos",editControl:"combo",width:125},
			{columnname:"Asset Type",dataname:"ASSET_TYPE",datatype:"string",storeId:"strOptAssettype",editControl:"combo",width:100},
			{columnname:"File Name",dataname:"FILE_NAME",datatype:"string",width:100},
			{columnname:"Upload Photo",dataname:"UPLOAD_PHOTO",datatype:"string",editControl:"fileupload",fileGroup:"Driver/Documents",width:135,nameColumn:"FILE_NAME"},
			{columnname:"Remarks",dataname:"REMARKS",datatype:"string",editControl:"textbox",width:160}
		]
		var OptionalTyresPhotoGridDtl=		
		{
			title:"Optional Photo Upload for Tyres",
			id:"OptionalTyresPhotoUpload",
			columnWidth:0.50,
			detail:OptionalTyresPhotoUploadObj,
			visibleRow:4,
			//removeAppend:true,
			removeAddDelete:true,
			readonly:true
		}
	  var  OptionalTyresPhotoGridSection = plf.addGrid(OptionalTyresPhotoGridDtl,this)

       
		var TyresPhotosUploadColumn = plf.addColumnSection({});	
		TyresPhotosUploadColumn.add(MandatoryTyresPhotoGridSection)
		TyresPhotosUploadColumn.add(plf.addSplitter)
         TyresPhotosUploadColumn.add(OptionalTyresPhotoGridSection)
		TyresPhotosUploadColumn.add(plf.addStripLine({}));
 /******* Tyre Photo upload section end here ****************/
		//Tyre Pressure Section Begins
		plf.columns=4
		var TyrePressureColumn = plf.addColumnSection({title:"Tyre Pressure – Front Tyres (PSI)"});		
		var TyrePressureCtrl=					
		[
			plf.addDisplayOnly({"label":"Driver Side",id:"strRTyrePressure",inputFormat:'integer',InputLength:"3"/*weightPrecision:3*/}),
			plf.addDisplayOnly({"label":"Passenger Side",id:"strLTyrePressure",inputFormat:'integer',InputLength:"3"/*weightPrecision:3*/})
		]
		TyrePressureColumn.add(TyrePressureCtrl);
		//Tyre Pressure Section Ends
		
		
		
	//Tyre Manufacturing Section Begins
		plf.columns=4
		var TyreManufacColumn = plf.addColumnSection({title:"Tyre Manufacturing Date - Front Tyres"});		
		var TyreManufacCtrl=					
		[
			plf.addWeekYear({"label":"Driver Side",weekId:"strRTyreManufact",YearId:"strRTyreManufactYr",}),
			plf.addWeekYear({"label":"Passenger Side",weekId:"strLTyreManufact",YearId:"strLTyreManufactYr",})
			//plf.addDisplayOnly({"label":"Driver Side",weekId:"strRTyreManufact",YearId:"strRTyreManufactYr",}),
			//plf.addDisplayOnly({"label":"Passenger Side",weekId:"strLTyreManufact",YearId:"strLTyreManufactYr",})
		]
		TyreManufacColumn.add(TyreManufacCtrl);
		//Tyre Manufacturing Section Ends
		
		/******* Tyre Details section start here ****************/
		plf.columns=4
		var TyreDetailsColumn = plf.addColumnSection({title:"Tyre Serial Numbers"});		
		var TyreDetailsCtrl=					
		[
			plf.addDisplayOnly({"label":"Driver Tyre",id:"strDriverTyre",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Passenger Tyre",id:"strPassengerTyre",InputLength:"100"}),
			plf.addDisplayOnly({"label":"Spare Tyre",id:"strSpareTyre",InputLength:"100"}),
			plf.addDisplayTextArea({"label":"Request Remarks",id:"strRFIDRemarks",InputLength:"400"}),
			plf.addTextArea({"label":"Approval/Rejection Remarks",id:"strRFIDApprovalRemarks",InputLength:"400","mandatory":"true"}),
			plf.addBlank(), 
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank(),
			plf.addBlank()
		]
		TyreDetailsColumn.add(TyreDetailsCtrl);
		/******* Tyre Details section start here ****************/
		
		//Pre Journey Inspection  Status Section Begins
		plf.columns=4
		var preJourneyInspectionStatusColumn = plf.addColumnSection({});					//69997
		var preJourneyInspectionStatusCtrl=										//69997
		[
			plf.addDisplayOnly({"label":"Inspection Remarks",id:"strInspectionRemarks"}),
			//plf.addCombo({"label":"Rejection Reasons",id:"strRejectionReasons"}),
		//	plf.addCombo({"label":"Re-Inspection Reason",id:"strReInspectionReasons"})
		   plf.addDisplayOnly({"label":"Rejection Reasons",id:"strRejectionReasons"}),
			plf.addDisplayOnly({"label":"Re-Inspection Reason",id:"strReInspectionReasons"})
		]
		preJourneyInspectionStatusColumn.add(preJourneyInspectionStatusCtrl);
		//Pre Journey Inspection  Status Section Ends
		
		
		//Add Header Section to Main Page
		mainpage.ptrMainSection.add(preJourneyInspectionColumn)
              mainpage.ptrMainSection.add(preSADJourneyInspectionColumn)//Raj for Scheduled Asset Details
              mainpage.ptrMainSection.add(preRADJourneyInspectionColumn)//Raj for Reporting Asset Details
		mainpage.ptrMainSection.add(truckAndDriverColumn) //Add Truck Grid Section to Main Page
		//mainpage.ptrMainSection.add(preJourneyInspectionDriverGridSection) //Add Truck Grid Section to Main Page
	//	mainpage.ptrMainSection.add(checkListGridSection)
	    mainpage.ptrMainSection.add(checkListColumn)
		mainpage.ptrMainSection.add(checkListColumn1)
		//mainpage.ptrMainSection.add(checkLoadListGridSection)
	
		//mainpage.ptrMainSection.add(inspectionInsideFieldset) //Add Inspection Inside Section to Main Page
		//mainpage.ptrMainSection.add(inspectionAroundFieldset) //Add Inspection Around Section to Main Page
		mainpage.ptrMainSection.add(TyresPhotosUploadColumn) //Add tyre photo Grid Section to Main Page
		mainpage.ptrMainSection.add(TyrePressureColumn) //Tyre Pressure Section to Main Page
		mainpage.ptrMainSection.add(TyreManufacColumn) //Tyre Manufacturing Section to Main Page
		mainpage.ptrMainSection.add(TyreDetailsColumn) //Tyre Manufacturing Section to Main Page
		
		mainpage.ptrMainSection.add(preJourneyInspectionStatusColumn) //Add Inspection Status Section to Main Page
		
		mainpage.dataHistorySectionFlag=true;
		
		// Event Handlers Mapping Begins
		
		mainpage.eventHandlers = 
		[
		{
				"controlid":"strInspectionNo",
				"tasktype":"onload",
				"input":["strInspectionNo","fetchcheckListGrid"],
				"service":"CoreInspectionsService",
				"methodName":"initPeriodInspectionScrTS"
				
			},
			
			{
				"controlid":"strInspectionType",
				"tasktype":"onchange",
				"input":["strProcessCode","strInspectionNo","strInspectionType"],
				"service":"CoreInspectionsService",
				"methodName":"fetchchecklistStepsTS"
			},
		    {
				"controlid":"strInspectionNo",
				"tasktype":"onenter",
				"input":["strInspectionNo","strProcessCode","fetchcheckListGrid"],
				"service":"CoreInspectionsService",
				//"methodName":"fetchPeriodInspectionScrTS"
				"methodName":"fetchrfidrequestInspTS"
				
			},
			 {
				"controlid":"strReportingDriver",
				"tasktype":"onenter",
				"input":["strReportingDriver"],
				"service":"CoreInspectionsService",
				"methodName":"fetchRepDriverScrTS"
				
			},
			 {
				"controlid":"strReportingVehicle",
				"tasktype":"onenter",
				"input":["strReportingVehicle","dtInspectionDate"],
				"service":"CoreInspectionsService",
				"methodName":"fetchRepVehScrTS"
				
			},
            {
				"controlid":"strTrailerCode",
				"tasktype":"onenter",
				"input":["strTrailerCode"],
				"service":"CoreInspectionsService",
				"methodName":"fetchRepTrailerCodeTS"
				
			},/********
			 {
				"controlid":"strInspectionNo",
				"tasktype":"toolbarclick",
				"action":"Save",
				"input":["strInspectionNo","strStatus","strInspectionRemarks","strTruckCode","strRejectionReasons",
				"strInspectionType","dtValidFrom","dtValidTo","strTruckDocuments","strDriverDocuments","checkListGrid",
				"newCheckListGrid","checkLoadList","strReportingDriver","strReportingVehicle","dtInspectionDate","iInspectionTime","strTrailerCode","strRepoDriverDOB","strDriverCode","strRTyrePressure","strLTyrePressure","strRTyreManufact","strLTyreManufact","strRTyreManufactYr","strLTyreManufactYr",
				"MandatoryTyresPhotoUpload","OptionalTyresPhotoUpload","strDriverTyre","strPassengerTyre","strSpareTyre","strRegNoSec","strRFIDRemarks"],
				"service":"CoreInspectionsService",
				"methodName":"maintainPeriodInspectionScrTS"
				
			},
			{
				"controlid":"strInspectionNo",
				"tasktype":"toolbarclick",
				"action":"ReInspect",
				"input":["strInspectionNo","strInspectionResult","strTruckCode","strInspectionRemarks","iSeqNo","strStatus",
				"strInspectionType","dtValidFrom","dtValidTo","strTruckDocuments","strDriverDocuments","checkListGrid",
				"newCheckListGrid","checkLoadList","strRejectionReasons","strReportingDriver","strReportingVehicle","dtInspectionDate","iInspectionTime","strTrailerCode","strReInspectionReasons","strRepoDriverDOB","strDriverCode","strRTyrePressure","strLTyrePressure","strRTyreManufact","strLTyreManufact","strRTyreManufactYr","strLTyreManufactYr","MandatoryTyresPhotoUpload","OptionalTyresPhotoUpload",
				"strDriverTyre","strPassengerTyre","strSpareTyre","strRegNoSec","strRFIDRemarks"],
				"service":"CoreInspectionsService",
				"methodName":"reinspectPeriodInspectionScrTS"
				

			}, *****************/
			{
				"controlid":"strInspectionNo",
				"tasktype":"toolbarclick",
				"action":"Approve",
				"input":["strInspectionNo","strInspectionResult","strTruckCode","strInspectionRemarks","iSeqNo","strDriverCode",
				"strInspectionType","dtValidFrom","dtValidTo","strTruckDocuments","strDriverDocuments","checkListGrid","strRegNoSec",
				"newCheckListGrid","checkLoadList","strRejectionReasons","strLoadNo","strReportingDriver","strReportingVehicle","dtInspectionDate","iInspectionTime","strTrailerCode","strRepoDriverDOB","strRTyrePressure","strLTyrePressure","strRTyreManufact","strLTyreManufact","strRTyreManufactYr","strLTyreManufactYr","MandatoryTyresPhotoUpload","OptionalTyresPhotoUpload",
				"strDriverTyre","strPassengerTyre","strSpareTyre","strRFIDRemarks","strRFIDApprovalRemarks"],
				"service":"CoreInspectionsService",
				//"methodName":"authorizePeriodInspectionScrTS"
				"methodName":"confirmInspectionRfidReqTS",
				"msg":"Are you sure you want to approve?"
				

			},
			{
				"controlid":"strInspectionNo",
				"tasktype":"toolbarclick",
				"action":"Reject",
				"input":["strInspectionNo","strInspectionResult","strRejectionReasons","strTruckCode","strTrailerCode","strDriverCode",
				"strInspectionType","dtValidFrom","dtValidTo","strTruckDocuments","strDriverDocuments","checkListGrid","newCheckListGrid",
				"checkLoadList","strLoadNo","strReportingDriver","strReportingVehicle","dtInspectionDate","iInspectionTime","strRepoDriverDOB","strRTyrePressure","strLTyrePressure","strRTyreManufact","strLTyreManufact","strRTyreManufactYr","strLTyreManufactYr","MandatoryTyresPhotoUpload","OptionalTyresPhotoUpload","strInspectionRemarks","strDriverTyre","strPassengerTyre","strSpareTyre",
				"strRegNoSec","strRFIDRemarks","strRFIDApprovalRemarks"
				],
				"service":"CoreInspectionsService",
				//"methodName":"rejectPeriodInspectionScrTS"
				"methodName":"rejectInspectionRfidReqTS",
				"msg":"Are you sure you want to reject?"
				

			},/*
			{
				"controlid":"strInspectionNo",
				"tasktype":"toolbarclick",
				"action":"No Show",
				"input":["strSignature","strInspectionNo","strInspectionResult","strRejectionReasons","strTruckCode","strTrailerCode","strDriverCode",
				"strInspectionType","dtValidFrom","dtValidTo","strTruckDocuments","strDriverDocuments","checkListGrid","newCheckListGrid",
				"checkLoadList","strLoadNo","strReportingDriver","strReportingVehicle","dtInspectionDate","iInspectionTime","strRepoDriverDOB","strRTyrePressure","strLTyrePressure","strRTyreManufact","strLTyreManufact","strRTyreManufactYr","strLTyreManufactYr","MandatoryTyresPhotoUpload","OptionalTyresPhotoUpload","strInspectionRemarks","strDriverTyre","strPassengerTyre","strSpareTyre",
				"strRegNoSec","strRFIDRemarks"],
				"service":"CoreInspectionsService",
				"methodName":"NSHWPeriodInspectionScrTS"
				//completed

			},
            //69624 changes
			{
				"controlid":"strInspectionNo",
				"tasktype":"toolbarclick",
				"action":"Short Close",
				"input":["strInspectionNo","strInspectionResult","strRejectionReasons","strTruckCode","strTrailerCode","strDriverCode",
				"strInspectionType","dtValidFrom","dtValidTo","strTruckDocuments","strDriverDocuments","checkListGrid","newCheckListGrid",
				"checkLoadList","strLoadNo","strReportingDriver","strReportingVehicle","dtInspectionDate","iInspectionTime","strRepoDriverDOB","strRTyrePressure","strLTyrePressure","strRTyreManufact","strLTyreManufact","strRTyreManufactYr","strLTyreManufactYr","MandatoryTyresPhotoUpload","OptionalTyresPhotoUpload","strInspectionRemarks","strDriverTyre","strPassengerTyre","strSpareTyre",
				"strRFIDRemarks"],
				"service":"CoreInspectionsService",
				"methodName":"shortcloseLdInspScrTs"
				//completed

			},*********/
			{
			    "controlid":"",
				"tasktype":"toolbarclick",
				"action":"Print Inspection Report",
                "input":["strInspectionNo","strInspectionType"],
				"service":"CoreReportService",
				"methodName":"PrintVehicleInspectReport"
			}/*,
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"input":["strLoadNo"],
				"action":"Print Waybill",
				"service":"CoreReportService",
				"methodName":"PrintwaybillloadingReport"
			},
			{
				"controlid":"strInspectionNo",
				"tasktype":"toolbarclick",
				"action":"Send For RFID Approval",
				"input":["strInspectionNo","strInspectionResult","strTruckCode","strInspectionRemarks","iSeqNo","strDriverCode",
				"strInspectionType","dtValidFrom","dtValidTo","strTruckDocuments","strDriverDocuments","checkListGrid","strRegNoSec",
				"newCheckListGrid","checkLoadList","strRejectionReasons","strLoadNo","strReportingDriver","strReportingVehicle","dtInspectionDate","iInspectionTime","strTrailerCode","strRepoDriverDOB","strRTyrePressure","strLTyrePressure","strRTyreManufact","strLTyreManufact","strRTyreManufactYr","strLTyreManufactYr","MandatoryTyresPhotoUpload","OptionalTyresPhotoUpload",
				"strDriverTyre","strPassengerTyre","strSpareTyre","strRFIDRemarks"
				],
				"service":"CoreInspectionsService",
				"methodName":"SendForRFIDApprovalTS"
				
			},**********/

	
		];
		
		//Event Handlers Mapping Ends
			
			mainpage.screenModes=
		{
			"open":
			{
				"enableAll":true,
				"except":[]
			},
			"locked":
			{
				"enableAll":false,
				"except":["strInspectionNo"]
			},
			"active":
			{
				"enableAll":false,
				"except":["ivmsGrid","truckDocGrid"]
			}			
		}
		mainpage.hlpLinks=
		{
			"inspectionno":
				{
					"hlpType":"Header",
					"hlpScreen":"inspection.InspectionApprovalHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strInspectionNo","child":"INSPECTION_NO"}
							]
				},
			"reportingdriver":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverHelp",
					"send":[
							{"parent":"","child":""},
                                                 {"direct":"DRIVER_AC","child":"strContext"}//74993
						   ],
					"receive":[
							{"parent":"strReportingDriver","child":"DRIVER_CODE"},
                                                 {"parent":"strReprDriverName","child":"DRIVER_NAME"},
                                                 {"parent":"strReprDriverPhNo","child":"PHONE_NO"}
							]
				},
			"reportingvehicle":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TruckHelp",
					"send":[
							{"parent":"","child":""},
                            {"direct":"VEHICLE_AC","child":"strContext"}//74993
						   ],
					"receive":[
							{"parent":"strReportingVehicle","child":"TRUCK_CODE"},
                                                 {"parent":"strReportingVeh","child":"TRUCK_CODE"},
                                                 {"parent":"strVehicleCat","child":"TRUCK_CATEGORY"}//75145
							]
				},
                 "reportingTrailerCode":
				{
					"hlpType":"Header",
					"hlpScreen":"jm_master.TrailerHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strTrailerCode","child":"TRUCK_CODE"}
							]
				},
				"DOB_Update":
			   {
					"hlpType":"Header",
					"hlpScreen":"jm_master.DriverDOBUpdate",
					"send":[
							{"parent":"strDriverCode","child":"strDriverCode"},
							{"parent":"strReportingDriver","child":"strReportingDriver"},
							],
					"receive":[
							{"parent":"","child":""}
							]
			   },
		}
				
		//Generate Screen Section
/*	mainpage.generateScreen();
		
		
		Ext.apply(this,
		{
			items:
			[
				mainpage
			]
		});*/
		this.callParent(arguments);
	}
});
