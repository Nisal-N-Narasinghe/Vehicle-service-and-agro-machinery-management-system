import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button,
  Chip,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardGroup,
  CardImg,
  CardImgOverlay,
  Collapse,
  Alert,
  UncontrolledCollapse,
  Toast,
  ToastHeader,
  ToastBody,
  ButtonToggle,
  CardLink,
  NavLink
  
} from "reactstrap";

import { Accordion } from 'react-bootstrap-accordion';
import 'react-bootstrap-accordion/dist/index.css';
// core components
import Header from "components/Headers/Header.js";




const ViewFAQs = () => {
  // states
  const [allFAQs, setAllFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // set visible rows
  const [visible, setVisible] = useState(10);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all vacancies from database
  useEffect(() => {
    const fetchAllFaqs = async () => {
      try {
        const res = await axios.get("/api/faqs");
        
        setAllFaqs(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllFaqs();
  }, []);

  //accordion 
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  }


  const handleDelete = (id) => {
    axios.delete(`/api/faqs/${id}`).then((res) => {
      console.log(res.data);
      setAllFaqs((prevData) =>
        prevData.filter((faq) => faq._id !== id)
      );
    });
  };

 
    return (
    <>
      <Header/>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Light Table */}
        <Row>
          <div className="col">
            <Card className="shadow" color="lighter">
              <CardHeader className="border-0" style={{marginBottom: '1.8rem'}}>
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">All FAQs</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      className="btn-icon btn-3"
                      color="success"
                      type="button"
                      onClick={() => navigate("/admin/create-faq")}
                    >
                      <span
                        className="btn-inner--icon"
                        style={{ width: "20px" }}
                      >
                        <i className="ni ni-planet" />
                      </span>
                      <span className="btn-inner--text">Add FAQ</span>
                    </Button>
                  </div>
                </Row>
              </CardHeader>

            <Container>
                
              {allFAQs.slice(0, visible).map((faq, index) => (
              
                <Accordion title={faq.faq_question} open={open} toggle={toggle}>
                
                {faq.faq_answer}

                <Row>
                  <NavLink href={faq.vid_link} style={{ color: 'teal', marginLeft: '0.2rem'}}>Watch Tutorial here</NavLink>
                </Row>
                  <Row style={{marginTop: '1rem'}}>
                      <Button style={{marginLeft: '0.8rem', marginRight: '1rem'}}
                          size="sm"
                          color="warning"
                          onClick={() =>
                            navigate(`/admin/update-faq/${faq._id}`)}
                         
                      >
                          Update FAQ
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(faq._id)}
                        >
                          Delete FAQ
                        </Button>
                    </Row>
                   
                </Accordion>
                
            ))}
            
              </Container>
              
              
              <CardFooter className="py-4" style={{marginTop: '1.8rem'}}>
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={showMoreItems}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ViewFAQs;