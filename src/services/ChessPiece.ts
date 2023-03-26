interface IChessPiece {
  pieceName: string
}

export class ChessPiece {
  public pieceName: string

  constructor(chesspiece: IChessPiece) {
    this.pieceName = chesspiece.pieceName
  }

  public get_position_by_indexes(position: string): {row: number, col: number} {
    console.log('testezito', position[0])
    return {row: Number(position[1]) - 1, col: position[0].charCodeAt(0) -65}
  }

  public is_valid_move({row, col}: {row: number, col: number}) {
    console.log('ue', row)
    switch(this.pieceName) {
      case 'pawn':
        return [{row: row+1, col}] 
    }
  }
}