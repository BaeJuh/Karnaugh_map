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

        this.row = 0;
        this.col = 0;
    }
    nodeSetting(nodes = []) {
        nodes.forEach((rowNode, row_i) => {
            this.row++;

            let prevNode = null;
            rowNode.forEach((currentNode, col_i) => {
                this.col++;
                if (this.startNode === null) { // 아무것도 없을 때 설정
                    this.startNode = currentNode;
                }
                if (prevNode) { // 행 연결
                    super.connectHorizontally(prevNode, currentNode);
                    if ((rowNode.length - 1) === col_i && currentNode.right === null && super.searchNode(`cell_${row_i}_${0}`).left === null) { // 행의 마지막 노드 일때
                        super.connectHorizontally(currentNode, super.searchNode(`cell_${row_i}_${0}`));
                    }
                }
                if (row_i > 0) { // 열 연결
                    super.connectVertically(super.searchNode(`cell_${row_i - 1}_${col_i}`), currentNode);
                    if ((nodes.length - 1) === row_i) { // 마지막 행의 노드 일때
                        super.connectVertically(currentNode, super.searchNode(`cell_${0}_${col_i}`));
                    }
                }
                prevNode = currentNode;
            });
        });
    }

    setResultBundles() {
        const visitedNode = new Set();
        const bundles = [];
        if (this._startNode) {
            let rowNode = this._startNode;
            while (rowNode) {
                let currentNode = rowNode;
                if (visitedNode.has(currentNode)) break;

                while (currentNode) {
                    
                    if (currentNode.status) {
                        const groups = this.checkConnectedNode(currentNode);
                        bundles.push(...groups);
                    }
                    visitedNode.add(currentNode);
                    currentNode = currentNode.right;
                    if (visitedNode.has(currentNode)) break;
                }
                rowNode = rowNode.under; // next row
            }
        }
        const covered = new Set();
        let filteredBundles = bundles.sort((a, b) => a.length - b.length).filter((point, i, originBundles) => {
            for (const bundle of [...originBundles].slice(i + 1)) {
                if (point.every(cell => bundle.includes(cell))) {
                    return false;
                };
            }
            point.forEach((pointCell) => covered.add(pointCell.id))
            return true;
        });
        console.log(filteredBundles);
        return filteredBundles;
    }

    checkConnectedNode(node) {
        const result = [];
        const directions = [
            { "ver": false, "hor": true }, // 하 우
            { "ver": false, "hor": false }, // 하 좌
            { "ver": true, "hor": true }, // 상 우
            { "ver": true, "hor": false }, // 상 좌
        ];
        for (let row = 1; row <= this.row; row *= 2) {
            for (let col = 1; col <= this.col; col *= 2) {
                if ((Math.log(row * col) / Math.log(2)) % 1 === 0) {
                    for (const direction of directions) {
                        const group = this.searchConnectedNode(node, row, col, direction);
                        if (group && this.rectangleCheck(group) && this.sizeCheck(group)) {
                            result.push(group);
                        }
                    }
                }
            }
        }
        const groupSize = result.reduce((maxLength, cur) => {
            return cur.length > maxLength ? cur.length : maxLength;
        }, 0);
        return result.filter((group) => group.length === groupSize);
    }

    searchConnectedNode(node, row, col, direction) {
        const group = [];

        let rowNode = node;
        for (let i = row; i > 0; i--) {
            let currentNode = rowNode;
            for (let j = col; j > 0; j--) {
                if (currentNode?.status) {
                    group.push(currentNode);
                    currentNode = direction["hor"] ? currentNode.right : currentNode.left;
                    continue;
                }
                return null;
            }
            rowNode = direction["ver"] ? rowNode.over : rowNode.under;
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
        return this.setResultBundles();
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