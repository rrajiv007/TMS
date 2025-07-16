/*
File Version: 1.0.0.1
File Name 	: cuetrans_common_fn.js
Purpose 	: Common Functions used to invoke ebPAC services.
Function Type : "Global"

Notes: 	As per ExtJS Standards, This should be converted as "static" class. (Pending)
		Variable  and Functions should be renamed as per Java coding guidelines. (Pending)
*/ 
 
/*
	Function Name : launch_searchscreen
	Purpose: Used to launch search screen in launch pad.
			 Used in Console.js
	Parameters: 
		tmp_searchScreen  - Search Screen JS should be given.
		tmp_appScreen - Application Screen JS should be given.
		tmp_initialValues - Screen Control values to be displayed on Screen launch. (JSON Format)
*/
/*
function launch_searchscreen(tmp_searchScreen,tmp_appScreen,tmp_initialValues)
{
	plf.viewport.ptrContentPanel.searchScreenJS = tmp_searchScreen;
	plf.viewport.ptrContentPanel.appScreenJS = tmp_appScreen;
	plf.viewport.ptrContentPanel.appScreenPtr.removeAll();
	plf.viewport.ptrContentPanel.loadSearchScreen(tmp_initialValues);
	/ *
	var tmpSearchScreenObj = Ext.create(tmp_searchScreen,{"initialValues":tmp_initialValues});
	plf.viewport.ptrContentPanel.appScreenPtr.removeAll();
	plf.viewport.ptrContentPanel.appScreenPtr.add(tmpSearchScreenObj);
	plf.viewport.ptrContentPanel.setActiveTab(plf.viewport.ptrContentPanel.appScreenPtr)
	* /
	//Ext.getCmp('contentpanel_launchpad').removeAll();
	//Ext.getCmp('contentpanel_launchpad').add(tmpSearchScreenObj);
	//Ext.getCmp('contentpanel_launchpad').show();	
	
	//Ext.getCmp('contentpanel_screen').removeAll();
	/ *
	var tmpAppScreenObj = Ext.create(tmp_appScreen);
	Ext.getCmp('contentpanel_screen').removeAll();
	Ext.getCmp('contentpanel_screen').add(tmpAppScreenObj);
	* /
};
*/
/*
	Function Name : launch_screen
	Purpose: Used to launch applicaiton screen in Application tab..
	Parameters: 
		tmp_appScreen - Application Screen JS should be given.
		tmp_initialValues - Screen Control values to be displayed on Screen launch. (JSON Format)
*/
/* Modified By			Date						ID					*/
/* Rajiv R				04/09/2014					57410				*/
var newWinReportPtr;
var newIVMSPtr;
var ivmsPath = "http://cuetrans.bahwancybertek.com:8880/IVMS/gisapp?ivmscode=";
var	cueScrHistory = [];
var hdnAuthToken;

function launch_screen(form_obj,tmp_appScreen,tmp_initialValues,tmp_destination_tab)
{
	
	var ser_input_array = {};
	ser_input_array["methodName"] = "ValidateScreen";
	ser_input_array["strScreenName"] = tmp_appScreen.replace("CueTrans.view.", "");
	//console.log(ser_input_array,"ser_input_array");
	var url_tmp = 'JMSServlet';
	var flag;
	Ext.Ajax.request({
			url: url_tmp,									
			params: {

				workFlowName: "CoreAdminService",
				workFlowParams: Ext.JSON.encode(ser_input_array),
				"processType": "Screen",
				"AuthToken":hdnAuthToken
			},
			success: function(result) {
				var response_data = Ext.JSON.decode(result.responseText);
				
				//console.log(response_data,"success");
				
				Ext.each(response_data["hdrcache"],
					function(hdrcache_obj) {
						for (var key in hdrcache_obj) 
						{
							var attrName = key;													
							if (key == "flag") 
							{
								flag=hdrcache_obj[key];
							}							
							if (key == "hdnAuthToken") {
								hdnAuthToken=hdrcache_obj[key];
							}
						}
					}
				)
				cueScrHistory.push({"form_obj":form_obj,"appScreen":tmp_appScreen,"initValues":tmp_initialValues,"tab":tmp_destination_tab})	
				if(tmp_destination_tab == undefined || tmp_destination_tab =="" || tmp_destination_tab=="app")
				{					
					plf.viewport.ptrContentPanel.loadAppScreen(tmp_appScreen,tmp_initialValues);	
					if (form_obj !=undefined)
					{
						console.log(flag,"flag")
						if (flag !="Y")
						{
							if (form_obj.queryById("toolbarID") !=undefined)								
								form_obj.queryById("toolbarID").setHidden(true);			
						}
					}
					return;
					
				}
				
				if(tmp_destination_tab=="report")
				{
					plf.viewport.ptrContentPanel.loadReportScreen(tmp_appScreen,tmp_initialValues);
					return;
				}

				if(tmp_destination_tab=="dashboard")
				{
					plf.viewport.ptrContentPanel.loadDashboardScreen(tmp_appScreen,tmp_initialValues);
					return;
				}
				
			},
			failure: function(result) {
				alert("failure");
				alert(result.responseText);
				form_obj.setLoading(false);
				// todo
			}
		});
	
	/*
	var tmpAppScreenObj = Ext.create(tmp_appScreen,{"initialValues":tmp_initialValues});
	plf.viewport.ptrContentPanel.appScreenPtr.removeAll();
	plf.viewport.ptrContentPanel.appScreenPtr.add(tmpAppScreenObj);
	plf.viewport.ptrContentPanel.setActiveTab(plf.viewport.ptrContentPanel.appScreenPtr)
	*/
	//Ext.getCmp('contentpanel_screen').removeAll();
	//Ext.getCmp('contentpanel_screen').add(tmpAppScreenObj);
	//Ext.getCmp('contentpanel_screen').show();	
};

/*
	Function Name : launch_helpscreen
	Purpose: Used to launch help screen.
	Parameters: 
		tmp_hlpScreen - Help Screen JS should be given.
		tmp_initialValues - Screen Control values to be displayed on Screen launch. (JSON Format)
*/
function launch_helpscreen(parentForm,hlpLinkID,tmp_hlpScreen,tmp_initialValues)
{

	
	var tmpHelpScreenObj = Ext.create(tmp_hlpScreen,
		{
			"initialValues":tmp_initialValues
		});
		
	var widthRatio = tmpHelpScreenObj.popupWidthRatio + .02;
	var	heightRatio = tmpHelpScreenObj.popupHeightRatio;
	
	
	tmpHelpScreenObj.hlpParentForm = parentForm
	tmpHelpScreenObj.hlpParentHelpID = hlpLinkID

	//tmpHelpScreenObj.setWidth(plf.screenWidth*.8);
	tmpHelpScreenObj.setWidth(plf.screenWidth*heightRatio);
	var tmpHelpWindow =Ext.create('Ext.Window',{
		title: tmpHelpScreenObj.screenName,
		layout:'fit',
		modal:true,
        //width: plf.screenWidth*.8,
		width: plf.screenWidth*widthRatio,
        //height: window.screen.availHeight *.68,
		cls:"popup_help",
		height: window.screen.availHeight *heightRatio,
		autoScroll:false,
		items:tmpHelpScreenObj
	});
	tmpHelpWindow.show();
	
};
/*
function launch_custompopupscreen(parentForm,hlpLinkID,tmp_hlpScreen,tmp_initialValues)
{
	
	var tmpHelpScreenObj = Ext.create(tmp_hlpScreen,
		{
			"initialValues":tmp_initialValues
		});
		
	//console.log("tmp_initialValues",tmp_initialValues);	
	tmpHelpScreenObj.hlpParentForm = parentForm
	tmpHelpScreenObj.hlpParentHelpID = hlpLinkID
	//tmpHelpScreenObj.setWidth(plf.screenWidth*.8);
	
	var tmpHelpWindow =Ext.create('Ext.Window',{
		title: tmpHelpScreenObj.screen_name,		
        width: 500,
		height: 300,
		modal:true,
		autoScroll:false,
		items:tmpHelpScreenObj
	});
	tmpHelpWindow.show();
	
};
*/
/*
	Global Function to handle Textbox On Enter event
*/
function textbox_onenter(form_obj,control_obj,eventobj,src_controlid,src_inputcontrol,src_service)
{
	if (eventobj./*getKey()*/keyCode == eventobj.ENTER)
	{
		//alert(src_controlid + '-' + src_inputcontrol + '-'+ src_service);
		//control_obj.setValue("Hi");
		process_ebpack_service(form_obj,src_inputcontrol,src_service);
	}
};
function textbox_helponenter(form_obj,control_obj,src_controlid,src_inputcontrol,src_service)
{
		process_ebpack_service(form_obj,src_inputcontrol,src_service);	
};
/*
	Global Function to handle Grid On Enter event
*/
function grid_onenter(form_obj,src_inputcontrol,src_service,src_gridid,src_recordid)
{
	process_ebpack_service(form_obj,src_inputcontrol,src_service,src_gridid,src_recordid);
};
function grid_onprint(form_obj,src_inputcontrol,src_service,src_gridid,src_recordid)
{	
	process_ebpack_service(form_obj,src_inputcontrol,src_service,src_gridid,src_recordid);
};

/*
	Global Function to handle Combo On Change Event
*/
function combo_onchange(form_obj,control_obj,cbo_newvalue,cbo_oldvalue,src_controlid,src_inputcontrol,src_service)
{
	//alert(src_controlid + '-' + src_inputcontrol + '-'+ src_service + '-'+cbo_oldvalue+'-'+cbo_newvalue);
	process_ebpack_service(form_obj,src_inputcontrol,src_service);
};

/*
	Global Function to Screen OnLoad Event
*/
function form_onload(form_obj,src_inputcontrol,src_service,src_postHandler)
{
	//alert( src_inputcontrol + '-'+ src_service );
	//apply_custom_style(form_obj);
	process_ebpack_service(form_obj,src_inputcontrol,src_service,undefined,undefined,src_postHandler);
	//form_obj.generate_layout();
};

/*
	Global Function to handle Button Click Event
*/
function button_click(form_obj,control_obj,eventobj,src_controlid,src_inputcontrol,src_service,src_postHandler)
{
	process_ebpack_service(form_obj,src_inputcontrol,src_service,undefined,undefined,src_postHandler);
};

/*
	Global Function to handle Toolbar - Button Click Event
*/
function toolbar_button_click(form_obj,src_inputcontrol,src_service)
{
	//alert(src_controlid + '-' + src_inputcontrol + '-'+ src_service);
	process_ebpack_service(form_obj,src_inputcontrol,src_service);
};

