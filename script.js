const rootelement = document.querySelector("#root");
const inputContainer = document.querySelector(".container");

let dragindex = 0;
let dropindex = 0;
let clone = "";

// Created Table with given rows and columns
function createTable({ rows, columns, rowType, columnType }) {
    inputContainer.style.display = "none";
    rows = rows + 1;
    columns = columns + 1;

    let tableElement = document.createElement("table");
    
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        let rowElement = document.createElement("tr");
        let dataElement = "";
        for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
            if (rowIndex === 0 && columnIndex === 0) {
                dataElement = "<td class='header-element'></td>";
            } else {
                if (rowIndex === 0) {
                    if (columnType === "numeric") {
                        dataElement = `<td class='header-element'>${columnIndex}</td>`;
                    } else {
                        charCodeValue = columnIndex + 64;
                        dataElement = `<td class='header-element'>${String.fromCharCode(charCodeValue)}</td>`;
                    }
                } else {
                    if (columnIndex === 0) {
                        if (rowType === "alphabet") {
                        charCodeValue = rowIndex + 64;
                        dataElement = `<td class='header-element'>${String.fromCharCode(charCodeValue)}</td>`;
                        } else {
                        dataElement = `<td class='header-element'>${rowIndex}</td>`;
                        }
                    } else {
                        dataElement = `<td class="circle-button" id="cell-${rowIndex}${columnIndex}" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" ondragover="allowDrop(event)" style="text-align:center;">${rowIndex}${columnIndex}</td>`;
                    }
                }
            }
            rowElement.insertAdjacentHTML("beforeend", dataElement);
        }
        tableElement.appendChild(rowElement);
    }
    rootelement.innerHTML = "";
    rootelement.appendChild(tableElement);
}

function addEventsToCircles() {
    var dataElements = document.getElementsByClassName("circle-button");
    for (var i = 0; i < dataElements.length; i++) {
        dataElements[i].addEventListener(
        "click",
        function (event) {
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);
            event.target.style.backgroundColor = "#" + randomColor;
        },
        false
        );
    }
}

function drag(event) {
    event.dataTransfer.setData("circle", event.target.id);
}

function drop(event) {
    event.preventDefault();
    clone = event.target.cloneNode(true);
    let data = event.dataTransfer.getData("circle");
    let tableChildren = document.getElementById("root").children[0].childNodes;
    for (let tableRowIndex = 0; tableRowIndex < tableChildren.length; tableRowIndex++) {
        let tableRowDataElements = document.getElementById("root").children[0].childNodes[tableRowIndex].cells;
        for (let tableRowDataElement = 0; tableRowDataElement < tableRowDataElements.length; tableRowDataElement++) {
        if (tableRowDataElements[tableRowDataElement].id == data) {
            dragIndex = tableRowDataElement;
            rowIndex = tableRowIndex;
        }
        }
    }

    event.target.parentElement.replaceChild(document.getElementById(data), event.target);
    document
        .getElementById("root")
        .children[0].childNodes[rowIndex].insertBefore(
        clone,
        document.getElementById("root").children[0].childNodes[rowIndex].cells[dragIndex]
        );
        addEventsToCircles();
}

function allowDrop(event) {
    event.preventDefault();
}

window.addEventListener("load", () => {
    const formElement = document.querySelector("#main-form");
    formElement.addEventListener("submit", function (event) {
        event.preventDefault();
        const rowNumber = document.querySelector("#rowNumber").value;
        const columnNumber = document.querySelector("#columnNumber").value;
        const rowType = document.querySelector("#rowType").value;
        const columnType = document.querySelector("#columnType").value;
        if (rowNumber <= 26 && columnNumber <= 26) {
            createTable({
                rows: parseInt(rowNumber),
                columns: parseInt(columnNumber),
                columnType: columnType,
                rowType: rowType,
            });
        }
        addEventsToCircles();
    });
});
