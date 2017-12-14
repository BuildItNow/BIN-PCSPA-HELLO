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
        minHeight:"",
        heightWithoutFooter:""
    }

	Class.posGenHTML = function()
	{
        var self = this;

        var height = bin.app.height();
        // Header 80px
        // Footer 60px
        this.vm.minHeight = (height-80-60)+"px";

        this._sidebarWrappers = [];
        
        bin.vmDirective("fixedsidebar", 
        {
            bind: function()
            {
                var elem = $(this.el);

                this._unlink = self.fixedSidebar(elem);
            },
            unbind: function()
            {
                if(this._unlink)
                {
                    this._unlink();
                    this._unlink = null;
                }
            }
        });

        Backbone.on("DISPLAY_METRICS_CHANGED", function()
        {
            self.onDisplayMetricsChanged();
        });
	}

    Class.asyncPosGenHTML = function()
    {
        this.onDisplayMetricsChanged();
    }

    Class.onDisplayMetricsChanged = function()
    {
        var height = bin.app.height();

        // Header 80px
        // Footer 60px
        this.vm.minHeight = (height-80-60)+"px";

        var offset = this.$().offset();
        var left   = (offset.left+20)+"px";
        this._sidebarWrappers.forEach(function(elem)
        {
            elem.css("left", left);
        });
        this._sidebarWrapperLeft = left;
    }

    Class.height = function()
    {
        return bin.app.height()-80-60;
    }

    Class.heightWithoutFooter = function()
    {
        return this.height()-60;
    }

    Class.fixedSidebar = function(elem)
    {
        if(elem.__link_sidebar)
        {
            return ;
        }

        elem.__link_sidebar = true;

        var wrapperElem = $("<div class='fixed-side-bar-wrapper'></div>");
        wrapperElem.css("left", this._sidebarWrapperLeft);

        wrapperElem.insertBefore(elem);

        var oldPosition = elem.css("position");
        elem.css("position", "static");
        wrapperElem.append(elem);

        this._sidebarWrappers.push(wrapperElem);

        var self = this;
        return function()
        {
            elem.css("position", oldPosition);
            elem.insertBefore(wrapperElem);
            wrapperElem.remove();

            var i = self._sidebarWrappers.indexOf(wrapperElem);
            self._sidebarWrappers.splice(i, 1);

            elem.__link_sidebar = false;
        }
    }

	return Super.extend(Class);
});