import React from 'react'

import { CustomButtonContainer } from './custom-button.styles'

const CustomButtom = (props) => (
    <CustomButtonContainer {...props} >
        {props.children}
    </CustomButtonContainer>
)

export default CustomButtom