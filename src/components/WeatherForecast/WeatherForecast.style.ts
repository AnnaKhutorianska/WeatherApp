import styled from "styled-components";

export const TemperatureListWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TemperatureItem = styled.div<{
  marginBottom: number;
  colorBg?: string;
}>`
  min-width: 40px;
  text-align: center;
  background-color: ${({ colorBg }) => colorBg};
  border: 1px solid #adb5bd;
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
`;
