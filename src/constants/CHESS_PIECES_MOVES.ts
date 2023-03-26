import { IBoard, IPieceInfo } from "@/hooks/useChessboard"

export function moves(pieceInfo: IPieceInfo, chessboard: IBoard[][], positionIndexes: {row: number, col: number}) {
  const axios = pieceInfo.color === 'white' ? '+' : '-'
  const isFirstMove = true


  function pawn() {
    if (isFirstMove) {
      return [{row: 1, col: 0, axios}, {row: 2, col: 0, axios}]
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
    for (let row = positionIndexes.row; row < chessboard.length; row++) {
      

    if(row+1 <= 7 && shouldKeepUpdatingRowUp) {
      if (!chessboard[row+1]?.[positionIndexes.col].pieceInfo) {
        finalArray.push({row: row+1, col: positionIndexes.col, axios: '+'})
      } else {
        shouldKeepUpdatingRowUp = false
      }
    }

    if(row-1 >= 0 && shouldKeepUpdatingRowDown) {
      if (!chessboard[row-1]?.[positionIndexes.col].pieceInfo) {
        finalArray.push({row: row-1, col: positionIndexes.col, axios: '-'})
      } else {
        shouldKeepUpdatingRowDown = false
      }
    }

      for (let col = positionIndexes.col; col < chessboard[row].length; col++) {
        if(col+1 <= 7 && shouldKeepUpdatingColUp) {
          if (!chessboard[positionIndexes.row][col+1]?.pieceInfo) {
            finalArray.push({row, col: col+1, axios: '+'})
          } else {
            shouldKeepUpdatingColUp = false
          }
        }
        if(col-1 >= 0 && shouldKeepUpdatingColDown) {
          if (!chessboard[positionIndexes.row][col-1]?.pieceInfo) {
            finalArray.push({row, col: col-1, axios: '-'})
          } else {
            shouldKeepUpdatingColDown = false
          }
        }
      }
    }
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