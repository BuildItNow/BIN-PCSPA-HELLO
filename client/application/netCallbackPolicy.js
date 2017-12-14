define(["bin/core/netPolicy/netCallbackPolicy"], function(Base)
{
    var Class = {};

    Class.before = function(params) 
    {
        return Base.prototype.before.call(this, params);
    }

    Class.success = function(data, textStatus, xhr, netParams)
    {
        if(data.code == 401)
        {
            this.onUnAuthorized();
            return ;
        }

        if(data.code != 0 && !netParams.options.handleFailed)
        {
            bin.hudManager.showStatus(data.msg);
        }
        else
        {
            return Base.prototype.success.call(this, data, textStatus, xhr, netParams);
        }
        
    }

    Class.error = function(xhr, textStatus, netParams)
    {
        if(textStatus == 401)
        {
            this.onUnAuthorized();
            return ;
        }

        return Base.prototype.error.call(this, xhr, textStatus, netParams);
    }

    Class.onUnAuthorized = function()
    {
        bin.hudManager.confirm("You are not authorized to this operation, do you want to sign in ?", function()
        {
            bin.router.push("signin", {path:bin.router.getRoutePath(), query:bin.router.getRouteQueryParams()});
        }); 
    }

    return Base.extend(Class);
});