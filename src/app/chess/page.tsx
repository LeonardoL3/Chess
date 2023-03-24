import { ChessBoard } from "@/services/ChessBoard"

export default function Chess() {

  const teste = new ChessBoard()
  teste.populate()
  console.log(teste.board)

  return (
    <h1> Hello Chess!!! </h1>
  )
}

export const metadata = {
  title: 'Chess'
}