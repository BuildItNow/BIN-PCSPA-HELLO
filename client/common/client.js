define(
["md5"], 
function(md5)
{
    var Class = {};

    Class.signin = function(username, password)
    {
        password = md5.hex_md5(password);

        return bin.netManager.doAPIEx({
            api: "api/public/signin",
            data: {username:username, password:password},
            type: "POST"
        });
    }

    Class.signout = function()
    {
        return bin.netManager.doAPIEx({
            api: "api/public/signout",
            type: "POST"
        });
    }

    Class.changePassword = function(oldPassword, newPassword)
    {
        return bin.netManager.doAPIEx({
            api: "api/public/changePassword",
            data:{old:oldPassword, new:newPassword},
            type: "POST"
        });
    }

    return Class;
});