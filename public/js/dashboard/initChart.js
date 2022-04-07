/*--------------------init chart ------------------------------------*/
var chart1 = $(".chart1")[0].getContext("2d");
var myChart = new Chart(chart1, chartConfig.chart1);
var chart2 = $(".chart2")[0].getContext("2d");
var myChart2 = new Chart(chart2, chartConfig.chart2);
var chart3 = $(".chart3")[0].getContext("2d");
var myChart3 = new Chart(chart3, chartConfig.chart3);
var chart4 = $(".chart4")[0].getContext("2d");
var myChart4 = new Chart(chart4, chartConfig.chart4);
/*--------------------init chart end ------------------------------------*/
/*
Stacked Bar Chart with Groups
Line Chart
Doughnut
Line Chart Boundaries
*/
/*get data form daterangepicker*/
backgroundColorchart3();

function backgroundColorchart3() {
	var colors = localData.chart1.datasets;
	$(colors).each(function() {
		var product = this;
		localData.chart3.datasets[0].backgroundColor.push(product.backgroundColor);
	});
	$(colors).each(function() {
		var product = this;
		localData.chart3.datasets[0].backgroundColor.push(product.backgroundColor);
	});
}
var template = localData.chart3.datasets[0];
var dateFormat = "DD/MM/YYYY";
var Obj = {
	startDate: "",
	endDate: "",
};
const searchDataObj = {
	startDate: null,
	endDate: null,
	period: null,
};
//cofiguration for each chart
const tableConfig = {};
//data after selection
var filteredData;
var filteredDataBack;
var parentDatesChart3 = [];
var hasNoData;
var excludeCharts = {};
$(".dateButton").daterangepicker({
	//default dates
	startDate: moment().subtract(120, "weeks"),
	endDate: moment().subtract(118, "weeks"),
	ranges: {
		"Προηγούμενος μήνας": [moment().subtract(1, "months"), moment()],
		"Τελευταίοι 6 μήνες": [moment().subtract(180, "days"), moment()],
		"Πρηγούμενο έτος": [
			moment().subtract(1, "year").add(2, "day").startOf("year"),
			moment(),
		],
		"Όλα τα έτη": "all-time" /* [minDate, maxDate] */ ,
		"Χειροκίνητη επιλογή": "custom",
	},
	minDate: moment(Object.keys(data.day)[0], "DDMMYYYY"),
	firstDayOfWeek: 1,
	orientation: "left",
	expanded: true,
	forceUpdate: true,
}, function(startDate, endDate, period) {
	Obj.startDate = startDate.format(dateFormat);
	Obj.endDate = endDate.format(dateFormat);
	//setInputval(period);
	var start = Obj.startDate;
	var end = Obj.endDate;
	$(this).html(start + " – " + end);
	hasNoData = false;
	getCalendarData(start, end, period);
	getQueriedData();
	if (hasNoData == true) {
		return;
	}
	updatecharts(excludeCharts);
	//statsLabel();
	sumValues();
});

function loopData(data, obj) {
	$(data).each(function() {
		var allperiod = this[searchDataObj.period];
		for (date in allperiod) {
			var singledate = allperiod[date];
			for (stat in singledate) {
				if (stat.search("data") != -1) {
					if (obj[stat] == undefined) {
						obj[stat] = [];
					}
					var val = singledate[stat].datasets[0].data[0]
					obj[stat].push(val)
					////console.log(obj[stat]);
				}
			}
		}
	});
}

function loopValues(obj, html) {
	for (stat in obj) {
		var value = obj[stat].reduce(function(a, b) {
			return a + b;
		}, 0);
		value = Math.round(value);
		obj[stat] = value;
		if (html == true) {
			$("." + stat + " .numD").html(value);
		}
	}
}

