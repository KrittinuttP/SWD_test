import React, { useState } from 'react';
import { Card, Col, Row } from 'antd';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const gridStyle: React.CSSProperties = {
    width: '100%',
    height: '130px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
};

const MainLayout: React.FC<WithTranslation> = ({ t }) => {
    return (
        <div className='main-page'>
            <Row gutter={50} justify='center'>
                <Col className="gutter-row" span={8}>
                    <Link to="/layout">
                        <Card className='card-hover'>
                            <Card.Grid style={gridStyle}>
                                <p>{t('title_layout')}</p>
                            </Card.Grid>
                        </Card>
                    </Link>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Link to="/form">
                        <Card className='card-hover'>
                            <Card.Grid style={gridStyle}>
                                <p>{t('title_form')}</p>
                            </Card.Grid>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </div>

    )
}



export default withTranslation()(MainLayout);