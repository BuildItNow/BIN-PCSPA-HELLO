/*
 * bitnow-cli auto generate
 */

define(
[], 
function()
{
	var Super = bin.ui.View;
	var Class = {};

	Class.posGenHTML = function()
	{
	}

    Class.onRoute = function(oldMatch, match)
    {
        if(!match)
        {
            return ;
        }

        window.scrollTo(0, 0);
    }

	return Super.extend(Class);
});