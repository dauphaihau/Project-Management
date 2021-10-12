import React from 'react'
import { Modal } from 'antd';

export default function TaskForm(props) {
  console.log(props);
    const projectDetail = props.projectDetail;

    const [visible, setVisible] = React.useState(props.vislble);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };


    return (
      //   <Modal
      //   title="Title"
      //   visible={visible}
      //   onOk={handleOk}
      //   confirmLoading={confirmLoading}
      //   onCancel={handleCancel}
      // >
      //   <p>Project Modal</p>
      // </Modal>
      <div>
          Project
        
      </div>
    )
}
