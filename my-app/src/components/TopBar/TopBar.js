import { TopBar } from '@shopify/polaris';
import Todoes from '../Todoes/Todoes'

function TopBarTodo() {
    const logo = {
        width: 124,
        topBarSource:
            'https://career.mageplaza.com/images/logo.png',
        url: '#',
        accessibilityLabel: 'Jaded Pixel',
    };

    const userMenuMarkup = (
        <TopBar.UserMenu
            name="Nguyen Van Thai"
            initials="VT"
        />
    );

    const topBarMarkup = (
        <TopBar
            userMenu={userMenuMarkup} logo={logo}
        />
    );

    return (
        <div style={{ height: '1000px', backgroundColor: 'white', }}>
            {topBarMarkup}
            <Todoes />
        </div>
    );
}


export default TopBarTodo;


