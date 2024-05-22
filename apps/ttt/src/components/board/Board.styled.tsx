import styled, {css} from 'styled-components'

export const StyledBoard = styled.div<{ disabled: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  
  ${props => props.disabled && css`
    pointer-events: none;
  `}
  
  button {
    aspect-ratio: 1 / 1;
    background-color: darkslategrey;
    border: 0;
    outline: 0;
    color: snow;
    font-size: 48px;
    
    &:nth-child(odd) {
      background-color: cadetblue;
    }
  }
`