/*
	Global function to launch proto screen.
	Proto data will be be loaded from "view/data" folder. 
	Inputs:
		form_obj : Screen Object
		filename : Proto Data file name. File should be available in "view/data" folder
*/
function launch_proto(form_obj,filename)
{
	/*
		Set "Loading-Mask" On
	*/
	form_obj.setLoading(true);
	
	/*
		Send Ajax request to retrieve data file 
	*/
	Ext.Ajax.request
	(
		{
			url : "app/data/" + filename,
			success : function(result) 
			{
				//console.log(result.responseText);
				//console.log("success");
				//var response_data = Ext.JSON.decode(result.responseText);
				
				/*
				On Success: Call "load_form_values" to load data.
				*/
				load_form_values(result.responseText,form_obj)

				/*
					Set "Loading-Mask" Off
				*/				
				form_obj.setLoading(false);
			},
			failure : function(result) 
			{
				/*
				On Failure: Throw Error Message
				*/
				alert("failure");
				alert(result.responseText);
				
				/*
					Set "Loading-Mask" Off
				*/								
				form_obj.setLoading(false);
				// todo
			}
		}
	);	
	/*
	if(form_obj.img_sec_flag)
	{
		form_obj.enableAll(form_obj);
	}
	*/
	//form_obj.generate_layout();
}

/*
	Global Function to call ebPAC Service.
	Inputs:
		form_obj : Screen Object
		src_inputcontrol : Array of Input controls. Control values will be retrieved and passed as Input to 
							ebPAC service.
		src_service: ebPAC service name.
*/
function process_ebpack_service(form_obj,src_inputcontrol,src_service,src_gridid,src_recordid,postHandlerFn)
{
	
	var errorStopFlag=false;
	
	if(!form_obj.liveSetupFlag)
	{
		return;
	}
	//console.log(form_obj,src_inputcontrol,src_service)
	/*
		Array to hold Input Values.
	*/
	ser_input_array = {};
	
	/*
		Set "Loading - Mask" On
	*/
	form_obj.setLoading(true);
	
	
	/*
		Add Method Name to Input  Array.
	*/
	ser_input_array["methodName"] = form_obj.queryById("methodName").getValue();

	/*
		Read Input Values.
	*/
	if(src_inputcontrol!="")
	{
		Ext.each(src_inputcontrol,
			function(tmp_ctrl_id)
			{
				if(tmp_ctrl_id!="")
				{
					//console.log(tmp_ctrl_id)
					var tmp_control_obj = form_obj.queryById(tmp_ctrl_id)
					if(tmp_control_obj)
					{
						/*
							For Grid Panel, New / Updated / Deleted (Dirty) records will be sent for processing.
							Unaltered records will be ignored.
						*/
						//console.log(tmp_control_obj,tmp_control_obj.getXType(),"sdsds")
						//console.log(tmp_ctrl_id)
						
						if(tmp_control_obj.getXType()=="gridpanel" || tmp_control_obj.getXType()=="grid" || tmp_control_obj.getXType()=="dataview")
						{
							//alert(tmp_control_obj.getStore().getProxy().getModel())
							//ser_input_array[tmp_ctrl_id+'_array'] = tmp_control_obj.getStore().getProxy().getModel().getAssociatedData();
							//alert(tmp_control_obj);
							var dataToSave = [];
							//console.log(tmp_control_obj.getStore().proxy.enablePaging)
							if (tmp_control_obj.getStore().proxy.enablePaging != undefined)
							{
							  //console.log("paging enabled");
							  dataToSave = tmp_control_obj.getStore().getProxy().getReader().rawData;
							  //console.log("Grid Data to Save",tmp_ctrl_id, tmp_control_obj.getStore().getProxy().getReader().rawData)
							}
							else
							{
	 							//console.log("paging not enabled",tmp_control_obj.getStore());
								tmp_control_obj.getStore().clearFilter();
								tmp_control_obj.getStore().each(function(record) 
								{
									//console.log(record);
									dataToSave.push(record.data);
									/*
									if(record.dirty || record.select) 
									{
										dataToSave.push(record.data);
									}
									*/
								})
								/*Defect : On Save, Deleted records appears in multiline
								*/
								//console.log("dataToSave",dataToSave);
								tmp_control_obj.getStore().filterBy(function(item) 
								{
									if(item.getData().recStatus == 'D') 
										return false;
									else 
										return true;
								})								  
								
							}
							//console.log(dataToSave);
							if(tmp_control_obj.selRowProcess == "Y")
							{
								var dataToSaveSelected = [];
								var CueRowCnt=1;
								Ext.each(dataToSave,
									function(tmp_grid_row)
									{
										//console.log(tmp_grid_row["select"],"tmp_grid_row['select']");
										if(tmp_grid_row["select"])
										{
											tmp_grid_row["cueRowId"]=CueRowCnt;
											dataToSaveSelected.push(tmp_grid_row);
										}
										CueRowCnt=CueRowCnt+1;
									})	
									
									if(dataToSaveSelected.length <=0)
									{
										/*
										Ext.MessageBox.show({
															'title':'Failure', 
															'msg':"Please select atleast one row in the grid",
															'buttons': Ext.MessageBox.OK,
															icon:Ext.MessageBox["ERROR"]
															})	
										*/
										errorStopFlag=true;
										alert("Please select atleast one row in the grid");
										return false;
									}
									if(tmp_control_obj.processdRowCnt !=undefined)
									{
										var rowCnt=tmp_control_obj.processdRowCnt;
										
										if (dataToSaveSelected.length > rowCnt)
										{
										errorStopFlag=true;
										alert(tmp_control_obj.processdRowMsg);
										return false;
										}
									}
								ser_input_array[tmp_ctrl_id+'_array'] = dataToSaveSelected;
							}
							else if(tmp_control_obj.selDelProcess == "Y")
							{									
								var dataToSaveSelected = [];
								var CueRowCnt=1;
								Ext.each(dataToSave,
									function(tmp_grid_row)
									{										
										if(tmp_grid_row["recStatus"] =="D")
										{
											
										}
										else
										{
											tmp_grid_row["cueRowId"]=CueRowCnt;
											dataToSaveSelected.push(tmp_grid_row);
											CueRowCnt=CueRowCnt+1;
										}
									})								
									
								ser_input_array[tmp_ctrl_id+'_array'] = dataToSaveSelected;
							}
							else
							{
							var CueRowCnt=1;
							var dataToSaveSelected = [];
							Ext.each(dataToSave,
							function(tmp_grid_row)
							{										
								tmp_grid_row["cueRowId"]=CueRowCnt;
								dataToSaveSelected.push(tmp_grid_row);
								CueRowCnt=CueRowCnt+1;
							})
							//ser_input_array[tmp_ctrl_id+'_array'] = dataToSave;
							ser_input_array[tmp_ctrl_id+'_array'] = dataToSaveSelected;
							//ser_input_array[tmp_ctrl_id+'_array'] = dataToSave;
							}
							//console.log("Grid Data to Save", dataToSave)
						}
						else if(tmp_control_obj.getXType()=="datefield")
						{
							/*
								Date Field : Fetch the date in "d-m-y" format.
							*/
							ser_input_array[tmp_ctrl_id] = Ext.Date.format(tmp_control_obj.getValue(),plf.defDateFormat)
						}
						else if(tmp_control_obj.getXType()=="datetimectrl")
						{
							/*
								Date Field : Fetch the date in "d-m-y" format.
							*/
							ser_input_array[tmp_ctrl_id] = tmp_control_obj.getCustomValue();
						}
						/*Code added by Hari for handling html special char*/
						else if(tmp_control_obj.getXType()=="htmleditor")
						{
							ser_input_array[tmp_ctrl_id] = Ext.String.htmlEncode(tmp_control_obj.getValue());
						}
						else if(tmp_control_obj.getXType()=="combo" || tmp_control_obj.getXType()=="combobox")
						{
							/*
								Combo
							*/
							if(tmp_control_obj.getValue() == null)
							{
								ser_input_array[tmp_ctrl_id] = ""
							}
							else
							{
								ser_input_array[tmp_ctrl_id] = tmp_control_obj.getValue();
							}
						}						
						else
						{
							ser_input_array[tmp_ctrl_id] = tmp_control_obj.getValue();
						}
					}
				}
			});
	}
	
	/*Fetching Inputs for Grid On Enter Task*/
	if(src_gridid != undefined & src_gridid != "")
	{		
		var tmpSelRecord = Ext.data.StoreManager.lookup(src_gridid+'_store').getById(src_recordid);
		Ext.each(src_inputcontrol,
			function(tmp_ctrl_id)
			{
				//console.log(tmpSelRecord.get(tmp_ctrl_id))
				if(tmpSelRecord.get(tmp_ctrl_id) != undefined)
				{
					ser_input_array[tmp_ctrl_id] = tmpSelRecord.get(tmp_ctrl_id);
				}
			})
	}
	//console.log(ser_input_array,"ser_input_array1");
	var processType ="Screen"
	var	subProcessType = "Screen"
	if(src_service.substring(0,6)=="Export")
	{
		ser_input_array["cache"] = ser_input_array[src_inputcontrol+'_array']
		delete ser_input_array[src_inputcontrol+'_array'];
		processType = "Report"
		subProcessType = src_service
	}
	
	var tmpMethodName = ser_input_array["methodName"]
	if(tmpMethodName.substring(tmpMethodName.length-6,tmpMethodName.length)=="Report")
	{
		processType ="Report"
		subProcessType = "Report"
	}
	if(tmpMethodName.substring(tmpMethodName.length-6,tmpMethodName.length)=="Viewer")
	{
		processType ="Viewer"
		subProcessType = "Viewer"
		
	}
	if(tmpMethodName=="validateUserPassword")
	{
		processType ="ForgotPassword"
		subProcessType = "ForgotPassword"
		
	}
	if(errorStopFlag)
	{
		form_obj.setLoading(false);
		return false;
	}
	invoke_ebpack_service(form_obj,ser_input_array,src_service,processType,subProcessType,src_gridid,src_recordid,postHandlerFn)
	
	
}

