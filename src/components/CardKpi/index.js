import React from 'react';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { FaArrowUp, FaEquals } from 'react-icons/fa';

const getClassName = (value) => 'mr-2 '.concat(value > 0 ? 'text-success' : 'text-info');

function CardKpi({
  title = '',
  value = 0,
  description = '',
  classNameCard = 'card-stats mb-4 mb-xl-0',
  icon,
  iconClassName,
  isIntern = true,
}) {
  return (
    <Card className={classNameCard}>
      <CardBody>
        <Row>
          <div className="col">
            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
              {title}
            </CardTitle>
          </div>
          <Col className="col-auto">
            <div className={iconClassName}>{icon}</div>
          </Col>
          {isIntern && (
            <Col className="col">
              <p className="mb-0 text-muted text-sm">
                <span className={getClassName(value)}>
                  {value > 0 ? <FaArrowUp /> : <FaEquals />}
                  <span className="font-weight-bold mb-0">{value}</span>
                </span>{' '}
                <span className="text-nowrap">{description}</span>
              </p>
            </Col>
          )}
        </Row>
        {!isIntern && (
          <p className="mt-3 mb-0 text-muted text-sm">
            <span className={getClassName(value)}>
              {value > 0 ? <FaArrowUp /> : <FaEquals />}
              <span className="font-weight-bold mb-0">{value}</span>
            </span>{' '}
            <span className="text-nowrap">{description}</span>
          </p>
        )}
      </CardBody>
    </Card>
  );
}

export default CardKpi;
