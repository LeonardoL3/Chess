import { WHITE } from "@/constants/CHESS_PIECES_POSITIONS"

interface IBoard {
  position: string
  pieceName: string | null
}

export class ChessBoard {
  private chessboard: IBoard[][] = []
  private chessboardLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

  constructor(){
    for (let row = 0; row < 8; row++){
      this.chessboard[row] = []
      for (let col = 0; col < 8; col++){
        this.chessboard[row][col] = this.fill_up_initial_board(`${this.chessboardLetters[col]}${row+1}`)
      }
    }    
  }

  public get board(): IBoard[][] {
    return this.chessboard
  }

  private fill_up_initial_board(position: string): IBoard {
    return {position, pieceName: null}
  }

  public populate() {
    Object.entries(WHITE).forEach(([key, value]) => {
      this.chessboard[value.row][value.col].pieceName = key
    })
  }
}