
import TextBox from './TextBox'

import Groups from './Groups';
import {Container,Row,Col} from 'react-bootstrap'

const MessageScreen =
    ({ Contacts, Connection }) => {

        return (
            

            <Container fluid>
                <Row className ="background2">
                    <Col>
                        <Groups className="heightIncrase" Contacts={Contacts} Connection={Connection} />
                        </Col>
                </Row>
            </Container>
            )
         
            
        













    }

export default MessageScreen