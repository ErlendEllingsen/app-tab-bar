/**
 * app-tab-bar
 *
 * A tab-bar system in HTML/JS for hybrid apps / web apps.
 * https://github.com/ErlendEllingsen/app-tab-bar
 *
 *
 * @author Erlend Ellingsen <erlend.ame@gmail.com>
 * @copyright MIT, Erlend Ellingsen
 * @version	1.0	26.10.2016
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
	this.addTab = function(name, icon){

		var tabId = self.calculation.uniqueId();

		//Create object
		var tab = new AppTabBar.Tab(tabId, name, icon, self);

		self.tabs.tabs_objects.push(tab);

		return tabId;

	}

	this.removeTab = function(tabId) {

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

		//REMOVE ELEMENTS

		//Remove DOM object
		$(foundTab.obj).remove();

		//Remove from array.
		self.tabs.tabs_objects.splice(tabIndex, 1);

		return true;


	}

	//--- RENDERING & BIND ---

	this.render = function() {

		//PREPARE DATA
		self.calculation.calculateColumns();

		//RENDER

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
		}

		//end render
	}

	this.bind = function() {

	}

	// --- EVENTS ---


	// END Tabbar
}


AppTabBar.Tab = function(id, name, icon, tabbar) {
	var self = this;
	this.tabbar = tabbar;

	this.id = id;
	this.name = name;
	this.icon = icon;

	this.obj = null;

	this.renderCode = function() {

		var cols = self.tabbar.calculation.columnsCalculated;

		var btn = '' +
			'<div class="navBtnCtn col-xs-' + cols + ' col-sm-' + cols + ' col-md-' + cols + ' col-lg-' + cols + '">' +
			'	<button data-tab="' + self.id + '" type="button" class="navBtn btn btn-default">' +
			'		<i class="fa ' + self.icon + '" style="display: block;"></i> ' + self.name +
			'	</button>' +
			'</div>';

		btn = $.parseHTML(btn);

		//Apply eventual styles
		if ('button_height' in self.tabbar.options) $(btn).find('button').css('height', self.tabbar.options.button_height);

		self.obj = btn;
		return btn;

	}

}


$(document).ready(function() {

	//Initialize the tabbar
	var tabbar = new AppTabBar.Tabbar('tab_bar', {
		button_height: 60
	});

	tabbar.init();

	//Add tabs
	var home = tabbar.addTab('Home', 'fa-home');
	var pages = tabbar.addTab('Pages', 'fa-home');

	//Render the tabbar.
	tabbar.render();

});





//
// var tabs = {};
//
// tabs.activeTab = 'Timebestilling';
// tabs.availableTabs = ['Timebestilling', 'Tilbud', 'Instillinger'];
//
// tabs.setTab = function(newTab) {
//
// 	//Unset old tab
// 	$('#navigationBar').find("button[data-tab='" + tabs.activeTab + "']").attr('class', 'navBtn btn btn-default');
// 	//Unset old section
// 	$("section[data-page='" + tabs.activeTab + "']").css('display', 'none');
//
// 	//Set new tab
// 	$('#navigationBar').find("button[data-tab='" + newTab + "']").attr('class', 'navBtn btn btn-primary');
//
// 	//Set new section
// 	$("section[data-page='" + newTab + "']").css('display', 'block');
//
// 	//Set the tab active
// 	tabs.activeTab = newTab;
// }
