/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.EntityHierarchy', 
{
	extend:"CueTrans.lib.plfTransScreen",
	initComponent: function()
	{
	    var mainpage = this;
		mainpage.startPainting();
		mainpage.screenName = "Entity Hierarchy";
		mainpage.toolbarSectionFlag=true;
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
			removeAddDelete:true 
		}
		gridSection = plf.addGrid(entityGridFieldDtl,this)
		mainpage.hlpSearchGridPtr = gridSection
		
		mainpage.ptrMainSection.add(gridSection) //Add Grid Section to Main Page
		
		mainpage.eventHandlers = 
		[
	       {
				"controlid":"",
				"tasktype":"onload",
				"input":[""],
				"service":"CoreAdminService",
				"methodName":"initEntityHierTS"
		   }
		]
		this.callParent(arguments);
		
	}
});
