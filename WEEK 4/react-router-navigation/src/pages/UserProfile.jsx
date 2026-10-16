import { useParams } from "react-router-dom";

const users = {
    1: { name: "Calista", age: 30, status: "Single"},
    2: {name: "Chaplin", age: 40, status: "Complicated"},
    3: {name: "Caramel", age: 50, status: "Married"},
};

function UserProfile () {
    const { id } = useParams ();
    const user = users[id];

    if (!user) return <p> User not found </p>;

    return (
        <>
        <h2> User Profile</h2>
        <p> Name: {user.name}</p>
        <p> Age: {user.age}</p>
        <p> Status: {user.status}</p>
        </>
    );
}

export default UserProfile;