function compareVal(beforeObj, afterOBj) {
	for (dataName in afterOBj) {
		var newval = afterOBj[dataName];
		var oldval = beforeObj[dataName];
		var el = $("." + dataName);
		el.find(".percent").removeClass("hide");
		if (oldval == undefined) {
			el.find(".num-p").html("No Data");
			el.find(".percent").addClass("hide");
		} else {
			var percent = ((newval - oldval) / oldval) * 100;
			percent = percent.toFixed(2);
			el.find(".num-p").html(percent);
			if (percent >= 0) {
				el.find(".percent").addClass("plus-p")
				el.find(".percent").removeClass("minus-p")
			}
			if (percent < 0) {
				el.find(".percent").removeClass("plus-p")
				el.find(".percent").addClass("minus-p")
			}
		}
	}
}

function sumValues() {
	obj = {};
	obj2 = {};
	loopData(filteredData, obj);
	loopData(filteredDataBack, obj2);
	loopValues(obj, true)
	loopValues(obj2, false)
	compareVal(obj2, obj);
};

function updatecharts(excludeCharts) {
	if (excludeCharts['myChart'] == undefined) {
		myChart.update();
	}
	if (excludeCharts['myChart2'] == undefined) {
		myChart2.update();
	}
	if (excludeCharts['myChart3'] == undefined) {
		myChart3.update();
	}
	if (excludeCharts['myChart4'] == undefined) {
		myChart4.update();
	}
}

function getCalendarData(start, end, period) {
	searchDataObj.startDate = start;
	searchDataObj.endDate = end;
	searchDataObj.period = period;
	//searchDataObj.startDate = "31/12/1999";
	//console.log("")	searchDataObj.endDate = "31/12/2002";
	//searchDataObj.period = "year";
	//console.log("searchDataObj.startDate = "+searchDataObj.startDate);
	//console.log("searchDataObj.endDate = "+searchDataObj.endDate);
	//console.log("searchDataObj.period = "+searchDataObj.period);
}

function setInputval(period) {
	switch (period) {
		case "day":
			Obj.startDate = Object.keys(data.day)[0];
			Obj.endDate = Object.keys(data.day)[2];
			break;
		case "week":
			Obj.startDate = Object.keys(data.week)[0];
			Obj.endDate = Object.keys(data.week)[1];
			break;
		case "month":
			Obj.startDate = Object.keys(data.month)[0];
			Obj.endDate = Object.keys(data.month)[3];
			break;
		case "quarter":
			Obj.startDate = Object.keys(data.quarter)[0];
			Obj.endDate = Object.keys(data.quarter)[2];
			break;
		case "year":
			Obj.startDate = Object.keys(data.year)[5];
			Obj.endDate = Object.keys(data.year)[3];
			break;
	}
}

function getQueriedData() {
	var period = searchDataObj.period;
	var startDate = searchDataObj.startDate;
	var endDate = searchDataObj.endDate;
	var starDateEndOfDay = moment(startDate, "DDMMYYYY").endOf(period);
	var endDateEndOfDay = moment(endDate, "DDMMYYYY").endOf(period);
	filteredDataBack = {};
	filteredDataBack[period] = {};
	filteredData = {};
	filteredData[period] = {};
	filteredData[period][starDateEndOfDay.endOf(period).format(dateFormat)] = data[period][starDateEndOfDay.endOf(period).format(dateFormat)];
	while (starDateEndOfDay.add(1, period + "s").endOf(period).diff(endDateEndOfDay) <= 0) {
		filteredData[period][starDateEndOfDay.endOf(period).format(dateFormat)] = data[period][starDateEndOfDay.endOf(period).format(dateFormat)];
	}
	var count = Object.keys(filteredData[period]).length;
	var startDateStat = moment(searchDataObj.startDate, "DDMMYYYY").subtract(count, period + "s").endOf(period);
	var startDateStatFormat = startDateStat.format(dateFormat);
	var endDateStat = moment(searchDataObj.startDate, "DDMMYYYY").subtract(1, period).endOf(period + "s");
	var endDateStatFormat = endDateStat.format(dateFormat);
	while (startDateStat.add(1, period + "s").endOf(period).diff(endDateStat) <= 0) {
		filteredDataBack[period][startDateStat.endOf(period).format(dateFormat)] = data[period][startDateStat.endOf(period).format(dateFormat)];
	}
	mergeAndGiveData(period);
}

