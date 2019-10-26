import styled from 'styled-components';


const StyledDemo = styled.div`
background-color: #ccc;
* {
  /* border: 1px solid blue; */
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
`;


export default StyledDemo;
