import styled from "styled-components";

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
    text-align: center;
  }
  @media (max-width: 800px) {
    width: 100%;
    span {
      text-align: center;
    }
    h2 {
      text-align: center;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
