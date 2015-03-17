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
	$("table[name='mainTable']").editableTableWidget().numericInputExample().find('td:first').focus();
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
		}
	} else {
		$("#"+buildingTable).find('tbody').append('<tr><td id="'+ newId + '">' + newName
									   	+'</td><td><input type="button" value="确认" class="btn btn-default" onclick="modifyBuilding(this)"/> \n'
									   	+'<input type="button" value="删除" class="btn btn-default"  onclick="deleteRow(this); deleteBuilding(this)"/> \n'
									   	+'<input type="button" value="取消" class="btn btn-default" onclick="resetBuilding(\'' + school + '\'' + ', ' + '\'' + buildingTable + '\')"/></td></tr>');
	}
	$("table[name='mainTable']").editableTableWidget().numericInputExample().find('td:first').focus();
}

function resetBuilding(school, tableId) {
	clearTable(tableId);
	addToBuildingTable(school, tableId);
}

function resetSchool() {
	clearTable('schoolTable');
	getSchoolList(1);
}

function resetAdmin2nd() {
	clearTable('managerTable');
	getAdmin2ndList();
}

function resetCat1() {
	clearTable('cat1Table');
	getCat1List();
}

function resetCat2() {
	clearTable('cat2Table');
	getAdmin2ndList();
}

