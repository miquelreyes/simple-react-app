import { Switch, useDarkreader } from 'react-darkreader';
import styled from 'styled-components';

const StyledSwitch = styled(Switch)`
    align-self: flex-start;
`;

// eslint-disable-next-line react/display-name
export default () => {
    const [isDark, { toggle }] = useDarkreader(false);
  
    return <StyledSwitch checked={isDark} onChange={toggle} />;
};