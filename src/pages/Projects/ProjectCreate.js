import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector, useDispatch } from "react-redux";
import { CREATE_PROJECT_SAGA, GET_PROJECT_CATEGORY_SAGA } from "../../store/types/Type";

export default function ProjectCreate() {

  const projectCategory = useSelector(state => state.ProjectReducer.projectCategory);

  const [newProject, setNewProject] = useState({
    projectName: "",
    description: "",
    categoryId: 0,
    alias: "" 
  })

  const dispatch = useDispatch();

  const { Option } = Select;

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
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

  const onFinish = () => {
    console.log('Success, sending values', newProject);

    //send data via API
    dispatch({
      type: CREATE_PROJECT_SAGA,
      newProject: newProject
    })

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  useEffect(() => {
    dispatch({
      type: GET_PROJECT_CATEGORY_SAGA
    })
  },[]);

  const renderCategoryList = () => {
    console.log('projectCategory',projectCategory);
    return (
      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <Select placeholder="Select a category" onChange={(e) => {
          setNewProject({
            ...newProject,
            categoryId: parseInt(e)
          })
        }}>
          {
            projectCategory.map((project) => {
              return <Option value={project.id}>{project.projectCategoryName}</Option>
            })
          }
        </Select>
      </Form.Item>
    );
  };

  return (
    <div>
      <h3>Create project</h3>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        onFinishFailed={onFinishFailed}
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
          <Input onChange={(e) => { setNewProject({
            ...newProject,
            projectName: e.target.value
          }) }}/>
        </Form.Item>

        <Form.Item name="description" label="Description">
          <CKEditor
            editor={ClassicEditor}
            data=""
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setNewProject({
                ...newProject,
                description: data
              })
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </Form.Item>

        {renderCategoryList()}

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 20 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
