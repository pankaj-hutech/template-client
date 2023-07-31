import React from "react";
import styles from "./AddColumn.module.scss";
import axios from 'axios';

import JsonData from '../JSON/template.json'
import { Button, Row, Col, Select, message } from "antd";
import ModalPop from "./modal";
import { CloseCircleOutlined, FolderAddOutlined } from "@ant-design/icons";

const AddColumn = () => {
    const [ colData, setColData ] = React.useState([]);
    const [ layoutModal, setLayoutModal ] = React.useState<boolean>(false);
    const { LayoutData } = JsonData;
    const [ columnVal, setColumnVal ] = React.useState<String>(LayoutData.defaultValue || '')

    React.useEffect(() => {
        getColDataAPi()
    }, [])

    const getColDataAPi = async () => {
        try {
            const req = await axios.get(`${process.env.REACT_APP_BASE_URL}/columns`)
            await setColData(req?.data)
        } catch (err) {
            message.error(JSON.stringify(err))
        }
    }

    const deleteColReq = async (id: string) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/columns${id}`);
            await getColDataAPi()
        } catch (err) {
            message.error(JSON.stringify(err))
        }
    }

    const onOkColumnHandle = async () => {
        //push JSON in DB
        try {
            const columnPostData = {
                id: Math.floor(100000 + Math.random() * 900000),
                ...LayoutData?.option?.filter(({ value }: any) => value === columnVal)[ 0 ]
            }
            await axios.post(`${process.env.REACT_APP_BASE_URL}/columns`, {
                ...columnPostData
            })
        } catch (err) {
            message.error(JSON.stringify(err), 10)
        }
    }

    const AddColumnJSX = (
        <>
            <Select
                value={columnVal}
                onChange={(e: String) => setColumnVal(e)}
                defaultValue={LayoutData?.defaultValue}
                style={{ display: 'block' }}
                options={LayoutData.option}
            />
        </>
    )
    return (
        <div className={styles.container}>
            <div className={styles.maincontainer}>
                {colData?.map((item: any) =>
                    <Row className={styles.itemRow} gutter={16}>
                        <CloseCircleOutlined className={styles.closeBtn} onClick={() => deleteColReq(item._id)}
                        />
                        {new Array(item.column)?.fill(0)?.map((_, idx) =>
                            <Col span={24 / item.column} key={idx} >
                                <div className={styles.colStype} >
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
                                </div>
                            </Col>
                        )}
                    </Row>
                )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button icon={<FolderAddOutlined />} type="dashed" onClick={() => {
                    getColDataAPi()
                    setLayoutModal(true)
                }
                }>Add Column</Button>
                {layoutModal && <ModalPop content={AddColumnJSX} layoutModal={layoutModal} setLayoutModal={setLayoutModal} onOkHandle={onOkColumnHandle} />}
            </div>
        </div>
    );
}

export default AddColumn;