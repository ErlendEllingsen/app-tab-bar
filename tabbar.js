/**
 * app-tab-bar
 *
 * A tab-bar system in HTML/JS for hybrid apps / web apps.
 * https://github.com/ErlendEllingsen/app-tab-bar
 *
 *
 * @author Erlend Ellingsen <erlend.ame@gmail.com>
 * @copyright MIT, Erlend Ellingsen
 * @version	1.4	03.02.2017
 */

var AppTabBar = {};


AppTabBar.Tabbar = function(nodeId, options) {

	//--- VARS ---

	var self = this;

	//Vars: objects main
	this.obj_ID = nodeId;
	this.obj = null; //DOM-object

	this.options = options;

	this.tabbar_spacer = null;

	//Tabs
	this.tabs = {
		tabs_current_uuid: '',
		tabs_objects: [],
		tab_selected: null,
		tab_prev_selected: null,
		tab_selected_classes: '',
		tab_unselected_classes: '',
		active: null
	};

	//--- INIT & MAIN ---

	this.init = function() {

		var tabbarObj = document.getElementById(self.obj_ID);

		self.tabbar_spacer = document.createElement('div');
		var div_tabbar = document.createElement('div');

		tabbarObj.appendChild(self.tabbar_spacer);
		tabbarObj.appendChild(div_tabbar);

		self.obj = div_tabbar;


	}

	//--- CALCULATION METHODS ---
	this.calculation = {};
	this.calculation.id = 0;
	this.calculation.columnsCalculated = null;

	this.calculation.uniqueId = function() {
		self.calculation.id++;
		return Number(self.calculation.id.toString());
	}

	this.calculation.calculateColumns = function() {
		var numTabs = self.tabs.tabs_objects.length;
		var columns = (12 / numTabs);

		var validColumns = [2,3,4,6,12];
		if (validColumns.indexOf(columns) == -1) {
			throw 'calculateColumns invalid_columns';
		}

		self.calculation.columnsCalculated = columns;
		//	2,3,4,6,12

	}


	//--- TABS FUNCTIONS ---
	this.findTab = function(tabId) {
		var foundTab = false;
		var tabIndex = 0;
		var tab = null;

		//FIND ELEMENT

		for (var i = 0; i < self.tabs.tabs_objects.length; i++) {
			var tempTab = self.tabs.tabs_objects[i];
			if (tempTab.id == tabId) {
				tabIndex = i;
				foundTab = true;
				tab = tempTab;
				break;
			}

			//end for-loop
		}

		if (!foundTab) return false;
		return {
			tab: tab,
			tabIndex: tabIndex
		};
	}

	this.addTab = function(name, icon, options){

		var tabId = self.calculation.uniqueId();

		//Create object
		var tab = new AppTabBar.Tab(tabId, name, icon, options, self);

		self.tabs.tabs_objects.push(tab);

		return tabId;

	}

	this.removeTab = function(tabId) {

		var tabObj = self.findTab(tabId);
		if (tabObj === false) return;

		//REMOVE ELEMENTS

		//Remove DOM object
		tabObj.tab.obj.parentElement.removeChild(tabObj.tab.obj);

		//Remove from array.
		self.tabs.tabs_objects.splice(tabObj.tabIndex, 1);

		return true;


	}

	this.selectTab = function(tabId) {

		var tabObj = self.findTab(tabId);
		if (tabObj === false) return;

		//Ensure that the object is rendered.
		if (tabObj.tab.rendered == false) {
			throw 'selectTab	render_before_selecting';
			return false;
		}


		//Unset current tab
		if (self.tabs.tab_selected !== null) {
			self.tabs.tab_selected.obj.setAttribute('class', self.tabs.tab_unselected_classes);
			self.tabs.tab_prev_selected = self.tabs.tab_selected;
		}

		//Set new tab
		self.tabs.tab_selected = tabObj.tab;

		//If the same, don't hide (causes errors with styling)
		if (self.tabs.tab_selected == self.tabs.tab_prev_selected) self.tabs.tab_prev_selected = null;

		//Hide tab
		self.tabs.tab_selected.obj.style.display = 'none';

		self.tabs.tab_selected.obj.setAttribute('class', self.tabs.tab_selected_classes);

		//ADJUST STYLES
		if ('tab_selected_style' in self.options) {

			var style = self.options.tab_selected_style;

			if ('color' in self.options.tab_selected_style) {
				self.tabs.tab_selected.obj.children[0].style.color = style.color;
				if (self.tabs.tab_prev_selected != null) self.tabs.tab_prev_selected.obj.children[0].style.color = '';
			}

			if ('background_color' in self.options.tab_selected_style) {
				self.tabs.tab_selected.obj.children[0].style.backgroundColor = style.background_color;
				if (self.tabs.tab_prev_selected != null) self.tabs.tab_prev_selected.obj.children[0].style.backgroundColor = '';
			}

		}

		//Show tab
		self.tabs.tab_selected.obj.style.display = 'block';

		//Call selected callback..
		tabObj.tab.events.selected();

		return true;
		//end selectTab
	}

	//--- RENDERING & BIND ---

	this.render = function() {

		//PREPARE DATA
		self.calculation.calculateColumns();
		var cols = self.calculation.columnsCalculated;

		//RENDER
		//Render styles
		self.tabs.tab_selected_classes = 'navBtnCtn active tb-col-' + cols;
		self.tabs.tab_unselected_classes = 'navBtnCtn tb-col-' + cols;

		//Empty div
		self.obj.innerHTML = '';

		//Generate container
		self.obj.innerHTML = '' +
			'<div data-tab-bar-controller="container" class="navigationBarContainer container-fluid" style="display: block;">' +
			'	<div data-tab-bar-controller="bar" class="navigationBar row">' +
			'	</div>' +
			'</div>';

		//Load objects

		var bar_obj = self.obj.children[0].children[0];

		//Add tabs
		for (var i = 0; i < self.tabs.tabs_objects.length; i++) {
			var tab = self.tabs.tabs_objects[i];
			var tabCode = tab.renderCode();

			bar_obj.appendChild(tabCode);

			tab.rendered = true;
		}

		//Create SPACER
		self.tabbar_spacer.style.marginBottom = self.obj.children[0].scrollHeight;


		//end render
	}

	this.bind = function() {

	}

	// --- EVENTS ---


	// END Tabbar
}


