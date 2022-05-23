
import IconHandle from "../CommonComponents/IconHandler"
import AddGroupButton from './AddGroupButton'
import { Container, Row, Col } from 'react-bootstrap'
const AddGroupBar =

    ({ Input, Contacts, ForceGroupListing, UpdateGroups, GroupHook, UpdateCycleLog, Mapping, setMapping, UpdateIndex, Index }) => {
         // TODO 21/05/22: Find Out how to re-render Groups
        return (

            <Container fluid="md">


                <Row>
                    <div className="AddGroupBar" >

                        <Col>
                            <AddGroupButton UpdateIndex={UpdateIndex} Index={Index}  setMapping={setMapping} Mapping={Mapping}  UpdateCycleLog={UpdateCycleLog} GroupHook={GroupHook} Input={Input} Contacts={Contacts} ForcegroupListing={ForceGroupListing} UpdateGroups ={UpdateGroups } />
                        </Col>
                    </div>
                </Row>


            </Container>
        )


    }

export default AddGroupBar;