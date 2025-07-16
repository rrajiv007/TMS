Ext.define("CueTrans.lib.control.cuefiledownload",{
		extend:"Ext.container.Container",
		alias: 'widget.cuefiledownload',
		
		//pointer to Attach Field
		ptrAttachField:"",
		
		//pointer to Upload Field
		ptrFileUploadField:"",
		
		//pointer to View Field
		ptrViewField:"",
		ptrClearField:"",
		//pointer to Hidden Field
		ptrHiddenField:"",

		//pointer to Hidden IFrame. This will be used for Download
		ptrHiddenField:"",
		
		title:"",
		layout:"hbox",

		//Config
		config:{
			//Variable to store label text
			LabelText:"",
			
			//Variable to store control Key Value
			FileKeyValue:"",
			Entity:"Others",
			Path:"local"
		},
		
		
		initComponent: function(arguments)
		{
			
			this.callParent(arguments);
			if(this.LabelText == undefined)
				this.LabelText =""

			if(this.Entity == undefined || this.Entity == "")
				this.Entity = 'Others'
			if(this.Path == undefined || this.Path == "")
				this.Path = 'local'
				
			var me=this;		
			
			var tmpOuterBox = Ext.create("Ext.form.Panel",{
				layout:"column",				
				cls : "attachFile"
			})
			//tmpOuterBox.add({xtype:"label",html:this.LabelText,labelCls:"c-fieldlabel",fieldCls:"c-fieldctrl",width:138})
			//Create File Attach Image Control
			this.ptrAttachField = Ext.create("Ext.Img",{
				src :'resources/images/common/spacer.png',	title:"Click here to upload document.",	cls:"upload-icon",		
				listeners:{
					render: function(objctrl){
						objctrl.getEl().on('click',
							function(eventobj){
								me.invokeFileUpload()
							})
					}
				}				
			})
			//tmpOuterBox.add(this.ptrAttachField);
			
			//Adding View Image Button
			this.ptrViewField = Ext.create("Ext.Img",{
				src :'resources/images/common/spacer.png',title:"Click here to download document.",	cls:"download-icon",
				listeners:{
					render: function(objctrl){
						objctrl.getEl().on('click',
							function(eventobj){
								if (me.ptrHiddenField.value =="")
								{
									//alert('No File to View');
									Ext.Msg.alert('Failure', 'No File to Download');									
								}
								else
								{
								var filename=me.ptrHiddenField.value;
								var entityName=me.Entity;
								var FilePath=me.Path;
								me.hdnIframe.update("<iframe src='" + "DownloadFileServlet?filePath="+encodeURI(FilePath)+"&entityName="+encodeURI(entityName)+"&fileName="+encodeURI(filename) + "' style='display:none' />");
								}
							})
					}
				}
			})
			//tmpOuterBox.add(this.ptrViewField);
			
			//Adding Clear File Button
			this.ptrClearField = Ext.create("Ext.Img",{
				src :'resources/images/common/spacer.png',title:"Click here to remove document.",	cls:"clear-icon",
				listeners:{
					render: function(objctrl){
						objctrl.getEl().on('click',
							function(eventobj)
							{
								me.ptrHiddenField.value="";
							})
					}
				}
			})
			
			
			outObj = {
				xtype:"container",layout:"column",columnWidth:plf.getColumnwidth(),cls:plf.getContainerCls(),
				items:
				[
					plf.addFieldLabel({"label":this.LabelText}),
					//this.ptrAttachField,
					this.ptrViewField
					//this.ptrClearField
					
				]
			}			
			tmpOuterBox.add(outObj);	

			//Adding Hidden Frame for Download
			this.hdnIframe = Ext.create("Ext.Component",{hidden:true,width:0,height:0})			
			this.add(this.hdnIframe);
			
			//Adding Hidden Frame for holding FileKeyValue
			this.ptrHiddenField = Ext.create("Ext.form.field.Hidden",{				
				name:'hidden',
				value:''
			})
			tmpOuterBox.add(this.ptrHiddenField);
			
			this.add(tmpOuterBox);
			if(this.FileKeyValue != "" & this.FileKeyValue != null & this.FileKeyValue != undefined )
			{					
				me.ptrHiddenField.value=this.FileKeyValue;
			}
		},		
		setValue:function(tmpValue)
		{	
			var me=this;	
			if(tmpValue != "" & tmpValue != null & tmpValue != undefined )
			{				
				me.ptrHiddenField.value=tmpValue;
			}				
		},		
		getValue:function()
		{			
			var me=this;
			var tmpRetValue = me.ptrHiddenField.value;			
			if(tmpRetValue == " ")
				tmpRetValue =""				
			return tmpRetValue;
		},
		invokeFileUpload:function()		
		{
			//alert(this.ptrHiddenField.value);
			var me=this;			
			var tmpEntity = me.Entity
			var tmpFilePath=me.Path;
			var tmpWindow ="";	
			tmpWindow = Ext.create('Ext.window.Window', {
				title: 'File Upload',					
				header: {		
					titlePosition: 0,
					titleAlign: 'center'
				},
				layout:'hbox'
			});
			
			var ptrFileUploadField = Ext.create('Ext.form.Panel', {
			
			                 
								title: '',
            					width: 400,
								bodyPadding: 10,
								frame: true,
								renderTo: Ext.getBody(),
								items: 
									[{
									xtype: 'filefield',
									name: 'fileName',
									fieldLabel: 'Upload File',
									labelWidth: 100,
									msgTarget: 'side',
									allowBlank: false,
									anchor: '100%',
									listeners:
									{
									change:function( thiss, value, eOpts )
									{	
									if (value !="")
									{
									console.log("Here1");
									ptrFileUploadField.submit({									
										url: "UploadFileServlet?filePath="+tmpFilePath+"&entityName="+tmpEntity,
										waitMsg: 'Uploading...',
										success: function(form, action) {
											//alert("success");
										},									
										failure: function(form, action)
										{	
											//alert("failure");
											//alert(action.response.responseText);
											var response_data = Ext.JSON.decode(action.response.responseText);
											if(response_data["fileName"] != undefined)
											{
												Ext.Msg.alert('Success', 'Your File has been uploaded.');
												me.ptrHiddenField.value=response_data["fileName"];
												console.log("me.ptrHiddenField.value:", me.ptrHiddenField.value);
											}
											else
											{
												me.ptrHiddenField.value="";
												Ext.Msg.alert('Failure', response_data["Failure"]);
											}
											tmpWindow.close();
										}});
									  }
									}}},
									{cls: "c-fielddisplabel1",xtype:"label",text:"[Supported format 'Jpg,png,pdf' upto 5 MB]"}
									]
			});
			tmpWindow.add(ptrFileUploadField);
			tmpWindow.show();
		}
	})	