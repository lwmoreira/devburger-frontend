import styled from 'styled-components'

export const Container = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  padding: 35px 0;

  .rec.rec-arrow {
    background-color: #9758a6;
    color: #efefef;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .rec.rec-arrow:hover {
    border: 2px solid #9758a6;
    background-color: #bebebf;
    color: #9758a6;
  }
  .rec.rec-arrow:disabled {
    border: none;
    background: #bebebf;
    color: #efefef;
  }
`

export const OffersImg = styled.img``

export const ContainerItens = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: #424242;
    font-size: px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
  }
`

export const Image = styled.img`
  width: 250px;
  border-radius: 10px;
  margin-bottom: 16px;
`

export const Button = styled.button`
  margin-top: 16px;
  border-radius: 8px;
  background: #9758a6;
  box-shadow:
    0px 5px 10px 0px rgba(151, 88, 166, 0.22),
    0px 20px 40px 0px rgba(151, 88, 166, 0.24);

  height: 50px;
  border: none;

  color: #ffffff;
  text-align: center;
  font-family: 'Roboto';
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }
`
