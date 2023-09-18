import { Modal } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { TextField, Form } from '@shopify/polaris';

function AddModalTodo({ addTodo }) {
    const [active, setActive] = useState(true);
    const [value, setValue] = useState("");
    const handleChange = useCallback(() => setActive(!active), [active]);
    const handleChange1 = useCallback(
        (newValue) => setValue(newValue),
        [],
    );
    const handleEnter = (e) => {
        e.preventDefault()
        if (e.key === 'Enter') {
            return addTodo(value);
        }
    }
    return (
        <Modal
            open={active}
            onClose={handleChange}
            title="Create my new todo"
            primaryAction={{
                content: 'Create',
                onAction: () => addTodo(value)
            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: handleChange,
                },
            ]}
        >
            <Modal.Section >
                <Form onSubmit={() => addTodo(value)}>
                    <TextField
                        value={value}
                        onChange={handleChange1}
                        onBlur={(e) => handleEnter(e)}
                        placeholder='Create todo ...'
                    />
                </Form>
            </Modal.Section>
        </Modal>
    );
};

export default AddModalTodo;