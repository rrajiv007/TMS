Ext.define("CueTrans.lib.control.datetimectrl",{
		extend:"Ext.container.Container",
		//alias: 'widget.datetimectrl',		
		valDateTime:"",
		alias: ['widget.datetimectrl'],
		//pointer to Date Field
		ptrDateField:"",
		
		//pointer to Time Field
		ptrTimeField:"",
		
		
		title:"",
		layout:"hbox",
		//id:'',
		//Config
		config:{
			//Variable to store label text
			Label:"",
			
			//Variable to store control date and time
			Value:"",
			Increment:"30"
		},
		
		
		initComponent: function(arguments)
		{
			this.callParent(arguments);
			
			if(this.Label == undefined)
				this.Label =""

			if(this.Increment == undefined || this.Increment == "")
				this.Increment = 30
				
			
			//Create Date Control
			this.ptrDateField = Ext.create("Ext.form.Date",{
				fieldLabel:this.Label,
				format:'d-m-y',
				width:200,	
				labelWidth:120,
				labelCls:"c-fieldlabel",
				fieldCls:"c-fieldctrl",						
				hideTrigger:true
				
			})
			this.add(this.ptrDateField);
			
			//Create Time Control
			this.ptrTimeField = Ext.create("Ext.form.Time",{
				increment:this.Increment,
				labelCls:"c-fieldlabel",
				fieldCls:"c-fieldctrl",	
				width:90,
				hideTrigger:true
			})
			this.add(this.ptrTimeField);
			
			//Adding Image Button
			var me=this;
			
			this.add({xtype:'image',src :'resources/images/datetime.png',
					listeners:{
						render: function(objctrl){
							objctrl.getEl().on('click',
									function(eventobj){
										me.invokeDateTimePicker()
									})
							}
					}
			})
			
			if(this.Value != "" & this.Value != null & this.Value != undefined )
			{
				this.ptrDateField.setValue(Ext.Date.parse(this.Value,'d-m-y g:i A'));
				this.ptrTimeField.setValue(Ext.Date.format(Ext.Date.parse(this.Value,'d-m-y g:i A'), 'g:i A'))
			}			
			else
			{
				this.ptrTimeField.setValue(Ext.Date.format(new Date(), 'g:i A'));
				this.ptrDateField.setValue(Ext.Date.format(new Date(), 'd-m-y'));
			}
		},
		setValue:function(tmpValue)
		{
			var me=this;
			//me.callParent([tmpValue]);
			//if(me.ptrDateField typeof "")
			if(tmpValue != "" & tmpValue != null & tmpValue != undefined )
			{
				if( me.ptrDateField != "")
				{
					me.ptrDateField.setValue(Ext.Date.parse(tmpValue,'d-m-y g:i A'));
				}
				if(me.ptrTimeField != "")
				{
					me.ptrTimeField.setValue(Ext.Date.format(Ext.Date.parse(tmpValue,'d-m-y g:i A'), 'g:i A'))			
				}				
			}			
		},
		getCustomValue:function()
		{
			var me=this;
			var tmpRetValue = Ext.Date.format(me.ptrDateField.getValue(), 'd-m-y') + ' '+ me.ptrTimeField.getRawValue()
			
			if(tmpRetValue == " ")
				tmpRetValue =""
				
			return tmpRetValue;
		},
		invokeDateTimePicker:function()
		{
		
			var me=this;
			
			var tmpOuterBox ="";			
			//var tmpHeight = 300;
			//var tmpWidth = 250;
	
			tmpOuterBox = Ext.create('Ext.window.Window', {
				title: 'DateTime Picker',	
				//height:tmpHeight,
				header: {		
					titlePosition: 0,
					titleAlign: 'center'
				},																			
				//width:tmpWidth,
				layout:'vbox',
				defaults: {
								style: 'margin:3px'
						  }
			});
			//console.log(Ext.Date.format(this.ptrDateField.getValue(), 'd-m-y'))
			
			
			var tmpDatePicker = Ext.create("Ext.DatePicker",{showToday:false})
			if (this.ptrDateField.getValue() !=undefined)
				tmpDatePicker.setValue(this.ptrDateField.getValue())
				
			tmpOuterBox.add(tmpDatePicker)
			
			var tmpTimePicker = Ext.create("Ext.form.Time",{width:85,increment:this.Increment})
			if (this.ptrTimeField.getValue() ==null)
			{
				tmpTimePicker.setValue(Ext.Date.format(new Date(), 'g:i A'));
			}
			else
			{
			if (this.ptrTimeField.getValue() !=undefined || this.ptrTimeField.getValue() !='null' || this.ptrTimeField.getValue() !="")
				tmpTimePicker.setValue(this.ptrTimeField.getValue())
			}
			//tmpOuterBox.add(tmpTimePicker)
			
			var tmpbtnContainer = Ext.create('Ext.container.Container', {				
				layout:'hbox',
				defaults: {
						style: 'margin:1px'
				  }	,
				 items:	
				 [
					tmpTimePicker,
					{xtype:'button',text:'OK',
						handler: function() {
									me.ptrDateField.setValue(tmpDatePicker.getValue());
									me.ptrTimeField.setValue(tmpTimePicker.getRawValue())
									me.Value=Ext.Date.format(tmpDatePicker.getValue(), 'd-m-y') + ' '+tmpTimePicker.getRawValue()
									tmpOuterBox.close();
								}							
					},
					{
						xtype:'button',text:'Cancel',
						 handler: function() 
						 {
						 tmpOuterBox.close();
						 }
					}
				]
					
			});
			tmpOuterBox.add(tmpbtnContainer)
			
			tmpOuterBox.show()
		}
		
	})