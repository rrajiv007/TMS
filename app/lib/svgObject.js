Ext.define("CueTrans.lib.svgObject",{
	extend:"Ext.panel.Panel",	
	svgFileName:"",
	svgID:"",
	height:330,	
	width:1250,
	svgData:{},
	baseCls:'c-svgsearch',		
	initComponent: function()
	{
		var summCont1=Ext.create("Ext.container.Container",{			
					
			items:
			[
				{					
					baseCls:'c-svgsearch1',
					html:"<html><object id='" + this.svgID + "_obj'  name='"+ this.svgID +"_obj' type='image/svg+xml' data='" + this.svgFileName +  "' /></html>",					
				}
			]
		})
		
		this.callParent(arguments);		
		this.add(summCont1)
	},
	svgUpdateData:function(svgData)
	{
		var svgDoc = document.getElementById(this.svgID+"_obj").getSVGDocument();
		console.log(svgDoc)
		
		Ext.each
		(svgData,
			function(svgData_obj)
			{
				for(var key in svgData_obj)
				{	
					var attrName = key;
					var attrValue = svgData_obj[key];
					console.log(attrName)
					
					var tmp_control_obj = svgDoc.getElementById(attrName);
					if(tmp_control_obj != null)
					{
						tmp_control_obj.textContent =attrValue; 
					}
				}
			}
		)
	}/*,
	listeners:{            
		afterrender: {
            fn: function(){ 
				//alert("Wait")
				//this.svgUpdateData(this.svgData)
            }
        }
    } 
	*/   	
})
