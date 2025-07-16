Ext.define('CueTrans.lib.control.cueMultiSelect',{
	extend:"Ext.panel.Panel",
	layout:"column",
	//cls:"c-mainpage-section",
	//bodyCls:"c-mainpage-section",
	border:0,
	config:
	{
		ctrlId:"",
		mapgridid:"",
		unmapgridid:"",
		keycolumn:"",
		mapdetail:"",
		unmapdetail:"",
		visibleRow:"12"
	},
	initComponent: function()
	{
		this.callParent(arguments)
		

		var unmappedGrid=
		{
			id:this.unmapgridid,
			detail:this.unmapdetail,
			columnWidth:.47,
			removeFilter:true,
			removeExport:true,
			removeAddDelete:true,
			visibleRow:this.visibleRow,
			removeTbar:true,
			removePaging:true,
			widthBasis:"flex",
			//hideHeaders:true,
			removeColumns:true
		}
		var unmappedGridSection = plf.addGrid(unmappedGrid,this)
		unmappedGridSection.removeCls();

		var mappedGrid=
		{
			id:this.mapgridid,
			detail:this.mapdetail,
			columnWidth:.47,
			removeFilter:true,
			removeExport:true,
			removeAddDelete:true,
			visibleRow:this.visibleRow,
			removeTbar:true,
			removePaging:true,
			widthBasis:"flex",
			//hideHeaders:true,
			removeColumns:true
		}
		var mappedGridSection = plf.addGrid(mappedGrid,this)
		mappedGridSection.removeCls();
		
		var btnCtrlSection = plf.addGenSection({layout:"vbox",columnWidth:.06});

		var me = this;
		
		btnCtrlSection.add(
			[
				plf.addButton({
					id:"btnAssign",
					label:"<",
					tooltip:"Click here to unmap.",
					"handler": function() 
					{
						me.transferRecord(me.mapgridid+'_store',me.unmapgridid+'_store')
					}
				}),
				
				plf.addButton({
					id:"btnUnAssign",
					label:">",
					tooltip:"Click here to map.",
					"handler": function() 
					{
						me.transferRecord(me.unmapgridid+'_store',me.mapgridid+'_store')
					}
				}),
			]				
		)
		
		var tmpMapStore = Ext.data.StoreManager.lookup(me.mapgridid+'_store');
		var tmpUnMapStore = Ext.data.StoreManager.lookup(me.unmapgridid+'_store');	
		
		tmpMapStore.on("endupdate",function() {me.updateRecord()} )
		tmpUnMapStore.on("endupdate",function() {me.updateRecord()} )
		
		this.add(unmappedGridSection)
		this.add(btnCtrlSection)
		this.add(mappedGridSection)
		
	},
	transferRecord:function(tmpSourceId,tmpDestId)
	{
	
		var tmpSourceStore = Ext.data.StoreManager.lookup(tmpSourceId);
		var tmpDestStore = Ext.data.StoreManager.lookup(tmpDestId);	
		
		//tmpSourceStore.suspendEvents(false);
		//tmpDestStore.suspendEvents(false);
		var me=this;
		
		Ext.each(tmpSourceStore.getRange(), function(record) 
		{		
			if(record.getData().select) 
			{										
				var tmpChk = tmpDestStore.findRecord(me.keycolumn, record.get(me.keycolumn));
				if (tmpChk ==null)
				{
					record.set('select',false);
					record.commit();
					//tmpDestStore.add(record.copy());
					//var tmpSelRecord = Ext.clone(record);
					//delete tmpSelRecord["id"];
					tmpSourceStore.remove(record);
					//tmpDestStore.add({"CODE":record.get("CODE"),"DESC":record.get("DESC")});
					var tmpRecObj={};
					Ext.each(record.getFields(),function(tmpField)
					{
						if(!(tmpField.getName() == "id"))
						{
							if((tmpField.getName() == "select") || (tmpField.getName() == "recStatus"))
							{
								tmpRecObj[tmpField.getName()] = ""
							}
							else
							{
								tmpRecObj[tmpField.getName()] = record.get(tmpField.getName())
							}
			}
		})
					tmpDestStore.add(tmpRecObj);
				}
				else
				{
					tmpSourceStore.remove(record);
				}
			}
		})
		//tmpSourceStore.resumeEvents();
		//tmpDestStore.resumeEvents();				
	},
	updateRecord:function()
	{
		var me=this;
		//var tmpMapStore = Ext.data.StoreManager.lookup(me.mapgrid+'_store');
		//var tmpUnMapStore = Ext.data.StoreManager.lookup(me.unmapgrid+'_store');	
		
		var tmpMapStore = Ext.data.StoreManager.lookup(me.mapgridid+'_store');
		var tmpUnMapStore = Ext.data.StoreManager.lookup(me.unmapgridid+'_store');	
		
		
		Ext.each(tmpMapStore.getRange(), function(record) 
		{		
			var tmpChk = tmpUnMapStore.findRecord(me.keycolumn, record.get(me.keycolumn),0,false, true, true);
			if (tmpChk)
			{
			    //console.log("removing:",tmpChk,record.get(me.keycolumn));
				tmpUnMapStore.remove(tmpChk);
			}
		})
		
	}
})