function invoke_ebpack_service(form_obj,ser_input_array,src_service,processType,subProcessType,src_gridid,src_recordid,postHandlerFn)
{	
	
	/*
		Invoke ebPAC service.
	*/
	
	//Ext.Ajax.timeout = 120000;
	/*
	Ext.Ajax.on("requestcomplete", function(conn, response, options)
	{
		
		//console.clear();
	});
	*/
	Ext.Ajax.request
	(
		{
			url : 'JMSServlet',
			params : 
			{
				"workFlowName" : src_service,
				"workFlowParams" : Ext.JSON.encode(ser_input_array),
				"processType": processType,
				"AuthToken":hdnAuthToken
			},
			success : function(result) 
			{
				console.log("success");
				console.log("ser_input_array",hdnAuthToken,Ext.JSON.decode(result.responseText))
				var hdnAuthToken_json_data = Ext.JSON.decode(result.responseText);				
				Ext.each
				(hdnAuthToken_json_data["hdrcache"],
					function(hdrcache_obj)
					{
						for(var key in hdrcache_obj)
						{
							var attrName = key;
							var attrValue = hdrcache_obj[key];
							if (attrName  =="hdnAuthToken")
							{
								hdnAuthToken =attrValue;								
							}
						}						
					}	
				)
				if(!check_error(result.responseText,form_obj))
				{
					form_obj.setLoading(false);
					return false;
				}
				
				//var response_data = Ext.JSON.decode(result.responseText);
				//console.log(response_data);
				/*
					OnSuccess : Load Screen with retrieved data.
				*/
				if(subProcessType !="Screen" )
				{
					var in_json_data = Ext.JSON.decode(result.responseText);
					var UID = in_json_data["UID"]
					
					//if(subProcessType =="ExportToPDF" || subProcessType =="Report" )
					if(subProcessType =="ExportToPDF")
					{
						var repPath = window.location.pathname + "ReportDownloadServlet"
						//alert(repPath)
						var tmpHTMLStr ='<iframe src="lib/pdfview/web/viewer.html?file='+repPath+'" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe>'
						//console.log(tmpHTMLStr)
						var tmpHelpWindow =Ext.create('Ext.Window',{
							width: plf.screenWidth*.8,
							height: window.screen.availHeight *.8,
							modal:true,
							autoScroll:true,
							items:
							[
								{
									xtype:'component',
									width: plf.screenWidth*.8,
									height: window.screen.availHeight *.8,
									html:tmpHTMLStr
								}
							]
						});
						tmpHelpWindow.show();						
					}
					//To Launch report in Tab.
					else if(subProcessType =="Report")
					{
						var repPath = window.location.pathname + "ReportDownloadServlet"
						//alert(repPath)
						//var tmpHTMLStr ='<iframe src="lib/pdfview/web/viewer.html?file='+repPath+'" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:'+(window.screen.availHeight-250)+';width:'+(plf.screenWidth-plf.appMargin-50)+';position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="'+(window.screen.availHeight-250)+'" width="'+(plf.screenWidth-plf.appMargin-50)+'"></iframe>'
						//var tmpHTMLStr ="lib/pdfview/web/viewer.jsp?file="+repPath+"&repcode=" + Math.random();
						var tmpHTMLStr =repPath+"?repcode=" + Math.random();
						if (newWinReportPtr != undefined && typeof newWinReportPtr.close != undefined) 
							newWinReportPtr.close();
							
						newWinReportPtr = window.open(tmpHTMLStr, 'cuetransreport');
						/*
						if(Ext.isIE)
						{
							newWinReportPtr = window.open(repPath, 'cuetransreport');
						}
						else
						{
							newWinReportPtr = window.open(tmpHTMLStr, 'cuetransreport');
						}
						*/
						/*
						plf.viewport.ptrContentPanel.reportResultPtr.removeAll();
						plf.viewport.ptrContentPanel.reportResultPtr.add(
							{
								xtype:'component',
								width: plf.screenWidth-plf.appMargin-50,
								height: window.screen.availHeight-250,
								html:tmpHTMLStr
							}						
						);
						plf.viewport.ptrContentPanel.loadReportResult();
						*/
						
					}
					else if(subProcessType =="Viewer")
					{
						Ext.each
						(in_json_data["grid_array"],
							function(grid_array_obj)
							{
								for(var key in grid_array_obj)
								{
									var svg_id_key = key;
									var svg_id_value = grid_array_obj[key];
									
									var arrData = typeof svg_id_value != 'object' ? JSON.parse(svg_id_value) : svg_id_value;
									var ReportTitle ='Report';
									//var ShowLabel =true;
									var ShowLabel =false;
									var CSV = '';    
									//Set Report title in first row or line		
									//CSV += ReportTitle + '\r\n\n';
									
									//This condition will generate the Label/Header
									if (ShowLabel) {
										var row = "";
										
										//This loop will extract the label from 1st index of on array
										for (var index in arrData[0]) {
											
											//Now convert each value to string and comma-seprated
											row += index + ',';
										}

										row = row.slice(0, -1);
										
										//append Label row with line break
										CSV += row + '\r\n';
									}
									//1st loop is to extract each row
									for (var i = 0; i < arrData.length; i++) {
										var row = "";
										
										//2nd loop will extract each column and convert it in string comma-seprated
										for (var index in arrData[i]) {
											//row += '"' + arrData[i][index] + '",';
											row += arrData[i][index];
										}

										row.slice(0, row.length - 1);
										
										//add a line break after each row
										CSV += row + '\r\n';
									}
									if (CSV == '') {        
											alert("Invalid data");
											return;
										}  
									//Generate a file name
									var fileName = "";
									//this will remove the blank-spaces from the title and replace it with an underscore
									fileName += ReportTitle.replace(/ /g,"_");   
									//Initialize file format you want csv or xls
									var uri = 'data:text/plain;base64,' + btoa(CSV);
									
									//this trick will generate a temp <a /> tag
									var link = document.createElement("a");    
									link.href = uri;
									 //set the visibility hidden so it will not effect on your web-layout
									link.style = "visibility:hidden";
									link.download = fileName + ".txt";
									
									//this part will append the anchor tag and remove it after automatic click
									document.body.appendChild(link);
									link.click();
									document.body.removeChild(link);
									console.log(uri,fileName,"CSV");
									
								}
							}
						)	
						delete in_json_data["grid_array"];
					}
					else
					{
						
						//console.log("'FileDownloadServlet?UID="+encodeURI(UID)+"'")
						//show File Save Dialog
						form_obj.hdnIframe.update("<iframe src='FileDownloadServlet?UID="+encodeURI(UID)+"' style='display:none' />");
					
						}
				}
				else
				{
					var currentDate = new Date();
					//console.log("before load form",currentDate);				
					load_form_values(result.responseText,form_obj,src_gridid,src_recordid)
					//console.log("after load form",currentDate);
				}
				console.log("before post handler",postHandlerFn);
				if(postHandlerFn != undefined )
				{
					//alert()
					//window["form_obj."+event_handler_obj["callbackMethod"]]();
					postHandlerFn(form_obj);
				}
				/*
					Set "Loading-Mask" Off
				*/				
				form_obj.setLoading(false);
				return true;
			},
			failure : function(result) 
			{
				
				/*
					OnFailure : Display Error Message.
				*/
				//alert("failure");
				alert("Problem occurred while processing your request.");
				//alert(result.responseText);
				
				/*
					Set "Loading-Mask" Off
				*/								
				form_obj.setLoading(false);
				// todo
			}
		}
	);
}

function check_error(tmp_json_data,form_obj)
{
	var in_json_data = Ext.JSON.decode(tmp_json_data);
	console.log(in_json_data,"in_json_data");
	/*
		Process Session Timeout Error.
	*/
	if(in_json_data["strSessionError"] != "" && in_json_data["strSessionError"] != undefined)
	{
		var errorMsg="Session timeout. Please login again.";
		if (in_json_data["strSessionError"] =="Authentication Failed")
		{	
		errorMsg ="Authentication failed. Please login again.";
		}
		Ext.MessageBox.show({
							'title':'Failure', 
							'msg':errorMsg,
							'buttons': Ext.MessageBox.OK,
							icon:Ext.MessageBox["ERROR"]
							})
		window.onbeforeunload = function (evt) 
								{		 
								};
		Ext.Ajax.request({
			url: "JMSServlet",
			//url : 'login.json',
			async:false,
			params: {

				workFlowName: "Logout",
				workFlowParams: ""
			},
			success: function(result) {
			},
			failure: function(result) {
			}
		})									
		location.href = "";
		//alert(in_json_data["strFailureMsg"]);
		return false;
	}
	if(in_json_data["strAuthFailed"] != "" && in_json_data["strAuthFailed"] != undefined)
	{
		//Ext.Msg.alert('Failure', "Session Timeout. Re-login again");
		Ext.MessageBox.show({
							'title':'Failure', 
							'msg':"Authentication failed. Please login again.",
							'buttons': Ext.MessageBox.OK,
							icon:Ext.MessageBox["ERROR"]
							})
		window.onbeforeunload = function (evt) 
								{		 
								};
		Ext.Ajax.request({
			url: "JMSServlet",
			//url : 'login.json',
			async:false,
			params: {

				workFlowName: "Logout",
				workFlowParams: ""
			},
			success: function(result) {
			},
			failure: function(result) {
			}
		})									
		location.href = "";
		//alert(in_json_data["strFailureMsg"]);
		return false;
	}
	//
	
	/*
		Display Failure Message
	*/	
	if(in_json_data["strFailureMsg"] != "" && in_json_data["strFailureMsg"] != undefined)
	{
		//Ext.Msg.alert('Failure', in_json_data["strFailureMsg"]);
		Ext.MessageBox.show({
							'title':'Failure', 
							'msg':in_json_data["strFailureMsg"],
							'buttons': Ext.MessageBox.OK,
							icon:Ext.MessageBox["ERROR"]
							})		
		//alert(in_json_data["strFailureMsg"]);
		return false;
	}
	if(in_json_data["strResponseMsg"] != "" && in_json_data["strResponseMsg"] != undefined)
	{
		//Ext.Msg.alert('Failure', in_json_data["strResponseMsg"]);
		Ext.MessageBox.show({
							'title':'Failure', 
							'msg':in_json_data["strResponseMsg"],
							'buttons': Ext.MessageBox.OK,
							icon:Ext.MessageBox["ERROR"]
							})			
		//alert(in_json_data["strResponseMsg"]);
		return false;
	}	
	return true;
}

