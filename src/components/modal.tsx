import React from "react";
import { Modal } from "antd"

const ModalPop = ({ content, layoutModal, setLayoutModal, onOkHandle }: any) => {
    return (
        <Modal
            title="Select Column"
            style={{ top: 20 }}
            open={layoutModal}
            onOk={() => {
                setLayoutModal(false)
                onOkHandle()
            }
            }
            onCancel={() => setLayoutModal(false)}
        >
            {content}
        </Modal>
    )
}


export default ModalPop;