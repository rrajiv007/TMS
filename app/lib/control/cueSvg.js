Ext.define("CueTrans.lib.control.cueSvg",{
		extend:"Ext.container.Container",
		svgControlPtr:"",
		attachEventsFlag:false,
		margin:2,
		alias: 'widget.cueSvg',
		cls:'chart_container',
		config:{
			svgURL:"",
			svgData:"",
			form_obj:"",
			svgLinks:[],
			heightFactor:.5
		},
		initComponent: function(arguments)
		{
			this.callParent(arguments);
			
			var tmpSvgHeight =0;
			if(this.form_obj.chartSearchPanel)
				tmpSvgHeight = (plf.screenHeight-170-40)*this.heightFactor
			else
				tmpSvgHeight =(plf.screenHeight-170)*this.heightFactor
			
			this.setHeight(tmpSvgHeight)
			
			var me= this;
			this.svgControlPtr = Ext.create("Ext.Component",
			{
				layout:'fit',
				padding:0,
				height:tmpSvgHeight
			})
			
			this.add(this.svgControlPtr)	
			
			Ext.Ajax.request({
				url : me.svgURL,
				async:false,
				success : function(result){
					me.svgControlPtr.tpl = new Ext.XTemplate(result.responseText);
					me.svgControlPtr.update(me.svgData)
				},
				failure:function(result)
				{
					alert("Failure to load SVG")
					alert(result.responseText)
				}
			})
			
		},
		setsvgData:function(tmpValue)
		{	
			var me=this;
			if(!me.attachEventsFlag)
			{
				Ext.each(me.svgLinks,
				function(svgLinkObj)
				{
					var tmp_control_obj = document.getElementById(svgLinkObj.linkId);	
					if(tmp_control_obj)
					{
						tmp_control_obj.addEventListener('click',function(obj)
						{
							var tmp_initialValues =
							[
								{ctrl:"iUID","value":me.form_obj.hdnUID.getValue()},
								{ctrl:"dynMethodName","value":svgLinkObj.popMethodName}
							];	
							launch_helpscreen("","","CueTrans.view."+svgLinkObj.popScreen,tmp_initialValues)
						});					
					}
				})
				me.attachEventsFlag=true;
			}
		
			this.svgData = tmpValue;	

			for(var key in this.svgData)
			{
				var attrName = key;
				var attrValue = this.svgData[key];

				var tmp_control_obj = document.getElementById(attrName);
				
				if(tmp_control_obj)
				{
					tmp_control_obj.style.cursor = "pointer";
					//tmp_control_obj.innerHTML=attrValue;
					tmp_control_obj.textContent=attrValue;
				}
			}
		}
	})