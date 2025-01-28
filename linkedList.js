class TwoWayLinkedList {
    constructor(id) {
        this.id = id;

        this._startNode = null;
        this._endNode = null; // 아마 필요 없을 수도?

        this.resultBundles = []; // [][]

        // this.row = 2;
        // this.col = 4;
    }

    set startNode(node) { this._startNode = node; }
    get startNode() { return this._startNode; }

    connectHorizontally(leftNode, rightNode) { // leftNode -> rightNode
        leftNode.right = rightNode;
    }

    connectVertically(overNode, underNode) { // overNode -> underNode
        overNode.under = underNode;
    }

    searchNode(nodeId) {
        if (this._startNode) {
            let rowNode = this._startNode;

            while (rowNode) {
                let currentNode = rowNode;

                while (currentNode) {
                    if (currentNode.id === nodeId) {
                        return currentNode;
                    }
                    currentNode = currentNode.right;
                }
                rowNode = rowNode.under; // next row
            }

            return null;
        }

        return null;
    }

    nodeSetting(node = []) {
        node.forEach((rowNode, row_i) => {
            let prevNode = null;
            rowNode.forEach((currentNode, col_i) => {
                if (this.startNode === null) {
                    this.startNode = currentNode;
                    // currentRowStart = currentNode;
                }

                if (prevNode) { // cell 행 연결
                    this.connectHorizontally(prevNode, currentNode);
                }

                if (row_i > 0) {
                    // const temp = this.searchNode(`cell_${row_i - 1}_${col_i}`)
                    // console.log(temp.id);
                    this.connectVertically(this.searchNode(`cell_${row_i - 1}_${col_i}`), currentNode);
                }

                prevNode = currentNode;
            });
        });
    }

    setResultBundles() {
        if (this._startNode) {
            let rowStartNode = this._startNode;

            while (rowStartNode) {
                let currentNode = rowStartNode;
                while (currentNode) {
                    const connectedNode = [];
                    if (currentNode.status) {
                        connectedNode.push(this.checkConnectedNode(currentNode));
                    }
                    this.resultBundles.push(connectedNode);
                    currentNode = currentNode.right;
                }
                rowStartNode = rowStartNode.under; // next row
            }

            console.log(this.resultBundles);
        }
    }

    checkConnectedNode(node) {
        if (node.right) {
            this.checkConnectedNode(node.right);
        }
        if (node.under) {
            this.checkConnectedNode(node.under);
        }
        return node.value;
    }

    printAllId() {
        if (this._startNode) {
            let rowStartNode = this._startNode;

            while (rowStartNode) {
                let currentNode = rowStartNode;
                while (currentNode) {
                    console.log(currentNode.id);
                    currentNode = currentNode.right;
                }
                rowStartNode = rowStartNode.under; // next row
            }

            return null;
        }

        return null;
    }
}



class Cell {
    constructor(id) {
        this._id = id;
        this._status = false; // boolean
        this._value = undefined; // clicked status

        this._right = null;
        this._under = null;
        // this.left = null;
        // this.top = null;
    }
    get id() { return this._id; }

    set right(cell) { this._right = cell; }
    get right() { return this._right }
    set under(cell) { this._under = cell; }
    get under() { return this._under; }

    get value() { return this._value; }
    set value(data) { this._value = data; }

    changeStatus() { this._status = !this._status; }
    get status() { return this._status; }
}

const nodes = [
    [new Cell("cell_0_0"), new Cell("cell_0_1"), new Cell("cell_0_2")],
    [new Cell("cell_1_0"), new Cell("cell_1_1"), new Cell("cell_1_2")]
];

const list = new TwoWayLinkedList("example");
list.nodeSetting(nodes);
// list.printAllId();
let current = list.startNode;
while (current) {
    let row = current;
    let rowStr = '';
    while (row) {
        rowStr += row.id + ' ';
        row = row._right;
    }
    console.log(rowStr);
    current = current._under;
}


/*
    Singly Linked List 원리로 카르노 맵 구성
    우측과 아래 탐색

*/

/*
    이하 - 알고리즘
*/

// const shuffle = (len) => {
//     const result = [];
//     const boolShuffler = (oneEvent = []) => {
//         const boolType = [0, 1];
//         if (oneEvent.length === len) {
//             result.push(oneEvent);
//             return;
//         } else {
//             boolType.forEach((bool) => {
//                 const eventStorage = [...oneEvent, bool];
//                 boolShuffler(eventStorage);
//             });
//         }
//     }
//     boolShuffler();
//     return result;
// }


// const r = shuffle();

// const gray = (binary) => {
//     return binary ^ (binary >> 1);
// }
// const g = r.sort((a, b) => {
//     const x = gray(parseInt(a.join(""), 2));
//     const y = gray(parseInt(b.join(""), 2));
//     return x - y;
// });

// console.log(g);

// const grayCode = (codeLength) => {
//     const rightShift = (arr) => {
//         arr.pop();
//         arr.unshift(0);

//         return arr;
//     }
//     const result = [];
//     const originCode = shuffle(codeLength);

//     for (let i = 0; i < (2 ** codeLength); i++) {
//         const newCode = [];
//         const shiftedCode = rightShift([...originCode[i]]);

//         for (let j = 0; j < codeLength; j++) {
//             // newCode.push(originCode[i][j] === shiftedCode[j] ? 0 : 1);
//             newCode.push((originCode[i][j] && !shiftedCode[j]) || (!originCode[i][j] && shiftedCode[j]) ? 1 : 0);
//         }
//         result.push(newCode);
//     }

//     const test = originCode.map((originCodeCase, i) => {
//         const shiftedCode = rightShift([...originCodeCase]);

//         return originCodeCase.map((bool, j) => {
//             return (bool && !shiftedCode[j]) || (!bool && shiftedCode[j]) ? 1 : 0
//         });
//     });

//     console.log(test);
//     return result;
// }
// console.log(grayCode(3));