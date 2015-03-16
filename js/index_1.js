window.onload = initPage();

function createRequest() {
  try {
    request = new XMLHttpRequest();
  } catch (tryMS) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (otherMS) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        request = null;
      }
    }
  }	
  return request;
}

function addToSchoolList(id, name) {
	schools = $('select[name="schoolList"]');
	for (var i = 0; i < schools.length; ++i) {
		$(schools[i]).append('<option id="' + id + '">' + name + '</option>');  //$ important!!!  因为append是jquery的
	}
	$('.selectpicker').selectpicker('refresh');
}

function addToSchoolTable(id, name) {
	$("#schoolTable").find('tbody').append('<tr><td id="'+ id + '">' + name
									   +'</td><td><input type="button" value="确认" class="btn btn-default" onclick="modifySchool(this)"/> \n'
									   +'<input type="button" value="删除" class="btn btn-default"  onclick="deleteRow(this); deleteSchool(this)"/> \n'
									   +'<input type="button" value="取消" class="btn btn-default" /></td></tr>');
}

function getSchoolList() {
	/*var request = createRequest();
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	token = window.sessionStorage.getItem(token);
	sendData = "_csrf_token=" + token;
  	request.onreadystatechange = function() {
  		if (request.readyState == 4) {
	    	if (request.status == 200) {
	    		var requestText = request.responseText;  */
	    		var responseText = '{"code":0, "data":[{"id":"sun", "name":"中山大学"}, {"id":"hua", "name":"华南工"}]}';
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		switch (code) {
	    			case 0:
	    				var data = output.data;
	    				for (var i = 0; i < data.length; ++i) {
	    					addToSchoolList(data[i].id, data[i].name);
	    					addToSchoolTable(data[i].id, data[i].name);
	    				}
	    				break;
	    			case 1:
	    			 	alert("Invalid arguments");
	    			 	break;
	    			case 2:
 						alert("Csrf token check failed");
 						break;
					case -2:
						alert("Admin didn't login.");
						break; // 未登录
					case -10:
						alert("Act beyond authority."); // 非一级管理员
						break;
	    	}
	    //}
  	//};
  	//url = "/admin/level1/total_sales";
  	//request.open("POST", url, true);
  	//request.send(sendData);
}

function createSchool(f) {
	/*var request = createRequest();
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	var token = window.sessionStorage.getItem(token);
	var sendData = "_csrf_token=" + token;
	request.onreadystatechange = function() {
  		if (request.readyState == 4) {
	    	if (request.status == 200) {  */
	    		var responseText = '{"code":0, "data":[{"id":"hua", "name":"华南理工"}]}';
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		switch (code) {
	    			case 0:
	    				var data = output.data;
	    				addToSchoolList(data[0].id, data[0].name);
	    				addToSchoolTable(data[0].id, data[0].name);
	    				break;
	    			case 1:
	    			 	alert("Invalid arguments");
	    			 	break;
	    			case 2:
 						alert("Csrf token check failed");
 						break;
					case -2:
						alert("Admin didn't login.");
						break; // 未登录
					case -10:
						alert("Act beyond authority."); // 非一级管理员
						break;
					case -15:
						alert("School already exists.");
						break;
	    		}
	    	/*}
		}
  	};
  	url = "/admin//level1/school/create?name=" + f.word.value;
  	request.open("POST", url, true);
  	request.send(sendData); */
}


function modifySchool(t) {
    /*var request = createRequest();
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	var token = window.sessionStorage.getItem(token);
	var sendData = "_csrf_token=" + token; */
  	var temp = $(t).parent().siblings();
  	school_id = $(temp[0]).attr("id");
  	name = $(temp[0]).text();
    /*url="/admin//level1/school/modify?school_id=" + school_id + "name="+name;
  	request.onreadystatechange = function() {
  		if (request.readyState == 4) {
	    	if (request.status == 200) {
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		switch (code) {
	    			case 0:
	    				break;
	    			case 1:
	    			 	alert("Invalid arguments");
	    			 	break;
	    			case 2:
 						alert("Csrf token check failed");
 						break;
					case -2:
						alert("Admin didn't login.");
						break; // 未登录
					case -10:
						alert("Act beyond authority."); // 非一级管理员
						break;
					case -14:
						alert("School does not exist.");
					case -15:
						alert("School already exists.");
	    		} 
	    	}
	    }
  	};
  	request.open("POST", url, true);
  	request.send(sendData); */
}

function deleteSchool(t) {
	/*var request = createRequest();
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	var token = window.sessionStorage.getItem(token);
	var sendData = "_csrf_token=" + token;  */
  	var temp = $(t).parent().siblings();
  	school_id = $(temp[0]).attr("id");
  	/*url="/admin/level1/school/delete?school_id="+school_id;
  	request.onreadystatechange = function() {
  		if (request.readyState == 4) {
	    	if (request.status == 200) {
	    		var responseText = request.responseText;
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		switch (code) {
	    			case 0:
	    				break;
	    			case 1:
	    			 	alert("Invalid arguments");
	    			 	break;
	    			case 2:
 						alert("Csrf token check failed");
 						break;
					case -2:
						alert("Admin didn't login.");
						break; // 未登录
					case -10:
						alert("Act beyond authority."); // 非一级管理员
						break;
	    		}
	    	}
	    }
  	};
  	request.open("POST", url, true);
  	request.send(sendData);  */
}

