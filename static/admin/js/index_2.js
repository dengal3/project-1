window.onload = initPage();

// initialize the page
function initPage() {
    pluginsOn();
    list_buildings();

    document.getElementById('li_orders').onclick = showOrders;
    document.getElementById('li_replenishment').onclick = showReplenishment;
    document.getElementById('li_total').onclick = showTotal;
    document.getElementById('li_every').onclick = showEvery;
}

function pluginsOn() {
    // bootstrap tab plugins
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    $(function () { $('#myModal').modal({
        keyboard: true
    })});
}

function isArray(arg) {
    if (typeof arg == 'object') {
        var criteria = arg.constructor.toString.match(/array/i);
        return criteria != null;
    }
    return false;
}

function clearTables(text) {
    var tables = document.getElementById(text);
    while (tables.firstChild) {
        tables.removeChild(tables.firstChild);
    }
}

function showOrders() {
    request = createRequest();

    if (request == null) {
        alert('Unable to create request');
    } else {
        var buildId = document.getElementById('build1').firstChild.nodeValue.split('-')[0];
        var url = '/admin/level2/query?get_order_list=' + buildId;

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                clearTables('orders_table_body');
                InsertOrdersContent(data);
            } else {
                alert('Request was unsuccessful: ' + request.status);
            }
        }

        request.open('POST', url, true);
        request.send('_csrf_token=' + window.sessionStorage.getItem('token'));
    }
    
}

function showReplenishment() {
    request = createRequest();

    if (request == null) {
        alert('Unable to create request');
    } else {
        var buildId = document.getElementById('build2').firstChild.nodeValue.split('-')[0];
        var url = '/admin/level2/query?get_inventory_list=' + buildId;

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                clearTables('replenishment_table_body');
                InsertOrdersContent(data);
            } else {
                alert('Request was unsuccessful: ' + request.status);
            }
        }

        request.open('POST', url, true);
        request.send('_csrf_token=' + window.sessionStorage.getItem('token'));
    }
}

function showTotal() {
    request = createRequest();

    if (request == null) {
        alert('Unable to create request');
    } else {
        var url = '/admin/level2/query?get_total_sales=-1';

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                clearTables('total_table_body');
                InsertOrdersContent(data);
            } else {
                alert('Request was unsuccessful: ' + request.status);
            }
        }

        request.open('POST', url, true);
        request.send('_csrf_token=' + window.sessionStorage.getItem('token'));
    }
}

function showEvery() {
    request = createRequest();

    if (request == null) {
        alert('Unable to create request');
    } else {
        var buildId = document.getElementById('build3').firstChild.nodeValue.split('-')[0];
        var url = '/admin/level2/query?get_total_sales=' + buildId;

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                clearTables('every_table_body');
                InsertOrdersContent(data);
            } else {
                alert('Request was unsuccessful: ' + request.status);
            }
        }

        request.open('POST', url, true);
        request.send('_csrf_token=' + window.sessionStorage.getItem('token'));
    }
}

function InsertOrdersContent(json) {
    var ordersDetails = json.data.orders;
    var tableContainer = document.getElementById('orders_table_body');

    for (var order in ordersDetails) {
        var orderInfo = ordersDetails[order];
        var tr = document.createElement('tr');
        tableContainer.appendChild(tr);

        for (var property in orderInfo) {
            var td = document.createElement('td');
            var text;

            if (property == 'released_time') {
                var unixTimestamp = new Date(orderInfo[property] * 1000);
                text = document.createTextNode(unixTimestamp.toLocaleString());
            } else if (property == 'receiver_info') {
                var list = document.createElement('ul');
                list.setAttribute('style', 'list-style: none; padding: 0;');
                for (var info in orderInfo[property]) {
                    var li = document.createElement('li');
                    var pre;
                    if (info == 'name') pre = '姓名：';
                    else if (info == 'location') pre = '地址：';
                    else if (info == 'phone') pre = '电话：';
                    li.appendChild(document.createTextNode(pre + orderInfo[property][info]));
                    list.appendChild(li);
                }
                text = list;
            } else if (property == 'money') {
                text = document.createTextNode(orderInfo[property] + '元');
            } else if (property == 'status') {
                if (orderInfo[property] == 'uncompleted') text = document.createTextNode('未完成');
                else if (orderInfo[property] == 'completed') text = document.createTextNode('已完成');
                else if (orderInfo[property] == 'cancelled') text = document.createTextNode('已取消');
            }
            td.appendChild(text);
            tr.appendChild(td);
        }
    }
}

function InsertRepleContent(json) {
    var repleDetails = json.data.inventory;
    var tableContainer = document.getElementById('replenishment_table_body');

    for (var reple in repleDetails) {
        var repleInfo = repleDetails[reple];
        var tr = document.createElement('tr');
        var td;
        tableContainer.appendChild(tr);

        for (var property in repleInfo) {
            td = document.createElement('td');
            if (property == 'price') {
                var text = document.createTextNode(repleInfo[property] + '元');
            } else if (property == 'quantity') {
                var text = document.createTextNode(repleInfo[property] + '份');
            } else {
                var text = document.createTextNode(repleInfo[property]);
            }
            td.appendChild(text);
            tr.appendChild(td);
        }
        td = document.createElement('td');
        td.appendChild(createInput('replenishInput'));
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(createBtn('replenishBtn'));
        tr.appendChild(td);
    }
}

