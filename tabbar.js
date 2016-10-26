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


AppTabBar.Tabbar = function(nodeId) {

	//--- VARS ---

	var self = this;

	//Vars: objects main
	this.obj_ID = nodeId;
	this.obj = null; //DOM-object

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

		return columns;

		//	2,3,4,6,12

	}


	//--- TABS FUNCTIONS ---
	this.addTab = function(name, icon){


		var tabId = self.calculation.uniqueId();

		//Create object.
		var obj = '<div data-tab-bar-id="'  + tabId + '">hello</div>';
		obj = $.parseHTML(obj);

		var tab = new AppTabBar.Tab(tabId, obj, self);

		self.tabs.tabs_objects.push(tab);



		// self.tabs.tabs_objects.push()

		// self.obj.html(obj);

	}

	//--- RENDERING & BIND ---

	this.render = function() {

		//Empty div
		$(self.obj).html('');

		//Generate container
		$(self.obj).html('aaasjdjas');

	}

	this.bind = function() {

	}

	// --- EVENTS ---


	// END Tabbar
}


AppTabBar.Tab = function(id, obj, tabbar) {
	var self = this;
	this.tabbar = tabbar;

	this.id = id;
	this.obj = obj;

}


$(document).ready(function() {

	//Initialize the tabbar
	var tabbar = new AppTabBar.Tabbar('tab_bar');
	tabbar.init();

	//Add tabs
	tabbar.addTab('hello', 'hello');

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
