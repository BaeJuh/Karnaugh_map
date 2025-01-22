class KarnaughMap {
    constructor(id) {
        this.id = id;

        this.startNode = null;
        this.endNode = null;

        this.row = 2;
        this.col = 4;
    }

    appendNode(node) {
        if ( this.startNode === null && this.endNode === null ) {
            node.right = null;
            node.under = null;
            this.startNode = node;
            this.endNode = node;
        } else {

        }
    }

    createMap() {
        for (let i=0; i<this.row; i++) {

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

const result = [];
const boolShuffler = (oneEvent = []) => {
    const boolType = [ 0, 1 ];
    if ( oneEvent.length === 3 ) {
        result.push(oneEvent);
        return ;
    } else {
        boolType.forEach((bool) => {
            const eventStorage = [...oneEvent, bool];
            boolShuffler( eventStorage );
        });
    }
}
boolShuffler();
console.log(result);

// const newSort = ( inputArr = []) => {
//     const result = [...inputArr];
//     let t = 2;
//     for (let i=0; i<result.length; i++) {
//         let diffCount = 0;
//         for (let j=0; j<result[i].length; j++) {
//             if (result[i][j] !== result[i+1][j]) {
//                 diffCount ++;
//             }
//         }
//         if (diffCount > 1) {
//             [result[i+1], result[i+t]] = [result[i+t], result[i+1]];
//             t++;
//             i--;
//         } else {
//             t = 2;
//         }
//         console.log(result);
//     }

//     return result;
// }

// console.log(newSort(result));

// const [row, col] = [4, 8];
// for (let i=0; i<row; i++) {
//     let temp1 = "";
//     for (let j=0; j<col/2; j++) {
//         temp1 = temp1 + `${i}${j}, `;
//     }
//     let temp2 = "";
//     for (let j=col/2; j<col; j++) {
//         temp2 = `${i}${j}, ` + temp2;
//     }
//     console.log(temp1 + temp2);
// }