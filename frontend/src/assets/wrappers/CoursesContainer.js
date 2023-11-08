import styled from 'styled-components'

export const StyledWrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .courses {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
`
