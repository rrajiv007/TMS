Ext.define("CueTrans.lib.control.svgControl",{
		extend:"Ext.container.Container",
		svgControlPtr:"",
		alias: 'widget.svgControl',
		compLoaded:false,
		autoRender:true,
		autoShow:false,
		config:{
			svgURL:"",
			svgData:"",
			svgObjData:"",
			form_obj:""
		},
		initComponent: function(arguments)
		{
			this.callParent(arguments);
			var me= this;
			this.svgControlPtr = Ext.create("Ext.Component",
			{
				layout:'fit',
				padding:0
			})
			console.log(me.svgObjData,"initComponent")
			this.add(this.svgControlPtr)	
			
			Ext.Ajax.request({
				url : me.svgURL,
				success : function(result){
					me.svgControlPtr.tpl = new Ext.XTemplate(result.responseText);	
					me.svgControlPtr.update(me.svgData)
					//me.svgControlPtr.update(result.responseText);	
					//me.svgControlPtr.update(me.svgData)
					console.log("Calling attach from Ajax Request")
					me.attchSVGObjects()
					me.compLoaded=true;					
				},
				failure:function(result)
				{
					alert("failure")
					alert(result.responseText)
				}
			})
			
		},
		setsvgData:function(tmpValue)
		{	
			console.log("data",tmpValue)
			var me=this;	
			this.svgData = tmpValue;	
			//if(this.compLoaded)
			//{
				for(var key in this.svgData)
				{
					var attrName = key;
					var attrValue = this.svgData[key];
					//var tmp_control_obj = document.getElementById(this.getItemId()+"_"+attrName);	
					var tmp_control_obj = document.getElementById(attrName);	
					if(tmp_control_obj)
					{
						
						tmp_control_obj.innerHTML=attrValue;
						tmp_control_obj.addEventListener('click',function(obj)
						{
							console.log(obj.originalTarget.id,obj.originalTarget.innerHTML,me.form_obj.svgLinks);
							var tmpId=obj.originalTarget.id;
							var tmpValue=obj.originalTarget.innerHTML;	
							var linkID=me.form_obj.svgLinks[tmpId];
							if (me.form_obj.svgLinks[tmpId] !=undefined)														
								me.form_obj.launchpopupSvg(linkID,tmpId,tmpValue)	
						});					
					}
				}
			
				//this.svgControlPtr.update(this.svgData)
			//}
			//console.log("Calling attach setsvgObjData")
			//this.svgControlPtr.update(this.svgData)			
			
			//this.attchSVGObjects()
		
			//this.attchSVGObjects(this.svgObjData)
			//this.svgControlPtr.update(this.svgData)
		},
		setsvgObjData:function(tmpValue)
		{
			this.svgObjData = tmpValue;			
			this.attchSVGObjects()			
		},
		attchSVGObjects:function()
		{
			var me=this;
			var tmpValue = me.svgObjData;
			Ext.each
			(tmpValue,
				function(svgData_obj)
				{
					for(var key in svgData_obj)
					{							
						var attrKey = key;						
						var attrObj = svgData_obj[key];
						var tmp_div_obj = document.getElementById(attrKey);		

						
						
						if(tmp_div_obj != null)
						{
							if(attrObj != "")
							{
								var svgGraphRect = tmp_div_obj.getBoundingClientRect(); // get the bounding rectangle	
								
								attrObj.setWidth(svgGraphRect.width);
								attrObj.setHeight(svgGraphRect.height);
								attrObj.setPosition(svgGraphRect.left,svgGraphRect.top);							
								//console.log(attrObj,tmp_div_obj,"Start")
								//tmp_div_obj.setVisible(true)
								//attrObj.setVisible(true)
								//if(!attrObj.rendered)
								//{
								//	attrObj.render(attrKey,-1)
									//attrObj.doAutoRender(attrKey)
									//attrObj.doAutoRender(attrKey)
									//tmp_div_obj.innerHTML ="Hi"
								//}
								//console.log(attrObj.rendered,"isRendered")
								
								attrObj.setVisible(true);
								//attrObj.doComponentLayout(tmp_div_obj);								
								//attrObj.doConstrain(tmp_div_obj);								
								
							}
						}
					}
				}
			)
		}		
	})