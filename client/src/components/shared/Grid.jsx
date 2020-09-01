import styled from 'styled-components'

export const Grid = styled.div`
display: grid;
grid-auto-rows: 200px;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
gap: 15px;
`

export default Grid