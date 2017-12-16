var config = 
{
	mainConfigFile : "bin/web/bpf_hash_requireMain.js",
	bundles :
	{
		// 3party library part
		"3party-web-core":
		{
			include:
			[
				"vue", 
				"css", 
				"domReady", 
				"text", 
				"lsloader", 
				"lzstring", 
				"jquery", 
				"underscore", 
				"backbone"
			],
			exclude:[],
			//out:"",
		},
		
		"3party-web-md5":
		{
			include:["md5"],
			exclude:["#3party-web-core"],
			//out:"",
		},
		"3party-mobile-core":
		{
			include:["#3party-web-core", "fastclick", "iscroll"],
			exclude:[],
			//out:"",
		},
		"3party-mobile-iscroll":
		{
			include:["iscroll"],
			exclude:["#3party-mobile-core"],
			//out:"",
		},
		"3party-mobile-swiper":
		{
			include:["swiper"],
			exclude:["#3party-mobile-core"],
			//out:"",
		},
		"3party-mobile-hammer":
		{
			include:["hammer"],
			exclude:["#3party-mobile-core"],
			//out:"",
		},
		"3party-pc-core":
		{
			include:["#3party-web-core", "bootstrap"],
			exclude:[],
			//out:"",
		},
		// BIN framework part
		"bin-web-core":
		{
			include:
			[
				"view", 
				"html",
			    "map",
				"bin/core/application", 
				"bin/web/core/webApplication", 
    			"bin/web/core/main",
    			"bin/core/route",
    			"bin/core/router",
    			"bin/web/core/navigationController",
    			"bin/core/classHierarchyLoader",
    			"bin/core/netManager",    
    			"bin/core/dataCenter",    
    			"bin/core/view",     
    			"bin/core/netPolicy/netCallbackPolicy",       
    			"bin/core/netPolicy/netSendCheckPolicy",    
    			"bin/common/lazyLoadView",	
    			"bin/core/util"
    		],
			exclude:["#3party-web-core"],
			//out:"",
		},
		"bin-mobile-core":
		{
			include:
			[
				"#bin-web-core", 
				"bin/web/core/mpaApplication", 
	    		"bin/core/pageView",
	    		"bin/core/naviPageView",
	    		"bin/core/hudManager",
				"bin/common/hudView",
			    "bin/common/alertView",
			    "text!bin/common/alertView.html",
			    "css!bin/common/alertView.css",
			    "bin/common/selectView",
			    "text!bin/common/selectView.html",
			    "css!bin/common/selectView.css",
			    "bin/common/dataProvider",
			    "bin/common/datePickerView",
			    "text!bin/common/datePickerView.html",
			    "css!bin/common/datePickerView.css",
			    "bin/common/indicatorView",
			    "text!bin/common/indicatorView.html",
			    "css!bin/common/indicatorView.css",
			    "bin/common/statusView",
				"text!bin/common/statusView.html",
				"css!bin/common/statusView.css",
				"text!bin/res/html/defaultNaviBar.html"
			],
			exclude:["#3party-mobile-core"],
			//out:"",
		},
		"bin-pc-core":
		{
			include:
			[
				"#bin-web-core", 
				"bin/web/core/pcHudManager",
				"bin/web/common/pcAlertView",
				"text!bin/web/common/pcAlertView.html",
				"bin/web/common/pcStatusView",
				"text!bin/web/common/pcStatusView.html",
				"bin/web/common/pcIndicatorView",
				"text!bin/web/common/pcIndicatorView.html",
				"bin/web/common/pcDialogView",
				"bin/web/common/pcStubView"
			],
			exclude:["#3party-pc-core"],
			//out:"",
		},
		"bin-mobile-listview":
		{
			include:
			[
				"#bin-mobile-refreshview", 
				"bin/common/itemProvider",
		        "bin/common/dataProvider",
		        "bin/common/refreshFooterView",
		        "text!bin/common/refreshFooterView.html",
		        "bin/common/listView"
		    ],
			exclude:["#bin-mobile-core"],
			//out:"",
		},
		"bin-mobile-refreshview":
		{
			include:
			[
				"bin/common/refreshHeaderView",
		        "text!bin/common/refreshHeaderView.html",
		        "bin/common/refreshView"
		    ],
			exclude:["#bin-mobile-core"],
			//out:"",
		},
		"bin-mobile-scrollview":
		{
			include:["bin/common/scrollView"],
			exclude:["#bin-mobile-core"],
			//out:"",
		},
		"bin-mobile-swipeview":
		{
			include:["#3party-mobile-swiper", "bin/common/swipeView"],
			exclude:["#bin-mobile-core"],
			//out:"",
		},
		"bin-mobile-tabview":
		{
			include:["#bin-mobile-swipeview", "bin/common/tabBarView", "bin/common/tabView"],
			exclude:["#bin-mobile-core"],
			//out:"",
		}
	}
}

module.exports = config;
