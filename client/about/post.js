/*
 * bitnow-cli auto generate
 */

define(
[
"about/client",
"css!3rdParty/markdown-css/assets/css/markdown.css?v=$(bpv_version)",
"css!3rdParty/markdown-css/assets/css/github/github.css?v=$(bpv_version)",
"css!3rdParty/highlight-js/src/styles/github.css?v=$(bpv_version)",
"css!3rdParty/mermaid-7.0.0/dist/mermaid.forest.css?v=$(bpv_version)"
], 
function(Client)
{
    var hmPromise = Promise.all([
        new Promise(function(res, rej)
        {   
            require(["mermaid"], function()
            {
                mermaidAPI.initialize({startOnLoad:false});

                res();
            }, function()
            {
                res();
            });
        }),
        new Promise(function(res, rej)
        {
            require(["hljs"], function()
            {
                res();
            }, function()
            {
                res();
            });
        })
    ]);

    var Super = bin.ui.View;
    var Class = {};

    var cid = 1;
    var genCatalogID = function()
    {
        return "__catalog"+(cid++);
    }

    Class.vmData = 
    {
        post:
        {
            title: "",
            content: "",
        },
        contentReady: false,
        catalogs:
        [
        ],
        currentCatalog:"",
        currentSubCatalog:"",
    };

    Class.posGenHTML = function()
    {
        var self = this;
        var scrollTrying = false;
        this._onWindowScroll = function()
        {
            if(scrollTrying)
            {
                return ;
            }
                
            scrollTrying = true;
            setTimeout(function()
            {
                scrollTrying = false;

                self.onScroll();
            }, 300);
        }

        window.onscroll = this._onWindowScroll;
    }

    Class.onRemove = function()
    {
        window.onscroll = null;

        this._catalogEls = null;
    }

    Class.onRoute = function(oldMatch, match, id)
    {
        if(!match)
        {
            return ;
        }

        this.loadPost(id);
    }

    Class.loadPost = function(id)
    {
        var self = this;
        Client.getPost(id).then(function(netData)
        {   
            if(netData.code == 0)
            {
                self.vm.contentReady = false;

                netData.data.id = id;
                self.vm.post = netData.data;
            }
            else
            {
                return Promise.reject();
            }
        }).then(function()
        {   
            var p = Client.getPostContent(self.vm.post.content).then(function(content)
            {
                self.$("#postContent").html(content);
                self.vm.contentReady = true;

                window.scrollTo(0, 0);

                setTimeout(function()
                {
                    self.processCatalogs();
                    self.processCodeElements();
                });
            });

            return p;
        });
    }

    Class.processCatalogs = function()
    {
        var rootElem = this.$("#postContent");
        var catalogs = [];

        var catalog = null;
        var subCatalogs = null;

        var catalogElems = this._catalogElems = [];
        var catalogEls = rootElem.find("h2[id],h3[id]");

        catalogEls.each(function(i, el)
        {   
            catalogElems.push($(el));

            el.id = genCatalogID();
            if(el.tagName.toUpperCase() === "H2")
            {
                if(catalog)
                {
                    if(subCatalogs.length > 0)
                    {
                        catalog.catalogs = subCatalogs;
                    }

                    catalogs.push(catalog);
                }

                catalog = {id:el.id, title:el.innerText||el.textContent};
                subCatalogs = [];
            }
            else 
            {
                subCatalogs.push({id:el.id, title:el.innerText||el.textContent});
            }
        });

        if(catalog)
        {
            if(subCatalogs.length > 0)
            {
                catalog.catalogs = subCatalogs;
            }

            catalogs.push(catalog);
        }

        this.vm.catalogs = catalogs; 

        this.onScroll();
    }

    Class.processCodeElements = function()
    {
        var self = this;

        hmPromise.then(function()
        {
            self.$("pre code", "#postContent").each(function(i, elem) 
            {
                if(elem.className.indexOf("mermaid") >= 0)
                {
                    var id = "graphDiv"+_.now();
                    var insertSvg = function(svgCode, bindFunctions)
                    {
                        elem.innerHTML = svgCode;

                        $("#d"+id).remove();
                    };
                    mermaidAPI && mermaidAPI.render(id, _.unescape(elem.innerHTML), insertSvg);
                    return ;
                }

                hljs && hljs.highlightBlock(elem);
            });
        });
    }

    Class.vmMethod_gotoCatalog = function(id, sid)
    {
        var elem = this.$("#"+(sid ? sid : id));
        window.scrollTo(0, elem.offset().top-110);
    }

    Class.onScroll = function()
    {
        if(!this._catalogElems)
        {
            return ;
        }

        var y = window.scrollY+110;

        var i = 0;
        var i_sz = this._catalogElems.length;
        if(i_sz === 0)
        {
            return ;
        }

        var elem = null;
        var el   = null;
        for(; i<i_sz; ++i)
        {
            elem = this._catalogElems[i];
            if(elem.offset().top >= y)
            {
                break;
            }
        }
            
        el = elem[0];
        if(el.tagName.toUpperCase() === "H2")
        {
            this.vm.currentCatalog = el.id;
            this.vm.currentSubCatalog = "";
        }
        else
        {
            this.vm.currentSubCatalog = el.id;

            for(i=i-1; i>=0; --i)
            {
                elem = this._catalogElems[i];
                if(elem[0].tagName.toUpperCase() === "H2")
                {
                    break;
                }
            }

            if(i>=0)
            {
                this.vm.currentCatalog = elem[0].id;
            }
        }
    }

    return Super.extend(Class);
});