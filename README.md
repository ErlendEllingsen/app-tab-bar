<img src="https://i.imgur.com/CLUH1Ws.png" style="width: 430px;" alt="app-tab-bar logo">


<div style="display: inline-block;">
<iframe src="https://ghbtns.com/github-btn.html?user=erlendellingsen&repo=app-tab-bar&type=star&count=true" frameborder="0" scrolling="0" width="140px" height="20px"></iframe>
</div>

<div style="display: inline-block;">
<iframe src="https://ghbtns.com/github-btn.html?user=erlendellingsen&type=follow&count=true" frameborder="0" scrolling="0" width="190px" height="20px"></iframe>
</div>



#app-tab-bar
A tab-bar system in HTML/JS for hybrid apps / web apps. Creates beautiful tabs in Bootstrap-style. Designed to work with Phonegap/Cordova. Created as a multi-platform-purpose system. 

##Installation 
###Bower (Recommended)
//TODO

###Direct
1. Download `tabbar.js` and `tabbar.css` and reference them in your document.
2. Make sure the *dependencies* are installed (see below).

###Dependencies
Dependencies are automatically installed when using [bower](https://bower.io/). 

* Bootstrap
* jQuery
* Font Awesome

##Usage
🌴 This is a quick usage guide. Read the [usage wiki page](https://github.com/ErlendEllingsen/app-tab-bar/wiki/Usage) for all methods, options and alternatives. 🌴

**HTML**

Add an empty div to your code with a specified id. Example:

```html
<div id="tab_bar"></div>
```

**Javascript**

Add your own tabbar-code to your javascript. Initialize the tabbar object and select the HTML-object you added. Add tabs and then finally render.

```javascript
//Initialize the tabbar
var tabbar = new AppTabBar.Tabbar('tab_bar');
tabbar.init();

//Add tabs
var tab_home = tabbar.addTab('Home', 'fa-home', {
	events: {
		selected: function(){
			alert('Home selected!');
		}
	}
});

var tab_pages = tabbar.addTab('Pages', 'fa-home');
	
//Render the tabbar.
tabbar.render();

//Set "home" as active.
tabbar.setActive(tab_home);
```

##Preview
<img src="https://i.imgur.com/kTU0fO2.png" style="max-width: 400px;" alt="preview">

##Contribute
Please read the wiki in order to contribute to the project.


##License 
MIT-license. See *LICENSE*-file.