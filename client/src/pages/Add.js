import React, { Component } from "react";
import API from "../utils/API";
import Cookies from "js-cookie";
import { Background } from "../components/Basics";
import Navigation from "../components/Navigation";
import { Title } from "../components/Title";
import { Box } from "../components/Box";
import { Form, EmployeeForm, NGOForm } from "../components/Form";
import "../index.css";

class Add extends Component {
  state = {
    user: {},
    id: Cookies.get("token"),
    active: "employee",
    employeeName: "",
    employeeTitle: "",
    employeeNGO: [],
    ngoName: "",
    ngoPurpose: "",
    dbNGO: []
  };

  componentDidMount() {
    this.getUser(this.state.id);
  }

  getUser = id => {
    if (id) {
      API.getUser(id)
        .then(res => {
          console.log(res.data);
          this.setState({ user: res.data });
        })
        .catch(err => console.log(err));
    } else {
      this.props.history.push("/");
    }
  };

  //Create new NGO
  createNGO = dbNGO => {
    API.createNGO(dbNGO)
      .then(res => {
        console.log("dbNGO", res);
      })
      .catch(err => console.log(err));
  };

  //Check Add NGO or Add Employee form is selected
  handleActiveState = active => {
    this.setState({
      active: active !== "ngo" ? "employee" : "ngo"
    });
  };

  //Check for change in inout field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  //When new NGO is added
  handleNGOSubmit = (event, ngo) => {
    event.preventDefault();
    // console.log("ngo", ngo);
    const dbNGO = {
      name: ngo.name,
      purpose: ngo.purpose
    };
    this.createNGO(dbNGO);
  };

  //When new Employee is added
  handleEmployeeSubmit = (event, employee) => {
    event.preventDefault();
    // console.log("employee", employee);
  };

  //Check if checkbox is ticked under Add Employee
  handleCheckboxChange = event => {
    event.preventDefault();
    // const target = event.target;

    // console.log("event.target", target.value);
    // console.log("event.checked", target.checked);
  };

  render() {
    // console.log("Cookie id: ", Cookies.get("token"));
    // console.log("Props: ", this.props);
    // console.log("Window: ", window);
    // console.log("Active State: ", this.state.active);

    return (
      <Background page="dashboard">
        <Navigation props={this.props} />
        <div className="add-content">
          <Title title="Add New Employee Or NGO" />
          <div className="add-content-wrapper">
            <div className="add-content-button">
              <div
                className={
                  this.state.active === "employee"
                    ? "active-gradient"
                    : "inactive-gradient"
                }
                onClick={() => this.handleActiveState("employee")}
              >
                ADD EMPLOYEE
              </div>
              <div
                className={
                  this.state.active === "ngo"
                    ? "active-gradient"
                    : "inactive-gradient"
                }
                onClick={() => this.handleActiveState("ngo")}
              >
                ADD NGO
              </div>
            </div>
            <Box location="add">
              <Form>
                {this.state.active === "ngo" ? (
                  <NGOForm
                    name={this.state.ngoName}
                    purpose={this.state.ngoPurpose}
                    handleInputChange={this.handleInputChange}
                    handleNGOSubmit={this.handleNGOSubmit}
                  />
                ) : (
                  <EmployeeForm
                    name={this.state.employeeName}
                    title={this.state.employeeTitle}
                    supports={this.state.dbNGO}
                    handleInputChange={this.handleInputChange}
                    handleEmployeeSubmit={this.handleEmployeeSubmit}
                    handleCheckboxChange={this.handleCheckboxChange}
                  />
                )}
              </Form>
            </Box>
          </div>
        </div>
      </Background>
    );
  }
}

export default Add;

// d-flex flex-column justify-content-around align-items-center
