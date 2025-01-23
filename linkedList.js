class KarnaughMap {
    constructor(id) {
        this.id = id;

        this.startNode = null;
        this.endNode = null;

        this.row = 2;
        this.col = 4;
    }

    appendNode(node) {
        if (this.startNode === null && this.endNode === null) {
            node.right = null;
            node.under = null;
            this.startNode = node;
            this.endNode = node;
        } else {

        }
    }

    createMap() {
        for (let i = 0; i < this.row; i++) {

        }
    }
}

class StatusNode {
    constructor(id) {
        this.id = id;
        this.status = false; // boolean

        this.right = null;
        this.under = null;
    }
}

/*
    Singly Linked List 원리로 카르노 맵 구성
    우측과 아래 탐색
    
*/

const shuffle = () => {
    const result = [];
    const boolShuffler = (oneEvent = []) => {
        const boolType = [0, 1];
        if (oneEvent.length === 3) {
            result.push(oneEvent);
            return ;
        } else {
            boolType.forEach((bool) => {
                const eventStorage = [...oneEvent, bool];
                boolShuffler(eventStorage);
            });
        }
    }
    boolShuffler();
    return result;
}


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

