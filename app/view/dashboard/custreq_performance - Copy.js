Ext.define('CueTrans.view.dashboard.custreq_performance',
    {
        extend: "CueTrans.lib.plfTransScreen",
        initComponent: function() {

            //var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
            var mainpage = this;
            mainpage.startPainting();
			mainpage.screenName = "Customer Request Performance Report";
            // Add Toolbar
            mainpage.toolbarSectionFlag = false;
            plf.columns = 4		
            var tmpRow1 = plf.addGenSection({})			
			/*Search Criteria starts here*/
			/*tmpRow1.add(
				plf.addLabel({"text":"Customer Request Dashboard",id:"strStatus"}))	*/
			tmpRow1.add(
				plf.addDate({"label":"PickUp Date",id:"dtDate"}))	
			tmpRow1.add(
				plf.addCombo({"label":"Origin",id:"strOrigin"}))	
			tmpRow1.add(
				plf.addCombo({"label":"Destination",id:"strDestination"}))
			tmpRow1.add(
				plf.addButton({"label":"Search","id":"btnSearch"}))	
				
			/*Search Criteria ends here*/	
			plf.columns = 3
            var tmpRow2 = plf.addGenSection({})
			var tmpChart1 = plf.addGraph({
                "id": "line1",
                "chartType": "column",
                "xAxisCaption": "Date",
                "yAxisCaption": "Weight",
				"lnkID":"origin",
                chartHeight: 175,
                chartWidth: 694
            },this)
			/*
			Ext.data.StoreManager.lookup('line1_store').loadData([
				{"yaxis":90,"xaxis":"1 Aug"},
				{"yaxis":60,"xaxis":"2 Aug"},
				{"yaxis":30,"xaxis":"3 Aug"},
				{"yaxis":120,"xaxis":"4 Aug"},
				{"yaxis":60,"xaxis":"5 Aug"},
				{"yaxis":30,"xaxis":"6 Aug"},
				{"yaxis":120,"xaxis":"7 Aug"},
				{"yaxis":60,"xaxis":"8 Aug"},
				{"yaxis":30,"xaxis":"9 Aug"},
				{"yaxis":120,"xaxis":"10 Aug"},
				{"yaxis":60,"xaxis":"11 Aug"},
				{"yaxis":30,"xaxis":"12 Aug"}				
				],false);
			*/
            tmpRow2.add(
				plf.addSvg({
					"id": "svg1",
					"svgID": "svg1",
					"columnWidth": .67,
					"svgHeight":170,
					"svgData": {
						"text1": "",
						"text2": ""
					},
					"svgObjData": {
						"div1": tmpChart1
					},
                "svgURL": "resources/images/svg/CustomerRequest/chart824.svg"
            }))
			var gridobj=
			[					
				{columnname:"Origin-Destination",dataname:"strOrigin",datatype:"string",width:250},				
				{columnname:"Weight",dataname:"strWeight",datatype:"string",width:75,popupid:"origin"}
			]
			var gridDtl=
			{
				title:"",
				id:"commodity_dtl",
				removetoolbar:true,
				detail:gridobj,
				visibleRow:plf.searchVisibleRows,				
				removeAddDelete:true,
				removeFilter:true
			}
			var tmpChart = plf.addGrid(gridDtl,this)	
			
			
			tmpRow2.add(
				plf.addSvg({
					"id": "svg2",
					"svgID": "svg2",
					"columnWidth": .33,
					"svgData": {
						"text1": "",
						"text2": ""
					},
					"svgObjData": {
						"grid1_cr": tmpChart
					},
                "svgURL": "resources/images/svg/CustomerRequest/grid1.svg"
            }))
            
			
			plf.columns = 3
           var tmpRow3 = plf.addGenSection({
               
            })
            var tmpChart2 = plf.addGraph({
                "id": "guage1",
                "chartType": "guage",
                "xAxisCaption": "Date",
                "yAxisCaption": "Cost",
                chartHeight: 182.08333,
                chartWidth: 290
            },this)
			
			Ext.data.StoreManager.lookup('guage1_store').loadData([{"yaxis":90}],false);
			
            tmpRow3.add(plf.addSvg({
                "id": "svg3",
                "svgID": "svg3",
                "svgData": {
                    "text1": "100",
                    "text2": ""
                },
                "svgObjData": {
                    "gauge1_chart": tmpChart2
                },
                "svgURL": "resources/images/svg/CustomerRequest/gauge1.svg"
            }))
			
            var tmpChart3 = plf.addGraph({
                "id": "guage2",
                "chartType": "guage",
                "xAxisCaption": "Date",
                "yAxisCaption": "Cost",
                chartHeight: 182.08333,
                chartWidth: 290
            },this)
			Ext.data.StoreManager.lookup('guage2_store').loadData([{"yaxis":60}],false);
			
            tmpRow3.add(plf.addSvg({
                "id": "svg4",
                "svgID": "svg4",
                "svgData": {
                    "text1": "100",
                    "text2": ""
                },
                "svgObjData": {
                    "gauge2_chart": tmpChart3
                },
                "svgURL": "resources/images/svg/CustomerRequest/gauge2.svg"
            }))
			var gridcustobj=
			[					
				{columnname:"Customer Name",dataname:"strCustomer",datatype:"string",width:250},				
				{columnname:"Weight",dataname:"strWeight",datatype:"string",width:75}
			]
			var gridcustDtl=
			{
				title:"",
				id:"customer_dtl",
				removetoolbar:true,
				detail:gridcustobj,
				visibleRow:plf.searchVisibleRows,
				readOnly:true,
				removeAddDelete:true,
				removeFilter:true
			}
			var tmpChart4 = plf.addGrid(gridcustDtl,this)          
			
            tmpRow3.add(plf.addSvg({
                "id": "svg5",
                "svgID": "svg5",
                "svgData": {
                    "text1": "100",
                    "text2": ""
                },
                "svgObjData": {
                    "grid2_cust": tmpChart4
                },
                "svgURL": "resources/images/svg/CustomerRequest/grid2.svg"
            }))
			
			mainpage.ptrMainSection.add(tmpRow1) //Add Header Section to Main Page  
			mainpage.ptrMainSection.add(tmpRow2)
			mainpage.ptrMainSection.add(tmpRow3) 
            
			mainpage.eventHandlers = 
			[
			
			{
					"controlid":"",
					"tasktype":"onload",
					"input":[""],
					"service":"TMSCoreTransportTS",
					"methodName":"initTmsDashBoardTS"
			},	
				
			];
			mainpage.popupLinks=
			{
				
					"origin":
					{
						"hlpType":"grid",
						"gridID":"commodity_dtl",
						"hlpScreen":"dashboard.origingrid",
						"hdr":[
							{"src":"","dest":""}							
							],
					"grid":[
							{"src":"strOrigin","dest":"strOrigin"},
							{"src":"strWeight","dest":"strWeight"}
							]
					}	
					
				
			}			
			this.callParent(arguments);
        }

    });