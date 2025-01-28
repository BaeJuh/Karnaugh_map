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
}

class Cell {
    constructor(id) {
        this._id = id;
        this.status = false; // boolean
        this._value = undefined;

        this._right = null;
        this._under = null;
        // this.left = null;
        // this.top = null;
    }
    get id() { return this._id; }

    set right(cell) { this._right = cell; }
    set under(cell) { this._under = cell; }

    get value() { return this._value; }
    set value(data) { this._value = data; }
}

const newMap = new TwoWayLinkedList("newMap");
for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
        // 
        const newCell = new Cell(`cell_${row}_${col}`);
        newMap.value = `${row}${col}`;
        if (newMap.startNode === null) {
            newMap.startNode = newCell;
        }

    }
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