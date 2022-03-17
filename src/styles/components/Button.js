import styled from "styled-components"

const dark = "linear-gradient(180deg, #0F354A 0%, rgba(8, 22, 39, 0.61) 100%)";
const orange = "linear-gradient(180deg, #F29F05 0%, #B87700 100%)";
const blue = "linear-gradient(180deg, #00DFF0 0%, #003D51 100%);";
const purple = "linear-gradient(180deg, #BD07DB 0%, #41056F 100%);";

const colors = [blue, orange, purple, dark]

const ImmigrationButton = styled.button`
  background: ${props =>  (props.name == props.value ? blue : dark)};
`;

const EmigrationButton = styled.button`
  background: ${props =>  (props.name == props.value ? orange : dark)};
`;

const MigrationButton = styled.button`
  background: ${props =>  (props.name == props.value ? purple : dark)};
`;

const CalculationButton = styled.button`
  background: ${props =>  (props.name == props.value ? colors[props.className] : dark)};
`;

export {ImmigrationButton, EmigrationButton, MigrationButton, CalculationButton};
