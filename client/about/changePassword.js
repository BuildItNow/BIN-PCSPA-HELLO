/*
 * bitnow-cli auto generate
 */

define(
["common/client"], 
function(Client)
{
	var Super = bin.ui.DialogView;
	var Class = {};

    Class.vmData = 
    {
        oldPassword: "",
        newPassword: "",
        cfrPassword: ""
    }

	Class.vmMethod_submit = function()
	{
        if(!this.vm.oldPassword)
        {
            bin.hudManager.showStatus("Please input the old password");

            return ;
        }

        if(!this.vm.newPassword)
        {
            bin.hudManager.showStatus("Please input the new password");

            return ;
        }

        if(this.vm.cfrPassword !== this.vm.newPassword)
        {
            bin.hudManager.showStatus("The confirm password is different with new password");

            return ;
        }

        if(this.vm.newPassword === this.vm.oldPassword)
        {
            bin.hudManager.showStatus("The new password is same with old password");

            return ;
        }

        var self = this;
        Client.changePassword(this.vm.oldPassword, this.vm.newPassword).then(function(netData)
        {
            Super.prototype.vmMethod_submit.call(self);
        });
	}

	return Super.extend(Class);
});