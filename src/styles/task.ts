import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 40px auto 0 auto;
  padding: 0 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .main {
    width: 100%;

    h1 {
      margin-bottom: 14px;
    }

    .task {
      border: none;
      padding: 14px;
      line-height: 150%;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #e9e9e9;

      p {
        white-space: pre-wrap;
        width: 100%;
      }
    }
  }

  .comments-container {
    width: 100%;
    margin: 18px 0;
    max-width: 1024px;


    h2 {
      margin: 14px 0;
    }

    .form-comment {
        display: flex;
        flex-direction: column;
        gap: 12px;
        
        
      .comment-button {
        width: 100%;
        padding: 12px 0;
        border: 0;
        color: #fff;
        background-color: #3183ff;
        font-size: 18px;
        cursor: pointer;
        margin-top: 5px;
      }

      .comment-button:disabled{
        cursor: not-allowed;
        background-color: #3183ff9a;
      }
    }

    .comment {
      border: none;
      border-radius: 4px;
      padding: 14px;
      margin-bottom: 14px;
      background-color:#e9e9e9;

      .head-comment{
        display: flex;
        align-items: center;
        justify-content: space-between;

        .comment-label{
          background-color: #ccc;
          padding: 4px 8px;
          margin-right: 8px;
          border-radius:4px ;
        }

        .button-trash{
          cursor: pointer;
          background-color: #ea3140 ;
          border: 0;
          border-radius: 4px;
          margin: 0 8px;
          padding: 6px;
        }
      }

      p{
        margin-top: 14px;
        white-space: pre-wrap;
      }
    }
  }
`;
