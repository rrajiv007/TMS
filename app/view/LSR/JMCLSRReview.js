/************************************************************************************************
Modification History        									                               	
************************************************************************************************
Description : LSR -LSR Review
Author      : Raj                                                           		         
Version     : 1.0.0
************************************************************************************************	
Version 	Modified By	     Date	      Defect ID			               Remarks             
************************************************************************************************	

************************************************************************************************/

Ext.define('CueTrans.view.LSR.JMCLSRReview',

{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "JMC LSR Review Details";
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=true;			
	    mainpage.toolbarLinks=
		[
						
		]
		//Tool bar Section begins
		mainpage.toolbarActions= 
		[
		    
			{
                "name": "Refresh",
                "tooltip": "Click here to refresh."
            },
			
			{
                "name": "Submit",
                "tooltip": "Click here to Submit.",
				"msg":"Are you sure about Submit?"
            },
			{
                "name": "Amend",
                "tooltip": "Click here to Amend.",
				"msg":"Are you sure about Amend?"
            }
			
        ]
		//Tool bar Section ends		
		var parentForm=mainpage;
		//  Header Section 	
		plf.columns=4
		var LSRRevHdrColumn = plf.addColumnSection({});			
		var LSRRevHdrCtrl=						
		[    
		     plf.addHlpText({"label":"Journey Plan #",id:"strJourneyPlanNo",hlpLinkID:"jpno"},this),
			//plf.addText({"label":"Journey Plan #",id:"strJourneyPlanNo",inputFormat:"string",InputLength:"80"}),
			plf.addButton({id:"View_Journey",label:"View Journey",tooltip:"Click here to view journey.", 
                           width:130,		
							"handler": function() 
							{
								parentForm.launchHlpLink("View_Journey")						
							}
                           })
		]
		LSRRevHdrColumn.add(LSRRevHdrCtrl);
       
	   
	   	//LSR Reporting Details  Section start

		var JMCLSRDetailsGridObj=	
		[   {columnname:"LSR Violation Type Code",dataname:"LSR_TYPE",datatype:"string",editControl:"addDisplayOnly",width:"auto",hidden:true},
			{columnname:"LSR Violation Type",dataname:"LSR_TYPE_DESC",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Violation Details",dataname:"LSR_NOTES",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			//{columnname:"File Name",dataname:"FILE_NAME",datatype:"string",width:150,editControl:"addDisplayOnly"},			
			{columnname:"Download Document",dataname:"REP_DOWNLOAD_DOCUMENT",datatype:"string",linkId:"DOWN_LINKID","tooltip":"Click here to download",type:"filedownload",fileGroup:"Service/Doc_Attachment",width:"auto"},
            {columnname:"LSR Reported By",dataname:"LSR_REPORTED_BY",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Reported Date/Time",dataname:"LSR_REPORTED_DT",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			
			{columnname:"LSR Confirmation Action",dataname:"LSR_CONFIRM_ACTION",datatype:"string",editControl:"addDisplayOnly",width:"auto",hidden:true},
			{columnname:"LSR Confirmation Action",dataname:"LSR_CONFIRM_ACTION_DESC",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Confirmation Remarks",dataname:"LSR_CONFIRM_REMARKS",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			//{columnname:"File Name",dataname:"CON_FILE_NAME",datatype:"string",width:"auto",editControl:"addDisplayOnly"},			
			{columnname:"Download Document",dataname:"CON_DOWNLOAD_DOCUMENT",datatype:"string",linkId:"DOWN_LINKID","tooltip":"Click here to download",type:"filedownload",fileGroup:"Service/Doc_Attachment",width:"auto"},
			{columnname:"LSR Confirmed By",dataname:"LSR_CONFIRMED_BY",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Confirmed Date/Time",dataname:"LSR_CONFIRMED_DT",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			//-------------------------------------------
			{columnname:"LSR Review Action",dataname:"LSR_REVIEW_ACTION",datatype:"string",editControl:"combo",width:"auto",storeId:"strLSRReviewAction"},
			{columnname:"LSR Review Remarks",dataname:"LSR_REVIEW_REMARKS",datatype:"string",editControl:"textbox",width:"auto",inputFormat:"string",InputLength:"4000"},
			{columnname:"File Name",dataname:"REV_FILE_NAME",datatype:"string",width:"auto",editControl:"addDisplayOnly"},	
			{columnname:"Upload Document",dataname:"REV_UPLOADDOCUMENT",datatype:"string",editControl:"fileupload",fileGroup:"JPLSR/Documents",width:"auto",nameColumn:"REV_FILE_NAME"},
			{columnname:"LSR Reviewed By",dataname:"LSR_REVIEWED_BY",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Reviewed Date/Time",dataname:"LSR_REVIEWED_DT",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			//------------------------------
			{columnname:"LSR Approval Action",dataname:"LSR_APPROVAL_ACTION",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Approval Remarks",dataname:"LSR_APPROVAL_REMARKS",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"Download Document",dataname:"APP_DOWNLOAD_DOCUMENT",datatype:"string",linkId:"DOWN_LINKID","tooltip":"Click here to download",type:"filedownload",fileGroup:"Service/Doc_Attachment",width:"auto"},
			{columnname:"LSR Approval By",dataname:"LSR_APPROVAL_BY",datatype:"string",editControl:"addDisplayOnly",width:"auto"},
			{columnname:"LSR Approval Date/Time",dataname:"LSR_APPROVAL_DT",datatype:"string",editControl:"addDisplayOnly",width:"auto"}
			
		]
		var JMCLSRDetailsGridDtl=
		{
			title:"LSR Details",
			id:"JMSLSRDTL", 
			detail:JMCLSRDetailsGridObj,
			columnWidth:1,
			visibleRow:10,
			selDelProcess:'Y',
			removeAddDelete:true,
			selRowProcess:'Y'
			
		}
		var JMCLSRDetailsGridSection = plf.addGrid(JMCLSRDetailsGridDtl,this)
		//LSR Reporting Details  Section Ends
		
		
		
        //Main Page Section Starts

		mainpage.ptrMainSection.add(LSRRevHdrColumn)
		JMCLSRDetailsGridSection.add(plf.addStripLine({}));
		mainpage.ptrMainSection.add(JMCLSRDetailsGridSection) //Add LSR Reporting Section
		//mainpage.dataHistorySectionFlag=true;
		
	    //Main Page Section ends
			
	    // Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[

		  {
				"controlid":"",
				"tasktype":"onload",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				//"methodName":"initLSRConfirmationTS"
				"methodName":"initJMCLSRReviewTS"
			},
			{
				"controlid":"strJourneyPlanNo",
				"tasktype":"onenter",
				"input":["strJourneyPlanNo"],
				"service":"CoreJourneyPlanService",
				//"methodName":"fetchLSRConfirmationTS"
				"methodName":"onenterJMCLSRReviewTS"
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Submit",
				"input":["strJourneyPlanNo","JMSLSRDTL"],
				"service":"CoreJourneyPlanService",
				//"methodName":"submitLSRConfirmationTS"	
                "methodName":"submitJMCLSRReviewTS"					
			},
			{
				"controlid":"",
				"tasktype":"toolbarclick",
				"action":"Amend",
				"input":["strJourneyPlanNo","JMSLSRDTL"],
				"service":"CoreJourneyPlanService",
                "methodName":"AmendJMCLSRReviewTS"					
			}
           
		];
		
		// Event Handlers Mapping ends
		mainpage.hlpLinks=
		{
         "View_Journey":
			{
				"hlpType":"Header",
				"hlpScreen":"LSR.LSRJourneyDtl",
				"send":[
						{"parent":"strJourneyPlanNo","child":"strJourneyPlanNo"}
						],
				"receive":[
						{"parent":"","child":""}
						]
			},
			"jpno":
				{
					"hlpType":"Header",
					"hlpScreen":"LSR.JMCLSRReviewHelp",
					"send":[
							{"parent":"","child":""}
						   ],
					"receive":[
							{"parent":"strJourneyPlanNo","child":"JOURNEY_PLAN_NO"}
							]
				}
		}
		mainpage.gridPopupLinks=
		{
			
		}
		mainpage.screenLinks=
		{
					
		}
		this.callParent(arguments);
		
	}
});