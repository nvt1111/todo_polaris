import { Modal } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { TextField, Form } from '@shopify/polaris';
import ErrorToast from '../../hooks/errorToast';

function AddModalTodo({ addTodo }) {
    const [active, setActive] = useState(true);
    const [value, setValue] = useState("");
    const handleChange = useCallback(() => setActive(!active), [active]);
    const handleChange1 = useCallback(
        (newValue) => setValue(newValue),
        [],
    );

    const [error, setError] = useState(false);
    const toggleActive = useCallback(() => setError((error) => !error), []);

    const handleCreateTodo = () => {
        if (value.trim() !== '') {
            addTodo(value);
            setActive(false);
        } else {
            toggleActive();
            setActive(false);
        }
    };
    return (
        <>
            <>{
                !error && < Modal
                    open={active}
                    onClose={handleChange}
                    title="Create my new todo"
                    primaryAction={{
                        content: 'Create',
                        onAction: handleCreateTodo
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
                                placeholder='Create todo ...'
                            />
                        </Form>
                    </Modal.Section>
                </Modal>
            }
            </>

            <>{error && <ErrorToast active={error} toggleActive={toggleActive} />}</>
        </>

    );
};

export default AddModalTodo;