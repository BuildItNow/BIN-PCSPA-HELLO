define(
{
	name: "BIN-PC-SPA",
	appID: "com.bin.pcspa",
	runtime: "RELEASE",
	placeholder: "bin/res/img/bpf_hash_placeholder.jpg",
	mapSDK: "2.0",
	DEBUG: 
	{
		debug: true,
		useNetLocal: true,
		server: "$HOST/",
		timeout: 20000,
		maxCacheDuration: 20000
	},
	RELEASE:
	{
		useNetLocal: true,
		server: "$HOST/",
		timeout: 20000,
		maxCacheDuration: 20000
	},
	requireConfig:
	{
		packages: 
		[],
		paths: 
		{
			hljs:"3rdParty/highlight-js/src/highlight.pack",
			mermaid:"3rdParty/mermaid-7.0.0/dist/mermaid"
		},
		shim: 
		{
		},
		urlArgs:"v=$(bpv_version)"
	},
	classConfig:
	{
		core:
		{
			Application:"application/application",
			NetManager:
			{
				_path:"bin/core/netManager",
				CallbackPolicy:"application/netCallbackPolicy",
				SendCheckPolicy:"bin/core/netPolicy/netSendCheckPolicy"	
			},
			DataCenter:"application/dataCenter",
			HUDManager:"bin/web/core/pcHudManager",	
			NavigationController:"bin/web/core/navigationController",
			Router:"bin/web/core/router"
		},
		ui:
		{
			View:"bin/core/view",
			DialogView: "bin/web/common/pcDialogView"
		},
		other:
		{
			bootstrap:"bootstrap"
		}
	},
	packages:
	[
		"bin/bpf_hash_3party-pc-core.bundle.js",
		"bin/bpf_hash_bin-pc-core.bundle.js",
	]
});