AppTabBar.Tab = function(id, name, icon, options, tabbar) {


	//VARS
	//References
	var self = this;
	this.tabbar = tabbar;

	//Properties
	this.id = id;
	this.name = name;
	this.icon = icon;
	this.obj = null;

	//Tab render status
	this.rendered = false; //Control if rendered.

	//Events
	this.events = {};
	this.events.click = function(e) {
		e.stopPropagation();
		e.preventDefault();

		//Check for override-action
		if (self.options.click.preventDefault == true) {
			self.options.click.callback();
			return;
		}

		//Default action
		self.tabbar.selectTab(self.id);
	}
	this.events.selected = function() {
		//to be implemented.
		console.log('Tab events.selected not implemented');
	}

	//Options
	this.options = {
		click: {
			preventDefault: false,
			callback: null
		},
		events: {
			selected: self.events.selected
		}
	}; //for reference

	//END VARS

	//INIT
	this.init = function() {
		if (options != undefined) self.initSetupOptions();
	}

	this.initSetupOptions = function() {

		if ('click' in options) {
			if ('preventDefault' in options.click) self.options.click.preventDefault = options.click.preventDefault;
			if ('callback' in options.click) self.options.click.callback = options.click.callback;
		}

		if ('events' in options) {
			if ('selected' in options.events) self.events.selected = options.events.selected;
		}

	}

	//call init
	this.init();

	//FUNCTIONS

	this.renderCode = function() {


		var tabCode = document.createElement('div');
		tabCode.setAttribute('class', self.tabbar.tabs.tab_unselected_classes);

		var btnContent = '' +
			'<button data-tab="' + self.id + '" type="button" class="navBtn btn btn-default">' +
			'	<span style="display: block;">' + self.icon + '</span> ' +
			'' + self.name +
			'</button>';

		tabCode.innerHTML = btnContent;

		var button = tabCode.children[0];

		//Apply eventual styles
		if ('button_height' in self.tabbar.options) button.style.height = self.tabbar.options.button_height;
		if ('font_size' in self.tabbar.options) button.style.fontSize = self.tabbar.options.font_size;

		//Apply events
		button.addEventListener("click", self.events.click);
		button.addEventListener("touchstart", self.events.click);

		self.obj = tabCode;
		return tabCode;

	}

	//END Tab
}
