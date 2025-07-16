Ext.define("CueTrans.lib.control.cueimagefileupload",{
		extend:"Ext.container.Container",
		alias: 'widget.cueimagefileupload',
		
		//pointer to Attach Field
		ptrAttachField:"",
		ptrClearField:"",
		//pointer to Upload Field
		ptrFileUploadField:"",
		
		//pointer to ImagePreview Field
		ptrPreviewField:"",
		
		//pointer to Hidden Field
		ptrHiddenField:"",
		
		title:"",
		layout:"hbox",

		//Config
		config:{
			//Variable to store label text
			LabelText:"",
			
			//Variable to store control Key Value
			FileKeyValue:"",
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
				layout:"column",
				//height:180,
				//width:140,
				cls : "profile_thumbnail"
			})
				
			tmpOuterBox.add({xtype:"label",html:this.LabelText,/*labelCls:"c-fieldlabel",fieldCls:"c-fieldctrl",*/width:100})
			var tmpImageUpload = Ext.create("Ext.panel.Panel",{
				layout: {
					align: 'center',
					pack:'center',
					type:'vbox'					
				},
				
			})
			//Create Preview Image Control
			this.ptrPreviewField = Ext.create("Ext.Img",{
				src :'resources/images/FileUpload/NoImage.jpg',				
				height:150,
				width:118					
			})
			tmpImageUpload.add(this.ptrPreviewField);
			
			//Create File Attach Image Control
			this.ptrAttachField = Ext.create("Ext.Img",{
				src :'resources/images/common/spacer.png',
				cls :'upload-icon',
				title:"Click here to upload image",
				listeners:{
					render: function(objctrl){
						objctrl.getEl().on('click',
							function(eventobj){
								me.invokeFileUpload()
							})
					}
				}				
			})
			//Create Clear Button
			this.ptrClearField = Ext.create("Ext.Img",{
				src :'resources/images/common/spacer.png',					
				cls :'clear-icon',
				title:"Click here to remove image",
				listeners:{
					render: function(objctrl){
						objctrl.getEl().on('click',
							function(eventobj){
								me.ptrPreviewField.setSrc("resources/images/FileUpload/NoImage.jpg");
								me.ptrHiddenField.value="";
							})
					}
				}				
			})
			
			var tmpPanel = Ext.create("Ext.panel.Panel",{
				layout: {
					type:'hbox'
				},				
			})
			tmpPanel.add(this.ptrAttachField);
			tmpPanel.add(this.ptrClearField);
			
			tmpImageUpload.add(tmpPanel);
			
				
			//Adding Hidden Frame for holding FileKeyValue
			this.ptrHiddenField = Ext.create("Ext.form.field.Hidden",{				
				name:'hidden',
				value:''
			})
			
			tmpImageUpload.add(this.ptrHiddenField);
			tmpOuterBox.add(tmpImageUpload);
			
			this.add(tmpOuterBox);
			if(this.FileKeyValue != "" & this.FileKeyValue != null & this.FileKeyValue != undefined )
			{					
				me.ptrHiddenField.value=this.FileKeyValue;
				me.ptrPreviewField.setSrc("DownloadFileServlet?entityName="+encodeURI(this.Entity)+"&fileName="+encodeURI(this.FileKeyValue));
				
			}
		},		
		setValue:function(tmpValue)
		{	
			var me=this;	
			if(tmpValue != "" & tmpValue != null & tmpValue != undefined )
			{				
				me.ptrHiddenField.value=tmpValue;
				me.ptrPreviewField.setSrc("DownloadFileServlet?entityName="+encodeURI(this.Entity)+"&fileName="+encodeURI(tmpValue));
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
			
			var tmpWindow ="";	
			tmpWindow = Ext.create('Ext.window.Window', {
				title: 'File Upload',					
				header: {		
					titlePosition: 0,
					titleAlign: 'center'
				},
				layout:'hbox'
			});
			 Ext.apply(Ext.form.VTypes, {
             fileUpload: function(val, field) {                              
                                 var fileName = /^.*\.(gif|png|bmp|jpg|jpeg)$/i;
                                 return fileName.test(val);
                           },                 
             fileUploadText: 'Image must be in .gif,.png,.bmp,.jpg,.jpeg format'
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
									vtype:'fileUpload',
									listeners:
									{
									change:function( thiss, value, eOpts )
									{	
									if (value !="")
									{
									ptrFileUploadField.submit({									
										url: "UploadFileServlet?entityName="+tmpEntity,
										waitMsg: 'Uploading...',
										success: function(form, action) {},									
										failure: function(form, action)
										{	
											if (action.response!=undefined)
											{
											var response_data = Ext.JSON.decode(action.response.responseText);
											Ext.Msg.alert('Success', 'Your File has been uploaded.');											
											me.ptrHiddenField.value=response_data["fileName"];
											var filename=me.ptrHiddenField.value;
											me.ptrPreviewField.setSrc("DownloadFileServlet?entityName="+encodeURI(tmpEntity)+"&fileName="+encodeURI(filename));
											tmpWindow.close();
											}
										}});
									  }
									}}}]
			});
			tmpWindow.add(ptrFileUploadField);
			tmpWindow.show();
		}
	})	