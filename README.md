<img src="https://i.imgur.com/CLUH1Ws.png" style="width: 430px;" alt="app-tab-bar logo">

<!-- Place this tag in your head or just before your close body tag. -->
<script async defer src="https://buttons.github.io/buttons.js"></script>

<div style="display: inline-block;">
<!-- Place this tag where you want the button to render. -->
<a style="display: inline-block;" class="github-button" href="https://github.com/erlendellingsen/app-tab-bar" data-icon="octicon-star" data-style="mega" data-count-href="/erlendellingsen/app-tab-bar/stargazers" data-count-api="/repos/erlendellingsen/app-tab-bar#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star erlendellingsen/app-tab-bar on GitHub">Star</a>
</div>

<div style="display: inline-block; margin-left: 20px;">
<!-- Place this tag where you want the button to render. -->
<a style="display: inline-block;" class="github-button" href="https://github.com/erlendellingsen" data-style="mega" data-count-href="/erlendellingsen/followers" data-count-api="/users/erlendellingsen#followers" data-count-aria-label="# followers on GitHub" aria-label="Follow @erlendellingsen on GitHub">Follow @erlendellingsen</a>
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