var SC=SC||{BUNDLE_INFO:{},LAZY_INSTANTIATION:{}};SC._detectBrowser=function(c,f){if(c===undefined){c=navigator.userAgent
}if(f===undefined){f=navigator.language||navigator.browserLanguage}var e=c.toLowerCase(),a=(e.match(/.*(?:rv|chrome|webkit|opera|ie)[\/: ](.+?)([ \);]|$)/)||[])[1],d=(e.match(/webkit\/(.+?) /)||[])[1];
var b={version:a,safari:/webkit/.test(e)?d:0,opera:/opera/.test(e)?a:0,msie:/msie/.test(e)&&!/opera/.test(e)?a:0,mozilla:/mozilla/.test(e)&&!/(compatible|webkit)/.test(e)?a:0,mobileSafari:/apple.*mobile.*safari/.test(e)?a:0,chrome:/chrome/.test(e)?a:0,windows:!!/windows/.test(e),mac:!!/macintosh/.test(e)||(/mac os x/.test(e)&&!/like mac os x/.test(e)),language:f.split("-",1)[0]};
b.current=b.msie?"msie":b.mozilla?"mozilla":b.chrome?"chrome":b.safari?"safari":b.opera?"opera":"unknown";
return b};SC.browser=SC._detectBrowser();SC.bundleDidLoad=function(a){var b=this.BUNDLE_INFO[a];
if(!b){b=this.BUNDLE_INFO[a]={}}b.loaded=true};SC.bundleIsLoaded=function(a){var b=this.BUNDLE_INFO[a];
return b?!!b.loaded:false};SC.loadBundle=function(){throw"SC.loadBundle(): SproutCore is not loaded."
};SC.setupBodyClassNames=function(){var e=document.body;if(!e){return}var c,a,f,b,g,d;
c=SC.browser.current;a=SC.browser.windows?"windows":SC.browser.mac?"mac":"other-platform";
d=document.documentElement.style;f=(d.MozBoxShadow!==undefined)||(d.webkitBoxShadow!==undefined)||(d.oBoxShadow!==undefined)||(d.boxShadow!==undefined);
b=(d.MozBorderRadius!==undefined)||(d.webkitBorderRadius!==undefined)||(d.oBorderRadius!==undefined)||(d.borderRadius!==undefined);
g=e.className?e.className.split(" "):[];if(f){g.push("box-shadow")}if(b){g.push("border-rad")
}g.push(c);if(c==="chrome"){g.push("safari")}g.push(a);if(parseInt(SC.browser.msie,0)==7){g.push("ie7")
}if(SC.browser.mobileSafari){g.push("mobile-safari")}if("createTouch" in document){g.push("touch")
}e.className=g.join(" ")};if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/bootstrap")
};