/*
infobar.js v1.6
IE Detection Script simulating an IE Information Bar with Messages based on Visitor's Web Browser.
Developed by aixsoft Software- & Online-Services Mathias Schiffer (Schiffer@mvps.org) for MSDN Online Germany.
Do not copy, reproduce, (re-)distribute, change or publish without written consent.
Feedback: pingme@microsoft.com
Copyright 2010-2011 Microsoft Corporation. Alle Rechte vorbehalten.
Optimized 2011 by cubetech.ch. Ebenfalls alle Rechte vorbehalten.
*/

displayNotification();

/*@cc_on
	 @if (@_jscript_version <= 5.6 && @_jscript_version >= 3.0)
		window.onscroll = legacySetBar;
		window.onresize = legacySetBar;
	 /*@end
@*/	


function legacySetBar(bar)
{

	if (!bar)
	{
		bar = document.getElementById('ieInfoBar'); 
	}

	if (bar)
	{ 
		if (document.documentElement && document.documentElement.clientWidth)
		{
	        bar.style.width = document.documentElement.clientWidth;
	    }
		else if (document.body && document.body.clientWidth)
		{
    		bar.style.width = document.body.clientWidth;
		}


		if (document.documentElement && document.documentElement.scrollTop)
		{
	        bar.style.top = document.documentElement.scrollTop;
	    }
		else if (document.body && document.body.scrollTop)
		{
    		bar.style.top = document.body.scrollTop;
		}

	};

};


function getIeVersion()
{

	var ieVersion = null;

	/*@cc_on
		 @if   (@_jscript_version == 9.0)  ieVersion = 9;
		 @elif (@_jscript_version == 5.8)  ieVersion = 8;
		 @elif (@_jscript_version == 5.7)  ieVersion = 7;
		 @elif (@_jscript_version == 5.6)  ieVersion = 6;
		 @elif (@_jscript_version == 5.5)  ieVersion = 5.5;
		 @elif (@_jscript_version == 5.0)  ieVersion = 5;
		 @elif (@_jscript_version == 5.01) ieVersion = 5;
		 @elif (@_jscript_version == 3.0)  ieVersion = 4;
		 @elif (@_jscript_version == 1.0)  ieVersion = 3;
		 @else @*/                     //  ieVersion = null;
	   /*@end
	@*/

	if (ieVersion == 7 && !window.XMLHttpRequest)
	{
		ieVersion = 6;
	}

	return ieVersion;
	
}


function getLanguage()
{
    var l_lang;
    if (navigator.userLanguage)
        l_lang = navigator.userLanguage;
    else if (navigator.language)
        l_lang = navigator.language;
    else
        l_lang = "en";

    return l_lang;

}

function displayNotification() 
{
	
	var ieVersion = getIeVersion();
	var isXP = (navigator.userAgent.indexOf('Windows NT 5.1') > -1);

	var evalmode = false;
	if (evalmode)
	{
		switch (queryStringParameterValue('os').toLowerCase())
		{
			case 'xp':    isXP = true;  break;
			case 'notxp': isXP = false;  break;
			default:      break;
		}
		
		switch (queryStringParameterValue('test'))
		{
			case '9': ieVersion = 9; break;
			case '8': ieVersion = 8; break;
			case '7': ieVersion = 7; break;
			case '6': ieVersion = 6; break;
			case '5': ieVersion = 5; break;
			case '4': ieVersion = 4; break;
			case '3': ieVersion = 3; break;
			default:  break;
		}
	}

	var u = navigator.userAgent; 
	var isIEMobile = (    u.indexOf("IEMobile") > -1   
					   || u.indexOf("ZuneWP7") > -1
					   || u.indexOf("Windows CE") > -1
					   || u.indexOf("WM5 PIE") > -1
					 ); 
	var isIE = (ieVersion && !isIEMobile)
    var thislang = getLanguage();
    
    var mainMessage = new Array();
    mainMessage["de"] = 'Installieren Sie jetzt den kostenlosen <a href="http://www.google.com/chrome" target="_blank" title="Google Chrome - Der schnelle, kostenlose Browser"><strong>Google Chrome</strong></a> oder den <a href="http://go.microsoft.com/?linkid=9742840" target="_blank">Internet Explorer&nbsp;10</a>! Mit einem modernen Browser wird das Internet schneller, einfacher und ansprechender.';
    mainMessage["en"] = 'Install now the free <a href="http://www.google.com/chrome" target="_blank" title="Google Chrome - The fast, free browser"><strong>Google Chrome</strong></a> or the <a href="http://go.microsoft.com/?linkid=9742840" target="_blank">Internet&nbsp;Explorer&nbsp;10</a>! With a modern browser the internet becomes more speed and it\'s simpler and better for using.';
    
    var warnMessage = new Array();
    warnMessage["de"] = '<font color="red"><strong>Warnung:</strong></font> Mit Ihrer alten Version vom Internet Explorer gehen Sie unn&ouml;tige Risiken ein!';
    warnMessage["en"] = '<font color="red"><strong>Warning:</strong></font> With your old version of the Internet Explorer you are taking unnecessary risks!';
    
    var additionalMessage = new Array();
    additionalMessage["de"] = '';
    additionalMessage["en"] = '';
    
    if(thislang.search('de') > -1)
    {
        var shortMessage = mainMessage["de"] + ' ' + additionalMessage["de"];
        var longMessage = warnMessage["de"] + ' ' + mainMessage["de"] + ' ' + additionalMessage["de"];
    } else {
        var shortMessage = mainMessage["en"] + ' ' + additionalMessage["en"];
        var longMessage = warnMessage["en"] + ' ' + mainMessage["en"] + ' ' + additionalMessage["en"];
    }
        
	if (!isIE)
	{	
		return;
	}		

	if (document.cookie.indexOf('notificationdisplayed=true') == -1 || queryStringParameterValue('shownotificationbar') == 'always')
	{
	
		if (ieVersion == 8)
		{
			if (!isXP)
			{
			    var notificationBar = new ieInfoBar({message: shortMessage, icon: iedetect.url + '/alert.gif'});
				notificationBar.show(50);
				createDocumentCookie('notificationdisplayed', 'true', 3 * 24);		
			}
		}
								
		if (ieVersion <= 7 && ieVersion >= 4)
		{

			if (!isXP)
			{
			    var notificationBar = new ieInfoBar({message: longMessage, icon: iedetect.url + '/alert.gif'});
				notificationBar.show(50);
				createDocumentCookie('notificationdisplayed', 'true', 6);
			}
			else
			{
                var notificationBar = new ieInfoBar({message: longMessage, icon: iedetect.url + '/alert.gif'});
				notificationBar.show(50);
				createDocumentCookie('notificationdisplayed', 'true', 6);
			}
		}

	}
	
}