function loopAndPush(Value, arrs) {
	for (const singleValue in Value) {
		if (Value[singleValue] == undefined) {
			nodata();
			//hasNoData = true;
		} else {
			var datasets = Value[singleValue]["chart1"]["datasets"];
			$(datasets).each(function(index) {
				if (arrs.length < datasets.length) {
					arrs.push(this.data[0]);
				} else {
					arrs[index] = arrs[index] + this.data[0];
				}
			});
		}
	}
}

function nodata(Chart1) {
	if (Chart1 == undefined) {
		var charts = [myChart, myChart2, myChart3, myChart4];
	} else {
		var charts = [Chart1];
	}
	$(charts).each(function() {
		var Chart = this;
		// No data is present
		var ctx = Chart.ctx;
		var width = Chart.width;
		var height = Chart.height;
		ctx.clearRect(0, 0, width, height);
		ctx.save();
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font = "60px normal 'Roboto'";
		ctx.fillText("Δεν υπάρχουν δεδομένα", width / 2, height / 2);
		//ctx.restore();
	});
}

function joinvalues(sumValue) {
	//////console.log(0);
	var parentArr = [];
	var arrSum = [];
	var arrSum2 = [];
	var arrSum3 = [];
	loopAndPush(sumValue, arrSum);
	if (hasNoData) {
		return;
	}
	if (moment(Obj.startDate, "DDMMYYYY").add(1, "years") > moment(Obj.endDate, "DDMMYYYY")) {
		//////console.log(1);
		var yearEndEndOf = moment(Obj.endDate, "DDMMYYYY").endOf("year");
		var yearEndOfformat = yearEndEndOf.format("YYYY");
		var yearStartEndOf = moment(Obj.startDate, "DDMMYYYY").endOf("year");
		var yearStartEndOfformat = yearStartEndOf.format("YYYY");
		if (yearStartEndOfformat != yearEndOfformat) {
			//////console.log(2);
			var Value1 = data["year"][yearStartEndOf.format("DD/MM/YYYY")]["chart1"]["datasets"];
			var Value2 = data["year"][yearEndEndOf.format("DD/MM/YYYY")]["chart1"]["datasets"];
			$(Value1).each(function(index) {
				arrSum2.push(this["data"][0]);
			});
			parentDatesChart3.push(yearStartEndOfformat);
			$(Value2).each(function(index) {
				arrSum3.push(this["data"][0]);
			});
			parentDatesChart3.push(yearEndOfformat);
		} else {
			var sumValue2 = data["year"][yearStartEndOf.format("DD/MM/YYYY")]["chart1"]["datasets"];
			$(sumValue2).each(function(index) {
				arrSum2.push(this["data"][0]);
			});
			parentDatesChart3.push(yearStartEndOfformat);
		}
		////////console.log(moment(Obj.startDate,"DDMMYYYY").format("DD/MM/YYYY"));
		////////console.log(moment(Obj.endDate,"DDMMYYYY").format("DD/MM/YYYY"));
	}
	parentDatesChart3.push(moment(Obj.startDate, "DDMMYYYY").format("DD/MM/YYYY") + " - " + moment(Obj.endDate, "DDMMYYYY").format("DD/MM/YYYY"));
	parentArr = [arrSum, arrSum2, arrSum3];
	return parentArr;
}

