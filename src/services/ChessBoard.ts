import { WHITE, BLACK } from "@/constants/CHESS_PIECES_POSITIONS"
import { ChessPiece } from "./ChessPiece"

interface IBoard {
  position: string
  pieceInfo?: ChessPiece | null
}

export class ChessBoard {
  private chessboard: IBoard[][] = []
  private chessboardLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

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
    return `${this.chessboardLetters[col]}${row+1}`
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

  public move(oldPosition: {row: number, col: number}, newPosition: {row: number, col:number}) {
    this.chessboard[newPosition.row][newPosition.col].pieceInfo = this.chessboard[oldPosition.row][oldPosition.col].pieceInfo
    this.chessboard[oldPosition.row][oldPosition.col].pieceInfo = null
  }
}