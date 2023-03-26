import { WHITE, BLACK } from "@/constants/CHESS_PIECES_POSITIONS"
import { ChessPiece } from "./ChessPiece"

export interface IBoard {
  position: string
  pieceInfo?: ChessPiece | null
}

export class ChessBoard {
  private chessboard: IBoard[][] = []

  constructor(chessboard?: IBoard[][]){
    if (!chessboard) {
      for (let row = 0; row < 8; row++){
        this.chessboard[row] = []
        for (let col = 0; col < 8; col++){
          this.chessboard[row][col] = {position: this.fill_up_position(row, col)}
        }
      }    
    } else {
      this.chessboard = chessboard
    }

  }

  public get board(): IBoard[][] {
    return this.chessboard
  }

  private fill_up_position(row:number, col: number) {
    return `${String.fromCharCode(65+col)}${row+1}`
  }

  public populate() {
    Object.entries(WHITE).forEach(([_, value]) => {
      this.chessboard[value.row][value.col].pieceInfo = new ChessPiece({pieceName: value.pieceName})
    })

    Object.entries(BLACK).forEach(([key, value]) => {
      this.chessboard[value.row][value.col].pieceInfo = new ChessPiece({pieceName: value.pieceName})
    })

    // Object.entries(WHITE).forEach(([key, value]) => {
    //   this.chessboard[value.row][value.col].pieceInfo = new ChessPiece({currentPosition: this.fill_up_position(value.row, value.col), pieceName: key})
    // })

    // Object.entries(BLACK).forEach(([key, value]) => {
    //   this.chessboard[value.row][value.col].pieceInfo = new ChessPiece({currentPosition: this.fill_up_position(value.row, value.col), pieceName: key})
    // })
  }

  //oldPosition: {row: number, col: number}, newPosition: {row: number, col:number}
  public move(board: IBoard) {
    if (!board.pieceInfo) return null
    const indexes = board.pieceInfo.get_position_by_indexes(board.position)
    const valid_moves = board.pieceInfo?.is_valid_move(indexes)
    console.log('valid_moves', valid_moves)
    // this.chessboard[newPosition.row][newPosition.col].pieceInfo = this.chessboard[oldPosition.row][oldPosition.col].pieceInfo
    // this.chessboard[oldPosition.row][oldPosition.col].pieceInfo = null
  }
}