function InsertTotalContent(json) {
    var allDetails = json.data.total_sales;
    var tableContainer = document.getElementById('total_table_body');
    var tr = document.createElement('tr');
    tableContainer.appendChild(tr);

    for (var money in allDetails) {
        td = document.createElement('td');
        if (money == 'amount') {
            var text = document.createTextNode(allDetails[money] + '份')
        } else if (money == 'money') {
            var text = document.createTextNode(allDetails[money] + '元')
        }
        td.appendChild(text);
        tr.appendChild(td);
    }

}

function InsertEveryContent(json) {
    var allDetails = json.data.total_sales;
    var tableContainer = document.getElementById('every_table_body');

    for (var money in allDetails) {
        td = document.createElement('td');
        if (money == 'amount') {
            var text = document.createTextNode(allDetails[money] + '份')
        } else if (money == 'money') {
            var text = document.createTextNode(allDetails[money] + '元')
        }
        td.appendChild(text);
        tr.appendChild(td);
    }
}

function createBtn(className) {
    var btn = document.createElement('button');
    var text;

    btn.setAttribute('type','submit');
    btn.setAttribute('class','btn');

    text = document.createTextNode('补货');
    btn.appendChild(text);

    btn.onclick = operationBtnFunc;

    return btn;
}

function createInput(className) {
    var input = document.createElement('input');

    input.setAttribute('type', 'text');
    input.setAttribute('class', 'form-control');
    input.setAttribute('name', 'amount');
    input.setAttribute('placeholder', '请输入数量');

    return input;
}

function isDigital(str) {
    if (str.match(/^-?\d+$/) != null) return true;
    return false;
}

function operationBtnFunc() {
    var amount = this.parentNode.parentNode.childNodes[5].firstChild.value;

    if (amount == '' || !isDigital(amount)) {
        alert('Please input a valid positive number');
        this.parentNode.parentNode.childNodes[5].firstChild.value = '';
    } else {
        var origin = parseInt(this.parentNode.parentNode.childNodes[4].firstChild.nodeValue.replace('份', ''));
        origin = origin + parseInt(amount);
        this.parentNode.parentNode.childNodes[4].firstChild.nodeValue = origin+'份';
        this.parentNode.parentNode.childNodes[5].firstChild.value = '';

        request = createRequest();
        if (request == null) {
            alert('Unable to create request');
        } else {
            var url = '/admin/level2/modify_quantity';

            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    var data = JSON.parse(request.responseText);
                } else {
                    alert('Request was unsuccessful: ' + request.status);
                }
            }
            var building_id = document.getElementById('build2').firstChild.nodeValue.split('-')[0];
            var product_id = this.parentNode.parentNode.childNodes[0].firstChild.nodeValue;
            request.open('POST', url, true);
            request.send('_csrf_token=' + window.sessionStorage.getItem('token') + '&' + 'building_id=' + building_id + '&' + 'product_id=' + product_id + '&' + 'quantity=' + parseInt(amount));
        }
    }
}

function buildingChoose() {
    var text = this.innerHTML;
    if (this.className.indexOf('tab1') >= 0) {
        document.getElementById('build1').innerHTML = this.innerHTML;
    } else if (this.className.indexOf('tab2') >= 0) {
        document.getElementById('build2').innerHTML = this.innerHTML;
    } else if (this.className.indexOf('tab3') >= 0) {
        document.getElementById('build3').innerHTML = this.innerHTML;
    }
}

function list_buildings() {
    request = createRequest();

    if (request == null) {
        alert('Unable to create request');
    } else {
        var url = '/admin/level2/query?get_building_list=1';

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                clearModals();
                InsertModals(data);
            } else {
                alert('Request was unsuccessful: ' + request.status);
            }
        }

        request.open('POST', url, true);
        request.send('_csrf_token=' + window.sessionStorage.getItem('token'));
    }
}

function clearModals() {
    var btns = $('.modal-body button');
    for (var i = 0; i < btns.length; ++i) {
        btns[i].remove();
    }
}

function InsertModals(json) {
    var allBuildings = json.data.buildings;

    var modals = $('.modal-body');
    for (var i = 0; i < modals.length; ++i) {
        for (var build in buildings) {
            var buildInfo = buildings[build];
            var text = '';
            for (var property in buildInfo) {
                if (property == 'id') {
                    text += buildInfo[property];
                    text += '-'
                } else if (property == 'name') {
                    text += buildInfo[property];
                }
            }
            var btn = document.createElement('button');
            modals[i].appendChild(btn);

            btn.setAttribute('type', 'button');
            var className = 'btn btn-link chooseBuild tab' + (i+1);
            btn.setAttribute('class', className);
            btn.setAttribute('data-dismiss', 'modal');

            btn.appendChild(document.createTextNode(text));
            btn.onclick = buildingChoose;
        }
    }
}
