export function fill_up_position({row, col}: {row: number, col: number}) {
  return `${String.fromCharCode(97+col)}${row+1}`
}