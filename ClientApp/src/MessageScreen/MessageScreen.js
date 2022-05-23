
import TextBox from './TextBox'

import Groups from './Groups';
import {Container,Row,Col} from 'react-bootstrap'

const MessageScreen =
    ({ Contacts }) => {

        return (
            

            <Container fluid>
                <Row className ="background2">
                    <Col>
                        <Groups className="heightIncrase" Contacts={Contacts} />
                        </Col>
                </Row>
            </Container>
            )
         
            
        













    }

export default MessageScreen