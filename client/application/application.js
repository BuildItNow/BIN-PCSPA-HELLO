define(
["bin/web/core/webApplication", "application/dataCenter"],
function(Base, DataCenter)
{
	var Application = {};

	Application.onResize = function()
	{
		Base.prototype.onResize.call(this);

		var w = this._width;
		if(w <= 420)
		{
			return ;
		}
		this._width = 420;
		document.documentElement.style.fontSize = "26px";
	}

	return Base.extend(Application);
});
