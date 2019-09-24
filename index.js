// Your code here

class Employee {
    constructor(firstName, familyName, title, payPerHour, timeInEvents = [], timeOutEvents = []) {
        this.firstName = firstName;
        this.familyName = familyName;
        this.title = title;
        this.payPerHour = payPerHour;
        this.timeInEvents = timeInEvents;
        this.timeOutEvents = timeOutEvents;
    }
}

class TimeEvent {
    constructor(date, hour, type) {
        this.date = date;
        this.hour = parseInt(hour);
        this.type = type
    }
}

function createEmployeeRecord(array) {
    return new Employee(array[0], array[1], array[2], array[3])
}

function createEmployees(arrayOfArrays) {
    return arrayOfArrays.map( (record) => {
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent(employee, dateTime) {
    let dateTimeArray = dateTime.split(' ')
    let newEvent = new TimeEvent(dateTimeArray[0], dateTimeArray[1], 'TimeIn')
    employee.timeInEvents.push(newEvent)
    return employee
}

function createTimeOutEvent(employee, dateTime) {
    let dateTimeArray = dateTime.split(' ')
    let newEvent = new TimeEvent(dateTimeArray[0], dateTimeArray[1], 'TimeOut')
    employee.timeOutEvents.push(newEvent)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    const findFunc = element => element.date === date
    let dateIndex = employee.timeInEvents.findIndex(findFunc)
    let timeIn = employee.timeInEvents[dateIndex].hour
    let timeOut = employee.timeOutEvents[dateIndex].hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date)
    return hours * employee.payPerHour
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce( (accumulator, cv) => {
        return accumulator + wagesEarnedOnDate(employee, cv.date)
    }, 0)
}

function calculatePayroll(employees) {
    return employees.reduce( (accumulator, employee) => {
        return accumulator + allWagesFor(employee)
    }, 0)
}

function createEmployeeRecords(array) {
    return createEmployees(array)
}

function findEmployeeByFirstName(emps, name) {
    const findFunc = (cv) => name === cv.firstName
    return emps.find(findFunc)
}