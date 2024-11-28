import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  .main-content {
    background-color: #0f0f0f;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .content-form {
      max-width: 1024px;
      width: 100%;
      padding: 0 18px;
      padding-bottom: 28px;
      margin-top: 58px;

      .form-title {
        color: #fff;
        margin-bottom: 8px;
      }

      .form {
        .checkbox-area {
          margin: 14px 0;

          label {
            margin-left: 8px;
            color: #fff;
          }

          .input-checkbox {
            width: 14px;
            height: 14px;
          }
        }

        .form-button {
          width: 100%;
          padding: 12px 0;
          border: 0;
          border-radius: 4px;
          color: #fff;
          background-color: #3183ff;
          font-size: 18px;
          cursor: pointer;
        }
      }
    }
  }

  .task-container {
    margin: 34px auto 0 auto;
    padding: 0 18px;
    width: 100%;
    max-width: 1024px;
    display: flex;
    flex-direction: column;


    a {
      text-decoration: none;
      color: #0f0f0f;
    }

    h1{
      text-align: center;
      font-size: 32px;
      margin-bottom: 24px;
    }

    .task{
      margin-bottom: 14px;
      line-height: 150%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border: none;
      border-radius: 4px;
      padding: 14px;
      background-color:#F5F5F5;

      .infos-container{
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;

        .tag-container{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;

        .tag{
          background-color: #3183ff;
          padding: 2px 6px;
          color: #fff;
          border-radius: 4px;
          font-size: 12px;
        }

        .share-button{
          background: transparent;
          border: 0;
          margin: 0 8px;
          cursor: pointer;
        }
      }

      .details{
        display: flex;
          cursor: pointer;
          background-color: transparent ;
          border: 0;
          border-radius: 4px;
          margin: 0 8px;
          padding: 4px;
        }
      }



      .task-content{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;


        p{
          white-space: pre-wrap;
        }

        .trash-button{
          cursor: pointer;
          background-color: #ea3140 ;
          border: 0;
          border-radius: 4px;
          margin: 0 8px;
          padding: 4px;
        }
      }
    }
  }
`;
