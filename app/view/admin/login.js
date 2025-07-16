/*
Version History
Version: 1.0
Create Date: 22-01-2016
Modification History
Defect ID 				Modified By				Modified Date				Remarks

*/
Ext.define('CueTrans.view.admin.login', {
    extend: "CueTrans.lib.plfTransScreen",
    alias: 'widget.Login',
    border: false,
    region: "center",
    cls: "cue-loginpage",
    autoScroll: false,
    autoHeight: true, 
    bodyBorder: false,
    border: false,
    //layout:"fit",
    initComponent: function() {
        var mainpage = this;
        mainpage.startPainting();

        //Toolbar Section
        mainpage.toolbarSectionFlag = false;

        //Login Main Section
        plf.columns = 3
		
		var tmpMainSection = Ext.create("Ext.panel.Panel", {
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            border: false,
            width: plf.screenWidth,
            height: plf.screenHeight-46
        })
		tmpMainSection.cls = "loginpage";
        tmpMainSection.bodyCls = "loginpage";
		
		var tmpBanner=Ext.create("Ext.panel.Panel", {
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            border: false           
        })
		
		this.bannerCount = 0
		this.bannerImg = Ext.create("Ext.Img",
			{
				src: "resources/images/login/banner_01.jpg",
				width: 732,
				height: 550
			})
			
		var logo_banner = {
            xtype: "container",
			cls: "",
            layout: {
                type: "vbox",
                align: "center",
                pack: 'center'
            },            
            items: [this.bannerImg]
        }
		tmpBanner.add(logo_banner);
		
		
        loginMainSection = Ext.create("Ext.panel.Panel", {
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            border: false           
        })
		
        //loginMainSection.cls = "loginpage";
        //loginMainSection.bodyCls = "loginpage";
        //this.bodyCls = "loginpage";

        var logo_img = {
            xtype: "container",
			cls: "login_logo_container",
            layout: {
                type: "vbox",
                align: "center",
                pack: 'center'
            },
            width: 328,
            height: 85,
            items: [{
                xtype: "image",
                src: "resources/images/login/logo.png",
                width: 267,
                height: 45
            }]
        }
		 var login_copy = {
            xtype: "container",
			cls: "login_poweredby_container",
            layout: {
                type: "vbox",
                align: "center",
                pack: 'center'
            },
            width: 328,
            height: 30,
            html:"Powered by Cuecent"
        }
		var tmpSigned=Ext.create("Ext.panel.Panel", {
            layout: {
                type: 'hbox'
            },
			width:125,//250
			cls:"login_links",
			items: [/*{xtype:"checkbox",width:20, cls:"keepmeSignedin_checkbox"},
			{xtype:"container",width:103,html:"KEEP ME SIGNED IN", cls:"keepmeSignedin"},
			{xtype: 'image',width:15,src:'resources/images/common/spacer.png',cls:"login_links_splitter"},
			{xtype:"container",width:125,html:"Forgot Password", cls:"forgetPassword",style:"text-align:center"},//112*/
			{xtype:"container",width:125,html:"FORGOT PASSWORD?", cls:"forgetPassword",style:"text-align:center;cursor: pointer;",
			  listeners : 
						{
							element  : 'el',
							click    : function() 
							{								
								launch_helpscreen("","","CueTrans.view.admin.ForgotPassword")
							}
						}
			}],
            border: false           
        })
		
		Ext.define('Carousel', {
			 extend: 'Ext.data.Model',
			 fields: [
				 { name: 'imageSrc', type: 'string' },
				 { name: 'title', type: 'string' },
				{ name: 'alt', type: 'string' }
			 ]
		 });		
		 Ext.define('Ext.store.Carousel', {
		 extend: 'Ext.data.Store',
		 model: 'Carousel',
		 data: [{
					imageSrc:"images/avus_gtr.jpg",
					title:"avus",
					alt: "avus"
			   },{
					imageSrc:"images/CroixDeFer.jpg",
					title:"CroixDeFer",
					alt: "CroixDeFer"
			   },{
					imageSrc:"images/flower.jpg",
					title:"flower",
					alt: "flower"
			   },{
					imageSrc:"images/grass.jpg",
					title:"grass",
					alt: "grass"
			   },{
					imageSrc:"images/stones.jpg",
					title:"stones",
					alt: "stones"
			   }
			]
		});
		
/*        var profile_img = {
            xtype: "container",
            layout: {
                type: "vbox",
                align: "center",
                pack: 'center'
            },
            height: 105,
            items: [{
                xtype: "image",
                src: "resources/images/login/login_profile_img.png",
                width: 92,
                height: 92
            }]
        }	*/

        loginControls = [{
            xtype: "container",
            //height: 533,
			height: 550,
            cls: "login_container",
            layout: {
                type: "vbox",
                align: "center"
            },
            items: [
                logo_img, {
//                profile_img, {
                    xtype: "textfield",
					cls: "input-login_username",
                    itemId: "strUserId",
                    emptyText: 'USER ID',
                    //inputWrapCls:"x-form-text-wrap input-login-wrap",fieldCls:"input-login",
                    inputWrapCls: "x-form-text-wrap input-login-wrap",
                    fieldCls: "input-login1",
                    width: 250,
                    height: 44,
                    labelWidth: 0,
                    listeners: {
                        "render": function(field) {
                            field.focus(true, 1);
                        }
                    }

                }, {
                    xtype: "textfield",
					cls: "input-login_password",
                    itemId: "strPassword",
                    inputType: 'password',
                    emptyText: 'PASSWORD',
                    fieldCls: "input-login1",
                    width: 250,
                    height: 44,
                    labelWidth: 0,
                    inputWrapCls: "x-form-text-wrap input-login-wrap"
                },				
				{
                xtype: "image",
                src: "simpleCaptcha.jpg",
				cls: "input-login_captchaimg",
				itemId:"captcha",
                width: 250,
                height: 44,
				},
				{
                    xtype: "textfield",
					cls: "input-login_captcha",
                    itemId: "answer", 
					id:"Cap_Ans", //sudhakar on 13March2019
                    emptyText: 'CAPTCHA',
                    fieldCls: "input-login1",
                    width: 250,
                    height: 44,
                    labelWidth: 0,
                    inputWrapCls: "x-form-text-wrap input-login-wrap"
                },
				{
                    xtype: "button",
                    itemId: "btnLogin",
                    baseCls: "login_btn",
                    text: "LOGIN",
                    width: 250,
                    height: 44
                },
				tmpSigned,	
				{
                    xtype: "button",
                    itemId: "btnApk",					
                    baseCls: "apkCls",
                    html: "<i class='fa fa-android' style='font-size:24px;padding-right: 5px;'></i><span>Get our Android App</span>",
                    width: 250,
                    height: 44
                },
				{
                    xtype: "button",
                    itemId: "btnGiveFeedback",
					//glyph:"xf067@FontAwesome",
                    baseCls: "dropthought_btn",
                    html: "<i class='fa fa-comment-o' style='font-size:24px;padding-right: 5px;'></i>Give Feedback",
                    width: 250,
                    height: 44
                },
				login_copy
            ]
        }]
        loginMainSection.add(loginControls)
		tmpMainSection.add(tmpBanner);
		tmpMainSection.add(loginMainSection);
        mainpage.ptrMainSection.setMargin(0)
        mainpage.ptrMainSection.add(tmpMainSection)

        /*
		mainpage.eventHandlers = 
			[
				{
					"controlid":"login",
					"tasktype":"btnclick",
					"input":["strUserId","strPassword"],
					"service":"LoginServices"
				}
			];
		*/

        /*
		mainpage.generateScreen();
		
		Ext.apply(this,
			{
				border:false,
				items:
				[
					mainpage
				]
			}
		);
		*/
        this.callParent(arguments);


        form_obj = this;


        form_obj.queryById("btnLogin").on("click",
            function(controlobj, eventobj) {
                form_obj.loginProcess(form_obj, controlobj, eventobj)
            }, form_obj);

        form_obj.queryById("strPassword").on("specialkey",
            function(controlobj, eventobj) {
                if (eventobj.getKey() == eventobj.ENTER) {
                    form_obj.loginProcess(form_obj, controlobj, eventobj)
                }
            }, form_obj);

        form_obj.queryById("strUserId").on("specialkey",
            function(controlobj, eventobj) {
                if (eventobj.getKey() == eventobj.ENTER) {
                    form_obj.loginProcess(form_obj, controlobj, eventobj)
                }
            }, form_obj);

		form_obj.queryById("answer").on("specialkey",
            function(controlobj, eventobj) {
                if (eventobj.getKey() == eventobj.ENTER) {
                    form_obj.loginProcess(form_obj, controlobj, eventobj)
                }
            }, form_obj);	
          form_obj.queryById("btnGiveFeedback").on("click",
            function(controlobj, eventobj) {
			loadFeedbackForm();
            }, form_obj);	
		  form_obj.queryById("btnApk").on("click",
            function(controlobj, eventobj) 
			{
                window.open("APK/CueTransPDO.apk");
            }, form_obj);
        /*
		form_obj.queryById("btnLogin").on("click",
				function(controlobj,eventobj)
				{
					form_obj.Process(form_obj,controlobj,eventobj)					
				},form_obj);	
		*/
		
		// equivalent using TaskManager
		Ext.TaskManager.start({
			run: function()
			{
				//console.log("resources/images/login/banner_0"+form_obj.bannerCount+".jpg")
				form_obj.bannerCount = (form_obj.bannerCount % 3) + 1;
				form_obj.bannerImg.setSrc("resources/images/login/banner_0"+form_obj.bannerCount+".jpg")			
			},
			interval:3000
		});
    },

    forgotProcess: function(form_obj, controlobj, eventobj) {
        url_tmp = "app/view/admin/ForgotPassword.js"
    },

    loginProcess: function(form_obj, controlobj, eventobj) {
        ser_input_array = {};
        form_obj.setLoading(true);
        ser_input_array["methodName"] = "fetchTenantId";
        ser_input_array["strUserId"] = form_obj.queryById("strUserId").getValue();
        ser_input_array["strPassword"] = form_obj.queryById("strPassword").getValue();
        ser_input_array["answer"]=form_obj.queryById("answer").getValue();
        var url_tmp = 'JMSServlet'
        if (!form_obj.liveSetupFlag) {
            if (ser_input_array["strUserId"] != "") {
                url_tmp = "app/data/admin/" + ser_input_array["strUserId"] + ".json"
            } else {
                url_tmp = "app/data/admin/" + "login.json"
            }
        }
		/*
		Ext.Ajax.on("requestcomplete", function(){
		//console.log("requestcomplete");
		console.clear();
		});
		*/
        Ext.Ajax.request({
            url: url_tmp,
            //url : 'login.json',
            params: {

                workFlowName: "CoreTenantService",
                workFlowParams: Ext.JSON.encode(ser_input_array),
				processType:"Screen"
            },
            success: function(result) {
                //console.log(result.responseText);
                console.log("success");
                var response_data = Ext.JSON.decode(result.responseText);
                //console.log(result.responseText ,"result.responseText");

                var in_json_data = Ext.JSON.decode(result.responseText);

                if (in_json_data["strFailureMsg"] != "" && in_json_data["strFailureMsg"] != undefined) {
                    Ext.Msg.alert('Failure', in_json_data["strFailureMsg"]);
                    form_obj.setLoading(false);
					form_obj.queryById("strUserId").setValue("");
					form_obj.queryById("strPassword").setValue("");
					
					form_obj.queryById("answer").setValue("");	
					form_obj.queryById("captcha").setSrc('simpleCaptcha.jpg'+"/"+new Date());
									
                    return;
                }

                if (in_json_data["strResponseMsg"] != "" && in_json_data["strResponseMsg"] != undefined) {
                    Ext.Msg.alert('Failure', in_json_data["strResponseMsg"]);
                    form_obj.setLoading(false);
                    //alert(in_json_data["strResponseMsg"]);
                    return;
                }

				Ext.TaskManager.stopAll();
				
				Ext.EventManager.on(window, 'keydown', function(e, t) 
				{
				if (e.getKey() == e.BACKSPACE && (!/^input|textarea$/i.test(t.tagName) || t.disabled || t.readOnly)) {
				//if (e.getKey() == e.BACKSPACE && (!/^input$/i.test(t.tagName) || t.disabled || t.readOnly)) {
					e.stopEvent();
				}
				});
				
				Ext.EventManager.addListener(Ext.getBody(), 'keydown', function(e){
				if(e.getTarget().type != 'text'  && e.getTarget().type != 'textarea' && e.getTarget().type != 'password' && e.getKey() == '8' ){
				//if(e.getTarget().type != 'text' && e.getKey() == '8' ){
					e.preventDefault();
				}
				}); 
				
				
				window.onbeforeunload = function (evt) 
				{		 
					  var message = 'Are you sure you want to leave?';		 
					  if (typeof evt == 'undefined') 
					  {
						evt = window.event;
					  }
					  if (evt) 
					  {
						evt.returnValue = message;
					  }
					  return message;
				}
				
                plf.setPlfDefaults();
				var pwdAttempt='N';
				var tmpDefault=null;/*Code added for Default Screen*/
                Ext.each(in_json_data["hdrcache"],
                    function(hdrcache_obj) {
                        for (var key in hdrcache_obj) {
                            var attrName = key;
                            if (key == "USER_NAME") {
                                plf.viewport.ptrNorthPanel.userNameContainer.update(hdrcache_obj);
                            }
							if (key == "ROLE_NAME") {
                                plf.viewport.ptrNorthPanel.roleContainer.update(hdrcache_obj);
                            }
							if (key == "ENTITY_NAME") {
                                plf.viewport.ptrNorthPanel.entityContainer.update(hdrcache_obj);
                            }
							if (key == "hdnAuthToken") {
                                hdnAuthToken=hdrcache_obj[key];
                            }
							if (key == "FIRST_LOGIN") {
                                pwdAttempt=hdrcache_obj[key];
                            }
							if (key == "DEFAULT_SCREEN") 
							{
                                tmpDefault=hdrcache_obj[key];
                            }
                        }
                    }
                )
				//console.log(hdnAuthToken,"hdnAuthToken_Login");
                plf.viewport.ptrSouthPanel.display()
                plf.viewport.ptrNorthPanel.display()
                    //plf.viewport.ptrWestPanel.display()


                form_obj.setLoading(false);
                form_obj.removeAll();
                plf.viewport.ptrContentPanel.removeAll();
				plf.viewport.ptrLoginNorthPanel.hide();
				plf.viewport.ptrLoginNorthPanel.removeAll();
				
                plf.viewport.ptrContentPanel = Ext.create('CueTrans.view.common.ContentPanel')
                    //plf.viewport.ptrContentPanel.setHeight(plf.screenHeight-plf.appMarginHeight)
                    //plf.viewport.ptrContentPanel.setWidth(plf.screenWidth-plf.appMargin)
                plf.viewport.ptrContentPanel.setHeight(plf.screenHeight - plf.appMarginHeight)
                plf.viewport.ptrContentPanel.setWidth(plf.screenWidth);
				if (pwdAttempt=="N")
				{
				plf.viewport.ptrContentPanel.searchScreenJS = "CueTrans.view.admin.DefaultPassword";
				plf.viewport.ptrContentPanel.loadSearchScreen();
				}
				else
				{
					if (tmpDefault!=null)
					{
						plf.viewport.ptrContentPanel.searchScreenJS = "CueTrans.view."+tmpDefault;
						plf.viewport.ptrContentPanel.loadSearchScreen();
					}
				}
                form_obj.add(plf.viewport.ptrContentPanel)


                plf.viewport.ptrEastPanel = Ext.create('CueTrans.view.common.EastPanel')
                plf.viewport.add(plf.viewport.ptrEastPanel)
                plf.viewport.ptrEastPanel.display()

				if (pwdAttempt !="N")
				{	
                homeStoreValue = in_json_data["consoleTransaction_array"]
                if (
                    Ext.data.StoreManager.containsKey("homePageStore") //load grid store
                    &&
                    homeStoreValue != "" &&
                    homeStoreValue != undefined
                ) {
                    var homePageStore = Ext.data.StoreManager.lookup("homePageStore")
                    homePageStore.clearFilter();
                    homePageStore.loadData(homeStoreValue, false);

                    var masterIconCollection = homePageStore.queryBy(function(rec) {
                        if (rec.data.entityType == 'master')
                            return true;
                    });

                    var masterIconStore = Ext.data.StoreManager.lookup("masterIconStore")
                    masterIconStore.clearFilter();
                    masterIconStore.loadData(masterIconCollection.getRange(), false);
                    /*
						masterIconStore.filterBy(function(rec){
							 if(rec.data.menuText == 'Calendar')
								 return true;
						})
						*/

                    var transIconCollection = homePageStore.queryBy(function(rec) {
                        if (rec.data.entityType == 'transaction')
                            return true;
                    });

                    var transIconStore = Ext.data.StoreManager.lookup("transIconStore")
                    transIconStore.clearFilter();
                    transIconStore.loadData(transIconCollection.getRange(), false);

                    var bpcIconCollection = homePageStore.queryBy(function(rec) {
                        if (rec.data.entityType == 'bpc')
                            return true;
                    });

                    var bpcIconStore = Ext.data.StoreManager.lookup("bpcIconStore")
                    bpcIconStore.clearFilter();
                    bpcIconStore.loadData(bpcIconCollection.getRange(), false);

                    homePageStore.filterBy(function(rec) {
                        if (rec.data.entityType != 'bpc')
                            return true;
                    });
                }
				}
            },
            failure: function(result) {
                alert("failure");
                //alert(result.responseText);
                form_obj.setLoading(false);
                // todo
            }
        });

    },
	setCookie: function(name, value, expires, path, domain, secure) 
	{
		 path="/";
		var curCookie = name + "=" + escape(value) +
		  ((expires) ? "; expires=" + expires.toGMTString() : "") +
		  ((path) ? "; path=" + path : "") +
		  ((domain) ? "; domain=" + domain : "") +
		  ((secure) ? "; secure" : "");

		  document.cookie = curCookie;
	//alert("setCookie");
	},
	getCookie: function(name) 
	{
	//alert('name');
	  var dc = document.cookie;
	  var prefix = name + "=";
	  var begin = dc.indexOf("; " + prefix);
	  if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	  } else
		begin += 2;
	  var end = document.cookie.indexOf(";", begin);
	  if (end == -1)
		end = dc.length;
	  return unescape(dc.substring(begin + prefix.length, end));
    }
});