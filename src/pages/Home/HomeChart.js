/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import classnames from 'classnames';
import Chart from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { chartOptions, parseOptions, chartExample1, chartExample2 } from '../../chart';

class HomeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: 'data1',
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  toggleNavs = (e, index) => {
    const { chartExample1Data } = this.state;
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data: chartExample1Data === 'data1' ? 'data2' : 'data1',
    });
  };

  render() {
    return (
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">Aperçu</h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames('py-2 px-3', {
                            active: this.state.activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => this.toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames('py-2 px-3', {
                            active: this.state.activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => this.toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartExample1[this.state.chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                    <h2 className="mb-0">Total des fiches travaux</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar data={chartExample2.data} options={chartExample2.options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomeChart;
