function getInputNumbers(id) {
    return document.getElementById(id).value
        .split(" ")
        .map(function (val) {
            return parseInt(val);
        })
        .filter(function (val) {
            return !isNaN(val);
        });
}

function sortArray(processArray, criteria) {
    processArray.sort(function (a, b) {
        if (criteria === 'arrivalTime') {
            if (a.arrivalTime !== b.arrivalTime)
                return a.arrivalTime - b.arrivalTime;
            else
                return a.processNumber - b.processNumber;
        }
        else if (criteria === 'priority') {
            if (a.priority !== b.priority)
                return a.priority - b.priority;
            else if (a.arrivalTime !== b.arrivalTime)
                return a.arrivalTime - b.arrivalTime;
            else
                return a.processNumber - b.processNumber;
        }
        else if (criteria === 'burstTime') {
            if (a.burstTime !== b.burstTime)
                return a.burstTime - b.burstTime;
            else if (a.arrivalTime !== b.arrivalTime)
                return a.arrivalTime - b.arrivalTime;
            else
                return a.processNumber - b.processNumber;
        }
        else {
            console.error('Invalid sorting criteria');
        }
    });
}

function printGrantChartN(processNumber, completionTime) {
    let parentDiv = document.getElementsByClassName("GrantChart")[0];
    let newDivA = document.createElement("div");
    newDivA.className = "A";
    let newDivB = document.createElement("div");
    newDivB.className = "B";
    console.log(processNumber);
    if (processNumber != "-")
        newDivB.innerHTML = convertToAlphabet(processNumber);
    else
        newDivB.innerHTML = "-";
    let newSpan = document.createElement("span");
    newSpan.className = "number";
    newSpan.innerHTML = completionTime;
    newDivB.appendChild(newSpan);
    newDivA.appendChild(newDivB);
    parentDiv.appendChild(newDivA);
}


function tablePrint(data, avgturnAroundTime, avgwaitingTime, name) {
    const table = document.getElementById("myTable");
    table.classList.add("ShowTable");
    const rowsCount = table.rows.length;
    for (let i = 1; i < rowsCount; i++)
        table.deleteRow(1);
    const aname = document.getElementById("algoname");
    aname.innerHTML = name;
    for (var i = 0; i < data.length; i++) {
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        cell1.innerHTML = convertToAlphabet(data[i].processNumber);
        cell2.innerHTML = data[i].arrivalTime;
        cell3.innerHTML = data[i].tempburstTime;
        cell4.innerHTML = data[i].completionTime;
        cell5.innerHTML = data[i].turnAroundTime;
        cell6.innerHTML = data[i].waitingTime;
    }
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell5.innerHTML = `${avgturnAroundTime} / ${data.length} = ${(avgturnAroundTime / data.length).toFixed(3)}`;
    cell6.innerHTML = `${avgwaitingTime} / ${data.length} = ${(avgwaitingTime / data.length).toFixed(3)}`;
}

function errorMessage(error) {
    var pop = document.getElementById("popup");
    var meesage = document.getElementById("errormessage");
    meesage.innerHTML = error;
    pop.classList.add('show');
}


function convertToAlphabet(num) {
    let numToAlphabet = {
        1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "F", 7: "G", 8: "H", 9: "I", 10: "J",
        11: "K", 12: "L", 13: "M", 14: "N", 15: "O", 16: "P", 17: "Q", 18: "R", 19: "S", 20: "T",
        21: "U", 22: "V", 23: "W", 24: "X", 25: "Y", 26: "Z"
    };
    let tens = Math.floor(num / 26);
    let units = num % 26 || 26;
    let result = "";
    if (tens > 0) {
        result += tens;
    }
    result += numToAlphabet[units];
    return result;
}


function printGrantChart(grantChartArray) {
    for (var i = 0; i < grantChartArray.length - 1; i++) {
        while (i < grantChartArray.length - 1 && grantChartArray[i][0] == grantChartArray[i + 1][0])
            i++;
        let parentDiv = document.getElementsByClassName("GrantChart")[0];
        let newDivA = document.createElement("div");
        newDivA.className = "A";
        let newDivB = document.createElement("div");
        newDivB.className = "B";
        console.log(grantChartArray[i][0]);
        if (grantChartArray[i][0] != "-")
            newDivB.innerHTML = convertToAlphabet(grantChartArray[i][0]);
        else
            newDivB.innerHTML = "-";
        let newSpan = document.createElement("span");
        newSpan.className = "number";
        newSpan.innerHTML = grantChartArray[i][1];
        newDivB.appendChild(newSpan);
        newDivA.appendChild(newDivB);
        parentDiv.appendChild(newDivA);
    }
}
