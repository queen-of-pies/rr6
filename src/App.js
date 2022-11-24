import {
    Navigate,
    NavLink,
    Outlet,
    useParams,
    useRoutes,
} from "react-router-dom";

function App() {
    const routes = useRoutes([
        {
            path: "/",
            element: <MainPage />,
        },
        {
            path: "users",
            element: <UsersLayout />,
            children: [
                { index: true, element: <UserListPage /> },
                {
                    path: ":userId",
                    element: <Outlet />,
                    children: [
                        { path: "profile", element: <UserProfilePage /> },
                        { path: "edit", element: <EditUserPage /> },
                        { index: true, element: <Navigate to='./profile' /> },
                        { path: "*", element: <Navigate to='../profile' /> },
                    ],
                },
            ],
        },
        { path: "*", element: <Navigate to='/' /> },
    ]);
    return (
        <div className='App'>
            <h1> App Layout</h1>
            <NavLink to='/users'>Users list Page</NavLink>
            {routes}
        </div>
    );
}
function MainPage() {
    return <h1>MainPage</h1>;
}
function UsersLayout() {
    return (
        <div>
            <h1>Users Layout</h1>
            <NavLink to='/'>Main Page</NavLink>
            <Outlet />
        </div>
    );
}
function UserListPage() {
    return (
        <div>
            <h1> User List Page</h1>
            <ul>
                {new Array(5).fill("").map((_, index) => (
                    <li key={index}>
                        <NavLink to={index + "/profile"}>User {index}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}
function UserProfilePage() {
    const { userId } = useParams();
    return (
        <div>
            <h1>UserPage</h1>
            <ul>
                <li>
                    <NavLink to='/users'>Users List page</NavLink>
                </li>
                <li>
                    <NavLink to={`/users/${userId}/edit`}>
                        Edit this user
                    </NavLink>
                </li>
            </ul>
            <p> userId:{userId}</p>
        </div>
    );
}
function EditUserPage() {
    const { userId } = useParams();
    return (
        <div>
            <h1>Edit User Page</h1>
            <ul>
                <li>
                    <NavLink to={"/users/" + userId}>User profile Page</NavLink>
                </li>
                <li>
                    <NavLink to={"/users/" + (+userId + 1)}>
                        Another User
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/users"}> Users List page</NavLink>
                </li>
            </ul>
        </div>
    );
}
export default App;
