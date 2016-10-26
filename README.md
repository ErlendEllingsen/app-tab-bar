![App-tab-bar](https://i.imgur.com/CLUH1Ws.png)

###Warning - WORK IN PROGRESS
app-tab-bar is currently **work in progress** and is NOT stable/ready to use. Watch (and/or star 😀🌟) the repository to be notified of changes!

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

* Boostrap
* jQuery
* Font Awesome

##Usage
**HTML**

Add an empty div to your code with a specified id. Example:

```
<div id="tab_bar"></div>
```

**Javascript**

Add your own tabbar-code to your javascript. Initialize the tabbar object and select the HTML-object you added. Add tabs and then finally render.

```
//Initialize the tabbar
var tabbar = new AppTabBar.Tabbar('tab_bar');
tabbar.init();

//Add tabs
tabbar.addTab('Home', 'fa-home');
tabbar.addTab('Pages', 'fa-home');
	
//Render the tabbar.
tabbar.render();
```



##Contribute
//TODO

Please read the wiki in order to contribute to the project.

##License 
MIT-license. See *LICENSE*-file.