import styled from 'styled-components';


const StyledDemo = styled.div`
* {
  border: 1px solid blue;
  /* vertical-align: top; */
}
margin: 1rem;

.box {
  width: 200px;
  height: 200px;
  position: absolute;
  background-color: blue;
  cursor: pointer;
  :hover {
    outline: 2px solid yellow;
  }
}

.piece {
  position: relative;
  background-color: red;
  width: 180px;
  height: 180px;
  /* 不加的話，父層的div下方會有空白 */
  > img {
    width: fit-content;
    height: fit-content;
    position: absolute;
  }
}
`;


export default StyledDemo;
