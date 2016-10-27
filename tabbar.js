/**
 * app-tab-bar
 *
 * A tab-bar system in HTML/JS for hybrid apps / web apps.
 * https://github.com/ErlendEllingsen/app-tab-bar
 *
 *
 * @author Erlend Ellingsen <erlend.ame@gmail.com>
 * @copyright MIT, Erlend Ellingsen
 * @version	1.1	27.10.2016
 */

var AppTabBar = {};


AppTabBar.Tabbar = function(nodeId, options) {

	//--- VARS ---

	var self = this;

	//Vars: objects main
	this.obj_ID = nodeId;
	this.obj = null; //DOM-object

	this.options = options;

	//Tabs
	this.tabs = {
		tabs_current_uuid: '',
		tabs_objects: [],
		tab_selected: null,
		tab_selected_classes: '',
		tab_unselected_classes: '',
		active: null
	};

	//--- INIT & MAIN ---

	this.init = function() {
		self.obj = $('#' + self.obj_ID);
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
		$(tabObj.tab.obj).remove();

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
			$(self.tabs.tab_selected.obj).attr('class', self.tabs.tab_unselected_classes);
		}

		//Set new tab
		self.tabs.tab_selected = tabObj.tab;
		$(self.tabs.tab_selected.obj).attr('class', self.tabs.tab_selected_classes);

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
		self.tabs.tab_selected_classes = 'navBtnCtn active col-xs-' + cols + ' col-sm-' + cols + ' col-md-' + cols + ' col-lg-' + cols;
		self.tabs.tab_unselected_classes = 'navBtnCtn col-xs-' + cols + ' col-sm-' + cols + ' col-md-' + cols + ' col-lg-' + cols;

		//Empty div
		$(self.obj).html('');

		//Generate container
		$(self.obj).html('' +
			'<div data-tab-bar-controller="container" class="navigationBarContainer container-fluid" style="display: block;">' +
			'	<div data-tab-bar-controller="bar" class="navigationBar row">' +
			'	</div>' +
			'</div>'
		);

		//Load objects
		var bar_obj = $(self.obj).find('div[data-tab-bar-controller="bar"]');

		//Add tabs
		for (var i = 0; i < self.tabs.tabs_objects.length; i++) {
			var tab = self.tabs.tabs_objects[i];
			var tabCode = tab.renderCode();
			$(bar_obj).append(tabCode);

			tab.rendered = true;
		}

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
	this.events.click = function() {
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


		var btn = '' +
			'<div class="' + self.tabbar.tabs.tab_unselected_classes + '">' +
			'	<button data-tab="' + self.id + '" type="button" class="navBtn btn btn-default">' +
			'		<i class="fa ' + self.icon + '" style="display: block;"></i> ' + self.name +
			'	</button>' +
			'</div>';

		btn = $.parseHTML(btn);

		//Apply eventual styles
		if ('button_height' in self.tabbar.options) $(btn).find('button').css('height', self.tabbar.options.button_height);

		//Apply events
		$(btn).find('button').on('click', self.events.click);

		self.obj = btn;
		return btn;

	}

	//END Tab
}