function mergeAndGiveData(period) {
	emptyLocalDataArr();
	var datanew = filteredData[period];
	var elValuesSort = joinvalues(datanew);
	var i = 0;
	var chartNoData = true;
	for (const singleData in datanew) {
		date = datanew[singleData];
		for (const chart in date) {
			if (chart != "chart3") {
				if (localData[chart] == undefined) {
					localData[chart] = {};
					localData[chart]["labels"] = [];
					localData[chart]["datasets"] = [{
						label: "",
						"data": []
					}];
				}
				var label = createLabel(date[chart], singleData, period);
				var datasets = date[chart]["datasets"];
				localData[chart]["labels"].push(label);
				$(datasets).each(function(index) {
					var localdataset = localData[chart]["datasets"][index];
					localdataset["label"] = datasets[index]["label"];
					localdataset["data"].push(datasets[index]["data"][0]);
				});
			}
			if (chart == "chart3") {
				if (i == 0) {
					chartNoData = false;
					var obj = {};
					$(date["chart1"].datasets).each(function() {
						obj[this.label] = this.label;
						console.log(this.label);
					});
					for (const label in obj) {
						localData["chart3"]["labels"].push(label);
					}
					localData["chart3"]["datasets"] = [];
					$(elValuesSort).each(function(index) {
						var timeperiod = parentDatesChart3;
						var valueArr = this;
						if (valueArr.length != 0) {
							var ArrNum = index;
							var newdata = JSON.parse(JSON.stringify(template));
							newdata.label = timeperiod[ArrNum];
							localData["chart3"]["datasets"].push(newdata);
							//localData["chart3"]["datasets"][ArrNum]["label"]="asas"+ ArrNum;
							$(valueArr).each(function() {
								localData["chart3"]["datasets"][ArrNum]["data"].push(this);
							});
						}
					});
				}
				if (chartNoData) {
					nodata(myChart3);
					excludeCharts["myChart3"] = true;
				}
			}
		}
		i++;
	}
}

function emptyLocalDataArr() {
	for (const chart in localData) {
		localData[chart]["labels"] = [];
		var datasets = localData[chart]["datasets"];
		$(datasets).each(function(index) {
			var localdataset = localData[chart]["datasets"][index];
			localdataset["data"] = [];
		});
	}
}

function createLabel(el, date, period) {
	switch (period) {
		case "year":
			return moment(date, "DDMMYYYY").format("YYYY");
			break;
		case "quarter":
			var quarter = moment(date, "DDMMYYYY").utc().quarter();
			return "Q" + quarter + " " + moment(date, "DDMMYYYY").format("YYYY");
			break;
		case "month":
			return moment(date, "DDMMYYYY").format("MMMM YYYY");
			break;
		case "week":
			return moment(date, "DDMMYYYY").format("dddd DD MMM YYYY");
			break;
		case "day":
			return moment(date, "DDMMYYYY").format("dd DD MMM YYYY");
			break;
		default:
			return el["labels"][0];
			// code block
	}
}

function compStatsLabel() {
	// Labels me deiktes apodosis sto dashboard
	//debugger;
	var count = localData.chart1.datasets[0].data.length;
	var period = searchDataObj.period;
	var startDateStat = moment(searchDataObj.startDate, "DDMMYYYY").subtract(count, period + "s").endOf(period);
	var startDateStatFormat = startDateStat.format(dateFormat);
	var endDateStat = moment(searchDataObj.startDate, "DDMMYYYY").subtract(1, period).endOf(period + "s");
	var endDateStatFormat = endDateStat.format(dateFormat);
	while (startDateStat.add(1, period + "s").endOf(period).diff(endDateStat) <= 0) {}
	var value = data[period][startDateStatFormat]["chart1"]["datasets"][0]["data"][0];
	var valueRound = value.toFixed(2)
}
/*
period = data.year;
for(var date in period){
  charts = period[date];
  for(var  chart in  charts){
    var chart=  charts[chart];
    datasets =  chart.datasets;
    $(datasets).each(function(){
      this.data=[];
      var data = this.data;
      data.push(Math.random()*1000);
    });

  }

}
*/