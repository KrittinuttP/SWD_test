import { Button, Col, Row, Card } from 'antd'
import React, { useState } from 'react'

interface LayoutIconProps {
    iconList: string[];
    setIconList: React.Dispatch<React.SetStateAction<string[]>>;
    rowStyle: string[];
}

const gridStyle: React.CSSProperties = {
    width: '100%',
    height: '130px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
};

const shuffleArray = (array: string[]): string[] => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};


const LayoutIcon: React.FC<LayoutIconProps> = ({ iconList, setIconList, rowStyle }) => {

    const handleShuffle = () => {
        setIconList(shuffleArray(iconList));
        console.log(iconList);
    };

    const renderLayout = (icons: string[]) => {
        const rows = [];
        for (let i = 0; i < icons.length; i += 4) {
            const rowItems = icons.slice(i, i + 4);
            rows.push(

                <Row key={i} gutter={[16, 16]} className='margin-10' justify={rowStyle[rows.length]}>
                    {rowItems.map((item, index) => (
                        <Col key={index} className="gutter-row" span={5} onClick={handleShuffle}>
                            <Card className='card-hover'>
                                <Card.Grid style={gridStyle}>
                                    <div className={`icon-100 ${item}`}></div>
                                </Card.Grid>
                            </Card>
                        </Col>
                    ))}
                </Row>
            );
        }
        return rows;
    };

    return (
        <>
            {renderLayout(iconList)}
        </>
    )
}

export default LayoutIcon