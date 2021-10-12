import { useParams } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { CREATE_PROJECT_SAGA, GET_DETAIL_PROJECT_SAGA } from "../../store/types/Type";
import { update } from "immutable";

export default function ProjectDetail() {
  let { id } = useParams();

  const { detailProject } = useSelector(state => state.ProjectReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useeffect');
    dispatch({
      type: GET_DETAIL_PROJECT_SAGA,
      projectId: id
    })
  }, []);


  const { Option } = Select;

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  /* eslint-disable no-template-curly-in-string */

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (values) => {
    console.log('updated', values);
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  

  const renderCategoryList = () => {

    return (
      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <Select defaultValue={detailProject.projectCategory?.id} placeholder="Select a category" >
          <Option value="1">Test</Option>
          <Option value="2">Test2</Option>
          <Option value="3">Test3</Option>
        </Select>
      </Form.Item>
    );
  };

  return (
    <div>
      <h3>Edit project: {id}</h3>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        onFinishFailed={onFinishFailed}
        fields={[
          {
            name: ["projectName"],
            value: detailProject.projectName,
          },
        ]}
      >
        <Form.Item
          name="projectName"
          label="Project Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <CKEditor
            editor={ClassicEditor}
            data={detailProject.description}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </Form.Item>

        <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <Select defaultValue={detailProject.projectCategory?.id} placeholder="Select a category" >
          <Option value="1">Test</Option>
          <Option value="2">Test2</Option>
          <Option value="3">Test3</Option>
        </Select>
      </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
