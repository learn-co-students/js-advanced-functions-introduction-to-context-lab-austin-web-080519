// Your code here
function createEmployeeRecord(arr){
    let record = {};
    record['firstName'] = arr[0];
    record['familyName'] = arr[1];
    record['title'] = arr[2];
    record['payPerHour'] = arr[3];
    record['timeInEvents'] = [];
    record['timeOutEvents'] = [];
    return record;
}

function createEmployees(arrs){
    return arrs.map(arr => createEmployeeRecord(arr))
}

function createTimeInEvent(obj, date){
    let timein = {};
    timein['type'] = "TimeIn";
    timein['date'] = date.split(" ")[0];
    timein['hour'] = parseInt(date.split(" ")[1]);
    obj['timeInEvents'].push(timein);
    return obj;
}

function createTimeOutEvent(obj, date){
    let timeout = {};
    timeout['type'] = "TimeOut";
    timeout['date'] = date.split(" ")[0];
    timeout['hour'] = parseInt(date.split(" ")[1]);
    obj['timeOutEvents'].push(timeout);
    return obj;
}

function hoursWorkedOnDate(obj, date){
    let timein = obj['timeInEvents'].find(e => e['date'] === date);
    let timeout = obj['timeOutEvents'].find(e => e['date'] === date);
    return (timeout['hour'] - timein['hour'])/100; 
}

function wagesEarnedOnDate(obj, date){
    return hoursWorkedOnDate(obj, date) * obj['payPerHour']; 
}

function allWagesFor(obj){
    let dates = obj['timeInEvents'].map(e => e['date']);
    let total = dates.reduce(((sum, d) => sum += wagesEarnedOnDate(obj, d)), 0);
    return total;
}

function allWagesFor(obj){
    let dates = obj['timeInEvents'].map(e => e['date']);
    let total = dates.reduce(((sum, d) => sum += wagesEarnedOnDate(obj, d)), 0);
    return total;
}

function calculatePayroll(arr){
    return arr.reduce(((sum, rec) => sum += allWagesFor(rec)), 0);
}

function createEmployeeRecords(arrs){
    return arrs.map(arr => createEmployeeRecord(arr))
}

function findEmployeeByFirstName(arr, name){
    let rx = new RegExp(`^${name}$`, 'i')
    let emp = arr.find(e => e.firstName.match(rx));
    return emp;
}