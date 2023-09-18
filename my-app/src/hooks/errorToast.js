import { Frame, Toast } from '@shopify/polaris';

function ErrorToast({ active, toggleActive }) {

    const toastMarkup = active ? (
        <Toast content="Title is required" error onDismiss={toggleActive} />
    ) : null;

    return (
        <div style={{ height: '0px' }}>
            <Frame>
                {toastMarkup}
            </Frame>
        </div>
    );
}

export default ErrorToast;