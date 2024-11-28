import styled from "styled-components";


export const Container = styled.div`
  background-color: #0f0f0f;
  width: 100%;
  height: calc(100vh - 76px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .bannerImg {
      max-width: 480px;
      object-fit: contain;
      width: auto;
      height: auto;

      @media screen and (max-width:580px){
        max-width: 80%;
      }
    }

    .title {
      color: #fff;
      text-align: center;
      margin: 28px;
      line-height: 150%;

      @media screen and (max-width:580px){
        font-size:24px;
      }
    }

    .card-section {
      display: flex;
      gap: 20px;

      @media screen and (max-width:580px){
        flex-direction: column;
      }

      .card {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        font-weight: bold;
        width: 200px;
        height: 50px;
        background-color: #fff;
        transition: transform 0.4s;
      }

      .card:hover{
        transform: scale(1.08);
      }
    }

  }
`;
