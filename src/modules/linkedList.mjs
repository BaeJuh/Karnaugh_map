class TwoWayLinkedList {
    constructor(id) {
        this.id = id;
        this._startNode = null;
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

class KarnaughMap extends TwoWayLinkedList {
    constructor(id) {
        super(id);
        this.resultBundles = []; // [][]
    }
    nodeSetting(node = []) {
        node.forEach((rowNode, row_i) => {
            let prevNode = null;
            rowNode.forEach((currentNode, col_i) => {
                if (this.startNode === null) {
                    this.startNode = currentNode;
                }
                if (prevNode) {
                    this.connectHorizontally(prevNode, currentNode);
                }
                if (row_i > 0) {
                    this.connectVertically(this.searchNode(`cell_${row_i - 1}_${col_i}`), currentNode);
                }
                prevNode = currentNode;
            });
        });
    }

    setResultBundles() {
        if (this._startNode) {
            let visitedPlace = [];

            let rowStartNode = this._startNode;
            while (rowStartNode) {
                let currentNode = rowStartNode;
                while (currentNode) {
                    if (currentNode.status && !visitedPlace.includes(currentNode.value)) {
                        const [connectedNode, copyVisitedPlace] = this.checkConnectedNode(currentNode, visitedPlace);
                        
                        if (this.sizeCheck(connectedNode)) {
                            this.resultBundles.push(connectedNode);
                            visitedPlace = [...visitedPlace, ...copyVisitedPlace];
                        }
                    }
                    currentNode = currentNode.right;
                }
                rowStartNode = rowStartNode.under;
            }

            console.log(this.resultBundles);
        }
    }

    checkConnectedNode(node, visitedPlace) {
        let copyVisitedPlace = [...visitedPlace];
        const connectedNode = [];
        const lineUp = [node];

        while (lineUp.length > 0) {
            const currentNode = lineUp.pop();

            if (currentNode.status && !copyVisitedPlace.includes(currentNode.value)) {
                copyVisitedPlace.push(currentNode.value);
                connectedNode.push(currentNode);

                if (currentNode.right && currentNode.right.status) {
                    lineUp.push(currentNode.right);
                }
                if (currentNode.under && currentNode.under.status) {
                    lineUp.push(currentNode.under);
                }
            }
        }

        return [connectedNode, copyVisitedPlace];
    }

    sizeCheck(connectedNode) {
        const connectedLength = connectedNode.reduce((acc) => {
            return acc+1;
        }, 0);

        if ( (Math.log(connectedLength)/Math.log(2))%1 === 0 ) {
            return true;
        } else {
            return false;
        }
    }

    printAllId() { // test하려 만든 노드
        if (this._startNode) {
            let rowStartNode = this._startNode;

            while (rowStartNode) {
                let currentNode = rowStartNode;
                while (currentNode) {
                    console.log(currentNode.value);
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
        this._value = undefined;

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


export { Cell, KarnaughMap };