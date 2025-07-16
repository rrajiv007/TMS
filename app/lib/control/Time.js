Ext.define("CueTrans.lib.control.Time",{
		extend:"Ext.container.Container",
		alias: 'widget.Time',
		
		valDateTime:"",	
		
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
				
			
			

			//Create Time Control
			this.ptrTimeField = Ext.create("Ext.form.Time",{
				increment:this.Increment,
				fieldLabel:this.Label,
				labelCls:"c-fieldlabel",
				fieldCls:"c-fieldctrl",	
				width:200,
				hideTrigger:true
			})
			this.add(this.ptrTimeField);
			
			//Adding Image Button
			var me=this;
			
			
			if(this.Value != "" & this.Value != null & this.Value != undefined )
			{				
				this.ptrTimeField.setValue(Ext.Date.format(Ext.Date.parse(this.Value,'d-m-y g:i A'), 'g:i A'))
			}			
			else
			{
				this.ptrTimeField.setValue(Ext.Date.format(new Date(), 'g:i A'));				
			}
		},
		setValue:function(tmpValue)
		{
			var me=this;
			//me.callParent([tmpValue]);
			//if(me.ptrDateField typeof "")
			if(tmpValue != "" & tmpValue != null & tmpValue != undefined )
			{
				
				if(me.ptrTimeField != "")
				{
					me.ptrTimeField.setValue(Ext.Date.format(Ext.Date.parse(tmpValue,'d-m-y g:i A'), 'g:i A'))			
				}				
			}			
		},
		getCustomValue:function()
		{
			var me=this;
			var tmpRetValue = me.ptrTimeField.getRawValue()
			
			if(tmpRetValue == " ")
				tmpRetValue =""
				
			return tmpRetValue;
		}		
	})