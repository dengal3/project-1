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
									   +'<input type="button" value="取消" class="btn btn-default" onclick="resetSchool()"/></td></tr>');
}

function getSchoolList(cancel) {
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
	    					if (!cancel) {
	    						addToSchoolList(data[i].id, data[i].name);
	    					}
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
		schoolId = $("#" + school).find('option:selected').attr('id');
		var output = getBuildingList(schoolId);
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
	if (newId == null) {
		schoolId = $("#" + school).find('option:selected').attr('id');
		var output = getBuildingList(schoolId);
		var data = output.data;
		for (var i = 0; i < data.length; ++i) {
	    	$("#"+buildingTable).find('tbody').append('<tr><td id="'+ data[i].id + '">' + data[i].name
									   		+'</td><td><input type="button" value="确认" class="btn btn-default" onclick="modifyBuilding(this)"/> \n'
									   		+'<input type="button" value="删除" class="btn btn-default"  onclick="deleteRow(this); deleteBuilding(this)"/> \n'
									   		+'<input type="button" value="取消" class="btn btn-default" onclick="resetBuilding(\'' + school + '\'' + ', ' + '\'' + buildingTable + '\')"/></td></tr>');
		}BB
	} else {
		$("#"+buildingTable).find('tbody').append('<tr><td id="'+ newId + '">' + newName
									   	+'</td><td><input type="button" value="确认" class="btn btn-default" onclick="modifyBuilding(this)"/> \n'
									   	+'<input type="button" value="删除" class="btn btn-default"  onclick="deleteRow(this); deleteBuilding(this)"/> \n'
									   	+'<input type="button" value="取消" class="btn btn-default" onclick="resetBuilding(\'' + school + '\'' + ', ' + '\'' + buildingTable + '\')"/></td></tr>');
	}
}

function resetBuilding(school, tableId) {
	clearTable(tableId);
	addToBuildingTable(school, tableId);
}

function resetSchool() {
	clearTable('schoolTable');
	getSchoolList(1);
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

function refreshBuildingTable(school, buildingTableId) {
	clearTable(buildingTableId);
	alert("ok");
	addToBuildingTable(school, buildingTableId);
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
	    				addToBuildingTable('secondSchool','buildingTable',data[0].id, data[0].name);
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

function getAdmin2ndList() {
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
	    		var responseText = '{"code":0, "data":[{"id":"sun", "name":"戴旋", "username":"gaxpy", "contact_info":"133333333", "school_info":{"id":"zzzz", "name":"广外"}}]}';
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		switch (code) {
	    			case 0:
	    				var data = output.data;
	    				for (var i = 0; i < data.length; ++i) {
	    					addToAdmin2ndTable(data[i].id, data[i].name, data[i].username, data[i].contact_info, data[i].school_info.id, data[i].school_info.name);
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

function addToAdmin2ndTable(id, name, username, contact_info, schoolId, schoolName) {
	$("#managerTable").find('tbody').append('<tr><td id="'+ schoolId + '">' + schoolName + '</td><td>' + name + '</td><td id="'+ id + '">' + username + '</td><td>' + contact_info
									   +'</td><td><input type="button" value="确认" class="btn btn-default" onclick="modifyAdmin2nd(this)"/> \n'
									   +'<input type="button" value="删除" class="btn btn-default"  onclick="deleteRow(this); deleteAdmin2nd(this)"/> \n'
									   +'<input type="button" value="取消" class="btn btn-default" onclick="resetAdmin2nd()"/></td></tr>');
}

function createAdmin2nd(f) {
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
	    		var responseText = '{"code":0, "data":[{"id":"su", "username":"gadpy", "school_info":{"id":"zzzz", "name":"广66"}}]}';
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		var contact_info = f.word[3].value;
	    		var name = f.word[0].value;
	    		switch (code) {
	    			case 0:
	    				var data = output.data;
	    				addToAdmin2ndTable(data[0].id, name, data[0].username, contact_info, data[0].school_info.id, data[0].school_info.name);
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


function modifyAdmin2nd(t) {
    /*var request = createRequest();
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	var token = window.sessionStorage.getItem(token);
	var sendData = "_csrf_token=" + token; */
  	var temp = $(t).parent().siblings();
  	Admin2nd_id = $(temp[0]).attr("id");
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

function deleteAdmin2nd(t) {
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
	getSchoolList(0);
	getAdmin2ndList();
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


