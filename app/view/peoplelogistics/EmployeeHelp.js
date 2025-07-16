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
Ext.define('CueTrans.view.peoplelogistics.EmployeeHelp', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.hlpSectionFlag=true;
		//mainpage.liveScreenFlag=false;
		mainpage.screenName = "Traveller Help";
		mainpage.startPainting();
		
		//Traveller Header Section Begins
		plf.columns=3
		var helpOnTravellerHdrCollapse = plf.addColumnSection({collapsed: true});
		
		var helpOnTravellerFormCtrl=
		[
			plf.addText({"label":"Traveller Code",id:"strTravellerCode"}),			
			plf.addText({"label":"Traveller Name",id:"strTravellerName"}),
			plf.addCombo({"label":"Status",id:"strStatus"}),
			plf.addCombo({"label":"Traveller Type",id:"strTravellerType"}),			
			plf.addCombo({"label":"Country",id:"strCountry"}),			
			plf.addCombo({"label":"State",id:"strState"}),
			plf.addCombo({"label":"City",id:"strCity"}),	              
       		plf.addButton({"label":"Search",id:"btnSearch","tooltip":"Click here to search."})
		]
		helpOnTravellerHdrCollapse.add(helpOnTravellerFormCtrl);
		//Traveller Header Section Ends
		
		//Traveller Grid Section Begins
		var helpOnTravellerGridFieldObj=
		[
			{columnname:"Traveller Code",dataname:"TRAVELLER_CODE",datatype:"string",width:120},
			{columnname:"Traveller Name",dataname:"TRAVELLER_NAME",datatype:"string",width:120},
			{columnname:"Gender",dataname:"GENDER",datatype:"string",datatype:"string",width:100},
			{columnname:"Traveller Type",dataname:"TRAVELLER_TYPE",datatype:"string",datatype:"string",width:120},
			{columnname:"Phone No",dataname:"PHONE1",datatype:"string",width:100},
			{columnname:"City",dataname:"CITY",datatype:"string",width:100},
			{columnname:"State",dataname:"STATE",datatype:"string",width:100},
			{columnname:"Country",dataname:"COUNTRY",datatype:"string",width:100},
			{columnname:"Status",dataname:"STATUS",datatype:"string",width:100},
		]
		var helpOnTravellerGridDtl=
		{
			title:"",
			id:"TravellerRole",
			detail:helpOnTravellerGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true,
			removePaging:true,
		    widthBasis:"flex"
		}
		var helpGridSection = plf.addGrid(helpOnTravellerGridDtl,this)
		mainpage.hlpSearchGridPtr = helpGridSection		
		//Calendar Grid Section Ends
		
		//Add Child Sections
		mainpage.ptrMainSection.add(helpOnTravellerHdrCollapse)//Add Header Section to Main Page
		mainpage.ptrMainSection.add(helpGridSection) //Add Grid Section to Main Page
		
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
				"input":["strTravellerCode","strTravellerName","strStatus","strTravellerType","strCountry","strState","strCity"],
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
		
		this.callParent(arguments);
		
	}
});
