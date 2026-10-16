import { useState, useEffect } from "react";

function UserManagement() {
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState({
        fetch: false,
        create: false,
        update: false,
        delete: false,
    });

    const [error, setError] = useState(null);

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        role: "user",
    });

    const [editingUser, setEditingUser] = useState(null);

    // Mock API base URL
    const API_BASE = "https://jsonplaceholder.typicode.com";

    // Generic API call function
    const apiCall = async (endpoint, options = {}) => {
        const url = `${API_BASE}${endpoint}`;

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(
                `API Error: ${response.status} ${response.statusText}`
            );
        }

        return response.json();
    };

    // Fetch all users
    const fetchUsers = async () => {
        setLoading((prev) => ({
            ...prev,
            fetch: true,
        }));

        setError(null);

        try {
            const userData = await apiCall("/users");
            setUsers(userData);
        } catch (err) {
            setError(`Failed to fetch users: ${err.message}`);
        } finally {
            setLoading((prev) => ({
                ...prev,
                fetch: false,
            }));
        }
    };

    // Create new user
    const createUser = async (userData) => {
        setLoading((prev) => ({
            ...prev,
            create: true,
        }));

        setError(null);

        try {
            await apiCall("/users", {
                method: "POST",
                body: JSON.stringify(userData),
            });

            // JSONPlaceholder doesn't actually create users,
            // so we simulate adding the user locally
            const userWithId = { 
                ...userData,
                id: Date.now(),
            };

            setUsers((prev) => [...prev, userWithId]);

            setNewUser({
                name: "",
                email: "",
                role: "user",
            });

            return userWithId;
        } catch (err) {
            setError(`Failed to create user: ${err.message}`);
            throw err;
        } finally {
            setLoading((prev) => ({
                ...prev,
                create: false,
            }));
        }
    };

    // Update user
    const updateUser = async (userId, userData) => {
        setLoading((prev) => ({
            ...prev,
            update: true,
        }));

        setError(null);

        try {
            const updatedUser = await apiCall(`/users/${userId}`, {
                method: "PUT",
                body: JSON.stringify(userData),
            });

            setUsers((prev) =>
                prev.map((user) =>
                    user.id === userId
                        ? { ...user, ...userData }
                        : user
                )
            );

            setEditingUser(null);

            return updatedUser;
        } catch (err) {
            setError(`Failed to update user: ${err.message}`);
            throw err;
        } finally {
            setLoading((prev) => ({
                ...prev,
                update: false,
            }));
        }
    };

    // Load users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle create form
    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        if (!newUser.name || !newUser.email) {
            setError("Name and email are required");
            return;
        }

        try {
            await createUser(newUser);
        } catch (err) {
            // Error already handled in createUser
        }
    };

    // Handle update form
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        if (!editingUser.name || !editingUser.email) {
            setError("Name and email are required");
            return;
        }

        try {
            await updateUser(editingUser.id, editingUser);
        } catch (err) {
            // Error already handled in updateUser
        }
    };

    return (
        <div>
            <h1>User Management System</h1>

            {/* ERROR MESSAGE */}
            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            {/* CREATE USER */}
            <h2>Add User</h2>

            <form onSubmit={handleCreateSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) =>
                        setNewUser({
                            ...newUser,
                            name: e.target.value,
                        })
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) =>
                        setNewUser({
                            ...newUser,
                            email: e.target.value,
                        })
                    }
                />

                <select
                    value={newUser.role}
                    onChange={(e) =>
                        setNewUser({
                            ...newUser,
                            role: e.target.value,
                        })
                    }
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button
                    type="submit"
                    disabled={loading.create}
                >
                    {loading.create
                        ? "Creating..."
                        : "Add User"}
                </button>
            </form>

            <hr />

            {/* USERS */}
            <h2>Users</h2>

            {loading.fetch ? (
                <p>Loading users...</p>
            ) : (
                users.map((user) => (
                    <div key={user.id}>
                        {editingUser?.id === user.id ? (
                            <form onSubmit={handleUpdateSubmit}>
                                <input
                                    type="text"
                                    value={editingUser.name}
                                    onChange={(e) =>
                                        setEditingUser({
                                            ...editingUser,
                                            name: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(e) =>
                                        setEditingUser({
                                            ...editingUser,
                                            email: e.target.value,
                                        })
                                    }
                                />

                                <button
                                    type="submit"
                                    disabled={loading.update}
                                >
                                    {loading.update
                                        ? "Updating..."
                                        : "Save"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditingUser(null)
                                    }
                                >
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            <div>
                                <strong>{user.name}</strong>

                                <p>{user.email}</p>

                                <button
                                    onClick={() =>
                                        setEditingUser({
                                            ...user,
                                        })
                                    }
                                >
                                    Edit
                                </button>
                            </div>
                        )}

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default UserManagement;