/*
	Global Function to Display  Success / Failure Message and Load Screen Data
	Parameters:
		tmp_json_data : Screen data in JSON format.
		form_obj : Screen Object
*/
function load_form_values(tmp_json_data,form_obj,src_gridid,src_recordid)
{
	var in_json_data = Ext.JSON.decode(tmp_json_data);
	delete in_json_data["temphash"];
	delete in_json_data["cache"];
	delete in_json_data["query1"];
	//console.log(tmp_json_data,"sss")
	
	//console.log(in_json_data)
	/*Combo Array processing Starts*/
	Ext.each
	(in_json_data["combo_array"],
		function(combo_array_obj)
		{
			for(var key in combo_array_obj)
			{
				var combo_id_key = key;
				var combo_id_value = combo_array_obj[key];
				//console.log(combo_id_key,"combokey")
				if
				(
					Ext.data.StoreManager.containsKey(combo_id_key+'_cbostore') //load combo store
					&& 
					combo_id_value != null 
				)
				{
					//console.log("Load values for ",combo_id_key,combo_id_value)
					Ext.data.StoreManager.lookup(combo_id_key+'_cbostore').clearFilter();
					Ext.data.StoreManager.lookup(combo_id_key+'_cbostore').loadData(combo_id_value,false);
				}
				
				delete in_json_data[combo_id_key+"_array"];
				
			}
		}
	)	
	
	delete in_json_data["combo_array"];
	/*Combo Array Processing Ends*/

	/*Grid Array processing Starts*/
	Ext.each
	(in_json_data["grid_array"],
		function(grid_array_obj)
		{
			for(var key in grid_array_obj)
			{
				var grid_id_key = key;
				var grid_id_value = grid_array_obj[key];				
				if (grid_id_key=='state_array')
				{						
					var tmpCtrlType;					
					var tmpCtrlId;
					var tmpGridColName;
					var tmpVisible;							
					grid_id_value.forEach(function(entry) 
					{						
						tmpCtrlType=entry["CTRL_TYPE"].toLowerCase();											
						tmpCtrlId=entry["CONTROLID"];
						tmpGridColName=entry["GRIDCOLNAME"];
						tmpVisible=entry["VISIBLE"].toLowerCase();
						var strVisible;						
						if (tmpCtrlType =='section' || tmpCtrlType =='control')
						{
							console.log(tmpCtrlId,form_obj.queryById("cnt_"+tmpCtrlId),"ssss")	
							if (form_obj.queryById(tmpCtrlId)!=undefined || form_obj.queryById("cnt_"+tmpCtrlId)!=undefined)
							{							
								if (tmpVisible=="false")
									strVisible=false;
								else	
									strVisible=true;
								if (form_obj.queryById(tmpCtrlId)!=undefined )	
									form_obj.queryById(tmpCtrlId).setHidden(strVisible);
								if (form_obj.queryById("cnt_"+tmpCtrlId) !=undefined)
								{
								//form_obj.queryById(tmpCtrlId).setHidden(strVisible);
								form_obj.queryById("cnt_"+tmpCtrlId).setHidden(strVisible);
								}
							}
						}					
						if (tmpCtrlType =='gridcolumn')
						{	
							if (form_obj.queryById(tmpCtrlId)!=undefined)
							{
								var myGrid=	form_obj.queryById(tmpCtrlId);									
								Ext.each(myGrid.columns, function(column, index) 
								{
									if (tmpVisible=="false")
									strVisible=false;
									else	
									strVisible=true;
									if (column.dataIndex==tmpGridColName)
										column.setHidden(strVisible);									
								});
								
							}							
						}	
					});
				}
				else
				{
					if
					(
						Ext.data.StoreManager.containsKey(grid_id_key+'_store') //load grid store
						&& 
						grid_id_value != null 
					)
					{
					
						
						/*
						if (grid_id_value.length==0)
						{						
						alert("No data to display.");
						}
						*/
						var rowCnt=Ext.data.StoreManager.lookup(grid_id_key+'_store').getCount();
						//alert(rowCnt);
						Ext.data.StoreManager.lookup(grid_id_key+'_store').clearFilter();
						if (Ext.data.StoreManager.lookup(grid_id_key+'_store').proxy.enablePaging != undefined)
						{
							console.log(grid_id_key,"grid_id_key");
							var tmpStore = Ext.data.StoreManager.lookup(grid_id_key+'_store');							
							/*
							Ext.data.StoreManager.lookup(grid_id_key+'_store').getProxy().setData(grid_id_value,true);
							Ext.data.StoreManager.lookup(grid_id_key+'_store').loadPage(1);
							Ext.data.StoreManager.lookup(grid_id_key+'_store').setRemoteSort(true);
							*/
							
							tmpStore.getProxy().setData(grid_id_value,true);							
							tmpStore.setRemoteSort(true);
							tmpStore.setRemoteFilter(true);		
							tmpStore.loadPage(1);	
							//form_obj.queryById(grid_id_key+'paging').doRefresh();						
							//form_obj.queryById(grid_id_key+'paging').moveFirst();
						}
						else
						{					
							Ext.data.StoreManager.lookup(grid_id_key+'_store').loadData(grid_id_value,false);
						}
					}
				}
				delete in_json_data[grid_id_key+"_array"];
			}
		}
	)	
	
	delete in_json_data["grid_array"];
	/*Combo Array Processing Ends*/
	/*SVG data processing Starts*/
	
	Ext.each
	(in_json_data["svg_array"],
		function(svg_array_obj)
		{
			for(var key in svg_array_obj)
			{
				var svg_id_key = key;
				var svg_id_value = svg_array_obj[key];
				var tmp_control_obj = form_obj.queryById(svg_id_key);
				//console.log(tmp_control_obj)
				if(tmp_control_obj)
				{
					if(tmp_control_obj.getXType()=="cueSvg")
					{
						for(var key in svg_id_value)
						{
							var svg_key=key;
							
							var obj = svg_id_value[svg_key];							
							tmp_control_obj.setsvgData(obj)
						}
						
					}
				}
					
				//Ext.data.StoreManager.lookup('guage1_store').loadData([{"yaxis":50}],false);
				
			}
		}
	)	
	delete in_json_data["svg_array"];
	
	/*
	Ext.each
	(in_json_data["gis_array"],
		function(gis_array_obj)
		{
			for(var gis_control in gis_array_obj)
			{
				var gis_control_array = gis_array_obj[gis_control];
				console.log(gis_control, gis_array_obj)
				if(gis_control != "")
				{
					
					console.log(gis_control,"gis_control")
					
					cuePoiArray = gis_control_array
					
					if(cueGISPallet != undefined)
					{
						//CueGisApp.pallet.clearElementsInMap();
						var iCount=1;
						Ext.each(cuePoiArray,function(poi_obj_tmp)
						{
							poi_obj_tmp["markerOptions"]=cuePoiElement.markerOptions;
							//console.log(poi_obj_tmp,"poi_obj_tmp")
							var poiObj = cuePoiElement.loadPOI(
								poi_obj_tmp, cueGISPallet);	
							iCount = iCount + 1;
							if(iCount>=100) return false;

								
						})
					}
					
					
				}
			}
		}
	)	
	delete in_json_data["gis_array"];
	*/
	Ext.each
	(in_json_data["gis_array"],
		function(gis_array_obj)
		{
			var tmp_control_obj = form_obj.queryById("ivmsMap");
			console.log(tmp_control_obj,"ivmsMap");
			if (!(tmp_control_obj))
			{
				
				var tmp_control_obj = form_obj.hlpParentForm.queryById("ivmsMap");
			}
			
			if(tmp_control_obj)
			{
				tmp_control_obj._gisPallet.clearElementsInMap();
				for(var gis_control_type in gis_array_obj)
				{					
					var gis_control_value = gis_array_obj[gis_control_type];					
					if(gis_control_type=='PID_array')
					{
						var tmpPID_array=[];
						Ext.each
						(gis_control_value,
							function(gis_object)
							{
								var fields = gis_object.pid.split("<BR>");
								var _meta = {};
								for(var i=0;i<fields.length;i++) {
									var field = fields[i];
									var datas = field.split(":");
									_meta[datas[0]] = datas[1].trim();
									
								}
								_meta.contextType = gis_object.contextType;
								_meta.category= gis_object.contextType;
								/*_meta.VEH_NO= gis_object.VEH_NO;*/
								//console.log(_meta,"_meta");
								tmpPID_array.push(
								{
									"latitude" : gis_object.latitude,
									"longitude" : gis_object.longitude,
									"markerOptions" : 
									{
										"icon" : 'CueGis/icons/'+gis_object.POIType+'.png'
									}, 
									"pid" :gis_object.pid,
									"metaData" : _meta,									
									//"toolTip" : '<div style="width:300px;padding: 1px 1px;border:1px solid #73AD21;background:white;position: absolute;top: 0;left: 0; z-index: 10;">' + gis_object.pid + '</div>',
									"TRAN_NO" : gis_object.TRAN_NO
									
								})

							});	

						//console.log("tmpPID_array",tmpPID_array)
						tmp_control_obj.loadPID(
							{
							cleanBeforeLoad : true,
							data:tmpPID_array

							});
					}					
					if(gis_control_type=='POI_array')
					{
						var tmpPOI_array=[];
						Ext.each
						(gis_control_value,
							function(gis_object)
							{
								tmpPOI_array.push(
								{
									"latitude" : gis_object.latitude,
									"longitude" : gis_object.longitude,
									"markerOptions" : 
									{
										"icon" : 'CueGis/icons/'+gis_object.POIType+'.png'
									}, 
									"pid" :gis_object.pid,
									"metaData" : 
									{
										contextType : gis_object.contextType,
										category : gis_object.contextType
									},
									"toolTip" : gis_object.pid,
									"TRAN_NO" : gis_object.TRAN_NO
										
								})

							});	

						//console.log("tmpPOI_array",tmpPOI_array)
						tmp_control_obj.loadPID(
							{
							cleanBeforeLoad : true,
							data:tmpPOI_array

							});
					}
					if(gis_control_type=='Route_array')
					{
						tmp_control_obj.loadRoute(
								{
									"geoJson": gis_object.geoJSON,
									"useRouteFinder": false,
									"strokeColor": "#086A87",
									"strokeWidth": 2,
									"showDirection": true,
									"fitView": true
								});									
						
					}
					if(gis_control_type=='Fence_array')
					{
						tmp_control_obj.loadFence(
							{
							cleanBeforeLoad : true,
							data:[
								{
								"pId": "Fence2",
								"config" : {
									"fenceOptions" : {
										"draggable" : false
									}
								},
								"type": "CIRCLE",
								"geoJson": {"type":"Polygon","crs":{"type":"name","properties":{"name":"EPSG:4326"}},"coordinates":[[[58.2769775390625,23.589002482299723],[58.27622635657788,23.58899920462701],[58.275475231298714,23.588989371858485],[58.2747242204261,23.588972984742952],[58.27397338115242,23.588950044528346],[58.27322277065701,23.58892055296166],[58.27247244610174,23.58888451228879],[58.27172246462674,23.58884192525437],[58.27097288334601,23.58879279510157],[58.27022375934306,23.58873712557184],[58.26947514966658,23.58867492090463],[58.2687271113261,23.588606185837065],[58.267979701287636,23.588530925603592],[58.26723297646936,23.588449145935567],[58.266486993737246,23.588360853060824],[58.265741809900774,23.588266053703208],[58.26499748170858,23.58816475508206],[58.26425406584414,23.588056964911665],[58.26351161892145,23.587942691400656],[58.262770197480705,23.587821943251406],[58.26202985798403,23.587694729659354],[58.26129065681114,23.587561060312307],[58.26055265025507,23.587420945389706],[58.25981589451788,23.58727439556184],[58.25908044570636,23.587121421989046],[58.25834635982779,23.58696203632086],[58.257613692785654,23.58679625069511],[58.256882500375376,23.586624077737017],[58.2561528382801,23.586445530558223],[58.25542476206642,23.586260622755777],[58.254698327180144,23.58606936841113],[58.25397358894212,23.585871782089043],[58.25325060254395,23.585667878836475],[58.25252942304387,23.58545767418145],[58.251810105362466,23.585241184131863],[58.25109270427859,23.585018425174276],[58.25037727442509,23.58478941427264],[58.249663870284735,23.58455416886703],[58.24895254618601,23.584312706872282],[58.24824335629899,23.58406504667667],[58.24753635463124,23.583811207140478],[58.24683159502367,23.583551207594564],[58.24612913114645,23.583285067838904],[58.24542901649493,23.583012808141067],[58.244731304385546,23.58273444923469],[58.24403604795178,23.582450012317874],[58.243343300140104,23.582159519051594],[58.24265311370594,23.58186299155804],[58.24196554120966,23.581560452418923],[58.24128063501257,23.581251924673776],[58.24059844727293,23.580937431818178],[58.23991902994197,23.580616997801975],[58.23924243475997,23.580290647027464],[58.238568713252256,23.579958404347515],[58.23789791672533,23.579620295063695],[58.23723009626295,23.579276344924338],[58.23656530272223,23.578926580122577],[58.23590358672976,23.578571027294352],[58.23524499867779,23.578209713516394],[58.23458958872035,23.577842666304143],[58.233937406769435,23.577469913609665],[58.23328850249123,23.577091483819522],[58.23264292530231,23.576707405752607],[58.232000724365875,23.576317708657953],[58.23136194858802,23.5759224222125],[58.23072664661398,23.575521576518845],[58.23009486682447,23.575115202102936],[58.22946665733197,23.574703329911756],[58.22884206597705,23.574285991310973],[58.22822114032478,23.573863218082533],[58.22760392766103,23.573435042422258],[58.22699047498895,23.57300149693738],[58.22638082902534,23.572562614644063],[58.225775036197085,23.5721184289649],[58.225173142637665,23.571668973726343],[58.22457519418359,23.571214283156152],[58.22398123637098,23.570754391880772],[58.22339131443199,23.570289334922712],[58.22280547329148,23.56981914769785],[58.22222375756351,23.56934386601277],[58.22164621154799,23.568863526062007],[58.22107287922729,23.568378164425315],[58.220503804262876,23.567887818064854],[58.21993902999201,23.567392524322404],[58.21937859942445,23.566892320916498],[58.21882255523914,23.566387245939563],[58.218270939781014,23.565877337855014],[58.21772379505771,23.565362635494328],[58.217181162736416,23.564843178054076],[58.2166430841407,23.56431900509296],[58.216109600247314,23.563790156528775],[58.21558075168313,23.563256672635394],[58.21505657872201,23.562718594039673],[58.214537121281765,23.56217596171838],[58.214022418921076,23.56162881699508],[58.21351251083652,23.561077201536946],[58.21300743585959,23.56052115735164],[58.21250723245368,23.559960726784077],[58.212011938711235,23.559395952513214],[58.21152159235078,23.5588268775488],[58.21103623071408,23.558253545228094],[58.210555890763324,23.557675999212577],[58.21008060907824,23.55709428348461],[58.20961042185338,23.556508442344096],[58.20914536489531,23.55591852040511],[58.20868547361994,23.555324562592492],[58.20823078304975,23.554726614138428],[58.20778132781119,23.554124720579004],[58.207337142132026,23.55351892775075],[58.20689825983871,23.552909281787137],[58.206464714353835,23.55229582911506],[58.20603653869355,23.551678616451316],[58.20561376546512,23.551057690799038],[58.20519642686433,23.550433099444124],[58.204784554673154,23.54980488995162],[58.204378180257244,23.54917311016211],[58.20397733456359,23.548537808188073],[58.203582048118136,23.547899032410214],[58.20319235102348,23.547256831473778],[58.20280827295657,23.54661125428486],[58.20242984316642,23.545962350006654],[58.202057090471946,23.545310168055742],[58.201690043259696,23.544654758098297],[58.20132872948174,23.543996170046327],[58.20097317665351,23.543334454053863],[58.20062341185175,23.54266966051314],[58.20027946171239,23.54200184005076],[58.199941352428574,23.541331043523837],[58.19960910974863,23.54065732201612],[58.199282758974114,23.539980726834113],[58.19896232495791,23.53930130950316],[58.19864783210231,23.53861912176352],[58.19833930435716,23.53793421556643],[58.19803676521805,23.537246643070148],[58.197740237724496,23.536556456635985],[58.19744974445822,23.535863708824305],[58.1971653075414,23.53516845239054],[58.19688694863502,23.534470740281158],[58.19661468893719,23.53377062562964],[58.19634854918152,23.53306816175242],[58.19608854963561,23.53236340214485],[58.19583471009942,23.531656400477097],[58.19558704990381,23.53094721059008],[58.19534558790906,23.53023588649135],[58.19511034250345,23.529522482350995],[58.19488133160181,23.528807052497502],[58.19465857264422,23.528089651413623],[58.19444208259464,23.527370333732225],[58.194231877939615,23.52664915423214],[58.194027974687046,23.525926167833973],[58.19383038836496,23.525201429595946],[58.19363913402031,23.524474994709674],[58.19345422621787,23.523746918495988],[58.19327567903907,23.523017256400713],[58.19310350608098,23.52228606399044],[58.192937720455234,23.521553396948303],[58.19277833478704,23.520819311069733],[58.19262536121425,23.52008386225821],[58.19247881138639,23.519347106521018],[58.19233869646378,23.518609099964948],[58.192205027116735,23.51786989879206],[58.19207781352468,23.517129559295384],[58.19195706537543,23.516388137854644],[58.191842791864424,23.515645690931947],[58.19173500169403,23.514902275067506],[58.19163370307288,23.51415794687531],[58.19153890371527,23.513412763038843],[58.191450610840526,23.51266678030673],[58.1913688311725,23.511920055488453],[58.191293570939024,23.51117264544999],[58.19122483587146,23.51042460710951],[58.19116263120425,23.509675997433032],[58.19110696167452,23.50892687343008],[58.19105783152172,23.508177292149348],[58.191015244487296,23.507427310674352],[58.19097920381443,23.506676986119082],[58.19094971224774,23.505926375623662],[58.19092677203314,23.505175536349988],[58.1909103849176,23.504424525477376],[58.19090055214908,23.50367340019821],[58.19089727447637,23.50292221771359],[58.19090055214908,23.50217103522897],[58.1909103849176,23.501419909949803],[58.19092677203314,23.50066889907719],[58.19094971224774,23.499918059803516],[58.19097920381443,23.499167449308096],[58.191015244487296,23.49841712475283],[58.19105783152172,23.497667143277834],[58.19110696167452,23.4969175619971],[58.19116263120425,23.496168437994147],[58.19122483587146,23.49541982831767],[58.191293570939024,23.494671789977193],[58.1913688311725,23.49392437993873],[58.191450610840526,23.493177655120448],[58.19153890371527,23.492431672388335],[58.19163370307288,23.491686488551867],[58.19173500169403,23.490942160359676],[58.191842791864424,23.49019874449523],[58.19195706537543,23.489456297572538],[58.19207781352468,23.488714876131795],[58.192205027116735,23.48797453663512],[58.19233869646378,23.487235335462234],[58.19247881138639,23.48649732890616],[58.19262536121425,23.485760573168967],[58.19277833478704,23.485025124357445],[58.192937720455234,23.484291038478876],[58.19310350608098,23.48355837143674],[58.19327567903907,23.48282717902647],[58.19345422621787,23.48209751693119],[58.19363913402031,23.481369440717508],[58.19383038836496,23.480643005831233],[58.194027974687046,23.479918267593206],[58.194231877939615,23.47919528119504],[58.19444208259464,23.478474101694953],[58.19465857264422,23.47775478401356],[58.19488133160181,23.477037382929677],[58.19511034250345,23.476321953076184],[58.19534558790906,23.475608548935828],[58.19558704990381,23.4748972248371],[58.19583471009942,23.47418803495008],[58.19608854963561,23.47348103328233],[58.19634854918152,23.472776273674757],[58.19661468893719,23.47207380979754],[58.19688694863502,23.47137369514602],[58.1971653075414,23.47067598303664],[58.19744974445822,23.469980726602873],[58.197740237724496,23.469287978791193],[58.19803676521805,23.46859779235703],[58.19833930435716,23.467910219860748],[58.19864783210231,23.46722531366366],[58.19896232495791,23.46654312592402],[58.199282758974114,23.465863708593066],[58.19960910974863,23.46518711341106],[58.199941352428574,23.464513391903346],[58.20027946171239,23.46384259537642],[58.20062341185175,23.463174774914037],[58.20097317665351,23.462509981373316],[58.20132872948174,23.46184826538085],[58.201690043259696,23.461189677328882],[58.202057090471946,23.46053426737144],[58.20242984316642,23.459882085420524],[58.20280827295657,23.45923318114232],[58.20319235102348,23.4585876039534],[58.203582048118136,23.457945403016968],[58.20397733456359,23.457306627239106],[58.204378180257244,23.45667132526507],[58.204784554673154,23.456039545475562],[58.20519642686433,23.455411335983054],[58.20561376546512,23.45478674462814],[58.20603653869355,23.454165818975863],[58.20646471435383,23.453548606312122],[58.20689825983871,23.45293515364004],[58.207337142132026,23.452325507676427],[58.20778132781119,23.451719714848174],[58.20823078304975,23.45111782128875],[58.20868547361994,23.450519872834686],[58.20914536489531,23.449925915022067],[58.20961042185338,23.449335993083082],[58.21008060907824,23.448750151942573],[58.21055589076332,23.448168436214605],[58.21103623071408,23.447590890199084],[58.21152159235078,23.44701755787838],[58.212011938711235,23.446448482913965],[58.21250723245368,23.445883708643102],[58.21300743585959,23.44532327807554],[58.21351251083652,23.444767233890232],[58.214022418921076,23.4442156184321],[58.214537121281765,23.443668473708797],[58.21505657872201,23.44312584138751],[58.21558075168313,23.44258776279179],[58.216109600247314,23.442054278898404],[58.2166430841407,23.44152543033422],[58.217181162736416,23.441001257373102],[58.21772379505771,23.44048179993285],[58.21827093978101,23.439967097572165],[58.21882255523914,23.439457189487616],[58.21937859942445,23.43895211451068],[58.21993902999201,23.438451911104774],[58.220503804262876,23.437956617362325],[58.221072879227286,23.437466271001867],[58.22164621154799,23.43698090936517],[58.22222375756351,23.43650056941441],[58.22280547329148,23.43602528772933],[58.22339131443199,23.43555510050447],[58.223981236370975,23.435090043546406],[58.22457519418359,23.434630152271026],[58.22517314263766,23.43417546170084],[58.225775036197085,23.433726006462283],[58.22638082902534,23.433281820783115],[58.22699047498895,23.432842938489802],[58.22760392766103,23.43240939300492],[58.22822114032477,23.431981217344646],[58.22884206597705,23.431558444116206],[58.22946665733196,23.431141105515422],[58.230094866824466,23.430729233324247],[58.23072664661398,23.430322858908337],[58.23136194858802,23.42992201321468],[58.232000724365875,23.429526726769225],[58.23264292530231,23.42913702967457],[58.23328850249123,23.428752951607656],[58.233937406769435,23.428374521817513],[58.23458958872035,23.428001769123036],[58.23524499867779,23.427634721910785],[58.23590358672976,23.427273408132827],[58.23656530272223,23.426917855304605],[58.23723009626295,23.426568090502844],[58.23789791672533,23.426224140363484],[58.23856871325225,23.425886031079667],[58.239242434759966,23.425553788399718],[58.23991902994197,23.425227437625203],[58.24059844727293,23.424907003609004],[58.241280635012565,23.424592510753403],[58.24196554120966,23.424283983008255],[58.24265311370594,23.42398144386914],[58.243343300140104,23.423684916375585],[58.24403604795178,23.423394423109304],[58.244731304385546,23.42310998619249],[58.24542901649493,23.42283162728611],[58.246129131146446,23.422559367588274],[58.246831595023664,23.422293227832615],[58.24753635463124,23.4220332282867],[58.24824335629899,23.421779388750508],[58.248952546186004,23.421531728554896],[58.249663870284735,23.421290266560153],[58.25037727442509,23.421055021154537],[58.251092704278584,23.420826010252902],[58.251810105362466,23.420603251295315],[58.25252942304386,23.42038676124573],[58.25325060254395,23.420176556590704],[58.25397358894212,23.419972653338135],[58.254698327180144,23.419775067016047],[58.25542476206641,23.4195838126714],[58.2561528382801,23.41939890486896],[58.256882500375376,23.41922035769016],[58.25761369278565,23.41904818473207],[58.25834635982778,23.41888239910632],[58.25908044570635,23.418723013438132],[58.25981589451788,23.41857003986534],[58.26055265025507,23.418423490037473],[58.26129065681114,23.41828337511487],[58.26202985798403,23.418149705767824],[58.262770197480705,23.418022492175773],[58.26351161892144,23.417901744026523],[58.26425406584414,23.417787470515513],[58.26499748170858,23.417679680345117],[58.265741809900774,23.41757838172397],[58.266486993737246,23.417483582366355],[58.26723297646936,23.417395289491612],[58.267979701287636,23.417313509823586],[58.2687271113261,23.417238249590113],[58.269475149666576,23.41716951452255],[58.270223759343054,23.41710730985534],[58.270972883346005,23.41705164032561],[58.27172246462674,23.417002510172807],[58.27247244610174,23.41695992313839],[58.27322277065701,23.416923882465518],[58.27397338115242,23.416894390898833],[58.2747242204261,23.416871450684226],[58.275475231298714,23.416855063568693],[58.27622635657788,23.416845230800167],[58.2769775390625,23.416841953127456],[58.27772872154712,23.416845230800167],[58.278479846826286,23.416855063568693],[58.2792308576989,23.416871450684226],[58.27998169697257,23.416894390898833],[58.28073230746799,23.416923882465518],[58.281482632023256,23.41695992313839],[58.28223261349826,23.417002510172807],[58.28298219477899,23.41705164032561],[58.28373131878194,23.41710730985534],[58.28447992845842,23.41716951452255],[58.28522796679889,23.41723824959011],[58.28597537683736,23.417313509823586],[58.28672210165564,23.417395289491612],[58.287468084387754,23.417483582366355],[58.28821326822422,23.41757838172397],[58.28895759641641,23.417679680345117],[58.28970101228086,23.417787470515513],[58.29044345920355,23.41790174402652],[58.291184880644295,23.41802249217577],[58.29192522014097,23.418149705767824],[58.29266442131385,23.41828337511487],[58.29340242786993,23.418423490037473],[58.29413918360712,23.41857003986534],[58.29487463241864,23.418723013438132],[58.29560871829721,23.41888239910632],[58.296341385339346,23.41904818473207],[58.29707257774962,23.41922035769016],[58.2978022398449,23.419398904868956],[58.29853031605858,23.4195838126714],[58.299256750944856,23.419775067016047],[58.29998148918288,23.419972653338135],[58.30070447558105,23.420176556590704],[58.30142565508113,23.42038676124573],[58.30214497276253,23.42060325129531],[58.30286237384641,23.420826010252902],[58.3035778036999,23.421055021154537],[58.30429120784026,23.42129026656015],[58.30500253193899,23.421531728554896],[58.30571172182601,23.421779388750508],[58.306418723493756,23.4220332282867],[58.30712348310133,23.422293227832615],[58.30782594697855,23.422559367588274],[58.30852606163007,23.422831627286108],[58.30922377373945,23.42310998619249],[58.30991903017321,23.423394423109304],[58.310611777984896,23.42368491637558],[58.31130196441906,23.42398144386914],[58.31198953691534,23.42428398300825],[58.31267444311243,23.424592510753403],[58.31335663085207,23.424907003609],[58.31403604818302,23.425227437625203],[58.31471264336503,23.425553788399714],[58.315386364872744,23.425886031079663],[58.31605716139967,23.426224140363484],[58.31672498186205,23.42656809050284],[58.31738977540277,23.426917855304602],[58.31805149139524,23.427273408132823],[58.31871007944721,23.42763472191078],[58.31936548940465,23.428001769123032],[58.320017671355565,23.42837452181751],[58.320666575633766,23.428752951607652],[58.321312152822685,23.429137029674568],[58.321954353759125,23.429526726769225],[58.32259312953698,23.429922013214675],[58.32322843151102,23.430322858908333],[58.32386021130053,23.430729233324243],[58.32448842079303,23.431141105515422],[58.325113012147945,23.431558444116206],[58.32573393780022,23.431981217344642],[58.326351150463964,23.43240939300492],[58.32696460313605,23.4328429384898],[58.32757424909966,23.433281820783115],[58.328180041927915,23.43372600646228],[58.328781935487335,23.434175461700836],[58.3293798839414,23.434630152271026],[58.32997384175402,23.435090043546403],[58.33056376369301,23.435555100504466],[58.33114960483352,23.436025287729326],[58.33173132056149,23.43650056941441],[58.332308866577,23.436980909365168],[58.33288219889771,23.437466271001863],[58.333451273862124,23.43795661736232],[58.33401604813299,23.43845191110477],[58.33457647870055,23.438952114510677],[58.33513252288586,23.439457189487612],[58.335684138343986,23.43996709757216],[58.33623128306729,23.44048179993285],[58.336773915388584,23.4410012573731],[58.3373119939843,23.441525430334217],[58.337845477877686,23.4420542788984],[58.338374326441865,23.442587762791785],[58.33889849940299,23.443125841387506],[58.339417956843235,23.443668473708794],[58.339932659203924,23.4442156184321],[58.34044256728847,23.444767233890232],[58.340947642265405,23.445323278075538],[58.34144784567131,23.445883708643102],[58.341943139413765,23.44644848291396],[58.34243348577422,23.44701755787838],[58.342918847410914,23.44759089019908],[58.343399187361676,23.4481684362146],[58.34387446904676,23.44875015194257],[58.34434465627162,23.449335993083082],[58.34480971322969,23.449925915022064],[58.34526960450506,23.450519872834683],[58.34572429507525,23.45111782128875],[58.34617375031381,23.45171971484817],[58.346617935992974,23.452325507676424],[58.34705681828629,23.45293515364004],[58.347490363771165,23.45354860631212],[58.34791853943144,23.454165818975863],[58.34834131265988,23.454786744628137],[58.34875865126067,23.45541133598305],[58.349170523451846,23.45603954547556],[58.349576897867756,23.456671325265066],[58.34997774356141,23.457306627239102],[58.350373030006864,23.457945403016964],[58.35076272710152,23.458587603953397],[58.35114680516843,23.459233181142316],[58.35152523495858,23.45988208542052],[58.351897987653054,23.460534267371436],[58.352265034865304,23.46118967732888],[58.35262634864326,23.461848265380848],[58.35298190147149,23.462509981373312],[58.35333166627325,23.463174774914037],[58.3536756164126,23.463842595376416],[58.354013725696426,23.464513391903342],[58.35434596837637,23.46518711341106],[58.354672319150886,23.465863708593062],[58.35499275316709,23.466543125924016],[58.35530724602268,23.467225313663658],[58.35561577376784,23.467910219860748],[58.35591831290695,23.468597792357027],[58.356214840400504,23.469287978791193],[58.35650533366678,23.46998072660287],[58.356789770583596,23.470675983036635],[58.35706812948998,23.471373695146017],[58.35734038918781,23.47207380979754],[58.35760652894347,23.472776273674757],[58.35786652848939,23.473481033282326],[58.35812036802558,23.474188034950078],[58.35836802822119,23.474897224837097],[58.35860949021594,23.475608548935824],[58.35884473562155,23.47632195307618],[58.35907374652319,23.477037382929677],[58.35929650548078,23.477754784013555],[58.35951299553036,23.478474101694953],[58.359723200185385,23.47919528119504],[58.359927103437954,23.479918267593202],[58.36012468976004,23.480643005831233],[58.360315944104684,23.481369440717504],[58.36050085190713,23.48209751693119],[58.36067939908593,23.482827179026465],[58.36085157204402,23.48355837143674],[58.361017357669766,23.484291038478876],[58.36117674333796,23.485025124357445],[58.36132971691075,23.485760573168964],[58.36147626673861,23.48649732890616],[58.36161638166122,23.48723533546223],[58.361750051008265,23.487974536635118],[58.36187726460032,23.488714876131795],[58.36199801274957,23.489456297572534],[58.362112286260576,23.49019874449523],[58.36222007643097,23.490942160359673],[58.36232137505212,23.491686488551867],[58.36241617440973,23.492431672388335],[58.362504467284474,23.493177655120448],[58.3625862469525,23.493924379938726],[58.362661507185976,23.49467178997719],[58.36273024225354,23.49541982831767],[58.36279244692075,23.496168437994147],[58.36284811645048,23.496917561997098],[58.36289724660328,23.49766714327783],[58.362939833637704,23.498417124752827],[58.36297587431057,23.499167449308096],[58.36300536587726,23.499918059803516],[58.36302830609186,23.50066889907719],[58.3630446932074,23.501419909949803],[58.36305452597592,23.50217103522897],[58.36305780364863,23.50292221771359],[58.36305452597592,23.50367340019821],[58.3630446932074,23.504424525477376],[58.36302830609186,23.505175536349988],[58.36300536587726,23.505926375623662],[58.36297587431057,23.506676986119082],[58.362939833637704,23.50742731067435],[58.36289724660328,23.508177292149348],[58.36284811645048,23.508926873430077],[58.36279244692075,23.509675997433032],[58.36273024225354,23.51042460710951],[58.362661507185976,23.51117264544999],[58.3625862469525,23.51192005548845],[58.362504467284474,23.51266678030673],[58.36241617440973,23.513412763038843],[58.36232137505212,23.51415794687531],[58.36222007643097,23.514902275067506],[58.362112286260576,23.515645690931947],[58.36199801274957,23.516388137854644],[58.36187726460032,23.517129559295384],[58.361750051008265,23.517869898792057],[58.36161638166122,23.518609099964948],[58.36147626673861,23.519347106521018],[58.36132971691075,23.52008386225821],[58.36117674333796,23.520819311069733],[58.361017357669766,23.521553396948303],[58.36085157204402,23.52228606399044],[58.36067939908593,23.523017256400713],[58.36050085190713,23.523746918495988],[58.36031594410469,23.524474994709674],[58.36012468976004,23.525201429595946],[58.359927103437954,23.525926167833976],[58.359723200185385,23.52664915423214],[58.35951299553036,23.527370333732225],[58.35929650548078,23.528089651413623],[58.35907374652319,23.528807052497502],[58.35884473562155,23.529522482351],[58.35860949021594,23.53023588649135],[58.35836802822119,23.53094721059008],[58.35812036802558,23.5316564004771],[58.35786652848939,23.53236340214485],[58.35760652894347,23.53306816175242],[58.35734038918781,23.53377062562964],[58.35706812948998,23.53447074028116],[58.356789770583596,23.535168452390543],[58.35650533366678,23.535863708824305],[58.356214840400504,23.536556456635985],[58.35591831290695,23.537246643070148],[58.35561577376784,23.53793421556643],[58.35530724602268,23.53861912176352],[58.35499275316709,23.539301309503163],[58.354672319150886,23.539980726834116],[58.35434596837637,23.54065732201612],[58.354013725696426,23.541331043523837],[58.3536756164126,23.542001840050762],[58.35333166627325,23.54266966051314],[58.35298190147149,23.543334454053866],[58.35262634864326,23.543996170046327],[58.352265034865304,23.544654758098297],[58.351897987653054,23.545310168055742],[58.35152523495858,23.545962350006658],[58.35114680516843,23.546611254284862],[58.35076272710152,23.54725683147378],[58.350373030006864,23.547899032410214],[58.34997774356141,23.548537808188073],[58.349576897867756,23.549173110162112],[58.349170523451846,23.54980488995162],[58.34875865126067,23.550433099444124],[58.34834131265988,23.55105769079904],[58.34791853943145,23.551678616451316],[58.347490363771165,23.55229582911506],[58.34705681828629,23.552909281787137],[58.346617935992974,23.553518927750755],[58.34617375031381,23.554124720579008],[58.34572429507525,23.554726614138428],[58.34526960450506,23.555324562592492],[58.34480971322969,23.55591852040511],[58.34434465627162,23.556508442344096],[58.34387446904676,23.55709428348461],[58.343399187361676,23.557675999212577],[58.342918847410914,23.558253545228098],[58.34243348577422,23.5588268775488],[58.341943139413765,23.559395952513214],[58.34144784567131,23.559960726784077],[58.340947642265405,23.56052115735164],[58.34044256728848,23.561077201536946],[58.339932659203924,23.56162881699508],[58.339417956843235,23.562175961718385],[58.33889849940299,23.562718594039673],[58.338374326441865,23.563256672635394],[58.337845477877686,23.56379015652878],[58.3373119939843,23.564319005092962],[58.336773915388584,23.56484317805408],[58.33623128306729,23.565362635494328],[58.335684138343986,23.565877337855017],[58.33513252288586,23.566387245939566],[58.33457647870055,23.5668923209165],[58.33401604813299,23.567392524322408],[58.333451273862124,23.567887818064857],[58.33288219889771,23.568378164425315],[58.332308866577,23.56886352606201],[58.33173132056149,23.56934386601277],[58.33114960483352,23.569819147697853],[58.33056376369301,23.570289334922712],[58.32997384175402,23.570754391880776],[58.3293798839414,23.571214283156152],[58.328781935487335,23.571668973726343],[58.328180041927915,23.5721184289649],[58.32757424909966,23.572562614644063],[58.32696460313605,23.57300149693738],[58.326351150463964,23.573435042422258],[58.32573393780022,23.573863218082536],[58.325113012147945,23.574285991310976],[58.32448842079303,23.574703329911756],[58.32386021130053,23.575115202102936],[58.32322843151102,23.575521576518845],[58.32259312953698,23.575922422212503],[58.32195435375912,23.576317708657957],[58.321312152822685,23.57670740575261],[58.320666575633766,23.577091483819526],[58.320017671355565,23.57746991360967],[58.319365489404646,23.577842666304146],[58.31871007944721,23.578209713516397],[58.31805149139524,23.578571027294355],[58.31738977540277,23.578926580122577],[58.31672498186205,23.579276344924338],[58.31605716139967,23.579620295063695],[58.315386364872744,23.579958404347515],[58.31471264336503,23.580290647027464],[58.31403604818302,23.580616997801975],[58.31335663085207,23.580937431818178],[58.31267444311243,23.581251924673776],[58.311989536915334,23.581560452418927],[58.31130196441906,23.58186299155804],[58.31061177798489,23.582159519051597],[58.30991903017321,23.582450012317874],[58.30922377373945,23.58273444923469],[58.30852606163007,23.58301280814107],[58.30782594697855,23.583285067838904],[58.30712348310133,23.583551207594564],[58.306418723493756,23.583811207140478],[58.30571172182601,23.584065046676674],[58.30500253193899,23.584312706872282],[58.30429120784026,23.58455416886703],[58.3035778036999,23.58478941427264],[58.30286237384641,23.58501842517428],[58.30214497276253,23.585241184131867],[58.30142565508113,23.585457674181452],[58.30070447558104,23.585667878836475],[58.29998148918288,23.585871782089043],[58.29925675094485,23.58606936841113],[58.29853031605858,23.586260622755777],[58.29780223984489,23.586445530558223],[58.29707257774962,23.58662407773702],[58.296341385339346,23.586796250695112],[58.29560871829721,23.58696203632086],[58.29487463241864,23.587121421989046],[58.29413918360712,23.58727439556184],[58.29340242786992,23.587420945389706],[58.29266442131385,23.58756106031231],[58.29192522014097,23.587694729659358],[58.29118488064429,23.58782194325141],[58.29044345920355,23.58794269140066],[58.28970101228085,23.588056964911665],[58.28895759641641,23.58816475508206],[58.28821326822422,23.588266053703208],[58.28746808438775,23.588360853060824],[58.286722101655634,23.588449145935567],[58.28597537683736,23.588530925603592],[58.28522796679889,23.58860618583707],[58.28447992845842,23.58867492090463],[58.28373131878194,23.58873712557184],[58.28298219477899,23.58879279510157],[58.28223261349825,23.58884192525437],[58.281482632023256,23.58888451228879],[58.280732307467986,23.58892055296166],[58.27998169697257,23.588950044528346],[58.27923085769889,23.588972984742952],[58.27847984682628,23.588989371858485],[58.27772872154711,23.58899920462701],[58.2769775390625,23.589002482299723],[58.2769775390625,23.589002482299723]]]}
								}
						]});	
					}		

				}
			}
		}
	)	
	delete in_json_data["gis_array"];

	/*
		Process and Load Screen Data.
	*/
	for(var key in in_json_data)
	{
		var attrName = key;
		if(attrName.match(/array/))
		{
			var attrValue = in_json_data[key];
			combo_id_key = key.replace('_array','');
			if
			(
				Ext.data.StoreManager.containsKey(combo_id_key+'_cbostore') //load combo store
				&& 
				attrValue != null 
			)
			{
				Ext.data.StoreManager.lookup(combo_id_key+'_cbostore').clearFilter();
				Ext.data.StoreManager.lookup(combo_id_key+'_cbostore').loadData(attrValue,false);
				
			}
		}
	}				
	//load grid store
	for(var key in in_json_data)
	{
		var attrName = key;
		if(attrName.match(/array/))
		{
			var attrValue = in_json_data[key];
			grid_id_key = key.replace('_array','');
			if
			(
				Ext.data.StoreManager.containsKey(grid_id_key+'_store') //load grid store
				&& 
				attrValue != null 
			)
			{
				Ext.data.StoreManager.lookup(grid_id_key+'_store').clearFilter();
				if (Ext.data.StoreManager.lookup(grid_id_key+'_store').proxy.enablePaging !=  undefined)
				{
					/*
					Ext.data.StoreManager.lookup(grid_id_key+'_store').getProxy().setData(attrValue,true);
					Ext.data.StoreManager.lookup(grid_id_key+'_store').loadPage(1);
					Ext.data.StoreManager.lookup(grid_id_key+'_store').setRemoteSort(true);
					*/
					/*
					Ext.data.StoreManager.lookup(grid_id_key+'_store').getProxy().setData(attrValue);
					Ext.data.StoreManager.lookup(grid_id_key+'_store').read();
					Ext.data.StoreManager.lookup(grid_id_key+'_store').setRemoteSort(true);
					*/

					var tmpStore = Ext.data.StoreManager.lookup(grid_id_key+'_store')
					tmpStore.getProxy().setData(attrValue,true);
					tmpStore.setRemoteSort(true);
					tmpStore.setRemoteFilter(true);
					tmpStore.loadPage(1);

				}
				else
				{					
					Ext.data.StoreManager.lookup(grid_id_key+'_store').loadData(attrValue,false);
				}
			}
		}
	}				
	/*code added for id:57410 starts here */
	for(var key in in_json_data)
	{

		var attrName = key;
		if(attrName.match(/svgdata/))
		{
			var attrValue = in_json_data[key];
			var svgObjID = key.replace('_svgdata','');
			var tmp_control_obj = form_obj.queryById(svgObjID);
			//console.log(svgObjID,attrValue,tmp_control_obj)
			if(tmp_control_obj)
			{
				tmp_control_obj.svgUpdateData(attrValue)
			}
		}
	}
	/*code added for id:57410 ends here */
	/*
	alert(in_json_data["hdrcache"])
	for(var key in in_json_data["hdrcache"])
	{
		var attrName = key;
		var attrValue = in_json_data[key];
		var tmp_control_obj = form_obj.queryById(attrName);
		if(tmp_control_obj)
		{
			tmp_control_obj.setValue(in_json_data[key]);
		}
	}
	*/
	Ext.each
	(in_json_data["hdrcache"],
		function(hdrcache_obj)
		{
			for(var key in hdrcache_obj)
			{
				var attrName = key;
				var attrValue = hdrcache_obj[key];
	
				var tmp_control_obj = form_obj.queryById(attrName);
				if(tmp_control_obj)
				{
					
					if(tmp_control_obj.getXType()=="datefield")
					{
						tmp_control_obj.setValue(Ext.Date.parse(attrValue,plf.defDateFormat))
					}
					else if(tmp_control_obj.getXType()=="htmleditor")
					{
						tmp_control_obj.setValue(Ext.String.htmlDecode(attrValue));
					}
					else if(tmp_control_obj.getXType()=="qrpanel")
					{
						tmp_control_obj.textToEncode=attrValue;
						tmp_control_obj.qrRenderMethod="gif";							
						tmp_control_obj.qrBlocksize=6;					
						//console.log(tmp_control_obj,tmp_control_obj.getXType(),attrValue,"qrpanel");
					}
					else if(tmp_control_obj.getXType()=="gridpanel" || tmp_control_obj.getXType()=="grid" || tmp_control_obj.getXType()=="dataview")
					{
						tmp_control_obj.setTitle(attrValue)
					}
					else
					{
						tmp_control_obj.suspendEvents(false);
						tmp_control_obj.setValue(attrValue);
						tmp_control_obj.resumeEvents();
					}
				}
			}
			
		}	
	)
	/*Process Grid OnENTER tasks*/
	if(src_gridid != undefined)
	{
		//console.log(Ext.data.StoreManager.lookup(src_gridid+'_store'))
		var tmpSelRecord = Ext.data.StoreManager.lookup(src_gridid+'_store').getById(src_recordid);
		//console.log(tmpSelRecord)
		Ext.each
		(in_json_data["hdrcache"],
			function(hdrcache_obj)
			{
				for(var key in hdrcache_obj)
				{
					var attrName = key;
					var attrValue = hdrcache_obj[key];
					if(tmpSelRecord.get(attrName) != undefined)
					{
						tmpSelRecord.set(attrName,attrValue)
					}
				}
			}
		)
	}
	
	var tmpScreenMode = form_obj.hdnScreenMode.getValue();
	if(tmpScreenMode=="")
	{
		form_obj.applyScreenMode(true,[])
	}
	else
	{
		if(form_obj.screenModes[tmpScreenMode] == undefined)
		{
			form_obj.applyScreenMode(true,[])
		}
		else
		{
			form_obj.applyScreenMode(form_obj.screenModes[tmpScreenMode]["enableAll"],form_obj.screenModes[tmpScreenMode]["except"]);
		}
	}
	
	
	/*
		Display Success Message
	*/
	if(in_json_data["strSuccessMsg"] != "" && in_json_data["strSuccessMsg"] != undefined)
	{
		//Ext.Msg.alert('Success', in_json_data["strSuccessMsg"]);
		Ext.MessageBox.show({
							'title':'Success', 
							'msg':in_json_data["strSuccessMsg"],
							'buttons': Ext.MessageBox.OK,
							icon:'success_check_icon'//Ext.MessageBox["ERROR"]
							})
		
		//alert(in_json_data["strResponseMsg"]);
	}
	if(form_obj.popupCloseWindow)
	{
		form_obj.ownerCt.close();
	}
}

