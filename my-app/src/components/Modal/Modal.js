import { Modal } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { TextField, Form } from '@shopify/polaris';
import SpinnerTodo from '../Spinner/Spinner'

function AddModalTodo({ addTodo, active, setActive, handleChange }) {
    const [value, setValue] = useState("");
    // const handleChange = useCallback(() => setActive(!active), [active]);
    const handleChange1 = useCallback(
        (newValue) => setValue(newValue),
        [],
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const toggleActive = useCallback(() => setError((error) => !error), []);

    const handleCreateTodo = async () => {
        if (value.trim() !== '') {
            setLoading(true);
            await addTodo(value);
            setLoading(false);
            setActive(false);
            setValue('');
            setError(false);
        } else {
            toggleActive();
        }
    };

    return (
        < Modal
            open={active}
            onClose={handleChange}
            title="Create my new todo"
            primaryAction={{
                content: 'Create',
                onAction: handleCreateTodo,
                loading: loading ? <SpinnerTodo /> : null

            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: handleChange,
                },
            ]}
        >
            <Modal.Section >
                <>
                    {error ?
                        <Form onSubmit={handleCreateTodo}>
                            <TextField
                                value={value}
                                onChange={handleChange1}
                                placeholder='Create todo ...'
                                error="Todo is required"
                            />
                        </Form>
                        :
                        <Form onSubmit={handleCreateTodo}>
                            <TextField
                                value={value}
                                onChange={handleChange1}
                                placeholder='Create todo ...'
                            />
                        </Form>
                    }
                </>
            </Modal.Section>
        </Modal >
    );
};

export default AddModalTodo;