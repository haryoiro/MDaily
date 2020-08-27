import styled from 'styled-components'

const Button = styled.button`
  
`

// 共有するコンポーネントはスタイルを継承、拡張する可能性が高いので
// stateless componentのみの共有に留め、
// ロジック部分はより抽象度の高い場所で実装する。
// function Button() {
//   return (
//     <StyledButton />
//   )
// }

export default Button