function apply_custom_style(form_obj)
{
	/*
	form_obj.query('.combo').forEach(function(field_obj)
	{

	}
	*/
	/*
	form_obj.query('.field').forEach(function(field_obj)
	{
		field_obj.labelStyle = 160;
		field_obj.labelAlign = "right";
	})
	*/
}

function updateCheckListRecord(storeID,recordID,fieldName,fieldValue)
{
		//console.log(storeID,recordID,fieldName,fieldValue)
		var tmpStore = Ext.data.StoreManager.lookup(storeID+'_store')
		//console.log(storeID)
		tmpStore.getById(recordID).set(fieldName,fieldValue)
		//tmpStore.getById(recordID).setDirty()
}
function docManDocument_OnCheck(obj)
{
  //console.log(obj.checked,"ss");
}
function gisHighlightPID(gridID,searchTextValue)
{
		var tmp_control_obj = form_obj.queryById(gridID);	
		var searchByValue="Vehicle Reg No";
		var mapElements = tmp_control_obj._gisPallet;
		var _trackingElement= tmp_control_obj._trackingElement;
		console.log(mapElements,"mapElements");
		console.log(_trackingElement,"_trackingElement");
		var results = mapElements.search({
			type : 'PID',
			searchText : searchTextValue,
			searchBy : searchByValue,
			callBack : function(matchedItems) {
				console.log(matchedItems);
			},
			singleResult : true
		});
		console.log(results,"results");
		for(var resultIndex=0;resultIndex<results.length;resultIndex++) {
			var result = results[resultIndex];			
			_trackingElement.pan(result, false);
			_trackingElement.highlight(result, {
				animation : true,
				animationClass : 'circleOutGreen'
			});
			mapElements.setZoomLevel(8);
		}
}
/*To Handle Grid Header clicks*/
function gridHdrCheckboxAllClick(tmpCB,tmpGridStore,tmpGridColumn)
{
	var GridStore=tmpGridStore;
	var recCount;
	var ChkCount;
	
	if (Ext.data.StoreManager.lookup(tmpGridStore).proxy.enablePaging == undefined)
	{	
		var tmpGridStore = Ext.data.StoreManager.lookup(tmpGridStore);		
		recCount=tmpGridStore.getCount()
		if(tmpCB.checked)
		{
			tmpGridStore.each(function(rec)
			{				
				rec.set(tmpGridColumn, 1);
			});	
		}
		else
		{
			tmpGridStore.each(function(rec)
			{
				rec.set(tmpGridColumn, 0);
			});	
		}
	}
	else
	{
		var tmpGridStore = Ext.data.StoreManager.lookup(tmpGridStore);
		recCount=tmpGridStore.getTotalCount()
		var recorddata = tmpGridStore.getProxy().getReader().rawData;
		if(tmpCB.checked)
		{
			Ext.each(recorddata, function(rec) 
			{
				rec.select =true;
			 })
			 tmpGridStore.getProxy().setData(recorddata, true);
             tmpGridStore.setRemoteSort(true);
			 tmpGridStore.setRemoteFilter(true);
			  var currentPage = tmpGridStore.currentPage;		 
			 tmpGridStore.loadPage(currentPage);
		}
		else
		{
			Ext.each(recorddata, function(rec) 
			{
				rec.select =false;
			 })
			 tmpGridStore.getProxy().setData(recorddata, true);
             tmpGridStore.setRemoteSort(true);
			 tmpGridStore.setRemoteFilter(true);			 
			 var currentPage = tmpGridStore.currentPage;			 
			 tmpGridStore.loadPage(currentPage);
		}		
	}
	var gridId=GridStore.replace("_store","");	
	var lblSelectedID=gridId+"_selectedRowCnt";
	if(tmpCB.checked)
	{
	ChkCount =recCount;
	}
	else
	{
	ChkCount =0;
	}
	if (form_obj.queryById(lblSelectedID) !=undefined)
	{
	form_obj.queryById(lblSelectedID).setText(ChkCount + " of " +recCount );
	}
							
} 
function gridHdrCheckboxClick(tmpCB,tmpGridStore,tmpGridColumn)
{
	if (Ext.data.StoreManager.lookup(tmpGridStore).proxy.enablePaging == undefined)
	{	
		var tmpGridStore = Ext.data.StoreManager.lookup(tmpGridStore);
		if(tmpCB.checked)
		{
			tmpGridStore.each(function(rec){
				if(rec.get(tmpGridColumn)!= 1 & rec.get(tmpGridColumn)!= 2 & rec.get(tmpGridColumn)!= 3)
				{
					rec.set(tmpGridColumn, 1);
				}
			});	
		}
		else
		{
			tmpGridStore.each(function(rec){
				if(rec.get(tmpGridColumn)==1)
					rec.set(tmpGridColumn, 0);
			});	
		}
	}
	else
	{
		var tmpGridStore = Ext.data.StoreManager.lookup(tmpGridStore);
		var recorddata = tmpGridStore.getProxy().getReader().rawData;
		if(tmpCB.checked)
		{
			Ext.each(recorddata, function(rec) 
			{
				console.log(rec,rec[tmpGridColumn],tmpGridColumn,"tmpGridStore")
				if(rec[tmpGridColumn] != 1 & rec[tmpGridColumn] != 2 & rec[tmpGridColumn] != 3)
				{
				rec[tmpGridColumn] =1;
				}
			 })
			 tmpGridStore.getProxy().setData(recorddata, true);
             tmpGridStore.setRemoteSort(true);
			 tmpGridStore.setRemoteFilter(true);			 
			 var currentPage = tmpGridStore.currentPage;			 
			 tmpGridStore.loadPage(currentPage);
		}
		else
		{
			Ext.each(recorddata, function(rec) 
			{
				if(rec[tmpGridColumn] ==1)
				{
				rec[tmpGridColumn] =0;
				}				
			 })
			 tmpGridStore.getProxy().setData(recorddata, true);
             tmpGridStore.setRemoteSort(true);
			 tmpGridStore.setRemoteFilter(true);			 
			 var currentPage = tmpGridStore.currentPage;		 
			 tmpGridStore.loadPage(currentPage);
		}		
	}
	/*
	var tmpGridStore = Ext.data.StoreManager.lookup(tmpGridStore);
	if(tmpCB.checked)
	{
		tmpGridStore.each(function(rec){
			if(rec.get(tmpGridColumn)!= 1 & rec.get(tmpGridColumn)!= 2 & rec.get(tmpGridColumn)!= 3)
			{
				rec.set(tmpGridColumn, 1);
			}
		});	
	}
	else
	{
		tmpGridStore.each(function(rec){
			if(rec.get(tmpGridColumn)==1)
				rec.set(tmpGridColumn, 0);
		});	
	}
	*/
}
function downloadCheckListImage(storeID,recordID,fieldName)
{
		var tmpStore = Ext.data.StoreManager.lookup(storeID+'_store')
		var fileName=tmpStore.getById(recordID).get(fieldName);
		var tmpentityName="";
		var tmpfilePath="app";
		/*
		
		 window.onbeforeunload = function (evt) 
											{		 
											};
		 var form = document.createElement("form");
		 form.action = "DownloadFileServlet";
		 form.method = 'POST';
		 form.target = "_self";
		  
		  var tmpParams={};
		  tmpParams['filePath']="app";
		  tmpParams['entityName']="";
		  tmpParams['fileName']=fileName;
	      
		  
		  for (var key in tmpParams) 
			{
				
				var hiddenField = document.createElement("input"); 
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", key);
				hiddenField.setAttribute("value", tmpParams[key]);				
				form.appendChild(hiddenField);
				
			}
		   
		  form.style.display = 'none';
		  document.body.appendChild(form);
		  console.log(form,"form")
		  form.submit();
		 */
		 var tmpOuterBox = Ext.create("Ext.form.Panel",{
				layout:"column",
				//height:180,
				//width:140,
				cls : "profile_thumbnail"
			})		
		this.ptrPreviewField = Ext.create("Ext.Img",{
				src :'resources/images/FileUpload/NoImage.jpg',				
				height:225,
				width:225			
			})
		tmpOuterBox.add(this.ptrPreviewField);		
		this.ptrPreviewField.setSrc("DownloadFileServlet?filePath="+encodeURI(tmpfilePath)+"&entityName="+encodeURI(tmpentityName)+"&fileName="+encodeURI(fileName));
		var tmpWindow ="";	
		tmpWindow = Ext.create('Ext.window.Window', {
			title: 'Preview',
			header: {		
				titlePosition: 0,
				titleAlign: 'center'
			},
			layout:'hbox'
		});
		tmpWindow.add(tmpOuterBox);
		tmpWindow.show();
		
}