function createDocumentCookie(name, value, hours)
{

	if (hours)
	{
		var date = new Date();
		date.setTime(date.getTime() + hours * 60 * 60 * 1000);
		var expires = '; expires=' + date.toGMTString();
	}
	else
	{
		var expires = '';
	}
//	document.cookie = name + '=' + value + expires + '; path=/';
	
}


function queryStringParameterValue(parameterName)
{

	var retVal = '';
	var hRef = window.location.href;

	if (hRef.indexOf('?') > -1)
	{
		var queryString = hRef.substr(hRef.indexOf('?')).toLowerCase();
		var queryStringArray = queryString.split('&');
		for (var i = 0; i < queryStringArray.length; i++)
		{
			if (queryStringArray[i].indexOf(parameterName + '=') > -1)
			{
				var aParam = queryStringArray[i].split('=');
				retVal = aParam[1];
				break;
			}
		}
	}

	return retVal;
	
}

		
function ieInfoBar(params)
{

	var ieVersion = getIeVersion();

	if (!document.createElement || !ieVersion)
	{
		return;
	}

	if(!params)
	{
		params = {};
	}

	var infoBarTag = document.createElement('div');
	infoBarTag.id = 'ieInfoBar';
	infoBarTag.style.cssText ='position: absolute; padding-top: 3px; padding-bottom: 3px; display: block; z-Index: 50000; left: 0; right: 0; border-bottom: 1px black groove; width:100%;';
	infoBarTag.style.backgroundColor = params.backColor || '#ffffe1';
	infoBarTag.style.fontColor = params.foreColor || '#000000';
	if (ieVersion <= 6 && ieVersion >= 4)
	{
		if (document.documentElement && document.documentElement.clientWidth)
		{
	        infoBarTag.style.width = document.documentElement.clientWidth;
	    }
		else if (document.body && document.body.clientWidth)
		{
	       	infoBarTag.style.width = document.body.clientWidth;
	   	}
	};

	var iconTag = document.createElement('img');
	iconTag.style.cssText = 'width: 14px; height: 16px; float: left; border: 0px; margin-right: 5px; margin-left: 7px;';
	iconTag.src = params.icon || iedetect.url + '/alert.gif'; 

	var textTag = document.createElement('div');
	textTag.innerHTML = params.message || '';
	textTag.style.cssText ='text-align:left; padding-left: 26px; padding-right: 24px; font-family: Verdana, sans-serif; font-size: small; cursor: default;';
	
	var closeTag = document.createElement('img');
	closeTag.style.cssText = 'width: 18px; height: 18px; float: right; border: 0px; margin-right: 7px; cursor: default;';
	closeTag.src = iedetect.url + '/x.gif';
	closeTag.onclick = function()
	{
		infoBarTag.style.display = 'none';
	};
	
	infoBarTag.appendChild(closeTag);
	infoBarTag.appendChild(iconTag);
	infoBarTag.appendChild(textTag);

	this.InfoBar = infoBarTag;
	document.body.insertBefore(infoBarTag, document.body.firstChild);
	infoBarTag.style.top = document.body.scrollTop - parseInt(this.InfoBar.offsetHeight) + 'px';
	
	this.show = function(speed)
	{
		var me=this;
		if (parseInt(this.InfoBar.style.top) < 0)
		{
			infoBarTag.style.top = parseInt(infoBarTag.style.top) + 2 + 'px';
			setTimeout(function(){me.show(speed)}, speed || 50);
		}
		else
		{
			if (ieVersion <= 6 && ieVersion >= 4)
			{
				this.InfoBar.style.top = (document.compatMode == 'CSS1Compat') ? document.documentElement.scrollTop + 'px' : body.scrollTop + 'px';
			}
			else
			{
				this.InfoBar.style.top = 0;
				if (document.compatMode != 'BackCompat')
				{
					this.InfoBar.style.position = "fixed";
				}
			}

		}
		
	}

}
