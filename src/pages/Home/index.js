import React, { useState, useRef, useEffect } from 'react';
import { compose } from 'recompose';
import axios from 'axios';

import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import { withFirebase } from '../../context/firebase';
// import HomeCard from './HomeCard';
import HomeChart from './HomeChart';

import ENV from '../../constants/environment/common.env';
import { MONTHS } from '../../constants/months';

const getDataStatistic = () => axios.get(`${ENV.apiUrl}/get-statistics-prospect`);
const getDataStatisticWithStatus = () => axios.get(`${ENV.apiUrl}/get-statistics-prospect-with-status`);

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const buildData = (data) =>
  MONTHS.map((m) => {
    if (data[m]) {
      return data[m].length;
    }
    return getRandomArbitrary(0, 37);
  });

const buildChartForBar = (data) => {
  const dataBars = buildData(data);
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'Prospects',
        data: dataBars,
        maxBarThickness: 10,
      },
    ],
  };
};

const buildChartForLine = ({ onload, done }) => {
  const dataCountOnload = buildData(onload);
  const dataCountDone = buildData(done);
  return {
    labels: MONTHS,
    datasets: [
      {
        label: 'En cours',
        data: dataCountOnload,
        borderColor: '#ff9626',
      },
      {
        label: 'Terminer',
        data: dataCountDone,
        borderColor: '#63ff21',
      },
    ],
  };
};

function Home(props) {
  const { IN_APP_ROUTES } = props;
  const mainContent = useRef(null);
  const [dataChartBar, setDataChartBar] = useState({});
  const [dataChartLine, setDataChartLine] = useState({});

  const get = async () => {
    const res = await getDataStatistic();
    const res2 = await getDataStatisticWithStatus();
    const dataToChart = buildChartForBar(res.data);
    const dataToChartLine = buildChartForLine(res2.data);
    setDataChartBar(dataToChart);
    setDataChartLine(dataToChartLine);
  };

  useEffect(() => {
    get();
  }, []);
  return (
    <>
      <SideBar routes={IN_APP_ROUTES} {...props} />
      <div className="main-content" ref={mainContent}>
        <Navbar brandText="Tableau de bord" />
        <div className="header bg-gradient-green py-7 py-lg-8" />
        <HomeChart dataChart={dataChartBar} dataChartLine={dataChartLine} />
      </div>
    </>
  );
}

export default compose(withFirebase)(Home);
