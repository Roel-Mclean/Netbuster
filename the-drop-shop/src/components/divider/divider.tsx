import styled from "styled-components"

const StyledDivider = styled.hr`
    border-top: 1px solid #000;
    margin: 30px;
`;

export const Divider = () => {
    return <StyledDivider />
}