import { Card, ResourceList, ResourceItem, TextStyle, Button, Stack, Page } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { Badge } from '@shopify/polaris';
import useFetchData from '../../hooks/useFetchApi';
import makeRequest from '../../helpers/api/makeRequest';
import AddModalTodo from '../modal/Modal'

function ResourceItemTodo() {
    const { todos, setTodos } = useFetchData('/todos');
    const [selectedItems, setSelectedItems] = useState([]);
    const [active, setActive] = useState(false);

    const handleBulkComplete = async () => {
        try {
            const path = '/todos/ids';
            const bodyData = selectedItems;
            const method = 'PUT';
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
            const path = `/todos/ids`;
            const bodyData = selectedItems;
            const method = 'DELETE';
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
                "completed": false
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
            console.log(e);
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


    return (
        <>
            <Page
                title='Todos'
                primaryAction={{
                    content: "Create Todo",
                    onAction: () => {
                        handleChange();
                    }
                }}>
                <Card >
                    {active && <AddModalTodo addTodo={addTodo} />}
                    <ResourceList
                        resourceName={{ singular: 'todo', plural: 'todos' }}
                        items={todos}
                        selectedItems={selectedItems}
                        onSelectionChange={setSelectedItems}
                        promotedBulkActions={[
                            {
                                content: 'Complete',
                                onAction: handleBulkComplete,
                                disabled: todos.filter(todo => selectedItems.includes(todo.id)).some(todo => todo.completed === false) ? false : true

                            },
                            {
                                content: 'Delete',
                                destructive: true,
                                onAction: handleBulkDelete
                            },
                        ]}
                        selectable
                        renderItem={(item) => {
                            const { id, title, completed } = item;
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
                                                {completed ? <Badge status='success'>Done</Badge> : <Badge status='Fullfiled'>Pending</Badge>}
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


export default ResourceItemTodo;