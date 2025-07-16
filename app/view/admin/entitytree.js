/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.entitytree', 
{
extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
		//var mainpage = Ext.create("CueTrans.lib.plfTransScreen");
		var mainpage = this;
		mainpage.startPainting();
		
		mainpage.screenName = "Entity Hierarchy";
		// Add Toolbar
		mainpage.toolbarSectionFlag=true;
		mainpage.liveScreenFlag=false;
 
		mainpage.toolbarActions= [];
		
		var entityMainPanel = plf.addColumnSection({});
		
		plf.columns = 2
		/*
		Ext.define('EntityModel1', {
			extend: 'Ext.data.Model',
			fields: [
				{name: 'EntityName',     type: 'string'},
				{name: 'EntityType',     type: 'string'}
			]
		});
		*/
		var entityStore = Ext.create('Ext.data.TreeStore', {
			storeId: 'EntityTreeSt_store',
			fields: ['EntityName','EntityType'],
			root: {
                children: []
            },
			//model:'EntityModel1'
		});

		 var tree = Ext.create('Ext.tree.Panel', {
				//width: 500,
				columnWidth:.5,
				cls: "c-mainpage-section",
				height:(plf.screenHeight - 170),
				useArrows: true,
				rootVisible: true,
				store: entityStore,
				multiSelect: true,
				singleExpand: false,
				columns: [
					{
					xtype: 'treecolumn', 
					text: 'Entity Name',
					flex: 2,
					sortable: true,
					dataIndex: 'EntityName'
					},
					{
					text: 'Entity Type',
					flex: 1,
					dataIndex: 'EntityType',
					sortable: true
					}
				]
			});		
		
		entityMainPanel.add(tree)
		
		entityGridFieldObj=
		[
			{columnname:"Entity Type",dataname:"ENTITY_TYPE",datatype:"string",width:300},
			{columnname:"Sequence No",dataname:"SEQ_NO",datatype:"string",width:300}
			
		]
		entityGridFieldDtl=
		{
			title:"",
			id:"EntityHierGridDtl",
			detail:entityGridFieldObj,
			visibleRow:plf.helpVisibleRows,
			removeAddDelete:true ,
			removePaging:true,
			removeTbar:true,
			removeColumns:true,
			visibleRow:15,
			widthBasis:"flex",
			columnWidth:.5
		}
		gridSection = plf.addGrid(entityGridFieldDtl,this)
		//mainpage.hlpSearchGridPtr = gridSection
		entityMainPanel.add(gridSection)
		mainpage.ptrMainSection.add(entityMainPanel)
		//mainpage.ptrMainSection.add(gridSection)
		
		/*
		Ext.data.StoreManager.lookup('EntityTreeStore').loadData(			[{
				"EntityType":"Primary Company",
				"EntityName":"Petroleum Development Oman",
				"expanded":true,
				"children": [{
					"EntityName": "Bahwan DHL",
					"EntityType": "Primary LLP",
					"expanded": true,
					"children": [{
						"EntityName": "Transportation Service",
						"EntityType": "Type of Work",
						"expanded": true,			
						"children": [{
							"EntityName": "Oman",
							"EntityType": "Country",
							"expanded": true,
							"children": [{
								"EntityName": "North",
								"EntityType": "Region",
								"expanded": true
							}]
						}]
					}]
				}]
			}]
			,false)		
		*/
		mainpage.eventHandlers = 
		[
			{
				"tasktype":"proto",
				"filename":"admin/entitytree.json"
			}
			/*
			,{
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"TMSCoreTransportTS",
				"methodName":"initGISTS"
			}
			*/
		];
		
		this.callParent(arguments);
	}
});
