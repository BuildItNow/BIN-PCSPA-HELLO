define(
[], 
function()
{
    var Class = {};

    Class.getHots = function()
    {
        return bin.netManager.doAPIEx({
            api: "api/public/getHots"
        })
    }

    return Class;
});