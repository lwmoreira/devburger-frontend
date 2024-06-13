import styled from 'styled-components'

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 30px 60px 0px rgba(57, 57, 57, 0.1);
  border-radius: 30px;
  display: flex;
  gap: 12px;
  padding: 16px;
  margin-bottom: 16px;
  max-width: 90%;
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    Button {
      width: 156px;
      height: 36px;
      border-radius: 30px;
    }
  }
`

export const Image = styled.img`
  width: 150px;
  border-radius: 10px;
`

export const ProductName = styled.p`
  color: #000;

  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
export const ProductPrice = styled.p`
  color: #000;

  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 20px;
`