function clearTable(tableId) {
	$("#"+tableId + ' tbody tr').remove();
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
	    		var responseText = '{"code":0, "data":[{"id":"sun", "name":"戴旋", "username":"邓霭霖", "contact_info":"133333333", "school_info":{"id":"zzzz", "name":"广外"}}]}';
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		switch (code) {
	    			case 0:
	    				var data = output.data;
	    				var password = "";
	    				for (var i = 0; i < data.length; ++i) {
	    					addToAdmin2ndTable(data[i].id, data[i].name, data[i].username, password, data[i].contact_info, data[i].school_info.id, data[i].school_info.name);
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

function addToAdmin2ndTable(id, name, username, password, contact_info, schoolId, schoolName) {
	$("#managerTable").find('tbody').append('<tr><td id="'+ schoolId + '">' + schoolName + '</td><td id="'+ id + '">' + name + '</td><td>' + username + '</td><td>' + password + '</td><td>' + contact_info
									   +'</td><td><input type="button" value="确认" class="btn btn-default" onclick="modifyAdmin2nd(this)"/> \n'
									   +'<input type="button" value="删除" class="btn btn-default"  onclick="deleteRow(this); deleteAdmin2nd(this)"/> \n'
									   +'<input type="button" value="取消" class="btn btn-default" onclick="resetAdmin2nd()"/></td></tr>');
	$("table[name='mainTable']").editableTableWidget().numericInputExample().find('td:first').focus();
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
	    		var username = f.word[1].value;
	    		var password = f.word[2].value;
	    		var name = f.word[0].value;
	    		var contact_info = f.word[3].value;
	    		var school_id = $(f).find('option:selected').attr('id');
	    		switch (code) {
	    			case 0:
	    				var data = output.data;
	    				var password = "";
	    				addToAdmin2ndTable(data[0].id, name, data[0].username, password, contact_info, data[0].school_info.id, data[0].school_info.name);
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
					case -18:
						alert("Admin already exists.");
						break;
					case -19:
						 alert(" School already has an admin.");
						 break;
	    		}
	    	/*}
		}
  	};
  	url = "/admin/level1/admin_2nd/create?username=" + username + "password=" + password + "name=" + name + "contact_info=" + contact_info;
  	if (school_id != null) {
	url = url + "school_id=" +school_id;
  	}
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
  	var school_id = $(temp[0]).attr("id");
  	var name = $(temp[1]).text();
  	var contact_info = $(temp[4]).text();
  	var username = $(temp[2]).text();
  	var password = $(temp[3]).text();
  	var admin_id = $(temp[1]).attr('id');
  	if (password == "") {
  		password = null;
  	}
  	if (school_id == "") {
  		school_id = null;
  	}

    /*url="/admin/level1/admin_2nd/modify?admin_id=" + admin_id + "username=" + username + "password=" + password + "name=" + name + "contact_info=" + contact_info + "school_id=" + school_id;
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
  	admin_id = $(temp[1]).attr("id");
  	/*url="/admin/level1/admin_2nd/delete?admin_id=" + admin_id;
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
	    		var responseText = '{"code":0, "data":[{"id":"sun", "name":"戴旋", "username":"邓霭霖", "contact_info":"133333333", "school_info":{"id":"zzzz", "name":"广外"}}]}';
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		switch (code) {
	    			case 0:
	    				var data = output.data;
	    				var password_ = "";
	    				for (var i = 0; i < data.length; ++i) {
	    					addToAdmin2ndTable(data[i].id, data[i].name, data[i].username, password_, data[i].contact_info, data[i].school_info.id, data[i].school_info.name);
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

function getAdmin3rdList(school_id) {
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
	    		var responseText = '{"code":0, "data":[{"id":"sun", "name":"戴旋", "username":"邓霭霖", "contact_info":"133333333", "school_info":{"id":"zzzz", "name":"广外"}, "building_info":{"id":"z", "name":"至善园"}}]}';
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		switch (code) {
	    			case 0:
	    				var data = output.data;
	    				var password = "";
	    				for (var i = 0; i < data.length; ++i) {
	    					addToAdmin3rdTable(data[i].id, data[i].name, data[i].username, password, data[i].contact_info, data[i].school_info.id, data[i].school_info.name,data[i].building_info.id, data[i].building_info.name);
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

function addToAdmin3rdTable(id, name, username, password, contact_info, schoolId, schoolName, buildingId, buildingName) {
	$("#hostTable").find('tbody').append('<tr><td id="'+ schoolId + '">' + schoolName + '</td><td id="'+ buildingId + '">' + buildingName +'</td><td id="'+ id + '">' + name + '</td><td>' 
									   		+ username + '</td><td>' + password + '</td><td>' + contact_info
									   		+'</td><td><input type="button" value="确认" class="btn btn-default" onclick="modifyAdmin2nd(this)"/> \n'
									   		+'<input type="button" value="删除" class="btn btn-default"  onclick="deleteRow(this); deleteAdmin2nd(this)"/> \n'
									   		+'<input type="button" value="取消" class="btn btn-default" onclick="resetAdmin2nd()"/></td></tr>');
	$("table[name='mainTable']").editableTableWidget().numericInputExample().find('td:first').focus();
}

function createAdmin3rd(f) {
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
	    		var responseText = '{"code":0, "data":[{"id":"su", "username":"gadpy", "school_info":{"id":"zzzz", "name":"广66"}, "building_info":{"id":"z", "name":"至善园"}}]}';
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		var username = f.word[1].value;
	    		var password = f.word[2].value;
	    		var name = f.word[0].value;
	    		var contact_info = f.word[3].value;
	    		var school_id = $(f).find('option:selected').attr('id');
	    		switch (code) {
	    			case 0:
	    				var data = output.data;
	    				var password_ = "";
	    				addToAdmin3rdTable(data[0].id, name, data[0].username, password_, contact_info, data[0].school_info.id, data[0].school_info.name, data[0].building_info.id, data[0].building_info.name);
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
					case -18:
						alert("Admin already exists.");
						break;
					case -19:
						 alert(" School already has an admin.");
						 break;
	    		}
	    	/*}
		}
  	};
  	url = "/admin/level1/admin_3nd/create?username=" + username + "password=" + password + "name=" + name + "contact_info=" + contact_info;
  	if (school_id != null) {
	url = url + "school_id=" +school_id;
  	}
  	request.open("POST", url, true);
  	request.send(sendData); */
}

function refreshAdmin3rdTable(school, tableId) {
	clearTable(tableId);
	getAdmin3rdList(school);
}

function modifyAdmin3rd(t) {
    /*var request = createRequest();
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	var token = window.sessionStorage.getItem(token);
	var sendData = "_csrf_token=" + token; */
  	var temp = $(t).parent().siblings();
  	var school_id = $(temp[0]).attr("id");
  	var name = $(temp[2]).text();
  	var contact_info = $(temp[5]).text();
  	var username = $(temp[3]).text();
  	var password = $(temp[4]).text();
  	var admin_id = $(temp[2]).attr('id');
  	if (password == "") {
  		password = null;
  	}
  	if (school_id == "") {
  		school_id = null;
  	}

    /*url="/admin/level1/admin_3nd/modify?admin_id=" + admin_id + "username=" + username + "password=" + password + "name=" + name + "contact_info=" + contact_info + "school_id=" + school_id;
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

function deleteAdmin3rd(t) {
	/*var request = createRequest();
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	var token = window.sessionStorage.getItem(token);
	var sendData = "_csrf_token=" + token;  */
  	var temp = $(t).parent().siblings();
  	admin_id = $(temp[2]).attr("id");
  	/*url="/admin/level1/admin_3nd/delete?admin_id=" + admin_id;
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

function getCat1List() {
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
	    		var responseText = '{"code":0, "data":[{"id":"sunn", "name":"交通"}]}';
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		switch (code) {
	    			case 0:
	    				var data = output.data;
	    				var password_ = "";
	    				for (var i = 0; i < data.length; ++i) {
	    					addToCat1Table(data[i].id, data[i].name);
	    					addToCat1List(data[i].id, data[i].name);
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
  	//url = "/admin/level1/cat1/get_list";
  	//request.open("POST", url, true);
  	//request.send(sendData);
}

function addToCat1Table(id, name) {
	$("#cat1Table").find('tbody').append('<tr><td id="'+ id + '">' + name
									   +'</td><td><input type="button" value="确认" class="btn btn-default" onclick="modifyCat1(this)"/> \n'
									   +'<input type="button" value="删除" class="btn btn-default"  onclick="deleteRow(this); deleteCat1(this)"/> \n'
									   +'<input type="button" value="取消" class="btn btn-default" onclick="resetCat1()"/></td></tr>');
}

function addToCat1List(id, name) {
	$("#cat1List").append('<option id="' + id + '">' + name + '</option>');  //$ important!!!  因为append是jquery的
	$('.selectpicker').selectpicker('refresh');
}

function createCat1(f) {
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
	    		var responseText = '{"code":0, "data":[{"id":"s", "name":"游戏"}]}';
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		var name = f.word.value;
	    		switch (code) {
	    			case 0:
	    				var data = output.data;
	    				addToCat1Table(data[0].id, name);
	    				addToCat1List(data[0].id, name);
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
					case -18:
						alert("Admin already exists.");
						break;
					case -19:
						 alert(" School already has an admin.");
						 break;
	    		}
	    	/*}
		}
  	};
  	url = "/admin/level1/cat1/create?name=" + name;
  	if (school_id != null) {
	url = url + "school_id=" +school_id;
  	}
  	request.open("POST", url, true);
  	request.send(sendData); */

}

function deleteCat1(t) {
	/*var request = createRequest();
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	var token = window.sessionStorage.getItem(token);
	var sendData = "_csrf_token=" + token;  */
  	var temp = $(t).parent().siblings();
  	cat1_id = $(temp[0]).attr("id");
  	/*url="/admin/level1/cat1/delete?admin_id=" + admin_id;
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

function getCat2List(cat1_id) {
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
	    		var responseText = '{"code":0, "data":[{"id":"sunn", "name":"交通"}]}';
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		switch (code) {
	    			case 0:
	    				var data = output.data;
	    				var password_ = "";
	    				for (var i = 0; i < data.length; ++i) {
	    					addToCat2Table(data[i].id, data[i].name);
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
  	//url = "/admin/level1/cat2/get_list";
  	//request.open("POST", url, true);
  	//request.send(sendData);
}

function refreshCat2Table(cat1, cat2TableId) {
	clearTable(cat2TableId);
	getCat2List(cat1);
}


function addToCat2Table(id, name) {
	$("#cat2Table").find('tbody').append('<tr><td id="'+ id + '">' + name
									   +'</td><td><input type="button" value="确认" class="btn btn-default" onclick="modifyCat1(this)"/> \n'
									   +'<input type="button" value="删除" class="btn btn-default"  onclick="deleteRow(this); deleteCat1(this)"/> \n'
									   +'<input type="button" value="取消" class="btn btn-default" onclick="resetCat1()"/></td></tr>');
}

function createCat2(f) {
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
	    		var responseText = '{"code":0, "data":[{"id":"s", "name":"游戏"}]}';
	    		var output = JSON.parse(responseText);
	    		var code = output.code;
	    		var name = f.word.value;
	    		switch (code) {
	    			case 0:
	    				var data = output.data;
	    				addToCat2Table(data[0].id, name);
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
					case -18:
						alert("Admin already exists.");
						break;
					case -19:
						 alert(" School already has an admin.");
						 break;
	    		}
	    	/*}
		}
  	};
  	url = "/admin/level1/cat2/create?name=" + name;
  	if (school_id != null) {
	url = url + "school_id=" +school_id;
  	}
  	request.open("POST", url, true);
  	request.send(sendData); */

}

function deleteCat2(t) {
	/*var request = createRequest();
	if (request == null) {
    	alert("Unable to create request");
    	return;
  	}
  	var token = window.sessionStorage.getItem(token);
	var sendData = "_csrf_token=" + token;  */
  	var temp = $(t).parent().siblings();
  	cat2_id = $(temp[0]).attr("id");
  	/*url="/admin/level1/cat2/delete?admin_id=" + admin_id;
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

function deleteRow(t) {
	$(t).parent().parent().remove();
}

// initialize the page
function initPage() {
    pluginsOn();
	getSchoolList(0);
	getCat1List();
	getAdmin2ndList();
	getCat1List();
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


