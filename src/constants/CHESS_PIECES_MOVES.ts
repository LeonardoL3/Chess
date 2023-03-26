import { IBoard, IPieceInfo } from "@/hooks/useChessboard"
import { mountMove } from "@/utils/mountMove"

export function moves(pieceInfo: IPieceInfo, chessboard: IBoard[][], positionIndexes: {row: number, col: number}) {
  const axios = pieceInfo.color === 'white' ? '+' : '-'
  const isFirstMove = true

console.log('ai', positionIndexes)
  function pawn() {
    if (isFirstMove && !chessboard[mountMove(positionIndexes.row, axios, 1)][positionIndexes.col].pieceInfo) {
      return [{row: mountMove(positionIndexes.row, axios, 1), col: positionIndexes.col, axios}, {row: mountMove(positionIndexes.row, axios, 2), col: positionIndexes.col, axios}]
    } else {
      return []
    }
  }

  function rook(){
    const finalArray = [] as {row: number, col: number, axios: string}[]

    for(let row = positionIndexes.row; row < chessboard.length; row++) {
      if(row+1 < chessboard.length) {
        if (!chessboard[row+1]?.[positionIndexes.col].pieceInfo) {
          finalArray.push({row: row+1, col: positionIndexes.col, axios: '+'})
        } else {
          break
        }
      }
    }

     for(let row = positionIndexes.row; row >= 0; row--) {
      if(row-1 >= 0) {
        if (!chessboard[row-1]?.[positionIndexes.col].pieceInfo) {
          finalArray.push({row: row-1, col: positionIndexes.col, axios: '-'})
        } else {
          break
        }
      }
    }

    for (let col = positionIndexes.col; col < chessboard[positionIndexes.row].length; col++) {
      if (col+1 < chessboard[positionIndexes.row].length) {
        if (!chessboard[positionIndexes.row][col+1]?.pieceInfo) {
          finalArray.push({row: positionIndexes.row, col: col+1, axios: '+'})
        } else {
          break
        }
      }
    }

     for (let col = positionIndexes.col; col >= 0; col--) {
      if (col-1 >= 0) {
        if (!chessboard[positionIndexes.row][col+-1]?.pieceInfo) {
          finalArray.push({row: positionIndexes.row, col: col-1, axios: '+'})
        } else {
          break
        }
      }
    }

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