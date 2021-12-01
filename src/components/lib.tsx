import styled from "@emotion/styled";
export const Row = styled.div<{ gap: Number | Boolean; between: Boolean; marginBottom: Number | Boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) => (typeof props.gap === "number" ? props.gap + "rem" : props.gap ? "2rem" : undefined)};
  }
`;
