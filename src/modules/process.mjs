class TwoWayLinkedList {
    constructor(id) {
        this.id = id;
        this._startNode = null;
    }

    set startNode(node) { this._startNode = node; }
    get startNode() { return this._startNode; }

    connectHorizontally(leftNode, rightNode) {
        leftNode.right = rightNode; // leftNode -> rightNode
        rightNode.left = leftNode; // rightNode -> leftNode
    }

    connectVertically(overNode, underNode) {
        overNode.under = underNode; // overNode -> underNode
        underNode.over = overNode; // underNode -> overNode
    }

    searchNode(nodeId) {
        const visitedNode = new Set();
        if (this._startNode) {
            let rowNode = this._startNode;

            while (rowNode) {
                let currentNode = rowNode;

                while (currentNode) {
                    if (currentNode.id === nodeId) {
                        return currentNode;
                    }
                    visitedNode.add(currentNode);
                    currentNode = currentNode.right;
                    if (visitedNode.has(currentNode)) break;
                }
                rowNode = rowNode.under; // next row
            }

            return null;
        }
        return null;
    }
}

class Node {
    constructor(id) {
        this._id = id;
        this._value = undefined;

        this._over = null;
        this._under = null;
        this._left = null;
        this._right = null;
    }
    get id() { return this._id; }

    set over(node) { this._over = node; }
    get over() { return this._over; }

    set under(node) { this._under = node; }
    get under() { return this._under; }

    set left(node) { this._left = node; }
    get left() { return this._left; }

    set right(node) { this._right = node; }
    get right() { return this._right }

    get value() { return this._value; }
    set value(data) { this._value = data; }
}

class KarnaughMap extends TwoWayLinkedList {
    constructor(id) {
        super(id);
        this.resultBundles = []; // [][]
    }
    nodeSetting(nodes = []) {
        nodes.forEach((rowNode, row_i) => {
            let prevNode = null;
            rowNode.forEach((currentNode, col_i) => {
                if (this.startNode === null) { // 아무것도 없을 때 설정
                    this.startNode = currentNode;
                }
                if (prevNode) { // 가로 연결
                    super.connectHorizontally(prevNode, currentNode);

                    if ((rowNode.length - 1) === col_i && currentNode.right === null && super.searchNode(`cell_${row_i}_${0}`).left === null) { // 행의 마지막 노드 일때
                        super.connectHorizontally(currentNode, super.searchNode(`cell_${row_i}_${0}`));
                    }
                }
                if (row_i > 0) { // 세로 연결
                    super.connectVertically(super.searchNode(`cell_${row_i - 1}_${col_i}`), currentNode);

                    if ((nodes.length - 1) === row_i) { // 마지막 행의 노드 일때
                        super.connectVertically(currentNode, super.searchNode(`cell_${0}_${col_i}`))
                    }
                }
                prevNode = currentNode;
            });
        });
    }

    setResultBundles() {
        const visitedNode = new Set();
        const bundles = new Set();
        if (this._startNode) {
            let rowNode = this._startNode;

            while (rowNode) {
                let currentNode = rowNode;
                if (visitedNode.has(currentNode)) break;

                while (currentNode) {
                    if (currentNode.status) {
                        const group = this.checkConnectedNode(currentNode);
                        bundles.add(...group);
                    }
                    visitedNode.add(currentNode);
                    currentNode = currentNode.right;
                    if (visitedNode.has(currentNode)) break;
                }
                rowNode = rowNode.under; // next row
            }
        }

        console.log(bundles);
    }

    checkConnectedNode(node) {
        // const connectedNode = new Set();
        // const lineUp = [node];

        // while (lineUp.length > 0) {
        //     const currentNode = lineUp.pop();

        //     if (!connectedNode.has(currentNode)) {
        //         connectedNode.add(currentNode);

        //         if (currentNode.over?.status) {
        //             lineUp.push(currentNode.over);
        //         }
        //         if (currentNode.under?.status) {
        //             lineUp.push(currentNode.under);
        //         }
        //         if (currentNode.left?.status) {
        //             lineUp.push(currentNode.left);
        //         }
        //         if (currentNode.right?.status) {
        //             lineUp.push(currentNode.right);
        //         }
        //     }
        // }
        // // console.log(node.value, [...connectedNode]);
        // const checkedNodes = [...connectedNode];
        // while(!(this.rectangleCheck(checkedNodes) && this.sizeCheck(checkedNodes))) {
        //     checkedNodes.pop();
        // }
        // console.log(node.value, checkedNodes);

        // return checkedNodes;

        const result = [];
        for (let row = 1; row < 5; row++) {
            for (let col = 1; col < 5; col++) {
                if ((Math.log(row * col) / Math.log(2)) % 1 === 0) {
                    // 묶기
                    const group = this.searchConnectedNode(node, row, col);
                    if (group && this.rectangleCheck(group) && this.sizeCheck(group)) {
                        result.push(group);
                    }
                }
            }
        }
        const groupSize = result.reduce((maxLength, cur) => {
            return cur.length > maxLength ? cur.length : maxLength;
        }, 0);
        return result.filter((group) => group.length === groupSize);
    }

    searchConnectedNode(node, row, col) {
        const group = [];

        let rowNode = node;

        for (let i = 0; i < row; i++) {
            let currentNode = rowNode;

            for (let j = 0; j < col; j++) {
                if (currentNode?.status) {
                    group.push(currentNode);
                    currentNode = currentNode.right;
                    continue;
                }
                return null;
            }
            rowNode = rowNode.under;
        }

        return group;
    }

    rectangleCheck(connectedNode) {
        const row = new Set();
        const col = new Set();

        connectedNode.forEach((cell) => {
            const [, rowPos, colPos] = cell.id.split("_");

            row.add(Number(rowPos));
            col.add(Number(colPos));
        });

        return (row.size * col.size) === connectedNode.length;
    }

    sizeCheck(connectedNode) {
        const connectedLength = connectedNode.reduce(acc => (acc + 1), 0);

        if ((Math.log(connectedLength) / Math.log(2)) % 1 === 0) {
            return true;
        } else {
            return false;
        }
    }

    run(nodes) {
        this.nodeSetting(nodes);
        // this.printAllId(nodes);
        this.setResultBundles();
    }

    printAllId(nodes) { // test하려 만든 노드
        let rowStartNode = this.startNode;
        nodes.forEach((_, row_i) => {
            let currentNode = rowStartNode;
            _.forEach((__, col_i) => {
                console.log(currentNode);
                currentNode = currentNode.right;
            });
            rowStartNode = rowStartNode.under;
        });
    }
}

class Cell extends Node {
    constructor(id) {
        super(id);

        this._status = false;
        this._groups = [];
    }
    changeStatus() { this._status = !this._status; }
    get status() { return this._status; }

    set groups(group) { this._groups = group; }
    get groups() { return this._groups; }
}

export { Cell, KarnaughMap };

// class Cell extends Node {
//     constructor(id) {
//         super(id);
//         this._status = false;
//         this._id = id;
//         this._status = false; // boolean
//         this._value = undefined;

//         this._right = null;
//         this._under = null;
//         this.left = null;
//         this.top = null;
//     }
//     get id() { return this._id; }

//     set right(cell) { this._right = cell; }
//     get right() { return this._right }
//     set under(cell) { this._under = cell; }
//     get under() { return this._under; }

//     get value() { return this._value; }
//     set value(data) { this._value = data; }

//     changeStatus() { this._status = !this._status; }
//     get status() { return this._status; }
// }