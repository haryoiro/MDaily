import styled from '@emotion/styled'

const ContentWrapper = styled.div`
display: grid;
grid-area: "content";
grid-column: 2;
overflow: scroll;
padding: 10px 20px;
margin: 0px 60px 0px 60px;
height: 100vh;
@media screen and (max-width: 550px) {
  margin-top: 120px;
}
`

export default ContentWrapper