function addToBuildingList(school, buildingList, newId, newName) {
	if (newId == null) {
		var output = getBuildingList(school);
		var data = output.data;
		for (var i = 0; i < data.length; ++i) {
	    	$("#" + buildingList).append('<option id="' + data[i].id + '">' + data[i].name + '</option>');  //$ important!!!  因为append是jquery的
		}
	} else {
		$("#" + buildingList).append('<option id="' + newId + '">' + newName + '</option>');
	}
	$('.selectpicker').selectpicker('refresh');
}

function addToBuildingTable(school, buildingTable, newId, newName) {
	var output = getBuildingList(school);
	var data = output.data;
	for (var i = 0; i < data.length; ++i) {
	    $("#"+buildingTable).find('tbody').append('<tr><td id="'+ data[i].id + '">' + data[i].name
									   +'</td><td><input type="button" value="确认" class="btn btn-default" onclick="modifyBuilding(this)"/> \n'
									   +'<input type="button" value="删除" class="btn btn-default"  onclick="deleteRow(this); deleteBuilding(this)"/> \n'
									   +'<input type="button" value="取消" class="btn btn-default" onclick="reset(school, buildingTable)"/></td></tr>');
	}
}

function reset(school, tableId) {
	alert(school);
	alert(tableId);
	clearTable(tableId);
	addToBuildingList(school, tableId);
}

function clearTable(tableId) {
	$("#"+tableId + ' tr').remove();
}

function modifyBuilding(t) {
	 /*var request = createRequest();
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	var token = window.sessionStorage.getItem(token);
	var sendData = "_csrf_token=" + token; */
  	var temp = $(t).parent().siblings();
  	building_id = $(temp[0]).attr("id");
  	name = $(temp[0]).text();
    /*url="/admin/level1/building/modify?building_id=" + building_id + "name="+name;
  	request.onreadystatechange = function() {
  		if (request.readyState == 4) {
	    	if (request.status == 200) {
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		var data = output.data;
	    		switch (code) {
	    			case 0:
	    				$(temp[0]).attr("id", data[0].id);
	    				$(temp[0]).attr("name", data[0].name);
	    				break;
	    			case 1:
	    			 	alert("Invalid arguments");
	    			 	break;
	    			case 2:
 						alert("Csrf token check failed");
 						break;
					case -2:
						alert("Admin didn't login.");
						break; // 未登录
					case -10:
						alert("Act beyond authority."); // 非一级管理员
						break;
					case -3:
						alert("School does not exist.");
					case -26:
						alert("School already exists.");
	    		} 
	    	}
	    }
  	};
  	request.open("POST", url, true);
  	request.send(sendData); */
}

function createBuilding(schoolId, f) {
	/*var request = createRequest();
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
	url="/admin/level1/building/create?school_id=" + schoolId + "name="+f.word.name;
 	var token = window.sessionStorage.getItem(token);
	var sendData = "_csrf_token=" + token;
  	request.onreadystatechange = function() {
  		if (request.readyState == 4) {
	    	if (request.status == 200) { */
	    		var responseText = '{"code":0, "data":[{"id":"zzz", "name":"至善园"}]}';
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		switch (code) {
	    			case 0:
	    				var data = output.data;
	    				addToBuildingTable(data[0].id, data[0].name);
	    				break;
	    			case 1:
	    			 	alert("Invalid arguments");
	    			 	break;
	    			case 2:
 						alert("Csrf token check failed");
 						break;
					case -2:
						alert("Admin didn't login.");
						break; // 未登录
					case -10:
						alert("Act beyond authority."); // 非一级管理员
						break;
					case -14:
						alert("School does not exists.");
						break;
	    		}
	    	/*}
	    }
  	};
  	request.open("POST", url, true);
  	request.send(sendData); */
}

function deleteBuilding(t) {
	/*var request = createRequest();
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	var token = window.sessionStorage.getItem(token);
	var sendData = "_csrf_token=" + token;  */
  	var temp = $(t).parent().siblings();
  	building_id = $(temp[0]).attr("id");
  	/*url="/admin/level1/school/delete?school_id="+school_id;
  	request.onreadystatechange = function() {
  		if (request.readyState == 4) {
	    	if (request.status == 200) {
	    		var responseText = request.responseText;
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		switch (code) {
	    			case 0:
	    				break;
	    			case 1:
	    			 	alert("Invalid arguments");
	    			 	break;
	    			case 2:
 						alert("Csrf token check failed");
 						break;
					case -2:
						alert("Admin didn't login.");
						break; // 未登录
					case -10:
						alert("Act beyond authority."); // 非一级管理员
						break;
	    		}
	    	}
	    }
  	};
  	request.open("POST", url, true);
  	request.send(sendData);  */
}

