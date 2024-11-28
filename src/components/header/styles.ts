import styled from "styled-components";

export const Container = styled.header`
  background-color: #0f0f0f;
  width: 100%;
  height: 76px;
  display: flex;
  align-items: center;
  
  .header-content {
    padding: 0 18px;
    width: 100%;
    max-width: 1024px;
    display: flex;
    margin: auto;
    justify-content: space-between;

    .header-right {
        display: flex;
        align-items: center;
        gap:20px;

        .user-name{
          color: #fff;
        }

      a {
        text-decoration: none;
      }

      .logo {
        color: #fff;

        span {
          color: #ea3140;
        }
      }
    }

    .header-button {
      background: transparent;
      padding: 8px 32px;
      border-radius: 24px;
      color: #fff;
      border: 1px solid #fff;
      cursor: pointer;
      transition: all 0.4s;
    }

    .header-button:hover {
      transform: scale(1.08);
      background-color: #fff;
      color: #0f0f0f;
    }
  }
`;
