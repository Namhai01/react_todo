function MyCard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = (values) => {
    setIsLoading(true);
    axios
      .post("/api/items", values)
      .then((response) => {
        setData([...data, response.data]);
        form.resetFields();
        message.success("Item added successfully");
      })
      .catch((error) => {
        message.error("Failed to add item");
      })
      .finally(() => setIsLoading(false));
  };

  const handleUpdate = (id, values) => {
    setIsLoading(true);
    axios
      .put(`/api/items/${id}`, values)
      .then((response) => {
        const newData = data.map((item) => {
          if (item.id === id) {
            return { ...item, ...response.data };
          }
          return item;
        });
        setData(newData);
        form.resetFields();
        message.success("Item updated successfully");
      })
      .catch((error) => {
        message.error("Failed to update item");
      })
      .finally(() => setIsLoading(false));
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    axios
      .delete(`/api/items/${id}`)
      .then((response) => {
        setData(data.filter((item) => item.id !== id));
        message.success("Item deleted successfully");
      })
      .catch((error) => {
        message.error("Failed to delete item");
      })
      .finally(() => setIsLoading(false));
  };

  const handleEdit = (item) => {
    form.setFieldsValue(item);
  };

  const handleCancel = () => {
    form.resetFields();
  };

  const handleSubmit = (values) => {
    if (values.id) {
      handleUpdate(values.id, values);
    } else {
      handleAdd(values);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/items")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        message.error("Failed to fetch items");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="id">
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
        <Button htmlType="button" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
      {data.map((item) => (
        <Card key={item.id} style={{ marginBottom: "1rem" }}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <Button type="primary" onClick={() => handleEdit(item)}>
            Edit
          </Button>
          <Button onClick={() => handleDelete(item.id)}>Delete</Button>
        </Card>
      ))}
    </div>
  );
}

export default MyCard;
