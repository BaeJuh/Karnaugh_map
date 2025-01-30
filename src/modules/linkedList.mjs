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
                if (this.startNode === null) {
                    this.startNode = currentNode;
                }
                if (prevNode) {
                    super.connectHorizontally(prevNode, currentNode);
                }
                if (row_i > 0) {
                    super.connectVertically(super.searchNode(`cell_${row_i - 1}_${col_i}`), currentNode);
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
                    if (currentNode.status) {
                        const connectedNode= this.checkConnectedNode(currentNode);

                        if (this.sizeCheck(connectedNode)) {
                            this.resultBundles.push(connectedNode);
                        }
                    }
                    currentNode = currentNode.right;
                }
                rowStartNode = rowStartNode.under;
            }

            console.log(this.resultBundles);
        }
    }

    checkConnectedNode(node) {
        const connectedNode = [];
        const lineUp = [node];

        while (lineUp.length > 0) {
            const currentNode = lineUp.pop();

            if (currentNode.status ) {
                connectedNode.push(currentNode);

                if (currentNode.right && currentNode.right.status) {
                    lineUp.push(currentNode.right);
                }
                if (currentNode.under && currentNode.under.status) {
                    lineUp.push(currentNode.under);
                }
            }
        }

        return connectedNode;
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
        // this.printAllId();
        // this.setResultBundles();
    }

    printAllId() { // test하려 만든 노드
        if (this._startNode) {
            let rowStartNode = this._startNode;

            while (rowStartNode) {
                let currentNode = rowStartNode;
                while (currentNode) {
                    console.log(currentNode);
                    currentNode = currentNode.right;
                }
                rowStartNode = rowStartNode.under; // next row
            }

            return null;
        }

        return null;
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