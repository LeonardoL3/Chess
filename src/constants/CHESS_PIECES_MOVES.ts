import { IBoard, IPieceInfo } from "@/hooks/useChessboard"
import { mountMove } from "@/utils/mountMove"

export function moves(pieceInfo: IPieceInfo, chessboard: IBoard[][], positionIndexes: {row: number, col: number}) {
  const axios = pieceInfo.color === 'white' ? '+' : '-'
  const isFirstMove = true

console.log('ai', positionIndexes)
  function pawn() {
    if (isFirstMove) {
      return [{row: mountMove(positionIndexes.row, axios, 1), col: positionIndexes.col, axios}, {row: mountMove(positionIndexes.row, axios, 2), col: positionIndexes.col, axios}]
    } else {
      return [{row: 1, col: 0, axios}]
    }
  }

  function rook(){
    const finalArray = [] as {row: number, col: number, axios: string}[]
    let shouldKeepUpdatingRowUp = true
    let shouldKeepUpdatingRowDown = true
    let shouldKeepUpdatingColUp = true
    let shouldKeepUpdatingColDown = true

    for(let row = positionIndexes.row; row < chessboard.length; row++) {
      if(row+1 <= 7 && shouldKeepUpdatingRowUp) {
        if (!chessboard[row+1]?.[positionIndexes.col].pieceInfo) {
          finalArray.push({row: row+1, col: positionIndexes.col, axios: '+'})
        } else {
          shouldKeepUpdatingRowUp = false
          break
        }
      }
    }

     for(let row = positionIndexes.row; row >= 0; row--) {
      if(row-1 >= 0 && shouldKeepUpdatingRowDown) {
        if (!chessboard[row-1]?.[positionIndexes.col].pieceInfo) {
          finalArray.push({row: row-1, col: positionIndexes.col, axios: '-'})
        } else {
          shouldKeepUpdatingRowUp = false
          break
        }
      }
    }

    for (let col = positionIndexes.col; col < chessboard[positionIndexes.row].length; col++) {
      if (col+1 <= 7 && shouldKeepUpdatingColUp) {
        if (!chessboard[positionIndexes.row][col+1]?.pieceInfo) {
          finalArray.push({row: positionIndexes.row, col: col+1, axios: '+'})
        } else {
          shouldKeepUpdatingColUp = false
          break
        }
      }
    }

     for (let col = positionIndexes.col; col >= 0; col--) {
      if (col-1 >= 0 && shouldKeepUpdatingColDown) {
        if (!chessboard[positionIndexes.row][col+-1]?.pieceInfo) {
          finalArray.push({row: positionIndexes.row, col: col-1, axios: '+'})
        } else {
          shouldKeepUpdatingColUp = false
          break
        }
      }
    }

    // for (let row = positionIndexes.row; row < chessboard.length; row++) {
    // if(row+1 <= 7 && shouldKeepUpdatingRowUp) {
    //   if (!chessboard[row+1]?.[positionIndexes.col].pieceInfo) {
    //     finalArray.push({row: row+1, col: positionIndexes.col, axios: '+'})
    //   } else {
    //     shouldKeepUpdatingRowUp = false
    //   }
    // }

    // if(row-positionIndexes.row >= 0 && shouldKeepUpdatingRowDown) {
    //   if (!chessboard[positionIndexes.row + (row-positionIndexes.row)]?.[positionIndexes.col].pieceInfo) {
    //     finalArray.push({row: positionIndexes.row + (row-positionIndexes.row), col: positionIndexes.col, axios: '-'})
    //   } else {
    //     shouldKeepUpdatingRowDown = false
    //   }
    // }

    //   for (let col = positionIndexes.col; col < chessboard[row].length; col++) {
    //     if(col+1 <= 7 && shouldKeepUpdatingColUp) {
    //       if (!chessboard[positionIndexes.row][col+1]?.pieceInfo) {
    //         finalArray.push({row: positionIndexes.row, col: col+1, axios: '+'})
    //       } else {
    //         shouldKeepUpdatingColUp = false
    //       }
    //     }
    //   }

    //   for (let col = positionIndexes.col; col >= 0; col--) {
    //     if(col-1 >= 0 && shouldKeepUpdatingColDown) {
    //       if (!chessboard[positionIndexes.row][col-1]?.pieceInfo) {
    //         finalArray.push({row: positionIndexes.row, col: col-1, axios: '-'})
    //       } else {
    //         shouldKeepUpdatingColDown = false
    //       }
    //     }
    //   }


      
    // }
    console.log('deixa eu', finalArray)
    return finalArray
  }

  function bishop(){}

  function knight(){}

  function queen(){}

  function king(){}

  return {
    pawn,
    rook,
    bishop,
    knight,
    queen,
    king
  }
}



function pawn(){}
export const move_teste = {
  pawn
} as const