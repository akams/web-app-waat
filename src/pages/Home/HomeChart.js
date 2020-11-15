/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Chart from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Card, CardHeader, CardBody, Row, Col, Spinner } from 'reactstrap';
import { chartOptions, parseOptions, chartExample1, chartExample2 } from '../../chart';

const styles = {
  spinner: {
    position: 'relative',
    top: '50%',
  },
};

class HomeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }

  render() {
    const { dataChart, dataChartLine, isLoading } = this.props;
    return (
      <Row>
        <Col className="mb-5 mb-xl-0" xl="8">
          <Card className="bg-gradient-default shadow">
            <CardHeader className="bg-transparent">
              <Row className="align-items-center">
                <div className="col">
                  <h6 className="text-uppercase text-light ls-1 mb-1">Aperçu</h6>
                  <h2 className="text-white mb-0">Fiche travaux (en cours / terminer)</h2>
                </div>
              </Row>
            </CardHeader>
            <CardBody>
              {/* Chart */}
              <div className="chart text-center">
                {isLoading ? (
                  <Spinner style={styles.spinner} color="primary" />
                ) : (
                  <Line data={dataChartLine} options={chartExample1.options} x />
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl="4">
          <Card className="bg-gradient-default shadow h-100">
            <CardHeader className="bg-transparent">
              <Row className="align-items-center">
                <div className="col">
                  <h6 className="text-uppercase text-light ls-1 mb-1">Performance</h6>
                  <h2 className="mb-0 text-white">Total des fiches travaux</h2>
                </div>
              </Row>
            </CardHeader>
            <CardBody>
              {/* Chart */}
              <div className="chart text-center">
                {isLoading ? (
                  <Spinner style={styles.spinner} color="primary" />
                ) : (
                  <Bar data={dataChart} options={chartExample2.options} />
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default HomeChart;
