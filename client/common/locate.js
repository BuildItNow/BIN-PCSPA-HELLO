/*
 * bitnow-cli auto generate
 */

define(
[], 
function()
{
	var Super = bin.ui.View;
	var Class = {};

    Class.vmData = 
    {
        title: "- -"
    }

    Class.posGenHTML = function()
    {
        var self = this;
        var p = new Promise(function(res, rej)
        {
            bin.mapManager.require(function(error)
            {   
                if(error)
                {
                    rej(error);
                    return ;
                }

                self._map = new BMap.Map("mapContainer");

                res();
            });
        });

        this._mapPromise = p;
    }

    Class.onRemove = function()
    {
        if(this._map)
        {
            delete this._map;
        }

        delete this._mapPromise;
    }

	Class.onRoute = function(oldMatch, match)
    {
        if(!match)
        {
            return ;
        }

        window.scrollTo(0, 0);

        var self = this;
        this._mapPromise.then(function()
        {
            var data = bin.router.getRouteQueryParams();

            var lat = 106.558721;
            var lng = 29.569247;

            var lvl = 12;

            if(data && data.locate)
            {
                lat = data.locate.lat;
                lng = data.locate.lng;
                lvl = 14;
            }

            if(data && data.name)
            {
                self.vm.title = data.addr+" "+data.name;
            }
            else
            {
                self.vm.title = "重庆";
            }

            self._map.centerAndZoom(new BMap.Point(lat, lng), lvl);
        }).catch(function(error)
        {
            bin.hudManager.showStatus("Load map failed");
        });
    }

	return Super.extend(Class);
});