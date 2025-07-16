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
Ext.define('CueTrans.view.peoplelogistics.EmployeeSearch', 
{
	extend:"CueTrans.lib.plfTransScreen",
   
	initComponent: function()
	{		
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Traveller Summary";
		mainpage.liveScreenFlag=true;
		mainpage.toolbarSectionFlag=true;
        mainpage.toolbarLinks=
		[
			{"name":"Create Traveller","linkid":"bpl_travellerMst","tooltip":"Click here to create an traveller."}
		]	
		//Traveller Search Section starts
		plf.columns=4
		var travellerHdrCollapse = plf.addCollapseSection({title:"Search Criteria",collapsed: true,btnID:"btnSearch"},this);
				
		var travellerFormCtrl=
		[
			plf.addText({"label":"Traveller Code",id:"strTravellerCode","anywhereSearch":"true"}),			
			plf.addText({"label":"Traveller Name",id:"strTravellerName"}),
			plf.addCombo({"label":"Traveller Type",id:"strTravellerType"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Country",id:"strCountry"}),
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"})			
		]
		
		travellerHdrCollapse.add(travellerFormCtrl);
		//Traveller Header Section Ends
		
		//Traveller Grid Section Begins
		var TravellerGridFieldObj=
		[
			{columnname:"Traveller Code",dataname:"TRAVELLER_CODE",datatype:"string",width:150,linkId:"TravellerMaster","tooltip":"Click here to launch the traveller screen."},
			{columnname:"Traveller Name",dataname:"TRAVELLER_NAME",datatype:"string",width:150},
			{columnname:"Gender",dataname:"GENDER",datatype:"string",datatype:"string",width:140},
			{columnname:"Traveller Type",dataname:"TRAVELLER_TYPE",datatype:"string",datatype:"string",width:130},
			{columnname:"Phone No",dataname:"PHONE1",datatype:"string",width:130},
			{columnname:"City",dataname:"CITY",datatype:"string",width:100},
			{columnname:"State",dataname:"STATE",datatype:"string",width:100},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:130},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:130}	
		]
		var TravellerGridDtl=
		{
			title:"",
			id:"TravellerRole",
			detail:TravellerGridFieldObj,
			visibleRow:plf.searchVisibleRows,
			readOnly:true,
			removeAddDelete:true
		}
		var TravellerGridSection = plf.addGrid(TravellerGridDtl,this)	
		//Traveller Grid Section Ends
		
		//Add Child Sections
		
		mainpage.ptrMainSection.add(travellerHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(TravellerGridSection) //Add Grid Section to Main Page
			
		// Event Handlers Mapping Begins
		mainpage.eventHandlers = 
		[	
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"PPLCoreMasterTS",
					"methodName":"initTravellerSummTS"
		    },
			{
				"controlid":"btnSearch",
				"tasktype":"btnclick",
				"input":["strTravellerCode","strTravellerName","strTravellerType","strStatus","strCountry","strState","strCity"],
				"service":"PPLCoreMasterTS",
				"methodName":"initTravellerSummTS"
			},
			{
				"controlid":"strCountry",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreLocationService",
				"methodName":"fetchStateTS"
		    },
		
		    {
				"controlid":"strState",
				"tasktype":"onchange",
				"input":["strCountry","strState"],
				"service":"CoreLocationService",
				"methodName":"fetchCityTS"
		    }
			
		];
		//Event Handlers Mapping Ends
		
		mainpage.screenLinks=
		{
			"TravellerMaster":
				{
					"dest":"peoplelogistics.EmployeeMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"TRAVELLER_CODE","dest":"strTravellerCode"}
							]
				},
				"bpl_travellerMst":
				{
					"dest":"peoplelogistics.EmployeeMaster",
					"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"","dest":""}
							]
				}
		}
			
	
		this.callParent(arguments);
		
	}
});
