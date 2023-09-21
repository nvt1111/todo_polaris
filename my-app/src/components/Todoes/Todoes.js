import { Card, ResourceList, ResourceItem, TextStyle, Button, Stack, Page } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { Badge } from '@shopify/polaris';
import useFetchData from '../../hooks/useFetchApi';
import makeRequest from '../../helpers/api/makeRequest';
import AddModalTodo from '../Modal/Modal'

function Todoes() {
    const { data: todos, setData: setTodos } = useFetchData('/todos');
    const [selectedItems, setSelectedItems] = useState([]);
    const [active, setActive] = useState(false);

    const handleBulkComplete = async () => {
        try {
            const res = await makeRequest('/todos', 'PUT', selectedItems);
            if (res.success) {
                setTodos(res.data);
                setSelectedItems([]);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleBulkDelete = async () => {
        try {
            const res = await makeRequest(`/todos`, 'DELETE', selectedItems);
            if (res.success) {
                setTodos(res.data);
                setSelectedItems([]);
            }

        } catch (e) {
            console.error(e);
        }
    };

    const addTodo = async text => {
        try {
            const bodyData = {
                "title": text,
                "completed": false
            };
            const res = await makeRequest('/todos', 'POST', bodyData);
            if (res.success) {
                setTodos(res.data);
                setActive(false);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const completeTodo = async (idTodo) => {
        try {
            const res = await makeRequest(`/todo/${idTodo}`, 'PUT');
            if (res.success) {
                setTodos(res.data)
            }
        } catch (e) {
            console.error(e);
        }
    };

    const removeTodo = async (idTodo) => {
        try {
            const res = await makeRequest(`/todo/${idTodo}`, 'DELETE');
            if (res.success) {
                setTodos(res.data)
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = useCallback(() => setActive(!active), [active]);

    return (
        <>
            <Page
                title='Todos'
                primaryAction={{
                    content: "Create Todo",
                    onAction: () => handleChange()

                }}>
                <Card >
                    <AddModalTodo addTodo={addTodo} active={active} setActive={setActive} handleChange={handleChange} />
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
                                        <Stack alignment='center' distribution="trailing">
                                            {completed ? <Badge status='success'>Done</Badge> : <Badge status='Fullfiled'>Pending</Badge>}
                                            <Button onClick={() => completeTodo(id)}>Complete</Button>
                                            <Button destructive onClick={() => removeTodo(id)}>Delete</Button>
                                        </Stack>
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


export default Todoes;