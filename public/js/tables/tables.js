tableElements = {};



tableElements.checkbox = function (title) {
	var el = `<input type="checkbox" id="${title}" name="${title}" value="Bike",>`;
	return el;
};





tableElements.filters = function (title) {
	var el = `<div class="filter-box">
  <div class="filter-title">${title}</div>
  <div class="filters">
    <span class="icon-fi-sr-caret-up1" ></span>
    <span class="icon-fi-sr-caret-down1" ></span>
  </div>
</div>`;
	return el;
};




tableElements.email = function (title) {
	var el = `<a href="" class="email">${title}</a>`;
	return el;
};




tableElements.link = function (title) {
	var el = `<a href="">${title}</a>`;
	return el;
};





tableElements.date = function (title) {
	title = title.split(" ");
	var el = `<div class="flex-date">
    <span class="table-date">${title[0]}</span>
    <span class="table-time">${title[1]}</span>
    </div>`;
	return el;
};







tableElements.isActive = function () {
	var isActive = Math.round(Math.random());
	if (isActive) {
		var Elclass = "isActive";
		var text = "ΕΧΕΙ ΛΗΞΕΙ";
	} else {
		var Elclass = "isNotActive";
		var text = "ΚΑΤΑΧΩΡΗΜΕΝΟ";
	}

	var el = `<div class="status ${Elclass}">
    <span class="light"></span>
    <span class="active-text">${text}</span>
    </div>`;
	return el;
};







tableElements.action = function () {
	var el = `<div class="actions-container">
    <div class="icon-fi-sr-time-past">				</div>
    <div class="icon-fi-sr-pulse">				</div>
    <div class="icon-fi-sr-receipt">			</div>
	<div class="icon-fi-sr-power1">				</div>
</div>`;
	return el;
};








tableElements.singleIcon = function (title) {
	var isActive = Math.round(Math.random() * 2);

	switch (isActive) {
		case 0:
			var elClass = "red";
			break;
		case 1:
			var elClass = "green";
			break;
		case 2:
			var elClass = "noColor";
			break;
	}

	var el = `<div class="singleIcon ${elClass}">
        <span class="${title}"></span>
        </div>`;
	return el;
};







tableElements.domainName = function (title) {
	var isActive = Math.round(Math.random());
	if (isActive) {
		var hideIcon = "hideIcon";
	} else {
		var hideIcon = "";
	}
	var el = `<div class="domain-name">
     <div class="icon-fi-sr-clock1 icon ${hideIcon}"></div>
     <a href="" class="link" title="${title}">${title}</a>
    </div>`;
	return el;
};







function createHeadOfTable() {
	var headTemplate = "<tr>";
	$(tabledata.head).each(function (index) {
		var title = this.title;
		if (this.width != null) {
			var style = `style="width: ${this.width}"`;
		}

		if (this.element != null) {
			title = tableElements[this.element](title);
		}
		headTemplate += `<th scope="col" ${style}>${title}</th>`;
	});
	headTemplate += "</tr>";
	$("thead").html(headTemplate);
}







function createDataOfTable() {
	var headTemplate = "";
	$(tabledata.rows).each(function (index) {
		var row = this;

		headTemplate += "<tr>";
		$(row).each(function (index) {
			var title = tabledata.head[index].title;
			var hideTitle = tabledata.head[index].hideMobile == true ? "hide-t" : "";
			var hideAllMobile =
				tabledata.head[index].hideAllMobile == true ? "hide-t" : "";
			var value = this.value;

			if (this.element != null) {
				value = tableElements[this.element](value);
			}

			headTemplate += `<td data-label="${title}" class="${hideAllMobile}"><span class="title_mobile ${hideTitle}">${title}</span>${value}</td>`;
		});
		headTemplate += "</tr>";
	});
	$("tbody").html(headTemplate);
}






createHeadOfTable();
createDataOfTable();
localStorageFilters()






var open = 0;
$(".filters-label").click(function () {
	localStorageFilters();
	togglefilters();
});







var element = $(".filters-conatiner")[0];









function togglefilters() {
	if (open % 2) {
		expandSection(element);
	} else {
		collapseSection(element);
	}
	open++;
}








var selectOneRowPar = $("tbody tr");
var selectOneRow = $(' tbody input[type="checkbox"]');
var clearAllSelections = $(".clearSelections");
var selectAllCheckPar = $("thead tr");
var selectAllCheck = $(' thead input[type="checkbox"]');

selectAllCheckPar.click(function () {
	multiRowSelection();
});
selectOneRow.click(function () {
	oneRowSelection(this);
});
clearAllSelections.click(function () {
	multiRowSelection(true);
});








function multiRowSelection(clear = false) {
	if (selectAllCheck.is(":checked")) {
		selectOneRowPar.find(selectOneRow).each(function () {
			this.checked = true;
			selectOneRowPar.addClass("selected");
		});
	} else {
		selectOneRowPar.find(selectOneRow).each(function () {
			this.checked = false;
			selectOneRowPar.removeClass("selected");
		});
	}

	if (clear == true) {
		selectOneRowPar.find(selectOneRow).each(function () {
			this.checked = false;
			selectOneRowPar.removeClass("selected");
		});
		selectAllCheck.prop("checked", false);
	}
	openActions();
	printSelectCount();
}







function oneRowSelection(el) {
	if ($(el).is(":checked")) {
		$(el).closest("tr").addClass("selected");
	} else {
		$(el).closest("tr").removeClass("selected");
	}
	openActions();
	printSelectCount();
}






function openActions() {
	var ischecked = $("table input").is(":checked");

	if (ischecked) {
		$(".selectionActionsContainer").addClass("open");
	} else {
		$(".selectionActionsContainer").removeClass("open");
	}
}







function printSelectCount() {
	var counterSel = $(".selected").length;
	if (counterSel == 1) {
		$(".selectionCount").html("Έχετε επιλέξει " + counterSel + " στοιχείo");
	}
	if (counterSel != 1) {
		$(".selectionCount").html("Έχετε επιλέξει " + counterSel + " στοιχεία");
	}
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var filterCollapsedLoc = localStorage.getItem("filters_open");


	function localStorageFilters(){
		var tableFilterContainer = $(".filters-conatiner")
		var tableFilters = tableFilterContainer.attr("data-collapsed");
		if (filterCollapsedLoc == undefined){
			localStorage.setItem("filters_open", "false")

		}
		if (tableFilters == 'true'){
			localStorage.setItem("filters_open", "true")

		}
		if (tableFilters == 'false'){
			localStorage.setItem("filters_open", "false")

		}

		if (filterCollapsedLoc == "true" ){

			tableFilterContainer.css("height","0px;")

		}
		if (filterCollapsedLoc == "false" ){

			tableFilterContainer.css("")



		}
	}





	/*function localStorageFilters(){
		////


	var tableFilters = $(".filters-conatiner"+"[data-collapsed='false']")[0];

	/////
	var elem = $(".filters-conatiner")

	if (filterCollapsed == true ){
		localStorage.setItem("filtersOpen", "false");	}
  	if (filterCollapsed == false ){
		localStorage.setItem("filtersOpen", "true");	}
	if (filterCollapsedLoc == 'true'){
		elem[0].setAttribute('data-collapsed', 'true');	}
	if (filterCollapsedLoc == 'false'){
		elem[0].setAttribute('data-collapsed', 'false');		;
	}}*/
