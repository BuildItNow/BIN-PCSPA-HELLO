/*
 * bitnow-cli auto generate
 */

define(
["work/client"], 
function(Client)
{
	var Super = bin.ui.View;
	var Class = {};

    Class.vmData = 
    {
        hots:[]
    }

	Class.posGenHTML = function()
	{
	}

    Class.onRoute = function(oldMatch, match)
    {
        if(!match)
        {
            return ;
        }

        var self = this;
        Client.getHots().then(function(netData)
        {
            self.vm.hots = netData.data;

            window.scrollTo(0, 0);
        });
    }

    Class.vmMethod_gotoHotLocate = function(data)
    {
        var data = _.pick(data, "name", "addr", "locate");
        bin.router.push("locate", data);
    }

	return Super.extend(Class);
});