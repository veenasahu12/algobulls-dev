import { React, useState } from "react";
import { data } from "./Data";
import { Table, Modal, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const App = (props) => {
  const [Data, setData] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const [edit, setEdit] = useState(null);
  const [search, setSearch] = useState("");

  const columns = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => {
        return a.id > b.id;
      },
    },
    {
      key: "TimeStampCreated",
      title: "TimeStamp Created",
      dataIndex: "TimeStampCreated",
      sorter: (a, b) => {
        return a.TimeStampCreated > b.TimeStampCreated;
      },
    },
    {
      key: "title",
      title: "Title",
      dataIndex: "title",
      filteredValue: [search],
      onFilter: (value, record) => {
        return (
          String(record.title).toLowerCase().includes(value.toLowerCase()) ||
          String(record.description)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.dueDate).toLowerCase().includes(value.toLowerCase())
        );
      },
      sorter: (a, b) => {
        return a.title > b.title;
      },
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => {
        return a.description > b.description;
      },
    },
    {
      key: "dueDate",
      title: "Due Date",
      dataIndex: "dueDate",
      sorter: (a, b) => {
        return a.dueDate > b.dueDate;
      },
    },
    {
      key: "tags",
      title: "Tags",
      dataIndex: "tags",
      filters: [
        {
          text: "history",
          value: "history",
        },
        {
          text: "american",
          value: "american",
        },
        {
          text: "crime",
          value: "crime",
        },
        {
          text: "french",
          value: "french",
        },
        {
          text: "fiction",
          value: "fiction",
        },
        {
          text: "english",
          value: "english",
        },
        {
          text: "magical",
          value: "magical",
        },
        {
          text: "mystery",
          value: "mystery",
        },
        {
          text: "love",
          value: "love",
        },
        {
          text: "classic",
          value: "classic",
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "DONE",
          value: "DONE",
        },
        {
          text: "WORKING",
          value: "WORKING",
        },
        {
          text: "OPEN",
          value: "OPEN",
        },
        {
          text: "OVERDUE",
          value: "OVERDUE",
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      key: "action",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <div className="flex">
              <EditOutlined
                style={{ color: "blue" }}
                onClick={() => Edit(record)}
              />
              <DeleteOutlined
                style={{ color: "red", marginLeft: "18px" }}
                onClick={() => Delete(record)}
              />
            </div>
          </>
        );
      },
    },
  ];

  const Delete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this",
      okText: "Confirm",
      okType: "danger",
      onOk: () => {
        setData((pre) => {
          return pre.filter((todo) => todo.id !== record.id);
        });
      },
    });
  };

  const Edit = (record) => {
    setIsEditing(true);
    setEdit({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEdit(null);
  };

  return (
    <>
      <div className="app">
        <Input.Search
          placeholder="SEARCH HERE ... "
          style={{
            color: "blue",
            marginLeft: "35%",
            width: "40%",
            fontWeight: "bold",
            marginTop: 15,
            marginBottom: 15,
          }}
          onSearch={(value) => {
            setSearch(value);
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="table">
          <Table
            dataSource={Data}
            columns={columns}
            pagination={{
              position: ["bottomCenter"],
              pageSize: 5,
              total: 30,
              showSizeChanger: true,
            }}
          />
          <Modal
            title="Edit Details"
            open={isEditing}
            okText="Save"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              setData((pre) => {
                return pre.map((elem) => {
                  if (elem.id === edit.id) {
                    return edit;
                  } else {
                    return elem;
                  }
                });
              });
              resetEditing();
            }}
          >
            <Input
              value={edit?.TimeStampCreated}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, TimeStampCreated: e.target.value };
                });
              }}
            />
            <Input
              value={edit?.title}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, title: e.target.value };
                });
              }}
            />
            <Input
              value={edit?.description}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, description: e.target.value };
                });
              }}
            />
            <Input
              value={edit?.dueDate}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, dueDate: e.target.value };
                });
              }}
            />
            <Input
              value={edit?.tags}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, tags: e.target.value };
                });
              }}
            />
            <Input
              value={edit?.status}
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, status: e.target.value };
                });
              }}
            />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default App;
