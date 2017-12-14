define(
["common/client"], 
function(Client)
{
	var Super = bin.ui.View;
	var Class = {};

    Class.vmData = 
    {
        current: "index"
    }

	Class.posGenHTML = function()
	{

	}

    Class.onRoute = function(oldMatch, match, path)
    {
        if(!path)
        {
            this.vm.current = "index";
        }
        else
        {
            this.vm.current = "post";
        }
    }

    Class.vmMethod_signout = function()
    {
        bin.hudManager.confirm("Sure to sign out ?", function()
        {
            Client.signout().then(function()
            {
                bin.router.push("");
            });
        });
    }

    Class.vmMethod_changePassword = function()
    {
        bin.hudManager.dialog("view!about/changePassword", 
        {
            onSubmit: function()
            {
                bin.hudManager.showStatus("Change password succeed");
            }
        });
    }

    Class.vmMethod_showStatus = function()
    {
        bin.hudManager.showStatus("This is a status tips");
    }

    Class.vmMethod_showIndicator = function()
    {
        var i = bin.hudManager.startIndicator();

        setTimeout(function()
        {
            bin.hudManager.stopIndicator(i);
        }, 1000);
    }

    Class.vmMethod_showAlert = function()
    {
        bin.hudManager.alert({
            message: 
            {
                text: "This is a alert tips"
            },
            title:
            {
                text: "Alert title"
            },
            buttons:
            [
                {text: "Yes", onClick: function(view)
                {
                    bin.hudManager.showStatus("Yes choosed");
                }},
                {text: "No", onClick: function(view)
                {
                    bin.hudManager.showStatus("No choosed");
                }}
            ]
        });
    }

	return Super.extend(Class);
});