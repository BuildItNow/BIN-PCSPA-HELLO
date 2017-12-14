/*
 * bitnow-cli auto generate
 */

define(
["common/client"], 
function(Client)
{
	var Super = bin.ui.View;
	var Class = {};

    Class.vmData =
    {
        username: "",
        password: "",
        rember: false
    }

	Class.posGenHTML = function()
	{
        if(bin.dataCenter.getGlobalValue("rember"))
        {
            this.vm.rember = true;
            this.vm.username = bin.dataCenter.getGlobalValue("username");
        }
	}

    Class.vmMethod_signin = function()
    {
        if(!this.vm.username)
        {
            bin.hudManager.showStatus("Please input your username");

            return ;
        }

        if(!this.vm.password)
        {
            bin.hudManager.showStatus("Please input your password");

            return ;
        }

        var self = this;
        Client.signin(this.vm.username, this.vm.password).then(function(netData)
        {
            if(self.vm.rember)
            {
                bin.dataCenter.setGlobalValue("rember", true);
                bin.dataCenter.setGlobalValue("username", self.vm.username);
            }

            var params = bin.router.getRouteQueryParams();
            if(params && params.path)
            {
                bin.router.push(params.path, params.query);
            }
            else
            {
                bin.router.push("work");
            }
        });
    }

	return Super.extend(Class);
});