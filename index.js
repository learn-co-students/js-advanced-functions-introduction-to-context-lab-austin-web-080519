function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployees(arrayOfArrays) {
   return arrayOfArrays.map(function(array) {
       return createEmployeeRecord(array);
   })
}

function createTimeInEvent(record, dateStamp) {
    let timeInObject = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
    record.timeInEvents.push(timeInObject);
    return record;
}

function createTimeOutEvent(record, dateStamp) {
    let timeOutObject = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
    record.timeOutEvents.push(timeOutObject);
    return record;
}

function hoursWorkedOnDate(record, date) {
    let timeInObject = record.timeInEvents.find(function(object) {
       return object.date === date;
    })
    let timeOutObject = record.timeOutEvents.find(function(object) {
        return object.date === date;
    })
    return (timeOutObject.hour - timeInObject.hour)/100
}

function wagesEarnedOnDate(record, date) {
    let hours = hoursWorkedOnDate(record, date);
    return hours * record.payPerHour;
}

function allWagesFor(record) {
    return record.timeInEvents.reduce( (total, timeEvent) => {
        return total + wagesEarnedOnDate(record, timeEvent.date)
    }, 0)
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map( array => {
        return createEmployeeRecord(array);
    })
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find( record => {
        return record.firstName === firstName
    })
}

function calculatePayroll(recordsArray) {
    return recordsArray.reduce( (total, record) => {
        return total + allWagesFor(record);
    }, 0)
}