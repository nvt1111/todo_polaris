import { Modal } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import './Modal.css'
function ModalExample({ addTodo }) {
    const [active, setActive] = useState(true);
    const [value, setValue] = useState("");
    const handleChange = useCallback(() => setActive(!active), [active]);

    return (
        <div >
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
                <Modal.Section>
                    <form>
                        <input
                            type="text"
                            className="input"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </form>
                </Modal.Section>
            </Modal>
        </div>
    );
};

export default ModalExample;