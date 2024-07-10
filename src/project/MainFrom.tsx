import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, message, Form, Input, Row, Col, Select, DatePicker, Radio } from 'antd';
import { withTranslation, WithTranslation } from 'react-i18next';
import { updateForm, resetForm } from '../mainSlice';
import { RootState, AppDispatch } from '../store';
import FromTable from './component/FromTable';
import moment from 'moment';

const { Option } = Select;

const MainLayout: React.FC<WithTranslation> = ({ t }) => {
    const [editKey, setEditKey] = useState<React.Key | null>(null);
    const [messageApi, contextHolder] = message.useMessage();
    const formData = useSelector((state: RootState) => state.main);
    const dispatch = useDispatch<AppDispatch>();
    const form = Form.useForm()[0]; // Access the form instance
    const resultData = formData?.formData

    const prefixSelector = (
        <Form.Item name="contryPhone" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="+66">+66</Option>
                <Option value="+1">+1</Option>
                <Option value="+33">+33</Option>
                <Option value="+81">+81</Option>
            </Select>
        </Form.Item>
    );

    const onFinish = (values: any) => {
        if (values.birthday) {
            values.birthday = values.birthday.format('YYYY-MM-DD');
        }
        // Add or update formData based on editKey
        if (editKey !== null) {
            // Update existing entry
            const existingData = resultData.find((item) => item.key === editKey);
            if (existingData) {
                dispatch(updateForm({ ...existingData, ...values }));
            }
            setEditKey(null);
        } else {
            // Add new entry
            const newKey = resultData.length > 0 ? resultData[resultData.length - 1].key + 1 : 1; // Start key from 1
            dispatch(updateForm({ key: newKey, ...values }));
        }

        success();
        form.resetFields();
    };

    const onResetAll = () => {
        // form.resetFields();
        dispatch(resetForm());
    };

    const onReset = () => {
        form.resetFields();
        // dispatch(resetForm());
    };

    const success = () => {
        messageApi.open({
            type: 'success',
            content: ' Save successfully!!',
            duration: 3,
        });
    };

    const editFrom = () => {
        if (editKey !== null && resultData.length > 0) {
            const editedData = resultData.find((item) => item.key === editKey);
            if (editedData) {
                let birthdayMoment = null;
                if (editedData.birthday) {
                    birthdayMoment = moment(editedData.birthday, 'YYYY-MM-DD');
                    if (!birthdayMoment.isValid()) {
                        birthdayMoment = null;
                    }
                }
                form.setFieldsValue({
                    ...editedData,
                    birthday: birthdayMoment,
                });
            }
        } else {
            form.resetFields();
        }
    };


    useEffect(() => {
        console.log('test')
        editFrom()
    }, [editKey]);

    return (
        <>
            <Form
                form={form}
                name="normal_login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                {contextHolder}

                <Row gutter={16} justify='center'>
                    <Col span={15} className="form-input">
                        <Row gutter={16} justify='start'>
                            <Col className="gutter-row" span={4}>
                                <Form.Item
                                    label={t('form_title')}
                                    name="title"
                                    rules={[{ required: true, message: 'Please select title!' }]}>
                                    <Select placeholder="select your title"
                                    >
                                        <Select.Option value="mr">{t('form_title_mr')}</Select.Option>
                                        <Select.Option value="mrs">{t('form_title_mrs')}</Select.Option>
                                        <Select.Option value="ms">{t('form_title_ms')}</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={10}>
                                <Form.Item
                                    label={t('form_fname')}
                                    name="fname"
                                    rules={[{ required: true, message: 'Please input your first name!' }]}
                                >
                                    <Input placeholder="First Name" />
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row" span={10}>
                                <Form.Item
                                    label={t('form_lname')}
                                    name="lname"
                                    rules={[{ required: true, message: 'Please input your last name!' }]}
                                >
                                    <Input placeholder="First Name" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} justify='start'>
                            <Col className="gutter-row" span={6}>
                                <Form.Item
                                    label={t('form_birthday')}
                                    name="birthday"
                                    rules={[{ required: true, message: 'Please input your birthday!' }]}
                                >
                                    <DatePicker format="YYYY-MM-DD" />
                                </Form.Item>
                            </Col>

                            <Col className="gutter-row" span={8}>
                                <Form.Item
                                    label={t('form_nation')}
                                    name="nation"
                                    rules={[{ required: true, message: 'Please select Nationality!' }]}>
                                    <Select placeholder="select your Nationality"
                                    >
                                        <Select.Option value="th">{t('form_nation_th')}</Select.Option>
                                        <Select.Option value="fr">{t('form_nation_fr')}</Select.Option>
                                        <Select.Option value="am">{t('form_nation_am')}</Select.Option>
                                        <Select.Option value="jp">{t('form_nation_jp')}</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16} justify='start'>

                            <Col className="gutter-row" span={20}>
                                <Form.Item
                                    label={t('form_citizen')}
                                    name="citizen"
                                    rules={[{ required: true, message: 'Please input your citizen id!' }]}
                                >
                                    <Input.OTP length={13} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} justify='start'>
                            <Col className="gutter-row" span={8}>
                                <Form.Item
                                    label={t('form_gender')}
                                    name="gender"
                                    rules={[{ required: true, message: 'Please input your gender!' }]}
                                >
                                    <Radio.Group>
                                        <Radio value="male">{t('form_male')}</Radio>
                                        <Radio value="female">{t('form_female')}</Radio>
                                        <Radio value="unsex">{t('form_unsex')}</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} justify='start'>
                            <Col className="gutter-row" span={8}>
                                <Form.Item
                                    label={t('form_mobile')}
                                    name="mobile"
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                >
                                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} maxLength={10} />

                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} justify='start'>
                            <Col className="gutter-row" span={10}>
                                <Form.Item
                                    label={t('form_passport')}
                                    name="passport"
                                    rules={[{ required: false, message: 'Please input your passport!' }]}
                                >
                                    <Input placeholder="Passport" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} justify='start'>
                            <Col className="gutter-row" span={10}>
                                <Form.Item
                                    label={t('form_salary')}
                                    name="salary"
                                    rules={[{ required: true, message: 'Please input your salary!' }]}
                                >
                                    <Input placeholder="Salary" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item >
                            <Row gutter={16} justify='center'>
                                <Col className="gutter-row" span={3}>
                                    <Button type="primary" htmlType="button" onClick={onReset} danger>
                                        {t('form_reset')}
                                    </Button>
                                </Col>
                                <Col className="gutter-row" span={3}>
                                    <Button type="primary" htmlType="submit">
                                        {t('form_submit')}
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>

                    </Col>
                </Row>
            </Form>


            {/* <Row gutter={16} justify='start'>
                <Col className="gutter-row" span={2}>
                    <Button type="primary" htmlType="submit"  danger>
                        {t('form_del')}
                    </Button>
                </Col>

                <Col className="gutter-row" span={2}>
                    <Button type="primary" htmlType="submit" onClick={onResetAll} danger>
                        Reset ALL
                    </Button>
                </Col>
            </Row> */}

            <FromTable editKey={editKey} setEditKey={setEditKey} />

        </>
    )
}

export default withTranslation()(MainLayout);