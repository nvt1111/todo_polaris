import { Card, ResourceList, ResourceItem, TextStyle, Button, Stack, Page, Checkbox } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { Badge } from '@shopify/polaris';
import './Todos.css';
import useFetchData from '../../hooks/useFetchApi';
import makeRequest from '../../helpers/api/makeRequest';
import ModalExample from '../Modal/Modal';

function ResourceItemExample() {
    const { todos, setTodos } = useFetchData();
    const [selectedItems, setSelectedItems] = useState([]);
    const [active, setActive] = useState(false);
    const [checked, setChecked] = useState(false);

    const handleBulkComplete = async () => {
        try {

            const path = '/todos/updateIds';
            const bodyData = selectedItems;
            const method = 'POST';
            const res = await makeRequest({ path, method, bodyData });
            if (res.success) {
                setTodos([...res.data] || []);
                setSelectedItems([]);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleBulkDelete = async () => {
        try {
            const path = '/todos/delIds';
            const bodyData = selectedItems;
            const method = 'POST';
            const res = await makeRequest({ path, method, bodyData });
            if (res.success) {
                setTodos([...res.data] || []);
                setSelectedItems([]);
            }

        } catch (e) {
            console.log(e);
        }
    };

    const addTodo = async text => {
        try {
            const bodyData = {
                "title": text,
                "status": 'Pending'
            }
            const method = 'POST';
            const path = '/todos';
            const res = await makeRequest({ path, method, bodyData });
            const { data } = res;
            if (res.success) {
                setTodos([...data] || []);
                setActive(false);
            }
        } catch (e) {
            alert('Title is required');
        }
    };

    const completeTodo = async (idTodo) => {
        try {
            const path = `/todo/${idTodo}`;
            const method = 'PUT'
            const res = await makeRequest({ path, method })
            const { data } = res;
            if (res.success) {
                setTodos([...data] || [])
            }
        } catch (e) {
            console.log(e);
        }
    };

    const removeTodo = async (idTodo) => {
        try {
            const path = `/todo/${idTodo}`;
            const method = 'DELETE'
            const res = await makeRequest({ path, method });
            const { data } = res;
            if (res.success) {
                setTodos([...data] || [])
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = useCallback(() => setActive(!active), [active]);

    const checkboxActions = useCallback(
        (newChecked) => setChecked(newChecked),
        [],
    );

    return (
        <>
            <Page
                title='Todos'
                primaryAction={{
                    content: "Create Todo",
                    onAction: handleChange
                }}>
                <Card >
                    {active && <ModalExample addTodo={addTodo} />}
                    <ResourceList
                        alternateTool={
                            <div class='checkbox'>
                                <Checkbox
                                    label='Select'
                                    checked={checked}
                                    onChange={checkboxActions}
                                />
                            </div>
                        }
                        resourceName={{ singular: 'todo', plural: 'todos' }}
                        items={todos}
                        selectedItems={selectedItems}
                        onSelectionChange={setSelectedItems}
                        promotedBulkActions={[
                            {
                                content: 'Complete',
                                onAction: handleBulkComplete,
                                disabled: todos.filter(todo => selectedItems.includes(todo.id)).some(todo => todo.status === 'Pending') ? false : true

                            },
                            {
                                content: 'Delete',
                                destructive: true,
                                onAction: handleBulkDelete
                            },
                        ]}
                        selectable
                        renderItem={(item) => {
                            const { id, title, status } = item;
                            return (
                                <ResourceItem
                                    id={id}
                                    name={title}
                                >
                                    <Stack distribution="equalSpacing">
                                        <TextStyle variant="bodyMd" fontWeight="bold" as="h3">
                                            {title}
                                        </TextStyle>
                                        <div>
                                            <Stack alignment='center' distribution="trailing">
                                                {status === 'Done' ? <Badge status='success'>{status}</Badge> : <Badge status='Fullfiled'>{status}</Badge>}
                                                <Button onClick={() => completeTodo(id)}>Complete</Button>
                                                <Button destructive onClick={() => removeTodo(id)}>Delete</Button>
                                            </Stack>
                                        </div>
                                    </Stack>
                                </ResourceItem>
                            );
                        }}
                    />
                </Card>
            </Page>
        </>
    );
}


export default ResourceItemExample;