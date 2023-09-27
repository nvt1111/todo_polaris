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
    const [loading, setLoading] = useState(false);

    const handleBulkComplete = async () => {
        try {
            setLoading(true)
            const bodyData = todos.filter(todo => selectedItems.includes(todo.id))
            const res = await makeRequest('/todos', 'PUT', bodyData);
            if (res.success) {
                setTodos(prev =>
                    prev.map(item => {
                        if (selectedItems.includes(item.id)) {
                            return {
                                ...item,
                                completed: !item.completed
                            }
                        }
                        return item;
                    })
                );
                setSelectedItems([]);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false)
        }
    };

    const handleBulkDelete = async () => {
        try {
            const res = await makeRequest(`/todos`, 'DELETE', selectedItems);
            if (res.success) {
                setTodos(prev => prev.filter(prev => !selectedItems.includes(prev.id)));
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
                setTodos([res.data, ...todos]);
                setActive(false);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const completeTodo = async (idTodo, completed, title) => {
        try {
            setLoading(true);
            const bodyData = {
                completed: !completed,
                title: title
            }
            const res = await makeRequest(`/todo/${idTodo}`, 'PUT', bodyData);
            if (res.success) {
                setTodos(prev =>
                    prev.map(item => {
                        if (item.id === idTodo) {
                            return {
                                ...item,
                                ...bodyData
                            }
                        }
                        return item;
                    })
                );
            }
        } catch (e) {
            console.error(e);
            setLoading(false)
        } finally {
            setLoading(false)
        }
    };

    const removeTodo = async (idTodo) => {
        try {
            setLoading(true)
            const res = await makeRequest(`/todo/${idTodo}`, 'DELETE');
            if (res.success) {
                setTodos(prev => prev.filter(prev => prev.id !== idTodo));
            }
        } catch (e) {
            console.error(e);
            setLoading(false)
        } finally {
            setLoading(false)
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
                                disabled: todos?.filter(todo => selectedItems.includes(todo.id)).some(todo => todo.completed === false) ? false : true

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
                                            <Button onClick={() => completeTodo(id, completed, title)} disabled={loading}  >Complete</Button>
                                            <Button destructive onClick={() => removeTodo(id)} disabled={loading}>Delete</Button>
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