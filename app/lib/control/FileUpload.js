Ext.define("CueTrans.lib.control.FileUpload",{
		extend:"Ext.container.Container",	
		alias: 'widget.FileUpload',
		//pointer to Upload Field
		ptrFileUploadField:"",
		
		//pointer to View Field
		ptrViewField:"",
		
		//pointer to Hidden Field
		ptrHiddenField:"",
		
		title:"",
		layout:"hbox",

		//Config
		config:{
			//Variable to store label text
			LabelText:"",
			
			//Variable to store control Key Value
			Value:"",
			Entity:"Others"
		},
		
		
		initComponent: function(arguments)
		{
			
			this.callParent(arguments);
			
			if(this.LabelText == undefined)
				this.LabelText =""

			if(this.Entity == undefined || this.Entity == "")
				this.Entity = 'Others'
			
			var me=this;			
			var tmpOuterBox = Ext.create("Ext.form.Panel",{
			layout:"column"					
			})
		
			//Create File Upload Control
			this.ptrFileUploadField = Ext.create("Ext.form.field.File",{
				fieldLabel:this.LabelText,
				labelWidth: 50,
				//width:180,
				labelCls:"c-fieldlabel",
				fieldCls:"c-fieldctrl",	
				buttonText: '',				
				buttonConfig: {
					iconCls: 'upload-icon'
				},
				id: 'fileName',
				listeners:{
            			change:function( thiss, value, eOpts )
						{	
							
							me.ptrViewField.show();               				
							var form = this.up('form').getForm();
							var entityName=me.Entity;							
							if(form.isValid()){							
	                			form.submit({									
	                    			url: "UploadFileServlet?entityName="+entityName,
	                    			waitMsg: 'Uploading...',
										success: function(form, action) {
	                        			//Ext.Msg.alert('Success', 'Your photo has been uploaded.');
										//alert(action.response.responseText);  
	          			       			},									
									   failure: function(form, action){
                                           alert(action.response.responseText);   
										   //alert(action.response.responseText("fileName"));
										   var response_data = Ext.JSON.decode(action.response.responseText);
										   //alert(response_data["fileName"]);
										   ptrHiddenField.value=response_data["fileName"];
                                        }
	                			});
							}
							me.ptrFileUploadField.setValue(value);
							me.Value=value;						
						}
         			}
			})
			tmpOuterBox.add(this.ptrFileUploadField);
			
			
			ptrHiddenField = Ext.create("Ext.form.field.Hidden",{				
				name:'hidden',
				value:'hi'
			})
			tmpOuterBox.add(ptrHiddenField);
			
			//Adding Image Button

			this.ptrViewField = Ext.create("Ext.Button",{
				//src :'view.png',
				text:'View',
				labelCls:"c-fieldlabel",
				fieldCls:"c-fieldctrl",	
				handler : function(){
					
					//alert(tmpDt.getValue())
					
					 var form = this.up('form').getForm();
					 var filename=ptrHiddenField.value;
					 var entityName=me.Entity;					 
					 if(form.isValid()){						
	          			form.submit({  
							
	              			url: "DownloadFileServlet?entityName="+entityName+"&fileName="+filename,
	              			//waitMsg: 'Downloading...',
	              			success: function(fp, o) {
                    			Ext.Msg.alert('Success', 'Your photo has been uploaded.');
      			       			}
	          			});
	      			}
				}
			})
			tmpOuterBox.add(this.ptrViewField);		
			
			this.add(tmpOuterBox);			
			
						
			if(this.Value != "" & this.Value != null & this.Value != undefined )
			{		
				this.ptrViewField.show();
				this.ptrFileUploadField.setRawValue(this.Value);
				ptrHiddenField.value=this.Value;
			}
			/*
			else
			{
			this.ptrViewField.hide();
			}
			*/
		},
		setValue:function(tmpValue)
		{	
			var me=this;	
			if(tmpValue != "" & tmpValue != null & tmpValue != undefined )
			{				
				if(me.ptrFileUploadField != "")
				{
					me.ptrFileUploadField.setRawValue(tmpValue);
					ptrHiddenField.value=tmpValue;
					me.ptrViewField.show();					
				}				
			}					
		},
		getValue:function()
		{			
			var me=this;
			var tmpRetValue = ptrHiddenField.value;			
			if(tmpRetValue == " ")
				tmpRetValue =""				
			return tmpRetValue;
		}		
	})	
	
