import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import { withTranslation, WithTranslation } from 'react-i18next';
import './css/iconStyle.css';
import LayoutIcon from './component/LayoutIcon';
import PageTitle from '../PageTitle';

const MainLayout: React.FC<WithTranslation> = ({ t }) => {
    const [iconList, setIconList] = useState<string[]>([
        'square'
        , 'circle'
        , 'square'
        , 'oval'
        , 'trapezoid'
        , 'rectangle'
        , 'parallelogram'
        , 'triangle-up'
    ])
    const [rowStyle, setRowStyle] = useState<string[]>(['end', 'center']);

    const movePositionR = () => {
        setIconList(prevIconList => {
            const newIconList = [...prevIconList];
            const firstItem = newIconList.shift(); // Remove the first item
            if (firstItem) {
                newIconList.push(firstItem); // Push the first item to the end
            }
            return newIconList;
        });
    };

    const movePositionL = () => {
        setIconList(prevIconList => {
            const newIconList = [...prevIconList];
            const lastItem = newIconList.pop(); // Remove the last item
            if (lastItem) {
                newIconList.unshift(lastItem); // Add the last item to the beginning
            }
            return newIconList;
        });
    };

    const movePositionT = () => {
        setIconList(prevIconList => {
            const newIconList = [...prevIconList];
            const firstRow = newIconList.splice(0, 4); // Remove the first row (4 items)
            newIconList.push(...firstRow); // Push the first row to the end of the list
            return newIconList;
        });

        setRowStyle(prevRowStyle => {
            const newRowStyle = [...prevRowStyle];
            const firstStyle = newRowStyle.shift(); // Remove the first item
            if (firstStyle) {
                newRowStyle.push(firstStyle); // Push the first item to the end
            }
            return newRowStyle;
        });
    };


    return (
        <>
            <br />
            <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                    <Button onClick={() => movePositionL()}>
                        <p className='arrow left'></p>
                        <p>{t('m_shapeL')}</p>
                    </Button>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Button onClick={() => movePositionT()}>
                        <p className='arrow up'></p>
                        <p className='arrow down'></p>
                        <p>{t('m_moveP')}</p>
                    </Button>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Button onClick={() => movePositionR()}>
                        <p className='arrow right'></p>
                        <p>{t('m_shapeR')}</p>
                    </Button>
                </Col>
            </Row>
            <br />
            <LayoutIcon iconList={iconList} setIconList={setIconList} rowStyle={rowStyle} />
        </>
    )
}

export default withTranslation()(MainLayout);