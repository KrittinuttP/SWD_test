import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { TableColumnsType, PopconfirmProps } from 'antd';
import { Button, Table, message, Popconfirm, Row, Col, Checkbox, Divider } from 'antd';
import { withTranslation, WithTranslation } from 'react-i18next';
import { RootState } from '../../store';
import { deleteForm } from '../../mainSlice';

interface DataType {
    key: React.Key;
    name: string;
    gender: string;
    mobile: string;
    nation: string;
}

interface Props extends WithTranslation {
    editKey: React.Key | null;
    setEditKey: React.Dispatch<React.SetStateAction<React.Key | null>>;
}


const FromTable: React.FC<Props> = ({ t, editKey, setEditKey }) => {
    const dispatch = useDispatch();

    const formData = useSelector((state: RootState) => state.main);
    const resultData = formData?.formData


    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [indeterminate, setIndeterminate] = useState<boolean>(false);
    const [checkAll, setCheckAll] = useState<boolean>(false);

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
        message.error('Cancel Delete!');
    };

    const handleEdit = (index: React.Key) => {
        const newKey = resultData[index].key;
        setEditKey(newKey)
    };

    const handleDelete = (index: React.Key) => {
        const newKey = resultData[index].key;
        dispatch(deleteForm(newKey));
        message.success('Delete Complete!');
        // Implement your delete logic here, e.g., dispatching an action to remove the record from Redux state
    };

    const deleteSelect = () => {
        selectedRowKeys.forEach((index) => {
            handleDelete(index);
        });
        setSelectedRowKeys([]); // Clear selected rows after deletion
        setIndeterminate(false); // Reset indeterminate state
        setCheckAll(false); // Uncheck the "Check all" checkbox
    };


    const columns: TableColumnsType<DataType> = [
        {
            title: t('form_name'),
            dataIndex: 'name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: t('form_gender'),
            dataIndex: 'gender',
            sorter: (a, b) => a.gender.localeCompare(b.gender),
            render: (gender: string) => {
                switch (gender) {
                    case 'male':
                        return t('form_male');
                    case 'female':
                        return t('form_female');
                    case 'unsex':
                        return t('form_unsex');
                    default:
                        return '';
                }
            },
        },
        {
            title: t('form_mobile'),
            dataIndex: 'mobile',
            sorter: (a, b) => a.mobile.localeCompare(b.mobile),
        },
        {
            title: t('form_nation'),
            dataIndex: 'nation',
            sorter: (a, b) => a.nation.localeCompare(b.nation),
            render: (nation: string) => {
                switch (nation) {
                    case 'th':
                        return t('form_nation_th');
                    case 'fr':
                        return t('form_nation_fr');
                    case 'am':
                        return t('form_nation_am');
                    case 'jp':
                        return t('form_nation_jp');
                    default:
                        return '';
                }
            },
        },
        {
            title: t('form_manage'),
            dataIndex: 'manage',
            render: (text: string, record: DataType) => (
                <>
                    <Button
                        type="primary"
                        onClick={() => handleEdit(record.key)}
                    >
                        {t('form_edit')}
                    </Button>

                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => handleDelete(record.key)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="primary"
                            danger
                        >
                            {t('form_del')}
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const data: DataType[] = [];

    resultData.forEach((item: any, index: any) => {
        data.push({
            key: index,
            name: item.fname + ' ' + item.lname,
            gender: item.gender,
            mobile: item.contryPhone + item.mobile,
            nation: item.nation,
        });
    });

    // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    //     console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    //     setSelectedRowKeys(newSelectedRowKeys);
    // };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
        setIndeterminate(!!newSelectedRowKeys.length && newSelectedRowKeys.length < data.length);
        setCheckAll(newSelectedRowKeys.length === data.length);
    };

    const onCheckAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        const newSelectedRowKeys = isChecked ? data.map((item) => item.key) : [];
        setSelectedRowKeys(newSelectedRowKeys);
        setIndeterminate(false);
        setCheckAll(isChecked);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };





    return (
        <div className='FromTable'>
            <Row gutter={10} justify='start'>
                <Col className="gutter-row" span={4}>
                    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                     {t('form_select')}
                    </Checkbox>

                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this select?"
                        onConfirm={() => deleteSelect()}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="primary"
                            danger
                        >
                            {t('form_del')}
                        </Button>
                    </Popconfirm>
                </Col>
            </Row>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                rowKey="key"
                pagination={{ pageSize: 10, position: ['none', 'topRight'] }}

            />;
        </div>

    )
}


export default withTranslation()(FromTable);