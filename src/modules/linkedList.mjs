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
        this._status = false; // boolean
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

    changeStatus() { this._status = !this._status; }
    get status() { return this._status; }
}

export { Cell, TwoWayLinkedList };