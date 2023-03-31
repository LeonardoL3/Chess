import { IBoard, IPieceInfo } from "@/hooks/useChessboard"
import { mountMove } from "@/utils/mountMove"

interface Indexes {
  row: number
  col: number
}

export function moves(pieceInfo: IPieceInfo, chessboard: IBoard[][], positionIndexes: {row: number, col: number}) {
  const axios = pieceInfo.color === 'white' ? '+' : '-'
  const isFirstMove = true

  function pawn() {
    if (isFirstMove && !chessboard[mountMove(positionIndexes.row, axios, 1)][positionIndexes.col].pieceInfo) {
      return [{row: mountMove(positionIndexes.row, axios, 1), col: positionIndexes.col, axios}, {row: mountMove(positionIndexes.row, axios, 2), col: positionIndexes.col, axios}]
    } else {
      return []
    }
  }

  function rook(){
    const finalArray = [] as Indexes[]

    for(let row = positionIndexes.row; row < chessboard.length; row++) {
      if(row+1 < chessboard.length) {
        if (!chessboard[row+1]?.[positionIndexes.col].pieceInfo) {
          finalArray.push({row: row+1, col: positionIndexes.col})
        } else {
          break
        }
      }
    }

     for(let row = positionIndexes.row; row >= 0; row--) {
      if(row-1 >= 0) {
        if (!chessboard[row-1]?.[positionIndexes.col].pieceInfo) {
          finalArray.push({row: row-1, col: positionIndexes.col})
        } else {
          break
        }
      }
    }

    for (let col = positionIndexes.col; col < chessboard[positionIndexes.row].length; col++) {
      if (col+1 < chessboard[positionIndexes.row].length) {
        if (!chessboard[positionIndexes.row][col+1]?.pieceInfo) {
          finalArray.push({row: positionIndexes.row, col: col+1})
        } else {
          break
        }
      }
    }

     for (let col = positionIndexes.col; col >= 0; col--) {
      if (col-1 >= 0) {
        if (!chessboard[positionIndexes.row][col+-1]?.pieceInfo) {
          finalArray.push({row: positionIndexes.row, col: col-1})
        } else {
          break
        }
      }
    }

    return finalArray
  }

  function bishop(){
    const finalArray = [] as Indexes[]

    let initialColGoingUp = positionIndexes.col
    for(let row = positionIndexes.row; row < chessboard.length; row++) {
      if(row+1 <= 7 && initialColGoingUp+1 <= 7) {
        if (!chessboard[row+1]?.[initialColGoingUp+1].pieceInfo) {
          finalArray.push({row: row+1, col: initialColGoingUp+1})
        } else {
          break
        }
        initialColGoingUp++
      }
    }

    let initialColWithRowGoingDown = positionIndexes.col
    for(let row = positionIndexes.row; row >= 0; row--) {
      if(row+1 <= 7 && initialColWithRowGoingDown+1 <= 7) {
        if (!chessboard[row-1]?.[initialColWithRowGoingDown+1].pieceInfo) {
          finalArray.push({row: row-1, col: initialColWithRowGoingDown+1})
        } else {
          break
        }
        initialColWithRowGoingDown++
      }
    }

    let initialColGoingDown = positionIndexes.col
    for(let row = positionIndexes.row; row < chessboard.length; row++) {
      if(row+1 <= 7 && initialColGoingDown-1 >= 0) {
        if (!chessboard[row+1]?.[initialColGoingDown-1].pieceInfo) {
          finalArray.push({row: row+1, col: initialColGoingDown-1})
        } else {
          break
        }
        initialColGoingDown--
      }
    }

    let initialCol = positionIndexes.col
    for(let row = positionIndexes.row; row >= 0; row--) {
      if(row-1 >= 0 && initialCol-1 >= 0) {
        if (!chessboard[row-1]?.[initialCol-1].pieceInfo) {
          finalArray.push({row: row-1, col: initialCol-1})
        } else {
          break
        }
        initialCol--
      }
    }

    console.log('eu sinto', finalArray)
    return finalArray

    //  for(let row = positionIndexes.row; row >= 0; row--) {
    //   if(row-1 >= 0) {
    //     if (!chessboard[row-1]?.[positionIndexes.col].pieceInfo) {
    //       finalArray.push({row: row-1, col: positionIndexes.col})
    //     } else {
    //       break
    //     }
    //   }
    // }

    // for (let col = positionIndexes.col; col < chessboard[positionIndexes.row].length; col++) {
    //   if (col+1 < chessboard[positionIndexes.row].length) {
    //     if (!chessboard[positionIndexes.row][col+1]?.pieceInfo) {
    //       finalArray.push({row: positionIndexes.row, col: col+1})
    //     } else {
    //       break
    //     }
    //   }
    // }

    //  for (let col = positionIndexes.col; col >= 0; col--) {
    //   if (col-1 >= 0) {
    //     if (!chessboard[positionIndexes.row][col+-1]?.pieceInfo) {
    //       finalArray.push({row: positionIndexes.row, col: col-1})
    //     } else {
    //       break
    //     }
    //   }
    // }
  }

  function knight(){}

  function queen(){
    const finalArray = [...bishop(), ...rook()]
    

    console.log('pe de pano', finalArray)

    return finalArray
  }

  function king(){
    const { row, col } = positionIndexes
    const bishop_first_moves = bishop().filter(b => {
      if (b.row === row+1 || b.row === row-1 || b.col === col+1 || b.col === col-1) {
        return b
      } 
    })

    const rook_first_moves = rook().filter(r => {
      if (r.row === row+1 || r.row === row-1 || r.col === col+1 || r.col === col-1) {
        return r
      } 
    })

    const finalArray = [
      ...bishop_first_moves,
      ...rook_first_moves
    ]

    return finalArray
  }

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