

function FCFS() {
    const arrivalTimeArray = getInputNumbers("arrivaltime");
    const burstTimeArray = getInputNumbers("bursttime");
    console.log(arrivalTimeArray);
    const arrivalLen = arrivalTimeArray.length;
    const burstLen = burstTimeArray.length;
    if (!arrivalLen)
        return errorMessage("Arrival time cannot be blank.");
    else if (!burstLen)
        return errorMessage("Burst time cannot be blank.");
    else if (burstTimeArray.some(el => el === 0))
        return errorMessage("0 as burst time is invalid.");
    else if (arrivalLen != burstLen)
        return errorMessage("The number of arrival times and burst times does not match.");
    else if (arrivalTimeArray.some(el => el < 0))
        return errorMessage("Negative numbers can be valid for arrival times.");
    else if (burstTimeArray.some(el => el < 0))
        return errorMessage("Negative numbers can be valid for burst times.");
    let inputArray = arrivalTimeArray.map((arrival, index) => [arrival, burstTimeArray[index]]);
    FCFSSOLVE(inputArray);
}






class Process1 {
    constructor(processNumber, arrivalTime, burstTime) {
        this.waitingTime = 0;
        this.completionTime = 0;
        this.turnAroundTime = 0;
        this.burstTime = burstTime;
        this.arrivalTime = arrivalTime;
        this.tempburstTime = burstTime;
        this.processNumber = processNumber;
    }
}

function FCFSSOLVE(inputArray) {
    const processArray = [];
    var arrayLen = inputArray.length, t = 0, ch = 0;
    var avgturnAroundTime = 0, avgwaitingTime = 0;
    for (var i = 0; i < arrayLen; i++) {
        const process = new Process1(i + 1, inputArray[i][0], inputArray[i][1]);
        processArray.push(process);
    }
    sortArray(processArray, 'arrivalTime');
    const grantChart = document.querySelector(".GrantChart");
    if (grantChart) {
        while (grantChart.firstChild) {
            grantChart.removeChild(grantChart.firstChild);
        }
        grantChart.innerHTML = "";
    }
    var blankSpace = false;
    var firstBlankSpace = true;
    for (var i = 0; i < arrayLen; i++) {
        if (t >= processArray[i].arrivalTime) {
            if (blankSpace && !firstBlankSpace)
                printGrantChartN("-", t);
            firstBlankSpace = false;
            t += processArray[i].burstTime;
            processArray[i].completionTime = t;
            processArray[i].turnAroundTime = processArray[i].completionTime - processArray[i].arrivalTime;
            avgturnAroundTime += processArray[i].turnAroundTime;
            processArray[i].waitingTime += processArray[i].turnAroundTime - processArray[i].burstTime;
            avgwaitingTime += processArray[i].waitingTime;
            printGrantChartN(processArray[i].processNumber, processArray[i].completionTime);
            blankSpace = false;
        }
        else {
            blankSpace = true;
            i--;
            t++;
        };
    }
    const data = processArray;
    tablePrint(data, avgturnAroundTime, avgwaitingTime, "FCFS");
}

