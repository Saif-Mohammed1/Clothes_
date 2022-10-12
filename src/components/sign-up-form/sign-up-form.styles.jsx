import styled from "styled-components";

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
  }
  @media (max-width: 800px) {
    width: 100%;
    margin-top: 100px;

    span {
      text-align: center;
    }
    h2 {
      text-align: center;
    }
    button {
      margin: auto;
    }
  }
`;
