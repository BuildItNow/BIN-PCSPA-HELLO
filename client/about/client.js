define(
[], 
function()
{
    var Class = {};

    Class.getPost = function(id)
    {
        return bin.netManager.doAPIEx({
            api: "api/public/getPost", 
            data: {id:id},
            options: {handleFailed:true}
        });
    }

    Class.getPostContent = function(content)
    {
        var p = new Promise(function(res, rej)
        {
            if(!content.endsWith(".html"))
            {
                content += ".html";
            }
            require(["text!"+content], function(content)
            {
                res(content);
            }, function()
            {
                res("Load post content fial.");
            });
        });

        return p;
    }
    return Class;
});