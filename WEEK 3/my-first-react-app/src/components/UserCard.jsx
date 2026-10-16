function UserCard({ name = "Calista", email = "calista@example.com", role="Software Developer" }) {
    return (
        <div>
            <h1>{name}</h1>
            <p>{email}</p>
            <p>{role}</p>
        </div>
    );
}

export default UserCard;