function getBuildingList(school) {
	var responseText = '{"code":0, "data":[{"id":"zhi", "name":"至善园1号"}, {"id":"ming", "name":"明德园7号"}]}';
	var output = JSON.parse(responseText);
	var code = output.code;
	switch (code) {
	    case 0:
	    	return output;
	    	break;
	    case 1:
	    	alert("Invalid arguments");
	    	break;
	   	case 2:
 			alert("Csrf token check failed");
 			break;
		case -2:
			alert("Admin didn't login.");
			break; // 未登录
		case -10:
			alert("Act beyond authority."); // 非一级管理员
			break;
		case -14:
			alert("School does not exist.");
			break;
	}
}

function modfool(f) {
	var request = createRequest();
	var sendData;
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	//request.open("GET", url?x, true); 
  	request.onreadystatechange = function() {
  		if (request.readyState == 4) {
	    	if (request.status == 200) {
	    		//if back-end return true, refresh
	    		//else alert("操作失败");
	    	}
	    }
  	};
}

function modfool(f) {
	var request = createRequest();
	var sendData;
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	//request.open("GET", url?x, true); 
  	request.onreadystatechange = function() {
  		if (request.readyState == 4) {
	    	if (request.status == 200) {
	    		//if back-end return true, refresh
	    		//else alert("操作失败");
	    	}
	    }
  	};
}

function modfool(f) {
	var request = createRequest();
	var sendData;
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	//request.open("GET", url?x, true); 
  	request.onreadystatechange = function() {
  		if (request.readyState == 4) {
	    	if (request.status == 200) {
	    		//if back-end return true, refresh
	    		//else alert("操作失败");
	    	}
	    }
  	};
}

function modfool(f) {
	var request = createRequest();
	var sendData;
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	//request.open("GET", url?x, true); 
  	request.onreadystatechange = function() {
  		if (request.readyState == 4) {
	    	if (request.status == 200) {
	    		//if back-end return true, refresh
	    		//else alert("操作失败");
	    	}
	    }
  	};
}

function sel(f) {  //根据学校选择楼栋
	$(f.buildingSelect).append($('<option>', {
                        value: 0,
                        text: "test"
                    }));
	$('.selectpicker').selectpicker('refresh');
}


function del(f) { // 删除
}

function checkSchool(school, buildingId) {
		if ($(school).val() == -1) {
			$("#" + buildingId).val(-1);
			$("#" + buildingId).attr("disabled", "disabled");
			$('.selectpicker').selectpicker('refresh');
		} else if ($(school).val() != -1) {
			$("#" + buildingId).removeAttr("disabled");
			$("#" + buildingId).selectpicker('refresh');
			addToBuildingList($(school).attr("id"), buildingId);
		}
}

function checkYear(year) {
	if ($(year).val() == -1) {
			$("#quarter").val(-1);
			$("#month").val(-1);
			$("#month").attr("disabled", "disabled");
			$("#quarter").attr("disabled", "disabled");
			$('.selectpicker').selectpicker('refresh');
		} else if ($(year).val() != -1) {
			$("#month").removeAttr("disabled");
			$("#quarter").removeAttr("disabled");
			$('.selectpicker').selectpicker('refresh');
		}
}

function checkBoth(a, b) {
	if ($("#" + a).val() != -1) {
			$("#" + b).attr("disabled", "disabled");
			$('.selectpicker').selectpicker('refresh');
	} else {
		$("#" + b).removeAttr("disabled");
		$('.selectpicker').selectpicker('refresh');
	} 
}

function showSales() {
	var school = $("#school_id");
	var building = $("#building_id");
	var year = $("#year");
	var month = $("#month");
	var quarter = $("#quarter");
	var export__ =	$("#export");
	var str = "";
	if (school.value == -1)
	str = "school=" 
}

function addToTable(f) {
	var temp = f.name;
	var text = $(f.schoolList).val();
 	if (temp.indexOf("manageTable") >= 0) {
	$("#"+temp).find('tbody').append('<tr><td>'+text+'</td><td>'+f.word[0].value
									   +'</td><td>'+f.word[1].value+'</td><td>'+f.word[2].value+'</td><td>'
									   +f.word[3].value+'</td><td><input type="button" value="确认" class="btn btn-default" /> \n'
									   +'<input type="button" value="删除" class="btn btn-default"  onclick="deleteRow(this)"/> \n'
									   +'<input type="button" value="取消" class="btn btn-default" /></td></tr>');
	}
	var length = $("table[name='mainTable']").length;  
  	for (var i = 0; i < length; ++i) {
    	$("table[name='mainTable']").editableTableWidget().numericInputExample().find('td:first').focus();
  	}
}

function deleteRow(t) {
	$(t).parent().parent().remove();
}

// initialize the page
function initPage() {
    pluginsOn();
	getSchoolList();
	var length = $("table[name='mainTable']").length;  
  	for (var i = 0; i < length; ++i) {
    	$("table[name='mainTable']").editableTableWidget().numericInputExample().find('td:first').focus();
  	}
}

function pluginsOn() {
	// bootstrap tab plugins
	$("#myTab a").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });

    //boostrap modal plugins
    $("#deleteOrderBtn").modal({
    	show: false
    });

    $("#finishOrderBtn").modal({
    	show: false
    });
}


